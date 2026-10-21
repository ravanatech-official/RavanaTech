import React, { useState, useMemo } from 'react';
import type { ConceptualProject } from '../../types.ts';

interface ProjectsScreenProps {
  isActive: boolean;
  projects: ConceptualProject[];
  onOpenPreview: (index: number) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'ALL CONCEPTS' },
  { id: 'dining', label: 'DINING & BEVERAGE' },
  { id: 'luxury', label: 'LUXURY & FASHION' },
  { id: 'fitness', label: 'FITNESS & WELLNESS' },
  { id: 'creative', label: 'CREATIVE & STUDIOS' },
  { id: 'lifestyle', label: 'LIFESTYLE & RETAIL' },
];

const ITEMS_PER_PAGE = 3;

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  isActive,
  projects,
  onOpenPreview,
}) => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = currentCategory === 'all' || project.category === currentCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = (project.title || '').toLowerCase().includes(q) || (project.fullTitle || '').toLowerCase().includes(q);
      const inDomain = (project.domain || '').toLowerCase().includes(q);
      const inDesc = (project.description || '').toLowerCase().includes(q);
      const inCat = (project.categoryLabel || '').toLowerCase().includes(q);
      const inTags = project.tags && project.tags.some((t) => t.toLowerCase().includes(q));
      const inTech = project.techStack && project.techStack.some((t) => t.toLowerCase().includes(q));

      return inTitle || inDomain || inDesc || inCat || inTags || inTech;
    });
  }, [projects, currentCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length);
  const currentBatch = filteredProjects.slice(startIndex, endIndex);

  const handleCategoryChange = (catId: string) => {
    setCurrentCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section
      className={`projects section deck-screen ${isActive ? 'deck-screen-active' : ''}`}
      id="projects"
      data-screen-index="3"
      data-screen-id="projects"
      data-route="/projects"
      data-title="PROJECTS // RAVANA TECH | Web, Software & AI"
    >
      <div className="projects__container bd-grid">
        {/* Gallery Controls Header */}
        <div className="gallery-header-controls">
          <div className="gallery-title-group">
            <span className="section-subtitle">SILICON VALLEY BENTO MATRIX</span>
            <h2 className="section-title">50 CONCEPTUAL BLUEPRINTS</h2>
          </div>

          {/* Search Bar */}
          <div className="gallery-search-wrap">
            <i className="bx bx-search gallery-search-icon" />
            <input
              type="text"
              id="gallery-search-input"
              className="gallery-search-input"
              placeholder="Search by industry, tech stack, or feature..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search Blueprints"
            />
            {searchQuery && (
              <button
                type="button"
                className="gallery-search-clear"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                aria-label="Clear Search"
              >
                <i className="bx bx-x" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters & Counter */}
        <div className="gallery-filter-bar">
          <div className="gallery-filter-tabs" id="project-filter-tabs">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === cat.id).length;
              const isSelected = currentCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`gallery-filter-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="gallery-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="gallery-result-counter" id="gallery-result-counter">
            BATCH {String(validPage).padStart(2, '0')}/{String(totalPages).padStart(2, '0')} // {filteredProjects.length} BLUEPRINTS ARCHIVED
          </div>
        </div>

        {/* Bento 1x3 Matrix Grid */}
        <div className="conceptual-gallery-grid" id="conceptual-gallery-grid">
          {filteredProjects.length === 0 ? (
            <div className="gallery-empty-state hud-panel">
              <i className="bx bx-search-alt" style={{ fontSize: '3rem', color: 'var(--rt-cyan)' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '1rem 0 0.5rem' }}>
                NO CONCEPT MODULES MATCHED
              </h3>
              <p style={{ color: 'var(--rt-text-soft)', fontSize: '0.9rem', maxWidth: '400px', marginBottom: '1.5rem' }}>
                No architecture blueprints match &quot;{searchQuery}&quot; in this sector.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentCategory('all');
                  setCurrentPage(1);
                }}
                className="button"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
              >
                RESET FILTERS &amp; SEARCH
              </button>
            </div>
          ) : (
            currentBatch.map((project) => {
              const globalIndex = projects.findIndex((p) => p.id === project.id);
              const previewUrl = `/conceptual projects/${encodeURIComponent(project.filename)}`;

              return (
                <div key={project.id} className="bento-card hud-panel" data-index={globalIndex}>
                  <div
                    className="bento-card__accent-bar"
                    style={{ backgroundColor: project.accentColor || 'var(--rt-cyan)' }}
                  />
                  <span className="hud-corner hud-corner-tl" />
                  <span className="hud-corner hud-corner-tr" />
                  <span className="hud-corner hud-corner-bl" />
                  <span className="hud-corner hud-corner-br" />

                  <div className="bento-card__header">
                    <div className="bento-card__cat-badge">
                      <i className={`bx ${project.icon || 'bx-cube-alt'}`} />
                      <span>{project.categoryLabel}</span>
                    </div>
                    <span className="bento-card__code">MODULE // {project.id.toUpperCase()}</span>
                  </div>

                  <h3 className="bento-card__title">{project.fullTitle || project.title}</h3>
                  <div className="bento-card__domain">{project.domain}</div>

                  <p className="bento-card__desc">{project.description}</p>

                  <div className="bento-card__tags">
                    {project.techStack?.map((tech, idx) => (
                      <span key={idx} className="bento-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="bento-card__actions">
                    <button
                      type="button"
                      className="button button-outline bento-btn-preview btn-card-preview"
                      onClick={() => onOpenPreview(globalIndex)}
                    >
                      <i className="bx bx-devices" />
                      LIVE SIMULATOR
                    </button>
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-link-external"
                      title="Open full page in new tab"
                      aria-label={`Open ${project.title} blueprint full page`}
                    >
                      <i className="bx bx-link-external" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="gallery-pagination-deck hud-panel">
            <span className="hud-corner hud-corner-tl" />
            <span className="hud-corner hud-corner-tr" />
            <span className="hud-corner hud-corner-bl" />
            <span className="hud-corner hud-corner-br" />

            <button
              type="button"
              className="gallery-nav-btn"
              disabled={validPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <i className="bx bx-chevron-left" />
              <span>PREV BATCH</span>
            </button>

            <div className="gallery-pagination-stats">
              <div className="gallery-batch-indicator">
                BATCH <span className="batch-num">{String(validPage).padStart(2, '0')}</span> /{' '}
                <span className="batch-total">{String(totalPages).padStart(2, '0')}</span>
              </div>
              <div className="gallery-batch-dots">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pNum = i + 1;
                  // Show max 10 dots centered on active page
                  if (totalPages > 10 && Math.abs(pNum - validPage) > 4 && pNum !== 1 && pNum !== totalPages) {
                    return null;
                  }
                  return (
                    <button
                      key={pNum}
                      type="button"
                      className={`gallery-batch-dot ${pNum === validPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pNum)}
                      title={`Batch ${pNum}`}
                      aria-label={`Go to Batch ${pNum}`}
                    />
                  );
                })}
              </div>
              <div className="gallery-batch-meta">
                SHOWING {startIndex + 1}–{endIndex} OF {filteredProjects.length} BLUEPRINTS // 3 CARDS PER VIEW
              </div>
            </div>

            <button
              type="button"
              className="gallery-nav-btn"
              disabled={validPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <span>NEXT BATCH</span>
              <i className="bx bx-chevron-right" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
