#!/usr/bin/env node
// PR doğrulaması (statik site): JSON dosyaları bozuk mu, sayfalardaki yerel
// bağlantılar (href/src) var olan bir dosyaya mı gidiyor?
//
//   node _build/dogrula.js
//
// Dış adresler (http, mailto, tel, data:) denetlenmez. Hata varsa 1 ile çıkar.
const fs = require('fs');
const path = require('path');

const KOK = path.resolve(__dirname, '..');
const ATLA = new Set(['.git', 'node_modules', '_build', '.vercel']);

function dosyalar(dizin, out = []) {
  for (const ad of fs.readdirSync(dizin, { withFileTypes: true })) {
    if (ATLA.has(ad.name)) continue;
    const yol = path.join(dizin, ad.name);
    if (ad.isDirectory()) dosyalar(yol, out);
    else out.push(yol);
  }
  return out;
}

const hepsi = dosyalar(KOK);
const hatalar = [];
const goreli = (p) => path.relative(KOK, p).split(path.sep).join('/');

// 1. JSON
let jsonSayisi = 0;
for (const f of hepsi.filter((f) => f.endsWith('.json'))) {
  jsonSayisi++;
  try {
    JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch (e) {
    hatalar.push(`${goreli(f)}: JSON bozuk (${e.message})`);
  }
}

// 2. Yerel bağlantılar
function varMi(hedef) {
  if (fs.existsSync(hedef)) {
    return fs.statSync(hedef).isFile() || fs.existsSync(path.join(hedef, 'index.html'));
  }
  return fs.existsSync(hedef + '.html');
}

const ATTR = /\s(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
let sayfaSayisi = 0;
let baglantiSayisi = 0;
for (const f of hepsi.filter((f) => f.endsWith('.html'))) {
  sayfaSayisi++;
  const html = fs.readFileSync(f, 'utf8')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const eksik = new Set();
  for (const m of html.matchAll(ATTR)) {
    let url = (m[1] ?? m[2]).trim();
    if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url) || url.includes('${')) continue;
    url = url.split(/[?#]/)[0];
    if (!url) continue;
    baglantiSayisi++;
    let cozulmus;
    try {
      cozulmus = decodeURIComponent(url);
    } catch {
      cozulmus = url;
    }
    const hedef = cozulmus.startsWith('/')
      ? path.join(KOK, cozulmus)
      : path.join(path.dirname(f), cozulmus);
    if (!varMi(hedef)) eksik.add(url);
  }
  for (const url of eksik) hatalar.push(`${goreli(f)}: bulunamayan bağlantı → ${url}`);
}

console.log(`${jsonSayisi} JSON, ${sayfaSayisi} sayfa, ${baglantiSayisi} yerel bağlantı denetlendi.`);
if (hatalar.length) {
  const goster = hatalar.slice(0, 200);
  console.error(`\n${hatalar.length} hata:\n` + goster.join('\n'));
  if (hatalar.length > goster.length) console.error(`... ve ${hatalar.length - goster.length} hata daha`);
  process.exit(1);
}
console.log('Sorun yok.');
