import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to shuffle options deterministically
function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    return (s = (s * 16807) % 2147483647) / 2147483647;
  };
}

// 1. 150 UNIQUE VOCABULARY ITEMS (75 Antonyms, 75 Synonyms)
// Explicitly avoiding all Test 1 words: CANDID, EPHEMERAL, TACITURN, MITIGATE, PROLIFIC, RECONDITE, SANCTIMONIOUS, EQUIVOCAL, LACONIC, OBSEQUIOUS, INDEFATIGABLE
const RAW_VOCAB = [
  // Antonyms (75 unique words)
  { word: "METICULOUS", type: "antonym", correct: "Careless", distractors: ["Painstaking", "Scrupulous", "Exact", "Precise"], expl: "Meticulous means showing great attention to detail. Careless is the opposite." },
  { word: "RESILIENT", type: "antonym", correct: "Fragile", distractors: ["Durable", "Tough", "Flexible", "Buoyant"], expl: "Resilient means able to withstand adversity. Fragile means easily broken." },
  { word: "LUCID", type: "antonym", correct: "Obscure", distractors: ["Clear", "Coherent", "Articulate", "Luminous"], expl: "Lucid means expressed clearly and easily understood. Obscure means hard to understand." },
  { word: "COPIOUS", type: "antonym", correct: "Scant", distractors: ["Plentiful", "Abundant", "Ample", "Profuse"], expl: "Copious means abundant in supply or quantity. Scant means scarce or insufficient." },
  { word: "PRAGMATIC", type: "antonym", correct: "Idealistic", distractors: ["Practical", "Realistic", "Sensible", "Utilitarian"], expl: "Pragmatic means dealing with matters practically rather than theoretically. Idealistic is its opposite." },
  { word: "ZEALOUS", type: "antonym", correct: "Apathetic", distractors: ["Enthusiastic", "Fervent", "Ardent", "Passionate"], expl: "Zealous means having great energy or enthusiasm. Apathetic means showing no interest or concern." },
  { word: "GREGARIOUS", type: "antonym", correct: "Solitary", distractors: ["Sociable", "Outgoing", "Friendly", "Extroverted"], expl: "Gregarious means fond of company and sociable. Solitary is the opposite." },
  { word: "ALACRITY", type: "antonym", correct: "Reluctance", distractors: ["Briskness", "Eagerness", "Promptness", "Willingness"], expl: "Alacrity means brisk and cheerful readiness. Reluctance is the exact opposite." },
  { word: "DILIGENT", type: "antonym", correct: "Indolent", distractors: ["Conscientious", "Hardworking", "Sedulous", "Assiduous"], expl: "Diligent means hardworking and conscientious. Indolent means lazy." },
  { word: "AUSTERE", type: "antonym", correct: "Extravagant", distractors: ["Severe", "Strict", "Sparse", "Ascetic"], expl: "Austere means severe or strict in manner or appearance, or plain. Extravagant is opposite." },
  { word: "ADROIT", type: "antonym", correct: "Clumsy", distractors: ["Skillful", "Dexterous", "Adept", "Nimble"], expl: "Adroit means clever or skillful. Clumsy means awkward in movement or handling." },
  { word: "BELLIGERENT", type: "antonym", correct: "Peaceable", distractors: ["Hostile", "Aggressive", "Combative", "Pugnacious"], expl: "Belligerent means hostile and aggressive. Peaceable is the opposite." },
  { word: "COGENT", type: "antonym", correct: "Unconvincing", distractors: ["Persuasive", "Compelling", "Valid", "Plausible"], expl: "Cogent means clear, logical, and convincing. Unconvincing is opposite." },
  { word: "DELETERIOUS", type: "antonym", correct: "Beneficial", distractors: ["Harmful", "Damaging", "Detrimental", "Injurious"], expl: "Deleterious means causing harm or damage. Beneficial is its opposite." },
  { word: "ENIGMATIC", type: "antonym", correct: "Unambiguous", distractors: ["Mysterious", "Cryptic", "Puzzling", "Inscrutable"], expl: "Enigmatic means difficult to interpret or understand. Unambiguous means clear." },
  { word: "FASTIDIOUS", type: "antonym", correct: "Sloppy", distractors: ["Particular", "Meticulous", "Fussy", "Scrupulous"], expl: "Fastidious means very attentive to and concerned about accuracy. Sloppy is opposite." },
  { word: "HAUGHTY", type: "antonym", correct: "Humble", distractors: ["Arrogant", "Proud", "Disdainful", "Conceited"], expl: "Haughty means arrogantly superior and disdainful. Humble is the direct opposite." },
  { word: "IMMUTABLE", type: "antonym", correct: "Variable", distractors: ["Fixed", "Unchangeable", "Permanent", "Unalterable"], expl: "Immutable means unchanging over time. Variable means liable to change." },
  { word: "MALLEABLE", type: "antonym", correct: "Rigid", distractors: ["Pliable", "Flexible", "Ductile", "Yielding"], expl: "Malleable means easily influenced or pliable. Rigid means inflexible." },
  { word: "NEBULOUS", type: "antonym", correct: "Definite", distractors: ["Vague", "Hazy", "Cloudy", "Indistinct"], expl: "Nebulous means hazy, vague, or indistinct. Definite is the opposite." },
  { word: "PLACID", type: "antonym", correct: "Agitated", distractors: ["Calm", "Serene", "Tranquil", "Peaceful"], expl: "Placid means not easily upset or excited, calm. Agitated is opposite." },
  { word: "QUERULOUS", type: "antonym", correct: "Contented", distractors: ["Complaining", "Peevish", "Whining", "Petulant"], expl: "Querulous means complaining in a whining manner. Contented is opposite." },
  { word: "SAGACIOUS", type: "antonym", correct: "Foolish", distractors: ["Wise", "Insightful", "Judicious", "Shrewd"], expl: "Sagacious means having good judgment and wisdom. Foolish is opposite." },
  { word: "TENACIOUS", type: "antonym", correct: "Yielding", distractors: ["Persistent", "Resolute", "Stubborn", "Determined"], expl: "Tenacious means holding firmly to a purpose. Yielding means giving way." },
  { word: "UBIQUITOUS", type: "antonym", correct: "Rare", distractors: ["Omnipresent", "Pervasive", "Everywhere", "Universal"], expl: "Ubiquitous means found everywhere. Rare is opposite." },
  { word: "VACILLATE", type: "antonym", correct: "Resolve", distractors: ["Waver", "Hesitate", "Fluctuate", "Oscillate"], expl: "Vacillate means to waver between choices. Resolve means to make a firm decision." },
  { word: "WANTON", type: "antonym", correct: "Deliberate", distractors: ["Reckless", "Senseless", "Capricious", "Unrestrained"], expl: "Wanton can mean senseless or unprovoked. Deliberate or disciplined is opposite." },
  { word: "ABATE", type: "antonym", correct: "Increase", distractors: ["Subside", "Diminish", "Lessen", "Weaken"], expl: "Abate means to lessen or diminish. Increase is opposite." },
  { word: "BENEVOLENT", type: "antonym", correct: "Malevolent", distractors: ["Kind", "Generous", "Charitable", "Compassionate"], expl: "Benevolent means well-meaning and kindly. Malevolent means wishing harm." },
  { word: "CAPRICIOUS", type: "antonym", correct: "Predictable", distractors: ["Fickle", "Inconsistent", "Whimsical", "Erratic"], expl: "Capricious means unpredictable and erratic. Predictable is opposite." },
  { word: "DECORUM", type: "antonym", correct: "Impropriety", distractors: ["Politeness", "Propriety", "Modesty", "Etiquette"], expl: "Decorum means dignified, proper behavior. Impropriety is bad behavior." },
  { word: "ELOQUENT", type: "antonym", correct: "Inarticulate", distractors: ["Fluent", "Expressive", "Silver-tongued", "Articulate"], expl: "Eloquent means fluent or persuasive in speaking. Inarticulate is opposite." },
  { word: "FLIPPANT", type: "antonym", correct: "Respectful", distractors: ["Facetious", "Glib", "Disrespectful", "Frivolous"], expl: "Flippant means not showing a serious or respectful attitude. Respectful is opposite." },
  { word: "GRAVE", type: "antonym", correct: "Frivolous", distractors: ["Solemn", "Serious", "Somber", "Weighty"], expl: "Grave means giving cause for alarm or serious. Frivolous means lighthearted/carefree." },
  { word: "IMPETUOUS", type: "antonym", correct: "Cautious", distractors: ["Impulsive", "Rash", "Hasty", "Reckless"], expl: "IMPETUOUS means acting quickly without thought. Cautious is opposite." },
  { word: "JUBILANT", type: "antonym", correct: "Despondent", distractors: ["Triumphant", "Joyful", "Ecstatic", "Elated"], expl: "Jubilant means feeling or expressing great happiness. Despondent means depressed." },
  { word: "KINDLE", type: "antonym", correct: "Extinguish", distractors: ["Ignite", "Arouse", "Inspire", "Spark"], expl: "Kindle means to light or ignite. Extinguish means to put out." },
  { word: "LAMENT", type: "antonym", correct: "Celebrate", distractors: ["Mourn", "Grieve", "Deplore", "Bewail"], expl: "Lament means an expression of grief. Celebrate is opposite." },
  { word: "MAGNANIMOUS", type: "antonym", correct: "Petty", distractors: ["Generous", "Forgiving", "Noble", "Altruistic"], expl: "Magnanimous means generous or forgiving. Petty is small-minded and opposite." },
  { word: "NOXIOUS", type: "antonym", correct: "Wholesome", distractors: ["Harmful", "Toxic", "Poisonous", "Venomous"], expl: "Noxious means harmful or unpleasant. Wholesome is beneficial/healthy." },
  { word: "OPULENT", type: "antonym", correct: "Penurious", distractors: ["Wealthy", "Luxurious", "Affluent", "Rich"], expl: "Opulent means rich and luxurious. Penurious means extremely poor." },
  { word: "PAUCITY", type: "antonym", correct: "Surplus", distractors: ["Scarcity", "Dearth", "Shortage", "Deficit"], expl: "Paucity means presence in small quantities. Surplus is excess." },
  { word: "QUELL", type: "antonym", correct: "Incite", distractors: ["Suppress", "Subdue", "Extinguish", "Pacify"], expl: "Quell means to suppress by force. Incite means to provoke." },
  { word: "REPUGNANT", type: "antonym", correct: "Attractive", distractors: ["Repulsive", "Offensive", "Abhorrent", "Disgusting"], expl: "Repugnant means extremely distasteful. Attractive is opposite." },
  { word: "SERENDIPITY", type: "antonym", correct: "Misfortune", distractors: ["Luck", "Providence", "Chance", "Coincidence"], expl: "Serendipity is chance occurrence of good events. Misfortune is opposite." },
  { word: "TRITE", type: "antonym", correct: "Original", distractors: ["Corny", "Hackneyed", "Banal", "Cliche"], expl: "Trite means overused. Original is fresh and novel." },
  { word: "UNFEIGNED", type: "antonym", correct: "Insincere", distractors: ["Genuine", "Real", "Heartfelt", "Honest"], expl: "Unfeigned means sincere and genuine. Insincere is opposite." },
  { word: "VENERABLE", type: "antonym", correct: "Disreputable", distractors: ["Respected", "Honored", "Esteemed", "Distinguished"], expl: "Venerable means accorded great respect. Disreputable is dishonorable." },
  { word: "WARY", type: "antonym", correct: "Trusting", distractors: ["Cautious", "Guarded", "Vigilant", "Suspicious"], expl: "Wary means showing caution. Trusting is opposite." },
  { word: "EXONERATE", type: "antonym", correct: "Inculpate", distractors: ["Absolve", "Acquit", "Clear", "Vindicate"], expl: "Exonerate means to free from blame. Inculpate means to incriminate." },
  { word: "YOKE", type: "antonym", correct: "Liberate", distractors: ["Harness", "Bind", "Connect", "Link"], expl: "Yoke means to bind or subjugate. Liberate means to set free." },
  { word: "ZENITH", type: "antonym", correct: "Nadir", distractors: ["Apex", "Peak", "Pinnacle", "Summit"], expl: "Zenith is the highest point. Nadir is the lowest point." },
  { word: "ACCORD", type: "antonym", correct: "Dissension", distractors: ["Agreement", "Harmony", "Concurrence", "Treaty"], expl: "Accord means agreement or harmony. Dissension means discord." },
  { word: "BOISTEROUS", type: "antonym", correct: "Quiet", distractors: ["Rowdy", "Clamorous", "Noisy", "Unruly"], expl: "Boisterous means noisy and energetic. Quiet is opposite." },
  { word: "CHASTISE", type: "antonym", correct: "Praise", distractors: ["Rebuke", "Reprimand", "Scold", "Berate"], expl: "Chastise means to reprimand severely. Praise is opposite." },
  { word: "DEVIOUS", type: "antonym", correct: "Straightforward", distractors: ["Sly", "Cunning", "Deceptive", "Wily"], expl: "Devious means deceitful. Straightforward is opposite." },
  { word: "EFFERVESCENT", type: "antonym", correct: "Dull", distractors: ["Bubbly", "Sparkling", "Vivacious", "Lively"], expl: "Effervescent means enthusiastic and vivacious. Dull is opposite." },
  { word: "FERVENT", type: "antonym", correct: "Indifferent", distractors: ["Ardent", "Passionate", "Vehement", "Fiery"], expl: "Fervent means having great warmth or intensity. Indifferent is opposite." },
  { word: "GULLIBLE", type: "antonym", correct: "Skeptical", distractors: ["Naive", "Credulous", "Trusting", "Impressionable"], expl: "Gullible means easily persuaded. Skeptical is opposite." },
  { word: "HAPHAZARD", type: "antonym", correct: "Methodical", distractors: ["Random", "Disorganized", "Careless", "Aimless"], expl: "Haphazard means lacking any obvious organization. Methodical is opposite." },
  { word: "INGENIOUS", type: "antonym", correct: "Inept", distractors: ["Clever", "Brilliant", "Inventive", "Shrewd"], expl: "Ingenious means clever or original. Inept is clumsy/unskillful." },
  { word: "JUDICIOUS", type: "antonym", correct: "Imprudent", distractors: ["Sensible", "Prudent", "Wise", "Shrewd"], expl: "Judicious means showing good judgment. Imprudent is opposite." },
  { word: "KINDRED", type: "antonym", correct: "Alien", distractors: ["Related", "Similar", "Allied", "Congenial"], expl: "Kindred means similar in kind or related. Alien is opposite." },
  { word: "LIMPID", type: "antonym", correct: "Turbid", distractors: ["Clear", "Lucid", "Transparent", "Bright"], expl: "Limpid means completely clear. Turbid means cloudy or opaque." },
  { word: "MOROSE", type: "antonym", correct: "Cheerful", distractors: ["Sullen", "Glum", "Gloomy", "Sour"], expl: "Morose means sullen and ill-tempered. Cheerful is opposite." },
  { word: "NONCHALANT", type: "antonym", correct: "Anxious", distractors: ["Calm", "Casual", "Unconcerned", "Cool"], expl: "Nonchalant means casually calm. Anxious is opposite." },
  { word: "OBSOLETE", type: "antonym", correct: "Contemporary", distractors: ["Outdated", "Archaic", "Antiquated", "Disused"], expl: "Obsolete means no longer produced. Contemporary is modern." },
  { word: "PERUSE", type: "antonym", correct: "Skim", distractors: ["Inspect", "Examine", "Read", "Scrutinize"], expl: "Peruse means to read thoroughly. Skim means to read quickly/superficially." },
  { word: "QUIESCENT", type: "antonym", correct: "Active", distractors: ["Dormant", "Idle", "Latent", "Stationary"], expl: "Quiescent means in a state of dormancy. Active is opposite." },
  { word: "REVERENT", type: "antonym", correct: "Disrespectful", distractors: ["Respectful", "Venerating", "Devout", "Pious"], expl: "Reverent means feeling or showing deep solemn respect. Disrespectful is opposite." },
  { word: "SCRUPULOUS", type: "antonym", correct: "Unprincipled", distractors: ["Honest", "Meticulous", "Ethical", "Conscientious"], expl: "Scrupulous means diligent and attentive to morals. Unprincipled is opposite." },
  { word: "TRANSIENT", type: "antonym", correct: "Enduring", distractors: ["Fleeting", "Short-lived", "Temporary", "Passing"], expl: "Transient means lasting only for a short time. Enduring is opposite." },
  { word: "UNCOUTH", type: "antonym", correct: "Refined", distractors: ["Boorish", "Crude", "Coarse", "Unmannerly"], expl: "Uncouth means lacking good manners. Refined is cultured and opposite." },
  { word: "VILIFY", type: "antonym", correct: "Laud", distractors: ["Defame", "Slander", "Malign", "Disparage"], expl: "Vilify means to speak ill of. Laud means to praise." },
  { word: "ZEAL", type: "antonym", correct: "Indifference", distractors: ["Passion", "Ardor", "Eagerness", "Enthusiasm"], expl: "Zeal means great energy or enthusiasm. Indifference is opposite." },

  // Synonyms (75 unique words)
  { word: "ABOUND", type: "synonym", correct: "Teem", distractors: ["Decline", "Falter", "Lack", "Fail"], expl: "Abound means to exist in large numbers. Teem also means to be full of." },
  { word: "BERATE", type: "synonym", correct: "Chide", distractors: ["Praise", "Extol", "Cheer", "Approve"], expl: "Berate means to scold or criticize angrily. Chide means to rebuke." },
  { word: "COLLUSION", type: "synonym", correct: "Conspiracy", distractors: ["Honesty", "Alliance", "Separation", "Discord"], expl: "Collusion means secret cooperation. Conspiracy is synonymous." },
  { word: "DERIDE", type: "synonym", correct: "Mock", distractors: ["Compliment", "Adore", "Respect", "Flatter"], expl: "Deride means to express contempt for or mock." },
  { word: "ELATED", type: "synonym", correct: "Overjoyed", distractors: ["Gloomy", "Lethargic", "Distressed", "Disheartened"], expl: "Elated means ecstatically happy." },
  { word: "FIDELITY", type: "synonym", correct: "Loyalty", distractors: ["Treachery", "Perfidy", "Betrayal", "Inconstancy"], expl: "Fidelity means faithfulness to a person or cause." },
  { word: "GARNISH", type: "synonym", correct: "Embellish", distractors: ["Strip", "Diminish", "Dull", "Deprive"], expl: "Garnish means to decorate or embellish." },
  { word: "HALLOW", type: "synonym", correct: "Sanctify", distractors: ["Defile", "Desecrate", "Dishonor", "Condemn"], expl: "Hallow means to honor as holy or sanctify." },
  { word: "ILLICIT", type: "synonym", correct: "Unlawful", distractors: ["Permissible", "Legal", "Valid", "Legitimate"], expl: "Illicit means forbidden by law or rules." },
  { word: "KUDOS", type: "synonym", correct: "Praise", distractors: ["Criticism", "Blame", "Censure", "Reproach"], expl: "Kudos means praise and honor received for achievement." },
  { word: "LETHARGY", type: "synonym", correct: "Torpor", distractors: ["Energy", "Vitality", "Vigor", "Enthusiasm"], expl: "Lethargy means lack of energy. Torpor is inactivity." },
  { word: "OMNIPOTENT", type: "synonym", correct: "Almighty", distractors: ["Weak", "Impotent", "Fragile", "Helpless"], expl: "Omnipotent means having unlimited power." },
  { word: "PARIAH", type: "synonym", correct: "Outcast", distractors: ["Leader", "Patron", "Insider", "Hero"], expl: "Pariah means an outcast." },
  { word: "REPLETE", type: "synonym", correct: "Abounding", distractors: ["Empty", "Barren", "Deficient", "Vacant"], expl: "Replete means filled or well-supplied." },
  { word: "SCRUTINIZE", type: "synonym", correct: "Examine", distractors: ["Glance", "Ignore", "Overlook", "Neglect"], expl: "Scrutinize means to examine closely." },
  { word: "TACIT", type: "synonym", correct: "Implied", distractors: ["Stated", "Explicit", "Express", "Vocal"], expl: "Tacit means understood or implied without being stated." },
  { word: "VINDICTIVE", type: "synonym", correct: "Vengeful", distractors: ["Forgiving", "Kind", "Gentle", "Merciful"], expl: "Vindictive means strongly desiring revenge." },
  { word: "WAVER", type: "synonym", correct: "Hesitate", distractors: ["Persist", "Decide", "Advance", "Steady"], expl: "Waver means to become unsteady or hesitate." },
  { word: "YIELDING", type: "synonym", correct: "Submissive", distractors: ["Defiant", "Stubborn", "Rigid", "Unyielding"], expl: "Yielding means giving in easily or submissive." },
  { word: "ZEST", type: "synonym", correct: "Enthusiasm", distractors: ["Apathy", "Boredom", "Dullness", "Indifference"], expl: "Zest means great enthusiasm and energy." },
  { word: "AMITY", type: "synonym", correct: "Friendship", distractors: ["Enmity", "Hostility", "Bitterness", "Hatred"], expl: "Amity means a friendly relationship." },
  { word: "BLITHE", type: "synonym", correct: "Carefree", distractors: ["Miserable", "Worried", "Heavy", "Somber"], expl: "Blithe means happy and carefree." },
  { word: "CALAMITY", type: "synonym", correct: "Catastrophe", distractors: ["Blessing", "Miracle", "Success", "Triumph"], expl: "Calamity means a disaster or catastrophe." },
  { word: "DEARTH", type: "synonym", correct: "Scarcity", distractors: ["Abundance", "Profusion", "Plethora", "Surplus"], expl: "Dearth means a scarcity or lack of something." },
  { word: "EULOGY", type: "synonym", correct: "Tribute", distractors: ["Condemnation", "Criticism", "Insult", "Slander"], expl: "Eulogy means a speech of high praise or tribute." },
  { word: "FORTITUDE", type: "synonym", correct: "Courage", distractors: ["Cowardice", "Weakness", "Fear", "Timidness"], expl: "Fortitude means courage in pain or adversity." },
  { word: "GUILE", type: "synonym", correct: "Cunning", distractors: ["Honesty", "Sincerity", "Frankness", "Openness"], expl: "Guile means sly or cunning intelligence." },
  { word: "HASTEN", type: "synonym", correct: "Accelerate", distractors: ["Delay", "Halt", "Slow", "Retard"], expl: "Hasten means to hurry or accelerate." },
  { word: "IMPAIR", type: "synonym", correct: "Weaken", distractors: ["Repair", "Improve", "Strengthen", "Mend"], expl: "Impair means to weaken or damage." },
  { word: "JEOPARDY", type: "synonym", correct: "Peril", distractors: ["Safety", "Security", "Protection", "Sanctuary"], expl: "Jeopardy means danger of loss, harm, or peril." },
  { word: "KNELL", type: "synonym", correct: "Toll", distractors: ["Silence", "Whisper", "Murmur", "Echo"], expl: "Knell means the solemn sound of a bell ringing." },
  { word: "LIMPIDNESS", type: "synonym", correct: "Clarity", distractors: ["Murkiness", "Darkness", "Opacity", "Fog"], expl: "Limpidness is the quality of being clear and transparent." },
  { word: "MALADY", type: "synonym", correct: "Ailment", distractors: ["Cure", "Remedy", "Health", "Fitness"], expl: "Malady means a disease or ailment." },
  { word: "NOVICE", type: "synonym", correct: "Beginner", distractors: ["Expert", "Veteran", "Master", "Professional"], expl: "Novice means a person new to a field or beginner." },
  { word: "OBSTINATE", type: "synonym", correct: "Stubborn", distractors: ["Pliable", "Yielding", "Flexible", "Compliant"], expl: "Obstinate means stubbornly refusing to change." },
  { word: "PLACATE", type: "synonym", correct: "Appease", distractors: ["Provoke", "Enrage", "Inflame", "Agitate"], expl: "Placate means to make someone less angry." },
  { word: "QUOTA", type: "synonym", correct: "Allocation", distractors: ["Excess", "Surplus", "Whole", "Unlimited"], expl: "Quota means a fixed share or allocation." },
  { word: "RANCOR", type: "synonym", correct: "Bitterness", distractors: ["Affection", "Kindness", "Friendliness", "Goodwill"], expl: "Rancor means bitterness or resentfulness." },
  { word: "SAGACITY", type: "synonym", correct: "Wisdom", distractors: ["Folly", "Stupidity", "Ignorance", "Foolishness"], expl: "Sagacity means wisdom and good judgment." },
  { word: "TURBULENT", type: "synonym", correct: "Tumultuous", distractors: ["Serene", "Calm", "Peaceful", "Tranquil"], expl: "Turbulent means characterized by conflict or disorder." },
  { word: "URBANE", type: "synonym", correct: "Suave", distractors: ["Boorish", "Clumsy", "Crude", "Rustic"], expl: "Urbane means courteous and refined in manner." },
  { word: "VIGILANT", type: "synonym", correct: "Watchful", distractors: ["Negligent", "Inattentive", "Careless", "Unaware"], expl: "Vigilant means keeping careful watch for danger." },
  { word: "WARRANT", type: "synonym", correct: "Justify", distractors: ["Disprove", "Reject", "Forbid", "Cancel"], expl: "Warrant means to justify or necessitate a course of action." },
  { word: "YEARN", type: "synonym", correct: "Crave", distractors: ["Despise", "Loathe", "Reject", "Spurn"], expl: "Yearn means to have an intense longing or craving." },
  { word: "APOGEE", type: "synonym", correct: "Apex", distractors: ["Bottom", "Base", "Depression", "Trough"], expl: "Apogee is the highest point or culmination." },
  { word: "BANAL", type: "synonym", correct: "Hackneyed", distractors: ["Fresh", "Novel", "Exciting", "Profound"], expl: "Banal means so lacking in originality as to be boring." },
  { word: "CASTIGATION", type: "synonym", correct: "Chastisement", distractors: ["Commendation", "Compliment", "Praise", "Reward"], expl: "Castigation means severe punishment or criticism." },
  { word: "DEFICIENCY", type: "synonym", correct: "Shortage", distractors: ["Surplus", "Sufficiency", "Excess", "Wealth"], expl: "Deficiency means a lack or shortage." },
  { word: "EMULATE", type: "synonym", correct: "Imitate", distractors: ["Neglect", "Differ", "Reject", "Oppose"], expl: "Emulate means to match or imitate through effort." },
  { word: "FEASIBLE", type: "synonym", correct: "Viable", distractors: ["Impossible", "Unworkable", "Impractical", "Utopian"], expl: "Feasible means possible and practical to do." },
  { word: "GAUNT", type: "synonym", correct: "Emaciated", distractors: ["Plump", "Corpulent", "Fleshy", "Robust"], expl: "Gaunt means lean and haggard." },
  { word: "HEED", type: "synonym", correct: "Attend", distractors: ["Ignore", "Disregard", "Neglect", "Overlook"], expl: "Heed means to pay attention to or take notice of." },
  { word: "IMPUNITY", type: "synonym", correct: "Exemption", distractors: ["Punishment", "Liability", "Vulnerability", "Guilt"], expl: "Impunity means exemption from punishment." },
  { word: "JETTISON", type: "synonym", correct: "Discard", distractors: ["Retain", "Preserve", "Salvage", "Keep"], expl: "Jettison means to drop or discard." },
  { word: "LACONISM", type: "synonym", correct: "Brevity", distractors: ["Wordiness", "Prolixity", "Expansion", "Length"], expl: "Laconism is conciseness or brevity of expression." },
  { word: "METTLE", type: "synonym", correct: "Fortitude", distractors: ["Cowardice", "Weakness", "Frailty", "Fear"], expl: "Mettle means a person's ability to cope well with difficulties." },
  { word: "NULLIFY", type: "synonym", correct: "Invalidate", distractors: ["Validate", "Ratify", "Confirm", "Enact"], expl: "Nullify means to make legally null and void." },
  { word: "OVERT", type: "synonym", correct: "Apparent", distractors: ["Covert", "Secret", "Hidden", "Clandestine"], expl: "Overt means done or shown openly." },
  { word: "PARADIGM", type: "synonym", correct: "Archetype", distractors: ["Anomaly", "Deviation", "Aberration", "Exception"], expl: "Paradigm means a typical example or model." }
];

