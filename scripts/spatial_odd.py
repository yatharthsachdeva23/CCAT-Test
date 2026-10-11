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

def rot_pt(x, y, ang_deg, cx=35, cy=35):
    rad = math.radians(ang_deg)
    cos_a, sin_a = math.cos(rad), math.sin(rad)
    nx = cx + (x - cx) * cos_a - (y - cy) * sin_a
    ny = cy + (x - cx) * sin_a + (y - cy) * cos_a
    return round(nx, 1), round(ny, 1)

def make_poly_pts(n_sides, r, cx=35, cy=35, start_deg=-90):
    pts = []
    for i in range(n_sides):
        deg = start_deg + (i * 360) / n_sides
        rad = math.radians(deg)
        x = round(cx + r * math.cos(rad), 1)
        y = round(cy + r * math.sin(rad), 1)
        pts.append(f"{x},{y}")
    return ' '.join(pts)

def format_odd_options(odd_svg, normal_svgs, seed):
    # Ensure odd_svg + 4 normal_svgs are strictly distinct
    raw = [odd_svg]
    for n in normal_svgs:
        if n not in raw and len(raw) < 5:
            raw.append(n)
            
    shift = 1
    while len(raw) < 5:
        var_svg = normal_svgs[0].replace('viewBox="0 0 70 70"', f'viewBox="0 0 70 70" data-var="{shift}"')
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
        if svg == odd_svg:
            corr_letter = ltr
            
    return options, corr_letter

# ==============================================================================
# SLOT 6: 27 SYMMETRY & REFLECTION ODD-ONE-OUT (Tests 31 to 57)
# ==============================================================================
def gen_slot6_odd(test_num):
    t_idx = test_num - 31
    seed = test_num * 127 + 67
    
    if t_idx < 9:
        # Pattern 1: Reflectional Symmetry vs Asymmetric
        # 4 figures have bilateral vertical reflection symmetry; 1 is asymmetric
        norm1 = wrap_svg(draw_polygon("35,15 50,55 20,55", fill="none", sw=2)) # Isosceles triangle
        norm2 = wrap_svg(draw_polygon("35,15 55,35 35,55 15,35", fill="none", sw=2)) # Diamond
        norm3 = wrap_svg(draw_rect(20, 20, 30, 30, fill="none", sw=2) + draw_line(35, 20, 35, 50, sw=1.5)) # Bisected square
        norm4 = wrap_svg(draw_circle(35, 35, 20, fill="none", sw=2) + draw_line(35, 15, 35, 55, sw=1.5)) # Bisected circle
        odd = wrap_svg(draw_polygon("20,15 55,25 40,55", fill="none", sw=2)) # Scalene asymmetric triangle
        
        prompt = spatial_prompts.SLOT6_PROMPTS[t_idx]
        explanation = f"Figures A through D each have an axis of vertical reflection symmetry. The scalene triangle has unequal sides and angles with zero axes of symmetry."
        
    elif t_idx < 18:
        # Pattern 2: 180° Rotational Symmetry (Order 2) vs Asymmetric
        # 4 figures have 180° rotational symmetry; 1 does not
        # e.g. Parallelogram, Letter S path, Hourglass, Plus (+) vs Letter L
        norm1 = wrap_svg(draw_polygon("25,20 55,20 45,50 15,50", fill="none", sw=2)) # Parallelogram
        norm2 = wrap_svg(draw_line(20, 35, 50, 35, sw=2.5) + draw_line(35, 20, 35, 50, sw=2.5)) # Plus
        norm3 = wrap_svg(draw_polygon("20,20 50,20 20,50 50,50", fill="none", sw=2)) # Hourglass/bow
        norm4 = wrap_svg(draw_circle(25, 35, 8, fill=FILL) + draw_circle(45, 35, 8, fill=FILL)) # Two symmetric circles
        odd = wrap_svg(draw_path("M 25 20 L 25 50 L 50 50", fill="none", sw=2.5)) # L-shape (no 180° symmetry)
        
        prompt = spatial_prompts.SLOT6_PROMPTS[t_idx]
        explanation = f"Four figures remain identical when rotated 180° around their center. The L-shaped polyline does not possess rotational symmetry."
        
    else:
        # Pattern 3: Chiral Handedness (4 are planar rotations, 1 is a mirror reflection)
        # Asymmetrical shape: F-like glyph or arrow pointing right with barb on top
        # Barb on top when horizontal: (20,35 to 50,35, plus barb 50,35 to 40,25)
        # Rotations by 0°, 90°, 180°, 270°
        def make_chiral(deg, mirrored=False):
            # Base arrow at (35,35): shaft from (-15, 0) to (+15, 0); barb from (+15, 0) to (+5, -10 if not mirrored else +10)
            y_barb = 10 if mirrored else -10
            p1 = rot_pt(20, 35, deg)
            p2 = rot_pt(50, 35, deg)
            p3 = rot_pt(40, 35 + y_barb, deg)
            return wrap_svg(draw_line(p1[0], p1[1], p2[0], p2[1], sw=2.5) + draw_line(p2[0], p2[1], p3[0], p3[1], sw=2.5))
            
        norm1 = make_chiral(0, False)
        norm2 = make_chiral(90, False)
        norm3 = make_chiral(180, False)
        norm4 = make_chiral(270, False)
        odd = make_chiral(0, True) # Mirrored version
        
        prompt = spatial_prompts.SLOT6_PROMPTS[t_idx]
        explanation = f"Four figures can be rotated into exact congruence without flipping. The odd figure is a chiral mirror image that cannot be matched by planar rotation alone."

    options, corr_letter = format_odd_options(odd, [norm1, norm2, norm3, norm4], seed)
    return {
        "question": prompt,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Quickly test symmetry axes or rotate mentally in 90° intervals to isolate the outlier.",
        "category": "spatial",
        "subType": "odd_one_out"
    }

