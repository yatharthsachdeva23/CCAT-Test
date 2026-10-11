import json
import re

# 1. Load exclusions from Tests 1-30
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)

with open('src/data/verbalBank.js', 'r', encoding='utf-8') as f:
    vb_raw = f.read()

excluded_pairs = set()
for q in t1_30:
    for p in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', json.dumps(q)):
        excluded_pairs.add(f"{p[0].upper()} : {p[1].upper()}")

for p in re.findall(r'([A-Za-z]+)\s*:\s*([A-Za-z]+)', vb_raw):
    excluded_pairs.add(f"{p[0].upper()} : {p[1].upper()}")

BANNED_WORDS = {
    'STANZA', 'POEM', 'POET', 'POETRY', 'SCULPTOR', 'SCULPTURE',
    'GALVANOMETER', 'SEXTANT', 'CHISEL', 'SCALPEL', 'SURGEON',
    'BAROMETER', 'TELESCOPE', 'ASTRONOMER', 'COMPASS', 'ASTROLABE'
}

import sys
sys.path.insert(0, 'scripts')
from unique_analogies_data import ANALOGY_DATA

# 2. Extract retained clean analogies from ANALOGY_DATA
retained = []
retained_stems = set()
retained_corrects = set()
flagged_indices = []

for idx, item in enumerate(ANALOGY_DATA):
    stem, correct, dists, expl = item
    all_text = f"{stem} {correct} {' '.join(dists)} {expl}".upper()
    has_banned = any(re.search(r'\b' + bw + r'\b', all_text) for bw in BANNED_WORDS)
    in_pairs = (stem.upper() in excluded_pairs or correct.upper() in excluded_pairs or any(d.upper() in excluded_pairs for d in dists))
    is_dup = stem in retained_stems
    
    if not has_banned and not in_pairs and not is_dup:
        retained.append((idx, item))
        retained_stems.add(stem)
        retained_corrects.add(correct)
    else:
        flagged_indices.append(idx)

print(f"Retained clean items: {len(retained)}")
print(f"Flagged items to replace: {len(flagged_indices)} (Need {len(flagged_indices)} new unique analogies)")

