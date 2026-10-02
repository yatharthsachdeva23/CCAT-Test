import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, AlertTriangle, Zap, Clock, Trophy, HelpCircle, Key, Check, Target, RefreshCw } from 'lucide-react';
import { analyzeAttemptPatterns } from '../data/patternEngine.js';
import { getSettings, saveSettings, DEFAULT_GEMINI_KEY } from '../utils/storage.js';

export default function AICoach({ attempts = [], activeAttempt = null, onSelectAttempt }) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [selectedAttemptId, setSelectedAttemptId] = useState(activeAttempt ? activeAttempt.id : (attempts[0]?.id || 'latest'));
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keySaved, setKeySaved] = useState(false);
  const [activeModelName, setActiveModelName] = useState('Gemini 2.5 / 3.8 Flash');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const s = getSettings();
    const effectiveKey = (s.geminiApiKey && s.geminiApiKey.trim().length > 10) ? s.geminiApiKey.trim() : DEFAULT_GEMINI_KEY;
    setApiKey(effectiveKey);

    const initialText = `### 🧠 Real Google Gemini CCAT Coach (Connected)
**Target: 45+ / 50 (Top 0.1% Elite Bracket)**

I am connected directly to **Google Gemini** with live access to your second-by-second question telemetry.

Click any question below or type your own question to get real-time, personalized AI coaching:
* *"Where are my exact time traps?"*
* *"How do I increase my speed to reach 45+?"*
* *"Analyze my latest test second-by-second."*`;

    setMessages([
      {
        id: 'msg-init',
        sender: 'ai',
        text: initialText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [attempts]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const targetAttempt = attempts.find(a => a.id === selectedAttemptId) || attempts[0] || null;

  const handleSend = async (queryText = inputQuery) => {
    const query = queryText.trim();
    if (!query) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    const effectiveKey = (apiKey && apiKey.trim().length > 10) ? apiKey.trim() : DEFAULT_GEMINI_KEY;

    // Call Real Google Gemini AI with full context (NO hardcoded fallbacks!)
    try {
      const response = await callGeminiWithTelemetry(query, targetAttempt, attempts, effectiveKey, messages);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Gemini API call failed:', err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `⚠️ **Google Gemini Connection Error:**\n\n${err.message || 'Unable to connect to Google Gemini API.'}\n\nPlease check your internet connection or verify your API key in the top right.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleSaveKey = () => {
    const s = getSettings();
    saveSettings({ ...s, geminiApiKey: apiKey.trim() });
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const quickPrompts = [
    { label: '🎯 Roadmap to 45+ Score', prompt: 'Give me a concrete, ruthless roadmap to jump from my current score to 45+ on the CCAT.' },
    { label: '⚠️ Find My Exact Time Traps', prompt: 'Identify every question where I spent over 25 seconds and got it wrong. How much time did I waste?' },
    { label: '⏱️ Category Velocity Imbalance', prompt: 'Analyze my speed across Math, Verbal, and Spatial. Which category is eating my clock?' },
    { label: '🧠 Instant Elimination Tactics', prompt: 'Teach me the fastest 5-second elimination rules for CCAT spatial matrices and odd-one-out questions.' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Coach Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-sky-400 p-[2px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 flex-wrap">
              <span>CCAT AI Cognitive Coach</span>
              <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Target className="w-3 h-3 text-emerald-400" />
                Target: 45+ Elite
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Real Gemini AI
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Live Google Gemini LLM with full context of every question, second-by-second telemetry, and attempts.
            </p>
          </div>
        </div>

        {/* Attempt Selector & API Key config */}
        <div className="flex items-center gap-2 flex-wrap">
          {attempts.length > 0 && (
            <select
              value={selectedAttemptId}
              onChange={(e) => setSelectedAttemptId(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-purple-500"
            >
              {attempts.map((att, i) => {
                const corr = Object.values(att.responses || {}).filter(r => r.isCorrect).length;
                return (
                  <option key={att.id} value={att.id}>
                    Attempt #{attempts.length - i}: {corr}/50 ({new Date(att.timestamp).toLocaleDateString()})
                  </option>
                );
              })}
            </select>
          )}

          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-purple-400" />
            <span>API Key</span>
          </button>
        </div>
      </div>

      {/* Gemini API Key Drawer */}
      {showKeyInput && (
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-4 mb-4 shadow-xl flex items-center justify-between gap-4 flex-wrap animate-fadeIn">
          <div className="flex-1 min-w-[240px]">
            <p className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Gemini API Key Configured</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Your key is saved in localStorage and used directly for real Gemini model requests.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="password"
              placeholder="Paste Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 w-full sm:w-72 font-mono focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={handleSaveKey}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              {keySaved ? <Check className="w-3.5 h-3.5" /> : 'Save Key'}
            </button>
          </div>
        </div>
      )}

      {/* Messages Chat Area */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center shadow-md ${
                isAi 
                  ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}>
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                isAi
                  ? 'bg-slate-950/90 border-slate-800 text-slate-200 shadow-md'
                  : 'bg-sky-600 text-white border-sky-500 shadow-lg shadow-sky-600/20'
              }`}>
                <div className="prose prose-invert prose-xs max-w-none space-y-2">
                  <div className="whitespace-pre-line">{m.text}</div>
                </div>
                <div className={`text-[10px] mt-2 font-mono ${isAi ? 'text-slate-500' : 'text-sky-200 text-right'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 max-w-xl mr-auto items-center">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-medium text-slate-300">Google Gemini is thinking in real time...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts for 45+ target */}
      <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp.prompt)}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-purple-500/50 text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-sm"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 shadow-xl">
        <input
          type="text"
          placeholder="Ask Gemini Coach how to reach 45+, analyze time traps, or review questions..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isTyping}
          className={`p-2.5 rounded-xl font-bold transition-all ${
            inputQuery.trim() && !isTyping
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 cursor-pointer'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

/**
 * Real Google Gemini API Call with Comprehensive Telemetry Context
 */
async function callGeminiWithTelemetry(query, attempt, allAttempts, apiKey, previousMessages = []) {
  const analysis = analyzeAttemptPatterns(attempt);

  // Compile detailed question-level telemetry for the active attempt
  let detailedQuestionsSummary = 'No attempt completed yet.';
  if (attempt && attempt.responses) {
    const list = Object.values(attempt.responses);
    detailedQuestionsSummary = list.map(r => {
      const outcome = r.isCorrect ? 'CORRECT' : r.isSkipped ? 'SKIPPED' : `WRONG (User: ${r.selectedOption}, Correct: ${r.correctOption})`;
      const catName = (r.category || 'general').toUpperCase();
      return `Q#${r.questionId} [${catName}] - Time: ${r.timeSpentSec}s - ${outcome}`;
    }).join('\n');
  }

  const systemContext = `
You are an Elite CCAT (Criteria Cognitive Aptitude Test) Master Coach.
The user is preparing intensely for the CCAT.
USER'S ULTIMATE TARGET: 45+ out of 50 (Top 0.1% Global Score).

CRITICAL CCAT REALITIES & CONSTRAINTS:
1. 50 questions in 15 minutes (900 seconds) = Average 18.0 seconds per question.
2. STRICT FORWARD-ONLY NAVIGATION: No back button! Once an answer or skip is pressed, it is final.
3. NO NEGATIVE MARKING: Never leave an unattempted question at the end; guess before clock runs out.
4. TO SCORE 45+:
   - Candidate must attempt at least 47–50 questions.
   - Requires 94–96%+ accuracy.
   - Pacing requirements:
     * Verbal (17 Qs): Average <= 10 seconds per question. Must bank 100+ seconds for math!
     * Spatial (11 Qs): Average <= 12-14 seconds per question. Rapid single-feature elimination.
     * Math & Logic (22 Qs): Average <= 20-22 seconds per question.
   - Sunk cost rule: If a math question takes >22 seconds, guess immediately and move on. Time traps kill a 45+ score.

USER'S HISTORICAL CONTEXT:
- Total attempts taken: ${allAttempts.length}
- Best score achieved so far: ${allAttempts.reduce((m, a) => Math.max(m, Object.values(a.responses || {}).filter(r => r.isCorrect).length), 0)} / 50

ACTIVE ATTEMPT TELEMETRY:
- Test: ${attempt?.testTitle || 'None'}
- Raw Score: ${analysis?.score || 0} / 50
- Accuracy: ${analysis?.overallAccuracy || 0}%
- Average time per question: ${analysis?.overallAvgTimeSec || 0} seconds
- Total Time Traps (>25s on wrong questions): ${analysis?.timeTraps.count || 0} questions (${analysis?.timeTraps.wastedSeconds || 0} seconds wasted)
- Section Breakdown:
${analysis?.categoryStats.map(c => `  * ${c.name}: ${c.correct}/${c.total} (${c.accuracyPercent}%) | Avg time: ${c.avgTimeSec}s`).join('\n') || 'N/A'}

QUESTION-BY-QUESTION TELEMETRY (Every question's time and outcome):
${detailedQuestionsSummary}

INSTRUCTIONS FOR YOUR RESPONSE:
1. Speak directly, like a high-performance cognitive coach (crisp, precise, analytical).
2. Reference their actual numbers (e.g. "On Q#14 you spent 34s and got it wrong...").
3. Give concrete tactics, shortcuts, mental math tricks, or skipping rules to push them to 45+.
4. Format using clean GitHub markdown with bold key points and bullet lists.
`.trim();

  // Try gemini-2.5-flash and gemini-3.8-flash
  const models = ['gemini-2.5-flash', 'gemini-3.8-flash'];
  let lastErrorMessage = '';
  
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          { role: 'user', parts: [{ text: systemContext + '\n\nUser Question:\n' + query }] }
        ]
      };

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      if (data.error) {
        lastErrorMessage = `${model}: ${data.error.message || JSON.stringify(data.error)}`;
      }
    } catch (e) {
      lastErrorMessage = `${model}: ${e.message}`;
    }
  }

  throw new Error(lastErrorMessage || 'Failed to receive candidate response from Gemini API.');
}
