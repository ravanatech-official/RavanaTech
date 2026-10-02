import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  RefreshCw
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationData, Language } from '../types';
import { sfx, speakVoice, stopVoice } from '../utils/audio';

interface WorldMapStepProps {
  onLocationSelected: (location: LocationData, autoLanguage: Language) => void;
  currentLanguage: Language;
}

interface DetectedLocationState {
  country: string;
  code: string;
  isSriLanka: boolean;
  flag: string;
  region: string;
  lat: number;
  lng: number;
  city: string;
  currency: 'LKR' | 'USD';
  language: Language;
}

const DEFAULT_SRI_LANKA: DetectedLocationState = {
  country: 'Sri Lanka',
  code: 'LK',
  isSriLanka: true,
  flag: '🇱🇰',
  region: 'South Asia (HQ)',
  lat: 7.8731,
  lng: 80.7718,
  city: 'Colombo',
  currency: 'LKR',
  language: 'si',
};

export const WorldMapStep: React.FC<WorldMapStepProps> = ({
  onLocationSelected,
  currentLanguage,
}) => {
  const [detectedLoc, setDetectedLoc] = useState<DetectedLocationState>(DEFAULT_SRI_LANKA);
  const [isDetecting, setIsDetecting] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showManualOverride, setShowManualOverride] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const beaconMarkerRef = useRef<L.Marker | null>(null);
  const circleHighlightRef = useRef<L.Circle | null>(null);

  // Exact greetings required by user specification:
  // 🇱🇰 සිංහල: "ආයුබෝවන්! රාවණා ටෙක් වෙත සාදරයෙන් පිළිගන්නවා — ඔබගේ ඩිජිටල් ගමන ආරම්භ කිරීමට පහතින් Click කරන්න."
  // 🌐 English: "Welcome to Ravana Tech. Click below to start your digital journey."
  const getGreetingText = (lang: Language) => {
    return lang === 'si'
      ? 'ආයුබෝවන්! රාවණා ටෙක් වෙත සාදරයෙන් පිළිගන්නවා — ඔබගේ ඩිජිටල් ගමන ආරම්භ කිරීමට පහතින් Click කරන්න.'
      : 'Welcome to Ravana Tech. Click below to start your digital journey.';
  };

  const playVoiceGreeting = useCallback((lang: Language) => {
    setIsVoiceActive(true);
    const text = getGreetingText(lang);
    speakVoice(text, lang, {
      onEnd: () => setIsVoiceActive(false),
      onError: () => setIsVoiceActive(false),
    });
  }, []);

  const handleToggleVoice = () => {
    if (isVoiceActive) {
      stopVoice();
      setIsVoiceActive(false);
    } else {
      playVoiceGreeting(detectedLoc.language);
    }
  };

  // 1. Auto-Detection Pipeline (Background Engine)
  useEffect(() => {
    let isMounted = true;

    const runAutoDetection = async () => {
      let target: DetectedLocationState = { ...DEFAULT_SRI_LANKA };

      try {
        // Fast local detection: Timezone + Browser Language
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const navLang = (navigator.language || '').toLowerCase();

        const isLocalSriLanka = 
          timeZone.includes('Colombo') || 
          timeZone.includes('Kolkata') || 
          navLang.includes('si') || 
          navLang.includes('lk');

        if (!isLocalSriLanka) {
          // Preset mapped countries based on Timezone
          if (timeZone.includes('New_York') || timeZone.includes('Chicago') || timeZone.includes('Los_Angeles') || timeZone.includes('Denver')) {
            target = {
              country: 'United States', code: 'US', isSriLanka: false, flag: '🇺🇸',
              region: 'North America', lat: 37.7749, lng: -122.4194, city: 'New York', currency: 'USD', language: 'en'
            };
          } else if (timeZone.includes('London')) {
            target = {
              country: 'United Kingdom', code: 'GB', isSriLanka: false, flag: '🇬🇧',
              region: 'Europe', lat: 51.5074, lng: -0.1278, city: 'London', currency: 'USD', language: 'en'
            };
          } else if (timeZone.includes('Sydney') || timeZone.includes('Melbourne') || timeZone.includes('Brisbane')) {
            target = {
              country: 'Australia', code: 'AU', isSriLanka: false, flag: '🇦🇺',
              region: 'Oceania', lat: -33.8688, lng: 151.2093, city: 'Sydney', currency: 'USD', language: 'en'
            };
          } else if (timeZone.includes('Dubai')) {
            target = {
              country: 'United Arab Emirates', code: 'AE', isSriLanka: false, flag: '🇦🇪',
              region: 'Middle East', lat: 25.2048, lng: 55.2708, city: 'Dubai', currency: 'USD', language: 'en'
            };
          } else if (timeZone.includes('Toronto') || timeZone.includes('Vancouver')) {
            target = {
              country: 'Canada', code: 'CA', isSriLanka: false, flag: '🇨🇦',
              region: 'North America', lat: 43.6532, lng: -79.3832, city: 'Toronto', currency: 'USD', language: 'en'
            };
          } else {
            // General English International
            target = {
              country: 'International', code: 'GLOBAL', isSriLanka: false, flag: '🌐',
              region: 'Global Client Network', lat: 20.0, lng: 0.0, city: 'Global', currency: 'USD', language: 'en'
            };
          }
        }

        // Fast Async Geo-IP probe with 1200ms timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.country_code) {
            if (data.country_code === 'LK') {
              target = {
                country: 'Sri Lanka',
                code: 'LK',
                isSriLanka: true,
                flag: '🇱🇰',
                region: 'South Asia (HQ)',
                lat: data.latitude || 7.8731,
                lng: data.longitude || 80.7718,
                city: data.city || 'Colombo',
                currency: 'LKR',
                language: 'si',
              };
            } else {
              target = {
                country: data.country_name || target.country,
                code: data.country_code,
                isSriLanka: false,
                flag: data.country_code === 'US' ? '🇺🇸' : data.country_code === 'GB' ? '🇬🇧' : data.country_code === 'AU' ? '🇦🇺' : data.country_code === 'CA' ? '🇨🇦' : data.country_code === 'AE' ? '🇦🇪' : '🌐',
                region: data.region || 'International',
                lat: data.latitude || target.lat,
                lng: data.longitude || target.lng,
                city: data.city || target.city,
                currency: 'USD',
                language: 'en',
              };
            }
          }
        }
      } catch {
        // Fallback to timezone target
      }

      if (isMounted) {
        setDetectedLoc(target);
        setIsDetecting(false);

        // Auto trigger natural personalized voice greeting
        setTimeout(() => {
          playVoiceGreeting(target.language);
        }, 500);
      }
    };

    runAutoDetection();

    return () => {
      isMounted = false;
      stopVoice();
    };
  }, [playVoiceGreeting]);

  // 2. Leaflet Map Initialization & Subtle Gold Beacon Glow
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [detectedLoc.lat, detectedLoc.lng],
        zoom: detectedLoc.isSriLanka ? 6.5 : 4,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false,
      });

      // ArcGIS World Satellite Imagery
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([detectedLoc.lat, detectedLoc.lng], detectedLoc.isSriLanka ? 6.5 : 4, {
        animate: true,
        duration: 1.2
      });
    }

    const map = mapInstanceRef.current;

    // Remove old beacon marker and circle highlight
    if (beaconMarkerRef.current) {
      beaconMarkerRef.current.remove();
    }
    if (circleHighlightRef.current) {
      circleHighlightRef.current.remove();
    }

    // Subtle Gold Country Beacon Icon
    const beaconIcon = L.divIcon({
      className: 'custom-gold-beacon',
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      html: `
        <div class="relative w-full h-full flex items-center justify-center pointer-events-none">
          <div class="absolute w-14 h-14 rounded-full bg-amber-400/20 animate-ping"></div>
          <div class="absolute w-10 h-10 rounded-full bg-amber-400/30 animate-pulse border border-amber-300/80"></div>
          <div class="relative w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-neutral-950 font-black flex items-center justify-center shadow-lg shadow-amber-400/60 ring-2 ring-white">
            <span class="text-xs leading-none">${detectedLoc.flag}</span>
          </div>
        </div>
      `,
    });

    beaconMarkerRef.current = L.marker([detectedLoc.lat, detectedLoc.lng], {
      icon: beaconIcon,
      interactive: false,
    }).addTo(map);

    // Subtle Country Border Highlight / Radar Ring
    circleHighlightRef.current = L.circle([detectedLoc.lat, detectedLoc.lng], {
      radius: detectedLoc.isSriLanka ? 220000 : 380000,
      color: '#f59e0b',
      weight: 1.5,
      opacity: 0.8,
      fillColor: '#f59e0b',
      fillOpacity: 0.08,
      dashArray: '4, 8',
    }).addTo(map);

  }, [detectedLoc]);

  // Clean map on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 3. THE YELLOW START CTA HANDLER
  const handleStartJourney = () => {
    sfx.playSuccess();
    stopVoice();

    onLocationSelected(
      {
        country: detectedLoc.country,
        code: detectedLoc.code,
        isSriLanka: detectedLoc.isSriLanka,
        flag: detectedLoc.flag,
        region: detectedLoc.region,
        coordinates: { x: detectedLoc.lng, y: detectedLoc.lat },
      },
      detectedLoc.language
    );
  };

  // Manual fallback selection if user wants to switch
  const handleManualSelect = (countryName: string, code: string, isSl: boolean, flag: string, lat: number, lng: number, city: string, lang: Language) => {
    sfx.playClick();
    const updated: DetectedLocationState = {
      country: countryName,
      code,
      isSriLanka: isSl,
      flag,
      region: isSl ? 'South Asia (HQ)' : 'Global Client',
      lat,
      lng,
      city,
      currency: isSl ? 'LKR' : 'USD',
      language: lang,
    };
    setDetectedLoc(updated);
    setShowManualOverride(false);
    playVoiceGreeting(lang);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between py-2 sm:py-4 px-3 sm:px-6 max-w-7xl mx-auto w-full select-none overflow-hidden">
      
      {/* 1. Header: Auto-Detection Status Badge & Welcome Greeting */}
      <div className="text-center max-w-2xl mx-auto mb-2 shrink-0">
        
        {/* Subtle Cockpit Auto-Detected Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-400/30 text-[11px] font-mono text-amber-400 mb-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-bold">
            {isDetecting 
              ? 'LOCATING CLIENT NODE...' 
              : `AUTO-DETECTED: ${detectedLoc.city}, ${detectedLoc.country.toUpperCase()} ${detectedLoc.flag}`}
          </span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-300 font-sans">
            {detectedLoc.language === 'si' ? 'ස්වයංක්‍රීය සැකසුම: සිංහල & LKR' : 'Default: English & USD'}
          </span>
        </div>

        {/* Natural Text Greeting Banner */}
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <p className="text-xs sm:text-sm font-medium text-neutral-200">
            &ldquo;{getGreetingText(detectedLoc.language)}&rdquo;
          </p>
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-1.5 rounded-lg border transition-all ${
              isVoiceActive 
                ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md shadow-amber-400/20' 
                : 'bg-neutral-900 text-amber-400 border-neutral-800 hover:border-amber-400/40'
            }`}
            title="Toggle Voice Greeting"
          >
            {isVoiceActive ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. World Map Canvas with Subtle Gold Beacon Glow */}
      <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] max-h-[580px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl backdrop-blur-xl flex flex-col my-1">
        
        {/* Leaflet Map Target */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Subtle Top-Left Status HUD */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center gap-2 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{detectedLoc.city}, {detectedLoc.country}</span>
          <span className="text-neutral-500">|</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ZERO-FRICTION READY
          </span>
        </div>

        {/* Subtle Top-Right Manual Switcher Link (Discrete Override) */}
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={() => setShowManualOverride(!showManualOverride)}
            className="px-2.5 py-1 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 backdrop-blur-md border border-neutral-800 text-[10px] text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <Globe2 className="w-3 h-3 text-amber-400" />
            <span>{showManualOverride ? 'Hide' : 'Switch Region'}</span>
          </button>
        </div>

        {/* Manual Country Selector Dropdown (Only appears if user clicks switch region) */}
        {showManualOverride && (
          <div className="absolute top-12 right-3 z-20 w-64 bg-neutral-950/95 border border-neutral-800 rounded-xl p-2 shadow-2xl backdrop-blur-md space-y-1 animate-fadeIn">
            <div className="text-[10px] text-neutral-400 px-2 py-0.5 font-mono">SELECT REGION:</div>
            <button
              onClick={() => handleManualSelect('Sri Lanka', 'LK', true, '🇱🇰', 7.8731, 80.7718, 'Colombo', 'si')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200"
            >
              <span>🇱🇰 Sri Lanka (HQ)</span>
              <span className="text-[10px] font-mono text-amber-400">සිංහල · LKR</span>
            </button>
            <button
              onClick={() => handleManualSelect('United States', 'US', false, '🇺🇸', 37.7749, -122.4194, 'Silicon Valley', 'en')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200"
            >
              <span>🇺🇸 United States</span>
              <span className="text-[10px] font-mono text-neutral-400">English · USD</span>
            </button>
            <button
              onClick={() => handleManualSelect('United Kingdom', 'GB', false, '🇬🇧', 51.5074, -0.1278, 'London', 'en')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200"
            >
              <span>🇬🇧 United Kingdom</span>
              <span className="text-[10px] font-mono text-neutral-400">English · USD</span>
            </button>
            <button
              onClick={() => handleManualSelect('Australia', 'AU', false, '🇦🇺', -33.8688, 151.2093, 'Sydney', 'en')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200"
            >
              <span>🇦🇺 Australia</span>
              <span className="text-[10px] font-mono text-neutral-400">English · USD</span>
            </button>
            <button
              onClick={() => handleManualSelect('United Arab Emirates', 'AE', false, '🇦🇪', 25.2048, 55.2708, 'Dubai', 'en')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200"
            >
              <span>🇦🇪 United Arab Emirates</span>
              <span className="text-[10px] font-mono text-neutral-400">English · USD</span>
            </button>
          </div>
        )}

      </div>

      {/* 3. THE YELLOW START CTA — The SINGLE & PRIMARY Action on the Screen */}
      <div className="shrink-0 pt-2 pb-1 flex flex-col items-center">
        <button
          type="button"
          onClick={handleStartJourney}
          className="w-full max-w-xl py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-black text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all border border-amber-300/50 group"
        >
          <span>
            {detectedLoc.language === 'si'
              ? 'ඔබගේ ඩිජිටල් ගමන ආරම්භ කරන්න'
              : 'CLICK TO START YOUR JOURNEY'}
          </span>
          <ArrowRight className="w-5 h-5 text-neutral-950 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
        </button>

        {/* Micro-guarantee caption */}
        <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-mono mt-2">
          <span>⚡ Instant Zero-Friction Entry</span>
          <span>·</span>
          <span>🔒 No Registration Required</span>
          <span>·</span>
          <span>⏱️ Rapid 4-Step Scoping</span>
        </div>
      </div>

    </div>
  );
};
