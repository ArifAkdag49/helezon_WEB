/* Helezon nostalgic extras: lamp mode, bookmarks, tea time, typewriter, page flip, atmosphere, cassette, lügat, quote cards, letters,
   calendar leaf, last-years box, radio, card catalogue, shelf, spiral timeline, tefrika, guestbook */
(function(){
'use strict';
var X = {
 tr:{lamp:'Gaz lambası',bookmark:'Ayraç koy',bookmarked:'Ayraç kondu',bookmarks:'Ayraçlarım',noMarks:'Henüz ayraç yok. Bir yazıdaki kurdeleye dokun.',tea1:'Bir bardak çay sürer',teaN:'{n} bardak çay sürer',min:'dk',atmosphere:'Atmosfer',off:'Kapalı',rain:'Yağmur',sea:'Deniz',stove:'Soba',typeroom:'Daktilo odası',keys:'Tuş sesi',listen:'Dinle',pause:'Duraklat',rewind:'Geri',forward:'İleri',voiceNote:'Cihazın Türkçe sesiyle okunur',noVoice:'Bu cihazda Türkçe ses yok',reading:'Okunuyor',lugat:'Lügat',lugatHint:'Lügat açık: bir kelimeye dokun',notFound:'TDK sözlüğünde bulunamadı',source:'Kaynak: TDK Güncel Türkçe Sözlük',card:'Kart yap',download:'İndir',share:'Paylaş',close:'Kapat',letter:'Mektup yaz',to:'Kime',yourName:'Adınız',letterPh:'Mektubunuz…',send:'Gönder',sealed:'Zarf kapandı, mektup posta kutusuna gidiyor',leafTitle:'Günün yaprağı',leafLead:'Her sabah bir yaprak: tarih, bir dize, bir söz. Koparınca dünkü çıkar.',verseOfDay:'Günün dizesi',wordOfDay:'Günün sözü',tear:'Yaprağı kopar',today:'Bugün',lastYears:'Geçen yıllarda bu ay',radio:'Helezon Radyo',radioLead:'Kadranı çevir, bir türe ayarla. Parazit dinince o türden bir yazı okunmaya başlar.',tune:'Kadran',onAir:'Yayında',static:'…parazit…',power:'AÇ',issue:'Sayı',read:'Oku',more:'Daha fazla',catalogue:'Fiş kataloğu',catLead:'Çekmeceyi çek, fişleri karıştır.',shelf:'Sahaf rafı',shelfLead:'Sırtından çek, kapağı çevir.',spiral:'Zaman helezonu',spiralLead:'Merkezden dışarı: ilk sayıdan bugüne.',tefrika:'Tefrika',part:'Bölüm',tomorrow:'Devamı yarın',newSerial:'Yarın yeni tefrika başlıyor',locked:'Henüz yayımlanmadı',guestbook:'Hatıra Defteri',gbLead:'Bir satır bırak; editör onayından sonra deftere işlenir.',gbEmpty:'Defter henüz boş. İlk satırı sen yaz.',city:'Şehir',pending:'onay bekliyor',program:"Ne dinlemek istersin?",recordings:"Kayıtlar",ytReadings:"YouTube’dan okumalar",readBy:"Seslendiren:",mood_huzun:"Hüzünlü",mood_sakin:"Sakin",mood_coskun:"Coşkulu",moodNote:"Kadran türü seçer, liste kaydı. Hüzünlü metinler daha yavaş okundu.",closeVideo:"Radyoya dön",playing:"Şu an çalıyor"},
 en:{lamp:'Oil lamp',bookmark:'Add bookmark',bookmarked:'Bookmarked',bookmarks:'My bookmarks',noMarks:'No bookmarks yet. Tap the ribbon on any piece.',tea1:'One glass of tea',teaN:'{n} glasses of tea',min:'min',atmosphere:'Atmosphere',off:'Off',rain:'Rain',sea:'Sea',stove:'Stove',typeroom:'Typewriter room',keys:'Key sounds',listen:'Listen',pause:'Pause',rewind:'Back',forward:'Next',voiceNote:'Read by your device’s Turkish voice',noVoice:'No Turkish voice on this device',reading:'Reading',lugat:'Dictionary',lugatHint:'Dictionary on: tap a word',notFound:'Not found in the TDK dictionary',source:'Source: TDK Turkish Dictionary',card:'Make a card',download:'Download',share:'Share',close:'Close',letter:'Write a letter',to:'To',yourName:'Your name',letterPh:'Your letter…',send:'Send',sealed:'Envelope sealed, off to the post box',leafTitle:'Leaf of the day',leafLead:'A leaf every morning: the date, a verse, a line. Tear it to see yesterday.',verseOfDay:'Verse of the day',wordOfDay:'Line of the day',tear:'Tear the leaf',today:'Today',lastYears:'This month in past years',radio:'Helezon Radio',radioLead:'Turn the dial to a genre. When the static clears, a piece begins.',tune:'Dial',onAir:'On air',static:'…static…',power:'ON',issue:'Issue',read:'Read',more:'More',catalogue:'Card catalogue',catLead:'Pull a drawer, shuffle the cards.',shelf:'Bookseller’s shelf',shelfLead:'Pull a spine, turn the cover.',spiral:'Time helix',spiralLead:'From the centre outward: first issue to today.',tefrika:'Serial',part:'Part',tomorrow:'Continued tomorrow',newSerial:'A new serial starts tomorrow',locked:'Not yet published',guestbook:'Guestbook',gbLead:'Leave a line; it appears after the editors approve it.',gbEmpty:'The book is still empty. Write the first line.',city:'City',pending:'awaiting approval',program:"What would you like to hear?",recordings:"Recordings",ytReadings:"Readings from YouTube",readBy:"Read by",mood_huzun:"Melancholic",mood_sakin:"Calm",mood_coskun:"Spirited",moodNote:"The dial picks a genre, the list a recording. Melancholic texts are read more slowly.",closeVideo:"Back to the radio",playing:"Now playing"},
 de:{lamp:'Öllampe',bookmark:'Lesezeichen setzen',bookmarked:'Gesetzt',bookmarks:'Meine Lesezeichen',noMarks:'Noch keine Lesezeichen. Tippe auf das Band eines Textes.',tea1:'Ein Glas Tee',teaN:'{n} Gläser Tee',min:'Min.',atmosphere:'Atmosphäre',off:'Aus',rain:'Regen',sea:'Meer',stove:'Ofen',typeroom:'Schreibmaschinenzimmer',keys:'Tastenklang',listen:'Anhören',pause:'Pause',rewind:'Zurück',forward:'Weiter',voiceNote:'Türkische Stimme deines Geräts',noVoice:'Keine türkische Stimme auf diesem Gerät',reading:'Liest',lugat:'Wörterbuch',lugatHint:'Wörterbuch an: tippe auf ein Wort',notFound:'Im TDK-Wörterbuch nicht gefunden',source:'Quelle: TDK Türkisches Wörterbuch',card:'Karte erstellen',download:'Herunterladen',share:'Teilen',close:'Schließen',letter:'Brief schreiben',to:'An',yourName:'Dein Name',letterPh:'Dein Brief…',send:'Senden',sealed:'Umschlag zu, ab in den Briefkasten',leafTitle:'Blatt des Tages',leafLead:'Jeden Morgen ein Blatt: Datum, ein Vers, ein Satz. Abreißen zeigt gestern.',verseOfDay:'Vers des Tages',wordOfDay:'Satz des Tages',tear:'Blatt abreißen',today:'Heute',lastYears:'Dieser Monat in früheren Jahren',radio:'Helezon Radio',radioLead:'Dreh den Regler auf eine Gattung. Wenn das Rauschen weicht, beginnt ein Text.',tune:'Skala',onAir:'On Air',static:'…Rauschen…',power:'EIN',issue:'Ausgabe',read:'Lesen',more:'Mehr',catalogue:'Zettelkatalog',catLead:'Schublade ziehen, Karten mischen.',shelf:'Antiquariatsregal',shelfLead:'Am Rücken ziehen, Cover wenden.',spiral:'Zeitspirale',spiralLead:'Von innen nach außen: erste Ausgabe bis heute.',tefrika:'Fortsetzungsroman',part:'Teil',tomorrow:'Fortsetzung morgen',newSerial:'Morgen beginnt ein neuer Roman',locked:'Noch nicht erschienen',guestbook:'Gästebuch',gbLead:'Hinterlass eine Zeile; sie erscheint nach Freigabe.',gbEmpty:'Das Buch ist noch leer. Schreib die erste Zeile.',city:'Stadt',pending:'wartet auf Freigabe',program:"Was möchtest du hören?",recordings:"Aufnahmen",ytReadings:"Lesungen von YouTube",readBy:"Gelesen von",mood_huzun:"Melancholisch",mood_sakin:"Ruhig",mood_coskun:"Beschwingt",moodNote:"Die Skala wählt die Gattung, die Liste die Aufnahme. Melancholische Texte werden langsamer gelesen.",closeVideo:"Zurück zum Radio",playing:"Läuft gerade"},
 fr:{lamp:'Lampe à huile',bookmark:'Marquer',bookmarked:'Marqué',bookmarks:'Mes marque-pages',noMarks:'Aucun marque-page. Touchez le ruban d’un texte.',tea1:'Un verre de thé',teaN:'{n} verres de thé',min:'min',atmosphere:'Atmosphère',off:'Éteint',rain:'Pluie',sea:'Mer',stove:'Poêle',typeroom:'Salle de la machine à écrire',keys:'Bruit des touches',listen:'Écouter',pause:'Pause',rewind:'Retour',forward:'Suivant',voiceNote:'Lu par la voix turque de votre appareil',noVoice:'Pas de voix turque sur cet appareil',reading:'Lecture',lugat:'Dictionnaire',lugatHint:'Dictionnaire actif : touchez un mot',notFound:'Introuvable dans le dictionnaire TDK',source:'Source : dictionnaire TDK',card:'Créer une carte',download:'Télécharger',share:'Partager',close:'Fermer',letter:'Écrire une lettre',to:'À',yourName:'Votre nom',letterPh:'Votre lettre…',send:'Envoyer',sealed:'Enveloppe scellée, direction la boîte aux lettres',leafTitle:'Feuille du jour',leafLead:'Chaque matin une feuille : la date, un vers, une ligne. Arrachez-la pour voir hier.',verseOfDay:'Vers du jour',wordOfDay:'Ligne du jour',tear:'Arracher la feuille',today:'Aujourd’hui',lastYears:'Ce mois-ci les années passées',radio:'Radio Helezon',radioLead:'Tournez le cadran vers un genre. Quand le grésillement cesse, un texte commence.',tune:'Cadran',onAir:'À l’antenne',static:'…grésillement…',power:'ON',issue:'Numéro',read:'Lire',more:'Plus',catalogue:'Fichier',catLead:'Tirez un tiroir, mélangez les fiches.',shelf:'Étagère du bouquiniste',shelfLead:'Tirez par le dos, tournez la couverture.',spiral:'Hélice du temps',spiralLead:'Du centre vers l’extérieur : du premier numéro à aujourd’hui.',tefrika:'Feuilleton',part:'Épisode',tomorrow:'À suivre demain',newSerial:'Un nouveau feuilleton commence demain',locked:'Pas encore publié',guestbook:'Livre d’or',gbLead:'Laissez une ligne ; elle paraît après validation.',gbEmpty:'Le livre est encore vide. Écrivez la première ligne.',city:'Ville',pending:'en attente',program:"Que voulez-vous écouter ?",recordings:"Enregistrements",ytReadings:"Lectures sur YouTube",readBy:"Lu par",mood_huzun:"Mélancolique",mood_sakin:"Calme",mood_coskun:"Enjoué",moodNote:"Le cadran choisit le genre, la liste l’enregistrement. Les textes mélancoliques sont lus plus lentement.",closeVideo:"Retour à la radio",playing:"En cours"},
 ar:{lamp:'مصباح زيت',bookmark:'ضع علامة',bookmarked:'تم وضع العلامة',bookmarks:'علاماتي',noMarks:'لا علامات بعد. المس الشريط في أي نص.',tea1:'كوب شاي واحد',teaN:'{n} أكواب شاي',min:'د',atmosphere:'الأجواء',off:'مغلق',rain:'مطر',sea:'بحر',stove:'موقد',typeroom:'غرفة الآلة الكاتبة',keys:'صوت المفاتيح',listen:'استمع',pause:'إيقاف مؤقت',rewind:'رجوع',forward:'التالي',voiceNote:'يُقرأ بصوت جهازك التركي',noVoice:'لا صوت تركي على هذا الجهاز',reading:'يُقرأ',lugat:'القاموس',lugatHint:'القاموس مفعّل: المس كلمة',notFound:'غير موجود في قاموس TDK',source:'المصدر: قاموس TDK',card:'اصنع بطاقة',download:'تنزيل',share:'مشاركة',close:'إغلاق',letter:'اكتب رسالة',to:'إلى',yourName:'اسمك',letterPh:'رسالتك…',send:'إرسال',sealed:'أُغلق الظرف وانطلق إلى صندوق البريد',leafTitle:'ورقة اليوم',leafLead:'كل صباح ورقة: التاريخ وبيت وسطر. انزعها لترى الأمس.',verseOfDay:'بيت اليوم',wordOfDay:'سطر اليوم',tear:'انزع الورقة',today:'اليوم',lastYears:'هذا الشهر في السنوات الماضية',radio:'راديو هليزون',radioLead:'أدر المؤشر نحو نوع. حين يهدأ التشويش يبدأ نص.',tune:'المؤشر',onAir:'على الهواء',static:'…تشويش…',power:'تشغيل',issue:'العدد',read:'اقرأ',more:'المزيد',catalogue:'فهرس البطاقات',catLead:'اسحب الدرج وخلط البطاقات.',shelf:'رف بائع الكتب',shelfLead:'اسحب من الكعب واقلب الغلاف.',spiral:'حلزون الزمن',spiralLead:'من المركز إلى الخارج: من العدد الأول إلى اليوم.',tefrika:'مسلسل أدبي',part:'حلقة',tomorrow:'يتبع غدًا',newSerial:'مسلسل جديد يبدأ غدًا',locked:'لم يُنشر بعد',guestbook:'دفتر الذكريات',gbLead:'اترك سطرًا؛ يظهر بعد موافقة المحررين.',gbEmpty:'الدفتر ما زال فارغًا. اكتب أول سطر.',city:'المدينة',pending:'بانتظار الموافقة',program:"ماذا تودّ أن تسمع؟",recordings:"التسجيلات",ytReadings:"قراءات من يوتيوب",readBy:"بصوت",mood_huzun:"حزين",mood_sakin:"هادئ",mood_coskun:"متحمس",moodNote:"المؤشر يختار النوع والقائمة التسجيل. النصوص الحزينة تُقرأ أبطأ.",closeVideo:"العودة إلى الراديو",playing:"يُشغَّل الآن"},
 es:{lamp:'Lámpara de aceite',bookmark:'Marcar',bookmarked:'Marcado',bookmarks:'Mis marcapáginas',noMarks:'Aún no hay marcas. Toca la cinta de un texto.',tea1:'Un vaso de té',teaN:'{n} vasos de té',min:'min',atmosphere:'Atmósfera',off:'Apagado',rain:'Lluvia',sea:'Mar',stove:'Estufa',typeroom:'Sala de la máquina de escribir',keys:'Sonido de teclas',listen:'Escuchar',pause:'Pausa',rewind:'Atrás',forward:'Siguiente',voiceNote:'Leído con la voz turca de tu dispositivo',noVoice:'No hay voz turca en este dispositivo',reading:'Leyendo',lugat:'Diccionario',lugatHint:'Diccionario activo: toca una palabra',notFound:'No está en el diccionario TDK',source:'Fuente: diccionario TDK',card:'Crear tarjeta',download:'Descargar',share:'Compartir',close:'Cerrar',letter:'Escribir una carta',to:'Para',yourName:'Tu nombre',letterPh:'Tu carta…',send:'Enviar',sealed:'Sobre cerrado, rumbo al buzón',leafTitle:'Hoja del día',leafLead:'Cada mañana una hoja: la fecha, un verso, una línea. Arráncala y verás la de ayer.',verseOfDay:'Verso del día',wordOfDay:'Línea del día',tear:'Arrancar la hoja',today:'Hoy',lastYears:'Este mes en años pasados',radio:'Radio Helezon',radioLead:'Gira el dial hacia un género. Cuando cesa la estática, empieza un texto.',tune:'Dial',onAir:'En el aire',static:'…estática…',power:'ON',issue:'Número',read:'Leer',more:'Más',catalogue:'Fichero',catLead:'Tira del cajón, baraja las fichas.',shelf:'Estantería del librero',shelfLead:'Tira del lomo, gira la portada.',spiral:'Hélice del tiempo',spiralLead:'Del centro hacia fuera: del primer número a hoy.',tefrika:'Folletín',part:'Entrega',tomorrow:'Continúa mañana',newSerial:'Mañana empieza un nuevo folletín',locked:'Aún no publicado',guestbook:'Libro de visitas',gbLead:'Deja una línea; aparece tras la aprobación.',gbEmpty:'El libro sigue vacío. Escribe la primera línea.',city:'Ciudad',pending:'pendiente',program:"¿Qué quieres escuchar?",recordings:"Grabaciones",ytReadings:"Lecturas de YouTube",readBy:"Leído por",mood_huzun:"Melancólico",mood_sakin:"Sereno",mood_coskun:"Vivaz",moodNote:"El dial elige el género, la lista la grabación. Los textos melancólicos se leen más despacio.",closeVideo:"Volver a la radio",playing:"Sonando ahora"},
 ru:{lamp:'Керосиновая лампа',bookmark:'Добавить закладку',bookmarked:'В закладках',bookmarks:'Мои закладки',noMarks:'Закладок пока нет. Нажмите на ленту в любом тексте.',tea1:'Один стакан чая',teaN:'{n} стакана чая',min:'мин',atmosphere:'Атмосфера',off:'Выкл.',rain:'Дождь',sea:'Море',stove:'Печь',typeroom:'Комната с пишущей машинкой',keys:'Звук клавиш',listen:'Слушать',pause:'Пауза',rewind:'Назад',forward:'Далее',voiceNote:'Читает турецкий голос вашего устройства',noVoice:'На устройстве нет турецкого голоса',reading:'Читается',lugat:'Словарь',lugatHint:'Словарь включён: нажмите на слово',notFound:'Не найдено в словаре TDK',source:'Источник: словарь TDK',card:'Сделать карточку',download:'Скачать',share:'Поделиться',close:'Закрыть',letter:'Написать письмо',to:'Кому',yourName:'Ваше имя',letterPh:'Ваше письмо…',send:'Отправить',sealed:'Конверт запечатан, письмо ушло в ящик',leafTitle:'Листок дня',leafLead:'Каждое утро листок: дата, строка, фраза. Оторвите, чтобы увидеть вчерашний.',verseOfDay:'Строка дня',wordOfDay:'Фраза дня',tear:'Оторвать листок',today:'Сегодня',lastYears:'Этот месяц в прошлые годы',radio:'Радио Helezon',radioLead:'Поверните шкалу к жанру. Когда шум стихнет, начнётся текст.',tune:'Шкала',onAir:'В эфире',static:'…шум…',power:'ВКЛ',issue:'Номер',read:'Читать',more:'Ещё',catalogue:'Картотека',catLead:'Выдвиньте ящик, перемешайте карточки.',shelf:'Полка букиниста',shelfLead:'Потяните за корешок, переверните обложку.',spiral:'Спираль времени',spiralLead:'От центра наружу: от первого номера до сегодня.',tefrika:'Роман с продолжением',part:'Часть',tomorrow:'Продолжение завтра',newSerial:'Завтра начинается новый роман',locked:'Ещё не опубликовано',guestbook:'Книга отзывов',gbLead:'Оставьте строку; она появится после одобрения.',gbEmpty:'Книга пока пуста. Напишите первую строку.',city:'Город',pending:'ожидает одобрения',program:"Что хотите послушать?",recordings:"Записи",ytReadings:"Чтения с YouTube",readBy:"Читает",mood_huzun:"Грустное",mood_sakin:"Спокойное",mood_coskun:"Бодрое",moodNote:"Шкала выбирает жанр, список — запись. Грустные тексты читаются медленнее.",closeVideo:"Назад к радио",playing:"Сейчас играет"}
};
var body = document.body, html = document.documentElement;
function lang(){ var l = html.lang || 'tr'; return X[l] ? l : 'tr'; }
function t(k){ var d = X[lang()]; return (d && d[k]) || X.tr[k] || k; }
function el(tag, cls, inner){ var e = document.createElement(tag); if (cls) e.className = cls; if (inner != null) e.innerHTML = inner; return e; }
function esc(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
var store = { get: function(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }, set: function(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } };
var reduced = new URLSearchParams(location.search).get('motion') === 'off';
var isArt = body.classList.contains('page-art'), isHome = !!document.getElementById('heroTitle');
var piecesP = null; function pieces(){ if (!piecesP) piecesP = fetch('/data/pieces.json').then(function(r){ return r.json(); }); return piecesP; }
function monthName(m){ try{ return new Intl.DateTimeFormat(lang(), { month: 'long' }).format(new Date(2000, m - 1, 1)); }catch(e){ return String(m); } }
function metaOf(p){ return p.a + ' · ' + p.gn + ' · ' + t('issue') + ' ' + p.n + ' · ' + monthName(+p.d.slice(5,7)) + ' ' + p.d.slice(0,4); }
function shuffle(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function dayNum(){ return Math.floor(Date.now() / 864e5); }
var _ta = document.createElement('textarea');
function decodeEnt(s){ _ta.innerHTML = String(s || ''); return _ta.value; }
function turkishText(s){ s = String(s || ''); return !/[Ѐ-ӿ]/.test(s) && !/&[a-z]+;/i.test(s) && (s.match(/[çğıöşüÇĞİÖŞÜ]/g) || []).length >= 1; }
function firstLine(s, max){ s = decodeEnt(s).replace(/\s+/g, ' ').trim(); var m = s.match(/^(.{12,}?[.!?…])\s/); var out = m ? m[1] : s; if (out.length > max){ var cut = out.lastIndexOf(',', max); out = (cut > 30 ? out.slice(0, cut) : out.slice(0, max)).trim() + '…'; } return out; }
/* fonts for cards, catalogue, letters */
var fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = 'https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600&display=swap'; document.head.appendChild(fl);
/* label refresh on language change */
var relabel = [];
function applyLabels(){ document.querySelectorAll('[data-x]').forEach(function(e){ e.textContent = t(e.getAttribute('data-x')); }); document.querySelectorAll('[data-x-ph]').forEach(function(e){ e.placeholder = t(e.getAttribute('data-x-ph')); }); relabel.forEach(function(f){ f(); }); }
new MutationObserver(function(){ applyLabels(); }).observe(html, { attributes: true, attributeFilter: ['lang'] });

/* ================= 1. Gaz lambası ================= */
var navRight = document.querySelector('.nav-right');
if (navRight){
  body.appendChild(el('div', 'lamp-glow'));
  var lampBtn = el('button', 'lamp-btn', '<svg viewBox="0 0 24 24"><path class="flame" d="M12 3c1.6 2 2.4 3.4 2.4 4.9A2.4 2.4 0 0 1 12 10a2.4 2.4 0 0 1-2.4-2.1C9.6 6.4 10.4 5 12 3z"/><path d="M8.5 10.5h7l-1 3.2h-5z"/><path d="M9.6 13.7v2.3h4.8v-2.3M9 16h6l1.2 4.5H7.8z"/></svg>');
  lampBtn.type = 'button'; lampBtn.setAttribute('aria-label', t('lamp')); lampBtn.title = t('lamp');
  navRight.insertBefore(lampBtn, navRight.firstChild);
  /* light theme is the default; the lamp only lasts for the current visit */
  try{ localStorage.removeItem('helezon-lamp'); if (sessionStorage.getItem('helezon-lamp') === '1') html.classList.add('lamp'); }catch(e){}
  lampBtn.addEventListener('click', function(){ var on = html.classList.toggle('lamp'); try{ sessionStorage.setItem('helezon-lamp', on ? '1' : '0'); }catch(e){} });
  relabel.push(function(){ lampBtn.title = t('lamp'); });
}

/* ================= 2. Ayraç (bookmarks) ================= */
var marks = store.get('helezon-marks', []);
var marksLink = null;
if (navRight){
  marksLink = el('a', 'marks-link', '<svg viewBox="0 0 16 20"><path d="M2 1h12v18l-6-4.5L2 19z"/></svg><b hidden></b>');
  marksLink.href = '/ayraclar/'; marksLink.setAttribute('aria-label', t('bookmarks')); marksLink.title = t('bookmarks');
  navRight.insertBefore(marksLink, navRight.children[1] || null);
  relabel.push(function(){ marksLink.title = t('bookmarks'); });
}
function badge(){ if (!marksLink) return; var b = marksLink.querySelector('b'); b.textContent = marks.length; b.hidden = !marks.length; }
badge();
if (isArt){
  var head = document.querySelector('.art-head'); head.style.position = 'relative';
  var url = location.pathname, title = document.querySelector('h1').textContent.trim(), byEl = document.querySelector('.art-by a'), author = byEl ? byEl.textContent.trim() : '', tagEl = document.querySelector('.crumbs a:nth-child(3)'), tag = tagEl ? tagEl.textContent.trim() : '';
  var ribbon = el('button', 'ribbon', '<svg viewBox="0 0 16 20"><path d="M2 1h12v18l-6-4.5L2 19z"/></svg><span class="tip"></span>'); ribbon.type = 'button'; ribbon.style.top = '-6px';
  head.appendChild(ribbon);
  function syncRibbon(){ var on = marks.some(function(m){ return m.u === url; }); ribbon.classList.toggle('on', on); ribbon.querySelector('.tip').textContent = on ? t('bookmarked') : t('bookmark'); ribbon.setAttribute('aria-label', on ? t('bookmarked') : t('bookmark')); }
  ribbon.addEventListener('click', function(){ var i = marks.findIndex(function(m){ return m.u === url; }); if (i >= 0) marks.splice(i, 1); else marks.unshift({ u: url, t: title, a: author, g: tag, d: Date.now() }); store.set('helezon-marks', marks); syncRibbon(); badge(); });
  syncRibbon(); relabel.push(syncRibbon);
}
var marksList = document.getElementById('marksList');
if (marksList){
  function renderMarks(){ if (!marks.length){ marksList.innerHTML = '<li><p class="defter-empty">' + esc(t('noMarks')) + '</p></li>'; return; } marksList.innerHTML = marks.map(function(m){ return '<li><a href="' + esc(m.u) + '"><span class="tag">' + esc(m.g) + '</span><span class="t">' + esc(m.t) + '</span><span class="by">' + esc(m.a) + '</span><span class="no"><button class="chip" data-rm="' + esc(m.u) + '">×</button></span><i class="arr"></i></a></li>'; }).join(''); }
  marksList.addEventListener('click', function(e){ var b = e.target.closest('[data-rm]'); if (!b) return; e.preventDefault(); marks = marks.filter(function(m){ return m.u !== b.dataset.rm; }); store.set('helezon-marks', marks); renderMarks(); badge(); });
  renderMarks(); relabel.push(renderMarks);
}

/* ================= article page tools ================= */
var artBody = isArt ? document.querySelector('.art-body') : null;
var tools = null;
if (isArt){
  tools = el('div', 'art-tools');
  var dateEl = document.querySelector('.art-date'); dateEl.parentNode.insertBefore(tools, dateEl.nextSibling);
  /* 3. Çay bardağı */
  var words = artBody.textContent.trim().split(/\s+/).length, mins = Math.max(1, Math.round(words / 180)), cups = Math.max(1, Math.round(mins / 5));
  var tea = el('p', 'tea', '<svg viewBox="0 0 22 30"><path class="steam" d="M7 8c1-2-1-3 0-5"/><path class="steam" d="M11 7c1-2-1-3 0-5"/><path class="steam" d="M15 8c1-2-1-3 0-5"/><path class="glass" d="M4 11h14l-1.5 8c-.3 2-1.2 3.5-2.5 4.5v3H8v-3C6.7 22.5 5.8 21 5.5 19z"/><path class="liquid" d="M5.6 14h10.8l-1 5.2c-.3 1.6-1 2.8-2 3.6H8.6c-1-.8-1.7-2-2-3.6z"/><path class="glass" d="M3 27.5h16"/></svg><span></span>');
  tools.appendChild(tea);
  function teaLabel(){ tea.querySelector('span').textContent = (cups === 1 ? t('tea1') : t('teaN').replace('{n}', cups)) + ' · ' + mins + ' ' + t('min'); }
  teaLabel(); relabel.push(teaLabel);
}
function toolBtn(key, svg){ var b = el('button', 'tool', svg + '<span data-x="' + key + '">' + esc(t(key)) + '</span>'); b.type = 'button'; return b; }

/* ================= 4. Daktilo girişi + key click ================= */
var keySound = store.get('helezon-keys', false);
var AC = null; function ac(){ if (!AC){ var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); } if (AC.state === 'suspended') AC.resume(); return AC; }
function click(vol, f){ var c = ac(); if (!c) return; var n = c.createBufferSource(), b = c.createBuffer(1, 1200, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3); n.buffer = b; var bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f || 2600; bp.Q.value = 1.2; var g = c.createGain(); g.gain.value = vol || .1; n.connect(bp); bp.connect(g); g.connect(c.destination); n.start(); }
if (isArt && !reduced){
  var first = null; var ps = artBody.querySelectorAll(':scope > p');
  for (var i = 0; i < ps.length; i++){ if (ps[i].textContent.trim().length > 20 && !ps[i].children.length){ first = ps[i]; break; } }
  if (first){
    var full = first.textContent, typed = 0, limit = Math.min(full.length, 220);
    first.textContent = ''; first.classList.add('typing');
    var startTyping = function(){ var iv = setInterval(function(){ typed++; first.textContent = full.slice(0, typed); if (keySound && /\S/.test(full[typed - 1])) click(.05, 2200 + Math.random() * 800); if (typed >= limit){ clearInterval(iv); first.textContent = full; first.classList.remove('typing'); } }, 22); };
    setTimeout(startTyping, 500);
  }
}

/* ================= 5. Sayfa çevirme ================= */
if (isArt){
  try{ if (sessionStorage.getItem('hz-flip')){ sessionStorage.removeItem('hz-flip'); if (!reduced) document.querySelector('main').classList.add('flip-in'); } }catch(e){}
  document.querySelectorAll('.art-nav a, .related a[href^="/yazi/"], .pcard').forEach(function(a){ a.addEventListener('click', function(e){ if (e.metaKey || e.ctrlKey || e.button || reduced) return; e.preventDefault(); try{ sessionStorage.setItem('hz-flip', '1'); }catch(x){} document.querySelector('main').classList.add('flip-out'); setTimeout(function(){ location.href = a.href; }, 520); }); });
}

/* ================= 6. Atmosfer (synthesised) ================= */
if (isArt){
  var atmos = el('div', 'atmos'), scene = store.get('helezon-atmos', 'off'), nodes = [], timers = [];
  atmos.innerHTML = '<button class="toggle" type="button"><svg viewBox="0 0 24 24"><path d="M3 12h3l2-6 3 12 3-9 2 3h5"/></svg><span></span></button><div class="menu"></div>';
  body.appendChild(atmos);
  var tog = atmos.querySelector('.toggle'), menu = atmos.querySelector('.menu');
  function noise(brown){ var c = ac(); var len = c.sampleRate * 3, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0), last = 0; for (var i = 0; i < len; i++){ var w = Math.random() * 2 - 1; if (brown){ last = (last + .02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w; } var s = c.createBufferSource(); s.buffer = b; s.loop = true; return s; }
  function stopAll(){ nodes.forEach(function(n){ try{ n.stop ? n.stop() : n.disconnect(); }catch(e){} }); nodes = []; timers.forEach(clearTimeout); timers = []; }
  function loop(fn, min, max){ (function tick(){ fn(); timers.push(setTimeout(tick, min + Math.random() * (max - min))); })(); }
  function burst(f, q, vol, len){ var c = ac(); var n = c.createBufferSource(), b = c.createBuffer(1, len || 900, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); n.buffer = b; var bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = q; var g = c.createGain(); g.gain.value = vol; n.connect(bp); bp.connect(g); g.connect(c.destination); n.start(); }
  function play(kind){
    stopAll(); if (kind === 'off' || !ac()) return; var c = ac(); var master = c.createGain(); master.gain.value = .22; master.connect(c.destination); nodes.push(master);
    if (kind === 'rain'){ var n = noise(false), f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1100; f.Q.value = .6; var g = c.createGain(); g.gain.value = .5; n.connect(f); f.connect(g); g.connect(master); n.start(); nodes.push(n); loop(function(){ burst(2800 + Math.random() * 1500, 2, .12, 500); }, 90, 420); }
    if (kind === 'sea'){ var n2 = noise(true), lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 480; var g2 = c.createGain(); g2.gain.value = .5; var lfo = c.createOscillator(); lfo.frequency.value = .09; var lg = c.createGain(); lg.gain.value = .32; lfo.connect(lg); lg.connect(g2.gain); n2.connect(lp); lp.connect(g2); g2.connect(master); n2.start(); lfo.start(); nodes.push(n2, lfo); }
    if (kind === 'stove'){ var n3 = noise(true), lp3 = c.createBiquadFilter(); lp3.type = 'lowpass'; lp3.frequency.value = 220; var g3 = c.createGain(); g3.gain.value = .22; n3.connect(lp3); lp3.connect(g3); g3.connect(master); n3.start(); nodes.push(n3); loop(function(){ burst(1500 + Math.random() * 2000, 3, .25, 700); if (Math.random() < .2) burst(600, 2, .18, 1600); }, 60, 520); }
    if (kind === 'typeroom'){ var n4 = noise(true), lp4 = c.createBiquadFilter(); lp4.type = 'lowpass'; lp4.frequency.value = 160; var g4 = c.createGain(); g4.gain.value = .08; n4.connect(lp4); lp4.connect(g4); g4.connect(master); n4.start(); nodes.push(n4); var k = 0; loop(function(){ burst(2400 + Math.random() * 900, 1.5, .18, 1200); if (++k % 38 === 0){ var o = c.createOscillator(), og = c.createGain(); o.frequency.value = 1900; og.gain.setValueAtTime(.12, c.currentTime); og.gain.exponentialRampToValueAtTime(.001, c.currentTime + .6); o.connect(og); og.connect(master); o.start(); o.stop(c.currentTime + .6); } }, 70, 380); }
  }
  var scenes = ['off', 'rain', 'sea', 'stove', 'typeroom'];
  function renderMenu(){ menu.innerHTML = scenes.map(function(s){ return '<button type="button" data-s="' + s + '" class="' + (scene === s ? 'on' : '') + '">' + esc(t(s)) + '</button>'; }).join('') + '<div class="sep"></div><button type="button" data-k="1" class="' + (keySound ? 'on' : '') + '">' + esc(t('keys')) + '</button>'; tog.querySelector('span').textContent = t('atmosphere') + (scene !== 'off' ? ' · ' + t(scene) : ''); }
  renderMenu(); relabel.push(renderMenu);
  tog.addEventListener('click', function(){ atmos.classList.toggle('open'); });
  menu.addEventListener('click', function(e){ var b = e.target.closest('button'); if (!b) return; if (b.dataset.k){ keySound = !keySound; store.set('helezon-keys', keySound); if (keySound) click(.08); } else { scene = b.dataset.s; store.set('helezon-atmos', scene); play(scene); } renderMenu(); });
  document.addEventListener('click', function(e){ if (!atmos.contains(e.target)) atmos.classList.remove('open'); });
  if (scene !== 'off'){ var once = function(){ play(scene); document.removeEventListener('pointerdown', once); }; document.addEventListener('pointerdown', once); }
}

/* ================= 7. Kaset çalar (TTS) ================= */
if (isArt && 'speechSynthesis' in window){
  var cas = el('div', 'cassette', '<svg viewBox="0 0 160 100"><rect class="shell" x="2" y="2" width="156" height="96" rx="8"/><rect class="label" x="14" y="12" width="132" height="52" rx="3"/><rect class="tape" x="52" y="30" width="56" height="18"/><g class="r1"><circle class="reel" cx="50" cy="39" r="12"/><path class="spoke" d="M50 27v24M38 39h24M41.5 30.5l17 17M58.5 30.5l-17 17"/></g><g class="r2"><circle class="reel" cx="110" cy="39" r="12"/><path class="spoke" d="M110 27v24M98 39h24M101.5 30.5l17 17M118.5 30.5l-17 17"/></g><rect x="40" y="74" width="80" height="14" rx="2" fill="#111"/><circle cx="52" cy="81" r="3" fill="#b8925a"/><circle cx="108" cy="81" r="3" fill="#b8925a"/><text x="80" y="24" text-anchor="middle" font-family="Courier Prime, monospace" font-size="8" fill="#2b1d15">HELEZON · ' + esc(document.querySelector('h1').textContent.trim().slice(0, 22)) + '</text></svg><div class="ctl"><button class="tool" type="button" data-a="rew">◀◀ <span data-x="rewind"></span></button><button class="tool" type="button" data-a="play">▶ <span data-x="listen"></span></button><button class="tool" type="button" data-a="fwd"><span data-x="forward"></span> ▶▶</button></div><p class="now"></p>');
  tools.parentNode.insertBefore(cas, tools.nextSibling);
  var paras = Array.prototype.filter.call(artBody.querySelectorAll('p'), function(p){ return p.textContent.trim().length > 1; });
  var idx = 0, playing = false, now = cas.querySelector('.now'), playBtn = cas.querySelector('[data-a=play]');
  function voice(){ var vs = speechSynthesis.getVoices(); return vs.find(function(v){ return /^tr/i.test(v.lang) && /google|yelda|filiz|tolga|natural/i.test(v.name); }) || vs.find(function(v){ return /^tr/i.test(v.lang); }) || null; }
  function status(){ now.textContent = playing ? t('reading') + ' · ' + (idx + 1) + '/' + paras.length + ' · ' + (voice() ? t('voiceNote') : t('noVoice')) : t('voiceNote'); playBtn.innerHTML = playing ? '❚❚ <span data-x="pause">' + esc(t('pause')) + '</span>' : '▶ <span data-x="listen">' + esc(t('listen')) + '</span>'; }
  function speak(i){ speechSynthesis.cancel(); paras.forEach(function(p){ p.classList.remove('reading'); }); if (i >= paras.length){ playing = false; cas.classList.remove('playing'); status(); return; } idx = i; var u = new SpeechSynthesisUtterance(paras[i].textContent); u.lang = 'tr-TR'; var v = voice(); if (v) u.voice = v; u.rate = .95; u.onend = function(){ if (playing) speak(i + 1); }; paras[i].classList.add('reading'); if (i > 0) paras[i].scrollIntoView({ behavior: 'smooth', block: 'center' }); speechSynthesis.speak(u); status(); }
  cas.addEventListener('click', function(e){ var b = e.target.closest('[data-a]'); if (!b) return; var a = b.dataset.a; if (a === 'play'){ if (playing){ playing = false; speechSynthesis.cancel(); cas.classList.remove('playing'); paras.forEach(function(p){ p.classList.remove('reading'); }); status(); } else { playing = true; cas.classList.add('playing'); speak(idx); } } else if (a === 'rew'){ if (playing) speak(Math.max(0, idx - 1)); else idx = Math.max(0, idx - 1); status(); } else if (a === 'fwd'){ if (playing) speak(Math.min(paras.length - 1, idx + 1)); else idx = Math.min(paras.length - 1, idx + 1); status(); } });
  status(); relabel.push(status); if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = status;
  window.addEventListener('pagehide', function(){ speechSynthesis.cancel(); });
}

/* ================= 8. Lügat (TDK) ================= */
if (isArt){
  var lugatBtn = toolBtn('lugat', '<svg viewBox="0 0 24 24"><path d="M4 4h7v16H4zM13 4h7v16h-7M7 8h1M16 8h1"/></svg>'); tools.appendChild(lugatBtn);
  var bar = el('div', 'lugat-bar'); body.appendChild(bar); var pop = null, cache = {};
  lugatBtn.addEventListener('click', function(){ var on = artBody.classList.toggle('lugat'); lugatBtn.classList.toggle('on', on); bar.textContent = t('lugatHint'); bar.classList.toggle('show', on); if (!on) closePop(); });
  function closePop(){ if (pop){ pop.remove(); pop = null; } }
  function wordAt(x, y){ var r = null; if (document.caretRangeFromPoint) r = document.caretRangeFromPoint(x, y); else if (document.caretPositionFromPoint){ var p = document.caretPositionFromPoint(x, y); if (p) { r = document.createRange(); r.setStart(p.offsetNode, p.offset); } } if (!r || r.startContainer.nodeType !== 3) return null; var txt = r.startContainer.textContent, o = r.startOffset, L = /[\p{L}’'â-ûÂ-Û]/u; var s = o, e = o; while (s > 0 && L.test(txt[s - 1])) s--; while (e < txt.length && L.test(txt[e])) e++; return txt.slice(s, e).replace(/[’']/g, '').trim(); }
  function lookup(w){ var lw = w.toLocaleLowerCase('tr'); var cands = [lw]; for (var k = 1; k <= 4 && lw.length - k >= 3; k++) cands.push(lw.slice(0, lw.length - k)); var i = 0; return new Promise(function(res){ (function next(){ if (i >= cands.length) return res(null); var c = cands[i++]; if (cache[c] !== undefined){ if (cache[c]) return res(cache[c]); return next(); } fetch('https://sozluk.gov.tr/gts?ara=' + encodeURIComponent(c)).then(function(r){ return r.json(); }).then(function(j){ var ok = Array.isArray(j) && j[0] && j[0].madde; cache[c] = ok ? j[0] : null; if (ok) res(j[0]); else next(); }).catch(function(){ cache[c] = null; next(); }); })(); }); }
  artBody.addEventListener('click', function(e){ if (!artBody.classList.contains('lugat') || e.target.closest('a')) return; var w = wordAt(e.clientX, e.clientY); if (!w || w.length < 2) return; closePop(); pop = el('div', 'lugat-pop', '<span class="x">×</span><b>' + esc(w) + '</b><i>…</i>'); pop.style.left = (e.pageX) + 'px'; pop.style.top = (e.pageY) + 'px'; body.appendChild(pop); pop.querySelector('.x').addEventListener('click', closePop);
    lookup(w).then(function(m){ if (!pop) return; if (!m){ pop.querySelector('i').textContent = t('notFound'); return; } var anl = (m.anlamlarListe || []).slice(0, 3).map(function(a){ return '<li>' + esc(a.anlam) + '</li>'; }).join(''); pop.innerHTML = '<span class="x">×</span><b>' + esc(m.madde) + '</b>' + (m.lisan ? '<i>' + esc(m.lisan) + '</i>' : '') + '<ol>' + anl + '</ol><small>' + esc(t('source')) + '</small>'; pop.querySelector('.x').addEventListener('click', closePop); }); });
  document.addEventListener('click', function(e){ if (pop && !pop.contains(e.target) && !artBody.contains(e.target)) closePop(); });
}

/* ================= 9. Alıntı kartı ================= */
function modal(inner){ var m = el('div', 'modal', '<div class="box"><span class="x">×</span>' + inner + '</div>'); body.appendChild(m); requestAnimationFrame(function(){ m.classList.add('show'); }); function close(){ m.classList.remove('show'); setTimeout(function(){ m.remove(); }, 400); } m.querySelector('.x').addEventListener('click', close); m.addEventListener('click', function(e){ if (e.target === m) close(); }); m.close = close; return m; }
function wrapText(ctx, text, max){ var words = text.split(/\s+/), lines = [], cur = ''; words.forEach(function(w){ var test = cur ? cur + ' ' + w : w; if (ctx.measureText(test).width > max && cur){ lines.push(cur); cur = w; } else cur = test; }); if (cur) lines.push(cur); return lines; }
function drawSpiral(ctx, cx, cy, R, turns){ ctx.beginPath(); for (var i = 0; i <= 400; i++){ var tt = i / 400, a = tt * turns * Math.PI * 2, r = tt * R; var x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
function makeCard(text, ttl, auth, tg){
  return Promise.all([document.fonts.load('40px "Courier Prime"'), document.fonts.load('300 44px "Cormorant Garamond"'), document.fonts.load('500 20px Inter')]).catch(function(){}).then(function(){
    var W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H; var x = c.getContext('2d');
    x.fillStyle = '#f3ead6'; x.fillRect(0, 0, W, H);
    for (var i = 0; i < 9000; i++){ x.fillStyle = 'rgba(63,42,31,' + (Math.random() * .07) + ')'; x.fillRect(Math.random() * W, Math.random() * H, 2, 2); }
    var g = x.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .8); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(60,40,20,.18)'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = '#b8542a'; x.fillRect(72, 72, 220, 40); x.fillStyle = '#f3ead6'; x.font = '500 18px Inter, sans-serif'; x.textBaseline = 'middle'; x.fillText((tg || 'Helezon').toLocaleUpperCase('tr').split('').join(' '), 88, 92);
    x.fillStyle = '#6e1f2a'; x.font = '300 220px "Cormorant Garamond", serif'; x.textBaseline = 'alphabetic'; x.fillText('“', 64, 330);
    var size = 44; x.fillStyle = '#2b1d15'; var lines; do { x.font = size + 'px "Courier Prime", monospace'; lines = wrapText(x, text, W - 200); size -= 2; } while (lines.length * size * 1.45 > 700 && size > 22);
    var lh = (size + 2) * 1.45, y0 = 320; lines.forEach(function(l, i){ x.fillText(l, 100, y0 + i * lh); });
    var yb = Math.max(y0 + lines.length * lh + 80, 1040); x.strokeStyle = 'rgba(63,42,31,.5)'; x.lineWidth = 1; x.beginPath(); x.moveTo(100, yb); x.lineTo(W - 100, yb); x.stroke();
    x.fillStyle = '#2b1d15'; x.font = '400 40px "Cormorant Garamond", serif'; x.fillText(ttl.length > 44 ? ttl.slice(0, 43) + '…' : ttl, 100, yb + 58); x.font = 'italic 300 32px "Cormorant Garamond", serif'; x.fillStyle = '#6b4a35'; x.fillText(auth, 100, yb + 104);
    x.strokeStyle = '#2b1d15'; x.lineWidth = 1.2; drawSpiral(x, W - 150, H - 120, 46, 5); x.fillStyle = '#2b1d15'; x.font = '500 16px Inter, sans-serif'; x.textAlign = 'right'; x.fillText('H E L E Z O N  ·  helezon.vercel.app', W - 100, H - 40); x.textAlign = 'left';
    return c;
  });
}
function openCard(text, ttl, auth, tg){
  makeCard(text, ttl, auth, tg).then(function(c){ var m = modal('<div class="cv"></div><div class="row"><button class="btn solid" type="button" data-a="dl">' + esc(t('download')) + '</button><button class="btn" type="button" data-a="sh">' + esc(t('share')) + '</button></div>'); m.querySelector('.cv').appendChild(c);
    m.addEventListener('click', function(e){ var b = e.target.closest('[data-a]'); if (!b) return; c.toBlob(function(blob){ var f = new File([blob], 'helezon-kart.png', { type: 'image/png' }); if (b.dataset.a === 'sh' && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: ttl }).catch(function(){}); else { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'helezon-kart.png'; a.click(); } }, 'image/png'); }); });
}
if (isArt){
  var selBtn = el('button', 'sel-btn', t('card')); selBtn.type = 'button'; selBtn.hidden = true; body.appendChild(selBtn); var selText = '', st;
  document.addEventListener('selectionchange', function(){ clearTimeout(st); st = setTimeout(function(){ var s = document.getSelection(); var txt = s && s.toString().trim(); if (!txt || txt.length < 8 || txt.length > 420 || !s.rangeCount || !artBody.contains(s.getRangeAt(0).commonAncestorContainer)){ selBtn.hidden = true; return; } var r = s.getRangeAt(0).getBoundingClientRect(); selText = txt; selBtn.textContent = t('card'); selBtn.style.left = (r.left + r.width / 2 + scrollX) + 'px'; selBtn.style.top = (r.top + scrollY) + 'px'; selBtn.hidden = false; }, 250); });
  selBtn.addEventListener('mousedown', function(e){ e.preventDefault(); });
  selBtn.addEventListener('click', function(){ openCard(selText, title, author, tag); selBtn.hidden = true; });
  var cardTool = toolBtn('card', '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M7 10h6M7 14h10"/></svg>'); tools.appendChild(cardTool);
  cardTool.addEventListener('click', function(){ var s = document.getSelection(); var txt = s && s.toString().trim(); if (!txt || txt.length < 8) txt = (first ? full : artBody.textContent.trim()).slice(0, 260); openCard(txt, title, author, tag); });
}

/* ================= 10. Mektup ================= */
if (isArt){
  var letterTool = toolBtn('letter', '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="1"/><path d="M3 7l9 6 9-6"/></svg>'); tools.appendChild(letterTool);
  letterTool.addEventListener('click', function(){
    var m = modal('<div class="letter-wrap"><div class="letter-paper"><div class="to">' + esc(t('to')) + ': ' + esc(author || 'Helezon') + '</div><input type="text" id="lname" placeholder="' + esc(t('yourName')) + '"><textarea id="lmsg" placeholder="' + esc(t('letterPh')) + '"></textarea></div><div class="envelope"><div class="env"><div class="stamp">HELEZON<br>2026</div><div class="mark">HELEZON<br>POSTA</div><div class="addr">Helezon Dergisi · ' + esc(author) + '</div></div></div><div class="row"><button class="btn solid" type="button" id="lsend">' + esc(t('send')) + '</button></div></div>');
    m.querySelector('#lsend').addEventListener('click', function(){ var msg = m.querySelector('#lmsg').value.trim(), nm = m.querySelector('#lname').value.trim(); if (msg.length < 3){ m.querySelector('#lmsg').focus(); return; } var w = m.querySelector('.letter-wrap'); w.classList.add('sending'); m.querySelector('#lsend').disabled = true; m.querySelector('#lsend').textContent = t('sealed'); var href = 'mailto:helezoniletisim@gmail.com?subject=' + encodeURIComponent('Mektup: ' + title + (author ? ' — ' + author : '')) + '&body=' + encodeURIComponent((author ? 'Sayın ' + author + ',\n\n' : '') + msg + '\n\n— ' + (nm || '') + '\n\n' + title + '\n' + location.href); setTimeout(function(){ location.href = href; }, 1700); setTimeout(m.close, 4200); });
  });
}

/* ================= 11. Takvim yaprağı (home) ================= */
var takvim = document.getElementById('takvim');
if (takvim){
  var offset = 0, poemsAll = [], essaysAll = [];
  function leafData(off){ var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - off); var n = Math.floor(d.getTime() / 864e5); var p = poemsAll.length ? poemsAll[(n * 7919) % poemsAll.length] : null, q = essaysAll.length ? essaysAll[(n * 104729) % essaysAll.length] : null; var hijri = ''; try{ hijri = new Intl.DateTimeFormat(lang() + '-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(d); }catch(e){} return { d: d, p: p, q: q, hijri: hijri }; }
  function leafHTML(L, under){ var wd = new Intl.DateTimeFormat(lang(), { weekday: 'long' }).format(L.d), mon = new Intl.DateTimeFormat(lang(), { month: 'long', year: 'numeric' }).format(L.d); return '<div class="leaf' + (under ? ' under' : '') + '"><div class="binder"><i></i><i></i></div><div class="mon">' + esc(mon) + '</div><div class="day">' + L.d.getDate() + '</div><div class="wd">' + esc(wd) + '</div>' + (L.hijri ? '<div class="hijri">' + esc(L.hijri) + '</div>' : '') + '<div class="rule"></div>' + (L.p ? '<div class="lbl">' + esc(t('verseOfDay')) + '</div><div class="verse">' + esc(firstLine(L.p.s, 110)) + '</div><div class="who"><a href="' + esc(L.p.u) + '">' + esc(L.p.t) + '</a> · ' + esc(L.p.a) + '</div>' : '') + (L.q ? '<div class="rule"></div><div class="lbl">' + esc(t('wordOfDay')) + '</div><div class="word">' + esc(firstLine(L.q.s, 130)) + '</div><div class="who"><a href="' + esc(L.q.u) + '">' + esc(L.q.t) + '</a> · ' + esc(L.q.a) + '</div>' : '') + '</div>'; }
  var stack = takvim.querySelector('.leaf-stack'), acts = takvim.querySelector('.leaf-actions');
  function renderLeaf(){ var top = leafData(offset), und = leafData(offset + 1); stack.innerHTML = leafHTML(und, true) + leafHTML(top, false); acts.querySelector('[data-a=today]').hidden = offset === 0; }
  acts.addEventListener('click', function(e){ var b = e.target.closest('[data-a]'); if (!b) return; if (b.dataset.a === 'tear'){ if (offset >= 30) return; var top = stack.querySelector('.leaf:not(.under)'); if (reduced){ offset++; renderLeaf(); return; } top.classList.add('tear'); setTimeout(function(){ offset++; renderLeaf(); }, 1000); } if (b.dataset.a === 'today'){ offset = 0; renderLeaf(); } if (b.dataset.a === 'share'){ var L = leafData(offset); if (L.p) openCard(firstLine(L.p.s, 140), L.p.t, L.p.a, t('verseOfDay')); } });
  pieces().then(function(all){ poemsAll = all.filter(function(p){ return p.g === 'siir' && !p.f && p.s && p.s.length > 20 && turkishText(p.s); }); essaysAll = all.filter(function(p){ return /deneme|makale|editorden/.test(p.g) && !p.f && p.s && p.s.length > 30 && turkishText(p.s); }); renderLeaf(); relabel.push(renderLeaf);
    var gec = document.getElementById('gecmisList'); if (gec){ var now = new Date(), mm = String(now.getMonth() + 1).padStart(2, '0'), yy = now.getFullYear(); var same = shuffle(all.filter(function(p){ return p.d.slice(5, 7) === mm && +p.d.slice(0, 4) < yy; })).slice(0, 4); function renderGec(){ gec.innerHTML = same.map(function(p){ return '<li><a href="' + esc(p.u) + '"><span class="tag">' + esc(p.gn) + '</span><span class="t">' + esc(p.t) + '</span><span class="by">' + esc(p.a) + ' · ' + p.d.slice(0, 4) + '</span><i class="arr"></i></a></li>'; }).join(''); } renderGec(); relabel.push(renderGec); } });
}

/* ================= 12. Helezon Radyo (home): genre stations, recorded readings, YouTube ================= */
var radio = document.getElementById('radyo');
if (radio){
  var dial = radio.querySelector('.scale'), needle = radio.querySelector('.needle'), range = radio.querySelector('input'), nowEl = radio.querySelector('.now'), power = radio.querySelector('.power');
  var REC = [], YT = [], ST = [], on = false, staticGain = null, staticSrc = null, cur = -1, curSt = -1, audio = new Audio(); audio.preload = 'none';
  var screen = el('div', 'screen'); radio.appendChild(screen);
  var chips = el('div', 'stations'); radio.querySelector('.dial').after(chips);
  var np = el('div', 'np', '<button class="np-btn" type="button">❚❚</button><div class="np-text"><b></b><span></span></div><span class="np-time">0:00</span><div class="np-bar"><div class="np-fill"></div></div>'); radio.querySelector('.bottom').after(np);
  var topMid = radio.querySelector('.top span:nth-child(2)'), topMidText = topMid ? topMid.textContent : ''; var readout = el('div', 'readout'); radio.querySelector('.dial').appendChild(readout);
  var program = el('div', 'radio-program'); radio.parentNode.appendChild(program);
  var GORDER = ['siir', 'hikaye', 'deneme', 'makale', 'biyografi', 'ceviri', 'roportaj', 'editorden', 'gezi', 'hatira', 'mektup'];
  var GKEY = { siir: 'cats.poetry', hikaye: 'cat.story', deneme: 'cat.essay', makale: 'cat.article', biyografi: 'cat.biography', ceviri: 'cat.translation', roportaj: 'cat.interview', editorden: 'cat.editorial' };
  function gLabel(g, gn){ try{ var k = GKEY[g]; if (!k) return gn; return k.split('.').reduce(function(o, x){ return o[x]; }, I18N[current]) || gn; }catch(e){ return gn; } }
  function moodName(m){ return t('mood_' + (m || 'sakin')); }
  function fmt(s){ s = Math.round(s || 0); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function buildStations(){ ST = []; GORDER.forEach(function(g){ var items = []; REC.forEach(function(r, i){ if (r.g === g) items.push(i); }); if (items.length) ST.push({ g: g, gn: REC[items[0]].gn, items: items }); }); }
  function stPos(si){ return ST.length > 1 ? si / (ST.length - 1) * 1000 : 0; }
  function pos(v){ return 6 + v / 1000 * 88; }
  function renderStations(){ dial.innerHTML = ST.map(function(s, i){ return '<div class="st" data-i="' + i + '"><i></i></div>'; }).join(''); chips.innerHTML = (YT.length ? '<button type="button" data-yt="0" class="ytchip' + (radio.classList.contains('tv') ? ' on' : '') + '">▶ YouTube · ' + YT.length + '</button>' : '') + ST.map(function(s, i){ return '<button type="button" data-i="' + i + '"' + (on && curSt === i ? ' class="on"' : '') + '>' + esc(gLabel(s.g, s.gn)) + '</button>'; }).join(''); power.textContent = on ? '■' : '▶'; setReadout(); }
  function setReadout(){ var txt = ''; if (ST.length){ var n = nearest(+range.value), spacing = ST.length > 1 ? 1000 / (ST.length - 1) : 1000; txt = (n.d < spacing * .42) ? gLabel(n.s.g, n.s.gn) : '· · ·'; } readout.textContent = txt; readout.classList.toggle('dim', !on); }
  function row(i){ var r = REC[i]; return '<li data-rec="' + i + '"' + (on && cur === i ? ' class="on"' : '') + '><button type="button"><span class="rp-play">▶</span><span class="rp-text"><span class="rp-t">' + esc(r.t) + '</span><span class="rp-a">' + esc(r.a) + ' · ' + esc(t('issue')) + ' ' + r.n + '</span></span><span class="rp-mood mood-' + esc(r.mood || 'sakin') + '">' + esc(moodName(r.mood)) + '</span><span class="rp-d">' + fmt(r.dur) + '</span></button></li>'; }
  function renderProgram(){
    var ytHTML = YT.length ? '<p class="rp-sub">' + esc(t('ytReadings')) + ' · ' + YT.length + '</p><ul class="rp-list yt">' + YT.map(function(v, i){ return '<li data-yt="' + i + '"><button type="button"><span class="rp-play">▶</span><span class="rp-text"><span class="rp-t">' + esc(v.t) + '</span><span class="rp-a">' + esc(v.a) + (v.r ? ' · ' + esc(t('readBy')) + ' ' + esc(v.r) : '') + '</span></span><span class="rp-d">YouTube</span></button></li>'; }).join('') + '</ul>' : '';
    program.innerHTML = '<h3 class="rp-title">' + esc(t('program')) + '</h3>' + ytHTML + '<p class="rp-sub">' + esc(t('recordings')) + ' · ' + REC.length + '</p><p class="rp-note">' + esc(t('moodNote')) + '</p>' +
      ST.map(function(s){ return '<p class="rp-genre">' + esc(gLabel(s.g, s.gn)) + '</p><ul class="rp-list">' + s.items.map(row).join('') + '</ul>'; }).join('') +
      '';
  }
  Promise.all([fetch('/assets/audio/radio.json').then(function(r){ return r.json(); }), fetch('/assets/audio/youtube.json').then(function(r){ return r.json(); }).catch(function(){ return []; })]).then(function(res){ REC = res[0] || []; YT = res[1] || []; buildStations(); renderStations(); renderProgram(); needle.style.left = pos(+range.value) + '%'; }).catch(function(){});
  relabel.push(function(){ renderStations(); renderProgram(); if (on && cur >= 0) nowPlaying(REC[cur]); setLive(radio.classList.contains('playing')); });
  function nearest(v){ var best = null; ST.forEach(function(s, i){ var d = Math.abs(stPos(i) - v); if (!best || d < best.d) best = { s: s, d: d, i: i }; }); return best; }
  function startStatic(){ var c = ac(); if (!c || staticSrc) return; var len = c.sampleRate * 2, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; staticSrc = c.createBufferSource(); staticSrc.buffer = b; staticSrc.loop = true; var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = .4; staticGain = c.createGain(); staticGain.gain.value = .08; staticSrc.connect(f); f.connect(staticGain); staticGain.connect(c.destination); staticSrc.start(); }
  function stopStatic(){ try{ staticSrc && staticSrc.stop(); }catch(e){} staticSrc = null; staticGain = null; }
  function mark(){ program.querySelectorAll('li').forEach(function(li){ li.classList.toggle('on', on && li.dataset.rec !== undefined && +li.dataset.rec === cur); }); radio.querySelectorAll('.st').forEach(function(x){ x.classList.toggle('on', on && +x.dataset.i === curSt); }); chips.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', on && +b.dataset.i === curSt); }); setReadout(); }
  function nowPlaying(r){ nowEl.innerHTML = '<span class="st-name">' + esc(t('onAir')) + ' · ' + esc(gLabel(r.g, r.gn)) + ' · ' + esc(moodName(r.mood)) + ' · ' + fmt(r.dur) + '</span><a href="' + esc(r.u) + '">' + esc(r.t) + '</a> — ' + esc(r.a); }
  function play(i){ cur = i; audio.src = REC[i].file; audio.currentTime = 0; audio.play().catch(function(){}); nowPlaying(REC[i]); np.querySelector('b').textContent = REC[i].t; np.querySelector('span').textContent = REC[i].a; mark(); }
  function setLive(state){ radio.classList.toggle('playing', state); if (topMid){ topMid.innerHTML = state ? '<span class="live">' + esc(t('playing')) + '</span>' : esc(t('tune')); } }
  audio.addEventListener('play', function(){ setLive(true); np.querySelector('.np-btn').textContent = '❚❚'; });
  audio.addEventListener('pause', function(){ np.querySelector('.np-btn').textContent = '▶'; if (audio.ended || cur < 0) setLive(false); });
  audio.addEventListener('timeupdate', function(){ var d = audio.duration || (cur >= 0 ? REC[cur].dur : 0); np.querySelector('.np-fill').style.width = (d ? audio.currentTime / d * 100 : 0) + '%'; np.querySelector('.np-time').textContent = fmt(audio.currentTime) + ' / ' + fmt(d); });
  np.querySelector('.np-btn').addEventListener('click', function(e){ e.stopPropagation(); if (cur < 0) return; audio.paused ? audio.play() : audio.pause(); });
  np.querySelector('.np-bar').addEventListener('click', function(e){ e.stopPropagation(); var d = audio.duration; if (!d) return; var b = e.currentTarget.getBoundingClientRect(); audio.currentTime = Math.max(0, Math.min(d, (e.clientX - b.left) / b.width * d)); });
  function tune(){ if (!ST.length) return; var v = +range.value; needle.style.left = pos(v) + '%'; setReadout(); if (!on){ mark(); return; } closeScreen(); var n = nearest(v), spacing = ST.length > 1 ? 1000 / (ST.length - 1) : 1000, near = n.d < spacing * .42; if (staticGain) staticGain.gain.value = near ? .003 : Math.min(.09, .02 + n.d / 6000); if (near && curSt !== n.i){ curSt = n.i; play(ST[n.i].items[0]); } if (!near && curSt >= 0){ curSt = -1; cur = -1; audio.pause(); setLive(false); nowEl.innerHTML = '<span class="st-name">' + esc(t('static')) + '</span>'; } mark(); }
  audio.addEventListener('ended', function(){ if (!on || cur < 0 || curSt < 0) return; var s = ST[curSt], k = s.items.indexOf(cur); if (k < s.items.length - 1){ play(s.items[k + 1]); return; } curSt = (curSt + 1) % ST.length; range.value = Math.round(stPos(curSt)); needle.style.left = pos(+range.value) + '%'; play(ST[curSt].items[0]); });
  function stationOf(i){ for (var k = 0; k < ST.length; k++) if (ST[k].items.indexOf(i) >= 0) return k; return 0; }
  function powerOn(i){ if (!REC.length) return; closeScreen(); on = true; radio.classList.add('on'); startStatic(); if (staticGain) staticGain.gain.value = .003; curSt = stationOf(i); range.value = Math.round(stPos(curSt)); needle.style.left = pos(+range.value) + '%'; renderStations(); play(i); }
  function powerOff(){ on = false; radio.classList.remove('on'); setLive(false); stopStatic(); audio.pause(); cur = -1; curSt = -1; nowEl.innerHTML = ''; closeScreen(); renderStations(); mark(); }
  function newest(){ var best = 0; REC.forEach(function(r, i){ if (r.d > REC[best].d) best = i; }); return best; }
  function closeScreen(){ if (!radio.classList.contains('tv')) return; screen.innerHTML = ''; radio.classList.remove('tv'); }
  function toRadio(){ var top = radio.getBoundingClientRect().top + window.scrollY - 84; if (window.lenis) window.lenis.scrollTo(top, { duration: 1 }); else window.scrollTo({ top: top, behavior: 'smooth' }); }
  function playYT(v, scroll){ on = true; radio.classList.add('on'); audio.pause(); setLive(false); cur = -1; curSt = -1; stopStatic(); radio.classList.add('tv'); renderStations(); mark(); readout.textContent = 'YouTube'; screen.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?autoplay=1&rel=0" title="' + esc(v.t) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><button class="close" type="button">' + esc(t('closeVideo')) + '</button>'; radio.classList.add('tv'); nowEl.innerHTML = '<span class="st-name">YouTube' + (v.r ? ' · ' + esc(t('readBy')) + ' ' + esc(v.r) : '') + '</span>' + esc(v.t) + ' — ' + esc(v.a); screen.querySelector('.close').addEventListener('click', function(ev){ ev.stopPropagation(); closeScreen(); powerOff(); }); if (scroll !== false) toRadio(); }
  chips.addEventListener('click', function(e){ var b = e.target.closest('button'); if (!b) return; e.stopPropagation(); if (b.dataset.yt !== undefined){ playYT(YT[0], false); return; } var si = +b.dataset.i; if (on && curSt === si) return; powerOn(ST[si].items[0]); });
  program.addEventListener('click', function(e){ var li = e.target.closest('li'); if (!li) return; if (li.dataset.rec !== undefined){ if (on && cur === +li.dataset.rec){ audio.paused ? audio.play() : audio.pause(); return; } powerOn(+li.dataset.rec); toRadio(); } else if (li.dataset.yt !== undefined) playYT(YT[+li.dataset.yt], true); });
  range.addEventListener('input', function(){ if (!on){ on = true; radio.classList.add('on'); startStatic(); renderStations(); } tune(); });
  power.addEventListener('click', function(e){ e.stopPropagation(); on ? powerOff() : powerOn(newest()); });
  /* touching the radio body switches it on and plays the newest recording */
  radio.addEventListener('click', function(e){ if (e.target.closest('input, .power, a, .screen, .stations')) return; if (!on) powerOn(newest()); });
  window.addEventListener('pagehide', function(){ if (on){ stopStatic(); audio.pause(); } });
}

/* ================= 13. Fiş kataloğu (/yazilar/) ================= */
var katalog = document.getElementById('katalog');
if (katalog){
  var DR = ['siir', 'hikaye', 'deneme', 'makale', 'biyografi', 'ceviri', 'roportaj', 'sanat', 'editorden', 'gezi', 'hatira', 'mektup'];
  var NAMES = { ceviri: 'Çeviri', sanat: 'Sanat' };
  pieces().then(function(all){
    DR.forEach(function(g){ if (!NAMES[g]){ var p = all.find(function(x){ return x.g === g; }); NAMES[g] = p ? p.gn : g; } });
    var cab = el('div', 'cabinet', DR.map(function(g){ return '<div class="drawer" data-g="' + g + '"><span class="plate">' + esc(NAMES[g]) + '</span><span class="pull"></span></div>'; }).join('')), out = el('div', 'cards-out'); katalog.appendChild(cab); katalog.appendChild(out);
    var openG = null, shown = 0, list = [];
    function ofGenre(g){ return all.filter(function(p){ return g === 'ceviri' ? (p.tr || p.g === 'ceviri') : g === 'sanat' ? /sanat|ebru|kaligrafi|resim|tezhip|gorsel|fotograf/.test(p.g) : p.g === g; }); }
    function card(p){ return '<a class="icard" href="' + esc(p.u) + '" style="--r:' + ((Math.random() * 3 - 1.5).toFixed(1)) + 'deg"><span class="no">№ ' + p.n + ' · ' + esc(p.d.slice(0, 7)) + '</span><span class="t">' + esc(p.t) + '</span><span class="a">' + esc(p.a) + '</span><span class="m">' + esc(p.gn) + '</span></a>'; }
    function more(){ var slice = list.slice(shown, shown + 24); shown += slice.length; var btn = out.querySelector('.more-cards'); if (btn) btn.remove(); out.insertAdjacentHTML('beforeend', slice.map(card).join('')); if (shown < list.length) out.insertAdjacentHTML('beforeend', '<p class="more-cards"><button class="btn ink" type="button">' + esc(t('more')) + ' · ' + (list.length - shown) + '</button></p>'); }
    cab.addEventListener('click', function(e){ var d = e.target.closest('.drawer'); if (!d) return; var g = d.dataset.g; cab.querySelectorAll('.drawer').forEach(function(x){ x.classList.toggle('open', x === d && openG !== g); }); if (openG === g){ openG = null; out.classList.remove('show'); return; } openG = g; list = shuffle(ofGenre(g)); shown = 0; out.innerHTML = ''; out.classList.add('show'); more(); });
    out.addEventListener('click', function(e){ if (e.target.closest('.more-cards button')){ e.preventDefault(); more(); } });
  });
}

/* ================= 14. Sahaf rafı + 15. Zaman helezonu (/arsiv/) ================= */
var sahaf = document.getElementById('sahaf'), zaman = document.getElementById('zaman');
if (sahaf || zaman){
  fetch('/data/issues.json').then(function(r){ return r.json(); }).then(function(issues){
    issues.sort(function(a, b){ return a.n - b.n; });
    var tones = ['#6e1f2a', '#3f2a1f', '#5b6b3e', '#a8792a', '#4a5a6a', '#5a3b5e', '#2f5f5c', '#8a4a2a'];
    function coverHTML(is){ return is.cover ? '<img src="' + esc(is.cover) + '" alt="">' : '<div class="typo">' + String(is.n).padStart(2, '0') + '</div>'; }
    if (sahaf){
      var byY = {}; issues.forEach(function(is){ (byY[is.y] = byY[is.y] || []).push(is); });
      var view = el('div', 'shelf-view');
      sahaf.innerHTML = Object.keys(byY).sort().map(function(y){ return '<div class="shelf"><span class="yr">' + y + '</span>' + byY[y].map(function(is){ return '<div class="spine" data-n="' + is.n + '" style="--s:' + tones[is.n % tones.length] + '"><span>Helezon · ' + esc(t('issue')) + ' ' + is.n + ' · ' + esc(is.label) + '</span></div>'; }).join('') + '</div>'; }).join('');
      sahaf.appendChild(view);
      sahaf.addEventListener('click', function(e){ var sp = e.target.closest('.spine'); if (!sp) return; sahaf.querySelectorAll('.spine').forEach(function(x){ x.classList.toggle('out', x === sp); }); var is = issues.find(function(i){ return i.n === +sp.dataset.n; }); view.innerHTML = coverHTML(is) + '<div><h3>' + esc(t('issue')) + ' ' + is.n + '</h3><p>' + esc(is.label) + ' · ' + is.count + ' yazı</p><a class="btn ink" href="' + esc(is.url) + '">' + esc(t('read')) + '</a></div>'; view.classList.add('show'); sp.closest('.shelf').after(view); view.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
    }
    if (zaman){
      var N = issues.length, W = 600, cx = 300, cy = 300, turns = 4.6; function P(tt){ var a = tt * turns * Math.PI * 2, r = 30 + tt * 240; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
      var path = ''; for (var i = 0; i <= 600; i++){ var q = P(i / 600); path += (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }
      var dots = issues.map(function(is, i){ var q = P(N > 1 ? i / (N - 1) : 0); return '<circle class="dot" data-i="' + i + '" cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="5"><title>' + esc(t('issue')) + ' ' + is.n + ' · ' + esc(is.label) + '</title></circle>'; }).join('');
      zaman.innerHTML = '<div><svg viewBox="0 0 ' + W + ' ' + W + '"><path class="path" d="' + path + '"/>' + dots + '<circle class="mark" id="zmark" r="11"/></svg><input type="range" min="0" max="' + (N - 1) + '" value="' + (N - 1) + '"></div><div class="panel" id="zpanel"></div>';
      var mark = zaman.querySelector('#zmark'), panel = zaman.querySelector('#zpanel'), rng = zaman.querySelector('input');
      function show(i){ var is = issues[i], q = P(N > 1 ? i / (N - 1) : 0); mark.setAttribute('cx', q[0]); mark.setAttribute('cy', q[1]); zaman.querySelectorAll('.dot').forEach(function(d){ d.classList.toggle('on', +d.dataset.i === i); }); panel.innerHTML = coverHTML(is) + '<h3>' + esc(t('issue')) + ' ' + is.n + '</h3><p>' + esc(is.label) + ' · ' + is.count + ' yazı</p><a class="btn ink" href="' + esc(is.url) + '">' + esc(t('read')) + '</a>'; rng.value = i; }
      zaman.addEventListener('click', function(e){ var d = e.target.closest('.dot'); if (d) show(+d.dataset.i); });
      zaman.addEventListener('mouseover', function(e){ var d = e.target.closest('.dot'); if (d) show(+d.dataset.i); });
      rng.addEventListener('input', function(){ show(+rng.value); });
      show(N - 1);
    }
  });
}

/* ================= 16. Tefrika ================= */
var tef = document.getElementById('tefrika');
if (tef){
  var parts = Array.prototype.slice.call(tef.querySelectorAll('.tefrika-part')), total = parts.length, start = +(tef.dataset.start || 0), cur = (((dayNum() - start) % total) + total) % total;
  var stories = {}; parts.forEach(function(p, i){ (stories[p.dataset.story] = stories[p.dataset.story] || []).push(i); });
  function showPart(i){ parts.forEach(function(p, k){ p.hidden = k !== i; }); var p = parts[i], sid = p.dataset.story, idxs = stories[sid], k = idxs.indexOf(i), last = k === idxs.length - 1; document.getElementById('tefMeta').innerHTML = '<span>' + esc(p.dataset.title) + ' — ' + esc(p.dataset.author) + '</span><span>' + esc(t('part')) + ' ' + (k + 1) + ' / ' + idxs.length + '</span>'; document.getElementById('tefNext').textContent = i === cur ? (last ? t('newSerial') : t('tomorrow') + ' · ' + t('part') + ' ' + (k + 2)) : ''; document.getElementById('tefParts').innerHTML = idxs.map(function(j, n){ var unlocked = j <= cur || (j > cur && cur < idxs[0]); return j === i ? '<span class="cur">' + esc(t('part')) + ' ' + (n + 1) + '</span>' : (j <= cur ? '<a href="#" data-p="' + j + '">' + esc(t('part')) + ' ' + (n + 1) + '</a>' : '<span class="locked" title="' + esc(t('locked')) + '">' + esc(t('part')) + ' ' + (n + 1) + ' 🔒</span>'); }).join(''); }
  tef.addEventListener('click', function(e){ var a = e.target.closest('[data-p]'); if (!a) return; e.preventDefault(); showPart(+a.dataset.p); });
  showPart(cur); relabel.push(function(){ showPart(cur); });
}

/* ================= 17. Hatıra defteri ================= */
var defter = document.getElementById('defterList');
if (defter){
  var pendingE = store.get('helezon-hatira-pending', []);
  function entry(e, pend){ return '<div class="entry' + (pend ? ' pending' : '') + '" style="--r:' + ((Math.random() * 2 - 1).toFixed(1)) + 'deg">' + esc(e.m) + '<span class="sig">— ' + esc(e.n) + (e.c ? ', ' + esc(e.c) : '') + (e.d ? ' · ' + esc(e.d) : '') + '</span></div>'; }
  fetch('/data/hatira.json').then(function(r){ return r.json(); }).catch(function(){ return []; }).then(function(list){ function render(){ var html2 = (list || []).map(function(e){ return entry(e, false); }).join('') + pendingE.map(function(e){ return entry(e, true); }).join(''); defter.innerHTML = html2 || '<p class="defter-empty">' + esc(t('gbEmpty')) + '</p>'; } render(); relabel.push(render);
    var form = document.getElementById('defterForm'); form.addEventListener('submit', function(ev){ ev.preventDefault(); var n = form.querySelector('[name=n]').value.trim(), c = form.querySelector('[name=c]').value.trim(), m = form.querySelector('[name=m]').value.trim(); if (!n || m.length < 3) return; var e = { n: n, c: c, m: m, d: new Date().toLocaleDateString('tr-TR') }; pendingE.unshift(e); store.set('helezon-hatira-pending', pendingE.slice(0, 5)); render(); form.classList.add('sending'); setTimeout(function(){ location.href = 'mailto:helezoniletisim@gmail.com?subject=' + encodeURIComponent('Hatıra defteri: ' + n) + '&body=' + encodeURIComponent(m + '\n\n— ' + n + (c ? ', ' + c : '')); form.reset(); form.classList.remove('sending'); }, 1500); }); });
}

applyLabels();
})();
