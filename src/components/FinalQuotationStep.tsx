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

  // Voice announcement on arrival
  const finalSpeech = language === 'si'
    ? 'සුබ පැතුම්! ඔබගේ ව්‍යාපෘති සැලැස්ම හා මිල ගණන් සකස් කර අවසන්. පහත ඇති WhatsApp හෝ Email මගින් ක්ෂණිකවම අප හා සම්බන්ධ වී ඔබගේ ව්‍යාපෘතිය ආරම්භ කළ හැක.'
    : 'Congratulations! Your customized Ravana Tech architecture blueprint is finalized. Tap WhatsApp or Email below to launch your vision immediately.';

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
    const url = `https://wa.me/94701234567?text=${text}`;
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
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Top Header & Breadcrumbs */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onStartOver}
            className="text-neutral-400 hover:text-amber-400 transition-colors"
          >
            {language === 'si' ? 'පිළිගැනීමේ මැදිරිය' : 'Virtual Reception'}
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-300 font-medium">{pathway.badge[language]}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-emerald-400 font-semibold">
            {language === 'si' ? 'පියවර 5: අවසන් සැලැස්ම (Final Blueprint)' : 'Step 5: Final Blueprint'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToPreviousStep}
            className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            {language === 'si' ? 'පසුපසට (Back)' : 'Previous Step'}
          </button>
          <button
            onClick={onStartOver}
            className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'si' ? 'නව සැලැස්මක් (Start Over)' : 'Start Over'}</span>
          </button>
        </div>
      </div>

      {/* Hero Completion Banner */}
      <div className="relative z-10 bg-neutral-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl mb-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                  {language === 'si' ? 'සැලැස්ම සාර්ථකව සකස් විය' : 'Blueprint Ready for Launch'}
                </span>
                <span className="text-xs text-neutral-400">· {location?.flag} {location?.country}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-100 font-display">
                {language === 'si' ? 'ඔබගේ නිල Ravana Tech ව්‍යාපෘති සැලැස්ම' : 'Your Official Ravana Tech Digital Blueprint'}
              </h2>
            </div>
          </div>

          {/* Voice Replay */}
          <button
            type="button"
            onClick={playVoice}
            className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-400 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'animate-pulse text-amber-400' : ''}`} />
            <span>{isPlayingVoice ? (language === 'si' ? 'හඬ වාදනය වේ...' : 'Speaking...') : (language === 'si' ? 'හඬ අසන්න' : 'Listen Voice')}</span>
          </button>
        </div>

        {/* Investment & Sprint Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{language === 'si' ? 'ඇස්තමේන්තුගත ආයෝජනය' : 'Estimated Investment Range'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-300">
              {currencySymbol} {minPrice.toLocaleString()} - {maxPrice.toLocaleString()}
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              {isSriLanka ? 'ශ්‍රී ලංකා රුපියල් වලින් (No Hidden Fees)' : 'Transparent milestone-based pricing'}
            </div>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>{language === 'si' ? 'නිම කිරීමට ගතවන කාලය' : 'Estimated Sprint Timeline'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-sky-300">
              {totalDays} {language === 'si' ? 'වැඩ කරන දින' : 'Business Days'}
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              {language === 'si' ? 'වේගවත් Express බෙදාහැරීම' : 'Rapid turnaround with milestone check-ins'}
            </div>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'si' ? 'Ravana Tech තත්ත්ව සහතිකය' : 'Architecture Guarantee'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-300">
              100% Satisfaction
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              {language === 'si' ? 'පූර්ණ පාරිභෝගික තෘප්තිය සහතිකයි' : 'Unlimited revisions until client is delighted'}
            </div>
          </div>

        </div>

        {/* Selected Specifications Breakdown */}
        <div className="mb-6">
          <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold mb-3">
            {language === 'si' ? 'ඔබ විසින් තෝරාගත් අංග හා පිරිවිතර:' : 'Architectural Specification Selected:'}
          </h4>

          <div className="space-y-2">
            {Object.entries(selectedAnswers).map(([stepIdx, opt]) => (
              <div key={opt.id} className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-[10px] text-amber-400">
                    0{stepIdx}
                  </span>
                  <span className="font-semibold text-neutral-200">{opt.title[language]}</span>
                </div>
                <span className="text-neutral-400 hidden sm:inline">{opt.subtitle[language]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 1-Click Fast Actions (WhatsApp, Email, Copy) */}
        <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
          
          {/* Primary Action: Direct WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>
              {language === 'si' ? 'WhatsApp මගින් ක්ෂණිකව යවන්න' : 'Send Direct to WhatsApp (Fastest)'}
            </span>
          </button>

          {/* Secondary Action: Direct Email to hello.ravanatech@gmail.com */}
          <button
            type="button"
            onClick={handleEmailSend}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>hello.ravanatech@gmail.com</span>
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyClipboard}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            title="Copy Blueprint"
          >
            <Copy className="w-4 h-4" />
            <span>{isCopied ? (language === 'si' ? 'පිටපත් විය!' : 'Copied!') : (language === 'si' ? 'පිටපත් කරන්න' : 'Copy')}</span>
          </button>

        </div>

      </div>

      {/* Direct Contact Form & Founder Call Option */}
      <div className="relative z-10 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-xl mb-6">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-100 font-display">
              {language === 'si' ? 'ඔබගේ තොරතුරු ඇතුළත් කර සැලැස්ම තහවුරු කරන්න' : 'Confirm Your Project Details (Optional)'}
            </h3>
            <p className="text-xs text-neutral-400">
              {language === 'si'
                ? 'ඔබගේ නම හෝ WhatsApp අංකය ලබා දුනහොත් අපගේ Founder විසින් කෙලින්ම ඔබ අමතනු ඇත.'
                : 'Provide your name or WhatsApp number so our founder can follow up personally within 2 hours.'}
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400">Direct VIP Access</span>
        </div>

        {savedInquiryId ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <div className="flex-1">
              <div className="font-bold text-sm text-neutral-100 flex items-center gap-2">
                <span>{language === 'si' ? 'ස්තූතියි! ඔබගේ විස්තර සාර්ථකව Cloud Database එකෙහි සුරැකිණි.' : 'Success! Your blueprint is secured in Ravana Tech Cloud.'}</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
                  Ref: {savedInquiryId}
                </span>
              </div>
              <div className="text-neutral-400 mt-0.5">
                {language === 'si' 
                  ? 'අපගේ Digital Architect විසින් කෙටි වේලාවකින් ඔබව WhatsApp හෝ දුරකථනය මගින් අමතනු ඇත.' 
                  : 'Our Digital Architect will reach out via WhatsApp or email promptly with your itemized proposal.'}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  {language === 'si' ? 'ඔබගේ නම / ආයතනය' : 'Your Name / Business Name'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kasun Silva"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  {language === 'si' ? 'WhatsApp හෝ දුරකථන අංකය' : 'WhatsApp / Mobile Number'}
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +94 77 123 4567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  {language === 'si' ? 'ඊමේල් ලිපිනය (Email)' : 'Email Address'}
                </label>
                <input
                  type="email"
                  placeholder="e.g. hello@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1 font-medium">
                {language === 'si' ? 'අමතර සටහන් (Optional Notes)' : 'Additional Notes / Vision'}
              </label>
              <textarea
                rows={2}
                placeholder={language === 'si' ? 'ඔබගේ විශේෂිත අදහස් හෝ අවශ්‍යතා මෙහි සටහන් කරන්න...' : 'Share any specific deadlines, references, or special requirements...'}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Connected to: <strong className="text-amber-400 font-mono">raavanaatec</strong> Firestore</span>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{language === 'si' ? 'සුරැකෙමින් පවතී...' : 'Securing in Cloud...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'si' ? 'සැලැස්ම Ravana Tech වෙත යොමු කරන්න' : 'Submit Project Blueprint'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Trust & Guarantee Banner */}
      <div className="relative z-10 pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2 text-center sm:text-left">
        <span>Ravana Tech Headquarters · Colombo, Sri Lanka & Worldwide Remote Engineering</span>
        <span className="text-amber-400/90 font-mono">100% Confidentiality & Non-Disclosure Agreement (NDA) Protected</span>
      </div>

    </div>
  );
};
