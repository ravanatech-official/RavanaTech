import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  ArrowRight,
  RefreshCw,
  Compass,
  ShoppingBag,
  HeartPulse,
  Building,
  Coffee,
  Scissors
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

interface DemoConfig {
  title: { en: string; si: string };
  category: { en: string; si: string };
  url: string;
  speed: string;
  description: { en: string; si: string };
  features: { en: string; si: string }[];
}

const DEMO_REGISTRY: Record<string, DemoConfig> = {
  p3_s1_bakery: {
    title: { en: 'Crumb & Crust Bakery', si: 'Crumb & Crust බේකරිය' },
    category: { en: 'Artisan Bakery & WhatsApp Menu', si: 'බේකරි හා WhatsApp Ordering' },
    url: '/demos/bakery/index.html',
    speed: '0.2s FCP',
    description: { 
      en: 'Artisan bakery digital menu with 36-hour sourdough, fresh pastries, and instant 1-tap WhatsApp pre-ordering.', 
      si: 'පැය 36 sourdough, කෑම වර්ග සහ තත්පරයෙන් WhatsApp හරහා order කිරීමේ පහසුකම.' 
    },
    features: [
      { en: '1-Tap WhatsApp Pre-order', si: 'තනි Click එකෙන් WhatsApp Order' },
      { en: 'Live Daily Fresh Batch Indicator', si: 'දවසේ නැවුම් තොග පෙන්වීම' },
      { en: 'Zero-Lag Mobile Navigation', si: 'සුපිරි වේගවත් Mobile අත්දැකීම' },
    ],
  },
  p3_s1_salon: {
    title: { en: 'The Grooming Lounge Salon', si: 'The Grooming Lounge සැලෝන්' },
    category: { en: 'VIP Stylist & Appointment Booking', si: 'සැලෝන් හා Appointment Booking' },
    url: '/demos/salon/index.html',
    speed: '0.3s FCP',
    description: { 
      en: 'Modern salon rate card, stylist specialties, grooming packages, and 3-step WhatsApp appointment scheduling.', 
      si: 'මිල ගණන්, විශේෂඥ stylist තේරීම සහ සරල පියවර 3කින් appointment වෙන්කිරීම.' 
    },
    features: [
      { en: 'Real-time Stylist Availability', si: 'Stylist වරුන්ගේ සජීවී වෙලාවන්' },
      { en: 'Service Bundle Calculator', si: 'පැකේජ මිල ස්වයංක්‍රීයව ගණනය' },
      { en: 'Instant Confirmation Dispatch', si: 'ක්ෂණික Confirmation මැසේජ්' },
    ],
  },
  p3_s1_cafe: {
    title: { en: 'Brew & Bean Artisan Cafe', si: 'Brew & Bean කැෆේ එක' },
    category: { en: 'Specialty Coffee & Table Reservation', si: 'කැෆේ හා Table Reservations' },
    url: '/demos/cafe/index.html',
    speed: '0.3s FCP',
    description: { 
      en: 'Single-origin espresso showcase, food pairing menu, and online table reservations with instant confirmation.', 
      si: 'කෝපි වර්ග, ආහාර මෙනුව සහ සජීවීව මේස වෙන්කර ගැනීමේ පහසුකම.' 
    },
    features: [
      { en: 'Table Reservation Form', si: 'මේස වෙන්කර ගැනීමේ පද්ධතිය' },
      { en: 'Interactive Digital Menu', si: 'ආකර්ෂණීය ඩිජිටල් මෙනුව' },
      { en: 'Direct WhatsApp Concierge', si: 'WhatsApp සම්බන්ධතාවය' },
    ],
  },
  p3_s1_villa: {
    title: { en: 'Serendib Prime Estates & Luxury Villas', si: 'Serendib Luxury Villas & Estates' },
    category: { en: 'Luxury Real Estate & Villa Showcase', si: 'සුඛෝපභෝගී හෝටල් හා ඉඩම්' },
    url: '/demos/real-estate/index.html',
    speed: '0.4s FCP',
    description: { 
      en: 'Ultra-luxury villa booking engine, 360 virtual showcase, currency selector, and automated VIP reservation.', 
      si: 'සුඛෝපභෝගී හෝටල් කාමර වෙන්කිරීම්, ඩොලර් ගෙවීම් සහ WhatsApp VIP සම්බන්ධතාවය.' 
    },
    features: [
      { en: 'Multi-Currency Selector (LKR, USD, EUR)', si: 'මුදල් වර්ග තේරීම (LKR, USD)' },
      { en: 'High-Res Architectural Gallery', si: 'උසස් තත්ත්වයේ ඡායාරූප ගැලරිය' },
      { en: 'Direct VIP Booking Concierge', si: 'VIP වෙන්කිරීමේ සම්බන්ධතාවය' },
    ],
  },
  p3_s1_real_estate: {
    title: { en: 'Serendib Prime Estates & Luxury Villas', si: 'Serendib Luxury Estates & Villas' },
    category: { en: 'Luxury Real Estate & Property Showcase', si: 'සුඛෝපභෝගී ඉඩම් හා නිවාස' },
    url: '/demos/real-estate/index.html',
    speed: '0.4s FCP',
    description: { 
      en: 'Architectural floor plans, drone photography layouts, mortgage estimator, and instant agent WhatsApp.', 
      si: 'ඉඩම් හා නිවාස අලෙවිය, ණය මුදල් ගණනය කිරීම් සහ සෘජු විකුණුම්.' 
    },
    features: [
      { en: 'Architectural Floor Plans', si: 'නිවාස සැලසුම් පෙන්වීම' },
      { en: 'Instant Agent Direct Connect', si: 'Agent ට කෙලින්ම WhatsApp ඇමතුම්' },
      { en: 'Investment Estimator', si: 'ආයෝජන ප්‍රතිලාභ ගණනය' },
    ],
  },
  p3_s1_fitness: {
    title: { en: 'IronPulse Elite Fitness & Coaching', si: 'IronPulse ෆිට්නස් සහ කෝචිං' },
    category: { en: 'Personal Trainer & Workout Engine', si: 'පුහුණුකරු හා ව්‍යායාම සැලසුම්' },
    url: '/demos/personal-trainer/index.html',
    speed: '0.2s FCP',
    description: { 
      en: 'Elite personal training programs, transformation case studies, and automated client trial scheduling.', 
      si: 'ව්‍යායාම සැලසුම්, සාර්ථකත්ව සාක්ෂි සහ නොමිලේ trial එකක් වෙන්කිරීමේ පහසුකම.' 
    },
    features: [
      { en: 'Transformation Visuals', si: 'පෙර/පසු සජීවී ප්‍රතිඵල' },
      { en: 'Trial Session Booker', si: 'පළමු සැසිය වෙන්කිරීම' },
      { en: 'Custom Macro Planner', si: 'පෝෂණ සැලසුම් මාර්ගෝපදේශ' },
    ],
  },
  p3_s1_ceylon_retail: {
    title: { en: 'Flora Botanica Luxury Studio', si: 'Flora Botanica සුඛෝපභෝගී මල්හල' },
    category: { en: 'Artisan Florist & Gift Delivery', si: 'මල් සැරසිලි හා තිළිණ බෙදාහැරීම' },
    url: '/demos/flora/index.html',
    speed: '0.3s FCP',
    description: { 
      en: 'Bespoke floral arrangements, same-day delivery scheduler, and 1-tap WhatsApp custom order builder.', 
      si: 'විශේෂ මල් කළඹවල්, එදිනම බෙදාහැරීමේ ක්‍රමය සහ WhatsApp direct orders.' 
    },
    features: [
      { en: 'Same-Day Delivery Slotting', si: 'එදිනම බෙදාහැරීමේ වෙලාවන්' },
      { en: 'Custom Bouquet Builder', si: 'කැමති මල් වර්ග තේරීම' },
      { en: 'Card Payment & WhatsApp Sync', si: 'කාඩ්පත් හා WhatsApp ගෙවීම්' },
    ],
  },
  p3_s1_flora: {
    title: { en: 'Flora Botanica Luxury Studio', si: 'Flora Botanica සුඛෝපභෝගී මල්හල' },
    category: { en: 'Artisan Florist & Gift Delivery', si: 'මල් සැරසිලි හා තිළිණ බෙදාහැරීම' },
    url: '/demos/flora/index.html',
    speed: '0.3s FCP',
    description: { 
      en: 'Bespoke floral arrangements, same-day delivery scheduler, and 1-tap WhatsApp custom order builder.', 
      si: 'විශේෂ මල් කළඹවල්, එදිනම බෙදාහැරීමේ ක්‍රමය සහ WhatsApp direct orders.' 
    },
    features: [
      { en: 'Same-Day Delivery Slotting', si: 'එදිනම බෙදාහැරීමේ වෙලාවන්' },
      { en: 'Custom Bouquet Builder', si: 'කැමති මල් වර්ග තේරීම' },
      { en: 'Card Payment & WhatsApp Sync', si: 'කාඩ්පත් හා WhatsApp ගෙවීම්' },
    ],
  },
  p3_s1_fintech: {
    title: { en: 'Crumb & Crust Bakery', si: 'Crumb & Crust බේකරිය' },
    category: { en: 'Digital Ordering & WhatsApp Menu', si: 'බේකරි හා WhatsApp Ordering' },
    url: '/demos/bakery/index.html',
    speed: '0.2s FCP',
    description: { 
      en: 'Artisan bakery digital menu with 36-hour sourdough, fresh pastries, and instant 1-tap WhatsApp pre-ordering.', 
      si: 'පැය 36 sourdough, කෑම වර්ග සහ තත්පරයෙන් WhatsApp හරහා order කිරීමේ පහසුකම.' 
    },
    features: [
      { en: '1-Tap WhatsApp Pre-order', si: 'තනි Click එකෙන් WhatsApp Order' },
      { en: 'Live Daily Fresh Batch Indicator', si: 'දවසේ නැවුම් තොග පෙන්වීම' },
      { en: 'Zero-Lag Mobile Navigation', si: 'සුපිරි වේගවත් Mobile අත්දැකීම' },
    ],
  },
  p3_s1_telemedicine: {
    title: { en: 'The Grooming Lounge Salon', si: 'The Grooming Lounge සැලෝන්' },
    category: { en: 'Online Appointment Booking Demo', si: 'සැලෝන් හා Appointment Booking' },
    url: '/demos/salon/index.html',
    speed: '0.3s FCP',
    description: { 
      en: 'Modern salon rate card, stylist specialties, grooming packages, and 3-step WhatsApp appointment scheduling.', 
      si: 'මිල ගණන්, විශේෂඥ stylist තේරීම සහ සරල පියවර 3කින් appointment වෙන්කිරීම.' 
    },
    features: [
      { en: 'Real-time Stylist Availability', si: 'Stylist වරුන්ගේ සජීවී වෙලාවන්' },
      { en: 'Service Bundle Calculator', si: 'පැකේජ මිල ස්වයංක්‍රීයව ගණනය' },
      { en: 'Instant Confirmation Dispatch', si: 'ක්ෂණික Confirmation මැසේජ්' },
    ],
  }
};

