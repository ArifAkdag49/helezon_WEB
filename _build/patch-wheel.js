const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length; let fails = 0;
function rep(anchor, replacement){ if (!h.includes(anchor)){ console.log('ANCHOR MISSING:', anchor.slice(0, 70)); fails++; return; } h = h.replace(anchor, replacement); }
if (h.includes('id="wheel"')){ console.log('already patched'); process.exit(0); }

/* 1. CSS */
const CSS = `
/* ---------- Genre strip ---------- */
.strip{background:var(--ivory);border-bottom:1px solid var(--line)}
.strip .wrap{display:flex;align-items:center;gap:clamp(18px,3vw,44px);padding-block:18px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.strip .wrap::-webkit-scrollbar{display:none}
.strip .lbl{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute);white-space:nowrap;flex:none}
.strip a{font-family:var(--serif);font-size:clamp(20px,1.7vw,26px);white-space:nowrap;display:inline-flex;align-items:baseline;gap:8px;border-bottom:1px solid transparent;transition:border-color .4s,color .4s}
.strip a:hover{border-color:var(--wine);color:var(--wine)}
.strip a small{font-family:var(--sans);font-size:10px;letter-spacing:.12em;color:var(--mute)}
/* ---------- Scroll cue ---------- */
.scroll-cue{bottom:26px;gap:10px;text-align:center}
.scroll-cue .cue-text{font-family:var(--serif);font-style:italic;font-size:clamp(18px,1.7vw,24px);letter-spacing:0;text-transform:none;color:rgba(247,243,236,.96);line-height:1.2}
.scroll-cue .cue-small{font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:rgba(247,243,236,.7)}
.scroll-cue i{height:60px;width:1px}
.scroll-cue b{display:block;width:8px;height:8px;border:1px solid rgba(247,243,236,.9);transform:rotate(45deg);margin-top:-2px;animation:cueDot 2.6s var(--ease) infinite}
@keyframes cueDot{0%,100%{transform:rotate(45deg) translate(0,0);opacity:.55}50%{transform:rotate(45deg) translate(4px,4px);opacity:1}}
/* ---------- Wheel ---------- */
.wheel-sec{background:var(--cream);overflow:hidden}
.wheel-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,90px);align-items:center}
.wheel-copy h2{font-size:clamp(44px,6vw,96px);line-height:.95;margin-top:16px}
.wheel-copy .lead{margin-top:20px;font-family:var(--serif);font-style:italic;font-size:clamp(20px,2vw,28px);line-height:1.3;color:var(--ink-2);max-width:28ch}
.wheel-btns{margin-top:30px;display:flex;gap:12px;flex-wrap:wrap}
.wheel-btns .btn[disabled]{opacity:.35;pointer-events:none}
.wheel-box{position:relative;aspect-ratio:1;max-width:560px;width:100%;margin-inline:auto}
.wheel-svg{width:100%;height:100%;overflow:visible;display:block}
.wheel-svg .ring,.wheel-svg .wheel-spiral{transform-origin:300px 300px;will-change:transform}
.ring-text{font-family:var(--sans);font-size:21px;letter-spacing:.3em;text-transform:uppercase;fill:var(--ink);font-weight:500}
html[dir="rtl"] .ring-text{letter-spacing:.05em;font-size:24px}
.ring-line{fill:none;stroke:var(--ink);stroke-opacity:.18;stroke-width:1}
.ring-line.outer{stroke-opacity:.1}
.wheel-spiral path{fill:none;stroke:var(--ink);stroke-width:.9;opacity:.32}
.needle{fill:var(--wine)}
.wheel-center{position:absolute;inset:27%;display:grid;place-items:center;text-align:center;padding:12px;border-radius:50%}
.wheel-center .cur{font-family:var(--serif);font-style:italic;font-size:clamp(17px,1.7vw,25px);line-height:1.2;color:var(--ink-2);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.wheel.spinning .wheel-center .cur{color:var(--wine)}
.result{margin-top:34px;border-top:1px solid var(--line);padding-top:24px;opacity:0;transform:translateY(10px);transition:opacity .8s var(--ease),transform .8s var(--ease);visibility:hidden}
.result.show{opacity:1;transform:none;visibility:visible}
.result .eyebrow{color:var(--wine)}
.result h3{font-size:clamp(26px,2.6vw,40px);margin-top:10px;line-height:1.08}
.result .meta{margin-top:10px;font-family:var(--serif);font-style:italic;font-size:18px;color:var(--ink-2)}
.result .btn{margin-top:18px}
.today{margin-top:34px;padding:22px 24px;background:var(--ink);color:var(--warm);display:grid;gap:6px}
.today[hidden]{display:none}
.today .eyebrow{color:#d9c39a}
.today h3{font-size:clamp(22px,2vw,30px);line-height:1.1}
.today .meta{font-family:var(--serif);font-style:italic;font-size:16px;color:rgba(247,243,236,.75)}
.today a.more{margin-top:8px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px;color:var(--warm)}
.today a.more::after{content:"";width:28px;height:1px;background:currentColor}

/* ---------- Responsive ---------- */`;
rep('\n/* ---------- Responsive ---------- */', CSS);
rep('.news-grid{grid-template-columns:1fr}\n  .footer-grid{grid-template-columns:1fr 1fr}', '.news-grid{grid-template-columns:1fr}\n  .wheel-grid{grid-template-columns:1fr}\n  .wheel-box{order:-1;max-width:440px}\n  .footer-grid{grid-template-columns:1fr 1fr}');

