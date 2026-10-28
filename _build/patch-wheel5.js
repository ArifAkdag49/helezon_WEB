const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length;
function between(startMark, endMark, replacement, keepEnd){ const s = h.indexOf(startMark); if (s < 0) throw new Error('start missing: ' + startMark.slice(0,50)); const e = h.indexOf(endMark, s + startMark.length); if (e < 0) throw new Error('end missing: ' + endMark.slice(0,50)); h = h.slice(0, s) + replacement + (keepEnd ? h.slice(e) : h.slice(e + endMark.length)); }
function rep(a, b){ if (!h.includes(a)) throw new Error('anchor missing: ' + a.slice(0,60)); h = h.replace(a, b); }
if (h.includes('id="handlePill"')){ console.log('already patched'); process.exit(0); }

/* HTML: external crank handle with label; wheel itself no longer captures touch */
rep('<div class="wheel-box wheel reveal" id="wheel" data-lenis-prevent>', '<div class="wheel-box wheel reveal" id="wheel">');
rep('<g id="handle" class="handle"><line class="shadow" x1="300" y1="228" x2="300" y2="98"/><line x1="300" y1="228" x2="300" y2="98"/><circle class="knob" cx="300" cy="232" r="13"/><circle class="dot" cx="300" cy="232" r="4"/></g>',
  '<g id="handle" class="handle" data-lenis-prevent><circle class="hit" cx="300" cy="-24" r="46"/><line class="shadow" x1="300" y1="48" x2="300" y2="-6"/><line x1="300" y1="48" x2="300" y2="-6"/><circle class="knob" cx="300" cy="46" r="7"/><rect id="handlePill" class="pill" x="256" y="-42" width="88" height="36" rx="18"/><text id="handleText" class="ptext" x="300" y="-19" text-anchor="middle">Tut</text></g>');

/* CSS */
rep('.wheel-box{cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}\n.wheel-box.dragging{cursor:grabbing}', '.wheel-box{padding:7%;user-select:none;-webkit-user-select:none}\n.handle{cursor:grab;touch-action:none}\n.wheel-box.dragging .handle{cursor:grabbing}\n.wheel.free .handle{cursor:default}\n.handle .hit{fill:transparent;pointer-events:all}\n.handle .pill{fill:url(#brass);stroke:#3f2a1f;stroke-width:1.4;filter:url(#pshadow)}\n.handle .ptext{font-family:"Cormorant Garamond",serif;font-weight:500;font-size:13.5px;letter-spacing:.16em;text-transform:uppercase;fill:#2b1d15;pointer-events:none}\nhtml[dir="rtl"] .handle .ptext{letter-spacing:0;font-family:"Amiri",serif;font-size:15px}');
rep('.hub-btn{position:absolute;left:50%;top:50%;width:19%;', '.hub-btn{position:absolute;left:50%;top:50%;width:16.5%;');
rep('.wheel-box{order:-1;max-width:440px}', '.wheel-box{order:-1;max-width:460px}');

/* i18n: grab label per language (append after drag) */
const G = { 'Kolu tut, çevir, bırak':'Tut', 'Grab the handle, spin, let go':'Grab', 'Griff fassen, drehen, loslassen':'Greifen', 'Saisissez la manivelle, tournez, lâchez':'Saisir', 'أمسك المقبض، أدِر، اترك':'أمسك', 'Agarra la manivela, gira, suelta':'Agarra', 'Возьмитесь за ручку, крутите, отпустите':'Держи' };
for (const [k, v] of Object.entries(G)){ rep('"drag":' + JSON.stringify(k) + '}', '"drag":' + JSON.stringify(k) + ',"grab":' + JSON.stringify(v) + '}'); }

/* JS: handle-only dragging, no re-spin while spinning, label sizing */
rep("  window.__renderWheel = function(){ build(); if (mode === 'idle' && !pick) cur.textContent = I18N[current].wheel.hint;", "  function buildHandle(){ var t = document.getElementById('handleText'), pill = document.getElementById('handlePill'); t.textContent = I18N[current].wheel.grab || 'Tut'; var w = 0; try{ w = t.getComputedTextLength(); }catch(e){} w = Math.max(60, (w || 40) + 34); pill.setAttribute('width', w); pill.setAttribute('x', 300 - w / 2); }\n  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildHandle);\n  window.__renderWheel = function(){ build(); buildHandle(); if (mode === 'idle' && !pick) cur.textContent = I18N[current].wheel.hint;");
rep("  box.addEventListener('pointerdown', function(ev){ if (ev.button || ev.target.closest('.hub-btn')) return; ev.preventDefault(); load(); if (mode === 'spin'){ clearTimeout(autoTimer); } try{ box.setPointerCapture(ev.pointerId); }catch(e){} mode = 'drag';",
    "  var handle = document.getElementById('handle');\n  handle.addEventListener('pointerdown', function(ev){ if (ev.button || mode !== 'idle') return; ev.preventDefault(); ev.stopPropagation(); load(); try{ handle.setPointerCapture(ev.pointerId); }catch(e){} mode = 'drag';");
rep("  box.addEventListener('pointermove', function(ev){ if (mode !== 'drag' || !drag) return;", "  handle.addEventListener('pointermove', function(ev){ if (mode !== 'drag' || !drag) return;");
rep("  box.addEventListener('pointerup', endDrag); box.addEventListener('pointercancel', endDrag); box.addEventListener('lostpointercapture', endDrag);\n  build(); cur.textContent = I18N[current].wheel.hint;", "  handle.addEventListener('pointerup', endDrag); handle.addEventListener('pointercancel', endDrag); handle.addEventListener('lostpointercapture', endDrag);\n  build(); buildHandle(); cur.textContent = I18N[current].wheel.hint;");
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length);
