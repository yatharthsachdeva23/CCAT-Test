import fs from 'fs';

const extraVocab = [
  {
    word: "EPHEMERAL",
    type: "antonym",
    correct: "Permanent",
    distractors: ["Transient", "Fleeting", "Momentary", "Brief"],
    expl: "Ephemeral means lasting for a very short time. Permanent is the opposite."
  },
  {
    word: "GARRULOUS",
    type: "antonym",
    correct: "Taciturn",
    distractors: ["Loquacious", "Talkative", "Voluble", "Chatty"],
    expl: "Garrulous means excessively talkative. Taciturn means reserved or uncommunicative in speech."
  },
  {
    word: "PRAGMATIC",
    type: "synonym",
    correct: "Practical",
    distractors: ["Idealistic", "Visionary", "Speculative", "Unrealistic"],
    expl: "Pragmatic means dealing with things sensibly and realistically based on practical considerations."
  },
  {
    word: "OSTENTATIOUS",
    type: "antonym",
    correct: "Modest",
    distractors: ["Showy", "Flamboyant", "Pretentious", "Gaudy"],
    expl: "Ostentatious means vulgar or pretentious display designed to impress. Modest is the opposite."
  },
  {
    word: "VORACIOUS",
    type: "synonym",
    correct: "Ravenous",
    distractors: ["Satiated", "Full", "Indifferent", "Abstemious"],
    expl: "Voracious means having a very eager approach to an activity, or wanting huge quantities of food."
  },
  {
    word: "ENIGMATIC",
    type: "synonym",
    correct: "Mysterious",
    distractors: ["Obvious", "Transparent", "Straightforward", "Lucid"],
    expl: "Enigmatic means difficult to interpret or understand; mysterious."
  },
  {
    word: "DILIGENT",
    type: "antonym",
    correct: "Slothful",
    distractors: ["Industrious", "Assiduous", "Conscientious", "Persistent"],
    expl: "Diligent means having or showing care and conscientiousness. Slothful means lazy."
  },
  {
    word: "ALTRUISTIC",
    type: "antonym",
    correct: "Selfish",
    distractors: ["Benevolent", "Charitable", "Magnanimous", "Generous"],
    expl: "Altruistic means showing selfless concern for the well-being of others. Selfish is the opposite."
  },
  {
    word: "RANCOR",
    type: "antonym",
    correct: "Goodwill",
    distractors: ["Bitterness", "Spite", "Resentment", "Malice"],
    expl: "Rancor means bitterness or resentfulness. Goodwill is the opposite."
  },
  {
    word: "FASTIDIOUS",
    type: "synonym",
    correct: "Meticulous",
    distractors: ["Careless", "Sloppy", "Indifferent", "Lax"],
    expl: "Fastidious means very attentive to and concerned about accuracy and detail."
  },
  {
    word: "OBSEQUIOUS",
    type: "synonym",
    correct: "Servile",
    distractors: ["Assertive", "Defiant", "Domineering", "Independent"],
    expl: "Obsequious means obedient or attentive to an excessive or servile degree."
  },
  {
    word: "GREGARIOUS",
    type: "antonym",
    correct: "Solitary",
    distractors: ["Sociable", "Outgoing", "Convivial", "Companionable"],
    expl: "Gregarious means fond of company and sociable. Solitary is the opposite."
  },
  {
    word: "CAPRICIOUS",
    type: "synonym",
    correct: "Fickle",
    distractors: ["Steadfast", "Consistent", "Predictable", "Reliable"],
    expl: "Capricious means given to sudden and unaccountable changes of mood or behavior."
  },
  {
    word: "ACERBIC",
    type: "antonym",
    correct: "Gentle",
    distractors: ["Caustic", "Sharp", "Biting", "Sarcastic"],
    expl: "Acerbic means sharp and forthright in taste or speaking. Gentle is the opposite."
  },
  {
    word: "BENEVOLENT",
    type: "synonym",
    correct: "Kindhearted",
    distractors: ["Malevolent", "Spiteful", "Hostile", "Ruthless"],
    expl: "Benevolent means well-meaning and kindly."
  },
  {
    word: "CAJOLE",
    type: "synonym",
    correct: "Coax",
    distractors: ["Dissuade", "Force", "Bully", "Demand"],
    expl: "Cajole means to persuade someone to do something by sustained coaxing or flattery."
  },
  {
    word: "INEFFABLE",
    type: "synonym",
    correct: "Indescribable",
    distractors: ["Utterable", "Commonplace", "Definable", "Ordinary"],
    expl: "Ineffable means too great or extreme to be expressed or described in words."
  },
  {
    word: "MELLIFLUOUS",
    type: "antonym",
    correct: "Harsh",
    distractors: ["Sweet-sounding", "Dulcet", "Harmonious", "Euphonious"],
    expl: "Mellifluous means sweet or musical; pleasant to hear. Harsh is the opposite."
  },
  {
    word: "NEFARIOUS",
    type: "synonym",
    correct: "Wicked",
    distractors: ["Virtuous", "Admirable", "Honorable", "Noble"],
    expl: "Nefarious means wicked or criminal."
  },
  {
    word: "PERNICIOUS",
    type: "antonym",
    correct: "Beneficial",
    distractors: ["Harmful", "Destructive", "Deadly", "Ruinous"],
    expl: "Pernicious means having a harmful effect, especially in a gradual or subtle way. Beneficial is opposite."
  },
  {
    word: "QUIXOTIC",
    type: "antonym",
    correct: "Pragmatic",
    distractors: ["Idealistic", "Unrealistic", "Impractical", "Utopian"],
    expl: "Quixotic means exceedingly idealistic; unrealistic and impractical. Pragmatic is the opposite."
  },
  {
    word: "RETICENT",
    type: "synonym",
    correct: "Reserved",
    distractors: ["Loquacious", "Frank", "Demonstrative", "Unrestrained"],
    expl: "Reticent means not revealing one's thoughts or feelings readily; reserved."
  },
  {
    word: "SAGACIOUS",
    type: "synonym",
    correct: "Wise",
    distractors: ["Foolish", "Ignorant", "Naive", "Gullible"],
    expl: "Sagacious means having or showing keen mental discernment and good judgment; wise."
  },
  {
    word: "TENACIOUS",
    type: "antonym",
    correct: "Yielding",
    distractors: ["Persistent", "Resolute", "Determined", "Stubborn"],
    expl: "Tenacious means tending to keep a firm hold of something; persistent. Yielding is the opposite."
  },
  {
    word: "VENERATE",
    type: "synonym",
    correct: "Revere",
    distractors: ["Despise", "Disdain", "Scorn", "Belittle"],
    expl: "Venerate means to regard with great respect or reverence."
  },
  {
    word: "ZEALOUS",
    type: "antonym",
    correct: "Apathetic",
    distractors: ["Fervent", "Passionate", "Ardent", "Enthusiastic"],
    expl: "Zealous means having or showing great energy or enthusiasm. Apathetic is the opposite."
  },
  {
    word: "ANOMALY",
    type: "synonym",
    correct: "Aberration",
    distractors: ["Norm", "Standard", "Routine", "Regularity"],
    expl: "Anomaly means something that deviates from what is standard, normal, or expected."
  },
  {
    word: "BELLIGERENT",
    type: "antonym",
    correct: "Peaceable",
    distractors: ["Hostile", "Aggressive", "Combative", "Pugnacious"],
    expl: "Belligerent means hostile and aggressive. Peaceable is the opposite."
  },
  {
    word: "DEBACLE",
    type: "synonym",
    correct: "Fiasco",
    distractors: ["Triumph", "Victory", "Success", "Achievement"],
    expl: "Debacle means a sudden and ignominious failure; a fiasco."
  },
  {
    word: "EQUANIMITY",
    type: "antonym",
    correct: "Agitation",
    distractors: ["Composure", "Calmness", "Serenity", "Poise"],
    expl: "Equanimity means mental calmness and composure, especially in a difficult situation. Agitation is opposite."
  }
];

