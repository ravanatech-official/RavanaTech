import React, { useState } from 'react';
import { 
  Volume2, 
  Pause, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle,
  Cpu
} from 'lucide-react';
import { Language } from '../types';
import aiAvatarFaceImg from '../assets/images/digital_avatar_face_1790933152711.jpg';

interface DigitalAvatarProps {
  isPlayingVoice: boolean;
  onToggleVoice: () => void;
  language: Language;
  size?: 'compact' | 'medium' | 'large';
  className?: string;
}

export const DigitalAvatar: React.FC<DigitalAvatarProps> = ({
  isPlayingVoice,
  onToggleVoice,
  language,
  size = 'large',
  className = '',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [avatarMode, setAvatarMode] = useState<'ai_face' | 'studio_cutout'>('ai_face');

  // Exact paths: Imported AI Studio Generated face & static fallback
  const aiFaceSrc = aiAvatarFaceImg || "/assets/avatar/digital_avatar_face.jpg";
  const studioCutoutSrc = "/assets/founder/founder_transparent_FINAL.png";

  return (
    <div className={`relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900/95 via-neutral-900/70 to-neutral-950 p-3 sm:p-5 overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-500 ${className}`}>
      
      {/* Ambient Radial Spotlight Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isPlayingVoice 
          ? 'w-[320px] h-[320px] bg-amber-500/20' 
          : 'w-[240px] h-[240px] bg-amber-500/10'
      }`} />

      {/* Top Controls: Status Badge, Mode Switcher & Voice Button */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1">
            <Cpu className="w-3 h-3 text-amber-400" />
            <span>{language === 'si' ? 'ඩිජිටල් නිර්මාතෘ' : 'DIGITAL ARCHITECT'}</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* View Mode Toggle */}
          <button
            type="button"
            onClick={() => setAvatarMode(avatarMode === 'ai_face' ? 'studio_cutout' : 'ai_face')}
            className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors"
            title="Toggle between AI Face & Studio Portrait"
          >
            {avatarMode === 'ai_face' ? 'AI Studio Face' : 'Studio Cutout'}
          </button>

          {/* Voice Speech Button */}
          <button
            type="button"
            onClick={onToggleVoice}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all ${
              isPlayingVoice 
                ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md shadow-amber-400/25' 
                : 'bg-neutral-950 text-amber-400 border-neutral-800 hover:border-amber-400/50'
            }`}
          >
            {isPlayingVoice ? (
              <>
                <Pause className="w-3 h-3" />
                <span className="hidden xs:inline">{language === 'si' ? 'හඬ නවතන්න' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3 h-3" />
                <span className="hidden xs:inline">{language === 'si' ? 'හඬ අසන්න' : 'Play Voice'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Avatar Visual Stage with Premium Fade-In Animation */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-[180px] sm:min-h-[220px] lg:min-h-[260px] max-h-[340px] overflow-hidden my-1">
        
        {avatarMode === 'ai_face' ? (
          /* 1. AI Studio Generated Consistent Face Portrait with Premium Glass Frame */
          <div className="relative flex flex-col items-center justify-center transition-all duration-700">
            <div className={`relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-3xl p-1 bg-gradient-to-b from-amber-400/50 via-neutral-800 to-neutral-950 shadow-2xl transition-all duration-500 ${
              isPlayingVoice 
                ? 'ring-4 ring-amber-400/80 shadow-amber-400/40 scale-105' 
                : 'hover:scale-[1.02] shadow-black/80'
            }`}>
              
              {/* Inner Glowing Ring with Fade-In Animation */}
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-neutral-950 relative">
                <img 
                  src={aiFaceSrc}
                  alt="Shanthapriya Silva — Lead Digital Architect"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
                    imageLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-95 blur-sm'
                  }`}
                  onError={(e) => {
                    // Fallback to static public image
                    (e.target as HTMLImageElement).src = "/assets/avatar/digital_avatar_face.jpg";
                  }}
                />

                {/* Subtle Amber Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* AI Model Generation Watermark Badge */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-md border border-amber-400/30 text-[8px] font-mono font-bold text-amber-400 flex items-center gap-1 pointer-events-none">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>AI STUDIO RENDER</span>
                </div>
              </div>
            </div>

            {/* Speaking Wave Equalizer Indicator */}
            {isPlayingVoice && (
              <div className="absolute -bottom-3 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-950/90 backdrop-blur-md border border-amber-400/50 shadow-lg shadow-amber-400/20 transition-all duration-300">
                {[0.4, 0.9, 0.5, 1.0, 0.7, 0.3].map((height, idx) => (
                  <span 
                    key={idx} 
                    className="w-1 bg-amber-400 rounded-full animate-pulse"
                    style={{ 
                      height: `${Math.round(height * 14)}px`,
                      animationDelay: `${idx * 0.12}s`,
                      animationDuration: '0.6s'
                    }}
                  />
                ))}
                <span className="text-[10px] text-amber-300 font-mono ml-1 font-bold">SPEAKING</span>
              </div>
            )}
          </div>
        ) : (
          /* 2. Studio Cutout Full Portrait */
          <div className="relative w-full max-w-[260px] sm:max-w-[280px] h-full flex items-end justify-center transition-all duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.22),transparent_70%)] pointer-events-none rounded-b-2xl" />
            <img 
              src={studioCutoutSrc} 
              alt="Shanthapriya Silva — Founder & Digital Architect" 
              className={`relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 ${
                isPlayingVoice ? 'scale-105' : 'hover:scale-[1.02]'
              }`}
            />
          </div>
        )}

      </div>

      {/* Founder Identity Card & Direct WhatsApp VIP Link */}
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

        {/* Official Speech Transcript Bubble */}
        <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-300 font-medium leading-relaxed">
          &ldquo;{language === 'si' 
            ? 'ආයුබෝවන්! මම ශාන්තප්‍රිය — ඔබගේ Digital Architect. ඔබගේ ව්‍යාපෘතියට ගැළපෙන හොඳම විසඳුම් අංශය දකුණු පසින් තෝරන්න.' 
            : 'Welcome! I am Shanthapriya, your Digital Architect. Select your desired solution pathway on the right to start.'}&rdquo;
        </div>
      </div>

    </div>
  );
};
