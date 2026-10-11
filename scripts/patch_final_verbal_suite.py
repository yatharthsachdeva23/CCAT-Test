import sys
import json
import re

sys.path.insert(0, 'scripts')
from pristine_analogies_data import ANALOGY_DATA

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_VERBAL = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteVerbalQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteVerbalQuestions")

verbal_data = json.loads(content[start_idx:end_idx+1].strip())

letters = ['A', 'B', 'C', 'D', 'E']

# 1. Update all 162 analogies with pristine analogies
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

print(f"Patched {analogy_idx} analogy questions with 100% pristine analogies.")

# 2. Update the 3 duplicated Antonym questions
# Test 36 Q3 (index 2 in test 36): INCHOATE (replaces duplicate PELLUCID)
t36_q3 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "INCHOATE"?',
    "options": [
        {"id": "A", "text": "Incipient"},
        {"id": "B", "text": "Formless"},
        {"id": "C", "text": "Rudimentary"},
        {"id": "D", "text": "Mature"},
        {"id": "E", "text": "Unformed"}
    ],
    "correctOption": "D",
    "explanation": "**Correct Answer: D** (Mature)\n\nInchoate means just begun and so not fully formed or developed; rudimentary. Mature means fully developed and formed.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}
verbal_data["36"][2] = t36_q3

# Test 39 Q1 (index 0 in test 39): PRODIGAL (replaces duplicate MUNIFICENT)
t39_q1 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "PRODIGAL"?',
    "options": [
        {"id": "A", "text": "Extravagant"},
        {"id": "B", "text": "Wasteful"},
        {"id": "C", "text": "Frugal"},
        {"id": "D", "text": "Improvident"},
        {"id": "E", "text": "Lavish"}
    ],
    "correctOption": "C",
    "explanation": "**Correct Answer: C** (Frugal)\n\nProdigal means wastefully extravagant or spending resources recklessly. Frugal means sparing or economical with regard to money or food.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
    "category": "verbal",
    "subType": "antonym"
}
verbal_data["39"][0] = t39_q1

# Test 42 Q6 (index 5 in test 42): BELLICOSE (replaces duplicate SALUBRIOUS)
t42_q6 = {
    "question": 'Which of the following words is most OPPOSITE in meaning to "BELLICOSE"?',
    "options": [
        {"id": "A", "text": "Pugnacious"},
        {"id": "B", "text": "Peaceful"},
        {"id": "C", "text": "Belligerent"},
        {"id": "D", "text": "Truculent"},
        {"id": "E", "text": "Combative"}
    ],
    "correctOption": "B",
    "explanation": "**Correct Answer: B** (Peaceful)\n\nBellicose means demonstrating aggression and willingness to fight. Peaceful is its direct antonym.\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s.",
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

print("Saved pristine newSuiteVerbal.js successfully!")
