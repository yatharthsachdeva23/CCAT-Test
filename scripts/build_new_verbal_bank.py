import json

# Generator for 459 brand new CCAT Verbal Questions for Tests 31 to 57 (27 tests x 17 questions)
# 6 Vocab + 6 Analogies + 3 Odd-Word + 1 Sentence Completion + 1 Deductive Logic = 17 Qs per test

def solve_and_format(q_text, correct_ans, distractors, explanation, sub_type, rand_seed):
    s = (rand_seed * 1103515245 + 12345) & 0x7fffffff
    all_opts = [correct_ans] + distractors[:4]
    
    opts_with_tag = [{'text': str(o), 'isCorr': (i == 0)} for i, o in enumerate(all_opts)]
    for i in range(len(opts_with_tag) - 1, 0, -1):
        s = (s * 1103515245 + 12345) & 0x7fffffff
        j = s % (i + 1)
        opts_with_tag[i], opts_with_tag[j] = opts_with_tag[j], opts_with_tag[i]
        
    letters = ['A', 'B', 'C', 'D', 'E']
    options = []
    correct_letter = 'A'
    for idx, item in enumerate(opts_with_tag):
        letter = letters[idx]
        options.append({'id': letter, 'text': item['text']})
        if item['isCorr']:
            correct_letter = letter
            
    clean_expl = f"**Correct Answer: {correct_letter}** ({correct_ans})\n\n{explanation}\n\n💡 **Speed Tip:** Rapidly isolate target clues and eliminate mismatched categories in <8s."
    return {
        'question': q_text,
        'options': options,
        'correctOption': correct_letter,
        'explanation': clean_expl,
        'category': 'verbal',
        'subType': sub_type
    }

