/* Helezon static archive builder
   Reads _build/raw/all-posts.json (WordPress REST export of helezondergisi.com)
   and writes yazi/, yazar/, tur/, sayi/, arsiv/, yazilar/, yazarlar/, data/, sitemap.xml
   Run:  node _build/build.js            (from the helezon/ folder)
*/
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const RAW = path.join(__dirname, 'raw');
const SITE = 'https://helezon.vercel.app';
const ORIGIN = 'https://helezondergisi.com/';

const posts = JSON.parse(fs.readFileSync(path.join(RAW, 'all-posts.json'), 'utf8'));
const catsRaw = JSON.parse(fs.readFileSync(path.join(RAW, 'categories.json'), 'utf8'));
const users = JSON.parse(fs.readFileSync(path.join(RAW, 'users.json'), 'utf8'));

/* ---------------- helpers ---------------- */
const ENT = { amp:'&', lt:'<', gt:'>', quot:'"', apos:"'", nbsp:' ', hellip:'…', ndash:'–', mdash:'—', rsquo:'’', lsquo:'‘', rdquo:'”', ldquo:'“', uuml:'ü', ouml:'ö', ccedil:'ç', Uuml:'Ü', Ouml:'Ö', Ccedil:'Ç', icirc:'î', acirc:'â', Icirc:'Î', Acirc:'Â', ucirc:'û', laquo:'«', raquo:'»', copy:'©', bull:'•', aring:'å', Aring:'Å', oslash:'ø', Oslash:'Ø', aelig:'æ', AElig:'Æ', eacute:'é', Eacute:'É', egrave:'è', Egrave:'È', ecirc:'ê', euml:'ë', agrave:'à', aacute:'á', auml:'ä', Auml:'Ä', iacute:'í', igrave:'ì', iuml:'ï', oacute:'ó', ograve:'ò', otilde:'õ', uacute:'ú', ugrave:'ù', ntilde:'ñ', szlig:'ß', yacute:'ý', ccedil:'ç', Ccedil:'Ç', scaron:'š', zcaron:'ž', trade:'™', reg:'®', deg:'°', middot:'·', sbquo:'‚', bdquo:'„', prime:'′', lsaquo:'‹', rsaquo:'›', times:'×' };
const decode = s => String(s || '')
  .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n))
  .replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&([a-z]+);/gi, (m, k) => ENT[k] !== undefined ? ENT[k] : m);
const stripTags = s => decode(String(s || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const trLower = s => s.toLocaleLowerCase('tr');
const trUpper = s => s.toLocaleUpperCase('tr');
const capWord = w => { if (!w) return w; const first = [...w][0]; return trUpper(first) + trLower(w.slice(first.length)); };
const isCapsWord = w => { const letters = w.replace(/[^\p{L}]/gu, ''); return letters.length >= 2 && letters === trUpper(letters); };
function titleCaseIfCaps(s){
  const letters = s.replace(/[^\p{L}]/gu, '');
  if (letters.length < 3) return s;
  const upper = letters.replace(/[^\p{Lu}]/gu, '').length;
  if (upper / letters.length < 0.85) return s;
  return s.split(/(\s+)/).map(w => /\s/.test(w) ? w : w.split('-').map(capWord).join('-')).join('');
}
function normName(n){
  return n.replace(/<[^>]+>/g, '').replace(/[￼​-‍﻿]/g, '').replace(/\*+$/,'').replace(/\s+/g, ' ').trim()
    .split(' ').map(w => isCapsWord(w) ? w.split('-').map(capWord).join('-') : w).join(' ');
}
const fold = s => trLower(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u')
  .replace(/[^a-z0-9а-яёүөңқғ]/g, '');
const slugify = s => fold(s.replace(/\s+/g, '-')).replace(/[^a-z0-9-]/g, '') || 'x';
const CYR = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'j',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',ү:'u',ө:'o',ң:'n',қ:'k',ғ:'g',ұ:'u',і:'i',һ:'h',ә:'a' };
const translit = s => s.replace(/[Ѐ-ӿ]/g, ch => { const l = ch.toLowerCase(); return CYR[l] !== undefined ? CYR[l] : ''; });
const slugifyKeep = s => { const t = translit(trLower(s)).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g,'i').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ç/g,'c').replace(/ö/g,'o').replace(/ü/g,'u').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); return t || null; };
const MONTHS_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

/* categories */
const cats = {}; catsRaw.forEach(c => cats[c.id] = c);
const GENRE_ORDER = ['siir','hikaye','deneme','makale','biyografi','roportaj','mektup','hatira','gezi','ceviri','gorsel-siir','ebru','fotograf','kaligrafi','kaligrafi-gorsel-sanatlar','resim','tezhip','sinema','muzik','tiyatro','gorsel-sanatlar','sanat','edebiyat'];
const GENRE_NAME = { siir:'Şiir', hikaye:'Hikâye', deneme:'Deneme', makale:'Makale', biyografi:'Biyografi', roportaj:'Röportaj', mektup:'Mektup', hatira:'Hatıra', gezi:'Gezi', ceviri:'Çeviri', 'gorsel-siir':'Görsel Şiir', ebru:'Ebru', fotograf:'Fotoğraf', kaligrafi:'Kaligrafi', 'kaligrafi-gorsel-sanatlar':'Kaligrafi', resim:'Resim', tezhip:'Tezhip', sinema:'Sinema', muzik:'Müzik', tiyatro:'Tiyatro', 'gorsel-sanatlar':'Görsel Sanatlar', sanat:'Sanat', edebiyat:'Edebiyat', editorden:'Editörden' };
const META_CATS = new Set(['sonsayi','afis','bize-yazin','uncategorized','sayilarimiz','sizden-gelenler','aralik']);

/* issue number: no. 1 = November 2021 (launched 31 Oct 2021), monthly; May 2024 issue (no. 31) was published on 30 Apr 2024 */
function issueOf(dateStr){
  const y = +dateStr.slice(0,4), m = +dateStr.slice(5,7);
  if (dateStr < '2021-12-01') return 1;
  if (dateStr.startsWith('2024-04-30')) return 31;
  return (y - 2021) * 12 + (m - 10);
}
function issueMonth(n){ /* returns {y, m} for an issue number */
  if (n <= 30){ const idx = n + 9; /* Nov 2021 -> idx 10 (0-based months since Jan 2021) */ return { y: 2021 + Math.floor(idx / 12), m: (idx % 12) + 1 }; }
  if (n === 31) return { y: 2024, m: 5 };
  const idx = n + 9; return { y: 2021 + Math.floor(idx / 12), m: (idx % 12) + 1 };
}

