import { NEW_SUITE_SPATIAL } from '../src/data/newSuiteSpatial.js';

for (let i = 0; i < 11; i++) {
  const qSet = new Set();
  for (let t = 31; t <= 57; t++) {
    const q = NEW_SUITE_SPATIAL[String(t)][i];
    qSet.add(q.question);
  }
  console.log(`Slot Q${i+1}: ${qSet.size} unique questions across 27 tests:`, Array.from(qSet));
}
