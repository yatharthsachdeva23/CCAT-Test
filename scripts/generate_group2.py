# Python script defining generators for archetypes 44 through 65 (Group 2)

group2_code = """
// 44: COMPOUND POPULATION GROWTH
VARIANT_GENERATORS[44] = (cycle, rand) => {
  const table = [
    { p0: 50000, r: 10, yrs: 2, ans: 60500 },
    { p0: 20000, r: 5, yrs: 2, ans: 22050 },
    { p0: 30000, r: 10, yrs: 2, ans: 36300 },
    { p0: 80000, r: 5, yrs: 2, ans: 88200 },
    { p0: 40000, r: 20, yrs: 2, ans: 57600 },
    { p0: 25000, r: 10, yrs: 2, ans: 30250 },
    { p0: 60000, r: 5, yrs: 2, ans: 66150 },
    { p0: 100000, r: 4, yrs: 2, ans: 108160 },
    { p0: 75000, r: 10, yrs: 2, ans: 90750 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A suburban township currently has a population of ${item.p0.toLocaleString()} residents. If the township's population expands at a constant compounded rate of ${item.r}% annually, what will the total population be after exactly ${item.yrs} years?`;
  const correct = `${item.ans.toLocaleString()}`;
  const distractors = [`${(item.p0 * (1 + item.r * item.yrs / 100)).toLocaleString()}`, `${(item.ans + 2500).toLocaleString()}`, `${(item.ans - 3000).toLocaleString()}`, `${(item.ans + 6000).toLocaleString()}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Compounded formula: P = P_0 * (1 + r)^t = ${item.p0} * (1 + ${item.r / 100})^${item.yrs}.\\n2. Population = **${correct}**.`,
    category: 'math', subType: 'percentage'
  };
};

// 45: RATIOS - COMBINING TWO SOLUTION MIXTURES
VARIANT_GENERATORS[45] = (cycle, rand) => {
  const table = [
    { r1A: 3, r1B: 2, r2A: 4, r2B: 1, frac: '7/10' },
    { r1A: 2, r1B: 1, r2A: 3, r2B: 1, frac: '17/24' },
    { r1A: 5, r1B: 1, r2A: 2, r2B: 1, frac: '9/12' },
    { r1A: 3, r1B: 1, r2A: 1, r2B: 1, frac: '5/8' },
    { r1A: 4, r1B: 3, r2A: 5, r2B: 2, frac: '9/14' },
    { r1A: 2, r1B: 3, r2A: 3, r2B: 2, frac: '1/2' },
    { r1A: 1, r1B: 2, r2A: 2, r2B: 1, frac: '1/2' },
    { r1A: 3, r1B: 2, r2A: 1, r2B: 4, frac: '2/5' },
    { r1A: 5, r1B: 3, r2A: 7, r2B: 1, frac: '3/4' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Vessel A contains a milk and water blend in the ratio ${item.r1A}:${item.r1B}. Vessel B contains a blend in the ratio ${item.r2A}:${item.r2B}. If equal volumes from both vessels are poured together into a large mixing container, what fraction of the combined liquid is milk?`;
  const correct = item.frac;
  const distractors = ['3/5', '2/3', '4/7', '5/6'].filter(d => d !== correct).slice(0, 4);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Fraction of milk = 1/2 * (${item.r1A}/${item.r1A + item.r1B} + ${item.r2A}/${item.r2A + item.r2B}) = **${item.frac}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 46: RATIOS - REPLACEMENT MIXTURE
VARIANT_GENERATORS[46] = (cycle, rand) => {
  const table = [
    { init: 50, rem: 10, left: 32 },
    { init: 60, rem: 12, left: 38.4 },
    { init: 40, rem: 8, left: 25.6 },
    { init: 80, rem: 16, left: 51.2 },
    { init: 50, rem: 5, left: 40.5 },
    { init: 100, rem: 20, left: 64 },
    { init: 60, rem: 10, left: 41.7 },
    { init: 40, rem: 10, left: 22.5 },
    { init: 80, rem: 20, left: 45 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A laboratory flask contains ${item.init} liters of pure ethanol. A chemist draws out ${item.rem} liters of ethanol and replaces it with an equal volume of distilled water. The chemist repeats this exact operation a second time. How many liters of pure ethanol remain in the flask?`;
  const correct = `${item.left} liters`;
  const distractors = [`${(item.init - item.rem * 2)} liters`, `${(item.left + 4).toFixed(1)} liters`, `${Math.max(10, item.left - 4).toFixed(1)} liters`, '28.0 liters'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Remaining = ${item.init} * (1 - ${item.rem}/${item.init})^2 = **${item.left} liters**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 47: RATIOS - DIVIDING SUM WITH DIFFERENCES
VARIANT_GENERATORS[47] = (cycle, rand) => {
  const table = [
    { sum: 9000, d1: 600, d2: 300, c: 2600, b: 2900, a: 3500 },
    { sum: 6000, d1: 400, d2: 200, c: 1800, b: 2000, a: 2400 },
    { sum: 12000, d1: 1000, d2: 500, c: 3500, b: 4000, a: 5000 },
    { sum: 8400, d1: 500, d2: 400, c: 2500, b: 2900, a: 3400 },
    { sum: 10500, d1: 800, d2: 500, c: 3100, b: 3600, a: 4400 },
    { sum: 7500, d1: 500, d2: 250, c: 2250, b: 2500, a: 3000 },
    { sum: 9600, d1: 700, d2: 300, c: 2800, b: 3100, a: 3800 },
    { sum: 11400, d1: 900, d2: 600, c: 3300, b: 3900, a: 4800 },
    { sum: 6600, d1: 600, d2: 300, c: 1800, b: 2100, a: 2700 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `An annual partnership bonus of $${item.sum.toLocaleString()} is distributed among three partners A, B, and C such that Partner A receives $${item.d1} more than Partner B, and Partner B receives $${item.d2} more than Partner C. How much bonus does Partner A receive?`;
  const correct = `$${item.a.toLocaleString()}`;
  const distractors = [`$${item.b.toLocaleString()}`, `$${item.c.toLocaleString()}`, `$${(item.a + 500).toLocaleString()}`, `$${(item.a - 600).toLocaleString()}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Let C = x, B = x + ${item.d2}, A = x + ${item.d2} + ${item.d1}.\\n2. 3x + ${item.d1 + 2 * item.d2} = ${item.sum} => x = ${item.c}.\\n3. A = **$${item.a.toLocaleString()}**.`,
    category: 'math', subType: 'algebra'
  };
};

// 48: RATIOS - INVERSE VARIATION WITH SQUARE
VARIANT_GENERATORS[48] = (cycle, rand) => {
  const table = [
    { d1: 2, i1: 180, d2: 6, i2: 20 },
    { d1: 3, i1: 200, d2: 6, i2: 50 },
    { d1: 2, i1: 100, d2: 4, i2: 25 },
    { d1: 4, i1: 144, d2: 8, i2: 36 },
    { d1: 3, i1: 180, d2: 9, i2: 20 },
    { d1: 2, i1: 360, d2: 6, i2: 40 },
    { d1: 5, i1: 200, d2: 10, i2: 50 },
    { d1: 2, i1: 250, d2: 5, i2: 40 },
    { d1: 4, i1: 300, d2: 8, i2: 75 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `The physical intensity I of a signal varies inversely with the SQUARE of the distance d from the broadcast antenna. If the intensity is ${item.i1} units at a distance of ${item.d1} meters, what is the intensity at a distance of ${item.d2} meters?`;
  const correct = `${item.i2} units`;
  const distractors = [`${Math.round(item.i1 * item.d1 / item.d2)} units`, `${item.i2 + 15} units`, `${Math.max(5, item.i2 - 8)} units`, `${item.i2 * 2} units`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. I_1 * d_1^2 = I_2 * d_2^2 => I_2 = ${item.i1} * (${item.d1}/${item.d2})^2 = **${item.i2} units**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 49: SEQUENCES - ARITHMETIC PROGRESSION SUM
VARIANT_GENERATORS[49] = (cycle, rand) => {
  const table = [
    { a: 5, d: 4, n: 20, sum: 860 },
    { a: 3, d: 5, n: 15, sum: 570 },
    { a: 6, d: 3, n: 25, sum: 1050 },
    { a: 4, d: 6, n: 18, sum: 990 },
    { a: 7, d: 4, n: 20, sum: 900 },
    { a: 2, d: 7, n: 16, sum: 872 },
    { a: 8, d: 5, n: 20, sum: 1110 },
    { a: 10, d: 4, n: 15, sum: 570 },
    { a: 3, d: 8, n: 12, sum: 564 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `What is the sum of the first ${item.n} terms of the arithmetic progression starting with ${item.a}, ${item.a + item.d}, ${item.a + 2 * item.d}, ...?`;
  const correct = `${item.sum}`;
  const distractors = [`${item.sum + 40}`, `${item.sum - 35}`, `${item.n * (item.a + item.d)}`, `${item.sum + 80}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. S_n = n/2 * (2a + (n - 1)d) = ${item.n}/2 * (2(${item.a}) + ${item.n - 1}(${item.d})) = **${item.sum}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 50: SEQUENCES - INFINITE GEOMETRIC PROGRESSION
VARIANT_GENERATORS[50] = (cycle, rand) => {
  const table = [
    { a: 36, r: '1/3', rNum: 1/3, sum: 54 },
    { a: 48, r: '1/4', rNum: 1/4, sum: 64 },
    { a: 60, r: '1/2', rNum: 1/2, sum: 120 },
    { a: 45, r: '1/3', rNum: 1/3, sum: 67.5 },
    { a: 50, r: '1/5', rNum: 1/5, sum: 62.5 },
    { a: 32, r: '1/2', rNum: 1/2, sum: 64 },
    { a: 72, r: '1/3', rNum: 1/3, sum: 108 },
    { a: 40, r: '1/2', rNum: 1/2, sum: 80 },
    { a: 64, r: '1/4', rNum: 1/4, sum: 85.3 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Calculate the exact sum to infinity of the decreasing geometric progression: ${item.a} + ${(item.a * item.rNum).toFixed(1)} + ... where the common ratio is ${item.r}.`;
  const correct = `${item.sum}`;
  const distractors = [`${(item.sum + 10).toFixed(0)}`, `${(item.sum - 8).toFixed(0)}`, `${item.a * 2}`, '100'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Formula: S = a / (1 - r) = ${item.a} / (1 - ${item.r}) = **${item.sum}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 51: SEQUENCES - ALTERNATING OPERATIONS
VARIANT_GENERATORS[51] = (cycle, rand) => {
  const table = [
    { seq: '4, 8, 11, 22, 25, 50', next: 53 },
    { seq: '2, 6, 9, 27, 30', next: 90 },
    { seq: '5, 10, 14, 28, 32', next: 64 },
    { seq: '3, 9, 12, 36, 39', next: 117 },
    { seq: '6, 12, 15, 30, 33', next: 66 },
    { seq: '2, 8, 11, 44, 47', next: 188 },
    { seq: '4, 12, 16, 48, 52', next: 156 },
    { seq: '5, 15, 18, 54, 57', next: 171 },
    { seq: '3, 6, 10, 20, 24', next: 48 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Identify the next number in the following sequence:\\n\\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 4}`, `${item.next + 6}`, `${item.next * 2}`, `${item.next - 10}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Alternating arithmetic and multiplicative operations.\\n2. Next term = **${item.next}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 52: SEQUENCES - DIFFERENCES OF DIFFERENCES
VARIANT_GENERATORS[52] = (cycle, rand) => {
  const table = [
    { seq: '4, 7, 13, 22, 34', next: 49 },
    { seq: '6, 10, 17, 27, 40', next: 56 },
    { seq: '3, 8, 16, 27, 41', next: 58 },
    { seq: '5, 9, 16, 26, 39', next: 55 },
    { seq: '2, 7, 15, 26, 40', next: 57 },
    { seq: '7, 12, 20, 31, 45', next: 62 },
    { seq: '4, 10, 19, 31, 46', next: 64 },
    { seq: '5, 11, 20, 32, 47', next: 65 },
    { seq: '3, 9, 18, 30, 45', next: 63 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Identify the next number in the following sequence:\\n\\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 3}`, `${item.next + 4}`, `${item.next - 6}`, `${item.next + 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Second difference is constant.\\n2. Next term = **${item.next}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 53: SEQUENCES - TRIANGULAR NUMBERS
VARIANT_GENERATORS[53] = (cycle, rand) => {
  const table = [
    { seq: '3, 6, 10, 15, 21, 28', next: 36 },
    { seq: '6, 10, 15, 21, 28, 36', next: 45 },
    { seq: '10, 15, 21, 28, 36, 45', next: 55 },
    { seq: '15, 21, 28, 36, 45, 55', next: 66 },
    { seq: '1, 3, 6, 10, 15, 21', next: 28 },
    { seq: '21, 28, 36, 45, 55, 66', next: 78 },
    { seq: '28, 36, 45, 55, 66, 78', next: 91 },
    { seq: '36, 45, 55, 66, 78, 91', next: 105 },
    { seq: '45, 55, 66, 78, 91, 105', next: 120 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Identify the next number in the following series:\\n\\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 3}`, `${item.next + 4}`, `${item.next - 5}`, `${item.next + 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Differences increase by 1 each step (triangular sequence).\\n2. Next term = **${item.next}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 54: SEQUENCES - CUBIC OFFSETS
VARIANT_GENERATORS[54] = (cycle, rand) => {
  const table = [
    { seq: '0, 7, 26, 63, 124', next: 215, rule: 'n^3 - 1' },
    { seq: '2, 9, 28, 65, 126', next: 217, rule: 'n^3 + 1' },
    { seq: '0, 6, 24, 60, 120', next: 210, rule: 'n^3 - n' },
    { seq: '8, 27, 64, 125, 216', next: 343, rule: 'n^3' },
    { seq: '3, 10, 29, 66, 127', next: 218, rule: 'n^3 + 2' },
    { seq: '-1, 6, 25, 62, 123', next: 214, rule: 'n^3 - 2' },
    { seq: '4, 11, 30, 67, 128', next: 219, rule: 'n^3 + 3' },
    { seq: '5, 12, 31, 68, 129', next: 220, rule: 'n^3 + 4' },
    { seq: '1, 8, 27, 64, 125', next: 216, rule: 'n^3' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Identify the next number in the following sequence:\\n\\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 15}`, `${item.next + 12}`, '200', '250'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Pattern: ${item.rule}.\\n2. Next term = **${item.next}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 55: AGE PROBLEM PAST AND FUTURE RATIOS
VARIANT_GENERATORS[55] = (cycle, rand) => {
  const table = [
    { ago: 5, rAgo: 3, fut: 5, rFut: 2, fNow: 35, sNow: 15 },
    { ago: 4, rAgo: 4, fut: 4, rFut: 2, fNow: 36, sNow: 12 },
    { ago: 6, rAgo: 3, fut: 6, rFut: 2, fNow: 42, sNow: 18 },
    { ago: 3, rAgo: 4, fut: 3, rFut: 2.5, fNow: 39, sNow: 12 },
    { ago: 8, rAgo: 3, fut: 8, rFut: 1.8, fNow: 44, sNow: 20 },
    { ago: 5, rAgo: 4, fut: 5, rFut: 2, fNow: 45, sNow: 15 },
    { ago: 4, rAgo: 5, fut: 4, rFut: 2.5, fNow: 44, sNow: 12 },
    { ago: 7, rAgo: 3, fut: 7, rFut: 2, fNow: 49, sNow: 21 },
    { ago: 6, rAgo: 4, fut: 6, rFut: 2, fNow: 54, sNow: 18 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `${item.ago} years ago, a father was ${item.rAgo} times as old as his son. In ${item.fut} years, the father will be ${item.rFut} times as old as his son. How old is the father currently?`;
  const correct = `${item.fNow} years`;
  const distractors = [`${item.fNow + 6} years`, `${item.fNow - 4} years`, `${item.sNow} years`, `${item.fNow + 10} years`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Set up equations from past and future ratio conditions.\\n2. Current father age = **${item.fNow} years**.`,
    category: 'math', subType: 'algebra'
  };
};

// 56: HEADS AND LEGS PROBLEM
VARIANT_GENERATORS[56] = (cycle, rand) => {
  const table = [
    { heads: 50, legs: 140, cows: 20, chic: 30 },
    { heads: 60, legs: 170, cows: 25, chic: 35 },
    { heads: 45, legs: 130, cows: 20, chic: 25 },
    { heads: 70, legs: 200, cows: 30, chic: 40 },
    { heads: 35, legs: 100, cows: 15, chic: 20 },
    { heads: 55, legs: 160, cows: 25, chic: 30 },
    { heads: 80, legs: 230, cows: 35, chic: 45 },
    { heads: 40, legs: 120, cows: 20, chic: 20 },
    { heads: 65, legs: 190, cows: 30, chic: 35 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A livestock farmer counts a total of ${item.heads} heads and ${item.legs} legs among chickens (2 legs each) and cows (4 legs each). How many cows are on the farm?`;
  const correct = `${item.cows}`;
  const distractors = [`${item.chic}`, `${item.cows + 5}`, `${Math.max(5, item.cows - 5)}`, `${item.heads - item.cows + 4}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. 2C + 4W = ${item.legs} and C + W = ${item.heads}.\\n2. 2W = ${item.legs} - 2(${item.heads}) => W = **${item.cows} cows**.`,
    category: 'math', subType: 'algebra'
  };
};

// 57: FRACTION TRANSFORMATION
VARIANT_GENERATORS[57] = (cycle, rand) => {
  const table = [
    { diff: 3, numAdd: 2, denSub: 1, res: '3/4', origNum: 7, origDen: 10 },
    { diff: 5, numAdd: 3, denSub: 2, res: '2/3', origNum: 7, origDen: 12 },
    { diff: 4, numAdd: 1, denSub: 3, res: '1/2', origNum: 5, origDen: 9 },
    { diff: 6, numAdd: 2, denSub: 2, res: '3/5', origNum: 10, origDen: 16 },
    { diff: 2, numAdd: 4, denSub: 2, res: '5/4', origNum: 6, origDen: 8 },
    { diff: 5, numAdd: 1, denSub: 1, res: '1/2', origNum: 4, origDen: 9 },
    { diff: 3, numAdd: 3, denSub: 1, res: '4/5', origNum: 5, origDen: 8 },
    { diff: 4, numAdd: 2, denSub: 2, res: '3/4', origNum: 10, origDen: 14 },
    { diff: 5, numAdd: 5, denSub: 3, res: '4/3', origNum: 11, origDen: 16 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `The denominator of a fraction exceeds its numerator by ${item.diff}. If ${item.numAdd} is added to the numerator and ${item.denSub} is subtracted from the denominator, the resulting fraction equals ${item.res}. What is the original fraction?`;
  const correct = `${item.origNum}/${item.origDen}`;
  const distractors = [`${item.origNum - 1}/${item.origDen}`, `${item.origNum + 1}/${item.origDen}`, `${item.origNum}/${item.origDen + 2}`, '3/7'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Let fraction = x / (x + ${item.diff}).\\n2. (x + ${item.numAdd}) / (x + ${item.diff} - ${item.denSub}) = ${item.res}.\\n3. x = ${item.origNum} => fraction = **${correct}**.`,
    category: 'math', subType: 'algebra'
  };
};

// 58: RIGHT TRIANGLE HYPOTENUSE AND PERIMETER
VARIANT_GENERATORS[58] = (cycle, rand) => {
  const table = [
    { a: 5, b: 12, c: 13, p: 30 },
    { a: 8, b: 15, c: 17, p: 40 },
    { a: 7, b: 24, c: 25, p: 56 },
    { a: 9, b: 12, c: 15, p: 36 },
    { a: 12, b: 16, c: 20, p: 48 },
    { a: 15, b: 20, c: 25, p: 60 },
    { a: 10, b: 24, c: 26, p: 60 },
    { a: 6, b: 8, c: 10, p: 24 },
    { a: 20, b: 21, c: 29, p: 70 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A right-angled triangular sail has legs measuring ${item.a} meters and ${item.b} meters. What is the total perimeter of the sail?`;
  const correct = `${item.p} meters`;
  const distractors = [`${item.p + 5} meters`, `${item.p - 4} meters`, `${item.a + item.b} meters`, `${item.p * 1.5} meters`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Hypotenuse = sqrt(${item.a}^2 + ${item.b}^2) = ${item.c} meters.\\n2. Perimeter = ${item.a} + ${item.b} + ${item.c} = **${item.p} meters**.`,
    category: 'math', subType: 'geometry'
  };
};

// 59: UNIFORM WALKWAY BORDER AREA
VARIANT_GENERATORS[59] = (cycle, rand) => {
  const table = [
    { l: 25, w: 15, border: 2, area: 176 },
    { l: 30, w: 20, border: 3, area: 336 },
    { l: 18, w: 12, border: 2, area: 136 },
    { l: 24, w: 16, border: 2, area: 176 },
    { l: 20, w: 10, border: 1, area: 64 },
    { l: 35, w: 25, border: 2, area: 256 },
    { l: 22, w: 14, border: 3, area: 252 },
    { l: 28, w: 18, border: 2, area: 200 },
    { l: 15, w: 10, border: 2, area: 116 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A rectangular swimming pool measures ${item.l} meters in length by ${item.w} meters in width. A concrete walkway of uniform width ${item.border} meters is constructed completely surrounding the outer perimeter of the pool. What is the total surface area of the concrete walkway alone?`;
  const correct = `${item.area} sq m`;
  const distractors = [`${item.area + 24} sq m`, `${Math.max(20, item.area - 20)} sq m`, `${(item.l + item.w) * item.border} sq m`, `${item.area * 2} sq m`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Outer area = (${item.l} + 2*${item.border}) * (${item.w} + 2*${item.border}).\\n2. Inner area = ${item.l} * ${item.w}.\\n3. Walkway area = **${item.area} sq m**.`,
    category: 'math', subType: 'geometry'
  };
};

// 60: DIMENSIONAL SCALING ON AREA
VARIANT_GENERATORS[60] = (cycle, rand) => {
  const table = [
    { inc: 30, areaInc: 69 },
    { inc: 40, areaInc: 96 },
    { inc: 50, areaInc: 125 },
    { inc: 10, areaInc: 21 },
    { inc: 60, areaInc: 156 },
    { inc: 25, areaInc: 56.25 },
    { inc: 15, areaInc: 32.25 },
    { inc: 100, areaInc: 300 },
    { inc: 35, areaInc: 82.25 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `If the radius of a circular solar collection dish is increased by ${item.inc}%, by what percentage does the total surface collection area increase?`;
  const correct = `${item.areaInc}%`;
  const distractors = [`${item.inc * 2}%`, `${item.inc}%`, `${(item.areaInc + 15).toFixed(0)}%`, `${(item.areaInc - 10).toFixed(0)}%`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Area scales as r^2: (1 + ${item.inc / 100})^2 = ${(1 + item.inc / 100)**2}.\\n2. Percentage increase = **${item.areaInc}%**.`,
    category: 'math', subType: 'geometry'
  };
};

// 61: 3D BOX SPACE DIAGONAL
VARIANT_GENERATORS[61] = (cycle, rand) => {
  const table = [
    { l: 9, w: 12, h: 20, diag: 25 },
    { l: 6, w: 8, h: 24, diag: 26 },
    { l: 8, w: 9, h: 12, diag: 17 },
    { l: 4, w: 12, h: 3, diag: 13 },
    { l: 7, w: 24, h: 0, diag: 25 }, // will use 2, 3, 6 -> 7
    { l: 2, w: 3, h: 6, diag: 7 },
    { l: 10, w: 10, h: 5, diag: 15 },
    { l: 3, w: 4, h: 12, diag: 13 },
    { l: 12, w: 16, h: 15, diag: 25 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `What is the length of the longest rigid metal rod that can fit completely inside a closed rectangular storage box measuring ${item.l} meters by ${item.w} meters by ${item.h} meters?`;
  const correct = `${item.diag} meters`;
  const distractors = [`${item.diag + 4} meters`, `${Math.max(2, item.diag - 3)} meters`, `${item.l + item.w + item.h} meters`, '20 meters'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Space diagonal = sqrt(l^2 + w^2 + h^2) = sqrt(${item.l}^2 + ${item.w}^2 + ${item.h}^2) = **${item.diag} meters**.`,
    category: 'math', subType: 'geometry'
  };
};

// 62: DEPENDENT MARBLES WITHOUT REPLACEMENT
VARIANT_GENERATORS[62] = (cycle, rand) => {
  const table = [
    { r: 6, b: 8, frac: '15/91' },
    { r: 4, b: 6, frac: '2/15' },
    { r: 5, b: 5, frac: '2/9' },
    { r: 7, b: 5, frac: '7/22' },
    { r: 6, b: 6, frac: '5/22' },
    { r: 3, b: 7, frac: '1/15' },
    { r: 4, b: 8, frac: '1/11' },
    { r: 8, b: 4, frac: '14/33' },
    { r: 5, b: 9, frac: '10/91' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A pouch contains ${item.r} red marbles and ${item.b} blue marbles. If 2 marbles are randomly drawn one after the other without replacement, what is the probability that both drawn marbles are red?`;
  const correct = item.frac;
  const distractors = ['1/4', '2/7', '3/10', '5/12'].filter(d => d !== correct).slice(0, 4);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. P(Both Red) = (${item.r}/${item.r + item.b}) * (${item.r - 1}/${item.r + item.b - 1}) = **${item.frac}**.`,
    category: 'math', subType: 'probability'
  };
};

// 63: TWO DICE ROLL
VARIANT_GENERATORS[63] = (cycle, rand) => {
  const table = [
    { sum: 8, frac: '5/36' },
    { sum: 7, frac: '1/6' },
    { sum: 9, frac: '1/9' },
    { sum: 6, frac: '5/36' },
    { sum: 10, frac: '1/12' },
    { sum: 5, frac: '1/9' },
    { sum: 11, frac: '1/18' },
    { sum: 4, frac: '1/12' },
    { sum: 3, frac: '1/18' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `When two standard fair six-sided dice are rolled simultaneously, what is the probability that the sum of the numbers showing on the two dice is exactly ${item.sum}?`;
  const correct = item.frac;
  const distPool = ['1/36', '1/18', '1/12', '1/9', '5/36', '1/6', '7/36', '1/4', '1/8'];
  const distractors = distPool.filter(d => d !== correct).slice(0, 4);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Count favorable pairs yielding sum ${item.sum} out of 36 outcomes.\\n2. Probability = **${item.frac}**.`,
    category: 'math', subType: 'probability'
  };
};

// 64: AT LEAST ONE SUCCESS COMPLEMENT
VARIANT_GENERATORS[64] = (cycle, rand) => {
  const table = [
    { qText: 'A fair two-sided coin is flipped 5 times consecutively. What is the probability of obtaining at least one Head across the flips?', frac: '31/32' },
    { qText: 'A fair two-sided coin is flipped 3 times consecutively. What is the probability of obtaining at least one Head across the flips?', frac: '7/8' },
    { qText: 'A fair two-sided coin is flipped 6 times consecutively. What is the probability of obtaining at least one Head across the flips?', frac: '63/64' },
    { qText: 'A fair two-sided coin is flipped 4 times consecutively. What is the probability of obtaining at least one Head across the flips?', frac: '15/16' },
    { qText: 'A standard fair six-sided die is rolled 2 times consecutively. What is the probability of rolling at least one six?', frac: '11/36' },
    { qText: 'A fair two-sided coin is flipped 7 times consecutively. What is the probability of obtaining at least one Head across the flips?', frac: '127/128' },
    { qText: 'A 4-sided fair die numbered 1 to 4 is rolled 3 times. What is the probability of rolling at least one four?', frac: '37/64' },
    { qText: 'A fair two-sided coin is flipped 8 times consecutively. What is the probability of obtaining at least one Head across the flips?', frac: '255/256' },
    { qText: 'A fair two-sided coin is flipped 4 times consecutively. What is the probability of obtaining at least one Tail across the flips?', frac: '15/16' }
  ];
  const item = table[(cycle - 1) % table.length];
  const correct = item.frac;
  const distPool = ['1/2', '3/4', '7/8', '15/16', '31/32', '63/64', '11/36', '37/64', '5/8'];
  const distractors = distPool.filter(d => d !== correct).slice(0, 4);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: item.qText, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Use the complement rule: P(At least one success) = 1 - P(Zero successes).\\n2. Result = **${item.frac}**.`,
    category: 'math', subType: 'probability'
  };
};

// 65: WEIGHTED AVERAGE GRADE
VARIANT_GENERATORS[65] = (cycle, rand) => {
  const table = [
    { w1: 25, s1: 88, w2: 35, s2: 76, w3: 40, s3: 85, ans: '82.6%' },
    { w1: 20, s1: 95, w2: 30, s2: 80, w3: 50, s3: 78, ans: '82.0%' },
    { w1: 30, s1: 85, w2: 30, s2: 75, w3: 40, s3: 90, ans: '84.0%' },
    { w1: 15, s1: 90, w2: 35, s2: 70, w3: 50, s3: 82, ans: '79.0%' },
    { w1: 20, s1: 92, w2: 40, s2: 84, w3: 40, s3: 75, ans: '82.0%' },
    { w1: 25, s1: 80, w2: 25, s2: 90, w3: 50, s3: 86, ans: '85.5%' },
    { w1: 10, s1: 100, w2: 40, s2: 75, w3: 50, s3: 80, ans: '80.0%' },
    { w1: 30, s1: 90, w2: 30, s2: 85, w3: 40, s3: 70, ans: '80.5%' },
    { w1: 20, s1: 85, w2: 30, s2: 75, w3: 50, s3: 90, ans: '84.5%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A university finance course determines final grades using the following weights: Homework assignments account for ${item.w1}%, the Midterm exam accounts for ${item.w2}%, and the Final examination accounts for ${item.w3}%. If a student scores ${item.s1}% on Homework, ${item.s2}% on the Midterm, and ${item.s3}% on the Final, what is their final weighted course average?`;
  const correct = item.ans;
  const numA = parseFloat(item.ans);
  const distractors = [`${(numA + 3).toFixed(1)}%`, `${(numA - 2.5).toFixed(1)}%`, `${((item.s1 + item.s2 + item.s3) / 3).toFixed(1)}%`, '80.0%'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Weighted average = (${item.w1}*${item.s1} + ${item.w2}*${item.s2} + ${item.w3}*${item.s3}) / 100 = **${item.ans}**.`,
    category: 'math', subType: 'word_problem'
  };
};
"""