/* masthead roles for the writers listed on helezondergisi.com/yazarlar */
const ROLES = { 'erdalkaraman':'Yayın Yönetmeni', 'sehersaglam':'Editör', 'doganyucel':'Yazı İşleri', 'elifozsoy':'Görsel Tasarım ve Sosyal Medya', 'ferideakdag':'Görsel Tasarım ve Sosyal Medya', 'durduozan':'Yayın Kurulu', 'emreozan':'Yayın Kurulu', 'ibrahimturkhan':'Yayın Kurulu', 'semihyilmaz':'Yayın Kurulu', 'tahsinikelam':'Yayın Kurulu', 'admin':'Editörlük' };
const userByKey = {}; users.forEach(u => userByKey[fold(u.name)] = u);
userByKey[fold('elif e.ö')] = users.find(u => u.slug === 'elifozsoy');
userByKey[fold('Elif Özsoy')] = users.find(u => u.slug === 'elifozsoy');
userByKey[fold('Tahsîn-i Kelâm')] = users.find(u => u.slug === 'tahsinikelam');
userByKey[fold('HELEZON')] = users.find(u => u.slug === 'admin');
userByKey[fold('Helezon')] = users.find(u => u.slug === 'admin');

/* ---------------- content sanitizer ---------------- */
function cleanContent(html, isPoem){
  let h = String(html || '');
  h = h.replace(/<!--[\s\S]*?-->/g, '');
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  h = h.replace(/\[\/?et_pb_[^\]]*\]/g, '').replace(/\[\/?(caption|gallery|embed|vc_[a-z_]+)[^\]]*\]/g, '');
  /* attributes: keep only the useful ones */
  h = h.replace(/<(\w+)([^>]*)>/g, (m, tag, attrs) => {
    tag = tag.toLowerCase();
    if (['div','span','section','font','center'].includes(tag)) return tag === 'div' ? '<div>' : '<span>';
    const keep = {};
    attrs.replace(/([a-zA-Z-]+)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/g, (mm, k, v) => { keep[k.toLowerCase()] = v.replace(/^['"]|['"]$/g, ''); });
    let out = '';
    if (tag === 'a' && keep.href){ const href = keep.href; const ext = /^https?:\/\//.test(href) && !href.startsWith(SITE); out = ` href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}`; }
    if (tag === 'img'){ if (!keep.src) return ''; out = ` src="${esc(keep.src)}" alt="${esc(keep.alt || '')}" loading="lazy"`; }
    if (tag === 'iframe'){ if (!keep.src) return ''; out = ` src="${esc(keep.src)}" loading="lazy" allowfullscreen`; }
    return `<${tag}${out}>`;
  });
  h = h.replace(/<\/(div|span|section|font|center)>/gi, (m, t) => t.toLowerCase() === 'div' ? '</div>' : '</span>');
  h = h.replace(/<span>\s*<\/span>/g, '');
  /* leading non-breaking indents */
  h = h.replace(/<p>(?:\s|&nbsp;| )+/g, '<p>');
  /* empty paragraphs: poems use them as stanza breaks, prose does not need them */
  h = h.replace(/<p>(?:\s|&nbsp;| |<br>)*<\/p>/g, isPoem ? '<p class="stanza"></p>' : '');
  h = h.replace(/^(\s*<p class="stanza"><\/p>\s*)+/, '').replace(/(\s*<p class="stanza"><\/p>\s*)+$/, '');
  h = h.replace(/(<p class="stanza"><\/p>\s*){2,}/g, '<p class="stanza"></p>');
  h = h.replace(/\n{3,}/g, '\n\n').trim();
  return h;
}

/* ---------------- normalize posts ---------------- */
const SEP = /^(.*?)\s*(?:\s[–—]\s?|\s-\s|\s\/\s|(?<=\S)[–—](?=\S)|(?<=\S)-\s|\s-(?=\S)|(?<=\p{L})-(?=\p{Lu}\p{Ll}))\s*([^–—\/]+?)\s*$/u;
const PEN_NAMES = new Set(['theynep','farzimuhal']);
function splitTitle(raw, knownKeys){
  const t = raw.replace(/\s+/g, ' ').replace(/[\s–—-]+$/, '').trim();
  const m = t.match(SEP);
  if (m){
    const right = m[2].replace(/<[^>]+>/g, '').trim();
    const words = right.split(' ');
    const last = words[words.length-1].replace(/\*+$/, '');
    const allCapitalized = words.length >= 2 && words.length <= 4 && words.every(w => /^\p{Lu}/u.test(w)) && !/\d/.test(right);
    const looksName = words.length <= 5 && (
      isCapsWord(last) || /[Ѐ-ӿ]/.test(right) || /\*$/.test(right) || /^Röportaj:/i.test(right) || /^(Tahsîn|Tahsin)/i.test(right) ||
      PEN_NAMES.has(fold(right)) || (knownKeys && knownKeys.has(fold(right.replace(/\*+$/, '')))) || allCapitalized);
    if (looksName && m[1].trim()) return { title: m[1].trim(), author: right };
  }
  return { title: t, author: null };
}
const cleanRaw = p => decode(p.title.rendered).replace(/<[^>]+>/g, '').replace(/[￼​-‍﻿]/g, '');
/* pass 1: collect author keys from unambiguous (all-caps surname) forms */
const knownKeys = new Set();
posts.forEach(p => { const r = splitTitle(cleanRaw(p), null); if (r.author) knownKeys.add(fold(r.author.replace(/^Röportaj:\s*/i, '').replace(/\*+$/, ''))); });
const articles = [], announcements = [];
posts.forEach(p => {
  const rawTitle = cleanRaw(p);
  const terms = (p._embedded && p._embedded['wp:term'] ? p._embedded['wp:term'].flat() : []).filter(t => t.taxonomy === 'category');
  const catSlugs = terms.map(t => t.slug);
  const isAfis = catSlugs.includes('afis');
  const isEditorial = /^editörden/i.test(rawTitle);
  const isAnnouncement = (isAfis || catSlugs.includes('bize-yazin')) && !isEditorial && /say[ıi]|yayında|kutlu|başın sağolsun|yaşında/i.test(rawTitle);
  const media = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0];
  const sizes = media && media.media_details && media.media_details.sizes || {};
  const img = media ? ((sizes.large || sizes.medium_large || sizes.full || {}).source_url || media.source_url) : null;
  const imgFull = media ? media.source_url : null;
  const n = issueOf(p.date);
  if (isAnnouncement){ announcements.push({ n, date: p.date, title: rawTitle, img, imgFull, link: p.link, text: cleanContent(p.content.rendered, false) }); return; }
  let { title, author } = splitTitle(rawTitle, knownKeys);
  let interview = false, foreign = false;
  if (author && /^Röportaj:/i.test(author)){ interview = true; author = author.replace(/^Röportaj:\s*/i, ''); }
  if (author && /\*\s*$/.test(author)){ foreign = true; author = author.replace(/\*+\s*$/, ''); }
  if (isEditorial){ title = 'Editörden'; if (!author) author = 'Helezon'; }
  if (!author){
    /* art posts titled with the artist name only */
    if (catSlugs.some(s => ['gorsel-sanatlar','ebru','fotograf','kaligrafi','resim','tezhip','kaligrafi-gorsel-sanatlar'].includes(s)) && isCapsWord(rawTitle.split(' ').slice(-1)[0])) author = rawTitle;
    else author = 'Helezon';
  }
  author = normName(author); if (/^helezon$/i.test(author)) author = 'Helezon';
  title = titleCaseIfCaps(title);
  const genreSlugs = GENRE_ORDER.filter(g => catSlugs.includes(g));
  let primary = genreSlugs[0] || 'edebiyat';
  if (isEditorial) primary = 'editorden';
  if (primary === 'ceviri' && genreSlugs.length > 1) primary = genreSlugs.find(g => g !== 'ceviri');
  const isPoem = primary === 'siir' || primary === 'gorsel-siir';
  const wpSlug = decodeURIComponent(p.link.replace(ORIGIN, '').replace(/\/$/, ''));
  const slug = /^[a-z0-9-]+$/.test(wpSlug) ? wpSlug : ('p' + p.id + '-' + (slugifyKeep(title) || 'yazi').slice(0, 40));
  const excerpt = stripTags(p.excerpt.rendered).replace(/\s*\[…\]\s*$/, '').replace(/\[&hellip;\]/g, '').slice(0, 260);
  articles.push({ id: p.id, date: p.date, n, title, author, authorKey: fold(author), interview, foreign, isAfis, translation: catSlugs.includes('ceviri'), genre: primary, genres: isEditorial ? ['editorden'] : (genreSlugs.length ? genreSlugs : ['edebiyat']), img, imgFull, link: p.link, slug, url: `/yazi/${slug}/`, excerpt, content: cleanContent(p.content.rendered, isPoem), isPoem, isEditorial });
});
articles.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id);
console.log('articles', articles.length, 'announcements', announcements.length);

/* authors */
const authorsMap = {};
articles.forEach(a => { const k = a.authorKey; if (!authorsMap[k]) authorsMap[k] = { key: k, names: {}, pieces: [] }; authorsMap[k].names[a.author] = (authorsMap[k].names[a.author] || 0) + 1; authorsMap[k].pieces.push(a); });
const authors = Object.values(authorsMap).map(a => {
  const name = Object.entries(a.names).sort((x, y) => y[1] - x[1])[0][0];
  const u = userByKey[a.key];
  const slug = u ? u.slug : slugifyKeep(name) || a.key;
  return { key: a.key, name, slug, role: u && ROLES[u.slug] ? ROLES[u.slug] : null, pieces: a.pieces, url: `/yazar/${slug}/` };
});
const authorBySlug = {}; authors.forEach(a => { if (authorBySlug[a.slug]) { a.slug = a.slug + '-' + a.key.slice(0,4); a.url = `/yazar/${a.slug}/`; } authorBySlug[a.slug] = a; });
const authorByKey = {}; authors.forEach(a => authorByKey[a.key] = a);
articles.forEach(a => a.authorUrl = authorByKey[a.authorKey].url);
authors.sort((a, b) => b.pieces.length - a.pieces.length || a.name.localeCompare(b.name, 'tr'));
console.log('authors', authors.length);

/* issues */
const issues = {};
articles.forEach(a => { if (!issues[a.n]) issues[a.n] = { n: a.n, pieces: [], announcement: null }; issues[a.n].pieces.push(a); });
announcements.forEach(an => { if (!issues[an.n]) issues[an.n] = { n: an.n, pieces: [], announcement: null }; if (!issues[an.n].announcement || an.img) issues[an.n].announcement = an; });
const issueList = Object.values(issues).sort((a, b) => b.n - a.n);
issueList.forEach(is => { const im = issueMonth(is.n); is.y = im.y; is.m = im.m; is.label = `${MONTHS_TR[is.m-1]} ${is.y}`; is.url = `/sayi/${is.n}/`; is.pieces.sort((a, b) => a.id - b.id); is.editorial = is.pieces.find(p => p.isEditorial) || null; is.cover = (is.announcement && is.announcement.img) || (is.editorial && is.editorial.isAfis && is.editorial.img) || null; });
console.log('issues', issueList.length, 'with cover', issueList.filter(i => i.cover).length);

/* genres */
const genres = {};
articles.forEach(a => a.genres.forEach(g => { if (!genres[g]) genres[g] = { slug: g, name: GENRE_NAME[g] || g, pieces: [] }; genres[g].pieces.push(a); }));
if (!genres.editorden && articles.some(a => a.isEditorial)) genres.editorden = { slug: 'editorden', name: 'Editörden', pieces: articles.filter(a => a.isEditorial) };
const genreList = Object.values(genres).sort((a, b) => b.pieces.length - a.pieces.length);
genreList.forEach(g => g.url = `/tur/${g.slug}/`);

/* ---------------- templates ---------------- */
const NAV = `
<header class="nav solid" id="nav">
  <a href="/" class="wordmark" aria-label="Helezon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12m-1 0a1 1 0 1 0 2 0a2 2 0 1 1 -4 0a3 3 0 1 0 6 0a4 4 0 1 1 -8 0a5 5 0 1 0 10 0a6 6 0 1 1 -12 0a7 7 0 1 0 14 0a8 8 0 1 1 -16 0a9 9 0 1 0 18 0"/></svg>Helezon</a>
  <nav class="nav-links" aria-label="Main">
    <a href="/sayi/59/" data-i18n="nav.latest">Son Sayı</a>
    <a href="/yazilar/" data-i18n="nav.pieces">Yazılar</a>
    <a href="/yazarlar/" data-i18n="nav.authors">Yazarlar</a>
    <a href="/arsiv/" data-i18n="nav.archive">Arşiv</a>
    <a href="/#about" data-i18n="nav.about">Hakkında</a>
  </nav>
  <div class="nav-right">
    <div class="lang" id="lang">
      <button class="lang-btn" id="langBtn" aria-haspopup="listbox" aria-expanded="false"><span id="langCode">TR</span><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4"/></svg></button>
      <div class="lang-menu" id="langMenu" role="listbox">
        <button data-lang="tr" role="option">Türkçe<small>TR</small></button><button data-lang="en" role="option">English<small>EN</small></button><button data-lang="de" role="option">Deutsch<small>DE</small></button><button data-lang="fr" role="option">Français<small>FR</small></button><button data-lang="ar" role="option">العربية<small>AR</small></button><button data-lang="es" role="option">Español<small>ES</small></button><button data-lang="ru" role="option">Русский<small>RU</small></button>
      </div>
    </div>
    <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="menu" id="menu" aria-hidden="true">
  <ul>
    <li><a href="/" data-i18n="nav.home">Ana Sayfa</a></li>
    <li><a href="/sayi/59/" data-i18n="nav.latest">Son Sayı</a></li>
    <li><a href="/yazilar/" data-i18n="nav.pieces">Yazılar</a></li>
    <li><a href="/yazarlar/" data-i18n="nav.authors">Yazarlar</a></li>
    <li><a href="/arsiv/" data-i18n="nav.archive">Arşiv</a></li>
    <li><a href="/tefrika/" data-i18n="nav.tefrika">Tefrika</a></li>
    <li><a href="/hatira-defteri/" data-i18n="nav.guestbook">Hatıra Defteri</a></li>
    <li><a href="/#about" data-i18n="nav.about">Hakkında</a></li>
  </ul>
  <div class="langs" id="menuLangs"><button data-lang="tr">TR</button><button data-lang="en">EN</button><button data-lang="de">DE</button><button data-lang="fr">FR</button><button data-lang="ar">AR</button><button data-lang="es">ES</button><button data-lang="ru">RU</button></div>
</div>`;
const FOOTER = `
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div><div class="brand"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12m-1 0a1 1 0 1 0 2 0a2 2 0 1 1 -4 0a3 3 0 1 0 6 0a4 4 0 1 1 -8 0a5 5 0 1 0 10 0a6 6 0 1 1 -12 0a7 7 0 1 0 14 0a8 8 0 1 1 -16 0a9 9 0 1 0 18 0"/></svg><span data-i18n="footer.brand">Helezon Dergisi</span></div>
        <p class="tagline" data-i18n="footer.tag">Edebiyatın, sanatın ve düşüncenin izinde.</p></div>
      <div><p class="col-title" data-i18n="footer.follow">Takip et</p><ul>
        <li><a href="https://www.instagram.com/helezon.dergisi/" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="https://twitter.com/Helezondergi" target="_blank" rel="noopener">X · Twitter</a></li>
        <li><a href="https://www.youtube.com/channel/UCrWbjIyCWuav28OnLglV_aw" target="_blank" rel="noopener">YouTube</a></li>
        <li><a href="https://helezondergisi.com" target="_blank" rel="noopener">helezondergisi.com</a></li></ul></div>
      <div><p class="col-title" data-i18n="footer.explore">Keşfet</p><ul>
        <li><a href="/yazilar/" data-i18n="nav.pieces">Yazılar</a></li>
        <li><a href="/yazarlar/" data-i18n="nav.authors">Yazarlar</a></li>
        <li><a href="/arsiv/" data-i18n="nav.archive">Arşiv</a></li>
        <li><a href="/tefrika/" data-i18n="nav.tefrika">Tefrika</a></li>
        <li><a href="/hatira-defteri/" data-i18n="nav.guestbook">Hatıra Defteri</a></li>
        <li><a href="/ayraclar/" data-i18n="nav.bookmarks">Ayraçlarım</a></li>
        <li><a href="mailto:helezoniletisim@gmail.com" data-i18n="footer.contact">İletişim</a></li>
        <li style="margin-top:12px"><a class="mail" href="mailto:helezoniletisim@gmail.com">helezoniletisim@gmail.com</a></li></ul></div>
      <div><p class="col-title" data-i18n="footer.masthead">Künye</p><div class="mast">
        <div><span data-i18n="roles.chief">Yayın Yönetmeni</span><b>Erdal Karaman</b></div>
        <div><span data-i18n="roles.editor">Editör</span><b>Seher Sağlam</b></div>
        <div><span data-i18n="roles.managing">Yazı İşleri</span><b>Doğan Yücel</b></div></div></div>
    </div>
    <div class="footer-bottom"><span>© 2026 Helezon Dergisi · ISSN 2995-0953</span><span>Paramus Publishing · Clifton, NJ</span><span data-i18n="footer.rights">Tüm hakları saklıdır.</span></div>
  </div>
</footer>
<div class="progress" id="progress" aria-hidden="true"><svg viewBox="0 0 60 60"><path id="progPath" d=""/></svg></div>
<script src="/assets/site.js" defer></script>
<script src="/assets/extras.js" defer></script>`;

function page({ title, desc, body, canonical, image, bodyClass = '', extraHead = '' }){
  return `<!DOCTYPE html>
<html lang="tr" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — Helezon Dergisi</title>
<meta name="description" content="${esc(desc || '')}">
<link rel="canonical" href="${SITE}${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc || '')}">
<meta property="og:type" content="article">
<meta property="og:url" content="${SITE}${canonical}">
${image ? `<meta property="og:image" content="${esc(image)}">` : ''}
<meta name="theme-color" content="#0e0d0b">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%230e0d0b'/%3E%3Cpath d='M32 32m-2 0a2 2 0 1 0 4 0a4 4 0 1 1 -8 0a6 6 0 1 0 12 0a8 8 0 1 1 -16 0a10 10 0 1 0 20 0a12 12 0 1 1 -24 0a14 14 0 1 0 28 0a16 16 0 1 1 -32 0a18 18 0 1 0 36 0' fill='none' stroke='%23f7f3ec' stroke-width='1.2'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Amiri:ital,wght@0,400;1,400&family=Noto+Sans+Arabic:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
<link rel="stylesheet" href="/assets/extras.css">
${extraHead}
</head>
<body class="${bodyClass}">
${NAV}
<main>
${body}
</main>
${FOOTER}
</body>
</html>`;
}

const issueLabel = n => { const is = issues[n]; return is ? `${MONTHS_TR[is.m-1]} ${is.y}` : ''; };
const fmtDate = d => { const y = d.slice(0,4), m = +d.slice(5,7), day = +d.slice(8,10); return `${day} ${MONTHS_TR[m-1]} ${y}`; };
function pieceRow(a, { showIssue = true, showAuthor = true } = {}){
  return `<li><a href="${a.url}"><span class="tag">${esc(GENRE_NAME[a.genre] || a.genre)}${a.translation && a.genre !== 'ceviri' ? ' · <span data-i18n="cat.translation">Çeviri</span>' : ''}</span><span class="t">${esc(a.title)}</span>${showAuthor ? `<span class="by">${esc(a.author)}</span>` : ''}${showIssue ? `<span class="no"><span data-i18n="l.issue">Sayı</span> ${a.n} · ${esc(issueLabel(a.n))}</span>` : ''}<i class="arr"></i></a></li>`;
}
function pieceCard(a){
  return `<a class="pcard" href="${a.url}">${a.img ? `<div class="frame"><img src="${esc(a.img)}" alt="" loading="lazy"></div>` : '<div class="frame frame-empty"></div>'}<div class="pcard-body"><span class="tag">${esc(GENRE_NAME[a.genre] || a.genre)}</span><h3>${esc(a.title)}</h3><span class="by">${esc(a.author)}</span></div></a>`;
}
function coverTile(is){
  const inner = is.cover ? `<img src="${esc(is.cover)}" alt="" loading="lazy" draggable="false">` : `<div class="cover-typo"><span class="wm">Helezon</span><span class="big">${String(is.n).padStart(2,'0')}</span></div>`;
  return `<a class="cover${is.cover ? '' : ' typo'}" data-year="${is.y}" href="${is.url}" aria-label="Sayı ${is.n}">${inner}<div class="bottom"><div class="no">${String(is.n).padStart(2,'0')}</div><div class="season"><span data-i18n="l.issue">Sayı</span> ${is.n}<br>${esc(is.label)}</div></div></a>`;
}

/* ---------------- write helpers ---------------- */
function write(rel, html){ const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); }
function rmDir(rel){ const f = path.join(ROOT, rel); if (fs.existsSync(f)) fs.rmSync(f, { recursive: true, force: true }); }
['yazi','yazar','tur','sayi','arsiv','yazilar','yazarlar','tefrika','hatira-defteri','ayraclar'].forEach(rmDir); { const keep = path.join(ROOT, 'data', 'hatira.json'); const saved = fs.existsSync(keep) ? fs.readFileSync(keep, 'utf8') : null; rmDir('data'); if (saved){ fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true }); fs.writeFileSync(keep, saved); } }

