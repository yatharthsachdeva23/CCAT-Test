import React from 'react';
import { 
  Trophy, Clock, Zap, ArrowRight, Play, CheckCircle2, 
  AlertTriangle, Sparkles, BarChart3, ChevronRight, RotateCcw, Target 
} from 'lucide-react';
import { TEST_CATALOG } from '../data/testCatalog.js';
import { analyzeAttemptPatterns } from '../data/patternEngine.js';

export default function Dashboard({ 
  attempts = [], 
  onStartTest, 
  onReviewAttempt, 
  onOpenCoach,
  onClearHistory
}) {
  const latestAttempt = attempts[0] || null;
  const latestAnalysis = latestAttempt ? analyzeAttemptPatterns(latestAttempt) : null;

  // Compute aggregate stats across all attempts
  const totalAttempts = attempts.length;
  const bestScore = attempts.reduce((max, a) => {
    const score = Object.values(a.responses || {}).filter(r => r.isCorrect).length;
    return Math.max(max, score);
  }, 0);

  const avgScore = totalAttempts > 0 
    ? Math.round(attempts.reduce((sum, a) => {
        return sum + Object.values(a.responses || {}).filter(r => r.isCorrect).length;
      }, 0) / totalAttempts)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* --- HERO / SUMMARY BANNER --- */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold tracking-wide uppercase">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target: 45+ Elite Protocol • 30 Full Tests</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Master the CCAT in <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                50 Questions & 15 Minutes
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Official Criteria Cognitive Aptitude Test simulation: strict forward-only progression, 
              high-speed 18-second pacing, crisp procedural vector SVGs, and real Google Gemini coaching.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onStartTest(1)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Simulation #1</span>
              </button>

              <button
                onClick={onOpenCoach}
                className="px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-purple-300 border border-purple-500/30 font-bold text-sm flex items-center gap-2 transition-all hover:border-purple-500/60 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Chat with AI Coach (Gemini)</span>
              </button>
            </div>
          </div>

          {/* High-Level Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 sm:min-w-[320px]">
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 shadow-lg">
              <p className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Best Score</span>
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-white">{bestScore}</span>
                <span className="text-xs text-slate-500 font-bold">/ 50</span>
              </div>
              <p className="text-[11px] font-bold text-emerald-400 mt-1">
                Goal: 45+ Top 0.1%
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 shadow-lg">
              <p className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
                <span>Average Score</span>
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-white">{avgScore}</span>
                <span className="text-xs text-slate-500 font-bold">/ 50</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{totalAttempts} tests completed</p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 shadow-lg">
              <p className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Target Velocity</span>
              </p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">18.0s</p>
              <p className="text-[11px] text-slate-400 mt-1">Avg per question</p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 shadow-lg">
              <p className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Test Suite</span>
              </p>
              <p className="text-2xl sm:text-3xl font-black text-white">30 Full</p>
              <p className="text-[11px] text-slate-400 mt-1">1,500 Questions total</p>
            </div>
          </div>

        </div>
      </div>

      {/* --- RECENT TELEMETRY INSIGHT --- */}
      {latestAnalysis && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Latest Attempt Telemetry
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {new Date(latestAttempt.timestamp).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {latestAttempt.testTitle}: <span className="text-sky-400">{latestAnalysis.score}/50</span> ({latestAnalysis.overallAccuracy}% accuracy)
            </h3>
            <p className="text-xs text-slate-400">
              Avg pace: <strong className="text-slate-200">{latestAnalysis.overallAvgTimeSec}s</strong> • Time traps: <strong className="text-amber-400">{latestAnalysis.timeTraps.count} questions</strong> (~{latestAnalysis.timeTraps.wastedSeconds}s lost)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onReviewAttempt(latestAttempt)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>View Review & Answers</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={onOpenCoach}
              className="px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs sm:text-sm font-bold border border-purple-500/40 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Ask Gemini</span>
            </button>
          </div>
        </div>
      )}

      {/* --- 30 TEST SUITE SELECTOR (NO CATEGORIZATION) --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Full CCAT Test Suite (30 Full Tests)</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              30 complete, distinct 50-question simulations. Calibrated with varying difficulties and randomized answer options.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEST_CATALOG.map((test) => {
            const pastTestAttempts = attempts.filter(a => a.testId === test.id);
            const testBestScore = pastTestAttempts.reduce((max, a) => {
              const score = Object.values(a.responses || {}).filter(r => r.isCorrect).length;
              return Math.max(max, score);
            }, null);

            return (
              <div 
                key={test.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-800 text-sky-400 border border-slate-700">
                      Simulation #{test.testNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      50 Qs • 15 Mins
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {test.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-medium">
                    <span>22 Math</span>
                    <span>•</span>
                    <span>17 Verbal</span>
                    <span>•</span>
                    <span>11 Spatial</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-3">
                  <div>
                    {testBestScore !== null ? (
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800">
                        Best: {testBestScore}/50
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">Unattempted</span>
                    )}
                  </div>

                  <button
                    onClick={() => onStartTest(test.testNumber)}
                    className="px-4 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold text-xs border border-sky-500/30 hover:border-sky-500 transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <span>{testBestScore !== null ? 'Retake' : 'Launch'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- PAST ATTEMPTS HISTORY (SAVED PERSISTENTLY) --- */}
      {attempts.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Attempt History & Log</h2>
              <p className="text-xs text-slate-400">All historical tests and question timings are permanently preserved.</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Clear all test attempt history? This cannot be undone.')) {
                  onClearHistory();
                }
              }}
              className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Simulation</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Accuracy</th>
                    <th className="px-4 py-3">Pacing</th>
                    <th className="px-4 py-3">Time Traps</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {attempts.map((att) => {
                    const stats = analyzeAttemptPatterns(att);
                    return (
                      <tr key={att.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-400">
                          {new Date(att.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 font-bold text-white">
                          {att.testTitle}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-black text-sky-400 text-sm">{stats.score}</span>
                          <span className="text-slate-500 font-bold"> / 50</span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">
                          {stats.overallAccuracy}%
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-300">
                          {stats.overallAvgTimeSec}s / Q
                        </td>
                        <td className="px-4 py-3">
                          {stats.timeTraps.count > 0 ? (
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {stats.timeTraps.count}
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold">0</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => onReviewAttempt(att)}
                            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
