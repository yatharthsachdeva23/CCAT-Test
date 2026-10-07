import { getSpatialBank, getVerbalBank, getMathBank, randomizeOptions } from './questionPool.js';
import { getVerbalQuestionsForTest } from './verbalBank.js';
import { getMathQuestionsForTest } from './mathBank.js';
import { getSpatialQuestionsForTest } from './spatialBank.js';
import { getAttempts, getActiveSession } from '../utils/storage.js';

/**
 * Procedural Test Synthesizer for Tests 1 through 30.
 * Guarantees:
 * 1. Exactly 50 unique questions per test (22 Math, 17 Verbal, 11 Spatial).
 * 2. ZERO repeating questions between different tests (Tests 2-30 each receive brand new questions).
 * 3. All completed tests remain 100% preserved and untouched.
 * 4. Options and correct answers are uniformly distributed across A, B, C, D, and E.
 * 5. No visible difficulty categorization on the test cards.
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
  // Test 1: Preserved exactly as originally practiced by the user
  if (testNumber === 1) {
    const seed = 1 * 7919 + 31337;
    const rand = pseudoRandom(seed);

    const rawMath = getMathBank(rand);
    const rawVerbal = getVerbalBank();
    const rawSpatial = getSpatialBank(rand);

    const shuffledMath = shuffleArray(rawMath, rand);
    const shuffledVerbal = shuffleArray(rawVerbal, rand);
    const shuffledSpatial = shuffleArray(rawSpatial, rand);

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

      const randomizedQ = randomizeOptions(baseQ, rand);

      testQuestions.push({
        ...randomizedQ,
        id: i + 1,
        category: category,
        testId: `test-1`
      });
    });

    return {
      id: `test-1`,
      testNumber: 1,
      title: `CCAT Full Simulation #1`,
      totalQuestions: 50,
      timeLimitSec: 900,
      mathCount: 22,
      verbalCount: 17,
      spatialCount: 11,
      questions: testQuestions
    };
  }

  // Completed Test & Active Session Protection Guard:
  // If the user has already completed this simulation or has it in-flight,
  // load the questions directly from storage so tests are never altered!
  const defaultTitle = testNumber <= 30 
    ? `CCAT Full Simulation #${testNumber}` 
    : `CCAT Full Simulation #${testNumber} (New)`;

  try {
    const active = getActiveSession();
    if (active && active.testId === `test-${testNumber}` && active.questions && active.questions.length === 50) {
      return {
        id: `test-${testNumber}`,
        testNumber,
        title: active.testTitle || defaultTitle,
        totalQuestions: 50,
        timeLimitSec: active.timeLimitSec || 900,
        mathCount: 22,
        verbalCount: 17,
        spatialCount: 11,
        questions: active.questions
      };
    }
    const attempts = getAttempts();
    const existing = attempts.find(a => a.testId === `test-${testNumber}`);
    if (existing && existing.questions && existing.questions.length === 50) {
      return {
        id: `test-${testNumber}`,
        testNumber,
        title: existing.testTitle || defaultTitle,
        totalQuestions: 50,
        timeLimitSec: 900,
        mathCount: 22,
        verbalCount: 17,
        spatialCount: 11,
        questions: existing.questions
      };
    }
  } catch (e) {
    // fallback to procedural synthesis
  }

  // Synthesis: Tests 1-30 use Original baseline; Tests 31-57 use New Suite with 0 duplicates
  const isNewSuite = testNumber > 30;
  const mathQuestions = getMathQuestionsForTest(testNumber, isNewSuite);
  const verbalQuestions = getVerbalQuestionsForTest(testNumber, isNewSuite);
  const spatialQuestions = getSpatialQuestionsForTest(testNumber, isNewSuite);

  let mIdx = 0, vIdx = 0, sIdx = 0;
  const testQuestions = [];

  CCAT_INTERLEAVED_PATTERN.forEach((category, i) => {
    let q;
    if (category === 'math') {
      q = mathQuestions[mIdx++];
    } else if (category === 'verbal') {
      q = verbalQuestions[vIdx++];
    } else {
      q = spatialQuestions[sIdx++];
    }

    testQuestions.push({
      ...q,
      id: i + 1,
      category: category,
      testId: `test-${testNumber}`
    });
  });

  return {
    id: `test-${testNumber}`,
    testNumber,
    title: defaultTitle,
    totalQuestions: 50,
    timeLimitSec: 900, // 15 minutes
    mathCount: 22,
    verbalCount: 17,
    spatialCount: 11,
    questions: testQuestions
  };
}

export const TEST_CATALOG = Array.from({ length: 57 }, (_, i) => {
  const num = i + 1;
  return {
    id: `test-${num}`,
    testNumber: num,
    title: num <= 30 ? `CCAT Full Simulation #${num}` : `CCAT Full Simulation #${num} (New)`,
    totalQuestions: 50,
    timeLimitSec: 900
  };
});
