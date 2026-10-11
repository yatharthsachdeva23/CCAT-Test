import fs from 'fs';
import { hydrateAttempt } from '../src/utils/storage.js';

const filePath = 'C:/Users/DELL/Downloads/ccat-prep-progress-backup-2026-10-11.json';
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

console.log('Testing Hydration on all attempts from backup...');
let hydrationSuccesses = 0;
let totalQuestionsHydrated = 0;

data.attempts.forEach((att, idx) => {
  const hydrated = hydrateAttempt(att);
  if (hydrated && Array.isArray(hydrated.questions) && hydrated.questions.length === 50) {
    hydrationSuccesses++;
    totalQuestionsHydrated += hydrated.questions.length;
  } else {
    console.warn(`Attempt ${idx + 1} (${att.testId}) did not hydrate 50 questions:`, hydrated?.questions?.length);
  }
});

console.log(`Successfully hydrated ${hydrationSuccesses} / ${data.attempts.length} attempts!`);
console.log(`Total questions loaded for score review: ${totalQuestionsHydrated}`);
if (hydrationSuccesses === data.attempts.length) {
  console.log('ALL ATTEMPTS HYDRATE TO FULL 50-QUESTION SIMULATIONS PERFECTLY!');
}
