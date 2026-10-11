import json
import re

# 1. Load Tests 1-30 inventory
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

# Collect all analogy pairs in Tests 1-30 (both stems and option pairs)
old_pairs = set()
old_stems = set()
for q in t1_30:
    txt = q.get('question', '')
    if ':' in txt:
        # e.g. "FOO : BAR is analogous to:"
        parts = txt.split('is analogous')[0].strip()
        m = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', parts)
        for w1, w2 in m:
            old_stems.add(f"{w1.upper()} : {w2.upper()}")
            old_pairs.add(f"{w1.upper()} : {w2.upper()}")
            
    for opt in q.get('options', []):
        opt_txt = opt.get('text', '')
        if ':' in opt_txt:
            m = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', opt_txt)
            for w1, w2 in m:
                old_pairs.add(f"{w1.upper()} : {w2.upper()}")

print(f"Total old stems in Tests 1-30: {len(old_stems)}")
print(f"Total old pairs in Tests 1-30: {len(old_pairs)}")
print("Sample old stems:", list(sorted(old_stems))[:15])

# 2. Check ANALOGY_DATA in unique_analogies_data.py
import sys
sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA

colliding_indices = []
for idx, (stem, correct, dists, exp) in enumerate(ANALOGY_DATA):
    stem_p = stem.upper().strip()
    corr_p = correct.upper().strip()
    
    issues = []
    if stem_p in old_stems:
        issues.append(f"Stem '{stem_p}' was a stem in Tests 1-30")
    elif stem_p in old_pairs:
        issues.append(f"Stem '{stem_p}' was a pair in Tests 1-30")
        
    if corr_p in old_stems:
        issues.append(f"Correct '{corr_p}' was a stem in Tests 1-30")
    elif corr_p in old_pairs:
        issues.append(f"Correct '{corr_p}' was a pair in Tests 1-30")
        
    for d in dists:
        d_p = d.upper().strip()
        if d_p in old_pairs:
            issues.append(f"Distractor '{d_p}' was in Tests 1-30")
            
    if issues:
        colliding_indices.append((idx, stem, correct, issues))

print(f"\nTotal colliding analogies in ANALOGY_DATA: {len(colliding_indices)} / 162")
for idx, stem, corr, issues in colliding_indices:
    print(f"\nItem {idx} (Test {31 + idx // 6} slot {idx % 6 + 1}): {stem} -> {corr}")
    for iss in issues:
        print(f"  - {iss}")
