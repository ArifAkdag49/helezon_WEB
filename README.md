# Helezon Dergisi — web sitesi

Helezon edebiyat, kültür ve sanat dergisinin yeni sitesi. Canlı: https://helezon.vercel.app

Tamamen statik bir sitedir: tek bir `index.html` (7 dilli ana sayfa) ve Helezon
uygulamasından (https://helezon.arxdigitalsevice.com, tek kaynak) üretilen yazı, yazar, tür ve
sayı sayfaları. Uygulama `/api/disa/site` adresinden herkese açık bir dışa aktarım verir.

## Klasörler

| Yol | Ne var |
|---|---|
| `index.html` | Ana sayfa: video hero, bölümler şeridi, çark, takvim yaprağı, radyo, son sayı, yazarlar, arşiv, bülten |
| `assets/site.css`, `assets/site.js` | Arşiv sayfalarının ortak stil ve davranışı (7 dilli arayüz, arama) |
| `assets/extras.css`, `assets/extras.js` | Nostaljik eklentiler: gaz lambası, ayraç, çay bardağı, daktilo, atmosfer, kaset, lügat, alıntı kartı, mektup, takvim yaprağı, radyo, fiş kataloğu, sahaf rafı, zaman helezonu, tefrika, hatıra defteri |
| `assets/audio/` | Radyo kayıtları (edge-tts ile seslendirilmiş) ve `radio.json`, `youtube.json` |
| `yazi/`, `yazar/`, `tur/`, `sayi/`, `arsiv/`, `yazilar/`, `yazarlar/`, `tefrika/`, `hatira-defteri/`, `ayraclar/` | Üretilen sayfalar (elle düzenleme; `_build/build.js` yeniden yazar) |
| `data/` | `pieces.json` (arama ve radyo için yazı dizini), `issues.json`, `hatira.json` (onaylı hatıra defteri notları) |
| `_build/` | Derleme betikleri. `kaynak-uygulama.js` uygulama dışa aktarımını indirip `build.js`'i çalıştırır; `arsiv-eslemesi.json` ve `arsiv-govde.json` WordPress dönemindeki adresleri ve işaretlemeyi korur. `_build/raw/`, `_build/raw-uygulama/` git dışında |

## İçerik nasıl güncellenir

Kendiliğinden: GitHub Actions "İçeriği güncelle" (`.github/workflows/icerik-guncelle.yml`)
saatte bir, elle (Run workflow) ve uygulama bir sayı yayımlayınca / medya onaylanınca
(`repository_dispatch`, `icerik-guncellendi`) çalışır: uygulamadan üretir, değişiklik varsa
"İçerik güncellendi (uygulamadan)" commit'ini main'e atar ve `DEPLOY_ACIK=true` ise Vercel'e yayınlar.

Elle (bilgisayarda):

```bash
node _build/kaynak-uygulama.js        # HELEZON_API ile başka bir uygulama adresi verilebilir
node _build/dogrula.js
```

Eski yol (WordPress dışa aktarımı `_build/raw/` ile `node _build/build.js`) hâlâ çalışır ama
kaynak artık uygulama; yazı, sayı, ses kaydı ve hatıra notları uygulamanın panelinden yönetilir.

Ana sayfadaki "Son Sayı" kartları (`ARTICLES`) ve kapak listesi (`COVERS`) `index.html` içinde elle tutulur.

## Radyo kayıtları

Kayıtlar `edge-tts` (Microsoft nöral Türkçe sesler Emel ve Ahmet) ile üretilir:
`_build/tts-stdout.py` metni stdin'den alır, MP3'ü stdout'a yazar. İş listeleri
`_build/jobs.ndjson` (şiirler) ve `_build/jobs-prose.ndjson` (diğer türler), manifest `assets/audio/radio.json`.

## Hatıra defteri

Form gönderileri `helezoniletisim@gmail.com` adresine e-posta olarak gider. `data/hatira.json`
uygulamadaki onaylı hatıra defteri notlarından üretilir (elle eklenen not bir sonraki üretimde silinir;
notu uygulamanın hatıra defterine ekleyip panelden onaylayın).
