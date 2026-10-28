/* Uygulama kaynağı: Helezon uygulamasının herkese açık dışa aktarımını (/api/disa/site) indirir,
   build.js'in beklediği WordPress biçimine çevirir ve siteyi üretir.

   Run:  node _build/kaynak-uygulama.js                 (indir + üret)
         node _build/kaynak-uygulama.js --dosya x.json  (indirmeden, kayıtlı dışa aktarımdan)
         node _build/kaynak-uygulama.js --yalniz-indir  (yalnız _build/raw-uygulama/ dosyaları)
   Env:  HELEZON_API  (varsayılan https://helezon.arxdigitalsevice.com)

   Yazdıkları: _build/raw-uygulama/{all-posts,categories,users,issues}.json (git dışı, build.js girdisi),
   assets/audio/radio.json, assets/audio/youtube.json, data/hatira.json. Sonra build.js çalışır.
*/
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'raw-uygulama');
const API = (process.env.HELEZON_API || 'https://helezon.arxdigitalsevice.com').replace(/\/$/, '');
const ORIGIN = 'https://helezondergisi.com/';
const SITE = 'https://helezon.vercel.app';

/* helezondergisi.com yazar hesapları (wp-json/wp/v2/users): yazar sayfalarının adresi bunlardan (/yazar/sehersaglam/). */
const WP_USERS = [
  { id: 22, name: 'Aslan Gümüş', slug: 'aslangumus' }, { id: 19, name: 'Ayşegül Akdaş', slug: 'aysegulakdas' }, { id: 6, name: 'Doğan Yücel', slug: 'doganyucel' },
  { id: 15, name: 'Durdu Ozan', slug: 'durduozan' }, { id: 12, name: 'Elif Altıntaş', slug: 'elifaltintas' }, { id: 23, name: 'elif e.ö', slug: 'elifozsoy' },
  { id: 20, name: 'Emily Yaramış', slug: 'emilyyaramis' }, { id: 9, name: 'Emre Ozan', slug: 'emreozan' }, { id: 24, name: 'Erdal Karaman', slug: 'erdalkaraman' },
  { id: 1, name: 'Helezon Editor', slug: 'admin' }, { id: 10, name: 'Hızır İlyasoğlu', slug: 'hizirilyasoglu' }, { id: 11, name: 'İbrahim Türkhan', slug: 'ibrahimturkhan' },
  { id: 21, name: 'Mehmet Refii Kileci', slug: 'mehmetrefiikileci' }, { id: 14, name: 'Meryem Tunca', slug: 'meryemtunca' }, { id: 8, name: 'Seher Sağlam', slug: 'sehersaglam' },
  { id: 16, name: 'Semih Yılmaz', slug: 'semihyilmaz' }, { id: 17, name: 'Tahsin-i Kelam', slug: 'tahsinikelam' }, { id: 52, name: 'wmadmin', slug: 'wmadmin' },
  { id: 18, name: 'Zebunniso Asrorova', slug: 'zebunnisoasrorova' },
];
const ANNOUNCE = /say[ıi]|yayında|kutlu|başın sağolsun|yaşında/i;
/* Uygulamada tek türde birleşen tür: kaligrafi-gorsel-sanatlar → kaligrafi. */
const ALIAS = { 'kaligrafi-gorsel-sanatlar': 'kaligrafi' };

/* WordPress dönemindeki sitenin uygulamada olmayan sunum bilgileri (yazar sayfası adresleri, ek tür üyelikleri,
   yabancı yazar/röportaj işaretleri). 2026-10-28'deki 767 yazılık siteden bir kez çıkarıldı; adresler kırılmasın diye. */
