import json

with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

old_analogies = []
for q in t1_30:
    sub = q.get('subType', '')
    txt = q.get('question', '')
    if sub == 'analogy' or 'is analogous to' in txt:
        old_analogies.append(txt)

print(f"Total old analogies in Tests 1-30: {len(old_analogies)}")
old_stems = set()
for q in old_analogies:
    if 'is analogous to' in q:
        s = q.split('is analogous')[0].strip()
        old_stems.add(s)
    elif ':' in q:
        parts = q.split(':')
        if len(parts) >= 2 and len(parts[1].split()) > 0:
            s = f"{parts[0].strip()} : {parts[1].split()[0].strip()}"
            old_stems.add(s)

print(f"Total unique old stems: {len(old_stems)}")
for s in sorted(old_stems):
    print("  ", s)
