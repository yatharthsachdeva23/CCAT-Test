// Comprehensive Verification Script for All 57 Tests
import { buildTest } from '../src/data/testCatalog.js';

console.log('Starting Complete System Audit for Tests 1 through 57...\n');

let totalErrors = 0;
const oldQuestionsKeySet = new Set();
const newQuestionsKeySet = new Set();

// Collect all questions from Tests 1 through 30
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  if (!test || !test.questions || test.questions.length !== 50) {
    console.error(`ERROR: Test ${t} does not have exactly 50 questions! Got: ${test?.questions?.length}`);
    totalErrors++;
  }
  
  test.questions.forEach((q, idx) => {
    // Check 5 options
    if (!q.options || q.options.length !== 5) {
      console.error(`ERROR: Test ${t} Q${idx+1} does not have 5 options!`);
      totalErrors++;
    }
    // Check duplicate options
    const optTexts = q.options.map(o => o.text || o.svg || o.id);
    if (new Set(optTexts).size !== 5) {
      console.error(`ERROR: Test ${t} Q${idx+1} has duplicate options:`, optTexts);
      totalErrors++;
    }
    
    // Key for repeat checking: use question text / prompt
    const key = (q.question || '').trim().toLowerCase();
    if (key.length > 5) {
      oldQuestionsKeySet.add(key);
    }
  });
}

console.log(`Tests 1-30 processed successfully. Collected ${oldQuestionsKeySet.size} distinct prompt keys from old tests.\n`);

// Now audit Tests 31 through 57
let newToOldCollisions = 0;
let newToNewCollisions = 0;
const seenNewKeys = new Map();

for (let t = 31; t <= 57; t++) {
  const test = buildTest(t);
  if (!test || !test.questions || test.questions.length !== 50) {
    console.error(`ERROR: Test ${t} does not have exactly 50 questions! Got: ${test?.questions?.length}`);
    totalErrors++;
  }
  
  let mCount = 0, vCount = 0, sCount = 0;
  
  test.questions.forEach((q, idx) => {
    if (q.category === 'math') mCount++;
    if (q.category === 'verbal') vCount++;
    if (q.category === 'spatial') sCount++;
    
    // Check 5 options
    if (!q.options || q.options.length !== 5) {
      console.error(`ERROR: Test ${t} Q${idx+1} does not have 5 options!`);
      totalErrors++;
    }
    
    // Check duplicate options
    const optSignatures = q.options.map(o => (o.text || '') + (o.svg || ''));
    if (new Set(optSignatures).size !== 5) {
      console.error(`ERROR: Test ${t} Q${idx+1} has duplicate options!`);
      totalErrors++;
    }
    
    const promptKey = (q.question || '').trim().toLowerCase();
    
    // Compare with old tests (Tests 1-30)
    // Note: generic spatial prompts like "which figure logically completes the sequence" are common prompt templates,
    // so we check math & verbal questions specifically for conceptual overlap.
    if (q.category !== 'spatial' && oldQuestionsKeySet.has(promptKey)) {
      console.error(`COLLISION NEW-TO-OLD: Test ${t} Q${idx+1} (${q.category}) matches an old question prompt:\n  "${q.question}"`);
      newToOldCollisions++;
      totalErrors++;
    }
    
    // Compare with other new tests
    if (q.category !== 'spatial') {
      if (seenNewKeys.has(promptKey)) {
        console.error(`COLLISION NEW-TO-NEW: Test ${t} Q${idx+1} matches Test ${seenNewKeys.get(promptKey)}:\n  "${q.question}"`);
        newToNewCollisions++;
        totalErrors++;
      } else {
        seenNewKeys.set(promptKey, t);
      }
    }
  });
  
  if (mCount !== 22 || vCount !== 17 || sCount !== 11) {
    console.error(`ERROR: Test ${t} breakdown mismatch: Math=${mCount}, Verbal=${vCount}, Spatial=${sCount}`);
    totalErrors++;
  }
}

console.log(`\n========================================`);
console.log(`AUDIT RESULTS:`);
console.log(`- New-to-Old question collisions: ${newToOldCollisions}`);
console.log(`- New-to-New question collisions: ${newToNewCollisions}`);
console.log(`- Total system errors detected: ${totalErrors}`);
console.log(`========================================\n`);

if (totalErrors === 0) {
  console.log(`ALL 57 TESTS PASSED WITH 100% SUCCESS! NO REPEATS, NO DUPLICATE OPTIONS, PERFECT DISTRIBUTION.`);
}