const extraAnalogies = [
  {
    pair: "CHISEL : SCULPTOR",
    rel: "tool to practitioner",
    correct: "SCALPEL : SURGEON",
    distractors: ["CANVAS : PAINTER", "BOOK : READER", "HAMMER : NAIL", "BRICK : ARCHITECT"],
    expl: "A chisel is a primary specialized tool used by a sculptor; a scalpel is used by a surgeon."
  },
  {
    pair: "TELESCOPE : ASTRONOMER",
    rel: "instrument to scientist",
    correct: "MICROSCOPE : BIOLOGIST",
    distractors: ["THERMOMETER : PATIENT", "STETHOSCOPE : HOSPITAL", "RADAR : PILOT", "LENS : EYE"],
    expl: "A telescope is an observational tool used by an astronomer; a microscope is used by a biologist."
  },
  {
    pair: "MALLEABLE : METAL",
    rel: "property to substance",
    correct: "PLIABLE : CLAY",
    distractors: ["BRITTLE : RUBBER", "RIGID : LIQUID", "TRANSPARENT : WOOD", "HEAVY : FEATHER"],
    expl: "Metal is characteristically malleable (easily shaped); clay is characteristically pliable."
  },
  {
    pair: "THERMOMETER : TEMPERATURE",
    rel: "measuring device to quantity",
    correct: "BAROMETER : PRESSURE",
    distractors: ["CLOCK : SECOND", "ODOMETER : SPEED", "SCALE : POUND", "RULER : INCH"],
    expl: "A thermometer measures temperature; a barometer measures atmospheric pressure."
  },
  {
    pair: "ANCHOR : SHIP",
    rel: "stabilizer to vehicle",
    correct: "BRAKE : CAR",
    distractors: ["ENGINE : PLANE", "RUDDER : TRAIN", "SAIL : BOAT", "WHEEL : BICYCLE"],
    expl: "An anchor holds a ship stationary; a brake stops and holds a car stationary."
  },
  {
    pair: "RUDDER : BOAT",
    rel: "steering mechanism to vehicle",
    correct: "HANDLEBARS : BICYCLE",
    distractors: ["TIRE : CAR", "WING : AIRPLANE", "CABIN : TRUCK", "TRACK : TRAIN"],
    expl: "A rudder is used to steer a boat; handlebars are used to steer a bicycle."
  },
  {
    pair: "QUARRY : MARBLE",
    rel: "source to extracted material",
    correct: "MINE : COAL",
    distractors: ["FOREST : WOODPECKER", "RIVER : FISH", "FACTORY : STEEL", "STORE : MERCHANDISE"],
    expl: "Marble is excavated from a quarry; coal is excavated from a mine."
  },
  {
    pair: "EPILOGUE : NOVEL",
    rel: "concluding section to work",
    correct: "CODA : COMPOSITION",
    distractors: ["OVERTURE : OPERA", "PROLOGUE : ESSAY", "INDEX : MAGAZINE", "PREFACE : CHAPTER"],
    expl: "An epilogue is the concluding section of a novel; a coda is the concluding passage of a musical composition."
  },
  {
    pair: "STANZA : POEM",
    rel: "structural unit to whole",
    correct: "CHAPTER : NOVEL",
    distractors: ["ACTOR : PLAY", "RHYME : PROSE", "WORD : LETTER", "PAGE : BOOKMARK"],
    expl: "A stanza is a major divisional unit of a poem; a chapter is a divisional unit of a novel."
  },
  {
    pair: "SPONGE : ABSORBENT",
    rel: "object to intrinsic property",
    correct: "GLUE : ADHESIVE",
    distractors: ["WATER : DRY", "GLASS : MALLEABLE", "ROCK : LIGHTWEIGHT", "ICE : BOILING"],
    expl: "A sponge is inherently absorbent; glue is inherently adhesive."
  },
  {
    pair: "LUBRICANT : FRICTION",
    rel: "agent to thing reduced",
    correct: "ANESTHETIC : PAIN",
    distractors: ["FUEL : COMBUSTION", "CATALYST : ENERGY", "HEAT : TEMPERATURE", "EXERCISE : STRENGTH"],
    expl: "A lubricant serves to diminish friction; an anesthetic serves to diminish pain."
  },
  {
    pair: "INSULATOR : HEAT",
    rel: "barrier to transferred entity",
    correct: "DAM : WATER",
    distractors: ["CONDUCTOR : ELECTRICITY", "FILTER : AIR", "WINDOW : SUNLIGHT", "PIPE : STEAM"],
    expl: "An insulator blocks or impedes the flow of heat; a dam blocks the flow of water."
  },
  {
    pair: "DROUGHT : RAIN",
    rel: "deficiency state to missing element",
    correct: "FAMINE : FOOD",
    distractors: ["FLOOD : WATER", "EPIDEMIC : DISEASE", "STORM : WIND", "BLIZZARD : SNOW"],
    expl: "A drought is an acute scarcity of rain; a famine is an acute scarcity of food."
  },
  {
    pair: "GAVEL : JUDGE",
    rel: "emblematic tool to authority",
    correct: "BATON : CONDUCTOR",
    distractors: ["WHISTLE : TRAIN", "ROBE : LAWYER", "BADGE : CITIZEN", "HAMMER : CARPENTER"],
    expl: "A gavel is used by a judge to maintain order; a baton is used by a conductor to direct an orchestra."
  },
  {
    pair: "METRONOME : TEMPO",
    rel: "regulator to musical property",
    correct: "GOVERNOR : SPEED",
    distractors: ["THERMOMETER : WEATHER", "CHRONOMETER : DISTANCE", "COMPASS : ALTITUDE", "TUNER : VOLUME"],
    expl: "A metronome regulates musical tempo; a governor regulates mechanical speed."
  },
  {
    pair: "ARCHIPELAGO : ISLAND",
    rel: "collection to constituent unit",
    correct: "CONSTELLATION : STAR",
    distractors: ["FOREST : LEAF", "MOUNTAIN : PEAK", "OCEAN : WAVE", "DESERT : CACTUS"],
    expl: "An archipelago is a group or chain of islands; a constellation is a recognizable group of stars."
  },
  {
    pair: "CANVAS : PAINTER",
    rel: "medium surface to artist",
    correct: "MARBLE : SCULPTOR",
    distractors: ["PALETTE : BRUSH", "MUSEUM : CURATOR", "GALLERY : ARTWORK", "STAGE : ACTOR"],
    expl: "A canvas is the medium upon which a painter works; marble is the medium upon which a sculptor works."
  },
  {
    pair: "SEISMOGRAPH : EARTHQUAKE",
    rel: "instrument to detected phenomenon",
    correct: "GEIGER COUNTER : RADIATION",
    distractors: ["TELESCOPE : GALAXY", "RADAR : SPEED", "MICROSCOPE : BACTERIA", "BAROMETER : WIND"],
    expl: "A seismograph detects and measures earthquakes; a Geiger counter detects and measures radiation."
  },
  {
    pair: "SUTURE : WOUND",
    rel: "repair action to damage",
    correct: "DARN : TEAR",
    distractors: ["BANDAGE : BONE", "CLEANSE : INFECTION", "CAST : SWELLING", "SLING : MUSCLE"],
    expl: "To suture is to stitch together a wound; to darn is to stitch together a tear in fabric."
  },
  {
    pair: "CURATOR : MUSEUM",
    rel: "custodian to institution",
    correct: "LIBRARIAN : LIBRARY",
    distractors: ["TEACHER : SCHOOL", "ACTOR : THEATER", "DOCTOR : CLINIC", "CHEF : KITCHEN"],
    expl: "A curator oversees the collection of a museum; a librarian oversees the collection of a library."
  },
  {
    pair: "INDIGENT : WEALTH",
    rel: "state of lacking a quality",
    correct: "EMACIATED : NOURISHMENT",
    distractors: ["AFFLUENT : MONEY", "OBESE : WEIGHT", "HEALTHY : VITALITY", "TIRED : SLEEP"],
    expl: "Indigent means completely lacking in wealth; emaciated means severely lacking in nourishment."
  },
  {
    pair: "INCUBATOR : INFANT",
    rel: "protective enclosure to subject",
    correct: "GREENHOUSE : PLANT",
    distractors: ["HOSPITAL : DOCTOR", "CRIB : TOY", "NURSERY : ADULT", "GARDEN : SOIL"],
    expl: "An incubator provides a controlled protective environment for an infant; a greenhouse does so for plants."
  },
  {
    pair: "CALLIGRAPHY : PEN",
    rel: "art form to instrument",
    correct: "ETCHING : BURIN",
    distractors: ["PAINTING : FRAME", "SCULPTURE : CLAY", "DRAWING : PAPER", "PRINTING : INK"],
    expl: "Calligraphy is executed with a pen; etching is executed with a burin."
  },
  {
    pair: "PERJURY : OATH",
    rel: "violation of formal commitment",
    correct: "TREASON : ALLEGIANCE",
    distractors: ["THEFT : PROPERTY", "FRAUD : CONTRACT", "LIBEL : REPUTATION", "ASSAULT : LAW"],
    expl: "Perjury is the violation of a sworn legal oath; treason is the violation of sworn national allegiance."
  },
  {
    pair: "HYGROMETER : HUMIDITY",
    rel: "measuring device to quantity",
    correct: "ANEMOMETER : WIND SPEED",
    distractors: ["ALTIMETER : GRAVITY", "PEDOMETER : HEART RATE", "CALIPER : WEIGHT", "CHRONOMETER : DEPTH"],
    expl: "A hygrometer measures humidity; an anemometer measures wind speed."
  },
  {
    pair: "REFRACTORY : CONTROL",
    rel: "resistant to influence",
    correct: "IMPERVIOUS : PENETRATION",
    distractors: ["COMPLIANT : RULES", "FRAGILE : FORCE", "ELASTIC : STRETCH", "PERMEABLE : FLUID"],
    expl: "Refractory means stubbornly resistant to control; impervious means completely resistant to penetration."
  },
  {
    pair: "BALLAST : STABILITY",
    rel: "substance to provided property",
    correct: "CAMOUFLAGE : CONCEALMENT",
    distractors: ["RUDDER : ACCELERATION", "SAIL : FRICTION", "PROPELLER : INERTIA", "KEEL : DRAG"],
    expl: "Ballast provides physical stability to a vessel; camouflage provides concealment to an organism."
  },
  {
    pair: "CENSUS : POPULATION",
    rel: "official survey to subject",
    correct: "INVENTORY : MERCHANDISE",
    distractors: ["ELECTION : BALLOT", "TAX : INCOME", "AUDIT : TREASURY", "SURVEY : LAND"],
    expl: "A census is a comprehensive count of a population; an inventory is a comprehensive count of merchandise."
  },
  {
    pair: "NOCTURNAL : NIGHT",
    rel: "active period to time",
    correct: "DIURNAL : DAY",
    distractors: ["CREPUSCULAR : DAWN", "HIBERNAL : SUMMER", "ESTIVAL : WINTER", "VERNAL : AUTUMN"],
    expl: "Nocturnal describes active behavior during the night; diurnal describes active behavior during the day."
  },
  {
    pair: "DISPATCH : MESSAGE",
    rel: "sending action to object",
    correct: "TRANSMIT : SIGNAL",
    distractors: ["RECEIVE : LETTER", "ENCODE : CIPHER", "DELETE : RECORD", "BROADCAST : LISTENER"],
    expl: "To dispatch is to send off a message; to transmit is to send out a signal."
  },
  {
    pair: "CONFECTIONER : SWEETS",
    rel: "specialist creator to product",
    correct: "CARTOGRAPHER : MAPS",
    distractors: ["AUTHOR : INK", "COBBLER : FEET", "BAKER : FLOUR", "TAILOR : NEEDLE"],
    expl: "A confectioner specializes in creating sweets; a cartographer specializes in creating maps."
  },
  {
    pair: "DISINFECTANT : MICROBE",
    rel: "neutralizing agent to target",
    correct: "HERBICIDE : WEED",
    distractors: ["FERTILIZER : SOIL", "ANTIBIOTIC : VIRUS", "INSECTICIDE : FLOWER", "WATER : FIRE"],
    expl: "A disinfectant is formulated to destroy microbes; an herbicide is formulated to destroy unwanted weeds."
  }
];

