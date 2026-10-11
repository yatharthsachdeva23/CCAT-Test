import json
import re

# Load Tests 1-30
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

# Collect all target words in Tests 1-30
old_target_words = set()
for q in t1_30:
    txt = q.get('question', '')
    # Check words in quotes like "ABERRATION" or "DILATION"
    quotes = re.findall(r'"([A-Za-z]+)"', txt)
    for w in quotes:
        old_target_words.add(w.upper())
    # If analogy, stems
    if ':' in txt:
        parts = txt.split(':')[0]
        for w in re.findall(r'[A-Za-z]+', parts):
            old_target_words.add(w.upper())

print(f"Total old target words (stems, quoted words) in Tests 1-30: {len(old_target_words)}")
print("Sample old target words:", list(sorted(old_target_words))[:20])

# Load NEW_SUITE_VERBAL
with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract json
prefix = "export const NEW_SUITE_VERBAL = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteVerbalQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteVerbalQuestions")

verbal_data = json.loads(content[start_idx:end_idx+1].strip())

# Check all 459 questions in NEW_SUITE_VERBAL
matches = []
for t_id, qs in verbal_data.items():
    for q_idx, q in enumerate(qs):
        txt = q.get('question', '')
        quotes = re.findall(r'"([A-Za-z]+)"', txt)
        for w in quotes:
            if w.upper() in old_target_words:
                matches.append((t_id, q_idx + 1, q.get('subType'), f"Quoted target word '{w.upper()}' was in Tests 1-30 target words"))
        if ':' in txt:
            # Analogy stem
            parts = txt.split(':')[0]
            stem_p = parts.strip().upper()
            # check stem pair
            stem_match = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', txt)
            for w1, w2 in stem_match:
                pair_str = f"{w1.upper()} : {w2.upper()}"
                # check if pair was in old
                for q_old in t1_30:
                    old_txt = q_old.get('question', '')
                    if pair_str in old_txt.upper():
                        matches.append((t_id, q_idx + 1, 'analogy', f"Stem pair '{pair_str}' was in Tests 1-30"))
                    for opt in q_old.get('options', []):
                        if pair_str in opt.get('text', '').upper():
                            matches.append((t_id, q_idx + 1, 'analogy', f"Pair '{pair_str}' appeared in options of Tests 1-30: {opt.get('text')}"))

print(f"\nTotal matches found in NEW_SUITE_VERBAL: {len(matches)}")
for m in matches[:30]:
    print(f"Test {m[0]} Q{m[1]} ({m[2]}): {m[3]}")
