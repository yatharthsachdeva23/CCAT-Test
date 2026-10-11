import json
import re

with open('src/data/newSuiteMath.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_MATH = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteMathQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteMathQuestions")

math_data = json.loads(content[start_idx:end_idx+1].strip())

print(f"Total tests in NEW_SUITE_MATH: {len(math_data)}")

# Check duplicate question texts
seen_questions = {}
duplicate_math = []

for t_id, qs in math_data.items():
    for q_idx, q in enumerate(qs):
        txt = q.get('question', '').strip()
        if txt in seen_questions:
            duplicate_math.append((t_id, q_idx + 1, seen_questions[txt], txt))
        else:
            seen_questions[txt] = (t_id, q_idx + 1)

print(f"Total math questions: {len(seen_questions) + len(duplicate_math)}")
print(f"Unique math questions: {len(seen_questions)}")
print(f"Duplicate math questions: {len(duplicate_math)}")

# Check collisions with Tests 1-30
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

old_math = set(q.get('question', '').strip().lower() for q in t1_30 if q.get('category') == 'math')

collisions = []
for txt, loc in seen_questions.items():
    if txt.lower() in old_math:
        collisions.append((loc, txt))

print(f"Collisions with Tests 1-30 math questions: {len(collisions)}")

# Check scenario templates (ignoring numbers)
templates = {}
template_dups = []
for txt, loc in seen_questions.items():
    # replace numbers with X
    tmpl = re.sub(r'\b\d+(\.\d+)?%?\b', 'NUM', txt)
    tmpl = re.sub(r'\$NUM', 'NUM', tmpl)
    if tmpl in templates:
        template_dups.append((loc, templates[tmpl], tmpl[:60]))
    else:
        templates[tmpl] = loc

print(f"Unique scenario templates (with numbers masked): {len(templates)} / 594")
print(f"Cloned templates across tests: {len(template_dups)}")
if template_dups:
    print("Sample cloned templates:")
    for d in template_dups[:5]:
        print(f"  {d[0]} matches {d[1]}: {d[2]}...")
