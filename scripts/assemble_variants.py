import os
from generate_group0 import group0_code
from generate_group1 import group1_code
from generate_group2 import group2_code

header = """/**
 * Parameterized Math Variants for CCAT Full Simulations (Tests 5 through 30).
 * Tests 2, 3, 4 use cycle === 0 (the original baseline numbers, 100% preserved).
 * Cycles 1 through 9 provide authentic, distinct numbers, recalculated answers,
 * unique distractors, and clean step-by-step explanations.
 */

function randomize(rawOptions, correctIndex, randFn) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const correctRaw = rawOptions[correctIndex];
  const correctText = String(correctRaw.text !== undefined ? correctRaw.text : correctRaw).trim();

  const seen = new Set();
  seen.add(correctText);

  const cleanDistractors = [];
  const otherOptions = rawOptions.filter((_, idx) => idx !== correctIndex);

  for (let item of otherOptions) {
    let itemText = String(item.text !== undefined ? item.text : item).trim();

    if (seen.has(itemText)) {
      let counter = 1;
      let newText = '';
      const numMatch = itemText.match(/^(-?\\$?)([\\d,]+)(\\.\\d+)?(.*)$/);
      if (numMatch) {
        const prefix = numMatch[1];
        const baseNum = parseInt(numMatch[2].replace(/,/g, ''), 10);
        const decimal = numMatch[3] || '';
        const suffix = numMatch[4];

        while (counter <= 20) {
          const delta = counter % 2 === 1 ? counter * 3 : -counter * 2;
          const mutated = Math.max(1, baseNum + delta);
          const candidate = `${prefix}${mutated.toLocaleString()}${decimal}${suffix}`;
          if (!seen.has(candidate)) {
            newText = candidate;
            break;
          }
          counter++;
        }
      }

      if (!newText) {
        newText = `${itemText} (${seen.size + 1})`;
      }
      itemText = newText;
    }

    seen.add(itemText);
    cleanDistractors.push(itemText);
  }

  const pool = [
    { text: correctText, wasCorrect: true },
    ...cleanDistractors.slice(0, 4).map(t => ({ text: t, wasCorrect: false }))
  ];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(randFn() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const finalOptions = pool.map((item, idx) => ({ id: letters[idx], text: item.text }));
  const correctOpt = letters[pool.findIndex(item => item.wasCorrect)];
  return { options: finalOptions, correctOption: correctOpt };
}

const VARIANT_GENERATORS = {};
"""

footer = """
export function getMathVariant(archIdx, cycle, randFn) {
  if (cycle === 0 || !VARIANT_GENERATORS[archIdx]) return null;
  return VARIANT_GENERATORS[archIdx](cycle, randFn);
}
"""

full_content = header + "\n" + group0_code + "\n" + group1_code + "\n" + group2_code + "\n" + footer

out_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "mathVariants.js")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(full_content)

print(f"Successfully assembled all 66 archetypes into {out_path} ({len(full_content)} bytes)")
