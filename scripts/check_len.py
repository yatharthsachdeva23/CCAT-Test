with open('scripts/build_new_verbal_bank.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_vocab = False
v_count = 0
for line in lines:
    if 'vocab_pool = [' in line:
        in_vocab = True
        continue
    if in_vocab:
        if line.strip().startswith(']'):
            in_vocab = False
            break
        if line.strip().startswith('("'):
            v_count += 1

print("Vocab count:", v_count)
