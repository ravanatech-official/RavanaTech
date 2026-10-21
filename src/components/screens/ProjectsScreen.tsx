import React, { useState, useMemo } from 'react';
import { CONCEPTUAL_PROJECTS, ConceptualProject } from '../../data/projectsData';

interface ProjectsScreenProps {
  onOpenPreview: (project: ConceptualProject) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'ALL CONCEPTS' },
  { id: 'dining', label: 'DINING & BEVERAGE' },
  { id: 'luxury', label: 'LUXURY & FASHION' },
  { id: 'fitness', label: 'FITNESS & WELLNESS' },
  { id: 'creative', label: 'CREATIVE & STUDIOS' },
  { id: 'lifestyle', label: 'LIFESTYLE & RETAIL' }
];

const ITEMS_PER_PAGE = 6;

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onOpenPreview }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Instant in-memory filtering with beastly speed
  const filteredProjects = useMemo(() => {
    return CONCEPTUAL_PROJECTS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        p.fullTitle.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <section className="projects section deck-screen deck-screen-active" id="projects">
      <div className="bd-grid">
        <h2 className="section-title">PROJECT SHOWCASE // 50 READY BLUEPRINTS</h2>

        {/* Gallery Controls Station */}
        <div className="gallery-controls-station">
          {/* Filter Tabs */}
          <div className="gallery-filter-tabs" id="project-filter-tabs" role="tablist">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all'
                ? CONCEPTUAL_PROJECTS.length
                : CONCEPTUAL_PROJECTS.filter((p) => p.category === cat.id).length;
              const isActive = cat.id === selectedCategory;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`gallery-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="gallery-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search & View Mode Toolbar */}
          <div className="gallery-toolbar-row">
            <div className="gallery-search-wrap">
              <i className="bx bx-search gallery-search-icon"></i>
              <input
                type="text"
                className="gallery-search-input"
                placeholder="SEARCH 50 CONCEPTS BY KEYWORD, DOMAIN OR TECH..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="gallery-search-clear"
                  onClick={() => handleSearchChange('')}
                  title="Clear search"
                >
                  <i className="bx bx-x"></i>
                </button>
              )}
            </div>

            <div className="gallery-toolbar-right">
              <div className="gallery-view-switcher">
                <button
                  type="button"
                  className={`gallery-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Bento Grid View"
                >
                  <i className="bx bx-grid-alt"></i>
                </button>
                <button
                  type="button"
                  className={`gallery-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Terminal List View"
                >
                  <i className="bx bx-list-ul"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Container */}
      <div className="bd-grid">
        {filteredProjects.length === 0 ? (
          <div className="hud-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <i className="bx bx-search-alt" style={{ fontSize: '3rem', color: 'var(--rt-cyan-bright)', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem' }}>NO BLUEPRINTS MATCHING "{searchQuery.toUpperCase()}"</h3>
            <p style={{ color: 'var(--rt-text-soft)' }}>Try adjusting your search query or switching categories.</p>
            <button
              type="button"
              className="button button-outline button-small"
              style={{ marginTop: '1.25rem' }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              RESET FILTERS
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="gallery-grid-view">
            {paginatedProjects.map((p) => {
              const projectUrl = `/conceptual-projects/${encodeURIComponent(p.filename)}`;

              return (
                <div key={p.id} className="gallery-card hud-panel">
                  <span className="hud-corner hud-corner-tl"></span>
                  <span className="hud-corner hud-corner-tr"></span>
                  <span className="hud-corner hud-corner-bl"></span>
                  <span className="hud-corner hud-corner-br"></span>

                  <div className="gallery-card-thumb-wrap">
                    <img
                      src={`/${p.image}`}
                      alt={p.fullTitle}
                      className="gallery-card-thumb"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/img/work1.jpg';
                      }}
                    />
                    <div className="gallery-card-badge" style={{ borderColor: p.accentColor }}>
                      <i className={`bx ${p.icon}`} style={{ color: p.accentColor }}></i>
                      <span>{p.categoryLabel}</span>
                    </div>
                  </div>

                  <div className="gallery-card-body">
                    <h3 className="gallery-card-title">{p.title}</h3>
                    <div className="gallery-card-domain cyan-text">{p.domain}</div>
                    <p className="gallery-card-desc">{p.description}</p>

                    <div className="gallery-card-tags">
                      {p.techStack.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="gallery-card-actions">
                      <button
                        type="button"
                        className="button button-primary button-small"
                        onClick={() => onOpenPreview(p)}
                      >
                        <i className="bx bx-devices"></i>
                        <span>INTERACTIVE PREVIEW</span>
                      </button>

                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-outline button-small"
                        title="Open in new tab"
                      >
                        <i className="bx bx-link-external"></i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Terminal List View */
          <div className="hud-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
            <table className="lab-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>PROJECT TITLE</th>
                  <th>SECTOR</th>
                  <th>DOMAIN ARCHITECTURE</th>
                  <th>TECH STACK</th>
                  <th>SIMULATION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects.map((p) => {
                  const projectUrl = `/conceptual-projects/${encodeURIComponent(p.filename)}`;
                  return (
                    <tr key={p.id}>
                      <td>
                        <strong className="cyan-text">{p.title}</strong>
                      </td>
                      <td>
                        <span className="tech-pill">{p.categoryLabel}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                        {p.domain}
                      </td>
                      <td>
                        {p.techStack.join(', ')}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            type="button"
                            className="button button-outline button-small"
                            onClick={() => onOpenPreview(p)}
                            style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            PREVIEW
                          </button>
                          <a
                            href={projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-outline button-small"
                            style={{ padding: '0.2rem 0.5rem' }}
                          >
                            <i className="bx bx-link-external"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination bar */}
        {totalPages > 1 && (
          <div className="gallery-pagination-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="button button-outline button-small"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <i className="bx bx-chevron-left"></i>
              <span>PREV BATCH</span>
            </button>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--rt-text-soft)' }}>
              BATCH <span className="cyan-text">{currentPage}</span> / {totalPages} ({filteredProjects.length} CONCEPTS)
            </span>

            <button
              type="button"
              className="button button-outline button-small"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <span>NEXT BATCH</span>
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