/* ---------------- article pages ---------------- */
const urls = [];
articles.forEach((a, i) => {
  const is = issues[a.n];
  const idx = is.pieces.indexOf(a);
  const prev = is.pieces[idx - 1], next = is.pieces[idx + 1];
  const author = authorByKey[a.authorKey];
  const others = author.pieces.filter(p => p !== a).slice(0, 6);
  const same = is.pieces.filter(p => p !== a && !p.isEditorial).slice(0, 8);
  const desc = a.excerpt || `${a.title} — ${a.author}. Helezon Dergisi, Sayı ${a.n}.`;
  const body = `
<article class="art">
  <header class="art-head wrap">
    <div class="art-head-text">
      <p class="crumbs"><a href="${is.url}"><span data-i18n="l.issue">Sayı</span> ${a.n} · ${esc(is.label)}</a><span class="sep">/</span><a href="/tur/${a.genre}/">${esc(GENRE_NAME[a.genre] || a.genre)}</a>${a.translation && a.genre !== 'ceviri' ? `<span class="sep">/</span><a href="/tur/ceviri/" data-i18n="cat.translation">Çeviri</a>` : ''}</p>
      <h1>${esc(a.title)}</h1>
      <p class="art-by"><a href="${a.authorUrl}">${esc(a.author)}</a>${a.interview ? ' <small data-i18n="l.interview">Röportaj</small>' : ''}${a.foreign ? ' <small data-i18n="l.foreign">Çeviri</small>' : ''}</p>
      <p class="art-date">${esc(fmtDate(a.date))}</p>
    </div>
    ${a.img ? `<div class="art-figure"><div class="frame"><img src="${esc(a.img)}" alt="" fetchpriority="high"></div></div>` : ''}
  </header>
  <div class="art-body wrap${a.isPoem ? ' poem' : ''}" lang="tr">
${a.content}
  </div>
  <footer class="art-foot wrap">
    <div class="art-share">
      <span class="eyebrow" data-i18n="l.share">Paylaş</span>
      <button class="chip" data-copy="${SITE}${a.url}"><span data-i18n="l.copy">Bağlantıyı kopyala</span></button>
      <a class="chip" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(a.title + ' — ' + a.author)}&url=${encodeURIComponent(SITE + a.url)}">X</a>
      <a class="chip" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(a.title + ' — ' + a.author + ' ' + SITE + a.url)}">WhatsApp</a>
      <a class="chip ghost" target="_blank" rel="noopener" href="${esc(a.link)}" data-i18n="l.original">helezondergisi.com'da görüntüle</a>
    </div>
    <nav class="art-nav">
      ${prev ? `<a class="prev" href="${prev.url}"><span class="eyebrow" data-i18n="l.prev">Önceki</span><span class="t">${esc(prev.title)}</span><span class="by">${esc(prev.author)}</span></a>` : '<span></span>'}
      ${next ? `<a class="next" href="${next.url}"><span class="eyebrow" data-i18n="l.next">Sonraki</span><span class="t">${esc(next.title)}</span><span class="by">${esc(next.author)}</span></a>` : '<span></span>'}
    </nav>
    ${others.length ? `<section class="related"><h2 class="sec-title"><span data-i18n="l.moreBy">Yazarın diğer yazıları</span> <a class="all" href="${a.authorUrl}">${esc(a.author)} →</a></h2><ul class="toc">${others.map(p => pieceRow(p, { showAuthor: false })).join('')}</ul></section>` : ''}
    ${same.length ? `<section class="related"><h2 class="sec-title"><span data-i18n="l.sameIssue">Aynı sayıdan</span> <a class="all" href="${is.url}"><span data-i18n="l.issue">Sayı</span> ${a.n} →</a></h2><div class="pgrid">${same.slice(0,4).map(pieceCard).join('')}</div></section>` : ''}
  </footer>
</article>`;
  const ld = { '@context':'https://schema.org', '@type': a.isPoem ? 'Poem' : 'Article', headline: a.title, author: { '@type':'Person', name: a.author }, datePublished: a.date, image: a.img || undefined, publisher: { '@type':'Organization', name:'Helezon Dergisi' }, isPartOf: { '@type':'PublicationIssue', issueNumber: a.n, name: `Helezon Sayı ${a.n}` }, mainEntityOfPage: SITE + a.url };
  write(`yazi/${a.slug}/index.html`, page({ title: `${a.title} — ${a.author}`, desc, body, canonical: a.url, image: a.img, bodyClass: 'page-art', extraHead: `<script type="application/ld+json">${JSON.stringify(ld)}</script>` }));
  urls.push({ loc: a.url, lastmod: a.date.slice(0,10) });
});

