import React from 'react';

interface ServicesScreenProps {
  isActive: boolean;
  onNavigate: (screenId: string) => void;
  onSelectService: (serviceName: string) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  isActive,
  onNavigate,
  onSelectService,
}) => {
  const services = [
    {
      id: 'websites',
      title: 'Bespoke High-Speed Websites',
      icon: 'bx-layout',
      badge: 'CORE SYSTEM',
      tag: 'SUB-SECOND SPEED',
      description: 'Ultra-fast marketing platforms and brand websites designed from scratch. Zero templates, bespoke layouts, and mathematical typography that outshine competitors.',
      specs: ['Sub-200ms TTFB', 'Responsive HUD', '100/100 Lighthouse'],
    },
    {
      id: 'ecommerce',
      title: 'High-Converting Online Stores',
      icon: 'bx-shopping-bag',
      badge: 'COMMERCE ENGINE',
      tag: 'STREAMLINED CHECKOUT',
      description: 'Custom e-commerce architectures engineered for seamless checkout conversions, integrated payment gateways, and real-time inventory management.',
      specs: ['Stripe / PayPal', 'Instant Cart', 'Mobile First'],
    },
    {
      id: 'portals',
      title: 'Custom Web Apps & Portals',
      icon: 'bx-code-block',
      badge: 'ENTERPRISE',
      tag: 'FULL-STACK LOGIC',
      description: 'Internal dashboards, client management portals, and automated business platforms that replace tedious spreadsheets and streamline day-to-day operations.',
      specs: ['React & Node.js', 'Role-Based Access', 'REST / GraphQL'],
    },
    {
      id: 'cloud',
      title: 'Cloud Architecture & Edge Hosting',
      icon: 'bx-cloud-lightning',
      badge: 'INFRASTRUCTURE',
      tag: 'GLOBAL CDN',
      description: 'Resilient cloud deployment on Google Cloud and Firebase. Worldwide edge caching, automated SSL encryption, and continuous automated backup systems.',
      specs: ['99.99% Uptime', 'Global Edge CDN', 'Automated Failover'],
    },
    {
      id: 'seo',
      title: 'SEO & Speed Optimization',
      icon: 'bx-line-chart',
      badge: 'ORGANIC GROWTH',
      tag: 'SCHEMA.ORG JSON-LD',
      description: 'Industrial-grade search engine optimization with rich structured data, social graph cards, semantic hierarchy, and top-ranking Core Web Vitals.',
      specs: ['Schema.org JSON-LD', 'Rich Snippets', 'Social Cards'],
    },
    {
      id: 'support',
      title: 'Maintenance & 24/7 Priority Support',
      icon: 'bx-shield-quarter',
      badge: 'GUARANTEED SLA',
      tag: 'ZERO DOWNTIME',
      description: 'Dedicated engineering support directly with the lead developer. Proactive security patching, analytics reporting, and rapid emergency intervention.',
      specs: ['Direct WhatsApp SLA', 'Proactive Patching', 'Traffic Analytics'],
    },
  ];

  const handleBookService = (serviceTitle: string) => {
    onSelectService(serviceTitle);
    onNavigate('contact');
  };

  return (
    <section
      className={`systems section deck-screen ${isActive ? 'deck-screen-active' : ''}`}
      id="systems"
      data-screen-index="2"
      data-screen-id="systems"
      data-route="/systems"
      data-title="SERVICES // RAVANA TECH | Web Development Studio"
    >
      <div className="systems__container bd-grid">
        <div className="section-header">
          <span className="section-subtitle">HIGH-OCTANE DIGITAL SOLUTIONS</span>
          <h2 className="section-title">CORE ENGINEERING SERVICES</h2>
          <p className="section-lead">
            Every solution is engineered to generate measurable business ROI, lightning-fast user experiences, and bulletproof operational reliability.
          </p>
        </div>

        <div className="systems__grid">
          {services.map((svc) => (
            <div key={svc.id} className="system-card hud-panel">
              <span className="hud-corner hud-corner-tl" />
              <span className="hud-corner hud-corner-tr" />
              <span className="hud-corner hud-corner-bl" />
              <span className="hud-corner hud-corner-br" />

              <div className="system-card__header">
                <div className="system-card__icon-wrap">
                  <i className={`bx ${svc.icon}`} />
                </div>
                <div className="system-card__meta">
                  <span className="system-card__badge">{svc.badge}</span>
                  <span className="system-card__tag">{svc.tag}</span>
                </div>
              </div>

              <h3 className="system-card__title">{svc.title}</h3>
              <p className="system-card__description">{svc.description}</p>

              <div className="system-card__specs">
                {svc.specs.map((spec, i) => (
                  <span key={i} className="spec-pill">
                    <i className="bx bx-check" /> {spec}
                  </span>
                ))}
              </div>

              <div className="system-card__footer">
                <button
                  type="button"
                  onClick={() => handleBookService(svc.title)}
                  className="button button-outline system-card__btn"
                >
                  <i className="bx bx-right-arrow-alt" />
                  REQUEST BLUEPRINT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