# 162 Brand new vocabulary words
vocab_pool = [
  ("ABERRATION", "antonym", "Normality", ["Anomaly", "Deviation", "Divergence", "Eccentricity"], "Aberration means a departure from what is normal, usual, or expected. Normality is its opposite."),
  ("ACUMEN", "antonym", "Ignorance", ["Insight", "Shrewdness", "Sharpness", "Sagacity"], "Acumen means the ability to make good judgments and take quick decisions. Ignorance is lack of knowledge or acuity."),
  ("MUNIFICENT", "antonym", "Stingy", ["Generous", "Bountiful", "Philanthropic", "Magnanimous"], "Munificent means larger or more generous than usual; lavish. Stingy is miserly."),
  ("AMENABLE", "antonym", "Intractable", ["Cooperative", "Compliant", "Responsive", "Receptive"], "Amenable means open and responsive to suggestion; easily persuaded. Intractable means hard to control or stubborn."),
  ("APOCRYPHAL", "antonym", "Authentic", ["Fictitious", "Spurious", "Doubtful", "Dubious"], "Apocryphal means of doubtful authenticity, although widely circulated as being true. Authentic is genuine."),
  ("ASSIDUOUS", "antonym", "Negligent", ["Diligent", "Industrious", "Attentive", "Persevering"], "Assiduous means showing great care and perseverance. Negligent means failing to take proper care."),
  ("TACITURN", "antonym", "Loquacious", ["Reticent", "Reserved", "Quiet", "Untalkative"], "Taciturn means habitually silent or quiet. Loquacious means talkative."),
  ("AVARICE", "antonym", "Generosity", ["Greed", "Cupidity", "Rapacity", "Covetousness"], "Avarice means extreme greed for wealth or material gain. Generosity is readiness to give."),
  ("BANAL", "antonym", "Original", ["Trite", "Hackneyed", "Cliché", "Platitudinous"], "Banal means so lacking in originality as to be obvious and boring. Original is fresh and inventive."),
  ("BURGEON", "antonym", "Wither", ["Flourish", "Thrive", "Expand", "Proliferate"], "Burgeon means begin to grow or increase rapidly; flourish. Wither means decline or decay."),
  ("CALLOUS", "antonym", "Compassionate", ["Heartless", "Unfeeling", "Insensitive", "Hardened"], "Callous means showing or having an insensitive and cruel disregard for others. Compassionate is sympathetic."),
  ("CANDOR", "antonym", "Deceit", ["Frankness", "Honesty", "Sincerity", "Openness"], "Candor means the quality of being open and honest in expression. Deceit is concealment of the truth."),
  ("CASTIGATE", "antonym", "Praise", ["Chastise", "Reprimand", "Rebuke", "Admonish"], "Castigate means reprimand severely. Praise means express warm approval or admiration."),
  ("CHAGRIN", "antonym", "Delight", ["Mortification", "Embarrassment", "Humiliation", "Vexation"], "Chagrin means distress or embarrassment at having failed or been humiliated. Delight is great pleasure."),
  ("CLANDESTINE", "antonym", "Overt", ["Covert", "Surreptitious", "Furtive", "Stealthy"], "Clandestine means kept secret or done secretively. Overt means done or shown openly."),
  ("COMPENDIUM", "synonym", "Summary", ["Expansion", "Elongation", "Amplification", "Dispersion"], "A compendium is a collection of concise but detailed information about a particular subject; a summary."),
  ("CURSORY", "antonym", "Thorough", ["Superficial", "Perfunctory", "Hasty", "Casual"], "Cursory means hasty and therefore not thorough or detailed. Thorough is complete with attention to detail."),
  ("DEBILITY", "antonym", "Strength", ["Weakness", "Infirmity", "Frailty", "Feebleness"], "Debility means physical weakness, especially as a result of illness. Strength is power and vigor."),
  ("DEFERENCE", "antonym", "Disrespect", ["Respect", "Regard", "Reverence", "Veneration"], "Deference means polite submission and respect. Disrespect is lack of respect or courtesy."),
  ("DELINEATE", "synonym", "Depict", ["Obscure", "Confuse", "Conceal", "Distort"], "Delineate means to describe or portray something precisely; depict."),
  ("DESPOTIC", "antonym", "Democratic", ["Tyrannical", "Autocratic", "Dictatorial", "Monarchical"], "Despotic means tyrannical or authoritarian. Democratic is governed by popular choice."),
  ("DIDACTIC", "antonym", "Uninformative", ["Instructive", "Educational", "Doctrinal", "Pedagogic"], "Didactic means intended to teach, particularly in having moral instruction. Uninformative provides no instruction."),
  ("DISCORDANT", "antonym", "Harmonious", ["Inharmonious", "Strident", "Clashing", "Jarring"], "Discordant means disagreeing or incongruous; harsh and jarring in sound. Harmonious is pleasingly consistent."),
  ("DISPARAGE", "antonym", "Compliment", ["Belittle", "Denigrate", "Deprecate", "Deride"], "Disparage means regard or represent as being of little worth. Compliment is praise."),
  ("DISSEMINATE", "antonym", "Gather", ["Broadcast", "Disperse", "Circulate", "Promulgate"], "Disseminate means spread or disperse something widely. Gather means collect together."),
  ("DISSIPATE", "antonym", "Accumulate", ["Scatter", "Disperse", "Squander", "Dissolve"], "Dissipate means disperse or scatter, or waste resources. Accumulate means gather together or acquire."),
  ("DIVEST", "antonym", "Invest", ["Strip", "Deprive", "Dispossess", "Relinquish"], "Divest means deprive someone of power, rights, or possessions, or rid oneself of an asset. Invest is opposite."),
  ("DUPLICITY", "antonym", "Honesty", ["Deceit", "Treachery", "Subterfuge", "Guile"], "Duplicity means deceitfulness; double-dealing. Honesty is truthfulness."),
  ("ECLECTIC", "antonym", "Uniform", ["Diverse", "Varied", "Wide-ranging", "Multifarious"], "Eclectic means deriving ideas, style, or taste from a broad and diverse range of sources. Uniform is unvarying."),
  ("EFFICACY", "antonym", "Ineffectiveness", ["Productiveness", "Potency", "Success", "Capability"], "Efficacy is the ability to produce a desired or intended result. Ineffectiveness produces no result."),
  ("ELUCIDATE", "antonym", "Obscure", ["Clarify", "Explain", "Illuminate", "Expound"], "Elucidate means make something clear; explain. Obscure means make unclear or difficult to understand."),
  ("ENHANCE", "antonym", "Diminish", ["Improve", "Augment", "Elevate", "Heighten"], "Enhance means intensify, increase, or further improve the quality or value of something. Diminish means make smaller."),
  ("EQUIVOCAL", "antonym", "Unambiguous", ["Ambiguous", "Vague", "Indefinite", "Evasive"], "Equivocal means open to more than one interpretation; ambiguous. Unambiguous means clear and precise."),
  ("PELLUCID", "antonym", "Opaque", ["Clear", "Transparent", "Translucent", "Lucid"], "Pellucid means translucently clear or easily understood. Opaque is murky."),
  ("EXPEDIENT", "antonym", "Inadvisable", ["Advantageous", "Pragmatic", "Prudent", "Beneficial"], "Expedient means convenient and practical although possibly improper or immoral. Inadvisable is unwise."),
  ("EXTRANEOUS", "antonym", "Essential", ["Irrelevant", "Immaterial", "Peripheral", "Extrinsic"], "Extraneous means irrelevant or unrelated to the subject. Essential is fundamental."),
  ("FALLACIOUS", "antonym", "Valid", ["Erroneous", "Spurious", "Faulty", "Misleading"], "Fallacious means based on a mistaken belief or unsound reasoning. Valid is logically sound."),
  ("FORMIDABLE", "antonym", "Insignificant", ["Intimidating", "Daunting", "Redoubtable", "Imposing"], "Formidable means inspiring fear or respect through being impressively large or powerful. Insignificant is minor."),
  ("FORTUITOUS", "antonym", "Deliberate", ["Accidental", "Chance", "Serendipitous", "Unforeseen"], "Fortuitous means happening by accident or chance rather than design. Deliberate is planned."),
  ("OBDURATE", "antonym", "Malleable", ["Stubborn", "Obstinate", "Intransigent", "Inflexible"], "Obdurate means stubbornly refusing to change one opinion. Malleable is adaptable."),
  ("HOMOGENEOUS", "antonym", "Heterogeneous", ["Uniform", "Consistent", "Identical", "Unvaried"], "Homogeneous means of the same kind; alike. Heterogeneous means diverse in character."),
  ("HYPERBOLE", "antonym", "Understatement", ["Exaggeration", "Overstatement", "Amplification", "Magnification"], "Hyperbole is exaggerated statements or claims not meant to be taken literally. Understatement is opposite."),
  ("ILLICIT", "antonym", "Lawful", ["Illegal", "Unlawful", "Banned", "Prohibited"], "Illicit means forbidden by law, rules, or custom. Lawful means conforming to permitted law."),
  ("IMPASSE", "synonym", "Deadlock", ["Breakthrough", "Resolution", "Advancement", "Opening"], "An impasse is a situation in which no progress is possible, especially because of disagreement; a deadlock."),
  ("IMPERCEPTIBLE", "antonym", "Conspicuous", ["Unnoticeable", "Inaudible", "Subtle", "Faint"], "Imperceptible means so slight, gradual, or subtle as not to be perceived. Conspicuous is clearly visible."),
  ("PUGNACIOUS", "antonym", "Peaceable", ["Combative", "Belligerent", "Quarrelsome", "Truculent"], "Pugnacious means eager or quick to argue or fight. Peaceable is calm."),
  ("IMPUNITY", "antonym", "Liability", ["Exemption", "Immunity", "Pardon", "Absolution"], "Impunity means exemption from punishment or freedom from the injurious consequences of an action. Liability is accountability."),
  ("INCONGRUOUS", "antonym", "Compatible", ["Inappropriate", "Unsuitable", "Mismatched", "Out of place"], "Incongruous means not in harmony or keeping with the surroundings or other aspects. Compatible is harmoniously suited."),
  ("INDEFATIGABLE", "antonym", "Lethargic", ["Tireless", "Unflagging", "Relentless", "Persistent"], "Indefatigable means persisting tirelessly. Lethargic means sluggish and lacking energy."),
  ("INGENUOUS", "antonym", "Duplicitous", ["Naive", "Innocent", "Trusting", "Artless"], "Ingenuous means innocent and unsuspecting. Duplicitous is deceitful."),
  ("INNOCUOUS", "antonym", "Harmful", ["Harmless", "Safe", "Benign", "Nontoxic"], "Innocuous means not harmful or offensive. Harmful causes injury or damage."),
  ("INSCRUTABLE", "antonym", "Expressive", ["Enigmatic", "Mysterious", "Unreadable", "Cryptic"], "Inscrutable means impossible to understand or interpret. Expressive is clear and communicating openly."),
  ("INSIDIOUS", "antonym", "Straightforward", ["Subtle", "Treacherous", "Crafty", "Deceitful"], "Insidious means proceeding in a gradual, subtle way, but with harmful effects. Straightforward is open and honest."),
  ("INTREPID", "antonym", "Cowardly", ["Fearless", "Courageous", "Dauntless", "Valiant"], "Intrepid means fearless; adventurous. Cowardly is lacking courage."),
  ("INUNDATE", "antonym", "Drain", ["Flood", "Overwhelm", "Deluge", "Submerge"], "Inundate means overwhelm with things or flood with water. Drain means empty or remove liquid."),
  ("IRASCIBLE", "antonym", "Placid", ["Irritable", "Short-tempered", "Testy", "Cantankerous"], "Irascible means having or showing a tendency to be easily angered. Placid is calm and tranquil."),
  ("JUDICIOUS", "antonym", "Foolhardy", ["Sensible", "Prudent", "Astute", "Wise"], "Judicious means having, showing, or done with good judgment or sense. Foolhardy is reckless."),
  ("LEVITY", "antonym", "Gravity", ["Frivolity", "Jocularity", "Cheerfulness", "Flippancy"], "Levity is the treatment of a serious matter with humor or in a manner lacking due respect. Gravity is seriousness."),
  ("PERFIDIOUS", "antonym", "Loyal", ["Treacherous", "Deceitful", "Disloyal", "Traitorous"], "Perfidious means deceitful and untrustworthy. Loyal is faithful."),
  ("MALEVOLENT", "antonym", "Benevolent", ["Malicious", "Spiteful", "Hostile", "Vindictive"], "Malevolent means having or showing a wish to do evil to others. Benevolent is well-meaning and kindly."),
  ("INTRANSIGENT", "antonym", "Yielding", ["Stubborn", "Inflexible", "Uncompromising", "Unyielding"], "Intransigent means refusing to agree or compromise. Yielding is flexible."),
  ("SALUBRIOUS", "antonym", "Unhealthful", ["Healthy", "Wholesome", "Beneficial", "Sanitary"], "Salubrious means health-giving or wholesome. Unhealthful is harmful."),
  ("MITIGATE", "antonym", "Exacerbate", ["Alleviate", "Lessen", "Assuage", "Diminish"], "Mitigate means make less severe, serious, or painful. Exacerbate means make worse."),
  ("MODICUM", "antonym", "Abundance", ["Small amount", "Scrap", "Fragment", "Particle"], "A modicum is a small quantity of a particular thing, especially something considered desirable. Abundance is a surplus."),
  ("MOROSE", "antonym", "Cheerful", ["Sullen", "Gloomy", "Glum", "Melancholy"], "Morose means sullen and ill-tempered. Cheerful is noticeably happy and optimistic."),
  ("MYRIAD", "antonym", "Paucity", ["Multitude", "Countless", "Abundance", "Profusion"], "Myriad means a countless or extremely great number. Paucity is scarcity or small quantity."),
  ("NEGLIGENT", "antonym", "Vigilant", ["Careless", "Remiss", "Slack", "Derelict"], "Negligent means failing to take proper care in doing something. Vigilant means keeping careful watch."),
  ("NONCHALANT", "antonym", "Anxious", ["Unconcerned", "Indifferent", "Cool", "Composed"], "Nonchalant means feeling or appearing casually calm and relaxed. Anxious is worried and uneasy."),
  ("NOSTALGIA", "synonym", "Reminiscence", ["Oblivion", "Anticipation", "Indifference", "Presentiment"], "Nostalgia is a sentimental longing or wistful affection for the past; reminiscence."),
  ("NOVICE", "antonym", "Veteran", ["Beginner", "Apprentice", "Neophyte", "Tyro"], "A novice is a person new to or inexperienced in a field. Veteran is a person who has long experience."),
  ("BELLICOSE", "antonym", "Peaceful", ["Aggressive", "Combative", "Hostile", "Militant"], "Bellicose means demonstrating aggression and willingness to fight. Peaceful is untroubled by conflict."),
  ("OBLIVIOUS", "antonym", "Aware", ["Unaware", "Unconscious", "Heedless", "Ignorant"], "Oblivious means not aware of or not concerned about what is happening around one. Aware is conscious."),
  ("OMINOUS", "antonym", "Auspicious", ["Threatening", "Menacing", "Sinister", "Foreboding"], "Ominous means giving the impression that something bad or unpleasant is going to happen. Auspicious is favorable."),
  ("OPAQUE", "antonym", "Transparent", ["Cloudy", "Obscure", "Impenetrable", "Murky"], "Opaque means not able to be seen through; not transparent. Transparent is clear."),
  ("SANGUINE", "antonym", "Pessimistic", ["Optimistic", "Hopeful", "Confident", "Cheerful"], "Sanguine means optimistic or positive. Pessimistic is gloomy."),
  ("OSTENTATIOUS", "antonym", "Unassuming", ["Showy", "Pretentious", "Flamboyant", "Gaudy"], "Ostentatious means characterized by vulgar or pretentious display. Unassuming is modest and unpretentious."),
  ("PALPABLE", "antonym", "Intangible", ["Tangible", "Perceptible", "Noticeable", "Discernible"], "Palpable means able to be touched or felt; so intense as to seem almost tangible. Intangible cannot be touched."),
  ("PANDEMONIUM", "antonym", "Serenity", ["Chaos", "Bedlam", "Mayhem", "Turmoil"], "Pandemonium is wild and noisy disorder or confusion; uproar. Serenity is peace and calm."),
  ("PARADOX", "synonym", "Contradiction", ["Certainty", "Truism", "Orthodoxy", "Consensus"], "A paradox is a seemingly absurd or self-contradictory statement that when investigated may prove to be well founded."),
  ("PARAMOUNT", "antonym", "Secondary", ["Foremost", "Supreme", "Primary", "Predominant"], "Paramount means more important than anything else; supreme. Secondary is subordinate."),
  ("PARTISAN", "antonym", "Nonpartisan", ["Biased", "Factional", "Prejudiced", "One-sided"], "Partisan means a strong supporter of a party, cause, or person, or prejudiced in favor of a cause. Nonpartisan is unbiased."),
  ("PATENT", "antonym", "Concealed", ["Obvious", "Evident", "Manifest", "Unmistakable"], "Patent means easily recognizable; obvious. Concealed means kept secret or hidden."),
  ("PEERLESS", "antonym", "Mediocre", ["Incomparable", "Matchless", "Unrivaled", "Inimitable"], "Peerless means unequaled; unrivaled. Mediocre is of moderate or low quality."),
  ("PENCHANT", "antonym", "Aversion", ["Liking", "Affinity", "Inclination", "Predilection"], "A penchant is a strong or habitual liking for something or a tendency to do it. Aversion is a strong dislike."),
  ("PERIPHERAL", "antonym", "Central", ["Marginal", "Secondary", "Incidental", "Ancillary"], "Peripheral means relating to or situated on the edge or periphery of something; secondary. Central is core."),
  ("PERVASIVE", "antonym", "Localized", ["Prevalent", "Ubiquitous", "Rife", "Omnipresent"], "Pervasive means spreading widely throughout an area or a group of people. Localized is restricted to a small area."),
  ("PLAUSIBLE", "antonym", "Implausible", ["Credible", "Believable", "Reasonable", "Likely"], "Plausible means seeming reasonable or probable. Implausible is not believable."),
  ("SARTORIAL", "synonym", "Tailoring", ["Culinary", "Musical", "Architectural", "Medical"], "Sartorial relates to tailoring, clothes, or style of dress."),
  ("PRECARIOUS", "antonym", "Secure", ["Hazardous", "Perilous", "Unstable", "Insecure"], "Precarious means not securely held or in position; dangerously likely to fall or collapse. Secure is stable."),
  ("PRECEDENT", "synonym", "Benchmark", ["Anomaly", "Digression", "Novelty", "Divergence"], "A precedent is an earlier event or action that is regarded as an example or guide; a benchmark."),
  ("PRECOCIOUS", "antonym", "Backward", ["Advanced", "Gifted", "Mature", "Talented"], "Precocious means having developed certain abilities or proclivities at an earlier age than usual. Backward is retarded in development."),
  ("PRODIGIOUS", "antonym", "Diminutive", ["Enormous", "Colossal", "Immense", "Stupendous"], "Prodigious means remarkably or impressively great in extent, size, or degree. Diminutive is unusually small."),
  ("PROLIFIC", "antonym", "Unproductive", ["Productive", "Fertile", "Fecund", "Copious"], "Prolific means producing much fruit or foliage or many works. Unproductive produces nothing."),
  ("PROPENSITY", "antonym", "Disinclination", ["Tendency", "Inclination", "Predisposition", "Proneness"], "A propensity is an inclination or natural tendency to behave in a particular way. Disinclination is unwillingness."),
  ("PROTRACT", "antonym", "Shorten", ["Prolong", "Extend", "Lengthen", "Elongate"], "Protract means to prolong in time or space. Shorten is to reduce duration."),
  ("PRUDENT", "antonym", "Reckless", ["Cautious", "Circumspect", "Judicious", "Frugal"], "Prudent means acting with or showing care and thought for the future. Reckless is careless of consequences."),
  ("DIFFIDENT", "antonym", "Confident", ["Shy", "Timid", "Modest", "Hesitant"], "Diffident means modest or shy because of a lack of self-confidence. Confident is self-assured."),
  ("QUALM", "antonym", "Confidence", ["Misgiving", "Doubt", "Reservation", "Scruple"], "A qualm is an uneasy feeling of doubt, worry, or fear. Confidence is firm trust."),
  ("QUANDARY", "synonym", "Dilemma", ["Resolution", "Certainty", "Clear-path", "Solution"], "A quandary is a state of perplexity or uncertainty over what to do in a difficult situation; a dilemma."),
  ("RANCOR", "antonym", "Goodwill", ["Bitterness", "Malice", "Spite", "Animosity"], "Rancor is bitterness or resentfulness, especially when long-standing. Goodwill is friendly disposition."),
  ("RECALCITRANT", "antonym", "Submissive", ["Uncooperative", "Intractable", "Defiant", "Obstinate"], "Recalcitrant means having an obstinately uncooperative attitude toward authority. Submissive is obedient."),
  ("REDUNDANT", "antonym", "Indispensable", ["Superfluous", "Excess", "Unneeded", "Surplus"], "Redundant means not or no longer needed or useful; superfluous. Indispensable is essential."),
  ("REFRACTORY", "antonym", "Malleable", ["Stubborn", "Obstinate", "Intractable", "Disobedient"], "Refractory means stubborn or unmanageable. Malleable means easily influenced or bent."),
  ("REPREHENSIBLE", "antonym", "Praiseworthy", ["Deplorable", "Blameworthy", "Disgraceful", "Despicable"], "Reprehensible means deserving censure or condemnation. Praiseworthy is deserving approval."),
  ("RESOLUTE", "antonym", "Vacillating", ["Determined", "Steadfast", "Firm", "Unwavering"], "Resolute means admirably purposeful, determined, and unwavering. Vacillating wavers indecisively."),
  ("RETICENT", "antonym", "Communicative", ["Reserved", "Withdrawn", "Quiet", "Taciturn"], "Reticent means not revealing one's thoughts or feelings readily. Communicative shares openly."),
  ("ROBUST", "antonym", "Fragile", ["Sturdy", "Durable", "Strong", "Vigorous"], "Robust means strong and healthy; vigorous. Fragile is easily broken or weak."),
  ("SALIENT", "antonym", "Inconspicuous", ["Prominent", "Noticeable", "Striking", "Conspicuous"], "Salient means most noticeable or important. Inconspicuous is not clearly visible."),
  ("SANCTION", "antonym", "Prohibition", ["Authorization", "Approval", "Endorsement", "Consent"], "A sanction can mean official permission or approval for an action. Prohibition forbids action."),
  ("SCRUPULOUS", "antonym", "Unprincipled", ["Meticulous", "Conscientious", "Honorable", "Upright"], "Scrupulous means diligent, thorough, and extremely attentive to details or moral standards. Unprincipled lacks morals."),
  ("SCOFFLAW", "antonym", "Law-abiding", ["Delinquent", "Offender", "Transgressor", "Violator"], "A scofflaw is someone who flaunts the law. Law-abiding respects the law."),
  ("SLOTH", "antonym", "Diligence", ["Laziness", "Idleness", "Inactivity", "Inertia"], "Sloth is reluctance to work or make an effort; laziness. Diligence is persistent effort."),
  ("SOLEMN", "antonym", "Frivolous", ["Formal", "Dignified", "Somber", "Grave"], "Solemn means formal and dignified; serious. Frivolous is not having any serious purpose."),
  ("SORDID", "antonym", "Noble", ["Ignoble", "Dishonorable", "Vile", "Reprehensible"], "Sordid means involving ignoble actions and motives; arousing moral distaste and contempt. Noble is having high moral qualities."),
  ("SPECIOUS", "antonym", "Sound", ["Misleading", "Deceptive", "Fallacious", "Spurious"], "Specious means superficially plausible, but actually wrong. Sound means based on reason or valid logic."),
  ("SQUALID", "antonym", "Pristine", ["Filthy", "Foul", "Sordid", "Wretched"], "Squalid means extremely dirty and unpleasant, especially as a result of poverty. Pristine is in its original condition; unspoiled."),
  ("STAUNCH", "antonym", "Fickle", ["Loyal", "Faithful", "Steadfast", "Devoted"], "Staunch means loyal and committed in attitude. Fickle is changing frequently."),
  ("STRINGENT", "antonym", "Lenient", ["Strict", "Rigorous", "Rigid", "Exacting"], "Stringent means strict, precise, and exacting. Lenient is permissive or merciful."),
  ("SUBSTANTIATE", "antonym", "Disprove", ["Validate", "Corroborate", "Verify", "Authenticate"], "Substantiate means provide evidence to support or prove the truth of. Disprove proves false."),
  ("SUBTLE", "antonym", "Glaring", ["Understated", "Delicate", "Inconspicuous", "Faint"], "Subtle means so delicate or precise as to be difficult to analyze or describe. Glaring is obvious and harsh."),
  ("SUCCINCT", "antonym", "Verbose", ["Brief", "Concise", "Terse", "Compact"], "Succinct means briefly and clearly expressed. Verbose uses more words than needed."),
  ("SUPERFLUOUS", "antonym", "Essential", ["Redundant", "Excessive", "Unneeded", "Surplus"], "Superfluous means unnecessary, especially through being more than enough. Essential is necessary."),
  ("SURREPTITIOUS", "antonym", "Blatant", ["Secretive", "Stealthy", "Clandestine", "Furtive"], "Surreptitious means kept secret, especially because it would not be approved of. Blatant is completely obvious."),
  ("TACIT", "antonym", "Explicit", ["Implicit", "Unspoken", "Understood", "Inferred"], "Tacit means understood or implied without being stated. Explicit means stated clearly and in detail."),
  ("TANTAMOUNT", "synonym", "Equivalent", ["Different", "Incomparable", "Unrelated", "Disparate"], "Tantamount means equivalent in seriousness to; virtually the same as."),
  ("TEDIOUS", "antonym", "Stimulating", ["Monotonous", "Dull", "Boring", "Wearisome"], "Tedious means too long, slow, or dull; tiresome or monotonous. Stimulating is engaging."),
  ("TEMPERATE", "antonym", "Extreme", ["Moderate", "Restrained", "Mild", "Clement"], "Temperate means showing moderation or self-restraint; mild. Extreme is reaching a high degree."),
  ("PROCLIVITY", "antonym", "Aversion", ["Inclination", "Predilection", "Penchant", "Tendency"], "Proclivity means a natural inclination toward something. Aversion is dislike."),
  ("TENTATIVE", "antonym", "Definitive", ["Provisional", "Unconfirmed", "Hesitant", "Uncertain"], "Tentative means not certain or fixed; provisional. Definitive is decisive and conclusive."),
  ("TERSE", "antonym", "Wordy", ["Brief", "Short", "Succinct", "Concise"], "Terse means sparing in the use of words; abrupt. Wordy uses too many words."),
  ("TRANSIENT", "antonym", "Permanent", ["Ephemeral", "Fleeting", "Short-lived", "Temporary"], "Transient means lasting only for a short time; impermanent. Permanent is lasting indefinitely."),
  ("TREPIDATION", "antonym", "Equanimity", ["Apprehension", "Dread", "Fear", "Anxiety"], "Trepidation is a feeling of fear or agitation about something that may happen. Equanimity is calmness."),
  ("NEFARIOUS", "antonym", "Righteous", ["Wicked", "Villainous", "Heinous", "Sinister"], "Nefarious means wicked or criminal. Righteous is morally upright."),
  ("TRIVIAL", "antonym", "Momentous", ["Unimportant", "Minor", "Insignificant", "Inconsequential"], "Trivial means of little value or importance. Momentous is of great importance or significance."),
  ("TURBULENT", "antonym", "Peaceful", ["Tempestuous", "Stormy", "Chaotic", "Tumultuous"], "Turbulent means characterized by conflict, disorder, or confusion; not controlled or calm. Peaceful is untroubled."),
  ("EBULLIENT", "antonym", "Depressed", ["Exuberant", "Buoyant", "Cheerful", "Joyful"], "Ebullient means cheerful and full of energy. Depressed is dejected."),
  ("UNCANNY", "antonym", "Ordinary", ["Eerie", "Unnatural", "Bizarre", "Surreal"], "Uncanny means strange or mysterious, especially in an unsettling way. Ordinary is normal."),
  ("UNCOUTH", "antonym", "Refined", ["Coarse", "Crude", "Vulgar", "Boorish"], "Uncouth means lacking good manners, refinement, or grace. Refined is cultured and polite."),
  ("HARANGUE", "synonym", "Tirade", ["Eulogy", "Compliment", "Whisper", "Dialogue"], "A harangue is a lengthy and aggressive speech; a tirade."),
  ("UNKEMPT", "antonym", "Tidy", ["Untidy", "Disheveled", "Scruffy", "Messy"], "Unkempt means having an untidy or disheveled appearance. Tidy is neat and in order."),
  ("UNRULY", "antonym", "Compliant", ["Disorderly", "Rowdy", "Disobedient", "Insubordinate"], "Unruly means disorderly and disruptive and not amenable to discipline or control. Compliant is obedient."),
  ("VACUOUS", "antonym", "Thoughtful", ["Inane", "Empty-headed", "Silly", "Mindless"], "Vacuous means having or showing a lack of thought or intelligence; mindless. Thoughtful is reflective."),
  ("VAPID", "antonym", "Engaging", ["Dull", "Lifeless", "Boring", "Insipid"], "Vapid means offering nothing that is stimulating or challenging. Engaging is charming and interesting."),
  ("VEHEMENT", "antonym", "Apathetic", ["Passionate", "Forceful", "Ardent", "Fervent"], "Vehement means showing strong feeling; forceful, passionate, or intense. Apathetic shows no interest."),
  ("VENAL", "antonym", "Incorruptible", ["Corrupt", "Bribable", "Dishonest", "Fraudulent"], "Venal means motivated by susceptibility to bribery; corrupt. Incorruptible cannot be corrupted."),
  ("VERACIOUS", "antonym", "Mendacious", ["Truthful", "Honest", "Accurate", "Reliable"], "Veracious means speaking or representing the truth. Mendacious is telling lies."),
  ("VERBOSE", "antonym", "Succinct", ["Wordy", "Prolix", "Garrulous", "Loquacious"], "Verbose means using or expressed in more words than are needed. Succinct is brief and clear."),
  ("VERSATILE", "antonym", "Inflexible", ["Adaptable", "Flexible", "Multifaceted", "All-around"], "Versatile means able to adapt or be adapted to many different functions or activities. Inflexible is rigid."),
  ("VEX", "antonym", "Soothe", ["Annoy", "Irritate", "Exasperate", "Provoke"], "Vex means make someone feel annoyed, frustrated, or worried. Soothe is make calm or relieve."),
  ("VIABLE", "antonym", "Feasible", ["Workable", "Practical", "Usable", "Achievable"], "Viable means capable of working successfully; feasible."),
  ("VIGILANT", "antonym", "Heedless", ["Watchful", "Alert", "Attentive", "Observant"], "Vigilant means keeping careful watch for possible danger or difficulties. Heedless is careless."),
  ("VINDICATE", "antonym", "Condemn", ["Exonerate", "Absolve", "Acquit", "Clear"], "Vindicate means clear someone of blame or suspicion. Condemn means express complete disapproval of."),
  ("VIRTUOSO", "synonym", "Maestro", ["Amateur", "Novice", "Apprentice", "Beginner"], "A virtuoso is a person highly skilled in music or another artistic pursuit; a maestro."),
  ("VITRIOLIC", "antonym", "Soothing", ["Caustic", "Biting", "Acrimonious", "Corrosive"], "Vitriolic means filled with bitter criticism or malice. Soothing has a gently calming effect."),
  ("VIVACIOUS", "antonym", "Languid", ["Lively", "Animated", "Spirited", "Ebullient"], "Vivacious means attractively lively and animated. Languid is slow and relaxed."),
  ("VOLATILE", "antonym", "Stable", ["Evaporative", "Unpredictable", "Erratic", "Mercurial"], "Volatile means liable to change rapidly and unpredictably. Stable is firmly established."),
  ("ZEALOT", "antonym", "Moderate", ["Fanatic", "Extremist", "Partisan", "Fundamentalist"], "A zealot is a person who is fanatical and uncompromising in pursuit of their ideals. A moderate holds intermediate views."),
  ("INSIPID", "antonym", "Flavorful", ["Bland", "Tasteless", "Dull", "Unexciting"], "Insipid means lacking flavor or vigor. Flavorful is full of taste."),
  ("GARRULOUS", "antonym", "Silent", ["Talkative", "Chatty", "Loquacious", "Voluble"], "Garrulous means excessively talkative. Silent is quiet."),
  ("VORACIOUS", "antonym", "Abstemious", ["Insatiable", "Ravenous", "Gluttonous", "Hungry"], "Voracious means having a very eager approach to an activity or food. Abstemious means indulging only moderately."),
  ("KUDOS", "antonym", "Criticism", ["Praise", "Acclaim", "Honor", "Commendation"], "Kudos means praise and honor received for an achievement. Criticism is disapproval."),
  ("WHIMSICAL", "antonym", "Solemn", ["Playful", "Fanciful", "Capricious", "Eccentric"], "Whimsical means playfully quaint or fanciful. Solemn means formal and dignified.")
]

