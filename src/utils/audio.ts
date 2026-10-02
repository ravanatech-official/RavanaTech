// Audio utility using Web Audio API for synthetic sound effects & Web Speech API for voice guidance
class SoundFX {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Futuristic gentle click chime
  playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Ignore
    }
  }

  // Radar ping when location or pin is tapped
  playRadarPing() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  // Harmonic success chime on reaching quotation or completing a step
  playSuccess() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C chord
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.4);
      });
    } catch {
      // Ignore
    }
  }

  // Step transition whoosh
  playStepTransition() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Ignore
    }
  }
}

export const sfx = new SoundFX();

export interface SpeechCallback {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

// Female voice name substrings to strictly exclude
const FEMALE_NAMES = [
  'zira', 'hazel', 'samantha', 'susan', 'victoria', 'catherine', 'karen',
  'helena', 'elena', 'maria', 'stephanie', 'jenny', 'aria', 'sarah',
  'ava', 'emma', 'sonia', 'veena', 'neerja', 'lisa', 'kendra', 'female',
  'woman', 'girl', 'anna', 'monica', 'amira', 'heera', 'kalpana', 'julie',
  'alice', 'fiona', 'moira', 'tessa', 'yuna', 'kyoko', 'sin-ji', 'ting-ting'
];

// Male voice name keywords to strongly prefer
const MALE_NAMES = [
  'david', 'mark', 'george', 'daniel', 'oliver', 'guy', 'brian', 'arthur',
  'ravi', 'prabhat', 'james', 'richard', 'alex', 'fred', 'ryan', 'male',
  'man', 'andrew', 'steven', 'thomas', 'google uk english male',
  'microsoft david', 'microsoft mark', 'microsoft george', 'en-in', 'natural'
];

export const speakVoice = (
  text: string,
  lang: 'en' | 'si' = 'en',
  callbacks?: SpeechCallback
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    callbacks?.onError?.();
    return false;
  }

  if (sfx.isMuted) {
    callbacks?.onEnd?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Natural English transcription for Sinhala greeting so synthetic speech doesn't mangle letters
    let spokenText = text;
    if (lang === 'si') {
      if (text.includes('රාවණා ටෙක් වෙත සාදරයෙන් පිළිගන්නවා') || text.includes('ඩිජිටල් ගමන')) {
        spokenText = "Ayubowan! Welcome to Ravana Tech. Click below to start your digital journey.";
      } else if (text.includes('Ravana Tech වෙත සාදරයෙන් පිළිගන්නවා') || text.includes('ශාන්තප්‍රිය')) {
        spokenText = "Ayubowan! Welcome to Ravana Tech. I am Shanthapriya, your Founder and Digital Architect. Select your solution pathway below to begin your personalized questionnaire.";
      }
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);
    
    // Male Architect vocal settings: Authoritative, calm, deep baritone pitch
    utterance.pitch = 0.82;
    utterance.rate = 0.92;

    const voices = window.speechSynthesis.getVoices();
    
    // 1. Filter out all female voices
    const nonFemaleVoices = voices.filter(v => {
      const lower = v.name.toLowerCase();
      return !FEMALE_NAMES.some(f => lower.includes(f));
    });

    // 2. Search for explicit male voices
    let selectedVoice = nonFemaleVoices.find(v => {
      const lower = v.name.toLowerCase();
      return MALE_NAMES.some(m => lower.includes(m)) && v.lang.startsWith('en');
    });

    // 3. Fallback: Any non-female English voice
    if (!selectedVoice) {
      selectedVoice = nonFemaleVoices.find(v => v.lang.startsWith('en'));
    }

    // 4. Fallback: Any non-female voice
    if (!selectedVoice && nonFemaleVoices.length > 0) {
      selectedVoice = nonFemaleVoices[0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => {
      callbacks?.onStart?.();
    };
    utterance.onend = () => {
      callbacks?.onEnd?.();
    };
    utterance.onerror = () => {
      callbacks?.onError?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    callbacks?.onError?.();
    return false;
  }
};

export const stopVoice = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
};
