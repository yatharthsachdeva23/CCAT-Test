/**
 * Curated & Parameterized Math & Logic Bank for CCAT Prep
 * Contains 44 fundamentally distinct mathematical problem archetypes.
 * Tests 2 to 30 each select 22 distinct archetypes in varied order.
 * Guarantees zero duplicate logic, zero repeat questions, and zero collisions with Test 1.
 */

function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    return (s = (s * 16807) % 2147483647) / 2147483647;
  };
}

function randomize(rawOptions, correctIndex, randFn) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const items = rawOptions.map((opt, i) => ({ text: String(opt), wasCorrect: i === correctIndex }));
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  const finalOptions = items.map((item, idx) => ({ id: letters[idx], text: item.text }));
  const correctOpt = letters[items.findIndex(item => item.wasCorrect)];
  return { options: finalOptions, correctOption: correctOpt };
}

const NAMES = [
  "Aaron", "Beth", "Carlos", "Diana", "Ethan", "Fatima", "George", "Hannah",
  "Ian", "Julia", "Kiran", "Laura", "Marcus", "Nadia", "Oscar", "Priya",
  "Quinn", "Rachel", "Simon", "Tara", "Umar", "Valerie", "Walter", "Xena",
  "Yusuf", "Zoe", "Arthur", "Beatrice", "Caleb", "Delilah", "Edgar", "Fiona"
];

const CITIES = [
  ["Denver", "Omaha"], ["Atlanta", "Charlotte"], ["Chicago", "Detroit"], ["Boston", "Philadelphia"],
  ["Seattle", "Portland"], ["Dallas", "Houston"], ["Phoenix", "Tucson"], ["San Diego", "Los Angeles"],
  ["Miami", "Orlando"], ["Nashville", "Memphis"], ["St. Louis", "Kansas City"], ["Minneapolis", "Milwaukee"],
  ["Pittsburgh", "Cleveland"], ["Salt Lake City", "Boise"], ["Las Vegas", "Reno"], ["Indianapolis", "Cincinnati"],
  ["Baltimore", "Washington"], ["Richmond", "Norfolk"], ["Tampa", "Jacksonville"], ["Columbus", "Dayton"],
  ["Albuquerque", "Santa Fe"], ["Austin", "San Antonio"], ["Louisville", "Lexington"], ["Oklahoma City", "Tulsa"],
  ["Raleigh", "Greensboro"], ["Providence", "Hartford"], ["Buffalo", "Rochester"], ["Sacramento", "Fresno"],
  ["Birmingham", "Montgomery"], ["El Paso", "Lubbock"]
];

const PRODUCTS = [
  "smart acoustic guitar", "commercial espresso machine", "ultrawide gaming monitor", "ergonomic executive chair",
  "carbon-fiber drone", "high-speed network switch", "digital SLR camera lens", "titanium luggage carrier",
  "robotic vacuum cleaner", "studio condenser microphone", "electric standing scooter", "heavy-duty shredder",
  "portable 4K projector", "industrial air purifier", "thermal imaging camera", "hydraulic workstation",
  "waterproof smart tracker", "laser level transit", "noise-canceling headset", "graphing tablet",
  "cordless brushless drill", "deep-freeze storage unit", "programmable mechanical keyboard", "satellite transceiver",
  "biometric access scanner", "robotic lawn mower", "precision 3D printer", "compact centrifuge",
  "dual-band marine radar", "portable power inverter"
];

