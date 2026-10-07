/**
 * Curated Bank of 66 100% NOVEL CCAT Math & Logic Archetypes
 * ZERO overlap with the original 24 questions of questionPool.js:
 * - NO clock hand angles
 * - NO simple 40% acid dilution with water
 * - NO "Machine Alpha is twice as fast as Beta"
 * - NO "Cubes + 1" (2, 9, 28, 65, 126)
 * - NO "Differences double" (10, 12, 16, 24, 40)
 * - NO wholesale 60% markup with 25% discount
 * - NO leaking water tank at 1.5 gal / 45 sec
 * - NO "35% of a number is 140, what is 60%?"
 * - NO "missing score on 5th exam to get 88 average"
 *
 * Provides a deep, realistic pool across 66 distinct CCAT topics so that
 * tests 2 through 30 never repeat the same questions with slight variations.
 */

import { getMathVariant } from './mathVariants.js';

function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    return (s = (s * 16807) % 2147483647) / 2147483647;
  };
}

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

export const MATH_ARCHETYPES = [
  // 0: VENN DIAGRAM - Two Overlapping Sets
  (t, k, rand) => {
    const total = 120 + (k % 4) * 20;
    const setA = Math.round(total * 0.60);
    const setB = Math.round(total * 0.45);
    const both = Math.round(total * 0.20);
    const neither = total - (setA + setB - both);
    const q = `In a software engineering department of ${total} engineers, ${setA} program in Python, ${setB} program in Rust, and ${both} program in both languages. How many engineers in the department program in NEITHER Python nor Rust?`;
    const correct = `${neither}`;
    const distractors = [`${neither + 8}`, `${neither - 6 > 0 ? neither - 6 : neither + 12}`, `${total - (setA + setB)}`, `${both + neither}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Principle of Inclusion-Exclusion: \\(|A \\cup B| = |A| + |B| - |A \\cap B| = ${setA} + ${setB} - ${both} = ${setA + setB - both}\\).\n2. Engineers using neither = Total - \\(|A \\cup B| = ${total} - ${setA + setB - both} =\\) **${neither}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 1: CALENDAR / MODULAR ARITHMETIC - Day of the Week
  (t, k, rand) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const startIdx = (k * 2) % 7;
    const startDay = days[startIdx];
    const advance = 180 + (k % 5) * 25;
    const rem = advance % 7;
    const targetIdx = (startIdx + rem) % 7;
    const targetDay = days[targetIdx];
    const q = `If today is ${startDay}, what day of the week will it be exactly ${advance} days from today?`;
    const correct = targetDay;
    const distractors = days.filter(d => d !== targetDay).slice(0, 4);
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. A full week has 7 days. Divide total days by 7: \\${advance} \\div 7 = ${Math.floor(advance / 7)}\\text{ weeks with remainder } ${rem}\\).\n2. Advancing ${rem} days forward from ${startDay} lands on **${targetDay}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 2: SPEED - Head Start & Specific Clock Time Overtake
  (t, k, rand) => {
    const v1 = 45;
    const v2 = 75;
    const headStartHrs = 2;
    const startHour = 8;
    const bDepartHour = startHour + headStartHrs;
    const catchHrs = (v1 * headStartHrs) / (v2 - v1);
    const meetHour = bDepartHour + catchHrs;
    const meetTimeStr = meetHour > 12 ? `${meetHour - 12}:00 PM` : `${meetHour}:00 AM`;
    const q = `At exactly 8:00 AM, Courier Van A leaves a dispatch center traveling at ${v1} mph. At 10:00 AM, Express Interceptor B departs from the same station along the identical route at ${v2} mph. At what specific clock time will Interceptor B overtake Van A?`;
    const correct = meetTimeStr;
    const distractors = [`${meetHour - 13 > 0 ? meetHour - 13 : 12}:30 PM`, `${meetHour - 11}:00 PM`, `11:30 AM`, `2:30 PM`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Van A's head start distance by 10:00 AM = ${v1} mph \\times ${headStartHrs} hrs = ${v1 * headStartHrs} miles.\n2. Relative speed of Interceptor B = ${v2} - ${v1} = ${v2 - v1} mph.\n3. Time to overtake = ${v1 * headStartHrs} / ${v2 - v1} = ${catchHrs} hours.\n4. 10:00 AM + ${catchHrs} hours = **${meetTimeStr}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 3: AVERAGE SPEED - Unequal Distance Segments
  (t, k, rand) => {
    const d1 = 120 + (k % 3) * 30;
    const s1 = 60;
    const d2 = 80;
    const s2 = 40;
    const t1 = d1 / s1;
    const t2 = d2 / s2;
    const totalDist = d1 + d2;
    const totalTime = t1 + t2;
    const avgSpeed = (totalDist / totalTime).toFixed(1);
    const q = `A delivery truck travels the first ${d1} miles of a route at an average speed of ${s1} mph, and travels the remaining ${d2} miles at ${s2} mph. What is the vehicle's overall average speed across the complete ${totalDist}-mile route?`;
    const correct = `${avgSpeed} mph`;
    const trapSpeed = `${((s1 + s2) / 2).toFixed(1)} mph`;
    const distractors = [trapSpeed, `${(parseFloat(avgSpeed) + 4.2).toFixed(1)} mph`, `${(parseFloat(avgSpeed) - 3.5).toFixed(1)} mph`, `${(parseFloat(avgSpeed) + 7.0).toFixed(1)} mph`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total Distance = ${d1} + ${d2} = ${totalDist} miles.\n2. Total Time = \\(t_1 + t_2 = (${d1}/${s1}) + (${d2}/${s2}) = ${t1} + ${t2} = ${totalTime}\\text{ hours}\\).\n3. Average Speed = \\(\\frac{\\text{Total Distance}}{\\text{Total Time}} = \\frac{${totalDist}}{${totalTime}} =\\) **${avgSpeed} mph**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 4: FINANCE - Rule of 72 Doubling Time
  (t, k, rand) => {
    const rates = [6, 8, 9, 12];
    const r = rates[(k + t) % rates.length];
    const years = 72 / r;
    const q = `According to the standard financial Rule of 72, approximately how many years will it take for a commercial treasury bond earning ${r}% interest compounded annually to double in total investment value?`;
    const correct = `${years} years`;
    const distractors = [`${years + 3} years`, `${years - 2 > 0 ? years - 2 : years + 5} years`, `${Math.round(100 / r)} years`, `${years + 6} years`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. The Rule of 72 states that doubling time \\(T \\approx \\frac{72}{R}\\).\n2. \\(T = 72 / ${r} =\\) **${years} years**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 5: PERCENTAGE - Successive Three-Step Compounding Shifts
  (t, k, rand) => {
    const up1 = 20;
    const down = 10;
    const up2 = 15;
    const mult = 1.20 * 0.90 * 1.15;
    const netPct = ((mult - 1) * 100).toFixed(1);
    const q = `During a volatile trading quarter, a technology fund's unit price increases by 20% in Month 1, drops by 10% in Month 2, and subsequently increases by 15% in Month 3. What is the net overall percentage increase from the initial starting price?`;
    const correct = `${netPct}%`;
    const trapSum = `${up1 - down + up2}.0%`;
    const distractors = [trapSum, `${(parseFloat(netPct) + 5.0).toFixed(1)}%`, `${(parseFloat(netPct) - 4.2).toFixed(1)}%`, `28.5%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Compounded multiplier: \\(1.20 \\times 0.90 \\times 1.15 = ${mult.toFixed(4)}\\).\n2. Net percentage increase = \\((${mult.toFixed(4)} - 1) \\times 100\\% =\\) **${netPct}%**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 6: PERCENTAGE - Profit on Selling Price vs Cost Price
  (t, k, rand) => {
    const spProfits = [
      { sp: 20, cp: 25, fracSP: '1/5', fracCP: '1/4' },
      { sp: 25, cp: 33.3, fracSP: '1/4', fracCP: '1/3' },
      { sp: 50, cp: 100, fracSP: '1/2', fracCP: '1/1' },
      { sp: 16.7, cp: 20, fracSP: '1/6', fracCP: '1/5' }
    ];
    const item = spProfits[(k + t) % spProfits.length];
    const q = `A wholesale merchant prices inventory such that their net profit equals exactly ${item.sp}% of the final SELLING price. What is the merchant's net profit percentage based on the wholesale COST price?`;
    const correct = `${item.cp}%`;
    const distractors = [`${item.sp}%`, `${(item.cp + 10).toFixed(1)}%`, `${(item.cp - 8 > 0 ? item.cp - 8 : item.cp + 15).toFixed(1)}%`, `${(item.sp * 2).toFixed(1)}%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. If profit is ${item.fracSP} of Selling Price, then Cost Price is \\(1 - ${item.fracSP} = ${item.fracCP === '1/1' ? '1/2' : '4/5'}\\).\n2. Profit / Cost = \\${item.sp} / (100 - ${item.sp}) =\\) **${item.cp}%**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 7: COMBINATORICS - Permutations with Adjacent Constraint
  (t, k, rand) => {
    const ways = 48;
    const q = `In how many distinct arrangements can 5 corporate executives sit in a row of 5 chairs for an annual board meeting if the Chief Executive Officer and Chief Financial Officer insist on sitting directly next to each other?`;
    const correct = `${ways}`;
    const distractors = [`120`, `24`, `60`, `72`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Treat the CEO and CFO as a single combined block. There are now 4 units to arrange: \\(4! = 24\\).\n2. Within the block, the CEO and CFO can sit in \\(2! = 2\\) relative orders.\n3. Total arrangements = \\(24 \\times 2 =\\) **${ways}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 8: LCM - Periodic Synchronization of Three Timers
  (t, k, rand) => {
    const sets = [
      { a: 12, b: 15, c: 20, lcm: 60 },
      { a: 15, b: 20, c: 30, lcm: 60 },
      { a: 10, b: 15, c: 25, lcm: 150 },
      { a: 12, b: 18, c: 24, lcm: 72 }
    ];
    const s = sets[(k + t) % sets.length];
    const q = `Three automated production sensors cycle on timers of ${s.a} seconds, ${s.b} seconds, and ${s.c} seconds respectively. If all three sensors trigger simultaneously right now, after how many seconds will all three trigger together again at the exact same instant?`;
    const correct = `${s.lcm} seconds`;
    const distractors = [`${s.a * s.b} seconds`, `${s.lcm / 2} seconds`, `${s.lcm + s.a} seconds`, `${s.a + s.b + s.c} seconds`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Find the Least Common Multiple: \\(\\text{LCM}(${s.a}, ${s.b}, ${s.c})\\).\n2. LCM = **${s.lcm} seconds**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 9: GEOMETRY - Similar Triangle Shadow Proportions
  (t, k, rand) => {
    const postHeight = 6;
    const postShadow = 4;
    const treeShadow = 28 + (k % 4) * 4;
    const treeHeight = (postHeight * treeShadow) / postShadow;
    const q = `At 3:00 PM on a clear afternoon, a vertical 6-foot signpost casts a shadow of 4 feet on level ground. At the same instant, a nearby pine tree casts a shadow of ${treeShadow} feet. What is the height of the tree?`;
    const correct = `${treeHeight} feet`;
    const distractors = [`${treeHeight + 6} feet`, `${treeHeight - 4} feet`, `${treeShadow} feet`, `${Math.round(treeHeight * 1.25)} feet`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. By similar triangles: \\(\\frac{\\text{Height}}{\\text{Shadow}} = \\frac{6}{4} = 1.5\\).\n2. Tree Height = \\(1.5 \\times ${treeShadow} =\\) **${treeHeight} feet**.`,
      category: 'math', subType: 'geometry'
    };
  },

  // 10: GEOMETRIC PROBABILITY - Inscribed Target Circle in Square
  (t, k, rand) => {
    const q = `A dart is randomly thrown and guaranteed to land inside a square target board of side length 20 cm. If a circular bullseye of diameter 20 cm is inscribed perfectly inside the square, what is the probability that the dart lands inside the circular bullseye? (Use π ≈ 3.1416)`;
    const correct = `78.5%`;
    const distractors = [`63.7%`, `50.0%`, `82.4%`, `71.2%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (78.5%)\n\n**Step-by-step Solution:**\n1. Area of square = \\(s^2\\). Area of inscribed circle = \\(\\pi (s/2)^2 = \\frac{\\pi s^2}{4}\\).\n2. Ratio = \\(\\frac{\\pi}{4} \\approx \\frac{3.1416}{4} = 0.7854\\) or **78.5%**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 11: WORK - Opposing Inflow and Drainage Rates
  (t, k, rand) => {
    const fillHours = 6;
    const drainHours = 10;
    const netRate = (1 / fillHours) - (1 / drainHours); // 1/6 - 1/10 = 2/30 = 1/15
    const totalHours = 1 / netRate;
    const q = `An intake valve can fill an industrial cooling reservoir in ${fillHours} hours, while an emergency drainage valve can completely drain it in ${drainHours} hours. If the reservoir starts empty and both valves are opened simultaneously, in how many hours will the reservoir be completely full?`;
    const correct = `${totalHours} hours`;
    const distractors = [`${drainHours - fillHours} hours`, `${(fillHours + drainHours) / 2} hours`, `${totalHours + 5} hours`, `12 hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Net rate = \\(1/${fillHours} - 1/${drainHours} = 5/30 - 3/30 = 2/30 = 1/15\\) of reservoir per hour.\n2. Total time = \\(1 / (1/15) =\\) **${totalHours} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 12: AGE RATIOS - Three Generations System
  (t, k, rand) => {
    const sonAge = 12 + (k % 4) * 2; // e.g. 12, 14, 16, 18
    const fatherAge = sonAge * 3;
    const grandfatherAge = fatherAge * 2;
    const sum = sonAge + fatherAge + grandfatherAge;
    const q = `A grandfather is twice as old as his son, and the father is three times as old as his grandson. If the sum of their three ages is ${sum} years, how old is the father?`;
    const correct = `${fatherAge} years`;
    const distractors = [`${sonAge} years`, `${grandfatherAge} years`, `${fatherAge + 6} years`, `${fatherAge - 6} years`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let grandson = \\(x\\). Father = \\(3x\\). Grandfather = \\(2(3x) = 6x\\).\n2. \\(x + 3x + 6x = 10x = ${sum}\\implies x = ${sonAge}\\).\n3. Father's age = \\(3 \\times ${sonAge} =\\) **${fatherAge} years**.`,
      category: 'math', subType: 'algebra'
    };
  },

  // 13: NUMBER THEORY - Divisibility by 9 with Missing Digit
  (t, k, rand) => {
    const missingDigits = [
      { numStr: '47_82', knownSum: 21, missing: 6, full: '47682' },
      { numStr: '83_15', knownSum: 17, missing: 1, full: '83115' },
      { numStr: '29_64', knownSum: 21, missing: 6, full: '29664' },
      { numStr: '51_39', knownSum: 18, missing: 9, full: '51939' }
    ];
    const item = missingDigits[(k + t) % missingDigits.length];
    const q = `What single digit must replace the underscore in the 5-digit number ${item.numStr} so that the resulting number is completely divisible by 9?`;
    const correct = `${item.missing}`;
    const distractors = [2, 3, 4, 5, 7, 8].filter(d => d !== item.missing).slice(0, 4).map(String);
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. A number is divisible by 9 if and only if the sum of its digits is a multiple of 9.\n2. Known digits sum = ${item.knownSum}. Next multiple of 9 is ${item.knownSum <= 18 ? 18 : item.knownSum <= 27 ? 27 : 36}.\n3. Missing digit = **${item.missing}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 14: ALGEBRA - Multi-Variable Bundles
  (t, k, rand) => {
    const penPrice = 3;
    const notePrice = 5;
    const bundle1Pens = 4, bundle1Notes = 3;
    const total1 = bundle1Pens * penPrice + bundle1Notes * notePrice; // 12 + 15 = 27
    const bundle2Pens = 2, bundle2Notes = 5;
    const total2 = bundle2Pens * penPrice + bundle2Notes * notePrice; // 6 + 25 = 31
    const targetPens = 1, targetNotes = 1;
    const targetTotal = targetPens * penPrice + targetNotes * notePrice; // 8
    const q = `4 pens and 3 notebooks cost $${total1} in total. 2 pens and 5 notebooks cost $${total2} in total. What is the combined cost of purchasing exactly 1 pen and 1 notebook?`;
    const correct = `$${targetTotal}`;
    const distractors = [`$${targetTotal + 2}`, `$${targetTotal - 1}`, `$${penPrice}`, `$${notePrice}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Multiply 2nd equation by 2: \\(4P + 10N = ${total2 * 2}\\).\n2. Subtract 1st: \\(7N = ${total2 * 2 - total1} \\implies N = \$${notePrice}\\).\n3. Then \\(P = \$${penPrice}\\). 1 Pen + 1 Notebook = **$${targetTotal}**.`,
      category: 'math', subType: 'algebra'
    };
  },

  // 15: QUADRATIC SCALING - Aerodynamic Drag Scaling
  (t, k, rand) => {
    const factor = 1.5; // 50% increase in speed -> 1.5^2 = 2.25 -> 125% increase
    const pctIncrease = 125;
    const q = `Aerodynamic drag force acting on an electric locomotive is directly proportional to the SQUARE of its forward speed. If the train increases its operating velocity from 60 mph to 90 mph (a 50% increase), by what percentage does the aerodynamic drag force increase?`;
    const correct = `125%`;
    const distractors = [`50%`, `100%`, `150%`, `225%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (125%)\n\n**Step-by-step Solution:**\n1. New drag \\(F_2 = (1.5)^2 F_1 = 2.25 F_1\\).\n2. Percentage increase = \\((2.25 - 1) \\times 100\\% =\\) **125%**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 16: CIRCULAR TRACK - Lap Chase
  (t, k, rand) => {
    const track = 400;
    const v1 = 7;
    const v2 = 5;
    const rel = v1 - v2;
    const time = track / rel;
    const q = `Two runners begin sprinting simultaneously from the exact same starting line on a 400-meter circular track, both running in the identical clockwise direction. Runner A maintains a steady 7 m/s, while Runner B maintains 5 m/s. After how many seconds will Runner A lap Runner B (catch up to them from behind)?`;
    const correct = `${time} seconds`;
    const distractors = [`${time / 2} seconds`, `${time + 50} seconds`, `80 seconds`, `100 seconds`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. To lap Runner B, Runner A must cover exactly 1 full lap (400 meters) more than Runner B.\n2. Relative speed = \\(7 - 5 = 2\\text{ m/s}\\).\n3. Time = \\(400 / 2 =\\) **${time} seconds**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 17: NUMBER SEQUENCES - Generalized Fibonacci-type Series
  (t, k, rand) => {
    // a_n = a_{n-1} + a_{n-2} + 2
    // 1, 3 -> 1+3+2 = 6 -> 3+6+2 = 11 -> 6+11+2 = 19 -> 11+19+2 = 32
    const seq = [1, 3, 6, 11, 19];
    const nextVal = 11 + 19 + 2; // 32
    const q = `Identify the next number in the following sequence:\n\n1, 3, 6, 11, 19, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 3}`, `${nextVal + 4}`, `30`, `35`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Pattern: Each term is the sum of the previous two terms plus 2.\n2. Next term = \\(11 + 19 + 2 =\\) **${nextVal}**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 18: NUMBER SEQUENCES - Quadratic Decreasing Offsets (n^2 - n)
  (t, k, rand) => {
    // n^2 - n: 0, 2, 6, 12, 20, 30, 42 (differences: +2, +4, +6, +8, +10, +12)
    const seq = [2, 6, 12, 20, 30];
    const nextVal = 42;
    const q = `Identify the next number in the following sequence:\n\n2, 6, 12, 20, 30, ?`;
    const correct = `${nextVal}`;
    const distractors = [`38`, `40`, `44`, `46`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Look at consecutive differences: \\(6-2=4\\), \\(12-6=6\\), \\(20-12=8\\), \\(30-20=10\\).\n2. Differences increase by 2 each step. Next difference = \\(10 + 2 = 12\\).\n3. Next term = \\(30 + 12 =\\) **${nextVal}**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 19: NUMBER SEQUENCES - Interleaved Sequences
  (t, k, rand) => {
    // Odd positions: 4, 8, 12, 16 (+4)
    // Even positions: 50, 45, 40, 35 (-5)
    // 4, 50, 8, 45, 12, 40, 16, ? -> 35
    const seq = '4, 50, 8, 45, 12, 40, 16, ?';
    const nextVal = 35;
    const q = `Identify the missing number indicated by the question mark in the series:\n\n${seq}`;
    const correct = `${nextVal}`;
    const distractors = [`20`, `30`, `38`, `25`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. This is two interleaved sub-sequences:\n   - Odd indices: 4, 8, 12, 16 (increases by 4).\n   - Even indices: 50, 45, 40, ? (decreases by 5).\n2. Next term = \\(40 - 5 =\\) **${nextVal}**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 20: COMBINATORICS - Complete Round-Robin Handshakes
  (t, k, rand) => {
    const attendees = 14 + (k % 4); // 14, 15, 16, 17
    const handshakes = (attendees * (attendees - 1)) / 2;
    const q = `At an executive strategy symposium attended by ${attendees} department heads, every person shakes hands with every other person in the room exactly once. How many total handshakes occur?`;
    const correct = `${handshakes}`;
    const distractors = [`${attendees * (attendees - 1)}`, `${handshakes - attendees}`, `${handshakes + 12}`, `${attendees * 2}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combinations formula \\(\\binom{n}{2} = \\frac{n(n-1)}{2}\\).\n2. \\(\\frac{${attendees} \\times ${attendees - 1}}{2} =\\) **${handshakes}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 21: WORK - Quality Control Penalty Balance
  (t, k, rand) => {
    const totalUnits = 100;
    const rewardPerGood = 10;
    const penaltyPerBad = 15;
    const badUnits = 12 + (k % 4) * 2;
    const goodUnits = totalUnits - badUnits;
    const netPayout = goodUnits * rewardPerGood - badUnits * penaltyPerBad;
    const q = `A technician inspects ${totalUnits} electronic components. For every flawless component approved, the technician earns $${rewardPerGood}. For every defective unit mistakenly approved, they are penalized $${penaltyPerBad}. If their net earnings for the batch totaled $${netPayout}, how many defective units were approved?`;
    const correct = `${badUnits}`;
    const distractors = [`${badUnits + 4}`, `${badUnits - 4 > 0 ? badUnits - 4 : badUnits + 8}`, `${goodUnits}`, `8`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let defective = \\(x\\). Good = \\(${totalUnits} - x\\).\n2. \\(${rewardPerGood}(${totalUnits} - x) - ${penaltyPerBad}x = ${netPayout}\\implies ${totalUnits * rewardPerGood} - ${rewardPerGood + penaltyPerBad}x = ${netPayout}\\).\n3. \\(${rewardPerGood + penaltyPerBad}x = ${totalUnits * rewardPerGood - netPayout} \\implies x =\\) **${badUnits}**. Defective approved = **${badUnits}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 22: FRACTIONS - Telescoping Product
  (t, k, rand) => {
    const n = 10 + (k % 5) * 2; // e.g. 10, 12, 14, 16, 18
    const q = `Evaluate the product:\n\n(1 - 1/2) × (1 - 1/3) × (1 - 1/4) × ... × (1 - 1/${n})`;
    const correct = `1/${n}`;
    const distractors = [`1/${n - 1}`, `2/${n}`, `1/${2 * n}`, `${n - 1}/${n}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Rewrite terms: \\((1/2) \\times (2/3) \\times (3/4) \\times \\dots \\times (${n-1}/${n})\\).\n2. All intermediate numerators and denominators cancel out diagonally.\n3. Result = \\(1/${n}\\).`,
      category: 'math', subType: 'arithmetic'
    };
  },

  // 23: COMMERCIAL - "Buy X Get Y Free" Effective Discount
  (t, k, rand) => {
    const deals = [
      { buy: 3, free: 1, disc: '25.0%' },
      { buy: 4, free: 1, disc: '20.0%' },
      { buy: 2, free: 1, disc: '33.3%' },
      { buy: 3, free: 2, disc: '40.0%' }
    ];
    const d = deals[(k + t) % deals.length];
    const q = `A clothing boutique offers a promotional deal: "Buy ${d.buy}, Get ${d.free} Free" on identical shirts. What is the effective overall percentage discount received by a customer taking full advantage of this promotion?`;
    const correct = d.disc;
    const distractors = [`${((d.free / d.buy) * 100).toFixed(1)}%`, `${(parseFloat(d.disc) + 10).toFixed(1)}%`, `15.0%`, `50.0%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Customer receives \\(${d.buy} + ${d.free} = ${d.buy + d.free}\\text{ items}\\).\n2. Savings = \\(\\frac{${d.free}}{${d.buy + d.free}} =\\) **${d.disc}**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 24: COMMERCIAL - Dishonest Merchant False Weight
  (t, k, rand) => {
    const weights = [
      { used: 800, profit: '25.0%' },
      { used: 900, profit: '11.1%' },
      { used: 850, profit: '17.6%' },
      { used: 750, profit: '33.3%' }
    ];
    const item = weights[(k + t) % weights.length];
    const q = `A dishonest grocer claims to sell rice at cost price, but uses a counterfeit weight of ${item.used} grams instead of a standard 1,000-gram kilogram weight. What is the grocer's true profit percentage?`;
    const correct = item.profit;
    const distractors = [`${((1000 - item.used) / 10).toFixed(1)}%`, `${(parseFloat(item.profit) + 8).toFixed(1)}%`, `15.0%`, `20.0%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Profit \\%= \\frac{\\text{Error}}{\\text{True Weight Handed Out}} \\times 100\\% = \\frac{${1000 - item.used}}{${item.used}} \\times 100\\% =\\) **${item.profit}**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 25: WORK - Alternating Days Work
  (t, k, rand) => {
    // A takes 12 days (rate 1/12), B takes 18 days (rate 1/18).
    // In 2 days: 1/12 + 1/18 = 5/36.
    // In 14 days (7 cycles): 35/36 done. Remaining = 1/36.
    // On day 15, A works: time = (1/36) / (1/12) = 12/36 = 1/3 day. Total = 14 1/3 days = 14.3 days.
    const q = `Mason can assemble a structure alone in 12 days, and Liam can assemble it alone in 18 days. If they work on alternate days starting with Mason on Day 1, in approximately how many days will the structure be completely finished?`;
    const correct = `14.3 days`;
    const distractors = [`15.0 days`, `7.2 days`, `13.5 days`, `16.2 days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (14.3 days)\n\n**Step-by-step Solution:**\n1. 2-day cycle work = \\(1/12 + 1/18 = 5/36\\).\n2. 7 full 2-day cycles (14 days) complete \\(35/36\\) of the job.\n3. Remaining \\(1/36\\) is completed by Mason at rate \\(1/12\\): \\( (1/36) / (1/12) = 1/3 \\approx 0.33\\) days.\n4. Total time = \\(14 + 0.33 =\\) **14.3 days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 26: WORK - Worker Leaves Early Before Completion
  (t, k, rand) => {
    // A alone in 20 days, B alone in 30 days.
    // Both work together, but A leaves 5 days before the job is finished.
    // Total days D: A works (D-5) days, B works D days.
    // (D-5)/20 + D/30 = 1 => 3(D-5) + 2D = 60 => 5D - 15 = 60 => 5D = 75 => D = 15 days.
    const q = `Developer A can build a module alone in 20 days, while Developer B can build it alone in 30 days. They start building together, but Developer A leaves 5 days before the module is finished. How many total days did the entire project take?`;
    const correct = `15 days`;
    const distractors = [`12 days`, `18 days`, `22 days`, `10 days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (15 days)\n\n**Step-by-step Solution:**\n1. Let total days = \\(D\\). In the last 5 days, B worked alone: \\(5 \\times (1/30) = 1/6\\) of the work.\n2. Remaining work done together = \\(1 - 1/6 = 5/6\\).\n3. Combined rate = \\(1/20 + 1/30 = 5/60 = 1/12\\).\n4. Days together = \\((5/6) / (1/12) = 10\\) days.\n5. Total days = \\(10 + 5 =\\) **15 days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 27: WORK - Worker Efficiency Percentage
  (t, k, rand) => {
    // A is 50% more efficient than B. B takes 30 days.
    // A's daily rate = 1.5 * (1/30) = 1/20 -> A takes 20 days alone.
    // Together: 1/20 + 1/30 = 5/60 = 1/12 -> 12 days together.
    const q = `Specialist Clara is 50% more efficient than Technician David. If David takes 30 days to finish an audit project alone, how many days will it take Clara and David working together to complete the same audit?`;
    const correct = `12 days`;
    const distractors = [`15 days`, `10 days`, `18 days`, `14 days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (12 days)\n\n**Step-by-step Solution:**\n1. David's rate = \\(1/30\\). Clara's rate = \\(1.5 \\times (1/30) = 1/20\\).\n2. Combined rate = \\(1/20 + 1/30 = 1/12\\).\n3. Total time = **12 days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 28: SPEED - Train Crossing a Stationary Platform
  (t, k, rand) => {
    // Train length = 200m, Platform = 300m. Total distance = 500m.
    // Speed = 72 km/h = 72 * 5/18 = 20 m/s.
    // Time = 500 / 20 = 25 seconds.
    const trainLen = 200;
    const platLen = 300;
    const speedKmh = 72;
    const speedMs = speedKmh * (5 / 18);
    const time = (trainLen + platLen) / speedMs;
    const q = `A passenger train measuring ${trainLen} meters in length is traveling at a constant speed of ${speedKmh} km/h. How many seconds will it take for the train to completely cross a ${platLen}-meter station platform?`;
    const correct = `${time} seconds`;
    const distractors = [`${time - 5} seconds`, `${time + 10} seconds`, `${platLen / speedMs} seconds`, `30 seconds`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Convert speed: \\(72 \\times \\frac{5}{18} = 20\\text{ m/s}\\).\n2. Total distance to clear platform = \\(${trainLen} + ${platLen} = 500\\text{ meters}\\).\n3. Time = \\(500 / 20 =\\) **${time} seconds**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 29: SPEED - Two Trains Moving in Opposite Directions
  (t, k, rand) => {
    // Train 1: 150m at 54 km/h (15 m/s). Train 2: 250m at 90 km/h (25 m/s).
    // Total distance = 400m. Relative speed = 15 + 25 = 40 m/s.
    // Time = 400 / 40 = 10 seconds.
    const q = `Two express trains traveling on parallel tracks in opposite directions measure 150 meters and 250 meters in length. Their speeds are 54 km/h and 90 km/h respectively. From the instant their front engines meet, how many seconds will it take for them to completely pass each other?`;
    const correct = `10 seconds`;
    const distractors = [`15 seconds`, `8 seconds`, `12 seconds`, `20 seconds`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (10 seconds)\n\n**Step-by-step Solution:**\n1. Relative speed = \\((54 + 90) \\times \\frac{5}{18} = 144 \\times \\frac{5}{18} = 40\\text{ m/s}\\).\n2. Total distance = \\(150 + 250 = 400\\text{ m}\\).\n3. Time = \\(400 / 40 =\\) **10 seconds**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 30: SPEED - River Boat Upstream vs Downstream
  (t, k, rand) => {
    // Downstream speed = 18 km/h, Upstream speed = 12 km/h.
    // Speed of boat in still water = (18 + 12) / 2 = 15 km/h.
    // Speed of current = (18 - 12) / 2 = 3 km/h.
    const down = 18;
    const up = 12;
    const current = (down - up) / 2;
    const boat = (down + up) / 2;
    const q = `A motorboat travels downstream with the current at a speed of ${down} km/h, and travels upstream against the same current at ${up} km/h. What is the speed of the river current?`;
    const correct = `${current} km/h`;
    const distractors = [`${boat} km/h`, `${current + 2} km/h`, `${current * 2} km/h`, `4 km/h`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Current speed = \\(\\frac{\\text{Downstream} - \\text{Upstream}}{2} = \\frac{${down} - ${up}}{2} =\\) **${current} km/h**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 31: SPEED - Punctuality Problem (Late vs Early)
  (t, k, rand) => {
    // At 40 km/h arrives 15 min (1/4 hr) late. At 60 km/h arrives 5 min (1/12 hr) early.
    // Time diff = 20 min = 1/3 hr.
    // D/40 - D/60 = 1/3 => D(3 - 2)/120 = 1/3 => D/120 = 1/3 => D = 40 km.
    const q = `A sales executive driving to a regional convention finds that driving at 40 km/h makes them arrive 15 minutes late, whereas driving at 60 km/h makes them arrive 5 minutes early. What is the total distance to the convention?`;
    const correct = `40 km`;
    const distractors = [`30 km`, `50 km`, `60 km`, `45 km`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (40 km)\n\n**Step-by-step Solution:**\n1. Difference in travel time = \\(15\\text{ min late} - (-5\\text{ min early}) = 20\\text{ min} = 1/3\\text{ hr}\\).\n2. \\(\\frac{D}{40} - \\frac{D}{60} = \\frac{D}{120} = \\frac{1}{3} \\implies D =\\) **40 km**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 32: COMBINATORICS - Committee Selection
  (t, k, rand) => {
    // 5 men, 4 women. Select committee of 2 men and 2 women.
    // C(5,2) * C(4,2) = 10 * 6 = 60.
    const ways = 60;
    const q = `A hiring committee must select 2 senior analysts from a pool of 5 male applicants and 2 senior analysts from a pool of 4 female applicants. In how many different ways can the 4-person committee be formed?`;
    const correct = `${ways}`;
    const distractors = [`20`, `120`, `30`, `45`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Ways to choose 2 men from 5: \\(\\binom{5}{2} = 10\\).\n2. Ways to choose 2 women from 4: \\(\\binom{4}{2} = 6\\).\n3. Total ways = \\(10 \\times 6 =\\) **60**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 33: COMBINATORICS - Forming 3-Digit Numbers
  (t, k, rand) => {
    // Digits: {1, 3, 5, 7, 9} (5 odd digits). How many distinct 3-digit numbers can be formed without repetition?
    // 5 * 4 * 3 = 60.
    const ways = 60;
    const q = `How many distinct 3-digit numbers can be formed using only the digits {1, 3, 5, 7, 9} if each digit can be used at most once in each number?`;
    const correct = `${ways}`;
    const distractors = [`125`, `20`, `120`, `50`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. 5 choices for the hundreds digit, 4 remaining for tens digit, 3 remaining for units digit.\n2. \\(5 \\times 4 \\times 3 =\\) **60** distinct 3-digit numbers.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 34: COMBINATORICS - Polygon Diagonals
  (t, k, rand) => {
    const sides = 8 + (k % 4); // 8 (octagon: 20), 9 (nonagon: 27), 10 (decagon: 35), 11 (hendecagon: 44)
    const diags = (sides * (sides - 3)) / 2;
    const names = { 8: 'an octagon (8 sides)', 9: 'a nonagon (9 sides)', 10: 'a decagon (10 sides)', 11: 'an 11-sided regular polygon' };
    const q = `How many unique diagonals can be drawn in ${names[sides]}?`;
    const correct = `${diags}`;
    const distractors = [`${diags + 8}`, `${diags - 6}`, `${sides * 2}`, `${diags + 14}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Diagonals formula \\(D = \\frac{n(n-3)}{2}\\).\n2. \\(D = \\frac{${sides}(${sides - 3})}{2} =\\) **${diags}**.`,
      category: 'math', subType: 'geometry'
    };
  },

  // 35: COMBINATORICS - Grid Walking Shortest Paths
  (t, k, rand) => {
    // Paths from (0,0) to (4,3): C(4+3, 3) = C(7,3) = 35.
    const q = `A warehouse robotic cart navigates an orthogonal grid from intersection (0,0) to intersection (4,3). If the cart can only move East (right) or North (up), how many distinct shortest paths can it take?`;
    const correct = `35`;
    const distractors = [`12`, `28`, `42`, `49`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (35)\n\n**Step-by-step Solution:**\n1. Total moves = 4 East + 3 North = 7 moves.\n2. Combinations of 3 North moves among 7 total: \\(\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} =\\) **35**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 36: NUMBER THEORY - Unit Digit of Large Exponent
  (t, k, rand) => {
    // 7^1=7, 7^2=9, 7^3=3, 7^4=1 (cycle of 4: 7, 9, 3, 1)
    // 7^85 -> 85 % 4 = 1 -> unit digit is 7.
    // 7^86 -> 86 % 4 = 2 -> unit digit is 9.
    const exp = 85 + (k % 4); // 85 -> 7, 86 -> 9, 87 -> 3, 88 -> 1
    const cycle = [1, 7, 9, 3];
    const unitDigit = cycle[exp % 4];
    const q = `What is the units digit (last digit) of the integer value 7^${exp}?`;
    const correct = `${unitDigit}`;
    const distractors = [1, 3, 5, 7, 9].filter(d => d !== unitDigit).slice(0, 4).map(String);
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Powers of 7 cycle in units digits with period 4: \\(7^1=7, 7^2=9, 7^3=3, 7^4=1\\).\n2. \\(${exp} \\div 4\\) leaves remainder \\(${exp % 4}\\).\n3. Units digit = **${unitDigit}**.`,
      category: 'math', subType: 'arithmetic'
    };
  },

  // 37: NUMBER THEORY - Remainder Theorem
  (t, k, rand) => {
    // A number N divided by 48 leaves remainder 35. What is remainder when N is divided by 12?
    // N = 48k + 35 = 12(4k + 2) + 11. Remainder is 35 % 12 = 11.
    const rem = 35 % 12; // 11
    const q = `When a positive integer N is divided by 48, the remainder is 35. What is the remainder when the exact same integer N is divided by 12?`;
    const correct = `${rem}`;
    const distractors = [`5`, `7`, `3`, `1`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. \\(N = 48k + 35\\).\n2. Since 48 is an exact multiple of 12, \\(N \\pmod{12} = 35 \\pmod{12}\\).\n3. \\(35 = 2 \\times 12 + 11\\implies\\) remainder = **${rem}**.`,
      category: 'math', subType: 'arithmetic'
    };
  },

  // 38: NUMBER THEORY - Trailing Zeros in Factorial
  (t, k, rand) => {
    // 30! -> floor(30/5) + floor(30/25) = 6 + 1 = 7 zeros.
    const q = `How many trailing zeros are there at the end of the calculated value of 30! (30 factorial)?`;
    const correct = `7`;
    const distractors = [`6`, `5`, `8`, `10`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (7)\n\n**Step-by-step Solution:**\n1. Legendre's formula counts factors of 5: \\(\\lfloor 30/5 \\rfloor + \\lfloor 30/25 \\rfloor = 6 + 1 = 7\\).\n2. Total trailing zeros = **7**.`,
      category: 'math', subType: 'arithmetic'
    };
  },

  // 39: NUMBER THEORY - LCM and HCF Product Theorem
  (t, k, rand) => {
    // LCM * HCF = A * B.
    // HCF = 12, LCM = 240, Number A = 48. Find Number B.
    // B = (12 * 240) / 48 = 2880 / 48 = 60.
    const hcf = 12;
    const lcm = 240;
    const a = 48;
    const b = (hcf * lcm) / a;
    const q = `The Greatest Common Divisor (GCD) of two positive integers is ${hcf}, and their Least Common Multiple (LCM) is ${lcm}. If one of the numbers is ${a}, what is the second number?`;
    const correct = `${b}`;
    const distractors = [`40`, `72`, `80`, `54`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Identity: \\(\\text{GCD} \\times \\text{LCM} = A \\times B\\).\n2. \\(B = \\frac{${hcf} \\times ${lcm}}{${a}} = \\frac{2880}{48} =\\) **${b}**.`,
      category: 'math', subType: 'arithmetic'
    };
  },

  // 40: NUMBER THEORY - Sum of Consecutive Odd Integers
  (t, k, rand) => {
    // Sum of 5 consecutive odd integers is 175.
    // Middle integer = 175 / 5 = 35. Integers: 31, 33, 35, 37, 39. Greatest = 39.
    const sum = 175;
    const count = 5;
    const mid = sum / count;
    const greatest = mid + 4;
    const q = `The sum of 5 consecutive odd integers is ${sum}. What is the value of the greatest integer in this set?`;
    const correct = `${greatest}`;
    const distractors = [`${greatest - 2}`, `${greatest - 4}`, `${greatest + 2}`, `35`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Average (middle integer) = \\(${sum} / 5 = 35\\).\n2. The 5 consecutive odd integers are 31, 33, 35, 37, 39.\n3. Greatest integer = **${greatest}**.`,
      category: 'math', subType: 'algebra'
    };
  },

  // 41: PERCENTAGES - Identical Selling Price with Profit and Loss
  (t, k, rand) => {
    // Two cars sold at $12,000 each. One at 20% gain, one at 20% loss.
    // Net result: Loss of (20^2 / 100)% = 4% loss.
    const pct = 20;
    const netLossPct = (pct * pct) / 100;
    const q = `An auto dealer sells two vehicles for exactly $12,000 each. On the first vehicle, the dealer gains ${pct}%, while on the second vehicle, the dealer loses ${pct}%. What is the dealer's overall net percentage profit or loss across the combined sale of both vehicles?`;
    const correct = `${netLossPct}% loss`;
    const distractors = [`0% (break even)`, `${netLossPct}% gain`, `2.0% loss`, `4.5% loss`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. When two items are sold at the same price with \\(+x\\%\\) and \\(-x\\%\\), there is always a net loss of \\(\frac{x^2}{100}\%\\).\n2. \\(\\frac{${pct}^2}{100} =\\) **${netLossPct}% loss**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 42: PERCENTAGES - Compensating Consumption for Price Increase
  (t, k, rand) => {
    // Price of petrol increases by 25%. By what % must consumption be reduced to keep expenditure constant?
    // r / (100 + r) * 100 = 25 / 125 * 100 = 20%.
    const q = `The market price of aviation fuel increases by 25%. By what percentage must an airline reduce its total fuel consumption so that its overall fuel expenditure remains completely unchanged?`;
    const correct = `20.0%`;
    const distractors = [`25.0%`, `16.7%`, `22.5%`, `18.0%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (20.0%)\n\n**Step-by-step Solution:**\n1. Reduction \\%= \\frac{R}{100 + R} \\times 100\\% = \\frac{25}{125} \\times 100\\% =\\) **20.0%**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 43: PERCENTAGES - Successive Double Discounts
  (t, k, rand) => {
    // 30% followed by 20% discount. Net multiplier: 0.70 * 0.80 = 0.56 -> 44% discount.
    const q = `A luxury watch retailer offers a storewide 30% discount, and rewards VIP loyalty members with an additional 20% discount taken off the discounted sale price. What single net percentage discount is equivalent to this combined two-step discount?`;
    const correct = `44.0%`;
    const distractors = [`50.0%`, `42.0%`, `46.5%`, `38.0%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (44.0%)\n\n**Step-by-step Solution:**\n1. Customer pays \\((1 - 0.30) \\times (1 - 0.20) = 0.70 \\times 0.80 = 0.56\\) (56%) of original price.\n2. Total discount = \\(100\\% - 56\\% =\\) **44.0%**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 44: PERCENTAGES - Compound Population Growth
  (t, k, rand) => {
    // Initial 40,000. Grows 10% in Year 1, 15% in Year 2.
    // 40,000 * 1.10 = 44,000. 44,000 * 1.15 = 50,600.
    const initial = 40000;
    const finalPop = 40000 * 1.10 * 1.15;
    const q = `A suburban township currently has a population of 40,000 residents. If the population grows by 10% in Year 1 and accelerates to 15% growth in Year 2, what will the total population be at the end of the two-year period?`;
    const correct = `50,600`;
    const distractors = [`50,000`, `51,200`, `48,400`, `52,000`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (50,600)\n\n**Step-by-step Solution:**\n1. Year 1: \\(40,000 \\times 1.10 = 44,000\\).\n2. Year 2: \\(44,000 \\times 1.15 =\\) **50,600**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 45: RATIOS - Combining Two Solution Mixtures
  (t, k, rand) => {
    // Vessel A has milk:water in 4:1 (total 5). Vessel B in 3:2 (total 5).
    // Equal volumes mixed.
    // Total milk = 4/5 + 3/5 = 7/5. Total water = 1/5 + 2/5 = 3/5.
    // Ratio = 7:3.
    const q = `Vessel A contains a milk and water blend in the ratio 4:1. Vessel B contains a milk and water blend in the ratio 3:2. If equal volumes from both vessels are poured together into a large mixing vat, what is the resulting ratio of milk to water?`;
    const correct = `7:3`;
    const distractors = [`7:5`, `5:3`, `12:2`, `8:5`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (7:3)\n\n**Step-by-step Solution:**\n1. In equal 5-unit volumes: Vessel A gives 4 milk and 1 water; Vessel B gives 3 milk and 2 water.\n2. Combined milk = \\(4 + 3 = 7\\); Combined water = \\(1 + 2 = 3\\).\n3. Ratio = **7:3**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 46: RATIOS - Replacement Mixture
  (t, k, rand) => {
    // 40 liters of pure chemical. 8 liters drawn and replaced with water.
    // Fraction remaining = (40 - 8)/40 = 32/40 = 4/5 = 80%.
    // After 2 replacements: 40 * (4/5)^2 = 40 * 16/25 = 25.6 liters.
    const q = `A laboratory flask contains 40 liters of pure ethanol. A chemist extracts 8 liters of ethanol and replaces it with 8 liters of distilled water. They then repeat the exact process a second time (drawing 8 liters of the mixture and replacing with water). How many liters of pure ethanol remain in the flask?`;
    const correct = `25.6 liters`;
    const distractors = [`24.0 liters`, `26.4 liters`, `28.0 liters`, `22.5 liters`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (25.6 liters)\n\n**Step-by-step Solution:**\n1. Fraction remaining each cycle: \\((40 - 8)/40 = 4/5 = 0.8\\).\n2. Ethanol remaining after 2 cycles = \\(40 \\times (0.8)^2 = 40 \\times 0.64 =\\) **25.6 liters**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 47: RATIOS - Dividing Sum with Differences
  (t, k, rand) => {
    // A, B, C share $7,500 in ratio 2:3:5.
    // Total parts = 10. Each part = 750.
    // How much more does C receive than A?
    // C - A = 5 - 2 = 3 parts = 3 * 750 = $2,250.
    const total = 7500;
    const part = total / 10;
    const diff = 3 * part;
    const q = `An annual partnership bonus of $${total.toLocaleString()} is distributed among three founders—Elena, Felix, and Greta—in the ratio 2:3:5 respectively. How much more money does Greta receive than Elena?`;
    const correct = `$${diff.toLocaleString()}`;
    const distractors = [`$${(diff + 500).toLocaleString()}`, `$${(diff - 750).toLocaleString()}`, `$1,500`, `$3,750`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total ratio units = \\(2 + 3 + 5 = 10\\). Value per unit = \\(\$${total.toLocaleString()} / 10 = \$${part}\\).\n2. Difference between Greta and Elena = \\(5 - 2 = 3\\) units = \\(3 \\times \$${part} =\\) **$${diff.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 48: RATIOS - Inverse Variation with Square
  (t, k, rand) => {
    // y is inversely proportional to x^2. When x = 2, y = 18.
    // k = y * x^2 = 18 * 4 = 72.
    // When x = 6, y = 72 / 36 = 2.
    const q = `The physical intensity I of a signal varies inversely with the square of the distance d from the transmitter. When the distance is 2 km, the signal intensity is 18 milliwatts. What is the signal intensity when the distance increases to 6 km?`;
    const correct = `2 milliwatts`;
    const distractors = [`6 milliwatts`, `3 milliwatts`, `1 milliwatt`, `4.5 milliwatts`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (2 milliwatts)\n\n**Step-by-step Solution:**\n1. Intensity constant \\(k = I \\times d^2 = 18 \\times 2^2 = 72\\).\n2. At distance \\(d = 6\\): \\(I = 72 / 6^2 = 72 / 36 =\\) **2 milliwatts**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 49: SEQUENCES - Arithmetic Progression Sum
  (t, k, rand) => {
    // AP: First term a = 4, common difference d = 3. Sum of first 20 terms.
    // S_20 = 20/2 * [2(4) + 19(3)] = 10 * [8 + 57] = 10 * 65 = 650.
    const q = `What is the sum of the first 20 terms of the arithmetic progression:\n\n4, 7, 10, 13, 16, ...?`;
    const correct = `650`;
    const distractors = [`620`, `680`, `590`, `710`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (650)\n\n**Step-by-step Solution:**\n1. Formula: \\(S_n = \\frac{n}{2}[2a + (n-1)d]\\).\n2. \\(S_{20} = \\frac{20}{2}[2(4) + 19(3)] = 10[8 + 57] = 10 \\times 65 =\\) **650**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 50: SEQUENCES - Infinite Geometric Progression Sum
  (t, k, rand) => {
    // First term a = 24, ratio r = 1/3. Sum = a / (1 - r) = 24 / (2/3) = 36.
    const q = `Calculate the exact sum to infinity of the decreasing geometric progression:\n\n24 + 8 + 8/3 + 8/9 + ...`;
    const correct = `36`;
    const distractors = [`32`, `40`, `48`, `34.5`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (36)\n\n**Step-by-step Solution:**\n1. First term \\(a = 24\\), common ratio \\(r = 8/24 = 1/3\\).\n2. Infinite sum \\(S = \\frac{a}{1 - r} = \\frac{24}{1 - 1/3} = \\frac{24}{2/3} =\\) **36**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 51: SEQUENCES - Alternating Operations (+4, *2)
  (t, k, rand) => {
    // 3, (+4) 7, (*2) 14, (+4) 18, (*2) 36, (+4) 40, (*2) 80
    const seq = '3, 7, 14, 18, 36, 40, ?';
    const nextVal = 80;
    const q = `Identify the next number in the following sequence:\n\n${seq}`;
    const correct = `${nextVal}`;
    const distractors = [`44`, `72`, `84`, `76`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. The operations alternate: \\(+4, \\times 2, +4, \\times 2, +4, \\times 2\\).\n2. Following 40, multiply by 2: \\(40 \\times 2 =\\) **${nextVal}**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 52: SEQUENCES - Differences of Differences (Quadratic)
  (t, k, rand) => {
    // 5, 8, 14, 23, 35, ?
    // diffs: +3, +6, +9, +12, +15 -> 35 + 15 = 50.
    const seq = '5, 8, 14, 23, 35, ?';
    const nextVal = 50;
    const q = `Identify the next number in the following sequence:\n\n${seq}`;
    const correct = `${nextVal}`;
    const distractors = [`47`, `48`, `52`, `55`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Differences: \\(8-5=3, 14-8=6, 23-14=9, 35-23=12\\).\n2. Consecutive differences increase by 3. Next difference = 15.\n3. \\(35 + 15 =\\) **50**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 53: SEQUENCES - Triangular Numbers
  (t, k, rand) => {
    // 1, 3, 6, 10, 15, 21, 28, ? -> 36
    const seq = '1, 3, 6, 10, 15, 21, 28, ?';
    const nextVal = 36;
    const q = `Identify the next number in the following series:\n\n${seq}`;
    const correct = `${nextVal}`;
    const distractors = [`35`, `38`, `42`, `34`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Differences are consecutive integers: \\(+2, +3, +4, +5, +6, +7, +8\\).\n2. Next term = \\(28 + 8 =\\) **36**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 54: SEQUENCES - Cubic Offsets (n^3 - n)
  (t, k, rand) => {
    // n^3 - n:
    // 2^3 - 2 = 6
    // 3^3 - 3 = 24
    // 4^3 - 4 = 60
    // 5^3 - 5 = 120
    // 6^3 - 6 = 210
    const seq = '6, 24, 60, 120, ?';
    const nextVal = 210;
    const q = `Identify the next number in the following sequence:\n\n${seq}`;
    const correct = `${nextVal}`;
    const distractors = [`180`, `200`, `216`, `224`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Each term is given by \\(n^3 - n\\) for \\(n = 2, 3, 4, 5, 6\\).\n2. For \\(n = 6\\): \\(6^3 - 6 = 216 - 6 =\\) **210**.`,
      category: 'math', subType: 'sequence'
    };
  },

  // 55: ALGEBRA - Age Problem with Past and Future Ratios
  (t, k, rand) => {
    // 6 years ago, father was 4 times son's age: F - 6 = 4(S - 6) => F - 4S = -18.
    // In 6 years, father will be twice son's age: F + 6 = 2(S + 6) => F - 2S = 6.
    // 2S = 24 => S = 12, F = 30.
    const q = `6 years ago, a father was four times as old as his son. In 6 years from today, the father will be exactly twice as old as his son. What is the current age of the father?`;
    const correct = `30 years`;
    const distractors = [`36 years`, `42 years`, `28 years`, `32 years`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (30 years)\n\n**Step-by-step Solution:**\n1. \\(F - 6 = 4(S - 6) \\implies F - 4S = -18\\).\n2. \\(F + 6 = 2(S + 6) \\implies F - 2S = 6\\).\n3. Subtracting gives \\(2S = 24 \\implies S = 12\\).\n4. Father's age \\(F = 2(12) + 6 =\\) **30 years**.`,
      category: 'math', subType: 'algebra'
    };
  },

  // 56: ALGEBRA - Heads and Legs Problem
  (t, k, rand) => {
    // 40 animals total (heads = 40). Chickens (2 legs), Cows (4 legs). Total legs = 110.
    // If all were chickens: 40 * 2 = 80 legs. Extra legs = 110 - 80 = 30 legs.
    // Each cow adds 2 legs -> Cows = 30 / 2 = 15. Chickens = 25.
    const totalHeads = 40;
    const totalLegs = 110;
    const cows = 15;
    const chickens = 25;
    const q = `A livestock farmer counts a total of ${totalHeads} heads and ${totalLegs} legs among a herd of chickens and cows. How many cows are on the farm?`;
    const correct = `${cows}`;
    const distractors = [`${chickens}`, `10`, `20`, `18`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. If all 40 were chickens: \\(40 \\times 2 = 80\\text{ legs}\\).\n2. Excess legs: \\(110 - 80 = 30\\text{ legs}\\).\n3. Each cow adds 2 legs: \\(30 / 2 =\\) **15 cows**.`,
      category: 'math', subType: 'algebra'
    };
  },

  // 57: ALGEBRA - Fraction Transformation
  (t, k, rand) => {
    // Fraction x/y. If 2 is added to numerator and 3 subtracted from denominator, fraction becomes 3/4.
    // If 1 subtracted from numerator and 2 added to denominator, fraction becomes 1/3.
    // (x+2)/(y-3) = 3/4 => 4x + 8 = 3y - 9 => 4x - 3y = -17.
    // (x-1)/(y+2) = 1/3 => 3x - 3 = y + 2 => 3x - y = 5 => y = 3x - 5.
    // 4x - 3(3x - 5) = -17 => 4x - 9x + 15 = -17 => -5x = -32 (no).
    // Let fraction be 7/15:
    // (7 + 3) / (15 - 1) = 10/14 = 5/7.
    // Let's use simple single equation:
    // A fraction's denominator is 4 greater than its numerator. If 5 is added to both numerator and denominator, the new fraction is 2/3. Find original fraction.
    // (x + 5)/(x + 4 + 5) = 2/3 => (x+5)/(x+9) = 2/3 => 3x + 15 = 2x + 18 => x = 3.
    // Original fraction is 3/7.
    const q = `The denominator of a fraction exceeds its numerator by 4. If 5 is added to both the numerator and the denominator, the resulting fraction simplifies to 2/3. What was the original fraction?`;
    const correct = `3/7`;
    const distractors = [`2/6`, `5/9`, `4/8`, `1/5`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (3/7)\n\n**Step-by-step Solution:**\n1. Let numerator = \\(x\\), denominator = \\(x + 4\\).\n2. \\(\\frac{x + 5}{x + 9} = \\frac{2}{3} \\implies 3x + 15 = 2x + 18 \\implies x = 3\\).\n3. Original fraction = **3/7**.`,
      category: 'math', subType: 'algebra'
    };
  },

  // 58: GEOMETRY - Right Triangle Hypotenuse and Perimeter
  (t, k, rand) => {
    // Pythagorean triple: 9, 12, 15. Perimeter = 36. Area = 54.
    const q = `A right-angled triangular sail has legs measuring 9 meters and 12 meters. What is the total perimeter of the sail in meters?`;
    const correct = `36 meters`;
    const distractors = [`30 meters`, `42 meters`, `54 meters`, `27 meters`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (36 meters)\n\n**Step-by-step Solution:**\n1. Hypotenuse \\(c = \\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15\\text{ meters}\\).\n2. Perimeter = \\(9 + 12 + 15 =\\) **36 meters**.`,
      category: 'math', subType: 'geometry'
    };
  },

  // 59: GEOMETRY - Uniform Walkway Border Area
  (t, k, rand) => {
    // Rectangular pool: 20m x 10m (Area = 200). Walkway width = 2m.
    // Outer dimensions: (20 + 4) x (10 + 4) = 24 x 14 = 336 sq m.
    // Walkway Area = 336 - 200 = 136 sq m.
    const q = `A rectangular swimming pool measures 20 meters in length by 10 meters in width. A concrete walkway of uniform width 2 meters is constructed all the way around the outer border of the pool. What is the surface area of the concrete walkway?`;
    const correct = `136 sq m`;
    const distractors = [`120 sq m`, `144 sq m`, `128 sq m`, `160 sq m`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (136 sq m)\n\n**Step-by-step Solution:**\n1. Inner area = \\(20 \\times 10 = 200\\text{ sq m}\\).\n2. Outer dimensions with 2m border on each side = \\((20 + 4) \\times (10 + 4) = 24 \\times 14 = 336\\text{ sq m}\\).\n3. Border area = \\(336 - 200 =\\) **136 sq m**.`,
      category: 'math', subType: 'geometry'
    };
  },

  // 60: GEOMETRY - Dimensional Scaling on Area
  (t, k, rand) => {
    // Radius of circular disk increased by 30%. Area increases by (1.30^2 - 1)*100 = 69%.
    const q = `If the radius of a circular solar collection dish is increased by exactly 30%, by what percentage does the total surface area of the dish increase?`;
    const correct = `69.0%`;
    const distractors = [`30.0%`, `60.0%`, `72.5%`, `56.0%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (69.0%)\n\n**Step-by-step Solution:**\n1. Area scales with square of radius: \\(A_2 = (1.30)^2 A_1 = 1.69 A_1\\).\n2. Percentage increase = \\((1.69 - 1) \\times 100\\% =\\) **69.0%**.`,
      category: 'math', subType: 'geometry'
    };
  },

  // 61: GEOMETRY - 3D Box Space Diagonal
  (t, k, rand) => {
    // Box dimensions: 6, 8, 24.
    // Space diagonal = sqrt(6^2 + 8^2 + 24^2) = sqrt(36 + 64 + 576) = sqrt(676) = 26.
    const q = `What is the length of the longest rigid metal rod that can fit completely inside a closed rectangular shipping crate with interior dimensions of 6 cm by 8 cm by 24 cm?`;
    const correct = `26 cm`;
    const distractors = [`28 cm`, `25 cm`, `30 cm`, `24.5 cm`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (26 cm)\n\n**Step-by-step Solution:**\n1. Space diagonal formula: \\(d = \\sqrt{L^2 + W^2 + H^2}\\).\n2. \\(d = \\sqrt{6^2 + 8^2 + 24^2} = \\sqrt{36 + 64 + 576} = \\sqrt{676} =\\) **26 cm**.`,
      category: 'math', subType: 'geometry'
    };
  },

  // 62: PROBABILITY - Dependent Marbles Without Replacement
  (t, k, rand) => {
    // 5 red, 7 blue (total 12). Two drawn without replacement.
    // Prob both red = (5/12) * (4/11) = 20 / 132 = 5 / 33.
    const q = `A pouch contains 5 red marbles and 7 blue marbles. If 2 marbles are drawn at random one after another without replacement, what is the probability that both marbles selected are red?`;
    const correct = `5/33`;
    const distractors = [`5/36`, `10/33`, `7/33`, `1/6`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (5/33)\n\n**Step-by-step Solution:**\n1. First marble red: \\(5/12\\).\n2. Second marble red: \\(4/11\\).\n3. Combined probability = \\(\frac{5}{12} \\times \frac{4}{11} = \frac{20}{132} =\\) **5/33**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 63: PROBABILITY - Two Dice Roll
  (t, k, rand) => {
    // Two fair 6-sided dice. Prob sum is at least 10 (sums 10, 11, 12).
    // Sum 10: (4,6), (5,5), (6,4) = 3
    // Sum 11: (5,6), (6,5) = 2
    // Sum 12: (6,6) = 1
    // Total = 6 / 36 = 1/6.
    const q = `When two standard fair six-sided dice are rolled simultaneously, what is the probability that the sum of the numbers rolled is 10 or greater?`;
    const correct = `1/6`;
    const distractors = [`1/4`, `5/36`, `1/9`, `7/36`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (1/6)\n\n**Step-by-step Solution:**\n1. Combinations with sum \\(\ge 10\\): (4,6), (5,5), (6,4), (5,6), (6,5), (6,6) = 6 outcomes.\n2. Probability = \\(6 / 36 =\\) **1/6**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 64: PROBABILITY - At Least One Success Complement
  (t, k, rand) => {
    // Coin tossed 4 times. Probability of getting at least one Head.
    // 1 - P(no heads) = 1 - (1/2)^4 = 1 - 1/16 = 15/16.
    const q = `A fair two-sided coin is flipped 4 times consecutively. What is the probability of observing at least one Head across the 4 flips?`;
    const correct = `15/16`;
    const distractors = [`7/8`, `1/16`, `3/4`, `13/16`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (15/16)\n\n**Step-by-step Solution:**\n1. Complement rule: \\(P(\\ge 1\\text{ Head}) = 1 - P(\\text{All Tails})\\).\n2. \\(P(\\text{All Tails}) = (1/2)^4 = 1/16\\).\n3. Result = \\(1 - 1/16 =\\) **15/16**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 65: STATISTICS - Weighted Average Grade
  (t, k, rand) => {
    // Course grading: Homework 20%, Midterm 30%, Final 50%.
    // Student scores 90 on Homework, 70 on Midterm, 84 on Final.
    // Weighted avg = 0.20*90 + 0.30*70 + 0.50*84 = 18 + 21 + 42 = 81.
    const q = `A university finance course determines final grades using the following weights: Homework assignments account for 20%, the Midterm exam accounts for 30%, and the Final examination accounts for 50%. If a student scores 90% on Homework, 70% on the Midterm, and 84% on the Final, what is their final weighted course average?`;
    const correct = `81.0%`;
    const distractors = [`81.3%`, `78.0%`, `83.5%`, `80.0%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (81.0%)\n\n**Step-by-step Solution:**\n1. Weighted formula: \\(0.20(90) + 0.30(70) + 0.50(84) = 18 + 21 + 42 =\\) **81.0%**.`,
      category: 'math', subType: 'word_problem'
    };
  }
];

export function getMathQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 8191 + 1337);
  const total = MATH_ARCHETYPES.length; // 66 novel archetypes
  const k = testNumber - 2;

  // Stride-based selection ensures every test gets an authentic, varied mix
  // With 66 archetypes and 22 questions per test, each test gets a distinct third of the bank!
  const offset = (k * 22) % total;
  const chosenIndices = [];
  
  for (let i = 0; i < 22; i++) {
    const idx = (offset + i) % total;
    if (!chosenIndices.includes(idx)) {
      chosenIndices.push(idx);
    }
  }

  // If any duplicates, fill sequentially
  for (let i = 0; chosenIndices.length < 22; i++) {
    const idx = (offset + i) % total;
    if (!chosenIndices.includes(idx)) chosenIndices.push(idx);
  }

  const cycle = Math.floor(k / 3);
  const questions = chosenIndices.map((idx) => {
    if (cycle > 0) {
      const variant = getMathVariant(idx, cycle, rand);
      if (variant) return variant;
    }
    return MATH_ARCHETYPES[idx](testNumber, k, rand);
  });

  // Deterministically shuffle within the test
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}