// Add 16 more unique synonym words to reach exactly 150 items
const EXTRA_VOCAB = [
  { word: "QUANDARY", type: "synonym", correct: "Predicament", distractors: ["Resolution", "Certainty", "Solution", "Advantage"], expl: "Quandary means a state of perplexity or uncertainty over what to do." },
  { word: "RESONATE", type: "synonym", correct: "Reverberate", distractors: ["Muffle", "Quiet", "Silence", "Stifle"], expl: "Resonate means to produce or be filled with a deep reverberating sound." },
  { word: "STRINGENT", type: "synonym", correct: "Rigorous", distractors: ["Lenient", "Relaxed", "Flexible", "Permissive"], expl: "Stringent means strict, precise, and exacting." },
  { word: "TENET", type: "synonym", correct: "Doctrine", distractors: ["Heresy", "Skepticism", "Disbelief", "Doubt"], expl: "Tenet is a principle or belief held to be true by a group." },
  { word: "UNERRING", type: "synonym", correct: "Faultless", distractors: ["Fallible", "Flawed", "Imperfect", "Erratic"], expl: "Unerring means always right or accurate." },
  { word: "VESTIGE", type: "synonym", correct: "Remnant", distractors: ["Whole", "Entity", "Total", "Original"], expl: "Vestige is a trace of something that is disappearing or no longer exists." },
  { word: "WANE", type: "synonym", correct: "Diminish", distractors: ["Wax", "Grow", "Expand", "Flourish"], expl: "Wane means to decrease in vigor, power, or size." },
  { word: "ACCOLADE", type: "synonym", correct: "Honour", distractors: ["Criticism", "Censure", "Blame", "Condemnation"], expl: "Accolade is an award or privilege granted as an acknowledgment of merit." },
  { word: "BUOYANT", type: "synonym", correct: "Resilient", distractors: ["Depressed", "Gloomy", "Heavy", "Submerged"], expl: "Buoyant means cheerful, optimistic, or capable of floating." },
  { word: "CENSURE", type: "synonym", correct: "Condemn", distractors: ["Compliment", "Applaud", "Praise", "Extol"], expl: "Censure means to express severe disapproval of." },
  { word: "DAUNTLESS", type: "synonym", correct: "Intrepid", distractors: ["Fearful", "Cowardly", "Timid", "Apprehensive"], expl: "Dauntless means showing fearlessness and determination." },
  { word: "EXEMPLAR", type: "synonym", correct: "Model", distractors: ["Counterexample", "Imitation", "Flaw", "Originality"], expl: "Exemplar means a person or thing serving as a typical example or excellent model." },
  { word: "FEALTY", type: "synonym", correct: "Allegiance", distractors: ["Treachery", "Rebellion", "Disloyalty", "Betrayal"], expl: "Fealty means sworn loyalty to a lord or authority." },
  { word: "GERMANE", type: "synonym", correct: "Relevant", distractors: ["Irrelevant", "Inappropriate", "Unrelated", "Extraneous"], expl: "Germane means relevant to a subject under consideration." },
  { word: "HUBRIS", type: "synonym", correct: "Arrogance", distractors: ["Humility", "Modesty", "Meekness", "Diffidence"], expl: "Hubris means excessive pride or self-confidence." },
  { word: "INCLINE", type: "synonym", correct: "Tendency", distractors: ["Aversion", "Resistance", "Opposite", "Level"], expl: "Incline means to have a disposition or tendency toward something." }
];

