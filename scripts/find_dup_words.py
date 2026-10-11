with open('scripts/build_new_verbal_bank.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, l in enumerate(lines):
    if '"OBDURATE"' in l or '"PUGNACIOUS"' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")
