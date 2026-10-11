import json

with open('src/data/newSuiteMath.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_MATH = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteMathQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteMathQuestions")

math_data = json.loads(content[start_idx:end_idx+1].strip())

custom_phrasing = {
    "38": "Calculate the acute angle formed by the hour and minute hands of an analog clock at 9:30:",
    "40": "Determine the integer remainder obtained when the power \(2^{35}\) is divided by 7:",
    "46": "Find the measure of the smaller angle between the two clock hands at 5:24:",
    "47": "Calculate the remainder resulting from dividing \(5^{100}\) by 3:",
    "50": "Determine the final units digit in the expansion of \(3^{55}\):",
    "51": "What is the degree measure of the angle separating the hour and minute hands at 10:10?",
    "52": "Evaluate the remainder when the exponential term \(4^{30}\) is divided by 7:",
    "53": "Find the angle subtended between the hands of an analog clock displaying 11:20:",
    "54": "Find the value of the units digit when \(8^{34}\) is calculated:",
    "56": "Determine the angle formed by the hour hand and minute hand at 12:30:",
    "57": "Find the modulo remainder when \(6^{50}\) is divided by 5:"
}

for t_id, new_q in custom_phrasing.items():
    math_data[t_id][15]['question'] = new_q

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

print("Updated cat16 templates in newSuiteMath.js successfully!")
