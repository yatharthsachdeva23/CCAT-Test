import json

# Load old prompts to ensure 0 collisions
with open('scripts/tests_1_to_30_inventory.json', 'r', encoding='utf-8') as f:
    t1_30 = json.load(f)
OLD_PROMPTS = set(q['question'].strip().lower() for q in t1_30)

# 27 Unique Prompts for Slot 1 (Movement & Rotation Series)
SLOT1_PROMPTS = [
    # Subgroup 1: Pointers
    "Examine the rotating indicator arm progressing in steady +45° angular increments. Which figure represents Step 5?",
    "A directional dial arm turns clockwise in consistent +60° jumps. Which figure represents Step 5?",
    "Observe the pointer advancing in +90° clockwise right-angle intervals. Which figure represents Step 5?",
    "A slender gauge needle rotates clockwise in uniform +30° steps. Which figure represents Step 5?",
    "Track the rotating indicator pointer sweeping clockwise by +45° per frame. Which figure represents Step 5?",
    "A radial gauge hand advances clockwise in steady +60° increments. Which figure represents Step 5?",
    "Observe the dial arm rotating clockwise in 90° intervals. Which figure logically continues the sequence as Step 5?",
    "A clock pointer turns in consistent +45° clockwise steps around the dial. Which figure represents Step 5?",
    "Track the angular progression of the pointer swinging clockwise by +60°. Which figure is Step 5?",
    # Subgroup 2: Perimeter Walkers
    "A prominent tracking node advances clockwise along the vertices of the equilateral triangle. Which figure illustrates Step 5?",
    "A solid marker hops from corner to corner clockwise around the perimeter of the square. Which figure is Step 5?",
    "Observe the solid node stepping clockwise from vertex to vertex of the regular pentagon. Which figure represents Step 5?",
    "A tracking marker traverses the vertices of the regular hexagon in a clockwise cycle. Which figure illustrates Step 5?",
    "A solid indicator node hops along the vertices of the regular heptagon clockwise. Which figure is Step 5?",
    "A vertex node advances clockwise along the corners of the triangular boundary. Which figure represents Step 5?",
    "Observe the tracking marker progressing clockwise around the square frame. Which figure illustrates Step 5?",
    "A solid beacon traverses the perimeter vertices of the pentagon clockwise. Which figure represents Step 5?",
    "A perimeter node advances clockwise around the hexagonal boundary. Which figure represents Step 5?",
    # Subgroup 3: Pendulums
    "Observe the uniform angular swing of the suspended pendulum arm from left to right. Which figure represents Step 5?",
    "A suspended bob swings in uniform +20° angular increments toward the right. Which figure is Step 5?",
    "Track the angular oscillation of the pendulum rod swinging smoothly across the center. Which figure represents Step 5?",
    "A weighted pendulum oscillates from -40° toward the positive quadrant. Which figure corresponds to Step 5?",
    "Observe the continuous rightward swing of the pendulum bob in steady steps. Which figure is Step 5?",
    "A balance arm tilts uniformly toward the right in 20° steps. Which figure represents Step 5?",
    "Track the swinging pendulum moving across five successive angular positions. Which figure is Step 5?",
    "A suspended needle swings steadily from left to right across the vertical axis. Which figure is Step 5?",
    "Observe the smooth rightward arc of the pendulum bob reaching its fifth position. Which figure represents Step 5?"
]

