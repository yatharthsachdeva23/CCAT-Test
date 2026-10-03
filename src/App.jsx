import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import TestRunner from './components/TestRunner.jsx';
import ScoreReview from './components/ScoreReview.jsx';
import AICoach from './components/AICoach.jsx';
import UltraFastMode from './components/UltraFastMode.jsx';
import { buildTest } from './data/testCatalog.js';
import { getAttempts, saveAttempt, clearAllAttempts, getActiveSession, clearActiveSession } from './utils/storage.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg space-y-4 shadow-2xl">
            <h2 className="text-2xl font-black text-amber-400">Application Notice</h2>
            <p className="text-sm text-slate-300">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-sm cursor-pointer shadow-lg"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'tests', 'coach', 'runner', 'review'
  const [attempts, setAttempts] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [activeReviewAttempt, setActiveReviewAttempt] = useState(null);

  // Load saved attempts and auto-recover or resume any in-progress session
  useEffect(() => {
    let saved = getAttempts();

    const activeSession = getActiveSession();
    if (activeSession && activeSession.testId) {
      const elapsed = Math.floor((Date.now() - (activeSession.startTime || Date.now())) / 1000);
      const timeLimit = activeSession.timeLimitSec || 900;
      const match = activeSession.testId.match(/test-(\d+)/);
      const testNum = match ? parseInt(match[1], 10) : 1;
      const testData = buildTest(testNum);

      if (elapsed < timeLimit) {
        // Test still within 15 min window: restore session seamlessly!
        setAttempts(saved);
        setActiveTest(testData);
        setActiveTab('runner');
        return;
      } else {
        // Clock expired while away: save all answered questions into historical attempts
        let completeResponses = { ...(activeSession.responses || {}) };
        testData.questions.forEach(q => {
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

        const recoveredAttempt = {
          id: `attempt_${activeSession.startTime || Date.now()}`,
          testId: testData.id,
          testTitle: testData.title,
          timestamp: new Date(activeSession.startTime || Date.now()).toISOString(),
          totalQuestions: testData.questions.length,
          timeLimitSec: timeLimit,
          totalSecondsUsed: timeLimit,
          timeRanOut: true,
          endedEarly: false,
          responses: completeResponses,
          questions: testData.questions
        };

        saved = saveAttempt(recoveredAttempt);
        clearActiveSession();
      }
    }

    setAttempts(saved);
  }, []);

  const handleStartTest = (testNumber = 1) => {
    const testData = buildTest(testNumber);
    setActiveTest(testData);
    setActiveTab('runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteTest = (attemptResult) => {
    const updated = saveAttempt(attemptResult);
    setAttempts(updated);
    setActiveReviewAttempt(attemptResult);
    setActiveTest(null);
    setActiveTab('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewAttempt = (attempt) => {
    setActiveReviewAttempt(attempt);
    setActiveTab('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeTest = (testId) => {
    const match = testId.match(/test-(\d+)/);
    const testNum = match ? parseInt(match[1], 10) : 1;
    handleStartTest(testNum);
  };

  const handleAskCoach = (attempt) => {
    setActiveReviewAttempt(attempt);
    setActiveTab('coach');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    clearAllAttempts();
    setAttempts([]);
    setActiveReviewAttempt(null);
  };

  // Calculate best overall score for Navbar
  const bestScore = attempts.reduce((max, a) => {
    const score = Object.values(a.responses || {}).filter(r => r.isCorrect).length;
    return Math.max(max, score);
  }, 0);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation Bar (Hidden during active test for full focus) */}
      {activeTab !== 'runner' && (
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          attemptsCount={attempts.length}
          bestScore={bestScore}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <Dashboard
            attempts={attempts}
            onStartTest={handleStartTest}
            onReviewAttempt={handleReviewAttempt}
            onOpenCoach={() => setActiveTab('coach')}
            onClearHistory={handleClearHistory}
            onOpenUltraFast={() => setActiveTab('ultrafast')}
          />
        )}

        {activeTab === 'tests' && (
          <Dashboard
            attempts={attempts}
            onStartTest={handleStartTest}
            onReviewAttempt={handleReviewAttempt}
            onOpenCoach={() => setActiveTab('coach')}
            onClearHistory={handleClearHistory}
            onOpenUltraFast={() => setActiveTab('ultrafast')}
          />
        )}

        {activeTab === 'ultrafast' && (
          <UltraFastMode
            attempts={attempts}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'runner' && activeTest && (
          <TestRunner
            testData={activeTest}
            onCompleteTest={handleCompleteTest}
            onExitTest={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'review' && activeReviewAttempt && (
          <ScoreReview
            attempt={activeReviewAttempt}
            onBackToDashboard={() => setActiveTab('dashboard')}
            onRetakeTest={handleRetakeTest}
            onAskCoach={handleAskCoach}
          />
        )}

        {activeTab === 'coach' && (
          <AICoach
            attempts={attempts}
            activeAttempt={activeReviewAttempt}
            onSelectAttempt={handleReviewAttempt}
          />
        )}
      </main>

      {/* Footer (Hidden during active test) */}
      {activeTab !== 'runner' && (
        <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
          <p>Criteria Cognitive Aptitude Test (CCAT) Preparation Simulator • Strict Forward-Only • Pure Vector SVGs</p>
        </footer>
      )}

      </div>
    </ErrorBoundary>
  );
}
