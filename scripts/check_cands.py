import json

with open('scripts/old_tests_questions.json', 'r', encoding='utf-8') as f:
    old_prompts = set(json.load(f)['questions'])

with open('scripts/build_new_verbal_bank.py', 'r', encoding='utf-8') as f:
    text = f.read()

candidates = ['ALACRITY', 'BELLICOSE', 'CALUMNY', 'DIFFIDENT', 'EQUANIMITY', 'FECUND', 'GREGARIOUS', 'HACKNEYED', 'ICONOCLAST']
for c in candidates:
    in_new = f'"{c}"' in text
    in_old = any(c.lower() in q.lower() for q in old_prompts)
    print(f'{c}: in_new={in_new}, in_old={in_old}')
