import json, re, os, asyncio, html, subprocess
from html.parser import HTMLParser
import edge_tts
ROOT = os.getcwd()
pieces = json.load(open(os.path.join(ROOT, 'data', 'pieces.json'), encoding='utf-8'))
poems = [p for p in pieces if p['g'] == 'siir' and not p.get('f') and not re.search(r'[\u0400-\u04FF]', p['t'] + p.get('s', ''))]
poems = poems[:7]  # newest first
class Body(HTMLParser):
    def __init__(self):
        super().__init__(); self.inb = False; self.depth = 0; self.paras = []; self.cur = []; self.inp = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'div' and 'art-body' in (a.get('class') or ''): self.inb = True; self.depth = 1; return
        if self.inb:
            if tag == 'div': self.depth += 1
            if tag == 'p': self.inp = True; self.cur = []; self.stanza = 'stanza' in (a.get('class') or '')
    def handle_endtag(self, tag):
        if not self.inb: return
        if tag == 'p' and self.inp:
            self.inp = False; txt = html.unescape(''.join(self.cur)).strip()
            self.paras.append('' if self.stanza else txt)
        if tag == 'div':
            self.depth -= 1
            if self.depth == 0: self.inb = False
    def handle_data(self, d):
        if self.inp: self.cur.append(d)
manifest = []
async def main():
    for i, p in enumerate(poems):
        slug = p['u'].strip('/').split('/')[-1]
        f = os.path.join(ROOT, 'yazi', slug, 'index.html')
        b = Body(); b.feed(open(f, encoding='utf-8').read())
        lines = [x for x in b.paras]
        # stanza breaks -> longer pause
        text_lines = []
        for x in lines:
            if x == '': text_lines.append('') 
            else: text_lines.append(x if re.search(r'[.!?…:;,]$', x) else x + ',')
        body = '\n'.join(text_lines).replace('\n\n', '.\n\n')
        text = f"{p['t']}. {p['a']}.\n\n{body}"
        out = os.path.join(ROOT, 'assets', 'audio', slug + '.mp3')
        voice = 'tr-TR-EmelNeural' if i % 3 != 2 else 'tr-TR-AhmetNeural'
        if not os.path.exists(out):
            tts = edge_tts.Communicate(text, voice, rate='-8%')
            await tts.save(out)
        dur = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout.strip()
        manifest.append({'t': p['t'], 'a': p['a'], 'u': p['u'], 'n': p['n'], 'd': p['d'], 'file': '/assets/audio/' + slug + '.mp3', 'dur': round(float(dur or 0)), 'voice': 'Emel' if 'Emel' in voice else 'Ahmet', 'chars': len(text)})
        print(i, slug, voice, dur, 's', os.path.getsize(out), 'bytes')
    json.dump(manifest, open(os.path.join(ROOT, 'assets', 'audio', 'radio.json'), 'w', encoding='utf-8'), ensure_ascii=False)
asyncio.run(main())
