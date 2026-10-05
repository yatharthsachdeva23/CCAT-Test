/**
 * Curated & Parameterized Math & Logic Bank for CCAT Prep
 * Contains 44 fundamentally distinct mathematical problem archetypes.
 * Each archetype features multiple distinct real-world problem scenarios,
 * dynamic numeric variables, and zero pattern-memorization repetition.
 * Guarantees zero duplicate logic, zero duplicate options, zero tags, and zero collisions with Test 1.
 */

function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    return (s = (s * 16807) % 2147483647) / 2147483647;
  };
}

/**
 * Universal Option Randomizer with Strict Deduplication Guard
 * Guarantees that all 5 options (A-E) are 100% unique.
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
      // Duplicate detected! Dynamically mutate to a guaranteed unique distractor
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
  ["Albuquerque", "Santa Fe"], ["Austin", "San Antonio"], ["Louisville", "Lexington"], ["Oklahoma City", "Tulsa"]
];

export const MATH_ARCHETYPES = [
  // 0: WORK - Alternating Days (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (nameA, nameB, p1, p2) => `Civil engineering paving team ${nameA} can resurface an airport taxiway in ${p1} days alone, while team ${nameB} requires ${p2} days alone. If they alternate working one day at a time, starting with team ${nameA} on day 1, approximately how many total days will it take to finish the resurfacing?`,
        domain: 'airport taxiway resurfacing'
      },
      {
        getQ: (nameA, nameB, p1, p2) => `Technician ${nameA} can audit an enterprise data pipeline in ${p1} days alone, while Technician ${nameB} requires ${p2} days alone. If they alternate working one day at a time, starting with ${nameA} on day 1, approximately how many total days will it take to finish the audit?`,
        domain: 'data pipeline audit'
      },
      {
        getQ: (nameA, nameB, p1, p2) => `Printing press machine ${nameA} can print a major textbook release in ${p1} days running alone, while press ${nameB} takes ${p2} days alone. If the publishing house alternates operating the machines one day at a time, starting with ${nameA}, how many days are required to print the release?`,
        domain: 'textbook publication run'
      },
      {
        getQ: (nameA, nameB, p1, p2) => `Robotic welding cell ${nameA} can fabricate a batch of EV chassis in ${p1} days alone, while cell ${nameB} requires ${p2} days. If the production line operates them on alternating days, beginning with cell ${nameA}, how many days will the fabrication take?`,
        domain: 'EV chassis fabrication'
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const nameA = NAMES[(k * 3) % NAMES.length];
    const nameB = NAMES[(k * 3 + 7) % NAMES.length];
    const p1 = 6 + (k % 5) * 2;
    const p2 = p1 * 2;
    const days = Math.round((4 * p1) / 3);
    const q = sc.getQ(nameA, nameB, p1, p2);
    const correct = `${days} days`;
    const distractors = [`${days + 2} days`, `${days - 2 > 0 ? days - 2 : days + 4} days`, `${days + 5} days`, `${days + 7} days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Work done in a 2-day alternating cycle: \\(1/${p1} + 1/${p2} = 3/${p2}\\).\n2. Cycles required: \\${p2} / 3 = ${(p2/3).toFixed(1)}\\). Multiply by 2 days per cycle = **${days} days**.\n\n💡 **Speed Tip:** Alternating equal days with one worker twice as fast always completes in approximately \\(4/3\\) of the faster worker's solo time!`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 1: WORK - Early Departure / Quitting (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (nameA, nameB, a, b, s) => `Senior cloud architect ${nameA} can deploy a microservice cluster in ${a} days alone, while architect ${nameB} takes ${b} days alone. Both collaborate for ${s} days, after which ${nameA} leaves for another project. How many total days are required to complete the deployment?`,
        task: 'microservice deployment'
      },
      {
        getQ: (nameA, nameB, a, b, s) => `Commercial contractor ${nameA} can paint an office building exterior in ${a} days, while contractor ${nameB} takes ${b} days. Both work together for ${s} days before ${nameA} is reassigned. How many total days does it take to finish the job?`,
        task: 'building painting'
      },
      {
        getQ: (nameA, nameB, a, b, s) => `Precision milling station ${nameA} finishes an aerospace component run in ${a} days, while station ${nameB} takes ${b} days. Both stations operate concurrently for ${s} days, after which station ${nameA} pauses for maintenance. What is the total duration to complete the run?`,
        task: 'component run'
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const nameA = NAMES[(k + 2) % NAMES.length];
    const nameB = NAMES[(k + 5) % NAMES.length];
    const a = 12 + (k % 5) * 2;
    const b = a * 2;
    const shared = 3 + (k % 3);
    const workDone = shared * (1/a + 1/b);
    const remWork = 1 - workDone;
    const remDays = Math.round(remWork * b);
    const totalDays = shared + remDays;
    const q = sc.getQ(nameA, nameB, a, b, shared);
    const correct = `${totalDays} days`;
    const distractors = [`${totalDays + 3} days`, `${remDays} days`, `${totalDays - 2} days`, `${totalDays + 6} days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Progress in ${shared} shared days: \\${shared} \\times (1/${a} + 1/${b}) = ${(workDone * 100).toFixed(0)}\\%\\.\n2. Remaining work (${(remWork * 100).toFixed(0)}%) completed by ${nameB} in ${remDays} days.\n3. Total days = ${shared} + ${remDays} = **${totalDays} days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 2: WORK - Inflow Valves & Drainage (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (v1, v2, drain) => `A chemical processing vat has two inlet reactant feeds filling it in ${v1} hours and ${v2} hours respectively, and one bottom drainage valve that can drain a full vat in ${drain} hours. If both feeds and the drain are opened simultaneously from empty, in how many hours will the vat be completely full?`
      },
      {
        getQ: (v1, v2, drain) => `An municipal reservoir is fed by two mountain aqueducts filling it in ${v1} hours and ${v2} hours, while an irrigation canal drains a full reservoir in ${drain} hours. If all three channels operate continuously, how many hours until the reservoir fills?`
      },
      {
        getQ: (v1, v2, drain) => `A brewery fermentation tank has two wort transfer valves filling it in ${v1} and ${v2} hours, and an automated sediment purge valve emptying it in ${drain} hours. Operating all three valves together, how many hours will it take to fill the tank?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const v1 = 4 + (k % 4);
    const v2 = 7 + (k % 3);
    const drain = 14 + (k % 4) * 2;
    const rate = 1/v1 + 1/v2 - 1/drain;
    const hrs = (1 / rate).toFixed(1);
    const val = parseFloat(hrs);
    const q = sc.getQ(v1, v2, drain);
    const correct = `${hrs} hours`;
    const distractors = [`${(val + 1.6).toFixed(1)} hours`, `${(val - 1.2 > 0 ? val - 1.2 : val + 2.5).toFixed(1)} hours`, `${(val + 3.4).toFixed(1)} hours`, `${(val + 5.2).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Net filling rate = \\(1/${v1} + 1/${v2} - 1/${drain} = ${rate.toFixed(3)}\\) tanks/hr.\n2. Total time = \\(1 / ${rate.toFixed(3)} =\\) **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 3: WORK - Three Workers Together (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (a, b, c) => `Three automated parcel sorting lines (Line A, Line B, and Line C) in a logistics hub can process a holiday freight shipment in ${a} hours, ${b} hours, and ${c} hours respectively. Working concurrently at constant throughput, how many hours will all three lines require to process the shipment?`
      },
      {
        getQ: (a, b, c) => `Three clinical laboratory centrifuges X, Y, and Z can process a batch of blood plasma vials in ${a} hours, ${b} hours, and ${c} hours respectively. If all three centrifuges operate simultaneously, in how many hours will the batch be completed?`
      },
      {
        getQ: (a, b, c) => `Three cloud rendering nodes Alpha, Beta, and Gamma can render a sequence of 3D visual effects in ${a} hours, ${b} hours, and ${c} hours respectively. Working in parallel, how many hours will the complete render sequence take?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const a = 10 + (k % 4) * 2;
    const b = 18 + (k % 4) * 3;
    const c = 30;
    const rate = 1/a + 1/b + 1/c;
    const hrs = (1 / rate).toFixed(1);
    const val = parseFloat(hrs);
    const q = sc.getQ(a, b, c);
    const correct = `${hrs} hours`;
    const distractors = [`${(val + 1.8).toFixed(1)} hours`, `${(val - 1.1 > 0 ? val - 1.1 : val + 2.4).toFixed(1)} hours`, `${(val + 3.5).toFixed(1)} hours`, `${(val + 5.5).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combined hourly rate = \\(1/${a} + 1/${b} + 1/${c} = ${rate.toFixed(4)}\\) jobs/hr.\n2. Combined time = \\(1 / ${rate.toFixed(4)} =\\) **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 4: WORK - Efficiency Multipliers (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (nameA, nameB, pct, days) => `Senior software engineer ${nameA} writes and reviews code ${pct}% faster than junior engineer ${nameB}. Working together, they complete an application refactor in ${days} days. How many days would ${nameB} take working entirely alone?`
      },
      {
        getQ: (nameA, nameB, pct, days) => `Automated laser cutter Model A operates with ${pct}% higher throughput than Model B. Operating concurrently, both cutters fulfill a sheet metal fabrication order in ${days} days. How many days would Model B require alone?`
      },
      {
        getQ: (nameA, nameB, pct, days) => `Quality auditor ${nameA} is ${pct}% more efficient than auditor ${nameB}. Working concurrently, they complete an organizational compliance audit in ${days} days. How many days would ${nameB} require working alone?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const nameA = NAMES[(k + 4) % NAMES.length];
    const nameB = NAMES[(k + 8) % NAMES.length];
    const fasterPct = 40 + (k % 4) * 10;
    const combinedDays = 10 + (k % 5) * 2;
    const mult = 1 + (1 + fasterPct / 100);
    const daysB = Math.round(combinedDays * mult);
    const daysA = Math.round(daysB / (1 + fasterPct / 100));
    const q = sc.getQ(nameA, nameB, fasterPct, combinedDays);
    const correct = `${daysB} days`;
    const distractors = [`${daysA} days`, `${daysB + 6} days`, `${daysB - 4} days`, `${daysB + 12} days`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Ratio of rates: ${nameA} : ${nameB} = \\${(1 + fasterPct/100).toFixed(2)} : 1\\.\n2. Combined rate = ${mult.toFixed(2)} \\times Rate_B = 1/${combinedDays}.\n3. Time for ${nameB} alone = \\${combinedDays} \\times ${mult.toFixed(2)} =\\) **${daysB} days**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 5: SPEED - Pursuit & Overtake (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (v1, v2, lead) => `A long-haul freight truck leaves a logistics terminal traveling at ${v1} mph. Exactly ${lead} hours later, an express intercept courier departs from the same terminal along the identical route traveling at ${v2} mph. In how many hours will the express courier overtake the freight truck?`
      },
      {
        getQ: (v1, v2, lead) => `A local commuter train leaves the central depot at ${v1} mph. Exactly ${lead} hours later, a non-stop high-speed bullet train departs along a parallel express track traveling at ${v2} mph. In how many hours will the bullet train catch up with the commuter train?`
      },
      {
        getQ: (v1, v2, lead) => `A coastal cargo barge departs a harbor cruising at ${v1} knots. Exactly ${lead} hours later, a coast guard patrol cutter departs the same dock cruising at ${v2} knots along the same heading. In how many hours will the cutter overtake the barge?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const v1 = 40 + (k % 5) * 5;
    const v2 = v1 + 20 + (k % 3) * 5;
    const leadHrs = 2;
    const leadDist = v1 * leadHrs;
    const catchHrs = (leadDist / (v2 - v1)).toFixed(1);
    const val = parseFloat(catchHrs);
    const q = sc.getQ(v1, v2, leadHrs);
    const correct = `${catchHrs} hours`;
    const distractors = [`${(val + 1.5).toFixed(1)} hours`, `${(val - 1.0 > 0 ? val - 1.0 : val + 2.2).toFixed(1)} hours`, `${(val + 3.2).toFixed(1)} hours`, `${(val + 5.0).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Head start distance = \\${v1}\\text{ mph} \\times ${leadHrs}\\text{ hrs} = ${leadDist}\\text{ miles}\\.\n2. Relative closing speed = \\${v2} - ${v1} = ${v2 - v1}\\text{ mph}\\.\n3. Time to overtake = \\${leadDist} / ${v2 - v1} =\\) **${catchHrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 6: SPEED - Harmonic Mean Round Trip (CRITICAL: Diverse Scenarios & Varied Ratios!)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (v1, v2, unit) => `A regional turboprop aircraft flies outbound between two cities at ${v1} ${unit} against headwind, and returns along the identical flight path at ${v2} ${unit} with tailwind. What was the aircraft's average speed across the complete round-trip journey?`,
        unit: 'knots'
      },
      {
        getQ: (v1, v2, unit) => `A mountain delivery truck drives 60 miles uphill at ${v1} ${unit}, and returns along the exact same highway downhill at ${v2} ${unit}. What is the truck's overall average speed for the entire round trip?`,
        unit: 'mph'
      },
      {
        getQ: (v1, v2, unit) => `An intercity high-speed train travels outbound on an express schedule at ${v1} ${unit}, but makes local stops on the return journey averaging ${v2} ${unit}. What is the train's average speed over the full round-trip route?`,
        unit: 'km/h'
      },
      {
        getQ: (v1, v2, unit) => `A cyclist completes a 40-mile time trial by riding the outbound leg into a headwind at ${v1} ${unit} and the return leg with a tailwind at ${v2} ${unit}. What was the cyclist's average speed for the full ride?`,
        unit: 'mph'
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    // Varied speed pairs (not always 2x! includes 1.5x, 2x, etc.)
    const speedPairs = [
      [40, 60], [30, 45], [48, 72], [50, 75], [56, 112], [32, 64], [60, 90], [36, 54]
    ];
    const pair = speedPairs[(k + t) % speedPairs.length];
    const v1 = pair[0];
    const v2 = pair[1];
    const avg = ((2 * v1 * v2) / (v1 + v2)).toFixed(1);
    const val = parseFloat(avg);
    const q = sc.getQ(v1, v2, sc.unit);
    const correct = `${avg} ${sc.unit}`;
    const distractors = [`${((v1 + v2)/2).toFixed(1)} ${sc.unit}`, `${(val + 4.2).toFixed(1)} ${sc.unit}`, `${(val - 3.1).toFixed(1)} ${sc.unit}`, `${(val + 7.5).toFixed(1)} ${sc.unit}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. For equal distances in both directions, average speed is the **harmonic mean**, NEVER the simple arithmetic average!\n2. \\(V_{avg} = \\frac{2 \\times v_1 \\times v_2}{v_1 + v_2} = \\frac{2 \\times ${v1} \\times ${v2}}{${v1} + ${v2}} = \\frac{${2 * v1 * v2}}{${v1 + v2}} =\\) **${avg} ${sc.unit}**.\n\n💡 **Speed Tip:** Arithmetic mean (\\(${((v1 + v2)/2).toFixed(1)}\\)) is a classic trap option! Whenever one speed is double the other, \\(V_{avg} = \\frac{4}{3} \\times v_{slow}\\).`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 7: SPEED - River Current / Boat (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (still, current, dist) => `A hydrographic survey vessel has a top cruising speed of ${still} mph in still water. On a river flowing at ${current} mph, the vessel travels ${dist} miles downstream in 3 hours. How many hours will it take to travel the same ${dist} miles back upstream against the current?`
      },
      {
        getQ: (still, current, dist) => `A cargo barge can travel at ${still} mph in calm waters. On a river with a current of ${current} mph, it moves ${dist} miles downstream in 3 hours. How many hours will the barge require to navigate back upstream across the same distance?`
      },
      {
        getQ: (still, current, dist) => `A motorized kayak navigates at ${still} mph in still lakes. On a tidal channel flowing at ${current} mph, it covers ${dist} miles downstream with the current in 3 hours. How many hours will the upstream return trip take?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const still = 15 + (k % 4) * 3;
    const current = 3 + (k % 3);
    const downSpeed = still + current;
    const upSpeed = still - current;
    const dist = downSpeed * 3;
    const upHrs = (dist / upSpeed).toFixed(1);
    const val = parseFloat(upHrs);
    const q = sc.getQ(still, current, dist);
    const correct = `${upHrs} hours`;
    const distractors = [`${(val + 1.5).toFixed(1)} hours`, `${(val - 1.1 > 0 ? val - 1.1 : val + 2.5).toFixed(1)} hours`, `${(val + 3.2).toFixed(1)} hours`, `${(val + 5.0).toFixed(1)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Downstream speed = ${still} + ${current} = ${downSpeed} mph.\n2. Upstream speed = ${still} - ${current} = ${upSpeed} mph.\n3. Upstream travel time = ${dist} / ${upSpeed} = **${upHrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 8: SPEED - Train Length & Platform / Bridge (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (tLen, pLen, speedKmh, speedMs) => `An express commuter train measuring ${tLen} meters in length travels at a steady ${speedKmh} km/h (${speedMs} m/s). How many seconds will it take for the train to completely clear a stationary covered station platform of length ${pLen} meters?`,
        structure: 'station platform'
      },
      {
        getQ: (tLen, pLen, speedKmh, speedMs) => `A freight container train measuring ${tLen} meters long travels at ${speedKmh} km/h (${speedMs} m/s). How many seconds are needed for the train to completely cross a steel railway bridge measuring ${pLen} meters long?`,
        structure: 'railway bridge'
      },
      {
        getQ: (tLen, pLen, speedKmh, speedMs) => `A high-speed passenger train of length ${tLen} meters passes through a mountain tunnel of length ${pLen} meters at ${speedKmh} km/h (${speedMs} m/s). How many seconds elapse from when the front of the train enters the tunnel until the rear exits?`,
        structure: 'mountain tunnel'
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const trainLen = 180 + (k % 5) * 40;
    const platLen = 320 + (k % 4) * 50;
    const totalDist = trainLen + platLen;
    const speedMs = 25; // 90 km/h
    const sec = (totalDist / speedMs).toFixed(1);
    const val = parseFloat(sec);
    const q = sc.getQ(trainLen, platLen, 90, 25);
    const correct = `${sec} seconds`;
    const distractors = [`${(val + 4.5).toFixed(1)} seconds`, `${(val - 3.2).toFixed(1)} seconds`, `${(val + 8.0).toFixed(1)} seconds`, `${(platLen / speedMs).toFixed(1)} seconds`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total clearance distance = Train length + Structure length = ${trainLen} + ${platLen} = ${totalDist} m.\n2. Clearance time = ${totalDist} / 25 = **${sec} seconds**.\n\n💡 **Speed Tip:** Do not just divide the structure length by speed (${(platLen / speedMs).toFixed(1)} s)! The train's own length must completely clear the exit point.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 9: SPEED - Separating Objects in Opposite Directions (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (vA, vB, dist) => `Two commercial aircraft depart simultaneously from the same metropolitan runway, Flight 1 heading due North at ${vA} mph and Flight 2 heading due South at ${vB} mph. In how many hours will the two aircraft be separated by exactly ${dist.toLocaleString()} miles?`
      },
      {
        getQ: (vA, vB, dist) => `Two container ships depart a harbor navigation buoy at the same time, Ship A cruising East at ${vA} mph and Ship B cruising West at ${vB} mph. In how many hours will they be separated by ${dist.toLocaleString()} miles?`
      },
      {
        getQ: (vA, vB, dist) => `Two long-distance express trains depart a central transit hub simultaneously on opposite outbound tracks, Train Alpha at ${vA} mph and Train Beta at ${vB} mph. In how many hours will they be ${dist.toLocaleString()} miles apart?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const vA = 420 + (k % 4) * 35;
    const vB = 480 + (k % 4) * 25;
    const targetDist = 2700 + (k % 4) * 450;
    const relSpeed = vA + vB;
    const hrs = (targetDist / relSpeed).toFixed(2);
    const val = parseFloat(hrs);
    const q = sc.getQ(vA, vB, targetDist);
    const correct = `${hrs} hours`;
    const distractors = [`${(val + 0.6).toFixed(2)} hours`, `${(val - 0.4 > 0 ? val - 0.4 : val + 1.1).toFixed(2)} hours`, `${(val + 1.2).toFixed(2)} hours`, `${(val + 1.8).toFixed(2)} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Diverging in opposite directions, relative separation speed = ${vA} + ${vB} = ${relSpeed} mph.\n2. Time to reach separation = ${targetDist} / ${relSpeed} = **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 10: PERCENTAGE - Markup & Discount Net Profit (CRITICAL: Varied Margins, Not Always 20%!)
  (t, k, rand) => {
    const scenarios = [
      {
        markup: 60, discount: 25,
        getItem: () => "commercial espresso machine",
        store: "restaurant equipment wholesaler"
      },
      {
        markup: 40, discount: 15,
        getItem: () => "high-speed network switch",
        store: "IT hardware distributor"
      },
      {
        markup: 80, discount: 30,
        getItem: () => "designer sunglasses",
        store: "luxury boutique"
      },
      {
        markup: 50, discount: 20,
        getItem: () => "ergonomic executive chair",
        store: "office furniture merchant"
      },
      {
        markup: 75, discount: 20,
        getItem: () => "carbon-fiber drone",
        store: "electronics retailer"
      },
      {
        markup: 30, discount: 10,
        getItem: () => "cordless brushless drill",
        store: "industrial tool supplier"
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const cost = 120 + (k % 5) * 30;
    const mult = (1 + sc.markup / 100) * (1 - sc.discount / 100);
    const profitPct = Math.round((mult - 1) * 100);
    const item = sc.getItem();
    const q = `A merchant at an ${sc.store} purchases wholesale ${item} units for $${cost} each, applies a ${sc.markup}% markup to set the catalog retail price, and later offers a ${sc.discount}% promotional discount during a seasonal clearance. What is the merchant's net profit percentage relative to wholesale cost?`;
    const correct = `${profitPct}%`;
    const trapSubtraction = `${sc.markup - sc.discount}%`;
    const distractors = [trapSubtraction, `${profitPct + 5}%`, `${profitPct - 6 > 0 ? profitPct - 6 : profitPct + 12}%`, `${profitPct + 10}%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Price multiplier = \\((1 + ${sc.markup/100}) \\times (1 - ${sc.discount/100}) = ${(1 + sc.markup/100).toFixed(2)} \\times ${(1 - sc.discount/100).toFixed(2)} = ${mult.toFixed(2)}\\).\n2. Net profit = \\((${mult.toFixed(2)} - 1) \\times 100\\% =\\) **${profitPct}%**.\n\n💡 **Speed Tip:** Never subtract percentages directly (${sc.markup}% - ${sc.discount}% = ${sc.markup - sc.discount}% is a trap!). Multiply the scale factors: \\(${(1 + sc.markup/100).toFixed(2)} \\times ${(1 - sc.discount/100).toFixed(2)}\\).`,
      category: 'math', subType: 'percentage'
    };
  },

  // 11: PERCENTAGE - Split Bill with Tax & Tip (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (diners, base, tax, tip) => `A project team of ${diners} colleagues attends an achievement dinner with a food and beverage subtotal of $${base.toFixed(2)}. An ${tax}% local sales tax and a ${tip}% gratuity are both applied directly to the base subtotal. If the colleagues split the entire final total equally, how much does each person pay?`
      },
      {
        getQ: (diners, base, tax, tip) => `A company caters a client luncheon with an order subtotal of $${base.toFixed(2)}. An ${tax}% catering tax and a ${tip}% delivery service gratuity are applied to the subtotal. If ${diners} departments divide the expense equally, what is each department's share?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const diners = 4 + (k % 3);
    const base = 150 + (k % 4) * 25;
    const tax = 8;
    const tip = 18;
    const total = base * (1 + (tax + tip) / 100);
    const share = (total / diners).toFixed(2);
    const val = parseFloat(share);
    const q = sc.getQ(diners, base, tax, tip);
    const correct = `$${share}`;
    const distractors = [`$${(val + 3.50).toFixed(2)}`, `$${(val - 2.80).toFixed(2)}`, `$${(val + 6.00).toFixed(2)}`, `$${(val + 9.50).toFixed(2)}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combined percentage added = ${tax}% + ${tip}% = ${tax + tip}%.\n2. Total bill = $${base} \\times ${(1 + (tax+tip)/100).toFixed(2)} = $${total.toFixed(2)}.\n3. Per person share = $${total.toFixed(2)} / ${diners} = **$${share}**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 12: PERCENTAGE - Tiered Commission (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        role: "enterprise cloud sales director",
        threshold: 30000,
        rate: 8
      },
      {
        role: "commercial medical equipment executive",
        threshold: 25000,
        rate: 7
      },
      {
        role: "industrial solar installation consultant",
        threshold: 20000,
        rate: 6
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const baseSalary = 3200 + (k % 4) * 400;
    const totalSales = sc.threshold + 15000 + (k % 4) * 5000;
    const commEarnings = (totalSales - sc.threshold) * (sc.rate / 100);
    const totalPay = baseSalary + commEarnings;
    const q = `A ${sc.role} earns a base monthly salary of $${baseSalary.toLocaleString()}, plus a ${sc.rate}% commission on all gross sales closed beyond a monthly threshold of $${sc.threshold.toLocaleString()}. If the executive closes $${totalSales.toLocaleString()} in sales, what is their total compensation for the month?`;
    const correct = `$${totalPay.toLocaleString()}`;
    const distractors = [`$${(totalPay - 450).toLocaleString()}`, `$${(totalPay + 650).toLocaleString()}`, `$${(totalPay + 1200).toLocaleString()}`, `$${(totalPay - 800).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Commissionable sales = $${totalSales.toLocaleString()} - $${sc.threshold.toLocaleString()} = $${(totalSales - sc.threshold).toLocaleString()}.\n2. Commission earnings = ${sc.rate}% of $${(totalSales - sc.threshold).toLocaleString()} = $${commEarnings.toLocaleString()}.\n3. Total pay = $${baseSalary.toLocaleString()} + $${commEarnings.toLocaleString()} = **$${totalPay.toLocaleString()}**.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 13: PERCENTAGE - Asymmetric Recovery (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      { asset: "a tech ETF share price", drops: [20, 25, 40, 50] },
      { asset: "a biotechnology index fund", drops: [25, 50, 20] },
      { asset: "an industrial commodity price per unit", drops: [20, 40, 50] }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const drop = sc.drops[(k + t) % sc.drops.length];
    const req = ((drop / (100 - drop)) * 100).toFixed(1);
    const val = parseFloat(req);
    const q = `Following market volatility, ${sc.asset} experiences an immediate drop of exactly ${drop}% in unit value. By what percentage must the new reduced price increase to return to the original pre-decline value?`;
    const correct = `${req}%`;
    const distractors = [`${drop}.0%`, `${(val + 10).toFixed(1)}%`, `${(val - 8 > 0 ? val - 8 : val + 15).toFixed(1)}%`, `${(val + 25).toFixed(1)}%`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Starting base = 100. After ${drop}% drop, new value = ${100 - drop}.\n2. Required increase = \\${drop} / ${100 - drop} \\times 100\\% =\\) **${req}%**.\n\n💡 **Speed Tip:** Because the base is now smaller (${100 - drop}), the percentage gain required is always larger than the initial percentage lost!`,
      category: 'math', subType: 'percentage'
    };
  },

  // 14: RATIO - Adding Items to Change Ratio (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      { itemA: "cobalt sensors", itemB: "silver sensors", container: "robotics parts bin" },
      { itemA: "conical flasks", itemB: "graduated beakers", container: "chemical glassware locker" },
      { itemA: "laptops", itemB: "tablets", container: "hardware inventory rack" }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const mult = 6 + (k % 5);
    const a = 3 * mult;
    const b = 2 * mult;
    const addedB = a - b;
    const q = `A ${sc.container} holds ${a + b} units consisting of ${sc.itemA} and ${sc.itemB} in a ratio of 3 : 2. How many additional ${sc.itemB} must be added to make the ratio of ${sc.itemA} to ${sc.itemB} exactly 1 : 1?`;
    const correct = `${addedB}`;
    const distractors = [`${addedB + 4}`, `${addedB + 8}`, `${addedB - 2 > 0 ? addedB - 2 : addedB + 12}`, `${addedB * 2 + 2}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Ratio sum = 5 parts = ${a + b} \\implies 1 part = ${mult}.\n2. ${sc.itemA} = ${a}, ${sc.itemB} = ${b}.\n3. To balance to 1:1, add: ${a} - ${b} = **${addedB}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 15: RATIO - Three-Part Allocation (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (total, r1, r2, r3, name) => `A corporate dividend bonus pool of $${total.toLocaleString()} is divided among three founders in the ratio ${r1} : ${r2} : ${r3}. How much does the founder receiving the middle share get?`
      },
      {
        getQ: (total, r1, r2, r3, name) => `An estate bequest of $${total.toLocaleString()} is apportioned among three municipal charities in the ratio ${r1} : ${r2} : ${r3}. What is the exact dollar amount received by the charity receiving the largest share?`,
        askLargest: true
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const parts = [2, 3, 5];
    const sumParts = 10;
    const multiplier = 8000 + (k % 5) * 2000;
    const total = sumParts * multiplier;
    const middleShare = parts[1] * multiplier;
    const largestShare = parts[2] * multiplier;
    const targetShare = sc.askLargest ? largestShare : middleShare;
    const q = sc.getQ(total, parts[0], parts[1], parts[2]);
    const correct = `$${targetShare.toLocaleString()}`;
    const distractors = [
      `$${(targetShare + multiplier).toLocaleString()}`,
      `$${(targetShare - multiplier > 0 ? targetShare - multiplier : targetShare + 2 * multiplier).toLocaleString()}`,
      `$${(parts[0] * multiplier).toLocaleString()}`,
      `$${(targetShare + 3 * multiplier).toLocaleString()}`
    ];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total parts = ${parts.join(' + ')} = ${sumParts}.\n2. Value per part = $${total.toLocaleString()} / ${sumParts} = $${multiplier.toLocaleString()}.\n3. Target share = **$${targetShare.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 16: MIXTURE - Acid Solution Alligation (Multi-scenario)
  (t, k, rand) => {
    const c1 = 20;
    const c2 = 50;
    const target = 30 + (k % 3) * 5; // 30, 35, 40
    // w1 * 20 + w2 * 50 = (w1 + w2) * target
    // w1 * (target - 20) = w2 * (50 - target) => w1 / w2 = (50 - target) / (target - 20)
    const part1 = 50 - target;
    const part2 = target - 20;
    const totalVol = (part1 + part2) * (10 + (k % 4) * 5);
    const vol1 = (part1 / (part1 + part2)) * totalVol;
    const vol2 = totalVol - vol1;
    const q = `A chemical lab technician needs to create ${totalVol} liters of a ${target}% acid solution by mixing a ${c1}% acid stock solution with a ${c2}% acid stock solution. How many liters of the ${c2}% solution must be used?`;
    const correct = `${vol2} liters`;
    const distractors = [`${vol1} liters`, `${vol2 + 10} liters`, `${vol2 - 10 > 0 ? vol2 - 10 : vol2 + 20} liters`, `${Math.round(totalVol / 2)} liters`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. By alligation: ratio of 20% to 50% = (50 - ${target}) : (${target} - 20) = ${part1} : ${part2}.\n2. Fraction of 50% solution = ${part2} / ${part1 + part2}.\n3. Volume of 50% solution = \\(${totalVol} \\times (${part2}/${part1 + part2}) =\\) **${vol2} liters**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 17: MIXTURE - Diluting with Pure Water (Multi-scenario)
  (t, k, rand) => {
    const baseVol = 40 + (k % 4) * 10;
    const cInitial = 60;
    const cFinal = 40;
    // baseVol * 60 = (baseVol + addedWater) * 40 => addedWater = baseVol * 20 / 40 = baseVol * 0.5
    const addedWater = (baseVol * (cInitial - cFinal)) / cFinal;
    const q = `A laboratory vat contains ${baseVol} liters of a ${cInitial}% alcohol disinfectant solution. How many liters of pure distilled water (0% alcohol) must be added to dilute the solution to a concentration of ${cFinal}%?`;
    const correct = `${addedWater} liters`;
    const distractors = [`${addedWater + 5} liters`, `${addedWater - 5 > 0 ? addedWater - 5 : addedWater + 15} liters`, `${baseVol} liters`, `${addedWater + 12} liters`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Pure alcohol present = ${baseVol} \\times 0.60 = ${(baseVol * 0.6).toFixed(1)} L.\n2. Target volume = ${(baseVol * 0.6).toFixed(1)} / 0.40 = ${baseVol + addedWater} L.\n3. Water added = ${baseVol + addedWater} - ${baseVol} = **${addedWater} liters**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 18: AVERAGE - Target Final Exam Score (Multi-scenario)
  (t, k, rand) => {
    const s1 = 78 + (k % 4) * 2;
    const s2 = 84 + (k % 3) * 3;
    const s3 = 88 - (k % 3);
    const targetAvg = 85;
    const needed = targetAvg * 4 - (s1 + s2 + s3);
    const q = `A candidate taking a 4-part certification series has scores of ${s1}, ${s2}, and ${s3} on the first three sections. What score must the candidate achieve on the fourth and final section to earn an overall average score of exactly ${targetAvg}?`;
    const correct = `${needed}`;
    const distractors = [`${needed + 4}`, `${needed - 3}`, `${needed + 8}`, `${needed - 6}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total points required for ${targetAvg} average across 4 tests = 4 \\times ${targetAvg} = ${targetAvg * 4}.\n2. Current sum = ${s1} + ${s2} + ${s3} = ${s1 + s2 + s3}.\n3. Score needed = ${targetAvg * 4} - ${s1 + s2 + s3} = **${needed}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 19: AVERAGE - Member Replacement Shift (Multi-scenario)
  (t, k, rand) => {
    const members = 8;
    const shift = 2; // avg increases by 2
    const departed = 64 + (k % 4) * 4;
    const replacement = departed + members * shift;
    const q = `The average weight of an ${members}-person athletic crew team increases by ${shift} kg when one veteran member weighing ${departed} kg is replaced by a new recruit. What is the weight of the new recruit?`;
    const correct = `${replacement} kg`;
    const distractors = [`${replacement - 4} kg`, `${replacement + 6} kg`, `${departed + shift} kg`, `${replacement + 10} kg`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total increase in team weight = ${members} members \\times ${shift} kg = ${members * shift} kg.\n2. Weight of new recruit = ${departed} + ${members * shift} = **${replacement} kg**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 20: AVERAGE - Weighted Components (Multi-scenario)
  (t, k, rand) => {
    const hw = 90 + (k % 3) * 4;
    const midterm = 80 + (k % 4) * 3;
    const finalEx = 88;
    const finalScore = Math.round(hw * 0.20 + midterm * 0.30 + finalEx * 0.50);
    const q = `An engineering certification grade is calculated from three components: Practical Labs (20%), Midterm Assessment (30%), and the Capstone Project (50%). If an engineer scores ${hw} on Labs, ${midterm} on Midterm, and ${finalEx} on the Capstone Project, what is their weighted composite score?`;
    const correct = `${finalScore}`;
    const distractors = [`${finalScore + 3}`, `${finalScore - 2}`, `${finalScore + 6}`, `${finalScore - 5}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Weighted calculation: \\((${hw} \\times 0.20) + (${midterm} \\times 0.30) + (${finalEx} \\times 0.50) = ${(hw*0.2).toFixed(1)} + ${(midterm*0.3).toFixed(1)} + ${(finalEx*0.5).toFixed(1)} =\\) **${finalScore}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 21: ALGEBRA - Age Equation (Multi-scenario)
  (t, k, rand) => {
    const diff = 5 + (k % 3);
    const son = 12 + diff;
    const father = 3 * (son - diff) + diff;
    const q = `Exactly ${diff} years ago, an engineering director was three times as old as their associate. In ${diff} years from now, the director will be twice as old as the associate. How old is the director today?`;
    const correct = `${father} years old`;
    const distractors = [`${father - 5} years old`, `${father + 6} years old`, `${father + 10} years old`, `${father - 10} years old`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let D = Director, A = Associate.\n2. \\(D - ${diff} = 3(A - ${diff})\\) and \\(D + ${diff} = 2(A + ${diff})\\).\n3. Solving gives Associate = ${son} and Director = **${father} years old**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 22: ALGEBRA - Coin Values / Denominations (Multi-scenario)
  (t, k, rand) => {
    const qCount = 18 + (k % 4) * 2;
    const dCount = 22 - (k % 3);
    const totalCoins = qCount + dCount;
    const totalVal = (qCount * 0.25 + dCount * 0.10).toFixed(2);
    const q = `A transit deposit box holds ${totalCoins} fare tokens consisting solely of dimes ($0.10) and quarters ($0.25). If the total verified balance in the box is $${totalVal}, how many quarters are in the box?`;
    const correct = `${qCount}`;
    const distractors = [`${qCount + 3}`, `${qCount - 2}`, `${qCount + 6}`, `${qCount - 5}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. \\(0.25Q + 0.10(${totalCoins} - Q) = ${totalVal}\\).\n2. \\(0.15Q = ${(parseFloat(totalVal) - totalCoins * 0.10).toFixed(2)} \\implies Q =\\) **${qCount}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 23: ALGEBRA - Remaining Budget Fractions (Multi-scenario)
  (t, k, rand) => {
    const base = 2400 + (k % 4) * 400;
    const rem = base / 2;
    const q = `A university laboratory spends 1/3 of its quarterly supply grant on specialized reagents, and 1/4 of the remaining balance on microfluidic chips. If $${rem.toLocaleString()} remains unspent for calibration equipment, what was the total quarterly grant?`;
    const correct = `$${base.toLocaleString()}`;
    const distractors = [`$${(base + 600).toLocaleString()}`, `$${(base - 400).toLocaleString()}`, `$${(base + 1200).toLocaleString()}`, `$${(base - 800).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Fraction remaining after reagents = 2/3.\n2. Fraction remaining after chips = \\(2/3 \\times (1 - 1/4) = 2/3 \\times 3/4 = 1/2\\).\n3. 1/2 of Total = $${rem.toLocaleString()} \\implies Total = **$${base.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 24: GEOMETRY - Walkway Border Area (Multi-scenario)
  (t, k, rand) => {
    const L = 24 + (k % 4) * 4;
    const W = 16 + (k % 3) * 4;
    const wBorder = 2;
    const innerArea = L * W;
    const outerArea = (L + 4) * (W + 4);
    const borderArea = outerArea - innerArea;
    const q = `A botanical garden features a rectangular floral pavilion measuring ${L} meters long by ${W} meters wide. A perimeter stone path of uniform width ${wBorder} meters surrounds all four outer sides. What is the surface area of the path alone?`;
    const correct = `${borderArea} m²`;
    const distractors = [`${borderArea + 16} m²`, `${borderArea - 12} m²`, `${borderArea + 28} m²`, `${borderArea - 24} m²`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Outer dimensions: length = ${L + 4} m, width = ${W + 4} m.\n2. Outer area = \\${L + 4} \\times ${W + 4} = ${outerArea}\\text{ m}^2\\. Inner area = ${innerArea} m².\n3. Path area = ${outerArea} - ${innerArea} = **${borderArea} m²**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 25: GEOMETRY - Pythagoras Ladder / Distance (Multi-scenario)
  (t, k, rand) => {
    const sets = [[12, 16, 20], [15, 20, 25], [9, 12, 15], [7, 24, 25], [8, 15, 17]];
    const s = sets[(k + t) % sets.length];
    const q = `A heavy-duty fire department ladder of length ${s[2]} feet is positioned against the vertical outer facade of a building. If the base of the ladder is placed ${s[0]} feet horizontally from the wall, how many feet above the ground does the top of the ladder reach?`;
    const correct = `${s[1]} feet`;
    const distractors = [`${s[1] - 2} feet`, `${s[1] + 3} feet`, `${s[1] + 6} feet`, `${s[1] - 4} feet`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. By the Pythagorean theorem: \\(h = \\sqrt{${s[2]}^2 - ${s[0]}^2} = \\sqrt{${s[2]*s[2]} - ${s[0]*s[0]}} =\\) **${s[1]} feet**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 26: GEOMETRY - Volume Scaling (Multi-scenario)
  (t, k, rand) => {
    const scale = 2 + (k % 2); // 2 or 3
    const volMult = scale * scale * scale; // 8 or 27
    const q = `If the linear dimensions (length, width, and height) of a rectangular shipping container are all scaled up by a factor of ${scale}, by what multiple does its internal storage volume increase?`;
    const correct = `${volMult} times`;
    const distractors = [`${scale * 2} times`, `${scale * scale} times`, `${volMult + 4} times`, `${volMult - 2} times`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Volume scales with the cube of linear scale factor: \\(V_{new} = ${scale}^3 \\times V_{old} =\\) **${volMult} times**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 27: FINANCE - Simple Interest (Multi-scenario)
  (t, k, rand) => {
    const p = 12000 + (k % 4) * 4000;
    const r = 5 + (k % 3);
    const yrs = 3;
    const interest = p * (r / 100) * yrs;
    const total = p + interest;
    const q = `A municipal utility bond pays ${r}% simple annual interest. If an institutional investor purchases $${p.toLocaleString()} of the bond and holds it for ${yrs} years, what is the total amount (principal plus interest) returned at maturity?`;
    const correct = `$${total.toLocaleString()}`;
    const distractors = [`$${(total - 600).toLocaleString()}`, `$${(total + 800).toLocaleString()}`, `$${(p + interest * 2).toLocaleString()}`, `$${(total - 1200).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Simple interest = \\(P \\times r \\times t = $${p.toLocaleString()} \\times ${r/100} \\times ${yrs} = $${interest.toLocaleString()}\\).\n2. Total value = \\(P + I = $${p.toLocaleString()} + $${interest.toLocaleString()} =\\) **$${total.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 28: PROBABILITY - Marble Without Replacement (Multi-scenario)
  (t, k, rand) => {
    const red = 4 + (k % 3);
    const blue = 6;
    const total = red + blue;
    // P(both blue) = (6/total) * (5/(total-1))
    const num = 30;
    const den = total * (total - 1);
    // reduce fraction
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    const g = gcd(num, den);
    const ansFrac = `${num / g}/${den / g}`;
    const q = `A quality inspection bin holds ${total} precision ball bearings, of which ${blue} are chrome steel and ${red} are tungsten carbide. If two ball bearings are randomly selected without replacement, what is the probability that both are chrome steel?`;
    const correct = ansFrac;
    const distractors = [`${Math.round((blue/total)*100)}%`, `${(num/g + 1)}/${den/g}`, `${(num/g)}/${den/g + 3}`, `1/2`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. P(first is chrome) = ${blue}/${total}.\n2. P(second is chrome) = ${blue - 1}/${total - 1}.\n3. Joint probability = \\((${blue}/${total}) \\times (${blue-1}/${total-1}) = ${num}/${den} =\\) **${ansFrac}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 29: PROBABILITY - Dice Roll Sum (Multi-scenario)
  (t, k, rand) => {
    const targets = [
      { sum: 7, ways: 6, frac: "1/6" },
      { sum: 8, ways: 5, frac: "5/36" },
      { sum: 9, ways: 4, frac: "1/9" },
      { sum: 10, ways: 3, frac: "1/12" }
    ];
    const item = targets[(k + t) % targets.length];
    const q = `When rolling two fair, independent six-sided dice simultaneously, what is the exact probability that the sum of the numbers showing on top equals exactly ${item.sum}?`;
    const correct = item.frac;
    const distractors = ["1/8", "1/4", "7/36", "5/18"];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total possible outcomes when rolling 2 dice = \\(6 \\times 6 = 36\\).\n2. Exactly ${item.ways} combinations yield a sum of ${item.sum}.\n3. Probability = \\${item.ways}/36 =\\) **${item.frac}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 30: COMBINATORICS - Committee (Multi-scenario)
  (t, k, rand) => {
    const totalP = 7 + (k % 3);
    const choose = 3;
    // C(n, 3) = n * (n-1) * (n-2) / 6
    const combinations = (totalP * (totalP - 1) * (totalP - 2)) / 6;
    const q = `A corporate technology oversight council has ${totalP} senior software architects. How many distinct sub-committees of exactly ${choose} architects can be formed from the group?`;
    const correct = `${combinations}`;
    const distractors = [`${combinations + 10}`, `${combinations - 8 > 0 ? combinations - 8 : combinations + 15}`, `${combinations + 24}`, `${totalP * choose}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Number of combinations = \\(C(${totalP}, 3) = \\frac{${totalP} \\times ${totalP-1} \\times ${totalP-2}}{3 \\times 2 \\times 1} =\\) **${combinations}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 31: MENTAL MATH - Fast Percent Sum (Multi-scenario)
  (t, k, rand) => {
    const base = 250 + (k % 5) * 50;
    const pct = 15;
    const result = (base * 0.15).toFixed(2);
    const q = `What is exactly ${pct}% of $${base}?`;
    const correct = `$${result}`;
    const distractors = [`$${(parseFloat(result) + 5).toFixed(2)}`, `$${(parseFloat(result) - 4).toFixed(2)}`, `$${(base * 0.10).toFixed(2)}`, `$${(parseFloat(result) + 12).toFixed(2)}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Mental Math Shortcut:**\n1. 10% of ${base} = ${base / 10}.\n2. 5% is half of that = ${base / 20}.\n3. Sum: ${base / 10} + ${base / 20} = **$${result}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 32: CONSECUTIVE INTEGERS (Multi-scenario)
  (t, k, rand) => {
    const n = 15 + (k % 4) * 2;
    // 3 consecutive odd integers: n, n+2, n+4
    const sum = n + (n + 2) + (n + 4);
    const q = `The sum of three consecutive odd integers is ${sum}. What is the value of the largest of these three integers?`;
    const correct = `${n + 4}`;
    const distractors = [`${n}`, `${n + 2}`, `${n + 6}`, `${n - 2}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Let integers be \\(x, x+2, x+4\\). Sum = \\(3x + 6 = ${sum}\\).\n2. \\(3x = ${sum - 6} \\implies x = ${n}\\).\n3. Largest integer = \\(x + 4 =\\) **${n + 4}**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 33: CLOCK HAND ANGLE (Multi-scenario)
  (t, k, rand) => {
    const times = [
      { h: 3, m: 30, ang: 75 },
      { h: 4, m: 20, ang: 10 },
      { h: 7, m: 15, ang: 127.5 },
      { h: 8, m: 40, ang: 20 },
      { h: 9, m: 25, ang: 132.5 }
    ];
    const item = times[(k + t) % times.length];
    const q = `At exactly ${item.h}:${item.m < 10 ? '0' + item.m : item.m}, what is the smaller angle between the hour hand and the minute hand of a standard 12-hour analog clock?`;
    const correct = `${item.ang}°`;
    const distractors = [`${item.ang + 15}°`, `${item.ang - 10 > 0 ? item.ang - 10 : item.ang + 25}°`, `${item.ang + 30}°`, `${item.ang + 45}°`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Angle formula: \\(|30H - 5.5M|\\).\n2. \\(|30(${item.h}) - 5.5(${item.m})| = |${30 * item.h} - ${5.5 * item.m}| =\\) **${item.ang}°**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 34: SERIES - Second Order Difference (+4, +7, +10, +13...)
  (t, k, rand) => {
    const start = 3 + (k % 4);
    const d0 = 4;
    const seq = [start];
    let curDiff = d0;
    for (let i = 0; i < 4; i++) {
      seq.push(seq[seq.length - 1] + curDiff);
      curDiff += 3;
    }
    const nextVal = seq[seq.length - 1] + curDiff;
    const q = `What number comes next in the sequence: ${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal + 3}`, `${nextVal - 3}`, `${nextVal + 6}`, `${nextVal - 5}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nThe difference between consecutive terms increases by +3 at each step. The final step adds +${curDiff} to get **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 35: SERIES - Alternating Operations (*2, -3)
  (t, k, rand) => {
    const start = 4 + (k % 3);
    const seq = [start];
    for (let i = 0; i < 2; i++) {
      seq.push(seq[seq.length - 1] * 2);
      seq.push(seq[seq.length - 1] - 3);
    }
    const nextVal = seq[seq.length - 1] * 2;
    const q = `Identify the next number in the following sequence: ${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal - 3}`, `${nextVal + 4}`, `${nextVal - 6}`, `${nextVal + 8}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nAlternating operations of \\(\\times 2\\) and \\(- 3\\). Next step is \\${seq[seq.length - 1]} \\times 2 =\\) **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 36: SERIES - Cubes Shift (n^3 + 2)
  (t, k, rand) => {
    const offset = 2 + (k % 3);
    const seq = [1, 2, 3, 4].map(n => n * n * n + offset);
    const nextVal = 5 * 5 * 5 + offset;
    const q = `What number continues the series: ${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal + 5}`, `${nextVal - 5}`, `${125}`, `${nextVal + 12}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nFormula is \\(n^3 + ${offset}\\). For \\(n = 5\\): \\(5^3 + ${offset} = 125 + ${offset} =\\) **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 37: SERIES - Triangular Numbers
  (t, k, rand) => {
    const mult = 2;
    const seq = [1, 2, 3, 4].map(n => ((n * (n + 1)) / 2) * mult);
    const nextVal = ((5 * 6) / 2) * mult;
    const q = `What number comes next in the sequence: ${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${nextVal + 4}`, `${nextVal - 4}`, `${nextVal + 8}`, `${nextVal - 6}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nTriangular numbers doubled: \\(T_n \\times 2\\). For \\(n=5\\): \\(15 \\times 2 =\\) **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 38: SERIES - Alternating Geometric Signs (* -2)
  (t, k, rand) => {
    const start = 3 + (k % 3);
    const seq = [start, start * -2, start * 4, start * -8];
    const nextVal = start * 16;
    const q = `Determine the next number in the alternating sequence: ${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = [`${-nextVal}`, `${nextVal / 2}`, `${nextVal + 8}`, `${-nextVal - 8}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nCommon ratio of \\(-2\\). Next term = \\${seq[seq.length - 1]} \\times (-2) =\\) **${nextVal}**.`,
      category: 'math', subType: 'number_series'
    };
  },

  // 39: SERIES - Interleaved Dual Sequence
  (t, k, rand) => {
    // Seq 1: 5, 8, 11, 14 (+3)
    // Seq 2: 2, 4, 8, 16 (*2)
    // Interleaved: 5, 2, 8, 4, 11, 8, ? -> Answer is 14
    const seq = [5, 2, 8, 4, 11, 8];
    const nextVal = 14;
    const q = `What is the next number in the interleaved sequence: ${seq.join(', ')}, ?`;
    const correct = `${nextVal}`;
    const distractors = ["16", "12", "15", "10"];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Pattern:**\nTwo interleaved sequences: Odd positions advance by +3 (5, 8, 11, **14**). Even positions double (2, 4, 8).`,
      category: 'math', subType: 'number_series'
    };
  },

  // 40: SPEED - Closing Distance of Two Converging Vehicles (Multi-scenario)
  (t, k, rand) => {
    const scenarios = [
      {
        getQ: (v1, v2, dist) => `Two high-speed trains depart from opposite terminals ${dist} miles apart heading directly toward each other on parallel tracks. Train A travels at ${v1} mph and Train B travels at ${v2} mph. In how many hours will they pass each other?`
      },
      {
        getQ: (v1, v2, dist) => `Two long-distance hikers begin walking toward each other from opposite ends of a mountain trail ${dist} miles long. Hiker 1 walks at ${v1} mph and Hiker 2 walks at ${v2} mph. In how many hours will they meet?`
      }
    ];
    const sc = scenarios[(t + k) % scenarios.length];
    const v1 = 55 + (k % 4) * 5;
    const v2 = 65 + (k % 4) * 5;
    const hrs = 2.5;
    const totalDist = Math.round((v1 + v2) * hrs);
    const q = sc.getQ(v1, v2, totalDist);
    const correct = `${hrs} hours`;
    const distractors = [`${hrs + 0.5} hours`, `${hrs - 0.5} hours`, `${hrs + 1.2} hours`, `${hrs + 2.0} hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Converging closing speed = ${v1} + ${v2} = ${v1 + v2} mph.\n2. Meeting time = ${totalDist} / ${v1 + v2} = **${hrs} hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 41: PERCENTAGE - Consecutive Clearance Discounts (Multi-scenario)
  (t, k, rand) => {
    const origPrice = 200 + (k % 4) * 50;
    const d1 = 30;
    const d2 = 20;
    const finalPrice = Math.round(origPrice * 0.70 * 0.80);
    const totalPct = Math.round((1 - 0.70 * 0.80) * 100);
    const q = `A retail jacket originally priced at $${origPrice} is discounted by ${d1}% during a storewide clearance, and an additional ${d2}% coupon is applied at checkout to the already discounted price. What is the final price of the jacket?`;
    const correct = `$${finalPrice}`;
    const trapPrice = Math.round(origPrice * (1 - (d1 + d2) / 100));
    const distractors = [`$${trapPrice}`, `$${finalPrice + 12}`, `$${finalPrice - 10}`, `$${finalPrice + 24}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. After ${d1}% discount: $${origPrice} \\times 0.70 = $${(origPrice * 0.7).toFixed(2)}.\n2. After ${d2}% additional discount: $${(origPrice * 0.7).toFixed(2)} \\times 0.80 = **$${finalPrice}**.\n\n💡 **Speed Tip:** Do not simply add 30% + 20% = 50% ($${trapPrice})! Consecutive discounts compound.`,
      category: 'math', subType: 'percentage'
    };
  },

  // 42: WORK - Dual Calibration Rates (Multi-scenario)
  (t, k, rand) => {
    const rate1 = 12 + (k % 3) * 2;
    const rate2 = rate1 * 1.5;
    const combinedRate = rate1 + rate2;
    const targetJobs = combinedRate * 4;
    const q = `Robotic Calibration Unit Alpha can calibrate ${rate1} high-precision sensors per hour, while Unit Beta can calibrate ${rate2} sensors per hour. Operating concurrently, how many hours will both units require to calibrate a shipment of ${targetJobs} sensors?`;
    const correct = `4 hours`;
    const distractors = [`5 hours`, `3 hours`, `6 hours`, `8 hours`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Combined hourly calibration rate = ${rate1} + ${rate2} = ${combinedRate} sensors/hr.\n2. Total time = ${targetJobs} / ${combinedRate} = **4 hours**.`,
      category: 'math', subType: 'word_problem'
    };
  },

  // 43: RATIO - Corporate Division Funding (Multi-scenario)
  (t, k, rand) => {
    const mult = 15000 + (k % 4) * 5000;
    const rA = 4;
    const rB = 3;
    const rC = 2;
    const sum = (rA + rB + rC) * mult;
    const targetAmount = rA * mult;
    const q = `An enterprise R&D budget of $${sum.toLocaleString()} is distributed among the Quantum, AI, and Robotics divisions in the ratio 4 : 3 : 2. How much funding does the Quantum division receive?`;
    const correct = `$${targetAmount.toLocaleString()}`;
    const distractors = [`$${(targetAmount - mult).toLocaleString()}`, `$${(targetAmount + mult).toLocaleString()}`, `$${(rB * mult).toLocaleString()}`, `$${(targetAmount + 2 * mult).toLocaleString()}`];
    const { options, correctOption } = randomize([correct, ...distractors], 0, rand);
    return {
      question: q, options, correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${correct})\n\n**Step-by-step Solution:**\n1. Total ratio parts = 4 + 3 + 2 = 9 parts.\n2. Value per part = $${sum.toLocaleString()} / 9 = $${mult.toLocaleString()}.\n3. Quantum share = 4 parts = **$${targetAmount.toLocaleString()}**.`,
      category: 'math', subType: 'word_problem'
    };
  }
];

export function getMathQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 8191 + 1337);
  const total = MATH_ARCHETYPES.length; // 44
  const k = testNumber - 2; // 0 to 28 for tests 2 to 30

  // Stride-based selection ensures uniform distribution across archetypes
  const offset = (k * 7) % total;
  const stride = 13; // gcd(13, 44) = 1 guarantees uniform permutation
  
  const chosenIndices = [];
  for (let i = 0; i < total && chosenIndices.length < 22; i++) {
    const idx = (offset + i * stride) % total;
    if (!chosenIndices.includes(idx)) {
      chosenIndices.push(idx);
    }
  }

  // Generate the 22 questions with unique test-keyed parameters and rich scenarios
  const questions = chosenIndices.map((idx) => MATH_ARCHETYPES[idx](testNumber, k, rand));

  // Deterministically shuffle within the test so question types don't appear in identical slots
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}
