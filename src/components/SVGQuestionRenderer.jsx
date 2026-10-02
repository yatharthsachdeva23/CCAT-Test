import React from 'react';

/**
 * Renders SVG question visuals (Sequences, Matrices, Charts)
 */
export default function SVGQuestionRenderer({ question }) {
  if (!question) return null;

  // Case 1: Next-in-series sequence
  if (question.figureType === 'sequence' && question.sequenceFrames) {
    return (
      <div className="my-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center sm:text-left">Sequence Pattern:</p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {question.sequenceFrames.map((svgString, idx) => (
            <div key={idx} className="flex items-center gap-1.5 sm:gap-2.5">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 p-1.5 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center justify-center shadow-md hover:border-sky-500/40 transition-colors shrink-0"
                dangerouslySetInnerHTML={{ __html: svgString }}
              />
              {idx < question.sequenceFrames.length - 1 && (
                <span className="text-slate-600 font-bold text-sm">→</span>
              )}
            </div>
          ))}
          {/* Target ? Box */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="text-slate-600 font-bold text-sm">→</span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-sky-950/40 border-2 border-dashed border-sky-400 flex items-center justify-center shadow-inner shrink-0">
              <span className="text-2xl font-black text-sky-400 animate-pulse">?</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: 3x3 Matrix Grid (Supported via CSS grid matrixCells or raw matrixSvg)
  if (question.figureType === 'matrix') {
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
      // Auto-fix any legacy SVG that had mismatched viewBox 0 0 100 100
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
  }

  // Case 3: Data Interpretation Bar Chart
  if (question.figureType === 'chart' && question.chartSvg) {
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Data Reference:</p>
        <div 
          className="w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: question.chartSvg }}
        />
      </div>
    );
  }

  return null;
}
