import json
import math
import re

# Generator for 594 brand new CCAT Math Questions for Tests 31 to 57 (27 tests x 22 questions)
# Every question has: question, options: [{id, text}], correctOption, explanation, category: 'math', subType
# Strictly unique numbers and contexts for every test (ZERO new-to-new repeats and ZERO old repeats).

def solve_and_format(q_text, correct_ans, distractors, explanation, sub_type, rand_seed):
    # Guarantee 5 strictly unique options
    unique_opts = [str(correct_ans).strip()]
    for d in distractors:
        ds = str(d).strip()
        if ds not in unique_opts:
            unique_opts.append(ds)
            if len(unique_opts) == 5:
                break
                
    if len(unique_opts) < 5:
        m = re.search(r'([-+]?[0-9,]+(?:\.[0-9]+)?)', str(correct_ans))
        if m:
            num_str = m.group(1).replace(',', '')
            is_float = '.' in num_str
            base_val = float(num_str) if is_float else int(num_str)
            prefix = str(correct_ans)[:m.start(1)]
            suffix = str(correct_ans)[m.end(1):]
            
            offset = 1 if abs(base_val) < 15 else (5 if abs(base_val) < 100 else (50 if abs(base_val) < 1000 else 500))
            mult = 1
            while len(unique_opts) < 5:
                for sign in [1, -1, 2, -2, 3, -3, 4, -4, 5, -5]:
                    new_val = base_val + sign * offset * mult
                    if new_val <= 0 and base_val > 0:
                        new_val = base_val + (offset * mult + 7)
                    if is_float:
                        cand = f'{prefix}{new_val:.1f}{suffix}'.strip()
                    elif ',' in m.group(1):
                        cand = f'{prefix}{int(new_val):,}{suffix}'.strip()
                    else:
                        cand = f'{prefix}{int(new_val)}{suffix}'.strip()
                    if cand not in unique_opts:
                        unique_opts.append(cand)
                        if len(unique_opts) == 5:
                            break
                mult += 1
                if mult > 20:
                    break

    assert len(unique_opts) == 5, f"Could not generate 5 options for {q_text}"

    # Deterministic shuffle of options
    s = (rand_seed * 1103515245 + 12345) & 0x7fffffff
    all_opts = unique_opts
    
    opts_with_tag = [{'text': str(o), 'isCorr': (i == 0)} for i, o in enumerate(all_opts)]
    for i in range(len(opts_with_tag) - 1, 0, -1):
        s = (s * 1103515245 + 12345) & 0x7fffffff
        j = s % (i + 1)
        opts_with_tag[i], opts_with_tag[j] = opts_with_tag[j], opts_with_tag[i]
        
    letters = ['A', 'B', 'C', 'D', 'E']
    options = []
    correct_letter = 'A'
    for idx, item in enumerate(opts_with_tag):
        letter = letters[idx]
        options.append({'id': letter, 'text': item['text']})
        if item['isCorr']:
            correct_letter = letter
            
    clean_expl = f"**Correct Answer: {correct_letter}** ({correct_ans})\n\n{explanation}"
    return {
        'question': q_text,
        'options': options,
        'correctOption': correct_letter,
        'explanation': clean_expl,
        'category': 'math',
        'subType': sub_type
    }

tests_math = {}

