# Python script defining generators for archetypes 0 through 21 (Group 0)

group0_code = """
// 0: VENN DIAGRAM
VARIANT_GENERATORS[0] = (cycle, rand) => {
  const table = [
    { total: 150, pA: 0.60, pB: 0.40, pBoth: 0.20, lA: 'Python', lB: 'Rust' },
    { total: 200, pA: 0.55, pB: 0.45, pBoth: 0.25, lA: 'Java', lB: 'C++' },
    { total: 160, pA: 0.65, pB: 0.40, pBoth: 0.20, lA: 'Python', lB: 'Go' },
    { total: 180, pA: 0.50, pB: 0.45, pBoth: 0.15, lA: 'SQL', lB: 'Python' },
    { total: 240, pA: 0.60, pB: 0.50, pBoth: 0.30, lA: 'JavaScript', lB: 'TypeScript' },
    { total: 140, pA: 0.70, pB: 0.40, pBoth: 0.25, lA: 'C#', lB: 'Java' },
    { total: 220, pA: 0.55, pB: 0.50, pBoth: 0.20, lA: 'Python', lB: 'R' },
    { total: 250, pA: 0.60, pB: 0.44, pBoth: 0.24, lA: 'Scala', lB: 'Kotlin' },
    { total: 300, pA: 0.50, pB: 0.40, pBoth: 0.20, lA: 'Python', lB: 'Rust' }
  ];
  const item = table[(cycle - 1) % table.length];
  const setA = Math.round(item.total * item.pA);
  const setB = Math.round(item.total * item.pB);
  const both = Math.round(item.total * item.pBoth);
  const neither = item.total - (setA + setB - both);
  const q = `In a software engineering department of ${item.total} engineers, ${setA} program in ${item.lA}, ${setB} program in ${item.lB}, and ${both} program in both languages. How many engineers in the department program in NEITHER ${item.lA} nor ${item.lB}?`;
  const correct = `${neither}`;
  const distractors = [`${neither + 10}`, `${Math.max(2, neither - 8)}`, `${item.total - (setA + setB)}`, `${both + neither}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Principle of Inclusion-Exclusion: |A U B| = ${setA} + ${setB} - ${both} = ${setA + setB - both}.\\n2. Neither = ${item.total} - ${setA + setB - both} = **${neither}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 1: CALENDAR / MODULAR ARITHMETIC
VARIANT_GENERATORS[1] = (cycle, rand) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const table = [
    { start: 'Tuesday', adv: 100 },
    { start: 'Wednesday', adv: 250 },
    { start: 'Thursday', adv: 145 },
    { start: 'Friday', adv: 300 },
    { start: 'Saturday', adv: 75 },
    { start: 'Sunday', adv: 215 },
    { start: 'Monday', adv: 120 },
    { start: 'Tuesday', adv: 365 },
    { start: 'Wednesday', adv: 160 }
  ];
  const item = table[(cycle - 1) % table.length];
  const sIdx = days.indexOf(item.start);
  const rem = item.adv % 7;
  const targetDay = days[(sIdx + rem) % 7];
  const q = `If today is ${item.start}, what day of the week will it be exactly ${item.adv} days from today?`;
  const correct = targetDay;
  const distractors = days.filter(d => d !== targetDay).slice(0, 4);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Divide days by 7: ${item.adv} / 7 = ${Math.floor(item.adv / 7)} weeks with remainder ${rem}.\\n2. Advancing ${rem} days from ${item.start} lands on **${targetDay}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 2: SPEED - HEAD START
VARIANT_GENERATORS[2] = (cycle, rand) => {
  const table = [
    { v1: 40, v2: 60, h: 2, startH: 9, startStr: '9:00 AM', meetStr: '1:00 PM' },
    { v1: 50, v2: 80, h: 3, startH: 7, startStr: '7:00 AM', meetStr: '3:00 PM' },
    { v1: 30, v2: 50, h: 2, startH: 8, startStr: '8:00 AM', meetStr: '1:00 PM' },
    { v1: 60, v2: 90, h: 2, startH: 6, startStr: '6:00 AM', meetStr: '12:00 PM' },
    { v1: 15, v2: 45, h: 2, startH: 7, startStr: '7:00 AM', meetStr: '10:00 AM' },
    { v1: 45, v2: 70, h: 2, startH: 8, startStr: '8:00 AM', meetStr: '1:36 PM' },
    { v1: 20, v2: 35, h: 3, startH: 9, startStr: '9:00 AM', meetStr: '4:00 PM' },
    { v1: 45, v2: 60, h: 2, startH: 7, startStr: '7:00 AM', meetStr: '3:00 PM' },
    { v1: 50, v2: 75, h: 2, startH: 8, startStr: '8:00 AM', meetStr: '2:00 PM' }
  ];
  const item = table[(cycle - 1) % table.length];
  const depH = item.startH + item.h;
  const depStr = depH > 12 ? `${depH - 12}:00 PM` : `${depH}:00 AM`;
  const catchH = (item.v1 * item.h) / (item.v2 - item.v1);
  const q = `At exactly ${item.startStr}, Courier Van A leaves a dispatch center traveling at ${item.v1} mph. At ${depStr}, Express Interceptor B departs from the same station along the identical route at ${item.v2} mph. At what specific clock time will Interceptor B overtake Van A?`;
  const correct = item.meetStr;
  const distractors = ['11:30 AM', '12:30 PM', '2:30 PM', '4:30 PM'].filter(d => d !== correct).slice(0, 4);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Van A head start = ${item.v1} mph * ${item.h} hrs = ${item.v1 * item.h} miles.\\n2. Relative speed = ${item.v2} - ${item.v1} = ${item.v2 - item.v1} mph.\\n3. Overtake time = ${item.v1 * item.h} / ${item.v2 - item.v1} = ${catchH.toFixed(1)} hrs.\\n4. Time = **${item.meetStr}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 3: AVERAGE SPEED
VARIANT_GENERATORS[3] = (cycle, rand) => {
  const table = [
    { d1: 150, s1: 50, d2: 100, s2: 25 },
    { d1: 180, s1: 60, d2: 120, s2: 40 },
    { d1: 200, s1: 50, d2: 60, s2: 30 },
    { d1: 90, s1: 45, d2: 120, s2: 60 },
    { d1: 140, s1: 70, d2: 90, s2: 30 },
    { d1: 100, s1: 50, d2: 150, s2: 75 },
    { d1: 160, s1: 40, d2: 120, s2: 60 },
    { d1: 240, s1: 60, d2: 60, s2: 30 },
    { d1: 120, s1: 40, d2: 180, s2: 60 }
  ];
  const item = table[(cycle - 1) % table.length];
  const t1 = item.d1 / item.s1;
  const t2 = item.d2 / item.s2;
  const totalD = item.d1 + item.d2;
  const totalT = t1 + t2;
  const avg = (totalD / totalT).toFixed(1);
  const q = `A delivery truck travels the first ${item.d1} miles of a route at an average speed of ${item.s1} mph, and travels the remaining ${item.d2} miles at ${item.s2} mph. What is the vehicle's overall average speed across the complete ${totalD}-mile route?`;
  const correct = `${avg} mph`;
  const distractors = [`${((item.s1 + item.s2) / 2).toFixed(1)} mph`, `${(parseFloat(avg) + 4.5).toFixed(1)} mph`, `${(parseFloat(avg) - 3.5).toFixed(1)} mph`, `${(parseFloat(avg) + 8.0).toFixed(1)} mph`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Total Distance = ${totalD} miles.\\n2. Total Time = ${item.d1}/${item.s1} + ${item.d2}/${item.s2} = ${t1} + ${t2} = ${totalT} hours.\\n3. Average Speed = ${totalD} / ${totalT} = **${avg} mph**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 4: RULE OF 72
VARIANT_GENERATORS[4] = (cycle, rand) => {
  const rates = [8, 12, 4, 3, 18, 24, 7.2, 16, 9.6];
  const r = rates[(cycle - 1) % rates.length];
  const yrs = (72 / r).toFixed(r === 7.2 || r === 9.6 ? 1 : 0);
  const q = `According to the standard financial Rule of 72, approximately how many years will it take for a commercial treasury bond earning ${r}% interest compounded annually to double in total investment value?`;
  const correct = `${yrs} years`;
  const numY = parseFloat(yrs);
  const distractors = [`${(numY + 3).toFixed(0)} years`, `${Math.max(1, numY - 2).toFixed(0)} years`, `${Math.round(100 / r)} years`, `${(numY + 6).toFixed(0)} years`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Rule of 72: T = 72 / R.\\n2. T = 72 / ${r} = **${yrs} years**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 5: COMPOUNDING PERCENTAGE SHIFTS
VARIANT_GENERATORS[5] = (cycle, rand) => {
  const table = [
    { u1: 10, d: 20, u2: 30 },
    { u1: 25, d: 20, u2: 10 },
    { u1: 30, d: 10, u2: 10 },
    { u1: 15, d: 20, u2: 10 },
    { u1: 40, d: 25, u2: 10 },
    { u1: 20, d: 25, u2: 20 },
    { u1: 50, d: 20, u2: 10 },
    { u1: 10, d: 10, u2: 20 },
    { u1: 30, d: 30, u2: 20 }
  ];
  const item = table[(cycle - 1) % table.length];
  const mult = (1 + item.u1 / 100) * (1 - item.d / 100) * (1 + item.u2 / 100);
  const net = ((mult - 1) * 100).toFixed(1);
  const q = `During a volatile trading quarter, a technology fund's unit price increases by ${item.u1}% in Month 1, drops by ${item.d}% in Month 2, and subsequently increases by ${item.u2}% in Month 3. What is the net overall percentage increase from the initial starting price?`;
  const correct = `${net}%`;
  const trap = `${item.u1 - item.d + item.u2}.0%`;
  const distractors = [trap, `${(parseFloat(net) + 5.0).toFixed(1)}%`, `${(parseFloat(net) - 4.0).toFixed(1)}%`, '18.5%'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Multiplier: ${(1 + item.u1 / 100).toFixed(2)} * ${(1 - item.d / 100).toFixed(2)} * ${(1 + item.u2 / 100).toFixed(2)} = ${mult.toFixed(4)}.\\n2. Net shift = (${mult.toFixed(4)} - 1) * 100% = **${net}%**.`,
    category: 'math', subType: 'percentage'
  };
};

// 6: PROFIT ON SELLING PRICE VS COST PRICE
VARIANT_GENERATORS[6] = (cycle, rand) => {
  const table = [
    { sp: 25, cp: '33.3%' },
    { sp: 40, cp: '66.7%' },
    { sp: 16.7, cp: '20.0%' },
    { sp: 10, cp: '11.1%' },
    { sp: 30, cp: '42.9%' },
    { sp: 35, cp: '53.8%' },
    { sp: 12.5, cp: '14.3%' },
    { sp: 33.3, cp: '50.0%' },
    { sp: 20, cp: '25.0%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A wholesale merchant prices inventory such that their net profit equals exactly ${item.sp}% of the final SELLING price. What is the merchant's net profit percentage based on the wholesale COST price?`;
  const correct = item.cp;
  const numCp = parseFloat(item.cp);
  const distractors = [`${item.sp}%`, `${(numCp + 10).toFixed(1)}%`, `${Math.max(5, numCp - 10).toFixed(1)}%`, `${(numCp * 1.5).toFixed(1)}%`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. If profit is ${item.sp}% of SP, Cost is ${(100 - item.sp).toFixed(1)}% of SP.\\n2. Profit / Cost = ${item.sp} / ${(100 - item.sp).toFixed(1)} = **${item.cp}**.`,
    category: 'math', subType: 'percentage'
  };
};

// 7: PERMUTATIONS ADJACENT CONSTRAINT
VARIANT_GENERATORS[7] = (cycle, rand) => {
  const table = [
    { n: 6, roleA: 'CEO', roleB: 'CFO', ways: 240, title: 'corporate executives' },
    { n: 4, roleA: 'Director', roleB: 'Producer', ways: 12, title: 'film crew leads' },
    { n: 5, roleA: 'Lead Architect', roleB: 'Project Manager', ways: 48, title: 'system architects' },
    { n: 6, roleA: 'President', roleB: 'Secretary', ways: 240, title: 'diplomatic envoys' },
    { n: 5, roleA: 'Captain', roleB: 'Co-Captain', ways: 48, title: 'team athletes' },
    { n: 6, roleA: 'Mayor', roleB: 'Deputy Mayor', ways: 240, title: 'city delegates' },
    { n: 4, roleA: 'Founder', roleB: 'Head of Product', ways: 12, title: 'startup founders' },
    { n: 5, roleA: 'Dean', roleB: 'Department Chair', ways: 48, title: 'faculty members' },
    { n: 6, roleA: 'Partner', roleB: 'Managing Partner', ways: 240, title: 'law partners' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `In how many distinct arrangements can ${item.n} ${item.title} sit in a row of ${item.n} chairs for an annual board meeting if the ${item.roleA} and ${item.roleB} insist on sitting directly next to each other?`;
  const correct = `${item.ways}`;
  const distractors = [`${item.ways / 2}`, `${item.ways * 2}`, `${item.ways + 24}`, '120'].filter(d => d !== correct).slice(0, 4);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Combine the 2 adjacent members into 1 unit: (${item.n} - 1)! units.\\n2. Within the unit, they arrange in 2! = 2 ways.\\n3. Total = (${item.n - 1})! * 2 = **${item.ways}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 8: LCM OF THREE TIMERS
VARIANT_GENERATORS[8] = (cycle, rand) => {
  const table = [
    { a: 12, b: 15, c: 20, lcm: 60 },
    { a: 15, b: 20, c: 30, lcm: 60 },
    { a: 12, b: 18, c: 24, lcm: 72 },
    { a: 8, b: 12, c: 16, lcm: 48 },
    { a: 10, b: 20, c: 35, lcm: 140 },
    { a: 14, b: 21, c: 28, lcm: 84 },
    { a: 9, b: 12, c: 15, lcm: 180 },
    { a: 16, b: 24, c: 32, lcm: 96 },
    { a: 6, b: 15, c: 20, lcm: 60 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Three automated production sensors cycle on timers of ${item.a} seconds, ${item.b} seconds, and ${item.c} seconds respectively. If all three sensors trigger simultaneously right now, after how many seconds will all three trigger together again at the exact same instant?`;
  const correct = `${item.lcm} seconds`;
  const distractors = [`${item.a * item.b} seconds`, `${item.lcm / 2} seconds`, `${item.lcm + item.a} seconds`, `${item.a + item.b + item.c} seconds`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Find LCM(${item.a}, ${item.b}, ${item.c}).\\n2. LCM = **${item.lcm} seconds**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 9: SIMILAR TRIANGLE SHADOW
VARIANT_GENERATORS[9] = (cycle, rand) => {
  const table = [
    { pH: 5, pS: 3, tS: 24, tH: 40 },
    { pH: 8, pS: 6, tS: 45, tH: 60 },
    { pH: 6, pS: 5, tS: 35, tH: 42 },
    { pH: 10, pS: 4, tS: 36, tH: 90 },
    { pH: 4, pS: 3, tS: 36, tH: 48 },
    { pH: 6, pS: 8, tS: 40, tH: 30 },
    { pH: 5, pS: 2, tS: 18, tH: 45 },
    { pH: 9, pS: 6, tS: 30, tH: 45 },
    { pH: 6, pS: 4, tS: 32, tH: 48 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `At 3:00 PM on a clear afternoon, a vertical ${item.pH}-foot signpost casts a shadow of ${item.pS} feet on level ground. At the same instant, a nearby pine tree casts a shadow of ${item.tS} feet. What is the height of the tree?`;
  const correct = `${item.tH} feet`;
  const distractors = [`${item.tH + 6} feet`, `${item.tH - 4} feet`, `${item.tS} feet`, `${Math.round(item.tH * 1.2)} feet`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Ratio = ${item.pH} / ${item.pS} = ${(item.pH / item.pS).toFixed(2)}.\\n2. Tree Height = ${(item.pH / item.pS).toFixed(2)} * ${item.tS} = **${item.tH} feet**.`,
    category: 'math', subType: 'geometry'
  };
};

// 10: GEOMETRIC PROBABILITY TARGET
VARIANT_GENERATORS[10] = (cycle, rand) => {
  const table = [10, 15, 25, 30, 40, 50, 12, 16, 24];
  const side = table[(cycle - 1) % table.length];
  const q = `A dart is randomly thrown and guaranteed to land inside a square target board of side length ${side} cm. If a circular bullseye of diameter ${side} cm is inscribed perfectly inside the square, what is the probability that the dart lands inside the circular bullseye? (Use pi ≈ 3.1416)`;
  const correct = '78.5%';
  const distractors = ['63.7%', '50.0%', '82.4%', '71.2%'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (78.5%)\\n\\n**Step-by-step Solution:**\\n1. Ratio of inscribed circle to square = pi / 4 ≈ 0.7854 or **78.5%**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 11: WORK OPPOSING RATES
VARIANT_GENERATORS[11] = (cycle, rand) => {
  const table = [
    { fill: 4, drain: 6, total: 12 },
    { fill: 8, drain: 12, total: 24 },
    { fill: 5, drain: 10, total: 10 },
    { fill: 10, drain: 15, total: 30 },
    { fill: 6, drain: 8, total: 24 },
    { fill: 4, drain: 8, total: 8 },
    { fill: 12, drain: 20, total: 30 },
    { fill: 9, drain: 18, total: 18 },
    { fill: 6, drain: 9, total: 18 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `An intake valve can fill an industrial cooling reservoir in ${item.fill} hours, while an emergency drainage valve can completely drain it in ${item.drain} hours. If the reservoir starts empty and both valves are opened simultaneously, in how many hours will the reservoir be completely full?`;
  const correct = `${item.total} hours`;
  const distractors = [`${item.drain - item.fill} hours`, `${(item.fill + item.drain) / 2} hours`, `${item.total + 5} hours`, `${item.total * 2} hours`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Net rate = 1/${item.fill} - 1/${item.drain} = 1/${item.total} per hour.\\n2. Total time = 1 / (1/${item.total}) = **${item.total} hours**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 12: AGE RATIOS THREE GENERATIONS
VARIANT_GENERATORS[12] = (cycle, rand) => {
  const table = [
    { son: 10, fMult: 3, gMult: 2 },
    { son: 14, fMult: 3, gMult: 2 },
    { son: 15, fMult: 3, gMult: 2 },
    { son: 8, fMult: 4, gMult: 2 },
    { son: 12, fMult: 3, gMult: 2 },
    { son: 16, fMult: 3, gMult: 2 },
    { son: 9, fMult: 3, gMult: 2 },
    { son: 11, fMult: 3, gMult: 2 },
    { son: 13, fMult: 3, gMult: 2 }
  ];
  const item = table[(cycle - 1) % table.length];
  const fAge = item.son * item.fMult;
  const gAge = fAge * item.gMult;
  const sum = item.son + fAge + gAge;
  const q = `A grandfather is ${item.gMult} times as old as his son, and the father is ${item.fMult} times as old as his grandson. If the sum of their three ages is ${sum} years, how old is the father?`;
  const correct = `${fAge} years`;
  const distractors = [`${item.son} years`, `${gAge} years`, `${fAge + 6} years`, `${fAge - 6} years`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Let grandson = x. Father = ${item.fMult}x. Grandfather = ${item.fMult * item.gMult}x.\\n2. Sum = ${1 + item.fMult + item.fMult * item.gMult}x = ${sum} => x = ${item.son}.\\n3. Father's age = ${item.fMult} * ${item.son} = **${fAge} years**.`,
    category: 'math', subType: 'algebra'
  };
};

// 13: DIVISIBILITY BY 9 MISSING DIGIT
VARIANT_GENERATORS[13] = (cycle, rand) => {
  const table = [
    { str: '38_14', sum: 16, miss: 2 },
    { str: '71_52', sum: 15, miss: 3 },
    { str: '64_23', sum: 15, miss: 3 },
    { str: '92_31', sum: 15, miss: 3 },
    { str: '58_41', sum: 18, miss: 9 },
    { str: '19_72', sum: 19, miss: 8 },
    { str: '43_81', sum: 16, miss: 2 },
    { str: '62_51', sum: 14, miss: 4 },
    { str: '75_12', sum: 15, miss: 3 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `What single digit must replace the underscore in the 5-digit number ${item.str} so that the resulting number is completely divisible by 9?`;
  const correct = `${item.miss}`;
  const distractors = [1, 2, 4, 5, 6, 7, 8].filter(d => d !== item.miss).slice(0, 4).map(String);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Sum of known digits = ${item.sum}.\\n2. Next multiple of 9 is ${Math.ceil((item.sum + 1) / 9) * 9}.\\n3. Missing digit = **${item.miss}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 14: ALGEBRA MULTI-VARIABLE BUNDLES
VARIANT_GENERATORS[14] = (cycle, rand) => {
  const table = [
    { pP: 2, nP: 6, p1: 3, n1: 2, p2: 1, n2: 4 },
    { pP: 4, nP: 5, p1: 3, n1: 2, p2: 2, n2: 3 },
    { pP: 3, nP: 7, p1: 2, n1: 3, p2: 4, n2: 1 },
    { pP: 5, nP: 4, p1: 4, n1: 2, p2: 1, n2: 3 },
    { pP: 2, nP: 5, p1: 5, n1: 2, p2: 2, n2: 4 },
    { pP: 3, nP: 6, p1: 2, n1: 4, p2: 3, n2: 2 },
    { pP: 4, nP: 8, p1: 3, n1: 1, p2: 1, n2: 3 },
    { pP: 5, nP: 6, p1: 2, n1: 3, p2: 3, n2: 2 },
    { pP: 2, nP: 8, p1: 4, n1: 2, p2: 2, n2: 3 }
  ];
  const item = table[(cycle - 1) % table.length];
  const tot1 = item.p1 * item.pP + item.n1 * item.nP;
  const tot2 = item.p2 * item.pP + item.n2 * item.nP;
  const comb = item.pP + item.nP;
  const q = `${item.p1} pens and ${item.n1} notebooks cost $${tot1} in total. ${item.p2} pens and ${item.n2} notebooks cost $${tot2} in total. What is the combined cost of purchasing exactly 1 pen and 1 notebook?`;
  const correct = `$${comb}`;
  const distractors = [`$${comb + 2}`, `$${comb - 1}`, `$${item.pP}`, `$${item.nP}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Solving the simultaneous system yields Pen = $${item.pP} and Notebook = $${item.nP}.\\n2. 1 Pen + 1 Notebook = **$${comb}**.`,
    category: 'math', subType: 'algebra'
  };
};

// 15: QUADRATIC SPEED / DRAG SCALING
VARIANT_GENERATORS[15] = (cycle, rand) => {
  const table = [
    { v1: 50, v2: 70, inc: 40, dragInc: 96 },
    { v1: 40, v2: 60, inc: 50, dragInc: 125 },
    { v1: 50, v2: 60, inc: 20, dragInc: 44 },
    { v1: 60, v2: 78, inc: 30, dragInc: 69 },
    { v1: 40, v2: 80, inc: 100, dragInc: 300 },
    { v1: 80, v2: 120, inc: 50, dragInc: 125 },
    { v1: 50, v2: 100, inc: 100, dragInc: 300 },
    { v1: 60, v2: 84, inc: 40, dragInc: 96 },
    { v1: 70, v2: 91, inc: 30, dragInc: 69 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Aerodynamic drag force acting on an electric locomotive is directly proportional to the SQUARE of its forward speed. If the train increases its operating velocity from ${item.v1} mph to ${item.v2} mph (a ${item.inc}% increase), by what percentage does the aerodynamic drag force increase?`;
  const correct = `${item.dragInc}%`;
  const distractors = [`${item.inc}%`, `${item.dragInc + 25}%`, `${item.inc * 2}%`, `${Math.round(item.dragInc * 0.7)}%`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Speed ratio = ${item.v2} / ${item.v1} = ${(1 + item.inc / 100).toFixed(2)}.\\n2. Drag ratio = (${(1 + item.inc / 100).toFixed(2)})^2 = ${(Math.pow(1 + item.inc / 100, 2)).toFixed(2)}.\\n3. Increase = **${item.dragInc}%**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 16: CIRCULAR TRACK LAP CHASE
VARIANT_GENERATORS[16] = (cycle, rand) => {
  const table = [
    { track: 400, v1: 8, v2: 6, time: 200 },
    { track: 600, v1: 7, v2: 4, time: 200 },
    { track: 500, v1: 9, v2: 5, time: 125 },
    { track: 300, v1: 6, v2: 4, time: 150 },
    { track: 800, v1: 10, v2: 6, time: 200 },
    { track: 400, v1: 9, v2: 5, time: 100 },
    { track: 600, v1: 8, v2: 5, time: 200 },
    { track: 500, v1: 7, v2: 5, time: 250 },
    { track: 400, v1: 10, v2: 6, time: 100 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Two runners begin sprinting simultaneously from the exact same starting line on a ${item.track}-meter circular track, both running in the identical clockwise direction. Runner A maintains a steady ${item.v1} m/s, while Runner B maintains ${item.v2} m/s. After how many seconds will Runner A lap Runner B (catch up to them from behind)?`;
  const correct = `${item.time} seconds`;
  const distractors = [`${item.time / 2} seconds`, `${item.time + 50} seconds`, '80 seconds', '120 seconds'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. To lap Runner B, Runner A must cover 1 full lap (${item.track} m) more than Runner B.\\n2. Relative speed = ${item.v1} - ${item.v2} = ${item.v1 - item.v2} m/s.\\n3. Time = ${item.track} / ${item.v1 - item.v2} = **${item.time} seconds**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 17: NUMBER SEQUENCES - FIBONACCI TYPE
VARIANT_GENERATORS[17] = (cycle, rand) => {
  const table = [
    { seq: '2, 4, 7, 12, 20', next: 33, c: 1 },
    { seq: '1, 4, 7, 13, 22', next: 37, c: 2 },
    { seq: '2, 5, 8, 14, 23', next: 38, c: 1 },
    { seq: '3, 4, 8, 13, 22', next: 36, c: 1 },
    { seq: '1, 2, 5, 9, 16', next: 27, c: 2 },
    { seq: '2, 3, 7, 12, 21', next: 35, c: 2 },
    { seq: '3, 5, 9, 15, 25', next: 41, c: 1 },
    { seq: '1, 5, 8, 15, 25', next: 42, c: 2 },
    { seq: '4, 5, 10, 16, 27', next: 44, c: 1 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Identify the next number in the following sequence:\\n\\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 3}`, `${item.next + 4}`, `${item.next - 5}`, `${item.next + 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Pattern: a_n = a_{n-1} + a_{n-2} + ${item.c}.\\n2. Next term = **${item.next}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 18: NUMBER SEQUENCES - QUADRATIC OFFSETS
VARIANT_GENERATORS[18] = (cycle, rand) => {
  const table = [
    { seq: '3, 7, 13, 21, 31', next: 43 },
    { seq: '4, 9, 16, 25, 36', next: 49 },
    { seq: '1, 5, 11, 19, 29', next: 41 },
    { seq: '5, 10, 17, 26, 37', next: 50 },
    { seq: '6, 12, 20, 30, 42', next: 56 },
    { seq: '2, 8, 16, 26, 38', next: 52 },
    { seq: '7, 13, 21, 31, 43', next: 57 },
    { seq: '3, 10, 19, 30, 43', next: 58 },
    { seq: '4, 11, 20, 31, 44', next: 59 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Identify the next number in the following sequence:\\n\\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 2}`, `${item.next + 2}`, `${item.next + 4}`, `${item.next - 4}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Differences increase by 2 each step.\\n2. Next term = **${item.next}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 19: NUMBER SEQUENCES - INTERLEAVED
VARIANT_GENERATORS[19] = (cycle, rand) => {
  const table = [
    { seq: '5, 60, 10, 52, 15, 44, 20, ?', next: 36 },
    { seq: '3, 80, 6, 70, 9, 60, 12, ?', next: 50 },
    { seq: '2, 45, 5, 40, 8, 35, 11, ?', next: 30 },
    { seq: '6, 90, 12, 82, 18, 74, 24, ?', next: 66 },
    { seq: '7, 50, 14, 45, 21, 40, 28, ?', next: 35 },
    { seq: '4, 75, 8, 68, 12, 61, 16, ?', next: 54 },
    { seq: '10, 100, 20, 85, 30, 70, 40, ?', next: 55 },
    { seq: '5, 48, 10, 42, 15, 36, 20, ?', next: 30 },
    { seq: '8, 65, 16, 58, 24, 51, 32, ?', next: 44 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Identify the missing number indicated by the question mark in the series:\\n\\n${item.seq}`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 5}`, `${item.next + 5}`, `${item.next - 2}`, `${item.next + 6}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Interleaved sequence with even-index progression.\\n2. Next term = **${item.next}**.`,
    category: 'math', subType: 'sequence'
  };
};

// 20: ROUND-ROBIN HANDSHAKES
VARIANT_GENERATORS[20] = (cycle, rand) => {
  const table = [12, 15, 16, 18, 20, 22, 24, 25, 30];
  const n = table[(cycle - 1) % table.length];
  const hs = (n * (n - 1)) / 2;
  const q = `At an executive strategy symposium attended by ${n} department heads, every leader shakes hands with every other leader exactly once. How many total handshakes take place?`;
  const correct = `${hs}`;
  const distractors = [`${n * n}`, `${hs - n}`, `${hs + 10}`, `${hs / 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Formula: n * (n - 1) / 2 = ${n} * ${n - 1} / 2 = **${hs}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 21: WORK PENALTY BALANCE
VARIANT_GENERATORS[21] = (cycle, rand) => {
  const table = [
    { total: 100, rew: 5, pen: 3, net: 420, def: 10 },
    { total: 120, rew: 4, pen: 2, net: 420, def: 10 },
    { total: 80, rew: 6, pen: 4, net: 380, def: 10 },
    { total: 150, rew: 5, pen: 5, net: 650, def: 10 },
    { total: 100, rew: 8, pen: 4, net: 680, def: 10 },
    { total: 200, rew: 4, pen: 3, net: 660, def: 20 },
    { total: 120, rew: 5, pen: 3, net: 520, def: 10 },
    { total: 90, rew: 7, pen: 3, net: 530, def: 10 },
    { total: 100, rew: 6, pen: 4, net: 500, def: 10 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A technician inspects ${item.total} electronic components. For every flawless component approved, the technician earns $${item.rew}, but for every defective component missed, the technician is penalized $${item.pen}. If the technician earned $${item.net} in total after all ${item.total} inspections, how many components were defective?`;
  const correct = `${item.def}`;
  const distractors = [`${item.def + 5}`, `${Math.max(2, item.def - 4)}`, `${item.def + 10}`, `${item.def + 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Let flawless = x, defective = ${item.total} - x.\\n2. ${item.rew}x - ${item.pen}(${item.total} - x) = ${item.net}.\\n3. Solving yields defective = **${item.def}**.`,
    category: 'math', subType: 'algebra'
  };
};
"""