/* ---------------- author pages ---------------- */
authors.forEach(au => {
  const byYear = {}; au.pieces.forEach(p => { const y = p.date.slice(0,4); (byYear[y] = byYear[y] || []).push(p); });
  const years = Object.keys(byYear).sort((a, b) => b - a);
  const genresOf = [...new Set(au.pieces.map(p => p.genre))].map(g => GENRE_NAME[g] || g).slice(0, 4).join(' · ');
  const body = `
<section class="hero-sm wrap">
  <p class="eyebrow"><span data-i18n="l.author">Yazar</span>${au.role ? ` · ${esc(au.role)}` : ''}</p>
  <h1 class="big">${esc(au.name)}</h1>
  <p class="lead">${au.pieces.length} <span data-i18n="l.pieces">yazı</span> · ${esc(genresOf)} · ${esc(fmtDate(au.pieces[au.pieces.length-1].date).slice(-4))} → ${esc(au.pieces[0].date.slice(0,4))}</p>
</section>
<section class="wrap list-sec">
  ${years.map(y => `<h2 class="year">${y}</h2><ul class="toc">${byYear[y].map(p => pieceRow(p, { showAuthor: false })).join('')}</ul>`).join('')}
</section>`;
  write(`yazar/${au.slug}/index.html`, page({ title: au.name, desc: `${au.name} — Helezon Dergisi'ndeki ${au.pieces.length} yazısı.`, body, canonical: au.url, bodyClass: 'page-list' }));
  urls.push({ loc: au.url });
});

