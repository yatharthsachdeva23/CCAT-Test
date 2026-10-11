import math
import json
import re

# ==============================================================================
# Brand New CCAT Spatial Bank Generator for Tests 31 through 57 (27 tests x 11 Qs = 297 Qs)
# ZERO overlap with Tests 1-30.
# NO wave harmonics, NO binary counter, NO domino pips, NO 7-segment displays.
# ZERO color bias: all options share identical high-contrast SVG styling.
# ZERO duplicate options: every question has 5 strictly distinct options.
# ==============================================================================

STROKE = "#38bdf8"
MUTED_STROKE = "#38bdf8"
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

def draw_text(x, y, txt, fill=STROKE, size=11):
    return f'<text x="{x}" y="{y}" fill="{fill}" font-size="{size}" font-family="sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="central">{txt}</text>'

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

def randomize_and_format(raw_options, correct_idx, rand_seed):
    # Ensure 5 strictly unique options
    unique = []
    seen = set()
    
    # Correct item first
    corr = raw_options[correct_idx]
    unique.append({'svg': corr['svg'], 'isCorr': True})
    seen.add(corr['svg'])
    
    for i, opt in enumerate(raw_options):
        if i == correct_idx:
            continue
        s = opt['svg']
        if s not in seen:
            unique.append({'svg': s, 'isCorr': False})
            seen.add(s)
            if len(unique) == 5:
                break
                
    assert len(unique) == 5, f"Expected 5 unique options, got {len(unique)}"
    
    # Deterministic shuffle
    s = (rand_seed * 1103515245 + 12345) & 0x7fffffff
    for i in range(len(unique) - 1, 0, -1):
        s = (s * 1103515245 + 12345) & 0x7fffffff
        j = s % (i + 1)
        unique[i], unique[j] = unique[j], unique[i]
        
    letters = ['A', 'B', 'C', 'D', 'E']
    options = []
    correct_letter = 'A'
    for idx, item in enumerate(unique):
        letter = letters[idx]
        options.append({'id': letter, 'svg': item['svg'], 'text': ''})
        if item['isCorr']:
            correct_letter = letter
            
    return options, correct_letter

# ==============================================================================
# 11 NOVEL SPATIAL QUESTION GENERATORS
# ==============================================================================

