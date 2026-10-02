import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTest } from '../src/data/testCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const t1 = buildTest(1);
const t1Questions = t1.questions.map(q => q.question.trim().toLowerCase());

console.log('Test 1 has', t1.questions.length, 'questions.');

// Now let's check tests 2 through 30
let collisionsWithT1 = 0;
let collisionsBetweenOthers = 0;
const seen = new Map();

// record T1
t1.questions.forEach((q, idx) => {
  seen.set(q.question.trim().toLowerCase(), { test: 1, idx: idx + 1, cat: q.category });
});

let categoryCollisions = { math: 0, verbal: 0, spatial: 0 };

for (let t = 2; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach((q, idx) => {
    const key = q.question.trim().toLowerCase();
    if (seen.has(key)) {
      const prev = seen.get(key);
      if (prev.test === 1) {
        collisionsWithT1++;
        console.log(`Collision with T1: Test ${t} Q${idx+1} [${q.category}] collides with T1 Q${prev.idx}: "${q.question.slice(0, 70)}"`);
      } else {
        collisionsBetweenOthers++;
        categoryCollisions[q.category] = (categoryCollisions[q.category] || 0) + 1;
        if (q.category === 'math') {
          console.log(`Math collision between Test ${t} Q${idx+1} and Test ${prev.test} Q${prev.idx}:`, q.question);
        }
      }
    } else {
      seen.set(key, { test: t, idx: idx + 1, cat: q.category });
    }
  });
}

console.log(`Total collisions with Test 1: ${collisionsWithT1}`);
console.log(`Total collisions among Tests 2-30: ${collisionsBetweenOthers}`);
console.log(`Collisions breakdown:`, categoryCollisions);
