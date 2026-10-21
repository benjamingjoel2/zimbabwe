import config from '../../site.config.mjs';
import { photo, pageHead, cta, esc, brand, contact, credit, usedPhotos, photoMeta } from '../layout.mjs';
import stays from '../data/stays.mjs';
import destinations from '../data/destinations.mjs';
import journeys from '../data/journeys.mjs';
import posts from '../data/journal.mjs';

const slugify = (s) => s.toLowerCase().replace(/\W+/g, '-');
const fmtDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function staysPage() {
  const body = `${pageHead({
    eyebrow: 'Stays',
    title: 'Where you stay',
    lede: 'Small camps and lodges chosen for their guiding, their position and how few other people are around, not for thread counts.',
  })}
<section class="section-tight wrap">
  <div class="note" style="max-width:44rem"><p><strong>Placeholder names.</strong> The places below describe the kinds of camps and lodges our journeys use. Their names are stand-ins until partner agreements are confirmed.</p></div>
</section>
<section class="section-tight wrap">
  <h2>What we look for</h2>
  <ul class="narrow">
    <li>Walking with fully licensed professional guides, not as an occasional extra</li>
    <li>Small size: usually under ten rooms or tents</li>
    <li>Away from the busiest roads and gates</li>
    <li>Real links with local communities and conservation work, which we ask about in detail</li>
  </ul>
</section>
<section class="section wrap">
  <div class="grid grid-3">
  ${stays
    .map(
      (s) => `<article class="card" id="${slugify(s.name)}">
    <div class="card-body">
      <p class="meta"><a href="/destinations/${s.dest}/">${esc(s.area)}</a></p>
      <h3>${esc(s.name)}</h3>
      <p><strong>${esc(s.type)}.</strong> ${esc(s.style)}</p>
      <p>${s.goodFor.map((g) => `<span class="tag">${esc(g)}</span>`).join('')}</p>
    </div>
  </article>`,
    )
    .join('')}
  </div>
</section>
${cta()}`;
  return {
    path: '/stays/',
    title: 'Stays',
    description: 'The kinds of small camps and lodges we use in Zimbabwe, chosen for guiding, position and quiet.',
    image: 'kariba-trees',
    body,
  };
}

function aboutPage() {
  const body = `${pageHead({
    eyebrow: `About ${esc(brand.name)}`,
    title: 'Zimbabwe, slowly and on foot',
    lede: `${esc(brand.name)} plans trips to Zimbabwe for people who would rather walk with a great guide than chase a checklist, and who want to understand the country as well as see it.`,
  })}
<section class="section wrap split" style="align-items:start">
  <div class="prose">
    <h2>The name</h2>
    <p>${esc(brand.nameStory)} It is the sound and the spray you notice first, long before you see the water.</p>
    <h2>What we believe</h2>
    <p><strong>Guides make the trip.</strong> Zimbabwe trains some of the best walking guides in Africa. We plan around who will be guiding you, and we tell you.</p>
    <p><strong>Fewer people is better.</strong> We choose small camps in quiet areas and time the busy places carefully, so you meet the country rather than the crowds.</p>
    <p><strong>History belongs on a safari.</strong> Great Zimbabwe, the rock art of the Matobo Hills and the country’s colonial and independence history are part of the same landscape as the elephants. We include them, told by people who know them.</p>
    <p><strong>Straight answers.</strong> If the falls will be low, the camp will be hot or a road will be closed, we say so before you book. Fees and rules change, and we confirm them in writing.</p>
    <h2>How planning works</h2>
    <ol>
      <li>You tell us when you can travel, who is coming and what matters to you.</li>
      <li>We reply with a route sketch, honest about the season, and a cost range.</li>
      <li>We refine it together: camps, pace, guiding, flights within Zimbabwe.</li>
      <li>You confirm, and we book everything in country and stay in touch while you travel.</li>
    </ol>
    <p><a class="btn" href="/enquire/">Start planning</a></p>
  </div>
  ${photo('zim-map', { ratio: [4, 5], sizes: '(min-width: 56rem) 50vw, 100vw' })}
</section>
${cta()}`;
  return {
    path: '/about/',
    title: 'About',
    description: `${brand.name}: Zimbabwe trips built around walking safaris, licensed professional guides, quiet camps and the country’s history.`,
    image: 'zim-map',
    body,
  };
}