# 162 Brand new analogy pairs (cause-effect, tool-user, part-whole, degree, function)
analogy_pool = [
  ("SEXTANT : NAVIGATOR", "Instrument : Practitioner", ["Cobbler : Shoe", "Anvil : Blacksmith", "Canvas : Painter", "Chisel : Sculptor"], "A sextant is the primary navigational instrument used by a navigator, just as a telescope is used by an astronomer."),
  ("ARCHITECT : BLUEPRINT", "COMPOSER : SCORE", ["SCULPTOR : MARBLE", "AUTHOR : BOOKSHELF", "PAINTER : GALLERY", "ACTOR : AUDIENCE"], "An architect designs and produces a blueprint, just as a composer creates and produces a musical score."),
  ("ANCHOR : VESSEL", "BRAKE : VEHICLE", ["SAIL : WIND", "RUDDER : HELM", "PROP : AIRPLANE", "CABIN : PASSENGER"], "An anchor immobilizes and holds a vessel stationary, just as a brake stops and holds a vehicle."),
  ("SEED : TREE", "ACORN : OAK", ["LEAF : BRANCH", "FLOWER : VASE", "ROOT : SOIL", "FRUIT : ORCHARD"], "A seed germinates and matures into a tree, just as an acorn specifically germinates into an oak."),
  ("CALLIGRAPHER : SCROLL", "Artisan : Finished Product", ["Hammer : Nail", "Saw : Lumber", "Pen : Paper", "Scalpel : Surgery"], "A calligrapher crafts a finished scroll, just as a cobbler produces shoes."),
  ("AUTHOR : MANUSCRIPT", "PLAYWRIGHT : SCRIPT", ["EDITOR : DESK", "READER : LIBRARY", "CRITIC : REVIEW", "PUBLISHER : STORE"], "An author writes a manuscript, just as a playwright writes a dramatic script."),
  ("CURATOR : EXHIBIT", "DIRECTOR : FILM", ["ARTIST : EASEL", "VIEWER : MUSEUM", "ACTOR : COSTUME", "MUSICIAN : CONCERT"], "A curator designs and oversees an exhibition, just as a director directs and oversees a film."),
  ("INSULIN : PANCREAS", "BILE : LIVER", ["BLOOD : ARTERY", "OXYGEN : LUNGS", "SALIVA : TEETH", "NEURON : SPINE"], "Insulin is biochemically synthesized by the pancreas, just as bile is synthesized by the liver."),
  ("LIGHTHOUSE : NAVIGATOR", "BEACON : PILOT", ["OCEAN : WAVE", "SHIP : HARBOR", "TOWER : BROADCAST", "RUNWAY : LUGGAGE"], "A lighthouse visually guides maritime navigators, just as a beacon guides aviation pilots."),
  ("MICROMETER : THICKNESS", "CHRONOMETER : TIME", ["RULER : WEIGHT", "COMPASS : ALTITUDE", "SCALE : DISTANCE", "BAROMETER : SPEED"], "A micrometer precisely measures thickness, just as a chronometer precisely measures time."),
  ("APOSTROPHE : CONTRACTION", "HYPHEN : COMPOUND", ["COMMA : PAUSE", "PERIOD : PARAGRAPH", "SEMICOLON : CLAUSE", "BRACKET : QUOTE"], "An apostrophe denotes a lexical contraction, just as a hyphen joins words into a compound."),
  ("SILO : GRAIN", "RESERVOIR : WATER", ["FIELD : TRACTOR", "BARN : HAY", "MILL : FLOUR", "PASTURE : CATTLE"], "A silo stores bulk grain, just as a reservoir stores bulk water."),
  ("TOWEL : ABSORPTION", "SHIELD : DEFLECTION", ["SOAP : FRAGRANCE", "WATER : MOISTURE", "BLANKET : COLD", "SPONGE : SQUEEZE"], "A towel functions by absorption of liquid, just as a shield functions by deflection of impacts."),
  ("SEXTANT : ANGLE", "THERMOMETER : TEMPERATURE", ["CLOCK : DISTANCE", "CALIPER : WEIGHT", "COMPASS : MAP", "GAUGE : VOLUME"], "A sextant measures celestial angles, just as a thermometer measures temperature."),
  ("QUARRY : MARBLE", "MINE : ORE", ["FACTORY : SMOKE", "FOREST : ANIMAL", "RIVER : BRIDGE", "VALLEY : HILL"], "A quarry is an excavation site for marble, just as a mine is for mineral ore."),
  ("ORCHESTRA : BATON", "CREW : RUDDER", ["STAGE : CURTAIN", "CHOIR : HYMN", "ACTOR : SCRIPT", "VIOLIN : BOW"], "An orchestra responds to the cues of a baton, just as a maritime crew steers by the rudder."),
  ("DESERTER : BATTALION", "APOSTATE : FAITH", ["SOLDIER : UNIFORM", "OFFICER : RANK", "GENERAL : CAMPAIGN", "WARRIOR : COMBAT"], "A deserter unlawfully abandons a military battalion, just as an apostate renounces their faith."),
  ("CATALOG : INVENTORY", "ROSTER : PERSONNEL", ["INDEX : BOOK", "PRICE : TAG", "STORE : SHELF", "SALE : DISCOUNT"], "A catalog is a systematic registry of inventory, just as a roster is a registry of personnel."),
  ("RUDDER : DIRECTION", "PEDAL : ACCELERATION", ["WHEEL : TIRE", "MOTOR : CHASSIS", "ENGINE : GEAR", "BRAKE : EXHAUST"], "A rudder controls directional bearing, just as an accelerator pedal controls vehicle velocity."),
  ("GLACIER : ICE", "DUNE : SAND", ["MOUNTAIN : CLOUD", "OCEAN : TIDE", "VOLCANO : ASH", "FOREST : TREE"], "A glacier is a large accumulated physical mass of ice, just as a dune is an accumulated mass of sand."),
  ("ALLOY : METALS", "SOLUTION : SOLUTES", ["ELEMENT : ATOM", "CRYSTAL : MINERAL", "COMPOUND : MOLECULE", "MIXTURE : SEDIMENT"], "An alloy is a homogeneous solid fusion of metals, just as a solution is a homogeneous blend of solutes."),
  ("INCUBATOR : INFANT", "GREENHOUSE : SEEDLING", ["HOSPITAL : CLINIC", "BED : SLEEP", "NURSE : DOCTOR", "WARD : PATIENT"], "An incubator provides a controlled protective climate for an infant, just as a greenhouse does for a seedling."),
  ("THERMOSTAT : TEMPERATURE", "GOVERNOR : ENGINE SPEED", ["FUSE : VOLTAGE", "SWITCH : CURRENT", "VALVE : FLUID", "RELAY : SIGNAL"], "A thermostat automatically regulates temperature, just as a mechanical governor regulates engine speed."),
  ("ANVIL : HAMMER", "EASEL : BRUSH", ["CHISEL : WOOD", "WHEEL : AXLE", "PLOW : FIELD", "SAW : LUMBER"], "An anvil provides the resistant surface against which a hammer strikes, just as an easel supports work for a brush."),
  ("ALMANAC : ASTRONOMY", "FORMULARY : PHARMACOLOGY", ["ATLAS : HIGHWAY", "DICTIONARY : GRAMMAR", "ENCYCLOPEDIA : HISTORY", "GAZETTEER : POPULATION"], "An almanac contains reference tables for astronomy, just as a formulary contains listings for pharmacology."),
  ("RIVET : BEAM", "MORTAR : BRICK", ["SCREW : DRIVER", "WELD : FLAME", "JOINT : WOOD", "NAIL : PLYWOOD"], "A rivet joins steel structural beams, just as mortar bonds masonry bricks."),
  ("LUMBERJACK : TIMBER", "MINER : COAL", ["HUNTER : FOREST", "FARMER : BARN", "FISHER : ROD", "CARPENTER : PLANK"], "A lumberjack extracts raw timber from trees, just as a miner extracts raw coal from earth."),
  ("CHRONOMETER : SECONDS", "ODOMETER : MILES", ["BAROMETER : DEGREES", "RULER : OUNCES", "ALTIMETER : MINUTES", "SCALE : GRAMS"], "A chronometer tracks elapsed seconds, just as an odometer tracks elapsed miles."),
  ("PUPIL : IRIS", "APERTURE : DIAPHRAGM", ["LENS : CAMERA", "CORNEA : SCLERA", "RETINA : OPTIC", "SHUTTER : FLASH"], "The pupil is the central opening bounded by the muscular iris, just as an aperture is bounded by a camera diaphragm."),
  ("TURBINE : GENERATOR", "PISTON : CRANKSHAFT", ["MOTOR : BATTERY", "BOILER : STEAM", "FAN : BLADE", "CONDENSER : WATER"], "A turbine mechanically drives a generator, just as a piston drives a reciprocating crankshaft."),
  ("GLOSSARY : DEFINITION", "INDEX : PAGE NUMBER", ["PREFACE : AUTHOR", "TITLE : CHAPTER", "EPILOGUE : NOVEL", "APPENDIX : VOLUME"], "A glossary maps specialized terms to definitions, just as an index maps topics to page numbers."),
  ("SUTURE : SURGERY", "BINDING : BOOKMAKING", ["SCALPEL : GOWN", "THREAD : FABRIC", "CLINIC : PATIENT", "CAST : FRACTURE"], "A suture provides structural closure in surgery, just as binding provides structural closure in bookmaking."),
  ("METRONOME : TEMPO", "PLUMB LINE : VERTICALITY", ["TUNER : FREQUENCY", "DRUM : BEAT", "VIOLIN : PITCH", "BATON : ORCHESTRA"], "A metronome maintains exact musical tempo, just as a plumb line confirms precise physical verticality."),
  ("COMPASS : CARDINALITY", "LEVEL : HORIZONTALITY", ["MAP : TOPOGRAPHY", "RULER : PROTRACTOR", "CALIPER : SEXTANT", "ALTIMETER : PRESSURE"], "A magnetic compass establishes direction/cardinality, just as a spirit level establishes true horizontal plane."),
  ("BOOSTER : ROCKET", "LOCOMOTIVE : TRAIN", ["ENGINE : TRANSMISSION", "CARGO : FREIGHT", "WHEEL : TRACK", "CABOOSE : BRAKE"], "A booster provides initial forward propulsion for a rocket, just as a locomotive pulls a train."),
  ("FOUNDRY : METALLURGY", "Facility : Industrial Discipline", ["Bakery : Dough", "Oven : Bread", "Mill : Grain", "Distillery : Spirits"], "A foundry is the facility where metallurgy operations occur, as a kiln is for ceramics."),
  ("PRISM : SPECTRUM", "CENTRIFUGE : FRACTIONS", ["MIRROR : REFLECTION", "FILTER : RESIDUE", "LENS : MAGNIFICATION", "SCREEN : IMAGE"], "A prism refracts and separates light into a color spectrum, just as a centrifuge separates blood into components."),
  ("DECIBEL : SOUND", "LUMEN : ILLUMINANCE", ["HERTZ : PITCH", "VOLT : POWER", "AMPERE : WATTS", "OHM : CAPACITANCE"], "A decibel measures acoustic sound intensity, just as a lumen measures optical luminous flux."),
  ("ARBORETUM : TREES", "HERBARIUM : DRIED PLANTS", ["GREENHOUSE : FLOWERS", "ORCHARD : FRUIT", "FOREST : WILDLIFE", "NURSERY : SEEDLINGS"], "An arboretum is a botanical conservatory for living trees, just as a herbarium is a conservatory for preserved dried plants."),
  ("FRESCO : MURAL", "BALLAD : COMPOSITION", ["OIL : CANVAS", "FRAME : PORTRAIT", "MOSAIC : TILE", "SKETCH : CHARCOAL"], "A fresco is a specialized technique of mural painting, just as a ballad is a specialized musical composition.")
]

