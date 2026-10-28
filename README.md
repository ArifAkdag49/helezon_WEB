# Helezon Dergisi — web sitesi

Helezon edebiyat, kültür ve sanat dergisinin yeni sitesi. Canlı: https://helezon.vercel.app

Tamamen statik bir sitedir: tek bir `index.html` (7 dilli ana sayfa) ve
helezondergisi.com'daki WordPress arşivinden üretilen yazı, yazar, tür ve sayı sayfaları.

## Klasörler

| Yol | Ne var |
|---|---|
| `index.html` | Ana sayfa: video hero, bölümler şeridi, çark, takvim yaprağı, radyo, son sayı, yazarlar, arşiv, bülten |
| `assets/site.css`, `assets/site.js` | Arşiv sayfalarının ortak stil ve davranışı (7 dilli arayüz, arama) |
| `assets/extras.css`, `assets/extras.js` | Nostaljik eklentiler: gaz lambası, ayraç, çay bardağı, daktilo, atmosfer, kaset, lügat, alıntı kartı, mektup, takvim yaprağı, radyo, fiş kataloğu, sahaf rafı, zaman helezonu, tefrika, hatıra defteri |
| `assets/audio/` | Radyo kayıtları (edge-tts ile seslendirilmiş) ve `radio.json`, `youtube.json` |
| `yazi/`, `yazar/`, `tur/`, `sayi/`, `arsiv/`, `yazilar/`, `yazarlar/`, `tefrika/`, `hatira-defteri/`, `ayraclar/` | Üretilen sayfalar (elle düzenleme; `_build/build.js` yeniden yazar) |
| `data/` | `pieces.json` (arama ve radyo için yazı dizini), `issues.json`, `hatira.json` (onaylı hatıra defteri notları) |
| `_build/` | Derleme ve yama betikleri. `_build/raw/` (WordPress dışa aktarımı) git dışında |

## Yeni sayı çıkınca

```bash
# 1. WordPress API'sinden ham veriyi indir (helezon/ klasöründe)
mkdir -p _build/raw && cd _build/raw
for p in 1 2 3 4 5 6 7 8; do curl -s "https://helezondergisi.com/wp-json/wp/v2/posts?per_page=100&page=$p&_embed=wp:featuredmedia,wp:term" -o posts-$p.json; done
curl -s "https://helezondergisi.com/wp-json/wp/v2/categories?per_page=100" -o categories.json
curl -s "https://helezondergisi.com/wp-json/wp/v2/users?per_page=100" -o users.json
node -e "const fs=require('fs');let a=[];for(let p=1;p<=8;p++){try{a=a.concat(JSON.parse(fs.readFileSync('posts-'+p+'.json')))}catch(e){}}fs.writeFileSync('all-posts.json',JSON.stringify(a))"
cd ../..

# 2. Sayfaları üret
node _build/build.js

# 3. Yayınla
npx vercel deploy --prod --yes
```

Ana sayfadaki "Son Sayı" kartları (`ARTICLES`) ve kapak listesi (`COVERS`) `index.html` içinde elle tutulur.

## Radyo kayıtları

Kayıtlar `edge-tts` (Microsoft nöral Türkçe sesler Emel ve Ahmet) ile üretilir:
`_build/tts-stdout.py` metni stdin'den alır, MP3'ü stdout'a yazar. İş listeleri
`_build/jobs.ndjson` (şiirler) ve `_build/jobs-prose.ndjson` (diğer türler), manifest `assets/audio/radio.json`.

## Hatıra defteri

Form gönderileri `helezoniletisim@gmail.com` adresine e-posta olarak gider. Onaylanan
notlar `data/hatira.json` dosyasına `{"n":"ad","c":"şehir","m":"not","d":"tarih"}` biçiminde eklenir.
