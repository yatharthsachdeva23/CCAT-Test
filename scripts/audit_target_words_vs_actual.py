import json
import re

with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

actual_words_1_30 = set()
for q in t1_30:
    for w in re.findall(r'"([A-Za-z]+)"', q.get('question', '')):
        actual_words_1_30.add(w.upper())

print(f"Target words actually tested in Tests 1-30: {len(actual_words_1_30)}")

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    txt = f.read()
prefix = 'export const NEW_SUITE_VERBAL = '
s = txt.find(prefix) + len(prefix)
e = txt.rfind('};')
new_verbal = json.loads(txt[s:e+1])

words_31_57 = {}
for tid, qs in new_verbal.items():
    for idx, q in enumerate(qs):
        for w in re.findall(r'"([A-Za-z]+)"', q.get('question', '')):
            w_up = w.upper()
            words_31_57.setdefault(w_up, []).append((tid, idx+1))

overlap = {w: locs for w, locs in words_31_57.items() if w in actual_words_1_30}
print(f"Target words in 31-57 that were in Tests 1-30 questions: {len(overlap)}")
for w, locs in overlap.items():
    print(f"  {w}: {locs}")
