/* ============================================================
   shared.js — Premium animations + interactions
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
  const savedLang = localStorage.getItem('siteLang') || 'es';
  setLang(savedLang);

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
  });

  function setLang(lang) {
    localStorage.setItem('siteLang', lang);
    document.body.classList.toggle('lang-en', lang === 'en');
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
      hamburger.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ── Scroll reveal (staggered) ── */
  const allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (allReveal.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    allReveal.forEach(el => observer.observe(el));
  }

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Cursor glow (desktop) ── */
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);
  let glowX = 0, glowY = 0, curX = 0, curY = 0;
  window.addEventListener('mousemove', e => { curX = e.clientX; curY = e.clientY; });
  (function animateGlow() {
    glowX += (curX - glowX) * 0.08;
    glowY += (curY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  })();

  /* ── Parallax hero ── */
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  if (parallaxImgs.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxImgs.forEach(img => {
        const speed = parseFloat(img.dataset.speed || 0.25);
        img.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  /* ── Card tilt on hover (subtle 3D) ── */
  document.querySelectorAll('.card-tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Magnetic buttons ── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.25;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ── Smooth page transitions ── */
  const pt = document.getElementById('page-transition');
  if (pt) {
    document.querySelectorAll('a[href]').forEach(a => {
      const h = a.getAttribute('href');
      if (!h || h.startsWith('#') || h.startsWith('tel:') ||
          h.startsWith('mailto:') || h.startsWith('http') || a.target === '_blank') return;
      a.addEventListener('click', e => {
        e.preventDefault();
        pt.classList.add('entering');
        setTimeout(() => window.location.href = h, 480);
      });
    });
    window.addEventListener('pageshow', () => {
      pt.classList.remove('entering');
      pt.classList.add('leaving');
      setTimeout(() => pt.classList.remove('leaving'), 500);
    });
  }

  /* ── Number counter ── */
  const counterOb = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target;
      let n = 0, step = target / (1800 / 16);
      const t = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = target >= 100 ? Math.floor(n).toLocaleString() : Math.floor(n);
      }, 16);
      counterOb.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count').forEach(c => counterOb.observe(c));

});