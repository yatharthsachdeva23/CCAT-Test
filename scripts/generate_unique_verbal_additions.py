import json

with open('scripts/existing_verbal_keys.json') as f:
    existing = json.load(f)

exist_words = set(w.upper() for w in existing['words'])
exist_pairs = set(p.upper() for p in existing['pairs'])

# Pool of 50 candidate fresh CCAT vocabulary words
candidate_vocab = [
  {"word": "ABSTRUSE", "type": "antonym", "correct": "Clear", "distractors": ["Obscure", "Arcane", "Esoteric", "Recondite"], "expl": "Abstruse means difficult to understand; obscure. Clear is its direct antonym."},
  {"word": "ACERBIC", "type": "antonym", "correct": "Sweet", "distractors": ["Sharp", "Caustic", "Biting", "Mordant"], "expl": "Acerbic means sharp and forthright, or tasting sour/bitter. Sweet is opposite."},
  {"word": "ANACHRONISTIC", "type": "antonym", "correct": "Timely", "distractors": ["Outdated", "Archaic", "Antiquated", "Obsolete"], "expl": "Anachronistic means belonging or appropriate to an earlier period; chronologically misplaced."},
  {"word": "AVER", "type": "antonym", "correct": "Deny", "distractors": ["Assert", "Declare", "Maintain", "Affirm"], "expl": "Aver means to state or assert to be the case. Deny is the opposite."},
  {"word": "BLANDISHMENT", "type": "antonym", "correct": "Criticism", "distractors": ["Flattery", "Coaxing", "Cajolery", "Enticement"], "expl": "Blandishment means flattering or pleasing statements or actions used to persuade. Criticism is opposite."},
  {"word": "BOMBASTIC", "type": "antonym", "correct": "Understated", "distractors": ["Pompous", "Grandiose", "Pretentious", "Ostentatious"], "expl": "Bombastic means high-sounding but with little meaning; inflated. Understated is opposite."},
  {"word": "CALUMNY", "type": "antonym", "correct": "Praise", "distractors": ["Slander", "Defamation", "Libel", "Aspersion"], "expl": "Calumny is the making of false and defamatory statements in order to damage someone's reputation."},
  {"word": "CASTIGATE", "type": "antonym", "correct": "Commend", "distractors": ["Reprimand", "Chastise", "Rebuke", "Admonish"], "expl": "Castigate means reprimand severely. Commend means praise formally or officially."},
  {"word": "CHICANERY", "type": "antonym", "correct": "Honesty", "distractors": ["Deception", "Trickery", "Subterfuge", "Duplicity"], "expl": "Chicanery means the use of trickery to achieve a political, financial, or legal purpose."},
  {"word": "CIRCUMSLOCUTION", "type": "antonym", "correct": "Directness", "distractors": ["Verbosity", "Prolixity", "Periphrasis", "Evasion"], "expl": "Circumlocution is the use of many words where fewer would do. Directness is opposite."},
  {"word": "CURSORY", "type": "antonym", "correct": "Thorough", "distractors": ["Perfunctory", "Hasty", "Superficial", "Brief"], "expl": "Cursory means hasty and therefore not thorough or detailed."},
  {"word": "DELETERIOUS", "type": "antonym", "correct": "Beneficial", "distractors": ["Harmful", "Damaging", "Detrimental", "Inimical"], "expl": "Deleterious means causing harm or damage. Beneficial is its opposite."},
  {"word": "DESULTORY", "type": "antonym", "correct": "Methodical", "distractors": ["Aimless", "Unsystematic", "Haphazard", "Discursive"], "expl": "Desultory means lacking a plan, purpose, or enthusiasm. Methodical is systematic."},
  {"word": "DIATRIBE", "type": "antonym", "correct": "Panegyric", "distractors": ["Tirade", "Harangue", "Invective", "Denunciation"], "expl": "Diatribe is a forceful and bitter verbal attack. Panegyric is a speech or text in praise of someone."},
  {"word": "DISPARATE", "type": "antonym", "correct": "Homogeneous", "distractors": ["Different", "Dissimilar", "Divergent", "Incongruous"], "expl": "Disparate means essentially different in kind; not allowing comparison."},
  {"word": "DOGMATIC", "type": "antonym", "correct": "Flexible", "distractors": ["Opinionated", "Doctrinaire", "Assertive", "Inflexible"], "expl": "Dogmatic means inclined to lay down principles as incontrovertibly true without evidence."},
  {"word": "EBULLIENT", "type": "antonym", "correct": "Depressed", "distractors": ["Exuberant", "Buoyant", "Cheerful", "Joyful"], "expl": "Ebullient means cheerful and full of energy. Depressed is opposite."},
  {"word": "ENERVATE", "type": "antonym", "correct": "Invigorate", "distractors": ["Weaken", "Debilitate", "Exhaust", "Fatigue"], "expl": "Enervate means to cause someone to feel drained of energy or vitality; weaken."},
  {"word": "EQUITABLE", "type": "antonym", "correct": "Biased", "distractors": ["Fair", "Just", "Impartial", "Evenhanded"], "expl": "Equitable means fair and impartial. Biased is unfair."},
  {"word": "ESOTERIC", "type": "antonym", "correct": "Commonplace", "distractors": ["Arcane", "Obscure", "Recondite", "Cryptic"], "expl": "Esoteric means intended for or likely to be understood by only a small number of people."},
  {"word": "EXIGENT", "type": "antonym", "correct": "Trifling", "distractors": ["Pressing", "Urgent", "Demanding", "Crucial"], "expl": "Exigent means pressing; demanding. Trifling means unimportant or trivial."},
  {"word": "EXTRANEOUS", "type": "antonym", "correct": "Intrinsic", "distractors": ["Irrelevant", "Immaterial", "External", "Extrinsic"], "expl": "Extraneous means irrelevant or unrelated to the subject being dealt with; external."},
  {"word": "FATUOUS", "type": "antonym", "correct": "Sensible", "distractors": ["Silly", "Foolish", "Inane", "Vacuous"], "expl": "Fatuous means silly and pointless. Sensible means having or showing good sense or judgment."},
  {"word": "FECUND", "type": "antonym", "correct": "Barren", "distractors": ["Fertile", "Fruitful", "Prolific", "Productive"], "expl": "Fecund means producing or capable of producing an abundance of offspring or new growth; fertile."},
  {"word": "FRACTIOUS", "type": "antonym", "correct": "Docile", "distractors": ["Irritable", "Quarrelsome", "Peevish", "Rowdy"], "expl": "Fractious means irritable and quarrelsome; difficult to control. Docile means ready to accept control."},
  {"word": "GRANDILOQUENT", "type": "antonym", "correct": "Modest", "distractors": ["Pompous", "Bombastic", "Pretentious", "Flamboyant"], "expl": "Grandiloquent means pompous or extravagant in language, style, or manner."},
  {"word": "HEGEMONY", "type": "synonym", "correct": "Dominance", "distractors": ["Subordination", "Servitude", "Weakness", "Inferiority"], "expl": "Hegemony is leadership or dominance, especially by one country or social group over others."},
  {"word": "ICONOCLAST", "type": "antonym", "correct": "Conformist", "distractors": ["Rebel", "Dissenter", "Heretic", "Nonconformist"], "expl": "An iconoclast is a person who attacks cherished beliefs or institutions. Conformist is opposite."},
  {"word": "IMPECUNIOUS", "type": "antonym", "correct": "Affluent", "distractors": ["Penniless", "Impoverished", "Destitute", "Needy"], "expl": "Impecunious means having little or no money. Affluent means wealthy."},
  {"word": "INCHOATE", "type": "antonym", "correct": "Formed", "distractors": ["Rudimentary", "Inceptive", "Undeveloped", "Nascent"], "expl": "Inchoate means just begun and so not fully formed or developed. Formed is complete."},
  {"word": "INDOLENT", "type": "antonym", "correct": "Diligent", "distractors": ["Lazy", "Slothful", "Idle", "Inactive"], "expl": "Indolent means wanting to avoid activity or exertion; lazy. Diligent is hard-working."},
  {"word": "INTRANSIGENT", "type": "antonym", "correct": "Yielding", "distractors": ["Uncompromising", "Inflexible", "Obstinate", "Unyielding"], "expl": "Intransigent means unwilling or refusing to change one's views or agree about something."},
  {"word": "INVIDIOUS", "type": "antonym", "correct": "Desirable", "distractors": ["Unpleasant", "Obnoxious", "Hateful", "Offensive"], "expl": "Invidious means likely to arouse or incur resentment or anger in others. Desirable is pleasant."},
  {"word": "LACONIC", "type": "antonym", "correct": "Loquacious", "distractors": ["Brief", "Terse", "Succinct", "Concise"], "expl": "Laconic means using very few words. Loquacious means talkative."},
  {"word": "LIMPID", "type": "antonym", "correct": "Turbid", "distractors": ["Clear", "Lucid", "Transparent", "Pellucid"], "expl": "Limpid means completely clear and transparent. Turbid means cloudy or murky."},
  {"word": "LOQUACIOUS", "type": "antonym", "correct": "Taciturn", "distractors": ["Talkative", "Voluble", "Garrulous", "Chatty"], "expl": "Loquacious means tending to talk a great deal; talkative. Taciturn means quiet and reserved."},
  {"word": "LUGUBRIOUS", "type": "antonym", "correct": "Cheerful", "distractors": ["Mournful", "Gloomy", "Dismal", "Melancholy"], "expl": "Lugubrious means looking or sounding sad and dismal. Cheerful is happy."},
  {"word": "MALADROIT", "type": "antonym", "correct": "Adroit", "distractors": ["Clumsy", "Bungling", "Awkward", "Inept"], "expl": "Maladroit means inefficient or clumsy. Adroit means clever or skillful in using the hands or mind."},
  {"word": "MAUDLIN", "type": "antonym", "correct": "Stoic", "distractors": ["Sentimental", "Weepy", "Emotional", "Overemotional"], "expl": "Maudlin means self-pityingly or tearfully sentimental. Stoic is unaffected by emotional excess."},
  {"word": "MENDACIOUS", "type": "antonym", "correct": "Veracious", "distractors": ["Untruthful", "Dishonest", "Deceitful", "False"], "expl": "Mendacious means not telling the truth; lying. Veracious means speaking or representing the truth."},
  {"word": "MERCURIAL", "type": "antonym", "correct": "Constant", "distractors": ["Volatile", "Capricious", "Fickle", "Temperamental"], "expl": "Mercurial means subject to sudden or unpredictable changes of mood or mind."},
  {"word": "NADIR", "type": "antonym", "correct": "Zenith", "distractors": ["Bottom", "Depth", "Base", "Foot"], "expl": "Nadir is the lowest point in the fortunes of a person or organization. Zenith is the highest peak."},
  {"word": "OBSEQUIOUS", "type": "antonym", "correct": "Domineering", "distractors": ["Servile", "Ingratiating", "Sycophantic", "Fawning"], "expl": "Obsequious means obedient or attentive to an excessive or servile degree. Domineering is opposite."},
  {"word": "OSTENTATIOUS", "type": "antonym", "correct": "Modest", "distractors": ["Showy", "Pretentious", "Flamboyant", "Gaudy"], "expl": "Ostentatious means characterized by vulgar or pretentious display. Modest is unassuming."},
  {"word": "PANACEA", "type": "synonym", "correct": "Cure-all", "distractors": ["Poison", "Bane", "Disease", "Contagion"], "expl": "Panacea is a solution or remedy for all difficulties or diseases; a cure-all."},
  {"word": "PARIAH", "type": "antonym", "correct": "Favorite", "distractors": ["Outcast", "Leper", "Recluse", "Untouchable"], "expl": "Pariah is an outcast. Favorite is a person preferred before others."},
  {"word": "PAUCITY", "type": "antonym", "correct": "Surfeit", "distractors": ["Scarcity", "Dearth", "Shortage", "Lack"], "expl": "Paucity is the presence of something only in small or insufficient quantities. Surfeit is an excess."},
  {"word": "PELLUCID", "type": "antonym", "correct": "Opaque", "distractors": ["Translucent", "Clear", "Limpid", "Transparent"], "expl": "Pellucid means translucently clear or easily understood. Opaque means not transparent or hard to understand."},
  {"word": "PENURIOUS", "type": "antonym", "correct": "Opulent", "distractors": ["Destitute", "Penniless", "Miserly", "Indigent"], "expl": "Penurious means extremely poor or poverty-stricken. Opulent means wealthy and luxurious."},
  {"word": "PERFIDIOUS", "type": "antonym", "correct": "Loyal", "distractors": ["Treacherous", "Deceitful", "Disloyal", "Faithless"], "expl": "Perfidious means deceitful and untrustworthy. Loyal means giving or showing firm and constant support."},
  {"word": "SAGACITY", "type": "antonym", "correct": "Stupidity", "distractors": ["Wisdom", "Prudence", "Foresight", "Discernment"], "expl": "Sagacity means the quality of being keen in judgment. Stupidity is lack of intelligence or reason."},
  {"word": "SEDULOUS", "type": "antonym", "correct": "Indolent", "distractors": ["Diligent", "Careful", "Attentive", "Assiduous"], "expl": "Sedulous means showing dedication and diligence. Indolent means lazy."},
  {"word": "SANGUINE", "type": "antonym", "correct": "Pessimistic", "distractors": ["Optimistic", "Hopeful", "Buoyant", "Confident"], "expl": "Sanguine means optimistic or positive, especially in an apparently bad or difficult situation."},
  {"word": "SPURIOUS", "type": "antonym", "correct": "Authentic", "distractors": ["Bogus", "Fake", "Phony", "Counterfeit"], "expl": "Spurious means not being what it purports to be; false or fake. Authentic is genuine."},
  {"word": "SURREPTITIOUS", "type": "antonym", "correct": "Overt", "distractors": ["Secretive", "Clandestine", "Covert", "Stealthy"], "expl": "Surreptitious means kept secret, especially because it would not be approved of. Overt is open and undisguised."}
]

