import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MapPin, 
  Navigation, 
  Volume2, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  LocateFixed, 
  Layers, 
  Globe2,
  ZoomIn,
  ZoomOut,
  Timer,
  X,
  Radio
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationData, Language } from '../types';
import { sfx, speakVoice, stopVoice } from '../utils/audio';

interface WorldMapStepProps {
  onLocationSelected: (location: LocationData, autoLanguage: Language) => void;
  currentLanguage: Language;
}

interface CountryHub {
  country: string;
  code: string;
  isSriLanka: boolean;
  flag: string;
  region: string;
  lat: number;
  lng: number;
  primaryCity: string;
}

const PRESET_HUBS: CountryHub[] = [
  { country: 'Sri Lanka', code: 'LK', isSriLanka: true, flag: '🇱🇰', region: 'South Asia (HQ)', lat: 7.8731, lng: 80.7718, primaryCity: 'Colombo / Kandy' },
  { country: 'United Kingdom', code: 'GB', isSriLanka: false, flag: '🇬🇧', region: 'Europe', lat: 51.5074, lng: -0.1278, primaryCity: 'London' },
  { country: 'United States', code: 'US', isSriLanka: false, flag: '🇺🇸', region: 'North America', lat: 37.7749, lng: -122.4194, primaryCity: 'Silicon Valley / NY' },
  { country: 'United Arab Emirates', code: 'AE', isSriLanka: false, flag: '🇦🇪', region: 'Middle East', lat: 25.2048, lng: 55.2708, primaryCity: 'Dubai / Abu Dhabi' },
  { country: 'Australia', code: 'AU', isSriLanka: false, flag: '🇦🇺', region: 'Oceania', lat: -33.8688, lng: 151.2093, primaryCity: 'Sydney / Melbourne' },
  { country: 'Singapore', code: 'SG', isSriLanka: false, flag: '🇸🇬', region: 'Southeast Asia', lat: 1.3521, lng: 103.8198, primaryCity: 'Singapore' },
  { country: 'Canada', code: 'CA', isSriLanka: false, flag: '🇨🇦', region: 'North America', lat: 43.6532, lng: -79.3832, primaryCity: 'Toronto / Vancouver' },
  { country: 'Italy', code: 'IT', isSriLanka: false, flag: '🇮🇹', region: 'Europe', lat: 45.4642, lng: 9.1900, primaryCity: 'Milan / Rome' },
  { country: 'Germany', code: 'DE', isSriLanka: false, flag: '🇩🇪', region: 'Europe', lat: 50.1109, lng: 8.6821, primaryCity: 'Frankfurt / Berlin' },
  { country: 'Qatar', code: 'QA', isSriLanka: false, flag: '🇶🇦', region: 'Middle East', lat: 25.2854, lng: 51.5310, primaryCity: 'Doha' },
  { country: 'Japan', code: 'JP', isSriLanka: false, flag: '🇯🇵', region: 'East Asia', lat: 35.6762, lng: 139.6503, primaryCity: 'Tokyo' },
  { country: 'New Zealand', code: 'NZ', isSriLanka: false, flag: '🇳🇿', region: 'Oceania', lat: -36.8485, lng: 174.7633, primaryCity: 'Auckland' },
  { country: 'Maldives', code: 'MV', isSriLanka: false, flag: '🇲🇻', region: 'South Asia', lat: 4.1755, lng: 73.5093, primaryCity: 'Malé' },
  { country: 'France', code: 'FR', isSriLanka: false, flag: '🇫🇷', region: 'Europe', lat: 48.8566, lng: 2.3522, primaryCity: 'Paris' },
];

type MapStyle = 'satellite' | 'dark' | 'street';

