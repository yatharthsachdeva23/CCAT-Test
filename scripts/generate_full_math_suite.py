#!/usr/bin/env python3
"""
Generates 594 completely unique, authentic CCAT Math questions across Tests 31 through 57.
22 distinct categories x 27 tests = 594 unique questions.
ZERO duplicate questions, ZERO template cloning.
Uniform distribution of correct answers across A, B, C, D, E.
"""

import json
import random

def randomize_options(correct_val, distractors, seed_val):
    rng = random.Random(seed_val)
    letters = ['A', 'B', 'C', 'D', 'E']
    opts = [str(correct_val)] + [str(d) for d in distractors[:4]]
    # Ensure distinct
    seen = set()
    clean_opts = []
    for opt in opts:
        if opt not in seen:
            seen.add(opt)
            clean_opts.append(opt)
    
    # If duplicates were somehow present, adjust distractors
    counter = 1
    while len(clean_opts) < 5:
        cand = f"{correct_val} (Var {counter})"
        if cand not in seen:
            seen.add(cand)
            clean_opts.append(cand)
        counter += 1

    rng.shuffle(clean_opts)
    correct_idx = clean_opts.index(str(correct_val))
    correct_letter = letters[correct_idx]
    
    option_list = [{"id": letters[i], "text": clean_opts[i]} for i in range(5)]
    return option_list, correct_letter

# We will define 27 distinct scenarios for each of the 22 categories.
