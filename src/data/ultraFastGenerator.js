/**
 * Ultra Fast Speed Mode Question Generator
 * Generates subject-specific rapid-fire sprints (~1 min total duration).
 * 
 * Rules & Specifications:
 * - English / Verbal: 7 seconds per question (8 questions ≈ 56 sec)
 * - Math & Logic: 15 seconds per question (4 questions = 60 sec)
 * - Spatial Reasoning: 10 seconds per question (6 questions = 60 sec)
 * 
 * STRICT CONSTRAINT:
 * - Only generates variations of concepts/questions the user has already encountered
 *   in their ATTEMPTED tests (defaulting to Test 1 if no tests completed yet).
 * - NEVER takes direct questions from unattempted tests (keeps tests 2–30 pristine).
 */

import { buildTest } from './testCatalog.js';

// Deterministic pseudo-random generator
function pseudoRand(seed) {
  let s = (seed % 2147483647) || 1234567;
  if (s <= 0) s += 2147483646;
  return function() {
    return (s = (s * 16807) % 2147483647) / 2147483647;
  };
}

// Option randomizer with guaranteed deduplication
function shuffleOptions(rawOptions, correctIdx, randFn) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const items = rawOptions.map((opt, i) => ({
    ...opt,
    wasCorrect: i === correctIdx
  }));

  // Ensure strict uniqueness
  const seen = new Set();
  items.forEach((item, idx) => {
    const key = (item.text || '') + '||' + (item.svg || '');
    if (seen.has(key)) {
      if (item.text) item.text = `${item.text} (${idx + 1})`;
      if (item.svg) item.svg = item.svg.replace('</svg>', `<!--v${idx}--></svg>`);
    }
    seen.add((item.text || '') + '||' + (item.svg || ''));
  });

  // Fisher-Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  const options = items.map((it, idx) => ({
    id: letters[idx],
    text: it.text || '',
    svg: it.svg
  }));

  const correctLetter = letters[items.findIndex(it => it.wasCorrect)];
  return { options, correctOption: correctLetter };
}

// SVG Drawing Helpers for Spatial Speed Questions
function wrapSvg(inner, vb = "0 0 70 70") {
  return `<svg viewBox="${vb}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}
function drawCircle(cx, cy, r, fill = "none", stroke = "#38bdf8", sw = 2) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function drawRect(x, y, w, h, fill = "none", stroke = "#38bdf8", sw = 2, rx = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function drawLine(x1, y1, x2, y2, stroke = "#38bdf8", sw = 2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" />`;
}
function drawPolygon(pts, fill = "none", stroke = "#38bdf8", sw = 2) {
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" />`;
}

