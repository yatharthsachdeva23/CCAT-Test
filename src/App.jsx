import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import TestRunner from './components/TestRunner.jsx';
import ScoreReview from './components/ScoreReview.jsx';
import AICoach from './components/AICoach.jsx';
import { buildTest } from './data/testCatalog.js';
import { getAttempts, saveAttempt, clearAllAttempts } from './utils/storage.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'tests', 'coach', 'runner', 'review'
  const [attempts, setAttempts] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [activeReviewAttempt, setActiveReviewAttempt] = useState(null);

  // Load saved attempts on mount
  useEffect(() => {
    const saved = getAttempts();
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
          />
        )}

        {activeTab === 'tests' && (
          <Dashboard
            attempts={attempts}
            onStartTest={handleStartTest}
            onReviewAttempt={handleReviewAttempt}
            onOpenCoach={() => setActiveTab('coach')}
            onClearHistory={handleClearHistory}
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
  );
}
