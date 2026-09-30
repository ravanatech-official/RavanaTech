import React from 'react';
import { Volume2, VolumeX, Globe2, ShieldCheck } from 'lucide-react';
import { Language, LocationData } from '../types';
import { sfx } from '../utils/audio';

interface TopBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  location: LocationData | null;
  onResetLocation: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  activeScreen: 'map' | 'reception' | 'step' | 'final';
  onGoToReception: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  language,
  onLanguageChange,
  location,
  onResetLocation,
  isMuted,
  onToggleMute,
  activeScreen,
  onGoToReception,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark (Single text element with icon) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoToReception}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
            aria-label="Ravana Tech Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-base shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-neutral-100 group-hover:text-amber-400 transition-colors">
                Ravana Tech
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono -mt-1">
                Digital Architecture & AI
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation & Status Indicators */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-neutral-300">
          <button
            onClick={onGoToReception}
            className={`hover:text-amber-400 transition-colors ${activeScreen === 'reception' ? 'text-amber-400 font-semibold' : ''}`}
          >
            {language === 'si' ? 'ප්‍රධාන පිළිගැනීමේ මැදිරිය' : 'Virtual Reception'}
          </button>
          
          <button
            onClick={onResetLocation}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-xs text-neutral-400"
            title={language === 'si' ? 'රට වෙනස් කරන්න' : 'Change Location'}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>
              {location ? `${location.flag} ${location.country}` : (language === 'si' ? 'ස්ථානය තෝරන්න' : 'Select Location')}
            </span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400/90 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{language === 'si' ? 'Founder Direct Line' : 'Architect Online'}</span>
          </div>
        </nav>

        {/* Zone 3: Interactive Affordances (Language Toggle + Sound Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              sfx.playClick();
              onToggleMute();
            }}
            className={`p-2 rounded-lg border transition-colors ${
              isMuted 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300' 
                : 'bg-amber-400/10 border-amber-400/30 text-amber-400 hover:bg-amber-400/20'
            }`}
            title={isMuted ? (language === 'si' ? 'හඬ ක්‍රියාත්මක කරන්න' : 'Unmute Voice & Sound') : (language === 'si' ? 'හඬ අක්‍රිය කරන්න' : 'Mute Voice & Sound')}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Language Selector Segmented Control */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            <button
              onClick={() => {
                sfx.playClick();
                onLanguageChange('si');
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'si'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              සිංහල
            </button>
            <button
              onClick={() => {
                sfx.playClick();
                onLanguageChange('en');
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              English
            </button>
          </div>

          {/* Quick WhatsApp Direct link */}
          <a
            href="https://wa.me/94788470610?text=Hello%20Ravana%20Tech%20Architect,%20I%20am%20visiting%20your%20digital%20headquarters."
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'si' ? 'VIP සම්බන්ධතාවය' : 'VIP Contact'}</span>
          </a>
        </div>

      </div>
    </header>
  );
};
