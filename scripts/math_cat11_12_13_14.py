# Categories 11, 12, 13, 14: Number Series

# Category 11: Arithmetic Series
def get_series_arithmetic(k):
    # (start, step, count)
    configs = [
        (4, 7, 5),   # 4, 11, 18, 25, 32 -> 39
        (15, 6, 5),  # 15, 21, 27, 33, 39 -> 45
        (50, -4, 5), # 50, 46, 42, 38, 34 -> 30
        (8, 9, 5),   # 8, 17, 26, 35, 44 -> 53
        (85, -7, 5), # 85, 78, 71, 64, 57 -> 50
        (12, 11, 5), # 12, 23, 34, 45, 56 -> 67
        (3, 8, 5),   # 3, 11, 19, 27, 35 -> 43
        (92, -6, 5), # 92, 86, 80, 74, 68 -> 62
        (7, 13, 5),  # 7, 20, 33, 46, 59 -> 72
        (65, -5, 5), # 65, 60, 55, 50, 45 -> 40
        (14, 8, 5),  # 14, 22, 30, 38, 46 -> 54
        (101, -9, 5),# 101, 92, 83, 74, 65 -> 56
        (6, 12, 5),  # 6, 18, 30, 42, 54 -> 66
        (77, -8, 5), # 77, 69, 61, 53, 45 -> 37
        (9, 15, 5),  # 9, 24, 39, 54, 69 -> 84
        (120, -12, 5),# 120, 108, 96, 84, 72 -> 60
        (17, 7, 5),  # 17, 24, 31, 38, 45 -> 52
        (60, -3, 5), # 60, 57, 54, 51, 48 -> 45
        (25, 14, 5), # 25, 39, 53, 67, 81 -> 95
        (88, -11, 5),# 88, 77, 66, 55, 44 -> 33
        (5, 16, 5),  # 5, 21, 37, 53, 69 -> 85
        (70, -6, 5), # 70, 64, 58, 52, 46 -> 40
        (11, 9, 5),  # 11, 20, 29, 38, 47 -> 56
        (95, -7, 5), # 95, 88, 81, 74, 67 -> 60
        (13, 17, 5), # 13, 30, 47, 64, 81 -> 98
        (150, -15, 5),# 150, 135, 120, 105, 90 -> 75
        (2, 19, 5)   # 2, 21, 40, 59, 78 -> 97
    ]
    start, step, count = configs[k % len(configs)]
    seq = [start + i * step for i in range(count)]
    ans = start + count * step
    sign_str = f"+{step}" if step > 0 else f"{step}"
    distractors = [str(ans + d) for d in [step, -step, step * 2, -step * 2]]
    
    q_text = f"Identify the next logical number in the following numerical sequence:\n\n{', '.join(map(str, seq))}, ?"
    steps = [
        f"Observe the step difference between consecutive terms: {sign_str}.",
        f"Next term = {seq[-1]} {sign_str} = **{ans}**."
    ]
    return q_text, str(ans), distractors, steps

# Category 12: Geometric Series
def get_series_geometric(k):
    configs = [
        (3, 2, 5),    # 3, 6, 12, 24, 48 -> 96
        (2, 3, 5),    # 2, 6, 18, 54, 162 -> 486
        (5, 2, 5),    # 5, 10, 20, 40, 80 -> 160
        (1, 4, 5),    # 1, 4, 16, 64, 256 -> 1024
        (4, 3, 4),    # 4, 12, 36, 108 -> 324
        (64, 0.5, 5), # 64, 32, 16, 8, 4 -> 2
        (81, 1/3, 5), # 81, 27, 9, 3, 1 -> 1/3
        (7, 2, 5),    # 7, 14, 28, 56, 112 -> 224
        (2, 5, 4),    # 2, 10, 50, 250 -> 1250
        (6, 2, 5),    # 6, 12, 24, 48, 96 -> 192
        (1000, 0.1, 4),# 1000, 100, 10, 1 -> 0.1
        (9, 2, 5),    # 9, 18, 36, 72, 144 -> 288
        (5, 3, 4),    # 5, 15, 45, 135 -> 405
        (128, 0.5, 5),# 128, 64, 32, 16, 8 -> 4
        (11, 2, 5),   # 11, 22, 44, 88, 176 -> 352
        (1, 5, 4),    # 1, 5, 25, 125 -> 625
        (4, 2, 6),    # 4, 8, 16, 32, 64, 128 -> 256
        (3, 4, 4),    # 3, 12, 48, 192 -> 768
        (243, 1/3, 5),# 243, 81, 27, 9, 3 -> 1
        (15, 2, 5),   # 15, 30, 60, 120, 240 -> 480
        (2, 6, 4),    # 2, 12, 72, 432 -> 2592
        (8, 2, 5),    # 8, 16, 32, 64, 128 -> 256
        (256, 0.5, 5),# 256, 128, 64, 32, 16 -> 8
        (10, 3, 4),   # 10, 30, 90, 270 -> 810
        (1, 3, 6),    # 1, 3, 9, 27, 81, 243 -> 729
        (512, 0.5, 5),# 512, 256, 128, 64, 32 -> 16
        (13, 2, 5)    # 13, 26, 52, 104, 208 -> 416
    ]
    start, ratio, count = configs[k % len(configs)]
    seq = []
    val = start
    for _ in range(count):
        seq.append(int(val) if val == int(val) else val)
        val *= ratio
    ans = int(val) if val == int(val) else val
    
    if ratio >= 1:
        distractors = [str(int(ans * 1.5)), str(int(ans * 2)), str(int(ans - seq[-1])), str(int(ans + seq[-1]))]
    else:
        distractors = [str(ans * 2), str(ans / 2), str(ans + 1), str(max(0, ans - 1))]
        
    q_text = f"Identify the next number in the following geometric sequence:\n\n{', '.join(map(str, seq))}, ?"
    steps = [
        f"Each term is multiplied by a common ratio of {ratio}.",
        f"Next term = {seq[-1]} * {ratio} = **{ans}**."
    ]
    return q_text, str(ans), distractors, steps