# ==============================================================================
# SLOT 7: 27 TOPOLOGY & CLOSEDNESS ODD-ONE-OUT (Tests 31 to 57)
# ==============================================================================
def gen_slot7_odd(test_num):
    t_idx = test_num - 31
    seed = test_num * 131 + 71
    
    if t_idx < 9:
        # Pattern 1: Closed single-loop polygon vs Open curve
        norm1 = wrap_svg(draw_circle(35, 35, 20, fill="none", sw=2))
        norm2 = wrap_svg(draw_polygon("20,20 50,20 50,50 20,50", fill="none", sw=2))
        norm3 = wrap_svg(draw_polygon("35,15 55,45 15,45", fill="none", sw=2))
        norm4 = wrap_svg(draw_polygon("35,15 50,30 45,55 25,55 20,30", fill="none", sw=2))
        odd = wrap_svg(draw_path("M 20 20 L 50 20 L 50 50 L 20 50", fill="none", sw=2)) # Open U-box (gap on left)
        
        prompt = spatial_prompts.SLOT7_PROMPTS[t_idx]
        explanation = f"Four figures form topologically closed boundaries with no endpoints. The odd figure is an open path with two disconnected terminal endpoints."
        
    elif t_idx < 18:
        # Pattern 2: Internal Dot vs External Dot
        norm1 = wrap_svg(draw_circle(35, 35, 22, fill="none", sw=2) + draw_circle(35, 35, 4, fill=FILL)) # Inside circle
        norm2 = wrap_svg(draw_rect(18, 18, 34, 34, fill="none", sw=2) + draw_circle(30, 30, 4, fill=FILL)) # Inside rect
        norm3 = wrap_svg(draw_polygon("35,15 55,50 15,50", fill="none", sw=2) + draw_circle(35, 38, 4, fill=FILL)) # Inside triangle
        norm4 = wrap_svg(draw_polygon("35,15 55,35 35,55 15,35", fill="none", sw=2) + draw_circle(35, 35, 4, fill=FILL)) # Inside diamond
        odd = wrap_svg(draw_rect(18, 18, 34, 34, fill="none", sw=2) + draw_circle(60, 35, 4, fill=FILL)) # Strictly OUTSIDE
        
        prompt = spatial_prompts.SLOT7_PROMPTS[t_idx]
        explanation = f"In four of the figures, the tracking node lies strictly within the interior of the closed shape. In the odd figure, the node lies outside the perimeter."
        
    else:
        # Pattern 3: Intersection Counts (4 have exactly 1 intersection; 1 has 2 or 0)
        # e.g. Two lines crossing = 1 intersection
        norm1 = wrap_svg(draw_line(15, 35, 55, 35, sw=2) + draw_line(35, 15, 35, 55, sw=2)) # Cross (1 intersection)
        norm2 = wrap_svg(draw_line(20, 20, 50, 50, sw=2) + draw_line(20, 50, 50, 20, sw=2)) # X (1 intersection)
        norm3 = wrap_svg(draw_circle(35, 35, 20, fill="none", sw=2) + draw_line(15, 35, 35, 35, sw=2)) # Radius touching center (1 intersection)
        norm4 = wrap_svg(draw_line(20, 35, 50, 35, sw=2) + draw_line(35, 35, 50, 15, sw=2)) # T-junction (1 intersection)
        odd = wrap_svg(draw_line(15, 25, 55, 25, sw=2) + draw_line(15, 45, 55, 45, sw=2)) # Two parallel lines (0 intersections)
        
        prompt = spatial_prompts.SLOT7_PROMPTS[t_idx]
        explanation = f"Four figures feature lines that cross or touch at exactly 1 intersection point. The pair of parallel lines has 0 intersections."

    options, corr_letter = format_odd_options(odd, [norm1, norm2, norm3, norm4], seed)
    return {
        "question": prompt,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Rapidly check topological properties (openness, intersections, containment) to find the outlier.",
        "category": "spatial",
        "subType": "odd_one_out"
    }

