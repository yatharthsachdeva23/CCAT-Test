import { buildTest } from '../src/data/testCatalog.js';

let count = 0;
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach((q, qIdx) => {
    if (q.category !== 'spatial') return;
    const optColors = q.options.map(o => {
      if (!o.svg) return [];
      const matches = o.svg.match(/#[0-9a-fA-F]{6}/g) || [];
      return [...new Set(matches.map(c => c.toLowerCase()))].sort();
    });

    const correctOptIndex = q.options.findIndex(o => o.id === q.correctOption);
    const correctColors = optColors[correctOptIndex] || [];
    const distractorColors = optColors.filter((_, i) => i !== correctOptIndex);

    // Check 1: Distractors all share the exact same palette, but correct option differs
    const allDistractorsSame = distractorColors.every(c => JSON.stringify(c) === JSON.stringify(distractorColors[0]));
    if (allDistractorsSame && JSON.stringify(correctColors) !== JSON.stringify(distractorColors[0])) {
      console.log(`[Palette Diff] Test ${t} Q${qIdx+1} (${q.subType}): Correct has ${JSON.stringify(correctColors)}, distractors have ${JSON.stringify(distractorColors[0])}`);
      count++;
      return;
    }

    // Check 2: Correct option contains a unique hex color not found in ANY distractor
    const distractorHexSet = new Set(distractorColors.flat());
    const uniqueToCorrect = correctColors.filter(c => !distractorHexSet.has(c));
    if (uniqueToCorrect.length > 0) {
      console.log(`[Unique Color in Correct] Test ${t} Q${qIdx+1} (${q.subType}): Correct has ${uniqueToCorrect.join(', ')}`);
      count++;
    }
  });
}
console.log(`Total color giveaways detected: ${count}`);
