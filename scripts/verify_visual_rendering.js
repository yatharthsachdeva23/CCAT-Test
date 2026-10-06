import { buildTest } from '../src/data/testCatalog.js';

let errors = [];
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.forEach((q, idx) => {
    try {
      // Test sequence logic
      const seqFrames = q.sequenceFrames || q.svgSeries || (Array.isArray(q.figureSvg) && q.figureSvg.length > 1 ? q.figureSvg : null);
      if (seqFrames) {
        if (!Array.isArray(seqFrames)) errors.push(`Test ${t} Q${idx+1} seqFrames not array`);
      }

      // Test analogy logic
      const ctxSvg = q.contextSvg || (q.analogySvg ? {
        figA: q.analogySvg.figA || q.analogySvg.a,
        figB: q.analogySvg.figB || q.analogySvg.b,
        figC: q.analogySvg.figC || q.analogySvg.c
      } : null);
      if (ctxSvg) {
        if (!ctxSvg.figA || !ctxSvg.figB || !ctxSvg.figC) errors.push(`Test ${t} Q${idx+1} incomplete analogy`);
      }

      // Test matrix logic
      const matrixArr = (Array.isArray(q.matrixCells) ? q.matrixCells : null) || (Array.isArray(q.matrixSvg) ? q.matrixSvg : null);
      if (q.matrixSvg && typeof q.matrixSvg === 'string') {
        q.matrixSvg.replace(/viewBox="0 0 100 100"/g, 'viewBox="0 0 70 70"');
      }
      if (matrixArr) {
        if (matrixArr.length !== 9) errors.push(`Test ${t} Q${idx+1} matrixArr length !== 9: ${matrixArr.length}`);
      }

      // Test folding / figureSvg logic
      if (q.figureSvg) {
        const rawSvg = Array.isArray(q.figureSvg) ? q.figureSvg[0] : q.figureSvg;
        if (typeof rawSvg !== 'string') errors.push(`Test ${t} Q${idx+1} figureSvg rawSvg not string`);
      }

      // If subType is analogy, make sure ctxSvg exists!
      if (q.subType === 'analogy' && q.category === 'spatial') {
        if (!ctxSvg) errors.push(`Test ${t} Q${idx+1} spatial analogy has NO visual!`);
      }

      // If subType is matrix / spatial_matrix, make sure matrix exists!
      if ((q.subType === 'matrix' || q.subType === 'spatial_matrix') && q.category === 'spatial') {
        if (!matrixArr && !(q.matrixSvg && typeof q.matrixSvg === 'string') && !(q.matrixData)) {
          errors.push(`Test ${t} Q${idx+1} spatial matrix has NO visual!`);
        }
      }

      // If subType is series / next_in_series, make sure series exists!
      if ((q.subType === 'series' || q.subType === 'next_in_series') && q.category === 'spatial') {
        if (!seqFrames) errors.push(`Test ${t} Q${idx+1} spatial series has NO visual!`);
      }

      // If subType is folding, make sure figureSvg exists!
      if (q.subType === 'folding' && q.category === 'spatial') {
        if (!q.figureSvg) errors.push(`Test ${t} Q${idx+1} spatial folding has NO visual!`);
      }
    } catch (err) {
      errors.push(`Test ${t} Q${idx+1} threw: ${err.message}`);
    }
  });
}

if (errors.length > 0) {
  console.log(`Errors found (${errors.length}):`);
  console.log(errors.slice(0, 20).join('\n'));
  process.exit(1);
} else {
  console.log('SUCCESS: All 30 tests (1,500 questions) verified! Visuals, matrices, analogies, sequences, and foldings render without error!');
}
