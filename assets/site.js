/* Helezon archive pages: chrome i18n, nav, share, search, progress */
(function(){
const I18N = {
 tr:{nav:{home:"Ana Sayfa",latest:"Son Sayı",pieces:"Yazılar",authors:"Yazarlar",archive:"Arşiv",about:"Hakkında",tefrika:"Tefrika",guestbook:"Hatıra Defteri",bookmarks:"Ayraçlarım"},l:{issue:"Sayı",issues:"sayı",pieces:"yazı",authors:"yazar",author:"Yazar",genre:"Tür",share:"Paylaş",copy:"Bağlantıyı kopyala",copied:"Kopyalandı",original:"helezondergisi.com'da görüntüle",prev:"Önceki",next:"Sonraki",moreBy:"Yazarın diğer yazıları",sameIssue:"Aynı sayıdan",editorial:"Editörden",interview:"Röportaj",foreign:"Çeviri",allPieces:"Tüm yazılar",allAuthors:"Sözcüklerin ardındaki sesler",searchPh:"Başlık, yazar veya kelime ara…",allGenres:"Tüm türler",allYears:"Tüm yıllar",more:"Daha fazla göster",results:"yazı bulundu"},cat:{translation:"Çeviri"},archive:{title:"Helezon Arşivi"},roles:{chief:"Yayın Yönetmeni",editor:"Editör",managing:"Yazı İşleri"},footer:{brand:"Helezon Dergisi",tag:"Edebiyatın, sanatın ve düşüncenin izinde.",follow:"Takip et",explore:"Keşfet",masthead:"Künye",contact:"İletişim",rights:"Tüm hakları saklıdır."}},
 en:{nav:{home:"Home",latest:"Latest Issue",pieces:"Pieces",authors:"Authors",archive:"Archive",about:"About",tefrika:"Serial",guestbook:"Guestbook",bookmarks:"My bookmarks"},l:{issue:"Issue",issues:"issues",pieces:"pieces",authors:"authors",author:"Author",genre:"Genre",share:"Share",copy:"Copy link",copied:"Copied",original:"View on helezondergisi.com",prev:"Previous",next:"Next",moreBy:"More by the author",sameIssue:"From the same issue",editorial:"Editorial",interview:"Interview",foreign:"Translation",allPieces:"All pieces",allAuthors:"Voices behind the words",searchPh:"Search title, author or word…",allGenres:"All genres",allYears:"All years",more:"Show more",results:"pieces found"},cat:{translation:"Translation"},archive:{title:"The Helezon Archive"},roles:{chief:"Editor-in-Chief",editor:"Editor",managing:"Managing Editor"},footer:{brand:"Helezon Magazine",tag:"Following the paths of literature, art and ideas.",follow:"Follow",explore:"Explore",masthead:"Masthead",contact:"Contact",rights:"All rights reserved."}},
 de:{nav:{home:"Start",latest:"Aktuelle Ausgabe",pieces:"Texte",authors:"Autor:innen",archive:"Archiv",about:"Über uns",tefrika:"Fortsetzungsroman",guestbook:"Gästebuch",bookmarks:"Meine Lesezeichen"},l:{issue:"Ausgabe",issues:"Ausgaben",pieces:"Texte",authors:"Autor:innen",author:"Autor:in",genre:"Gattung",share:"Teilen",copy:"Link kopieren",copied:"Kopiert",original:"Auf helezondergisi.com ansehen",prev:"Zurück",next:"Weiter",moreBy:"Weitere Texte der Autor:in",sameIssue:"Aus derselben Ausgabe",editorial:"Editorial",interview:"Interview",foreign:"Übersetzung",allPieces:"Alle Texte",allAuthors:"Stimmen hinter den Worten",searchPh:"Titel, Autor:in oder Wort suchen…",allGenres:"Alle Gattungen",allYears:"Alle Jahre",more:"Mehr anzeigen",results:"Texte gefunden"},cat:{translation:"Übersetzung"},archive:{title:"Das Helezon-Archiv"},roles:{chief:"Chefredaktion",editor:"Redaktion",managing:"Textredaktion"},footer:{brand:"Helezon Magazin",tag:"Auf den Wegen der Literatur, der Kunst und der Ideen.",follow:"Folgen",explore:"Entdecken",masthead:"Impressum",contact:"Kontakt",rights:"Alle Rechte vorbehalten."}},
 fr:{nav:{home:"Accueil",latest:"Dernier numéro",pieces:"Textes",authors:"Auteurs",archive:"Archives",about:"À propos",tefrika:"Feuilleton",guestbook:"Livre d’or",bookmarks:"Mes marque-pages"},l:{issue:"Numéro",issues:"numéros",pieces:"textes",authors:"auteurs",author:"Auteur·e",genre:"Genre",share:"Partager",copy:"Copier le lien",copied:"Copié",original:"Voir sur helezondergisi.com",prev:"Précédent",next:"Suivant",moreBy:"Autres textes de l’auteur·e",sameIssue:"Dans le même numéro",editorial:"Éditorial",interview:"Entretien",foreign:"Traduction",allPieces:"Tous les textes",allAuthors:"Les voix derrière les mots",searchPh:"Rechercher un titre, un auteur ou un mot…",allGenres:"Tous les genres",allYears:"Toutes les années",more:"Afficher plus",results:"textes trouvés"},cat:{translation:"Traduction"},archive:{title:"Les archives Helezon"},roles:{chief:"Direction de la publication",editor:"Rédaction en chef",managing:"Secrétariat de rédaction"},footer:{brand:"Helezon Magazine",tag:"Sur les chemins de la littérature, de l’art et des idées.",follow:"Suivre",explore:"Explorer",masthead:"Ours",contact:"Contact",rights:"Tous droits réservés."}},
 ar:{nav:{home:"الرئيسية",latest:"العدد الأخير",pieces:"النصوص",authors:"الكتّاب",archive:"الأرشيف",about:"عن المجلة",tefrika:"مسلسل أدبي",guestbook:"دفتر الذكريات",bookmarks:"علاماتي"},l:{issue:"العدد",issues:"عددًا",pieces:"نصًا",authors:"كاتبًا",author:"الكاتب/ة",genre:"النوع",share:"مشاركة",copy:"نسخ الرابط",copied:"تم النسخ",original:"عرض على helezondergisi.com",prev:"السابق",next:"التالي",moreBy:"نصوص أخرى للكاتب/ة",sameIssue:"من العدد نفسه",editorial:"كلمة التحرير",interview:"حوار",foreign:"ترجمة",allPieces:"كل النصوص",allAuthors:"الأصوات خلف الكلمات",searchPh:"ابحث عن عنوان أو كاتب أو كلمة…",allGenres:"كل الأنواع",allYears:"كل السنوات",more:"عرض المزيد",results:"نصًا"},cat:{translation:"ترجمة"},archive:{title:"أرشيف هليزون"},roles:{chief:"إدارة التحرير",editor:"التحرير",managing:"سكرتارية التحرير"},footer:{brand:"مجلة هليزون",tag:"على دروب الأدب والفن والأفكار.",follow:"تابعنا",explore:"استكشف",masthead:"هيئة التحرير",contact:"تواصل",rights:"جميع الحقوق محفوظة."}},
 es:{nav:{home:"Inicio",latest:"Último número",pieces:"Textos",authors:"Autores",archive:"Archivo",about:"Acerca de",tefrika:"Folletín",guestbook:"Libro de visitas",bookmarks:"Mis marcapáginas"},l:{issue:"Número",issues:"números",pieces:"textos",authors:"autores",author:"Autor/a",genre:"Género",share:"Compartir",copy:"Copiar enlace",copied:"Copiado",original:"Ver en helezondergisi.com",prev:"Anterior",next:"Siguiente",moreBy:"Más textos del autor/a",sameIssue:"Del mismo número",editorial:"Editorial",interview:"Entrevista",foreign:"Traducción",allPieces:"Todos los textos",allAuthors:"Voces detrás de las palabras",searchPh:"Buscar título, autor o palabra…",allGenres:"Todos los géneros",allYears:"Todos los años",more:"Mostrar más",results:"textos encontrados"},cat:{translation:"Traducción"},archive:{title:"El archivo de Helezon"},roles:{chief:"Dirección editorial",editor:"Edición",managing:"Redacción"},footer:{brand:"Revista Helezon",tag:"Siguiendo los caminos de la literatura, el arte y las ideas.",follow:"Seguir",explore:"Explorar",masthead:"Equipo",contact:"Contacto",rights:"Todos los derechos reservados."}},
 ru:{nav:{home:"Главная",latest:"Последний номер",pieces:"Тексты",authors:"Авторы",archive:"Архив",about:"О журнале",tefrika:"Роман с продолжением",guestbook:"Книга отзывов",bookmarks:"Мои закладки"},l:{issue:"Номер",issues:"номеров",pieces:"текстов",authors:"авторов",author:"Автор",genre:"Жанр",share:"Поделиться",copy:"Скопировать ссылку",copied:"Скопировано",original:"Открыть на helezondergisi.com",prev:"Предыдущий",next:"Следующий",moreBy:"Другие тексты автора",sameIssue:"Из того же номера",editorial:"От редакции",interview:"Интервью",foreign:"Перевод",allPieces:"Все тексты",allAuthors:"Голоса за словами",searchPh:"Поиск по названию, автору или слову…",allGenres:"Все жанры",allYears:"Все годы",more:"Показать ещё",results:"текстов найдено"},cat:{translation:"Перевод"},archive:{title:"Архив Helezon"},roles:{chief:"Главный редактор",editor:"Редактор",managing:"Ответственный секретарь"},footer:{brand:"Журнал Helezon",tag:"По дорогам литературы, искусства и идей.",follow:"Подписаться",explore:"Разделы",masthead:"Редакция",contact:"Контакты",rights:"Все права защищены."}}
};
const get = (o, p) => p.split('.').reduce((x, k) => (x && x[k] !== undefined) ? x[k] : undefined, o);
let current = 'tr';
function detect(){ try{ const s = localStorage.getItem('helezon-lang'); if (s && I18N[s]) return s; }catch(e){} const nav = (navigator.languages || [navigator.language || 'tr']).map(l => l.slice(0,2).toLowerCase()); return nav.find(l => I18N[l]) || 'tr'; }
function apply(lang){
  if (!I18N[lang]) lang = 'tr'; current = lang; const d = I18N[lang];
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => { const v = get(d, el.dataset.i18n); if (typeof v === 'string') el.textContent = v; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { const v = get(d, el.dataset.i18nPh); if (v) el.placeholder = v; });
  const code = document.getElementById('langCode'); if (code) code.textContent = lang.toUpperCase();
  document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  try{ localStorage.setItem('helezon-lang', lang); }catch(e){}
  if (window.__renderSearch) window.__renderSearch();
}
apply(detect());
window.HZ = { t: k => get(I18N[current], k) || '', lang: () => current };

/* language dropdown + menu */
const langBox = document.getElementById('lang'), langBtn = document.getElementById('langBtn'), burger = document.getElementById('burger');
if (langBtn){ langBtn.addEventListener('click', e => { e.stopPropagation(); const open = langBox.classList.toggle('open'); langBtn.setAttribute('aria-expanded', open); }); document.addEventListener('click', () => langBox.classList.remove('open')); }
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); apply(b.dataset.lang); if (langBox) langBox.classList.remove('open'); closeMenu(); }));
function closeMenu(){ document.body.classList.remove('menu-open'); if (burger) burger.setAttribute('aria-expanded', 'false'); }
if (burger) burger.addEventListener('click', () => { const open = document.body.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', open); });

/* copy link */
document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
  try{ await navigator.clipboard.writeText(b.dataset.copy); }catch(e){ const i = document.createElement('input'); i.value = b.dataset.copy; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove(); }
  const span = b.querySelector('span'); const old = span.textContent; span.textContent = window.HZ.t('l.copied'); b.classList.add('copied'); setTimeout(() => { span.textContent = old; b.classList.remove('copied'); }, 1800);
}));

