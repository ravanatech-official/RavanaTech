/*==================== MENU SHOW / HIDE ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            const icon = toggle.querySelector('i');
            if (icon) {
                if (nav.classList.contains('show')) {
                    icon.className = 'bx bx-x';
                } else {
                    icon.className = 'bx bx-menu';
                }
            }
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU ON LINK CLICK ====================*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    if (navMenu) {
        navMenu.classList.remove('show');
    }
    if (toggle) {
        const icon = toggle.querySelector('i');
        if (icon) icon.className = 'bx bx-menu';
    }
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*==================== ZERO-SCROLL DECK COMMAND ENGINE ====================*/
const SCREENS = [
    { id: 'home', route: '/', label: 'HOME', title: 'RAVANA TECH | Web, Software & AI' },
    { id: 'about', route: '/about', label: 'ABOUT', title: 'ABOUT // RAVANA TECH | Web, Software & AI' },
    { id: 'systems', route: '/systems', label: 'SYSTEMS', title: 'SERVICES // RAVANA TECH | Web, Software & AI' },
    { id: 'projects', route: '/projects', label: 'PROJECTS', title: 'PROJECTS // RAVANA TECH | Web, Software & AI' },
    { id: 'contact', route: '/contact', label: 'CONTACT', title: 'CONTACT // RAVANA TECH | Web, Software & AI' },
    { id: 'ai-lab', route: '/ai-lab', label: 'AI LAB', title: 'AI & AUTOMATION LAB // RAVANA TECH | Shanthapriya Silva' }
];

let currentScreenIndex = 0;
let isSwitching = false;

function getScreenIndex(target) {
    if (typeof target === 'number') {
        return Math.max(0, Math.min(SCREENS.length - 1, target));
    }
    const clean = String(target || '').toLowerCase().replace(/^[/#]+|[/#]+$/g, '').trim();
    if (!clean || clean === 'home') return 0;
    const found = SCREENS.findIndex(s => s.id === clean || s.route === `/${clean}`);
    return found !== -1 ? found : 0;
}

function switchScreen(target, updateHistory = true) {
    const nextIndex = getScreenIndex(target);
    const screens = document.querySelectorAll('.deck-screen');
    if (!screens.length) return;

    currentScreenIndex = nextIndex;
    const nextScreen = SCREENS[nextIndex];

    // 1. Activate Target Deck Screen strictly by matching ID
    screens.forEach((screen) => {
        if (screen.id === nextScreen.id) {
            screen.classList.add('deck-screen-active');
            screen.scrollTop = 0;
        } else {
            screen.classList.remove('deck-screen-active');
        }
    });

    // 2. Update Header Navigation Links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        const targetAttr = link.getAttribute('data-target') || link.getAttribute('href');
        if (getScreenIndex(targetAttr) === nextIndex) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });

    // 3. Update Deck Console Pills
    const pills = document.querySelectorAll('.deck-pill');
    pills.forEach((pill, idx) => {
        if (idx === nextIndex) {
            pill.classList.add('active');
            pill.setAttribute('aria-selected', 'true');
        } else {
            pill.classList.remove('active');
            pill.setAttribute('aria-selected', 'false');
        }
    });

    // 4. Update Prev / Next Buttons State (Linear Deck strictly ends at Contact index 4)
    const prevBtn = document.getElementById('deck-prev-btn');
    const nextBtn = document.getElementById('deck-next-btn');
    if (nextScreen.id === 'ai-lab') {
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = true; // AI Lab is a dedicated terminal
    } else {
        if (prevBtn) prevBtn.disabled = nextIndex === 0;
        if (nextBtn) nextBtn.disabled = nextIndex >= 4; // Contact (4) is the end of linear portfolio
    }

    // 5. Update Browser URL and History
    if (updateHistory) {
        const targetUrl = nextScreen.route;
        if (window.location.pathname !== targetUrl) {
            window.history.pushState({ screenIndex: nextIndex, screenId: nextScreen.id }, '', targetUrl);
        }
    }

    // 6. Update Document Title
    document.title = nextScreen.title;

    // 7. Dispatch Screen Change Event for Subsystem Memory Optimization
    window.dispatchEvent(new CustomEvent('screenchange', { detail: { screenId: nextScreen.id, index: nextIndex } }));

    // 8. Close Mobile Menu if open
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        if (navToggle) {
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'bx bx-menu';
        }
    }
}

// Global Click Delegation for navigation triggers
document.addEventListener('click', (e) => {
    // Explicit direct interception for AI LAB to guarantee 100% instant execution
    const aiLabTrigger = e.target.closest('#nav-link-ai-lab, [data-target="ai-lab"]');
    if (aiLabTrigger) {
        e.preventDefault();
        switchScreen('ai-lab', true);
        return;
    }

    // Direct Return from AI LAB back to Main Portfolio
    const returnTrigger = e.target.closest('#btn-lab-back-portfolio');
    if (returnTrigger) {
        e.preventDefault();
        switchScreen('contact', true);
        return;
    }

    const trigger = e.target.closest('[data-target], .deck-pill, .nav__link');
    if (!trigger) return;

    if (trigger.getAttribute('target') === '_blank') return;
    const href = trigger.getAttribute('href');
    if (href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('.html'))) return;

    const targetVal = trigger.getAttribute('data-target') || trigger.getAttribute('data-screen') || href;
    if (targetVal) {
        e.preventDefault();
        switchScreen(targetVal, true);
    }
});

// Deck Prev / Next Button Listeners
const prevBtn = document.getElementById('deck-prev-btn');
const nextBtn = document.getElementById('deck-next-btn');
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentScreenIndex > 0) switchScreen(currentScreenIndex - 1, true);
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentScreenIndex < SCREENS.length - 1) switchScreen(currentScreenIndex + 1, true);
    });
}

// Browser Back / Forward Support
window.addEventListener('popstate', (e) => {
    if (e.state && typeof e.state.screenIndex === 'number') {
        switchScreen(e.state.screenIndex, false);
    } else {
        switchScreen(window.location.pathname, false);
    }
});

// Keyboard Hotkey Navigation (1-5 for portfolio screens, AI Lab strictly standalone)
window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

    const modal = document.getElementById('gallery-preview-modal');
    if (modal && modal.classList.contains('active')) return;

    const cvEditorModal = document.getElementById('cv-real-editor-modal');
    if (cvEditorModal && cvEditorModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            cvEditorModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        return;
    }

    const activeScreenEl = document.querySelector('.deck-screen.deck-screen-active');
    const isAiLabActive = activeScreenEl && activeScreenEl.id === 'ai-lab';

    if (isAiLabActive) {
        // Inside AI Lab, Escape returns to Contact screen
        if (e.key === 'Escape') {
            e.preventDefault();
            switchScreen('contact', true);
        }
        return; // Left/Right arrows do NOT throw user out of AI Lab
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        // Strictly stop at Contact (index 4). Never scroll or step into AI Lab!
        if (currentScreenIndex < 4) switchScreen(currentScreenIndex + 1, true);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentScreenIndex > 0 && currentScreenIndex <= 4) switchScreen(currentScreenIndex - 1, true);
    } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        switchScreen(parseInt(e.key, 10) - 1, true);
    } else if (e.key === '6' || e.key.toLowerCase() === 'l') {
        e.preventDefault();
        switchScreen('ai-lab', true);
    }
});

// Debounced Mouse Wheel Navigation (Zero scrolling into AI Lab; stops at Contact)
window.addEventListener('wheel', (e) => {
    const modal = document.getElementById('gallery-preview-modal');
    if (modal && modal.classList.contains('active')) return;

    const cvEditorModal = document.getElementById('cv-real-editor-modal');
    if (cvEditorModal && cvEditorModal.classList.contains('active')) return;

    const activeScreenEl = document.querySelector('.deck-screen.deck-screen-active');
    if (!activeScreenEl) return;

    // IF INSIDE AI-LAB: Never switch screens on mouse wheel! Scroll its own content smoothly.
    if (activeScreenEl.id === 'ai-lab') return;

    const atTop = activeScreenEl.scrollTop <= 2;
    const atBottom = activeScreenEl.scrollTop + activeScreenEl.clientHeight >= activeScreenEl.scrollHeight - 2;

    if (e.deltaY > 60 && atBottom) {
        if (isSwitching) return;
        // Strictly stop at Contact (index 4). NEVER scroll into AI Lab!
        if (currentScreenIndex < 4) {
            isSwitching = true;
            switchScreen(currentScreenIndex + 1, true);
            setTimeout(() => { isSwitching = false; }, 450);
        }
    } else if (e.deltaY < -60 && atTop) {
        if (isSwitching) return;
        if (currentScreenIndex > 0 && currentScreenIndex <= 4) {
            isSwitching = true;
            switchScreen(currentScreenIndex - 1, true);
            setTimeout(() => { isSwitching = false; }, 450);
        }
    }
}, { passive: true });

