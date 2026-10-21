// Quality checks on the built site. Run `npm run build && npm run check`.
//  1. WCAG AA contrast for every palette pair listed in site.config.mjs
//  2. Every internal link and asset in dist/ resolves
//  3. Every <img> has alt text and every Unsplash photo has a visible credit
//  4. Every [F#] fact marker in src/ has an entry in FACTS-TO-VERIFY.md
import fs from 'node:fs';
import path from 'node:path';
import config from '../site.config.mjs';

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`✗ ${msg}`);
};

// 1. Contrast -----------------------------------------------------------
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
for (const [fg, bg, min] of config.contrastPairs) {
  const r = ratio(config.palette[fg], config.palette[bg]);
  if (r < min) fail(`Contrast ${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1`);
}
console.log(`Contrast: ${config.contrastPairs.length} pairs checked`);

// 2 & 3. Links, images, credits ----------------------------------------
const files = [];
const walk = (dir) => {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.html')) files.push(full);
  }
};
walk('dist');
const exists = (url) => {
  const clean = url.split(/[?#]/)[0];
  if (!clean) return true;
  const p = path.join('dist', clean);
  return fs.existsSync(clean.endsWith('/') ? path.join(p, 'index.html') : p);
};
let links = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    links++;
    if (!exists(url)) fail(`${file}: broken link ${url}`);
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(tag)) fail(`${file}: image without alt text`);
  }
  const imgs = (html.match(/<img\b[^>]*images\.unsplash\.com/g) || []).length;
  const credits = (html.match(/class="credit"/g) || []).length;
  if (credits < imgs) fail(`${file}: ${imgs} Unsplash images but ${credits} credits`);
  if (/\[F\d+\]/.test(html.replace(/<!--[\s\S]*?-->/g, ''))) fail(`${file}: visible fact marker`);
}
console.log(`Links: ${links} internal links in ${files.length} pages checked`);

// 4. Fact markers ---------------------------------------------------------
const facts = fs.readFileSync('FACTS-TO-VERIFY.md', 'utf8');
const used = new Set();
const scan = (dir) => {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) scan(full);
    else for (const [, n] of fs.readFileSync(full, 'utf8').matchAll(/\[F(\d+)\]/g)) used.add(n);
  }
};
scan('src');
for (const n of used) {
  if (!new RegExp(`\\*\\*F${n}\\*\\*`).test(facts)) fail(`[F${n}] is used in src/ but missing from FACTS-TO-VERIFY.md`);
}
console.log(`Facts: ${used.size} markers checked against FACTS-TO-VERIFY.md`);

if (failures) {
  console.error(`\n${failures} problem(s) found`);
  process.exit(1);
}
console.log('\nAll checks passed');
