with open('scripts/build_new_verbal_bank.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

words = ['HAPHAZARD', 'MALLEABLE', 'METICULOUS', 'TENACIOUS', 'TRITE', 'UBIQUITOUS']
for i, l in enumerate(lines):
    for w in words:
        if f'"{w}"' in l:
            print(f"Line {i+1}: {l.strip()[:100]}")