# 27 Unique Prompts for Slot 2 (Growth & Morphing Series)
SLOT2_PROMPTS = [
    # Subgroup 1: Vertex Count Growth
    "Analyze the polygon vertex evolution across the progression from triangle to heptagon. Which figure corresponds to Step 5?",
    "The number of vertices in the central polygon increases by 1 each step starting from 4 sides. Which figure is Step 5?",
    "Observe the progressive addition of corners to the regular polygon at each step. Which figure represents Step 5?",
    "Each successive frame adds one vertex to the polygonal boundary starting at 4 vertices. Which figure is Step 5?",
    "The central regular shape gains exactly one edge and vertex at each step. Which figure corresponds to Step 5?",
    "Analyze the increasing edge count of the geometric polygon starting from a triangle. Which figure is Step 5?",
    "The polygon boundary adds an extra vertex in each consecutive frame. Which figure illustrates Step 5?",
    "Count the expanding vertices of the central polygon across the sequence. Which figure represents Step 5?",
    "The regular polygon gains one side per step from 3 sides up to 7 sides. Which figure corresponds to Step 5?",
    # Subgroup 2: Concentric Layers
    "Examine the concentric expansion of radial boundary rings outward from the center. Which figure represents Step 5?",
    "Circular boundary layers accumulate outward one ring at a time. Which figure completes Step 5?",
    "A concentric target expands outward by adding one nested ring at each consecutive step. Which figure is Step 5?",
    "Observe the successive addition of concentric circular outlines around the origin. Which figure represents Step 5?",
    "Concentric circular ripples expand outward by adding one layer per frame. Which figure is Step 5?",
    "Each frame adds another concentric circular layer to the nested pattern. Which figure represents Step 5?",
    "Analyze the radial growth of concentric rings accumulating outward from the core. Which figure is Step 5?",
    "Nested circular contours multiply outward by one ring at each transition. Which figure represents Step 5?",
    "Count the expanding concentric circular borders from 1 ring up to 5 rings. Which figure represents Step 5?",
    # Subgroup 3: Segment Accumulation
    "Radial internal spokes divide the circle into equal sectors, increasing by one spoke per step. Which figure corresponds to Step 5?",
    "A wheel accumulates radial spokes one by one starting from 3 spokes. Which figure represents Step 5?",
    "Observe the addition of equal radial spokes extending from the center to the rim. Which figure is Step 5?",
    "Internal dividing spokes increase in count by exactly one per frame. Which figure illustrates Step 5?",
    "A circular dial gains radial partition spokes in steady increments. Which figure represents Step 5?",
    "The number of radial line segments connecting the center to the perimeter increases by 1 per step. Which figure is Step 5?",
    "Analyze the accumulating radial spokes partitioning the interior of the circle. Which figure represents Step 5?",
    "Radial division lines increase uniformly across the sequence. Which figure represents Step 5?",
    "Observe the expanding array of radial spokes dividing the circle equally. Which figure corresponds to Step 5?"
]

# 27 Unique Prompts for Slot 3 (Flow & Translation Series)
SLOT3_PROMPTS = [
    # Subgroup 1: Linear Translation
    "A solid tracking particle translates along a straight diagonal trajectory across the frame. Which figure is Step 5?",
    "Observe the linear translation of the solid node drifting diagonally across the square boundary. Which figure is Step 5?",
    "A tracking marker shifts downward and to the right in equal coordinate increments. Which figure represents Step 5?",
    "A solid point traverses diagonally across the enclosed coordinate grid. Which figure represents Step 5?",
    "Track the uniform diagonal movement of the focal particle toward the bottom-right corner. Which figure is Step 5?",
    "A locator node translates in constant linear steps across the rectangular space. Which figure illustrates Step 5?",
    "Observe the diagonal translation of the solid node across five successive positions. Which figure is Step 5?",
    "A tracking particle advances down and right at a steady linear rate. Which figure represents Step 5?",
    "Follow the diagonal path of the locator particle across the boundary to identify Step 5.",
    # Subgroup 2: Quadrant Shading
    "The filled quadrant rotates clockwise by 90° at each step starting from the top-right. Which figure completes the sequence as Step 5?",
    "A shaded 90° sector advances clockwise around the circle at each step starting from bottom-right. Which figure is Step 5?",
    "Observe the single shaded quadrant cycling clockwise by 90° per frame starting from bottom-left. Which figure is Step 5?",
    "A quarter-circle shaded wedge marches clockwise around the four quadrants starting from top-left. Which figure is Step 5?",
    "Track the 90° clockwise rotation of the filled quadrant sector. Which figure corresponds to Step 5?",
    "A darkened quadrant cycles clockwise around the circle in 90° increments. Which figure represents Step 5?",
    "Follow the clockwise rotational sequence of the shaded quadrant wedge. Which figure is Step 5?",
    "The shaded quadrant section steps clockwise around the four circular sectors. Which figure illustrates Step 5?",
    "Observe the clockwise progression of the filled quadrant completing its fourth rotation step. Which figure is Step 5?",
    # Subgroup 3: Sliding Bar
    "A solid vertical scanner bar shifts horizontally across the rectangular frame from left to right. Which figure is Step 5?",
    "Observe the vertical indicator bar sliding rightward by one column at each step. Which figure represents Step 5?",
    "A vertical column bar translates across five equidistant positions from left to right. Which figure is Step 5?",
    "A solid bar travels horizontally across the partitioned rectangular grid. Which figure illustrates Step 5?",
    "Track the lateral shift of the vertical indicator bar moving toward the right edge. Which figure is Step 5?",
    "A scanner bar advances rightward across the five columns in steady intervals. Which figure corresponds to Step 5?",
    "Follow the horizontal translation of the vertical indicator bar to determine Step 5.",
    "A vertical solid marker slides across the frame from column 1 to column 5. Which figure is Step 5?",
    "Observe the rightward progression of the vertical bar reaching its fifth column. Which figure represents Step 5?"
]

