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
  <div class="note" style="max-width:44rem"><p>The places below describe the kinds of camps and lodges our journeys use. We name the camp or lodge in your proposal.</p></div>
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

// Legal pages (owner checklist, 1 November 2026). The Cookie Policy matches the site: no cookies, no browser storage, no analytics.
function privacyPage() {
  return {
    path: '/privacy/',
    title: "Privacy Policy",
    description: "How Mosi Travel collects, uses and protects your personal data when you visit this website, send us an enquiry or book a trip.",
    body: `${pageHead({ eyebrow: 'Legal', title: "Privacy Policy", lede: "How Mosi Travel collects, uses and protects your personal data when you visit this website, send us an enquiry or book a trip." })}
<section class="section-tight wrap"><div class="prose">
<p>Last updated: 1 November 2026</p>
<h2>Who we are</h2>
<p>Mosi Travel plans and arranges tailor-made trips. We are the controller of the personal data described in this policy.</p>
<p>Address: 28 Walterhill, 28 Walterhill Avenue, Harare, Zimbabwe</p>
<p>Email: <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a></p>
<h2>What data we collect</h2>
<ul><li>Enquiry details: what you enter in our enquiry form or send us by email, such as your name, email address, travel dates, number of travellers, interests, budget and your message.</li><li>Booking details: when you book, what we need to arrange your trip, such as the full names of travellers as shown in their passports, dates of birth, nationality, arrival and departure details, dietary requirements and, only if you choose to share them, health or mobility needs.</li><li>Correspondence: the emails and messages you exchange with us.</li><li>Technical data: when you visit the site, our hosting provider automatically records server logs with your IP address, browser type, the pages requested and the date and time. They are used only to run the site securely and to fix errors.</li><li>Browser storage: the small items described in our cookie policy.</li></ul>
<p>We do not collect payment card details through this website, and the site uses no analytics or advertising trackers.</p>
<h2>Why we use it and our legal bases</h2>
<ul><li>To answer your enquiry and prepare a proposal: steps taken at your request before entering into a contract, and our legitimate interest in replying to people who contact us.</li><li>To book and run your trip, including passing the necessary details to the suppliers who deliver it: performance of our contract with you.</li><li>To take account of health or mobility information you choose to share: your explicit consent, which you can withdraw at any time.</li><li>To keep the site secure and working, and to handle complaints or legal claims: our legitimate interests.</li><li>To keep accounting and tax records: compliance with our legal obligations.</li><li>To send you news, only if you have asked for it: your consent, which you can withdraw at any time.</li></ul>
<p>We never sell your personal data, and we do not use it for automated decision-making or profiling.</p>
<h2>Who we share it with</h2>
<ul><li>Vercel Inc., which hosts this website and processes the technical logs described above.</li><li>Our email provider, which stores and delivers the messages we exchange with you.</li><li>The travel suppliers who deliver your trip, such as hotels, lodges and camps, transport and transfer companies, airlines, activity providers and park or permit authorities. Each receives only what it needs for your booking.</li><li>Professional advisers, public authorities or courts, where the law requires it or to establish or defend legal claims.</li></ul>
<p>When you send the enquiry form, it opens your own email program with your message ready to send to us, so the form itself does not transmit your data to any third party.</p>
<p>Our service providers act on our instructions and must keep your data secure and confidential.</p>
<h2>International transfers</h2>
<p>Vercel and some of our other providers may process data in the United States and other countries. Your trip takes place in Zimbabwe, so the suppliers there receive the details they need. Where data protection law requires it, we rely on adequacy decisions, standard contractual clauses or equivalent safeguards, or on the transfer being necessary to perform the contract you asked us for. You can ask us for details of these safeguards.</p>
<h2>How long we keep it</h2>
<ul><li>Enquiries that do not lead to a booking: up to two years after our last contact.</li><li>Booking records: as long as tax and accounting law requires, usually up to seven years after your trip.</li><li>Health or mobility details: deleted once your trip is over, unless you ask us to keep them for a future trip.</li><li>Server logs: kept by our hosting provider for a short period, normally no more than 30 days.</li></ul>
<h2>How we protect it</h2>
<p>We keep personal data in access-controlled systems, use encrypted connections (HTTPS) on this site and share data only as described here. If a breach affects your data and puts your rights at risk, we will tell you without undue delay.</p>
<h2>Your rights</h2>
<p>Depending on where you live, you have the right to:</p>
<ul><li>access the personal data we hold about you;</li><li>have inaccurate data corrected (rectification);</li><li>have your data deleted (erasure);</li><li>restrict how we use your data (restriction);</li><li>receive your data in a portable format or have it sent to someone else (portability);</li><li>object to our use of your data based on legitimate interests, and to direct marketing at any time (objection);</li><li>withdraw your consent at any time, without affecting what we did before;</li><li>complain to a data protection supervisory authority, in particular in the country where you live or work.</li></ul>
<p>To exercise any of these rights, email us. We reply within one month.</p>
<p>Email: <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a></p>
<h2>Cookies</h2>
<p>This site uses only the browser storage described in our cookie policy.</p>
<p><a href="/cookies/">Read our cookie policy</a></p>
<h2>Children</h2>
<p>This website is not aimed at children and we do not knowingly collect data from children under 16. We only process details of children travelling with their family when a parent or guardian gives them to us for a booking.</p>
<h2>Changes to this policy</h2>
<p>We may update this policy when our services or the law change. The date at the top shows when it was last updated.</p>
<h2>Contact</h2>
<p>Questions about this policy or your personal data: write to Mosi Travel at the address above, or email us.</p>
<p>Email: <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a></p>
</div></section>`,
  };
}

