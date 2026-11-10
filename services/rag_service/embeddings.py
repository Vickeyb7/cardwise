import os
from typing import List, Dict, Any, Optional
import chromadb
from chromadb.config import Settings
from .config import HUGGINGFACE_EMBEDDING_MODEL, CHROMA_PATH

COLLECTION_NAME = "chunks__bge_base_en_v15"

class EmbeddingStore:
    def __init__(self):
        self.chroma_path = CHROMA_PATH
        os.makedirs(self.chroma_path, exist_ok=True)
        
        # Initialize persistent Chroma client
        self.client = chromadb.PersistentClient(path=self.chroma_path)
        
        # Lazy model loader for SentenceTransformer to optimize memory
        self._model = None
        self.collection = self.client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"}
        )

    @property
    def model(self):
        if self._model is None:
            try:
                from sentence_transformers import SentenceTransformer
                self._model = SentenceTransformer(HUGGINGFACE_EMBEDDING_MODEL)
            except Exception as e:
                print(f"[Warning] Failed to load local SentenceTransformer: {e}")
                self._model = None
        return self._model

    def embed_passages(self, texts: List[str]) -> List[List[float]]:
        """Embed document passages (no query instruction prefix)."""
        if self.model:
            embeddings = self.model.encode(texts, normalize_embeddings=True)
            return embeddings.tolist()
        # Fallback dummy 768-d vectors if PyTorch/HuggingFace is not installed locally
        return [[0.0] * 768 for _ in texts]

    def embed_query(self, query: str) -> List[float]:
        """Embed query text with the BGE retrieval instruction."""
        bge_instruction = "Represent this sentence for searching relevant passages: "
        prefixed_query = f"{bge_instruction}{query}"
        if self.model:
            embedding = self.model.encode([prefixed_query], normalize_embeddings=True)[0]
            return embedding.tolist()
        return [0.0] * 768

    def upsert_chunks(self, chunks: List[Dict[str, Any]]):
        """Upsert passages with metadata into Chroma collection."""
        if not chunks:
            return

        ids = [c["id"] for c in chunks]
        documents = [c["text"] for c in chunks]
        metadatas = [c.get("metadata", {}) for c in chunks]
        embeddings = self.embed_passages(documents)

        self.collection.upsert(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )

    def retrieve(
        self,
        query: str,
        where_filter: Optional[Dict[str, Any]] = None,
        top_k: int = 4
    ) -> List[Dict[str, Any]]:
        """Query Chroma for top_k nearest neighbours in cosine space."""
        query_vector = self.embed_query(query)
        
        kwargs: Dict[str, Any] = {
            "query_embeddings": [query_vector],
            "n_results": min(top_k, max(1, self.collection.count() or 1)),
        }
        if where_filter:
            kwargs["where"] = where_filter

        results = self.collection.query(**kwargs)
        
        retrieved = []
        if results and results.get("ids") and len(results["ids"]) > 0:
            for idx in range(len(results["ids"][0])):
                chunk_id = results["ids"][0][idx]
                doc_text = results["documents"][0][idx] if results.get("documents") else ""
                metadata = results["metadatas"][0][idx] if results.get("metadatas") else {}
                distance = results["distances"][0][idx] if results.get("distances") else 0.0
                
                # Cosine similarity = 1 - cosine distance
                similarity = 1.0 - distance
                
                retrieved.append({
                    "id": chunk_id,
                    "text": doc_text,
                    "metadata": metadata,
                    "similarity": round(similarity, 4),
                    "cosine_distance": round(distance, 4)
                })

        return retrieved

# Singleton instance
_store = None

def get_embedding_store() -> EmbeddingStore:
    global _store
    if _store is None:
        _store = EmbeddingStore()
    return _store
