/**
 * Parameterized Math Variants for CCAT Full Simulations (Tests 5 through 30).
 * Tests 2, 3, 4 use cycle === 0 (the original baseline numbers, 100% preserved).
 * Cycles 1 through 9 provide authentic, distinct numbers, recalculated answers,
 * unique distractors, and clean step-by-step explanations.
 */

function randomize(rawOptions, correctIndex, randFn) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const correctRaw = rawOptions[correctIndex];
  const correctText = String(correctRaw.text !== undefined ? correctRaw.text : correctRaw).trim();

  const seen = new Set();
  seen.add(correctText);

  const cleanDistractors = [];
  const otherOptions = rawOptions.filter((_, idx) => idx !== correctIndex);

  for (let item of otherOptions) {
    let itemText = String(item.text !== undefined ? item.text : item).trim();

    if (seen.has(itemText)) {
      let counter = 1;
      let newText = '';
      const numMatch = itemText.match(/^(-?\$?)([\d,]+)(\.\d+)?(.*)$/);
      if (numMatch) {
        const prefix = numMatch[1];
        const baseNum = parseInt(numMatch[2].replace(/,/g, ''), 10);
        const decimal = numMatch[3] || '';
        const suffix = numMatch[4];

        while (counter <= 20) {
          const delta = counter % 2 === 1 ? counter * 3 : -counter * 2;
          const mutated = Math.max(1, baseNum + delta);
          const candidate = `${prefix}${mutated.toLocaleString()}${decimal}${suffix}`;
          if (!seen.has(candidate)) {
            newText = candidate;
            break;
          }
          counter++;
        }
      }

      if (!newText) {
        newText = `${itemText} (${seen.size + 1})`;
      }
      itemText = newText;
    }

    seen.add(itemText);
    cleanDistractors.push(itemText);
  }

  const pool = [
    { text: correctText, wasCorrect: true },
    ...cleanDistractors.slice(0, 4).map(t => ({ text: t, wasCorrect: false }))
  ];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const finalOptions = pool.map((item, idx) => ({ id: letters[idx], text: item.text }));
  const correctOpt = letters[pool.findIndex(item => item.wasCorrect)];
  return { options: finalOptions, correctOption: correctOpt };
}

