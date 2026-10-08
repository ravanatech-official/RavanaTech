// Ravana Tech - Silicon Valley Interactive Gallery Engine (Row 1 x Col 3 Bento Matrix)
(function() {
  'use strict';

  const ITEMS_PER_PAGE = 3; // 3 Bento Cards per viewport batch (Row 1 x Col 3)

  let projects = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let viewMode = 'grid'; // 'grid' or 'list'
  let currentPage = 1;
  let currentModalIndex = -1;
  let currentDevice = 'desktop'; // 'desktop', 'tablet', 'mobile'

  const CATEGORY_DEFINITIONS = [
    { id: 'all', label: 'ALL CONCEPTS' },
    { id: 'dining', label: 'DINING & BEVERAGE' },
    { id: 'luxury', label: 'LUXURY & FASHION' },
    { id: 'fitness', label: 'FITNESS & WELLNESS' },
    { id: 'creative', label: 'CREATIVE & STUDIOS' },
    { id: 'lifestyle', label: 'LIFESTYLE & RETAIL' }
  ];

  // Initialize
  function init() {
    projects = window.CONCEPTUAL_PROJECTS || [];
    if (!projects.length) {
      console.warn("No conceptual projects found in registry.");
      return;
    }

    renderCategoryTabs();
    setupEventListeners();
    renderGallery();
    checkUrlHash();
  }

  // Render Category Filter Tabs
  function renderCategoryTabs() {
    const tabsContainer = document.getElementById('project-filter-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = CATEGORY_DEFINITIONS.map(cat => {
      const count = cat.id === 'all' 
        ? projects.length 
        : projects.filter(p => p.category === cat.id).length;
      const isActive = cat.id === currentCategory;
      return `
        <button 
          type="button"
          class="gallery-filter-btn ${isActive ? 'active' : ''}" 
          data-category="${cat.id}">
          <span>${cat.label}</span>
          <span class="gallery-filter-count">${count}</span>
        </button>
      `;
    }).join('');

    // Attach click handlers
    tabsContainer.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        setCategory(cat);
      });
    });
  }

  function setCategory(category) {
    currentCategory = category;
    currentPage = 1; // Reset to first batch
    
    // Update active tab styles
    const buttons = document.querySelectorAll('.gallery-filter-btn');
    buttons.forEach(b => {
      if (b.getAttribute('data-category') === category) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    renderGallery();
  }

  // Filter & Search logic
  function getFilteredProjects() {
    return projects.filter(project => {
      const matchesCategory = currentCategory === 'all' || project.category === currentCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = (project.title || '').toLowerCase().includes(q) || (project.fullTitle || '').toLowerCase().includes(q);
      const inDomain = (project.domain || '').toLowerCase().includes(q);
      const inDesc = (project.description || '').toLowerCase().includes(q);
      const inCategory = (project.categoryLabel || '').toLowerCase().includes(q);
      const inTags = project.tags && project.tags.some(t => t.toLowerCase().includes(q));
      const inTech = project.techStack && project.techStack.some(t => t.toLowerCase().includes(q));

      return inTitle || inDomain || inDesc || inCategory || inTags || inTech;
    });
  }

  // Render the Gallery Grid / List + Row 1 x Col 3 Pagination
  function renderGallery() {
    const container = document.getElementById('conceptual-gallery-grid');
    const counterEl = document.getElementById('gallery-result-counter');
    const paginationBar = document.getElementById('gallery-pagination-bar');
    if (!container) return;

    const filtered = getFilteredProjects();
    const totalItems = filtered.length;
    const itemsPerPage = viewMode === 'list' ? 5 : ITEMS_PER_PAGE;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Clamp currentPage
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // Slice items for current page batch
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const visibleProjects = filtered.slice(startIndex, endIndex);

    // Update Counter
    if (counterEl) {
      counterEl.textContent = `BATCH ${String(currentPage).padStart(2, '0')}/${String(totalPages).padStart(2, '0')} // ${totalItems} BLUEPRINTS ARCHIVED`;
    }

    if (totalItems === 0) {
      container.innerHTML = `
        <div class="gallery-empty-state hud-panel">
          <i class='bx bx-search-alt' style="font-size: 3rem; color: var(--rt-cyan);"></i>
          <h3 style="font-size: 1.25rem; color: #fff; margin: 1rem 0 0.5rem;">NO CONCEPT MODULES MATCHED</h3>
          <p style="color: var(--rt-text-soft); font-size: 0.9rem; max-width: 400px; margin-bottom: 1.5rem;">
            No architecture blueprints match "${escapeHtml(searchQuery)}" in this sector.
          </p>
          <button type="button" id="reset-filter-btn" class="button" style="padding: 0.5rem 1.2rem; font-size: 0.8rem;">
            RESET FILTERS & SEARCH
          </button>
        </div>
      `;
      if (paginationBar) paginationBar.innerHTML = '';
      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          searchQuery = '';
          const input = document.getElementById('gallery-search-input');
          if (input) input.value = '';
          setCategory('all');
        });
      }
      return;
    }

    if (viewMode === 'list') {
      container.className = 'gallery-list-view';
      container.innerHTML = visibleProjects.map((project, idx) => {
        const projectIndex = projects.findIndex(p => p.id === project.id);
        const encodedUrl = `/conceptual projects/${encodeURIComponent(project.filename)}`;
        return `
          <div class="gallery-list-row hud-panel" data-index="${projectIndex}">
            <div class="gallery-list-col-info">
              <div class="gallery-list-icon" style="color: ${project.accentColor};">
                <i class='bx ${project.icon || 'bx-layer'}'></i>
              </div>
              <div>
                <div class="gallery-unboxed-meta">
                  <span>${escapeHtml(project.categoryLabel)}</span>
                  <span aria-hidden="true">·</span>
                  <span>PRODUCTION READY</span>
                </div>
                <h4 class="gallery-list-title">${escapeHtml(project.fullTitle || project.title)}</h4>
                <p class="gallery-list-domain">${escapeHtml(project.domain)}</p>
              </div>
            </div>

            <div class="gallery-list-col-actions">
              <button type="button" class="btn-preview-modal" data-index="${projectIndex}">
                <i class='bx bx-devices'></i>
                <span>PREVIEW</span>
              </button>
              <a href="${encodedUrl}" target="_blank" rel="noopener noreferrer" class="btn-launch-external">
                <span>LAUNCH</span>
                <i class='bx bx-link-external'></i>
              </a>
            </div>
          </div>
        `;
      }).join('');
    } else {
      // Row 1 x Col 3 Bento Grid View
      container.className = 'gallery-grid-view';
      container.innerHTML = visibleProjects.map((project, idx) => {
        const projectIndex = projects.findIndex(p => p.id === project.id);
        const encodedUrl = `/conceptual projects/${encodeURIComponent(project.filename)}`;
        const imageSrc = project.image || 'work1.jpg';
        
        return `
          <article class="gallery-card hud-panel" data-index="${projectIndex}" style="--project-accent: ${project.accentColor};">
            <span class="hud-corner hud-corner-tl"></span>
            <span class="hud-corner hud-corner-tr"></span>
            <span class="hud-corner hud-corner-bl"></span>
            <span class="hud-corner hud-corner-br"></span>

            <!-- Mini Browser Chrome Top Bar -->
            <div class="gallery-card__chrome-bar">
              <div class="gallery-chrome-dots">
                <span class="gallery-chrome-dot red"></span>
                <span class="gallery-chrome-dot yellow"></span>
                <span class="gallery-chrome-dot green"></span>
              </div>
              <span class="gallery-chrome-title">LIVE BLUEPRINT // MOD-${String(projectIndex + 1).padStart(2, '0')}</span>
            </div>

            <!-- Card Visual Banner (16:10 Bento Aspect) -->
            <div class="gallery-card__visual">
              <img src="${imageSrc}" alt="${escapeHtml(project.title)} Preview" class="gallery-card__img" loading="lazy" onerror="this.style.display='none';">
              <div class="gallery-card__gradient-overlay"></div>
              
              <!-- Floating Category Tag -->
              <div class="gallery-card__floating-bar">
                <div class="gallery-card__category-badge">
                  <i class='bx ${project.icon || 'bx-layer'}'></i>
                  <span>${escapeHtml(project.categoryLabel)}</span>
                </div>
                <span class="gallery-card__index-num">#${String(projectIndex + 1).padStart(2, '0')}</span>
              </div>

              <!-- Quick View Trigger Overlay -->
              <div class="gallery-card__hover-trigger" data-index="${projectIndex}">
                <button type="button" class="btn-quick-interactive" data-index="${projectIndex}">
                  <i class='bx bx-play-circle'></i>
                  <span>OPEN INTERACTIVE SIMULATOR</span>
                </button>
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="gallery-card__body">
              <div class="gallery-unboxed-meta">
                <span>${escapeHtml(project.categoryLabel)}</span>
                <span aria-hidden="true">·</span>
                <span>INTERACTIVE DEMO</span>
                <span aria-hidden="true">·</span>
                <span class="text-accent">${(project.techStack && project.techStack[0]) || 'HTML5/Tailwind'}</span>
              </div>

              <h3 class="gallery-card__title">${escapeHtml(project.title)}</h3>
              <p class="gallery-card__domain">${escapeHtml(project.domain)}</p>
              <p class="gallery-card__description">${escapeHtml(project.description)}</p>

              <!-- Tech Highlights -->
              <div class="gallery-card__tags">
                ${(project.techStack || []).map(t => `<span class="gallery-tag">${escapeHtml(t)}</span>`).join('')}
              </div>

              <!-- Actions -->
              <div class="gallery-card__actions">
                <button type="button" class="btn-card-preview" data-index="${projectIndex}" title="Interactive responsive preview">
                  <i class='bx bx-devices'></i>
                  <span>PREVIEW</span>
                </button>
                <a href="${encodedUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-launch" title="Launch standalone website in new tab">
                  <span>LAUNCH</span>
                  <i class='bx bx-link-external'></i>
                </a>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    // Attach click events for modals
    container.querySelectorAll('[data-index]').forEach(el => {
      const idx = parseInt(el.getAttribute('data-index'), 10);
      if (el.classList.contains('btn-card-preview') || el.classList.contains('btn-preview-modal') || el.classList.contains('btn-quick-interactive')) {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          openPreviewModal(idx);
        });
      }
    });

    // Render Cyber Pagination Bar
    renderPagination(totalPages, totalItems, startIndex + 1, endIndex);
  }

  // Render Cyber HUD Batch Navigator
  function renderPagination(totalPages, totalItems, startItemNum, endItemNum) {
    const paginationBar = document.getElementById('gallery-pagination-bar');
    if (!paginationBar) return;

    if (totalPages <= 1) {
      paginationBar.innerHTML = `
        <div class="gallery-pagination-deck hud-panel" style="justify-content: center;">
          <div class="gallery-batch-meta">ALL ${totalItems} BLUEPRINTS VISIBLE IN THIS FILTER</div>
        </div>
      `;
      return;
    }

    // Generate compact batch dots (clickable)
    let dotsHtml = '';
    const maxDots = 10;
    if (totalPages <= maxDots) {
      for (let p = 1; p <= totalPages; p++) {
        dotsHtml += `
          <button type="button" class="gallery-batch-dot ${p === currentPage ? 'active' : ''}" data-page="${p}" title="Batch ${p}"></button>
        `;
      }
    } else {
      // If many pages, show current +/- 2
      const startP = Math.max(1, currentPage - 2);
      const endP = Math.min(totalPages, currentPage + 2);
      for (let p = startP; p <= endP; p++) {
        dotsHtml += `
          <button type="button" class="gallery-batch-dot ${p === currentPage ? 'active' : ''}" data-page="${p}" title="Batch ${p}"></button>
        `;
      }
    }

    paginationBar.innerHTML = `
      <div class="gallery-pagination-deck hud-panel">
        <span class="hud-corner hud-corner-tl"></span>
        <span class="hud-corner hud-corner-tr"></span>
        <span class="hud-corner hud-corner-bl"></span>
        <span class="hud-corner hud-corner-br"></span>

        <!-- Prev Batch Button -->
        <button type="button" class="gallery-nav-btn" id="gallery-prev-batch-btn" ${currentPage === 1 ? 'disabled' : ''}>
          <i class='bx bx-chevron-left'></i>
          <span>PREV BATCH</span>
        </button>

        <!-- Stats & Dots -->
        <div class="gallery-pagination-stats">
          <div class="gallery-batch-indicator">
            BATCH <span class="batch-num">${String(currentPage).padStart(2, '0')}</span> / <span class="batch-total">${String(totalPages).padStart(2, '0')}</span>
          </div>
          <div class="gallery-batch-dots">
            ${dotsHtml}
          </div>
          <div class="gallery-batch-meta">
            DISPATCHING ${startItemNum}–${endItemNum} OF ${totalItems} MODULES // 3 CARDS PER VIEW
          </div>
        </div>

        <!-- Next Batch Button -->
        <button type="button" class="gallery-nav-btn" id="gallery-next-batch-btn" ${currentPage === totalPages ? 'disabled' : ''}>
          <span>NEXT BATCH</span>
          <i class='bx bx-chevron-right'></i>
        </button>
      </div>
    `;

    // Attach pagination events
    const prevBtn = document.getElementById('gallery-prev-batch-btn');
    const nextBtn = document.getElementById('gallery-next-batch-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderGallery();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderGallery();
        }
      });
    }

    paginationBar.querySelectorAll('.gallery-batch-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const p = parseInt(dot.getAttribute('data-page'), 10);
        if (p && p !== currentPage) {
          currentPage = p;
          renderGallery();
        }
      });
    });
  }

  // Interactive Lightbox Modal
  function openPreviewModal(index) {
    if (index < 0 || index >= projects.length) return;
    currentModalIndex = index;
    const project = projects[index];

    const modal = document.getElementById('gallery-preview-modal');
    const iframe = document.getElementById('preview-modal-iframe');
    const titleEl = document.getElementById('modal-project-title');
    const categoryEl = document.getElementById('modal-project-category');
    const domainEl = document.getElementById('modal-project-domain');
    const launchLink = document.getElementById('modal-launch-link');
    const counterEl = document.getElementById('modal-index-counter');
    const loader = document.getElementById('modal-iframe-loader');

    if (!modal || !iframe) return;

    const encodedUrl = `/conceptual projects/${encodeURIComponent(project.filename)}`;

    if (titleEl) titleEl.textContent = project.fullTitle || project.title;
    if (categoryEl) categoryEl.textContent = project.categoryLabel;
    if (domainEl) domainEl.textContent = project.domain;
    if (launchLink) launchLink.href = encodedUrl;
    if (counterEl) counterEl.textContent = `${index + 1} / ${projects.length}`;

    // Show loading state
    if (loader) loader.style.display = 'flex';
    iframe.src = encodedUrl;

    iframe.onload = () => {
      if (loader) loader.style.display = 'none';
    };

    // Set device mode
    setDeviceViewport(currentDevice);

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Update URL hash without scroll
    history.replaceState(null, null, `#preview=${project.id}`);
  }

  function closePreviewModal() {
    const modal = document.getElementById('gallery-preview-modal');
    const iframe = document.getElementById('preview-modal-iframe');
    if (!modal) return;

    modal.classList.remove('is-open');
    if (iframe) iframe.src = 'about:blank';
    document.body.style.overflow = '';
    currentModalIndex = -1;

    // Clean hash
    if (window.location.hash.startsWith('#preview=')) {
      history.replaceState(null, null, window.location.pathname);
    }
  }

  function navigateModal(direction) {
    if (currentModalIndex === -1) return;
    let nextIndex = currentModalIndex + direction;
    if (nextIndex < 0) nextIndex = projects.length - 1;
    if (nextIndex >= projects.length) nextIndex = 0;
    openPreviewModal(nextIndex);
  }

  function setDeviceViewport(device) {
    currentDevice = device;
    const frameWrap = document.getElementById('preview-iframe-wrapper');
    const deviceButtons = document.querySelectorAll('.device-toggle-btn');

    if (frameWrap) {
      frameWrap.setAttribute('data-device', device);
    }

    deviceButtons.forEach(btn => {
      if (btn.getAttribute('data-device') === device) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('gallery-search-input');
    const clearBtn = document.getElementById('gallery-search-clear');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        if (clearBtn) {
          clearBtn.style.display = searchQuery ? 'inline-flex' : 'none';
        }
        renderGallery();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        currentPage = 1;
        clearBtn.style.display = 'none';
        renderGallery();
      });
    }

    // View mode switch
    const gridBtn = document.getElementById('view-mode-grid');
    const listBtn = document.getElementById('view-mode-list');
    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => {
        viewMode = 'grid';
        currentPage = 1;
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        renderGallery();
      });
      listBtn.addEventListener('click', () => {
        viewMode = 'list';
        currentPage = 1;
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        renderGallery();
      });
    }

    // Modal controls
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalPrevBtn = document.getElementById('modal-prev-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');
    const modalCopyBtn = document.getElementById('modal-copy-btn');
    const modalRefreshBtn = document.getElementById('modal-refresh-btn');

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePreviewModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closePreviewModal);
    if (modalPrevBtn) modalPrevBtn.addEventListener('click', () => navigateModal(-1));
    if (modalNextBtn) modalNextBtn.addEventListener('click', () => navigateModal(1));

    if (modalRefreshBtn) {
      modalRefreshBtn.addEventListener('click', () => {
        const iframe = document.getElementById('preview-modal-iframe');
        if (iframe && currentModalIndex !== -1) {
          const loader = document.getElementById('modal-iframe-loader');
          if (loader) loader.style.display = 'flex';
          iframe.src = iframe.src;
        }
      });
    }

    if (modalCopyBtn) {
      modalCopyBtn.addEventListener('click', () => {
        if (currentModalIndex !== -1) {
          const p = projects[currentModalIndex];
          const fullUrl = window.location.origin + `/conceptual projects/${encodeURIComponent(p.filename)}`;
          navigator.clipboard.writeText(fullUrl).then(() => {
            const originalText = modalCopyBtn.innerHTML;
            modalCopyBtn.innerHTML = "<i class='bx bx-check'></i> <span>COPIED!</span>";
            setTimeout(() => {
              modalCopyBtn.innerHTML = originalText;
            }, 1800);
          });
        }
      });
    }

    // Device switchers in modal
    document.querySelectorAll('.device-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dev = btn.getAttribute('data-device');
        setDeviceViewport(dev);
      });
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('gallery-preview-modal');
      const isModalOpen = modal && modal.classList.contains('is-open');

      if (isModalOpen) {
        if (e.key === 'Escape') {
          closePreviewModal();
        } else if (e.key === 'ArrowLeft') {
          navigateModal(-1);
        } else if (e.key === 'ArrowRight') {
          navigateModal(1);
        }
      } else {
        // Arrow navigation for batches when modal is not open
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
        const projectsSec = document.getElementById('projects');
        if (!projectsSec) return;
        const rect = projectsSec.getBoundingClientRect();
        // If projects section is near viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const filtered = getFilteredProjects();
          const itemsPerPage = viewMode === 'list' ? 5 : ITEMS_PER_PAGE;
          const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
          if (e.key === 'ArrowLeft' && currentPage > 1) {
            currentPage--;
            renderGallery();
          } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            currentPage++;
            renderGallery();
          }
        }
      }
    });
  }

  // Check URL hash for direct preview
  function checkUrlHash() {
    if (window.location.hash.startsWith('#preview=')) {
      const targetId = window.location.hash.replace('#preview=', '').trim();
      const idx = projects.findIndex(p => p.id === targetId);
      if (idx !== -1) {
        setTimeout(() => openPreviewModal(idx), 350);
      }
    }
  }

  // Helper
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
