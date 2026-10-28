/* Radio v4: visible now-playing bar with pause/resume, progress, time and a live indicator */
const fs = require('fs'), path = require('path');
const JS = path.join(__dirname, '..', 'assets', 'extras.js'), CSS = path.join(__dirname, '..', 'assets', 'extras.css');
let j = fs.readFileSync(JS, 'utf8'), c = fs.readFileSync(CSS, 'utf8');
function rep(a, r){ if (!j.includes(a)) throw new Error('anchor missing: ' + a.slice(0, 70)); j = j.replace(a, r); }
if (j.includes('np-fill')){ console.log('already'); process.exit(0); }
/* dictionary */
const ADD = { tr:'Şu an çalıyor', en:'Now playing', de:'Läuft gerade', fr:'En cours', ar:'يُشغَّل الآن', es:'Sonando ahora', ru:'Сейчас играет' };
const ANCH = { tr:"closeVideo:\"Radyoya dön\"}", en:"closeVideo:\"Back to the radio\"}", de:"closeVideo:\"Zurück zum Radio\"}", fr:"closeVideo:\"Retour à la radio\"}", ar:"closeVideo:\"العودة إلى الراديو\"}", es:"closeVideo:\"Volver a la radio\"}", ru:"closeVideo:\"Назад к радио\"}" };
for (const [l, v] of Object.entries(ADD)){ const a = ANCH[l]; if (!j.includes(a)) throw new Error('dict anchor ' + l); j = j.replace(a, a.slice(0, -1) + ',playing:' + JSON.stringify(v) + '}'); }
/* now-playing bar */
rep("  var chips = el('div', 'stations'); radio.querySelector('.dial').after(chips);", "  var chips = el('div', 'stations'); radio.querySelector('.dial').after(chips);\n  var np = el('div', 'np', '<button class=\"np-btn\" type=\"button\">❚❚</button><div class=\"np-text\"><b></b><span></span></div><span class=\"np-time\">0:00</span><div class=\"np-bar\"><div class=\"np-fill\"></div></div>'); radio.querySelector('.bottom').after(np);\n  var topMid = radio.querySelector('.top span:nth-child(2)'), topMidText = topMid ? topMid.textContent : '';");
rep("  function play(i){ cur = i; audio.src = REC[i].file; audio.currentTime = 0; audio.play().catch(function(){}); nowPlaying(REC[i]); mark(); }",
    "  function play(i){ cur = i; audio.src = REC[i].file; audio.currentTime = 0; audio.play().catch(function(){}); nowPlaying(REC[i]); np.querySelector('b').textContent = REC[i].t; np.querySelector('span').textContent = REC[i].a; mark(); }\n  function setLive(state){ radio.classList.toggle('playing', state); if (topMid){ topMid.innerHTML = state ? '<span class=\"live\">' + esc(t('playing')) + '</span>' : esc(t('tune')); } }\n  audio.addEventListener('play', function(){ setLive(true); np.querySelector('.np-btn').textContent = '❚❚'; });\n  audio.addEventListener('pause', function(){ np.querySelector('.np-btn').textContent = '▶'; if (audio.ended || cur < 0) setLive(false); });\n  audio.addEventListener('timeupdate', function(){ var d = audio.duration || (cur >= 0 ? REC[cur].dur : 0); np.querySelector('.np-fill').style.width = (d ? audio.currentTime / d * 100 : 0) + '%'; np.querySelector('.np-time').textContent = fmt(audio.currentTime) + ' / ' + fmt(d); });\n  np.querySelector('.np-btn').addEventListener('click', function(e){ e.stopPropagation(); if (cur < 0) return; audio.paused ? audio.play() : audio.pause(); });\n  np.querySelector('.np-bar').addEventListener('click', function(e){ e.stopPropagation(); var d = audio.duration; if (!d) return; var b = e.currentTarget.getBoundingClientRect(); audio.currentTime = Math.max(0, Math.min(d, (e.clientX - b.left) / b.width * d)); });");
