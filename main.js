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
    { id: 'systems', route: '/systems', label: 'SYSTEMS', title: 'SYSTEMS // RAVANA TECH | Web, Software & AI' },
    { id: 'projects', route: '/projects', label: 'PROJECTS', title: 'PROJECTS // RAVANA TECH | Web, Software & AI' },
    { id: 'contact', route: '/contact', label: 'CONTACT', title: 'CONTACT // RAVANA TECH | Web, Software & AI' }
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

    // 4. Update Prev / Next Buttons State
    const prevBtn = document.getElementById('deck-prev-btn');
    const nextBtn = document.getElementById('deck-next-btn');
    if (prevBtn) prevBtn.disabled = nextIndex === 0;
    if (nextBtn) nextBtn.disabled = nextIndex === SCREENS.length - 1;

    // 5. Update Browser URL and History
    if (updateHistory) {
        const targetUrl = nextScreen.route;
        if (window.location.pathname !== targetUrl) {
            window.history.pushState({ screenIndex: nextIndex, screenId: nextScreen.id }, '', targetUrl);
        }
    }

    // 6. Update Document Title
    document.title = nextScreen.title;

    // 7. Close Mobile Menu if open
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

// Keyboard Hotkey Navigation (Left/Right Arrows, PageUp/Down, 1-5 keys)
window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

    const modal = document.getElementById('gallery-preview-modal');
    if (modal && modal.classList.contains('active')) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentScreenIndex < SCREENS.length - 1) switchScreen(currentScreenIndex + 1, true);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentScreenIndex > 0) switchScreen(currentScreenIndex - 1, true);
    } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        switchScreen(parseInt(e.key, 10) - 1, true);
    }
});

// Debounced Mouse Wheel Navigation
window.addEventListener('wheel', (e) => {
    const modal = document.getElementById('gallery-preview-modal');
    if (modal && modal.classList.contains('active')) return;

    const activeScreenEl = document.querySelector('.deck-screen.deck-screen-active');
    if (activeScreenEl) {
        const atTop = activeScreenEl.scrollTop <= 2;
        const atBottom = activeScreenEl.scrollTop + activeScreenEl.clientHeight >= activeScreenEl.scrollHeight - 2;

        if (e.deltaY > 60 && atBottom) {
            if (isSwitching) return;
            if (currentScreenIndex < SCREENS.length - 1) {
                isSwitching = true;
                switchScreen(currentScreenIndex + 1, true);
                setTimeout(() => { isSwitching = false; }, 450);
            }
        } else if (e.deltaY < -60 && atTop) {
            if (isSwitching) return;
            if (currentScreenIndex > 0) {
                isSwitching = true;
                switchScreen(currentScreenIndex - 1, true);
                setTimeout(() => { isSwitching = false; }, 450);
            }
        }
    }
}, { passive: true });

// Mobile Touch Swipe Navigation
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

    if (e.changedTouches && e.changedTouches.length) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
            if (diffX < 0 && currentScreenIndex < SCREENS.length - 1) {
                switchScreen(currentScreenIndex + 1, true);
            } else if (diffX > 0 && currentScreenIndex > 0) {
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
