import React from 'react';
import { Volume2, VolumeX, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { LocationData } from '../types';
import { sfx } from '../utils/audio';

interface TopBarProps {
  location: LocationData | null;
  onResetLocation: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  activeScreen: 'map' | 'reception' | 'step' | 'final';
  onGoToReception: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  location,
  onResetLocation,
  isMuted,
  onToggleMute,
  activeScreen,
  onGoToReception,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoToReception}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none cursor-pointer"
            aria-label="Ravana Tech Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-base shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-100 group-hover:text-amber-400 transition-colors">
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
            className={`hover:text-amber-400 transition-colors cursor-pointer ${activeScreen === 'reception' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Virtual Reception
          </button>
          
          <button
            onClick={onResetLocation}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-xs text-neutral-400 cursor-pointer"
            title="Change Operating Region"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>
              {location ? `${location.flag} ${location.country}` : 'Select Region'}
            </span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400/90 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Architect Online · LK-HQ</span>
          </div>
        </nav>

        {/* Zone 3: Interactive Affordances (Sound Toggle + Direct VIP WhatsApp) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              sfx.playClick();
              onToggleMute();
            }}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isMuted 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300' 
                : 'bg-amber-400/10 border-amber-400/30 text-amber-400 hover:bg-amber-400/20'
            }`}
            title={isMuted ? 'Unmute Founder Voice & Sound' : 'Mute Founder Voice & Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Quick WhatsApp Direct link */}
          <a
            href="https://wa.me/94788470610?text=Hello%20Ravana%20Tech%20Architect,%20I%20am%20visiting%20your%20digital%20reception."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Direct WhatsApp</span>
          </a>
        </div>

      </div>
    </header>
  );
};
