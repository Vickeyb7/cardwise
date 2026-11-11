/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { RecommendationEngine } from './components/RecommendationEngine.tsx';
import { PortfolioVault } from './components/PortfolioVault.tsx';
import { InsightsTab } from './components/InsightsTab.tsx';
import { CardCatalog } from './components/CardCatalog.tsx';
import { KnowledgeBaseRAG } from './components/KnowledgeBaseRAG.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { UserProfileModal } from './components/UserProfileModal.tsx';
import { LoginPage } from './components/LoginPage.tsx';
import { INDIAN_CREDIT_CARDS } from './data/cardsData.ts';
import { ShieldCheck } from 'lucide-react';
import { auth, saveUserData, loadUserData, subscribeToUserData, logOut } from './lib/firebase.ts';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<'recommend' | 'portfolio' | 'insights' | 'catalog' | 'knowledge'>('recommend');

  // Theme state: CardWise Wealth & Rewards (Light) vs Obsidian Reserve (Dark)
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('cardwise_theme') === 'dark';
  });

  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // User profile state (starts empty for unauthenticated visitors)
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | undefined>(undefined);

  // Owned credit cards state: completely empty by default for new, unauthenticated visitors
  const [ownedCardIds, setOwnedCardIds] = useState<string[]>([]);

  // Tracked monthly cap usage: completely empty by default for new, unauthenticated visitors
  const [capsUsedMap, setCapsUsedMap] = useState<Record<string, number>>({});

  // Apply dark mode class to root document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cardwise_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cardwise_theme', 'light');
    }
  }, [isDark]);

  // Firebase Auth State Listener
  useEffect(() => {
    let unsubscribeFirestore: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const name = user.displayName || user.email?.split('@')[0] || 'CardWise Member';
        const email = user.email || '';
        const photo = user.photoURL || undefined;

        setUserName(name);
        setUserEmail(email);
        setUserPhoto(photo);

        localStorage.setItem('cardwise_user_name', name);
        localStorage.setItem('cardwise_user_email', email);
        if (photo) localStorage.setItem('cardwise_user_photo', photo);

        // Fetch or initialize Firestore data
        const cloudData = await loadUserData(user.uid);
        if (cloudData) {
          if (cloudData.ownedCardIds && cloudData.ownedCardIds.length > 0) {
            setOwnedCardIds(cloudData.ownedCardIds);
          }
          if (cloudData.capsUsedMap) {
            setCapsUsedMap(cloudData.capsUsedMap);
          }
        } else {
          // Initialize document in Firestore for new Google user
          await saveUserData(user.uid, {
            displayName: name,
            email,
            photoURL: photo,
            ownedCardIds,
            capsUsedMap,
            theme: isDark ? 'dark' : 'light',
          });
        }

        // Real-time Firestore sync listener
        unsubscribeFirestore = subscribeToUserData(user.uid, (updatedData) => {
          if (updatedData.ownedCardIds) {
            setOwnedCardIds(updatedData.ownedCardIds);
          }
          if (updatedData.capsUsedMap) {
            setCapsUsedMap(updatedData.capsUsedMap);
          }
        });
      } else {
        setCurrentUser(null);
        setUserName('');
        setUserEmail('');
        setUserPhoto(undefined);
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  // Persist owned cards to localStorage & Firestore
  useEffect(() => {
    localStorage.setItem('cardwise_owned_cards', JSON.stringify(ownedCardIds));
    if (currentUser) {
      saveUserData(currentUser.uid, { ownedCardIds });
    }
  }, [ownedCardIds, currentUser]);

  // Persist caps to localStorage & Firestore
  useEffect(() => {
    localStorage.setItem('cardwise_caps_used', JSON.stringify(capsUsedMap));
    if (currentUser) {
      saveUserData(currentUser.uid, { capsUsedMap });
    }
  }, [capsUsedMap, currentUser]);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (currentUser) {
      saveUserData(currentUser.uid, { theme: nextDark ? 'dark' : 'light' });
    }
  };

  const handleAddCard = (cardId: string) => {
    if (!ownedCardIds.includes(cardId)) {
      const nextCards = [...ownedCardIds, cardId];
      setOwnedCardIds(nextCards);
      if (currentUser) {
        saveUserData(currentUser.uid, { ownedCardIds: nextCards });
      }
    }
  };

  const handleRemoveCard = (cardId: string) => {
    const nextCards = ownedCardIds.filter((id) => id !== cardId);
    setOwnedCardIds(nextCards);
    if (currentUser) {
      saveUserData(currentUser.uid, { ownedCardIds: nextCards });
    }
  };

  const handleToggleCard = (cardId: string) => {
    if (ownedCardIds.includes(cardId)) {
      handleRemoveCard(cardId);
    } else {
      handleAddCard(cardId);
    }
  };

  const handleUpdateProfile = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    localStorage.setItem('cardwise_user_name', name);
    localStorage.setItem('cardwise_user_email', email);
    if (currentUser) {
      saveUserData(currentUser.uid, { displayName: name, email });
    }
  };

  const handleLoginSuccess = (user: FirebaseUser) => {
    setIsLoginOpen(false);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      setUserName('');
      setUserEmail('');
      setUserPhoto(undefined);
      setOwnedCardIds([]);
      setCapsUsedMap({});
      localStorage.removeItem('cardwise_user_name');
      localStorage.removeItem('cardwise_user_email');
      localStorage.removeItem('cardwise_user_photo');
      localStorage.removeItem('cardwise_owned_cards');
      localStorage.removeItem('cardwise_caps_used');
      setIsProfileOpen(false);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] dark:bg-[#121318] text-[#111c2d] dark:text-[#e3e1e9] transition-colors duration-200">
      {/* Top Bar matching Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={handleToggleTheme}
        ownedCount={ownedCardIds.length}
        userName={userName}
        userPhoto={userPhoto}
        isGoogleUser={!!currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onQuickRecommend={() => setActiveTab('recommend')}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-20 md:mb-0">
        {activeTab === 'recommend' && (
          <RecommendationEngine
            cards={INDIAN_CREDIT_CARDS}
            ownedCardIds={ownedCardIds}
            capsUsedMap={capsUsedMap}
            onNavigateToCatalog={() => setActiveTab('catalog')}
            onNavigateToPortfolio={() => setActiveTab('portfolio')}
            onAddCard={handleAddCard}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioVault
            allCards={INDIAN_CREDIT_CARDS}
            ownedCardIds={ownedCardIds}
            onAddCard={handleAddCard}
            onRemoveCard={handleRemoveCard}
            onNavigateToCatalog={() => setActiveTab('catalog')}
            userName={userName}
            isDark={isDark}
            isGoogleUser={!!currentUser}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsTab
            ownedCardIds={ownedCardIds}
            isDark={isDark}
          />
        )}

        {activeTab === 'catalog' && (
          <CardCatalog
            allCards={INDIAN_CREDIT_CARDS}
            ownedCardIds={ownedCardIds}
            onToggleCard={handleToggleCard}
          />
        )}

        {activeTab === 'knowledge' && <KnowledgeBaseRAG />}
      </main>

      {/* Mobile Bottom Navigation Bar (Phone viewport thumb-zone) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ownedCount={ownedCardIds.length}
        isDark={isDark}
      />

      {/* Google / Gmail Login Page Modal */}
      <LoginPage
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onContinueAsGuest={() => setIsLoginOpen(false)}
        isDark={isDark}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userName={userName}
        userEmail={userEmail}
        userPhoto={userPhoto}
        isGoogleUser={!!currentUser}
        onUpdateProfile={handleUpdateProfile}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogOut={handleLogOut}
        ownedCount={ownedCardIds.length}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#121318]/60 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">CardWise</span>
            <span>·</span>
            <span>Credit Card Rewards Optimizer (India)</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Public Bank Rules
            </span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            CardWise does not store card numbers or banking credentials. Calculations are deterministic and auditable.
          </div>
        </div>
      </footer>
    </div>
  );
}