export const InteractiveConceptualShowcase: React.FC<ShowcaseModalProps> = ({
  demoId,
  isOpen,
  onClose,
  onChooseThisModel,
  language,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  if (!isOpen) return null;

  const demo = DEMO_REGISTRY[demoId] || DEMO_REGISTRY.p3_s1_bakery;

  const handleOpenExternal = () => {
    sfx.playClick();
    window.open(demo.url, '_blank');
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[94dvh] bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="shrink-0 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="font-bold text-white truncate">{demo.title[language]}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-amber-400/90 text-[10px] px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                  {demo.speed}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 truncate">
                {demo.category[language]}
              </p>
            </div>
          </div>

          {/* Right Controls: Device view switcher, open external, reload, close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                  deviceMode === 'desktop' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                  deviceMode === 'mobile' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={handleRefresh}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 border border-neutral-800 transition-colors"
              title="Reload Frame"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            {/* Open in new tab */}
            <button
              type="button"
              onClick={handleOpenExternal}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Open full page in new tab"
            >
              <span className="hidden xs:inline">{language === 'si' ? 'නව Tab එකක' : 'Full Screen'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Interactive Simulator Body */}
        <div className="flex-1 bg-neutral-950 p-2 sm:p-3 overflow-hidden flex items-center justify-center relative">
          <div 
            className={`h-full transition-all duration-300 shadow-2xl rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 relative ${
              deviceMode === 'mobile' ? 'w-[390px] max-w-full' : 'w-full'
            }`}
          >
            <iframe 
              key={iframeKey}
              src={demo.url} 
              title={demo.title.en}
              className="w-full h-full border-0 bg-neutral-950"
              loading="eager"
            />
          </div>
        </div>

        {/* Action Footer Bar */}
        <div className="shrink-0 px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Key Features pills */}
          <div className="hidden md:flex items-center gap-2">
            {demo.features.map((feat, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{feat[language]}</span>
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-semibold transition-colors"
            >
              {language === 'si' ? 'වෙනත් ආදර්ශකයක් බලන්න' : 'Explore Others'}
            </button>
            <button
              type="button"
              onClick={() => {
                sfx.playSuccess();
                onChooseThisModel();
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
            >
              <span>{language === 'si' ? 'මෙම ක්‍රමය තෝරන්න' : 'Adopt This Model'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
