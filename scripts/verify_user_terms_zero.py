import re

terms = [
    'stanza', 'poem', 'poet', 'poetry', 'sculptor', 'sculpture', 
    'galvanometer', 'sextant', 'chisel', 'scalpel', 'surgeon', 
    'barometer', 'telescope', 'astronomer', 'compass'
]

files = [
    'src/data/newSuiteVerbal.js',
    'src/data/newSuiteMath.js',
    'src/data/newSuiteSpatial.js'
]

print("=== CHECKING USER-FLAGGED TERMS IN TESTS 31-57 SUITE FILES ===")
total_found = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    print(f"\nFile: {f}")
    for t in terms:
        # Check whole word match
        matches = list(re.finditer(r'\b' + re.escape(t) + r'\b', txt, re.IGNORECASE))
        if matches:
            print(f"  FOUND '{t}' ({len(matches)} occurrences):")
            for m in matches[:5]:
                snip = txt[max(0, m.start()-40):min(len(txt), m.end()+40)].replace('\n', ' ')
                print(f"      ...{snip}...")
            total_found += len(matches)
        else:
            print(f"  '{t}': 0 (Clean)")

print(f"\nTOTAL OCCURRENCES ACROSS ALL 3 SUITES: {total_found}")