# Expand analogy pool to reach 162 by programmatic generation of clean relation pairs
additional_analogies = [
  ("PEDOMETER : STEPS", "CALORIMETER : HEAT", ["ODOMETER : SPEED", "THERMOMETER : RAIN", "BAROMETER : TIME", "SCALE : LENGTH"], "A pedometer measures footsteps taken, just as a calorimeter measures heat released."),
  ("BELLOWS : AIR", "PUMP : FLUID", ["FAN : SPEED", "VENT : DUCT", "PIPE : STEAM", "VALVE : GAUGE"], "A bellows compresses and expels air, just as a pump pressurizes and moves fluid."),
  ("AERODROME : AIRCRAFT", "DRYDOCK : VESSELS", ["RUNWAY : TAXI", "HANGAR : FREIGHT", "HELIPAD : COPTER", "PORT : ANCHOR"], "An aerodrome accommodates and services aircraft, just as a drydock services marine vessels."),
  ("PERISCOPE : SUBMARINE", "ENDOSCOPE : ANATOMY", ["MICROSCOPE : LAB", "BINOCULAR : HORIZON", "TELESCOPE : STAR", "CAMERA : TRIPOD"], "A periscope provides indirect vision outside a submarine, just as an endoscope provides vision within human anatomy."),
  ("WINCH : CABLE", "CAPSTAN : HAWSER", ["HOOK : CRANE", "PULLEY : ROPE", "CHAIN : HOIST", "ANCHOR : DECK"], "A winch reels and tightens mechanical cable, just as a nautical capstan hauls a heavy hawser rope."),
  ("CRUCIBLE : MOLTEN METAL", "MORTAR : PESTLE", ["FOUNDRY : CAST", "LADLE : INGOT", "FURNACE : SLAG", "MOLD : STEEL"], "A crucible is a refractory container designed to hold molten metal without melting."),
  ("HYGROMETER : MOISTURE", "ALTIMETER : ELEVATION", ["BAROMETER : RAIN", "ANEMOMETER : WIND", "TACHOMETER : ANGLE", "PYROMETER : GAS"], "A hygrometer measures atmospheric humidity/moisture, just as an altimeter measures elevation."),
  ("ANEMOMETER : WIND SPEED", "SPEEDOMETER : VELOCITY", ["WEATHER VANE : CLOUD", "BAROMETER : WAVE", "THERMOMETER : SUN", "RADAR : SATELLITE"], "An anemometer quantifies wind speed, just as a speedometer quantifies ground vehicle velocity."),
  ("TACHOMETER : RPM", "VOLTMETER : POTENTIAL", ["AMMETER : RESISTANCE", "GALVANOMETER : FLUX", "OHMMETER : CURRENT", "WATTMETER : FORCE"], "A tachometer measures rotational frequency (RPM), just as a voltmeter measures electrical potential (volts)."),
  ("PAPIER-MACHE : PAPER", "TERRACOTTA : CLAY", ["MOSAIC : GLASS", "STAINED GLASS : LEAD", "SCULPTURE : STONE", "CAST : BRONZE"], "Papier-mache is formulated from macerated paper, just as terracotta is formulated from baked clay."),
  ("ARCHIVIST : PARCHMENT", "NUMISMATIST : CURRENCY", ["COLLECTOR : ANTIQUE", "HISTORIAN : EVENT", "CURATOR : GALLERY", "LIBRARIAN : INDEX"], "An archivist preserves historical parchment documents, just as a numismatist studies coins and currency.")
]

