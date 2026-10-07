import fs from 'fs';

const replacementVocab = [
  {
    word: "MUNIFICENT",
    type: "synonym",
    correct: "Generous",
    distractors: ["Miserly", "Stingy", "Parsimonious", "Greedy"],
    expl: "Munificent means characterized by great generosity."
  },
  {
    word: "TRUCULENT",
    type: "antonym",
    correct: "Peaceful",
    distractors: ["Defiant", "Aggressive", "Hostile", "Combative"],
    expl: "Truculent means eager or quick to argue or fight. Peaceful is the opposite."
  },
  {
    word: "PUERILE",
    type: "antonym",
    correct: "Mature",
    distractors: ["Childish", "Infantile", "Immature", "Juvenile"],
    expl: "Puerile means childishly silly and trivial. Mature is the opposite."
  },
  {
    word: "SOPORIFIC",
    type: "synonym",
    correct: "Sleep-inducing",
    distractors: ["Stimulating", "Invigorating", "Energizing", "Exciting"],
    expl: "Soporific means tending to induce drowsiness or sleep."
  },
  {
    word: "INCHOATE",
    type: "antonym",
    correct: "Fully-formed",
    distractors: ["Rudimentary", "Nascent", "Formless", "Unfinished"],
    expl: "Inchoate means just begun and so not fully formed or developed."
  },
  {
    word: "OBDURATE",
    type: "synonym",
    correct: "Stubborn",
    distractors: ["Compliant", "Malleable", "Submissive", "Pliable"],
    expl: "Obdurate means stubbornly refusing to change one's opinion or course of action."
  },
  {
    word: "PERFUNCTORY",
    type: "antonym",
    correct: "Thorough",
    distractors: ["Cursory", "Superficial", "Desultory", "Casual"],
    expl: "Perfunctory means carried out with a minimum of effort or reflection. Thorough is opposite."
  },
  {
    word: "SANCTIMONIOUS",
    type: "synonym",
    correct: "Self-righteous",
    distractors: ["Humble", "Modest", "Sincere", "Genuine"],
    expl: "Sanctimonious means making a hypocritical show of moral superiority."
  },
  {
    word: "TURPITUDE",
    type: "synonym",
    correct: "Depravity",
    distractors: ["Virtue", "Integrity", "Honor", "Purity"],
    expl: "Turpitude means depraved or wicked behavior or character."
  },
  {
    word: "VITRIOLIC",
    type: "antonym",
    correct: "Complimentary",
    distractors: ["Caustic", "Acerbic", "Corrosive", "Biting"],
    expl: "Vitriolic means filled with bitter criticism or malice. Complimentary is opposite."
  },
  {
    word: "DISPARATE",
    type: "antonym",
    correct: "Homogeneous",
    distractors: ["Divergent", "Dissimilar", "Contrasting", "Different"],
    expl: "Disparate means essentially different in kind; not able to be compared. Homogeneous is opposite."
  },
  {
    word: "INVIDIOUS",
    type: "synonym",
    correct: "Resentful",
    distractors: ["Pleasant", "Delightful", "Fair", "Impartial"],
    expl: "Invidious means likely to arouse or incur resentment or anger in others."
  }
];

