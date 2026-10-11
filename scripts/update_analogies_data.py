import sys
sys.path.insert(0, 'scripts')
import unique_analogies_data

rep_map = {
    15: ('ARCHEOLOGIST : ARTIFACT', 'PALEONTOLOGIST : FOSSIL', ['CARTOGRAPHER : SATELLITE', 'GENEALOGIST : PEDIGREE', 'GEOLOGIST : VOLCANO', 'EXPLORER : MAP'], 'An archeologist unearths and examines artifacts, just as a paleontologist unearths and examines fossils.'),
    18: ('GALVANOMETER : CURRENT', 'HYGROMETER : HUMIDITY', ['SPEEDOMETER : VELOCITY', 'BAROMETER : ALTITUDE', 'VOLTMETER : BATTERY', 'SCALE : BALANCE'], 'A galvanometer measures electric current, just as a hygrometer measures atmospheric humidity.'),
    21: ('MILLER : FLOUR', 'VINTNER : WINE', ['BAKER : YEAST', 'FARMER : TRACTOR', 'BREWER : BARREL', 'CHEF : SPICE'], 'A miller processes grain to produce flour, just as a vintner processes grapes to produce wine.'),
    39: ('STEWARD : ESTATE', 'ABBOT : MONASTERY', ['FARMER : BARN', 'SOLDIER : BARRACKS', 'MONK : PRAYER', 'PRIEST : VESTMENT'], 'A steward manages and oversees an estate, just as an abbot manages and oversees a monastery.'),
    70: ('ARBORETUM : TREES', 'MENAGERIE : ANIMALS', ['NURSERY : SEEDLINGS', 'GARDEN : SOIL', 'ORCHARD : FRUIT', 'SAFARI : JUNGLE'], 'An arboretum is a curated sanctuary housing living trees, just as a menagerie is a collection housing living animals.'),
    94: ('HERBARIUM : FLORA', 'VIVARIUM : FAUNA', ['TERRARIUM : REPTILE', 'AQUARIUM : GLASS', 'GREENHOUSE : HEAT', 'GARDEN : FERTILIZER'], 'A herbarium preserves and displays specimens of flora, just as a vivarium maintains living specimens of fauna.'),
    101: ('ANTIDOTE : POISON', 'COUNTERMEASURE : THREAT', ['MEDICINE : SYMPTOM', 'TOXIN : HARM', 'CURE : SICKNESS', 'SHIELD : WEAPON'], 'An antidote directly neutralizes a poison, just as a countermeasure neutralizes an incoming threat.'),
    142: ('FOUNDRY : CASTING', 'REFINERY : PETROLEUM', ['FURNACE : HEAT', 'MINE : COAL', 'STEEL : GIRDER', 'MILL : LUMBER'], 'A foundry manufactures metallic castings, just as a refinery produces refined petroleum.')
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

print("Successfully updated scripts/unique_analogies_data.py!")
