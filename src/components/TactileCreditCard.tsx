import React from 'react';
import { CreditCard as CreditCardType } from '../types.ts';
import { ShieldCheck, Wifi } from 'lucide-react';

interface TactileCreditCardProps {
  card: CreditCardType;
  userName?: string;
  isCompact?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  showBadge?: boolean;
  badgeText?: string;
}

export const TactileCreditCard: React.FC<TactileCreditCardProps> = ({
  card,
  userName = 'VALUED CARDHOLDER',
  isCompact = false,
  isSelected = false,
  onClick,
  showBadge = false,
  badgeText,
}) => {
  const { visual } = card;

  // Network badge renderer
  const renderNetworkLogo = () => {
    switch (visual.network) {
      case 'visa':
        return (
          <span className="font-extrabold italic text-sm tracking-wider font-mono px-2 py-0.5 rounded bg-white/10 backdrop-blur-xs border border-white/20">
            VISA
          </span>
        );
      case 'mastercard':
        return (
          <div className="flex items-center -space-x-2">
            <div className="w-5 h-5 rounded-full bg-red-500/90 shadow-xs" />
            <div className="w-5 h-5 rounded-full bg-amber-400/90 shadow-xs" />
          </div>
        );
      case 'amex':
        return (
          <span className="font-bold text-xs tracking-tighter uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-400/30 font-mono">
            AMEX
          </span>
        );
      case 'rupay':
        return (
          <span className="font-bold text-xs tracking-wider uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-200 border border-orange-400/30 font-mono">
            RuPay
          </span>
        );
    }
  };

  if (isCompact) {
    return (
      <div
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        className={`relative w-full aspect-[1.586/1] rounded-xl p-3.5 bg-gradient-to-br ${visual.gradient} ${visual.borderStroke} border transition-all duration-200 ${
          isSelected ? 'ring-2 ring-emerald-500 shadow-md scale-[1.02]' : 'hover:scale-[1.01]'
        } cursor-pointer flex flex-col justify-between overflow-hidden shadow-sm`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-white/80">
            {card.bankName}
          </span>
          <Wifi className="w-3.5 h-3.5 text-white/60 rotate-90" />
        </div>

        <div>
          <div className="text-xs font-bold text-white tracking-tight truncate">
            {card.name}
          </div>
          <div className="text-[10px] text-white/70 font-mono tabular-nums">
            •••• •••• •••• {card.id.slice(-4).toUpperCase()}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          <span className="text-[9px] font-medium text-emerald-300">
            {card.rewardType === 'cashback' ? 'Cashback' : 'Rewards'}
          </span>
          {renderNetworkLogo()}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative w-full aspect-[1.586/1] max-w-[420px] rounded-2xl p-5 bg-gradient-to-br ${visual.gradient} ${visual.borderStroke} border transition-all duration-300 ${
        isSelected ? 'ring-2 ring-emerald-500 shadow-xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'
      } ${onClick ? 'cursor-pointer' : ''} flex flex-col justify-between overflow-hidden select-none`}
      style={{
        boxShadow:
          '0 12px 30px -8px rgba(11, 25, 44, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Specular sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

      {/* Top row: Bank Issuer, Contactless icon & Optional Badge */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white/90">
            {card.bankName}
          </div>
          <div className="text-sm font-semibold text-white/80 tracking-tight">
            {card.name}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showBadge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              {badgeText || 'Optimal Pick'}
            </span>
          )}
          <Wifi className="w-4 h-4 text-white/70 rotate-90" />
        </div>
      </div>

      {/* Middle: EMV Chip & Metallic debossed accent */}
      <div className="flex items-center justify-between relative z-10 my-1">
        {/* Physical EMV Chip Graphic */}
        <div
          className={`w-10 h-7 rounded-sm flex flex-col justify-center px-1 border relative overflow-hidden ${
            visual.chipColor === 'gold'
              ? 'bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border-amber-600/40 text-amber-950'
              : 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border-slate-500/40 text-slate-900'
          }`}
          style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.3)' }}
        >
          <div className="w-full h-[1px] bg-black/20 my-[2px]" />
          <div className="flex justify-between w-full">
            <div className="w-2.5 h-2.5 rounded-full border border-black/30" />
            <div className="w-2.5 h-2.5 rounded-full border border-black/30" />
          </div>
          <div className="w-full h-[1px] bg-black/20 my-[2px]" />
        </div>

        {/* Reward Rate Pill */}
        <div className="text-right">
          <div className="text-[11px] font-medium text-white/70 uppercase tracking-wider">
            {card.rewardType === 'cashback' ? 'Net Cashback' : 'Yield Value'}
          </div>
          <div className="text-xs font-bold text-amber-300 tabular-nums">
            {card.baseRateDescription.split('(')[0].trim()}
          </div>
        </div>
      </div>

      {/* Bottom: Cardholder Name, Virtual Digits, Network Logo */}
      <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10">
        <div>
          <div
            className="text-xs font-mono font-medium tracking-widest text-white/90 uppercase"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}
          >
            {userName && userName.trim() ? userName.toUpperCase() : 'VALUED CARDHOLDER'}
          </div>
          <div className="text-[10px] text-white/60 font-mono tracking-wider">
            VALID THRU 11/29
          </div>
        </div>

        <div className="flex items-center gap-2">
          {renderNetworkLogo()}
        </div>
      </div>
    </div>
  );
};
