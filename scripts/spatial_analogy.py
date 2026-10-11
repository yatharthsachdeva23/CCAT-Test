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

def rot_pt(x, y, ang_deg, cx=35, cy=35):
    rad = math.radians(ang_deg)
    cos_a, sin_a = math.cos(rad), math.sin(rad)
    nx = cx + (x - cx) * cos_a - (y - cy) * sin_a
    ny = cy + (x - cx) * sin_a + (y - cy) * cos_a
    return round(nx, 1), round(ny, 1)

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
# SLOT 9: 27 TRANSFORMATIONAL ANALOGIES (Tests 31 to 57)
# ==============================================================================
def gen_slot9_analogy(test_num):
    t_idx = test_num - 31
    seed = test_num * 139 + 83
    
    if t_idx < 9:
        # Pattern 1: 90° Clockwise Rotation + Invert central node (Hollow <-> Solid)
        # Fig A: Vertical line with hollow top circle
        # Fig B: Horizontal line with solid right circle (rotated 90° CW + filled)
        # Fig C: Upward arrow (vertical arrow pointing North with hollow tip)
        # Fig D: Rightward arrow with solid tip
        fig_a = wrap_svg(draw_line(35, 45, 35, 20, sw=2.5) + draw_circle(35, 20, 4.5, fill="none", sw=2))
        fig_b = wrap_svg(draw_line(25, 35, 50, 35, sw=2.5) + draw_circle(50, 35, 4.5, fill=FILL, sw=1))
        
        # Fig C: Upward pointer
        fig_c = wrap_svg(draw_polygon("35,16 48,45 22,45", fill="none", sw=2) + draw_circle(35, 36, 4, fill="none", sw=2))
        # Fig D: Rotated 90° CW + solid circle inside
        fig_d = wrap_svg(draw_polygon("54,35 25,48 25,22", fill="none", sw=2) + draw_circle(34, 35, 4, fill=FILL, sw=1))
        
        distractors = [
            wrap_svg(draw_polygon("54,35 25,48 25,22", fill="none", sw=2) + draw_circle(34, 35, 4, fill="none", sw=2)), # hollow (failed to invert)
            wrap_svg(draw_polygon("16,35 45,22 45,48", fill="none", sw=2) + draw_circle(36, 35, 4, fill=FILL, sw=1)), # rotated 90° CCW
            wrap_svg(draw_polygon("35,54 22,25 48,25", fill="none", sw=2) + draw_circle(35, 34, 4, fill=FILL, sw=1)), # rotated 180°
            wrap_svg(draw_polygon("35,16 48,45 22,45", fill="none", sw=2) + draw_circle(35, 36, 4, fill=FILL, sw=1))  # unrotated
        ]
        
        prompt = spatial_prompts.SLOT9_PROMPTS[t_idx]
        explanation = f"Figure A rotates 90° clockwise and inverts its hollow marker into a solid fill to become Figure B. Applying this 90° clockwise rotation and solid fill inversion to Figure C yields the right-pointing triangle with a solid core node."
        
    elif t_idx < 18:
        # Pattern 2: Bisection & Separation
        # Fig A: Solid square outline
        # Fig B: Square split down middle and separated horizontally into two rectangles
        # Fig C: Solid circle outline
        # Fig D: Circle split down middle and separated into two semicircles
        fig_a = wrap_svg(draw_rect(20, 20, 30, 30, fill="none", sw=2))
        fig_b = wrap_svg(draw_rect(15, 20, 12, 30, fill="none", sw=2) + draw_rect(43, 20, 12, 30, fill="none", sw=2))
        
        fig_c = wrap_svg(draw_circle(35, 35, 20, fill="none", sw=2))
        # Fig D: two separated semicircles
        # Left semicircle: M 28 15 A 20 20 0 0 0 28 55 Z
        # Right semicircle: M 42 15 A 20 20 0 0 1 42 55 Z
        semi_l = '<path d="M 28 15 A 20 20 0 0 0 28 55 Z" fill="none" stroke="#38bdf8" stroke-width="2" />'
        semi_r = '<path d="M 42 15 A 20 20 0 0 1 42 55 Z" fill="none" stroke="#38bdf8" stroke-width="2" />'
        fig_d = wrap_svg(semi_l + semi_r)
        
        distractors = [
            wrap_svg(draw_circle(35, 35, 20, fill="none", sw=2) + draw_line(35, 15, 35, 55, sw=2)), # Bisected but not separated
            wrap_svg(draw_circle(25, 35, 10, fill="none", sw=2) + draw_circle(45, 35, 10, fill="none", sw=2)), # Two whole circles
            wrap_svg(semi_l), # Only left half
            wrap_svg(draw_circle(35, 35, 12, fill="none", sw=2)) # Shrunk circle
        ]
        
        prompt = spatial_prompts.SLOT9_PROMPTS[t_idx]
        explanation = f"Figure A is bisected along its vertical midline and the two halves are separated laterally to form Figure B. Performing this bisection and lateral separation on Figure C produces two opposing semicircles."
        
    else:
        # Pattern 3: Containment Reversal (Outer encloses Inner -> Inner encloses Outer)
        # Fig A: Outer Square enclosing Inner Circle
        # Fig B: Outer Circle enclosing Inner Square
        # Fig C: Outer Triangle enclosing Inner Diamond
        # Fig D: Outer Diamond enclosing Inner Triangle
        fig_a = wrap_svg(draw_rect(15, 15, 40, 40, fill="none", sw=2) + draw_circle(35, 35, 10, fill="none", sw=2))
        fig_b = wrap_svg(draw_circle(35, 35, 22, fill="none", sw=2) + draw_rect(26, 26, 18, 18, fill="none", sw=2))
        
        fig_c = wrap_svg(draw_polygon(make_poly_pts(3, 24), fill="none", sw=2) + draw_polygon(make_poly_pts(4, 9), fill="none", sw=2))
        # Fig D: Diamond enclosing Triangle
        fig_d = wrap_svg(draw_polygon(make_poly_pts(4, 24), fill="none", sw=2) + draw_polygon(make_poly_pts(3, 9), fill="none", sw=2))
        
        distractors = [
            fig_c, # Unchanged
            wrap_svg(draw_polygon(make_poly_pts(4, 24), fill="none", sw=2) + draw_circle(35, 35, 9, fill="none", sw=2)), # Diamond enclosing circle
            wrap_svg(draw_polygon(make_poly_pts(3, 24), fill="none", sw=2) + draw_polygon(make_poly_pts(3, 9), fill="none", sw=2)), # Nested triangles
            wrap_svg(draw_polygon(make_poly_pts(4, 24), fill="none", sw=2) + draw_polygon(make_poly_pts(4, 9), fill="none", sw=2))  # Nested diamonds
        ]
        
        prompt = spatial_prompts.SLOT9_PROMPTS[t_idx]
        explanation = f"In Figure A, the outer square encloses an inner circle; Figure B swaps their roles so the circle encloses the square. In Figure C, the outer triangle encloses an inner diamond; reversing roles yields an outer diamond enclosing an inner triangle."

    context_svg = {"figA": fig_a, "figB": fig_b, "figC": fig_c}
    options, corr_letter = format_options(fig_d, distractors, seed)
    return {
        "question": prompt,
        "contextSvg": context_svg,
        "figureSvg": [fig_a, fig_b, fig_c],
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Formulate the transformation rule of Pair 1 in exact words, then execute it directly on Figure C.",
        "category": "spatial",
        "subType": "analogy"
    }

