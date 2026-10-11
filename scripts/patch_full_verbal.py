import sys
import json
import re

sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_VERBAL = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteVerbalQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteVerbalQuestions")

verbal_data = json.loads(content[start_idx:end_idx+1].strip())

letters = ['A', 'B', 'C', 'D', 'E']

# 1. Update all 162 analogies
analogy_idx = 0
for test_num in range(31, 58):
    test_key = str(test_num)
    test_qs = verbal_data[test_key]
    
    analogy_slots = [i for i, q in enumerate(test_qs) if q.get('subType') == 'analogy']
    for slot in analogy_slots:
        stem, correct, dists, explanation = ANALOGY_DATA[analogy_idx]
        target_pos = analogy_idx % 5
        target_letter = letters[target_pos]
        
        opts_list = []
        d_i = 0
        for pos, ltr in enumerate(letters):
            if pos == target_pos:
                opts_list.append({"id": ltr, "text": correct})
            else:
                opts_list.append({"id": ltr, "text": dists[d_i]})
                d_i += 1
                
        q_obj = {
            "question": f"{stem} is analogous to:",
            "options": opts_list,
            "correctOption": target_letter,
            "explanation": f"**Correct Answer: {target_letter}** ({correct})\n\n{explanation}\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
            "category": "verbal",
            "subType": "analogy"
        }
        test_qs[slot] = q_obj
        analogy_idx += 1

print(f"Patched {analogy_idx} analogy questions.")

# 2. Update 5 Antonym questions
# Test 32 Q5: PUSILLANIMOUS
t32_q5 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "PUSILLANIMOUS"?',
    "options": [
        {"id": "A", "text": "Spineless"},
        {"id": "B", "text": "Cowardly"},
        {"id": "C", "text": "Courageous"},
        {"id": "D", "text": "Craven"},
        {"id": "E", "text": "Fearful"}
    ],
    "correctOption": "C",
    "explanation": "**Correct Answer: C** (Courageous)\n\nPusillanimous means lacking courage or resolution; cowardly. Courageous is its direct antonym.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}
verbal_data["32"][4] = t32_q5

# Test 36 Q3: PELLUCID
t36_q3 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "PELLUCID"?',
    "options": [
        {"id": "A", "text": "Limpid"},
        {"id": "B", "text": "Turbid"},
        {"id": "C", "text": "Crystalline"},
        {"id": "D", "text": "Sheer"},
        {"id": "E", "text": "Transparent"}
    ],
    "correctOption": "B",
    "explanation": "**Correct Answer: B** (Turbid)\n\nPellucid means translucently clear or easily understood. Turbid means cloudy, opaque, or thick with suspended matter.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}
verbal_data["36"][2] = t36_q3

# Test 39 Q1: MUNIFICENT
t39_q1 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "MUNIFICENT"?',
    "options": [
        {"id": "A", "text": "Bountiful"},
        {"id": "B", "text": "Lavish"},
        {"id": "C", "text": "Parsimonious"},
        {"id": "D", "text": "Generous"},
        {"id": "E", "text": "Liberal"}
    ],
    "correctOption": "C",
    "explanation": "**Correct Answer: C** (Parsimonious)\n\nMunificent means characterized by great generosity. Parsimonious means unwilling to spend money or use resources; stingy.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}
verbal_data["39"][0] = t39_q1

# Test 42 Q6: SALUBRIOUS
t42_q6 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "SALUBRIOUS"?',
    "options": [
        {"id": "A", "text": "Wholesome"},
        {"id": "B", "text": "Unwholesome"},
        {"id": "C", "text": "Beneficial"},
        {"id": "D", "text": "Salutary"},
        {"id": "E", "text": "Restorative"}
    ],
    "correctOption": "B",
    "explanation": "**Correct Answer: B** (Unwholesome)\n\nSalubrious means health-giving; healthy. Unwholesome is its direct opposite.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}
verbal_data["42"][5] = t42_q6

# Test 49 Q4: FECUND
t49_q4 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "FECUND"?',
    "options": [
        {"id": "A", "text": "Prolific"},
        {"id": "B", "text": "Sterile"},
        {"id": "C", "text": "Fruitful"},
        {"id": "D", "text": "Teeming"},
        {"id": "E", "text": "Productive"}
    ],
    "correctOption": "B",
    "explanation": "**Correct Answer: B** (Sterile)\n\nFecund means producing or capable of producing abundant growth or offspring; fertile. Sterile means barren or unproductive.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}
verbal_data["49"][3] = t49_q4

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

print("Saved newSuiteVerbal.js successfully!")
