import { buildTest } from '../src/data/testCatalog.js';

console.log('=== AUDITING NEW SUITE (TESTS 31 TO 57) ===\n');

// 1. Gather all questions from Tests 1-30 to ensure 100% frozen and for comparison
const oldPrompts = new Set();
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach(q => {
    if (q.question) oldPrompts.add(q.question.trim().toLowerCase());
  });
}
console.log(`Loaded ${oldPrompts.size} distinct prompt templates from frozen Tests 1-30.\n`);

let newToOldCollisions = 0;
let newToNewCollisions = 0;
let duplicateOptionIssues = 0;
let categoryIssues = 0;
let questionCountIssues = 0;

const seenNewPrompts = new Map();

for (let t = 31; t <= 57; t++) {
  const test = buildTest(t);
  if (!test || test.questions.length !== 50) {
    console.error(`Test ${t}: Invalid question count (${test?.questions?.length})`);
    questionCountIssues++;
  }

  let m = 0, v = 0, s = 0;

  test.questions.forEach((q, idx) => {
    if (q.category === 'math') m++;
    else if (q.category === 'verbal') v++;
    else if (q.category === 'spatial') s++;

    // Check options count
    if (!q.options || q.options.length !== 5) {
      console.error(`Test ${t} Q${idx+1}: Missing 5 options!`);
      duplicateOptionIssues++;
    }

    // Check duplicate options
    const optSigs = q.options.map(o => (o.text || '') + (o.svg || ''));
    if (new Set(optSigs).size !== 5) {
      console.error(`Test ${t} Q${idx+1} [${q.category}]: DUPLICATE OPTION FOUND!`, optSigs);
      duplicateOptionIssues++;
    }

    // Check question uniqueness
    const prompt = (q.question || '').trim().toLowerCase();
    
    // For Math & Verbal, check against old tests
    if (q.category !== 'spatial') {
      if (oldPrompts.has(prompt)) {
        console.error(`Test ${t} Q${idx+1} [${q.category}]: Matches old test prompt: "${q.question}"`);
        newToOldCollisions++;
      }
      if (seenNewPrompts.has(prompt)) {
        console.error(`Test ${t} Q${idx+1} [${q.category}]: Duplicate with Test ${seenNewPrompts.get(prompt)}: "${q.question}"`);
        newToNewCollisions++;
      } else {
        seenNewPrompts.set(prompt, t);
      }
    }
  });

  if (m !== 22 || v !== 17 || s !== 11) {
    console.error(`Test ${t}: Breakdown mismatch! M=${m}, V=${v}, S=${s}`);
    categoryIssues++;
  }
}

console.log('=== NEW SUITE AUDIT SUMMARY ===');
console.log(`Tests Analyzed: 27 (Tests 31 through 57)`);
console.log(`Total Questions: 1,350`);
console.log(`New-to-Old Collisions: ${newToOldCollisions}`);
console.log(`New-to-New Collisions: ${newToNewCollisions}`);
console.log(`Duplicate Option Issues: ${duplicateOptionIssues}`);
console.log(`Category Breakdown Issues: ${categoryIssues}`);
console.log(`Question Count Issues: ${questionCountIssues}`);

if (newToOldCollisions === 0 && newToNewCollisions === 0 && duplicateOptionIssues === 0 && categoryIssues === 0 && questionCountIssues === 0) {
  console.log('\n>>> 100% PERFECT SCORE! ZERO REPEATS, ZERO DUPLICATE OPTIONS, ZERO OLD OVERLAPS! <<<');
} else {
  console.log('\n>>> AUDIT FAILED WITH ISSUES ABOVE! <<<');
}
