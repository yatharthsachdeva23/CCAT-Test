import { generateRotatingShape, generateMatrixGrid, generateBarChart } from './svgTemplates.js';

/**
 * Question Bank Generator for CCAT Full Simulations
 * Produces 50-question tests with exact 22 Math, 17 Verbal, 11 Spatial distribution.
 */

// --- 1. SPATIAL REASONING QUESTION GENERATORS ---

export function generateSpatialQuestions(seedOffset = 0) {
  const list = [
    // Next in series 1: Rotating Square with Orbiting Dot
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
      explanation: 'Two simultaneous rules: 1) The square rotates 45° clockwise in each step (0° -> 45° -> 90° -> 135° -> 180°). 2) The orbiting dot moves 90° clockwise around the perimeter (positions 0 -> 1 -> 2 -> 3 -> 0). Only Option A satisfies both.'
    },

    // Next in series 2: Rotating Arrow with Shading
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which arrow comes next in the series?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 90, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 180, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 270, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'arrow', angle: 45, size: 70 }), text: 'Option A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }), text: 'Option B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'arrow', angle: 180, size: 70 }), text: 'Option C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 135, size: 70 }), text: 'Option D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'arrow', angle: 270, size: 70 }), text: 'Option E' }
      ],
      correctOption: 'B',
      explanation: 'The arrow rotates 90° clockwise in every frame (0° -> 90° -> 180° -> 270° -> 360°/0°). After 270°, it points directly North (0°), matching Option B.'
    },

    // Odd one out 1: Polygons & internal elements
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Which of the following figures does NOT belong with the others (Odd One Out)?',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'triangle', angle: 0, dotPos: 1, size: 80 }), text: 'A: Triangle' },
        { id: 'B', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: 2, size: 80 }), text: 'B: Square' },
        { id: 'C', svg: generateRotatingShape({ shape: 'cross', angle: 0, dotPos: null, size: 80 }), text: 'C: Cross' },
        { id: 'D', svg: generateRotatingShape({ shape: 'circle-sector', angle: 90, dotPos: null, size: 80 }), text: 'D: Sector' },
        { id: 'E', svg: generateRotatingShape({ shape: 'arrow', angle: 45, dotPos: null, size: 80 }), text: 'E: Arrow' }
      ],
      correctOption: 'D',
      explanation: 'Figures A, B, C, and E are constructed strictly with straight line segments (polygons/linear vectors). Figure D includes a curved circular arc, making it the odd one out.'
    },

    // Odd one out 2: Orientation/Parity
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Which figure is the odd one out?',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 75 }), text: 'A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'arrow', angle: 90, size: 75 }), text: 'B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'arrow', angle: 180, size: 75 }), text: 'C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 225, size: 75 }), text: 'D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'arrow', angle: 270, size: 75 }), text: 'E' }
      ],
      correctOption: 'D',
      explanation: 'Options A, B, C, and E are aligned strictly with the orthogonal axes (0°, 90°, 180°, 270°). Option D is rotated to a diagonal angle (225°).'
    },

    // 3x3 Matrix Grid 1
    {
      subType: 'spatial_matrix',
      category: 'spatial',
      question: 'Which figure completes the 3x3 matrix?',
      figureType: 'matrix',
      matrixSvg: generateMatrixGrid({
        cells: [
          generateRotatingShape({ shape: 'square', angle: 0, dotPos: 0, size: 70 }),
          generateRotatingShape({ shape: 'square', angle: 45, dotPos: 1, size: 70 }),
          generateRotatingShape({ shape: 'square', angle: 90, dotPos: 2, size: 70 }),

          generateRotatingShape({ shape: 'triangle', angle: 0, dotPos: 0, size: 70 }),
          generateRotatingShape({ shape: 'triangle', angle: 45, dotPos: 1, size: 70 }),
          generateRotatingShape({ shape: 'triangle', angle: 90, dotPos: 2, size: 70 }),

          generateRotatingShape({ shape: 'cross', angle: 0, dotPos: 0, size: 70 }),
          generateRotatingShape({ shape: 'cross', angle: 45, dotPos: 1, size: 70 }),
          '?' // Cell 9
        ]
      }),
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'cross', angle: 90, dotPos: 2, size: 70 }), text: 'Option A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'cross', angle: 45, dotPos: 3, size: 70 }), text: 'Option B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'square', angle: 90, dotPos: 2, size: 70 }), text: 'Option C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'cross', angle: 0, dotPos: 1, size: 70 }), text: 'Option D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'triangle', angle: 90, dotPos: 2, size: 70 }), text: 'Option E' }
      ],
      correctOption: 'A',
      explanation: 'Across rows: the primary shape remains identical in that row (Row 1: squares, Row 2: triangles, Row 3: crosses). The rotation advances by +45° per column (0° -> 45° -> 90°), and the dot advances by +1 index. Cell 9 must be a cross at 90° with dot at index 2 (Option A).'
    },

    // Next in series 3: Quadrant shading
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which quadrant figure comes next in the sequence?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'circle-sector', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'circle-sector', angle: 90, size: 70 }),
        generateRotatingShape({ shape: 'circle-sector', angle: 180, size: 70 }),
        generateRotatingShape({ shape: 'circle-sector', angle: 270, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'circle-sector', angle: 0, size: 70 }), text: 'Option A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'circle-sector', angle: 45, size: 70 }), text: 'Option B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'circle-sector', angle: 180, size: 70 }), text: 'Option C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'circle-sector', angle: 90, size: 70 }), text: 'Option D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }), text: 'Option E' }
      ],
      correctOption: 'A',
      explanation: 'The shaded sector rotates 90° clockwise in each consecutive frame. Following the 270° orientation in frame 4, it completes the full cycle back to 0° (Option A).'
    },

    // Odd one out 3: Shaded vs Unshaded
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Identify the odd one out among these 5 figures:',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'triangle', angle: 0, shaded: true, size: 75 }), text: 'A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'triangle', angle: 90, shaded: true, size: 75 }), text: 'B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'triangle', angle: 180, shaded: false, size: 75 }), text: 'C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'triangle', angle: 270, shaded: true, size: 75 }), text: 'D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'triangle', angle: 45, shaded: true, size: 75 }), text: 'E' }
      ],
      correctOption: 'C',
      explanation: 'All shapes A, B, D, and E are filled (shaded solid blue). Figure C is an unshaded outline.'
    },

    // Next in series 4: Triangle Alternations
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which triangle comes next in the sequence?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'triangle', angle: 0, dotPos: 0, size: 70 }),
        generateRotatingShape({ shape: 'triangle', angle: 180, dotPos: 1, size: 70 }),
        generateRotatingShape({ shape: 'triangle', angle: 0, dotPos: 2, size: 70 }),
        generateRotatingShape({ shape: 'triangle', angle: 180, dotPos: 3, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'triangle', angle: 0, dotPos: 0, size: 70 }), text: 'A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'triangle', angle: 180, dotPos: 0, size: 70 }), text: 'B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'triangle', angle: 90, dotPos: 1, size: 70 }), text: 'C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: 0, size: 70 }), text: 'D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'triangle', angle: 0, dotPos: 2, size: 70 }), text: 'E' }
      ],
      correctOption: 'A',
      explanation: 'The triangle flips 180° alternatingly (0° -> 180° -> 0° -> 180° -> 0°). The dot cycles 0 -> 1 -> 2 -> 3 -> 0. Therefore, the next shape has angle 0° and dot at position 0 (Option A).'
    },

    // Matrix 2: Crosses and dots
    {
      subType: 'spatial_matrix',
      category: 'spatial',
      question: 'What completes the missing cell in this matrix?',
      figureType: 'matrix',
      matrixSvg: generateMatrixGrid({
        cells: [
          generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),
          generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }),
          generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }),

          generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }),
          generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }),
          generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),

          generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }),
          generateRotatingShape({ shape: 'square', angle: 0, size: 70 }),
          '?'
        ]
      }),
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'triangle', angle: 0, size: 70 }), text: 'A: Triangle' },
        { id: 'B', svg: generateRotatingShape({ shape: 'square', angle: 0, size: 70 }), text: 'B: Square' },
        { id: 'C', svg: generateRotatingShape({ shape: 'cross', angle: 0, size: 70 }), text: 'C: Cross' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }), text: 'D: Arrow' },
        { id: 'E', svg: generateRotatingShape({ shape: 'circle-sector', angle: 0, size: 70 }), text: 'E: Sector' }
      ],
      correctOption: 'A',
      explanation: 'Latin Square rule: each row and each column must contain exactly one Square, one Triangle, and one Cross. The third row has a Cross and a Square, so the missing element is a Triangle (Option A).'
    },

    // Odd one out 4: Dot placement
    {
      subType: 'odd_one_out',
      category: 'spatial',
      question: 'Which figure is the odd one out?',
      figureType: 'options_only',
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'square', angle: 45, dotPos: 0, size: 75 }), text: 'A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'square', angle: 45, dotPos: 1, size: 75 }), text: 'B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'square', angle: 45, dotPos: 2, size: 75 }), text: 'C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'square', angle: 0, dotPos: 0, size: 75 }), text: 'D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'square', angle: 45, dotPos: 3, size: 75 }), text: 'E' }
      ],
      correctOption: 'D',
      explanation: 'In A, B, C, and E, the square is rotated at 45° (diamond orientation). In D, the square is oriented at 0° (flat).'
    },

    // Next in series 5: Arrow clockwise by 45 deg
    {
      subType: 'next_in_series',
      category: 'spatial',
      question: 'Which arrow comes next in the 45-degree sequence?',
      figureType: 'sequence',
      sequenceFrames: [
        generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 45, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 90, size: 70 }),
        generateRotatingShape({ shape: 'arrow', angle: 135, size: 70 })
      ],
      options: [
        { id: 'A', svg: generateRotatingShape({ shape: 'arrow', angle: 180, size: 70 }), text: 'A' },
        { id: 'B', svg: generateRotatingShape({ shape: 'arrow', angle: 225, size: 70 }), text: 'B' },
        { id: 'C', svg: generateRotatingShape({ shape: 'arrow', angle: 270, size: 70 }), text: 'C' },
        { id: 'D', svg: generateRotatingShape({ shape: 'arrow', angle: 0, size: 70 }), text: 'D' },
        { id: 'E', svg: generateRotatingShape({ shape: 'cross', angle: 45, size: 70 }), text: 'E' }
      ],
      correctOption: 'A',
      explanation: 'The arrow turns clockwise by 45° in each step. 135° + 45° = 180° (pointing straight down, Option A).'
    }
  ];

  return list;
}

