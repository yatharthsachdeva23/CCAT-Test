import sys
sys.path.insert(0, 'scripts')
from pristine_analogies_data import ANALOGY_DATA

# Index 106 fix
ANALOGY_DATA[106] = (
    "DEPOT : FREIGHT",
    "ROUNDHOUSE : LOCOMOTIVES",
    ["TRACK : SWITCH", "CABOOSE : TRAIN", "CARGO : CRANE", "TRUCK : HIGHWAY"],
    "A depot houses and handles freight shipments, just as a roundhouse houses and services locomotives."
)

# Index 156 fix
ANALOGY_DATA[156] = (
    "REFRACTOMETER : BRIX RATING",
    "LUXMETER : ILLUMINANCE",
    ["CANDELA : SOURCE", "PHOTON : BEAM", "SPECTROGRAPH : PRISM", "SHADOW : DARKNESS"],
    "A refractometer measures sugar concentration (Brix rating), just as a luxmeter quantifies light illuminance."
)

with open('scripts/pristine_analogies_data.py', 'w', encoding='utf-8') as f:
    f.write("#!/usr/bin/env python3\n# 162 100% PRISTINE ANALOGIES\n\nANALOGY_DATA = " + repr(ANALOGY_DATA) + "\n")

print("Updated pristine_analogies_data.py!")
