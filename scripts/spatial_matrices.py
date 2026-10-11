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

def make_poly_pts(n_sides, r, cx=35, cy=35, start_deg=-90):
    pts = []
    for i in range(n_sides):
        deg = start_deg + (i * 360) / n_sides
        rad = math.radians(deg)
        x = round(cx + r * math.cos(rad), 1)
        y = round(cy + r * math.sin(rad), 1)
        pts.append(f"{x},{y}")
    return ' '.join(pts)

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

# ==============================================================================
# SLOT 4: 27 ARITHMETIC & OVERLAY MATRICES (Tests 31 to 57)
# ==============================================================================
def gen_slot4_matrix(test_num):
    t_idx = test_num - 31
    seed = test_num * 109 + 53
    
    if t_idx < 9:
        # Pattern 1: Additive Overlay (Row 1 + Row 2 = Row 3)
        # Using line segments:
        # Row 1: horizontal line, vertical line -> Cross
        # Row 2: diagonal / line, diagonal \ line -> X
        # Row 3: circle outline, central dot -> Circle with dot
        c1 = wrap_svg(draw_line(15, 35, 55, 35, sw=2.5))
        c2 = wrap_svg(draw_line(35, 15, 35, 55, sw=2.5))
        c3 = wrap_svg(draw_line(15, 35, 55, 35, sw=2.5) + draw_line(35, 15, 35, 55, sw=2.5))
        
        c4 = wrap_svg(draw_line(20, 50, 50, 20, sw=2.5))
        c5 = wrap_svg(draw_line(20, 20, 50, 50, sw=2.5))
        c6 = wrap_svg(draw_line(20, 50, 50, 20, sw=2.5) + draw_line(20, 20, 50, 50, sw=2.5))
        
        r_c = 18 + (t_idx % 4) * 2
        c7 = wrap_svg(draw_circle(35, 35, r_c, fill="none", sw=2))
        c8 = wrap_svg(draw_circle(35, 35, 4.5, fill=FILL))
        correct_svg = wrap_svg(draw_circle(35, 35, r_c, fill="none", sw=2) + draw_circle(35, 35, 4.5, fill=FILL))
        
        distractors = [
            c7,
            c8,
            wrap_svg(draw_circle(35, 35, r_c, fill=FILL)),
            wrap_svg(draw_rect(20, 20, 30, 30, fill="none", sw=2) + draw_circle(35, 35, 4.5, fill=FILL))
        ]
        
        prompt = spatial_prompts.SLOT4_PROMPTS[t_idx]
        explanation = f"In each row, overlaying the elements of Column 1 and Column 2 forms the composite figure in Column 3. Combining the circle outline with the central dot gives the concentric target."
        
    elif t_idx < 18:
        # Pattern 2: Boolean XOR (Overlapping strokes cancel, unique remain)
        # Using box corners:
        # Row 1: Left + Top, Top + Right -> Left + Right (Top canceled)
        # Row 2: Top + Right, Right + Bottom -> Top + Bottom (Right canceled)
        # Row 3: Left + Bottom, Right + Bottom -> Left + Right (Bottom canceled)
        box_l = draw_line(20, 20, 20, 50, sw=2.5)
        box_t = draw_line(20, 20, 50, 20, sw=2.5)
        box_r = draw_line(50, 20, 50, 50, sw=2.5)
        box_b = draw_line(20, 50, 50, 50, sw=2.5)
        
        c1 = wrap_svg(box_l + box_t)
        c2 = wrap_svg(box_t + box_r)
        c3 = wrap_svg(box_l + box_r)
        
        c4 = wrap_svg(box_t + box_r)
        c5 = wrap_svg(box_r + box_b)
        c6 = wrap_svg(box_t + box_b)
        
        c7 = wrap_svg(box_l + box_b)
        c8 = wrap_svg(box_r + box_b)
        correct_svg = wrap_svg(box_l + box_r)
        
        distractors = [
            wrap_svg(box_l + box_t + box_r + box_b),
            wrap_svg(box_b),
            wrap_svg(box_t + box_b),
            wrap_svg(box_l + box_t)
        ]
        
        prompt = spatial_prompts.SLOT4_PROMPTS[t_idx]
        explanation = f"Across each row, overlapping line segments cancel out, leaving only the non-overlapping segments in Column 3. In Row 3, the bottom edge cancels, leaving the left and right vertical edges."
        
    else:
        # Pattern 3: Dot Arithmetic across rows (Cell 1 count + Cell 2 count = Cell 3 count)
        # Row 1: 1 dot + 2 dots = 3 dots
        # Row 2: 2 dots + 2 dots = 4 dots
        # Row 3: 1 dot + 4 dots = 5 dots
        def make_dots(n, shape='circle'):
            dots = []
            if n == 1:
                dots.append(draw_circle(35, 35, 4, fill=FILL))
            elif n == 2:
                dots.append(draw_circle(25, 35, 4, fill=FILL))
                dots.append(draw_circle(45, 35, 4, fill=FILL))
            elif n == 3:
                dots.append(draw_circle(22, 35, 4, fill=FILL))
                dots.append(draw_circle(35, 35, 4, fill=FILL))
                dots.append(draw_circle(48, 35, 4, fill=FILL))
            elif n == 4:
                dots.append(draw_circle(25, 25, 4, fill=FILL))
                dots.append(draw_circle(45, 25, 4, fill=FILL))
                dots.append(draw_circle(25, 45, 4, fill=FILL))
                dots.append(draw_circle(45, 45, 4, fill=FILL))
            elif n == 5:
                dots.append(draw_circle(25, 25, 4, fill=FILL))
                dots.append(draw_circle(45, 25, 4, fill=FILL))
                dots.append(draw_circle(35, 35, 4, fill=FILL))
                dots.append(draw_circle(25, 45, 4, fill=FILL))
                dots.append(draw_circle(45, 45, 4, fill=FILL))
            return wrap_svg(draw_rect(12, 12, 46, 46, fill="none", sw=1.5) + ''.join(dots))
            
        c1 = make_dots(1)
        c2 = make_dots(2)
        c3 = make_dots(3)
        c4 = make_dots(2)
        c5 = make_dots(2)
        c6 = make_dots(4)
        c7 = make_dots(1)
        c8 = make_dots(4)
        correct_svg = make_dots(5)
        
        distractors = [
            make_dots(4),
            make_dots(3),
            make_dots(2),
            make_dots(1)
        ]
        
        prompt = spatial_prompts.SLOT4_PROMPTS[t_idx]
        explanation = f"In each row, the dot count of Column 1 plus Column 2 equals Column 3: 1+2=3, 2+2=4. In Row 3, 1+4=5 dots."

    matrix_cells = [c1, c2, c3, c4, c5, c6, c7, c8, "?"]
    options, corr_letter = format_options(correct_svg, distractors, seed)
    return {
        "question": prompt,
        "matrixCells": matrix_cells,
        "figureSvg": matrix_cells,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Compare the first two rows to isolate the row-wise transformation, then apply directly to Row 3.",
        "category": "spatial",
        "subType": "matrix"
    }

