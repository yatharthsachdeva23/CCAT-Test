/**
 * Curated & Parameterized Math & Logic Bank for CCAT Prep
 * Generates 22 completely unique, non-overlapping math questions for each test (2 to 30).
 * Total: 29 * 22 = 638 unique math questions with detailed speed tips and explanations.
 * Zero duplicate questions between any test.
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

export function getMathQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 6173 + 1999);
  const questions = [];
  const t = testNumber;
  const k = testNumber - 2; // 0 to 28 for tests 2 to 30

  // 1. Speed, Distance & Time (Unique city pairs & speeds)
  (() => {
    const CITY_PAIRS = [
      ["Denver", "Omaha"], ["Atlanta", "Charlotte"], ["Chicago", "Detroit"], ["Boston", "Philadelphia"],
      ["Seattle", "Portland"], ["Dallas", "Houston"], ["Phoenix", "Tucson"], ["San Diego", "Los Angeles"],
      ["Miami", "Orlando"], ["Nashville", "Memphis"], ["St. Louis", "Kansas City"], ["Minneapolis", "Milwaukee"],
      ["Pittsburgh", "Cleveland"], ["Salt Lake City", "Boise"], ["Las Vegas", "Reno"], ["Indianapolis", "Cincinnati"],
      ["Baltimore", "Washington"], ["Richmond", "Norfolk"], ["Tampa", "Jacksonville"], ["Columbus", "Dayton"],
      ["Albuquerque", "Santa Fe"], ["Austin", "San Antonio"], ["Louisville", "Lexington"], ["Oklahoma City", "Tulsa"],
      ["Raleigh", "Greensboro"], ["Providence", "Hartford"], ["Buffalo", "Rochester"], ["Sacramento", "Fresno"],
      ["Birmingham", "Montgomery"]
    ];
    const cities = CITY_PAIRS[k % CITY_PAIRS.length];
    const v1 = 40 + k;
    const v2 = 50 + k;
    const hours = 2 + (k % 3);
    const totalDist = (v1 + v2) * hours;
    const q = `Two freight trains leave ${cities[0]} and ${cities[1]}, located ${totalDist} miles apart, traveling toward each other on parallel tracks. Train 1 travels at ${v1} mph and Train 2 travels at ${v2} mph. In how many hours will they pass each other?`;
    const correct = `${hours} hours`;
    const distractors = [`${hours + 1} hours`, `${hours + 1.5} hours`, `${hours - 0.5} hours`, `${hours + 2} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Relative closing speed = ${v1} + ${v2} = ${v1 + v2} mph.\n2. Time to meet = Total Distance / Relative Speed = ${totalDist} / ${v1 + v2} = **${hours} hours**.\n\n💡 **Speed Tip:** When objects move toward each other, add speeds together immediately.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 2. Work & Rates (Unique technician pairs & calibration times)
  (() => {
    const TECH_PAIRS = [
      ["Carlos", "Daniel"], ["Elena", "Fatima"], ["George", "Henry"], ["Iris", "Jack"],
      ["Kiran", "Liam"], ["Maya", "Noah"], ["Olivia", "Priya"], ["Quinn", "Riley"],
      ["Sophia", "Tyler"], ["Uma", "Victor"], ["Wendy", "Xavier"], ["Yusuf", "Zoe"],
      ["Arthur", "Beatrice"], ["Clara", "David"], ["Edgar", "Fiona"], ["Gabriel", "Hannah"],
      ["Ian", "Julia"], ["Kevin", "Laura"], ["Marcus", "Nora"], ["Oscar", "Penelope"],
      ["Roland", "Samantha"], ["Simon", "Theresa"], ["Vincent", "Walter"], ["Zachary", "Abigail"],
      ["Benjamin", "Chloe"], ["Dominic", "Evelyn"], ["Felix", "Grace"], ["Harrison", "Isabel"],
      ["Lucas", "Mila"]
    ];
    const pair = TECH_PAIRS[k % TECH_PAIRS.length];
    const a = 6 + (k % 6) * 3; // e.g. 6, 9, 12, 15, 18, 21
    const b = a * 2;
    const together = (a * 2) / 3; // clean integer or half
    const q = `Senior technician ${pair[0]} can calibrate a quantum server rack in ${a} hours, while technician ${pair[1]} requires ${b} hours for the identical task. Working concurrently at constant rates, how many hours will both technicians take to complete the calibration?`;
    const correct = `${together} hours`;
    const distractors = [`${together + 1} hours`, `${Math.round((a + b) / 2)} hours`, `${together + 2} hours`, `${together > 1 ? together - 1 : together + 3} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Formula: \\(T = \\frac{A \\times B}{A + B}\\).\n2. Since one worker is twice as fast as the other, combined time is \\(2/3 \\times A = 2/3 \\times ${a} = ${together}\\).\n\n💡 **Speed Tip:** When worker B takes double worker A's time, combined time is always two-thirds of worker A's time!`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 3. Consecutive Percentage Discounts
  (() => {
    const PRODUCTS = [
      "leather briefcase", "ergonomic office desk", "noise-canceling headset", "carbon-fiber road bike",
      "ultrawide monitor", "commercial espresso machine", "tailored cashmere suit", "smart security camera",
      "laser printer system", "acoustic guitar", "drone with 4K gimbal", "standing desk converter",
      "mechanical gaming keyboard", "waterproof smart watch", "portable power station", "ceramic cookware set",
      "high-speed network switch", "graphing workstation tablet", "solid-state drive enclosure", "cordless drill kit",
      "air purifier tower", "digital SLR camera lens", "titanium luggage carrier", "robotic vacuum cleaner",
      "studio condenser microphone", "electric standing scooter", "heavy-duty paper shredder", "portable projector system",
      "conference room speakerphone"
    ];
    const product = PRODUCTS[k % PRODUCTS.length];
    const original = 150 + k * 10;
    const d1 = 20;
    const d2 = 10 + (k % 4) * 5;
    const after1 = original * (1 - d1 / 100);
    const finalPrice = Math.round(after1 * (1 - d2 / 100));
    const q = `A ${product} originally priced at $${original} is placed on clearance with a ${d1}% discount. At checkout, an additional ${d2}% coupon is applied to the discounted price. What is the final price of the ${product}?`;
    const correct = `$${finalPrice}`;
    const wrongLinear = `$${Math.round(original * (1 - (d1 + d2) / 100))}`;
    const distractors = [wrongLinear, `$${finalPrice + 8}`, `$${finalPrice - 6}`, `$${finalPrice + 14}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Price after ${d1}% discount: $${original} \\times 0.80 = $${after1}.\n2. Price after additional ${d2}% coupon: $${after1} \\times ${(1 - d2/100).toFixed(2)} = $${finalPrice}.\n\n💡 **Speed Tip:** Multiply discount factors directly: ${original} \\times 0.80 \\times ${(1 - d2/100).toFixed(2)} = $${finalPrice}.`,
      category: 'math',
      subType: 'percentage'
    });
  })();

  // 4. Ratio & Proportion (Unique corporate divisions & profits)
  (() => {
    const DIVISIONS = [
      "Logistics and R&D", "Marketing and Engineering", "Product and Operations", "Sales and Client Services",
      "Hardware and Software", "Analytics and Infrastructure", "Strategy and Communications", "Human Resources and Legal",
      "Design and Quality Assurance", "Procurement and Warehousing", "Customer Success and IT", "Finance and Compliance",
      "Mobile and Cloud Systems", "Security and DevOps", "Branding and Public Relations", "Field Operations and Training",
      "Supply Chain and Fleet", "Research and Development Alpha", "Platform and Core Services", "Enterprise and Consumer Growth",
      "Data Science and AI Ethics", "Robotics and Automation", "Biotech and Clinical Trials", "Renewable Energy and Grid",
      "Satellite Telecom and Ground", "E-commerce and Fulfillment", "Fintech and Payment Gateways", "Healthcare and Telemedicine",
      "Autonomous Systems and Sensors"
    ];
    const pair = DIVISIONS[k % DIVISIONS.length];
    const r1 = 3 + (k % 4);
    const r2 = 2 + (k % 3);
    const sumR = r1 + r2;
    const mult = 1000 + k * 150;
    const total = sumR * mult;
    const partA = r1 * mult;
    const partB = r2 * mult;
    const q = `A quarterly operational budget of $${total.toLocaleString()} is allocated between ${pair} in the ratio of ${r1} : ${r2}. How much funding does the primary division with the larger share receive?`;
    const correct = `$${partA.toLocaleString()}`;
    const distractors = [`$${partB.toLocaleString()}`, `$${(partA - mult).toLocaleString()}`, `$${(partA + mult).toLocaleString()}`, `$${Math.round(total / 2).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total parts in ratio = ${r1} + ${r2} = ${sumR}.\n2. Value per part = $${total} / ${sumR} = $${mult}.\n3. Larger share (${r1} parts) = ${r1} \\times $${mult} = **$${partA.toLocaleString()}**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 5. Variable Step Series (Unique start and step for each test)
  (() => {
    const start = 10 + k * 3;
    const baseStep = 2 + (k % 4);
    const stepInc = 2;
    const s1 = start;
    const s2 = s1 + baseStep;
    const s3 = s2 + (baseStep + stepInc);
    const s4 = s3 + (baseStep + stepInc * 2);
    const s5 = s4 + (baseStep + stepInc * 3);
    const nextVal = s5 + (baseStep + stepInc * 4);
    const q = `What is the next number in this sequence?\n${s1}, ${s2}, ${s3}, ${s4}, ${s5}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 2}`, `${nextVal + 2}`, `${nextVal + 4}`, `${s5 + (baseStep + stepInc * 3)}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nConsecutive differences increase by 2 each time: +${baseStep}, +${baseStep + 2}, +${baseStep + 4}, +${baseStep + 6}.\nThe next step is +${baseStep + 8}: ${s5} + ${baseStep + 8} = **${nextVal}**.`,
      category: 'math',
      subType: 'number_series'
    });
  })();

  // 6. Multiplicative Series: 2x - C (Unique start for each test)
  (() => {
    const s1 = 3 + k;
    const sub = 1 + (k % 3);
    const s2 = s1 * 2 - sub;
    const s3 = s2 * 2 - sub;
    const s4 = s3 * 2 - sub;
    const s5 = s4 * 2 - sub;
    const nextVal = s5 * 2 - sub;
    const q = `Determine the next number in this progression:\n${s1}, ${s2}, ${s3}, ${s4}, ${s5}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 3}`, `${nextVal + 4}`, `${s5 * 2}`, `${nextVal - 1}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nEach term is multiplied by 2 and then subtracted by ${sub}: \\(${s5} \\times 2 - ${sub} = ${nextVal}\\).`,
      category: 'math',
      subType: 'number_series'
    });
  })();

  // 7. Alternating Dual Interleaved Series (Unique starting values)
  (() => {
    const a1 = 12 + k * 2;
    const b1 = 70 + k * 3;
    const dA = 3;
    const dB = 4;
    const seq = [a1, b1, a1 + dA, b1 - dB, a1 + dA * 2, b1 - dB * 2];
    const nextVal = a1 + dA * 3;
    const q = `What number replaces the question mark in this alternating sequence?\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${b1 - dB * 3}`, `${nextVal + 1}`, `${nextVal - 2}`, `${nextVal + 3}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nTwo interleaved sequences:\n- Odd terms (1st, 3rd, 5th, 7th): ${a1} -> ${a1 + dA} -> ${a1 + dA * 2} -> ? (+${dA}) = **${nextVal}**.\n- Even terms: ${b1} -> ${b1 - dB} -> ${b1 - dB * 2} (-${dB}).`,
      category: 'math',
      subType: 'number_series'
    });
  })();

  // 8. Squares Shift Series: n^2 + Shift
  (() => {
    const shift = 5 + k * 2;
    const seq = [1*1 + shift, 2*2 + shift, 3*3 + shift, 4*4 + shift, 5*5 + shift];
    const nextVal = 6*6 + shift;
    const q = `Identify the next number in this mathematical series:\n${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 4}`, `${nextVal + 5}`, `${36}`, `${nextVal + 10}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nFormula is \\(n^2 + ${shift}\\):\n- 1st: \\(1^2 + ${shift} = ${seq[0]}\\)\n- 2nd: \\(2^2 + ${shift} = ${seq[1]}\\)\n- 5th: \\(5^2 + ${shift} = ${seq[4]}\\)\n- Next (6th): \\(6^2 + ${shift} = 36 + ${shift} = **${nextVal}**\\).`,
      category: 'math',
      subType: 'number_series'
    });
  })();

  // 9. Linear Algebra Equation
  (() => {
    const x = 5 + k;
    const coeff1 = 4;
    const coeff2 = 2;
    const diffCoeff = coeff1 - coeff2; // 2
    const const2 = 20 + k;
    const const1 = const2 - diffCoeff * x;
    const q = `If ${coeff1} times a number ${const1 >= 0 ? '+ ' + const1 : '- ' + Math.abs(const1)} is equal to ${coeff2} times the number + ${const2}, what is the number?`;
    const correct = `${x}`;
    const distractors = [`${x + 2}`, `${x - 2}`, `${x + 4}`, `${x - 1}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Equation: \\(${coeff1}x ${const1 >= 0 ? '+ ' + const1 : '- ' + Math.abs(const1)} = ${coeff2}x + ${const2}\\).\n2. Rearrange: \\(${diffCoeff}x = ${const2 - const1}\\).\n3. \\(x = ${x}\\).`,
      category: 'math',
      subType: 'algebra'
    });
  })();

  // 10. Consecutive Integers Sum
  (() => {
    const first = 11 + k * 2;
    const numbers = [first, first + 2, first + 4, first + 6, first + 8];
    const sum = numbers.reduce((a, b) => a + b, 0);
    const maxVal = numbers[4];
    const q = `The sum of 5 consecutive odd integers is ${sum}. What is the value of the greatest of these integers?`;
    const correct = `${maxVal}`;
    const distractors = [`${first}`, `${numbers[2]}`, `${maxVal + 2}`, `${maxVal - 2}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. The middle (3rd) integer is the average: ${sum} / 5 = ${numbers[2]}.\n2. The greatest integer is the 5th: ${numbers[2]} + 4 = **${maxVal}**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 11. Simple Interest (Unique principals)
  (() => {
    const P = 2000 + k * 250;
    const r = 4 + (k % 5);
    const years = 3;
    const interest = (P * r * years) / 100;
    const totalAmount = P + interest;
    const q = `An institutional investor deposits $${P.toLocaleString()} into a commercial trust earning ${r}% simple annual interest. What will be the total balance of the account after ${years} years if no withdrawals are made?`;
    const correct = `$${totalAmount.toLocaleString()}`;
    const distractors = [`$${interest.toLocaleString()}`, `$${(totalAmount + 150).toLocaleString()}`, `$${(totalAmount - 100).toLocaleString()}`, `$${(P + interest * 1.5).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Interest = Principal \\times Rate \\times Time = $${P} \\times ${r/100} \\times ${years} = $${interest}.\n2. Total Balance = $${P} + $${interest} = **$${totalAmount.toLocaleString()}**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 12. Exam Score Target Average (Unique candidate names & scores)
  (() => {
    const CANDIDATES = [
      "Alex", "Bianca", "Carlos", "Daphne", "Ethan", "Freja", "Gavin", "Helena",
      "Isaac", "Jocelyn", "Kai", "Leila", "Miles", "Nadia", "Owen", "Paige",
      "Quentin", "Rosa", "Soren", "Talia", "Uri", "Valerie", "Wyatt", "Ximena",
      "Yosef", "Zara", "Beckett", "Celine", "Declan"
    ];
    const name = CANDIDATES[k % CANDIDATES.length];
    const target = 82 + (k % 8);
    const s1 = target - 4 + (k % 3);
    const s2 = target + 5 - (k % 4);
    const s3 = target - 6 + (k % 5);
    const s4 = target + 3;
    const currentSum = s1 + s2 + s3 + s4;
    const requiredTotal = target * 5;
    const needed = requiredTotal - currentSum;
    const q = `An analyst candidate named ${name} scored ${s1}, ${s2}, ${s3}, and ${s4} on their first 4 aptitude test modules. What score must ${name} achieve on the 5th module to attain an overall target average of ${target}?`;
    const correct = `${needed}`;
    const distractors = [`${needed + 4}`, `${needed - 5}`, `${target}`, `${needed + 8}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total points required = 5 \\times ${target} = ${requiredTotal}.\n2. Sum of first 4 tests = ${currentSum}.\n3. Score needed on 5th test = ${requiredTotal} - ${currentSum} = **${needed}**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 13. Fraction of Remainder (Unique companies)
  (() => {
    const COMPANIES = [
      "AcroCorp", "BioSphere Ltd", "CyberDynamics", "DataFlow Inc", "EcoPower Systems",
      "Frontier Logistics", "GlobalMedia", "Hyperion Analytics", "InnoTech Labs", "Jupiter Cloud",
      "Kinetic Robotics", "Luminary Health", "Matrix Security", "Nexus Telecom", "OmniGlobal",
      "Pinnacle Capital", "QuantumEdge", "Radiant Energy", "Strata Networks", "Titan Heavy Industries",
      "Unity BioTech", "Vanguard Aerospace", "Waveform Software", "Xenon Microsystems", "YieldMax Capital",
      "Zephyr CleanTech", "Apex Semiconductor", "Bluefin Marine", "Crestview Media"
    ];
    const comp = COMPANIES[k % COMPANIES.length];
    const total = 60000 + k * 6000;
    const rem = (total * 5) / 12;
    const q = `A corporation named ${comp} allocates 1/3 of its quarterly revenue to facility leases and 1/4 of its total revenue to operational software. If the remaining unallocated balance is $${rem.toLocaleString()}, what was the company's total quarterly revenue?`;
    const correct = `$${total.toLocaleString()}`;
    const distractors = [`$${(total - 12000).toLocaleString()}`, `$${(total + 15000).toLocaleString()}`, `$${(rem * 2).toLocaleString()}`, `$${(total + 24000).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Fraction spent = 1/3 + 1/4 = 4/12 + 3/12 = 7/12.\n2. Remaining fraction = 1 - 7/12 = 5/12.\n3. Total = $${rem.toLocaleString()} \\times 12 / 5 = **$${total.toLocaleString()}**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 14. Age Relationship
  (() => {
    const sonNow = 8 + k;
    const mult = 3;
    const fatherNow = sonNow * mult;
    const years = 10;
    const futureSum = (fatherNow + years) + (sonNow + years);
    const q = `A senior partner is currently ${mult} times as old as an apprentice associate. In ${years} years, the sum of their ages will be ${futureSum}. What is the senior partner's current age?`;
    const correct = `${fatherNow} years`;
    const distractors = [`${sonNow} years`, `${fatherNow - 6} years`, `${fatherNow + 6} years`, `${fatherNow + 10} years`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let apprentice's age = \\(s\\). Partner's age = \\(3s\\).\n2. In ${years} years: \\((s + ${years}) + (3s + ${years}) = 4s + ${years * 2} = ${futureSum}\\).\n3. \\(4s = ${fatherNow + sonNow}\\); \\(s = ${sonNow}\\).\n4. Senior partner's age = 3 \\times ${sonNow} = **${fatherNow} years**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 15. Unit Pricing / Simultaneous Linear (Unique office supply pairings)
  (() => {
    const ITEMS = [
      ["stylus pens", "smart notebooks"], ["HDMI cables", "USB-C adapters"], ["LED desk lamps", "surge protectors"],
      ["wireless mice", "mechanical keypads"], ["dry-erase markers", "magnetic whiteboards"], ["graphing calculators", "geometry rulers"],
      ["hardcover journals", "fountain pens"], ["compact flash drives", "SD card readers"], ["ergonomic wrist rests", "laptop cooling stands"],
      ["webcam covers", "microphone pop filters"], ["clip-on spotlights", "tripod phone mounts"], ["rechargeable batteries", "fast charging docks"],
      ["acoustic foam tiles", "mounting strips"], ["sticky note pads", "heavy-duty staplers"], ["label maker cassettes", "thermal printing tape"],
      ["cat-6 ethernet cables", "cable management clips"], ["correction fluid bottles", "precision craft knives"], ["highlighter markers", "spiral bound notebooks"],
      ["canvas tote bags", "reusable water bottles"], ["anti-glare screen protectors", "microfiber cloths"], ["presentation clickers", "laser pointer remotes"],
      ["headphone splitters", "audio jack cables"], ["badge lanyards", "ID card holders"], ["portable document scanners", "storage clipboards"],
      ["desk organizers", "mesh pencil holders"], ["filing folders", "box file storage cases"], ["sticky indexing tabs", "ballpoint ink refills"],
      ["rubber stamps", "stamp ink pads"], ["compact desktop fans", "mini humidifiers"]
    ];
    const pair = ITEMS[k % ITEMS.length];
    const p1 = 3 + (k % 4);
    const p2 = 8 + (k % 5);
    const cost1 = 3 * p1 + 2 * p2;
    const cost2 = 2 * p1 + 4 * p2;
    const q = `At an equipment depot, 3 ${pair[0]} and 2 ${pair[1]} cost $${cost1}. Meanwhile, 2 ${pair[0]} and 4 ${pair[1]} cost $${cost2}. What is the price of a single ${pair[1]}?`;
    const correct = `$${p2}`;
    const distractors = [`$${p1}`, `$${p2 + 2}`, `$${p2 - 1}`, `$${p2 + 3}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Eq 1: \\(3A + 2B = ${cost1}\\)\n2. Eq 2: \\(2A + 4B = ${cost2}\\)\n3. Double Eq 1: \\(6A + 4B = ${cost1 * 2}\\)\n4. Subtract Eq 2: \\(4A = ${cost1 * 2 - cost2}\\); \\(A = $${p1}\\).\n5. \\(B = ${p2}\\).`,
      category: 'math',
      subType: 'algebra'
    });
  })();

  // 16. Probability (Unique drawing containers & token colors)
  (() => {
    const CONTAINERS = [
      "conference raffle box", "charity lottery drum", "executive gift basket", "training workshop prize urn",
      "annual gala prize pouch", "fundraiser ticket bin", "hackathon grab bag", "tech expo giveaway box",
      "alumni lottery bowl", "corporate seminar tumbler", "championship prize chest", "symposium lottery drum",
      "student council ballot box", "boardroom drawing cylinder", "campus raffle container", "festival ticket canister",
      "convention grab box", "forum giveaway drum", "departmental prize urn", "club raffle bucket",
      "society lottery sack", "retreat prize container", "summit giveaway vessel", "institute drawing drum",
      "assembly raffle crate", "league lottery barrel", "meetup gift tumbler", "expo drawing chest",
      "gala ticket urn"
    ];
    const cont = CONTAINERS[k % CONTAINERS.length];
    const red = 3 + (k % 5);
    const blue = 5 + ((k + 1) % 6);
    const green = 4 + ((k + 2) % 5);
    const total = red + blue + green;
    const favorable = red + blue;
    const q = `A ${cont} contains ${red} red tokens, ${blue} blue tokens, and ${green} green tokens. If one token is drawn completely at random, what is the probability that it is EITHER red OR blue?`;
    const correct = `${favorable}/${total}`;
    const distractors = [`${green}/${total}`, `${red}/${total}`, `${blue}/${total}`, `${favorable - 2}/${total}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total tokens = ${red} + ${blue} + ${green} = ${total}.\n2. Favorable = ${red} + ${blue} = ${favorable}.\n3. Probability = ${favorable}/${total}.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 17. Clock Hands Angle (29 completely distinct clock times)
  (() => {
    const TIMES = [
      [1, 20], [2, 15], [3, 20], [4, 10], [5, 25], [6, 50], [7, 15], [8, 40], [9, 20],
      [10, 10], [11, 35], [1, 50], [2, 40], [3, 15], [4, 30], [5, 50], [6, 10], [7, 45],
      [8, 10], [9, 50], [10, 40], [11, 15], [12, 20], [1, 10], [2, 50], [3, 30], [4, 40],
      [5, 15], [6, 30]
    ];
    const [h, m] = TIMES[k % TIMES.length];
    const hDeg = h * 30 + m * 0.5;
    const mDeg = m * 6;
    let diff = Math.abs(hDeg - mDeg);
    if (diff > 180) diff = 360 - diff;
    const finalAngle = diff;
    const timeStr = `${h}:${m < 10 ? '0' + m : m}`;
    const q = `What is the measure of the smaller angle formed between the hour hand and the minute hand of an analog clock at exactly ${timeStr}?`;
    const correct = `${finalAngle}°`;
    const distractors = [`${finalAngle + 15}°`, `${finalAngle - 15}°`, `${h * 30}°`, `${finalAngle + 30}°`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Hour hand position: \\(30 \\times ${h} + 0.5 \\times ${m} = ${hDeg}°\\).\n2. Minute hand position: \\(6 \\times ${m} = ${mDeg}°\\).\n3. Angle difference: \\(|${hDeg} - ${mDeg}| = ${finalAngle}°\\).`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 18. Geometry Area & Perimeter (Unique facility types & dimensions)
  (() => {
    const FACILITIES = [
      "commercial fulfillment center", "aircraft assembly hangar", "pharmaceutical cleanroom warehouse",
      "data center server hall", "automotive stamping plant", "semiconductor fabrication facility",
      "regional cold storage terminal", "intermodal freight transit hub", "aerospace testing laboratory",
      "deep-sea subsea equipment depot", "biomedical processing center", "robotics manufacturing shop",
      "satellite cleanroom assembly bay", "textile weaving pavilion", "specialty chemical production floor",
      "heavy machinery repair bay", "telecommunications switching center", "agricultural grain storage terminal",
      "precision optics polishing suite", "advanced composites curing plant", "hydroelectric turbine gallery",
      "food processing packaging facility", "battery cell manufacturing module", "medical device packaging hall",
      "solar panel lamination warehouse", "industrial 3D printing workshop", "metallurgical casting foundry",
      "microelectronics packaging bay", "spacecraft thermal vacuum test facility"
    ];
    const fac = FACILITIES[k % FACILITIES.length];
    const w = 12 + k;
    const l = w * 2;
    const area = l * w;
    const perim = 2 * (l + w);
    const q = `A ${fac} has a length that is exactly twice its width. If the total perimeter of the facility is ${perim} meters, what is its total floor area?`;
    const correct = `${area} m²`;
    const distractors = [`${area - 32} m²`, `${area + 48} m²`, `${perim * 2} m²`, `${w * w} m²`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let width = \\(w\\). Length = \\(2w\\).\n2. Perimeter = \\(2(w + 2w) = 6w = ${perim}\\); \\(w = ${w}\\).\n3. Length = \\(2 \\times ${w} = ${l}\\).\n4. Area = ${l} \\times ${w} = **${area} m²**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 19. Train Passing Platform (Unique trains & stations)
  (() => {
    const TRAINS = [
      ["Acela Express", "Penn Station"], ["Eurostar Speedliner", "St. Pancras"], ["Shinkansen Nozomi", "Kyoto Central"],
      ["TGV Atlantique", "Gare Montparnasse"], ["Frecciarossa 1000", "Milano Centrale"], ["ICE Sprint", "Frankfurt Hauptbahnhof"],
      ["InterCity Express", "Munich Central"], ["Thalys Red", "Brussels Midi"], ["Alvia 730", "Madrid Atocha"],
      ["High-Speed KTX", "Seoul Station"], ["Trans-Pennine Express", "Manchester Piccadilly"], ["Coradia Polyvalent", "Lyon Part-Dieu"],
      ["Pacific Surfliner", "San Diego Depot"], ["Empire Builder", "St. Paul Station"], ["Northeast Regional", "Back Bay Boston"],
      ["Texas Eagle", "Dallas Union"], ["Coast Starlight", "Portland Union"], ["City of New Orleans", "Memphis Central"],
      ["Capitol Limited", "Pittsburgh Union"], ["Southwest Chief", "Albuquerque Station"], ["Sunset Limited", "Tucson Depot"],
      ["Crescent Express", "Atlanta Peachtree"], ["Silver Meteor", "Miami Central"], ["Wolverine Flyer", "Detroit New Center"],
      ["Cascades Express", "Seattle King Street"], ["Keystone Service", "Harrisburg Terminal"], ["Downeaster", "Portland Transportation Center"],
      ["Heartland Flyer", "Oklahoma City Station"], ["Vermonter Express", "Burlington Union"]
    ];
    const [train, station] = TRAINS[k % TRAINS.length];
    const trainLen = 140 + k * 10;
    const platLen = 160 + k * 10;
    const totalDist = trainLen + platLen;
    const speedMs = 20; // 72 km/h
    const timeSec = totalDist / speedMs;
    const q = `A passenger train named ${train} measuring ${trainLen} meters in length is traveling at a constant speed of 72 km/h. How many seconds will it take to completely pass the ${station} platform of length ${platLen} meters?`;
    const correct = `${timeSec} seconds`;
    const distractors = [`${timeSec + 3} seconds`, `${timeSec - 2.5} seconds`, `${Math.round(trainLen / speedMs)} seconds`, `${timeSec + 5} seconds`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Convert speed: 72 km/h = 20 m/s.\n2. Total distance to clear platform = ${trainLen} + ${platLen} = ${totalDist} m.\n3. Time = ${totalDist} / 20 = **${timeSec} seconds**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 20. Markup & Net Profit Margin (Unique retail products)
  (() => {
    const RETAIL = [
      "artisan espresso machine", "handcrafted leather messenger bag", "noise-canceling aviation headset",
      "professional DSLR camera lens", "titanium diver watch", "carbon fiber road bicycle",
      "custom mechanical keyboard", "designer cashmere sweater", "smart home security console",
      "solid oak dining table", "wireless studio reference monitors", "high-end graphite tennis racket",
      "portable power inverter", "thermal imaging camera", "motorized standing workstation",
      "commercial blenders", "telescopic astronomical lens", "hand-knotted wool rug",
      "drone with obstacle avoidance", "ergonomic executive office chair", "sous vide immersion cooker",
      "precision laser leveler", "ultralight backpacking tent", "modular synthesizer module",
      "commercial grade juicer", "vacuum tube audio amplifier", "handcrafted acoustic violin",
      "heavy-duty garage storage rack", "compact air purification tower"
    ];
    const item = RETAIL[k % RETAIL.length];
    const markup = 40 + (k % 5) * 10;
    const discount = 10 + (k % 4) * 5;
    const factor = (1 + markup / 100) * (1 - discount / 100);
    const netProfit = Math.round((factor - 1) * 100);
    const q = `A specialty boutique merchant marks the retail price of a ${item} ${markup}% above wholesale cost. During a seasonal promotion, a discount of ${discount}% is applied to the marked price. What is the merchant's net percentage profit relative to wholesale cost?`;
    const correct = `${netProfit}%`;
    const distractors = [`${markup - discount}%`, `${netProfit + 6}%`, `${netProfit - 5}%`, `${Math.round(markup / 2)}%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Multiplier = (1 + ${markup}%) \\times (1 - ${discount}%) = ${(1 + markup/100).toFixed(2)} \\times ${(1 - discount/100).toFixed(2)} = ${factor.toFixed(2)}.\n2. Net profit = **${netProfit}%**.`,
      category: 'math',
      subType: 'percentage'
    });
  })();

  // 21. Venn Diagram Set Overlap (Unique tech pairings & counts)
  (() => {
    const TECH = [
      ["Python", "Rust"], ["Go", "C++"], ["TypeScript", "Kotlin"], ["Java", "Scala"],
      ["Swift", "Dart"], ["Ruby", "Elixir"], ["C#", "F#"], ["Haskell", "OCaml"],
      ["PHP", "JavaScript"], ["Julia", "R"], ["Perl", "Bash"], ["SQL", "NoSQL"],
      ["C", "Assembly"], ["MATLAB", "Simulink"], ["Erlang", "Clojure"], ["Cobol", "Fortran"],
      ["Solidity", "Vyper"], ["Lua", "GDScript"], ["Apex", "SOQL"], ["Racket", "Scheme"],
      ["VHDL", "Verilog"], ["Groovy", "Kotlin"], ["Objective-C", "Swift"], ["Ada", "Spark"],
      ["Pascal", "Delphi"], ["LabVIEW", "C++"], ["Prolog", "Lisp"], ["Nim", "Zig"],
      ["Crystal", "Ruby"]
    ];
    const [l1, l2] = TECH[k % TECH.length];
    const total = 100 + k * 5;
    const both = 14 + (k % 6);
    const onlyA = 30 + (k % 7);
    const onlyB = 24 + (k % 5);
    const totalA = onlyA + both;
    const totalB = onlyB + both;
    const neither = total - (onlyA + onlyB + both);
    const q = `In an engineering team of ${total} developers, ${totalA} write ${l1} and ${totalB} write ${l2}. If ${both} developers actively program in both languages, how many program in NEITHER ${l1} nor ${l2}?`;
    const correct = `${neither}`;
    const distractors = [`${neither + both}`, `${neither - 4}`, `${neither + 6}`, `${neither - 2}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Developers using at least one = ${totalA} + ${totalB} - ${both} = ${totalA + totalB - both}.\n2. Developers using neither = ${total} - ${totalA + totalB - both} = **${neither}**.`,
      category: 'math',
      subType: 'word_problem'
    });
  })();

  // 22. Divisibility & Number Properties (Strictly unique divisor d for each test)
  (() => {
    const d = 7 + k; // 7, 8, 9, ..., 35 (100% unique divisor per test!)
    const r = 2 + (k % 4);
    const multK = 2 + (k % 3);
    const expectedR = (r * multK) % d;
    const q = `When an unknown integer N is divided by ${d}, the remainder is ${r}. What is the remainder when ${multK}N is divided by ${d}?`;
    const correct = `${expectedR}`;
    const distractors = [`${r}`, `${(expectedR + 2) % d}`, `${(expectedR + 3) % d}`, `${1}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    questions.push({
      question: q,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let \\(N = ${r}\\).\n2. \\(${multK}N = ${multK} \\times ${r} = ${multK * r}\\).\n3. ${multK * r} divided by ${d} leaves remainder **${expectedR}**.`,
      category: 'math',
      subType: 'algebra'
    });
  })();

  return questions;
}