# 27 Unique Prompts for Slot 4 (Arithmetic & Overlay Matrices)
SLOT4_PROMPTS = [
    # Subgroup 1: Additive Overlay
    "In this 3×3 matrix, the third cell of each row represents the geometric overlay union of the first two cells. Identify the missing cell:",
    "Analyze the row-wise additive overlay rule where Column 1 and Column 2 superimpose to create Column 3:",
    "Each row in this matrix combines the distinct features of the first two cells into the third cell. Which figure completes the matrix?",
    "Examine how features in the first two columns merge together in the third column of each row. Determine the missing cell:",
    "Identify the superimposition pattern across the rows of this 3×3 grid to find the missing 9th cell:",
    "In each row of this matrix, Cell 3 is the visual combination of Cell 1 and Cell 2. Select the missing figure:",
    "Observe how the geometric components merge additively across each row to determine the missing cell:",
    "Determine the row-wise overlay rule uniting Column 1 and Column 2 to find the 9th cell of the matrix:",
    "The third figure in each row is formed by superimposing the first two figures. Which option completes the grid?",
    # Subgroup 2: Boolean XOR
    "Identify the boolean subtraction (XOR) rule governing each row where overlapping segments cancel out:",
    "Across each row, overlapping lines vanish while non-overlapping segments remain. Select the missing 9th cell:",
    "Examine the stroke cancellation logic across each row: shared lines disappear in Column 3. Which figure belongs in the missing cell?",
    "In this 3×3 matrix, line segments present in both Column 1 and Column 2 cancel out in Column 3. Determine the missing figure:",
    "Apply the exclusive-OR (XOR) line combination rule across the rows to deduce the missing cell:",
    "Observe how common segments disappear while unique segments persist across each row. Which figure fills cell 9?",
    "Determine the segment cancellation pattern operating across each horizontal row of this matrix:",
    "In each row, overlapping strokes cancel and distinct strokes remain. Select the missing figure for the 3×3 grid:",
    "Apply the line-segment subtraction rule across Row 3 to determine the final missing cell of the matrix:",
    # Subgroup 3: Dot Arithmetic
    "Determine the additive numerical relationship across the rows of this matrix where Dot Count 1 + Dot Count 2 = Dot Count 3:",
    "In each row of this 3×3 grid, the number of dots in Column 3 equals the sum of dots in Columns 1 and 2. Select the missing cell:",
    "Analyze the dot summation pattern across the horizontal rows to determine the missing 9th cell:",
    "The count of solid markers in the third cell of each row equals the sum of markers in the first two cells. Which figure completes the matrix?",
    "Apply the horizontal addition of dot elements across the rows to find the missing figure in cell (3,3):",
    "In this matrix, dot quantities follow an additive row rule (Cell 1 + Cell 2 = Cell 3). Which figure belongs in the empty cell?",
    "Observe the arithmetic progression of marker counts across each row to deduce the missing cell:",
    "Add the node quantities in Columns 1 and 2 to determine the required figure for Column 3 of Row 3:",
    "Determine the missing cell in this 3×3 matrix by evaluating the additive dot counts across each row:"
]

