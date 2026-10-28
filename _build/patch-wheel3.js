const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length;
function between(startMark, endMark, replacement, keepEnd){ const s = h.indexOf(startMark); if (s < 0) throw new Error('start missing: ' + startMark.slice(0,50)); const e = h.indexOf(endMark, s + startMark.length); if (e < 0) throw new Error('end missing: ' + endMark.slice(0,50)); h = h.slice(0, s) + replacement + (keepEnd ? h.slice(e) : h.slice(e + endMark.length)); }
function rep(a, b){ if (!h.includes(a)) throw new Error('anchor missing: ' + a.slice(0,60)); h = h.replace(a, b); }
if (h.includes('id="handle"')){ console.log('already patched'); process.exit(0); }

/* CSS additions */
rep('.pointer{fill:url(#brass);', `.wheel-box{cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
.wheel-box.dragging{cursor:grabbing}
.handle line{stroke:url(#brass);stroke-width:8;stroke-linecap:round}
.handle .shadow{stroke:rgba(0,0,0,.35);stroke-width:10;stroke-linecap:round;transform:translate(1px,3px)}
.handle circle{fill:url(#brass);stroke:#3f2a1f;stroke-width:1.2}
.handle .knob{filter:url(#pshadow)}
.handle .dot{fill:#3f2a1f;stroke:none}
.wheel-hint{margin-top:16px;text-align:center;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute)}
html[dir="rtl"] .wheel-hint{letter-spacing:0}
.pointer{fill:url(#brass);`);

/* HTML: handle inside the rotating group + lenis prevent + hint under the wheel */
rep('<div class="wheel-box wheel reveal" id="wheel">', '<div class="wheel-box wheel reveal" id="wheel" data-lenis-prevent>');
rep('<g id="pegs"></g>', '<g id="pegs"></g>\n          <g id="handle" class="handle"><line class="shadow" x1="300" y1="228" x2="300" y2="98"/><line x1="300" y1="228" x2="300" y2="98"/><circle class="knob" cx="300" cy="232" r="13"/><circle class="dot" cx="300" cy="232" r="4"/></g>');
between('      </svg>\n    </div>\n  </div>\n</section>', '</section>', `      </svg>
      <p class="wheel-hint" data-i18n="wheel.drag">Kolu tut, çevir, bırak</p>
    </div>
  </div>
`, true);

/* i18n: drag hint per language (append after hint) */
const D = { 'Çevir\'e bas':'Kolu tut, çevir, bırak', 'Press Spin':'Grab the handle, spin, let go', 'Auf Drehen tippen':'Griff fassen, drehen, loslassen', 'Appuyez sur Tourner':'Saisissez la manivelle, tournez, lâchez', 'اضغط أدِر':'أمسك المقبض، أدِر، اترك', 'Pulsa Girar':'Agarra la manivela, gira, suelta', 'Нажмите «Крутить»':'Возьмитесь за ручку, крутите, отпустите' };
for (const [k, v] of Object.entries(D)){ rep('"hint":' + JSON.stringify(k) + '}', '"hint":' + JSON.stringify(v) + ',"drag":' + JSON.stringify(v) + '}'); }

