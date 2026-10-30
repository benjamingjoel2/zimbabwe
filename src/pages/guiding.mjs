import { photo, pageHead, cta } from '../layout.mjs';

const walkingDay = [
  ['05:15', 'Wake-up call', 'A knock at the tent and a jug of warm water. In the dry season it is still dark and, from June to August, cold.'],
  ['05:45', 'Coffee by the fire', 'Tea, coffee, porridge or rusks. The guide tells you what the night sounded like and suggests a plan for the morning.'],
  ['06:15', 'The briefing', 'Before every walk: single file behind the guide, no talking unless they talk first, hand signals, and what to do (and never do) if an animal comes close. Never run.'],
  ['06:30', 'Walking out', 'Usually two to six guests, the lead professional guide with a rifle, and often a second armed guide or tracker at the back. You start with the tracks from the night.'],
  ['07:30', 'Reading the ground', 'Stops to look at tracks, dung, termite mounds and plants. Walks are slow and quiet, with long pauses.'],
  ['08:30', 'Approaching game', 'If there is a chance, the guide checks the wind and the cover and brings you closer on foot. Elephant, buffalo and sometimes lion, at a distance the animals accept. Often you sit and watch.'],
  ['09:30', 'A break', 'Coffee or water in the shade, often with a view over a floodplain or pan.'],
  ['10:30', 'Back in camp', 'Three to four hours in all, perhaps 6 to 10 km at a slow pace. The distance matters less than what you saw.'],
  ['11:00', 'Brunch', 'A big late breakfast. The guide talks through the walk and answers questions.'],
  ['12:00', 'The hot hours', 'Siesta, reading, a shower, or the camp hide or waterhole. Animals rest too.'],
  ['15:30', 'Afternoon tea', 'Then a shorter walk, a drive or a sit at a waterhole as it cools down.'],
  ['18:00', 'Sundown', 'A drink somewhere with a view. Night falls fast near the tropics.'],
  ['19:30', 'Dinner', 'Around the fire or at a shared table. After dark you are escorted to your tent.'],
];

const canoeDay = [
  ['05:30', 'Early start', 'Coffee on the riverbank. The guide checks the river, the wind and where the hippos spent the night.'],
  ['06:00', 'The river briefing', 'Paddle strokes, keeping to the shallows, the order of canoes, and the hippo rules: stay out of deep channels near pods, keep close together, follow the lead canoe.'],
  ['06:30', 'Launch', 'Two to a canoe, with the professional canoe guide in the lead and a back-up guide at the rear. You drift and paddle downstream with the current.'],
  ['08:00', 'Elephants crossing', 'Close views of elephant, buffalo and waterbuck on the banks and islands, seen from water level, which feels quite different from a vehicle.'],
  ['09:30', 'Island stop', 'Pull up on a sandbank for breakfast or coffee, and a short walk on an island with the guide.'],
  ['11:00', 'Midday', 'Into camp, or a shaded island lunch. On a multi-day trip, you camp on the bank or an island.'],
  ['15:30', 'Afternoon paddle', 'A shorter stretch as the light softens. Fish eagles, carmine bee-eaters in season, hippos surfacing.'],
  ['17:45', 'Out of the water', 'Canoes are off the river before dark. Sundowners on the sand.'],
  ['19:00', 'Dinner', 'By the fire, with hippos grunting from the river.'],
];

const timeline = (rows) =>
  `<ol class="timeline">${rows
    .map(([t, h, p]) => `<li><time>${t}</time><h4>${h}</h4><p>${p}</p></li>`)
    .join('')}</ol>`;