/* ---------------- genre pages ---------------- */
genreList.forEach(g => {
  const byYear = {}; g.pieces.forEach(p => { const y = p.date.slice(0,4); (byYear[y] = byYear[y] || []).push(p); });
  const years = Object.keys(byYear).sort((a, b) => b - a);
  const body = `
<section class="hero-sm wrap">
  <p class="eyebrow" data-i18n="l.genre">Tür</p>
  <h1 class="big">${esc(g.name)}</h1>
  <p class="lead">${g.pieces.length} <span data-i18n="l.pieces">yazı</span> · ${years[years.length-1]} → ${years[0]}</p>
  <p class="genre-links">${genreList.filter(x => x !== g).slice(0, 12).map(x => `<a href="${x.url}">${esc(x.name)}<small>${x.pieces.length}</small></a>`).join('')}</p>
</section>
<section class="wrap list-sec">
  ${years.map(y => `<h2 class="year">${y}</h2><ul class="toc">${byYear[y].map(p => pieceRow(p)).join('')}</ul>`).join('')}
</section>`;
  write(`tur/${g.slug}/index.html`, page({ title: g.name, desc: `Helezon Dergisi — ${g.name} türündeki ${g.pieces.length} yazı.`, body, canonical: g.url, bodyClass: 'page-list' }));
  urls.push({ loc: g.url });
});