fresh_vocab = []
for c in candidate_vocab:
    if c['word'].upper() not in exist_words:
        fresh_vocab.append(c)
        exist_words.add(c['word'].upper())
    if len(fresh_vocab) == 42:
        break

print(f"Selected {len(fresh_vocab)} strictly unique vocab words (target: 42).")

# Candidate analogies
candidate_analogies = [
  {"pair": "ABACUS : CALCULATOR", "correct": "PAPYRUS : TABLET", "distractors": ["COMPASS : DIRECTION", "SCYTHE : TRACTOR", "INK : PEN", "CHALK : BLACKBOARD"], "expl": "An abacus is the ancient precursor to a digital calculator, just as papyrus is the precursor to an electronic tablet."},
  {"pair": "ORCHESTRA : SYMPHONY", "correct": "TROUPE : PLAY", "distractors": ["CANVAS : PAINTING", "SCULPTOR : MARBLE", "LIBRARY : NOVEL", "STAGE : CURTAIN"], "expl": "An orchestra performs a symphony, just as an acting troupe performs a play."},
  {"pair": "SEDATIVE : DROWSINESS", "correct": "ANESTHETIC : NUMBNESS", "distractors": ["VACCINE : VIRUS", "POISON : REMEDY", "ASPIRIN : HEADACHE", "STIMULANT : FATIGUE"], "expl": "A sedative induces drowsiness, just as an anesthetic induces numbness."},
  {"pair": "INSULATOR : CURRENT", "correct": "DAM : FLOOD", "distractors": ["CONDUCTOR : COPPER", "CIRCUIT : VOLTAGE", "RESISTOR : HEAT", "BATTERY : CHARGE"], "expl": "An insulator prevents the flow of electrical current, just as a dam blocks water flow."},
  {"pair": "ARCHIVE : DOCUMENT", "correct": "VAULT : TREASURE", "distractors": ["CATALOG : STORE", "MUSEUM : TOURIST", "LEDGER : DEBT", "EASEL : CANVAS"], "expl": "An archive is a repository for documents, just as a vault stores treasures."},
  {"pair": "PROTRACTOR : ANGLE", "correct": "BAROMETER : PRESSURE", "distractors": ["RULER : CIRCLE", "CALIPER : WEIGHT", "PENDULUM : SPEED", "SCALE : DISTANCE"], "expl": "A protractor measures angles, just as a barometer measures atmospheric pressure."},
  {"pair": "FORGE : SMITH", "correct": "KILN : POTTER", "distractors": ["ANVIL : HAMMER", "EASEL : CANVAS", "FURNACE : COAL", "STUDIO : ACTOR"], "expl": "A forge is the thermal workplace of a blacksmith, just as a kiln is for a potter."},
  {"pair": "TENON : MORTISE", "correct": "KEY : LOCK", "distractors": ["NAIL : HAMMER", "BOLT : WASHER", "DOWEL : DRILL", "JOINT : WOOD"], "expl": "A tenon fits precisely into a mortise, just as a key fits into a lock."},
  {"pair": "RETINA : EYE", "correct": "COCHLEA : EAR", "distractors": ["PUPIL : CORNEA", "EARDRUM : AUDIOLOGY", "LENS : FOCUS", "NEURON : BRAIN"], "expl": "The retina is the sensory transducer of the eye, just as the cochlea is of the ear."},
  {"pair": "INDURATE : HARDEN", "correct": "OSSIFY : CALCIFY", "distractors": ["SOFTEN : MELT", "FLEX : BEND", "EVAPORATE : CONDENSE", "FREEZE : THAW"], "expl": "Indurate means harden; ossify means calcify into bone."},
  {"pair": "FRESCO : PLASTER", "correct": "MOSAIC : TILE", "distractors": ["STATUE : MARBLE", "OIL : CANVAS", "ETCHING : ACID", "CARVING : CHISEL"], "expl": "A fresco is executed upon plaster, just as a mosaic is made from tiles."},
  {"pair": "FUSELAGE : AIRPLANE", "correct": "HULL : VESSEL", "distractors": ["PROPELLER : ENGINE", "RUDDER : NAVIGATION", "COCKPIT : FLIGHT", "WING : AILERON"], "expl": "The fuselage is the central body of an aircraft, just as the hull is of a vessel."},
  {"pair": "STETHOSCOPE : PHYSICIAN", "correct": "THEODOLITE : SURVEYOR", "distractors": ["MICROSCOPE : PATIENT", "SCALPEL : NURSE", "THERMOMETER : CLINIC", "CHART : RECORD"], "expl": "A stethoscope is used by a physician, just as a theodolite is used by a surveyor."},
  {"pair": "HARBOR : FLEET", "correct": "HANGAR : SQUADRON", "distractors": ["DOCK : CRUISE", "ANCHOR : SHIP", "RUNWAY : TAKEOFF", "PORT : CARGO"], "expl": "A harbor shelters a naval fleet, just as a hangar shelters an aircraft squadron."},
  {"pair": "PHILATELIST : STAMPS", "correct": "NUMISMATIST : COINS", "distractors": ["CURATOR : ART", "BIBLIOPHILE : LIBRARIES", "ANTHOLOGIST : POEMS", "BOTANIST : GARDENS"], "expl": "A philatelist collects stamps, just as a numismatist collects coins."},
  {"pair": "SEMAPHORE : SIGNAL", "correct": "PAPYRUS : SCRIPT", "distractors": ["BEACON : SHIP", "TELEGRAPH : CODE", "LIGHTHOUSE : ROCK", "ANTENNA : RADIO"], "expl": "A semaphore is a visual system for conveying signals, just as papyrus is a physical medium for recording script."},
  {"pair": "CHISEL : SCULPTOR", "correct": "AWL : COBBLER", "distractors": ["HAMMER : CARPENTER", "NEEDLE : THREAD", "BRUSH : EASEL", "PLOW : FIELD"], "expl": "A chisel is the distinctive shaping tool of a sculptor, just as an awl is the distinctive piercing tool of a cobbler."},
  {"pair": "ASTRONOMY : STARS", "correct": "ORNITHOLOGY : BIRDS", "distractors": ["ASTROLOGY : PLANETS", "BOTANY : ANIMALS", "GEOLOGY : MAPS", "ENTOMOLOGY : FISH"], "expl": "Astronomy is the scientific study of stars, just as ornithology is the scientific study of birds."},
  {"pair": "REFRACTORY : HEAT", "correct": "IMPERVIOUS : WATER", "distractors": ["CONDUCTIVE : ELECTRICITY", "MALLEABLE : METAL", "BRITTLE : GLASS", "FLAMMABLE : FIRE"], "expl": "Refractory materials resist heat, just as impervious materials resist water/penetration."},
  {"pair": "PEDOMETER : STEPS", "correct": "ODOMETER : DISTANCE", "distractors": ["SPEEDOMETER : ACCELERATION", "THERMOMETER : WEATHER", "BAROMETER : ALTITUDE", "CHRONOMETER : DATE"], "expl": "A pedometer measures footsteps taken, just as an odometer measures distance traveled."},
  {"pair": "GAVEL : JUDGE", "correct": "BATON : CONDUCTOR", "distractors": ["WHISTLE : POLICE", "ROBE : LAWYER", "BENCH : COURT", "PODIUM : SPEAKER"], "expl": "A gavel is wielded by a judge to command order, just as a baton is wielded by an orchestra conductor."},
  {"pair": "INCISION : SURGEON", "correct": "FURROW : FARMER", "distractors": ["BANDAGE : PATIENT", "SCALPEL : HOSPITAL", "PLOW : TRACTOR", "HARVEST : CROP"], "expl": "An incision is a precise cut made by a surgeon, just as a furrow is a precise trench made in the soil by a farmer."},
  {"pair": "EPITAPH : TOMBSTONE", "correct": "INSCRIPTION : MONUMENT", "distractors": ["OBITUARY : NEWSPAPER", "EULOGY : GRAVE", "PLAQUE : BRONZE", "SCROLL : ANCIENT"], "expl": "An epitaph is commemorative text carved on a tombstone, just as an inscription is commemorative text carved on a monument."},
  {"pair": "SPATULA : CHEF", "correct": "TROWEL : BRICKLAYER", "distractors": ["FORK : DINER", "PAN : STOVE", "KNIFE : KITCHEN", "OVEN : BAKER"], "expl": "A spatula is a handheld tool used by a chef to spread or lift, just as a trowel is used by a bricklayer to spread mortar."},
  {"pair": "QUIVER : ARROW", "correct": "HOLSTER : PISTOL", "distractors": ["BOW : TARGET", "SHIELD : SWORD", "SHEATH : DAGGER", "ARMOR : KNIGHT"], "expl": "A quiver holds and carries arrows, just as a holster holds and carries a pistol."},
  {"pair": "LUBRICANT : FRICTION", "correct": "MUFFLER : NOISE", "distractors": ["MOTOR : SPEED", "BRAKE : CAR", "OIL : ENGINE", "HEAT : ENERGY"], "expl": "A lubricant reduces mechanical friction, just as a muffler reduces acoustic noise."},
  {"pair": "MICROSCOPE : MICROBE", "correct": "TELESCOPE : NEBULA", "distractors": ["CAMERA : PICTURE", "LENS : LIGHT", "MIRROR : REFLECTION", "PERISCOPE : SUBMARINE"], "expl": "A microscope is an optical instrument used to observe microbes, just as a telescope is used to observe distant nebulae."}
]

fresh_analogies = []
for c in candidate_analogies:
    if c['pair'].upper() not in exist_pairs:
        fresh_analogies.append(c)
        exist_pairs.add(c['pair'].upper())
    if len(fresh_analogies) == 22:
        break

print(f"Selected {len(fresh_analogies)} strictly unique analogies (target: 22).")

# Save the final validated pack
with open('scripts/fresh_verbal_pack.json', 'w') as f:
    json.dump({
        'vocab': fresh_vocab,
        'analogies': fresh_analogies
    }, f, indent=2)

print("Saved scripts/fresh_verbal_pack.json")
