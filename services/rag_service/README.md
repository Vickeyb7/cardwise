# CardWise Python FastAPI RAG Microservice

This microservice handles heavy vector indexing, embedding generation with Hugging Face `BAAI/bge-base-en-v1.5`, persistent storage in ChromaDB, and policy rule extraction via Groq (`llama-3.3-70b-versatile`).

---

## 1. Environment Configuration

The service reads configuration directly from the root `.env`:
- `GROQ_API_KEY`: API key for Groq inference.
- `GROQ_MODEL`: `llama-3.3-70b-versatile` (default).
- `HUGGINGFACE_EMBEDDING_MODEL`: `BAAI/bge-base-en-v1.5` (768-d cosine space).
- `CHROMA_PATH`: `./data/chroma`.
- `FASTAPI_PORT`: `8000`.

---

## 2. Quickstart

```bash
# 1. Navigate to the service directory
cd services/rag_service

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start FastAPI server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 3. Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check, Chroma count, and model diagnostics. |
| `POST` | `/documents/ingest` | Splits text into 800-token chunks, embeds into Chroma, and extracts structured rules. |
| `POST` | `/retrieve` | Vector cosine similarity retrieval with hard metadata filters (`card_name`, `issuer_id`). |
| `POST` | `/explain` | Grounded explanation generator using Groq and calculated rupee benefits. |
| `POST` | `/audit/verify` | Verifies draft rule quotes against top retrieved passages to prevent hallucination. |

---

## 4. Example Usage

### Retrieve Policy Chunks
```bash
curl -X POST http://localhost:8000/retrieve \
  -H "Content-Type: application/json" \
  -d '{
    "query": "HDFC Infinia SmartBuy flight accelerated multiplier and monthly cap",
    "top_k": 3
  }'
```

### Ingest Bank Terms
```bash
curl -X POST http://localhost:8000/documents/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "document_id": "hdfc_infinia_2026",
    "card_name": "HDFC Infinia Metal Edition",
    "issuer_id": "hdfc",
    "raw_text": "Effective 1 September 2026, 5X Reward Points on flights via SmartBuy, capped at 10,000 points per month...",
    "source_url": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card"
  }'
```
