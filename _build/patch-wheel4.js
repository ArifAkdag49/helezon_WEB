const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length;
function between(startMark, endMark, replacement, keepEnd){ const s = h.indexOf(startMark); if (s < 0) throw new Error('start missing: ' + startMark.slice(0,50)); const e = h.indexOf(endMark, s + startMark.length); if (e < 0) throw new Error('end missing: ' + endMark.slice(0,50)); h = h.slice(0, s) + replacement + (keepEnd ? h.slice(e) : h.slice(e + endMark.length)); }
function rep(a, b){ if (!h.includes(a)) throw new Error('anchor missing: ' + a.slice(0,60)); h = h.replace(a, b); }
if (h.includes('id="hubStop"')){ console.log('already patched'); process.exit(0); }

/* HTML: remove bottom buttons, add the hub stop button */
between('      <div class="wheel-btns reveal">', '</div>\n      <p class="ticker" id="wheelCur">…</p>', '      <p class="ticker" id="wheelCur">…</p>', false);
rep('      </svg>\n      <p class="wheel-hint" data-i18n="wheel.drag">', '      </svg>\n      <button class="hub-btn" id="hubStop" type="button" data-i18n="wheel.stop">Durdur</button>\n      <p class="wheel-hint" data-i18n="wheel.drag">');

/* CSS */
rep('.wheel-hint{', `.hub-btn{position:absolute;left:50%;top:50%;width:19%;aspect-ratio:1;transform:translate(-50%,-50%) scale(.85);border-radius:50%;background:radial-gradient(circle at 35% 30%,#e6cb92,#b8925a 60%,#7d5f36);border:1.5px solid #3f2a1f;box-shadow:0 6px 14px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.35);font-family:"Cormorant Garamond",serif;font-weight:500;font-size:clamp(11px,1.15vw,15px);letter-spacing:.2em;text-transform:uppercase;color:#2b1d15;opacity:0;pointer-events:none;transition:opacity .5s var(--ease),transform .5s var(--ease);z-index:3;cursor:pointer}
.wheel.free .hub-btn{opacity:1;pointer-events:auto;transform:translate(-50%,-50%) scale(1)}
.hub-btn:hover{background:radial-gradient(circle at 35% 30%,#f0d9a6,#c49f66 60%,#7d5f36)}
.hub-btn:active{transform:translate(-50%,-50%) scale(.96)}
html[dir="rtl"] .hub-btn{letter-spacing:0}
.wheel-hint{`);

/* i18n: Turkish stop label */
rep('"stop":"Dur"', '"stop":"Durdur"');

