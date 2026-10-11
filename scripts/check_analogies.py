import json

with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

old_stems = set()
for q in t1_30:
    txt = q.get('question', '')
    if 'is analogous to' in txt:
        s = txt.split('is analogous')[0].strip()
        old_stems.add(s)
    elif ':' in txt and ('?' in txt or 'analogous' in txt.lower()):
        # Extract pair before question
        parts = txt.split(':')
        if len(parts) >= 2:
            s = f"{parts[0].strip()} : {parts[1].split()[0].strip()}"
            old_stems.add(s)

print(f"Total old stems found in Tests 1-30: {len(old_stems)}")
for s in sorted(old_stems)[:20]:
    print("  ", s)

import sys
sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA

print(f"Total items in ANALOGY_DATA: {len(ANALOGY_DATA)}")

# Check duplicate stems in ANALOGY_DATA
seen_stems = {}
for i, item in enumerate(ANALOGY_DATA):
    stem = item[0]
    if stem in seen_stems:
        print(f"Duplicate stem in ANALOGY_DATA: '{stem}' at idx {i} (already at {seen_stems[stem]})")
    else:
        seen_stems[stem] = i

# Check collision between ANALOGY_DATA and old_stems
for i, item in enumerate(ANALOGY_DATA):
    stem = item[0].upper().strip()
    for old in old_stems:
        if stem == old.upper().strip():
            print(f"Collision with Tests 1-30 at idx {i}: '{stem}' == '{old}'")
