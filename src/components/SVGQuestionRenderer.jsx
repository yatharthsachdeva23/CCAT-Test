import React from 'react';

/**
 * Universal SVG Visual Question Renderer for CCAT Prep
 * Supports:
 * 1. Next-in-series Sequence / Progressive Patterns
 * 2. 3x3 Spatial Reasoning Matrices (Grid Cells, Objects, or raw SVG)
 * 3. Shape Analogies (Figure A -> Figure B :: Figure C -> ?)
 * 4. Data Interpretation Charts
 * 5. Odd-One-Out visual hints
 */
export default function SVGQuestionRenderer({ question }) {
  if (!question) return null;

  // Case 1: Next-in-series sequence (sequenceFrames or svgSeries)
  const sequenceFrames = question.sequenceFrames || question.svgSeries;
  if (sequenceFrames && Array.isArray(sequenceFrames) && sequenceFrames.length > 0) {
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
          Sequential Progression Pattern:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {sequenceFrames.map((svgString, idx) => (
            <div key={idx} className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 p-1.5 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center justify-center shadow-md hover:border-sky-500/40 transition-colors shrink-0"
                  dangerouslySetInnerHTML={{ __html: svgString }}
                />
                <span className="text-[10px] font-mono text-slate-500">Step {idx + 1}</span>
              </div>
              {idx < sequenceFrames.length - 1 && (
                <span className="text-slate-600 font-bold text-sm sm:text-base">→</span>
              )}
            </div>
          ))}

          {/* Target ? Box */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-slate-600 font-bold text-sm sm:text-base">→</span>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-sky-950/40 border-2 border-dashed border-sky-400 flex items-center justify-center shadow-inner shrink-0">
                <span className="text-2xl font-black text-sky-400 animate-pulse">?</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-sky-400">Step {sequenceFrames.length + 1}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Shape Analogy (Figure A -> Figure B :: Figure C -> ?)
  const contextSvg = question.contextSvg;
  if (contextSvg && (contextSvg.figA || contextSvg.figB || contextSvg.figC)) {
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
          Geometric Analogy Transformation:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Group 1: Figure A -> Figure B */}
          <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-950/80 p-3 sm:p-3.5 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex flex-col items-center gap-1.5">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 p-1 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow"
                dangerouslySetInnerHTML={{ __html: contextSvg.figA }} 
              />
              <span className="text-[11px] font-bold text-slate-400">Figure A</span>
            </div>
            <span className="text-sky-400 font-black text-lg sm:text-xl">➔</span>
            <div className="flex flex-col items-center gap-1.5">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 p-1 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow"
                dangerouslySetInnerHTML={{ __html: contextSvg.figB }} 
              />
              <span className="text-[11px] font-bold text-sky-400">Figure B</span>
            </div>
          </div>

          <div className="text-slate-600 font-black text-xl hidden md:block">::</div>

          {/* Group 2: Figure C -> Choice (?) */}
          <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-950/80 p-3 sm:p-3.5 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex flex-col items-center gap-1.5">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 p-1 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow"
                dangerouslySetInnerHTML={{ __html: contextSvg.figC }} 
              />
              <span className="text-[11px] font-bold text-amber-400">Figure C</span>
            </div>
            <span className="text-amber-400 font-black text-lg sm:text-xl">➔</span>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-sky-950/40 border-2 border-dashed border-sky-400 flex items-center justify-center shadow-inner">
                <span className="text-2xl font-black text-sky-400 animate-pulse">?</span>
              </div>
              <span className="text-[11px] font-bold text-sky-400">Choice (?)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: 3x3 Matrix Grid (Supported via matrixData, matrixCells, or matrixSvg)
  if (question.matrixData && Array.isArray(question.matrixData)) {
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">3×3 Spatial Matrix:</p>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-slate-950 border border-slate-700/90 rounded-2xl shadow-2xl">
          {question.matrixData.map((cell, idx) => {
            const isMissing = cell.isMissing || idx === 8;
            return (
              <div 
                key={idx} 
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-xl flex items-center justify-center p-1 shadow transition-all ${
                  isMissing 
                    ? 'bg-sky-950/40 border-2 border-dashed border-sky-400' 
                    : 'bg-slate-900/80 border border-slate-700/60'
                }`}
              >
                {isMissing ? (
                  <span className="text-3xl font-black text-amber-400 animate-pulse">?</span>
                ) : (
                  <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: cell.svg }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.matrixCells && Array.isArray(question.matrixCells)) {
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">3×3 Spatial Matrix:</p>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-slate-950 border border-slate-700/90 rounded-2xl shadow-2xl">
          {question.matrixCells.map((cellSvg, idx) => {
            const isMissing = idx === 8 || cellSvg === '?';
            return (
              <div 
                key={idx} 
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-xl flex items-center justify-center p-1 shadow transition-all ${
                  isMissing 
                    ? 'bg-sky-950/40 border-2 border-dashed border-sky-400' 
                    : 'bg-slate-900/80 border border-slate-700/60'
                }`}
              >
                {isMissing ? (
                  <span className="text-3xl font-black text-amber-400 animate-pulse">?</span>
                ) : (
                  <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: cellSvg }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.matrixSvg) {
    const correctedSvg = question.matrixSvg.replace(/viewBox="0 0 100 100"/g, 'viewBox="0 0 70 70"');
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">3×3 Spatial Matrix:</p>
        <div 
          className="w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: correctedSvg }}
        />
      </div>
    );
  }

  // Case 4: Data Interpretation Bar Chart
  if ((question.figureType === 'chart' || question.subType === 'data_chart') && question.chartSvg) {
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Data Reference Chart:</p>
        <div 
          className="w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: question.chartSvg }}
        />
      </div>
    );
  }

  // Case 5: Odd-one-out figures hint
  if (question.subType === 'odd_one_out' && question.options && question.options.some(o => o.svg)) {
    return (
      <div className="my-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
        <span className="text-sky-400 font-bold">ℹ️ Tip:</span>
        <span>Carefully inspect each of the five figures below (A through E) to find the outlier that violates the geometric rule.</span>
      </div>
    );
  }

  return null;
}