function termsPage() {
  return {
    path: '/terms/',
    title: "Booking Terms",
    description: "The terms that apply when you book a trip with Mosi Travel. Please read them before you book: when you confirm a booking, you accept them.",
    body: `${pageHead({ eyebrow: 'Legal', title: "Booking Terms", lede: "The terms that apply when you book a trip with Mosi Travel. Please read them before you book: when you confirm a booking, you accept them." })}
<section class="section-tight wrap"><div class="prose">
<p>Last updated: 1 November 2026</p>
<h2>1. Who we are</h2>
<p>Mosi Travel (“we”, “us”) plans and arranges tailor-made trips. These terms, together with your proposal and booking confirmation, form your contract with us.</p>
<p>Address: 28 Walterhill, 28 Walterhill Avenue, Harare, Zimbabwe</p>
<p>Email: <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a></p>
<h2>2. How a booking is made and confirmed</h2>
<p>Every trip starts with an enquiry. We then send you a written proposal with the itinerary, the price and what is included. Prices on this website are “from” prices per person, given as a guide; your final price is the one confirmed in writing in your proposal.</p>
<p>Your booking is made when you accept the proposal in writing and pay the deposit, and it is confirmed when we send you a written booking confirmation. The person who makes the booking must be at least 18 years old and accepts these terms on behalf of everyone travelling.</p>
<h2>3. Deposit, balance and prices</h2>
<p>A deposit, stated in your proposal, is due when you book. The balance is due on the date shown in your booking confirmation, normally 60 days before departure. If you book less than 60 days before departure, the full price is due when you book.</p>
<p>If the balance is not paid on time, we may treat the booking as cancelled by you and apply the cancellation charges below.</p>
<p>Once your booking is confirmed we will not increase the price, except where taxes, park or entry fees or fuel costs imposed by third parties change. We will tell you as soon as possible and show how the change was calculated. If the increase is more than 8% of the trip price, you may cancel and receive a full refund.</p>
<h2>4. What is included</h2>
<p>Your proposal and booking confirmation list exactly what is included, typically the accommodation, transport, transfers and activities in your itinerary, and the meals stated.</p>
<p>Unless stated otherwise, the price does not include international flights, travel insurance, visas, vaccinations, drinks, tips, personal expenses, optional activities or anything not listed as included.</p>
<h2>5. Changes by you</h2>
<p>If you want to change your trip after it is confirmed, tell us in writing. We will do our best to make the change, subject to availability. You pay any costs charged by suppliers and any difference in price. Changing your travel dates, or a major change close to departure, may be treated as a cancellation.</p>
<p>You may transfer your booking to another person who meets all the conditions of the trip by telling us in writing at least 14 days before departure. You and that person are jointly responsible for any balance and for the extra costs the transfer causes.</p>
<h2>6. Cancellation by you</h2>
<p>You may cancel at any time by writing to us; the cancellation takes effect on the day we receive it. Unless your booking confirmation sets different charges, we charge the following share of the total trip price:</p>
<ul><li>More than 60 days before departure: loss of the deposit</li><li>60 to 31 days before departure: 50% of the trip price</li><li>30 to 15 days before departure: 75% of the trip price</li><li>14 days or less before departure, or if you do not travel: 100% of the trip price</li></ul>
<p>Some elements, such as flights, permits and certain peak-season stays, cannot be refunded once booked; your proposal says so where this applies. Your travel insurance may cover cancellation charges.</p>
<h2>7. Changes and cancellation by us</h2>
<p>We plan carefully, but we sometimes have to change arrangements. If we make a minor change, such as a comparable hotel or a different route, we will tell you as soon as we can. If we have to make a significant change or cancel your trip, we will tell you promptly and you may accept the change, choose a comparable alternative, or cancel and receive a full refund of everything you have paid us.</p>
<p>For departures with a minimum number of travellers, we may cancel if that number is not reached, telling you at least 45 days before departure and refunding everything you have paid us.</p>
<h2>8. Travel insurance</h2>
<p>Travel insurance is a condition of booking. Your policy must cover cancellation, medical treatment, emergency evacuation and repatriation, and the activities in your itinerary. Please send us the policy details before you travel.</p>
<h2>9. Passports, visas and health</h2>
<p>You are responsible for holding a valid passport, any visas or entry permits, and the vaccinations and health documents your trip requires, and for checking the rules that apply to your nationality. Entry and health rules change; we share the information we have, but please confirm it with the relevant embassy, official government sources and your doctor before you travel.</p>
<h2>10. Our responsibility</h2>
<p>We are responsible for arranging the services in your booking confirmation with reasonable skill and care. If any part of your trip is not provided as agreed, tell the supplier and us straight away so we can try to put it right.</p>
<p>We are not responsible for loss, damage or delay caused by you or a member of your party, by a third party unconnected with the services we arranged, or by unusual and unforeseeable circumstances beyond our control. Where international conventions limit a supplier’s liability, for example for flights, our liability is limited in the same way. Except for death or personal injury caused by our negligence, our liability is limited to the total price of your trip. Nothing in these terms limits rights you have under consumer law that cannot be excluded.</p>
<h2>11. Your behaviour</h2>
<p>Please respect the laws and customs of the places you visit, follow the safety instructions of our suppliers and local hosts, and our reasonable instructions. If your behaviour puts others at risk or seriously disturbs them, we or the supplier may end your trip without refund, and you will pay any costs that result.</p>
<h2>12. Complaints</h2>
<p>If something goes wrong during your trip, tell the supplier and us straight away so we can try to fix it on the spot. If it is not resolved, email us within 28 days of your return. We acknowledge complaints within 14 days and aim to reply in full within 28 days.</p>
<p>Email: <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a></p>
<h2>13. Force majeure</h2>
<p>We are not liable for any failure or delay caused by unusual and unforeseeable circumstances beyond our control whose consequences could not have been avoided even with all due care, such as war, civil unrest, terrorism, natural disaster, epidemic, severe weather, strikes, or the closure of airports, borders or parks. If such circumstances prevent your trip from going ahead as booked, we will offer you a comparable alternative or a refund of the money you have paid us.</p>
<h2>14. Data protection</h2>
<p>We use your personal data to arrange your trip, as explained in our privacy policy.</p>
<p><a href="/privacy/">Read our privacy policy</a></p>
<h2>15. Governing law</h2>
<p>These terms, and any dispute arising from them, are governed by the law of Zimbabwe, and the courts of Zimbabwe have jurisdiction. If you are a consumer, you may also bring proceedings in the courts of the country where you live, and you keep the protection of the mandatory consumer law of that country.</p>
<h2>16. Contact</h2>
<p>Questions about these terms or your booking:</p>
<p>Email: <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a></p>
</div></section>`,
  };
}

