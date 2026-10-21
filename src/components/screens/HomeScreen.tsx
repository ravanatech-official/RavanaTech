import React from 'react';
import { ScreenId } from '../Header';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <section className="home section deck-screen deck-screen-active" id="home">
      <div className="home__container bd-grid">
        <div className="home__data">
          <div className="home__badge">
            <span className="pulse-dot"></span>
            <span>NEXT-GEN WEB ARCHITECTURE &bull; BEASTLY PERFORMANCE</span>
          </div>

          <h1 className="home__brand-title">
            RAVANA<br />
            <span className="cyan-text">TECH</span>
          </h1>

          <div className="home__specialties">
            WEBSITES &bull; ONLINE STORES &bull; WEB SOLUTIONS &bull; AI AGENTS
          </div>

          <p className="home__description">
            We engineer high-performance websites, e-commerce storefronts, and automated intelligent systems that scale your business. Sub-second latency, modern bespoke UI, and zero technical friction.
          </p>

          <div className="home__cta-group">
            <button
              type="button"
              className="button button-primary"
              onClick={() => onNavigate('projects')}
            >
              <span>EXPLORE 50+ CONCEPTS</span>
              <i className="bx bx-right-arrow-alt"></i>
            </button>

            <button
              type="button"
              className="button button-outline"
              onClick={() => onNavigate('contact')}
            >
              <span>START PROJECT</span>
              <i className="bx bx-rocket"></i>
            </button>
          </div>

          <div className="home__stats-grid">
            <div className="stat-card">
              <span className="stat-value">50+</span>
              <span className="stat-label">READY BLUEPRINTS</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">&lt;300ms</span>
              <span className="stat-label">SUB-SECOND SPEED</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">100%</span>
              <span className="stat-label">MOBILE FIRST</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">60min</span>
              <span className="stat-label">FAST PROPOSAL</span>
            </div>
          </div>

          <div className="home__social">
            <a
              href="https://wa.me/94788470610"
              target="_blank"
              rel="noopener noreferrer"
              className="home__social-icon"
              title="WhatsApp Direct"
            >
              <i className="bx bxl-whatsapp"></i>
            </a>
            <a
              href="mailto:hello.ravanatech@gmail.com"
              className="home__social-icon"
              title="Email Direct"
            >
              <i className="bx bx-envelope"></i>
            </a>
            <a
              href="https://github.com/ravanatech-official"
              target="_blank"
              rel="noopener noreferrer"
              className="home__social-icon"
              title="GitHub"
            >
              <i className="bx bxl-github"></i>
            </a>
            <a
              href="https://linkedin.com/company/ravanatech-official"
              target="_blank"
              rel="noopener noreferrer"
              className="home__social-icon"
              title="LinkedIn"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="home__img-container">
          <div className="home__hud-card hud-panel">
            <span className="hud-corner hud-corner-tl"></span>
            <span className="hud-corner hud-corner-tr"></span>
            <span className="hud-corner hud-corner-bl"></span>
            <span className="hud-corner hud-corner-br"></span>

            <div className="hud-card-header">
              <span className="hud-status-badge">NODE: ACTIVE // 2026 EDITION</span>
              <span className="hud-ping-badge">LATENCY: 0.2ms</span>
            </div>

            <div className="hud-card-body">
              <div className="hud-glitch-img-wrap">
                <img
                  src="/Ravana.webp"
                  alt="Ravana Tech Cybernetic Core"
                  className="hud-hero-img"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    // Fallback to avatar if Ravana.webp has path issue
                    (e.target as HTMLImageElement).src = '/assets/img/perfil.png';
                  }}
                />
              </div>

              <div className="hud-metrics-row">
                <div className="metric-item">
                  <span className="metric-title">CORE RUNTIME</span>
                  <span className="metric-num cyan-text">REACT 19 + VITE</span>
                </div>
                <div className="metric-item">
                  <span className="metric-title">CLOUD SYNC</span>
                  <span className="metric-num">FIREBASE ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="hud-card-footer">
              <button
                type="button"
                className="hud-quick-btn"
                onClick={() => onNavigate('systems')}
              >
                <span>VIEW ARCHITECTURAL SYSTEMS</span>
                <i className="bx bx-chip"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
