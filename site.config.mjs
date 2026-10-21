// Mosi Travel — site configuration.
//
// Everything that identifies the brand lives here: name, contact details,
// palette and the enquiry form endpoint. Change this file and run
// `npm run build` to re-brand the whole site. See README.md.
//
// Values marked PLACEHOLDER must be replaced before going live.

export default {
  brand: {
    name: 'Mosi Travel',
    // Short form used in tight spaces (mobile header, page titles).
    shortName: 'Mosi',
    tagline: 'Zimbabwe on foot, with the people who know it best',
    // One line on where the name comes from. Shown in the footer and on About.
    nameStory:
      'Mosi-oa-Tunya, “the smoke that thunders”, is the local name for Victoria Falls.',
    // Wordmark: the text is drawn in the header; the mark is a small inline SVG
    // (three spray lines over water). Set to '' to show the name only.
    showMark: true,
  },

  // Alternative brand kept for reference. To switch, copy these values into
  // `brand` above (and adjust `nameStory`).
  //   name: 'Mana & Stone', shortName: 'Mana & Stone',
  //   nameStory: 'Named for Mana Pools and the stone walls of Great Zimbabwe: wild places and deep history.'

  contact: {
    email: 'hello@mositravel.example', // PLACEHOLDER
    phone: '+263 00 000 0000', // PLACEHOLDER
    whatsapp: '', // PLACEHOLDER, e.g. '263770000000' (digits only). Leave '' to hide.
    address: 'Victoria Falls, Zimbabwe', // PLACEHOLDER
    hours: 'Mon–Fri, 08:00–17:00 Central Africa Time (UTC+2)', // PLACEHOLDER
  },

  social: [
    // { label: 'Instagram', url: 'https://instagram.com/…' },
  ],

  site: {
    // Used for canonical URLs, the sitemap and social cards. No trailing slash.
    url: 'https://mosi-travel.vercel.app',
    lang: 'en-GB',
    locale: 'en_GB',
  },

  enquiry: {
    // POST endpoint for the enquiry form (Formspree, Basin, your own API…).
    // When empty, the form opens the visitor's email app with the enquiry
    // pre-filled and addressed to contact.email.
    endpoint: '',
  },

  // Palette. Every colour on the site comes from these tokens (see
  // src/styles.css). `npm run check` verifies the text/background pairs listed
  // in `contrastPairs` meet WCAG AA (4.5:1 normal text, 3:1 large text/UI).
  palette: {
    granite: '#33363A', // body text, dark sections
    graniteMid: '#5C6065', // secondary text
    graniteLine: '#D6D0C6', // borders, rules
    offwhite: '#F6F1E8', // page background
    paper: '#FFFDF8', // cards
    msasa: '#8E2A1E', // msasa red: links, primary buttons
    msasaDeep: '#6E1F15', // hover state
    copper: '#B0602A', // decorative only: rules, icons, large display text
    copperText: '#8A4519', // copper for small text on light backgrounds
    copperLight: '#E7B48A', // copper accents on dark backgrounds
    zambezi: '#1E4A3D', // Zambezi green: feature sections
    zambeziMist: '#E3EBE5', // pale green panels
  },

  contrastPairs: [
    // [foreground, background, minimum ratio]
    ['granite', 'offwhite', 4.5],
    ['granite', 'paper', 4.5],
    ['granite', 'zambeziMist', 4.5],
    ['graniteMid', 'offwhite', 4.5],
    ['graniteMid', 'paper', 4.5],
    ['msasa', 'offwhite', 4.5],
    ['msasa', 'paper', 4.5],
    ['msasa', 'zambeziMist', 4.5],
    ['msasaDeep', 'offwhite', 4.5],
    ['paper', 'msasa', 4.5],
    ['paper', 'msasaDeep', 4.5],
    ['copperText', 'offwhite', 4.5],
    ['copperText', 'paper', 4.5],
    ['copper', 'offwhite', 3],
    ['offwhite', 'zambezi', 4.5],
    ['copperLight', 'zambezi', 4.5],
    ['offwhite', 'granite', 4.5],
    ['copperLight', 'granite', 4.5],
    ['zambezi', 'offwhite', 4.5],
    ['zambezi', 'zambeziMist', 4.5],
  ],
};
