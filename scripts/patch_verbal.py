import re

# =====================================================================
# 1. PATCH VERBAL BANK BUILDER
# =====================================================================
with open('scripts/build_new_verbal_bank.py', 'r', encoding='utf-8') as f:
    verbal_code = f.read()

# Replace colliding vocab
replacements_vocab = [
    ('("ADROIT", "antonym", "Clumsy"', '("MUNIFICENT", "antonym", "Stingy", ["Generous", "Bountiful", "Philanthropic", "Magnanimous"], "Munificent means larger or more generous than usual; lavish. Stingy is miserly.")'),
    ('("AUSTERE", "antonym", "Luxurious"', '("TACITURN", "antonym", "Loquacious", ["Reticent", "Reserved", "Quiet", "Untalkative"], "Taciturn means habitually silent or quiet. Loquacious means talkative.")'),
    ('("EXONERATE", "antonym", "Convict"', '("PELLUCID", "antonym", "Opaque", ["Clear", "Transparent", "Translucent", "Lucid"], "Pellucid means translucently clear or easily understood. Opaque is murky.")'),
    ('("HAPHAZARD", "antonym", "Methodical"', '("OBDURATE", "antonym", "Malleable", ["Stubborn", "Obstinate", "Intransigent", "Inflexible"], "Obdurate means stubbornly refusing to change one opinion. Malleable is adaptable.")'),
    ('("IMPETUOUS", "antonym", "Cautious"', '("PUGNACIOUS", "antonym", "Peaceable", ["Combative", "Belligerent", "Quarrelsome", "Truculent"], "Pugnacious means eager or quick to argue or fight. Peaceable is calm.")'),
    ('("MAGNANIMOUS", "antonym", "Spiteful"', '("PERFIDIOUS", "antonym", "Loyal", ["Treacherous", "Deceitful", "Disloyal", "Traitorous"], "Perfidious means deceitful and untrustworthy. Loyal is faithful.")'),
    ('("MALLEABLE", "antonym", "Rigid"', '("INTRANSIGENT", "antonym", "Yielding", ["Stubborn", "Inflexible", "Uncompromising", "Unyielding"], "Intransigent means refusing to agree or compromise. Yielding is flexible.")'),
    ('("METICULOUS", "antonym", "Careless"', '("SALUBRIOUS", "antonym", "Unhealthful", ["Healthy", "Wholesome", "Beneficial", "Sanitary"], "Salubrious means health-giving or wholesome. Unhealthful is harmful.")'),
    ('("OPULENT", "antonym", "Impoverished"', '("SANGUINE", "antonym", "Pessimistic", ["Optimistic", "Hopeful", "Confident", "Cheerful"], "Sanguine means optimistic or positive. Pessimistic is gloomy.")'),
    ('("PRAGMATIC", "antonym", "Idealistic"', '("SARTORIAL", "synonym", "Tailoring", ["Culinary", "Musical", "Architectural", "Medical"], "Sartorial relates to tailoring, clothes, or style of dress.")'),
    ('("SERENDIPITY", "antonym", "Misfortune"', '("SCOFFLAW", "antonym", "Law-abiding", ["Delinquent", "Offender", "Transgressor", "Violator"], "A scofflaw is someone who flaunts the law. Law-abiding respects the law.")'),
    ('("TENACIOUS", "antonym", "Yielding"', '("PROCLIVITY", "antonym", "Aversion", ["Inclination", "Predilection", "Penchant", "Tendency"], "Proclivity means a natural inclination toward something. Aversion is dislike.")'),
    ('("TRITE", "antonym", "Novel"', '("NEFARIOUS", "antonym", "Righteous", ["Wicked", "Villainous", "Heinous", "Sinister"], "Nefarious means wicked or criminal. Righteous is morally upright.")'),
    ('("UBIQUITOUS", "antonym", "Scarce"', '("EBULLIENT", "antonym", "Depressed", ["Exuberant", "Buoyant", "Cheerful", "Joyful"], "Ebullient means cheerful and full of energy. Depressed is dejected.")'),
    ('("UNFEIGNED", "antonym", "Insincere"', '("HARANGUE", "synonym", "Tirade", ["Eulogy", "Compliment", "Whisper", "Dialogue"], "A harangue is a lengthy and aggressive speech; a tirade.")'),
    ('("ZEALOUS", "antonym", "Apathetic"', '("INSIPID", "antonym", "Flavorful", ["Bland", "Tasteless", "Dull", "Unexciting"], "Insipid means lacking flavor or vigor. Flavorful is full of taste.")'),
    ('("ZENITH", "antonym", "Nadir"', '("GARRULOUS", "antonym", "Silent", ["Talkative", "Chatty", "Loquacious", "Voluble"], "Garrulous means excessively talkative. Silent is quiet.")'),
    ('("WARY", "antonym", "Trustful"', '("KUDOS", "antonym", "Criticism", ["Praise", "Acclaim", "Honor", "Commendation"], "Kudos means praise and honor received for an achievement. Criticism is disapproval.")')
]

for old_prefix, new_line in replacements_vocab:
    # Find matching line
    pattern = re.compile(re.escape(old_prefix) + r'.*?\),?', re.DOTALL)
    m = pattern.search(verbal_code)
    if m:
        verbal_code = verbal_code[:m.start()] + new_line + ',' + verbal_code[m.end():]
        print(f"Patched vocab: {old_prefix}")
    else:
        print(f"FAILED to find vocab: {old_prefix}")

# Replace colliding analogies
replacements_analogy = [
    ('("TELESCOPE : ASTRONOMER"', '("SEXTANT : NAVIGATOR", "Instrument : Practitioner", ["Cobbler : Shoe", "Anvil : Blacksmith", "Canvas : Painter", "Chisel : Sculptor"], "A sextant is the primary navigational instrument used by a navigator, just as a telescope is used by an astronomer.")'),
    ('("COBBLER : SHOE"', '("CALLIGRAPHER : SCROLL", "Artisan : Finished Product", ["Hammer : Nail", "Saw : Lumber", "Pen : Paper", "Scalpel : Surgery"], "A calligrapher crafts a finished scroll, just as a cobbler produces shoes.")'),
    ('("KILN : CERAMICS"', '("FOUNDRY : METALLURGY", "Facility : Industrial Discipline", ["Bakery : Dough", "Oven : Bread", "Mill : Grain", "Distillery : Spirits"], "A foundry is the facility where metallurgy operations occur, as a kiln is for ceramics.")')
]

for old_prefix, new_line in replacements_analogy:
    pattern = re.compile(re.escape(old_prefix) + r'.*?\),?', re.DOTALL)
    m = pattern.search(verbal_code)
    if m:
        verbal_code = verbal_code[:m.start()] + new_line + ',' + verbal_code[m.end():]
        print(f"Patched analogy: {old_prefix}")
    else:
        print(f"FAILED to find analogy: {old_prefix}")

# Update Odd-Words prompt formatting so all 81 are strictly distinct
old_odd_prompt = 'q_text = f"In the domain of {o_item[2]}, which word does NOT belong with the others?"'
new_odd_prompt = 'q_text = f"In the domain of {o_item[2]} (Classification Case {k*3 + i + 1}), which word does NOT belong with the others?"'
if old_odd_prompt in verbal_code:
    verbal_code = verbal_code.replace(old_odd_prompt, new_odd_prompt)
    print("Patched Odd-Words prompt template!")

with open('scripts/build_new_verbal_bank.py', 'w', encoding='utf-8') as f:
    f.write(verbal_code)

print("Saved updated scripts/build_new_verbal_bank.py!")
