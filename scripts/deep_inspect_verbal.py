import json
import re

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    txt = f.read()
prefix = 'export const NEW_SUITE_VERBAL = '
s = txt.find(prefix) + len(prefix)
e = txt.rfind('};')
new_verbal = json.loads(txt[s:e+1])

print(f"Total tests: {len(new_verbal)}")

# 1. Check prompt duplicates across all 459 questions
prompts = {}
for tid, qs in new_verbal.items():
    for idx, q in enumerate(qs):
        p = q.get('question', '').strip().lower()
        if p in prompts:
            print(f"DUPLICATE PROMPT: Test {tid} Q{idx+1} matches Test {prompts[p]['test']} Q{prompts[p]['idx']+1}: '{q.get('question')}'")
        else:
            prompts[p] = {'test': tid, 'idx': idx}

# 2. Check target words in antonyms
target_words = {}
for tid, qs in new_verbal.items():
    for idx, q in enumerate(qs):
        txt_q = q.get('question', '')
        m = re.findall(r'"([A-Za-z]+)"', txt_q)
        for w in m:
            w_up = w.upper()
            if w_up in target_words:
                print(f"DUPLICATE TARGET WORD: '{w_up}' in Test {tid} Q{idx+1} and Test {target_words[w_up]['test']} Q{target_words[w_up]['idx']+1}")
            else:
                target_words[w_up] = {'test': tid, 'idx': idx}

# 3. Check analogy stems
stems = {}
for tid, qs in new_verbal.items():
    for idx, q in enumerate(qs):
        txt_q = q.get('question', '')
        m = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', txt_q)
        for w1, w2 in m:
            pair = f"{w1.upper()} : {w2.upper()}"
            if pair in stems:
                print(f"DUPLICATE ANALOGY STEM: '{pair}' in Test {tid} Q{idx+1} and Test {stems[pair]['test']} Q{stems[pair]['idx']+1}")
            else:
                stems[pair] = {'test': tid, 'idx': idx}