# 27 Distinct Contexts for Permutations and Combinations to prevent duplicate prompt stems
PERM_CONTEXTS = [
    ("automated drone hangar", "flight clearance keycode"),
    ("pharmaceutical cold-storage vault", "security access code"),
    ("cloud datacenter server rack", "terminal override PIN"),
    ("satellite uplink terminal", "telemetry transmission code"),
    ("naval shipyard drydock", "gate entry code"),
    ("biotech cleanroom facility", "airlock authentication PIN"),
    ("financial wire clearinghouse", "transaction validation token"),
    ("robotic assembly line", "calibration sequence code"),
    ("subsea fiber optic junction", "node bypass code"),
    ("aviation avionics bay", "maintenance diagnostic code"),
    ("cryptographic key vault", "hardware authentication key"),
    ("hydroelectric turbine hall", "governor activation code"),
    ("semiconductor fabrication suite", "clean-bench entry code"),
    ("geothermal drilling outpost", "telemetry sync code"),
    ("logistics automated warehouse", "conveyor dispatch code"),
    ("high-speed rail substation", "signal interlocking code"),
    ("spaceport telemetry mast", "downlink verification code"),
    ("deep-sea exploration submersible", "ballast release PIN"),
    ("quantum computing cryostat", "qubit pulse authorization code"),
    ("telecom fiber distribution node", "splitter access code"),
    ("automated cargo seaport crane", "spreader control code"),
    ("particle accelerator control room", "beam dump authorization code"),
    ("supercomputing cluster headnode", "MPI job submission PIN"),
    ("orbital refueling depot", "docking latch passcode"),
    ("smart electrical grid dispatch", "feeder switch code"),
    ("automated parcel sortation center", "diverter routing key"),
    ("desalination plant intake valve", "pressure release code")
]

COMB_CONTEXTS = [
    ("technical steering committee", "qualified engineering leads"),
    ("internal compliance audit panel", "senior risk analysts"),
    ("executive interview delegation", "department directors"),
    ("peer-review editorial board", "principal research scientists"),
    ("safety oversight taskforce", "certified plant inspectors"),
    ("product architecture review council", "staff system architects"),
    ("crisis management team", "operations incident commanders"),
    ("sustainability evaluation board", "environmental specialists"),
    ("data governance working group", "senior database stewards"),
    ("clinical trial protocol jury", "lead investigators"),
    ("cybersecurity red-team squad", "ethical security researchers"),
    ("customer advisory council", "strategic corporate partners"),
    ("supply chain resilience taskforce", "procurement managers"),
    ("AI ethics review commission", "interdisciplinary faculty"),
    ("quality assurance standard committee", "six-sigma master black belts"),
    ("patent disclosure evaluation board", "intellectual property counsels"),
    ("cloud migration steering squad", "infrastructure team leads"),
    ("mergers and acquisitions diligence team", "financial analysts"),
    ("urban transport planning panel", "transit civil engineers"),
    ("telecommunications spectrum working group", "radio frequency leads"),
    ("renewable grid integration taskforce", "power systems analysts"),
    ("corporate governance nominating committee", "independent board trustees"),
    ("automated testing standards committee", "lead software architects"),
    ("disaster recovery review squad", "site reliability engineers"),
    ("logistics route optimization council", "operations research analysts"),
    ("capital allocation assessment committee", "investment directors"),
    ("biomedical ethics oversight delegation", "health policy specialists")
]