/* JS: replace the wheel block with the hand-spun version */
between('/* ---------- Nostalgic wheel of chance ---------- */', '/* ---------- Categories hover images ---------- */', `/* ---------- Nostalgic wheel of chance (hand-spun) ---------- */
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
  function randomTitle(){ return pieces[Math.floor(Math.random() * pieces.length)].t; }
  function candidates(w){ if (w.y) return pieces.filter(function(p){ return w.y.indexOf(+p.d.slice(0,4)) >= 0; }); if (w.g === 'ceviri') return pieces.filter(function(p){ return p.tr || p.g === 'ceviri'; }); if (w.g === 'sanat') return pieces.filter(function(p){ return /sanat|ebru|kaligrafi|resim|tezhip|gorsel|fotograf/.test(p.g); }); return pieces.filter(function(p){ return p.g === w.g; }); }
  window.__renderWheel = function(){ build(); if (mode === 'idle' && !pick) cur.textContent = I18N[current].wheel.hint; if (today) document.getElementById('todayMeta').textContent = meta(today); if (pick){ document.getElementById('resMeta').textContent = meta(pick); btnSpin.textContent = I18N[current].wheel.again; } };
  if ('IntersectionObserver' in window){ new IntersectionObserver(function(e, o){ if (e[0].isIntersecting){ load(); o.disconnect(); } }, { rootMargin: '600px' }).observe(box); } else load();

  /* motion: idle drift, drag, free spin with ease-out */
  var angle = 0, mode = 'idle', t0 = 0, a0 = 0, aEnd = 0, dur = 0, lastTick = 0, gap = 70, lastWedge = -1;
  function wedgeAt(a){ var top = (360 - (a % 360) + 360) % 360; return Math.floor(top / STEP) % N; }
  function setAngle(a){ angle = a; rot.setAttribute('transform', 'rotate(' + (((a % 360) + 360) % 360) + ' 300 300)'); var idx = wedgeAt(a); if (idx !== lastWedge){ lastWedge = idx; pointer.classList.remove('tap'); void pointer.getBBox(); pointer.classList.add('tap'); } }
  function frame(t){
    if (mode === 'spin'){ var k = Math.min(1, (t - t0) / dur); var e = 1 - Math.pow(1 - k, 3); setAngle(a0 + (aEnd - a0) * e); if (pieces && t - lastTick > gap){ lastTick = t; gap = Math.min(800, 70 + 900 * k * k); cur.textContent = randomTitle(); } if (k >= 1){ mode = 'idle'; reveal(); } }
    else if (mode === 'idle'){ setAngle(angle + 0.02); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function launch(omega){ /* omega: degrees per second, sign = direction */
    var T = 8 + 2 * Math.min(1, Math.abs(omega) / 1200); var dist = Math.abs(omega) * T / 3; if (dist < 540) dist = 540 + Math.random() * 360;
    a0 = angle; aEnd = angle + (omega < 0 ? -dist : dist); dur = T * 1000; t0 = performance.now(); mode = 'spin'; gap = 70; lastTick = 0;
    box.classList.add('spinning'); res.classList.remove('show'); btnStop.disabled = false; btnSpin.disabled = true;
  }
  function stopEarly(){ if (mode !== 'spin') return; var t = performance.now(); var k = Math.min(1, (t - t0) / dur); var v = 3 * (aEnd - a0) * Math.pow(1 - k, 2) / dur; var T = 1800; a0 = angle; aEnd = angle + v * T / 3; dur = T; t0 = t; btnStop.disabled = true; }
  function reveal(){
    box.classList.remove('spinning'); var j = wedgeAt(angle); var list = pieces ? candidates(WEDGES[j]) : []; if (!list.length) list = pieces || [];
    if (!list.length){ btnSpin.disabled = false; return; }
    pick = list[Math.floor(Math.random() * list.length)];
    cur.textContent = pick.t; document.getElementById('resTitle').textContent = pick.t; document.getElementById('resMeta').textContent = meta(pick); document.getElementById('resLink').href = pick.u; res.classList.add('show');
    btnSpin.disabled = false; btnStop.disabled = true; btnSpin.textContent = I18N[current].wheel.again; btnSpin.dataset.i18n = 'wheel.again';
  }
  btnSpin.addEventListener('click', function(){ load().then(function(){ if (mode === 'idle') launch(900 + Math.random() * 500); }); });
  btnStop.addEventListener('click', stopEarly);

  /* hand spin: grab anywhere on the wheel, drag in any direction, let go */
  var drag = null;
  function pAngle(ev){ var b = box.getBoundingClientRect(); return Math.atan2(ev.clientY - (b.top + b.height / 2), ev.clientX - (b.left + b.width / 2)) * 180 / Math.PI; }
  box.addEventListener('pointerdown', function(ev){ if (ev.button) return; ev.preventDefault(); load(); try{ box.setPointerCapture(ev.pointerId); }catch(e){} mode = 'drag'; box.classList.add('dragging', 'spinning'); res.classList.remove('show'); btnStop.disabled = true; drag = { last: pAngle(ev), samples: [[performance.now(), angle]] }; });
  box.addEventListener('pointermove', function(ev){ if (mode !== 'drag' || !drag) return; var a = pAngle(ev), d = a - drag.last; if (d > 180) d -= 360; if (d < -180) d += 360; drag.last = a; setAngle(angle + d); var now = performance.now(); drag.samples.push([now, angle]); while (drag.samples.length > 2 && now - drag.samples[0][0] > 140) drag.samples.shift(); if (pieces && now - lastTick > 90 && Math.abs(d) > .5){ lastTick = now; cur.textContent = randomTitle(); } });
  function endDrag(){ if (mode !== 'drag') return; box.classList.remove('dragging'); var s = drag.samples, omega = 0; if (s.length > 1){ var dt = (s[s.length - 1][0] - s[0][0]) / 1000; if (dt > 0.016) omega = (s[s.length - 1][1] - s[0][1]) / dt; } drag = null; omega = Math.max(-2400, Math.min(2400, omega)); if (Math.abs(omega) > 90){ mode = 'spin'; dur = 1e9; t0 = performance.now(); a0 = aEnd = angle; load().then(function(){ launch(omega); }); } else { mode = 'idle'; box.classList.remove('spinning'); } }
  box.addEventListener('pointerup', endDrag); box.addEventListener('pointercancel', endDrag); box.addEventListener('lostpointercapture', endDrag);
  build(); cur.textContent = I18N[current].wheel.hint;
})();

`, true);
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length);