function journalPages() {
  const card = (p) => `<article class="card card-link">
    ${p.photo ? photo(p.photo, { ratio: [3, 2], sizes: '(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw' }) : ''}
    <div class="card-body">
      <p class="meta"><time datetime="${p.date}">${fmtDate(p.date)}</time></p>
      <h3><a href="/journal/${p.slug}/">${esc(p.title)}</a></h3>
      <p>${esc(p.dek)}</p>
    </div>
  </article>`;
  const index = {
    path: '/journal/',
    title: 'Journal',
    description: 'Notes on travelling in Zimbabwe: Victoria Falls through the year, walking safaris and the history of the stone city.',
    image: 'vf-dry',
    body: `${pageHead({ eyebrow: 'Journal', title: 'Notes from the field', lede: 'Practical advice and longer reads on Zimbabwe’s places, seasons and history.' })}
<section class="section-tight wrap"><div class="grid grid-3">${posts.map(card).join('')}</div></section>
${cta()}`,
  };
  const items = posts.map((p) => ({
    path: `/journal/${p.slug}/`,
    title: p.title,
    description: p.dek,
    image: p.photo || 'zim-elephants-line',
    body: `<article>
  ${pageHead({ eyebrow: `Journal · <time datetime="${p.date}">${fmtDate(p.date)}</time>`, title: esc(p.title), lede: esc(p.dek) })}
  ${p.photo ? `<div class="wrap" style="max-width:56rem">${photo(p.photo, { ratio: [16, 9], sizes: '(min-width: 56rem) 56rem, 100vw', eager: true })}</div>` : ''}
  <div class="section wrap"><div class="prose post-body">${p.body}</div>
  <p class="post-meta">More from the <a href="/journal/">journal</a>.</p></div>
</article>
${cta()}`,
  }));
  return [index, ...items];
}