/* JS */
between('/* ---------- Nostalgic wheel of chance (hand-spun) ---------- */', '/* ---------- Categories hover images ---------- */', `/* ---------- Nostalgic wheel of chance (hand-spun, hub stop) ---------- */
(function(){
  var box = document.getElementById('wheel'); if (!box) return;
  var NS = 'http://www.w3.org/2000/svg';
  var rot = document.getElementById('wheelRot'), wedgesG = document.getElementById('wedges'), labelsG = document.getElementById('wedgeLabels'), pegsG = document.getElementById('pegs'), cur = document.getElementById('wheelCur');
  var hubStop = document.getElementById('hubStop'), res = document.getElementById('wheelResult'), pointer = document.getElementById('pointer');
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
  window.__renderWheel = function(){ build(); if (mode === 'idle' && !pick) cur.textContent = I18N[current].wheel.hint; if (today) document.getElementById('todayMeta').textContent = meta(today); if (pick) document.getElementById('resMeta').textContent = meta(pick); };
  if ('IntersectionObserver' in window){ new IntersectionObserver(function(e, o){ if (e[0].isIntersecting){ load(); o.disconnect(); } }, { rootMargin: '600px' }).observe(box); } else load();

  /* motion: idle drift, drag, free spin (slow decay) until the hub button is pressed */
  var angle = 0, mode = 'idle', t0 = 0, a0 = 0, aEnd = 0, dur = 0, lastTick = 0, gap = 70, lastWedge = -1, autoTimer = null;
  function wedgeAt(a){ var top = (360 - (a % 360) + 360) % 360; return Math.floor(top / STEP) % N; }
  function setAngle(a){ angle = a; rot.setAttribute('transform', 'rotate(' + (((a % 360) + 360) % 360) + ' 300 300)'); var idx = wedgeAt(a); if (idx !== lastWedge){ lastWedge = idx; pointer.classList.remove('tap'); void pointer.getBBox(); pointer.classList.add('tap'); } }
  function frame(t){
    if (mode === 'spin'){ var k = Math.min(1, (t - t0) / dur); var e = 1 - Math.pow(1 - k, 3); setAngle(a0 + (aEnd - a0) * e); if (pieces && t - lastTick > gap){ lastTick = t; gap = Math.min(800, 70 + 900 * k * k); cur.textContent = randomTitle(); } if (k >= 1){ mode = 'idle'; reveal(); } }
    else if (mode === 'idle'){ setAngle(angle + 0.02); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function launch(omega){ /* omega: degrees per second; keeps turning slowly for up to ~16 s, the hub button stops it */
    var T = 16; var dist = Math.abs(omega) * T / 3; if (dist < 900) dist = 900 + Math.random() * 360;
    a0 = angle; aEnd = angle + (omega < 0 ? -dist : dist); dur = T * 1000; t0 = performance.now(); mode = 'spin'; gap = 70; lastTick = 0;
    box.classList.add('spinning', 'free'); res.classList.remove('show');
    clearTimeout(autoTimer); autoTimer = setTimeout(function(){ if (mode === 'spin') brake(); }, 11000);
  }
  function brake(){ if (mode !== 'spin') return; var t = performance.now(); var k = Math.min(1, (t - t0) / dur); var v = 3 * (aEnd - a0) * Math.pow(1 - k, 2) / dur; var T = 2200; a0 = angle; aEnd = angle + v * T / 3; dur = T; t0 = t; box.classList.remove('free'); clearTimeout(autoTimer); }
  function reveal(){
    box.classList.remove('spinning', 'free'); var j = wedgeAt(angle); var list = pieces ? candidates(WEDGES[j]) : []; if (!list.length) list = pieces || [];
    if (!list.length) return;
    pick = list[Math.floor(Math.random() * list.length)];
    cur.textContent = pick.t; document.getElementById('resTitle').textContent = pick.t; document.getElementById('resMeta').textContent = meta(pick); document.getElementById('resLink').href = pick.u; res.classList.add('show');
  }
  hubStop.addEventListener('click', function(ev){ ev.stopPropagation(); brake(); });
  hubStop.addEventListener('pointerdown', function(ev){ ev.stopPropagation(); });

  /* hand spin: grab the handle or the wheel, drag in any direction, let go */
  var drag = null;
  function pAngle(ev){ var b = box.getBoundingClientRect(); return Math.atan2(ev.clientY - (b.top + b.height / 2), ev.clientX - (b.left + b.width / 2)) * 180 / Math.PI; }
  box.addEventListener('pointerdown', function(ev){ if (ev.button || ev.target.closest('.hub-btn')) return; ev.preventDefault(); load(); if (mode === 'spin'){ clearTimeout(autoTimer); } try{ box.setPointerCapture(ev.pointerId); }catch(e){} mode = 'drag'; box.classList.add('dragging', 'spinning'); box.classList.remove('free'); res.classList.remove('show'); drag = { last: pAngle(ev), samples: [[performance.now(), angle]] }; });
  box.addEventListener('pointermove', function(ev){ if (mode !== 'drag' || !drag) return; var a = pAngle(ev), d = a - drag.last; if (d > 180) d -= 360; if (d < -180) d += 360; drag.last = a; setAngle(angle + d); var now = performance.now(); drag.samples.push([now, angle]); while (drag.samples.length > 2 && now - drag.samples[0][0] > 140) drag.samples.shift(); if (pieces && now - lastTick > 90 && Math.abs(d) > .5){ lastTick = now; cur.textContent = randomTitle(); } });
  function endDrag(){ if (mode !== 'drag') return; box.classList.remove('dragging'); var s = drag.samples, omega = 0; if (s.length > 1){ var dt = (s[s.length - 1][0] - s[0][0]) / 1000; if (dt > 0.016) omega = (s[s.length - 1][1] - s[0][1]) / dt; } drag = null; omega = Math.max(-2400, Math.min(2400, omega)); if (Math.abs(omega) > 90){ mode = 'spin'; dur = 1e9; t0 = performance.now(); a0 = aEnd = angle; load().then(function(){ launch(omega); }); } else { mode = 'idle'; box.classList.remove('spinning', 'free'); } }
  box.addEventListener('pointerup', endDrag); box.addEventListener('pointercancel', endDrag); box.addEventListener('lostpointercapture', endDrag);
  build(); cur.textContent = I18N[current].wheel.hint;
})();

`, true);
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length);
