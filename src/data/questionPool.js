import { generateRotatingShape, generateMatrixGrid, generateBarChart } from './svgTemplates.js';

/**
 * Utility to shuffle options and reassign letters A, B, C, D, E
 * Guarantees completely even ~20% distribution of correct answers across all 5 choices!
 */
export function randomizeOptions(question, randFn = Math.random) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const originalOptions = question.options;
  const originalCorrectId = question.correctOption;
  
  // Find the content of the correct option
  const correctObj = originalOptions.find(o => o.id === originalCorrectId) || originalOptions[0];

  // Clone options without ID
  const rawItems = originalOptions.map(o => ({
    text: o.text,
    svg: o.svg,
    isCorrect: o.id === originalCorrectId
  }));

  // Fisher-Yates shuffle
  for (let i = rawItems.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [rawItems[i], rawItems[j]] = [rawItems[j], rawItems[i]];
  }

  let newCorrectOption = 'A';
  const newOptions = rawItems.map((item, idx) => {
    const letter = letters[idx];
    if (item.isCorrect) {
      newCorrectOption = letter;
    }
    return {
      id: letter,
      text: item.text,
      svg: item.svg
    };
  });

  return {
    ...question,
    options: newOptions,
    correctOption: newCorrectOption
  };
}

// --- 1. EXPANSIVE PROCEDURAL SPATIAL QUESTION GENERATORS ---