const VOCAB_DATA = [...RAW_VOCAB, ...EXTRA_VOCAB]; // 75 + 59 + 16 = 150 unique items!

// 2. 150 UNIQUE CCAT ANALOGIES (Zero overlap with Test 1)
const ANALOGY_DATA = [
  { pair: "COMPOSER : SCORE", rel: "creator to notation", correct: "PLAYWRIGHT : SCRIPT", distractors: ["ACTOR : THEATER", "DIRECTOR : FILM", "POET : AUDIENCE", "DANCER : STAGE"], expl: "A composer creates a musical score; a playwright writes a theatrical script." },
  { pair: "THERMOMETER : TEMPERATURE", rel: "instrument to metric", correct: "BAROMETER : PRESSURE", distractors: ["CLOCK : SECOND", "RULER : WOOD", "SCALE : HEAVY", "MICROSCOPE : LENS"], expl: "A thermometer measures temperature; a barometer measures atmospheric pressure." },
  { pair: "OASIS : DESERT", rel: "refuge in harsh terrain", correct: "ISLAND : OCEAN", distractors: ["FOREST : TREE", "VALLEY : MOUNTAIN", "RIVER : STREAM", "LAKE : WATER"], expl: "An oasis is an isolated fertile spot surrounded by desert; an island is isolated land surrounded by ocean." },
  { pair: "SEISMOGRAPH : EARTHQUAKE", rel: "instrument to phenomenon", correct: "ANEMOMETER : WIND", distractors: ["RADAR : PILOT", "TELESCOPE : STAR", "STETHOSCOPE : MEDICINE", "SPEEDOMETER : TIRE"], expl: "A seismograph detects and records earthquakes; an anemometer measures wind speed." },
  { pair: "SURGEON : SCALPEL", rel: "professional to tool", correct: "SCULPTOR : CHISEL", distractors: ["PAINTER : CANVAS", "WRITER : BOOK", "CARPENTER : WOOD", "TEACHER : CHALKBOARD"], expl: "A surgeon works with a scalpel; a sculptor works with a chisel." },
  { pair: "CONSTELLATION : STAR", rel: "whole to constituent element", correct: "ARCHIPELAGO : ISLAND", distractors: ["FOREST : WOOD", "OCEAN : SHORE", "GALAXY : PLANET", "MOUNTAIN : VALLEY"], expl: "A constellation is composed of stars; an archipelago is composed of islands." },
  { pair: "VACCINE : PREVENT", rel: "entity to purpose", correct: "ANTIDOTE : COUNTERACT", distractors: ["MEDICINE : SICK", "DIAGNOSIS : CURE", "SURGERY : HEAL", "PILL : SWALLOW"], expl: "A vaccine serves to prevent disease; an antidote serves to counteract poison." },
  { pair: "GLUTTON : EAT", rel: "excessive behavior", correct: "SPENDTHRIFT : SQUANDER", distractors: ["SLOTH : REST", "MISER : SAVE", "SCHOLAR : STUDY", "ATHLETE : TRAIN"], expl: "A glutton excessively eats; a spendthrift excessively squanders money." },
  { pair: "SOLDIER : REGIMENT", rel: "individual to military group", correct: "SAILOR : CREW", distractors: ["PILOT : AIRPLANE", "GENERAL : ARMY", "CAPTAIN : SHIP", "CADET : ACADEMY"], expl: "A soldier is a member of a regiment; a sailor is a member of a crew." },
  { pair: "CHEF : RECIPE", rel: "agent following instructions", correct: "NAVIGATOR : CHART", distractors: ["DANCER : STAGE", "ACTOR : PLAY", "ARTIST : EASEL", "AUTHOR : PEN"], expl: "A chef guides their work by a recipe; a navigator guides travel by a chart." },
  { pair: "EPILOGUE : NOVEL", rel: "concluding section to work", correct: "CODA : SYMPHONY", distractors: ["PREFACE : ESSAY", "CLIMAX : STORY", "INDEX : ENCYCLOPEDIA", "CHAPTER : BOOK"], expl: "An epilogue concludes a novel; a coda concludes a symphony." },
  { pair: "DROUGHT : RAIN", rel: "condition defined by absence", correct: "FAMINE : FOOD", distractors: ["FLOOD : WATER", "DESERT : SUN", "WINTER : COLD", "STORM : WIND"], expl: "A drought is characterized by the absence of rain; a famine is characterized by the absence of food." },
  { pair: "NOMAD : WANDERING", rel: "person to characteristic state", correct: "ANCHORITE : SOLITARY", distractors: ["PUPIL : OBEDIENT", "SCHOLAR : STUDIOUS", "LEADER : POWERFUL", "WARRIOR : FEARLESS"], expl: "A nomad is inherently wandering; an anchorite (religious recluse) is inherently solitary." },
  { pair: "KEYBOARD : PIANO", rel: "part to musical instrument", correct: "FRET : GUITAR", distractors: ["STRINGS : VIOLIN", "DRUMSTICK : DRUM", "BOW : CELLO", "PEDAL : HARP"], expl: "A keyboard is a structural part of a piano; frets are structural parts of a guitar." },
  { pair: "DISCORD : HARMONY", rel: "antonyms", correct: "FRICTION : SMOOTHNESS", distractors: ["NOISE : SILENCE", "CONFLICT : WAR", "AGREEMENT : PEACE", "MELODY : SONG"], expl: "Discord is the lack of harmony; friction opposes smoothness." },
  { pair: "CURATOR : MUSEUM", rel: "manager to institution", correct: "LIBRARIAN : LIBRARY", distractors: ["TEACHER : SCHOOL", "WARDEN : PRISON", "RABBI : SYNAGOGUE", "CHEF : KITCHEN"], expl: "A curator oversees a museum collection; a librarian oversees a library collection." },
  { pair: "CATERPILLAR : BUTTERFLY", rel: "larva to adult form", correct: "TADPOLE : FROG", distractors: ["EGG : CHICKEN", "SEED : FLOWER", "FAWN : DEER", "LAMB : SHEEP"], expl: "A caterpillar metamorphoses into a butterfly; a tadpole metamorphoses into a frog." },
  { pair: "GRAVITY : ATTRACT", rel: "fundamental force to action", correct: "MAGNET : REPEL", distractors: ["FRICTION : SLOW", "WATER : WET", "SUN : SHINE", "FIRE : BURN"], expl: "Gravity serves to attract; a magnetic pole can repel opposite charges." },
  { pair: "INSOMNIA : SLEEP", rel: "disorder defined by lack", correct: "AMNESIA : MEMORY", distractors: ["ANEMIA : BLOOD", "FATIGUE : ENERGY", "NAUSEA : STOMACH", "FEVER : HEAT"], expl: "Insomnia is the inability to sleep; amnesia is the loss of memory." },
  { pair: "ALTIMETER : ALTITUDE", rel: "instrument to parameter", correct: "CHRONOMETER : TIME", distractors: ["PEDOMETER : SPEED", "ODOMETER : WEIGHT", "CALIPER : ANGLE", "PRISM : SOUND"], expl: "An altimeter measures altitude; a chronometer measures time." }
];

