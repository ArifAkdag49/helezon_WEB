/* Patches _build/build.js and assets/site.js for the nostalgic extras: new pages, data files, includes, nav/footer links */
const fs = require('fs'), path = require('path');
let b = fs.readFileSync(path.join(__dirname, 'build.js'), 'utf8');
function rep(a, r){ if (!b.includes(a)) throw new Error('build.js anchor missing: ' + a.slice(0, 60)); b = b.replace(a, r); }
if (!b.includes('extras.css')){
  rep('<link rel="stylesheet" href="/assets/site.css">', '<link rel="stylesheet" href="/assets/site.css">\n<link rel="stylesheet" href="/assets/extras.css">');
  rep('<script src="/assets/site.js" defer></script>', '<script src="/assets/site.js" defer></script>\n<script src="/assets/extras.js" defer></script>');
  /* mobile menu + footer links */
  rep('    <li><a href="/#about" data-i18n="nav.about">Hakkında</a></li>\n  </ul>\n  <div class="langs"', '    <li><a href="/tefrika/" data-i18n="nav.tefrika">Tefrika</a></li>\n    <li><a href="/hatira-defteri/" data-i18n="nav.guestbook">Hatıra Defteri</a></li>\n    <li><a href="/#about" data-i18n="nav.about">Hakkında</a></li>\n  </ul>\n  <div class="langs"');
  rep('        <li><a href="/arsiv/" data-i18n="nav.archive">Arşiv</a></li>\n        <li><a href="mailto:helezoniletisim@gmail.com" data-i18n="footer.contact">İletişim</a></li>', '        <li><a href="/arsiv/" data-i18n="nav.archive">Arşiv</a></li>\n        <li><a href="/tefrika/" data-i18n="nav.tefrika">Tefrika</a></li>\n        <li><a href="/hatira-defteri/" data-i18n="nav.guestbook">Hatıra Defteri</a></li>\n        <li><a href="/ayraclar/" data-i18n="nav.bookmarks">Ayraçlarım</a></li>\n        <li><a href="mailto:helezoniletisim@gmail.com" data-i18n="footer.contact">İletişim</a></li>');
  /* archive page: shelf + spiral before the cover grids */
  rep("${years.map(y => `<section class=\"wrap list-sec\"><h2 class=\"year\">${y}</h2><div class=\"cover-grid\">", "<section class=\"wrap\"><h2 class=\"sec-title\"><span data-x=\"shelf\">Sahaf rafı</span><span class=\"all\" data-x=\"shelfLead\">Sırtından çek, kapağı çevir.</span></h2><div class=\"sahaf\" id=\"sahaf\"></div><h2 class=\"sec-title\"><span data-x=\"spiral\">Zaman helezonu</span><span class=\"all\" data-x=\"spiralLead\">Merkezden dışarı: ilk sayıdan bugüne.</span></h2><div class=\"zaman\" id=\"zaman\"></div></section>\n${years.map(y => `<section class=\"wrap list-sec\"><h2 class=\"year\">${y}</h2><div class=\"cover-grid\">");
  /* pieces page: card catalogue after the search hero */
  rep("  <p class=\"count\" id=\"count\"></p>\n</section>", "  <p class=\"count\" id=\"count\"></p>\n</section>\n<section class=\"wrap\"><h2 class=\"sec-title\"><span data-x=\"catalogue\">Fiş kataloğu</span><span class=\"all\" data-x=\"catLead\">Çekmeceyi çek, fişleri karıştır.</span></h2><div class=\"katalog\" id=\"katalog\"></div></section>");
  /* data + new pages, before the sitemap block */
  rep("/* ---------------- sitemap, robots, home data ---------------- */", `/* ---------------- extras: issues data, tefrika, guestbook, bookmarks ---------------- */
write('data/issues.json', JSON.stringify(issueList.map(is => ({ n: is.n, y: is.y, m: is.m, label: is.label, url: is.url, cover: is.cover, count: is.pieces.length }))));
{
  const stories = articles.filter(a => a.genre === 'hikaye' && !a.foreign).map(a => ({ a, len: stripTags(a.content).length })).sort((x, y) => y.len - x.len).slice(0, 3).map(x => x.a);
  const parts = [];
  stories.forEach((s, si) => { const ps = s.content.split(/(?=<p)/).filter(x => x.trim()); const per = Math.max(6, Math.ceil(ps.length / Math.min(7, Math.max(3, Math.round(ps.length / 12))))); for (let i = 0; i < ps.length; i += per) parts.push({ si, title: s.title, author: s.author, url: s.url, html: ps.slice(i, i + per).join('') }); });
  const body = \`
<section class="wrap" id="tefrika" style="padding-top:clamp(30px,6vh,60px)">
  <div class="tefrika-head"><div class="masthead">Helezon</div><div class="sub"><span data-x="tefrika">Tefrika</span> · <span data-i18n="l.issues">sayı</span> \${stories.length} · <span data-x="part">Bölüm</span> \${parts.length}</div></div>
  <div class="tefrika-meta" id="tefMeta"></div>
  \${parts.map((p, i) => \`<div class="tefrika-part" data-story="\${p.si}" data-title="\${esc(p.title)}" data-author="\${esc(p.author)}" hidden><div class="tefrika-body" lang="tr">\${p.html}</div><p style="margin-top:18px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)"><a href="\${p.url}">\${esc(p.title)} — \${esc(p.author)} · <span data-x="read">Oku</span> →</a></p></div>\`).join('')}
  <div class="tefrika-next" id="tefNext"></div>
  <div class="tefrika-parts" id="tefParts"></div>
</section>\`;
  write('tefrika/index.html', page({ title: 'Tefrika', desc: 'Helezon tefrika: her gün bir bölüm. ' + stories.map(s => s.title).join(', ') + '.', body, canonical: '/tefrika/', bodyClass: 'page-list page-tefrika' }));
  urls.push({ loc: '/tefrika/' });
}
{
  const gb = path.join(ROOT, 'data', 'hatira.json'); if (!fs.existsSync(gb)) write('data/hatira.json', '[]');
  const body = \`
<section class="hero-sm wrap"><p class="eyebrow" data-x="guestbook">Hatıra Defteri</p><h1 class="big" data-x="guestbook">Hatıra Defteri</h1><p class="lead" data-x="gbLead">Bir satır bırak; editör onayından sonra deftere işlenir.</p></section>
<section class="wrap list-sec defter">
  <div class="defter-list" id="defterList"></div>
  <form class="defter-form" id="defterForm"><div class="letter-paper"><input type="text" name="n" data-x-ph="yourName" placeholder="Adınız" required><input type="text" name="c" data-x-ph="city" placeholder="Şehir"><textarea name="m" data-x-ph="letterPh" placeholder="Mektubunuz…" required></textarea></div><div class="row"><button class="btn ink" type="submit" data-x="send">Gönder</button></div></form>
</section>\`;
  write('hatira-defteri/index.html', page({ title: 'Hatıra Defteri', desc: 'Helezon okurlarının hatıra defteri.', body, canonical: '/hatira-defteri/', bodyClass: 'page-list page-guestbook' }));
  urls.push({ loc: '/hatira-defteri/' });
}
{
  const body = \`
<section class="hero-sm wrap"><p class="eyebrow" data-x="bookmarks">Ayraçlarım</p><h1 class="big" data-x="bookmarks">Ayraçlarım</h1><p class="lead" data-x="noMarks">Henüz ayraç yok. Bir yazıdaki kurdeleye dokun.</p></section>
<section class="wrap list-sec"><ul class="toc" id="marksList"></ul></section>\`;
  write('ayraclar/index.html', page({ title: 'Ayraçlarım', desc: 'Kaydettiğiniz Helezon yazıları.', body, canonical: '/ayraclar/', bodyClass: 'page-list page-marks' }));
}

/* ---------------- sitemap, robots, home data ---------------- */`);
  rep("['yazi','yazar','tur','sayi','arsiv','yazilar','yazarlar','data'].forEach(rmDir);", "['yazi','yazar','tur','sayi','arsiv','yazilar','yazarlar','tefrika','hatira-defteri','ayraclar'].forEach(rmDir); { const keep = path.join(ROOT, 'data', 'hatira.json'); const saved = fs.existsSync(keep) ? fs.readFileSync(keep, 'utf8') : null; rmDir('data'); if (saved){ fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true }); fs.writeFileSync(keep, saved); } }");
  fs.writeFileSync(path.join(__dirname, 'build.js'), b);
  console.log('build.js patched');
} else console.log('build.js already patched');

