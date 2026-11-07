import React from 'react';
import type { DeckScreen, SystemTelemetry } from '../types.ts';

interface CommandDeckFooterProps {
  screens: DeckScreen[];
  currentIndex: number;
  onNavigateIndex: (index: number) => void;
  telemetry: SystemTelemetry | null;
}

export const CommandDeckFooter: React.FC<CommandDeckFooterProps> = ({
  screens,
  currentIndex,
  onNavigateIndex,
  telemetry,
}) => {
  const isAiLab = screens[currentIndex]?.id === 'ai-lab';
  const canPrev = currentIndex > 0;
  const canNext = !isAiLab && currentIndex < 4; // Contact (4) is end of linear flow

  return (
    <footer className="deck-footer" id="deck-footer" role="contentinfo">
      <div className="deck-footer__inner bd-grid">
        {/* Prev Screen Button */}
        <button
          type="button"
          className="deck-btn"
          id="deck-prev-btn"
          disabled={!canPrev}
          onClick={() => onNavigateIndex(currentIndex - 1)}
          aria-label="Previous Section"
        >
          <i className="bx bx-chevron-left" />
          <span className="deck-btn__label">PREV</span>
        </button>

        {/* Screen Indicator Pills */}
        <div className="deck-pills" role="tablist" aria-label="Deck Section Switcher">
          {screens.slice(0, 5).map((screen, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={screen.id}
                type="button"
                role="tab"
                className={`deck-pill ${isActive ? 'active' : ''}`}
                aria-selected={isActive}
                onClick={() => onNavigateIndex(idx)}
              >
                <span className="deck-pill__index">0{idx + 1}</span>
                <span className="deck-pill__name">{screen.label}</span>
              </button>
            );
          })}
        </div>

        {/* Next Screen Button */}
        <button
          type="button"
          className="deck-btn"
          id="deck-next-btn"
          disabled={!canNext}
          onClick={() => onNavigateIndex(currentIndex + 1)}
          aria-label="Next Section"
        >
          <span className="deck-btn__label">NEXT</span>
          <i className="bx bx-chevron-right" />
        </button>

        {/* Compliance & Policy Links */}
        <div className="deck-policy-links" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
          <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rt-text-dim)', textDecoration: 'none' }} title="Read Privacy Policy">
            PRIVACY
          </a>
          <span style={{ color: 'var(--rt-border-subtle)' }}>•</span>
          <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rt-text-dim)', textDecoration: 'none' }} title="Read Terms of Service">
            TERMS
          </a>
          <span style={{ color: 'var(--rt-border-subtle)' }}>•</span>
          <a href="/data-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rt-text-dim)', textDecoration: 'none' }} title="Read Data Policy">
            DATA
          </a>
        </div>

        {/* System Telemetry & Quick Hotkeys Status */}
        <div className="deck-telemetry-badge">
          <span className="telemetry-dot active" />
          <span className="telemetry-text">
            SYSTEM // {telemetry ? `${telemetry.status.toUpperCase()} (${telemetry.telemetry.loadSpeed})` : 'OPTIMAL (<0.20s)'}
          </span>
        </div>
      </div>
    </footer>
  );
};
