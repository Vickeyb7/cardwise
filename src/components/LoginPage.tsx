import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase.ts';

interface LoginPageProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: (user: any) => void;
  onContinueAsGuest: () => void;
  isDark?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  isOpen = true,
  onClose,
  onSuccess,
  onContinueAsGuest,
  isDark = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await signInWithGoogle();
      onSuccess(user);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups for this site.');
      } else {
        setError(err.message || 'Failed to sign in with Google. You can continue as guest.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/90 dark:bg-[#121318]/90 border border-white/20 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 dark:text-white">
        {/* Close Button if closable */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        )}

        {/* CardWise Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-emerald-500 dark:to-teal-400 text-white dark:text-slate-950 shadow-lg ring-1 ring-white/20 mb-1">
            <CreditCard className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Welcome to CardWise
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            India's Intelligent Credit Card Rewards Optimizer
          </p>
        </div>

        {/* Value Proposition Highlights */}
        <div className="space-y-2.5 p-4 rounded-2xl backdrop-blur-md bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Fast login with your Gmail / Google account</span>
          </div>
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Save your credit card portfolio & cashback limits</span>
          </div>
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Real-time access across phone, tablet, and desktop</span>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google / Gmail Sign In Button */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-13 px-4 flex items-center justify-center gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            {/* Google Multi-Color G Icon */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Connecting to Google...' : 'Continue with Google / Gmail'}</span>
          </button>

          <button
            type="button"
            onClick={onContinueAsGuest}
            className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Or continue as Guest (Local storage)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Security & Zero Data Disclaimer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Zero Sensitive Data: We never ask for card numbers, CVVs, or banking passwords.</span>
        </div>
      </div>
    </div>
  );
};
