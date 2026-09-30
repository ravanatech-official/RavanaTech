import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Calendar, 
  Compass, 
  Building2,
  Smartphone,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { sfx } from '../utils/audio';

interface ShowcaseModalProps {
  demoId: string;
  isOpen: boolean;
  onClose: () => void;
  onChooseThisModel: () => void;
  language: Language;
}

export const InteractiveConceptualShowcase: React.FC<ShowcaseModalProps> = ({
  demoId,
  isOpen,
  onClose,
  onChooseThisModel,
  language,
}) => {
  if (!isOpen) return null;

  // Render mock live conceptual simulator
  const renderDemoContent = () => {
    switch (demoId) {
      case 'p3_s1_villa':
        return (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-neutral-100">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Conceptual Simulation</span>
                <h4 className="text-lg font-bold font-display">Aura Luxe Private Villas & Safari</h4>
              </div>
              <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 text-xs font-mono">
                99.8% Conversion Speed
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                <Compass className="w-5 h-5 text-amber-400 mb-2" />
                <div className="text-xs text-neutral-400">Yala Safari Suite</div>
                <div className="text-base font-bold text-neutral-100">$480 / night</div>
                <div className="text-[11px] text-emerald-400 mt-1">Instant VIP WhatsApp Reserve</div>
              </div>
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                <Calendar className="w-5 h-5 text-amber-400 mb-2" />
                <div className="text-xs text-neutral-400">Ella Mountain Villa</div>
                <div className="text-base font-bold text-neutral-100">$620 / night</div>
                <div className="text-[11px] text-emerald-400 mt-1">Direct Card / Stripe Checkout</div>
              </div>
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
                <div className="text-xs text-neutral-400">Bentota Ocean Beachfront</div>
                <div className="text-base font-bold text-neutral-100">$750 / night</div>
                <div className="text-[11px] text-emerald-400 mt-1">Private Butler & Helicopter Transfer</div>
              </div>
            </div>

            <div className="bg-neutral-950/70 p-3 rounded-lg border border-neutral-800/80 text-xs text-neutral-300 flex items-center justify-between">
              <span>Features: Real-time currency selector (LKR, USD, GBP, AUD), 360 virtual room walk, zero lag.</span>
              <span className="text-amber-400 font-mono font-bold">Tested at 0.4s FCP</span>
            </div>
          </div>
        );

      case 'p3_s1_fintech':
        return (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-neutral-100">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-sky-400 font-mono">Conceptual Simulation</span>
                <h4 className="text-lg font-bold font-display">Kavacha FinTech & Global Payments</h4>
              </div>
              <div className="px-2.5 py-1 rounded bg-sky-400/10 text-sky-300 text-xs font-mono">
                Bank-Grade Encryption
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                <div className="text-xs text-neutral-400">Processed Transaction Volume</div>
                <div className="text-2xl font-bold font-mono text-neutral-100 mt-1">$4,829,140.00</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <span>+34.2% Month-over-Month</span>
                </div>
              </div>
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                <div className="text-xs text-neutral-400">Gateway Latency</div>
                <div className="text-2xl font-bold font-mono text-sky-400 mt-1">42 ms</div>
                <div className="text-xs text-neutral-400 mt-1">Real-time Fraud Telemetry Guard</div>
              </div>
            </div>

            <div className="bg-neutral-950/70 p-3 rounded-lg border border-neutral-800/80 text-xs text-neutral-300">
              Integrated with Visa/Mastercard, PayHere, Stripe, Apple Pay, and automated tax reporting.
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-neutral-100">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Conceptual Simulation</span>
                <h4 className="text-lg font-bold font-display">High-Conversion Digital Platform</h4>
              </div>
              <div className="px-2.5 py-1 rounded bg-emerald-400/10 text-emerald-300 text-xs font-mono">
                Speed Tested
              </div>
            </div>

            <p className="text-sm text-neutral-300 mb-4">
              Engineered with modern component architecture, instant loading on any smartphone, frictionless checkout, and custom AI follow-ups.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400">Speed Score</div>
                <div className="text-base font-bold text-emerald-400">99 / 100</div>
              </div>
              <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400">Mobile Bounce</div>
                <div className="text-base font-bold text-sky-400">&lt; 12%</div>
              </div>
              <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400">Avg Checkout</div>
                <div className="text-base font-bold text-amber-400">18 sec</div>
              </div>
              <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400">WhatsApp Sync</div>
                <div className="text-base font-bold text-emerald-400">Instant</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-neutral-100 font-display">
            {language === 'si' ? 'සජීවී ආදර්ශක නිර්මාණ පරීක්ෂාව' : 'Interactive Conceptual Showcase Preview'}
          </h3>
        </div>

        {/* Dynamic Simulator Body */}
        {renderDemoContent()}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition-colors"
          >
            {language === 'si' ? 'වෙනත් ආදර්ශකයක් බලන්න' : 'View Another Showcase'}
          </button>

          <button
            type="button"
            onClick={() => {
              sfx.playSuccess();
              onChooseThisModel();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
          >
            <span>{language === 'si' ? 'මගේ ව්‍යාපාරයටත් මෙම ක්‍රමය අවශ්‍යයි' : 'Adopt This Model For My Business'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
