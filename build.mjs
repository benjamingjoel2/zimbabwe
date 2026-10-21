// Static site build: renders every page in src/pages to dist/.
// No dependencies; needs Node 18+. Run with `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import config from './site.config.mjs';
import { page } from './src/layout.mjs';
import home from './src/pages/home.mjs';
import destinations from './src/pages/destinations.mjs';
import falls from './src/pages/falls.mjs';
import guiding from './src/pages/guiding.mjs';
import journeys from './src/pages/journeys.mjs';
import when from './src/pages/when.mjs';
import misc, { creditsPage } from './src/pages/misc.mjs';

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

// Pages. Credits go last so they list exactly the photos used elsewhere.
const pages = [home, destinations, falls, guiding, journeys, when, misc].flatMap((fn) => fn());
pages.push(creditsPage());

const seen = new Set();
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
}

// Sitemap and robots.
const urls = pages
  .filter((pg) => !pg.path.endsWith('.html') && !pg.path.includes('thanks'))
  .map((pg) => `  <url><loc>${config.site.url}${pg.path}</loc></url>`)
  .join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${config.site.url}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages to ${OUT}/ (assets v${version})`);