const ESLEM = readJson(path.join(__dirname, 'arsiv-eslemesi.json'), { yazarlar: {}, turler: {}, anaTur: {}, yabanci: [], roportaj: [] });
const eskiYazar = new Map();
Object.entries(ESLEM.yazarlar).forEach(([yazar, sluglar]) => sluglar.forEach((s) => eskiYazar.set(s, yazar)));
const yabanci = new Set(ESLEM.yabanci);
const roportaj = new Set(ESLEM.roportaj);
/* Uygulamadaki gövdenin işaretleme kaybettiği arşiv yazıları (şiirde kıta arası, gömülü video, başlık/alıntı etiketi):
   metin uygulamadakiyle birebir aynıysa eski işaretleme kullanılır; uygulamada metin değişirse uygulamanınki geçer. */
const ESKI_GOVDE = readJson(path.join(__dirname, 'arsiv-govde.json'), {});
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };
const metin = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n)).replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&([a-z]+);/gi, (m, k) => (ENT[k] !== undefined ? ENT[k] : m)).replace(/[\s ]+/g, ' ').trim();
const govdeOf = (e) => (ESKI_GOVDE[e.slug] && metin(ESKI_GOVDE[e.slug]) === metin(e.govdeHtml) ? ESKI_GOVDE[e.slug] : e.govdeHtml);

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };

/* Yayın tarihi "YYYY-MM-DDTHH:MM:SS": helezondergisi.com'un saat dilimi UTC (WordPress'in date alanı = date_gmt). */
const wpDate = (iso) => new Date(iso).toISOString().slice(0, 19);
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (html) => String(html || '').replace(/<br\s*\/?>/gi, ' ').replace(/<\/(p|h\d|li|blockquote)>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\s+/g, ' ').trim();

