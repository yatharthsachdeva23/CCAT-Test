import math
import json
import re

# Primitives for CCAT SVG generation
# All options use IDENTICAL neutral palette: stroke="#38bdf8", fill="none" or "#38bdf8"
STROKE_COLOR = "#38bdf8"
FILL_COLOR = "#38bdf8"
MUTED_STROKE = "#94a3b8"

def wrap_svg(inner, vb="0 0 70 70"):
    return f'<svg viewBox="{vb}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">{inner}</svg>'

def draw_circle(cx, cy, r, fill="none", stroke=STROKE_COLOR, sw=2):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" />'

def draw_rect(x, y, w, h, fill="none", stroke=STROKE_COLOR, sw=2, rx=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" />'

def draw_line(x1, y1, x2, y2, stroke=STROKE_COLOR, sw=2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" />'

def draw_polygon(pts, fill="none", stroke=STROKE_COLOR, sw=2):
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

def randomize_options(raw_options, correct_idx, rand_seed):
    # raw_options is list of dicts: [{'svg': s1}, {'svg': s2}, ...]
    # Guarantee 5 unique options
    unique = []
    seen_svgs = set()
    
    # Correct first
    corr_opt = raw_options[correct_idx]
    unique.append({'svg': corr_opt['svg'], 'isCorr': True})
    seen_svgs.add(corr_opt['svg'])
    
    for i, opt in enumerate(raw_options):
        if i == correct_idx:
            continue
        s = opt['svg']
        if s not in seen_svgs:
            unique.append({'svg': s, 'isCorr': False})
            seen_svgs.add(s)
            if len(unique) == 5:
                break
                
    assert len(unique) == 5, f"Expected 5 unique options, got {len(unique)}"
    
    # Shuffle deterministically
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

print("Primitives defined successfully!")
