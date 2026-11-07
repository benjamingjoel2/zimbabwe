import { page, photo, photoMeta, pageHead, cta, esc } from '../layout.mjs';
import destinations from '../data/destinations.mjs';
import stays from '../data/stays.mjs';

const bySlug = Object.fromEntries(destinations.map((d) => [d.slug, d]));

// Short caption from a photo's recorded location: "Livingstone, Zambia",
// "Hwange" (the country is left off when it is Zimbabwe).
const placeCaption = (key) => {
  const parts = photoMeta(key).location.split(',').map((s) => s.trim());
  const country = parts.length > 1 ? parts[parts.length - 1] : '';
  return country && country !== 'Zimbabwe' ? `${parts[0]}, ${country}` : parts[0];
};

// A place without a verified photo gets a plain colour block (never a drawing,
// never a photo of somewhere else).
function noPhoto(d, big = false) {
  return `<figure class="photo no-photo${big ? ' no-photo-big' : ''}" aria-hidden="true"></figure>`;
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
  <div class="grid grid-3">${d.gallery.map((k) => photo(k, { ratio: [3, 2], sizes: '(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw', caption: esc(placeCaption(k)) })).join('')}</div>
</section>`
    : ''
}
${
  localStays.length
    ? `<section class="section-tight wrap">
  <h2>Where we stay</h2>
  <p class="muted small">The kind of place we use here. We name it in your proposal.</p>
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
