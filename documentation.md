# CardWise Technical & Product Documentation

**Product:** CardWise — Credit Card Rewards Arbitrage & Grounded Policy Intelligence  
**Platform:** Web (Desktop, Tablet & Mobile PWA)  
**Market:** India  
**Version:** 1.0 Production-Ready MVP  
**Architecture:** React 19 + TypeScript + Express Gateway + Python FastAPI RAG Service (`rag_service.py`)  
**Companion:** [IMPLEMENTATION.md](./IMPLEMENTATION.md) specifies how this codebase was constructed.

---

## 1. What CardWise Is

CardWise tells a person which of the credit cards they already own returns the most monetary value on a purchase they are about to make.

Indian credit card holders face a fragmented labyrinth of accelerated multipliers (5X–10X on travel portals vs 1% base), merchant-specific cashback (5% on online shopping, 10% on dining apps), hard monthly caps (e.g. SBI Cashback ₹5,000/month, HDFC SmartBuy calendar limits), varying point-to-rupee valuations (₹0.20 to ₹1.00 per point), and complex category exclusions (fuel, rent via CRED, wallet reloads, school fees). 

Comparing these by hand at the point of sale is cognitively exhausting. CardWise maintains a personal vault of owned cards, keeps an auditable record of public bank reward rules grounded via RAG (Retrieval-Augmented Generation), and produces a mathematically optimal recommendation with transparent, step-by-step arithmetic.

**The Product Promise:** Never leave credit card rewards on the table because the wrong card was swiped or tapped.

CardWise is an advisory and decision engine. It does not pay, lend, issue cards, or access bank accounts.

---

## 2. Who It Is For

- **Primary User:** Owns 2 to 5 credit cards. Spends across online shopping, dining, grocery, travel, and everyday retail. Wants the best card yield without memorizing fine-print terms and conditions.
- **Secondary User (Reward Maximizer):** Owns 5 or more cards. Optimizes milestone thresholds, transfers points to airline/hotel partners (e.g. Axis Atlas to Accor ALL or Singapore Airlines KrisFlyer), and requires monthly caps, exclusions, and fee waivers factored into the net rupee return.
- **Market:** India. Issuers in scope: HDFC Bank, Axis Bank, ICICI Bank, SBI Card, American Express, Standard Chartered, IDFC FIRST Bank, and Tata Neu.

---

## 3. Scope: What the MVP Does & Does Not Do

### 3.1 What the MVP Does
1. **Google / Gmail 1-Click Fast Sign-In:** Frictionless onboarding and cloud synchronization powered by Firebase Authentication.
2. **Search & Browse Card Catalog:** Filter 24+ Indian credit card products by issuer, category (Cashback, Travel, Premium, Utilities), or name.
3. **Personal Card Vault:** Add and manage owned card products without typing card numbers or banking credentials.
4. **Instant Purchase Optimizer:** Enter purchase amount, select category (Shopping, Travel, Dining, Grocery, Fuel, Utilities) and merchant (Amazon, Flipkart, Swiggy, Zomato, Cleartrip, etc.), with online/offline channel toggling.
5. **Deterministic Recommendation:** Sub-50ms ranking comparing gross points, net rupee value, applied earn rate, caps, and exclusions.
6. **RAG Policy Intelligence & Citations:** Semantic retrieval grounded on official bank schedules, with bracketed citations `[Source X]` and direct links to official bank terms.
7. **Interactive Analytics Suite:** 6-month historical arbitrage chart (`InsightsTab`), monthly arbitrage composed chart, and 12-month savings sparkline.
8. **In-App Vector Chunks Explorer:** Full transparency view of all 12 pre-chunked policy vectors with token counts, dense/sparse ranks, and devaluation alerts.

### 3.2 What the MVP Does Not Do
- Charging a card or initiating payments.
- Storing 16-digit card numbers, CVVs, expiry dates, PINs, or banking passwords.
- Reading SMS, device notifications, email, or bank account balance feeds.
- Credit score inquiries or new card applications.
- Detecting merchant names from GPS or device location.

Users select a **card product** (e.g. *HDFC Infinia* or *SBI Cashback*). Sensitive payment credentials never exist in CardWise.

---

## 4. System Architecture

CardWise couples a deterministic mathematical calculation core with an asynchronous RAG (Retrieval-Augmented Generation) microservice and real-time cloud data synchronization.

