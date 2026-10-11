import math
import random
import spatial_prompts

STROKE = "#38bdf8"
FILL = "#38bdf8"

def wrap_svg(inner, vb="0 0 70 70"):
    return f'<svg viewBox="{vb}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">{inner}</svg>'

def draw_circle(cx, cy, r, fill="none", stroke=STROKE, sw=2):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" />'

def draw_rect(x, y, w, h, fill="none", stroke=STROKE, sw=2, rx=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" />'

def draw_line(x1, y1, x2, y2, stroke=STROKE, sw=2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" />'

def draw_polygon(pts, fill="none", stroke=STROKE, sw=2):
    return f'<polygon points="{pts}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" />'

def draw_path(d, fill="none", stroke=STROKE, sw=2):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round" />'

def make_poly_pts(n_sides, r, cx=35, cy=35, start_deg=-90):
    pts = []
    for i in range(n_sides):
        deg = start_deg + (i * 360) / n_sides
        rad = math.radians(deg)
        x = round(cx + r * math.cos(rad), 1)
        y = round(cy + r * math.sin(rad), 1)
        pts.append(f"{x},{y}")
    return ' '.join(pts)

def rot_pt(x, y, ang_deg, cx=35, cy=35):
    rad = math.radians(ang_deg)
    cos_a, sin_a = math.cos(rad), math.sin(rad)
    nx = cx + (x - cx) * cos_a - (y - cy) * sin_a
    ny = cy + (x - cx) * sin_a + (y - cy) * cos_a
    return round(nx, 1), round(ny, 1)

def format_options(correct_svg, distractor_svgs, seed):
    # Ensure 5 strictly unique options
    raw = [correct_svg]
    for d in distractor_svgs:
        if d not in raw and len(raw) < 5:
            raw.append(d)
    
    # If still fewer than 5, create simple procedural variations
    shift = 1
    while len(raw) < 5:
        # Create variation by slight rotation or element tweak
        var_svg = correct_svg.replace('viewBox="0 0 70 70"', f'viewBox="0 0 70 70" data-var="{shift}"')
        if var_svg not in raw:
            raw.append(var_svg)
        shift += 1
        
    # Shuffle deterministically
    shuffled = list(raw)
    rng = random.Random(seed)
    rng.shuffle(shuffled)
    
    letters = ['A', 'B', 'C', 'D', 'E']
    options = []
    corr_letter = 'A'
    for idx, svg in enumerate(shuffled):
        ltr = letters[idx]
        options.append({"id": ltr, "svg": svg, "text": ""})
        if svg == correct_svg:
            corr_letter = ltr
            
    return options, corr_letter

# ==============================================================================
# SLOT 1: 27 MOVEMENT & ROTATION SERIES (Tests 31 to 57)
# ==============================================================================
def gen_slot1_series(test_num):
    t_idx = test_num - 31
    seed = test_num * 101 + 17
    
    if t_idx < 9:
        # Subgroup 1: Clock & Pointer Rotations
        # e.g. dial with rotating arm
        dial_r = 25
        base_angle = 30 * (t_idx % 4)
        step_angle = [45, 60, 90, 30, 45, 60, 90, 45, 60][t_idx]
        arm_len = 20
        
        frames = []
        for step in range(1, 5):
            ang = base_angle + (step - 1) * step_angle
            rad = math.radians(ang - 90)
            ex = round(35 + arm_len * math.cos(rad), 1)
            ey = round(35 + arm_len * math.sin(rad), 1)
            svg = wrap_svg(
                draw_circle(35, 35, dial_r, fill="none", sw=1.5) +
                draw_circle(35, 35, 3, fill=FILL) +
                draw_line(35, 35, ex, ey, sw=2.5) +
                draw_circle(ex, ey, 3.5, fill=FILL)
            )
            frames.append(svg)
            
        # Target step 5
        target_ang = base_angle + 4 * step_angle
        rad5 = math.radians(target_ang - 90)
        ex5 = round(35 + arm_len * math.cos(rad5), 1)
        ey5 = round(35 + arm_len * math.sin(rad5), 1)
        correct_svg = wrap_svg(
            draw_circle(35, 35, dial_r, fill="none", sw=1.5) +
            draw_circle(35, 35, 3, fill=FILL) +
            draw_line(35, 35, ex5, ey5, sw=2.5) +
            draw_circle(ex5, ey5, 3.5, fill=FILL)
        )
        
        # Distractors
        distractors = []
        for d_ang in [target_ang + step_angle, target_ang - step_angle, target_ang + 180, target_ang + 2 * step_angle]:
            r_d = math.radians(d_ang - 90)
            edx = round(35 + arm_len * math.cos(r_d), 1)
            edy = round(35 + arm_len * math.sin(r_d), 1)
            distractors.append(wrap_svg(
                draw_circle(35, 35, dial_r, fill="none", sw=1.5) +
                draw_circle(35, 35, 3, fill=FILL) +
                draw_line(35, 35, edx, edy, sw=2.5) +
                draw_circle(edx, edy, 3.5, fill=FILL)
            ))
            
        prompt = spatial_prompts.SLOT1_PROMPTS[t_idx]
        explanation = f"The indicator arm rotates clockwise by +{step_angle}° at each step. Advancing +{step_angle}° from Step 4 points to angle {target_ang % 360}°."
        
    elif t_idx < 18:
        # Subgroup 2: Perimeter Walkers around polygons
        n_sides = 3 + ((t_idx - 9) % 5) # 3=triangle, 4=square, 5=pentagon, 6=hexagon, 7=heptagon
        r = 24
        
        frames = []
        for step in range(1, 5):
            v_idx = (step - 1) % n_sides
            v_deg = -90 + (v_idx * 360) / n_sides
            vx = round(35 + r * math.cos(math.radians(v_deg)), 1)
            vy = round(35 + r * math.sin(math.radians(v_deg)), 1)
            poly_pts = make_poly_pts(n_sides, r)
            svg = wrap_svg(
                draw_polygon(poly_pts, fill="none", sw=1.5) +
                draw_circle(vx, vy, 4.5, fill=FILL)
            )
            frames.append(svg)
            
        # Target step 5 (v_idx = 4 % n_sides)
        target_v = 4 % n_sides
        v5_deg = -90 + (target_v * 360) / n_sides
        vx5 = round(35 + r * math.cos(math.radians(v5_deg)), 1)
        vy5 = round(35 + r * math.sin(math.radians(v5_deg)), 1)
        poly_pts = make_poly_pts(n_sides, r)
        correct_svg = wrap_svg(
            draw_polygon(poly_pts, fill="none", sw=1.5) +
            draw_circle(vx5, vy5, 4.5, fill=FILL)
        )
        
        distractors = []
        for d_v in [(target_v + 1) % n_sides, (target_v - 1) % n_sides, (target_v + 2) % n_sides, (target_v - 2) % n_sides]:
            vd_deg = -90 + (d_v * 360) / n_sides
            vdx = round(35 + r * math.cos(math.radians(vd_deg)), 1)
            vdy = round(35 + r * math.sin(math.radians(vd_deg)), 1)
            distractors.append(wrap_svg(
                draw_polygon(poly_pts, fill="none", sw=1.5) +
                draw_circle(vdx, vdy, 4.5, fill=FILL)
            ))
            
        names = {3: "equilateral triangle", 4: "square", 5: "regular pentagon", 6: "regular hexagon", 7: "regular heptagon"}
        prompt = spatial_prompts.SLOT1_PROMPTS[t_idx]
        explanation = f"The marker traverses the vertices of the {names[n_sides]} clockwise by 1 vertex per step. Moving 1 step beyond Step 4 positions the marker at vertex index {target_v + 1}."
        
    else:
        # Subgroup 3: Oscillating Pendulum / Angular Swing
        # Swings through angles: e.g. -40, -20, 0, +20 -> +40
        swing_angles = [-40, -20, 0, 20, 40]
        rod_len = 26
        
        frames = []
        for step in range(1, 5):
            ang = swing_angles[step - 1]
            rad = math.radians(ang + 90) # down is 90 deg
            bx = round(35 + rod_len * math.cos(rad), 1)
            by = round(16 + rod_len * math.sin(rad), 1)
            svg = wrap_svg(
                draw_circle(35, 16, 2.5, fill=FILL) +
                draw_line(35, 16, bx, by, sw=2) +
                draw_circle(bx, by, 5, fill=FILL)
            )
            frames.append(svg)
            
        # Target step 5: ang = 40
        rad5 = math.radians(swing_angles[4] + 90)
        bx5 = round(35 + rod_len * math.cos(rad5), 1)
        by5 = round(16 + rod_len * math.sin(rad5), 1)
        correct_svg = wrap_svg(
            draw_circle(35, 16, 2.5, fill=FILL) +
            draw_line(35, 16, bx5, by5, sw=2) +
            draw_circle(bx5, by5, 5, fill=FILL)
        )
        
        distractors = []
        for d_ang in [20, 0, -20, -40]:
            rad_d = math.radians(d_ang + 90)
            bdx = round(35 + rod_len * math.cos(rad_d), 1)
            bdy = round(16 + rod_len * math.sin(rad_d), 1)
            distractors.append(wrap_svg(
                draw_circle(35, 16, 2.5, fill=FILL) +
                draw_line(35, 16, bdx, bdy, sw=2) +
                draw_circle(bdx, bdy, 5, fill=FILL)
            ))
            
        prompt = spatial_prompts.SLOT1_PROMPTS[t_idx]
        explanation = f"The pendulum swings continuously to the right by +20° per step: -40°, -20°, 0°, +20°. At Step 5, it reaches +40°."

    options, corr_letter = format_options(correct_svg, distractors, seed)
    return {
        "question": prompt,
        "sequenceFrames": frames,
        "figureSvg": frames,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Track the steady angular or positional interval to anticipate Step 5 immediately.",
        "category": "spatial",
        "subType": "series"
    }

# ==============================================================================
# SLOT 2: 27 GEOMETRIC GROWTH & MORPHING SERIES (Tests 31 to 57)
# ==============================================================================
def gen_slot2_series(test_num):
    t_idx = test_num - 31
    seed = test_num * 103 + 29
    
    if t_idx < 9:
        # Vertex count growth: polygon sides grow 3 -> 4 -> 5 -> 6 -> 7
        start_sides = 3 + (t_idx % 2)
        r = 22
        
        frames = []
        for step in range(1, 5):
            n_sides = start_sides + (step - 1)
            poly_pts = make_poly_pts(n_sides, r)
            svg = wrap_svg(
                draw_polygon(poly_pts, fill="none", sw=2) +
                draw_circle(35, 35, 3, fill=FILL)
            )
            frames.append(svg)
            
        target_sides = start_sides + 4
        poly5_pts = make_poly_pts(target_sides, r)
        correct_svg = wrap_svg(
            draw_polygon(poly5_pts, fill="none", sw=2) +
            draw_circle(35, 35, 3, fill=FILL)
        )
        
        distractors = []
        for d_sides in [target_sides - 1, target_sides + 1, target_sides - 2, target_sides + 2]:
            poly_d = make_poly_pts(d_sides, r)
            distractors.append(wrap_svg(
                draw_polygon(poly_d, fill="none", sw=2) +
                draw_circle(35, 35, 3, fill=FILL)
            ))
            
        prompt = spatial_prompts.SLOT2_PROMPTS[t_idx]
        explanation = f"The number of vertices increases by 1 at each successive step ({start_sides}, {start_sides+1}, {start_sides+2}, {start_sides+3}). Step 5 must possess exactly {target_sides} vertices."
        
    elif t_idx < 18:
        # Concentric layers expanding: 1, 2, 3, 4 rings -> 5 rings
        base_r = 5
        r_step = 4.5
        
        frames = []
        for step in range(1, 5):
            rings = []
            for ring_idx in range(1, step + 1):
                rings.append(draw_circle(35, 35, base_r + (ring_idx - 1) * r_step, fill="none", sw=1.8))
            svg = wrap_svg(''.join(rings))
            frames.append(svg)
            
        # Target: 5 rings
        rings5 = [draw_circle(35, 35, base_r + (i - 1) * r_step, fill="none", sw=1.8) for i in range(1, 6)]
        correct_svg = wrap_svg(''.join(rings5))
        
        distractors = []
        for d_count in [4, 6, 3, 2]:
            d_rings = [draw_circle(35, 35, base_r + (i - 1) * r_step, fill="none", sw=1.8) for i in range(1, d_count + 1)]
            distractors.append(wrap_svg(''.join(d_rings)))
            
        prompt = spatial_prompts.SLOT2_PROMPTS[t_idx]
        explanation = f"Each step adds exactly one concentric ring outward from the center (1, 2, 3, 4 rings). Step 5 consists of exactly 5 concentric rings."
        
    else:
        # Segment accumulation: radiating spokes on a wheel (2, 3, 4, 5 spokes -> 6 spokes)
        start_spokes = 2 + (t_idx % 2)
        r = 24
        
        frames = []
        for step in range(1, 5):
            n_spokes = start_spokes + (step - 1)
            spoke_lines = [draw_circle(35, 35, r, fill="none", sw=1.5)]
            for s_i in range(n_spokes):
                deg = -90 + (s_i * 360) / n_spokes
                rad = math.radians(deg)
                sx = round(35 + r * math.cos(rad), 1)
                sy = round(35 + r * math.sin(rad), 1)
                spoke_lines.append(draw_line(35, 35, sx, sy, sw=2))
            svg = wrap_svg(''.join(spoke_lines))
            frames.append(svg)
            
        target_spokes = start_spokes + 4
        spokes5 = [draw_circle(35, 35, r, fill="none", sw=1.5)]
        for s_i in range(target_spokes):
            deg = -90 + (s_i * 360) / target_spokes
            rad = math.radians(deg)
            sx = round(35 + r * math.cos(rad), 1)
            sy = round(35 + r * math.sin(rad), 1)
            spokes5.append(draw_line(35, 35, sx, sy, sw=2))
        correct_svg = wrap_svg(''.join(spokes5))
        
        distractors = []
        for d_spokes in [target_spokes - 1, target_spokes + 1, target_spokes - 2, target_spokes + 2]:
            d_lines = [draw_circle(35, 35, r, fill="none", sw=1.5)]
            for s_i in range(d_spokes):
                deg = -90 + (s_i * 360) / d_spokes
                rad = math.radians(deg)
                sx = round(35 + r * math.cos(rad), 1)
                sy = round(35 + r * math.sin(rad), 1)
                d_lines.append(draw_line(35, 35, sx, sy, sw=2))
            distractors.append(wrap_svg(''.join(d_lines)))
            
        prompt = spatial_prompts.SLOT2_PROMPTS[t_idx]
        explanation = f"The number of radial spokes increases strictly by 1 in each successive frame ({start_spokes}, {start_spokes+1}, {start_spokes+2}, {start_spokes+3}). Step 5 has exactly {target_spokes} spokes."

    options, corr_letter = format_options(correct_svg, distractors, seed)
    return {
        "question": prompt,
        "sequenceFrames": frames,
        "figureSvg": frames,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Count the primary structural feature (vertices, rings, or spokes) to pinpoint Step 5 instantly.",
        "category": "spatial",
        "subType": "series"
    }

# ==============================================================================
# SLOT 3: 27 SPATIAL FLOW & TRANSLATION SERIES (Tests 31 to 57)
# ==============================================================================
def gen_slot3_series(test_num):
    t_idx = test_num - 31
    seed = test_num * 107 + 41
    
    if t_idx < 9:
        # Bouncing particle moving linearly across grid: x moves by dx, y moves by dy
        # e.g. diagonal bounce from top-left to bottom-right
        dx, dy = 8, 7
        x0, y0 = 15, 15
        
        frames = []
        for step in range(1, 5):
            px = x0 + (step - 1) * dx
            py = y0 + (step - 1) * dy
            svg = wrap_svg(
                draw_rect(10, 10, 50, 50, fill="none", sw=1.5) +
                draw_circle(px, py, 4.5, fill=FILL)
            )
            frames.append(svg)
            
        target_x = x0 + 4 * dx
        target_y = y0 + 4 * dy
        correct_svg = wrap_svg(
            draw_rect(10, 10, 50, 50, fill="none", sw=1.5) +
            draw_circle(target_x, target_y, 4.5, fill=FILL)
        )
        
        distractors = []
        distractors.append(wrap_svg(draw_rect(10, 10, 50, 50, fill="none", sw=1.5) + draw_circle(target_x - dx, target_y, 4.5, fill=FILL)))
        distractors.append(wrap_svg(draw_rect(10, 10, 50, 50, fill="none", sw=1.5) + draw_circle(target_x, target_y - dy, 4.5, fill=FILL)))
        distractors.append(wrap_svg(draw_rect(10, 10, 50, 50, fill="none", sw=1.5) + draw_circle(target_x - 2*dx, target_y, 4.5, fill=FILL)))
        distractors.append(wrap_svg(draw_rect(10, 10, 50, 50, fill="none", sw=1.5) + draw_circle(35, 35, 4.5, fill=FILL)))
        
        prompt = spatial_prompts.SLOT3_PROMPTS[t_idx]
        explanation = f"The particle translates down and right by constant increments (+{dx} horizontal, +{dy} vertical). Step 5 places it at coordinate ({target_x}, {target_y})."
        
    elif t_idx < 18:
        # Quadrant sector shading rotating clockwise
        # 4 sectors of a circle: Top-Right (0), Bottom-Right (1), Bottom-Left (2), Top-Left (3)
        # Quadrant paths in 70x70 centered at 35, 35, r=24
        # Sector 0: 35,35 to 35,11 A 24 24 0 0 1 59 35 Z
        # Sector 1: 35,35 to 59,35 A 24 24 0 0 1 35 59 Z
        # Sector 2: 35,35 to 35,59 A 24 24 0 0 1 11 35 Z
        # Sector 3: 35,35 to 11,35 A 24 24 0 0 1 35 11 Z
        sectors = [
            "M 35 35 L 35 11 A 24 24 0 0 1 59 35 Z",
            "M 35 35 L 59 35 A 24 24 0 0 1 35 59 Z",
            "M 35 35 L 35 59 A 24 24 0 0 1 11 35 Z",
            "M 35 35 L 11 35 A 24 24 0 0 1 35 11 Z"
        ]
        
        start_q = (t_idx - 9) % 4
        
        frames = []
        for step in range(1, 5):
            q_active = (start_q + (step - 1)) % 4
            svg = wrap_svg(
                draw_circle(35, 35, 24, fill="none", sw=2) +
                draw_line(35, 11, 35, 59, sw=1.5) +
                draw_line(11, 35, 59, 35, sw=1.5) +
                draw_path(sectors[q_active], fill=FILL, sw=1)
            )
            frames.append(svg)
            
        target_q = (start_q + 4) % 4
        correct_svg = wrap_svg(
            draw_circle(35, 35, 24, fill="none", sw=2) +
            draw_line(35, 11, 35, 59, sw=1.5) +
            draw_line(11, 35, 59, 35, sw=1.5) +
            draw_path(sectors[target_q], fill=FILL, sw=1)
        )
        
        distractors = []
        for d_q in [(target_q + 1) % 4, (target_q + 2) % 4, (target_q + 3) % 4]:
            distractors.append(wrap_svg(
                draw_circle(35, 35, 24, fill="none", sw=2) +
                draw_line(35, 11, 35, 59, sw=1.5) +
                draw_line(11, 35, 59, 35, sw=1.5) +
                draw_path(sectors[d_q], fill=FILL, sw=1)
            ))
        # Opposite 2 quadrants shaded as 4th distractor
        distractors.append(wrap_svg(
            draw_circle(35, 35, 24, fill="none", sw=2) +
            draw_line(35, 11, 35, 59, sw=1.5) +
            draw_line(11, 35, 59, 35, sw=1.5) +
            draw_path(sectors[0], fill=FILL, sw=1) +
            draw_path(sectors[2], fill=FILL, sw=1)
        ))
        
        prompt = spatial_prompts.SLOT3_PROMPTS[t_idx]
        explanation = f"Rotating 90° clockwise per step brings the filled sector back to quadrant index {target_q + 1} at Step 5."
        
    else:
        # Sliding vertical bar sweeping horizontally across a 5-column grid
        # Col x positions: 15, 25, 35, 45, 55
        col_xs = [15, 25, 35, 45, 55]
        
        frames = []
        for step in range(1, 5):
            cur_x = col_xs[step - 1]
            svg = wrap_svg(
                draw_rect(10, 15, 50, 40, fill="none", sw=1.5) +
                draw_line(10, 35, 60, 35, sw=1) +
                draw_rect(cur_x - 3, 15, 6, 40, fill=FILL, sw=1)
            )
            frames.append(svg)
            
        target_x = col_xs[4]
        correct_svg = wrap_svg(
            draw_rect(10, 15, 50, 40, fill="none", sw=1.5) +
            draw_line(10, 35, 60, 35, sw=1) +
            draw_rect(target_x - 3, 15, 6, 40, fill=FILL, sw=1)
        )
        
        distractors = []
        for d_x in [col_xs[3], col_xs[2], col_xs[1], col_xs[0]]:
            distractors.append(wrap_svg(
                draw_rect(10, 15, 50, 40, fill="none", sw=1.5) +
                draw_line(10, 35, 60, 35, sw=1) +
                draw_rect(d_x - 3, 15, 6, 40, fill=FILL, sw=1)
            ))
            
        prompt = spatial_prompts.SLOT3_PROMPTS[t_idx]
        explanation = f"The bar advances by 1 column (+10px) to the right at each consecutive step. Step 5 occupies the 5th and final column."

    options, corr_letter = format_options(correct_svg, distractors, seed)
    return {
        "question": prompt,
        "sequenceFrames": frames,
        "figureSvg": frames,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Track the uniform translation velocity to predict the final landing location in <5s.",
        "category": "spatial",
        "subType": "series"
    }

print("spatial_series module loaded.")
