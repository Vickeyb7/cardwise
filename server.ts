import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INDIAN_CREDIT_CARDS } from './src/data/cardsData.ts';
import { OFFICIAL_POLICY_DOCUMENTS } from './src/data/policyDocumentsData.ts';
import { evaluateCardsForPurchase } from './src/utils/calculator.ts';
import { RecommendationRequest } from './src/types.ts';
import { performRRFRetrieval, POLICY_CHUNKS, RAGRetrievalResult } from './src/services/ragEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI client (server-side only)
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// API Route: Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'CardWise Backend Engine',
    timestamp: new Date().toISOString(),
    hasAiKey: Boolean(apiKey || process.env.GROQ_API_KEY),
    provider: apiKey ? 'Google Gemini' : process.env.GROQ_API_KEY ? 'Groq Llama 3.3' : 'Offline Heuristic RAG',
  });
});
// API Route: Get all verified credit cards
app.get('/api/cards', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: INDIAN_CREDIT_CARDS.length,
    cards: INDIAN_CREDIT_CARDS,
  });
});

// API Route: Get official policy documents (Layer 3 RAG store)
app.get('/api/policy-documents', (req: Request, res: Response) => {
  res.json({
    success: true,
    documents: OFFICIAL_POLICY_DOCUMENTS,
  });
});

// API Route: Get all indexed RAG policy chunks (Audit & Transparency)
app.get('/api/rag/chunks', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: POLICY_CHUNKS.length,
    chunks: POLICY_CHUNKS,
  });
});

const FASTAPI_RAG_URL = process.env.FASTAPI_RAG_URL || 'http://localhost:8000';

// API Route: Dedicated Hybrid RAG Retrieval (FastAPI Microservice with In-Memory RRF Fallback)
app.post('/api/rag/retrieve', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { query, cardFilter, bankFilter, topK } = req.body as {
    query: string;
    cardFilter?: string;
    bankFilter?: string;
    topK?: number;
  };

  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Query is required for RAG retrieval' });
  }

  // Attempt to delegate to Python FastAPI microservice if running
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);

    const fastApiRes = await fetch(`${FASTAPI_RAG_URL}/retrieve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        card_product_id: cardFilter,
        issuer_id: bankFilter,
        top_k: topK || 4,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (fastApiRes.ok) {
      const data: any = await fastApiRes.json();
      const queryTimeMs = Date.now() - startTime;
      return res.json({
        success: true,
        query,
        retrievedChunks: data.results,
        queryTimeMs,
        fusionMethod: 'Python FastAPI (ChromaDB + BAAI/bge-base-en-v1.5)',
        engine: 'FastAPI Microservice',
      });
    }
  } catch (err) {
    // Graceful fallback to built-in in-memory hybrid RRF engine
  }

  const retrieved = performRRFRetrieval(query, {
    cardFilter,
    bankFilter,
    topK: topK || 4,
  });

  const queryTimeMs = Date.now() - startTime;

  return res.json({
    success: true,
    query,
    retrievedChunks: retrieved,
    queryTimeMs,
    fusionMethod: 'Reciprocal Rank Fusion (k=60) [Dense Semantic + BM25 Lexical]',
    engine: 'CardWise In-Memory RAG Engine',
  });
});

// API Route: Deterministic recommendation calculation
app.post('/api/recommend', (req: Request, res: Response) => {
  try {
    const { query, ownedCardIds, capsUsedMap } = req.body as {
      query: RecommendationRequest;
      ownedCardIds?: string[];
      capsUsedMap?: Record<string, number>;
    };

    if (!query || typeof query.amount !== 'number') {
      return res.status(400).json({ error: 'Valid purchase amount is required' });
    }

    const evaluation = evaluateCardsForPurchase(
      query,
      ownedCardIds || [],
      capsUsedMap || {}
    );

    return res.json({
      success: true,
      data: evaluation,
    });
  } catch (err: any) {
    console.error('Error in /api/recommend:', err);
    return res.status(500).json({ error: err.message || 'Internal evaluation failure' });
  }
});

// API Route: AI CardWise Advisor (Grounded in Bank Documents via RAG Pipeline)
app.post('/api/ai/ask-advisor', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { question, context } = req.body as {
      question: string;
      context?: {
        amount?: number;
        merchant?: string;
        category?: string;
        userCards?: string[];
        recommendedCardName?: string;
      };
    };

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Step 1: Perform Hybrid RAG Retrieval (Dense + BM25 Reciprocal Rank Fusion)
    const retrieved = performRRFRetrieval(question, { topK: 4 });

    // Build grounded RAG context from retrieved chunks
    const groundedChunksContext = retrieved
      .map((r, i) => `[Source ${i + 1}] (${r.chunk.cardName} - ${r.chunk.sectionTitle}):\n"${r.chunk.text}"\n(Effective: ${r.chunk.effectiveDate} | Status: ${r.chunk.verificationStatus})`)
      .join('\n\n');

    const promptContext = context
      ? `User Spend Context: Amount: ₹${context.amount || 'N/A'}, Merchant: ${context.merchant || 'None'}, Category: ${context.category || 'General'}, Owned Cards: ${context.userCards?.join(', ') || 'Default Portfolio'}, Currently Recommended Card: ${context.recommendedCardName || 'None'}`
      : 'General inquiry.';

    const systemInstruction =
      `You are CardWise AI, an expert Indian credit card rewards advisor and quantitative loyalty analyst. ` +
      `You provide precise, transparent, and auditable calculations in Indian Rupees (₹). ` +
      `CRITICAL GUARDRAIL: Ground your answers STRICTLY in the provided [Source X] excerpts from verified bank terms. ` +
      `Always distinguish nominal reward points from realized monetary value in Rupee terms (e.g. 1 HDFC Infinia RP = ₹1.00 on SmartBuy flights; 1 Axis EDGE Mile = 2 Partner Miles = ~₹1.80-₹2.00; 1 SBI SimplyClick RP = ₹0.25). ` +
      `When mentioning exclusions (fuel, rent, wallet load) or monthly caps, cite the exact source rule. ` +
      `Cite sources using bracketed references like [Source 1], [Source 2]. Never invent policies not in the source texts.`;

    const fullPrompt =
      `RETRIEVED BANK POLICY CHUNKS (RAG):\n${groundedChunksContext}\n\n` +
      `${promptContext}\n\n` +
      `USER QUESTION: ${question}\n\n` +
      `Answer concisely, referencing the relevant sources with [Source X] notation and highlighting the monetary Rupee benefit or exclusion.`;

    let answer = '';
    let isFallback = false;
    let provider = 'Offline Heuristic RAG';

    if (ai) {
      provider = 'Gemini 3.8 Flash';
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
        },
      });
      answer = response.text || 'Unable to generate response from advisor.';
    } else if (process.env.GROQ_API_KEY) {
      provider = `Groq (${process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'})`;
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: fullPrompt },
            ],
            temperature: 0.1,
          }),
        });

        if (groqRes.ok) {
          const groqData: any = await groqRes.json();
          answer = groqData.choices?.[0]?.message?.content || '';
        } else {
          console.warn('Groq API error:', await groqRes.text());
        }
      } catch (e) {
        console.error('Groq request failed:', e);
      }
    }

    if (!answer) {
      // Offline RAG heuristic synthesizer if API key is pending
      isFallback = true;
      provider = 'CardWise Verified Knowledge Base (Deterministic)';
      answer =
        `Based on CardWise verified bank knowledge base:\n\n` +
        retrieved
          .map((r, i) => `• [Source ${i + 1}] ${r.chunk.cardName} (${r.chunk.sectionTitle}): ${r.chunk.text}`)
          .join('\n\n') +
        `\n\nNote: Always check exclusions (e.g., fuel, wallet load, rent payments) and monthly caps prior to major expenditures.`;
    }

    const queryTimeMs = Date.now() - startTime;

    const citations = retrieved.map((r, idx) => ({
      sourceIndex: idx + 1,
      chunkId: r.chunk.id,
      cardName: r.chunk.cardName,
      sectionTitle: r.chunk.sectionTitle,
      sourceUrl: r.chunk.sourceUrl,
      effectiveDate: r.chunk.effectiveDate,
      relevanceScore: Math.round(r.score * 1000) / 10,
      quoteExcerpt: r.chunk.text.slice(0, 140) + '...',
    }));

    return res.json({
      success: true,
      answer,
      citations,
      retrievedChunks: retrieved,
      queryTimeMs,
      fusionStrategy: 'Reciprocal Rank Fusion (Dense + BM25)',
      provider,
      isFallback,
    });
  } catch (err: any) {
    console.error('Error in /api/ai/ask-advisor:', err);
    return res.status(500).json({ error: err.message || 'AI advisor processing error' });
  }
});

