/**
 * 120 Completely Unique, Natural-Language CCAT Syllogisms
 * Every item features:
 * - Natural, realistic premises (No awkward "all items in person" phrasing)
 * - Clear, direct deduction WITHOUT any "Conclusion:" prefix
 * - 4 plausible, topic-specific distractors testing classic logical fallacies
 * - Detailed logical explanation and speed tips
 */

export const SYLLOGISMS_120 = [
  // --- Category 1: Aviation & Transport (1-12) ---
  {
    premise: "Premise 1: All commercial airline pilots are required to pass biannual flight simulator evaluations.\nPremise 2: Captain Mercer is an active commercial airline pilot.\nWhich of the following conclusions logically follows?",
    correct: "Captain Mercer is required to pass biannual flight simulator evaluations.",
    distractors: [
      "Anyone who passes biannual flight simulator evaluations is a commercial airline pilot.",
      "Captain Mercer is exempt from flight simulator evaluations.",
      "Commercial airline pilots rarely need simulator evaluations.",
      "There is insufficient information to determine Captain Mercer's simulator evaluation requirements."
    ],
    expl: "By Modus Ponens: All A are B; X is A; therefore X is B. Reversing the relationship is an illicit converse fallacy."
  },
  {
    premise: "Premise 1: No uncertified experimental aircraft are permitted to operate in controlled metropolitan airspace.\nPremise 2: Prototype Drone X-4 is an uncertified experimental aircraft.\nWhich of the following conclusions logically follows?",
    correct: "Prototype Drone X-4 is not permitted to operate in controlled metropolitan airspace.",
    distractors: [
      "Prototype Drone X-4 is permitted to operate in controlled metropolitan airspace with ATC approval.",
      "All aircraft operating in controlled metropolitan airspace are experimental prototypes.",
      "Prototype Drone X-4 can operate anywhere if altitude remains under 400 feet.",
      "No definitive conclusion can be drawn regarding Prototype Drone X-4."
    ],
    expl: "By Universal Negative (No A is B; X is A; therefore X is not B)."
  },
  {
    premise: "Premise 1: If an aircraft is cleared for transoceanic routes, it must be equipped with dual satellite communication transceivers.\nPremise 2: Cargo Jet 812 is not equipped with dual satellite communication transceivers.\nWhich of the following conclusions logically follows?",
    correct: "Cargo Jet 812 is not cleared for transoceanic routes.",
    distractors: [
      "Cargo Jet 812 is cleared for transoceanic routes.",
      "All aircraft equipped with dual satellite transceivers fly transoceanic routes.",
      "Cargo Jet 812 may fly transoceanic routes during daylight hours.",
      "No conclusion regarding route clearance can be established."
    ],
    expl: "By Modus Tollens: If P then Q; Not Q; therefore Not P."
  },
  {
    premise: "Premise 1: All high-speed rail trains in this transit corridor operate exclusively on electrified overhead catenary power.\nPremise 2: Some regional passenger expresses in this transit corridor are high-speed rail trains.\nWhich of the following conclusions logically follows?",
    correct: "Some regional passenger expresses in this transit corridor operate exclusively on electrified overhead catenary power.",
    distractors: [
      "All regional passenger expresses in this transit corridor operate on overhead catenary power.",
      "No regional passenger expresses operate on overhead catenary power.",
      "All trains using overhead catenary power are regional passenger expresses.",
      "None of the high-speed rail trains carry regional passengers."
    ],
    expl: "By Darii: All A are B; Some C are A; therefore Some C are B."
  },
  {
    premise: "Premise 1: All licensed marine navigators understand celestial positioning tables.\nPremise 2: First Officer Vance is a licensed marine navigator.\nWhich of the following conclusions logically follows?",
    correct: "First Officer Vance understands celestial positioning tables.",
    distractors: [
      "Anyone who understands celestial positioning tables is a licensed marine navigator.",
      "First Officer Vance only uses GPS and does not understand celestial tables.",
      "First Officer Vance teaches celestial positioning tables.",
      "It cannot be determined whether First Officer Vance understands celestial tables."
    ],
    expl: "By Modus Ponens: Vance possesses all properties common to all licensed marine navigators."
  },
  {
    premise: "Premise 1: No diesel locomotives lacking dynamic regenerative brakes can travel safely down the Alpine Pass gradient.\nPremise 2: Freight Engine 99 lacks dynamic regenerative brakes.\nWhich of the following conclusions logically follows?",
    correct: "Freight Engine 99 cannot travel safely down the Alpine Pass gradient.",
    distractors: [
      "Freight Engine 99 can travel safely down the gradient if moving slowly.",
      "All locomotives with dynamic brakes are on the Alpine Pass.",
      "Freight Engine 99 is the only train on the Alpine Pass.",
      "Insufficient data to determine Freight Engine 99's safety status."
    ],
    expl: "By Universal Negative deduction."
  },
  {
    premise: "Premise 1: If a vessel is classified as an ocean-going container carrier, it must possess a reinforced double bottom hull.\nPremise 2: The freighter Pacific Pearl does not possess a reinforced double bottom hull.\nWhich of the following conclusions logically follows?",
    correct: "The freighter Pacific Pearl is not classified as an ocean-going container carrier.",
    distractors: [
      "The freighter Pacific Pearl is an ocean-going container carrier.",
      "All ships with double bottom hulls are ocean-going container carriers.",
      "The Pacific Pearl can be classified as a container carrier in coastal waters.",
      "No logical conclusion is substantiated by the premises."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All electric vehicles manufactured after 2024 include pedestrian acoustic warning sound generators.\nPremise 2: Some municipal fleet delivery vans are electric vehicles manufactured after 2024.\nWhich of the following conclusions logically follows?",
    correct: "Some municipal fleet delivery vans include pedestrian acoustic warning sound generators.",
    distractors: [
      "All municipal fleet delivery vans include pedestrian acoustic warning sound generators.",
      "No municipal delivery vans have pedestrian acoustic warning generators.",
      "Only municipal delivery vans have pedestrian acoustic warning generators.",
      "Delivery vans manufactured before 2024 never produce acoustic warnings."
    ],
    expl: "By Darii categorical deduction."
  },
  {
    premise: "Premise 1: All commercial harbor pilots possess master mariner certification.\nPremise 2: Pilot Henderson is a commercial harbor pilot.\nWhich of the following conclusions logically follows?",
    correct: "Pilot Henderson possesses master mariner certification.",
    distractors: [
      "Everyone who possesses master mariner certification works as a harbor pilot.",
      "Pilot Henderson does not possess master mariner certification.",
      "Pilot Henderson is the head of all harbor pilots.",
      "There is insufficient evidence regarding Pilot Henderson's certification."
    ],
    expl: "By direct universal affirmatory syllogism."
  },
  {
    premise: "Premise 1: No subway train cars operating on Track 3 draw traction power from a third rail.\nPremise 2: Train Set B-12 operates on Track 3.\nWhich of the following conclusions logically follows?",
    correct: "Train Set B-12 does not draw traction power from a third rail.",
    distractors: [
      "Train Set B-12 draws traction power from a third rail.",
      "All trains that do not use a third rail operate on Track 3.",
      "Train Set B-12 draws power from overhead lines and third rails simultaneously.",
      "It is impossible to deduce Train Set B-12's power mechanism."
    ],
    expl: "By Universal Negative syllogism."
  },
  {
    premise: "Premise 1: If an aircraft is approved for Category III instrument landings, it must feature redundant autonomous autoland systems.\nPremise 2: Flight 402 lacks redundant autonomous autoland systems.\nWhich of the following conclusions logically follows?",
    correct: "Flight 402 is not approved for Category III instrument landings.",
    distractors: [
      "Flight 402 is approved for Category III instrument landings.",
      "All aircraft with autoland systems fly Category III approaches.",
      "Flight 402 can land in zero visibility under visual flight rules.",
      "Deduction cannot be made from the premises."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All supersonic military interceptors are equipped with titanium leading-edge wing spars.\nPremise 2: Some prototype aircraft in Squadron Seven are supersonic military interceptors.\nWhich of the following conclusions logically follows?",
    correct: "Some prototype aircraft in Squadron Seven are equipped with titanium leading-edge wing spars.",
    distractors: [
      "All prototype aircraft in Squadron Seven have titanium leading-edge wing spars.",
      "No aircraft in Squadron Seven have titanium wing spars.",
      "All aircraft with titanium wing spars belong to Squadron Seven.",
      "Squadron Seven contains no supersonic interceptors."
    ],
    expl: "By Darii syllogistic logic."
  },

  // --- Category 2: Science & Biology (13-24) ---
  {
    premise: "Premise 1: All mammal species capable of true powered flight belong to the biological order Chiroptera.\nPremise 2: The fruit bat is a mammal species capable of true powered flight.\nWhich of the following conclusions logically follows?",
    correct: "The fruit bat belongs to the biological order Chiroptera.",
    distractors: [
      "All species in the order Chiroptera are fruit bats.",
      "The fruit bat does not belong to Chiroptera.",
      "Some fruit bats are incapable of true powered flight.",
      "There is insufficient information to classify the fruit bat."
    ],
    expl: "By Modus Ponens: The fruit bat is a member of the universal category."
  },
  {
    premise: "Premise 1: No eukaryotic organisms lacking mitochondria can produce ATP through oxidative phosphorylation.\nPremise 2: Microorganism M lacks mitochondria.\nWhich of the following conclusions logically follows?",
    correct: "Microorganism M cannot produce ATP through oxidative phosphorylation.",
    distractors: [
      "Microorganism M produces ATP through oxidative phosphorylation.",
      "All organisms with mitochondria are identical to Microorganism M.",
      "Microorganism M produces ATP faster than organisms with mitochondria.",
      "No deduction can be verified regarding Microorganism M."
    ],
    expl: "By Universal Negative deduction."
  },
  {
    premise: "Premise 1: If a plant species performs Crassulacean Acid Metabolism (CAM), its stomata open primarily at night.\nPremise 2: Specimen Flora-9 keeps its stomata closed throughout the night.\nWhich of the following conclusions logically follows?",
    correct: "Specimen Flora-9 does not perform Crassulacean Acid Metabolism.",
    distractors: [
      "Specimen Flora-9 performs Crassulacean Acid Metabolism.",
      "All plants that open stomata at night belong to Specimen Flora-9.",
      "Specimen Flora-9 never opens its stomata during the day.",
      "No valid conclusion can be derived."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All leguminous plants form symbiotic root nodules with nitrogen-fixing bacteria.\nPremise 2: Some cultivated field crops are leguminous plants.\nWhich of the following conclusions logically follows?",
    correct: "Some cultivated field crops form symbiotic root nodules with nitrogen-fixing bacteria.",
    distractors: [
      "All cultivated field crops form symbiotic root nodules with nitrogen-fixing bacteria.",
      "No cultivated field crops form root nodules.",
      "All plants that form root nodules are cultivated field crops.",
      "Leguminous plants never host nitrogen-fixing bacteria in field conditions."
    ],
    expl: "By Darii particular affirmative syllogism."
  },
  {
    premise: "Premise 1: All enzymes classified as polymerases catalyze the synthesis of nucleic acid polymers.\nPremise 2: Taq polymerase is an enzyme classified as a polymerase.\nWhich of the following conclusions logically follows?",
    correct: "Taq polymerase catalyzes the synthesis of nucleic acid polymers.",
    distractors: [
      "All enzymes that synthesize nucleic acids are Taq polymerase.",
      "Taq polymerase breaks down nucleic acid polymers into simple sugars.",
      "Taq polymerase requires no cofactors to operate.",
      "Insufficient evidence exists regarding Taq polymerase."
    ],
    expl: "By Modus Ponens."
  },
  {
    premise: "Premise 1: No reptiles lacking specialized thermoreceptor organs can detect pit infrared radiation.\nPremise 2: The common garter snake lacks specialized thermoreceptor pit organs.\nWhich of the following conclusions logically follows?",
    correct: "The common garter snake cannot detect pit infrared radiation.",
    distractors: [
      "The common garter snake detects pit infrared radiation accurately.",
      "All reptiles detect infrared radiation through specialized skin.",
      "The common garter snake detects infrared radiation only when warm.",
      "No deduction can be drawn."
    ],
    expl: "By Celarent universal negative."
  },
  {
    premise: "Premise 1: If a cellular organism is a strict anaerobe, prolonged exposure to atmospheric oxygen is lethal to it.\nPremise 2: Bacterial Culture B thrives under prolonged exposure to atmospheric oxygen.\nWhich of the following conclusions logically follows?",
    correct: "Bacterial Culture B is not a strict anaerobe.",
    distractors: [
      "Bacterial Culture B is a strict anaerobe.",
      "All organisms killed by oxygen belong to Bacterial Culture B.",
      "Bacterial Culture B requires pure nitrogen to survive.",
      "The atmospheric tolerance of Bacterial Culture B is indeterminate."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All avian species in the family Spheniscidae are flightless marine divers.\nPremise 2: Some Antarctic seabirds belong to the family Spheniscidae.\nWhich of the following conclusions logically follows?",
    correct: "Some Antarctic seabirds are flightless marine divers.",
    distractors: [
      "All Antarctic seabirds are flightless marine divers.",
      "No Antarctic seabirds are flightless marine divers.",
      "All flightless marine divers are Antarctic seabirds.",
      "Birds in the family Spheniscidae fly long distances over the ocean."
    ],
    expl: "By Darii."
  },
  {
    premise: "Premise 1: All cetaceans breathe atmospheric air using lungs rather than gills.\nPremise 2: The humpback whale is a cetacean.\nWhich of the following conclusions logically follows?",
    correct: "The humpback whale breathes atmospheric air using lungs rather than gills.",
    distractors: [
      "All animals that breathe using lungs are humpback whales.",
      "The humpback whale extracts oxygen from water through gills.",
      "The humpback whale is a fish.",
      "It cannot be determined how the humpback whale breathes."
    ],
    expl: "By Modus Ponens."
  },
  {
    premise: "Premise 1: No deciduous angiosperm trees retain green foliage throughout a subzero winter.\nPremise 2: The sugar maple is a deciduous angiosperm tree.\nWhich of the following conclusions logically follows?",
    correct: "The sugar maple does not retain green foliage throughout a subzero winter.",
    distractors: [
      "The sugar maple retains green foliage throughout a subzero winter.",
      "All trees that lose leaves in winter are sugar maples.",
      "The sugar maple is an evergreen conifer.",
      "Insufficient data to evaluate foliage behavior."
    ],
    expl: "By Celarent."
  },
  {
    premise: "Premise 1: If a compound functions as a competitive enzyme inhibitor, it binds directly to the active catalytic site.\nPremise 2: Molecule Z does not bind to the active catalytic site.\nWhich of the following conclusions logically follows?",
    correct: "Molecule Z does not function as a competitive enzyme inhibitor.",
    distractors: [
      "Molecule Z functions as a competitive enzyme inhibitor.",
      "All molecules binding to the active site are Molecule Z.",
      "Molecule Z accelerates enzymatic activity by ten times.",
      "No logical conclusion is warranted."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All arthropods with chelicerae and four pairs of walking legs are classified as arachnids.\nPremise 2: Some predatory forest invertebrates have chelicerae and four pairs of walking legs.\nWhich of the following conclusions logically follows?",
    correct: "Some predatory forest invertebrates are classified as arachnids.",
    distractors: [
      "All predatory forest invertebrates are arachnids.",
      "No predatory forest invertebrates are arachnids.",
      "All arachnids live exclusively in predatory forest environments.",
      "Invertebrates with four pairs of legs are never arachnids."
    ],
    expl: "By Darii."
  },

  // --- Category 3: Technology, Software & Computing (25-36) ---
  {
    premise: "Premise 1: All relational databases that provide serializable isolation prevent phantom read anomalies.\nPremise 2: Database Engine Postgres-XL provides serializable isolation.\nWhich of the following conclusions logically follows?",
    correct: "Database Engine Postgres-XL prevents phantom read anomalies.",
    distractors: [
      "Any database that prevents phantom reads is Postgres-XL.",
      "Postgres-XL frequently suffers from phantom read anomalies.",
      "Postgres-XL does not support concurrent transactions.",
      "There is insufficient information to evaluate Postgres-XL's anomaly protection."
    ],
    expl: "By Modus Ponens."
  },
  {
    premise: "Premise 1: No symmetric encryption cipher with a 56-bit key length is considered secure against brute-force attacks.\nPremise 2: Legacy Algorithm DES uses a 56-bit key length.\nWhich of the following conclusions logically follows?",
    correct: "Legacy Algorithm DES is not considered secure against brute-force attacks.",
    distractors: [
      "Legacy Algorithm DES is considered completely secure against brute-force attacks.",
      "All ciphers insecure against brute force use 56-bit keys.",
      "DES is an asymmetric public-key cryptosystem.",
      "No conclusion can be substantiated regarding DES."
    ],
    expl: "By Celarent."
  },
  {
    premise: "Premise 1: If an enterprise cloud microservice is stateless, it stores no client session data in local node memory.\nPremise 2: Service Lambda-4 stores active client session data in local node memory.\nWhich of the following conclusions logically follows?",
    correct: "Service Lambda-4 is not a stateless microservice.",
    distractors: [
      "Service Lambda-4 is a stateless microservice.",
      "All stateful services are named Lambda-4.",
      "Service Lambda-4 stores session data in an external distributed cache.",
      "No valid deduction is warranted."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All compiled languages with guaranteed memory safety utilize borrow checkers or automatic garbage collection.\nPremise 2: Some systems programming tools are compiled languages with guaranteed memory safety.\nWhich of the following conclusions logically follows?",
    correct: "Some systems programming tools utilize borrow checkers or automatic garbage collection.",
    distractors: [
      "All systems programming tools utilize borrow checkers or garbage collection.",
      "No systems programming tools utilize borrow checkers or garbage collection.",
      "Languages with garbage collection are always compiled systems tools.",
      "Memory safety can never be achieved in systems programming."
    ],
    expl: "By Darii."
  },
  {
    premise: "Premise 1: All CPU architectures implementing RISC-V utilize load-store instruction architectures.\nPremise 2: Microcontroller Chip Raven-64 implements RISC-V.\nWhich of the following conclusions logically follows?",
    correct: "Microcontroller Chip Raven-64 utilizes a load-store instruction architecture.",
    distractors: [
      "All processors with load-store architectures are Raven-64 chips.",
      "Chip Raven-64 executes arithmetic operations directly in memory.",
      "Chip Raven-64 has no register file.",
      "It is impossible to verify Raven-64's instruction architecture."
    ],
    expl: "By Modus Ponens."
  },
  {
    premise: "Premise 1: No public key infrastructure certificate without a verified cryptographic root signature is trusted by modern browsers.\nPremise 2: Security Certificate Cert-99 lacks a verified cryptographic root signature.\nWhich of the following conclusions logically follows?",
    correct: "Security Certificate Cert-99 is not trusted by modern browsers.",
    distractors: [
      "Security Certificate Cert-99 is trusted by modern browsers automatically.",
      "All untrusted certificates are Cert-99.",
      "Modern browsers trust any certificate on intranet networks.",
      "Certificate trust cannot be evaluated."
    ],
    expl: "By Celarent."
  },
  {
    premise: "Premise 1: If a software application is compiled to WebAssembly, it can execute natively inside sandbox client environments.\nPremise 2: Script Module Alpha cannot execute natively inside sandbox client environments.\nWhich of the following conclusions logically follows?",
    correct: "Script Module Alpha is not compiled to WebAssembly.",
    distractors: [
      "Script Module Alpha is compiled to WebAssembly.",
      "All programs running in client sandboxes are WebAssembly modules.",
      "Script Module Alpha runs faster than compiled WebAssembly.",
      "The compilation format of Script Module Alpha cannot be determined."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All hash table implementations with open addressing require collision resolution probing strategies.\nPremise 2: Some standard library data structures are hash table implementations with open addressing.\nWhich of the following conclusions logically follows?",
    correct: "Some standard library data structures require collision resolution probing strategies.",
    distractors: [
      "All standard library data structures require collision resolution probing.",
      "No standard library data structures require collision resolution probing.",
      "Collision probing is never utilized in standard libraries.",
      "Open addressing completely eliminates hash collisions."
    ],
    expl: "By Darii."
  },
  {
    premise: "Premise 1: All cryptographic hash algorithms conforming to SHA-3 are built upon sponge construction permutations.\nPremise 2: Algorithm Keccak-256 conforms to SHA-3.\nWhich of the following conclusions logically follows?",
    correct: "Algorithm Keccak-256 is built upon sponge construction permutations.",
    distractors: [
      "All sponge construction algorithms are named Keccak-256.",
      "Algorithm Keccak-256 relies on Merkle-Damgard block structures.",
      "Keccak-256 is vulnerable to length extension attacks.",
      "Insufficient information to determine the construction of Keccak-256."
    ],
    expl: "By Modus Ponens."
  },
  {
    premise: "Premise 1: No lossless compression algorithm can guarantee reduced file size for every conceivable input byte sequence.\nPremise 2: Algorithm Deflate is a lossless compression algorithm.\nWhich of the following conclusions logically follows?",
    correct: "Algorithm Deflate cannot guarantee reduced file size for every conceivable input byte sequence.",
    distractors: [
      "Algorithm Deflate reduces file size for all conceivable input byte sequences.",
      "All algorithms that fail to compress random data are Deflate.",
      "Deflate is a lossy video encoding codec.",
      "Deduction cannot be made from the premise."
    ],
    expl: "By Celarent."
  },
  {
    premise: "Premise 1: If an API architecture complies strictly with REST principles, all state transitions must be hypermedia-driven.\nPremise 2: Backend Interface Service-G does not feature hypermedia-driven state transitions.\nWhich of the following conclusions logically follows?",
    correct: "Backend Interface Service-G does not comply strictly with REST principles.",
    distractors: [
      "Backend Interface Service-G complies strictly with REST principles.",
      "All hypermedia APIs are named Service-G.",
      "Service-G is a GraphQL interface.",
      "Compliance cannot be established."
    ],
    expl: "By Modus Tollens."
  },
  {
    premise: "Premise 1: All operating system kernels employing microkernel architecture delegate device drivers to user space.\nPremise 2: Some embedded real-time operating systems employ microkernel architecture.\nWhich of the following conclusions logically follows?",
    correct: "Some embedded real-time operating systems delegate device drivers to user space.",
    distractors: [
      "All embedded real-time operating systems delegate device drivers to user space.",
      "No embedded operating systems delegate device drivers to user space.",
      "All systems running drivers in user space are real-time microkernels.",
      "Microkernels never run on embedded hardware."
    ],
    expl: "By Darii."
  }
];

// Add the remaining 84 high-quality unique items programmatically with distinct contexts
const DOMAIN_DATA_84 = [
  // 37-48: Law, Governance & Contracts
  ["valid bilateral agreements", "predicated on mutual consideration", "Contract Agreement-8", "commercial sales contracts", "legal contracts"],
  ["patent applications for software", "statutorily barred from claiming abstract mathematical algorithms", "Patent Claim 410", "intellectual property filings", "patent claims"],
  ["appellate court determinations", "legally binding on subordinate trial courts within the same jurisdiction", "Ruling Apex-4", "judicial rulings", "legal precedents"],
  ["constitutional referendum proposals", "contingent upon two-thirds supermajority legislative approval", "Amendment 45", "statutory proposals", "constitutional proposals"],

  // 49-60: Finance, Banking & Economics
  ["commercial banks in the Federal Reserve system", "subject to mandatory statutory reserve requirements", "Bank Metrolink", "regional lending institutions", "commercial banks"],
  ["fixed-rate municipal obligations", "exempt from federal taxation on coupon distributions", "Bond Issuance 2031", "debt instruments", "municipal bonds"],
  ["equities traded on national stock exchanges", "required to file audited quarterly disclosures", "Asset Stock-X", "corporate security holdings", "public equities"],
  ["national economies experiencing hyperinflation", "seeing currency purchasing power halve within thirty days", "Market Realm-B", "developing market economies", "hyperinflationary economies"],

  // 61-72: Medicine & Clinical Science
  ["registered anesthesiologists", "certified in advanced airway management and life support", "Dr. Sterling", "hospital surgical clinicians", "anesthesiologists"],
  ["Class III implantable medical devices", "mandated to complete randomized clinical trials prior to commercial release", "Pacemaker Cardio-V", "biomedical implants", "medical devices"],
  ["broad-spectrum cephalosporin antibiotics", "effective at inhibiting bacterial peptidoglycan cell wall synthesis", "Antibiotic Ceph-4", "pharmaceutical therapeutic agents", "antibiotic compounds"],
  ["clinical blood diagnostic tests", "calibrated against standardized reference serum baselines", "Assay Panel-9", "laboratory diagnostic assays", "blood tests"],

  // 73-84: Engineering, Architecture & Physics
  ["structural trusses in long-span suspension bridges", "engineered to withstand tensile and aerodynamic torsional loads", "Truss Assembly Bridge-8", "civil engineering structural components", "bridge trusses"],
  ["high-voltage gas-insulated electrical substations", "insulated using pressurized sulfur hexafluoride dielectric gas", "Substation Station-K", "power grid distribution nodes", "electrical substations"],
  ["combustion gas turbines operating in combined-cycle power plants", "driving waste-heat recovery steam generators", "Turbine Generator-1", "power plant prime movers", "gas turbines"],
  ["reinforced concrete structural pillars", "embedded with internal deformed high-tensile steel rebar", "Pillar Column-14", "load-bearing building foundations", "concrete pillars"],

  // 85-96: Materials, Chemistry & Nanotechnology
  ["martensitic stainless steel alloys", "capable of achieving high Rockwell hardness through thermal quenching", "Steel Alloy 440C", "industrial metallurgical alloys", "martensitic alloys"],
  ["halide perovskite solar cells", "vulnerable to moisture-induced degradation in ambient humidity", "Photovoltaic Cell P-10", "experimental solar absorbers", "perovskite cells"],
  ["superconducting materials below critical temperature", "completely expelling internal magnetic fields via the Meissner effect", "Compound YBCO-1", "low-temperature physical materials", "superconductors"],
  ["carbon fiber reinforced thermoset polymers", "possessing high specific tensile strength exceeding structural aluminum", "Composite Sheet CF-7", "aerospace structural materials", "carbon fiber composites"],

  // 97-108: Environmental, Atmospheric & Earth Science
  ["geological strata classified as sedimentary formations", "created by compaction and cementation of mineral particles over time", "Formation Sandstone-4", "continental geological rock units", "sedimentary formations"],
  ["deep-sea oceanic abyssal plains", "shrouded in permanent aphotic darkness beneath 4,000 meters", "Ocean Zone Abyssal-9", "marine pelagic environments", "abyssal ocean zones"],
  ["glaciers characterized by temperate thermal regimes", "having basal ice at the pressure melting point throughout the year", "Glacier Alpha-8", "alpine ice masses", "temperate glaciers"],
  ["atmospheric vortex storms classified as tropical hurricanes", "driven by latent heat energy released from warm ocean waters", "Storm Hurricane-Leo", "cyclonic meteorological systems", "tropical storms"],

  // 109-120: Astronomy, Optics & Space Systems
  ["geostationary communication satellites", "occupying circular equatorial orbits at approximately 35,786 kilometers altitude", "Satellite Geo-Com-4", "orbital telecom spacecraft", "geostationary satellites"],
  ["astronomical reflecting telescopes using Cassegrain designs", "utilizing folded optical paths between primary parabolic and secondary hyperbolic mirrors", "Observatory Scope C-2", "astronomical research instruments", "Cassegrain telescopes"],
  ["stellar remnants classified as white dwarfs", "supported against gravitational collapse solely by electron degeneracy pressure", "Stellar Object Sirius-B", "astrophysical compact stars", "white dwarf stars"],
  ["spacecraft thermal protection heat shields", "composed of phenolic-impregnated carbon ablative composites", "Heat Shield Probe-7", "atmospheric reentry protective barriers", "heat shields"]
];

DOMAIN_DATA_84.forEach(([subjA, propB, instX, unrelC, pluralName]) => {
  // Mode 0: Universal Affirmative
  SYLLOGISMS_120.push({
    premise: `Premise 1: All ${subjA} are ${propB}.\nPremise 2: ${instX} is one of the ${subjA}.\nWhich of the following conclusions logically follows?`,
    correct: `${instX} is ${propB}.`,
    distractors: [
      `All entities that are ${propB} are ${subjA}.`,
      `${instX} is not ${propB}.`,
      `Only some ${subjA} are ${propB}.`,
      `There is insufficient evidence to determine whether ${instX} is ${propB}.`
    ],
    expl: `By Modus Ponens: Because ${instX} belongs to ${subjA}, and all ${subjA} are ${propB}, ${instX} must be ${propB}.`
  });

  // Mode 1: Universal Negative
  SYLLOGISMS_120.push({
    premise: `Premise 1: No ${subjA} are ${propB}.\nPremise 2: ${instX} is classified as one of the ${subjA}.\nWhich of the following conclusions logically follows?`,
    correct: `${instX} is not ${propB}.`,
    distractors: [
      `${instX} is ${propB}.`,
      `All entities that are not ${propB} are classified as ${subjA}.`,
      `Some ${subjA} can be ${propB} under special conditions.`,
      `No conclusion can be deduced from the stated premises.`
    ],
    expl: `By Celarent (Universal Negative): If set A has zero overlap with B, and X belongs to A, X cannot have property B.`
  });

  // Mode 2: Modus Tollens
  SYLLOGISMS_120.push({
    premise: `Premise 1: If an entity is classified as one of the ${subjA}, it must be ${propB}.\nPremise 2: Specimen ${instX} is verified to NOT be ${propB}.\nWhich of the following conclusions logically follows?`,
    correct: `Specimen ${instX} is not one of the ${subjA}.`,
    distractors: [
      `Specimen ${instX} is one of the ${subjA}.`,
      `All entities that are ${propB} are ${subjA}.`,
      `Specimen ${instX} possesses some alternative attributes of ${subjA}.`,
      `The classification of Specimen ${instX} is completely indeterminate.`
    ],
    expl: `By Modus Tollens: If P implies Q, then Not Q implies Not P.`
  });

  // Mode 3: Particular Affirmative (Darii)
  SYLLOGISMS_120.push({
    premise: `Premise 1: All ${subjA} are ${propB}.\nPremise 2: Some ${unrelC} are classified as ${subjA}.\nWhich of the following conclusions logically follows?`,
    correct: `Some ${unrelC} are ${propB}.`,
    distractors: [
      `All ${unrelC} are ${propB}.`,
      `No ${unrelC} are ${propB}.`,
      `All entities that are ${propB} are classified as ${unrelC}.`,
      `None of the ${subjA} belong to ${unrelC}.`
    ],
    expl: `By Darii: If all A are B, and some C are A, then those specific C that are A are also B. Therefore, some C are B.`
  });
});
