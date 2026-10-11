import json
import re

# All target words in 1-30
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)
words_1_30 = set()
for q in t1_30:
    for w in re.findall(r'"([A-Za-z]+)"', q.get('question', '')):
        words_1_30.add(w.upper())

with open('src/data/verbalBank.js', 'r', encoding='utf-8') as f:
    for w in re.findall(r'"([A-Za-z]+)"', f.read()):
        words_1_30.add(w.upper())

# All target words in 31-57
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

print('Target words in 1-30:', len(words_1_30))
print('Distinct target words in 31-57:', len(words_31_57))
multi = {w: locs for w, locs in words_31_57.items() if len(locs) > 1}
print('Target words occurring >1 time in 31-57:', multi)
overlap_1_30 = {w: locs for w, locs in words_31_57.items() if w in words_1_30}
print('Target words overlapping with 1-30:', overlap_1_30)