/* 2. HTML: cue + strip + wheel */
rep('<div class="scroll-cue"><span data-i18n="hero.scroll">Scroll</span><i></i></div>\n</section>',
`<a class="scroll-cue" href="#bolumler"><span class="cue-text" data-i18n="hero.cueText">Aşağı in, satır satır</span><span class="cue-small" data-i18n="hero.scroll">Kaydır</span><i></i><b></b></a>
</section>

<!-- ===== GENRE STRIP ===== -->
<section class="strip" id="bolumler" aria-label="Bölümler">
  <div class="wrap">
    <span class="lbl" data-i18n="cat.sections">Bölümler</span>
    <a href="/tur/siir/"><span data-i18n="cats.poetry">Şiir</span><small>266</small></a>
    <a href="/tur/hikaye/"><span data-i18n="cats.stories">Hikâye</span><small>69</small></a>
    <a href="/tur/deneme/"><span data-i18n="cats.essays">Deneme</span><small>68</small></a>
    <a href="/tur/makale/"><span data-i18n="cat.article">Makale</span><small>42</small></a>
    <a href="/tur/biyografi/"><span data-i18n="cats.biography">Biyografi</span><small>53</small></a>
    <a href="/tur/ceviri/"><span data-i18n="cats.translation">Çeviri</span><small>58</small></a>
    <a href="/tur/roportaj/"><span data-i18n="cat.interview">Röportaj</span><small>20</small></a>
    <a href="/tur/sanat/"><span data-i18n="cats.art">Sanat</span><small>147</small></a>
    <a href="/tur/editorden/"><span data-i18n="cat.editorial">Editörden</span><small>25</small></a>
    <a href="/yazilar/"><span data-i18n="issue.allPieces">Tüm yazılar</span><small>767</small></a>
  </div>
</section>

<!-- ===== WHEEL ===== -->
<section class="section wheel-sec" id="cark">
  <div class="wrap wheel-grid">
    <div class="wheel-copy">
      <p class="eyebrow reveal" data-i18n="wheel.eyebrow">Şans ve edebiyat</p>
      <h2 class="reveal" data-i18n="wheel.title">Helezon'u çevir</h2>
      <p class="lead reveal" data-i18n="wheel.copy">Şiir, hikâye, deneme, geçmiş sayılar… 767 yazı arasından bugün sana hangisi düşecek?</p>
      <div class="wheel-btns reveal">
        <button class="btn ink" id="wheelSpin" data-i18n="wheel.spin">Çevir</button>
        <button class="btn wine" id="wheelStop" disabled data-i18n="wheel.stop">Dur</button>
      </div>
      <div class="result" id="wheelResult" aria-live="polite">
        <p class="eyebrow" data-i18n="wheel.result">Bugün sana düşen</p>
        <h3 id="resTitle"></h3>
        <p class="meta" id="resMeta"></p>
        <a class="btn ink" id="resLink" href="#" data-i18n="issue.read">Oku</a>
      </div>
      <div class="today reveal" id="today" hidden>
        <p class="eyebrow" data-i18n="wheel.today">Bugünün şiiri</p>
        <h3 id="todayTitle"></h3>
        <p class="meta" id="todayMeta"></p>
        <a class="more" id="todayLink" href="#" data-i18n="issue.read">Oku</a>
      </div>
    </div>
    <div class="wheel-box wheel reveal" id="wheel">
      <svg class="wheel-svg" viewBox="0 0 600 600" aria-hidden="true">
        <defs><path id="ringPath" d="M300,300 m-252,0 a252,252 0 1,1 504,0 a252,252 0 1,1 -504,0"/></defs>
        <circle class="ring-line outer" cx="300" cy="300" r="292"/>
        <g class="ring"><text class="ring-text"><textPath href="#ringPath" id="ringText" textLength="1583" lengthAdjust="spacing"></textPath></text></g>
        <circle class="ring-line" cx="300" cy="300" r="214"/>
        <g class="wheel-spiral"><path id="wheelSpiralPath" d=""/></g>
        <path class="needle" d="M292 14 h16 l-8 24 z"/>
      </svg>
      <div class="wheel-center"><p class="cur" id="wheelCur">…</p></div>
    </div>
  </div>
</section>`);