# ==============================================================================
# SLOT 5: 27 PERMUTATION & ROTATIONAL MATRICES (Tests 31 to 57)
# ==============================================================================
def gen_slot5_matrix(test_num):
    t_idx = test_num - 31
    seed = test_num * 113 + 61
    
    if t_idx < 9:
        # Pattern 1: Latin Square of Shape x Inner Symbol
        # Shapes: Circle, Square, Triangle
        # Inner symbols: Dot, Plus (+), Minus (-)
        # Row 1: Circle+Dot, Square+Plus, Triangle+Minus
        # Row 2: Square+Minus, Triangle+Dot, Circle+Plus
        # Row 3: Triangle+Plus, Circle+Minus, Square+Dot (Target is Square + Dot)
        def make_latin(shape, inner):
            out = []
            if shape == 'circle':
                out.append(draw_circle(35, 35, 20, fill="none", sw=2))
            elif shape == 'square':
                out.append(draw_rect(18, 18, 34, 34, fill="none", sw=2))
            elif shape == 'triangle':
                out.append(draw_polygon(make_poly_pts(3, 21), fill="none", sw=2))
                
            if inner == 'dot':
                out.append(draw_circle(35, 35, 4, fill=FILL))
            elif inner == 'plus':
                out.append(draw_line(28, 35, 42, 35, sw=2.5) + draw_line(35, 28, 35, 42, sw=2.5))
            elif inner == 'minus':
                out.append(draw_line(28, 35, 42, 35, sw=2.5))
            return wrap_svg(''.join(out))
            
        c1 = make_latin('circle', 'dot')
        c2 = make_latin('square', 'plus')
        c3 = make_latin('triangle', 'minus')
        
        c4 = make_latin('square', 'minus')
        c5 = make_latin('triangle', 'dot')
        c6 = make_latin('circle', 'plus')
        
        c7 = make_latin('triangle', 'plus')
        c8 = make_latin('circle', 'minus')
        correct_svg = make_latin('square', 'dot')
        
        distractors = [
            make_latin('square', 'plus'),
            make_latin('triangle', 'dot'),
            make_latin('circle', 'dot'),
            make_latin('square', 'minus')
        ]
        
        prompt = spatial_prompts.SLOT5_PROMPTS[t_idx]
        explanation = f"Row 3 already contains Triangle and Circle, requiring a Square. Row 3 already contains Plus and Minus, requiring a central Dot. The 9th cell is Square + Dot."
        
    elif t_idx < 18:
        # Pattern 2: Row-wise 90° Rotation Matrix
        # Row 1: Pointer pointing North, East, South
        # Row 2: Pointer pointing East, South, West
        # Row 3: Pointer pointing South, West, North (Target is North)
        def make_arrow(ang):
            rad = math.radians(ang - 90)
            ex = round(35 + 18 * math.cos(rad), 1)
            ey = round(35 + 18 * math.sin(rad), 1)
            return wrap_svg(
                draw_circle(35, 35, 24, fill="none", sw=1.5) +
                draw_line(35, 35, ex, ey, sw=2.5) +
                draw_circle(ex, ey, 3.5, fill=FILL)
            )
            
        c1 = make_arrow(0)
        c2 = make_arrow(90)
        c3 = make_arrow(180)
        
        c4 = make_arrow(90)
        c5 = make_arrow(180)
        c6 = make_arrow(270)
        
        c7 = make_arrow(180)
        c8 = make_arrow(270)
        correct_svg = make_arrow(0)
        
        distractors = [
            make_arrow(90),
            make_arrow(180),
            make_arrow(270),
            make_arrow(45)
        ]
        
        prompt = spatial_prompts.SLOT5_PROMPTS[t_idx]
        explanation = f"In each row, the directional needle rotates clockwise by +90°. In Row 3: South (180°) -> West (270°) -> North (0° / 360°)."
        
    else:
        # Pattern 3: Quadrant Mirror Matrix
        # An asymmetrical L-shape in quadrants:
        # Row 1: Top-Left, Top-Right, Both Top
        # Row 2: Bottom-Left, Bottom-Right, Both Bottom
        # Row 3: Diagonal TL+BR, Diagonal TR+BL, All 4 quadrants
        def make_quads(q_list):
            lines = [draw_rect(12, 12, 46, 46, fill="none", sw=1.5), draw_line(35, 12, 35, 58, sw=1), draw_line(12, 35, 58, 35, sw=1)]
            for q in q_list:
                if q == 'TL': lines.append(draw_circle(23.5, 23.5, 4, fill=FILL))
                elif q == 'TR': lines.append(draw_circle(46.5, 23.5, 4, fill=FILL))
                elif q == 'BL': lines.append(draw_circle(23.5, 46.5, 4, fill=FILL))
                elif q == 'BR': lines.append(draw_circle(46.5, 46.5, 4, fill=FILL))
            return wrap_svg(''.join(lines))
            
        c1 = make_quads(['TL'])
        c2 = make_quads(['TR'])
        c3 = make_quads(['TL', 'TR'])
        
        c4 = make_quads(['BL'])
        c5 = make_quads(['BR'])
        c6 = make_quads(['BL', 'BR'])
        
        c7 = make_quads(['TL', 'BR'])
        c8 = make_quads(['TR', 'BL'])
        correct_svg = make_quads(['TL', 'TR', 'BL', 'BR'])
        
        distractors = [
            make_quads(['TL', 'TR']),
            make_quads(['BL', 'BR']),
            make_quads(['TL', 'BL']),
            make_quads(['TR', 'BR'])
        ]
        
        prompt = spatial_prompts.SLOT5_PROMPTS[t_idx]
        explanation = f"Across each row, the third column merges the active quadrant nodes of the first two columns. Merging diagonal pairs in Row 3 activates all four quadrant nodes."

    matrix_cells = [c1, c2, c3, c4, c5, c6, c7, c8, "?"]
    options, corr_letter = format_options(correct_svg, distractors, seed)
    return {
        "question": prompt,
        "matrixCells": matrix_cells,
        "figureSvg": matrix_cells,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Verify both row and column constraints for Latin square and permutation matrices to guarantee accuracy.",
        "category": "spatial",
        "subType": "matrix"
    }

print("spatial_matrices module loaded.")
