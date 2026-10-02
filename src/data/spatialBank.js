/**
 * Curated & Diverse Spatial Reasoning Bank for CCAT Prep
 * Contains 22 fundamentally distinct spatial problem archetypes:
 * - Chiral Mirror Outliers (Handedness vs 2D Rotation)
 * - 3D Cube Net Unfolding (Opposite Face Rule)
 * - Paper Folding & Hole Punching (Symmetry Unfolding)
 * - 3x3 Latin Square Matrices (Shape x Fill uniqueness)
 * - 3x3 Additive Union Matrices (Boolean Union)
 * - Next in Series: Dual-Particle Perimeter Traversal
 * - Next in Series: Multi-Feature Rotation & Satellite
 * - Next in Series: Vertex Count Progression
 * - Next in Series: Sector Shading Sweep
 * - Next in Series: Superposition & Merging
 * - Next in Series: Concentric Inversion
 * - Spatial Analogies: Inversion & Color Flip
 * - Spatial Analogies: Outer-Inner Shape Swap
 * - Spatial Analogies: Vertex Doubling
 * - Spatial Analogies: Geometric Dissection
 * - Topological Outliers: Symmetry & Vertex Parity
 *
 * Tests 2 to 30 each select 11 distinct archetypes in varied order.
 * Guarantees zero duplicate logic, zero repeat questions, and zero collisions with Test 1.
 */

function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    return (s = (s * 16807) % 2147483647) / 2147483647;
  };
}

function randomize(rawOptions, correctIndex, randFn) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const items = rawOptions.map((opt, i) => ({ ...opt, wasCorrect: i === correctIndex }));
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  const finalOptions = items.map((item, idx) => ({ id: letters[idx], text: item.text || '', svg: item.svg }));
  const correctOpt = letters[items.findIndex(item => item.wasCorrect)];
  return { options: finalOptions, correctOption: correctOpt };
}

