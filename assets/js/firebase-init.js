// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDOIt7fmrcHiL8VJbqXqaw-bBmzVuLxxvo",
  authDomain: "ravanatec.firebaseapp.com",
  projectId: "ravanatec",
  storageBucket: "ravanatec.firebasestorage.app",
  messagingSenderId: "43608207475",
  appId: "1:43608207475:web:4be9d1bc1698e8ae1e3a06",
  measurementId: "G-47HKDPCRH5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (err) {
  console.info("[Firebase Analytics] Analytics initialized or deferred:", err);
}

// Expose globally on window for client convenience
if (typeof window !== "undefined") {
  window.firebaseApp = app;
  window.firebaseAnalytics = analytics;
  console.log("[RAVANA TECH] Firebase initialized successfully // Project: ravanatec");
}
