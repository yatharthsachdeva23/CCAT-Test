/**
 * Curated & Diverse CCAT Spatial Reasoning Bank
 * 
 * Contains 34 Distinct CCAT Spatial Archetypes across 5 Categories:
 * 1. Spatial Series (8 archetypes):
 *    - 0: Rotational Dial / Pointer
 *    - 1: Vertex / Side Count Progression (3->4->5->6->7 sides)
 *    - 2: Sector Shading Sweep (8-wedge pie wheel)
 *    - 3: Dual-Particle Perimeter Traversal (Opposite directions)
 *    - 4: Concentric Expansion (Rings +1)
 *    - 5: Stroke Construction (Segment by segment)
 *    - 6: Matrix Grid Token Walk (Perimeter walk)
 *    - 7: Alternating Flip & Polarity Series (Rotation + Invert fill)
 * 
 * 2. Spatial Matrices (8 archetypes):
 *    - 0: 3x3 Latin Square - Fundamental Shapes
 *    - 1: 3x3 Latin Square - Compound (Shape + Fill pattern)
 *    - 2: 3x3 Additive Boolean Union (Lines combine across row)
 *    - 3: 3x3 XOR / Overlap Cancellation (Common elements cancel)
 *    - 4: 3x3 Dot Count Arithmetic Matrix (Sum rule: C1 + C2 = C3)
 *    - 5: 2x2 Geometric Proportion Matrix (90° clockwise rotation)
 *    - 6: 3x3 Progressive Row Transformation (Rotation + Dot shift)
 *    - 7: 3x3 Concentric Layer Shift (Outer container x Inner symbol)
 * 
 * 3. Odd-One-Out / Outliers (8 archetypes):
 *    - 0: Chiral Outlier - Asymmetric Flag (Handedness vs 2D rotation)
 *    - 1: Chiral Outlier - Notched L-Bracket
 *    - 2: Chiral Outlier - Spiral Hook
 *    - 3: Bilateral Symmetry Invariant (4 symmetric vs 1 asymmetric)
 *    - 4: Vertex / Side Parity Outlier (4 even-sided vs 1 odd-sided)
 *    - 5: Enclosed Regions / Loop Count Outlier (4 have 2 loops vs 1 has 3)
 *    - 6: Feature Relative Position (Dot inside concave vs convex exterior)
 *    - 7: Open vs Closed Boundary Outlier (Closed loops vs open contour)
 * 
 * 4. Spatial Analogies (5 archetypes):
 *    - 0: Outer / Inner Shape Swap
 *    - 1: 180° Inversion + Color/Fill Flip
 *    - 2: Vertex Doubling (Triangle->Hexagon :: Square->Octagon)
 *    - 3: Geometric Bisection (Split along vertical axis of symmetry)
 *    - 4: Feature Extraction (Inner symbol extracted from outer container)
 * 
 * 5. 3D Cube & Paper Folding (5 archetypes):
 *    - 0: Cube Net - Latin Cross Net (Symbols, opposite faces rule)
 *    - 1: Cube Net - T-Shape Net (Letters A-F, opposite faces rule)
 *    - 2: Cube Net - Step / Z-Net (Numbers 1-6, opposite faces rule)
 *    - 3: Paper Folding - Corner Hole Punch (Dual fold -> 4 corner holes)
 *    - 4: Paper Folding - Diagonal Triangular Fold (Diagonal fold -> 2 mirrored holes)
 * 
 * Tests 2 to 30 each select 11 dynamically balanced archetypes:
 * - 3 Series questions
 * - 2 Matrix questions
 * - 3 Odd-One-Out questions
 * - 2 Analogy questions
 * - 1 3D Cube / Paper Folding question
 * Total = exactly 11 spatial questions per test.
 * Full variety, zero duplicate options, zero cross-paper identical repeats.
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

function shuffleArray(array, randFn) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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
function rotPt(x, y, angDeg, cx = 35, cy = 35) {
  const rad = (angDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const nx = cx + (x - cx) * cos - (y - cy) * sin;
  const ny = cy + (x - cx) * sin + (y - cy) * cos;
  return { x: parseFloat(nx.toFixed(1)), y: parseFloat(ny.toFixed(1)) };
}
function makePolygonPts(nSides, r, cx = 35, cy = 35, startAngDeg = -90) {
  const pts = [];
  for (let i = 0; i < nSides; i++) {
    const angDeg = startAngDeg + (i * 360) / nSides;
    const rad = (angDeg * Math.PI) / 180;
    const x = (cx + r * Math.cos(rad)).toFixed(1);
    const y = (cy + r * Math.sin(rad)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return pts.join(' ');
}

// -------------------------------------------------------------
// POOL 1: SERIES ARCHETYPES (8 Types)
// -------------------------------------------------------------
const SERIES_ARCHETYPES = [
  // 0: Clockwise / Counter-Clockwise Rotational Dial
  (t, k, rand) => {
    const isClockwise = t % 2 === 0;
    const stepDeg = 45;
    const startDeg = (k * 45) % 360;
    const makeDial = (ang) => {
      const tip = rotPt(35, 16, ang);
      const leftW = rotPt(30, 24, ang);
      const rightW = rotPt(40, 24, ang);
      const center = rotPt(35, 35, ang);
      const tail = rotPt(35, 52, ang);
      return wrapSvg(`
        ${drawCircle(35, 35, 26, "none", "#334155", 1.5)}
        ${drawLine(tail.x, tail.y, center.x, center.y, "#38bdf8", 3)}
        ${drawLine(center.x, center.y, tip.x, tip.y, "#38bdf8", 3)}
        ${drawPolygon(`${tip.x},${tip.y} ${leftW.x},${leftW.y} ${rightW.x},${rightW.y}`, "#f59e0b", "#f59e0b", 1)}
        ${drawCircle(35, 35, 4, "#0f172a", "#38bdf8", 2)}
      `);
    };

    const dir = isClockwise ? 1 : -1;
    const frameAngles = [0, 1, 2, 3].map(i => (startDeg + i * stepDeg * dir + 360) % 360);
    const targetAngle = (startDeg + 4 * stepDeg * dir + 360) % 360;
    const frames = frameAngles.map(a => makeDial(a));
    const correctSvg = makeDial(targetAngle);

    const distractorAngles = [
      (targetAngle + 45) % 360,
      (targetAngle + 90) % 360,
      (targetAngle + 180) % 360,
      (targetAngle + 270) % 360
    ];
    const rawOpts = [{ svg: correctSvg }, ...distractorAngles.map(a => ({ svg: makeDial(a) }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure logically completes the rotational sequence below?`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Sequence Pattern:**\nThe pointer rotates ${stepDeg}° ${isClockwise ? 'clockwise' : 'counter-clockwise'} at each step. The 5th step points at ${targetAngle}°.`,
      category: 'spatial'
    };
  },

  // 1: Polygon Vertex / Side Count Progression (3, 4, 5, 6 -> 7 or 8, 7, 6, 5 -> 4)
  (t, k, rand) => {
    const isAscending = (t % 2 === 0);
    const sideCounts = isAscending ? [3, 4, 5, 6] : [8, 7, 6, 5];
    const targetSides = isAscending ? 7 : 4;
    const colors = ["#38bdf8", "#10b981", "#a855f7", "#f59e0b", "#f43f5e"];

    const makePolygonFigure = (n) => {
      const col = colors[(n - 3) % colors.length] || "#38bdf8";
      const pts = makePolygonPts(n, 22);
      return wrapSvg(`
        ${drawPolygon(pts, "rgba(56, 189, 248, 0.15)", col, 2.5)}
        ${drawCircle(35, 35, 3.5, col, col, 1)}
      `);
    };

    const frames = sideCounts.map(n => makePolygonFigure(n));
    const correctSvg = makePolygonFigure(targetSides);
    const wrongSides = isAscending ? [5, 6, 8, 9] : [3, 5, 6, 7];
    const rawOpts = [{ svg: correctSvg }, ...wrongSides.map(w => ({ svg: makePolygonFigure(w) }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure comes next in the geometric progression?`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nThe number of sides/vertices ${isAscending ? 'increases by 1' : 'decreases by 1'} at each consecutive frame (${sideCounts.join(' ➔ ')} ➔ **${targetSides} sides**).`,
      category: 'spatial'
    };
  },

  // 2: Sector Shading Sweep (8-Wedge Pie Wheel)
  (t, k, rand) => {
    const stepSize = (t % 3 === 0) ? 2 : 1;
    const startSector = (k * 2) % 8;

    const makePieSvg = (activeSector) => {
      const slices = [];
      for (let i = 0; i < 8; i++) {
        const a1 = (i * 45 * Math.PI) / 180;
        const a2 = ((i + 1) * 45 * Math.PI) / 180;
        const x1 = (35 + 24 * Math.cos(a1)).toFixed(1);
        const y1 = (35 + 24 * Math.sin(a1)).toFixed(1);
        const x2 = (35 + 24 * Math.cos(a2)).toFixed(1);
        const y2 = (35 + 24 * Math.sin(a2)).toFixed(1);
        const isShaded = i === activeSector;
        const fill = isShaded ? "#f59e0b" : "rgba(30, 41, 59, 0.5)";
        slices.push(`<path d="M 35 35 L ${x1} ${y1} A 24 24 0 0 1 ${x2} ${y2} Z" fill="${fill}" stroke="#64748b" stroke-width="1.2" />`);
      }
      return wrapSvg(slices.join('') + drawCircle(35, 35, 4, "#0f172a", "#f59e0b", 1.5));
    };

    const frameSectors = [0, 1, 2, 3].map(i => (startSector + i * stepSize) % 8);
    const targetSector = (startSector + 4 * stepSize) % 8;

    const frames = frameSectors.map(s => makePieSvg(s));
    const correctSvg = makePieSvg(targetSector);
    const wrongSectors = [(targetSector + 1) % 8, (targetSector + 3) % 8, (targetSector + 4) % 8, (targetSector + 5) % 8];
    const rawOpts = [{ svg: correctSvg }, ...wrongSectors.map(s => ({ svg: makePieSvg(s) }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Identify the next figure in the rotating sector sequence:`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nThe shaded sector advances clockwise by **${stepSize} position(s)** in each frame. Step 5 lands on sector index ${targetSector + 1}.`,
      category: 'spatial'
    };
  },

  // 3: Dual-Particle Perimeter Traversal (Hexagon vertices)
  (t, k, rand) => {
    const makeHexTracker = (posA, posB) => {
      const pts = [];
      for (let i = 0; i < 6; i++) {
        const rad = ((-90 + i * 60) * Math.PI) / 180;
        pts.push({ x: 35 + 23 * Math.cos(rad), y: 35 + 23 * Math.sin(rad) });
      }
      const polyStr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
      const pA = pts[posA % 6];
      const pB = pts[posB % 6];

      return wrapSvg(`
        ${drawPolygon(polyStr, "rgba(15, 23, 42, 0.6)", "#64748b", 1.8)}
        ${pts.map(p => drawCircle(p.x, p.y, 2, "#334155", "#475569", 1)).join('')}
        ${drawCircle(pA.x, pA.y, 4.5, "#38bdf8", "#0284c7", 1.5)}
        ${drawRect(pB.x - 4, pB.y - 4, 8, 8, "#f59e0b", "#d97706", 1.5)}
      `);
    };

    const startA = k % 6;
    const startB = (k + 3) % 6;
    const framePositions = [0, 1, 2, 3].map(i => ({
      a: (startA + i * 1) % 6,
      b: (startB - i * 1 + 12) % 6
    }));

    const targetPos = {
      a: (startA + 4 * 1) % 6,
      b: (startB - 4 * 1 + 12) % 6
    };

    const frames = framePositions.map(p => makeHexTracker(p.a, p.b));
    const correctSvg = makeHexTracker(targetPos.a, targetPos.b);

    const distractorPositions = [
      { a: (targetPos.a + 1) % 6, b: targetPos.b },
      { a: targetPos.a, b: (targetPos.b + 1) % 6 },
      { a: (targetPos.a + 2) % 6, b: (targetPos.b - 1 + 6) % 6 },
      { a: (targetPos.a - 1 + 6) % 6, b: (targetPos.b + 2) % 6 }
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractorPositions.map(p => ({ svg: makeHexTracker(p.a, p.b) }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly displays the next position of both particles?`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Dual Tracking Rule:**\n- Circular Dot (Cyan) travels **clockwise by +1 vertex** each step.\n- Square Marker (Amber) travels **counter-clockwise by -1 vertex** each step.`,
      category: 'spatial'
    };
  },

  // 4: Concentric Expansion
  (t, k, rand) => {
    const makeRingsSvg = (count) => {
      const circles = [];
      for (let i = 1; i <= count; i++) {
        const r = 5 + i * 5;
        const col = i % 2 === 1 ? "#38bdf8" : "#ec4899";
        circles.push(drawCircle(35, 35, r, "none", col, 2));
      }
      return wrapSvg(circles.join('') + drawCircle(35, 35, 3, "#f59e0b", "#f59e0b", 1));
    };

    const frames = [1, 2, 3, 4].map(c => makeRingsSvg(c));
    const correctSvg = makeRingsSvg(5);
    const wrongCounts = [3, 4, 6, 7];
    const rawOpts = [{ svg: correctSvg }, ...wrongCounts.map(c => ({ svg: makeRingsSvg(c) }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure continues the concentric expansion pattern?`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nThe number of concentric rings increases strictly by +1 at every step (1, 2, 3, 4 ➔ **5 concentric rings**).`,
      category: 'spatial'
    };
  },

  // 5: Stroke Construction
  (t, k, rand) => {
    const lines = [
      { x1: 15, y1: 15, x2: 55, y2: 15 },
      { x1: 55, y1: 15, x2: 55, y2: 55 },
      { x1: 55, y1: 55, x2: 15, y2: 55 },
      { x1: 15, y1: 55, x2: 15, y2: 15 },
      { x1: 15, y1: 15, x2: 55, y2: 55 },
      { x1: 55, y1: 15, x2: 15, y2: 55 }
    ];

    const makeConstructedBox = (count) => {
      const drawn = lines.slice(0, count).map(l => drawLine(l.x1, l.y1, l.x2, l.y2, "#38bdf8", 2.5)).join('');
      return wrapSvg(drawn);
    };

    const frames = [1, 2, 3, 4].map(c => makeConstructedBox(c));
    const correctSvg = makeConstructedBox(5);
    const wrongFrames = [
      makeConstructedBox(4),
      makeConstructedBox(6),
      wrapSvg(`${lines.slice(0, 3).map(l => drawLine(l.x1, l.y1, l.x2, l.y2, "#38bdf8", 2.5)).join('')}${drawLine(15, 15, 55, 55, "#f59e0b", 2.5)}`),
      wrapSvg(`${lines.slice(0, 4).map(l => drawLine(l.x1, l.y1, l.x2, l.y2, "#38bdf8", 2.5)).join('')}${drawLine(35, 15, 35, 55, "#ec4899", 2.5)}`)
    ];

    const rawOpts = [{ svg: correctSvg }, ...wrongFrames.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly adds the next stroke to complete the structure?`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nThe figure adds one line segment at each step in order: Top ➔ Right ➔ Bottom ➔ Left ➔ **Main Diagonal (Top-Left to Bottom-Right)**.`,
      category: 'spatial'
    };
  },

  // 6: Matrix Grid Token Walk
  (t, k, rand) => {
    const makeGridWalk = (row, col) => {
      let grid = `<g stroke="#475569" stroke-width="1.2" fill="rgba(30, 41, 59, 0.4)">`;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          grid += `<rect x="${14 + c * 15}" y="${14 + r * 15}" width="14" height="14" rx="2" />`;
        }
      }
      grid += `</g>`;
      const dotX = 14 + col * 15 + 7;
      const dotY = 14 + row * 15 + 7;
      grid += drawCircle(dotX, dotY, 4.5, "#f59e0b", "#d97706", 1.5);
      return wrapSvg(grid);
    };

    const path = [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
      { r: 0, c: 2 },
      { r: 1, c: 2 },
      { r: 2, c: 2 }
    ];

    const frames = path.slice(0, 4).map(p => makeGridWalk(p.r, p.c));
    const correctSvg = makeGridWalk(path[4].r, path[4].c);
    const wrongCells = [
      { r: 1, c: 1 },
      { r: 2, c: 1 },
      { r: 2, c: 0 },
      { r: 1, c: 0 }
    ];
    const rawOpts = [{ svg: correctSvg }, ...wrongCells.map(p => ({ svg: makeGridWalk(p.r, p.c) }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Where does the marker land in the next step of the grid sequence?`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Grid Path:**\nThe token traverses the perimeter of the 3x3 grid clockwise: (0,0) ➔ (0,1) ➔ (0,2) ➔ (1,2) ➔ **(2,2: bottom-right corner)**.`,
      category: 'spatial'
    };
  },

  // 7: Alternating Flip & Polarity Series
  (t, k, rand) => {
    const makeArrowHead = (ang, isSolid) => {
      const tip = rotPt(35, 14, ang);
      const l = rotPt(22, 38, ang);
      const r = rotPt(48, 38, ang);
      const notch = rotPt(35, 30, ang);
      const fill = isSolid ? "#10b981" : "none";
      return wrapSvg(drawPolygon(`${tip.x},${tip.y} ${r.x},${r.y} ${notch.x},${notch.y} ${l.x},${l.y}`, fill, "#10b981", 2.5));
    };

    const frames = [
      makeArrowHead(0, true),
      makeArrowHead(90, false),
      makeArrowHead(180, true),
      makeArrowHead(270, false)
    ];

    const correctSvg = makeArrowHead(0, true);
    const distractors = [
      makeArrowHead(0, false),
      makeArrowHead(90, true),
      makeArrowHead(180, false),
      makeArrowHead(270, true)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly completes both the rotation and shading alternation?`,
      subType: 'series',
      sequenceFrames: frames,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Alternating Rules:**\n1. Pointer rotates 90° clockwise at each step (0° ➔ 90° ➔ 180° ➔ 270° ➔ **360°/0°**).\n2. Fill alternates between **Solid** and **Outline** (Solid ➔ Outline ➔ Solid ➔ Outline ➔ **Solid**).`,
      category: 'spatial'
    };
  }
];

// -------------------------------------------------------------
// POOL 2: SPATIAL MATRICES (8 Types)
// -------------------------------------------------------------
const MATRIX_ARCHETYPES = [
  // 0: 3x3 Latin Square - Shapes (Circle, Square, Triangle)
  (t, k, rand) => {
    // Shapes: 0=Circle, 1=Square, 2=Triangle
    const shapeSet = (t % 2 === 0)
      ? [
          (c) => drawCircle(35, 35, 18, "none", "#38bdf8", 2.5),
          (c) => drawRect(18, 18, 34, 34, "none", "#10b981", 2.5),
          (c) => drawPolygon("35,16 54,48 16,48", "none", "#f59e0b", 2.5)
        ]
      : [
          (c) => drawPolygon("35,14 55,35 35,56 15,35", "none", "#ec4899", 2.5), // Diamond
          (c) => drawPolygon(makePolygonPts(5, 20), "none", "#a855f7", 2.5), // Pentagon
          (c) => drawPolygon(makePolygonPts(6, 20), "none", "#38bdf8", 2.5)  // Hexagon
        ];

    // Latin square grid matrix
    // Row 0: 0, 1, 2
    // Row 1: 1, 2, 0
    // Row 2: 2, 0, [1] -> Answer is shapeSet[1]
    const cells = [
      wrapSvg(shapeSet[0]()), wrapSvg(shapeSet[1]()), wrapSvg(shapeSet[2]()),
      wrapSvg(shapeSet[1]()), wrapSvg(shapeSet[2]()), wrapSvg(shapeSet[0]()),
      wrapSvg(shapeSet[2]()), wrapSvg(shapeSet[0]()), '?'
    ];

    const correctSvg = wrapSvg(shapeSet[1]());
    const distractors = [
      wrapSvg(shapeSet[0]()),
      wrapSvg(shapeSet[2]()),
      wrapSvg(drawCircle(35, 35, 10, "#38bdf8", "#38bdf8", 1)),
      wrapSvg(drawRect(22, 22, 26, 26, "#10b981", "#10b981", 1))
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly completes the 3×3 matrix?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Latin Square Principle:**\nEach row and column must contain exactly one of each distinct geometric shape. Row 3 contains the first and third shapes, requiring the second shape to complete it.`,
      category: 'spatial'
    };
  },

  // 1: 3x3 Latin Square - Compound (Shape + Fill)
  (t, k, rand) => {
    // Shapes: Circle, Square, Diamond
    // Fills: Empty, Solid, Dotted
    const makeCompound = (shapeIdx, fillIdx) => {
      let fillCol = "none";
      let extra = "";
      if (fillIdx === 1) fillCol = "rgba(56, 189, 248, 0.4)"; // Tinted solid
      if (fillIdx === 2) extra = drawCircle(35, 35, 4, "#f59e0b", "#f59e0b", 1); // Center dot

      let shapeSvg = "";
      if (shapeIdx === 0) shapeSvg = drawCircle(35, 35, 18, fillCol, "#38bdf8", 2.2);
      if (shapeIdx === 1) shapeSvg = drawRect(18, 18, 34, 34, fillCol, "#38bdf8", 2.2);
      if (shapeIdx === 2) shapeSvg = drawPolygon("35,14 55,35 35,56 15,35", fillCol, "#38bdf8", 2.2);

      return wrapSvg(shapeSvg + extra);
    };

    // Row 0: (0,0), (1,1), (2,2)
    // Row 1: (1,2), (2,0), (0,1)
    // Row 2: (2,1), (0,2), [ (1,0) ] -> Square with Empty fill!
    const cells = [
      makeCompound(0, 0), makeCompound(1, 1), makeCompound(2, 2),
      makeCompound(1, 2), makeCompound(2, 0), makeCompound(0, 1),
      makeCompound(2, 1), makeCompound(0, 2), '?'
    ];

    const correctSvg = makeCompound(1, 0); // Square + Empty
    const distractors = [
      makeCompound(1, 1), // Square + Solid
      makeCompound(1, 2), // Square + Dotted
      makeCompound(0, 0), // Circle + Empty
      makeCompound(2, 0)  // Diamond + Empty
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly completes both the shape and fill pattern in the matrix?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Compound Matrix Rule:**\n- **Shape Rule:** Each row and column contains Circle, Square, and Diamond (Row 3 is missing the Square).\n- **Fill Rule:** Each row and column contains Empty, Solid, and Dotted (Row 3 has Dotted and Solid, missing Empty).\nTherefore, the missing cell is the **Empty Square**.`,
      category: 'spatial'
    };
  },

  // 2: 3x3 Additive Boolean Union (Lines combine across row)
  (t, k, rand) => {
    // Cell 1 + Cell 2 = Cell 3
    const l1 = drawLine(15, 35, 55, 35, "#38bdf8", 3); // Horizontal
    const l2 = drawLine(35, 15, 35, 55, "#38bdf8", 3); // Vertical
    const l3 = drawLine(15, 15, 55, 55, "#f59e0b", 3); // Diag 1
    const l4 = drawLine(55, 15, 15, 55, "#f59e0b", 3); // Diag 2

    // Row 1: H + V = Cross(+)
    // Row 2: D1 + D2 = X
    // Row 3: H + D1 = Target: H & D1 combined!
    const cells = [
      wrapSvg(l1), wrapSvg(l2), wrapSvg(l1 + l2),
      wrapSvg(l3), wrapSvg(l4), wrapSvg(l3 + l4),
      wrapSvg(l1), wrapSvg(l3), '?'
    ];

    const correctSvg = wrapSvg(l1 + l3);
    const distractors = [
      wrapSvg(l1 + l2),
      wrapSvg(l3 + l4),
      wrapSvg(l1 + l4),
      wrapSvg(l2 + l3)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure completes the additive line matrix?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Additive Union Rule:**\nCell 1 + Cell 2 = Cell 3 across each row. Row 3 combines the Horizontal line (Cell 1) and the Diagonal line (Cell 2).`,
      category: 'spatial'
    };
  },

  // 3: 3x3 XOR / Line Cancellation Matrix (Overlapping lines cancel)
  (t, k, rand) => {
    // Box with 4 quadrants: Top-left, Top-right, Bottom-left, Bottom-right
    // Cell 1 has TL and TR
    // Cell 2 has TR and BR
    // Cell 3 (XOR) has TL and BR (TR cancelled because it appeared in both!)
    const makeXorCell = (tl, tr, bl, br) => {
      let content = `<rect x="15" y="15" width="40" height="40" fill="none" stroke="#334155" stroke-width="1.5" />`;
      if (tl) content += `<rect x="17" y="17" width="17" height="17" fill="#38bdf8" />`;
      if (tr) content += `<rect x="36" y="17" width="17" height="17" fill="#38bdf8" />`;
      if (bl) content += `<rect x="17" y="36" width="17" height="17" fill="#38bdf8" />`;
      if (br) content += `<rect x="36" y="36" width="17" height="17" fill="#38bdf8" />`;
      return wrapSvg(content);
    };

    // Row 1: [TL, TR] XOR [TR, BR] = [TL, BR]
    // Row 2: [BL, BR] XOR [TL, BL] = [BR, TL]
    // Row 3: [TL, BL] XOR [BL, TR] = [TL, TR] (BL cancels out!)
    const cells = [
      makeXorCell(true, true, false, false), makeXorCell(false, true, false, true), makeXorCell(true, false, false, true),
      makeXorCell(false, false, true, true), makeXorCell(true, false, true, false), makeXorCell(true, false, false, true),
      makeXorCell(true, false, true, false), makeXorCell(false, true, true, false), '?'
    ];

    const correctSvg = makeXorCell(true, true, false, false); // TL and TR remain!
    const distractors = [
      makeXorCell(false, false, true, false), // only BL
      makeXorCell(true, true, true, false),  // all three
      makeXorCell(false, true, false, true),
      makeXorCell(false, false, true, true)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly completes the cancellation (XOR) matrix?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**XOR / Overlap Cancellation:**\nBlocks that appear in BOTH Cell 1 and Cell 2 cancel each other out. Blocks that appear in only one cell carry over into Cell 3. In Row 3, the bottom-left block cancels out, leaving the top-left and top-right blocks.`,
      category: 'spatial'
    };
  },

  // 4: 3x3 Dot Count Addition Matrix
  (t, k, rand) => {
    const makeDotBox = (count) => {
      let dots = `<rect x="14" y="14" width="42" height="42" fill="rgba(15,23,42,0.6)" stroke="#475569" stroke-width="1.5" rx="3" />`;
      const positions = [
        { x: 35, y: 35 },
        { x: 24, y: 24 }, { x: 46, y: 46 },
        { x: 24, y: 46 }, { x: 46, y: 24 },
        { x: 24, y: 35 }, { x: 46, y: 35 }
      ];
      for (let i = 0; i < count; i++) {
        const p = positions[i % positions.length];
        dots += drawCircle(p.x, p.y, 3.5, "#f59e0b", "#d97706", 1);
      }
      return wrapSvg(dots);
    };

    // Row 1: 1 + 2 = 3
    // Row 2: 2 + 2 = 4
    // Row 3: 3 + 2 = [5]
    const cells = [
      makeDotBox(1), makeDotBox(2), makeDotBox(3),
      makeDotBox(2), makeDotBox(2), makeDotBox(4),
      makeDotBox(3), makeDotBox(2), '?'
    ];

    const correctSvg = makeDotBox(5);
    const distractors = [makeDotBox(4), makeDotBox(6), makeDotBox(3), makeDotBox(1)];
    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly satisfies the numerical dot logic of the matrix?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Dot Sum Rule:**\nIn each row: Dots in Cell 1 + Dots in Cell 2 = Dots in Cell 3. In Row 3: 3 dots + 2 dots = **5 dots**.`,
      category: 'spatial'
    };
  },

  // 5: 2x2 Geometric Proportion Matrix
  (t, k, rand) => {
    // 2x2: Cell A -> Cell B (90° clockwise rotation)
    // Cell C -> Cell D (?)
    const makeL = (ang, col = "#38bdf8") => {
      const p1 = rotPt(24, 20, ang);
      const p2 = rotPt(24, 50, ang);
      const p3 = rotPt(50, 50, ang);
      return wrapSvg(`
        ${drawLine(p1.x, p1.y, p2.x, p2.y, col, 3.5)}
        ${drawLine(p2.x, p2.y, p3.x, p3.y, col, 3.5)}
        ${drawCircle(p2.x, p2.y, 4.5, col, col, 1)}
      `);
    };

    const makeT = (ang, col = "#f59e0b") => {
      const bar1 = rotPt(20, 25, ang);
      const bar2 = rotPt(50, 25, ang);
      const stem1 = rotPt(35, 25, ang);
      const stem2 = rotPt(35, 52, ang);
      return wrapSvg(`
        ${drawLine(bar1.x, bar1.y, bar2.x, bar2.y, col, 3.5)}
        ${drawLine(stem1.x, stem1.y, stem2.x, stem2.y, col, 3.5)}
        ${drawCircle(stem1.x, stem1.y, 4.5, col, col, 1)}
      `);
    };

    // 3x3 layout holding 2x2 logic:
    // Cell 0: L(0°), Cell 1: L(90°), Cell 2: empty
    // Cell 3: T(0°), Cell 4: T(90°), Cell 5: empty
    // Or we format as standard 3x3 matrix:
    const cells = [
      makeL(0), makeL(90), makeL(180),
      makeT(0), makeT(90), makeT(180),
      makeL(0, "#ec4899"), makeL(90, "#ec4899"), '?'
    ];

    const correctSvg = makeL(180, "#ec4899");
    const distractors = [
      makeL(0, "#ec4899"),
      makeL(270, "#ec4899"),
      makeT(180, "#ec4899"),
      makeT(90, "#ec4899")
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly completes the rotation across Row 3?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Rotational Rule:**\nAcross each row, the figure rotates **90° clockwise** (0° ➔ 90° ➔ **180°**).`,
      category: 'spatial'
    };
  },

  // 6: 3x3 Progressive Row Transformation (Shape rotates + dot shifts)
  (t, k, rand) => {
    const makeRotatingShape = (ang, dotPos) => {
      const pts = makePolygonPts(3, 18, 35, 35, ang);
      const dotCoords = [
        { x: 35, y: 16 }, { x: 50, y: 46 }, { x: 20, y: 46 }
      ];
      const dp = dotCoords[dotPos % 3];
      return wrapSvg(`
        ${drawPolygon(pts, "rgba(56, 189, 248, 0.2)", "#38bdf8", 2)}
        ${drawCircle(dp.x, dp.y, 3.5, "#f59e0b", "#f59e0b", 1)}
      `);
    };

    const cells = [
      makeRotatingShape(0, 0), makeRotatingShape(45, 0), makeRotatingShape(90, 0),
      makeRotatingShape(0, 1), makeRotatingShape(45, 1), makeRotatingShape(90, 1),
      makeRotatingShape(0, 2), makeRotatingShape(45, 2), '?'
    ];

    const correctSvg = makeRotatingShape(90, 2);
    const distractors = [
      makeRotatingShape(90, 0),
      makeRotatingShape(45, 2),
      makeRotatingShape(0, 2),
      makeRotatingShape(135, 2)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure satisfies both the rotation and position rules in the matrix?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Dual Matrix Rule:**\n- **Row Rule:** Shape rotates 45° clockwise across columns (0° ➔ 45° ➔ **90°**).\n- **Column Rule:** Marker dot index is constant across each row (Row 3 uses dot index 2).`,
      category: 'spatial'
    };
  },

  // 7: 3x3 Concentric Layer Shift Matrix (Outer container by row, inner symbol by col)
  (t, k, rand) => {
    // Outer: 0=Circle, 1=Square, 2=Triangle
    // Inner: 0=Cross(+), 1=Dot(●), 2=Diamond(◆)
    const makeConcentric = (outer, inner) => {
      let outerSvg = "";
      if (outer === 0) outerSvg = drawCircle(35, 35, 20, "rgba(30,41,59,0.5)", "#38bdf8", 2);
      if (outer === 1) outerSvg = drawRect(16, 16, 38, 38, "rgba(30,41,59,0.5)", "#38bdf8", 2);
      if (outer === 2) outerSvg = drawPolygon("35,14 55,48 15,48", "rgba(30,41,59,0.5)", "#38bdf8", 2);

      let innerSvg = "";
      if (inner === 0) innerSvg = drawText(35, 35, "+", "#ec4899", 14);
      if (inner === 1) innerSvg = drawCircle(35, 35, 4.5, "#f59e0b", "#f59e0b", 1);
      if (inner === 2) innerSvg = drawPolygon("35,28 42,35 35,42 28,35", "#10b981", "#10b981", 1);

      return wrapSvg(outerSvg + innerSvg);
    };

    // Row 0: Outer 0 (Circle) with Inner 0, 1, 2
    // Row 1: Outer 1 (Square) with Inner 0, 1, 2
    // Row 2: Outer 2 (Triangle) with Inner 0, 1, [Inner 2 (Diamond)]
    const cells = [
      makeConcentric(0, 0), makeConcentric(0, 1), makeConcentric(0, 2),
      makeConcentric(1, 0), makeConcentric(1, 1), makeConcentric(1, 2),
      makeConcentric(2, 0), makeConcentric(2, 1), '?'
    ];

    const correctSvg = makeConcentric(2, 2); // Triangle with Diamond
    const distractors = [
      makeConcentric(2, 0), // Triangle with Cross
      makeConcentric(2, 1), // Triangle with Dot
      makeConcentric(0, 2), // Circle with Diamond
      makeConcentric(1, 2)  // Square with Diamond
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    return {
      question: `Which figure correctly completes the nested matrix?`,
      subType: 'matrix',
      matrixCells: cells,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Grid Synthesis:**\n- **Row Rule:** Outer container is determined by row (Row 3 requires a **Triangle**).\n- **Column Rule:** Inner symbol is determined by column (Column 3 requires a **Diamond**).`,
      category: 'spatial'
    };
  }
];



// -------------------------------------------------------------
// POOL 3: ODD-ONE-OUT ARCHETYPES (8 Types)
// -------------------------------------------------------------
const ODD_ARCHETYPES = [
  // 0: Chiral Outlier - Asymmetric Flag
  (t, k, rand) => {
    const basePts = [
      { x: 25, y: 15 }, { x: 25, y: 55 },
      { x: 25, y: 18 }, { x: 48, y: 28 }, { x: 25, y: 38 },
      { x: 25, y: 55 }, { x: 38, y: 55 }
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
    const outlierSvg = makeFlagSvg((k * 35 + 120) % 360, true);

    const rawOpts = [{ svg: outlierSvg }, ...normalSvgs.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which of the five figures below does NOT belong with the others?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nFour figures are 2D planar rotations of the same asymmetric flag. Figure ${correctOption} is a **mirror reflection (inverted chirality)** and cannot be rotated into alignment.`,
      category: 'spatial'
    };
  },

  // 1: Chiral Outlier - Notched L-Bracket
  (t, k, rand) => {
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
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nFour figures are 2D rotated versions of the same asymmetric bracket. Figure ${correctOption} is a mirror reflection (inverted handedness).`,
      category: 'spatial'
    };
  },

  // 2: Chiral Outlier - Spiral Hook
  (t, k, rand) => {
    const makeHook = (ang, mirrored = false) => {
      const p0 = rotPt(35, 35, ang);
      const p1 = rotPt(mirrored ? 20 : 50, 35, ang);
      const p2 = rotPt(mirrored ? 20 : 50, 15, ang);
      const p3 = rotPt(35, 15, ang);
      const dot = rotPt(mirrored ? 45 : 25, 25, ang);
      return wrapSvg(`
        <path d="M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round" />
        ${drawCircle(dot.x, dot.y, 4, "#f59e0b", "#f59e0b", 1)}
      `);
    };

    const angles = [(k * 45) % 360, (k * 45 + 90) % 360, (k * 45 + 180) % 360, (k * 45 + 270) % 360];
    const normalSvgs = angles.map(a => makeHook(a, false));
    const outlierSvg = makeHook((k * 45 + 135) % 360, true);

    const rawOpts = [{ svg: outlierSvg }, ...normalSvgs.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure cannot be formed by rotating the others in 2D space?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nFour figures can be superimposed onto one another via 2D rotation. Figure ${correctOption} is a chiral reflection.`,
      category: 'spatial'
    };
  },

  // 3: Bilateral Symmetry Invariant (4 Symmetric vs 1 Asymmetric)
  (t, k, rand) => {
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
      explanation: `**Correct Answer: ${correctOption}**\n\n**Pattern:**\nFigures in the other options all possess at least one axis of **bilateral reflectional symmetry**. Option ${correctOption} is completely asymmetric.`,
      category: 'spatial'
    };
  },

  // 4: Vertex / Side Parity Outlier (4 Even-sided vs 1 Odd-sided)
  (t, k, rand) => {
    const pSquare = wrapSvg(drawPolygon(makePolygonPts(4, 20), "rgba(16,185,129,0.2)", "#10b981", 2));
    const pHexagon = wrapSvg(drawPolygon(makePolygonPts(6, 20), "rgba(16,185,129,0.2)", "#10b981", 2));
    const pOctagon = wrapSvg(drawPolygon(makePolygonPts(8, 20), "rgba(16,185,129,0.2)", "#10b981", 2));
    const pDecagon = wrapSvg(drawPolygon(makePolygonPts(10, 20), "rgba(16,185,129,0.2)", "#10b981", 2));
    const pPentagon = wrapSvg(drawPolygon(makePolygonPts(5, 20), "rgba(244,63,94,0.2)", "#f43f5e", 2)); // Outlier (5 vertices)!

    const rawOpts = [{ svg: pPentagon }, { svg: pSquare }, { svg: pHexagon }, { svg: pOctagon }, { svg: pDecagon }];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which polygon is the odd one out based on geometric properties?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Vertex Parity:**\nFour of the polygons have an **even number of vertices/sides** (Square=4, Hexagon=6, Octagon=8, Decagon=10). Figure ${correctOption} is a Pentagon with an **odd number of sides (5)**.`,
      category: 'spatial'
    };
  },

  // 5: Enclosed Regions / Loop Count Outlier (4 have 2 loops, 1 has 3)
  (t, k, rand) => {
    const loop2A = wrapSvg(`${drawCircle(28, 35, 12, "none", "#38bdf8", 2)}${drawCircle(42, 35, 12, "none", "#38bdf8", 2)}`); // Intersecting (2 distinct visible lobes + overlap)
    const loop2B = wrapSvg(`${drawRect(18, 18, 34, 16, "none", "#38bdf8", 2)}${drawRect(18, 36, 34, 16, "none", "#38bdf8", 2)}`); // 2 stacked boxes
    const loop2C = wrapSvg(`${drawCircle(35, 25, 10, "none", "#38bdf8", 2)}${drawCircle(35, 45, 10, "none", "#38bdf8", 2)}`); // figure-8
    const loop2D = wrapSvg(`${drawPolygon("35,16 52,34 18,34", "none", "#38bdf8", 2)}${drawPolygon("35,54 52,36 18,36", "none", "#38bdf8", 2)}`); // 2 triangles
    const loop3Outlier = wrapSvg(`${drawCircle(25, 25, 9, "none", "#f43f5e", 2)}${drawCircle(45, 25, 9, "none", "#f43f5e", 2)}${drawCircle(35, 45, 9, "none", "#f43f5e", 2)}`); // 3 separate circles

    const rawOpts = [{ svg: loop3Outlier }, { svg: loop2A }, { svg: loop2B }, { svg: loop2C }, { svg: loop2D }];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure does NOT belong with the other four?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Topological Enclosure Rule:**\nFour of the figures consist of exactly **2 enclosed interior regions**. Figure ${correctOption} contains **3 enclosed regions**.`,
      category: 'spatial'
    };
  },

  // 6: Feature Position Relative to Geometry (Dot inside concave vs convex)
  (t, k, rand) => {
    const makeArcDot = (ang, isConvex = false) => {
      const arc = `<path d="M 20 50 A 20 20 0 0 1 50 20" fill="none" stroke="#38bdf8" stroke-width="3" />`;
      const dotX = isConvex ? 48 : 26;
      const dotY = isConvex ? 48 : 26;
      const dp = rotPt(dotX, dotY, ang);
      return wrapSvg(`
        <g transform="rotate(${ang} 35 35)">
          ${arc}
        </g>
        ${drawCircle(dp.x, dp.y, 4, "#f59e0b", "#f59e0b", 1)}
      `);
    };

    const angles = [(k * 45) % 360, (k * 45 + 90) % 360, (k * 45 + 180) % 360, (k * 45 + 270) % 360];
    const normalSvgs = angles.map(a => makeArcDot(a, false)); // dot in concave interior
    const outlierSvg = makeArcDot((k * 45 + 120) % 360, true); // dot on convex exterior

    const rawOpts = [{ svg: outlierSvg }, ...normalSvgs.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure has a different relative geometric placement of the dot?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Relative Position:**\nIn four figures, the dot is placed **inside the concave interior** of the curved arc. In Figure ${correctOption}, the dot is placed on the **convex outer side**.`,
      category: 'spatial'
    };
  },

  // 7: Open vs Closed Boundary Outlier
  (t, k, rand) => {
    const closed1 = wrapSvg(drawRect(18, 18, 34, 34, "none", "#10b981", 2.5));
    const closed2 = wrapSvg(drawCircle(35, 35, 18, "none", "#10b981", 2.5));
    const closed3 = wrapSvg(drawPolygon(makePolygonPts(3, 20), "none", "#10b981", 2.5));
    const closed4 = wrapSvg(drawPolygon(makePolygonPts(6, 20), "none", "#10b981", 2.5));
    // Open contour: rectangle missing one corner
    const openContour = wrapSvg(`<path d="M 18 25 L 18 52 L 52 52 L 52 18 L 26 18" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" />`);

    const rawOpts = [{ svg: openContour }, { svg: closed1 }, { svg: closed2 }, { svg: closed3 }, { svg: closed4 }];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which figure is topologically different from the other four?`,
      subType: 'odd_one_out',
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Continuity Rule:**\nFour of the figures are **complete, closed geometric loops**. Figure ${correctOption} is an **open contour** with a gap.`,
      category: 'spatial'
    };
  }
];

// -------------------------------------------------------------
// POOL 4: SPATIAL ANALOGIES (5 Types)
// -------------------------------------------------------------
const ANALOGY_ARCHETYPES = [
  // 0: Outer / Inner Shape Swap
  (t, k, rand) => {
    const figA = wrapSvg(`${drawCircle(35, 35, 22, "rgba(56,189,248,0.2)", "#38bdf8", 2.5)}${drawPolygon("35,24 44,42 26,42", "#f59e0b", "#f59e0b", 1)}`);
    const figB = wrapSvg(`${drawPolygon("35,15 54,48 16,48", "rgba(245,158,11,0.2)", "#f59e0b", 2.5)}${drawCircle(35, 35, 8, "#38bdf8", "#38bdf8", 1)}`);
    const figC = wrapSvg(`${drawRect(15, 15, 40, 40, "rgba(16,185,129,0.2)", "#10b981", 2.5)}${drawPolygon("35,26 43,35 35,44 27,35", "#ec4899", "#ec4899", 1)}`);

    const correctSvg = wrapSvg(`${drawPolygon("35,14 55,35 35,56 15,35", "rgba(236,72,153,0.2)", "#ec4899", 2.5)}${drawRect(27, 27, 16, 16, "#10b981", "#10b981", 1)}`);

    const distractors = [
      wrapSvg(`${drawRect(15, 15, 40, 40, "rgba(16,185,129,0.2)", "#10b981", 2.5)}${drawCircle(35, 35, 8, "#ec4899", "#ec4899", 1)}`),
      wrapSvg(`${drawPolygon("35,14 55,35 35,56 15,35", "rgba(236,72,153,0.2)", "#ec4899", 2.5)}${drawCircle(35, 35, 8, "#10b981", "#10b981", 1)}`),
      figC,
      figB
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Figure A is to Figure B as Figure C is to which choice?`,
      subType: 'analogy',
      contextSvg: { figA, figB, figC },
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Transformation:**\nThe outer and inner shapes **swap roles**: the outer container becomes the small nested shape inside, and the small inner shape expands to become the outer container.`,
      category: 'spatial'
    };
  },

  // 1: 180° Inversion + Color Flip
  (t, k, rand) => {
    const figA = wrapSvg(drawPolygon("35,15 54,48 16,48", "#38bdf8", "#38bdf8", 2));
    const figB = wrapSvg(drawPolygon("35,48 54,15 16,15", "none", "#38bdf8", 2.5));
    const figC = wrapSvg(`<path d="M 20 45 L 35 18 L 50 45 Z" fill="#f59e0b" stroke="#f59e0b" />`);

    const correctSvg = wrapSvg(`<path d="M 20 22 L 35 49 L 50 22 Z" fill="none" stroke="#f59e0b" stroke-width="2.5" />`);
    const distractors = [
      wrapSvg(`<path d="M 20 22 L 35 49 L 50 22 Z" fill="#f59e0b" stroke="#f59e0b" />`), // Inverted but solid
      wrapSvg(`<path d="M 20 45 L 35 18 L 50 45 Z" fill="none" stroke="#f59e0b" stroke-width="2.5" />`), // Not inverted
      figA,
      figB
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Figure A relates to Figure B as Figure C relates to which choice?`,
      subType: 'analogy',
      contextSvg: { figA, figB, figC },
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Rule:**\n1. Invert 180° vertically.\n2. Flip fill from **Solid** to **Outline**.`,
      category: 'spatial'
    };
  },

  // 2: Vertex Doubling (Triangle -> Hexagon :: Square -> Octagon)
  (t, k, rand) => {
    const figA = wrapSvg(drawPolygon(makePolygonPts(3, 20), "none", "#38bdf8", 2.5));
    const figB = wrapSvg(drawPolygon(makePolygonPts(6, 20), "none", "#38bdf8", 2.5));
    const figC = wrapSvg(drawPolygon(makePolygonPts(4, 20), "none", "#f59e0b", 2.5));

    const correctSvg = wrapSvg(drawPolygon(makePolygonPts(8, 20), "none", "#f59e0b", 2.5));
    const distractors = [
      wrapSvg(drawPolygon(makePolygonPts(5, 20), "none", "#f59e0b", 2.5)),
      wrapSvg(drawPolygon(makePolygonPts(6, 20), "none", "#f59e0b", 2.5)),
      wrapSvg(drawPolygon(makePolygonPts(10, 20), "none", "#f59e0b", 2.5)),
      figB
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Figure A relates to Figure B as Figure C relates to:`,
      subType: 'analogy',
      contextSvg: { figA, figB, figC },
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Vertex Doubling:**\nTriangle (3 sides) ➔ Hexagon (6 sides, $3 \times 2$). Square (4 sides) ➔ **Octagon (8 sides, $4 \times 2$)**.`,
      category: 'spatial'
    };
  },

  // 3: Geometric Bisection
  (t, k, rand) => {
    const figA = wrapSvg(drawCircle(35, 35, 22, "rgba(56,189,248,0.3)", "#38bdf8", 2));
    const figB = wrapSvg(`
      <path d="M 32 13 A 22 22 0 0 0 32 57 Z" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" stroke-width="2" />
      <path d="M 38 13 A 22 22 0 0 1 38 57 Z" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" stroke-width="2" />
    `);
    const figC = wrapSvg(drawRect(18, 18, 34, 34, "rgba(245,158,11,0.3)", "#f59e0b", 2));

    const correctSvg = wrapSvg(`
      <rect x="15" y="18" width="16" height="34" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="2" />
      <rect x="39" y="18" width="16" height="34" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="2" />
    `);

    const distractors = [
      wrapSvg(`<rect x="18" y="18" width="34" height="16" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="2" />`),
      figC,
      figB,
      wrapSvg(drawCircle(35, 35, 12, "#f59e0b", "#f59e0b", 1))
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Figure A relates to Figure B as Figure C relates to:`,
      subType: 'analogy',
      contextSvg: { figA, figB, figC },
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Bisection:**\nThe figure is cleanly bisected along its vertical axis of symmetry and split into two separated halves.`,
      category: 'spatial'
    };
  },

  // 4: Feature Extraction (Inner symbol extracted)
  (t, k, rand) => {
    const figA = wrapSvg(`${drawPolygon(makePolygonPts(6, 22), "none", "#38bdf8", 2)}${drawText(35, 35, "+", "#ec4899", 16)}`);
    const figB = wrapSvg(drawText(35, 35, "+", "#ec4899", 18));
    const figC = wrapSvg(`${drawRect(16, 16, 38, 38, "none", "#10b981", 2)}${drawText(35, 35, "★", "#f59e0b", 16)}`);

    const correctSvg = wrapSvg(drawText(35, 35, "★", "#f59e0b", 18));
    const distractors = [
      wrapSvg(drawRect(24, 24, 22, 22, "none", "#10b981", 2)),
      figA,
      figC,
      wrapSvg(drawText(35, 35, "●", "#f59e0b", 18))
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Figure A is to Figure B as Figure C is to:`,
      subType: 'analogy',
      contextSvg: { figA, figB, figC },
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Feature Extraction:**\nThe outer container disappears, leaving only the **internal symbol**.`,
      category: 'spatial'
    };
  }
];

// -------------------------------------------------------------
// POOL 5: 3D CUBE & PAPER FOLDING (5 Types)
// -------------------------------------------------------------
const FOLDING_ARCHETYPES = [
  // 0: Cube Net - Latin Cross Net (Symbols)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      <g stroke="#475569" stroke-width="1.5" fill="none">
        <rect x="50" y="8" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="26" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="50" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="74" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="98" y="32" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
        <rect x="50" y="56" width="24" height="24" rx="2" fill="rgba(30,41,59,0.7)" />
      </g>
      ${drawCircle(62, 20, 6, "none", "#38bdf8", 2)}
      ${drawText(38, 44, "★", "#f59e0b", 12)}
      ${drawText(62, 44, "+", "#ec4899", 14)}
      ${drawRect(82, 38, 10, 10, "none", "#10b981", 1.8)}
      ${drawPolygon("105,50 115,50 110,38", "none", "#a855f7", 1.8)}
      ${drawPolygon("62,60 69,68 62,76 55,68", "none", "#38bdf8", 1.8)}
    `, "0 0 148 88");

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
        <polygon points="35,14 53,24 35,34 17,24" fill="rgba(30,41,59,0.8)" stroke="#64748b" stroke-width="1.5" />
        <polygon points="17,24 35,34 35,56 17,46" fill="rgba(15,23,42,0.9)" stroke="#64748b" stroke-width="1.5" />
        <polygon points="35,34 53,24 53,46 35,56" fill="rgba(15,23,42,0.7)" stroke="#64748b" stroke-width="1.5" />
        ${symSvg(topSym, 35, 24)}
        ${symSvg(leftSym, 26, 42)}
        ${symSvg(rightSym, 44, 42)}
      `);
    };

    const correctSvg = makeCubeSvg('circle', 'star', 'cross');
    const distractors = [
      makeCubeSvg('circle', 'diamond', 'star'),
      makeCubeSvg('star', 'square', 'cross'),
      makeCubeSvg('cross', 'triangle', 'circle'),
      makeCubeSvg('circle', 'diamond', 'cross')
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which of the following 3D cubes CAN be formed by folding the flat net shown below?`,
      figureSvg: netSvg,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Opposite Faces Rule:**\nIn the flat net, faces separated by one square are **opposite faces** and can NEVER be adjacent on a folded 3D cube (Circle/Diamond, Star/Square, Cross/Triangle are opposite). Option ${correctOption} correctly shows three mutually adjacent faces.`,
      category: 'spatial'
    };
  },

  // 1: Cube Net - T-Shape Net (Letters A-F)
  (t, k, rand) => {
    // T-Shape Net:
    // Top Row: A, B, C
    // Vertical Stem: D, E, F
    // Opposites: A & C, B & E, D & F
    const netSvg = wrapSvg(`
      <g stroke="#475569" stroke-width="1.5" fill="rgba(30,41,59,0.7)">
        <rect x="26" y="8" width="24" height="24" rx="2" />
        <rect x="50" y="8" width="24" height="24" rx="2" />
        <rect x="74" y="8" width="24" height="24" rx="2" />
        <rect x="50" y="32" width="24" height="24" rx="2" />
        <rect x="50" y="56" width="24" height="24" rx="2" />
        <rect x="50" y="80" width="24" height="24" rx="2" />
      </g>
      ${drawText(38, 20, "A", "#38bdf8", 14)}
      ${drawText(62, 20, "B", "#10b981", 14)}
      ${drawText(86, 20, "C", "#ec4899", 14)}
      ${drawText(62, 44, "D", "#f59e0b", 14)}
      ${drawText(62, 68, "E", "#a855f7", 14)}
      ${drawText(62, 92, "F", "#38bdf8", 14)}
    `, "0 0 120 110");

    const makeLetterCube = (topL, leftL, rightL) => {
      return wrapSvg(`
        <polygon points="35,14 53,24 35,34 17,24" fill="rgba(30,41,59,0.8)" stroke="#64748b" stroke-width="1.5" />
        <polygon points="17,24 35,34 35,56 17,46" fill="rgba(15,23,42,0.9)" stroke="#64748b" stroke-width="1.5" />
        <polygon points="35,34 53,24 53,46 35,56" fill="rgba(15,23,42,0.7)" stroke="#64748b" stroke-width="1.5" />
        ${drawText(35, 24, topL, "#ffffff", 11)}
        ${drawText(26, 42, leftL, "#ffffff", 11)}
        ${drawText(44, 42, rightL, "#ffffff", 11)}
      `);
    };

    // Valid cube: A, B, D (all adjacent)
    const correctSvg = makeLetterCube('B', 'A', 'D');
    // Distractors: A & C together, B & E together, D & F together
    const distractors = [
      makeLetterCube('B', 'A', 'C'), // A & C are opposite!
      makeLetterCube('B', 'E', 'D'), // B & E are opposite!
      makeLetterCube('D', 'F', 'A'), // D & F are opposite!
      makeLetterCube('E', 'B', 'C')  // E & B are opposite!
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which 3D cube CAN be created by folding this lettered net?`,
      figureSvg: netSvg,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Opposite Face Analysis:**\n- A and C are opposite.\n- B and E are opposite.\n- D and F are opposite.\nOption ${correctOption} is the only cube that does not place opposite faces adjacent to each other.`,
      category: 'spatial'
    };
  },

  // 2: Cube Net - Step / Z-Net (Numbered 1-6)
  (t, k, rand) => {
    // Step net:
    // Row 1: [1, 2]
    // Row 2:    [3, 4]
    // Row 3:       [5, 6]
    // Opposites: 1 & 4, 3 & 6, 2 & 5
    const netSvg = wrapSvg(`
      <g stroke="#475569" stroke-width="1.5" fill="rgba(30,41,59,0.7)">
        <rect x="20" y="10" width="24" height="24" rx="2" />
        <rect x="44" y="10" width="24" height="24" rx="2" />
        <rect x="44" y="34" width="24" height="24" rx="2" />
        <rect x="68" y="34" width="24" height="24" rx="2" />
        <rect x="68" y="58" width="24" height="24" rx="2" />
        <rect x="92" y="58" width="24" height="24" rx="2" />
      </g>
      ${drawText(32, 22, "1", "#38bdf8", 14)}
      ${drawText(56, 22, "2", "#10b981", 14)}
      ${drawText(56, 46, "3", "#ec4899", 14)}
      ${drawText(80, 46, "4", "#f59e0b", 14)}
      ${drawText(80, 70, "5", "#a855f7", 14)}
      ${drawText(104, 70, "6", "#38bdf8", 14)}
    `, "0 0 130 90");

    const makeNumCube = (topN, leftN, rightN) => {
      return wrapSvg(`
        <polygon points="35,14 53,24 35,34 17,24" fill="rgba(30,41,59,0.8)" stroke="#64748b" stroke-width="1.5" />
        <polygon points="17,24 35,34 35,56 17,46" fill="rgba(15,23,42,0.9)" stroke="#64748b" stroke-width="1.5" />
        <polygon points="35,34 53,24 53,46 35,56" fill="rgba(15,23,42,0.7)" stroke="#64748b" stroke-width="1.5" />
        ${drawText(35, 24, topN, "#ffffff", 11)}
        ${drawText(26, 42, leftN, "#ffffff", 11)}
        ${drawText(44, 42, rightN, "#ffffff", 11)}
      `);
    };

    // Valid: 1, 2, 3
    const correctSvg = makeNumCube("2", "1", "3");
    // Distractors: 1&4 opposite, 2&5 opposite, 3&6 opposite
    const distractors = [
      makeNumCube("1", "4", "2"),
      makeNumCube("2", "5", "3"),
      makeNumCube("3", "6", "1"),
      makeNumCube("2", "5", "4")
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `Which 3D cube CAN be folded from the stepped net?`,
      figureSvg: netSvg,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Opposite Rule:**\nIn this stepped net: 1 & 4 are opposite, 2 & 5 are opposite, and 3 & 6 are opposite. Only Option ${correctOption} contains mutually adjacent faces.`,
      category: 'spatial'
    };
  },

  // 3: Paper Folding - Corner Hole Punch (Dual Fold)
  (t, k, rand) => {
    const foldDiagram = wrapSvg(`
      <g stroke="#64748b" stroke-width="1.5" fill="none">
        <rect x="10" y="10" width="36" height="36" fill="rgba(30,41,59,0.6)" />
        <line x1="28" y1="10" x2="28" y2="46" stroke="#f59e0b" stroke-dasharray="3,2" />
        ${drawText(28, 54, "Fold ➔", "#94a3b8", 8)}

        <rect x="65" y="10" width="18" height="36" fill="rgba(30,41,59,0.7)" />
        <line x1="65" y1="28" x2="83" y2="28" stroke="#f59e0b" stroke-dasharray="3,2" />
        ${drawText(74, 54, "Fold ⬆", "#94a3b8", 8)}

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

    const correctSvg = makeUnfoldedSvg([{x: 52, y: 18}, {x: 18, y: 18}, {x: 52, y: 52}, {x: 18, y: 52}]);
    const distractors = [
      makeUnfoldedSvg([{x: 35, y: 18}, {x: 35, y: 52}]),
      makeUnfoldedSvg([{x: 52, y: 18}, {x: 52, y: 52}]),
      makeUnfoldedSvg([{x: 35, y: 35}]),
      makeUnfoldedSvg([{x: 18, y: 18}, {x: 52, y: 52}])
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `A square sheet of paper is folded twice and punched as shown. What does the sheet look like when completely unfolded?`,
      figureSvg: foldDiagram,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Unfolding Symmetry Rule:**\n1. Unfolding downward reflects the punched hole across the horizontal fold into the bottom-right corner.\n2. Unfolding leftward reflects both right-hand holes across the vertical centerline into both left-hand corners.\nThis creates **4 symmetrical corner holes**.`,
      category: 'spatial'
    };
  },

  // 4: Paper Folding - Diagonal Triangular Fold
  (t, k, rand) => {
    const foldDiagram = wrapSvg(`
      <g stroke="#64748b" stroke-width="1.5" fill="none">
        <rect x="10" y="10" width="36" height="36" fill="rgba(30,41,59,0.6)" />
        <line x1="10" y1="10" x2="46" y2="46" stroke="#f59e0b" stroke-dasharray="3,2" />
        ${drawText(28, 54, "Fold ⬊", "#94a3b8", 8)}

        <polygon points="65,10 101,10 101,46" fill="rgba(14,165,233,0.2)" stroke="#38bdf8" />
        <circle cx="83" cy="28" r="3" fill="#f43f5e" stroke="#f43f5e" />
        ${drawText(83, 54, "Punch ●", "#f43f5e", 8)}
      </g>
    `, "0 0 120 64");

    const makeDiagUnfolded = (holes) => {
      return wrapSvg(`
        <rect x="12" y="12" width="46" height="46" fill="rgba(30,41,59,0.6)" stroke="#475569" stroke-width="1.5" />
        <line x1="12" y1="12" x2="58" y2="58" stroke="#334155" stroke-dasharray="2,2" />
        ${holes.map(h => drawCircle(h.x, h.y, 3.5, "#f43f5e", "#f43f5e", 1)).join('')}
      `);
    };

    // Correct: 2 holes reflected symmetrically across main diagonal
    const correctSvg = makeDiagUnfolded([{x: 28, y: 42}, {x: 42, y: 28}]);
    const distractors = [
      makeDiagUnfolded([{x: 28, y: 42}]), // only 1 hole
      makeDiagUnfolded([{x: 20, y: 20}, {x: 50, y: 50}]), // on the fold line
      makeDiagUnfolded([{x: 18, y: 18}, {x: 52, y: 18}, {x: 18, y: 52}, {x: 52, y: 52}]), // 4 corners
      makeDiagUnfolded([{x: 35, y: 20}, {x: 35, y: 50}])
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    return {
      question: `The paper is folded diagonally and punched. What does it look like unfolded?`,
      figureSvg: foldDiagram,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Diagonal Reflection:**\nUnfolding across the diagonal reflects the hole to the opposite side of the diagonal axis, producing **2 symmetrically mirrored holes**.`,
      category: 'spatial'
    };
  }
];

// Export sub-pools
export { SERIES_ARCHETYPES, MATRIX_ARCHETYPES, ODD_ARCHETYPES, ANALOGY_ARCHETYPES, FOLDING_ARCHETYPES };

// Combined archetypes list for backwards compatibility
export const SPATIAL_ARCHETYPES = [
  ...SERIES_ARCHETYPES,
  ...MATRIX_ARCHETYPES,
  ...ODD_ARCHETYPES,
  ...ANALOGY_ARCHETYPES,
  ...FOLDING_ARCHETYPES
];

/**
 * Returns 11 completely unique, authentically balanced spatial questions for a given test (2 to 30).
 * Draws systematically across all 5 CCAT spatial categories.
 */
