import { buildTest } from '../src/data/testCatalog.js';

console.log('--- RUNNING CCAT FULL 30-TEST AUDIT ---');

const optionDistribution = { A: 0, B: 0, C: 0, D: 0, E: 0 };
let totalQuestionsChecked = 0;
let errors = [];

for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  
  if (test.totalQuestions !== 50 || test.questions.length !== 50) {
    errors.push(`Test ${t}: Expected 50 questions, got ${test.questions.length}`);
  }

  const math = test.questions.filter(q => q.category === 'math').length;
  const verbal = test.questions.filter(q => q.category === 'verbal').length;
  const spatial = test.questions.filter(q => q.category === 'spatial').length;

  if (math !== 22 || verbal !== 17 || spatial !== 11) {
    errors.push(`Test ${t}: Category mismatch. Math: ${math}/22, Verbal: ${verbal}/17, Spatial: ${spatial}/11`);
  }

  test.questions.forEach((q, idx) => {
    totalQuestionsChecked++;

    if (!q.options || q.options.length !== 5) {
      errors.push(`Test ${t} Q${idx+1}: Missing 5 options (got ${q.options ? q.options.length : 0})`);
    }

    if (!['A', 'B', 'C', 'D', 'E'].includes(q.correctOption)) {
      errors.push(`Test ${t} Q${idx+1}: Invalid correctOption "${q.correctOption}"`);
    } else {
      optionDistribution[q.correctOption]++;
    }

    if (!q.explanation || q.explanation.length < 10) {
      errors.push(`Test ${t} Q${idx+1}: Explanation missing or too short`);
    }

    if (!q.question || q.question.trim().length === 0) {
      errors.push(`Test ${t} Q${idx+1}: Question text empty`);
    }
  });
}

console.log(`Audited 30 Tests (${totalQuestionsChecked} total questions).`);
console.log('Correct Answer Distribution across all questions:', optionDistribution);
console.log('Percentages:');
Object.entries(optionDistribution).forEach(([letter, count]) => {
  console.log(`  ${letter}: ${count} (${((count / totalQuestionsChecked) * 100).toFixed(1)}%)`);
});

if (errors.length === 0) {
  console.log('PASSED: All 30 tests are 100% compliant with CCAT standards!');
} else {
  console.error('FAILED: Found errors:');
  errors.slice(0, 10).forEach(e => console.error('  -', e));
  process.exit(1);
}
