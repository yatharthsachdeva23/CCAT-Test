import json
import os

terms = ['stanza', 'poem', 'sculptor', 'galvanometer', 'sextant', 'chisel']

# 1. Check tests 1-30 inventory
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

print('=== CHECKING TESTS 1-30 INVENTORY ===')
found_in_1_30 = []
for q in t1_30:
    q_str = json.dumps(q).lower()
    for term in terms:
        if term in q_str:
            found_in_1_30.append((term, q.get("testId"), q.get("question")))

print(f"Found {len(found_in_1_30)} occurrences in Tests 1-30:")
for term, t_id, q_text in found_in_1_30:
    print(f"  [{term}] in {t_id}: {q_text[:70]}")

# 2. Check verbalBank.js and questionPool.js
print('\n=== CHECKING OLD BANKS (verbalBank.js, questionPool.js) ===')
for path in ['src/data/verbalBank.js', 'src/data/questionPool.js']:
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            txt = f.read().lower()
            for term in terms:
                if term in txt:
                    print(f"  Found '{term}' in {path}")

# 3. Check git history or previous files if any
print('\n=== CHECKING ALL SCRIPTS IN scripts/ ===')
for f in os.listdir('scripts'):
    if f.endswith(('.js', '.py', '.json')) and f != 'unique_analogies_data.py':
        p = os.path.join('scripts', f)
        try:
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                txt = fp.read().lower()
                for term in terms:
                    if term in txt:
                        print(f"  Found '{term}' in {f}")
        except Exception:
            pass
