import sys
import json

sys.path.insert(0, 'scripts')
import spatial_series
import spatial_matrices
import spatial_odd
import spatial_analogy
import spatial_folding

# Load old questions for collision checking
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)
OLD_PROMPTS = set(q['question'].strip().lower() for q in t1_30)

spatial_data = {}
all_prompts = set()
duplicates = 0
collisions = 0
duplicate_options = 0
answer_counts = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0}

for t in range(31, 58):
    test_key = str(t)
    qs = [
        spatial_series.gen_slot1_series(t),
        spatial_series.gen_slot2_series(t),
        spatial_series.gen_slot3_series(t),
        spatial_matrices.gen_slot4_matrix(t),
        spatial_matrices.gen_slot5_matrix(t),
        spatial_odd.gen_slot6_odd(t),
        spatial_odd.gen_slot7_odd(t),
        spatial_odd.gen_slot8_odd(t),
        spatial_analogy.gen_slot9_analogy(t),
        spatial_analogy.gen_slot10_analogy(t),
        spatial_folding.gen_slot11_folding(t),
    ]
    
    for s_idx, q in enumerate(qs):
        p_clean = q['question'].strip().lower()
        if p_clean in all_prompts:
            print(f"DUPLICATE PROMPT: Test {t} Slot {s_idx+1}: {q['question']}")
            duplicates += 1
        all_prompts.add(p_clean)
        
        if p_clean in OLD_PROMPTS:
            print(f"COLLISION WITH 1-30: Test {t} Slot {s_idx+1}: {q['question']}")
            collisions += 1
            
        opt_svgs = [o['svg'] for o in q['options']]
        if len(set(opt_svgs)) != 5:
            print(f"DUPLICATE OPTION: Test {t} Slot {s_idx+1}")
            duplicate_options += 1
            
        corr = q['correctOption']
        answer_counts[corr] = answer_counts.get(corr, 0) + 1
        
    spatial_data[test_key] = qs

print(f"Total spatial questions assembled: {len(all_prompts)} / 297")
print(f"Duplicate prompts: {duplicates}")
print(f"Collisions with Tests 1-30: {collisions}")
print(f"Duplicate options: {duplicate_options}")
print(f"Answer distribution: {answer_counts}")

if duplicates == 0 and collisions == 0 and duplicate_options == 0 and len(all_prompts) == 297:
    print("ALL 297 SPATIAL QUESTIONS PASSED PRE-ASSEMBLY AUDIT WITH 100% PERFECTION!")
else:
    print("ASSEMBLY FAILED CHECKS!")
    sys.exit(1)

# Write to src/data/newSuiteSpatial.js
output_code = (
    "// Brand New CCAT Spatial Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n"
    "// Zero color giveaway, strictly unique options, 100% CCAT-authentic vector SVGs.\n\n"
    "export const NEW_SUITE_SPATIAL = "
    + json.dumps(spatial_data, indent=2)
    + ";\n\n"
    "export function getNewSuiteSpatialQuestions(testNumber) {\n"
    "  const list = NEW_SUITE_SPATIAL[testNumber] || NEW_SUITE_SPATIAL[31];\n"
    "  return [...list];\n"
    "}\n"
)

with open('src/data/newSuiteSpatial.js', 'w', encoding='utf-8') as f:
    f.write(output_code)

print("Saved newSuiteSpatial.js successfully!")