# 27 Unique Prompts for Slot 5 (Permutation & Rotation Matrices)
SLOT5_PROMPTS = [
    # Subgroup 1: Latin Square
    "Each row and column in this 3×3 matrix must contain each outer geometry and internal marker exactly once. Identify the missing cell:",
    "Apply the Latin square permutation principle to both outer shapes and inner symbols to deduce the missing 9th cell:",
    "Every row and column contains exactly one Circle, Square, and Triangle, along with one Dot, Plus, and Minus. Which figure completes the grid?",
    "Observe the non-repeating distribution of shapes and central markers across all rows and columns to find the missing cell:",
    "Determine the missing figure in this 3×3 Latin square matrix by identifying the absent shape and inner symbol in Row 3:",
    "In this matrix, each shape and internal attribute appears once per row and column. Which figure fills the 9th position?",
    "Use row and column elimination to find the unique outer shape and inner marker required for cell (3,3):",
    "Identify the missing combination of outer boundary and internal glyph in this 3×3 permutation grid:",
    "Each geometry and symbol is permuted without duplication across the rows and columns. Select the missing cell:",
    # Subgroup 2: 90° Rotation
    "Observe the 90° clockwise angular progression across each row and column. Which figure fills the missing 9th cell?",
    "In each row, the directional indicator rotates clockwise by 90° from cell to cell. Determine the missing figure:",
    "Follow the 90° clockwise rotational pattern operating across both rows and columns to select the 9th cell:",
    "The pointing needle turns clockwise by 90° at each step across the rows. Which figure completes Row 3?",
    "Apply the quarter-turn (90° clockwise) rotation rule across Row 3 to identify the missing cell:",
    "Trace the directional rotation of the needle advancing 90° clockwise across each row to find cell (3,3):",
    "In this 3×3 matrix, every cell rotates 90° clockwise relative to its left neighbor. Which figure completes the grid?",
    "Determine the orientation of the indicator needle in cell 9 following the 90° clockwise row progression:",
    "Each step across the rows turns the needle 90° clockwise. Which figure belongs in the missing cell?",
    # Subgroup 3: Quadrant Mirror
    "Analyze the quadrant synthesis pattern across the rows to deduce the missing cell in this 3×3 matrix:",
    "In each row, Column 3 merges the active quadrant nodes of Column 1 and Column 2. Which figure completes Row 3?",
    "Observe how quadrant positions combine horizontally across each row to determine the missing cell:",
    "The third cell of each row activates all quadrant positions present in the first two cells. Select the missing figure:",
    "Apply the quadrant union rule across Row 3 to find the configuration of the missing 9th cell:",
    "In this 3×3 grid, the quadrant elements of Columns 1 and 2 unite to form Column 3. Which figure completes the matrix?",
    "Determine which quadrants must be active in cell (3,3) by synthesizing the active nodes of Row 3:",
    "Each row combines the localized quadrant dots of its first two cells into the third. Select the missing cell:",
    "Analyze the active quadrant coordinates across Row 3 to deduce the correct figure for the final cell:"
]

