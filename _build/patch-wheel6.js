const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length;
function between(startMark, endMark, replacement, keepEnd){ const s = h.indexOf(startMark); if (s < 0) throw new Error('start missing: ' + startMark.slice(0,50)); const e = h.indexOf(endMark, s + startMark.length); if (e < 0) throw new Error('end missing: ' + endMark.slice(0,50)); h = h.slice(0, s) + replacement + (keepEnd ? h.slice(e) : h.slice(e + endMark.length)); }
function rep(a, b){ if (!h.includes(a)) throw new Error('anchor missing: ' + a.slice(0,60)); h = h.replace(a, b); }
if (h.includes('id="grabArea"')){ console.log('already patched'); process.exit(0); }

/* HTML: remove the crank, add an invisible grab disc over the wheel face */
between('<g id="handle" class="handle" data-lenis-prevent>', '</g>', '', false);
rep('<circle cx="300" cy="300" r="262" fill="url(#vign)" pointer-events="none"/>', '<circle cx="300" cy="300" r="262" fill="url(#vign)" pointer-events="none"/>\n        <circle id="grabArea" class="grab" cx="300" cy="300" r="262" fill="transparent" data-lenis-prevent/>');

/* CSS */
rep('.wheel-box{padding:7%;user-select:none;-webkit-user-select:none}\n.handle{cursor:grab;touch-action:none}\n.wheel-box.dragging .handle{cursor:grabbing}\n.wheel.free .handle{cursor:default}', '.wheel-box{padding:2%;user-select:none;-webkit-user-select:none}\n.grab{cursor:grab;touch-action:none;pointer-events:all}\n.wheel-box.dragging .grab{cursor:grabbing}\n.wheel.free .grab{cursor:default}');
rep('.wheel-box{order:-1;max-width:460px}', '.wheel-box{order:-1;max-width:min(460px,78vw)}');
rep('.hub-btn{position:absolute;left:50%;top:50%;width:16.5%;', '.hub-btn{position:absolute;left:50%;top:50%;width:19%;');

/* i18n: hint texts */
const H = { 'Kolu tut, çevir, bırak':'Çarkı tut, çevir, bırak', 'Grab the handle, spin, let go':'Grab the wheel, spin, let go', 'Griff fassen, drehen, loslassen':'Rad fassen, drehen, loslassen', 'Saisissez la manivelle, tournez, lâchez':'Saisissez la roue, tournez, lâchez', 'أمسك المقبض، أدِر، اترك':'أمسك العجلة، أدِر، اترك', 'Agarra la manivela, gira, suelta':'Agarra la rueda, gira, suelta', 'Возьмитесь за ручку, крутите, отпустите':'Возьмитесь за колесо, крутите, отпустите' };
for (const [k, v] of Object.entries(H)){ h = h.split(JSON.stringify(k)).join(JSON.stringify(v)); }

/* JS: grab disc drives the drag; no crank sizing */
rep("  function buildHandle(){ var t = document.getElementById('handleText'), pill = document.getElementById('handlePill'); t.textContent = I18N[current].wheel.grab || 'Tut'; var w = 0; try{ w = t.getComputedTextLength(); }catch(e){} w = Math.max(60, (w || 40) + 34); pill.setAttribute('width', w); pill.setAttribute('x', 300 - w / 2); }\n  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildHandle);", "  function buildHandle(){}");
rep("  var handle = document.getElementById('handle');", "  var handle = document.getElementById('grabArea');");
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length, '| handle refs left:', (h.match(/handlePill|handleText|id="handle"/g) || []).length);
