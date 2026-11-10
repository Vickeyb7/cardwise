import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { TrendingUp, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';

interface AnnualProjectionSparklineProps {
  totalCardsCount: number;
  isDark?: boolean;
}

export const AnnualProjectionSparkline: React.FC<AnnualProjectionSparklineProps> = ({
  totalCardsCount,
  isDark = false,
}) => {
  // Base projected annual multiplier based on portfolio strength
  const baseFactor = Math.max(1, totalCardsCount);
  
  // 12-month cumulative projected reward trajectory (Jan to Dec)
  const projectionData = useMemo(() => {
    const monthlyIncrements = [
      2200, 2600, 3100, 3400, 3900, 4200, 
      4500, 4800, 5200, 5800, 6600, 7200
    ].map((base) => Math.round((base * baseFactor) / 2.2));

    let cumulative = 0;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((m, idx) => {
      cumulative += monthlyIncrements[idx];
      return {
        month: m,
        monthlyReward: monthlyIncrements[idx],
        projectedCumulative: cumulative,
      };
    });
  }, [baseFactor]);

  const endAnnualTotal = projectionData[projectionData.length - 1]?.projectedCumulative || 48600;
  const midYearTotal = projectionData[5]?.projectedCumulative || 19400;
  const growthRate = Math.round(((endAnnualTotal - midYearTotal) / midYearTotal) * 100);

  // Gradient and stroke colors matching theme tokens
  const strokeColor = isDark ? '#4EDE23' : '#059669'; // Emerald
  const fillColor = isDark ? '#4EDE23' : '#10B981';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#0e1c2f] text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-md">
      {/* Specular ambient backdrop glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Projection headline and metrics */}
        <div className="space-y-2 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              Annual Growth Projection
            </span>
            <span className="text-[11px] text-slate-400 font-medium">12-Month Trajectory</span>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums font-sans">
              ₹{endAnnualTotal.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
              <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{growthRate}% 2H Velocity
              </span>
              <span>·</span>
              <span className="text-slate-400">Avg ₹{Math.round(endAnnualTotal / 12).toLocaleString('en-IN')}/mo</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            Modeled from your active {totalCardsCount} card{totalCardsCount > 1 ? 's' : ''} with partner tier multipliers, milestone triggers, and SmartBuy vouchers.
          </p>
        </div>

        {/* Right: Sparkline Chart using Recharts */}
        <div className="flex-1 max-w-md w-full">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
            <span>Jan · ₹{projectionData[0].projectedCumulative.toLocaleString('en-IN')}</span>
            <span className="font-bold text-emerald-400">Dec · ₹{endAnnualTotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="w-full h-20 sm:h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 5, right: 2, left: 2, bottom: 0 }}>
                <defs>
                  <linearGradient id="annualSparklineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={fillColor} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={fillColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-900/95 border border-slate-700 p-2 rounded-lg text-white text-[11px] shadow-lg backdrop-blur-xs">
                        <div className="font-bold text-emerald-400">{d.month} Cumulative</div>
                        <div className="font-mono tabular-nums text-sm font-extrabold">
                          ₹{d.projectedCumulative.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">
                          +₹{d.monthlyReward.toLocaleString('en-IN')} added
                        </div>
                      </div>
                    );
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="projectedCumulative"
                  stroke={strokeColor}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#annualSparklineGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