```text
 ┌───────────────────────────────────────────────────────────────────────────┐
 │                              Client Browser                               │
 │         React 19 + TypeScript + Tailwind CSS v4 + WebGL Shaders           │
 │   (RecommendationEngine · KnowledgeBaseRAG · PortfolioVault · Insights)   │
 └──────────────┬───────────────────────────────┬────────────────────────────┘
                │ Real-Time Sync & Auth         │ API Requests (JSON)
                ▼                               ▼
    ┌──────────────────────┐        ┌────────────────────────────────────────┐
    │  Firebase Cloud      │        │       Express Server Gateway           │
    │  - Google Sign-In    │        │       (Node.js / Port 3000)            │
    │  - Cloud Firestore   │        │   - Full-stack proxy (server.ts)       │
    │    (/users/{userId}) │        │   - Deterministic engine bridge        │
    │  - ABAC Rules Active │        │   - Built-in In-Memory Hybrid RRF      │
    └──────────────────────┘        └───────┬────────────────────────┬───────┘
                                            │                        │
                    Delegated Ingestion &   │                        │ LLM Inference
                    Chroma Vector Search    │                        │ (Server-Side)
                                            ▼                        ▼
    ┌────────────────────────────────────────┐   ┌───────────────────────────┐
    │  FastAPI RAG Service (rag_service.py)  │   │  Dual LLM Providers:      │
    │  (Python 3.10+ / Port 8000)            │   │  1. Gemini 3.8 Flash      │
    │  - Hugging Face BAAI/bge-base-en-v1.5  │   │     (@google/genai SDK)   │
    │  - ChromaDB (chunks__bge_base_en_v15)  │   │  2. Groq LLaMA 3.3 70B    │
    │  - Groq LLaMA 3.3 Rule Extractor       │   │     (llama-3.3-versatile) │
    └────────────────────────────────────────┘   └───────────────────────────┘
```

---

## 5. End-to-End Data Flow: From Policy Retrieval to Deterministic Calculation

CardWise decouples **mathematical calculation** from **language model reasoning**. Numbers are computed deterministically; RAG provides regulatory text validation, exclusion verification, and plain-language justification.

```text
 USER INPUT: "₹10,000 spend on Amazon India with online shopping selected"
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ STEP 1: DETERMINISTIC CALCULATION (<50ms, Client-Side / calculator.ts)   │
 │ - Merchant Match: Maps "Amazon India" -> 5% Accelerated / Partner Tier    │
 │ - Exclusions Gate: Verifies not in Fuel, Rent, or Wallet MCCs            │
 │ - Spend Cap Check: Checks consumed caps; applies fallback rates if maxed │
 │ - Rupee Conversion: Multiplies points by pointValueInInr (e.g. ₹1.00/RP) │
 │ - Yield Ranking: Amazon Pay ICICI (₹500 / 5%), SBI Cashback (₹500 / 5%), │
 │                  HDFC Infinia (₹333 / 3.33% base, or ₹1,660 on SmartBuy) │
 │                                                                          │
 │ OUTPUT: Winner = Amazon Pay ICICI (5% cashback = ₹500.00 realized return) │
 └──────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ STEP 2: RAG QUERY TEMPLATE FORMULATION                                   │
 │ Template: "{card_name} {merchant} reward rate cashback exclusions"       │
 │ Example: "Amazon Pay ICICI Amazon India online shopping reward rate"     │
 └──────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ STEP 3: HYBRID RETRIEVAL & RECIPROCAL RANK FUSION (RRF k=60)             │
 │ - Dense Search: Cosine similarity against 768-d BGE/Chroma vectors       │
 │ - Sparse Search: BM25 keyword matching on exact terms ("Amazon", "5%")   │
 │ - Fusion: Score = 1/(60 + DenseRank) + 1/(60 + SparseRank)               │
 │ - Top Chunk Retrieved: "chunk_icici_amazon_benefits" (Relevance: 96.8%) │
 └──────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ STEP 4: GROUNDED LLM SYNTHESIS (Server-Side Proxy: Gemini / Groq)        │
 │ - Payload: Exact deterministic numbers (₹500.00, 5%) + Source Excerpts   │
 │ - Constraint: Never contradict the calculated numbers.                   │
 │ - Output: Plain-language explanation citing [Source 1] and bank portal.  │
 └──────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ STEP 5: FRONTEND RENDERING                                               │
 │ - Primary Hero Card: 3D tactile card visual, ₹500 return, net 5.0% yield │
 │ - Auditable Steps Ledger: 5-step mathematical verification accordion     │
 │ - Grounded Sources: Clickable links to verified bank terms & conditions  │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Backend RAG Implementation: `rag_service.py`

The backend RAG pipeline is implemented in `rag_service.py` (and mirrored in `services/rag_service/`):

### 6.1 Core Responsibilities
- **Embedding Generation:** Hugging Face `BAAI/bge-base-en-v1.5` producing 768-dimensional normalized vectors. Query embeddings are prefixed with the BGE retrieval instruction: `"Represent this sentence for searching relevant passages: "`.
- **Persistent Vector Store:** ChromaDB persistent client at `./data/chroma` maintaining the collection `chunks__bge_base_en_v15` with cosine distance space ($\text{Similarity} = 1 - \text{Cosine Distance}$).
- **Sliding-Window Chunker:** Ingests raw bank policy texts and splits them into 800-token chunks with 120-token overlap, preserving markdown tables and exclusion matrices.
- **LLM Rule Extraction & Explanation:** Uses Groq (`llama-3.3-70b-versatile`) to extract structured rules into JSON schemas and generate grounded explanations.

### 6.2 Running the RAG Service
```bash
# 1. Install dependencies
pip install fastapi uvicorn chromadb sentence-transformers groq pydantic python-dotenv

