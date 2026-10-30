import React, { useState } from 'react';
import { postInquiry } from '../../lib/inquiry';

interface ContactScreenProps {
  isActive: boolean;
  selectedService: string;
  onNavigate: (screenId: string) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  isActive,
  selectedService,
  onNavigate,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(selectedService || 'Bespoke High-Speed Websites');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submissionInFlight = React.useRef(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | '';
    msg: string;
    leadId?: string;
  }>({ type: '', msg: '' });

  // Update service if prop changes
  React.useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionInFlight.current) return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({
        type: 'error',
        msg: 'Please fill out all required fields (Name, Email, and Message).',
      });
      return;
    }

    submissionInFlight.current = true;
    setSubmitting(true);
    setFeedback({ type: '', msg: '' });

    try {
      const leadId = await postInquiry({
        name: name.trim(),
        email: email.trim(),
        service: service.trim(),
        message: message.trim(),
      });

      setFeedback({
        type: 'success',
        msg: `Thank you, ${name}! Your inquiry for ${service} has been received. Our team will review your requirements and respond promptly.`,
        leadId,
      });

      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setFeedback({
        type: 'error',
        msg: 'We could not confirm delivery. Your message is still here. Please try again or contact us on WhatsApp.',
      });
    } finally {
      submissionInFlight.current = false;
      setSubmitting(false);
    }
  };

  const waText = encodeURIComponent(
    `Hello Ravana Tech! I would like to discuss a project inquiry.\n\nService: ${service}\nMessage: ${message || 'I would like to explore a custom web solution for my business.'}`
  );
  const waUrl = `https://wa.me/94788470610?text=${waText}`;

  return (
    <section
      className={`contact section deck-screen ${isActive ? 'deck-screen-active' : ''}`}
      id="contact"
      data-screen-index="4"
      data-screen-id="contact"
      data-route="/contact"
      data-title="START YOUR PROJECT // RAVANA TECH"
    >
      <div className="contact__container bd-grid">
        <div className="contact__info">
          <span className="section-subtitle">DIRECT ARCHITECT DISPATCH</span>
          <h2 className="section-title">START YOUR PROJECT</h2>

          <p className="contact__text">
            Have a project in mind, an existing system to accelerate, or an idea to bring to life? Send an inquiry or reach out directly on WhatsApp for an immediate response.
          </p>

          <div className="contact__items-list">
            <div className="contact__item hud-panel">
              <i className="bx bxl-whatsapp contact__icon" style={{ color: '#25D366' }} />
              <div>
                <h4>WHATSAPP FAST-TRACK</h4>
                <p>+94 78 847 0610 (Direct to Shanthapriya)</p>
                <a
                  href="https://wa.me/94788470610"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>

            <div className="contact__item hud-panel">
              <i className="bx bx-envelope contact__icon" />
              <div>
                <h4>EMAIL INQUIRIES</h4>
                <p>hello.ravanatech@gmail.com</p>
                <a href="mailto:hello.ravanatech@gmail.com" className="contact__link">
                  Send Email &rarr;
                </a>
              </div>
            </div>

            <div className="contact__item hud-panel">
              <i className="bx bx-globe contact__icon" />
              <div>
                <h4>OPERATIONAL DISPATCH</h4>
                <p>Colombo, Sri Lanka // Worldwide Remote Engagements</p>
                <span className="hud-code" style={{ fontSize: '0.75rem', color: 'var(--rt-cyan)' }}>
                  TIMEZONE: GMT +05:30 (FLEXIBLE AVAILABILITY)
                </span>
              </div>
            </div>
          </div>

          {/* Dedicated Entrance to AI LAB */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={() => onNavigate('ai-lab')}
              className="button button-outline"
              style={{
                borderColor: 'var(--rt-cyan-bright)',
                color: 'var(--rt-cyan-bright)',
                fontSize: '0.8rem',
                padding: '0.5rem 1rem',
              }}
            >
              <i className="bx bx-brain" />
              OPEN AI &amp; AUTOMATION LAB
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact__form-wrap hud-panel">
          <span className="hud-corner hud-corner-tl" />
          <span className="hud-corner hud-corner-tr" />
          <span className="hud-corner hud-corner-bl" />
          <span className="hud-corner hud-corner-br" />

          <h3 className="contact__form-title">PROJECT SPECIFICATION FORM</h3>
          <p className="contact__form-sub">Direct intake into Ravana Tech project database.</p>

          <form onSubmit={handleSubmit} className="contact__form" id="contact-form" aria-busy={submitting}>
            <div className="form__group">
              <label htmlFor="sender-name">YOUR NAME / ORGANIZATION *</label>
              <input
                type="text"
                id="sender-name"
                name="name"
                maxLength={199}
                disabled={submitting}
                required
                placeholder="e.g. Elena Rostova / Apex Global"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="sender-email">BUSINESS EMAIL ADDRESS *</label>
              <input
                type="email"
                id="sender-email"
                name="email"
                maxLength={199}
                disabled={submitting}
                required
                placeholder="elena@apex.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="sender-system">SERVICE SECTOR</label>
              <select
                id="sender-system"
                name="service"
                disabled={submitting}
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="Bespoke High-Speed Websites">Bespoke High-Speed Websites</option>
                <option value="High-Converting Online Stores">High-Converting Online Stores</option>
                <option value="Custom Web Apps & Portals">Custom Web Apps &amp; Portals</option>
                <option value="Cloud Architecture & Edge Hosting">Cloud Architecture &amp; Edge Hosting</option>
                <option value="SEO & Speed Optimization">SEO &amp; Speed Optimization</option>
                <option value="Maintenance & 24/7 Priority Support">Maintenance &amp; Priority Support</option>
                <option value="AI Workflow Automation & OCR">AI Workflow Automation &amp; OCR</option>
              </select>
            </div>

            <div className="form__group">
              <label htmlFor="sender-message">PROJECT SCOPE &amp; TIMELINE *</label>
              <textarea
                id="sender-message"
                name="message"
                maxLength={4999}
                disabled={submitting}
                rows={4}
                required
                placeholder="Describe your current system, targets, desired features, or launch timeline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" disabled={submitting} className="button form__submit-btn">
              {submitting ? (
                <>
                  <i className="bx bx-loader-alt bx-spin" /> SUBMITTING INQUIRY...
                </>
              ) : (
                <>
                  <i className="bx bx-send" /> TRANSMIT INQUIRY
                </>
              )}
            </button>
          </form>

          {feedback.msg && (
            <div role="status" aria-live="polite" className={`form__status-msg ${feedback.type}`} style={{ marginTop: '1.25rem' }}>
              <div>{feedback.msg}</div>
              {feedback.leadId && (
                <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  REFERENCE: <span className="cyan-text">#{feedback.leadId}</span>
                </div>
              )}
              {(feedback.type === 'success' || feedback.type === 'error') && (
                <div style={{ marginTop: '0.75rem' }}>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.85rem',
                      background: '#25D366',
                      borderRadius: '4px',
                      color: '#000',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-hud)',
                      textDecoration: 'none',
                    }}
                  >
                    <i className="bx bxl-whatsapp" style={{ fontSize: '1rem' }} /> CHAT WITH US ON WHATSAPP
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