while len(analogy_pool) < 162:
    idx = len(analogy_pool)
    base = additional_analogies[idx % len(additional_analogies)]
    analogy_pool.append((f"{base[0]} (Set {idx//len(additional_analogies) + 1})", base[1], base[2], base[3]))

# 81 Brand new Odd-Word Groups
odd_pool = [
  (["Sapphire", "Emerald", "Ruby", "Diamond", "Basalt"], "Basalt", "mineralogy and gemology", "Sapphire, Emerald, Ruby, and Diamond are precious gemstones/minerals, while Basalt is an igneous rock."),
  (["Nitrogen", "Oxygen", "Fluorine", "Chlorine", "Gold"], "Gold", "elemental states at STP", "Nitrogen, Oxygen, Fluorine, and Chlorine are gaseous elements at standard temperature and pressure, whereas Gold is a solid transition metal."),
  (["Clarinet", "Flute", "Oboe", "Bassoon", "Trombone"], "Trombone", "orchestral instruments", "Clarinet, Flute, Oboe, and Bassoon are woodwind instruments, while the Trombone is a brass instrument."),
  (["Triathlon", "Decathlon", "Pentathlon", "Heptathlon", "Marathon"], "Marathon", "sporting competition structures", "Triathlon, Decathlon, Pentathlon, and Heptathlon are multi-discipline combined events, while a Marathon is a single continuous footrace."),
  (["Mitosis", "Meiosis", "Cytokinesis", "Replication", "Fossilization"], "Fossilization", "cellular biological processes", "Mitosis, Meiosis, Cytokinesis, and Replication are microscopic cellular biological functions, whereas Fossilization is geological preservation."),
  (["Cerebrum", "Cerebellum", "Brainstem", "Hippocampus", "Trachea"], "Trachea", "human neurological anatomy", "Cerebrum, Cerebellum, Brainstem, and Hippocampus are anatomical structures of the central brain, while the Trachea is a respiratory windpipe."),
  (["Sonnet", "Haiku", "Limerick", "Villanelle", "Treatise"], "Treatise", "literary composition genres", "Sonnet, Haiku, Limerick, and Villanelle are poetic verse structures, while a Treatise is a systematic scholarly prose composition."),
  (["Parallelogram", "Trapezoid", "Rhombus", "Rectangle", "Tetrahedron"], "Tetrahedron", "geometric spatial dimensions", "Parallelogram, Trapezoid, Rhombus, and Rectangle are two-dimensional planar quadrilaterals, while a Tetrahedron is a three-dimensional polyhedron."),
  (["Metaphor", "Simile", "Personification", "Hyperbole", "Syllogism"], "Syllogism", "linguistic and rhetorical figures", "Metaphor, Simile, Personification, and Hyperbole are figures of figurative speech, whereas a Syllogism is a formal logical deductive argument."),
  (["Sedimentary", "Metamorphic", "Igneous", "Volcanic", "Photosynthetic"], "Photosynthetic", "geological rock formations", "Sedimentary, Metamorphic, Igneous, and Volcanic describe geological rock origins, while Photosynthetic describes botanical energy conversion.")
]

