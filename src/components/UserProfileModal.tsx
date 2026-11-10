import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, LogOut, Check, Save, Cloud, Sparkles } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  userPhoto?: string;
  isGoogleUser?: boolean;
  onUpdateProfile: (name: string, email: string) => void;
  onOpenLogin: () => void;
  onLogOut: () => void;
  ownedCount: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  userPhoto,
  isGoogleUser = false,
  onUpdateProfile,
  onOpenLogin,
  onLogOut,
  ownedCount,
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setName(userName);
    setEmail(userEmail);
  }, [userName, userEmail]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(name, email);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/95 dark:bg-[#121318]/95 rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={name}
                className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-emerald-500 dark:to-teal-400 text-white dark:text-slate-950 flex items-center justify-center font-bold text-sm shadow-sm">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {name}
                </h3>
                {isGoogleUser && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    <Cloud className="w-3 h-3 text-emerald-500" />
                    <span>Cloud Synced</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isGoogleUser ? 'Google / Gmail Account' : 'Guest Account (Local Storage)'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Google Authentication Status Banner */}
        {isGoogleUser ? (
          <div className="p-4 rounded-2xl backdrop-blur-md bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Connected via Google</span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Your card vault & usage caps are securely saved to your account.
              </p>
            </div>
            <button
              type="button"
              onClick={onLogOut}
              className="px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl backdrop-blur-md bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-300">
                Data currently saved locally
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-400">
                Sign in with Gmail for faster access and multi-device sync.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0"
            >
              {/* Google G icon */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Login with Gmail</span>
            </button>
          </div>
        )}

        {/* Security & Non-Goal Compliance notice from PRD */}
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Zero-Credentials Architecture:</strong> CardWise never requests or stores card numbers, CVVs, expiry dates, or bank logins. Only card product models and reward rules are linked.
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Account Holder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isGoogleUser}
              className="w-full h-11 px-3 bg-slate-50 dark:bg-[#121318] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400 disabled:opacity-75"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isGoogleUser}
              className="w-full h-11 px-3 bg-slate-50 dark:bg-[#121318] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-600 dark:focus:border-emerald-400 disabled:opacity-75"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121318] border border-slate-200/70 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Saved Cards in Vault:</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">
              {ownedCount} Credit Cards
            </span>
          </div>

          {!isGoogleUser && (
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Profile</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
