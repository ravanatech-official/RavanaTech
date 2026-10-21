import React, { useState, useEffect } from 'react';
import type { ConceptualProject } from '../../types.ts';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  currentIndex: number;
  projects: ConceptualProject[];
  onClose: () => void;
  onNavigateModal: (direction: number) => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  isOpen,
  currentIndex,
  projects,
  onClose,
  onNavigateModal,
}) => {
  const [device, setDevice] = useState<'laptop' | 'tablet' | 'mobile'>('laptop');
  const [iframeLoading, setIframeLoading] = useState(true);

  const currentProject = projects[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    setIframeLoading(true);
    // Auto-select mobile on small screens
    if (window.innerWidth <= 768) {
      setDevice('mobile');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigateModal(-1);
      } else if (e.key === 'ArrowRight') {
        onNavigateModal(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, onClose, onNavigateModal]);

  if (!isOpen || !currentProject) return null;

  const encodedUrl = `/conceptual projects/${encodeURIComponent(currentProject.filename)}`;

  return (
    <div
      className={`gallery-preview-modal ${isOpen ? 'is-open' : ''}`}
      id="gallery-preview-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Conceptual Blueprint Preview"
    >
      <div className="gallery-preview-backdrop" onClick={onClose} />

      <div className="gallery-preview-dialog">
        {/* Modal Top Command Header */}
        <div className="preview-modal-header">
          <div className="preview-modal-title-group">
            <span className="modal-category-badge" id="modal-project-category">
              {currentProject.categoryLabel}
            </span>
            <h3 className="modal-title" id="modal-project-title">
              {currentProject.fullTitle || currentProject.title}
            </h3>
            <span className="modal-domain" id="modal-project-domain">
              {currentProject.domain}
            </span>
          </div>

          {/* Device Viewport Toggle Buttons */}
          <div className="preview-device-switch">
            <button
              type="button"
              className={`device-toggle-btn ${device === 'laptop' ? 'active' : ''}`}
              data-device="desktop"
              title="MacBook / Desktop View (100% Canvas)"
              onClick={() => setDevice('laptop')}
            >
              <i className="bx bx-laptop" />
              <span>LAPTOP</span>
            </button>
            <button
              type="button"
              className={`device-toggle-btn ${device === 'tablet' ? 'active' : ''}`}
              data-device="tablet"
              title="iPad Pro View (768px Width)"
              onClick={() => setDevice('tablet')}
            >
              <i className="bx bx-tab" />
              <span>TABLET</span>
            </button>
            <button
              type="button"
              className={`device-toggle-btn ${device === 'mobile' ? 'active' : ''}`}
              data-device="mobile"
              title="iPhone 17 Pro View (390px Width)"
              onClick={() => setDevice('mobile')}
            >
              <i className="bx bx-mobile-alt" />
              <span>MOBILE</span>
            </button>
          </div>

          {/* Modal Header Controls */}
          <div className="preview-modal-controls">
            <span className="modal-index-counter" id="modal-index-counter">
              {currentIndex + 1} / {projects.length}
            </span>
            <a
              href={encodedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline modal-external-btn"
              id="modal-launch-link"
              title="Launch full page in separate browser tab"
            >
              <i className="bx bx-link-external" />
              <span>LAUNCH FULL</span>
            </a>
            <button
              type="button"
              className="modal-close-btn"
              id="modal-close-btn"
              aria-label="Close Preview"
              onClick={onClose}
            >
              <i className="bx bx-x" />
            </button>
          </div>
        </div>

        {/* Modal Body & Interactive Simulator Frame */}
        <div className="preview-modal-body">
          <button
            type="button"
            className="modal-nav-arrow modal-nav-prev"
            id="modal-prev-btn"
            aria-label="Previous Blueprint"
            onClick={() => onNavigateModal(-1)}
          >
            <i className="bx bx-chevron-left" />
          </button>

          <div
            className="preview-iframe-wrapper"
            id="preview-iframe-wrapper"
            data-device={device}
          >
            {iframeLoading && (
              <div className="preview-iframe-loader" id="modal-iframe-loader">
                <i className="bx bx-loader-alt bx-spin" />
                <span>DISPATCHING HIGH-FIDELITY BLUEPRINT...</span>
              </div>
            )}
            <iframe
              id="preview-modal-iframe"
              className="preview-iframe"
              src={encodedUrl}
              title={currentProject.fullTitle || currentProject.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setIframeLoading(false)}
            />
          </div>

          <button
            type="button"
            className="modal-nav-arrow modal-nav-next"
            id="modal-next-btn"
            aria-label="Next Blueprint"
            onClick={() => onNavigateModal(1)}
          >
            <i className="bx bx-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
};
