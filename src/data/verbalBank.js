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
    "premise": "[Scenario #1] Premise 1: All licensed commercial aviators must pass annual cardiovascular screening.\nPremise 2: Captain Reynolds is a licensed commercial aviator.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Captain Reynolds must pass annual cardiovascular screening.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Captain Reynolds must pass annual cardiovascular screening.\"."
  },
  {
    "premise": "[Scenario #2] Premise 1: No deep-sea submersible without titanium hulls can withstand 10,000 meters of hydrostatic pressure.\nPremise 2: The exploration vessel Nereus-9 lacks a titanium hull.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.\"."
  },
  {
    "premise": "[Scenario #3] Premise 1: All registered trademarks granted federal protection are intellectual property assets.\nPremise 2: Project Zenith is a registered trademark granted federal protection.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Project Zenith is an intellectual property asset.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Project Zenith is an intellectual property asset.\"."
  },
  {
    "premise": "[Scenario #4] Premise 1: Whenever ambient temperature drops below minus forty degrees, diesel engine fuel lines freeze without preheaters.\nPremise 2: Generator Unit 4 has no fuel line preheaters and temperature reached minus forty-five degrees.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Generator Unit 4 fuel lines froze.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Generator Unit 4 fuel lines froze.\"."
  },
  {
    "premise": "[Scenario #5] Premise 1: All valid cryptographic hash functions must satisfy strict pre-image resistance.\nPremise 2: Algorithm SHA-512 is a valid cryptographic hash function.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.\"."
  },
  {
    "premise": "[Scenario #6] Premise 1: No non-renewable energy source generates zero carbon emissions during combustion.\nPremise 2: Bituminous coal is a non-renewable combustion fuel.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.\"."
  },
  {
    "premise": "[Scenario #7] Premise 1: All mammal species capable of true powered flight belong to the mammalian order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The fruit bat belongs to the mammalian order Chiroptera.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The fruit bat belongs to the mammalian order Chiroptera.\"."
  },
  {
    "premise": "[Scenario #8] Premise 1: If an enterprise database fails ACID concurrency compliance, it cannot guarantee zero transactional data loss.\nPremise 2: System Omega failed ACID concurrency compliance.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: System Omega cannot guarantee zero transactional data loss.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: System Omega cannot guarantee zero transactional data loss.\"."
  },
  {
    "premise": "[Scenario #9] Premise 1: All members of the World Trade Organization are bound by the most-favored-nation trading clause.\nPremise 2: Country Veridia is a member of the World Trade Organization.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Country Veridia is bound by the most-favored-nation trading clause.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Country Veridia is bound by the most-favored-nation trading clause.\"."
  },
  {
    "premise": "[Scenario #10] Premise 1: No semiconductor device manufactured on a 3-nanometer lithography node can operate without ultraviolet photolithography.\nPremise 2: Microchip Phoenix was manufactured on a 3-nanometer node.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Microchip Phoenix utilized ultraviolet photolithography.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Microchip Phoenix utilized ultraviolet photolithography.\"."
  },
  {
    "premise": "[Scenario #11] Premise 1: All corporate debt instruments rated AAA carry minimal credit default risk.\nPremise 2: Bond Series 2028 is rated AAA.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bond Series 2028 carries minimal credit default risk.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bond Series 2028 carries minimal credit default risk.\"."
  },
  {
    "premise": "[Scenario #12] Premise 1: Whenever an economy experiences stagflation, it exhibits simultaneous high unemployment and elevated inflation.\nPremise 2: Region B is undergoing stagflation.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.\"."
  },
  {
    "premise": "[Scenario #13] Premise 1: All enzymes that catalyze phosphorylation reactions are classified as protein kinases.\nPremise 2: Enzyme P-38 catalyzes phosphorylation reactions.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Enzyme P-38 is classified as a protein kinase.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Enzyme P-38 is classified as a protein kinase.\"."
  },
  {
    "premise": "[Scenario #14] Premise 1: No supersonic passenger aircraft can operate economically without specialized afterburning turbofan engines.\nPremise 2: The Concorde is a supersonic passenger aircraft.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The Concorde operated with specialized afterburning turbofans.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The Concorde operated with specialized afterburning turbofans.\"."
  },
  {
    "premise": "[Scenario #15] Premise 1: All equilateral triangles have interior angles measuring exactly 60 degrees.\nPremise 2: Geometric Figure Alpha is an equilateral triangle.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.\"."
  },
  {
    "premise": "[Scenario #16] Premise 1: If a legal contract lacks mutual consideration between parties, it is unenforceable in contract court.\nPremise 2: The partnership agreement between Smith and Jones lacked mutual consideration.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The partnership agreement is unenforceable in contract court.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The partnership agreement is unenforceable in contract court.\"."
  },
  {
    "premise": "[Scenario #17] Premise 1: All high-throughput optic fiber links rely on total internal reflection inside silica glass cores.\nPremise 2: The transatlantic cable Apollo is a high-throughput optic fiber link.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.\"."
  },
  {
    "premise": "[Scenario #18] Premise 1: No organism lacking chloroplasts can perform oxygenic photosynthesis.\nPremise 2: The fungal mold Penicillium lacks chloroplasts.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Penicillium cannot perform oxygenic photosynthesis.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Penicillium cannot perform oxygenic photosynthesis.\"."
  },
  {
    "premise": "[Scenario #19] Premise 1: All constitutional amendments requiring ratification must secure affirmative votes from three-fourths of state legislatures.\nPremise 2: Proposal 14 requires ratification as a constitutional amendment.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.\"."
  },
  {
    "premise": "[Scenario #20] Premise 1: Whenever a vehicle enters a geostationary transfer orbit, its apogee matches geosynchronous altitude.\nPremise 2: Satellite Echo entered a geostationary transfer orbit.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Satellite Echo's apogee matches geosynchronous altitude.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Satellite Echo's apogee matches geosynchronous altitude.\"."
  },
  {
    "premise": "[Scenario #21] Premise 1: All licensed commercial aviators must pass annual cardiovascular screening.\nPremise 2: Captain Reynolds is a licensed commercial aviator.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Captain Reynolds must pass annual cardiovascular screening.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Captain Reynolds must pass annual cardiovascular screening.\"."
  },
  {
    "premise": "[Scenario #22] Premise 1: No deep-sea submersible without titanium hulls can withstand 10,000 meters of hydrostatic pressure.\nPremise 2: The exploration vessel Nereus-9 lacks a titanium hull.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.\"."
  },
  {
    "premise": "[Scenario #23] Premise 1: All registered trademarks granted federal protection are intellectual property assets.\nPremise 2: Project Zenith is a registered trademark granted federal protection.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Project Zenith is an intellectual property asset.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Project Zenith is an intellectual property asset.\"."
  },
  {
    "premise": "[Scenario #24] Premise 1: Whenever ambient temperature drops below minus forty degrees, diesel engine fuel lines freeze without preheaters.\nPremise 2: Generator Unit 4 has no fuel line preheaters and temperature reached minus forty-five degrees.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Generator Unit 4 fuel lines froze.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Generator Unit 4 fuel lines froze.\"."
  },
  {
    "premise": "[Scenario #25] Premise 1: All valid cryptographic hash functions must satisfy strict pre-image resistance.\nPremise 2: Algorithm SHA-512 is a valid cryptographic hash function.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.\"."
  },
  {
    "premise": "[Scenario #26] Premise 1: No non-renewable energy source generates zero carbon emissions during combustion.\nPremise 2: Bituminous coal is a non-renewable combustion fuel.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.\"."
  },
  {
    "premise": "[Scenario #27] Premise 1: All mammal species capable of true powered flight belong to the mammalian order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The fruit bat belongs to the mammalian order Chiroptera.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The fruit bat belongs to the mammalian order Chiroptera.\"."
  },
  {
    "premise": "[Scenario #28] Premise 1: If an enterprise database fails ACID concurrency compliance, it cannot guarantee zero transactional data loss.\nPremise 2: System Omega failed ACID concurrency compliance.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: System Omega cannot guarantee zero transactional data loss.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: System Omega cannot guarantee zero transactional data loss.\"."
  },
  {
    "premise": "[Scenario #29] Premise 1: All members of the World Trade Organization are bound by the most-favored-nation trading clause.\nPremise 2: Country Veridia is a member of the World Trade Organization.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Country Veridia is bound by the most-favored-nation trading clause.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Country Veridia is bound by the most-favored-nation trading clause.\"."
  },
  {
    "premise": "[Scenario #30] Premise 1: No semiconductor device manufactured on a 3-nanometer lithography node can operate without ultraviolet photolithography.\nPremise 2: Microchip Phoenix was manufactured on a 3-nanometer node.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Microchip Phoenix utilized ultraviolet photolithography.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Microchip Phoenix utilized ultraviolet photolithography.\"."
  },
  {
    "premise": "[Scenario #31] Premise 1: All corporate debt instruments rated AAA carry minimal credit default risk.\nPremise 2: Bond Series 2028 is rated AAA.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bond Series 2028 carries minimal credit default risk.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bond Series 2028 carries minimal credit default risk.\"."
  },
  {
    "premise": "[Scenario #32] Premise 1: Whenever an economy experiences stagflation, it exhibits simultaneous high unemployment and elevated inflation.\nPremise 2: Region B is undergoing stagflation.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.\"."
  },
  {
    "premise": "[Scenario #33] Premise 1: All enzymes that catalyze phosphorylation reactions are classified as protein kinases.\nPremise 2: Enzyme P-38 catalyzes phosphorylation reactions.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Enzyme P-38 is classified as a protein kinase.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Enzyme P-38 is classified as a protein kinase.\"."
  },
  {
    "premise": "[Scenario #34] Premise 1: No supersonic passenger aircraft can operate economically without specialized afterburning turbofan engines.\nPremise 2: The Concorde is a supersonic passenger aircraft.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The Concorde operated with specialized afterburning turbofans.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The Concorde operated with specialized afterburning turbofans.\"."
  },
  {
    "premise": "[Scenario #35] Premise 1: All equilateral triangles have interior angles measuring exactly 60 degrees.\nPremise 2: Geometric Figure Alpha is an equilateral triangle.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.\"."
  },
  {
    "premise": "[Scenario #36] Premise 1: If a legal contract lacks mutual consideration between parties, it is unenforceable in contract court.\nPremise 2: The partnership agreement between Smith and Jones lacked mutual consideration.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The partnership agreement is unenforceable in contract court.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The partnership agreement is unenforceable in contract court.\"."
  },
  {
    "premise": "[Scenario #37] Premise 1: All high-throughput optic fiber links rely on total internal reflection inside silica glass cores.\nPremise 2: The transatlantic cable Apollo is a high-throughput optic fiber link.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.\"."
  },
  {
    "premise": "[Scenario #38] Premise 1: No organism lacking chloroplasts can perform oxygenic photosynthesis.\nPremise 2: The fungal mold Penicillium lacks chloroplasts.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Penicillium cannot perform oxygenic photosynthesis.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Penicillium cannot perform oxygenic photosynthesis.\"."
  },
  {
    "premise": "[Scenario #39] Premise 1: All constitutional amendments requiring ratification must secure affirmative votes from three-fourths of state legislatures.\nPremise 2: Proposal 14 requires ratification as a constitutional amendment.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.\"."
  },
  {
    "premise": "[Scenario #40] Premise 1: Whenever a vehicle enters a geostationary transfer orbit, its apogee matches geosynchronous altitude.\nPremise 2: Satellite Echo entered a geostationary transfer orbit.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Satellite Echo's apogee matches geosynchronous altitude.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Satellite Echo's apogee matches geosynchronous altitude.\"."
  },
  {
    "premise": "[Scenario #41] Premise 1: All licensed commercial aviators must pass annual cardiovascular screening.\nPremise 2: Captain Reynolds is a licensed commercial aviator.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Captain Reynolds must pass annual cardiovascular screening.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Captain Reynolds must pass annual cardiovascular screening.\"."
  },
  {
    "premise": "[Scenario #42] Premise 1: No deep-sea submersible without titanium hulls can withstand 10,000 meters of hydrostatic pressure.\nPremise 2: The exploration vessel Nereus-9 lacks a titanium hull.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.\"."
  },
  {
    "premise": "[Scenario #43] Premise 1: All registered trademarks granted federal protection are intellectual property assets.\nPremise 2: Project Zenith is a registered trademark granted federal protection.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Project Zenith is an intellectual property asset.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Project Zenith is an intellectual property asset.\"."
  },
  {
    "premise": "[Scenario #44] Premise 1: Whenever ambient temperature drops below minus forty degrees, diesel engine fuel lines freeze without preheaters.\nPremise 2: Generator Unit 4 has no fuel line preheaters and temperature reached minus forty-five degrees.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Generator Unit 4 fuel lines froze.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Generator Unit 4 fuel lines froze.\"."
  },
  {
    "premise": "[Scenario #45] Premise 1: All valid cryptographic hash functions must satisfy strict pre-image resistance.\nPremise 2: Algorithm SHA-512 is a valid cryptographic hash function.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.\"."
  },
  {
    "premise": "[Scenario #46] Premise 1: No non-renewable energy source generates zero carbon emissions during combustion.\nPremise 2: Bituminous coal is a non-renewable combustion fuel.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.\"."
  },
  {
    "premise": "[Scenario #47] Premise 1: All mammal species capable of true powered flight belong to the mammalian order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The fruit bat belongs to the mammalian order Chiroptera.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The fruit bat belongs to the mammalian order Chiroptera.\"."
  },
  {
    "premise": "[Scenario #48] Premise 1: If an enterprise database fails ACID concurrency compliance, it cannot guarantee zero transactional data loss.\nPremise 2: System Omega failed ACID concurrency compliance.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: System Omega cannot guarantee zero transactional data loss.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: System Omega cannot guarantee zero transactional data loss.\"."
  },
  {
    "premise": "[Scenario #49] Premise 1: All members of the World Trade Organization are bound by the most-favored-nation trading clause.\nPremise 2: Country Veridia is a member of the World Trade Organization.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Country Veridia is bound by the most-favored-nation trading clause.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Country Veridia is bound by the most-favored-nation trading clause.\"."
  },
  {
    "premise": "[Scenario #50] Premise 1: No semiconductor device manufactured on a 3-nanometer lithography node can operate without ultraviolet photolithography.\nPremise 2: Microchip Phoenix was manufactured on a 3-nanometer node.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Microchip Phoenix utilized ultraviolet photolithography.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Microchip Phoenix utilized ultraviolet photolithography.\"."
  },
  {
    "premise": "[Scenario #51] Premise 1: All corporate debt instruments rated AAA carry minimal credit default risk.\nPremise 2: Bond Series 2028 is rated AAA.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bond Series 2028 carries minimal credit default risk.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bond Series 2028 carries minimal credit default risk.\"."
  },
  {
    "premise": "[Scenario #52] Premise 1: Whenever an economy experiences stagflation, it exhibits simultaneous high unemployment and elevated inflation.\nPremise 2: Region B is undergoing stagflation.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.\"."
  },
  {
    "premise": "[Scenario #53] Premise 1: All enzymes that catalyze phosphorylation reactions are classified as protein kinases.\nPremise 2: Enzyme P-38 catalyzes phosphorylation reactions.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Enzyme P-38 is classified as a protein kinase.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Enzyme P-38 is classified as a protein kinase.\"."
  },
  {
    "premise": "[Scenario #54] Premise 1: No supersonic passenger aircraft can operate economically without specialized afterburning turbofan engines.\nPremise 2: The Concorde is a supersonic passenger aircraft.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The Concorde operated with specialized afterburning turbofans.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The Concorde operated with specialized afterburning turbofans.\"."
  },
  {
    "premise": "[Scenario #55] Premise 1: All equilateral triangles have interior angles measuring exactly 60 degrees.\nPremise 2: Geometric Figure Alpha is an equilateral triangle.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.\"."
  },
  {
    "premise": "[Scenario #56] Premise 1: If a legal contract lacks mutual consideration between parties, it is unenforceable in contract court.\nPremise 2: The partnership agreement between Smith and Jones lacked mutual consideration.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The partnership agreement is unenforceable in contract court.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The partnership agreement is unenforceable in contract court.\"."
  },
  {
    "premise": "[Scenario #57] Premise 1: All high-throughput optic fiber links rely on total internal reflection inside silica glass cores.\nPremise 2: The transatlantic cable Apollo is a high-throughput optic fiber link.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.\"."
  },
  {
    "premise": "[Scenario #58] Premise 1: No organism lacking chloroplasts can perform oxygenic photosynthesis.\nPremise 2: The fungal mold Penicillium lacks chloroplasts.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Penicillium cannot perform oxygenic photosynthesis.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Penicillium cannot perform oxygenic photosynthesis.\"."
  },
  {
    "premise": "[Scenario #59] Premise 1: All constitutional amendments requiring ratification must secure affirmative votes from three-fourths of state legislatures.\nPremise 2: Proposal 14 requires ratification as a constitutional amendment.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.\"."
  },
  {
    "premise": "[Scenario #60] Premise 1: Whenever a vehicle enters a geostationary transfer orbit, its apogee matches geosynchronous altitude.\nPremise 2: Satellite Echo entered a geostationary transfer orbit.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Satellite Echo's apogee matches geosynchronous altitude.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Satellite Echo's apogee matches geosynchronous altitude.\"."
  },
  {
    "premise": "[Scenario #61] Premise 1: All licensed commercial aviators must pass annual cardiovascular screening.\nPremise 2: Captain Reynolds is a licensed commercial aviator.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Captain Reynolds must pass annual cardiovascular screening.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Captain Reynolds must pass annual cardiovascular screening.\"."
  },
  {
    "premise": "[Scenario #62] Premise 1: No deep-sea submersible without titanium hulls can withstand 10,000 meters of hydrostatic pressure.\nPremise 2: The exploration vessel Nereus-9 lacks a titanium hull.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.\"."
  },
  {
    "premise": "[Scenario #63] Premise 1: All registered trademarks granted federal protection are intellectual property assets.\nPremise 2: Project Zenith is a registered trademark granted federal protection.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Project Zenith is an intellectual property asset.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Project Zenith is an intellectual property asset.\"."
  },
  {
    "premise": "[Scenario #64] Premise 1: Whenever ambient temperature drops below minus forty degrees, diesel engine fuel lines freeze without preheaters.\nPremise 2: Generator Unit 4 has no fuel line preheaters and temperature reached minus forty-five degrees.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Generator Unit 4 fuel lines froze.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Generator Unit 4 fuel lines froze.\"."
  },
  {
    "premise": "[Scenario #65] Premise 1: All valid cryptographic hash functions must satisfy strict pre-image resistance.\nPremise 2: Algorithm SHA-512 is a valid cryptographic hash function.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.\"."
  },
  {
    "premise": "[Scenario #66] Premise 1: No non-renewable energy source generates zero carbon emissions during combustion.\nPremise 2: Bituminous coal is a non-renewable combustion fuel.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.\"."
  },
  {
    "premise": "[Scenario #67] Premise 1: All mammal species capable of true powered flight belong to the mammalian order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The fruit bat belongs to the mammalian order Chiroptera.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The fruit bat belongs to the mammalian order Chiroptera.\"."
  },
  {
    "premise": "[Scenario #68] Premise 1: If an enterprise database fails ACID concurrency compliance, it cannot guarantee zero transactional data loss.\nPremise 2: System Omega failed ACID concurrency compliance.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: System Omega cannot guarantee zero transactional data loss.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: System Omega cannot guarantee zero transactional data loss.\"."
  },
  {
    "premise": "[Scenario #69] Premise 1: All members of the World Trade Organization are bound by the most-favored-nation trading clause.\nPremise 2: Country Veridia is a member of the World Trade Organization.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Country Veridia is bound by the most-favored-nation trading clause.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Country Veridia is bound by the most-favored-nation trading clause.\"."
  },
  {
    "premise": "[Scenario #70] Premise 1: No semiconductor device manufactured on a 3-nanometer lithography node can operate without ultraviolet photolithography.\nPremise 2: Microchip Phoenix was manufactured on a 3-nanometer node.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Microchip Phoenix utilized ultraviolet photolithography.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Microchip Phoenix utilized ultraviolet photolithography.\"."
  },
  {
    "premise": "[Scenario #71] Premise 1: All corporate debt instruments rated AAA carry minimal credit default risk.\nPremise 2: Bond Series 2028 is rated AAA.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bond Series 2028 carries minimal credit default risk.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bond Series 2028 carries minimal credit default risk.\"."
  },
  {
    "premise": "[Scenario #72] Premise 1: Whenever an economy experiences stagflation, it exhibits simultaneous high unemployment and elevated inflation.\nPremise 2: Region B is undergoing stagflation.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.\"."
  },
  {
    "premise": "[Scenario #73] Premise 1: All enzymes that catalyze phosphorylation reactions are classified as protein kinases.\nPremise 2: Enzyme P-38 catalyzes phosphorylation reactions.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Enzyme P-38 is classified as a protein kinase.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Enzyme P-38 is classified as a protein kinase.\"."
  },
  {
    "premise": "[Scenario #74] Premise 1: No supersonic passenger aircraft can operate economically without specialized afterburning turbofan engines.\nPremise 2: The Concorde is a supersonic passenger aircraft.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The Concorde operated with specialized afterburning turbofans.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The Concorde operated with specialized afterburning turbofans.\"."
  },
  {
    "premise": "[Scenario #75] Premise 1: All equilateral triangles have interior angles measuring exactly 60 degrees.\nPremise 2: Geometric Figure Alpha is an equilateral triangle.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.\"."
  },
  {
    "premise": "[Scenario #76] Premise 1: If a legal contract lacks mutual consideration between parties, it is unenforceable in contract court.\nPremise 2: The partnership agreement between Smith and Jones lacked mutual consideration.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The partnership agreement is unenforceable in contract court.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The partnership agreement is unenforceable in contract court.\"."
  },
  {
    "premise": "[Scenario #77] Premise 1: All high-throughput optic fiber links rely on total internal reflection inside silica glass cores.\nPremise 2: The transatlantic cable Apollo is a high-throughput optic fiber link.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.\"."
  },
  {
    "premise": "[Scenario #78] Premise 1: No organism lacking chloroplasts can perform oxygenic photosynthesis.\nPremise 2: The fungal mold Penicillium lacks chloroplasts.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Penicillium cannot perform oxygenic photosynthesis.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Penicillium cannot perform oxygenic photosynthesis.\"."
  },
  {
    "premise": "[Scenario #79] Premise 1: All constitutional amendments requiring ratification must secure affirmative votes from three-fourths of state legislatures.\nPremise 2: Proposal 14 requires ratification as a constitutional amendment.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.\"."
  },
  {
    "premise": "[Scenario #80] Premise 1: Whenever a vehicle enters a geostationary transfer orbit, its apogee matches geosynchronous altitude.\nPremise 2: Satellite Echo entered a geostationary transfer orbit.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Satellite Echo's apogee matches geosynchronous altitude.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Satellite Echo's apogee matches geosynchronous altitude.\"."
  },
  {
    "premise": "[Scenario #81] Premise 1: All licensed commercial aviators must pass annual cardiovascular screening.\nPremise 2: Captain Reynolds is a licensed commercial aviator.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Captain Reynolds must pass annual cardiovascular screening.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Captain Reynolds must pass annual cardiovascular screening.\"."
  },
  {
    "premise": "[Scenario #82] Premise 1: No deep-sea submersible without titanium hulls can withstand 10,000 meters of hydrostatic pressure.\nPremise 2: The exploration vessel Nereus-9 lacks a titanium hull.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.\"."
  },
  {
    "premise": "[Scenario #83] Premise 1: All registered trademarks granted federal protection are intellectual property assets.\nPremise 2: Project Zenith is a registered trademark granted federal protection.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Project Zenith is an intellectual property asset.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Project Zenith is an intellectual property asset.\"."
  },
  {
    "premise": "[Scenario #84] Premise 1: Whenever ambient temperature drops below minus forty degrees, diesel engine fuel lines freeze without preheaters.\nPremise 2: Generator Unit 4 has no fuel line preheaters and temperature reached minus forty-five degrees.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Generator Unit 4 fuel lines froze.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Generator Unit 4 fuel lines froze.\"."
  },
  {
    "premise": "[Scenario #85] Premise 1: All valid cryptographic hash functions must satisfy strict pre-image resistance.\nPremise 2: Algorithm SHA-512 is a valid cryptographic hash function.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.\"."
  },
  {
    "premise": "[Scenario #86] Premise 1: No non-renewable energy source generates zero carbon emissions during combustion.\nPremise 2: Bituminous coal is a non-renewable combustion fuel.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.\"."
  },
  {
    "premise": "[Scenario #87] Premise 1: All mammal species capable of true powered flight belong to the mammalian order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The fruit bat belongs to the mammalian order Chiroptera.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The fruit bat belongs to the mammalian order Chiroptera.\"."
  },
  {
    "premise": "[Scenario #88] Premise 1: If an enterprise database fails ACID concurrency compliance, it cannot guarantee zero transactional data loss.\nPremise 2: System Omega failed ACID concurrency compliance.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: System Omega cannot guarantee zero transactional data loss.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: System Omega cannot guarantee zero transactional data loss.\"."
  },
  {
    "premise": "[Scenario #89] Premise 1: All members of the World Trade Organization are bound by the most-favored-nation trading clause.\nPremise 2: Country Veridia is a member of the World Trade Organization.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Country Veridia is bound by the most-favored-nation trading clause.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Country Veridia is bound by the most-favored-nation trading clause.\"."
  },
  {
    "premise": "[Scenario #90] Premise 1: No semiconductor device manufactured on a 3-nanometer lithography node can operate without ultraviolet photolithography.\nPremise 2: Microchip Phoenix was manufactured on a 3-nanometer node.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Microchip Phoenix utilized ultraviolet photolithography.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Microchip Phoenix utilized ultraviolet photolithography.\"."
  },
  {
    "premise": "[Scenario #91] Premise 1: All corporate debt instruments rated AAA carry minimal credit default risk.\nPremise 2: Bond Series 2028 is rated AAA.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bond Series 2028 carries minimal credit default risk.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bond Series 2028 carries minimal credit default risk.\"."
  },
  {
    "premise": "[Scenario #92] Premise 1: Whenever an economy experiences stagflation, it exhibits simultaneous high unemployment and elevated inflation.\nPremise 2: Region B is undergoing stagflation.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.\"."
  },
  {
    "premise": "[Scenario #93] Premise 1: All enzymes that catalyze phosphorylation reactions are classified as protein kinases.\nPremise 2: Enzyme P-38 catalyzes phosphorylation reactions.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Enzyme P-38 is classified as a protein kinase.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Enzyme P-38 is classified as a protein kinase.\"."
  },
  {
    "premise": "[Scenario #94] Premise 1: No supersonic passenger aircraft can operate economically without specialized afterburning turbofan engines.\nPremise 2: The Concorde is a supersonic passenger aircraft.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The Concorde operated with specialized afterburning turbofans.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The Concorde operated with specialized afterburning turbofans.\"."
  },
  {
    "premise": "[Scenario #95] Premise 1: All equilateral triangles have interior angles measuring exactly 60 degrees.\nPremise 2: Geometric Figure Alpha is an equilateral triangle.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.\"."
  },
  {
    "premise": "[Scenario #96] Premise 1: If a legal contract lacks mutual consideration between parties, it is unenforceable in contract court.\nPremise 2: The partnership agreement between Smith and Jones lacked mutual consideration.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The partnership agreement is unenforceable in contract court.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The partnership agreement is unenforceable in contract court.\"."
  },
  {
    "premise": "[Scenario #97] Premise 1: All high-throughput optic fiber links rely on total internal reflection inside silica glass cores.\nPremise 2: The transatlantic cable Apollo is a high-throughput optic fiber link.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.\"."
  },
  {
    "premise": "[Scenario #98] Premise 1: No organism lacking chloroplasts can perform oxygenic photosynthesis.\nPremise 2: The fungal mold Penicillium lacks chloroplasts.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Penicillium cannot perform oxygenic photosynthesis.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Penicillium cannot perform oxygenic photosynthesis.\"."
  },
  {
    "premise": "[Scenario #99] Premise 1: All constitutional amendments requiring ratification must secure affirmative votes from three-fourths of state legislatures.\nPremise 2: Proposal 14 requires ratification as a constitutional amendment.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.\"."
  },
  {
    "premise": "[Scenario #100] Premise 1: Whenever a vehicle enters a geostationary transfer orbit, its apogee matches geosynchronous altitude.\nPremise 2: Satellite Echo entered a geostationary transfer orbit.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Satellite Echo's apogee matches geosynchronous altitude.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Satellite Echo's apogee matches geosynchronous altitude.\"."
  },
  {
    "premise": "[Scenario #101] Premise 1: All licensed commercial aviators must pass annual cardiovascular screening.\nPremise 2: Captain Reynolds is a licensed commercial aviator.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Captain Reynolds must pass annual cardiovascular screening.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Captain Reynolds must pass annual cardiovascular screening.\"."
  },
  {
    "premise": "[Scenario #102] Premise 1: No deep-sea submersible without titanium hulls can withstand 10,000 meters of hydrostatic pressure.\nPremise 2: The exploration vessel Nereus-9 lacks a titanium hull.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure.\"."
  },
  {
    "premise": "[Scenario #103] Premise 1: All registered trademarks granted federal protection are intellectual property assets.\nPremise 2: Project Zenith is a registered trademark granted federal protection.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Project Zenith is an intellectual property asset.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Project Zenith is an intellectual property asset.\"."
  },
  {
    "premise": "[Scenario #104] Premise 1: Whenever ambient temperature drops below minus forty degrees, diesel engine fuel lines freeze without preheaters.\nPremise 2: Generator Unit 4 has no fuel line preheaters and temperature reached minus forty-five degrees.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Generator Unit 4 fuel lines froze.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Generator Unit 4 fuel lines froze.\"."
  },
  {
    "premise": "[Scenario #105] Premise 1: All valid cryptographic hash functions must satisfy strict pre-image resistance.\nPremise 2: Algorithm SHA-512 is a valid cryptographic hash function.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Algorithm SHA-512 satisfies strict pre-image resistance.\"."
  },
  {
    "premise": "[Scenario #106] Premise 1: No non-renewable energy source generates zero carbon emissions during combustion.\nPremise 2: Bituminous coal is a non-renewable combustion fuel.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bituminous coal does not generate zero carbon emissions during combustion.\"."
  },
  {
    "premise": "[Scenario #107] Premise 1: All mammal species capable of true powered flight belong to the mammalian order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The fruit bat belongs to the mammalian order Chiroptera.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The fruit bat belongs to the mammalian order Chiroptera.\"."
  },
  {
    "premise": "[Scenario #108] Premise 1: If an enterprise database fails ACID concurrency compliance, it cannot guarantee zero transactional data loss.\nPremise 2: System Omega failed ACID concurrency compliance.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: System Omega cannot guarantee zero transactional data loss.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: System Omega cannot guarantee zero transactional data loss.\"."
  },
  {
    "premise": "[Scenario #109] Premise 1: All members of the World Trade Organization are bound by the most-favored-nation trading clause.\nPremise 2: Country Veridia is a member of the World Trade Organization.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Country Veridia is bound by the most-favored-nation trading clause.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Country Veridia is bound by the most-favored-nation trading clause.\"."
  },
  {
    "premise": "[Scenario #110] Premise 1: No semiconductor device manufactured on a 3-nanometer lithography node can operate without ultraviolet photolithography.\nPremise 2: Microchip Phoenix was manufactured on a 3-nanometer node.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Microchip Phoenix utilized ultraviolet photolithography.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Microchip Phoenix utilized ultraviolet photolithography.\"."
  },
  {
    "premise": "[Scenario #111] Premise 1: All corporate debt instruments rated AAA carry minimal credit default risk.\nPremise 2: Bond Series 2028 is rated AAA.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Bond Series 2028 carries minimal credit default risk.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Bond Series 2028 carries minimal credit default risk.\"."
  },
  {
    "premise": "[Scenario #112] Premise 1: Whenever an economy experiences stagflation, it exhibits simultaneous high unemployment and elevated inflation.\nPremise 2: Region B is undergoing stagflation.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Region B exhibits simultaneous high unemployment and elevated inflation.\"."
  },
  {
    "premise": "[Scenario #113] Premise 1: All enzymes that catalyze phosphorylation reactions are classified as protein kinases.\nPremise 2: Enzyme P-38 catalyzes phosphorylation reactions.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Enzyme P-38 is classified as a protein kinase.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Enzyme P-38 is classified as a protein kinase.\"."
  },
  {
    "premise": "[Scenario #114] Premise 1: No supersonic passenger aircraft can operate economically without specialized afterburning turbofan engines.\nPremise 2: The Concorde is a supersonic passenger aircraft.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The Concorde operated with specialized afterburning turbofans.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The Concorde operated with specialized afterburning turbofans.\"."
  },
  {
    "premise": "[Scenario #115] Premise 1: All equilateral triangles have interior angles measuring exactly 60 degrees.\nPremise 2: Geometric Figure Alpha is an equilateral triangle.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Geometric Figure Alpha has interior angles measuring exactly 60 degrees.\"."
  },
  {
    "premise": "[Scenario #116] Premise 1: If a legal contract lacks mutual consideration between parties, it is unenforceable in contract court.\nPremise 2: The partnership agreement between Smith and Jones lacked mutual consideration.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The partnership agreement is unenforceable in contract court.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The partnership agreement is unenforceable in contract court.\"."
  },
  {
    "premise": "[Scenario #117] Premise 1: All high-throughput optic fiber links rely on total internal reflection inside silica glass cores.\nPremise 2: The transatlantic cable Apollo is a high-throughput optic fiber link.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: The transatlantic cable Apollo relies on total internal reflection inside silica glass cores.\"."
  },
  {
    "premise": "[Scenario #118] Premise 1: No organism lacking chloroplasts can perform oxygenic photosynthesis.\nPremise 2: The fungal mold Penicillium lacks chloroplasts.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Penicillium cannot perform oxygenic photosynthesis.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Penicillium cannot perform oxygenic photosynthesis.\"."
  },
  {
    "premise": "[Scenario #119] Premise 1: All constitutional amendments requiring ratification must secure affirmative votes from three-fourths of state legislatures.\nPremise 2: Proposal 14 requires ratification as a constitutional amendment.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Proposal 14 must secure affirmative votes from three-fourths of state legislatures.\"."
  },
  {
    "premise": "[Scenario #120] Premise 1: Whenever a vehicle enters a geostationary transfer orbit, its apogee matches geosynchronous altitude.\nPremise 2: Satellite Echo entered a geostationary transfer orbit.\nWhich conclusion follows with absolute logical necessity?",
    "correct": "Conclusion: Satellite Echo's apogee matches geosynchronous altitude.",
    "distractors": [
      "No definitive deduction is logically warranted from the premises.",
      "The opposite of the stated conclusion must necessarily be valid.",
      "Only a probabilistic likelihood exists, with no deductive certainty.",
      "Premise 1 contradicts Premise 2."
    ],
    "expl": "By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: \"Conclusion: Satellite Echo's apogee matches geosynchronous altitude.\"."
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
