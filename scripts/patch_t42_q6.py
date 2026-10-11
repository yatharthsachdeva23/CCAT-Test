import json

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_VERBAL = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteVerbalQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteVerbalQuestions")

verbal_data = json.loads(content[start_idx:end_idx+1].strip())

t42_q6 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "SUPERCILIOUS"?',
    "options": [
        {"id": "A", "text": "Arrogant"},
        {"id": "B", "text": "Humble"},
        {"id": "C", "text": "Haughty"},
        {"id": "D", "text": "Disdainful"},
        {"id": "E", "text": "Condescending"}
    ],
    "correctOption": "B",
    "explanation": "**Correct Answer: B** (Humble)\n\nSupercilious means behaving or looking as though one thinks one is superior to others; arrogant or haughty. Humble is its direct opposite.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}

verbal_data["42"][5] = t42_q6

output_code = (
    "// Brand New CCAT Verbal Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n\n"
    + "export const NEW_SUITE_VERBAL = "
    + json.dumps(verbal_data, indent=2)
    + ";\n\n"
    + "export function getNewSuiteVerbalQuestions(testNumber) {\n"
    + "  const list = NEW_SUITE_VERBAL[testNumber] || NEW_SUITE_VERBAL[31];\n"
    + "  return [...list];\n"
    + "}\n"
)

with open('src/data/newSuiteVerbal.js', 'w', encoding='utf-8') as f:
    f.write(output_code)

print("Updated Test 42 Q6 successfully!")
