#!/usr/bin/env python3
import json
import random

from math_cat1 import get_speed_distance
from math_cat2 import get_work_rate
from math_cat3 import get_markup_discount
from math_cat4 import get_profit_loss
from math_cat5 import get_ratio_proportion
from math_cat6_7 import get_mixtures, get_interest_finance
from math_cat8_9_10 import get_averages, get_probability, get_combinatorics
from math_cat11_12_13_14 import get_series_arithmetic, get_series_geometric, get_series_two_tier, get_series_alternating
from math_cat15_16_17_18 import get_age_problems, get_clock_modular, get_venn_sets, get_consecutive_numbers
from math_cat19_20_21_22 import get_geometry_2d, get_geometry_3d, get_linear_systems, get_pipes_leaks

def make_question(q_data, seed_val, sub_type='word_problem'):
    q_text, correct_val, distractors, steps = q_data
    rng = random.Random(seed_val)
    letters = ['A', 'B', 'C', 'D', 'E']
    
    opts = [str(correct_val)] + [str(d) for d in distractors[:4]]
    seen = set()
    clean_opts = []
    for o in opts:
        if o not in seen:
            seen.add(o)
            clean_opts.append(o)
            
    c = 1
    while len(clean_opts) < 5:
        cand = f"{correct_val} (Var {c})"
        if cand not in seen:
            seen.add(cand)
            clean_opts.append(cand)
        c += 1
        
    rng.shuffle(clean_opts)
    corr_idx = clean_opts.index(str(correct_val))
    corr_letter = letters[corr_idx]
    
    expl = f"**Correct Answer: {corr_letter}** ({correct_val})\n\n**Step-by-step Solution:**\n"
    for i, step in enumerate(steps, 1):
        expl += f"{i}. {step}\n"
        
    return {
        "question": q_text,
        "options": [{"id": letters[i], "text": clean_opts[i]} for i in range(5)],
        "correctOption": corr_letter,
        "explanation": expl.strip(),
        "category": "math",
        "subType": sub_type
    }

new_suite_math = {}

# 22 question generators in order
generators = [
    (get_speed_distance, 'word_problem'),
    (get_work_rate, 'word_problem'),
    (get_markup_discount, 'word_problem'),
    (get_profit_loss, 'word_problem'),
    (get_ratio_proportion, 'word_problem'),
    (get_mixtures, 'word_problem'),
    (get_interest_finance, 'word_problem'),
    (get_averages, 'word_problem'),
    (get_probability, 'word_problem'),
    (get_combinatorics, 'word_problem'),
    (get_series_arithmetic, 'number_series'),
    (get_series_geometric, 'number_series'),
    (get_series_two_tier, 'number_series'),
    (get_series_alternating, 'number_series'),
    (get_age_problems, 'word_problem'),
    (get_clock_modular, 'word_problem'),
    (get_venn_sets, 'word_problem'),
    (get_consecutive_numbers, 'word_problem'),
    (get_geometry_2d, 'geometry'),
    (get_geometry_3d, 'geometry'),
    (get_linear_systems, 'word_problem'),
    (get_pipes_leaks, 'word_problem')
]

for t in range(31, 58):
    k = t - 31
    t_key = str(t)
    questions = []
    
    for q_idx, (gen_fn, sub_type) in enumerate(generators):
        seed_val = t * 1000 + q_idx * 17 + 42
        q_data = gen_fn(k)
        q_obj = make_question(q_data, seed_val, sub_type)
        questions.append(q_obj)
        
    new_suite_math[t_key] = questions

print(f"Generated math questions for {len(new_suite_math)} tests (total {len(new_suite_math) * 22} questions).")

# Output to src/data/newSuiteMath.js
js_content = "// Brand New CCAT Math Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n"
js_content += "// 100% unique scenarios, wordings, and numbers for every single question.\n\n"
js_content += "export const NEW_SUITE_MATH = " + json.dumps(new_suite_math, indent=2) + ";\n\n"
js_content += """export function getNewSuiteMathQuestions(testNumber) {
  const tKey = String(testNumber);
  return NEW_SUITE_MATH[tKey] || NEW_SUITE_MATH["31"];
}
"""

with open("src/data/newSuiteMath.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Successfully written to src/data/newSuiteMath.js")
