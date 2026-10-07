import { getMathVariant } from '../src/data/mathVariants.js';

const rand = () => 0.5;
let errors = 0;

for (let arch = 0; arch < 66; arch++) {
  const seenQuestions = new Set();
  for (let cycle = 1; cycle <= 9; cycle++) {
    const res = getMathVariant(arch, cycle, rand);
    if (!res) {
      console.error(`Arch ${arch} cycle ${cycle} returned null!`);
      errors++;
      continue;
    }
    if (!res.question || !res.options || !res.correctOption || !res.explanation) {
      console.error(`Arch ${arch} cycle ${cycle} missing required fields!`);
      errors++;
      continue;
    }
    if (res.options.length !== 5) {
      console.error(`Arch ${arch} cycle ${cycle} has ${res.options.length} options (expected 5)!`);
      errors++;
    }
    const optTexts = res.options.map(o => o.text);
    if (new Set(optTexts).size !== 5) {
      console.error(`Arch ${arch} cycle ${cycle} has duplicate options:`, optTexts);
      errors++;
    }
    if (res.question.includes('NaN') || optTexts.some(t => t.includes('NaN'))) {
      console.error(`Arch ${arch} cycle ${cycle} contains NaN!`);
      errors++;
    }
    if (seenQuestions.has(res.question)) {
      console.error(`Arch ${arch} cycle ${cycle} produced duplicate question text!`);
      errors++;
    }
    seenQuestions.add(res.question);
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 66 archetypes across cycles 1 to 9 passed all validation checks with 0 errors!');
} else {
  console.error(`FAILED with ${errors} errors.`);
  process.exit(1);
}
