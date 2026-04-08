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

// ── Contact form (mailto — works on all static hosts) ─────────────────────
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const subject = encodeURIComponent('Portfolio Enquiry from ' + name);
    const body    = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      message
    );

    // Open the user\'s email client with fields pre-filled
    window.location.href = 'mailto:subhashish53@gmail.com?subject=' + subject + '&body=' + body;

    // Show confirmation
    status.textContent = '\u2714 Your email client has opened \u2014 please send the message from there.';
    status.className = 'form-status success';
    form.reset();
  });
}
