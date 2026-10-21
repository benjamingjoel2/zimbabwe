// The eight destinations. Every number, season and rule in here is listed in
// FACTS-TO-VERIFY.md; the `[F#]` comments point to its entries.
//
// `photo` is a key in photos.mjs, or null when we have not found an Unsplash
// photo whose location we could verify. Those pages show a drawn panel instead.

export default [
  {
    slug: 'victoria-falls',
    name: 'Victoria Falls',
    local: 'Mosi-oa-Tunya',
    region: 'Far north-west, on the Zambezi',
    photo: 'vf-hero',
    gallery: ['vf-rainbow', 'vf-bridge-train', 'vf-rhino'],
    summary:
      'The falls, the gorges below them and a small town that makes an easy first or last night. Better than its reputation for crowds if you time it.',
    intro: [
      'The Zambezi drops roughly 100 metres into a slot gorge along a lip about 1.7 kilometres long. [F1] Most of that lip faces Zimbabwe, and the rainforest path on the Zimbabwe side looks straight across at it from a series of viewpoints.',
      'How the falls look depends almost entirely on the month. In flood the spray hides much of the water; at low water you see the bare rock and the shape of the gorge. Our <a href="/victoria-falls-by-month/">month-by-month guide</a> sets out what you can expect, and which side of the border is better at the time.',
    ],
    highlights: [
      'The rainforest walk on the Zimbabwe side, ideally at opening time before tour groups arrive',
      'The gorges below the falls on foot, with a guide who knows the paths down',
      'White-water rafting in the low-water months, when the full run of rapids is usually open [F6]',
      'A morning game walk or drive in Zambezi National Park, upstream of town',
      'Crossing to the Zambian side for the Knife-Edge Bridge and, in season, Livingstone Island',
    ],
    walking:
      'Guided walks in Zambezi National Park and along the upper river are run by licensed professional guides. They are a gentle introduction before a longer walking safari elsewhere.',
    bestTime:
      'Depends what you want: peak flow and heavy spray roughly March–May, clearest views of the rock roughly August–December. See the month guide.',
    howLong: '2 nights is enough for most people; 3 if you want to raft and cross to Zambia.',
    gettingThere:
      'Victoria Falls International Airport has regional flights and some long-haul connections via Johannesburg and elsewhere. [F8] Light-aircraft and road transfers link to Hwange.',
    pairsWith: ['hwange', 'mana-pools', 'lake-kariba'],
    facts: [
      ['Lip width', 'About 1,700 m [F1]'],
      ['Height', 'About 100–108 m [F1]'],
      ['World Heritage', 'Inscribed by UNESCO in 1989, shared with Zambia [F2]'],
      ['Border', 'Victoria Falls Bridge links Zimbabwe and Zambia'],
    ],
  },
  {
    slug: 'hwange',
    name: 'Hwange National Park',
    region: 'West, on the edge of the Kalahari sands',
    photo: 'hwange-waterhole',
    gallery: ['hwange-zebra', 'hwange-lions', 'hwange-roller'],
    summary:
      'Zimbabwe’s largest park: teak woodland, open pans and one of Africa’s big elephant populations. Remote concessions in the south and east see few vehicles.',
    intro: [
      'Hwange covers roughly 14,600 square kilometres of Kalahari sand, teak and mopane woodland and grassland pans. [F9] There is almost no surface water in the dry season, so pumped waterholes draw game in. By September and October, sitting quietly at one of them can be the best wildlife watching in southern Africa.',
      'The park is big enough that where you stay matters more than the name on the map. The busy northern area around Main Camp is easy to reach from Victoria Falls. The private concessions further in see far fewer vehicles and allow walking with a professional guide.',
    ],
    highlights: [
      'Elephant herds coming in to drink at pans in the late dry season',
      'Walking with a professional guide in the private concessions, often tracking on the Kalahari sand',
      'Lion, wild dog, sable and roan antelope, with luck and patience',
      'Hides at waterholes for watching at eye level',
    ],
    walking:
      'Several concessions combine morning walks with afternoon drives. On sand the tracks are easy to read, which makes Hwange a good place to learn tracking.',
    bestTime:
      'July to October for game concentrated at water. The green season (roughly December to March) is quieter, with new-born animals and excellent birding; some camps close. [F10]',
    howLong: '3–4 nights, ideally split between two areas of the park.',
    gettingThere:
      'About 2–3 hours by road from Victoria Falls to the northern sections; light aircraft to the remoter camps. [F11]',
    pairsWith: ['victoria-falls', 'matobo-hills', 'mana-pools'],
    facts: [
      ['Area', 'About 14,600 km² [F9]'],
      ['Elephants', 'Commonly estimated at over 40,000 in the wider ecosystem [F12]'],
      ['Habitat', 'Kalahari sand, teak and mopane woodland, pans'],
    ],
  },
  {
    slug: 'mana-pools',
    name: 'Mana Pools',
    region: 'North, on the Zambezi floodplain',
    photo: 'mana-elephant-calf',
    gallery: ['mana-elephants-river', 'zambezi-canoe'],
    summary:
      'Old river terraces under winterthorn and mahogany, with the Zambezi in front and the Zambian escarpment beyond. The best-known walking country in Zimbabwe.',
    intro: [
      'Mana Pools sits on the south bank of the lower Zambezi. The name comes from the four main pools, old river channels that hold water into the dry season. [F13] The terraces are open and park-like, shaded by winterthorn (<i>Faidherbia albida</i>) and mahogany, so you can see a long way on foot.',
      'It is the place most associated with Zimbabwean walking guides. Late in the dry season elephants stand on their hind legs to reach winterthorn pods. Canoe trips drift past hippo pods and elephants crossing between islands.',
    ],
    highlights: [
      'Walking safaris on the floodplain with a fully licensed professional guide',
      'Canoeing sections of the Zambezi, from a few hours to multi-day trips',
      'Elephants feeding on winterthorn pods in the late dry season',
      'Wild dog, which den in the area in some years',
    ],
    walking:
      'Mana Pools is the reason many guides in Zimbabwe train as they do. Expect long, quiet walks, close but careful approaches to big game, and a lot of time sitting still. Read <a href="/guiding/">how the licence works</a>.',
    bestTime:
      'Roughly May to October; most camps close during the rains, around November/December to March or April, and roads can become impassable. [F14]',
    howLong: '4 nights minimum; walking and canoeing both reward time.',
    gettingThere:
      'Light aircraft from Harare, Kariba or Victoria Falls to airstrips near the camps; road access is long and best in the dry season. [F15]',
    pairsWith: ['lake-kariba', 'hwange', 'victoria-falls'],
    facts: [
      ['World Heritage', 'Mana Pools with the Sapi and Chewore safari areas, inscribed 1984 [F16]'],
      ['Season', 'Most camps open about April/May–November [F14]'],
      ['Known for', 'Walking and canoe safaris'],
    ],
  },
  {
    slug: 'lake-kariba',
    name: 'Lake Kariba',
    region: 'North, between Mana Pools and Victoria Falls',
    photo: 'kariba-trees',
    gallery: ['kariba-fish-eagle', 'kariba-elephants', 'kariba-hippo'],
    summary:
      'A vast reservoir with drowned forests, fish eagles and the steep Matusadona shoreline. Slow days on the water between busier safari stops.',
    intro: [
      'Kariba was created when the Zambezi was dammed in the late 1950s, and is one of the largest man-made lakes in the world by volume. [F17] The flooded valley left forests of dead hardwood standing in the water. Their bleached trunks are the lake’s signature, along with the cry of fish eagles at dawn.',
      'On the southern shore, Matusadona National Park runs up to a rugged escarpment. Its lakeshore grasslands draw elephant, buffalo and hippo. Houseboats, island camps and boat-based game viewing make Kariba a change of pace from vehicle safaris.',
    ],
    highlights: [
      'Boat game viewing along the Matusadona shoreline',
      'Guided walks inland from the lake in Matusadona [F18]',
      'Tigerfish angling (catch and release) in season',
      'Sunsets over the drowned trees',
    ],
    walking:
      'Walking in Matusadona is usually done from lakeshore camps with a professional guide; the terrain is hillier and bushier than Mana Pools.',
    bestTime:
      'May to November for game on the shoreline; September–November is very hot. Water levels vary year to year with rainfall and dam operation. [F19]',
    howLong: '2–3 nights, or longer on a houseboat.',
    gettingThere:
      'Light aircraft or boat transfer from Kariba town; Kariba also has road links from Harare. [F20]',
    pairsWith: ['mana-pools', 'victoria-falls'],
    facts: [
      ['Created', 'Dam completed around 1959 [F17]'],
      ['Shoreline park', 'Matusadona National Park'],
      ['Shared with', 'Zambia'],
    ],
  },
  {
    slug: 'matobo-hills',
    name: 'Matobo Hills',
    region: 'South-west, near Bulawayo',
    photo: 'matobo-view',
    gallery: ['matobo-boulders', 'matobo-kopje', 'matobo-rockpool'],
    summary:
      'Balancing granite, painted rock shelters and rhino tracked on foot. The history most visitors to Zimbabwe miss, in some of its most beautiful country.',
    intro: [
      'The Matobo Hills are a jumble of granite domes, spires and balancing boulders weathered out of the same rock over a very long time. [F21] For thousands of years people have sheltered here. The caves and overhangs hold one of the densest concentrations of rock paintings in southern Africa.',
      'The hills matter in later history too. They hold sites sacred to the Mwari (Mwali) shrine tradition, the grave of the Ndebele king Mzilikazi, and World’s View, where Cecil Rhodes is buried. A good guide explains these sites in full context, not as a colonial postcard.',
    ],
    highlights: [
      'Rock art shelters such as Nswatugi and Pomongwe, with a guide who reads the paintings [F22]',
      'Tracking white and black rhino on foot in Matobo National Park’s game area [F23]',
      'Granite scrambling, birding (the hills are known for black eagles) and quiet picnics on the domes',
      'Visiting World’s View and talking through the hills’ layered history',
    ],
    walking:
      'Rhino tracking here is done on foot with specialist guides, often with rangers. It is one of the most memorable walks in the country and suits a reasonable level of fitness.',
    bestTime:
      'All year. April–October is dry and clear; the summer rains turn the hills green and dramatic. [F24]',
    howLong: '2–3 nights.',
    gettingThere: 'About 45 minutes’ drive from Bulawayo. [F25]',
    pairsWith: ['hwange', 'great-zimbabwe'],
    facts: [
      ['World Heritage', 'Matobo Hills, inscribed 2003 [F26]'],
      ['Known for', 'Rock art, granite landscapes, rhino'],
      ['Nearest city', 'Bulawayo'],
    ],
  },
  {
    slug: 'great-zimbabwe',
    name: 'Great Zimbabwe',
    region: 'South-east, near Masvingo',
    photo: null,
    gallery: [],
    summary:
      'The stone city that gave the country its name. Massive dry-stone walls built without mortar, best understood with time and a good historian.',
    intro: [
      'Great Zimbabwe was the capital of a powerful state on the southern African plateau. It was built and occupied roughly between the 11th and 15th centuries by ancestors of the Shona. [F27] Its walls are made of shaped granite blocks laid without mortar. The largest, around the Great Enclosure, are over 10 metres high in places. [F28] “Zimbabwe” is usually explained as coming from Shona words for “houses of stone”.',
      'Colonial-era writers refused to credit the site to African builders, and that falsehood shaped how it was presented for decades. Visiting with a guide who knows the archaeology and the politics of its interpretation is the point of coming.',
    ],
    highlights: [
      'The Hill Complex, the oldest part, with views over the valley',
      'The Great Enclosure and its conical tower',
      'The site museum, home to several of the carved soapstone Zimbabwe Birds [F29]',
      'Lake Mutirikwi nearby, for a quiet night before or after',
    ],
    walking:
      'Allow a full morning on foot. The climb to the Hill Complex is steep in places but short.',
    bestTime: 'All year; early morning light and fewer people. Hot from October to March.',
    howLong: '1–2 nights; fits between Matobo and Gonarezhou or the Eastern Highlands.',
    gettingThere: 'About 30 minutes from Masvingo; roughly 4–5 hours by road from Harare or Bulawayo. [F30]',
    pairsWith: ['matobo-hills', 'gonarezhou', 'eastern-highlands'],
    facts: [
      ['World Heritage', 'Great Zimbabwe National Monument, inscribed 1986 [F31]'],
      ['Built', 'About 11th–15th century CE [F27]'],
      ['Material', 'Granite blocks, dry-stone (no mortar)'],
    ],
  },
  {
    slug: 'gonarezhou',
    name: 'Gonarezhou National Park',
    region: 'Far south-east, on the Mozambique border',
    photo: null,
    gallery: [],
    summary:
      '“The place of elephants”: red sandstone cliffs, big sand rivers and very few other vehicles. Wild, remote and recovering well.',
    intro: [
      'Gonarezhou is usually translated from Shona as “the place of elephants”. [F32] At around 5,000 square kilometres it is Zimbabwe’s second-largest national park. [F33] Its best-known landmark is the Chilojo Cliffs, a wall of red and cream sandstone above the Runde River.',
      'Gonarezhou is managed in partnership with a conservation trust and forms part of the Great Limpopo Transfrontier Park. [F34] It has fewer camps and far fewer visitors than the northern parks. The elephants have a history of poaching and can be wary, which is one more reason to go with an experienced guide.',
    ],
    highlights: [
      'The Chilojo Cliffs at sunrise from the Runde riverbed',
      'Walking the wide sand rivers with a professional guide',
      'Self-reliant camping or one of a small number of lodges',
      'Big elephant herds, and a park that feels genuinely remote',
    ],
    walking:
      'Walking is done with professional guides from the few camps that operate here. Distances are long and the terrain is big; a good choice for experienced safari-goers.',
    bestTime:
      'May to October. Parts of the park can be closed or inaccessible during the rains (roughly November to April). [F35]',
    howLong: '3–4 nights; it takes time to get here and should not be rushed.',
    gettingThere:
      'Long road transfers via Chiredzi, or charter flights to airstrips in or near the park. [F36]',
    pairsWith: ['great-zimbabwe', 'matobo-hills'],
    facts: [
      ['Area', 'About 5,000 km² [F33]'],
      ['Landmark', 'Chilojo Cliffs above the Runde River'],
      ['Part of', 'Great Limpopo Transfrontier Park [F34]'],
    ],
  },
  {
    slug: 'eastern-highlands',
    name: 'Eastern Highlands',
    region: 'East, along the Mozambique border',
    photo: 'nyanga-peaks',
    gallery: ['eh-tea', 'honde-river', 'nyanga-lake'],
    summary:
      'Cool mountains, montane forest, tea estates and waterfalls: Nyanga, the Bvumba and Chimanimani. Hiking country and a contrast to the lowveld.',
    intro: [
      'The Eastern Highlands run north to south along the border with Mozambique. In Nyanga, Mount Nyangani is the highest point in Zimbabwe at about 2,590 metres. [F37] There are trout streams, old terraced hill farms and Mtarazi Falls. Further south, the Bvumba near Mutare is misty forest and botanical gardens. Chimanimani has rugged quartzite peaks for multi-day hikes.',
      'Few safari itineraries come here, which is the appeal. It suits walkers, birders after forest species, and anyone who wants cool nights and long views after time in the hot lowveld.',
    ],
    highlights: [
      'Hiking Mount Nyangani or the Chimanimani mountains with a local guide',
      'Forest birding in the Bvumba and the Honde Valley',
      'Tea estates of the Honde Valley',
      'Archaeological terraces and stone-built sites in the Nyanga hills [F38]',
    ],
    walking:
      'Walking here is hiking rather than wildlife walking: trails, ridges and forest paths. Mountain weather changes fast; go with a local guide.',
    bestTime:
      'April to October for clear hiking weather; nights can be cold in June–August. The summer months bring mist and rain. [F39]',
    howLong: '3–4 nights, split between two areas.',
    gettingThere: 'Roughly 3–4 hours by road from Harare to Nyanga or Mutare. [F40]',
    pairsWith: ['great-zimbabwe', 'gonarezhou'],
    facts: [
      ['Highest point', 'Mount Nyangani, about 2,590 m [F37]'],
      ['Areas', 'Nyanga, Bvumba, Honde Valley, Chimanimani'],
      ['Climate', 'Cool and often misty; cold nights in winter'],
    ],
  },
];