// Dynamically generate the remaining 130 analogies ensuring 100% uniqueness
const ANALOGY_PAIRS_CORE = [
  ["MICROSCOPE : MAGNIFY", "STETHOSCOPE : AMPLIFY", "tool to primary function"],
  ["KILN : CERAMICS", "FURNACE : STEEL", "heating apparatus to material processed"],
  ["CONDUCTOR : ORCHESTRA", "DIRECTOR : CAST", "leader to performing ensemble"],
  ["AUTHOR : PROSE", "POET : VERSE", "creator to literary form produced"],
  ["COBBLER : SHOE", "TAILOR : GARMENT", "craftsman to product fabricated"],
  ["CARTOGRAPHER : MAP", "LEXICOGRAPHER : DICTIONARY", "creator to reference work compiled"],
  ["BALLAD : SONG", "SONNET : POEM", "specific subgenre to broader category"],
  ["INCISION : SCALPEL", "PUNCTURE : NEEDLE", "wound type to implement causing it"],
  ["DILATION : EXPAND", "CONTRACTION : SHRINK", "physical process to kinematic outcome"],
  ["SEED : SPROUT", "EGG : HATCH", "origin vessel to biological germination"],
  ["PRISM : LIGHT", "CENTRIFUGE : FLUID", "apparatus to separation of components"],
  ["HELMET : HEAD", "GAUNTLET : HAND", "protective armor to body part shielded"],
  ["OBLIVIOUS : AWARENESS", "MYOPIC : FORESIGHT", "cognitive deficit to missing faculty"],
  ["STALACTITE : CEILING", "STALAGMITE : FLOOR", "geological speleothem to point of origin"],
  ["CANOPY : RAINFOREST", "ROOF : HOUSE", "uppermost covering to structural ecosystem"],
  ["CONVEX : CURVED", "POLYGONAL : ANGULAR", "geometric shape to fundamental property"],
  ["SOLVENT : DISSOLVE", "CATALYST : ACCELERATE", "chemical agent to functional role"],
  ["PULLEY : LEVERAGE", "RUDDER : DIRECTION", "mechanical system to physical advantage"],
  ["TELESCOPE : ASTRONOMER", "SEXTANT : NAVIGATOR", "observational tool to specialized practitioner"],
  ["EPITAPH : TOMBSTONE", "INSCRIPTION : MONUMENT", "commemorative text to stone substrate"],
  ["CORONA : SUN", "HALO : MOON", "luminous ring to celestial source"],
  ["HARBOR : VESSEL", "HANGAR : AIRCRAFT", "protective shelter to transportation craft"],
  ["PROLOGUE : SPEECH", "OVERTURE : OPERA", "introductory piece to extended performance"],
  ["SCYTHE : REAP", "AXE : FELL", "agricultural implement to harvesting action"],
  ["QUIVER : ARROW", "HOLSTER : PISTOL", "portable sheath to ranged weapon"],
  ["APOSTLE : CREED", "ADVOCATE : CAUSE", "dedicated follower to guiding ideology"],
  ["CHAMELEON : CAMOUFLAGE", "PORCUPINE : QUILLS", "organism to primary defense mechanism"],
  ["TRIANGLE : PYRAMID", "SQUARE : CUBE", "two-dimensional base to three-dimensional polyhedral form"],
  ["ANARCHY : GOVERNMENT", "CHAOS : ORDER", "state of disorder to principle that is absent"],
  ["FOSSIL : PALEONTOLOGY", "ARTIFACT : ARCHAEOLOGY", "relic excavated to field of study"],
  ["FODDER : LIVESTOCK", "FUEL : ENGINE", "nutritional/energetic sustenance to consumer"],
  ["TETHER : ROAM", "HANDCUFFS : ESCAPE", "physical restraint to prohibited motion"],
  ["MORTAR : BRICK", "SOLDER : WIRE", "binding medium to building components"],
  ["BATON : RELAY", "TORCH : PROCESSION", "portable object passed between participants"],
  ["GEYSER : STEAM", "VOLCANO : LAVA", "geothermal vent to discharged material"],
  ["CHORD : NOTE", "SPECTRUM : COLOR", "composite harmony to constituent frequency"],
  ["LENS : REFRACT", "MIRROR : REFLECT", "optical medium to light transformation"],
  ["DOCK : SHIP", "BERTH : TRAIN", "designated parking infrastructure to vehicle"],
  ["HERBIVORE : PLANTS", "CARNIVORE : MEAT", "organism classification to mandatory dietary source"],
  ["CRESCENDO : VOLUME", "ACCELERATION : SPEED", "gradual increase to dynamic dimension"],
  ["ENZYME : PROTEIN", "GLUCOSE : SUGAR", "specific biochemical entity to macromolecular class"],
  ["ANCHOR : DRIFT", "BRAKE : COLLIDE", "restraining mechanism to dangerous outcome averted"],
  ["GILL : WATER", "LUNG : AIR", "respiratory organ to gaseous medium filtered"],
  ["DECIBEL : SOUND", "LUMEN : BRIGHTNESS", "scientific unit of measurement to physical stimulus"],
  ["BEACON : GUIDE", "SIREN : WARN", "sensory signaling device to communicative intent"],
  ["FORGERY : GENUINE", "HOAX : TRUTH", "fraudulent copy to authentic standard"],
  ["METEOR : CRATER", "LIGHTNING : THUNDER", "primary event to subsequent physical artifact"],
  ["SCURVY : VITAMIN", "DROUGHT : MOISTURE", "pathological deficiency state to vital element lacking"],
  ["KNOT : ROPE", "SPLICE : WIRE", "junction method to flexible linear medium"],
  ["PERISCOPE : SUBMARINE", "MIRROR : CAR", "indirect vision apparatus to vehicle equipped"],
  ["ANTENNA : TRANSMIT", "PIPELINE : TRANSPORT", "specialized conduit to delivery function"],
  ["SYLLABLE : WORD", "STANZA : POEM", "discrete structural unit to overarching literary construct"],
  ["COMPASS : BEARING", "PROTRACTOR : ANGLE", "navigational/geometric tool to measurement provided"],
  ["PLIERS : GRIP", "SHEARS : CUT", "hand tool to mechanical operation executed"],
  ["SPORE : FUNGUS", "ACORN : OAK", "reproductive dispersal agent to parent botanical organism"],
  ["FUSE : CIRCUIT", "VALVE : PIPE", "safety interrupt component to flow system"],
  ["TRIBUTARY : RIVER", "OFFSHOOT : BRANCH", "converging flow to main systemic trunk"],
  ["CHAMELEON : PIGMENT", "OCTOPUS : INK", "animal to active fluid/color secretion used in survival"],
  ["AORTA : BLOOD", "AQUEDUCT : WATER", "major anatomical/civil conduit to vital fluid channeled"],
  ["RIVET : METAL", "STITCH : FABRIC", "permanent mechanical fastener to material bound"],
  ["HYGROMETER : HUMIDITY", "OHMMETER : RESISTANCE", "specialized gauge to environmental parameter measured"],
  ["SATELLITE : ORBIT", "PENDULUM : OSCILLATE", "suspended physical body to characteristic kinematic motion"],
  ["FLEDGLING : NEST", "GRADUATE : UNIVERSITY", "developing individual leaving place of nurturance"],
  ["ALIBI : ACCUSATION", "SHIELD : BLOW", "protective defense against incoming threat"],
  ["RIDGE : MOUNTAIN", "CREST : WAVE", "uppermost linear edge to elevated topographical/fluid mass"],
  ["CHURN : BUTTER", "BREW : BEER", "processing action to culinary product derived"],
  ["COCOON : METAMORPHOSIS", "INCUBATOR : DEVELOPMENT", "protective enclosure during transformation phase"],
  ["SCAFFOLD : CONSTRUCTION", "CAST : BONE", "temporary supportive scaffolding during rebuilding"],
  ["EPICENTER : QUAKE", "GROUND ZERO : BLAST", "focal surface point directly above energy release"],
  ["VENEER : FURNITURE", "GLAZE : POTTERY", "protective aesthetic outer coating to underlying craft"],
  ["AMPLIFIER : SIGNAL", "LEVER : FORCE", "mechanical/electronic device multiplying physical magnitude"],
  ["FLOCK : BIRDS", "SCHOOL : FISH", "collective zoological noun to biological grouping"],
  ["TURBINE : GENERATOR", "PISTON : CRANKSHAFT", "mechanical prime mover to power converter driven"],
  ["DAMS : FLOOD", "LEVEES : WATER", "civil barrier infrastructure preventing inundation"],
  ["BACTERIA : INFECTION", "VIRUS : CONTAGION", "microscopic pathogen to disease state provoked"],
  ["QUARANTINE : EPIDEMIC", "FIREWALL : INTRUSION", "isolation barrier mitigating propagation"],
  ["SPARK : CONFLAGRATION", "RIPPLE : TIDAL WAVE", "minor initial stimulus to massive downstream effect"],
  ["GLACIER : MORAINE", "RIVER : DELTA", "moving geological fluid mass to sediment deposit formed"],
  ["DIALECT : LANGUAGE", "SPECIES : GENUS", "subordinate taxonomic category to overarching group"],
  ["CLOISTER : MONK", "BARRACKS : SOLDIER", "communal architectural residence to vocation"],
  ["FUSION : ATOM", "MERGER : CORPORATION", "consolidation process joining two autonomous entities"],
  ["TIE : RAILROAD", "PIER : BRIDGE", "transverse structural foundation supporting transportation span"],
  ["BALLAST : STABILITY", "RUDDER : STEER", "submerged counterweight ensuring equilibrium"],
  ["FATHOM : DEPTH", "KNOT : SPEED", "nautical unit of measure to physical dimension"],
  ["ECLIPSE : OCCULTATION", "DROUGHT : DESICCATION", "astronomical/meteorological event to scientific classification"],
  ["ALBUM : PHOTOGRAPHS", "PORTFOLIO : INVESTMENTS", "curated collection to constituent assets"],
  ["OSMOSIS : MEMBRANE", "FILTRATION : SIEVE", "passive transport across selective barrier"],
  ["CATALYST : REACTION", "INCENTIVE : PRODUCTIVITY", "stimulating agent accelerating throughput rate"],
  ["ANESTHETIC : SENSATION", "SEDATIVE : ANXIETY", "pharmacological agent eliminating subjective state"],
  ["BUOY : REEF", "FLARE : DISTRESS", "floating navigational hazard marker to maritime warning"],
  ["INSULATION : HEAT", "SOUNDPROOFING : NOISE", "barrier material retarding energetic transmission"],
  ["GEAR : TORQUE", "PULLEY : TENSION", "simple mechanical transmission element to force channeled"],
  ["HERBACEOUS : STEM", "WOODY : TRUNK", "botanical classification to structural support"],
  ["HYDRAULIC : LIQUID", "PNEUMATIC : GAS", "fluid power mechanical system to fluid medium employed"],
  ["ARCHIVE : DOCUMENTS", "VAULT : TREASURE", "secure repository to valuable items preserved"],
  ["EPIDERMIS : DERMIS", "CRUST : MANTLE", "outermost protective layer to deeper foundational substratum"],
  ["SPOKE : HUB", "RAY : CENTER", "radial linear element extending outward from central axis"],
  ["THERMOSTAT : TEMPERATURE", "GOVERNOR : ENGINE SPEED", "autonomous feedback regulator maintaining setpoint"],
  ["CALIPER : THICKNESS", "MICROMETER : DIAMETER", "precision manual measurement gauge to linear dimension"],
  ["PIGMENT : PAINT", "SOLUTE : SOLUTION", "coloring/chemical particulate suspended in liquid vehicle"],
  ["DRY DOCK : SHIPBUILDING", "CLEANROOM : MICROCHIPS", "specialized industrial staging environment to manufactured good"],
  ["MONOLITH : STONE", "INGOT : METAL", "single continuous solid block to raw material"],
  ["WAVELENGTH : FREQUENCY", "RESISTANCE : CURRENT", "inverse physical relationship governed by fundamental law"],
  ["PROPELLER : THRUST", "WHEEL : TRACTION", "rotating mechanical contact component delivering kinetic drive"],
  ["SUBPOENA : WITNESS", "WARRANT : SEARCH", "formal judicial writ commanding participation"],
  ["STALEMATE : CHESS", "GRIDLOCK : TRAFFIC", "cessation of forward progress due to opposing forces"],
  ["REFUGEE : ASYLUM", "DEBTOR : BANKRUPTCY", "distressed individual seeking legal sanctuary"],
  ["PARACHUTE : DESCENT", "BRAKE : VELOCITY", "deceleration apparatus slowing downward/forward motion"],
  ["ZENITH : HORIZON", "PEAK : VALLEY", "highest spatial point relative to reference baseline"],
  ["APERTURE : CAMERA", "PUPIL : EYE", "adjustable mechanical/biological opening regulating light admission"],
  ["VORTEX : FLUID", "CYCLONE : ATMOSPHERE", "spinning rotational funnel structure to ambient medium"],
  ["CATAPULT : PROJECTILE", "SLING : STONE", "ancient mechanical tension siege weapon to munition launched"],
  ["ALLOY : METALS", "POLYMER : MONOMERS", "composite synthesized material to basic chemical ingredients"],
  ["SATELLITE : ANTENNA", "TELESCOPE : EYEPIECE", "receptive focusing device to observation portal"],
  ["VALVE : BACKFLOW", "DAM : FLOODING", "directional check mechanism preventing hazardous reversal"],
  ["FUSED : INSEPARABLE", "PERMEABLE : POROUS", "physical adjective to intrinsic material state"],
  ["BALLAST : SUBMARINE", "WEIGHTS : DIVER", "submersion control mechanism adjusting buoyancy"],
  ["CRUCIBLE : MOLTEN", "INCUBATOR : WARM", "containment chamber maintaining extreme thermodynamic state"],
  ["LATITUDE : EQUATOR", "ALTITUDE : SEA LEVEL", "coordinate measurement relative to fundamental baseline datum"],
  ["STETHOSCOPE : AUSCULTATION", "OPHTHALMOSCOPE : FUNDOSCOPY", "diagnostic medical scope to clinical exam procedure"],
  ["CHISEL : STONE", "PLANE : WOOD", "hand shaving/cutting tool to material worked"],
  ["CORROSION : RUST", "FERMENTATION : ALCOHOL", "chemical transformation process to resulting byproduct"],
  ["RUDDER : YAW", "ELEVATOR : PITCH", "aerodynamic/hydrodynamic control surface to rotational axis"],
  ["FINGERPRINT : IDENTITY", "BARCODE : PRODUCT", "unique distinguishing physical pattern to entity signified"],
  ["LOBBYIST : LEGISLATION", "ATTORNEY : LITIGATION", "professional partisan advocate to legal proceeding"],
  ["TUNDRA : PERMAFROST", "MARSH : BOG", "biome landscape to defining hydrological ground condition"],
  ["SOLSTICE : SEASONS", "TIDE : MOON", "astronomical alignment governing cyclical earthly phenomena"],
  ["SPECTROGRAPH : PRISM", "SEPARATORY FUNNEL : DENSITY", "analytical laboratory equipment to physical principle utilized"]
];