# 27 Unique Prompts for Slot 6 (Symmetry Odd-One-Out)
SLOT6_PROMPTS = [
    # Subgroup 1: Vertical Reflection
    "Four of the following five geometric figures possess vertical bilateral reflection symmetry. Which figure is the ODD ONE OUT?",
    "Four figures can be folded along a vertical center line into exact matching halves. Which figure does NOT belong?",
    "Identify the figure that lacks vertical reflectional symmetry, unlike the other four figures:",
    "Four of these shapes have a clear vertical axis of symmetry. Which figure is the odd one out?",
    "Four figures exhibit bilateral symmetry across a vertical mirror line. Which figure violates this rule?",
    "Select the asymmetric figure that does NOT possess vertical reflectional symmetry:",
    "Four of the five figures are bilaterally symmetrical across the vertical axis. Which figure is the exception?",
    "Find the single geometric figure that cannot be reflected onto itself across a vertical axis:",
    "Four shapes are vertically symmetric. Which figure lacks an axis of symmetry?",
    # Subgroup 2: 180° Rotational Symmetry
    "Four of the following figures exhibit 180° point rotational symmetry (order 2). Which figure does NOT belong?",
    "Four figures appear identical when rotated by 180° around their center. Which figure is the ODD ONE OUT?",
    "Identify the figure that does NOT possess two-fold (180°) rotational symmetry:",
    "Four shapes remain unchanged after a half-turn (180° rotation). Which figure lacks this property?",
    "Select the figure that fails the 180° rotational symmetry test satisfied by the other four figures:",
    "Four of these designs have 180° central point symmetry. Which figure is the odd one out?",
    "Four figures look the same right-side up and upside-down. Which figure does NOT?",
    "Identify the shape that violates the 180° rotational symmetry shared by the other four options:",
    "Four figures possess order-2 rotational symmetry. Which figure is the odd one out?",
    # Subgroup 3: Chiral Handedness
    "Four of the five figures are simple planar rotations of the exact same asymmetrical arrow. Which figure is a mirror reflection (the ODD ONE OUT)?",
    "Four figures can be rotated in the plane to match each other, while one is a flipped mirror image. Which is the odd figure?",
    "Identify the chiral reflection that cannot be aligned with the other four figures by planar rotation alone:",
    "Four of these arrows are identical under 2D rotation. Which figure has been mirrored (chirality flipped)?",
    "Select the figure that is a flipped reflection rather than a pure planar rotation of the base shape:",
    "Four figures are rotational congruences of each other. Which figure is the mirror-reversed outlier?",
    "One of these figures is a mirror reflection of the other four rotational variations. Which is it?",
    "Identify the figure that cannot be superimposed onto the others through 2D rotation alone:",
    "Four arrows share the same handedness under rotation. Which figure has reversed handedness (mirror image)?"
]

# 27 Unique Prompts for Slot 7 (Topology Odd-One-Out)
SLOT7_PROMPTS = [
    # Subgroup 1: Closed vs Open
    "Four of the following figures are fully closed planar boundaries dividing the interior from exterior. Which figure is the ODD ONE OUT?",
    "Four figures consist of continuous closed loops with no open endpoints. Which figure does NOT belong?",
    "Identify the open-ended geometric path that is NOT a completely closed boundary:",
    "Four shapes enclose a watertight interior region. Which figure has an open gap?",
    "Select the figure that is an open curve, unlike the four closed boundaries:",
    "Four figures are topologically closed loops. Which figure contains disconnected terminal ends?",
    "Find the single figure that does not form a sealed, closed perimeter:",
    "Four of the five figures are closed contours. Which figure is an open path?",
    "Identify the figure with open boundary endpoints that violates the closed loop property:",
    # Subgroup 2: Inside vs Outside Dot
    "Examine the spatial relationship between the solid node and the bounded boundary. Which figure violates the geometric rule?",
    "In four of the figures, the tracking node lies strictly inside the closed shape. Which figure has the dot outside?",
    "Four figures contain a focal dot positioned within their interior. Which figure places the dot in the exterior?",
    "Identify the figure where the solid marker is located outside the perimeter, unlike the other four:",
    "Four options place the solid point inside the enclosed boundary. Which figure is the ODD ONE OUT?",
    "Select the figure where the tracking node violates the interior containment rule:",
    "Four figures feature a dot enclosed within their boundary. In which figure is the dot outside?",
    "Find the outlier where the solid point is situated externally rather than internally:",
    "Four figures have an internal focal dot. Which figure has an external dot?",
    # Subgroup 3: Intersection Count
    "Four of the figures consist of geometric segments that intersect at exactly ONE point. Which figure is the ODD ONE OUT?",
    "Four figures contain segments crossing at a single intersection point. Which figure does NOT have exactly 1 intersection?",
    "Identify the figure that does not possess exactly one point of intersection:",
    "Four of these line pairs cross or meet at exactly one vertex. Which figure is the exception?",
    "Select the figure that has zero intersections, unlike the other four intersecting figures:",
    "Four options feature two segments meeting at a single shared point. Which figure is the odd one out?",
    "Four figures have segments with 1 intersection point. Which figure contains parallel lines with 0 intersections?",
    "Find the figure that violates the single-intersection rule satisfied by the other four options:",
    "Four figures contain intersecting lines. Which figure displays parallel non-intersecting lines?"
]

