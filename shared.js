/* ============================================================
   shared.js — Premium animations v2
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll progress bar ── */
  const prog = document.createElement('div');
  prog.id = 'scroll-progress';
  document.body.prepend(prog);
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (window.scrollY / docH * 100) + '%';
  });

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

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll reveal (all types) ── */
  const allReveal = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-card'
  );
  if (allReveal.length) {
    const revealOb = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 75);
          revealOb.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    allReveal.forEach(el => revealOb.observe(el));
  }

  /* ── Split text animation ── */
  document.querySelectorAll('.split-text').forEach(el => {
    const words = el.innerText.split(' ');
    el.innerHTML = words.map(w =>
      `<span class="split-word">${w}</span>`
    ).join(' ');
    const spans = el.querySelectorAll('.split-word');
    const ob = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        spans.forEach((s, i) => {
          setTimeout(() => s.classList.add('visible'), i * 100);
        });
        ob.disconnect();
      }
    }, { threshold: 0.3 });
    ob.observe(el);
  });

  /* ── Cursor glow (desktop only) ── */
  if (window.innerWidth > 768) {
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
  }

  /* ── Parallax hero images ── */
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  if (parallaxImgs.length) {
    window.addEventListener('scroll', () => {
      parallaxImgs.forEach(img => {
        const speed = parseFloat(img.dataset.speed || 0.2);
        img.style.transform = `translateY(${window.scrollY * speed}px)`;
      });
    });
  }

  /* ── Card 3D tilt ── */
  document.querySelectorAll('.card-tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform =
        `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform = '';
      setTimeout(() => card.style.transition = '', 500);
    });
  });

  /* ── Magnetic buttons ── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.22;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.22;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      btn.style.transform = '';
    });
  });

  /* ── Number counter ── */
  const counterOb = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target;
      let n = 0;
      const step = target / (1800 / 16);
      const t = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = target >= 100
          ? Math.floor(n).toLocaleString()
          : Math.floor(n);
      }, 16);
      counterOb.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count').forEach(c => counterOb.observe(c));

  /* ── Smooth page transitions ── */
  const pt = document.getElementById('page-transition');
  if (pt) {
    document.querySelectorAll('a[href]').forEach(a => {
      const h = a.getAttribute('href');
      if (!h || h.startsWith('#') || h.startsWith('tel:') ||
          h.startsWith('mailto:') || h.startsWith('http') ||
          a.target === '_blank') return;
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

});