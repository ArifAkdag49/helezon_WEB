const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length;
function between(startMark, endMark, replacement, keepEnd){ const s = h.indexOf(startMark); if (s < 0) throw new Error('start missing: ' + startMark.slice(0,50)); const e = h.indexOf(endMark, s + startMark.length); if (e < 0) throw new Error('end missing: ' + endMark.slice(0,50)); h = h.slice(0, s) + replacement + (keepEnd ? h.slice(e) : h.slice(e + endMark.length)); }
function rep(a, b){ if (!h.includes(a)) throw new Error('anchor missing: ' + a.slice(0,60)); h = h.replace(a, b); }
if (h.includes('id="wheelRot"')){ console.log('already patched'); process.exit(0); }

/* CSS: replace wheel rules */
between('/* ---------- Wheel ---------- */', '.result{', `/* ---------- Nostalgic wheel ---------- */
.wheel-sec{background:#e8dcc4;overflow:hidden;position:relative}
.wheel-sec::before{content:"";position:absolute;inset:0;opacity:.35;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .22 0 0 0 0 .12 0 0 0 .18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.wheel-sec .wrap{position:relative}
.wheel-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,90px);align-items:center}
.wheel-copy h2{font-size:clamp(44px,6vw,96px);line-height:.95;margin-top:16px}
.wheel-copy .lead{margin-top:20px;font-family:var(--serif);font-style:italic;font-size:clamp(20px,2vw,28px);line-height:1.3;color:var(--ink-2);max-width:28ch}
.wheel-btns{margin-top:30px;display:flex;gap:12px;flex-wrap:wrap}
.wheel-btns .btn[disabled]{opacity:.35;pointer-events:none}
.ticker{margin-top:22px;min-height:2.6em;font-family:var(--serif);font-style:italic;font-size:clamp(19px,1.8vw,26px);line-height:1.25;color:var(--ink-2);max-width:30ch}
.wheel-box{position:relative;aspect-ratio:1;max-width:560px;width:100%;margin-inline:auto;filter:drop-shadow(0 30px 40px rgba(43,29,21,.35))}
.wheel-svg{width:100%;height:100%;overflow:visible;display:block}
.rim{fill:none;stroke:#3f2a1f;stroke-width:16}
.rim-hi{fill:none;stroke:#6b4a35;stroke-width:3;opacity:.7}
.rim-line{fill:none;stroke:#b8925a;stroke-width:1.5;opacity:.9}
.wedge{stroke:#3f2a1f;stroke-opacity:.35;stroke-width:1}
.wedge.a{fill:#f1e7d2}.wedge.b{fill:#e5d7ba}.wedge.yr{fill:#d8c5a0}
.rings circle{fill:none;stroke:#3f2a1f;stroke-opacity:.28;stroke-width:.8;stroke-dasharray:2 3}
.wlabel{font-family:"Cormorant Garamond",serif;font-weight:500;font-size:20px;letter-spacing:.12em;text-transform:uppercase;fill:#2b1d15}
.wlabel.yr{font-size:22px;fill:#6e1f2a}
html[dir="rtl"] .wlabel{letter-spacing:0;font-family:"Amiri",serif}
#pegs circle{fill:url(#brass);stroke:#3f2a1f;stroke-width:.8}
.hub-out{fill:#3f2a1f}
.hub-spiral{fill:none;stroke:#2b1d15;stroke-width:1;opacity:.75}
.hub-text{font-family:"Cormorant Garamond",serif;font-size:9.5px;letter-spacing:.32em;text-transform:uppercase;fill:#2b1d15;opacity:.8}
.pointer{fill:url(#brass);stroke:#3f2a1f;stroke-width:1.2;transform-box:fill-box;transform-origin:50% 0}
.pointer.tap{animation:ptap .16s ease-out}
@keyframes ptap{40%{transform:rotate(-9deg)}100%{transform:rotate(0)}}
`, true);

