import sys
sys.path.insert(0, 'scripts')
import spatial_prompts
from spatial_folding import SYMBOLS_POOL

seen = set()
duplicates = []
collisions = []

for t in range(31, 58):
    t_idx = t - 31
    # Slot 11 symbols
    start_s = (t_idx * 2) % len(SYMBOLS_POOL)
    s0 = SYMBOLS_POOL[start_s][1]
    s1 = SYMBOLS_POOL[(start_s + 1) % len(SYMBOLS_POOL)][1]
    
    test_prompts = [
        spatial_prompts.SLOT1_PROMPTS[t_idx],
        spatial_prompts.SLOT2_PROMPTS[t_idx],
        spatial_prompts.SLOT3_PROMPTS[t_idx],
        spatial_prompts.SLOT4_PROMPTS[t_idx],
        spatial_prompts.SLOT5_PROMPTS[t_idx],
        spatial_prompts.SLOT6_PROMPTS[t_idx],
        spatial_prompts.SLOT7_PROMPTS[t_idx],
        spatial_prompts.SLOT8_PROMPTS[t_idx],
        spatial_prompts.SLOT9_PROMPTS[t_idx],
        spatial_prompts.SLOT10_PROMPTS[t_idx],
        spatial_prompts.get_slot11_prompt(t, s0, s1),
    ]
    
    for s_idx, p in enumerate(test_prompts):
        p_clean = p.strip().lower()
        if p_clean in seen:
            duplicates.append((t, s_idx + 1, p))
        seen.add(p_clean)
        
        if p_clean in spatial_prompts.OLD_PROMPTS:
            collisions.append((t, s_idx + 1, p))

print(f"Total tested prompts: {len(seen)} / 297")
print(f"Duplicates within suite: {len(duplicates)}")
print(f"Collisions with Tests 1-30: {len(collisions)}")

if len(duplicates) == 0 and len(collisions) == 0 and len(seen) == 297:
    print("SUCCESS: ALL 297 SPATIAL PROMPTS ARE 100% UNIQUE WITH ZERO COLLISIONS!")
else:
    if duplicates:
        print("Duplicate samples:", duplicates[:5])
    if collisions:
        print("Collision samples:", collisions[:5])
