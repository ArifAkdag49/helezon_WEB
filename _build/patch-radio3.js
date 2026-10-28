/* Radio v3: readable genre chips under the dial, big readout inside the dial instead of crowded labels */
const fs = require('fs'), path = require('path');
const JS = path.join(__dirname, '..', 'assets', 'extras.js'), CSS = path.join(__dirname, '..', 'assets', 'extras.css');
let j = fs.readFileSync(JS, 'utf8'), c = fs.readFileSync(CSS, 'utf8');
function rep(a, r){ if (!j.includes(a)) throw new Error('anchor missing: ' + a.slice(0, 70)); j = j.replace(a, r); }
if (j.includes('dialReadout')){ console.log('already'); process.exit(0); }
/* chips row + readout */
rep("  var screen = el('div', 'screen'); radio.appendChild(screen);", "  var screen = el('div', 'screen'); radio.appendChild(screen);\n  var chips = el('div', 'stations'); radio.querySelector('.dial').after(chips); var readout = el('div', 'readout'); radio.querySelector('.dial').appendChild(readout);");
rep("  function renderStations(){ dial.innerHTML = ST.map(function(s, i){ return '<div class=\"st' + (on && curSt === i ? ' on' : '') + '\" data-i=\"' + i + '\"><i></i><span>' + esc(gLabel(s.g, s.gn)) + '</span></div>'; }).join(''); power.textContent = on ? '■' : '▶'; }",
    "  function renderStations(){ dial.innerHTML = ST.map(function(s, i){ return '<div class=\"st\" data-i=\"' + i + '\"><i></i></div>'; }).join(''); chips.innerHTML = ST.map(function(s, i){ return '<button type=\"button\" data-i=\"' + i + '\"' + (on && curSt === i ? ' class=\"on\"' : '') + '>' + esc(gLabel(s.g, s.gn)) + '</button>'; }).join(''); power.textContent = on ? '■' : '▶'; setReadout(); }\n  function setReadout(){ var txt = ''; if (ST.length){ var n = nearest(+range.value), spacing = ST.length > 1 ? 1000 / (ST.length - 1) : 1000; txt = (n.d < spacing * .42) ? gLabel(n.s.g, n.s.gn) : '· · ·'; } readout.textContent = txt; readout.classList.toggle('dim', !on); }");
rep("  function mark(){ program.querySelectorAll('li').forEach(function(li){ li.classList.toggle('on', on && li.dataset.rec !== undefined && +li.dataset.rec === cur); }); radio.querySelectorAll('.st').forEach(function(x){ x.classList.toggle('on', on && +x.dataset.i === curSt); }); }",
    "  function mark(){ program.querySelectorAll('li').forEach(function(li){ li.classList.toggle('on', on && li.dataset.rec !== undefined && +li.dataset.rec === cur); }); radio.querySelectorAll('.st').forEach(function(x){ x.classList.toggle('on', on && +x.dataset.i === curSt); }); chips.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', on && +b.dataset.i === curSt); }); setReadout(); }");
rep("  function tune(){ if (!ST.length) return; var v = +range.value; needle.style.left = pos(v) + '%'; if (!on){ mark(); return; }", "  function tune(){ if (!ST.length) return; var v = +range.value; needle.style.left = pos(v) + '%'; setReadout(); if (!on){ mark(); return; }");
rep("  program.addEventListener('click', function(e){ var li = e.target.closest('li');", "  chips.addEventListener('click', function(e){ var b = e.target.closest('button'); if (!b) return; e.stopPropagation(); var si = +b.dataset.i; if (on && curSt === si) return; powerOn(ST[si].items[0]); });\n  program.addEventListener('click', function(e){ var li = e.target.closest('li');");
rep("if (e.target.closest('input, .power, a, .screen')) return; if (!on) powerOn(newest()); });", "if (e.target.closest('input, .power, a, .screen, .stations')) return; if (!on) powerOn(newest()); });");
fs.writeFileSync(JS, j);
c += `
/* ---------- radio v3: readout + genre chips ---------- */
.radio .dial .scale{align-items:stretch}
.radio .dial .st{width:0;height:100%;justify-content:flex-end;padding-bottom:0}
.radio .dial .st i{height:100%;opacity:.12;transition:opacity .3s}
.radio .dial .st.on i{opacity:.7;background:var(--wine)}
.radio .dial .st span{display:none}
.radio .dial .readout{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--serif);font-size:clamp(26px,3.2vw,40px);letter-spacing:.2em;text-transform:uppercase;color:#2b1d15;pointer-events:none;padding-inline:.2em 0;transition:opacity .4s}
.radio .dial .readout.dim{opacity:.45}
html[dir="rtl"] .radio .dial .readout{letter-spacing:0}
.radio .stations{display:flex;gap:6px;overflow-x:auto;padding:12px 2px 2px;scrollbar-width:none;-ms-overflow-style:none}
.radio .stations::-webkit-scrollbar{display:none}
.radio .stations button{flex:none;padding:9px 12px;border:1px solid #b8925a;border-radius:3px;background:rgba(0,0,0,.28);color:#e9dcc2;font:500 10.5px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:background .3s,color .3s,transform .3s}
.radio .stations button:hover{background:rgba(233,220,194,.18)}
.radio .stations button.on{background:#e9dcc2;color:#2b1d15;box-shadow:0 0 0 2px rgba(255,190,90,.35)}
html[dir="rtl"] .radio .stations button{letter-spacing:0}
@media (max-width:640px){.radio .stations button{padding:9px 10px;font-size:10px}}
`;
fs.writeFileSync(CSS, c);
console.log('radio v3 patched');
