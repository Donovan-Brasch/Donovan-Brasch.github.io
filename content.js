// Everything you'll want to update lives in this file.
// Save it, upload it to GitHub, and the site updates within a minute or two.

const SITE = {
  // Paste each profile link between the quotes. An icon stays faded until it has a link.
  linkedin: "https://www.linkedin.com/in/donovan-brasch-b08104271",
  spotify: "https://open.spotify.com/playlist/4ykpWTcndHS75SN3dr36h5",
  youtube: "",

  backOHouse: "https://backohouse.com",

  // POLAROIDS. The stack on the home page, top one first.
  // Any photo works. It gets cropped to a square, so 500px wide is plenty.
  polaroids: [
    { photo: "media/desk/glacier.jpg", caption: "Palisades Glacier" },
    { photo: "media/desk/skiing.jpg", caption: "Skiing!" },
    { photo: "media/desk/outside-lands.jpg", caption: "Working Outside Lands 2026" },
    { photo: "media/desk/crater-lake.jpg", caption: "Crater Lake" },
    { photo: "media/desk/family-half.jpg", caption: "Family Half Marathon" },
    { photo: "media/desk/sisters-grad.jpg", caption: "Sister's Graduation" },
    { photo: "media/desk/waynes-world.jpg", caption: "\"Wayne's World Halloween\"" },
    { photo: "media/desk/dead-co.jpg", caption: "Dead & Co Golden Gate Park" },
    { photo: "media/desk/tahoe.jpg", caption: "Tahoe" },
  ],

  // Where recommendations get sent. Paste your Formspree form link here,
  // like "https://formspree.io/f/abcdwxyz". Until then the form won't send.
  recsEndpoint: "https://formspree.io/f/xrppwenl",

  // Your picks, shown on the three flip cards.
  // "note" is a short line about why. "link" is optional and makes the title clickable.
  myRecs: {
    book:  { title: "The Silent Patient", by: "Alex Michaelides", note: "My favorite book I've read in 2026. Keeps you on your toes.", link: "" },
    music: { kind: "Band", title: "Sylvie", by: "", note: "I love their Laurel Canyon, '70s-esque sound. Their self-titled album is my fav, but their new one is great too.", link: "" },
    film:  { title: "The Way Way Back", by: "", note: "Got a lot of love for this movie and its soundtrack.", link: "" },
  },

  // TOP SHOW. The ticket stub under Back o' House.
  // media: photos or short videos from media/shows.
  // { photo: "media/shows/byrne-1.jpg" } or { video: "media/shows/byrne-2.mp4" }
  topShow: {
    heading: "My top show of 2026",
    artist: "David Byrne",
    opener: "",
    date: "2026-08-25",
    venue: "Greek Theatre",
    city: "Berkeley",
    rank: 9,
    setlist: [
      "Who Is the Sky?", "Heaven", "Everybody Laughs", "And She Was", "Strange Overtones",
      "Houses in Motion", "T Shirt", "(Nothing but) Flowers", "This Must Be the Place (Naive Melody)",
      "What Is the Reason for It?", "Like Humans Do", "When We Are Singing", "Independence Day",
      "Slippery People", "I Met the Buddha at a Downtown Party", "My Apartment Is My Friend", "Air",
      "Psycho Killer", "Life During Wartime", "Once in a Lifetime",
    ],
    encore: ["Everybody's Coming to My House", "Burning Down the House"],
    favorite: "Once in a Lifetime",
    // My take, shown in the pop-up.
    comment: "Felt like a total celebration at some points, and at others it was a very introspective experience. Him and his band work together so well and bring the best out of the crowd. 100% recommend seeing him before he stops touring, which is hopefully not anytime soon.",
    media: [
      { photo: "media/shows/byrne-1.jpg" },
      { photo: "media/shows/byrne-2.jpg" },
    ],
  },

  // HIKE. The mountain button under Parkcast.
  // The route follows the mapped trail (OpenStreetMap) with terrain elevation.
  // Past scrambleFrom (miles) it is a sketch, sized to the 17 mile total.
  // Send your GPX and it gets replaced with your real track and stats.
  hike: {
    heading: "Favorite recent hike",
    name: "Palisade Glacier",
    where: "North Fork Big Pine Creek, Eastern Sierra",
    date: "September 2026",
    // My take, shown in the pop-up.
    comment: "If you want a more mellow (but still just as pretty) version of this hike, make Sam Mack Meadow your turning point. The scramble up over the peak to the glacier was definitely more stressful than I imagined, but if you're feeling up for it, it is such a cool experience to see the largest glacier in California while it still exists.",
    note: "Solid line is mapped trail. Dashed is scramble over the ridge to the glacier basin",
    stats: [
      { label: "Distance", value: "17 mi" },
      { label: "Elevation gain", value: "4,300 ft" },
      { label: "High point", value: "12,300 ft" },
    ],
    // Photos go in media/hike.
    photos: [
      { photo: "media/hike/hike-1.jpg", caption: "Sunrise at the start" },
      { photo: "media/hike/hike-2.jpg", caption: "Above the lakes" },
      { photo: "media/hike/hike-3.jpg", caption: "At the glacier" },
    ],
    // Each stop: latitude, longitude, miles from the trailhead, elevation in feet, label.
    outAndBack: true,
    scrambleFrom: 7.52,
    route: [
      [37.1248,-118.4439,0.00,8240, "Trailhead"], [37.1256,-118.4442,0.06,8246], [37.1263,-118.4445,0.11,8258], [37.1270,-118.4445,0.17,8281],
      [37.1278,-118.4445,0.22,8304], [37.1289,-118.4450,0.30,8333], [37.1299,-118.4456,0.38,8366], [37.1307,-118.4462,0.44,8398],
      [37.1314,-118.4468,0.51,8455], [37.1321,-118.4475,0.57,8503], [37.1327,-118.4482,0.62,8548], [37.1335,-118.4492,0.70,8607],
      [37.1340,-118.4499,0.75,8646], [37.1345,-118.4507,0.81,8682], [37.1349,-118.4515,0.86,8714], [37.1352,-118.4524,0.92,8755],
      [37.1355,-118.4532,0.97,8789], [37.1354,-118.4541,1.02,8833], [37.1347,-118.4547,1.08,8877], [37.1345,-118.4550,1.13,8925],
      [37.1342,-118.4552,1.18,8961], [37.1343,-118.4553,1.23,8991], [37.1346,-118.4560,1.28,9026], [37.1354,-118.4566,1.34,9037],
      [37.1360,-118.4571,1.40,9071], [37.1366,-118.4583,1.47,9107], [37.1370,-118.4592,1.53,9137], [37.1372,-118.4601,1.58,9163],
      [37.1371,-118.4610,1.63,9194], [37.1369,-118.4620,1.69,9196], [37.1367,-118.4630,1.75,9204], [37.1362,-118.4639,1.81,9214],
      [37.1362,-118.4648,1.86,9219], [37.1360,-118.4657,1.91,9228], [37.1356,-118.4664,1.96,9250], [37.1354,-118.4674,2.02,9283],
      [37.1353,-118.4682,2.07,9322], [37.1352,-118.4686,2.12,9356], [37.1353,-118.4694,2.17,9398], [37.1350,-118.4700,2.23,9430],
      [37.1344,-118.4702,2.28,9463], [37.1339,-118.4704,2.33,9486], [37.1333,-118.4711,2.39,9530], [37.1326,-118.4715,2.45,9551],
      [37.1322,-118.4722,2.51,9582], [37.1315,-118.4724,2.56,9610], [37.1315,-118.4730,2.62,9629], [37.1306,-118.4733,2.68,9645],
      [37.1299,-118.4731,2.73,9677], [37.1298,-118.4738,2.78,9701], [37.1293,-118.4747,2.84,9727], [37.1287,-118.4754,2.90,9771],
      [37.1285,-118.4763,2.95,9801], [37.1285,-118.4772,3.00,9816], [37.1286,-118.4784,3.07,9828], [37.1286,-118.4793,3.12,9833],
      [37.1288,-118.4803,3.18,9828], [37.1291,-118.4809,3.23,9830], [37.1287,-118.4809,3.28,9860], [37.1290,-118.4815,3.34,9893],
      [37.1294,-118.4821,3.39,9927], [37.1297,-118.4821,3.44,9968], [37.1296,-118.4834,3.51,10003], [37.1296,-118.4842,3.58,10026, "First Lake", "t"],
      [37.1291,-118.4844,3.63,10066], [37.1282,-118.4853,3.71,10096], [37.1276,-118.4859,3.77,10110], [37.1271,-118.4859,3.82,10132],
      [37.1266,-118.4862,3.87,10143], [37.1260,-118.4867,3.92,10137], [37.1263,-118.4871,3.98,10148], [37.1266,-118.4877,4.03,10161],
      [37.1268,-118.4883,4.08,10183], [37.1264,-118.4890,4.14,10206], [37.1261,-118.4899,4.19,10223], [37.1254,-118.4902,4.24,10228],
      [37.1247,-118.4906,4.30,10241], [37.1241,-118.4909,4.35,10238], [37.1236,-118.4916,4.40,10235], [37.1230,-118.4922,4.45,10253],
      [37.1227,-118.4924,4.51,10269], [37.1231,-118.4933,4.57,10291], [37.1228,-118.4942,4.62,10310, "Third Lake", "r"], [37.1226,-118.4952,4.68,10357],
      [37.1230,-118.4959,4.73,10387], [37.1234,-118.4963,4.79,10415], [37.1238,-118.4969,4.84,10438], [37.1238,-118.4965,4.89,10486],
      [37.1240,-118.4964,4.95,10500], [37.1242,-118.4970,5.00,10525], [37.1247,-118.4977,5.06,10550], [37.1254,-118.4984,5.12,10577],
      [37.1260,-118.4990,5.18,10588], [37.1266,-118.4996,5.24,10602], [37.1264,-118.5008,5.30,10609], [37.1262,-118.5015,5.36,10602],
      [37.1260,-118.5022,5.41,10604], [37.1254,-118.5024,5.46,10606], [37.1246,-118.5026,5.51,10611], [37.1241,-118.5027,5.56,10632],
      [37.1236,-118.5030,5.62,10685], [37.1233,-118.5033,5.67,10727], [37.1230,-118.5037,5.72,10789], [37.1225,-118.5036,5.78,10858],
      [37.1219,-118.5037,5.83,10932], [37.1214,-118.5041,5.89,10982], [37.1208,-118.5045,5.94,11024], [37.1201,-118.5048,6.00,11051],
      [37.1200,-118.5042,6.05,11060], [37.1196,-118.5038,6.11,11084], [37.1201,-118.5034,6.16,11109], [37.1199,-118.5028,6.22,11154],
      [37.1193,-118.5033,6.27,11192], [37.1191,-118.5026,6.32,11258], [37.1185,-118.5031,6.38,11298, "Sam Mack Meadow", "r"], [37.1178,-118.5032,6.43,11357],
      [37.1170,-118.5034,6.49,11414], [37.1163,-118.5037,6.55,11469], [37.1158,-118.5036,6.60,11520], [37.1151,-118.5030,6.67,11559],
      [37.1143,-118.5025,6.73,11579], [37.1136,-118.5023,6.78,11596], [37.1133,-118.5018,6.84,11636], [37.1127,-118.5017,6.89,11686],
      [37.1121,-118.5012,6.95,11757], [37.1114,-118.5011,7.00,11832], [37.1107,-118.5013,7.05,11912], [37.1098,-118.5013,7.11,11981],
      [37.1093,-118.5020,7.17,12047], [37.1085,-118.5023,7.22,12105], [37.1078,-118.5030,7.29,12176], [37.1067,-118.5034,7.37,12230],
      [37.1059,-118.5030,7.43,12277], [37.1051,-118.5030,7.48,12296], [37.1046,-118.5031,7.52,12315],
      [37.1036,-118.5043,7.80,12250], [37.1026,-118.5056,8.05,12180], [37.1014,-118.5070,8.30,12130], [37.1006,-118.5082,8.50,12100, "Palisade Glacier", "r"],
    ],
  },

  // RECENT CLASSES. Edit freely.
  classes: [
    {
      term: "",
      list: [
        { name: "Principles & Techniques of Data Science", code: "Data C100", note: "" },
        { name: "Advanced Intermediate French", code: "French 4", note: "" },
        { name: "The Economics of the Clean Energy Transition", code: "ENVECON 147", note: "" },
        { name: "Introduction to Optimization Modeling", code: "INDENG 164", note: "" },
        { name: "Human Contexts and Ethics of Data", code: "Data C104", note: "" },
        { name: "Business Models for Sustainability", code: "UGBA 196SA", note: "" },
        { name: "Wildlife Ecology", code: "ESPM 114", note: "" },
        { name: "Introductory Applied Econometrics", code: "ENVECON C118", note: "" },
      ],
    },
  ],

  // SCIENCES PO
  abroad: {
    blurb: "I spent spring 2026 earning a Certificate in Social Sciences at Sciences Po Paris, practicing my French, and playing for the university soccer team.",
    // Every place you traveled. The map opens on the "home" place.
    // Clicking a pin shows that place's photos. Photos go in media/abroad.
    places: [
      { name: "Paris", lat: 48.8566, lon: 2.3522, when: "Spring 2026", home: true, photos: [{ photo: "media/abroad/paris-1.jpg" }, { photo: "media/abroad/paris-2.jpg" }, { photo: "media/abroad/paris-3.jpg" }] },
      { name: "Strasbourg", lat: 48.582, lon: 7.75, when: "January 2026", photos: [{ photo: "media/abroad/strasbourg-2.jpg" }, { photo: "media/abroad/strasbourg-1.jpg" }, { photo: "media/abroad/strasbourg-3.jpg" }] },
      { name: "London", lat: 51.4745, lon: -0.2211, when: "January 2026", photos: [{ photo: "media/abroad/london-1.jpg" }, { photo: "media/abroad/london-2.jpg" }, { photo: "media/abroad/london-3.jpg" }] },
      { name: "Bucharest", lat: 44.4261, lon: 26.0793, when: "February 2026", photos: [{ photo: "media/abroad/bucharest-1.jpg" }, { photo: "media/abroad/bucharest-3.jpg" }] },
      { name: "Sinaia", lat: 45.3502, lon: 25.5338, when: "February 2026", photos: [{ photo: "media/abroad/sinaia-1.jpg" }, { photo: "media/abroad/sinaia-2.jpg" }, { photo: "media/abroad/sinaia-3.jpg" }] },
      { name: "Rome", lat: 41.8876, lon: 12.474, when: "February 2026", photos: [{ photo: "media/abroad/rome-1.jpg" }, { photo: "media/abroad/rome-2.jpg" }, { photo: "media/abroad/rome-3.jpg" }] },
      { name: "Prague", lat: 50.08, lon: 14.42, when: "February 2026", photos: [{ photo: "media/abroad/prague-1.jpg" }, { photo: "media/abroad/prague-2.jpg" }, { photo: "media/abroad/prague-3.jpg" }] },
      { name: "Amsterdam", lat: 52.3583, lon: 4.8669, when: "March 2026", photos: [{ photo: "media/abroad/amsterdam-1.jpg" }, { photo: "media/abroad/amsterdam-2.jpg" }, { photo: "media/abroad/amsterdam-3.jpg" }] },
      { name: "Dublin", lat: 53.344, lon: -6.265, when: "March 2026", photos: [{ photo: "media/abroad/dublin-1.jpg" }, { photo: "media/abroad/dublin-2.jpg" }] },
      { name: "Lisbon", lat: 38.7223, lon: -9.1393, when: "April 2026", photos: [{ photo: "media/abroad/lisbon-1.jpg" }, { photo: "media/abroad/lisbon-2.jpg" }, { photo: "media/abroad/lisbon-3.jpg" }] },
      { name: "Seville", lat: 37.3775, lon: -5.9878, when: "April 2026", photos: [{ photo: "media/abroad/seville-1.jpg" }, { photo: "media/abroad/seville-2.jpg" }, { photo: "media/abroad/seville-3.jpg" }] },
      { name: "Brussels", lat: 50.8467, lon: 4.3527, when: "April 2026", photos: [{ photo: "media/abroad/brussels-1.jpg" }] },
      { name: "Valencia", lat: 39.4855, lon: -0.3254, when: "May 2026", photos: [{ photo: "media/abroad/valencia-1.jpg" }, { photo: "media/abroad/valencia-2.jpg" }, { photo: "media/abroad/valencia-3.jpg" }] },
    ],
  },

  // BEACN. Yours to rewrite.
  beacn: {
    link: "https://www.beacn.org",
    blurb: "BEACN is UC Berkeley's student-run environmental and strategy consulting group. I joined in January 2025 and am now a Senior Project Manager.",
    current: { client: "Clean Air Task Force", what: "Developing KPIs and investor-facing dashboards for next-gen geothermal technologies." },
    past: [
      { client: "Twilio", when: "Fall 2025", what: "Built spatial analysis tools to evaluate emergency alert coverage and find gaps in reach." },
      { client: "Solar Energy Industries Association", when: "Spring 2025", what: "Assessed the feasibility of recycling solar panel glass and built partner-facing dashboards on recyclers' capabilities and market outlook." },
    ],
  },

  // MUSIC
  // Copy a block for each video. Use EITHER youtube OR file.
  //   youtube: the video's ID, the part after "v=" in its link.
  //            Unlisted YouTube videos work and are the best option.
  //   file:    a video in media/music, under 100 MB (GitHub's limit).
  //   poster:  optional still image to show before a file plays.
  //
  // {
  //   title: "Song name",
  //   note: "Who played and where",
  //   youtube: "dQw4w9WgXcQ",
  // },
  music: [
  ],

  // CERAMICS
  // Put photos in media/ceramics, then add a block for each piece.
  // "note" is optional.
  //
  // {
  //   photo: "media/ceramics/mug.jpg",
  //   title: "Mug",
  //   note: "Speckled stoneware",
  // },
  ceramics: [
  ],
};