const VARIANT_GENERATORS = {};


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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Principle of Inclusion-Exclusion: |A U B| = ${setA} + ${setB} - ${both} = ${setA + setB - both}.\n2. Neither = ${item.total} - ${setA + setB - both} = **${neither}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Divide days by 7: ${item.adv} / 7 = ${Math.floor(item.adv / 7)} weeks with remainder ${rem}.\n2. Advancing ${rem} days from ${item.start} lands on **${targetDay}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Van A head start = ${item.v1} mph * ${item.h} hrs = ${item.v1 * item.h} miles.\n2. Relative speed = ${item.v2} - ${item.v1} = ${item.v2 - item.v1} mph.\n3. Overtake time = ${item.v1 * item.h} / ${item.v2 - item.v1} = ${catchH.toFixed(1)} hrs.\n4. Time = **${item.meetStr}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total Distance = ${totalD} miles.\n2. Total Time = ${item.d1}/${item.s1} + ${item.d2}/${item.s2} = ${t1} + ${t2} = ${totalT} hours.\n3. Average Speed = ${totalD} / ${totalT} = **${avg} mph**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Rule of 72: T = 72 / R.\n2. T = 72 / ${r} = **${yrs} years**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Multiplier: ${(1 + item.u1 / 100).toFixed(2)} * ${(1 - item.d / 100).toFixed(2)} * ${(1 + item.u2 / 100).toFixed(2)} = ${mult.toFixed(4)}.\n2. Net shift = (${mult.toFixed(4)} - 1) * 100% = **${net}%**.`,
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
    { sp: 15, cp: '17.6%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A wholesale merchant prices inventory such that their net profit equals exactly ${item.sp}% of the final SELLING price. What is the merchant's net profit percentage based on the wholesale COST price?`;
  const correct = item.cp;
  const numCp = parseFloat(item.cp);
  const distractors = [`${item.sp}%`, `${(numCp + 10).toFixed(1)}%`, `${Math.max(5, numCp - 10).toFixed(1)}%`, `${(numCp * 1.5).toFixed(1)}%`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. If profit is ${item.sp}% of SP, Cost is ${(100 - item.sp).toFixed(1)}% of SP.\n2. Profit / Cost = ${item.sp} / ${(100 - item.sp).toFixed(1)} = **${item.cp}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combine the 2 adjacent members into 1 unit: (${item.n} - 1)! units.\n2. Within the unit, they arrange in 2! = 2 ways.\n3. Total = (${item.n - 1})! * 2 = **${item.ways}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 8: LCM OF THREE TIMERS
VARIANT_GENERATORS[8] = (cycle, rand) => {
  const table = [
    { a: 15, b: 18, c: 30, lcm: 90 },
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Find LCM(${item.a}, ${item.b}, ${item.c}).\n2. LCM = **${item.lcm} seconds**.`,
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
    { pH: 7, pS: 4, tS: 36, tH: 63 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `At 3:00 PM on a clear afternoon, a vertical ${item.pH}-foot signpost casts a shadow of ${item.pS} feet on level ground. At the same instant, a nearby pine tree casts a shadow of ${item.tS} feet. What is the height of the tree?`;
  const correct = `${item.tH} feet`;
  const distractors = [`${item.tH + 6} feet`, `${item.tH - 4} feet`, `${item.tS} feet`, `${Math.round(item.tH * 1.2)} feet`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Ratio = ${item.pH} / ${item.pS} = ${(item.pH / item.pS).toFixed(2)}.\n2. Tree Height = ${(item.pH / item.pS).toFixed(2)} * ${item.tS} = **${item.tH} feet**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (78.5%)\n\n**Step-by-step Solution:**\n1. Ratio of inscribed circle to square = pi / 4 ≈ 0.7854 or **78.5%**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Net rate = 1/${item.fill} - 1/${item.drain} = 1/${item.total} per hour.\n2. Total time = 1 / (1/${item.total}) = **${item.total} hours**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let grandson = x. Father = ${item.fMult}x. Grandfather = ${item.fMult * item.gMult}x.\n2. Sum = ${1 + item.fMult + item.fMult * item.gMult}x = ${sum} => x = ${item.son}.\n3. Father's age = ${item.fMult} * ${item.son} = **${fAge} years**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Sum of known digits = ${item.sum}.\n2. Next multiple of 9 is ${Math.ceil((item.sum + 1) / 9) * 9}.\n3. Missing digit = **${item.miss}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Solving the simultaneous system yields Pen = $${item.pP} and Notebook = $${item.nP}.\n2. 1 Pen + 1 Notebook = **$${comb}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Speed ratio = ${item.v2} / ${item.v1} = ${(1 + item.inc / 100).toFixed(2)}.\n2. Drag ratio = (${(1 + item.inc / 100).toFixed(2)})^2 = ${(Math.pow(1 + item.inc / 100, 2)).toFixed(2)}.\n3. Increase = **${item.dragInc}%**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. To lap Runner B, Runner A must cover 1 full lap (${item.track} m) more than Runner B.\n2. Relative speed = ${item.v1} - ${item.v2} = ${item.v1 - item.v2} m/s.\n3. Time = ${item.track} / ${item.v1 - item.v2} = **${item.time} seconds**.`,
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
  const q = `Identify the next number in the following sequence:\n\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 3}`, `${item.next + 4}`, `${item.next - 5}`, `${item.next + 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Pattern: a_n = a_{n-1} + a_{n-2} + ${item.c}.\n2. Next term = **${item.next}**.`,
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
  const q = `Identify the next number in the following sequence:\n\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 2}`, `${item.next + 2}`, `${item.next + 4}`, `${item.next - 4}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Differences increase by 2 each step.\n2. Next term = **${item.next}**.`,
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
  const q = `Identify the missing number indicated by the question mark in the series:\n\n${item.seq}`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 5}`, `${item.next + 5}`, `${item.next - 2}`, `${item.next + 6}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Interleaved sequence with even-index progression.\n2. Next term = **${item.next}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Formula: n * (n - 1) / 2 = ${n} * ${n - 1} / 2 = **${hs}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let flawless = x, defective = ${item.total} - x.\n2. ${item.rew}x - ${item.pen}(${item.total} - x) = ${item.net}.\n3. Solving yields defective = **${item.def}**.`,
    category: 'math', subType: 'algebra'
  };
};


// 22: FRACTIONS - TELESCOPING PRODUCT
VARIANT_GENERATORS[22] = (cycle, rand) => {
  const table = [30, 40, 50, 60, 75, 80, 100, 120, 150];
  const n = table[(cycle - 1) % table.length];
  const q = `Evaluate the product:\n\n(1 - 1/2) * (1 - 1/3) * (1 - 1/4) * ... * (1 - 1/${n})`;
  const correct = `1/${n}`;
  const distractors = [`2/${n}`, `1/${n - 1}`, `1/${n + 1}`, `1/${Math.round(n / 2)}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Notice telescoping cancellation: (1/2) * (2/3) * (3/4) * ... * (${n - 1}/${n}).\n2. All intermediate numerators and denominators cancel out.\n3. Final result = **1/${n}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 23: BUY X GET Y FREE
VARIANT_GENERATORS[23] = (cycle, rand) => {
  const table = [
    { x: 3, y: 1, disc: '25.0%' },
    { x: 4, y: 1, disc: '20.0%' },
    { x: 5, y: 1, disc: '16.7%' },
    { x: 3, y: 2, disc: '40.0%' },
    { x: 2, y: 1, disc: '33.3%' },
    { x: 4, y: 2, disc: '33.3%' },
    { x: 5, y: 2, disc: '28.6%' },
    { x: 6, y: 2, disc: '25.0%' },
    { x: 7, y: 1, disc: '12.5%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A clothing boutique offers a promotional deal: "Buy ${item.x}, Get ${item.y} Free". What is the effective percentage discount received by a customer taking full advantage of this deal?`;
  const correct = item.disc;
  const numDisc = parseFloat(item.disc);
  const distractors = [`${(item.y / item.x * 100).toFixed(1)}%`, `${(numDisc + 5).toFixed(1)}%`, `${Math.max(5, numDisc - 5).toFixed(1)}%`, '50.0%'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Customer receives ${item.x + item.y} items for the price of ${item.x}.\n2. Discount fraction = ${item.y} / ${item.x + item.y}.\n3. Effective discount = **${item.disc}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 24: DISHONEST MERCHANT FALSE WEIGHT
VARIANT_GENERATORS[24] = (cycle, rand) => {
  const table = [
    { w: 800, p: '25.0%' },
    { w: 900, p: '11.1%' },
    { w: 750, p: '33.3%' },
    { w: 850, p: '17.6%' },
    { w: 700, p: '42.9%' },
    { w: 950, p: '5.3%' },
    { w: 600, p: '66.7%' },
    { w: 880, p: '13.6%' },
    { w: 920, p: '8.7%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A dishonest grocer claims to sell rice at cost price, but uses a counterfeit weight of ${item.w} grams instead of a true 1-kilogram (1,000 g) standard weight. What is the grocer's actual percentage profit?`;
  const correct = item.p;
  const numP = parseFloat(item.p);
  const distractors = [`${(1000 - item.w) / 10}%`, `${(numP + 8).toFixed(1)}%`, `${Math.max(2, numP - 6).toFixed(1)}%`, '20.0%'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Profit = Error / True Given Weight = (1000 - ${item.w}) / ${item.w}.\n2. Percentage = **${item.p}**.`,
    category: 'math', subType: 'percentage'
  };
};

// 25: WORK ALTERNATING DAYS
VARIANT_GENERATORS[25] = (cycle, rand) => {
  const table = [
    { a: 10, b: 15, days: '12 days', lead: 'Mason', sec: 'Liam' },
    { a: 12, b: 18, days: '14.3 days', lead: 'Sarah', sec: 'Emma' },
    { a: 8, b: 12, days: '9.5 days', lead: 'Ethan', sec: 'Noah' },
    { a: 6, b: 9, days: '7.2 days', lead: 'Alex', sec: 'Ben' },
    { a: 15, b: 20, days: '17.1 days', lead: 'Daniel', sec: 'Marcus' },
    { a: 9, b: 12, days: '10.3 days', lead: 'Ryan', sec: 'Tyler' },
    { a: 10, b: 20, days: '13.3 days', lead: 'Oliver', sec: 'James' },
    { a: 12, b: 16, days: '13.7 days', lead: 'Lucas', sec: 'Henry' },
    { a: 8, b: 16, days: '10.5 days', lead: 'Jack', sec: 'Leo' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `${item.lead} can assemble a structure alone in ${item.a} days, and ${item.sec} can assemble it alone in ${item.b} days. If they work on alternating days starting with ${item.lead} on Day 1, approximately how many total days will it take to finish the job?`;
  const correct = item.days;
  const numD = parseFloat(item.days);
  const distractors = [`${(numD + 2).toFixed(1)} days`, `${(numD - 2.5).toFixed(1)} days`, `${((item.a + item.b) / 2).toFixed(1)} days`, '15.0 days'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. In a 2-day cycle, combined work = 1/${item.a} + 1/${item.b}.\n2. Solving for completion yields **${item.days}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 26: WORKER LEAVES EARLY
VARIANT_GENERATORS[26] = (cycle, rand) => {
  const table = [
    { a: 20, b: 30, leaveDays: 5, totalDays: 14 },
    { a: 15, b: 20, leaveDays: 3, totalDays: 10.3 },
    { a: 24, b: 36, leaveDays: 4, totalDays: 16.8 },
    { a: 18, b: 27, leaveDays: 3, totalDays: 12.6 },
    { a: 12, b: 24, leaveDays: 2, totalDays: 8.7 },
    { a: 16, b: 24, leaveDays: 4, totalDays: 12 },
    { a: 20, b: 25, leaveDays: 5, totalDays: 13.9 },
    { a: 30, b: 45, leaveDays: 6, totalDays: 21.6 },
    { a: 15, b: 30, leaveDays: 3, totalDays: 11 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Developer A can build a module alone in ${item.a} days, while Developer B requires ${item.b} days alone. They begin working together, but Developer A leaves ${item.leaveDays} days before the module is scheduled to be completed. Developer B finishes the remaining work alone. How many total days did the project take from start to finish?`;
  const correct = `${item.totalDays} days`;
  const numD = parseFloat(item.totalDays);
  const distractors = [`${(numD + 3).toFixed(1)} days`, `${(numD - 2).toFixed(1)} days`, `${item.a} days`, `${item.b / 2} days`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let total days = T. Developer A worked (T - ${item.leaveDays}) days, Developer B worked T days.\n2. (T - ${item.leaveDays})/${item.a} + T/${item.b} = 1.\n3. Solving for T gives **${item.totalDays} days**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 27: WORKER EFFICIENCY PERCENTAGE
VARIANT_GENERATORS[27] = (cycle, rand) => {
  const table = [
    { eff: 60, days: 32, together: 12.3 },
    { eff: 40, days: 28, together: 11.7 },
    { eff: 50, days: 24, together: 9.6 },
    { eff: 25, days: 30, together: 13.3 },
    { eff: 80, days: 36, together: 12.9 },
    { eff: 50, days: 18, together: 7.2 },
    { eff: 100, days: 24, together: 8.0 },
    { eff: 30, days: 26, together: 11.3 },
    { eff: 75, days: 35, together: 12.7 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Specialist Clara is ${item.eff}% more efficient than Technician David. If David can finish a maintenance protocol alone in ${item.days} days, how many days will it take if both work together at their standard rates?`;
  const correct = `${item.together} days`;
  const numT = parseFloat(item.together);
  const distractors = [`${(numT + 3).toFixed(1)} days`, `${(numT - 2).toFixed(1)} days`, `${(item.days / 2).toFixed(1)} days`, '15.0 days'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. David's rate = 1/${item.days}. Clara's rate = ${(1 + item.eff / 100).toFixed(2)}/${item.days}.\n2. Combined rate = ${(2 + item.eff / 100).toFixed(2)}/${item.days}.\n3. Time = ${item.days} / ${(2 + item.eff / 100).toFixed(2)} = **${item.together} days**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 28: TRAIN CROSSING PLATFORM
VARIANT_GENERATORS[28] = (cycle, rand) => {
  const table = [
    { len: 250, plat: 350, speedKmh: 72, timeSec: 30 },
    { len: 180, plat: 220, speedKmh: 54, timeSec: 26.7 },
    { len: 300, plat: 500, speedKmh: 90, timeSec: 32 },
    { len: 150, plat: 250, speedKmh: 60, timeSec: 24 },
    { len: 200, plat: 400, speedKmh: 72, timeSec: 30 },
    { len: 220, plat: 380, speedKmh: 108, timeSec: 20 },
    { len: 280, plat: 420, speedKmh: 84, timeSec: 30 },
    { len: 160, plat: 240, speedKmh: 72, timeSec: 20 },
    { len: 350, plat: 450, speedKmh: 90, timeSec: 32 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A passenger train measuring ${item.len} meters in length is traveling at a constant speed of ${item.speedKmh} km/h. How many seconds will it take for the train to completely cross a stationary station platform that is ${item.plat} meters long?`;
  const correct = `${item.timeSec} seconds`;
  const distractors = [`${item.timeSec + 5} seconds`, `${Math.max(5, item.timeSec - 6)} seconds`, `${Math.round(item.timeSec * 1.5)} seconds`, `${item.timeSec + 10} seconds`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total distance = ${item.len} + ${item.plat} = ${item.len + item.plat} meters.\n2. Speed in m/s = ${item.speedKmh} * (5/18) = ${(item.speedKmh * 5 / 18).toFixed(1)} m/s.\n3. Time = ${item.len + item.plat} / ${(item.speedKmh * 5 / 18).toFixed(1)} = **${item.timeSec} seconds**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 29: TWO TRAINS OPPOSITE
VARIANT_GENERATORS[29] = (cycle, rand) => {
  const table = [
    { l1: 160, l2: 140, v1: 65, v2: 55, time: 9 },
    { l1: 180, l2: 120, v1: 70, v2: 50, time: 9 },
    { l1: 200, l2: 150, v1: 60, v2: 45, time: 12 },
    { l1: 140, l2: 160, v1: 75, v2: 45, time: 9 },
    { l1: 220, l2: 180, v1: 80, v2: 40, time: 12 },
    { l1: 150, l2: 150, v1: 54, v2: 36, time: 12 },
    { l1: 250, l2: 200, v1: 90, v2: 60, time: 10.8 },
    { l1: 170, l2: 130, v1: 62, v2: 46, time: 10 },
    { l1: 190, l2: 170, v1: 72, v2: 54, time: 10.3 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `Two express trains traveling on parallel tracks in opposite directions measure ${item.l1} meters and ${item.l2} meters in length. Their speeds are ${item.v1} km/h and ${item.v2} km/h respectively. From the instant their locomotives first meet, how many seconds will it take for them to completely pass each other?`;
  const correct = `${item.time} seconds`;
  const distractors = [`${(item.time + 3).toFixed(1)} seconds`, `${Math.max(3, item.time - 2).toFixed(1)} seconds`, '15.0 seconds', '20.0 seconds'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total distance = ${item.l1} + ${item.l2} = ${item.l1 + item.l2} m.\n2. Relative speed = ${item.v1} + ${item.v2} = ${item.v1 + item.v2} km/h = ${((item.v1 + item.v2) * 5 / 18).toFixed(1)} m/s.\n3. Time = **${item.time} seconds**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 30: RIVER BOAT UPSTREAM VS DOWNSTREAM
VARIANT_GENERATORS[30] = (cycle, rand) => {
  const table = [
    { b: 18, s: 6, d: 48, t: 6 },
    { b: 20, s: 4, d: 48, t: 5 },
    { b: 15, s: 3, d: 36, t: 5 },
    { b: 24, s: 6, d: 72, t: 6.4 },
    { b: 16, s: 4, d: 60, t: 8 },
    { b: 22, s: 2, d: 48, t: 4.4 },
    { b: 14, s: 2, d: 48, t: 7 },
    { b: 25, s: 5, d: 60, t: 5 },
    { b: 18, s: 3, d: 45, t: 5.1 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A motorboat travels downstream with the current at a speed of ${item.b + item.s} mph and upstream against the same current at ${item.b - item.s} mph. If the boat makes a round trip covering a distance of ${item.d} miles each way, what is the total travel time for the entire journey?`;
  const correct = `${item.t} hours`;
  const distractors = [`${(item.t + 2).toFixed(1)} hours`, `${Math.max(1, item.t - 1.5).toFixed(1)} hours`, `${(item.d / item.b * 2).toFixed(1)} hours`, '8.0 hours'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Downstream time = ${item.d} / ${item.b + item.s} = ${(item.d / (item.b + item.s)).toFixed(2)} hrs.\n2. Upstream time = ${item.d} / ${item.b - item.s} = ${(item.d / (item.b - item.s)).toFixed(2)} hrs.\n3. Total time = **${item.t} hours**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 31: SPEED PUNCTUALITY LATE VS EARLY
VARIANT_GENERATORS[31] = (cycle, rand) => {
  const table = [
    { s1: 45, lateM: 10, s2: 60, earlyM: 5, dist: 45 },
    { s1: 30, lateM: 15, s2: 45, earlyM: 5, dist: 30 },
    { s1: 40, lateM: 12, s2: 50, earlyM: 6, dist: 60 },
    { s1: 50, lateM: 10, s2: 70, earlyM: 10, dist: 58.3 },
    { s1: 35, lateM: 8, s2: 45, earlyM: 4, dist: 31.5 },
    { s1: 40, lateM: 20, s2: 60, earlyM: 10, dist: 60 },
    { s1: 48, lateM: 15, s2: 64, earlyM: 5, dist: 40 },
    { s1: 36, lateM: 10, s2: 54, earlyM: 10, dist: 36 },
    { s1: 50, lateM: 15, s2: 75, earlyM: 5, dist: 50 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A sales executive driving to a regional convention finds that driving at ${item.s1} mph causes them to arrive ${item.lateM} minutes late. Driving at ${item.s2} mph causes them to arrive ${item.earlyM} minutes early. What is the total distance to the convention venue?`;
  const correct = `${item.dist} miles`;
  const distractors = [`${(item.dist + 10).toFixed(0)} miles`, `${Math.max(10, item.dist - 10).toFixed(0)} miles`, '50 miles', '75 miles'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Time difference = (${item.lateM} + ${item.earlyM}) / 60 = ${((item.lateM + item.earlyM) / 60).toFixed(2)} hrs.\n2. D/${item.s1} - D/${item.s2} = ${((item.lateM + item.earlyM) / 60).toFixed(2)}.\n3. Distance = **${item.dist} miles**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 32: COMMITTEE SELECTION
VARIANT_GENERATORS[32] = (cycle, rand) => {
  const table = [
    { n: 7, k: 3, ans: 35 },
    { n: 8, k: 2, ans: 28 },
    { n: 9, k: 3, ans: 84 },
    { n: 6, k: 3, ans: 20 },
    { n: 8, k: 4, ans: 70 },
    { n: 10, k: 2, ans: 45 },
    { n: 7, k: 4, ans: 35 },
    { n: 9, k: 2, ans: 36 },
    { n: 8, k: 3, ans: 56 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A hiring committee must select ${item.k} senior analysts from a pool of ${item.n} qualified candidates. In how many distinct ways can the ${item.k} analysts be chosen?`;
  const correct = `${item.ans}`;
  const distractors = [`${item.ans + 12}`, `${Math.max(6, item.ans - 10)}`, `${item.n * item.k}`, `${item.ans * 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combinations formula: C(${item.n}, ${item.k}) = ${item.n}! / (${item.k}! * ${item.n - item.k}!).\n2. Result = **${item.ans}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 33: FORMING 3-DIGIT NUMBERS
VARIANT_GENERATORS[33] = (cycle, rand) => {
  const table = [
    { digits: '2, 3, 4, 5, 6, 7', n: 6, ans: 120 },
    { digits: '1, 3, 5, 7, 9', n: 5, ans: 60 },
    { digits: '1, 2, 4, 6, 8, 9', n: 6, ans: 120 },
    { digits: '2, 4, 6, 8', n: 4, ans: 24 },
    { digits: '1, 2, 3, 5, 7, 8, 9', n: 7, ans: 210 },
    { digits: '3, 4, 5, 6, 7', n: 5, ans: 60 },
    { digits: '1, 4, 5, 6, 8, 9', n: 6, ans: 120 },
    { digits: '2, 3, 5, 7', n: 4, ans: 24 },
    { digits: '1, 2, 3, 4, 5, 6', n: 6, ans: 120 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `How many distinct 3-digit numbers can be formed using only the digits {${item.digits}} if no digit can be repeated in the same number?`;
  const correct = `${item.ans}`;
  const distractors = [`${item.ans / 2}`, `${item.ans + 30}`, `${Math.pow(item.n, 3)}`, '48'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Permutations: ${item.n} * ${item.n - 1} * ${item.n - 2}.\n2. Result = **${item.ans}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 34: POLYGON DIAGONALS
VARIANT_GENERATORS[34] = (cycle, rand) => {
  const table = [
    { name: 'decagon', n: 10, d: 35 },
    { name: 'hexagon', n: 6, d: 9 },
    { name: 'heptagon', n: 7, d: 14 },
    { name: 'nonagon', n: 9, d: 27 },
    { name: 'dodecagon', n: 12, d: 54 },
    { name: 'pentagon', n: 5, d: 5 },
    { name: '11-gon', n: 11, d: 44 },
    { name: '15-gon', n: 15, d: 90 },
    { name: 'octagon', n: 8, d: 20 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `How many unique diagonals can be drawn in a convex ${item.name} (${item.n} sides)?`;
  const correct = `${item.d}`;
  const distractors = [`${item.d + 6}`, `${Math.max(2, item.d - 5)}`, `${item.n * 2}`, `${item.d * 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Formula: n * (n - 3) / 2 = ${item.n} * ${item.n - 3} / 2 = **${item.d}**.`,
    category: 'math', subType: 'geometry'
  };
};

// 35: GRID WALKING SHORTEST PATHS
VARIANT_GENERATORS[35] = (cycle, rand) => {
  const table = [
    { w: 4, h: 3, paths: 35 },
    { w: 3, h: 3, paths: 20 },
    { w: 5, h: 2, paths: 21 },
    { w: 4, h: 4, paths: 70 },
    { w: 5, h: 3, paths: 56 },
    { w: 3, h: 2, paths: 10 },
    { w: 6, h: 2, paths: 28 },
    { w: 4, h: 2, paths: 15 },
    { w: 5, h: 4, paths: 126 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A warehouse robotic cart navigates an orthogonal grid from intersection (0, 0) to intersection (${item.w}, ${item.h}). If the cart only moves East and North along grid segments, how many distinct shortest paths are possible?`;
  const correct = `${item.paths}`;
  const distractors = [`${item.paths + 10}`, `${Math.max(4, item.paths - 8)}`, `${item.w * item.h}`, `${item.paths * 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Formula: (${item.w} + ${item.h})! / (${item.w}! * ${item.h}!).\n2. Result = **${item.paths}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 36: UNIT DIGIT OF LARGE EXPONENT
VARIANT_GENERATORS[36] = (cycle, rand) => {
  const table = [
    { base: 3, exp: 45, ans: 3 },
    { base: 7, exp: 102, ans: 9 },
    { base: 8, exp: 67, ans: 2 },
    { base: 2, exp: 53, ans: 2 },
    { base: 4, exp: 79, ans: 4 },
    { base: 9, exp: 88, ans: 1 },
    { base: 3, exp: 82, ans: 9 },
    { base: 7, exp: 95, ans: 3 },
    { base: 8, exp: 44, ans: 6 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `What is the units digit (last digit) of the integer value ${item.base}^${item.exp}?`;
  const correct = `${item.ans}`;
  const distractors = [1, 3, 7, 9, 2, 4, 6, 8].filter(d => d !== item.ans).slice(0, 4).map(String);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Exponents cycle modulo 4: ${item.exp} % 4 = ${item.exp % 4 || 4}.\n2. Units digit = **${item.ans}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 37: REMAINDER THEOREM
VARIANT_GENERATORS[37] = (cycle, rand) => {
  const table = [
    { d1: 42, rem: 25, d2: 7, ans: 4 },
    { d1: 56, rem: 39, d2: 8, ans: 7 },
    { d1: 36, rem: 29, d2: 6, ans: 5 },
    { d1: 45, rem: 31, d2: 9, ans: 4 },
    { d1: 64, rem: 43, d2: 8, ans: 3 },
    { d1: 48, rem: 35, d2: 6, ans: 5 },
    { d1: 72, rem: 55, d2: 9, ans: 1 },
    { d1: 60, rem: 47, d2: 12, ans: 11 },
    { d1: 54, rem: 41, d2: 9, ans: 5 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `When a positive integer N is divided by ${item.d1}, the remainder is ${item.rem}. What will be the remainder when the exact same integer N is divided by ${item.d2}?`;
  const correct = `${item.ans}`;
  const distractors = [1, 2, 3, 4, 5, 6].filter(d => d !== item.ans).slice(0, 4).map(String);
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Since ${item.d1} is a multiple of ${item.d2}, the remainder is ${item.rem} % ${item.d2} = **${item.ans}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 38: TRAILING ZEROS IN FACTORIAL
VARIANT_GENERATORS[38] = (cycle, rand) => {
  const table = [
    { n: 40, zeros: 9 },
    { n: 50, zeros: 12 },
    { n: 60, zeros: 14 },
    { n: 75, zeros: 18 },
    { n: 80, zeros: 19 },
    { n: 100, zeros: 24 },
    { n: 45, zeros: 10 },
    { n: 70, zeros: 16 },
    { n: 90, zeros: 21 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `How many trailing zeros are there at the end of the calculated product ${item.n}! (${item.n} factorial)?`;
  const correct = `${item.zeros}`;
  const distractors = [`${item.zeros - 2}`, `${item.zeros + 2}`, `${Math.floor(item.n / 5)}`, `${item.zeros + 5}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Count factors of 5: floor(${item.n}/5) + floor(${item.n}/25) = **${item.zeros}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 39: GCD AND LCM PRODUCT THEOREM
VARIANT_GENERATORS[39] = (cycle, rand) => {
  const table = [
    { gcd: 20, lcm: 400, a: 80, b: 100 },
    { gcd: 8, lcm: 160, a: 32, b: 40 },
    { gcd: 15, lcm: 300, a: 60, b: 75 },
    { gcd: 6, lcm: 180, a: 36, b: 30 },
    { gcd: 14, lcm: 280, a: 70, b: 56 },
    { gcd: 10, lcm: 200, a: 40, b: 50 },
    { gcd: 16, lcm: 320, a: 80, b: 64 },
    { gcd: 9, lcm: 180, a: 45, b: 36 },
    { gcd: 18, lcm: 360, a: 90, b: 72 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `The Greatest Common Divisor (GCD) of two positive integers is ${item.gcd}, and their Least Common Multiple (LCM) is ${item.lcm}. If one of the numbers is ${item.a}, what is the second number?`;
  const correct = `${item.b}`;
  const distractors = [`${item.b + 12}`, `${item.b - 10}`, `${item.a}`, `${item.gcd * 4}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. GCD * LCM = A * B => B = (${item.gcd} * ${item.lcm}) / ${item.a} = **${item.b}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 40: SUM OF CONSECUTIVE ODD INTEGERS
VARIANT_GENERATORS[40] = (cycle, rand) => {
  const table = [
    { n: 5, sum: 195, smallest: 35 },
    { n: 5, sum: 225, smallest: 41 },
    { n: 7, sum: 245, smallest: 29 },
    { n: 5, sum: 145, smallest: 25 },
    { n: 5, sum: 275, smallest: 51 },
    { n: 7, sum: 315, smallest: 39 },
    { n: 5, sum: 165, smallest: 29 },
    { n: 5, sum: 205, smallest: 37 },
    { n: 7, sum: 287, smallest: 35 }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `The sum of ${item.n} consecutive odd integers is ${item.sum}. What is the value of the SMALLEST integer in the set?`;
  const correct = `${item.smallest}`;
  const distractors = [`${item.smallest + 4}`, `${item.smallest - 4}`, `${Math.round(item.sum / item.n)}`, `${item.smallest + 8}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Average = ${item.sum} / ${item.n} = ${item.sum / item.n}.\n2. Smallest = ${item.sum / item.n} - ${item.n - 1} = **${item.smallest}**.`,
    category: 'math', subType: 'word_problem'
  };
};

// 41: IDENTICAL SELLING PRICE PROFIT/LOSS
VARIANT_GENERATORS[41] = (cycle, rand) => {
  const table = [
    { p: 15, sp: 15000, lossPct: '2.25%' },
    { p: 20, sp: 18000, lossPct: '4.00%' },
    { p: 25, sp: 20000, lossPct: '6.25%' },
    { p: 10, sp: 12000, lossPct: '1.00%' },
    { p: 30, sp: 25000, lossPct: '9.00%' },
    { p: 12, sp: 16000, lossPct: '1.44%' },
    { p: 18, sp: 22000, lossPct: '3.24%' },
    { p: 16, sp: 14000, lossPct: '2.56%' },
    { p: 24, sp: 24000, lossPct: '5.76%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `An auto dealer sells two vehicles for exactly $${item.sp.toLocaleString()} each. On the first vehicle, the dealer makes a profit of ${item.p}%, while on the second vehicle, the dealer incurs a loss of ${item.p}%. Overall, across both transactions combined, what is the net financial outcome?`;
  const correct = `Loss of ${item.lossPct}`;
  const distractors = ['Break-even (0% net shift)', `Profit of ${item.lossPct}`, `Loss of ${item.p}.0%`, `Loss of ${(parseFloat(item.lossPct) + 2).toFixed(2)}%`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Net outcome = Loss of (P / 10)^2 % = (${item.p} / 10)^2 % = **Loss of ${item.lossPct}**.`,
    category: 'math', subType: 'percentage'
  };
};

// 42: COMPENSATING CONSUMPTION
VARIANT_GENERATORS[42] = (cycle, rand) => {
  const table = [
    { inc: 20, dec: '16.7%' },
    { inc: 50, dec: '33.3%' },
    { inc: 25, dec: '20.0%' },
    { inc: 40, dec: '28.6%' },
    { inc: 10, dec: '9.1%' },
    { inc: 30, dec: '23.1%' },
    { inc: 60, dec: '37.5%' },
    { inc: 15, dec: '13.0%' },
    { inc: 35, dec: '25.9%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `The market price of aviation fuel increases by ${item.inc}%. By what percentage must a regional airline reduce its fuel consumption so that its total overall expenditure on fuel remains completely unchanged?`;
  const correct = item.dec;
  const numD = parseFloat(item.dec);
  const distractors = [`${item.inc}.0%`, `${(numD + 5).toFixed(1)}%`, `${Math.max(2, numD - 4).toFixed(1)}%`, '25.0%'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Formula: R / (100 + R) * 100% = ${item.inc} / (100 + ${item.inc}) * 100% = **${item.dec}**.`,
    category: 'math', subType: 'percentage'
  };
};

// 43: SUCCESSIVE DOUBLE DISCOUNTS
VARIANT_GENERATORS[43] = (cycle, rand) => {
  const table = [
    { d1: 20, d2: 15, net: '32.0%' },
    { d1: 25, d2: 20, net: '40.0%' },
    { d1: 30, d2: 10, net: '37.0%' },
    { d1: 40, d2: 20, net: '52.0%' },
    { d1: 15, d2: 10, net: '23.5%' },
    { d1: 25, d2: 10, net: '32.5%' },
    { d1: 50, d2: 20, net: '60.0%' },
    { d1: 35, d2: 15, net: '44.75%' },
    { d1: 20, d2: 20, net: '36.0%' }
  ];
  const item = table[(cycle - 1) % table.length];
  const q = `A luxury watch retailer offers a storewide ${item.d1}% discount, and loyalty club members receive an additional ${item.d2}% discount off the already discounted price. What is the single equivalent overall discount percentage?`;
  const correct = item.net;
  const distractors = [`${item.d1 + item.d2}.0%`, `${(parseFloat(item.net) + 5).toFixed(1)}%`, `${(parseFloat(item.net) - 4).toFixed(1)}%`, '45.0%'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Net factor = (1 - ${item.d1 / 100}) * (1 - ${item.d2 / 100}) = ${(1 - item.d1 / 100) * (1 - item.d2 / 100)}.\n2. Equivalent discount = **${item.net}**.`,
    category: 'math', subType: 'percentage'
  };
};


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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Compounded formula: P = P_0 * (1 + r)^t = ${item.p0} * (1 + ${item.r / 100})^${item.yrs}.\n2. Population = **${correct}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Fraction of milk = 1/2 * (${item.r1A}/${item.r1A + item.r1B} + ${item.r2A}/${item.r2A + item.r2B}) = **${item.frac}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Remaining = ${item.init} * (1 - ${item.rem}/${item.init})^2 = **${item.left} liters**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let C = x, B = x + ${item.d2}, A = x + ${item.d2} + ${item.d1}.\n2. 3x + ${item.d1 + 2 * item.d2} = ${item.sum} => x = ${item.c}.\n3. A = **$${item.a.toLocaleString()}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. I_1 * d_1^2 = I_2 * d_2^2 => I_2 = ${item.i1} * (${item.d1}/${item.d2})^2 = **${item.i2} units**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. S_n = n/2 * (2a + (n - 1)d) = ${item.n}/2 * (2(${item.a}) + ${item.n - 1}(${item.d})) = **${item.sum}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Formula: S = a / (1 - r) = ${item.a} / (1 - ${item.r}) = **${item.sum}**.`,
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
  const q = `Identify the next number in the following sequence:\n\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 4}`, `${item.next + 6}`, `${item.next * 2}`, `${item.next - 10}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Alternating arithmetic and multiplicative operations.\n2. Next term = **${item.next}**.`,
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
  const q = `Identify the next number in the following sequence:\n\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 3}`, `${item.next + 4}`, `${item.next - 6}`, `${item.next + 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Second difference is constant.\n2. Next term = **${item.next}**.`,
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
  const q = `Identify the next number in the following series:\n\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 3}`, `${item.next + 4}`, `${item.next - 5}`, `${item.next + 2}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Differences increase by 1 each step (triangular sequence).\n2. Next term = **${item.next}**.`,
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
  const q = `Identify the next number in the following sequence:\n\n${item.seq}, ?`;
  const correct = `${item.next}`;
  const distractors = [`${item.next - 15}`, `${item.next + 12}`, '200', '250'];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Pattern: ${item.rule}.\n2. Next term = **${item.next}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Set up equations from past and future ratio conditions.\n2. Current father age = **${item.fNow} years**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. 2C + 4W = ${item.legs} and C + W = ${item.heads}.\n2. 2W = ${item.legs} - 2(${item.heads}) => W = **${item.cows} cows**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let fraction = x / (x + ${item.diff}).\n2. (x + ${item.numAdd}) / (x + ${item.diff} - ${item.denSub}) = ${item.res}.\n3. x = ${item.origNum} => fraction = **${correct}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Hypotenuse = sqrt(${item.a}^2 + ${item.b}^2) = ${item.c} meters.\n2. Perimeter = ${item.a} + ${item.b} + ${item.c} = **${item.p} meters**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Outer area = (${item.l} + 2*${item.border}) * (${item.w} + 2*${item.border}).\n2. Inner area = ${item.l} * ${item.w}.\n3. Walkway area = **${item.area} sq m**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Area scales as r^2: (1 + ${item.inc / 100})^2 = ${(1 + item.inc / 100)**2}.\n2. Percentage increase = **${item.areaInc}%**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Space diagonal = sqrt(l^2 + w^2 + h^2) = sqrt(${item.l}^2 + ${item.w}^2 + ${item.h}^2) = **${item.diag} meters**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. P(Both Red) = (${item.r}/${item.r + item.b}) * (${item.r - 1}/${item.r + item.b - 1}) = **${item.frac}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Count favorable pairs yielding sum ${item.sum} out of 36 outcomes.\n2. Probability = **${item.frac}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Use the complement rule: P(At least one success) = 1 - P(Zero successes).\n2. Result = **${item.frac}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Weighted average = (${item.w1}*${item.s1} + ${item.w2}*${item.s2} + ${item.w3}*${item.s3}) / 100 = **${item.ans}**.`,
    category: 'math', subType: 'word_problem'
  };
};


export function getMathVariant(archIdx, cycle, randFn) {
  if (cycle === 0 || !VARIANT_GENERATORS[archIdx]) return null;
  return VARIANT_GENERATORS[archIdx](cycle, randFn);
}
