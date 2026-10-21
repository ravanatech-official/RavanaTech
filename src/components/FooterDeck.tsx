import React, { useState, useEffect } from 'react';
import { ScreenId } from './Header';

interface FooterDeckProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const SCREENS: { id: ScreenId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'systems', label: 'SYSTEMS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'ai-lab', label: 'AI LAB' }
];

export const FooterDeck: React.FC<FooterDeckProps> = ({ currentScreen, onNavigate }) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toTimeString().split(' ')[0] + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIndex = SCREENS.findIndex(s => s.id === currentScreen);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(SCREENS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < SCREENS.length - 1) {
      onNavigate(SCREENS[currentIndex + 1].id);
    }
  };

  return (
    <footer className="deck-console-bar" id="deck-console-bar" role="contentinfo" aria-label="Command Deck Console">
      <div className="deck-console-container bd-grid">
        <div className="deck-nav-controls">
          <button
            type="button"
            className="deck-nav-btn"
            id="deck-prev-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            title="Previous Screen (Left Arrow)"
          >
            <i className="bx bx-chevron-left"></i>
            <span className="deck-btn-label">PREV</span>
          </button>

          <div className="deck-screen-indicator" role="tablist" aria-label="Deck Screens">
            {SCREENS.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                role="tab"
                aria-selected={sc.id === currentScreen}
                className={`deck-pill ${sc.id === currentScreen ? 'active' : ''}`}
                onClick={() => onNavigate(sc.id)}
                title={`Switch to ${sc.label} screen`}
              >
                <span className="deck-pill-num">0{idx + 1}</span>
                <span className="deck-pill-name">{sc.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="deck-nav-btn"
            id="deck-next-btn"
            onClick={handleNext}
            disabled={currentIndex >= SCREENS.length - 1}
            title="Next Screen (Right Arrow)"
          >
            <span className="deck-btn-label">NEXT</span>
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>

        <div className="deck-telemetry-strip">
          <span className="deck-status-indicator">
            <span className="deck-status-dot"></span>
            <span className="deck-status-text">SYSTEM READY // BEASTLY SPEED</span>
          </span>
          <span className="deck-telemetry-divider" aria-hidden="true">|</span>
          <span className="deck-clock-tag" id="deck-clock-tag">
            {timeStr}
          </span>
          <span className="deck-telemetry-divider" aria-hidden="true">|</span>
          <span className="deck-copyright-tag">&#169; 2026 RAVANA TECH</span>
        </div>
      </div>
    </footer>
  );
};
