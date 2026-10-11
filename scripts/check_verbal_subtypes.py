import json
import re

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    txt = f.read()
prefix = 'export const NEW_SUITE_VERBAL = '
s = txt.find(prefix) + len(prefix)
e = txt.rfind('};')
new_verbal = json.loads(txt[s:e+1])

# Load tests 1-30 inventory
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)
t1_30_prompts = set(q.get('question', '').strip().lower() for q in t1_30)

subtypes = ['antonym', 'synonym', 'analogy', 'odd_word', 'sentence_completion', 'syllogism']

for st in subtypes:
    print(f"\n=== SUBTYPE: {st.upper()} ===")
    seen = {}
    dups_within = []
    collisions_1_30 = []
    total = 0
    for tid in sorted(new_verbal.keys(), key=int):
        for idx, q in enumerate(new_verbal[tid]):
            if q.get('subType') == st or (st in ['antonym', 'synonym'] and q.get('subType') in ['antonym', 'synonym']):
                total += 1
                prompt = q.get('question', '').strip().lower()
                if prompt in seen:
                    dups_within.append((tid, idx+1, seen[prompt], q.get('question')))
                else:
                    seen[prompt] = (tid, idx+1)
                
                if prompt in t1_30_prompts:
                    collisions_1_30.append((tid, idx+1, q.get('question')))
    
    # avoid double counting antonym/synonym
    if st == 'synonym':
        continue
    print(f"Total {st} questions: {total}")
    print(f"Duplicates within 31-57: {len(dups_within)}")
    for d in dups_within:
        print(f"  Test {d[0]} Q{d[1]} duplicates Test {d[2][0]} Q{d[2][1]}: {d[3]}")
    print(f"Collisions with Tests 1-30: {len(collisions_1_30)}")
    for c in collisions_1_30:
        print(f"  Test {c[0]} Q{c[1]}: {c[2]}")