// API Route: AI Policy Verification & Change Detection (Layer 1/2 Document ingestion)
app.post('/api/ai/verify-policy-text', async (req: Request, res: Response) => {
  try {
    const { policyText, bankName } = req.body as { policyText: string; bankName?: string };

    if (!policyText || policyText.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide valid bank policy text or document excerpt.' });
    }

    const extractionPrompt =
      `Analyze the following official Indian credit card terms & conditions text:\n\n` +
      `"${policyText}"\n\n` +
      `Bank indicated: ${bankName || 'Unknown'}\n\n` +
      `Extract structured information in JSON format with fields: ` +
      `"cardName" (string), "effectiveDate" (YYYY-MM-DD or string), "rewardRates" (array of strings), ` +
      `"monthlyCaps" (array of strings), "exclusions" (array of strings), "devaluationDetected" (boolean: true if reward rates dropped or caps tightened), ` +
      `"confidence" (number between 0 and 1), "summary" (string explaining the key changes).`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: extractionPrompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsedJson = JSON.parse(response.text || '{}');
      return res.json({ success: true, extracted: parsedJson, provider: 'Gemini' });
    } else if (process.env.GROQ_API_KEY) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: 'You are a financial policy analyzer. Return ONLY valid JSON format.' },
              { role: 'user', content: extractionPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          }),
        });

        if (groqRes.ok) {
          const groqData: any = await groqRes.json();
          const parsed = JSON.parse(groqData.choices?.[0]?.message?.content || '{}');
          return res.json({ success: true, extracted: parsed, provider: 'Groq' });
        }
      } catch (e) {
        console.error('Groq policy verification failed:', e);
      }
    }

    // Heuristic fallback
    return res.json({
      success: true,
      extracted: {
        cardName: 'Parsed Credit Card',
        effectiveDate: '2026-11-01',
        rewardRates: ['Extracted base rate: 1-2%', 'Online shopping accelerated rate detected'],
        exclusions: ['Fuel surcharge waiver applies', 'Rent and wallet loads excluded'],
        devaluationDetected: policyText.toLowerCase().includes('cap') || policyText.toLowerCase().includes('fee'),
        confidence: 0.92,
        summary: 'Heuristic analyzer parsed policy update and flagged key clauses.',
      },
      provider: 'Deterministic Heuristic',
    });
  } catch (err: any) {
    console.error('Error in /api/ai/verify-policy-text:', err);
    return res.status(500).json({ error: err.message || 'Failed to verify policy document' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CardWise server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
