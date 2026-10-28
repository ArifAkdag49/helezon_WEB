# Helezon Dergisi — web sitesi

Tamamen statik site: `index.html` (7 dilli ana sayfa) ve WordPress arşivinden
`_build/build.js` ile üretilen yazı/yazar/tür/sayı sayfaları. Üretilen klasörler elle
düzenlenmez. Ayrıntılar README.md'de. Canlı adres https://helezon.vercel.app (Vercel).

## Ekip çalışma düzeni

Projede birden çok kişi çalışıyor. Kod `main`'e yalnız PR ile girer; doğrulama yeşilse PR'ı
Claude kendisi birleştirir.

### Kullanıcı ne derse ne yap

| Kullanıcı | Sen |
|---|---|
| "Yeni iş: X" / bir iş tarif ediyor | `git fetch` → `origin/main`'den `<isim>/<kisa-is-adi>` dalı aç (isim: `git config user.name`'in ilk kelimesi, küçük harf, Türkçe karaktersiz). Sonra işe başla. |
| "Bitti" / "PR aç" / "canlıya al" | `node _build/dogrula.js` çalıştır, dalı push et, `gh pr create` ile PR aç (başlık ve açıklama Türkçe: ne değişti, nasıl denendi). Sonra PR'ı KENDİN birleştir, kullanıcı onayı bekleme (ekip kararı, 2026-10-17): "Doğrulama" çalışmasını bekle (`gh run list -w Doğrulama -b <dal> -L 1` → `gh run watch <id> --exit-status`; Vercel gibi başka kontrolleri yok say), yeşilse `gh pr merge --merge --delete-branch`. Ardından "Canlıya çıkar" çalışmasını izle (`gh run watch`) ve canlı adresin açıldığını kontrol et; sonucu kullanıcıya kısaca bildir. Doğrulama kırmızıysa BİRLEŞTİRME: hatayı düzelt, tekrar dene. `gh` yoksa PR linkini ver; birleştirmeyi kullanıcı yapar. |
| "X'in işinden devam et" | `git fetch` → ilgili dalı bul (`git branch -r`), o dala geç, son commit'leri özetle, devam et. |
| "Güncel hali çek" | Kendi dalındaysan `git pull --rebase` ve `git rebase origin/main` (çakışma varsa çöz, özetle). `main`'deysen `git pull`. |
| "Deploy et" | Bilgisayardan doğrudan deploy YOK: "Bitti" satırını uygula. Birleşince GitHub Actions canlıya çıkarır (aşağıdaki "Deploy" bölümü). |

### Kurallar

- Doğrulama kırmızıyken PR asla birleştirilmez. Birleştirdiğin her şey birkaç dakika içinde
  canlıda olur; birleştirmeden önce PR'ın gerçekten bitmiş iş olduğundan emin ol.
- `main` üzerinde dosya düzenleme. Kullanıcı `main`'deyken iş isterse önce dal aç.
- Her cevabın sonunda `.claude/hooks/oto-push.sh` değişiklikleri kendiliğinden
  commit edip kişinin dalına push eder.
- Oto-push "push reddedildi" derse: `git pull --rebase origin <dal>`, çakışmayı
  çöz, kullanıcıya ne birleştiğini özetle.
- Gizli bilgi (`.env`, anahtar, token) ve `_build/raw/` (WordPress dışa aktarımı) asla commit edilmez.
- Başkasının dalına onun haberi olmadan force-push yapma.

### Deploy

PR'ın main'e birleşmesi deploy'dur (.github/workflows/deploy.yml, "Canlıya çıkar"):
doğrulama → `vercel deploy --prod` → https://helezon.vercel.app 200 kontrolü.

- Deploy adımı ancak repo değişkeni `DEPLOY_ACIK=true` iken çalışır. Gerekenler:
  `VERCEL_TOKEN` (secret), `VERCEL_ORG_ID` ve `VERCEL_PROJECT_ID` (variable).
- `DEPLOY_ACIK` açılana kadar birleşmeden sonra yayın elle yapılır:
  güncel `main`'de `npx vercel deploy --prod --yes`. Bunu yapmadan önce kullanıcıya sor.
- Geri almak: Vercel panelinde önceki deploy'u "Promote to Production" (ya da
  `npx vercel rollback`) — önce kullanıcıya sor.