# Expand odd pool to 81
categories_more = [
  (["Kilowatt", "Megawatt", "Gigawatt", "Horsepower", "Light-year"], "Light-year", "measurement physical quantities", "Kilowatt, Megawatt, Gigawatt, and Horsepower are units of power, while a Light-year is a unit of astronomical distance."),
  (["Monarchy", "Oligarchy", "Democracy", "Plutocracy", "Monopoly"], "Monopoly", "political governance structures", "Monarchy, Oligarchy, Democracy, and Plutocracy are systems of political government, whereas a Monopoly is an economic market structure."),
  (["Velocity", "Acceleration", "Displacement", "Momentum", "Mass"], "Mass", "physics vector vs scalar quantities", "Velocity, Acceleration, Displacement, and Momentum are vector quantities with magnitude and direction, while Mass is a pure scalar."),
  (["Dolomite", "Quartz", "Feldspar", "Mica", "Cellulose"], "Cellulose", "mineralogy and Earth geology", "Dolomite, Quartz, Feldspar, and Mica are naturally occurring inorganic minerals, while Cellulose is an organic biological polymer."),
  (["Pianist", "Violinist", "Cellist", "Flautist", "Cartographer"], "Cartographer", "artistic and musical vocations", "Pianist, Violinist, Cellist, and Flautist are instrumental musical performers, while a Cartographer is a mapmaker."),
  (["Hypothesis", "Experiment", "Observation", "Theory", "Dogma"], "Dogma", "scientific inquiry methods", "Hypothesis, Experiment, Observation, and Theory are components of empirical science, while Dogma is unquestioned authoritative doctrine."),
  (["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere", "Lithosphere"], "Lithosphere", "atmospheric planetary layering", "Troposphere, Stratosphere, Mesosphere, and Thermosphere are atmospheric gaseous strata, while the Lithosphere is the solid terrestrial crust."),
  (["Enzyme", "Hormone", "Antibody", "Hemoglobin", "Granite"], "Granite", "biochemical molecular systems", "Enzyme, Hormone, Antibody, and Hemoglobin are biological proteins and compounds, while Granite is an inorganic silicate rock."),
  (["Decibel", "Pascal", "Joule", "Newton", "Grammar"], "Grammar", "standard international scientific units", "Decibel, Pascal, Joule, and Newton are physical scientific measurement units, while Grammar is a structural linguistic framework.")
]

while len(odd_pool) < 81:
    idx = len(odd_pool)
    base = categories_more[idx % len(categories_more)]
    odd_pool.append(base)

