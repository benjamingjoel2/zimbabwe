// Sample journeys. These are starting points, not fixed products: every trip
// is built to order. Prices are deliberately not shown; see FACTS-TO-VERIFY.md.

export default [
  {
    slug: 'walking-the-zambezi',
    title: 'Walking the Zambezi',
    nights: 10,
    style: 'Walking safari',
    photo: 'mana-elephants-river',
    when: 'June to October',
    fitness: 'Moderate: 3–4 hours walking most mornings',
    pitch:
      'Ten nights for people who want to spend most of their safari on foot: the falls, then Hwange on sand, then Mana Pools, ending on the river.',
    days: [
      ['Days 1–2', 'Victoria Falls', 'Arrive. Rainforest walk at opening time; a guided walk in Zambezi National Park.'],
      ['Days 3–5', 'Hwange', 'A private concession: morning walks reading tracks on the sand, afternoons at a waterhole hide.'],
      ['Days 6–9', 'Mana Pools', 'Fly north. Long walks on the floodplain with a professional guide; one day canoeing.'],
      ['Day 10–11', 'Harare', 'Fly to Harare for international connections.'],
    ],
    why: 'Three different kinds of walking country, each with its own guide team, so you see how ground and game change what a walk is.',
  },
  {
    slug: 'stone-and-granite',
    title: 'Stone and Granite: the history route',
    nights: 9,
    style: 'History & wildlife',
    photo: 'matobo-boulders',
    when: 'April to October',
    fitness: 'Easy to moderate',
    pitch:
      'The south of the country: rock art and rhino in the Matobo Hills, the walls of Great Zimbabwe, and the cliffs of Gonarezhou.',
    days: [
      ['Day 1', 'Bulawayo', 'Arrive via Johannesburg or Harare. Evening walk around the colonial-era city centre.'],
      ['Days 2–4', 'Matobo Hills', 'Rock art shelters with a guide, rhino tracking on foot, the graves at World’s View and Mzilikazi’s resting place.'],
      ['Days 5–6', 'Great Zimbabwe', 'Two mornings at the site with a historian: Hill Complex, Great Enclosure and museum.'],
      ['Days 7–9', 'Gonarezhou', 'Chilojo Cliffs, sand-river walks, and a park that sees very few visitors.'],
      ['Day 10', 'Depart', 'Charter or road transfer out to Johannesburg or Harare.'],
    ],
    why: 'Most visitors never see southern Zimbabwe. This route puts deep history and wild country side by side.',
  },
  {
    slug: 'falls-and-floodplain',
    title: 'Falls and Floodplain',
    nights: 7,
    style: 'First safari',
    photo: 'vf-rainbow',
    when: 'May to October',
    fitness: 'Easy; walking is optional',
    pitch:
      'A first trip to Zimbabwe in a week: the falls, Hwange’s waterholes and a taste of walking, without long days on the road.',
    days: [
      ['Days 1–2', 'Victoria Falls', 'Falls walk, a sundowner on the upper Zambezi, an optional cross to the Zambian side.'],
      ['Days 3–7', 'Hwange', 'Two camps in different areas: drives, a walk with a professional guide, a night at a hide.'],
      ['Day 8', 'Victoria Falls', 'Fly out from Victoria Falls.'],
    ],
    why: 'Short transfers, big wildlife and the falls at their clearest. A good trip for anyone new to safari.',
  },
  {
    slug: 'lake-and-highlands',
    title: 'Lake and Highlands',
    nights: 9,
    style: 'Slow travel',
    photo: 'eh-tea',
    when: 'April to November',
    fitness: 'Moderate, with optional mountain hikes',
    pitch:
      'Slow days on Lake Kariba, canoeing in Mana Pools, then cool air and long hikes in the Eastern Highlands.',
    days: [
      ['Days 1–3', 'Lake Kariba', 'An island or Matusadona lakeshore camp: boat game viewing, a walk inland, fish eagles at dawn.'],
      ['Days 4–6', 'Mana Pools', 'Canoe and walk with a professional guide.'],
      ['Days 7–9', 'Eastern Highlands', 'Fly to Harare, drive to Nyanga. Hike Mount Nyangani, visit Mtarazi Falls, tea in the Honde Valley.'],
      ['Day 10', 'Harare', 'Drive back for international flights.'],
    ],
    why: 'Water, then mountains: the parts of Zimbabwe that feel least like a standard safari circuit.',
  },
];
