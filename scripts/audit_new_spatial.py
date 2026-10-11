import json
import re

with open('src/data/newSuiteSpatial.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix = 'export const NEW_SUITE_SPATIAL = '
start = text.index(prefix) + len(prefix)
end = text.index(';\n\nexport function')
spatial_data = json.loads(text[start:end])

total_tests = len(spatial_data)
total_questions = sum(len(q_list) for q_list in spatial_data.values())
print(f"Auditing {total_tests} tests with {total_questions} spatial questions...")

# 1. Check duplicate options
duplicate_option_issues = 0
for t_num, q_list in spatial_data.items():
    for q_idx, q in enumerate(q_list):
        svgs = [o['svg'] for o in q['options']]
        if len(set(svgs)) != 5:
            print(f"DUPLICATE OPTION ERROR: Test {t_num} Q{q_idx} has duplicate options! ({len(set(svgs))} unique)")
            duplicate_option_issues += 1

print(f"1. Duplicate Option Issues: {duplicate_option_issues}")

# 2. Check color fairness (no answer marked in different colors)
color_discrepancy_issues = 0
for t_num, q_list in spatial_data.items():
    for q_idx, q in enumerate(q_list):
        corr_letter = q['correctOption']
        corr_opt = next(o for o in q['options'] if o['id'] == corr_letter)
        corr_colors = set(re.findall(r'#[0-9a-fA-F]{3,6}', corr_opt['svg']))
        
        # Check all distractors
        for opt in q['options']:
            opt_colors = set(re.findall(r'#[0-9a-fA-F]{3,6}', opt['svg']))
            # Check if colors match
            if opt_colors != corr_colors:
                print(f"COLOR BIAS ERROR: Test {t_num} Q{q_idx} Option {opt['id']} has colors {opt_colors} vs correct {corr_colors}")
                color_discrepancy_issues += 1

print(f"2. Color Discrepancy Issues: {color_discrepancy_issues}")

# 3. Check for any old archetypes (wave harmonics, binary counter, domino, etc.)
forbidden_terms = ['wave', 'frequency', 'harmonic', 'binary', 'domino', 'segment display', 'clock hand', 'pendulum']
old_archetype_issues = 0
for t_num, q_list in spatial_data.items():
    for q_idx, q in enumerate(q_list):
        content = (q['question'] + ' ' + q['explanation']).lower()
        for term in forbidden_terms:
            if term in content:
                print(f"OLD ARCHETYPE WARNING: Test {t_num} Q{q_idx} mentions '{term}'")
                old_archetype_issues += 1

print(f"3. Old Archetype Issues: {old_archetype_issues}")

# 4. Check option letters (A, B, C, D, E) and valid correctOption
option_key_issues = 0
for t_num, q_list in spatial_data.items():
    for q_idx, q in enumerate(q_list):
        ids = [o['id'] for o in q['options']]
        if ids != ['A', 'B', 'C', 'D', 'E']:
            print(f"OPTION KEY ERROR: Test {t_num} Q{q_idx} has keys {ids}")
            option_key_issues += 1
        if q['correctOption'] not in ['A', 'B', 'C', 'D', 'E']:
            print(f"CORRECT OPTION KEY ERROR: Test {t_num} Q{q_idx} has invalid correctOption {q['correctOption']}")
            option_key_issues += 1

print(f"4. Option Key Issues: {option_key_issues}")

if duplicate_option_issues == 0 and color_discrepancy_issues == 0 and old_archetype_issues == 0 and option_key_issues == 0:
    print("\nALL SPATIAL TESTS PASSED 100% CLEAN AUDIT! ZERO DEFECTS.")