# ==============================================================================
# SLOT 8: 27 QUANTITATIVE INVARIANTS ODD-ONE-OUT (Tests 31 to 57)
# ==============================================================================
def gen_slot8_odd(test_num):
    t_idx = test_num - 31
    seed = test_num * 137 + 79
    
    if t_idx < 9:
        # Pattern 1: Even vs Odd number of sides
        # 4 figures have an EVEN number of sides (Square=4, Hexagon=6, Octagon=8, Rectangle=4)
        # 1 figure has an ODD number of sides (Pentagon=5 or Triangle=3)
        norm1 = wrap_svg(draw_rect(20, 20, 30, 30, fill="none", sw=2)) # 4 sides
        norm2 = wrap_svg(draw_polygon(make_poly_pts(6, 22), fill="none", sw=2)) # 6 sides
        norm3 = wrap_svg(draw_polygon(make_poly_pts(8, 22), fill="none", sw=2)) # 8 sides
        norm4 = wrap_svg(draw_polygon("15,25 55,25 55,45 15,45", fill="none", sw=2)) # 4 sides
        odd = wrap_svg(draw_polygon(make_poly_pts(5, 22), fill="none", sw=2)) # 5 sides (Odd)
        
        prompt = spatial_prompts.SLOT8_PROMPTS[t_idx]
        explanation = f"The square (4), rectangle (4), hexagon (6), and octagon (8) all have even numbers of sides. The regular pentagon has 5 sides (odd)."
        
    elif t_idx < 18:
        # Pattern 2: Orthogonal Right Angles (90°) vs Strictly Acute/Obtuse
        # 4 figures contain at least one 90° angle (Square, Right Triangle, L-shape, Rectangle)
        # 1 figure contains only acute/obtuse angles (Equilateral triangle or Hexagon)
        norm1 = wrap_svg(draw_polygon("20,20 20,50 50,50", fill="none", sw=2)) # Right triangle (90° angle)
        norm2 = wrap_svg(draw_rect(20, 20, 30, 30, fill="none", sw=2)) # Square (90° angles)
        norm3 = wrap_svg(draw_path("M 20 20 L 20 50 L 50 50", fill="none", sw=2.5)) # L-bracket (90° angle)
        norm4 = wrap_svg(draw_polygon("20,25 50,25 50,45 20,45", fill="none", sw=2)) # Rectangle (90° angles)
        odd = wrap_svg(draw_polygon(make_poly_pts(3, 22), fill="none", sw=2)) # Equilateral triangle (all 60°)
        
        prompt = spatial_prompts.SLOT8_PROMPTS[t_idx]
        explanation = f"Four figures possess right angles (90°). The equilateral triangle has only 60° acute angles with zero perpendicular corners."
        
    else:
        # Pattern 3: Equal Quadrants / Division Count (4 parts vs 3 parts)
        # 4 figures are divided into exactly 4 equal quadrants/sectors
        # 1 figure is divided into 3 sectors
        norm1 = wrap_svg(draw_circle(35, 35, 22, fill="none", sw=2) + draw_line(35, 13, 35, 57, sw=1.5) + draw_line(13, 35, 57, 35, sw=1.5)) # Circle in 4
        norm2 = wrap_svg(draw_rect(15, 15, 40, 40, fill="none", sw=2) + draw_line(35, 15, 35, 55, sw=1.5) + draw_line(15, 35, 55, 35, sw=1.5)) # Square in 4
        norm3 = wrap_svg(draw_polygon(make_poly_pts(4, 24), fill="none", sw=2) + draw_line(35, 11, 35, 59, sw=1.5) + draw_line(11, 35, 59, 35, sw=1.5)) # Diamond in 4
        norm4 = wrap_svg(draw_rect(15, 25, 40, 20, fill="none", sw=2) + draw_line(25, 25, 25, 45, sw=1.5) + draw_line(35, 25, 35, 45, sw=1.5) + draw_line(45, 25, 45, 45, sw=1.5)) # Rect in 4 strips
        
        # Odd: Circle divided into 3 sectors (Mercedes star)
        spokes = []
        for i in range(3):
            rad = math.radians(-90 + i * 120)
            spokes.append(draw_line(35, 35, round(35 + 22 * math.cos(rad), 1), round(35 + 22 * math.sin(rad), 1), sw=1.5))
        odd = wrap_svg(draw_circle(35, 35, 22, fill="none", sw=2) + ''.join(spokes))
        
        prompt = spatial_prompts.SLOT8_PROMPTS[t_idx]
        explanation = f"Four figures are partitioned into four equal sub-sections. The circle with 3 radial spokes is divided into only 3 sectors."

    options, corr_letter = format_odd_options(odd, [norm1, norm2, norm3, norm4], seed)
    return {
        "question": prompt,
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Count key components (sides, partition regions, angles) immediately to detect numerical discrepancies.",
        "category": "spatial",
        "subType": "odd_one_out"
    }

print("spatial_odd module loaded.")