export const WorldMapStep: React.FC<WorldMapStepProps> = ({
  onLocationSelected,
  currentLanguage,
}) => {
  const [selectedHub, setSelectedHub] = useState<CountryHub | null>(PRESET_HUBS[0]); // default Sri Lanka
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({ lat: 7.8731, lng: 80.7718 });
  const [mapStyle, setMapStyle] = useState<MapStyle>('satellite'); // Default to genuine photorealistic satellite
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(3);
  const [autoCountdown, setAutoCountdown] = useState<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const pinMarkerRef = useRef<L.Marker | null>(null);
  const presetMarkersMapRef = useRef<Map<string, L.Marker>>(new Map());
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 100% Free Tile layers without any API Keys or Watermarks
  const tileLayers: Record<MapStyle, { url: string; attribution: string }> = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics'
    },
    dark: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; DeLorme, NAVTEQ'
    },
    street: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  };

  // Auto voice prompt on arrival
  const playLocationPrompt = () => {
    setIsVoiceActive(true);
    const promptText = currentLanguage === 'si'
      ? 'කරුණාකර ඔබ සිටින ස්ථානය සිතියම මත තෝරන්න. Please mark, click or tap your location.'
      : 'Please mark, click or tap your location on the real world map.';
    
    speakVoice(promptText, currentLanguage, {
      onEnd: () => setIsVoiceActive(false),
      onError: () => setIsVoiceActive(false),
    });
  };

  // Helper to determine if point is Sri Lanka
  const checkIfSriLanka = (lat: number, lng: number) => {
    return lat >= 5.8 && lat <= 9.9 && lng >= 79.5 && lng <= 82.0;
  };

  // Create custom DOM icon for selected pin
  const createSelectedPinIcon = (hub: CountryHub) => {
    const isSl = hub.isSriLanka;
    return L.divIcon({
      className: 'custom-leaflet-pin',
      iconSize: [44, 48],
      iconAnchor: [22, 44],
      html: `
        <div class="relative flex flex-col items-center justify-center pointer-events-auto">
          <div class="absolute -top-1 -inset-x-2 h-10 rounded-full animate-ping opacity-40 ${isSl ? 'bg-amber-400' : 'bg-cyan-400'}"></div>
          <div class="relative flex items-center justify-center w-11 h-11 rounded-2xl ${
            isSl ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-neutral-950 ring-2 ring-white shadow-2xl shadow-amber-500/60' 
                 : 'bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 text-white ring-2 ring-white shadow-2xl shadow-cyan-500/60'
          }">
            <span class="text-xl leading-none select-none">${hub.flag}</span>
          </div>
          <div class="w-2.5 h-2.5 -mt-1 rotate-45 ${isSl ? 'bg-amber-400 ring-1 ring-white' : 'bg-cyan-500 ring-1 ring-white'}"></div>
        </div>
      `
    });
  };

  // Create preset beacon icon (clean, non-clashing circular pill)
  const createPresetBeaconIcon = (hub: CountryHub) => {
    return L.divIcon({
      className: 'preset-leaflet-beacon',
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      html: `
        <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125">
          <div class="w-6 h-6 rounded-full bg-neutral-950/90 text-white border border-neutral-700 hover:border-amber-400 flex items-center justify-center text-xs shadow-md">
            ${hub.flag}
          </div>
        </div>
      `
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [20, 45],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Add initial tile layer
    const activeTile = tileLayers[mapStyle];
    const tiles = L.tileLayer(activeTile.url, {
      attribution: activeTile.attribution,
      maxZoom: 19,
      subdomains: ['a', 'b', 'c', 'd']
    }).addTo(map);
    tileLayerRef.current = tiles;

    // Track zoom
    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    // Render Preset Hub Markers
    PRESET_HUBS.forEach((hub) => {
      const isInitialSelected = hub.country === PRESET_HUBS[0].country;
      const marker = L.marker([hub.lat, hub.lng], {
        icon: createPresetBeaconIcon(hub),
        opacity: isInitialSelected ? 0 : 1 // Hide preset beacon if currently occupied by selected pin
      }).addTo(map);

      marker.bindTooltip(`
        <div class="px-2.5 py-1 bg-neutral-950 text-xs font-bold text-white rounded-lg border border-neutral-700 shadow-xl flex items-center gap-1.5">
          <span>${hub.flag}</span>
          <span>${hub.country}</span>
          <span class="text-amber-400 font-normal">(${hub.primaryCity})</span>
        </div>
      `, { direction: 'top', offset: [0, -10], opacity: 0.95 });

      marker.on('click', () => {
        handleSelectHub(hub);
      });

      presetMarkersMapRef.current.set(hub.country, marker);
    });

    // Add Selected Pin for initial Sri Lanka
    const initialHub = PRESET_HUBS[0];
    const pin = L.marker([initialHub.lat, initialHub.lng], {
      icon: createSelectedPinIcon(initialHub),
      zIndexOffset: 1000
    }).addTo(map);
    pinMarkerRef.current = pin;

    // Handle Map Click Anywhere
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      handleCoordinatesClicked(lat, lng);
    });

    // Play initial voice prompt with delay
    const timer = setTimeout(() => {
      playLocationPrompt();
    }, 900);

    return () => {
      clearTimeout(timer);
      stopVoice();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when style changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const activeTile = tileLayers[mapStyle];
    const newTiles = L.tileLayer(activeTile.url, {
      attribution: activeTile.attribution,
      maxZoom: 19,
      subdomains: ['a', 'b', 'c', 'd']
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTiles;
  }, [mapStyle]);

  // Confirm and proceed to virtual reception
  const handleConfirmAndProceed = useCallback((targetHub?: CountryHub) => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setAutoCountdown(null);
    sfx.playSuccess();
    const active = targetHub || selectedHub || PRESET_HUBS[0];
    const targetLang: Language = active.isSriLanka ? 'si' : 'en';

    onLocationSelected({
      country: active.country,
      code: active.code,
      isSriLanka: active.isSriLanka,
      flag: active.flag,
      region: active.region,
      coordinates: { x: currentCoords.lng, y: currentCoords.lat }
    }, targetLang);
  }, [selectedHub, currentCoords, onLocationSelected]);

  // Start smooth auto-proceed countdown
  const startAutoProceed = useCallback((hub: CountryHub) => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    setAutoCountdown(3);

    let secondsLeft = 3;
    countdownIntervalRef.current = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
        setAutoCountdown(null);
        handleConfirmAndProceed(hub);
      } else {
        setAutoCountdown(secondsLeft);
      }
    }, 1000);
  }, [handleConfirmAndProceed]);

  // Cancel / Pause auto-proceed countdown
  const cancelAutoProceed = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setAutoCountdown(null);
    sfx.playClick();
  }, []);

  // Listen for clicks on Leaflet popup button
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.id === 'leaflet-proceed-btn' || target.closest('#leaflet-proceed-btn'))) {
        e.preventDefault();
        e.stopPropagation();
        handleConfirmAndProceed();
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [handleConfirmAndProceed]);

  // Apply selected hub updates
  const applySelectedHub = (hub: CountryHub, lat: number, lng: number, triggerCountdown = true) => {
    setSelectedHub(hub);

    // Update preset markers opacity so selected location never has overlapping double markers
    presetMarkersMapRef.current.forEach((marker, country) => {
      if (country === hub.country) {
        marker.setOpacity(0);
      } else {
        marker.setOpacity(1);
      }
    });

    // Update or Move the Pin Marker and attach Leaflet Popup
    if (pinMarkerRef.current && mapInstanceRef.current) {
      pinMarkerRef.current.setLatLng([lat, lng]);
      pinMarkerRef.current.setIcon(createSelectedPinIcon(hub));

      const popupHtml = `
        <div style="font-family: inherit; text-align: center; padding: 6px 8px; min-width: 175px;">
          <div style="font-size: 24px; margin-bottom: 2px;">${hub.flag}</div>
          <div style="font-weight: 800; font-size: 14px; color: #ffffff; line-height: 1.2;">${hub.country}</div>
          <div style="font-size: 11px; color: #a3a3a3; margin: 4px 0 10px 0;">${hub.isSriLanka ? 'සිංහල (LKR) · Ravana HQ' : 'English (USD) · Global Hub'}</div>
          <button id="leaflet-proceed-btn" style="width: 100%; background: linear-gradient(135deg, #f59e0b, #fbbf24); color: #0a0a0a; font-weight: 900; font-size: 12px; padding: 8px 12px; border-radius: 10px; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4); text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>${hub.isSriLanka ? 'පිළිගැනීමේ මැදිරියට පිවිසෙන්න' : 'Enter Reception'}</span>
            <span>&rarr;</span>
          </button>
        </div>
      `;
      pinMarkerRef.current.bindPopup(popupHtml, { offset: [0, -36], closeButton: true }).openPopup();
    }

    if (triggerCountdown) {
      startAutoProceed(hub);
    }

    // Voice announcement based on country
    const targetLang: Language = hub.isSriLanka ? 'si' : 'en';
    const confirmMsg = hub.isSriLanka
      ? 'ස්ථානය තහවුරු විය: ශ්‍රී ලංකාව. පිළිගැනීමේ මැදිරියට පිවිසෙමින් පවතී.'
      : `Location confirmed: ${hub.country}. Entering Virtual Reception.`;

    speakVoice(confirmMsg, targetLang);
  };

  // Handle clicking on specific coordinates anywhere on earth
  const handleCoordinatesClicked = (lat: number, lng: number) => {
    sfx.playRadarPing();
    setCurrentCoords({ lat, lng });

    const isSl = checkIfSriLanka(lat, lng);
    let targetHub: CountryHub;

    if (isSl) {
      targetHub = PRESET_HUBS[0];
    } else {
      // Find closest known preset hub or create dynamic real coordinates hub
      let closest = PRESET_HUBS[1];
      let minDistance = 999999;
      PRESET_HUBS.forEach((h) => {
        const d = Math.sqrt(Math.pow(h.lat - lat, 2) + Math.pow(h.lng - lng, 2));
        if (d < minDistance) {
          minDistance = d;
          closest = h;
        }
      });

      // If clicked very close to preset, snap to it, otherwise create dynamic region
      if (minDistance < 6) {
        targetHub = closest;
      } else {
        targetHub = {
          country: closest.country,
          code: closest.code,
          isSriLanka: false,
          flag: closest.flag,
          region: closest.region,
          lat,
          lng,
          primaryCity: `${closest.primaryCity} Region`
        };
      }
    }

    applySelectedHub(targetHub, lat, lng, true);
  };

  // Handle Preset Hub Click
  const handleSelectHub = (hub: CountryHub, immediateProceed: boolean = false) => {
    if (immediateProceed) {
      handleConfirmAndProceed(hub);
      return;
    }

    sfx.playRadarPing();
    setCurrentCoords({ lat: hub.lat, lng: hub.lng });
    applySelectedHub(hub, hub.lat, hub.lng, true);

    // Smoothly fly to the hub location on the real map!
    if (mapInstanceRef.current) {
      const targetZoom = hub.isSriLanka ? 7 : 5;
      mapInstanceRef.current.flyTo([hub.lat, hub.lng], targetZoom, {
        animate: true,
        duration: 1.2
      });
    }
  };

  // Locate User GPS
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocatingUser(true);
    sfx.playRadarPing();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocatingUser(false);
        const { latitude, longitude } = position.coords;
        setCurrentCoords({ lat: latitude, lng: longitude });

        const isSl = checkIfSriLanka(latitude, longitude);
        let userHub: CountryHub;

        if (isSl) {
          userHub = PRESET_HUBS[0];
        } else {
          userHub = {
            country: 'Detected Location',
            code: 'LOC',
            isSriLanka: false,
            flag: '📍',
            region: 'Current GPS',
            lat: latitude,
            lng: longitude,
            primaryCity: 'Your Device GPS'
          };
        }

        applySelectedHub(userHub, latitude, longitude);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 8, {
            animate: true,
            duration: 1.5
          });
        }
      },
      (err) => {
        setIsLocatingUser(false);
        console.warn('Geolocation failed:', err.message);
        // Fallback zoom to Sri Lanka
        handleSelectHub(PRESET_HUBS[0]);
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  // Zoom controls
  const handleZoom = (delta: number) => {
    if (mapInstanceRef.current) {
      sfx.playClick();
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + delta);
    }
  };

  // Filter preset hubs
  const filteredHubs = PRESET_HUBS.filter(h =>
    h.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.primaryCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background ambient grid */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px]"
      />

      {/* Header & Voice Command Banner */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-5">
        
        {/* Voice Command Banner */}
        <div 
          onClick={playLocationPrompt}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/90 border border-amber-400/40 shadow-lg shadow-amber-500/10 cursor-pointer hover:border-amber-400 transition-all mb-3"
        >
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-neutral-950">
            <Volume2 className={`w-4 h-4 ${isVoiceActive ? 'animate-bounce' : ''}`} />
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-200">
            <span>&ldquo;Mark, click or tap your location on the map&rdquo;</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-300 font-sans">ඔබ සිටින රට හෝ ස්ථානය තෝරන්න</span>
          </div>
          <div className="flex items-center gap-0.5 h-4 ml-1">
            <span className="w-1 bg-amber-400 rounded-full animate-audio-bar-1 h-2"></span>
            <span className="w-1 bg-amber-400 rounded-full animate-audio-bar-2 h-3"></span>
            <span className="w-1 bg-amber-400 rounded-full animate-audio-bar-3 h-4"></span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-100 font-display">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Ravana Tech</span>
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Explore our real interactive global GIS map. Tap anywhere to pin your coordinates, zoom into our Colombo core hub, or auto-detect with GPS.
        </p>
      </div>

      {/* Main Interactive Real World Map Card */}
      <div className="relative z-10 w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
        
        {/* Map Top Bar with Quick Search & Layer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-neutral-800/80 mb-3">
          
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Navigation className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-semibold text-white">Live Global GIS Radar</span>
            <span>·</span>
            <span className="text-amber-400 font-mono text-[11px]">
              {selectedHub ? `${selectedHub.flag} ${selectedHub.country} (${selectedHub.isSriLanka ? 'සිංහල Auto-Calibrated' : 'English Auto-Calibrated'})` : 'Select Location'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Map Layer Switcher */}
            <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-[11px]">
              <button
                type="button"
                onClick={() => setMapStyle('dark')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  mapStyle === 'dark' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-400 hover:text-white'
                }`}
                title="Cyber Dark Cartography"
              >
                🌙 Dark
              </button>
              <button
                type="button"
                onClick={() => setMapStyle('satellite')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  mapStyle === 'satellite' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-400 hover:text-white'
                }`}
                title="Real Esri Earth Satellite Imagery"
              >
                🛰️ Satellite
              </button>
              <button
                type="button"
                onClick={() => setMapStyle('street')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  mapStyle === 'street' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-400 hover:text-white'
                }`}
                title="Street Atlas"
              >
                🗺️ Streets
              </button>
            </div>

            {/* Quick Country Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search country or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400/80"
              />
            </div>
          </div>

        </div>

        {/* Real Leaflet Map Surface Container */}
        <div className="relative w-full h-[360px] sm:h-[460px] rounded-xl overflow-hidden border border-neutral-800 shadow-inner group">
          
          {/* Leaflet Mount Node */}
          <div ref={mapContainerRef} className="w-full h-full z-0 bg-neutral-950" />

          {/* Floating On-Map Map Controls (Top Right) */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {/* GPS Locate Me Button */}
            <button
              type="button"
              onClick={handleLocateUser}
              disabled={isLocatingUser}
              className="p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-amber-400 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              title="Use Current Device GPS"
            >
              <LocateFixed className={`w-4 h-4 ${isLocatingUser ? 'animate-spin' : ''}`} />
            </button>

            {/* Zoom In / Out */}
            <div className="flex flex-col bg-neutral-900/90 rounded-xl border border-neutral-700/80 shadow-xl backdrop-blur-md overflow-hidden">
              <button
                type="button"
                onClick={() => handleZoom(1)}
                className="p-2 text-neutral-200 hover:text-amber-400 hover:bg-neutral-800/80 transition-colors border-b border-neutral-800"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleZoom(-1)}
                className="p-2 text-neutral-200 hover:text-amber-400 hover:bg-neutral-800/80 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Quick Fly-to Sri Lanka Beacon Button (Top Left) */}
          <div className="absolute top-4 left-4 z-20">
            <button
              type="button"
              onClick={() => handleSelectHub(PRESET_HUBS[0])}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950/90 hover:bg-neutral-900 border border-amber-400/50 text-amber-300 text-xs font-bold shadow-xl backdrop-blur-md transition-all hover:scale-105"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>🇱🇰 Zoom to Sri Lanka HQ</span>
            </button>
          </div>

          {/* Floating Live Entrance HUD on Map (Center Bottom) */}
          {selectedHub && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[94%] sm:w-auto max-w-xl bg-neutral-950/95 border-2 border-amber-400/90 rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in ring-4 ring-amber-400/20">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-2xl shrink-0">
                  {selectedHub.flag}
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>{selectedHub.country}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-black">
                      {selectedHub.isSriLanka ? '🇱🇰 සිංහල (LKR)' : '🌐 English (USD)'}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-200/90 flex items-center gap-2 mt-0.5">
                    {autoCountdown !== null ? (
                      <span className="flex items-center gap-1.5 font-medium text-amber-300">
                        <Timer className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        <span>පිළිගැනීමේ මැදිරියට පිවිසෙයි: <strong className="text-white font-mono text-xs">{autoCountdown}s</strong></span>
                      </span>
                    ) : (
                      <span>ස්ථානය තහවුරුයි · Ready to enter Virtual Reception</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {autoCountdown !== null && (
                  <button
                    type="button"
                    onClick={cancelAutoProceed}
                    className="px-2.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
                    title="Pause timer and keep exploring map"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleConfirmAndProceed(selectedHub)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-all transform active:scale-95 animate-pulse"
                >
                  <span>{selectedHub.isSriLanka ? 'දැන්ම පිවිසෙන්න' : 'Enter Reception'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Coordinate HUD in bottom left */}
          <div className="absolute top-16 left-4 z-20 px-3 py-1.5 rounded-xl bg-neutral-950/85 border border-neutral-800 font-mono text-[10px] text-neutral-300 backdrop-blur-md shadow-lg pointer-events-none flex items-center gap-3">
            <div>
              <span className="text-amber-400 font-bold">LAT:</span> {currentCoords.lat.toFixed(4)}° {currentCoords.lat >= 0 ? 'N' : 'S'}
            </div>
            <div>
              <span className="text-cyan-400 font-bold">LNG:</span> {currentCoords.lng.toFixed(4)}° {currentCoords.lng >= 0 ? 'E' : 'W'}
            </div>
            <div className="text-neutral-500 hidden sm:block">
              ZOOM: {zoomLevel}x
            </div>
          </div>

          {/* Instruction helper bottom right */}
          <div className="absolute top-16 right-4 z-20 text-[11px] text-neutral-300 bg-neutral-950/85 px-3 py-1.5 rounded-xl border border-neutral-800 backdrop-blur-md pointer-events-none shadow-lg hidden sm:block">
            🗺️ Click anywhere on map to pin & enter
          </div>

        </div>

        {/* Quick Location Selection Pills */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Flight Hubs / ප්‍රධාන ස්ථානයන් (Click to Enter):</span>
            </span>
            <span className="text-[11px] text-amber-400 font-mono">
              🇱🇰 Sri Lanka selects Sinhala (LKR) · All others English (USD)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {filteredHubs.slice(0, 14).map((hub) => {
              const isSelected = selectedHub?.country === hub.country;
              return (
                <button
                  key={hub.country}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      handleConfirmAndProceed(hub);
                    } else {
                      handleSelectHub(hub);
                    }
                  }}
                  onDoubleClick={() => handleConfirmAndProceed(hub)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all relative group ${
                    isSelected
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300 ring-2 ring-amber-400 shadow-lg shadow-amber-400/20 scale-[1.02]'
                      : hub.isSriLanka
                      ? 'bg-neutral-950 border-amber-500/50 hover:border-amber-400 text-neutral-200 hover:scale-[1.02]'
                      : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:scale-[1.01]'
                  }`}
                  title={isSelected ? 'Already selected! Click again to Enter Reception' : `Select ${hub.country}`}
                >
                  <span className="text-base">{hub.flag}</span>
                  <div className="truncate flex-1">
                    <div className="text-xs font-bold truncate leading-tight flex items-center justify-between">
                      <span>{hub.country}</span>
                      {isSelected && (
                        <ArrowRight className="w-3 h-3 text-amber-400 animate-pulse ml-1 shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate">
                      {hub.isSriLanka ? 'සිංහල (Core HQ)' : hub.primaryCity.split('/')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirmation Status Banner & Transition CTA */}
        <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-neutral-950 via-neutral-900/60 to-neutral-950 p-3 sm:p-4 rounded-xl border border-amber-400/20">
          
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            {selectedHub ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/40 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-100 flex items-center gap-2">
                    <span>{selectedHub.flag} Location: {selectedHub.country}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 border border-neutral-700 font-bold">
                      {selectedHub.isSriLanka ? 'Language: සිංහල (LKR)' : 'Language: English (USD)'}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400">
                    {selectedHub.isSriLanka 
                      ? 'ශ්‍රී ලංකාවේ ආයතන සඳහා විශේෂිත මිල ගණන් (LKR) සහ සිංහල භාෂාව සක්‍රීයයි.' 
                      : `International cloud infrastructure (USD) and English digital architecture ready for ${selectedHub.country}.`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Tap on Sri Lanka 🇱🇰 or any country above, or click anywhere on the real world map.</span>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => handleConfirmAndProceed(selectedHub || undefined)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 shrink-0 ring-2 ring-amber-400/50"
          >
            <span>
              {selectedHub?.isSriLanka
                ? 'පිළිගැනීමේ මැදිරියට පිවිසෙන්න (Enter Reception)'
                : 'Enter Virtual Reception'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Trust & Presence Footer Footnote */}
      <div className="relative z-10 text-center text-xs text-neutral-500 py-3">
        Ravana Tech · Colombo HQ & Global Digital Infrastructure · Sub-Second Latency Architecture
      </div>

    </div>
  );
};
