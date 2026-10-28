/* Radio v2: genre stations on the dial, programme list grouped by genre, mood labels, YouTube readings inside the radio */
const fs = require('fs'), path = require('path');
const JS = path.join(__dirname, '..', 'assets', 'extras.js'), CSS = path.join(__dirname, '..', 'assets', 'extras.css');
let j = fs.readFileSync(JS, 'utf8'), c = fs.readFileSync(CSS, 'utf8');
if (j.includes('radio-program')){ console.log('already'); process.exit(0); }
const ADD = {
 tr:{program:'Ne dinlemek istersin?',recordings:'Kayıtlar',ytReadings:'YouTube’dan okumalar',readBy:'Seslendiren:',mood_huzun:'Hüzünlü',mood_sakin:'Sakin',mood_coskun:'Coşkulu',moodNote:'Kadran türü seçer, liste kaydı. Hüzünlü metinler daha yavaş okundu.',closeVideo:'Radyoya dön'},
 en:{program:'What would you like to hear?',recordings:'Recordings',ytReadings:'Readings from YouTube',readBy:'Read by',mood_huzun:'Melancholic',mood_sakin:'Calm',mood_coskun:'Spirited',moodNote:'The dial picks a genre, the list a recording. Melancholic texts are read more slowly.',closeVideo:'Back to the radio'},
 de:{program:'Was möchtest du hören?',recordings:'Aufnahmen',ytReadings:'Lesungen von YouTube',readBy:'Gelesen von',mood_huzun:'Melancholisch',mood_sakin:'Ruhig',mood_coskun:'Beschwingt',moodNote:'Die Skala wählt die Gattung, die Liste die Aufnahme. Melancholische Texte werden langsamer gelesen.',closeVideo:'Zurück zum Radio'},
 fr:{program:'Que voulez-vous écouter ?',recordings:'Enregistrements',ytReadings:'Lectures sur YouTube',readBy:'Lu par',mood_huzun:'Mélancolique',mood_sakin:'Calme',mood_coskun:'Enjoué',moodNote:'Le cadran choisit le genre, la liste l’enregistrement. Les textes mélancoliques sont lus plus lentement.',closeVideo:'Retour à la radio'},
 ar:{program:'ماذا تودّ أن تسمع؟',recordings:'التسجيلات',ytReadings:'قراءات من يوتيوب',readBy:'بصوت',mood_huzun:'حزين',mood_sakin:'هادئ',mood_coskun:'متحمس',moodNote:'المؤشر يختار النوع والقائمة التسجيل. النصوص الحزينة تُقرأ أبطأ.',closeVideo:'العودة إلى الراديو'},
 es:{program:'¿Qué quieres escuchar?',recordings:'Grabaciones',ytReadings:'Lecturas de YouTube',readBy:'Leído por',mood_huzun:'Melancólico',mood_sakin:'Sereno',mood_coskun:'Vivaz',moodNote:'El dial elige el género, la lista la grabación. Los textos melancólicos se leen más despacio.',closeVideo:'Volver a la radio'},
 ru:{program:'Что хотите послушать?',recordings:'Записи',ytReadings:'Чтения с YouTube',readBy:'Читает',mood_huzun:'Грустное',mood_sakin:'Спокойное',mood_coskun:'Бодрое',moodNote:'Шкала выбирает жанр, список — запись. Грустные тексты читаются медленнее.',closeVideo:'Назад к радио'}
};
const PEND = { tr:"pending:'onay bekliyor'}", en:"pending:'awaiting approval'}", de:"pending:'wartet auf Freigabe'}", fr:"pending:'en attente'}", ar:"pending:'بانتظار الموافقة'}", es:"pending:'pendiente'}", ru:"pending:'ожидает одобрения'}" };
for (const [l, add] of Object.entries(ADD)){ const a = PEND[l]; if (!j.includes(a)) throw new Error('dict anchor ' + l); j = j.replace(a, a.slice(0, -1) + ',' + Object.entries(add).map(([k, v]) => k + ':' + JSON.stringify(v)).join(',') + '}'); }
const s = j.indexOf('/* ================= 12. Helezon Radyo (home) ================= */'), e = j.indexOf('/* ================= 13.');
if (s < 0 || e < 0) throw new Error('radio block not found');
const RADIO = `/* ================= 12. Helezon Radyo (home): genre stations, recorded readings, YouTube ================= */
var radio = document.getElementById('radyo');
if (radio){
  var dial = radio.querySelector('.scale'), needle = radio.querySelector('.needle'), range = radio.querySelector('input'), nowEl = radio.querySelector('.now'), power = radio.querySelector('.power');
  var REC = [], YT = [], ST = [], on = false, staticGain = null, staticSrc = null, cur = -1, curSt = -1, audio = new Audio(); audio.preload = 'none';
  var screen = el('div', 'screen'); radio.appendChild(screen);
  var program = el('div', 'radio-program'); radio.parentNode.appendChild(program);
  var GORDER = ['siir', 'hikaye', 'deneme', 'makale', 'biyografi', 'ceviri', 'roportaj', 'editorden', 'gezi', 'hatira', 'mektup'];
  var GKEY = { siir: 'cats.poetry', hikaye: 'cat.story', deneme: 'cat.essay', makale: 'cat.article', biyografi: 'cat.biography', ceviri: 'cat.translation', roportaj: 'cat.interview', editorden: 'cat.editorial' };
  function gLabel(g, gn){ try{ var k = GKEY[g]; if (!k) return gn; return k.split('.').reduce(function(o, x){ return o[x]; }, I18N[current]) || gn; }catch(e){ return gn; } }
  function moodName(m){ return t('mood_' + (m || 'sakin')); }
  function fmt(s){ s = Math.round(s || 0); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function buildStations(){ ST = []; GORDER.forEach(function(g){ var items = []; REC.forEach(function(r, i){ if (r.g === g) items.push(i); }); if (items.length) ST.push({ g: g, gn: REC[items[0]].gn, items: items }); }); }
  function stPos(si){ return ST.length > 1 ? si / (ST.length - 1) * 1000 : 0; }
  function pos(v){ return 6 + v / 1000 * 88; }
  function renderStations(){ dial.innerHTML = ST.map(function(s, i){ return '<div class="st' + (on && curSt === i ? ' on' : '') + '" data-i="' + i + '"><i></i><span>' + esc(gLabel(s.g, s.gn)) + '</span></div>'; }).join(''); power.textContent = on ? '■' : '▶'; }
  function row(i){ var r = REC[i]; return '<li data-rec="' + i + '"' + (on && cur === i ? ' class="on"' : '') + '><button type="button"><span class="rp-play">▶</span><span class="rp-text"><span class="rp-t">' + esc(r.t) + '</span><span class="rp-a">' + esc(r.a) + ' · ' + esc(t('issue')) + ' ' + r.n + '</span></span><span class="rp-mood mood-' + esc(r.mood || 'sakin') + '">' + esc(moodName(r.mood)) + '</span><span class="rp-d">' + fmt(r.dur) + '</span></button></li>'; }
  function renderProgram(){
    program.innerHTML = '<h3 class="rp-title">' + esc(t('program')) + '</h3><p class="rp-sub">' + esc(t('recordings')) + ' · ' + REC.length + '</p><p class="rp-note">' + esc(t('moodNote')) + '</p>' +
      ST.map(function(s){ return '<p class="rp-genre">' + esc(gLabel(s.g, s.gn)) + '</p><ul class="rp-list">' + s.items.map(row).join('') + '</ul>'; }).join('') +
      (YT.length ? '<p class="rp-sub">' + esc(t('ytReadings')) + ' · ' + YT.length + '</p><ul class="rp-list yt">' + YT.map(function(v, i){ return '<li data-yt="' + i + '"><button type="button"><span class="rp-play">▶</span><span class="rp-text"><span class="rp-t">' + esc(v.t) + '</span><span class="rp-a">' + esc(v.a) + (v.r ? ' · ' + esc(t('readBy')) + ' ' + esc(v.r) : '') + '</span></span><span class="rp-d">YouTube</span></button></li>'; }).join('') + '</ul>' : '');
  }
  Promise.all([fetch('/assets/audio/radio.json').then(function(r){ return r.json(); }), fetch('/assets/audio/youtube.json').then(function(r){ return r.json(); }).catch(function(){ return []; })]).then(function(res){ REC = res[0] || []; YT = res[1] || []; buildStations(); renderStations(); renderProgram(); needle.style.left = pos(+range.value) + '%'; }).catch(function(){});
  relabel.push(function(){ renderStations(); renderProgram(); if (on && cur >= 0) nowPlaying(REC[cur]); });
  function nearest(v){ var best = null; ST.forEach(function(s, i){ var d = Math.abs(stPos(i) - v); if (!best || d < best.d) best = { s: s, d: d, i: i }; }); return best; }
  function startStatic(){ var c = ac(); if (!c || staticSrc) return; var len = c.sampleRate * 2, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; staticSrc = c.createBufferSource(); staticSrc.buffer = b; staticSrc.loop = true; var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = .4; staticGain = c.createGain(); staticGain.gain.value = .08; staticSrc.connect(f); f.connect(staticGain); staticGain.connect(c.destination); staticSrc.start(); }
  function stopStatic(){ try{ staticSrc && staticSrc.stop(); }catch(e){} staticSrc = null; staticGain = null; }
  function mark(){ program.querySelectorAll('li').forEach(function(li){ li.classList.toggle('on', on && li.dataset.rec !== undefined && +li.dataset.rec === cur); }); radio.querySelectorAll('.st').forEach(function(x){ x.classList.toggle('on', on && +x.dataset.i === curSt); }); }
  function nowPlaying(r){ nowEl.innerHTML = '<span class="st-name">' + esc(t('onAir')) + ' · ' + esc(gLabel(r.g, r.gn)) + ' · ' + esc(moodName(r.mood)) + ' · ' + fmt(r.dur) + '</span><a href="' + esc(r.u) + '">' + esc(r.t) + '</a> — ' + esc(r.a); }
  function play(i){ cur = i; audio.src = REC[i].file; audio.currentTime = 0; audio.play().catch(function(){}); nowPlaying(REC[i]); mark(); }
  function tune(){ if (!ST.length) return; var v = +range.value; needle.style.left = pos(v) + '%'; if (!on){ mark(); return; } closeScreen(); var n = nearest(v), spacing = ST.length > 1 ? 1000 / (ST.length - 1) : 1000, near = n.d < spacing * .42; if (staticGain) staticGain.gain.value = near ? .003 : Math.min(.09, .02 + n.d / 6000); if (near && curSt !== n.i){ curSt = n.i; play(ST[n.i].items[0]); } if (!near && curSt >= 0){ curSt = -1; cur = -1; audio.pause(); nowEl.innerHTML = '<span class="st-name">' + esc(t('static')) + '</span>'; } mark(); }
  audio.addEventListener('ended', function(){ if (!on || cur < 0 || curSt < 0) return; var s = ST[curSt], k = s.items.indexOf(cur); if (k < s.items.length - 1){ play(s.items[k + 1]); return; } curSt = (curSt + 1) % ST.length; range.value = Math.round(stPos(curSt)); needle.style.left = pos(+range.value) + '%'; play(ST[curSt].items[0]); });
  function stationOf(i){ for (var k = 0; k < ST.length; k++) if (ST[k].items.indexOf(i) >= 0) return k; return 0; }
  function powerOn(i){ if (!REC.length) return; closeScreen(); on = true; radio.classList.add('on'); startStatic(); if (staticGain) staticGain.gain.value = .003; curSt = stationOf(i); range.value = Math.round(stPos(curSt)); needle.style.left = pos(+range.value) + '%'; renderStations(); play(i); }
  function powerOff(){ on = false; radio.classList.remove('on'); stopStatic(); audio.pause(); cur = -1; curSt = -1; nowEl.innerHTML = ''; closeScreen(); renderStations(); mark(); }
  function newest(){ var best = 0; REC.forEach(function(r, i){ if (r.d > REC[best].d) best = i; }); return best; }
  function closeScreen(){ if (!radio.classList.contains('tv')) return; screen.innerHTML = ''; radio.classList.remove('tv'); }
  function playYT(v){ on = true; radio.classList.add('on'); audio.pause(); cur = -1; curSt = -1; stopStatic(); renderStations(); mark(); screen.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?autoplay=1&rel=0" title="' + esc(v.t) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><button class="close" type="button">' + esc(t('closeVideo')) + '</button>'; radio.classList.add('tv'); nowEl.innerHTML = '<span class="st-name">YouTube' + (v.r ? ' · ' + esc(t('readBy')) + ' ' + esc(v.r) : '') + '</span>' + esc(v.t) + ' — ' + esc(v.a); screen.querySelector('.close').addEventListener('click', function(ev){ ev.stopPropagation(); closeScreen(); powerOff(); }); radio.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  program.addEventListener('click', function(e){ var li = e.target.closest('li'); if (!li) return; if (li.dataset.rec !== undefined){ if (on && cur === +li.dataset.rec){ audio.paused ? audio.play() : audio.pause(); return; } powerOn(+li.dataset.rec); radio.scrollIntoView({ behavior: 'smooth', block: 'center' }); } else if (li.dataset.yt !== undefined) playYT(YT[+li.dataset.yt]); });
  range.addEventListener('input', function(){ if (!on){ on = true; radio.classList.add('on'); startStatic(); renderStations(); } tune(); });
  power.addEventListener('click', function(e){ e.stopPropagation(); on ? powerOff() : powerOn(newest()); });
  /* touching the radio body switches it on and plays the newest recording */
  radio.addEventListener('click', function(e){ if (e.target.closest('input, .power, a, .screen')) return; if (!on) powerOn(newest()); });
  window.addEventListener('pagehide', function(){ if (on){ stopStatic(); audio.pause(); } });
}

`;
j = j.slice(0, s) + RADIO + j.slice(e);
fs.writeFileSync(JS, j);
c += `
/* ---------- radio programme + YouTube screen ---------- */
.radio .screen{display:none;margin-top:12px;background:#000;border:2px solid #b8925a;border-radius:6px;overflow:hidden;position:relative}
.radio.tv .screen{display:block}
.radio .screen iframe{width:100%;aspect-ratio:16/9;border:0;display:block}
.radio .screen .close{position:absolute;top:6px;inset-inline-end:6px;background:rgba(0,0,0,.65);color:#e9dcc2;font:500 9.5px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding:7px 9px;border:1px solid #b8925a;cursor:pointer}
.radio .dial .st span{max-width:64px;white-space:normal;line-height:1.15}
.radio-program{grid-column:1/-1;margin-top:10px}
.rp-title{font-family:var(--serif);font-size:clamp(24px,2.4vw,34px);margin-bottom:4px;font-weight:300}
.rp-sub{font:500 10.5px/1.4 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--mute);margin:16px 0 4px}
.rp-note{font-family:var(--serif);font-style:italic;font-size:15px;color:var(--ink-2);margin-bottom:6px}
.rp-genre{font:500 10px/1 var(--sans);letter-spacing:.22em;text-transform:uppercase;color:var(--wine);margin:18px 0 4px}
.rp-list li{border-top:1px solid var(--line)}
.rp-list li:last-child{border-bottom:1px solid var(--line)}
.rp-list button{width:100%;display:grid;grid-template-columns:26px 1fr auto auto;gap:14px;align-items:center;padding:11px 0;text-align:start;transition:padding-inline-start .5s var(--ease);color:inherit}
.rp-list button:hover{padding-inline-start:10px}
.rp-list li.on button{color:var(--wine)}
.rp-list li.on .rp-play{animation:blink 1.2s steps(1) infinite}
@keyframes blink{50%{opacity:.25}}
.rp-play{font-size:11px;color:var(--wine)}
.rp-text{display:grid;gap:2px}
.rp-t{font-family:var(--serif);font-size:clamp(18px,1.6vw,23px);line-height:1.15}
.rp-a{font-family:var(--serif);font-style:italic;font-size:14.5px;color:var(--ink-2)}
.rp-mood{font:500 9.5px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;padding:5px 8px;border:1px solid var(--line);white-space:nowrap}
.rp-mood.mood-huzun{color:#4a5a6a;border-color:#4a5a6a}.rp-mood.mood-coskun{color:#a8792a;border-color:#a8792a}.rp-mood.mood-sakin{color:#5b6b3e;border-color:#5b6b3e}
.rp-d{font:500 10.5px/1 var(--sans);letter-spacing:.14em;color:var(--mute);white-space:nowrap}
html[dir="rtl"] .rp-mood,html[dir="rtl"] .rp-sub,html[dir="rtl"] .rp-d,html[dir="rtl"] .rp-genre{letter-spacing:0}
@media (max-width:640px){.rp-list button{grid-template-columns:22px 1fr auto}.rp-d{display:none}.radio .dial .st span{font-size:8px;max-width:40px}}
`;
fs.writeFileSync(CSS, c);
console.log('extras patched for radio v2');