/* Özet: editörün elle yazdığı özet olduğu gibi; metnin kesilmiş başıysa (eski statik listeden) WordPress'in kendi özeti gibi ilk 55 kelime. */
function excerptOf(e) {
  const body = text(e.govdeHtml);
  const own = (e.ozet || '').trim();
  const fold = (s) => s.replace(/[\s.,;:!?…"“”'’()-]+/g, '');
  if (own && !fold(body).startsWith(fold(own).slice(0, 60))) return `<p>${esc(own)}</p>`;
  const words = body.split(' ');
  return `<p>${esc(words.slice(0, 55).join(' '))}${words.length > 55 ? ' [&hellip;]' : ''}</p>`;
}

function toWordPress(site) {
  const eserler = site.eserler.filter((e) => e.sayi != null);
  let nextId = 9000000;
  const ids = new Map();
  [...eserler].sort((a, b) => (a.yayin || '').localeCompare(b.yayin || '') || a.slug.localeCompare(b.slug)).forEach((e) => ids.set(e.slug, e.wpId || ++nextId));
  const posts = eserler.map((e) => {
    const id = ids.get(e.slug);
    /* Eski türler yalnız uygulamadaki tür hâlâ onlardan biriyse (editör türü değiştirdiyse uygulamanınki geçer). */
    const eskiTurler = (ESLEM.turler[e.slug] || []).filter((g) => g !== 'ceviri');
    const ayni = (g) => g === e.tur || ALIAS[g] === e.tur;
    const genre = ESLEM.anaTur[e.slug] && ayni(ESLEM.anaTur[e.slug]) ? ESLEM.anaTur[e.slug] : e.tur;
    const cats = eskiTurler.some(ayni) ? [genre, ...eskiTurler.filter((g) => g !== genre)] : [genre];
    if (e.ceviri && genre !== 'ceviri') cats.push('ceviri');
    /* "Sayımız yayında" duyuruları sitede yazı değil, sayının duyurusu (kapak + metin). */
    if (e.tur === 'editorden' && !/^editörden/i.test(e.baslik) && ANNOUNCE.test(e.baslik)) cats.push('afis');
    return {
      id,
      date: wpDate(e.yayin || e.guncelleme),
      date_gmt: (e.yayin || e.guncelleme).slice(0, 19),
      modified: e.guncelleme,
      slug: e.slug,
      /* "helezondergisi.com'da görüntüle": WordPress adresi (Türkçe karakterli eski adreslerde ?p=); uygulamada doğan yazıda uygulama. */
      link: !e.wpId ? `${site.kaynak}/yazi/${e.slug}` : e.slug.startsWith(`p${e.wpId}-`) ? `${ORIGIN}?p=${e.wpId}` : `${ORIGIN}${e.slug}/`,
      title: { rendered: esc(e.baslik) },
      content: { rendered: govdeOf(e) },
      excerpt: { rendered: excerptOf(e) },
      _embedded: {
        'wp:featuredmedia': e.kapak ? [{ source_url: e.kapak, media_details: { sizes: {} } }] : [],
        'wp:term': [cats.map((slug) => ({ taxonomy: 'category', slug, name: slug }))],
      },
      /* build.js bunu görünce başlık/yazar ayrıştırmasını atlar: değerler uygulamada zaten ayrık. */
      helezon: {
        slug: e.slug,
        title: e.baslik,
        author: e.yazar ? e.yazar.ad : 'Helezon',
        role: e.yazar ? e.yazar.unvan : null,
        genre,
        n: e.sayi,
        foreign: yabanci.has(e.slug),
        interview: roportaj.has(e.slug),
      },
    };
  });
  const issues = site.sayilar.map((s) => ({ n: s.no, y: s.yil, m: s.ay, cover: s.kapak, title: s.baslik }));
  /* Yazar sayfası adresi: arşivdeki yazarın eski adresi (build.js users.json'daki ada göre slug seçer); yenilerde addan üretilir. */
  const users = [...WP_USERS];
  const adres = new Map();
  for (const e of eserler) {
    const eski = eskiYazar.get(e.slug);
    if (!eski || !e.yazar) continue;
    const m = adres.get(e.yazar.ad) || new Map();
    m.set(eski, (m.get(eski) || 0) + 1);
    adres.set(e.yazar.ad, m);
  }
  const yonlendir = [];
  for (const [ad, m] of adres) {
    const [slug, ...digerleri] = [...m.entries()].sort((a, b) => b[1] - a[1]).map((x) => x[0]);
    users.push({ id: 0, name: ad, slug });
    /* Uygulamada tek yazara inen iki eski yazar sayfası: eskisi yenisine yönlenir. */
    digerleri.forEach((d) => yonlendir.push({ eski: `/yazar/${d}/`, yeni: `/yazar/${slug}/` }));
  }
  return { posts, issues, users, yonlendir };
}

/* Listeler sitedeki eski sıralarını korur; yeniler sona eklenir. */
function eskiSira(list, old, key) {
  const at = new Map(old.map((x, i) => [key(x), i]));
  return list.map((x, i) => [x, at.has(key(x)) ? at.get(key(x)) : old.length + i]).sort((a, b) => a[1] - b[1]).map((x) => x[0]);
}

/* Radyo listesi (assets/audio/radio.json): kayıtlar + onaylı yapay ses. Sitedeki dosyalar yerel yoldan çalar, süre eskisinden korunur. */
function radioList(site, posts) {
  const old = readJson(path.join(ROOT, 'assets/audio/radio.json'), []);
  const durOf = new Map(old.map((r) => [r.file, r.dur]));
  const bySlug = new Map(site.eserler.map((e) => [e.slug, e]));
  const list = site.kayitlar.map((k) => {
    const e = k.eser ? bySlug.get(k.eser) : null;
    const file = k.url.startsWith(`${SITE}/`) ? k.url.slice(SITE.length) : k.url;
    return {
      t: e ? e.baslik : k.baslik,
      a: k.yazar || (e && e.yazar ? e.yazar.ad : ''),
      u: e ? `/yazi/${e.slug}/` : '',
      n: e ? e.sayi : null,
      d: e && e.yayin ? wpDate(e.yayin).slice(0, 10) : '',
      g: k.tur || (e ? e.tur : ''),
      gn: e ? e.turAdi : '',
      file,
      dur: durOf.get(file) || k.sure || 0,
      mood: k.ruh || 'sakin',
    };
  }).filter((r) => !r.u || posts.has(r.u));
  return eskiSira(list, old, (r) => r.file);
}

function youtubeList(site) {
  const old = readJson(path.join(ROOT, 'assets/audio/youtube.json'), []);
  return eskiSira(site.videolar.map((v) => ({ id: v.youtubeId, t: v.baslik, a: v.yazar || '', r: v.okuyan || '' })), old, (v) => v.id);
}

function hatiraList(site) {
  return site.hatira.map((h) => ({ n: h.ad, c: h.sehir || '', m: h.mesaj, d: new Date(h.tarih).toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul' }) }));
}

function readJson(f, fallback) {
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return fallback; }
}
function writeJson(rel, data) {
  const f = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(data));
}

async function download() {
  const url = `${API}/api/disa/site?_=${Date.now()}`;
  for (let i = 1; i <= 3; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'helezon-web-build/1.0', Accept: 'application/json' } });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.json();
    } catch (e) {
      if (i === 3) throw new Error(`Dışa aktarım indirilemedi (${url}): ${e.message}`);
      await new Promise((r) => setTimeout(r, 3000 * i));
    }
  }
}

