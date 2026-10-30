// Static-site localisation: builds /fr/, /de/, /es/ copies of the English HTML in dist/.
// Translation units ("segments") are the inline-only runs of text inside block elements
// (so a sentence keeps its links and emphasis), plus translatable attributes (alt,
// aria-label, title, placeholder, meta descriptions). Dictionaries live in
// src/i18n/<lang>.json as { "<segment id>": "<translated html>" }; ids are a short
// hash of the normalised English segment, listed in src/i18n/segments.json.
// No dependencies; nothing here runs in the browser.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'svg', 'textarea', 'template']);
const INLINE = new Set(['a', 'abbr', 'b', 'bdi', 'br', 'cite', 'code', 'em', 'i', 'kbd', 'mark', 'q', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'wbr']);
const ATTRS = ['alt', 'aria-label', 'title', 'placeholder', 'data-i18n'];

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const idOf = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);

function parse(html) {
  const root = { tag: '#root', children: [], start: 0, end: html.length };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
  let last = 0, m;
  const top = () => stack[stack.length - 1];
  const text = (a, b) => { if (b > a) top().children.push({ tag: '#text', start: a, end: b }); };
  while ((m = re.exec(html))) {
    text(last, m.index);
    last = re.lastIndex;
    const tok = m[0];
    if (tok.startsWith('<!')) { top().children.push({ tag: '#comment', start: m.index, end: last }); continue; }
    const tag = m[1].toLowerCase();
    if (tok[1] === '/') {
      for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag === tag) { stack[i].end = last; stack[i].innerEnd = m.index; stack.length = i; break; }
      continue;
    }
    const el = { tag, start: m.index, openEnd: last, attrs: m[2] || '', children: [] };
    top().children.push(el);
    if (VOID.has(tag) || tok.endsWith('/>')) { el.end = last; el.innerEnd = last; continue; }
    if (RAW.has(tag)) {
      const close = html.toLowerCase().indexOf(`</${tag}`, last);
      const ce = html.indexOf('>', close) + 1;
      el.innerEnd = close; el.end = ce; el.raw = true; last = re.lastIndex = ce; continue;
    }
    stack.push(el);
  }
  text(last, html.length);
  return root;
}

const inlineOnly = (n) => n.tag === '#text' || n.tag === '#comment' || (INLINE.has(n.tag) && !n.raw && n.children.every(inlineOnly));

/** Text segments: [{ start, end, key }] (key = normalised source html) */
function segments(html) {
  const out = [];
  (function walk(node) {
    if (node.raw || node.tag === '#text' || node.tag === '#comment') return;
    let run = [];
    const flush = () => {
      if (!run.length) return;
      // A run that is just one wrapping inline element (e.g. a link): translate its contents.
      const solid = run.filter((n) => !(n.tag === '#comment' || (n.tag === '#text' && !html.slice(n.start, n.end).trim())));
      if (solid.length && solid.every((n) => n.tag !== '#text')) {
        // Only elements (no loose text): each one is its own unit, e.g. two buttons side by side.
        run = [];
        for (const el of solid) walkInline(el);
        return;
      }
      let s = run[0].start, e = run[run.length - 1].end;
      const slice = html.slice(s, e);
      const lead = slice.length - slice.trimStart().length, trail = slice.length - slice.trimEnd().length;
      s += lead; e -= trail;
      const key = norm(html.slice(s, e).replace(/<!--[\s\S]*?-->/g, ''));
      const textOnly = key.replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/gi, ' ');
      if (/[A-Za-z]{2,}/.test(textOnly)) out.push({ start: s, end: e, key });
      run = [];
    };
    for (const c of node.children) {
      if (inlineOnly(c)) run.push(c);
      else { flush(); walk(c); }
    }
    flush();
    function walkInline(el) {
      const saved = node;
      walk(el);
      return saved;
    }
  })(parse(html));
  return out;
}

/** Translatable attribute values: [{ start, end, key }] positions of the value text */
function attrSegments(html) {
  const out = [];
  const tagRe = /<(img|a|button|input|textarea|select|meta|svg|div|section|nav|span|figure|ul|ol|li|label|form|aside|p|iframe|abbr|dialog|table|details|summary|header|footer|main|article)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
  let m;
  while ((m = tagRe.exec(html))) {
    const tag = m[1].toLowerCase(), attrs = m[2], base = m.index + 1 + m[1].length;
    const ar = /([a-zA-Z:-]+)\s*=\s*"([^"]*)"/g;
    let a;
    const all = {};
    while ((a = ar.exec(attrs))) all[a[1].toLowerCase()] = a[2];
    ar.lastIndex = 0;
    while ((a = ar.exec(attrs))) {
      const name = a[1].toLowerCase();
      let ok = ATTRS.includes(name);
      if (tag === 'meta' && name === 'content') ok = /^(description|og:title|og:description|twitter:title|twitter:description|og:image:alt)$/.test(all.name || all.property || '');
      if (tag === 'input' && name === 'value') ok = /^(submit|button)$/.test(all.type || '');
      if (!ok || !/[A-Za-z]{2,}/.test(a[2])) continue;
      const vs = base + a.index + a[0].indexOf('"') + 1;
      out.push({ start: vs, end: vs + a[2].length, key: norm(a[2]), attr: true });
    }
  }
  return out;
}

function allSegments(html) {
  return [...segments(html), ...attrSegments(html)];
}

/** Collect every segment of every English page into a { id: text } map. */
function extract(pages) {
  const seen = new Map();
  for (const html of pages) for (const s of allSegments(html)) if (!seen.has(idOf(s.key))) seen.set(idOf(s.key), s.key);
  return Object.fromEntries(seen);
}

function localize(html, { lang, dict, prefix, isAsset, siteUrl, ogLocale, missing }) {
  const segs = allSegments(html).sort((a, b) => b.start - a.start);
  let out = html;
  for (const s of segs) {
    const id = idOf(s.key);
    const tr = dict[id];
    if (tr == null) { missing.add(id); continue; }
    out = out.slice(0, s.start) + (s.attr ? tr.replace(/"/g, '&quot;') : tr) + out.slice(s.end);
  }
  // internal links and form actions get the locale prefix (not assets, not marked links)
  out = out.replace(/<[a-zA-Z][^>]*>/g, (tag) => {
    if (tag.includes('data-locale-link') || /^<link\b/i.test(tag)) return tag;
    return tag.replace(/(\s(?:href|action)=")(\/[^"]*)"/g, (all, pre, url) => (isAsset(url) ? all : `${pre}${prefix}${url}"`));
  });
  out = out.replace(/(<link rel="canonical" href="|<meta property="og:url" content=")([^"]*)"/g, (all, pre, url) =>
    url.startsWith(siteUrl) ? `${pre}${siteUrl}${prefix}${url.slice(siteUrl.length)}"` : all);
  out = out.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  if (ogLocale) out = out.replace(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${ogLocale}">`);
  return out;
}

/** Lists ids present in `segmentsFile` but missing from a dictionary. */
function coverage(segs, dict) {
  return Object.keys(segs).filter((id) => dict[id] == null);
}

module.exports = { parse, segments, attrSegments, allSegments, extract, localize, coverage, idOf, norm };