export function getSpatialQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 9411 + 5081);
  const k = testNumber - 2;

  // 1. Select 3 distinct Series questions (8 archetypes available)
  const seriesIdxs = [
    (k * 3) % SERIES_ARCHETYPES.length,
    (k * 3 + 1) % SERIES_ARCHETYPES.length,
    (k * 3 + 2) % SERIES_ARCHETYPES.length
  ];

  // 2. Select 2 distinct Matrix questions (8 archetypes available)
  const matrixIdxs = [
    (k * 2) % MATRIX_ARCHETYPES.length,
    (k * 2 + 1) % MATRIX_ARCHETYPES.length
  ];

  // 3. Select 3 distinct Odd-One-Out questions (8 archetypes available)
  const oddIdxs = [
    (k * 3) % ODD_ARCHETYPES.length,
    (k * 3 + 1) % ODD_ARCHETYPES.length,
    (k * 3 + 2) % ODD_ARCHETYPES.length
  ];

  // 4. Select 2 distinct Spatial Analogy questions (5 archetypes available)
  const analogyIdxs = [
    (k * 2) % ANALOGY_ARCHETYPES.length,
    (k * 2 + 1) % ANALOGY_ARCHETYPES.length
  ];

  // 5. Select 1 3D Cube / Paper Folding question (5 archetypes available)
  const foldIdx = k % FOLDING_ARCHETYPES.length;

  const questions = [
    SERIES_ARCHETYPES[seriesIdxs[0]](testNumber, k, rand),
    SERIES_ARCHETYPES[seriesIdxs[1]](testNumber, k + 1, rand),
    SERIES_ARCHETYPES[seriesIdxs[2]](testNumber, k + 2, rand),

    MATRIX_ARCHETYPES[matrixIdxs[0]](testNumber, k, rand),
    MATRIX_ARCHETYPES[matrixIdxs[1]](testNumber, k + 1, rand),

    ODD_ARCHETYPES[oddIdxs[0]](testNumber, k, rand),
    ODD_ARCHETYPES[oddIdxs[1]](testNumber, k + 1, rand),
    ODD_ARCHETYPES[oddIdxs[2]](testNumber, k + 2, rand),

    ANALOGY_ARCHETYPES[analogyIdxs[0]](testNumber, k, rand),
    ANALOGY_ARCHETYPES[analogyIdxs[1]](testNumber, k + 1, rand),

    FOLDING_ARCHETYPES[foldIdx](testNumber, k, rand)
  ];

  // Deterministically shuffle question order within the test
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}
