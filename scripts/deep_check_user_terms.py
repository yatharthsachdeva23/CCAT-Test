import json
import re

# Load all questions in Tests 1 to 30
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

# Extract all vocabulary words, analogy pairs, and option texts from Tests 1 to 30
old_pairs = set()
old_words = set()

for q in t1_30:
    q_txt = q.get('question', '')
    # Extract pairs like A : B
    for match in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', q_txt):
        old_pairs.add(f"{match[0].upper()} : {match[1].upper()}")
        old_words.add(match[0].upper())
        old_words.add(match[1].upper())
        
    for opt in q.get('options', []):
        opt_txt = opt.get('text', '')
        for match in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', opt_txt):
            old_pairs.add(f"{match[0].upper()} : {match[1].upper()}")
            old_words.add(match[0].upper())
            old_words.add(match[1].upper())
        # Add single vocab words
        for w in re.findall(r'[A-Za-z]{4,}', opt_txt):
            old_words.add(w.upper())
            
    # Also words in question
    for w in re.findall(r'[A-Za-z]{4,}', q_txt):
        old_words.add(w.upper())

print(f"Total old pairs in Tests 1-30: {len(old_pairs)}")
print(f"Total old vocabulary tokens: {len(old_words)}")

# Now check unique_analogies_data.py
import sys
sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA

print(f"\nChecking all 162 items in ANALOGY_DATA:")
flagged_items = []
for idx, item in enumerate(ANALOGY_DATA):
    stem, correct, dists, exp = item
    stem_words = [w.upper() for w in re.findall(r'[A-Za-z]+', stem)]
    corr_words = [w.upper() for w in re.findall(r'[A-Za-z]+', correct)]
    
    # Check if exact pair was in old_pairs
    stem_pair = stem.upper().strip()
    corr_pair = correct.upper().strip()
    
    reasons = []
    if stem_pair in old_pairs:
        reasons.append(f"Stem '{stem_pair}' was an exact pair in Tests 1-30")
    if corr_pair in old_pairs:
        reasons.append(f"Correct '{corr_pair}' was an exact pair in Tests 1-30")
        
    for d in dists:
        d_pair = d.upper().strip()
        if d_pair in old_pairs:
            reasons.append(f"Distractor '{d_pair}' was an exact pair in Tests 1-30")
            
    # Check if key words like STANZA, POEM, SCULPTOR, SEXTANT appeared
    for kw in ['STANZA', 'POEM', 'SCULPTOR', 'CHISEL', 'SEXTANT', 'GALVANOMETER']:
        if kw in stem_words or kw in corr_words:
            reasons.append(f"Contains keyword '{kw}' which user specifically remembered from earlier tests")
            
    if reasons:
        flagged_items.append((idx, stem, correct, reasons))

print(f"\nFlagged items ({len(flagged_items)} items):")
for idx, stem, corr, reasons in flagged_items:
    print(f"Index {idx} (Test {31 + idx // 6} Q{idx % 6 + 7}): {stem} -> {corr}")
    for r in reasons:
        print(f"   * {r}")
