import json
import re

with open('scripts/old_tests_questions.json', 'r', encoding='utf-8') as f:
    old_data = json.load(f)
old_prompts = set(old_data['questions'])

with open('scripts/build_new_verbal_bank.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Execute up to tests_verbal = {}
exec(content.split('tests_verbal = {}')[0])

print(f"Total vocab_pool: {len(vocab_pool)}")
print(f"Total analogy_pool: {len(analogy_pool)}")
print(f"Total odd_pool: {len(odd_pool)}")
print(f"Total sentences_pool: {len(sentences_pool)}")
print(f"Total logic_pool: {len(logic_pool)}")

colliding_vocab = []
for i, item in enumerate(vocab_pool):
    word = item[0].upper()
    is_ant = (item[1] == 'antonym')
    q_text = f'Which of the following words is most OPPOSITE in meaning to "{word}"?' if is_ant else f'Which of the following words is most SIMILAR in meaning to "{word}"?'
    if q_text.strip().lower() in old_prompts:
        colliding_vocab.append((i, word, item))

print(f"\nColliding vocab words ({len(colliding_vocab)}):")
for idx, w, it in colliding_vocab:
    print(f"  Index {idx}: {w}")

colliding_analogy = []
for i, item in enumerate(analogy_pool):
    q_text = f'{item[0]} is analogous to:'
    if q_text.strip().lower() in old_prompts:
        colliding_analogy.append((i, item[0], item))

print(f"\nColliding analogies ({len(colliding_analogy)}):")
for idx, st, it in colliding_analogy:
    print(f"  Index {idx}: {st}")

colliding_odd = []
for i, item in enumerate(odd_pool):
    q_text = f'In the domain of {item[2]}, which word does NOT belong with the others?'
    if q_text.strip().lower() in old_prompts:
        colliding_odd.append((i, item[2], item))

print(f"\nColliding odd-words ({len(colliding_odd)}):")
for idx, dom, it in colliding_odd:
    print(f"  Index {idx}: {dom}")
