import { buildTest } from '../src/data/testCatalog.js';

const allTests = [];
for (let t = 1; t <= 30; t++) {
  allTests.push(buildTest(t));
}

let dupCount = 0;
const testPairDups = [];

for (let i = 0; i < 30; i++) {
  for (let j = i + 1; j < 30; j++) {
    const t1 = allTests[i];
    const t2 = allTests[j];
    const shared = [];
    t1.questions.forEach((q1) => {
      t2.questions.forEach((q2) => {
        // Compare question text or SVG if question text is generic
        const sameQ = q1.question === q2.question;
        const sameOptions = JSON.stringify(q1.options.map(o => o.text || o.svg).sort()) === JSON.stringify(q2.options.map(o => o.text || o.svg).sort());
        if (sameQ && (q1.category !== 'spatial' || sameOptions)) {
          shared.push({ cat: q1.category, qText: q1.question.slice(0, 50) });
        }
      });
    });
    if (shared.length > 0) {
      dupCount += shared.length;
      const mathShared = shared.filter(s => s.cat === 'math').length;
      const verbalShared = shared.filter(s => s.cat === 'verbal').length;
      const spatialShared = shared.filter(s => s.cat === 'spatial').length;
      testPairDups.push(`Test ${i+1} & Test ${j+1}: ${shared.length} shared (Math: ${mathShared}, Verbal: ${verbalShared}, Spatial: ${spatialShared})`);
    }
  }
}

console.log(testPairDups.slice(0, 30).join('\n'));
if (testPairDups.length > 30) {
  console.log(`... and ${testPairDups.length - 30} more pairs with duplicates.`);
}
console.log('Total duplicated question pairs across all 30 tests:', dupCount);
