import time
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .config import GROQ_MODEL, HUGGINGFACE_EMBEDDING_MODEL, CHROMA_PATH, PORT, HOST
from .chunker import chunk_document
from .embeddings import get_embedding_store
from .extractor import extract_rules_from_text, generate_grounded_explanation

app = FastAPI(
    title="CardWise RAG Ingestion & Retrieval Microservice",
    description="Python FastAPI service using Hugging Face BAAI/bge-base-en-v1.5 and Groq llama-3.3-70b-versatile for Indian credit card policy retrieval.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Request / Response Models
class IngestDocumentRequest(BaseModel):
    document_id: str
    card_name: str
    issuer_id: str
    raw_text: str
    source_url: str
    effective_date: Optional[str] = "2026-11-01"
    doc_type: Optional[str] = "terms_and_conditions"

class RetrieveQueryRequest(BaseModel):
    query: str
    card_product_id: Optional[str] = None
    issuer_id: Optional[str] = None
    top_k: Optional[int] = 4

class ExplainRecommendationRequest(BaseModel):
    winning_card: str
    spend_amount: float
    merchant: str
    calculated_benefit: float
    retrieved_citations: List[Dict[str, Any]]
    all_card_results: Optional[List[Dict[str, Any]]] = []

class VerifyRuleRequest(BaseModel):
    draft_quote: str
    card_name: str
    issuer_id: str

@app.get("/health")
def health_check():
    store = get_embedding_store()
    return {
        "status": "healthy",
        "service": "CardWise Python RAG Engine",
        "chroma_collection": "chunks__bge_base_en_v15",
        "chroma_chunks_count": store.collection.count(),
        "embedding_model": HUGGINGFACE_EMBEDDING_MODEL,
        "groq_model": GROQ_MODEL,
        "timestamp": time.time()
    }

@app.post("/documents/ingest")
def ingest_document(req: IngestDocumentRequest):
    """
    Ingest a bank policy document:
    1. Splits into 800-token chunks with 120-token overlap.
    2. Runs Groq LLaMA 3.3 rule extractor to produce structured JSON rules.
    3. Embeds each chunk into ChromaDB using BAAI/bge-base-en-v1.5.
    """
    start_time = time.time()
    
    # 1. Chunk document
    metadata = {
        "document_id": req.document_id,
        "card_name": req.card_name,
        "issuer_id": req.issuer_id,
        "source_url": req.source_url,
        "effective_date": req.effective_date or "",
        "doc_type": req.doc_type or "terms_and_conditions"
    }
    chunks = chunk_document(req.raw_text, target_tokens=800, overlap_tokens=120, metadata=metadata)
    
    # Prepare chunk IDs for Chroma
    chroma_chunks = []
    for idx, c in enumerate(chunks):
        chunk_id = f"{req.document_id}_chunk_{idx}"
        chroma_chunks.append({
            "id": chunk_id,
            "text": c["text"],
            "metadata": {
                **metadata,
                "chunk_index": idx,
                "token_count": c["token_count"]
            }
        })
    
    # 2. Embed & Upsert into ChromaDB
    store = get_embedding_store()
    store.upsert_chunks(chroma_chunks)
    
    # 3. Extract structured rules using Groq
    extracted_rules = extract_rules_from_text(req.raw_text[:4000], bank_hint=req.card_name)
    
    elapsed_ms = (time.time() - start_time) * 1000
    
    return {
        "success": True,
        "document_id": req.document_id,
        "chunks_created": len(chroma_chunks),
        "extracted_rules": extracted_rules,
        "elapsed_ms": round(elapsed_ms, 2)
    }

@app.post("/retrieve")
def retrieve_chunks(req: RetrieveQueryRequest):
    """
    Queries ChromaDB cosine vector space for relevant bank policy chunks.
    Supports hard metadata filtering by card_name or issuer_id.
    """
    start_time = time.time()
    store = get_embedding_store()
    
    # Construct Chroma where filter
    where_filter = None
    if req.card_product_id and req.issuer_id:
        where_filter = {
            "$and": [
                {"card_name": req.card_product_id},
                {"issuer_id": req.issuer_id}
            ]
        }
    elif req.card_product_id:
        where_filter = {"card_name": req.card_product_id}
    elif req.issuer_id:
        where_filter = {"issuer_id": req.issuer_id}

    results = store.retrieve(req.query, where_filter=where_filter, top_k=req.top_k or 4)
    elapsed_ms = (time.time() - start_time) * 1000
    
    return {
        "success": True,
        "query": req.query,
        "results": results,
        "count": len(results),
        "elapsed_ms": round(elapsed_ms, 2)
    }

@app.post("/explain")
def explain_recommendation(req: ExplainRecommendationRequest):
    """
    Generates an explanation of the winning recommendation grounded
    in verified policy citations and calculated rupee numbers.
    """
    start_time = time.time()
    explanation = generate_grounded_explanation(
        winning_card=req.winning_card,
        spend_amount=req.spend_amount,
        merchant=req.merchant,
        calculated_benefit=req.calculated_benefit,
        retrieved_citations=req.retrieved_citations,
        all_card_results=req.all_card_results or []
    )
    elapsed_ms = (time.time() - start_time) * 1000
    
    return {
        "success": True,
        "explanation": explanation,
        "elapsed_ms": round(elapsed_ms, 2)
    }

@app.post("/audit/verify")
def verify_rule_against_corpus(req: VerifyRuleRequest):
    """
    Audit step: Verifies if an extracted quote occurs inside the top retrieved passages
    to prevent composite hallucination.
    """
    store = get_embedding_store()
    where_filter = {"issuer_id": req.issuer_id} if req.issuer_id else None
    passages = store.retrieve(req.draft_quote, where_filter=where_filter, top_k=5)
    
    found_in_corpus = any(req.draft_quote.lower() in p["text"].lower() for p in passages)
    
    return {
        "verified": found_in_corpus,
        "matched_passage_count": len(passages),
        "top_similarity": passages[0]["similarity"] if passages else 0.0,
        "status": "VERIFIED" if found_in_corpus else "NEEDS_REVIEW"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
