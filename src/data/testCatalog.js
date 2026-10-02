import { generateSpatialQuestions, generateVerbalQuestions, generateMathQuestions } from './questionPool.js';

/**
 * Procedural Test Synthesizer for Tests 1 through 15.
 * Shuffles and parameterizes questions based on test seed to generate 15 distinct tests.
 */
function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    return (s = (s * 16807) % 2147483647) / 2147483647;
  };
}

function shuffleArray(array, randFn) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildTest(testNumber = 1) {
  const seed = testNumber * 9973 + 42;
  const rand = pseudoRandom(seed);

  const mathBank = generateMathQuestions(testNumber);
  const verbalBank = generateVerbalQuestions(testNumber);
  const spatialBank = generateSpatialQuestions(testNumber);

  // CCAT interleaves question types: it alternates between Math, Verbal, and Spatial
  // so the test taker doesn't get 22 math questions in a row!
  const shuffledMath = shuffleArray(mathBank, rand);
  const shuffledVerbal = shuffleArray(verbalBank, rand);
  const shuffledSpatial = shuffleArray(spatialBank, rand);

  const testQuestions = [];
  let mIdx = 0, vIdx = 0, sIdx = 0;

  // Real CCAT alternation rhythm: Math -> Verbal -> Spatial -> Math -> Verbal -> Math...
  // In 50 questions: 22 Math, 17 Verbal, 11 Spatial
  const pattern = [
    'math', 'verbal', 'spatial', 'math', 'verbal',
    'math', 'spatial', 'verbal', 'math', 'verbal',
    'spatial', 'math', 'math', 'verbal', 'spatial',
    'math', 'verbal', 'spatial', 'math', 'verbal',
    'math', 'spatial', 'verbal', 'math', 'verbal',
    'spatial', 'math', 'math', 'verbal', 'spatial',
    'math', 'verbal', 'spatial', 'math', 'verbal',
    'math', 'spatial', 'verbal', 'math', 'verbal',
    'math', 'verbal', 'spatial', 'math', 'verbal',
    'math', 'math', 'verbal', 'math', 'spatial'
  ];

  pattern.forEach((category, i) => {
    let q;
    if (category === 'math') {
      q = shuffledMath[mIdx % shuffledMath.length];
      mIdx++;
    } else if (category === 'verbal') {
      q = shuffledVerbal[vIdx % shuffledVerbal.length];
      vIdx++;
    } else {
      q = shuffledSpatial[sIdx % shuffledSpatial.length];
      sIdx++;
    }

    testQuestions.push({
      ...q,
      id: i + 1,
      testId: `test-${testNumber}`
    });
  });

  const difficulties = [
    'Standard CCAT Benchmark',
    'High-Velocity Drill',
    'Executive & Tech Target (38+)',
    'Math & Logic Weighted',
    'Spatial Precision Focus',
    'Mixed Rapid Fire',
    'Championship Level'
  ];

  return {
    id: `test-${testNumber}`,
    testNumber,
    title: `CCAT Full Simulation #${testNumber}`,
    difficulty: difficulties[(testNumber - 1) % difficulties.length],
    totalQuestions: 50,
    timeLimitSec: 900, // 15 minutes
    mathCount: 22,
    verbalCount: 17,
    spatialCount: 11,
    questions: testQuestions
  };
}

export const TEST_CATALOG = Array.from({ length: 15 }, (_, i) => {
  const num = i + 1;
  const difficulties = [
    'Standard CCAT Benchmark',
    'High-Velocity Drill',
    'Executive & Tech Target (38+)',
    'Math & Logic Weighted',
    'Spatial Precision Focus',
    'Mixed Rapid Fire',
    'Championship Level'
  ];
  return {
    id: `test-${num}`,
    testNumber: num,
    title: `CCAT Full Simulation #${num}`,
    difficulty: difficulties[(num - 1) % difficulties.length],
    totalQuestions: 50,
    timeLimitSec: 900
  };
});
