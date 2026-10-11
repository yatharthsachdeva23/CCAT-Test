import { buildTest } from '../src/data/testCatalog.js';

const test31 = buildTest(31);
console.log('Test 31 loaded:');
console.log('- ID:', test31.id);
console.log('- Title:', test31.title);
console.log('- Total questions:', test31.questions.length);

// Simulate candidate answering 50 questions
const completeResponses = {};
test31.questions.forEach((q, i) => {
  completeResponses[q.id] = {
    questionId: q.id,
    category: q.category,
    subType: q.subType,
    selectedOption: 'A',
    correctOption: q.correctOption,
    isCorrect: 'A' === q.correctOption,
    isSkipped: false,
    timeSpentSec: 15,
    questionText: q.question,
    explanation: q.explanation
  };
});

const attemptResult = {
  id: `attempt_${Date.now()}`,
  testId: test31.id,
  testTitle: test31.title,
  timestamp: new Date().toISOString(),
  totalQuestions: test31.questions.length,
  timeLimitSec: 900,
  totalSecondsUsed: 750,
  timeRanOut: false,
  endedEarly: false,
  responses: completeResponses,
  questions: test31.questions
};

const fullJson = JSON.stringify(attemptResult);
console.log('Full attempt JSON length:', fullJson.length, 'characters (~' + Math.round(fullJson.length / 1024) + ' KB)');

// Check if any circular references or NaN
try {
  JSON.parse(fullJson);
  console.log('JSON parse/stringify successful!');
} catch (e) {
  console.error('JSON Error:', e);
}