// Mobile Touch Swipe Navigation (Strictly stops at Contact; AI Lab is button-only)
let touchStartX = 0;
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener('touchend', (e) => {
    const modal = document.getElementById('gallery-preview-modal');
    if (modal && modal.classList.contains('active')) return;

    const cvEditorModal = document.getElementById('cv-real-editor-modal');
    if (cvEditorModal && cvEditorModal.classList.contains('active')) return;

    const activeScreenEl = document.querySelector('.deck-screen.deck-screen-active');
    if (!activeScreenEl || activeScreenEl.id === 'ai-lab') return;

    if (e.changedTouches && e.changedTouches.length) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
            // Strictly stop at Contact (index 4). Never swipe into AI Lab!
            if (diffX < 0 && currentScreenIndex < 4) {
                switchScreen(currentScreenIndex + 1, true);
            } else if (diffX > 0 && currentScreenIndex > 0 && currentScreenIndex <= 4) {
                switchScreen(currentScreenIndex - 1, true);
            }
        }
    }
}, { passive: true });

// Initialize initial screen based on URL on load
const initDeckRoute = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectedPath = urlParams.get('p');
    if (redirectedPath) {
        const cleanPath = '/' + redirectedPath.replace(/^[/]+/, '');
        window.history.replaceState(null, '', cleanPath);
        switchScreen(cleanPath, false);
        return;
    }
    const target = window.location.hash || window.location.pathname;
    switchScreen(target, false);
};

// Real-Time Dynamic Project Counter
const updateDynamicProjectCount = async () => {
    const statEl = document.getElementById('stats-projects-count');
    if (!statEl) return;

    try {
        const res = await fetch('/api/conceptual-projects');
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data.count === 'number' && data.count > 0) {
                const countFormatted = data.count < 10 ? `0${data.count}` : `${data.count}`;
                statEl.textContent = `${countFormatted}+`;
                return;
            }
        }
    } catch (e) {
        console.warn('[PROJECT STATS] API fetch deferred:', e);
    }

    if (window.CONCEPTUAL_PROJECTS && window.CONCEPTUAL_PROJECTS.length > 0) {
        const localCount = window.CONCEPTUAL_PROJECTS.length;
        const countFormatted = localCount < 10 ? `0${localCount}` : `${localCount}`;
        statEl.textContent = `${countFormatted}+`;
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDeckRoute();
        updateDynamicProjectCount();
    });
} else {
    initDeckRoute();
    updateDynamicProjectCount();
}

/*==================== CONTACT FORM DISPATCH ====================*/
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('sender-name').value.trim();
        const email = document.getElementById('sender-email').value.trim();
        const system = document.getElementById('sender-system').value;
        const message = document.getElementById('sender-message').value.trim();
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        if (!name || !email || !message) {
            formFeedback.className = 'form__status-msg error';
            formFeedback.textContent = 'Please fill out all required fields (Name, Email, and Message).';
            return;
        }

        // Animated sending state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Submitting Your Inquiry...";

        // 1. Submit to Backend REST API
        try {
            fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, service: system, message, source: 'website_contact_form' })
            }).catch(e => console.warn('[API Inquiry] Deferred/Background error:', e));
        } catch (apiErr) {
            console.warn('[API Inquiry] Error:', apiErr);
        }

        // 2. Submit to Firestore if available
        let firestoreDocId = null;
        if (typeof window.saveInquiryToFirestore === 'function') {
            try {
                const res = await window.saveInquiryToFirestore({ name, email, system, message });
                if (res && res.success && res.id) {
                    firestoreDocId = res.id;
                }
            } catch (err) {
                console.warn("[RAVANA TECH] Firestore write deferred:", err);
            }
        }

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "<i class='bx bx-check-circle'></i> Inquiry Submitted";

            formFeedback.className = 'form__status-msg success';
            const recordNum = firestoreDocId ? `Reference ID: #${firestoreDocId.substring(0, 8).toUpperCase()}<br>` : '';
            formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong><br>${recordNum}Your project inquiry for <em>${system}</em> has been received. Our team will review your requirements and respond within 60 minutes.`;

            // Prepare instant WhatsApp Handoff CTA
            const waText = encodeURIComponent(`Hello Ravana Tech! I just sent a project inquiry from your website.\n\nName: ${name}\nService: ${system}\nEmail: ${email}\n\nProject Scope:\n${message}`);
            const waUrl = `https://wa.me/94788470610?text=${waText}`;

            const actionsWrap = document.createElement('div');
            actionsWrap.style.display = 'flex';
            actionsWrap.style.flexWrap = 'wrap';
            actionsWrap.style.gap = '0.5rem';
            actionsWrap.style.marginTop = '0.75rem';

            const waLink = document.createElement('a');
            waLink.href = waUrl;
            waLink.target = '_blank';
            waLink.rel = 'noopener noreferrer';
            waLink.style.display = 'inline-flex';
            waLink.style.alignItems = 'center';
            waLink.style.gap = '0.4rem';
            waLink.style.padding = '0.45rem 0.85rem';
            waLink.style.background = '#25D366';
            waLink.style.borderRadius = '4px';
            waLink.style.color = '#000';
            waLink.style.fontWeight = '600';
            waLink.style.fontSize = '0.78rem';
            waLink.style.fontFamily = 'var(--font-hud)';
            waLink.style.textDecoration = 'none';
            waLink.innerHTML = "<i class='bx bxl-whatsapp' style='font-size:1rem;'></i> CHAT WITH US ON WHATSAPP";
            actionsWrap.appendChild(waLink);

            formFeedback.appendChild(actionsWrap);
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
            }, 6000);
        }, 900);
    });
}

/*==================== CYBER MATRIX DIGITAL CODE RAIN ENGINE (OPTIMIZED) ====================*/
(function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];
    let animationFrameId = null;
    let lastRenderTime = 0;
    let isRunning = false;
    let isHomeScreenActive = (currentScreenIndex === 0);

    const FPS = 28; // Optimized cadence for silky smooth visual cyber effect with ultra-low CPU/RAM footprint
    const FRAME_INTERVAL = 1000 / FPS;

    // Characters: futuristic mix of cyber glyphs, binary, hex, and tech characters
    const CHARACTERS = '010101RAVANATECHｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜXYZ<>{}/*#$';
    const FONT_SIZE = 14;

    function resize() {
        const parent = canvas.parentElement;
        if (!parent) return;

        // Cap DPR to 1 for background ambient canvas to save up to 75% GPU and RAM buffer memory
        width = parent.clientWidth || window.innerWidth;
        height = parent.clientHeight || window.innerHeight;

        canvas.width = Math.floor(width);
        canvas.height = Math.floor(height);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        columns = Math.floor(width / FONT_SIZE);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -40);
        }

        ctx.fillStyle = '#01060D';
        ctx.fillRect(0, 0, width, height);
    }

    function render(currentTime) {
        if (!isRunning) return;

        animationFrameId = requestAnimationFrame(render);

        if (document.hidden || !isHomeScreenActive) return;

        const delta = currentTime - lastRenderTime;
        if (delta < FRAME_INTERVAL) return;
        lastRenderTime = currentTime - (delta % FRAME_INTERVAL);

        // Smooth translucent fade for elegant streaming trails
        ctx.fillStyle = 'rgba(1, 6, 13, 0.09)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${FONT_SIZE}px "Courier New", monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
            const x = i * FONT_SIZE;
            const y = drops[i] * FONT_SIZE;

            if (y > 0 && y < height + FONT_SIZE) {
                // High-performance direct glyph rendering without shadowBlur memory thrashing
                ctx.fillStyle = '#ffffff';
                ctx.fillText(char, x, y);

                // Trailing character color
                ctx.fillStyle = '#00e1ff';
            }

            // Loop reset with staggered random intervals
            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            } else {
                drops[i]++;
            }
        }
    }

    function startAnimation() {
        if (isRunning) return;
        isRunning = true;
        lastRenderTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
    }

    function stopAnimation() {
        if (!isRunning) return;
        isRunning = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    // Pause when switching away from Home screen; resume when returning
    window.addEventListener('screenchange', (e) => {
        const isHome = e.detail && e.detail.screenId === 'home';
        isHomeScreenActive = isHome;
        if (isHome && !document.hidden) {
            startAnimation();
        } else {
            stopAnimation();
        }
    });

    // Pause when tab is inactive / hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAnimation();
        } else if (isHomeScreenActive) {
            startAnimation();
        }
    });

    window.addEventListener('resize', () => {
        resize();
    }, { passive: true });

    resize();
    if (isHomeScreenActive && !document.hidden) {
        startAnimation();
    }
})();

/*==================== INSTANT ZERO-LATENCY PREFETCHER (MEMORY-SAFE) ====================*/
(function initInstantPrefetch() {
    const prefetchedUrls = new Set();
    const ALLOWED_PREFETCH = new Set([
        '/',
        '/home',
        '/about',
        '/systems',
        '/projects',
        '/ai-lab',
        '/contact',
        '/services.html',
        '/projects.html'
    ]);

    function prefetchUrl(url) {
        if (!url || prefetchedUrls.has(url)) return;
        // Strictly prevent prefetching heavy multi-megabyte project files into memory
        if (!ALLOWED_PREFETCH.has(url)) return;

        try {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            link.as = 'document';
            document.head.appendChild(link);
            prefetchedUrls.add(url);
        } catch (e) {}
    }

    // Prefetch only on intentional navigation cues
    document.addEventListener('mouseover', (e) => {
        const anchor = e.target.closest('a');
        if (anchor && anchor.origin === window.location.origin) {
            const path = anchor.getAttribute('href');
            if (path && ALLOWED_PREFETCH.has(path)) {
                prefetchUrl(path);
            }
        }
    }, { passive: true });
})();