# ==============================================================================
# SLOT 10: 27 STRUCTURAL & DIMENSIONAL ANALOGIES (Tests 31 to 57)
# ==============================================================================
def gen_slot10_analogy(test_num):
    t_idx = test_num - 31
    seed = test_num * 149 + 89
    
    if t_idx < 9:
        # Pattern 1: 2D Shape to 3D Extrusion
        # Fig A: 2D Square
        # Fig B: 3D Isometric Cube
        # Fig C: 2D Circle
        # Fig D: 3D Isometric Cylinder
        fig_a = wrap_svg(draw_rect(20, 20, 30, 30, fill="none", sw=2))
        
        # 3D Cube
        cube_top = draw_polygon("35,16 53,26 35,36 17,26", fill="none", sw=1.8)
        cube_l = draw_polygon("17,26 35,36 35,56 17,46", fill="none", sw=1.8)
        cube_r = draw_polygon("35,36 53,26 53,46 35,56", fill="none", sw=1.8)
        fig_b = wrap_svg(cube_top + cube_l + cube_r)
        
        fig_c = wrap_svg(draw_circle(35, 35, 18, fill="none", sw=2))
        
        # 3D Cylinder: top ellipse, vertical sides, bottom arc
        top_ellipse = '<ellipse cx="35" cy="24" rx="18" ry="8" fill="none" stroke="#38bdf8" stroke-width="1.8" />'
        side_l = draw_line(17, 24, 17, 48, sw=1.8)
        side_r = draw_line(53, 24, 53, 48, sw=1.8)
        bot_arc = '<path d="M 17 48 A 18 8 0 0 0 53 48" fill="none" stroke="#38bdf8" stroke-width="1.8" />'
        fig_d = wrap_svg(top_ellipse + side_l + side_r + bot_arc)
        
        distractors = [
            wrap_svg(top_ellipse + side_l + side_r + '<path d="M 17 48 A 18 8 0 0 1 53 48" fill="none" stroke="#38bdf8" stroke-width="1.8" />'), # Inverted bottom
            wrap_svg(draw_circle(35, 35, 18, fill="none", sw=2) + draw_circle(35, 35, 9, fill="none", sw=2)), # Concentric circles
            wrap_svg(draw_polygon("35,16 53,54 17,54", fill="none", sw=1.8) + top_ellipse), # Cone hybrid
            wrap_svg(draw_rect(17, 24, 36, 24, fill="none", sw=1.8)) # Plain rectangle
        ]
        
        prompt = spatial_prompts.SLOT10_PROMPTS[t_idx]
        explanation = f"Figure A (a 2D square) is extruded into its 3D solid equivalent, a cube (Figure B). Applying 3D extrusion to Figure C (a 2D circle) produces a 3D cylinder."
        
    elif t_idx < 18:
        # Pattern 2: Vertex Count (+1) with Internal Concentric Copy
        # Fig A: Triangle (3 vertices)
        # Fig B: Square (4 vertices) with inner concentric square
        # Fig C: Square (4 vertices)
        # Fig D: Pentagon (5 vertices) with inner concentric pentagon
        fig_a = wrap_svg(draw_polygon(make_poly_pts(3, 22), fill="none", sw=2))
        fig_b = wrap_svg(draw_rect(17, 17, 36, 36, fill="none", sw=2) + draw_rect(26, 26, 18, 18, fill="none", sw=1.5))
        
        fig_c = wrap_svg(draw_rect(17, 17, 36, 36, fill="none", sw=2))
        fig_d = wrap_svg(draw_polygon(make_poly_pts(5, 23), fill="none", sw=2) + draw_polygon(make_poly_pts(5, 12), fill="none", sw=1.5))
        
        distractors = [
            wrap_svg(draw_polygon(make_poly_pts(5, 23), fill="none", sw=2)), # Pentagon without inner copy
            wrap_svg(draw_polygon(make_poly_pts(6, 23), fill="none", sw=2) + draw_polygon(make_poly_pts(6, 12), fill="none", sw=1.5)), # Hexagon (+2 sides)
            wrap_svg(draw_rect(17, 17, 36, 36, fill="none", sw=2) + draw_polygon(make_poly_pts(5, 12), fill="none", sw=1.5)), # Square with inner pentagon
            wrap_svg(draw_polygon(make_poly_pts(4, 23), fill="none", sw=2) + draw_polygon(make_poly_pts(4, 12), fill="none", sw=1.5)) # Unchanged diamond
        ]
        
        prompt = spatial_prompts.SLOT10_PROMPTS[t_idx]
        explanation = f"Figure A (3 sides) gains 1 side and adds a concentric inner duplicate to become Figure B (4 sides + nested square). Applying this to Figure C (4 sides) yields a regular pentagon (5 sides) with a nested inner pentagon."
        
    else:
        # Pattern 3: Perimeter boundary converted to radiating star rays
        # Fig A: Triangle (3 sides) -> Fig B: 3 radial spokes from center
        # Fig C: Square (4 sides) -> Fig D: 4 radial spokes (Cross +)
        fig_a = wrap_svg(draw_polygon(make_poly_pts(3, 22), fill="none", sw=2))
        spokes3 = []
        for i in range(3):
            rad = math.radians(-90 + i * 120)
            spokes3.append(draw_line(35, 35, round(35 + 20 * math.cos(rad), 1), round(35 + 20 * math.sin(rad), 1), sw=2.5))
        fig_b = wrap_svg(draw_circle(35, 35, 3.5, fill=FILL) + ''.join(spokes3))
        
        fig_c = wrap_svg(draw_rect(18, 18, 34, 34, fill="none", sw=2))
        spokes4 = [
            draw_line(35, 15, 35, 55, sw=2.5),
            draw_line(15, 35, 55, 35, sw=2.5)
        ]
        fig_d = wrap_svg(draw_circle(35, 35, 3.5, fill=FILL) + ''.join(spokes4))
        
        distractors = [
            wrap_svg(draw_circle(35, 35, 3.5, fill=FILL) + ''.join(spokes3)), # 3 spokes
            wrap_svg(draw_circle(35, 35, 3.5, fill=FILL) + draw_line(20, 20, 50, 50, sw=2.5) + draw_line(20, 50, 50, 20, sw=2.5) + draw_line(35, 15, 35, 55, sw=2.5)), # 6 spokes
            wrap_svg(draw_circle(35, 35, 20, fill="none", sw=2) + ''.join(spokes4)), # Circle enclosure
            wrap_svg(draw_rect(18, 18, 34, 34, fill="none", sw=2) + ''.join(spokes4)) # Square enclosure
        ]
        
        prompt = spatial_prompts.SLOT10_PROMPTS[t_idx]
        explanation = f"Figure A (triangle, 3 vertices) transforms into 3 radial spokes emanating from a central node. Figure C (square, 4 vertices) similarly transforms into 4 perpendicular radial spokes (a 4-ray star/cross)."

    context_svg = {"figA": fig_a, "figB": fig_b, "figC": fig_c}
    options, corr_letter = format_options(fig_d, distractors, seed)
    return {
        "question": prompt,
        "contextSvg": context_svg,
        "figureSvg": [fig_a, fig_b, fig_c],
        "options": options,
        "correctOption": corr_letter,
        "explanation": f"**Correct Answer: {corr_letter}**\n\n{explanation}\n\n💡 **Speed Tip:** Map vertex numbers directly to the transformed feature to spot the match instantly.",
        "category": "spatial",
        "subType": "analogy"
    }

print("spatial_analogy module loaded.")
