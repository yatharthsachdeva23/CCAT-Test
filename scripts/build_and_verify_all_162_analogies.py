import json
import re

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

import sys
sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA
from generate_43_pristine_analogies import valid as candidate_pool

clean_stems = set()
final_162 = []
cand_idx = 0

for idx, item in enumerate(ANALOGY_DATA):
    stem, correct, dists, expl = item
    all_text = f"{stem} {correct} {' '.join(dists)} {expl}".upper()
    has_banned = any(re.search(r'\b' + bw + r'\b', all_text) for bw in BANNED_WORDS)
    in_pairs = (stem.upper() in excluded_pairs or correct.upper() in excluded_pairs or any(d.upper() in excluded_pairs for d in dists))
    is_dup_stem = stem in clean_stems
    
    if not has_banned and not in_pairs and not is_dup_stem:
        final_162.append(item)
        clean_stems.add(stem)
    else:
        rep_item = candidate_pool[cand_idx]
        cand_idx += 1
        final_162.append(rep_item)
        clean_stems.add(rep_item[0])

print(f"Total compiled analogies: {len(final_162)} (Clean retained: {162 - cand_idx}, Replaced: {cand_idx})")

# Comprehensive Verification of all 162
stems = set()
corrects = set()
collisions_1_30 = 0
banned_found = 0
internal_dups = 0

for i, (stem, correct, dists, expl) in enumerate(final_162):
    if stem in stems:
        print(f"DUPLICATE STEM: {stem} at index {i}")
        internal_dups += 1
    stems.add(stem)
    
    if correct in corrects:
        print(f"DUPLICATE CORRECT: {correct} at index {i}")
        internal_dups += 1
    corrects.add(correct)
    
    all_text = f"{stem} {correct} {' '.join(dists)} {expl}".upper()
    for bw in BANNED_WORDS:
        if re.search(r'\b' + bw + r'\b', all_text):
            print(f"BANNED WORD '{bw}' at index {i}: {stem}")
            banned_found += 1
            
    for p in ([stem, correct] + dists):
        if p.upper() in excluded_pairs:
            print(f"COLLISION WITH 1-30: '{p}' at index {i}: {stem}")
            collisions_1_30 += 1

print("\n--- FINAL 162 ANALOGIES AUDIT ---")
print(f"Total items:                    {len(final_162)}")
print(f"Unique stems:                   {len(stems)} / 162")
print(f"Internal duplicate errors:      {internal_dups}")
print(f"Banned word errors:             {banned_found}")
print(f"Collisions with Tests 1-30:     {collisions_1_30}")

if internal_dups == 0 and banned_found == 0 and collisions_1_30 == 0:
    print("\nSUCCESS! All 162 analogies are 100% PRISTINE, UNIQUE, and ZERO OVERLAP!")
    # Save to a pristine data module
    with open('scripts/pristine_analogies_data.py', 'w', encoding='utf-8') as f:
        f.write("#!/usr/bin/env python3\n# 162 100% PRISTINE ANALOGIES (Zero collisions with Tests 1-30, Zero banned words, 100% unique)\n\nANALOGY_DATA = " + repr(final_162) + "\n")
    print("Saved scripts/pristine_analogies_data.py successfully!")
else:
    print("\nFAILED AUDIT!")