function cookiesPage() {
  return {
    path: '/cookies/',
    title: "Cookie Policy",
    description: "What the Mosi Travel website stores in your browser, and why.",
    body: `${pageHead({ eyebrow: 'Legal', title: "Cookie Policy", lede: "What the Mosi Travel website stores in your browser, and why." })}
<section class="section-tight wrap"><div class="prose">
<p>Last updated: 1 November 2026</p>
<h2>What cookies are</h2>
<p>Cookies are small text files that a website saves in your browser. Similar technologies, such as local storage and session storage, let a site keep small pieces of information in your browser. In this policy, “cookies” covers all of them.</p>
<h2>What this site uses</h2>
<p>This site sets no cookies and stores nothing in your browser.</p>
<p>We do not use analytics, advertising or social-media tracking cookies.</p>
<h2>Consent</h2>
<p>Essential items do not need your consent because the site, or a feature you ask for, cannot work without them. If we ever add cookies that are not essential, such as analytics, we will ask for your consent first and update this policy.</p>
<h2>Third-party content</h2>
<ul><li>This website is hosted by Vercel, which processes your IP address in its server logs to deliver the pages. Vercel sets no cookies on this site.</li><li>Some photographs are delivered from third-party image servers. Your browser sends your IP address to those servers so they can deliver the images; they set no cookies on this site.</li><li>Our fonts are served from this website, so no font provider receives your data.</li><li>We do not embed maps, videos, social-media widgets or advertising.</li></ul>
<h2>How to manage or disable cookies</h2>
<p>You can view and delete cookies and site data at any time in your browser settings, and you can block them altogether. Look for “cookies” or “site data” in the privacy settings of Chrome, Firefox, Safari or Edge; each browser’s help pages explain the steps.</p>
<h2>Changes to this policy</h2>
<p>We will update this policy if the way this site uses cookies changes. The date at the top shows the latest version.</p>
<h2>Contact</h2>
<p>Questions about this policy:</p>
<p>Email: <a href="mailto:mositravel@tourground.com">mositravel@tourground.com</a></p>
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
