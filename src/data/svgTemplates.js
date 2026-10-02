/**
 * SVG Templates and Generator for CCAT Spatial & Chart Questions.
 * Generates mathematically crisp, scalable vector graphics for:
 * 1. Next in Series (Rotations, dot movements, shading cycles)
 * 2. Odd One Out (5 geometric frames with subtle rule differences)
 * 3. 3x3 Matrices (Pattern grid with ? in cell 9)
 * 4. Data Charts (Bar graphs, line trends)
 */

export const SVG_STYLES = {
  stroke: '#38bdf8', // Sky blue for shapes
  strokeWidth: 3,
  fill: '#0f172a',
  fillActive: '#38bdf8',
  fillHatch: '#0284c7',
  dot: '#f59e0b', // Amber dot
  bg: '#1e293b',
  border: '#334155'
};

/**
 * Generates an SVG string for a rotating geometric shape with an orbiting dot
 */
export function generateRotatingShape({ shape = 'square', angle = 0, dotPos = 0, shaded = false, size = 100 }) {
  const center = size / 2;
  const radius = size * 0.28;
  const dotOrbit = size * 0.38;
  const dotAngleRad = (dotPos * 90 * Math.PI) / 180;
  const dotX = center + dotOrbit * Math.cos(dotAngleRad);
  const dotY = center + dotOrbit * Math.sin(dotAngleRad);

  let shapeElement = '';
  const fill = shaded ? '#38bdf8' : 'none';
  const stroke = '#38bdf8';

  if (shape === 'square') {
    const half = radius;
    shapeElement = `<rect x="${center - half}" y="${center - half}" width="${half * 2}" height="${half * 2}" fill="${fill}" stroke="${stroke}" stroke-width="3" transform="rotate(${angle} ${center} ${center})" rx="4" />`;
  } else if (shape === 'triangle') {
    const h = radius * 1.8;
    const p1 = `${center},${center - radius}`;
    const p2 = `${center - radius * 0.866},${center + radius * 0.7}`;
    const p3 = `${center + radius * 0.866},${center + radius * 0.7}`;
    shapeElement = `<polygon points="${p1} ${p2} ${p3}" fill="${fill}" stroke="${stroke}" stroke-width="3" transform="rotate(${angle} ${center} ${center})" />`;
  } else if (shape === 'arrow') {
    const w = radius * 0.5;
    const len = radius * 1.4;
    shapeElement = `
      <g transform="rotate(${angle} ${center} ${center})">
        <line x1="${center}" y1="${center + len}" x2="${center}" y2="${center - len}" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
        <polyline points="${center - w},${center - len + w} ${center},${center - len} ${center + w},${center - len + w}" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>`;
  } else if (shape === 'cross') {
    shapeElement = `
      <g transform="rotate(${angle} ${center} ${center})">
        <line x1="${center - radius}" y1="${center}" x2="${center + radius}" y2="${center}" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
        <line x1="${center}" y1="${center - radius}" x2="${center}" y2="${center + radius}" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
      </g>`;
  } else if (shape === 'circle-sector') {
    // Shaded quadrant
    shapeElement = `
      <g transform="rotate(${angle} ${center} ${center})">
        <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${stroke}" stroke-width="3"/>
        <path d="M ${center} ${center} L ${center + radius} ${center} A ${radius} ${radius} 0 0 1 ${center} ${center + radius} Z" fill="#38bdf8"/>
        <line x1="${center - radius}" y1="${center}" x2="${center + radius}" y2="${center}" stroke="${stroke}" stroke-width="2"/>
        <line x1="${center}" y1="${center - radius}" x2="${center}" y2="${center + radius}" stroke="${stroke}" stroke-width="2"/>
      </g>`;
  }

  const dotElement = dotPos !== null && dotPos !== undefined
    ? `<circle cx="${dotX}" cy="${dotY}" r="5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />`
    : '';

  return `
    <svg viewBox="0 0 ${size} ${size}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      ${shapeElement}
      ${dotElement}
    </svg>
  `.trim();
}

/**
 * Generates an SVG 3x3 Matrix Grid
 */
export function generateMatrixGrid({ cells = [], size = 260 }) {
  const cellSize = (size - 24) / 3;
  let cellsMarkup = '';

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const idx = row * 3 + col;
      const x = 6 + col * (cellSize + 6);
      const y = 6 + row * (cellSize + 6);
      const cellContent = cells[idx] || (idx === 8 ? '?' : '');

      cellsMarkup += `
        <g transform="translate(${x}, ${y})">
          <rect width="${cellSize}" height="${cellSize}" rx="6" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          ${idx === 8 ? `
            <text x="${cellSize / 2}" y="${cellSize / 2 + 8}" text-anchor="middle" font-size="28" font-weight="bold" fill="#f59e0b">?</text>
          ` : `
            <g transform="scale(${cellSize / 100})">
              ${cellContent}
            </g>
          `}
        </g>
      `;
    }
  }

  return `
    <svg viewBox="0 0 ${size} ${size}" class="max-w-[280px] max-h-[280px] mx-auto" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="12" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      ${cellsMarkup}
    </svg>
  `.trim();
}

/**
 * Generates an SVG Bar Chart for numerical reasoning
 */
export function generateBarChart({ title = "Quarterly Sales (Units)", labels = ['Q1', 'Q2', 'Q3', 'Q4'], values = [40, 65, 85, 50], unit = 'k', width = 360, height = 220 }) {
  const padding = { top: 35, right: 30, bottom: 40, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxVal = Math.max(...values, 100);
  const barWidth = chartW / labels.length * 0.55;
  const barSpacing = chartW / labels.length;

  let barsMarkup = '';
  labels.forEach((lbl, i) => {
    const val = values[i];
    const barH = (val / maxVal) * chartH;
    const x = padding.left + i * barSpacing + (barSpacing - barWidth) / 2;
    const y = padding.top + chartH - barH;

    barsMarkup += `
      <g class="bar-group">
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="#38bdf8" opacity="0.9"/>
        <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="600">${val}${unit}</text>
        <text x="${x + barWidth / 2}" y="${height - padding.bottom + 18}" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="500">${lbl}</text>
      </g>
    `;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[420px] mx-auto rounded-xl bg-slate-900 border border-slate-700/60 p-2" xmlns="http://www.w3.org/2000/svg">
      <text x="${width / 2}" y="22" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold">${title}</text>
      <!-- Grid lines -->
      <line x1="${padding.left}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top}" stroke="#334155" stroke-dasharray="3,3" stroke-width="1"/>
      <line x1="${padding.left}" y1="${padding.top + chartH / 2}" x2="${width - padding.right}" y2="${padding.top + chartH / 2}" stroke="#334155" stroke-dasharray="3,3" stroke-width="1"/>
      <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="#64748b" stroke-width="1.5"/>
      <!-- Y-axis values -->
      <text x="${padding.left - 8}" y="${padding.top + 4}" text-anchor="end" fill="#94a3b8" font-size="10">${maxVal}${unit}</text>
      <text x="${padding.left - 8}" y="${padding.top + chartH / 2 + 4}" text-anchor="end" fill="#94a3b8" font-size="10">${Math.round(maxVal / 2)}${unit}</text>
      <text x="${padding.left - 8}" y="${padding.top + chartH + 4}" text-anchor="end" fill="#94a3b8" font-size="10">0</text>
      ${barsMarkup}
    </svg>
  `.trim();
}