/* site.js nav labels */
let s = fs.readFileSync(path.join(__dirname, '..', 'assets', 'site.js'), 'utf8');
if (!s.includes('tefrika:')){
  const NAV = { tr: ['Tefrika', 'Hatıra Defteri', 'Ayraçlarım', 'about:"Hakkında"}'], en: ['Serial', 'Guestbook', 'My bookmarks', 'about:"About"}'], de: ['Fortsetzungsroman', 'Gästebuch', 'Meine Lesezeichen', 'about:"Über uns"}'], fr: ['Feuilleton', 'Livre d’or', 'Mes marque-pages', 'about:"À propos"}'], ar: ['مسلسل أدبي', 'دفتر الذكريات', 'علاماتي', 'about:"عن المجلة"}'], es: ['Folletín', 'Libro de visitas', 'Mis marcapáginas', 'about:"Acerca de"}'], ru: ['Роман с продолжением', 'Книга отзывов', 'Мои закладки', 'about:"О журнале"}'] };
  for (const [l, v] of Object.entries(NAV)){ const anchor = v[3]; if (!s.includes(anchor)) throw new Error('site.js anchor missing ' + l); s = s.replace(anchor, anchor.slice(0, -1) + ',tefrika:' + JSON.stringify(v[0]) + ',guestbook:' + JSON.stringify(v[1]) + ',bookmarks:' + JSON.stringify(v[2]) + '}'); }
  fs.writeFileSync(path.join(__dirname, '..', 'assets', 'site.js'), s);
  console.log('site.js patched');
} else console.log('site.js already patched');
