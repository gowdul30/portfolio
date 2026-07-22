/* ============================================================
   GOWDUL AALAM M — PORTFOLIO JAVASCRIPT
   Handles: Preloader, Nav, Scroll Reveal, Case Study Toggles,
            Mobile Menu, Scroll-Spy, Smooth Scroll
   ============================================================ */

'use strict';

/* ─── PRELOADER ─────────────────────────────────────────────── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Hide once page is fully loaded
  function hidePreloader() {
    preloader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 600);
  }

  if (document.readyState === 'complete') {
    // Already loaded (e.g., cached page)
    setTimeout(hidePreloader, 500);
  } else {
    window.addEventListener('load', function () {
      setTimeout(hidePreloader, 700);
    });
  }
})();


/* ─── NAVIGATION ─────────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const navLinks = document.querySelectorAll('.nav__link[data-section], .nav__mobile-link');

  if (!nav) return;

  // Scroll: add .scrolled class for backdrop blur
  let lastScroll = 0;
  function onScroll() {
    const y = window.scrollY;
    if (y > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on init

  // Mobile toggle
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navMobile.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close mobile menu when a link is clicked
    navMobile.querySelectorAll('.nav__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && navMobile.classList.contains('open')) {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Scroll-spy: highlight active nav link
  const sections = ['home', 'work', 'philosophy', 'stack', 'experience', 'oss', 'contact'];

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    let current = 'home';

    sections.forEach(function (id) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollY) {
        current = id;
      }
    });

    document.querySelectorAll('.nav__link[data-section]').forEach(function (link) {
      const section = link.getAttribute('data-section');
      link.classList.toggle('active', section === current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();


/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ─── SCROLL REVEAL ANIMATIONS ──────────────────────────────── */
(function initReveal() {
  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Just make everything visible immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Fire once
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ─── CASE STUDY TOGGLES ─────────────────────────────────────── */
(function initCaseStudyToggles() {
  const toggleButtons = document.querySelectorAll('.case-study-toggle');

  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Close
        btn.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
      } else {
        // Close any other open panels first
        document.querySelectorAll('.case-study-toggle[aria-expanded="true"]').forEach(function (otherBtn) {
          const otherId = otherBtn.getAttribute('data-target');
          const otherPanel = document.getElementById(otherId);
          if (otherPanel && otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherPanel.hidden = true;
          }
        });

        // Open this one
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;

        // Animate in
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(-8px)';
        requestAnimationFrame(function () {
          panel.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        });

        // Scroll panel into view smoothly
        setTimeout(function () {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
      }
    });
  });
})();


/* ─── HERO AGENT FLOW PULSE ANIMATION ───────────────────────── */
(function initAgentFlowAnimation() {
  // The CSS handles most animation; this adds sequential pulse via JS for extra effect
  const agents = document.querySelectorAll('.agent-flow__agent');
  if (!agents.length) return;

  let current = 0;
  function pulseNext() {
    agents.forEach(function (a) {
      a.style.borderColor = '';
      a.style.background = '';
      const dot = a.querySelector('.agent-flow__agent-dot');
      if (dot) dot.style.animationPlayState = 'paused';
    });

    const agent = agents[current];
    agent.style.borderColor = 'rgba(16,185,129,0.4)';
    agent.style.background = 'rgba(16,185,129,0.06)';
    const dot = agent.querySelector('.agent-flow__agent-dot');
    if (dot) dot.style.animationPlayState = 'running';

    current = (current + 1) % agents.length;
  }

  pulseNext();
  setInterval(pulseNext, 900);
})();


/* ─── COUNTER ANIMATION ─────────────────────────────────────── */
(function initCounters() {
  // Already removed from design, but kept as utility if needed
})();


/* ─── KEYBOARD NAVIGATION ───────────────────────────────────── */
(function initKeyboardNav() {
  // ESC closes mobile menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const navMobile = document.getElementById('navMobile');
      const navToggle = document.getElementById('navToggle');
      if (navMobile && navMobile.classList.contains('open')) {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.setAttribute('aria-hidden', 'true');
        navToggle.focus();
      }

      // Close any open case studies
      document.querySelectorAll('.case-study-toggle[aria-expanded="true"]').forEach(function (btn) {
        const targetId = btn.getAttribute('data-target');
        const panel = document.getElementById(targetId);
        if (panel) {
          btn.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
        }
      });
    }
  });
})();


/* ─── SCROLL-CUE FADE ON SCROLL ─────────────────────────────── */
(function initScrollCue() {
  const cue = document.querySelector('.scroll-cue');
  if (!cue) return;

  function updateCue() {
    cue.style.opacity = window.scrollY > 80 ? '0' : '1';
  }
  window.addEventListener('scroll', updateCue, { passive: true });
})();


/* ─── FOOTER YEAR (auto-update) ─────────────────────────────── */
(function updateFooterYear() {
  const footerCopy = document.querySelector('.footer__copy');
  if (!footerCopy) return;
  const year = new Date().getFullYear();
  footerCopy.textContent = '\u00A9 ' + year + ' \u00B7 Built for hiring managers, not bots.';
})();


/* ─── ACTIVE STATE ON NAV LOGO CLICK ────────────────────────── */
(function initLogoClick() {
  const logo = document.querySelector('.nav__logo');
  if (!logo) return;
  logo.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
