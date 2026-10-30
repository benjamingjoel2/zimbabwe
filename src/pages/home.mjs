import { page, photo, brand, cta, esc } from '../layout.mjs';
import destinations from '../data/destinations.mjs';
import journeys from '../data/journeys.mjs';
import { destCard } from './destinations.mjs';

export default function home() {
  const featured = journeys.slice(0, 3);
  const body = `
<section class="hero">
  ${photo('mana-elephants-river', { ratio: [16, 9], sizes: '100vw', eager: true, caption: 'Mana Pools' })}
  <div class="hero-text">
    <div class="wrap">
      <p class="eyebrow">${esc(brand.name)} · Zimbabwe</p>
      <h1>Walk Zimbabwe with the guides who know it best</h1>
      <p class="lede">Walking safaris, canoe days on the Zambezi, quiet camps and the country’s deep history. Planned around fewer vehicles and better guiding.</p>
      <p class="btn-row"><a class="btn" href="/journeys/">See sample journeys</a> <a class="btn btn-light" href="/enquire/">Plan a trip</a></p>
    </div>
  </div>
</section>

<section class="section wrap">
  <div class="section-head">
    <p class="eyebrow">How we travel</p>
    <h2>Fewer crowds, better guiding, more of the story</h2>
  </div>
  <div class="grid grid-3 pillars">
    <div class="pillar">
      <h3>On foot, with a professional guide</h3>
      <p>Zimbabwe’s professional guide licence is one of the hardest to earn in Africa. [F48] We build trips around walking with those guides, not around ticking off animals from a vehicle.</p>
      <p><a href="/guiding/">How the licence works</a></p>
    </div>
    <div class="pillar">
      <h3>Away from the busy loop</h3>
      <p>We use small camps in remote concessions and time the busy places for quiet hours: the falls at opening time, Hwange’s far waterholes, Gonarezhou’s empty sand rivers.</p>
      <p><a href="/when-to-go/">When to go where</a></p>
    </div>
    <div class="pillar">
      <h3>The history most visitors miss</h3>
      <p>Great Zimbabwe’s stone city, rock art in the Matobo Hills, and the colonial and independence history that shaped how both have been told. Seen with people who can explain it.</p>
      <p><a href="/destinations/great-zimbabwe/">Great Zimbabwe</a></p>
    </div>
  </div>
</section>

<section class="band band-green">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Victoria Falls, month by month</p>
      <h2>Spray or rock? Zimbabwe side or Zambia?</h2>
      <p>The falls look completely different in April and in October. Our month guide shows what you will actually see, how wet you will get, and which side of the border is better at the time.</p>
      <p><a class="btn btn-light" href="/victoria-falls-by-month/">Open the month guide</a></p>
    </div>
    ${photo('vf-spray', { ratio: [3, 2], caption: 'Victoria Falls in flood' })}
  </div>
</section>

<section class="section wrap">
  <div class="section-head">
    <p class="eyebrow">Destinations</p>
    <h2>Eight places, chosen for how you experience them</h2>
  </div>
  <div class="grid grid-4">
    ${destinations.map((d) => destCard(d, true)).join('')}
  </div>
</section>

<section class="band band-mist">
  <div class="wrap split split-flip">
    <div>
      <p class="eyebrow">A day on foot</p>
      <h2>What a walking safari day actually looks like</h2>
      <p>Up before light, coffee by the fire, a safety briefing, then three or four hours on foot reading tracks and approaching game into the wind. Brunch, a long hot midday, and an evening by the river.</p>
      <p><a href="/guiding/#walking-day">The day, hour by hour</a> · <a href="/guiding/#canoe-day">A canoe day on the Zambezi</a></p>
    </div>
    ${photo('zambezi-canoe', { ratio: [3, 2], caption: 'Canoeing on the Zambezi' })}
  </div>
</section>

<section class="section wrap">
  <div class="section-head">
    <p class="eyebrow">Sample journeys</p>
    <h2>Starting points, built around you</h2>
    <p>Every trip is planned to order. These show how the pieces fit.</p>
  </div>
  <div class="grid grid-3">
    ${featured
      .map(
        (j) => `<article class="card card-link">
      ${photo(j.photo, { ratio: [3, 2], sizes: '(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw' })}
      <div class="card-body">
        <p><span class="tag">${j.style}</span><span class="tag">${j.nights} nights</span></p>
        <h3><a href="/journeys/#${j.slug}">${esc(j.title)}</a></h3>
        <p>${esc(j.pitch)}</p>
      </div>
    </article>`,
      )
      .join('')}
  </div>
  <p><a href="/journeys/">All sample journeys</a></p>
</section>

${cta()}
`;
  return [
    {
      path: '/',
      title: brand.name,
      description: `${brand.name} plans Zimbabwe trips for people who want walking safaris, expert guides, fewer crowds and the country’s history.`,
      image: 'mana-elephants-river',
      body,
    },
  ];
}
