import React from 'react';

interface AboutScreenProps {
  isActive: boolean;
  onNavigate: (screenId: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ isActive, onNavigate }) => {
  return (
    <section
      className={`about section deck-screen ${isActive ? 'deck-screen-active' : ''}`}
      id="about"
      data-screen-index="1"
      data-screen-id="about"
      data-route="/about"
      data-title="ABOUT // RAVANA TECH | Web, Software & AI"
    >
      <div className="about__container bd-grid">
        <div className="about__img-wrap">
          <picture>
            <source srcSet="/assets/img/image_01_opt.webp" type="image/webp" />
            <img
              src="/assets/img/image_01_1791448896391.jpg"
              alt="Shanthapriya Silva - Founder & Lead Developer"
              className="about__img"
              width={420}
              height={420}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('about.jpg')) {
                  target.src = '/about.jpg';
                }
              }}
            />
          </picture>
          <div className="about__img-overlay-hud">
            <span className="hud-tag">VERIFIED ARCHITECT</span>
            <span className="hud-code">ID // RT-2026-DEV</span>
          </div>
        </div>

        <div className="about__data">
          <span className="section-subtitle">FOUNDER &amp; LEAD ARCHITECT</span>
          <h2 className="section-title">SHANTHAPRIYA SILVA</h2>

          <p className="about__description">
            I am a full-stack engineer and digital architect specializing in building modern web applications, high-converting digital storefronts, and autonomous automation pipelines.
          </p>

          <p className="about__description">
            At <strong>Ravana Tech</strong>, we discard the bloated agency model. We build clean, hyper-optimized digital assets directly with founders and forward-thinking businesses. No middle layers, no technical confusion—just relentless speed, mathematical precision, and guaranteed business results.
          </p>

          {/* Core Philosophy Grid */}
          <div className="about__pillars-grid">
            <div className="pillar-card hud-panel">
              <span className="pillar-num">01</span>
              <h4>SUB-SECOND PERFORMANCE</h4>
              <p>Every asset, script, and database query is engineered for sub-200ms TTFB worldwide.</p>
            </div>

            <div className="pillar-card hud-panel">
              <span className="pillar-num">02</span>
              <h4>CONVERSION ARCHITECTURE</h4>
              <p>Sleek visual hierarchy built strictly to convert visitors into paying clients and inbound calls.</p>
            </div>

            <div className="pillar-card hud-panel">
              <span className="pillar-num">03</span>
              <h4>ZERO TECH JARGON</h4>
              <p>Direct communication in plain language with transparent delivery timelines and ownership.</p>
            </div>

            <div className="pillar-card hud-panel">
              <span className="pillar-num">04</span>
              <h4>PRODUCTION INTEGRITY</h4>
              <p>100% responsive, hardened against security vulnerabilities, and backed by automated CI/CD.</p>
            </div>
          </div>

          <div className="about__cta-row" style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="button"
            >
              <i className="bx bx-conversation" />
              SCHEDULE CONSULTATION
            </button>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="button button-outline"
            >
              <i className="bx bx-grid-alt" />
              VIEW 50+ BLUEPRINTS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
