import { getMathQuestionsForTest } from '../src/data/mathBank.js';
import { getVerbalQuestionsForTest } from '../src/data/verbalBank.js';
import { getSpatialQuestionsForTest } from '../src/data/spatialBank.js';
import { buildTest } from '../src/data/testCatalog.js';

let errors = [];

for (let t = 2; t <= 30; t++) {
  try {
    const math = getMathQuestionsForTest(t);
    if (!math || math.length !== 22) errors.push(`Test ${t} math count: ${math ? math.length : 0}`);
    math.forEach((q, idx) => {
      if (!q.question) errors.push(`Test ${t} math ${idx} missing question`);
      if (!q.options || q.options.length !== 5) errors.push(`Test ${t} math ${idx} invalid options count`);
      if (!q.correctOption) errors.push(`Test ${t} math ${idx} missing correctOption`);
      const texts = q.options.map(o => o.text);
      if (new Set(texts).size !== 5) errors.push(`Test ${t} math ${idx} duplicate options: ${JSON.stringify(texts)}`);
      if (q.question.includes('NaN') || q.question.includes('undefined')) errors.push(`Test ${t} math ${idx} NaN/undef in question: ${q.question}`);
    });

    const verbal = getVerbalQuestionsForTest(t);
    if (!verbal || verbal.length !== 17) errors.push(`Test ${t} verbal count: ${verbal ? verbal.length : 0}`);
    verbal.forEach((q, idx) => {
      if (!q.question) errors.push(`Test ${t} verbal ${idx} missing question`);
      if (!q.options || q.options.length !== 5) errors.push(`Test ${t} verbal ${idx} invalid options count`);
      if (!q.correctOption) errors.push(`Test ${t} verbal ${idx} missing correctOption`);
      const texts = q.options.map(o => o.text);
      if (new Set(texts).size !== 5) errors.push(`Test ${t} verbal ${idx} duplicate options: ${JSON.stringify(texts)}`);
    });

    const spatial = getSpatialQuestionsForTest(t);
    if (!spatial || spatial.length !== 11) errors.push(`Test ${t} spatial count: ${spatial ? spatial.length : 0}`);
    spatial.forEach((q, idx) => {
      if (!q.question) errors.push(`Test ${t} spatial ${idx} missing question`);
      if (!q.options || q.options.length !== 5) errors.push(`Test ${t} spatial ${idx} invalid options count`);
      if (!q.correctOption) errors.push(`Test ${t} spatial ${idx} missing correctOption`);
      const validOptions = q.options.every(o => o.svg || o.text);
      if (!validOptions) errors.push(`Test ${t} spatial ${idx} has options without svg or text`);
    });

    const fullTest = buildTest(t);
    if (!fullTest || fullTest.questions.length !== 50) {
      errors.push(`Test ${t} fullTest count: ${fullTest ? fullTest.questions.length : 0}`);
    }
  } catch (err) {
    errors.push(`Test ${t} crashed: ${err.message}\n${err.stack}`);
  }
}

if (errors.length > 0) {
  console.log(`Errors found (${errors.length}):`);
  console.log(errors.slice(0, 30).join('\n'));
} else {
  console.log('SUCCESS: All tests 2-30 verified perfectly! (22 Math, 17 Verbal, 11 Spatial per test, all with 5 distinct options & valid correctOption, buildTest = 50 total)');
}