/* HTML: replace the wheel box */
between('<div class="wheel-box wheel reveal" id="wheel">', '</section>', `<div class="wheel-box wheel reveal" id="wheel">
      <svg class="wheel-svg" viewBox="0 0 600 600" aria-hidden="true">
        <defs>
          <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .2 0 0 0 0 .15 0 0 0 0 .1 0 0 0 .5 0"/></filter>
          <radialGradient id="vign" cx="50%" cy="50%" r="50%"><stop offset="62%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".22"/></radialGradient>
          <radialGradient id="brass" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#e6cb92"/><stop offset=".6" stop-color="#b8925a"/><stop offset="1" stop-color="#7d5f36"/></radialGradient>
          <clipPath id="wclip"><circle cx="300" cy="300" r="262"/></clipPath>
          <filter id="pshadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity=".4"/></filter>
          <path id="hubRing" d="M300,300 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"/>
        </defs>
        <circle class="rim" cx="300" cy="300" r="270"/>
        <circle class="rim-hi" cx="300" cy="300" r="276"/>
        <circle class="rim-line" cx="300" cy="300" r="262"/>
        <g id="wheelRot" transform="rotate(0 300 300)">
          <g id="wedges"></g>
          <g class="rings"><circle cx="300" cy="300" r="236"/><circle cx="300" cy="300" r="72"/></g>
          <g id="wedgeLabels"></g>
          <g id="pegs"></g>
          <rect x="30" y="30" width="540" height="540" filter="url(#grain)" clip-path="url(#wclip)" opacity=".28"/>
        </g>
        <circle cx="300" cy="300" r="262" fill="url(#vign)" pointer-events="none"/>
        <g class="hub"><circle cx="300" cy="300" r="64" class="hub-out"/><circle cx="300" cy="300" r="54" fill="url(#brass)"/><path id="hubSpiral" d="" class="hub-spiral"/><text class="hub-text"><textPath href="#hubRing" startOffset="6%">Helezon · MMXXI</textPath></text></g>
        <path id="pointer" class="pointer" d="M287 12 h26 l-13 46 z" filter="url(#pshadow)"/>
      </svg>
    </div>
  </div>
`, true);

/* ticker under the buttons */
rep('<button class="btn wine" id="wheelStop" disabled data-i18n="wheel.stop">Dur</button>\n      </div>', '<button class="btn wine" id="wheelStop" disabled data-i18n="wheel.stop">Dur</button>\n      </div>\n      <p class="ticker" id="wheelCur">…</p>');

