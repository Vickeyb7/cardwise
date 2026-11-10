import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Provider for Gmail / Google Login
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Test Connection (Critical Directive from Firebase Skill)
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is currently offline. Local cache will be used.');
    }
  }
}
testFirestoreConnection();

export interface UserPortfolioData {
  displayName: string;
  email: string;
  photoURL?: string;
  ownedCardIds: string[];
  capsUsedMap: Record<string, number>;
  theme: 'light' | 'dark';
  updatedAt: string;
}

// Sign in with Google / Gmail
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// Sign out
export async function logOut(): Promise<void> {
  await firebaseSignOut(auth);
}

// Sync user data to Firestore
export async function saveUserData(
  userId: string,
  data: Partial<UserPortfolioData>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Error saving user data to Firestore:', err);
  }
}

// Load user data once from Firestore
export async function loadUserData(userId: string): Promise<UserPortfolioData | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserPortfolioData;
    }
    return null;
  } catch (err) {
    console.error('Error loading user data from Firestore:', err);
    return null;
  }
}

// Subscribe to real-time updates for user data
export function subscribeToUserData(
  userId: string,
  onUpdate: (data: UserPortfolioData) => void
) {
  const userRef = doc(db, 'users', userId);
  return onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      onUpdate(snap.data() as UserPortfolioData);
    }
  });
}
