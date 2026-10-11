import json
import re

with open('scripts/full_exclusion_dict.json', 'r', encoding='utf-8') as f:
    excl = json.load(f)

old_pairs = set(excl['old_pairs'])
old_words = set(excl['old_words'])
old_questions = set(excl['old_questions'])

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_VERBAL = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteVerbalQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteVerbalQuestions")

verbal_data = json.loads(content[start_idx:end_idx+1].strip())

flagged = []
for t_id, qs in verbal_data.items():
    for q_idx, q in enumerate(qs):
        txt = q.get('question', '').strip()
        sub = q.get('subType', '')
        
        # 1. Check exact question match
        if txt.lower() in old_questions:
            flagged.append((t_id, q_idx + 1, sub, f"Exact question text match: '{txt}'"))
            continue
            
        # 2. Check quoted target word in antonym/synonym
        quotes = re.findall(r'"([A-Za-z]+)"', txt)
        for w in quotes:
            if w.upper() in old_words:
                flagged.append((t_id, q_idx + 1, sub, f"Target word '{w.upper()}' was in Tests 1-30"))
                
        # 3. Check analogies
        if sub == 'analogy' or ':' in txt:
            pairs_in_q = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', txt)
            for w1, w2 in pairs_in_q:
                p_str = f"{w1.upper()} : {w2.upper()}"
                if p_str in old_pairs:
                    flagged.append((t_id, q_idx + 1, sub, f"Analogy stem '{p_str}' was in Tests 1-30"))
                    
            for opt in q.get('options', []):
                opt_txt = opt.get('text', '')
                opt_pairs = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', opt_txt)
                for w1, w2 in opt_pairs:
                    p_str = f"{w1.upper()} : {w2.upper()}"
                    if p_str in old_pairs:
                        flagged.append((t_id, q_idx + 1, sub, f"Option pair '{p_str}' was in Tests 1-30"))

print(f"Total flagged verbal questions: {len(flagged)}")
# Group by test
by_test = {}
for t_id, q_num, sub, reason in flagged:
    by_test.setdefault(t_id, []).append((q_num, sub, reason))

for t_id in sorted(by_test.keys(), key=lambda x: int(x)):
    print(f"\nTest {t_id}: {len(by_test[t_id])} issues")
    for q_num, sub, reason in by_test[t_id]:
        print(f"  Q{q_num} ({sub}): {reason}")
