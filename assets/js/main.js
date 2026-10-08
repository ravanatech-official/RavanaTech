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

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 75,
              sectionId = current.getAttribute('id'),
              sectionLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionLink) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionLink.classList.add('active-link');
            } else {
                sectionLink.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*==================== SCROLL REVEAL ANIMATION (FAST & SNAPPY 700MS) ====================*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '40px',
        duration: 700,
        delay: 100,
        reset: false
    });

    sr.reveal('.home__data, .about__photo-panel, .section-meta, .section-title', {});
    sr.reveal('.home__hud-core, .about__content', { delay: 200, origin: 'bottom' });
    sr.reveal('.system__card', { interval: 100, distance: '30px' });
    sr.reveal('.project__card', { interval: 100, distance: '30px' });
    sr.reveal('.contact__channels-panel', { origin: 'left', distance: '40px' });
    sr.reveal('.contact__form-panel', { origin: 'right', distance: '40px' });
}

/*==================== TRANSMISSION FORM DISPATCH ====================*/
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('sender-name').value.trim();
        const email = document.getElementById('sender-email').value.trim();
        const system = document.getElementById('sender-system').value;
        const message = document.getElementById('sender-message').value.trim();
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        if (!name || !email || !message) {
            formFeedback.className = 'form__status-msg error';
            formFeedback.textContent = '[ ERROR: ALL TELEMETRY FIELDS ARE REQUIRED ]';
            return;
        }

        // Animated HUD sending state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> ENCRYPTING & TRANSMITTING...";

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "<i class='bx bx-check-circle'></i> TRANSMISSION SENT";

            formFeedback.className = 'form__status-msg success';
            formFeedback.innerHTML = `[ TRANSMISSION LOGGED // DISPATCH CONFIRMED ]<br>SYSTEM: ${system} • FREQUENCY: ${email}<br>WE WILL COMMUNICATE WITH YOU VIA SECURE PROTOCOL SHORTLY.`;

            // Prepare mailto fallback link in case user wants immediate email client copy
            const subject = encodeURIComponent(`[RAVANA TECH INQUIRY] - ${system} from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSystem Domain: ${system}\n\nProject Scope & Message:\n${message}`);
            const mailtoUrl = `mailto:hello.ravanatech@gmail.com?subject=${subject}&body=${body}`;

            const emailLink = document.createElement('a');
            emailLink.href = mailtoUrl;
            emailLink.target = '_blank';
            emailLink.style.display = 'block';
            emailLink.style.marginTop = '0.5rem';
            emailLink.style.color = 'var(--rt-cyan-bright)';
            emailLink.style.fontSize = '0.72rem';
            emailLink.textContent = '→ OPEN IN DESKTOP EMAIL CLIENT AS BACKUP';
            formFeedback.appendChild(emailLink);

            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
            }, 6000);
        }, 1200);
    });
}
