import fs from 'fs';
import { NEW_SUITE_VERBAL } from '../src/data/newSuiteVerbal.js';

const oldQuestions = JSON.parse(fs.readFileSync('scripts/tests_1_to_30_inventory.json', 'utf8'));
const oldPrompts = new Set(oldQuestions.map(q => q.question.trim().toLowerCase()));

console.log('=== AUDITING VERBAL SUITE (TESTS 31-57) ===');

let totalQs = 0;
const seenPromptsIn31_57 = new Map();
let duplicateWithinSuite = 0;
let collisionWithOld = 0;
let duplicateOptionsCount = 0;
const answerDist = { A: 0, B: 0, C: 0, D: 0, E: 0 };
const subTypeCounts = {};

for (let t = 31; t <= 57; t++) {
  const qs = NEW_SUITE_VERBAL[String(t)];
  if (!qs || qs.length !== 17) {
    console.error(`ERROR: Test ${t} has ${qs ? qs.length : 0} verbal questions instead of 17!`);
  }
  
  qs.forEach((q, idx) => {
    totalQs++;
    const sub = q.subType || 'unknown';
    subTypeCounts[sub] = (subTypeCounts[sub] || 0) + 1;
    
    // Check answer dist
    answerDist[q.correctOption] = (answerDist[q.correctOption] || 0) + 1;
    
    // Check duplicate options within question
    const optTexts = q.options.map(o => o.text.trim().toLowerCase());
    const uniqueOptTexts = new Set(optTexts);
    if (uniqueOptTexts.size !== q.options.length) {
      console.error(`Duplicate option in Test ${t} Q${idx+1}:`, optTexts);
      duplicateOptionsCount++;
    }
    
    // Check options count
    if (q.options.length !== 5) {
      console.error(`Test ${t} Q${idx+1} does not have 5 options! Has ${q.options.length}`);
    }
    
    // Check prompt uniqueness within 31-57
    const promptKey = q.question.trim().toLowerCase();
    if (seenPromptsIn31_57.has(promptKey)) {
      console.error(`DUPLICATE PROMPT within 31-57: Test ${t} matches Test ${seenPromptsIn31_57.get(promptKey)}: "${q.question}"`);
      duplicateWithinSuite++;
    } else {
      seenPromptsIn31_57.set(promptKey, t);
    }
    
    // Check collision with Tests 1-30
    if (oldPrompts.has(promptKey)) {
      console.error(`COLLISION with Tests 1-30: Test ${t} Q${idx+1}: "${q.question}"`);
      collisionWithOld++;
    }
  });
}

console.log(`\nAudit Results:`);
console.log(`- Total Verbal Questions: ${totalQs} (Expected 459)`);
console.log(`- Subtype breakdown:`, subTypeCounts);
console.log(`- Correct Answer Distribution:`, answerDist);
console.log(`- Duplicate options within any question: ${duplicateOptionsCount}`);
console.log(`- Cross-test duplicate questions in 31-57: ${duplicateWithinSuite}`);
console.log(`- Collisions with Tests 1-30: ${collisionWithOld}`);

if (duplicateOptionsCount === 0 && duplicateWithinSuite === 0 && collisionWithOld === 0 && totalQs === 459) {
  console.log('\n>>> VERBAL SUITE PASSED AUDIT WITH 100% PERFECTION! <<<');
} else {
  console.error('\n>>> VERBAL SUITE HAS ISSUES! <<<');
  process.exit(1);
}
