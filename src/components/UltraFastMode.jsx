import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Clock, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  RotateCcw, Sparkles, Trophy, ChevronRight, Play, ArrowLeft, ShieldCheck, Flame,
  History, Filter, Trash2, Calendar, Target, Eye, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SVGQuestionRenderer from './SVGQuestionRenderer.jsx';
import { generateUltraFastSprint } from '../data/ultraFastGenerator.js';
import MarkdownView from './MarkdownView.jsx';
import { 
  getUltraFastAttempts, 
  saveUltraFastAttempt, 
  deleteUltraFastAttempt, 
  clearUltraFastAttempts 
} from '../utils/storage.js';
import { 
  startPreloadingSpeedTricks, 
  getAllSpeedTricksForTest, 
  fetchSingleSpeedTrick 
} from '../services/aiSpeedTricks.js';

export default function UltraFastMode({ attempts = [], onBackToDashboard }) {
  // Stages: 'select' | 'running' | 'review'
  const [stage, setStage] = useState('select');
  // Sub-tabs on select screen: 'launch' | 'history'
  const [subTab, setSubTab] = useState('launch');
  const [selectedSubject, setSelectedSubject] = useState('verbal'); // 'verbal' | 'math' | 'spatial'
  const [sprintData, setSprintData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // High-precision per-question timer (tenths of a second)
  const [timeRemaining, setTimeRemaining] = useState(7);
  const [sprintResponses, setSprintResponses] = useState([]);
  
  // Sprint History & Review State
  const [sprintHistory, setSprintHistory] = useState(() => getUltraFastAttempts());
  const [activeSprintReview, setActiveSprintReview] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'mistakes' | 'timedOut' | 'wrong' | 'correct'
  const [sprintSpeedTricks, setSprintSpeedTricks] = useState({});
  const [loadingTricks, setLoadingTricks] = useState({});

  useEffect(() => {
    const activeTestId = activeSprintReview ? (activeSprintReview.subject ? `sprint_${activeSprintReview.subject}` : 'sprint') : (sprintData ? `sprint_${sprintData.subject}` : 'sprint');
    const questions = activeSprintReview?.questions || sprintData?.questions || [];
    setSprintSpeedTricks(getAllSpeedTricksForTest(activeTestId, questions));

    const handleUpdate = () => {
      setSprintSpeedTricks(getAllSpeedTricksForTest(activeTestId, questions));
    };

    window.addEventListener('ccat-speed-tricks-updated', handleUpdate);
    return () => window.removeEventListener('ccat-speed-tricks-updated', handleUpdate);
  }, [activeSprintReview, sprintData]);

  const handleFetchSprintTrick = async (item) => {
    const testId = activeSprintReview ? `sprint_${activeSprintReview.subject}` : `sprint_${sprintData?.subject || 'verbal'}`;
    setLoadingTricks(prev => ({ ...prev, [item.id]: true }));
    const trick = await fetchSingleSpeedTrick(testId, item);
    if (trick) {
      setSprintSpeedTricks(prev => ({ ...prev, [item.id]: trick }));
    }
    setLoadingTricks(prev => ({ ...prev, [item.id]: false }));
  };
  
  // Refs for timer and state synchronization
  const questionStartTimeRef = useRef(performance.now());
  const timerRafRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const selectedOptionRef = useRef(null);
  const currentIndexRef = useRef(0);
  const sprintDataRef = useRef(null);
  const sprintResponsesRef = useRef([]);

  // Extract list of attempted test IDs from user's actual attempts
  // Exclude 0-question launch sessions so variations come from real completed questions
  const validAttempts = attempts.filter(a => {
    const resp = a.responses ? Object.values(a.responses) : [];
    return resp.some(r => r.selectedOption !== null || r.isCorrect);
  });

  const attemptedTestIds = validAttempts.length > 0 
    ? Array.from(new Set(validAttempts.map(a => a.testId)))
    : ['test-1'];

  // User-facing practiced tests label
  const practicedTestsListStr = attemptedTestIds
    .map(t => {
      const m = t.match(/test-(\d+)/);
      return m ? `Test ${m[1]}` : t;
    })
    .sort((a, b) => parseInt(a.replace('Test ', ''), 10) - parseInt(b.replace('Test ', ''), 10))
    .join(', ');

  // Keep refs in sync
  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    sprintDataRef.current = sprintData;
  }, [sprintData]);

  useEffect(() => {
    sprintResponsesRef.current = sprintResponses;
  }, [sprintResponses]);

  // Start a new 1-minute sprint for the chosen subject
  const startSprint = (subject = selectedSubject) => {
    const data = generateUltraFastSprint(subject, attemptedTestIds, Date.now());
    setSprintData(data);
    sprintDataRef.current = data;
    startPreloadingSpeedTricks(`sprint_${subject}`, data.questions);
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    setSelectedOption(null);
    selectedOptionRef.current = null;
    setSprintResponses([]);
    sprintResponsesRef.current = [];
    setTimeRemaining(data.timePerQuestionSec);
    isTransitioningRef.current = false;
    setStage('running');
  };

  // High precision countdown loop for the current question
  useEffect(() => {
    if (stage !== 'running' || !sprintData) return;

    const currentQ = sprintData.questions[currentIndex];
    if (!currentQ) return;

    const timeLimit = currentQ.timeLimitSec;
    questionStartTimeRef.current = performance.now();
    setTimeRemaining(timeLimit);
    isTransitioningRef.current = false;

    const tick = () => {
      if (isTransitioningRef.current) return;

      const elapsedSec = (performance.now() - questionStartTimeRef.current) / 1000;
      const rem = Math.max(0, timeLimit - elapsedSec);
      setTimeRemaining(rem);

      if (rem <= 0) {
        // Time expired! Auto-advance without considering unconfirmed choice
        handleTimeout();
      } else {
        timerRafRef.current = requestAnimationFrame(tick);
      }
    };

    timerRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRafRef.current) cancelAnimationFrame(timerRafRef.current);
    };
  }, [stage, currentIndex, sprintData]);

  // When timer hits 0 before clicking Done
  function handleTimeout() {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    if (timerRafRef.current) cancelAnimationFrame(timerRafRef.current);

    const data = sprintDataRef.current;
    const activeIdx = currentIndexRef.current;
    const currentQ = data.questions[activeIdx];
    const timeLimit = currentQ.timeLimitSec;

    // RULE: "only if i click option and click done then only it considers that otherwise not"
    // Unconfirmed choices on timeout are NOT considered.
    const record = {
      questionId: currentQ.id,
      question: currentQ.question,
      options: currentQ.options,
      selectedOption: null, // NOT considered
      correctOption: currentQ.correctOption,
      isCorrect: false,
      timedOut: true,
      timeSpentSec: timeLimit,
      timeLimitSec: timeLimit,
      explanation: currentQ.explanation,
      subType: currentQ.subType,
      figureSvg: currentQ.figureSvg,
      sequenceFrames: currentQ.sequenceFrames,
      matrixCells: currentQ.matrixCells,
      contextSvg: currentQ.contextSvg
    };

    const nextResponses = [...sprintResponsesRef.current, record];
    sprintResponsesRef.current = nextResponses;
    setSprintResponses(nextResponses);

    const nextIdx = activeIdx + 1;
    if (nextIdx < data.questions.length) {
      setSelectedOption(null);
      selectedOptionRef.current = null;
      setCurrentIndex(nextIdx);
    } else {
      finishSprint(nextResponses);
    }
  }

  // When user clicks the "Done" button before timer expires
  function handleDone() {
    if (isTransitioningRef.current) return;
    if (!selectedOption) return; // Must have selected an option

    isTransitioningRef.current = true;
    if (timerRafRef.current) cancelAnimationFrame(timerRafRef.current);

    const data = sprintDataRef.current;
    const activeIdx = currentIndexRef.current;
    const currentQ = data.questions[activeIdx];
    const elapsedSec = Math.min(
      currentQ.timeLimitSec,
      Math.max(0.2, (performance.now() - questionStartTimeRef.current) / 1000)
    );
    const chosen = selectedOptionRef.current;
    const isCorrect = chosen === currentQ.correctOption;

    const record = {
      questionId: currentQ.id,
      question: currentQ.question,
      options: currentQ.options,
      selectedOption: chosen,
      correctOption: currentQ.correctOption,
      isCorrect,
      timedOut: false,
      timeSpentSec: Math.round(elapsedSec * 10) / 10,
      timeLimitSec: currentQ.timeLimitSec,
      explanation: currentQ.explanation,
      subType: currentQ.subType,
      figureSvg: currentQ.figureSvg,
      sequenceFrames: currentQ.sequenceFrames,
      matrixCells: currentQ.matrixCells,
      contextSvg: currentQ.contextSvg
    };

    const nextResponses = [...sprintResponsesRef.current, record];
    sprintResponsesRef.current = nextResponses;
    setSprintResponses(nextResponses);

    const nextIdx = activeIdx + 1;
    if (nextIdx < data.questions.length) {
      setSelectedOption(null);
      selectedOptionRef.current = null;
      setCurrentIndex(nextIdx);
    } else {
      finishSprint(nextResponses);
    }
  }

  // Finish Sprint & Persist to Storage
  function finishSprint(responses) {
    const currentSprint = sprintDataRef.current;
    const totalQ = responses.length;
    const correctCount = responses.filter(r => r.isCorrect).length;
    const timedOutCount = responses.filter(r => r.timedOut).length;
    const wrongCount = totalQ - correctCount - timedOutCount;
    const accuracy = Math.round((correctCount / (totalQ || 1)) * 100);
    const avgTime = Math.round((responses.reduce((sum, r) => sum + r.timeSpentSec, 0) / (totalQ || 1)) * 10) / 10;

    const subjectTitles = {
      verbal: 'English / Verbal',
      math: 'Math & Logic',
      spatial: 'Spatial Reasoning'
    };

    const sprintAttempt = {
      id: `sprint_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      subject: currentSprint?.subject || selectedSubject,
      subjectTitle: subjectTitles[currentSprint?.subject || selectedSubject] || 'Speed Sprint',
      timePerQuestionSec: currentSprint?.timePerQuestionSec || 10,
      totalQuestions: totalQ,
      score: correctCount,
      accuracy,
      avgTimeSpentSec: avgTime,
      timedOutCount,
      wrongCount,
      responses
    };

    // Save to persistent localStorage
    const updatedHistory = saveUltraFastAttempt(sprintAttempt);
    setSprintHistory(updatedHistory);
    setActiveSprintReview(sprintAttempt);
    setReviewFilter('all');

    if (accuracy >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_err) {}
    }
    setStage('review');
  }

  // Open review for a historical sprint
  function handleOpenHistoryReview(sprint) {
    setActiveSprintReview(sprint);
    setReviewFilter('all');
    setStage('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Delete a single sprint from history
  function handleDeleteSprint(sprintId, e) {
    e?.stopPropagation();
    if (window.confirm('Delete this sprint attempt record?')) {
      const updated = deleteUltraFastAttempt(sprintId);
      setSprintHistory(updated);
      if (activeSprintReview?.id === sprintId) {
        setActiveSprintReview(null);
        setStage('select');
      }
    }
  }

  // Clear all sprint history
  function handleClearAllHistory() {
    if (window.confirm('Are you sure you want to clear all Ultra Fast sprint attempts? This cannot be undone.')) {
      clearUltraFastAttempts();
      setSprintHistory([]);
      setActiveSprintReview(null);
    }
  }

  // Format date helper
  function formatSprintDate(isoString) {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit' 
      });
    } catch {
      return 'Recently';
    }
  }

  // Subject icon helper
  function getSubjectPill(subject) {
    switch (subject) {
      case 'verbal':
        return { label: 'English / Verbal', time: '7s / Q', color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' };
      case 'math':
        return { label: 'Math & Logic', time: '15s / Q', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
      case 'spatial':
        return { label: 'Spatial Reasoning', time: '10s / Q', color: 'bg-sky-500/15 text-sky-300 border-sky-500/30' };
      default:
        return { label: subject, time: '', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  }

  // -------------------------------------------------------------
  // RENDER: STAGE SELECT (Subject Launch or History Hub)
  // -------------------------------------------------------------
  if (stage === 'select') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-black tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Ultra Fast Speed Protocol • ~1-Min Rapid Sprints</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              CCAT <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">Ultra Fast Speed Mode</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Train your cognitive reflexes to instinctive levels. Each sprint runs for approximately <strong>1 minute</strong> in your chosen subject with strict per-question countdowns and instant mistake tracking.
            </p>

            {/* Core Rules Callout */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Strict Time Limits</strong>
                  <span className="text-slate-400">Verbal: 7s • Math: 15s • Spatial: 10s</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Confirm with "Done"</strong>
                  <span className="text-slate-400">Click option AND click Done before 0s</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Concept Variations</strong>
                  <span className="text-slate-400">Derived strictly from completed: <strong className="text-amber-300">{practicedTestsListStr}</strong> (0 unattempted tests spoiled)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top View Switcher: Launch Sprint vs Past Sprint History */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSubTab('launch')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                subTab === 'launch'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Launch New Sprint</span>
            </button>

            <button
              onClick={() => setSubTab('history')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                subTab === 'history'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Sprint History & Reviews</span>
              {sprintHistory.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                  subTab === 'history' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {sprintHistory.length}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* --------------------------------------------------------- */}
        {/* SUBTAB 1: LAUNCH NEW SPRINT */}
        {/* --------------------------------------------------------- */}
        {subTab === 'launch' && (
          <div className="space-y-8">
            
            {/* Recent Sprint Teaser Banner (if any sprints exist) */}
            {sprintHistory.length > 0 && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <History className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Latest Sprint:</span>
                      <strong className="text-white text-sm capitalize">{sprintHistory[0].subjectTitle}</strong>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {sprintHistory[0].score}/{sprintHistory[0].totalQuestions} ({sprintHistory[0].accuracy}%)
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {formatSprintDate(sprintHistory[0].timestamp)} • Avg reaction: {sprintHistory[0].avgTimeSpentSec}s • {sprintHistory[0].wrongCount + sprintHistory[0].timedOutCount} mistakes
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenHistoryReview(sprintHistory[0])}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Review Latest Mistakes</span>
                  </button>
                  <button
                    onClick={() => setSubTab('history')}
                    className="px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium cursor-pointer"
                  >
                    View All ({sprintHistory.length}) →
                  </button>
                </div>
              </div>
            )}

            {/* Subject Selection Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Select Your Subject Sprint</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* 1: Verbal / English */}
                <div 
                  onClick={() => setSelectedSubject('verbal')}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    selectedSubject === 'verbal'
                      ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-950/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold text-xs uppercase tracking-wider border border-indigo-500/30">
                        Verbal Reasoning
                      </span>
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        <span>7s / Q</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      English Speed Sprint
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Analogies, rapid antonyms, synonyms, and quick sentence clues. Tests split-second lexical retrieval.
                    </p>

                    <div className="pt-2 text-xs text-slate-300 space-y-1">
                      <p>• <strong>8 Questions</strong> (~56s total sprint)</p>
                      <p>• Fast relational pairing & contrast detection</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Estimated ~1 min</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      selectedSubject === 'verbal' ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-slate-700'
                    }`}>
                      {selectedSubject === 'verbal' && <CheckCircle2 className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* 2: Math & Logic */}
                <div 
                  onClick={() => setSelectedSubject('math')}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    selectedSubject === 'math'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-950/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-wider border border-emerald-500/30">
                        Math & Logic
                      </span>
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        <span>15s / Q</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Math Speed Sprint
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Rapid number series, percentage rebounds, mental work rates, and closing speeds. No slow pen-paper algebra!
                    </p>

                    <div className="pt-2 text-xs text-slate-300 space-y-1">
                      <p>• <strong>4 Questions</strong> (60s total sprint)</p>
                      <p>• High-speed arithmetic shortcuts & pattern logic</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Estimated exactly 1 min</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      selectedSubject === 'math' ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700'
                    }`}>
                      {selectedSubject === 'math' && <CheckCircle2 className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* 3: Spatial Reasoning */}
                <div 
                  onClick={() => setSelectedSubject('spatial')}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    selectedSubject === 'spatial'
                      ? 'bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/50 shadow-xl shadow-sky-950/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-extrabold text-xs uppercase tracking-wider border border-sky-500/30">
                        Spatial Reasoning
                      </span>
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        <span>10s / Q</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      Spatial Speed Sprint
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Odd-one-out geometry, rotational series, quadrant sweeps, and polygon vertex sequences.
                    </p>

                    <div className="pt-2 text-xs text-slate-300 space-y-1">
                      <p>• <strong>6 Questions</strong> (60s total sprint)</p>
                      <p>• Pure vector SVGs with instant visual cues</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Estimated exactly 1 min</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      selectedSubject === 'spatial' ? 'bg-sky-500 border-sky-400 text-white' : 'border-slate-700'
                    }`}>
                      {selectedSubject === 'spatial' && <CheckCircle2 className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Launch Button Bar */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={onBackToDashboard}
                className="px-5 py-3 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => startSprint(selectedSubject)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Start {selectedSubject === 'verbal' ? 'English (7s)' : selectedSubject === 'math' ? 'Math (15s)' : 'Spatial (10s)'} Sprint</span>
              </button>
            </div>

          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* SUBTAB 2: SPRINT HISTORY & REVIEWS (Stored in this section) */}
        {/* --------------------------------------------------------- */}
        {subTab === 'history' && (
          <div className="space-y-6">
            
            {/* Global Sprint Metrics Overview */}
            {sprintHistory.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-xs text-slate-400 block font-medium">Total Sprints</span>
                  <span className="text-2xl font-black text-white font-mono mt-1 block">
                    {sprintHistory.length}
                  </span>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-xs text-slate-400 block font-medium">Avg Accuracy</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
                    {Math.round(sprintHistory.reduce((acc, s) => acc + s.accuracy, 0) / sprintHistory.length)}%
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-xs text-slate-400 block font-medium">Avg Reaction Speed</span>
                  <span className="text-2xl font-black text-sky-400 font-mono mt-1 block">
                    {(sprintHistory.reduce((acc, s) => acc + s.avgTimeSpentSec, 0) / sprintHistory.length).toFixed(1)}s
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-xs text-slate-400 block font-medium">Total Mistakes Logged</span>
                  <span className="text-2xl font-black text-rose-400 font-mono mt-1 block">
                    {sprintHistory.reduce((acc, s) => acc + (s.wrongCount + s.timedOutCount), 0)}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Sprint List */}
            {sprintHistory.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">No Ultra Fast Sprints Recorded Yet</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Complete your first 1-minute speed sprint to log your reaction pace, track mistakes, and review lightning shortcuts!
                </p>
                <button
                  onClick={() => setSubTab('launch')}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Launch Your First Sprint</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                    <History className="w-4 h-4 text-amber-400" />
                    <span>Recorded Sprints ({sprintHistory.length})</span>
                  </h3>

                  <button
                    onClick={handleClearAllHistory}
                    className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Sprint History</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {sprintHistory.map((sprint, idx) => {
                    const pill = getSubjectPill(sprint.subject);
                    const mistakesCount = (sprint.wrongCount || 0) + (sprint.timedOutCount || 0);

                    return (
                      <div
                        key={sprint.id || idx}
                        onClick={() => handleOpenHistoryReview(sprint)}
                        className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer hover:shadow-xl group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start sm:items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                            sprint.accuracy >= 75 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          }`}>
                            <Trophy className="w-6 h-6" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${pill.color}`}>
                                {sprint.subjectTitle || pill.label}
                              </span>
                              <span className="text-xs text-slate-500">
                                {formatSprintDate(sprint.timestamp)}
                              </span>
                            </div>

                            <div className="flex items-baseline gap-2 pt-0.5">
                              <span className="text-lg font-black text-white font-mono">
                                {sprint.score} / {sprint.totalQuestions}
                              </span>
                              <span className={`text-xs font-bold ${sprint.accuracy >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                ({sprint.accuracy}%)
                              </span>
                              <span className="text-xs text-slate-400">
                                • {sprint.avgTimeSpentSec}s avg reaction
                              </span>
                            </div>

                            {/* Mistake details pill */}
                            <div className="flex items-center gap-2 pt-1 text-xs">
                              {mistakesCount > 0 ? (
                                <span className="inline-flex items-center gap-1 font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>{mistakesCount} mistake{mistakesCount > 1 ? 's' : ''} ({sprint.wrongCount} wrong, {sprint.timedOutCount} timed out)</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>100% Perfect Sprint (0 mistakes)</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2.5 pt-2 sm:pt-0 self-end sm:self-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenHistoryReview(sprint);
                            }}
                            className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Review Mistakes</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startSprint(sprint.subject);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Retake fresh sprint for this subject"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Retake</span>
                          </button>

                          <button
                            onClick={(e) => handleDeleteSprint(sprint.id, e)}
                            className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete this record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back to Launch Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setSubTab('launch')}
                className="px-5 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Subject Sprints</span>
              </button>
            </div>

          </div>
        )}

      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: STAGE RUNNING (Active 1-Minute Sprint)
  // -------------------------------------------------------------
  if (stage === 'running' && sprintData) {
    const currentQ = sprintData.questions[currentIndex];
    const totalQ = sprintData.questions.length;
    const timeLimit = currentQ.timeLimitSec;
    const timeFraction = Math.max(0, Math.min(1, timeRemaining / timeLimit));

    // Urgent state when under 30% of question time left
    const isUrgent = timeRemaining <= (timeLimit <= 7 ? 2.5 : 3.5);

    const subjectBadge = {
      verbal: { title: 'English / Verbal', limitText: '7s Limit', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
      math: { title: 'Math & Logic', limitText: '15s Limit', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
      spatial: { title: 'Spatial Reasoning', limitText: '10s Limit', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' }
    }[sprintData.subject] || { title: sprintData.subject, limitText: `${timeLimit}s`, color: 'bg-slate-800 text-slate-300' };

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col min-h-[calc(100vh-5rem)]">
        
        {/* Top Sprint Control Bar (Identical layout container as standard TestRunner) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            
            {/* Question Counter & Subject Pill */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm sm:text-base font-bold text-slate-200">
                Question <span className="text-amber-400 text-lg font-black">{currentIndex + 1}</span> of {totalQ}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${subjectBadge.color}`}>
                {subjectBadge.title} • {subjectBadge.limitText}
              </span>
            </div>

            {/* ULTRA FAST COUNTDOWN TIMER */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2.5 px-4 py-1.5 rounded-xl font-mono text-lg sm:text-xl font-black border transition-all ${
                isUrgent
                  ? 'bg-rose-950/60 text-rose-300 border-rose-500 animate-pulse shadow-lg shadow-rose-900/50'
                  : 'bg-slate-950 text-amber-400 border-amber-500/40 shadow-inner'
              }`}>
                <Clock className={`w-5 h-5 ${isUrgent ? 'animate-spin text-rose-400' : 'text-amber-400'}`} />
                <span>{timeRemaining.toFixed(1)}s</span>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Quit this speed sprint? Current progress will not be recorded.')) {
                    setStage('select');
                  }
                }}
                className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-900 transition-colors cursor-pointer"
              >
                Quit Sprint
              </button>
            </div>

          </div>

          {/* Real-time shrinking countdown meter bar */}
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden mt-4 border border-slate-800">
            <div 
              className={`h-full rounded-full transition-all duration-75 ease-linear ${
                isUrgent ? 'bg-rose-500 shadow-md shadow-rose-500/50' : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}
              style={{ width: `${timeFraction * 100}%` }}
            />
          </div>
        </div>

        {/* Main Question Card (Identical structure to TestRunner) */}
        <div className="flex-1 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Question Text */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug whitespace-pre-line">
                  {currentQ.question}
                </h2>
              </div>
            </div>

            {/* SVG Visual Content (If Spatial or Series) */}
            <SVGQuestionRenderer question={currentQ} />

            {/* Multiple Choice Options (A through E) */}
            <div className="space-y-3 sm:space-y-3.5 my-6">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950/90'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-1">
                      <span className={`w-8 h-8 rounded-xl font-mono text-sm font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700'
                      }`}>
                        {opt.id}
                      </span>

                      {/* If option is an SVG figure */}
                      {opt.svg ? (
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-16 h-16 p-1 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow"
                            dangerouslySetInnerHTML={{ __html: opt.svg }}
                          />
                          {opt.text && <span className="text-sm font-medium text-slate-400">{opt.text}</span>}
                        </div>
                      ) : (
                        <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                      )}
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation & Actions: DONE BUTTON AT EXACT SAME PLACE AS NORMAL TEST RUNNER */}
          <div className="pt-6 border-t border-slate-800/80 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Speed Rule: Select option and click <strong>Done</strong> before 0.0s.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* DONE BUTTON IN EXACT POSITION AS TESTRUNNER NEXT BUTTON */}
              <button
                onClick={handleDone}
                disabled={!selectedOption}
                className={`flex-1 sm:flex-initial px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg ${
                  selectedOption
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/30 cursor-pointer scale-[1.02] ring-2 ring-amber-400/50 animate-pulse'
                    : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                }`}
              >
                <span>Done</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: STAGE REVIEW (Sprint Breakdown, Filter What We Did Wrong)
  // -------------------------------------------------------------
  if (stage === 'review' && activeSprintReview) {
    const currentSprint = activeSprintReview;
    const totalQ = currentSprint.totalQuestions || currentSprint.responses.length;
    const correctCount = currentSprint.score;
    const timedOutCount = currentSprint.timedOutCount || currentSprint.responses.filter(r => r.timedOut).length;
    const wrongCount = currentSprint.wrongCount ?? (totalQ - correctCount - timedOutCount);
    const mistakesCount = wrongCount + timedOutCount;
    const accuracy = currentSprint.accuracy;
    const avgTime = currentSprint.avgTimeSpentSec;

    // Filter responses according to the user's selected tab
    const filteredResponses = currentSprint.responses.filter(r => {
      if (reviewFilter === 'mistakes') return !r.isCorrect;
      if (reviewFilter === 'timedOut') return r.timedOut;
      if (reviewFilter === 'wrong') return !r.isCorrect && !r.timedOut;
      if (reviewFilter === 'correct') return r.isCorrect;
      return true; // 'all'
    });

    let badge = { text: 'Lightning Reflexes!', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (accuracy === 100) badge = { text: '⚡ Flawless Speed Master', color: 'text-amber-400 bg-amber-500/15 border-amber-500/40' };
    else if (accuracy >= 75) badge = { text: '🚀 Elite Speed Velocity', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    else if (accuracy >= 50) badge = { text: '🎯 Solid Cognitive Pace', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' };
    else badge = { text: '⏱️ Practice Speed Cadence', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Sprint Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badge.color}`}>
                  {badge.text}
                </span>
                <span className="text-xs text-slate-500">
                  {formatSprintDate(currentSprint.timestamp)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ultra Fast Sprint Breakdown
              </h1>
              <p className="text-sm text-slate-400">
                Subject: <strong className="text-slate-200 capitalize">{currentSprint.subjectTitle || currentSprint.subject}</strong> • Variations from <strong className="text-amber-300">{practicedTestsListStr}</strong>
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="flex items-center gap-4 bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800 shrink-0">
              <Trophy className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{correctCount}</span>
                  <span className="text-sm font-bold text-slate-400">/ {totalQ}</span>
                </div>
                <span className={`text-xs font-bold ${accuracy >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {accuracy}% Accuracy
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">Avg Reaction</span>
              <span className="text-lg font-black text-sky-400 font-mono">{avgTime}s</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">Correct</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{correctCount}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">Wrong Choices</span>
              <span className={`text-lg font-black font-mono ${wrongCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                {wrongCount}
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">Timed Out (Unconfirmed)</span>
              <span className={`text-lg font-black font-mono ${timedOutCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                {timedOutCount}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => startSprint(currentSprint.subject)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sprint Again (New Variations)</span>
            </button>

            <button
              onClick={() => {
                setSubTab('history');
                setStage('select');
              }}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
            >
              <History className="w-4 h-4" />
              <span>Sprint History</span>
            </button>

            <button
              onClick={() => {
                setSubTab('launch');
                setStage('select');
              }}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-800"
            >
              <span>Switch Subject</span>
            </button>

            <button
              onClick={onBackToDashboard}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-xl text-slate-500 hover:text-slate-300 text-sm font-medium ml-auto"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* REVIEW FILTERS BAR ("What we did wrong and other things") */}
        {/* --------------------------------------------------------- */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Review Questions & Fast Solutions</span>
            </h2>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* All */}
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  reviewFilter === 'all'
                    ? 'bg-slate-200 text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All ({totalQ})
              </button>

              {/* What We Did Wrong (Primary filter requested by user) */}
              <button
                onClick={() => setReviewFilter('mistakes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  reviewFilter === 'mistakes'
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 ring-2 ring-rose-400/50'
                    : mistakesCount > 0
                    ? 'bg-rose-950/40 text-rose-300 border border-rose-500/40 hover:bg-rose-950/70'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>What We Did Wrong ({mistakesCount})</span>
              </button>

              {/* Timed Out Only */}
              {timedOutCount > 0 && (
                <button
                  onClick={() => setReviewFilter('timedOut')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    reviewFilter === 'timedOut'
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-900 text-amber-400/80 border border-slate-800 hover:text-amber-300'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Timed Out ({timedOutCount})</span>
                </button>
              )}

              {/* Wrong Answers Only */}
              {wrongCount > 0 && (
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    reviewFilter === 'wrong'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  <XCircle className="w-3 h-3" />
                  <span>Wrong Choice ({wrongCount})</span>
                </button>
              )}

              {/* Correct Only */}
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  reviewFilter === 'correct'
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Correct ({correctCount})</span>
              </button>
            </div>
          </div>

          {/* If filtering by mistakes and there are 0 mistakes */}
          {reviewFilter === 'mistakes' && mistakesCount === 0 && (
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Zero Mistakes in This Sprint!</h3>
              <p className="text-xs text-slate-400">
                You answered every single question correctly and confirmed with "Done" before the timer ran out. Flawless execution!
              </p>
              <button
                onClick={() => setReviewFilter('all')}
                className="mt-2 text-xs text-emerald-400 hover:underline cursor-pointer"
              >
                View all questions →
              </button>
            </div>
          )}

          {/* Question List Cards */}
          <div className="space-y-4">
            {filteredResponses.map((item) => {
              // Find original index
              const originalIndex = currentSprint.responses.findIndex(r => r.questionId === item.questionId);
              const qNumber = originalIndex !== -1 ? originalIndex + 1 : 1;

              return (
                <div 
                  key={item.questionId || qNumber} 
                  className={`p-5 rounded-2xl border transition-all ${
                    item.isCorrect 
                      ? 'bg-slate-900/90 border-emerald-500/30' 
                      : item.timedOut
                      ? 'bg-slate-900/90 border-rose-500/40 ring-1 ring-rose-500/20'
                      : 'bg-slate-900/90 border-rose-500/40 ring-1 ring-rose-500/20'
                  }`}
                >
                  {/* Top Bar for question */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        Q{qNumber}
                      </span>

                      {item.isCorrect ? (
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Correct
                        </span>
                      ) : item.timedOut ? (
                        <span className="text-xs font-bold text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded border border-rose-500/40 flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3" /> Timed Out (Clock Expired Before "Done")
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded border border-rose-500/40 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Wrong Choice
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-slate-400">
                      Reaction: <strong className="text-slate-200">{item.timeSpentSec}s</strong> / {item.timeLimitSec}s limit
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <p className="text-sm font-semibold text-slate-200 mb-3 whitespace-pre-line">
                    {item.question}
                  </p>

                  {/* SVG Visual (if any) */}
                  <SVGQuestionRenderer question={item} />

                  {/* Multiple Choice Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs">
                    {item.options.map(opt => {
                      const isChosen = item.selectedOption === opt.id;
                      const isCorrectOpt = item.correctOption === opt.id;
                      return (
                        <div 
                          key={opt.id}
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                            isCorrectOpt 
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold'
                              : isChosen
                              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 line-through'
                              : 'bg-slate-950/40 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-mono font-bold">{opt.id}:</span>
                          {opt.svg ? (
                            <div 
                              className="w-10 h-10 p-0.5 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0"
                              dangerouslySetInnerHTML={{ __html: opt.svg }}
                            />
                          ) : (
                            <span>{opt.text}</span>
                          )}
                          {isCorrectOpt && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto shrink-0" />}
                          {isChosen && !isCorrectOpt && <XCircle className="w-3.5 h-3.5 text-rose-400 ml-auto shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Timed-out notice if applicable */}
                  {item.timedOut && (
                    <div className="my-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Speed Penalty:</strong> You ran out of time before clicking <strong>Done</strong>. In the CCAT Ultra Fast protocol, unconfirmed answers receive no credit to teach definitive mental decision-making.
                      </span>
                    </div>
                  )}

                  {/* Step-by-step Fast Solution & Gemini Speed Shortcut */}
                  <div className="mt-3.5 space-y-2.5">
                    {/* ⚡ Gemini 15-Sec Speed Shortcut */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-indigo-950/40 border border-amber-500/40 shadow-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs">
                          <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>⚡ Gemini 15-Sec Mental Shortcut & Elimination Trick</span>
                        </div>
                        {sprintSpeedTricks[item.id] && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            AI Accelerated
                          </span>
                        )}
                      </div>

                      {sprintSpeedTricks[item.id] ? (
                        <div className="text-slate-200 leading-relaxed text-xs">
                          <MarkdownView content={sprintSpeedTricks[item.id]} />
                        </div>
                      ) : loadingTricks[item.id] ? (
                        <div className="flex items-center gap-2 text-xs text-amber-300/90 py-1">
                          <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          <span>Generating 15-second shortcut via Gemini...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 pt-0.5">
                          <span className="text-[11px] text-slate-400">Want the elite rapid-fire shortcut for this question?</span>
                          <button
                            onClick={() => handleFetchSprintTrick(item)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all shadow-sm shrink-0"
                          >
                            <Zap className="w-3 h-3 fill-amber-400" />
                            <span>Generate Trick</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Standard Solution */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-sky-400 mb-1.5">
                        <Zap className="w-3.5 h-3.5 fill-sky-400" />
                        <span>Speed Insight & Solution Breakdown:</span>
                      </div>
                      <MarkdownView content={item.explanation} />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  return null;
}