// --- 2. VERBAL REASONING QUESTION GENERATOR ---

export function generateVerbalQuestions(seedOffset = 0) {
  const bank = [
    {
      subType: 'analogy',
      question: 'ORCHESTRA is to CONDUCTOR as SHIP is to:',
      options: [
        { id: 'A', text: 'Sailor' },
        { id: 'B', text: 'Captain' },
        { id: 'C', text: 'Anchor' },
        { id: 'D', text: 'Harbor' },
        { id: 'E', text: 'Navigator' }
      ],
      correctOption: 'B',
      explanation: 'Relationship: A conductor directs and leads an orchestra. Similarly, a captain commands and directs a ship.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is the closest ANTONYM for "EPHEMERAL"?',
      options: [
        { id: 'A', text: 'Fleeting' },
        { id: 'B', text: 'Transient' },
        { id: 'C', text: 'Enduring' },
        { id: 'D', text: 'Celestial' },
        { id: 'E', text: 'Fragile' }
      ],
      correctOption: 'C',
      explanation: 'Ephemeral means lasting for a very short time. The opposite is "Enduring" (lasting indefinitely or for a long time).'
    },
    {
      subType: 'sentence_completion',
      question: 'Despite the engineer\'s _______ explanation, the mechanism was so intricate that the team found it _______ to comprehend.',
      options: [
        { id: 'A', text: 'lucid ... arduous' },
        { id: 'B', text: 'convoluted ... effortless' },
        { id: 'C', text: 'brief ... trivial' },
        { id: 'D', text: 'cryptic ... facile' },
        { id: 'E', text: 'pedantic ... superfluous' }
      ],
      correctOption: 'A',
      explanation: '"Despite" sets up a contrast. Even though the explanation was "lucid" (clear and easy to understand), the team still found it "arduous" (difficult) to comprehend.'
    },
    {
      subType: 'analogy',
      question: 'SCALE is to FISH as FEATHER is to:',
      options: [
        { id: 'A', text: 'Flight' },
        { id: 'B', text: 'Bird' },
        { id: 'C', text: 'Nest' },
        { id: 'D', text: 'Wing' },
        { id: 'E', text: 'Beak' }
      ],
      correctOption: 'B',
      explanation: 'Scales are the external protective covering of a fish; feathers are the external covering of a bird.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is most nearly OPPOSITE in meaning to "CANDID"?',
      options: [
        { id: 'A', text: 'Honest' },
        { id: 'B', text: 'Deceitful' },
        { id: 'C', text: 'Frank' },
        { id: 'D', text: 'Blunt' },
        { id: 'E', text: 'Spontaneous' }
      ],
      correctOption: 'B',
      explanation: 'Candid means truthful and straightforward. Deceitful is the direct opposite.'
    },
    {
      subType: 'syllogism',
      question: 'All squares are rectangles. Some rectangles are blue. All blue shapes are circles.\nWhich conclusion is logically TRUE?',
      options: [
        { id: 'A', text: 'All squares are circles.' },
        { id: 'B', text: 'Some rectangles are circles.' },
        { id: 'C', text: 'All blue shapes are squares.' },
        { id: 'D', text: 'No squares are blue.' },
        { id: 'E', text: 'Some circles are triangles.' }
      ],
      correctOption: 'B',
      explanation: 'Since "Some rectangles are blue" and "All blue shapes are circles", the blue rectangles must be circles. Therefore, "Some rectangles are circles" must be true.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Choose the word that is most SIMILAR in meaning to "PRAGMATIC":',
      options: [
        { id: 'A', text: 'Idealistic' },
        { id: 'B', text: 'Practical' },
        { id: 'C', text: 'Dogmatic' },
        { id: 'D', text: 'Careless' },
        { id: 'E', text: 'Romantic' }
      ],
      correctOption: 'B',
      explanation: 'Pragmatic means dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.'
    },
    {
      subType: 'analogy',
      question: 'LIBRARY is to BOOKS as REPERTORY is to:',
      options: [
        { id: 'A', text: 'Medicine' },
        { id: 'B', text: 'Plays' },
        { id: 'C', text: 'Paintings' },
        { id: 'D', text: 'Artifacts' },
        { id: 'E', text: 'Documents' }
      ],
      correctOption: 'B',
      explanation: 'A library houses a collection of books; a repertory is a collection of plays or operas ready for performance.'
    },
    {
      subType: 'sentence_completion',
      question: 'The scientist was so _______ in her methodology that reviewers found not a single anomaly in her experimental data.',
      options: [
        { id: 'A', text: 'meticulous' },
        { id: 'B', text: 'complacent' },
        { id: 'C', text: 'hasty' },
        { id: 'D', text: 'audacious' },
        { id: 'E', text: 'ambivalent' }
      ],
      correctOption: 'A',
      explanation: 'Meticulous means showing great attention to detail; very careful and precise.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word is the best ANTONYM for "METICULOUS"?',
      options: [
        { id: 'A', text: 'Diligent' },
        { id: 'B', text: 'Sloppy' },
        { id: 'C', text: 'Cautious' },
        { id: 'D', text: 'Fastidious' },
        { id: 'E', text: 'Methodical' }
      ],
      correctOption: 'B',
      explanation: 'Meticulous means extraordinarily careful and neat; "Sloppy" is the direct antonym.'
    },
    {
      subType: 'analogy',
      question: 'THERMOMETER is to TEMPERATURE as PEDOMETER is to:',
      options: [
        { id: 'A', text: 'Velocity' },
        { id: 'B', text: 'Footsteps' },
        { id: 'C', text: 'Elevation' },
        { id: 'D', text: 'Weight' },
        { id: 'E', text: 'Pressure' }
      ],
      correctOption: 'B',
      explanation: 'A thermometer measures temperature; a pedometer measures footsteps taken.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which of the following is most OPPOSITE in meaning to "AFFLUENT"?',
      options: [
        { id: 'A', text: 'Prosperous' },
        { id: 'B', text: 'Destitute' },
        { id: 'C', text: 'Wealthy' },
        { id: 'D', text: 'Lavish' },
        { id: 'E', text: 'Abundant' }
      ],
      correctOption: 'B',
      explanation: 'Affluent means wealthy or rich. Destitute means without the basic necessities of life, impoverished.'
    },
    {
      subType: 'sentence_completion',
      question: 'Although he initially appeared _______, his warm smile and generous hospitality quickly proved his friendliness.',
      options: [
        { id: 'A', text: 'aloof' },
        { id: 'B', text: 'gregarious' },
        { id: 'C', text: 'cordial' },
        { id: 'D', text: 'jovial' },
        { id: 'E', text: 'amiable' }
      ],
      correctOption: 'A',
      explanation: 'The contrast word "Although" requires a word opposite to friendly/warm. "Aloof" means distant or standoffish.'
    },
    {
      subType: 'syllogism',
      question: 'No mammals are reptiles. All snakes are reptiles. Which statement is logically certain?',
      options: [
        { id: 'A', text: 'Some snakes are mammals.' },
        { id: 'B', text: 'No snakes are mammals.' },
        { id: 'C', text: 'All mammals are snakes.' },
        { id: 'D', text: 'Some reptiles are mammals.' },
        { id: 'E', text: 'No reptiles lay eggs.' }
      ],
      correctOption: 'B',
      explanation: 'If mammals and reptiles have zero overlap, and all snakes are inside the reptile group, then no snake can be a mammal.'
    },
    {
      subType: 'analogy',
      question: 'TELESCOPE is to ASTRONOMER as STETHOSCOPE is to:',
      options: [
        { id: 'A', text: 'Chemist' },
        { id: 'B', text: 'Physician' },
        { id: 'C', text: 'Biologist' },
        { id: 'D', text: 'Pharmacist' },
        { id: 'E', text: 'Geologist' }
      ],
      correctOption: 'B',
      explanation: 'A telescope is the quintessential instrument used by an astronomer; a stethoscope is used by a physician.'
    },
    {
      subType: 'antonym_synonym',
      question: 'Which word means the same as "MITIGATE"?',
      options: [
        { id: 'A', text: 'Aggravate' },
        { id: 'B', text: 'Alleviate' },
        { id: 'C', text: 'Intensify' },
        { id: 'D', text: 'Prolong' },
        { id: 'E', text: 'Enforce' }
      ],
      correctOption: 'B',
      explanation: 'To mitigate means to make less severe, serious, or painful; "Alleviate" is a direct synonym.'
    },
    {
      subType: 'analogy',
      question: 'VACCINE is to PREVENT as REMEDY is to:',
      options: [
        { id: 'A', text: 'Diagnose' },
        { id: 'B', text: 'Cure' },
        { id: 'C', text: 'Infect' },
        { id: 'D', text: 'Prescribe' },
        { id: 'E', text: 'Evaluate' }
      ],
      correctOption: 'B',
      explanation: 'A vaccine is designed to prevent disease; a remedy is designed to cure or treat an existing condition.'
    }
  ];

  return bank;
}

