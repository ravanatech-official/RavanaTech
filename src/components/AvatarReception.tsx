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
  MapPin
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

  // Exact concise welcome speech
  const welcomeSpeech = language === 'si'
    ? 'ආයුබෝවන්! Ravana Tech වෙත සාදරයෙන් පිළිගන්නවා. මම ශාන්තප්‍රිය — ඔබගේ Digital Architect. අද ඔබට අවශ්‍ය දේ අපි එක පියවරකින් එක පියවරකට සරලව හඳුනාගමු.'
    : 'Hey there! Welcome to Ravana Tech. I am Shanthapriya, your Digital Architect. Tell me what you came here to achieve, and I will guide you from there.';

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
    }, 450);

    return () => {
      clearTimeout(timer);
      stopVoice();
    };
  }, [language]);

  const getPathwayIcon = (iconName: string) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5 shrink-0";
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
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-4 px-3 sm:px-6 max-w-4xl mx-auto w-full overflow-hidden select-none">
      
      {/* 1. Sleek Compact Digital Architect Bar */}
      <div className="shrink-0 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2.5 sm:p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {/* Real Founder Avatar (Shanthapriya Silva) */}
          <div className="relative shrink-0">
            <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-950 border border-amber-400/50 p-0.5 relative overflow-hidden shadow-lg shadow-amber-400/15 ${
              isPlayingVoice ? 'ring-2 ring-amber-400 shadow-amber-400/40 scale-105' : ''
            } transition-all duration-300`}>
              <img 
                src="/assets/founder/founder_transparent_FINAL.png" 
                alt="Shanthapriya Silva · Founder & Digital Architect"
                className="w-full h-full object-cover object-top rounded-[14px]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-neutral-950 ${
              isPlayingVoice ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
            }`} title="Founder Online"></span>
          </div>

          {/* Architect Speech Bubble */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
              <span className="font-bold text-neutral-200">{language === "si" ? "ශාන්තප්‍රිය · Founder & Digital Architect" : "Shanthapriya · Founder & Digital Architect"}</span>
              <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="hidden xs:inline text-neutral-500">·</span>
              <span className="hidden xs:inline text-amber-400/90">
                {isPlayingVoice ? (language === 'si' ? 'හඬ විස්තරය...' : 'Speaking...') : (language === 'si' ? 'සූදානම්' : 'Online')}
              </span>
            </div>
            <p className="text-xs text-neutral-200 font-medium truncate mt-0.5">
              &ldquo;{language === 'si' ? 'ඔබගේ ව්‍යාපෘතියට අදාළ විසඳුම් ක්ෂේත්‍රය පහතින් තෝරන්න.' : 'Select your solution pathway below to begin questionnaire.'}&rdquo;
            </p>
          </div>
        </div>

        {/* Audio Toggle & Replay */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={isPlayingVoice ? handleStopSpeech : playAvatarSpeech}
            className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-amber-400 transition-colors"
            title={isPlayingVoice ? 'Pause Speech' : 'Play Speech'}
          >
            {isPlayingVoice ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>
      </div>

      {/* 2. Questionnaire Section Header */}
      <div className="shrink-0 text-center my-1.5 sm:my-2">
        <h1 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          <span>
            {language === 'si' 
              ? 'ඔබගේ අවශ්‍යතාවය කුමක්ද? විසඳුමක් තෝරන්න' 
              : 'What is your goal? Select a Solution Pathway'}
          </span>
        </h1>
        <p className="text-[11px] text-neutral-400 mt-0.5">
          {language === 'si'
            ? 'පියවර 4ක නිවැරදි ප්‍රශ්නාවලියක් හරහා නිවැරදි මිල සහ සැලැස්ම ක්ෂණිකව ලබාගත හැක.'
            : 'Answer 4 simple questions to receive an instant technical blueprint and quotation.'}
        </p>
      </div>

      {/* 3. The 5 Questionnaire Solutions (Zero-Scroll Touch Rows) */}
      <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-2.5 max-h-[calc(100vh-210px)]">
        {DECISION_PATHWAYS.map((pathway, index) => {
          const isVip = pathway.id === 'vip_consultation';

          return (
            <button
              key={pathway.id}
              type="button"
              onClick={() => {
                sfx.playStepTransition();
                onSelectPathway(pathway.id);
              }}
              className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-3 group active:scale-[0.99] ${
                isVip
                  ? 'bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-950 border-amber-400/40 hover:border-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 shadow'
              }`}
            >
              {/* Left: Index + Icon + Titles */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-amber-400 shrink-0 group-hover:border-amber-400/50">
                  0{index + 1}
                </span>

                <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-950 border border-neutral-800 shrink-0">
                  {getPathwayIcon(pathway.icon)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs sm:text-sm font-bold text-neutral-100 group-hover:text-amber-300 transition-colors truncate">
                      {pathway.title[language]}
                    </h2>
                    <span className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 shrink-0">
                      {pathway.badge[language]}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {pathway.subtitle[language]}
                  </p>
                </div>
              </div>

              {/* Right: Proceed Affordance */}
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-400 hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === 'si' ? 'ආරම්භ කරන්න' : 'Start'}
                </span>
                <div className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Bottom Breadcrumb & Assurance Bar */}
      <div className="shrink-0 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
        <button
          type="button"
          onClick={onBackToMap}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-neutral-300"
        >
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{location ? `${location.flag} ${location.country}` : 'World Map'}</span>
          <span className="text-neutral-600">·</span>
          <RotateCcw className="w-2.5 h-2.5 text-neutral-500" />
          <span className="text-neutral-400 hover:underline">{language === 'si' ? 'රට වෙනස් කරන්න' : 'Change'}</span>
        </button>

        <span className="text-neutral-500 hidden sm:inline">
          {language === 'si' ? 'තාක්ෂණික දැනුමක් අවශ්‍ය නැත · 100% විනිවිදභාවය' : 'Zero technical jargon · 100% Transparent'}
        </span>
      </div>

    </div>
  );
};