# 27 Unique Prompts for Slot 8 (Quantitative Invariants Odd-One-Out)
SLOT8_PROMPTS = [
    # Subgroup 1: Even vs Odd Sides
    "Four of the polygons below have an EVEN number of edges and vertices. Which figure is the ODD ONE OUT?",
    "Four of these regular shapes possess an even side count (4, 6, or 8). Which figure has an odd side count?",
    "Identify the polygon with an odd number of vertices among the even-sided shapes:",
    "Four figures are even-sided polygons. Which figure is an odd-sided polygon (e.g. 5 sides)?",
    "Select the polygon that violates the even-parity edge rule satisfied by the other four options:",
    "Four of the five geometric figures have an even number of boundary segments. Which figure does NOT belong?",
    "Find the polygon with an odd number of sides (5 vertices) among the even-sided figures:",
    "Four figures have even vertex counts. Which figure has an odd vertex count?",
    "Identify the regular polygon that has an odd number of edges unlike the other four figures:",
    # Subgroup 2: Right Angles
    "Four of the geometric figures contain at least one perpendicular 90° right angle. Which figure does NOT belong?",
    "Four figures possess perpendicular corners forming 90° angles. Which figure contains only acute angles?",
    "Identify the polygon that lacks any 90° right angles, unlike the other four figures:",
    "Four shapes feature perpendicular orthogonal segments. Which figure has zero right angles?",
    "Select the figure that does not contain a 90° right angle corner:",
    "Four of these figures have at least one right-angled vertex. Which figure is the odd one out?",
    "Find the figure with strictly non-perpendicular angles among the right-angled geometries:",
    "Four figures feature 90° orthogonal corners. Which figure contains only 60° acute angles?",
    "Identify the shape that violates the perpendicular right-angle property shared by the others:",
    # Subgroup 3: Four-fold Partition
    "Four of the figures are partitioned into exactly four equal sub-regions. Which figure is the ODD ONE OUT?",
    "Four figures are divided into 4 equal quadrants or strips. Which figure has a different number of partitions?",
    "Identify the figure that is divided into 3 sectors rather than 4 equal regions:",
    "Four shapes are partitioned into four equal component areas. Which figure violates this partition count?",
    "Select the figure that does not contain four equal subdivisions:",
    "Four options display shapes split into four equal sections. Which figure is the odd one out?",
    "Find the figure divided into three radial sectors among the four-quadrant figures:",
    "Four figures have a 4-fold division. Which figure is divided into 3 regions?",
    "Identify the shape with 3 partition sectors that does not match the four-part division of the others:"
]

