import React, { useState } from 'react';
import { ScreenId } from '../Header';

interface SystemsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface ServiceSystem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  sla: string;
  deliverables: string[];
  tech: string[];
}

const SYSTEMS: ServiceSystem[] = [
  {
    id: 'web-dev',
    code: 'SYS-01',
    title: 'BESPOKE WEB DEVELOPMENT',
    subtitle: 'Ultra-Fast Single Page & Multi-Screen Portals',
    description: 'Custom tailored web applications built on modern frameworks (React 19, Vite, TypeScript) with zero bloated plugins and sub-second load times worldwide.',
    icon: 'bx-code-curly',
    sla: '3-10 Days Delivery',
    deliverables: ['Custom Responsive UI', 'Instant SPA Transitions', 'Core Web Vitals 95+', 'SEO Schema Markup'],
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'ecom',
    code: 'SYS-02',
    title: 'E-COMMERCE ARCHITECTURES',
    subtitle: 'High-Conversion Frictionless Commerce',
    description: 'High-speed online shopping experiences engineered to convert traffic into revenue. Fast catalog indexing, instant cart interactions, and frictionless checkout flows.',
    icon: 'bx-cart-alt',
    sla: '5-14 Days Delivery',
    deliverables: ['Product Catalog Engine', 'One-Click Checkout', 'Inventory Tracking', 'Payment Gateway Integration'],
    tech: ['Stripe / Local Pay', 'Firestore DB', 'Real-time Cart', 'CDN Caching']
  },
  {
    id: 'ai-agents',
    code: 'SYS-03',
    title: 'AI & COGNITIVE AUTOMATION',
    subtitle: 'Document Intelligence & Autonomous Swarms',
    description: 'Embed advanced AI into real-world business operations: automated PDF/drawing data extraction, intelligent transmittal triage, and autonomous multi-agent task dispatch.',
    icon: 'bx-bot',
    sla: 'Custom Timeline',
    deliverables: ['Multimodal Document OCR', 'Autonomous Task Swarms', 'Data Cleansing Pipelines', 'Custom LLM Prompts'],
    tech: ['Google Gemini', 'Claude 3.5', 'Cognitive OCR', 'Python / Node.js']
  },
  {
    id: 'fullstack',
    code: 'SYS-04',
    title: 'ENTERPRISE SOFTWARE SYSTEMS',
    subtitle: 'Mission-Critical Internal Tools & Portals',
    description: 'Secure, scalable custom portals, document management systems (EDMS), and operational dashboards built to streamline complex company workflows.',
    icon: 'bx-server',
    sla: 'Milestone-Based',
    deliverables: ['Role-Based Access (RBAC)', 'Audit Logging', 'REST & Real-time APIs', 'Data Migration Tools'],
    tech: ['Node.js / Express', 'Cloud SQL / Firestore', 'JWT / OAuth', 'Docker']
  },
  {
    id: 'cloud-devops',
    code: 'SYS-05',
    title: 'CLOUD DEVOPS & HOSTING',
    subtitle: 'Zero-Downtime Infrastructure & CI/CD',
    description: 'Robust cloud deployment on Google Cloud and Firebase. Automated GitHub Actions pipelines, edge caching, SSL certificates, and 99.99% uptime guarantees.',
    icon: 'bx-cloud-upload',
    sla: 'Instant Provisioning',
    deliverables: ['Automated CI/CD Pipelines', 'Global CDN Distribution', 'Automated Daily Backups', 'DDoS Mitigation'],
    tech: ['Firebase Hosting', 'Google Cloud Run', 'GitHub Actions', 'Cloudflare']
  },
  {
    id: 'performance-seo',
    code: 'SYS-06',
    title: 'PERFORMANCE & SEARCH ARCHITECTURE',
    subtitle: 'Lighthouse 100/100 & High-Visibility SEO',
    description: 'Eliminate bounce rates with ruthless speed optimizations. We restructure codebases for top-tier search engine crawling, OpenGraph tags, and structured data ranking.',
    icon: 'bx-line-chart',
    sla: '24-48 Hours Audit',
    deliverables: ['Sub-300ms First Contentful Paint', 'JSON-LD Structured Data', 'OpenGraph Social Cards', 'Asset Compression'],
    tech: ['Lighthouse', 'WebP / AVIF', 'Gzip / Brotli', 'Semantic HTML5']
  }
];

export const SystemsScreen: React.FC<SystemsScreenProps> = ({ onNavigate }) => {
  const [selectedSystem, setSelectedSystem] = useState<ServiceSystem>(SYSTEMS[0]);

  return (
    <section className="systems section deck-screen deck-screen-active" id="systems">
      <div className="bd-grid">
        <h2 className="section-title">SYSTEMS & ARCHITECTURAL SERVICES</h2>
      </div>

      <div className="systems__container bd-grid">
        {/* Systems Grid */}
        <div className="systems__grid">
          {SYSTEMS.map((sys) => {
            const isSelected = selectedSystem.id === sys.id;
            return (
              <div
                key={sys.id}
                className={`systems__card hud-panel ${isSelected ? 'active-system-card' : ''}`}
                onClick={() => setSelectedSystem(sys)}
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--rt-cyan-bright)' : 'var(--rt-border)',
                  background: isSelected ? 'rgba(0, 191, 255, 0.08)' : 'var(--rt-bg-card)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span className="hud-corner hud-corner-tl"></span>
                <span className="hud-corner hud-corner-tr"></span>
                <span className="hud-corner hud-corner-bl"></span>
                <span className="hud-corner hud-corner-br"></span>

                <div className="systems__card-header">
                  <span className="systems__code cyan-text">{sys.code}</span>
                  <span className="systems__sla">{sys.sla}</span>
                </div>

                <div className="systems__card-title-row">
                  <i className={`bx ${sys.icon} systems__icon`}></i>
                  <div>
                    <h3 className="systems__title">{sys.title}</h3>
                    <div className="systems__subtitle">{sys.subtitle}</div>
                  </div>
                </div>

                <p className="systems__desc">{sys.description}</p>

                <div className="systems__tech-tags">
                  {sys.tech.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>

                <div className="systems__card-action">
                  <span className="select-prompt">
                    {isSelected ? 'SELECTED SYSTEM' : 'CLICK TO INSPECT'}
                  </span>
                  <i className={`bx ${isSelected ? 'bx-check-double cyan-text' : 'bx-chevron-right'}`}></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected System Inspector Panel */}
        <div className="systems__inspector hud-panel">
          <span className="hud-corner hud-corner-tl"></span>
          <span className="hud-corner hud-corner-tr"></span>
          <span className="hud-corner hud-corner-bl"></span>
          <span className="hud-corner hud-corner-br"></span>

          <div className="inspector-header">
            <span className="cyan-text">{selectedSystem.code} SPECIFICATION</span>
            <span className="status-chip status-approved">{selectedSystem.sla}</span>
          </div>

          <h3 className="inspector-title">{selectedSystem.title}</h3>
          <p className="inspector-desc">{selectedSystem.description}</p>

          <div className="inspector-deliverables">
            <h4>CORE DELIVERABLES</h4>
            <ul>
              {selectedSystem.deliverables.map((d) => (
                <li key={d}>
                  <i className="bx bx-check-shield cyan-text"></i>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="inspector-actions">
            <button
              type="button"
              className="button button-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => onNavigate('contact')}
            >
              <span>INQUIRE FOR {selectedSystem.code}</span>
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
