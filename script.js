/* =============================================
   TAUJI KA CHURAN — Interactions & Animations
   ============================================= */

/* ─── Navbar: add "scrolled" class on scroll ─── */
const navbar = document.getElementById('navbar');

function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* ─── Mobile drawer ─── */
const hamburger     = document.getElementById('hamburger');
const drawer        = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose   = document.getElementById('drawerClose');

function openDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.add('visible');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('visible');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// Close drawer when a link inside it is clicked
document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
});


/* ─── Scroll-reveal via IntersectionObserver ─── */
const revealTargets = document.querySelectorAll(
    '.reveal, .reveal-d1, .reveal-d2, .reveal-d3, .reveal-d4, .reveal-d5'
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    },
    { threshold: 0.10, rootMargin: '0px 0px -36px 0px' }
);

revealTargets.forEach(el => revealObserver.observe(el));


/* ─── Smooth scroll for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


/* ─── Contact form → opens WhatsApp with prefilled message ─── */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('fname').value.trim();
    const phone   = document.getElementById('fphone').value.trim();
    const message = document.getElementById('fmsg').value.trim();

    if (!name || !message) {
        alert('Please fill in your name and message.');
        return;
    }

    const parts = [`Hello Tauji, my name is ${name}.`];
    if (phone) parts.push(`My phone number is ${phone}.`);
    parts.push(message);

    const waText = encodeURIComponent(parts.join(' '));
    window.open(`https://wa.me/919816345882?text=${waText}`, '_blank', 'noopener,noreferrer');
});


/* ─── Stagger product cards on scroll entry ─── */
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

const trustItems = document.querySelectorAll('.trust-item');
trustItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.10}s`;
});