rep("  function powerOff(){ on = false; radio.classList.remove('on'); stopStatic(); audio.pause();", "  function powerOff(){ on = false; radio.classList.remove('on'); setLive(false); stopStatic(); audio.pause();");
rep("  function playYT(v, scroll){ on = true; radio.classList.add('on'); audio.pause();", "  function playYT(v, scroll){ on = true; radio.classList.add('on'); audio.pause(); setLive(false);");
rep("  function tune(){ if (!ST.length) return; var v = +range.value; needle.style.left = pos(v) + '%'; setReadout(); if (!on){ mark(); return; } closeScreen(); var n = nearest(v), spacing = ST.length > 1 ? 1000 / (ST.length - 1) : 1000, near = n.d < spacing * .42; if (staticGain) staticGain.gain.value = near ? .003 : Math.min(.09, .02 + n.d / 6000); if (near && curSt !== n.i){ curSt = n.i; play(ST[n.i].items[0]); } if (!near && curSt >= 0){ curSt = -1; cur = -1; audio.pause();",
    "  function tune(){ if (!ST.length) return; var v = +range.value; needle.style.left = pos(v) + '%'; setReadout(); if (!on){ mark(); return; } closeScreen(); var n = nearest(v), spacing = ST.length > 1 ? 1000 / (ST.length - 1) : 1000, near = n.d < spacing * .42; if (staticGain) staticGain.gain.value = near ? .003 : Math.min(.09, .02 + n.d / 6000); if (near && curSt !== n.i){ curSt = n.i; play(ST[n.i].items[0]); } if (!near && curSt >= 0){ curSt = -1; cur = -1; audio.pause(); setLive(false);");
rep("  relabel.push(function(){ renderStations(); renderProgram(); if (on && cur >= 0) nowPlaying(REC[cur]); });", "  relabel.push(function(){ renderStations(); renderProgram(); if (on && cur >= 0) nowPlaying(REC[cur]); setLive(radio.classList.contains('playing')); });");
fs.writeFileSync(JS, j);
c += `
/* ---------- radio v4: now-playing bar ---------- */
.radio .np{display:none;margin-top:10px;background:rgba(0,0,0,.3);border:1px solid #b8925a;border-radius:4px;padding:8px 10px;grid-template-columns:auto 1fr auto;gap:8px 10px;align-items:center}
.radio.playing .np{display:grid}
.radio .np-btn{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e6cb92,#b8925a 60%,#7d5f36);border:1px solid #2b1d15;color:#2b1d15;font-size:11px;box-shadow:0 3px 8px rgba(0,0,0,.5);cursor:pointer}
.radio .np-text{min-width:0}
.radio .np-text b{display:block;font-family:var(--serif);font-weight:400;font-size:15px;line-height:1.15;color:#f3ead6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.radio .np-text span{display:block;font:400 11px/1.3 var(--sans);color:#b8925a}
.radio .np-time{font:500 10px/1 var(--sans);letter-spacing:.1em;color:#e9dcc2;white-space:nowrap}
.radio .np-bar{grid-column:1/-1;height:6px;background:#2b1d15;border-radius:3px;position:relative;cursor:pointer;border:1px solid rgba(184,146,90,.5)}
.radio .np-fill{height:100%;background:linear-gradient(90deg,#8a2a3a,#c0566a);border-radius:3px;width:0;transition:width .25s linear}
.radio .live{display:inline-flex;align-items:center;gap:6px;color:#e9dcc2}
.radio .live::before{content:"";width:7px;height:7px;border-radius:50%;background:#e04a4a;box-shadow:0 0 6px #e04a4a;animation:blink 1.2s steps(1) infinite}
@media (max-width:640px){.radio .np{padding:6px 8px;margin-top:8px}.radio .np-btn{width:30px;height:30px}.radio .np-text b{font-size:13.5px}.radio .np-text span{font-size:10px}}
`;
fs.writeFileSync(CSS, c);
console.log('radio v4 patched');