export function getSpatialBank(rand) {
  const shapes = ['square', 'triangle', 'arrow', 'cross', 'diamond', 'pentagon', 'hexagon', 'circle-sector', 'star'];
  
  const bank = [
    // Matrix 1: Latin Square of Shapes
    {
      subType: 'spatial_matrix',
      category: 'spatial',
      question: 'Which figure completes the 3×3 matrix according to the row and column logic?',
      figureType: 'matrix',
      matrixCells: [
        generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }),

        generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),

        generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),
        '?'
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }), text: 'Triangle' },
        { id: 'B', svg: generateRotatingShape({ shape: 'square', angle: 0, size: 70 }), text: 'Square' },
        { id: 'C', svg: generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }), text: 'Cross' },
        { id: 'D', svg: generateRotatingShape({ shape: 'diamond', angle: 0, size: 70 }), text: 'Diamond' },
        { id: 'E', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }), text: 'Arrow' }
      ],
      correctOption: 'A',
      explanation: 'Latin Square rule: Each row and each column must contain exactly one Square, one Triangle, and one Cross. The third row lacks a Triangle.'
    },

    // Matrix 2: Progressive Rotation Matrix
    {
      subType: 'spatial_matrix',
      category: 'spatial',
      question: 'Which figure correctly replaces the question mark in this matrix?',
      figureType: 'matrix',
      matrixCells: [
        generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 45, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 90, size: 70 }),

        generateRotatingShape({ shape: 'diamond', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'diamond', angle: 45, size: 70 }),
        generateRotatingShape({ shape: 'diamond', angle: 90, size: 70 }),

        generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'cross', angle: 45, size: 70 }),
        '?'
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'cross', angle: 90, size: 70 }), text: 'Cross (90°)' },
        { id: 'B', svg: generateRotatingShape({ shape: 'cross', angle: 135, size: 70 }), text: 'Cross (135°)' },
        { id: 'C', svg: generateRotatingShape({ shape: 'diamond', angle: 90, size: 70 }), text: 'Diamond (90°)' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 90, size: 70 }), text: 'Arrow (90°)' },
        { id: 'E', svg: generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }), text: 'Cross (0°)' }
      ],
      correctOption: 'A',
      explanation: 'Across rows: the shape family is preserved (Row 1: Arrow, Row 2: Diamond, Row 3: Cross). Across columns: each shape rotates +45° clockwise (0° -> 45° -> 90°). Cell 9 is a Cross at 90°.'
    },

    // Matrix 3: Shading & Dot Matrix
    {
      subType: 'spatial_matrix',
      category: 'spatial',
      question: 'Determine the missing element in the 3×3 matrix:',
      figureType: 'matrix',
      matrixCells: [
        generateRotatingShape({ shape: 'square', angle: 0, dotPos: 0, shaded: false, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 0, dotPos: 1, shaded: false, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 0, dotPos: 2, shaded: true, size: 70 }),

        generateRotatingShape({ shape: 'pentagon', angle: 0, dotPos: 0, shaded: false, size: 70 }),
        generateRotatingShape({ shape: 'pentagon', angle: 0, dotPos: 1, shaded: false, size: 70 }),
        generateRotatingShape({ shape: 'pentagon', angle: 0, dotPos: 2, shaded: true, size: 70 }),

        generateRotatingShape({ shape: 'hexagon', angle: 0, dotPos: 0, shaded: false, size: 70 }),
        generateRotatingShape({ shape: 'hexagon', angle: 0, dotPos: 1, shaded: false, size: 70 }),
        '?'
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'hexagon', angle: 0, dotPos: 2, shaded: true, size: 70 }), text: 'Hexagon Shaded' },
        { id: 'B', svg: generateRotatingShape({ shape: 'hexagon', angle: 0, dotPos: 2, shaded: false, size: 70 }), text: 'Hexagon Clear' },
        { id: 'C', svg: generateRotatingShape({ shape: 'pentagon', angle: 0, dotPos: 2, shaded: true, size: 70 }), text: 'Pentagon Shaded' },
        { id: 'D', svg: generateRotatingShape({ shape: 'hexagon', angle: 0, dotPos: 3, shaded: true, size: 70 }), text: 'Hexagon Dot 3' },
        { id: 'E', svg: generateRotatingShape({ shape: 'diamond', angle: 0, dotPos: 2, shaded: true, size: 70 }), text: 'Diamond' }
      ],
      correctOption: 'A',
      explanation: 'Row 3 contains hexagons. Across columns, the dot moves from pos 0 to 1 to 2, and the third column is shaded solid blue.'
    },

    // Series 1: Rotating Square with Orbiting Dot (45 deg)
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which figure comes next in the sequence?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'square', angle: 0, dotPos: 0, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 45, dotPos: 1, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 90, dotPos: 2, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 135, dotPos: 3, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'square', angle: 180, dotPos: 0, size: 70 }), text: 'Option A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'square', angle: 180, dotPos: 1, size: 70 }), text: 'Option B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'square', angle: 135, dotPos: 0, size: 70 }), text: 'Option C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'square', angle: 90, dotPos: 3, size: 70 }), text: 'Option D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'square', angle: 180, dotPos: 2, size: 70 }), text: 'Option E' }
      ],
      correctOption: 'A',
      explanation: 'Square rotates 45° clockwise each step (135° -> 180°). Orbiting dot steps clockwise through corners (0 -> 1 -> 2 -> 3 -> 0).'
    },

    // Series 2: Rotating Arrow (90 deg)
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which arrow continues the sequence?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 90, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 180, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 270, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }), text: 'North (0°)' },
        { id: 'B', svg: generateRotatingShape({ shape: 'arrow', angle: 45, size: 70 }), text: 'North-East (45°)' },
        { id: 'C', svg: generateRotatingShape({ shape: 'arrow', angle: 180, size: 70 }), text: 'South (180°)' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 135, size: 70 }), text: 'South-East (135°)' },
        { id: 'E', svg: generateRotatingShape({ shape: 'arrow', angle: 270, size: 70 }), text: 'West (270°)' }
      ],
      correctOption: 'A',
      explanation: 'Arrow rotates 90° clockwise in each step. 270° + 90° = 360°/0° (pointing directly North).'
    },

    // Series 3: Shaded Quadrant Sectors
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which quadrant figure comes next in this rotation sequence?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'circle-sector', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'circle-sector', angle: 90, size: 70 }),
        generateRotatingShape({ shape: 'circle-sector', angle: 180, size: 70 }),
        generateRotatingShape({ shape: 'circle-sector', angle: 270, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'circle-sector', angle: 0, size: 70 }), text: 'Quadrant 1 (0°)' },
        { id: 'B', svg: generateRotatingShape({ shape: 'circle-sector', angle: 45, size: 70 }), text: 'Quadrant (45°)' },
        { id: 'C', svg: generateRotatingShape({ shape: 'circle-sector', angle: 180, size: 70 }), text: 'Quadrant 3 (180°)' },
        { id: 'D', svg: generateRotatingShape({ shape: 'circle-sector', angle: 90, size: 70 }), text: 'Quadrant 2 (90°)' },
        { id: 'E', svg: generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }), text: 'Cross' }
      ],
      correctOption: 'A',
      explanation: 'The shaded sector advances 90° clockwise every step, cycling back to position 0°.'
    },

    // Series 4: Pentagons with Alternating Shading
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which pentagon is next in the alternating pattern?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'pentagon', angle: 0, shaded: true, size: 70 }),
        generateRotatingShape({ shape: 'pentagon', angle: 72, shaded: false, size: 70 }),
        generateRotatingShape({ shape: 'pentagon', angle: 144, shaded: true, size: 70 }),
        generateRotatingShape({ shape: 'pentagon', angle: 216, shaded: false, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'pentagon', angle: 288, shaded: true, size: 70 }), text: 'Pentagon 288° (Shaded)' },
        { id: 'B', svg: generateRotatingShape({ shape: 'pentagon', angle: 288, shaded: false, size: 70 }), text: 'Pentagon 288° (Clear)' },
        { id: 'C', svg: generateRotatingShape({ shape: 'pentagon', angle: 180, shaded: true, size: 70 }), text: 'Pentagon 180°' },
        { id: 'D', svg: generateRotatingShape({ shape: 'hexagon', angle: 288, shaded: true, size: 70 }), text: 'Hexagon' },
        { id: 'E', svg: generateRotatingShape({ shape: 'pentagon', angle: 0, shaded: true, size: 70 }), text: 'Pentagon 0°' }
      ],
      correctOption: 'A',
      explanation: 'Two rules: 1) Rotation advances by +72° (one pentagon vertex) each step (216° + 72° = 288°). 2) Shading alternates: Shaded, Clear, Shaded, Clear -> Next must be Shaded.'
    },

    // Series 5: Stars with Orbiting Dot
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which star figure comes next in the sequence?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'star', angle: 0, dotPos: 0, size: 70 }),
        generateRotatingShape({ shape: 'star', angle: 36, dotPos: 1, size: 70 }),
        generateRotatingShape({ shape: 'star', angle: 72, dotPos: 2, size: 70 }),
        generateRotatingShape({ shape: 'star', angle: 108, dotPos: 3, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'star', angle: 144, dotPos: 0, size: 70 }), text: 'Star (144°, Dot 0)' },
        { id: 'B', svg: generateRotatingShape({ shape: 'star', angle: 144, dotPos: 1, size: 70 }), text: 'Star (144°, Dot 1)' },
        { id: 'C', svg: generateRotatingShape({ shape: 'star', angle: 180, dotPos: 0, size: 70 }), text: 'Star (180°, Dot 0)' },
        { id: 'D', svg: generateRotatingShape({ shape: 'diamond', angle: 144, dotPos: 0, size: 70 }), text: 'Diamond' },
        { id: 'E', svg: generateRotatingShape({ shape: 'star', angle: 108, dotPos: 2, size: 70 }), text: 'Star (108°)' }
      ],
      correctOption: 'A',
      explanation: 'Star rotates by +36° per frame (108° + 36° = 144°). The dot cycles positions 0 -> 1 -> 2 -> 3 -> 0.'
    },

    // Odd one out 1: Vertex Count / Curvature
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Which figure is the ODD ONE OUT?',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'circle-sector', angle: 0, size: 75 }), text: 'A: Sector' },
        { id: 'B', svg: generateRotatingShape({ shape: 'square', angle: 0, size: 75 }), text: 'B: Square' },
        { id: 'C', svg: generateRotatingShape({ shape: 'triangle', angle: 0, size: 75 }), text: 'C: Triangle' },
        { id: 'D', svg: generateRotatingShape({ shape: 'pentagon', angle: 0, size: 75 }), text: 'D: Pentagon' },
        { id: 'E', svg: generateRotatingShape({ shape: 'hexagon', angle: 0, size: 75 }), text: 'E: Hexagon' }
      ],
      correctOption: 'A',
      explanation: 'Shapes B, C, D, and E are strictly linear regular polygons composed exclusively of straight line segments. Shape A contains a circular curved arc.'
    },

    // Odd one out 2: Orientation Symmetry
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Which figure does NOT follow the common orientation rule (Odd One Out)?',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'arrow', angle: 45, size: 75 }), text: 'A: 45°' },
        { id: 'B', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 75 }), text: 'B: 0°' },
        { id: 'C', svg: generateRotatingShape({ shape: 'arrow', angle: 90, size: 75 }), text: 'C: 90°' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 180, size: 75 }), text: 'D: 180°' },
        { id: 'E', svg: generateRotatingShape({ shape: 'arrow', angle: 270, size: 75 }), text: 'E: 270°' }
      ],
      correctOption: 'A',
      explanation: 'Figures B, C, D, and E point directly along cardinal axes (North, East, South, West). Figure A points along an intercardinal diagonal (45°).'
    },

    // Odd one out 3: Shading Parity
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Identify the odd one out among these 5 geometric figures:',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'diamond', angle: 0, shaded: true, size: 75 }), text: 'A: Filled' },
        { id: 'B', svg: generateRotatingShape({ shape: 'diamond', angle: 45, shaded: true, size: 75 }), text: 'B: Filled' },
        { id: 'C', svg: generateRotatingShape({ shape: 'diamond', angle: 90, shaded: false, size: 75 }), text: 'C: Outline' },
        { id: 'D', svg: generateRotatingShape({ shape: 'diamond', angle: 135, shaded: true, size: 75 }), text: 'D: Filled' },
        { id: 'E', svg: generateRotatingShape({ shape: 'diamond', angle: 180, shaded: true, size: 75 }), text: 'E: Filled' }
      ],
      correctOption: 'C',
      explanation: 'Figures A, B, D, and E are all solid filled polygons. Figure C is the only unfilled outline.'
    },

    // Odd one out 4: Dot Placement
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Which of the following figures is the odd one out?',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: null, size: 75 }), text: 'A: No Dot' },
        { id: 'B', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: 0, size: 75 }), text: 'B: Dot 0' },
        { id: 'C', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: 1, size: 75 }), text: 'C: Dot 1' },
        { id: 'D', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: 2, size: 75 }), text: 'D: Dot 2' },
        { id: 'E', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: 3, size: 75 }), text: 'E: Dot 3' }
      ],
      correctOption: 'A',
      explanation: 'Figures B, C, D, and E all have an external orbiting indicator dot. Figure A has no dot.'
    },

    // Matrix 4: Dual Shape Overlay Matrix
    {
      subType: 'spatial_matrix',
      category: 'spatial',
      question: 'What completes this 3×3 matrix correctly?',
      figureType: 'matrix',
      matrixCells: [
        generateRotatingShape({ shape: 'diamond', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }),

        generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'diamond', angle: 0, size: 70 }),

        generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'diamond', angle: 0, size: 70 }),
        '?'
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'square', angle: 0, size: 70 }), text: 'Square' },
        { id: 'B', svg: generateRotatingShape({ shape: 'diamond', angle: 0, size: 70 }), text: 'Diamond' },
        { id: 'C', svg: generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }), text: 'Triangle' },
        { id: 'D', svg: generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }), text: 'Cross' },
        { id: 'E', svg: generateRotatingShape({ shape: 'star', angle: 0, size: 70 }), text: 'Star' }
      ],
      correctOption: 'A',
      explanation: 'Latin square of Diamond, Square, and Triangle. Row 3 has Triangle and Diamond; the missing element is Square.'
    },

    // Series 6: Diagonal Arrows
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which arrow comes next in the 45-degree series?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'arrow', angle: 45, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 90, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 135, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 180, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'arrow', angle: 225, size: 70 }), text: '225° (South-West)' },
        { id: 'B', svg: generateRotatingShape({ shape: 'arrow', angle: 270, size: 70 }), text: '270° (West)' },
        { id: 'C', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }), text: '0° (North)' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 45, size: 70 }), text: '45° (North-East)' },
        { id: 'E', svg: generateRotatingShape({ shape: 'cross', angle: 225, size: 70 }), text: 'Cross' }
      ],
      correctOption: 'A',
      explanation: 'Clockwise rotation by 45°: 180° + 45° = 225° (pointing South-West).'
    }
  ];

  return bank;
}