/* ---------------- issue pages ---------------- */
issueList.forEach((is, i) => {
  const newer = issueList[i - 1], older = issueList[i + 1];
  const groups = {}; is.pieces.filter(p => !p.isEditorial).forEach(p => (groups[p.genre] = groups[p.genre] || []).push(p));
  const order = ['siir','hikaye','deneme','makale','biyografi','roportaj','mektup','hatira','gezi','ceviri','gorsel-siir','ebru','fotograf','kaligrafi','kaligrafi-gorsel-sanatlar','resim','tezhip','sinema','muzik','gorsel-sanatlar','sanat','edebiyat'];
  const groupKeys = Object.keys(groups).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const lead = is.pieces.filter(p => !p.isEditorial && p.img).slice(0, 3);
  const body = `
<section class="issue-head wrap">
  <div class="issue-head-text">
    <p class="crumbs"><a href="/arsiv/" data-i18n="nav.archive">Arşiv</a><span class="sep">/</span>${is.y}</p>
    <h1 class="big"><span data-i18n="l.issue">Sayı</span> ${is.n}</h1>
    <p class="lead">${esc(is.label)} · ${is.pieces.length} <span data-i18n="l.pieces">yazı</span></p>
    ${is.editorial ? `<a class="btn ink" href="${is.editorial.url}" data-i18n="l.editorial">Editörden</a>` : ''}
    ${is.announcement && is.announcement.text && !is.editorial ? `<div class="announce">${is.announcement.text.replace(/<img[^>]*>/g,'').slice(0, 1200)}</div>` : ''}
    <nav class="issue-nav">${older ? `<a href="${older.url}">← <span data-i18n="l.issue">Sayı</span> ${older.n}</a>` : '<span></span>'}${newer ? `<a href="${newer.url}"><span data-i18n="l.issue">Sayı</span> ${newer.n} →</a>` : '<span></span>'}</nav>
  </div>
  <div class="issue-cover">${is.cover ? `<img src="${esc(is.cover)}" alt="Helezon Sayı ${is.n} kapağı" fetchpriority="high">` : `<div class="cover typo static"><div class="cover-typo"><span class="wm">Helezon</span><span class="big">${String(is.n).padStart(2,'0')}</span></div><div class="bottom"><div class="no"></div><div class="season">${esc(is.label)}</div></div></div>`}</div>
</section>
${lead.length ? `<section class="wrap"><div class="pgrid">${lead.map(pieceCard).join('')}</div></section>` : ''}
<section class="wrap list-sec">
  ${groupKeys.map(k => `<h2 class="year">${esc(GENRE_NAME[k] || k)}</h2><ul class="toc">${groups[k].map(p => pieceRow(p, { showIssue: false })).join('')}</ul>`).join('')}
</section>`;
  write(`sayi/${is.n}/index.html`, page({ title: `Sayı ${is.n} · ${is.label}`, desc: `Helezon Dergisi ${is.n}. sayı, ${is.label}. ${is.pieces.length} yazı.`, body, canonical: is.url, image: is.cover, bodyClass: 'page-issue' }));
  urls.push({ loc: is.url });
});

