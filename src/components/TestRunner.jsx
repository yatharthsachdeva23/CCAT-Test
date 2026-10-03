import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertTriangle, ArrowRight, SkipForward, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import SVGQuestionRenderer from './SVGQuestionRenderer.jsx';
import { saveActiveSession, getActiveSession, clearActiveSession } from '../utils/storage.js';
import { startPreloadingSpeedTricks } from '../services/aiSpeedTricks.js';

export default function TestRunner({ testData, onCompleteTest, onExitTest }) {
  const questions = testData.questions;
  const timeLimit = testData.timeLimitSec || 900; // 15 mins (900s)

  // Check if there is an active session in progress for this test
  const existingSession = getActiveSession();
  const isResuming = existingSession && existingSession.testId === testData.id;

  const initialIndex = isResuming ? Math.min(questions.length - 1, existingSession.currentIndex || 0) : 0;
  const initialResponses = isResuming && existingSession.responses ? existingSession.responses : {};
  const initialStartTime = isResuming && existingSession.startTime ? existingSession.startTime : Date.now();

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - initialStartTime) / 1000);
    return Math.max(0, timeLimit - elapsed);
  });
  const [responses, setResponses] = useState(initialResponses);
  const [isFinishing, setIsFinishing] = useState(false);

  // High precision per-question timing & attempt timing refs
  const testStartTimeRef = useRef(initialStartTime);
  const questionStartTimeRef = useRef(performance.now());
  const timerIntervalRef = useRef(null);
  const isFinishingRef = useRef(false);
  const responsesRef = useRef(initialResponses);
  const currentIndexRef = useRef(initialIndex);
  const selectedOptionRef = useRef(null);
  const finishTestRef = useRef(null);

  // Keep all refs in sync with live render state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  useEffect(() => {
    responsesRef.current = responses;
  }, [responses]);

  // Pre-load 15-second speed shortcuts in background as soon as test begins
  useEffect(() => {
    if (testData?.id && testData?.questions?.length > 0) {
      startPreloadingSpeedTricks(testData.id, testData.questions);
    }
  }, [testData?.id]);

  const currentQ = questions[currentIndex];

  const recordCurrentResponse = (chosenOption, isSkipped = false) => {
    const activeIdx = currentIndexRef.current;
    const activeQ = questions[activeIdx] || currentQ;
    const elapsedMs = performance.now() - questionStartTimeRef.current;
    const timeSpentSec = Math.max(0.5, Math.round(elapsedMs / 100) / 10);

    const isCorrect = !isSkipped && chosenOption === activeQ.correctOption;

    return {
      questionId: activeQ.id,
      category: activeQ.category,
      subType: activeQ.subType,
      selectedOption: chosenOption || null,
      correctOption: activeQ.correctOption,
      isCorrect,
      isSkipped,
      timeSpentSec,
      questionText: activeQ.question,
      explanation: activeQ.explanation
    };
  };

  const handleNext = () => {
    if (!selectedOption) return; // Prevent advancing without choice if Next is pressed

    const response = recordCurrentResponse(selectedOption, false);
    const updatedResponses = { ...responsesRef.current, [response.questionId]: response };
    responsesRef.current = updatedResponses;
    setResponses(updatedResponses);

    const nextIndex = currentIndex + 1;

    // Incremental Auto-Save to localStorage after every single question
    saveActiveSession({
      testId: testData.id,
      testTitle: testData.title,
      currentIndex: nextIndex,
      responses: updatedResponses,
      startTime: testStartTimeRef.current,
      timeLimitSec: timeLimit
    });

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      finishTest(false, false);
    }
  };

  const handleSkip = () => {
    const response = recordCurrentResponse(null, true);
    const updatedResponses = { ...responsesRef.current, [response.questionId]: response };
    responsesRef.current = updatedResponses;
    setResponses(updatedResponses);

    const nextIndex = currentIndex + 1;

    // Incremental Auto-Save to localStorage after every single question
    saveActiveSession({
      testId: testData.id,
      testTitle: testData.title,
      currentIndex: nextIndex,
      responses: updatedResponses,
      startTime: testStartTimeRef.current,
      timeLimitSec: timeLimit
    });

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      finishTest(false, false);
    }
  };

  const finishTest = (timeRanOut = false, endEarly = false) => {
    if (isFinishingRef.current) return;
    isFinishingRef.current = true;
    setIsFinishing(true);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const elapsedRealSec = Math.min(
      timeLimit,
      Math.max(1, Math.round((Date.now() - testStartTimeRef.current) / 1000))
    );
    const totalSecondsUsed = timeRanOut ? timeLimit : elapsedRealSec;

    // Start with all recorded responses from ref and localStorage backup
    let completeResponses = { ...responsesRef.current };
    const savedSession = getActiveSession();
    if (savedSession && savedSession.testId === testData.id && savedSession.responses) {
      completeResponses = { ...savedSession.responses, ...completeResponses };
    }

    const activeIdx = currentIndexRef.current;
    const activeQ = questions[activeIdx] || questions[0];
    const activeSelected = selectedOptionRef.current;

    // Record the active question if not yet committed
    if (activeQ && !completeResponses[activeQ.id]) {
      const activeElapsedMs = performance.now() - questionStartTimeRef.current;
      const activeTimeSec = Math.max(0.5, Math.round(activeElapsedMs / 100) / 10);
      const isSelected = activeSelected !== null;
      const isCorrect = isSelected && activeSelected === activeQ.correctOption;

      completeResponses[activeQ.id] = {
        questionId: activeQ.id,
        category: activeQ.category,
        subType: activeQ.subType,
        selectedOption: activeSelected || null,
        correctOption: activeQ.correctOption,
        isCorrect,
        isSkipped: !isSelected,
        timeSpentSec: activeTimeSec,
        questionText: activeQ.question,
        explanation: activeQ.explanation
      };
    }

    // Backfill any remaining unreached questions so all 50 questions exist for score review
    questions.forEach(q => {
      if (!completeResponses[q.id]) {
        completeResponses[q.id] = {
          questionId: q.id,
          category: q.category,
          subType: q.subType,
          selectedOption: null,
          correctOption: q.correctOption,
          isCorrect: false,
          isSkipped: true,
          timeSpentSec: 0,
          questionText: q.question,
          explanation: q.explanation
        };
      }
    });

    // Clear active session from localStorage now that test is finished
    clearActiveSession();

    // Fire celebration confetti if candidate attempted questions
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const attemptResult = {
      id: `attempt_${Date.now()}`,
      testId: testData.id,
      testTitle: testData.title,
      timestamp: new Date().toISOString(),
      totalQuestions: questions.length,
      timeLimitSec: timeLimit,
      totalSecondsUsed,
      timeRanOut,
      endedEarly: endEarly || (!timeRanOut && activeIdx + 1 < questions.length),
      responses: completeResponses,
      questions: questions
    };

    onCompleteTest(attemptResult);
  };

  // Always keep finishTestRef pointing to the latest finishTest function
  finishTestRef.current = finishTest;

  // Wall-Clock Accurate 15-Minute Countdown Timer
  useEffect(() => {
    isFinishingRef.current = false;

    // Immediately save initial active session
    saveActiveSession({
      testId: testData.id,
      testTitle: testData.title,
      currentIndex: initialIndex,
      responses: responsesRef.current,
      startTime: testStartTimeRef.current,
      timeLimitSec: timeLimit
    });

    timerIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - testStartTimeRef.current) / 1000);
      const remaining = Math.max(0, timeLimit - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0 && !isFinishingRef.current) {
        clearInterval(timerIntervalRef.current);
        if (finishTestRef.current) {
          finishTestRef.current(true, false);
        }
      }
    }, 500);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [testData.id, timeLimit]);

  // Reset question timer on current index change
  useEffect(() => {
    questionStartTimeRef.current = performance.now();
    setSelectedOption(null);
  }, [currentIndex]);

  // Timer formatting
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Timer status styling
  const isUrgent = timeLeft <= 60; // < 1 min
  const isWarning = timeLeft <= 180 && !isUrgent; // < 3 mins

  // Category badge colors
  const categoryLabels = {
    math: { label: 'Math & Logic', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    verbal: { label: 'Verbal Reasoning', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
    spatial: { label: 'Spatial Reasoning', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }
  };
  const catInfo = categoryLabels[currentQ.category] || { label: currentQ.category, color: 'bg-slate-800 text-slate-300' };

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col min-h-[calc(100vh-5rem)]">
      
      {/* Top Test Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          
          {/* Question Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm sm:text-base font-bold text-slate-200">
              Question <span className="text-sky-400 text-lg font-black">{currentIndex + 1}</span> of {questions.length}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${catInfo.color}`}>
              {catInfo.label}
            </span>
          </div>

          {/* 15:00 Countdown Timer */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl font-mono text-base sm:text-lg font-bold border transition-all ${
              isUrgent
                ? 'bg-rose-950/50 text-rose-400 border-rose-500 animate-pulse shadow-lg shadow-rose-900/50'
                : isWarning
                ? 'bg-amber-950/40 text-amber-300 border-amber-500/50'
                : 'bg-slate-950 text-sky-400 border-slate-700'
            }`}>
              <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${isUrgent ? 'animate-spin' : ''}`} />
              <span>{formattedTime}</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to end this CCAT attempt early? Your progress will be saved.')) {
                  finishTest(false, true);
                }
              }}
              className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-900 transition-colors cursor-pointer"
            >
              End Test
            </button>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-4 border border-slate-800">
          <div 
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="flex-1 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Question Text */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug whitespace-pre-line">
                {currentQ.question}
              </h2>
            </div>
            {currentQ.context && (
              <p className="text-sm text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {currentQ.context}
              </p>
            )}
          </div>

          {/* SVG Visual Content (If Spatial or Data Chart) */}
          <SVGQuestionRenderer question={currentQ} />

          {/* Multiple Choice Options (4 or 5 choices) */}
          <div className="space-y-3 sm:space-y-3.5 my-6">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-400 text-sky-200 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950/90'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <span className={`w-8 h-8 rounded-xl font-mono text-sm font-bold flex items-center justify-center shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-sky-500 text-white shadow-md' 
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
                    isSelected ? 'border-sky-400 bg-sky-400 text-slate-950' : 'border-slate-700'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation & Actions (Strict Forward Only) */}
        <div className="pt-6 border-t border-slate-800/80 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>CCAT Rule: <strong>No back navigation</strong>. Once submitted, questions cannot be re-visited.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Skip Question Button */}
            <button
              onClick={handleSkip}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              title="Skip this question and move to the next (0 points, saves time)"
            >
              <SkipForward className="w-4 h-4 text-slate-400" />
              <span>Skip & Next</span>
            </button>

            {/* Next Question Button */}
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                selectedOption
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/25 cursor-pointer scale-[1.02]'
                  : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex + 1 === questions.length ? 'Submit Final Question' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
