import { getSpatialBank, getVerbalBank, getMathBank, randomizeOptions } from './questionPool.js';

/**
 * Procedural Test Synthesizer for Tests 1 through 30.
 * Guarantees:
 * 1. Exactly 50 unique questions per test (22 Math, 17 Verbal, 11 Spatial).
 * 2. ZERO repeating questions within any test.
 * 3. Options and correct answers are uniformly distributed across A, B, C, D, and E.
 * 4. No visible difficulty categorization on the test cards.
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

// Exactly 22 Math, 17 Verbal, 11 Spatial = 50 Questions smoothly interleaved
const CCAT_INTERLEAVED_PATTERN = [
  "math","verbal","spatial","math","verbal","math","spatial","verbal","math","verbal",
  "math","spatial","math","verbal","math","spatial","verbal","math","verbal","math",
  "spatial","math","verbal","math","spatial","verbal","math","verbal","math","spatial",
  "verbal","math","math","spatial","verbal","math","verbal","math","spatial","verbal",
  "math","math","spatial","verbal","math","verbal","math","spatial","verbal","math"
];

export function buildTest(testNumber = 1) {
  const seed = testNumber * 7919 + 31337;
  const rand = pseudoRandom(seed);

  const rawMath = getMathBank(rand);
  const rawVerbal = getVerbalBank();
  const rawSpatial = getSpatialBank(rand);

  // Shuffle each pool with test seed
  const shuffledMath = shuffleArray(rawMath, rand);
  const shuffledVerbal = shuffleArray(rawVerbal, rand);
  const shuffledSpatial = shuffleArray(rawSpatial, rand);

  // Select EXACTLY 22 Math, 17 Verbal, 11 Spatial without duplicates!
  const selectedMath = shuffledMath.slice(0, 22);
  const selectedVerbal = shuffledVerbal.slice(0, 17);
  const selectedSpatial = shuffledSpatial.slice(0, 11);

  let mIdx = 0, vIdx = 0, sIdx = 0;
  const testQuestions = [];

  CCAT_INTERLEAVED_PATTERN.forEach((category, i) => {
    let baseQ;
    if (category === 'math') {
      baseQ = selectedMath[mIdx++];
    } else if (category === 'verbal') {
      baseQ = selectedVerbal[vIdx++];
    } else {
      baseQ = selectedSpatial[sIdx++];
    }

    // Randomize option order and assign correctOption uniformly across A, B, C, D, E!
    const randomizedQ = randomizeOptions(baseQ, rand);

    testQuestions.push({
      ...randomizedQ,
      id: i + 1,
      category: category,
      testId: `test-${testNumber}`
    });
  });

  return {
    id: `test-${testNumber}`,
    testNumber,
    title: `CCAT Full Simulation #${testNumber}`,
    totalQuestions: 50,
    timeLimitSec: 900, // 15 minutes
    mathCount: 22,
    verbalCount: 17,
    spatialCount: 11,
    questions: testQuestions
  };
}

export const TEST_CATALOG = Array.from({ length: 30 }, (_, i) => {
  const num = i + 1;
  return {
    id: `test-${num}`,
    testNumber: num,
    title: `CCAT Full Simulation #${num}`,
    totalQuestions: 50,
    timeLimitSec: 900
  };
});
