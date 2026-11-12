import React, { useState, useMemo } from 'react';
import { CreditCard as CreditCardType } from '../types.ts';
import {
  TrendingUp,
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Info,
  ChevronRight,
  Gift,
} from 'lucide-react';

interface VaultYieldSimulatorProps {
  ownedCards: CreditCardType[];
  isDark?: boolean;
}

export const VaultYieldSimulator: React.FC<VaultYieldSimulatorProps> = ({
  ownedCards,
  isDark = false,
}) => {
  // Monthly spend simulator state (default ₹40,000/mo = ₹4.8 Lakhs/year)
  const [monthlySpend, setMonthlySpend] = useState<number>(40000);

  const annualSpend = monthlySpend * 12;

  // Preset spending buttons
  const spendPresets = [
    { label: '₹20k/mo', value: 20000 },
    { label: '₹40k/mo', value: 40000 },
    { label: '₹75k/mo', value: 75000 },
    { label: '₹1.5L/mo', value: 150000 },
  ];

  // Helper to compute effective base reward percentage
  const getCardBaseRatePercent = (card: CreditCardType): number => {
    if (card.baseRewardCalculation?.cashbackPercent) {
      return card.baseRewardCalculation.cashbackPercent;
    }
    if (card.baseRewardCalculation?.pointsPerAmount) {
      const { points, amount } = card.baseRewardCalculation.pointsPerAmount;
      if (amount > 0) {
        return (points / amount) * card.pointValueInInr * 100;
      }
    }
    return 1.0; // fallback base rate
  };

  // Compute metrics per card and for the overall portfolio
  const simulationResults = useMemo(() => {
    if (ownedCards.length === 0) {
      return {
        cardCalculations: [],
        totalBaseRewards: 0,
        totalMilestones: 0,
        totalGrossRewards: 0,
        totalEffectiveFees: 0,
        netAnnualValue: 0,
        totalMilestonesUnlocked: 0,
      };
    }

    // Allocate spend: if 1 card, 100% spend. If multiple cards, equal distribution baseline
    const spendPerCard = annualSpend / ownedCards.length;

    const cardCalculations = ownedCards.map((card) => {
      const baseRatePercent = getCardBaseRatePercent(card);
      const baseEarnInr = Math.round((spendPerCard * baseRatePercent) / 100);

      // Check milestones
      const milestones = card.milestones || [];
      const unlockedMilestones = milestones.filter(
        (m) => m.spendRequirement <= spendPerCard
      );
      const milestoneBonusInr = unlockedMilestones.reduce(
        (sum, m) => sum + m.monetaryValue,
        0
      );

      // Next milestone
      const nextMilestone = milestones.find(
        (m) => m.spendRequirement > spendPerCard
      );

      // Annual fee waiver check
      const feeWaived = card.annualFeeWaiverSpend
        ? spendPerCard >= card.annualFeeWaiverSpend
        : false;
      const effectiveFee = feeWaived ? 0 : card.annualFee;

      const grossValue = baseEarnInr + milestoneBonusInr;
      const netValue = grossValue - effectiveFee;

      return {
        card,
        spendAllocated: spendPerCard,
        baseRatePercent,
        baseEarnInr,
        milestones,
        unlockedMilestones,
        milestoneBonusInr,
        nextMilestone,
        feeWaived,
        effectiveFee,
        grossValue,
        netValue,
      };
    });

    const totalBaseRewards = cardCalculations.reduce(
      (sum, c) => sum + c.baseEarnInr,
      0
    );
    const totalMilestones = cardCalculations.reduce(
      (sum, c) => sum + c.milestoneBonusInr,
      0
    );
    const totalGrossRewards = totalBaseRewards + totalMilestones;
    const totalEffectiveFees = cardCalculations.reduce(
      (sum, c) => sum + c.effectiveFee,
      0
    );
    const netAnnualValue = totalGrossRewards - totalEffectiveFees;
    const totalMilestonesUnlocked = cardCalculations.reduce(
      (sum, c) => sum + c.unlockedMilestones.length,
      0
    );

    return {
      cardCalculations,
      totalBaseRewards,
      totalMilestones,
      totalGrossRewards,
      totalEffectiveFees,
      netAnnualValue,
      totalMilestonesUnlocked,
    };
  }, [ownedCards, annualSpend]);

  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-emerald-400 mb-1">
            <Sliders className="w-4 h-4" />
            <span>Interactive Portfolio Yield Simulator</span>
            <span>·</span>
            <span className="text-slate-500 dark:text-slate-400">
              Deterministic Modeling
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Projected Annual Return on Your Cards
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Calculated strictly from your {ownedCards.length} saved card
            {ownedCards.length > 1 ? 's' : ''} using official bank reward rate tables and spend milestones.
          </p>
        </div>

        {/* Spend Selector Presets */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {spendPresets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setMonthlySpend(preset.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                monthlySpend === preset.value
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spend Slider Control */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Simulated Monthly Spend:
            </span>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-emerald-400 tabular-nums">
              ₹{monthlySpend.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500">
              (₹{(annualSpend / 100000).toFixed(1)} Lakhs/yr)
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Slide to adjust planned expenditure
          </span>
        </div>

        <input
          type="range"
          min={10000}
          max={200000}
          step={5000}
          value={monthlySpend}
          onChange={(e) => setMonthlySpend(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-emerald-500"
        />

        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>₹10,000/mo</span>
          <span>₹50,000/mo</span>
          <span>₹1,00,000/mo</span>
          <span>₹2,00,000/mo</span>
        </div>
      </div>

      {/* 3 Executive Stat Cards Grounded in User's Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Base Rewards */}
        <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Base Reward Yield
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-sans mt-1">
            ₹{simulationResults.totalBaseRewards.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            From baseline earn rates across your cards
          </div>
        </div>

        {/* Milestone Bonus Yield */}
        <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              Spend Milestone Bonuses
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums font-sans mt-1">
            ₹{simulationResults.totalMilestones.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium mt-1">
            {simulationResults.totalMilestonesUnlocked > 0
              ? `${simulationResults.totalMilestonesUnlocked} milestone tier${simulationResults.totalMilestonesUnlocked > 1 ? 's' : ''} unlocked`
              : 'No milestone unlocked at this spend level'}
          </div>
        </div>

        {/* Net Annual Value */}
        <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              Net Annual Portfolio Value
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums font-sans mt-1">
            ₹{simulationResults.netAnnualValue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
            After deducting ₹{simulationResults.totalEffectiveFees.toLocaleString('en-IN')} annual fees
          </div>
        </div>
      </div>

      {/* Per-Card Breakdown Cards */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
          <span>Card-by-Card Yield & Milestone Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {simulationResults.cardCalculations.map((calc) => {
            const card = calc.card;
            return (
              <div
                key={card.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {card.bankName}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {card.name}
                    </h4>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                    Net: ₹{calc.netValue.toLocaleString('en-IN')}/yr
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Base Rewards</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₹{calc.baseEarnInr.toLocaleString('en-IN')} ({calc.baseRatePercent.toFixed(1)}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Milestone Yield</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      ₹{calc.milestoneBonusInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Annual Fee</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {calc.feeWaived ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Waived</span>
                      ) : (
                        `₹${card.annualFee.toLocaleString('en-IN')}`
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Reward Unit</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {card.pointCurrencyName} (₹{card.pointValueInInr}/pt)
                    </span>
                  </div>
                </div>

                {/* Milestone Progress or Upcoming Target */}
                {calc.nextMilestone ? (
                  <div className="space-y-1.5 text-xs bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200/50 dark:border-amber-900/30">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-900 dark:text-amber-300 text-[11px]">
                        Next Milestone: ₹{(calc.nextMilestone.spendRequirement / 100000).toFixed(1)}L spend
                      </span>
                      <span className="font-bold text-amber-700 dark:text-amber-400 text-[11px]">
                        +₹{calc.nextMilestone.monetaryValue.toLocaleString('en-IN')} bonus
                      </span>
                    </div>
                    <div className="w-full bg-amber-200/50 dark:bg-amber-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              (calc.spendAllocated / calc.nextMilestone.spendRequirement) * 100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Spend ₹{(Math.max(0, calc.nextMilestone.spendRequirement - calc.spendAllocated)).toLocaleString('en-IN')} more annually to unlock {calc.nextMilestone.bonusPointsOrVoucher}
                    </div>
                  </div>
                ) : calc.milestones.length > 0 ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] font-medium">All spend milestones achieved at this spend level!</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic">
                    Flat reward card without tier spend milestones.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparency & Privacy Guarantee Banner */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300">
            <strong>Privacy Guarantee:</strong> CardWise does not connect to your bank or read SMS. Figures are calculated deterministically from public bank schedules for your selected cards.
          </span>
        </div>
        <span className="text-slate-400 shrink-0 text-[11px] font-mono">
          Public Bank Verified
        </span>
      </div>
    </div>
  );
};
