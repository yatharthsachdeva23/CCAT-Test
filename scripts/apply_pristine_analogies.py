import sys
sys.path.insert(0, 'scripts')
import unique_analogies_data

# The 16 replacement items mapping: index -> (stem, correct, dists, exp)
rep_map = {
    # 0 (Test 31 Q7: was SEXTANT : NAVIGATOR)
    0: (
        "THEODOLITE : SURVEYOR",
        "CENTRIFUGE : BIOCHEMIST",
        ["MICROSCOPE : SLIDE", "CALIPER : MACHINIST", "PIPETTE : FLASK", "BEAKER : REAGENT"],
        "A theodolite is a specialized optical instrument used by a surveyor, just as a centrifuge is used by a biochemist."
    ),
    # 1 (Test 31 Q8: was STANZA : POEM)
    1: (
        "KEYSTONE : ARCH",
        "RIDGEPOLE : ROOF",
        ["BRICK : MASONRY", "FOUNDATION : PIER", "BUTTRESS : WALL", "CORBEL : FACADE"],
        "A keystone is the central structural locking piece of an arch, just as a ridgepole is the central structural beam of a pitched roof."
    ),
    # 3 (Test 31 Q10: was ARCHITECT : BLUEPRINT -> COMPOSER : SCORE)
    3: (
        "CHOREOGRAPHER : LIBRETTO",
        "CARTOGRAPHER : PROJECTION",
        ["DRAMATURG : PROSCENIUM", "ILLUSTRATOR : LITHOGRAPH", "CALLIGRAPHER : PARCHMENT", "ENGRAVER : BURIN"],
        "A choreographer devises choreography, just as a cartographer constructs a map projection."
    ),
    # 6 (Test 32 Q7: was CHISEL : SCULPTOR)
    6: (
        "ADZE : CARPENTER",
        "MORTAR : APOTHECARY",
        ["PLANE : SHAVING", "HAMMER : NAIL", "SAW : LUMBER", "TROWEL : MASON"],
        "An adze is a specialized cutting tool utilized by a traditional woodworker, just as a mortar is utilized by an apothecary."
    ),
    # 12 (Test 33 Q7: was BAROMETER : PRESSURE)
    12: (
        "MANOMETER : FLUID PRESSURE",
        "PYCNOMETER : SPECIFIC GRAVITY",
        ["HYDROMETER : LIQUID", "BAROGRAPH : TRACE", "PITOT TUBE : AIRSPEED", "GAUGE : DIAL"],
        "A manometer specifically measures fluid pressure, just as a pycnometer measures specific gravity."
    ),
    # 13 (Test 33 Q8: was ARCHIPELAGO : ISLAND)
    13: (
        "CONGLOMERATE : SUBSIDIARY",
        "FEDERATION : PROVINCE",
        ["SYNDICATE : INVESTOR", "ALLIANCE : TREATY", "CARTEL : PRODUCER", "CONSORTIUM : BANK"],
        "A conglomerate is an overarching entity composed of subsidiary companies, just as a federation is composed of constituent provinces."
    ),
    # 18 (Test 34 Q7: was GALVANOMETER : CURRENT)
    18: (
        "VISCOMETER : VISCOSITY",
        "DENSITOMETER : OPTICAL DENSITY",
        ["TACHOMETER : VELOCITY", "CALORIMETER : HEAT", "REFRACTOMETER : INDEX", "SPECTROMETER : LIGHT"],
        "A viscometer measures fluid viscosity, just as a densitometer measures optical density."
    ),
    # 24 (Test 35 Q7: was ANVIL : BLACKSMITH)
    24: (
        "POTTER : WHEEL",
        "GLASSBLOWER : BLOWPIPE",
        ["KILN : CERAMIC", "GLAZE : VESSEL", "FORGE : METAL", "LOOM : TEXTILE"],
        "A potter shapes clay upon a potter's wheel, just as a glassblower shapes molten glass with a blowpipe."
    ),
    # 30 (Test 36 Q7: was STETHOSCOPE : PHYSICIAN)
    30: (
        "OPHTHALMOSCOPE : OPTOMETRIST",
        "OTODCOPE : AUDIOLOGIST",
        ["RETINA : VISION", "CORNEA : LENS", "SPECULUM : EXAM", "TONOMETER : PRESSURE"],
        "An ophthalmoscope is an inspection instrument of an optometrist, just as an otoscope is of an audiologist."
    ),
    # 37 (Test 37 Q8: was PETAL : FLOWER)
    37: (
        "SCALE : REPTILE",
        "QUILL : PORCUPINE",
        ["FANG : VENOM", "CLAW : PAW", "PELT : MAMMAL", "SHELL : MOLLUSK"],
        "A scale is an individual epidermal covering unit of a reptile, just as a quill is of a porcupine."
    ),
    # 51 (Test 39 Q10: was ASTRONOMER : TELESCOPE)
    51: (
        "VOLCANOLOGIST : SEISMOMETER",
        "OCEANOGRAPHER : BATHYSCAPHE",
        ["LAVA : CRATER", "MAGMA : CHAMBER", "CRUST : TECTONICS", "CURRENT : TIDE"],
        "A volcanologist utilizes a seismometer to monitor seismic activity, just as an oceanographer uses a bathyscaphe to explore depths."
    ),
    # 58 (Test 40 Q11: was RESERVOIR : WATER)
    58: (
        "AQUIFER : GROUNDWATER",
        "MINE : ORE",
        ["STRATUM : BEDROCK", "WELL : PUMP", "SPRING : OUTFLOW", "QUARRY : GRAVEL"],
        "An aquifer stores natural groundwater, just as a mine holds deposits of unextracted ore."
    ),
    # 102 (Test 48 Q7: was SEXTANT : ALTITUDE)
    102: (
        "SPECTROPHOTOMETER : ABSORBANCE",
        "INTERFEROMETER : WAVELENGTH",
        ["PRISM : SPECTRUM", "PHOTON : ENERGY", "LASER : BEAM", "DIFFRACTION : GRATING"],
        "A spectrophotometer measures optical absorbance, just as an interferometer measures light wavelength."
    ),
    # 103 (Test 48 Q8: was VERSE : STANZA)
    103: (
        "HEMISTICH : ALEXANDRINE",
        "CLAUSE : COMPLEX SENTENCE",
        ["SYLLABLE : FOOT", "RHYME : COUPLET", "WORD : PHRASE", "LEXEME : MORPHEME"],
        "A hemistich is a distinct half-line division of an alexandrine, just as a clause is a structural division of a complex sentence."
    ),
    # 126 (Test 52 Q7: was GONIOMETER -> ALTIMETER : ALTITUDE)
    126: (
        "DILATOMETER : THERMAL EXPANSION",
        "RHEOMETER : FLUID DEFORMATION",
        ["PYROMETER : TEMPERATURE", "ELASTOMETER : ELASTICITY", "TORSION : SHEAR", "TENSION : STRESS"],
        "A dilatometer measures thermal volume expansion, just as a rheometer measures fluid deformation."
    ),
    # 132 (Test 53 Q7: was PYROMETER -> GALVANOMETER)
    132: (
        "BOLOMETER : RADIANT FLUX",
        "ACTINOMETER : PHOTOCHEMICAL RADIATION",
        ["SENSOR : HEAT", "ABSORBER : SURFACE", "DETECTOR : PHOTON", "EMISSION : SOURCE"],
        "A bolometer measures incident radiant electromagnetic flux, just as an actinometer measures photochemical radiation."
    )
}

data = unique_analogies_data.ANALOGY_DATA
for idx, val in rep_map.items():
    data[idx] = val

out_lines = [
    '#!/usr/bin/env python3',
    '# 162 completely unique analogy items for Tests 31 through 57 (Zero overlap with Tests 1-30)',
    'ANALOGY_DATA = ['
]

for item in data:
    stem, correct, dists, exp = item
    out_lines.append(f"    ({repr(stem)}, {repr(correct)}, {repr(dists)}, {repr(exp)}),")

out_lines.append(']')
out_lines.append('')
out_lines.append('if __name__ == "__main__":')
out_lines.append('    print(f"Loaded {len(ANALOGY_DATA)} unique analogy items.")')

with open('scripts/unique_analogies_data.py', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))

print("Successfully updated scripts/unique_analogies_data.py with pristine, zero-overlap analogies!")
