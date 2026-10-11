import json
import re

with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

old_pairs = set()
old_words = set()
old_questions = set()

for q in t1_30:
    q_txt = q.get('question', '').strip()
    old_questions.add(q_txt.lower())
    
    # Extract pairs
    m_pairs = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', q_txt)
    for w1, w2 in m_pairs:
        old_pairs.add(f"{w1.upper()} : {w2.upper()}")
        old_words.add(w1.upper())
        old_words.add(w2.upper())
        
    for opt in q.get('options', []):
        opt_txt = opt.get('text', '').strip()
        m_opt_pairs = re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', opt_txt)
        for w1, w2 in m_opt_pairs:
            old_pairs.add(f"{w1.upper()} : {w2.upper()}")
            old_words.add(w1.upper())
            old_words.add(w2.upper())
            
    # Quoted words
    quotes = re.findall(r'"([A-Za-z]+)"', q_txt)
    for w in quotes:
        old_words.add(w.upper())

print(f"Total old questions: {len(old_questions)}")
print(f"Total old pairs: {len(old_pairs)}")
print(f"Total old target words: {len(old_words)}")

exclusion_data = {
    "old_questions": list(old_questions),
    "old_pairs": list(old_pairs),
    "old_words": list(old_words)
}

with open('scripts/full_exclusion_dict.json', 'w', encoding='utf-8') as f:
    json.dump(exclusion_data, f, indent=2)

print("Saved full_exclusion_dict.json successfully!")
