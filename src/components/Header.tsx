import React from 'react';
import { Sparkles, CreditCard, TrendingUp, Layers, Radar, Sun, Moon, User } from 'lucide-react';
import { LiquidNavbar, type LiquidNavItem } from './ui/liquid-glass-navbar.tsx';

interface HeaderProps {
  activeTab: 'recommend' | 'portfolio' | 'insights' | 'catalog' | 'knowledge';
  setActiveTab: (tab: 'recommend' | 'portfolio' | 'insights' | 'catalog' | 'knowledge') => void;
  isDark: boolean;
  toggleTheme: () => void;
  ownedCount: number;
  userName: string;
  userPhoto?: string;
  isGoogleUser?: boolean;
  onOpenProfile: () => void;
  onOpenLogin: () => void;
  onQuickRecommend?: () => void;
}

const NAV_TABS = ['recommend', 'portfolio', 'insights', 'catalog', 'knowledge'] as const;

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  ownedCount,
  userName,
  userPhoto,
  isGoogleUser = false,
  onOpenProfile,
  onOpenLogin,
  onQuickRecommend,
}) => {
  const navItems: LiquidNavItem[] = [
    {
      label: 'Optimizer',
      icon: <Sparkles size={18} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: ownedCount > 0 ? `My Vault (${ownedCount})` : 'My Vault',
      icon: <CreditCard size={18} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: 'Insights',
      icon: <TrendingUp size={18} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: 'Card Catalog',
      icon: <Layers size={18} strokeWidth={2.2} />,
      fx: 'pop',
    },
    {
      label: 'Policy Radar',
      icon: <Radar size={18} strokeWidth={2.2} />,
      fx: 'wave',
    },
  ];

  const activeIndex = NAV_TABS.indexOf(activeTab);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border-b border-white/20 dark:border-white/10 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark (single text element wordmark as required by Top Bar Contract) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('recommend')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              CardWise
            </span>
          </button>
        </div>

        {/* Zone 2: Liquid Glass Navbar (Optimizer, My Vault, Insights, Card Catalog, Policy Radar) */}
        <div className="hidden md:flex items-center justify-center">
          <LiquidNavbar
            items={navItems}
            active={activeIndex !== -1 ? activeIndex : 0}
            onChange={(idx) => {
              const target = NAV_TABS[idx];
              if (target) setActiveTab(target);
            }}
            tone={isDark ? 'dark' : 'light'}
            sound={true}
          />
        </div>

        {/* Zone 3: 1 primary action button + utility icons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Classic Light Mode' : 'Switch to Obsidian Dark Mode'}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User profile or Google Sign-In button */}
          {isGoogleUser ? (
            <button
              onClick={onOpenProfile}
              title={`Signed in as ${userName} (${ownedCount} cards synced)`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {userPhoto ? (
                <img src={userPhoto} alt={userName} className="w-5 h-5 rounded-full object-cover border border-emerald-400" />
              ) : (
                <User className="w-3.5 h-3.5 text-emerald-500" />
              )}
              <span className="truncate max-w-[85px]">{userName.split(' ')[0]}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" title="Cloud Synced" />
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              title="Faster login using Gmail to save your cards"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="hidden sm:inline">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