# Category 13: Two-Tier Differences
def get_series_two_tier(k):
    # seq generated where diff increases by d_step
    configs = [
        (2, 3, 2, 5),  # start=2, first_diff=3, diff_step=2 -> diffs: 3, 5, 7, 9, 11
        (5, 4, 3, 5),  # start=5, first_diff=4, diff_step=3 -> diffs: 4, 7, 10, 13, 16
        (10, 2, 4, 5), # start=10, diffs: 2, 6, 10, 14, 18
        (1, 5, 2, 5),  # start=1, diffs: 5, 7, 9, 11, 13
        (7, 1, 3, 5),  # start=7, diffs: 1, 4, 7, 10, 13
        (3, 6, 4, 5),  # start=3, diffs: 6, 10, 14, 18, 22
        (12, 3, 3, 5), # start=12, diffs: 3, 6, 9, 12, 15
        (4, 5, 5, 5),  # start=4, diffs: 5, 10, 15, 20, 25
        (6, 2, 2, 5),  # start=6, diffs: 2, 4, 6, 8, 10
        (0, 7, 3, 5),  # start=0, diffs: 7, 10, 13, 16, 19
        (8, 4, 4, 5),  # start=8, diffs: 4, 8, 12, 16, 20
        (15, 1, 2, 5), # start=15, diffs: 1, 3, 5, 7, 9
        (2, 8, 3, 5),  # start=2, diffs: 8, 11, 14, 17, 20
        (9, 3, 5, 5),  # start=9, diffs: 3, 8, 13, 18, 23
        (5, 5, 2, 5),  # start=5, diffs: 5, 7, 9, 11, 13
        (11, 2, 3, 5), # start=11, diffs: 2, 5, 8, 11, 14
        (1, 6, 5, 5),  # start=1, diffs: 6, 11, 16, 21, 26
        (14, 4, 2, 5), # start=14, diffs: 4, 6, 8, 10, 12
        (3, 7, 4, 5),  # start=3, diffs: 7, 11, 15, 19, 23
        (10, 5, 3, 5), # start=10, diffs: 5, 8, 11, 14, 17
        (4, 2, 5, 5),  # start=4, diffs: 2, 7, 12, 17, 22
        (16, 3, 2, 5), # start=16, diffs: 3, 5, 7, 9, 11
        (2, 9, 4, 5),  # start=2, diffs: 9, 13, 17, 21, 25
        (7, 4, 5, 5),  # start=7, diffs: 4, 9, 14, 19, 24
        (1, 8, 2, 5),  # start=1, diffs: 8, 10, 12, 14, 16
        (13, 2, 4, 5), # start=13, diffs: 2, 6, 10, 14, 18
        (5, 6, 3, 5)   # start=5, diffs: 6, 9, 12, 15, 18
    ]
    start, f_diff, d_step, count = configs[k % len(configs)]
    seq = [start]
    diffs = []
    cur_diff = f_diff
    for _ in range(count):
        diffs.append(cur_diff)
        seq.append(seq[-1] + cur_diff)
        cur_diff += d_step
    
    ans = seq[-1]
    visible_seq = seq[:-1]
    last_diff = diffs[-1]
    
    distractors = [str(ans + 2), str(ans - 2), str(ans + d_step), str(ans - d_step)]
    q_text = f"Identify the next number in the following sequence:\n\n{', '.join(map(str, visible_seq))}, ?"
    steps = [
        f"Calculate the first-order differences between terms: {', '.join(map(str, diffs[:-1]))}.",
        f"The differences increase by +{d_step} each step.",
        f"Next difference = {diffs[-2]} + {d_step} = {last_diff}.",
        f"Next term = {visible_seq[-1]} + {last_diff} = **{ans}**."
    ]
    return q_text, str(ans), distractors, steps

