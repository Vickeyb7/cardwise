import React, { useState } from 'react';
import { PolicyDocument } from '../types.ts';
import { OFFICIAL_POLICY_DOCUMENTS } from '../data/policyDocumentsData.ts';
import { POLICY_CHUNKS, PolicyChunk } from '../services/ragEngine.ts';
import {
  FileText,
  ShieldCheck,
  Search,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  History,
  Send,
  Loader2,
  CheckCircle2,
  UploadCloud,
  Database,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const KnowledgeBaseRAG: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<PolicyDocument | null>(
    OFFICIAL_POLICY_DOCUMENTS[0]
  );

  // AI Policy Q&A state
  const [question, setQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiCitations, setAiCitations] = useState<any[]>([]);
  const [retrievedChunks, setRetrievedChunks] = useState<any[]>([]);
  const [ragStats, setRagStats] = useState<{ queryTimeMs: number; fusionStrategy: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeViewMode, setActiveViewMode] = useState<'documents' | 'chunks'>('documents');
  const [selectedChunk, setSelectedChunk] = useState<PolicyChunk | null>(POLICY_CHUNKS[0]);

  // Policy text simulation parser
  const [testPolicyText, setTestPolicyText] = useState<string>(
    'Effective 1st December 2026, HDFC Bank Infinia cardholders will earn 5X Reward Points on Apple transactions via SmartBuy portal, subject to a revised monthly cap of 10,000 points. Rent payments through third-party apps will attract a 1% fee with zero reward points.'
  );
  const [parsedResult, setParsedResult] = useState<any | null>(null);
  const [parseLoading, setParseLoading] = useState<boolean>(false);

  const filteredDocs = OFFICIAL_POLICY_DOCUMENTS.filter(
    (doc) =>
      doc.cardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keyRulesSummary.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredChunks = POLICY_CHUNKS.filter(
    (chunk) =>
      chunk.cardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chunk.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chunk.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chunk.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAskKnowledge = async (customQ?: string) => {
    const q = customQ || question;
    if (!q.trim()) return;

    setLoading(true);
    setAiAnswer(null);
    setAiCitations([]);
    setRetrievedChunks([]);
    setRagStats(null);

    try {
      const res = await fetch('/api/ai/ask-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (data.success) {
        setAiAnswer(data.answer);
        setAiCitations(data.citations || []);
        setRetrievedChunks(data.retrievedChunks || []);
        setRagStats({
          queryTimeMs: data.queryTimeMs || 42,
          fusionStrategy: data.fusionStrategy || 'Reciprocal Rank Fusion (Dense + BM25)',
        });
      } else {
        setAiAnswer('Unable to query the RAG knowledge base. Please try again.');
      }
    } catch (err: any) {
      setAiAnswer('Error querying AI Policy knowledge base. Check connectivity.');
    } finally {
      setLoading(false);
    }
  };

  const handleParsePolicyText = async () => {
    if (!testPolicyText.trim()) return;
    setParseLoading(true);
    setParsedResult(null);

    try {
      const res = await fetch('/api/ai/verify-policy-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyText: testPolicyText,
          bankName: 'HDFC Bank',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setParsedResult(data.extracted);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setParseLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#1a1b21] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Layer 3 RAG & Ingestion Engine</span>
            <span>·</span>
            <span className="text-slate-500">Public Bank Documents</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Bank Policy Knowledge Base
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            CardWise maintains an auditable knowledge base of official credit card reward policies,
            terms & conditions, redemption catalogs, and devaluation alerts retrieved from official bank sources.
          </p>
        </div>

        {/* AI Natural Language Query Box */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-[#121318] border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-emerald-400" />
              <span>Ask AI Policy Grounding Engine</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Grounded on 6 Verified Bank Schedules
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAskKnowledge();
              }}
              placeholder="e.g. Does SBI Cashback give 5% on flight tickets? What is the Accor transfer ratio on Axis Atlas?"
              className="flex-1 h-12 px-4 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400"
            />
            <button
              type="button"
              onClick={() => handleAskKnowledge()}
              disabled={loading || !question.trim()}
              className="h-12 px-5 rounded-xl bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 dark:hover:bg-emerald-400 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Query RAG</span>
            </button>
          </div>

          {/* Preset query prompts */}
          <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] py-1">Quick prompts:</span>
            {[
              'Compare HDFC Infinia vs Axis Atlas for flight spends',
              'What are the exclusions on SBI Cashback Card?',
              'How to maximize Amex Platinum Travel ₹4L milestone?',
            ].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setQuestion(p);
                  handleAskKnowledge(p);
                }}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 text-[11px] cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* AI Response Display */}
          {/* AI Response Display with RAG Retrieval Proof */}
          {aiAnswer && (
            <div className="mt-4 p-5 rounded-xl bg-white dark:bg-[#1a1b21] border border-indigo-200/80 dark:border-emerald-900/80 shadow-md space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>CardWise AI Policy Intelligence (Grounded Synthesis)</span>
                </div>
                {ragStats && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      ⚡ {ragStats.queryTimeMs}ms
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-emerald-400 font-semibold">
                      {ragStats.fusionStrategy}
                    </span>
                  </div>
                )}
              </div>

              {/* Synthesized Answer */}
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {aiAnswer}
              </div>

              {/* Retrieved Chunks Ledger */}
              {retrievedChunks.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400" />
                    <span>Retrieved Policy Chunks & Verification Evidence ({retrievedChunks.length})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {retrievedChunks.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-[#121318] border border-slate-200/70 dark:border-slate-800 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            [Source {idx + 1}] {item.chunk.cardName}
                          </span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 shrink-0">
                            Score: {(item.score * 1000).toFixed(1)}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate">
                          {item.chunk.sectionTitle}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                          "{item.chunk.text}"
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                          <span>Dense #{item.denseRank} · Sparse #{item.sparseRank}</span>
                          <a
                            href={item.chunk.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5 font-semibold"
                          >
                            <span>Verify Source</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Explorer Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveViewMode('documents')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeViewMode === 'documents'
                ? 'bg-white dark:bg-[#1a1b21] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official Bank Documents ({OFFICIAL_POLICY_DOCUMENTS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('chunks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeViewMode === 'chunks'
                ? 'bg-white dark:bg-[#1a1b21] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>RAG Chunks Vector Store ({POLICY_CHUNKS.length})</span>
          </button>
        </div>

        <div className="relative w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeViewMode === 'documents' ? "Filter documents..." : "Search chunk texts, topics..."}
            className="w-full h-9 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Verified Policy Documents Ledger or Chunks Store */}
      {activeViewMode === 'documents' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Document list */}
          <div className="lg:col-span-5 space-y-3">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white dark:bg-[#1a1b21] border-indigo-600 dark:border-emerald-500 shadow-md ring-1 ring-indigo-600/20'
                      : 'bg-white/80 dark:bg-[#1a1b21]/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {doc.bankId.toUpperCase()}
                      </span>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {doc.cardName}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <ShieldCheck className="w-3 h-3" />
                      {doc.verificationStatus}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">
                    {doc.documentTitle}
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Effective: {doc.effectiveDate}</span>
                    <span>·</span>
                    <span>Verified: {doc.lastVerifiedDate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Document Detailed Rules & Change Log */}
          {selectedDoc && (
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#1a1b21] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Document Profile
                    </span>
                    <a
                      href={selectedDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-indigo-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Official Bank Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {selectedDoc.documentTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Associated Card: <strong>{selectedDoc.cardName}</strong>
                  </p>
                </div>

                {/* Rules List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Extracted & Verified Structured Rules
                  </h4>
                  <div className="space-y-2">
                    {selectedDoc.keyRulesSummary.map((rule, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-[#121318] border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Policy Changes & Devaluation Guard */}
                {selectedDoc.recentChanges && (
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-1 text-xs">
                    <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <History className="w-4 h-4 text-amber-600" />
                      <span>Devaluation Guard & Policy Change Log:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedDoc.recentChanges}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* RAG Chunks Store Explorer */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chunks List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredChunks.map((chunk) => {
              const isSelected = selectedChunk?.id === chunk.id;
              return (
                <div
                  key={chunk.id}
                  onClick={() => setSelectedChunk(chunk)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white dark:bg-[#1a1b21] border-indigo-600 dark:border-emerald-500 shadow-md ring-1 ring-indigo-600/20'
                      : 'bg-white/80 dark:bg-[#1a1b21]/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {chunk.bankId.toUpperCase()} · {chunk.tokenCount} TOKENS
                      </span>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {chunk.cardName}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <ShieldCheck className="w-3 h-3" />
                      {chunk.verificationStatus}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {chunk.sectionTitle}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {chunk.text}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {chunk.keyTopics.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Chunk Inspector */}
          {selectedChunk && (
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#1a1b21] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400" />
                      <span>Chunk ID: {selectedChunk.id}</span>
                    </span>
                    <a
                      href={selectedChunk.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-indigo-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Direct Document Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                    {selectedChunk.sectionTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Associated Card: <strong>{selectedChunk.cardName}</strong> ({selectedChunk.bankId.toUpperCase()})
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121318] border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                  {selectedChunk.text}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Token Length</div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {selectedChunk.tokenCount} Tokens
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Effective Date</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                      {selectedChunk.effectiveDate}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Last Verified</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                      {selectedChunk.lastVerifiedDate}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Verification</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      {selectedChunk.verificationStatus}
                    </div>
                  </div>
                </div>

                {selectedChunk.recentDevaluationOrChange && (
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-1 text-xs">
                    <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <History className="w-4 h-4 text-amber-600" />
                      <span>Devaluation Guard / Revision Watch:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedChunk.recentDevaluationOrChange}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Indexed Keyword Tokens
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedChunk.keyTopics.map((topic: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ingestion & Rule Parser Simulation */}
      <div className="bg-white dark:bg-[#1a1b21] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />
            <span>AI Policy Ingestion & Devaluation Detector (Document Testing)</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Test how the CardWise ingestion engine processes bank policy amendments, detects devaluation clauses, and extracts structured earn parameters into the rules ledger.
          </p>
        </div>

        <textarea
          value={testPolicyText}
          onChange={(e) => setTestPolicyText(e.target.value)}
          rows={3}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-[#121318] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleParsePolicyText}
            disabled={parseLoading}
            className="px-4 py-2.5 rounded-xl bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 dark:hover:bg-emerald-400 transition-colors cursor-pointer disabled:opacity-50"
          >
            {parseLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Run AI Rule Extractor</span>
          </button>
        </div>

        {parsedResult && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121318] text-xs space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Extraction Confidence: {((parsedResult.confidence || 0.95) * 100).toFixed(0)}%
              </span>
              <span className="text-slate-400 font-mono text-[10px]">
                Effective: {parsedResult.effectiveDate || '2026-12-01'}
              </span>
            </div>
            <div>
              <strong>Extracted Summary: </strong> {parsedResult.summary}
            </div>
            {parsedResult.devaluationDetected && (
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Devaluation or Cap Reduction Alert: Accelerated multiplier or cap reduction detected in statement text!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