function enquirePages() {
  const interests = [
    'Walking safari', 'Canoeing', 'Victoria Falls', 'Wildlife photography',
    'History & rock art', 'Birding', 'Hiking', 'Travelling with children',
  ];
  const months = ['Not sure yet', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const endpoint = config.enquiry.endpoint;
  const body = `${pageHead({
    eyebrow: 'Enquire',
    title: 'Plan a journey',
    lede: 'Tell us a little about your trip. There is no obligation and no booking fee for a first proposal.',
  })}
<section class="section-tight wrap split" style="align-items:start">
  <form class="form" id="enquiry" ${endpoint ? `action="${endpoint}" method="post"` : `action="mailto:${contact.email}" method="post" enctype="text/plain"`} data-endpoint="${endpoint}" data-email="${contact.email}" novalidate>
    <p class="small muted">Fields marked <span class="req">*</span> are required.</p>
    <div class="field-row">
      <div class="field"><label for="f-name">Your name <span class="req">*</span></label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="f-email">Email <span class="req">*</span></label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
    </div>
    <div class="field-row">
      <div class="field"><label for="f-phone">Phone or WhatsApp</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
      <div class="field"><label for="f-country">Country you live in</label><input id="f-country" name="country" type="text" autocomplete="country-name"></div>
    </div>
    <div class="field-row">
      <div class="field"><label for="f-month">When would you like to travel?</label><select id="f-month" name="month">${months.map((m) => `<option>${m}</option>`).join('')}</select></div>
      <div class="field"><label for="f-year">Year</label><select id="f-year" name="year"><option>2027</option><option>2026</option><option>2028</option><option>Not sure yet</option></select></div>
    </div>
    <div class="field-row">
      <div class="field"><label for="f-nights">Roughly how many nights?</label><input id="f-nights" name="nights" type="number" min="2" max="60" inputmode="numeric"></div>
      <div class="field"><label for="f-people">How many travellers?</label><input id="f-people" name="travellers" type="text" placeholder="e.g. 2 adults, 1 child aged 14"></div>
    </div>
    <div class="field">
      <label for="f-journey">Interested in a sample journey?</label>
      <select id="f-journey" name="journey"><option value="">No, start from scratch</option>${journeys.map((j) => `<option value="${j.slug}">${esc(j.title)}</option>`).join('')}</select>
    </div>
    <fieldset class="field">
      <legend>What matters most to you?</legend>
      <div class="checks">${interests.map((i, n) => `<label for="f-i${n}"><input id="f-i${n}" type="checkbox" name="interests" value="${i}"> ${i}</label>`).join('')}</div>
    </fieldset>
    <div class="field">
      <label for="f-message">Anything else we should know?</label>
      <p class="hint" id="f-message-hint">Previous safaris, fitness, special occasions, places you definitely want to see.</p>
      <textarea id="f-message" name="message" aria-describedby="f-message-hint"></textarea>
    </div>
    <div class="hp" aria-hidden="true"><label for="f-website">Leave this empty</label><input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
    <div class="field">
      <label for="f-consent" class="checks" style="display:flex;gap:0.55rem;font-weight:400"><input id="f-consent" name="consent" type="checkbox" required style="width:1.15rem;height:1.15rem;margin-top:0.25rem;accent-color:var(--zambezi)"> <span>I’m happy for ${esc(brand.name)} to contact me about this enquiry. <span class="req">*</span></span></label>
    </div>
    <div class="form-status" role="status" aria-live="polite" hidden></div>
    <p><button class="btn" type="submit">Send enquiry</button></p>
  </form>
  <aside>
    <h2>Prefer to talk?</h2>
    <ul class="plain">
      <li><a href="mailto:${contact.email}">${esc(contact.email)}</a></li>
      <li><a href="tel:${contact.phone.replace(/[^+\d]/g, '')}">${esc(contact.phone)}</a></li>
      ${contact.whatsapp ? `<li><a href="https://wa.me/${contact.whatsapp}">WhatsApp</a></li>` : ''}
      <li>${esc(contact.hours)}</li>
    </ul>
    <h2>What happens next</h2>
    <p>We read every enquiry ourselves and reply with a first route sketch, honest about the season, plus a cost range. Then we refine it together.</p>
    <p class="small muted">We only use your details to answer this enquiry.</p>
  </aside>
</section>`;
  const thanks = {
    path: '/enquire/thanks/',
    title: 'Thank you',
    description: 'Your enquiry has been sent.',
    body: `${pageHead({ eyebrow: 'Enquiry sent', title: 'Thank you', lede: 'We have your enquiry and will be in touch by email.' })}
<section class="section-tight wrap narrow"><p>While you wait, the <a href="/victoria-falls-by-month/">Victoria Falls month guide</a> and <a href="/guiding/">how walking safaris work</a> are good places to start.</p></section>`,
  };
  return [
    {
      path: '/enquire/',
      title: 'Plan a journey',
      description: `Tell ${brand.name} about the Zimbabwe trip you have in mind.`,
      body,
    },
    thanks,
  ];
}

// Built last so it can list exactly the photos the other pages used.
export function creditsPage() {
  const keys = [...usedPhotos].sort();
  const rows = keys
    .map((k) => {
      const p = photoMeta(k);
      return `<tr><td>${esc(p.alt)}</td><td>${esc(p.location)}</td><td>${credit(p)}</td></tr>`;
    })
    .join('');
  return {
    path: '/credits/',
    title: 'Photo credits',
    description: `Credits for the photographs used on ${brand.name}.`,
    body: `${pageHead({
      eyebrow: 'Credits',
      title: 'Photo credits',
      lede: 'All photographs are from Unsplash, used under the Unsplash License. We use a photo only when the location recorded on Unsplash matches the place we show it for.',
    })}
<section class="section-tight wrap">
  <div class="table-wrap"><table>
    <thead><tr><th scope="col">Photo</th><th scope="col">Location on Unsplash</th><th scope="col">Credit</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <p class="small muted">Where we could not find a photo with a verified location (Great Zimbabwe and Gonarezhou), we show a drawing instead.</p>
</section>`,
  };
}

function notFound() {
  return {
    path: '/404.html',
    title: 'Page not found',
    description: 'This page could not be found.',
    body: `${pageHead({ eyebrow: '404', title: 'Off the path', lede: 'We could not find that page. It may have moved.' })}
<section class="section-tight wrap"><p class="btn-row"><a class="btn" href="/">Home</a> <a class="btn btn-ghost" href="/destinations/">Destinations</a></p></section>`,
  };
}

export default function miscPages() {
  return [staysPage(), aboutPage(), ...journalPages(), ...enquirePages(), notFound()];
}