async function main() {
  const file = opt('--dosya');
  const site = file ? readJson(path.resolve(file), null) : await download();
  if (!site || site.surum !== 1 || !Array.isArray(site.eserler)) throw new Error('Beklenmeyen dışa aktarım biçimi.');
  if (site.updatedSince) throw new Error('Tam dışa aktarım gerekli (updatedSince olmadan).');
  /* Bozuk/boş bir yanıt siteyi silmesin: bilinen arşivin çok altında eser varsa dur. */
  if (site.eserler.length < 500) throw new Error(`Dışa aktarımda yalnız ${site.eserler.length} eser var; site üretilmedi.`);

  const { posts, issues, users, yonlendir } = toWordPress(site);
  fs.mkdirSync(OUT, { recursive: true });
  writeJson(path.join(OUT, 'all-posts.json'), posts);
  writeJson(path.join(OUT, 'categories.json'), []);
  writeJson(path.join(OUT, 'users.json'), users);
  writeJson(path.join(OUT, 'issues.json'), issues);
  writeJson(path.join(OUT, 'yonlendirmeler.json'), yonlendir);
  console.log(`uygulama: ${site.eserler.length} eser (${posts.length} sayılı), ${issues.length} sayı, ${site.kayitlar.length} kayıt, ${site.videolar.length} video, ${site.hatira.length} not`);
  if (args.includes('--yalniz-indir')) return;

  process.env.HELEZON_RAW = OUT;
  require('./build.js');
  /* build.js sayfaları yazdı; radyo ve hatıra listeleri yalnız sitede var olan yazılara bağlanır. */
  const live = new Set(readJson(path.join(ROOT, 'data/pieces.json'), []).map((p) => p.u));
  writeJson('assets/audio/radio.json', radioList(site, live));
  writeJson('assets/audio/youtube.json', youtubeList(site));
  writeJson('data/hatira.json', hatiraList(site));
  /* Eski yazar adresi kırılmasın: yönlendirme sayfası. */
  for (const { eski, yeni } of yonlendir) {
    const dosya = path.join(ROOT, eski, 'index.html');
    if (fs.existsSync(dosya)) continue;
    fs.mkdirSync(path.dirname(dosya), { recursive: true });
    fs.writeFileSync(dosya, `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><title>Helezon Dergisi</title><link rel="canonical" href="${SITE}${yeni}"><meta http-equiv="refresh" content="0; url=${yeni}"></head><body><p><a href="${yeni}">Helezon Dergisi</a></p></body></html>
`);
  }
  if (yonlendir.length) console.log('yönlendirme', yonlendir.map((y) => `${y.eski} → ${y.yeni}`).join(', '));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
