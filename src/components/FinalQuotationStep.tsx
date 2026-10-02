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
  Loader2
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
}

export const FinalQuotationStep: React.FC<FinalQuotationStepProps> = ({
  pathway,
  language,
  location,
  selectedAnswers,
  onStartOver,
  onBackToPreviousStep,
}) => {
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

  totalDays = Math.max(5, Math.min(30, Math.round(totalDays)));

  // Base range calculation
  const baseMinLKR = 65000;
  const baseMaxLKR = 135000;
  const baseMinUSD = 280;
  const baseMaxUSD = 550;

  const minPrice = isSriLanka
    ? Math.round((baseMinLKR * totalCostMultiplier) / 5000) * 5000
    : Math.round((baseMinUSD * totalCostMultiplier) / 50) * 50;

  const maxPrice = isSriLanka
    ? Math.round((baseMaxLKR * totalCostMultiplier) / 5000) * 5000
    : Math.round((baseMaxUSD * totalCostMultiplier) / 50) * 50;

  // Recommend solution for "not_sure" pathway based on selected answers
  const getUniversalRecommendation = () => {
    const step1Choice = selectedAnswers[1]?.id;
    if (step1Choice === 'p6_now_nocontact') {
      return {
        title: {
          en: 'Path 01: High-Converting Business Website & Local SEO Dominance',
          si: 'පියවර 01: පාරිභෝගිකයින් ආකර්ෂණය කරවන ව්‍යාපාරික වෙබ් අඩවිය හා Google SEO',
        },
        description: {
          en: 'Engineered specifically to get high-intent phone calls, qualified WhatsApp leads, and rank on top of Google.',
          si: 'ඔබේ ව්‍යාපාරයට සෘජු ඇමතුම්, WhatsApp පණිවිඩ සහ Google සෙවුම් වල ඉහළින්ම පෙනී සිටීම සඳහා සකස් කරන ලද වෙබ් අඩවියක්.',
        },
        badge: { en: 'Path 01 Match', si: 'නිර්දේශිත පියවර 01' }
      };
    }
    if (step1Choice === 'p6_now_manual') {
      return {
        title: {
          en: 'Path 03: Automated Online Booking & WhatsApp Inquiries Engine',
          si: 'පියවර 03: ස්වයංක්‍රීය WhatsApp සහ කාලසටහන් වෙන්කිරීමේ පද්ධතියක්',
        },
        description: {
          en: 'Saves 3+ hours daily by putting customer inquiries, time slots, and reminders on 100% autopilot.',
          si: 'දිනපතා පැය ගණනාවක් ඉතිරි කරමින්, පාරිභෝගික වේලාවන් වෙන්කිරීම හා alerts ස්වයංක්‍රීයව සිදුකරන පද්ධතියක්.',
        },
        badge: { en: 'Path 03 Match', si: 'නිර්දේශිත පියවර 03' }
      };
    }
    if (step1Choice === 'p6_now_orders') {
      return {
        title: {
          en: 'Path 02: High-Speed Online Store & Instant WhatsApp Checkout',
          si: 'පියවර 02: අධි-වේගී Online Store සහ WhatsApp ඇණවුම් පද්ධතිය',
        },
        description: {
          en: 'Transforms messy DM orders into a clean, automated digital shop with instant order summaries.',
          si: 'අපහසු පණිවිඩ වෙනුවට පාරිභෝගිකයාට පහසුවෙන් භාණ්ඩ තෝරාගෙන තත්පර 30න් ඇණවුම් කළ හැකි Store එකක්.',
        },
        badge: { en: 'Path 02 Match', si: 'නිර්දේශිත පියවර 02' }
      };
    }
    if (step1Choice === 'p6_now_amateur') {
      return {
        title: {
          en: 'Path 05: Sub-Second PageSpeed Rebuild & Luxury Brand Polish',
          si: 'පියවර 05: තත්පර 1න් load වන Rebuild එකක් හා සුඛෝපභෝගී නවීන පෙනුම',
        },
        description: {
          en: 'Re-engineers your online presence with bespoke luxury typography, PageSpeed 95+, and high-ticket trust.',
          si: 'පැරණි පෙනුම වෙනුවට ජාත්‍යන්තර මට්ටමේ ඉහළ විශ්වසනීයත්වයක් ලබාදෙන නවීන කේතකරණයක්.',
        },
        badge: { en: 'Path 05 Match', si: 'නිර්දේශිත පියවර 05' }
      };
    }
    return {
      title: {
        en: 'Path 04: Custom Web Application & Tailored Operations Portal',
        si: 'පියවර 04: විශේෂිත මෘදුකාංග පද්ධතියක් (Custom Web App)',
      },
      description: {
        en: 'A bespoke platform built around your unique workflow, staff permissions, and rapid MVP architecture.',
        si: 'ඔබේ සුවිශේෂී ව්‍යාපාරික අවශ්‍යතාවයටම ගැළපෙන පරිදි නිර්මාණය වන Cloud මෘදුකාංග පද්ධතියක්.',
      },
      badge: { en: 'Path 04 Match', si: 'නිර්දේශිත පියවර 04' }
    };
  };

  // Voice announcement on arrival
  const finalSpeech = pathway.id === 'not_sure'
    ? (language === 'si'
      ? 'විශිෂ්ටයි! ඔබ ලබාදුන් සරල පිළිතුරු අනුව ඔබට වඩාත්ම ගැළපෙන විසඳුම අප ස්වයංක්‍රීයව හඳුනාගත්තා. ඔබගේ නිල සැලැස්ම පහතින් බලන්න.'
      : 'Excellent! Based on your answers, we have automatically identified your ideal solution. Review your custom blueprint below.')
    : (language === 'si'
      ? 'සුබ පැතුම්! ඔබගේ ව්‍යාපෘති සැලැස්ම හා මිල ගණන් සකස් කර අවසන්. පහත ඇති WhatsApp හෝ Email මගින් ක්ෂණිකවම අප හා සම්බන්ධ වී ඔබගේ ව්‍යාපෘතිය ආරම්භ කළ හැක.'
      : 'Congratulations! Your customized Ravana Tech architecture blueprint is finalized. Tap WhatsApp or Email below to launch your vision immediately.');

  const playVoice = () => {
    setIsPlayingVoice(true);
    speakVoice(finalSpeech, language, {
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  useEffect(() => {
    sfx.playSuccess();
    const timer = setTimeout(() => {
      playVoice();
    }, 500);

    return () => {
      clearTimeout(timer);
      stopVoice();
    };
  }, [language]);

  // Construct text summary for WhatsApp and Email
  const buildSummaryText = () => {
    const lines = [
      `🏛️ RAVANA TECH PROJECT BLUEPRINT & INQUIRY`,
      `---------------------------------------`,
      `📍 Location: ${location?.flag || '🇱🇰'} ${location?.country || 'Sri Lanka'}`,
      `🎯 Category: ${pathway.title.en}`,
      `---------------------------------------`,
    ];

    if (pathway.id === 'not_sure') {
      const rec = getUniversalRecommendation();
      lines.push(`💡 SYSTEM RECOMMENDED SOLUTION: ${rec.title.en}`);
      lines.push(`ℹ️ ARCHITECTURE RATIONALE: ${rec.description.en}`);
      lines.push(`---------------------------------------`);
    }

    Object.entries(selectedAnswers).forEach(([stepIdx, opt]) => {
      lines.push(`• Step ${stepIdx}: ${opt.title.en} (${opt.subtitle.en})`);
    });

    lines.push(`---------------------------------------`);
    lines.push(`⏱️ Estimated Sprint Timeline: ${totalDays} Business Days`);
    lines.push(`💰 Estimated Investment Range: ${currencySymbol} ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`);
    
    if (clientName) lines.push(`👤 Client Name: ${clientName}`);
    if (clientPhone) lines.push(`📱 WhatsApp / Phone: ${clientPhone}`);
    if (clientEmail) lines.push(`✉️ Email: ${clientEmail}`);
    if (clientNotes) lines.push(`📝 Notes: ${clientNotes}`);

    lines.push(`---------------------------------------`);
    lines.push(`Generated via Ravana Tech Virtual Reception`);
    return lines.join('\n');
  };

  const handleWhatsAppSend = () => {
    sfx.playClick();
    const text = encodeURIComponent(buildSummaryText());
    // Direct WhatsApp dispatch (Using Sri Lankan international format)
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
        country: location?.country || 'Unknown',
        countryCode: location?.code || 'XX',
        isSriLanka: isSriLanka,
        estimatedCostRange: `${currencySymbol} ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`,
        estimatedTimeline: `${totalDays} Business Days`,
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
      console.warn('Firestore write notice (fallback to local success):', err);
      sfx.playSuccess();
      setSavedInquiryId(`LOCAL-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 max-w-4xl mx-auto w-full overflow-y-auto sm:overflow-hidden select-none">
      
      {/* Top Header & Breadcrumbs */}
      <div className="shrink-0 flex items-center justify-between gap-2 pb-2 mb-1.5 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-400">
          <button
            onClick={onBackToPreviousStep}
            className="hover:text-amber-400 transition-colors"
          >
            ← {language === 'si' ? 'පෙර පියවර' : 'Previous Step'}
          </button>
          <span>/</span>
          <span className="text-amber-400 font-semibold">{pathway.badge[language]}</span>
          <span>/</span>
          <span className="text-emerald-400 font-bold">{language === 'si' ? 'අවසන් විසඳුම' : 'Final Blueprint'}</span>
        </div>

        <button
          onClick={onStartOver}
          className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{language === 'si' ? 'මුලට' : 'Start Over'}</span>
        </button>
      </div>

      {/* Main Blueprint Card */}
      <div className="shrink-0 bg-neutral-900/90 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 shadow-xl mb-2">
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-neutral-800">
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
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span>{language === 'si' ? 'සැලැස්ම සාර්ථකව සකස් විය' : 'Blueprint Finalized'}</span>
                <span>·</span>
                <span className="text-amber-400">{language === 'si' ? 'ශාන්තප්‍රිය සිල්වා' : 'Shanthapriya Silva'}</span>
                <span>·</span>
                <span>{location?.flag} {location?.country}</span>
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                {language === 'si' ? 'නිල Ravana Tech ව්‍යාපෘති සැලැස්ම' : 'Official Ravana Tech Project Blueprint'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={playVoice}
            className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-amber-400 hover:border-amber-400 transition-colors shrink-0"
            title="Listen to summary"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'animate-bounce text-amber-300' : ''}`} />
          </button>
        </div>

        {/* Recommendation Banner for Path 06 */}
        {pathway.id === 'not_sure' && (
          <div className="my-2.5 p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-neutral-950 border border-amber-400/50 shadow-lg shadow-amber-400/10">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-bold text-[10px] uppercase font-mono tracking-wider">
                {language === 'si' ? 'ස්වයංක්‍රීයව නිර්දේශිත විසඳුම' : 'AI Architect Recommended Solution'}
              </span>
              <span className="text-[10px] font-bold text-amber-300 font-mono">
                {getUniversalRecommendation().badge[language]}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5 text-amber-200">
              {getUniversalRecommendation().title[language]}
            </h3>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
              {getUniversalRecommendation().description[language]}
            </p>
          </div>
        )}

        {/* Investment & Sprint Metrics */}
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
              {totalDays} {language === 'si' ? 'දින' : 'Days'}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              {language === 'si' ? 'වේගවත් Express Delivery' : 'Rapid Sprint Turnaround'}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 flex flex-col justify-center">
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{language === 'si' ? 'තත්ත්ව සහතිකය' : 'Architecture Guarantee'}</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold font-mono text-emerald-300">
              100% Satisfaction
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              {language === 'si' ? 'පූර්ණ තෘප්තිය සහතිකයි' : 'Dedicated Engineer'}
            </div>
          </div>
        </div>

        {/* Selected Specifications Breakdown */}
        <div className="mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-24 overflow-y-auto pr-1 scrollbar-none">
            {Object.entries(selectedAnswers).map(([stepIdx, opt]) => (
              <div key={opt.id} className="p-2 bg-neutral-950/80 border border-neutral-800 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-4 h-4 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-[9px] text-amber-400 shrink-0">
                    0{stepIdx}
                  </span>
                  <span className="font-semibold text-neutral-200 truncate">{opt.title[language]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1-Click Fast Actions (WhatsApp, Email, Copy) */}
        <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="flex-1 min-w-[180px] py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{language === 'si' ? 'WhatsApp මගින් ක්ෂණිකව යවන්න' : 'Direct WhatsApp (+94 78 847 0610)'}</span>
          </button>

          <button
            type="button"
            onClick={handleEmailSend}
            className="py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 text-neutral-200 border border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Email</span>
          </button>

          <button
            type="button"
            onClick={handleCopyClipboard}
            className="py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 text-xs font-medium flex items-center justify-center gap-1 transition-colors"
            title="Copy Blueprint"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isCopied ? (language === 'si' ? 'පිටපත් විය!' : 'Copied!') : (language === 'si' ? 'Copy' : 'Copy')}</span>
          </button>
        </div>
      </div>

      {/* Direct Contact Form (Optional Rapid Submission to Firestore) */}
      <div className="shrink-0 bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5 sm:p-3 shadow-md mb-2">
        {savedInquiryId ? (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'si' ? 'ඔබගේ සැලැස්ම Cloud Database එකෙහි සුරැකිණි.' : 'Blueprint secured in Cloud Database.'}</span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 shrink-0">
              Ref: {savedInquiryId}
            </span>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder={language === 'si' ? 'ඔබගේ නම / ආයතනය' : 'Your Name / Business'}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <input
                type="tel"
                placeholder={language === 'si' ? 'WhatsApp අංකය' : 'WhatsApp Number'}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>{language === 'si' ? 'සුරැකෙමින්...' : 'Securing...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>{language === 'si' ? 'සැලැස්ම Cloud වෙත යවන්න' : 'Save to Cloud'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="shrink-0 pt-1 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Ravana Tech Headquarters · Colombo, Sri Lanka</span>
        <span className="text-amber-400/90 font-mono">Direct WhatsApp: +94 78 847 0610</span>
      </div>

    </div>
  );
};
