/* ─────────────────────────────────────────────
   Subhashish Bhattacharya — Portfolio Scripts
   subhashish53.netlify.app
   ───────────────────────────────────────────── */

// ── Typed text effect ──────────────────────────────────────────────────────
const phrases = [
  'Senior Cybersecurity Engineer',
  'SOC Operations Lead',
  'Threat Hunter',
  'Incident Responder',
  'Cloud Security Architect',
  'SIEM/SOAR Specialist'
];
let i = 0, j = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
function type() {
  const current = phrases[i];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++j);
    if (j === current.length) { deleting = true; setTimeout(type, 2200); return; }
  } else {
    typedEl.textContent = current.slice(0, --j);
    if (j === 0) { deleting = false; i = (i + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 90);
}
type();

// ── Scroll reveal ──────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: show everything immediately if IntersectionObserver not supported
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── Active nav link on scroll ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObserver.observe(s));

// ── Mobile hamburger menu ──────────────────────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
// Close menu when a link is clicked
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});
// Close menu on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }
});

// ── Contact form (Netlify) ─────────────────────────────────────────────────
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    // Reset status from any previous attempt
    status.className = 'form-status';
    btn.textContent = 'Sending\u2026';
    btn.disabled = true;
    try {
      const data = new FormData(form);
      const res = await fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      if (res.ok) {
        status.textContent = '\u2714 Message sent \u2014 I\'ll be in touch shortly.';
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Server error: ' + res.status);
      }
    } catch (err) {
      status.textContent = '\u2718 Something went wrong. Please email me directly.';
      status.className = 'form-status error';
    } finally {
      btn.textContent = 'Send Message \u25ba';
      btn.disabled = false;
    }
  });
}
