import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Clock, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  RotateCcw, Sparkles, Trophy, ChevronRight, Play, ArrowLeft, ShieldCheck, Flame 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SVGQuestionRenderer from './SVGQuestionRenderer.jsx';
import { generateUltraFastSprint } from '../data/ultraFastGenerator.js';

export default function UltraFastMode({ attempts = [], onBackToDashboard }) {
  // Stages: 'select' | 'running' | 'result'
  const [stage, setStage] = useState('select');
  const [selectedSubject, setSelectedSubject] = useState('verbal'); // 'verbal' | 'math' | 'spatial'
  const [sprintData, setSprintData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // High-precision per-question timer
  // Time remaining in tenths of a second (e.g. 7.0s)
  const [timeRemaining, setTimeRemaining] = useState(7);
  const [sprintResponses, setSprintResponses] = useState([]);
  
  // Refs for timer and state synchronization
  const questionStartTimeRef = useRef(performance.now());
  const timerRafRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const selectedOptionRef = useRef(null);
  const currentIndexRef = useRef(0);
  const sprintDataRef = useRef(null);
  const sprintResponsesRef = useRef([]);

  // Extract list of attempted test IDs so we only generate variations of practiced concepts
  const attemptedTestIds = attempts.length > 0 
    ? Array.from(new Set(attempts.map(a => a.testId)))
    : ['test-1'];

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
  const handleTimeout = () => {
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
  };

  // When user clicks the "Done" button before timer expires
  const handleDone = () => {
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
  };

  const finishSprint = (responses) => {
    const correctCount = responses.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / responses.length) * 100);
    if (accuracy >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
    setStage('result');
  };

  // -------------------------------------------------------------
  // RENDER: STAGE SELECT (Subject-wise Choice)
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
              Train your cognitive reflexes to instinctive levels. Each sprint runs for approximately <strong>1 minute</strong> in your chosen subject with strict per-question countdowns.
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
                  <span className="text-slate-400">Derived only from tests you practiced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    const progressPercent = Math.round(((currentIndex + 1) / totalQ) * 100);

    // Urgent state when under 30% of question time left
    const isUrgent = timeRemaining <= (timeLimit <= 7 ? 2.5 : 3.5);

    const subjectBadge = {
      verbal: { title: 'English / Verbal', limitText: '7s Limit', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
      math: { title: 'Math & Logic', limitText: '15s Limit', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
      spatial: { title: 'Spatial Reasoning', limitText: '10s Limit', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' }
    }[sprintData.subject] || { title: sprintData.subject, limitText: `${timeLimit}s`, color: 'bg-slate-800 text-slate-300' };

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col min-h-[calc(100vh-5rem)]">
        
        {/* Top Sprint Control Bar (Identical container layout as standard TestRunner) */}
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
                  if (window.confirm('Quit this speed sprint?')) {
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
  // RENDER: STAGE RESULT (Sprint Breakdown & Review)
  // -------------------------------------------------------------
  if (stage === 'result' && sprintResponses.length > 0) {
    const totalQ = sprintResponses.length;
    const correctCount = sprintResponses.filter(r => r.isCorrect).length;
    const timedOutCount = sprintResponses.filter(r => r.timedOut).length;
    const accuracy = Math.round((correctCount / totalQ) * 100);
    const avgTime = Math.round((sprintResponses.reduce((sum, r) => sum + r.timeSpentSec, 0) / totalQ) * 10) / 10;

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
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border inline-block mb-2 ${badge.color}`}>
                {badge.text}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ultra Fast Sprint Completed
              </h1>
              <p className="text-sm text-slate-400">
                Subject: <strong className="text-slate-200 capitalize">{sprintData?.subject} Reasoning</strong> • Concept Variations
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
                <span className="text-xs font-bold text-emerald-400">{accuracy}% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">Avg Reaction</span>
              <span className="text-lg font-black text-sky-400 font-mono">{avgTime}s</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">Answered in Time</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{totalQ - timedOutCount}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">Timed Out</span>
              <span className={`text-lg font-black font-mono ${timedOutCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                {timedOutCount}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => startSprint(sprintData.subject)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sprint Again (New Variations)</span>
            </button>

            <button
              onClick={() => setStage('select')}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
            >
              <span>Switch Subject</span>
            </button>

            <button
              onClick={onBackToDashboard}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-800"
            >
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Question-by-Question Review */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sprint Question Breakdown & Solutions</span>
          </h2>

          <div className="space-y-4">
            {sprintResponses.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border transition-all ${
                  item.isCorrect 
                    ? 'bg-slate-900/90 border-emerald-500/30' 
                    : item.timedOut
                    ? 'bg-slate-900/90 border-rose-500/40'
                    : 'bg-slate-900/90 border-rose-500/30'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      Q{idx + 1}
                    </span>
                    {item.isCorrect ? (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Correct
                      </span>
                    ) : item.timedOut ? (
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Timed Out (Not Confirmed)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Wrong
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {item.timeSpentSec}s / {item.timeLimitSec}s
                  </span>
                </div>

                {/* Question Prompt */}
                <p className="text-sm font-semibold text-slate-200 mb-3 whitespace-pre-line">
                  {item.question}
                </p>

                {/* SVG Visual (if any) */}
                <SVGQuestionRenderer question={item} />

                {/* Choices summary */}
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

                {/* Step-by-step Shortcut Explanation */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-sky-400 block">⚡ Speed Insight:</span>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {item.explanation}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  return null;
}
