import config from '../../site.config.mjs';
import { photo, pageHead, cta, esc, brand, contact } from '../layout.mjs';
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
      <div class="field"><label for="f-phone">Phone (optional)</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
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
    <h2>Prefer email?</h2>
    <ul class="plain">
      <li><a href="mailto:${contact.email}">${esc(contact.email)}</a></li>
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

// Legal pages: complete drafts for an enquiry-led, tailor-made travel service.
// Have a lawyer review them before launch.
function privacyPage() {
  return {
    path: '/privacy/',
    title: 'Privacy policy',
    description: 'How Mosi Travel collects, uses and protects your personal information.',
    body: `${pageHead({ eyebrow: 'Legal', title: 'Privacy policy', lede: 'Last updated 30 October 2026.' })}
<section class="section-tight wrap"><div class="prose">
  <h2>Who we are</h2>
  <p>Mosi Travel plans tailor-made journeys in Zimbabwe. In this policy, “we”, “us” and “our” mean Mosi Travel, of 28 Walterhill, 28 Walterhill Avenue, Harare, Zimbabwe. We are responsible for the personal information you share with us through this website.</p>
  <p>If you have any question about this policy or your information, email us at <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a>.</p>
  <h2>What we collect</h2>
  <p>We only collect what you choose to give us, and what we need to answer you and plan your trip:</p>
  <ul>
    <li>Contact details you enter in the enquiry form: your name, email address and, if you give it, a phone number. If the form opens your own email app, the enquiry is sent from your email account.</li>
    <li>Trip details: who is travelling, approximate dates, interests, travel style and anything else you tell us. Please only share health, dietary or accessibility information if you want us to take it into account.</li>
    <li>Messages and emails you send us, and our replies.</li>
    <li>If you go on to travel with us: the details our partners need to deliver your trip, such as passport names, dates of birth, flight details and emergency contacts.</li>
    <li>Basic technical information that any web server receives (such as your IP address, browser type and the pages requested), kept briefly in server logs for security and to keep the site running.</li>
  </ul>
  <h2>How we use it and why</h2>
  <ul>
    <li>To answer your enquiry and prepare a tailor-made proposal (steps you ask us to take before entering into a contract).</li>
    <li>To arrange and look after your trip if you book (performance of our contract with you).</li>
    <li>To send our newsletter or guide, only if you sign up for it (your consent, which you can withdraw at any time).</li>
    <li>To keep records we are required to keep, for example for accounting and tax (legal obligation).</li>
    <li>To keep the website secure and working (our legitimate interests).</li>
  </ul>
  <p>We do not sell your information, and we do not use it for automated decision-making or profiling.</p>
  <h2>Who we share it with</h2>
  <p>We only share your information where it is needed for the purposes above:</p>
  <ul>
    <li>With the lodges, camps, hotels, guides, drivers, airlines and other suppliers who deliver your trip, when you book.</li>
    <li>Our website host, which serves the site and keeps short-lived technical logs.</li>
    <li>Our email provider, which receives the enquiries you send and carries our replies.</li>
    <li>With professional advisers or authorities where the law requires it.</li>
  </ul>
  <p>Some of these suppliers and service providers are outside the country you live in. Where we transfer your information internationally, we take steps to make sure it is protected to the standard required by law.</p>
  <h2>How long we keep it</h2>
  <p>We keep enquiries for up to two years after our last contact so we can pick up where we left off if you come back to us. If you travel with us, we keep booking records for as long as accounting and tax law requires (usually up to seven years). Newsletter details are kept until you unsubscribe.</p>
  <h2>Your rights</h2>
  <p>Depending on where you live, you have the right to ask for a copy of the information we hold about you, to have it corrected or deleted, to restrict or object to how we use it, to receive it in a portable format, and to withdraw your consent at any time. To use any of these rights, email <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a>. We will reply within one month.</p>
  <p>If you are unhappy with how we have handled your information, please tell us first so we can put it right. You can also complain to the data-protection authority where you live or to the Postal and Telecommunications Regulatory Authority of Zimbabwe (POTRAZ), the data-protection authority under the Cyber and Data Protection Act.</p>
  <h2>Security</h2>
  <p>Our website is served over an encrypted connection (HTTPS), and we limit access to your information to the people who need it to plan and run your trip.</p>
  <h2>Cookies and local storage</h2>
  <p>How this website uses cookies and your browser’s storage is explained in our <a href="/cookies/">Cookie Policy</a>.</p>
  <h2>Changes to this policy</h2>
  <p>We may update this policy from time to time. The date at the top of the page shows when it last changed.</p>
</div></section>`,
  };
}