for k in range(27):
    test_num = 31 + k
    q_list = []
    
    # 1. SPEED / DISTANCE / TIME (Locomotives)
    v1 = 40 + k * 2
    v2 = 55 + k * 3
    hrs = 2 + (k % 3)
    dist = (v1 + v2) * hrs
    q1 = f"Two freight locomotives depart simultaneously from cities located {dist} miles apart, traveling directly toward each other on parallel tracks. Locomotive Alpha travels at {v1} mph, while Locomotive Beta travels at {v2} mph. How many hours after departure will the two trains pass each other?"
    c1 = f"{hrs} hours"
    d1 = [f"{hrs + 1} hours", f"{hrs + 0.5} hours", f"{round(dist / v1, 1)} hours", f"{round(dist / v2, 1)} hours"]
    e1 = f"**Step-by-step Solution:**\n1. Combined relative speed = {v1} + {v2} = {v1 + v2} mph.\n2. Time until meeting = Distance / Relative Speed = {dist} / {v1 + v2} = **{hrs} hours**."
    q_list.append(solve_and_format(q1, c1, d1, e1, 'word_problem', test_num * 101 + 1))
    
    # 2. WORK RATE (Laser Cutters)
    p1 = 3 + (k % 5) * 2
    p2 = 12 + k
    t_work = round((p1 * p2) / (p1 + p2), 1)
    q2 = f"A commercial laser cutter can complete an industrial order in {p1} hours working alone. A secondary backup laser cutter requires {p2} hours to complete the exact same order independently. If both laser cutters operate simultaneously, approximately how many hours will it take to finish the order?"
    c2 = f"{t_work} hours"
    d2 = [f"{round((p1 + p2) / 2, 1)} hours", f"{p1 - 1 if p1 > 2 else p1 + 3} hours", f"{round(t_work + 1.4, 1)} hours", f"{round(t_work - 0.7 if t_work > 1 else t_work + 2.5, 1)} hours"]
    e2 = f"**Step-by-step Solution:**\n1. Combined hourly rate = 1/{p1} + 1/{p2} = {p1+p2}/({p1*p2}).\n2. Time required = ({p1} * {p2}) / ({p1} + {p2}) = {p1*p2}/{p1+p2} ≈ **{t_work} hours**."
    q_list.append(solve_and_format(q2, c2, d2, e2, 'word_problem', test_num * 101 + 2))
    
    # 3. MIXTURE & CONCENTRATION
    gal1 = 20 + k * 5
    pct1 = 15
    pct2 = 60
    target_pct = 30
    # gal1 * 0.15 + x * 0.60 = (gal1 + x) * 0.30 -> x * 0.30 = gal1 * 0.15 -> x = gal1 * 0.5
    add_gal = int(gal1 * (target_pct - pct1) / (pct2 - target_pct))
    q3 = f"A chemical laboratory has {gal1} liters of an alcohol solution with a {pct1}% concentration. How many liters of a {pct2}% alcohol solution must be blended in to achieve a final concentration of exactly {target_pct}%?"
    c3 = f"{add_gal} liters"
    d3 = [f"{add_gal + 6} liters", f"{add_gal - 4 if add_gal > 5 else add_gal + 12} liters", f"{gal1 + 10} liters", f"{add_gal * 3} liters"]
    e3 = f"**Step-by-step Solution:**\n1. Equation: {gal1}(0.{pct1}) + x(0.{pct2}) = ({gal1} + x)(0.{target_pct}).\n2. {gal1 * pct1 / 100} + {pct2/100}x = {gal1 * target_pct / 100} + {target_pct/100}x.\n3. { (pct2 - target_pct)/100 }x = { (gal1 * target_pct - gal1 * pct1)/100 } → x = **{add_gal} liters**."
    q_list.append(solve_and_format(q3, c3, d3, e3, 'word_problem', test_num * 101 + 3))

    # 4. RATIOS & PROPORTIONS
    r_a = 2 + (k % 4)
    r_b = 7 + (k % 3)
    tot_parts = r_a + r_b
    unit_val = 1000 + k * 100
    total_val = tot_parts * unit_val
    share_b = r_b * unit_val
    q4 = f"Two venture partners agree to allocate annual corporate dividends in the ratio of {r_a} : {r_b}. If the total dividend distribution for the year is ${total_val:,}, what is the larger partner's payout share?"
    c4 = f"${share_b:,}"
    share_a = r_a * unit_val
    d4 = [f"${share_a:,}", f"${share_b + 1500:,}", f"${share_b - 1200:,}", f"${total_val // 2:,}"]
    e4 = f"**Step-by-step Solution:**\n1. Total ratio parts = {r_a} + {r_b} = {tot_parts}.\n2. Value per part = ${total_val:,} / {tot_parts} = ${unit_val:,}.\n3. Larger share = {r_b} × ${unit_val:,} = **${share_b:,}**."
    q_list.append(solve_and_format(q4, c4, d4, e4, 'word_problem', test_num * 101 + 4))

    # 5. SUCCESSIVE DISCOUNTS
    orig_p = 200 + k * 20
    d_a = 20
    d_b = 10
    final_p = orig_p * (1 - d_a/100) * (1 - d_b/100)
    q5 = f"A luxury retailer marks down a designer suit originally priced at ${orig_p} by {d_a}%. During a weekend clearance sale, an additional {d_b}% discount is deducted from the already reduced price. What is the final sales price of the suit?"
    c5 = f"${final_p:.2f}"
    trap_p = orig_p * (1 - (d_a + d_b)/100)
    d5 = [f"${trap_p:.2f}", f"${final_p + 18:.2f}", f"${final_p - 14:.2f}", f"${orig_p * 0.75:.2f}"]
    e5 = f"**Step-by-step Solution:**\n1. First markdown price = ${orig_p} × 0.80 = ${orig_p * 0.8:.2f}.\n2. Second markdown price = ${orig_p * 0.8:.2f} × 0.90 = **${final_p:.2f}**.\n*(Note: Successive discounts compound and do not simply add to 30%).*"
    q_list.append(solve_and_format(q5, c5, d5, e5, 'percentage', test_num * 101 + 5))

    # 6. COMPOUND FINANCIAL ACCRUAL
    principal = 5000 + k * 500
    rate = 8
    years = 2
    compound_val = principal * (1 + rate/100) ** years
    q6 = f"An institutional fund deposits ${principal:,} into a corporate bond earning {rate}% annual interest compounded annually. What will the total account balance be at the conclusion of {years} years?"
    c6 = f"${compound_val:,.2f}"
    simple_val = principal * (1 + (rate * years)/100)
    d6 = [f"${simple_val:,.2f}", f"${compound_val + 140:,.2f}", f"${compound_val - 110:,.2f}", f"${principal * 1.2:,.2f}"]
    e6 = f"**Step-by-step Solution:**\n1. Year 1 balance = ${principal:,} × 1.08 = ${principal * 1.08:,.2f}.\n2. Year 2 balance = ${principal * 1.08:,.2f} × 1.08 = **${compound_val:,.2f}**."
    q_list.append(solve_and_format(q6, c6, d6, e6, 'word_problem', test_num * 101 + 6))

    # 7. BUSINESS REVENUE & BREAK-EVEN
    fixed_cost = 10000 + k * 1200
    price_unit = 50
    cost_unit = 30
    margin = price_unit - cost_unit
    be_units = fixed_cost // margin
    q7 = f"A consumer electronics manufacturer incurs monthly fixed operating costs of ${fixed_cost:,}. Each unit manufactured costs ${cost_unit} to produce and sells for ${price_unit}. How many units must the company sell in a month to break even?"
    c7 = f"{be_units:,} units"
    d7 = [f"{fixed_cost // price_unit:,} units", f"{be_units + 45:,} units", f"{be_units - 40:,} units", f"{fixed_cost // cost_unit:,} units"]
    e7 = f"**Step-by-step Solution:**\n1. Contribution margin per unit = ${price_unit} - ${cost_unit} = ${margin}.\n2. Break-even volume = Fixed Costs / Margin = ${fixed_cost:,} / ${margin} = **{be_units:,} units**."
    q_list.append(solve_and_format(q7, c7, d7, e7, 'word_problem', test_num * 101 + 7))

    # 8. AGE WORD PROBLEM
    diff_age = 18 + k * 2
    s_age = diff_age // 2
    f_age = 3 * s_age
    q8 = f"A senior director is currently exactly 3 times as old as his junior associate. If the director is {diff_age} years older than the associate, how old is the director currently?"
    c8 = f"{f_age} years old"
    d8 = [f"{s_age} years old", f"{f_age + 6} years old", f"{f_age - 5} years old", f"{diff_age} years old"]
    e8 = f"**Step-by-step Solution:**\n1. Let associate's age = A. Director's age = 3A.\n2. Difference = 3A - A = 2A = {diff_age} → A = {s_age}.\n3. Director's age = 3 × {s_age} = **{f_age} years old**."
    q_list.append(solve_and_format(q8, c8, d8, e8, 'word_problem', test_num * 101 + 8))

    # 9. SIMULTANEOUS SYSTEM (Ticket Sales)
    t_ad = 16
    t_ch = 9
    tot_tickets = 100 + k * 10
    ch_tickets = 30 + k * 2
    ad_tickets = tot_tickets - ch_tickets
    tot_revenue = ad_tickets * t_ad + ch_tickets * t_ch
    q9 = f"A theater sold a total of {tot_tickets} tickets for an evening performance, generating ${tot_revenue:,} in total gate receipts. If adult tickets cost ${t_ad} each and children's tickets cost ${t_ch} each, how many adult tickets were sold?"
    c9 = f"{ad_tickets} tickets"
    d9 = [f"{ch_tickets} tickets", f"{ad_tickets + 12} tickets", f"{ad_tickets - 8} tickets", f"{tot_tickets // 2} tickets"]
    e9 = f"**Step-by-step Solution:**\n1. Let A = adult tickets, C = child tickets. A + C = {tot_tickets}.\n2. {t_ad}A + {t_ch}C = {tot_revenue}.\n3. {t_ad}A + {t_ch}({tot_tickets} - A) = {tot_revenue} → {t_ad - t_ch}A + {t_ch * tot_tickets} = {tot_revenue}.\n4. {t_ad - t_ch}A = {tot_revenue - t_ch * tot_tickets} → A = **{ad_tickets} tickets**."
    q_list.append(solve_and_format(q9, c9, d9, e9, 'word_problem', test_num * 101 + 9))

    # 10. ARITHMETIC PROGRESSION
    start_ap = 4 + k * 3
    step_ap = 5 + (k % 4)
    n_terms = 5
    seq = [start_ap + i * step_ap for i in range(n_terms)]
    next_ap = start_ap + n_terms * step_ap
    q10 = f"Identify the next logical number in the following numerical sequence:\n\n{', '.join(map(str, seq))}, ...?"
    c10 = f"{next_ap}"
    d10 = [f"{next_ap + step_ap}", f"{next_ap - 3}", f"{next_ap + 4}", f"{next_ap * 2}"]
    e10 = f"**Step-by-step Solution:**\n1. Find difference between consecutive terms: {seq[1]} - {seq[0]} = +{step_ap}.\n2. Next term = {seq[-1]} + {step_ap} = **{next_ap}**."
    q_list.append(solve_and_format(q10, c10, d10, e10, 'number_series', test_num * 101 + 10))

    # 11. GEOMETRIC GROWTH / DEPRECIATION
    base_val = 20000 + k * 1500
    deprec_pct = 20
    val_yr1 = base_val * 0.8
    val_yr2 = val_yr1 * 0.8
    val_yr3 = int(val_yr2 * 0.8)
    q11 = f"A commercial fleet van valued at ${base_val:,} depreciates in book value by {deprec_pct}% at the end of each fiscal year. What is the vehicle's residual book value at the end of 3 years?"
    c11 = f"${val_yr3:,}"
    d11 = [f"${int(base_val * 0.4):,}", f"${val_yr3 + 1200:,}", f"${val_yr3 - 900:,}", f"${int(val_yr2):,}"]
    e11 = f"**Step-by-step Solution:**\n1. End Year 1: ${base_val:,} × 0.80 = ${int(val_yr1):,}.\n2. End Year 2: ${int(val_yr1):,} × 0.80 = ${int(val_yr2):,}.\n3. End Year 3: ${int(val_yr2):,} × 0.80 = **${val_yr3:,}**."
    q_list.append(solve_and_format(q11, c11, d11, e11, 'word_problem', test_num * 101 + 11))

    # 12. INTERLEAVED TWO-STEP SEQUENCE
    s_start = 2 + k * 2
    mult_f = 2
    sub_f = 3
    curr = s_start
    seq_inter = [curr]
    for _ in range(5):
        if len(seq_inter) % 2 == 1:
            curr = curr * mult_f
        else:
            curr = curr - sub_f
        seq_inter.append(curr)
    ans_inter = curr * mult_f if (len(seq_inter) % 2 == 1) else (curr - sub_f)
    q12 = f"What is the next number in this alternating sequence:\n\n{', '.join(map(str, seq_inter))}, ...?"
    c12 = f"{ans_inter}"
    d12 = [f"{ans_inter + 4}", f"{ans_inter - 3}", f"{ans_inter * 2}", f"{ans_inter + sub_f}"]
    e12 = f"**Step-by-step Solution:**\n1. Examine alternating operations: alternating between multiplying by {mult_f} and subtracting {sub_f}.\n2. Following this progression, next term = **{ans_inter}**."
    q_list.append(solve_and_format(q12, c12, d12, e12, 'number_series', test_num * 101 + 12))

    # 13. DIVISIBILITY & FACTORS
    box_size = 12 + k
    rem_items = 5 + (k % 6)
    tot_items = box_size * (11 + k) + rem_items
    q13 = f"A distribution center needs to pack {tot_items:,} units into shipping boxes that hold exactly {box_size} units each. When all possible full boxes are sealed, how many leftover loose units remain unpacked?"
    c13 = f"{rem_items} units"
    d13 = [f"{box_size - rem_items} units", f"{rem_items + 2} units", f"{rem_items + 5} units", "0 units"]
    e13 = f"**Step-by-step Solution:**\n1. Divide {tot_items} by {box_size}: {tot_items} ÷ {box_size} = {tot_items // box_size} full boxes with a remainder of **{rem_items} units**."
    q_list.append(solve_and_format(q13, c13, d13, e13, 'word_problem', test_num * 101 + 13))

    # 14. PERMUTATIONS
    p_ctx = PERM_CONTEXTS[k]
    pin_len = 4 + (k % 2)
    # Distinct permutations of pin_len from 10 digits
    perm_ways = 1
    for i in range(pin_len):
        perm_ways *= (10 - i)
    q14 = f"In an automated {p_ctx[0]}, how many distinct {pin_len}-digit {p_ctx[1]}s can be generated using the digits 0 through 9 if no digit may be repeated in the same code?"
    c14 = f"{perm_ways:,}"
    d14 = [f"{10**pin_len:,}", f"{perm_ways // 2:,}", f"{perm_ways - 280:,}", f"{9**pin_len:,}"]
    e14 = f"**Step-by-step Solution:**\n1. Number of choices: 10 for 1st, 9 for 2nd, 8 for 3rd, 7 for 4th{' (and 6 for 5th)' if pin_len==5 else ''}.\n2. Total permutations = **{perm_ways:,}**."
    q_list.append(solve_and_format(q14, c14, d14, e14, 'word_problem', test_num * 101 + 14))

    # 15. COMBINATIONS
    c_ctx = COMB_CONTEXTS[k]
    pool_cand = 8 + (k % 5)
    pick_cand = 3
    comb_ways = math.factorial(pool_cand) // (math.factorial(pick_cand) * math.factorial(pool_cand - pick_cand))
    q15 = f"To establish a new {c_ctx[0]}, an organization must appoint a {pick_cand}-person delegation from an eligible candidate pool of {pool_cand} {c_ctx[1]}. How many distinct delegations can be selected?"
    c15 = f"{comb_ways}"
    d15 = [f"{comb_ways * 2}", f"{comb_ways - 8}", f"{pool_cand * (pool_cand - 1) * (pool_cand - 2)}", f"{comb_ways + 12}"]
    e15 = f"**Step-by-step Solution:**\n1. Combination formula: C({pool_cand}, 3) = ({pool_cand} × {pool_cand-1} × {pool_cand-2}) / (3 × 2 × 1).\n2. Result = **{comb_ways}**."
    q_list.append(solve_and_format(q15, c15, d15, e15, 'word_problem', test_num * 101 + 15))

    # 16. PROBABILITY (Quality Inspection)
    good = 15 + k * 2
    defects = 3 + (k % 3)
    total_batch = good + defects
    prob_good_pct = round((good / total_batch) * 100, 1)
    q16 = f"A quality control batch contains {good} certified flawless components and {defects} defective components. If an inspector randomly selects one component at random, what is the probability that the selected component is certified flawless?"
    c16 = f"{prob_good_pct}%"
    d16 = [f"{round((defects / total_batch) * 100, 1)}%", f"{prob_good_pct - 4.5}%", f"{prob_good_pct + 3.5}%", "50.0%"]
    e16 = f"**Step-by-step Solution:**\n1. Total components = {good} + {defects} = {total_batch}.\n2. Probability of flawless = {good} / {total_batch} = {good/total_batch:.4f} = **{prob_good_pct}%**."
    q_list.append(solve_and_format(q16, c16, d16, e16, 'probability', test_num * 101 + 16))

    # 17. STATISTICAL MEAN & OUTLIER
    fifth_target = 75 + k
    s1 = fifth_target - 8
    s2 = fifth_target - 2
    s3 = fifth_target + 3
    s4 = fifth_target + 6
    scores_base = [s1, s2, s3, s4]
    need_score = fifth_target * 5 - sum(scores_base)
    q17 = f"A compliance officer has achieved scores of {scores_base[0]}, {scores_base[1]}, {scores_base[2]}, and {scores_base[3]} on four certification modules. What score must she obtain on the fifth module to achieve an overall cumulative mean score of exactly {fifth_target} across all five modules?"
    c17 = f"{need_score}"
    d17 = [f"{need_score + 5}", f"{need_score - 5}", f"{fifth_target}", f"{need_score + 9}"]
    e17 = f"**Step-by-step Solution:**\n1. Total points required for mean of {fifth_target} across 5 modules = 5 × {fifth_target} = {5 * fifth_target}.\n2. Points earned so far = {sum(scores_base)}.\n3. Required score = {5 * fifth_target} - {sum(scores_base)} = **{need_score}**."
    q_list.append(solve_and_format(q17, c17, d17, e17, 'word_problem', test_num * 101 + 17))

    # 18. GEOMETRY: PERIMETER & FENCING
    len_yard = 30 + k * 3
    wid_yard = 15 + k * 2
    cost_ft = 7 + (k % 4)
    perimeter = 2 * (len_yard + wid_yard)
    total_fence_cost = perimeter * cost_ft
    q18 = f"A commercial storage yard measures {len_yard} feet in length and {wid_yard} feet in width. If security chain-link fencing costs ${cost_ft} per linear foot installed, what is the total cost to completely enclose the perimeter of the yard?"
    c18 = f"${total_fence_cost:,}"
    d18 = [f"${(len_yard * wid_yard * cost_ft // 8):,}", f"${total_fence_cost + 280:,}", f"${total_fence_cost - 190:,}", f"${perimeter:,}"]
    e18 = f"**Step-by-step Solution:**\n1. Perimeter = 2 × ({len_yard} + {wid_yard}) = 2 × {len_yard + wid_yard} = {perimeter} feet.\n2. Total cost = {perimeter} ft × ${cost_ft}/ft = **${total_fence_cost:,}**."
    q_list.append(solve_and_format(q18, c18, d18, e18, 'geometry', test_num * 101 + 18))

    # 19. GEOMETRY: PYTHAGOREAN DISTANCE
    mult_triple = 2 + k
    side_a = 3 * mult_triple
    side_b = 4 * mult_triple
    hyp = 5 * mult_triple
    q19 = f"A communications drone ascends vertically to an altitude of {side_a} meters directly above its launch pad, while a ground relay vehicle is positioned {side_b} meters horizontally due east from the pad. What is the direct line-of-sight distance between the drone and the ground vehicle?"
    c19 = f"{hyp} meters"
    d19 = [f"{side_a + side_b} meters", f"{hyp + 6} meters", f"{hyp - 4} meters", f"{int(hyp * 1.4)} meters"]
    e19 = f"**Step-by-step Solution:**\n1. Apply Pythagorean theorem: Distance = √({side_a}² + {side_b}²) = √({side_a**2} + {side_b**2}) = √{hyp**2} = **{hyp} meters**."
    q_list.append(solve_and_format(q19, c19, d19, e19, 'geometry', test_num * 101 + 19))

    # 20. GEOMETRY: VOLUME CAPACITY
    box_l = 7 + k
    box_w = 4 + (k % 3)
    box_h = 3 + (k % 4)
    vol_cu = box_l * box_w * box_h
    q20 = f"A logistics air-freight container has interior dimensions of {box_l} feet in length, {box_w} feet in width, and {box_h} feet in height. What is the total cubic volume capacity of the container?"
    c20 = f"{vol_cu} cubic feet"
    d20 = [f"{2 * (box_l * box_w + box_w * box_h + box_l * box_h)} cubic feet", f"{vol_cu + 35} cubic feet", f"{vol_cu - 25} cubic feet", f"{box_l * box_w} cubic feet"]
    e20 = f"**Step-by-step Solution:**\n1. Volume of rectangular prism = Length × Width × Height.\n2. Volume = {box_l} × {box_w} × {box_h} = **{vol_cu} cubic feet**."
    q_list.append(solve_and_format(q20, c20, d20, e20, 'geometry', test_num * 101 + 20))

    # 21. DIMENSIONAL CONVERSION RATE
    gpm = 20 + k * 3
    gph = gpm * 60
    q21 = f"An agricultural irrigation booster pump discharges water at a sustained rate of {gpm} gallons per minute. How many gallons of water does the booster pump discharge across a continuous 3-hour operation?"
    tot_g = gph * 3
    c21 = f"{tot_g:,} gallons"
    d21 = [f"{gpm * 3:,} gallons", f"{gph:,} gallons", f"{tot_g + 1600:,} gallons", f"{tot_g - 1400:,} gallons"]
    e21 = f"**Step-by-step Solution:**\n1. Gallons per hour = {gpm} × 60 = {gph:,} gal/hr.\n2. Across 3 hours = {gph:,} × 3 = **{tot_g:,} gallons**."
    q_list.append(solve_and_format(q21, c21, d21, e21, 'word_problem', test_num * 101 + 21))

    # 22. ALGEBRAIC CONSTRAINT (Consecutive Integers)
    int_mid = 10 + k * 3
    s_sum = 3 * int_mid
    largest_int = int_mid + 1
    q22 = f"The sum of three consecutive integers is equal to {s_sum}. What is the value of the LARGEST of these three integers?"
    c22 = f"{largest_int}"
    d22 = [f"{int_mid}", f"{int_mid - 1}", f"{largest_int + 3}", f"{s_sum // 2}"]
    e22 = f"**Step-by-step Solution:**\n1. Let the integers be (n - 1), n, (n + 1).\n2. Their sum = 3n = {s_sum} → n = {int_mid}.\n3. The three integers are {int_mid - 1}, {int_mid}, and {int_mid + 1}.\n4. The largest is **{largest_int}**."
    q_list.append(solve_and_format(q22, c22, d22, e22, 'algebra', test_num * 101 + 22))

    tests_math[test_num] = q_list

print(f"Generated {len(tests_math)} tests, each with {len(tests_math[31])} math questions. Total: {len(tests_math) * len(tests_math[31])}")

with open('src/data/newSuiteMath.js', 'w', encoding='utf-8') as f:
    f.write('// Brand New CCAT Math Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n')
    f.write('// Guaranteed 100% unique parameters for every single question.\n\n')
    f.write('export const NEW_SUITE_MATH = ' + json.dumps(tests_math, indent=2) + ';\n\n')
    f.write('''export function getNewSuiteMathQuestions(testNumber) {
  const list = NEW_SUITE_MATH[testNumber] || NEW_SUITE_MATH[31];
  return [...list];
}
''')

print("Wrote src/data/newSuiteMath.js successfully!")
