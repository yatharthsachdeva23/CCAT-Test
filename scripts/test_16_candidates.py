import json
import re

with open('scripts/full_exclusion_dict.json', 'r', encoding='utf-8') as f:
    excl = json.load(f)

old_pairs = set(excl['old_pairs'])
old_words = set(excl['old_words'])

flagged_user_terms = {
    'STANZA', 'POEM', 'SCULPTOR', 'CHISEL', 'GALVANOMETER',
    'SEXTANT', 'BAROMETER', 'THERMOMETER', 'ALTIMETER', 'ANVIL',
    'BLACKSMITH', 'ASTRONOMER', 'TELESCOPE', 'COMPOSER', 'SCORE',
    'ARCHIPELAGO', 'CONSTELLATION', 'CALLOUS', 'EQUIVOCAL',
    'INDEFATIGABLE', 'OBLIVIOUS', 'SLOTH'
}
forbidden_words = old_words.union(flagged_user_terms)

candidates_16 = [
    # 0 (replacing SEXTANT : NAVIGATOR)
    (
        "THEODOLITE : SURVEYOR",
        "CENTRIFUGE : BIOCHEMIST",
        ["MICROSCOPE : SLIDE", "CALIPER : MACHINIST", "PIPETTE : FLASK", "BEAKER : REAGENT"],
        "A theodolite is a specialized optical instrument used by a surveyor, just as a centrifuge is used by a biochemist."
    ),
    # 1 (replacing STANZA : POEM)
    (
        "KEYSTONE : ARCH",
        "RIDGEPOLE : ROOF",
        ["BRICK : MASONRY", "FOUNDATION : PIER", "BUTTRESS : WALL", "CORBEL : FACADE"],
        "A keystone is the central structural locking piece of an arch, just as a ridgepole is the central structural beam of a pitched roof."
    ),
    # 3 (replacing ARCHITECT : BLUEPRINT -> COMPOSER : SCORE)
    (
        "CHOREOGRAPHER : LIBRETTO",
        "CARTOGRAPHER : PROJECTION",
        ["DRAMATURG : PROSCENIUM", "ILLUSTRATOR : LITHOGRAPH", "CALLIGRAPHER : PARCHMENT", "ENGRAVER : BURIN"],
        "A choreographer devises choreography, just as a cartographer constructs a map projection."
    ),
    # 6 (replacing CHISEL : SCULPTOR)
    (
        "ADZE : CARPENTER",
        "MORTAR : APOTHECARY",
        ["PLANE : SHAVING", "HAMMER : NAIL", "SAW : LUMBER", "TROWEL : MASON"],
        "An adze is a specialized cutting tool utilized by a traditional woodworker, just as a mortar is utilized by an apothecary."
    ),
    # 12 (replacing BAROMETER : PRESSURE)
    (
        "MANOMETER : FLUID PRESSURE",
        "PYCNOMETER : SPECIFIC GRAVITY",
        ["HYDROMETER : LIQUID", "BAROGRAPH : TRACE", "PITOT TUBE : AIRSPEED", "GAUGE : DIAL"],
        "A manometer specifically measures fluid pressure, just as a pycnometer measures specific gravity."
    ),
    # 13 (replacing ARCHIPELAGO : ISLAND)
    (
        "CONGLOMERATE : SUBSIDIARY",
        "FEDERATION : PROVINCE",
        ["SYNDICATE : INVESTOR", "ALLIANCE : TREATY", "CARTEL : PRODUCER", "CONSORTIUM : BANK"],
        "A conglomerate is an overarching entity composed of subsidiary companies, just as a federation is composed of constituent provinces."
    ),
    # 18 (replacing GALVANOMETER : CURRENT)
    (
        "VISCOMETER : VISCOSITY",
        "DENSITOMETER : OPTICAL DENSITY",
        ["TACHOMETER : VELOCITY", "CALORIMETER : HEAT", "REFRACTOMETER : INDEX", "SPECTROMETER : LIGHT"],
        "A viscometer measures fluid viscosity, just as a densitometer measures optical density."
    ),
    # 24 (replacing ANVIL : BLACKSMITH)
    (
        "POTTER : WHEEL",
        "GLASSBLOWER : BLOWPIPE",
        ["KILN : CERAMIC", "GLAZE : VESSEL", "FORGE : METAL", "LOOM : TEXTILE"],
        "A potter shapes clay upon a potter's wheel, just as a glassblower shapes molten glass with a blowpipe."
    ),
    # 30 (replacing STETHOSCOPE : PHYSICIAN item distractor BANDAGE : WOUND)
    (
        "OPHTHALMOSCOPE : OPTOMETRIST",
        "OTODCOPE : AUDIOLOGIST",
        ["RETINA : VISION", "CORNEA : LENS", "SPECULUM : EXAM", "TONOMETER : PRESSURE"],
        "An ophthalmoscope is an inspection instrument of an optometrist, just as an otoscope is of an audiologist."
    ),
    # 37 (replacing PETAL : FLOWER distractor ROOT : SOIL)
    (
        "SCALE : REPTILE",
        "QUILL : PORCUPINE",
        ["FANG : VENOM", "CLAW : PAW", "PELT : MAMMAL", "SHELL : MOLLUSK"],
        "A scale is an individual epidermal covering unit of a reptile, just as a quill is of a porcupine."
    ),
    # 51 (replacing ASTRONOMER : TELESCOPE)
    (
        "VOLCANOLOGIST : SEISMOMETER",
        "OCEANOGRAPHER : BATHYSCAPHE",
        ["LAVA : CRATER", "MAGMA : CHAMBER", "CRUST : TECTONICS", "CURRENT : TIDE"],
        "A volcanologist utilizes a seismometer to monitor seismic activity, just as an oceanographer uses a bathyscaphe to explore depths."
    ),
    # 58 (replacing RESERVOIR : WATER distractor DROUGHT : RAIN)
    (
        "AQUIFER : GROUNDWATER",
        "MINE : ORE",
        ["STRATUM : BEDROCK", "WELL : PUMP", "SPRING : OUTFLOW", "QUARRY : GRAVEL"],
        "An aquifer stores natural groundwater, just as a mine holds deposits of unextracted ore."
    ),
    # 102 (replacing SEXTANT : ALTITUDE)
    (
        "SPECTROPHOTOMETER : ABSORBANCE",
        "INTERFEROMETER : WAVELENGTH",
        ["PRISM : SPECTRUM", "PHOTON : ENERGY", "LASER : BEAM", "DIFFRACTION : GRATING"],
        "A spectrophotometer measures optical absorbance, just as an interferometer measures light wavelength."
    ),
    # 103 (replacing VERSE : STANZA)
    (
        "HEMISTICH : ALEXANDRINE",
        "CLAUSE : COMPLEX SENTENCE",
        ["SYLLABLE : FOOT", "RHYME : COUPLET", "WORD : PHRASE", "LEXEME : MORPHEME"],
        "A hemistich is a distinct half-line division of an alexandrine, just as a clause is a structural division of a complex sentence."
    ),
    # 126 (replacing GONIOMETER -> ALTIMETER : ALTITUDE)
    (
        "DILATOMETER : THERMAL EXPANSION",
        "RHEOMETER : FLUID DEFORMATION",
        ["PYROMETER : TEMPERATURE", "ELASTOMETER : ELASTICITY", "TORSION : SHEAR", "TENSION : STRESS"],
        "A dilatometer measures thermal volume expansion, just as a rheometer measures fluid deformation."
    ),
    # 132 (replacing PYROMETER -> GALVANOMETER)
    (
        "BOLOMETER : RADIANT FLUX",
        "ACTINOMETER : PHOTOCHEMICAL RADIATION",
        ["SENSOR : HEAT", "ABSORBER : SURFACE", "DETECTOR : PHOTON", "EMISSION : SOURCE"],
        "A bolometer measures incident radiant electromagnetic flux, just as an actinometer measures photochemical radiation."
    )
]

print("Checking all 16 candidates...")
all_clean = True
for idx, (stem, corr, dists, exp) in enumerate(candidates_16):
    all_pairs = [stem, corr] + dists
    for p in all_pairs:
        p_up = p.upper().strip()
        if p_up in old_pairs:
            print(f"Candidate {idx} has pair in old_pairs: {p_up}")
            all_clean = False
        words = re.findall(r'[A-Za-z]+', p_up)
        for w in words:
            if w in flagged_user_terms:
                print(f"Candidate {idx} contains forbidden user term '{w}': {p_up}")
                all_clean = False

if all_clean:
    print("ALL 16 CANDIDATES ARE 100% CLEAN AND ZERO-COLLISION!")
