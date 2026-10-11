import json
import random

# Helper to format options
def make_question(q_text, correct_val, distractors, explanation_steps, seed_val, sub_type='word_problem'):
    rng = random.Random(seed_val)
    letters = ['A', 'B', 'C', 'D', 'E']
    opts = [str(correct_val)] + [str(d) for d in distractors[:4]]
    
    # Ensure all 5 are distinct
    seen = set()
    clean_opts = []
    for o in opts:
        if o not in seen:
            seen.add(o)
            clean_opts.append(o)
    
    c = 1
    while len(clean_opts) < 5:
        cand = f"{correct_val} (Opt {c})"
        if cand not in seen:
            seen.add(cand)
            clean_opts.append(cand)
        c += 1
        
    rng.shuffle(clean_opts)
    corr_idx = clean_opts.index(str(correct_val))
    corr_letter = letters[corr_idx]
    
    expl = f"**Correct Answer: {corr_letter}** ({correct_val})\n\n**Step-by-step Solution:**\n"
    for i, step in enumerate(explanation_steps, 1):
        expl += f"{i}. {step}\n"
        
    return {
        "question": q_text,
        "options": [{"id": letters[i], "text": clean_opts[i]} for i in range(5)],
        "correctOption": corr_letter,
        "explanation": expl.strip(),
        "category": "math",
        "subType": sub_type
    }

print("Helper ready")