/* progress spiral */
const prog = document.getElementById('progPath');
if (prog){
  let d = ''; const steps = 400, turns = 4.5, maxR = 26; for (let i = 0; i <= steps; i++){ const t = (i / steps) * turns * Math.PI * 2, r = (i / steps) * maxR; d += (i ? ' L' : 'M') + (30 + r * Math.cos(t)).toFixed(2) + ' ' + (30 + r * Math.sin(t)).toFixed(2); }
  prog.setAttribute('d', d); const len = prog.getTotalLength(); prog.style.strokeDasharray = len; prog.style.strokeDashoffset = len;
  const box = document.getElementById('progress');
  const upd = () => { const h = document.documentElement.scrollHeight - innerHeight; const p = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0; prog.style.strokeDashoffset = len * (1 - p); box.classList.toggle('show', scrollY > 300); };
  addEventListener('scroll', upd, { passive: true }); upd();
}

/* search page */
const results = document.getElementById('results');
if (results){
  const q = document.getElementById('q'), fg = document.getElementById('fGenre'), fy = document.getElementById('fYear'), more = document.getElementById('more'), count = document.getElementById('count');
  const MONTHS = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  let all = [], shown = 0, filtered = []; const PAGE = 60;
  const fold = s => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g,'i').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ç/g,'c').replace(/ö/g,'o').replace(/ü/g,'u');
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const params = new URLSearchParams(location.search);
  function row(a){ const m = +a.d.slice(5,7), y = a.d.slice(0,4); return `<li><a href="${a.u}"><span class="tag">${esc(a.gn)}${a.tr && a.g !== 'ceviri' ? ' · ' + esc(window.HZ.t('cat.translation')) : ''}</span><span class="t">${esc(a.t)}</span><span class="by">${esc(a.a)}</span><span class="no">${esc(window.HZ.t('l.issue'))} ${a.n} · ${MONTHS[m-1]} ${y}</span><i class="arr"></i></a></li>`; }
  function filter(){
    const terms = fold(q.value.trim()).split(/\s+/).filter(Boolean), g = fg.value, y = fy.value;
    filtered = all.filter(a => (!g || a.g === g || (g === 'ceviri' && a.tr)) && (!y || a.d.startsWith(y)) && terms.every(t => a._f.includes(t)));
    shown = 0; results.innerHTML = ''; page();
    count.textContent = filtered.length + ' ' + window.HZ.t('l.results');
    const p = new URLSearchParams(); if (q.value.trim()) p.set('q', q.value.trim()); if (g) p.set('tur', g); if (y) p.set('yil', y); history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
  }
  function page(){ const slice = filtered.slice(shown, shown + PAGE); results.insertAdjacentHTML('beforeend', slice.map(row).join('')); shown += slice.length; more.hidden = shown >= filtered.length; }
  window.__renderSearch = () => { if (all.length) filter(); };
  fetch('/data/pieces.json').then(r => r.json()).then(data => {
    all = data.map(a => Object.assign(a, { _f: fold(a.t + ' ' + a.a + ' ' + a.gn + ' ' + (a.s || '')) }));
    if (params.get('q')) q.value = params.get('q'); if (params.get('tur')) fg.value = params.get('tur'); if (params.get('yil')) fy.value = params.get('yil');
    filter();
  });
  let t; q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(filter, 160); });
  fg.addEventListener('change', filter); fy.addEventListener('change', filter);
  more.addEventListener('click', page);
}
})();