function termsPage() {
  return {
    path: '/terms/',
    title: 'Booking terms',
    description: 'The terms that apply when Mosi Travel plans and arranges a tailor-made Zimbabwe journey for you.',
    body: `${pageHead({ eyebrow: 'Legal', title: 'Booking terms', lede: 'Last updated 30 October 2026.' })}
<section class="section-tight wrap"><div class="prose">
  <h2>About these terms</h2>
  <p>These terms apply to the tailor-made travel arrangements that Mosi Travel, of 28 Walterhill, 28 Walterhill Avenue, Harare, Zimbabwe (“we”, “us”), plans for you. Please read them before you confirm a booking. When you confirm a booking you accept them on behalf of everyone in your party, and you confirm that you are at least 18 and have their authority to do so.</p>
  <p>These are general principles. The quote and booking confirmation we send you set out the specific arrangements, deposit, balance due date and cancellation charges for your trip, and they form part of your contract with us.</p>
  <h2>Enquiries and quotes</h2>
  <p>Sending us an enquiry through the website, by email or any other way does not commit you to anything. We will reply with ideas and, when you are ready, a written quote.</p>
  <p>Quotes are based on availability and supplier rates at the time we write them. Nothing is held for you until you confirm and we confirm back in writing. We will always tell you if anything in a quote changes before you book.</p>
  <h2>Booking, deposit and balance</h2>
  <p>Your booking is confirmed when you accept our quote, we receive the deposit stated in it, and we send you a written booking confirmation. Your contract with us starts from that point.</p>
  <p>The balance is due by the date shown in your quote and booking confirmation. If it is not paid on time, we may treat the booking as cancelled by you and apply the cancellation charges below.</p>
  <p>Some suppliers (for example certain lodges, flights and permits) need full payment when they are booked. Where this applies we will tell you before you confirm.</p>
  <h2>Prices</h2>
  <p>The price of your trip is the price in your booking confirmation. We will only change it after confirmation if a cost outside our control changes, such as government taxes, park or conservation fees, or fuel surcharges set by a carrier, and we will show you how any change is worked out. If a change is significant, you may cancel without paying cancellation charges.</p>
  <h2>Changes you ask for</h2>
  <p>We will always try to help if you want to change your trip after booking. Changes depend on availability and on the suppliers’ own terms, and any extra cost they charge will be passed on to you, together with any reasonable administration cost we tell you about in advance.</p>
  <h2>If you cancel</h2>
  <p>To cancel, tell us in writing. Cancellation charges depend on how close to departure you cancel and on the charges our suppliers make to us. They are set out in your quote and booking confirmation. We will always try to keep them as low as we can, and we will refund anything we are able to recover.</p>
  <h2>If we change or cancel your trip</h2>
  <p>Occasionally we have to make changes, for example when a camp or flight is no longer available. If we make a significant change before you travel, we will tell you as soon as possible and offer you a choice of accepting it, taking a comparable alternative, or cancelling with a full refund of what you have paid us.</p>
  <p>We may need to cancel or change arrangements because of events outside anyone’s control, such as extreme weather, natural disasters, epidemics, civil unrest or official travel advice against travel. In that case we will help you rearrange, and refund what we are able to recover from suppliers.</p>
  <h2>Travel insurance</h2>
  <p>Comprehensive travel insurance is a condition of travelling with us. It must cover cancellation, medical treatment, emergency evacuation and repatriation, and any activities you plan to do. Please arrange it when you book so you are covered if you have to cancel.</p>
  <h2>Passports, visas and health</h2>
  <p>You are responsible for having a valid passport, any visas or electronic travel authorisations, and any vaccinations or health certificates required for your journey, including for transit countries. We are happy to share general guidance, but entry rules change, so please check them with the relevant embassy or official government source and with a travel-health professional well before you travel.</p>
  <h2>Our responsibility to you</h2>
  <p>We will plan your trip with reasonable skill and care, and we choose our suppliers carefully. Many services are provided by independent suppliers under their own terms and the laws of the country where they operate.</p>
  <p>We are not responsible for any loss, injury or damage caused by you or anyone in your party, by a third party not connected with the arrangements we provide, or by events outside our control. Where the law allows, our liability is limited to the price of your trip. Nothing in these terms limits liability that cannot legally be limited, such as liability for death or personal injury caused by our negligence.</p>
  <p>Wildlife is wild and outdoor activities carry some risk. Please follow the advice of your guides and lodge staff at all times.</p>
  <h2>Your responsibilities</h2>
  <p>Please give us accurate information, including the names on your passports and any medical, dietary or accessibility needs that affect your trip. Please respect local laws, customs and the rules of the parks and places you visit.</p>
  <h2>Complaints</h2>
  <p>If something is not right while you are travelling, tell your guide, the property or us straight away so it can be put right on the spot. If it cannot be resolved, write to us at <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a> within 28 days of your return and we will reply in full.</p>
  <h2>Governing law</h2>
  <p>These terms and any dispute connected with them are governed by the law that applies to your contract with us. Nothing in them affects your rights as a consumer under the law of the country where you live.</p>
</div></section>`,
  };
}

