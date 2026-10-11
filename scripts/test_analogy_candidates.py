import json
import re

with open('scripts/full_exclusion_dict.json', 'r', encoding='utf-8') as f:
    excl = json.load(f)

old_pairs = set(excl['old_pairs'])
old_words = set(excl['old_words'])

# Also add user-flagged terms explicitly
flagged_user_terms = {
    'STANZA', 'POEM', 'SCULPTOR', 'CHISEL', 'GALVANOMETER',
    'SEXTANT', 'BAROMETER', 'THERMOMETER', 'ALTIMETER', 'ANVIL',
    'BLACKSMITH', 'ASTRONOMER', 'TELESCOPE', 'COMPOSER', 'SCORE',
    'ARCHIPELAGO', 'CONSTELLATION', 'CALLOUS', 'EQUIVOCAL',
    'INDEFATIGABLE', 'OBLIVIOUS', 'SLOTH'
}
forbidden_words = old_words.union(flagged_user_terms)

# Candidate replacement analogies: (stem, correct, [4 distractors], explanation)
candidates = [
    # 0 (replacing SEXTANT : NAVIGATOR)
    (
        "THEODOLITE : SURVEYOR",
        "STETHOSCOPE : CARDIOLOGIST", # wait, check stethoscope
        ["PLUMB : MASON", "LEVEL : BUILDER", "TAPE : ENGINEER", "COMPASS : TRAVELER"],
        "A theodolite is a specialized angular measuring instrument used by a surveyor."
    ),
    # Let's test candidates programmatically!
]

def check_item(stem, corr, dists):
    all_pairs = [stem, corr] + dists
    issues = []
    for p in all_pairs:
        p_up = p.upper().strip()
        if p_up in old_pairs:
            issues.append(f"Pair '{p_up}' in old_pairs")
        words = re.findall(r'[A-Za-z]+', p_up)
        for w in words:
            if w in flagged_user_terms:
                issues.append(f"Forbidden word '{w}' in '{p_up}'")
    return issues

print("Validator ready.")
