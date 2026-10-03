import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Globe2
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationData, Language } from '../types';
import { sfx, speakVoice, stopVoice } from '../utils/audio';

interface WorldMapStepProps {
  onLocationSelected: (location: LocationData, autoLanguage: Language) => void;
  currentLanguage?: Language;
  location?: LocationData | null;
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
};

export const WorldMapStep: React.FC<WorldMapStepProps> = ({
  onLocationSelected,
}) => {
  const [detectedLoc, setDetectedLoc] = useState<DetectedLocationState>(DEFAULT_SRI_LANKA);
  const [isDetecting, setIsDetecting] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showManualOverride, setShowManualOverride] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const beaconMarkerRef = useRef<L.Marker | null>(null);
  const circleHighlightRef = useRef<L.Circle | null>(null);

  const greetingText = 'Welcome to Ravana Tech. Select your operating region to calibrate your local currency and milestone pricing.';

  const playVoiceGreeting = useCallback(() => {
    setIsVoiceActive(true);
    speakVoice(greetingText, 'en', {
      onEnd: () => setIsVoiceActive(false),
      onError: () => setIsVoiceActive(false),
    });
  }, []);

  const handleToggleVoice = () => {
    if (isVoiceActive) {
      stopVoice();
      setIsVoiceActive(false);
    } else {
      playVoiceGreeting();
    }
  };

  // 1. Auto-Detection Pipeline (Background Engine)
  useEffect(() => {
    let isMounted = true;

    const runAutoDetection = async () => {
      let target: DetectedLocationState = { ...DEFAULT_SRI_LANKA };

      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const isLocalSriLanka = 
          timeZone.includes('Colombo') || 
          timeZone.includes('Kolkata');

        if (!isLocalSriLanka) {
          if (timeZone.includes('New_York') || timeZone.includes('Chicago') || timeZone.includes('Los_Angeles') || timeZone.includes('Denver')) {
            target = {
              country: 'United States', code: 'US', isSriLanka: false, flag: '🇺🇸',
              region: 'North America', lat: 37.7749, lng: -122.4194, city: 'Silicon Valley', currency: 'USD'
            };
          } else if (timeZone.includes('London')) {
            target = {
              country: 'United Kingdom', code: 'GB', isSriLanka: false, flag: '🇬🇧',
              region: 'Europe', lat: 51.5074, lng: -0.1278, city: 'London', currency: 'USD'
            };
          } else if (timeZone.includes('Sydney') || timeZone.includes('Melbourne') || timeZone.includes('Brisbane')) {
            target = {
              country: 'Australia', code: 'AU', isSriLanka: false, flag: '🇦🇺',
              region: 'Oceania', lat: -33.8688, lng: 151.2093, city: 'Sydney', currency: 'USD'
            };
          } else if (timeZone.includes('Dubai') || timeZone.includes('Asia/Dubai')) {
            target = {
              country: 'United Arab Emirates', code: 'AE', isSriLanka: false, flag: '🇦🇪',
              region: 'Middle East', lat: 25.2048, lng: 55.2708, city: 'Dubai', currency: 'USD'
            };
          } else if (timeZone.includes('Singapore')) {
            target = {
              country: 'Singapore', code: 'SG', isSriLanka: false, flag: '🇸🇬',
              region: 'Southeast Asia', lat: 1.3521, lng: 103.8198, city: 'Singapore', currency: 'USD'
            };
          }
        }
      } catch (e) {
        target = { ...DEFAULT_SRI_LANKA };
      }

      if (isMounted) {
        setDetectedLoc(target);
        setIsDetecting(false);

        setTimeout(() => {
          if (isMounted) {
            playVoiceGreeting();
          }
        }, 600);
      }
    };

    runAutoDetection();

    return () => {
      isMounted = false;
      stopVoice();
    };
  }, [playVoiceGreeting]);

  // 2. Leaflet Map Initialization with Dark Cyber Luxe Tile Layer
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [detectedLoc.lat, detectedLoc.lng],
        zoom: detectedLoc.isSriLanka ? 5 : 4,
        minZoom: 2,
        maxZoom: 9,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    map.flyTo([detectedLoc.lat, detectedLoc.lng], detectedLoc.isSriLanka ? 5 : 4, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    if (beaconMarkerRef.current) map.removeLayer(beaconMarkerRef.current);
    if (circleHighlightRef.current) map.removeLayer(circleHighlightRef.current);

    const beaconIcon = L.divIcon({
      className: 'custom-beacon-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      html: `
        <div class="relative flex items-center justify-center w-10 h-10">
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

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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
      'en'
    );
  };

  const handleManualSelect = (countryName: string, code: string, isSl: boolean, flag: string, lat: number, lng: number, city: string) => {
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
    };
    setDetectedLoc(updated);
    setShowManualOverride(false);
    playVoiceGreeting();
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 max-w-7xl mx-auto w-full select-none overflow-hidden">
      
      {/* 1. Header: Prominent Question Headline + Exactly 1-Sentence Brief */}
      <div className="text-center max-w-2xl mx-auto mb-1.5 shrink-0">
        
        {/* Subtle Cockpit Auto-Detected Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-400/30 text-[11px] font-mono text-amber-400 mb-1 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-bold">
            {isDetecting 
              ? 'LOCATING CLIENT NODE...' 
              : `LOCATION DETECTED: ${detectedLoc.city.toUpperCase()}, ${detectedLoc.country.toUpperCase()} ${detectedLoc.flag}`}
          </span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-300 font-sans font-semibold">
            {detectedLoc.currency} Pricing
          </span>
        </div>

        {/* Prominent Question Headline */}
        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight mt-1 leading-snug">
          Select Your Operating Region
        </h1>
        
        {/* Exactly 1-Sentence Simple Brief */}
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-xs sm:text-sm text-neutral-300">
            We calibrate milestone pricing and regional currency based on your business location.
          </p>
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
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
      <div className="relative w-full flex-1 min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] max-h-[560px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl backdrop-blur-xl flex flex-col my-1">
        
        {/* Leaflet Map Target */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Subtle Top-Left Status HUD */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center gap-2 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{detectedLoc.city}, {detectedLoc.country}</span>
          <span className="text-neutral-500">|</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            CALIBRATED
          </span>
        </div>

        {/* Subtle Top-Right Manual Switcher Link */}
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={() => setShowManualOverride(!showManualOverride)}
            className="px-2.5 py-1 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 backdrop-blur-md border border-neutral-800 text-[10px] text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Globe2 className="w-3 h-3 text-amber-400" />
            <span>{showManualOverride ? 'Hide' : 'Switch Region'}</span>
          </button>
        </div>

        {/* Manual Country Selector Dropdown */}
        {showManualOverride && (
          <div className="absolute top-12 right-3 z-20 w-64 bg-neutral-950/95 border border-neutral-800 rounded-xl p-2 shadow-2xl backdrop-blur-md space-y-1 animate-fadeIn">
            <div className="text-[10px] text-neutral-400 px-2 py-0.5 font-mono">SELECT REGION:</div>
            <button
              onClick={() => handleManualSelect('Sri Lanka', 'LK', true, '🇱🇰', 7.8731, 80.7718, 'Colombo')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200 cursor-pointer"
            >
              <span>🇱🇰 Sri Lanka (HQ)</span>
              <span className="text-[10px] font-mono text-amber-400">LKR Currency</span>
            </button>
            <button
              onClick={() => handleManualSelect('United States', 'US', false, '🇺🇸', 37.7749, -122.4194, 'Silicon Valley')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200 cursor-pointer"
            >
              <span>🇺🇸 United States</span>
              <span className="text-[10px] font-mono text-neutral-400">USD Currency</span>
            </button>
            <button
              onClick={() => handleManualSelect('United Kingdom', 'GB', false, '🇬🇧', 51.5074, -0.1278, 'London')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200 cursor-pointer"
            >
              <span>🇬🇧 United Kingdom</span>
              <span className="text-[10px] font-mono text-neutral-400">USD Currency</span>
            </button>
            <button
              onClick={() => handleManualSelect('Australia', 'AU', false, '🇦🇺', -33.8688, 151.2093, 'Sydney')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200 cursor-pointer"
            >
              <span>🇦🇺 Australia</span>
              <span className="text-[10px] font-mono text-neutral-400">USD Currency</span>
            </button>
            <button
              onClick={() => handleManualSelect('United Arab Emirates', 'AE', false, '🇦🇪', 25.2048, 55.2708, 'Dubai')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-900 flex items-center justify-between text-neutral-200 cursor-pointer"
            >
              <span>🇦🇪 United Arab Emirates</span>
              <span className="text-[10px] font-mono text-neutral-400">USD Currency</span>
            </button>
          </div>
        )}

      </div>

      {/* 3. Primary CTA Button */}
      <div className="shrink-0 pt-2 pb-1 flex flex-col items-center">
        <button
          type="button"
          onClick={handleStartJourney}
          className="w-full max-w-xl py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-black text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all border border-amber-300/50 group cursor-pointer"
        >
          <span>CONFIRM & LAUNCH VIRTUAL RECEPTION</span>
          <ArrowRight className="w-5 h-5 text-neutral-950 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
        </button>

        {/* Micro-guarantee caption */}
        <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-mono mt-1.5">
          <span>⚡ Instant Zero-Friction Entry</span>
          <span>·</span>
          <span>🔒 No Registration Required</span>
          <span>·</span>
          <span>⏱️ Rapid 3-Step Scoping</span>
        </div>
      </div>

    </div>
  );
};
