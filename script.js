/* ============================================
   Gowdul Aalam M — Portfolio Script
   Enhanced with Micro-interactions & 3D Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSpotlight();
    initScrollSpy();
    initSmoothScroll();
    initProofOfWorkToggle();
    initScrollReveal();
    init3DTilt();
    initMagneticButtons();
});

/* ============================================
   MOUSE-FOLLOW SPOTLIGHT (Flashlight)
   ============================================ */

function initSpotlight() {
    const spotlight = document.getElementById('spotlight');
    if (!spotlight || window.innerWidth < 1024) return;

    document.addEventListener('mousemove', (e) => {
        spotlight.style.background = `radial-gradient(
            800px circle at ${e.clientX}px ${e.clientY}px,
            rgba(29, 78, 216, 0.07),
            transparent 100%
        )`;
    });
}

/* ============================================
   SCROLL-SPY NAV HIGHLIGHTING
   ============================================ */

function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.dataset.section === id);
                    });
                }
            });
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ============================================
   PROOF OF WORK TOGGLE
   ============================================ */

function initProofOfWorkToggle() {
    const toggles = document.querySelectorAll('.pow__toggle');

    toggles.forEach((toggle) => {
        const panelId = toggle.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (!panel) return;

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                toggle.setAttribute('aria-expanded', 'false');
                panel.setAttribute('aria-hidden', 'true');
            } else {
                toggle.setAttribute('aria-expanded', 'true');
                panel.setAttribute('aria-hidden', 'false');

                setTimeout(() => {
                    const rect = panel.getBoundingClientRect();
                    if (rect.bottom > window.innerHeight) {
                        const scrollTarget = window.pageYOffset + rect.top - 100;
                        window.scrollTo({
                            top: scrollTarget,
                            behavior: 'smooth',
                        });
                    }
                }, 250);
            }
        });
    });
}


/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    reveals.forEach(reveal => observer.observe(reveal));
}

/* ============================================
   3D CARD TILT EFFECT
   ============================================ */

function init3DTilt() {
    if (window.innerWidth < 1024) return; // Disable on touch devices

    const wrappers = document.querySelectorAll('.card-tilt-wrapper');
    
    wrappers.forEach(wrapper => {
        const card = wrapper.querySelector('.experience__card, .work__card');
        if (!card) return;

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            // Calculate mouse position relative to the center of the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 6 degrees)
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */

function initMagneticButtons() {
    if (window.innerWidth < 1024) return;

    const magnetics = document.querySelectorAll('.magnetic');
    
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move button towards the mouse (by a fraction of the distance)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}
