const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length;
function between(startMark, endMark, replacement, keepEnd){ const s = h.indexOf(startMark); if (s < 0) throw new Error('start missing: ' + startMark.slice(0,50)); const e = h.indexOf(endMark, s + startMark.length); if (e < 0) throw new Error('end missing: ' + endMark.slice(0,50)); h = h.slice(0, s) + replacement + (keepEnd ? h.slice(e) : h.slice(e + endMark.length)); }
function rep(a, b){ if (!h.includes(a)) throw new Error('anchor missing: ' + a.slice(0,60)); h = h.replace(a, b); }
if (h.includes('class="flow"')){ console.log('already patched'); process.exit(0); }

/* 1. Strip: flowing track with tinted dots, items rise from below */
const TONES = { siir:'#6e1f2a', hikaye:'#5b6b3e', deneme:'#a8792a', makale:'#4a5a6a', biyografi:'#5a3b5e', ceviri:'#2f5f5c', roportaj:'#8a4a2a', sanat:'#6f7f6a', editorden:'#7a6a4a', yazilar:'#0e0d0b' };
between('<section class="strip" id="bolumler" aria-label="Bölümler">', '</section>', `<section class="strip" id="bolumler" aria-label="Bölümler">
  <div class="wrap">
    <span class="lbl" data-i18n="cat.sections">Bölümler</span>
    <div class="flow-clip"><div class="flow" id="stripFlow">
    <a class="reveal" href="/tur/siir/" style="--c:${TONES.siir}"><i class="dot"></i><span data-i18n="cats.poetry">Şiir</span><small>266</small></a>
    <a class="reveal" href="/tur/hikaye/" style="--c:${TONES.hikaye}"><i class="dot"></i><span data-i18n="cats.stories">Hikâye</span><small>69</small></a>
    <a class="reveal" href="/tur/deneme/" style="--c:${TONES.deneme}"><i class="dot"></i><span data-i18n="cats.essays">Deneme</span><small>68</small></a>
    <a class="reveal" href="/tur/makale/" style="--c:${TONES.makale}"><i class="dot"></i><span data-i18n="cat.article">Makale</span><small>42</small></a>
    <a class="reveal" href="/tur/biyografi/" style="--c:${TONES.biyografi}"><i class="dot"></i><span data-i18n="cats.biography">Biyografi</span><small>53</small></a>
    <a class="reveal" href="/tur/ceviri/" style="--c:${TONES.ceviri}"><i class="dot"></i><span data-i18n="cats.translation">Çeviri</span><small>58</small></a>
    <a class="reveal" href="/tur/roportaj/" style="--c:${TONES.roportaj}"><i class="dot"></i><span data-i18n="cat.interview">Röportaj</span><small>20</small></a>
    <a class="reveal" href="/tur/sanat/" style="--c:${TONES.sanat}"><i class="dot"></i><span data-i18n="cats.art">Sanat</span><small>147</small></a>
    <a class="reveal" href="/tur/editorden/" style="--c:${TONES.editorden}"><i class="dot"></i><span data-i18n="cat.editorial">Editörden</span><small>25</small></a>
    <a class="reveal" href="/yazilar/" style="--c:${TONES.yazilar}"><i class="dot"></i><span data-i18n="issue.allPieces">Tüm yazılar</span><small>767</small></a>
    </div></div>
  </div>
`, true);
between('/* ---------- Genre strip ---------- */', '/* ---------- Scroll cue ---------- */', `/* ---------- Genre strip ---------- */
.strip{background:var(--ivory);border-bottom:1px solid var(--line)}
.strip .wrap{display:flex;align-items:center;gap:clamp(18px,3vw,44px);padding-block:18px}
.strip .lbl{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute);white-space:nowrap;flex:none}
.flow-clip{flex:1;min-width:0;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.flow{display:flex;align-items:center;gap:clamp(22px,3vw,48px);width:max-content;animation:flow 60s linear infinite;will-change:transform}
.flow.still{animation:none}
.strip:hover .flow,.strip.paused .flow{animation-play-state:paused}
@keyframes flow{to{transform:translateX(-50%)}}
html[dir="rtl"] .flow{animation-name:flowRtl}
@keyframes flowRtl{to{transform:translateX(50%)}}
.strip a{font-family:var(--serif);font-size:clamp(20px,1.7vw,26px);white-space:nowrap;display:inline-flex;align-items:baseline;gap:8px;border-bottom:1px solid transparent;transition:border-color .4s,color .4s;padding-bottom:2px}
.strip a .dot{width:7px;height:7px;border-radius:50%;background:var(--c,var(--wine));align-self:center;opacity:.8;flex:none;transition:transform .4s var(--ease)}
.strip a:hover{border-color:var(--c,var(--wine));color:var(--c,var(--wine))}
.strip a:hover .dot{transform:scale(1.35)}
.strip a small{font-family:var(--sans);font-size:10px;letter-spacing:.12em;color:var(--mute)}
`, true);

/* 2. Strip JS: duplicate for a seamless loop, speed by width, pause on touch */
rep('/* ---------- Categories hover images ---------- */', `/* ---------- Genre strip flow ---------- */
(function(){
  var flow = document.getElementById('stripFlow'); if (!flow) return;
  var strip = flow.closest('.strip');
  if (reduced){ flow.classList.add('still'); return; }
  var items = Array.prototype.slice.call(flow.children);
  items.forEach(function(a){ var c = a.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; c.classList.remove('reveal'); flow.appendChild(c); });
  function speed(){ var half = flow.scrollWidth / 2; flow.style.animationDuration = Math.max(30, half / 34) + 's'; }
  speed(); window.addEventListener('resize', speed);
  var t; strip.addEventListener('touchstart', function(){ strip.classList.add('paused'); clearTimeout(t); }, { passive: true });
  strip.addEventListener('touchend', function(){ clearTimeout(t); t = setTimeout(function(){ strip.classList.remove('paused'); }, 2500); }, { passive: true });
})();

/* ---------- Categories hover images ---------- */`);

/* 3. Wheel: lock page scrolling while a finger is on the wheel face (touch-action is not honoured on SVG children) */
rep("  handle.addEventListener('pointerup', endDrag); handle.addEventListener('pointercancel', endDrag); handle.addEventListener('lostpointercapture', endDrag);", "  handle.addEventListener('pointerup', endDrag); handle.addEventListener('pointercancel', endDrag); handle.addEventListener('lostpointercapture', endDrag);\n  box.addEventListener('touchstart', function(ev){ if (ev.target && ev.target.closest && ev.target.closest('#grabArea')) ev.preventDefault(); }, { passive: false });\n  box.addEventListener('touchmove', function(ev){ if (mode === 'drag') ev.preventDefault(); }, { passive: false });");
rep('.grab{cursor:grab;touch-action:none;pointer-events:all}', '.grab{cursor:grab;touch-action:none;pointer-events:all}\n.wheel-svg{touch-action:pan-y}');
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length);
