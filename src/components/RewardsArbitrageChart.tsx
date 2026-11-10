import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { TrendingUp, Sparkles, ArrowUpRight, DollarSign, Target, Award, Calendar } from 'lucide-react';

export interface MonthlyRewardData {
  month: string;
  shortMonth: string;
  monthlySpend: number;
  actualEarnedInr: number;
  optimalEarnedInr: number;
  actualPoints: number;
  optimalPoints: number;
  topWinnerCard: string;
  categoryHighlight: string;
}

// 6-month trailing empirical & simulated arbitrage dataset calibrated for Indian cardholders
export const DEFAULT_MONTHLY_ARBITRAGE: MonthlyRewardData[] = [
  {
    month: 'June 2026',
    shortMonth: 'Jun',
    monthlySpend: 48000,
    actualEarnedInr: 1150,
    optimalEarnedInr: 2450,
    actualPoints: 2300,
    optimalPoints: 4900,
    topWinnerCard: 'SBI Cashback',
    categoryHighlight: '5% Cashback on Amazon & Flipkart vs 1% base',
  },
  {
    month: 'July 2026',
    shortMonth: 'Jul',
    monthlySpend: 62000,
    actualEarnedInr: 1680,
    optimalEarnedInr: 3820,
    actualPoints: 3360,
    optimalPoints: 7640,
    topWinnerCard: 'HDFC Infinia',
    categoryHighlight: '10X SmartBuy Hotel stay booking at Taj',
  },
  {
    month: 'August 2026',
    shortMonth: 'Aug',
    monthlySpend: 54000,
    actualEarnedInr: 1420,
    optimalEarnedInr: 2980,
    actualPoints: 2840,
    optimalPoints: 5960,
    topWinnerCard: 'Axis Atlas',
    categoryHighlight: '5 EDGE Miles/₹100 on direct IndiGo flight tickets',
  },
  {
    month: 'September 2026',
    shortMonth: 'Sep',
    monthlySpend: 78000,
    actualEarnedInr: 2240,
    optimalEarnedInr: 5120,
    actualPoints: 4480,
    optimalPoints: 10240,
    topWinnerCard: 'HDFC Infinia',
    categoryHighlight: 'SmartBuy 5X Flights + Gyftr vouchers',
  },
  {
    month: 'October 2026',
    shortMonth: 'Oct',
    monthlySpend: 95000,
    actualEarnedInr: 2850,
    optimalEarnedInr: 6480,
    actualPoints: 5700,
    optimalPoints: 12960,
    topWinnerCard: 'SBI Cashback',
    categoryHighlight: 'Diwali Festive Online Sales (hit ₹5,000 cap)',
  },
  {
    month: 'November 2026 (MTD)',
    shortMonth: 'Nov',
    monthlySpend: 42000,
    actualEarnedInr: 1220,
    optimalEarnedInr: 3260,
    actualPoints: 2440,
    optimalPoints: 6520,
    topWinnerCard: 'Tata Neu Infinity',
    categoryHighlight: '10% NeuCoins on BigBasket & Croma grocery & tech',
  },
];

interface RewardsArbitrageChartProps {
  isDark?: boolean;
}

