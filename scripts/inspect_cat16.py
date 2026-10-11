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

# Inspect index 15 (Cat 16)
seen = {}
for t in range(31, 58):
    q15 = math_data[str(t)][15]
    txt = q15['question']
    tmpl = re.sub(r'\b\d+(\.\d+)?%?\b', 'NUM', txt)
    if tmpl in seen:
        print(f"Test {t} Cat 16 matches Test {seen[tmpl]}: '{txt}'")
    else:
        seen[tmpl] = t
