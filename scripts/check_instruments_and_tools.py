import re

target_words = [
    'stanza', 'poem', 'poet', 'poetry', 'sculptor', 'sculpture', 
    'galvanometer', 'sextant', 'chisel', 'barometer', 'telescope', 
    'scalpel', 'surgeon', 'astronomer', 'compass', 'astrolabe',
    'thermometer', 'anemometer', 'altimeter'
]

files = [
    'src/data/newSuiteVerbal.js',
    'src/data/newSuiteMath.js',
    'src/data/newSuiteSpatial.js'
]

print("=== CHECKING INSTRUMENT / POETRY / TOOL WORDS IN TESTS 31-57 ===")
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    print(f"\n--- In {fpath} ---")
    for w in target_words:
        matches = list(re.finditer(r'\b' + re.escape(w) + r'\b', txt, re.IGNORECASE))
        if matches:
            print(f"Word '{w}': found {len(matches)} times")
            for m in matches[:3]:
                snip = txt[max(0, m.start()-30):min(len(txt), m.end()+30)].replace('\n', ' ')
                print(f"    {snip}")
