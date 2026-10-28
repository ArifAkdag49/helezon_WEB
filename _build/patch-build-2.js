/* build.js: richer entity decoding, foreign flag in pieces.json, fixed tefrika start day */
const fs = require('fs'), path = require('path');
let b = fs.readFileSync(path.join(__dirname, 'build.js'), 'utf8');
function rep(a, r){ if (!b.includes(a)) throw new Error('anchor missing: ' + a.slice(0, 60)); b = b.replace(a, r); }
if (!b.includes('aring:')){
  rep("laquo:'«', raquo:'»', copy:'©', bull:'•' };", "laquo:'«', raquo:'»', copy:'©', bull:'•', aring:'å', Aring:'Å', oslash:'ø', Oslash:'Ø', aelig:'æ', AElig:'Æ', eacute:'é', Eacute:'É', egrave:'è', Egrave:'È', ecirc:'ê', euml:'ë', agrave:'à', aacute:'á', auml:'ä', Auml:'Ä', iacute:'í', igrave:'ì', iuml:'ï', oacute:'ó', ograve:'ò', otilde:'õ', uacute:'ú', ugrave:'ù', ntilde:'ñ', szlig:'ß', yacute:'ý', ccedil:'ç', Ccedil:'Ç', scaron:'š', zcaron:'ž', trade:'™', reg:'®', deg:'°', middot:'·', sbquo:'‚', bdquo:'„', prime:'′', lsaquo:'‹', rsaquo:'›', times:'×' };");
  rep("const index = articles.map(a => ({ t: a.title, a: a.author, g: a.genre, gn: GENRE_NAME[a.genre] || a.genre, tr: a.translation ? 1 : 0,", "const index = articles.map(a => ({ t: a.title, a: a.author, g: a.genre, gn: GENRE_NAME[a.genre] || a.genre, tr: a.translation ? 1 : 0, f: a.foreign ? 1 : 0,");
  rep('<section class="wrap" id="tefrika" style="padding-top:clamp(30px,6vh,60px)">', '<section class="wrap" id="tefrika" data-start="20716" style="padding-top:clamp(30px,6vh,60px)">');
  fs.writeFileSync(path.join(__dirname, 'build.js'), b); console.log('build.js patched (entities, foreign flag, tefrika start)');
} else console.log('already');
console.log('day number today:', Math.floor(Date.now() / 864e5));