export const RewardsArbitrageChart: React.FC<RewardsArbitrageChartProps> = ({ isDark = false }) => {
  const [viewUnit, setViewUnit] = useState<'inr' | 'points'>('inr');
  const [timeframe, setTimeframe] = useState<'6m' | '3m'>('6m');

  const chartData = useMemo(() => {
    const data = timeframe === '3m' ? DEFAULT_MONTHLY_ARBITRAGE.slice(-3) : DEFAULT_MONTHLY_ARBITRAGE;
    return data.map((d) => {
      const actual = viewUnit === 'inr' ? d.actualEarnedInr : d.actualPoints;
      const optimal = viewUnit === 'inr' ? d.optimalEarnedInr : d.optimalPoints;
      const gap = Math.max(0, optimal - actual);
      return {
        ...d,
        displayActual: actual,
        displayOptimal: optimal,
        displayGap: gap,
      };
    });
  }, [timeframe, viewUnit]);

  // Totals & KPI metrics
  const totals = useMemo(() => {
    const totalActualInr = chartData.reduce((sum, d) => sum + d.actualEarnedInr, 0);
    const totalOptimalInr = chartData.reduce((sum, d) => sum + d.optimalEarnedInr, 0);
    const totalSpend = chartData.reduce((sum, d) => sum + d.monthlySpend, 0);
    const totalGapInr = totalOptimalInr - totalActualInr;
    const efficiencyRate = totalOptimalInr > 0 ? (totalActualInr / totalOptimalInr) * 100 : 0;
    const boostPercent = totalActualInr > 0 ? (totalGapInr / totalActualInr) * 100 : 0;

    const totalActualPts = chartData.reduce((sum, d) => sum + d.actualPoints, 0);
    const totalOptimalPts = chartData.reduce((sum, d) => sum + d.optimalPoints, 0);

    return {
      totalActualInr,
      totalOptimalInr,
      totalGapInr,
      totalSpend,
      efficiencyRate: Math.round(efficiencyRate * 10) / 10,
      boostPercent: Math.round(boostPercent * 10) / 10,
      totalActualPts,
      totalOptimalPts,
    };
  }, [chartData]);

  // Color tokens aligned with CardWise & Obsidian Reserve palettes
  const colorActual = isDark ? '#64748B' : '#64748B'; // slate-500
  const colorOptimal = isDark ? '#4EDE23' : '#059669'; // emerald-600 / primary green
  const colorGap = isDark ? '#FFB95F' : '#D97706'; // warm gold / amber
  const gridStroke = isDark ? '#26262B' : '#E2E8F0';
  const textFill = isDark ? '#94A3B8' : '#64748B';

  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-sm space-y-6">
      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-emerald-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Yield Arbitrage Intelligence</span>
            <span>·</span>
            <span className="text-slate-500 dark:text-slate-400">Monthly Performance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Accumulated vs. Optimal Rewards Potential
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Compare actual rewards earned against maximum potential returns if CardWise recommendations were deployed on every spend.
          </p>
        </div>

        {/* View Switches */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Unit Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setViewUnit('inr')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewUnit === 'inr'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Rupee Value (₹)
            </button>
            <button
              type="button"
              onClick={() => setViewUnit('points')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewUnit === 'points'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Reward Points (pts)
            </button>
          </div>

          {/* Timeframe Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setTimeframe('6m')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                timeframe === '6m'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              6 Months
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('3m')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                timeframe === '3m'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              3 Months
            </button>
          </div>
        </div>
      </div>

      {/* 3 Executive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Actual Earned */}
        <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Accumulated Rewards
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-sans mt-1">
            {viewUnit === 'inr' ? `₹${totals.totalActualInr.toLocaleString('en-IN')}` : `${totals.totalActualPts.toLocaleString('en-IN')} pts`}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across ₹{totals.totalSpend.toLocaleString('en-IN')} total card spending
          </div>
        </div>

        {/* Optimal Potential */}
        <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              Optimal Potential Yield
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums font-sans mt-1">
            {viewUnit === 'inr' ? `₹${totals.totalOptimalInr.toLocaleString('en-IN')}` : `${totals.totalOptimalPts.toLocaleString('en-IN')} pts`}
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
            Max potential via verified bank multipliers
          </div>
        </div>

        {/* Left on the Table (Arbitrage Delta) */}
        <div className="p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              Value Left on Table
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-200/60 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300">
              +{totals.boostPercent}% Upside
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums font-sans mt-1">
            +₹{totals.totalGapInr.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-1">
            Portfolio efficiency: <strong>{totals.efficiencyRate}%</strong> of maximum
          </div>
        </div>
      </div>

      {/* Main Recharts Chart Viewport */}
      <div className="w-full h-80 sm:h-96 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 15, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
            <XAxis
              dataKey="shortMonth"
              stroke={textFill}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              stroke={textFill}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(val) => (viewUnit === 'inr' ? `₹${val}` : `${val}`)}
              dx={-5}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0].payload as MonthlyRewardData & {
                  displayActual: number;
                  displayOptimal: number;
                  displayGap: number;
                };
                const gap = d.displayOptimal - d.displayActual;
                return (
                  <div className="bg-white dark:bg-[#121318] p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2.5 max-w-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {d.month}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Spend: ₹{d.monthlySpend.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                          <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
                          <span>Actual Earned:</span>
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                          {viewUnit === 'inr' ? `₹${d.actualEarnedInr.toLocaleString('en-IN')}` : `${d.actualPoints.toLocaleString('en-IN')} pts`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                          <span>Optimal Potential:</span>
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                          {viewUnit === 'inr' ? `₹${d.optimalEarnedInr.toLocaleString('en-IN')}` : `${d.optimalPoints.toLocaleString('en-IN')} pts`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                          Missed Upside:
                        </span>
                        <span className="font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                          +{viewUnit === 'inr' ? `₹${gap.toLocaleString('en-IN')}` : `${(d.optimalPoints - d.actualPoints).toLocaleString('en-IN')} pts`}
                        </span>
                      </div>
                    </div>

                    {/* Winning card footnote */}
                    <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Optimal Card: {d.topWinnerCard}
                      </span>
                      <div>{d.categoryHighlight}</div>
                    </div>
                  </div>
                );
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '12px' }}
              formatter={(value) => {
                if (value === 'displayActual') return <span className="text-slate-600 dark:text-slate-400 font-medium">Actual Accumulated</span>;
                if (value === 'displayOptimal') return <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Optimal Potential</span>;
                return value;
              }}
            />
            {/* Bar for Actual */}
            <Bar
              dataKey="displayActual"
              name="displayActual"
              fill={colorActual}
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
            {/* Smooth curve Line for Optimal potential target trajectory */}
            <Line
              type="monotone"
              dataKey="displayOptimal"
              name="displayOptimal"
              stroke={colorOptimal}
              strokeWidth={3}
              dot={{ r: 4, fill: colorOptimal, strokeWidth: 2, stroke: isDark ? '#1a1b21' : '#FFFFFF' }}
              activeDot={{ r: 6, fill: colorOptimal }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Footnote Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121318] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300">
            <strong>Key Opportunity:</strong> You left an estimated <strong>₹{totals.totalGapInr.toLocaleString('en-IN')}</strong> uncollected over {timeframe === '6m' ? '6 months' : '3 months'} by using generic 1% cards instead of merchant-accelerated partner cards.
          </span>
        </div>
        <span className="text-slate-400 shrink-0 text-[11px] font-mono">
          Updated: Nov 2026
        </span>
      </div>
    </div>
  );
};
