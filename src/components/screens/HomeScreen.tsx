import React from 'react';

interface HomeScreenProps {
  isActive: boolean;
  onNavigate: (screenId: string) => void;
  projectCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ isActive, onNavigate, projectCount }) => {
  return (
    <section
      className={`home section deck-screen ${isActive ? 'deck-screen-active' : ''}`}
      id="home"
      data-screen-index="0"
      data-screen-id="home"
      data-route="/"
      data-title="RAVANA TECH | Web, Software & AI"
    >
      <div className="home__container bd-grid">
        <div className="home__data">
          <h1 className="home__brand-title">
            RAVANA<br />
            <span className="cyan-text">TECH</span>
          </h1>

          <div className="home__specialties">
            WEBSITES • ONLINE STORES • WEB SOLUTIONS
          </div>

          <p className="home__description">
            We build high-performance websites, online stores, and digital solutions that grow your business. Sub-second speed, clean modern design, and zero technical jargon.
          </p>

          <div className="home__cta-group">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="button"
            >
              <i className="bx bx-rocket" />
              START YOUR PROJECT
            </button>
            <a
              href="https://wa.me/94788470610?text=Hello%20Ravana%20Tech%2C%20I%20would%20like%20to%20discuss%20a%20web%20solution%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
              id="home-cta-whatsapp"
              style={{ borderColor: '#25D366', color: '#25D366' }}
            >
              <i className="bx bxl-whatsapp" />
              WHATSAPP CHAT
            </a>
          </div>

          <div className="home__social">
            <a
              href="https://facebook.com/ravanatech-official"
              target="_blank"
              rel="noopener noreferrer"
              className="home__social-icon"
              title="Facebook"
              aria-label="Facebook"
            >
              <i className="bx bxl-facebook" />
            </a>
            <a
              href="https://instagram.com/ravanatech-official"
              target="_blank"
              rel="noopener noreferrer"
              className="home__social-icon"
              title="Instagram"
              aria-label="Instagram"
            >
              <i className="bx bxl-instagram" />
            </a>
            <a
              href="https://github.com/ravanatech-official"
              target="_blank"
              rel="noopener noreferrer"
              className="home__social-icon"
              title="GitHub"
              aria-label="GitHub"
            >
              <i className="bx bxl-github" />
            </a>
          </div>

          {/* Quick Stats Badges */}
          <div className="home__stats-row" style={{ marginTop: '2rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div className="hud-stat-chip">
              <span className="hud-stat-chip__val">&lt;0.20s</span>
              <span className="hud-stat-chip__lbl">LOAD SPEED</span>
            </div>
            <div className="hud-stat-chip">
              <span className="hud-stat-chip__val">{projectCount > 0 ? `${projectCount}+` : '50+'}</span>
              <span className="hud-stat-chip__lbl">READY BLUEPRINTS</span>
            </div>
            <div className="hud-stat-chip">
              <span className="hud-stat-chip__val">100%</span>
              <span className="hud-stat-chip__lbl">RESPONSIVE</span>
            </div>
          </div>
        </div>

        {/* JARVIS HUD CIRCULAR PROFILE CORE */}
        <div className="home__hud-core">
          <div className="hud-radar-ring" />
          <div className="hud-radar-ring-2" />
          <div className="hud-radar-ring-3" />

          <div className="hud-circle-container">
            <div className="hud-circle-outer-glow" />
            <div className="hud-circle-ring-dashed" />

            <div className="hud-circle-image-wrap">
              <picture>
                <source srcSet="/assets/img/image_01_opt.webp" type="image/webp" />
                <img
                  src="/assets/img/image_01_1791448896391.jpg"
                  alt="Ravana Tech Founder Shanthapriya Silva"
                  className="hud-circle-img"
                  width={340}
                  height={340}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('Avatar1.jpg')) {
                      target.src = '/Avatar1.jpg';
                    }
                  }}
                />
              </picture>
              <div className="hud-circle-scan-beam" />
            </div>
          </div>

          <div className="hud-circle-footer-badge">
            <span>SHANTHAPRIYA SILVA</span>
            <span className="hud-badge-role">FOUNDER // LEAD ARCHITECT</span>
          </div>
        </div>
      </div>
    </section>
  );
};
