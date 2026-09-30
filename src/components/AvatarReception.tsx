import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Bot, 
  Eye, 
  TrendingUp, 
  PhoneCall, 
  Volume2, 
  RotateCcw, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause
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
  const [hasInteracted, setHasInteracted] = useState(false);

  // The Exact Requested Welcome Scripts:
  const welcomeSpeech = language === 'si'
    ? 'ආයුබෝවන්! රාවණා ටෙක් වෙත සාදරයෙන් පිළිගන්නවා. මම ඔබගේ Digital Architect. අපි high-converting වෙබ් අඩවි සහ AI Automations නිර්මාණය කරනවා. අද ඔබ බලාපොරොත්තු වන විශේෂිත Project එක මොකක්ද?'
    : 'Hey there! Welcome to Ravana Tech. I am your digital architect and founder. I build ultra high-converting digital platforms, web applications, and custom AI automation. Tell me, what great vision brought you here today?';

  // Voice playback handler
  const playAvatarSpeech = () => {
    setIsPlayingVoice(true);
    setHasInteracted(true);
    speakVoice(welcomeSpeech, language, {
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  const handleStopSpeech = () => {
    stopVoice();
    setIsPlayingVoice(false);
  };

  // Auto trigger speech upon entering the reception
  useEffect(() => {
    const timer = setTimeout(() => {
      playAvatarSpeech();
    }, 600);

    return () => {
      clearTimeout(timer);
      stopVoice();
    };
  }, [language]);

  const getPathwayIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-sky-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-amber-400" />;
      case 'Eye': return <Eye className="w-6 h-6 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-rose-400" />;
      case 'PhoneCall': return <PhoneCall className="w-6 h-6 text-amber-300" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none"
      />

      {/* Top Breadcrumb & Location Reminder */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-800/60 text-xs">
        <div className="flex items-center gap-2 text-neutral-400">
          <button 
            onClick={onBackToMap}
            className="hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            <span>{location ? `${location.flag} ${location.country}` : 'World Map'}</span>
          </button>
          <span>/</span>
          <span className="text-amber-400 font-semibold">
            {language === 'si' ? 'රාවණා ටෙක් පිළිගැනීමේ මැදිරිය' : 'Ravana Tech Virtual Reception'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-500 hidden sm:inline">
            {language === 'si' ? 'හඬ සහය: සක්‍රීයයි' : 'Voice Guidance: Active'}
          </span>
          <button
            onClick={onBackToMap}
            className="text-xs text-neutral-400 hover:text-amber-300 flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'si' ? 'රට නැවත තෝරන්න' : 'Change Location'}</span>
          </button>
        </div>
      </div>

      {/* Hero Avatar Presentation Area */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        
        {/* Left Column: Virtual AI Avatar Host */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          
          <div className="relative">
            {/* Holographic Glowing Aura Rings */}
            <div className={`absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-amber-500/20 blur-xl transition-opacity duration-700 ${isPlayingVoice ? 'opacity-100 scale-105' : 'opacity-40'}`} />
            
            {/* Outer Frame with audio reactive ring */}
            <div className={`relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-1.5 transition-all duration-300 ${
              isPlayingVoice 
                ? 'ring-4 ring-amber-400/80 shadow-2xl shadow-amber-500/30' 
                : 'ring-2 ring-neutral-800'
            }`}>
              
              {/* Inner Avatar Graphic */}
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-950 flex flex-col items-center justify-end relative border border-neutral-700">
                
                {/* Stylized Virtual Architect Silhouette / Hologram */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-neutral-900/60 to-neutral-950"></div>
                
                {/* Digital Head / Visage Avatar representation */}
                <div className="relative z-10 flex flex-col items-center mb-4">
                  {/* Avatar Head with glowing eyes / tech specs */}
                  <div className="relative w-20 h-24 rounded-2xl bg-gradient-to-b from-neutral-700 to-neutral-900 border border-neutral-600 flex flex-col items-center justify-center shadow-lg">
                    {/* Futuristic visor/glasses */}
                    <div className="w-14 h-3.5 rounded-full bg-amber-400/90 shadow-lg shadow-amber-400/50 flex items-center justify-around px-1 mb-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-neutral-950 ${isPlayingVoice ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-1.5 h-1.5 rounded-full bg-neutral-950 ${isPlayingVoice ? 'animate-pulse' : ''}`}></div>
                    </div>
                    {/* Animated speaking mouth wave */}
                    <div className="flex items-center gap-1 h-3 mt-1">
                      <span className={`w-1 bg-amber-300 rounded-full transition-all ${isPlayingVoice ? 'animate-audio-bar-1 h-2' : 'h-1'}`}></span>
                      <span className={`w-1 bg-amber-300 rounded-full transition-all ${isPlayingVoice ? 'animate-audio-bar-2 h-3' : 'h-1'}`}></span>
                      <span className={`w-1 bg-amber-300 rounded-full transition-all ${isPlayingVoice ? 'animate-audio-bar-3 h-2' : 'h-1'}`}></span>
                    </div>
                  </div>
                  {/* Tailored collar / suit silhouette */}
                  <div className="w-32 h-14 bg-neutral-900 rounded-t-3xl border-t border-x border-neutral-700 flex items-center justify-center">
                    <span className="text-[10px] text-amber-400 font-mono tracking-widest font-bold">RAVANA</span>
                  </div>
                </div>

                {/* Live Speaking Indicator Overlay */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center z-20">
                  <div className="px-2.5 py-0.5 rounded-full bg-neutral-950/90 border border-amber-400/60 text-[10px] text-amber-300 font-mono flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlayingVoice ? 'bg-amber-400 animate-ping' : 'bg-neutral-500'}`}></span>
                    <span>{isPlayingVoice ? (language === 'si' ? 'කතා කරයි (Speaking)' : 'Speaking Live') : (language === 'si' ? 'සූදානම් (Ready)' : 'Interactive AI')}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Audio Toggle Floating Button */}
            <button
              type="button"
              onClick={isPlayingVoice ? handleStopSpeech : playAvatarSpeech}
              className="absolute bottom-0 right-2 w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/40 transition-transform active:scale-95 focus:outline-none"
              title={isPlayingVoice ? 'Pause Speech' : 'Play Voice Message'}
            >
              {isPlayingVoice ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>

          {/* Identity Tag & Credentials */}
          <div className="mt-4">
            <h2 className="text-base sm:text-lg font-bold text-neutral-100 flex items-center justify-center gap-1.5">
              <span>Ravana Tech Digital Architect</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Founder & High-Conversion Systems Architect
            </p>
          </div>

          {/* Replay Button */}
          <button
            type="button"
            onClick={playAvatarSpeech}
            className="mt-2 text-xs text-amber-400/90 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'si' ? 'නැවත අසන්න (Replay Voice)' : 'Replay Welcome Audio'}</span>
          </button>
        </div>

        {/* Right Column: Founder Welcome Message & Subtitle Bubble */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="relative bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-md">
            
            {/* Dialogue pointer tail pointing toward avatar on desktop */}
            <div className="hidden lg:block absolute -left-3 top-12 w-6 h-6 bg-neutral-900 border-l border-b border-neutral-800 transform rotate-45 pointer-events-none" />

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                {language === 'si' ? 'ප්‍රධාන පිළිගැනීමේ පණිවිඩය (Reception Host)' : 'Digital Architect Direct Reception'}
              </span>
            </div>

            {/* Exact Welcome Quote */}
            <div className="text-base sm:text-xl font-medium text-neutral-100 leading-relaxed font-sans">
              &ldquo;{welcomeSpeech}&rdquo;
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'si'
                    ? 'තාක්ෂණික දැනුමක් අවශ්‍ය නැත. පහත ඇති අංක 1 සිට 5 දක්වා ඔබට ගැළපෙන පියවර තෝරන්න.'
                    : 'Zero technical jargon. Simply tap the option 1 through 5 below that matches your goal.'}
                </span>
              </div>
              <div className="font-mono text-amber-400 font-semibold">
                {language === 'si' ? 'පියවර 5ක මගපෙන්වීම' : 'Guided Decision Flow'}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* The 5 Big Action Buttons: Dialog-IVR Style Smooth Guidance */}
      <div className="relative z-10 w-full mb-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-neutral-100 font-display flex items-center gap-2">
              <span>{language === 'si' ? 'ඔබගේ අවශ්‍යතාවය කුමක්ද? පහත විකල්පයකින් එකක් තෝරන්න:' : 'What is your goal today? Choose from the options below:'}</span>
            </h3>
            <p className="text-xs text-neutral-400">
              {language === 'si' 
                ? 'Dialog Call එකකදී මෙන්, ඔබට අවශ්‍ය සේවාව අදාළ අංකය මත Click කිරීමෙන් තෝරාගන්න.' 
                : 'Select your chosen direction below to initiate your customized decision pathway.'}
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-500">
            {language === 'si' ? 'විකල්ප 5 කින් තෝරන්න' : '5 Clear Guided Pathways'}
          </div>
        </div>

        {/* 5 Pathways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {DECISION_PATHWAYS.map((pathway, index) => {
            const isVip = pathway.id === 'vip_consultation';
            const isShowcase = pathway.id === 'conceptual_showcase';

            return (
              <button
                key={pathway.id}
                type="button"
                onClick={() => {
                  sfx.playStepTransition();
                  onSelectPathway(pathway.id);
                }}
                className={`relative group p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isVip
                    ? 'bg-gradient-to-br from-amber-500/10 via-neutral-900 to-neutral-950 border-amber-400/50 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/15 md:col-span-2 lg:col-span-1'
                    : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 hover:shadow-lg'
                }`}
              >
                {/* Card Top: Number Index & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-amber-400 group-hover:border-amber-400/50 transition-colors">
                      0{index + 1}
                    </span>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300">
                      {pathway.badge[language]}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-sm sm:text-base font-bold text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug">
                    {pathway.title[language]}
                  </h4>

                  <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {pathway.subtitle[language]}
                  </p>
                </div>

                {/* Card Bottom CTA Affordance */}
                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-amber-400 transition-colors">
                  <span>
                    {language === 'si' ? 'මෙම මගපෙන්වීම ආරම්භ කරන්න' : 'Start This Pathway'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-neutral-950 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </button>
            );
          })}
        </div>

      </div>

      {/* Trust & Reassurance Footer Footnote */}
      <div className="relative z-10 pt-4 border-t border-neutral-900 text-center text-xs text-neutral-500">
        Ravana Tech Digital Architecture Studio · Every client receives complete step-by-step guidance from start to launch
      </div>

    </div>
  );
};
