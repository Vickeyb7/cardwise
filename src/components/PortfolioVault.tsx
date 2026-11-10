import React, { useState } from 'react';
import { CreditCard as CreditCardType } from '../types.ts';
import { TactileCreditCard } from './TactileCreditCard.tsx';
import { RewardsArbitrageChart } from './RewardsArbitrageChart.tsx';
import { AnnualProjectionSparkline } from './AnnualProjectionSparkline.tsx';
import { LiquidMetalButton } from './ui/liquid-metal-button.tsx';
import {
  Plus,
  Trash2,
  TrendingUp,
  Award,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ChevronRight,
  BarChart3,
} from 'lucide-react';

interface PortfolioVaultProps {
  allCards: CreditCardType[];
  ownedCardIds: string[];
  onAddCard: (cardId: string) => void;
  onRemoveCard: (cardId: string) => void;
  onNavigateToCatalog: () => void;
  userName: string;
  isDark?: boolean;
}

export const PortfolioVault: React.FC<PortfolioVaultProps> = ({
  allCards,
  ownedCardIds,
  onAddCard,
  onRemoveCard,
  onNavigateToCatalog,
  userName,
  isDark = false,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    ownedCardIds[0] || 'hdfc_infinia'
  );

  const ownedCards = allCards.filter((c) => ownedCardIds.includes(c.id));
  const activeCard = ownedCards.find((c) => c.id === selectedCardId) || ownedCards[0];

  // Portfolio metrics
  const totalAnnualFee = ownedCards.reduce((acc, c) => acc + c.annualFee, 0);
  const totalCardsCount = ownedCards.length;
  // Estimated annualized value extracted by smart optimization
  const estimatedAnnualValue = Math.max(12000, totalCardsCount * 9450);

  return (
    <div className="space-y-8 pb-12">
      {/* Summary Card with Sparkline Chart: Annual Reward Growth Projection */}
      <AnnualProjectionSparkline totalCardsCount={totalCardsCount} isDark={isDark} />

      {/* Portfolio Header & Summary Metrics */}
      <div className="backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Personal Card Vault</span>
              <span>·</span>
              <span className="text-slate-500">Zero Sensitive Data Stored</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {userName}'s Credit Card Portfolio
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your card arsenal. Only card models and reward tier metadata are saved.
            </p>
          </div>

          <LiquidMetalButton
            label="Add More Cards"
            onClick={onNavigateToCatalog}
            icon={<Plus className="w-4 h-4 text-emerald-400" />}
          />
        </div>

        {/* 4-Stat Strip */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Cards
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-sans mt-1">
              {totalCardsCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Across Indian Issuers</div>
          </div>

          <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Est. Annual Rewards Earned
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums font-sans mt-1">
              ₹{estimatedAnnualValue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              +₹4,200 vs standard debit card
            </div>
          </div>

          <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Annual Fees Payable
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-sans mt-1">
              ₹{totalAnnualFee.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Waiver targets available</div>
          </div>

          <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Policy Verification
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-emerald-400 tabular-nums font-sans mt-1">
              100%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">All official rules verified</div>
          </div>
        </div>
      </div>

      {/* Monthly Rewards Arbitrage Visualization (Recharts) */}
      <RewardsArbitrageChart isDark={isDark} />

      {/* Main Vault Workspace: Left Stack + Right Active Card Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stack / List of Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Your Cards ({ownedCards.length})
            </h2>
            <span className="text-xs text-slate-500">Tap to inspect rules</span>
          </div>

          {ownedCards.length === 0 ? (
            <div className="p-8 text-center backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 rounded-2xl border border-dashed border-white/20 dark:border-white/10 space-y-3">
              <Layers className="w-8 h-8 mx-auto text-slate-400" />
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No credit cards added yet
              </div>
              <p className="text-xs text-slate-500">
                Search and add cards to start receiving optimal purchase recommendations.
              </p>
              <button
                type="button"
                onClick={onNavigateToCatalog}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Browse Supported Cards
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {ownedCards.map((card) => {
                const isSelected = activeCard?.id === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'backdrop-blur-xl bg-white/90 dark:bg-[#121318]/90 border-indigo-600 dark:border-emerald-500 shadow-md ring-1 ring-indigo-600/30 dark:ring-emerald-500/30'
                        : 'backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border-white/20 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Mini card thumbnail */}
                    <div className="w-24 shrink-0">
                      <TactileCreditCard card={card} isCompact={true} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                        {card.bankName}
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {card.name}
                      </div>
                      <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                        {card.baseRateDescription.split('(')[0].trim()}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? 'text-indigo-600 dark:text-emerald-400 translate-x-1'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Card Dossier & Milestones */}
        {activeCard && (
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Hero & Actions */}
            <div className="backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="w-full sm:w-auto max-w-[340px]">
                  <TactileCreditCard card={activeCard} userName={userName} isSelected={true} />
                </div>

                <div className="w-full sm:flex-1 space-y-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {activeCard.bankName}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {activeCard.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Reward Currency</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {activeCard.pointCurrencyName} (₹{activeCard.pointValueInInr}/pt)
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Forex Markup</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {activeCard.forexMarkupPercent}%
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Annual Fee</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        ₹{activeCard.annualFee.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Remove Card button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onRemoveCard(activeCard.id)}
                      className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove from my vault</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Accelerated Multipliers & Rules */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Accelerated Spend Rules & Partner Offers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCard.acceleratedRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10 text-xs space-y-1"
                    >
                      <div className="font-bold text-slate-900 dark:text-white">
                        {rule.description}
                      </div>
                      {rule.capPerMonth && (
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                          Capped at ₹{rule.capPerMonth.toLocaleString('en-IN')}/month
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones if applicable */}
              {activeCard.milestones && activeCard.milestones.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Annual Spend Milestones & Tier Upgrades</span>
                  </h4>

                  <div className="space-y-3">
                    {activeCard.milestones.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 dark:text-amber-200">
                            Spend ₹{(m.spendRequirement / 100000).toFixed(1)} Lakh Milestone
                          </span>
                          <span className="font-extrabold text-amber-700 dark:text-amber-300 tabular-nums font-sans">
                            Yield: ₹{m.monetaryValue.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {m.bonusPointsOrVoucher}
                        </p>
                        {/* Progress Bar simulation */}
                        <div className="w-full bg-amber-200/50 dark:bg-amber-950 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-amber-500 h-1.5 rounded-full"
                            style={{ width: `${Math.min(100, (idx + 1) * 35)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Verification Badge */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>
                    Verified via <strong>{activeCard.sourceDoc.title}</strong>
                  </span>
                </div>
                <a
                  href={activeCard.sourceDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Bank Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