# 27 Unique Prompts for Slot 9 (Transformational Analogies)
SLOT9_PROMPTS = [
    # Subgroup 1: Rotation + Inversion
    "Figure A is to Figure B as Figure C is to which of the following options? (Observe 90° clockwise rotation and solid fill inversion)",
    "Pair 1 rotates 90° clockwise and inverts its node from hollow to solid. Apply this transformation to Figure C:",
    "Figure A transforms into Figure B through a quarter-turn rotation and fill reversal. Which figure completes the analogy for Figure C?",
    "Identify the transformation of Pair 1 (90° CW turn + fill inversion) and apply it to Figure C:",
    "Figure A is to Figure B as Figure C is to which option? (Analyze angular rotation and marker shading transformation)",
    "Determine the rotation and node inversion rule linking Figures A and B, then apply it to Figure C:",
    "Figure A rotates clockwise by 90° and fills its marker to become Figure B. Apply this to Figure C:",
    "Analyze the 90° turn and fill inversion connecting the first pair to identify the matching figure for Figure C:",
    "Figure A undergoes a 90° clockwise rotation and solid fill transition into Figure B. Which option completes the analogy for Figure C?",
    # Subgroup 2: Bisection & Separation
    "Figure A is to Figure B as Figure C is to which of the following options? (Analyze structural vertical bisection and lateral separation)",
    "Pair 1 is bisected down its vertical midline and parted laterally. Apply this operation to Figure C:",
    "Figure A splits into two mirrored halves separated horizontally to form Figure B. Which figure corresponds to Figure C?",
    "Identify the bisection and lateral translation rule in the first pair, then apply it to Figure C:",
    "Figure A is cut into two equal halves that move apart. Which option applies this exact transformation to Figure C?",
    "Analyze how Figure A divides into two separated halves in Figure B. Which figure results from applying this to Figure C?",
    "Figure A is vertically split and separated to produce Figure B. Which figure completes the analogy for Figure C?",
    "Determine the split-and-separate transformation governing Pair 1 to select the correct equivalent for Figure C:",
    "Figure A is bisected and translated outwards into Figure B. Apply this structural separation to Figure C:",
    # Subgroup 3: Containment Reversal
    "Figure A is to Figure B as Figure C is to which of the following options? (Identify container-enclosed role reversal)",
    "In Pair 1, the outer enclosing shape and inner enclosed shape swap roles. Apply this reversal to Figure C:",
    "Figure A has a container enclosing a smaller shape; Figure B reverses their roles. Which figure results from Figure C?",
    "Analyze how outer and inner shapes invert their containment relationship in Pair 1, then apply to Figure C:",
    "Figure A is to Figure B as Figure C is to which option? (Role swap between outer boundary and internal geometry)",
    "The outer and inner components swap positions between Figures A and B. Which option performs this swap on Figure C?",
    "Figure A inverts its nesting order so the inner shape becomes the outer container in Figure B. Apply this to Figure C:",
    "Determine the containment role reversal rule in Pair 1 to select the corresponding figure for Figure C:",
    "Figure A swaps its inner and outer geometric components to create Figure B. Which option completes the analogy for Figure C?"
]

