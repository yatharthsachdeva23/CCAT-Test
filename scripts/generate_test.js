/**
 * CLI Test Generator Utility for CCAT Prep
 * Usage: node scripts/generate_test.js <testNumber>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTest } from '../src/data/testCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testNumber = process.argv[2] ? parseInt(process.argv[2], 10) : 1;
console.log(`Generating CCAT Test #${testNumber}...`);

const test = buildTest(testNumber);
const outDir = path.join(__dirname, '..', 'public', 'tests');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, `test-${testNumber}.json`);
fs.writeFileSync(outFile, JSON.stringify(test, null, 2));

console.log(`Successfully generated CCAT Test #${testNumber} to ${outFile}`);
console.log(`Total questions: ${test.questions.length} (Math: ${test.mathCount}, Verbal: ${test.verbalCount}, Spatial: ${test.spatialCount})`);
