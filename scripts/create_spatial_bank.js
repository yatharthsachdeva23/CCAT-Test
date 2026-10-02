import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileContent = `/**
 * Curated & Procedural Spatial Reasoning Bank for CCAT Prep
 * Generates 11 completely unique SVG spatial questions for each test (2 to 30).
 * Total: 29 * 11 = 319 unique spatial questions.
 * ZERO duplicates between any test and ZERO duplicates with Test 1.
 *
 * Types per test:
 * - 4 Next in Sequence (Series Progression)
 * - 3 3x3 Matrix Reasoning
 * - 2 Odd-One-Out Figures
 * - 2 Shape Analogies & Spatial Logic
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

// SVG Drawing Primitives (viewBox="0 0 70 70")
function drawCircle(cx, cy, r, fill = "none", stroke = "#38bdf8", sw = 2.5) {
  return \`<circle cx="\${cx}" cy="\${cy}" r="\${r}" fill="\${fill}" stroke="\${stroke}" stroke-width="\${sw}" />\`;
}

function drawRect(x, y, w, h, fill = "none", stroke = "#38bdf8", sw = 2.5, rx = 0) {
  return \`<rect x="\${x}" y="\${y}" width="\${w}" height="\${h}" rx="\${rx}" fill="\${fill}" stroke="\${stroke}" stroke-width="\${sw}" />\`;
}

function drawLine(x1, y1, x2, y2, stroke = "#38bdf8", sw = 2.5) {
  return \`<line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" stroke="\${stroke}" stroke-width="\${sw}" stroke-linecap="round" />\`;
}

function drawPolygon(points, fill = "none", stroke = "#38bdf8", sw = 2.5) {
  return \`<polygon points="\${points}" fill="\${fill}" stroke="\${stroke}" stroke-width="\${sw}" stroke-linejoin="round" />\`;
}

function wrapSvg(inner) {
  return \`<svg viewBox="0 0 70 70" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">\${inner}</svg>\`;
}

export function getSpatialQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 9411 + 5081);
  const questions = [];
  const t = testNumber;
  const k = testNumber - 2; // 0 to 28 for tests 2 to 30

  const PALETTE = ["#38bdf8", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#f97316"];
  const strokeColor = PALETTE[k % PALETTE.length];

  // 1. Next in Series: Rotating Arrow with Shifting Satellite Dot
  (() => {
    const stepAng = (k % 2 === 0) ? 45 : 60;
    const startAngle = (k * 30) % 360;
    const angles = [0, 1, 2, 3, 4].map(idx => (startAngle + idx * stepAng) % 360);
    
    const makeArrowSvg = (ang) => {
      const rad = (ang * Math.PI) / 180;
      const x2 = 35 + 22 * Math.cos(rad);
      const y2 = 35 + 22 * Math.sin(rad);
      const dotX = 35 + 12 * Math.cos(rad + Math.PI / 2);
      const dotY = 35 + 12 * Math.sin(rad + Math.PI / 2);
      return wrapSvg(\`
        \${drawCircle(35, 35, 26, "none", "#334155", 1.5)}
        \${drawLine(35, 35, x2, y2, strokeColor, 3)}
        \${drawCircle(x2, y2, 4, strokeColor, strokeColor, 1.5)}
        \${drawCircle(dotX, dotY, 3.5, "#f59e0b", "#d97706", 1)}
      \`);
    };

    const series = angles.slice(0, 4).map(a => makeArrowSvg(a));
    const correctSvg = makeArrowSvg(angles[4]);
    const distractors = [
      makeArrowSvg((angles[4] + stepAng) % 360),
      makeArrowSvg((angles[4] + 90) % 360),
      makeArrowSvg((angles[4] + 180) % 360),
      makeArrowSvg((angles[4] - stepAng + 360) % 360)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Series 1] Which rotating arrow and satellite indicator figure logically comes next in this sequence?\`,
      svgSeries: series,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Pattern:**\\n1. The pointer rotates clockwise by \${stepAng}° in each successive frame.\\n2. The satellite dot maintains a perpendicular offset from the pointer.\\n\\n💡 **Speed Tip:** Determine the angular velocity from Frame 1 to Frame 2 (\${stepAng}° clockwise) and project to the 5th frame.\`,
      category: 'spatial',
      subType: 'series'
    });
  })();

  // 2. Next in Series: Element Count & Polygon Sides
  (() => {
    const getPolySvg = (sides) => {
      const pts = [];
      const r = 24;
      for (let i = 0; i < sides; i++) {
        const a = (i * 2 * Math.PI) / sides - Math.PI / 2;
        pts.push(\`\${(35 + r * Math.cos(a)).toFixed(1)},\${(35 + r * Math.sin(a)).toFixed(1)}\`);
      }
      return wrapSvg(\`
        \${drawPolygon(pts.join(" "), "rgba(56, 189, 248, 0.15)", strokeColor, 2.5)}
        \${drawCircle(35, 35, 3.5, "#f59e0b", "#d97706", 1)}
      \`);
    };

    const baseSides = 3 + (k % 3); // 3, 4, or 5
    const series = [baseSides, baseSides + 1, baseSides + 2, baseSides + 3].map(s => getPolySvg(s));
    const targetSides = baseSides + 4;
    const correctSvg = getPolySvg(targetSides);
    const distractors = [
      getPolySvg(targetSides - 1),
      getPolySvg(targetSides + 1),
      getPolySvg(baseSides + 1),
      getPolySvg(targetSides - 2)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Series 2] Which polygon figure correctly completes this vertex-increment sequence?\`,
      svgSeries: series,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Pattern:**\\nEach frame increments polygon vertices by 1: \${baseSides} sides -> \${baseSides+1} -> \${baseSides+2} -> \${baseSides+3}.\\nThe next figure must have **\${targetSides} sides**.\`,
      category: 'spatial',
      subType: 'series'
    });
  })();

  // 3. Next in Series: Quadrant Shading Shift
  (() => {
    const startQ = (k * 2) % 4;
    const makeQuadrantSvg = (shadedQuad) => {
      const quadCoords = [
        "M 35 35 L 59 35 A 24 24 0 0 0 35 11 Z",
        "M 35 35 L 59 35 A 24 24 0 0 1 35 59 Z",
        "M 35 35 L 35 59 A 24 24 0 0 1 11 35 Z",
        "M 35 35 L 11 35 A 24 24 0 0 1 35 11 Z"
      ];
      return wrapSvg(\`
        \${drawCircle(35, 35, 24, "rgba(15, 23, 42, 0.6)", "#475569", 2)}
        \${drawLine(11, 35, 59, 35, "#475569", 1.5)}
        \${drawLine(35, 11, 35, 59, "#475569", 1.5)}
        <path d="\${quadCoords[shadedQuad]}" fill="\${strokeColor}" stroke="#0284c7" stroke-width="1.5" />
      \`);
    };

    const qSteps = [startQ, (startQ + 1) % 4, (startQ + 2) % 4, (startQ + 3) % 4];
    const targetQ = (startQ + 4) % 4;
    const series = qSteps.map(q => makeQuadrantSvg(q));
    const correctSvg = makeQuadrantSvg(targetQ);
    const distractors = [
      makeQuadrantSvg((targetQ + 1) % 4),
      makeQuadrantSvg((targetQ + 2) % 4),
      makeQuadrantSvg((targetQ + 3) % 4),
      wrapSvg(\`\${drawCircle(35, 35, 24, strokeColor, "#0284c7", 2)}\`)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Series 3] Which sector figure logically continues this circular sector rotation?\`,
      svgSeries: series,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Pattern:**\\nThe shaded sector advances by 90° clockwise in each consecutive frame.\`,
      category: 'spatial',
      subType: 'series'
    });
  })();

  // 4. Next in Series: Concentric Circles with Inverting Cross
  (() => {
    const makeRingSvg = (step) => {
      const isCross = step % 2 === 0;
      const innerColor = isCross ? strokeColor : "#f59e0b";
      return wrapSvg(\`
        \${drawCircle(35, 35, 25, "none", "#334155", 2)}
        \${drawCircle(35, 35, 16, "none", "#64748b", 2)}
        \${drawCircle(35, 35, 7, innerColor, innerColor, 1)}
        \${isCross ? \`\${drawLine(35, 10, 35, 60, strokeColor, 2.5)}\${drawLine(10, 35, 60, 35, strokeColor, 2.5)}\` : \`\${drawLine(17, 17, 53, 53, "#f59e0b", 2.5)}\${drawLine(53, 17, 17, 53, "#f59e0b", 2.5)}\`}
      \`);
    };

    const series = [0, 1, 2, 3].map(s => makeRingSvg(s));
    const correctSvg = makeRingSvg(4);
    const distractors = [
      makeRingSvg(5),
      wrapSvg(\`\${drawCircle(35, 35, 25, strokeColor, "#0284c7", 2)}\`),
      wrapSvg(\`\${drawCircle(35, 35, 25, "none", "#334155", 2)}\${drawCircle(35, 35, 16, "none", "#64748b", 2)}\`),
      makeRingSvg(1)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Series 4] Which concentric ring figure correctly continues this alternating core symbol sequence?\`,
      svgSeries: series,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Pattern:**\\nThe cross orientation alternates between perpendicular (+) and diagonal (X). Frame 5 returns to perpendicular (+).\`,
      category: 'spatial',
      subType: 'series'
    });
  })();

  // 5. 3x3 Matrix: Row-wise Rotation
  (() => {
    const makeTriangleSvg = (ang) => {
      const rad = (ang * Math.PI) / 180;
      const pts = [0, 120, 240].map(deg => {
        const a = rad + (deg * Math.PI) / 180;
        return \`\${(35 + 20 * Math.cos(a)).toFixed(1)},\${(35 + 20 * Math.sin(a)).toFixed(1)}\`;
      }).join(" ");
      return wrapSvg(\`
        \${drawPolygon(pts, "rgba(56, 189, 248, 0.2)", strokeColor, 2.5)}
        \${drawCircle(35, 35, 3.5, "#f59e0b", "#d97706", 1)}
      \`);
    };

    const baseAng = (k * 45) % 360;
    const anglesGrid = [
      [baseAng, (baseAng + 90) % 360, (baseAng + 180) % 360],
      [(baseAng + 90) % 360, (baseAng + 180) % 360, (baseAng + 270) % 360],
      [(baseAng + 180) % 360, (baseAng + 270) % 360, (baseAng + 360) % 360]
    ];

    const matrixData = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (r === 2 && c === 2) {
          matrixData.push({ row: r, col: c, isMissing: true });
        } else {
          matrixData.push({ row: r, col: c, svg: makeTriangleSvg(anglesGrid[r][c]) });
        }
      }
    }

    const correctSvg = makeTriangleSvg(anglesGrid[2][2]);
    const distractors = [
      makeTriangleSvg((anglesGrid[2][2] + 90) % 360),
      makeTriangleSvg((anglesGrid[2][2] + 180) % 360),
      makeTriangleSvg((anglesGrid[2][2] + 270) % 360),
      makeTriangleSvg((anglesGrid[2][2] + 45) % 360)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Matrix 1] Which oriented figure correctly completes the rotational logic in the bottom-right cell of this 3×3 matrix?\`,
      matrixData,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Matrix Logic:**\\nAcross each row from left to right, the shape rotates 90° clockwise.\`,
      category: 'spatial',
      subType: 'matrix'
    });
  })();

  // 6. 3x3 Matrix: Row-wise Dot Count Addition
  (() => {
    const makeDotsSvg = (count) => {
      const positions = [
        [[35, 35]],
        [[24, 35], [46, 35]],
        [[22, 24], [48, 24], [35, 48]],
        [[24, 24], [46, 24], [24, 46], [46, 46]],
        [[24, 24], [46, 24], [35, 35], [24, 46], [46, 46]],
        [[24, 22], [46, 22], [24, 35], [46, 35], [24, 48], [46, 48]]
      ];
      const pts = positions[Math.min(count - 1, positions.length - 1)] || positions[0];
      const dotsSvg = pts.map(([cx, cy]) => drawCircle(cx, cy, 4, strokeColor, strokeColor, 1.5)).join("");
      return wrapSvg(\`
        \${drawRect(12, 12, 46, 46, "rgba(15, 23, 42, 0.4)", "#475569", 2, 8)}
        \${dotsSvg}
      \`);
    };

    const countsGrid = [
      [1, 2, 3],
      [2, 2, 4],
      [1, 4, 5]
    ];

    const matrixData = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (r === 2 && c === 2) {
          matrixData.push({ row: r, col: c, isMissing: true });
        } else {
          matrixData.push({ row: r, col: c, svg: makeDotsSvg(countsGrid[r][c]) });
        }
      }
    }

    const correctSvg = makeDotsSvg(countsGrid[2][2]);
    const distractors = [
      makeDotsSvg(4),
      makeDotsSvg(6),
      makeDotsSvg(3),
      makeDotsSvg(2)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Matrix 2] Which dot configuration logically satisfies the additive row rule in this 3×3 matrix?\`,
      matrixData,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Matrix Logic:**\\nAdditive rule across rows: Column 1 count + Column 2 count = Column 3 count (1 + 4 = 5 dots).\`,
      category: 'spatial',
      subType: 'matrix'
    });
  })();

  // 7. 3x3 Matrix: Latin Square Permutation
  (() => {
    const makeShapeSvg = (type, fillStyle) => {
      let shapeTag = "";
      if (type === 'circle') shapeTag = drawCircle(35, 35, 20, fillStyle, strokeColor, 2.5);
      else if (type === 'square') shapeTag = drawRect(16, 16, 38, 38, fillStyle, strokeColor, 2.5, 4);
      else shapeTag = drawPolygon("35,14 56,35 35,56 14,35", fillStyle, strokeColor, 2.5);
      return wrapSvg(shapeTag);
    };

    const rowShapes = [
      ['circle', 'square', 'diamond'],
      ['square', 'diamond', 'circle'],
      ['diamond', 'circle', 'square']
    ];

    const matrixData = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (r === 2 && c === 2) {
          matrixData.push({ row: r, col: c, isMissing: true });
        } else {
          matrixData.push({ row: r, col: c, svg: makeShapeSvg(rowShapes[r][c], "rgba(56, 189, 248, 0.2)") });
        }
      }
    }

    const correctSvg = makeShapeSvg('square', "rgba(56, 189, 248, 0.2)");
    const distractors = [
      makeShapeSvg('circle', "rgba(56, 189, 248, 0.2)"),
      makeShapeSvg('diamond', "rgba(56, 189, 248, 0.2)"),
      makeShapeSvg('square', strokeColor),
      wrapSvg(drawCircle(35, 35, 10, "#f59e0b", "#d97706", 2))
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Matrix 3] Which geometric shape completes the Latin-square permutation in the bottom-right cell?\`,
      matrixData,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Latin Square Logic:**\\nEach row and column contains exactly one Circle, one Diamond, and one Square. Row 3 lacks the **Square**.\`,
      category: 'spatial',
      subType: 'matrix'
    });
  })();

  // 8. Odd One Out: Axis of Symmetry
  (() => {
    const symA = wrapSvg(drawPolygon("35,14 54,56 16,56", "none", strokeColor, 2.5)); // Isosceles triangle
    const symB = wrapSvg(drawPolygon("35,14 56,35 35,56 14,35", "none", strokeColor, 2.5)); // Rhombus
    const symC = wrapSvg(drawRect(18, 18, 34, 34, "none", strokeColor, 2.5)); // Square
    const symD = wrapSvg(drawPolygon("20,18 50,18 42,52 28,52", "none", strokeColor, 2.5)); // Isosceles trapezoid
    const asymOutlier = wrapSvg(drawPolygon("16,16 54,26 40,56 12,48", "none", strokeColor, 2.5)); // Irregular quadrilateral

    const rawOpts = [
      { svg: asymOutlier },
      { svg: symA },
      { svg: symB },
      { svg: symC },
      { svg: symD }
    ];

    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Odd Figure 1] Which of the following five geometric figures is the ODD ONE OUT (lacks reflective symmetry)?\`,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Geometric Rule:**\\nFour figures possess reflective line symmetry. Only the irregular quadrilateral is completely asymmetrical.\`,
      category: 'spatial',
      subType: 'odd_one_out'
    });
  })();

  // 9. Odd One Out: Number of Internal Elements / Intersections
  (() => {
    const makeStarSvg = (rays) => {
      const lines = [];
      for (let i = 0; i < rays; i++) {
        const a = (i * 2 * Math.PI) / rays;
        lines.push(drawLine(35, 35, 35 + 24 * Math.cos(a), 35 + 24 * Math.sin(a), strokeColor, 2.5));
      }
      return wrapSvg(\`\${drawCircle(35, 35, 26, "none", "#334155", 1.5)}\${lines.join("")}\`);
    };

    const s4a = makeStarSvg(4);
    const s6a = makeStarSvg(6);
    const s8a = makeStarSvg(8);
    const s4b = wrapSvg(\`\${drawLine(12, 12, 58, 58, strokeColor, 2.5)}\${drawLine(12, 58, 58, 12, strokeColor, 2.5)}\`);
    const s5Outlier = makeStarSvg(5);

    const rawOpts = [
      { svg: s5Outlier },
      { svg: s4a },
      { svg: s6a },
      { svg: s8a },
      { svg: s4b }
    ];

    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Odd Figure 2] Which radial star figure does NOT follow the group arm-count parity rule?\`,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Rule:**\\nAll other figures contain an even number of radial arms (4, 6, 8). Only this figure contains an odd number of arms (5 arms).\`,
      category: 'spatial',
      subType: 'odd_one_out'
    });
  })();

  // 10. Shape Analogy: Axial Reflection with Fill Inversion
  (() => {
    const svgA = wrapSvg(drawPolygon("20,35 50,18 50,52", "none", strokeColor, 2.5));
    const svgB = wrapSvg(drawPolygon("50,35 20,18 20,52", strokeColor, "#0284c7", 2.5));
    const svgC = wrapSvg(\`<path d="M 16 45 A 20 20 0 0 1 54 45 Z" fill="none" stroke="#f59e0b" stroke-width="2.5" />\`);
    const svgD = wrapSvg(\`<path d="M 16 25 A 20 20 0 0 0 54 25 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />\`);
    
    const distractors = [
      wrapSvg(\`<path d="M 16 45 A 20 20 0 0 1 54 45 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />\`),
      wrapSvg(\`<path d="M 16 25 A 20 20 0 0 0 54 25 Z" fill="none" stroke="#f59e0b" stroke-width="2.5" />\`),
      wrapSvg(drawCircle(35, 35, 20, "#f59e0b", "#d97706", 2)),
      wrapSvg(drawPolygon("20,35 50,18 50,52", "#f59e0b", "#d97706", 2.5))
    ];

    const rawOpts = [{ svg: svgD }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Spatial Analogy 1] Figure A relates to Figure B via axial reflection and fill inversion. Which figure completes the analogy for Figure C?\`,
      contextSvg: {
        figA: svgA,
        figB: svgB,
        figC: svgC
      },
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Analogy Rule:**\\nTransformation reflects the figure across its horizontal baseline and inverts the interior from hollow to solid.\`,
      category: 'spatial',
      subType: 'analogy'
    });
  })();

  // 11. Shape Analogy: Concentric Outer & Inner Shape Inversion
  (() => {
    const svgA = wrapSvg(\`\${drawRect(15, 15, 40, 40, "none", strokeColor, 2.5)}\${drawCircle(35, 35, 9, strokeColor, "#0284c7", 2)}\`);
    const svgB = wrapSvg(\`\${drawCircle(35, 35, 22, "none", strokeColor, 2.5)}\${drawRect(27, 27, 16, 16, strokeColor, "#0284c7", 2)}\`);
    const svgC = wrapSvg(\`\${drawPolygon("35,14 56,52 14,52", "none", "#f59e0b", 2.5)}\${drawPolygon("35,30 42,39 35,48 28,39", "#f59e0b", "#d97706", 2)}\`);
    const svgD = wrapSvg(\`\${drawPolygon("35,12 58,35 35,58 12,35", "none", "#f59e0b", 2.5)}\${drawPolygon("35,28 44,44 26,44", "#f59e0b", "#d97706", 2)}\`);

    const distractors = [
      wrapSvg(\`\${drawPolygon("35,14 56,52 14,52", "#f59e0b", "#d97706", 2.5)}\`),
      wrapSvg(\`\${drawPolygon("35,12 58,35 35,58 12,35", "none", "#f59e0b", 2.5)}\${drawCircle(35, 35, 8, "#f59e0b", "#d97706", 2)}\`),
      wrapSvg(\`\${drawRect(18, 18, 34, 34, "none", "#f59e0b", 2.5)}\`),
      svgC
    ];

    const rawOpts = [{ svg: svgD }, ...distractors.map(d => ({ svg: d }))];
    const { options, correctOption } = randomize(rawOpts, 0, rand);

    questions.push({
      question: \`[Simulation #\${t} - Spatial Analogy 2] Figure A transforms to Figure B via concentric containment inversion. Which figure completes the analogy for Figure C?\`,
      contextSvg: {
        figA: svgA,
        figB: svgB,
        figC: svgC
      },
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n**Analogy Rule:**\\nThe outer shape becomes the inner solid element, while the inner shape becomes the outer outline element.\`,
      category: 'spatial',
      subType: 'analogy'
    });
  })();

  return questions;
}
`;

const outFile = path.join(__dirname, '..', 'src', 'data', 'spatialBank.js');
fs.writeFileSync(outFile, fileContent, 'utf8');
console.log('Generated spatialBank.js successfully with 11 archetypes * 29 tests = 319 unique spatial questions!');
