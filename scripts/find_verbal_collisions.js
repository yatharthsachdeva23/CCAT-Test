import { buildTest } from '../src/data/testCatalog.js';

const oldSet = new Set();
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach(q => oldSet.add(q.question.trim().toLowerCase()));
}

console.log('Old question set size:', oldSet.size);

const collisions = [];
for (let t = 31; t <= 57; t++) {
  const test = buildTest(t);
  test.questions.forEach((q, idx) => {
    const key = q.question.trim().toLowerCase();
    if (oldSet.has(key)) {
      collisions.push({ test: t, id: idx + 1, cat: q.category, text: q.question });
    }
  });
}

console.log(`Found ${collisions.length} collisions between Tests 31-57 and Tests 1-30:`);
collisions.forEach(c => console.log(`[${c.cat.toUpperCase()}] Test ${c.test} Q${c.id}: ${c.text.replace(/\n/g, ' ')}`));
