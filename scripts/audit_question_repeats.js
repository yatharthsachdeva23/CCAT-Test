import { buildTest } from '../src/data/testCatalog.js';

console.log('--- Starting Complete Question Repeat Audit ---');

const oldTests = [];
for (let t = 1; t <= 30; t++) {
  oldTests.push(buildTest(t));
}

const newTests = [];
for (let t = 31; t <= 57; t++) {
  newTests.push(buildTest(t));
}

console.log(`Loaded ${oldTests.length} Old Tests (#1 to #30) - Total Questions: ${oldTests.length * 50}`);
console.log(`Loaded ${newTests.length} New Tests (#31 to #57) - Total Questions: ${newTests.length * 50}`);

function normalizeText(str) {
  if (!str) return '';
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

function getQuestionKey(q) {
  if (q.category === 'verbal') {
    // For verbal, question text or specific target identifies it uniquely
    return {
      type: 'verbal',
      subType: q.subType,
      text: normalizeText(q.question),
      correct: normalizeText(q.options ? q.options[q.correctOption] : '')
    };
  } else if (q.category === 'math') {
    return {
      type: 'math',
      subType: q.subType,
      text: normalizeText(q.question),
      correct: normalizeText(q.options ? q.options[q.correctOption] : '')
    };
  } else if (q.category === 'spatial') {
    // For spatial, both question prompt and SVG diagrams matter
    const figStr = Array.isArray(q.figureSvg) ? q.figureSvg.join('') : (q.figureSvg || '');
    const analogyStr = q.analogySvg ? JSON.stringify(q.analogySvg) : '';
    const optSvgStr = (q.options || []).map(o => o.svg || '').join('');
    return {
      type: 'spatial',
      subType: q.subType,
      text: normalizeText(q.question),
      svgHash: (figStr + analogyStr + optSvgStr).replace(/\s+/g, '')
    };
  }
  return {
    type: 'unknown',
    text: normalizeText(q.question)
  };
}

// 1. Audit Verbal Questions
console.log('\n========================================');
console.log('1. VERBAL QUESTIONS AUDIT');
console.log('========================================');

const oldVerbal = [];
oldTests.forEach(test => {
  test.questions.filter(q => q.category === 'verbal').forEach((q, idx) => {
    oldVerbal.push({
      testId: test.id,
      testNumber: test.testNumber,
      qId: q.id,
      subType: q.subType,
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
      correctAnswer: q.options ? q.options[q.correctOption] : '',
      normText: normalizeText(q.question)
    });
  });
});

const newVerbal = [];
newTests.forEach(test => {
  test.questions.filter(q => q.category === 'verbal').forEach((q, idx) => {
    newVerbal.push({
      testId: test.id,
      testNumber: test.testNumber,
      qId: q.id,
      subType: q.subType,
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
      correctAnswer: q.options ? q.options[q.correctOption] : '',
      normText: normalizeText(q.question)
    });
  });
});

console.log(`Old Verbal Questions count: ${oldVerbal.length}`);
console.log(`New Verbal Questions count: ${newVerbal.length}`);

// New-to-Old Verbal matches
const verbalNewToOldMatches = [];
newVerbal.forEach(nq => {
  const matches = oldVerbal.filter(oq => oq.normText === nq.normText);
  if (matches.length > 0) {
    verbalNewToOldMatches.push({
      newTest: nq.testNumber,
      newQId: nq.qId,
      subType: nq.subType,
      question: nq.question,
      matchedOldTests: matches.map(m => `Test #${m.testNumber} (Q${m.qId})`)
    });
  }
});

console.log(`\nVerbal: Exact Matches New-to-Old: ${verbalNewToOldMatches.length}`);
if (verbalNewToOldMatches.length > 0) {
  console.log('Sample New-to-Old Verbal duplicates:');
  verbalNewToOldMatches.slice(0, 10).forEach(m => {
    console.log(`  - New Test #${m.newTest} Q${m.newQId} [${m.subType}]: "${m.question.substring(0, 60)}..." matched in ${m.matchedOldTests.join(', ')}`);
  });
}

// New-to-New Verbal matches
const verbalNewToNewMatches = [];
for (let i = 0; i < newVerbal.length; i++) {
  for (let j = i + 1; j < newVerbal.length; j++) {
    if (newVerbal[i].normText === newVerbal[j].normText) {
      verbalNewToNewMatches.push({
        testA: newVerbal[i].testNumber,
        qIdA: newVerbal[i].qId,
        testB: newVerbal[j].testNumber,
        qIdB: newVerbal[j].qId,
        subType: newVerbal[i].subType,
        question: newVerbal[i].question
      });
    }
  }
}
console.log(`Verbal: Exact Matches New-to-New: ${verbalNewToNewMatches.length}`);
if (verbalNewToNewMatches.length > 0) {
  console.log('Sample New-to-New Verbal duplicates:');
  verbalNewToNewMatches.slice(0, 10).forEach(m => {
    console.log(`  - New Test #${m.testA} (Q${m.qIdA}) == New Test #${m.testB} (Q${m.qIdB}): "${m.question.substring(0, 60)}..."`);
  });
}

// 2. Audit Math Questions
console.log('\n========================================');
console.log('2. MATH QUESTIONS AUDIT');
console.log('========================================');

const oldMath = [];
oldTests.forEach(test => {
  test.questions.filter(q => q.category === 'math').forEach(q => {
    oldMath.push({
      testId: test.id,
      testNumber: test.testNumber,
      qId: q.id,
      subType: q.subType,
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
      correctAnswer: q.options ? q.options[q.correctOption] : '',
      normText: normalizeText(q.question)
    });
  });
});

const newMath = [];
newTests.forEach(test => {
  test.questions.filter(q => q.category === 'math').forEach(q => {
    newMath.push({
      testId: test.id,
      testNumber: test.testNumber,
      qId: q.id,
      subType: q.subType,
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
      correctAnswer: q.options ? q.options[q.correctOption] : '',
      normText: normalizeText(q.question)
    });
  });
});

console.log(`Old Math Questions count: ${oldMath.length}`);
console.log(`New Math Questions count: ${newMath.length}`);

// New-to-Old Math matches
const mathNewToOldMatches = [];
newMath.forEach(nq => {
  const matches = oldMath.filter(oq => oq.normText === nq.normText);
  if (matches.length > 0) {
    mathNewToOldMatches.push({
      newTest: nq.testNumber,
      newQId: nq.qId,
      subType: nq.subType,
      question: nq.question,
      matchedOldTests: matches.map(m => `Test #${m.testNumber} (Q${m.qId})`)
    });
  }
});

console.log(`Math: Exact Matches New-to-Old: ${mathNewToOldMatches.length}`);
if (mathNewToOldMatches.length > 0) {
  console.log('Sample New-to-Old Math duplicates:');
  mathNewToOldMatches.slice(0, 10).forEach(m => {
    console.log(`  - New Test #${m.newTest} Q${m.newQId}: "${m.question.substring(0, 60)}..." matched in ${m.matchedOldTests.join(', ')}`);
  });
}

// New-to-New Math matches
const mathNewToNewMatches = [];
for (let i = 0; i < newMath.length; i++) {
  for (let j = i + 1; j < newMath.length; j++) {
    if (newMath[i].normText === newMath[j].normText) {
      mathNewToNewMatches.push({
        testA: newMath[i].testNumber,
        qIdA: newMath[i].qId,
        testB: newMath[j].testNumber,
        qIdB: newMath[j].qId,
        subType: newMath[i].subType,
        question: newMath[i].question
      });
    }
  }
}
console.log(`Math: Exact Matches New-to-New: ${mathNewToNewMatches.length}`);
if (mathNewToNewMatches.length > 0) {
  console.log('Sample New-to-New Math duplicates:');
  mathNewToNewMatches.slice(0, 10).forEach(m => {
    console.log(`  - New Test #${m.testA} (Q${m.qIdA}) == New Test #${m.testB} (Q${m.qIdB}): "${m.question.substring(0, 60)}..."`);
  });
}

// 3. Audit Spatial Questions
console.log('\n========================================');
console.log('3. SPATIAL QUESTIONS AUDIT');
console.log('========================================');

const oldSpatial = [];
oldTests.forEach(test => {
  test.questions.filter(q => q.category === 'spatial').forEach(q => {
    const k = getQuestionKey(q);
    oldSpatial.push({
      testId: test.id,
      testNumber: test.testNumber,
      qId: q.id,
      subType: q.subType,
      question: q.question,
      svgHash: k.svgHash
    });
  });
});

const newSpatial = [];
newTests.forEach(test => {
  test.questions.filter(q => q.category === 'spatial').forEach(q => {
    const k = getQuestionKey(q);
    newSpatial.push({
      testId: test.id,
      testNumber: test.testNumber,
      qId: q.id,
      subType: q.subType,
      question: q.question,
      svgHash: k.svgHash
    });
  });
});

console.log(`Old Spatial Questions count: ${oldSpatial.length}`);
console.log(`New Spatial Questions count: ${newSpatial.length}`);

// New-to-Old Spatial matches (Exact identical SVG content & options)
const spatialNewToOldMatches = [];
newSpatial.forEach(nq => {
  const matches = oldSpatial.filter(oq => oq.svgHash === nq.svgHash);
  if (matches.length > 0) {
    spatialNewToOldMatches.push({
      newTest: nq.testNumber,
      newQId: nq.qId,
      subType: nq.subType,
      question: nq.question,
      matchedOldTests: matches.map(m => `Test #${m.testNumber} (Q${m.qId})`)
    });
  }
});

console.log(`Spatial: Exact Matches New-to-Old (Identical SVG & Diagram): ${spatialNewToOldMatches.length}`);
if (spatialNewToOldMatches.length > 0) {
  console.log('Sample New-to-Old Spatial duplicates:');
  spatialNewToOldMatches.slice(0, 10).forEach(m => {
    console.log(`  - New Test #${m.newTest} Q${m.newQId}: "${m.question.substring(0, 60)}..." matched in ${m.matchedOldTests.join(', ')}`);
  });
}

// New-to-New Spatial matches
const spatialNewToNewMatches = [];
for (let i = 0; i < newSpatial.length; i++) {
  for (let j = i + 1; j < newSpatial.length; j++) {
    if (newSpatial[i].svgHash === newSpatial[j].svgHash) {
      spatialNewToNewMatches.push({
        testA: newSpatial[i].testNumber,
        qIdA: newSpatial[i].qId,
        testB: newSpatial[j].testNumber,
        qIdB: newSpatial[j].qId,
        subType: newSpatial[i].subType,
        question: newSpatial[i].question
      });
    }
  }
}
console.log(`Spatial: Exact Matches New-to-New (Identical SVG & Diagram): ${spatialNewToNewMatches.length}`);
if (spatialNewToNewMatches.length > 0) {
  console.log('Sample New-to-New Spatial duplicates:');
  spatialNewToNewMatches.slice(0, 10).forEach(m => {
    console.log(`  - New Test #${m.testA} (Q${m.qIdA}) == New Test #${m.testB} (Q${m.qIdB}): "${m.question.substring(0, 60)}..."`);
  });
}

console.log('\n========================================');
console.log('TOTAL SUMMARY');
console.log('========================================');
console.log(`Total New Questions Checked: ${newTests.length * 50} (${newMath.length} Math, ${newVerbal.length} Verbal, ${newSpatial.length} Spatial)`);
console.log(`Total Old Questions Checked: ${oldTests.length * 50} (${oldMath.length} Math, ${oldVerbal.length} Verbal, ${oldSpatial.length} Spatial)`);
console.log(`New-to-Old Duplicates:`);
console.log(`  - Math:    ${mathNewToOldMatches.length}`);
console.log(`  - Verbal:  ${verbalNewToOldMatches.length}`);
console.log(`  - Spatial: ${spatialNewToOldMatches.length}`);
console.log(`New-to-New Duplicates:`);
console.log(`  - Math:    ${mathNewToNewMatches.length}`);
console.log(`  - Verbal:  ${verbalNewToNewMatches.length}`);
console.log(`  - Spatial: ${spatialNewToNewMatches.length}`);
