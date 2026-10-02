import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, AlertTriangle, Zap, Clock, Trophy, HelpCircle, Key, Check, Target, RefreshCw, ShieldCheck, ChevronDown, Cpu, ArrowDownRight } from 'lucide-react';
import { analyzeAttemptPatterns } from '../data/patternEngine.js';
import { getSettings, saveSettings, DEFAULT_GEMINI_KEY } from '../utils/storage.js';
import MarkdownView from './MarkdownView.jsx';

export const GEMINI_MODELS = [
  { id: 'auto', name: 'Smart Auto-Cascade', tier: 'Auto', badge: 'Recommended', desc: 'Starts at Upper Flash, auto-downgrades to Flash-Lite if rate-limited or quota exceeded' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', tier: 'Upper Tier', badge: 'High Precision', desc: 'Premier balanced model for rapid, high-accuracy telemetry analysis' },
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', tier: 'Upper Tier', badge: 'Next-Gen Flash', desc: 'High-speed reasoning model' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', tier: 'Upper Tier', badge: 'Reasoning Flash', desc: 'Deep cognitive analysis' },
  { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', tier: 'Upper Tier', badge: 'Latest Flash', desc: 'Google standard latest flash alias' },
  { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', tier: 'Lower Tier', badge: 'High Quota', desc: 'Ultra-resilient model with high quota allowance and fast latency' },
  { id: 'gemini-flash-lite-latest', name: 'Gemini Flash-Lite Latest', tier: 'Lower Tier', badge: 'Max Resiliency', desc: 'Maximum resilience high-quota fallback' },
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', tier: 'Pro Tier', badge: 'Heavy Reasoning', desc: 'Deep multi-step reasoning (strict RPM limits)' }
];

export default function AICoach({ attempts = [], activeAttempt = null, onSelectAttempt }) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [selectedAttemptId, setSelectedAttemptId] = useState(activeAttempt ? activeAttempt.id : (attempts[0]?.id || 'latest'));
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [preferredModel, setPreferredModel] = useState('auto');
  const [autoDowngrade, setAutoDowngrade] = useState(true);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const s = getSettings();
    const effectiveKey = (s.geminiApiKey && s.geminiApiKey.trim().length > 10) ? s.geminiApiKey.trim() : DEFAULT_GEMINI_KEY;
    setApiKey(effectiveKey);
    setPreferredModel(s.preferredModel || 'auto');
    setAutoDowngrade(s.autoDowngradeEnabled ?? true);

    const initialText = `### 🧠 Real Google Gemini CCAT Coach (Connected)
**Target: 45+ / 50 (Top 0.1% Elite Bracket)**

I am connected directly to **Google Gemini** with live access to your second-by-second question telemetry.

⚡ **Auto-Downgrade Resiliency:** If upper models encounter rate limits or quota limits, the coach will automatically cascade down to resilient high-quota models without stopping.

Click any quick prompt below or type your own question to start:
* *"Where are my exact time traps?"*
* *"How do I increase my speed to reach 45+?"*
* *"Analyze my latest test second-by-second."*`;

    setMessages([
      {
        id: 'msg-init',
        sender: 'ai',
        text: initialText,
        modelInfo: {
          modelName: 'Auto-Cascade Engine',
          tier: 'Resilient',
          downgraded: false
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [attempts]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, typingStatus]);

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
    setTypingStatus('Google Gemini is analyzing test telemetry...');

    const effectiveKey = (apiKey && apiKey.trim().length > 10) ? apiKey.trim() : DEFAULT_GEMINI_KEY;

    try {
      const result = await callGeminiWithTelemetryCascade(
        query,
        targetAttempt,
        attempts,
        effectiveKey,
        messages,
        preferredModel,
        autoDowngrade,
        (statusMessage) => {
          setTypingStatus(statusMessage);
        }
      );

      setIsTyping(false);
      setTypingStatus('');

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: result.text,
          modelInfo: {
            modelId: result.modelId,
            modelName: result.modelName,
            tier: result.tier,
            downgraded: result.downgraded,
            originalModel: result.originalModel,
            reason: result.reason
          },
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('All Gemini cascade models failed:', err);
      setIsTyping(false);
      setTypingStatus('');
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `⚠️ **Google Gemini Connection Notice:**\n\n${err.message || 'Unable to receive response from Gemini models.'}\n\nPlease check your internet connection or verify your API key in settings.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleSaveSettings = () => {
    const s = getSettings();
    saveSettings({
      ...s,
      geminiApiKey: apiKey.trim(),
      preferredModel,
      autoDowngradeEnabled: autoDowngrade
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const quickPrompts = [
    { label: '🎯 Roadmap to 45+ Score', prompt: 'Give me a concrete, ruthless roadmap to jump from my current score to 45+ on the CCAT.' },
    { label: '⚠️ Find My Exact Time Traps', prompt: 'Identify every question where I spent over 25 seconds and got it wrong. How much time did I waste?' },
    { label: '⏱️ Category Velocity Imbalance', prompt: 'Analyze my speed across Math, Verbal, and Spatial. Which category is eating my clock?' },
    { label: '🧠 Instant Elimination Tactics', prompt: 'Teach me the fastest 5-second elimination rules for CCAT spatial matrices and odd-one-out questions.' }
  ];

  const currentModelObj = GEMINI_MODELS.find(m => m.id === preferredModel) || GEMINI_MODELS[0];

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
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1" title="Connected to Google Gemini Live API">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {currentModelObj.name}
              </span>
              {autoDowngrade && (
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1" title="Auto-downgrade to lower models if upper models hit rate limit / quota exceeded">
                  <ShieldCheck className="w-3 h-3 text-sky-400" />
                  Auto-Downgrade Active
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">
              Live Google Gemini LLM with telemetry context, time-trap detection, and auto-downgrade fallback on rate limits.
            </p>
          </div>
        </div>

        {/* Attempt Selector & Model / API Key config */}
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
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Configure Gemini Models and API Key"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Settings</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showSettingsDrawer ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Model & API Settings Drawer */}
      {showSettingsDrawer && (
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-4 sm:p-5 mb-4 shadow-xl space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Preferred Model Tier */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Primary Gemini Model:</span>
              </label>
              <select
                value={preferredModel}
                onChange={(e) => setPreferredModel(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 w-full focus:outline-none focus:border-purple-400"
              >
                {GEMINI_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.tier}) — {m.desc.slice(0, 50)}...
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                {currentModelObj.desc}
              </p>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-sky-400" />
                <span>Gemini API Key:</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  placeholder="Paste custom Gemini API key (or use built-in)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 flex-1 font-mono focus:outline-none focus:border-purple-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                A high-speed built-in key is active. You can also paste your own Google AI Studio key.
              </p>
            </div>
          </div>

          {/* Auto-downgrade switch & Save button */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={autoDowngrade}
                onChange={(e) => setAutoDowngrade(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 bg-slate-950 border-slate-700 focus:ring-purple-500 cursor-pointer"
              />
              <div>
                <span className="font-semibold text-white">Auto-Downgrade on Rate Limit / Quota Exceeded</span>
                <span className="text-slate-400 block text-[11px]">
                  If upper models hit 429 rate limit or quota exceeded, seamlessly cascade to lower high-quota models without failing.
                </span>
              </div>
            </label>

            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {settingsSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <span>Save AI Preferences</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Messages Chat Area */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';
          const info = m.modelInfo;
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
                <MarkdownView content={m.text} />

                {/* AI Model Attribution & Auto-downgrade telemetry */}
                {isAi && info && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] flex-wrap gap-2">
                    {info.downgraded ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-sans">
                        <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                        <span>Auto-downgraded to <strong>{info.modelName}</strong> ({info.reason})</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-sans">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>{info.modelName}</span>
                        {info.tier && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-mono">
                            {info.tier}
                          </span>
                        )}
                      </span>
                    )}

                    <span className="text-slate-500 font-mono text-[10px] ml-auto">
                      {m.timestamp}
                    </span>
                  </div>
                )}

                {!isAi && (
                  <div className="text-[10px] mt-1.5 font-mono text-sky-200 text-right">
                    {m.timestamp}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 max-w-xl mr-auto items-center">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 font-medium text-slate-300">
                {typingStatus || 'Google Gemini is analyzing test telemetry...'}
              </span>
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
 * Ordered Fallback Priority Tiers (Upper Models -> Lower Resilient Models)
 */
const CASCADE_TIERS = [
  // Upper Premier Tier
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', tier: 'Upper Tier' },
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', tier: 'Upper Tier' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', tier: 'Upper Tier' },
  { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', tier: 'Upper Tier' },

  // Lower Resilient / High-Quota Fallback Tier
  { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', tier: 'Lower Tier' },
  { id: 'gemini-flash-lite-latest', name: 'Gemini Flash-Lite Latest', tier: 'Lower Tier' },

  // Pro Tier
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', tier: 'Pro Tier' }
];

/**
 * Classify Gemini API errors to detect rate limits, quota limits, and server saturation
 */
function classifyGeminiError(errData, httpStatus) {
  const msg = (errData?.message || errData || '').toString().toLowerCase();
  const statusStr = (errData?.status || '').toString().toLowerCase();

  if (httpStatus === 429 || statusStr.includes('resource_exhausted') || msg.includes('quota') || msg.includes('rate limit') || msg.includes('too many requests')) {
    return { isDowngradable: true, label: 'Rate limit / Quota exceeded' };
  }
  if (httpStatus === 503 || httpStatus === 500 || msg.includes('high demand') || msg.includes('overloaded') || msg.includes('unavailable') || msg.includes('spikes in demand')) {
    return { isDowngradable: true, label: 'High demand / Overloaded' };
  }
  if (httpStatus === 404 || msg.includes('not found') || msg.includes('no longer available')) {
    return { isDowngradable: true, label: 'Model unavailable' };
  }
  if (msg.includes('timeout') || msg.includes('abort')) {
    return { isDowngradable: true, label: 'Request timeout' };
  }
  return { isDowngradable: true, label: errData?.message || 'API error' };
}

/**
 * Real Google Gemini Multi-Tier Auto-Downgrade Cascade
 */
async function callGeminiWithTelemetryCascade(
  query,
  attempt,
  allAttempts,
  apiKey,
  previousMessages = [],
  preferredModelId = 'auto',
  autoDowngradeEnabled = true,
  onStatusUpdate = null
) {
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

  // Assemble candidate models queue
  let candidateQueue = [];
  if (preferredModelId && preferredModelId !== 'auto') {
    const chosen = CASCADE_TIERS.find(m => m.id === preferredModelId) || { id: preferredModelId, name: preferredModelId, tier: 'Custom' };
    candidateQueue.push(chosen);
    if (autoDowngradeEnabled) {
      // Append the rest of the cascade in order
      CASCADE_TIERS.forEach(m => {
        if (m.id !== chosen.id) candidateQueue.push(m);
      });
    }
  } else {
    // Default smart cascade from Upper Flash to Lower Flash-Lite
    candidateQueue = [...CASCADE_TIERS];
  }

  // Format multi-turn conversation
  const recentHistory = previousMessages.slice(-4).map(m => ({
    role: m.sender === 'ai' ? 'model' : 'user',
    parts: [{ text: m.text }]
  }));

  const payload = {
    contents: [
      ...recentHistory,
      { role: 'user', parts: [{ text: systemContext + '\n\nUser Question:\n' + query }] }
    ]
  };

  let attemptsHistory = [];
  let firstDowngradeReason = '';

  // Execute cascade
  for (let i = 0; i < candidateQueue.length; i++) {
    const model = candidateQueue[i];
    const isFirst = i === 0;

    if (!isFirst && onStatusUpdate) {
      onStatusUpdate(`⚡ Upper model limit — auto-downgrading to ${model.name}...`);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout per model

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model.id}:generateContent?key=${apiKey}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await resp.json();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        // Success!
        return {
          text: data.candidates[0].content.parts[0].text,
          modelId: model.id,
          modelName: model.name,
          tier: model.tier,
          downgraded: !isFirst,
          originalModel: candidateQueue[0].name,
          reason: firstDowngradeReason || 'Upper model limit',
          cascadeHistory: attemptsHistory
        };
      }

      // Check if error occurred
      const errInfo = classifyGeminiError(data.error, resp.status);
      if (!firstDowngradeReason) firstDowngradeReason = errInfo.label;
      attemptsHistory.push({ model: model.id, error: data.error?.message || errInfo.label });

      console.warn(`[Gemini Auto-Downgrade] ${model.id} failed (${errInfo.label}). Cascading to next model...`);

      if (!autoDowngradeEnabled) {
        throw new Error(`${model.name} error: ${data.error?.message || errInfo.label}`);
      }
    } catch (e) {
      const errInfo = classifyGeminiError(e.message, 0);
      if (!firstDowngradeReason) firstDowngradeReason = errInfo.label;
      attemptsHistory.push({ model: model.id, error: e.message });

      console.warn(`[Gemini Auto-Downgrade] ${model.id} error: ${e.message}. Cascading to next model...`);

      if (!autoDowngradeEnabled) {
        throw new Error(`${model.name} error: ${e.message}`);
      }
    }
  }

  // If custom API key was used and all models failed, try DEFAULT_GEMINI_KEY as emergency backup
  if (apiKey !== DEFAULT_GEMINI_KEY) {
    if (onStatusUpdate) {
      onStatusUpdate('Custom key quota exhausted — connecting via system safety net...');
    }
    try {
      const emergencyRes = await callGeminiWithTelemetryCascade(
        query,
        attempt,
        allAttempts,
        DEFAULT_GEMINI_KEY,
        previousMessages,
        'gemini-3.5-flash-lite',
        true,
        onStatusUpdate
      );
      return {
        ...emergencyRes,
        downgraded: true,
        reason: 'Custom key quota exceeded (System fallback)'
      };
    } catch (emergencyErr) {
      console.error('Emergency key fallback also failed:', emergencyErr);
    }
  }

  throw new Error(`All Gemini models reached quota or network limits. Attempted: ${candidateQueue.map(m => m.name).join(', ')}.`);
}
