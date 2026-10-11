import json
import re

# 1. Load Tests 1-30 inventory and verbalBank.js
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

with open('src/data/verbalBank.js', 'r', encoding='utf-8') as f:
    vb_raw = f.read()

# Build comprehensive exclusion sets from Tests 1-30
excluded_pairs = set()
excluded_words = set()
excluded_prompts = set()

# Explicit user flagged terms to completely ban
BANNED_WORDS = {
    'STANZA', 'POEM', 'POET', 'POETRY', 'SCULPTOR', 'SCULPTURE',
    'GALVANOMETER', 'SEXTANT', 'CHISEL', 'SCALPEL', 'SURGEON',
    'BAROMETER', 'TELESCOPE', 'ASTRONOMER', 'COMPASS', 'ASTROLABE'
}

for q in t1_30:
    excluded_prompts.add(q.get('question', '').strip().lower())
    for p in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', json.dumps(q)):
        excluded_pairs.add(f"{p[0].upper()} : {p[1].upper()}")
        excluded_words.add(p[0].upper())
        excluded_words.add(p[1].upper())
    for w in re.findall(r'"([A-Za-z]+)"', q.get('question', '')):
        excluded_words.add(w.upper())

for p in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', vb_raw):
    excluded_pairs.add(f"{p[0].upper()} : {p[1].upper()}")
    excluded_words.add(p[0].upper())
    excluded_words.add(p[1].upper())

print(f"Excluded pairs from 1-30: {len(excluded_pairs)}")
print(f"Excluded individual words from 1-30 analogies: {len(excluded_words)}")

# Now examine unique_analogies_data.py
import sys
sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA

print(f"Total items in ANALOGY_DATA: {len(ANALOGY_DATA)}")

flagged_indices = []
seen_stems = {}

for idx, (stem, correct, dists, expl) in enumerate(ANALOGY_DATA):
    reasons = []
    
    # 1. Check duplicate stem in ANALOGY_DATA
    if stem in seen_stems:
        reasons.append(f"Duplicate stem with index {seen_stems[stem]}")
    else:
        seen_stems[stem] = idx
        
    # 2. Check stem in excluded_pairs
    if stem.upper() in excluded_pairs:
        reasons.append(f"Stem '{stem}' was in Tests 1-30")
        
    # 3. Check correct in excluded_pairs
    if correct.upper() in excluded_pairs:
        reasons.append(f"Correct '{correct}' was in Tests 1-30")
        
    # 4. Check dists in excluded_pairs
    for d in dists:
        if d.upper() in excluded_pairs:
            reasons.append(f"Distractor '{d}' was in Tests 1-30")
            
    # 5. Check banned words
    all_text = f"{stem} {correct} {' '.join(dists)} {expl}".upper()
    for bw in BANNED_WORDS:
        if re.search(r'\b' + bw + r'\b', all_text):
            reasons.append(f"Contains banned word '{bw}'")
            
    if reasons:
        flagged_indices.append((idx, stem, reasons))

print(f"\nTotal flagged analogies in ANALOGY_DATA: {len(flagged_indices)}")
for idx, stem, reasons in flagged_indices:
    print(f"Index {idx:3d} ({stem}): {'; '.join(reasons)}")
