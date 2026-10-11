import json

with open('src/data/newSuiteMath.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_MATH = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteMathQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteMathQuestions")

math_data = json.loads(content[start_idx:end_idx+1].strip())
math_data["51"][17]["question"] = "Find the remainder obtained upon dividing \(5^{23}\) by 4:"

output_code = (
    "// Brand New CCAT Math Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n\n"
    + "export const NEW_SUITE_MATH = "
    + json.dumps(math_data, indent=2)
    + ";\n\n"
    + "export function getNewSuiteMathQuestions(testNumber) {\n"
    + "  const list = NEW_SUITE_MATH[testNumber] || NEW_SUITE_MATH[31];\n"
    + "  return [...list];\n"
    + "}\n"
)

with open('src/data/newSuiteMath.js', 'w', encoding='utf-8') as f:
    f.write(output_code)

print("Updated Test 51 Q18 successfully!")