/* ---------------- archive ---------------- */
{
  const byYear = {}; issueList.forEach(is => (byYear[is.y] = byYear[is.y] || []).push(is));
  const years = Object.keys(byYear).sort((a, b) => b - a);
  const body = `
<section class="hero-sm wrap">
  <p class="eyebrow" data-i18n="nav.archive">Arşiv</p>
  <h1 class="big" data-i18n="archive.title">Helezon Arşivi</h1>
  <p class="lead">${issueList.length} <span data-i18n="l.issues">sayı</span> · ${articles.length} <span data-i18n="l.pieces">yazı</span> · ${authors.length} <span data-i18n="l.authors">yazar</span> · 2021 → 2026</p>
  <p class="genre-links">${genreList.slice(0, 14).map(x => `<a href="${x.url}">${esc(x.name)}<small>${x.pieces.length}</small></a>`).join('')}</p>
</section>
<section class="wrap"><h2 class="sec-title"><span data-x="shelf">Sahaf rafı</span><span class="all" data-x="shelfLead">Sırtından çek, kapağı çevir.</span></h2><div class="sahaf" id="sahaf"></div><h2 class="sec-title"><span data-x="spiral">Zaman helezonu</span><span class="all" data-x="spiralLead">Merkezden dışarı: ilk sayıdan bugüne.</span></h2><div class="zaman" id="zaman"></div></section>
${years.map(y => `<section class="wrap list-sec"><h2 class="year">${y}</h2><div class="cover-grid">${byYear[y].map(coverTile).join('')}</div></section>`).join('')}`;
  write('arsiv/index.html', page({ title: 'Arşiv', desc: `Helezon Dergisi arşivi: ${issueList.length} sayı, ${articles.length} yazı, 2021'den bugüne.`, body, canonical: '/arsiv/', bodyClass: 'page-list' }));
  urls.push({ loc: '/arsiv/' });
}

/* ---------------- all pieces (search) ---------------- */
{
  const body = `
<section class="hero-sm wrap">
  <p class="eyebrow" data-i18n="nav.pieces">Yazılar</p>
  <h1 class="big" data-i18n="l.allPieces">Tüm yazılar</h1>
  <p class="lead">${articles.length} <span data-i18n="l.pieces">yazı</span> · 2021 → 2026</p>
  <form class="search" id="searchForm" onsubmit="return false">
    <input type="search" id="q" data-i18n-ph="l.searchPh" placeholder="Başlık, yazar veya kelime ara…" autocomplete="off">
    <select id="fGenre"><option value="" data-i18n="l.allGenres">Tüm türler</option>${genreList.map(g => `<option value="${g.slug}">${esc(g.name)} (${g.pieces.length})</option>`).join('')}</select>
    <select id="fYear"><option value="" data-i18n="l.allYears">Tüm yıllar</option>${[2026,2025,2024,2023,2022,2021].map(y => `<option value="${y}">${y}</option>`).join('')}</select>
  </form>
  <p class="count" id="count"></p>
</section>
<section class="wrap"><h2 class="sec-title"><span data-x="catalogue">Fiş kataloğu</span><span class="all" data-x="catLead">Çekmeceyi çek, fişleri karıştır.</span></h2><div class="katalog" id="katalog"></div></section>
<section class="wrap list-sec"><ul class="toc" id="results"></ul><p class="more-wrap"><button class="btn ink" id="more" data-i18n="l.more">Daha fazla göster</button></p></section>`;
  write('yazilar/index.html', page({ title: 'Tüm yazılar', desc: `Helezon Dergisi'nin ${articles.length} yazısı: şiir, hikâye, deneme, makale, biyografi, çeviri ve sanat.`, body, canonical: '/yazilar/', bodyClass: 'page-list page-search' }));
  urls.push({ loc: '/yazilar/' });
  const index = articles.map(a => ({ t: a.title, a: a.author, g: a.genre, gn: GENRE_NAME[a.genre] || a.genre, tr: a.translation ? 1 : 0, f: a.foreign ? 1 : 0, d: a.date.slice(0,10), n: a.n, u: a.url, s: (a.excerpt || '').slice(0, 140) }));
  write('data/pieces.json', JSON.stringify(index));
}

