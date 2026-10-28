import sys, json, asyncio, edge_tts
job = json.loads(sys.stdin.read()); voice = sys.argv[1]; rate = sys.argv[2] if len(sys.argv) > 2 else '-8%'; pitch = sys.argv[3] if len(sys.argv) > 3 else '+0Hz'
async def main():
    out = sys.stdout.buffer
    async for chunk in edge_tts.Communicate(job['text'], voice, rate=rate, pitch=pitch).stream():
        if chunk['type'] == 'audio': out.write(chunk['data'])
    out.flush()
asyncio.run(main())