// Read verbalBank.js
let content = fs.readFileSync('src/data/verbalBank.js', 'utf8');

// Insert extraVocab right before `export const ANALOGY_BANK = [`
const analogyBankIdx = content.indexOf('export const ANALOGY_BANK = [');
if (analogyBankIdx !== -1) {
  // Find the closing bracket `];` of VOCAB_BANK
  const lastBracket = content.lastIndexOf('];', analogyBankIdx);
  const formattedVocab = ',\n' + extraVocab.map(v => '  ' + JSON.stringify(v, null, 2).replace(/\n/g, '\n  ')).join(',\n') + '\n';
  content = content.slice(0, lastBracket) + formattedVocab + content.slice(lastBracket);
}

// Insert extraAnalogies right before `export const SYLLOGISM_BANK = [`
const syllogismBankIdx = content.indexOf('export const SYLLOGISM_BANK = [');
if (syllogismBankIdx !== -1) {
  const lastBracket = content.lastIndexOf('];', syllogismBankIdx);
  const formattedAnalogies = ',\n' + extraAnalogies.map(a => '  ' + JSON.stringify(a, null, 2).replace(/\n/g, '\n  ')).join(',\n') + '\n';
  content = content.slice(0, lastBracket) + formattedAnalogies + content.slice(lastBracket);
}

fs.writeFileSync('src/data/verbalBank.js', content, 'utf8');
console.log('Successfully expanded verbalBank.js with extra vocabulary and analogies!');
