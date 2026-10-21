// Shared page chrome and HTML helpers.
import config from '../site.config.mjs';
import photos from './data/photos.mjs';

export const brand = config.brand;
export const contact = config.contact;

// Escape text for HTML. Template literals in pages use this for any value that
// is data rather than markup.
export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const UTM = `utm_source=${encodeURIComponent(brand.name.toLowerCase().replace(/\W+/g, '_'))}&utm_medium=referral`;

// Track which photos each build uses, so the credits page lists exactly those.
export const usedPhotos = new Set();

// Photos come from Unsplash (default) or Pexels (`source: 'pexels'`); both
// CDNs resize and crop on the fly from URL parameters.
function photoSrc(p, w, h) {
  if (p.source === 'pexels') {
    return `${p.raw}?auto=compress&cs=tinysrgb&w=${w}${h ? `&h=${h}&fit=crop` : ''}`;
  }
  const crop = h ? `&h=${h}&fit=crop&crop=entropy` : '&fit=max';
  return `${p.raw}?auto=format&q=70&w=${w}${crop}`;
}

/**
 * Responsive, credited photo (Unsplash or Pexels).
 * @param {string} key   key in src/data/photos.mjs
 * @param {object} opts  { ratio: [w,h] crop ratio, sizes, eager, caption, className }
 */
export function photo(key, opts = {}) {
  const p = photos[key];
  if (!p) throw new Error(`Unknown photo key: ${key}`);
  usedPhotos.add(key);
  const [rw, rh] = opts.ratio || [3, 2];
  const widths = [480, 800, 1200, 1600, 2000];
  const srcset = widths
    .map((w) => `${photoSrc(p, w, Math.round((w * rh) / rw))} ${w}w`)
    .join(', ');
  const sizes = opts.sizes || '(min-width: 64rem) 50vw, 100vw';
  const loading = opts.eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  return `<figure class="photo ${opts.className || ''}">
  <img src="${photoSrc(p, 1200, Math.round((1200 * rh) / rw))}" srcset="${srcset}" sizes="${sizes}"
    width="${rw * 400}" height="${rh * 400}" alt="${esc(p.alt)}" ${loading}
    style="background:${p.color || '#D6D0C6'}">
  <figcaption>${opts.caption ? `${opts.caption} · ` : ''}${credit(p)}</figcaption>
</figure>`;
}

export function credit(p) {
  if (p.source === 'pexels') {
    return `<span class="credit">Photo: <a href="https://www.pexels.com/@${p.username}/">${esc(p.user)}</a> on <a href="https://www.pexels.com/photo/${p.id}/">Pexels</a></span>`;
  }
  return `<span class="credit">Photo: <a href="https://unsplash.com/@${p.username}?${UTM}">${esc(p.user)}</a> on <a href="https://unsplash.com/photos/${p.id}?${UTM}">Unsplash</a></span>`;
}

export function photoMeta(key) {
  return photos[key];
}

export function photoUrl(key, w = 1200, h = 630) {
  usedPhotos.add(key);
  return photoSrc(photos[key], w, h);
}

const nav = [
  ['/destinations/', 'Destinations'],
  ['/journeys/', 'Journeys'],
  ['/when-to-go/', 'When to go'],
  ['/guiding/', 'Guiding'],
  ['/stays/', 'Stays'],
  ['/journal/', 'Journal'],
  ['/about/', 'About'],
];

const mark = `<svg class="mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M9 20c0-5 2-9 2-13M16 20c0-6 1-10 1-15M23 20c0-5-1-8-2-12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M4 24c4 0 4 2 8 2s4-2 8-2 4 2 8 2" fill="none" stroke="var(--copper)" stroke-width="2.4" stroke-linecap="round"/></svg>`;

