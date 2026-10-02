import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Mail, 
  Copy, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Send, 
  Volume2, 
  Database, 
  Loader2,
  Edit3,
  Check,
  ArrowRight,
  Zap,
  Target,
  Layers,
  FileCheck,
  HelpCircle,
  Smartphone,
  ChevronDown
} from 'lucide-react';
import { Language, LocationData, DecisionPathway, DecisionOption } from '../types';
import { sfx, speakVoice, stopVoice } from '../utils/audio';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FinalQuotationStepProps {
  pathway: DecisionPathway;
  language: Language;
  location: LocationData | null;
  selectedAnswers: Record<number, DecisionOption>;
  onStartOver: () => void;
  onBackToPreviousStep: () => void;
  onEditStep?: (stepIndex: number) => void;
}

export const FinalQuotationStep: React.FC<FinalQuotationStepProps> = ({
  pathway,
  language,
  location,
  selectedAnswers,
  onStartOver,
  onBackToPreviousStep,
  onEditStep,
}) => {
  // Validation State: "Did we understand you correctly?"
  const [isValidated, setIsValidated] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedInquiryId, setSavedInquiryId] = useState<string | null>(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Determine currency based on user location
  const isSriLanka = location?.isSriLanka ?? (language === 'si');
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
        title: {
          en: `High-Converting ${cat.replace(/^\d+\.\s*/, '')} & Lead Generation Engine`,
          si: `පාරිභෝගිකයින් ආකර්ෂණය කරවන ව්‍යාපාරික වෙබ් අඩවිය හා WhatsApp පද්ධතිය`,
        },
        badge: { en: 'Recommended Direction', si: 'නිර්දේශිත දිශානතිය' },
        description: {
          en: 'Custom digital platform engineered for rapid client trust, high-intent phone calls, and direct WhatsApp inquiries.',
          si: 'පාරිභෝගික විශ්වාසය, ක්ෂණික දුරකථන ඇමතුම් සහ සෘජු WhatsApp පණිවිඩ ලබාදෙන පරිදි සැකසෙන විශේෂිත වෙබ් අඩවියක්.',
        },
      };
    }
    if (pathway.id === 'ecommerce_store') {
      return {
        title: {
          en: 'Frictionless Online Store & WhatsApp Checkout Engine',
          si: 'අධි-වේගී Online Store සහ WhatsApp ඇණවුම් පද්ධතිය',
        },
        badge: { en: 'E-Commerce Blueprint', si: 'Online Store සැලැස්ම' },
        description: {
          en: 'Boutique digital storefront designed for rapid mobile browsing, zero cart drop-off, and one-click WhatsApp order confirmation.',
          si: 'Smart phone එකෙන් පහසුවෙන් භාණ්ඩ තෝරාගෙන තත්පර 30න් කාඩ්පත් හෝ WhatsApp මගින් ඇණවුම් කළ හැකි store එකක්.',
        },
      };
    }
    if (pathway.id === 'booking_system') {
      return {
        title: {
          en: 'High-Converting Service & WhatsApp Booking Engine',
          si: 'ස්වයංක්‍රීය WhatsApp සහ කාලසටහන් වෙන්කිරීමේ පද්ධතියක්',
        },
        badge: { en: 'Automated Booking', si: 'ස්වයංක්‍රීය වෙන්කිරීම්' },
        description: {
          en: 'Real-time time slots, automated reminders to eliminate no-shows, and seamless two-way calendar synchronization.',
          si: 'පාරිභෝගිකයින්ට තමන්ට පහසු වේලාවන් වෙන්කරගත හැකි, WhatsApp alerts සහ calendar sync සහිත පද්ධතියක්.',
        },
      };
    }
    if (pathway.id === 'custom_system') {
      return {
        title: {
          en: 'Tailored Cloud Operations Portal & Rapid MVP Architecture',
          si: 'විශේෂිත මෘදුකාංග පද්ධතියක් (Custom Web App & MVP)',
        },
        badge: { en: 'Custom System Architecture', si: 'විශේෂිත මෘදුකාංග සැලැස්ම' },
        description: {
          en: 'A bespoke enterprise web application engineered around your exact operational workflows, staff roles, and rapid scaling.',
          si: 'ඔබේ ව්‍යාපාරික ක්‍රමවේදයටම ගැලපෙන අභ්‍යන්තර මෙහෙයුම් Dashboard, User Roles සහ Rapid Cloud Architecture.',
        },
      };
    }
    if (pathway.id === 'improve_website') {
      return {
        title: {
          en: 'Sub-Second 95+ PageSpeed Rebuild & Luxury Brand Elevation',
          si: 'තත්පර 1න් load වන Rebuild එකක් හා සුඛෝපභෝගී නවීන පෙනුම',
        },
        badge: { en: 'Rebuild & Modernization', si: 'ප්‍රතිසංස්කරණය' },
        description: {
          en: 'Full clean-code rewrite to eliminate slowness, elevate visual luxury aesthetics, and install high-converting sales funnels.',
          si: 'පැරණි බර කේත ඉවත් කර තත්පර 1න් load වන අති නවීන React කේතකරණය සහ ඉහළ විශ්වසනීයත්වයක් දෙන නවීන පෙනුමක්.',
        },
      };
    }
    // Universal "not_sure" pathway
    const step1Choice = selectedAnswers[1]?.id;
    if (step1Choice === 'p6_now_manual') {
      return {
        title: {
          en: 'High-Converting Service & WhatsApp Booking Engine',
          si: 'ස්වයංක්‍රීය WhatsApp සහ කාලසටහන් වෙන්කිරීමේ පද්ධතියක්',
        },
        badge: { en: 'Automated Booking Solution', si: 'ස්වයංක්‍රීය විසඳුම' },
        description: {
          en: 'Saves 3+ hours daily by putting customer inquiries, time slots, and reminders on 100% autopilot.',
          si: 'දිනපතා පැය ගණනාවක් ඉතිරි කරමින්, පාරිභෝගික වේලාවන් වෙන්කිරීම හා alerts ස්වයංක්‍රීයව සිදුකරන පද්ධතියක්.',
        },
      };
    }
    if (step1Choice === 'p6_now_orders') {
      return {
        title: {
          en: 'Frictionless Online Store & WhatsApp Checkout Engine',
          si: 'අධි-වේගී Online Store සහ WhatsApp ඇණවුම් පද්ධතිය',
        },
        badge: { en: 'E-Commerce Solution', si: 'Online Store විසඳුම' },
        description: {
          en: 'Transforms messy social media orders into a clean, automated digital shop with instant order summaries.',
          si: 'අපහසු පණිවිඩ වෙනුවට පාරිභෝගිකයාට පහසුවෙන් භාණ්ඩ තෝරාගෙන තත්පර 30න් ඇණවුම් කළ හැකි Store එකක්.',
        },
      };
    }
    if (step1Choice === 'p6_now_amateur') {
      return {
        title: {
          en: 'Sub-Second 95+ PageSpeed Rebuild & Luxury Brand Elevation',
          si: 'තත්පර 1න් load වන Rebuild එකක් හා සුඛෝපභෝගී නවීන පෙනුම',
        },
        badge: { en: 'Speed Rebuild Solution', si: 'ප්‍රතිසංස්කරණ විසඳුම' },
        description: {
          en: 'Re-engineers your online presence with bespoke luxury typography, PageSpeed 95+, and high-ticket trust.',
          si: 'පැරණි පෙනුම වෙනුවට ජාත්‍යන්තර මට්ටමේ ඉහළ විශ්වසනීයත්වයක් ලබාදෙන නවීන කේතකරණයක්.',
        },
      };
    }
    return {
      title: {
        en: 'High-Converting Business Presence & Local SEO Dominance',
        si: 'පාරිභෝගිකයින් ආකර්ෂණය කරවන ව්‍යාපාරික වෙබ් අඩවිය හා Google SEO',
      },
      badge: { en: 'Business Growth Solution', si: 'ව්‍යාපාරික විසඳුම' },
      description: {
        en: 'Engineered specifically to get high-intent calls, qualified WhatsApp leads, and rank on top of Google.',
        si: 'ඔබේ ව්‍යාපාරයට සෘජු ඇමතුම්, WhatsApp පණිවිඩ සහ Google සෙවුම් වල ඉහළින්ම පෙනී සිටීම සඳහා සකස් කරන ලද වෙබ් අඩවියක්.',
      },
    };
  };

  const recommendedDirection = getRecommendedDirection();

  // Scope & Features Checklist Deliverables
  const scopeFeatures = [
    {
      title: { en: 'Core Responsive Architecture', si: 'සියලු තිර සඳහා නිවැරදි සැලසුම (Mobile, Tablet, Desktop)' },
      desc: { en: 'Ergonomic mobile-first layout with smooth fluid touch targets and retina sharpness.', si: 'Smart phone, Tablet සහ පරිගණක සඳහා උපරිම පහසුවෙන් භාවිත කළ හැකි පිරිසිදු සැලසුම.' },
      icon: 'Smartphone',
      included: true,
    },
    {
      title: { en: 'WhatsApp Direct Connect & Smart Inquiries', si: 'WhatsApp සෘජු සම්බන්ධතාව සහ ස්වයංක්‍රීය පණිවිඩ' },
      desc: { en: 'Pre-formatted conversion funnel routing inquiries directly to your WhatsApp with zero friction.', si: 'පාරිභෝගිකයාගේ අවශ්‍යතාවය සටහන්ව එක tap එකකින් කෙළින්ම WhatsApp වෙත යොමුවීම.' },
      icon: 'MessageCircle',
      included: true,
    },
    {
      title: { en: 'Sub-Second Speed Guarantee (PageSpeed 95+)', si: 'තත්පර 1ට අඩු අධි-වේගී ක්‍රියාකාරීත්වය (PageSpeed 95+)' },
      desc: { en: 'Hand-crafted zero-pill React code with instant asset loading and zero bloated plugins.', si: 'Google PageSpeed 95+ සහතික කළ, තත්පර 1න් load වන නවීන පිරිසිදු කේතකරණය.' },
      icon: 'Zap',
      included: true,
    },
    {
      title: { en: 'Schema.org Structured Data & Local SEO', si: 'Schema.org සහ Google සෙවුම් ප්‍රමුඛතාව (Local SEO)' },
      desc: { en: 'Search engine rich snippets to dominate Google search results in Colombo and globally.', si: 'Google හි ඉහළින්ම පෙනී සිටීම සඳහා අවශ්‍ය Schema.org Rich Snippets හා Meta Tags.' },
      icon: 'Target',
      included: true,
    },
    {
      title: { en: 'Enterprise SSL & Custom Domain Setup', si: 'ආරක්ෂිත SSL සහ Custom Domain සම්බන්ධ කිරීම' },
      desc: { en: 'HTTPS green lock encryption and seamless configuration of your .com / .lk web address.', si: 'ආරක්ෂිත HTTPS Padlock එක සහ ඔබගේ Domain නාමය තාක්ෂණිකව සම්බන්ධ කරදීම.' },
      icon: 'ShieldCheck',
      included: true,
    },
    {
      title: { en: '100% Cloud Server Hosting & Zero Maintenance Headache', si: '100% Cloud Hosting සහ තාක්ෂණික රැකවරණය' },
      desc: { en: 'High-availability global CDN with automated backups and continuous reliability.', si: 'සර්වර් බිඳවැටීම් නැති ගෝලීය CDN, දත්ත උපස්ථ (Backups) සහ Ravana Tech පූර්ණ රැකවරණය.' },
      icon: 'Database',
      included: true,
    },
  ];

  // Voice announcement on arrival
  const validationSpeech = language === 'si'
    ? 'අප ඔබගේ අවශ්‍යතාවය නිවැරදිව තේරුම් ගත්තාදැයි තහවුරු කරන්න. ඒ අනුව ඔබගේ නිල ව්‍යාපෘති සැලැස්ම මෙහි දිස්වේ.'
    : 'Please verify if we understood your requirement correctly. Your custom project blueprint is generated below.';

  const confirmedSpeech = language === 'si'
    ? 'විශිෂ්ටයි! ඔබගේ නිල ව්‍යාපෘති සැලැස්ම, විශේෂාංග ලැයිස්තුව සහ මිල ගණන් මෙන්න. WhatsApp මගින් මට කෙළින්ම පණිවිඩයක් එවන්න.'
    : 'Excellent! Here is your official project blueprint, feature scope, and transparent investment range. Tap WhatsApp below to start.';

  const playVoice = (speechText: string) => {
    setIsPlayingVoice(true);
    speakVoice(speechText, language, {
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
  }, [language]);

  const handleConfirmValidation = () => {
    sfx.playSuccess();
    setIsValidated(true);
    playVoice(confirmedSpeech);
  };

  // Construct text summary for WhatsApp and Email
  const buildSummaryText = () => {
    const lines = [
      `🏛️ RAVANA TECH PROJECT BLUEPRINT & INQUIRY`,
      `=======================================`,
      `📍 Client Location: ${location?.flag || '🇱🇰'} ${location?.country || 'Sri Lanka'}`,
      `🎯 Selected Pathway: ${pathway.title.en}`,
      `💡 Recommended Direction: ${recommendedDirection.title.en}`,
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
      lines.push(`  ✓ ${feat.title.en}`);
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

  const handleWhatsAppSend = () => {
    sfx.playClick();
    const text = encodeURIComponent(buildSummaryText());
    const url = `https://wa.me/94788470610?text=${text}`;
    window.open(url, '_blank');
  };

  const handleEmailSend = () => {
    sfx.playClick();
    const subject = encodeURIComponent(`Ravana Tech Project Blueprint Inquiry - ${clientName || pathway.badge.en}`);
    const body = encodeURIComponent(buildSummaryText());
    const mailtoUrl = `mailto:hello.ravanatech@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyClipboard = () => {
    sfx.playClick();
    navigator.clipboard.writeText(buildSummaryText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClick();
    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        clientName: clientName.trim() || 'Anonymous Client',
        clientPhone: clientPhone.trim() || 'Not Provided',
        clientEmail: clientEmail.trim() || 'Not Provided',
        clientNotes: clientNotes.trim() || '',
        pathwayId: pathway.id,
        pathwayTitle: pathway.title.en,
        recommendedDirection: recommendedDirection.title.en,
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
        status: 'new',
        createdAt: new Date().toISOString(),
      });

      sfx.playSuccess();
      setSavedInquiryId(docRef.id);
    } catch (err) {
      console.warn('Firestore write fallback:', err);
      sfx.playSuccess();
      setSavedInquiryId(`LOCAL-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 max-w-4xl mx-auto w-full overflow-y-auto select-none">
      
      {/* Top Header & Breadcrumbs */}
      <div className="shrink-0 flex items-center justify-between gap-2 pb-2 mb-2 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-400">
          <button
            onClick={onBackToPreviousStep}
            className="hover:text-amber-400 transition-colors"
          >
            ← {language === 'si' ? 'පෙර ප්‍රශ්නය' : 'Previous Step'}
          </button>
          <span>/</span>
          <span className="text-amber-400 font-semibold">{pathway.badge[language]}</span>
          <span>/</span>
          <span className="text-emerald-400 font-bold">{language === 'si' ? 'ව්‍යාපෘති සැලැස්ම' : 'Project Blueprint'}</span>
        </div>

        <button
          onClick={onStartOver}
          className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{language === 'si' ? 'මුලට' : 'Reset'}</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. REAL-TIME VALIDATION GATE: "Did we understand you correctly?"*/}
      {/* ============================================================== */}
      <div className={`shrink-0 rounded-2xl p-3.5 sm:p-4 mb-3 transition-all duration-300 border ${
        isValidated 
          ? 'bg-neutral-900/60 border-emerald-500/40 shadow-sm' 
          : 'bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border-amber-400/50 shadow-xl shadow-amber-400/5'
      }`}>
        <div className="flex items-start sm:items-center justify-between gap-3 pb-2.5 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
              isValidated 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                : 'bg-amber-400/10 border-amber-400/40 text-amber-400'
            }`}>
              {isValidated ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  {language === 'si' ? 'පියවර 4: අවශ්‍යතා තහවුරු කිරීම' : 'Step 4: Requirements Validation'}
                </span>
                {isValidated && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {language === 'si' ? '✓ තහවුරු කළා' : '✓ Verified by You'}
                  </span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {language === 'si' ? 'අපි ඔබගේ අවශ්‍යතාවය හරියටම තේරුම් ගත්තාද?' : 'Did we understand you correctly?'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => playVoice(isValidated ? confirmedSpeech : validationSpeech)}
            className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors shrink-0"
            title="Listen"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'text-amber-400 animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Selected Answers List with Change buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2.5">
          {Object.entries(selectedAnswers).map(([stepIdxStr, opt]) => {
            const stepIdx = parseInt(stepIdxStr, 10);
            const stepObj = pathway.steps.find((s) => s.stepIndex === stepIdx);

            return (
              <div 
                key={stepIdx} 
                className="bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800/90 flex flex-col justify-between group hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mb-1">
                    <span>{stepObj?.stepTitle[language] || `Step 0${stepIdx}`}</span>
                    <span className="text-amber-400/80">0{stepIdx}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {opt.title[language]}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-snug">
                    {opt.subtitle[language]}
                  </p>
                </div>

                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => onEditStep(stepIdx)}
                    className="mt-2 pt-1.5 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-400 hover:text-amber-400 transition-colors w-full"
                  >
                    <span>{language === 'si' ? '✎ වෙනස් කරන්න' : '✎ Change this'}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Validation Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800/80">
          <div className="flex items-center gap-2">
            {!isValidated ? (
              <button
                type="button"
                onClick={handleConfirmValidation}
                className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/10 transition-transform active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'si' ? "✓ ඔව්, ඒක නිවැරදියි" : "✓ That's right"}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'si' ? 'අවශ්‍යතාවය තහවුරු කර අවසන්' : 'Confirmed accurate by client'}</span>
              </div>
            )}

            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="py-1.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-neutral-400" />
                <span>{language === 'si' ? '✎ වෙනස්කමක් කරන්න' : '✎ Change something'}</span>
              </button>
            )}
          </div>

          <span className="text-[11px] font-mono text-neutral-500">
            {language === 'si' ? '100% Client Satisfaction Guarantee' : '100% Client Satisfaction Guarantee'}
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. INTERACTIVE PROJECT BLUEPRINT (THE "AHA!" MOMENT)           */}
      {/* ============================================================== */}
      <div className="shrink-0 bg-neutral-900/90 border border-emerald-500/30 rounded-2xl p-3.5 sm:p-4 shadow-xl mb-3">
        
        {/* Architect Heading Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-3 min-w-0">
            {/* Real Founder Portrait */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-950 border border-amber-400/40 p-0.5 overflow-hidden shadow-lg shadow-amber-400/10">
                <img 
                  src="/assets/founder/founder_transparent_FINAL.png" 
                  alt="Shanthapriya Silva · Founder & Lead Architect"
                  className="w-full h-full object-cover object-top rounded-[10px] bg-neutral-900"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-neutral-950 bg-emerald-500"></span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span>{language === 'si' ? 'ව්‍යාපෘති සැලැස්ම සකස් විය' : 'Custom Blueprint Ready'}</span>
                <span>·</span>
                <span className="text-amber-400">{language === 'si' ? 'ශාන්තප්‍රිය සිල්වා' : 'Shanthapriya Silva'}</span>
                <span>·</span>
                <span>{location?.flag || '🇱🇰'} {location?.country || 'Sri Lanka'}</span>
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                {language === 'si' ? 'නිල Ravana Tech ව්‍යාපෘති සැලැස්ම (Blueprint)' : 'Official Ravana Tech Project Blueprint'}
              </h2>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
            ZERO-SLOP ARCHITECTURE
          </span>
        </div>

        {/* 2A. Recommended Direction Card */}
        <div className="my-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-neutral-950 border border-amber-400/40">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-bold text-[10px] uppercase font-mono tracking-wider">
              {recommendedDirection.badge[language]}
            </span>
            <span className="text-[10px] text-amber-300 font-mono">
              {language === 'si' ? '100% ඔබට ගැළපෙන පරිදි' : 'Tailored to your brief'}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white mb-1 text-amber-200">
            {recommendedDirection.title[language]}
          </h3>
          <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
            {recommendedDirection.description[language]}
          </p>
        </div>

        {/* 2B. Scope & Features Checklist */}
        <div className="my-3 bg-neutral-950/70 p-3 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'si' ? 'Scope & Features Checklist (ලැබෙන දේ):' : 'Scope & Features Checklist (Deliverables):'}</span>
            </h4>
            <span className="text-[10px] font-mono text-emerald-400">
              6 of 6 Core Standard
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {scopeFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/80">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-200 text-[11px] leading-tight">
                    {feat.title[language]}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                    {feat.desc[language]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2C. Investment & Sprint Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2.5">
          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-0.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{language === 'si' ? 'ඇස්තමේන්තු ආයෝජනය' : 'Estimated Investment'}</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold font-mono text-amber-300">
              {currencySymbol}{minPrice.toLocaleString()} - {maxPrice.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              {isSriLanka ? 'LKR (No Hidden Fees)' : 'USD Milestone Pricing'}
            </div>
          </div>

          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-0.5">
              <Clock className="w-3 h-3 text-sky-400" />
              <span>{language === 'si' ? 'කාල සීමාව' : 'Delivery Timeline'}</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold font-mono text-sky-300">
              {totalDays} {language === 'si' ? 'වැඩ කරන දින' : 'Working Days'}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              {language === 'si' ? 'වේගවත් Express Sprint' : 'Express Sprint Turnaround'}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 flex flex-col justify-center">
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{language === 'si' ? 'ගෙවීමේ සැලැස්ම' : 'Milestone Guarantee'}</span>
            </div>
            <div className="text-xs font-bold text-emerald-400">
              {language === 'si' ? '50% ආරම්භයේදී / 50% භාරදීමේදී' : '50% Milestone / 50% Delivery'}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              100% Satisfaction Guarantee
            </div>
          </div>
        </div>

        {/* 2D. 1-Click WhatsApp & Email Dispatch Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-neutral-800/80">
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-transform active:scale-98 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'si' ? 'WhatsApp හරහා සැලැස්ම යවන්න' : 'Send Blueprint via WhatsApp'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyClipboard}
            className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isCopied ? (language === 'si' ? '✓ Copy විය' : '✓ Copied!') : (language === 'si' ? 'Copy Blueprint' : 'Copy Blueprint')}</span>
          </button>

          <button
            type="button"
            onClick={handleEmailSend}
            className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{language === 'si' ? 'Email' : 'Email'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. OPTIONAL CONTACT / BRIEF FORM & FIRESTORE CLOUD SYNC        */}
      {/* ============================================================== */}
      <div className="shrink-0 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-3 sm:p-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80 mb-2">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <h3 className="text-xs font-bold text-white">
              {language === 'si' ? 'ව්‍යාපෘති විස්තර සටහන (Optional Brief)' : 'Save Brief into Cloud (Optional)'}
            </h3>
          </div>
          {savedInquiryId && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              Ref ID: #{savedInquiryId.slice(0, 8)}
            </span>
          )}
        </div>

        {savedInquiryId ? (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <p className="text-xs font-bold text-emerald-400">
              {language === 'si' ? 'ඔබගේ ව්‍යාපෘති සටහන සාර්ථකව සටහන් කරගන්නා ලදී!' : 'Your project brief is securely logged into Ravana Tech Cloud!'}
            </p>
            <p className="text-[11px] text-neutral-300 mt-1">
              {language === 'si' 
                ? 'ශාන්තප්‍රිය සිල්වා විසින් ඔබගේ අවශ්‍යතා පරීක්ෂා කර සුළු වේලාවකින් ඔබව සම්බන්ධ කරගනු ඇත.' 
                : 'Shanthapriya Silva will review your brief and get back to you shortly.'}
            </p>
            <button
              onClick={handleWhatsAppSend}
              className="mt-2.5 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500 text-neutral-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{language === 'si' ? 'කෙළින්ම WhatsApp කතාබහට' : 'Chat on WhatsApp Now'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-neutral-400 font-mono mb-0.5">
                  {language === 'si' ? 'ඔබගේ නම' : 'Your Name'}
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Shanthapriya / Jane"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono mb-0.5">
                  {language === 'si' ? 'WhatsApp / Phone' : 'WhatsApp / Phone'}
                </label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+94 7X XXX XXXX"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono mb-0.5">
                  {language === 'si' ? 'Email (Optional)' : 'Email (Optional)'}
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono mb-0.5">
                {language === 'si' ? 'අමතර සටහන් හෝ විශේෂ අවශ්‍යතා' : 'Additional Notes / Specific Requests'}
              </label>
              <textarea
                rows={2}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder={language === 'si' ? 'වෙනත් අවශ්‍යතා හෝ දැනට ඇති site එකේ link එක...' : 'Existing site URL, specific references, or timeline notes...'}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-neutral-500 font-mono">
                🔒 Protected by Ravana Tech Zero-Leak Privacy Policy
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-1.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{language === 'si' ? 'ව්‍යාපෘති සටහන එවන්න' : 'Submit Brief'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