// --- 2. EXTENSIVE HIGH-DIFFICULTY VERBAL REASONING BANK ---

export function getVerbalBank() {
  return [
    {
      subType: 'antonym_synonym',
      question: 'Which word is the closest ANTONYM for "RECONDITE"?',
      options: [
        { id: 'A', text: 'Obvious' },
        { id: 'B', text: 'Esoteric' },
        { id: 'C', text: 'Arcane' },
        { id: 'D', text: 'Abstruse' },
        { id: 'E', text: 'Cryptic' }
      ],
      correctOption: 'A',
      explanation: 'Recondite means little known, obscure, or abstruse. The direct opposite is "Obvious" (clear, easily perceived).'
    },
    {
      subType: 'analogy',
      question: 'DELETERIOUS is to BENEFICIAL as PERNICIOUS is to:',
      options: [
        { id: 'A', text: 'Salubrious' },
        { id: 'B', text: 'Destructive' },
        { id: 'C', text: 'Malevolent' },
        { id: 'D', text: 'Noxious' },
        { id: 'E', text: 'Fatal' }
      ],
      correctOption: 'A',
      explanation: 'Relationship: Antonyms. Deleterious is the opposite of Beneficial. Pernicious (harmful, damaging) is the opposite of Salubrious (health-giving, favorable).'
    },
    {
      subType: 'sentence_completion',
      question: 'The executive was criticized for her _______ leadership style, which brooked no disagreement and alienated senior directors.',
      options: [
        { id: 'A', text: 'autocratic' },
        { id: 'B', text: 'conciliatory' },
        { id: 'C', text: 'egalitarian' },
        { id: 'D', text: 'vacillating' },
        { id: 'E', text: 'circumspect' }
      ],
      correctOption: 'A',
      explanation: '"Brooking no disagreement" defines an autocratic or domineering ruler/leader.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is the closest SYNONYM for "OBSEQUIOUS"?',
      options: [
        { id: 'A', text: 'Servile' },
        { id: 'B', text: 'Insolent' },
        { id: 'C', text: 'Imperious' },
        { id: 'D', text: 'Defiant' },
        { id: 'E', text: 'Belligerent' }
      ],
      correctOption: 'A',
      explanation: 'Obsequious means obedient or attentive to an excessive or fawning degree; "Servile" or sycophantic.'
    },
    {
      subType: 'analogy',
      question: 'TACITURN is to CONVERSATION as ASCETIC is to:',
      options: [
        { id: 'A', text: 'Luxury' },
        { id: 'B', text: 'Solitude' },
        { id: 'C', text: 'Religion' },
        { id: 'D', text: 'Discipline' },
        { id: 'E', text: 'Speech' }
      ],
      correctOption: 'A',
      explanation: 'A taciturn person refrains from conversation; an ascetic person refrains from luxury or physical indulgence.'
    },
    {
      subType: 'syllogism',
      question: 'All quantum systems exhibit superposition. No macroscopic objects exhibit superposition. Some macroscopic objects are computers.\nWhich conclusion MUST be true?',
      options: [
        { id: 'A', text: 'No computers are quantum systems.' },
        { id: 'B', text: 'Some computers are not quantum systems.' },
        { id: 'C', text: 'All computers are macroscopic objects.' },
        { id: 'D', text: 'Some quantum systems are computers.' },
        { id: 'E', text: 'No macroscopic objects are computers.' }
      ],
      correctOption: 'B',
      explanation: 'Since "Some macroscopic objects are computers", and "No macroscopic objects exhibit superposition" (while ALL quantum systems DO), those computer objects cannot be quantum systems. Hence, "Some computers are not quantum systems" must be true.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Choose the word that is most nearly OPPOSITE in meaning to "EQUIVOCAL":',
      options: [
        { id: 'A', text: 'Unambiguous' },
        { id: 'B', text: 'Ambivalent' },
        { id: 'C', text: 'Nebulous' },
        { id: 'D', text: 'Dubious' },
        { id: 'E', text: 'Opaque' }
      ],
      correctOption: 'A',
      explanation: 'Equivocal means open to more than one interpretation; ambiguous. The direct antonym is "Unambiguous".'
    },
    {
      subType: 'analogy',
      question: 'ARCHITECT is to BLUEPRINT as LEGISLATOR is to:',
      options: [
        { id: 'A', text: 'Statute' },
        { id: 'B', text: 'Voter' },
        { id: 'C', text: 'Court' },
        { id: 'D', text: 'Cabinet' },
        { id: 'E', text: 'Election' }
      ],
      correctOption: 'A',
      explanation: 'An architect designs and produces a blueprint; a legislator drafts and enacts a statute (law).'
    },
    {
      subType: 'sentence_completion',
      question: 'Far from being _______, the economic forecast was quite _______, predicting robust multi-year capital expansion.',
      options: [
        { id: 'A', text: 'bleak ... auspicious' },
        { id: 'B', text: 'promising ... dismal' },
        { id: 'C', text: 'accurate ... dubious' },
        { id: 'D', text: 'pessimistic ... catastrophic' },
        { id: 'E', text: 'sanguine ... alarming' }
      ],
      correctOption: 'A',
      explanation: '"Far from being bleak, it was auspicious (favorable), predicting robust expansion."'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is the closest SYNONYM for "LACONIC"?',
      options: [
        { id: 'A', text: 'Terse' },
        { id: 'B', text: 'Loquacious' },
        { id: 'C', text: 'Verbose' },
        { id: 'D', text: 'Garrulous' },
        { id: 'E', text: 'Prolix' }
      ],
      correctOption: 'A',
      explanation: 'Laconic means using very few words; "Terse" or concise.'
    },
    {
      subType: 'analogy',
      question: 'DISINTERESTED is to IMPARTIAL as MERCENARY is to:',
      options: [
        { id: 'A', text: 'Venal' },
        { id: 'B', text: 'Generous' },
        { id: 'C', text: 'Altruistic' },
        { id: 'D', text: 'Scholarly' },
        { id: 'E', text: 'Honorable' }
      ],
      correctOption: 'A',
      explanation: 'Disinterested is synonymous with impartial. Mercenary (motivated solely by money) is synonymous with "Venal" (open to bribery, corrupt).'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is most OPPOSITE to "EPHEMERAL"?',
      options: [
        { id: 'A', text: 'Permanent' },
        { id: 'B', text: 'Transient' },
        { id: 'C', text: 'Evanescent' },
        { id: 'D', text: 'Fleeting' },
        { id: 'E', text: 'Momentary' }
      ],
      correctOption: 'A',
      explanation: 'Ephemeral means short-lived. Permanent is the opposite.'
    },
    {
      subType: 'syllogism',
      question: 'All prime numbers greater than 2 are odd. Number X is a prime number. Number X is not odd.\nWhat is Number X?',
      options: [
        { id: 'A', text: '2' },
        { id: 'B', text: '1' },
        { id: 'C', text: '0' },
        { id: 'D', text: '3' },
        { id: 'E', text: 'Cannot be determined' }
      ],
      correctOption: 'A',
      explanation: 'The only prime number that is not odd is 2.'
    },
    {
      subType: 'sentence_completion',
      question: 'Although the startup founder was praised for his _______ vision, his inability to manage daily cash flow led to _______ operations.',
      options: [
        { id: 'A', text: 'visionary ... insolvent' },
        { id: 'B', text: 'myopic ... flourishing' },
        { id: 'C', text: 'mundane ... profitable' },
        { id: 'D', text: 'reckless ... stable' },
        { id: 'E', text: 'cautious ... expansive' }
      ],
      correctOption: 'A',
      explanation: 'Visionary contrasts with inability to manage cash flow leading to insolvent (bankrupt) operations.'
    },
    {
      subType: 'analogy',
      question: 'QUERULOUS is to COMPLAIN as MELLIFLUOUS is to:',
      options: [
        { id: 'A', text: 'Soothe' },
        { id: 'B', text: 'Deceive' },
        { id: 'C', text: 'Harass' },
        { id: 'D', text: 'Stammer' },
        { id: 'E', text: 'Screech' }
      ],
      correctOption: 'A',
      explanation: 'A querulous person tends to complain; a mellifluous sound or voice tends to soothe (sweet or musical).'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is the closest ANTONYM for "SANCTIMONIOUS"?',
      options: [
        { id: 'A', text: 'Genuinely humble' },
        { id: 'B', text: 'Hypocritical' },
        { id: 'C', text: 'Pious' },
        { id: 'D', text: 'Self-righteous' },
        { id: 'E', text: 'Moralizing' }
      ],
      correctOption: 'A',
      explanation: 'Sanctimonious means making a hypocritical show of moral superiority. The opposite is genuinely humble.'
    },
    {
      subType: 'analogy',
      question: 'METAPHOR is to FIGURATIVE as SYLLOGISM is to:',
      options: [
        { id: 'A', text: 'Deductive' },
        { id: 'B', text: 'Metrical' },
        { id: 'C', text: 'Satirical' },
        { id: 'D', text: 'Allegorical' },
        { id: 'E', text: 'Hyperbolic' }
      ],
      correctOption: 'A',
      explanation: 'A metaphor is fundamentally figurative; a syllogism is fundamentally deductive.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is the best SYNONYM for "INDEFATIGABLE"?',
      options: [
        { id: 'A', text: 'Untiring' },
        { id: 'B', text: 'Lethargic' },
        { id: 'C', text: 'Sluggish' },
        { id: 'D', text: 'Timid' },
        { id: 'E', text: 'Weary' }
      ],
      correctOption: 'A',
      explanation: 'Indefatigable means persisting tirelessly; incapable of being fatigued.'
    },
    {
      subType: 'sentence_completion',
      question: 'The diplomat’s statement was deliberately _______, permitting all negotiating parties to interpret it to their own advantage.',
      options: [
        { id: 'A', text: 'ambiguous' },
        { id: 'B', text: 'unilateral' },
        { id: 'C', text: 'strident' },
        { id: 'D', text: 'trenchant' },
        { id: 'E', text: 'dogmatic' }
      ],
      correctOption: 'A',
      explanation: 'Allowing multiple interpretations means ambiguous or equivocal.'
    },
    {
      subType: 'analogy',
      question: 'HERMIT is to CLANDESTINE as PEDANT is to:',
      options: [
        { id: 'A', text: 'Dogmatic' },
        { id: 'B', text: 'Ignorant' },
        { id: 'C', text: 'Humble' },
        { id: 'D', text: 'Careless' },
        { id: 'E', text: 'Gregarious' }
      ],
      correctOption: 'A',
      explanation: 'A hermit is characterized by seclusion; a pedant is characterized by dogmatic insistence on strict rules or minor details.'
    }
  ];
  return bank.map(q => ({ ...q, category: 'verbal' }));
}