/* 3. i18n */
const T = {
 tr:{cue:"Aşağı in, satır satır",scrollA:'scroll:"Kaydır"}',photoA:'photo:"Fotoğraf"}',cat:['Röportaj','Sanat','Editörden','Bölümler'],w:{eyebrow:"Şans ve edebiyat",title:"Helezon'u çevir",copy:"Şiir, hikâye, deneme, geçmiş sayılar… 767 yazı arasından bugün sana hangisi düşecek?",spin:"Çevir",stop:"Dur",again:"Tekrar çevir",result:"Bugün sana düşen",today:"Bugünün şiiri",past:"Geçmiş sayılar",hint:"Çevir'e bas"}},
 en:{cue:"Scroll down, line by line",scrollA:'scroll:"Scroll"}',photoA:'photo:"Photography"}',cat:['Interview','Art','Editorial','Sections'],w:{eyebrow:"Chance and literature",title:"Spin the Helezon",copy:"Poems, stories, essays, past issues… which of 767 pieces will fall to you today?",spin:"Spin",stop:"Stop",again:"Spin again",result:"Today's draw for you",today:"Poem of the day",past:"Past issues",hint:"Press Spin"}},
 de:{cue:"Weiter nach unten, Zeile für Zeile",scrollA:'scroll:"Scrollen"}',photoA:'photo:"Fotografie"}',cat:['Interview','Kunst','Editorial','Rubriken'],w:{eyebrow:"Zufall und Literatur",title:"Dreh die Helezon",copy:"Gedichte, Erzählungen, Essays, frühere Ausgaben… welcher von 767 Texten fällt heute dir zu?",spin:"Drehen",stop:"Stopp",again:"Noch einmal",result:"Heute für dich gezogen",today:"Gedicht des Tages",past:"Frühere Ausgaben",hint:"Auf Drehen tippen"}},
 fr:{cue:"Descendez, ligne après ligne",scrollA:'scroll:"Défiler"}',photoA:'photo:"Photographie"}',cat:['Entretien','Art','Éditorial','Rubriques'],w:{eyebrow:"Hasard et littérature",title:"Faites tourner la Helezon",copy:"Poèmes, nouvelles, essais, anciens numéros… lequel des 767 textes vous reviendra aujourd'hui ?",spin:"Tourner",stop:"Stop",again:"Encore une fois",result:"Ce qui vous revient aujourd'hui",today:"Le poème du jour",past:"Anciens numéros",hint:"Appuyez sur Tourner"}},
 ar:{cue:"انزل، سطرًا سطرًا",scrollA:'scroll:"مرّر"}',photoA:'photo:"تصوير"}',cat:['حوار','فن','كلمة التحرير','الأقسام'],w:{eyebrow:"الحظ والأدب",title:"أدِر الهليزون",copy:"قصائد وقصص ومقالات وأعداد سابقة… أي نص من بين 767 سيكون من نصيبك اليوم؟",spin:"أدِر",stop:"قف",again:"أدِر مجددًا",result:"من نصيبك اليوم",today:"قصيدة اليوم",past:"أعداد سابقة",hint:"اضغط أدِر"}},
 es:{cue:"Baja, línea a línea",scrollA:'scroll:"Desplázate"}',photoA:'photo:"Fotografía"}',cat:['Entrevista','Arte','Editorial','Secciones'],w:{eyebrow:"Azar y literatura",title:"Gira la Helezon",copy:"Poemas, relatos, ensayos, números pasados… ¿cuál de los 767 textos te tocará hoy?",spin:"Girar",stop:"Parar",again:"Girar de nuevo",result:"Lo que te toca hoy",today:"El poema del día",past:"Números pasados",hint:"Pulsa Girar"}},
 ru:{cue:"Листайте вниз, строка за строкой",scrollA:'scroll:"Листайте"}',photoA:'photo:"Фотография"}',cat:['Интервью','Искусство','От редакции','Разделы'],w:{eyebrow:"Случай и литература",title:"Крутите Helezon",copy:"Стихи, рассказы, эссе, прошлые номера… какой из 767 текстов выпадет вам сегодня?",spin:"Крутить",stop:"Стоп",again:"Ещё раз",result:"Выпало вам сегодня",today:"Стихотворение дня",past:"Прошлые номера",hint:"Нажмите «Крутить»"}}
};
for (const [l, t] of Object.entries(T)){
  rep(t.scrollA, t.scrollA.slice(0, -1) + ',cueText:' + JSON.stringify(t.cue) + '}');
  rep(t.photoA, t.photoA.slice(0, -1) + ',interview:' + JSON.stringify(t.cat[0]) + ',art:' + JSON.stringify(t.cat[1]) + ',editorial:' + JSON.stringify(t.cat[2]) + ',sections:' + JSON.stringify(t.cat[3]) + '},\n wheel:' + JSON.stringify(t.w));
}