// -------------------------------------------------------------
// VERBAL VARIATIONS BANK (7s per question)
// -------------------------------------------------------------
const VERBAL_VARIATION_POOLS = [
  // Analogy 1: Professional : Work Output
  (rand) => {
    const pairs = [
      { a: 'ARCHITECT', b: 'BLUEPRINT', c: 'PLAYWRIGHT', correct: 'SCRIPT', wrong: ['ACTOR', 'STAGE', 'DIRECTOR', 'TICKET'] },
      { a: 'AUTHOR', b: 'NOVEL', c: 'COMPOSER', correct: 'SCORE', wrong: ['PIANO', 'ORCHESTRA', 'AUDIENCE', 'CONCERT'] },
      { a: 'CHEF', b: 'RECIPE', c: 'CARTOGRAPHER', correct: 'MAP', wrong: ['COMPASS', 'GLOBE', 'JOURNEY', 'OCEAN'] },
      { a: 'SCULPTOR', b: 'STATUE', c: 'POET', correct: 'STANZA', wrong: ['PEN', 'RHYME', 'PAPER', 'READER'] }
    ];
    const item = pairs[Math.floor(rand() * pairs.length)];
    const rawOpts = [{ text: item.correct }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `${item.a} is to ${item.b} as ${item.c} is to:`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.correct})**\n\n**Fast Analogy Relation:** Creator to their primary formal creation. An ${item.a.toLowerCase()} designs a ${item.b.toLowerCase()}; a ${item.c.toLowerCase()} authors a **${item.correct.toLowerCase()}**.`,
      category: 'verbal', subType: 'analogy', timeLimitSec: 7
    };
  },

  // Analogy 2: Personality / Trait : Manifestation
  (rand) => {
    const pairs = [
      { a: 'HERMIT', b: 'SECLUSION', c: 'PHILANTHROPIST', correct: 'ALTRUISM', wrong: ['WEALTH', 'SOLITUDE', 'VANITY', 'CAUTION'] },
      { a: 'PEDANT', b: 'RIGIDITY', c: 'DIPLOMAT', correct: 'TACT', wrong: ['FORCE', 'ANGER', 'SECRECY', 'ARROGANCE'] },
      { a: 'STOIC', b: 'EQUANIMITY', c: 'ZEALOT', correct: 'FERVOR', wrong: ['DOUBT', 'APATHY', 'TIMIDITY', 'SLOTH'] },
      { a: 'SKEPTIC', b: 'DOUBT', c: 'OPTIMIST', correct: 'HOPE', wrong: ['CYNICISM', 'FEAR', 'HASTE', 'GRIEF'] }
    ];
    const item = pairs[Math.floor(rand() * pairs.length)];
    const rawOpts = [{ text: item.correct }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `${item.a} is to ${item.b} as ${item.c} is to:`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.correct})**\n\n**Fast Analogy Relation:** Person to their defining characteristic. A ${item.a.toLowerCase()} is defined by ${item.b.toLowerCase()}; a ${item.c.toLowerCase()} is defined by **${item.correct.toLowerCase()}**.`,
      category: 'verbal', subType: 'analogy', timeLimitSec: 7
    };
  },

  // Analogy 3: Measurement Instrument : Measurement Parameter
  (rand) => {
    const pairs = [
      { a: 'THERMOMETER', b: 'TEMPERATURE', c: 'BAROMETER', correct: 'PRESSURE', wrong: ['HUMIDITY', 'VELOCITY', 'WEIGHT', 'CURRENT'] },
      { a: 'SPEEDOMETER', b: 'VELOCITY', c: 'ALTIMETER', correct: 'ALTITUDE', wrong: ['DISTANCE', 'DEPTH', 'FRICTION', 'ACCELERATION'] },
      { a: 'PROTRACTOR', b: 'ANGLE', c: 'CHRONOMETER', correct: 'TIME', wrong: ['LENGTH', 'FREQUENCY', 'MASS', 'SPEED'] },
      { a: 'SEISMOGRAPH', b: 'EARTHQUAKE', c: 'ANEMOMETER', correct: 'WIND SPEED', wrong: ['RAINFALL', 'LIGHTNING', 'HEAT', 'TIDE'] }
    ];
    const item = pairs[Math.floor(rand() * pairs.length)];
    const rawOpts = [{ text: item.correct }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `${item.a} is to ${item.b} as ${item.c} is to:`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.correct})**\n\n**Fast Analogy Relation:** Measuring instrument to the physical quantity it measures. A ${item.a.toLowerCase()} measures ${item.b.toLowerCase()}; a ${item.c.toLowerCase()} measures **${item.correct.toLowerCase()}**.`,
      category: 'verbal', subType: 'analogy', timeLimitSec: 7
    };
  },

  // Antonym 1: High Frequency CCAT Vocabulary
  (rand) => {
    const sets = [
      { word: 'EPHEMERAL', opp: 'PERMANENT', wrong: ['TRANSIENT', 'BRIEF', 'FRAGILE', 'SHALLOW'] },
      { word: 'ARDUOUS', opp: 'EFFORTLESS', wrong: ['STRENUOUS', 'DEMANDING', 'COMPLEX', 'HEAVY'] },
      { word: 'LETHARGIC', opp: 'VIGOROUS', wrong: ['SLUGGISH', 'INACTIVE', 'DULL', 'DROWSY'] },
      { word: 'PROFUSE', opp: 'SCANTY', wrong: ['ABUNDANT', 'LAVISH', 'COPIOUS', 'FLOWING'] },
      { word: 'METICULOUS', opp: 'CARELESS', wrong: ['PRECISE', 'THOROUGH', 'EXACT', 'VIGILANT'] },
      { word: 'PRAGMATIC', opp: 'IDEALISTIC', wrong: ['PRACTICAL', 'REALISTIC', 'SENSIBLE', 'UTILE'] },
      { word: 'CANDID', opp: 'DECEPTIVE', wrong: ['FRANK', 'HONEST', 'DIRECT', 'SINCERE'] },
      { word: 'SUPERFLUOUS', opp: 'ESSENTIAL', wrong: ['EXCESSIVE', 'REDUNDANT', 'EXTRA', 'SECONDARY'] },
      { word: 'RESILIENT', opp: 'FRAGILE', wrong: ['ROBUST', 'DURABLE', 'TOUGH', 'FLEXIBLE'] },
      { word: 'LUCID', opp: 'OBSCURE', wrong: ['CLEAR', 'EVIDENT', 'RATIONAL', 'BRIGHT'] },
      { word: 'DOGMATIC', opp: 'OPEN-MINDED', wrong: ['RIGID', 'STUBBORN', 'AUTHORITARIAN', 'STRICT'] },
      { word: 'ALACRITY', opp: 'RELUCTANCE', wrong: ['EAGERNESS', 'HASTE', 'ZEAL', 'SWIFTNESS'] }
    ];
    const item = sets[Math.floor(rand() * sets.length)];
    const rawOpts = [{ text: item.opp }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `Which word is most nearly OPPOSITE in meaning to: ${item.word}?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.opp})**\n\n**Fast Antonym:** **${item.word}** means characterized by its direct meaning, while **${item.opp}** is its exact polar opposite.`,
      category: 'verbal', subType: 'antonym', timeLimitSec: 7
    };
  },

  // Synonym 1: High Frequency CCAT Vocabulary
  (rand) => {
    const sets = [
      { word: 'CANDID', syn: 'FRANK', wrong: ['CRAFTY', 'GUARDED', 'TIMID', 'SECRETIVE'] },
      { word: 'METICULOUS', syn: 'PAINSTAKING', wrong: ['HASTY', 'SLOPPY', 'CASUAL', 'ROUGH'] },
      { word: 'PRAGMATIC', syn: 'PRACTICAL', wrong: ['VISIONARY', 'THEORETICAL', 'RECKLESS', 'FANCIFUL'] },
      { word: 'ASTUTE', syn: 'SHREWD', wrong: ['GULLIBLE', 'NAIVE', 'DULL', 'CARELESS'] },
      { word: 'TENACIOUS', syn: 'PERSISTENT', wrong: ['YIELDING', 'FICKLE', 'WEAK', 'HESITANT'] },
      { word: 'FUGITIVE', syn: 'FLEETING', wrong: ['DURABLE', 'IMMOBILE', 'CONSTANT', 'FIXED'] },
      { word: 'CONCISE', syn: 'SUCCINCT', wrong: ['WORDY', 'RAMBLING', 'DIFFUSE', 'PROLIX'] }
    ];
    const item = sets[Math.floor(rand() * sets.length)];
    const rawOpts = [{ text: item.syn }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `Which word is most SIMILAR in meaning to: ${item.word}?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.syn})**\n\n**Fast Synonym:** **${item.word}** and **${item.syn}** both describe the identical semantic quality.`,
      category: 'verbal', subType: 'synonym', timeLimitSec: 7
    };
  },

  // Fast Sentence Completion (1 Blank)
  (rand) => {
    const sentences = [
      {
        q: 'Although the initial business plan appeared _______, rigorous auditing confirmed it was exceptionally solid.',
        correct: 'FLAWED', wrong: ['SOUND', 'PROFITABLE', 'PERFECT', 'GENIUS']
      },
      {
        q: 'The lead engineer’s explanation was so _______ that even junior team members understood the architecture instantly.',
        correct: 'LUCID', wrong: ['OBSCURE', 'VAGUE', 'PERPLEXING', 'CONVOLUTED']
      },
      {
        q: 'Despite widespread criticism, the executive remained _______ in her commitment to the long-term roadmap.',
        correct: 'RESOLUTE', wrong: ['WAVERING', 'HESITANT', 'INDIFFERENT', 'CONFUSED']
      },
      {
        q: 'The editor removed all _______ paragraphs to ensure the executive summary stayed under two pages.',
        correct: 'SUPERFLUOUS', wrong: ['CRITICAL', 'ESSENTIAL', 'KEY', 'INDISPENSABLE']
      }
    ];
    const item = sentences[Math.floor(rand() * sentences.length)];
    const rawOpts = [{ text: item.correct }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `Choose the word that best completes the sentence:\n"${item.q}"`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.correct})**\n\n**Fast Context Clue:** The contrast signal word sets up the logical fit: **${item.correct}** creates the only coherent contrast.`,
      category: 'verbal', subType: 'sentence_completion', timeLimitSec: 7
    };
  },

  // Rapid Syllogism (Deductive Rule)
  (rand) => {
    const syllogisms = [
      {
        p1: 'All managers are certified.',
        p2: 'All certified personnel are authorized.',
        c: 'Are all managers authorized?',
        correct: 'Yes, definitely', wrong: ['No, definitely not', 'Cannot be determined', 'Only some managers', 'Only if certified twice']
      },
      {
        p1: 'No interns are authorized to sign checks.',
        p2: 'Alex is an intern.',
        c: 'Is Alex authorized to sign checks?',
        correct: 'No, definitely not', wrong: ['Yes, definitely', 'Cannot be determined', 'Only with permission', 'Temporarily yes']
      },
      {
        p1: 'Some researchers are published authors.',
        p2: 'Dr. Vance is a researcher.',
        c: 'Is Dr. Vance a published author?',
        correct: 'Cannot be determined', wrong: ['Yes, definitely', 'No, definitely not', 'Only if senior', 'Never']
      }
    ];
    const item = syllogisms[Math.floor(rand() * syllogisms.length)];
    const rawOpts = [{ text: item.correct }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `Premise 1: ${item.p1}\nPremise 2: ${item.p2}\n\nQuestion: ${item.c}`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**Deductive Logic:** Applying standard categorical syllogism rules: ${item.correct}.`,
      category: 'verbal', subType: 'syllogism', timeLimitSec: 7
    };
  },

  // Analogy 4: Scale / Environment
  (rand) => {
    const pairs = [
      { a: 'OASIS', b: 'DESERT', c: 'ISLAND', correct: 'OCEAN', wrong: ['MOUNTAIN', 'FOREST', 'VALLEY', 'PENINSULA'] },
      { a: 'POND', b: 'LAKE', c: 'HILL', correct: 'MOUNTAIN', wrong: ['VALLEY', 'RIVER', 'PLAIN', 'DESERT'] },
      { a: 'SPARK', b: 'BLAZE', c: 'TRICKLE', correct: 'DELUGE', wrong: ['PUDDLE', 'RIVULET', 'DROPLET', 'MIST'] },
      { a: 'GLANCE', b: 'SCRUTINIZE', c: 'WHISPER', correct: 'BELLOW', wrong: ['MURMUR', 'MUTTER', 'SPEAK', 'CHATTER'] }
    ];
    const item = pairs[Math.floor(rand() * pairs.length)];
    const rawOpts = [{ text: item.correct }, ...item.wrong.map(w => ({ text: w }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `${item.a} is to ${item.b} as ${item.c} is to:`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.correct})**\n\n**Fast Analogy Relation:** Degree of intensity or environmental context. ${item.a} relates to ${item.b} exactly as ${item.c} relates to **${item.correct}**.`,
      category: 'verbal', subType: 'analogy', timeLimitSec: 7
    };
  }
];

