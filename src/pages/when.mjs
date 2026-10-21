import { photo, pageHead, cta } from '../layout.mjs';
import destinations from '../data/destinations.mjs';

// 3 = best, 2 = good, 1 = fair, 0 = limited (many camps closed or access hard).
// Our judgement for planning, not official data. [F64]
const ratings = {
  'victoria-falls': [2, 3, 2, 2, 2, 3, 3, 3, 2, 2, 1, 1],
  hwange: [1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 2, 1],
  'mana-pools': [0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 1, 0],
  'lake-kariba': [1, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 1],
  'matobo-hills': [2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2],
  'great-zimbabwe': [2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2],
  gonarezhou: [0, 0, 1, 1, 2, 3, 3, 3, 3, 3, 1, 0],
  'eastern-highlands': [1, 1, 1, 2, 3, 3, 3, 3, 3, 2, 1, 1],
};
const labels = ['Limited', 'Fair', 'Good', 'Best'];
const short = ['–', 'Fair', 'Good', 'Best'];
const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function whenPages() {
  const table = `<div class="table-wrap">
<table class="season-table">
  <caption class="visually-hidden">How good each month is for each destination</caption>
  <thead><tr><th scope="col">Destination</th>${M.map((m) => `<th scope="col">${m}</th>`).join('')}</tr></thead>
  <tbody>
  ${destinations
    .map(
      (d) =>
        `<tr><th scope="row"><a href="/destinations/${d.slug}/">${d.name.replace(' National Park', '')}</a></th>${ratings[d.slug]
          .map((r, i) => `<td class="r${r}"><span aria-hidden="true">${short[r]}</span><span class="visually-hidden">${M[i]}: ${labels[r]}</span></td>`)
          .join('')}</tr>`,
    )
    .join('')}
  </tbody>
</table>
</div>
<p class="small muted">Best: peak conditions. Good: very worthwhile. Fair: possible, with trade-offs (heat, rain, fewer camps open). –: limited, many camps closed or access difficult.</p>`;

  const body = `${pageHead({
    eyebrow: 'When to go',
    title: 'Zimbabwe through the year',
    lede: 'Zimbabwe has a dry season and a wet season, and they suit different trips. Here is how the year usually runs, and how it plays out place by place.',
    photoKey: 'hwange-zebra',
    caption: 'Hwange, dry season',
  })}
<section class="section wrap">
  <div class="grid grid-3">
    <div class="pillar">
      <p class="eyebrow">About May–August</p>
      <h3>Dry and cool</h3>
      <p>Clear skies, warm days and cold nights, close to freezing in places at dawn in June and July. The bush thins and game starts to gather near water. Victoria Falls is still full. A comfortable time for walking. [F42]</p>
    </div>
    <div class="pillar">
      <p class="eyebrow">About September–November</p>
      <h3>Dry and hot</h3>
      <p>The peak for game viewing: animals concentrate at the last water in Hwange, Mana Pools and Gonarezhou. Days can be very hot, especially in the Zambezi valley in October. The falls are at their lowest. [F65]</p>
    </div>
    <div class="pillar">
      <p class="eyebrow">About December–April</p>
      <h3>Green season</h3>
      <p>Afternoon storms, lush landscapes, migrant birds and young animals. Some remote camps close and some roads become impassable. Victoria Falls rises to its peak around April. Good for birders, photographers and lower prices. [F10]</p>
    </div>
  </div>
</section>
<section class="section-tight wrap">
  <h2>Month by month, place by place</h2>
  ${table}
  <p>Planning around the falls? See the <a href="/victoria-falls-by-month/">Victoria Falls month-by-month guide</a>.</p>
</section>

<section class="band band-mist">
  <div class="wrap split" style="align-items:start">
    <div class="prose">
      <h2>Before you go</h2>
      <p>The essentials most visitors ask about. These rules change, and the official sources below always take precedence over anything we write here.</p>
      <h3>Visas</h3>
      <p>Many nationalities can get a visa on arrival or apply online in advance; others need to apply before travel. Fees depend on nationality and entry type. Check the Zimbabwe government’s official immigration and e-visa sites for your passport. [F59] If you plan to cross to Zambia or Botswana, check the KAZA UniVisa’s current status. [F49]</p>
      <h3>Money</h3>
      <p>US dollars are widely used, alongside the local currency. Carry small, clean, recent US dollar notes for tips and small purchases; card acceptance varies away from the main centres. [F60]</p>
      <h3>Health</h3>
      <p>Malaria is present in most low-lying safari areas, including the Zambezi valley, Hwange and Gonarezhou. Talk to a travel health clinic well before you go about antimalarials and vaccinations, including whether you need a yellow fever certificate because of your route. [F61] [F62]</p>
      <h3>Travel insurance</h3>
      <p>Get cover that includes medical evacuation from remote areas. We will ask to see it before you travel.</p>
    </div>
    ${photo('zim-elephants-line', { ratio: [4, 5], sizes: '(min-width: 56rem) 50vw, 100vw' })}
  </div>
</section>
${cta()}`;
  return [
    {
      path: '/when-to-go/',
      title: 'When to go to Zimbabwe',
      description:
        'Zimbabwe’s seasons explained, with a month-by-month table for Victoria Falls, Hwange, Mana Pools, Kariba, Matobo, Great Zimbabwe, Gonarezhou and the Eastern Highlands.',
      image: 'hwange-zebra',
      body,
    },
  ];
}
