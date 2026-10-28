const fs=require("fs");let h=fs.readFileSync("index.html","utf8");
const add={"Çeviren":["59. sayının tamamı","Tüm yazılar · 2021'den beri"],"Translated by":["The full issue 59","All pieces · since 2021"],"Übersetzt von":["Die ganze Ausgabe 59","Alle Texte · seit 2021"],"Traduit par":["Le numéro 59 en entier","Tous les textes · depuis 2021"],"ترجمة":["العدد 59 كاملًا","كل النصوص · منذ 2021"],"Traducido por":["El número 59 completo","Todos los textos · desde 2021"],"Перевод":["Весь номер 59","Все тексты · с 2021 года"]};
let n=0;Object.entries(add).forEach(([k,[a,b]])=>{const needle='transBy:"'+k+'"}';if(h.includes(needle)){n++;h=h.replace(needle,'transBy:"'+k+'",fullIssue:"'+a+'",allPieces:"'+b+'"}')}else console.log("missing",k)});
fs.writeFileSync("index.html",h);console.log("patched",n,"languages");
console.log("remaining external links:",[...new Set((h.match(/href="https:\/\/helezondergisi\.com\/[^"]*"/g)||[]))].join(" | "));