# 2. Run the FastAPI server
python3 rag_service.py
# Server runs on http://0.0.0.0:8000
```

### 6.3 Endpoints Reference

| Method | Route | Description |
|---|---|---|
| `GET` | `/health` | Health check, Chroma count, and model diagnostics. |
| `GET` | `/chunks` | Returns verified policy chunks for audit and UI rendering. |
| `POST` | `/seed` | Auto-seeds ChromaDB with verified Indian bank policy chunks. |
| `POST` | `/documents/ingest` | Chunks text, vectorizes with BGE, and stores in ChromaDB. |
| `POST` | `/retrieve` | Vector cosine query with metadata filters (`card_product_id`, `issuer_id`). |
| `POST` | `/explain` | Grounded explanation generator using Groq and calculated numbers. |

---

## 7. Frontend-to-Backend API Interaction

The Express server (`server.ts`) acts as the single frontend gateway on port 3000, routing client requests and bridging with the FastAPI service or in-memory RRF engine:

### 7.1 `POST /api/recommend`
Evaluates purchases deterministically across user-owned cards.
- **Input:** `{ query: { amount: 10000, merchantName: "Amazon", category: "online_shopping", transactionType: "online" }, ownedCardIds: [...] }`
- **Output:** `{ success: true, data: { recommendedCard: {...}, rankedCards: [...], auditSteps: [...] } }`

### 7.2 `POST /api/rag/retrieve`
Executes hybrid search across policy chunks. First checks if `rag_service.py` is running on port 8000; if unavailable, automatically falls back to the in-memory RRF engine (`src/services/ragEngine.ts`), ensuring zero downtime.
- **Output:** `{ success: true, retrievedChunks: [...], queryTimeMs: 2, fusionMethod: "Reciprocal Rank Fusion" }`

### 7.3 `POST /api/ai/ask-advisor`
Generates grounded policy explanations with bracketed citations using server-side Gemini 3.8 Flash or Groq LLaMA 3.3.
- **Output:** `{ success: true, answer: "...", citations: [{ chunkId, cardName, sourceUrl, effectiveDate, relevanceScore }] }`

### 7.4 `GET /api/rag/chunks`
Supplies all 12 verified knowledge base partitions to the Policy Radar UI.

---

## 8. Caps, Freshness, and Uncertainty Rules

- **Caps in v1:** CardWise compares accrued rewards against monthly caps (e.g. ₹5,000 on SBI Cashback). It assumes the cap is fully available for the current purchase and displays this assumption clearly. Phase 2 introduces real-time monthly ledger cap tracking.
- **Freshness Window (45 Days):** If a card's last verified date exceeds 45 days, a "Stale" indicator appears in the catalog and recommendation card. Stale cards continue calculating based on the last verified rule until an update is approved.
- **Exclusion Precedence:** Exclusions always override earn rates. A transaction categorized under fuel, rent (CRED), wallet reload, or jewelry receives 0 reward points if excluded by the card's policy matrix.
- **Point Valuation Standard:** Nominal points are converted to rupees using verified redemption values (e.g. Infinia 1 RP = ₹1.00; Regalia Gold 1 RP = ₹0.50; SimplyCLICK 1 RP = ₹0.25).

---

## 9. UI Components & Visual Polish

- **Header Top Bar:** Features the Nimbus UI `LiquidNavbar` ("Waterline") with WebGL water droplet physics and audio feedback.
- **Contextual Action Buttons:** The primary 3D WebGL `LiquidMetalButton` ("Optimize ₹ Spend") is **only shown when in the Optimizer section** (`activeTab === 'recommend'`), maintaining clean visual hierarchy across other views.
- **Tactile 3D Cards (`TactileCreditCard.tsx`):** Realistic credit card renders with dynamic bank gradients, chip accents, and network badges (Visa, Mastercard, RuPay, Amex).
- **Glassmorphism Token:** Standardized across all panels:
  ```css
  backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10
  ```

---

## 10. Developer Guide & Verification

```bash
# 1. Install Node.js dependencies
npm install

# 2. Start full-stack dev server (Node.js on port 3000)
npm run dev

# 3. Optional: Start Python FastAPI RAG microservice (Port 8000)
python3 rag_service.py

# 4. Run type check and linter
npm run lint

# 5. Build for production
npm run build
```
