import sys
import json
import re

sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Match the JS export
prefix = "export const NEW_SUITE_VERBAL = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteVerbalQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteVerbalQuestions")

json_str = content[start_idx:end_idx+1].strip()
tail_code = content[end_idx+1:].lstrip(';\n ')

verbal_data = json.loads(json_str)

letters = ['A', 'B', 'C', 'D', 'E']
analogy_idx = 0

for test_num in range(31, 58):
    test_key = str(test_num)
    test_qs = verbal_data[test_key]
    
    # In each test, find the 6 analogy questions
    analogy_slots = [i for i, q in enumerate(test_qs) if q.get('subType') == 'analogy']
    if len(analogy_slots) != 6:
        print(f"Warning: Test {test_key} has {len(analogy_slots)} analogy slots: {analogy_slots}")
    
    for slot in analogy_slots:
        stem, correct, dists, explanation = ANALOGY_DATA[analogy_idx]
        target_pos = analogy_idx % 5
        target_letter = letters[target_pos]
        
        # Build options
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

print(f"Successfully processed {analogy_idx} analogy questions across 27 tests.")

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
