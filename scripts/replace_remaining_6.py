with open('scripts/build_new_verbal_bank.py', 'r', encoding='utf-8') as f:
    text = f.read()

mapping = {
    '("HAPHAZARD", "antonym", "Systematic"': '("OBDURATE", "antonym", "Malleable", ["Stubborn", "Obstinate", "Intransigent", "Inflexible"], "Obdurate means stubbornly refusing to change one opinion. Malleable is adaptable.")',
    '("MALLEABLE", "antonym", "Inflexible"': '("INTRANSIGENT", "antonym", "Yielding", ["Stubborn", "Inflexible", "Uncompromising", "Unyielding"], "Intransigent means refusing to agree or compromise. Yielding is flexible.")',
    '("METICULOUS", "antonym", "Sloppy"': '("SALUBRIOUS", "antonym", "Unhealthful", ["Healthy", "Wholesome", "Beneficial", "Sanitary"], "Salubrious means health-giving or wholesome. Unhealthful is harmful.")',
    '("TENACIOUS", "antonym", "Relenting"': '("PROCLIVITY", "antonym", "Aversion", ["Inclination", "Predilection", "Penchant", "Tendency"], "Proclivity means a natural inclination toward something. Aversion is dislike.")',
    '("TRITE", "antonym", "Original"': '("NEFARIOUS", "antonym", "Righteous", ["Wicked", "Villainous", "Heinous", "Sinister"], "Nefarious means wicked or criminal. Righteous is morally upright.")',
    '("UBIQUITOUS", "antonym", "Rare"': '("EBULLIENT", "antonym", "Depressed", ["Exuberant", "Buoyant", "Cheerful", "Joyful"], "Ebullient means cheerful and full of energy. Depressed is dejected.")'
}

import re
for old_key, new_val in mapping.items():
    pattern = re.compile(re.escape(old_key) + r'.*?\),?', re.DOTALL)
    m = pattern.search(text)
    if m:
        text = text[:m.start()] + new_val + ',' + text[m.end():]
        print(f"Replaced: {old_key}")
    else:
        print(f"NOT FOUND: {old_key}")

with open('scripts/build_new_verbal_bank.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved build_new_verbal_bank.py")
