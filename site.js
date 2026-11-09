(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Links
  document.querySelectorAll("[data-link]").forEach(function (a) {
    a.href = a.dataset.link === "beacn" ? SITE.beacn.link : SITE[a.dataset.link];
  });

  // Shuffle the polaroids.
  (function () {
    var box = document.getElementById("snaps"), turn = [-5, 3, -2, 5, -3, 2];
    var pile = (SITE.polaroids || []).map(function (p, i) {
      var f = document.createElement("figure");
      f.className = "snap";
      f.innerHTML = '<img src="' + esc(p.photo) + '" alt="' + esc(p.caption) + '"><figcaption>' + esc(p.caption) + "</figcaption>";
      f.style.setProperty("--t", turn[i % turn.length] + "deg");
      box.appendChild(f);
      return f;
    });
    function stack() {
      pile.forEach(function (f, i) { f.style.zIndex = pile.length - i; f.setAttribute("aria-hidden", i ? "true" : "false"); f.classList.toggle("top", !i); });
      box.setAttribute("aria-label", "Photo: " + pile[0].querySelector("img").alt + ". Show the next one");
    }
    if (pile.length) stack();
    var busy = false;
    box.addEventListener("click", function () {
      if (busy || pile.length < 2) return;
      busy = true;
      var top = pile[0];
      top.classList.add("out");
      setTimeout(function () {
        pile.push(pile.shift());
        stack();
        top.classList.remove("out");
        busy = false;
      }, 260);
    });
  })();

  // Social icons. Each stays faded until content.js has its link.
  var ICONS = {
    linkedin: ["LinkedIn", "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.54h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.65V21h-4z"],
    spotify: ["Spotify", "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.580 14.430a.62.62 0 0 1-.86.2c-2.340-1.430-5.300-1.760-8.780-.96a.62.62 0 1 1-.28-1.220c3.810-.87 7.080-.5 9.720 1.120.3.180.39.570.2.860zm1.220-2.720a.78.78 0 0 1-1.070.26c-2.680-1.650-6.780-2.130-9.950-1.160a.78.780 0 1 1-.45-1.490c3.630-1.100 8.140-.57 11.220 1.320.37.230.48.710.25 1.070zm.100-2.830C14.690 8.970 9.390 8.800 6.320 9.730a.94.94 0 1 1-.54-1.790c3.520-1.070 9.380-.860 13.080 1.330a.94.94 0 0 1-.96 1.610z"],
    youtube: ["YouTube", "M23 12s0-3.500-.45-5.180a2.900 2.900 0 0 0-2.040-2.050C18.700 4.300 12 4.300 12 4.300s-6.700 0-8.510.47a2.900 2.900 0 0 0-2.040 2.050C1 8.500 1 12 1 12s0 3.500.45 5.180a2.900 2.900 0 0 0 2.040 2.050c1.810.47 8.510.47 8.510.47s6.700 0 8.510-.47a2.900 2.900 0 0 0 2.040-2.050C23 15.500 23 12 23 12zM9.800 15.500v-7l6 3.500z"],
  };
  document.getElementById("social").innerHTML = Object.keys(ICONS).map(function (k) {
    var svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[k][1] + '"/></svg>';
    return SITE[k]
      ? '<li><a href="' + esc(SITE[k]) + '" target="_blank" rel="noopener" aria-label="' + ICONS[k][0] + '">' + svg + "</a></li>"
      : '<li><span title="' + ICONS[k][0] + ' coming soon">' + svg + "</span></li>";
  }).join("");

  function caption(item) {
    return "<figcaption><b>" + esc(item.title) + "</b>" + (item.note ? "<span>" + esc(item.note) + "</span>" : "") + "</figcaption>";
  }

  // Classes
  document.getElementById("terms").innerHTML = SITE.classes.map(function (t, ti) {
    return '<div class="term">' + (t.term ? '<h4 class="pop" style="--d:' + ti * 0.1 + 's">' + esc(t.term) + "</h4>" : "") + "<ul>" + t.list.map(function (c, ci) {
      return '<li class="card pop" style="--d:' + (ti * 0.1 + (ci + 1) * 0.07).toFixed(2) + 's"><b>' + esc(c.name) +
        (c.code ? "<small>" + esc(c.code) + "</small>" : "") + "</b>" + (c.note ? "<span>" + esc(c.note) + "</span>" : "") + "</li>";
    }).join("") + "</ul></div>";
  }).join("");

  // Ticket stub, same layout and seat math as Back o' House
  function stubHash(s) { var h = 0; s = String(s); for (var i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0; return h; }
  var show = SITE.topShow, sd = /^(\d{4})-(\d{2})-(\d{2})/.exec(show.date);
  var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  var sh = stubHash(show.artist + "|" + show.date + "|" + show.venue);
  var end = function (side) {
    return '<span class="stub-end stub-end-' + side + '" aria-hidden="true"><span class="stub-num">' + (sh % 40 + 1) + '</span><span class="stub-lab">SEC</span><span class="stub-num">' + ((sh >>> 6) % 36 + 1) + '</span><span class="stub-lab">ROW</span><span class="stub-num">' + ((sh >>> 12) % 28 + 1) + '</span><span class="stub-lab">SEAT</span></span>';
  };
  document.getElementById("stubhead").textContent = show.heading;
  document.getElementById("stub").innerHTML = '<button class="ticket-stub" type="button" id="stubbtn" aria-label="' + esc(show.artist) + ", " + esc(show.date) + ', open setlist">' + end("l") +
    '<span class="stub-body"><span class="stub-venue">' + esc(show.venue) + '</span><span class="stub-city">' + esc(show.city) + '</span><span class="stub-main"><span class="stub-date"><span class="stub-month">' + MONTHS[+sd[2] - 1] + '</span><span class="stub-day">' + (+sd[3]) + '</span><span class="stub-year">' + sd[1] + '</span></span>' +
    '<span class="stub-copy"><span class="stub-presents">BoH presents</span><span class="stub-artist">' + esc(show.artist) + '</span><span class="stub-opener">' + (show.opener ? "w/ " + esc(show.opener) : "&nbsp;") + '</span><span class="stub-admit">ADMISSION <b>COMP</b></span></span></span></span>' + end("r") + '<span class="openme">See setlist<span class="wide"> and photos</span></span></button>';
  var songs = function (list, start) { return '<ol class="setlist" style="counter-reset:s ' + start + '">' + list.map(function (t) { return "<li><span>" + esc(t) + (t === show.favorite ? ' <span class="fav" title="My favorite song of the night">★</span>' : "") + "</span></li>"; }).join("") + "</ol>"; };
  document.getElementById("showbody").innerHTML = '<h2 class="show-title" id="showtitle">' + esc(show.artist) + '</h2><p class="show-meta">' + esc(show.date) + " &middot; " + esc(show.venue) + " &middot; " + esc(show.city) + "</p>" +
    '<p class="placed">Placed<b>#' + esc(show.rank) + "</b>on my list</p>" +
    '<div class="show-cols"><div><p class="show-h">Setlist</p>' + songs(show.setlist, 0) + '<p class="encore">Encore</p>' + songs(show.encore, show.setlist.length) + '<p class="source"><span class="fav">★</span> My favorite of the night. Setlist from setlist.fm</p></div><div><p class="show-h">From the night</p><div class="media">' +
    (show.media.length ? show.media.map(function (m) { return m.video ? '<video controls preload="none" src="' + esc(m.video) + '"></video>' : '<img src="' + esc(m.photo) + '" alt="' + esc(show.artist) + ' at the ' + esc(show.venue) + '" loading="lazy">'; }).join("") : '<div class="blank">Photo soon</div><div class="blank">Video soon</div>') + "</div>" + (show.comment ? '<p class="mytake">' + esc(show.comment) + "</p>" : "") + "</div></div>";

  // Hike dashboard
  var hike = SITE.hike, R = hike.route;
  document.getElementById("hikehead").textContent = hike.heading;
  document.getElementById("hikename").textContent = hike.name;
  document.getElementById("hikestats").textContent = hike.stats[0].value + ", " + hike.stats[1].value + " gain";
  (function () {
    var cosLat = Math.cos(R[0][0] * Math.PI / 180), W = 420, H = 250, pad = 26;
    var xs = R.map(function (p) { return p[1] * cosLat; }), ys = R.map(function (p) { return p[0]; });
    var minX = Math.min.apply(0, xs), maxX = Math.max.apply(0, xs), minY = Math.min.apply(0, ys), maxY = Math.max.apply(0, ys);
    var scale = Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2) / (maxY - minY));
    var ox = (W - (maxX - minX) * scale) / 2, oy = (H - (maxY - minY) * scale) / 2;
    var mx = function (p) { return ox + (p[1] * cosLat - minX) * scale; }, my = function (p) { return H - oy - (p[0] - minY) * scale; };
    var stops = R.map(function (p) { return mx(p).toFixed(1) + " " + my(p).toFixed(1); });
    var cut = hike.scrambleFrom ? R.findIndex(function (p) { return p[2] >= hike.scrambleFrom; }) : R.length - 1;
    var line = "M" + stops.slice(0, cut + 1).join("L"), scramble = cut < R.length - 1 ? "M" + stops.slice(cut).join("L") : "";
    var labels = R.filter(function (p) { return p[4]; }).map(function (p) {
      var side = p[5] || (mx(p) > W * 0.5 ? "l" : "r"), x = mx(p), y = my(p);
      var tx = x + (side === "l" ? -10 : side === "r" ? 10 : 0), ty = y + (side === "b" ? 20 : side === "t" ? -12 : 5);
      return '<circle class="stop" cx="' + x + '" cy="' + y + '" r="4.5"/><text x="' + tx + '" y="' + ty + '" text-anchor="' + (side === "l" ? "end" : side === "r" ? "start" : "middle") + '">' + esc(p[4]) + "</text>";
    }).join("");
    // Elevation profile
    var track = R.map(function (p) { return { mi: p[2], ft: p[3], lat: p[0], lon: p[1] }; });
    if (hike.outAndBack) {
      var far = track[track.length - 1].mi;
      track = track.concat(track.slice(0, -1).reverse().map(function (t) { return { mi: far * 2 - t.mi, ft: t.ft, lat: t.lat, lon: t.lon }; }));
    }
    var PW = 440, PH = 250, PB = 22, PL = 58;
    var maxMi = track[track.length - 1].mi, fts = track.map(function (t) { return t.ft; });
    var lo = Math.floor(Math.min.apply(0, fts) / 1000) * 1000, hi = Math.ceil(Math.max.apply(0, fts) / 1000) * 1000;
    var px = function (m) { return PL + m / maxMi * (PW - PL - 6); }, py = function (f) { return 6 + (hi - f) / (hi - lo) * (PH - PB - 6); };
    var edge = track.map(function (t, i) { return (i ? "L" : "M") + px(t.mi).toFixed(1) + " " + py(t.ft).toFixed(1); }).join("");
    var ticks = [lo, hi].map(function (f) { return '<text x="' + (PL - 6) + '" y="' + (py(f) + 4) + '" text-anchor="end">' + f.toLocaleString() + " ft</text>"; }).join("") +
      [0, maxMi / 2, maxMi].map(function (m, i) { return '<text x="' + px(m) + '" y="' + (PH - 5) + '" text-anchor="' + ["start", "middle", "end"][i] + '">' + Math.round(m * 10) / 10 + " mi</text>"; }).join("");
    document.getElementById("hikebody").innerHTML = '<div class="hike-head"><div><h2 class="hike-title" id="hiketitle">' + esc(hike.name) + '</h2><p class="hike-meta">' + esc(hike.where) + (hike.date ? " &middot; " + esc(hike.date) : "") + "</p></div>" +
      '<dl class="stats">' + hike.stats.map(function (s) { return "<div><dt>" + esc(s.label) + "</dt><dd>" + esc(s.value) + "</dd></div>"; }).join("") + "</dl></div>" +
      (hike.comment ? '<p class="mytake">' + esc(hike.comment) + "</p>" : "") +
      '<div class="hike-photos">' + (hike.photos.length ? hike.photos.map(function (p) { return '<figure><img src="' + esc(p.photo) + '" alt="' + esc(p.caption) + '" loading="lazy"></figure>'; }).join("") : '<div class="blank">Photo soon</div><div class="blank">Photo soon</div><div class="blank">Photo soon</div>') + "</div>" +
      '<div class="hike-charts"><svg class="routemap" id="routemap" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Route map of the hike"><path class="line" d="' + line + '"/>' + (scramble ? '<path class="line dash" d="' + scramble + '"/>' : "") + labels + '<circle class="here" id="maphere" r="6" cx="-20" cy="-20"/></svg>' +
      '<svg class="profile" id="profile" viewBox="0 0 ' + PW + " " + PH + '" role="img" aria-label="Elevation profile of the hike"><path class="area" d="' + edge + "L" + px(maxMi) + " " + (PH - PB) + "L" + px(0) + " " + (PH - PB) + 'Z"/><path class="edge" d="' + edge + '"/>' + ticks + '<line class="cursor" id="pcursor" y1="6" y2="' + (PH - PB) + '" x1="-9" x2="-9"/><circle class="here" id="phere" r="5" cx="-20" cy="-20"/></svg></div>' +
      '<div class="hike-foot"><p class="readout" id="readout">Move along the map or the chart to follow the route.</p>' + (hike.note ? '<p class="hike-note">' + esc(hike.note) + "</p>" : "") + "</div>";
    var prof = document.getElementById("profile");
    function at(m) {
      var i = 1; while (i < track.length - 1 && track[i].mi < m) i++;
      var a = track[i - 1], b = track[i], t = (m - a.mi) / ((b.mi - a.mi) || 1);
      return { ft: a.ft + (b.ft - a.ft) * t, lat: a.lat + (b.lat - a.lat) * t, lon: a.lon + (b.lon - a.lon) * t };
    }
    function follow(m) {
      var p = at(m), c = document.getElementById("pcursor"), ph = document.getElementById("phere"), mh = document.getElementById("maphere");
      c.setAttribute("x1", px(m)); c.setAttribute("x2", px(m));
      ph.setAttribute("cx", px(m)); ph.setAttribute("cy", py(p.ft));
      mh.setAttribute("cx", mx([p.lat, p.lon])); mh.setAttribute("cy", my([p.lat, p.lon]));
      document.getElementById("readout").textContent = (Math.round(m * 10) / 10) + " mi, " + Math.round(p.ft).toLocaleString() + " ft";
    }
    prof.addEventListener("pointermove", function (e) {
      var r = prof.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * PW;
      follow(Math.max(0, Math.min(maxMi, (x - PL) / (PW - PL - 6) * maxMi)));
    });
    var rm = document.getElementById("routemap");
    rm.addEventListener("pointermove", function (e) {
      var b = rm.getBoundingClientRect(), x = (e.clientX - b.left) / b.width * W, y = (e.clientY - b.top) / b.height * H, best = 0, bd = Infinity;
      R.forEach(function (p) { var d = Math.pow(mx(p) - x, 2) + Math.pow(my(p) - y, 2); if (d < bd) { bd = d; best = p[2]; } });
      follow(best);
    });
  })();

  // Open and close the pop-up dashboards
  function wire(btnId, sheetId) {
    var sheet = document.getElementById(sheetId);
    document.getElementById(btnId).addEventListener("click", function () { sheet.showModal(); });
    sheet.querySelector(".close").addEventListener("click", function () { sheet.close(); });
    sheet.addEventListener("click", function (e) { if (e.target === sheet) sheet.close(); });
  }
  wire("stubbtn", "showsheet");
  wire("hikebtn", "hikesheet");

  // Sciences Po
  document.getElementById("abroadblurb").textContent = SITE.abroad.blurb;
  // Travel map. The land is drawn in europe-map.js; pins come from content.js.
  var E = EUROPE, map = document.getElementById("map");
  function merc(a) { return Math.log(Math.tan(Math.PI / 4 + a * Math.PI / 360)); }
  function place(p) {
    return { x: (p.lon - E.lon0) * Math.PI / 180 * E.k, y: E.k * (merc(E.lat1) - merc(p.lat)) };
  }
  map.setAttribute("viewBox", "0 0 " + E.w + " " + E.h);
  var homePt = null, pins = SITE.abroad.places.map(function (p) { var q = place(p); q.p = p; if (p.home) homePt = q; return q; });
  map.innerHTML = '<path class="land" d="' + E.land + '"/><path class="borders" d="' + E.borders + '"/>' + pins.map(function (q, i) {
    var flipLabel = q.p.home || q.x > E.w * 0.72;
    return (homePt && q !== homePt ? '<path d="M' + homePt.x + " " + homePt.y + "L" + q.x + " " + q.y + '" fill="none" stroke="#2B2722" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/>' : "") +
      '<g class="stoppin" data-i="' + i + '" role="button" tabindex="0" aria-label="Show photos from ' + esc(q.p.name) + '"><circle class="hit" cx="' + q.x + '" cy="' + q.y + '" r="26"/><circle class="pin" cx="' + q.x + '" cy="' + q.y + '" r="' + (q.p.home ? 13 : 10) + '"/>' +
      '<text x="' + (q.x + (flipLabel ? -18 : 18)) + '" y="' + (q.y + 10) + '" text-anchor="' + (flipLabel ? "end" : "start") + '">' + esc(q.p.name) + "</text></g>";
  }).join("");
  var hint = document.getElementById("maphint"), box = document.getElementById("photos");
  function showPlace(i) {
    var p = pins[i].p, list = p.photos || [];
    map.querySelectorAll(".stoppin").forEach(function (g) { var on = Number(g.dataset.i) === i; g.classList.toggle("on", on); if (on) map.appendChild(g); });
    hint.innerHTML = p.home ? "Click on the other pins to see where I traveled while abroad!" : "<b>" + esc(p.name) + "</b>" + (p.when ? ", " + esc(p.when) : "");
    box.innerHTML = list.length ? list.map(function (f) {
      return '<figure class="fade"><img src="' + esc(f.photo) + '" alt="' + esc(f.caption || p.name) + '">' + (f.caption ? "<figcaption>" + esc(f.caption) + "</figcaption>" : "") + "</figure>";
    }).join("") : '<div class="blank">Photo soon</div><div class="blank">Photo soon</div><div class="blank">Photo soon</div>';
  }
  map.querySelectorAll(".stoppin").forEach(function (g) {
    var go = function () { showPlace(Number(g.dataset.i)); };
    g.addEventListener("click", go);
    g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  showPlace(Math.max(0, pins.findIndex(function (q) { return q.p.home; })));

  // BEACN
  document.getElementById("beacnblurb").textContent = SITE.beacn.blurb;
  var proj = function (p) { return "<li><b>" + esc(p.client) + "</b>" + (p.when ? " <small>" + esc(p.when) + "</small>" : "") + "<br>" + esc(p.what) + "</li>"; };
  document.getElementById("beacnnow").innerHTML = proj(SITE.beacn.current);
  document.getElementById("beacnpast").innerHTML = SITE.beacn.past.map(proj).join("");

  // Music
  document.getElementById("tapes").innerHTML = SITE.music.length ? SITE.music.map(function (t) {
    var player = t.youtube
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(t.youtube) + '" title="' + esc(t.title) + '" loading="lazy" allowfullscreen></iframe>'
      : '<video controls preload="none" src="' + esc(t.file) + '"' + (t.poster ? ' poster="' + esc(t.poster) + '"' : "") + "></video>";
    return '<figure class="tape">' + player + caption(t) + "</figure>";
  }).join("") : '<div class="soon"><svg viewBox="0 0 160 120" aria-hidden="true"><circle cx="50" cy="78" r="30"/><circle cx="50" cy="78" r="5"/><path d="M76 62 150 22M142 14l12 16M60 96h-20M72 72l6-3"/></svg><p>Clips on the way.</p></div>';

  // Ceramics
  var shelf = document.getElementById("shelf");
  if (SITE.ceramics.length) {
    shelf.className = "shelf carousel";
    shelf.setAttribute("tabindex", "0");
    shelf.setAttribute("aria-roledescription", "carousel");
    shelf.setAttribute("aria-label", "Ceramics photos. Use the arrows to see the next one");
    shelf.innerHTML = '<div class="slides">' + SITE.ceramics.map(function (c, i) {
      return '<figure class="slide' + (i ? "" : " on") + '"><img src="' + esc(c.photo) + '" alt="' + esc(c.title) + '"' + (i > 1 ? ' loading="lazy"' : "") + ">" + (c.note ? "<figcaption>" + esc(c.note) + "</figcaption>" : "") + "</figure>";
    }).join("") + '</div><button class="arrow a-prev" type="button" aria-label="Previous photo">&#8249;</button><button class="arrow a-next" type="button" aria-label="Next photo">&#8250;</button><p class="count" aria-live="polite"></p>';
    var slides = shelf.querySelectorAll(".slide"), at = 0, count = shelf.querySelector(".count");
    function go(n) {
      slides[at].classList.remove("on");
      at = (n + slides.length) % slides.length;
      slides[at].classList.add("on");
      count.textContent = (at + 1) + " / " + slides.length;
    }
    go(0);
    shelf.querySelector(".a-prev").addEventListener("click", function () { go(at - 1); });
    shelf.querySelector(".a-next").addEventListener("click", function () { go(at + 1); });
    shelf.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(at - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(at + 1); }
    });
    var x0 = null;
    shelf.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    shelf.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(at + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  } else {
    shelf.innerHTML = '<div class="soon"><svg viewBox="0 0 140 120" aria-hidden="true"><path d="M44 14h52M50 14c2 16-26 30-26 58 0 22 18 36 46 36s46-14 46-36c0-28-28-42-26-58"/><path d="M34 62c14 8 58 8 72 0"/></svg><p>Photos fresh out of the kiln soon.</p></div>';
  }

  // My picks
  var LABELS = { book: ["Book"], music: ["Music"], film: ["Film"] };
  document.getElementById("cards").innerHTML = Object.keys(LABELS).map(function (k) {
    var r = SITE.myRecs[k] || {};
    var name = r.link ? '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + esc(r.title) + "</a>" : esc(r.title);
    var back = r.title ? "<b>" + (r.kind ? '<em class="kind">' + esc(r.kind) + ":</em> " : "") + name + "</b>" + (r.by ? "<span>" + esc(r.by) + "</span>" : "") + (r.note ? "<i>" + esc(r.note) + "</i>" : "") : "<b>Still deciding</b>";
    return '<button class="flip" type="button" aria-pressed="false" aria-label="My ' + LABELS[k][0].toLowerCase() + ' pick"><span class="flip-in"><span class="face front">' + LABELS[k][0] + '</span><span class="face back">' + back + "</span></span></button>";
  }).join("");
  document.querySelectorAll(".flip").forEach(function (b) {
    b.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });

  // Recommendation form
  var form = document.getElementById("recform"), status = document.getElementById("recstatus");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.title.value.trim()) { status.textContent = "Add a title first."; form.title.focus(); return; }
    if (!SITE.recsEndpoint) { status.textContent = "Recommendations aren't switched on yet."; return; }
    status.textContent = "Sending...";
    fetch(SITE.recsEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        status.textContent = "Got it. Thank you!";
      })
      .catch(function () { status.textContent = "That didn't send. Try again in a minute."; });
  });

  // Everything fades in place already: the mini pages always show their content.
  document.querySelectorAll(".pop").forEach(function (el) { el.classList.add("in"); });

  // The three buttons: each section opens as its own full page.
  var widgets = [].slice.call(document.querySelectorAll(".widget"));
  var tabs = document.querySelectorAll("#tabs a:not(.tab-home):not(.shut)");
  var alias = { music: "hobbies", ceramics: "hobbies", recs: "hobbies" };
  function current() { return widgets.filter(function (w) { return w.classList.contains("open"); })[0]; }
  function shut() {
    var w = current();
    if (!w) return;
    w.classList.remove("open");
    w.scrollTop = 0;
    document.body.classList.remove("paged");
  }
  function open(w) {
    w.classList.add("open");
    w.scrollTop = 0;
    document.body.classList.add("paged");
    tabs.forEach(function (t) { t.classList.toggle("on", t.getAttribute("href") === "#" + w.dataset.page); });
  }
  // Everything here works from clicks directly, so it can't get stuck on an old link.
  function showPage(id) {
    id = alias[id] || id;
    var w = widgets.filter(function (x) { return x.dataset.page === id; })[0], was = current();
    if (w === was) return;
    if (was) shut();
    if (w) open(w);
  }
  function goPage(id) {
    showPage(id);
    try { history.pushState({ page: id }, "", id === "top" ? location.pathname + location.search : "#" + id); } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href^='#']") : null;
    if (a) {
      e.preventDefault();
      e.stopPropagation();
      var id = a.getAttribute("href").slice(1);
      goPage(id);
      return;
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && current() && !document.querySelector("dialog[open]")) goPage("top");
  });
  window.addEventListener("popstate", function () { showPage(location.hash.slice(1) || "top"); });
  // A shared link like /#school opens that page. The preview always starts at home.
  if (window.top === window.self && location.hash.length > 1) showPage(location.hash.slice(1));
})();
