import React from 'react';

/**
 * Renders SVG question visuals (Sequences, Matrices, Charts)
 */
export default function SVGQuestionRenderer({ question }) {
  if (!question) return null;

  // Case 1: Next-in-series sequence
  if (question.figureType === 'sequence' && question.sequenceFrames) {
    return (
      <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Sequence Pattern:</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {question.sequenceFrames.map((svgString, idx) => (
            <div key={idx} className="flex items-center gap-2 sm:gap-3">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 p-1.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shadow-md hover:border-sky-500/40 transition-colors"
                dangerouslySetInnerHTML={{ __html: svgString }}
              />
              {idx < question.sequenceFrames.length - 1 && (
                <span className="text-slate-600 font-bold text-sm">→</span>
              )}
            </div>
          ))}
          {/* Target ? Box */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-slate-600 font-bold text-sm">→</span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-sky-950/40 border-2 border-dashed border-sky-400 flex items-center justify-center shadow-inner">
              <span className="text-2xl font-black text-sky-400 animate-pulse">?</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: 3x3 Matrix Grid
  if (question.figureType === 'matrix' && question.matrixSvg) {
    return (
      <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col items-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">3x3 Spatial Matrix:</p>
        <div 
          className="w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: question.matrixSvg }}
        />
      </div>
    );
  }

  // Case 3: Data Interpretation Bar Chart
  if (question.figureType === 'chart' && question.chartSvg) {
    return (
      <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col items-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">Data Reference:</p>
        <div 
          className="w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: question.chartSvg }}
        />
      </div>
    );
  }

  return null;
}
