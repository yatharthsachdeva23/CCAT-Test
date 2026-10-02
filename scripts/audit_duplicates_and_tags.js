import { buildTest } from '../src/data/testCatalog.js';

let dupCount = 0;
let tagCount = 0;

for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach((q, idx) => {
    // Check for duplicate options
    const optTexts = q.options.map(o => (o.text || o.svg || JSON.stringify(o)).trim());
    const uniqueOpts = new Set(optTexts);
    if (uniqueOpts.size !== optTexts.length) {
      console.log(`Test ${t} Q${idx+1} [${q.category}] has DUPLICATE OPTIONS:`, optTexts);
      dupCount++;
    }

    // Check for metadata tags like [Grant Program 3], [Project Alpha-1], etc.
    if (typeof q.question === 'string' && /^\[[^\]]+\]/.test(q.question.trim())) {
      console.log(`Test ${t} Q${idx+1} [${q.category}] has TAG:`, q.question.split('\n')[0].slice(0, 50));
      tagCount++;
    }
  });
}

console.log(`\n========================================`);
console.log(`AUDIT RESULTS:`);
console.log(`Total questions with duplicate options: ${dupCount}`);
console.log(`Total questions with metadata tags: ${tagCount}`);
console.log(`========================================`);
