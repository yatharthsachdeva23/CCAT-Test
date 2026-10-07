# Python script defining generators for archetypes 22 through 43 (Group 1)

group1_code = """
// 22: FRACTIONS - TELESCOPING PRODUCT
VARIANT_GENERATORS[22] = (cycle, rand) => {
  const table = [30, 40, 50, 60, 75, 80, 100, 120, 150];
  const n = table[(cycle - 1) % table.length];
  const q = `Evaluate the product:\\n\\n(1 - 1/2) * (1 - 1/3) * (1 - 1/4) * ... * (1 - 1/${n})`;
  const correct = `1/${n}`;
  const distractors = [`2/${n}`, `1/${n - 1}`, `1/${n + 1}`, `1/${Math.round(n / 2)}`];
  const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
  return {
    question: q, options, correctOption,
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Notice telescoping cancellation: (1/2) * (2/3) * (3/4) * ... * (${n - 1}/${n}).\\n2. All intermediate numerators and denominators cancel out.\\n3. Final result = **1/${n}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Customer receives ${item.x + item.y} items for the price of ${item.x}.\\n2. Discount fraction = ${item.y} / ${item.x + item.y}.\\n3. Effective discount = **${item.disc}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Profit = Error / True Given Weight = (1000 - ${item.w}) / ${item.w}.\\n2. Percentage = **${item.p}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. In a 2-day cycle, combined work = 1/${item.a} + 1/${item.b}.\\n2. Solving for completion yields **${item.days}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Let total days = T. Developer A worked (T - ${item.leaveDays}) days, Developer B worked T days.\\n2. (T - ${item.leaveDays})/${item.a} + T/${item.b} = 1.\\n3. Solving for T gives **${item.totalDays} days**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. David's rate = 1/${item.days}. Clara's rate = ${(1 + item.eff / 100).toFixed(2)}/${item.days}.\\n2. Combined rate = ${(2 + item.eff / 100).toFixed(2)}/${item.days}.\\n3. Time = ${item.days} / ${(2 + item.eff / 100).toFixed(2)} = **${item.together} days**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Total distance = ${item.len} + ${item.plat} = ${item.len + item.plat} meters.\\n2. Speed in m/s = ${item.speedKmh} * (5/18) = ${(item.speedKmh * 5 / 18).toFixed(1)} m/s.\\n3. Time = ${item.len + item.plat} / ${(item.speedKmh * 5 / 18).toFixed(1)} = **${item.timeSec} seconds**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Total distance = ${item.l1} + ${item.l2} = ${item.l1 + item.l2} m.\\n2. Relative speed = ${item.v1} + ${item.v2} = ${item.v1 + item.v2} km/h = ${((item.v1 + item.v2) * 5 / 18).toFixed(1)} m/s.\\n3. Time = **${item.time} seconds**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Downstream time = ${item.d} / ${item.b + item.s} = ${(item.d / (item.b + item.s)).toFixed(2)} hrs.\\n2. Upstream time = ${item.d} / ${item.b - item.s} = ${(item.d / (item.b - item.s)).toFixed(2)} hrs.\\n3. Total time = **${item.t} hours**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Time difference = (${item.lateM} + ${item.earlyM}) / 60 = ${((item.lateM + item.earlyM) / 60).toFixed(2)} hrs.\\n2. D/${item.s1} - D/${item.s2} = ${((item.lateM + item.earlyM) / 60).toFixed(2)}.\\n3. Distance = **${item.dist} miles**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Combinations formula: C(${item.n}, ${item.k}) = ${item.n}! / (${item.k}! * ${item.n - item.k}!).\\n2. Result = **${item.ans}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Permutations: ${item.n} * ${item.n - 1} * ${item.n - 2}.\\n2. Result = **${item.ans}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Formula: n * (n - 3) / 2 = ${item.n} * ${item.n - 3} / 2 = **${item.d}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Formula: (${item.w} + ${item.h})! / (${item.w}! * ${item.h}!).\\n2. Result = **${item.paths}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Exponents cycle modulo 4: ${item.exp} % 4 = ${item.exp % 4 || 4}.\\n2. Units digit = **${item.ans}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Since ${item.d1} is a multiple of ${item.d2}, the remainder is ${item.rem} % ${item.d2} = **${item.ans}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Count factors of 5: floor(${item.n}/5) + floor(${item.n}/25) = **${item.zeros}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. GCD * LCM = A * B => B = (${item.gcd} * ${item.lcm}) / ${item.a} = **${item.b}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Average = ${item.sum} / ${item.n} = ${item.sum / item.n}.\\n2. Smallest = ${item.sum / item.n} - ${item.n - 1} = **${item.smallest}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Net outcome = Loss of (P / 10)^2 % = (${item.p} / 10)^2 % = **Loss of ${item.lossPct}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Formula: R / (100 + R) * 100% = ${item.inc} / (100 + ${item.inc}) * 100% = **${item.dec}**.`,
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
    explanation: `**Correct Answer: ${correctOption}** (${correct})\\n\\n**Step-by-step Solution:**\\n1. Net factor = (1 - ${item.d1 / 100}) * (1 - ${item.d2 / 100}) = ${(1 - item.d1 / 100) * (1 - item.d2 / 100)}.\\n2. Equivalent discount = **${item.net}**.`,
    category: 'math', subType: 'percentage'
  };
};
"""