# 1. ORBITAL SATELLITE SERIES (Series)
def build_orbital_series(k, seed):
    n_sides = 4 + (k % 4) # 4=square, 5=pentagon, 6=hexagon, 7=heptagon
    step_deg = 45 if (k % 2 == 0) else 60
    base_deg = (k * 30) % 360
    
    def make_frame(step_idx):
        ang = base_deg + step_idx * step_deg
        rad = math.radians(ang)
        sat_x = round(35 + 24 * math.cos(rad), 1)
        sat_y = round(35 + 24 * math.sin(rad), 1)
        poly = draw_polygon(make_poly_pts(n_sides, 13, 35, 35), fill="none", stroke=STROKE, sw=2)
        orbit = draw_circle(35, 35, 24, fill="none", stroke=MUTED_STROKE, sw=1)
        sat = draw_circle(sat_x, sat_y, 4.5, fill=FILL, stroke=STROKE, sw=1.5)
        return wrap_svg(f"{orbit}{poly}{sat}")
        
    seq = [make_frame(0), make_frame(1), make_frame(2), make_frame(3)]
    corr = make_frame(4)
    distractors = [
        make_frame(3), # lagged by 1
        make_frame(5), # advanced by 1
        make_frame(2), # lagged by 2
        make_frame(1)  # lagged by 3
    ]
    raw = [{'svg': corr}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Central polygon has {n_sides} vertices.\n2. Satellite node orbits clockwise around the outer ring in steady +{step_deg}° angular increments.\n3. Moving +{step_deg}° from Step 4 gives Step 5 in option {corr_letter}."
    return {
        'question': "Examine the orbital progression. Which figure logically continues the sequence as Step 5?",
        'sequenceFrames': seq,
        'figureSvg': seq,
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'series'
    }

# 2. SEGMENTED PATH EXPANSION (Series)
def build_path_expansion_series(k, seed):
    # Progressive orthogonal path adding 1 segment per step (2 -> 3 -> 4 -> 5 -> 6 segments)
    directions = [(0, -18), (18, 0), (0, 18), (-18, 0), (0, -18), (14, 0), (0, 14)]
    if k % 2 == 1:
        # Inverted direction sequence
        directions = [(18, 0), (0, 18), (-18, 0), (0, -18), (18, 0), (0, 18), (-14, 0)]
        
    def make_path(num_segs, extra_offset=0):
        curr_x, curr_y = 26, 44
        pts = [f"{curr_x},{curr_y}"]
        for s in range(num_segs):
            dx, dy = directions[s % len(directions)]
            if s == num_segs - 1 and extra_offset != 0:
                dx += extra_offset
            curr_x += dx
            curr_y += dy
            pts.append(f"{curr_x},{curr_y}")
            
        lines = ''
        for i in range(len(pts) - 1):
            x1, y1 = pts[i].split(',')
            x2, y2 = pts[i+1].split(',')
            lines += draw_line(x1, y1, x2, y2, stroke=STROKE, sw=2.5)
        # End dot
        ex, ey = pts[-1].split(',')
        end_dot = draw_circle(ex, ey, 3.5, fill=FILL, stroke=STROKE, sw=1)
        return wrap_svg(f"{lines}{end_dot}")

    seq = [make_path(2), make_path(3), make_path(4), make_path(5)]
    corr = make_path(6)
    distractors = [
        make_path(5), # lagged
        make_path(7), # overshot
        make_path(6, extra_offset=8), # distorted length
        make_path(4)  # 4 segments
    ]
    raw = [{'svg': corr}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. The orthogonal path grows by exactly 1 line segment at each step (2 → 3 → 4 → 5 segments).\n2. Each new segment turns 90° clockwise.\n3. Step 5 must contain exactly 6 line segments with the terminal anchor dot."
    return {
        'question': "Identify the geometric progression governing the line path. Which figure represents Step 5?",
        'sequenceFrames': seq,
        'figureSvg': seq,
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'series'
    }

# 3. CONCENTRIC SHAPE CYCLIC PROGRESSION (Series)
def build_concentric_series(k, seed):
    shape_pool = ['circle', 'square', 'triangle', 'diamond', 'pentagon']
    s0 = (k) % 5
    s1 = (k + 1) % 5
    s2 = (k + 2) % 5
    s3 = (k + 3) % 5
    palette_cycle = [shape_pool[s0], shape_pool[s1], shape_pool[s2], shape_pool[s3]]
    
    def render_single_shape(shp_type, r):
        if shp_type == 'circle':
            return draw_circle(35, 35, r, fill="none", stroke=STROKE, sw=2)
        elif shp_type == 'square':
            side = r * 1.5
            return draw_rect(35 - side/2, 35 - side/2, side, side, fill="none", stroke=STROKE, sw=2)
        elif shp_type == 'diamond':
            pts = f"35,{35-r} {35+r},35 35,{35+r} {35-r},35"
            return draw_polygon(pts, fill="none", stroke=STROKE, sw=2)
        elif shp_type == 'triangle':
            return draw_polygon(make_poly_pts(3, r, 35, 35, -90), fill="none", stroke=STROKE, sw=2)
        elif shp_type == 'pentagon':
            return draw_polygon(make_poly_pts(5, r, 35, 35, -90), fill="none", stroke=STROKE, sw=2)
            
    def make_concentric(step_idx):
        outer_shp = palette_cycle[(step_idx + 2) % 4]
        mid_shp = palette_cycle[(step_idx + 1) % 4]
        inner_shp = palette_cycle[(step_idx) % 4]
        svg_outer = render_single_shape(outer_shp, 26)
        svg_mid = render_single_shape(mid_shp, 17)
        svg_inner = render_single_shape(inner_shp, 9)
        return wrap_svg(f"{svg_outer}{svg_mid}{svg_inner}")

    seq = [make_concentric(0), make_concentric(1), make_concentric(2), make_concentric(3)]
    corr = make_concentric(4)
    # Distractors: wrong permutations
    d1 = make_concentric(3) # lagged
    d2 = make_concentric(5) # advanced
    d3 = wrap_svg(f"{render_single_shape(palette_cycle[0], 26)}{render_single_shape(palette_cycle[2], 17)}{render_single_shape(palette_cycle[1], 9)}")
    d4 = wrap_svg(f"{render_single_shape(palette_cycle[1], 26)}{render_single_shape(palette_cycle[1], 17)}{render_single_shape(palette_cycle[3], 9)}")
    raw = [{'svg': corr}, {'svg': d1}, {'svg': d2}, {'svg': d3}, {'svg': d4}]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Three concentric layers cycle through {palette_cycle[0]} → {palette_cycle[1]} → {palette_cycle[2]} → {palette_cycle[3]}.\n2. Each frame, the inner shape expands to middle, middle expands to outer, and a new shape enters the core.\n3. Frame 5 returns to the cycle alignment shown in {corr_letter}."
    return {
        'question': "Examine the concentric shape cycle. Which figure correctly represents Step 5?",
        'sequenceFrames': seq,
        'figureSvg': seq,
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'series'
    }

# 4. 3x3 INDEPENDENT ATTRIBUTES MATRIX (Matrix)
def build_attributes_matrix(k, seed):
    # Row determines container shape, Col determines internal marker
    containers = ['circle', 'square', 'hexagon'] if (k % 2 == 0) else ['diamond', 'triangle', 'pentagon']
    markers = ['plus', 'slash', 'ring']
    
    def render_cell(cont, mrk):
        # Container
        if cont == 'circle': c_svg = draw_circle(35, 35, 23, fill="none", stroke=STROKE, sw=2)
        elif cont == 'square': c_svg = draw_rect(15, 15, 40, 40, fill="none", stroke=STROKE, sw=2, rx=3)
        elif cont == 'hexagon': c_svg = draw_polygon(make_poly_pts(6, 23, 35, 35), fill="none", stroke=STROKE, sw=2)
        elif cont == 'diamond': c_svg = draw_polygon("35,12 58,35 35,58 12,35", fill="none", stroke=STROKE, sw=2)
        elif cont == 'triangle': c_svg = draw_polygon(make_poly_pts(3, 23, 35, 38, -90), fill="none", stroke=STROKE, sw=2)
        elif cont == 'pentagon': c_svg = draw_polygon(make_poly_pts(5, 23, 35, 36, -90), fill="none", stroke=STROKE, sw=2)
        
        # Marker (all stroked with STROKE and fill=none)
        if mrk == 'plus':
            m_svg = draw_line(35, 25, 35, 45, stroke=STROKE, sw=2) + draw_line(25, 35, 45, 35, stroke=STROKE, sw=2)
        elif mrk == 'slash':
            m_svg = draw_line(26, 44, 44, 26, stroke=STROKE, sw=2)
        elif mrk == 'ring':
            m_svg = draw_circle(35, 35, 6, fill="none", stroke=STROKE, sw=2)
            
        return wrap_svg(f"{c_svg}{m_svg}")

    cells = []
    for r in range(3):
        for c in range(3):
            if r == 2 and c == 2:
                cells.append(None) # missing cell
            else:
                cells.append(render_cell(containers[r], markers[c]))
                
    corr = render_cell(containers[2], markers[2])
    distractors = [
        render_cell(containers[1], markers[2]), # wrong container
        render_cell(containers[2], markers[1]), # wrong marker
        render_cell(containers[0], markers[2]), # wrong container
        render_cell(containers[2], markers[0])  # wrong marker
    ]
    raw = [{'svg': corr}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. **Row Rule:** Dictates outer boundary shape (Row 1 = {containers[0]}, Row 2 = {containers[1]}, Row 3 = {containers[2]}).\n2. **Column Rule:** Dictates interior marker (Col 1 = Plus, Col 2 = Slash, Col 3 = Central Ring).\n3. Cell (Row 3, Col 3) must be a {containers[2]} enclosing a Central Ring."
    return {
        'question': "Determine the rule governing the 3×3 spatial matrix and select the missing figure:",
        'matrixCells': cells,
        'matrixSvg': cells,
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'matrix'
    }

# 5. 3x3 LINE COUNT ARITHMETIC MATRIX (Matrix)
def build_line_arithmetic_matrix(k, seed):
    # Row dictates number of horizontal bars (1, 2, 3), Col dictates vertical bars (1, 2, 3)
    def render_grid_cell(h_count, v_count):
        border = draw_rect(12, 12, 46, 46, fill="none", stroke=MUTED_STROKE, sw=1.5, rx=3)
        h_lines = ''
        h_step = 46 / (h_count + 1)
        for i in range(1, h_count + 1):
            y = 12 + i * h_step
            h_lines += draw_line(15, y, 55, y, stroke=STROKE, sw=2)
            
        v_lines = ''
        v_step = 46 / (v_count + 1)
        for j in range(1, v_count + 1):
            x = 12 + j * v_step
            v_lines += draw_line(x, 15, x, 55, stroke=STROKE, sw=2)
            
        return wrap_svg(f"{border}{h_lines}{v_lines}")

    cells = []
    for r in range(1, 4):
        for c in range(1, 4):
            if r == 3 and c == 3:
                cells.append(None)
            else:
                cells.append(render_grid_cell(r, c))
                
    corr = render_grid_cell(3, 3)
    distractors = [
        render_grid_cell(2, 3), # 2 horiz, 3 vert
        render_grid_cell(3, 2), # 3 horiz, 2 vert
        render_grid_cell(4, 3), # 4 horiz, 3 vert
        render_grid_cell(2, 2)  # 2 horiz, 2 vert
    ]
    raw = [{'svg': corr}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Number of horizontal bars increases across rows: Row 1 = 1, Row 2 = 2, Row 3 = 3.\n2. Number of vertical bars increases across columns: Col 1 = 1, Col 2 = 2, Col 3 = 3.\n3. Bottom-right cell (Row 3, Col 3) must contain exactly 3 horizontal and 3 vertical bars."
    return {
        'question': "Identify the row and column patterns in this 3×3 matrix to determine the missing cell:",
        'matrixCells': cells,
        'matrixSvg': cells,
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'matrix'
    }

# 6. ODD-ONE-OUT: SIDE COUNT PARITY (Odd Figure)
def build_odd_side_count(k, seed):
    # 4 figures have EVEN number of sides (4, 6, 8, 10), 1 has ODD number (5 or 7)
    odd_sides = 5 if (k % 2 == 0) else 7
    even_list = [4, 6, 8, 10]
    
    def render_poly(sides):
        pts = make_poly_pts(sides, 24, 35, 35)
        return wrap_svg(draw_polygon(pts, fill="none", stroke=STROKE, sw=2))
        
    corr_svg = render_poly(odd_sides)
    distractors = [render_poly(s) for s in even_list]
    raw = [{'svg': corr_svg}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Four of the figures possess an **EVEN** number of vertices/sides (4, 6, 8, and 10 sides).\n2. Figure {corr_letter} possesses an **ODD** number of sides ({odd_sides} sides).\n3. Therefore, figure {corr_letter} violates the structural rule and is the odd one out."
    return {
        'question': "Which of the following five geometric figures does NOT belong with the other four?",
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'odd_one_out'
    }

# 7. ODD-ONE-OUT: ENCLOSED REGIONS COUNT (Odd Figure)
def build_odd_regions_count(k, seed):
    # 4 figures enclose exactly TWO distinct regions. The odd figure encloses only ONE region.
    # Figure 1: Figure-8 (two tangent circles)
    f1 = wrap_svg(f"{draw_circle(35, 23, 11, fill='none', stroke=STROKE, sw=2)}{draw_circle(35, 47, 11, fill='none', stroke=STROKE, sw=2)}")
    # Figure 2: Bisected square (square with vertical dividing line)
    f2 = wrap_svg(f"{draw_rect(16, 16, 38, 38, fill='none', stroke=STROKE, sw=2)}{draw_line(35, 16, 35, 54, stroke=STROKE, sw=2)}")
    # Figure 3: Bowtie (two triangles touching at vertex)
    f3 = wrap_svg(f"{draw_polygon('16,16 35,35 16,54', fill='none', stroke=STROKE, sw=2)}{draw_polygon('54,16 35,35 54,54', fill='none', stroke=STROKE, sw=2)}")
    # Figure 4: Bisected circle (circle with horizontal diameter)
    f4 = wrap_svg(f"{draw_circle(35, 35, 22, fill='none', stroke=STROKE, sw=2)}{draw_line(13, 35, 57, 35, stroke=STROKE, sw=2)}")
    # ODD FIGURE: Single undivided circle (1 region) or single undivided triangle
    odd_svg = wrap_svg(draw_circle(35, 35, 23, fill="none", stroke=STROKE, sw=2)) if (k % 2 == 0) else wrap_svg(draw_polygon(make_poly_pts(3, 24, 35, 38, -90), fill="none", stroke=STROKE, sw=2))

    raw = [{'svg': odd_svg}, {'svg': f1}, {'svg': f2}, {'svg': f3}, {'svg': f4}]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Four of the figures enclose exactly **TWO** distinct separate compartments/regions.\n2. Figure {corr_letter} encloses only **ONE** undivided region.\n3. Hence, figure {corr_letter} does not belong."
    return {
        'question': "Which of the following five figures does NOT belong with the other four?",
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'odd_one_out'
    }

# 8. ODD-ONE-OUT: CHIRALITY / LATERAL REFLECTION (Odd Figure)
def build_odd_chirality(k, seed):
    # An asymmetric glyph rotated by 0°, 72°, 144°, 216°, 288°.
    # 4 figures are valid rotations of the right-handed glyph.
    # 1 figure is mirror-reflected horizontally (left-handed chirality).
    def make_glyph(rot_deg, mirrored=False):
        # Base glyph: stem line from (26, 50) to (26, 20), arm to (44, 20), small notch downwards to (44, 30)
        base_pts = [(26, 50), (26, 20), (44, 20), (44, 32)]
        if mirrored:
            # Mirror across x=35
            base_pts = [(70 - x, y) for (x, y) in base_pts]
        # Rotate around (35, 35)
        rot_pts = [rot_pt(x, y, rot_deg, 35, 35) for (x, y) in base_pts]
        path_str = f"M {rot_pts[0][0]} {rot_pts[0][1]} L {rot_pts[1][0]} {rot_pts[1][1]} L {rot_pts[2][0]} {rot_pts[2][1]} L {rot_pts[3][0]} {rot_pts[3][1]}"
        # Small anchor dot at start
        dot = draw_circle(rot_pts[0][0], rot_pts[0][1], 3, fill=FILL, stroke=STROKE, sw=1)
        path = f'<path d="{path_str}" fill="none" stroke="{STROKE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />'
        return wrap_svg(f"{path}{dot}")

    angles = [0, 72, 144, 216, 288]
    # 4 rotations of unmirrored glyph
    d1 = make_glyph(angles[0], False)
    d2 = make_glyph(angles[1], False)
    d3 = make_glyph(angles[2], False)
    d4 = make_glyph(angles[3], False)
    # 1 mirrored glyph
    corr_svg = make_glyph(angles[4], True)
    
    raw = [{'svg': corr_svg}, {'svg': d1}, {'svg': d2}, {'svg': d3}, {'svg': d4}]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Four of the figures can be rotated in the 2D plane to match one another exactly (congruent chirality).\n2. Figure {corr_letter} is a lateral mirror reflection that cannot be formed by planar rotation alone.\n3. Therefore, figure {corr_letter} is the odd one out."
    return {
        'question': "Which of the following five figures does NOT belong with the other four?",
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'odd_one_out'
    }

# 9. SPATIAL ANALOGY: SCALE & MARKER RELOCATION (Analogy)
def build_scale_marker_analogy(k, seed):
    # Fig A: Large regular polygon (e.g. Hexagon) with marker dot at top (0 deg).
    # Fig B: Scaled polygon (50% size) with marker dot at bottom (180 deg).
    # Fig C: Large regular polygon 2 (e.g. Octagon) with marker dot at top.
    # Fig D (?): Scaled polygon 2 (50% size) with marker dot at bottom.
    shape_a = 6 if (k % 2 == 0) else 4 # Hexagon or Square
    shape_c = 8 if (k % 2 == 0) else 5 # Octagon or Pentagon
    
    def render_analogy_shape(n_sides, r, dot_at_top=True):
        poly = draw_polygon(make_poly_pts(n_sides, r, 35, 35, -90), fill="none", stroke=STROKE, sw=2)
        dot_y = 35 - r if dot_at_top else 35 + r
        dot = draw_circle(35, dot_y, 4, fill=FILL, stroke=STROKE, sw=1.5)
        return wrap_svg(f"{poly}{dot}")

    fig_a = render_analogy_shape(shape_a, 24, True)
    fig_b = render_analogy_shape(shape_a, 13, False)
    fig_c = render_analogy_shape(shape_c, 24, True)
    
    corr_svg = render_analogy_shape(shape_c, 13, False) # 50% scale, dot at bottom
    distractors = [
        render_analogy_shape(shape_c, 13, True),  # dot still at top
        render_analogy_shape(shape_c, 24, False), # full size with dot at bottom
        render_analogy_shape(shape_a, 13, False), # wrong shape (Shape A instead of Shape C)
        render_analogy_shape(shape_c, 18, True)   # wrong scale and top dot
    ]
    raw = [{'svg': corr_svg}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Transformation from Figure A to Figure B scales the shape down by ~50% and moves the anchor dot from the top vertex to the bottom vertex.\n2. Applying this rule to Figure C yields a half-scale {shape_c}-sided polygon with the dot at the bottom vertex ({corr_letter})."
    return {
        'question': "Figure A is to Figure B as Figure C is to which of the following options?",
        'analogySvg': {'figA': fig_a, 'figB': fig_b, 'figC': fig_c},
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'analogy'
    }

# 10. SPATIAL ANALOGY: 90° ROTATION + CENTER INFILL (Analogy)
def build_rotation_infill_analogy(k, seed):
    # Fig A: Oriented pointer (chevron) pointing UP.
    # Fig B: Pointer rotated 90° clockwise (pointing RIGHT) with center cross.
    # Fig C: Triangle pointing UP.
    # Fig D (?): Triangle rotated 90° clockwise (pointing RIGHT) with center cross.
    def make_arrow(rot_deg, with_cross=False):
        pts = [(35, 16), (48, 48), (35, 38), (22, 48)]
        r_pts = [rot_pt(x, y, rot_deg, 35, 35) for (x, y) in pts]
        poly = draw_polygon(' '.join(f"{x},{y}" for x, y in r_pts), fill="none", stroke=STROKE, sw=2)
        cross = ''
        if with_cross:
            cross = draw_line(35, 29, 35, 41, stroke=MUTED_STROKE, sw=2) + draw_line(29, 35, 41, 35, stroke=MUTED_STROKE, sw=2)
        return wrap_svg(f"{poly}{cross}")

    def make_dart(rot_deg, with_cross=False):
        pts = [(35, 15), (50, 48), (20, 48)]
        r_pts = [rot_pt(x, y, rot_deg, 35, 35) for (x, y) in pts]
        poly = draw_polygon(' '.join(f"{x},{y}" for x, y in r_pts), fill="none", stroke=STROKE, sw=2)
        cross = ''
        if with_cross:
            cross = draw_line(35, 30, 35, 42, stroke=MUTED_STROKE, sw=2) + draw_line(29, 36, 41, 36, stroke=MUTED_STROKE, sw=2)
        return wrap_svg(f"{poly}{cross}")

    fig_a = make_arrow(0, False)
    fig_b = make_arrow(90, True)
    fig_c = make_dart(0, False)
    
    corr_svg = make_dart(90, True) # 90 deg clockwise with cross
    distractors = [
        make_dart(180, True),  # 180 deg
        make_dart(270, True),  # counter-clockwise 90 deg
        make_dart(45, True),   # 45 deg with cross
        make_dart(0, True)     # 0 deg with cross
    ]
    raw = [{'svg': corr_svg}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule:**\n1. Transformation rotates the outer figure 90° clockwise and inserts an interior cross marker.\n2. Applying this operation to Figure C produces Figure C rotated 90° clockwise with the central cross ({corr_letter})."
    return {
        'question': "Figure A is to Figure B as Figure C is to which of the following options?",
        'analogySvg': {'figA': fig_a, 'figB': fig_b, 'figC': fig_c},
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'analogy'
    }

# 11. 3D CUBE FOLDING NET (Folding)
def build_cube_folding_net(k, seed):
    # Unfolded cross net:
    # Row 0:          [Circle] (Top)
    # Row 1: [Plus]   [Square] [Triangle] [Diamond]
    # Row 2:          [Cross]  (Bottom)
    #
    # Opposite pairs (NEVER visible simultaneously):
    # - Top (Circle) <-> Bottom (Cross)
    # - Left (Plus) <-> Right (Triangle)
    # - Center (Square) <-> Far-Right (Diamond)
    
    # Net Diagram SVG
    net_inner = f"""
      <!-- Squares -->
      {draw_rect(24, 4, 18, 18, fill="none", stroke=MUTED_STROKE, sw=1.5)}
      {draw_rect(6, 22, 18, 18, fill="none", stroke=MUTED_STROKE, sw=1.5)}
      {draw_rect(24, 22, 18, 18, fill="none", stroke=MUTED_STROKE, sw=1.5)}
      {draw_rect(42, 22, 18, 18, fill="none", stroke=MUTED_STROKE, sw=1.5)}
      {draw_rect(60, 22, 18, 18, fill="none", stroke=MUTED_STROKE, sw=1.5)}
      {draw_rect(24, 40, 18, 18, fill="none", stroke=MUTED_STROKE, sw=1.5)}
      
      <!-- Face Symbols -->
      {draw_circle(33, 13, 4, fill="none", stroke=STROKE, sw=2)} <!-- Circle -->
      {draw_line(15, 27, 15, 35, stroke=STROKE, sw=2)}{draw_line(11, 31, 19, 31, stroke=STROKE, sw=2)} <!-- Plus -->
      {draw_rect(30, 28, 6, 6, fill="none", stroke=STROKE, sw=2)} <!-- Square -->
      {draw_polygon('51,27 55,35 47,35', fill="none", stroke=STROKE, sw=2)} <!-- Triangle -->
      {draw_polygon('69,27 73,31 69,35 65,31', fill="none", stroke=STROKE, sw=2)} <!-- Diamond -->
      {draw_line(30, 46, 36, 52, stroke=STROKE, sw=2)}{draw_line(36, 46, 30, 52, stroke=STROKE, sw=2)} <!-- Cross -->
    """
    net_svg = wrap_svg(net_inner, vb="0 0 84 62")
    
    # Isometric Cube Drawer: 3 faces (Top, Left, Right)
    def render_isometric_cube(sym_top, sym_left, sym_right):
        # Isometric cube faces:
        # Top Face: (35, 12) -> (55, 24) -> (35, 36) -> (15, 24)
        top_face = draw_polygon("35,12 55,24 35,36 15,24", fill="none", stroke=STROKE, sw=2)
        # Left Face: (15, 24) -> (35, 36) -> (35, 58) -> (15, 46)
        left_face = draw_polygon("15,24 35,36 35,58 15,46", fill="none", stroke=STROKE, sw=2)
        # Right Face: (35, 36) -> (55, 24) -> (55, 46) -> (35, 58)
        right_face = draw_polygon("35,36 55,24 55,46 35,58", fill="none", stroke=STROKE, sw=2)
        
        def render_symbol(sym, cx, cy):
            if sym == 'circle': return draw_circle(cx, cy, 4, fill="none", stroke=MUTED_STROKE, sw=2)
            elif sym == 'plus': return draw_line(cx, cy-4, cx, cy+4, stroke=MUTED_STROKE, sw=2) + draw_line(cx-4, cy, cx+4, cy, stroke=MUTED_STROKE, sw=2)
            elif sym == 'square': return draw_rect(cx-3.5, cy-3.5, 7, 7, fill="none", stroke=MUTED_STROKE, sw=2)
            elif sym == 'triangle': return draw_polygon(f"{cx},{cy-4} {cx+4},{cy+4} {cx-4},{cy+4}", fill="none", stroke=MUTED_STROKE, sw=2)
            elif sym == 'diamond': return draw_polygon(f"{cx},{cy-4} {cx+4},{cy} {cx},{cy+4} {cx-4},{cy}", fill="none", stroke=MUTED_STROKE, sw=2)
            elif sym == 'cross': return draw_line(cx-3.5, cy-3.5, cx+3.5, cy+3.5, stroke=MUTED_STROKE, sw=2) + draw_line(cx+3.5, cy-3.5, cx-3.5, cy+3.5, stroke=MUTED_STROKE, sw=2)
            return ''
            
        s_top = render_symbol(sym_top, 35, 24)
        s_left = render_symbol(sym_left, 25, 44)
        s_right = render_symbol(sym_right, 45, 44)
        return wrap_svg(f"{top_face}{left_face}{right_face}{s_top}{s_left}{s_right}")

    # Correct Cube: Top(circle), Left(plus), Right(square) -> Mutually adjacent!
    corr_svg = render_isometric_cube('circle', 'plus', 'square')
    distractors = [
        # Impossible: Circle and Cross (opposite faces visible simultaneously)
        render_isometric_cube('circle', 'cross', 'plus'),
        # Impossible: Plus and Triangle (opposite faces visible simultaneously)
        render_isometric_cube('square', 'plus', 'triangle'),
        # Impossible: Square and Diamond (opposite faces visible simultaneously)
        render_isometric_cube('circle', 'square', 'diamond'),
        # Impossible: Circle and Cross again
        render_isometric_cube('cross', 'triangle', 'circle')
    ]
    raw = [{'svg': corr_svg}] + [{'svg': d} for d in distractors]
    opts, corr_letter = randomize_and_format(raw, 0, seed)
    
    expl = f"**Correct Answer: {corr_letter}**\n\n**Step-by-step Rule for 3D Cube Folding:**\n1. In an unfolded net, faces separated by one square become **opposite faces** on the folded cube.\n2. Opposite faces can **never** be adjacent or visible at the same time in a 3D perspective view:\n- **Circle (○)** and **Cross (✕)** are opposite.\n- **Plus (+)** and **Triangle (△)** are opposite.\n- **Square (■)** and **Diamond (◊)** are opposite.\n3. The other options erroneously depict opposite faces simultaneously on the same cube. Only **Option {corr_letter}** shows mutually adjacent faces without any opposing pairs."
    return {
        'question': "When the unfolded net below is folded into a 3-dimensional cube, which of the following represents a geometrically VALID perspective view?",
        'figureSvg': net_svg,
        'figureLabel': "Unfolded 3D Cube Net Reference:",
        'options': opts,
        'correctOption': corr_letter,
        'explanation': expl,
        'category': 'spatial',
        'subType': 'folding'
    }

# ==============================================================================
# MAIN TEST BUILDER (Tests 31 to 57)
# ==============================================================================
tests_spatial = {}

for k in range(27):
    test_num = 31 + k
    q_list = []
    
    # 1. Series Q1: Orbital Satellite
    q_list.append(build_orbital_series(k, test_num * 701 + 1))
    # 2. Series Q2: Segmented Path Expansion
    q_list.append(build_path_expansion_series(k, test_num * 701 + 2))
    # 3. Series Q3: Concentric Shapes Cyclic Progression
    q_list.append(build_concentric_series(k, test_num * 701 + 3))
    # 4. Matrix Q4: Independent Attributes Matrix
    q_list.append(build_attributes_matrix(k, test_num * 701 + 4))
    # 5. Matrix Q5: Line Count Arithmetic Matrix
    q_list.append(build_line_arithmetic_matrix(k, test_num * 701 + 5))
    # 6. Odd Figure Q6: Side Count Parity
    q_list.append(build_odd_side_count(k, test_num * 701 + 6))
    # 7. Odd Figure Q7: Enclosed Regions Count
    q_list.append(build_odd_regions_count(k, test_num * 701 + 7))
    # 8. Odd Figure Q8: Chirality / Lateral Reflection
    q_list.append(build_odd_chirality(k, test_num * 701 + 8))
    # 9. Analogy Q9: Scale & Marker Relocation
    q_list.append(build_scale_marker_analogy(k, test_num * 701 + 9))
    # 10. Analogy Q10: 90° Rotation + Center Infill
    q_list.append(build_rotation_infill_analogy(k, test_num * 701 + 10))
    # 11. Folding Q11: 3D Cube Folding Net
    q_list.append(build_cube_folding_net(k, test_num * 701 + 11))
    
    tests_spatial[test_num] = q_list

print(f"Generated {len(tests_spatial)} tests, each with {len(tests_spatial[31])} spatial questions. Total: {len(tests_spatial) * len(tests_spatial[31])}")

with open('src/data/newSuiteSpatial.js', 'w', encoding='utf-8') as f:
    f.write('// Brand New CCAT Spatial Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n')
    f.write('// Zero color giveaway, strictly unique options, 100% CCAT-authentic vector SVGs.\n\n')
    f.write('export const NEW_SUITE_SPATIAL = ' + json.dumps(tests_spatial, indent=2) + ';\n\n')
    f.write('''export function getNewSuiteSpatialQuestions(testNumber) {
  const list = NEW_SUITE_SPATIAL[testNumber] || NEW_SUITE_SPATIAL[31];
  return [...list];
}
''')

print("Wrote src/data/newSuiteSpatial.js successfully!")
