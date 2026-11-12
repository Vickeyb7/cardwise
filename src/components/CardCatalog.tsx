import React, { useState, useMemo } from 'react';
import { CreditCard as CreditCardType, BankId, CardCategory } from '../types.ts';
import { TactileCreditCard } from './TactileCreditCard.tsx';
import {
  Search,
  Filter,
  Check,
  Plus,
  ShieldCheck,
  ExternalLink,
  Plane,
  ShoppingBag,
  Zap,
  Sparkles,
} from 'lucide-react';

interface CardCatalogProps {
  allCards: CreditCardType[];
  ownedCardIds: string[];
  onToggleCard: (cardId: string) => void;
  onSelectForRecommendation?: (card: CreditCardType) => void;
}

export const CardCatalog: React.FC<CardCatalogProps> = ({
  allCards,
  ownedCardIds,
  onToggleCard,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<BankId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | 'all'>('all');
  const [inspectingCard, setInspectingCard] = useState<CreditCardType | null>(null);

  const bankOptions: { id: BankId | 'all'; label: string }[] = [
    { id: 'all', label: 'All Banks' },
    { id: 'hdfc', label: 'HDFC Bank' },
    { id: 'sbi', label: 'SBI Card' },
    { id: 'axis', label: 'Axis Bank' },
    { id: 'icici', label: 'ICICI Bank' },
    { id: 'amex', label: 'American Express' },
    { id: 'hsbc', label: 'HSBC India' },
    { id: 'federal', label: 'Federal / Scapia' },
    { id: 'indusind', label: 'IndusInd Bank' },
    { id: 'kotak', label: 'Kotak Mahindra' },
    { id: 'idfc', label: 'IDFC FIRST' },
    { id: 'standard_chartered', label: 'Standard Chartered' },
    { id: 'au', label: 'AU Small Finance' },
    { id: 'rbl', label: 'RBL Bank' },
    { id: 'yes', label: 'YES Bank' },
  ];

  const categoryOptions: { id: CardCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Rewards' },
    { id: 'cashback', label: 'Cashback Champions' },
    { id: 'travel_miles', label: 'Travel & AirMiles' },
    { id: 'super_premium', label: 'Super-Premium Metals' },
    { id: 'lifestyle_rewards', label: 'Shopping & Lifestyle' },
  ];

  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.baseRateDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBank = selectedBank === 'all' || card.bankId === selectedBank;
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;

      return matchesSearch && matchesBank && matchesCategory;
    });
  }, [allCards, searchQuery, selectedBank, selectedCategory]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search */}
      <div className="bg-white dark:bg-[#1a1b21] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Curated Indian Card Directory</span>
            <span>·</span>
            <span className="text-slate-500">Public Bank Documentation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Discover Credit Cards
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search and add the credit cards you currently own to your profile.
            CardWise maintains real-time knowledge of all reward structures.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by card name (e.g. Infinia, Atlas, SBI Cashback)..."
            className="w-full h-12 pl-11 pr-4 text-sm font-medium bg-white dark:bg-[#121318] border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400"
          />
          <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>

        {/* Bank & Category Filters */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Bank chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider shrink-0 text-[11px] mr-1">
              Bank:
            </span>
            {bankOptions.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBank(b.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedBank === b.id
                    ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Category chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider shrink-0 text-[11px] mr-1">
              Type:
            </span>
            {categoryOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-indigo-600 text-white dark:bg-slate-700 dark:text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => {
          const isOwned = ownedCardIds.includes(card.id);
          return (
            <div
              key={card.id}
              className={`bg-white dark:bg-[#1a1b21] rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isOwned
                  ? 'border-indigo-600/40 dark:border-emerald-500/40 shadow-md ring-1 ring-indigo-600/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                {/* Tactile Card preview */}
                <div
                  className="cursor-pointer transition-all duration-300 hover:scale-[1.02] rounded-xl overflow-hidden shadow-sm hover:shadow-md"
                  onClick={() => setInspectingCard(card)}
                >
                  <TactileCreditCard card={card} isCompact={true} />
                </div>

                {/* Card Info */}
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {card.bankName}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        {card.name}
                      </h3>
                    </div>

                    <span className="text-xs font-extrabold text-slate-900 dark:text-white tabular-nums font-sans">
                      {card.annualFee === 0 ? 'Lifetime Free' : `₹${card.annualFee}/yr`}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {card.baseRateDescription}
                  </p>
                </div>

                {/* Accelerated Preview Tag */}
                {card.acceleratedRules.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121318] border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-indigo-600 dark:text-emerald-400">Top Offer: </span>
                    <span>{card.acceleratedRules[0].description}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setInspectingCard(card)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Inspect Rules
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCard(card.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    isOwned
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-emerald-400 shadow-xs'
                  }`}
                >
                  {isOwned ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>In My Vault</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Vault</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* INSPECTION MODAL */}
      {inspectingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white dark:bg-[#1a1b21] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {inspectingCard.bankName}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {inspectingCard.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingCard(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Tactile Card */}
            <div className="flex justify-center my-2">
              <div className="w-full max-w-[420px] relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 via-emerald-500/10 to-amber-500/10 rounded-3xl blur-xl opacity-75 pointer-events-none" />
                <div className="relative">
                  <TactileCreditCard card={inspectingCard} />
                </div>
              </div>
            </div>

            {/* Core Specs */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#121318] text-xs">
              <div>
                <span className="text-slate-500">Annual Fee</span>
                <div className="font-bold text-slate-900 dark:text-white">
                  ₹{inspectingCard.annualFee.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <span className="text-slate-500">Forex Markup</span>
                <div className="font-bold text-slate-900 dark:text-white">
                  {inspectingCard.forexMarkupPercent}%
                </div>
              </div>
              <div>
                <span className="text-slate-500">Reward Currency</span>
                <div className="font-bold text-slate-900 dark:text-white">
                  {inspectingCard.pointCurrencyName} (₹{inspectingCard.pointValueInInr}/pt)
                </div>
              </div>
              <div>
                <span className="text-slate-500">Lounge Access</span>
                <div className="font-bold text-slate-900 dark:text-white truncate">
                  {inspectingCard.loungeAccess}
                </div>
              </div>
            </div>

            {/* Accelerated Rules List */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Accelerated Multiplier Rules
              </div>
              {inspectingCard.acceleratedRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                >
                  <div className="font-semibold">{rule.description}</div>
                  {rule.capPerMonth && (
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">
                      Cap: ₹{rule.capPerMonth.toLocaleString('en-IN')}/month
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Exclusions */}
            {inspectingCard.exclusions.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Bank Exclusions
                </div>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  {inspectingCard.exclusions.map((ex, idx) => (
                    <li key={idx}>{ex.reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <a
                href={inspectingCard.sourceDoc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-indigo-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>View Official Bank Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={() => {
                  onToggleCard(inspectingCard.id);
                  setInspectingCard(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs"
              >
                {ownedCardIds.includes(inspectingCard.id)
                  ? 'Remove from Vault'
                  : 'Add to My Vault'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
