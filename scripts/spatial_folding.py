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

# Face symbols drawer
# pos: 'net' (flat x,y, size) or 'iso_top' (cx, cy) or 'iso_left' (cx, cy) or 'iso_right' (cx, cy)
def render_symbol(sym_id, cx, cy, scale=1.0):
    r = 3.5 * scale
    if sym_id == 'circle':
        return draw_circle(cx, cy, r, fill="none", sw=1.8)
    elif sym_id == 'dot':
        return draw_circle(cx, cy, r, fill=FILL, sw=1)
    elif sym_id == 'cross':
        d = 3.2 * scale
        return draw_line(cx - d, cy - d, cx + d, cy + d, sw=2) + draw_line(cx - d, cy + d, cx + d, cy - d, sw=2)
    elif sym_id == 'plus':
        d = 3.5 * scale
        return draw_line(cx - d, cy, cx + d, cy, sw=2) + draw_line(cx, cy - d, cx, cy + d, sw=2)
    elif sym_id == 'triangle':
        d = 4.0 * scale
        pts = f"{cx},{cy - d} {cx + d},{cy + d*0.8} {cx - d},{cy + d*0.8}"
        return draw_polygon(pts, fill="none", sw=1.8)
    elif sym_id == 'diamond':
        d = 4.0 * scale
        pts = f"{cx},{cy - d} {cx + d},{cy} {cx},{cy + d} {cx - d},{cy}"
        return draw_polygon(pts, fill="none", sw=1.8)
    elif sym_id == 'square':
        d = 3.0 * scale
        return draw_rect(cx - d, cy - d, d * 2, d * 2, fill="none", sw=1.8)
    elif sym_id == 'bar':
        d = 3.8 * scale
        return draw_line(cx - d, cy, cx + d, cy, sw=2.2)
    elif sym_id == 'ring':
        return draw_circle(cx, cy, r, fill="none", sw=1.5) + draw_circle(cx, cy, r*0.4, fill=FILL, sw=1)
    elif sym_id == 'equal':
        d = 3.5 * scale
        return draw_line(cx - d, cy - 1.8, cx + d, cy - 1.8, sw=1.8) + draw_line(cx - d, cy + 1.8, cx + d, cy + 1.8, sw=1.8)
    else:
        return draw_circle(cx, cy, r, fill=FILL, sw=1)

# Canonical Net Layouts on a 4x3 grid
# Each layout gives 6 (col, row) coordinates for faces [F0, F1, F2, F3, F4, F5]
# such that:
# F0 and F2 are opposite
# F1 and F3 are opposite
# F4 and F5 are opposite
NET_LAYOUTS = [
    # Layout 0: Standard Latin Cross (stem along row 1 cols 0,1,2,3; arms at col 1 row 0 and row 2)
    # F0=col 0 row 1; F1=col 1 row 1; F2=col 2 row 1; F3=col 1 row 0; F4=col 1 row 2; F5=col 3 row 1
    # Check opposites:
    # F0 (col 0,1) opposite F2 (col 2,1) -> yes, separated by 1
    # F4 (col 1,2) opposite F3 (col 1,0) -> yes, separated by 1
    # F1 (col 1,1) opposite F5 (col 3,1) -> yes, separated by 1
    [ (0,1), (1,1), (2,1), (1,0), (1,2), (3,1) ],
    # Layout 1: T-Cross variant
    [ (1,0), (1,1), (1,2), (0,1), (2,1), (1,3) ],
    # Layout 2: Shifted Cross (arms at col 2)
    [ (0,1), (1,1), (2,1), (2,0), (2,2), (3,1) ],
]

# 27 Symbol Combinations (each has 6 distinct symbols and names)
SYMBOLS_POOL = [
    ('circle', 'Circle (○)'),
    ('cross', 'Cross (✕)'),
    ('plus', 'Plus (+)'),
    ('dot', 'Solid Dot (●)'),
    ('triangle', 'Triangle (△)'),
    ('diamond', 'Diamond (◇)'),
    ('square', 'Square (■)'),
    ('bar', 'Horizontal Bar (—)'),
    ('ring', 'Concentric Ring (◎)'),
    ('equal', 'Equal Sign (=)')
]

def format_options(correct_svg, distractor_svgs, seed):
    raw = [correct_svg]
    for d in distractor_svgs:
        if d not in raw and len(raw) < 5:
            raw.append(d)
    
    shift = 1
    while len(raw) < 5:
        var_svg = correct_svg.replace('viewBox="0 0 70 70"', f'viewBox="0 0 70 70" data-var="{shift}"')
        if var_svg not in raw:
            raw.append(var_svg)
        shift += 1
        
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

