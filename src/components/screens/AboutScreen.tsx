import React from 'react';
import { ScreenId } from '../Header';

interface AboutScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <section className="about section deck-screen deck-screen-active" id="about">
      <div className="bd-grid">
        <h2 className="section-title">ABOUT // ARCHITECTURAL DNA</h2>
      </div>

      <div className="about__container bd-grid">
        <div className="about__img-panel hud-panel">
          <span className="hud-corner hud-corner-tl"></span>
          <span className="hud-corner hud-corner-tr"></span>
          <span className="hud-corner hud-corner-bl"></span>
          <span className="hud-corner hud-corner-br"></span>

          <div className="about__img-wrapper">
            <img
              src="/Avatar 1.jpg"
              alt="Shanthapriya Silva — Lead Architect"
              className="about__img"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/img/Avatar1.jpg';
              }}
            />
          </div>

          <div className="about__profile-meta">
            <h3 className="about__lead-name">SHANTHAPRIYA SILVA</h3>
            <span className="about__lead-title cyan-text">
              FOUNDER & LEAD SYSTEMS ARCHITECT
            </span>
            <div className="about__location-tag">
              <i className="bx bx-map"></i>
              <span>Colombo, Sri Lanka &bull; Global Operations</span>
            </div>
          </div>

          <div className="about__quick-actions">
            <a
              href="https://wa.me/94788470610"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline button-small"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <i className="bx bxl-whatsapp"></i>
              <span>CONNECT ON WHATSAPP</span>
            </a>
          </div>
        </div>

        <div className="about__data">
          <div className="hud-panel about__narrative-panel">
            <span className="hud-corner hud-corner-tl"></span>
            <span className="hud-corner hud-corner-tr"></span>
            <span className="hud-corner hud-corner-bl"></span>
            <span className="hud-corner hud-corner-br"></span>

            <div className="about__lead-statement">
              <h3>ENGINEERING VELOCITY WITHOUT COMPROMISE</h3>
              <p>
                Ravana Tech is a premier software studio dedicated to engineering high-velocity websites, tailored e-commerce architectures, and autonomous AI systems. We operate with an uncompromising standard: zero bloat, sub-second response times, and bulletproof user experiences.
              </p>
            </div>

            <div className="about__pillars-grid">
              <div className="pillar-item">
                <i className="bx bx-bolt-circle pillar-icon"></i>
                <div className="pillar-content">
                  <h4>SUB-SECOND PERFORMANCE</h4>
                  <p>
                    Every pixel, script, and database query is hyper-optimized for instantaneous responsiveness and flawless Google Core Web Vitals.
                  </p>
                </div>
              </div>

              <div className="pillar-item">
                <i className="bx bx-layer pillar-icon"></i>
                <div className="pillar-content">
                  <h4>BESPOKE USER INTERFACES</h4>
                  <p>
                    We build distinctive, modern digital environments that elevate brand prestige rather than generic cookie-cutter templates.
                  </p>
                </div>
              </div>

              <div className="pillar-item">
                <i className="bx bx-bot pillar-icon"></i>
                <div className="pillar-content">
                  <h4>COGNITIVE WORKFLOWS & AI</h4>
                  <p>
                    From autonomous document controllers to automated customer intelligence pipelines, we embed real AI capabilities into commercial software.
                  </p>
                </div>
              </div>
            </div>

            <div className="about__stack-section">
              <h4 className="stack-title">CORE TECHNICAL MATRIX</h4>
              <div className="stack-badges-wrap">
                <span className="tech-badge">React 19</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">Vite</span>
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">Express</span>
                <span className="tech-badge">Firebase & Firestore</span>
                <span className="tech-badge">Google Cloud</span>
                <span className="tech-badge">Gemini Multimodal AI</span>
                <span className="tech-badge">Document OCR & EDMS</span>
                <span className="tech-badge">REST & GraphQL</span>
              </div>
            </div>

            <div className="about__cta-row">
              <button
                type="button"
                className="button button-primary"
                onClick={() => onNavigate('projects')}
              >
                <span>EXPLORE 50 CONCEPTS</span>
                <i className="bx bx-grid-alt"></i>
              </button>

              <button
                type="button"
                className="button button-outline"
                onClick={() => onNavigate('contact')}
              >
                <span>START A CONVERSATION</span>
                <i className="bx bx-message-square-dots"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