export default function guidingPages() {
  const body = `${pageHead({
    eyebrow: 'Guiding and walking safaris',
    title: 'Why Zimbabwe guides',
    lede: 'A fully licensed professional guide in Zimbabwe has spent years on foot with dangerous game and passed some of the hardest practical exams in the safari world. That is why we build trips around them.',
    photoKey: 'mana-elephant-calf',
    caption: 'Mana Pools',
  })}

<section class="section wrap">
  <div class="split" style="align-items:start">
    <div class="prose">
      <h2>What the licence means</h2>
      <p>In Zimbabwe, leading guests on foot among big game is licensed work. The Professional Guide licence is issued by the national parks authority (Zimbabwe Parks and Wildlife Management Authority), after a long apprenticeship and a series of written, firearms and field exams. [F51]</p>
      <p>Many countries use shorter courses or written qualifications. The Zimbabwean system is built around practical assessment. Senior guides and examiners watch candidates in the field, on foot, around elephant, buffalo and lion, and judge how they read the animals and keep a group safe. [F52] Many candidates take years to pass, and some never do.</p>
      <p>The industry body, the Zimbabwe Professional Guides Association, represents licensed guides. [F53]</p>
    </div>
    <div>
      <h2 class="visually-hidden">The path to a licence</h2>
      <ol class="steps">
        <li><h3>Learner guide</h3><p>Pass written exams on ecology, animal behaviour, plants, birds, history, law and safety to register as a learner professional guide. [F54]</p></li>
        <li><h3>Apprenticeship</h3><p>Years of work under licensed guides, logging time on foot and with dangerous game, and building up a record signed off by mentors. [F54]</p></li>
        <li><h3>Firearms test</h3><p>Shooting proficiency with a heavy-calibre rifle under pressure. Guides carry one on every walk and almost never use it. [F55]</p></li>
        <li><h3>The proficiency exam</h3><p>A multi-day practical exam in the bush: leading walks, approaching big game, handling close encounters, answering examiners on anything they point at. [F52]</p></li>
        <li><h3>Professional Guide</h3><p>A full licence to lead walking safaris. Canoe guiding on the Zambezi is a separate qualification with its own assessment. [F56]</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="band band-granite">
  <div class="wrap narrow">
    <p class="eyebrow">What this means for you</p>
    <h2>Questions worth asking any operator</h2>
    <ul>
      <li>Is my walk led by a fully licensed professional guide, or a learner?</li>
      <li>Will there be a second armed guide or tracker on walks?</li>
      <li>How many guests walk together? (Group sizes are capped; small is better.) [F57]</li>
      <li>Is canoe guiding done by someone with the canoe qualification?</li>
      <li>Is there a minimum age for walking? (Often around 12–16, depending on the camp.) [F58]</li>
    </ul>
    <p>We ask these of every camp we use, and tell you the answers.</p>
  </div>
</section>

<section class="section wrap" id="walking-day">
  <div class="split" style="align-items:start">
    <div>
      <p class="eyebrow">Hour by hour</p>
      <h2>A walking safari day</h2>
      <p>A typical dry-season day at a walking camp in Mana Pools or Hwange. Times shift with the season and the camp; the rhythm stays the same.</p>
      ${timeline(walkingDay)}
    </div>
    <div>
      ${photo('hwange-elephant', { ratio: [4, 5], sizes: '(min-width: 56rem) 50vw, 100vw', caption: 'Hwange' })}
      <div class="note" style="margin-top:1.5rem">
        <h3>Do I need to be fit?</h3>
        <p>You need to be comfortable walking for three to four hours at a slow pace on uneven ground in the heat. Guides adjust the distance to the group. You do not need hiking experience; you do need to follow instructions instantly.</p>
      </div>
      <div class="note" style="margin-top:1rem">
        <h3>Is it safe?</h3>
        <p>Walking among wild animals is never risk-free. Licensed guides manage that risk by reading the animals early, keeping a respectful distance and avoiding situations rather than reacting to them. The briefing exists for a reason: follow it.</p>
      </div>
    </div>
  </div>
</section>

<section class="band band-mist" id="canoe-day">
  <div class="wrap split" style="align-items:start">
    <div>
      <p class="eyebrow">Hour by hour</p>
      <h2>A canoe safari day on the Zambezi</h2>
      <p>A typical day canoeing the Zambezi along Mana Pools, as a day trip or part of a multi-night descent. You need no canoeing experience, but you do need to listen.</p>
      ${timeline(canoeDay)}
    </div>
    <div>
      ${photo('zambezi-canoe', { ratio: [4, 5], sizes: '(min-width: 56rem) 50vw, 100vw', caption: 'On the Zambezi' })}
    </div>
  </div>
</section>

<section class="section wrap narrow">
  <h2>Where to walk</h2>
  <ul>
    <li><a href="/destinations/mana-pools/">Mana Pools</a>: open floodplain walking and canoeing; the classic.</li>
    <li><a href="/destinations/hwange/">Hwange</a>: tracking on Kalahari sand in the private concessions.</li>
    <li><a href="/destinations/matobo-hills/">Matobo Hills</a>: rhino tracking on foot among granite.</li>
    <li><a href="/destinations/gonarezhou/">Gonarezhou</a>: long sand-river walks in remote country.</li>
    <li><a href="/destinations/lake-kariba/">Lake Kariba</a>: walks inland from the Matusadona shore.</li>
  </ul>
  <p>Or start with the <a href="/journeys/#walking-the-zambezi">Walking the Zambezi</a> sample journey.</p>
</section>
${cta()}`;

  return [
    {
      path: '/guiding/',
      title: 'Why Zimbabwe guides: walking and canoe safaris',
      description:
        'How Zimbabwe’s professional guide licence works, and what a walking safari day and a Zambezi canoe day look like, hour by hour.',
      image: 'mana-elephant-calf',
      body,
    },
  ];
}
