import React from 'react';
import { Sparkles, CreditCard, TrendingUp, Layers, Radar } from 'lucide-react';
import { LiquidNavbar, type LiquidNavItem } from './ui/liquid-glass-navbar.tsx';

interface MobileBottomNavProps {
  activeTab: 'recommend' | 'portfolio' | 'insights' | 'catalog' | 'knowledge';
  setActiveTab: (tab: 'recommend' | 'portfolio' | 'insights' | 'catalog' | 'knowledge') => void;
  ownedCount: number;
  isDark?: boolean;
}

const NAV_TABS = ['recommend', 'portfolio', 'insights', 'catalog', 'knowledge'] as const;

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  ownedCount,
  isDark = false,
}) => {
  const activeIndex = NAV_TABS.indexOf(activeTab);

  const items: LiquidNavItem[] = [
    {
      label: 'Optimizer',
      icon: <Sparkles size={17} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: ownedCount > 0 ? `Vault (${ownedCount})` : 'Vault',
      icon: <CreditCard size={17} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: 'Insights',
      icon: <TrendingUp size={17} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: 'Catalog',
      icon: <Layers size={17} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: 'Radar',
      icon: <Radar size={17} strokeWidth={2.2} />,
      fx: 'wave',
    },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 flex items-center justify-center px-2 md:hidden pointer-events-none pb-safe">
      <div className="pointer-events-auto backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border border-white/20 dark:border-white/10 rounded-full p-1 shadow-2xl max-w-full">
        <LiquidNavbar
          items={items}
          active={activeIndex !== -1 ? activeIndex : 0}
          onChange={(idx) => {
            const target = NAV_TABS[idx];
            if (target) setActiveTab(target);
          }}
          tone={isDark ? 'dark' : 'light'}
          sound={true}
          className="scale-[0.88] xs:scale-95 sm:scale-100 origin-bottom"
        />
      </div>
    </div>
  );
};