const replacementAnalogies = [
  {
    pair: "LUMBERJACK : AXE",
    rel: "worker to primary tool",
    correct: "BARBER : SCISSORS",
    distractors: ["CARPENTER : WOOD", "FARMER : BARN", "MASON : BRICK", "DRIVER : ROAD"],
    expl: "A lumberjack primarily wields an axe; a barber primarily wields scissors."
  },
  {
    pair: "CHRONOMETER : TIME",
    rel: "measuring instrument to dimension",
    correct: "ODOMETER : DISTANCE",
    distractors: ["SCALE : POUND", "THERMOMETER : WEATHER", "BAROMETER : ALTITUDE", "COMPASS : MAP"],
    expl: "A chronometer measures time; an odometer measures distance traveled."
  },
  {
    pair: "ARBORETUM : TREES",
    rel: "specialized sanctuary to preserved subject",
    correct: "APIARY : BEES",
    distractors: ["AQUARIUM : WATER", "GARDEN : FENCE", "ORCHARD : FRUIT", "FOREST : PATH"],
    expl: "An arboretum is a dedicated sanctuary for trees; an apiary is a dedicated collection of beehives for bees."
  },
  {
    pair: "ALCHEMIST : GOLD",
    rel: "seeker to pursued object",
    correct: "PROSPECTOR : MINERALS",
    distractors: ["BLACKSMITH : IRON", "TAILOR : CLOTH", "HUNTER : TRAP", "SAILOR : OCEAN"],
    expl: "An alchemist seeks to produce gold; a prospector searches for valuable minerals."
  },
  {
    pair: "TAXONOMIST : SPECIES",
    rel: "expert classifier to categorized entity",
    correct: "GENEALOGIST : ANCESTORS",
    distractors: ["ASTRONOMER : SKY", "GEOLOGIST : FOSSIL", "HISTORIAN : BOOK", "CHEMIST : LAB"],
    expl: "A taxonomist systematically classifies biological species; a genealogist traces ancestral lineages."
  },
  {
    pair: "CULL : HERD",
    rel: "selective reduction to collection",
    correct: "WEED : GARDEN",
    distractors: ["HARVEST : CROP", "FEED : FLOCK", "WATER : LAWN", "FENCE : PASTURE"],
    expl: "To cull is to selectively remove individuals from a herd; to weed is to selectively remove unwanted plants from a garden."
  },
  {
    pair: "PLUMMET : ALTITUDE",
    rel: "rapid sharp decline to property",
    correct: "COLLAPSE : VALUE",
    distractors: ["ASCEND : HEIGHT", "DRIFT : CURRENT", "SOAR : SKY", "HOVER : LEVEL"],
    expl: "To plummet is to experience a steep plunge in altitude; to collapse is to experience a steep plunge in economic value."
  },
  {
    pair: "TRIATHLETE : ENDURANCE",
    rel: "specialist to requisite physical attribute",
    correct: "ACROBAT : FLEXIBILITY",
    distractors: ["BOXER : GLOVES", "RUNNER : TRACK", "SWIMMER : WATER", "COACH : WHISTLE"],
    expl: "A triathlete critically relies on endurance; an acrobat critically relies on flexibility."
  }
];

import { VOCAB_BANK, ANALOGY_BANK } from '../src/data/verbalBank.js';

// Find duplicate words and replace
const seenVocab = new Set();
let rVIdx = 0;
for (let i = 0; i < VOCAB_BANK.length; i++) {
  if (seenVocab.has(VOCAB_BANK[i].word) && rVIdx < replacementVocab.length) {
    VOCAB_BANK[i] = replacementVocab[rVIdx++];
  }
  seenVocab.add(VOCAB_BANK[i].word);
}

// Find duplicate analogy pairs and replace
const seenAnalogy = new Set();
let rAIdx = 0;
for (let i = 0; i < ANALOGY_BANK.length; i++) {
  if (seenAnalogy.has(ANALOGY_BANK[i].pair) && rAIdx < replacementAnalogies.length) {
    ANALOGY_BANK[i] = replacementAnalogies[rAIdx++];
  }
  seenAnalogy.add(ANALOGY_BANK[i].pair);
}

// Read whole verbalBank.js
let fileContent = fs.readFileSync('src/data/verbalBank.js', 'utf8');

// Replace VOCAB_BANK array in fileContent
const vocabStart = fileContent.indexOf('export const VOCAB_BANK = [');
const vocabEnd = fileContent.indexOf('export const ANALOGY_BANK = [');
const formattedVocab = 'export const VOCAB_BANK = ' + JSON.stringify(VOCAB_BANK, null, 2) + ';\n';
fileContent = fileContent.slice(0, vocabStart) + formattedVocab + fileContent.slice(vocabEnd);

// Replace ANALOGY_BANK array in fileContent
const analogyStart = fileContent.indexOf('export const ANALOGY_BANK = [');
const analogyEnd = fileContent.indexOf('export const SYLLOGISM_BANK = [');
const formattedAnalogy = 'export const ANALOGY_BANK = ' + JSON.stringify(ANALOGY_BANK, null, 2) + ';\n';
fileContent = fileContent.slice(0, analogyStart) + formattedAnalogy + fileContent.slice(analogyEnd);

fs.writeFileSync('src/data/verbalBank.js', fileContent, 'utf8');
console.log('Successfully eliminated all internal verbal duplicates!');
