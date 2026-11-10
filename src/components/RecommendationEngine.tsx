import React, { useState, useMemo } from 'react';
import {
  CreditCard as CreditCardType,
  SpendCategory,
  TransactionType,
  RecommendationRequest,
  RecommendationResponse,
} from '../types.ts';
import { POPULAR_MERCHANTS, SPEND_CATEGORIES } from '../data/merchantsData.ts';
import { evaluateCardsForPurchase } from '../utils/calculator.ts';
import { TactileCreditCard } from './TactileCreditCard.tsx';
import {
  Search,
  Sparkles,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Send,
  Loader2,
  Eye,
  Info,
  BarChart3,
} from 'lucide-react';

interface RecommendationEngineProps {
  cards: CreditCardType[];
  ownedCardIds: string[];
  capsUsedMap: Record<string, number>;
  onNavigateToCatalog: () => void;
  onNavigateToPortfolio: () => void;
}

export const RecommendationEngine: React.FC<RecommendationEngineProps> = ({
  cards,
  ownedCardIds,
  capsUsedMap,
  onNavigateToCatalog,
  onNavigateToPortfolio,
}) => {
  // Input state
  const [amountStr, setAmountStr] = useState<string>('10000');
  const [selectedMerchant, setSelectedMerchant] = useState<string>('Amazon India');
  const [merchantSearchQuery, setMerchantSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SpendCategory>('online_shopping');
  const [transactionType, setTransactionType] = useState<TransactionType>('online');
  const [showUnowned, setShowUnowned] = useState<boolean>(true);
  const [selectedResultCardId, setSelectedResultCardId] = useState<string | null>(null);

  // AI Assistant Drawer state
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [showAiDrawer, setShowAiDrawer] = useState<boolean>(false);

  const numericAmount = Math.max(0, parseFloat(amountStr) || 0);

  // Merchant Auto-detection
  const handleSelectMerchant = (merchantName: string, category: SpendCategory) => {
    setSelectedMerchant(merchantName);
    setSelectedCategory(category);
    setMerchantSearchQuery('');
  };

  // Evaluate query
  const recommendationResponse: RecommendationResponse = useMemo(() => {
    const query: RecommendationRequest = {
      amount: numericAmount,
      merchantName: selectedMerchant,
      category: selectedCategory,
      transactionType,
      includeUnownedCards: showUnowned,
    };
    return evaluateCardsForPurchase(query, ownedCardIds, capsUsedMap);
  }, [numericAmount, selectedMerchant, selectedCategory, transactionType, showUnowned, ownedCardIds, capsUsedMap]);

  const winner = recommendationResponse.recommendedCard;
  const rankedCards = recommendationResponse.rankedCards;
  const unownedOpps = recommendationResponse.unownedOpportunities;

  // Selected detail card for step inspection
  const inspectingCard = useMemo(() => {
    if (!selectedResultCardId) return winner;
    const foundOwned = rankedCards.find((c) => c.card.id === selectedResultCardId);
    if (foundOwned) return foundOwned;
    const foundUnowned = unownedOpps.find((c) => c.card.id === selectedResultCardId);
    return foundUnowned || winner;
  }, [selectedResultCardId, winner, rankedCards, unownedOpps]);

  // AI Advisor query handler
  const handleAskAi = async (customPrompt?: string) => {
    const q = customPrompt || aiQuestion;
    if (!q.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);
    setShowAiDrawer(true);

    try {
      const res = await fetch('/api/ai/ask-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          context: {
            amount: numericAmount,
            merchant: selectedMerchant,
            category: selectedCategory,
            recommendedCardName: winner?.card.name,
            userCards: rankedCards.map((c) => c.card.name),
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiAnswer(data.answer);
      } else {
        setAiAnswer('Unable to retrieve AI analysis at this moment. Please try again.');
      }
    } catch (err: any) {
      setAiAnswer('Error connecting to CardWise AI server. Please verify your connection.');
    } finally {
      setAiLoading(false);
    }
  };

  const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header & Context */}
      <div className="bg-white dark:bg-[#1a1b21] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-emerald-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Deterministic Reward Arbitrage Engine</span>
            <span>·</span>
            <span className="text-slate-500 dark:text-slate-400">Indian Issuers Verified</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Purchase Reward Optimizer
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Enter your purchase amount and merchant. CardWise instantly evaluates reward rates,
            accelerated partner portals, monthly caps, and exclusions to give you the highest net ₹ yield.
          </p>
        </div>

        {/* Input Form Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Amount Input */}
          <div className="lg:col-span-5 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Purchase Amount
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-bold text-lg">
                ₹
              </div>
              <input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="10,000"
                min="1"
                step="100"
                className="w-full h-14 pl-10 pr-4 text-2xl font-bold font-sans tabular-nums bg-white dark:bg-[#121318] border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400 transition-colors"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountStr(amt.toString())}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg tabular-nums transition-colors cursor-pointer ${
                    numericAmount === amt
                      ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </button>
              ))}
            </div>
          </div>

          {/* Merchant Search & Picker */}
          <div className="lg:col-span-4 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Merchant or Platform
            </label>
            <div className="relative">
              <input
                type="text"
                value={merchantSearchQuery || selectedMerchant}
                onChange={(e) => {
                  setMerchantSearchQuery(e.target.value);
                  setSelectedMerchant(e.target.value);
                }}
                placeholder="e.g. Amazon, Swiggy, MakeMyTrip..."
                className="w-full h-14 px-4 text-sm font-semibold bg-white dark:bg-[#121318] border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400 transition-colors"
              />
              <Search className="absolute right-4 top-4.5 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Merchant Popular Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {POPULAR_MERCHANTS.slice(0, 5).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMerchant(m.name, m.defaultCategory)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedMerchant.toLowerCase().includes(m.name.toLowerCase().split(' ')[0])
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {m.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Category & Channel Controls */}
          <div className="lg:col-span-3 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Category & Channel
            </label>
            <div className="space-y-2">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as SpendCategory)}
                  aria-label="Purchase Category"
                  className="w-full h-14 px-3 text-xs sm:text-sm font-medium bg-white dark:bg-[#121318] border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400 transition-colors cursor-pointer appearance-none"
                >
                  {SPEND_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Online vs Offline Switch */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setTransactionType('online')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    transactionType === 'online'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Online Web/App
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType('offline')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    transactionType === 'offline'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  In-Store (POS)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WINNER RECOMMENDATION HERO SECTION */}
      {winner && (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#0B192C] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Winner details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  #1 Best Recommended Card
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {winner.isAccelerated ? 'Accelerated Partner Yield' : 'Highest Base Return'}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {winner.card.name}
                </h2>
                <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
                  <span>Issued by {winner.card.bankName}</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">{winner.card.rewardType === 'cashback' ? 'Cashback Program' : 'Reward Miles Program'}</span>
                </p>
              </div>

              {/* Yield Metric Banner */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div>
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Net Benefit
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-sans tabular-nums">
                    ₹{winner.netBenefitInr.toLocaleString('en-IN')}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Return Rate
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans tabular-nums">
                    {winner.effectiveReturnPercent}%
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Reward Accrual
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-amber-300 truncate">
                    {winner.card.rewardType === 'cashback'
                      ? `₹${winner.nominalCashbackEarned.toFixed(0)} Cash`
                      : `${winner.nominalRewardPointsEarned} pts`}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    at ₹{winner.card.pointValueInInr}/pt value
                  </div>
                </div>
              </div>

              {/* Calculation Explanation */}
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Rule Logic:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                  {winner.applicableRuleDescription}. For ₹{numericAmount.toLocaleString('en-IN')} spend, you earn {winner.nominalRewardPointsEarned > 0 ? `${winner.nominalRewardPointsEarned} ${winner.card.pointCurrencyName}` : `₹${winner.nominalCashbackEarned} cashback`} yielding an audited monetary return of ₹{winner.netBenefitInr.toLocaleString('en-IN')}.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleAskAi(`Why is ${winner.card.name} the best option for ₹${numericAmount} at ${selectedMerchant}? Explain the calculation, caps, and point valuation.`)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Ask AI to Explain Calculation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedResultCardId(winner.card.id)}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  View Step-by-Step Audit
                </button>
              </div>
            </div>

            {/* Right: Tactile visual card preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[380px]">
                <TactileCreditCard
                  card={winner.card}
                  showBadge={true}
                  badgeText="Recommended"
                  isSelected={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIDE-BY-SIDE CARD COMPARISON TABLE */}
      <div className="bg-white dark:bg-[#1a1b21] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Portfolio Benefit Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Transparent ranking showing why other cards in your wallet yielded less for this transaction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToPortfolio}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Monthly Arbitrage Chart</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUnowned(!showUnowned)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                showUnowned
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-800 dark:text-slate-200 border border-indigo-200 dark:border-slate-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {showUnowned ? 'Hide Unowned Cards' : 'Show Unowned Opportunities'}
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-3">Rank & Card</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-right">Net Yield (₹)</th>
                <th className="py-3.5 px-3 text-right">Return %</th>
                <th className="py-3.5 px-3">Rule Applied & Why It Ranked Here</th>
                <th className="py-3.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {rankedCards.map((item) => {
                const isSelected = inspectingCard.card.id === item.card.id;
                return (
                  <tr
                    key={item.card.id}
                    onClick={() => setSelectedResultCardId(item.card.id)}
                    className={`transition-colors cursor-pointer ${
                      item.isOptimal
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 font-medium'
                        : isSelected
                        ? 'bg-slate-50 dark:bg-slate-800/50'
                        : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            item.isOptimal
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          #{item.rank}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {item.card.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.card.bankName}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      {item.isOptimal ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                          Recommended
                        </span>
                      ) : item.exclusionApplies ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300">
                          Excluded
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Owned Vault
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-3 text-right">
                      <div className="font-extrabold text-slate-900 dark:text-white tabular-nums font-sans">
                        ₹{item.netBenefitInr.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.nominalRewardPointsEarned > 0
                          ? `${item.nominalRewardPointsEarned} pts`
                          : `₹${item.nominalCashbackEarned}`}
                      </div>
                    </td>

                    <td className="py-4 px-3 text-right">
                      <span
                        className={`font-bold tabular-nums ${
                          item.isOptimal
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {item.effectiveReturnPercent}%
                      </span>
                    </td>

                    <td className="py-4 px-3 max-w-xs sm:max-w-md">
                      <div className="text-xs text-slate-800 dark:text-slate-200">
                        {item.applicableRuleDescription}
                      </div>
                      {item.whyLessBeneficialReason && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                          <Info className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{item.whyLessBeneficialReason}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedResultCardId(item.card.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View calculation audit"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* UNOWNED OPPORTUNITY SECTION ("What You Could Have Earned") */}
        {showUnowned && unownedOpps.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <span>Unowned Card Arbitrage (Opportunity Value)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compare how much more you could earn if you owned these cards for this purchase.
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateToCatalog}
                className="text-xs font-semibold text-indigo-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unownedOpps.slice(0, 3).map((item) => {
                const isBetterThanWinner = item.netBenefitInr > winner.netBenefitInr;
                const gain = item.netBenefitInr - winner.netBenefitInr;
                return (
                  <div
                    key={item.card.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {item.card.bankName}
                          </div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            {item.card.name}
                          </div>
                        </div>

                        {isBetterThanWinner && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                            +₹{gain.toFixed(0)} more
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums font-sans">
                          ₹{item.netBenefitInr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                          ({item.effectiveReturnPercent}%)
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {item.applicableRuleDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Fee: ₹{item.card.annualFee}/yr</span>
                      <button
                        type="button"
                        onClick={onNavigateToCatalog}
                        className="font-semibold text-indigo-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Add to Vault
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* DETAILED AUDIT INSPECTION MODAL / PANEL */}
      {inspectingCard && (
        <div className="bg-slate-50 dark:bg-[#121318] rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Detailed Calculation Audit: {inspectingCard.card.name}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Audited by CardWise Deterministic Layer
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {inspectingCard.calculationSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
            <div>
              <span>Source Document: </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {inspectingCard.sourceDocCitation}
              </span>
            </div>
            <a
              href={inspectingCard.card.sourceDoc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-600 dark:text-emerald-400 hover:underline"
            >
              <span>View Official Bank T&C</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* AI CARDWISE ADVISOR MODAL / SLIDE-OVER */}
      {showAiDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1a1b21] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-emerald-500 text-white dark:text-slate-950 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    CardWise AI Policy Intelligence
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Powered by Gemini 3.8 Flash & Grounded in Official Bank Terms
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAiDrawer(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Answer body */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {aiLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-3">
                  <Loader2 className="w-7 h-7 animate-spin text-indigo-600 dark:text-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Analyzing Bank Terms & Caps...
                  </span>
                </div>
              ) : aiAnswer ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 whitespace-pre-line text-xs sm:text-sm">
                  {aiAnswer}
                </div>
              ) : null}
            </div>

            {/* Input for follow-up questions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAskAi();
                }}
                placeholder="Ask e.g. How do I redeem these points for flights?"
                className="flex-1 h-11 px-3.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border-0 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={() => handleAskAi()}
                disabled={aiLoading || !aiQuestion.trim()}
                className="h-11 px-4 rounded-xl bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 dark:hover:bg-emerald-400 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