// --- 3. HIGH-DIFFICULTY & PARAMETERIZED MATH REASONING BANK ---

export function getMathBank(rand) {
  return [
    // Problem 1: Combined Work Rate (Hard)
    {
      subType: 'word_problem',
      category: 'math',
      question: 'Pipes A and B can fill an industrial reservoir in 12 hours and 15 hours respectively, while drain Pipe C can empty it in 20 hours. If all three pipes operate concurrently, how many hours will it take to fill the reservoir?',
      options: [
        { id: 'A', text: '10 hours' },
        { id: 'B', text: '8.5 hours' },
        { id: 'C', text: '12 hours' },
        { id: 'D', text: '7.5 hours' },
        { id: 'E', text: '6 hours' }
      ],
      correctOption: 'A',
      explanation: 'Rate equation: 1/12 + 1/15 - 1/20. Common denominator = 60. (5 + 4 - 3)/60 = 6/60 = 1/10. Time = 10 hours.'
    },

    // Problem 2: Relative Speed / Pursuit
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A freight train departs a station traveling at 45 mph. Exactly two hours later, an express train leaves from the same depot traveling in the same direction at 75 mph. How many hours will it take the express train to overtake the freight train?',
      options: [
        { id: 'A', text: '3 hours' },
        { id: 'B', text: '2.5 hours' },
        { id: 'C', text: '4 hours' },
        { id: 'D', text: '3.5 hours' },
        { id: 'E', text: '5 hours' }
      ],
      correctOption: 'A',
      explanation: 'Lead distance = 45 mph * 2 hours = 90 miles. Relative speed = 75 - 45 = 30 mph. Time to overtake = 90 / 30 = 3 hours.'
    },

    // Problem 3: Multi-step Percentage / Margin
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A merchant marks up wholesale merchandise by 60% above cost, then offers a promotional storewide discount of 25%. What is the merchant\'s actual net percentage profit on cost?',
      options: [
        { id: 'A', text: '20%' },
        { id: 'B', text: '35%' },
        { id: 'C', text: '25%' },
        { id: 'D', text: '15%' },
        { id: 'E', text: '30%' }
      ],
      correctOption: 'A',
      explanation: 'Let wholesale cost = $100. Marked up price = $160. 25% discount on $160 = $40. Sale price = 160 - 40 = $120. Net profit = $20 on $100 = 20%.'
    },

    // Problem 4: Challenging Cubic / Quadratic Series
    {
      subType: 'number_series',
      category: 'math',
      question: 'What is the missing number in the sequence?\n2, 9, 28, 65, 126, ?',
      options: [
        { id: 'A', text: '217' },
        { id: 'B', text: '198' },
        { id: 'C', text: '215' },
        { id: 'D', text: '224' },
        { id: 'E', text: '243' }
      ],
      correctOption: 'A',
      explanation: 'Cubes plus 1 pattern: 1^3 + 1 = 2; 2^3 + 1 = 9; 3^3 + 1 = 28; 4^3 + 1 = 65; 5^3 + 1 = 126; 6^3 + 1 = 216 + 1 = 217.'
    },

    // Problem 5: SVG Data Chart with Weighted Average
    {
      subType: 'data_chart',
      category: 'math',
      question: 'Based on the divisional revenue chart below, what was the average revenue across all four quarters?',
      figureType: 'chart',
      chartSvg: generateBarChart({
        title: 'Quarterly Operating Revenue ($ in Millions)',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [48, 72, 96, 64],
        unit: 'M'
      }),
      options: [
        { id: 'A', text: '$70M' },
        { id: 'B', text: '$68M' },
        { id: 'C', text: '$72M' },
        { id: 'D', text: '$75M' },
        { id: 'E', text: '$65M' }
      ],
      correctOption: 'A',
      explanation: 'Sum = 48 + 72 + 96 + 64 = 280. Average = 280 / 4 = $70M.'
    },

    // Problem 6: Weighted Mixture / Concentration
    {
      subType: 'word_problem',
      category: 'math',
      question: 'How many liters of pure water must be added to 30 liters of a 40% acid solution to dilute it to a 25% acid concentration?',
      options: [
        { id: 'A', text: '18 liters' },
        { id: 'B', text: '15 liters' },
        { id: 'C', text: '20 liters' },
        { id: 'D', text: '12 liters' },
        { id: 'E', text: '24 liters' }
      ],
      correctOption: 'A',
      explanation: 'Pure acid present = 40% of 30L = 12L. For 12L to be 25% (1/4) of total volume, total volume must be 12 * 4 = 48L. Water added = 48 - 30 = 18 liters.'
    },

    // Problem 7: Alternating Prime Differences
    {
      subType: 'number_series',
      category: 'math',
      question: 'Identify the next number in this sequence:\n7, 9, 12, 17, 24, 35, ?',
      options: [
        { id: 'A', text: '48' },
        { id: 'B', text: '46' },
        { id: 'C', text: '49' },
        { id: 'D', text: '50' },
        { id: 'E', text: '52' }
      ],
      correctOption: 'A',
      explanation: 'Differences between terms are consecutive prime numbers: +2, +3, +5, +7, +11. Next difference must be +13. 35 + 13 = 48.'
    },

    // Problem 8: Probability without replacement
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A quality inspector tests a shipment containing 6 pristine components and 4 defective components. If 2 components are chosen at random without replacement, what is the probability that BOTH components are pristine?',
      options: [
        { id: 'A', text: '1/3' },
        { id: 'B', text: '3/10' },
        { id: 'C', text: '2/5' },
        { id: 'D', text: '1/2' },
        { id: 'E', text: '4/15' }
      ],
      correctOption: 'A',
      explanation: 'P(First pristine) = 6/10. P(Second pristine) = 5/9. Joint probability = (6/10) * (5/9) = 30/90 = 1/3.'
    },

    // Problem 9: Ratio Compound Algebra
    {
      subType: 'word_problem',
      category: 'math',
      question: 'In a hedge fund, the ratio of equities to bonds is 4:3, and the ratio of bonds to commodities is 5:2. If the total fund assets equal $820 million, what is the total allocation in equities?',
      options: [
        { id: 'A', text: '$400 million' },
        { id: 'B', text: '$350 million' },
        { id: 'C', text: '$380 million' },
        { id: 'D', text: '$420 million' },
        { id: 'E', text: '$450 million' }
      ],
      correctOption: 'A',
      explanation: 'Combine ratios using common Bond term: Equities : Bonds = 20 : 15. Bonds : Commodities = 15 : 6. Compound ratio = 20 : 15 : 6. Total parts = 20 + 15 + 6 = 41 parts. Each part = $820M / 41 = $20M. Equities = 20 * $20M = $400 million.'
    },

    // Problem 10: Clock / Angle Calculation
    {
      subType: 'word_problem',
      category: 'math',
      question: 'At exactly 3:40, what is the measure of the smaller angle formed between the hour hand and minute hand of an analog clock?',
      options: [
        { id: 'A', text: '130°' },
        { id: 'B', text: '120°' },
        { id: 'C', text: '125°' },
        { id: 'D', text: '135°' },
        { id: 'E', text: '140°' }
      ],
      correctOption: 'A',
      explanation: 'Formula: |30*H - 5.5*M| = |30(3) - 5.5(40)| = |90 - 220| = |-130| = 130°.'
    },

    // Problem 11: Two-tier Alternating Operation Series
    {
      subType: 'number_series',
      category: 'math',
      question: 'Find the next term in the series:\n3, 6, 4, 8, 6, 12, 10, ?',
      options: [
        { id: 'A', text: '20' },
        { id: 'B', text: '18' },
        { id: 'C', text: '16' },
        { id: 'D', text: '22' },
        { id: 'E', text: '24' }
      ],
      correctOption: 'A',
      explanation: 'Pattern alternates (*2) then (-2): 3*2=6; 6-2=4; 4*2=8; 8-2=6; 6*2=12; 12-2=10; 10*2=20.'
    },

    // Problem 12: Work & Efficiency Ratio
    {
      subType: 'word_problem',
      category: 'math',
      question: 'Machine Alpha is twice as fast as Machine Beta. If Machine Beta takes 18 minutes to assemble a batch of circuits, how many minutes will it take both machines operating simultaneously to assemble the batch?',
      options: [
        { id: 'A', text: '6 minutes' },
        { id: 'B', text: '8 minutes' },
        { id: 'C', text: '9 minutes' },
        { id: 'D', text: '4.5 minutes' },
        { id: 'E', text: '5 minutes' }
      ],
      correctOption: 'A',
      explanation: 'Machine Beta time = 18 min. Alpha is twice as fast -> Alpha time = 9 min. Together: (18 * 9) / (18 + 9) = 162 / 27 = 6 minutes.'
    },

    // Problem 13: Chart Growth Ratio
    {
      subType: 'data_chart',
      category: 'math',
      question: 'According to the production data chart below, what was the percentage increase in units between Q1 and Q3?',
      figureType: 'chart',
      chartSvg: generateBarChart({
        title: 'Factory Output (Thousands of Units)',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [50, 75, 125, 90],
        unit: 'k'
      }),
      options: [
        { id: 'A', text: '150%' },
        { id: 'B', text: '125%' },
        { id: 'C', text: '100%' },
        { id: 'D', text: '75%' },
        { id: 'E', text: '250%' }
      ],
      correctOption: 'A',
      explanation: 'Q1 = 50k, Q3 = 125k. Increase = 125 - 50 = 75k. Percentage increase = (75 / 50) * 100% = 150%.'
    },

    // Problem 14: Mental Arithmetic under time pressure
    {
      subType: 'word_problem',
      category: 'math',
      question: 'If a runner completes 3.6 kilometers in 12 minutes, what is the runner\'s average speed in kilometers per hour?',
      options: [
        { id: 'A', text: '18 km/h' },
        { id: 'B', text: '15 km/h' },
        { id: 'C', text: '21.6 km/h' },
        { id: 'D', text: '16.5 km/h' },
        { id: 'E', text: '19.2 km/h' }
      ],
      correctOption: 'A',
      explanation: '12 minutes is exactly 1/5 of an hour. Speed = 3.6 km / (1/5 h) = 3.6 * 5 = 18 km/h.'
    },

    // Problem 15: Quadratic Difference Series
    {
      subType: 'number_series',
      category: 'math',
      question: 'What is the next number in this sequence?\n6, 11, 21, 36, 56, ?',
      options: [
        { id: 'A', text: '81' },
        { id: 'B', text: '78' },
        { id: 'C', text: '84' },
        { id: 'D', text: '86' },
        { id: 'E', text: '88' }
      ],
      correctOption: 'A',
      explanation: 'Differences: +5, +10, +15, +20. Next difference is +25. 56 + 25 = 81.'
    },

    // Problem 16: Compound Interest / Growth Approximation
    {
      subType: 'word_problem',
      category: 'math',
      question: 'An initial investment of $8,000 earns 5% annual interest compounded annually. What is the total accumulated value after 2 years?',
      options: [
        { id: 'A', text: '$8,820' },
        { id: 'B', text: '$8,800' },
        { id: 'C', text: '$8,900' },
        { id: 'D', text: '$8,750' },
        { id: 'E', text: '$9,000' }
      ],
      correctOption: 'A',
      explanation: 'Year 1: 8,000 + 400 = $8,400. Year 2: 5% of 8,400 is 420. Total = 8,400 + 420 = $8,820.'
    },

    // Problem 17: Geometry / Area Scaling
    {
      subType: 'word_problem',
      category: 'math',
      question: 'If the diameter of a circle is tripled, by what factor is its surface area multiplied?',
      options: [
        { id: 'A', text: '9 times' },
        { id: 'B', text: '3 times' },
        { id: 'C', text: '6 times' },
        { id: 'D', text: '12 times' },
        { id: 'E', text: '27 times' }
      ],
      correctOption: 'A',
      explanation: 'Area is proportional to radius squared. (3r)^2 = 9r^2, so area is multiplied by 9.'
    },

    // Problem 18: Fractional Division
    {
      subType: 'word_problem',
      category: 'math',
      question: 'What is (3/4) divided by (5/8)?',
      options: [
        { id: 'A', text: '6/5 (or 1.2)' },
        { id: 'B', text: '15/32' },
        { id: 'C', text: '5/6' },
        { id: 'D', text: '8/15' },
        { id: 'E', text: '7/8' }
      ],
      correctOption: 'A',
      explanation: '(3/4) * (8/5) = 24/20 = 6/5 = 1.2.'
    },

    // Problem 19: Fibonacci Prime Sum
    {
      subType: 'number_series',
      category: 'math',
      question: 'Identify the missing number in the progression:\n1, 3, 7, 15, 31, 63, ?',
      options: [
        { id: 'A', text: '127' },
        { id: 'B', text: '125' },
        { id: 'C', text: '128' },
        { id: 'D', text: '131' },
        { id: 'E', text: '142' }
      ],
      correctOption: 'A',
      explanation: 'Formula 2^n - 1 or (Term * 2 + 1): 1*2+1=3; 3*2+1=7; 7*2+1=15; 15*2+1=31; 31*2+1=63; 63*2+1 = 127.'
    },

    // Problem 20: Cost Accounting / Break Even
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A software company incurs $60,000 in monthly fixed operational overhead. Each software license generates $150 in revenue and costs $30 in server maintenance. How many licenses must be sold each month to break even?',
      options: [
        { id: 'A', text: '500 licenses' },
        { id: 'B', text: '400 licenses' },
        { id: 'C', text: '600 licenses' },
        { id: 'D', text: '450 licenses' },
        { id: 'E', text: '750 licenses' }
      ],
      correctOption: 'A',
      explanation: 'Contribution margin per unit = $150 - $30 = $120. Break-even volume = $60,000 / $120 = 500 licenses.'
    },

    // Problem 21: Unit Conversion Rate
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A water tank with capacity 2,400 gallons is leaking at a constant rate of 1.5 gallons every 45 seconds. How many hours will it take for the full tank to completely drain?',
      options: [
        { id: 'A', text: '20 hours' },
        { id: 'B', text: '18 hours' },
        { id: 'C', text: '24 hours' },
        { id: 'D', text: '16 hours' },
        { id: 'E', text: '30 hours' }
      ],
      correctOption: 'A',
      explanation: 'Leak rate = 1.5 gal / 45 sec = 1 gal / 30 sec = 2 gal / minute = 120 gal / hour. Time = 2,400 / 120 = 20 hours.'
    },

    // Problem 22: Exponential differences
    {
      subType: 'number_series',
      category: 'math',
      question: 'What is the next number in this sequence?\n10, 12, 16, 24, 40, ?',
      options: [
        { id: 'A', text: '72' },
        { id: 'B', text: '64' },
        { id: 'C', text: '80' },
        { id: 'D', text: '68' },
        { id: 'E', text: '56' }
      ],
      correctOption: 'A',
      explanation: 'Differences double: +2, +4, +8, +16. Next difference is +32. 40 + 32 = 72.'
    },

    // Problem 23: Average / Missing Score
    {
      subType: 'word_problem',
      category: 'math',
      question: 'To qualify for an executive fellowship, an applicant must maintain an average score of at least 88 across 5 aptitude evaluations. If her scores on the first 4 exams were 84, 91, 85, and 92, what minimum score does she need on the 5th exam?',
      options: [
        { id: 'A', text: '88' },
        { id: 'B', text: '86' },
        { id: 'C', text: '90' },
        { id: 'D', text: '89' },
        { id: 'E', text: '92' }
      ],
      correctOption: 'A',
      explanation: 'Total required points = 88 * 5 = 440. Sum of first 4 scores = 84 + 91 + 85 + 92 = 352. Needed on 5th exam = 440 - 352 = 88.'
    },

    // Problem 24: Percentage Ratio
    {
      subType: 'word_problem',
      category: 'math',
      question: 'If 35% of a number is 140, what is 60% of that same number?',
      options: [
        { id: 'A', text: '240' },
        { id: 'B', text: '210' },
        { id: 'C', text: '280' },
        { id: 'D', text: '300' },
        { id: 'E', text: '200' }
      ],
      correctOption: 'A',
      explanation: '35% is 140 -> 1% is 140/35 = 4. 60% is 60 * 4 = 240.'
    }
  ];
}
