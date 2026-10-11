import json
import re
import glob

terms = ['stanza', 'poem', 'sculptor', 'galvanometer', 'sextant', 'chisel']

print("=== CHECKING ALL SRC/DATA FILES FOR USER TERMS ===")
for f in glob.glob('src/data/*.js'):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    for t in terms:
        matches = list(re.finditer(re.escape(t), txt, re.IGNORECASE))
        if matches:
            print(f"{f}: term '{t}' found {len(matches)} times")
            for m in matches[:5]:
                snippet = txt[max(0, m.start()-40):min(len(txt), m.end()+40)].replace('\n', ' ')
                print(f"    snippet: ...{snippet}...")
