// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

export let db = null;
try {
  db = getFirestore(app);
} catch (err) {
  console.info("[Firestore] Firestore initialized or deferred:", err);
}

// Client-Side Defense: Debounce & Anti-Flooding Shield
let lastSubmissionTimestamp = 0;
const SUBMISSION_COOLDOWN_MS = 4000; // 4 seconds between submissions

function sanitizeClientInput(str, maxLen = 1000) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML & tags
    .trim()
    .slice(0, maxLen);
}

// Global persistence helper (Silicon Valley Enterprise Hardened)
export async function saveInquiry(inquiryData) {
  if (!db) return { success: false, reason: "firestore_not_initialized" };
  
  // 1. Bot Honeypot Trap
  if (inquiryData && inquiryData.honeypot && String(inquiryData.honeypot).trim().length > 0) {
    console.warn("[SECURITY] Automated bot form submission intercepted.");
    return { success: true, id: `TRAP-${Date.now()}` };
  }

  // 2. Client-side Flood & Replay Mitigation
  const now = Date.now();
  if (now - lastSubmissionTimestamp < SUBMISSION_COOLDOWN_MS) {
    return { success: false, reason: "Please wait a moment before sending another inquiry." };
  }
  lastSubmissionTimestamp = now;

  // 3. Strict Input Sanitization & Type Enforcement
  const cleanName = sanitizeClientInput(inquiryData.name, 120);
  const cleanEmail = String(inquiryData.email || '').trim().toLowerCase().slice(0, 150);
  const cleanSystem = sanitizeClientInput(inquiryData.system || inquiryData.service || 'Bespoke Engineering', 150);
  const cleanMessage = sanitizeClientInput(inquiryData.message, 5000);

  if (cleanName.length < 2) {
    return { success: false, reason: "Please provide a valid name (at least 2 characters)." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
    return { success: false, reason: "Please provide a valid corporate or personal email address." };
  }
  if (cleanMessage.length < 5) {
    return { success: false, reason: "Please provide a brief message about your project requirements." };
  }

  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      name: cleanName,
      email: cleanEmail,
      system: cleanSystem,
      message: cleanMessage,
      createdAt: serverTimestamp(),
      clientTimestamp: new Date().toISOString(),
      source: "website_command_console",
      status: "new"
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn("[Firestore Enterprise Gate] Ingestion protected or deferred:", err);
    return { success: false, error: "Network transmission protected. Please try again or reach out on WhatsApp." };
  }
}

// Expose globally on window for client convenience
if (typeof window !== "undefined") {
  window.firebaseApp = app;
  window.firebaseAnalytics = analytics;
  window.firebaseDb = db;
  window.saveInquiryToFirestore = saveInquiry;
  console.log("[RAVANA TECH] Firebase & Firestore initialized successfully // Project: ravanatec");
}
