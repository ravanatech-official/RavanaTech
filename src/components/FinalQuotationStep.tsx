import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Mail, 
  Copy, 
  ShieldCheck, 
  Clock, 
  Database, 
  Loader2,
  Edit3,
  Check,
  ArrowRight,
  Zap,
  Target,
  FileCheck,
  HelpCircle,
  Smartphone,
  PhoneCall,
  Bookmark,
  X,
  ArrowLeft,
  Volume2
} from 'lucide-react';
import { Language, LocationData, DecisionPathway, DecisionOption } from '../types';
import { sfx, speakVoice, stopVoice } from '../utils/audio';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface FinalQuotationStepProps {
  pathway: DecisionPathway;
  language?: Language;
  location: LocationData | null;
  selectedAnswers: Record<number, DecisionOption>;
  onStartOver: () => void;
  onBackToPreviousStep: () => void;
  onEditStep?: (stepIndex: number) => void;
  onHelpMeChoose?: () => void;
}

export const FinalQuotationStep: React.FC<FinalQuotationStepProps> = ({
  pathway,
  location,
  selectedAnswers,
  onStartOver,
  onBackToPreviousStep,
  onEditStep,
  onHelpMeChoose,
}) => {
  // Generate deterministic/memorable unique Reference Code: RT-XXXX (e.g., RT-8421)
  const [refCode] = useState<string>(() => {
    const existing = localStorage.getItem('ravanatech_current_ref');
    if (existing) return existing;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRef = `RT-${randomNum}`;
    try {
      localStorage.setItem('ravanatech_current_ref', newRef);
    } catch (e) {
      // ignore storage errors
    }
    return newRef;
  });

  // Validation State: "Did we understand your requirements correctly?"
  const [isValidated, setIsValidated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRefCopied, setIsRefCopied] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Modal Dialogs for Exit States
  const [activeModal, setActiveModal] = useState<'talk_founder' | 'not_ready' | null>(null);

  // Form inputs for Cloud Sync / Contact
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [callPreferredTime, setCallPreferredTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavedInCloud, setIsSavedInCloud] = useState(false);

  // Currency & Location detection
  const isSriLanka = location?.isSriLanka ?? true;
  const currencySymbol = isSriLanka ? 'LKR ' : '$';

  // Calculate pricing & timeline dynamically based on selections
  let totalCostMultiplier = 1.0;
  let totalDays = 7;

  Object.values(selectedAnswers).forEach((opt) => {
    if (opt.costWeight) totalCostMultiplier *= opt.costWeight;
    if (opt.timelineDays) totalDays += opt.timelineDays;
  });

  totalDays = Math.max(5, Math.min(21, Math.round(totalDays)));

  // Base range calculation (Clean & transparent pricing)
  const baseMinLKR = 65000;
  const baseMaxLKR = 95000;
  const baseMinUSD = 280;
  const baseMaxUSD = 420;

  const minPrice = isSriLanka
    ? Math.round((baseMinLKR * totalCostMultiplier) / 5000) * 5000
    : Math.round((baseMinUSD * totalCostMultiplier) / 25) * 25;

  const maxPrice = isSriLanka
    ? Math.round((baseMaxLKR * totalCostMultiplier) / 5000) * 5000
    : Math.round((baseMaxUSD * totalCostMultiplier) / 25) * 25;

  // Determine Recommended Direction dynamically based on pathway and user answers
  const getRecommendedDirection = () => {
    if (pathway.id === 'new_website') {
      const cat = selectedAnswers[1]?.title.en || 'Business';
      return {
        title: `High-Converting ${cat.replace(/^\d+\.\s*/, '')} & Lead Generation Engine`,
        badge: 'Recommended Direction',
        description: 'Custom digital platform engineered for rapid client trust, high-intent phone calls, and direct WhatsApp inquiries.',
      };
    }
    if (pathway.id === 'ecommerce_store') {
      return {
        title: 'Frictionless Online Store & WhatsApp Checkout Engine',
        badge: 'E-Commerce Blueprint',
        description: 'Boutique digital storefront designed for rapid mobile browsing, zero cart drop-off, and one-click WhatsApp order confirmation.',
      };
    }
    if (pathway.id === 'booking_system') {
      return {
        title: 'High-Converting Service & WhatsApp Booking Engine',
        badge: 'Automated Booking',
        description: 'Real-time time slots, automated reminders to eliminate no-shows, and seamless two-way calendar synchronization.',
      };
    }
    if (pathway.id === 'custom_system') {
      return {
        title: 'Tailored Cloud Operations Portal & Rapid MVP Architecture',
        badge: 'Custom System Architecture',
        description: 'A bespoke enterprise web application engineered around your exact operational workflows, staff roles, and rapid scaling.',
      };
    }
    if (pathway.id === 'improve_website') {
      return {
        title: 'Sub-Second 95+ PageSpeed Rebuild & Luxury Brand Elevation',
        badge: 'Rebuild & Modernization',
        description: 'Full clean-code rewrite to eliminate slowness, elevate visual luxury aesthetics, and install high-converting sales funnels.',
      };
    }
    // Universal "not_sure" pathway
    const step1Choice = selectedAnswers[1]?.id;
    if (step1Choice === 'p6_now_manual') {
      return {
        title: 'High-Converting Service & WhatsApp Booking Engine',
        badge: 'Automated Booking Solution',
        description: 'Saves 3+ hours daily by putting customer inquiries, time slots, and reminders on 100% autopilot.',
      };
    }
    if (step1Choice === 'p6_now_orders') {
      return {
        title: 'Frictionless Online Store & WhatsApp Checkout Engine',
        badge: 'E-Commerce Solution',
        description: 'Transforms messy social media orders into a clean, automated digital shop with instant order summaries.',
      };
    }
    if (step1Choice === 'p6_now_amateur') {
      return {
        title: 'Sub-Second 95+ PageSpeed Rebuild & Luxury Brand Elevation',
        badge: 'Speed Rebuild Solution',
        description: 'Re-engineers your online presence with bespoke luxury typography, PageSpeed 95+, and high-ticket trust.',
      };
    }
    return {
      title: 'High-Converting Business Presence & Local SEO Dominance',
      badge: 'Business Growth Solution',
      description: 'Engineered specifically to get high-intent calls, qualified WhatsApp leads, and rank on top of Google search results.',
    };
  };

  const recommendedDirection = getRecommendedDirection();

  // Scope & Features Checklist Deliverables (6 Core Deliverables)
  const scopeFeatures = [
    {
      title: 'Core Responsive Architecture',
      desc: 'Ergonomic mobile-first layout with smooth fluid touch targets and retina sharpness.',
      icon: 'Smartphone',
      included: true,
    },
    {
      title: 'WhatsApp Direct Connect & Smart Inquiries',
      desc: 'Pre-formatted conversion funnel routing inquiries directly to your WhatsApp with zero friction.',
      icon: 'MessageCircle',
      included: true,
    },
    {
      title: 'Sub-Second Speed Guarantee (PageSpeed 95+)',
      desc: 'Hand-crafted zero-pill React code with instant asset loading and zero bloated plugins.',
      icon: 'Zap',
      included: true,
    },
    {
      title: 'Schema.org Structured Data & Local SEO',
      desc: 'Search engine rich snippets to dominate Google search results locally and globally.',
      icon: 'Target',
      included: true,
    },
    {
      title: 'Enterprise SSL & Custom Domain Setup',
      desc: 'HTTPS green lock encryption and seamless configuration of your .com / .lk web address.',
      icon: 'ShieldCheck',
      included: true,
    },
    {
      title: '100% Cloud Server Hosting & Zero Maintenance Headache',
      desc: 'High-availability global CDN with automated backups and continuous reliability.',
      icon: 'Database',
      included: true,
    },
  ];

  // Voice announcements in pure English
  const validationSpeech = 'Please verify if we understood your requirements correctly. Your customized architecture blueprint is ready below.';
  const confirmedSpeech = 'Excellent! Here is your official project blueprint, scope checklist, and transparent investment range. Tap WhatsApp below to get started.';

  const playVoice = (speechText: string) => {
    setIsPlayingVoice(true);
    speakVoice(speechText, 'en', {
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playVoice(validationSpeech);
    }, 400);

    return () => {
      clearTimeout(timer);
      stopVoice();
    };
  }, []);

  const handleConfirmValidation = () => {
    sfx.playSuccess();
    setIsValidated(true);
    playVoice(confirmedSpeech);
  };

  // Helper to construct exact Pre-filled Contextual WhatsApp message
  const buildContextualWhatsAppMessage = () => {
    const categoryName = selectedAnswers[1]?.title.en?.replace(/^\d+\.\s*/, '') || pathway.title.en;
    const mainGoalName = selectedAnswers[2]?.title.en?.replace(/^\d+\.\s*/, '') || 'High business conversion';
    const directionName = recommendedDirection.title;

    // Exact requested structure:
    // "Hi Ravana Tech, I just completed the Virtual Reception experience. My Ref is RT-8421. I'm looking for a [Service Website + Booking] for my [Salon]. My main goal is [More WhatsApp appointments]."
    return `Hi Ravana Tech, I just completed the Virtual Reception experience. My Ref is ${refCode}. I'm looking for a [${directionName}] for my [${categoryName}]. My main goal is [${mainGoalName}].

⏱️ Express Timeline: ${totalDays} Working Days
💰 Estimated Investment: ${currencySymbol} ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} (No Hidden Fees)
📋 Scope: Core Responsive Pages, WhatsApp Direct Connect, Sub-Second Speed 95+, Schema SEO, Custom Domain & SSL, 100% Cloud Hosting.

Generated via Ravana Tech Virtual Reception LK-HQ
Lead Architect: Shanthapriya Silva`;
  };

  // Construct text summary for Clipboard and Email
  const buildSummaryText = () => {
    const lines = [
      `🏛️ RAVANA TECH PROJECT BLUEPRINT & INQUIRY`,
      `=======================================`,
      `🔖 Reference Code: ${refCode}`,
      `📍 Client Location: ${location?.flag || '🇱🇰'} ${location?.country || 'Sri Lanka'}`,
      `🎯 Selected Pathway: ${pathway.title.en}`,
      `💡 Recommended Direction: ${recommendedDirection.title}`,
      `---------------------------------------`,
      `📋 CLIENT REQUIREMENTS VALIDATION:`,
    ];

    Object.entries(selectedAnswers).forEach(([stepIdx, opt]) => {
      lines.push(`• Question 0${stepIdx}: ${opt.title.en}`);
      lines.push(`  ↳ Detail: ${opt.subtitle.en}`);
    });

    lines.push(`---------------------------------------`);
    lines.push(`📦 CORE DELIVERABLE SCOPE:`);
    scopeFeatures.forEach((feat) => {
      lines.push(`  ✓ ${feat.title}`);
    });

    lines.push(`---------------------------------------`);
    lines.push(`⏱️ Express Sprint Timeline: ${totalDays} Working Days`);
    lines.push(`💰 Transparent Investment: ${currencySymbol} ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} (No Hidden Fees)`);
    lines.push(`🛡️ Milestone Plan: 50% Start Milestone / 50% Final Delivery & Satisfaction`);

    if (clientName) lines.push(`👤 Client Name: ${clientName}`);
    if (clientPhone) lines.push(`📱 WhatsApp / Phone: ${clientPhone}`);
    if (clientEmail) lines.push(`✉️ Email: ${clientEmail}`);
    if (clientNotes) lines.push(`📝 Custom Notes: ${clientNotes}`);

    lines.push(`=======================================`);
    lines.push(`Architected via Ravana Tech Virtual Reception`);
    lines.push(`Lead Architect: Shanthapriya Silva`);
    return lines.join('\n');
  };

  // 1. Direct WhatsApp Handler
  const handleWhatsAppSend = () => {
    sfx.playClick();
    const text = encodeURIComponent(buildContextualWhatsAppMessage());
    const url = `https://wa.me/94788470610?text=${text}`;
    window.open(url, '_blank');
  };

  // 2. Email Handler
  const handleEmailSend = () => {
    sfx.playClick();
    const subject = encodeURIComponent(`Ravana Tech Blueprint Inquiry [Ref: ${refCode}] - ${clientName || pathway.badge.en}`);
    const body = encodeURIComponent(buildSummaryText());
    const mailtoUrl = `mailto:hello.ravanatech@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  // Copy Clipboard Handler
  const handleCopyClipboard = () => {
    sfx.playClick();
    navigator.clipboard.writeText(buildSummaryText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Copy Ref Code Only
  const handleCopyRefCode = () => {
    sfx.playClick();
    navigator.clipboard.writeText(refCode);
    setIsRefCopied(true);
    setTimeout(() => setIsRefCopied(false), 2500);
  };

  // 3. Save Blueprint into Firestore Database (raavanaatec) & LocalStorage
  const handleSaveBlueprint = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sfx.playClick();
    setIsSubmitting(true);

    const blueprintPayload = {
      refCode: refCode,
      clientName: clientName.trim() || 'Valued Client',
      clientPhone: clientPhone.trim() || 'Not Provided',
      clientEmail: clientEmail.trim() || 'Not Provided',
      clientNotes: clientNotes.trim() || '',
      pathwayId: pathway.id,
      pathwayTitle: pathway.title.en,
      recommendedDirection: recommendedDirection.title,
      country: location?.country || 'Unknown',
      countryCode: location?.code || 'XX',
      isSriLanka: isSriLanka,
      estimatedCostRange: `${currencySymbol} ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`,
      estimatedTimeline: `${totalDays} Working Days`,
      clientValidated: isValidated,
      selectedOptions: Object.entries(selectedAnswers).map(([stepIdx, opt]) => ({
        step: stepIdx,
        title: opt.title.en,
        subtitle: opt.subtitle.en,
      })),
      status: 'saved_blueprint',
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'inquiries'), blueprintPayload);
      localStorage.setItem(`ravanatech_blueprint_${refCode}`, JSON.stringify(blueprintPayload));
      sfx.playSuccess();
      setIsSavedInCloud(true);
    } catch (err) {
      console.warn('Firestore write notice (local fallback cached):', err);
      localStorage.setItem(`ravanatech_blueprint_${refCode}`, JSON.stringify(blueprintPayload));
      sfx.playSuccess();
      setIsSavedInCloud(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Schedule Founder Call Handler
  const handleScheduleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClick();
    setIsSubmitting(true);

    const callPayload = {
      refCode: refCode,
      clientName: clientName.trim() || 'Valued Client',
      clientPhone: clientPhone.trim() || 'Not Provided',
      preferredTime: callPreferredTime,
      pathwayTitle: pathway.title.en,
      recommendedDirection: recommendedDirection.title,
      status: 'call_requested',
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'inquiries'), callPayload);
      sfx.playSuccess();
      setActiveModal(null);

      const text = encodeURIComponent(
        `Hi Shanthapriya, I would like to schedule a 10-minute founder call regarding my project (Ref: ${refCode}). My name is ${clientName || 'Client'} and my preferred time is ${callPreferredTime}.`
      );
      window.open(`https://wa.me/94788470610?text=${text}`, '_blank');
    } catch (err) {
      console.warn('Call request saved locally:', err);
      sfx.playSuccess();
      setActiveModal(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 max-w-4xl mx-auto w-full overflow-y-auto select-none">
      
      {/* ============================================================== */}
      {/* UNIVERSAL ESCAPE BAR (Top Navigation)                           */}
      {/* ============================================================== */}
      <div className="shrink-0 flex items-center justify-between gap-2 pb-2 mb-2 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onBackToPreviousStep}
            className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-neutral-700">|</span>
          <button
            onClick={onStartOver}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            Reset
          </button>
          {pathway.id !== 'not_sure' && onHelpMeChoose && (
            <>
              <span className="text-neutral-700">|</span>
              <button
                type="button"
                onClick={onHelpMeChoose}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer text-[11px]"
              >
                <HelpCircle className="w-3 h-3 text-amber-400" />
                <span>❓ Help Me Choose</span>
              </button>
            </>
          )}
        </div>

        {/* Unique Reference Code Badge */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyRefCode}
            title="Click to copy Reference Code"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold transition-all cursor-pointer group"
          >
            <span>{refCode}</span>
            <Copy className="w-2.5 h-2.5 text-neutral-400 group-hover:text-amber-300" />
            {isRefCopied && <span className="text-[9px] text-emerald-400">✓</span>}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. REAL-TIME VALIDATION GATE: Prominent Headline + 1-Sentence   */}
      {/* ============================================================== */}
      <div className={`shrink-0 rounded-2xl p-3 sm:p-4 mb-2.5 transition-all duration-300 border ${
        isValidated 
          ? 'bg-neutral-900/60 border-emerald-500/40 shadow-sm' 
          : 'bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border-amber-400/50 shadow-xl shadow-amber-400/5'
      }`}>
        <div className="flex items-start sm:items-center justify-between gap-3 pb-2 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 border ${
              isValidated 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                : 'bg-amber-400/10 border-amber-400/40 text-amber-400'
            }`}>
              {isValidated ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  Step 4: Requirements Validation
                </span>
                {isValidated && (
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ✓ Verified
                  </span>
                )}
              </div>
              {/* Prominent Question Headline */}
              <h2 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                Did we understand your requirements correctly?
              </h2>
              {/* 1-Sentence Brief */}
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Review your selected choices below before generating your official project blueprint.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => playVoice(isValidated ? confirmedSpeech : validationSpeech)}
            className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors shrink-0 cursor-pointer"
            title="Listen to English voice guide"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'text-amber-400 animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Selected Answers List with Change buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2">
          {Object.entries(selectedAnswers).map(([stepIdxStr, opt]) => {
            const stepIdx = parseInt(stepIdxStr, 10);
            const stepObj = pathway.steps.find((s) => s.stepIndex === stepIdx);

            return (
              <div 
                key={stepIdx} 
                className="bg-neutral-950/80 p-2 sm:p-2.5 rounded-xl border border-neutral-800/90 flex flex-col justify-between group hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mb-0.5">
                    <span>{stepObj?.stepTitle.en || `Step 0${stepIdx}`}</span>
                    <span className="text-amber-400/80 font-bold">0{stepIdx}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {opt.title.en}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-snug">
                    {opt.subtitle.en}
                  </p>
                </div>

                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => onEditStep(stepIdx)}
                    className="mt-1.5 pt-1 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-400 hover:text-amber-400 transition-colors w-full cursor-pointer"
                  >
                    <span>✎ Change this</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Validation Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-neutral-800/80 text-xs">
          <div className="flex items-center gap-2">
            {!isValidated ? (
              <button
                type="button"
                onClick={handleConfirmValidation}
                className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-400/10 transition-transform active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>✓ That's right</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirmed accurate by client</span>
              </div>
            )}

            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="py-1.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-neutral-400" />
                <span>✎ Change something</span>
              </button>
            )}
          </div>

          <span className="text-[11px] font-mono text-neutral-500">
            Client Confidence: 100%
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. INTERACTIVE PROJECT BLUEPRINT (THE "AHA!" MOMENT)           */}
      {/* ============================================================== */}
      <div className="shrink-0 bg-neutral-900/90 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 shadow-xl mb-2.5">
        
        {/* Architect Heading Bar */}
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-neutral-800">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Real Founder Portrait */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-neutral-950 border border-amber-400/40 p-0.5 overflow-hidden shadow-lg shadow-amber-400/10">
                <img 
                  src="/assets/founder/founder_transparent_FINAL.png" 
                  alt="Shanthapriya Silva"
                  className="w-full h-full object-cover object-top rounded-[10px] bg-neutral-900"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-neutral-950 bg-emerald-500"></span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span>Official Blueprint</span>
                <span>·</span>
                <span className="text-amber-400 font-bold">{refCode}</span>
                <span>·</span>
                <span className="text-neutral-400">{location?.flag || '🇱🇰'} {location?.country || 'Sri Lanka'}</span>
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                Official Ravana Tech Project Blueprint
              </h2>
            </div>
          </div>

          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
            ZERO-SLOP SPRINT
          </span>
        </div>

        {/* 2A. Recommended Direction Card */}
        <div className="my-2.5 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-neutral-950 border border-amber-400/40">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-bold text-[10px] uppercase font-mono tracking-wider">
              {recommendedDirection.badge}
            </span>
            <span className="text-[10px] text-amber-300 font-mono">
              Tailored to your brief
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5 text-amber-200">
            {recommendedDirection.title}
          </h3>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            {recommendedDirection.description}
          </p>
        </div>

        {/* 2B. Scope & Features Checklist */}
        <div className="my-2.5 bg-neutral-950/70 p-2.5 sm:p-3 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scope & Features Checklist (Deliverables):</span>
            </h4>
            <span className="text-[10px] font-mono text-emerald-400">
              6 of 6 Core Standard Included
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs">
            {scopeFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/80">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-200 text-[11px] leading-tight">
                    {feat.title}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                    {feat.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2C. Investment & Sprint Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2">
          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
            <div className="text-[11px] text-neutral-400 mb-0.5">
              Estimated Investment
            </div>
            <div className="text-sm sm:text-base font-extrabold font-mono text-amber-300">
              {currencySymbol}{minPrice.toLocaleString()} - {maxPrice.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              {isSriLanka ? 'LKR (No Hidden Fees)' : 'USD Milestone Pricing'}
            </div>
          </div>

          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
            <div className="text-[11px] text-neutral-400 mb-0.5">
              Delivery Timeline
            </div>
            <div className="text-sm sm:text-base font-extrabold font-mono text-sky-300">
              {totalDays} Working Days
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              Express Sprint Turnaround
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 flex flex-col justify-center">
            <div className="text-[11px] text-neutral-400 mb-0.5">
              Milestone Guarantee
            </div>
            <div className="text-xs font-bold text-emerald-400">
              50% Milestone / 50% Delivery
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              100% Satisfaction Guarantee
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4 IMMEDIATE ACTION PATHWAYS (EXIT STATES)                       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2.5 border-t border-neutral-800/80">
          
          {/* Action 1: 🟢 Direct WhatsApp (Fastest Conversion) */}
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-transform active:scale-98 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">🟢 Direct WhatsApp</span>
          </button>

          {/* Action 2: 💾 Save My Blueprint */}
          <button
            type="button"
            onClick={() => handleSaveBlueprint()}
            disabled={isSubmitting}
            className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSavedInCloud 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                : 'bg-neutral-950 hover:bg-neutral-900 border-amber-400/50 hover:border-amber-400 text-amber-300'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            ) : (
              <Database className="w-3.5 h-3.5 shrink-0" />
            )}
            <span className="truncate">
              {isSavedInCloud ? `✓ Saved (${refCode})` : '💾 Save My Blueprint'}
            </span>
          </button>

          {/* Action 3: 🤝 Talk to Founder */}
          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              setActiveModal('talk_founder');
            }}
            className="py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">🤝 Talk to Founder</span>
          </button>

          {/* Action 4: 🟡 "Not Ready Yet" (Zero-Pressure Exit) */}
          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              setActiveModal('not_ready');
            }}
            className="py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">🟡 Not Ready Yet</span>
          </button>
        </div>

        {/* Quick Utility Links (Copy / Email) */}
        <div className="flex items-center justify-between pt-2 mt-1 text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyClipboard}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{isCopied ? '✓ Copied!' : 'Copy Text Summary'}</span>
            </button>
            <span>·</span>
            <button
              onClick={handleEmailSend}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>Email Blueprint</span>
            </button>
          </div>

          <span className="font-mono text-[10px] text-neutral-600">
            Ref: {refCode}
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: 🤝 TALK TO FOUNDER (Schedule a Call)                   */}
      {/* ============================================================== */}
      {activeModal === 'talk_founder' && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3.5 right-3.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-neutral-800">
              <div className="w-11 h-11 rounded-xl bg-neutral-950 border border-amber-400/50 p-0.5 overflow-hidden shrink-0">
                <img 
                  src="/assets/founder/founder_transparent_FINAL.png" 
                  alt="Shanthapriya Silva"
                  className="w-full h-full object-cover object-top rounded-lg bg-neutral-900"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  1-on-1 Founder Consultation
                </span>
                <h3 className="text-sm font-bold text-white">
                  Schedule Call with Shanthapriya
                </h3>
                <p className="text-[11px] text-neutral-400">
                  10-Minute Free Technical Guidance
                </p>
              </div>
            </div>

            <form onSubmit={handleScheduleCallSubmit} className="space-y-2.5">
              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Shanthapriya / Jane"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+94 7X XXX XXXX"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1">
                  Preferred Time Window
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'morning', label: 'Morning 9-12' },
                    { id: 'afternoon', label: 'Afternoon 1-5' },
                    { id: 'evening', label: 'Evening 6-9' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setCallPreferredTime(w.id as any)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium text-[11px] transition-colors cursor-pointer ${
                        callPreferredTime === w.id
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <PhoneCall className="w-3.5 h-3.5" />
                  )}
                  <span>Confirm Call with Shanthapriya</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: 🟡 "NOT READY YET" (Zero-Pressure Exit)               */}
      {/* ============================================================== */}
      {activeModal === 'not_ready' && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3.5 right-3.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-3 pb-2.5 border-b border-neutral-800">
              <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono text-[10px] font-bold uppercase">
                Zero-Pressure Reassurance
              </span>
              <h3 className="text-sm font-bold text-white mt-1">
                No Pressure at All — Take Your Time
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                We never chase or push sales. Your custom architecture plan (Ref: {refCode}) is saved and always valid.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  handleCopyRefCode();
                  setActiveModal(null);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-medium text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bookmark Reference Code</span>
                </div>
                <span className="font-mono text-amber-300 font-bold text-[11px]">{refCode}</span>
              </button>

              <button
                onClick={() => {
                  handleEmailSend();
                  setActiveModal(null);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Email This Blueprint to Myself</span>
              </button>

              <button
                onClick={() => {
                  handleCopyClipboard();
                  setActiveModal(null);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copy Full Summary to Clipboard</span>
              </button>
            </div>

            <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Ravana Tech LK-HQ Colombo</span>
              <button
                onClick={() => {
                  setActiveModal(null);
                  onStartOver();
                }}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Return to Reception
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