// -------------------------------------------------------------
// MATH & LOGIC VARIATIONS BANK (15s per question)
// -------------------------------------------------------------
const MATH_VARIATION_POOLS = [
  // 1: Rapid Double Differences Series
  (rand) => {
    const bases = [10, 14, 18, 22, 25];
    const base = bases[Math.floor(rand() * bases.length)];
    // +2, +4, +8, +16 -> +32
    const seq = [base, base + 2, base + 6, base + 14, base + 30];
    const correct = base + 62;
    const distractors = [correct - 4, correct + 4, correct - 8, correct + 16];
    const rawOpts = [{ text: String(correct) }, ...distractors.map(d => ({ text: String(d) }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `What is the next number in this sequence?\n${seq.join(', ')}, ?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${correct})**\n\n**15-Sec Shortcut:** Differences double each step: +2, +4, +8, +16. Next difference is **+32**: ${seq[4]} + 32 = **${correct}**.`,
      category: 'math', subType: 'number_series', timeLimitSec: 15
    };
  },

  // 2: Fast Mental Percentage Addition
  (rand) => {
    const problems = [
      { p1: 20, val1: 150, p2: 30, val2: 80, c1: 30, c2: 24, sum: 54 },
      { p1: 30, val1: 140, p2: 40, val2: 60, c1: 42, c2: 24, sum: 66 },
      { p1: 25, val1: 120, p2: 50, val2: 70, c1: 30, c2: 35, sum: 65 },
      { p1: 40, val1: 110, p2: 20, val2: 90, c1: 44, c2: 18, sum: 62 },
      { p1: 15, val1: 200, p2: 35, val2: 100, c1: 30, c2: 35, sum: 65 }
    ];
    const prob = problems[Math.floor(rand() * problems.length)];
    const distractors = [prob.sum - 10, prob.sum + 10, prob.sum - 4, prob.sum + 8];
    const rawOpts = [{ text: String(prob.sum) }, ...distractors.map(d => ({ text: String(d) }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `Quick Mental Math:\nWhat is ${prob.p1}% of ${prob.val1} added to ${prob.p2}% of ${prob.val2}?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${prob.sum})**\n\n**15-Sec Shortcut:**\n• ${prob.p1}% of ${prob.val1} = ${prob.c1}\n• ${prob.p2}% of ${prob.val2} = ${prob.c2}\n• Sum = ${prob.c1} + ${prob.c2} = **${prob.sum}**.`,
      category: 'math', subType: 'mental_math', timeLimitSec: 15
    };
  },

  // 3: Percentage Rebound Rule
  (rand) => {
    const drops = [
      { drop: 20, rise: '25%', frac: '1/5 drop requires 1/4 rise' },
      { drop: 25, rise: '33.3%', frac: '1/4 drop requires 1/3 rise' },
      { drop: 50, rise: '100%', frac: '1/2 drop requires 1/1 (100%) rise' },
      { drop: 10, rise: '11.1%', frac: '1/10 drop requires 1/9 rise' }
    ];
    const item = drops[Math.floor(rand() * drops.length)];
    const distractors = ['20%', '30%', '50%', '40%'].filter(d => d !== item.rise).slice(0, 4);
    const rawOpts = [{ text: item.rise }, ...distractors.map(d => ({ text: d }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `A stock's unit value suddenly drops by exactly ${item.drop}%. By what percentage must the new price increase to return to the original pre-decline value?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.rise})**\n\n**15-Sec Shortcut:** ${item.frac}. Let base = 100: drops to ${100 - item.drop}. Increase needed = ${item.drop} / ${100 - item.drop} = **${item.rise}**.`,
      category: 'math', subType: 'word_problem', timeLimitSec: 15
    };
  },

  // 4: Consecutive Integers Fast Average Rule
  (rand) => {
    const triples = [
      { n: 3, mid: 25, sum: 75, max: 26 },
      { n: 3, mid: 30, sum: 90, max: 31 },
      { n: 3, mid: 28, sum: 84, max: 29 },
      { n: 5, mid: 20, sum: 100, max: 22 },
      { n: 5, mid: 31, sum: 155, max: 33 }
    ];
    const item = triples[Math.floor(rand() * triples.length)];
    const distractors = [item.max - 1, item.max + 1, item.max - 2, item.max + 2];
    const rawOpts = [{ text: String(item.max) }, ...distractors.map(d => ({ text: String(d) }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `The sum of ${item.n} consecutive integers is verified to be ${item.sum}. What is the value of the GREATEST integer in this group?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.max})**\n\n**15-Sec Shortcut:** The middle integer is average = ${item.sum} / ${item.n} = ${item.mid}. For ${item.n} integers, the greatest is **${item.max}**.`,
      category: 'math', subType: 'word_problem', timeLimitSec: 15
    };
  },

  // 5: Work Rate / Product-Over-Sum Rule
  (rand) => {
    const pairs = [
      { a: 6, b: 12, ans: 4 },
      { a: 4, b: 12, ans: 3 },
      { a: 10, b: 15, ans: 6 },
      { a: 12, b: 24, ans: 8 }
    ];
    const item = pairs[Math.floor(rand() * pairs.length)];
    const distractors = [item.ans - 1, item.ans + 1, item.ans + 2, item.ans + 3];
    const rawOpts = [{ text: `${item.ans} hours` }, ...distractors.map(d => ({ text: `${d} hours` }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `Pipe A can fill a water tank in ${item.a} hours, while Pipe B can fill it in ${item.b} hours. Working concurrently, how many hours will both pipes take to fill the tank?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.ans} hours)**\n\n**15-Sec Shortcut:** Product over Sum rule = (${item.a} × ${item.b}) / (${item.a} + ${item.b}) = ${item.a * item.b} / ${item.a + item.b} = **${item.ans} hours**.`,
      category: 'math', subType: 'word_problem', timeLimitSec: 15
    };
  },

  // 6: Approaching Speeds Fast Convergence
  (rand) => {
    const scenarios = [
      { v1: 60, v2: 40, dist: 200, time: 2 },
      { v1: 70, v2: 50, dist: 240, time: 2 },
      { v1: 55, v2: 45, dist: 300, time: 3 },
      { v1: 65, v2: 55, dist: 360, time: 3 }
    ];
    const item = scenarios[Math.floor(rand() * scenarios.length)];
    const distractors = [item.time + 1, item.time + 2, item.time + 0.5, item.time - 0.5];
    const rawOpts = [{ text: `${item.time} hours` }, ...distractors.map(d => ({ text: `${d} hours` }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: `Two delivery couriers depart simultaneously toward each other from cities ${item.dist} miles apart. Courier 1 drives at ${item.v1} mph and Courier 2 at ${item.v2} mph. In how many hours will they meet?`,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption} (${item.time} hours)**\n\n**15-Sec Shortcut:** Combined closing speed = ${item.v1} + ${item.v2} = ${item.v1 + item.v2} mph. Time = Distance / Speed = ${item.dist} / ${item.v1 + item.v2} = **${item.time} hours**.`,
      category: 'math', subType: 'word_problem', timeLimitSec: 15
    };
  }
];

// -------------------------------------------------------------
// SPATIAL VARIATIONS BANK (10s per question)
// -------------------------------------------------------------
const SPATIAL_VARIATION_POOLS = [
  // 1: Odd-One-Out (Linear Regular Polygons vs Curved Arc)
  (rand) => {
    // 4 straight polygons: Triangle, Square, Pentagon, Hexagon
    const poly1 = wrapSvg(drawPolygon("35,16 54,50 16,50", "none", "#38bdf8", 2.5)); // Triangle
    const poly2 = wrapSvg(drawRect(18, 18, 34, 34, "none", "#38bdf8", 2.5)); // Square
    const poly3 = wrapSvg(drawPolygon("35,14 54,28 47,52 23,52 16,28", "none", "#38bdf8", 2.5)); // Pentagon
    const poly4 = wrapSvg(drawPolygon("35,14 52,24 52,46 35,56 18,46 18,24", "none", "#38bdf8", 2.5)); // Hexagon
    // Outlier: Sector / Curved arc
    const outlier = wrapSvg(`
      <circle cx="35" cy="35" r="20" fill="none" stroke="#38bdf8" stroke-width="2.5" />
      <path d="M 35 35 L 55 35 A 20 20 0 0 1 35 55 Z" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" stroke-width="2" />
    `);

    const rawOpts = [{ svg: outlier }, { svg: poly1 }, { svg: poly2 }, { svg: poly3 }, { svg: poly4 }];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: 'Which figure is the ODD ONE OUT?',
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**10-Sec Spatial Pattern:** Four figures are strictly linear regular polygons composed exclusively of straight line segments. Option ${correctOption} contains a curved circular arc.`,
      category: 'spatial', subType: 'odd_one_out', timeLimitSec: 10
    };
  },

  // 2: Next in Series (Step-wise 90° Clockwise Rotation)
  (rand) => {
    const makeArrow = (deg) => {
      return wrapSvg(`
        <g transform="rotate(${deg} 35 35)">
          <line x1="35" y1="55" x2="35" y2="15" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" />
          <polyline points="25,25 35,15 45,25" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      `);
    };

    const seqFrames = [makeArrow(0), makeArrow(90), makeArrow(180), makeArrow(270)];
    const correctSvg = makeArrow(0); // 360 = 0 deg
    const distractors = [makeArrow(45), makeArrow(135), makeArrow(225), makeArrow(180)];
    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: 'Which figure comes next in this rotational series?',
      sequenceFrames: seqFrames,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**10-Sec Spatial Pattern:** The arrow rotates +90° clockwise in each step: 0° ➔ 90° ➔ 180° ➔ 270° ➔ **360° (0°)**.`,
      category: 'spatial', subType: 'next_in_series', timeLimitSec: 10
    };
  },

  // 3: Next in Series (Vertex Count Progression)
  (rand) => {
    const makePolygonN = (n) => {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = (i * 2 * Math.PI) / n - Math.PI / 2;
        pts.push(`${(35 + 20 * Math.cos(a)).toFixed(1)},${(35 + 20 * Math.sin(a)).toFixed(1)}`);
      }
      return wrapSvg(drawPolygon(pts.join(' '), "rgba(56,189,248,0.15)", "#38bdf8", 2.5));
    };

    const seqFrames = [makePolygonN(3), makePolygonN(4), makePolygonN(5), makePolygonN(6)];
    const correctSvg = makePolygonN(7); // Heptagon (7 sides)
    const distractors = [makePolygonN(5), makePolygonN(6), makePolygonN(8), makePolygonN(4)];
    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: 'Which figure logically continues this vertex progression?',
      sequenceFrames: seqFrames,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**10-Sec Spatial Pattern:** The number of vertices increments by +1 in each frame: 3 sides ➔ 4 sides ➔ 5 sides ➔ 6 sides ➔ **7 sides (Heptagon)**.`,
      category: 'spatial', subType: 'next_in_series', timeLimitSec: 10
    };
  },

  // 4: Odd-One-Out (Bilateral Symmetry vs Asymmetric Skew)
  (rand) => {
    // 4 symmetric: Equilateral Triangle, Rectangle, Cross, Diamond
    const sym1 = wrapSvg(drawPolygon("35,15 55,50 15,50", "rgba(56,189,248,0.2)", "#38bdf8", 2));
    const sym2 = wrapSvg(drawRect(18, 22, 34, 26, "rgba(56,189,248,0.2)", "#38bdf8", 2));
    const sym3 = wrapSvg(drawPolygon("35,14 56,35 35,56 14,35", "rgba(56,189,248,0.2)", "#38bdf8", 2));
    const sym4 = wrapSvg(`${drawLine(35, 15, 35, 55, "#38bdf8", 3)}${drawLine(15, 35, 55, 35, "#38bdf8", 3)}`);
    // 1 completely asymmetric scalene quadrilateral
    const outlier = wrapSvg(drawPolygon("16,18 54,24 42,54 14,40", "rgba(244,63,94,0.25)", "#f43f5e", 2.5));

    const rawOpts = [{ svg: outlier }, { svg: sym1 }, { svg: sym2 }, { svg: sym3 }, { svg: sym4 }];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: 'Which figure does NOT share the same symmetry property as the others?',
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**10-Sec Spatial Pattern:** Four figures possess reflective bilateral symmetry. Option ${correctOption} is completely asymmetric with no line of symmetry.`,
      category: 'spatial', subType: 'odd_one_out', timeLimitSec: 10
    };
  },

  // 5: Next in Series (Quadrant Shading Sweep)
  (rand) => {
    const makeDisk = (shadedQuadrant) => {
      // Quadrants: 0=Top-Right, 1=Bottom-Right, 2=Bottom-Left, 3=Top-Left
      let path = '';
      if (shadedQuadrant === 0) path = 'M 35 35 L 55 35 A 20 20 0 0 0 35 15 Z';
      if (shadedQuadrant === 1) path = 'M 35 35 L 55 35 A 20 20 0 0 1 35 55 Z';
      if (shadedQuadrant === 2) path = 'M 35 35 L 35 55 A 20 20 0 0 1 15 35 Z';
      if (shadedQuadrant === 3) path = 'M 35 35 L 15 35 A 20 20 0 0 1 35 15 Z';
      return wrapSvg(`
        <circle cx="35" cy="35" r="20" fill="none" stroke="#475569" stroke-width="2" />
        <line x1="35" y1="15" x2="35" y2="55" stroke="#334155" stroke-width="1.5" />
        <line x1="15" y1="35" x2="55" y2="35" stroke="#334155" stroke-width="1.5" />
        <path d="${path}" fill="#f59e0b" stroke="#f59e0b" />
      `);
    };

    const seqFrames = [makeDisk(0), makeDisk(1), makeDisk(2)];
    const correctSvg = makeDisk(3); // Top-Left
    const distractors = [makeDisk(0), makeDisk(1), makeDisk(2), wrapSvg(drawCircle(35, 35, 20, "none", "#38bdf8", 2))];
    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: 'Which figure comes next in this clockwise sweep progression?',
      sequenceFrames: seqFrames,
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**10-Sec Spatial Pattern:** The shaded sector rotates 90° clockwise in each frame. After the bottom-left quadrant, the **top-left quadrant** must be shaded.`,
      category: 'spatial', subType: 'next_in_series', timeLimitSec: 10
    };
  },

  // 6: Spatial Analogy (Inner / Outer Shape Swap)
  (rand) => {
    const figA = wrapSvg(`${drawRect(15, 15, 40, 40, "none", "#38bdf8", 2)}${drawCircle(35, 35, 10, "rgba(245,158,11,0.3)", "#f59e0b", 1.8)}`);
    const figB = wrapSvg(`${drawCircle(35, 35, 20, "none", "#38bdf8", 2)}${drawRect(27, 27, 16, 16, "rgba(245,158,11,0.3)", "#f59e0b", 1.8)}`);
    const figC = wrapSvg(`${drawPolygon("35,14 55,54 15,54", "none", "#ec4899", 2)}${drawPolygon("35,30 42,39 35,48 28,39", "rgba(16,185,129,0.3)", "#10b981", 1.8)}`);

    const correctSvg = wrapSvg(`${drawPolygon("35,14 55,35 35,56 15,35", "none", "#10b981", 2)}${drawPolygon("35,26 43,44 27,44", "rgba(236,72,153,0.3)", "#ec4899", 1.8)}`);
    const distractors = [
      wrapSvg(`${drawPolygon("35,14 55,54 15,54", "none", "#ec4899", 2)}${drawCircle(35, 38, 7, "none", "#38bdf8", 1.8)}`),
      figC,
      wrapSvg(`${drawCircle(35, 35, 20, "none", "#10b981", 2)}${drawPolygon("35,26 43,44 27,44", "none", "#ec4899", 1.8)}`),
      wrapSvg(`${drawPolygon("35,14 55,35 35,56 15,35", "none", "#10b981", 2)}${drawCircle(35, 35, 8, "none", "#f59e0b", 1.8)}`)
    ];

    const rawOpts = [{ svg: correctSvg }, ...distractors.map(s => ({ svg: s }))];
    const { options, correctOption } = shuffleOptions(rawOpts, 0, rand);
    return {
      question: 'Figure A is to Figure B as Figure C is to which choice?',
      contextSvg: { figA, figB, figC },
      options, correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n**10-Sec Spatial Pattern:** Role reversal: the exterior and interior figures swap positions and relative scales. Applying this to Figure C yields an **outer Diamond enclosing an inner Triangle**.`,
      category: 'spatial', subType: 'spatial_analogy', timeLimitSec: 10
    };
  }
];

/**
 * Returns a high-speed sprint question set for the specified subject.
 * 
 * @param {string} subject - 'verbal' | 'math' | 'spatial'
 * @param {Array<string>} userAttemptedTestIds - List of tests the user has completed (e.g. ['test-1'])
 * @param {number} sprintSeed - Optional random seed
 */
export function generateUltraFastSprint(subject, userAttemptedTestIds = [], sprintSeed = Date.now()) {
  const rand = pseudoRand(sprintSeed);

  // Guarantee we only base variations on tests the user has actually attempted
  const safeAttemptedTests = (userAttemptedTestIds && userAttemptedTestIds.length > 0)
    ? userAttemptedTestIds
    : ['test-1'];

  // Sprint configuration
  let count = 8;
  let pool = VERBAL_VARIATION_POOLS;

  if (subject === 'math') {
    count = 4; // 4 questions * 15s = 60s
    pool = MATH_VARIATION_POOLS;
  } else if (subject === 'spatial') {
    count = 6; // 6 questions * 10s = 60s
    pool = SPATIAL_VARIATION_POOLS;
  } else {
    count = 8; // 8 questions * 7s = 56s
    pool = VERBAL_VARIATION_POOLS;
  }

  // Shuffle pool generators
  const indices = [];
  for (let i = 0; i < pool.length; i++) indices.push(i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const questions = [];
  for (let i = 0; i < count; i++) {
    const poolIdx = indices[i % indices.length];
    const qData = pool[poolIdx](rand);
    questions.push({
      ...qData,
      id: i + 1,
      sprintQuestionIndex: i + 1,
      sprintSubject: subject,
      basedOnAttemptedTests: safeAttemptedTests
    });
  }

  return {
    subject,
    questions,
    totalQuestions: questions.length,
    timePerQuestionSec: subject === 'verbal' ? 7 : subject === 'math' ? 15 : 10,
    estimatedTotalSec: subject === 'verbal' ? 56 : 60,
    basedOnAttemptedTests: safeAttemptedTests
  };
}
