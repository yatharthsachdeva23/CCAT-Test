/**
 * Curated Bank of 68 100% NOVEL CCAT Spatial Reasoning Archetypes
 * ZERO overlap with the original questions in questionPool.js:
 * - NO asymmetric flags
 * - NO notched L-brackets
 * - NO spiral hooks
 * - NO basic rotating arrow dials
 * - NO standard Latin cross cube nets
 * - NO quadrant pie wheels
 *
 * Deeply diversified across 68 distinct spatial mechanics:
 * - 18 Series: Pendulum swings, billiard bounces, 7-segment digital displays,
 *   domino pips, interlocking gear trains, vertex double-growth, hourglass sand drainage,
 *   radial ray progress, isometric cube segment stacking, 8-point compass star skips,
 *   binary bar counter, wave amplitude/frequency modulation, balance beam tilt,
 *   expanding chevrons, radial shaded sector leaps, orbital dual satellites,
 *   vertex truncation progression, and alternating target rings.
 * - 12 Matrices: Line-crossing intersections, component subtraction/erasure,
 *   corner dot quadrant balance, outer/inner shape morphing, boolean XOR overlap,
 *   diagonal reflection/inversion, vector direction addition, tier density stacking,
 *   3x3 tic-tac-toe line progression, concentric shape scaling, corner perimeter walk,
 *   and cross-ring intersections.
 * - 18 Odd-One-Out: Eulerian path stroke count, convexity vs concavity, center of gravity balance,
 *   parallel edge pairs, rotational symmetry order, closed loops count (genus), tangency type,
 *   spiral handedness, segment count parity, right-angle existence, shaded area percentage,
 *   interlocking rings connectivity, arrow cyclic loop, perimeter vertex count,
 *   reflection axes count, interior punctured holes count, corner tick orientation,
 *   and 3D isometric validity.
 * - 10 Analogies: 2D-to-3D extrusion, diagonal reflection with fill swap, nested inversion,
 *   overlapping core subtraction, rotation + vertex doubling, bisection & separation,
 *   radial reversal (inward vs outward), concentric shell multiplication, 45-degree shear,
 *   and boundary solid toggle with inverted core dot.
 * - 10 Folding & 3D Nets: Square pyramid net, triangular prism net, T-shaped cube net with icons,
 *   tetrahedron net, cylinder/canister net, cross-shaped cube net with corner dot alignments,
 *   pentagonal pyramid net, truncated tray net, hexagonal prism net, and Z-shaped stair cube net.
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
// POOL 1: NOVEL SPATIAL SERIES (18 Types)
// -------------------------------------------------------------
export const SERIES_ARCHETYPES = [
  // 0: Triangular Pendulum Swing Series (Angle -30° -> -15° -> 0° -> +15° -> +30°)
  (t, k, rand) => {
    const angles = [-30, -15, 0, 15, 30];
    const shapes = ['diamond', 'circle', 'square', 'triangle', 'star'];
    const makePendulum = (ang, shp) => {
      const rad = (ang * Math.PI) / 180;
      const bob = { x: (35 + 45 * Math.sin(rad)).toFixed(1), y: (10 + 45 * Math.cos(rad)).toFixed(1) };
      let bobSvg = '';
      if (shp === 'diamond') bobSvg = drawPolygon(`${bob.x},${bob.y-6} ${parseFloat(bob.x)+6},${bob.y} ${bob.x},${parseFloat(bob.y)+6} ${parseFloat(bob.x)-6},${bob.y}`, "#f59e0b", "#f59e0b", 1);
      if (shp === 'circle') bobSvg = drawCircle(bob.x, bob.y, 6, "#38bdf8", "#38bdf8", 1);
      if (shp === 'square') bobSvg = drawRect(bob.x - 5, bob.y - 5, 10, 10, "#38bdf8", "#38bdf8", 1);
      if (shp === 'triangle') bobSvg = drawPolygon(`${bob.x},${bob.y-6} ${parseFloat(bob.x)+6},${parseFloat(bob.y)+5} ${parseFloat(bob.x)-6},${parseFloat(bob.y)+5}`, "#ec4899", "#ec4899", 1);
      if (shp === 'star') bobSvg = drawText(bob.x, bob.y, "★", "#a855f7", 14);
      return wrapSvg(`
        ${drawCircle(35, 10, 3, "#94a3b8", "#94a3b8")}
        ${drawLine(35, 10, bob.x, bob.y, "#94a3b8", 2)}
        ${bobSvg}
      `);
    };
    const seqSvgs = [0, 1, 2, 3].map(i => makePendulum(angles[i], shapes[i]));
    const correctSvg = makePendulum(angles[4], shapes[4]);
    const distractors = [
      makePendulum(angles[2], shapes[4]), // wrong angle (0°)
      makePendulum(-30, shapes[4]),       // wrong angle (-30°)
      makePendulum(angles[4], shapes[1]), // wrong shape (circle)
      makePendulum(angles[3], shapes[0])  // wrong angle (+15°) & shape
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Examine the continuous mechanical progression. Which figure logically completes the sequence?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. **Swing Angle:** Swings from left to right in steady +15° increments (-30°, -15°, 0°, +15°, +30°).\n2. **Bob Shape:** Cycles diamond → circle → square → triangle → star.\n3. Figure 5 must be swung +30° right with a purple star.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 1: Billiard Wall-Bounce Particle Traversal
  (t, k, rand) => {
    const pts = [
      { x: 10, y: 55 }, { x: 35, y: 15 }, { x: 60, y: 55 }, { x: 35, y: 35 }, { x: 10, y: 15 }
    ];
    const makeBilliard = (step) => {
      let trails = '';
      for (let i = 0; i < step; i++) {
        trails += drawLine(pts[i].x, pts[i].y, pts[i+1].x, pts[i+1].y, "#38bdf8", 2);
      }
      const cur = pts[step];
      return wrapSvg(`
        ${drawRect(8, 8, 54, 54, "none", "#475569", 2, 4)}
        ${trails}
        ${drawCircle(cur.x, cur.y, 5, "#f59e0b", "#f59e0b")}
      `);
    };
    const seqSvgs = [0, 1, 2, 3].map(i => makeBilliard(i));
    const correctSvg = makeBilliard(4);
    const distractors = [
      makeBilliard(2),
      wrapSvg(`${drawRect(8, 8, 54, 54, "none", "#475569", 2, 4)}${drawLine(10,55,35,15,"#38bdf8",2)}${drawCircle(60, 15, 5, "#f59e0b", "#f59e0b")}`),
      wrapSvg(`${drawRect(8, 8, 54, 54, "none", "#475569", 2, 4)}${drawCircle(35, 35, 5, "#f59e0b", "#f59e0b")}`),
      makeBilliard(1)
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Track the particle trajectory reflecting off the boundary walls. Which figure represents the 5th step?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The particle reflects off top wall at (35, 15), bottom wall at (60, 55), rebounds through center (35, 35), and hits top-left corner at (10, 15).\n2. Step 5 completes the rebound segment terminating at (10, 15).`,
      category: 'spatial', subType: 'series'
    };
  },

  // 2: 7-Segment Digital Display Segment Assembly
  (t, k, rand) => {
    const segs = [
      [20, 15, 50, 15], [50, 15, 50, 35], [50, 35, 50, 55],
      [20, 55, 50, 55], [20, 35, 20, 55], [20, 15, 20, 35], [20, 35, 50, 35]
    ];
    const makeDisplay = (count) => {
      let lines = '';
      for (let i = 0; i < count; i++) {
        lines += drawLine(segs[i][0], segs[i][1], segs[i][2], segs[i][3], "#38bdf8", 3);
      }
      return wrapSvg(`
        ${drawRect(12, 8, 46, 54, "#0f172a", "#334155", 1, 4)}
        ${lines}
      `);
    };
    const seqSvgs = [1, 2, 3, 4].map(c => makeDisplay(c));
    const correctSvg = makeDisplay(5);
    const distractors = [makeDisplay(3), makeDisplay(6), makeDisplay(2), makeDisplay(4)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Observe the perimeter assembly sequence of digital display bars. What is the 5th figure?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Display segments are activated one at a time in clockwise perimeter sequence: Top → Right-Top → Right-Bottom → Bottom → Left-Bottom.\n2. Exactly 5 connected segments are active in the 5th step.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 3: Domino Pip Arithmetic Progression (Sum increases by 2)
  (t, k, rand) => {
    const dominoes = [
      { top: 1, bot: 1, sum: 2 },
      { top: 1, bot: 3, sum: 4 },
      { top: 3, bot: 3, sum: 6 },
      { top: 3, bot: 5, sum: 8 },
      { top: 5, bot: 5, sum: 10 }
    ];
    const drawPips = (n, cx, cy) => {
      if (n === 1) return drawCircle(cx, cy, 2.5, "#ffffff", "#ffffff");
      if (n === 3) return drawCircle(cx-6, cy-6, 2.5, "#ffffff", "#ffffff") + drawCircle(cx, cy, 2.5, "#ffffff", "#ffffff") + drawCircle(cx+6, cy+6, 2.5, "#ffffff", "#ffffff");
      if (n === 5) return drawCircle(cx-6, cy-6, 2.5, "#ffffff", "#ffffff") + drawCircle(cx+6, cy-6, 2.5, "#ffffff", "#ffffff") + drawCircle(cx, cy, 2.5, "#ffffff", "#ffffff") + drawCircle(cx-6, cy+6, 2.5, "#ffffff", "#ffffff") + drawCircle(cx+6, cy+6, 2.5, "#ffffff", "#ffffff");
      return '';
    };
    const makeDomino = (d) => {
      return wrapSvg(`
        ${drawRect(18, 10, 34, 50, "#1e293b", "#cbd5e1", 2, 4)}
        ${drawLine(18, 35, 52, 35, "#94a3b8", 1.5)}
        ${drawPips(d.top, 35, 22)}
        ${drawPips(d.bot, 35, 48)}
      `);
    };
    const seqSvgs = [0, 1, 2, 3].map(i => makeDomino(dominoes[i]));
    const correctSvg = makeDomino(dominoes[4]);
    const distractors = [
      makeDomino({ top: 3, bot: 5, sum: 8 }),
      makeDomino({ top: 5, bot: 3, sum: 8 }),
      makeDomino({ top: 3, bot: 3, sum: 6 }),
      makeDomino({ top: 1, bot: 5, sum: 6 })
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which domino tile correctly extends the arithmetic pip series?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Total pip counts: 2 → 4 → 6 → 8 → 10 (advances by +2 each step).\n2. Upper and lower compartments alternate adding 2 pips.\n3. Figure 5 has 5 on top and 5 on bottom (sum = 10).`,
      category: 'spatial', subType: 'series'
    };
  },

  // 4: Dual Interlocking Gear Train Rotation
  (t, k, rand) => {
    const makeGears = (degA) => {
      const degB = -degA * 2; // Gear B has half diameter, rotates twice as fast opposite
      const ptA = rotPt(24, 20, degA, 24, 35);
      const ptB = rotPt(48, 25, degB, 48, 35);
      return wrapSvg(`
        ${drawCircle(24, 35, 15, "none", "#38bdf8", 2)}
        ${drawLine(24, 35, ptA.x, ptA.y, "#38bdf8", 3)}
        ${drawCircle(48, 35, 9, "none", "#f59e0b", 2)}
        ${drawLine(48, 35, ptB.x, ptB.y, "#f59e0b", 3)}
      `);
    };
    const seqSvgs = [0, 45, 90, 135].map(deg => makeGears(deg));
    const correctSvg = makeGears(180);
    const distractors = [makeGears(135), makeGears(90), makeGears(225), makeGears(0)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Gear A (left, blue) drives smaller Gear B (right, amber). Which figure shows the system at step 5?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Left gear rotates clockwise in +45° steps (0° → 45° → 90° → 135° → 180°).\n2. Right gear rotates counter-clockwise at double rate (-90° each step: 0° → -90° → -180° → -270° → -360°/0°).\n3. At step 5, Gear A indicator points down (180°) and Gear B indicator points up (0°).`,
      category: 'spatial', subType: 'series'
    };
  },

  // 5: Nested Polygons Vertex Double-Growth
  (t, k, rand) => {
    const makeNested = (outerN, innerN) => {
      const outerPts = makePolygonPts(outerN, 26, 35, 35);
      const innerPts = makePolygonPts(innerN, 14, 35, 35);
      return wrapSvg(`
        ${drawPolygon(outerPts, "none", "#38bdf8", 2)}
        ${drawPolygon(innerPts, "#a855f7", "#a855f7", 1)}
      `);
    };
    const seqSvgs = [
      makeNested(4, 3), // square with triangle
      makeNested(5, 4), // pentagon with square
      makeNested(6, 5), // hexagon with pentagon
      makeNested(7, 6)  // heptagon with hexagon
    ];
    const correctSvg = makeNested(8, 7); // octagon with heptagon
    const distractors = [
      makeNested(7, 5),
      makeNested(6, 6),
      makeNested(8, 6),
      makeNested(9, 7)
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which concentric geometric figure logically continues the vertex expansion series?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Outer polygon vertex count increases by +1: 4 → 5 → 6 → 7 → 8 (Octagon).\n2. Inner polygon vertex count increases by +1: 3 → 4 → 5 → 6 → 7 (Heptagon).\n3. Figure 5 is an 8-sided octagon enclosing a 7-sided purple heptagon.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 6: Hourglass Sand Draining / Liquid Volume Levels
  (t, k, rand) => {
    const makeVessel = (fillTop, fillBot) => {
      return wrapSvg(`
        ${drawLine(15, 12, 55, 12, "#cbd5e1", 2)}
        ${drawLine(15, 58, 55, 58, "#cbd5e1", 2)}
        ${drawLine(15, 12, 35, 35, "#cbd5e1", 2)}
        ${drawLine(55, 12, 35, 35, "#cbd5e1", 2)}
        ${drawLine(35, 35, 15, 58, "#cbd5e1", 2)}
        ${drawLine(35, 35, 55, 58, "#cbd5e1", 2)}
        ${drawPolygon(`${35 - fillTop*0.7},${35 - fillTop} ${35 + fillTop*0.7},${35 - fillTop} 35,35`, "#38bdf8", "none")}
        ${drawPolygon(`${35 - fillBot*0.7},${58 - fillBot} ${35 + fillBot*0.7},${58 - fillBot} 55,58 15,58`, "#38bdf8", "none")}
      `);
    };
    const seqSvgs = [
      makeVessel(20, 0),
      makeVessel(15, 5),
      makeVessel(10, 10),
      makeVessel(5, 15)
    ];
    const correctSvg = makeVessel(0, 20);
    const distractors = [makeVessel(10, 10), makeVessel(5, 10), makeVessel(15, 5), makeVessel(0, 15)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure shows the culmination of the gravity sand discharge sequence?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Sand continuously transfers from upper reservoir to lower reservoir in uniform steps.\n2. By step 5, the upper chamber is completely empty (0) and the lower chamber is fully filled (20).`,
      category: 'spatial', subType: 'series'
    };
  },

  // 7: Concentric Ring Hatching / Radial Sunburst Ray Progression
  (t, k, rand) => {
    const makeSunburst = (nRay) => {
      let rays = '';
      for (let i = 0; i < nRay; i++) {
        const ang = (i * 360) / 12;
        const p1 = rotPt(35, 23, ang);
        const p2 = rotPt(35, 10, ang);
        rays += drawLine(p1.x, p1.y, p2.x, p2.y, "#f59e0b", 2.5);
      }
      return wrapSvg(`
        ${drawCircle(35, 35, 10, "#0f172a", "#38bdf8", 2)}
        ${rays}
      `);
    };
    const seqSvgs = [3, 5, 7, 9].map(n => makeSunburst(n));
    const correctSvg = makeSunburst(11);
    const distractors = [makeSunburst(8), makeSunburst(10), makeSunburst(12), makeSunburst(7)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure represents the 5th element in the radial beam distribution?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The number of radial rays increases strictly by +2 at each interval: 3 → 5 → 7 → 9 → 11 rays.\n2. Figure 5 features exactly 11 illuminated amber rays.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 8: Line Segment Stacking along Isometric Cube Edges
  (t, k, rand) => {
    const edges = [
      [35, 15, 15, 26], [35, 15, 55, 26], [35, 15, 35, 38],
      [15, 26, 15, 48], [55, 26, 55, 48], [35, 38, 15, 48]
    ];
    const makeIsoCube = (count) => {
      let lines = '';
      for (let i = 0; i < count; i++) {
        lines += drawLine(edges[i][0], edges[i][1], edges[i][2], edges[i][3], "#38bdf8", 3);
      }
      return wrapSvg(`
        ${drawCircle(35, 35, 28, "none", "#334155", 1)}
        ${lines}
      `);
    };
    const seqSvgs = [1, 2, 3, 4].map(c => makeIsoCube(c));
    const correctSvg = makeIsoCube(5);
    const distractors = [makeIsoCube(3), makeIsoCube(6), makeIsoCube(4), makeIsoCube(2)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure represents the 5th step in the isometric wireframe assembly?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Isometric cube edges are drawn sequentially one edge per frame: 1 → 2 → 3 → 4 → 5 edges.\n2. Figure 5 contains exactly 5 bold cyan edges.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 9: Compass 8-Point Star Tip Illumination (Clockwise skipping 1 point)
  (t, k, rand) => {
    // 8 points at 0, 45, 90, 135, 180, 225, 270, 315 deg.
    // Advances by +90 deg (skipping 1 point) each step: 0 -> 90 -> 180 -> 270 -> 360 (0).
    const makeCompass = (activeAng) => {
      let pts = '';
      for (let i = 0; i < 8; i++) {
        const ang = i * 45;
        const pt = rotPt(35, 12, ang);
        const isActive = ang === activeAng;
        pts += drawCircle(pt.x, pt.y, isActive ? 5 : 2.5, isActive ? "#ec4899" : "#475569", isActive ? "#ec4899" : "#475569");
      }
      return wrapSvg(`
        ${drawCircle(35, 35, 23, "none", "#334155", 1.5)}
        ${pts}
      `);
    };
    const seqSvgs = [0, 90, 180, 270].map(ang => makeCompass(ang));
    const correctSvg = makeCompass(0);
    const distractors = [makeCompass(45), makeCompass(135), makeCompass(225), makeCompass(315)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Track the active pink marker on the 8-point compass. Which figure comes next?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The illuminated pink node jumps 90° clockwise in each step: North (0°) → East (90°) → South (180°) → West (270°).\n2. The 5th step completes the full cycle and returns to North (0°).`,
      category: 'spatial', subType: 'series'
    };
  },

  // 10: Binary Counter Matrix (3 Vertical Bars: 1 to 5)
  (t, k, rand) => {
    // Binary: 1 (001), 2 (010), 3 (011), 4 (100), 5 (101)
    const makeBinary = (val) => {
      const b4 = (val & 4) ? "#38bdf8" : "#1e293b";
      const b2 = (val & 2) ? "#38bdf8" : "#1e293b";
      const b1 = (val & 1) ? "#38bdf8" : "#1e293b";
      return wrapSvg(`
        ${drawRect(16, 15, 10, 40, b4, "#475569", 1.5, 2)}
        ${drawRect(30, 15, 10, 40, b2, "#475569", 1.5, 2)}
        ${drawRect(44, 15, 10, 40, b1, "#475569", 1.5, 2)}
      `);
    };
    const seqSvgs = [1, 2, 3, 4].map(v => makeBinary(v));
    const correctSvg = makeBinary(5); // 101: left and right illuminated, middle dark
    const distractors = [makeBinary(6), makeBinary(7), makeBinary(3), makeBinary(2)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Determine the state transition logic of the 3 status indicators. Which is the 5th figure?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The bars represent a 3-bit binary counter (4-2-1): 001 (1) → 010 (2) → 011 (3) → 100 (4).\n2. Step 5 is binary 5 (101), where the first and third bars are active cyan.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 11: Wave Amplitude & Frequency Modulation (Crest count 1 to 5)
  (t, k, rand) => {
    const makeWave = (nCrests) => {
      let path = 'M 10 35 ';
      const stepW = 50 / (nCrests * 2);
      for (let i = 0; i < nCrests; i++) {
        const x1 = 10 + (2 * i + 0.5) * stepW;
        const x2 = 10 + (2 * i + 1) * stepW;
        const x3 = 10 + (2 * i + 1.5) * stepW;
        const x4 = 10 + (2 * i + 2) * stepW;
        path += `Q ${x1} 15, ${x2} 35 Q ${x3} 55, ${x4} 35 `;
      }
      return wrapSvg(`
        ${drawLine(10, 35, 60, 35, "#334155", 1)}
        <path d="${path}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
      `);
    };
    const seqSvgs = [1, 2, 3, 4].map(n => makeWave(n));
    const correctSvg = makeWave(5);
    const distractors = [makeWave(3), makeWave(4), makeWave(6), makeWave(2)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which waveform represents the 5th progression in frequency harmonics?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The frequency increases by exactly +1 full wave cycle (crest & trough) per step: 1 → 2 → 3 → 4 → 5 cycles.\n2. Figure 5 features exactly 5 wave crests.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 12: Mechanical Balance Beam Tilt (-20° to +20°)
  (t, k, rand) => {
    const angles = [-20, -10, 0, 10, 20];
    const makeBeam = (ang) => {
      const p1 = rotPt(15, 30, ang, 35, 30);
      const p2 = rotPt(55, 30, ang, 35, 30);
      return wrapSvg(`
        ${drawPolygon("35,30 27,55 43,55", "#475569", "#64748b", 1.5)}
        ${drawLine(p1.x, p1.y, p2.x, p2.y, "#f59e0b", 3)}
        ${drawCircle(p1.x, p1.y - 5, 4, "#38bdf8", "#38bdf8")}
        ${drawCircle(p2.x, p2.y - 5, 4, "#ec4899", "#ec4899")}
      `);
    };
    const seqSvgs = [0, 1, 2, 3].map(i => makeBeam(angles[i]));
    const correctSvg = makeBeam(angles[4]);
    const distractors = [makeBeam(angles[2]), makeBeam(angles[1]), makeBeam(angles[0]), makeBeam(angles[3])];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Track the angular rotation of the balance beam. Which figure displays the 5th position?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The beam rotates steadily clockwise in +10° increments: -20° (left down) → -10° → 0° (level) → +10° → +20° (right down).\n2. Figure 5 shows the beam tilted +20°.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 13: Expanding Chevron Arrows (1 to 5 chevrons)
  (t, k, rand) => {
    const makeChevrons = (count) => {
      let ch = '';
      for (let i = 0; i < count; i++) {
        const x = 15 + i * 9;
        ch += drawPolygon(`${x},20 ${x+7},35 ${x},50 ${x+4},50 ${x+11},35 ${x+4},20`, "#a855f7", "#a855f7", 1);
      }
      return wrapSvg(ch);
    };
    const seqSvgs = [1, 2, 3, 4].map(c => makeChevrons(c));
    const correctSvg = makeChevrons(5);
    const distractors = [makeChevrons(3), makeChevrons(4), makeChevrons(6), makeChevrons(2)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure logically completes the advancing chevron sequence?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Exactly one new rightward chevron arrow is appended in each step: 1 → 2 → 3 → 4 → 5 chevrons.\n2. Figure 5 features exactly 5 nested purple chevrons.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 14: Radial Shaded Sectors (12-segment wheel, step +3)
  (t, k, rand) => {
    const makeWheel = (secIdx) => {
      const ang = secIdx * 30;
      const rad1 = (ang * Math.PI) / 180;
      const rad2 = ((ang + 30) * Math.PI) / 180;
      const x1 = (35 + 25 * Math.sin(rad1)).toFixed(1);
      const y1 = (35 - 25 * Math.cos(rad1)).toFixed(1);
      const x2 = (35 + 25 * Math.sin(rad2)).toFixed(1);
      const y2 = (35 - 25 * Math.cos(rad2)).toFixed(1);
      return wrapSvg(`
        ${drawCircle(35, 35, 25, "none", "#475569", 2)}
        <path d="M 35 35 L ${x1} ${y1} A 25 25 0 0 1 ${x2} ${y2} Z" fill="#38bdf8" stroke="#38bdf8" />
      `);
    };
    const seqSvgs = [0, 3, 6, 9].map(s => makeWheel(s));
    const correctSvg = makeWheel(0); // 12 % 12 = 0
    const distractors = [makeWheel(2), makeWheel(5), makeWheel(7), makeWheel(10)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Track the movement of the shaded 30° radial sector. Which figure comes next?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The shaded sector advances clockwise by 90° (+3 sector units) per step: 12:00 → 3:00 → 6:00 → 9:00.\n2. The 5th step advances another 90° and returns to the top 12:00 position.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 15: Orbiting Dual Satellites on Circular Track
  (t, k, rand) => {
    const makeOrbit = (step) => {
      const angA = step * 45;      // Speed 1x
      const angB = step * 90;      // Speed 2x
      const pA = rotPt(35, 12, angA);
      const pB = rotPt(35, 20, angB);
      return wrapSvg(`
        ${drawCircle(35, 35, 23, "none", "#334155", 1.5)}
        ${drawCircle(35, 35, 15, "none", "#334155", 1)}
        ${drawCircle(pA.x, pA.y, 4, "#38bdf8", "#38bdf8")}
        ${drawCircle(pB.x, pB.y, 3, "#f59e0b", "#f59e0b")}
      `);
    };
    const seqSvgs = [0, 1, 2, 3].map(s => makeOrbit(s));
    const correctSvg = makeOrbit(4);
    const distractors = [makeOrbit(2), makeOrbit(3), makeOrbit(1), makeOrbit(0)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Satellite A (outer, cyan) orbits at 45°/step; Satellite B (inner, amber) orbits at 90°/step. Which is step 5?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Outer cyan satellite advances +45° each step: 0° → 45° → 90° → 135° → 180° (South).\n2. Inner amber satellite advances +90° each step: 0° → 90° → 180° → 270° → 360° (North).\n3. Figure 5 features cyan at bottom and amber at top.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 16: Vertex Truncation Sequence (Triangle -> Square -> Pentagon -> Hexagon -> Heptagon)
  (t, k, rand) => {
    const makePoly = (sides) => {
      const pts = makePolygonPts(sides, 22, 35, 35);
      return wrapSvg(drawPolygon(pts, "none", "#38bdf8", 2.5));
    };
    const seqSvgs = [3, 4, 5, 6].map(s => makePoly(s));
    const correctSvg = makePoly(7);
    const distractors = [makePoly(5), makePoly(6), makePoly(8), makePoly(4)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which geometric polygon is the 5th term in this vertex progression?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The number of sides increases strictly by +1: 3 (Triangle) → 4 (Square) → 5 (Pentagon) → 6 (Hexagon) → 7 (Heptagon).\n2. Figure 5 is a 7-sided regular heptagon.`,
      category: 'spatial', subType: 'series'
    };
  },

  // 17: Alternating Target Rings (Concentric circles fill toggle)
  (t, k, rand) => {
    const makeRings = (step) => {
      let r = '';
      for (let i = 1; i <= step; i++) {
        const radius = i * 6;
        const fill = (i % 2 === 1) ? "#38bdf8" : "#0f172a";
        r = drawCircle(35, 35, radius, fill, "#cbd5e1", 1) + r;
      }
      return wrapSvg(r);
    };
    const seqSvgs = [1, 2, 3, 4].map(s => makeRings(s));
    const correctSvg = makeRings(5);
    const distractors = [makeRings(3), makeRings(4), makeRings(6), makeRings(2)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which concentric ring pattern logically completes the ripple expansion sequence?",
      figureSvg: seqSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. A new concentric boundary ring is added outward each step: 1 → 2 → 3 → 4 → 5 rings.\n2. Alternating layers toggle between cyan fill and slate base.\n3. Figure 5 features exactly 5 concentric boundary rings.`,
      category: 'spatial', subType: 'series'
    };
  }
];

// -------------------------------------------------------------
// POOL 2: NOVEL SPATIAL MATRICES (12 Types)
// -------------------------------------------------------------
export const MATRIX_ARCHETYPES = [
  // 0: Line-Crossing Intersection Arithmetic (Row 1: 1 horiz x 1 vert, etc.)
  (t, k, rand) => {
    const makeGrid = (h, v) => {
      let lines = '';
      const hStep = 40 / (h + 1);
      for (let i = 1; i <= h; i++) lines += drawLine(15, 15 + i * hStep, 55, 15 + i * hStep, "#38bdf8", 2);
      const vStep = 40 / (v + 1);
      for (let j = 1; j <= v; j++) lines += drawLine(15 + j * vStep, 15, 15 + j * vStep, 55, "#f59e0b", 2);
      return wrapSvg(`${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1.5, 4)}${lines}`);
    };
    const matrixSvgs = [
      makeGrid(1, 1), makeGrid(1, 2), makeGrid(1, 3),
      makeGrid(2, 1), makeGrid(2, 2), makeGrid(2, 3),
      makeGrid(3, 1), makeGrid(3, 2), null
    ];
    const correctSvg = makeGrid(3, 3);
    const distractors = [makeGrid(2, 2), makeGrid(3, 2), makeGrid(2, 3), makeGrid(4, 2)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Identify the pattern governing the 3×3 matrix and determine the missing cell:",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Rows govern horizontal blue bars: Row 1 has 1, Row 2 has 2, Row 3 has 3.\n2. Columns govern vertical amber bars: Col 1 has 1, Col 2 has 2, Col 3 has 3.\n3. Missing cell (Row 3, Col 3) must contain exactly 3 horizontal and 3 vertical bars.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 1: Component Subtraction / Erasure Matrix (Col 1 minus Col 2 = Col 3)
  (t, k, rand) => {
    const makeCell = (hasSquare, hasCircle, hasDiag) => {
      let inner = '';
      if (hasSquare) inner += drawRect(20, 20, 30, 30, "none", "#38bdf8", 2);
      if (hasCircle) inner += drawCircle(35, 35, 12, "none", "#ec4899", 2);
      if (hasDiag) inner += drawLine(15, 15, 55, 55, "#38bdf8", 2);
      return wrapSvg(`${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}${inner}`);
    };
    const matrixSvgs = [
      makeCell(true, true, true),   makeCell(false, true, false),  makeCell(true, false, true),
      makeCell(true, true, false),  makeCell(true, false, false),  makeCell(false, true, false),
      makeCell(false, true, true),  makeCell(false, false, true),  null
    ];
    const correctSvg = makeCell(false, true, false); // Circle only
    const distractors = [makeCell(true, false, false), makeCell(false, false, true), makeCell(true, true, false), makeCell(true, false, true)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Determine the row-wise component transformation and complete the 3×3 matrix:",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Operation across rows: Cell 3 = Cell 1 minus Cell 2 (elements in Cell 2 are erased from Cell 1).\n2. Row 3: (Circle + Diagonal) minus (Diagonal) = Circle alone.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 2: Corner Dot Quadrant Balance (Row sum of dots is constant = 6)
  (t, k, rand) => {
    const makeDots = (count) => {
      const pts = [
        { x: 22, y: 22 }, { x: 48, y: 22 }, { x: 35, y: 35 },
        { x: 22, y: 48 }, { x: 48, y: 48 }, { x: 35, y: 22 }
      ];
      let d = '';
      for (let i = 0; i < count; i++) {
        d += drawCircle(pts[i].x, pts[i].y, 3.5, "#38bdf8", "#38bdf8");
      }
      return wrapSvg(`${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1.5, 4)}${d}`);
    };
    const matrixSvgs = [
      makeDots(1), makeDots(2), makeDots(3), // Sum = 6
      makeDots(2), makeDots(3), makeDots(1), // Sum = 6
      makeDots(3), makeDots(1), null          // Sum = 6 -> Missing = 2
    ];
    const correctSvg = makeDots(2);
    const distractors = [makeDots(1), makeDots(3), makeDots(4), makeDots(5)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure restores quantitative balance to the 3×3 dot matrix?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Each row contains a permutation of 1, 2, and 3 dots (constant sum of 6).\n2. Row 3 contains 3 and 1 dots. The missing cell must contain exactly 2 dots.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 3: Outer Shape / Inner Shape Latin Morphing
  (t, k, rand) => {
    const shapes = ['circle', 'square', 'triangle'];
    const drawShp = (shp, r, fill, stroke) => {
      if (shp === 'circle') return drawCircle(35, 35, r, fill, stroke, 2);
      if (shp === 'square') return drawRect(35 - r, 35 - r, r * 2, r * 2, fill, stroke, 2);
      if (shp === 'triangle') return drawPolygon(makePolygonPts(3, r * 1.15, 35, 35), fill, stroke, 2);
    };
    const makeCompound = (outer, inner) => {
      return wrapSvg(`
        ${drawRect(10, 10, 50, 50, "#0f172a", "#334155", 1, 4)}
        ${drawShp(outer, 18, "none", "#38bdf8")}
        ${drawShp(inner, 8, "#f59e0b", "#f59e0b")}
      `);
    };
    const matrixSvgs = [
      makeCompound('circle', 'circle'),   makeCompound('circle', 'square'),   makeCompound('circle', 'triangle'),
      makeCompound('square', 'circle'),   makeCompound('square', 'square'),   makeCompound('square', 'triangle'),
      makeCompound('triangle', 'circle'), makeCompound('triangle', 'square'), null
    ];
    const correctSvg = makeCompound('triangle', 'triangle');
    const distractors = [
      makeCompound('triangle', 'circle'),
      makeCompound('square', 'triangle'),
      makeCompound('circle', 'triangle'),
      makeCompound('triangle', 'square')
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which compound figure logically completes the 3×3 matrix?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Outer frame is constant across each row: Row 1 = Circle, Row 2 = Square, Row 3 = Triangle.\n2. Inner core cycles across each column: Col 1 = Circle, Col 2 = Square, Col 3 = Triangle.\n3. Cell (3,3) must have a Triangle exterior with a Triangle interior.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 4: Shape Overlap Boolean XOR
  (t, k, rand) => {
    // Cell 1 has left bar, Cell 2 has right bar -> Cell 3 has both.
    // If both have center bar, it disappears in Cell 3 (XOR logic).
    const makeXor = (l, m, r) => {
      let lines = '';
      if (l) lines += drawLine(22, 18, 22, 52, "#38bdf8", 3);
      if (m) lines += drawLine(35, 18, 35, 52, "#38bdf8", 3);
      if (r) lines += drawLine(48, 18, 48, 52, "#ec4899", 3);
      return wrapSvg(`${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}${lines}`);
    };
    const matrixSvgs = [
      makeXor(true, true, false),  makeXor(false, true, true),  makeXor(true, false, true), // center disappears!
      makeXor(false, true, false), makeXor(true, false, false), makeXor(true, true, false),
      makeXor(true, false, true),  makeXor(false, false, true), null
    ];
    const correctSvg = makeXor(true, false, false); // right cancels out!
    const distractors = [makeXor(false, false, true), makeXor(true, false, true), makeXor(true, true, false), makeXor(false, true, false)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Apply the row-wise combination logic (Boolean XOR). Which figure completes the 3×3 matrix?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Across each row, segments that appear in exactly ONE of the first two cells are kept in the third cell; segments appearing in BOTH are canceled out (XOR).\n2. Row 3: (Left + Right) XOR (Right) = Left alone.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 5: Diagonal Reflection & Fill Inversion Matrix
  (t, k, rand) => {
    const makeQuarter = (rotDeg, fill) => {
      const p = rotPt(35, 18, rotDeg);
      return wrapSvg(`
        ${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}
        ${drawCircle(p.x, p.y, 10, fill ? "#38bdf8" : "none", "#38bdf8", 2)}
      `);
    };
    const matrixSvgs = [
      makeQuarter(0, true),   makeQuarter(90, false), makeQuarter(180, true),
      makeQuarter(90, false), makeQuarter(180, true), makeQuarter(270, false),
      makeQuarter(180, true), makeQuarter(270, false), null
    ];
    const correctSvg = makeQuarter(0, true);
    const distractors = [makeQuarter(90, true), makeQuarter(0, false), makeQuarter(270, true), makeQuarter(180, false)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Identify the rotation and fill alternation pattern in the matrix. Which figure fills the empty cell?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The circle rotates +90° clockwise in each step along rows and columns.\n2. The fill strictly alternates: Solid Cyan → Hollow → Solid Cyan.\n3. Following (270°, Hollow), the next cell must be (0° / Top, Solid Cyan).`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 6: Arrow Vector Directional Addition Matrix
  (t, k, rand) => {
    // Arrow directions: North, East, South, West
    const makeArrow = (dir) => {
      let x1 = 35, y1 = 35, x2 = 35, y2 = 35;
      if (dir === 'N') { y1 = 45; y2 = 20; }
      if (dir === 'S') { y1 = 25; y2 = 50; }
      if (dir === 'E') { x1 = 20; x2 = 50; }
      if (dir === 'W') { x1 = 50; x2 = 20; }
      if (dir === 'NE') { x1 = 25; y1 = 45; x2 = 45; y2 = 25; }
      return wrapSvg(`
        ${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}
        ${drawLine(x1, y1, x2, y2, "#f59e0b", 3)}
        ${drawCircle(x2, y2, 4, "#f59e0b", "#f59e0b")}
      `);
    };
    const matrixSvgs = [
      makeArrow('N'), makeArrow('E'), makeArrow('NE'),
      makeArrow('E'), makeArrow('S'), makeArrow('NE'), // cyclic vectors
      makeArrow('S'), makeArrow('W'), null
    ];
    const correctSvg = makeArrow('NE');
    const distractors = [makeArrow('N'), makeArrow('S'), makeArrow('E'), makeArrow('W')];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which directional vector logically completes the 3×3 vector synthesis matrix?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Each row combines two orthogonal arrows into a resultant diagonal vector.\n2. Across all rows, the 3rd column consistently resolves into a diagonal northeast vector.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 7: Three-Tier Segment Density Stacking
  (t, k, rand) => {
    const makeBars = (count) => {
      let b = '';
      for (let i = 0; i < count; i++) {
        b += drawRect(18, 20 + i * 12, 34, 6, "#38bdf8", "#38bdf8", 1, 2);
      }
      return wrapSvg(`${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}${b}`);
    };
    const matrixSvgs = [
      makeBars(1), makeBars(2), makeBars(3),
      makeBars(2), makeBars(3), makeBars(1),
      makeBars(3), makeBars(1), null
    ];
    const correctSvg = makeBars(2);
    const distractors = [makeBars(1), makeBars(3), makeBars(4), makeBars(0)];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which bar stack completes the Latin square density distribution?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Every row and column must contain exactly one cell of 1 bar, 2 bars, and 3 bars.\n2. Row 3 has 3 bars and 1 bar; Column 3 has 3 bars and 1 bar. The missing cell must have 2 bars.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 8: 3x3 Dot Grid Tic-Tac-Toe Line Progression Matrix
  (t, k, rand) => {
    const makeGridLine = (type) => {
      let l = '';
      if (type === 'row1') l = drawLine(18, 22, 52, 22, "#38bdf8", 3);
      if (type === 'row2') l = drawLine(18, 35, 52, 35, "#38bdf8", 3);
      if (type === 'row3') l = drawLine(18, 48, 52, 48, "#38bdf8", 3);
      return wrapSvg(`
        ${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}
        ${drawCircle(22, 22, 2, "#475569", "#475569")} ${drawCircle(35, 22, 2, "#475569", "#475569")} ${drawCircle(48, 22, 2, "#475569", "#475569")}
        ${drawCircle(22, 35, 2, "#475569", "#475569")} ${drawCircle(35, 35, 2, "#475569", "#475569")} ${drawCircle(48, 35, 2, "#475569", "#475569")}
        ${drawCircle(22, 48, 2, "#475569", "#475569")} ${drawCircle(35, 48, 2, "#475569", "#475569")} ${drawCircle(48, 48, 2, "#475569", "#475569")}
        ${l}
      `);
    };
    const matrixSvgs = [
      makeGridLine('row1'), makeGridLine('row2'), makeGridLine('row3'),
      makeGridLine('row2'), makeGridLine('row3'), makeGridLine('row1'),
      makeGridLine('row3'), makeGridLine('row1'), null
    ];
    const correctSvg = makeGridLine('row2');
    const distractors = [makeGridLine('row1'), makeGridLine('row3'), wrapSvg(drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)), makeGridLine('row1')];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which linear alignment correctly satisfies the 3×3 grid matrix constraints?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Each row and column features top horizontal line, middle horizontal line, and bottom horizontal line.\n2. Row 3 has bottom and top; missing element is the middle horizontal line.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 9: Concentric Shape Scaling Matrix (Square, Diamond, Circle)
  (t, k, rand) => {
    const makeConcentric = (outer, inner) => {
      let o = '', i = '';
      if (outer === 'sq') o = drawRect(18, 18, 34, 34, "none", "#38bdf8", 2);
      if (outer === 'ci') o = drawCircle(35, 35, 17, "none", "#38bdf8", 2);
      if (inner === 'sq') i = drawRect(28, 28, 14, 14, "#f59e0b", "#f59e0b", 1);
      if (inner === 'ci') i = drawCircle(35, 35, 7, "#f59e0b", "#f59e0b", 1);
      return wrapSvg(`${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}${o}${i}`);
    };
    const matrixSvgs = [
      makeConcentric('sq', 'ci'), makeConcentric('ci', 'sq'), makeConcentric('sq', 'sq'),
      makeConcentric('ci', 'sq'), makeConcentric('sq', 'sq'), makeConcentric('sq', 'ci'),
      makeConcentric('sq', 'sq'), makeConcentric('sq', 'ci'), null
    ];
    const correctSvg = makeConcentric('ci', 'sq');
    const distractors = [makeConcentric('sq', 'sq'), makeConcentric('sq', 'ci'), makeConcentric('ci', 'ci'), wrapSvg(drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4))];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which concentric figure resolves the pattern in the 3×3 matrix?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Each row and column contains a permutation of: (Square/Circle), (Circle/Square), and (Square/Square).\n2. Row 3 contains (Square/Square) and (Square/Circle); the missing cell must be (Circle/Square).`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 10: Corner Segment Perimeter Walk Matrix (TL -> TR -> BR -> BL)
  (t, k, rand) => {
    const makeCornerWalk = (pos) => {
      let x = 16, y = 16;
      if (pos === 'TR') { x = 44; y = 16; }
      if (pos === 'BR') { x = 44; y = 44; }
      if (pos === 'BL') { x = 16; y = 44; }
      return wrapSvg(`
        ${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1.5, 4)}
        ${drawRect(x, y, 10, 10, "#a855f7", "#a855f7", 1, 2)}
      `);
    };
    const matrixSvgs = [
      makeCornerWalk('TL'), makeCornerWalk('TR'), makeCornerWalk('BR'),
      makeCornerWalk('TR'), makeCornerWalk('BR'), makeCornerWalk('BL'),
      makeCornerWalk('BR'), makeCornerWalk('BL'), null
    ];
    const correctSvg = makeCornerWalk('TL');
    const distractors = [makeCornerWalk('TR'), makeCornerWalk('BR'), makeCornerWalk('BL'), wrapSvg(drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4))];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Follow the rotational perimeter orbit across the 3×3 matrix. Which figure fills the final position?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. The purple block orbits clockwise around the four corners: TL → TR → BR → BL → TL.\n2. Following BL in Row 3, the block advances back to the Top-Left (TL) corner.`,
      category: 'spatial', subType: 'matrix'
    };
  },

  // 11: Cross and Ring Intersection Matrix
  (t, k, rand) => {
    const makeCrossRing = (nBars, ringPos) => {
      let b = '';
      if (nBars === 1) b = drawLine(15, 35, 55, 35, "#38bdf8", 2);
      if (nBars === 2) b = drawLine(15, 35, 55, 35, "#38bdf8", 2) + drawLine(35, 15, 35, 55, "#38bdf8", 2);
      if (nBars === 3) b = drawLine(15, 35, 55, 35, "#38bdf8", 2) + drawLine(35, 15, 35, 55, "#38bdf8", 2) + drawLine(18, 18, 52, 52, "#38bdf8", 2);
      const ring = drawCircle(ringPos.x, ringPos.y, 6, "none", "#ec4899", 2);
      return wrapSvg(`${drawRect(12, 12, 46, 46, "#0f172a", "#334155", 1, 4)}${b}${ring}`);
    };
    const matrixSvgs = [
      makeCrossRing(1, { x: 35, y: 35 }), makeCrossRing(2, { x: 35, y: 35 }), makeCrossRing(3, { x: 35, y: 35 }),
      makeCrossRing(2, { x: 35, y: 35 }), makeCrossRing(3, { x: 35, y: 35 }), makeCrossRing(1, { x: 35, y: 35 }),
      makeCrossRing(3, { x: 35, y: 35 }), makeCrossRing(1, { x: 35, y: 35 }), null
    ];
    const correctSvg = makeCrossRing(2, { x: 35, y: 35 });
    const distractors = [makeCrossRing(1, { x: 35, y: 35 }), makeCrossRing(3, { x: 35, y: 35 }), makeCrossRing(2, { x: 20, y: 20 }), makeCrossRing(1, { x: 50, y: 50 })];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which intersected cross configuration completes the 3×3 matrix?",
      matrixSvg: matrixSvgs, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Step-by-step Rule:**\n1. Rows and columns cycle through 1 bar, 2 bars (cross), and 3 bars (cross + diagonal).\n2. Missing cell in Row 3 requires 2 intersecting bars with the central pink ring.`,
      category: 'spatial', subType: 'matrix'
    };
  }
];

// -------------------------------------------------------------
// POOL 3: NOVEL ODD-ONE-OUT (18 Types)
// -------------------------------------------------------------
export const ODD_ARCHETYPES = [
  // 0: Eulerian Path Stroke Outlier (4 single-stroke drawable, 1 has 4 odd vertices)
  (t, k, rand) => {
    const makeStar = () => wrapSvg(drawPolygon("35,12 42,27 58,27 45,37 50,53 35,43 20,53 25,37 12,27 28,27", "none", "#38bdf8", 2));
    const makeHouse = () => wrapSvg(`${drawRect(20, 30, 30, 25, "none", "#38bdf8", 2)}${drawPolygon("20,30 35,15 50,30", "none", "#38bdf8", 2)}`);
    const makeBowtie = () => wrapSvg(drawPolygon("15,18 55,18 15,52 55,52", "none", "#38bdf8", 2));
    const makeEnvelope = () => wrapSvg(`${drawRect(15, 25, 40, 28, "none", "#38bdf8", 2)}${drawLine(15, 25, 35, 42, "#38bdf8", 2)}${drawLine(55, 25, 35, 42, "#38bdf8", 2)}`);
    const makeDoubleKiteNonEuler = () => wrapSvg(`
      ${drawRect(18, 18, 34, 34, "none", "#38bdf8", 2)}
      ${drawLine(18, 18, 52, 52, "#38bdf8", 2)}
      ${drawLine(18, 52, 52, 18, "#38bdf8", 2)}
    `); // 4 vertices with degree 3 -> Cannot be drawn in a single continuous stroke!
    const items = [
      { svg: makeStar() }, { svg: makeHouse() }, { svg: makeBowtie() }, { svg: makeEnvelope() },
      { svg: makeDoubleKiteNonEuler() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Four of the five figures can be traced in a single continuous stroke without lifting the pen or retracing any edge (Eulerian path). Which figure is the odd one out?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Topological Rule:**\n1. By Euler's Theorem, a graph has a continuous path if and only if it has 0 or 2 vertices of odd degree.\n2. The outlier figure (square with complete diagonals) has 4 vertices of degree 3, making it topologically impossible to trace in one continuous stroke.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 1: Convexity vs Concavity Outlier
  (t, k, rand) => {
    const makeConvexHex = () => wrapSvg(drawPolygon(makePolygonPts(6, 22, 35, 35), "none", "#38bdf8", 2));
    const makeConvexOct = () => wrapSvg(drawPolygon(makePolygonPts(8, 22, 35, 35), "none", "#38bdf8", 2));
    const makeConvexPen = () => wrapSvg(drawPolygon(makePolygonPts(5, 22, 35, 35), "none", "#38bdf8", 2));
    const makeConvexTrap = () => wrapSvg(drawPolygon("20,20 50,20 58,50 12,50", "none", "#38bdf8", 2));
    const makeConcaveArrow = () => wrapSvg(drawPolygon("20,20 50,35 20,50 30,35", "none", "#38bdf8", 2)); // Concave reflex interior angle > 180°
    const items = [
      { svg: makeConvexHex() }, { svg: makeConvexOct() }, { svg: makeConvexPen() }, { svg: makeConvexTrap() },
      { svg: makeConcaveArrow() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which figure does NOT belong with the other four based on geometric convexity?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Geometric Rule:**\n1. Four of the figures are strictly convex polygons (all interior angles are strictly less than 180°).\n2. The outlier chevron arrow is a concave polygon possessing an interior angle greater than 180°.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 2: Center of Gravity Mechanical Balance Outlier
  (t, k, rand) => {
    const makeBal = (dx) => wrapSvg(`
      ${drawPolygon("35,40 27,60 43,60", "#475569", "#64748b", 1.5)}
      ${drawLine(15, 40, 55, 40, "#38bdf8", 3)}
      ${drawCircle(35 + dx, 32, 6, "#f59e0b", "#f59e0b")}
    `);
    const items = [
      { svg: makeBal(0) }, { svg: makeBal(0) }, { svg: makeBal(0) }, { svg: makeBal(0) },
      { svg: makeBal(14) } // heavily displaced off center
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which balanced mechanical scale figure is the outlier?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Physics Rule:**\n1. Four of the scales have their mass centered directly over the fulcrum pivot, maintaining horizontal equilibrium.\n2. The outlier has its load shifted 14 units to the right, which would tip the beam.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 3: Parallel Edge Pairs Outlier (4 have parallel edges, 1 has none)
  (t, k, rand) => {
    const makeParallelogram = () => wrapSvg(drawPolygon("18,22 45,22 52,48 25,48", "none", "#38bdf8", 2));
    const makeHexagon = () => wrapSvg(drawPolygon(makePolygonPts(6, 22, 35, 35), "none", "#38bdf8", 2));
    const makeRectangle = () => wrapSvg(drawRect(18, 22, 34, 26, "none", "#38bdf8", 2));
    const makeOctagon = () => wrapSvg(drawPolygon(makePolygonPts(8, 22, 35, 35), "none", "#38bdf8", 2));
    const makeScaleneTrap = () => wrapSvg(drawPolygon("15,22 48,16 56,52 20,44", "none", "#38bdf8", 2)); // 0 pairs of parallel sides!
    const items = [
      { svg: makeParallelogram() }, { svg: makeHexagon() }, { svg: makeRectangle() }, { svg: makeOctagon() },
      { svg: makeScaleneTrap() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Four figures possess at least one pair of parallel opposite edges. Which figure is the odd one out?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Geometric Rule:**\n1. Parallelograms, regular hexagons, rectangles, and regular octagons all possess pairs of parallel opposite sides.\n2. The outlier scalene quadrilateral has completely non-parallel sides on all four edges.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 4: Rotational Symmetry Order Outlier (4 have 4-fold symmetry, 1 has only 2-fold)
  (t, k, rand) => {
    const makeCross4 = () => wrapSvg(`${drawLine(15, 35, 55, 35, "#38bdf8", 3)}${drawLine(35, 15, 35, 55, "#38bdf8", 3)}`);
    const makeSquare4 = () => wrapSvg(drawRect(20, 20, 30, 30, "none", "#38bdf8", 2));
    const makeCircle4Dots = () => wrapSvg(`${drawCircle(35, 35, 20, "none", "#38bdf8", 2)}${drawCircle(35, 15, 3, "#38bdf8", "#38bdf8")}${drawCircle(55, 35, 3, "#38bdf8", "#38bdf8")}${drawCircle(35, 55, 3, "#38bdf8", "#38bdf8")}${drawCircle(15, 35, 3, "#38bdf8", "#38bdf8")}`);
    const makeSwastika4 = () => wrapSvg(`${drawLine(35, 15, 35, 55, "#38bdf8", 2)}${drawLine(15, 35, 55, 35, "#38bdf8", 2)}${drawLine(35, 15, 45, 15, "#38bdf8", 2)}${drawLine(55, 35, 55, 45, "#38bdf8", 2)}${drawLine(35, 55, 25, 55, "#38bdf8", 2)}${drawLine(15, 35, 15, 25, "#38bdf8", 2)}`);
    const makeRect2 = () => wrapSvg(drawRect(15, 25, 40, 20, "none", "#38bdf8", 2)); // Only 2-fold symmetry (180°), NOT 4-fold (90°)!
    const items = [
      { svg: makeCross4() }, { svg: makeSquare4() }, { svg: makeCircle4Dots() }, { svg: makeSwastika4() },
      { svg: makeRect2() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which figure does NOT possess 4-fold (90°) rotational symmetry?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Symmetry Rule:**\n1. Four of the figures map onto themselves under 90° rotations (Order 4 rotational symmetry).\n2. The non-square rectangle only maps onto itself after a 180° rotation (Order 2 symmetry).`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 5: Closed Loops Count (Genus) Outlier (4 have 2 enclosed loops, 1 has 1)
  (t, k, rand) => {
    const makeEight = () => wrapSvg(`${drawCircle(35, 24, 10, "none", "#38bdf8", 2)}${drawCircle(35, 46, 10, "none", "#38bdf8", 2)}`);
    const makeDoubleSquare = () => wrapSvg(`${drawRect(16, 24, 18, 22, "none", "#38bdf8", 2)}${drawRect(36, 24, 18, 22, "none", "#38bdf8", 2)}`);
    const makeBullsEye2 = () => wrapSvg(`${drawCircle(35, 35, 22, "none", "#38bdf8", 2)}${drawCircle(35, 35, 12, "none", "#38bdf8", 2)}`);
    const makeGlasses = () => wrapSvg(`${drawCircle(25, 35, 10, "none", "#38bdf8", 2)}${drawCircle(45, 35, 10, "none", "#38bdf8", 2)}${drawLine(35, 35, 35, 35, "#38bdf8", 2)}`);
    const makeSingleLoopTriangle = () => wrapSvg(drawPolygon("35,16 55,54 15,54", "none", "#38bdf8", 2)); // Only 1 enclosed loop!
    const items = [
      { svg: makeEight() }, { svg: makeDoubleSquare() }, { svg: makeBullsEye2() }, { svg: makeGlasses() },
      { svg: makeSingleLoopTriangle() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Topologically, which figure possesses a different number of enclosed regional loops?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Topological Rule:**\n1. Four of the figures partition the plane into exactly 2 closed interior regions (genus 2).\n2. The triangle encloses only a single interior region (genus 1).`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 6: Tangency Outlier (4 internally tangent, 1 intersecting)
  (t, k, rand) => {
    const makeInternalTang = (ang) => {
      const p = rotPt(35, 23, ang);
      return wrapSvg(`
        ${drawCircle(35, 35, 22, "none", "#38bdf8", 2)}
        ${drawCircle(p.x, p.y, 10, "none", "#38bdf8", 2)}
      `);
    };
    const makeIntersecting = () => wrapSvg(`
      ${drawCircle(35, 35, 22, "none", "#38bdf8", 2)}
      ${drawCircle(35, 20, 15, "none", "#38bdf8", 2)}
    `); // Cuts through outer boundary at two points!
    const items = [
      { svg: makeInternalTang(0) }, { svg: makeInternalTang(90) }, { svg: makeInternalTang(180) }, { svg: makeInternalTang(270) },
      { svg: makeIntersecting() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which circular arrangement violates the internal tangency rule?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Geometric Rule:**\n1. Four figures feature an inner circle touching the outer circle at exactly one tangent point.\n2. The outlier inner circle intersects the perimeter at two distinct points.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 7: Spiral Chirality / Handedness Outlier (4 clockwise, 1 counter-clockwise)
  (t, k, rand) => {
    const makeRightHandCurve = (rotDeg) => {
      // Clockwise curl: starts center, curves up and right
      const p = rotPt(35, 15, rotDeg);
      return wrapSvg(`
        ${drawCircle(35, 35, 2, "#38bdf8", "#38bdf8")}
        <path d="M 35 35 A 10 10 0 0 1 45 45 A 20 20 0 0 1 20 30" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" transform="rotate(${rotDeg} 35 35)" />
      `);
    };
    const makeLeftHandCurve = () => {
      // Counter-clockwise reflection
      return wrapSvg(`
        ${drawCircle(35, 35, 2, "#38bdf8", "#38bdf8")}
        <path d="M 35 35 A 10 10 0 0 0 25 45 A 20 20 0 0 0 50 30" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
      `);
    };
    const items = [
      { svg: makeRightHandCurve(0) }, { svg: makeRightHandCurve(90) }, { svg: makeRightHandCurve(180) }, { svg: makeRightHandCurve(270) },
      { svg: makeLeftHandCurve() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Four figures are rigid 2D planar rotations of one chiral motif. Which figure is its mirror reflection?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Chirality Rule:**\n1. Four figures are rotational orientations of a right-handed clockwise curve.\n2. The outlier is a non-superimposable mirror image (chiral enantiomer).`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 8: Line Segment Count Parity (4 have 6 segments, 1 has 5)
  (t, k, rand) => {
    const makeHexagon = () => wrapSvg(drawPolygon(makePolygonPts(6, 22, 35, 35), "none", "#38bdf8", 2));
    const makeSixSpoke = () => {
      let l = '';
      for (let i = 0; i < 6; i++) {
        const p = rotPt(35, 14, i * 60);
        l += drawLine(35, 35, p.x, p.y, "#38bdf8", 2);
      }
      return wrapSvg(l);
    };
    const makeDoubleTriangle = () => wrapSvg(`${drawPolygon(makePolygonPts(3, 18, 35, 26), "none", "#38bdf8", 2)}${drawPolygon(makePolygonPts(3, 18, 35, 44), "none", "#38bdf8", 2)}`);
    const makeSixStepStairs = () => wrapSvg(`${drawLine(15, 50, 15, 40, "#38bdf8", 2)}${drawLine(15, 40, 30, 40, "#38bdf8", 2)}${drawLine(30, 40, 30, 30, "#38bdf8", 2)}${drawLine(30, 30, 45, 30, "#38bdf8", 2)}${drawLine(45, 30, 45, 20, "#38bdf8", 2)}${drawLine(45, 20, 55, 20, "#38bdf8", 2)}`);
    const makeFiveSidePentagon = () => wrapSvg(drawPolygon(makePolygonPts(5, 22, 35, 35), "none", "#38bdf8", 2)); // 5 sides!
    const items = [
      { svg: makeHexagon() }, { svg: makeSixSpoke() }, { svg: makeDoubleTriangle() }, { svg: makeSixStepStairs() },
      { svg: makeFiveSidePentagon() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Four figures consist of exactly 6 line segments. Which figure is the odd one out?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Segment Count Rule:**\n1. Four of the figures are constructed from exactly 6 line segments.\n2. The regular pentagon consists of only 5 line segments.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 9: Right Angle Count Outlier (4 have right angles, 1 has none)
  (t, k, rand) => {
    const makeSquare = () => wrapSvg(drawRect(20, 20, 30, 30, "none", "#38bdf8", 2));
    const makeRightTri = () => wrapSvg(drawPolygon("20,20 20,50 50,50", "none", "#38bdf8", 2));
    const makeL = () => wrapSvg(`${drawLine(20, 15, 20, 50, "#38bdf8", 2.5)}${drawLine(20, 50, 50, 50, "#38bdf8", 2.5)}`);
    const makeT = () => wrapSvg(`${drawLine(15, 25, 55, 25, "#38bdf8", 2.5)}${drawLine(35, 25, 35, 55, "#38bdf8", 2.5)}`);
    const makeEquilateral = () => wrapSvg(drawPolygon(makePolygonPts(3, 22, 35, 35), "none", "#38bdf8", 2)); // All angles 60°
    const items = [
      { svg: makeSquare() }, { svg: makeRightTri() }, { svg: makeL() }, { svg: makeT() },
      { svg: makeEquilateral() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which figure does NOT contain any 90° right angles?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Angle Rule:**\n1. Four figures contain one or more perpendicular 90° right angles.\n2. The equilateral triangle has all three interior angles measuring exactly 60°.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 10: Shaded Area Ratio Outlier (4 are 50% shaded, 1 is 25%)
  (t, k, rand) => {
    const makeHalfCircle = () => wrapSvg(`${drawCircle(35, 35, 22, "none", "#38bdf8", 2)}<path d="M 35 13 A 22 22 0 0 1 35 57 Z" fill="#38bdf8" />`);
    const makeHalfSquare = () => wrapSvg(`${drawRect(18, 18, 34, 34, "none", "#38bdf8", 2)}${drawRect(18, 18, 17, 34, "#38bdf8", "none")}`);
    const makeDiagHalf = () => wrapSvg(`${drawRect(18, 18, 34, 34, "none", "#38bdf8", 2)}${drawPolygon("18,18 52,18 52,52", "#38bdf8", "none")}`);
    const makeRingHalf = () => wrapSvg(`${drawCircle(35, 35, 22, "none", "#38bdf8", 2)}<path d="M 35 13 A 22 22 0 0 1 35 57 L 35 45 A 10 10 0 0 0 35 25 Z" fill="#38bdf8" />`);
    const makeQuarterSquare = () => wrapSvg(`${drawRect(18, 18, 34, 34, "none", "#38bdf8", 2)}${drawRect(18, 18, 17, 17, "#38bdf8", "none")}`); // 25% shaded!
    const items = [
      { svg: makeHalfCircle() }, { svg: makeHalfSquare() }, { svg: makeDiagHalf() }, { svg: makeRingHalf() },
      { svg: makeQuarterSquare() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Four figures are exactly 50% shaded. Which figure has a different shaded area proportion?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Area Proportion Rule:**\n1. Four of the figures have exactly half (50%) of their total interior area shaded.\n2. The outlier square has only one quadrant (25%) shaded.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 11: Interlocking vs Disjoint Rings Outlier
  (t, k, rand) => {
    const makeInterlocked = (dx) => wrapSvg(`
      ${drawCircle(28 + dx, 35, 14, "none", "#38bdf8", 2.5)}
      ${drawCircle(42 + dx, 35, 14, "none", "#f59e0b", 2.5)}
    `);
    const makeDisjoint = () => wrapSvg(`
      ${drawCircle(22, 35, 10, "none", "#38bdf8", 2.5)}
      ${drawCircle(48, 35, 10, "none", "#f59e0b", 2.5)}
    `); // Distance between centers > sum of radii -> completely separate!
    const items = [
      { svg: makeInterlocked(0) }, { svg: makeInterlocked(2) }, { svg: makeInterlocked(-2) }, { svg: makeInterlocked(1) },
      { svg: makeDisjoint() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which dual-ring configuration is topologically distinct from the others?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Topological Rule:**\n1. Four of the figures consist of interlocking overlapping rings with a non-empty intersection.\n2. The outlier consists of completely disjoint, disconnected rings with zero overlap.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 12: Arrow Cycle Direction (4 clockwise loop, 1 outward radiating)
  (t, k, rand) => {
    const makeClockwiseLoop = () => wrapSvg(`
      ${drawLine(20, 20, 50, 20, "#38bdf8", 2.5)}${drawCircle(50, 20, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(50, 20, 50, 50, "#38bdf8", 2.5)}${drawCircle(50, 50, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(50, 50, 20, 50, "#38bdf8", 2.5)}${drawCircle(20, 50, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(20, 50, 20, 20, "#38bdf8", 2.5)}${drawCircle(20, 20, 3, "#38bdf8", "#38bdf8")}
    `);
    const makeClockwiseTri = () => wrapSvg(`
      ${drawLine(20, 50, 35, 20, "#38bdf8", 2.5)}${drawCircle(35, 20, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(35, 20, 50, 50, "#38bdf8", 2.5)}${drawCircle(50, 50, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(50, 50, 20, 50, "#38bdf8", 2.5)}${drawCircle(20, 50, 3, "#38bdf8", "#38bdf8")}
    `);
    const makeClockwiseCircle = () => wrapSvg(`
      <path d="M 35 15 A 20 20 0 1 1 15 35" fill="none" stroke="#38bdf8" stroke-width="2.5" />
      ${drawCircle(15, 35, 4, "#38bdf8", "#38bdf8")}
    `);
    const makeClockwiseHex = () => wrapSvg(`
      ${drawLine(20, 25, 35, 15, "#38bdf8", 2.5)}${drawCircle(35, 15, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(35, 15, 50, 25, "#38bdf8", 2.5)}${drawCircle(50, 25, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(50, 25, 50, 45, "#38bdf8", 2.5)}${drawCircle(50, 45, 3, "#38bdf8", "#38bdf8")}
    `);
    const makeOutwardArrows = () => wrapSvg(`
      ${drawLine(35, 35, 35, 15, "#38bdf8", 2.5)}${drawCircle(35, 15, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(35, 35, 55, 35, "#38bdf8", 2.5)}${drawCircle(55, 35, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(35, 35, 35, 55, "#38bdf8", 2.5)}${drawCircle(35, 55, 3, "#38bdf8", "#38bdf8")}
      ${drawLine(35, 35, 15, 35, "#38bdf8", 2.5)}${drawCircle(15, 35, 3, "#38bdf8", "#38bdf8")}
    `); // Divergent outward radial vectors, not a circulating loop!
    const items = [
      { svg: makeClockwiseLoop() }, { svg: makeClockwiseTri() }, { svg: makeClockwiseCircle() }, { svg: makeClockwiseHex() },
      { svg: makeOutwardArrows() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which vector configuration is the odd one out based on cyclic flow?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Vector Flow Rule:**\n1. Four of the figures form directed cyclic loops flowing in a closed circuit.\n2. The outlier features four vectors diverging outward away from a central source.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 13: Perimeter Vertex Count (4 have 6 vertices, 1 has 5)
  (t, k, rand) => {
    const makeHex = () => wrapSvg(drawPolygon(makePolygonPts(6, 22, 35, 35), "none", "#38bdf8", 2));
    const makeCrossStar = () => wrapSvg(drawPolygon("35,14 42,28 56,35 42,42 35,56 28,42 14,35 28,28", "none", "#38bdf8", 2)); // 8 vertices wait
    const makeHourglass = () => wrapSvg(drawPolygon("20,18 50,18 35,35 50,52 20,52 35,35", "none", "#38bdf8", 2));
    const makeChevron = () => wrapSvg(drawPolygon("15,18 35,32 55,18 55,30 35,44 15,30", "none", "#38bdf8", 2)); // 6 vertices
    const makeLShaped = () => wrapSvg(drawPolygon("20,18 36,18 36,36 52,36 52,52 20,52", "none", "#38bdf8", 2)); // 6 vertices
    const makePent = () => wrapSvg(drawPolygon(makePolygonPts(5, 22, 35, 35), "none", "#38bdf8", 2)); // 5 vertices!
    const items = [
      { svg: makeHex() }, { svg: makeHourglass() }, { svg: makeChevron() }, { svg: makeLShaped() },
      { svg: makePent() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Four figures each have exactly 6 perimeter vertices. Which figure is the odd one out?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Vertex Rule:**\n1. Four of the polygons possess exactly 6 vertices on their boundary.\n2. The regular pentagon possesses only 5 vertices.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 14: Bilateral Reflection Symmetry Axes (4 have 2 axes, 1 has only 1)
  (t, k, rand) => {
    const makeRectangle = () => wrapSvg(drawRect(18, 25, 34, 20, "none", "#38bdf8", 2)); // 2 axes
    const makeRhombus = () => wrapSvg(drawPolygon("35,16 52,35 35,54 18,35", "none", "#38bdf8", 2)); // 2 axes
    const makeEllipse = () => wrapSvg(`<ellipse cx="35" cy="35" rx="20" ry="12" fill="none" stroke="#38bdf8" stroke-width="2" />`); // 2 axes
    const makeHLetter = () => wrapSvg(`${drawLine(22, 18, 22, 52, "#38bdf8", 3)}${drawLine(48, 18, 48, 52, "#38bdf8", 3)}${drawLine(22, 35, 48, 35, "#38bdf8", 3)}`); // 2 axes
    const makeIsoscelesTri = () => wrapSvg(drawPolygon("35,16 52,52 18,52", "none", "#38bdf8", 2)); // Only 1 vertical axis!
    const items = [
      { svg: makeRectangle() }, { svg: makeRhombus() }, { svg: makeEllipse() }, { svg: makeHLetter() },
      { svg: makeIsoscelesTri() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Four figures possess exactly two orthogonal axes of bilateral reflection symmetry. Which figure is the odd one out?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Symmetry Rule:**\n1. The rectangle, rhombus, ellipse, and 'H' shape each have 2 axes of mirror symmetry (horizontal and vertical).\n2. The isosceles triangle possesses only 1 vertical axis of symmetry.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 15: Punctured Holes Count Outlier (4 have 3 holes, 1 has 2)
  (t, k, rand) => {
    const makeHoles = (count) => {
      const pts = [{ x: 25, y: 28 }, { x: 45, y: 28 }, { x: 35, y: 46 }];
      let h = '';
      for (let i = 0; i < count; i++) {
        h += drawCircle(pts[i].x, pts[i].y, 4, "#0f172a", "#0f172a");
      }
      return wrapSvg(`
        ${drawRect(15, 15, 40, 40, "#38bdf8", "#38bdf8", 1, 4)}
        ${h}
      `);
    };
    const items = [
      { svg: makeHoles(3) }, { svg: makeHoles(3) }, { svg: makeHoles(3) }, { svg: makeHoles(3) },
      { svg: makeHoles(2) } // Only 2 holes!
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which punched tile has a different quantity of interior cutouts?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Puncture Rule:**\n1. Four tiles have exactly 3 circular cutouts drilled through their faces.\n2. The outlier tile has only 2 cutouts.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 16: Corner Tick Marks Orientation (4 inward, 1 outward)
  (t, k, rand) => {
    const makeTicks = (outward) => {
      const d = outward ? 6 : -6;
      return wrapSvg(`
        ${drawRect(22, 22, 26, 26, "none", "#38bdf8", 2)}
        ${drawLine(22, 22, 22 + d, 22 + d, "#38bdf8", 2)}
        ${drawLine(48, 22, 48 - d, 22 + d, "#38bdf8", 2)}
        ${drawLine(48, 48, 48 - d, 48 - d, "#38bdf8", 2)}
        ${drawLine(22, 48, 22 + d, 48 - d, "#38bdf8", 2)}
      `);
    };
    const items = [
      { svg: makeTicks(false) }, { svg: makeTicks(false) }, { svg: makeTicks(false) }, { svg: makeTicks(false) },
      { svg: makeTicks(true) } // Ticks point outwards!
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which figure displays corner spurs pointing in an opposite direction relative to its interior?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Orientation Rule:**\n1. Four figures have corner tick marks directed diagonally inward towards the center.\n2. The outlier has corner spurs extending diagonally outward away from the perimeter.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  },

  // 17: Isometric 3D Cube Perspective (4 valid cubes, 1 impossible Escher inversion)
  (t, k, rand) => {
    const makeValidCube = (rot) => {
      return wrapSvg(`
        ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#38bdf8", 2)}
        ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#38bdf8", 2)}
        ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#38bdf8", 2)}
      `);
    };
    const makeImpossibleCube = () => {
      return wrapSvg(`
        ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#38bdf8", 2)}
        ${drawLine(18, 26, 52, 44, "#38bdf8", 2)} <!-- paradoxical crossing line -->
        ${drawLine(52, 26, 18, 44, "#38bdf8", 2)}
      `);
    };
    const items = [
      { svg: makeValidCube(0) }, { svg: makeValidCube(0) }, { svg: makeValidCube(0) }, { svg: makeValidCube(0) },
      { svg: makeImpossibleCube() }
    ];
    const { options, correctOption } = randomize(items, 4, rand);
    return {
      question: "Which isometric representation is a paradoxical impossible object?",
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Geometric Rule:**\n1. Four figures depict geometrically valid 3D isometric cubes.\n2. The outlier contains contradictory overlapping interior edges that create a geometrically impossible figure.`,
      category: 'spatial', subType: 'odd_one_out'
    };
  }
];

// -------------------------------------------------------------
// POOL 4: NOVEL SPATIAL ANALOGIES (10 Types)
// -------------------------------------------------------------
export const ANALOGY_ARCHETYPES = [
  // 0: 2D-to-3D Extrusion (Circle : Cylinder :: Triangle : Prism)
  (t, k, rand) => {
    const figA = wrapSvg(drawCircle(35, 35, 18, "none", "#38bdf8", 2));
    const figB = wrapSvg(`
      <ellipse cx="35" cy="22" rx="18" ry="7" fill="none" stroke="#38bdf8" stroke-width="2" />
      <ellipse cx="35" cy="48" rx="18" ry="7" fill="none" stroke="#38bdf8" stroke-width="2" />
      ${drawLine(17, 22, 17, 48, "#38bdf8", 2)}${drawLine(53, 22, 53, 48, "#38bdf8", 2)}
    `);
    const figC = wrapSvg(drawPolygon(makePolygonPts(3, 20, 35, 38), "none", "#f59e0b", 2));
    const correctSvg = wrapSvg(`
      ${drawPolygon("35,16 18,30 52,30", "none", "#f59e0b", 2)}
      ${drawPolygon("35,40 18,54 52,54", "none", "#f59e0b", 2)}
      ${drawLine(35, 16, 35, 40, "#f59e0b", 2)}${drawLine(18, 30, 18, 54, "#f59e0b", 2)}${drawLine(52, 30, 52, 54, "#f59e0b", 2)}
    `);
    const distractors = [
      wrapSvg(drawPolygon(makePolygonPts(3, 20, 35, 38), "#f59e0b", "#f59e0b", 1)),
      wrapSvg(drawRect(20, 20, 30, 30, "none", "#f59e0b", 2)),
      figB,
      wrapSvg(drawPolygon("35,16 18,30 52,30", "none", "#38bdf8", 2))
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Figure A is to Figure B as Figure C is to which option?",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. Figure A (2D Circle) is extruded vertically into Figure B (3D Cylinder).\n2. Applying this extrusion to Figure C (2D Triangle) yields a 3D Triangular Prism.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 1: Diagonal Reflection with Fill Swap
  (t, k, rand) => {
    const figA = wrapSvg(`${drawRect(18, 18, 34, 34, "none", "#38bdf8", 2)}${drawCircle(26, 26, 5, "#38bdf8", "#38bdf8")}`);
    const figB = wrapSvg(`${drawRect(18, 18, 34, 34, "none", "#38bdf8", 2)}${drawCircle(44, 44, 5, "none", "#38bdf8", 2)}`);
    const figC = wrapSvg(`${drawPolygon(makePolygonPts(3, 22, 35, 38), "none", "#f59e0b", 2)}${drawRect(31, 23, 8, 8, "#f59e0b", "#f59e0b")}`);
    const correctSvg = wrapSvg(`${drawPolygon(makePolygonPts(3, 22, 35, 38, 90), "none", "#f59e0b", 2)}${drawRect(31, 41, 8, 8, "none", "#f59e0b", 2)}`);
    const distractors = [
      wrapSvg(`${drawPolygon(makePolygonPts(3, 22, 35, 38), "none", "#f59e0b", 2)}${drawRect(31, 41, 8, 8, "#f59e0b", "#f59e0b")}`),
      figA, figB, figC
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Complete the geometric analogy:",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The inner marker reflects to the opposing opposite vertex and inverts its fill from solid to hollow.\n2. Applying this to C reflects the inner square and converts it from solid to outline.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 2: Nested Inversion (Inner becomes Outer)
  (t, k, rand) => {
    const figA = wrapSvg(`${drawCircle(35, 35, 20, "none", "#38bdf8", 2)}${drawRect(27, 27, 16, 16, "#f59e0b", "#f59e0b")}`);
    const figB = wrapSvg(`${drawRect(20, 20, 30, 30, "none", "#f59e0b", 2)}${drawCircle(35, 35, 8, "#38bdf8", "#38bdf8")}`);
    const figC = wrapSvg(`${drawPolygon(makePolygonPts(3, 22, 35, 38), "none", "#38bdf8", 2)}${drawCircle(35, 36, 6, "#ec4899", "#ec4899")}`);
    const correctSvg = wrapSvg(`${drawCircle(35, 35, 20, "none", "#ec4899", 2)}${drawPolygon(makePolygonPts(3, 10, 35, 36), "#38bdf8", "#38bdf8")}`);
    const distractors = [
      wrapSvg(`${drawPolygon(makePolygonPts(3, 22, 35, 38), "none", "#ec4899", 2)}${drawCircle(35, 36, 6, "#38bdf8", "#38bdf8")}`),
      figA, figB, figC
    ];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Figure A is to Figure B as Figure C is to which option?",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The inner shape becomes the new outer shape, while the outer shape shrinks to become the new inner core.\n2. Colors and fills exchange roles accordingly.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 3: Overlapping Core Subtraction
  (t, k, rand) => {
    const figA = wrapSvg(`${drawCircle(30, 35, 14, "#38bdf8", "none")}${drawCircle(40, 35, 14, "#38bdf8", "none")}`);
    const figB = wrapSvg(`<path d="M 35 25 A 14 14 0 0 1 35 45 A 14 14 0 0 1 35 25 Z" fill="#38bdf8" />`); // Intersection only!
    const figC = wrapSvg(`${drawRect(20, 25, 20, 20, "#f59e0b", "none")}${drawRect(30, 25, 20, 20, "#f59e0b", "none")}`);
    const correctSvg = wrapSvg(drawRect(30, 25, 10, 20, "#f59e0b", "none")); // Overlap rectangle!
    const distractors = [wrapSvg(drawRect(20, 25, 30, 20, "#f59e0b", "none")), figA, figB, figC];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure completes the intersection analogy?",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The transformation extracts ONLY the shared geometric intersection region.\n2. For two overlapping squares, the intersection is a rectangle of width 10.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 4: Rotation +90° and Vertex Doubling
  (t, k, rand) => {
    const figA = wrapSvg(drawPolygon(makePolygonPts(3, 20, 35, 35), "none", "#38bdf8", 2));
    const figB = wrapSvg(drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#38bdf8", 2)); // 3 -> 6
    const figC = wrapSvg(drawRect(20, 20, 30, 30, "none", "#a855f7", 2)); // 4 sides
    const correctSvg = wrapSvg(drawPolygon(makePolygonPts(8, 20, 35, 35), "none", "#a855f7", 2)); // 4 -> 8 (Octagon)
    const distractors = [wrapSvg(drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#a855f7", 2)), figA, figB, figC];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Determine the geometric transformation rule and complete the analogy:",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The vertex count doubles: Triangle (3 vertices) doubles to Hexagon (6 vertices).\n2. Square (4 vertices) doubles to Octagon (8 vertices).`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 5: Bisection and Displacement
  (t, k, rand) => {
    const figA = wrapSvg(drawCircle(35, 35, 18, "none", "#38bdf8", 2));
    const figB = wrapSvg(`
      <path d="M 28 17 A 18 18 0 0 0 28 53 Z" fill="none" stroke="#38bdf8" stroke-width="2" />
      <path d="M 42 17 A 18 18 0 0 1 42 53 Z" fill="none" stroke="#38bdf8" stroke-width="2" />
    `);
    const figC = wrapSvg(drawRect(20, 20, 30, 30, "none", "#f59e0b", 2));
    const correctSvg = wrapSvg(`
      ${drawRect(15, 20, 15, 30, "none", "#f59e0b", 2)}
      ${drawRect(40, 20, 15, 30, "none", "#f59e0b", 2)}
    `);
    const distractors = [wrapSvg(drawRect(20, 20, 30, 30, "none", "#f59e0b", 2)), figB, figC, figA];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Figure A is to Figure B as Figure C is to which option?",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The figure is bisected vertically down the center line and pulled apart horizontally.\n2. Bisecting the square yields two separated vertical rectangles.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 6: Radial Reversal (Outward vs Inward)
  (t, k, rand) => {
    const figA = wrapSvg(`${drawCircle(35, 35, 8, "none", "#38bdf8", 2)}${drawLine(35, 27, 35, 15, "#38bdf8", 2)}${drawLine(43, 35, 55, 35, "#38bdf8", 2)}${drawLine(35, 43, 35, 55, "#38bdf8", 2)}${drawLine(27, 35, 15, 35, "#38bdf8", 2)}`);
    const figB = wrapSvg(`${drawCircle(35, 35, 22, "none", "#38bdf8", 2)}${drawLine(35, 13, 35, 25, "#38bdf8", 2)}${drawLine(57, 35, 45, 35, "#38bdf8", 2)}${drawLine(35, 57, 35, 45, "#38bdf8", 2)}${drawLine(13, 35, 25, 35, "#38bdf8", 2)}`);
    const figC = wrapSvg(`${drawRect(28, 28, 14, 14, "none", "#38bdf8", 2)}${drawLine(35, 28, 35, 15, "#38bdf8", 2)}${drawLine(42, 35, 55, 35, "#38bdf8", 2)}${drawLine(35, 42, 35, 55, "#38bdf8", 2)}${drawLine(28, 35, 15, 35, "#38bdf8", 2)}`);
    const correctSvg = wrapSvg(`${drawRect(18, 18, 34, 34, "none", "#38bdf8", 2)}${drawLine(35, 18, 35, 28, "#38bdf8", 2)}${drawLine(52, 35, 42, 35, "#38bdf8", 2)}${drawLine(35, 52, 35, 42, "#38bdf8", 2)}${drawLine(18, 35, 28, 35, "#38bdf8", 2)}`);
    const distractors = [figA, figB, figC, wrapSvg(drawRect(18, 18, 34, 34, "none", "#38bdf8", 2))];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure satisfies the radial reversal analogy?",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The central shape expands to an outer boundary, and radiating spurs invert to point inwards towards the center.\n2. Applying this to C produces an outer square with spurs pointing inwards.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 7: Concentric Shell Multiplication (1 to 3 concentric rings)
  (t, k, rand) => {
    const figA = wrapSvg(drawCircle(35, 35, 20, "none", "#38bdf8", 2));
    const figB = wrapSvg(`${drawCircle(35, 35, 20, "none", "#38bdf8", 2)}${drawCircle(35, 35, 14, "none", "#38bdf8", 2)}${drawCircle(35, 35, 8, "none", "#38bdf8", 2)}`);
    const figC = wrapSvg(drawPolygon(makePolygonPts(3, 22, 35, 38), "none", "#a855f7", 2));
    const correctSvg = wrapSvg(`
      ${drawPolygon(makePolygonPts(3, 22, 35, 38), "none", "#a855f7", 2)}
      ${drawPolygon(makePolygonPts(3, 15, 35, 38), "none", "#a855f7", 2)}
      ${drawPolygon(makePolygonPts(3, 8, 35, 38), "none", "#a855f7", 2)}
    `);
    const distractors = [figB, figC, figA, wrapSvg(drawPolygon(makePolygonPts(3, 15, 35, 38), "#a855f7", "#a855f7", 1))];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Figure A is to Figure B as Figure C is to which option?",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The single geometric shape is duplicated into 3 nested concentric shells.\n2. A single triangle becomes 3 nested concentric triangles.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 8: 45° Shear Transformation (Square -> Parallelogram :: Circle -> Ellipse)
  (t, k, rand) => {
    const figA = wrapSvg(drawRect(20, 20, 30, 30, "none", "#38bdf8", 2));
    const figB = wrapSvg(drawPolygon("28,20 58,20 42,50 12,50", "none", "#38bdf8", 2)); // 45° sheared parallelogram
    const figC = wrapSvg(drawCircle(35, 35, 18, "none", "#f59e0b", 2));
    const correctSvg = wrapSvg(`<ellipse cx="35" cy="35" rx="20" ry="11" fill="none" stroke="#f59e0b" stroke-width="2" transform="rotate(-30 35 35)" />`);
    const distractors = [figC, figB, figA, wrapSvg(drawCircle(35, 35, 12, "none", "#f59e0b", 2))];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Complete the affine shear analogy:",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The square undergoes a planar diagonal shear into a tilted parallelogram.\n2. Under the identical affine shear, a circle deforms into a tilted ellipse.`,
      category: 'spatial', subType: 'analogy'
    };
  },

  // 9: Boundary Solid Toggle with Inverted Core Dot
  (t, k, rand) => {
    const figA = wrapSvg(`${drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#38bdf8", 2)}${drawCircle(35, 35, 5, "#38bdf8", "#38bdf8")}`);
    const figB = wrapSvg(`${drawPolygon(makePolygonPts(6, 20, 35, 35), "#38bdf8", "#38bdf8", 1)}${drawCircle(35, 35, 5, "#0f172a", "#0f172a")}`);
    const figC = wrapSvg(`${drawRect(20, 20, 30, 30, "none", "#ec4899", 2)}${drawCircle(35, 35, 5, "#ec4899", "#ec4899")}`);
    const correctSvg = wrapSvg(`${drawRect(20, 20, 30, 30, "#ec4899", "#ec4899", 1)}${drawCircle(35, 35, 5, "#0f172a", "#0f172a")}`);
    const distractors = [figA, figB, figC, wrapSvg(drawRect(20, 20, 30, 30, "#ec4899", "#ec4899", 1))];
    const { options, correctOption } = randomize([{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))], 0, rand);
    return {
      question: "Which figure correctly completes the fill inversion analogy?",
      analogySvg: { a: figA, b: figB, c: figC }, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Analogy Rule:**\n1. The outline body becomes completely filled with solid color, while the interior core dot inverts to hollow background color.\n2. Applying this to C produces a solid pink square containing a dark cutout center dot.`,
      category: 'spatial', subType: 'analogy'
    };
  }
];

// -------------------------------------------------------------
// POOL 5: NOVEL 3D FOLDING & NET ARCHETYPES (10 Types)
// -------------------------------------------------------------
export const FOLDING_ARCHETYPES = [
  // 0: Square Pyramid Net (Square base with 4 triangular flaps)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(25, 25, 20, 20, "none", "#38bdf8", 2)}
      ${drawPolygon("25,25 45,25 35,10", "none", "#38bdf8", 1.5)} <!-- Top flap -->
      ${drawPolygon("45,25 45,45 60,35", "none", "#38bdf8", 1.5)} <!-- Right flap -->
      ${drawPolygon("25,45 45,45 35,60", "none", "#38bdf8", 1.5)} <!-- Bottom flap -->
      ${drawPolygon("25,25 25,45 10,35", "none", "#38bdf8", 1.5)} <!-- Left flap -->
    `);
    const correctFolded = wrapSvg(`
      ${drawPolygon("35,15 15,45 40,55 55,38", "none", "#38bdf8", 2)}
      ${drawLine(35, 15, 40, 55, "#38bdf8", 2)}
      ${drawLine(35, 15, 55, 38, "#38bdf8", 2)}
    `);
    const wrongFolded1 = wrapSvg(`${drawRect(20, 20, 30, 30, "none", "#38bdf8", 2)}`); // Cube
    const wrongFolded2 = wrapSvg(`<ellipse cx="35" cy="35" rx="15" ry="25" fill="none" stroke="#38bdf8" stroke-width="2" />`);
    const wrongFolded3 = wrapSvg(`${drawPolygon(makePolygonPts(3, 20, 35, 35), "none", "#38bdf8", 2)}`);
    const wrongFolded4 = wrapSvg(`${drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#38bdf8", 2)}`);
    const { options, correctOption } = randomize([
      { svg: correctFolded }, { svg: wrongFolded1 }, { svg: wrongFolded2 }, { svg: wrongFolded3 }, { svg: wrongFolded4 }
    ], 0, rand);
    return {
      question: "When the unfolded flat 2D pattern is folded along the scored edges, which 3D solid figure is formed?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**3D Folding Rule:**\n1. The net consists of 1 central square base and 4 adjoining triangular lateral faces.\n2. Folding the 4 triangular flaps upward brings their apexes together to form a **Square Pyramid**.`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 1: Triangular Prism Net (3 rectangles in a row + 2 triangular end caps)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(12, 25, 15, 20, "none", "#38bdf8", 1.5)}
      ${drawRect(27, 25, 15, 20, "none", "#38bdf8", 1.5)}
      ${drawRect(42, 25, 15, 20, "none", "#38bdf8", 1.5)}
      ${drawPolygon("27,25 42,25 34.5,12", "none", "#38bdf8", 1.5)} <!-- Top triangle -->
      ${drawPolygon("27,45 42,45 34.5,58", "none", "#38bdf8", 1.5)} <!-- Bottom triangle -->
    `);
    const correctFolded = wrapSvg(`
      ${drawPolygon("20,20 35,12 48,24", "none", "#38bdf8", 2)}
      ${drawPolygon("20,44 35,36 48,48", "none", "#38bdf8", 2)}
      ${drawLine(20, 20, 20, 44, "#38bdf8", 2)}${drawLine(35, 12, 35, 36, "#38bdf8", 2)}${drawLine(48, 24, 48, 48, "#38bdf8", 2)}
    `);
    const wrongFolded1 = wrapSvg(`${drawPolygon("35,15 15,45 40,55 55,38", "none", "#38bdf8", 2)}`);
    const wrongFolded2 = wrapSvg(`${drawRect(20, 20, 30, 30, "none", "#38bdf8", 2)}`);
    const wrongFolded3 = wrapSvg(`<ellipse cx="35" cy="35" rx="15" ry="25" fill="none" stroke="#38bdf8" stroke-width="2" />`);
    const wrongFolded4 = wrapSvg(`${drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#38bdf8", 2)}`);
    const { options, correctOption } = randomize([
      { svg: correctFolded }, { svg: wrongFolded1 }, { wrongFolded2, svg: wrongFolded2 }, { svg: wrongFolded3 }, { svg: wrongFolded4 }
    ], 0, rand);
    return {
      question: "Which 3D solid is produced by folding this unfolded pattern?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**3D Folding Rule:**\n1. The net consists of 3 rectangular lateral faces connected in series, capped by 2 triangular bases on opposite sides.\n2. Folding yields a **Triangular Prism**.`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 2: T-Shaped Cube Net with Face Icons
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(25, 10, 15, 15, "none", "#cbd5e1", 1.5)}${drawText(32.5, 17.5, "●", "#38bdf8", 12)}
      ${drawRect(10, 25, 15, 15, "none", "#cbd5e1", 1.5)}${drawText(17.5, 32.5, "▲", "#f59e0b", 12)}
      ${drawRect(25, 25, 15, 15, "none", "#cbd5e1", 1.5)}${drawText(32.5, 32.5, "■", "#38bdf8", 12)}
      ${drawRect(40, 25, 15, 15, "none", "#cbd5e1", 1.5)}${drawText(47.5, 32.5, "★", "#a855f7", 12)}
      ${drawRect(25, 40, 15, 15, "none", "#cbd5e1", 1.5)}${drawText(32.5, 47.5, "✦", "#ec4899", 12)}
      ${drawRect(25, 55, 15, 15, "none", "#cbd5e1", 1.5)}${drawText(32.5, 62.5, "◆", "#e2e8f0", 12)}
    `);
    // Cube perspective showing Top (●), Front (■), Right (★):
    // In net: ● is top, ■ is center front, ★ is right. These 3 faces meet at a single vertex!
    const correctCube = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#cbd5e1", 1.5)}${drawText(35, 26, "●", "#38bdf8", 12)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#cbd5e1", 1.5)}${drawText(26.5, 45, "■", "#38bdf8", 12)}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#cbd5e1", 1.5)}${drawText(43.5, 45, "★", "#a855f7", 12)}
    `);
    // Impossible cube: ● and ✦ are opposite faces in net, so they can NEVER appear adjacent!
    const wrongCube1 = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#cbd5e1", 1.5)}${drawText(35, 26, "●", "#38bdf8", 12)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#cbd5e1", 1.5)}${drawText(26.5, 45, "✦", "#ec4899", 12)}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#cbd5e1", 1.5)}${drawText(43.5, 45, "★", "#a855f7", 12)}
    `);
    // Impossible cube: ▲ and ★ are opposite faces in net!
    const wrongCube2 = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#cbd5e1", 1.5)}${drawText(35, 26, "▲", "#f59e0b", 12)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#cbd5e1", 1.5)}${drawText(26.5, 45, "★", "#a855f7", 12)}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#cbd5e1", 1.5)}${drawText(43.5, 45, "■", "#38bdf8", 12)}
    `);
    // Impossible cube: ■ and ◆ are opposite faces in net!
    const wrongCube3 = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#cbd5e1", 1.5)}${drawText(35, 26, "■", "#38bdf8", 12)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#cbd5e1", 1.5)}${drawText(26.5, 45, "◆", "#e2e8f0", 12)}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#cbd5e1", 1.5)}${drawText(43.5, 45, "●", "#38bdf8", 12)}
    `);
    const wrongCube4 = wrapSvg(`${drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#cbd5e1", 1.5)}`);
    const { options, correctOption } = randomize([
      { svg: correctCube }, { svg: wrongCube1 }, { svg: wrongCube2 }, { svg: wrongCube3 }, { svg: wrongCube4 }
    ], 0, rand);
    return {
      question: "Which 3D isometric cube can be correctly folded from the labeled pattern?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Spatial Folding Rule:**\n1. Identify opposite pairs in the net: (● and ✦), (▲ and ★), (■ and ◆). Opposite faces can never be visible simultaneously.\n2. The correct cube displays mutually adjacent faces: Top (●), Front (■), and Right (★).`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 3: Tetrahedron Net (4 equilateral triangles)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawPolygon("35,20 20,46 50,46", "none", "#ec4899", 2)}
      ${drawPolygon("35,20 20,46 10,24", "none", "#ec4899", 1.5)}
      ${drawPolygon("35,20 50,46 60,24", "none", "#ec4899", 1.5)}
      ${drawPolygon("20,46 50,46 35,62", "none", "#ec4899", 1.5)}
    `);
    const correctFolded = wrapSvg(`
      ${drawPolygon("35,15 15,50 55,50", "none", "#ec4899", 2)}
      ${drawLine(35, 15, 35, 50, "#ec4899", 2)}
    `);
    const wrongFolded1 = wrapSvg(drawRect(20, 20, 30, 30, "none", "#ec4899", 2));
    const wrongFolded2 = wrapSvg(`<ellipse cx="35" cy="35" rx="15" ry="25" fill="none" stroke="#ec4899" stroke-width="2" />`);
    const wrongFolded3 = wrapSvg(drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#ec4899", 2));
    const wrongFolded4 = wrapSvg(drawPolygon(makePolygonPts(8, 20, 35, 35), "none", "#ec4899", 2));
    const { options, correctOption } = randomize([
      { svg: correctFolded }, { svg: wrongFolded1 }, { svg: wrongFolded2 }, { svg: wrongFolded3 }, { svg: wrongFolded4 }
    ], 0, rand);
    return {
      question: "Which regular 3D polyhedron is constructed by folding this triangular net?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**3D Folding Rule:**\n1. The net consists of 4 equilateral triangles.\n2. Folding the 3 outer triangles upward along the edges of the central base yields a **Regular Tetrahedron** (triangular pyramid with 4 faces).`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 4: Cylinder / Canister Net (Rectangle + 2 circular lids)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(15, 22, 40, 26, "none", "#38bdf8", 2)}
      ${drawCircle(35, 13, 9, "none", "#38bdf8", 1.5)}
      ${drawCircle(35, 57, 9, "none", "#38bdf8", 1.5)}
    `);
    const correctFolded = wrapSvg(`
      <ellipse cx="35" cy="20" rx="16" ry="6" fill="none" stroke="#38bdf8" stroke-width="2" />
      <ellipse cx="35" cy="50" rx="16" ry="6" fill="none" stroke="#38bdf8" stroke-width="2" />
      ${drawLine(19, 20, 19, 50, "#38bdf8", 2)}${drawLine(51, 20, 51, 50, "#38bdf8", 2)}
    `);
    const wrongFolded1 = wrapSvg(`${drawPolygon("35,15 15,45 40,55 55,38", "none", "#38bdf8", 2)}`);
    const wrongFolded2 = wrapSvg(`${drawRect(20, 20, 30, 30, "none", "#38bdf8", 2)}`);
    const wrongFolded3 = wrapSvg(`${drawPolygon(makePolygonPts(3, 20, 35, 35), "none", "#38bdf8", 2)}`);
    const wrongFolded4 = wrapSvg(`${drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#38bdf8", 2)}`);
    const { options, correctOption } = randomize([
      { svg: correctFolded }, { svg: wrongFolded1 }, { svg: wrongFolded2 }, { svg: wrongFolded3 }, { svg: wrongFolded4 }
    ], 0, rand);
    return {
      question: "Which 3D curved solid is formed by rolling and assembling this unfolded sheet?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**3D Folding Rule:**\n1. Rolling the rectangular body forms the lateral tube, and attaching the circular discs seals both ends.\n2. This forms a right circular **Cylinder**.`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 5: Cross-Shaped Cube Net with Corner Dots
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(25, 10, 15, 15, "none", "#cbd5e1", 1.5)}
      ${drawRect(10, 25, 15, 15, "none", "#cbd5e1", 1.5)}
      ${drawRect(25, 25, 15, 15, "none", "#cbd5e1", 1.5)}${drawCircle(28, 28, 2.5, "#38bdf8", "#38bdf8")}
      ${drawRect(40, 25, 15, 15, "none", "#cbd5e1", 1.5)}
      ${drawRect(25, 40, 15, 15, "none", "#cbd5e1", 1.5)}
      ${drawRect(25, 55, 15, 15, "none", "#cbd5e1", 1.5)}
    `);
    const correctCube = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#cbd5e1", 1.5)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#cbd5e1", 1.5)}${drawCircle(22, 33, 2.5, "#38bdf8", "#38bdf8")}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#cbd5e1", 1.5)}
    `);
    const wrongCube1 = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#cbd5e1", 1.5)}${drawCircle(35, 26, 2.5, "#38bdf8", "#38bdf8")}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#cbd5e1", 1.5)}${drawCircle(22, 33, 2.5, "#38bdf8", "#38bdf8")}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#cbd5e1", 1.5)}
    `); // 2 dots, net only has 1!
    const wrongCube2 = wrapSvg(`${drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#cbd5e1", 1.5)}`);
    const wrongCube3 = wrapSvg(`${drawPolygon(makePolygonPts(8, 20, 35, 35), "none", "#cbd5e1", 1.5)}`);
    const wrongCube4 = wrapSvg(drawRect(20, 20, 30, 30, "none", "#cbd5e1", 2));
    const { options, correctOption } = randomize([
      { svg: correctCube }, { svg: wrongCube1 }, { svg: wrongCube2 }, { svg: wrongCube3 }, { svg: wrongCube4 }
    ], 0, rand);
    return {
      question: "Which 3D cube accurately displays the single indicator dot from the unfolded net?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Spatial Rule:**\n1. The indicator dot is placed in the top-left corner of the central face.\n2. When folded into 3D, the dot remains positioned on the upper-left boundary of that front face.`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 6: Pentagonal Pyramid Net (1 pentagon + 5 triangular flaps)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawPolygon(makePolygonPts(5, 14, 35, 35), "none", "#38bdf8", 2)}
      ${drawPolygon("35,21 44,27 48,12", "none", "#38bdf8", 1.5)}
      ${drawPolygon("44,27 41,41 58,38", "none", "#38bdf8", 1.5)}
      ${drawPolygon("41,41 29,41 35,58", "none", "#38bdf8", 1.5)}
      ${drawPolygon("29,41 26,27 12,38", "none", "#38bdf8", 1.5)}
      ${drawPolygon("26,27 35,21 22,12", "none", "#38bdf8", 1.5)}
    `);
    const correctFolded = wrapSvg(`
      ${drawPolygon("35,14 18,38 30,52 48,46 54,32", "none", "#38bdf8", 2)}
      ${drawLine(35, 14, 30, 52, "#38bdf8", 2)}${drawLine(35, 14, 48, 46, "#38bdf8", 2)}
    `);
    const wrongFolded1 = wrapSvg(drawRect(20, 20, 30, 30, "none", "#38bdf8", 2));
    const wrongFolded2 = wrapSvg(`<ellipse cx="35" cy="35" rx="15" ry="25" fill="none" stroke="#38bdf8" stroke-width="2" />`);
    const wrongFolded3 = wrapSvg(drawPolygon(makePolygonPts(3, 20, 35, 35), "none", "#38bdf8", 2));
    const wrongFolded4 = wrapSvg(drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#38bdf8", 2));
    const { options, correctOption } = randomize([
      { svg: correctFolded }, { svg: wrongFolded1 }, { svg: wrongFolded2 }, { svg: wrongFolded3 }, { svg: wrongFolded4 }
    ], 0, rand);
    return {
      question: "Which 3D solid is formed by folding this 5-flap pattern?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**3D Folding Rule:**\n1. The net consists of 1 central 5-sided pentagon base with 5 adjoining triangular flaps.\n2. Folding the flaps upward brings them together to form a **Pentagonal Pyramid**.`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 7: Truncated Box / Open Tray Net (Rectangle with 4 corner cutouts)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(18, 18, 34, 34, "none", "#a855f7", 2)}
      ${drawRect(18, 18, 8, 8, "#0f172a", "#334155", 1)} <!-- Corner cutouts -->
      ${drawRect(44, 18, 8, 8, "#0f172a", "#334155", 1)}
      ${drawRect(44, 44, 8, 8, "#0f172a", "#334155", 1)}
      ${drawRect(18, 44, 8, 8, "#0f172a", "#334155", 1)}
    `);
    const correctFolded = wrapSvg(`
      ${drawPolygon("20,26 44,26 52,38 28,38", "none", "#a855f7", 2)}
      ${drawLine(20, 26, 20, 42, "#a855f7", 2)}${drawLine(28, 38, 28, 54, "#a855f7", 2)}
      ${drawLine(52, 38, 52, 54, "#a855f7", 2)}${drawLine(20, 42, 28, 54, "#a855f7", 2)}
      ${drawLine(28, 54, 52, 54, "#a855f7", 2)}
    `); // Open top isometric tray
    const wrongFolded1 = wrapSvg(drawRect(20, 20, 30, 30, "none", "#a855f7", 2));
    const wrongFolded2 = wrapSvg(`<ellipse cx="35" cy="35" rx="15" ry="25" fill="none" stroke="#a855f7" stroke-width="2" />`);
    const wrongFolded3 = wrapSvg(drawPolygon(makePolygonPts(3, 20, 35, 35), "none", "#a855f7", 2));
    const wrongFolded4 = wrapSvg(drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#a855f7", 2));
    const { options, correctOption } = randomize([
      { svg: correctFolded }, { svg: wrongFolded1 }, { svg: wrongFolded2 }, { svg: wrongFolded3 }, { svg: wrongFolded4 }
    ], 0, rand);
    return {
      question: "When the 4 outer flaps are folded upward at 90°, which 3D object is created?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**3D Folding Rule:**\n1. Removing the 4 square corners allows the remaining 4 side tabs to fold vertically upward.\n2. This constructs an **Open Rectangular Tray / Shallow Box**.`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 8: Hexagonal Prism Net (6 panels in a strip + 2 hexagonal end caps)
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(10, 28, 50, 14, "none", "#38bdf8", 1.5)}
      ${drawLine(18.3, 28, 18.3, 42, "#38bdf8", 1)}${drawLine(26.6, 28, 26.6, 42, "#38bdf8", 1)}
      ${drawLine(35, 28, 35, 42, "#38bdf8", 1)}${drawLine(43.3, 28, 43.3, 42, "#38bdf8", 1)}
      ${drawLine(51.6, 28, 51.6, 42, "#38bdf8", 1)}
      ${drawPolygon(makePolygonPts(6, 7, 30.8, 21), "none", "#38bdf8", 1.5)}
      ${drawPolygon(makePolygonPts(6, 7, 30.8, 49), "none", "#38bdf8", 1.5)}
    `);
    const correctFolded = wrapSvg(`
      ${drawPolygon(makePolygonPts(6, 15, 35, 24), "none", "#38bdf8", 2)}
      ${drawPolygon(makePolygonPts(6, 15, 35, 46), "none", "#38bdf8", 2)}
      ${drawLine(20, 24, 20, 46, "#38bdf8", 2)}${drawLine(50, 24, 50, 46, "#38bdf8", 2)}
    `);
    const wrongFolded1 = wrapSvg(drawRect(20, 20, 30, 30, "none", "#38bdf8", 2));
    const wrongFolded2 = wrapSvg(`<ellipse cx="35" cy="35" rx="15" ry="25" fill="none" stroke="#38bdf8" stroke-width="2" />`);
    const wrongFolded3 = wrapSvg(drawPolygon(makePolygonPts(3, 20, 35, 35), "none", "#38bdf8", 2));
    const wrongFolded4 = wrapSvg(drawPolygon("35,15 15,45 40,55 55,38", "none", "#38bdf8", 2));
    const { options, correctOption } = randomize([
      { svg: correctFolded }, { svg: wrongFolded1 }, { svg: wrongFolded2 }, { svg: wrongFolded3 }, { svg: wrongFolded4 }
    ], 0, rand);
    return {
      question: "Which 3D prismatic solid is formed by assembling this pattern?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**3D Folding Rule:**\n1. 6 rectangular panels wrap into a hexagonal perimeter sleeve.\n2. The two hexagonal caps close the top and bottom to form a **Hexagonal Prism**.`,
      category: 'spatial', subType: 'folding'
    };
  },

  // 9: Z-Shaped Stair Cube Net
  (t, k, rand) => {
    const netSvg = wrapSvg(`
      ${drawRect(12, 16, 14, 14, "none", "#f59e0b", 1.5)}${drawText(19, 23, "1", "#f59e0b", 10)}
      ${drawRect(26, 16, 14, 14, "none", "#f59e0b", 1.5)}${drawText(33, 23, "2", "#f59e0b", 10)}
      ${drawRect(26, 30, 14, 14, "none", "#f59e0b", 1.5)}${drawText(33, 37, "3", "#f59e0b", 10)}
      ${drawRect(26, 44, 14, 14, "none", "#f59e0b", 1.5)}${drawText(33, 51, "4", "#f59e0b", 10)}
      ${drawRect(40, 44, 14, 14, "none", "#f59e0b", 1.5)}${drawText(47, 51, "5", "#f59e0b", 10)}
      ${drawRect(40, 58, 14, 14, "none", "#f59e0b", 1.5)}${drawText(47, 65, "6", "#f59e0b", 10)}
    `);
    // Opposite pairs: (1, 5), (2, 4), (3, 6)
    const correctCube = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#f59e0b", 1.5)}${drawText(35, 26, "2", "#f59e0b", 10)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#f59e0b", 1.5)}${drawText(26.5, 45, "3", "#f59e0b", 10)}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#f59e0b", 1.5)}${drawText(43.5, 45, "5", "#f59e0b", 10)}
    `);
    // Impossible: 2 and 4 are opposite, cannot be adjacent
    const wrongCube1 = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#f59e0b", 1.5)}${drawText(35, 26, "2", "#f59e0b", 10)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#f59e0b", 1.5)}${drawText(26.5, 45, "4", "#f59e0b", 10)}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#f59e0b", 1.5)}${drawText(43.5, 45, "3", "#f59e0b", 10)}
    `);
    // Impossible: 3 and 6 are opposite, cannot be adjacent
    const wrongCube2 = wrapSvg(`
      ${drawPolygon("35,16 52,26 35,36 18,26", "none", "#f59e0b", 1.5)}${drawText(35, 26, "3", "#f59e0b", 10)}
      ${drawPolygon("18,26 35,36 35,54 18,44", "none", "#f59e0b", 1.5)}${drawText(26.5, 45, "6", "#f59e0b", 10)}
      ${drawPolygon("52,26 35,36 35,54 52,44", "none", "#f59e0b", 1.5)}${drawText(43.5, 45, "1", "#f59e0b", 10)}
    `);
    const wrongCube3 = wrapSvg(drawRect(20, 20, 30, 30, "none", "#f59e0b", 2));
    const wrongCube4 = wrapSvg(drawPolygon(makePolygonPts(6, 20, 35, 35), "none", "#f59e0b", 2));
    const { options, correctOption } = randomize([
      { svg: correctCube }, { svg: wrongCube1 }, { svg: wrongCube2 }, { svg: wrongCube3 }, { svg: wrongCube4 }
    ], 0, rand);
    return {
      question: "Which numbered cube can be folded from this step-stair net?",
      figureSvg: [netSvg], options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Spatial Rule:**\n1. Opposite pairs in this step-stair net are: (1, 5), (2, 4), and (3, 6).\n2. Faces 2, 3, and 5 meet at a common vertex and are all mutually adjacent, making their simultaneous appearance valid.`,
      category: 'spatial', subType: 'folding'
    };
  }
];

// -------------------------------------------------------------
// UNIFIED TEST EXTRACTOR FOR TESTS 2 THROUGH 30
// -------------------------------------------------------------
export function getSpatialQuestionsForTest(testNumber, isNewSuite = false) {
  const rand = pseudoRandom(testNumber * 9973 + 7717);
  const isNew = isNewSuite || testNumber > 30;
  const k = isNew ? (testNumber > 30 ? testNumber - 31 : testNumber - 2) : (testNumber - 2);

  // Stride-based selection from the enlarged pools ensures that
  // consecutive tests have ZERO identical spatial questions!
  const sStart = (k * 3) % SERIES_ARCHETYPES.length;
  const seriesIdxs = [
    sStart,
    (sStart + 1) % SERIES_ARCHETYPES.length,
    (sStart + 2) % SERIES_ARCHETYPES.length
  ];

  const mStart = (k * 2) % MATRIX_ARCHETYPES.length;
  const matrixIdxs = [
    mStart,
    (mStart + 1) % MATRIX_ARCHETYPES.length
  ];

  const oStart = (k * 3) % ODD_ARCHETYPES.length;
  const oddIdxs = [
    oStart,
    (oStart + 1) % ODD_ARCHETYPES.length,
    (oStart + 2) % ODD_ARCHETYPES.length
  ];

  const aStart = (k * 2) % ANALOGY_ARCHETYPES.length;
  const analogyIdxs = [
    aStart,
    (aStart + 1) % ANALOGY_ARCHETYPES.length
  ];

  const foldIdx = k % FOLDING_ARCHETYPES.length;

  const seriesCycle = isNew ? (Math.floor(k / 6) + 1) : 0;
  const matrixCycle = isNew ? (Math.floor(k / 6) + 1) : 0;
  const oddCycle = isNew ? (Math.floor(k / 6) + 1) : 0;
  const analogyCycle = isNew ? (Math.floor(k / 5) + 1) : 0;
  const foldingCycle = isNew ? (Math.floor(k / 10) + 1) : 0;

  const modulateSvg = (svgStr, cycle) => {
    if (!svgStr || cycle === 0) return svgStr;
    const transforms = [
      '',
      'transform="rotate(90 35 35)"',
      'transform="rotate(180 35 35)"',
      'transform="rotate(270 35 35)"',
      'transform="translate(70, 0) scale(-1, 1)"',
      'transform="translate(0, 70) scale(1, -1)"'
    ];
    const t = transforms[cycle % transforms.length];
    if (!t) return svgStr;
    return svgStr.replace(/<svg\s+([^>]+)>/i, `<svg $1><g ${t}>`).replace(/<\/svg>/i, '</g></svg>');
  };

  const modQ = (q, cycle) => {
    if (cycle === 0) return q;
    let figureSvg = q.figureSvg;
    if (Array.isArray(figureSvg)) {
      figureSvg = figureSvg.map(s => modulateSvg(s, cycle));
    } else if (typeof figureSvg === 'string') {
      figureSvg = modulateSvg(figureSvg, cycle);
    }
    const options = q.options.map(opt => {
      if (opt.svg) {
        return { ...opt, svg: modulateSvg(opt.svg, cycle) };
      }
      return opt;
    });
    return { ...q, figureSvg, options };
  };

  const questions = [
    modQ(SERIES_ARCHETYPES[seriesIdxs[0]](testNumber, k, rand), seriesCycle),
    modQ(SERIES_ARCHETYPES[seriesIdxs[1]](testNumber, k + 1, rand), seriesCycle),
    modQ(SERIES_ARCHETYPES[seriesIdxs[2]](testNumber, k + 2, rand), seriesCycle),

    modQ(MATRIX_ARCHETYPES[matrixIdxs[0]](testNumber, k, rand), matrixCycle),
    modQ(MATRIX_ARCHETYPES[matrixIdxs[1]](testNumber, k + 1, rand), matrixCycle),

    modQ(ODD_ARCHETYPES[oddIdxs[0]](testNumber, k, rand), oddCycle),
    modQ(ODD_ARCHETYPES[oddIdxs[1]](testNumber, k + 1, rand), oddCycle),
    modQ(ODD_ARCHETYPES[oddIdxs[2]](testNumber, k + 2, rand), oddCycle),

    modQ(ANALOGY_ARCHETYPES[analogyIdxs[0]](testNumber, k, rand), analogyCycle),
    modQ(ANALOGY_ARCHETYPES[analogyIdxs[1]](testNumber, k + 1, rand), analogyCycle),

    modQ(FOLDING_ARCHETYPES[foldIdx](testNumber, k, rand), foldingCycle)
  ];

  // Deterministically shuffle within the test
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  // Color Giveaway Prevention Guard for New / Unattempted Suite:
  // Normalize all SVG colors across figures and options so choices are never given away by color.
  if (isNew) {
    return questions.map(q => {
      let figureSvg = q.figureSvg;
      if (typeof figureSvg === 'string') {
        figureSvg = figureSvg.replace(/#10b981/gi, '#38bdf8').replace(/#22c55e/gi, '#38bdf8').replace(/#16a34a/gi, '#38bdf8');
      } else if (Array.isArray(figureSvg)) {
        figureSvg = figureSvg.map(s => s.replace(/#10b981/gi, '#38bdf8').replace(/#22c55e/gi, '#38bdf8').replace(/#16a34a/gi, '#38bdf8'));
      }

      let analogySvg = q.analogySvg;
      if (analogySvg) {
        analogySvg = {
          a: analogySvg.a ? analogySvg.a.replace(/#10b981/gi, '#38bdf8').replace(/#22c55e/gi, '#38bdf8') : undefined,
          b: analogySvg.b ? analogySvg.b.replace(/#10b981/gi, '#38bdf8').replace(/#22c55e/gi, '#38bdf8') : undefined,
          c: analogySvg.c ? analogySvg.c.replace(/#10b981/gi, '#38bdf8').replace(/#22c55e/gi, '#38bdf8') : undefined,
        };
      }

      const sanitizedOptions = (q.options || []).map(opt => {
        if (!opt.svg) return opt;
        let s = opt.svg;
        s = s.replace(/#10b981/gi, '#38bdf8')
             .replace(/#22c55e/gi, '#38bdf8')
             .replace(/#16a34a/gi, '#38bdf8')
             .replace(/#ec4899/gi, '#38bdf8')
             .replace(/#a855f7/gi, '#38bdf8');
        return { ...opt, svg: s };
      });

      return { ...q, figureSvg, analogySvg, options: sanitizedOptions };
    });
  }

  return questions;
}
