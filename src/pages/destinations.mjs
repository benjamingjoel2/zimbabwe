import { page, photo, pageHead, cta, esc } from '../layout.mjs';
import destinations from '../data/destinations.mjs';
import stays from '../data/stays.mjs';

const bySlug = Object.fromEntries(destinations.map((d) => [d.slug, d]));

// Drawn panels for places without a location-verified photo. Simple shapes in
// the brand palette: coursed stone with a chevron band for Great Zimbabwe,
// layered cliffs over a sand river for Gonarezhou.
const drawings = {
  'great-zimbabwe': `<svg viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="480" height="320" fill="var(--granite)"/>
    ${Array.from({ length: 13 }, (_, r) => {
      const y = 70 + r * 19;
      const off = r % 2 ? 0 : 18;
      return Array.from({ length: 15 }, (_, c) => `<rect x="${c * 36 - off}" y="${y}" width="33" height="16" rx="2" fill="${r === 3 ? 'var(--copper)' : 'var(--graniteMid)'}" opacity="${0.55 + ((r * 7 + c * 3) % 5) / 12}"/>`).join('');
    }).join('')}
    <polyline points="${Array.from({ length: 21 }, (_, i) => `${i * 24},${i % 2 ? 108 : 124}`).join(' ')}" fill="none" stroke="var(--offwhite)" stroke-width="4"/>
    <path d="M0 70 Q240 30 480 70 L480 0 L0 0Z" fill="var(--zambezi)"/>
  </svg>`,
  gonarezhou: `<svg viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="480" height="320" fill="var(--copperLight)"/>
    <path d="M0 150 L60 120 L140 128 L210 96 L300 104 L380 84 L480 98 L480 220 L0 220Z" fill="var(--msasa)"/>
    <path d="M0 175 L480 160 L480 200 L0 205Z" fill="var(--copper)" opacity="0.8"/>
    <path d="M0 200 L480 190 L480 228 L0 232Z" fill="var(--offwhite)" opacity="0.55"/>
    <path d="M0 232 C120 220 200 250 320 236 S440 226 480 232 L480 320 L0 320Z" fill="var(--offwhite)"/>
    <path d="M40 270 C140 258 260 286 440 266" fill="none" stroke="var(--zambezi)" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
  </svg>`,
};

function noPhoto(d, big = false) {
  return `<figure class="photo drawing${big ? ' drawing-big' : ''}">
  ${drawings[d.slug] || ''}
  <figcaption>Illustration. ${big ? 'We have not yet found a photo of this place whose location we could verify, so we show a drawing instead of a mislabelled picture.' : ''}</figcaption>
</figure>`;
}

export function destCard(d, compact = false) {
  const img = d.photo
    ? photo(d.photo, { ratio: [3, 2], sizes: '(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw' })
    : noPhoto(d);
  return `<article class="card card-link">
  ${img}
  <div class="card-body">
    <h3><a href="/destinations/${d.slug}/">${esc(d.name)}</a></h3>
    ${compact ? '' : `<p class="meta">${esc(d.region)}</p>`}
    <p>${esc(d.summary)}</p>
  </div>
</article>`;
}

function destPage(d) {
  const head = d.photo
    ? pageHead({ eyebrow: d.region, title: esc(d.name), lede: esc(d.summary), photoKey: d.photo, caption: d.name })
    : `<section class="page-head wrap split">
  <div>
    <p class="eyebrow">${esc(d.region)}</p>
    <h1>${esc(d.name)}</h1>
    <p class="lede">${esc(d.summary)}</p>
  </div>
  ${noPhoto(d, true)}
</section>`;

  const localStays = stays.filter((s) => s.dest === d.slug);
  const isFalls = d.slug === 'victoria-falls';

  const body = `${head}
<section class="section wrap split" style="align-items:start">
  <div class="prose">
    ${d.intro.map((p) => `<p>${p}</p>`).join('\n')}
    ${isFalls ? `<p class="note"><strong>Planning the falls?</strong> Start with the <a href="/victoria-falls-by-month/">month-by-month guide</a>: high water and spray against low water and rock, and which side is better each month.</p>` : ''}
    <h2>Highlights</h2>
    <ul>${d.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
    <h2>On foot</h2>
    <p>${d.walking}</p>
  </div>
  <aside>
    <h2 class="visually-hidden">Key facts</h2>
    <dl class="facts">
      ${d.local ? `<div><dt>Local name</dt><dd>${esc(d.local)}</dd></div>` : ''}
      ${d.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
      <div><dt>Best time</dt><dd>${d.bestTime}</dd></div>
      <div><dt>How long</dt><dd>${d.howLong}</dd></div>
      <div><dt>Getting there</dt><dd>${d.gettingThere}</dd></div>
    </dl>
    <p class="small muted">Seasons, fees and access change. We confirm current details in writing before you book.</p>
  </aside>
</section>
${
  d.gallery.length
    ? `<section class="section-tight wrap">
  <h2 class="visually-hidden">Photos</h2>
  <div class="grid grid-3">${d.gallery.map((k) => photo(k, { ratio: [3, 2], sizes: '(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw' })).join('')}</div>
</section>`
    : ''
}
${
  localStays.length
    ? `<section class="section-tight wrap">
  <h2>Where we stay</h2>
  <p class="muted small">Placeholder names: these describe the kind of place we use here.</p>
  <ul class="plain">${localStays.map((s) => `<li><a href="/stays/#${s.name.toLowerCase().replace(/\W+/g, '-')}">${esc(s.name)}</a>: ${esc(s.type)}</li>`).join('')}</ul>
</section>`
    : ''
}
<section class="section wrap">
  <h2>Pairs well with</h2>
  <div class="grid grid-3">${d.pairsWith.map((s) => destCard(bySlug[s])).join('')}</div>
</section>
${cta()}`;

  return {
    path: `/destinations/${d.slug}/`,
    title: d.name,
    description: d.summary,
    image: d.photo || 'zim-elephants-line',
    body,
  };
}

export default function destinationsPages() {
  const index = {
    path: '/destinations/',
    title: 'Destinations',
    description:
      'Victoria Falls, Hwange, Mana Pools, Lake Kariba, Matobo Hills, Great Zimbabwe, Gonarezhou and the Eastern Highlands: where to go in Zimbabwe and why.',
    image: 'hwange-waterhole',
    body: `${pageHead({
      eyebrow: 'Destinations',
      title: 'Where to go in Zimbabwe',
      lede: 'From the Zambezi valley in the north to the sandstone cliffs of the south-east. Each place below is chosen for what you can do there on foot, on the water or with a historian.',
    })}
<section class="section-tight wrap">
  <div class="grid grid-3">${destinations.map((d) => destCard(d)).join('')}</div>
</section>
<section class="section wrap narrow">
  <h2>Putting them together</h2>
  <p>The north (Victoria Falls, Hwange, Mana Pools, Kariba) is the classic safari circuit, best linked by light aircraft. The south (Matobo, Great Zimbabwe, Gonarezhou) works well by road with a driver-guide, and carries most of the history. The Eastern Highlands are a cool, green add-on to either.</p>
  <p>See how this works in practice in our <a href="/journeys/">sample journeys</a>, or check <a href="/when-to-go/">when to go</a>.</p>
</section>
${cta()}`,
  };
  return [index, ...destinations.map(destPage)];
}