# Category 14: Alternating Series
def get_series_alternating(k):
    # Two operations: e.g. +a, -b, +a, -b...
    configs = [
        (10, 5, -2, 6),  # 10 (+5) 15 (-2) 13 (+5) 18 (-2) 16 (+5) 21 -> (-2) 19
        (20, 6, -3, 6),  # 20 (+6) 26 (-3) 23 (+6) 29 (-3) 26 (+6) 32 -> (-3) 29
        (5, 8, -4, 6),   # 5 (+8) 13 (-4) 9 (+8) 17 (-4) 13 (+8) 21 -> (-4) 17
        (30, 4, -2, 6),  # 30 (+4) 34 (-2) 32 (+4) 36 (-2) 34 (+4) 38 -> (-2) 36
        (15, 7, -3, 6),  # 15 (+7) 22 (-3) 19 (+7) 26 (-3) 23 (+7) 30 -> (-3) 27
        (2, 10, -5, 6),  # 2 (+10) 12 (-5) 7 (+10) 17 (-5) 12 (+10) 22 -> (-5) 17
        (40, 5, -3, 6),  # 40 (+5) 45 (-3) 42 (+5) 47 (-3) 44 (+5) 49 -> (-3) 46
        (8, 9, -4, 6),   # 8 (+9) 17 (-4) 13 (+9) 22 (-4) 18 (+9) 27 -> (-4) 23
        (25, 6, -2, 6),  # 25 (+6) 31 (-2) 29 (+6) 35 (-2) 33 (+6) 39 -> (-2) 37
        (12, 8, -3, 6),  # 12 (+8) 20 (-3) 17 (+8) 25 (-3) 22 (+8) 30 -> (-3) 27
        (50, 4, -5, 6),  # 50 (+4) 54 (-5) 49 (+4) 53 (-5) 48 (+4) 52 -> (-5) 47
        (3, 11, -4, 6),  # 3 (+11) 14 (-4) 10 (+11) 21 (-4) 17 (+11) 28 -> (-4) 24
        (18, 5, -1, 6),  # 18 (+5) 23 (-1) 22 (+5) 27 (-1) 26 (+5) 31 -> (-1) 30
        (35, 7, -4, 6),  # 35 (+7) 42 (-4) 38 (+7) 45 (-4) 41 (+7) 48 -> (-4) 44
        (6, 12, -6, 6),  # 6 (+12) 18 (-6) 12 (+12) 24 (-6) 18 (+12) 30 -> (-6) 24
        (22, 4, -3, 6),  # 22 (+4) 26 (-3) 23 (+4) 27 (-3) 24 (+4) 28 -> (-3) 25
        (14, 9, -5, 6),  # 14 (+9) 23 (-5) 18 (+9) 27 (-5) 22 (+9) 31 -> (-5) 26
        (45, 6, -4, 6),  # 45 (+6) 51 (-4) 47 (+6) 53 (-4) 49 (+6) 55 -> (-4) 51
        (7, 10, -3, 6),  # 7 (+10) 17 (-3) 14 (+10) 24 (-3) 21 (+10) 31 -> (-3) 28
        (28, 5, -2, 6),  # 28 (+5) 33 (-2) 31 (+5) 36 (-2) 34 (+5) 39 -> (-2) 37
        (11, 8, -4, 6),  # 11 (+8) 19 (-4) 15 (+8) 23 (-4) 19 (+8) 27 -> (-4) 23
        (60, 3, -6, 6),  # 60 (+3) 63 (-6) 57 (+3) 60 (-6) 54 (+3) 57 -> (-6) 51
        (4, 13, -5, 6),  # 4 (+13) 17 (-5) 12 (+13) 25 (-5) 20 (+13) 33 -> (-5) 28
        (16, 7, -2, 6),  # 16 (+7) 23 (-2) 21 (+7) 28 (-2) 26 (+7) 33 -> (-2) 31
        (32, 6, -5, 6),  # 32 (+6) 38 (-5) 33 (+6) 39 (-5) 34 (+6) 40 -> (-5) 35
        (9, 11, -6, 6),  # 9 (+11) 20 (-6) 14 (+11) 25 (-6) 19 (+11) 30 -> (-6) 24
        (21, 8, -3, 6)   # 21 (+8) 29 (-3) 26 (+8) 34 (-3) 31 (+8) 39 -> (-3) 36
    ]
    start, op1, op2, length = configs[k % len(configs)]
    seq = [start]
    for i in range(length):
        step = op1 if i % 2 == 0 else op2
        seq.append(seq[-1] + step)
    
    # The question shows seq[:-1], answer is seq[-1]
    visible = seq[:-1]
    ans = seq[-1]
    last_op = op1 if (length - 1) % 2 == 0 else op2
    
    distractors = [str(ans + 2), str(ans - 2), str(ans + 3), str(ans - 3)]
    q_text = f"What is the next number in this alternating sequence:\n\n{', '.join(map(str, visible))}, ?"
    steps = [
        f"Notice the alternating pattern: add {op1}, then add {op2} ({op2}).",
        f"The next operation applies {last_op}.",
        f"Next term = {visible[-1]} + ({last_op}) = **{ans}**."
    ]
    return q_text, str(ans), distractors, steps

print("Series 11-14 loaded")
