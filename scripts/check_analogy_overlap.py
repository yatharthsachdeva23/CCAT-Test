import json
import re

# 1. Load Tests 1-30 inventory
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

# Extract all analogy pairs and words from tests 1-30
t1_30_analogy_words = set()
t1_30_analogy_pairs = set()

for q in t1_30:
    q_txt = q.get('question', '')
    cat = q.get('category', '')
    if ':' in q_txt or cat == 'verbal':
        pairs = re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', q_txt)
        for w1, w2 in pairs:
            t1_30_analogy_pairs.add(f"{w1}:{w2}")
            t1_30_analogy_words.add(w1)
            t1_30_analogy_words.add(w2)
        for opt in q.get('options', []):
            opt_txt = opt.get('text', '') if isinstance(opt, dict) else str(opt)
            opairs = re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', opt_txt)
            for w1, w2 in opairs:
                t1_30_analogy_pairs.add(f"{w1}:{w2}")
                t1_30_analogy_words.add(w1)
                t1_30_analogy_words.add(w2)

# Also check verbalBank.js
with open('src/data/verbalBank.js', 'r', encoding='utf-8') as f:
    vb_txt = f.read()
for w1, w2 in re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', vb_txt):
    t1_30_analogy_pairs.add(f"{w1}:{w2}")
    t1_30_analogy_words.add(w1)
    t1_30_analogy_words.add(w2)

print(f"Total analogy pairs in Tests 1-30 & verbalBank: {len(t1_30_analogy_pairs)}")
print(f"Total analogy words in Tests 1-30 & verbalBank: {len(t1_30_analogy_words)}")

# Now load newSuiteVerbal.js
with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    txt = f.read()
prefix = 'export const NEW_SUITE_VERBAL = '
s = txt.find(prefix) + len(prefix)
e = txt.rfind('};')
new_verbal = json.loads(txt[s:e+1])

pair_overlap = []
stem_word_overlap = []

for tid, qs in new_verbal.items():
    for qidx, q in enumerate(qs):
        q_txt = q.get('question', '')
        sub = q.get('subType', '')
        if sub != 'analogy' and ':' not in q_txt:
            continue
        
        # Check pairs in stem
        spairs = re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', q_txt)
        for w1, w2 in spairs:
            p = f"{w1}:{w2}"
            if p in t1_30_analogy_pairs:
                pair_overlap.append((tid, qidx+1, 'stem pair', p))
            if w1 in t1_30_analogy_words or w2 in t1_30_analogy_words:
                stem_word_overlap.append((tid, qidx+1, 'stem word', p, [w for w in (w1, w2) if w in t1_30_analogy_words]))
                
        # Check options
        for opt in q.get('options', []):
            otxt = opt.get('text', '')
            opairs = re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', otxt)
            for w1, w2 in opairs:
                p = f"{w1}:{w2}"
                if p in t1_30_analogy_pairs:
                    pair_overlap.append((tid, qidx+1, f"option {opt.get('id')} pair", p))

print(f"\nExact Pair Overlaps between Tests 31-57 and Tests 1-30: {len(pair_overlap)}")
for x in pair_overlap:
    print("  PAIR OVERLAP:", x)