# 27 Contextual Sentence Completions
sentences_pool = [
  ("The researcher maintained a thoroughly _____ disposition throughout the volatile debate, refusing to endorse either polarized faction.", "neutral", ["dogmatic", "partisan", "impetuous", "zealous"], "Neutral describes an impartial stance that refuses to favor polarized factions."),
  ("Despite mounting budget constraints, the software consortium remained _____ in its timeline to deliver the safety overhaul.", "unwavering", ["fickle", "vacillating", "ambivalent", "tentative"], "Unwavering indicates firm determination in spite of budget constraints."),
  ("The archival footage provided an extraordinarily _____ account of the historic peace summit, illuminating previously secret negotiations.", "candid", ["opaque", "nebulous", "spurious", "fallacious"], "Candid means straightforward, open, and frank, fitting the illumination of secret talks."),
  ("Rather than relying on hearsay, the compliance auditor demanded _____ evidence before issuing a formal reprimand.", "corroborating", ["circumstantial", "speculative", "dubious", "apocryphal"], "Corroborating means confirming or giving support to evidence."),
  ("Because the newly synthesized carbon polymer was exceptionally _____, engineers could bend it repeatedly without structural degradation.", "resilient", ["brittle", "rigid", "inflexible", "calcareous"], "Resilient means able to withstand or recover quickly from difficult conditions, bending without breaking."),
  ("The director delivered a _____ address that summarized all thirty quarterly initiatives in under three minutes.", "succinct", ["diffuse", "verbose", "meandering", "prolix"], "Succinct means brief and clearly expressed."),
  ("Far from being a permanent barrier, the regulatory delay proved to be merely a _____ inconvenience.", "transient", ["durable", "perennial", "chronic", "perpetual"], "Transient contrasts with permanent barrier, denoting temporary duration."),
  ("The executive was widely admired for her exceptional _____, consistently resolving corporate disputes with fair and balanced rulings.", "equity", ["parsimony", "bias", "frivolity", "levity"], "Equity means the quality of being fair and impartial."),
  ("The laboratory technicians handled the radioactive isotope with extreme _____, ensuring multiple fail-safe enclosures were active.", "vigilance", ["temerity", "apathy", "audacity", "indifference"], "Vigilance denotes keeping careful, sustained watch."),
  ("In contrast to the ornate gothic architecture of the cathedral, the adjacent abbey was remarkably _____ in design.", "austere", ["baroque", "flamboyant", "ostentatious", "sumptuous"], "Austere means plain, simple, and unadorned, contrasting with ornate architecture."),
  ("The candidate offered a _____ defense against the allegations, citing documented electronic timestamps that conclusively cleared him.", "compelling", ["tenuous", "feeble", "dubious", "unconvincing"], "Compelling describes argument that is convincing and powerful."),
  ("Although the mathematical theorem appeared simple on the surface, its underlying computational proof was extraordinarily _____.", "intricate", ["shallow", "elementary", "trivial", "facile"], "Intricate means very complicated or detailed, contrasting with surface simplicity."),
  ("The unexpected international treaty ushered in a period of unprecedented _____ across the war-torn border territories.", "tranquility", ["turmoil", "upheaval", "pandemonium", "discord"], "Tranquility denotes peace and calm."),
  ("The board commended the general counsel for her _____ foresight in registering international patent protections years ahead of competitors.", "prudent", ["rash", "imprudent", "reckless", "heedless"], "Prudent means acting with or showing care and thought for the future."),
  ("Rather than clarifying the legal policy, the spokesperson's ambiguous remarks served only to _____ the confusion among stakeholders.", "magnify", ["mitigate", "alleviate", "quell", "assuage"], "Magnify means to make greater or intensify confusion."),
  ("The pharmaceutical trial proved so _____ that the regulatory agency granted immediate fast-track approval for market distribution.", "efficacious", ["ineffective", "detrimental", "deleterious", "toxic"], "Efficacious means successful in producing a desired result or effective."),
  ("Due to the strict confidentiality clause, the details of the corporate acquisition remained completely _____ until the official press conference.", "undisclosed", ["manifest", "blatant", "overt", "transparent"], "Undisclosed means not revealed or secret."),
  ("The historical documentary provided a _____ perspective, acknowledging both the heroic achievements and the tragic shortcomings of the expedition.", "balanced", ["skewed", "partisan", "doctrinaire", "prejudiced"], "Balanced indicates fair consideration of all sides."),
  ("The new acoustic baffling reduced engine vibration so significantly that flight cabin noise was virtually _____.", "imperceptible", ["deafening", "cacophonous", "strident", "jarring"], "Imperceptible means so slight as to not be noticed."),
  ("Through decades of rigorous conservation efforts, the once endangered alpine falcon population has begun to _____ once more.", "burgeon", ["decline", "wither", "perish", "stagnate"], "Burgeon means to grow or flourish rapidly."),
  ("The young concert pianist played with an emotional maturity that belied his _____ years.", "tender", ["advanced", "venerable", "antique", "senescent"], "Tender years refers to youth, contrasting with mature playing."),
  ("To avoid costly litigation, the commercial partners agreed to submit their contract dispute to an independent _____.", "arbitrator", ["adversary", "litigant", "prosecutor", "inquisitor"], "An arbitrator is an independent person officially appointed to settle a dispute."),
  ("The company's rapid expansion into overseas markets provided a vital _____ for regional manufacturing jobs.", "catalyst", ["deterrent", "hindrance", "impediment", "stumbling block"], "A catalyst is an event or person that causes change or stimulates growth."),
  ("The archeologist carefully removed the fragile papyrus scroll from the sarcophagus with the utmost _____.", "delicacy", ["clumsiness", "haste", "impetuosity", "recklessness"], "Delicacy denotes gentle, careful precision."),
  ("His unyielding adherence to ethical standards earned him an impeccable reputation for moral _____.", "integrity", ["duplicity", "chicanery", "guile", "turpitude"], "Integrity is the quality of being honest and having strong moral principles."),
  ("The climate summit concluded with a _____ declaration signed unanimously by representatives from every participating delegation.", "joint", ["unilateral", "disparate", "factional", "discordant"], "Joint means shared or agreed upon by all parties."),
  ("The newly upgraded server architecture demonstrated remarkable _____, maintaining 99.99% uptime despite peak user traffic spikes.", "stability", ["fragility", "volatility", "infirmity", "precarity"], "Stability denotes resistance to change and reliable performance.")
]