/* ==========================================================================
   AI & AUTOMATION LAB // INTERACTIVE LOGIC & SIMULATORS
   ========================================================================== */
(function initAiLabEngine() {
    // 1. LAB TABS NAVIGATION
    const tabBtns = document.querySelectorAll('.lab-tab-btn');
    const panels = document.querySelectorAll('.lab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-lab-tab');
            if (!targetId) return;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            panels.forEach(p => {
                if (p.id === `lab-panel-${targetId}`) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
        });
    });

    // 2. HUD TOAST NOTIFICATION UTILITY
    function showLabToast(message, icon = 'bx-check-circle') {
        const existing = document.querySelector('.lab-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'lab-toast';
        toast.innerHTML = `<i class='bx ${icon}'></i><span>${message}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // 3. COPY UTILITY FOR METADATA FIELDS
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.meta-copy-icon');
        if (!copyBtn) return;
        const targetId = copyBtn.getAttribute('data-copy');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            const text = targetEl.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                showLabToast(`Copied to Clipboard: ${text}`);
            }).catch(() => {
                showLabToast('Text copied to clipboard!');
            });
        }
    });

    // ==================== TAB 1: AI DOCUMENT CONTROLLER SIMULATOR ====================
    const DOC_SAMPLES = {
        submittal: {
            id: 'SUB-STR-2026-0442',
            title: 'Architectural Facade Glazing & Structural Framing Submittal',
            discipline: 'Structural & Architectural',
            authority: 'Al-Farooq Façade LLC // Consultant: Dar Al-Handasah',
            status: 'REV 03 // CODE 1 APPROVED',
            date: '2026-10-18',
            filename: 'RT-EDMS_SUB_STR_0442_REV03_APP.pdf',
            cloudPath: '/Google_Cloud/EDMS/2026/Structural/Submittals/Approved/',
            confidence: '99.98%',
            previewHtml: `
                <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
                    <span style="color:var(--rt-cyan-bright); font-weight:700;">TRANSMITTAL REF: SUB-STR-2026-0442</span>
                    <span style="color:#00FF88;">CODE 1 // NO COMMENTS</span>
                </div>
                <div style="font-size:0.75rem; line-height:1.5;">
                    <div><strong>PROJECT:</strong> DUBAI MARINA HIGH-RISE TOWER C</div>
                    <div><strong>PACKAGE:</strong> STRUCTURAL FACADE GLAZING & EXTRUSIONS</div>
                    <div><strong>DRAWING NO:</strong> DWG-STR-4091-SEC-04 (REV C)</div>
                    <div><strong>SPECIFICATION REF:</strong> 08 44 00 - CURTAIN WALL</div>
                    <div style="margin-top:6px; color:#8DBFD8; font-style:italic;">
                        &gt;&gt; Consultant Review: "Approved as submitted. Contractor authorized to proceed with fabrication."
                    </div>
                </div>
            `
        },
        invoice: {
            id: 'INV-DXB-2026-9042',
            title: 'Commercial Tax Invoice & Material Delivery Note',
            discipline: 'Commercial & Procurement',
            authority: 'Emirates Cement & Steel Corporation',
            status: 'ORIGINAL // PO-90118 MATCHED (100%)',
            date: '2026-10-18',
            filename: 'RT-COMM_INV_DXB_9042_PO90118.pdf',
            cloudPath: '/Google_Cloud/Accounts/Invoices/2026/Matched_PO/',
            confidence: '100.00%',
            previewHtml: `
                <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
                    <span style="color:var(--rt-cyan-bright); font-weight:700;">TAX INVOICE: INV-DXB-2026-9042</span>
                    <span style="color:#00FF88;">TRN 10029481900003</span>
                </div>
                <div style="font-size:0.75rem; line-height:1.5;">
                    <div><strong>SUPPLIER:</strong> EMIRATES CEMENT & STEEL CORP</div>
                    <div><strong>P.O. REFERENCE:</strong> PO-90118 (MATERIAL SUPPLY)</div>
                    <div><strong>SUBTOTAL:</strong> AED 135,714.28 | <strong>VAT (5%):</strong> AED 6,785.72</div>
                    <div><strong>TOTAL DUE:</strong> AED 142,500.00 (NET 30 DAYS)</div>
                    <div style="margin-top:6px; color:#8DBFD8; font-style:italic;">
                        &gt;&gt; 3-Way Match Verification: PO #90118 vs GRN #5529 vs Inv #9042 [MATCH CONFIRMED]
                    </div>
                </div>
            `
        },
        hvac: {
            id: 'TS-MEP-HVAC-0881',
            title: 'Technical Submittal: Variable Air Volume (VAV) Terminal Units',
            discipline: 'MEP / Mechanical HVAC',
            authority: 'Apex Thermo-Dynamic Solutions Ltd',
            status: 'REV 02 // CODE 2 APPROVED AS NOTED',
            date: '2026-10-17',
            filename: 'RT-EDMS_TS_MEP_HVAC_0881_REV02_REV.pdf',
            cloudPath: '/Google_Cloud/EDMS/2026/MEP/Technical_Submittals/',
            confidence: '99.94%',
            previewHtml: `
                <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
                    <span style="color:var(--rt-cyan-bright); font-weight:700;">TECH SUBMITTAL: TS-MEP-HVAC-0881</span>
                    <span style="color:#FFBB00;">CODE 2 // APPROVED AS NOTED</span>
                </div>
                <div style="font-size:0.75rem; line-height:1.5;">
                    <div><strong>SYSTEM:</strong> MECHANICAL VENTILATION & COOLING</div>
                    <div><strong>EQUIPMENT:</strong> DDC PRESSURE-INDEPENDENT VAV UNITS</div>
                    <div><strong>COMPLIANCE:</strong> ASHRAE 90.1-2022 / AHRI 880 CERTIFIED</div>
                    <div style="margin-top:6px; color:#FFBB00; font-style:italic;">
                        &gt;&gt; Consultant Note: "Verify acoustic attenuator schedule on Level 14 plant room prior to commissioning."
                    </div>
                </div>
            `
        },
        ncr: {
            id: 'NCR-QAQC-2026-019',
            title: 'Non-Conformance Report & Corrective Action Protocol',
            discipline: 'QA/QC Quality Assurance',
            authority: 'Ravana QA/QC Directorate // Lead Inspector',
            status: 'REV 01 // CLOSURE AUDIT PENDING',
            date: '2026-10-16',
            filename: 'RT-QA_NCR_2026_019_OPEN.pdf',
            cloudPath: '/Google_Cloud/Quality/NCR_Logs/2026/',
            confidence: '100.00%',
            previewHtml: `
                <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
                    <span style="color:var(--rt-cyan-bright); font-weight:700;">QUALITY NCR: NCR-QAQC-2026-019</span>
                    <span style="color:#FF5555;">LEVEL 2 NON-CONFORMANCE</span>
                </div>
                <div style="font-size:0.75rem; line-height:1.5;">
                    <div><strong>ZONE:</strong> BASEMENT B2 PARKING SLAB GRID 4-G</div>
                    <div><strong>DEFICIENCY:</strong> Aggregate slump deviation during pour #44</div>
                    <div><strong>CORRECTIVE ACTION:</strong> Core compressive re-testing required</div>
                    <div style="margin-top:6px; color:#8DBFD8; font-style:italic;">
                        &gt;&gt; Remedial Action Plan submitted by Contractor. Awaiting 28-day cylinder crush lab report.
                    </div>
                </div>
            `
        }
    };

    let activeDocSample = 'submittal';
    const previewContentEl = document.getElementById('doc-preview-content');
    const laserBeamEl = document.getElementById('scanner-laser-beam');
    const statusOverlayEl = document.getElementById('scanner-status-overlay');
    const statusTextEl = document.getElementById('scanner-status-text');

    function renderDocPreview(sampleKey) {
        activeDocSample = sampleKey;
        const sample = DOC_SAMPLES[sampleKey] || DOC_SAMPLES.submittal;
        if (previewContentEl) {
            previewContentEl.innerHTML = sample.previewHtml;
        }

        // Update fields
        const idEl = document.getElementById('val-doc-id');
        const statusEl = document.getElementById('val-doc-status');
        const discEl = document.getElementById('val-doc-discipline');
        const dateEl = document.getElementById('val-doc-date');
        const fileEl = document.getElementById('val-doc-filename');
        const cloudEl = document.getElementById('val-doc-cloudpath');
        const confEl = document.getElementById('meta-confidence');

        if (idEl) idEl.textContent = sample.id;
        if (statusEl) statusEl.textContent = sample.status;
        if (discEl) discEl.textContent = `${sample.discipline} & ${sample.authority}`;
        if (dateEl) dateEl.textContent = sample.date;
        if (fileEl) fileEl.textContent = sample.filename;
        if (cloudEl) cloudEl.textContent = sample.cloudPath;
        if (confEl) confEl.textContent = `CONFIDENCE: ${sample.confidence}`;
    }

    renderDocPreview('submittal');

    // Preset buttons
    const presetBtns = document.querySelectorAll('.doc-preset-btn');
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sampleKey = btn.getAttribute('data-sample');
            renderDocPreview(sampleKey);
            triggerScanAnimation(sampleKey);
        });
    });

    // Run Scan Button
    const runScanBtn = document.getElementById('btn-run-doc-scan');
    function triggerScanAnimation(sampleKey) {
        if (!laserBeamEl || !statusOverlayEl) return;
        laserBeamEl.classList.add('scanning');
        statusOverlayEl.classList.add('active');
        if (statusTextEl) statusTextEl.textContent = 'EXTRACTING COGNITIVE METADATA VIA OCR...';

        setTimeout(() => {
            if (statusTextEl) statusTextEl.textContent = 'VALIDATING ISO 9001 EDMS SCHEMA...';
        }, 600);

        setTimeout(() => {
            laserBeamEl.classList.remove('scanning');
            statusOverlayEl.classList.remove('active');
            renderDocPreview(sampleKey);
            showLabToast(`Document ${DOC_SAMPLES[sampleKey].id} parsed & schema-verified!`);
        }, 1200);
    }

    if (runScanBtn) {
        runScanBtn.addEventListener('click', () => {
            triggerScanAnimation(activeDocSample);
        });
    }

    // Add to Master Document Register (MDR)
    const addToMdrBtn = document.getElementById('btn-add-to-mdr');
    const mdrTbody = document.getElementById('mdr-tbody');
    const mdrCounter = document.getElementById('mdr-counter');

    if (addToMdrBtn && mdrTbody) {
        addToMdrBtn.addEventListener('click', () => {
            const sample = DOC_SAMPLES[activeDocSample];
            const isApproved = sample.status.includes('APPROVED') || sample.status.includes('MATCHED');
            const statusClass = isApproved ? 'status-approved' : 'status-review';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code class="cyan-text">${sample.id}</code></td>
                <td>${sample.title}</td>
                <td>${sample.discipline}</td>
                <td><span class="rev-pill">${sample.status.split('//')[0].trim()}</span></td>
                <td><span class="status-chip ${statusClass}">${sample.status.split('//')[1] || sample.status}</span></td>
                <td>Just Now</td>
                <td><span class="author-tag">Shanthapriya (AI Controller)</span></td>
            `;
            mdrTbody.insertBefore(tr, mdrTbody.firstChild);

            const count = mdrTbody.querySelectorAll('tr').length;
            if (mdrCounter) mdrCounter.textContent = `${count} ACTIVE LOGS`;

            showLabToast(`Logged ${sample.id} into Master Document Register!`);
        });
    }

    // Export MDR CSV
    const exportMdrBtn = document.getElementById('btn-export-mdr-csv');
    if (exportMdrBtn && mdrTbody) {
        exportMdrBtn.addEventListener('click', () => {
            const rows = mdrTbody.querySelectorAll('tr');
            let csv = 'Doc Number,Title,Discipline,Revision,Status,Logged At,Verified By\n';
            rows.forEach(r => {
                const cols = Array.from(r.querySelectorAll('td')).map(td => `"${td.innerText.replace(/"/g, '""').trim()}"`);
                csv += cols.join(',') + '\n';
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `RAVANA_TECH_MDR_EXPORT_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showLabToast('MDR Register exported to CSV!');
        });
    }

    // Reset MDR
    const resetMdrBtn = document.getElementById('btn-reset-mdr');
    if (resetMdrBtn && mdrTbody) {
        resetMdrBtn.addEventListener('click', () => {
            mdrTbody.innerHTML = `
                <tr>
                    <td><code class="cyan-text">SUB-STR-2026-0442</code></td>
                    <td>Architectural Facade Glazing &amp; Structural Framing</td>
                    <td>Structural</td>
                    <td><span class="rev-pill">R03</span></td>
                    <td><span class="status-chip status-approved">CODE 1 - APPROVED</span></td>
                    <td>Today, 04:12</td>
                    <td><span class="author-tag">AI EDMS Core</span></td>
                </tr>
                <tr>
                    <td><code class="cyan-text">INV-DXB-2026-9042</code></td>
                    <td>Commercial Tax Invoice &amp; Material Delivery Note</td>
                    <td>Commercial</td>
                    <td><span class="rev-pill">FINAL</span></td>
                    <td><span class="status-chip status-approved">VERIFIED &amp; PO MATCHED</span></td>
                    <td>Today, 03:45</td>
                    <td><span class="author-tag">AI EDMS Core</span></td>
                </tr>
                <tr>
                    <td><code class="cyan-text">TS-MEP-HVAC-0881</code></td>
                    <td>Technical Submittal: Variable Air Volume Units</td>
                    <td>MEP Mechanical</td>
                    <td><span class="rev-pill">R02</span></td>
                    <td><span class="status-chip status-review">CODE 2 - COMMENTS</span></td>
                    <td>Yesterday</td>
                    <td><span class="author-tag">AI EDMS Core</span></td>
                </tr>
            `;
            if (mdrCounter) mdrCounter.textContent = '3 ACTIVE LOGS';
            showLabToast('MDR Table reset to default.');
        });
    }

    // ==================== TAB 2: 0-ERROR BATCH DATA PIPELINE ====================
    const SAMPLE_RAW_DATA = [
        { id: 'REC-001', entity: 'Apex Construction LLC', phone: '+971 4 398 2210', date: '2026-10-18', vat: 'TRN-10029381', status: 'CLEAN' },
        { id: 'REC-002', entity: 'Gulf Marine Services', phone: '+971 2 644 1900', date: '2026-10-18', vat: 'TRN-10098471', status: 'DEDUPLICATED' },
        { id: 'REC-003', entity: 'Dubai Silicon Logistics', phone: '+971 4 883 4511', date: '2026-10-17', vat: 'TRN-10077432', status: 'CLEAN' },
        { id: 'REC-004', entity: 'Ceylon Electrics Colombo', phone: '+94 11 258 7741', date: '2026-10-17', vat: 'VAT-99201940', status: 'CLEAN' },
        { id: 'REC-005', entity: 'Emaar Hospitality Group', phone: '+971 4 367 3333', date: '2026-10-16', vat: 'TRN-10011294', status: 'CLEAN' },
        { id: 'REC-006', entity: 'Red Sea Petrochemical Ltd', phone: '+966 12 654 3210', date: '2026-10-16', vat: 'KSA-30048192', status: 'STANDARDIZED' },
        { id: 'REC-007', entity: 'Colombo Port Dredging Co', phone: '+94 11 445 9000', date: '2026-10-15', vat: 'VAT-88492011', status: 'CLEAN' },
        { id: 'REC-008', entity: 'Al Naboodah MEP Contracting', phone: '+971 4 294 8888', date: '2026-10-15', vat: 'TRN-10088921', status: 'CLEAN' },
        { id: 'REC-009', entity: 'Doka Formwork Systems UAE', phone: '+971 4 870 8700', date: '2026-10-14', vat: 'TRN-10044591', status: 'DEDUPLICATED' },
        { id: 'REC-010', entity: 'Ravana Tech Infrastructure', phone: '+94 78 847 0610', date: '2026-10-14', vat: 'SL-2026-9901', status: 'CLEAN' }
    ];

    const pipeTbody = document.getElementById('pipeline-tbody');
    const pipeSearch = document.getElementById('pipe-search-input');
    const btnRunPipe = document.getElementById('btn-run-pipeline');

    function populatePipelineTable(records) {
        if (!pipeTbody) return;
        pipeTbody.innerHTML = '';
        records.forEach(rec => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code class="cyan-text">${rec.id}</code></td>
                <td><strong>${rec.entity}</strong></td>
                <td><span style="font-family:var(--font-mono); color:#8DBFD8;">${rec.phone}</span></td>
                <td>${rec.date}</td>
                <td><code style="font-size:0.75rem;">${rec.vat}</code></td>
                <td><span class="status-chip status-approved">${rec.status}</span></td>
            `;
            pipeTbody.appendChild(tr);
        });
    }

    populatePipelineTable(SAMPLE_RAW_DATA);

    if (pipeSearch) {
        pipeSearch.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            const filtered = SAMPLE_RAW_DATA.filter(r => 
                r.id.toLowerCase().includes(q) ||
                r.entity.toLowerCase().includes(q) ||
                r.phone.toLowerCase().includes(q) ||
                r.vat.toLowerCase().includes(q)
            );
            populatePipelineTable(filtered);
        });
    }

    if (btnRunPipe) {
        btnRunPipe.addEventListener('click', () => {
            const timeEl = document.getElementById('pipe-time-val');
            const dupesEl = document.getElementById('pipe-dupes-val');
            const syncEl = document.getElementById('pipe-sync-val');

            btnRunPipe.disabled = true;
            btnRunPipe.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> PROCESSING 50 RECORDS...`;

            setTimeout(() => {
                if (timeEl) timeEl.textContent = '1.18s';
                if (dupesEl) dupesEl.textContent = '8 FIXED';
                if (syncEl) syncEl.textContent = '50 / 50';
                btnRunPipe.disabled = false;
                btnRunPipe.innerHTML = `<i class='bx bx-check'></i> BATCH EXECUTED (100% CLEAN)`;
                populatePipelineTable(SAMPLE_RAW_DATA);
                showLabToast('Batch Pipeline: 50 records cleaned & synced with 0 errors!');
            }, 900);
        });
    }

    // ==================== TAB 3: AUTONOMOUS AI AGENT SWARM ====================
    const btnDispatchSwarm = document.getElementById('btn-dispatch-swarm');
    const swarmConsole = document.getElementById('swarm-term-console');
    const agentSentinel = document.getElementById('agent-sentinel');
    const agentParser = document.getElementById('agent-parser');
    const agentAuditor = document.getElementById('agent-auditor');
    const agentDispatcher = document.getElementById('agent-dispatcher');

    function appendSwarmLog(agent, message, color = 'var(--rt-cyan-bright)') {
        if (!swarmConsole) return;
        const now = new Date();
        const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = `<span class="term-time">${timeStr}</span> <span class="term-agent" style="color:${color};">[${agent}]</span> ${message}`;
        swarmConsole.appendChild(div);
        swarmConsole.scrollTop = swarmConsole.scrollHeight;
    }

    if (btnDispatchSwarm) {
        btnDispatchSwarm.addEventListener('click', () => {
            btnDispatchSwarm.disabled = true;
            btnDispatchSwarm.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> MISSION IN PROGRESS...`;

            // Phase 1: Sentinel Ingests
            if (agentSentinel) agentSentinel.classList.add('active');
            appendSwarmLog('SENTINEL', 'New drawing transmittal received via Subcontractor Cloud Portal. Handing payload to Agent Beta.');

            setTimeout(() => {
                // Phase 2: Cognitive Parser Analyzes
                if (agentParser) {
                    agentParser.classList.add('active');
                    const badge = agentParser.querySelector('.agent-status-badge');
                    if (badge) { badge.className = 'agent-status-badge status-active'; badge.textContent = 'PROCESSING'; }
                }
                appendSwarmLog('COGNITIVE', 'Gemini 2.5 Flash OCR executed in 280ms. Extracted: DWG-STR-4091 Rev C (14 cross-section drawings).', '#00FF88');
            }, 900);

            setTimeout(() => {
                // Phase 3: Auditor verifies
                if (agentAuditor) {
                    agentAuditor.classList.add('active');
                    const badge = agentAuditor.querySelector('.agent-status-badge');
                    if (badge) { badge.className = 'agent-status-badge status-active'; badge.textContent = 'AUDITING'; }
                }
                appendSwarmLog('AUDITOR', 'Cross-referenced against Project Spec SEC-084400. Zero clash detected. Assigned: CODE 1 APPROVED.', '#FFBB00');
            }, 1900);

            setTimeout(() => {
                // Phase 4: Dispatcher commits
                if (agentDispatcher) {
                    agentDispatcher.classList.add('active');
                    const badge = agentDispatcher.querySelector('.agent-status-badge');
                    if (badge) { badge.className = 'agent-status-badge status-active'; badge.textContent = 'COMMITTED'; }
                }
                appendSwarmLog('DISPATCHER', 'Normalized: RT-EDMS_SUB_STR_0442_REV03_APP.pdf. Synced to Google Cloud & WhatsApp alert dispatched.', '#18C8FF');
                appendSwarmLog('SYSTEM', 'MISSION ACCOMPLISHED: Total Autonomous Swarm Runtime: 2.8 seconds.', '#00FF88');

                btnDispatchSwarm.disabled = false;
                btnDispatchSwarm.innerHTML = `<i class='bx bx-rocket'></i> DISPATCH AUTONOMOUS MISSION`;
                showLabToast('Agent Swarm Mission executed flawlessly in 2.8s!');
            }, 2900);
        });
    }

    // ==================== TAB 4: TECH & AI ECOSYSTEM RADAR ====================
    const TECH_ITEMS = [
        {
            id: 'gemini',
            name: 'Google AI Studio & Gemini',
            category: 'models',
            catLabel: 'CORE COGNITIVE LLM',
            icon: 'bx-brain',
            short: 'Multimodal vision, rapid prompt iteration & JSON schema output.',
            desc: 'Utilized as the primary cognitive intelligence engine. Enables instant extraction of high-complexity engineering drawings, multi-page submittals, and invoice OCR with zero hallucinations and strict schema enforcement.',
            stats: { speed: '<300ms latency', usage: 'Document extraction & OCR', roi: '95% faster processing' }
        },
        {
            id: 'claude',
            name: 'Claude 3.5 Sonnet & Claude Code',
            category: 'models',
            catLabel: 'HIGH REASONING LLM',
            icon: 'bx-code-alt',
            short: 'Deep architectural logic, code generation & document comparison.',
            desc: 'Leveraged for deep semantic comparison between revised engineering drawings and contract specifications. Excellent for generating custom automation scripts and regulatory compliance checklists.',
            stats: { speed: 'High precision', usage: 'Revision delta analysis', roi: 'Zero revision collisions' }
        },
        {
            id: 'chatgpt',
            name: 'ChatGPT & OpenAI Codex',
            category: 'models',
            catLabel: 'ADVANCED AUTOMATION',
            icon: 'bx-bot',
            short: 'Rapid pipeline scripting, regex structuring & synthetic data test sets.',
            desc: 'Used for formulating mathematical validation formulas, regex cleaning expressions, and transforming messy non-standard customer inquiries into clean database records.',
            stats: { speed: 'Instantaneous', usage: 'Regex & logic pipelines', roi: '100% data cleaning' }
        },
        {
            id: 'grok',
            name: 'xAI Grok & Copilot',
            category: 'models',
            catLabel: 'INTELLIGENCE ACCELERATOR',
            icon: 'bx-rocket',
            short: 'Real-time synthesis, alternative perspectives & creative ideas.',
            desc: 'Applied for stress-testing architectural assumptions, drafting bilingual documentation, and keeping pace with bleeding-edge AI models and global engineering standards.',
            stats: { speed: 'Real-time', usage: 'Cross-model verification', roi: 'Multi-angle assurance' }
        },
        {
            id: 'firebase',
            name: 'Firebase Firestore & Auth',
            category: 'cloud',
            catLabel: 'REAL-TIME CLOUD DATABASE',
            icon: 'bx-data',
            short: 'Sub-millisecond persistent document registers & inquiries.',
            desc: 'Production database hosting live transmittal records, customer inquiries, and system state with automatic failover, security rules, and real-time synchronization.',
            stats: { speed: '<50ms reads/writes', usage: 'Lead & MDR persistence', roi: '100% uptime SLA' }
        },
        {
            id: 'gcp',
            name: 'Google Cloud Platform (GCP)',
            category: 'cloud',
            catLabel: 'ENTERPRISE EDMS ARCHIVAL',
            icon: 'bx-cloud',
            short: 'Scalable cloud storage, Pub/Sub webhooks & audit logs.',
            desc: 'Backbone of the Document Management System. Manages immutable document versioning, access control policies, and compliance logging conforming to ISO 9001 standards.',
            stats: { speed: 'Global CDN', usage: 'Cloud EDMS repository', roi: 'Infinite scalability' }
        },
        {
            id: 'gas',
            name: 'Google App Scripts (GAS)',
            category: 'cloud',
            catLabel: 'OFFICE & WORKFLOW MACROS',
            icon: 'bx-spreadsheet',
            short: 'Automating Google Sheets, Drive directories & email alerts.',
            desc: 'Connects spreadsheets directly to AI endpoints. Automatically formats incoming entries, generates PDF transmittals, and dispatches automated status updates without manual intervention.',
            stats: { speed: 'Serverless', usage: 'Sheets & Drive macros', roi: '4+ hours saved daily' }
        },
        {
            id: 'github',
            name: 'GitHub & GitBash',
            category: 'devtools',
            catLabel: 'VERSION CONTROL & CLI',
            icon: 'bxl-github',
            short: 'Command-line execution, repository tracking & CI/CD deployment.',
            desc: 'Enforces clean code architecture, branch hygiene, and terminal automation. Powers continuous deployment to Google Cloud and Firebase environments seamlessly.',
            stats: { speed: 'Instant CLI', usage: 'Source control & bash tools', roi: 'Flawless deployments' }
        },
        {
            id: 'nodejs',
            name: 'Node.js & Express REST APIs',
            category: 'devtools',
            catLabel: 'HIGH-THROUGHPUT BACKEND',
            icon: 'bxl-nodejs',
            short: 'Sub-second API endpoints, compression & telemetry.',
            desc: 'Underlying server architecture serving Ravana Tech applications. Built for industrial speeds (<0.20s load time) with Gzip compression and zero bloat.',
            stats: { speed: '<0.20s speed', usage: 'API gateway & routing', roi: 'Sub-second latency' }
        },
        {
            id: 'creativity',
            name: 'Human Vision + AI Synergy',
            category: 'models',
            catLabel: 'INNOVATIVE PHILOSOPHY',
            icon: 'bx-bulb',
            short: 'Why memorize syntax when you can architect living systems?',
            desc: 'Shanthapriya Silva’s trademark approach: Utilizing creativity, bold systemic thinking, and rapid AI tool orchestration to build solutions that traditional slow teams take months to produce.',
            stats: { speed: '10x Faster', usage: 'Strategic problem solving', roi: 'Unbeatable market edge' }
        }
    ];

    const radarGrid = document.getElementById('radar-cards-grid');
    const radarFilterBtns = document.querySelectorAll('.radar-filter-btn');

    function renderRadarCards(filter = 'all') {
        if (!radarGrid) return;
        radarGrid.innerHTML = '';
        const items = filter === 'all' ? TECH_ITEMS : TECH_ITEMS.filter(item => item.category === filter);

        items.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = `radar-card ${idx === 0 ? 'active' : ''}`;
            card.setAttribute('data-tech-id', item.id);
            card.innerHTML = `
                <div class="rcard-top">
                    <i class='bx ${item.icon} rcard-icon'></i>
                    <span class="rcard-cat">${item.catLabel}</span>
                </div>
                <h4 class="rcard-title">${item.name}</h4>
                <p class="rcard-sub">${item.short}</p>
            `;

            card.addEventListener('click', () => {
                document.querySelectorAll('.radar-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                selectRadarDetail(item);
            });

            radarGrid.appendChild(card);
        });

        if (items.length > 0) {
            selectRadarDetail(items[0]);
        }
    }

    function selectRadarDetail(item) {
        const iconEl = document.getElementById('radar-detail-icon');
        const nameEl = document.getElementById('radar-detail-name');
        const catEl = document.getElementById('radar-detail-cat');
        const bodyEl = document.getElementById('radar-detail-body');
        const statsEl = document.getElementById('radar-detail-stats');

        if (iconEl) iconEl.className = `bx ${item.icon}`;
        if (nameEl) nameEl.textContent = item.name;
        if (catEl) catEl.textContent = item.catLabel;
        if (bodyEl) bodyEl.textContent = item.desc;
        if (statsEl) {
            statsEl.innerHTML = `
                <div class="rstat"><strong>METRIC:</strong> ${item.stats.speed}</div>
                <div class="rstat"><strong>APPLICATION:</strong> ${item.stats.usage}</div>
                <div class="rstat"><strong>BUSINESS IMPACT:</strong> ${item.stats.roi}</div>
            `;
        }
    }

    radarFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            radarFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRadarCards(btn.getAttribute('data-filter'));
        });
    });

    renderRadarCards('all');

    // ==================== TAB 5: DYNAMIC REAL CV & COVER LETTER STATION ====================
    const DEFAULT_PROFILE = {
        name: 'SHANTHAPRIYA SILVA',
        title: 'DOCUMENT CONTROLLER & AUTOMATION SPECIALIST',
        phone: '+94 78 847 0610',
        email: 'hello.ravanatech@gmail.com',
        location: 'Open to UAE / Gulf Relocation & Global Remote',
        portfolioUrl: 'https://ravanatec.web.app/ai-lab',
        profile: 'Meticulous and tech-empowered Document Controller & Data Management Specialist with a distinctive competitive edge in AI Workflow Automation and Electronic Document Management Systems (EDMS). Combines strict ISO 9001:2015 document control governance with modern cognitive AI tooling (Google AI Studio, Gemini, Google App Scripts, Cloud Databases) to eliminate manual logging bottlenecks, achieving 100% revision accuracy and accelerating transmittal turnaround by over 80%.',
        experience: [
            {
                role: 'Lead Document Controller & Automation Architect',
                company: 'Ravana Tech',
                dates: '2024 - Present',
                bullets: [
                    'Architected and managed cloud EDMS workflows handling 5,000+ digital engineering drawings, technical specifications, and vendor invoices with zero filing collisions or lost revisions.',
                    'Automated transmittal ingestion pipelines using AI OCR and Google App Scripts, reducing daily manual logging time from 4.5 hours to under 15 minutes.',
                    'Maintained 100% audit-readiness under ISO 9001 document retention protocols, standardizing naming conventions across Civil, MEP, and Architectural packages.',
                    'Engineered 0-error batch data extraction pipelines for commercial documents, auto-verifying VAT numbers, line totals, and purchase order cross-references.'
                ]
            },
            {
                role: 'Data Entry & Document Control Specialist',
                company: 'Independent Contracting & Business Services',
                dates: '2022 - 2024',
                bullets: [
                    'Triaged and digitized thousands of legacy paper records, vendor submittals, and customer inventories into structured cloud databases with 99.98% verified accuracy.',
                    'Formulated standardized data entry templates and automated regex validation scripts that eliminated typographical errors and duplicate records.',
                    'Coordinated transmittal distributions between project managers, engineers, and subcontractors, ensuring 24-hour turnaround on urgent RFIs and shop drawings.'
                ]
            }
        ],
        education: [
            'Specialized Training: Electronic Document Management Systems (EDMS), ISO Quality Documentation Standards.',
            'Applied AI & Automation: Google AI Studio, Gemini Flash OCR, Cloud Database Architecture, Prompt Engineering.',
            'Languages: English (Professional Working Proficiency), Sinhala (Native).'
        ],
        skills: [
            'Document Control & EDMS: Master Document Register (MDR), Submittal & Transmittal Ingestion, RFI & NCR Logs, Drawing Revision Control, ISO 9001:2015 Quality Standards.',
            'Data Entry & Validation: High-Speed Touch Typing (75+ WPM / 10,000+ KPH), 100% Zero-Error Schema Validation, 3-Way PO & Invoice Matching, Batch Record Cleansing.',
            'AI & Automation Superpowers: Google AI Studio, Gemini Flash Multimodal OCR, Claude 3.5, Google App Scripts (GAS) macro automation, Firebase Firestore, GitHub, GCP Cloud Storage.',
            'Productivity Suites: Advanced Microsoft Excel (Pivot Tables, Advanced Formulas, VLOOKUP), Google Workspace Cloud Architecture.'
        ],
        rawCv: ''
    };

    let userProfile = { ...DEFAULT_PROFILE };

    // Load persisted real profile from browser localStorage
    try {
        const saved = localStorage.getItem('ravana_user_real_cv');
        if (saved) {
            const parsed = JSON.parse(saved);
            userProfile = { ...userProfile, ...parsed };
        }
    } catch (e) {
        console.warn('Real CV profile load deferred:', e);
    }

    function buildCvTemplates(p) {
        const isCustomRaw = p.rawCv && p.rawCv.trim().length > 30;

        // 1. Document Controller CV
        const docCopy = isCustomRaw ? p.rawCv : `${p.name}
${p.title}
Email: ${p.email} | Phone / WhatsApp: ${p.phone}
Location: ${p.location} | Portfolio: ${p.portfolioUrl}

EXECUTIVE PROFILE:
${p.profile}

CORE SKILLS & TECHNICAL EXPERTISE:
${p.skills.map(s => `- ${s}`).join('\n')}

PROFESSIONAL EXPERIENCE:
${Array.isArray(p.experience) ? p.experience.map(exp => `
${exp.role.toUpperCase()} | ${exp.company} (${exp.dates})
${exp.bullets.map(b => `- ${b}`).join('\n')}`).join('\n') : p.experience}

EDUCATION & CREDENTIALS:
${p.education.map(e => `- ${e}`).join('\n')}`;

        const docHtml = isCustomRaw ? `
            <div class="cv-paper">
                <h1>${p.name}</h1>
                <div class="cv-title-tag">${p.title}</div>
                <div class="cv-contact-row">
                    <span><i class='bx bx-envelope'></i> ${p.email}</span>
                    <span><i class='bx bxl-whatsapp'></i> ${p.phone}</span>
                    <span><i class='bx bx-map'></i> ${p.location}</span>
                </div>
                <div class="cv-section" style="margin-top: 1.5rem;">
                    <div class="cv-section-title">REAL CURRICULUM VITAE // VERIFIED PROFILE</div>
                    <pre style="white-space: pre-wrap; font-family: var(--font-mono); color: #D0E8F5; line-height: 1.6; font-size: 0.88rem; background: rgba(0, 191, 255, 0.04); padding: 1.25rem; border-radius: 6px; border: 1px solid var(--rt-border);">${p.rawCv}</pre>
                </div>
            </div>
        ` : `
            <div class="cv-paper">
                <h1>${p.name}</h1>
                <div class="cv-title-tag">${p.title}</div>
                <div class="cv-contact-row">
                    <span><i class='bx bx-envelope'></i> ${p.email}</span>
                    <span><i class='bx bxl-whatsapp'></i> ${p.phone}</span>
                    <span><i class='bx bx-globe'></i> <a href="${p.portfolioUrl}" target="_blank">ravanatec.web.app/ai-lab</a></span>
                    <span><i class='bx bx-map'></i> ${p.location}</span>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">EXECUTIVE PROFILE</div>
                    <p style="color:#D0E8F5; line-height:1.6;">
                        ${p.profile}
                    </p>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">CORE SKILLS &amp; TECHNICAL EXPERTISE</div>
                    <ul class="cv-bullet-list">
                        ${p.skills.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">PROFESSIONAL EXPERIENCE</div>
                    ${Array.isArray(p.experience) ? p.experience.map(exp => `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <span class="cv-item-role">${exp.role}</span>
                                <span class="cv-item-company">${exp.company}</span>
                                <span class="cv-item-date">${exp.dates}</span>
                            </div>
                            <ul class="cv-bullet-list">
                                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('') : `<pre style="white-space: pre-wrap; font-family: var(--font-mono); color: #D0E8F5;">${p.experience}</pre>`}
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">EDUCATION &amp; CERTIFICATIONS</div>
                    <ul class="cv-bullet-list">
                        ${p.education.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        // 2. Data Entry Specialist CV
        const dataCopy = `${p.name}
DATA ENTRY SPECIALIST & AI WORKFLOW ARCHITECT
Email: ${p.email} | Phone / WhatsApp: ${p.phone}
Portfolio: ${p.portfolioUrl} | Location: ${p.location}

SUMMARY:
High-speed, 100% accurate Data Entry Specialist with cutting-edge expertise in AI-driven data cleansing, regex formatting, and automated batch processing. Combines 75+ WPM typing speed with Google AI Studio, Google Sheets automation, and cloud databases to process 10x higher data volumes with zero errors.

CORE DATA ENTRY SKILLS:
- Data Entry & High-Speed Input: 10,000+ Keystrokes Per Hour (75+ WPM), 100.00% Zero-Error Verification.
- Automated Data Cleaning: Regex normalization, duplicate merging, phone & address validation.
- Spreadsheet Mastery: Advanced Microsoft Excel (VLOOKUP, Pivot Tables), Google Sheets & Google App Scripts macros.
- Strict Confidentiality: NDA compliance, secure cloud intake, audit-logged file handling.

WORK EXPERIENCE & ACHIEVEMENTS:
- Lead Data Management & Automation: Handled 50,000+ commercial records, automated duplicate detection, and synchronized multi-channel records into central cloud repositories.
- Legacy Dataset Digitization: Cleaned, categorized, and converted physical paper logs into cloud databases with 99.98% verified accuracy.

EDUCATION & CREDENTIALS:
${p.education.map(e => `- ${e}`).join('\n')}`;

        const dataHtml = `
            <div class="cv-paper">
                <h1>${p.name}</h1>
                <div class="cv-title-tag">DATA ENTRY SPECIALIST &amp; AI WORKFLOW ARCHITECT</div>
                <div class="cv-contact-row">
                    <span><i class='bx bx-envelope'></i> ${p.email}</span>
                    <span><i class='bx bxl-whatsapp'></i> ${p.phone}</span>
                    <span><i class='bx bx-globe'></i> <a href="${p.portfolioUrl}" target="_blank">ravanatec.web.app/ai-lab</a></span>
                    <span><i class='bx bx-map'></i> ${p.location}</span>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">PROFESSIONAL SUMMARY</div>
                    <p style="color:#D0E8F5; line-height:1.6;">
                        High-speed, 100% accurate <strong>Data Entry Specialist</strong> with cutting-edge expertise in AI-driven data cleansing, regex formatting, and automated batch pipelines. Combines 75+ WPM typing speed with Google AI Studio, Google Sheets automation, and cloud databases to process <strong>10x higher data volumes with zero errors</strong>.
                    </p>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">CORE SKILLS</div>
                    <ul class="cv-bullet-list">
                        <li><strong>Speed &amp; Precision:</strong> 75+ Words Per Minute (10,000+ KPH), 100.00% Zero-Error Verification.</li>
                        <li><strong>AI &amp; Regex Cleansing:</strong> Automated duplicate merging, phone &amp; date standardization, schema cross-validation.</li>
                        <li><strong>Spreadsheet Mastery:</strong> Advanced Microsoft Excel, Google Sheets, automated Google App Scripts macros.</li>
                        <li><strong>Confidentiality &amp; Compliance:</strong> Strict NDA adherence, secure encrypted data intake protocols.</li>
                    </ul>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">WORK EXPERIENCE</div>
                    ${Array.isArray(p.experience) ? p.experience.map(exp => `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <span class="cv-item-role">${exp.role}</span>
                                <span class="cv-item-company">${exp.company}</span>
                                <span class="cv-item-date">${exp.dates}</span>
                            </div>
                            <ul class="cv-bullet-list">
                                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('') : `<pre style="white-space: pre-wrap; font-family: var(--font-mono); color: #D0E8F5;">${p.experience}</pre>`}
                </div>
            </div>
        `;

        // 3. Winning Cover Letter
        const clCopy = `Dear Hiring Manager,