// --- 3. MATH & LOGIC QUESTION GENERATOR ---

export function generateMathQuestions(seedOffset = 0) {
  const bank = [
    // Number series 1
    {
      subType: 'number_series',
      category: 'math',
      question: 'What is the next number in the series?\n3, 6, 12, 24, 48, ?',
      options: [
        { id: 'A', text: '72' },
        { id: 'B', text: '84' },
        { id: 'C', text: '96' },
        { id: 'D', text: '108' },
        { id: 'E', text: '120' }
      ],
      correctOption: 'C',
      explanation: 'Each term doubles: 3 * 2 = 6, 6 * 2 = 12, 12 * 2 = 24, 24 * 2 = 48, 48 * 2 = 96.'
    },

    // Word problem: Percentage / Discount
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A jacket originally priced at $120 is discounted by 25%. What is the final sale price?',
      options: [
        { id: 'A', text: '$80' },
        { id: 'B', text: '$90' },
        { id: 'C', text: '$95' },
        { id: 'D', text: '$100' },
        { id: 'E', text: '$105' }
      ],
      correctOption: 'B',
      explanation: 'Shortcut: 25% of $120 is 120 / 4 = $30. Sale price = 120 - 30 = $90.'
    },

    // Number series 2: Alternating differences
    {
      subType: 'number_series',
      category: 'math',
      question: 'What number replaces the question mark?\n4, 7, 12, 19, 28, ?',
      options: [
        { id: 'A', text: '35' },
        { id: 'B', text: '37' },
        { id: 'C', text: '39' },
        { id: 'D', text: '41' },
        { id: 'E', text: '43' }
      ],
      correctOption: 'C',
      explanation: 'Look at the differences: +3, +5, +7, +9. The next difference must be +11. 28 + 11 = 39.'
    },

    // Word problem: Speed / Distance
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A train travels at 60 mph for 2 hours and then at 90 mph for 1 hour. What is the average speed for the entire 3-hour trip?',
      options: [
        { id: 'A', text: '70 mph' },
        { id: 'B', text: '72 mph' },
        { id: 'C', text: '75 mph' },
        { id: 'D', text: '80 mph' },
        { id: 'E', text: '85 mph' }
      ],
      correctOption: 'A',
      explanation: 'Total distance = (60 * 2) + (90 * 1) = 120 + 90 = 210 miles. Total time = 3 hours. Average speed = 210 / 3 = 70 mph.'
    },

    // SVG Bar Chart interpretation
    {
      subType: 'data_chart',
      category: 'math',
      question: 'Based on the sales chart below, what was the percentage increase in sales from Q1 to Q3?',
      figureType: 'chart',
      chartSvg: generateBarChart({
        title: 'Quarterly Widget Shipments (in Thousands)',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [40, 60, 80, 50],
        unit: 'k'
      }),
      options: [
        { id: 'A', text: '50%' },
        { id: 'B', text: '75%' },
        { id: 'C', text: '100%' },
        { id: 'D', text: '125%' },
        { id: 'E', text: '200%' }
      ],
      correctOption: 'C',
      explanation: 'From the chart: Q1 = 40k, Q3 = 80k. Absolute increase = 80 - 40 = 40k. Percentage increase = (40 / 40) * 100% = 100%.'
    },

    // Word problem: Work / Rate
    {
      subType: 'word_problem',
      category: 'math',
      question: 'Alice can finish a coding task in 6 hours, while Bob can finish the same task in 3 hours. Working together, how many hours will it take them to complete the task?',
      options: [
        { id: 'A', text: '1.5 hours' },
        { id: 'B', text: '2.0 hours' },
        { id: 'C', text: '2.5 hours' },
        { id: 'D', text: '4.0 hours' },
        { id: 'E', text: '4.5 hours' }
      ],
      correctOption: 'B',
      explanation: 'Formula: (A * B) / (A + B) = (6 * 3) / (6 + 3) = 18 / 9 = 2 hours.'
    },

    // Number series 3: Fibonacci-like
    {
      subType: 'number_series',
      category: 'math',
      question: 'What is the next number in this sequence?\n2, 3, 5, 8, 13, 21, ?',
      options: [
        { id: 'A', text: '29' },
        { id: 'B', text: '31' },
        { id: 'C', text: '34' },
        { id: 'D', text: '37' },
        { id: 'E', text: '42' }
      ],
      correctOption: 'C',
      explanation: 'Fibonacci rule: each number is the sum of the preceding two numbers. 13 + 21 = 34.'
    },

    // Arithmetic shortcut
    {
      subType: 'word_problem',
      category: 'math',
      question: 'If 8 workers build 8 desks in 8 days, how many days does it take 1 worker to build 1 desk?',
      options: [
        { id: 'A', text: '1 day' },
        { id: 'B', text: '4 days' },
        { id: 'C', text: '8 days' },
        { id: 'D', text: '16 days' },
        { id: 'E', text: '64 days' }
      ],
      correctOption: 'C',
      explanation: 'Each worker works concurrently. 8 workers make 8 desks in 8 days -> 1 worker makes 1 desk in 8 days.'
    },

    // Ratio problem
    {
      subType: 'word_problem',
      category: 'math',
      question: 'The ratio of cats to dogs in an animal shelter is 3:5. If there are 40 animals in total, how many dogs are there?',
      options: [
        { id: 'A', text: '15' },
        { id: 'B', text: '20' },
        { id: 'C', text: '25' },
        { id: 'D', text: '30' },
        { id: 'E', text: '35' }
      ],
      correctOption: 'C',
      explanation: 'Total ratio parts = 3 + 5 = 8 parts. Each part = 40 / 8 = 5 animals. Dogs = 5 parts * 5 = 25 dogs.'
    },

    // Number series 4: Alternating additions
    {
      subType: 'number_series',
      category: 'math',
      question: 'Complete the sequence:\n50, 45, 40, 35, ?',
      options: [
        { id: 'A', text: '20' },
        { id: 'B', text: '25' },
        { id: 'C', text: '30' },
        { id: 'D', text: '32' },
        { id: 'E', text: '34' }
      ],
      correctOption: 'C',
      explanation: 'Term decreases by 5 each time: 35 - 5 = 30.'
    },

    // Percentage profit problem
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A retailer buys an item for $50 and sells it for $75. What is the percentage profit on the cost price?',
      options: [
        { id: 'A', text: '25%' },
        { id: 'B', text: '33.3%' },
        { id: 'C', text: '50%' },
        { id: 'D', text: '66.7%' },
        { id: 'E', text: '75%' }
      ],
      correctOption: 'C',
      explanation: 'Profit = $75 - $50 = $25. Profit % = ($25 / $50) * 100% = 50%.'
    },

    // Algebra / Age problem
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A father is currently three times as old as his son. In 12 years, he will be twice as old as his son. How old is the son now?',
      options: [
        { id: 'A', text: '8' },
        { id: 'B', text: '10' },
        { id: 'C', text: '12' },
        { id: 'D', text: '14' },
        { id: 'E', text: '16' }
      ],
      correctOption: 'C',
      explanation: 'Let S = son\'s current age. Father = 3S. In 12 years: 3S + 12 = 2(S + 12) => 3S + 12 = 2S + 24 => S = 12.'
    },

    // Number series 5: Alternating operation
    {
      subType: 'number_series',
      category: 'math',
      question: 'Find the next term:\n5, 10, 8, 16, 14, 28, ?',
      options: [
        { id: 'A', text: '24' },
        { id: 'B', text: '26' },
        { id: 'C', text: '30' },
        { id: 'D', text: '32' },
        { id: 'E', text: '56' }
      ],
      correctOption: 'B',
      explanation: 'Pattern alternates between (* 2) and (- 2). 5 * 2 = 10; 10 - 2 = 8; 8 * 2 = 16; 16 - 2 = 14; 14 * 2 = 28; next is 28 - 2 = 26.'
    },

    // Simple mental arithmetic
    {
      subType: 'word_problem',
      category: 'math',
      question: 'What is 15% of 240?',
      options: [
        { id: 'A', text: '24' },
        { id: 'B', text: '32' },
        { id: 'C', text: '36' },
        { id: 'D', text: '42' },
        { id: 'E', text: '48' }
      ],
      correctOption: 'C',
      explanation: 'Mental trick: 10% of 240 = 24. 5% = half of 24 = 12. 15% = 24 + 12 = 36.'
    },

    // Average problem
    {
      subType: 'word_problem',
      category: 'math',
      question: 'The average of 5 consecutive odd numbers is 27. What is the largest of these numbers?',
      options: [
        { id: 'A', text: '29' },
        { id: 'B', text: '31' },
        { id: 'C', text: '33' },
        { id: 'D', text: '35' },
        { id: 'E', text: '37' }
      ],
      correctOption: 'B',
      explanation: 'The average of an odd count of consecutive terms is the middle number: 27. The numbers are 23, 25, 27, 29, 31. The largest is 31.'
    },

    // Fraction / Proportion
    {
      subType: 'word_problem',
      category: 'math',
      question: 'If a car consumes 4 gallons of gasoline to drive 128 miles, how many gallons are required to drive 224 miles at the same efficiency?',
      options: [
        { id: 'A', text: '6 gallons' },
        { id: 'B', text: '7 gallons' },
        { id: 'C', text: '8 gallons' },
        { id: 'D', text: '9 gallons' },
        { id: 'E', text: '10 gallons' }
      ],
      correctOption: 'B',
      explanation: 'Miles per gallon = 128 / 4 = 32 mpg. For 224 miles: 224 / 32 = 7 gallons.'
    },

    // Number series 6
    {
      subType: 'number_series',
      category: 'math',
      question: 'What is the missing number?\n1, 4, 9, 16, 25, ?',
      options: [
        { id: 'A', text: '30' },
        { id: 'B', text: '36' },
        { id: 'C', text: '40' },
        { id: 'D', text: '49' },
        { id: 'E', text: '64' }
      ],
      correctOption: 'B',
      explanation: 'Perfect squares: 1^2, 2^2, 3^2, 4^2, 5^2, 6^2 = 36.'
    },

    // Another chart question
    {
      subType: 'data_chart',
      category: 'math',
      question: 'According to the chart below, what was the difference in sales between Q2 and Q4?',
      figureType: 'chart',
      chartSvg: generateBarChart({
        title: 'Quarterly Performance (Units)',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [30, 70, 90, 45],
        unit: 'k'
      }),
      options: [
        { id: 'A', text: '15k' },
        { id: 'B', text: '20k' },
        { id: 'C', text: '25k' },
        { id: 'D', text: '30k' },
        { id: 'E', text: '35k' }
      ],
      correctOption: 'C',
      explanation: 'Q2 = 70k, Q4 = 45k. Difference = 70k - 45k = 25k.'
    },

    // Logic puzzle
    {
      subType: 'word_problem',
      category: 'math',
      question: 'If a clock strikes 6 times in 5 seconds, how many seconds will it take to strike 12 times?',
      options: [
        { id: 'A', text: '10 seconds' },
        { id: 'B', text: '11 seconds' },
        { id: 'C', text: '12 seconds' },
        { id: 'D', text: '13 seconds' },
        { id: 'E', text: '14 seconds' }
      ],
      correctOption: 'B',
      explanation: 'Classic CCAT trick: 6 strikes have 5 intervals between them taking 5 seconds (1 second per interval). 12 strikes have 11 intervals = 11 seconds.'
    },

    // Probability / Combinatorics
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A bag contains 3 red marbles, 4 blue marbles, and 5 green marbles. If one marble is drawn at random, what is the probability it is NOT blue?',
      options: [
        { id: 'A', text: '1/3' },
        { id: 'B', text: '1/4' },
        { id: 'C', text: '2/3' },
        { id: 'D', text: '3/4' },
        { id: 'E', text: '5/12' }
      ],
      correctOption: 'C',
      explanation: 'Total marbles = 3 + 4 + 5 = 12. Non-blue = 3 + 5 = 8. Probability = 8 / 12 = 2/3.'
    },

    // Multiplication / Estimation
    {
      subType: 'word_problem',
      category: 'math',
      question: 'A machine seals 48 boxes per minute. Approximately how many boxes does it seal in 2.5 hours?',
      options: [
        { id: 'A', text: '4,800' },
        { id: 'B', text: '6,200' },
        { id: 'C', text: '7,200' },
        { id: 'D', text: '8,400' },
        { id: 'E', text: '9,600' }
      ],
      correctOption: 'C',
      explanation: '2.5 hours = 150 minutes. 48 boxes/min * 150 min = 48 * 100 + 48 * 50 = 4,800 + 2,400 = 7,200 boxes.'
    },

    // Final math question for 22 total
    {
      subType: 'number_series',
      category: 'math',
      question: 'Identify the next number in the pattern:\n100, 96, 88, 76, 60, ?',
      options: [
        { id: 'A', text: '40' },
        { id: 'B', text: '42' },
        { id: 'C', text: '44' },
        { id: 'D', text: '48' },
        { id: 'E', text: '50' }
      ],
      correctOption: 'A',
      explanation: 'Decreasing differences: -4, -8, -12, -16. The next decrease is -20. 60 - 20 = 40.'
    }
  ];

  return bank;
}
