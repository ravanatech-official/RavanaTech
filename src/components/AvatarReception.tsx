import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  CalendarCheck, 
  Cpu, 
  TrendingUp, 
  HelpCircle,
  RotateCcw, 
  ArrowRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Language, LocationData, MainPathwayId } from '../types';
import { DECISION_PATHWAYS } from '../data/decisionTree';
import { sfx, speakVoice, stopVoice } from '../utils/audio';
import { DigitalAvatar } from './DigitalAvatar';

interface AvatarReceptionProps {
  language?: Language;
  location: LocationData | null;
  onSelectPathway: (pathwayId: MainPathwayId) => void;
  onBackToMap: () => void;
}

export const AvatarReception: React.FC<AvatarReceptionProps> = ({
  location,
  onSelectPathway,
  onBackToMap,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Exact concise authentic English welcome speech
  const welcomeSpeech = 'Hey there! Welcome to Ravana Tech. I am Shanthapriya, your Founder and Lead Architect. Select your solution pathway to begin.';

  const playAvatarSpeech = () => {
    setIsPlayingVoice(true);
    speakVoice(welcomeSpeech, 'en', {
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
  }, []);

  const getPathwayIcon = (iconName: string) => {
    const iconClass = "w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0";
    switch (iconName) {
      case 'Globe': return <Globe className={`${iconClass} text-sky-400`} />;
      case 'ShoppingBag': return <ShoppingBag className={`${iconClass} text-emerald-400`} />;
      case 'CalendarCheck': return <CalendarCheck className={`${iconClass} text-amber-400`} />;
      case 'Cpu': return <Cpu className={`${iconClass} text-cyan-400`} />;
      case 'TrendingUp': return <TrendingUp className={`${iconClass} text-rose-400`} />;
      case 'HelpCircle': return <HelpCircle className={`${iconClass} text-amber-300`} />;
      default: return <Sparkles className={`${iconClass} text-amber-400`} />;
    }
  };

  return (
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 max-w-7xl mx-auto w-full overflow-hidden select-none">
      
      {/* Top Header Bar: Location & Quick Back */}
      <div className="shrink-0 flex items-center justify-between pb-2 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToMap}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Change Region</span>
          </button>
          <span className="text-neutral-600">|</span>
          <div className="flex items-center gap-1 text-neutral-300 font-mono text-[11px]">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{location?.flag || '🇱🇰'} {location?.country || 'Sri Lanka (HQ)'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] text-neutral-400 font-mono">
            Virtual Reception Desk
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE ARCHITECT</span>
          </span>
        </div>
      </div>

      {/* Main 2-Column Layout: Left Digital Avatar, Right 6 Pathways */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center min-h-0 py-1.5">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: THE DIGITAL AVATAR COMPONENT                      */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <DigitalAvatar
            isPlayingVoice={isPlayingVoice}
            onToggleVoice={isPlayingVoice ? handleStopSpeech : playAvatarSpeech}
            language="en"
            className="h-full"
          />
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: STRATEGIC SCOPING PATHWAYS                       */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between py-1">
          
          {/* Section Heading: Prominent Headline + 1-Sentence Brief */}
          <div className="shrink-0 mb-2">
            <h2 className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight leading-snug">
              What digital solution are you looking to architect?
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 leading-snug">
              Choose your project category to launch your 3-question adaptive blueprint.
            </p>
          </div>

          {/* 6 Clean Pathway Cards (Zero-Scroll Ergonomics) */}
          <div className="space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-center">
            {DECISION_PATHWAYS.map((pathway) => (
              <button
                key={pathway.id}
                onClick={() => {
                  sfx.playClick();
                  stopVoice();
                  onSelectPathway(pathway.id);
                }}
                className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-150 flex items-center justify-between group active:scale-[0.99] cursor-pointer ${
                  pathway.id === 'not_sure'
                    ? 'bg-amber-400/10 border-amber-400/50 hover:bg-amber-400/15 hover:border-amber-400 shadow-md shadow-amber-400/5'
                    : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:border-amber-400/40 transition-colors">
                    {getPathwayIcon(pathway.icon)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                        pathway.id === 'not_sure' ? 'text-amber-300' : 'text-white group-hover:text-amber-300'
                      }`}>
                        {pathway.title.en}
                      </h3>
                      <span className="hidden sm:inline-block text-[9px] font-mono text-neutral-400">
                        · {pathway.badge.en}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 group-hover:text-neutral-300 transition-colors truncate leading-snug">
                      {pathway.subtitle.en}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-amber-400 font-mono pl-2">
                  <span className="hidden md:inline text-[11px]">Select</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Security / Architecture Note */}
          <div className="shrink-0 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <span>Adaptive 3-Step Matrix</span>
            <span className="text-amber-400/90 font-bold">100% Transparent Investment</span>
          </div>

        </div>

      </div>

    </div>
  );
};
