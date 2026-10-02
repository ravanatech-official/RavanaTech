import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Bot, 
  Eye, 
  TrendingUp, 
  PhoneCall, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  Play,
  Pause,
  MapPin,
  Volume2,
  Sparkles,
  MessageCircle,
  Award
} from 'lucide-react';
import { Language, LocationData, MainPathwayId } from '../types';
import { DECISION_PATHWAYS } from '../data/decisionTree';
import { sfx, speakVoice, stopVoice } from '../utils/audio';

interface AvatarReceptionProps {
  language: Language;
  location: LocationData | null;
  onSelectPathway: (pathwayId: MainPathwayId) => void;
  onBackToMap: () => void;
}

export const AvatarReception: React.FC<AvatarReceptionProps> = ({
  language,
  location,
  onSelectPathway,
  onBackToMap,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Exact concise authentic welcome speech
  const welcomeSpeech = language === 'si'
    ? 'ආයුබෝවන්! Ravana Tech වෙත සාදරයෙන් පිළිගන්නවා. මම ශාන්තප්‍රිය — ඔබගේ Digital Architect. අද ඔබට අවශ්‍ය දේ අපි එක පියවරකින් එක පියවරකට සරලව හඳුනාගමු.'
    : 'Hey there! Welcome to Ravana Tech. I am Shanthapriya, your Founder and Digital Architect. Select your solution pathway to begin.';

  const playAvatarSpeech = () => {
    setIsPlayingVoice(true);
    speakVoice(welcomeSpeech, language, {
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  const handleStopSpeech = () => {
    stopVoice();
    setIsPlayingVoice(false);
  };

  // Auto trigger speech upon entering
  useEffect(() => {
    const timer = setTimeout(() => {
      playAvatarSpeech();
    }, 500);

    return () => {
      clearTimeout(timer);
      stopVoice();
    };
  }, [language]);

  const getPathwayIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 shrink-0";
    switch (iconName) {
      case 'Globe': return <Globe className={`${iconClass} text-sky-400`} />;
      case 'Bot': return <Bot className={`${iconClass} text-amber-400`} />;
      case 'Eye': return <Eye className={`${iconClass} text-emerald-400`} />;
      case 'TrendingUp': return <TrendingUp className={`${iconClass} text-rose-400`} />;
      case 'PhoneCall': return <PhoneCall className={`${iconClass} text-amber-300`} />;
      default: return <Globe className={`${iconClass} text-amber-400`} />;
    }
  };

  return (
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-4 px-3 sm:px-6 max-w-7xl mx-auto w-full overflow-hidden select-none">
      
      {/* Top Header Bar: Location & Quick Back */}
      <div className="shrink-0 flex items-center justify-between pb-2 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToMap}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'si' ? 'නැවත සිතියම වෙත' : 'Back to World Map'}</span>
          </button>
          <span className="text-neutral-600">|</span>
          <div className="flex items-center gap-1 text-neutral-300 font-mono text-[11px]">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{location?.flag || '🇱🇰'} {location?.country || 'Sri Lanka (HQ)'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] text-neutral-400 font-mono">
            {language === 'si' ? 'ඩිජිටල් පිළිගැනීමේ පීඨිකාව' : 'Virtual Reception Desk'}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE RECEPTION</span>
          </span>
        </div>
      </div>

      {/* Main 2-Column Luxury Layout: Left Founder Avatar, Right 5 Pathways */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center min-h-0 py-2">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: THE REAL FOUNDER AVATAR STAGE (Shanthapriya Silva) */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-950 border border-neutral-800 rounded-2xl p-3 sm:p-5 relative overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Gold Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge & Voice Status */}
          <div className="relative z-10 flex items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 uppercase">
                {language === 'si' ? 'සැබෑ නිර්මාතෘ හමුව' : 'FOUNDER & ARCHITECT'}
              </span>
            </div>
            
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={isPlayingVoice ? handleStopSpeech : playAvatarSpeech}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all ${
                isPlayingVoice 
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md shadow-amber-400/20' 
                  : 'bg-neutral-950 text-amber-400 border-neutral-800 hover:border-amber-400/50'
              }`}
            >
              {isPlayingVoice ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>{language === 'si' ? 'හඬ නවතන්න' : 'Pause Voice'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3" />
                  <span>{language === 'si' ? 'හඬ අසන්න' : 'Play Voice'}</span>
                </>
              )}
            </button>
          </div>

          {/* REAL FOUNDER PORTRAIT (High-Resolution Transparent Cutout) */}
          <div className="relative z-10 flex-1 flex items-end justify-center min-h-[160px] sm:min-h-[220px] lg:min-h-[260px] max-h-[340px] overflow-hidden">
            <div className="relative w-full max-w-[260px] sm:max-w-[290px] h-full flex items-end justify-center">
              
              {/* Radial gradient spotlight behind founder */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.22),transparent_70%)] pointer-events-none rounded-b-2xl" />

              <img 
                src="/assets/founder/founder_transparent_FINAL.png" 
                alt="Shanthapriya Silva — Founder & Digital Architect" 
                className={`relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 ${
                  isPlayingVoice ? 'scale-105' : 'hover:scale-[1.02]'
                }`}
              />

              {/* Speaking Equalizer Waves Overlay */}
              {isPlayingVoice && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-end gap-1 px-3 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-sm border border-amber-400/40 shadow-lg">
                  {[0.4, 0.9, 0.5, 1.0, 0.7, 0.3].map((height, idx) => (
                    <span 
                      key={idx} 
                      className="w-1 bg-amber-400 rounded-full animate-pulse"
                      style={{ 
                        height: `${Math.round(height * 16)}px`,
                        animationDelay: `${idx * 0.12}s`,
                        animationDuration: '0.6s'
                      }}
                    />
                  ))}
                  <span className="text-[10px] text-amber-300 font-mono ml-1 font-bold">SPEAKING</span>
                </div>
              )}
            </div>
          </div>

          {/* Founder Identity Card & Speech Balloon */}
          <div className="relative z-10 pt-2 border-t border-neutral-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{language === 'si' ? 'ශාන්තප්‍රිය සිල්වා' : 'Shanthapriya Silva'}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </h3>
                <p className="text-[11px] text-neutral-400 font-medium">
                  {language === 'si' ? 'නිර්මාතෘ සහ ප්‍රධාන Digital Architect' : 'Founder & Lead Digital Architect'}
                </p>
              </div>

              <a
                href="https://wa.me/94788470610?text=Hi%20Shanthapriya,%20I%20am%20at%20Ravana%20Tech%20Virtual%20Reception%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 transition-colors"
              >
                <MessageCircle className="w-3 h-3 fill-current" />
                <span>WhatsApp VIP</span>
              </a>
            </div>

            {/* Speech bubble */}
            <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-300 font-medium leading-relaxed">
              &ldquo;{language === 'si' 
                ? 'ආයුබෝවන්! මම ශාන්තප්‍රිය. ඔබගේ ව්‍යාපෘතියට ගැළපෙන හොඳම විසඳුම් අංශය දකුණු පසින් තෝරන්න.' 
                : 'Welcome! I am Shanthapriya. Select your desired solution pathway on the right to start.'}&rdquo;
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: THE 5 STRATEGIC SCOPING PATHWAYS                */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between py-1">
          
          {/* Section Heading */}
          <div className="shrink-0 mb-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight">
                {language === 'si' 
                  ? 'ඔබගේ අවශ්‍යතාවය කුමක්ද? විසඳුමක් තෝරන්න' 
                  : 'What is your goal? Select a Solution Pathway'}
              </h2>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              {language === 'si' 
                ? 'සරල පියවර 4කින් නිල ව්‍යාපෘති සැලැස්ම (Blueprint) සහ ඇස්තමේන්තුගත මිල ගණන් ලබාගන්න.' 
                : 'Complete a rapid 4-step scoping questionnaire to generate your tailored architecture blueprint.'}
            </p>
          </div>

          {/* 5 Prominent Solution Tiles */}
          <div className="flex-1 flex flex-col justify-between gap-1.5 sm:gap-2">
            {DECISION_PATHWAYS.map((pathway, index) => {
              const isVip = pathway.id === 'founder_vip';
              const isShowcase = pathway.id === 'conceptual_showcase';

              return (
                <div
                  key={pathway.id}
                  onClick={() => {
                    sfx.playClick();
                    onSelectPathway(pathway.id);
                  }}
                  className={`w-full py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 group active:scale-[0.99] ${
                    isVip 
                      ? 'bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-950 border-amber-400/40 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10'
                      : isShowcase
                      ? 'bg-gradient-to-r from-sky-500/10 via-neutral-900 to-neutral-950 border-sky-400/40 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-400/10'
                      : 'bg-neutral-900/90 hover:bg-neutral-900 border-neutral-800 hover:border-amber-400/50 hover:shadow-md hover:shadow-amber-400/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Number Badge */}
                    <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 group-hover:border-amber-400/40 flex items-center justify-center font-mono font-bold text-xs text-amber-400 shrink-0 transition-colors">
                      0{index + 1}
                    </div>

                    {/* Icon */}
                    <div className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80 shrink-0 group-hover:scale-110 transition-transform">
                      {getPathwayIcon(pathway.icon)}
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                          {pathway.title[language]}
                        </h4>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider shrink-0 ${
                          isVip 
                            ? 'bg-amber-400 text-neutral-950' 
                            : 'bg-neutral-800 text-neutral-400 group-hover:text-amber-300'
                        }`}>
                          {pathway.badge[language]}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5 group-hover:text-neutral-300">
                        {pathway.subtitle[language]}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-7 h-7 rounded-lg bg-neutral-950 group-hover:bg-amber-400 border border-neutral-800 group-hover:border-amber-400 flex items-center justify-center text-neutral-500 group-hover:text-neutral-950 transition-all shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Sleek Bottom Status Bar */}
      <div className="shrink-0 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
        <div className="flex items-center gap-2">
          <span>LK-HQ Colombo</span>
          <span>·</span>
          <span>Zero-Lag Cloud Architecture</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Client Satisfaction Guarantee: 100%</span>
        </div>
      </div>

    </div>
  );
};