# 27 Unique Prompts for Slot 10 (Structural & Dimensional Analogies)
SLOT10_PROMPTS = [
    # Subgroup 1: 2D to 3D Extrusion
    "Figure A is to Figure B as Figure C is to which of the following options? (Observe dimensional 2D to 3D solid extrusion)",
    "Pair 1 projects a flat 2D shape into its corresponding 3D isometric solid. Apply this extrusion to Figure C:",
    "Figure A (2D square) becomes Figure B (3D cube). Which 3D solid corresponds to Figure C (2D circle)?",
    "Identify the dimensional extrusion rule converting 2D profiles into 3D isometric solids, then apply to Figure C:",
    "Figure A is to Figure B as Figure C is to which option? (2D plane geometry to 3D solid projection)",
    "Determine the 2D-to-3D volumetric transformation in Pair 1 to select the matching 3D figure for Figure C:",
    "Figure A is extruded into a 3D isometric representation in Figure B. Which figure completes the analogy for Figure C?",
    "Analyze the dimensional projection turning a 2D boundary into a 3D solid, then apply it to Figure C:",
    "Figure A transforms from a 2D shape into its 3D solid counterpart in Figure B. Which option completes the analogy for Figure C?",
    # Subgroup 2: Vertex Increment + Concentric Copy
    "Figure A is to Figure B as Figure C is to which of the following options? (Analyze vertex addition (+1) and concentric replication)",
    "Pair 1 gains one vertex (+1 side) and nests an identical concentric copy inside. Apply this rule to Figure C:",
    "Figure A increases its side count by 1 and adds a smaller nested duplicate in Figure B. Which figure matches Figure C?",
    "Identify the side-increment and concentric nesting rule in Pair 1, then apply it to Figure C:",
    "Figure A adds one edge and an internal duplicate to form Figure B. Which option completes the analogy for Figure C?",
    "Determine the vertex growth and concentric replication pattern linking Figures A and B, then apply to Figure C:",
    "Figure A gains a side and nests an identical inner polygon in Figure B. Which figure completes the analogy for Figure C?",
    "Analyze the +1 vertex addition and concentric inner duplicate rule to choose the matching figure for Figure C:",
    "Figure A advances by one vertex and encloses a concentric duplicate in Figure B. Apply this transformation to Figure C:",
    # Subgroup 3: Boundary to Radial Spokes
    "Figure A is to Figure B as Figure C is to which of the following options? (Analyze vertex-to-radial ray correspondence)",
    "Pair 1 transforms a closed polygon into an equal number of radial spokes emanating from a central node. Apply to Figure C:",
    "Figure A (3 vertices) becomes 3 radial spokes in Figure B. Which figure corresponds to Figure C (4 vertices)?",
    "Identify the rule converting polygon vertex counts into radiating star spokes, then apply to Figure C:",
    "Figure A is to Figure B as Figure C is to which option? (Polygonal vertices mapped to radial spokes)",
    "Determine how vertex count translates into central radiating spokes in Pair 1 to find the match for Figure C:",
    "Figure A converts its corners into radial rays extending from a central hub. Which option completes the analogy for Figure C?",
    "Analyze the corner-to-radial-spoke transformation linking Figures A and B, then apply it to Figure C:",
    "Figure A replaces its polygon edges with radiating spokes matching its vertex count. Apply this to Figure C:"
]

# 27 Unique Prompts for Slot 11 (Folding)
def get_slot11_prompt(test_num, sym_name_0, sym_name_1):
    t_idx = test_num - 31
    phrasings = [
        f"When the unfolded net marked with {sym_name_0} and {sym_name_1} is folded into a 3D cube, which perspective view is geometrically VALID?",
        f"Consider the unfolded hexomino net featuring {sym_name_0} and {sym_name_1}. Which of the 3D views represents a valid folded cube?",
        f"An unfolded cube net displays face markers including {sym_name_0} and {sym_name_1}. Which 3D perspective is geometrically possible?",
        f"Examine the 2D net with {sym_name_0} and {sym_name_1} markers. When assembled into a solid cube, which perspective view is VALID?",
        f"When folded along its edges, which 3D cube perspective can be correctly formed from the net marked with {sym_name_0} and {sym_name_1}?",
        f"Which 3D cube perspective accurately represents the unfolded layout showing {sym_name_0} and {sym_name_1}?",
        f"The unfolded net below features {sym_name_0} and {sym_name_1}. Folding this net into a cube yields which valid perspective view?",
        f"Analyze the spatial opposition of faces on the net with {sym_name_0} and {sym_name_1}. Which 3D folded cube is possible?",
        f"When this unfolded 2D net displaying {sym_name_0} and {sym_name_1} is folded into a 3D cube, which perspective view is correct?"
    ]
    return phrasings[t_idx % len(phrasings)]

print("spatial_prompts module ready.")
