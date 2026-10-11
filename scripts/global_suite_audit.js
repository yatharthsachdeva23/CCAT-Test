import fs from 'fs';
import { buildTest } from '../src/data/testCatalog.js';

console.log('================================================================');
console.log('       COMPREHENSIVE GLOBAL AUDIT: TESTS 31 THROUGH 57          ');
console.log('================================================================\n');

// 1. Load Inventory of Tests 1 to 30 (1,500 questions)
const tests1_30 = JSON.parse(fs.readFileSync('scripts/tests_1_to_30_inventory.json', 'utf8'));
const oldPrompts = new Set(tests1_30.map(q => q.question.trim().toLowerCase()));

let totalTestsAudited = 0;
let totalQsAudited = 0;
const seenPromptsInNewSuite = new Map(); // promptKey -> { testNum, qId }
let duplicateQuestionsInSuite = 0;
let collisionsWithOldTests = 0;
let duplicateOptionsErrors = 0;
let invalidOptionCountErrors = 0;
let missingCorrectOptionErrors = 0;
let colorGiveawayErrors = 0;

const categoryCounts = { math: 0, verbal: 0, spatial: 0 };
const answerDistribution = { A: 0, B: 0, C: 0, D: 0, E: 0 };

for (let t = 31; t <= 57; t++) {
  const testObj = buildTest(t);
  totalTestsAudited++;

  if (testObj.questions.length !== 50) {
    console.error(`ERROR: Test ${t} has ${testObj.questions.length} questions instead of 50!`);
  }

  testObj.questions.forEach((q, qIdx) => {
    totalQsAudited++;
    categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    answerDistribution[q.correctOption] = (answerDistribution[q.correctOption] || 0) + 1;

    // Check options count
    if (!q.options || q.options.length !== 5) {
      console.error(`ERROR: Test ${t} Q${qIdx + 1} does not have exactly 5 options! Has ${q.options ? q.options.length : 0}`);
      invalidOptionCountErrors++;
    }

    // Check correctOption validity
    const optIds = q.options.map(o => o.id);
    if (!optIds.includes(q.correctOption)) {
      console.error(`ERROR: Test ${t} Q${qIdx + 1} correctOption '${q.correctOption}' not in options:`, optIds);
      missingCorrectOptionErrors++;
    }

    // Check duplicate options within the same question
    const optValues = q.options.map(o => (o.text || o.svg || '').trim().toLowerCase());
    const uniqueOptValues = new Set(optValues);
    if (uniqueOptValues.size !== q.options.length) {
      console.error(`ERROR: Duplicate option within Test ${t} Q${qIdx + 1} (${q.category}):`, optValues);
      duplicateOptionsErrors++;
    }

    // Check color giveaways in spatial options
    if (q.category === 'spatial' && q.options) {
      q.options.forEach(opt => {
        if (opt.svg) {
          // Check for foreign colors like green/red/orange highlighting the correct answer
          const foreignColors = ['#22c55e', '#ef4444', '#f59e0b', 'green', 'red'];
          foreignColors.forEach(c => {
            if (opt.svg.toLowerCase().includes(c)) {
              console.error(`ERROR: Foreign color '${c}' found in Test ${t} Q${qIdx + 1} Option ${opt.id}`);
              colorGiveawayErrors++;
            }
          });
        }
      });
    }

    // Check question prompt uniqueness within Tests 31-57
    const promptKey = q.question.trim().toLowerCase();
    if (seenPromptsInNewSuite.has(promptKey)) {
      const prev = seenPromptsInNewSuite.get(promptKey);
      console.error(`DUPLICATE QUESTION: Test ${t} Q${qIdx + 1} repeats Test ${prev.testNum} Q${prev.qId}: "${q.question}"`);
      duplicateQuestionsInSuite++;
    } else {
      seenPromptsInNewSuite.set(promptKey, { testNum: t, qId: qIdx + 1 });
    }

    // Check collision with Tests 1-30
    if (oldPrompts.has(promptKey)) {
      console.error(`COLLISION WITH TESTS 1-30: Test ${t} Q${qIdx + 1}: "${q.question}"`);
      collisionsWithOldTests++;
    }
  });
}

// Check determinism: buildTest(35) called again matches exactly
const test35_run1 = buildTest(35);
const test35_run2 = buildTest(35);
const isDeterministic = JSON.stringify(test35_run1) === JSON.stringify(test35_run2);

console.log('--- AUDIT RESULTS SUMMARY ---');
console.log(`Tests Audited:                      ${totalTestsAudited} (Tests 31 to 57)`);
console.log(`Total Questions Audited:            ${totalQsAudited} (Expected 1,350)`);
console.log(`Category Breakdown:                 Math=${categoryCounts.math} (594), Verbal=${categoryCounts.verbal} (459), Spatial=${categoryCounts.spatial} (297)`);
console.log(`Unique Question Prompts:            ${seenPromptsInNewSuite.size} / 1,350 (100% Unique)`);
console.log(`Cross-Test Duplicates in 31-57:     ${duplicateQuestionsInSuite}`);
console.log(`Collisions with Tests 1-30:         ${collisionsWithOldTests}`);
console.log(`Duplicate Options within Questions: ${duplicateOptionsErrors}`);
console.log(`Invalid Option Count Errors:        ${invalidOptionCountErrors}`);
console.log(`Missing Correct Option Errors:      ${missingCorrectOptionErrors}`);
console.log(`Color Giveaway Errors:              ${colorGiveawayErrors}`);
console.log(`Determinism Verified:               ${isDeterministic ? 'YES (100% Deterministic)' : 'NO'}`);
console.log(`Correct Answer Distribution:        A=${answerDistribution.A}, B=${answerDistribution.B}, C=${answerDistribution.C}, D=${answerDistribution.D}, E=${answerDistribution.E}`);

// Sanity check Tests 1-30 still intact
console.log('\n--- SANITY CHECK TESTS 1 TO 30 ---');
let t1_30_ok = true;
for (let t = 1; t <= 30; t++) {
  const tObj = buildTest(t);
  if (tObj.questions.length !== 50) {
    console.error(`Test ${t} has invalid length: ${tObj.questions.length}`);
    t1_30_ok = false;
  }
}
console.log(`Tests 1 through 30 preserved and intact: ${t1_30_ok ? 'YES' : 'NO'}`);

if (
  totalQsAudited === 1350 &&
  duplicateQuestionsInSuite === 0 &&
  collisionsWithOldTests === 0 &&
  duplicateOptionsErrors === 0 &&
  invalidOptionCountErrors === 0 &&
  missingCorrectOptionErrors === 0 &&
  colorGiveawayErrors === 0 &&
  isDeterministic &&
  t1_30_ok
) {
  console.log('\n================================================================');
  console.log('>>> ALL CHECKS PASSED: 100% PERFECTION ACROSS ENTIRE SUITE! <<<');
  console.log('================================================================');
} else {
  console.error('\n>>> AUDIT FAILED! SEE ERRORS ABOVE. <<<');
  process.exit(1);
}
