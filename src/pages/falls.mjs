import { photo, pageHead, cta, esc } from '../layout.mjs';
import months, { sides } from '../data/falls.mjs';

const dots = (n, label) =>
  `<span class="dots" role="img" aria-label="${label}: ${n} out of 5">${Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`;

// Bar chart of the relative flow index. Single series, so no legend; the
// title names it. Bars carry their own hover/focus tooltip (see main.js) and
// the same numbers are in the table below for screen readers.
function flowChart() {
  const W = 520;
  const H = 300;
  const left = 30;
  const right = 4;
  const top = 36;
  const bottom = 34;
  const plotW = W - left - right;
  const plotH = H - top - bottom;
  const step = plotW / 12;
  const barW = Math.min(30, step - 8);
  const y = (v) => top + plotH - (v / 10) * plotH;
  const band = (from, to, label) => {
    const x = left + from * step + 1;
    const w = (to - from + 1) * step - 2;
    return `<rect class="band-rect" x="${x}" y="${top - 26}" width="${w}" height="${plotH + 26}" rx="4"/>
    <text class="band-label" x="${x + w / 2}" y="${top - 9}" text-anchor="middle">${label}</text>`;
  };
  const bars = months
    .map((m, i) => {
      const cx = left + i * step + step / 2;
      const x = cx - barW / 2;
      const yt = y(m.flow);
      const h = top + plotH - yt;
      const r = Math.min(4, h);
      const d = `M${x},${top + plotH} V${yt + r} Q${x},${yt} ${x + r},${yt} H${x + barW - r} Q${x + barW},${yt} ${x + barW},${yt + r} V${top + plotH} Z`;
      const tip = `${m.name}: flow ${m.flow}/10, spray ${m.spray}/5. Better: ${sides[m.side].short}`;
      return `<g class="bar-group" tabindex="0" role="listitem" aria-label="${esc(tip)}" data-tip="${esc(tip)}" data-month="${i}">
      <rect class="bar-hit" x="${left + i * step + 1}" y="${top}" width="${step - 2}" height="${plotH}" rx="3"/>
      <path class="bar" d="${d}"/>
      <text class="month-label" x="${cx}" y="${H - bottom + 22}" text-anchor="middle">${m.m}</text>
    </g>`;
    })
    .join('');
  const grid = [0, 5, 10]
    .map(
      (v) => `<line class="grid-line" x1="${left}" x2="${W - right}" y1="${y(v)}" y2="${y(v)}"/>
    <text class="axis-label" x="${left - 8}" y="${y(v) + 5}" text-anchor="end">${v}</text>`,
    )
    .join('');
  return `<figure class="flow-chart" id="flow-chart">
  <h3 id="flow-title">How much water goes over, through the year</h3>
  <p class="small muted">Relative flow, 0 (lowest) to 10 (peak). The usual shape of the year, not a measurement; real levels vary year to year.</p>
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="flow-title">
    ${band(2, 4, 'HIGH WATER')}
    ${band(9, 10, 'LOW WATER')}
    ${grid}
    <g role="list">${bars}</g>
  </svg>
  <div class="chart-tip" role="tooltip" hidden></div>
  <details class="small">
    <summary>Show as a table</summary>
    <div class="table-wrap" style="margin-top:0.75rem">
      <table>
        <caption class="visually-hidden">Victoria Falls by month: relative flow, spray, view and better side</caption>
        <thead><tr><th scope="col">Month</th><th scope="col">Flow (0–10)</th><th scope="col">Spray (1–5)</th><th scope="col">View of the water (1–5)</th><th scope="col">Better side</th></tr></thead>
        <tbody>${months.map((m) => `<tr><th scope="row">${m.name}</th><td>${m.flow}</td><td>${m.spray}</td><td>${m.view}</td><td>${sides[m.side].label}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  </details>
</figure>`;
}

function monthCard(m, i) {
  const s = sides[m.side];
  return `<article class="month" id="${m.name.toLowerCase()}" data-month="${i}">
  <div class="month-top">
    <h3>${m.name}</h3>
    <span class="now-flag" hidden>This month</span>
  </div>
  <dl class="gauge">
    <dt>Spray</dt><dd>${dots(m.spray, 'Spray')}</dd>
    <dt>View of water</dt><dd>${dots(m.view, 'View of the water')}</dd>
    <dt>Better side</dt><dd><span class="side-pill side-${m.side}">${s.label}</span></dd>
  </dl>
  <h4>What you see</h4>
  <p>${m.see}</p>
  <h4>Good to know</h4>
  <p>${m.tips}</p>
</article>`;
}

export default function fallsPages() {
  const body = `${pageHead({
    eyebrow: 'Victoria Falls guide',
    title: 'Victoria Falls, month by month',
    lede: 'In April spray hides much of the falls. In November parts of the lip are bare rock. This guide shows what you can actually see each month, and which side of the border to see it from.',
    photoKey: 'vf-hero',
    caption: 'Victoria Falls, Zimbabwe side',
  })}

<section class="section wrap">
  <div class="split" style="align-items:start">
    <div class="prose">
      <h2>The short version</h2>
      <p><strong>High water, roughly March to May:</strong> the most water and the most spray. The falls are loud and you will get soaked. Often you see spray rather than water. Best seen from the air, or with patience on a breezy day. [F3]</p>
      <p><strong>Low water, roughly October to November:</strong> the least water. The Zambian side can be almost dry. The Zimbabwe side keeps a flow at the Main Falls and Devil’s Cataract, and you can see the whole basalt face and gorge. [F3]</p>
      <p><strong>In between,</strong> June to August is the best balance for many people: plenty of water, much less spray. December to February the river rises again after the rains.</p>
      <p><strong>Which side?</strong> Most of the falls’ width is on the Zimbabwe side, and the Zimbabwe path faces the falls along their length. That makes Zimbabwe the better side for most of the year. Zambia is at its best when the Eastern Cataract is flowing, and for experiences you can only have there: the Knife-Edge Bridge and, at low water, Livingstone Island. [F2]</p>
    </div>
    <div>
      ${flowChart()}
    </div>
  </div>
</section>

<section class="section-tight wrap">
  <h2>Month by month</h2>
  <nav aria-label="Jump to month"><ul class="month-nav">${months.map((m) => `<li><a href="#${m.name.toLowerCase()}" data-month="${months.indexOf(m)}">${m.m}</a></li>`).join('')}</ul></nav>
  <div class="months">${months.map(monthCard).join('')}</div>
</section>

<section class="section wrap">
  <h2>High water and low water, side by side</h2>
  <div class="grid grid-2">
    <div>
      ${photo('vf-spray', { ratio: [3, 2], caption: 'High water: spray rising from the falls' })}
    </div>
    <div>
      ${photo('vf-dry', { ratio: [3, 2], caption: 'Dry season: streams over bare rock' })}
    </div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap">
    <h2>Zimbabwe side or Zambia side?</h2>
    <div class="compare">
      <div>
        <h3>Zimbabwe side</h3>
        ${photo('vf-fisherman', { ratio: [3, 2], sizes: '(min-width: 48rem) 50vw, 100vw', caption: 'Zimbabwe side, low water' })}
        <ul>
          <li>A path through the rainforest with many viewpoints looking straight at the falls along most of their width [F2]</li>
          <li>Water to see in every month, including at low water (Main Falls, Devil’s Cataract)</li>
          <li>The better choice for most of the year, and for a first visit</li>
          <li>Victoria Falls town is right next to the entrance</li>
        </ul>
      </div>
      <div>
        <h3>Zambia side</h3>
        ${photo('vf-zambia-side', { ratio: [3, 2], sizes: '(min-width: 48rem) 50vw, 100vw', caption: 'Zambian side' })}
        <ul>
          <li>Close views of the Eastern Cataract, impressive when it is flowing (roughly February to July)</li>
          <li>The Knife-Edge Bridge: a soaking in high water, dramatic at any time</li>
          <li>Livingstone Island and Devil’s Pool, usually only at low water (roughly mid-August to December or January) [F5]</li>
          <li>Paths down towards the Boiling Pot, below the falls [F63]</li>
        </ul>
      </div>
    </div>
    <h3 style="margin-top:2rem">Seeing both</h3>
    <p class="narrow">The two sides are linked by the Victoria Falls Bridge, and many people see both in a day or two. You need the right visa or entry arrangements for each country. The joint KAZA UniVisa has covered this in the past, but its availability has changed from time to time. [F49] Each side charges its own entrance fee. [F50] We check the current rules when we plan your trip.</p>
  </div>
</section>

<section class="section wrap narrow">
  <h2>Practical notes</h2>
  <ul>
    <li><strong>Getting wet:</strong> from about March to July, assume you will be soaked on the rainforest path. Bring a rain jacket and a dry bag for your camera.</li>
    <li><strong>Timing:</strong> go at opening time. The light is soft, the paths are empty and in high water the morning breeze often clears the spray.</li>
    <li><strong>Lunar rainbows:</strong> in high water, around the full moon, the park may run evening openings to see the spray lit by moonlight. [F4]</li>
    <li><strong>Rafting:</strong> usually runs the full set of rapids at low water and closes or shortens at peak flow. [F6]</li>
  </ul>
  <p>Read more: <a href="/journal/low-water-victoria-falls/">In defence of Victoria Falls at low water</a> · <a href="/destinations/victoria-falls/">Victoria Falls overview</a></p>
</section>
${cta('Tell us when you can travel and we will tell you honestly what the falls will look like then, and how to pair them with the right parks for that month.')}`;

  return [
    {
      path: '/victoria-falls-by-month/',
      title: 'Victoria Falls month by month',
      description:
        'High water and heavy spray against low water and bare rock: what you can see at Victoria Falls each month, and whether the Zimbabwe or Zambia side is better.',
      image: 'vf-spray',
      body,
      bodyClass: 'page-falls',
    },
  ];
}
