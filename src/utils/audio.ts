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
      // Ignore audio context errors if blocked by browser policy
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

// Web Speech API Voice Synthesizer
export interface SpeechCallback {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

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

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    
    if (lang === 'si') {
      // Check if Sinhala or Indian subcontinent voice is available
      const siVoice = voices.find(v => v.lang.startsWith('si') || v.lang.includes('LK'));
      if (siVoice) {
        utterance.voice = siVoice;
        utterance.lang = siVoice.lang;
      } else {
        // Fallback to warm English/neutral voice or standard voice
        const warmVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Arthur')) && v.lang.startsWith('en'));
        if (warmVoice) utterance.voice = warmVoice;
        utterance.lang = 'en-US';
      }
    } else {
      // High quality English voice
      const preferred = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Samantha') || v.name.includes('Premium')) && v.lang.startsWith('en'));
      if (preferred) {
        utterance.voice = preferred;
      }
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