# 3. Create fresh candidate analogies that do not collide with retained_stems, retained_corrects, excluded_pairs, or BANNED_WORDS
FRESH_CANDIDATES = [
    (
        "ICHTHYOLOGIST : FISH",
        "ENTOMOLOGIST : INSECTS",
        ["AQUARIUM : TANK", "NET : CATCH", "BAIT : HOOK", "SCALE : FIN"],
        "An ichthyologist scientifically studies fish, just as an entomologist studies insects."
    ),
    (
        "VEXILLOLOGIST : FLAGS",
        "NUMISMATIST : MEDALLIONS",
        ["CLOTH : BANNER", "NATION : EMBLEM", "POLE : ROPE", "CREST : SHIELD"],
        "A vexillologist studies flags and banners, just as a numismatist studies coins and medallions."
    ),
    (
        "DENDROLOGIST : TREES",
        "BRYOLOGIST : MOSSES",
        ["BARK : WOOD", "FOREST : TRAIL", "BRANCH : TWIG", "LEAF : VEIN"],
        "A dendrologist studies trees, just as a bryologist studies mosses."
    ),
    (
        "ETIOLOGIST : CAUSES",
        "GENEALOGIST : LINEAGES",
        ["DISEASE : REMEDY", "HISTORY : TIME", "ORIGIN : SOURCE", "CLINIC : PATIENT"],
        "An etiologist determines the causes of conditions, just as a genealogist traces family lineages."
    ),
    (
        "CETOLOGIST : WHALES",
        "HERPETOLOGIST : REPTILES",
        ["OCEAN : DEPTH", "POD : WATER", "SWIM : DIVE", "BLUBBER : COAT"],
        "A cetologist specializes in whales, just as a herpetologist specializes in reptiles."
    ),
    (
        "MULLION : WINDOWPANE",
        "STANCHION : BANISTER",
        ["GLASS : FRAME", "DOOR : HINGE", "WALL : BRICK", "CEILING : BEAM"],
        "A mullion is a vertical dividing member supporting adjacent windowpanes, just as a stanchion supports a banister."
    ),
    (
        "RIVET : GIRDER",
        "MORTISE : TENON",
        ["STUD : PLATE", "STEEL : METAL", "BEAM : COLUMN", "BRIDGE : SPAN"],
        "A rivet permanently fastens a structural girder, just as a mortise secures a tenon."
    ),
    (
        "PURLIN : RAFTER",
        "CLEAT : WHARF",
        ["ROOF : SHINGLE", "ATTIC : FLOOR", "TRUSS : TIMBER", "EAVES : GUTTER"],
        "A purlin provides horizontal structural support across rafters, just as a cleat secures vessels to a wharf."
    ),
    (
        "GASKET : CYLINDER",
        "WASHER : SCREW",
        ["ENGINE : MOTOR", "OIL : PRESSURE", "VALVE : TUBE", "METAL : SHIELD"],
        "A gasket forms a tight mechanical seal between cylinder faces, just as a washer distributes screw load."
    ),
    (
        "LUG : FLANGE",
        "COTTER PIN : AXLE",
        ["RIM : TIRE", "NUT : WRENCH", "HUB : BEARING", "WHEEL : SPOKE"],
        "A lug fastens a flange assembly, just as a cotter pin secures an axle."
    ),
    (
        "STRUT : CHASSIS",
        "SPAR : WING",
        ["FRAME : SHOCK", "ROAD : TIRES", "TRUCK : CAB", "BODY : FENDER"],
        "A strut provides vital diagonal bracing to a vehicle chassis, just as a spar reinforces an aircraft wing."
    ),
    (
        "CLEAT : HAUSER",
        "CHOCK : WHEEL",
        ["ROPE : KNOT", "PIER : LINE", "ANCHOR : CHAIN", "SAIL : MAST"],
        "A cleat anchors a mooring hauser line, just as a chock stabilizes a vehicle wheel."
    ),
    (
        "MURMUR : BELLOW",
        "TINKLE : PEAL",
        ["VOICE : THROAT", "SOUND : NOISE", "CALL : ECHO", "WHISPER : TONE"],
        "To murmur is a soft vocalization whereas to bellow is loud, just as a tinkle is faint compared to a resonant peal."
    ),
    (
        "GLIMMER : BLAZE",
        "DRIZZLE : MONSOON",
        ["LIGHT : SPARK", "SUN : FLAME", "SHINE : GLOW", "TORCH : BEAM"],
        "A glimmer is a faint burst of light compared to a blaze, just as a drizzle is minor compared to a monsoon."
    ),
    (
        "RIPPLE : TIDAL WAVE",
        "NUDGE : THRUST",
        ["WATER : LAKE", "WAVE : SURF", "OCEAN : TIDE", "SPLASH : DROP"],
        "A ripple is a mild aquatic disturbance compared to a tidal wave, just as a nudge is gentle compared to a thrust."
    ),
    (
        "BREEZE : TYPHOON",
        "SHIVER : CONVULSION",
        ["WIND : GUST", "AIR : CLOUD", "STORM : RAIN", "CURRENT : DRIFT"],
        "A breeze is a gentle current compared to a typhoon, just as a shiver is minor compared to a convulsion."
    ),
    (
        "TAP : SLAM",
        "PINPRICK : LACERATION",
        ["DOOR : KNOB", "HAND : KNOCK", "HIT : PUNCH", "WOOD : PANEL"],
        "A tap is a gentle impact compared to a heavy slam, just as a pinprick is mild compared to a deep laceration."
    ),
    (
        "HUMIDOR : CIGARS",
        "HERBARIUM : BOTANICAL SPECIMENS",
        ["SMOKE : BOX", "TOBACCO : LEAF", "CEDAR : WOOD", "MOISTURE : AIR"],
        "A humidor is a climate-controlled repository for cigars, just as a herbarium preserves botanical specimens."
    ),
    (
        "OSSIARY : SKELETONS",
        "ARCHIVE : CODICES",
        ["TOMB : GRAVE", "VAULT : STONE", "BURIAL : DUST", "CRYPT : SHADOW"],
        "An ossiary is a repository specifically for skeletons, just as an archive preserves ancient codices."
    ),
    (
        "RELIQUARY : RELICS",
        "OENOTHEQUE : VINTAGES",
        ["ALTAR : TEMPLE", "SHRINE : GOLD", "CHEST : LOCK", "MEDAL : CASE"],
        "A reliquary is an ornate receptacle holding sacred relics, just as an oenotheque houses choice wine vintages."
    ),
    (
        "COLUMBARIUM : URNS",
        "NUMISMATARIUM : MEDALS",
        ["CEMETERY : PARK", "MEMORIAL : MONUMENT", "MARBLE : NICHE", "ASHES : DUST"],
        "A columbarium is a structure designed to house funerary urns, just as a numismatarium holds rare medals."
    ),
    (
        "VIVARIUM : AMPHIBIANS",
        "APIARY : HIVES",
        ["TERRARIUM : MOSS", "ENCLOSURE : WIRE", "ANIMAL : FEED", "HABITAT : NATURE"],
        "A vivarium houses living amphibians in simulated habitats, just as an apiary accommodates managed bee colonies."
    ),
    (
        "DESICCANT : MOISTURE",
        "NEUTRALIZER : ACIDITY",
        ["PACKET : SILICA", "DRY : HUMID", "AIR : SEAL", "WATER : DROP"],
        "A desiccant absorbs ambient moisture, just as a chemical neutralizer mitigates acidity."
    ),
    (
        "HEMOSTAT : HEMORRHAGE",
        "GOVERNOR : OVERSPEED",
        ["CLAMP : VEIN", "BLOOD : WOUND", "BANDAGE : GAUZE", "FORCEPS : METAL"],
        "A hemostat stops bleeding during surgery, just as a mechanical governor prevents machine overspeed."
    ),
    (
        "BAFFLE : RESONANCE",
        "FILTER : TURBIDITY",
        ["WALL : ECHO", "ACOUSTICS : SOUND", "FOAM : PANEL", "CHAMBER : AIR"],
        "An acoustic baffle suppresses unwanted resonance, just as a fluid filter eliminates suspended turbidity."
    ),
    (
        "LIGNIN : CELL WALL",
        "COLLAGEN : CARTILAGE",
        ["PLANT : STEM", "WOOD : CELLULOSE", "FIBER : BARK", "SAP : TREE"],
        "Lignin provides essential structural stiffness to plant cell walls, just as collagen reinforces cartilage."
    ),
    (
        "ENAMEL : TOOTH",
        "CRUST : PLANET",
        ["BITE : JAW", "DENTIN : ROOT", "CROWN : SMILE", "CALCIUM : BONE"],
        "Enamel forms the protective outer surface layer of a tooth, just as a crust encases a terrestrial planet."
    ),
    (
        "MYELIN : AXON",
        "SHEATH : CABLE",
        ["NERVE : IMPULSE", "BRAIN : NEURON", "SYNAPSE : SIGNAL", "CELL : TISSUE"],
        "Myelin insulates neural axons for signal transmission, just as an elastomeric sheath insulates an electrical cable."
    ),
    (
        "CHITIN : EXOSKELETON",
        "KERATIN : HOOF",
        ["SHELL : CRAB", "INSECT : BEETLE", "CLAW : PAW", "PROTEIN : AMINO"],
        "Chitin constitutes the primary structural polysaccharide of an arthropod exoskeleton, just as keratin forms hooves."
    ),
    (
        "SPORE : MUSHROOM",
        "SEED : CONIFER",
        ["FUNGI : CAP", "GILL : STEM", "DIRT : GROUND", "MOSS : PATCH"],
        "A spore is the basic reproductive dispersion agent of a mushroom, just as a seed is of a conifer."
    ),
    (
        "APHORISM : BREVITY",
        "EULOGY : COMMEMORATION",
        ["PROVERB : TRUTH", "SPEECH : VOICE", "ESSAY : THESIS", "DICTUM : LAW"],
        "An aphorism is characterized inherently by brevity, just as a eulogy is defined by commemoratory purpose."
    ),
    (
        "MOSAIC : TESSERAE",
        "INTARSIA : WOOD PIECES",
        ["CLAY : TILE", "MARBLE : BLOCK", "PAINT : BRUSH", "GLASS : SHARD"],
        "A mosaic is composed of small inlaid tesserae tiles, just as intarsia is crafted from precisely cut wood pieces."
    ),
    (
        "SERIGRAPHY : STENCIL",
        "XYLOGRAPHY : WOODBLOCK",
        ["CANVAS : EASEL", "INK : ROLLER", "PAPER : PRESS", "PENCIL : SKETCH"],
        "Serigraphy uses a stencil mesh to apply ink, just as xylography prints from a carved woodblock."
    ),
    (
        "SCAFFOLD : FAÇADE",
        "CRIB : FOUNDATION",
        ["LADDER : ROOF", "BRICK : MORTAR", "WORKER : HARDHAT", "BEAM : COLUMN"],
        "A scaffold provides temporary working access to a building façade, just as cribbing supports deep foundation work."
    ),
    (
        "BALLAST : KEEL",
        "OUTRIGGER : CANOE",
        ["WATER : HULL", "SHIP : DECK", "SAIL : MAST", "RUDDER : HELM"],
        "Ballast maintains rotational stability along a vessel's keel, just as an outrigger stabilizes a slender canoe."
    ),
    (
        "TURBINE : IMPELLER",
        "VENTILATOR : LOUVER",
        ["STEAM : POWER", "MOTOR : SHAFT", "ROTOR : STATOR", "ENERGY : WORK"],
        "A turbine houses an impeller to extract fluid kinematic energy, just as a ventilator regulates air flow via louvers."
    ),
    (
        "HYGROMETER : RELATIVE MOISTURE",
        "PYROMETER : EXTREME TEMPERATURE",
        ["GAUGE : DIAL", "SENSOR : PROBE", "NEEDLE : SCALE", "AIR : HUMID"],
        "A hygrometer quantifies ambient relative moisture, just as an optical pyrometer registers extreme temperatures."
    ),
    (
        "CHONDROCYTE : CARTILAGE",
        "OSTEOCYTE : BONE",
        ["BLOOD : VEIN", "SKIN : TISSUE", "MARROW : STEM", "MUSCLE : TENDON"],
        "A chondrocyte is a mature cell that forms cartilage, just as an osteocyte maintains bone matrix."
    ),
    (
        "HYDROLOGIST : AQUIFERS",
        "SEISMOLOGIST : TREMORS",
        ["WELL : PUMP", "RIVER : BED", "DIRT : LAYER", "MAP : CONTOUR"],
        "A hydrologist studies subterranean aquifers, just as a seismologist analyzes tectonic tremors."
    ),
    (
        "PECCADILLO : OFFENSE",
        "TRIVIA : KNOWLEDGE",
        ["ERROR : BLUNDER", "FAULT : FLAW", "SIN : CRIME", "MISTAKE : SLIP"],
        "A peccadillo is a trifling, minor offense, just as trivia represents minor, non-essential knowledge."
    ),
    (
        "PELT : OTTER",
        "PLUMAGE : PEACOCK",
        ["FUR : COAT", "SKIN : PORE", "SCALE : LIZARD", "CLAW : PAW"],
        "A pelt is the distinctive fur covering of an otter, just as plumage is the feather covering of a peacock."
    ),
    (
        "CODDLE : PAMPER",
        "BERATE : REBUKE",
        ["CARE : NURTURE", "PRAISE : CHEER", "LOVE : CHERISH", "PROTECT : GUARD"],
        "To coddle is synonymous in high degree with pampering, just as to berate is to vehemently rebuke."
    ),
    (
        "REFRACTOMETER : INDEX",
        "ANEMOMETER : WIND SPEED",
        ["LIGHT : BEAM", "GLASS : PRISM", "DIAL : GAUGE", "SENSOR : DIGITAL"],
        "A refractometer measures optical refractive index, just as an anemometer measures wind velocity."
    ),
    (
        "DIAGNOSIS : PROGNOSIS",
        "ANALYSIS : FORECAST",
        ["DOCTOR : PATIENT", "CHART : GRAPH", "REPORT : DATA", "EXAM : RESULT"],
        "A diagnosis identifies current status while prognosis predicts the outcome, just as analysis explains current state and forecast predicts."
    ),
    (
        "TETHER : BUOY",
        "MOORING : PONTOON",
        ["ROPE : FLOAT", "OCEAN : WAVE", "ANCHOR : BOTTOM", "WATER : LINE"],
        "A tether secures a floating buoy in place, just as a mooring stabilizes a pontoon."
    ),
    (
        "VOLUTE : CAPITAL",
        "CORBEL : CORNICE",
        ["COLUMN : PILLAR", "STONE : MARBLE", "ARCH : WALL", "BEAM : ROOF"],
        "A volute is an architectural spiral ornament on a column capital, just as a corbel supports a cornice."
    ),
    (
        "COFFER : CEILING",
        "FLUTING : COLUMN",
        ["ROOM : WALL", "WOOD : PANEL", "PLASTER : ORNAMENT", "BEAM : TIMBER"],
        "Coffering is a series of sunken panels decorating a ceiling, just as fluting comprises vertical decorative grooves along a column."
    )
]

