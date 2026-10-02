/**
 * Curated Bank of 100% Unique CCAT Verbal Questions
 * Zero collisions between Tests 1 through 30.
 * Sliced strictly without modulo wrap-around for Tests 2-30.
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
  const items = rawOptions.map((opt, i) => ({ text: opt, wasCorrect: i === correctIndex }));
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  const finalOptions = items.map((item, idx) => ({ id: letters[idx], text: item.text }));
  const correctOpt = letters[items.findIndex(item => item.wasCorrect)];
  return { options: finalOptions, correctOption: correctOpt };
}

export const VOCAB_BANK = [
  {
    "word": "METICULOUS",
    "type": "antonym",
    "correct": "Careless",
    "distractors": [
      "Painstaking",
      "Scrupulous",
      "Exact",
      "Precise"
    ],
    "expl": "Meticulous means showing great attention to detail. Careless is the opposite."
  },
  {
    "word": "RESILIENT",
    "type": "antonym",
    "correct": "Fragile",
    "distractors": [
      "Durable",
      "Tough",
      "Flexible",
      "Buoyant"
    ],
    "expl": "Resilient means able to withstand adversity. Fragile means easily broken."
  },
  {
    "word": "LUCID",
    "type": "antonym",
    "correct": "Obscure",
    "distractors": [
      "Clear",
      "Coherent",
      "Articulate",
      "Luminous"
    ],
    "expl": "Lucid means expressed clearly and easily understood. Obscure means hard to understand."
  },
  {
    "word": "COPIOUS",
    "type": "antonym",
    "correct": "Scant",
    "distractors": [
      "Plentiful",
      "Abundant",
      "Ample",
      "Profuse"
    ],
    "expl": "Copious means abundant in supply or quantity. Scant means scarce or insufficient."
  },
  {
    "word": "PRAGMATIC",
    "type": "antonym",
    "correct": "Idealistic",
    "distractors": [
      "Practical",
      "Realistic",
      "Sensible",
      "Utilitarian"
    ],
    "expl": "Pragmatic means dealing with matters practically rather than theoretically. Idealistic is its opposite."
  },
  {
    "word": "ZEALOUS",
    "type": "antonym",
    "correct": "Apathetic",
    "distractors": [
      "Enthusiastic",
      "Fervent",
      "Ardent",
      "Passionate"
    ],
    "expl": "Zealous means having great energy or enthusiasm. Apathetic means showing no interest or concern."
  },
  {
    "word": "GREGARIOUS",
    "type": "antonym",
    "correct": "Solitary",
    "distractors": [
      "Sociable",
      "Outgoing",
      "Friendly",
      "Extroverted"
    ],
    "expl": "Gregarious means fond of company and sociable. Solitary is the opposite."
  },
  {
    "word": "ALACRITY",
    "type": "antonym",
    "correct": "Reluctance",
    "distractors": [
      "Briskness",
      "Eagerness",
      "Promptness",
      "Willingness"
    ],
    "expl": "Alacrity means brisk and cheerful readiness. Reluctance is the exact opposite."
  },
  {
    "word": "DILIGENT",
    "type": "antonym",
    "correct": "Indolent",
    "distractors": [
      "Conscientious",
      "Hardworking",
      "Sedulous",
      "Assiduous"
    ],
    "expl": "Diligent means hardworking and conscientious. Indolent means lazy."
  },
  {
    "word": "AUSTERE",
    "type": "antonym",
    "correct": "Extravagant",
    "distractors": [
      "Severe",
      "Strict",
      "Sparse",
      "Ascetic"
    ],
    "expl": "Austere means severe or strict in manner or appearance, or plain. Extravagant is opposite."
  },
  {
    "word": "ADROIT",
    "type": "antonym",
    "correct": "Clumsy",
    "distractors": [
      "Skillful",
      "Dexterous",
      "Adept",
      "Nimble"
    ],
    "expl": "Adroit means clever or skillful. Clumsy means awkward in movement or handling."
  },
  {
    "word": "BELLIGERENT",
    "type": "antonym",
    "correct": "Peaceable",
    "distractors": [
      "Hostile",
      "Aggressive",
      "Combative",
      "Pugnacious"
    ],
    "expl": "Belligerent means hostile and aggressive. Peaceable is the opposite."
  },
  {
    "word": "COGENT",
    "type": "antonym",
    "correct": "Unconvincing",
    "distractors": [
      "Persuasive",
      "Compelling",
      "Valid",
      "Plausible"
    ],
    "expl": "Cogent means clear, logical, and convincing. Unconvincing is opposite."
  },
  {
    "word": "DELETERIOUS",
    "type": "antonym",
    "correct": "Beneficial",
    "distractors": [
      "Harmful",
      "Damaging",
      "Detrimental",
      "Injurious"
    ],
    "expl": "Deleterious means causing harm or damage. Beneficial is its opposite."
  },
  {
    "word": "ENIGMATIC",
    "type": "antonym",
    "correct": "Unambiguous",
    "distractors": [
      "Mysterious",
      "Cryptic",
      "Puzzling",
      "Inscrutable"
    ],
    "expl": "Enigmatic means difficult to interpret or understand. Unambiguous means clear."
  },
  {
    "word": "FASTIDIOUS",
    "type": "antonym",
    "correct": "Sloppy",
    "distractors": [
      "Particular",
      "Meticulous",
      "Fussy",
      "Scrupulous"
    ],
    "expl": "Fastidious means very attentive to and concerned about accuracy. Sloppy is opposite."
  },
  {
    "word": "HAUGHTY",
    "type": "antonym",
    "correct": "Humble",
    "distractors": [
      "Arrogant",
      "Proud",
      "Disdainful",
      "Conceited"
    ],
    "expl": "Haughty means arrogantly superior and disdainful. Humble is the direct opposite."
  },
  {
    "word": "IMMUTABLE",
    "type": "antonym",
    "correct": "Variable",
    "distractors": [
      "Fixed",
      "Unchangeable",
      "Permanent",
      "Unalterable"
    ],
    "expl": "Immutable means unchanging over time. Variable means liable to change."
  },
  {
    "word": "MALLEABLE",
    "type": "antonym",
    "correct": "Rigid",
    "distractors": [
      "Pliable",
      "Flexible",
      "Ductile",
      "Yielding"
    ],
    "expl": "Malleable means easily influenced or pliable. Rigid means inflexible."
  },
  {
    "word": "NEBULOUS",
    "type": "antonym",
    "correct": "Definite",
    "distractors": [
      "Vague",
      "Hazy",
      "Cloudy",
      "Indistinct"
    ],
    "expl": "Nebulous means hazy, vague, or indistinct. Definite is the opposite."
  },
  {
    "word": "PLACID",
    "type": "antonym",
    "correct": "Agitated",
    "distractors": [
      "Calm",
      "Serene",
      "Tranquil",
      "Peaceful"
    ],
    "expl": "Placid means not easily upset or excited, calm. Agitated is opposite."
  },
  {
    "word": "QUERULOUS",
    "type": "antonym",
    "correct": "Contented",
    "distractors": [
      "Complaining",
      "Peevish",
      "Whining",
      "Petulant"
    ],
    "expl": "Querulous means complaining in a whining manner. Contented is opposite."
  },
  {
    "word": "SAGACIOUS",
    "type": "antonym",
    "correct": "Foolish",
    "distractors": [
      "Wise",
      "Insightful",
      "Judicious",
      "Shrewd"
    ],
    "expl": "Sagacious means having good judgment and wisdom. Foolish is opposite."
  },
  {
    "word": "TENACIOUS",
    "type": "antonym",
    "correct": "Yielding",
    "distractors": [
      "Persistent",
      "Resolute",
      "Stubborn",
      "Determined"
    ],
    "expl": "Tenacious means holding firmly to a purpose. Yielding means giving way."
  },
  {
    "word": "UBIQUITOUS",
    "type": "antonym",
    "correct": "Rare",
    "distractors": [
      "Omnipresent",
      "Pervasive",
      "Everywhere",
      "Universal"
    ],
    "expl": "Ubiquitous means found everywhere. Rare is opposite."
  },
  {
    "word": "VACILLATE",
    "type": "antonym",
    "correct": "Resolve",
    "distractors": [
      "Waver",
      "Hesitate",
      "Fluctuate",
      "Oscillate"
    ],
    "expl": "Vacillate means to waver between choices. Resolve means to make a firm decision."
  },
  {
    "word": "WANTON",
    "type": "antonym",
    "correct": "Deliberate",
    "distractors": [
      "Reckless",
      "Senseless",
      "Capricious",
      "Unrestrained"
    ],
    "expl": "Wanton can mean senseless or unprovoked. Deliberate or disciplined is opposite."
  },
  {
    "word": "ABATE",
    "type": "antonym",
    "correct": "Increase",
    "distractors": [
      "Subside",
      "Diminish",
      "Lessen",
      "Weaken"
    ],
    "expl": "Abate means to lessen or diminish. Increase is opposite."
  },
  {
    "word": "BENEVOLENT",
    "type": "antonym",
    "correct": "Malevolent",
    "distractors": [
      "Kind",
      "Generous",
      "Charitable",
      "Compassionate"
    ],
    "expl": "Benevolent means well-meaning and kindly. Malevolent means wishing harm."
  },
  {
    "word": "CAPRICIOUS",
    "type": "antonym",
    "correct": "Predictable",
    "distractors": [
      "Fickle",
      "Inconsistent",
      "Whimsical",
      "Erratic"
    ],
    "expl": "Capricious means unpredictable and erratic. Predictable is opposite."
  },
  {
    "word": "DECORUM",
    "type": "antonym",
    "correct": "Impropriety",
    "distractors": [
      "Politeness",
      "Propriety",
      "Modesty",
      "Etiquette"
    ],
    "expl": "Decorum means dignified, proper behavior. Impropriety is bad behavior."
  },
  {
    "word": "ELOQUENT",
    "type": "antonym",
    "correct": "Inarticulate",
    "distractors": [
      "Fluent",
      "Expressive",
      "Silver-tongued",
      "Articulate"
    ],
    "expl": "Eloquent means fluent or persuasive in speaking. Inarticulate is opposite."
  },
  {
    "word": "FLIPPANT",
    "type": "antonym",
    "correct": "Respectful",
    "distractors": [
      "Facetious",
      "Glib",
      "Disrespectful",
      "Frivolous"
    ],
    "expl": "Flippant means not showing a serious or respectful attitude. Respectful is opposite."
  },
  {
    "word": "GRAVE",
    "type": "antonym",
    "correct": "Frivolous",
    "distractors": [
      "Solemn",
      "Serious",
      "Somber",
      "Weighty"
    ],
    "expl": "Grave means giving cause for alarm or serious. Frivolous means lighthearted/carefree."
  },
  {
    "word": "IMPETUOUS",
    "type": "antonym",
    "correct": "Cautious",
    "distractors": [
      "Impulsive",
      "Rash",
      "Hasty",
      "Reckless"
    ],
    "expl": "IMPETUOUS means acting quickly without thought. Cautious is opposite."
  },
  {
    "word": "JUBILANT",
    "type": "antonym",
    "correct": "Despondent",
    "distractors": [
      "Triumphant",
      "Joyful",
      "Ecstatic",
      "Elated"
    ],
    "expl": "Jubilant means feeling or expressing great happiness. Despondent means depressed."
  },
  {
    "word": "KINDLE",
    "type": "antonym",
    "correct": "Extinguish",
    "distractors": [
      "Ignite",
      "Arouse",
      "Inspire",
      "Spark"
    ],
    "expl": "Kindle means to light or ignite. Extinguish means to put out."
  },
  {
    "word": "LAMENT",
    "type": "antonym",
    "correct": "Celebrate",
    "distractors": [
      "Mourn",
      "Grieve",
      "Deplore",
      "Bewail"
    ],
    "expl": "Lament means an expression of grief. Celebrate is opposite."
  },
  {
    "word": "MAGNANIMOUS",
    "type": "antonym",
    "correct": "Petty",
    "distractors": [
      "Generous",
      "Forgiving",
      "Noble",
      "Altruistic"
    ],
    "expl": "Magnanimous means generous or forgiving. Petty is small-minded and opposite."
  },
  {
    "word": "NOXIOUS",
    "type": "antonym",
    "correct": "Wholesome",
    "distractors": [
      "Harmful",
      "Toxic",
      "Poisonous",
      "Venomous"
    ],
    "expl": "Noxious means harmful or unpleasant. Wholesome is beneficial/healthy."
  },
  {
    "word": "OPULENT",
    "type": "antonym",
    "correct": "Penurious",
    "distractors": [
      "Wealthy",
      "Luxurious",
      "Affluent",
      "Rich"
    ],
    "expl": "Opulent means rich and luxurious. Penurious means extremely poor."
  },
  {
    "word": "PAUCITY",
    "type": "antonym",
    "correct": "Surplus",
    "distractors": [
      "Scarcity",
      "Dearth",
      "Shortage",
      "Deficit"
    ],
    "expl": "Paucity means presence in small quantities. Surplus is excess."
  },
  {
    "word": "QUELL",
    "type": "antonym",
    "correct": "Incite",
    "distractors": [
      "Suppress",
      "Subdue",
      "Extinguish",
      "Pacify"
    ],
    "expl": "Quell means to suppress by force. Incite means to provoke."
  },
  {
    "word": "REPUGNANT",
    "type": "antonym",
    "correct": "Attractive",
    "distractors": [
      "Repulsive",
      "Offensive",
      "Abhorrent",
      "Disgusting"
    ],
    "expl": "Repugnant means extremely distasteful. Attractive is opposite."
  },
  {
    "word": "SERENDIPITY",
    "type": "antonym",
    "correct": "Misfortune",
    "distractors": [
      "Luck",
      "Providence",
      "Chance",
      "Coincidence"
    ],
    "expl": "Serendipity is chance occurrence of good events. Misfortune is opposite."
  },
  {
    "word": "TRITE",
    "type": "antonym",
    "correct": "Original",
    "distractors": [
      "Corny",
      "Hackneyed",
      "Banal",
      "Cliche"
    ],
    "expl": "Trite means overused. Original is fresh and novel."
  },
  {
    "word": "UNFEIGNED",
    "type": "antonym",
    "correct": "Insincere",
    "distractors": [
      "Genuine",
      "Real",
      "Heartfelt",
      "Honest"
    ],
    "expl": "Unfeigned means sincere and genuine. Insincere is opposite."
  },
  {
    "word": "VENERABLE",
    "type": "antonym",
    "correct": "Disreputable",
    "distractors": [
      "Respected",
      "Honored",
      "Esteemed",
      "Distinguished"
    ],
    "expl": "Venerable means accorded great respect. Disreputable is dishonorable."
  },
  {
    "word": "WARY",
    "type": "antonym",
    "correct": "Trusting",
    "distractors": [
      "Cautious",
      "Guarded",
      "Vigilant",
      "Suspicious"
    ],
    "expl": "Wary means showing caution. Trusting is opposite."
  },
  {
    "word": "EXONERATE",
    "type": "antonym",
    "correct": "Inculpate",
    "distractors": [
      "Absolve",
      "Acquit",
      "Clear",
      "Vindicate"
    ],
    "expl": "Exonerate means to free from blame. Inculpate means to incriminate."
  },
  {
    "word": "YOKE",
    "type": "antonym",
    "correct": "Liberate",
    "distractors": [
      "Harness",
      "Bind",
      "Connect",
      "Link"
    ],
    "expl": "Yoke means to bind or subjugate. Liberate means to set free."
  },
  {
    "word": "ZENITH",
    "type": "antonym",
    "correct": "Nadir",
    "distractors": [
      "Apex",
      "Peak",
      "Pinnacle",
      "Summit"
    ],
    "expl": "Zenith is the highest point. Nadir is the lowest point."
  },
  {
    "word": "ACCORD",
    "type": "antonym",
    "correct": "Dissension",
    "distractors": [
      "Agreement",
      "Harmony",
      "Concurrence",
      "Treaty"
    ],
    "expl": "Accord means agreement or harmony. Dissension means discord."
  },
  {
    "word": "BOISTEROUS",
    "type": "antonym",
    "correct": "Quiet",
    "distractors": [
      "Rowdy",
      "Clamorous",
      "Noisy",
      "Unruly"
    ],
    "expl": "Boisterous means noisy and energetic. Quiet is opposite."
  },
  {
    "word": "CHASTISE",
    "type": "antonym",
    "correct": "Praise",
    "distractors": [
      "Rebuke",
      "Reprimand",
      "Scold",
      "Berate"
    ],
    "expl": "Chastise means to reprimand severely. Praise is opposite."
  },
  {
    "word": "DEVIOUS",
    "type": "antonym",
    "correct": "Straightforward",
    "distractors": [
      "Sly",
      "Cunning",
      "Deceptive",
      "Wily"
    ],
    "expl": "Devious means deceitful. Straightforward is opposite."
  },
  {
    "word": "EFFERVESCENT",
    "type": "antonym",
    "correct": "Dull",
    "distractors": [
      "Bubbly",
      "Sparkling",
      "Vivacious",
      "Lively"
    ],
    "expl": "Effervescent means enthusiastic and vivacious. Dull is opposite."
  },
  {
    "word": "FERVENT",
    "type": "antonym",
    "correct": "Indifferent",
    "distractors": [
      "Ardent",
      "Passionate",
      "Vehement",
      "Fiery"
    ],
    "expl": "Fervent means having great warmth or intensity. Indifferent is opposite."
  },
  {
    "word": "GULLIBLE",
    "type": "antonym",
    "correct": "Skeptical",
    "distractors": [
      "Naive",
      "Credulous",
      "Trusting",
      "Impressionable"
    ],
    "expl": "Gullible means easily persuaded. Skeptical is opposite."
  },
  {
    "word": "HAPHAZARD",
    "type": "antonym",
    "correct": "Methodical",
    "distractors": [
      "Random",
      "Disorganized",
      "Careless",
      "Aimless"
    ],
    "expl": "Haphazard means lacking any obvious organization. Methodical is opposite."
  },
  {
    "word": "INGENIOUS",
    "type": "antonym",
    "correct": "Inept",
    "distractors": [
      "Clever",
      "Brilliant",
      "Inventive",
      "Shrewd"
    ],
    "expl": "Ingenious means clever or original. Inept is clumsy/unskillful."
  },
  {
    "word": "JUDICIOUS",
    "type": "antonym",
    "correct": "Imprudent",
    "distractors": [
      "Sensible",
      "Prudent",
      "Wise",
      "Shrewd"
    ],
    "expl": "Judicious means showing good judgment. Imprudent is opposite."
  },
  {
    "word": "KINDRED",
    "type": "antonym",
    "correct": "Alien",
    "distractors": [
      "Related",
      "Similar",
      "Allied",
      "Congenial"
    ],
    "expl": "Kindred means similar in kind or related. Alien is opposite."
  },
  {
    "word": "LIMPID",
    "type": "antonym",
    "correct": "Turbid",
    "distractors": [
      "Clear",
      "Lucid",
      "Transparent",
      "Bright"
    ],
    "expl": "Limpid means completely clear. Turbid means cloudy or opaque."
  },
  {
    "word": "MOROSE",
    "type": "antonym",
    "correct": "Cheerful",
    "distractors": [
      "Sullen",
      "Glum",
      "Gloomy",
      "Sour"
    ],
    "expl": "Morose means sullen and ill-tempered. Cheerful is opposite."
  },
  {
    "word": "NONCHALANT",
    "type": "antonym",
    "correct": "Anxious",
    "distractors": [
      "Calm",
      "Casual",
      "Unconcerned",
      "Cool"
    ],
    "expl": "Nonchalant means casually calm. Anxious is opposite."
  },
  {
    "word": "OBSOLETE",
    "type": "antonym",
    "correct": "Contemporary",
    "distractors": [
      "Outdated",
      "Archaic",
      "Antiquated",
      "Disused"
    ],
    "expl": "Obsolete means no longer produced. Contemporary is modern."
  },
  {
    "word": "PERUSE",
    "type": "antonym",
    "correct": "Skim",
    "distractors": [
      "Inspect",
      "Examine",
      "Read",
      "Scrutinize"
    ],
    "expl": "Peruse means to read thoroughly. Skim means to read quickly/superficially."
  },
  {
    "word": "QUIESCENT",
    "type": "antonym",
    "correct": "Active",
    "distractors": [
      "Dormant",
      "Idle",
      "Latent",
      "Stationary"
    ],
    "expl": "Quiescent means in a state of dormancy. Active is opposite."
  },
  {
    "word": "REVERENT",
    "type": "antonym",
    "correct": "Disrespectful",
    "distractors": [
      "Respectful",
      "Venerating",
      "Devout",
      "Pious"
    ],
    "expl": "Reverent means feeling or showing deep solemn respect. Disrespectful is opposite."
  },
  {
    "word": "SCRUPULOUS",
    "type": "antonym",
    "correct": "Unprincipled",
    "distractors": [
      "Honest",
      "Meticulous",
      "Ethical",
      "Conscientious"
    ],
    "expl": "Scrupulous means diligent and attentive to morals. Unprincipled is opposite."
  },
  {
    "word": "TRANSIENT",
    "type": "antonym",
    "correct": "Enduring",
    "distractors": [
      "Fleeting",
      "Short-lived",
      "Temporary",
      "Passing"
    ],
    "expl": "Transient means lasting only for a short time. Enduring is opposite."
  },
  {
    "word": "UNCOUTH",
    "type": "antonym",
    "correct": "Refined",
    "distractors": [
      "Boorish",
      "Crude",
      "Coarse",
      "Unmannerly"
    ],
    "expl": "Uncouth means lacking good manners. Refined is cultured and opposite."
  },
  {
    "word": "VILIFY",
    "type": "antonym",
    "correct": "Laud",
    "distractors": [
      "Defame",
      "Slander",
      "Malign",
      "Disparage"
    ],
    "expl": "Vilify means to speak ill of. Laud means to praise."
  },
  {
    "word": "ZEAL",
    "type": "antonym",
    "correct": "Indifference",
    "distractors": [
      "Passion",
      "Ardor",
      "Eagerness",
      "Enthusiasm"
    ],
    "expl": "Zeal means great energy or enthusiasm. Indifference is opposite."
  },
  {
    "word": "ABOUND",
    "type": "synonym",
    "correct": "Teem",
    "distractors": [
      "Decline",
      "Falter",
      "Lack",
      "Fail"
    ],
    "expl": "Abound means to exist in large numbers. Teem also means to be full of."
  },
  {
    "word": "BERATE",
    "type": "synonym",
    "correct": "Chide",
    "distractors": [
      "Praise",
      "Extol",
      "Cheer",
      "Approve"
    ],
    "expl": "Berate means to scold or criticize angrily. Chide means to rebuke."
  },
  {
    "word": "COLLUSION",
    "type": "synonym",
    "correct": "Conspiracy",
    "distractors": [
      "Honesty",
      "Alliance",
      "Separation",
      "Discord"
    ],
    "expl": "Collusion means secret cooperation. Conspiracy is synonymous."
  },
  {
    "word": "DERIDE",
    "type": "synonym",
    "correct": "Mock",
    "distractors": [
      "Compliment",
      "Adore",
      "Respect",
      "Flatter"
    ],
    "expl": "Deride means to express contempt for or mock."
  },
  {
    "word": "ELATED",
    "type": "synonym",
    "correct": "Overjoyed",
    "distractors": [
      "Gloomy",
      "Lethargic",
      "Distressed",
      "Disheartened"
    ],
    "expl": "Elated means ecstatically happy."
  },
  {
    "word": "FIDELITY",
    "type": "synonym",
    "correct": "Loyalty",
    "distractors": [
      "Treachery",
      "Perfidy",
      "Betrayal",
      "Inconstancy"
    ],
    "expl": "Fidelity means faithfulness to a person or cause."
  },
  {
    "word": "GARNISH",
    "type": "synonym",
    "correct": "Embellish",
    "distractors": [
      "Strip",
      "Diminish",
      "Dull",
      "Deprive"
    ],
    "expl": "Garnish means to decorate or embellish."
  },
  {
    "word": "HALLOW",
    "type": "synonym",
    "correct": "Sanctify",
    "distractors": [
      "Defile",
      "Desecrate",
      "Dishonor",
      "Condemn"
    ],
    "expl": "Hallow means to honor as holy or sanctify."
  },
  {
    "word": "ILLICIT",
    "type": "synonym",
    "correct": "Unlawful",
    "distractors": [
      "Permissible",
      "Legal",
      "Valid",
      "Legitimate"
    ],
    "expl": "Illicit means forbidden by law or rules."
  },
  {
    "word": "KUDOS",
    "type": "synonym",
    "correct": "Praise",
    "distractors": [
      "Criticism",
      "Blame",
      "Censure",
      "Reproach"
    ],
    "expl": "Kudos means praise and honor received for achievement."
  },
  {
    "word": "LETHARGY",
    "type": "synonym",
    "correct": "Torpor",
    "distractors": [
      "Energy",
      "Vitality",
      "Vigor",
      "Enthusiasm"
    ],
    "expl": "Lethargy means lack of energy. Torpor is inactivity."
  },
  {
    "word": "OMNIPOTENT",
    "type": "synonym",
    "correct": "Almighty",
    "distractors": [
      "Weak",
      "Impotent",
      "Fragile",
      "Helpless"
    ],
    "expl": "Omnipotent means having unlimited power."
  },
  {
    "word": "PARIAH",
    "type": "synonym",
    "correct": "Outcast",
    "distractors": [
      "Leader",
      "Patron",
      "Insider",
      "Hero"
    ],
    "expl": "Pariah means an outcast."
  },
  {
    "word": "REPLETE",
    "type": "synonym",
    "correct": "Abounding",
    "distractors": [
      "Empty",
      "Barren",
      "Deficient",
      "Vacant"
    ],
    "expl": "Replete means filled or well-supplied."
  },
  {
    "word": "SCRUTINIZE",
    "type": "synonym",
    "correct": "Examine",
    "distractors": [
      "Glance",
      "Ignore",
      "Overlook",
      "Neglect"
    ],
    "expl": "Scrutinize means to examine closely."
  },
  {
    "word": "TACIT",
    "type": "synonym",
    "correct": "Implied",
    "distractors": [
      "Stated",
      "Explicit",
      "Express",
      "Vocal"
    ],
    "expl": "Tacit means understood or implied without being stated."
  },
  {
    "word": "VINDICTIVE",
    "type": "synonym",
    "correct": "Vengeful",
    "distractors": [
      "Forgiving",
      "Kind",
      "Gentle",
      "Merciful"
    ],
    "expl": "Vindictive means strongly desiring revenge."
  },
  {
    "word": "WAVER",
    "type": "synonym",
    "correct": "Hesitate",
    "distractors": [
      "Persist",
      "Decide",
      "Advance",
      "Steady"
    ],
    "expl": "Waver means to become unsteady or hesitate."
  },
  {
    "word": "YIELDING",
    "type": "synonym",
    "correct": "Submissive",
    "distractors": [
      "Defiant",
      "Stubborn",
      "Rigid",
      "Unyielding"
    ],
    "expl": "Yielding means giving in easily or submissive."
  },
  {
    "word": "ZEST",
    "type": "synonym",
    "correct": "Enthusiasm",
    "distractors": [
      "Apathy",
      "Boredom",
      "Dullness",
      "Indifference"
    ],
    "expl": "Zest means great enthusiasm and energy."
  },
  {
    "word": "AMITY",
    "type": "synonym",
    "correct": "Friendship",
    "distractors": [
      "Enmity",
      "Hostility",
      "Bitterness",
      "Hatred"
    ],
    "expl": "Amity means a friendly relationship."
  },
  {
    "word": "BLITHE",
    "type": "synonym",
    "correct": "Carefree",
    "distractors": [
      "Miserable",
      "Worried",
      "Heavy",
      "Somber"
    ],
    "expl": "Blithe means happy and carefree."
  },
  {
    "word": "CALAMITY",
    "type": "synonym",
    "correct": "Catastrophe",
    "distractors": [
      "Blessing",
      "Miracle",
      "Success",
      "Triumph"
    ],
    "expl": "Calamity means a disaster or catastrophe."
  },
  {
    "word": "DEARTH",
    "type": "synonym",
    "correct": "Scarcity",
    "distractors": [
      "Abundance",
      "Profusion",
      "Plethora",
      "Surplus"
    ],
    "expl": "Dearth means a scarcity or lack of something."
  },
  {
    "word": "EULOGY",
    "type": "synonym",
    "correct": "Tribute",
    "distractors": [
      "Condemnation",
      "Criticism",
      "Insult",
      "Slander"
    ],
    "expl": "Eulogy means a speech of high praise or tribute."
  },
  {
    "word": "FORTITUDE",
    "type": "synonym",
    "correct": "Courage",
    "distractors": [
      "Cowardice",
      "Weakness",
      "Fear",
      "Timidness"
    ],
    "expl": "Fortitude means courage in pain or adversity."
  },
  {
    "word": "GUILE",
    "type": "synonym",
    "correct": "Cunning",
    "distractors": [
      "Honesty",
      "Sincerity",
      "Frankness",
      "Openness"
    ],
    "expl": "Guile means sly or cunning intelligence."
  },
  {
    "word": "HASTEN",
    "type": "synonym",
    "correct": "Accelerate",
    "distractors": [
      "Delay",
      "Halt",
      "Slow",
      "Retard"
    ],
    "expl": "Hasten means to hurry or accelerate."
  },
  {
    "word": "IMPAIR",
    "type": "synonym",
    "correct": "Weaken",
    "distractors": [
      "Repair",
      "Improve",
      "Strengthen",
      "Mend"
    ],
    "expl": "Impair means to weaken or damage."
  },
  {
    "word": "JEOPARDY",
    "type": "synonym",
    "correct": "Peril",
    "distractors": [
      "Safety",
      "Security",
      "Protection",
      "Sanctuary"
    ],
    "expl": "Jeopardy means danger of loss, harm, or peril."
  },
  {
    "word": "KNELL",
    "type": "synonym",
    "correct": "Toll",
    "distractors": [
      "Silence",
      "Whisper",
      "Murmur",
      "Echo"
    ],
    "expl": "Knell means the solemn sound of a bell ringing."
  },
  {
    "word": "LIMPIDNESS",
    "type": "synonym",
    "correct": "Clarity",
    "distractors": [
      "Murkiness",
      "Darkness",
      "Opacity",
      "Fog"
    ],
    "expl": "Limpidness is the quality of being clear and transparent."
  },
  {
    "word": "MALADY",
    "type": "synonym",
    "correct": "Ailment",
    "distractors": [
      "Cure",
      "Remedy",
      "Health",
      "Fitness"
    ],
    "expl": "Malady means a disease or ailment."
  },
  {
    "word": "NOVICE",
    "type": "synonym",
    "correct": "Beginner",
    "distractors": [
      "Expert",
      "Veteran",
      "Master",
      "Professional"
    ],
    "expl": "Novice means a person new to a field or beginner."
  },
  {
    "word": "OBSTINATE",
    "type": "synonym",
    "correct": "Stubborn",
    "distractors": [
      "Pliable",
      "Yielding",
      "Flexible",
      "Compliant"
    ],
    "expl": "Obstinate means stubbornly refusing to change."
  },
  {
    "word": "PLACATE",
    "type": "synonym",
    "correct": "Appease",
    "distractors": [
      "Provoke",
      "Enrage",
      "Inflame",
      "Agitate"
    ],
    "expl": "Placate means to make someone less angry."
  },
  {
    "word": "QUOTA",
    "type": "synonym",
    "correct": "Allocation",
    "distractors": [
      "Excess",
      "Surplus",
      "Whole",
      "Unlimited"
    ],
    "expl": "Quota means a fixed share or allocation."
  },
  {
    "word": "RANCOR",
    "type": "synonym",
    "correct": "Bitterness",
    "distractors": [
      "Affection",
      "Kindness",
      "Friendliness",
      "Goodwill"
    ],
    "expl": "Rancor means bitterness or resentfulness."
  },
  {
    "word": "SAGACITY",
    "type": "synonym",
    "correct": "Wisdom",
    "distractors": [
      "Folly",
      "Stupidity",
      "Ignorance",
      "Foolishness"
    ],
    "expl": "Sagacity means wisdom and good judgment."
  },
  {
    "word": "TURBULENT",
    "type": "synonym",
    "correct": "Tumultuous",
    "distractors": [
      "Serene",
      "Calm",
      "Peaceful",
      "Tranquil"
    ],
    "expl": "Turbulent means characterized by conflict or disorder."
  },
  {
    "word": "URBANE",
    "type": "synonym",
    "correct": "Suave",
    "distractors": [
      "Boorish",
      "Clumsy",
      "Crude",
      "Rustic"
    ],
    "expl": "Urbane means courteous and refined in manner."
  },
  {
    "word": "VIGILANT",
    "type": "synonym",
    "correct": "Watchful",
    "distractors": [
      "Negligent",
      "Inattentive",
      "Careless",
      "Unaware"
    ],
    "expl": "Vigilant means keeping careful watch for danger."
  },
  {
    "word": "WARRANT",
    "type": "synonym",
    "correct": "Justify",
    "distractors": [
      "Disprove",
      "Reject",
      "Forbid",
      "Cancel"
    ],
    "expl": "Warrant means to justify or necessitate a course of action."
  },
  {
    "word": "YEARN",
    "type": "synonym",
    "correct": "Crave",
    "distractors": [
      "Despise",
      "Loathe",
      "Reject",
      "Spurn"
    ],
    "expl": "Yearn means to have an intense longing or craving."
  },
  {
    "word": "APOGEE",
    "type": "synonym",
    "correct": "Apex",
    "distractors": [
      "Bottom",
      "Base",
      "Depression",
      "Trough"
    ],
    "expl": "Apogee is the highest point or culmination."
  },
  {
    "word": "BANAL",
    "type": "synonym",
    "correct": "Hackneyed",
    "distractors": [
      "Fresh",
      "Novel",
      "Exciting",
      "Profound"
    ],
    "expl": "Banal means so lacking in originality as to be boring."
  },
  {
    "word": "CASTIGATION",
    "type": "synonym",
    "correct": "Chastisement",
    "distractors": [
      "Commendation",
      "Compliment",
      "Praise",
      "Reward"
    ],
    "expl": "Castigation means severe punishment or criticism."
  },
  {
    "word": "DEFICIENCY",
    "type": "synonym",
    "correct": "Shortage",
    "distractors": [
      "Surplus",
      "Sufficiency",
      "Excess",
      "Wealth"
    ],
    "expl": "Deficiency means a lack or shortage."
  },
  {
    "word": "EMULATE",
    "type": "synonym",
    "correct": "Imitate",
    "distractors": [
      "Neglect",
      "Differ",
      "Reject",
      "Oppose"
    ],
    "expl": "Emulate means to match or imitate through effort."
  },
  {
    "word": "FEASIBLE",
    "type": "synonym",
    "correct": "Viable",
    "distractors": [
      "Impossible",
      "Unworkable",
      "Impractical",
      "Utopian"
    ],
    "expl": "Feasible means possible and practical to do."
  },
  {
    "word": "GAUNT",
    "type": "synonym",
    "correct": "Emaciated",
    "distractors": [
      "Plump",
      "Corpulent",
      "Fleshy",
      "Robust"
    ],
    "expl": "Gaunt means lean and haggard."
  },
  {
    "word": "HEED",
    "type": "synonym",
    "correct": "Attend",
    "distractors": [
      "Ignore",
      "Disregard",
      "Neglect",
      "Overlook"
    ],
    "expl": "Heed means to pay attention to or take notice of."
  },
  {
    "word": "IMPUNITY",
    "type": "synonym",
    "correct": "Exemption",
    "distractors": [
      "Punishment",
      "Liability",
      "Vulnerability",
      "Guilt"
    ],
    "expl": "Impunity means exemption from punishment."
  },
  {
    "word": "JETTISON",
    "type": "synonym",
    "correct": "Discard",
    "distractors": [
      "Retain",
      "Preserve",
      "Salvage",
      "Keep"
    ],
    "expl": "Jettison means to drop or discard."
  },
  {
    "word": "LACONISM",
    "type": "synonym",
    "correct": "Brevity",
    "distractors": [
      "Wordiness",
      "Prolixity",
      "Expansion",
      "Length"
    ],
    "expl": "Laconism is conciseness or brevity of expression."
  },
  {
    "word": "METTLE",
    "type": "synonym",
    "correct": "Fortitude",
    "distractors": [
      "Cowardice",
      "Weakness",
      "Frailty",
      "Fear"
    ],
    "expl": "Mettle means a person's ability to cope well with difficulties."
  },
  {
    "word": "NULLIFY",
    "type": "synonym",
    "correct": "Invalidate",
    "distractors": [
      "Validate",
      "Ratify",
      "Confirm",
      "Enact"
    ],
    "expl": "Nullify means to make legally null and void."
  },
  {
    "word": "OVERT",
    "type": "synonym",
    "correct": "Apparent",
    "distractors": [
      "Covert",
      "Secret",
      "Hidden",
      "Clandestine"
    ],
    "expl": "Overt means done or shown openly."
  },
  {
    "word": "PARADIGM",
    "type": "synonym",
    "correct": "Archetype",
    "distractors": [
      "Anomaly",
      "Deviation",
      "Aberration",
      "Exception"
    ],
    "expl": "Paradigm means a typical example or model."
  },
  {
    "word": "QUANDARY",
    "type": "synonym",
    "correct": "Predicament",
    "distractors": [
      "Resolution",
      "Certainty",
      "Solution",
      "Advantage"
    ],
    "expl": "Quandary means a state of perplexity or uncertainty over what to do."
  },
  {
    "word": "RESONATE",
    "type": "synonym",
    "correct": "Reverberate",
    "distractors": [
      "Muffle",
      "Quiet",
      "Silence",
      "Stifle"
    ],
    "expl": "Resonate means to produce or be filled with a deep reverberating sound."
  },
  {
    "word": "STRINGENT",
    "type": "synonym",
    "correct": "Rigorous",
    "distractors": [
      "Lenient",
      "Relaxed",
      "Flexible",
      "Permissive"
    ],
    "expl": "Stringent means strict, precise, and exacting."
  },
  {
    "word": "TENET",
    "type": "synonym",
    "correct": "Doctrine",
    "distractors": [
      "Heresy",
      "Skepticism",
      "Disbelief",
      "Doubt"
    ],
    "expl": "Tenet is a principle or belief held to be true by a group."
  },
  {
    "word": "UNERRING",
    "type": "synonym",
    "correct": "Faultless",
    "distractors": [
      "Fallible",
      "Flawed",
      "Imperfect",
      "Erratic"
    ],
    "expl": "Unerring means always right or accurate."
  },
  {
    "word": "VESTIGE",
    "type": "synonym",
    "correct": "Remnant",
    "distractors": [
      "Whole",
      "Entity",
      "Total",
      "Original"
    ],
    "expl": "Vestige is a trace of something that is disappearing or no longer exists."
  },
  {
    "word": "WANE",
    "type": "synonym",
    "correct": "Diminish",
    "distractors": [
      "Wax",
      "Grow",
      "Expand",
      "Flourish"
    ],
    "expl": "Wane means to decrease in vigor, power, or size."
  },
  {
    "word": "ACCOLADE",
    "type": "synonym",
    "correct": "Honour",
    "distractors": [
      "Criticism",
      "Censure",
      "Blame",
      "Condemnation"
    ],
    "expl": "Accolade is an award or privilege granted as an acknowledgment of merit."
  },
  {
    "word": "BUOYANT",
    "type": "synonym",
    "correct": "Resilient",
    "distractors": [
      "Depressed",
      "Gloomy",
      "Heavy",
      "Submerged"
    ],
    "expl": "Buoyant means cheerful, optimistic, or capable of floating."
  },
  {
    "word": "CENSURE",
    "type": "synonym",
    "correct": "Condemn",
    "distractors": [
      "Compliment",
      "Applaud",
      "Praise",
      "Extol"
    ],
    "expl": "Censure means to express severe disapproval of."
  },
  {
    "word": "DAUNTLESS",
    "type": "synonym",
    "correct": "Intrepid",
    "distractors": [
      "Fearful",
      "Cowardly",
      "Timid",
      "Apprehensive"
    ],
    "expl": "Dauntless means showing fearlessness and determination."
  },
  {
    "word": "EXEMPLAR",
    "type": "synonym",
    "correct": "Model",
    "distractors": [
      "Counterexample",
      "Imitation",
      "Flaw",
      "Originality"
    ],
    "expl": "Exemplar means a person or thing serving as a typical example or excellent model."
  },
  {
    "word": "FEALTY",
    "type": "synonym",
    "correct": "Allegiance",
    "distractors": [
      "Treachery",
      "Rebellion",
      "Disloyalty",
      "Betrayal"
    ],
    "expl": "Fealty means sworn loyalty to a lord or authority."
  },
  {
    "word": "GERMANE",
    "type": "synonym",
    "correct": "Relevant",
    "distractors": [
      "Irrelevant",
      "Inappropriate",
      "Unrelated",
      "Extraneous"
    ],
    "expl": "Germane means relevant to a subject under consideration."
  },
  {
    "word": "HUBRIS",
    "type": "synonym",
    "correct": "Arrogance",
    "distractors": [
      "Humility",
      "Modesty",
      "Meekness",
      "Diffidence"
    ],
    "expl": "Hubris means excessive pride or self-confidence."
  },
  {
    "word": "INCLINE",
    "type": "synonym",
    "correct": "Tendency",
    "distractors": [
      "Aversion",
      "Resistance",
      "Opposite",
      "Level"
    ],
    "expl": "Incline means to have a disposition or tendency toward something."
  }
];
export const ANALOGY_BANK = [
  {
    "pair": "COMPOSER : SCORE",
    "rel": "creator to notation",
    "correct": "PLAYWRIGHT : SCRIPT",
    "distractors": [
      "ACTOR : THEATER",
      "DIRECTOR : FILM",
      "POET : AUDIENCE",
      "DANCER : STAGE"
    ],
    "expl": "A composer creates a musical score; a playwright writes a theatrical script."
  },
  {
    "pair": "THERMOMETER : TEMPERATURE",
    "rel": "instrument to metric",
    "correct": "BAROMETER : PRESSURE",
    "distractors": [
      "CLOCK : SECOND",
      "RULER : WOOD",
      "SCALE : HEAVY",
      "MICROSCOPE : LENS"
    ],
    "expl": "A thermometer measures temperature; a barometer measures atmospheric pressure."
  },
  {
    "pair": "OASIS : DESERT",
    "rel": "refuge in harsh terrain",
    "correct": "ISLAND : OCEAN",
    "distractors": [
      "FOREST : TREE",
      "VALLEY : MOUNTAIN",
      "RIVER : STREAM",
      "LAKE : WATER"
    ],
    "expl": "An oasis is an isolated fertile spot surrounded by desert; an island is isolated land surrounded by ocean."
  },
  {
    "pair": "SEISMOGRAPH : EARTHQUAKE",
    "rel": "instrument to phenomenon",
    "correct": "ANEMOMETER : WIND",
    "distractors": [
      "RADAR : PILOT",
      "TELESCOPE : STAR",
      "STETHOSCOPE : MEDICINE",
      "SPEEDOMETER : TIRE"
    ],
    "expl": "A seismograph detects and records earthquakes; an anemometer measures wind speed."
  },
  {
    "pair": "SURGEON : SCALPEL",
    "rel": "professional to tool",
    "correct": "SCULPTOR : CHISEL",
    "distractors": [
      "PAINTER : CANVAS",
      "WRITER : BOOK",
      "CARPENTER : WOOD",
      "TEACHER : CHALKBOARD"
    ],
    "expl": "A surgeon works with a scalpel; a sculptor works with a chisel."
  },
  {
    "pair": "CONSTELLATION : STAR",
    "rel": "whole to constituent element",
    "correct": "ARCHIPELAGO : ISLAND",
    "distractors": [
      "FOREST : WOOD",
      "OCEAN : SHORE",
      "GALAXY : PLANET",
      "MOUNTAIN : VALLEY"
    ],
    "expl": "A constellation is composed of stars; an archipelago is composed of islands."
  },
  {
    "pair": "VACCINE : PREVENT",
    "rel": "entity to purpose",
    "correct": "ANTIDOTE : COUNTERACT",
    "distractors": [
      "MEDICINE : SICK",
      "DIAGNOSIS : CURE",
      "SURGERY : HEAL",
      "PILL : SWALLOW"
    ],
    "expl": "A vaccine serves to prevent disease; an antidote serves to counteract poison."
  },
  {
    "pair": "GLUTTON : EAT",
    "rel": "excessive behavior",
    "correct": "SPENDTHRIFT : SQUANDER",
    "distractors": [
      "SLOTH : REST",
      "MISER : SAVE",
      "SCHOLAR : STUDY",
      "ATHLETE : TRAIN"
    ],
    "expl": "A glutton excessively eats; a spendthrift excessively squanders money."
  },
  {
    "pair": "SOLDIER : REGIMENT",
    "rel": "individual to military group",
    "correct": "SAILOR : CREW",
    "distractors": [
      "PILOT : AIRPLANE",
      "GENERAL : ARMY",
      "CAPTAIN : SHIP",
      "CADET : ACADEMY"
    ],
    "expl": "A soldier is a member of a regiment; a sailor is a member of a crew."
  },
  {
    "pair": "CHEF : RECIPE",
    "rel": "agent following instructions",
    "correct": "NAVIGATOR : CHART",
    "distractors": [
      "DANCER : STAGE",
      "ACTOR : PLAY",
      "ARTIST : EASEL",
      "AUTHOR : PEN"
    ],
    "expl": "A chef guides their work by a recipe; a navigator guides travel by a chart."
  },
  {
    "pair": "EPILOGUE : NOVEL",
    "rel": "concluding section to work",
    "correct": "CODA : SYMPHONY",
    "distractors": [
      "PREFACE : ESSAY",
      "CLIMAX : STORY",
      "INDEX : ENCYCLOPEDIA",
      "CHAPTER : BOOK"
    ],
    "expl": "An epilogue concludes a novel; a coda concludes a symphony."
  },
  {
    "pair": "DROUGHT : RAIN",
    "rel": "condition defined by absence",
    "correct": "FAMINE : FOOD",
    "distractors": [
      "FLOOD : WATER",
      "DESERT : SUN",
      "WINTER : COLD",
      "STORM : WIND"
    ],
    "expl": "A drought is characterized by the absence of rain; a famine is characterized by the absence of food."
  },
  {
    "pair": "NOMAD : WANDERING",
    "rel": "person to characteristic state",
    "correct": "ANCHORITE : SOLITARY",
    "distractors": [
      "PUPIL : OBEDIENT",
      "SCHOLAR : STUDIOUS",
      "LEADER : POWERFUL",
      "WARRIOR : FEARLESS"
    ],
    "expl": "A nomad is inherently wandering; an anchorite (religious recluse) is inherently solitary."
  },
  {
    "pair": "KEYBOARD : PIANO",
    "rel": "part to musical instrument",
    "correct": "FRET : GUITAR",
    "distractors": [
      "STRINGS : VIOLIN",
      "DRUMSTICK : DRUM",
      "BOW : CELLO",
      "PEDAL : HARP"
    ],
    "expl": "A keyboard is a structural part of a piano; frets are structural parts of a guitar."
  },
  {
    "pair": "DISCORD : HARMONY",
    "rel": "antonyms",
    "correct": "FRICTION : SMOOTHNESS",
    "distractors": [
      "NOISE : SILENCE",
      "CONFLICT : WAR",
      "AGREEMENT : PEACE",
      "MELODY : SONG"
    ],
    "expl": "Discord is the lack of harmony; friction opposes smoothness."
  },
  {
    "pair": "CURATOR : MUSEUM",
    "rel": "manager to institution",
    "correct": "LIBRARIAN : LIBRARY",
    "distractors": [
      "TEACHER : SCHOOL",
      "WARDEN : PRISON",
      "RABBI : SYNAGOGUE",
      "CHEF : KITCHEN"
    ],
    "expl": "A curator oversees a museum collection; a librarian oversees a library collection."
  },
  {
    "pair": "CATERPILLAR : BUTTERFLY",
    "rel": "larva to adult form",
    "correct": "TADPOLE : FROG",
    "distractors": [
      "EGG : CHICKEN",
      "SEED : FLOWER",
      "FAWN : DEER",
      "LAMB : SHEEP"
    ],
    "expl": "A caterpillar metamorphoses into a butterfly; a tadpole metamorphoses into a frog."
  },
  {
    "pair": "GRAVITY : ATTRACT",
    "rel": "fundamental force to action",
    "correct": "MAGNET : REPEL",
    "distractors": [
      "FRICTION : SLOW",
      "WATER : WET",
      "SUN : SHINE",
      "FIRE : BURN"
    ],
    "expl": "Gravity serves to attract; a magnetic pole can repel opposite charges."
  },
  {
    "pair": "INSOMNIA : SLEEP",
    "rel": "disorder defined by lack",
    "correct": "AMNESIA : MEMORY",
    "distractors": [
      "ANEMIA : BLOOD",
      "FATIGUE : ENERGY",
      "NAUSEA : STOMACH",
      "FEVER : HEAT"
    ],
    "expl": "Insomnia is the inability to sleep; amnesia is the loss of memory."
  },
  {
    "pair": "ALTIMETER : ALTITUDE",
    "rel": "instrument to parameter",
    "correct": "CHRONOMETER : TIME",
    "distractors": [
      "PEDOMETER : SPEED",
      "ODOMETER : WEIGHT",
      "CALIPER : ANGLE",
      "PRISM : SOUND"
    ],
    "expl": "An altimeter measures altitude; a chronometer measures time."
  },
  {
    "pair": "MICROSCOPE : MAGNIFY",
    "rel": "tool to primary function",
    "correct": "STETHOSCOPE : AMPLIFY",
    "distractors": [
      "MAGNIFY : MICROSCOPE",
      "STETHOSCOPE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: tool to primary function. MICROSCOPE : MAGNIFY shares this exact relationship with STETHOSCOPE : AMPLIFY."
  },
  {
    "pair": "KILN : CERAMICS",
    "rel": "heating apparatus to material processed",
    "correct": "FURNACE : STEEL",
    "distractors": [
      "CERAMICS : KILN",
      "FURNACE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: heating apparatus to material processed. KILN : CERAMICS shares this exact relationship with FURNACE : STEEL."
  },
  {
    "pair": "CONDUCTOR : ORCHESTRA",
    "rel": "leader to performing ensemble",
    "correct": "DIRECTOR : CAST",
    "distractors": [
      "ORCHESTRA : CONDUCTOR",
      "DIRECTOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: leader to performing ensemble. CONDUCTOR : ORCHESTRA shares this exact relationship with DIRECTOR : CAST."
  },
  {
    "pair": "AUTHOR : PROSE",
    "rel": "creator to literary form produced",
    "correct": "POET : VERSE",
    "distractors": [
      "PROSE : AUTHOR",
      "POET : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: creator to literary form produced. AUTHOR : PROSE shares this exact relationship with POET : VERSE."
  },
  {
    "pair": "COBBLER : SHOE",
    "rel": "craftsman to product fabricated",
    "correct": "TAILOR : GARMENT",
    "distractors": [
      "SHOE : COBBLER",
      "TAILOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: craftsman to product fabricated. COBBLER : SHOE shares this exact relationship with TAILOR : GARMENT."
  },
  {
    "pair": "CARTOGRAPHER : MAP",
    "rel": "creator to reference work compiled",
    "correct": "LEXICOGRAPHER : DICTIONARY",
    "distractors": [
      "MAP : CARTOGRAPHER",
      "LEXICOGRAPHER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: creator to reference work compiled. CARTOGRAPHER : MAP shares this exact relationship with LEXICOGRAPHER : DICTIONARY."
  },
  {
    "pair": "BALLAD : SONG",
    "rel": "specific subgenre to broader category",
    "correct": "SONNET : POEM",
    "distractors": [
      "SONG : BALLAD",
      "SONNET : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: specific subgenre to broader category. BALLAD : SONG shares this exact relationship with SONNET : POEM."
  },
  {
    "pair": "INCISION : SCALPEL",
    "rel": "wound type to implement causing it",
    "correct": "PUNCTURE : NEEDLE",
    "distractors": [
      "SCALPEL : INCISION",
      "PUNCTURE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: wound type to implement causing it. INCISION : SCALPEL shares this exact relationship with PUNCTURE : NEEDLE."
  },
  {
    "pair": "DILATION : EXPAND",
    "rel": "physical process to kinematic outcome",
    "correct": "CONTRACTION : SHRINK",
    "distractors": [
      "EXPAND : DILATION",
      "CONTRACTION : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: physical process to kinematic outcome. DILATION : EXPAND shares this exact relationship with CONTRACTION : SHRINK."
  },
  {
    "pair": "SEED : SPROUT",
    "rel": "origin vessel to biological germination",
    "correct": "EGG : HATCH",
    "distractors": [
      "SPROUT : SEED",
      "EGG : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: origin vessel to biological germination. SEED : SPROUT shares this exact relationship with EGG : HATCH."
  },
  {
    "pair": "PRISM : LIGHT",
    "rel": "apparatus to separation of components",
    "correct": "CENTRIFUGE : FLUID",
    "distractors": [
      "LIGHT : PRISM",
      "CENTRIFUGE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: apparatus to separation of components. PRISM : LIGHT shares this exact relationship with CENTRIFUGE : FLUID."
  },
  {
    "pair": "HELMET : HEAD",
    "rel": "protective armor to body part shielded",
    "correct": "GAUNTLET : HAND",
    "distractors": [
      "HEAD : HELMET",
      "GAUNTLET : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: protective armor to body part shielded. HELMET : HEAD shares this exact relationship with GAUNTLET : HAND."
  },
  {
    "pair": "OBLIVIOUS : AWARENESS",
    "rel": "cognitive deficit to missing faculty",
    "correct": "MYOPIC : FORESIGHT",
    "distractors": [
      "AWARENESS : OBLIVIOUS",
      "MYOPIC : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: cognitive deficit to missing faculty. OBLIVIOUS : AWARENESS shares this exact relationship with MYOPIC : FORESIGHT."
  },
  {
    "pair": "STALACTITE : CEILING",
    "rel": "geological speleothem to point of origin",
    "correct": "STALAGMITE : FLOOR",
    "distractors": [
      "CEILING : STALACTITE",
      "STALAGMITE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: geological speleothem to point of origin. STALACTITE : CEILING shares this exact relationship with STALAGMITE : FLOOR."
  },
  {
    "pair": "CANOPY : RAINFOREST",
    "rel": "uppermost covering to structural ecosystem",
    "correct": "ROOF : HOUSE",
    "distractors": [
      "RAINFOREST : CANOPY",
      "ROOF : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: uppermost covering to structural ecosystem. CANOPY : RAINFOREST shares this exact relationship with ROOF : HOUSE."
  },
  {
    "pair": "CONVEX : CURVED",
    "rel": "geometric shape to fundamental property",
    "correct": "POLYGONAL : ANGULAR",
    "distractors": [
      "CURVED : CONVEX",
      "POLYGONAL : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: geometric shape to fundamental property. CONVEX : CURVED shares this exact relationship with POLYGONAL : ANGULAR."
  },
  {
    "pair": "SOLVENT : DISSOLVE",
    "rel": "chemical agent to functional role",
    "correct": "CATALYST : ACCELERATE",
    "distractors": [
      "DISSOLVE : SOLVENT",
      "CATALYST : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: chemical agent to functional role. SOLVENT : DISSOLVE shares this exact relationship with CATALYST : ACCELERATE."
  },
  {
    "pair": "PULLEY : LEVERAGE",
    "rel": "mechanical system to physical advantage",
    "correct": "RUDDER : DIRECTION",
    "distractors": [
      "LEVERAGE : PULLEY",
      "RUDDER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: mechanical system to physical advantage. PULLEY : LEVERAGE shares this exact relationship with RUDDER : DIRECTION."
  },
  {
    "pair": "TELESCOPE : ASTRONOMER",
    "rel": "observational tool to specialized practitioner",
    "correct": "SEXTANT : NAVIGATOR",
    "distractors": [
      "ASTRONOMER : TELESCOPE",
      "SEXTANT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: observational tool to specialized practitioner. TELESCOPE : ASTRONOMER shares this exact relationship with SEXTANT : NAVIGATOR."
  },
  {
    "pair": "EPITAPH : TOMBSTONE",
    "rel": "commemorative text to stone substrate",
    "correct": "INSCRIPTION : MONUMENT",
    "distractors": [
      "TOMBSTONE : EPITAPH",
      "INSCRIPTION : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: commemorative text to stone substrate. EPITAPH : TOMBSTONE shares this exact relationship with INSCRIPTION : MONUMENT."
  },
  {
    "pair": "CORONA : SUN",
    "rel": "luminous ring to celestial source",
    "correct": "HALO : MOON",
    "distractors": [
      "SUN : CORONA",
      "HALO : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: luminous ring to celestial source. CORONA : SUN shares this exact relationship with HALO : MOON."
  },
  {
    "pair": "HARBOR : VESSEL",
    "rel": "protective shelter to transportation craft",
    "correct": "HANGAR : AIRCRAFT",
    "distractors": [
      "VESSEL : HARBOR",
      "HANGAR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: protective shelter to transportation craft. HARBOR : VESSEL shares this exact relationship with HANGAR : AIRCRAFT."
  },
  {
    "pair": "PROLOGUE : SPEECH",
    "rel": "introductory piece to extended performance",
    "correct": "OVERTURE : OPERA",
    "distractors": [
      "SPEECH : PROLOGUE",
      "OVERTURE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: introductory piece to extended performance. PROLOGUE : SPEECH shares this exact relationship with OVERTURE : OPERA."
  },
  {
    "pair": "SCYTHE : REAP",
    "rel": "agricultural implement to harvesting action",
    "correct": "AXE : FELL",
    "distractors": [
      "REAP : SCYTHE",
      "AXE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: agricultural implement to harvesting action. SCYTHE : REAP shares this exact relationship with AXE : FELL."
  },
  {
    "pair": "QUIVER : ARROW",
    "rel": "portable sheath to ranged weapon",
    "correct": "HOLSTER : PISTOL",
    "distractors": [
      "ARROW : QUIVER",
      "HOLSTER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: portable sheath to ranged weapon. QUIVER : ARROW shares this exact relationship with HOLSTER : PISTOL."
  },
  {
    "pair": "APOSTLE : CREED",
    "rel": "dedicated follower to guiding ideology",
    "correct": "ADVOCATE : CAUSE",
    "distractors": [
      "CREED : APOSTLE",
      "ADVOCATE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: dedicated follower to guiding ideology. APOSTLE : CREED shares this exact relationship with ADVOCATE : CAUSE."
  },
  {
    "pair": "CHAMELEON : CAMOUFLAGE",
    "rel": "organism to primary defense mechanism",
    "correct": "PORCUPINE : QUILLS",
    "distractors": [
      "CAMOUFLAGE : CHAMELEON",
      "PORCUPINE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: organism to primary defense mechanism. CHAMELEON : CAMOUFLAGE shares this exact relationship with PORCUPINE : QUILLS."
  },
  {
    "pair": "TRIANGLE : PYRAMID",
    "rel": "two-dimensional base to three-dimensional polyhedral form",
    "correct": "SQUARE : CUBE",
    "distractors": [
      "PYRAMID : TRIANGLE",
      "SQUARE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: two-dimensional base to three-dimensional polyhedral form. TRIANGLE : PYRAMID shares this exact relationship with SQUARE : CUBE."
  },
  {
    "pair": "ANARCHY : GOVERNMENT",
    "rel": "state of disorder to principle that is absent",
    "correct": "CHAOS : ORDER",
    "distractors": [
      "GOVERNMENT : ANARCHY",
      "CHAOS : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: state of disorder to principle that is absent. ANARCHY : GOVERNMENT shares this exact relationship with CHAOS : ORDER."
  },
  {
    "pair": "FOSSIL : PALEONTOLOGY",
    "rel": "relic excavated to field of study",
    "correct": "ARTIFACT : ARCHAEOLOGY",
    "distractors": [
      "PALEONTOLOGY : FOSSIL",
      "ARTIFACT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: relic excavated to field of study. FOSSIL : PALEONTOLOGY shares this exact relationship with ARTIFACT : ARCHAEOLOGY."
  },
  {
    "pair": "FODDER : LIVESTOCK",
    "rel": "nutritional/energetic sustenance to consumer",
    "correct": "FUEL : ENGINE",
    "distractors": [
      "LIVESTOCK : FODDER",
      "FUEL : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: nutritional/energetic sustenance to consumer. FODDER : LIVESTOCK shares this exact relationship with FUEL : ENGINE."
  },
  {
    "pair": "TETHER : ROAM",
    "rel": "physical restraint to prohibited motion",
    "correct": "HANDCUFFS : ESCAPE",
    "distractors": [
      "ROAM : TETHER",
      "HANDCUFFS : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: physical restraint to prohibited motion. TETHER : ROAM shares this exact relationship with HANDCUFFS : ESCAPE."
  },
  {
    "pair": "MORTAR : BRICK",
    "rel": "binding medium to building components",
    "correct": "SOLDER : WIRE",
    "distractors": [
      "BRICK : MORTAR",
      "SOLDER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: binding medium to building components. MORTAR : BRICK shares this exact relationship with SOLDER : WIRE."
  },
  {
    "pair": "BATON : RELAY",
    "rel": "portable object passed between participants",
    "correct": "TORCH : PROCESSION",
    "distractors": [
      "RELAY : BATON",
      "TORCH : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: portable object passed between participants. BATON : RELAY shares this exact relationship with TORCH : PROCESSION."
  },
  {
    "pair": "GEYSER : STEAM",
    "rel": "geothermal vent to discharged material",
    "correct": "VOLCANO : LAVA",
    "distractors": [
      "STEAM : GEYSER",
      "VOLCANO : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: geothermal vent to discharged material. GEYSER : STEAM shares this exact relationship with VOLCANO : LAVA."
  },
  {
    "pair": "CHORD : NOTE",
    "rel": "composite harmony to constituent frequency",
    "correct": "SPECTRUM : COLOR",
    "distractors": [
      "NOTE : CHORD",
      "SPECTRUM : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: composite harmony to constituent frequency. CHORD : NOTE shares this exact relationship with SPECTRUM : COLOR."
  },
  {
    "pair": "LENS : REFRACT",
    "rel": "optical medium to light transformation",
    "correct": "MIRROR : REFLECT",
    "distractors": [
      "REFRACT : LENS",
      "MIRROR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: optical medium to light transformation. LENS : REFRACT shares this exact relationship with MIRROR : REFLECT."
  },
  {
    "pair": "DOCK : SHIP",
    "rel": "designated parking infrastructure to vehicle",
    "correct": "BERTH : TRAIN",
    "distractors": [
      "SHIP : DOCK",
      "BERTH : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: designated parking infrastructure to vehicle. DOCK : SHIP shares this exact relationship with BERTH : TRAIN."
  },
  {
    "pair": "HERBIVORE : PLANTS",
    "rel": "organism classification to mandatory dietary source",
    "correct": "CARNIVORE : MEAT",
    "distractors": [
      "PLANTS : HERBIVORE",
      "CARNIVORE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: organism classification to mandatory dietary source. HERBIVORE : PLANTS shares this exact relationship with CARNIVORE : MEAT."
  },
  {
    "pair": "CRESCENDO : VOLUME",
    "rel": "gradual increase to dynamic dimension",
    "correct": "ACCELERATION : SPEED",
    "distractors": [
      "VOLUME : CRESCENDO",
      "ACCELERATION : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: gradual increase to dynamic dimension. CRESCENDO : VOLUME shares this exact relationship with ACCELERATION : SPEED."
  },
  {
    "pair": "ENZYME : PROTEIN",
    "rel": "specific biochemical entity to macromolecular class",
    "correct": "GLUCOSE : SUGAR",
    "distractors": [
      "PROTEIN : ENZYME",
      "GLUCOSE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: specific biochemical entity to macromolecular class. ENZYME : PROTEIN shares this exact relationship with GLUCOSE : SUGAR."
  },
  {
    "pair": "ANCHOR : DRIFT",
    "rel": "restraining mechanism to dangerous outcome averted",
    "correct": "BRAKE : COLLIDE",
    "distractors": [
      "DRIFT : ANCHOR",
      "BRAKE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: restraining mechanism to dangerous outcome averted. ANCHOR : DRIFT shares this exact relationship with BRAKE : COLLIDE."
  },
  {
    "pair": "GILL : WATER",
    "rel": "respiratory organ to gaseous medium filtered",
    "correct": "LUNG : AIR",
    "distractors": [
      "WATER : GILL",
      "LUNG : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: respiratory organ to gaseous medium filtered. GILL : WATER shares this exact relationship with LUNG : AIR."
  },
  {
    "pair": "DECIBEL : SOUND",
    "rel": "scientific unit of measurement to physical stimulus",
    "correct": "LUMEN : BRIGHTNESS",
    "distractors": [
      "SOUND : DECIBEL",
      "LUMEN : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: scientific unit of measurement to physical stimulus. DECIBEL : SOUND shares this exact relationship with LUMEN : BRIGHTNESS."
  },
  {
    "pair": "BEACON : GUIDE",
    "rel": "sensory signaling device to communicative intent",
    "correct": "SIREN : WARN",
    "distractors": [
      "GUIDE : BEACON",
      "SIREN : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: sensory signaling device to communicative intent. BEACON : GUIDE shares this exact relationship with SIREN : WARN."
  },
  {
    "pair": "FORGERY : GENUINE",
    "rel": "fraudulent copy to authentic standard",
    "correct": "HOAX : TRUTH",
    "distractors": [
      "GENUINE : FORGERY",
      "HOAX : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: fraudulent copy to authentic standard. FORGERY : GENUINE shares this exact relationship with HOAX : TRUTH."
  },
  {
    "pair": "METEOR : CRATER",
    "rel": "primary event to subsequent physical artifact",
    "correct": "LIGHTNING : THUNDER",
    "distractors": [
      "CRATER : METEOR",
      "LIGHTNING : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: primary event to subsequent physical artifact. METEOR : CRATER shares this exact relationship with LIGHTNING : THUNDER."
  },
  {
    "pair": "SCURVY : VITAMIN",
    "rel": "pathological deficiency state to vital element lacking",
    "correct": "DROUGHT : MOISTURE",
    "distractors": [
      "VITAMIN : SCURVY",
      "DROUGHT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: pathological deficiency state to vital element lacking. SCURVY : VITAMIN shares this exact relationship with DROUGHT : MOISTURE."
  },
  {
    "pair": "KNOT : ROPE",
    "rel": "junction method to flexible linear medium",
    "correct": "SPLICE : WIRE",
    "distractors": [
      "ROPE : KNOT",
      "SPLICE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: junction method to flexible linear medium. KNOT : ROPE shares this exact relationship with SPLICE : WIRE."
  },
  {
    "pair": "PERISCOPE : SUBMARINE",
    "rel": "indirect vision apparatus to vehicle equipped",
    "correct": "MIRROR : CAR",
    "distractors": [
      "SUBMARINE : PERISCOPE",
      "MIRROR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: indirect vision apparatus to vehicle equipped. PERISCOPE : SUBMARINE shares this exact relationship with MIRROR : CAR."
  },
  {
    "pair": "ANTENNA : TRANSMIT",
    "rel": "specialized conduit to delivery function",
    "correct": "PIPELINE : TRANSPORT",
    "distractors": [
      "TRANSMIT : ANTENNA",
      "PIPELINE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: specialized conduit to delivery function. ANTENNA : TRANSMIT shares this exact relationship with PIPELINE : TRANSPORT."
  },
  {
    "pair": "SYLLABLE : WORD",
    "rel": "discrete structural unit to overarching literary construct",
    "correct": "STANZA : POEM",
    "distractors": [
      "WORD : SYLLABLE",
      "STANZA : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: discrete structural unit to overarching literary construct. SYLLABLE : WORD shares this exact relationship with STANZA : POEM."
  },
  {
    "pair": "COMPASS : BEARING",
    "rel": "navigational/geometric tool to measurement provided",
    "correct": "PROTRACTOR : ANGLE",
    "distractors": [
      "BEARING : COMPASS",
      "PROTRACTOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: navigational/geometric tool to measurement provided. COMPASS : BEARING shares this exact relationship with PROTRACTOR : ANGLE."
  },
  {
    "pair": "PLIERS : GRIP",
    "rel": "hand tool to mechanical operation executed",
    "correct": "SHEARS : CUT",
    "distractors": [
      "GRIP : PLIERS",
      "SHEARS : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: hand tool to mechanical operation executed. PLIERS : GRIP shares this exact relationship with SHEARS : CUT."
  },
  {
    "pair": "SPORE : FUNGUS",
    "rel": "reproductive dispersal agent to parent botanical organism",
    "correct": "ACORN : OAK",
    "distractors": [
      "FUNGUS : SPORE",
      "ACORN : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: reproductive dispersal agent to parent botanical organism. SPORE : FUNGUS shares this exact relationship with ACORN : OAK."
  },
  {
    "pair": "FUSE : CIRCUIT",
    "rel": "safety interrupt component to flow system",
    "correct": "VALVE : PIPE",
    "distractors": [
      "CIRCUIT : FUSE",
      "VALVE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: safety interrupt component to flow system. FUSE : CIRCUIT shares this exact relationship with VALVE : PIPE."
  },
  {
    "pair": "TRIBUTARY : RIVER",
    "rel": "converging flow to main systemic trunk",
    "correct": "OFFSHOOT : BRANCH",
    "distractors": [
      "RIVER : TRIBUTARY",
      "OFFSHOOT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: converging flow to main systemic trunk. TRIBUTARY : RIVER shares this exact relationship with OFFSHOOT : BRANCH."
  },
  {
    "pair": "CHAMELEON : PIGMENT",
    "rel": "animal to active fluid/color secretion used in survival",
    "correct": "OCTOPUS : INK",
    "distractors": [
      "PIGMENT : CHAMELEON",
      "OCTOPUS : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: animal to active fluid/color secretion used in survival. CHAMELEON : PIGMENT shares this exact relationship with OCTOPUS : INK."
  },
  {
    "pair": "AORTA : BLOOD",
    "rel": "major anatomical/civil conduit to vital fluid channeled",
    "correct": "AQUEDUCT : WATER",
    "distractors": [
      "BLOOD : AORTA",
      "AQUEDUCT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: major anatomical/civil conduit to vital fluid channeled. AORTA : BLOOD shares this exact relationship with AQUEDUCT : WATER."
  },
  {
    "pair": "RIVET : METAL",
    "rel": "permanent mechanical fastener to material bound",
    "correct": "STITCH : FABRIC",
    "distractors": [
      "METAL : RIVET",
      "STITCH : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: permanent mechanical fastener to material bound. RIVET : METAL shares this exact relationship with STITCH : FABRIC."
  },
  {
    "pair": "HYGROMETER : HUMIDITY",
    "rel": "specialized gauge to environmental parameter measured",
    "correct": "OHMMETER : RESISTANCE",
    "distractors": [
      "HUMIDITY : HYGROMETER",
      "OHMMETER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: specialized gauge to environmental parameter measured. HYGROMETER : HUMIDITY shares this exact relationship with OHMMETER : RESISTANCE."
  },
  {
    "pair": "SATELLITE : ORBIT",
    "rel": "suspended physical body to characteristic kinematic motion",
    "correct": "PENDULUM : OSCILLATE",
    "distractors": [
      "ORBIT : SATELLITE",
      "PENDULUM : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: suspended physical body to characteristic kinematic motion. SATELLITE : ORBIT shares this exact relationship with PENDULUM : OSCILLATE."
  },
  {
    "pair": "FLEDGLING : NEST",
    "rel": "developing individual leaving place of nurturance",
    "correct": "GRADUATE : UNIVERSITY",
    "distractors": [
      "NEST : FLEDGLING",
      "GRADUATE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: developing individual leaving place of nurturance. FLEDGLING : NEST shares this exact relationship with GRADUATE : UNIVERSITY."
  },
  {
    "pair": "ALIBI : ACCUSATION",
    "rel": "protective defense against incoming threat",
    "correct": "SHIELD : BLOW",
    "distractors": [
      "ACCUSATION : ALIBI",
      "SHIELD : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: protective defense against incoming threat. ALIBI : ACCUSATION shares this exact relationship with SHIELD : BLOW."
  },
  {
    "pair": "RIDGE : MOUNTAIN",
    "rel": "uppermost linear edge to elevated topographical/fluid mass",
    "correct": "CREST : WAVE",
    "distractors": [
      "MOUNTAIN : RIDGE",
      "CREST : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: uppermost linear edge to elevated topographical/fluid mass. RIDGE : MOUNTAIN shares this exact relationship with CREST : WAVE."
  },
  {
    "pair": "CHURN : BUTTER",
    "rel": "processing action to culinary product derived",
    "correct": "BREW : BEER",
    "distractors": [
      "BUTTER : CHURN",
      "BREW : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: processing action to culinary product derived. CHURN : BUTTER shares this exact relationship with BREW : BEER."
  },
  {
    "pair": "COCOON : METAMORPHOSIS",
    "rel": "protective enclosure during transformation phase",
    "correct": "INCUBATOR : DEVELOPMENT",
    "distractors": [
      "METAMORPHOSIS : COCOON",
      "INCUBATOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: protective enclosure during transformation phase. COCOON : METAMORPHOSIS shares this exact relationship with INCUBATOR : DEVELOPMENT."
  },
  {
    "pair": "SCAFFOLD : CONSTRUCTION",
    "rel": "temporary supportive scaffolding during rebuilding",
    "correct": "CAST : BONE",
    "distractors": [
      "CONSTRUCTION : SCAFFOLD",
      "CAST : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: temporary supportive scaffolding during rebuilding. SCAFFOLD : CONSTRUCTION shares this exact relationship with CAST : BONE."
  },
  {
    "pair": "EPICENTER : QUAKE",
    "rel": "focal surface point directly above energy release",
    "correct": "GROUND ZERO : BLAST",
    "distractors": [
      "QUAKE : EPICENTER",
      "GROUND ZERO : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: focal surface point directly above energy release. EPICENTER : QUAKE shares this exact relationship with GROUND ZERO : BLAST."
  },
  {
    "pair": "VENEER : FURNITURE",
    "rel": "protective aesthetic outer coating to underlying craft",
    "correct": "GLAZE : POTTERY",
    "distractors": [
      "FURNITURE : VENEER",
      "GLAZE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: protective aesthetic outer coating to underlying craft. VENEER : FURNITURE shares this exact relationship with GLAZE : POTTERY."
  },
  {
    "pair": "AMPLIFIER : SIGNAL",
    "rel": "mechanical/electronic device multiplying physical magnitude",
    "correct": "LEVER : FORCE",
    "distractors": [
      "SIGNAL : AMPLIFIER",
      "LEVER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: mechanical/electronic device multiplying physical magnitude. AMPLIFIER : SIGNAL shares this exact relationship with LEVER : FORCE."
  },
  {
    "pair": "FLOCK : BIRDS",
    "rel": "collective zoological noun to biological grouping",
    "correct": "SCHOOL : FISH",
    "distractors": [
      "BIRDS : FLOCK",
      "SCHOOL : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: collective zoological noun to biological grouping. FLOCK : BIRDS shares this exact relationship with SCHOOL : FISH."
  },
  {
    "pair": "TURBINE : GENERATOR",
    "rel": "mechanical prime mover to power converter driven",
    "correct": "PISTON : CRANKSHAFT",
    "distractors": [
      "GENERATOR : TURBINE",
      "PISTON : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: mechanical prime mover to power converter driven. TURBINE : GENERATOR shares this exact relationship with PISTON : CRANKSHAFT."
  },
  {
    "pair": "DAMS : FLOOD",
    "rel": "civil barrier infrastructure preventing inundation",
    "correct": "LEVEES : WATER",
    "distractors": [
      "FLOOD : DAMS",
      "LEVEES : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: civil barrier infrastructure preventing inundation. DAMS : FLOOD shares this exact relationship with LEVEES : WATER."
  },
  {
    "pair": "BACTERIA : INFECTION",
    "rel": "microscopic pathogen to disease state provoked",
    "correct": "VIRUS : CONTAGION",
    "distractors": [
      "INFECTION : BACTERIA",
      "VIRUS : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: microscopic pathogen to disease state provoked. BACTERIA : INFECTION shares this exact relationship with VIRUS : CONTAGION."
  },
  {
    "pair": "QUARANTINE : EPIDEMIC",
    "rel": "isolation barrier mitigating propagation",
    "correct": "FIREWALL : INTRUSION",
    "distractors": [
      "EPIDEMIC : QUARANTINE",
      "FIREWALL : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: isolation barrier mitigating propagation. QUARANTINE : EPIDEMIC shares this exact relationship with FIREWALL : INTRUSION."
  },
  {
    "pair": "SPARK : CONFLAGRATION",
    "rel": "minor initial stimulus to massive downstream effect",
    "correct": "RIPPLE : TIDAL WAVE",
    "distractors": [
      "CONFLAGRATION : SPARK",
      "RIPPLE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: minor initial stimulus to massive downstream effect. SPARK : CONFLAGRATION shares this exact relationship with RIPPLE : TIDAL WAVE."
  },
  {
    "pair": "GLACIER : MORAINE",
    "rel": "moving geological fluid mass to sediment deposit formed",
    "correct": "RIVER : DELTA",
    "distractors": [
      "MORAINE : GLACIER",
      "RIVER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: moving geological fluid mass to sediment deposit formed. GLACIER : MORAINE shares this exact relationship with RIVER : DELTA."
  },
  {
    "pair": "DIALECT : LANGUAGE",
    "rel": "subordinate taxonomic category to overarching group",
    "correct": "SPECIES : GENUS",
    "distractors": [
      "LANGUAGE : DIALECT",
      "SPECIES : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: subordinate taxonomic category to overarching group. DIALECT : LANGUAGE shares this exact relationship with SPECIES : GENUS."
  },
  {
    "pair": "CLOISTER : MONK",
    "rel": "communal architectural residence to vocation",
    "correct": "BARRACKS : SOLDIER",
    "distractors": [
      "MONK : CLOISTER",
      "BARRACKS : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: communal architectural residence to vocation. CLOISTER : MONK shares this exact relationship with BARRACKS : SOLDIER."
  },
  {
    "pair": "FUSION : ATOM",
    "rel": "consolidation process joining two autonomous entities",
    "correct": "MERGER : CORPORATION",
    "distractors": [
      "ATOM : FUSION",
      "MERGER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: consolidation process joining two autonomous entities. FUSION : ATOM shares this exact relationship with MERGER : CORPORATION."
  },
  {
    "pair": "TIE : RAILROAD",
    "rel": "transverse structural foundation supporting transportation span",
    "correct": "PIER : BRIDGE",
    "distractors": [
      "RAILROAD : TIE",
      "PIER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: transverse structural foundation supporting transportation span. TIE : RAILROAD shares this exact relationship with PIER : BRIDGE."
  },
  {
    "pair": "BALLAST : STABILITY",
    "rel": "submerged counterweight ensuring equilibrium",
    "correct": "RUDDER : STEER",
    "distractors": [
      "STABILITY : BALLAST",
      "RUDDER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: submerged counterweight ensuring equilibrium. BALLAST : STABILITY shares this exact relationship with RUDDER : STEER."
  },
  {
    "pair": "FATHOM : DEPTH",
    "rel": "nautical unit of measure to physical dimension",
    "correct": "KNOT : SPEED",
    "distractors": [
      "DEPTH : FATHOM",
      "KNOT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: nautical unit of measure to physical dimension. FATHOM : DEPTH shares this exact relationship with KNOT : SPEED."
  },
  {
    "pair": "ECLIPSE : OCCULTATION",
    "rel": "astronomical/meteorological event to scientific classification",
    "correct": "DROUGHT : DESICCATION",
    "distractors": [
      "OCCULTATION : ECLIPSE",
      "DROUGHT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: astronomical/meteorological event to scientific classification. ECLIPSE : OCCULTATION shares this exact relationship with DROUGHT : DESICCATION."
  },
  {
    "pair": "ALBUM : PHOTOGRAPHS",
    "rel": "curated collection to constituent assets",
    "correct": "PORTFOLIO : INVESTMENTS",
    "distractors": [
      "PHOTOGRAPHS : ALBUM",
      "PORTFOLIO : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: curated collection to constituent assets. ALBUM : PHOTOGRAPHS shares this exact relationship with PORTFOLIO : INVESTMENTS."
  },
  {
    "pair": "OSMOSIS : MEMBRANE",
    "rel": "passive transport across selective barrier",
    "correct": "FILTRATION : SIEVE",
    "distractors": [
      "MEMBRANE : OSMOSIS",
      "FILTRATION : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: passive transport across selective barrier. OSMOSIS : MEMBRANE shares this exact relationship with FILTRATION : SIEVE."
  },
  {
    "pair": "CATALYST : REACTION",
    "rel": "stimulating agent accelerating throughput rate",
    "correct": "INCENTIVE : PRODUCTIVITY",
    "distractors": [
      "REACTION : CATALYST",
      "INCENTIVE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: stimulating agent accelerating throughput rate. CATALYST : REACTION shares this exact relationship with INCENTIVE : PRODUCTIVITY."
  },
  {
    "pair": "ANESTHETIC : SENSATION",
    "rel": "pharmacological agent eliminating subjective state",
    "correct": "SEDATIVE : ANXIETY",
    "distractors": [
      "SENSATION : ANESTHETIC",
      "SEDATIVE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: pharmacological agent eliminating subjective state. ANESTHETIC : SENSATION shares this exact relationship with SEDATIVE : ANXIETY."
  },
  {
    "pair": "BUOY : REEF",
    "rel": "floating navigational hazard marker to maritime warning",
    "correct": "FLARE : DISTRESS",
    "distractors": [
      "REEF : BUOY",
      "FLARE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: floating navigational hazard marker to maritime warning. BUOY : REEF shares this exact relationship with FLARE : DISTRESS."
  },
  {
    "pair": "INSULATION : HEAT",
    "rel": "barrier material retarding energetic transmission",
    "correct": "SOUNDPROOFING : NOISE",
    "distractors": [
      "HEAT : INSULATION",
      "SOUNDPROOFING : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: barrier material retarding energetic transmission. INSULATION : HEAT shares this exact relationship with SOUNDPROOFING : NOISE."
  },
  {
    "pair": "GEAR : TORQUE",
    "rel": "simple mechanical transmission element to force channeled",
    "correct": "PULLEY : TENSION",
    "distractors": [
      "TORQUE : GEAR",
      "PULLEY : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: simple mechanical transmission element to force channeled. GEAR : TORQUE shares this exact relationship with PULLEY : TENSION."
  },
  {
    "pair": "HERBACEOUS : STEM",
    "rel": "botanical classification to structural support",
    "correct": "WOODY : TRUNK",
    "distractors": [
      "STEM : HERBACEOUS",
      "WOODY : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: botanical classification to structural support. HERBACEOUS : STEM shares this exact relationship with WOODY : TRUNK."
  },
  {
    "pair": "HYDRAULIC : LIQUID",
    "rel": "fluid power mechanical system to fluid medium employed",
    "correct": "PNEUMATIC : GAS",
    "distractors": [
      "LIQUID : HYDRAULIC",
      "PNEUMATIC : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: fluid power mechanical system to fluid medium employed. HYDRAULIC : LIQUID shares this exact relationship with PNEUMATIC : GAS."
  },
  {
    "pair": "ARCHIVE : DOCUMENTS",
    "rel": "secure repository to valuable items preserved",
    "correct": "VAULT : TREASURE",
    "distractors": [
      "DOCUMENTS : ARCHIVE",
      "VAULT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: secure repository to valuable items preserved. ARCHIVE : DOCUMENTS shares this exact relationship with VAULT : TREASURE."
  },
  {
    "pair": "EPIDERMIS : DERMIS",
    "rel": "outermost protective layer to deeper foundational substratum",
    "correct": "CRUST : MANTLE",
    "distractors": [
      "DERMIS : EPIDERMIS",
      "CRUST : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: outermost protective layer to deeper foundational substratum. EPIDERMIS : DERMIS shares this exact relationship with CRUST : MANTLE."
  },
  {
    "pair": "SPOKE : HUB",
    "rel": "radial linear element extending outward from central axis",
    "correct": "RAY : CENTER",
    "distractors": [
      "HUB : SPOKE",
      "RAY : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: radial linear element extending outward from central axis. SPOKE : HUB shares this exact relationship with RAY : CENTER."
  },
  {
    "pair": "THERMOSTAT : TEMPERATURE",
    "rel": "autonomous feedback regulator maintaining setpoint",
    "correct": "GOVERNOR : ENGINE SPEED",
    "distractors": [
      "TEMPERATURE : THERMOSTAT",
      "GOVERNOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: autonomous feedback regulator maintaining setpoint. THERMOSTAT : TEMPERATURE shares this exact relationship with GOVERNOR : ENGINE SPEED."
  },
  {
    "pair": "CALIPER : THICKNESS",
    "rel": "precision manual measurement gauge to linear dimension",
    "correct": "MICROMETER : DIAMETER",
    "distractors": [
      "THICKNESS : CALIPER",
      "MICROMETER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: precision manual measurement gauge to linear dimension. CALIPER : THICKNESS shares this exact relationship with MICROMETER : DIAMETER."
  },
  {
    "pair": "PIGMENT : PAINT",
    "rel": "coloring/chemical particulate suspended in liquid vehicle",
    "correct": "SOLUTE : SOLUTION",
    "distractors": [
      "PAINT : PIGMENT",
      "SOLUTE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: coloring/chemical particulate suspended in liquid vehicle. PIGMENT : PAINT shares this exact relationship with SOLUTE : SOLUTION."
  },
  {
    "pair": "DRY DOCK : SHIPBUILDING",
    "rel": "specialized industrial staging environment to manufactured good",
    "correct": "CLEANROOM : MICROCHIPS",
    "distractors": [
      "SHIPBUILDING : DRY DOCK",
      "CLEANROOM : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: specialized industrial staging environment to manufactured good. DRY DOCK : SHIPBUILDING shares this exact relationship with CLEANROOM : MICROCHIPS."
  },
  {
    "pair": "MONOLITH : STONE",
    "rel": "single continuous solid block to raw material",
    "correct": "INGOT : METAL",
    "distractors": [
      "STONE : MONOLITH",
      "INGOT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: single continuous solid block to raw material. MONOLITH : STONE shares this exact relationship with INGOT : METAL."
  },
  {
    "pair": "WAVELENGTH : FREQUENCY",
    "rel": "inverse physical relationship governed by fundamental law",
    "correct": "RESISTANCE : CURRENT",
    "distractors": [
      "FREQUENCY : WAVELENGTH",
      "RESISTANCE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: inverse physical relationship governed by fundamental law. WAVELENGTH : FREQUENCY shares this exact relationship with RESISTANCE : CURRENT."
  },
  {
    "pair": "PROPELLER : THRUST",
    "rel": "rotating mechanical contact component delivering kinetic drive",
    "correct": "WHEEL : TRACTION",
    "distractors": [
      "THRUST : PROPELLER",
      "WHEEL : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: rotating mechanical contact component delivering kinetic drive. PROPELLER : THRUST shares this exact relationship with WHEEL : TRACTION."
  },
  {
    "pair": "SUBPOENA : WITNESS",
    "rel": "formal judicial writ commanding participation",
    "correct": "WARRANT : SEARCH",
    "distractors": [
      "WITNESS : SUBPOENA",
      "WARRANT : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: formal judicial writ commanding participation. SUBPOENA : WITNESS shares this exact relationship with WARRANT : SEARCH."
  },
  {
    "pair": "STALEMATE : CHESS",
    "rel": "cessation of forward progress due to opposing forces",
    "correct": "GRIDLOCK : TRAFFIC",
    "distractors": [
      "CHESS : STALEMATE",
      "GRIDLOCK : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: cessation of forward progress due to opposing forces. STALEMATE : CHESS shares this exact relationship with GRIDLOCK : TRAFFIC."
  },
  {
    "pair": "REFUGEE : ASYLUM",
    "rel": "distressed individual seeking legal sanctuary",
    "correct": "DEBTOR : BANKRUPTCY",
    "distractors": [
      "ASYLUM : REFUGEE",
      "DEBTOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: distressed individual seeking legal sanctuary. REFUGEE : ASYLUM shares this exact relationship with DEBTOR : BANKRUPTCY."
  },
  {
    "pair": "PARACHUTE : DESCENT",
    "rel": "deceleration apparatus slowing downward/forward motion",
    "correct": "BRAKE : VELOCITY",
    "distractors": [
      "DESCENT : PARACHUTE",
      "BRAKE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: deceleration apparatus slowing downward/forward motion. PARACHUTE : DESCENT shares this exact relationship with BRAKE : VELOCITY."
  },
  {
    "pair": "ZENITH : HORIZON",
    "rel": "highest spatial point relative to reference baseline",
    "correct": "PEAK : VALLEY",
    "distractors": [
      "HORIZON : ZENITH",
      "PEAK : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: highest spatial point relative to reference baseline. ZENITH : HORIZON shares this exact relationship with PEAK : VALLEY."
  },
  {
    "pair": "APERTURE : CAMERA",
    "rel": "adjustable mechanical/biological opening regulating light admission",
    "correct": "PUPIL : EYE",
    "distractors": [
      "CAMERA : APERTURE",
      "PUPIL : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: adjustable mechanical/biological opening regulating light admission. APERTURE : CAMERA shares this exact relationship with PUPIL : EYE."
  },
  {
    "pair": "VORTEX : FLUID",
    "rel": "spinning rotational funnel structure to ambient medium",
    "correct": "CYCLONE : ATMOSPHERE",
    "distractors": [
      "FLUID : VORTEX",
      "CYCLONE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: spinning rotational funnel structure to ambient medium. VORTEX : FLUID shares this exact relationship with CYCLONE : ATMOSPHERE."
  },
  {
    "pair": "CATAPULT : PROJECTILE",
    "rel": "ancient mechanical tension siege weapon to munition launched",
    "correct": "SLING : STONE",
    "distractors": [
      "PROJECTILE : CATAPULT",
      "SLING : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: ancient mechanical tension siege weapon to munition launched. CATAPULT : PROJECTILE shares this exact relationship with SLING : STONE."
  },
  {
    "pair": "ALLOY : METALS",
    "rel": "composite synthesized material to basic chemical ingredients",
    "correct": "POLYMER : MONOMERS",
    "distractors": [
      "METALS : ALLOY",
      "POLYMER : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: composite synthesized material to basic chemical ingredients. ALLOY : METALS shares this exact relationship with POLYMER : MONOMERS."
  },
  {
    "pair": "SATELLITE : ANTENNA",
    "rel": "receptive focusing device to observation portal",
    "correct": "TELESCOPE : EYEPIECE",
    "distractors": [
      "ANTENNA : SATELLITE",
      "TELESCOPE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: receptive focusing device to observation portal. SATELLITE : ANTENNA shares this exact relationship with TELESCOPE : EYEPIECE."
  },
  {
    "pair": "VALVE : BACKFLOW",
    "rel": "directional check mechanism preventing hazardous reversal",
    "correct": "DAM : FLOODING",
    "distractors": [
      "BACKFLOW : VALVE",
      "DAM : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: directional check mechanism preventing hazardous reversal. VALVE : BACKFLOW shares this exact relationship with DAM : FLOODING."
  },
  {
    "pair": "FUSED : INSEPARABLE",
    "rel": "physical adjective to intrinsic material state",
    "correct": "PERMEABLE : POROUS",
    "distractors": [
      "INSEPARABLE : FUSED",
      "PERMEABLE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: physical adjective to intrinsic material state. FUSED : INSEPARABLE shares this exact relationship with PERMEABLE : POROUS."
  },
  {
    "pair": "BALLAST : SUBMARINE",
    "rel": "submersion control mechanism adjusting buoyancy",
    "correct": "WEIGHTS : DIVER",
    "distractors": [
      "SUBMARINE : BALLAST",
      "WEIGHTS : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: submersion control mechanism adjusting buoyancy. BALLAST : SUBMARINE shares this exact relationship with WEIGHTS : DIVER."
  },
  {
    "pair": "CRUCIBLE : MOLTEN",
    "rel": "containment chamber maintaining extreme thermodynamic state",
    "correct": "INCUBATOR : WARM",
    "distractors": [
      "MOLTEN : CRUCIBLE",
      "INCUBATOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: containment chamber maintaining extreme thermodynamic state. CRUCIBLE : MOLTEN shares this exact relationship with INCUBATOR : WARM."
  },
  {
    "pair": "LATITUDE : EQUATOR",
    "rel": "coordinate measurement relative to fundamental baseline datum",
    "correct": "ALTITUDE : SEA LEVEL",
    "distractors": [
      "EQUATOR : LATITUDE",
      "ALTITUDE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: coordinate measurement relative to fundamental baseline datum. LATITUDE : EQUATOR shares this exact relationship with ALTITUDE : SEA LEVEL."
  },
  {
    "pair": "STETHOSCOPE : AUSCULTATION",
    "rel": "diagnostic medical scope to clinical exam procedure",
    "correct": "OPHTHALMOSCOPE : FUNDOSCOPY",
    "distractors": [
      "AUSCULTATION : STETHOSCOPE",
      "OPHTHALMOSCOPE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: diagnostic medical scope to clinical exam procedure. STETHOSCOPE : AUSCULTATION shares this exact relationship with OPHTHALMOSCOPE : FUNDOSCOPY."
  },
  {
    "pair": "CHISEL : STONE",
    "rel": "hand shaving/cutting tool to material worked",
    "correct": "PLANE : WOOD",
    "distractors": [
      "STONE : CHISEL",
      "PLANE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: hand shaving/cutting tool to material worked. CHISEL : STONE shares this exact relationship with PLANE : WOOD."
  },
  {
    "pair": "CORROSION : RUST",
    "rel": "chemical transformation process to resulting byproduct",
    "correct": "FERMENTATION : ALCOHOL",
    "distractors": [
      "RUST : CORROSION",
      "FERMENTATION : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: chemical transformation process to resulting byproduct. CORROSION : RUST shares this exact relationship with FERMENTATION : ALCOHOL."
  },
  {
    "pair": "RUDDER : YAW",
    "rel": "aerodynamic/hydrodynamic control surface to rotational axis",
    "correct": "ELEVATOR : PITCH",
    "distractors": [
      "YAW : RUDDER",
      "ELEVATOR : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: aerodynamic/hydrodynamic control surface to rotational axis. RUDDER : YAW shares this exact relationship with ELEVATOR : PITCH."
  },
  {
    "pair": "FINGERPRINT : IDENTITY",
    "rel": "unique distinguishing physical pattern to entity signified",
    "correct": "BARCODE : PRODUCT",
    "distractors": [
      "IDENTITY : FINGERPRINT",
      "BARCODE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: unique distinguishing physical pattern to entity signified. FINGERPRINT : IDENTITY shares this exact relationship with BARCODE : PRODUCT."
  },
  {
    "pair": "LOBBYIST : LEGISLATION",
    "rel": "professional partisan advocate to legal proceeding",
    "correct": "ATTORNEY : LITIGATION",
    "distractors": [
      "LEGISLATION : LOBBYIST",
      "ATTORNEY : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: professional partisan advocate to legal proceeding. LOBBYIST : LEGISLATION shares this exact relationship with ATTORNEY : LITIGATION."
  },
  {
    "pair": "TUNDRA : PERMAFROST",
    "rel": "biome landscape to defining hydrological ground condition",
    "correct": "MARSH : BOG",
    "distractors": [
      "PERMAFROST : TUNDRA",
      "MARSH : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: biome landscape to defining hydrological ground condition. TUNDRA : PERMAFROST shares this exact relationship with MARSH : BOG."
  },
  {
    "pair": "SOLSTICE : SEASONS",
    "rel": "astronomical alignment governing cyclical earthly phenomena",
    "correct": "TIDE : MOON",
    "distractors": [
      "SEASONS : SOLSTICE",
      "TIDE : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: astronomical alignment governing cyclical earthly phenomena. SOLSTICE : SEASONS shares this exact relationship with TIDE : MOON."
  },
  {
    "pair": "SPECTROGRAPH : PRISM",
    "rel": "analytical laboratory equipment to physical principle utilized",
    "correct": "SEPARATORY FUNNEL : DENSITY",
    "distractors": [
      "PRISM : SPECTROGRAPH",
      "SEPARATORY FUNNEL : SINK",
      "TOOL : WORKER",
      "FAST : MOTION"
    ],
    "expl": "Bridge relationship: analytical laboratory equipment to physical principle utilized. SPECTROGRAPH : PRISM shares this exact relationship with SEPARATORY FUNNEL : DENSITY."
  }
];
export const SYLLOGISM_BANK = [
  {
    "premise": "Premise 1: All commercial airline pilots are required to pass biannual flight simulator evaluations.\nPremise 2: Captain Mercer is an active commercial airline pilot.\nWhich of the following conclusions logically follows?",
    "correct": "Captain Mercer is required to pass biannual flight simulator evaluations.",
    "distractors": [
      "Anyone who passes biannual flight simulator evaluations is a commercial airline pilot.",
      "Captain Mercer is exempt from flight simulator evaluations.",
      "Commercial airline pilots rarely need simulator evaluations.",
      "There is insufficient information to determine Captain Mercer's simulator evaluation requirements."
    ],
    "expl": "By Modus Ponens: All A are B; X is A; therefore X is B. Reversing the relationship is an illicit converse fallacy."
  },
  {
    "premise": "Premise 1: No uncertified experimental aircraft are permitted to operate in controlled metropolitan airspace.\nPremise 2: Prototype Drone X-4 is an uncertified experimental aircraft.\nWhich of the following conclusions logically follows?",
    "correct": "Prototype Drone X-4 is not permitted to operate in controlled metropolitan airspace.",
    "distractors": [
      "Prototype Drone X-4 is permitted to operate in controlled metropolitan airspace with ATC approval.",
      "All aircraft operating in controlled metropolitan airspace are experimental prototypes.",
      "Prototype Drone X-4 can operate anywhere if altitude remains under 400 feet.",
      "No definitive conclusion can be drawn regarding Prototype Drone X-4."
    ],
    "expl": "By Universal Negative (No A is B; X is A; therefore X is not B)."
  },
  {
    "premise": "Premise 1: If an aircraft is cleared for transoceanic routes, it must be equipped with dual satellite communication transceivers.\nPremise 2: Cargo Jet 812 is not equipped with dual satellite communication transceivers.\nWhich of the following conclusions logically follows?",
    "correct": "Cargo Jet 812 is not cleared for transoceanic routes.",
    "distractors": [
      "Cargo Jet 812 is cleared for transoceanic routes.",
      "All aircraft equipped with dual satellite transceivers fly transoceanic routes.",
      "Cargo Jet 812 may fly transoceanic routes during daylight hours.",
      "No conclusion regarding route clearance can be established."
    ],
    "expl": "By Modus Tollens: If P then Q; Not Q; therefore Not P."
  },
  {
    "premise": "Premise 1: All high-speed rail trains in this transit corridor operate exclusively on electrified overhead catenary power.\nPremise 2: Some regional passenger expresses in this transit corridor are high-speed rail trains.\nWhich of the following conclusions logically follows?",
    "correct": "Some regional passenger expresses in this transit corridor operate exclusively on electrified overhead catenary power.",
    "distractors": [
      "All regional passenger expresses in this transit corridor operate on overhead catenary power.",
      "No regional passenger expresses operate on overhead catenary power.",
      "All trains using overhead catenary power are regional passenger expresses.",
      "None of the high-speed rail trains carry regional passengers."
    ],
    "expl": "By Darii: All A are B; Some C are A; therefore Some C are B."
  },
  {
    "premise": "Premise 1: All licensed marine navigators understand celestial positioning tables.\nPremise 2: First Officer Vance is a licensed marine navigator.\nWhich of the following conclusions logically follows?",
    "correct": "First Officer Vance understands celestial positioning tables.",
    "distractors": [
      "Anyone who understands celestial positioning tables is a licensed marine navigator.",
      "First Officer Vance only uses GPS and does not understand celestial tables.",
      "First Officer Vance teaches celestial positioning tables.",
      "It cannot be determined whether First Officer Vance understands celestial tables."
    ],
    "expl": "By Modus Ponens: Vance possesses all properties common to all licensed marine navigators."
  },
  {
    "premise": "Premise 1: No diesel locomotives lacking dynamic regenerative brakes can travel safely down the Alpine Pass gradient.\nPremise 2: Freight Engine 99 lacks dynamic regenerative brakes.\nWhich of the following conclusions logically follows?",
    "correct": "Freight Engine 99 cannot travel safely down the Alpine Pass gradient.",
    "distractors": [
      "Freight Engine 99 can travel safely down the gradient if moving slowly.",
      "All locomotives with dynamic brakes are on the Alpine Pass.",
      "Freight Engine 99 is the only train on the Alpine Pass.",
      "Insufficient data to determine Freight Engine 99's safety status."
    ],
    "expl": "By Universal Negative deduction."
  },
  {
    "premise": "Premise 1: If a vessel is classified as an ocean-going container carrier, it must possess a reinforced double bottom hull.\nPremise 2: The freighter Pacific Pearl does not possess a reinforced double bottom hull.\nWhich of the following conclusions logically follows?",
    "correct": "The freighter Pacific Pearl is not classified as an ocean-going container carrier.",
    "distractors": [
      "The freighter Pacific Pearl is an ocean-going container carrier.",
      "All ships with double bottom hulls are ocean-going container carriers.",
      "The Pacific Pearl can be classified as a container carrier in coastal waters.",
      "No logical conclusion is substantiated by the premises."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All electric vehicles manufactured after 2024 include pedestrian acoustic warning sound generators.\nPremise 2: Some municipal fleet delivery vans are electric vehicles manufactured after 2024.\nWhich of the following conclusions logically follows?",
    "correct": "Some municipal fleet delivery vans include pedestrian acoustic warning sound generators.",
    "distractors": [
      "All municipal fleet delivery vans include pedestrian acoustic warning sound generators.",
      "No municipal delivery vans have pedestrian acoustic warning generators.",
      "Only municipal delivery vans have pedestrian acoustic warning generators.",
      "Delivery vans manufactured before 2024 never produce acoustic warnings."
    ],
    "expl": "By Darii categorical deduction."
  },
  {
    "premise": "Premise 1: All commercial harbor pilots possess master mariner certification.\nPremise 2: Pilot Henderson is a commercial harbor pilot.\nWhich of the following conclusions logically follows?",
    "correct": "Pilot Henderson possesses master mariner certification.",
    "distractors": [
      "Everyone who possesses master mariner certification works as a harbor pilot.",
      "Pilot Henderson does not possess master mariner certification.",
      "Pilot Henderson is the head of all harbor pilots.",
      "There is insufficient evidence regarding Pilot Henderson's certification."
    ],
    "expl": "By direct universal affirmatory syllogism."
  },
  {
    "premise": "Premise 1: No subway train cars operating on Track 3 draw traction power from a third rail.\nPremise 2: Train Set B-12 operates on Track 3.\nWhich of the following conclusions logically follows?",
    "correct": "Train Set B-12 does not draw traction power from a third rail.",
    "distractors": [
      "Train Set B-12 draws traction power from a third rail.",
      "All trains that do not use a third rail operate on Track 3.",
      "Train Set B-12 draws power from overhead lines and third rails simultaneously.",
      "It is impossible to deduce Train Set B-12's power mechanism."
    ],
    "expl": "By Universal Negative syllogism."
  },
  {
    "premise": "Premise 1: If an aircraft is approved for Category III instrument landings, it must feature redundant autonomous autoland systems.\nPremise 2: Flight 402 lacks redundant autonomous autoland systems.\nWhich of the following conclusions logically follows?",
    "correct": "Flight 402 is not approved for Category III instrument landings.",
    "distractors": [
      "Flight 402 is approved for Category III instrument landings.",
      "All aircraft with autoland systems fly Category III approaches.",
      "Flight 402 can land in zero visibility under visual flight rules.",
      "Deduction cannot be made from the premises."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All supersonic military interceptors are equipped with titanium leading-edge wing spars.\nPremise 2: Some prototype aircraft in Squadron Seven are supersonic military interceptors.\nWhich of the following conclusions logically follows?",
    "correct": "Some prototype aircraft in Squadron Seven are equipped with titanium leading-edge wing spars.",
    "distractors": [
      "All prototype aircraft in Squadron Seven have titanium leading-edge wing spars.",
      "No aircraft in Squadron Seven have titanium wing spars.",
      "All aircraft with titanium wing spars belong to Squadron Seven.",
      "Squadron Seven contains no supersonic interceptors."
    ],
    "expl": "By Darii syllogistic logic."
  },
  {
    "premise": "Premise 1: All mammal species capable of true powered flight belong to the biological order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich of the following conclusions logically follows?",
    "correct": "The fruit bat belongs to the biological order Chiroptera.",
    "distractors": [
      "All species in the order Chiroptera are fruit bats.",
      "The fruit bat does not belong to Chiroptera.",
      "Some fruit bats are incapable of true powered flight.",
      "There is insufficient information to classify the fruit bat."
    ],
    "expl": "By Modus Ponens: The fruit bat is a member of the universal category."
  },
  {
    "premise": "Premise 1: No eukaryotic organisms lacking mitochondria can produce ATP through oxidative phosphorylation.\nPremise 2: Microorganism M lacks mitochondria.\nWhich of the following conclusions logically follows?",
    "correct": "Microorganism M cannot produce ATP through oxidative phosphorylation.",
    "distractors": [
      "Microorganism M produces ATP through oxidative phosphorylation.",
      "All organisms with mitochondria are identical to Microorganism M.",
      "Microorganism M produces ATP faster than organisms with mitochondria.",
      "No deduction can be verified regarding Microorganism M."
    ],
    "expl": "By Universal Negative deduction."
  },
  {
    "premise": "Premise 1: If a plant species performs Crassulacean Acid Metabolism (CAM), its stomata open primarily at night.\nPremise 2: Specimen Flora-9 keeps its stomata closed throughout the night.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Flora-9 does not perform Crassulacean Acid Metabolism.",
    "distractors": [
      "Specimen Flora-9 performs Crassulacean Acid Metabolism.",
      "All plants that open stomata at night belong to Specimen Flora-9.",
      "Specimen Flora-9 never opens its stomata during the day.",
      "No valid conclusion can be derived."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All leguminous plants form symbiotic root nodules with nitrogen-fixing bacteria.\nPremise 2: Some cultivated field crops are leguminous plants.\nWhich of the following conclusions logically follows?",
    "correct": "Some cultivated field crops form symbiotic root nodules with nitrogen-fixing bacteria.",
    "distractors": [
      "All cultivated field crops form symbiotic root nodules with nitrogen-fixing bacteria.",
      "No cultivated field crops form root nodules.",
      "All plants that form root nodules are cultivated field crops.",
      "Leguminous plants never host nitrogen-fixing bacteria in field conditions."
    ],
    "expl": "By Darii particular affirmative syllogism."
  },
  {
    "premise": "Premise 1: All enzymes classified as polymerases catalyze the synthesis of nucleic acid polymers.\nPremise 2: Taq polymerase is an enzyme classified as a polymerase.\nWhich of the following conclusions logically follows?",
    "correct": "Taq polymerase catalyzes the synthesis of nucleic acid polymers.",
    "distractors": [
      "All enzymes that synthesize nucleic acids are Taq polymerase.",
      "Taq polymerase breaks down nucleic acid polymers into simple sugars.",
      "Taq polymerase requires no cofactors to operate.",
      "Insufficient evidence exists regarding Taq polymerase."
    ],
    "expl": "By Modus Ponens."
  },
  {
    "premise": "Premise 1: No reptiles lacking specialized thermoreceptor organs can detect pit infrared radiation.\nPremise 2: The common garter snake lacks specialized thermoreceptor pit organs.\nWhich of the following conclusions logically follows?",
    "correct": "The common garter snake cannot detect pit infrared radiation.",
    "distractors": [
      "The common garter snake detects pit infrared radiation accurately.",
      "All reptiles detect infrared radiation through specialized skin.",
      "The common garter snake detects infrared radiation only when warm.",
      "No deduction can be drawn."
    ],
    "expl": "By Celarent universal negative."
  },
  {
    "premise": "Premise 1: If a cellular organism is a strict anaerobe, prolonged exposure to atmospheric oxygen is lethal to it.\nPremise 2: Bacterial Culture B thrives under prolonged exposure to atmospheric oxygen.\nWhich of the following conclusions logically follows?",
    "correct": "Bacterial Culture B is not a strict anaerobe.",
    "distractors": [
      "Bacterial Culture B is a strict anaerobe.",
      "All organisms killed by oxygen belong to Bacterial Culture B.",
      "Bacterial Culture B requires pure nitrogen to survive.",
      "The atmospheric tolerance of Bacterial Culture B is indeterminate."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All avian species in the family Spheniscidae are flightless marine divers.\nPremise 2: Some Antarctic seabirds belong to the family Spheniscidae.\nWhich of the following conclusions logically follows?",
    "correct": "Some Antarctic seabirds are flightless marine divers.",
    "distractors": [
      "All Antarctic seabirds are flightless marine divers.",
      "No Antarctic seabirds are flightless marine divers.",
      "All flightless marine divers are Antarctic seabirds.",
      "Birds in the family Spheniscidae fly long distances over the ocean."
    ],
    "expl": "By Darii."
  },
  {
    "premise": "Premise 1: All cetaceans breathe atmospheric air using lungs rather than gills.\nPremise 2: The humpback whale is a cetacean.\nWhich of the following conclusions logically follows?",
    "correct": "The humpback whale breathes atmospheric air using lungs rather than gills.",
    "distractors": [
      "All animals that breathe using lungs are humpback whales.",
      "The humpback whale extracts oxygen from water through gills.",
      "The humpback whale is a fish.",
      "It cannot be determined how the humpback whale breathes."
    ],
    "expl": "By Modus Ponens."
  },
  {
    "premise": "Premise 1: No deciduous angiosperm trees retain green foliage throughout a subzero winter.\nPremise 2: The sugar maple is a deciduous angiosperm tree.\nWhich of the following conclusions logically follows?",
    "correct": "The sugar maple does not retain green foliage throughout a subzero winter.",
    "distractors": [
      "The sugar maple retains green foliage throughout a subzero winter.",
      "All trees that lose leaves in winter are sugar maples.",
      "The sugar maple is an evergreen conifer.",
      "Insufficient data to evaluate foliage behavior."
    ],
    "expl": "By Celarent."
  },
  {
    "premise": "Premise 1: If a compound functions as a competitive enzyme inhibitor, it binds directly to the active catalytic site.\nPremise 2: Molecule Z does not bind to the active catalytic site.\nWhich of the following conclusions logically follows?",
    "correct": "Molecule Z does not function as a competitive enzyme inhibitor.",
    "distractors": [
      "Molecule Z functions as a competitive enzyme inhibitor.",
      "All molecules binding to the active site are Molecule Z.",
      "Molecule Z accelerates enzymatic activity by ten times.",
      "No logical conclusion is warranted."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All arthropods with chelicerae and four pairs of walking legs are classified as arachnids.\nPremise 2: Some predatory forest invertebrates have chelicerae and four pairs of walking legs.\nWhich of the following conclusions logically follows?",
    "correct": "Some predatory forest invertebrates are classified as arachnids.",
    "distractors": [
      "All predatory forest invertebrates are arachnids.",
      "No predatory forest invertebrates are arachnids.",
      "All arachnids live exclusively in predatory forest environments.",
      "Invertebrates with four pairs of legs are never arachnids."
    ],
    "expl": "By Darii."
  },
  {
    "premise": "Premise 1: All relational databases that provide serializable isolation prevent phantom read anomalies.\nPremise 2: Database Engine Postgres-XL provides serializable isolation.\nWhich of the following conclusions logically follows?",
    "correct": "Database Engine Postgres-XL prevents phantom read anomalies.",
    "distractors": [
      "Any database that prevents phantom reads is Postgres-XL.",
      "Postgres-XL frequently suffers from phantom read anomalies.",
      "Postgres-XL does not support concurrent transactions.",
      "There is insufficient information to evaluate Postgres-XL's anomaly protection."
    ],
    "expl": "By Modus Ponens."
  },
  {
    "premise": "Premise 1: No symmetric encryption cipher with a 56-bit key length is considered secure against brute-force attacks.\nPremise 2: Legacy Algorithm DES uses a 56-bit key length.\nWhich of the following conclusions logically follows?",
    "correct": "Legacy Algorithm DES is not considered secure against brute-force attacks.",
    "distractors": [
      "Legacy Algorithm DES is considered completely secure against brute-force attacks.",
      "All ciphers insecure against brute force use 56-bit keys.",
      "DES is an asymmetric public-key cryptosystem.",
      "No conclusion can be substantiated regarding DES."
    ],
    "expl": "By Celarent."
  },
  {
    "premise": "Premise 1: If an enterprise cloud microservice is stateless, it stores no client session data in local node memory.\nPremise 2: Service Lambda-4 stores active client session data in local node memory.\nWhich of the following conclusions logically follows?",
    "correct": "Service Lambda-4 is not a stateless microservice.",
    "distractors": [
      "Service Lambda-4 is a stateless microservice.",
      "All stateful services are named Lambda-4.",
      "Service Lambda-4 stores session data in an external distributed cache.",
      "No valid deduction is warranted."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All compiled languages with guaranteed memory safety utilize borrow checkers or automatic garbage collection.\nPremise 2: Some systems programming tools are compiled languages with guaranteed memory safety.\nWhich of the following conclusions logically follows?",
    "correct": "Some systems programming tools utilize borrow checkers or automatic garbage collection.",
    "distractors": [
      "All systems programming tools utilize borrow checkers or garbage collection.",
      "No systems programming tools utilize borrow checkers or garbage collection.",
      "Languages with garbage collection are always compiled systems tools.",
      "Memory safety can never be achieved in systems programming."
    ],
    "expl": "By Darii."
  },
  {
    "premise": "Premise 1: All CPU architectures implementing RISC-V utilize load-store instruction architectures.\nPremise 2: Microcontroller Chip Raven-64 implements RISC-V.\nWhich of the following conclusions logically follows?",
    "correct": "Microcontroller Chip Raven-64 utilizes a load-store instruction architecture.",
    "distractors": [
      "All processors with load-store architectures are Raven-64 chips.",
      "Chip Raven-64 executes arithmetic operations directly in memory.",
      "Chip Raven-64 has no register file.",
      "It is impossible to verify Raven-64's instruction architecture."
    ],
    "expl": "By Modus Ponens."
  },
  {
    "premise": "Premise 1: No public key infrastructure certificate without a verified cryptographic root signature is trusted by modern browsers.\nPremise 2: Security Certificate Cert-99 lacks a verified cryptographic root signature.\nWhich of the following conclusions logically follows?",
    "correct": "Security Certificate Cert-99 is not trusted by modern browsers.",
    "distractors": [
      "Security Certificate Cert-99 is trusted by modern browsers automatically.",
      "All untrusted certificates are Cert-99.",
      "Modern browsers trust any certificate on intranet networks.",
      "Certificate trust cannot be evaluated."
    ],
    "expl": "By Celarent."
  },
  {
    "premise": "Premise 1: If a software application is compiled to WebAssembly, it can execute natively inside sandbox client environments.\nPremise 2: Script Module Alpha cannot execute natively inside sandbox client environments.\nWhich of the following conclusions logically follows?",
    "correct": "Script Module Alpha is not compiled to WebAssembly.",
    "distractors": [
      "Script Module Alpha is compiled to WebAssembly.",
      "All programs running in client sandboxes are WebAssembly modules.",
      "Script Module Alpha runs faster than compiled WebAssembly.",
      "The compilation format of Script Module Alpha cannot be determined."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All hash table implementations with open addressing require collision resolution probing strategies.\nPremise 2: Some standard library data structures are hash table implementations with open addressing.\nWhich of the following conclusions logically follows?",
    "correct": "Some standard library data structures require collision resolution probing strategies.",
    "distractors": [
      "All standard library data structures require collision resolution probing.",
      "No standard library data structures require collision resolution probing.",
      "Collision probing is never utilized in standard libraries.",
      "Open addressing completely eliminates hash collisions."
    ],
    "expl": "By Darii."
  },
  {
    "premise": "Premise 1: All cryptographic hash algorithms conforming to SHA-3 are built upon sponge construction permutations.\nPremise 2: Algorithm Keccak-256 conforms to SHA-3.\nWhich of the following conclusions logically follows?",
    "correct": "Algorithm Keccak-256 is built upon sponge construction permutations.",
    "distractors": [
      "All sponge construction algorithms are named Keccak-256.",
      "Algorithm Keccak-256 relies on Merkle-Damgard block structures.",
      "Keccak-256 is vulnerable to length extension attacks.",
      "Insufficient information to determine the construction of Keccak-256."
    ],
    "expl": "By Modus Ponens."
  },
  {
    "premise": "Premise 1: No lossless compression algorithm can guarantee reduced file size for every conceivable input byte sequence.\nPremise 2: Algorithm Deflate is a lossless compression algorithm.\nWhich of the following conclusions logically follows?",
    "correct": "Algorithm Deflate cannot guarantee reduced file size for every conceivable input byte sequence.",
    "distractors": [
      "Algorithm Deflate reduces file size for all conceivable input byte sequences.",
      "All algorithms that fail to compress random data are Deflate.",
      "Deflate is a lossy video encoding codec.",
      "Deduction cannot be made from the premise."
    ],
    "expl": "By Celarent."
  },
  {
    "premise": "Premise 1: If an API architecture complies strictly with REST principles, all state transitions must be hypermedia-driven.\nPremise 2: Backend Interface Service-G does not feature hypermedia-driven state transitions.\nWhich of the following conclusions logically follows?",
    "correct": "Backend Interface Service-G does not comply strictly with REST principles.",
    "distractors": [
      "Backend Interface Service-G complies strictly with REST principles.",
      "All hypermedia APIs are named Service-G.",
      "Service-G is a GraphQL interface.",
      "Compliance cannot be established."
    ],
    "expl": "By Modus Tollens."
  },
  {
    "premise": "Premise 1: All operating system kernels employing microkernel architecture delegate device drivers to user space.\nPremise 2: Some embedded real-time operating systems employ microkernel architecture.\nWhich of the following conclusions logically follows?",
    "correct": "Some embedded real-time operating systems delegate device drivers to user space.",
    "distractors": [
      "All embedded real-time operating systems delegate device drivers to user space.",
      "No embedded operating systems delegate device drivers to user space.",
      "All systems running drivers in user space are real-time microkernels.",
      "Microkernels never run on embedded hardware."
    ],
    "expl": "By Darii."
  },
  {
    "premise": "Premise 1: All valid bilateral agreements are predicated on mutual consideration.\nPremise 2: Contract Agreement-8 is one of the valid bilateral agreements.\nWhich of the following conclusions logically follows?",
    "correct": "Contract Agreement-8 is predicated on mutual consideration.",
    "distractors": [
      "All entities that are predicated on mutual consideration are valid bilateral agreements.",
      "Contract Agreement-8 is not predicated on mutual consideration.",
      "Only some valid bilateral agreements are predicated on mutual consideration.",
      "There is insufficient evidence to determine whether Contract Agreement-8 is predicated on mutual consideration."
    ],
    "expl": "By Modus Ponens: Because Contract Agreement-8 belongs to valid bilateral agreements, and all valid bilateral agreements are predicated on mutual consideration, Contract Agreement-8 must be predicated on mutual consideration."
  },
  {
    "premise": "Premise 1: No valid bilateral agreements are predicated on mutual consideration.\nPremise 2: Contract Agreement-8 is classified as one of the valid bilateral agreements.\nWhich of the following conclusions logically follows?",
    "correct": "Contract Agreement-8 is not predicated on mutual consideration.",
    "distractors": [
      "Contract Agreement-8 is predicated on mutual consideration.",
      "All entities that are not predicated on mutual consideration are classified as valid bilateral agreements.",
      "Some valid bilateral agreements can be predicated on mutual consideration under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the valid bilateral agreements, it must be predicated on mutual consideration.\nPremise 2: Specimen Contract Agreement-8 is verified to NOT be predicated on mutual consideration.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Contract Agreement-8 is not one of the valid bilateral agreements.",
    "distractors": [
      "Specimen Contract Agreement-8 is one of the valid bilateral agreements.",
      "All entities that are predicated on mutual consideration are valid bilateral agreements.",
      "Specimen Contract Agreement-8 possesses some alternative attributes of valid bilateral agreements.",
      "The classification of Specimen Contract Agreement-8 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All valid bilateral agreements are predicated on mutual consideration.\nPremise 2: Some commercial sales contracts are classified as valid bilateral agreements.\nWhich of the following conclusions logically follows?",
    "correct": "Some commercial sales contracts are predicated on mutual consideration.",
    "distractors": [
      "All commercial sales contracts are predicated on mutual consideration.",
      "No commercial sales contracts are predicated on mutual consideration.",
      "All entities that are predicated on mutual consideration are classified as commercial sales contracts.",
      "None of the valid bilateral agreements belong to commercial sales contracts."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All patent applications for software are statutorily barred from claiming abstract mathematical algorithms.\nPremise 2: Patent Claim 410 is one of the patent applications for software.\nWhich of the following conclusions logically follows?",
    "correct": "Patent Claim 410 is statutorily barred from claiming abstract mathematical algorithms.",
    "distractors": [
      "All entities that are statutorily barred from claiming abstract mathematical algorithms are patent applications for software.",
      "Patent Claim 410 is not statutorily barred from claiming abstract mathematical algorithms.",
      "Only some patent applications for software are statutorily barred from claiming abstract mathematical algorithms.",
      "There is insufficient evidence to determine whether Patent Claim 410 is statutorily barred from claiming abstract mathematical algorithms."
    ],
    "expl": "By Modus Ponens: Because Patent Claim 410 belongs to patent applications for software, and all patent applications for software are statutorily barred from claiming abstract mathematical algorithms, Patent Claim 410 must be statutorily barred from claiming abstract mathematical algorithms."
  },
  {
    "premise": "Premise 1: No patent applications for software are statutorily barred from claiming abstract mathematical algorithms.\nPremise 2: Patent Claim 410 is classified as one of the patent applications for software.\nWhich of the following conclusions logically follows?",
    "correct": "Patent Claim 410 is not statutorily barred from claiming abstract mathematical algorithms.",
    "distractors": [
      "Patent Claim 410 is statutorily barred from claiming abstract mathematical algorithms.",
      "All entities that are not statutorily barred from claiming abstract mathematical algorithms are classified as patent applications for software.",
      "Some patent applications for software can be statutorily barred from claiming abstract mathematical algorithms under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the patent applications for software, it must be statutorily barred from claiming abstract mathematical algorithms.\nPremise 2: Specimen Patent Claim 410 is verified to NOT be statutorily barred from claiming abstract mathematical algorithms.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Patent Claim 410 is not one of the patent applications for software.",
    "distractors": [
      "Specimen Patent Claim 410 is one of the patent applications for software.",
      "All entities that are statutorily barred from claiming abstract mathematical algorithms are patent applications for software.",
      "Specimen Patent Claim 410 possesses some alternative attributes of patent applications for software.",
      "The classification of Specimen Patent Claim 410 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All patent applications for software are statutorily barred from claiming abstract mathematical algorithms.\nPremise 2: Some intellectual property filings are classified as patent applications for software.\nWhich of the following conclusions logically follows?",
    "correct": "Some intellectual property filings are statutorily barred from claiming abstract mathematical algorithms.",
    "distractors": [
      "All intellectual property filings are statutorily barred from claiming abstract mathematical algorithms.",
      "No intellectual property filings are statutorily barred from claiming abstract mathematical algorithms.",
      "All entities that are statutorily barred from claiming abstract mathematical algorithms are classified as intellectual property filings.",
      "None of the patent applications for software belong to intellectual property filings."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All appellate court determinations are legally binding on subordinate trial courts within the same jurisdiction.\nPremise 2: Ruling Apex-4 is one of the appellate court determinations.\nWhich of the following conclusions logically follows?",
    "correct": "Ruling Apex-4 is legally binding on subordinate trial courts within the same jurisdiction.",
    "distractors": [
      "All entities that are legally binding on subordinate trial courts within the same jurisdiction are appellate court determinations.",
      "Ruling Apex-4 is not legally binding on subordinate trial courts within the same jurisdiction.",
      "Only some appellate court determinations are legally binding on subordinate trial courts within the same jurisdiction.",
      "There is insufficient evidence to determine whether Ruling Apex-4 is legally binding on subordinate trial courts within the same jurisdiction."
    ],
    "expl": "By Modus Ponens: Because Ruling Apex-4 belongs to appellate court determinations, and all appellate court determinations are legally binding on subordinate trial courts within the same jurisdiction, Ruling Apex-4 must be legally binding on subordinate trial courts within the same jurisdiction."
  },
  {
    "premise": "Premise 1: No appellate court determinations are legally binding on subordinate trial courts within the same jurisdiction.\nPremise 2: Ruling Apex-4 is classified as one of the appellate court determinations.\nWhich of the following conclusions logically follows?",
    "correct": "Ruling Apex-4 is not legally binding on subordinate trial courts within the same jurisdiction.",
    "distractors": [
      "Ruling Apex-4 is legally binding on subordinate trial courts within the same jurisdiction.",
      "All entities that are not legally binding on subordinate trial courts within the same jurisdiction are classified as appellate court determinations.",
      "Some appellate court determinations can be legally binding on subordinate trial courts within the same jurisdiction under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the appellate court determinations, it must be legally binding on subordinate trial courts within the same jurisdiction.\nPremise 2: Specimen Ruling Apex-4 is verified to NOT be legally binding on subordinate trial courts within the same jurisdiction.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Ruling Apex-4 is not one of the appellate court determinations.",
    "distractors": [
      "Specimen Ruling Apex-4 is one of the appellate court determinations.",
      "All entities that are legally binding on subordinate trial courts within the same jurisdiction are appellate court determinations.",
      "Specimen Ruling Apex-4 possesses some alternative attributes of appellate court determinations.",
      "The classification of Specimen Ruling Apex-4 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All appellate court determinations are legally binding on subordinate trial courts within the same jurisdiction.\nPremise 2: Some judicial rulings are classified as appellate court determinations.\nWhich of the following conclusions logically follows?",
    "correct": "Some judicial rulings are legally binding on subordinate trial courts within the same jurisdiction.",
    "distractors": [
      "All judicial rulings are legally binding on subordinate trial courts within the same jurisdiction.",
      "No judicial rulings are legally binding on subordinate trial courts within the same jurisdiction.",
      "All entities that are legally binding on subordinate trial courts within the same jurisdiction are classified as judicial rulings.",
      "None of the appellate court determinations belong to judicial rulings."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All constitutional referendum proposals are contingent upon two-thirds supermajority legislative approval.\nPremise 2: Amendment 45 is one of the constitutional referendum proposals.\nWhich of the following conclusions logically follows?",
    "correct": "Amendment 45 is contingent upon two-thirds supermajority legislative approval.",
    "distractors": [
      "All entities that are contingent upon two-thirds supermajority legislative approval are constitutional referendum proposals.",
      "Amendment 45 is not contingent upon two-thirds supermajority legislative approval.",
      "Only some constitutional referendum proposals are contingent upon two-thirds supermajority legislative approval.",
      "There is insufficient evidence to determine whether Amendment 45 is contingent upon two-thirds supermajority legislative approval."
    ],
    "expl": "By Modus Ponens: Because Amendment 45 belongs to constitutional referendum proposals, and all constitutional referendum proposals are contingent upon two-thirds supermajority legislative approval, Amendment 45 must be contingent upon two-thirds supermajority legislative approval."
  },
  {
    "premise": "Premise 1: No constitutional referendum proposals are contingent upon two-thirds supermajority legislative approval.\nPremise 2: Amendment 45 is classified as one of the constitutional referendum proposals.\nWhich of the following conclusions logically follows?",
    "correct": "Amendment 45 is not contingent upon two-thirds supermajority legislative approval.",
    "distractors": [
      "Amendment 45 is contingent upon two-thirds supermajority legislative approval.",
      "All entities that are not contingent upon two-thirds supermajority legislative approval are classified as constitutional referendum proposals.",
      "Some constitutional referendum proposals can be contingent upon two-thirds supermajority legislative approval under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the constitutional referendum proposals, it must be contingent upon two-thirds supermajority legislative approval.\nPremise 2: Specimen Amendment 45 is verified to NOT be contingent upon two-thirds supermajority legislative approval.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Amendment 45 is not one of the constitutional referendum proposals.",
    "distractors": [
      "Specimen Amendment 45 is one of the constitutional referendum proposals.",
      "All entities that are contingent upon two-thirds supermajority legislative approval are constitutional referendum proposals.",
      "Specimen Amendment 45 possesses some alternative attributes of constitutional referendum proposals.",
      "The classification of Specimen Amendment 45 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All constitutional referendum proposals are contingent upon two-thirds supermajority legislative approval.\nPremise 2: Some statutory proposals are classified as constitutional referendum proposals.\nWhich of the following conclusions logically follows?",
    "correct": "Some statutory proposals are contingent upon two-thirds supermajority legislative approval.",
    "distractors": [
      "All statutory proposals are contingent upon two-thirds supermajority legislative approval.",
      "No statutory proposals are contingent upon two-thirds supermajority legislative approval.",
      "All entities that are contingent upon two-thirds supermajority legislative approval are classified as statutory proposals.",
      "None of the constitutional referendum proposals belong to statutory proposals."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All commercial banks in the Federal Reserve system are subject to mandatory statutory reserve requirements.\nPremise 2: Bank Metrolink is one of the commercial banks in the Federal Reserve system.\nWhich of the following conclusions logically follows?",
    "correct": "Bank Metrolink is subject to mandatory statutory reserve requirements.",
    "distractors": [
      "All entities that are subject to mandatory statutory reserve requirements are commercial banks in the Federal Reserve system.",
      "Bank Metrolink is not subject to mandatory statutory reserve requirements.",
      "Only some commercial banks in the Federal Reserve system are subject to mandatory statutory reserve requirements.",
      "There is insufficient evidence to determine whether Bank Metrolink is subject to mandatory statutory reserve requirements."
    ],
    "expl": "By Modus Ponens: Because Bank Metrolink belongs to commercial banks in the Federal Reserve system, and all commercial banks in the Federal Reserve system are subject to mandatory statutory reserve requirements, Bank Metrolink must be subject to mandatory statutory reserve requirements."
  },
  {
    "premise": "Premise 1: No commercial banks in the Federal Reserve system are subject to mandatory statutory reserve requirements.\nPremise 2: Bank Metrolink is classified as one of the commercial banks in the Federal Reserve system.\nWhich of the following conclusions logically follows?",
    "correct": "Bank Metrolink is not subject to mandatory statutory reserve requirements.",
    "distractors": [
      "Bank Metrolink is subject to mandatory statutory reserve requirements.",
      "All entities that are not subject to mandatory statutory reserve requirements are classified as commercial banks in the Federal Reserve system.",
      "Some commercial banks in the Federal Reserve system can be subject to mandatory statutory reserve requirements under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the commercial banks in the Federal Reserve system, it must be subject to mandatory statutory reserve requirements.\nPremise 2: Specimen Bank Metrolink is verified to NOT be subject to mandatory statutory reserve requirements.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Bank Metrolink is not one of the commercial banks in the Federal Reserve system.",
    "distractors": [
      "Specimen Bank Metrolink is one of the commercial banks in the Federal Reserve system.",
      "All entities that are subject to mandatory statutory reserve requirements are commercial banks in the Federal Reserve system.",
      "Specimen Bank Metrolink possesses some alternative attributes of commercial banks in the Federal Reserve system.",
      "The classification of Specimen Bank Metrolink is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All commercial banks in the Federal Reserve system are subject to mandatory statutory reserve requirements.\nPremise 2: Some regional lending institutions are classified as commercial banks in the Federal Reserve system.\nWhich of the following conclusions logically follows?",
    "correct": "Some regional lending institutions are subject to mandatory statutory reserve requirements.",
    "distractors": [
      "All regional lending institutions are subject to mandatory statutory reserve requirements.",
      "No regional lending institutions are subject to mandatory statutory reserve requirements.",
      "All entities that are subject to mandatory statutory reserve requirements are classified as regional lending institutions.",
      "None of the commercial banks in the Federal Reserve system belong to regional lending institutions."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All fixed-rate municipal obligations are exempt from federal taxation on coupon distributions.\nPremise 2: Bond Issuance 2031 is one of the fixed-rate municipal obligations.\nWhich of the following conclusions logically follows?",
    "correct": "Bond Issuance 2031 is exempt from federal taxation on coupon distributions.",
    "distractors": [
      "All entities that are exempt from federal taxation on coupon distributions are fixed-rate municipal obligations.",
      "Bond Issuance 2031 is not exempt from federal taxation on coupon distributions.",
      "Only some fixed-rate municipal obligations are exempt from federal taxation on coupon distributions.",
      "There is insufficient evidence to determine whether Bond Issuance 2031 is exempt from federal taxation on coupon distributions."
    ],
    "expl": "By Modus Ponens: Because Bond Issuance 2031 belongs to fixed-rate municipal obligations, and all fixed-rate municipal obligations are exempt from federal taxation on coupon distributions, Bond Issuance 2031 must be exempt from federal taxation on coupon distributions."
  },
  {
    "premise": "Premise 1: No fixed-rate municipal obligations are exempt from federal taxation on coupon distributions.\nPremise 2: Bond Issuance 2031 is classified as one of the fixed-rate municipal obligations.\nWhich of the following conclusions logically follows?",
    "correct": "Bond Issuance 2031 is not exempt from federal taxation on coupon distributions.",
    "distractors": [
      "Bond Issuance 2031 is exempt from federal taxation on coupon distributions.",
      "All entities that are not exempt from federal taxation on coupon distributions are classified as fixed-rate municipal obligations.",
      "Some fixed-rate municipal obligations can be exempt from federal taxation on coupon distributions under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the fixed-rate municipal obligations, it must be exempt from federal taxation on coupon distributions.\nPremise 2: Specimen Bond Issuance 2031 is verified to NOT be exempt from federal taxation on coupon distributions.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Bond Issuance 2031 is not one of the fixed-rate municipal obligations.",
    "distractors": [
      "Specimen Bond Issuance 2031 is one of the fixed-rate municipal obligations.",
      "All entities that are exempt from federal taxation on coupon distributions are fixed-rate municipal obligations.",
      "Specimen Bond Issuance 2031 possesses some alternative attributes of fixed-rate municipal obligations.",
      "The classification of Specimen Bond Issuance 2031 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All fixed-rate municipal obligations are exempt from federal taxation on coupon distributions.\nPremise 2: Some debt instruments are classified as fixed-rate municipal obligations.\nWhich of the following conclusions logically follows?",
    "correct": "Some debt instruments are exempt from federal taxation on coupon distributions.",
    "distractors": [
      "All debt instruments are exempt from federal taxation on coupon distributions.",
      "No debt instruments are exempt from federal taxation on coupon distributions.",
      "All entities that are exempt from federal taxation on coupon distributions are classified as debt instruments.",
      "None of the fixed-rate municipal obligations belong to debt instruments."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All equities traded on national stock exchanges are required to file audited quarterly disclosures.\nPremise 2: Asset Stock-X is one of the equities traded on national stock exchanges.\nWhich of the following conclusions logically follows?",
    "correct": "Asset Stock-X is required to file audited quarterly disclosures.",
    "distractors": [
      "All entities that are required to file audited quarterly disclosures are equities traded on national stock exchanges.",
      "Asset Stock-X is not required to file audited quarterly disclosures.",
      "Only some equities traded on national stock exchanges are required to file audited quarterly disclosures.",
      "There is insufficient evidence to determine whether Asset Stock-X is required to file audited quarterly disclosures."
    ],
    "expl": "By Modus Ponens: Because Asset Stock-X belongs to equities traded on national stock exchanges, and all equities traded on national stock exchanges are required to file audited quarterly disclosures, Asset Stock-X must be required to file audited quarterly disclosures."
  },
  {
    "premise": "Premise 1: No equities traded on national stock exchanges are required to file audited quarterly disclosures.\nPremise 2: Asset Stock-X is classified as one of the equities traded on national stock exchanges.\nWhich of the following conclusions logically follows?",
    "correct": "Asset Stock-X is not required to file audited quarterly disclosures.",
    "distractors": [
      "Asset Stock-X is required to file audited quarterly disclosures.",
      "All entities that are not required to file audited quarterly disclosures are classified as equities traded on national stock exchanges.",
      "Some equities traded on national stock exchanges can be required to file audited quarterly disclosures under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the equities traded on national stock exchanges, it must be required to file audited quarterly disclosures.\nPremise 2: Specimen Asset Stock-X is verified to NOT be required to file audited quarterly disclosures.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Asset Stock-X is not one of the equities traded on national stock exchanges.",
    "distractors": [
      "Specimen Asset Stock-X is one of the equities traded on national stock exchanges.",
      "All entities that are required to file audited quarterly disclosures are equities traded on national stock exchanges.",
      "Specimen Asset Stock-X possesses some alternative attributes of equities traded on national stock exchanges.",
      "The classification of Specimen Asset Stock-X is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All equities traded on national stock exchanges are required to file audited quarterly disclosures.\nPremise 2: Some corporate security holdings are classified as equities traded on national stock exchanges.\nWhich of the following conclusions logically follows?",
    "correct": "Some corporate security holdings are required to file audited quarterly disclosures.",
    "distractors": [
      "All corporate security holdings are required to file audited quarterly disclosures.",
      "No corporate security holdings are required to file audited quarterly disclosures.",
      "All entities that are required to file audited quarterly disclosures are classified as corporate security holdings.",
      "None of the equities traded on national stock exchanges belong to corporate security holdings."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All national economies experiencing hyperinflation are seeing currency purchasing power halve within thirty days.\nPremise 2: Market Realm-B is one of the national economies experiencing hyperinflation.\nWhich of the following conclusions logically follows?",
    "correct": "Market Realm-B is seeing currency purchasing power halve within thirty days.",
    "distractors": [
      "All entities that are seeing currency purchasing power halve within thirty days are national economies experiencing hyperinflation.",
      "Market Realm-B is not seeing currency purchasing power halve within thirty days.",
      "Only some national economies experiencing hyperinflation are seeing currency purchasing power halve within thirty days.",
      "There is insufficient evidence to determine whether Market Realm-B is seeing currency purchasing power halve within thirty days."
    ],
    "expl": "By Modus Ponens: Because Market Realm-B belongs to national economies experiencing hyperinflation, and all national economies experiencing hyperinflation are seeing currency purchasing power halve within thirty days, Market Realm-B must be seeing currency purchasing power halve within thirty days."
  },
  {
    "premise": "Premise 1: No national economies experiencing hyperinflation are seeing currency purchasing power halve within thirty days.\nPremise 2: Market Realm-B is classified as one of the national economies experiencing hyperinflation.\nWhich of the following conclusions logically follows?",
    "correct": "Market Realm-B is not seeing currency purchasing power halve within thirty days.",
    "distractors": [
      "Market Realm-B is seeing currency purchasing power halve within thirty days.",
      "All entities that are not seeing currency purchasing power halve within thirty days are classified as national economies experiencing hyperinflation.",
      "Some national economies experiencing hyperinflation can be seeing currency purchasing power halve within thirty days under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the national economies experiencing hyperinflation, it must be seeing currency purchasing power halve within thirty days.\nPremise 2: Specimen Market Realm-B is verified to NOT be seeing currency purchasing power halve within thirty days.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Market Realm-B is not one of the national economies experiencing hyperinflation.",
    "distractors": [
      "Specimen Market Realm-B is one of the national economies experiencing hyperinflation.",
      "All entities that are seeing currency purchasing power halve within thirty days are national economies experiencing hyperinflation.",
      "Specimen Market Realm-B possesses some alternative attributes of national economies experiencing hyperinflation.",
      "The classification of Specimen Market Realm-B is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All national economies experiencing hyperinflation are seeing currency purchasing power halve within thirty days.\nPremise 2: Some developing market economies are classified as national economies experiencing hyperinflation.\nWhich of the following conclusions logically follows?",
    "correct": "Some developing market economies are seeing currency purchasing power halve within thirty days.",
    "distractors": [
      "All developing market economies are seeing currency purchasing power halve within thirty days.",
      "No developing market economies are seeing currency purchasing power halve within thirty days.",
      "All entities that are seeing currency purchasing power halve within thirty days are classified as developing market economies.",
      "None of the national economies experiencing hyperinflation belong to developing market economies."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All registered anesthesiologists are certified in advanced airway management and life support.\nPremise 2: Dr. Sterling is one of the registered anesthesiologists.\nWhich of the following conclusions logically follows?",
    "correct": "Dr. Sterling is certified in advanced airway management and life support.",
    "distractors": [
      "All entities that are certified in advanced airway management and life support are registered anesthesiologists.",
      "Dr. Sterling is not certified in advanced airway management and life support.",
      "Only some registered anesthesiologists are certified in advanced airway management and life support.",
      "There is insufficient evidence to determine whether Dr. Sterling is certified in advanced airway management and life support."
    ],
    "expl": "By Modus Ponens: Because Dr. Sterling belongs to registered anesthesiologists, and all registered anesthesiologists are certified in advanced airway management and life support, Dr. Sterling must be certified in advanced airway management and life support."
  },
  {
    "premise": "Premise 1: No registered anesthesiologists are certified in advanced airway management and life support.\nPremise 2: Dr. Sterling is classified as one of the registered anesthesiologists.\nWhich of the following conclusions logically follows?",
    "correct": "Dr. Sterling is not certified in advanced airway management and life support.",
    "distractors": [
      "Dr. Sterling is certified in advanced airway management and life support.",
      "All entities that are not certified in advanced airway management and life support are classified as registered anesthesiologists.",
      "Some registered anesthesiologists can be certified in advanced airway management and life support under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the registered anesthesiologists, it must be certified in advanced airway management and life support.\nPremise 2: Specimen Dr. Sterling is verified to NOT be certified in advanced airway management and life support.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Dr. Sterling is not one of the registered anesthesiologists.",
    "distractors": [
      "Specimen Dr. Sterling is one of the registered anesthesiologists.",
      "All entities that are certified in advanced airway management and life support are registered anesthesiologists.",
      "Specimen Dr. Sterling possesses some alternative attributes of registered anesthesiologists.",
      "The classification of Specimen Dr. Sterling is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All registered anesthesiologists are certified in advanced airway management and life support.\nPremise 2: Some hospital surgical clinicians are classified as registered anesthesiologists.\nWhich of the following conclusions logically follows?",
    "correct": "Some hospital surgical clinicians are certified in advanced airway management and life support.",
    "distractors": [
      "All hospital surgical clinicians are certified in advanced airway management and life support.",
      "No hospital surgical clinicians are certified in advanced airway management and life support.",
      "All entities that are certified in advanced airway management and life support are classified as hospital surgical clinicians.",
      "None of the registered anesthesiologists belong to hospital surgical clinicians."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All Class III implantable medical devices are mandated to complete randomized clinical trials prior to commercial release.\nPremise 2: Pacemaker Cardio-V is one of the Class III implantable medical devices.\nWhich of the following conclusions logically follows?",
    "correct": "Pacemaker Cardio-V is mandated to complete randomized clinical trials prior to commercial release.",
    "distractors": [
      "All entities that are mandated to complete randomized clinical trials prior to commercial release are Class III implantable medical devices.",
      "Pacemaker Cardio-V is not mandated to complete randomized clinical trials prior to commercial release.",
      "Only some Class III implantable medical devices are mandated to complete randomized clinical trials prior to commercial release.",
      "There is insufficient evidence to determine whether Pacemaker Cardio-V is mandated to complete randomized clinical trials prior to commercial release."
    ],
    "expl": "By Modus Ponens: Because Pacemaker Cardio-V belongs to Class III implantable medical devices, and all Class III implantable medical devices are mandated to complete randomized clinical trials prior to commercial release, Pacemaker Cardio-V must be mandated to complete randomized clinical trials prior to commercial release."
  },
  {
    "premise": "Premise 1: No Class III implantable medical devices are mandated to complete randomized clinical trials prior to commercial release.\nPremise 2: Pacemaker Cardio-V is classified as one of the Class III implantable medical devices.\nWhich of the following conclusions logically follows?",
    "correct": "Pacemaker Cardio-V is not mandated to complete randomized clinical trials prior to commercial release.",
    "distractors": [
      "Pacemaker Cardio-V is mandated to complete randomized clinical trials prior to commercial release.",
      "All entities that are not mandated to complete randomized clinical trials prior to commercial release are classified as Class III implantable medical devices.",
      "Some Class III implantable medical devices can be mandated to complete randomized clinical trials prior to commercial release under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the Class III implantable medical devices, it must be mandated to complete randomized clinical trials prior to commercial release.\nPremise 2: Specimen Pacemaker Cardio-V is verified to NOT be mandated to complete randomized clinical trials prior to commercial release.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Pacemaker Cardio-V is not one of the Class III implantable medical devices.",
    "distractors": [
      "Specimen Pacemaker Cardio-V is one of the Class III implantable medical devices.",
      "All entities that are mandated to complete randomized clinical trials prior to commercial release are Class III implantable medical devices.",
      "Specimen Pacemaker Cardio-V possesses some alternative attributes of Class III implantable medical devices.",
      "The classification of Specimen Pacemaker Cardio-V is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All Class III implantable medical devices are mandated to complete randomized clinical trials prior to commercial release.\nPremise 2: Some biomedical implants are classified as Class III implantable medical devices.\nWhich of the following conclusions logically follows?",
    "correct": "Some biomedical implants are mandated to complete randomized clinical trials prior to commercial release.",
    "distractors": [
      "All biomedical implants are mandated to complete randomized clinical trials prior to commercial release.",
      "No biomedical implants are mandated to complete randomized clinical trials prior to commercial release.",
      "All entities that are mandated to complete randomized clinical trials prior to commercial release are classified as biomedical implants.",
      "None of the Class III implantable medical devices belong to biomedical implants."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All broad-spectrum cephalosporin antibiotics are effective at inhibiting bacterial peptidoglycan cell wall synthesis.\nPremise 2: Antibiotic Ceph-4 is one of the broad-spectrum cephalosporin antibiotics.\nWhich of the following conclusions logically follows?",
    "correct": "Antibiotic Ceph-4 is effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
    "distractors": [
      "All entities that are effective at inhibiting bacterial peptidoglycan cell wall synthesis are broad-spectrum cephalosporin antibiotics.",
      "Antibiotic Ceph-4 is not effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
      "Only some broad-spectrum cephalosporin antibiotics are effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
      "There is insufficient evidence to determine whether Antibiotic Ceph-4 is effective at inhibiting bacterial peptidoglycan cell wall synthesis."
    ],
    "expl": "By Modus Ponens: Because Antibiotic Ceph-4 belongs to broad-spectrum cephalosporin antibiotics, and all broad-spectrum cephalosporin antibiotics are effective at inhibiting bacterial peptidoglycan cell wall synthesis, Antibiotic Ceph-4 must be effective at inhibiting bacterial peptidoglycan cell wall synthesis."
  },
  {
    "premise": "Premise 1: No broad-spectrum cephalosporin antibiotics are effective at inhibiting bacterial peptidoglycan cell wall synthesis.\nPremise 2: Antibiotic Ceph-4 is classified as one of the broad-spectrum cephalosporin antibiotics.\nWhich of the following conclusions logically follows?",
    "correct": "Antibiotic Ceph-4 is not effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
    "distractors": [
      "Antibiotic Ceph-4 is effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
      "All entities that are not effective at inhibiting bacterial peptidoglycan cell wall synthesis are classified as broad-spectrum cephalosporin antibiotics.",
      "Some broad-spectrum cephalosporin antibiotics can be effective at inhibiting bacterial peptidoglycan cell wall synthesis under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the broad-spectrum cephalosporin antibiotics, it must be effective at inhibiting bacterial peptidoglycan cell wall synthesis.\nPremise 2: Specimen Antibiotic Ceph-4 is verified to NOT be effective at inhibiting bacterial peptidoglycan cell wall synthesis.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Antibiotic Ceph-4 is not one of the broad-spectrum cephalosporin antibiotics.",
    "distractors": [
      "Specimen Antibiotic Ceph-4 is one of the broad-spectrum cephalosporin antibiotics.",
      "All entities that are effective at inhibiting bacterial peptidoglycan cell wall synthesis are broad-spectrum cephalosporin antibiotics.",
      "Specimen Antibiotic Ceph-4 possesses some alternative attributes of broad-spectrum cephalosporin antibiotics.",
      "The classification of Specimen Antibiotic Ceph-4 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All broad-spectrum cephalosporin antibiotics are effective at inhibiting bacterial peptidoglycan cell wall synthesis.\nPremise 2: Some pharmaceutical therapeutic agents are classified as broad-spectrum cephalosporin antibiotics.\nWhich of the following conclusions logically follows?",
    "correct": "Some pharmaceutical therapeutic agents are effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
    "distractors": [
      "All pharmaceutical therapeutic agents are effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
      "No pharmaceutical therapeutic agents are effective at inhibiting bacterial peptidoglycan cell wall synthesis.",
      "All entities that are effective at inhibiting bacterial peptidoglycan cell wall synthesis are classified as pharmaceutical therapeutic agents.",
      "None of the broad-spectrum cephalosporin antibiotics belong to pharmaceutical therapeutic agents."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All clinical blood diagnostic tests are calibrated against standardized reference serum baselines.\nPremise 2: Assay Panel-9 is one of the clinical blood diagnostic tests.\nWhich of the following conclusions logically follows?",
    "correct": "Assay Panel-9 is calibrated against standardized reference serum baselines.",
    "distractors": [
      "All entities that are calibrated against standardized reference serum baselines are clinical blood diagnostic tests.",
      "Assay Panel-9 is not calibrated against standardized reference serum baselines.",
      "Only some clinical blood diagnostic tests are calibrated against standardized reference serum baselines.",
      "There is insufficient evidence to determine whether Assay Panel-9 is calibrated against standardized reference serum baselines."
    ],
    "expl": "By Modus Ponens: Because Assay Panel-9 belongs to clinical blood diagnostic tests, and all clinical blood diagnostic tests are calibrated against standardized reference serum baselines, Assay Panel-9 must be calibrated against standardized reference serum baselines."
  },
  {
    "premise": "Premise 1: No clinical blood diagnostic tests are calibrated against standardized reference serum baselines.\nPremise 2: Assay Panel-9 is classified as one of the clinical blood diagnostic tests.\nWhich of the following conclusions logically follows?",
    "correct": "Assay Panel-9 is not calibrated against standardized reference serum baselines.",
    "distractors": [
      "Assay Panel-9 is calibrated against standardized reference serum baselines.",
      "All entities that are not calibrated against standardized reference serum baselines are classified as clinical blood diagnostic tests.",
      "Some clinical blood diagnostic tests can be calibrated against standardized reference serum baselines under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the clinical blood diagnostic tests, it must be calibrated against standardized reference serum baselines.\nPremise 2: Specimen Assay Panel-9 is verified to NOT be calibrated against standardized reference serum baselines.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Assay Panel-9 is not one of the clinical blood diagnostic tests.",
    "distractors": [
      "Specimen Assay Panel-9 is one of the clinical blood diagnostic tests.",
      "All entities that are calibrated against standardized reference serum baselines are clinical blood diagnostic tests.",
      "Specimen Assay Panel-9 possesses some alternative attributes of clinical blood diagnostic tests.",
      "The classification of Specimen Assay Panel-9 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All clinical blood diagnostic tests are calibrated against standardized reference serum baselines.\nPremise 2: Some laboratory diagnostic assays are classified as clinical blood diagnostic tests.\nWhich of the following conclusions logically follows?",
    "correct": "Some laboratory diagnostic assays are calibrated against standardized reference serum baselines.",
    "distractors": [
      "All laboratory diagnostic assays are calibrated against standardized reference serum baselines.",
      "No laboratory diagnostic assays are calibrated against standardized reference serum baselines.",
      "All entities that are calibrated against standardized reference serum baselines are classified as laboratory diagnostic assays.",
      "None of the clinical blood diagnostic tests belong to laboratory diagnostic assays."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All structural trusses in long-span suspension bridges are engineered to withstand tensile and aerodynamic torsional loads.\nPremise 2: Truss Assembly Bridge-8 is one of the structural trusses in long-span suspension bridges.\nWhich of the following conclusions logically follows?",
    "correct": "Truss Assembly Bridge-8 is engineered to withstand tensile and aerodynamic torsional loads.",
    "distractors": [
      "All entities that are engineered to withstand tensile and aerodynamic torsional loads are structural trusses in long-span suspension bridges.",
      "Truss Assembly Bridge-8 is not engineered to withstand tensile and aerodynamic torsional loads.",
      "Only some structural trusses in long-span suspension bridges are engineered to withstand tensile and aerodynamic torsional loads.",
      "There is insufficient evidence to determine whether Truss Assembly Bridge-8 is engineered to withstand tensile and aerodynamic torsional loads."
    ],
    "expl": "By Modus Ponens: Because Truss Assembly Bridge-8 belongs to structural trusses in long-span suspension bridges, and all structural trusses in long-span suspension bridges are engineered to withstand tensile and aerodynamic torsional loads, Truss Assembly Bridge-8 must be engineered to withstand tensile and aerodynamic torsional loads."
  },
  {
    "premise": "Premise 1: No structural trusses in long-span suspension bridges are engineered to withstand tensile and aerodynamic torsional loads.\nPremise 2: Truss Assembly Bridge-8 is classified as one of the structural trusses in long-span suspension bridges.\nWhich of the following conclusions logically follows?",
    "correct": "Truss Assembly Bridge-8 is not engineered to withstand tensile and aerodynamic torsional loads.",
    "distractors": [
      "Truss Assembly Bridge-8 is engineered to withstand tensile and aerodynamic torsional loads.",
      "All entities that are not engineered to withstand tensile and aerodynamic torsional loads are classified as structural trusses in long-span suspension bridges.",
      "Some structural trusses in long-span suspension bridges can be engineered to withstand tensile and aerodynamic torsional loads under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the structural trusses in long-span suspension bridges, it must be engineered to withstand tensile and aerodynamic torsional loads.\nPremise 2: Specimen Truss Assembly Bridge-8 is verified to NOT be engineered to withstand tensile and aerodynamic torsional loads.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Truss Assembly Bridge-8 is not one of the structural trusses in long-span suspension bridges.",
    "distractors": [
      "Specimen Truss Assembly Bridge-8 is one of the structural trusses in long-span suspension bridges.",
      "All entities that are engineered to withstand tensile and aerodynamic torsional loads are structural trusses in long-span suspension bridges.",
      "Specimen Truss Assembly Bridge-8 possesses some alternative attributes of structural trusses in long-span suspension bridges.",
      "The classification of Specimen Truss Assembly Bridge-8 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All structural trusses in long-span suspension bridges are engineered to withstand tensile and aerodynamic torsional loads.\nPremise 2: Some civil engineering structural components are classified as structural trusses in long-span suspension bridges.\nWhich of the following conclusions logically follows?",
    "correct": "Some civil engineering structural components are engineered to withstand tensile and aerodynamic torsional loads.",
    "distractors": [
      "All civil engineering structural components are engineered to withstand tensile and aerodynamic torsional loads.",
      "No civil engineering structural components are engineered to withstand tensile and aerodynamic torsional loads.",
      "All entities that are engineered to withstand tensile and aerodynamic torsional loads are classified as civil engineering structural components.",
      "None of the structural trusses in long-span suspension bridges belong to civil engineering structural components."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All high-voltage gas-insulated electrical substations are insulated using pressurized sulfur hexafluoride dielectric gas.\nPremise 2: Substation Station-K is one of the high-voltage gas-insulated electrical substations.\nWhich of the following conclusions logically follows?",
    "correct": "Substation Station-K is insulated using pressurized sulfur hexafluoride dielectric gas.",
    "distractors": [
      "All entities that are insulated using pressurized sulfur hexafluoride dielectric gas are high-voltage gas-insulated electrical substations.",
      "Substation Station-K is not insulated using pressurized sulfur hexafluoride dielectric gas.",
      "Only some high-voltage gas-insulated electrical substations are insulated using pressurized sulfur hexafluoride dielectric gas.",
      "There is insufficient evidence to determine whether Substation Station-K is insulated using pressurized sulfur hexafluoride dielectric gas."
    ],
    "expl": "By Modus Ponens: Because Substation Station-K belongs to high-voltage gas-insulated electrical substations, and all high-voltage gas-insulated electrical substations are insulated using pressurized sulfur hexafluoride dielectric gas, Substation Station-K must be insulated using pressurized sulfur hexafluoride dielectric gas."
  },
  {
    "premise": "Premise 1: No high-voltage gas-insulated electrical substations are insulated using pressurized sulfur hexafluoride dielectric gas.\nPremise 2: Substation Station-K is classified as one of the high-voltage gas-insulated electrical substations.\nWhich of the following conclusions logically follows?",
    "correct": "Substation Station-K is not insulated using pressurized sulfur hexafluoride dielectric gas.",
    "distractors": [
      "Substation Station-K is insulated using pressurized sulfur hexafluoride dielectric gas.",
      "All entities that are not insulated using pressurized sulfur hexafluoride dielectric gas are classified as high-voltage gas-insulated electrical substations.",
      "Some high-voltage gas-insulated electrical substations can be insulated using pressurized sulfur hexafluoride dielectric gas under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the high-voltage gas-insulated electrical substations, it must be insulated using pressurized sulfur hexafluoride dielectric gas.\nPremise 2: Specimen Substation Station-K is verified to NOT be insulated using pressurized sulfur hexafluoride dielectric gas.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Substation Station-K is not one of the high-voltage gas-insulated electrical substations.",
    "distractors": [
      "Specimen Substation Station-K is one of the high-voltage gas-insulated electrical substations.",
      "All entities that are insulated using pressurized sulfur hexafluoride dielectric gas are high-voltage gas-insulated electrical substations.",
      "Specimen Substation Station-K possesses some alternative attributes of high-voltage gas-insulated electrical substations.",
      "The classification of Specimen Substation Station-K is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All high-voltage gas-insulated electrical substations are insulated using pressurized sulfur hexafluoride dielectric gas.\nPremise 2: Some power grid distribution nodes are classified as high-voltage gas-insulated electrical substations.\nWhich of the following conclusions logically follows?",
    "correct": "Some power grid distribution nodes are insulated using pressurized sulfur hexafluoride dielectric gas.",
    "distractors": [
      "All power grid distribution nodes are insulated using pressurized sulfur hexafluoride dielectric gas.",
      "No power grid distribution nodes are insulated using pressurized sulfur hexafluoride dielectric gas.",
      "All entities that are insulated using pressurized sulfur hexafluoride dielectric gas are classified as power grid distribution nodes.",
      "None of the high-voltage gas-insulated electrical substations belong to power grid distribution nodes."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All combustion gas turbines operating in combined-cycle power plants are driving waste-heat recovery steam generators.\nPremise 2: Turbine Generator-1 is one of the combustion gas turbines operating in combined-cycle power plants.\nWhich of the following conclusions logically follows?",
    "correct": "Turbine Generator-1 is driving waste-heat recovery steam generators.",
    "distractors": [
      "All entities that are driving waste-heat recovery steam generators are combustion gas turbines operating in combined-cycle power plants.",
      "Turbine Generator-1 is not driving waste-heat recovery steam generators.",
      "Only some combustion gas turbines operating in combined-cycle power plants are driving waste-heat recovery steam generators.",
      "There is insufficient evidence to determine whether Turbine Generator-1 is driving waste-heat recovery steam generators."
    ],
    "expl": "By Modus Ponens: Because Turbine Generator-1 belongs to combustion gas turbines operating in combined-cycle power plants, and all combustion gas turbines operating in combined-cycle power plants are driving waste-heat recovery steam generators, Turbine Generator-1 must be driving waste-heat recovery steam generators."
  },
  {
    "premise": "Premise 1: No combustion gas turbines operating in combined-cycle power plants are driving waste-heat recovery steam generators.\nPremise 2: Turbine Generator-1 is classified as one of the combustion gas turbines operating in combined-cycle power plants.\nWhich of the following conclusions logically follows?",
    "correct": "Turbine Generator-1 is not driving waste-heat recovery steam generators.",
    "distractors": [
      "Turbine Generator-1 is driving waste-heat recovery steam generators.",
      "All entities that are not driving waste-heat recovery steam generators are classified as combustion gas turbines operating in combined-cycle power plants.",
      "Some combustion gas turbines operating in combined-cycle power plants can be driving waste-heat recovery steam generators under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the combustion gas turbines operating in combined-cycle power plants, it must be driving waste-heat recovery steam generators.\nPremise 2: Specimen Turbine Generator-1 is verified to NOT be driving waste-heat recovery steam generators.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Turbine Generator-1 is not one of the combustion gas turbines operating in combined-cycle power plants.",
    "distractors": [
      "Specimen Turbine Generator-1 is one of the combustion gas turbines operating in combined-cycle power plants.",
      "All entities that are driving waste-heat recovery steam generators are combustion gas turbines operating in combined-cycle power plants.",
      "Specimen Turbine Generator-1 possesses some alternative attributes of combustion gas turbines operating in combined-cycle power plants.",
      "The classification of Specimen Turbine Generator-1 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All combustion gas turbines operating in combined-cycle power plants are driving waste-heat recovery steam generators.\nPremise 2: Some power plant prime movers are classified as combustion gas turbines operating in combined-cycle power plants.\nWhich of the following conclusions logically follows?",
    "correct": "Some power plant prime movers are driving waste-heat recovery steam generators.",
    "distractors": [
      "All power plant prime movers are driving waste-heat recovery steam generators.",
      "No power plant prime movers are driving waste-heat recovery steam generators.",
      "All entities that are driving waste-heat recovery steam generators are classified as power plant prime movers.",
      "None of the combustion gas turbines operating in combined-cycle power plants belong to power plant prime movers."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All reinforced concrete structural pillars are embedded with internal deformed high-tensile steel rebar.\nPremise 2: Pillar Column-14 is one of the reinforced concrete structural pillars.\nWhich of the following conclusions logically follows?",
    "correct": "Pillar Column-14 is embedded with internal deformed high-tensile steel rebar.",
    "distractors": [
      "All entities that are embedded with internal deformed high-tensile steel rebar are reinforced concrete structural pillars.",
      "Pillar Column-14 is not embedded with internal deformed high-tensile steel rebar.",
      "Only some reinforced concrete structural pillars are embedded with internal deformed high-tensile steel rebar.",
      "There is insufficient evidence to determine whether Pillar Column-14 is embedded with internal deformed high-tensile steel rebar."
    ],
    "expl": "By Modus Ponens: Because Pillar Column-14 belongs to reinforced concrete structural pillars, and all reinforced concrete structural pillars are embedded with internal deformed high-tensile steel rebar, Pillar Column-14 must be embedded with internal deformed high-tensile steel rebar."
  },
  {
    "premise": "Premise 1: No reinforced concrete structural pillars are embedded with internal deformed high-tensile steel rebar.\nPremise 2: Pillar Column-14 is classified as one of the reinforced concrete structural pillars.\nWhich of the following conclusions logically follows?",
    "correct": "Pillar Column-14 is not embedded with internal deformed high-tensile steel rebar.",
    "distractors": [
      "Pillar Column-14 is embedded with internal deformed high-tensile steel rebar.",
      "All entities that are not embedded with internal deformed high-tensile steel rebar are classified as reinforced concrete structural pillars.",
      "Some reinforced concrete structural pillars can be embedded with internal deformed high-tensile steel rebar under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the reinforced concrete structural pillars, it must be embedded with internal deformed high-tensile steel rebar.\nPremise 2: Specimen Pillar Column-14 is verified to NOT be embedded with internal deformed high-tensile steel rebar.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Pillar Column-14 is not one of the reinforced concrete structural pillars.",
    "distractors": [
      "Specimen Pillar Column-14 is one of the reinforced concrete structural pillars.",
      "All entities that are embedded with internal deformed high-tensile steel rebar are reinforced concrete structural pillars.",
      "Specimen Pillar Column-14 possesses some alternative attributes of reinforced concrete structural pillars.",
      "The classification of Specimen Pillar Column-14 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All reinforced concrete structural pillars are embedded with internal deformed high-tensile steel rebar.\nPremise 2: Some load-bearing building foundations are classified as reinforced concrete structural pillars.\nWhich of the following conclusions logically follows?",
    "correct": "Some load-bearing building foundations are embedded with internal deformed high-tensile steel rebar.",
    "distractors": [
      "All load-bearing building foundations are embedded with internal deformed high-tensile steel rebar.",
      "No load-bearing building foundations are embedded with internal deformed high-tensile steel rebar.",
      "All entities that are embedded with internal deformed high-tensile steel rebar are classified as load-bearing building foundations.",
      "None of the reinforced concrete structural pillars belong to load-bearing building foundations."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All martensitic stainless steel alloys are capable of achieving high Rockwell hardness through thermal quenching.\nPremise 2: Steel Alloy 440C is one of the martensitic stainless steel alloys.\nWhich of the following conclusions logically follows?",
    "correct": "Steel Alloy 440C is capable of achieving high Rockwell hardness through thermal quenching.",
    "distractors": [
      "All entities that are capable of achieving high Rockwell hardness through thermal quenching are martensitic stainless steel alloys.",
      "Steel Alloy 440C is not capable of achieving high Rockwell hardness through thermal quenching.",
      "Only some martensitic stainless steel alloys are capable of achieving high Rockwell hardness through thermal quenching.",
      "There is insufficient evidence to determine whether Steel Alloy 440C is capable of achieving high Rockwell hardness through thermal quenching."
    ],
    "expl": "By Modus Ponens: Because Steel Alloy 440C belongs to martensitic stainless steel alloys, and all martensitic stainless steel alloys are capable of achieving high Rockwell hardness through thermal quenching, Steel Alloy 440C must be capable of achieving high Rockwell hardness through thermal quenching."
  },
  {
    "premise": "Premise 1: No martensitic stainless steel alloys are capable of achieving high Rockwell hardness through thermal quenching.\nPremise 2: Steel Alloy 440C is classified as one of the martensitic stainless steel alloys.\nWhich of the following conclusions logically follows?",
    "correct": "Steel Alloy 440C is not capable of achieving high Rockwell hardness through thermal quenching.",
    "distractors": [
      "Steel Alloy 440C is capable of achieving high Rockwell hardness through thermal quenching.",
      "All entities that are not capable of achieving high Rockwell hardness through thermal quenching are classified as martensitic stainless steel alloys.",
      "Some martensitic stainless steel alloys can be capable of achieving high Rockwell hardness through thermal quenching under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the martensitic stainless steel alloys, it must be capable of achieving high Rockwell hardness through thermal quenching.\nPremise 2: Specimen Steel Alloy 440C is verified to NOT be capable of achieving high Rockwell hardness through thermal quenching.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Steel Alloy 440C is not one of the martensitic stainless steel alloys.",
    "distractors": [
      "Specimen Steel Alloy 440C is one of the martensitic stainless steel alloys.",
      "All entities that are capable of achieving high Rockwell hardness through thermal quenching are martensitic stainless steel alloys.",
      "Specimen Steel Alloy 440C possesses some alternative attributes of martensitic stainless steel alloys.",
      "The classification of Specimen Steel Alloy 440C is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All martensitic stainless steel alloys are capable of achieving high Rockwell hardness through thermal quenching.\nPremise 2: Some industrial metallurgical alloys are classified as martensitic stainless steel alloys.\nWhich of the following conclusions logically follows?",
    "correct": "Some industrial metallurgical alloys are capable of achieving high Rockwell hardness through thermal quenching.",
    "distractors": [
      "All industrial metallurgical alloys are capable of achieving high Rockwell hardness through thermal quenching.",
      "No industrial metallurgical alloys are capable of achieving high Rockwell hardness through thermal quenching.",
      "All entities that are capable of achieving high Rockwell hardness through thermal quenching are classified as industrial metallurgical alloys.",
      "None of the martensitic stainless steel alloys belong to industrial metallurgical alloys."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All halide perovskite solar cells are vulnerable to moisture-induced degradation in ambient humidity.\nPremise 2: Photovoltaic Cell P-10 is one of the halide perovskite solar cells.\nWhich of the following conclusions logically follows?",
    "correct": "Photovoltaic Cell P-10 is vulnerable to moisture-induced degradation in ambient humidity.",
    "distractors": [
      "All entities that are vulnerable to moisture-induced degradation in ambient humidity are halide perovskite solar cells.",
      "Photovoltaic Cell P-10 is not vulnerable to moisture-induced degradation in ambient humidity.",
      "Only some halide perovskite solar cells are vulnerable to moisture-induced degradation in ambient humidity.",
      "There is insufficient evidence to determine whether Photovoltaic Cell P-10 is vulnerable to moisture-induced degradation in ambient humidity."
    ],
    "expl": "By Modus Ponens: Because Photovoltaic Cell P-10 belongs to halide perovskite solar cells, and all halide perovskite solar cells are vulnerable to moisture-induced degradation in ambient humidity, Photovoltaic Cell P-10 must be vulnerable to moisture-induced degradation in ambient humidity."
  },
  {
    "premise": "Premise 1: No halide perovskite solar cells are vulnerable to moisture-induced degradation in ambient humidity.\nPremise 2: Photovoltaic Cell P-10 is classified as one of the halide perovskite solar cells.\nWhich of the following conclusions logically follows?",
    "correct": "Photovoltaic Cell P-10 is not vulnerable to moisture-induced degradation in ambient humidity.",
    "distractors": [
      "Photovoltaic Cell P-10 is vulnerable to moisture-induced degradation in ambient humidity.",
      "All entities that are not vulnerable to moisture-induced degradation in ambient humidity are classified as halide perovskite solar cells.",
      "Some halide perovskite solar cells can be vulnerable to moisture-induced degradation in ambient humidity under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the halide perovskite solar cells, it must be vulnerable to moisture-induced degradation in ambient humidity.\nPremise 2: Specimen Photovoltaic Cell P-10 is verified to NOT be vulnerable to moisture-induced degradation in ambient humidity.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Photovoltaic Cell P-10 is not one of the halide perovskite solar cells.",
    "distractors": [
      "Specimen Photovoltaic Cell P-10 is one of the halide perovskite solar cells.",
      "All entities that are vulnerable to moisture-induced degradation in ambient humidity are halide perovskite solar cells.",
      "Specimen Photovoltaic Cell P-10 possesses some alternative attributes of halide perovskite solar cells.",
      "The classification of Specimen Photovoltaic Cell P-10 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All halide perovskite solar cells are vulnerable to moisture-induced degradation in ambient humidity.\nPremise 2: Some experimental solar absorbers are classified as halide perovskite solar cells.\nWhich of the following conclusions logically follows?",
    "correct": "Some experimental solar absorbers are vulnerable to moisture-induced degradation in ambient humidity.",
    "distractors": [
      "All experimental solar absorbers are vulnerable to moisture-induced degradation in ambient humidity.",
      "No experimental solar absorbers are vulnerable to moisture-induced degradation in ambient humidity.",
      "All entities that are vulnerable to moisture-induced degradation in ambient humidity are classified as experimental solar absorbers.",
      "None of the halide perovskite solar cells belong to experimental solar absorbers."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All superconducting materials below critical temperature are completely expelling internal magnetic fields via the Meissner effect.\nPremise 2: Compound YBCO-1 is one of the superconducting materials below critical temperature.\nWhich of the following conclusions logically follows?",
    "correct": "Compound YBCO-1 is completely expelling internal magnetic fields via the Meissner effect.",
    "distractors": [
      "All entities that are completely expelling internal magnetic fields via the Meissner effect are superconducting materials below critical temperature.",
      "Compound YBCO-1 is not completely expelling internal magnetic fields via the Meissner effect.",
      "Only some superconducting materials below critical temperature are completely expelling internal magnetic fields via the Meissner effect.",
      "There is insufficient evidence to determine whether Compound YBCO-1 is completely expelling internal magnetic fields via the Meissner effect."
    ],
    "expl": "By Modus Ponens: Because Compound YBCO-1 belongs to superconducting materials below critical temperature, and all superconducting materials below critical temperature are completely expelling internal magnetic fields via the Meissner effect, Compound YBCO-1 must be completely expelling internal magnetic fields via the Meissner effect."
  },
  {
    "premise": "Premise 1: No superconducting materials below critical temperature are completely expelling internal magnetic fields via the Meissner effect.\nPremise 2: Compound YBCO-1 is classified as one of the superconducting materials below critical temperature.\nWhich of the following conclusions logically follows?",
    "correct": "Compound YBCO-1 is not completely expelling internal magnetic fields via the Meissner effect.",
    "distractors": [
      "Compound YBCO-1 is completely expelling internal magnetic fields via the Meissner effect.",
      "All entities that are not completely expelling internal magnetic fields via the Meissner effect are classified as superconducting materials below critical temperature.",
      "Some superconducting materials below critical temperature can be completely expelling internal magnetic fields via the Meissner effect under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the superconducting materials below critical temperature, it must be completely expelling internal magnetic fields via the Meissner effect.\nPremise 2: Specimen Compound YBCO-1 is verified to NOT be completely expelling internal magnetic fields via the Meissner effect.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Compound YBCO-1 is not one of the superconducting materials below critical temperature.",
    "distractors": [
      "Specimen Compound YBCO-1 is one of the superconducting materials below critical temperature.",
      "All entities that are completely expelling internal magnetic fields via the Meissner effect are superconducting materials below critical temperature.",
      "Specimen Compound YBCO-1 possesses some alternative attributes of superconducting materials below critical temperature.",
      "The classification of Specimen Compound YBCO-1 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All superconducting materials below critical temperature are completely expelling internal magnetic fields via the Meissner effect.\nPremise 2: Some low-temperature physical materials are classified as superconducting materials below critical temperature.\nWhich of the following conclusions logically follows?",
    "correct": "Some low-temperature physical materials are completely expelling internal magnetic fields via the Meissner effect.",
    "distractors": [
      "All low-temperature physical materials are completely expelling internal magnetic fields via the Meissner effect.",
      "No low-temperature physical materials are completely expelling internal magnetic fields via the Meissner effect.",
      "All entities that are completely expelling internal magnetic fields via the Meissner effect are classified as low-temperature physical materials.",
      "None of the superconducting materials below critical temperature belong to low-temperature physical materials."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All carbon fiber reinforced thermoset polymers are possessing high specific tensile strength exceeding structural aluminum.\nPremise 2: Composite Sheet CF-7 is one of the carbon fiber reinforced thermoset polymers.\nWhich of the following conclusions logically follows?",
    "correct": "Composite Sheet CF-7 is possessing high specific tensile strength exceeding structural aluminum.",
    "distractors": [
      "All entities that are possessing high specific tensile strength exceeding structural aluminum are carbon fiber reinforced thermoset polymers.",
      "Composite Sheet CF-7 is not possessing high specific tensile strength exceeding structural aluminum.",
      "Only some carbon fiber reinforced thermoset polymers are possessing high specific tensile strength exceeding structural aluminum.",
      "There is insufficient evidence to determine whether Composite Sheet CF-7 is possessing high specific tensile strength exceeding structural aluminum."
    ],
    "expl": "By Modus Ponens: Because Composite Sheet CF-7 belongs to carbon fiber reinforced thermoset polymers, and all carbon fiber reinforced thermoset polymers are possessing high specific tensile strength exceeding structural aluminum, Composite Sheet CF-7 must be possessing high specific tensile strength exceeding structural aluminum."
  },
  {
    "premise": "Premise 1: No carbon fiber reinforced thermoset polymers are possessing high specific tensile strength exceeding structural aluminum.\nPremise 2: Composite Sheet CF-7 is classified as one of the carbon fiber reinforced thermoset polymers.\nWhich of the following conclusions logically follows?",
    "correct": "Composite Sheet CF-7 is not possessing high specific tensile strength exceeding structural aluminum.",
    "distractors": [
      "Composite Sheet CF-7 is possessing high specific tensile strength exceeding structural aluminum.",
      "All entities that are not possessing high specific tensile strength exceeding structural aluminum are classified as carbon fiber reinforced thermoset polymers.",
      "Some carbon fiber reinforced thermoset polymers can be possessing high specific tensile strength exceeding structural aluminum under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the carbon fiber reinforced thermoset polymers, it must be possessing high specific tensile strength exceeding structural aluminum.\nPremise 2: Specimen Composite Sheet CF-7 is verified to NOT be possessing high specific tensile strength exceeding structural aluminum.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Composite Sheet CF-7 is not one of the carbon fiber reinforced thermoset polymers.",
    "distractors": [
      "Specimen Composite Sheet CF-7 is one of the carbon fiber reinforced thermoset polymers.",
      "All entities that are possessing high specific tensile strength exceeding structural aluminum are carbon fiber reinforced thermoset polymers.",
      "Specimen Composite Sheet CF-7 possesses some alternative attributes of carbon fiber reinforced thermoset polymers.",
      "The classification of Specimen Composite Sheet CF-7 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All carbon fiber reinforced thermoset polymers are possessing high specific tensile strength exceeding structural aluminum.\nPremise 2: Some aerospace structural materials are classified as carbon fiber reinforced thermoset polymers.\nWhich of the following conclusions logically follows?",
    "correct": "Some aerospace structural materials are possessing high specific tensile strength exceeding structural aluminum.",
    "distractors": [
      "All aerospace structural materials are possessing high specific tensile strength exceeding structural aluminum.",
      "No aerospace structural materials are possessing high specific tensile strength exceeding structural aluminum.",
      "All entities that are possessing high specific tensile strength exceeding structural aluminum are classified as aerospace structural materials.",
      "None of the carbon fiber reinforced thermoset polymers belong to aerospace structural materials."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All geological strata classified as sedimentary formations are created by compaction and cementation of mineral particles over time.\nPremise 2: Formation Sandstone-4 is one of the geological strata classified as sedimentary formations.\nWhich of the following conclusions logically follows?",
    "correct": "Formation Sandstone-4 is created by compaction and cementation of mineral particles over time.",
    "distractors": [
      "All entities that are created by compaction and cementation of mineral particles over time are geological strata classified as sedimentary formations.",
      "Formation Sandstone-4 is not created by compaction and cementation of mineral particles over time.",
      "Only some geological strata classified as sedimentary formations are created by compaction and cementation of mineral particles over time.",
      "There is insufficient evidence to determine whether Formation Sandstone-4 is created by compaction and cementation of mineral particles over time."
    ],
    "expl": "By Modus Ponens: Because Formation Sandstone-4 belongs to geological strata classified as sedimentary formations, and all geological strata classified as sedimentary formations are created by compaction and cementation of mineral particles over time, Formation Sandstone-4 must be created by compaction and cementation of mineral particles over time."
  },
  {
    "premise": "Premise 1: No geological strata classified as sedimentary formations are created by compaction and cementation of mineral particles over time.\nPremise 2: Formation Sandstone-4 is classified as one of the geological strata classified as sedimentary formations.\nWhich of the following conclusions logically follows?",
    "correct": "Formation Sandstone-4 is not created by compaction and cementation of mineral particles over time.",
    "distractors": [
      "Formation Sandstone-4 is created by compaction and cementation of mineral particles over time.",
      "All entities that are not created by compaction and cementation of mineral particles over time are classified as geological strata classified as sedimentary formations.",
      "Some geological strata classified as sedimentary formations can be created by compaction and cementation of mineral particles over time under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the geological strata classified as sedimentary formations, it must be created by compaction and cementation of mineral particles over time.\nPremise 2: Specimen Formation Sandstone-4 is verified to NOT be created by compaction and cementation of mineral particles over time.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Formation Sandstone-4 is not one of the geological strata classified as sedimentary formations.",
    "distractors": [
      "Specimen Formation Sandstone-4 is one of the geological strata classified as sedimentary formations.",
      "All entities that are created by compaction and cementation of mineral particles over time are geological strata classified as sedimentary formations.",
      "Specimen Formation Sandstone-4 possesses some alternative attributes of geological strata classified as sedimentary formations.",
      "The classification of Specimen Formation Sandstone-4 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All geological strata classified as sedimentary formations are created by compaction and cementation of mineral particles over time.\nPremise 2: Some continental geological rock units are classified as geological strata classified as sedimentary formations.\nWhich of the following conclusions logically follows?",
    "correct": "Some continental geological rock units are created by compaction and cementation of mineral particles over time.",
    "distractors": [
      "All continental geological rock units are created by compaction and cementation of mineral particles over time.",
      "No continental geological rock units are created by compaction and cementation of mineral particles over time.",
      "All entities that are created by compaction and cementation of mineral particles over time are classified as continental geological rock units.",
      "None of the geological strata classified as sedimentary formations belong to continental geological rock units."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All deep-sea oceanic abyssal plains are shrouded in permanent aphotic darkness beneath 4,000 meters.\nPremise 2: Ocean Zone Abyssal-9 is one of the deep-sea oceanic abyssal plains.\nWhich of the following conclusions logically follows?",
    "correct": "Ocean Zone Abyssal-9 is shrouded in permanent aphotic darkness beneath 4,000 meters.",
    "distractors": [
      "All entities that are shrouded in permanent aphotic darkness beneath 4,000 meters are deep-sea oceanic abyssal plains.",
      "Ocean Zone Abyssal-9 is not shrouded in permanent aphotic darkness beneath 4,000 meters.",
      "Only some deep-sea oceanic abyssal plains are shrouded in permanent aphotic darkness beneath 4,000 meters.",
      "There is insufficient evidence to determine whether Ocean Zone Abyssal-9 is shrouded in permanent aphotic darkness beneath 4,000 meters."
    ],
    "expl": "By Modus Ponens: Because Ocean Zone Abyssal-9 belongs to deep-sea oceanic abyssal plains, and all deep-sea oceanic abyssal plains are shrouded in permanent aphotic darkness beneath 4,000 meters, Ocean Zone Abyssal-9 must be shrouded in permanent aphotic darkness beneath 4,000 meters."
  },
  {
    "premise": "Premise 1: No deep-sea oceanic abyssal plains are shrouded in permanent aphotic darkness beneath 4,000 meters.\nPremise 2: Ocean Zone Abyssal-9 is classified as one of the deep-sea oceanic abyssal plains.\nWhich of the following conclusions logically follows?",
    "correct": "Ocean Zone Abyssal-9 is not shrouded in permanent aphotic darkness beneath 4,000 meters.",
    "distractors": [
      "Ocean Zone Abyssal-9 is shrouded in permanent aphotic darkness beneath 4,000 meters.",
      "All entities that are not shrouded in permanent aphotic darkness beneath 4,000 meters are classified as deep-sea oceanic abyssal plains.",
      "Some deep-sea oceanic abyssal plains can be shrouded in permanent aphotic darkness beneath 4,000 meters under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the deep-sea oceanic abyssal plains, it must be shrouded in permanent aphotic darkness beneath 4,000 meters.\nPremise 2: Specimen Ocean Zone Abyssal-9 is verified to NOT be shrouded in permanent aphotic darkness beneath 4,000 meters.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Ocean Zone Abyssal-9 is not one of the deep-sea oceanic abyssal plains.",
    "distractors": [
      "Specimen Ocean Zone Abyssal-9 is one of the deep-sea oceanic abyssal plains.",
      "All entities that are shrouded in permanent aphotic darkness beneath 4,000 meters are deep-sea oceanic abyssal plains.",
      "Specimen Ocean Zone Abyssal-9 possesses some alternative attributes of deep-sea oceanic abyssal plains.",
      "The classification of Specimen Ocean Zone Abyssal-9 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All deep-sea oceanic abyssal plains are shrouded in permanent aphotic darkness beneath 4,000 meters.\nPremise 2: Some marine pelagic environments are classified as deep-sea oceanic abyssal plains.\nWhich of the following conclusions logically follows?",
    "correct": "Some marine pelagic environments are shrouded in permanent aphotic darkness beneath 4,000 meters.",
    "distractors": [
      "All marine pelagic environments are shrouded in permanent aphotic darkness beneath 4,000 meters.",
      "No marine pelagic environments are shrouded in permanent aphotic darkness beneath 4,000 meters.",
      "All entities that are shrouded in permanent aphotic darkness beneath 4,000 meters are classified as marine pelagic environments.",
      "None of the deep-sea oceanic abyssal plains belong to marine pelagic environments."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All glaciers characterized by temperate thermal regimes are having basal ice at the pressure melting point throughout the year.\nPremise 2: Glacier Alpha-8 is one of the glaciers characterized by temperate thermal regimes.\nWhich of the following conclusions logically follows?",
    "correct": "Glacier Alpha-8 is having basal ice at the pressure melting point throughout the year.",
    "distractors": [
      "All entities that are having basal ice at the pressure melting point throughout the year are glaciers characterized by temperate thermal regimes.",
      "Glacier Alpha-8 is not having basal ice at the pressure melting point throughout the year.",
      "Only some glaciers characterized by temperate thermal regimes are having basal ice at the pressure melting point throughout the year.",
      "There is insufficient evidence to determine whether Glacier Alpha-8 is having basal ice at the pressure melting point throughout the year."
    ],
    "expl": "By Modus Ponens: Because Glacier Alpha-8 belongs to glaciers characterized by temperate thermal regimes, and all glaciers characterized by temperate thermal regimes are having basal ice at the pressure melting point throughout the year, Glacier Alpha-8 must be having basal ice at the pressure melting point throughout the year."
  },
  {
    "premise": "Premise 1: No glaciers characterized by temperate thermal regimes are having basal ice at the pressure melting point throughout the year.\nPremise 2: Glacier Alpha-8 is classified as one of the glaciers characterized by temperate thermal regimes.\nWhich of the following conclusions logically follows?",
    "correct": "Glacier Alpha-8 is not having basal ice at the pressure melting point throughout the year.",
    "distractors": [
      "Glacier Alpha-8 is having basal ice at the pressure melting point throughout the year.",
      "All entities that are not having basal ice at the pressure melting point throughout the year are classified as glaciers characterized by temperate thermal regimes.",
      "Some glaciers characterized by temperate thermal regimes can be having basal ice at the pressure melting point throughout the year under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the glaciers characterized by temperate thermal regimes, it must be having basal ice at the pressure melting point throughout the year.\nPremise 2: Specimen Glacier Alpha-8 is verified to NOT be having basal ice at the pressure melting point throughout the year.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Glacier Alpha-8 is not one of the glaciers characterized by temperate thermal regimes.",
    "distractors": [
      "Specimen Glacier Alpha-8 is one of the glaciers characterized by temperate thermal regimes.",
      "All entities that are having basal ice at the pressure melting point throughout the year are glaciers characterized by temperate thermal regimes.",
      "Specimen Glacier Alpha-8 possesses some alternative attributes of glaciers characterized by temperate thermal regimes.",
      "The classification of Specimen Glacier Alpha-8 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All glaciers characterized by temperate thermal regimes are having basal ice at the pressure melting point throughout the year.\nPremise 2: Some alpine ice masses are classified as glaciers characterized by temperate thermal regimes.\nWhich of the following conclusions logically follows?",
    "correct": "Some alpine ice masses are having basal ice at the pressure melting point throughout the year.",
    "distractors": [
      "All alpine ice masses are having basal ice at the pressure melting point throughout the year.",
      "No alpine ice masses are having basal ice at the pressure melting point throughout the year.",
      "All entities that are having basal ice at the pressure melting point throughout the year are classified as alpine ice masses.",
      "None of the glaciers characterized by temperate thermal regimes belong to alpine ice masses."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All atmospheric vortex storms classified as tropical hurricanes are driven by latent heat energy released from warm ocean waters.\nPremise 2: Storm Hurricane-Leo is one of the atmospheric vortex storms classified as tropical hurricanes.\nWhich of the following conclusions logically follows?",
    "correct": "Storm Hurricane-Leo is driven by latent heat energy released from warm ocean waters.",
    "distractors": [
      "All entities that are driven by latent heat energy released from warm ocean waters are atmospheric vortex storms classified as tropical hurricanes.",
      "Storm Hurricane-Leo is not driven by latent heat energy released from warm ocean waters.",
      "Only some atmospheric vortex storms classified as tropical hurricanes are driven by latent heat energy released from warm ocean waters.",
      "There is insufficient evidence to determine whether Storm Hurricane-Leo is driven by latent heat energy released from warm ocean waters."
    ],
    "expl": "By Modus Ponens: Because Storm Hurricane-Leo belongs to atmospheric vortex storms classified as tropical hurricanes, and all atmospheric vortex storms classified as tropical hurricanes are driven by latent heat energy released from warm ocean waters, Storm Hurricane-Leo must be driven by latent heat energy released from warm ocean waters."
  },
  {
    "premise": "Premise 1: No atmospheric vortex storms classified as tropical hurricanes are driven by latent heat energy released from warm ocean waters.\nPremise 2: Storm Hurricane-Leo is classified as one of the atmospheric vortex storms classified as tropical hurricanes.\nWhich of the following conclusions logically follows?",
    "correct": "Storm Hurricane-Leo is not driven by latent heat energy released from warm ocean waters.",
    "distractors": [
      "Storm Hurricane-Leo is driven by latent heat energy released from warm ocean waters.",
      "All entities that are not driven by latent heat energy released from warm ocean waters are classified as atmospheric vortex storms classified as tropical hurricanes.",
      "Some atmospheric vortex storms classified as tropical hurricanes can be driven by latent heat energy released from warm ocean waters under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the atmospheric vortex storms classified as tropical hurricanes, it must be driven by latent heat energy released from warm ocean waters.\nPremise 2: Specimen Storm Hurricane-Leo is verified to NOT be driven by latent heat energy released from warm ocean waters.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Storm Hurricane-Leo is not one of the atmospheric vortex storms classified as tropical hurricanes.",
    "distractors": [
      "Specimen Storm Hurricane-Leo is one of the atmospheric vortex storms classified as tropical hurricanes.",
      "All entities that are driven by latent heat energy released from warm ocean waters are atmospheric vortex storms classified as tropical hurricanes.",
      "Specimen Storm Hurricane-Leo possesses some alternative attributes of atmospheric vortex storms classified as tropical hurricanes.",
      "The classification of Specimen Storm Hurricane-Leo is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All atmospheric vortex storms classified as tropical hurricanes are driven by latent heat energy released from warm ocean waters.\nPremise 2: Some cyclonic meteorological systems are classified as atmospheric vortex storms classified as tropical hurricanes.\nWhich of the following conclusions logically follows?",
    "correct": "Some cyclonic meteorological systems are driven by latent heat energy released from warm ocean waters.",
    "distractors": [
      "All cyclonic meteorological systems are driven by latent heat energy released from warm ocean waters.",
      "No cyclonic meteorological systems are driven by latent heat energy released from warm ocean waters.",
      "All entities that are driven by latent heat energy released from warm ocean waters are classified as cyclonic meteorological systems.",
      "None of the atmospheric vortex storms classified as tropical hurricanes belong to cyclonic meteorological systems."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All geostationary communication satellites are occupying circular equatorial orbits at approximately 35,786 kilometers altitude.\nPremise 2: Satellite Geo-Com-4 is one of the geostationary communication satellites.\nWhich of the following conclusions logically follows?",
    "correct": "Satellite Geo-Com-4 is occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
    "distractors": [
      "All entities that are occupying circular equatorial orbits at approximately 35,786 kilometers altitude are geostationary communication satellites.",
      "Satellite Geo-Com-4 is not occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
      "Only some geostationary communication satellites are occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
      "There is insufficient evidence to determine whether Satellite Geo-Com-4 is occupying circular equatorial orbits at approximately 35,786 kilometers altitude."
    ],
    "expl": "By Modus Ponens: Because Satellite Geo-Com-4 belongs to geostationary communication satellites, and all geostationary communication satellites are occupying circular equatorial orbits at approximately 35,786 kilometers altitude, Satellite Geo-Com-4 must be occupying circular equatorial orbits at approximately 35,786 kilometers altitude."
  },
  {
    "premise": "Premise 1: No geostationary communication satellites are occupying circular equatorial orbits at approximately 35,786 kilometers altitude.\nPremise 2: Satellite Geo-Com-4 is classified as one of the geostationary communication satellites.\nWhich of the following conclusions logically follows?",
    "correct": "Satellite Geo-Com-4 is not occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
    "distractors": [
      "Satellite Geo-Com-4 is occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
      "All entities that are not occupying circular equatorial orbits at approximately 35,786 kilometers altitude are classified as geostationary communication satellites.",
      "Some geostationary communication satellites can be occupying circular equatorial orbits at approximately 35,786 kilometers altitude under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the geostationary communication satellites, it must be occupying circular equatorial orbits at approximately 35,786 kilometers altitude.\nPremise 2: Specimen Satellite Geo-Com-4 is verified to NOT be occupying circular equatorial orbits at approximately 35,786 kilometers altitude.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Satellite Geo-Com-4 is not one of the geostationary communication satellites.",
    "distractors": [
      "Specimen Satellite Geo-Com-4 is one of the geostationary communication satellites.",
      "All entities that are occupying circular equatorial orbits at approximately 35,786 kilometers altitude are geostationary communication satellites.",
      "Specimen Satellite Geo-Com-4 possesses some alternative attributes of geostationary communication satellites.",
      "The classification of Specimen Satellite Geo-Com-4 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All geostationary communication satellites are occupying circular equatorial orbits at approximately 35,786 kilometers altitude.\nPremise 2: Some orbital telecom spacecraft are classified as geostationary communication satellites.\nWhich of the following conclusions logically follows?",
    "correct": "Some orbital telecom spacecraft are occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
    "distractors": [
      "All orbital telecom spacecraft are occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
      "No orbital telecom spacecraft are occupying circular equatorial orbits at approximately 35,786 kilometers altitude.",
      "All entities that are occupying circular equatorial orbits at approximately 35,786 kilometers altitude are classified as orbital telecom spacecraft.",
      "None of the geostationary communication satellites belong to orbital telecom spacecraft."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All astronomical reflecting telescopes using Cassegrain designs are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.\nPremise 2: Observatory Scope C-2 is one of the astronomical reflecting telescopes using Cassegrain designs.\nWhich of the following conclusions logically follows?",
    "correct": "Observatory Scope C-2 is utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
    "distractors": [
      "All entities that are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors are astronomical reflecting telescopes using Cassegrain designs.",
      "Observatory Scope C-2 is not utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
      "Only some astronomical reflecting telescopes using Cassegrain designs are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
      "There is insufficient evidence to determine whether Observatory Scope C-2 is utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors."
    ],
    "expl": "By Modus Ponens: Because Observatory Scope C-2 belongs to astronomical reflecting telescopes using Cassegrain designs, and all astronomical reflecting telescopes using Cassegrain designs are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors, Observatory Scope C-2 must be utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors."
  },
  {
    "premise": "Premise 1: No astronomical reflecting telescopes using Cassegrain designs are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.\nPremise 2: Observatory Scope C-2 is classified as one of the astronomical reflecting telescopes using Cassegrain designs.\nWhich of the following conclusions logically follows?",
    "correct": "Observatory Scope C-2 is not utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
    "distractors": [
      "Observatory Scope C-2 is utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
      "All entities that are not utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors are classified as astronomical reflecting telescopes using Cassegrain designs.",
      "Some astronomical reflecting telescopes using Cassegrain designs can be utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the astronomical reflecting telescopes using Cassegrain designs, it must be utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.\nPremise 2: Specimen Observatory Scope C-2 is verified to NOT be utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Observatory Scope C-2 is not one of the astronomical reflecting telescopes using Cassegrain designs.",
    "distractors": [
      "Specimen Observatory Scope C-2 is one of the astronomical reflecting telescopes using Cassegrain designs.",
      "All entities that are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors are astronomical reflecting telescopes using Cassegrain designs.",
      "Specimen Observatory Scope C-2 possesses some alternative attributes of astronomical reflecting telescopes using Cassegrain designs.",
      "The classification of Specimen Observatory Scope C-2 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All astronomical reflecting telescopes using Cassegrain designs are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.\nPremise 2: Some astronomical research instruments are classified as astronomical reflecting telescopes using Cassegrain designs.\nWhich of the following conclusions logically follows?",
    "correct": "Some astronomical research instruments are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
    "distractors": [
      "All astronomical research instruments are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
      "No astronomical research instruments are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors.",
      "All entities that are utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors are classified as astronomical research instruments.",
      "None of the astronomical reflecting telescopes using Cassegrain designs belong to astronomical research instruments."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All stellar remnants classified as white dwarfs are supported against gravitational collapse solely by electron degeneracy pressure.\nPremise 2: Stellar Object Sirius-B is one of the stellar remnants classified as white dwarfs.\nWhich of the following conclusions logically follows?",
    "correct": "Stellar Object Sirius-B is supported against gravitational collapse solely by electron degeneracy pressure.",
    "distractors": [
      "All entities that are supported against gravitational collapse solely by electron degeneracy pressure are stellar remnants classified as white dwarfs.",
      "Stellar Object Sirius-B is not supported against gravitational collapse solely by electron degeneracy pressure.",
      "Only some stellar remnants classified as white dwarfs are supported against gravitational collapse solely by electron degeneracy pressure.",
      "There is insufficient evidence to determine whether Stellar Object Sirius-B is supported against gravitational collapse solely by electron degeneracy pressure."
    ],
    "expl": "By Modus Ponens: Because Stellar Object Sirius-B belongs to stellar remnants classified as white dwarfs, and all stellar remnants classified as white dwarfs are supported against gravitational collapse solely by electron degeneracy pressure, Stellar Object Sirius-B must be supported against gravitational collapse solely by electron degeneracy pressure."
  },
  {
    "premise": "Premise 1: No stellar remnants classified as white dwarfs are supported against gravitational collapse solely by electron degeneracy pressure.\nPremise 2: Stellar Object Sirius-B is classified as one of the stellar remnants classified as white dwarfs.\nWhich of the following conclusions logically follows?",
    "correct": "Stellar Object Sirius-B is not supported against gravitational collapse solely by electron degeneracy pressure.",
    "distractors": [
      "Stellar Object Sirius-B is supported against gravitational collapse solely by electron degeneracy pressure.",
      "All entities that are not supported against gravitational collapse solely by electron degeneracy pressure are classified as stellar remnants classified as white dwarfs.",
      "Some stellar remnants classified as white dwarfs can be supported against gravitational collapse solely by electron degeneracy pressure under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the stellar remnants classified as white dwarfs, it must be supported against gravitational collapse solely by electron degeneracy pressure.\nPremise 2: Specimen Stellar Object Sirius-B is verified to NOT be supported against gravitational collapse solely by electron degeneracy pressure.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Stellar Object Sirius-B is not one of the stellar remnants classified as white dwarfs.",
    "distractors": [
      "Specimen Stellar Object Sirius-B is one of the stellar remnants classified as white dwarfs.",
      "All entities that are supported against gravitational collapse solely by electron degeneracy pressure are stellar remnants classified as white dwarfs.",
      "Specimen Stellar Object Sirius-B possesses some alternative attributes of stellar remnants classified as white dwarfs.",
      "The classification of Specimen Stellar Object Sirius-B is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All stellar remnants classified as white dwarfs are supported against gravitational collapse solely by electron degeneracy pressure.\nPremise 2: Some astrophysical compact stars are classified as stellar remnants classified as white dwarfs.\nWhich of the following conclusions logically follows?",
    "correct": "Some astrophysical compact stars are supported against gravitational collapse solely by electron degeneracy pressure.",
    "distractors": [
      "All astrophysical compact stars are supported against gravitational collapse solely by electron degeneracy pressure.",
      "No astrophysical compact stars are supported against gravitational collapse solely by electron degeneracy pressure.",
      "All entities that are supported against gravitational collapse solely by electron degeneracy pressure are classified as astrophysical compact stars.",
      "None of the stellar remnants classified as white dwarfs belong to astrophysical compact stars."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  },
  {
    "premise": "Premise 1: All spacecraft thermal protection heat shields are composed of phenolic-impregnated carbon ablative composites.\nPremise 2: Heat Shield Probe-7 is one of the spacecraft thermal protection heat shields.\nWhich of the following conclusions logically follows?",
    "correct": "Heat Shield Probe-7 is composed of phenolic-impregnated carbon ablative composites.",
    "distractors": [
      "All entities that are composed of phenolic-impregnated carbon ablative composites are spacecraft thermal protection heat shields.",
      "Heat Shield Probe-7 is not composed of phenolic-impregnated carbon ablative composites.",
      "Only some spacecraft thermal protection heat shields are composed of phenolic-impregnated carbon ablative composites.",
      "There is insufficient evidence to determine whether Heat Shield Probe-7 is composed of phenolic-impregnated carbon ablative composites."
    ],
    "expl": "By Modus Ponens: Because Heat Shield Probe-7 belongs to spacecraft thermal protection heat shields, and all spacecraft thermal protection heat shields are composed of phenolic-impregnated carbon ablative composites, Heat Shield Probe-7 must be composed of phenolic-impregnated carbon ablative composites."
  },
  {
    "premise": "Premise 1: No spacecraft thermal protection heat shields are composed of phenolic-impregnated carbon ablative composites.\nPremise 2: Heat Shield Probe-7 is classified as one of the spacecraft thermal protection heat shields.\nWhich of the following conclusions logically follows?",
    "correct": "Heat Shield Probe-7 is not composed of phenolic-impregnated carbon ablative composites.",
    "distractors": [
      "Heat Shield Probe-7 is composed of phenolic-impregnated carbon ablative composites.",
      "All entities that are not composed of phenolic-impregnated carbon ablative composites are classified as spacecraft thermal protection heat shields.",
      "Some spacecraft thermal protection heat shields can be composed of phenolic-impregnated carbon ablative composites under special conditions.",
      "No conclusion can be deduced from the stated premises."
    ],
    "expl": "By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B."
  },
  {
    "premise": "Premise 1: If an entity is classified as one of the spacecraft thermal protection heat shields, it must be composed of phenolic-impregnated carbon ablative composites.\nPremise 2: Specimen Heat Shield Probe-7 is verified to NOT be composed of phenolic-impregnated carbon ablative composites.\nWhich of the following conclusions logically follows?",
    "correct": "Specimen Heat Shield Probe-7 is not one of the spacecraft thermal protection heat shields.",
    "distractors": [
      "Specimen Heat Shield Probe-7 is one of the spacecraft thermal protection heat shields.",
      "All entities that are composed of phenolic-impregnated carbon ablative composites are spacecraft thermal protection heat shields.",
      "Specimen Heat Shield Probe-7 possesses some alternative attributes of spacecraft thermal protection heat shields.",
      "The classification of Specimen Heat Shield Probe-7 is completely indeterminate."
    ],
    "expl": "By Modus Tollens: If P implies Q, then Not Q implies Not P."
  },
  {
    "premise": "Premise 1: All spacecraft thermal protection heat shields are composed of phenolic-impregnated carbon ablative composites.\nPremise 2: Some atmospheric reentry protective barriers are classified as spacecraft thermal protection heat shields.\nWhich of the following conclusions logically follows?",
    "correct": "Some atmospheric reentry protective barriers are composed of phenolic-impregnated carbon ablative composites.",
    "distractors": [
      "All atmospheric reentry protective barriers are composed of phenolic-impregnated carbon ablative composites.",
      "No atmospheric reentry protective barriers are composed of phenolic-impregnated carbon ablative composites.",
      "All entities that are composed of phenolic-impregnated carbon ablative composites are classified as atmospheric reentry protective barriers.",
      "None of the spacecraft thermal protection heat shields belong to atmospheric reentry protective barriers."
    ],
    "expl": "By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B."
  }
];
export const ODD_WORD_BANK = [
  {
    "categoryContext": "Plane Geometry",
    "words": [
      "Circle",
      "Square",
      "Triangle",
      "Hexagon",
      "Sphere"
    ],
    "correct": "Sphere",
    "expl": "Sphere is a 3D solid; the other four are 2D flat planar figures.",
    "idTag": "Odd-Out #1"
  },
  {
    "categoryContext": "Metallurgy",
    "words": [
      "Iron",
      "Copper",
      "Silver",
      "Gold",
      "Bronze"
    ],
    "correct": "Bronze",
    "expl": "Bronze is an alloy; the others are elemental metals on the periodic table.",
    "idTag": "Odd-Out #2"
  },
  {
    "categoryContext": "World Geography",
    "words": [
      "Paris",
      "Rome",
      "Berlin",
      "Madrid",
      "Sydney"
    ],
    "correct": "Sydney",
    "expl": "Sydney is not a national capital (Canberra is); all others are national capitals.",
    "idTag": "Odd-Out #3"
  },
  {
    "categoryContext": "Anatomy",
    "words": [
      "Femur",
      "Tibia",
      "Humerus",
      "Radius",
      "Biceps"
    ],
    "correct": "Biceps",
    "expl": "Biceps is a muscle; all others are skeletal bones.",
    "idTag": "Odd-Out #4"
  },
  {
    "categoryContext": "Grammar",
    "words": [
      "Quickly",
      "Silently",
      "Eagerly",
      "Patiently",
      "Beautiful"
    ],
    "correct": "Beautiful",
    "expl": "Beautiful is an adjective; all other four words are adverbs ending in '-ly'.",
    "idTag": "Odd-Out #5"
  },
  {
    "categoryContext": "Marine Biology",
    "words": [
      "Whale",
      "Dolphin",
      "Porpoise",
      "Seal",
      "Shark"
    ],
    "correct": "Shark",
    "expl": "Sharks are cartilaginous fish; all others are warm-blooded marine mammals.",
    "idTag": "Odd-Out #6"
  },
  {
    "categoryContext": "Musical Instruments",
    "words": [
      "Guitar",
      "Violin",
      "Cello",
      "Harp",
      "Flute"
    ],
    "correct": "Flute",
    "expl": "The flute is a woodwind aerophone; the other four are string chordophones.",
    "idTag": "Odd-Out #7"
  },
  {
    "categoryContext": "Chemical Elements",
    "words": [
      "Oxygen",
      "Nitrogen",
      "Hydrogen",
      "Helium",
      "Carbon"
    ],
    "correct": "Carbon",
    "expl": "Carbon is a solid at room temperature; all others are gaseous elements.",
    "idTag": "Odd-Out #8"
  },
  {
    "categoryContext": "Astronomy",
    "words": [
      "Jupiter",
      "Mars",
      "Venus",
      "Saturn",
      "Moon"
    ],
    "correct": "Moon",
    "expl": "The Moon is a planetary satellite; all others are planets orbiting the Sun.",
    "idTag": "Odd-Out #9"
  },
  {
    "categoryContext": "Botany",
    "words": [
      "Apple",
      "Orange",
      "Banana",
      "Grape",
      "Carrot"
    ],
    "correct": "Carrot",
    "expl": "Carrot is a taproot vegetable; the other four are botanical seed-bearing fruits.",
    "idTag": "Odd-Out #10"
  },
  {
    "categoryContext": "Fine Arts",
    "words": [
      "Novel",
      "Biography",
      "Poem",
      "Play",
      "Sculpture"
    ],
    "correct": "Sculpture",
    "expl": "Sculpture is a visual physical medium; all others are literary textual genres.",
    "idTag": "Odd-Out #11"
  },
  {
    "categoryContext": "Measurement Systems",
    "words": [
      "Pound",
      "Ounce",
      "Kilogram",
      "Gram",
      "Mile"
    ],
    "correct": "Mile",
    "expl": "Mile measures linear distance; all others measure mass or weight.",
    "idTag": "Odd-Out #12"
  },
  {
    "categoryContext": "Military History",
    "words": [
      "Pistol",
      "Rifle",
      "Shotgun",
      "Musket",
      "Sword"
    ],
    "correct": "Sword",
    "expl": "A sword is a bladed hand weapon; all others are projectile firearms.",
    "idTag": "Odd-Out #13"
  },
  {
    "categoryContext": "Ornithology",
    "words": [
      "Eagle",
      "Hawk",
      "Falcon",
      "Owl",
      "Penguin"
    ],
    "correct": "Penguin",
    "expl": "Penguins are flightless marine birds; the other four are birds of prey.",
    "idTag": "Odd-Out #14"
  },
  {
    "categoryContext": "Economics",
    "words": [
      "Dollar",
      "Euro",
      "Yen",
      "Franc",
      "Gold"
    ],
    "correct": "Gold",
    "expl": "Gold is a physical metal commodity; the other four are sovereign fiat currencies.",
    "idTag": "Odd-Out #15"
  },
  {
    "categoryContext": "Healthcare Vocations",
    "words": [
      "Physician",
      "Nurse",
      "Surgeon",
      "Pharmacist",
      "Architect"
    ],
    "correct": "Architect",
    "expl": "An architect works in construction; all others are medical clinicians.",
    "idTag": "Odd-Out #16"
  },
  {
    "categoryContext": "Logistics",
    "words": [
      "Train",
      "Subway",
      "Bus",
      "Tram",
      "Helicopter"
    ],
    "correct": "Helicopter",
    "expl": "A helicopter is an aerial aircraft; all others are ground or rail transit.",
    "idTag": "Odd-Out #17"
  },
  {
    "categoryContext": "Petrology",
    "words": [
      "Granite",
      "Basalt",
      "Obsidian",
      "Pumice",
      "Marble"
    ],
    "correct": "Marble",
    "expl": "Marble is a metamorphic rock; the others are igneous rocks.",
    "idTag": "Odd-Out #18"
  },
  {
    "categoryContext": "Athletics",
    "words": [
      "Basketball",
      "Soccer",
      "Tennis",
      "Volleyball",
      "Chess"
    ],
    "correct": "Chess",
    "expl": "Chess is a cognitive board game; all others are physical athletic sports.",
    "idTag": "Odd-Out #19"
  },
  {
    "categoryContext": "Thermodynamics",
    "words": [
      "Celsius",
      "Fahrenheit",
      "Kelvin",
      "Rankine",
      "Volt"
    ],
    "correct": "Volt",
    "expl": "Volt measures electrical potential; all others are temperature scales.",
    "idTag": "Odd-Out #20"
  },
  {
    "categoryContext": "Cell Biology",
    "words": [
      "Mitochondria",
      "Ribosome",
      "Chloroplast",
      "Nucleus",
      "Enzyme"
    ],
    "correct": "Enzyme",
    "expl": "Enzyme is a catalytic protein molecule; all others are cell organelles.",
    "idTag": "Odd-Out #21"
  },
  {
    "categoryContext": "Vision Science",
    "words": [
      "Retina",
      "Cornea",
      "Iris",
      "Lens",
      "Cochlea"
    ],
    "correct": "Cochlea",
    "expl": "The cochlea is part of the inner ear; all others are ocular components.",
    "idTag": "Odd-Out #22"
  },
  {
    "categoryContext": "Computing",
    "words": [
      "RAM",
      "CPU",
      "Motherboard",
      "Hard Drive",
      "Compiler"
    ],
    "correct": "Compiler",
    "expl": "A compiler is software; all others are physical computer hardware.",
    "idTag": "Odd-Out #23"
  },
  {
    "categoryContext": "Poetry",
    "words": [
      "Iamb",
      "Trochee",
      "Anapest",
      "Dactyl",
      "Canvas"
    ],
    "correct": "Canvas",
    "expl": "Canvas is a painting support; all others are metrical feet in poetic verse.",
    "idTag": "Odd-Out #24"
  },
  {
    "categoryContext": "Zoology",
    "words": [
      "Spider",
      "Scorpion",
      "Tick",
      "Mite",
      "Beetle"
    ],
    "correct": "Beetle",
    "expl": "Beetles are six-legged insects; all others are eight-legged arachnids.",
    "idTag": "Odd-Out #25"
  },
  {
    "categoryContext": "Philosophy",
    "words": [
      "Epistemology",
      "Ethics",
      "Logic",
      "Metaphysics",
      "Botany"
    ],
    "correct": "Botany",
    "expl": "Botany is a biological science; all others are branches of philosophy.",
    "idTag": "Odd-Out #26"
  },
  {
    "categoryContext": "Physics",
    "words": [
      "Viscosity",
      "Turbulence",
      "Buoyancy",
      "Surface Tension",
      "Ohm"
    ],
    "correct": "Ohm",
    "expl": "Ohm measures electrical resistance; all other properties pertain to fluid mechanics.",
    "idTag": "Odd-Out #27"
  },
  {
    "categoryContext": "History",
    "words": [
      "Mesopotamia",
      "Egypt",
      "Indus Valley",
      "Minoan",
      "Silicon Valley"
    ],
    "correct": "Silicon Valley",
    "expl": "Silicon Valley is a modern tech hub; all others are ancient civilizations.",
    "idTag": "Odd-Out #28"
  },
  {
    "categoryContext": "Radiative Physics",
    "words": [
      "Radio",
      "Microwave",
      "Infrared",
      "Ultraviolet",
      "Sonar"
    ],
    "correct": "Sonar",
    "expl": "Sonar relies on acoustic sound waves; all others are electromagnetic radiation.",
    "idTag": "Odd-Out #29"
  },
  {
    "categoryContext": "Culinary Science",
    "words": [
      "Cinnamon",
      "Nutmeg",
      "Cloves",
      "Cardamom",
      "Sugar"
    ],
    "correct": "Sugar",
    "expl": "Sugar is a carbohydrate sweetener; all others are aromatic botanical spices.",
    "idTag": "Odd-Out #30"
  },
  {
    "categoryContext": "Mammalogy",
    "words": [
      "Lion",
      "Tiger",
      "Leopard",
      "Cheetah",
      "Cobra"
    ],
    "correct": "Cobra",
    "expl": "A cobra is a reptile; all others are carnivorous feline mammals.",
    "idTag": "Odd-Out #31"
  },
  {
    "categoryContext": "Wind Acoustics",
    "words": [
      "Trumpet",
      "Trombone",
      "Tuba",
      "French Horn",
      "Clarinet"
    ],
    "correct": "Clarinet",
    "expl": "Clarinet is a woodwind with a reed; all others are brass aerophones.",
    "idTag": "Odd-Out #32"
  },
  {
    "categoryContext": "Software Tech",
    "words": [
      "C++",
      "Rust",
      "Golang",
      "Fortran",
      "HTML"
    ],
    "correct": "HTML",
    "expl": "HTML is a document markup language; all others are compiled programming languages.",
    "idTag": "Odd-Out #33"
  },
  {
    "categoryContext": "Atmospheric Science",
    "words": [
      "Troposphere",
      "Stratosphere",
      "Mesosphere",
      "Thermosphere",
      "Lithosphere"
    ],
    "correct": "Lithosphere",
    "expl": "The lithosphere is the solid outer crust of the Earth; all others are atmospheric gaseous layers.",
    "idTag": "Odd-Out #34"
  },
  {
    "categoryContext": "Geography",
    "words": [
      "Pacific",
      "Atlantic",
      "Indian",
      "Arctic",
      "Sahara"
    ],
    "correct": "Sahara",
    "expl": "The Sahara is a desert landmass; all others are global oceanic bodies.",
    "idTag": "Odd-Out #35"
  },
  {
    "categoryContext": "Classical Architecture",
    "words": [
      "Doric",
      "Ionic",
      "Corinthian",
      "Tuscan",
      "Baroque"
    ],
    "correct": "Baroque",
    "expl": "Baroque is a later ornate artistic era; the others are classical architectural orders of columns.",
    "idTag": "Odd-Out #36"
  },
  {
    "categoryContext": "Primatology",
    "words": [
      "Chimpanzee",
      "Gorilla",
      "Orangutan",
      "Bonobo",
      "Koala"
    ],
    "correct": "Koala",
    "expl": "A koala is an Australian marsupial; all others are hominid primates.",
    "idTag": "Odd-Out #37"
  },
  {
    "categoryContext": "Mineralogy",
    "words": [
      "Diamond",
      "Ruby",
      "Sapphire",
      "Emerald",
      "Quartz"
    ],
    "correct": "Quartz",
    "expl": "The first four are traditional precious gemstones; quartz is common silica mineral.",
    "idTag": "Odd-Out #38"
  },
  {
    "categoryContext": "Canine Breeds",
    "words": [
      "Retriever",
      "Shepherd",
      "Bulldog",
      "Poodle",
      "Siamese"
    ],
    "correct": "Siamese",
    "expl": "Siamese is a feline cat breed; all others are domestic dog breeds.",
    "idTag": "Odd-Out #39"
  },
  {
    "categoryContext": "Board Games",
    "words": [
      "Poker",
      "Blackjack",
      "Baccarat",
      "Roulette",
      "Solitaire"
    ],
    "correct": "Roulette",
    "expl": "Roulette is a mechanical wheel game; all others are playing card games.",
    "idTag": "Odd-Out #40"
  },
  {
    "categoryContext": "Nobel Disciplines",
    "words": [
      "Physics",
      "Chemistry",
      "Medicine",
      "Peace",
      "Architecture"
    ],
    "correct": "Architecture",
    "expl": "Architecture is not an original Nobel Prize category; all others are.",
    "idTag": "Odd-Out #41"
  },
  {
    "categoryContext": "Hydrology",
    "words": [
      "Danube",
      "Rhine",
      "Volga",
      "Thames",
      "Amazon"
    ],
    "correct": "Amazon",
    "expl": "The Amazon is a South American river; all others are European river systems.",
    "idTag": "Odd-Out #42"
  },
  {
    "categoryContext": "Arid Landscapes",
    "words": [
      "Gobi",
      "Kalahari",
      "Atacama",
      "Mojave",
      "Everglades"
    ],
    "correct": "Everglades",
    "expl": "The Everglades is a subtropical wetland; all others are arid desert expanses.",
    "idTag": "Odd-Out #43"
  },
  {
    "categoryContext": "Numismatics",
    "words": [
      "Penny",
      "Nickel",
      "Dime",
      "Quarter",
      "Liter"
    ],
    "correct": "Liter",
    "expl": "Liter is a unit of fluid volume; all others are fractional circulating coins.",
    "idTag": "Odd-Out #44"
  },
  {
    "categoryContext": "Chromatics",
    "words": [
      "Cyan",
      "Magenta",
      "Yellow",
      "Black",
      "Loud"
    ],
    "correct": "Loud",
    "expl": "Loud is an auditory descriptor; all others are colors in the CMYK subtractive color model.",
    "idTag": "Odd-Out #45"
  },
  {
    "categoryContext": "Domestic Appliances",
    "words": [
      "Refrigerator",
      "Dishwasher",
      "Oven",
      "Microwave",
      "Sofa"
    ],
    "correct": "Sofa",
    "expl": "A sofa is living room upholstered furniture; all others are kitchen electric appliances.",
    "idTag": "Odd-Out #46"
  },
  {
    "categoryContext": "Workplace Furnishings",
    "words": [
      "Executive Desk",
      "Ergonomic Chair",
      "Filing Cabinet",
      "Bookcase",
      "Skateboard"
    ],
    "correct": "Skateboard",
    "expl": "A skateboard is recreation equipment; all others are office furniture items.",
    "idTag": "Odd-Out #47"
  },
  {
    "categoryContext": "Apparel",
    "words": [
      "Oxford Shoes",
      "Loafers",
      "Sneakers",
      "Boots",
      "Necktie"
    ],
    "correct": "Necktie",
    "expl": "A necktie is neckwear; all others are types of footwear.",
    "idTag": "Odd-Out #48"
  },
  {
    "categoryContext": "Meteorology",
    "words": [
      "Tornado",
      "Hurricane",
      "Typhoon",
      "Cyclone",
      "Dune"
    ],
    "correct": "Dune",
    "expl": "A sand dune is a desert topographical hill; all others are atmospheric vortex storms.",
    "idTag": "Odd-Out #49"
  },
  {
    "categoryContext": "Agronomy",
    "words": [
      "Grapefruit",
      "Lemon",
      "Lime",
      "Tangerine",
      "Onion"
    ],
    "correct": "Onion",
    "expl": "An onion is an allium root bulb; all others are citrus fruits.",
    "idTag": "Odd-Out #50"
  },
  {
    "categoryContext": "Entomology",
    "words": [
      "Bee",
      "Wasp",
      "Ant",
      "Hornet",
      "Earthworm"
    ],
    "correct": "Earthworm",
    "expl": "An earthworm is an annelid worm; all others are hymenopteran winged insects.",
    "idTag": "Odd-Out #51"
  },
  {
    "categoryContext": "Bacteriology",
    "words": [
      "Coccus",
      "Bacillus",
      "Spirillum",
      "Vibrio",
      "Amoeba"
    ],
    "correct": "Amoeba",
    "expl": "An amoeba is a eukaryotic protozoan; all others are bacterial prokaryotic cell morphologies.",
    "idTag": "Odd-Out #52"
  },
  {
    "categoryContext": "Optics",
    "words": [
      "Convex Lens",
      "Concave Lens",
      "Prism",
      "Beam Splitter",
      "Microphone"
    ],
    "correct": "Microphone",
    "expl": "A microphone is an audio acoustic transducer; all others are optical light devices.",
    "idTag": "Odd-Out #53"
  },
  {
    "categoryContext": "Navigation",
    "words": [
      "Compass",
      "Sextant",
      "GPS Receiver",
      "Astrolabe",
      "Wrench"
    ],
    "correct": "Wrench",
    "expl": "A wrench is a mechanical tool; all others are navigational positioning instruments.",
    "idTag": "Odd-Out #54"
  },
  {
    "categoryContext": "Timekeeping",
    "words": [
      "Hourglass",
      "Sundial",
      "Chronometer",
      "Water Clock",
      "Anvil"
    ],
    "correct": "Anvil",
    "expl": "An anvil is a blacksmithing metal block; all others are chronometric timekeeping devices.",
    "idTag": "Odd-Out #55"
  },
  {
    "categoryContext": "Acoustics",
    "words": [
      "Treble",
      "Bass",
      "Pitch",
      "Timbre",
      "Kilowatt"
    ],
    "correct": "Kilowatt",
    "expl": "Kilowatt is a unit of electrical power; all others are acoustic sound properties.",
    "idTag": "Odd-Out #56"
  },
  {
    "categoryContext": "Thermodynamic Phases",
    "words": [
      "Solid",
      "Liquid",
      "Gas",
      "Plasma",
      "Velocity"
    ],
    "correct": "Velocity",
    "expl": "Velocity is a kinematic vector; all others are fundamental states of matter.",
    "idTag": "Odd-Out #57"
  },
  {
    "categoryContext": "Structural Engineering",
    "words": [
      "Beam",
      "Truss",
      "Column",
      "Arch",
      "Pencil"
    ],
    "correct": "Pencil",
    "expl": "A pencil is a writing implement; all others are civil structural load-bearing elements.",
    "idTag": "Odd-Out #58"
  },
  {
    "categoryContext": "Cardiovascular System",
    "words": [
      "Aorta",
      "Vena Cava",
      "Ventricle",
      "Atrium",
      "Bronchus"
    ],
    "correct": "Bronchus",
    "expl": "A bronchus is a pulmonary airway in the respiratory system; all others are heart/circulatory structures.",
    "idTag": "Odd-Out #59"
  },
  {
    "categoryContext": "Inorganic Chemistry",
    "words": [
      "Sulfuric Acid",
      "Hydrochloric Acid",
      "Nitric Acid",
      "Phosphoric Acid",
      "Sodium Hydroxide"
    ],
    "correct": "Sodium Hydroxide",
    "expl": "Sodium hydroxide is an alkaline base; all others are mineral acids.",
    "idTag": "Odd-Out #60"
  },
  {
    "categoryContext": "Organic Polymers",
    "words": [
      "Polyethylene",
      "Polystyrene",
      "Polypropylene",
      "Polyvinyl Chloride",
      "Cast Iron"
    ],
    "correct": "Cast Iron",
    "expl": "Cast iron is a ferrous metal alloy; all others are synthetic organic thermoplastic polymers.",
    "idTag": "Odd-Out #61"
  },
  {
    "categoryContext": "Aviation Controls",
    "words": [
      "Aileron",
      "Rudder",
      "Elevator",
      "Flap",
      "Propeller Shaft"
    ],
    "correct": "Propeller Shaft",
    "expl": "Propeller shaft is a powertrain drive element; all others are aerodynamic flight control surfaces.",
    "idTag": "Odd-Out #62"
  },
  {
    "categoryContext": "Cell Genetics",
    "words": [
      "Adenine",
      "Thymine",
      "Guanine",
      "Cytosine",
      "Hemoglobin"
    ],
    "correct": "Hemoglobin",
    "expl": "Hemoglobin is an oxygen-transport protein; all others are nucleotide nitrogenous bases of DNA.",
    "idTag": "Odd-Out #63"
  },
  {
    "categoryContext": "Pharmacology",
    "words": [
      "Penicillin",
      "Amoxicillin",
      "Ciprofloxacin",
      "Azithromycin",
      "Insulin"
    ],
    "correct": "Insulin",
    "expl": "Insulin is a metabolic hormone; all others are antibacterial antibiotics.",
    "idTag": "Odd-Out #64"
  },
  {
    "categoryContext": "Cryptology",
    "words": [
      "RSA",
      "AES",
      "Diffie-Hellman",
      "Elliptic Curve",
      "Ethernet"
    ],
    "correct": "Ethernet",
    "expl": "Ethernet is a networking physical/data-link protocol; all others are cryptographic algorithms.",
    "idTag": "Odd-Out #65"
  },
  {
    "categoryContext": "Operating Systems",
    "words": [
      "Linux",
      "FreeBSD",
      "OpenBSD",
      "Solaris",
      "Photoshop"
    ],
    "correct": "Photoshop",
    "expl": "Photoshop is an application program; all others are Unix-like computer operating systems.",
    "idTag": "Odd-Out #66"
  },
  {
    "categoryContext": "Web Protocols",
    "words": [
      "HTTP",
      "HTTPS",
      "FTP",
      "SSH",
      "Transistor"
    ],
    "correct": "Transistor",
    "expl": "A transistor is a solid-state electronic semiconductor; all others are internet network protocols.",
    "idTag": "Odd-Out #67"
  },
  {
    "categoryContext": "Neuroscience",
    "words": [
      "Axon",
      "Dendrite",
      "Myelin Sheath",
      "Synapse",
      "Platelet"
    ],
    "correct": "Platelet",
    "expl": "A platelet is a blood clotting cell fragment; all others are structural parts of a nerve cell (neuron).",
    "idTag": "Odd-Out #68"
  },
  {
    "categoryContext": "Electromagnetism",
    "words": [
      "Capacitor",
      "Inductor",
      "Resistor",
      "Diode",
      "Crowbar"
    ],
    "correct": "Crowbar",
    "expl": "A crowbar is a simple lever hand tool; all others are electronic circuit components.",
    "idTag": "Odd-Out #69"
  },
  {
    "categoryContext": "Cartography",
    "words": [
      "Equator",
      "Prime Meridian",
      "Tropic of Cancer",
      "Tropic of Capricorn",
      "Altimeter"
    ],
    "correct": "Altimeter",
    "expl": "An altimeter is a physical measuring instrument; all others are imaginary geographic reference lines.",
    "idTag": "Odd-Out #70"
  },
  {
    "categoryContext": "Forest Ecology",
    "words": [
      "Oak",
      "Pine",
      "Birch",
      "Maple",
      "Trout"
    ],
    "correct": "Trout",
    "expl": "A trout is a freshwater fish; all others are forest canopy tree species.",
    "idTag": "Odd-Out #71"
  },
  {
    "categoryContext": "Ichthyology",
    "words": [
      "Salmon",
      "Tuna",
      "Cod",
      "Mackerel",
      "Pelican"
    ],
    "correct": "Pelican",
    "expl": "A pelican is an aquatic bird; all others are marine teleost fish.",
    "idTag": "Odd-Out #72"
  },
  {
    "categoryContext": "Paleontology",
    "words": [
      "Tyrannosaurus",
      "Triceratops",
      "Velociraptor",
      "Stegosaurus",
      "Mastodon"
    ],
    "correct": "Mastodon",
    "expl": "A mastodon is an extinct Cenozoic mammal; all others are Mesozoic dinosaurs.",
    "idTag": "Odd-Out #73"
  },
  {
    "categoryContext": "Geological Eras",
    "words": [
      "Paleozoic",
      "Mesozoic",
      "Cenozoic",
      "Precambrian",
      "Equinox"
    ],
    "correct": "Equinox",
    "expl": "An equinox is an astronomical calendar event; all others are major geological eras/eons.",
    "idTag": "Odd-Out #74"
  },
  {
    "categoryContext": "Volcanology",
    "words": [
      "Magma",
      "Caldera",
      "Pyroclastic Flow",
      "Basalt",
      "Tundra"
    ],
    "correct": "Tundra",
    "expl": "Tundra is a subarctic biome; all others are volcanic phenomena and products.",
    "idTag": "Odd-Out #75"
  },
  {
    "categoryContext": "Glaciology",
    "words": [
      "Crevasse",
      "Moraine",
      "Esker",
      "Cirque",
      "Lagoon"
    ],
    "correct": "Lagoon",
    "expl": "A lagoon is a shallow body of coastal water; all others are glacial erosional or depositional features.",
    "idTag": "Odd-Out #76"
  },
  {
    "categoryContext": "Astronavigation",
    "words": [
      "North Star",
      "Sirius",
      "Betelgeuse",
      "Polaris",
      "Telescope"
    ],
    "correct": "Telescope",
    "expl": "A telescope is an optical instrument; all others are individual navigational celestial stars.",
    "idTag": "Odd-Out #77"
  },
  {
    "categoryContext": "Planetary Moons",
    "words": [
      "Europa",
      "Titan",
      "Ganymede",
      "Callisto",
      "Pluto"
    ],
    "correct": "Pluto",
    "expl": "Pluto is a dwarf planet; all others are planetary moons (of Jupiter and Saturn).",
    "idTag": "Odd-Out #78"
  },
  {
    "categoryContext": "Orbital Mechanics",
    "words": [
      "Perigee",
      "Apogee",
      "Inclination",
      "Eccentricity",
      "Speedometer"
    ],
    "correct": "Speedometer",
    "expl": "A speedometer measures automobile ground speed; all others are classical Keplerian orbital parameters.",
    "idTag": "Odd-Out #79"
  },
  {
    "categoryContext": "Thermodynamic Engines",
    "words": [
      "Stirling Engine",
      "Diesel Engine",
      "Steam Turbine",
      "Otto Engine",
      "Bicycle"
    ],
    "correct": "Bicycle",
    "expl": "A bicycle is human-powered mechanical transit; all others are heat engines.",
    "idTag": "Odd-Out #80"
  },
  {
    "categoryContext": "Quantum Physics",
    "words": [
      "Photon",
      "Electron",
      "Quark",
      "Neutrino",
      "Neutron Star"
    ],
    "correct": "Neutron Star",
    "expl": "A neutron star is a macroscopic astrophysical stellar remnant; all others are subatomic elementary particles.",
    "idTag": "Odd-Out #81"
  },
  {
    "categoryContext": "Fluid Hydraulics",
    "words": [
      "Pressure",
      "Viscosity",
      "Laminar Flow",
      "Turbulence",
      "Gram"
    ],
    "correct": "Gram",
    "expl": "Gram is a metric unit of mass; all others are fundamental fluid dynamic terms.",
    "idTag": "Odd-Out #82"
  },
  {
    "categoryContext": "Optics Refraction",
    "words": [
      "Refraction",
      "Diffraction",
      "Interference",
      "Dispersion",
      "Conduction"
    ],
    "correct": "Conduction",
    "expl": "Conduction is the transfer of heat or electric charge through matter; all others are wave optical phenomena.",
    "idTag": "Odd-Out #83"
  },
  {
    "categoryContext": "Geodesy",
    "words": [
      "Latitude",
      "Longitude",
      "Elevation",
      "Azimuth",
      "Thermometer"
    ],
    "correct": "Thermometer",
    "expl": "A thermometer measures temperature; all others are angular spatial coordinates.",
    "idTag": "Odd-Out #84"
  },
  {
    "categoryContext": "Mineral Hardness",
    "words": [
      "Talc",
      "Gypsum",
      "Calcite",
      "Fluorite",
      "Water"
    ],
    "correct": "Water",
    "expl": "Water is a liquid molecule; all others are reference minerals on Mohs scale of hardness.",
    "idTag": "Odd-Out #85"
  },
  {
    "categoryContext": "Atmospheric Moisture",
    "words": [
      "Dew",
      "Frost",
      "Fog",
      "Rain",
      "Wind"
    ],
    "correct": "Wind",
    "expl": "Wind is the bulk horizontal motion of air; all others are condensations of atmospheric water vapor.",
    "idTag": "Odd-Out #86"
  },
  {
    "categoryContext": "Seismology",
    "words": [
      "P-wave",
      "S-wave",
      "Rayleigh wave",
      "Love wave",
      "Microwave"
    ],
    "correct": "Microwave",
    "expl": "A microwave is high-frequency electromagnetic radiation; all others are acoustic seismic waves.",
    "idTag": "Odd-Out #87"
  },
  {
    "categoryContext": "Microbiology",
    "words": [
      "Penicillin",
      "Streptomycin",
      "Tetracycline",
      "Vancomycin",
      "Adrenaline"
    ],
    "correct": "Adrenaline",
    "expl": "Adrenaline is a physiological hormone; all others are therapeutic antibacterial agents.",
    "idTag": "Odd-Out #88"
  },
  {
    "categoryContext": "Zoological Classes",
    "words": [
      "Mammalia",
      "Aves",
      "Reptilia",
      "Amphibia",
      "Bacteria"
    ],
    "correct": "Bacteria",
    "expl": "Bacteria is a separate biological domain of single-celled prokaryotes; all others are vertebrate animal classes.",
    "idTag": "Odd-Out #89"
  },
  {
    "categoryContext": "Civil Engineering",
    "words": [
      "Suspension Bridge",
      "Cable-stayed Bridge",
      "Arch Bridge",
      "Cantilever Bridge",
      "Submarine"
    ],
    "correct": "Submarine",
    "expl": "A submarine is a submersible naval vessel; all others are civil engineering bridge architectures.",
    "idTag": "Odd-Out #90"
  }
];

export function getVerbalQuestionsForTest(testNumber) {
  const rand = pseudoRandom(testNumber * 8819 + 421);
  const questions = [];
  const tIdx = testNumber - 2; // For tests 2 to 30: 0 to 28

  // 1. Five Vocabulary questions (Disjoint slice of 5)
  const vocabSlice = VOCAB_BANK.slice(tIdx * 5, (tIdx + 1) * 5);
  for (let i = 0; i < 5; i++) {
    const item = vocabSlice[i];
    const isAntonym = item.type === 'antonym';
    const qText = isAntonym 
      ? `Which of the following words is most OPPOSITE in meaning to "${item.word}"?`
      : `Which of the following words is most SIMILAR in meaning to "${item.word}"?`;
    const rawOpts = [item.correct, ...item.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n${item.expl}\n\n💡 **Speed Tip:** Rapidly eliminate choices that belong to the wrong category. Target <8 seconds.`,
      category: 'verbal',
      subType: isAntonym ? 'antonym' : 'synonym'
    });
  }

  // 2. Five Analogy questions (Disjoint slice of 5)
  const analogySlice = ANALOGY_BANK.slice(tIdx * 5, (tIdx + 1) * 5);
  for (let i = 0; i < 5; i++) {
    const item = analogySlice[i];
    const qText = `${item.pair} is analogous to:`;
    const rawOpts = [item.correct, ...item.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n${item.expl}\n\n💡 **Speed Tip:** Build a precise bridge sentence: "X is used to / is composed of Y". Apply to find the exact match.`,
      category: 'verbal',
      subType: 'analogy'
    });
  }

  // 3. Four Syllogisms (Disjoint slice of 4)
  const syllogismSlice = SYLLOGISM_BANK.slice(tIdx * 4, (tIdx + 1) * 4);
  for (let i = 0; i < 4; i++) {
    const item = syllogismSlice[i];
    const rawOpts = [item.correct, ...item.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: item.premise,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}**\n\n${item.expl}\n\n💡 **Speed Tip:** Do not extrapolate beyond stated premises. Apply strict Modus Ponens.`,
      category: 'verbal',
      subType: 'syllogism'
    });
  }

  // 4. Three Odd-Word-Out questions (Disjoint slice of 3)
  const oddSlice = ODD_WORD_BANK.slice(tIdx * 3, (tIdx + 1) * 3);
  for (let i = 0; i < 3; i++) {
    const item = oddSlice[i];
    const qText = `In the domain of ${item.categoryContext}, which word does NOT belong with the others?`;
    const rawOpts = [...item.words.slice(0, 5)];
    const corrIdx = rawOpts.indexOf(item.correct);
    const { options, correctOption } = randomize(rawOpts, corrIdx >= 0 ? corrIdx : 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${item.correct})\n\n${item.expl}\n\n💡 **Speed Tip:** Identify the unifying trait uniting 4 options, isolate the outlier.`,
      category: 'verbal',
      subType: 'odd_word'
    });
  }

  return questions;
}