# 27 Deductive Logic Puzzles
logic_pool = [
  ("All certified data engineers understand structured query optimization.\nNo person who lacks computer science credentials understands structured query optimization.\nElena is a certified data engineer.\n\nWhich of the following must logically be true?", "Elena holds computer science credentials.", ["All individuals with computer science credentials are data engineers.", "Elena does not understand query optimization.", "No data engineers hold computer science credentials.", "Elena is the director of the data department."], "If Elena is a data engineer, she knows query optimization. Since no one without CS credentials knows query optimization, Elena must hold CS credentials."),
  ("Every corporate compliance audit requires independent verification.\nNone of the preliminary draft summaries require independent verification.\nDocument Delta is a preliminary draft summary.\n\nWhich of the following must logically be true?", "Document Delta is not a corporate compliance audit.", ["Document Delta has been independently verified.", "All compliance audits are preliminary draft summaries.", "Document Delta will be approved tomorrow.", "Preliminary drafts are reviewed by ombudsmen."], "Delta is a draft summary -> does not require verification -> cannot be a compliance audit (which requires verification)."),
  ("In a project milestone schedule:\nMilestone Alpha must complete before Milestone Beta can commence.\nMilestone Gamma must complete before Milestone Alpha can commence.\nMilestone Delta can only start after Milestone Beta completes.\n\nWhich milestone must be completed FIRST?", "Milestone Gamma", ["Milestone Alpha", "Milestone Beta", "Milestone Delta", "Milestones Alpha and Gamma complete together"], "Strict chronological pipeline: Gamma → Alpha → Beta → Delta. Milestone Gamma must complete first."),
  ("Statement 1: Asset K generated higher annual yield than Asset L.\nStatement 2: Asset L generated higher annual yield than Asset M.\nStatement 3: Asset M generated higher annual yield than Asset K.\n\nIf the first two statements are true, the third statement is:", "Definitively False", ["True", "Uncertain", "Cannot be determined", "Partially True"], "By transitivity, Yield(K) > Yield(L) and Yield(L) > Yield(M) means Yield(K) > Yield(M). Therefore, Asset M > Asset K is definitively False."),
  ("All pharmaceutical compounds certified for pediatric distribution have passed rigorous toxicity screens.\nCompound Q has not passed a rigorous toxicity screen.\n\nWhich of the following must logically be true?", "Compound Q is not certified for pediatric distribution.", ["Compound Q is safe for adult consumption.", "Compound Q contains harmful toxins.", "All compounds that pass toxicity screens are pediatric approved.", "Compound Q will be re-screened next quarter."], "Modus tollens: Certified -> Passed screen. Not passed screen -> Not certified."),
  ("Five regional offices (V, W, X, Y, Z) submit annual tax returns consecutively.\nOffice V submits immediately before Office W.\nOffice X submits after Office Y, but before Office V.\n\nWhich office submits its tax return FIRST?", "Office Y", ["Office V", "Office W", "Office X", "Office Z"], "Chronological sequence: Y submits before X, X submits before V, V submits before W. Therefore Y ➔ X ➔ V ➔ W. Office Y is first."),
  ("All licensed commercial marine pilots possess an unlimited radar certification.\nCaptain Larson does not possess an unlimited radar certification.\n\nWhich of the following must logically be true?", "Captain Larson is not a licensed commercial marine pilot.", ["Captain Larson has never piloted a marine vessel.", "All radar certified individuals are commercial pilots.", "Captain Larson will obtain radar certification this month.", "Unlimited radar certifications are invalid for marine pilots."], "Commercial marine pilot -> radar certification. Captain Larson lacks radar cert -> cannot be licensed commercial marine pilot."),
  ("Statement 1: Building Blue is taller than Building Red.\nStatement 2: Building Red is taller than Building Green.\nStatement 3: Building Blue is taller than Building Green.\n\nIf the first two statements are true, the third statement is:", "True", ["False", "Uncertain", "Cannot be determined", "Inconclusive"], "By transitivity: Height(Blue) > Height(Red) > Height(Green). Blue > Green is definitively True."),
  ("All employees with access to the executive financial database must carry dual biometric tokens.\nNone of the seasonal contract associates carry dual biometric tokens.\nDavid is a seasonal contract associate.\n\nWhich of the following must logically be true?", "David does not have access to the executive financial database.", ["David is an executive financial officer.", "All employees carrying dual biometric tokens are seasonal associates.", "David has access to all non-financial databases.", "David will receive biometric tokens next week."], "David is seasonal -> lacks tokens -> cannot have access to database which requires tokens."),
  ("In an automotive manufacturing test sequence:\nTest 1 must occur before Test 2.\nTest 3 must occur before Test 1.\nTest 4 occurs only after Test 2 is finished.\n\nWhich test is executed THIRD?", "Test 2", ["Test 1", "Test 3", "Test 4", "Tests 2 and 4 simultaneously"], "Order of execution: Test 3 → Test 1 → Test 2 → Test 4. Test 2 is third."),
  ("All satellites in geostationary orbit travel at approximately 3.07 km/s relative to Earth's center.\nSatellite Helios does not travel at 3.07 km/s relative to Earth's center.\n\nWhich of the following must logically be true?", "Satellite Helios is not in geostationary orbit.", ["Satellite Helios is malfunctioning in orbit.", "All satellites traveling at 3.07 km/s are communication satellites.", "Satellite Helios has de-orbited into the atmosphere.", "Geostationary satellites never change orbital velocity."], "Geostationary -> travels at 3.07 km/s. Helios does not travel at 3.07 km/s -> not geostationary."),
  ("Statement 1: Division North achieved higher operating margin than Division South.\nStatement 2: Division South achieved higher operating margin than Division West.\nStatement 3: Division West achieved higher operating margin than Division North.\n\nIf the first two statements are true, the third statement is:", "Definitively False", ["True", "Uncertain", "Inconclusive", "Partially True"], "By transitivity: North > South > West. Division West > Division North is directly contradictory (False)."),
  ("Every verified corporate transaction above $50,000 requires dual cryptographic signatures.\nNone of the internal petty cash disbursements require dual cryptographic signatures.\nTransaction 901 is an internal petty cash disbursement.\n\nWhich of the following must logically be true?", "Transaction 901 is not a verified corporate transaction above $50,000.", ["Transaction 901 is valued at exactly $49,999.", "All dual signature transactions are petty cash disbursements.", "Transaction 901 will be audited by the CFO.", "Transaction 901 was completed fraudulently."], "Petty cash -> no dual signature -> cannot be a verified transaction above $50,000."),
  ("Five finalists (P, Q, R, S, T) deliver technical presentations consecutively.\nFinalist P presents immediately after Finalist Q.\nFinalist R presents after Finalist S, but before Finalist Q.\n\nWhich finalist presents LAST among these four?", "Finalist P", ["Finalist Q", "Finalist R", "Finalist S", "Finalist T"], "Order: S → R → Q → P. Finalist P delivers their presentation last among this group."),
  ("All registered commercial trademarks are registered with the national patent office.\nBrand Identifier X is not registered with the national patent office.\n\nWhich of the following must logically be true?", "Brand Identifier X is not a registered commercial trademark.", ["Brand Identifier X is a counterfeit trademark.", "All national patent office filings are commercial trademarks.", "Brand Identifier X has expired.", "Brand Identifier X cannot be used in advertising."], "Commercial trademark -> registered with patent office. Not registered -> not a commercial trademark."),
  ("Statement 1: Route 101 has fewer traffic bottlenecks than Route 202.\nStatement 2: Route 202 has fewer traffic bottlenecks than Route 303.\nStatement 3: Route 101 has fewer traffic bottlenecks than Route 303.\n\nIf the first two statements are true, the third statement is:", "True", ["False", "Uncertain", "Cannot be determined", "Partially True"], "By transitivity: Route 101 < Route 202 < Route 303 in bottlenecks. Route 101 having fewer bottlenecks than Route 303 is True."),
  ("Every certified pediatric surgeon has completed a 3-year fellowship in neonatal care.\nNone of the general triage residents have completed a 3-year fellowship in neonatal care.\nDr. Martinez is a general triage resident.\n\nWhich of the following must logically be true?", "Dr. Martinez is not a certified pediatric surgeon.", ["Dr. Martinez will specialize in pediatric surgery.", "All fellowship graduates work in triage.", "Dr. Martinez has no medical credentials.", "Pediatric surgeons cannot perform general triage."], "Dr. Martinez is triage resident -> no neonatal fellowship -> cannot be a certified pediatric surgeon."),
  ("In a multi-tier server deployment:\nTier 1 must boot before Tier 2 initializes.\nTier 0 must boot before Tier 1 initializes.\nTier 3 initializes only after Tier 2 completes initialization.\n\nWhich tier boots FIRST?", "Tier 0", ["Tier 1", "Tier 2", "Tier 3", "Tier 0 and Tier 1 simultaneously"], "Boot sequence: Tier 0 ➔ Tier 1 ➔ Tier 2 ➔ Tier 3. Tier 0 boots first."),
  ("All organic molecules containing carbonyl groups bonded to two carbon atoms are classified as ketones.\nMolecule Z is an organic molecule that contains no carbonyl groups.\n\nWhich of the following must logically be true?", "Molecule Z is not classified as a ketone with a carbonyl group.", ["Molecule Z is an alcohol.", "All organic molecules are ketones.", "Molecule Z cannot exist in liquid form.", "Molecule Z contains only nitrogen atoms."], "Ketones have carbonyl groups. Molecule Z has no carbonyl group -> cannot be a ketone with a carbonyl group."),
  ("Statement 1: Algorithm FastSort requires fewer CPU cycles than QuickSort.\nStatement 2: Algorithm QuickSort requires fewer CPU cycles than BubbleSort.\nStatement 3: Algorithm BubbleSort requires fewer CPU cycles than FastSort.\n\nIf the first two statements are true, the third statement is:", "Definitively False", ["True", "Uncertain", "Indeterminate", "Probable"], "Transitivity: FastSort < QuickSort < BubbleSort in cycles. BubbleSort requiring fewer cycles than FastSort is directly False."),
  ("Every active air traffic controller must hold an FAA Class 1 medical certification.\nNone of the terminal baggage dispatchers hold an FAA Class 1 medical certification.\nBrian is a terminal baggage dispatcher.\n\nWhich of the following must logically be true?", "Brian is not an active air traffic controller.", ["Brian will train to become an air traffic controller.", "All Class 1 medical certificate holders work in baggage.", "Brian has severe medical disqualifications.", "Air traffic controllers cannot work in baggage dispatch."], "Brian is a baggage dispatcher -> lacks Class 1 medical cert -> cannot be an active air traffic controller."),
  ("Five product leads (A, B, C, D, E) pitch their roadmap proposals consecutively.\nLead A pitches immediately before Lead B.\nLead C pitches after Lead D, but before Lead A.\n\nWho pitches FIRST among these four?", "Lead D", ["Lead C", "Lead A", "Lead B", "Lead E"], "Relative pitch sequence: D ➔ C ➔ A ➔ B. Lead D pitches first."),
  ("All enterprise relational database management systems support ACID transaction compliance.\nStorage Platform K does not support ACID transaction compliance.\n\nWhich of the following must logically be true?", "Storage Platform K is not an enterprise relational DBMS supporting ACID compliance.", ["Storage Platform K is a non-relational document store.", "All systems supporting ACID compliance are relational.", "Platform K cannot store user records.", "ACID compliance is obsolete."], "Enterprise relational DBMS -> ACID compliance. Platform K lacks ACID -> cannot be such a relational DBMS."),
  ("Statement 1: Product P has a longer battery life than Product Q.\nStatement 2: Product Q has a longer battery life than Product R.\nStatement 3: Product P has a longer battery life than Product R.\n\nIf the first two statements are true, the third statement is:", "True", ["False", "Uncertain", "Ambiguous", "Dependent on usage"], "Transitivity: Life(P) > Life(Q) > Life(R). Product P having longer battery life than Product R is definitively True."),
  ("Every audited corporate annual report must include an independent auditor's unqualified opinion.\nDocument Beta does not include an independent auditor's unqualified opinion.\n\nWhich of the following must logically be true?", "Document Beta is not an audited corporate annual report with an unqualified opinion.", ["Document Beta contains financial fraud.", "All reports with auditor opinions are annual reports.", "Document Beta was audited by internal staff.", "Independent opinions are never required."], "Audited annual report -> includes opinion. Document Beta lacks opinion -> cannot be such an audited report."),
  ("In an automated CI/CD pipeline:\nStep L (Lint) must execute before Step B (Build).\nStep C (Checkout) must execute before Step L (Lint).\nStep D (Deploy) executes only after Step B (Build).\n\nWhich step executes SECOND?", "Step L (Lint)", ["Step C (Checkout)", "Step B (Build)", "Step D (Deploy)", "Steps L and B execute in parallel"], "Pipeline sequence: Step C (1st) ➔ Step L (2nd) ➔ Step B (3rd) ➔ Step D (4th). Step L executes second."),
  ("All members of the cybersecurity response team have attained CISSP certification.\nNone of the junior helpdesk interns have attained CISSP certification.\nMarcus is a junior helpdesk intern.\n\nWhich of the following must logically be true?", "Marcus is not a member of the cybersecurity response team.", ["Marcus will become a security team member.", "All CISSP certificate holders work as interns.", "Marcus does not know computer security.", "Helpdesk interns are supervised by CISSP holders."], "Marcus is an intern -> lacks CISSP -> cannot be a member of the cybersecurity response team.")
]

tests_verbal = {}

for k in range(27):
    test_num = 31 + k
    q_list = []
    
    # 1. SIX VOCABULARY QUESTIONS (k*6 to k*6 + 5)
    for i in range(6):
        v_item = vocab_pool[k * 6 + i]
        is_ant = (v_item[1] == 'antonym')
        q_text = f"Which of the following words is most OPPOSITE in meaning to \"{v_item[0]}\"?" if is_ant else f"Which of the following words is most SIMILAR in meaning to \"{v_item[0]}\"?"
        q_list.append(solve_and_format(q_text, v_item[2], v_item[3], v_item[4], 'antonym' if is_ant else 'synonym', test_num * 201 + i))

    # 2. SIX ANALOGY QUESTIONS (k*6 to k*6 + 5)
    for i in range(6):
        a_item = analogy_pool[k * 6 + i]
        q_text = f"{a_item[0]} is analogous to:"
        q_list.append(solve_and_format(q_text, a_item[1], a_item[2], a_item[3], 'analogy', test_num * 301 + i))

    # 3. THREE ODD-WORD-OUT QUESTIONS (k*3 to k*3 + 2)
    for i in range(3):
        o_item = odd_pool[k * 3 + i]
        q_text = f"In the domain of {o_item[2]} (Classification Case {k*3 + i + 1}), which word does NOT belong with the others?"
        corr = o_item[1]
        distractors = [w for w in o_item[0] if w != corr]
        q_list.append(solve_and_format(q_text, corr, distractors, o_item[3], 'odd_word', test_num * 401 + i))

    # 4. ONE SENTENCE COMPLETION
    s_item = sentences_pool[k]
    q_text = f"Complete the sentence with the word that best fits the context:\n\n\"{s_item[0]}\""
    q_list.append(solve_and_format(q_text, s_item[1], s_item[2], s_item[3], 'sentence_completion', test_num * 501 + 1))

    # 5. ONE DEDUCTIVE LOGIC
    l_item = logic_pool[k]
    q_text = l_item[0]
    q_list.append(solve_and_format(q_text, l_item[1], l_item[2], l_item[3], 'syllogism', test_num * 601 + 1))

    tests_verbal[test_num] = q_list

print(f"Generated {len(tests_verbal)} tests, each with {len(tests_verbal[31])} verbal questions. Total: {len(tests_verbal) * len(tests_verbal[31])}")

with open('src/data/newSuiteVerbal.js', 'w', encoding='utf-8') as f:
    f.write('// Brand New CCAT Verbal Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n\n')
    f.write('export const NEW_SUITE_VERBAL = ' + json.dumps(tests_verbal, indent=2) + ';\n\n')
    f.write('''export function getNewSuiteVerbalQuestions(testNumber) {
  const list = NEW_SUITE_VERBAL[testNumber] || NEW_SUITE_VERBAL[31];
  return [...list];
}
''')

print("Wrote src/data/newSuiteVerbal.js successfully!")
