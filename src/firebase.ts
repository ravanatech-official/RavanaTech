import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// User's provided Ravana Tech Firebase production configuration
export const firebaseConfig = {
  apiKey: "AIzaSyB-DnNzQAUQ8_N3eJN0V6g0Y8BWlqBL5Qo",
  authDomain: "raavanaatec.firebaseapp.com",
  projectId: "raavanaatec",
  storageBucket: "raavanaatec.firebasestorage.app",
  messagingSenderId: "814250444039",
  appId: "1:814250444039:web:8c7372b04be5ce6c9cb1a2",
  measurementId: "G-GTPG4BGPP3"
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Safe Analytics Initialization
export const initAnalytics = async () => {
  try {
    if (typeof window !== 'undefined' && await isSupported()) {
      return getAnalytics(app);
    }
  } catch (err) {
    console.warn('Firebase analytics not initialized:', err);
  }
  return null;
};