/* JS: replace the wheel block */
between('/* ---------- Ring words + wheel of chance ---------- */', '/* ---------- Categories hover images ---------- */', `/* ---------- Nostalgic wheel of chance ---------- */
(function(){
  var box = document.getElementById('wheel'); if (!box) return;
  var NS = 'http://www.w3.org/2000/svg';
  var rot = document.getElementById('wheelRot'), wedgesG = document.getElementById('wedges'), labelsG = document.getElementById('wedgeLabels'), pegsG = document.getElementById('pegs'), cur = document.getElementById('wheelCur');
  var btnSpin = document.getElementById('wheelSpin'), btnStop = document.getElementById('wheelStop'), res = document.getElementById('wheelResult'), pointer = document.getElementById('pointer');
  var WEDGES = [ {g:'siir',k:'cats.poetry'},{g:'hikaye',k:'cats.stories'},{y:[2021,2022],t:'2021 · 22'},{g:'deneme',k:'cats.essays'},{g:'biyografi',k:'cats.biography'},{y:[2023],t:'2023'},{g:'ceviri',k:'cats.translation'},{g:'sanat',k:'cats.art'},{y:[2024],t:'2024'},{g:'roportaj',k:'cat.interview'},{g:'makale',k:'cat.article'},{y:[2025],t:'2025'} ];
  var N = WEDGES.length, STEP = 360 / N, CX = 300, CY = 300, R = 254, r = 66;
  document.getElementById('hubSpiral').setAttribute('d', spiralPath(300, 300, 3.5, 30, 260));
  function pt(rad, a){ var t = (a - 90) * Math.PI / 180; return (CX + rad * Math.cos(t)).toFixed(1) + ' ' + (CY + rad * Math.sin(t)).toFixed(1); }
  function build(){
    var d = I18N[current]; wedgesG.innerHTML = ''; labelsG.innerHTML = ''; pegsG.innerHTML = '';
    WEDGES.forEach(function(w, i){
      var s = i * STEP, e = s + STEP;
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', 'M' + pt(R, s) + ' A' + R + ' ' + R + ' 0 0 1 ' + pt(R, e) + ' L' + pt(r, e) + ' A' + r + ' ' + r + ' 0 0 0 ' + pt(r, s) + ' Z');
      p.setAttribute('class', 'wedge ' + (i % 2 ? 'b' : 'a') + (w.y ? ' yr' : '')); wedgesG.appendChild(p);
      var t = document.createElementNS(NS, 'text'); t.setAttribute('x', CX); t.setAttribute('y', CY - R + 36); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('transform', 'rotate(' + (s + STEP / 2) + ' ' + CX + ' ' + CY + ')'); t.setAttribute('class', 'wlabel' + (w.y ? ' yr' : ''));
      t.textContent = w.y ? w.t : get(d, w.k); labelsG.appendChild(t);
      var c = document.createElementNS(NS, 'circle'); var xy = pt(270, s).split(' '); c.setAttribute('cx', xy[0]); c.setAttribute('cy', xy[1]); c.setAttribute('r', 4.5); pegsG.appendChild(c);
    });
  }
  var GMAP = { siir:'poetry', hikaye:'story', deneme:'essay', makale:'article', biyografi:'biography', ceviri:'translation', fotograf:'photo', roportaj:'interview', editorden:'editorial' };
  var pieces = null, loading = null, pick = null, today = null;
  function label(p){ var d = I18N[current]; var k = GMAP[p.g]; if (k && d.cat[k]) return d.cat[k]; if (/sanat|ebru|kaligrafi|resim|tezhip|gorsel/.test(p.g)) return d.cats.art; return p.gn; }
  function meta(p){ var d = I18N[current]; var m = +p.d.slice(5,7); return p.a + ' · ' + label(p) + ' · ' + d.issue.no + ' ' + p.n + ' · ' + d.months[m-1] + ' ' + p.d.slice(0,4); }
  function load(){ if (!loading) loading = fetch('/data/pieces.json').then(function(x){ return x.json(); }).then(function(d){ pieces = d; renderToday(); return d; }); return loading; }
  function renderToday(){ if (!pieces) return; var poems = pieces.filter(function(p){ return p.g === 'siir'; }); var day = Math.floor(Date.now() / 864e5); today = poems[(day * 7919) % poems.length]; document.getElementById('todayTitle').textContent = today.t; document.getElementById('todayMeta').textContent = meta(today); document.getElementById('todayLink').href = today.u; document.getElementById('today').hidden = false; }
  window.__renderWheel = function(){ build(); if (!spinning && !stopping && !pick) cur.textContent = I18N[current].wheel.hint; if (today) document.getElementById('todayMeta').textContent = meta(today); if (pick){ document.getElementById('resMeta').textContent = meta(pick); btnSpin.textContent = I18N[current].wheel.again; } };
  if ('IntersectionObserver' in window){ new IntersectionObserver(function(e, o){ if (e[0].isIntersecting){ load(); o.disconnect(); } }, { rootMargin: '600px' }).observe(box); } else load();
  var angle = 0, spinning = false, stopping = false, t0 = 0, a0 = 0, aEnd = 0, dur = 0, lastTick = 0, gap = 70, lastWedge = -1, timer = null;
  function wedgeAt(a){ var top = (360 - (a % 360) + 360) % 360; return Math.floor(top / STEP) % N; }
  function setAngle(a){ angle = a; rot.setAttribute('transform', 'rotate(' + (a % 360) + ' 300 300)'); var idx = wedgeAt(a); if (idx !== lastWedge){ lastWedge = idx; pointer.classList.remove('tap'); void pointer.getBBox(); pointer.classList.add('tap'); } }
  function frame(t){
    if (spinning){ setAngle(angle + 9); if (pieces && t - lastTick > gap){ lastTick = t; cur.textContent = pieces[Math.floor(Math.random() * pieces.length)].t; } }
    else if (stopping){ var k = Math.min(1, (t - t0) / dur); var e = 1 - Math.pow(1 - k, 3); setAngle(a0 + (aEnd - a0) * e); if (pieces && t - lastTick > gap){ lastTick = t; gap = Math.min(800, 70 + 900 * k * k); cur.textContent = pieces[Math.floor(Math.random() * pieces.length)].t; } if (k >= 1){ stopping = false; reveal(); } }
    else { setAngle(angle + 0.02); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function candidates(w){ if (w.y) return pieces.filter(function(p){ return w.y.indexOf(+p.d.slice(0,4)) >= 0; }); if (w.g === 'ceviri') return pieces.filter(function(p){ return p.tr || p.g === 'ceviri'; }); if (w.g === 'sanat') return pieces.filter(function(p){ return /sanat|ebru|kaligrafi|resim|tezhip|gorsel|fotograf/.test(p.g); }); return pieces.filter(function(p){ return p.g === w.g; }); }
  function start(){ load().then(function(){ spinning = true; stopping = false; gap = 70; box.classList.add('spinning'); res.classList.remove('show'); btnStop.disabled = false; btnSpin.disabled = true; clearTimeout(timer); timer = setTimeout(function(){ if (spinning) stop(); }, 6000); }); }
  function stop(){ if (!spinning) return; spinning = false; stopping = true; var j = Math.floor(Math.random() * N); var list = candidates(WEDGES[j]); if (!list.length) list = pieces; pick = list[Math.floor(Math.random() * list.length)]; var targetMod = (360 - (j * STEP + STEP / 2) + 360) % 360; var delta = (targetMod - (angle % 360) + 360) % 360; a0 = angle; aEnd = angle + 3 * 360 + delta + (Math.random() * 14 - 7); dur = 4200 + Math.random() * 800; t0 = performance.now(); btnStop.disabled = true; }
  function reveal(){ box.classList.remove('spinning'); cur.textContent = pick.t; document.getElementById('resTitle').textContent = pick.t; document.getElementById('resMeta').textContent = meta(pick); document.getElementById('resLink').href = pick.u; res.classList.add('show'); btnSpin.disabled = false; btnSpin.textContent = I18N[current].wheel.again; btnSpin.dataset.i18n = 'wheel.again'; }
  btnSpin.addEventListener('click', start); btnStop.addEventListener('click', stop);
  build(); cur.textContent = I18N[current].wheel.hint;
})();

`, true);
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length);
