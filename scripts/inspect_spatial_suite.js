import { NEW_SUITE_SPATIAL } from '../src/data/newSuiteSpatial.js';

const t31 = NEW_SUITE_SPATIAL['31'];
console.log('Test 31 count:', t31.length);
t31.forEach((q, i) => {
  console.log(`Q${i+1}: subType=${q.subType}, question='${q.question}'`);
});
