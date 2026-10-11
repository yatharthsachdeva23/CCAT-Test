import sys
sys.path.insert(0, 'scripts')
import spatial_series
import spatial_matrices
import spatial_odd
import spatial_analogy
import spatial_folding

prompts = {}
duplicates = []

for t in range(31, 58):
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
    for slot_idx, q in enumerate(qs):
        p = q['question'].strip()
        key = (slot_idx + 1, p)
        if p in prompts:
            duplicates.append((t, slot_idx + 1, prompts[p], p))
        else:
            prompts[p] = (t, slot_idx + 1)

print(f"Total spatial questions: {27 * 11} = 297")
print(f"Unique prompts found: {len(prompts)}")
print(f"Duplicate prompts: {len(duplicates)}")
if len(duplicates) > 0:
    print("Sample duplicate prompts:")
    for d in duplicates[:10]:
        print(f"  Test {d[0]} Slot {d[1]} matches {d[2]}: '{d[3]}'")
