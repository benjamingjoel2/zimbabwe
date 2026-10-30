// Static site build: renders every page in src/pages to dist/.
// No dependencies; needs Node 18+. Run with `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import config from './site.config.mjs';
import { page } from './src/layout.mjs';
import home from './src/pages/home.mjs';
import destinations from './src/pages/destinations.mjs';
import falls from './src/pages/falls.mjs';
import guiding from './src/pages/guiding.mjs';
import journeys from './src/pages/journeys.mjs';
import when from './src/pages/when.mjs';
import misc from './src/pages/misc.mjs';
import { locales } from './src/layout.mjs';

const require = createRequire(import.meta.url);
const i18n = require('./scripts/i18n-static.cjs');

const OUT = 'dist';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const write = (file, content) => {
  const full = path.join(OUT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
};

// CSS: palette tokens from the config, then the stylesheet.
const tokens = Object.entries(config.palette)
  .map(([k, v]) => `  --${k}: ${v};`)
  .join('\n');
const css = `:root {\n${tokens}\n}\n${fs.readFileSync('src/styles.css', 'utf8')}`;
const js = fs.readFileSync('src/main.js', 'utf8');
const version = crypto.createHash('sha1').update(css + js).digest('hex').slice(0, 8);
write('styles.css', css);
write('main.js', js);

// Favicon in brand colours.
const p = config.palette;
write(
  'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="${p.zambezi}"/><path d="M9 20c0-5 2-9 2-13M16 20c0-6 1-10 1-15M23 20c0-5-1-8-2-12" fill="none" stroke="${p.offwhite}" stroke-width="2.4" stroke-linecap="round"/><path d="M4 25c4 0 4 2 8 2s4-2 8-2 4 2 8 2" fill="none" stroke="${p.copperLight}" stroke-width="2.4" stroke-linecap="round"/></svg>`,
);

// Pages.
const pages = [home, destinations, falls, guiding, journeys, when, misc].flatMap((fn) => fn());

const seen = new Set();
const english = [];
for (const pg of pages) {
  if (seen.has(pg.path)) throw new Error(`Duplicate path ${pg.path}`);
  seen.add(pg.path);
  let html = page(pg)
    // [F12]-style markers point at FACTS-TO-VERIFY.md. Keep them in the
    // HTML source as comments, out of the visible text.
    .replace(/\s?\[F(\d+)\]/g, '<!-- F$1 -->')
    .replace(/__BUILD__/g, version);
  const file = pg.path.endsWith('.html') ? pg.path : path.join(pg.path, 'index.html');
  write(file, html);
  english.push({ file, html });
}

// Other languages: every English page is localised with src/i18n/<code>.json and
// written under /<code>/. `node build.mjs --extract` refreshes src/i18n/segments.json
// (every translatable string on the English site) for translators.
const segments = i18n.extract(english.map((p) => p.html));
if (process.argv.includes('--extract')) {
  fs.writeFileSync('src/i18n/segments.json', JSON.stringify(segments, null, 1) + '\n');
}
const isAsset = (url) => /\.(css|js|svg|xml|txt|png|jpe?g|webp|avif|ico|woff2?)(\?|$)/.test(url);
const ogLocale = { fr: 'fr_FR', de: 'de_DE', es: 'es_ES' };
const untranslated = {};
for (const loc of locales.filter((l) => l.code !== 'en')) {
  const dictFile = `src/i18n/${loc.code}.json`;
  const dict = fs.existsSync(dictFile) ? JSON.parse(fs.readFileSync(dictFile, 'utf8')) : {};
  const missing = new Set();
  for (const { file, html } of english) {
    let out = i18n.localize(html, { lang: loc.code, dict, prefix: loc.prefix, isAsset, siteUrl: config.site.url, ogLocale: ogLocale[loc.code], missing });
    out = out
      .replace(/data-locale-link="en" aria-current="true"/, 'data-locale-link="en"')
      .replace(`data-locale-link="${loc.code}"`, `data-locale-link="${loc.code}" aria-current="true"`);
    write(path.join(loc.code, file), out);
  }
  if (missing.size) untranslated[loc.code] = missing.size;
}
if (Object.keys(untranslated).length) {
  console.warn('Untranslated segments:', untranslated, '(run `node build.mjs --extract`, then translate src/i18n/segments.json)');
}

// Sitemap and robots.
const urls = pages
  .filter((pg) => !pg.path.endsWith('.html') && !pg.path.includes('thanks'))
  .flatMap((pg) => locales.map((l) => `  <url><loc>${config.site.url}${l.prefix}${pg.path}</loc></url>`))
  .join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${config.site.url}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages to ${OUT}/ (assets v${version})`);
