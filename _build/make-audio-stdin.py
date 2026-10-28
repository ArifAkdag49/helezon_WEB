import json, os, sys, asyncio, subprocess, edge_tts
jobs = json.loads(sys.stdin.read())
OUT = os.path.join('assets', 'audio'); os.makedirs(OUT, exist_ok=True)
manifest = []
async def main():
    for i, j in enumerate(jobs):
        out = os.path.join(OUT, j['slug'] + '.mp3')
        voice = 'tr-TR-EmelNeural' if i % 3 != 2 else 'tr-TR-AhmetNeural'
        if not os.path.exists(out):
            await edge_tts.Communicate(j['text'], voice, rate='-8%').save(out)
        dur = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout.strip()
        manifest.append({'t': j['t'], 'a': j['a'], 'u': j['u'], 'n': j['n'], 'd': j['d'], 'file': '/assets/audio/' + j['slug'] + '.mp3', 'dur': round(float(dur or 0)), 'voice': 'Emel' if 'Emel' in voice else 'Ahmet'})
        print(i, j['slug'], voice, dur, 's', os.path.getsize(out), 'bytes', flush=True)
    json.dump(manifest, open(os.path.join(OUT, 'radio.json'), 'w', encoding='utf-8'), ensure_ascii=False)
asyncio.run(main())
