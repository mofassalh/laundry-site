/* ============================================================
   shared.js — Used by ALL pages
   - Navbar scroll effect
   - Language switcher (ES / EN)
   - Mobile menu
   - Scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Language switcher ── */
  // Load saved preference
  const savedLang = localStorage.getItem('siteLang') || 'es';
  setLang(savedLang);

  // Button clicks (desktop + mobile)
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.langBtn);
    });
  });

  function setLang(lang) {
    localStorage.setItem('siteLang', lang);
    if (lang === 'en') {
      document.body.classList.add('lang-en');
    } else {
      document.body.classList.remove('lang-en');
    }
    // Update button active states
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langBtn === lang);
    });
  }

  /* ── Mobile menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      // Animate hamburger lines
      hamburger.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