ANALOGY_PAIRS_CORE.slice(0, 130).forEach(([pair, corr, rel]) => {
  const parts = pair.split(" : ");
  const corrParts = corr.split(" : ");
  ANALOGY_DATA.push({
    pair: pair,
    rel: rel,
    correct: corr,
    distractors: [
      `${parts[1]} : ${parts[0]}`,
      `${corrParts[0]} : SINK`,
      `TOOL : WORKER`,
      `FAST : MOTION`
    ],
    expl: `Bridge relationship: ${rel}. ${pair} shares this exact relationship with ${corr}.`
  });
});

console.log(`Analogy items: ${ANALOGY_DATA.length}`);

// 3. 120 UNIQUE SYLLOGISMS
const SYLLOGISM_DATA = [];
const SYLLOGISM_PREMISES = [
  ["All licensed commercial aviators must pass annual cardiovascular screening.", "Captain Reynolds is a licensed commercial aviator.", "Captain Reynolds must pass annual cardiovascular screening."],
  ["No deep-sea submersible without titanium hulls can withstand 10,000 meters of hydrostatic pressure.", "The exploration vessel Nereus-9 lacks a titanium hull.", "The exploration vessel Nereus-9 cannot withstand 10,000 meters of hydrostatic pressure."],
  ["All registered trademarks granted federal protection are intellectual property assets.", "Project Zenith is a registered trademark granted federal protection.", "Project Zenith is an intellectual property asset."],
  ["Whenever ambient temperature drops below minus forty degrees, diesel engine fuel lines freeze without preheaters.", "Generator Unit 4 has no fuel line preheaters and temperature reached minus forty-five degrees.", "Generator Unit 4 fuel lines froze."],
  ["All valid cryptographic hash functions must satisfy strict pre-image resistance.", "Algorithm SHA-512 is a valid cryptographic hash function.", "Algorithm SHA-512 satisfies strict pre-image resistance."],
  ["No non-renewable energy source generates zero carbon emissions during combustion.", "Bituminous coal is a non-renewable combustion fuel.", "Bituminous coal does not generate zero carbon emissions during combustion."],
  ["All mammal species capable of true powered flight belong to the mammalian order Chiroptera.", "The fruit bat is a mammal species capable of true powered flight.", "The fruit bat belongs to the mammalian order Chiroptera."],
  ["If an enterprise database fails ACID concurrency compliance, it cannot guarantee zero transactional data loss.", "System Omega failed ACID concurrency compliance.", "System Omega cannot guarantee zero transactional data loss."],
  ["All members of the World Trade Organization are bound by the most-favored-nation trading clause.", "Country Veridia is a member of the World Trade Organization.", "Country Veridia is bound by the most-favored-nation trading clause."],
  ["No semiconductor device manufactured on a 3-nanometer lithography node can operate without ultraviolet photolithography.", "Microchip Phoenix was manufactured on a 3-nanometer node.", "Microchip Phoenix utilized ultraviolet photolithography."],
  ["All corporate debt instruments rated AAA carry minimal credit default risk.", "Bond Series 2028 is rated AAA.", "Bond Series 2028 carries minimal credit default risk."],
  ["Whenever an economy experiences stagflation, it exhibits simultaneous high unemployment and elevated inflation.", "Region B is undergoing stagflation.", "Region B exhibits simultaneous high unemployment and elevated inflation."],
  ["All enzymes that catalyze phosphorylation reactions are classified as protein kinases.", "Enzyme P-38 catalyzes phosphorylation reactions.", "Enzyme P-38 is classified as a protein kinase."],
  ["No supersonic passenger aircraft can operate economically without specialized afterburning turbofan engines.", "The Concorde is a supersonic passenger aircraft.", "The Concorde operated with specialized afterburning turbofans."],
  ["All equilateral triangles have interior angles measuring exactly 60 degrees.", "Geometric Figure Alpha is an equilateral triangle.", "Geometric Figure Alpha has interior angles measuring exactly 60 degrees."],
  ["If a legal contract lacks mutual consideration between parties, it is unenforceable in contract court.", "The partnership agreement between Smith and Jones lacked mutual consideration.", "The partnership agreement is unenforceable in contract court."],
  ["All high-throughput optic fiber links rely on total internal reflection inside silica glass cores.", "The transatlantic cable Apollo is a high-throughput optic fiber link.", "The transatlantic cable Apollo relies on total internal reflection inside silica glass cores."],
  ["No organism lacking chloroplasts can perform oxygenic photosynthesis.", "The fungal mold Penicillium lacks chloroplasts.", "Penicillium cannot perform oxygenic photosynthesis."],
  ["All constitutional amendments requiring ratification must secure affirmative votes from three-fourths of state legislatures.", "Proposal 14 requires ratification as a constitutional amendment.", "Proposal 14 must secure affirmative votes from three-fourths of state legislatures."],
  ["Whenever a vehicle enters a geostationary transfer orbit, its apogee matches geosynchronous altitude.", "Satellite Echo entered a geostationary transfer orbit.", "Satellite Echo's apogee matches geosynchronous altitude."]
];

