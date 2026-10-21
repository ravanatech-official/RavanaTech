import React, { useState, useEffect, useRef } from 'react';
import { ConceptualProject } from '../data/projectsData';

interface ProjectModalProps {
  project: ConceptualProject | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
  onToast: (msg: string, icon?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNavigate,
  onToast
}) => {
  const [device, setDevice] = useState<'laptop' | 'tablet' | 'mobile'>('laptop');
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!project) return;
    setLoading(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate(-1);
      } else if (e.key === 'ArrowRight') {
        onNavigate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNavigate]);

  if (!project) return null;

  const projectUrl = `/conceptual-projects/${encodeURIComponent(project.filename)}`;

  const handleCopy = () => {
    const fullUrl = `${window.location.origin}${projectUrl}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      onToast('Direct demo link copied to clipboard!', 'bx-check');
    }).catch(() => {
      onToast('Link copied!', 'bx-check');
    });
  };

  const handleReload = () => {
    setLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = projectUrl;
    }
  };

  return (
    <div
      id="gallery-preview-modal"
      className="gallery-preview-modal is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      style={{ display: 'flex' }}
    >
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-dialog hud-panel">
        <span className="hud-corner hud-corner-tl"></span>
        <span className="hud-corner hud-corner-tr"></span>
        <span className="hud-corner hud-corner-bl"></span>
        <span className="hud-corner hud-corner-br"></span>

        {/* Modal Header */}
        <div className="modal-header-station">
          <div className="modal-project-info">
            <span className="modal-pulse-beacon"></span>
            <div className="modal-title-wrap">
              <h3 id="modal-project-title">{project.title}</h3>
              <div className="modal-title-meta">
                <span id="modal-project-category">{project.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span id="modal-project-domain">{project.domain}</span>
              </div>
            </div>
          </div>

          {/* Device Controls */}
          <div className="modal-device-controls">
            <button
              type="button"
              className={`device-toggle-btn ${device === 'laptop' ? 'active' : ''}`}
              onClick={() => setDevice('laptop')}
              title="MacBook Pro"
            >
              <i className="bx bx-laptop"></i>
              <span>MACBOOK PRO</span>
            </button>
            <button
              type="button"
              className={`device-toggle-btn ${device === 'tablet' ? 'active' : ''}`}
              onClick={() => setDevice('tablet')}
              title="iPad Pro"
            >
              <i className="bx bx-tab"></i>
              <span>IPAD PRO</span>
            </button>
            <button
              type="button"
              className={`device-toggle-btn ${device === 'mobile' ? 'active' : ''}`}
              onClick={() => setDevice('mobile')}
              title="iPhone 17 Pro"
            >
              <i className="bx bx-mobile-alt"></i>
              <span>IPHONE 17 PRO</span>
            </button>
          </div>

          {/* Actions */}
          <div className="modal-top-actions">
            <button
              type="button"
              className="modal-action-btn"
              onClick={handleReload}
              title="Reload interactive frame"
            >
              <i className="bx bx-refresh"></i>
              <span>RELOAD</span>
            </button>
            <button
              type="button"
              className="modal-action-btn"
              onClick={handleCopy}
              title="Copy direct demo link"
            >
              <i className="bx bx-copy"></i>
              <span>COPY URL</span>
            </button>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn"
              title="Open full website in separate browser tab"
            >
              <i className="bx bx-link-external"></i>
              <span>OPEN TAB</span>
            </a>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              title="Close (ESC)"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        </div>

        {/* Viewport Canvas with Device Frame */}
        <div className="modal-viewport-canvas">
          <div className="preview-iframe-wrapper" data-device={device}>
            {device === 'laptop' && (
              <div className="macbook-camera-notch" aria-hidden="true">
                <span className="notch-lens"></span>
                <span className="notch-sensor"></span>
              </div>
            )}
            {device === 'tablet' && (
              <div className="ipad-camera-lens" aria-hidden="true"></div>
            )}
            {device === 'mobile' && (
              <>
                <div className="iphone-speaker-slit" aria-hidden="true"></div>
                <div className="iphone-dynamic-island" aria-hidden="true">
                  <span className="island-camera"></span>
                  <span className="island-sensor"></span>
                </div>
                <div className="iphone-side-buttons" aria-hidden="true">
                  <span className="btn-action"></span>
                  <span className="btn-vol-up"></span>
                  <span className="btn-vol-down"></span>
                  <span className="btn-power"></span>
                </div>
              </>
            )}

            {loading && (
              <div className="modal-iframe-loader">
                <div className="loader-spinner"></div>
                <span className="loader-text">INITIALIZING HIGH-SPEED SANDBOX...</span>
              </div>
            )}

            <div className="preview-screen-viewport">
              <iframe
                ref={iframeRef}
                src={projectUrl}
                title={project.fullTitle}
                className="preview-modal-iframe"
                onLoad={() => setLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="modal-footer-station">
          <button
            type="button"
            className="modal-nav-arrow"
            onClick={() => onNavigate(-1)}
            title="Previous concept (Left Arrow)"
          >
            <i className="bx bx-chevron-left"></i>
            <span>PREV</span>
          </button>

          <div className="modal-index-counter">
            <span className="cyan-text">{project.title}</span> &middot; {project.tags.join(' / ')}
          </div>

          <button
            type="button"
            className="modal-nav-arrow"
            onClick={() => onNavigate(1)}
            title="Next concept (Right Arrow)"
          >
            <span>NEXT</span>
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
