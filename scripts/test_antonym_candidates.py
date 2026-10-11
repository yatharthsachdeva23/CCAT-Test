import json

with open('scripts/full_exclusion_dict.json', 'r', encoding='utf-8') as f:
    excl = json.load(f)
old_words = set(excl['old_words'])

with open('src/data/newSuiteVerbal.js', 'r', encoding='utf-8') as f:
    txt = f.read()

candidates = [
    'PRODIGAL', 'INCHOATE', 'ESOTERIC', 'TRACTABLE', 'QUERULOUS',
    'BELLICOSE', 'FASTIDIOUS', 'ABSTRUSE', 'MERETRICIOUS', 'SUPERCILIOUS',
    'PROPITIOUS', 'SANGUINE', 'SOPHORIC', 'SPECIOUS', 'PERSPICACIOUS'
]

clean_words = []
for w in candidates:
    in_old = w in old_words
    in_new = f'"{w}"' in txt.upper()
    if not in_old and not in_new:
        clean_words.append(w)
        print(f"CLEAN CANDIDATE: {w}")
    else:
        print(f"Collided: {w} (old={in_old}, new={in_new})")