/* ---------------- all authors ---------------- */
{
  const initialsOf = n => { const parts = n.replace(/[.·]/g,' ').trim().split(/\s+/).filter(Boolean); return parts.length > 1 ? (parts[0][0] + parts[parts.length-1][0]).toUpperCase() : parts[0].slice(0,2).toUpperCase(); };
  const body = `
<section class="hero-sm wrap">
  <p class="eyebrow" data-i18n="nav.authors">Yazarlar</p>
  <h1 class="big" data-i18n="l.allAuthors">Sözcüklerin ardındaki sesler</h1>
  <p class="lead">${authors.length} <span data-i18n="l.authors">yazar</span> · ${articles.length} <span data-i18n="l.pieces">yazı</span></p>
</section>
<section class="wrap list-sec">
  <div class="authors-grid big-grid">
  ${authors.map(au => `<a class="author${au.role && /Yönetmeni|Editör$/.test(au.role) ? ' lead' : ''}" href="${au.url}"><span class="mark" aria-hidden="true">${esc([...au.name.split(/\s+/).slice(-1)[0]][0].toUpperCase())}</span><div class="veil"></div><span class="mono">${esc(initialsOf(au.name))}</span><div class="body"><div class="name">${esc(au.name)}</div><div class="role">${au.role ? esc(au.role) : `${au.pieces.length} <span data-i18n="l.pieces">yazı</span>`}</div></div></a>`).join('')}
  </div>
</section>`;
  write('yazarlar/index.html', page({ title: 'Yazarlar', desc: `Helezon Dergisi'nin ${authors.length} yazarı.`, body, canonical: '/yazarlar/', bodyClass: 'page-list' }));
  urls.push({ loc: '/yazarlar/' });
}

/* ---------------- extras: issues data, tefrika, guestbook, bookmarks ---------------- */
write('data/issues.json', JSON.stringify(issueList.map(is => ({ n: is.n, y: is.y, m: is.m, label: is.label, url: is.url, cover: is.cover, count: is.pieces.length }))));
{
  const stories = articles.filter(a => a.genre === 'hikaye' && !a.foreign).map(a => ({ a, len: stripTags(a.content).length })).sort((x, y) => y.len - x.len).slice(0, 3).map(x => x.a);
  const parts = [];
  stories.forEach((s, si) => { const ps = s.content.split(/(?=<p)/).filter(x => x.trim()); const per = Math.max(6, Math.ceil(ps.length / Math.min(7, Math.max(3, Math.round(ps.length / 12))))); for (let i = 0; i < ps.length; i += per) parts.push({ si, title: s.title, author: s.author, url: s.url, html: ps.slice(i, i + per).join('') }); });
  const body = `
<section class="wrap" id="tefrika" data-start="20716" style="padding-top:clamp(30px,6vh,60px)">
  <div class="tefrika-head"><div class="masthead">Helezon</div><div class="sub"><span data-x="tefrika">Tefrika</span> · <span data-i18n="l.issues">sayı</span> ${stories.length} · <span data-x="part">Bölüm</span> ${parts.length}</div></div>
  <div class="tefrika-meta" id="tefMeta"></div>
  ${parts.map((p, i) => `<div class="tefrika-part" data-story="${p.si}" data-title="${esc(p.title)}" data-author="${esc(p.author)}" hidden><div class="tefrika-body" lang="tr">${p.html}</div><p style="margin-top:18px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)"><a href="${p.url}">${esc(p.title)} — ${esc(p.author)} · <span data-x="read">Oku</span> →</a></p></div>`).join('')}
  <div class="tefrika-next" id="tefNext"></div>
  <div class="tefrika-parts" id="tefParts"></div>
</section>`;
  write('tefrika/index.html', page({ title: 'Tefrika', desc: 'Helezon tefrika: her gün bir bölüm. ' + stories.map(s => s.title).join(', ') + '.', body, canonical: '/tefrika/', bodyClass: 'page-list page-tefrika' }));
  urls.push({ loc: '/tefrika/' });
}
{
  const gb = path.join(ROOT, 'data', 'hatira.json'); if (!fs.existsSync(gb)) write('data/hatira.json', '[]');
  const body = `
<section class="hero-sm wrap"><p class="eyebrow" data-x="guestbook">Hatıra Defteri</p><h1 class="big" data-x="guestbook">Hatıra Defteri</h1><p class="lead" data-x="gbLead">Bir satır bırak; editör onayından sonra deftere işlenir.</p></section>
<section class="wrap list-sec defter">
  <div class="defter-list" id="defterList"></div>
  <form class="defter-form" id="defterForm"><div class="letter-paper"><input type="text" name="n" data-x-ph="yourName" placeholder="Adınız" required><input type="text" name="c" data-x-ph="city" placeholder="Şehir"><textarea name="m" data-x-ph="letterPh" placeholder="Mektubunuz…" required></textarea></div><div class="row"><button class="btn ink" type="submit" data-x="send">Gönder</button></div></form>
</section>`;
  write('hatira-defteri/index.html', page({ title: 'Hatıra Defteri', desc: 'Helezon okurlarının hatıra defteri.', body, canonical: '/hatira-defteri/', bodyClass: 'page-list page-guestbook' }));
  urls.push({ loc: '/hatira-defteri/' });
}
{
  const body = `
<section class="hero-sm wrap"><p class="eyebrow" data-x="bookmarks">Ayraçlarım</p><h1 class="big" data-x="bookmarks">Ayraçlarım</h1><p class="lead" data-x="noMarks">Henüz ayraç yok. Bir yazıdaki kurdeleye dokun.</p></section>
<section class="wrap list-sec"><ul class="toc" id="marksList"></ul></section>`;
  write('ayraclar/index.html', page({ title: 'Ayraçlarım', desc: 'Kaydettiğiniz Helezon yazıları.', body, canonical: '/ayraclar/', bodyClass: 'page-list page-marks' }));
}

/* ---------------- sitemap, robots, home data ---------------- */
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>${SITE}/</loc></url>\n${urls.map(u => `<url><loc>${SITE}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
/* data for the home page: latest issue pieces + covers + author links */
const latest = issueList[0];
write('data/home.json', JSON.stringify({
  latest: { n: latest.n, label: latest.label, url: latest.url, pieces: latest.pieces.filter(p => !p.isEditorial).map(a => ({ t: a.title, a: a.author, g: a.genre, u: a.url, img: a.img, ex: a.excerpt.slice(0, 200), tr: a.translation })) },
  covers: issueList.map(is => ({ n: is.n, y: is.y, m: is.m, img: is.cover, url: is.url })),
  authors: authors.slice(0, 40).map(a => ({ n: a.name, u: a.url, c: a.pieces.length, role: a.role, last: a.pieces[0] ? { t: a.pieces[0].title, u: a.pieces[0].url } : null }))
}));
console.log('pages written:', urls.length + 1);