/* 4. JS */
rep('renderIssue(); renderAuthors(); renderCovers();', 'renderIssue(); renderAuthors(); renderCovers(); if (window.__renderWheel) window.__renderWheel();');
const JS = `/* ---------- Ring words + wheel of chance ---------- */
function renderRing(){ var d = I18N[current]; var t = document.getElementById('ringText'); if (!t) return; var words = [d.cats.poetry, d.cats.stories, d.cats.essays, d.cat.article, d.cats.biography, d.cats.translation, d.cats.art, d.wheel.past]; t.textContent = words.join('  ·  ') + '  ·  '; }
(function(){
  var box = document.getElementById('wheel'); if (!box) return;
  document.getElementById('wheelSpiralPath').setAttribute('d', spiralPath(300, 300, 7, 196, 700));
  var ring = box.querySelector('.ring'), spiral = box.querySelector('.wheel-spiral'), cur = document.getElementById('wheelCur');
  var btnSpin = document.getElementById('wheelSpin'), btnStop = document.getElementById('wheelStop'), res = document.getElementById('wheelResult');
  var GMAP = { siir:'poetry', hikaye:'story', deneme:'essay', makale:'article', biyografi:'biography', ceviri:'translation', fotograf:'photo', roportaj:'interview', editorden:'editorial' };
  var pieces = null, loading = null, pick = null, today = null;
  var angle = 0, speed = 0.04, target = 0.04, state = 'idle', lastTick = 0, gap = 80, timer = null;
  function label(p){ var d = I18N[current]; var k = GMAP[p.g]; if (k && d.cat[k]) return d.cat[k]; if (/sanat|ebru|kaligrafi|resim|tezhip|gorsel/.test(p.g)) return d.cats.art; return p.gn; }
  function meta(p){ var d = I18N[current]; var m = +p.d.slice(5,7); return p.a + ' · ' + label(p) + ' · ' + d.issue.no + ' ' + p.n + ' · ' + d.months[m-1] + ' ' + p.d.slice(0,4); }
  function load(){ if (!loading) loading = fetch('/data/pieces.json').then(function(r){ return r.json(); }).then(function(d){ pieces = d; renderToday(); return d; }); return loading; }
  function renderToday(){ if (!pieces) return; var poems = pieces.filter(function(p){ return p.g === 'siir'; }); var day = Math.floor(Date.now() / 864e5); today = poems[(day * 7919) % poems.length]; document.getElementById('todayTitle').textContent = today.t; document.getElementById('todayMeta').textContent = meta(today); document.getElementById('todayLink').href = today.u; document.getElementById('today').hidden = false; }
  window.__renderWheel = function(){ renderRing(); if (state === 'idle' && !pick) cur.textContent = I18N[current].wheel.hint; if (today) document.getElementById('todayMeta').textContent = meta(today); if (pick){ document.getElementById('resMeta').textContent = meta(pick); btnSpin.textContent = I18N[current].wheel.again; } };
  if ('IntersectionObserver' in window){ new IntersectionObserver(function(e, o){ if (e[0].isIntersecting){ load(); o.disconnect(); } }, { rootMargin: '600px' }).observe(box); } else load();
  function frame(t){
    speed += (target - speed) * (state === 'spinning' ? 0.05 : 0.025);
    angle = (angle + speed) % 360;
    ring.style.transform = 'rotate(' + angle + 'deg)'; spiral.style.transform = 'rotate(' + (-angle * 0.6) + 'deg)';
    if (state !== 'idle' && pieces && t - lastTick > gap){ lastTick = t; cur.textContent = pieces[Math.floor(Math.random() * pieces.length)].t; gap = state === 'stopping' ? Math.min(700, gap * 1.15) : 80; }
    if (state === 'stopping' && speed < 0.09){ state = 'idle'; target = 0.04; reveal(); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function start(){ load().then(function(){ state = 'spinning'; target = 16; gap = 80; box.classList.add('spinning'); res.classList.remove('show'); btnStop.disabled = false; btnSpin.disabled = true; clearTimeout(timer); timer = setTimeout(function(){ if (state === 'spinning') stop(); }, 7000); }); }
  function stop(){ if (state !== 'spinning') return; state = 'stopping'; target = 0.04; pick = pieces[Math.floor(Math.random() * pieces.length)]; btnStop.disabled = true; }
  function reveal(){ box.classList.remove('spinning'); cur.textContent = pick.t; document.getElementById('resTitle').textContent = pick.t; document.getElementById('resMeta').textContent = meta(pick); document.getElementById('resLink').href = pick.u; res.classList.add('show'); btnSpin.disabled = false; btnSpin.textContent = I18N[current].wheel.again; btnSpin.dataset.i18n = 'wheel.again'; }
  btnSpin.addEventListener('click', start); btnStop.addEventListener('click', stop);
  renderRing(); cur.textContent = I18N[current].wheel.hint;
})();

/* ---------- Categories hover images ---------- */`;
rep('/* ---------- Categories hover images ---------- */', JS);
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length, 'fails', fails);
