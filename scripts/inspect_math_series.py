import json

with open('src/data/newSuiteMath.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_MATH = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteMathQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteMathQuestions")

math_data = json.loads(content[start_idx:end_idx+1].strip())
for i in [10, 11, 12, 13]:
    print(f"Index {i}: {math_data['31'][i]['question']}")