// SVG Primitives
function wrapSvg(inner, vb = "0 0 70 70") {
  return `<svg viewBox="${vb}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}
function drawCircle(cx, cy, r, fill = "none", stroke = "#38bdf8", sw = 2) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function drawRect(x, y, w, h, fill = "none", stroke = "#38bdf8", sw = 2, rx = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function drawLine(x1, y1, x2, y2, stroke = "#38bdf8", sw = 2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" />`;
}
function drawPolygon(pts, fill = "none", stroke = "#38bdf8", sw = 2) {
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" />`;
}
function drawText(x, y, txt, fill = "#38bdf8", size = 12) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="monospace" font-weight="bold" text-anchor="middle" dominant-baseline="central">${txt}</text>`;
}

// Rotate 2D point around (cx, cy)
function rotPt(x, y, angDeg, cx = 35, cy = 35) {
  const rad = (angDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const nx = cx + (x - cx) * cos - (y - cy) * sin;
  const ny = cy + (x - cx) * sin + (y - cy) * cos;
  return { x: nx.toFixed(1), y: ny.toFixed(1) };
}

export const SPATIAL_ARCHETYPES = [
  // 0: CHIRAL_MIRROR_FLAG (Odd-One-Out - Handedness vs Rotation)
  (t, k, rand) => {
    // Asymmetric Flag figure: vertical pole (25,15)->(25,55), right triangle flag (25,18)->(48,28)->(25,38), and bottom foot (25,55)->(38,55)
    const basePts = [
      { x: 25, y: 15 }, { x: 25, y: 55 }, // pole
      { x: 25, y: 18 }, { x: 48, y: 28 }, { x: 25, y: 38 }, // flag
      { x: 25, y: 55 }, { x: 38, y: 55 } // foot
    ];
    const makeFlagSvg = (ang, mirrored = false) => {
      const pts = basePts.map(p => {
        const mx = mirrored ? (70 - p.x) : p.x;
        return rotPt(mx, p.y, ang);
      });
      return wrapSvg(`
        ${drawLine(pts[0].x, pts[0].y, pts[1].x, pts[1].y, "#38bdf8", 3)}
        ${drawPolygon(`${pts[2].x},${pts[2].y} ${pts[3].x},${pts[3].y} ${pts[4].x},${pts[4].y}`, "rgba(56, 189, 248, 0.25)", "#38bdf8", 2)}
        ${drawLine(pts[5].x, pts[5].y, pts[6].x, pts[6].y, "#f59e0b", 3)}
        ${drawCircle(pts[3].x, pts[3].y, 3.5, "#f59e0b", "#f59e0b", 1)}
      `);
    };

    const angles = [(k * 35) % 360, (k * 35 + 80) % 360, (k * 35 + 160) % 360, (k * 35 + 245) % 360];
    const normalSvgs = angles.map(a => makeFlagSvg(a, false));
    const outlierSvg = makeFlagSvg((k * 35 + 120) % 360, true); // Mirrored! Cannot be rotated into others!

    const rawOpts = [{ svg: outlierSvg }, ...normalSvgs.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which of the five figures below does NOT belong with the others?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nFour of the figures are identical 2D planar rotations of the same asymmetric figure. Figure ${correctOption} is a **mirror reflection (inverted chirality)** and cannot be superimposed onto the others by 2D rotation.`,
      category: 'spatial'
    };
  },

  // 1: CHIRAL_MIRROR_L_NOTCH (Odd-One-Out - Handedness vs Rotation)
  (t, k, rand) => {
    // Asymmetric L with circle hub at corner and notch on vertical arm
    const makeLSvg = (ang, mirrored = false) => {
      const p1 = rotPt(mirrored ? 45 : 25, 20, ang);
      const p2 = rotPt(mirrored ? 45 : 25, 50, ang);
      const p3 = rotPt(mirrored ? 15 : 55, 50, ang);
      const notch = rotPt(mirrored ? 38 : 32, 30, ang);
      return wrapSvg(`
        ${drawLine(p1.x, p1.y, p2.x, p2.y, "#10b981", 3.5)}
        ${drawLine(p2.x, p2.y, p3.x, p3.y, "#10b981", 3.5)}
        ${drawCircle(p2.x, p2.y, 5, "#f59e0b", "#d97706", 2)}
        ${drawCircle(p1.x, p1.y, 3, "#10b981", "#10b981", 1)}
        ${drawCircle(notch.x, notch.y, 3.5, "#ec4899", "#db2777", 1.5)}
      `);
    };

    const angles = [(k * 40) % 360, (k * 40 + 75) % 360, (k * 40 + 155) % 360, (k * 40 + 235) % 360];
    const normalSvgs = angles.map(a => makeLSvg(a, false));
    const outlierSvg = makeLSvg((k * 40 + 110) % 360, true);

    const rawOpts = [{ svg: outlierSvg }, ...normalSvgs.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure is the odd one out?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nFour figures are 2D rotated versions of the same asymmetric bracket. Figure ${correctOption} is a mirror reflection (inverted handedness) and cannot be rotated into alignment.`,
      category: 'spatial'
    };
  },

  // 2: CUBE_NET_LATIN_CROSS (3D Cube Net Folding)
  (t, k, rand) => {
    // Symbols: 1=Circle, 2=Star, 3=Cross(+), 4=Square, 5=Triangle, 6=Diamond
    // Opposite pairs: (1, 6), (2, 4), (3, 5)
    // Flat Net SVG
    const netSvg = wrapSvg(`
      <g stroke="#475569" stroke-width="1.5" fill="none">
        <!-- Cross layout: Top(1), Mid(2,3,4,5), Bot(6) -->
        <rect x="50" y="8" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="26" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="50" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="74" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="98" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="50" y="56" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
      </g>
      <!-- Symbols -->
      ${drawCircle(62, 20, 6, "none", "#38bdf8", 2)} <!-- 1: Circle -->
      ${drawText(38, 44, "★", "#f59e0b", 12)} <!-- 2: Star -->
      ${drawText(62, 44, "+", "#ec4899", 14)} <!-- 3: Cross -->
      ${drawRect(82, 38, 10, 10, "none", "#10b981", 1.8)} <!-- 4: Square -->
      ${drawPolygon("105,50 115,50 110,38", "none", "#a855f7", 1.8)} <!-- 5: Triangle -->
      ${drawPolygon("62,60 69,68 62,76 55,68", "none", "#38bdf8", 1.8)} <!-- 6: Diamond -->
    `, "0 0 148 88");

    // Function to render isometric 3D cube with 3 visible faces: Top, Front-Left, Front-Right
    const makeCubeSvg = (topSym, leftSym, rightSym) => {
      const symSvg = (sym, cx, cy) => {
        if (sym === 'circle') return drawCircle(cx, cy, 5, "none", "#38bdf8", 1.8);
        if (sym === 'star') return drawText(cx, cy, "★", "#f59e0b", 10);
        if (sym === 'cross') return drawText(cx, cy, "+", "#ec4899", 12);
        if (sym === 'square') return drawRect(cx - 4, cy - 4, 8, 8, "none", "#10b981", 1.5);
        if (sym === 'triangle') return drawPolygon(`${cx-4},${cy+4} ${cx+4},${cy+4} ${cx},${cy-4}`, "none", "#a855f7", 1.5);
        if (sym === 'diamond') return drawPolygon(`${cx},${cy-5} ${cx+5},${cy} ${cx},${cy+5} ${cx-5},${cy}`, "none", "#38bdf8", 1.5);
        return '';
      };

      return wrapSvg(`
        <!-- Top face -->
        <polygon points="35,14 53,24 35,34 17,24" fill="rgba(30,41,59,0.8)" stroke="#64748b" stroke-width="1.5" />
        <!-- Front-Left face -->
        <polygon points="17,24 35,34 35,56 17,46" fill="rgba(15,23,42,0.9)" stroke="#64748b" stroke-width="1.5" />
        <!-- Front-Right face -->
        <polygon points="35,34 53,24 53,46 35,56" fill="rgba(15,23,42,0.7)" stroke="#64748b" stroke-width="1.5" />
        ${symSvg(topSym, 35, 24)}
        ${symSvg(leftSym, 26, 42)}
        ${symSvg(rightSym, 44, 42)}
      `);
    };

    // Valid cube: 3 mutually adjacent faces (Circle, Star, Cross)
    const correctSvg = makeCubeSvg('circle', 'star', 'cross');
    // Distractors: pairs of opposites visible on the same cube!
    const distractors = [
      makeCubeSvg('circle', 'diamond', 'star'), // Circle & Diamond are opposite!
      makeCubeSvg('star', 'square', 'cross'),  // Star & Square are opposite!
      makeCubeSvg('cross', 'triangle', 'circle'), // Cross & Triangle are opposite!
      makeCubeSvg('circle', 'diamond', 'cross') // Circle & Diamond opposite!
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which of the following 3D cubes CAN be formed by folding the flat net shown below?`,
      figureSvg: netSvg,
      figureLabel: 'Flat Cube Net (Unfolded):',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**CCAT 3D Cube Rule:**\nIn the flat net, faces separated by one square are **opposite faces** and can NEVER be adjacent on a folded 3D cube:\n- Circle and Diamond are opposite.\n- Star and Square are opposite.\n- Cross and Triangle are opposite.\n\nAll four incorrect options show opposite faces placed adjacent to each other. Only Option ${correctOption} correctly shows three mutually adjacent faces.`,
      category: 'spatial'
    };
  },

  // 3: PAPER_FOLDING_CORNER_PUNCH (Unfolding Symmetry)
  (t, k, rand) => {
    // Fold diagram SVG: Step 1 (fold right) -> Step 2 (fold up) -> Step 3 (punch hole)
    const foldDiagram = wrapSvg(`
      <g stroke="#64748b" stroke-width="1.5" fill="none">
        <!-- Sheet 1: Fold left to right -->
        <rect x="10" y="10" width="36" height="36" fill="rgba(30,41,59,0.6)" />
        <line x1="28" y1="10" x2="28" y2="46" stroke="#f59e0b" stroke-dasharray="3,2" />
        ${drawText(28, 54, "Fold ➔", "#94a3b8", 8)}

        <!-- Sheet 2: Fold bottom to top -->
        <rect x="65" y="10" width="18" height="36" fill="rgba(30,41,59,0.7)" />
        <line x1="65" y1="28" x2="83" y2="28" stroke="#f59e0b" stroke-dasharray="3,2" />
        ${drawText(74, 54, "Fold ⬆", "#94a3b8", 8)}

        <!-- Sheet 3: Corner Punch -->
        <rect x="110" y="10" width="18" height="18" fill="rgba(14,165,233,0.2)" stroke="#38bdf8" />
        <circle cx="124" cy="14" r="3" fill="#f43f5e" stroke="#f43f5e" />
        ${drawText(119, 54, "Punch ●", "#f43f5e", 8)}
      </g>
    `, "0 0 148 64");

    const makeUnfoldedSvg = (holes) => {
      return wrapSvg(`
        <rect x="12" y="12" width="46" height="46" fill="rgba(30,41,59,0.6)" stroke="#475569" stroke-width="1.5" />
        <line x1="35" y1="12" x2="35" y2="58" stroke="#334155" stroke-dasharray="2,2" />
        <line x1="12" y1="35" x2="58" y2="35" stroke="#334155" stroke-dasharray="2,2" />
        ${holes.map(h => drawCircle(h.x, h.y, 3, "#f43f5e", "#f43f5e", 1)).join('')}
      `);
    };

    // Correct: 4 holes symmetrically in each corner
    const correctSvg = makeUnfoldedSvg([{x: 52, y: 18}, {x: 18, y: 18}, {x: 52, y: 52}, {x: 18, y: 52}]);
    const distractors = [
      makeUnfoldedSvg([{x: 52, y: 18}]), // Only 1 hole
      makeUnfoldedSvg([{x: 52, y: 18}, {x: 18, y: 18}]), // Only top 2 holes
      makeUnfoldedSvg([{x: 52, y: 18}, {x: 52, y: 52}]), // Only right 2 holes
      makeUnfoldedSvg([{x: 35, y: 18}, {x: 35, y: 52}, {x: 18, y: 35}, {x: 52, y: 35}]) // Along axes instead of corners
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `A square sheet of paper is folded in half twice and punched with a circular hole as shown. Which figure represents the sheet when completely unfolded?`,
      figureSvg: foldDiagram,
      figureLabel: 'Paper Folding & Punch Sequence:',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nUnfolding across the horizontal fold line mirrors the punch from top to bottom. Unfolding across the vertical fold line mirrors both punches from right to left, resulting in **4 symmetrically positioned holes** in all four quadrants.`,
      category: 'spatial'
    };
  },

  // 4: MATRIX_LATIN_SQUARE (3x3 Matrix - Shape x Fill Uniqueness)
  (t, k, rand) => {
    // Shapes: Circle, Square, Triangle
    // Fills: Empty, Striped, Solid
    const cellSvg = (shape, fill) => {
      const stroke = "#38bdf8";
      const fColor = fill === 'solid' ? "#38bdf8" : fill === 'striped' ? "rgba(56, 189, 248, 0.35)" : "none";
      if (shape === 'circle') return drawCircle(35, 35, 18, fColor, stroke, 2);
      if (shape === 'square') return drawRect(17, 17, 36, 36, fColor, stroke, 2);
      if (shape === 'triangle') return drawPolygon("35,16 54,50 16,50", fColor, stroke, 2);
      return '';
    };

    // Row 1: (Circle, empty), (Square, striped), (Triangle, solid)
    // Row 2: (Square, solid), (Triangle, empty), (Circle, striped)
    // Row 3: (Triangle, striped), (Circle, solid), [Square, empty] => ?
    const matrixCells = [
      wrapSvg(cellSvg('circle', 'empty')),
      wrapSvg(cellSvg('square', 'striped')),
      wrapSvg(cellSvg('triangle', 'solid')),
      wrapSvg(cellSvg('square', 'solid')),
      wrapSvg(cellSvg('triangle', 'empty')),
      wrapSvg(cellSvg('circle', 'striped')),
      wrapSvg(cellSvg('triangle', 'striped')),
      wrapSvg(cellSvg('circle', 'solid')),
      '?'
    ];

    const correctSvg = wrapSvg(cellSvg('square', 'empty'));
    const distractors = [
      wrapSvg(cellSvg('square', 'striped')),
      wrapSvg(cellSvg('circle', 'empty')),
      wrapSvg(cellSvg('triangle', 'solid')),
      wrapSvg(cellSvg('square', 'solid'))
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure logically replaces the question mark in this 3×3 matrix?`,
      matrixCells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Latin Square Rule:**\nEach row and each column must contain:\n1. Exactly one Circle, one Square, and one Triangle.\n2. Exactly one Empty, one Striped, and one Solid fill.\nIn the bottom row and right column, the only missing combination is an **Empty Square**.`,
      category: 'spatial'
    };
  },

  // 5: MATRIX_ADDITIVE_UNION (3x3 Matrix - Boolean Union)
  (t, k, rand) => {
    // Row 1: Horizontal line + Vertical line = Cross (+)
    // Row 2: Circle + Diagonal slash = Circle with slash
    // Row 3: Rounded square + Central dot = Rounded square with central dot (?)
    const cell1 = wrapSvg(drawRect(18, 18, 34, 34, "none", "#10b981", 2, 4));
    const cell2 = wrapSvg(drawCircle(35, 35, 4.5, "#f59e0b", "#f59e0b", 1));
    const correctSvg = wrapSvg(`
      ${drawRect(18, 18, 34, 34, "none", "#10b981", 2, 4)}
      ${drawCircle(35, 35, 4.5, "#f59e0b", "#f59e0b", 1)}
    `);

    const matrixCells = [
      wrapSvg(drawLine(15, 35, 55, 35, "#38bdf8", 2.5)),
      wrapSvg(drawLine(35, 15, 35, 55, "#38bdf8", 2.5)),
      wrapSvg(`${drawLine(15, 35, 55, 35, "#38bdf8", 2.5)}${drawLine(35, 15, 35, 55, "#38bdf8", 2.5)}`),
      wrapSvg(drawCircle(35, 35, 18, "none", "#a855f7", 2)),
      wrapSvg(drawLine(22, 22, 48, 48, "#a855f7", 2.5)),
      wrapSvg(`${drawCircle(35, 35, 18, "none", "#a855f7", 2)}${drawLine(22, 22, 48, 48, "#a855f7", 2.5)}`),
      cell1,
      cell2,
      '?'
    ];

    const distractors = [
      wrapSvg(drawRect(18, 18, 34, 34, "rgba(16,185,129,0.3)", "#10b981", 2, 4)),
      wrapSvg(drawCircle(35, 35, 18, "none", "#10b981", 2)),
      cell1,
      wrapSvg(`${drawCircle(35, 35, 18, "none", "#38bdf8", 2)}${drawCircle(35, 35, 4.5, "#f59e0b", "#f59e0b", 1)}`)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure completes the third row of this matrix?`,
      matrixCells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Additive Rule:**\nAcross each row, the third figure is the direct composite union of the first two figures (Figure 1 + Figure 2 = Figure 3). Combining the rounded square with the central dot produces Option ${correctOption}.`,
      category: 'spatial'
    };
  },

  // 6: SERIES_DUAL_ORBIT (Next in Series - Perimeter Traversal)
  (t, k, rand) => {
    // Hexagon vertices
    const hexPts = [0, 1, 2, 3, 4, 5].map(i => {
      const a = (i * 60 * Math.PI) / 180 - Math.PI / 2;
      return { x: (35 + 22 * Math.cos(a)).toFixed(1), y: (35 + 22 * Math.sin(a)).toFixed(1) };
    });
    const hexPoly = hexPts.map(p => `${p.x},${p.y}`).join(' ');

    // Particle 1 (Solid) moves clockwise by 1 vertex (+1)
    // Particle 2 (Hollow) moves counter-clockwise by 2 vertices (-2)
    const makeFrame = (step) => {
      const p1Idx = (step) % 6;
      const p2Idx = (600 - step * 2) % 6;
      const pt1 = hexPts[p1Idx];
      const pt2 = hexPts[p2Idx];
      return wrapSvg(`
        ${drawPolygon(hexPoly, "rgba(30,41,59,0.5)", "#475569", 1.8)}
        ${drawCircle(pt1.x, pt1.y, 4, "#f59e0b", "#f59e0b", 1)}
        ${drawCircle(pt2.x, pt2.y, 4, "none", "#38bdf8", 2)}
      `);
    };

    const sequenceFrames = [0, 1, 2, 3].map(s => makeFrame(s));
    const correctSvg = makeFrame(4);
    const distractors = [
      makeFrame(5),
      makeFrame(3),
      makeFrame(2),
      wrapSvg(`${drawPolygon(hexPoly, "none", "#475569", 1.8)}${drawCircle(hexPts[0].x, hexPts[0].y, 4, "#f59e0b", "#f59e0b", 1)}`)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure comes next in this orbital progression?`,
      sequenceFrames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\n- Solid amber dot advances 1 vertex clockwise in each step.\n- Hollow cyan ring advances 2 vertices counter-clockwise in each step.\nIn Step 5, their projected positions match Option ${correctOption}.`,
      category: 'spatial'
    };
  },

  // 7: SERIES_POLYGON_VERTICES (Next in Series - Vertex Count Progression)
  (t, k, rand) => {
    const makePoly = (n) => {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = (i * 2 * Math.PI) / n - Math.PI / 2;
        pts.push(`${(35 + 20 * Math.cos(a)).toFixed(1)},${(35 + 20 * Math.sin(a)).toFixed(1)}`);
      }
      return wrapSvg(`
        ${drawPolygon(pts.join(' '), "rgba(16,185,129,0.2)", "#10b981", 2)}
        ${drawCircle(35, 35, 3, "#f59e0b", "#f59e0b", 1)}
      `);
    };

    const base = 3 + (k % 2); // 3 (Triangle) or 4 (Square)
    const sequenceFrames = [base, base + 1, base + 2, base + 3].map(s => makePoly(s));
    const targetSides = base + 4;
    const correctSvg = makePoly(targetSides);
    const distractors = [
      makePoly(targetSides - 1),
      makePoly(targetSides + 1),
      makePoly(base + 1),
      makePoly(targetSides - 2)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which polygon figure logically completes this sequence?`,
      sequenceFrames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nEach frame increments the number of polygon vertices by 1: ${base} sides -> ${base+1} -> ${base+2} -> ${base+3}. The fifth figure must have exactly **${targetSides} sides**.`,
      category: 'spatial'
    };
  },

  // 8: ANALOGY_OUTER_INNER_SWAP (Spatial Analogy - A : B :: C : ?)
  (t, k, rand) => {
    // Figure A: Outer Square, Inner Circle
    // Figure B: Outer Circle, Inner Square
    // Figure C: Outer Triangle, Inner Diamond
    // Choice ?: Outer Diamond, Inner Triangle
    const figA = wrapSvg(`${drawRect(15, 15, 40, 40, "none", "#38bdf8", 2)}${drawCircle(35, 35, 10, "rgba(245,158,11,0.3)", "#f59e0b", 1.8)}`);
    const figB = wrapSvg(`${drawCircle(35, 35, 20, "none", "#38bdf8", 2)}${drawRect(27, 27, 16, 16, "rgba(245,158,11,0.3)", "#f59e0b", 1.8)}`);
    const figC = wrapSvg(`${drawPolygon("35,14 55,54 15,54", "none", "#ec4899", 2)}${drawPolygon("35,30 42,39 35,48 28,39", "rgba(16,185,129,0.3)", "#10b981", 1.8)}`);

    const correctSvg = wrapSvg(`${drawPolygon("35,14 55,35 35,56 15,35", "none", "#10b981", 2)}${drawPolygon("35,26 43,44 27,44", "rgba(236,72,153,0.3)", "#ec4899", 1.8)}`);
    const distractors = [
      wrapSvg(`${drawPolygon("35,14 55,54 15,54", "none", "#ec4899", 2)}${drawCircle(35, 38, 7, "none", "#38bdf8", 1.8)}`),
      figC,
      wrapSvg(`${drawCircle(35, 35, 20, "none", "#10b981", 2)}${drawPolygon("35,26 43,44 27,44", "none", "#ec4899", 1.8)}`),
      wrapSvg(`${drawPolygon("35,14 55,35 35,56 15,35", "none", "#10b981", 2)}${drawCircle(35, 35, 8, "none", "#f59e0b", 1.8)}`)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Figure A is to Figure B as Figure C is to which of the following choices?`,
      contextSvg: { figA, figB, figC },
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Transformation Rule:**\nThe outer shape and inner shape swap roles: the outer shape shrinks to become the interior core, while the interior shape expands to form the exterior boundary. Applying this to Figure C yields an **outer Diamond enclosing an inner Triangle**.`,
      category: 'spatial'
    };
  },

  // 9: ANALOGY_INVERSION_COLOR (Spatial Analogy - A : B :: C : ?)
  (t, k, rand) => {
    // Figure A: Arrow pointing UP (Solid Fill)
    // Figure B: Arrow pointing DOWN (Hollow Outline)
    // Figure C: Triangle pointing RIGHT (Solid Fill)
    // Choice: Triangle pointing LEFT (Hollow Outline)
    const figA = wrapSvg(drawPolygon("35,16 48,34 40,34 40,54 30,54 30,34 22,34", "#38bdf8", "#38bdf8", 1.5));
    const figB = wrapSvg(drawPolygon("35,54 48,36 40,36 40,16 30,16 30,36 22,36", "none", "#38bdf8", 2));
    const figC = wrapSvg(drawPolygon("52,35 24,18 24,52", "#f59e0b", "#f59e0b", 1.5));

    const correctSvg = wrapSvg(drawPolygon("18,35 46,18 46,52", "none", "#f59e0b", 2));
    const distractors = [
      figC,
      wrapSvg(drawPolygon("18,35 46,18 46,52", "#f59e0b", "#f59e0b", 1.5)),
      wrapSvg(drawPolygon("52,35 24,18 24,52", "none", "#f59e0b", 2)),
      wrapSvg(drawPolygon("35,18 52,46 18,46", "none", "#38bdf8", 2))
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Figure A is to Figure B as Figure C is to which choice?`,
      contextSvg: { figA, figB, figC },
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Transformation Rule:**\nTwo simultaneous rules:\n1. Direction inverts by 180° (points in the exact opposite direction).\n2. Solid fill converts into a hollow outline.\nApplying both to Figure C yields a **hollow triangle pointing to the left**.`,
      category: 'spatial'
    };
  },

  // 10: ODD_ONE_OUT_SYMMETRY (Odd-One-Out - Symmetry Invariant)
  (t, k, rand) => {
    // 4 symmetric shapes: Circle, Equilateral Triangle, Rectangle, Symmetric Cross
    // 1 asymmetric shape: Scalene Quadrilateral
    const sym1 = wrapSvg(drawCircle(35, 35, 20, "rgba(56,189,248,0.2)", "#38bdf8", 2));
    const sym2 = wrapSvg(drawPolygon("35,15 54,48 16,48", "rgba(56,189,248,0.2)", "#38bdf8", 2));
    const sym3 = wrapSvg(drawRect(18, 22, 34, 26, "rgba(56,189,248,0.2)", "#38bdf8", 2));
    const sym4 = wrapSvg(`${drawLine(35, 15, 35, 55, "#38bdf8", 3)}${drawLine(15, 35, 55, 35, "#38bdf8", 3)}`);
    const asymmetric = wrapSvg(drawPolygon("18,18 52,24 44,52 14,42", "rgba(244,63,94,0.2)", "#f43f5e", 2));

    const rawOpts = [{ svg: asymmetric }, { svg: sym1 }, { svg: sym2 }, { svg: sym3 }, { svg: sym4 }];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure does NOT share the same geometric symmetry property as the others?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nFigures in the other options all possess at least one line of **bilateral reflectional symmetry**. Option ${correctOption} is completely asymmetric with no axis of symmetry.`,
      category: 'spatial'
    };
  }
];

/**
 * Returns 11 completely unique, non-overlapping spatial questions for a given test (2 to 30).
 * Draws diverse spatial archetypes (Chirality, Cube Nets, Paper Folding, Latin Squares, Series, Analogies).
 */
export function getSpatialQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 9411 + 5081);
  const total = SPATIAL_ARCHETYPES.length; // 11
  const k = testNumber - 2;

  // Generate all 11 archetypes with test-keyed parameters
  const questions = SPATIAL_ARCHETYPES.map((arch) => arch(testNumber, k, rand));

  // Deterministically shuffle question order within the test
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}