function cookiesPage() {
  return {
    path: '/cookies/',
    title: 'Cookie policy',
    description: 'How the Mosi Travel website uses cookies and browser storage.',
    body: `${pageHead({ eyebrow: 'Legal', title: 'Cookie policy', lede: 'Last updated 30 October 2026.' })}
<section class="section-tight wrap"><div class="prose">
  <h2>What cookies and local storage are</h2>
  <p>Cookies are small text files a website saves in your browser. Local storage is a similar feature that lets a website remember information on your own device. Neither is sent to us unless a page specifically reads it.</p>
  <h2>Cookies we use</h2>
  <p>This website does not set any cookies, and it does not use advertising or tracking cookies of any kind.</p>
  <h2>Local storage we use</h2>
  <p>This website does not use local storage.</p>
  <h2>Analytics and third parties</h2>
  <p>We do not use analytics, advertising or social-media tracking on this website. Photographs are loaded from Unsplash’s and Pexels’ image servers, which receive the standard technical information (such as your IP address) that any website receives when it delivers an image. The site uses your device’s own fonts, so no font service is involved.</p>
  <h2>Consent and how to withdraw it</h2>
  <p>Because this website sets no cookies and stores nothing in your browser, there is nothing to consent to and no cookie banner. If that ever changes, we will ask for your consent first and you will be able to change your choice at any time.</p>
  <p>You can clear anything a website has stored in your browser at any time by clearing its site data (usually under Settings, then Privacy, then Cookies and site data), or block cookies entirely in your browser settings. This website will work exactly the same.</p>
  <h2>Questions</h2>
  <p>If you have any questions about this policy, email us at <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a>. Our <a href="/privacy/">Privacy Policy</a> explains how we handle personal information.</p>
</div></section>`,
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
  return [staysPage(), aboutPage(), ...journalPages(), ...enquirePages(), privacyPage(), termsPage(), cookiesPage(), notFound()];
}
