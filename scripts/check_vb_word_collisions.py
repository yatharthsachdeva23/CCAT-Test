import json
import re

# Load verbalBank.js
with open('src/data/verbalBank.js', 'r', encoding='utf-8') as f:
    vb_text = f.read()

# Extract words from verbalBank
# We care about capitalized analogy words and target vocab words
analogies_vb = re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', vb_text)
vb_vocab_words = set()
for a, b in analogies_vb:
    vb_vocab_words.add(a.upper())
    vb_vocab_words.add(b.upper())

# Also any odd-one-out or target words
print(f"Total distinct capitalized analogy words in verbalBank.js (Tests 1-30): {len(vb_vocab_words)}")

# Now load newSuiteVerbal.js
with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    nsv_text = f.read()

# Extract test questions from newSuiteVerbal.js
prefix = "export const NEW_SUITE_VERBAL = "
s_idx = nsv_text.find(prefix) + len(prefix)
e_idx = nsv_text.rfind("};\n\nexport function getNewSuiteVerbalQuestions")
if e_idx == -1:
    e_idx = nsv_text.rfind("};\nexport function getNewSuiteVerbalQuestions")

new_verbal = json.loads(nsv_text[s_idx:e_idx+1].strip())

collisions = []
for t_id, qs in new_verbal.items():
    for q_idx, q in enumerate(qs):
        q_txt = q.get('question', '')
        sub = q.get('subType', '')
        options = q.get('options', [])
        expl = q.get('explanation', '')
        
        # Check all words in options and stem for analogy/target
        if sub == 'analogy' or ':' in q_txt:
            # check stem words
            stem_pairs = re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', q_txt)
            for w1, w2 in stem_pairs:
                if w1 in vb_vocab_words:
                    collisions.append((t_id, q_idx+1, 'stem word', w1, q_txt))
                if w2 in vb_vocab_words:
                    collisions.append((t_id, q_idx+1, 'stem word', w2, q_txt))
            
            # check option words
            for opt in options:
                opt_txt = opt.get('text', '')
                opt_pairs = re.findall(r'([A-Z]{3,})\s*:\s*([A-Z]{3,})', opt_txt)
                for w1, w2 in opt_pairs:
                    if w1 in vb_vocab_words:
                        collisions.append((t_id, q_idx+1, f"option {opt.get('id')} word", w1, opt_txt))
                    if w2 in vb_vocab_words:
                        collisions.append((t_id, q_idx+1, f"option {opt.get('id')} word", w2, opt_txt))

print(f"Total word collisions between newSuiteVerbal analogies and verbalBank.js: {len(collisions)}")
for c in collisions[:30]:
    print(c)
