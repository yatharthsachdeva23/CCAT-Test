/**
 * Cleans text to strip raw LaTeX delimiters and format math symbols cleanly.
 * Handles cases like \(N\) -> N, \[x\] -> x, \pi -> π, etc.
 */
export function cleanText(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/\\\((\s*\\pi\s*\\approx\s*[\d.]+)\\\)/g, 'π ≈ $1')
    .replace(/\\\((.*?)\\\)/g, '$1')
    .replace(/\\\[(.*?)\\\]/g, '$1')
    .replace(/\\pi/g, 'π')
    .replace(/\\approx/g, '≈')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\le\b/g, '≤')
    .replace(/\\ge\b/g, '≥')
    .replace(/\\pmod\{([^}]+)\}/g, '(mod $1)');
}
