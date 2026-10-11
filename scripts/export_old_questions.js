import { buildTest } from '../src/data/testCatalog.js';
import fs from 'fs';

const oldQuestions = [];
const oldTokens = new Set();

for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach(q => {
    oldQuestions.push({
      test: t,
      category: q.category,
      question: q.question
    });
    // extract key words/tokens
    const text = q.question.toLowerCase();
    text.split(/[^a-zA-Z]+/).filter(w => w.length >= 4).forEach(w => oldTokens.add(w));
  });
}

fs.writeFileSync('scripts/old_tests_questions.json', JSON.stringify({
  count: oldQuestions.length,
  questions: oldQuestions.map(q => q.question.trim().toLowerCase()),
  tokens: Array.from(oldTokens)
}, null, 2));

console.log(`Exported ${oldQuestions.length} old questions and ${oldTokens.size} tokens to scripts/old_tests_questions.json`);