# Render 3D isometric cube showing 3 faces: (top_sym, left_sym, right_sym)
def render_3d_cube(top_sym, left_sym, right_sym):
    # Top face: (35,14) -> (53,24) -> (35,34) -> (17,24)
    poly_top = draw_polygon("35,14 53,24 35,34 17,24", fill="none", sw=2)
    # Left face: (17,24) -> (35,34) -> (35,56) -> (17,46)
    poly_left = draw_polygon("17,24 35,34 35,56 17,46", fill="none", sw=2)
    # Right face: (35,34) -> (53,24) -> (53,46) -> (35,56)
    poly_right = draw_polygon("35,34 53,24 53,46 35,56", fill="none", sw=2)
    
    # Centers of visible faces
    sym_top = render_symbol(top_sym, 35, 24, scale=1.0)
    sym_left = render_symbol(left_sym, 26, 40, scale=1.0)
    sym_right = render_symbol(right_sym, 44, 40, scale=1.0)
    
    return wrap_svg(poly_top + poly_left + poly_right + sym_top + sym_left + sym_right)

def gen_slot11_folding(test_num):
    t_idx = test_num - 31
    seed = test_num * 151 + 97
    
    # Select 6 symbols for this test
    # Shift symbol start so each test has a distinct permutation
    start_s = (t_idx * 2) % len(SYMBOLS_POOL)
    selected_symbols = []
    for i in range(6):
        selected_symbols.append(SYMBOLS_POOL[(start_s + i) % len(SYMBOLS_POOL)])
        
    sym_ids = [s[0] for s in selected_symbols]
    sym_names = [s[1] for s in selected_symbols]
    
    # Face mapping:
    # Pair 1: F0, F2 (opposite)
    # Pair 2: F1, F5 (opposite)
    # Pair 3: F3, F4 (opposite)
    f0, f1, f2, f3, f4, f5 = sym_ids
    
    # Draw 2D Net SVG
    # Grid size: cell 14x14, origin x=11, y=14
    cell_s = 14
    ox, oy = 11, 14
    
    layout = NET_LAYOUTS[t_idx % len(NET_LAYOUTS)]
    net_elements = []
    
    for face_idx, (col, row) in enumerate(layout):
        x = ox + col * cell_s
        y = oy + row * cell_s
        cx = x + cell_s / 2
        cy = y + cell_s / 2
        net_elements.append(draw_rect(x, y, cell_s, cell_s, fill="none", sw=1.5))
        net_elements.append(render_symbol(sym_ids[face_idx], cx, cy, scale=0.85))
        
    net_svg = wrap_svg(''.join(net_elements))
    
    # Correct 3D view: 3 mutually adjacent faces without any opposite pairs!
    # (F0, F1, F3) -> F0 is from pair 1, F1 is from pair 2, F3 is from pair 3! (VALID)
    correct_svg = render_3d_cube(f3, f0, f1)
    
    # Distractors: must violate folding rules by showing opposite faces together!
    # D1 shows F0 and F2 together (Pair 1 opposite faces visible simultaneously)
    d1 = render_3d_cube(f0, f2, f1)
    # D2 shows F1 and F5 together (Pair 2 opposite faces visible simultaneously)
    d2 = render_3d_cube(f1, f5, f3)
    # D3 shows F3 and F4 together (Pair 3 opposite faces visible simultaneously)
    d3 = render_3d_cube(f3, f4, f0)
    # D4 shows F0 and F2 together with F4
    d4 = render_3d_cube(f0, f2, f4)
    
    prompt = spatial_prompts.get_slot11_prompt(test_num, sym_names[0], sym_names[1])
    explanation = (
        f"In an unfolded cube net, faces separated by one square become **opposite faces** on the folded cube.\n"
        f"Opposite faces can **never** be adjacent or visible at the same time:\n"
        f"• **{sym_names[0]}** and **{sym_names[2]}** are opposite.\n"
        f"• **{sym_names[1]}** and **{sym_names[5]}** are opposite.\n"
        f"• **{sym_names[3]}** and **{sym_names[4]}** are opposite.\n\n"
        f"The other options erroneously depict opposite faces simultaneously on the same cube. Only the correct option displays three mutually adjacent faces with zero opposing pairs."
    )
    
    options, corr_letter = format_options(correct_svg, [d1, d2, d3, d4], seed)
    return {
        "question": prompt,
        "figureSvg": net_svg,
        "figureLabel": "Unfolded 3D Cube Net:",
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Immediately identify opposite face pairs on the net; any option showing both opposite faces simultaneously is impossible.",
        "category": "spatial",
        "subType": "folding"
    }

print("spatial_folding module loaded.")
