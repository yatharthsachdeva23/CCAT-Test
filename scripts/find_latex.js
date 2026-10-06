import { buildTest } from '../src/data/testCatalog.js';

let count = 0;
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach((q, idx) => {
    const rawQ = q.question || '';
    if (rawQ.includes('\\(') || rawQ.includes('\\[') || rawQ.includes('\\)')) {
      console.log(`Test ${t} Q${idx+1}: [Question] ${rawQ}`);
      count++;
    }
    q.options.forEach(opt => {
      const rawOpt = opt.text || '';
      if (rawOpt.includes('\\(') || rawOpt.includes('\\[') || rawOpt.includes('\\)')) {
        console.log(`Test ${t} Q${idx+1} Opt ${opt.id}: [Option] ${rawOpt}`);
        count++;
      }
    });
  });
}
console.log(`Total questions/options with raw LaTeX markers: ${count}`);
