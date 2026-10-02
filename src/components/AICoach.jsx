import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, AlertTriangle, Zap, Clock, Trophy, HelpCircle, Key, Check } from 'lucide-react';
import { generateCoachInsight, analyzeAttemptPatterns } from '../data/patternEngine.js';
import { getSettings, saveSettings } from '../utils/storage.js';

export default function AICoach({ attempts = [], activeAttempt = null, onSelectAttempt }) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [selectedAttemptId, setSelectedAttemptId] = useState(activeAttempt ? activeAttempt.id : (attempts[0]?.id || 'latest'));
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const s = getSettings();
    if (s.geminiApiKey) setApiKey(s.geminiApiKey);

    // Initial greeting message
    const initialTarget = attempts.find(a => a.id === selectedAttemptId) || attempts[0] || null;
    const initialText = generateCoachInsight('overview', attempts, initialTarget);
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

    // Check if user provided Gemini API key for external LLM call
    if (apiKey) {
      try {
        const response = await callGeminiWithTelemetry(query, targetAttempt, attempts, apiKey);
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
        return;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local diagnostic engine', err);
      }
    }

    // Built-in intelligent diagnostic engine
    setTimeout(() => {
      const responseText = generateCoachInsight(query, attempts, targetAttempt);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
  };

  const handleSaveKey = () => {
    const s = getSettings();
    saveSettings({ ...s, geminiApiKey: apiKey.trim() });
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const quickPrompts = [
    { label: '⚠️ Find My Time Traps', prompt: 'Where are my biggest time traps and how much time did I waste?' },
    { label: '⏱️ Analyze Speed Pattern', prompt: 'Analyze my speed by question category and find my pacing bottlenecks.' },
    { label: '🎯 Roadmap to 35+ Score', prompt: 'How do I reach a score of 35+ based on my exact test telemetry?' },
    { label: '💤 Check Fatigue Decay', prompt: 'Did my accuracy drop between question 1-25 and question 26-50?' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Coach Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-[2px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>CCAT AI Cognitive Coach</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Telemetry Active
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Live analysis of every question response, second-by-second pacing, and time traps.
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
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
            title="Configure Gemini API Key (Optional)"
          >
            <Key className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Gemini API Key Drawer */}
      {showKeyInput && (
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-4 mb-4 shadow-xl flex items-center justify-between gap-4 flex-wrap animate-fadeIn">
          <div className="flex-1 min-w-[240px]">
            <p className="text-xs font-semibold text-slate-200 mb-1">Optional: Connect Gemini API Key</p>
            <p className="text-[11px] text-slate-400">
              The built-in engine already works 100% offline. Adding a key enables free-form conversational reasoning with Gemini.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="password"
              placeholder="Paste Gemini API key (AIza...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 w-full sm:w-64 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={handleSaveKey}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
            >
              {keySaved ? <Check className="w-3.5 h-3.5" /> : 'Save'}
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
              <span className="ml-2">Analyzing attempt telemetry...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp.prompt)}
            className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-purple-500/50 text-xs font-medium transition-all shrink-0"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 shadow-xl">
        <input
          type="text"
          placeholder="Ask AI Coach about speed, question traps, or score improvement..."
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
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 cursor-pointer'
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
 * Optional Gemini API Telemetry Ingestion
 */
async function callGeminiWithTelemetry(query, attempt, allAttempts, apiKey) {
  const analysis = analyzeAttemptPatterns(attempt);
  const contextPrompt = `
You are an expert CCAT (Criteria Cognitive Aptitude Test) coach.
The user is preparing for the CCAT.
Real CCAT rules: 50 questions in 15 minutes (18s per question average). No negative marking. Strict forward only.

Here is the user's detailed telemetry from their recent attempt:
- Raw Score: ${analysis?.score || 0} / 50
- Accuracy: ${analysis?.overallAccuracy || 0}%
- Average time per question: ${analysis?.overallAvgTimeSec || 0} seconds
- Time Traps (>28s spent and got wrong): ${analysis?.timeTraps.count || 0} questions (${analysis?.timeTraps.wastedSeconds || 0} seconds wasted)
- Category Breakdown:
${analysis?.categoryStats.map(c => `  * ${c.name}: ${c.correct}/${c.total} (${c.accuracyPercent}%) - Avg Time: ${c.avgTimeSec}s`).join('\n')}
- Fatigue drop (Half 1 to Half 2): ${analysis?.fatigue.staminaDecay}% accuracy drop

User's Question: "${query}"

Respond with concise, actionable, bulleted advice tailored to their specific numbers and time traps.
`.trim();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: contextPrompt }] }]
    })
  });

  const data = await resp.json();
  if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error('No response from Gemini API');
}
