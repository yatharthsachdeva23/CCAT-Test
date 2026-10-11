#!/usr/bin/env python3
import json
import random

def make_opts(corr, distractors, seed_val):
    rng = random.Random(seed_val)
    letters = ['A', 'B', 'C', 'D', 'E']
    opts = [str(corr)] + [str(d) for d in distractors[:4]]
    seen = set()
    clean = []
    for o in opts:
        if o not in seen:
            seen.add(o)
            clean.append(o)
    c = 1
    while len(clean) < 5:
        cand = f"{corr} (Var {c})"
        if cand not in seen:
            seen.add(cand)
            clean.append(cand)
        c += 1
    rng.shuffle(clean)
    corr_idx = clean.index(str(corr))
    corr_letter = letters[corr_idx]
    return [{"id": letters[i], "text": clean[i]} for i in range(5)], corr_letter

# Generates 594 math questions (22 questions per test for Tests 31 to 57)
print("Initializing math suite generator...")