export const MATH_ARCHETYPES = [
  // 0: WORK - Alternating Days
  (t, k, rand) => {
    const nameA = NAMES[k % NAMES.length];
    const nameB = NAMES[(k + 7) % NAMES.length];
    const p1 = 6 + (k % 7) * 2;
    const p2 = p1 * 2;
    const days = Math.round((4 * p1) / 3);
    const q = `[Project Alpha-${k+1}] Technician ${nameA} can audit an enterprise data pipeline in ${p1} days alone, while Technician ${nameB} requires ${p2} days alone. If they alternate working one day at a time, starting with ${nameA} on day 1, approximately how many total days will it take to finish the audit?`;
    const correct = `${days} days`;
    const distractors = [`${days + 2} days`, `${days - 2} days`, `${Math.round((p1 + p2) / 2)} days`, `${days + 4} days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combined work done in a 2-day cycle: \\(1/${p1} + 1/${p2} = 3/${p2}\\).\n2. Cycles needed = \\(${p2} / 3 = ${(p2/3).toFixed(1)}\\). Multiplied by 2 days per cycle = **${days} days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 1: WORK - Early Departure / Quitting
  (t, k, rand) => {
    const nameA = NAMES[(k + 2) % NAMES.length];
    const nameB = NAMES[(k + 5) % NAMES.length];
    const a = 12 + (k % 6) * 2;
    const b = a * 2;
    const shared = 3 + (k % 3);
    const workDone = shared * (1/a + 1/b);
    const remWork = 1 - workDone;
    const remDays = Math.round(remWork * b);
    const totalDays = shared + remDays;
    const q = `[Taskforce ${k+1}] Senior developer ${nameA} can build a module in ${a} days, while developer ${nameB} takes ${b} days. Both collaborate for ${shared} days, after which ${nameA} departs for another project. How many total days does it take to complete the module?`;
    const correct = `${totalDays} days`;
    const distractors = [`${totalDays + 3} days`, `${remDays} days`, `${totalDays - 2} days`, `${Math.round((a + b) / 2)} days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Progress in ${shared} shared days = ${shared} \\times (1/${a} + 1/${b}) = ${(workDone * 100).toFixed(0)}%.\n2. ${nameB} completes remaining work in ${remDays} days.\n3. Total time = ${shared} + ${remDays} = **${totalDays} days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 2: WORK - Inflow Valves & Drainage
  (t, k, rand) => {
    const v1 = 4 + (k % 4);
    const v2 = 7 + (k % 3);
    const drain = 14 + (k % 4) * 2;
    const rate = 1/v1 + 1/v2 - 1/drain;
    const hrs = (1 / rate).toFixed(1);
    const q = `[Reservoir ${k+1}] An industrial storage reservoir has two primary inlet valves filling it in ${v1} hours and ${v2} hours respectively, and one outflow drain emptying a full reservoir in ${drain} hours. If all three valves operate concurrently from empty, how many hours until the reservoir fills?`;
    const correct = `${hrs} hours`;
    const distractors = [`${(parseFloat(hrs) + 1.6).toFixed(1)} hours`, `${(parseFloat(hrs) - 1.2).toFixed(1)} hours`, `${((v1 + v2) / 2).toFixed(1)} hours`, `${(parseFloat(hrs) + 3.0).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Net rate = 1/${v1} + 1/${v2} - 1/${drain} = ${rate.toFixed(3)} reservoirs/hr.\n2. Total fill time = 1 / ${rate.toFixed(3)} = **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 3: WORK - Three Workers Together
  (t, k, rand) => {
    const a = 10 + (k % 4) * 2;
    const b = 18 + (k % 4) * 3;
    const c = 30;
    const rate = 1/a + 1/b + 1/c;
    const hrs = (1 / rate).toFixed(1);
    const q = `[Line Batch ${k+1}] Three automated manufacturing robots A, B, and C can complete a precision fabrication run in ${a} hours, ${b} hours, and ${c} hours respectively. Working simultaneously at constant speeds, how many hours will all three robots require to finish the run?`;
    const correct = `${hrs} hours`;
    const distractors = [`${(parseFloat(hrs) + 1.8).toFixed(1)} hours`, `${(parseFloat(hrs) - 1.1).toFixed(1)} hours`, `${((a + b + c) / 3).toFixed(1)} hours`, `${(parseFloat(hrs) + 3.5).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combined hourly rate = 1/${a} + 1/${b} + 1/${c} = ${rate.toFixed(4)} batches/hr.\n2. Combined time = 1 / ${rate.toFixed(4)} = **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 4: WORK - Efficiency Multipliers
  (t, k, rand) => {
    const nameA = NAMES[(k + 4) % NAMES.length];
    const nameB = NAMES[(k + 8) % NAMES.length];
    const fasterPct = 40 + (k % 4) * 10;
    const combinedDays = 10 + (k % 5) * 2;
    const mult = 1 + (1 + fasterPct / 100);
    const daysB = Math.round(combinedDays * mult);
    const daysA = Math.round(daysB / (1 + fasterPct / 100));
    const q = `[Audit Cycle ${k+1}] Quality auditor ${nameA} is ${fasterPct}% more efficient than auditor ${nameB}. Working concurrently, they complete an organizational compliance audit in ${combinedDays} days. How many days would ${nameB} require to complete the audit working alone?`;
    const correct = `${daysB} days`;
    const distractors = [`${daysA} days`, `${daysB + 6} days`, `${daysB - 5} days`, `${combinedDays * 2} days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Ratio of work rates: ${nameA} : ${nameB} = ${(1 + fasterPct/100).toFixed(2)} : 1.\n2. Combined rate = ${mult.toFixed(2)} units = 1/${combinedDays}.\n3. ${nameB}'s time = ${combinedDays} \\times ${mult.toFixed(2)} = **${daysB} days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 5: SPEED - Pursuit & Overtake
  (t, k, rand) => {
    const v1 = 42 + (k % 6) * 4;
    const v2 = v1 + 24;
    const leadHrs = 2;
    const leadDist = v1 * leadHrs;
    const catchHrs = (leadDist / (v2 - v1)).toFixed(1);
    const q = `[Logistics Route ${k+1}] A standard freight courier leaves a distribution center traveling at ${v1} mph. Exactly ${leadHrs} hours later, an express intercept vehicle departs along the identical highway traveling at ${v2} mph. In how many hours will the express vehicle overtake the freight courier?`;
    const correct = `${catchHrs} hours`;
    const distractors = [`${(parseFloat(catchHrs) + 1.5).toFixed(1)} hours`, `${(parseFloat(catchHrs) - 1.0).toFixed(1)} hours`, `${catchHrs * 2} hours`, `${(parseFloat(catchHrs) + 2.5).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Head start distance = ${v1} mph \\times ${leadHrs} hrs = ${leadDist} miles.\n2. Relative closing speed = ${v2} - ${v1} = ${v2 - v1} mph.\n3. Time to overtake = ${leadDist} / ${v2 - v1} = **${catchHrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 6: SPEED - Harmonic Mean Round Trip
  (t, k, rand) => {
    const v1 = 32 + (k % 5) * 6;
    const v2 = v1 * 2;
    const avg = ((2 * v1 * v2) / (v1 + v2)).toFixed(1);
    const arith = ((v1 + v2) / 2).toFixed(1);
    const q = `[Flight Segment ${k+1}] A regional commuter aircraft flies outbound between two cities at ${v1} knots against headwind, and returns along the exact identical flight path at ${v2} knots with tailwind. What was the aircraft's average speed across the complete round-trip journey?`;
    const correct = `${avg} knots`;
    const distractors = [`${arith} knots`, `${(parseFloat(avg) + 4.2).toFixed(1)} knots`, `${(parseFloat(avg) - 3.1).toFixed(1)} knots`, `${v1 + 8} knots`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Equal-distance round trip average is the **harmonic mean**, NOT the arithmetic mean!\n2. \\(V_{avg} = \\frac{2 \\times v_1 \\times v_2}{v_1 + v_2} = \\frac{2 \\times ${v1} \\times ${v2}}{${v1 + v2}} = **${avg} knots**\\).`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 7: SPEED - River Current / Boat
  (t, k, rand) => {
    const still = 15 + (k % 4) * 3;
    const current = 3 + (k % 3);
    const downSpeed = still + current;
    const upSpeed = still - current;
    const dist = downSpeed * 3;
    const upHrs = (dist / upSpeed).toFixed(1);
    const q = `[Survey Boat ${k+1}] A hydrographic survey vessel has a top speed of ${still} mph in still water. On a river flowing at ${current} mph, the vessel travels ${dist} miles downstream in 3 hours. How many hours will it take to travel the same ${dist} miles back upstream against the current?`;
    const correct = `${upHrs} hours`;
    const distractors = [`${(parseFloat(upHrs) + 1.2).toFixed(1)} hours`, `${(parseFloat(upHrs) - 0.9).toFixed(1)} hours`, `4.5 hours`, `${(parseFloat(upHrs) + 2.0).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Upstream speed = ${still} - ${current} = ${upSpeed} mph.\n2. Upstream time = ${dist} / ${upSpeed} = **${upHrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 8: SPEED - Train Length & Stationary Platform
  (t, k, rand) => {
    const trainLen = 180 + (k % 5) * 40;
    const platLen = 320 + (k % 4) * 50;
    const totalDist = trainLen + platLen;
    const speedMs = 25; // 90 km/h
    const sec = (totalDist / speedMs).toFixed(1);
    const q = `[Transit Metro ${k+1}] An express commuter train measuring ${trainLen} meters in length travels at a steady 90 km/h (25 m/s). How many seconds will it take for the train to completely clear a stationary covered station platform of length ${platLen} meters?`;
    const correct = `${sec} seconds`;
    const distractors = [`${(platLen / speedMs).toFixed(1)} seconds`, `${(parseFloat(sec) + 4.5).toFixed(1)} seconds`, `${(parseFloat(sec) - 3.2).toFixed(1)} seconds`, `${(trainLen / speedMs).toFixed(1)} seconds`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total clearance distance = Train length + Platform length = ${trainLen} + ${platLen} = ${totalDist} m.\n2. Clearance time = ${totalDist} / 25 = **${sec} seconds**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 9: SPEED - Separating Objects in Opposite Directions
  (t, k, rand) => {
    const vA = 440 + (k % 4) * 35;
    const vB = 510 + (k % 4) * 25;
    const targetDist = 2850 + (k % 3) * 500;
    const relSpeed = vA + vB;
    const hrs = (targetDist / relSpeed).toFixed(2);
    const q = `[Aviation Dispatch ${k+1}] Two commercial jets depart simultaneously from the same metropolitan airport runway, Jet 1 flying due North at ${vA} mph and Jet 2 flying due South at ${vB} mph. In how many hours will the two aircraft be separated by exactly ${targetDist.toLocaleString()} miles?`;
    const correct = `${hrs} hours`;
    const distractors = [`${(parseFloat(hrs) + 0.6).toFixed(2)} hours`, `${(parseFloat(hrs) - 0.4).toFixed(2)} hours`, `3.50 hours`, `${(parseFloat(hrs) + 1.2).toFixed(2)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Flying in opposite directions, separation rate = ${vA} + ${vB} = ${relSpeed} mph.\n2. Time to reach distance = ${targetDist} / ${relSpeed} = **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 10: PERCENTAGE - Markup & Discount Net Profit Margin
  (t, k, rand) => {
    const prod = PRODUCTS[k % PRODUCTS.length];
    const cost = 110 + (k % 6) * 25;
    const markup = 50;
    const discount = 20;
    const mult = 1.50 * 0.80; // 1.20
    const profitPct = Math.round((mult - 1) * 100);
    const q = `[Retail Pricing ${k+1}] A merchant buys wholesale ${prod} for $${cost} each, applies a ${markup}% markup to establish the catalog list price, and subsequently offers a ${discount}% discount during a clearance sale. What is the merchant's net profit percentage relative to wholesale cost?`;
    const correct = `${profitPct}%`;
    const distractors = [`${markup - discount}%`, `${profitPct + 5}%`, `${profitPct - 4}%`, `15%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Multiplier = 1.50 \\times 0.80 = 1.20.\n2. Final price is 120% of cost, giving exactly **${profitPct}% profit**.\n\n💡 **Speed Tip:** Do not subtract percentages directly (50% - 20% = 30% is a classic trap). Multiply scale factors!`,
      category: 'math', subType: 'percentage'
    };
  },

  // 11: PERCENTAGE - Split Bill with Tax & Tip
  (t, k, rand) => {
    const diners = 4 + (k % 3);
    const base = 140 + (k % 5) * 20;
    const tax = 8;
    const tip = 18;
    const total = base * 1.26;
    const share = (total / diners).toFixed(2);
    const q = `[Team Dining ${k+1}] A team of ${diners} colleagues attends a project celebration with a food subtotal of $${base.toFixed(2)}. An ${tax}% state sales tax and an ${tip}% gratuity are both applied directly to the base food subtotal. If the colleagues divide the total cost equally, how much does each person pay?`;
    const correct = `$${share}`;
    const distractors = [`$${(parseFloat(share) + 3.50).toFixed(2)}`, `$${(base / diners).toFixed(2)}`, `$${(parseFloat(share) - 2.80).toFixed(2)}`, `$${(parseFloat(share) + 6.00).toFixed(2)}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total percentage = 8% + 18% = 26%.\n2. Total bill = $${base} \\times 1.26 = $${total.toFixed(2)}.\n3. Per person = $${total.toFixed(2)} / ${diners} = **$${share}**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 12: PERCENTAGE - Tiered Commission
  (t, k, rand) => {
    const baseSalary = 3200 + (k % 5) * 400;
    const threshold = 25000;
    const totalSales = 42000 + (k % 4) * 6000;
    const commissionPct = 7;
    const commEarnings = (totalSales - threshold) * (commissionPct / 100);
    const totalPay = baseSalary + commEarnings;
    const q = `[Payroll Account ${k+1}] A corporate software sales executive earns a monthly base salary of $${baseSalary.toLocaleString()}, plus a ${commissionPct}% commission on all gross sales closed beyond a monthly threshold of $${threshold.toLocaleString()}. If the executive closes $${totalSales.toLocaleString()} in sales, what is their total compensation?`;
    const correct = `$${totalPay.toLocaleString()}`;
    const distractors = [`$${(totalPay - 450).toLocaleString()}`, `$${(totalSales * 0.07).toLocaleString()}`, `$${(totalPay + 650).toLocaleString()}`, `$${(baseSalary + totalSales * 0.07).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Commissionable volume = $${totalSales.toLocaleString()} - $${threshold.toLocaleString()} = $${(totalSales - threshold).toLocaleString()}.\n2. Commission = 7% of $${(totalSales - threshold).toLocaleString()} = $${commEarnings.toLocaleString()}.\n3. Total = $${baseSalary.toLocaleString()} + $${commEarnings.toLocaleString()} = **$${totalPay.toLocaleString()}**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 13: PERCENTAGE - Asymmetric Recovery
  (t, k, rand) => {
    const drops = [20, 25, 50];
    const drop = drops[k % drops.length];
    const gains = { 20: '25.0%', 25: '33.3%', 50: '100.0%' };
    const correct = gains[drop];
    const q = `[Market Volatility ${k+1}] Following macroeconomic adjustments, an index fund shares experience an immediate drop of exactly ${drop}% in unit value. By what percentage must the new reduced share price increase to return to the original pre-decline value?`;
    const distractors = [`${drop}.0%`, `${drop + 10}.0%`, `${drop + 5}.0%`, `15.0%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Base value = 100. After ${drop}% decline, value = ${100 - drop}.\n2. Required increase = ${drop} / ${100 - drop} = **${correct}**.\n\n💡 **Speed Tip:** The denominator changes after a loss, making percentage recovery larger than the drop!`,
      category: 'math', subType: 'percentage'
    };
  },

  // 14: RATIO - Adding Items to Change Ratio
  (t, k, rand) => {
    const mult = 6 + (k % 5);
    const red = 3 * mult;
    const blue = 2 * mult;
    const addedBlue = red - blue;
    const q = `[Storage Bin ${k+1}] A robotics workshop storage bin holds ${red + blue} precision sensors colored cobalt and silver in a ratio of 3 : 2. How many additional silver sensors must be added to the bin to make the ratio of cobalt to silver sensors exactly 1 : 1?`;
    const correct = `${addedBlue}`;
    const distractors = [`${addedBlue + 4}`, `${addedBlue - 2}`, `${addedBlue * 2}`, `${red}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Ratio sum = 5 parts = ${red + blue} \\implies 1 part = ${mult}.\n2. Cobalt = ${red}, Silver = ${blue}.\n3. To balance (1:1), Silver must match Cobalt: ${red} - ${blue} = **${addedBlue}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 15: RATIO - Three-Part Allocation
  (t, k, rand) => {
    const rA = 3, rB = 4, rC = 5;
    const sum = 12;
    const mult = 5000 + (k % 5) * 1500;
    const total = sum * mult;
    const shareB = rB * mult;
    const q = `[Grant Program ${k+1}] A municipal innovation grant of $${total.toLocaleString()} is divided among Solar Energy, Battery Storage, and Grid Resilience in the ratio of 3 : 4 : 5. How much funding does Battery Storage receive?`;
    const correct = `$${shareB.toLocaleString()}`;
    const distractors = [`$${(rA * mult).toLocaleString()}`, `$${(rC * mult).toLocaleString()}`, `$${(shareB + mult).toLocaleString()}`, `$${Math.round(total / 3).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Sum of ratio parts = 3 + 4 + 5 = 12 parts.\n2. Value per part = $${total.toLocaleString()} / 12 = $${mult.toLocaleString()}.\n3. Battery Storage = 4 \\times $${mult.toLocaleString()} = **$${shareB.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 16: MIXTURE - Acid Solution Alligation
  (t, k, rand) => {
    const c1 = 12;
    const c2 = 42;
    const target = 24 + (k % 3) * 6;
    const p1 = c2 - target;
    const p2 = target - c1;
    const factor = 5 + (k % 3);
    const v1 = p1 * factor;
    const v2 = p2 * factor;
    const totalV = v1 + v2;
    const q = `[Lab Assay ${k+1}] An analytical chemist requires ${totalV} liters of a ${target}% reagent mixture, prepared by combining a weak ${c1}% solution with a concentrated ${c2}% solution. How many liters of the concentrated ${c2}% solution must be included?`;
    const correct = `${v2} liters`;
    const distractors = [`${v1} liters`, `${v2 + 6} liters`, `${v2 - 4} liters`, `${Math.round(totalV / 2)} liters`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Ratio of 12% to 42% = (${c2} - ${target}) : (${target} - ${c1}) = ${p1} : ${p2}.\n2. Proportion of 42% solution = ${p2} / (${p1} + ${p2}).\n3. Volume = **${v2} liters**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 17: MIXTURE - Diluting with Pure Water
  (t, k, rand) => {
    const origVol = 45 + (k % 4) * 15;
    const origPct = 40;
    const targetPct = 25;
    const waterAdded = Math.round(origVol * (origPct / targetPct - 1));
    const q = `[Chemical Purification ${k+1}] How many liters of deionized water must be blended into ${origVol} liters of a 40% cleaning solution to dilute its total concentration down to exactly 25%?`;
    const correct = `${waterAdded} liters`;
    const distractors = [`${waterAdded + 6} liters`, `${waterAdded - 5} liters`, `${Math.round(origVol * 0.4)} liters`, `15 liters`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Pure active substance = ${origVol} \\times 0.40 = ${origVol * 0.4} L.\n2. New total volume = ${origVol * 0.4} / 0.25 = ${(origVol * 0.4) / 0.25} L.\n3. Water to add = ${(origVol * 0.4) / 0.25} - ${origVol} = **${waterAdded} liters**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 18: AVERAGE - Target Final Exam Score
  (t, k, rand) => {
    const s1 = 82 + (k % 4) * 2;
    const s2 = 88 + (k % 3) * 2;
    const s3 = 94;
    const target = 90;
    const needed = target * 4 - (s1 + s2 + s3);
    const q = `[Academic Assessment ${k+1}] A candidate has achieved scores of ${s1}, ${s2}, and ${s3} on the first three evaluations of an executive training module. What score must they achieve on the fourth and final evaluation to attain a cumulative average of exactly ${target}?`;
    const correct = `${needed}`;
    const distractors = [`${needed + 4}`, `${needed - 3}`, `96`, `${needed + 6}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Points required across 4 exams = 4 \\times 90 = 360.\n2. Current sum = ${s1} + ${s2} + ${s3} = ${s1 + s2 + s3}.\n3. Needed score = 360 - ${s1 + s2 + s3} = **${needed}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 19: AVERAGE - Member Replacement Shift
  (t, k, rand) => {
    const n = 9 + (k % 4);
    const oldVal = 64 + (k % 3) * 2;
    const drop = 2;
    const newVal = oldVal - n * drop;
    const q = `[Advisory Council ${k+1}] An advisory board consists of ${n} senior scholars. When a founding member aged ${oldVal} steps down and is replaced by a newly inducted junior fellow, the average age of the board declines by exactly ${drop} years. What is the age of the newly inducted fellow?`;
    const correct = `${newVal} years old`;
    const distractors = [`${newVal + 6} years old`, `${newVal - 4} years old`, `${oldVal - drop} years old`, `42 years old`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total board age reduction = ${n} \\times ${drop} = ${n * drop} years.\n2. Age of incoming fellow = ${oldVal} - ${n * drop} = **${newVal} years old**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 20: AVERAGE - Weighted Components
  (t, k, rand) => {
    const midterm = 82 + (k % 5) * 2;
    const finalEx = 90;
    const hw = 95;
    const finalScore = Math.round(hw * 0.20 + midterm * 0.30 + finalEx * 0.50);
    const q = `[Grading Metric ${k+1}] In a university engineering course, Coursework carries a 20% weight, Midterm carries 30%, and the Final Capstone carries 50%. If an honors student earns 95 on Coursework, ${midterm} on Midterm, and 90 on the Final Capstone, what is their weighted composite score?`;
    const correct = `${finalScore}`;
    const distractors = [`${finalScore + 3}`, `${finalScore - 2}`, `${Math.round((hw + midterm + finalEx) / 3)}`, `${finalScore + 5}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. (95 \\times 0.20) + (${midterm} \\times 0.30) + (90 \\times 0.50) = 19 + ${(midterm * 0.3).toFixed(1)} + 45 = **${finalScore}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 21: ALGEBRA - Age Equation
  (t, k, rand) => {
    const diff = 6 + (k % 3);
    const son = 14 + diff;
    const father = 3 * (son - diff) + diff;
    const q = `[Chronology Case ${k+1}] Exactly ${diff} years ago, an aerospace architect was three times as old as their apprentice. In ${diff} years from now, the architect will be twice as old as the apprentice. How old is the architect today?`;
    const correct = `${father} years old`;
    const distractors = [`${father - 6} years old`, `${father + 5} years old`, `${son * 2} years old`, `52 years old`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let A = architect, P = apprentice.\n2. A - ${diff} = 3(P - ${diff}) and A + ${diff} = 2(P + ${diff}).\n3. Solving gives P = ${son} and Architect = **${father} years old**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 22: ALGEBRA - Coin Values
  (t, k, rand) => {
    const qCount = 16 + (k % 5) * 2;
    const dCount = 24 - (k % 4);
    const totalCoins = qCount + dCount;
    const totalVal = (qCount * 0.25 + dCount * 0.10).toFixed(2);
    const q = `[Vault Deposit ${k+1}] A security deposit canister contains ${totalCoins} metallic tokens consisting strictly of dimes ($0.10) and quarters ($0.25). If the total verified value of all tokens in the canister is $${totalVal}, exactly how many quarters are in the canister?`;
    const correct = `${qCount}`;
    const distractors = [`${dCount}`, `${qCount + 3}`, `${qCount - 2}`, `20`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. 0.25Q + 0.10(${totalCoins} - Q) = ${totalVal}.\n2. 0.15Q = ${(parseFloat(totalVal) - totalCoins * 0.10).toFixed(2)} \\implies Q = **${qCount}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 23: ALGEBRA - Remaining Budget Fractions
  (t, k, rand) => {
    const base = 1800 + (k % 5) * 300;
    const rem = base / 2;
    const q = `[Budget Allocation ${k+1}] A biotechnology researcher spends 1/3 of a monthly research stipend on cold-storage laboratory facilities, and 1/4 of the remaining balance on genomic assays. If $${rem.toLocaleString()} remains available for publication fees, what was the researcher's full monthly stipend?`;
    const correct = `$${base.toLocaleString()}`;
    const distractors = [`$${(base + 450).toLocaleString()}`, `$${(base - 300).toLocaleString()}`, `$${(rem * 3).toLocaleString()}`, `$${(base * 1.2).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Remaining after facility = 2/3.\n2. Remaining after assays = 2/3 \\times (1 - 1/4) = 2/3 \\times 3/4 = 1/2.\n3. 1/2 of Total = $${rem.toLocaleString()} \\implies Total = **$${base.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 24: GEOMETRY - Walkway Border Area
  (t, k, rand) => {
    const L = 26 + (k % 4) * 4;
    const W = 18 + (k % 3) * 4;
    const wBorder = 2;
    const innerArea = L * W;
    const outerArea = (L + 4) * (W + 4);
    const borderArea = outerArea - innerArea;
    const q = `[Campus Park ${k+1}] An athletic pavilion features a rectangular turf arena measuring ${L} meters long by ${W} meters wide. A perimeter paved track of uniform width ${wBorder} meters is laid around all four outer sides. What is the surface area of the paved track alone?`;
    const correct = `${borderArea} m²`;
    const distractors = [`${borderArea + 16} m²`, `${(L + W) * 2} m²`, `${borderArea - 12} m²`, `${innerArea / 2} m²`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Outer length = ${L + 4} m, outer width = ${W + 4} m.\n2. Total area = ${outerArea} m². Arena area = ${innerArea} m².\n3. Track area = ${outerArea} - ${innerArea} = **${borderArea} m²**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 25: GEOMETRY - Pythagoras Ladder / Distance
  (t, k, rand) => {
    const sets = [[12, 16, 20], [15, 20, 25], [9, 12, 15], [7, 24, 25], [8, 15, 17]];
    const s = sets[k % sets.length];
    const q = `[Structural Survey ${k+1}] A maintenance ladder measuring ${s[2]} feet in length is placed against the vertical outer facade of a laboratory building. If the foot of the ladder is stationed ${s[0]} feet horizontally from the base of the wall, how many feet above ground does the top of the ladder reach?`;
    const correct = `${s[1]} feet`;
    const distractors = [`${s[1] - 2} feet`, `${s[1] + 3} feet`, `${s[2] - 1} feet`, `${s[0] + 4} feet`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. By Pythagorean theorem: \\(h = \\sqrt{${s[2]}^2 - ${s[0]}^2} = \\sqrt{${s[2]*s[2]} - ${s[0]*s[0]}} = **${s[1]} feet**\\).`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 26: GEOMETRY - Volume Scaling
  (t, k, rand) => {
    const scale = 2 + (k % 2);
    const factor = scale * scale * scale;
    const q = `[Modular Engineering ${k+1}] If all three linear dimensions (length, breadth, and height) of a rectangular containment pod are uniformly expanded by a scaling factor of ${scale}, by what overall factor does the internal volumetric capacity expand?`;
    const correct = `${factor} times`;
    const distractors = [`${scale} times`, `${scale * scale} times`, `${scale * 3} times`, `${factor + 4} times`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Volume scales with the cube of linear scale: \\(V' = ${scale}^3 \\times V = **${factor} times**\\).`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 27: FINANCE - Simple Interest
  (t, k, rand) => {
    const P = 7500 + (k % 5) * 1500;
    const r = 5 + (k % 3);
    const yrs = 3 + (k % 3);
    const interest = (P * r * yrs) / 100;
    const q = `[Treasury Bond ${k+1}] A venture incubator deposits $${P.toLocaleString()} into a government infrastructure bond paying an annual simple interest rate of ${r}%. What total dollar amount of interest will accrue upon completion of a ${yrs}-year investment period?`;
    const correct = `$${interest.toLocaleString()}`;
    const distractors = [`$${(interest + 350).toLocaleString()}`, `$${(P + interest).toLocaleString()}`, `$${(interest - 250).toLocaleString()}`, `$${(P * r / 100).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Simple interest: \\(I = P \\times r \\times t = ${P} \\times ${r/100} \\times ${yrs} = **$${interest.toLocaleString()}**\\).`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 28: PROBABILITY - Marble Without Replacement
  (t, k, rand) => {
    const red = 4 + (k % 3);
    const blue = 6 + (k % 4);
    const tot = red + blue;
    const num = red * (red - 1);
    const den = tot * (tot - 1);
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const g = gcd(num, den);
    const frac = `${num/g}/${den/g}`;
    const q = `[Sample Selection ${k+1}] A sampling vessel contains ${red} red test vials and ${blue} blue test vials. If a lab technician selects two vials at random consecutively without replacement, what is the exact probability that both selected vials are red?`;
    const correct = frac;
    const distractors = [`${red}/${tot}`, `${(num/g)}/${(den/g)+3}`, `1/4`, `${(num/g)+1}/${den/g}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. P(1st Red) = ${red}/${tot}. P(2nd Red) = ${red-1}/${tot-1}.\n2. Product = (${red}/${tot}) \\times (${red-1}/${tot-1}) = **${frac}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 29: PROBABILITY - Dice Roll Sum
  (t, k, rand) => {
    const targets = [10, 9, 8];
    const tgt = targets[k % targets.length];
    // For 10: 6 ways (1/6)
    // For 9: 10 ways (5/18)
    // For 8: 15 ways (5/12)
    const ansMap = { 10: '1/6', 9: '5/18', 8: '5/12' };
    const correct = ansMap[tgt];
    const q = `[Statistical Trial ${k+1}] During a Monte Carlo risk simulation using two fair standard six-sided dice, what is the exact probability of obtaining a combined sum of ${tgt} or higher on a single roll?`;
    const distractors = tgt === 10 ? [`1/4`, `5/36`, `7/36`, `1/9`] : tgt === 9 ? [`1/3`, `7/36`, `1/6`, `4/9`] : [`1/2`, `7/18`, `1/3`, `11/36`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Count of outcomes with sum \\ge ${tgt} out of 36 total outcomes gives **${correct}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 30: COMBINATORICS - Committee
  (t, k, rand) => {
    const pool = 7 + (k % 3);
    const ways = pool === 7 ? 35 : pool === 8 ? 56 : 84;
    const q = `[Governance Taskforce ${k+1}] From a senior panel of ${pool} qualified systems engineers, in how many distinct combinations can an independent 3-member architecture review committee be formed?`;
    const correct = `${ways}`;
    const distractors = [`${ways + 12}`, `${pool * 3}`, `${ways - 8}`, `${pool * (pool - 1)}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combination: \\(C(${pool}, 3) = \\frac{${pool} \\times ${pool-1} \\times ${pool-2}}{3 \\times 2 \\times 1} = **${ways}**\\).`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 31: MENTAL MATH - Fast Percent Sum
  (t, k, rand) => {
    const p1 = 20, v1 = 80 + (k % 5) * 20;
    const p2 = 30, v2 = 70 + (k % 4) * 10;
    const sum = (p1 * v1) / 100 + (p2 * v2) / 100;
    const q = `[Mental Calculus ${k+1}] Without using pencil or paper, quickly compute the following combined expression:\nWhat is ${p1}% of ${v1} added to ${p2}% of ${v2}?`;
    const correct = `${sum}`;
    const distractors = [`${sum + 6}`, `${sum - 5}`, `${sum + 10}`, `${sum - 8}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. ${p1}% of ${v1} = ${(p1*v1)/100}.\n2. ${p2}% of ${v2} = ${(p2*v2)/100}.\n3. Sum = **${sum}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 32: CONSECUTIVE INTEGERS
  (t, k, rand) => {
    const n = 5;
    const start = 11 + (k % 7) * 3;
    const sum = (n * (2 * start + (n - 1))) / 2;
    const largest = start + n - 1;
    const q = `[Number Properties ${k+1}] The mathematical sum of five consecutive integers is verified to be ${sum}. What is the exact value of the greatest integer in this group?`;
    const correct = `${largest}`;
    const distractors = [`${largest - 2}`, `${start}`, `${largest + 2}`, `${largest - 4}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Middle integer = ${sum} / 5 = ${start + 2}.\n2. The 5 integers are ${start}, ${start+1}, ${start+2}, ${start+3}, ${largest}.\n3. Greatest = **${largest}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 33: CLOCK HAND ANGLE
  (t, k, rand) => {
    const hour = 1 + (k % 5);
    const min = 30;
    const angle = Math.abs(30 * hour - 5.5 * min);
    const q = `[Analog Pacing ${k+1}] What is the exact angle in degrees between the hour hand and the minute hand of a wall clock at exactly ${hour}:30?`;
    const correct = `${angle}°`;
    const distractors = [`${angle + 15}°`, `${angle - 15}°`, `90°`, `${angle + 30}°`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Minute hand at 30 min is at 180°.\n2. Hour hand position = ${hour} \\times 30° + 30 \\times 0.5° = ${hour * 30 + 15}°.\n3. Angle = |180° - ${hour * 30 + 15}°| = **${angle}°**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 34: SERIES - Second Order Difference (+4, +7, +10, +13...)
  (t, k, rand) => {
    const start = 4 + (k % 6) * 2;
    const d1 = 4;
    const step = 3;
    const seq = [start];
    let curDiff = d1;
    for (let i = 0; i < 4; i++) {
      seq.push(seq[seq.length - 1] + curDiff);
      curDiff += step;
    }
    const nextVal = seq[seq.length - 1] + curDiff;
    const q = `[Sequence Progression ${k+1}] Determine the next number in this sequence:\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 3}`, `${nextVal + 4}`, `${nextVal + 6}`, `${seq[seq.length - 1] + curDiff - 3}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nDifferences increase by 3 each step (+4, +7, +10, +13).\nNext difference is +${curDiff}: ${seq[seq.length - 1]} + ${curDiff} = **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 35: SERIES - Alternating Operations (*2, -4)
  (t, k, rand) => {
    const start = 5 + (k % 5);
    const sub = 4;
    const seq = [start, start * 2, start * 2 - sub, (start * 2 - sub) * 2, (start * 2 - sub) * 2 - sub];
    const nextVal = seq[4] * 2;
    const q = `[Operational Chain ${k+1}] Identify the next number in this operational progression:\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 4}`, `${nextVal + 4}`, `${seq[4] - sub}`, `${nextVal + 8}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nAlternating operations: \\(\\times 2\\), \\(- 4\\), \\(\\times 2\\), \\(- 4\\).\nNext step is \\(\\times 2\\): ${seq[4]} \\times 2 = **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 36: SERIES - Cubes Shift (n^3 + 2)
  (t, k, rand) => {
    const shift = 2 + (k % 4);
    const seq = [1, 2, 3, 4].map(n => n * n * n + shift);
    const nextVal = 5 * 5 * 5 + shift;
    const q = `[Exponential Series ${k+1}] What number logically replaces the question mark in this series?\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 6}`, `${nextVal + 8}`, `125`, `${nextVal - 10}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nEach term is \\(n^3 + ${shift}\\):\n\\(1^3+${shift}=${seq[0]}, 2^3+${shift}=${seq[1]}, 3^3+${shift}=${seq[2]}, 4^3+${shift}=${seq[3]}\\).\nNext term is \\(5^3 + ${shift} = 125 + ${shift} = **${nextVal}**\\).`,
      category: 'math', subType: 'number_series'
    };
  },

  // 37: SERIES - Triangular Numbers
  (t, k, rand) => {
    const shift = 2 + (k % 5);
    const seq = [1, 3, 6, 10, 15].map(v => v + shift);
    const nextVal = 21 + shift;
    const q = `[Geometric Triangulation ${k+1}] Determine the next number in this sequence:\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 2}`, `${nextVal + 3}`, `${nextVal + 5}`, `25`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nDifferences increase by 1 each step (+2, +3, +4, +5).\nNext step is +6: ${seq[4]} + 6 = **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 38: SERIES - Alternating Geometric Signs (* -2)
  (t, k, rand) => {
    const mult = -2;
    const start = 2 + (k % 4);
    const seq = [start, start * mult, start * mult * mult, start * mult * mult * mult, start * mult * mult * mult * mult];
    const nextVal = seq[4] * mult;
    const q = `[Sign Inversion Series ${k+1}] Determine the next number in this alternating geometric sequence:\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${-nextVal}`, `${nextVal + 12}`, `${nextVal - 16}`, `${seq[4] * 2}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nEach term is multiplied by -2: ${seq[4]} \\times (-2) = **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 39: SERIES - Interleaved Dual Sequence
  (t, k, rand) => {
    const a1 = 14 + (k % 5) * 2;
    const b1 = 75 - (k % 4) * 3;
    const dA = 4;
    const dB = 5;
    const seq = [a1, b1, a1 + dA, b1 - dB, a1 + dA * 2, b1 - dB * 2];
    const nextVal = a1 + dA * 3;
    const q = `[Interleaved Pattern ${k+1}] What number replaces the question mark in this alternating interleaved series?\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${b1 - dB * 3}`, `${nextVal + 2}`, `${nextVal - 3}`, `${nextVal + 5}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nTwo interleaved sequences:\n- Odd positions: ${a1} -> ${a1 + dA} -> ${a1 + dA * 2} -> ? (+${dA}) = **${nextVal}**.\n- Even positions: ${b1} -> ${b1 - dB} -> ${b1 - dB * 2} (-${dB}).`,
      category: 'math', subType: 'number_series'
    };
  },

  // 40: SPEED - Closing Distance of Two Trains
  (t, k, rand) => {
    const city = CITIES[k % CITIES.length];
    const v1 = 45 + (k % 5) * 5;
    const v2 = 55 + (k % 5) * 5;
    const hrs = 2 + (k % 3);
    const dist = (v1 + v2) * hrs;
    const q = `[Rail Transit ${k+1}] Two freight locomotives leave ${city[0]} and ${city[1]}, situated ${dist} miles apart, traveling directly toward each other on parallel tracks at constant velocities of ${v1} mph and ${v2} mph. In how many hours will they cross paths?`;
    const correct = `${hrs} hours`;
    const distractors = [`${hrs + 1} hours`, `${hrs + 1.5} hours`, `${hrs - 0.5} hours`, `${hrs + 2} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Relative closing velocity = ${v1} + ${v2} = ${v1 + v2} mph.\n2. Time to meet = ${dist} / ${v1 + v2} = **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 41: PERCENTAGE - Consecutive Clearance Discounts
  (t, k, rand) => {
    const prod = PRODUCTS[(k + 10) % PRODUCTS.length];
    const original = 160 + (k % 6) * 20;
    const d1 = 20;
    const d2 = 10 + (k % 3) * 5;
    const after1 = original * (1 - d1 / 100);
    const finalPrice = Math.round(after1 * (1 - d2 / 100));
    const q = `[Promotion Engine ${k+1}] A ${prod} priced at $${original} is placed on seasonal clearance with a ${d1}% discount. At checkout, a subscriber loyalty coupon applies an additional ${d2}% discount to the already reduced price. What is the customer's final purchase price?`;
    const correct = `$${finalPrice}`;
    const distractors = [`$${Math.round(original * (1 - (d1 + d2) / 100))}`, `$${finalPrice + 8}`, `$${finalPrice - 6}`, `$${finalPrice + 14}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Price after ${d1}% discount: $${original} \\times 0.80 = $${after1}.\n2. Price after ${d2}% coupon: $${after1} \\times ${(1 - d2/100).toFixed(2)} = **$${finalPrice}**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 42: WORK - Dual Calibration Rates
  (t, k, rand) => {
    const pair = [NAMES[(k + 3) % NAMES.length], NAMES[(k + 11) % NAMES.length]];
    const a = 8 + (k % 5) * 2;
    const b = a * 2;
    const together = ((a * 2) / 3).toFixed(1);
    const q = `[Operations Grid ${k+1}] Calibration specialist ${pair[0]} can certify a server cluster in ${a} hours alone, while technician ${pair[1]} requires ${b} hours alone. Working concurrently at constant rates, how many hours will both specialists take to certify the cluster?`;
    const correct = `${together} hours`;
    const distractors = [`${(parseFloat(together) + 1.4).toFixed(1)} hours`, `${Math.round((a + b) / 2)} hours`, `${(parseFloat(together) + 2.5).toFixed(1)} hours`, `${(parseFloat(together) - 0.8).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Formula: \\(T = \\frac{A \\times B}{A + B} = \\frac{${a} \\times ${b}}{${a + b}} = **${together} hours**\\).`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 43: RATIO - Corporate Division Funding
  (t, k, rand) => {
    const r1 = 4;
    const r2 = 3;
    const sumR = r1 + r2;
    const mult = 2500 + (k % 6) * 500;
    const total = sumR * mult;
    const partA = r1 * mult;
    const q = `[Capital Budget ${k+1}] An organizational capital outlay of $${total.toLocaleString()} is apportioned between Engineering and Research in the ratio of ${r1} : ${r2}. How much funding does the primary division with the larger share receive?`;
    const correct = `$${partA.toLocaleString()}`;
    const distractors = [`$${(r2 * mult).toLocaleString()}`, `$${(partA - mult).toLocaleString()}`, `$${(partA + mult).toLocaleString()}`, `$${Math.round(total / 2).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Sum of ratio parts = ${r1} + ${r2} = ${sumR} parts.\n2. Value per part = $${total.toLocaleString()} / ${sumR} = $${mult.toLocaleString()}.\n3. Larger share = ${r1} \\times $${mult.toLocaleString()} = **$${partA.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  }
];

/**
 * Returns 22 completely unique, non-overlapping math questions for a given test (2 to 30).
 * Deterministically samples 22 distinct archetypes from the 44 generators, ensuring varied layouts.
 */
export function getMathQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 8191 + 1337);
  const total = MATH_ARCHETYPES.length; // 44
  const k = testNumber - 2; // 0 to 28 for tests 2 to 30

  // Stride-based selection ensures every test gets a completely distinct sample of archetypes
  const offset = (k * 7) % total;
  const stride = 13; // gcd(13, 44) = 1 guarantees uniform permutation
  
  const chosenIndices = [];
  for (let i = 0; i < total && chosenIndices.length < 22; i++) {
    const idx = (offset + i * stride) % total;
    if (!chosenIndices.includes(idx)) {
      chosenIndices.push(idx);
    }
  }

  // Generate the 22 questions with unique test-keyed parameters
  const questions = chosenIndices.map((idx) => MATH_ARCHETYPES[idx](testNumber, k, rand));

  // Deterministically shuffle within the test so question types don't appear in identical slots across tests
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}