function header(path) {
  const links = nav
    .map(
      ([href, label]) =>
        `<li><a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a></li>`,
    )
    .join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="logo" href="/">${brand.showMark ? mark : ''}<span>${esc(brand.name)}</span></a>
    <nav aria-label="Main">
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-list" hidden>
        <span class="nav-toggle-bars" aria-hidden="true"></span><span class="nav-toggle-label">Menu</span>
      </button>
      <ul id="nav-list" class="nav-list">${links}<li><a class="btn btn-small" href="/enquire/"${path.startsWith('/enquire') ? ' aria-current="page"' : ''}>Enquire</a></li></ul>
    </nav>
  </div>
</header>`;
}

function footer() {
  const wa = contact.whatsapp
    ? `<li><a href="https://wa.me/${contact.whatsapp}">WhatsApp</a></li>`
    : '';
  const social = config.social.map((s) => `<li><a href="${s.url}">${esc(s.label)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <p class="footer-brand">${esc(brand.name)}</p>
      <p>${esc(brand.nameStory)}</p>
    </div>
    <div>
      <h2 class="footer-h">Talk to us</h2>
      <ul class="plain">
        <li><a href="mailto:${contact.email}">${esc(contact.email)}</a></li>
        <li><a href="tel:${contact.phone.replace(/[^+\d]/g, '')}">${esc(contact.phone)}</a></li>
        ${wa}
        <li>${esc(contact.address)}</li>
        <li>${esc(contact.hours)}</li>
      </ul>
    </div>
    <div>
      <h2 class="footer-h">Explore</h2>
      <ul class="plain">
        <li><a href="/victoria-falls-by-month/">Victoria Falls by month</a></li>
        <li><a href="/guiding/">Why Zimbabwe guides</a></li>
        <li><a href="/when-to-go/">When to go</a></li>
        <li><a href="/enquire/">Plan a journey</a></li>
        <li><a href="/credits/">Photo credits</a></li>
        ${social}
      </ul>
    </div>
  </div>
  <div class="wrap footer-small">
    <p>© ${new Date().getFullYear()} ${esc(brand.name)}. Fees, visa rules and seasons change: we confirm every detail in writing before you book.</p>
  </div>
</footer>`;
}

export function page({ path, title, description, body, image = 'vf-hero', bodyClass = '' }) {
  const fullTitle = path === '/' ? `${brand.name}: ${brand.tagline}` : `${title} · ${brand.name}`;
  const url = config.site.url + path;
  return `<!doctype html>
<html lang="${config.site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="${config.palette.zambezi}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(brand.name)}">
<meta property="og:locale" content="${config.site.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${photoUrl(image)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="preconnect" href="https://images.pexels.com">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script>document.documentElement.classList.add('js')</script>
<link rel="stylesheet" href="/styles.css?v=__BUILD__">
<script src="/main.js?v=__BUILD__" defer></script>
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>`;
}

// Small shared fragments ---------------------------------------------------

export function pageHead({ eyebrow, title, lede, photoKey, caption }) {
  if (photoKey) {
    return `<section class="page-hero">
  ${photo(photoKey, { ratio: [16, 9], sizes: '100vw', eager: true, className: 'page-hero-photo', caption })}
  <div class="page-hero-text wrap">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
  </div>
</section>`;
  }
  return `<section class="page-head wrap">
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h1>${title}</h1>
  ${lede ? `<p class="lede">${lede}</p>` : ''}
</section>`;
}

export function cta(text = 'Tell us roughly when you want to travel and what matters to you. We reply with ideas, honest costs and the best months for what you want to see.') {
  return `<section class="cta band band-green">
  <div class="wrap cta-inner">
    <h2>Start with a conversation</h2>
    <p>${text}</p>
    <p><a class="btn btn-light" href="/enquire/">Make an enquiry</a></p>
  </div>
</section>`;
}

// Inline "check this" marker for facts listed in FACTS-TO-VERIFY.md. Renders
// nothing visible; it keeps the claim traceable in the source.
export const verify = (id) => `<!-- verify:${id} -->`;