I am writing to express my strong interest in the Document Controller / Data Entry Specialist role with your esteemed organization.

In today's fast-paced project environment, manual document tracking and repetitive data entry often lead to costly delays, lost revisions, and human errors. As a technology-empowered Document Controller, I bring a rare and valuable combination: meticulous attention to ISO 9001 document governance paired with modern AI automation tools.

By leveraging Google AI Studio, Gemini Flash OCR, and automated Google App Scripts pipelines, I do not just log files into an EDMS or spreadsheet — I build reliable, automated systems that:
1. Ingest transmittals, technical submittals, and invoices in seconds instead of hours.
2. Eliminate revision collisions and ensure 100% compliance with Master Document Register (MDR) standards.
3. Remove manual typos and duplicate entries through automated regex validation.

I have engineered and deployed working systems that handle thousands of engineering blueprints, commercial delivery notes, and project records with 100% data integrity. You can explore my live interactive demonstrations directly at: ${p.portfolioUrl}

I am available for immediate placement and am fully ready for UAE / Gulf relocation or high-performance remote engagement. I welcome the opportunity to discuss how my disciplined document control and automation capabilities will immediately benefit your project team.

Sincerely,
${p.name}
Lead Document Controller & Automation Specialist
Email: ${p.email} | WhatsApp: ${p.phone}`;

        const clHtml = `
            <div class="cv-paper">
                <h1>COVER LETTER // EXECUTIVE SUBMISSION</h1>
                <div class="cv-title-tag">TARGET: DOCUMENT CONTROLLER &amp; DATA ENTRY SPECIALIST</div>
                <div class="cv-contact-row">
                    <span><i class='bx bx-user'></i> ${p.name}</span>
                    <span><i class='bx bx-envelope'></i> ${p.email}</span>
                    <span><i class='bx bxl-whatsapp'></i> ${p.phone}</span>
                </div>

                <div class="cv-section">
                    <p style="color:#D0E8F5; line-height:1.7; margin-bottom:1rem;">
                        <strong>Dear Hiring Manager,</strong><br><br>
                        I am writing to express my strong interest in the <strong>Document Controller / Data Entry Specialist</strong> position with your esteemed organization.
                    </p>
                    <p style="color:#D0E8F5; line-height:1.7; margin-bottom:1rem;">
                        In today's fast-paced project environments, manual document tracking and repetitive data entry often lead to costly delays, lost revisions, and human errors. As a technology-empowered Document Controller, I bring a rare and decisive advantage: <strong>rigorous ISO 9001 document governance paired with cutting-edge AI automation tools</strong>.
                    </p>
                    <p style="color:#D0E8F5; line-height:1.7; margin-bottom:1rem;">
                        By leveraging Google AI Studio, Gemini Flash OCR, and automated Google App Scripts pipelines, I do not merely log files into an EDMS or spreadsheet &mdash; I orchestrate reliable, automated systems that:
                    </p>
                    <ul class="cv-bullet-list" style="margin-bottom:1rem;">
                        <li><strong>Ingest transmittals, technical submittals, and invoices in seconds</strong> instead of hours.</li>
                        <li><strong>Eliminate revision collisions</strong> and guarantee 100% compliance with Master Document Register (MDR) standards.</li>
                        <li><strong>Purge manual typos and duplicate entries</strong> through automated regex and schema validation.</li>
                    </ul>
                    <p style="color:#D0E8F5; line-height:1.7; margin-bottom:1rem;">
                        You can interactively test my real-time Document Controller Simulator and automated batch pipelines live at: <a href="${p.portfolioUrl}" target="_blank" style="color:var(--rt-cyan-bright); font-weight:700;">ravanatec.web.app/ai-lab</a>.
                    </p>
                    <p style="color:#D0E8F5; line-height:1.7;">
                        I am available for immediate appointment and am fully prepared for <strong>UAE / Dubai relocation or high-performance remote engagement</strong>. Thank you for your time and consideration.
                    </p>
                </div>
            </div>
        `;

        // 4. LinkedIn Headline & About
        const liCopy = `LINKEDIN HEADLINE:
${p.name} | Document Controller & Data Entry Specialist | AI Workflow Automation & EDMS Architecture | Google AI Studio, Gemini, Advanced Excel & Cloud Pipelines | 0-Error Data Integrity

LINKEDIN ABOUT SECTION:
Are your engineering teams losing hours every day searching for drawing revisions, manually typing transmittals, or fixing spreadsheet typos?

I bridge the gap between traditional Document Control and Modern AI Automation.

With a deep background in document governance, ISO 9001 compliance, and precision data entry, I leverage modern AI tools (Google AI Studio, Gemini Flash, Claude 3.5, Google App Scripts, Firebase) to transform chaotic file archives into high-speed, 100% reliable systems.

What I Bring to Your Organization:
- Master Document Register (MDR) & Transmittal Architecture
- Zero-Error Data Entry & 3-Way PO / Invoice Reconciliation
- Automated Ingestion Pipelines: Reducing manual logging from 4.5 hrs to 15 mins
- Full Compliance with UAE / Gulf / International Engineering Standards

Explore my live interactive Document Controller Simulator: ${p.portfolioUrl}
Open to UAE / Gulf Relocation & International Remote Roles.
Contact: ${p.email} | WhatsApp: ${p.phone}`;

        const liHtml = `
            <div class="cv-paper">
                <h1>LINKEDIN PROFILE PLAYBOOK</h1>
                <div class="cv-title-tag">OPTIMIZED FOR RECRUITERS &amp; HIRING MANAGERS</div>

                <div class="cv-section">
                    <div class="cv-section-title">SUGGESTED LINKEDIN HEADLINE (HIGH-CTR)</div>
                    <div style="background:rgba(0,191,255,0.08); padding:0.85rem; border-radius:8px; border:1px solid var(--rt-border); font-family:var(--font-mono); font-size:0.85rem; color:#FFF;">
                        ${p.name} | Document Controller &amp; Data Entry Specialist | AI Workflow Automation &amp; EDMS Architecture | Google AI Studio, Gemini, Advanced Excel &amp; Cloud Pipelines | 0-Error Data Integrity
                    </div>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">OPTIMIZED ABOUT SECTION (ENGAGING &amp; CONVERTING)</div>
                    <p style="color:#D0E8F5; line-height:1.6; margin-bottom:0.75rem;">
                        Are your engineering teams losing hours every day searching for drawing revisions, manually typing transmittals, or fixing spreadsheet typos?
                    </p>
                    <p style="color:#D0E8F5; line-height:1.6; margin-bottom:0.75rem;">
                        <strong>I bridge the gap between traditional Document Control and Modern AI Automation.</strong>
                    </p>
                    <p style="color:#D0E8F5; line-height:1.6; margin-bottom:0.75rem;">
                        With a deep background in document governance, ISO 9001 compliance, and precision data entry, I leverage modern AI tools (Google AI Studio, Gemini 2.5 Flash, Claude 3.5, Google App Scripts, Firebase) to transform chaotic file archives into high-speed, 100% reliable systems.
                    </p>
                    <ul class="cv-bullet-list">
                        <li><strong>Master Document Register (MDR) &amp; Transmittal Architecture</strong></li>
                        <li><strong>Zero-Error Data Entry &amp; 3-Way PO / Invoice Reconciliation</strong></li>
                        <li><strong>Automated Ingestion Pipelines:</strong> Reducing manual logging from 4.5 hrs to 15 mins</li>
                        <li><strong>Full Compliance with UAE / Gulf / International Standards</strong></li>
                    </ul>
                </div>
            </div>
        `;

        return {
            'doc-cv': { title: 'DOCUMENT CONTROLLER CV', copyText: docCopy, renderHtml: docHtml },
            'data-cv': { title: 'DATA ENTRY SPECIALIST CV', copyText: dataCopy, renderHtml: dataHtml },
            'cover-letter': { title: 'WINNING COVER LETTER', copyText: clCopy, renderHtml: clHtml },
            'linkedin': { title: 'LINKEDIN PLAYBOOK', copyText: liCopy, renderHtml: liHtml }
        };
    }

    let activeCvTemplates = buildCvTemplates(userProfile);
    let activeCvKey = 'doc-cv';
    const cvReaderBox = document.getElementById('cv-reader-box');

    function safeCopyText(text, successMsg) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showLabToast(successMsg);
            }).catch(() => {
                fallbackCopy(text, successMsg);
            });
        } else {
            fallbackCopy(text, successMsg);
        }
    }

    function fallbackCopy(text, successMsg) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showLabToast(successMsg);
        } catch (e) {
            showLabToast(successMsg || 'Text copied to clipboard!');
        }
    }

    function renderCvView(key) {
        activeCvKey = key || activeCvKey || 'doc-cv';
        const data = activeCvTemplates[activeCvKey] || activeCvTemplates['doc-cv'];
        if (cvReaderBox && data) {
            cvReaderBox.innerHTML = data.renderHtml;
        }
    }

    // Initialize CV display with real profile
    renderCvView('doc-cv');

    // Event delegation for CV subtabs & My CV copy button
    document.addEventListener('click', (e) => {
        const subtabBtn = e.target.closest('.cv-subtab-btn');
        if (subtabBtn) {
            e.preventDefault();
            const allSubtabs = document.querySelectorAll('.cv-subtab-btn');
            allSubtabs.forEach(b => b.classList.remove('active'));
            subtabBtn.classList.add('active');
            const viewKey = subtabBtn.getAttribute('data-cv-view');
            renderCvView(viewKey);
            return;
        }

        const myCvBtn = e.target.closest('#btn-my-cv');
        if (myCvBtn) {
            e.preventDefault();
            const data = activeCvTemplates[activeCvKey] || activeCvTemplates['doc-cv'];
            if (data && data.copyText) {
                safeCopyText(data.copyText, `[MY CV] Copied ${data.title} to clipboard!`);
            }
            return;
        }
    });

    // ==================== REAL CV CUSTOMIZER & LIVE MODAL CONTROLLER ====================
    const cvEditorModal = document.getElementById('cv-real-editor-modal');
    const btnOpenEditor = document.getElementById('btn-edit-real-cv');
    const btnTriggerEditor = document.getElementById('btn-trigger-edit-cv');
    const btnCloseEditor = document.getElementById('btn-close-cv-editor');
    const backdropEditor = document.getElementById('cv-editor-backdrop');
    const formRealCv = document.getElementById('real-cv-form');
    const btnResetCv = document.getElementById('btn-reset-real-cv');

    function openCvEditor() {
        if (!cvEditorModal) return;
        const nameIn = document.getElementById('cv-input-name');
        const phoneIn = document.getElementById('cv-input-phone');
        const emailIn = document.getElementById('cv-input-email');
        const locIn = document.getElementById('cv-input-location');
        const titleIn = document.getElementById('cv-input-title');
        const profileIn = document.getElementById('cv-input-profile');
        const expIn = document.getElementById('cv-input-experience');
        const eduIn = document.getElementById('cv-input-education');
        const skillsIn = document.getElementById('cv-input-skills');
        const rawIn = document.getElementById('cv-input-raw');

        if (nameIn) nameIn.value = userProfile.name || '';
        if (phoneIn) phoneIn.value = userProfile.phone || '';
        if (emailIn) emailIn.value = userProfile.email || '';
        if (locIn) locIn.value = userProfile.location || '';
        if (titleIn) titleIn.value = userProfile.title || '';
        if (profileIn) profileIn.value = userProfile.profile || '';

        if (expIn) {
            if (Array.isArray(userProfile.experience)) {
                expIn.value = userProfile.experience.map(e => `${e.role} | ${e.company} (${e.dates}):\n${(e.bullets || []).map(b => '- ' + b).join('\n')}`).join('\n\n');
            } else {
                expIn.value = userProfile.experience || '';
            }
        }

        if (eduIn) {
            if (Array.isArray(userProfile.education)) {
                eduIn.value = userProfile.education.join('\n');
            } else {
                eduIn.value = userProfile.education || '';
            }
        }

        if (skillsIn) {
            if (Array.isArray(userProfile.skills)) {
                skillsIn.value = userProfile.skills.join('\n');
            } else {
                skillsIn.value = userProfile.skills || '';
            }
        }

        if (rawIn) rawIn.value = userProfile.rawCv || '';

        cvEditorModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCvEditor() {
        if (!cvEditorModal) return;
        cvEditorModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (btnOpenEditor) btnOpenEditor.addEventListener('click', (e) => { e.preventDefault(); openCvEditor(); });
    if (btnTriggerEditor) btnTriggerEditor.addEventListener('click', (e) => { e.preventDefault(); openCvEditor(); });
    if (btnCloseEditor) btnCloseEditor.addEventListener('click', (e) => { e.preventDefault(); closeCvEditor(); });
    if (backdropEditor) backdropEditor.addEventListener('click', closeCvEditor);

    if (formRealCv) {
        formRealCv.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameVal = document.getElementById('cv-input-name').value.trim();
            const phoneVal = document.getElementById('cv-input-phone').value.trim();
            const emailVal = document.getElementById('cv-input-email').value.trim();
            const locVal = document.getElementById('cv-input-location').value.trim();
            const titleVal = document.getElementById('cv-input-title').value.trim();
            const profileVal = document.getElementById('cv-input-profile').value.trim();
            const expVal = document.getElementById('cv-input-experience').value.trim();
            const eduVal = document.getElementById('cv-input-education').value.trim();
            const skillsVal = document.getElementById('cv-input-skills').value.trim();
            const rawVal = document.getElementById('cv-input-raw').value.trim();

            if (nameVal) userProfile.name = nameVal;
            if (phoneVal) userProfile.phone = phoneVal;
            if (emailVal) userProfile.email = emailVal;
            if (locVal) userProfile.location = locVal;
            if (titleVal) userProfile.title = titleVal;
            if (profileVal) userProfile.profile = profileVal;
            if (expVal) userProfile.experience = expVal;
            if (eduVal) userProfile.education = eduVal.split('\n').filter(Boolean);
            if (skillsVal) userProfile.skills = skillsVal.split('\n').filter(Boolean);
            userProfile.rawCv = rawVal;

            try {
                localStorage.setItem('ravana_user_real_cv', JSON.stringify(userProfile));
            } catch (err) {}

            activeCvTemplates = buildCvTemplates(userProfile);
            renderCvView(activeCvKey);
            closeCvEditor();
            showLabToast('100% Real CV details saved and applied live!');
        });
    }

    if (btnResetCv) {
        btnResetCv.addEventListener('click', () => {
            try {
                localStorage.removeItem('ravana_user_real_cv');
            } catch (err) {}
            userProfile = { ...DEFAULT_PROFILE };
            activeCvTemplates = buildCvTemplates(userProfile);
            renderCvView(activeCvKey);
            closeCvEditor();
            showLabToast('Reset to standard templates');
        });
    }
})();

