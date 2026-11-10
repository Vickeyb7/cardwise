import React, { useState } from 'react';
import { PolicyDocument } from '../types.ts';
import { OFFICIAL_POLICY_DOCUMENTS } from '../data/policyDocumentsData.ts';
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
} from 'lucide-react';

export const KnowledgeBaseRAG: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<PolicyDocument | null>(
    OFFICIAL_POLICY_DOCUMENTS[0]
  );

  // AI Policy Q&A state
  const [question, setQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleAskKnowledge = async (customQ?: string) => {
    const q = customQ || question;
    if (!q.trim()) return;

    setLoading(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ai/ask-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (data.success) {
        setAiAnswer(data.answer);
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
          {aiAnswer && (
            <div className="mt-4 p-4 rounded-xl bg-white dark:bg-[#1a1b21] border border-indigo-200/60 dark:border-emerald-900/60 shadow-sm text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
              <div className="font-bold text-indigo-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>CardWise AI Policy Intelligence:</span>
              </div>
              {aiAnswer}
            </div>
          )}
        </div>
      </div>

      {/* Verified Policy Documents Ledger & Ingestion Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Official Source Documents ({OFFICIAL_POLICY_DOCUMENTS.length})
            </h2>
            <div className="relative w-44">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter documents..."
                className="w-full h-8 px-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
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

              {/* Ingestion Pipeline Tester */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4 text-indigo-600 dark:text-emerald-400" />
                      <span>Test Document Parsing & Change Detection</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Paste a bank SMS, policy update, or T&C text to test the AI rule extraction pipeline.
                    </p>
                  </div>
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
                    className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {parseLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Run AI Rule Extractor</span>
                  </button>
                </div>

                {parsedResult && (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs space-y-2 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      Extraction Confidence: {((parsedResult.confidence || 0.95) * 100).toFixed(0)}%
                    </div>
                    <div>
                      <strong>Summary: </strong> {parsedResult.summary}
                    </div>
                    {parsedResult.devaluationDetected && (
                      <div className="flex items-center gap-1 text-red-600 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Devaluation or Cap Reduction Detected!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
