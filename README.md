# Mosi Travel: Zimbabwe travel website

A static, mobile-first travel website for Zimbabwe, aimed at travellers who want walking safaris, expert guides, fewer crowds and the history most visitors miss.

The brand is **Mosi Travel**, from Mosi-oa-Tunya, "the smoke that thunders", the local name for Victoria Falls. The brand name, contact details and palette live in one file (`site.config.mjs`), so the site can be re-branded (for example to the alternative, *Mana & Stone*) without touching the pages.

> **Before launch:** work through [`FACTS-TO-VERIFY.md`](FACTS-TO-VERIFY.md). Every visa rule, fee, season, distance and historical claim on the site is listed there, along with the placeholder contact details and stay names.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer. There are no dependencies to install.

```sh
npm run dev      # build, then preview at http://localhost:8080
npm run build    # build the site into dist/
npm run check    # contrast, links, alt text, photo credits, fact markers
npm test         # build + check
```

## What's in it

| Page | URL | Source |
|---|---|---|
| Home | `/` | `src/pages/home.mjs` |
| Destinations (index + 8 pages) | `/destinations/…` | `src/pages/destinations.mjs`, content in `src/data/destinations.mjs` |
| **Victoria Falls month by month** | `/victoria-falls-by-month/` | `src/pages/falls.mjs`, content in `src/data/falls.mjs` |
| **Why Zimbabwe guides** (licence, walking day, canoe day) | `/guiding/` | `src/pages/guiding.mjs` |
| Sample journeys | `/journeys/` | `src/pages/journeys.mjs`, content in `src/data/journeys.mjs` |
| When to go | `/when-to-go/` | `src/pages/when.mjs` |
| Stays (placeholder names) | `/stays/` | `src/data/stays.mjs` |
| About, Journal, Enquiry, Photo credits, 404 | | `src/pages/misc.mjs`, posts in `src/data/journal.mjs` |

```
site.config.mjs      brand, contact details, palette, form endpoint  ← start here
build.mjs            renders every page to dist/
src/layout.mjs       header, footer, <head>, photo + credit helpers
src/styles.css       all styles (colours come from the config as CSS variables)
src/main.js          small progressive enhancements (menu, chart tooltips, form)
src/data/            content: destinations, falls months, journeys, stays, journal, photos
src/pages/           page templates
scripts/check.mjs    quality checks
scripts/serve.mjs    local preview server
FACTS-TO-VERIFY.md   every claim that needs checking
```

Pages are plain JavaScript template literals that return HTML. There is no framework or bundler. The built site is plain HTML and CSS plus one small, deferred script, and it works with JavaScript turned off.

## Editing

### Change the brand, contact details or colours

Edit `site.config.mjs` and rebuild:

- `brand.name`, `shortName`, `tagline`, `nameStory`: used in the header, footer, page titles, About page and form.
- `contact`: email, phone, WhatsApp (digits only, or `''` to hide), address, hours. **These are placeholders.**
- `site.url`: your live domain, for canonical links and the sitemap.
- `palette`: every colour on the site. Keep the token names; change the hex values.
- `contrastPairs`: the text/background combinations the site uses. `npm run check` fails if any drops below WCAG AA (4.5:1 for text, 3:1 for large text and decorative use).

To switch to **Mana & Stone**, copy the commented alternative into `brand` and rebuild. If you change the palette, run `npm run check` to confirm contrast still passes.

### Change content

Most text lives in `src/data/*.mjs` as plain objects: destinations, the 12 Victoria Falls months, journeys, stays and journal posts. Edit, then `npm run build`. Longer page copy (home, guiding, when to go, about) is in the matching file in `src/pages/`.

To add a journal post, add an object to `src/data/journal.mjs` (the `body` is HTML). To add a page, write a function in `src/pages/` that returns `[{ path, title, description, body }]`, and add it to the list in `build.mjs`.

### Facts that need checking

When you write a claim that could be wrong or go out of date (a fee, a season, a date, a distance), add a marker after it, like `[F66]`, and add a matching **F66** row to `FACTS-TO-VERIFY.md`. The build turns markers into HTML comments, so readers never see them, and `npm run check` fails if a marker has no entry. Once a fact is confirmed you can remove its marker.

The site deliberately quotes **no fee amounts** and **no visa prices**. It points to official sources instead.

### Photos

Photos come from [Unsplash](https://unsplash.com) and [Pexels](https://www.pexels.com). They are hot-linked from `images.unsplash.com` and `images.pexels.com` with responsive sizes, and credited under every image and on `/credits/`. The rule: **a photo is used only if the location recorded on its Unsplash or Pexels page matches the place it illustrates.** To add one:

1. Open the photo's page and check its location (Unsplash shows it under the photo; on Pexels it is in the photo details). It must name the place you're using it for. A photo located only as "Zimbabwe" or a province is for general use only. Don't use Unsplash+ (paid) photos.
2. Add an entry to `src/data/photos.mjs`:
   - the photo id
   - the photographer's name and username (on Pexels, the profile slug after `/@`)
   - the location exactly as the site shows it
   - the image URL without its query string: `https://images.unsplash.com/photo-…`, or `https://images.pexels.com/photos/…/pexels-photo-….jpeg`
   - your own descriptive `alt` text
   - for Pexels, `source: 'pexels'`
3. Use it in a page with `photo('your-key', { ratio: [3, 2], caption: '…' })`. The credit is added automatically.

No free photo with a matching location could be found on either site for **Great Zimbabwe** or **Gonarezhou**, so those pages show drawn panels instead (see `drawings` in `src/pages/destinations.mjs`). Replace them when a verified photo is available: set `photo` and `gallery` in `src/data/destinations.mjs`.

### Enquiry form

Set `enquiry.endpoint` in `site.config.mjs` to any service that accepts form POSTs (Formspree, Basin, Getform, your own API). On success the visitor goes to `/enquire/thanks/`. Without an endpoint, the form opens the visitor's email app with the enquiry filled in, addressed to `contact.email`. It also has a honeypot field against spam bots.

## Deploying (Vercel)

`vercel.json` tells Vercel to run `npm run build` and serve `dist/`. There is nothing to install.

- **From GitHub:** import the repository in Vercel. Every push to the default branch deploys; pull requests get preview URLs.
- **From the command line:** `npx vercel --prod`.

Any static host works: upload the contents of `dist/`.

## Standards the site holds to

- **Mobile first.** Base styles are for phones, with layouts added at wider breakpoints. No horizontal scrolling at 360px except inside data tables.
- **Fast.** No web fonts (system font stacks), one small CSS file, one small deferred script (about 5 KB). Images are responsive (`srcset`), lazy-loaded below the fold, and served by the Unsplash and Pexels CDNs, compressed and resized.
- **Accessible.** WCAG AA contrast checked automatically; semantic HTML with landmarks and a skip link; visible focus styles; keyboard-usable menu and chart; the Victoria Falls chart has a data table equivalent; form fields have labels and error messages.
- **Honest.** No invented reviews, testimonials, press logos, awards or memberships. Stay names are clearly labelled as placeholders. Facts awaiting checks are tracked in `FACTS-TO-VERIFY.md`.
