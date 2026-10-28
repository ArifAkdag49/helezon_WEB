/* Home page: extras includes, calendar leaf + last-years, radio, restore the About section, footer/menu links */
const fs = require('fs'); let h = fs.readFileSync('index.html', 'utf8'); const before = h.length;
function rep(a, r){ if (!h.includes(a)) throw new Error('anchor missing: ' + a.slice(0, 60)); h = h.replace(a, r); }
if (h.includes('id="takvim"')){ console.log('already patched'); process.exit(0); }
rep('<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond', '<link rel="stylesheet" href="/assets/extras.css">\n<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond');
rep('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>', '<script src="/assets/extras.js" defer></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>');
const ABOUT = h.includes('id="about"') ? '' : `<!-- ===== BEHIND THE WORDS / ABOUT ===== -->
<section class="section behind" id="about">
  <div class="wrap">
    <div class="behind-grid">
      <h2 class="reveal" data-i18n="behind.title">Behind the Words</h2>
      <div class="behind-copy">
        <p class="verse reveal" data-i18n="behind.l1">In the silence of a poem,</p>
        <p class="verse reveal" data-i18n="behind.l2">between the lines of a story,</p>
        <p class="verse reveal" data-i18n="behind.l3">in the trace left by a sentence...</p>
        <div class="rule reveal"></div>
        <p class="lead reveal" data-i18n="behind.p">Helezon brings different voices of literature together.</p>
        <p class="about reveal" data-i18n="behind.about"></p>
        <div class="facts reveal">
          <span><b data-i18n="facts.since">Since 2021</b></span>
          <span><b>59</b> <span data-i18n="facts.issues">issues</span></span>
          <span data-i18n="facts.monthly">Monthly · Online</span>
          <span>ISSN 2995-0953</span>
        </div>
      </div>
    </div>
    <figure class="behind-figure reveal">
      <div class="frame"><img data-parallax src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=2000&q=75&auto=format" alt="" loading="lazy"></div>
      <figcaption><span data-i18n="behind.cap">Where every sentence begins</span><span>Helezon · 2021 → 2026</span></figcaption>
    </figure>
  </div>
</section>

`;
rep('<section class="section issue" id="issue">', `<!-- ===== CALENDAR LEAF + LAST YEARS ===== -->
<section class="leaf-sec" id="takvim">
  <div class="wrap leaf-grid">
    <div class="leaf-stack reveal"></div>
    <div class="leaf-copy">
      <p class="eyebrow x-eyebrow reveal"><i></i><span data-x="leafTitle">Günün yaprağı</span></p>
      <h2 class="reveal" data-x="leafTitle">Günün yaprağı</h2>
      <p class="lead reveal" data-x="leafLead">Her sabah bir yaprak: tarih, bir dize, bir söz. Koparınca dünkü çıkar.</p>
      <div class="leaf-actions reveal"><button class="btn ink" type="button" data-a="tear" data-x="tear">Yaprağı kopar</button><button class="btn ink" type="button" data-a="today" data-x="today" hidden>Bugün</button><button class="btn ink" type="button" data-a="share" data-x="share">Paylaş</button></div>
      <div class="lastyears reveal"><p class="eyebrow" data-x="lastYears">Geçen yıllarda bu ay</p><ul class="toc" id="gecmisList"></ul></div>
    </div>
  </div>
</section>

<!-- ===== RADIO ===== -->
<section class="radio-sec" id="radyo-sec">
  <div class="wrap radio-grid">
    <div class="radio-copy">
      <p class="eyebrow x-eyebrow reveal"><i></i><span data-x="radio">Helezon Radyo</span></p>
      <h2 class="reveal" data-x="radio">Helezon Radyo</h2>
      <p class="lead reveal" data-x="radioLead">Kadranı çevir, bir türe ayarla. Parazit dinince o türden bir yazı okunmaya başlar.</p>
      <p class="note reveal" data-x="voiceNote">Cihazın Türkçe sesiyle okunur</p>
    </div>
    <div class="radio reveal" id="radyo">
      <div class="top"><span>Helezon</span><span data-x="tune">Kadran</span><span>MMXXI</span></div>
      <div class="dial"><div class="ticks"></div><div class="scale"></div><div class="needle"></div><div class="glow"></div></div>
      <input type="range" min="0" max="1000" value="0" aria-label="Kadran">
      <div class="bottom"><div class="grille"></div><button class="power" type="button">AÇ</button></div>
      <p class="now"></p>
    </div>
  </div>
</section>

${ABOUT}<section class="section issue" id="issue">`);
rep('<li><a href="mailto:helezoniletisim@gmail.com" data-i18n="footer.contact">Contact</a></li>', '<li><a href="/tefrika/" data-x="tefrika">Tefrika</a></li>\n          <li><a href="/hatira-defteri/" data-x="guestbook">Hatıra Defteri</a></li>\n          <li><a href="/ayraclar/" data-x="bookmarks">Ayraçlarım</a></li>\n          <li><a href="mailto:helezoniletisim@gmail.com" data-i18n="footer.contact">Contact</a></li>');
rep('<li><a href="#archive" data-i18n="nav.archive">Archive</a></li>\n    <li><a href="#about" data-i18n="nav.about">About</a></li>', '<li><a href="#archive" data-i18n="nav.archive">Archive</a></li>\n    <li><a href="/tefrika/" data-x="tefrika">Tefrika</a></li>\n    <li><a href="/hatira-defteri/" data-x="guestbook">Hatıra Defteri</a></li>\n    <li><a href="#about" data-i18n="nav.about">About</a></li>');
fs.writeFileSync('index.html', h);
console.log('patched', before, '->', h.length, '| about restored:', !!ABOUT);