print(f"Total fresh candidates defined: {len(FRESH_CANDIDATES)}")

valid_fresh = []
used_stems = set(retained_stems)
used_corrects = set(retained_corrects)

for c_idx, (stem, correct, dists, expl) in enumerate(FRESH_CANDIDATES):
    all_text = f"{stem} {correct} {' '.join(dists)} {expl}".upper()
    has_banned = [bw for bw in BANNED_WORDS if re.search(r'\b' + bw + r'\b', all_text)]
    in_pairs = [p for p in ([stem, correct] + dists) if p.upper() in excluded_pairs]
    stem_dup = stem in used_stems
    corr_dup = correct in used_corrects
    
    if has_banned or in_pairs or stem_dup or corr_dup:
        print(f"Candidate {c_idx} ({stem}) skipped: banned={has_banned}, in_pairs={in_pairs}, stem_dup={stem_dup}, corr_dup={corr_dup}")
    else:
        valid_fresh.append((stem, correct, dists, expl))
        used_stems.add(stem)
        used_corrects.add(correct)

print(f"Valid fresh candidates ready: {len(valid_fresh)} / Needed: {len(flagged_indices)}")

if len(valid_fresh) >= len(flagged_indices):
    # Assemble final 162
    final_162 = [None] * 162
    for idx, item in retained:
        final_162[idx] = item
    for i, flag_idx in enumerate(flagged_indices):
        final_162[flag_idx] = valid_fresh[i]
    
    # Save to pristine_analogies_data.py
    with open('scripts/pristine_analogies_data.py', 'w', encoding='utf-8') as f:
        f.write("#!/usr/bin/env python3\n# 162 100% PRISTINE ANALOGIES\n\nANALOGY_DATA = " + repr(final_162) + "\n")
    print("SUCCESS! Saved scripts/pristine_analogies_data.py with exactly 162 pristine analogies.")
else:
    print("Need more fresh candidates!")
