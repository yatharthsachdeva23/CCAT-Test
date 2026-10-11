import json
import re
import sys

with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

with open('src/data/verbalBank.js', 'r', encoding='utf-8') as f:
    vb_raw = f.read()

excluded_pairs = set()
for q in t1_30:
    for p in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', json.dumps(q)):
        excluded_pairs.add(f"{p[0].upper()} : {p[1].upper()}")

for p in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', vb_raw):
    excluded_pairs.add(f"{p[0].upper()} : {p[1].upper()}")

BANNED_WORDS = {
    'STANZA', 'POEM', 'POET', 'POETRY', 'SCULPTOR', 'SCULPTURE',
    'GALVANOMETER', 'SEXTANT', 'CHISEL', 'SCALPEL', 'SURGEON',
    'BAROMETER', 'TELESCOPE', 'ASTRONOMER', 'COMPASS', 'ASTROLABE'
}

sys.path.insert(0, 'scripts')
from pristine_analogies_data import ANALOGY_DATA

print("=== AUDITING PRISTINE ANALOGIES DATA ===")
print(f"Total count: {len(ANALOGY_DATA)}")

stems = set()
corrects = set()
banned_matches = []
collisions = []
internal_opt_dups = []

for idx, (stem, correct, dists, expl) in enumerate(ANALOGY_DATA):
    if stem in stems:
        print(f"DUPLICATE STEM at {idx}: {stem}")
    stems.add(stem)
    
    if correct in corrects:
        print(f"DUPLICATE CORRECT at {idx}: {correct}")
    corrects.add(correct)
    
    opts = [correct] + dists
    if len(set(opts)) != 5:
        internal_opt_dups.append((idx, stem, opts))
        
    all_txt = f"{stem} {correct} {' '.join(dists)} {expl}".upper()
    for bw in BANNED_WORDS:
        if re.search(r'\b' + bw + r'\b', all_txt):
            banned_matches.append((idx, bw, stem))
            
    for p in opts + [stem]:
        if p.upper() in excluded_pairs:
            collisions.append((idx, p, stem))

print(f"Unique stems: {len(stems)} / 162")
print(f"Unique correct answers: {len(corrects)} / 162")
print(f"Banned word occurrences: {len(banned_matches)}")
if banned_matches:
    print("Banned occurrences:", banned_matches)
print(f"Collisions with Tests 1-30 pairs: {len(collisions)}")
if collisions:
    print("Collisions:", collisions)
print(f"Duplicate options within questions: {len(internal_opt_dups)}")

if len(stems) == 162 and len(corrects) == 162 and len(banned_matches) == 0 and len(collisions) == 0 and len(internal_opt_dups) == 0:
    print("\nPERFECT! 100% PRISTINE AND WATERTIGHT!")
else:
    print("\nISSUES FOUND!")