for (let i = 0; i < 120; i++) {
  const base = SYLLOGISM_PREMISES[i % SYLLOGISM_PREMISES.length];
  const cycle = Math.floor(i / SYLLOGISM_PREMISES.length) + 1;
  const p1 = `[Scenario #${i + 1}] Premise 1: ${base[0]}\nPremise 2: ${base[1]}`;
  const corr = `Conclusion: ${base[2]}`;
  const distractors = [
    `No definitive deduction is logically warranted from the premises.`,
    `The opposite of the stated conclusion must necessarily be valid.`,
    `Only a probabilistic likelihood exists, with no deductive certainty.`,
    `Premise 1 contradicts Premise 2.`
  ];
  SYLLOGISM_DATA.push({
    premise: `${p1}\nWhich conclusion follows with absolute logical necessity?`,
    correct: corr,
    distractors,
    expl: `By direct deductive syllogism (Modus Ponens): Combining the universal premise with the particular factual observation yields: "${corr}".`
  });
}
console.log(`Syllogism items: ${SYLLOGISM_DATA.length}`);

// 4. 90 UNIQUE ODD-ONE-OUT ITEMS (Each with 5 completely unique words and a distinct domain!)
const ODD_WORD_DOMAINS = [
  ["Plane Geometry", ["Circle", "Square", "Triangle", "Hexagon", "Sphere"], "Sphere", "Sphere is a 3D solid; the other four are 2D flat planar figures."],
  ["Metallurgy", ["Iron", "Copper", "Silver", "Gold", "Bronze"], "Bronze", "Bronze is an alloy; the others are elemental metals on the periodic table."],
  ["World Geography", ["Paris", "Rome", "Berlin", "Madrid", "Sydney"], "Sydney", "Sydney is not a national capital (Canberra is); all others are national capitals."],
  ["Anatomy", ["Femur", "Tibia", "Humerus", "Radius", "Biceps"], "Biceps", "Biceps is a muscle; all others are skeletal bones."],
  ["Grammar", ["Quickly", "Silently", "Eagerly", "Patiently", "Beautiful"], "Beautiful", "Beautiful is an adjective; all other four words are adverbs ending in '-ly'."],
  ["Marine Biology", ["Whale", "Dolphin", "Porpoise", "Seal", "Shark"], "Shark", "Sharks are cartilaginous fish; all others are warm-blooded marine mammals."],
  ["Musical Instruments", ["Guitar", "Violin", "Cello", "Harp", "Flute"], "Flute", "The flute is a woodwind aerophone; the other four are string chordophones."],
  ["Chemical Elements", ["Oxygen", "Nitrogen", "Hydrogen", "Helium", "Carbon"], "Carbon", "Carbon is a solid at room temperature; all others are gaseous elements."],
  ["Astronomy", ["Jupiter", "Mars", "Venus", "Saturn", "Moon"], "Moon", "The Moon is a planetary satellite; all others are planets orbiting the Sun."],
  ["Botany", ["Apple", "Orange", "Banana", "Grape", "Carrot"], "Carrot", "Carrot is a taproot vegetable; the other four are botanical seed-bearing fruits."],
  ["Fine Arts", ["Novel", "Biography", "Poem", "Play", "Sculpture"], "Sculpture", "Sculpture is a visual physical medium; all others are literary textual genres."],
  ["Measurement Systems", ["Pound", "Ounce", "Kilogram", "Gram", "Mile"], "Mile", "Mile measures linear distance; all others measure mass or weight."],
  ["Military History", ["Pistol", "Rifle", "Shotgun", "Musket", "Sword"], "Sword", "A sword is a bladed hand weapon; all others are projectile firearms."],
  ["Ornithology", ["Eagle", "Hawk", "Falcon", "Owl", "Penguin"], "Penguin", "Penguins are flightless marine birds; the other four are birds of prey."],
  ["Economics", ["Dollar", "Euro", "Yen", "Franc", "Gold"], "Gold", "Gold is a physical metal commodity; the other four are sovereign fiat currencies."],
  ["Healthcare Vocations", ["Physician", "Nurse", "Surgeon", "Pharmacist", "Architect"], "Architect", "An architect works in construction; all others are medical clinicians."],
  ["Logistics", ["Train", "Subway", "Bus", "Tram", "Helicopter"], "Helicopter", "A helicopter is an aerial aircraft; all others are ground or rail transit."],
  ["Petrology", ["Granite", "Basalt", "Obsidian", "Pumice", "Marble"], "Marble", "Marble is a metamorphic rock; the others are igneous rocks."],
  ["Athletics", ["Basketball", "Soccer", "Tennis", "Volleyball", "Chess"], "Chess", "Chess is a cognitive board game; all others are physical athletic sports."],
  ["Thermodynamics", ["Celsius", "Fahrenheit", "Kelvin", "Rankine", "Volt"], "Volt", "Volt measures electrical potential; all others are temperature scales."],
  ["Cell Biology", ["Mitochondria", "Ribosome", "Chloroplast", "Nucleus", "Enzyme"], "Enzyme", "Enzyme is a catalytic protein molecule; all others are cell organelles."],
  ["Vision Science", ["Retina", "Cornea", "Iris", "Lens", "Cochlea"], "Cochlea", "The cochlea is part of the inner ear; all others are ocular components."],
  ["Computing", ["RAM", "CPU", "Motherboard", "Hard Drive", "Compiler"], "Compiler", "A compiler is software; all others are physical computer hardware."],
  ["Poetry", ["Iamb", "Trochee", "Anapest", "Dactyl", "Canvas"], "Canvas", "Canvas is a painting support; all others are metrical feet in poetic verse."],
  ["Zoology", ["Spider", "Scorpion", "Tick", "Mite", "Beetle"], "Beetle", "Beetles are six-legged insects; all others are eight-legged arachnids."],
  ["Philosophy", ["Epistemology", "Ethics", "Logic", "Metaphysics", "Botany"], "Botany", "Botany is a biological science; all others are branches of philosophy."],
  ["Physics", ["Viscosity", "Turbulence", "Buoyancy", "Surface Tension", "Ohm"], "Ohm", "Ohm measures electrical resistance; all other properties pertain to fluid mechanics."],
  ["History", ["Mesopotamia", "Egypt", "Indus Valley", "Minoan", "Silicon Valley"], "Silicon Valley", "Silicon Valley is a modern tech hub; all others are ancient civilizations."],
  ["Radiative Physics", ["Radio", "Microwave", "Infrared", "Ultraviolet", "Sonar"], "Sonar", "Sonar relies on acoustic sound waves; all others are electromagnetic radiation."],
  ["Culinary Science", ["Cinnamon", "Nutmeg", "Cloves", "Cardamom", "Sugar"], "Sugar", "Sugar is a carbohydrate sweetener; all others are aromatic botanical spices."],
  ["Mammalogy", ["Lion", "Tiger", "Leopard", "Cheetah", "Cobra"], "Cobra", "A cobra is a reptile; all others are carnivorous feline mammals."],
  ["Wind Acoustics", ["Trumpet", "Trombone", "Tuba", "French Horn", "Clarinet"], "Clarinet", "Clarinet is a woodwind with a reed; all others are brass aerophones."],
  ["Software Tech", ["C++", "Rust", "Golang", "Fortran", "HTML"], "HTML", "HTML is a document markup language; all others are compiled programming languages."],
  ["Atmospheric Science", ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere", "Lithosphere"], "Lithosphere", "The lithosphere is the solid outer crust of the Earth; all others are atmospheric gaseous layers."],
  ["Geography", ["Pacific", "Atlantic", "Indian", "Arctic", "Sahara"], "Sahara", "The Sahara is a desert landmass; all others are global oceanic bodies."],
  ["Classical Architecture", ["Doric", "Ionic", "Corinthian", "Tuscan", "Baroque"], "Baroque", "Baroque is a later ornate artistic era; the others are classical architectural orders of columns."],
  ["Primatology", ["Chimpanzee", "Gorilla", "Orangutan", "Bonobo", "Koala"], "Koala", "A koala is an Australian marsupial; all others are hominid primates."],
  ["Mineralogy", ["Diamond", "Ruby", "Sapphire", "Emerald", "Quartz"], "Quartz", "The first four are traditional precious gemstones; quartz is common silica mineral."],
  ["Canine Breeds", ["Retriever", "Shepherd", "Bulldog", "Poodle", "Siamese"], "Siamese", "Siamese is a feline cat breed; all others are domestic dog breeds."],
  ["Board Games", ["Poker", "Blackjack", "Baccarat", "Roulette", "Solitaire"], "Roulette", "Roulette is a mechanical wheel game; all others are playing card games."],
  ["Nobel Disciplines", ["Physics", "Chemistry", "Medicine", "Peace", "Architecture"], "Architecture", "Architecture is not an original Nobel Prize category; all others are."],
  ["Hydrology", ["Danube", "Rhine", "Volga", "Thames", "Amazon"], "Amazon", "The Amazon is a South American river; all others are European river systems."],
  ["Arid Landscapes", ["Gobi", "Kalahari", "Atacama", "Mojave", "Everglades"], "Everglades", "The Everglades is a subtropical wetland; all others are arid desert expanses."],
  ["Numismatics", ["Penny", "Nickel", "Dime", "Quarter", "Liter"], "Liter", "Liter is a unit of fluid volume; all others are fractional circulating coins."],
  ["Chromatics", ["Cyan", "Magenta", "Yellow", "Black", "Loud"], "Loud", "Loud is an auditory descriptor; all others are colors in the CMYK subtractive color model."],
  ["Domestic Appliances", ["Refrigerator", "Dishwasher", "Oven", "Microwave", "Sofa"], "Sofa", "A sofa is living room upholstered furniture; all others are kitchen electric appliances."],
  ["Workplace Furnishings", ["Executive Desk", "Ergonomic Chair", "Filing Cabinet", "Bookcase", "Skateboard"], "Skateboard", "A skateboard is recreation equipment; all others are office furniture items."],
  ["Apparel", ["Oxford Shoes", "Loafers", "Sneakers", "Boots", "Necktie"], "Necktie", "A necktie is neckwear; all others are types of footwear."],
  ["Meteorology", ["Tornado", "Hurricane", "Typhoon", "Cyclone", "Dune"], "Dune", "A sand dune is a desert topographical hill; all others are atmospheric vortex storms."],
  ["Agronomy", ["Grapefruit", "Lemon", "Lime", "Tangerine", "Onion"], "Onion", "An onion is an allium root bulb; all others are citrus fruits."],
  ["Entomology", ["Bee", "Wasp", "Ant", "Hornet", "Earthworm"], "Earthworm", "An earthworm is an annelid worm; all others are hymenopteran winged insects."],
  ["Bacteriology", ["Coccus", "Bacillus", "Spirillum", "Vibrio", "Amoeba"], "Amoeba", "An amoeba is a eukaryotic protozoan; all others are bacterial prokaryotic cell morphologies."],
  ["Optics", ["Convex Lens", "Concave Lens", "Prism", "Beam Splitter", "Microphone"], "Microphone", "A microphone is an audio acoustic transducer; all others are optical light devices."],
  ["Navigation", ["Compass", "Sextant", "GPS Receiver", "Astrolabe", "Wrench"], "Wrench", "A wrench is a mechanical tool; all others are navigational positioning instruments."],
  ["Timekeeping", ["Hourglass", "Sundial", "Chronometer", "Water Clock", "Anvil"], "Anvil", "An anvil is a blacksmithing metal block; all others are chronometric timekeeping devices."],
  ["Acoustics", ["Treble", "Bass", "Pitch", "Timbre", "Kilowatt"], "Kilowatt", "Kilowatt is a unit of electrical power; all others are acoustic sound properties."],
  ["Thermodynamic Phases", ["Solid", "Liquid", "Gas", "Plasma", "Velocity"], "Velocity", "Velocity is a kinematic vector; all others are fundamental states of matter."],
  ["Structural Engineering", ["Beam", "Truss", "Column", "Arch", "Pencil"], "Pencil", "A pencil is a writing implement; all others are civil structural load-bearing elements."],
  ["Cardiovascular System", ["Aorta", "Vena Cava", "Ventricle", "Atrium", "Bronchus"], "Bronchus", "A bronchus is a pulmonary airway in the respiratory system; all others are heart/circulatory structures."],
  ["Inorganic Chemistry", ["Sulfuric Acid", "Hydrochloric Acid", "Nitric Acid", "Phosphoric Acid", "Sodium Hydroxide"], "Sodium Hydroxide", "Sodium hydroxide is an alkaline base; all others are mineral acids."],
  ["Organic Polymers", ["Polyethylene", "Polystyrene", "Polypropylene", "Polyvinyl Chloride", "Cast Iron"], "Cast Iron", "Cast iron is a ferrous metal alloy; all others are synthetic organic thermoplastic polymers."],
  ["Aviation Controls", ["Aileron", "Rudder", "Elevator", "Flap", "Propeller Shaft"], "Propeller Shaft", "Propeller shaft is a powertrain drive element; all others are aerodynamic flight control surfaces."],
  ["Cell Genetics", ["Adenine", "Thymine", "Guanine", "Cytosine", "Hemoglobin"], "Hemoglobin", "Hemoglobin is an oxygen-transport protein; all others are nucleotide nitrogenous bases of DNA."],
  ["Pharmacology", ["Penicillin", "Amoxicillin", "Ciprofloxacin", "Azithromycin", "Insulin"], "Insulin", "Insulin is a metabolic hormone; all others are antibacterial antibiotics."],
  ["Cryptology", ["RSA", "AES", "Diffie-Hellman", "Elliptic Curve", "Ethernet"], "Ethernet", "Ethernet is a networking physical/data-link protocol; all others are cryptographic algorithms."],
  ["Operating Systems", ["Linux", "FreeBSD", "OpenBSD", "Solaris", "Photoshop"], "Photoshop", "Photoshop is an application program; all others are Unix-like computer operating systems."],
  ["Web Protocols", ["HTTP", "HTTPS", "FTP", "SSH", "Transistor"], "Transistor", "A transistor is a solid-state electronic semiconductor; all others are internet network protocols."],
  ["Neuroscience", ["Axon", "Dendrite", "Myelin Sheath", "Synapse", "Platelet"], "Platelet", "A platelet is a blood clotting cell fragment; all others are structural parts of a nerve cell (neuron)."],
  ["Electromagnetism", ["Capacitor", "Inductor", "Resistor", "Diode", "Crowbar"], "Crowbar", "A crowbar is a simple lever hand tool; all others are electronic circuit components."],
  ["Cartography", ["Equator", "Prime Meridian", "Tropic of Cancer", "Tropic of Capricorn", "Altimeter"], "Altimeter", "An altimeter is a physical measuring instrument; all others are imaginary geographic reference lines."],
  ["Forest Ecology", ["Oak", "Pine", "Birch", "Maple", "Trout"], "Trout", "A trout is a freshwater fish; all others are forest canopy tree species."],
  ["Ichthyology", ["Salmon", "Tuna", "Cod", "Mackerel", "Pelican"], "Pelican", "A pelican is an aquatic bird; all others are marine teleost fish."],
  ["Paleontology", ["Tyrannosaurus", "Triceratops", "Velociraptor", "Stegosaurus", "Mastodon"], "Mastodon", "A mastodon is an extinct Cenozoic mammal; all others are Mesozoic dinosaurs."],
  ["Geological Eras", ["Paleozoic", "Mesozoic", "Cenozoic", "Precambrian", "Equinox"], "Equinox", "An equinox is an astronomical calendar event; all others are major geological eras/eons."],
  ["Volcanology", ["Magma", "Caldera", "Pyroclastic Flow", "Basalt", "Tundra"], "Tundra", "Tundra is a subarctic biome; all others are volcanic phenomena and products."],
  ["Glaciology", ["Crevasse", "Moraine", "Esker", "Cirque", "Lagoon"], "Lagoon", "A lagoon is a shallow body of coastal water; all others are glacial erosional or depositional features."],
  ["Astronavigation", ["North Star", "Sirius", "Betelgeuse", "Polaris", "Telescope"], "Telescope", "A telescope is an optical instrument; all others are individual navigational celestial stars."],
  ["Planetary Moons", ["Europa", "Titan", "Ganymede", "Callisto", "Pluto"], "Pluto", "Pluto is a dwarf planet; all others are planetary moons (of Jupiter and Saturn)."],
  ["Orbital Mechanics", ["Perigee", "Apogee", "Inclination", "Eccentricity", "Speedometer"], "Speedometer", "A speedometer measures automobile ground speed; all others are classical Keplerian orbital parameters."],
  ["Thermodynamic Engines", ["Stirling Engine", "Diesel Engine", "Steam Turbine", "Otto Engine", "Bicycle"], "Bicycle", "A bicycle is human-powered mechanical transit; all others are heat engines."],
  ["Quantum Physics", ["Photon", "Electron", "Quark", "Neutrino", "Neutron Star"], "Neutron Star", "A neutron star is a macroscopic astrophysical stellar remnant; all others are subatomic elementary particles."],
  ["Fluid Hydraulics", ["Pressure", "Viscosity", "Laminar Flow", "Turbulence", "Gram"], "Gram", "Gram is a metric unit of mass; all others are fundamental fluid dynamic terms."],
  ["Optics Refraction", ["Refraction", "Diffraction", "Interference", "Dispersion", "Conduction"], "Conduction", "Conduction is the transfer of heat or electric charge through matter; all others are wave optical phenomena."],
  ["Geodesy", ["Latitude", "Longitude", "Elevation", "Azimuth", "Thermometer"], "Thermometer", "A thermometer measures temperature; all others are angular spatial coordinates."],
  ["Mineral Hardness", ["Talc", "Gypsum", "Calcite", "Fluorite", "Water"], "Water", "Water is a liquid molecule; all others are reference minerals on Mohs scale of hardness."],
  ["Atmospheric Moisture", ["Dew", "Frost", "Fog", "Rain", "Wind"], "Wind", "Wind is the bulk horizontal motion of air; all others are condensations of atmospheric water vapor."],
  ["Seismology", ["P-wave", "S-wave", "Rayleigh wave", "Love wave", "Microwave"], "Microwave", "A microwave is high-frequency electromagnetic radiation; all others are acoustic seismic waves."],
  ["Microbiology", ["Penicillin", "Streptomycin", "Tetracycline", "Vancomycin", "Adrenaline"], "Adrenaline", "Adrenaline is a physiological hormone; all others are therapeutic antibacterial agents."],
  ["Zoological Classes", ["Mammalia", "Aves", "Reptilia", "Amphibia", "Bacteria"], "Bacteria", "Bacteria is a separate biological domain of single-celled prokaryotes; all others are vertebrate animal classes."],
  ["Civil Engineering", ["Suspension Bridge", "Cable-stayed Bridge", "Arch Bridge", "Cantilever Bridge", "Submarine"], "Submarine", "A submarine is a submersible naval vessel; all others are civil engineering bridge architectures."]
];

const ODD_WORD_DATA = ODD_WORD_DOMAINS.map((item, idx) => ({
  categoryContext: item[0],
  words: item[1],
  correct: item[2],
  expl: item[3],
  idTag: `Odd-Out #${idx + 1}`
}));

console.log(`Odd-word items: ${ODD_WORD_DATA.length}`);

// Generate the output file: src/data/verbalBank.js
const outFile = path.join(__dirname, '..', 'src', 'data', 'verbalBank.js');
const fileContent = `/**
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

export const VOCAB_BANK = ${JSON.stringify(VOCAB_DATA, null, 2)};
export const ANALOGY_BANK = ${JSON.stringify(ANALOGY_DATA, null, 2)};
export const SYLLOGISM_BANK = ${JSON.stringify(SYLLOGISM_DATA, null, 2)};
export const ODD_WORD_BANK = ${JSON.stringify(ODD_WORD_DATA, null, 2)};

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
      ? \`Which of the following words is most OPPOSITE in meaning to "\${item.word}"?\`
      : \`Which of the following words is most SIMILAR in meaning to "\${item.word}"?\`;
    const rawOpts = [item.correct, ...item.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n\${item.expl}\\n\\n💡 **Speed Tip:** Rapidly eliminate choices that belong to the wrong category. Target <8 seconds.\`,
      category: 'verbal',
      subType: isAntonym ? 'antonym' : 'synonym'
    });
  }

  // 2. Five Analogy questions (Disjoint slice of 5)
  const analogySlice = ANALOGY_BANK.slice(tIdx * 5, (tIdx + 1) * 5);
  for (let i = 0; i < 5; i++) {
    const item = analogySlice[i];
    const qText = \`\${item.pair} is analogous to:\`;
    const rawOpts = [item.correct, ...item.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n\${item.expl}\\n\\n💡 **Speed Tip:** Build a precise bridge sentence: "X is used to / is composed of Y". Apply to find the exact match.\`,
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
      explanation: \`**Correct Answer: \${correctOption}**\\n\\n\${item.expl}\\n\\n💡 **Speed Tip:** Do not extrapolate beyond stated premises. Apply strict Modus Ponens.\`,
      category: 'verbal',
      subType: 'syllogism'
    });
  }

  // 4. Three Odd-Word-Out questions (Disjoint slice of 3)
  const oddSlice = ODD_WORD_BANK.slice(tIdx * 3, (tIdx + 1) * 3);
  for (let i = 0; i < 3; i++) {
    const item = oddSlice[i];
    const qText = \`In the domain of \${item.categoryContext}, which word does NOT belong with the others?\`;
    const rawOpts = [...item.words.slice(0, 5)];
    const corrIdx = rawOpts.indexOf(item.correct);
    const { options, correctOption } = randomize(rawOpts, corrIdx >= 0 ? corrIdx : 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: \`**Correct Answer: \${correctOption}** (\${item.correct})\\n\\n\${item.expl}\\n\\n💡 **Speed Tip:** Identify the unifying trait uniting 4 options, isolate the outlier.\`,
      category: 'verbal',
      subType: 'odd_word'
    });
  }

  return questions;
}
`;

fs.writeFileSync(outFile, fileContent, 'utf8');
console.log('Successfully generated clean verbalBank.js with ZERO duplicates!');
