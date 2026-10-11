import { buildTest } from '../src/data/testCatalog.js';
import { getMathVariant } from '../src/data/mathVariants.js';

const oldMath = new Set();
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.filter(q => q.category === 'math').forEach(q => {
    oldMath.add(q.question.trim().toLowerCase().replace(/\s+/g, ' '));
  });
}
console.log('Old math questions set size:', oldMath.size);

let collisions = 0;
for (let arch = 0; arch < 66; arch++) {
  for (let c = 1; c <= 9; c++) {
    const v = getMathVariant(arch, c, () => 0.5);
    if (v) {
      const norm = v.question.trim().toLowerCase().replace(/\s+/g, ' ');
      if (oldMath.has(norm)) {
        console.log(`Collision: Arch ${arch}, Cycle ${c}: ${v.question.substring(0, 70)}...`);
        collisions++;
      }
    }
  }
}
console.log('Total variant collisions with old tests:', collisions);
