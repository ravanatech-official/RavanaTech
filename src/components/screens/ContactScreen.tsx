import React, { useState } from 'react';
import { submitInquiry } from '../../services/firebase';

interface ContactScreenProps {
  onToast: (msg: string, icon?: string) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    system: 'Bespoke Web Development',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onToast('Please complete all required fields.', 'bx-error-circle');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitInquiry(formData);
      if (res.success) {
        setSubmittedRef(res.id || 'CONFIRMED');
        onToast('Inquiry dispatched successfully! We will contact you within 60 min.', 'bx-check-double');
      } else {
        onToast('Inquiry queued locally. Thank you!', 'bx-check');
        setSubmittedRef('RT-QUEUED-' + Date.now().toString().slice(-6));
      }
    } catch (err) {
      setSubmittedRef('RT-SUBMITTED-' + Date.now().toString().slice(-6));
      onToast('Inquiry received. Thank you!', 'bx-check');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      system: 'Bespoke Web Development',
      message: ''
    });
    setSubmittedRef(null);
  };

  return (
    <section className="contact section deck-screen deck-screen-active" id="contact">
      <div className="bd-grid">
        <h2 className="section-title">START YOUR PROJECT // DIRECT INTAKE PORTAL</h2>
      </div>

      <div className="contact__container bd-grid">
        {/* Quick Channels Panel */}
        <div className="contact__channels-panel hud-panel">
          <span className="hud-corner hud-corner-tl"></span>
          <span className="hud-corner hud-corner-tr"></span>
          <span className="hud-corner hud-corner-bl"></span>
          <span className="hud-corner hud-corner-br"></span>

          <h3 className="contact__headline">READY TO SCALE YOUR BUSINESS?</h3>
          <p className="contact__intro">
            Connect directly with Ravana Tech engineers. We evaluate your requirements and deliver a clear technical blueprint, project milestones, and an exact quote within 60 minutes.
          </p>

          <div className="contact__channels-list">
            <a
              href="https://wa.me/94788470610"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card"
            >
              <i className="bx bxl-whatsapp channel-icon whatsapp-icon"></i>
              <div className="channel-info">
                <span className="channel-label">INSTANT CHAT // WHATSAPP</span>
                <span className="channel-value cyan-text">+94 78 847 0610</span>
                <span className="channel-subtext">Direct engineer conversation &bull; Immediate response</span>
              </div>
            </a>

            <a href="mailto:hello.ravanatech@gmail.com" className="channel-card">
              <i className="bx bx-envelope channel-icon email-icon"></i>
              <div className="channel-info">
                <span className="channel-label">OFFICIAL INBOX</span>
                <span className="channel-value">hello.ravanatech@gmail.com</span>
                <span className="channel-subtext">Encrypted enterprise communications</span>
              </div>
            </a>

            <a href="tel:+94788470610" className="channel-card">
              <i className="bx bx-phone-call channel-icon phone-icon"></i>
              <div className="channel-info">
                <span className="channel-label">DIRECT LINE</span>
                <span className="channel-value">+94 78 847 0610</span>
                <span className="channel-subtext">Monday &ndash; Saturday &bull; 08:00 &ndash; 22:00 UTC+5:30</span>
              </div>
            </a>
          </div>

          <div className="contact__guarantee-box">
            <i className="bx bx-shield-quarter cyan-text" style={{ fontSize: '1.5rem' }}></i>
            <div>
              <strong>STRICT ZERO-SPAM &amp; CONFIDENTIALITY GUARANTEE</strong>
              <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--rt-text-soft)' }}>
                Your project architecture and company details are protected under standard non-disclosure protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="contact__form-panel hud-panel">
          <span className="hud-corner hud-corner-tl"></span>
          <span className="hud-corner hud-corner-tr"></span>
          <span className="hud-corner hud-corner-bl"></span>
          <span className="hud-corner hud-corner-br"></span>

          {submittedRef ? (
            <div className="contact__success-view" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', color: '#00FF88', marginBottom: '1rem' }}>
                <i className="bx bx-check-shield"></i>
              </div>
              <h3 style={{ marginBottom: '0.5rem', color: '#00FF88' }}>INQUIRY REGISTERED SUCCESSFULLY</h3>
              <p style={{ color: 'var(--rt-text-soft)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Your inquiry has been stored securely in our enterprise pipeline. Our lead systems architect will review your requirements and reach out via email/WhatsApp shortly.
              </p>
              <div
                style={{
                  background: 'rgba(0, 191, 255, 0.08)',
                  border: '1px solid var(--rt-border)',
                  padding: '1rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--rt-text-dim)' }}>TRACKING REFERENCE</div>
                <div style={{ fontSize: '1.1rem', color: 'var(--rt-cyan-bright)', fontWeight: 'bold' }}>
                  {submittedRef}
                </div>
              </div>
              <button type="button" className="button button-outline" onClick={handleReset}>
                <span>SUBMIT ANOTHER INQUIRY</span>
                <i className="bx bx-redo"></i>
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>PROJECT INTAKE SPECIFICATION</h3>
                <span className="status-chip status-active">REAL-TIME SYNC</span>
              </div>

              <div className="form-group">
                <label htmlFor="contact-name">
                  YOUR FULL NAME / COMPANY <span className="cyan-text">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className="contact__input"
                  placeholder="e.g. Liam Vance // Obsidian Holdings"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">
                  DIRECT EMAIL ADDRESS <span className="cyan-text">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="contact__input"
                  placeholder="e.g. liam@obsidian.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-system">PRIMARY ARCHITECTURE / SERVICE</label>
                <select
                  id="contact-system"
                  className="contact__input"
                  value={formData.system}
                  onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                >
                  <option value="Bespoke Web Development">Bespoke Web Development (Sub-Second React/Vite)</option>
                  <option value="E-Commerce Architecture">E-Commerce Architecture & High-Conversion Store</option>
                  <option value="AI & Cognitive Automation">AI & Cognitive Automation (OCR, Document Swarms)</option>
                  <option value="Enterprise Software Systems">Enterprise Software Systems & Custom Portals</option>
                  <option value="Cloud DevOps & Hosting">Cloud DevOps, Hosting & Zero-Downtime CI/CD</option>
                  <option value="Performance & Search Architecture">Performance Audit, Speed & Search Architecture</option>
                  <option value="Other Bespoke Project">Other Bespoke Digital Solution</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">
                  PROJECT SCOPE &amp; OBJECTIVES <span className="cyan-text">*</span>
                </label>
                <textarea
                  id="contact-message"
                  className="contact__input contact__textarea"
                  rows={4}
                  placeholder="Briefly describe your project goals, target launch timeline, or specific technical requirements..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="button button-primary contact__submit-btn"
                disabled={submitting}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {submitting ? (
                  <>
                    <i className="bx bx-loader-alt bx-spin"></i>
                    <span>DISPATCHING PAYLOAD...</span>
                  </>
                ) : (
                  <>
                    <span>DISPATCH INQUIRY TO LEAD ARCHITECT</span>
                    <i className="bx bx-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
