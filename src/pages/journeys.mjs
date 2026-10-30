import { photo, pageHead, cta, esc } from '../layout.mjs';
import journeys from '../data/journeys.mjs';

export default function journeysPages() {
  const body = `${pageHead({
    eyebrow: 'Sample journeys',
    title: 'Ways to put Zimbabwe together',
    lede: 'Four starting points. Every trip we plan is built to order: change the length, the pace, the camps and the season to suit you.',
  })}
<section class="section-tight wrap">
  <nav aria-label="Journeys on this page"><ul class="plain btn-row">${journeys.map((j) => `<li><a class="btn btn-ghost btn-small" href="#${j.slug}">${esc(j.title)}</a></li>`).join('')}</ul></nav>
</section>
<section class="section wrap">
${journeys
  .map(
    (j) => `<article class="journey split" id="${j.slug}" style="align-items:start">
  <div>
    <p><span class="tag">${j.style}</span><span class="tag">${j.nights} nights</span></p>
    <h2>${esc(j.title)}</h2>
    <p class="lede">${esc(j.pitch)}</p>
    <ol class="itinerary">${j.days.map(([d, place, what]) => `<li><span class="days">${d}</span><span><strong>${place}.</strong> ${what}</span></li>`).join('')}</ol>
    <dl class="facts">
      <div><dt>Best months</dt><dd>${j.when}</dd></div>
      <div><dt>Fitness</dt><dd>${j.fitness}</dd></div>
      <div><dt>Price</dt><dd>Quoted to order: it depends on season, camps and group size.</dd></div>
    </dl>
    <p><strong>Why this route:</strong> ${j.why}</p>
    <p><a class="btn" href="/enquire/?journey=${j.slug}">Ask about this journey</a></p>
  </div>
  ${photo(j.photo, { ratio: [4, 5], sizes: '(min-width: 56rem) 50vw, 100vw' })}
</article>`,
  )
  .join('\n')}
</section>
${cta('None of these quite right? Tell us what you want to do and we will sketch a route.')}`;
  return [
    {
      path: '/journeys/',
      title: 'Sample journeys',
      description:
        'Sample Zimbabwe itineraries: walking safaris in Hwange and Mana Pools, the history route through Matobo and Great Zimbabwe, a first safari, and Kariba with the Eastern Highlands.',
      image: 'mana-elephants-river',
      body,
    },
  ];
}
