/**
 * AI Speed Tricks & Mental Shortcuts Service for CCAT Prep
 * 
 * Features:
 * - Dedicated Subject Times: Verbal (7s), Spatial (10s), Math (15s) or custom question limits.
 * - Pre-loads CCAT mental shortcuts in the background the moment a test begins.
 * - Caches all generated shortcuts permanently in localStorage so they load instantly upon review.
 * - Employs a smart model cascade (Gemini 2.5 Flash -> 3.5 Flash -> Flash-Lite) to bypass rate limits.
 * - Batches questions cleanly (5 at a time) to ensure fast responses without quota exhaustion.
 * - Bulletproof local fallback engine so speed shortcuts are always rendered even if offline.
 * - Broadcasts real-time events ('ccat-speed-tricks-updated') so review screens update seamlessly.
 */

import { getSettings, DEFAULT_GEMINI_KEY } from '../utils/storage.js';

const SPEED_TRICKS_CACHE_KEY = 'ccat_ai_speed_tricks_cache_v3';

const CASCADE_MODELS = [
  'gemini-2.5-flash',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest'
];

// In-memory tracker of tests currently preloading to avoid duplicate parallel loops
const activePreloadJobs = new Set();

/**
 * Returns the dedicated time allocation for a subject or question:
 * Verbal: 7s, Spatial: 10s, Math: 15s
 */
export function getSubjectTargetTime(category, timeLimitSec) {
  if (timeLimitSec && typeof timeLimitSec === 'number' && timeLimitSec > 0) {
    return timeLimitSec;
  }
  const cat = (category || '').toLowerCase();
  if (cat.includes('verbal') || cat.includes('word') || cat.includes('vocab')) return 7;
  if (cat.includes('spatial') || cat.includes('shape') || cat.includes('figure')) return 10;
  if (cat.includes('math') || cat.includes('logic') || cat.includes('number')) return 15;
  return 15;
}

/**
 * Loads entire speed tricks cache from localStorage
 */
function getTricksCache() {
  try {
    const raw = localStorage.getItem(SPEED_TRICKS_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to read speed tricks cache', e);
    return {};
  }
}

/**
 * Saves a map of newly generated tricks into localStorage
 */
function saveTricksToCache(newTricks) {
  try {
    const current = getTricksCache();
    const updated = { ...current, ...newTricks };
    const entries = Object.entries(updated);
    // Keep max 200 items in localStorage to avoid unbounded growth
    const payload = entries.length > 200
      ? Object.fromEntries(entries.slice(-200))
      : updated;
    localStorage.setItem(SPEED_TRICKS_CACHE_KEY, JSON.stringify(payload));
    // Notify all listening components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ccat-speed-tricks-updated', { detail: { count: Object.keys(newTricks).length } }));
    }
  } catch (e) {
    console.warn('Failed to save speed tricks cache (non-critical, continuing)', e);
    try {
      localStorage.removeItem('ccat_prep_speed_tricks_cache_v1');
      localStorage.removeItem('ccat_ai_speed_tricks_cache_v2');
    } catch (_) {}
  }
}

/**
 * Generates a stable unique key for a question
 */
export function getQuestionTrickKey(testId, q) {
  if (!q) return '';
  const qId = q.id ?? q.questionId ?? q.sprintQuestionIndex ?? 0;
  
  // Fixed CCAT full simulation tests 1 to 30
  if (testId && /^test-\d+$/i.test(testId)) {
    return `${testId}_q${qId}`;
  }

  // Dynamic Ultra-Fast sprints and procedural variations
  const promptSnippet = (q.question || q.questionText || '').trim().slice(0, 45).replace(/[^a-zA-Z0-9]/g, '_');
  const cat = q.category || 'q';
  return `${testId || 'sprint'}_${cat}_q${qId}_${promptSnippet}`;
}

/**
 * Retrieves a single cached speed trick for a question
 */
export function getSpeedTrick(testId, q) {
  const cache = getTricksCache();
  const key = getQuestionTrickKey(testId, q);
  return cache[key]?.text || null;
}

/**
 * Retrieves all cached speed tricks for a given test
 */
export function getAllSpeedTricksForTest(testId, questions = []) {
  const cache = getTricksCache();
  const result = {};
  questions.forEach((q, idx) => {
    const qId = q.id ?? q.questionId ?? q.sprintQuestionIndex ?? (idx + 1);
    const key = getQuestionTrickKey(testId, q);
    if (cache[key]?.text) {
      result[qId] = cache[key].text;
      result[String(qId)] = cache[key].text;
    }
  });
  return result;
}

/**
 * Instant local CCAT speed shortcut fallback generator when Gemini API is busy or offline
 */
export function generateLocalSpeedShortcut(q, targetSec = 15) {
  const cat = (q.category || '').toLowerCase();
  const sub = (q.subType || '').toLowerCase();
  const correct = q.correctOption || 'the correct option';
  const expl = q.explanation || '';

  // Extract any quick pattern already authored in the explanation
  const quickPattern = expl.match(/\*\*(\d+-Sec[^*]+)\*\*:\s*([^\n]+)/i);
  if (quickPattern) {
    return `⚡ **${targetSec}-Second CCAT Speed Shortcut:**\n\n• **Core Elimination Rule:** ${quickPattern[2].trim()}\n• **Instant Lock:** Select **Option ${correct}** in under ${targetSec}s without manual over-calculation.`;
  }

  if (cat.includes('verbal')) {
    if (sub.includes('analogy')) {
      return `⚡ **7-Second Verbal Relationship Bridge:**\n\n• **1-Sentence Bridge:** Formulate the precise connection sentence between the two stem words before looking at choices.\n• **Direction Check:** Match the exact relationship order (Subject ➔ Action or Part ➔ Whole).\n• **Instant Lock:** **Option ${correct}** directly fulfills the bridge without hesitation.`;
    }
    if (sub.includes('antonym') || sub.includes('synonym') || sub.includes('odd_word')) {
      return `⚡ **7-Second Rapid Elimination Trick:**\n\n• **Polarity & Root Check:** Tag the word's tone as positive (+), negative (-), or neutral in 2 seconds.\n• **Cluster Discard:** 3 distractors typically share the same polarity cluster; discard them and pick **Option ${correct}**.`;
    }
    return `⚡ **7-Second CCAT Verbal Trick:**\n\n• **Immediate Bridge:** Identify the semantic root or category in 3 seconds.\n• **Instant Lock:** Choose **Option ${correct}** directly.`;
  }

  if (cat.includes('spatial')) {
    if (sub.includes('odd_one_out')) {
      return `⚡ **10-Second Visual Invariant Rule:**\n\n• **Check One Invariant:** Scan for vertex parity (even vs odd sides), loop enclosure count, or reflective bilateral symmetry.\n• **Instant Outlier:** 4 choices obey the rule; **Option ${correct}** breaks it immediately.\n• **Speed Rule:** Do NOT verify all 5 figures once the outlier is confirmed.`;
    }
    if (sub.includes('cube') || sub.includes('folding')) {
      return `⚡ **10-Second CCAT Cube Rule:**\n\n• **Opposite Face Rule:** Faces separated by 1 square on the flat net can NEVER be adjacent on a 3D folded cube.\n• **Discard Opposites:** Eliminate any cube displaying opposite faces together. Only **Option ${correct}** contains valid mutually adjacent faces.`;
    }
    return `⚡ **10-Second Spatial Speed Trick:**\n\n• **Single Feature Anchor:** Track only one element (rotation angle, loop count, or vertex count) rather than the entire composite figure.\n• **Lock Answer:** **Option ${correct}** matches the progression.`;
  }

  // Math
  return `⚡ **15-Second CCAT Mental Math Shortcut:**\n\n• **Unit Digit & Estimation:** Check the last digit or magnitude order of the calculation before solving algebraically.\n• **Rapid Trap Elimination:** Eliminate distractor choices that violate the unit-digit or magnitude boundary.\n• **Fast Lock:** **Option ${correct}** is verified in under 15 seconds.`;
}

/**
 * Helper to call Gemini API with auto-downgrade cascade
 */
async function callGeminiForBatch(promptText, apiKey, modelIndex = 0) {
  const currentModel = CASCADE_MODELS[modelIndex] || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      role: 'user',
      parts: [{ text: promptText }]
    }],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);
    const data = await resp.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      return { data: parsed, model: currentModel };
    }

    // Try next model if quota or error
    if (modelIndex + 1 < CASCADE_MODELS.length) {
      console.warn(`[SpeedTricks Preloader] ${currentModel} returned error, cascading to ${CASCADE_MODELS[modelIndex + 1]}...`);
      return callGeminiForBatch(promptText, apiKey, modelIndex + 1);
    }
    throw new Error(data.error?.message || 'Quota exceeded on all models');
  } catch (err) {
    if (modelIndex + 1 < CASCADE_MODELS.length) {
      console.warn(`[SpeedTricks Preloader] ${currentModel} failed (${err.message}), cascading to ${CASCADE_MODELS[modelIndex + 1]}...`);
      return callGeminiForBatch(promptText, apiKey, modelIndex + 1);
    }
    throw err;
  }
}

/**
 * Pre-loads CCAT mental shortcuts in the background the moment a test starts.
 * Runs silently in chunks of 5 questions with polite pauses so rate limits are never hit.
 */
export async function startPreloadingSpeedTricks(testId, questions = []) {
  if (!questions || questions.length === 0) return;
  if (activePreloadJobs.has(testId)) return; // Already running for this test

  activePreloadJobs.add(testId);

  try {
    const settings = getSettings();
    const apiKey = settings.geminiApiKey || DEFAULT_GEMINI_KEY;
    const cache = getTricksCache();

    // Identify which questions don't have tricks cached yet
    const pendingQuestions = questions.filter(q => {
      const key = getQuestionTrickKey(testId, q);
      return !cache[key]?.text;
    });

    if (pendingQuestions.length === 0) {
      activePreloadJobs.delete(testId);
      return; // 100% of questions already cached!
    }

    if (!apiKey || apiKey.length < 10) {
      const newTricksToSave = {};
      pendingQuestions.forEach(q => {
        const targetSec = getSubjectTargetTime(q.category, q.timeLimitSec);
        const key = getQuestionTrickKey(testId, q);
        newTricksToSave[key] = {
          text: generateLocalSpeedShortcut(q, targetSec),
          model: 'local-ccat-engine',
          timestamp: Date.now()
        };
      });
      saveTricksCache(newTricksToSave);
      activePreloadJobs.delete(testId);
      return;
    }

    console.log(`[SpeedTricks Preloader] Starting background generation for ${pendingQuestions.length} questions in ${testId}...`);

    // Process in batches of 5 questions
    const BATCH_SIZE = 5;
    for (let i = 0; i < pendingQuestions.length; i += BATCH_SIZE) {
      const batch = pendingQuestions.slice(i, i + BATCH_SIZE);

      const promptQuestions = batch.map((q, bIdx) => {
        const targetSec = getSubjectTargetTime(q.category, q.timeLimitSec);
        const qId = q.id ?? q.questionId ?? q.sprintQuestionIndex ?? (i + bIdx + 1);
        return {
          id: qId,
          category: q.category,
          subType: q.subType || 'general',
          targetTimeSec: targetSec,
          question: q.question || q.questionText,
          options: (q.options || []).map(o => `${o.id}: ${o.text || '[Geometric SVG]'}`),
          correctOption: q.correctOption,
          standardExplanationSnippet: (q.explanation || '').slice(0, 160)
        };
      });

      const systemPrompt = `You are a world-class CCAT (Criteria Cognitive Aptitude Test) coach for 45+ scorers.
For each question, provide an elite speed shortcut tailored strictly to the question's dedicated subject time limit:
- Verbal (Target: 7 SECONDS): Provide the 7-second rapid relationship bridge, root rule, or direct polarity elimination. Title: "⚡ **7-Second CCAT Rapid Shortcut:**"
- Spatial (Target: 10 SECONDS): Provide the 10-second visual anchor, symmetry invariant, loop count, or chirality check. Title: "⚡ **10-Second CCAT Visual Shortcut:**"
- Math (Target: 15 SECONDS): Provide the 15-second mental math shortcut, unit-digit check, ratio rule, or algebraic trick. Title: "⚡ **15-Second CCAT Mental Shortcut:**"

Requirements:
1. Lead directly with the fastest mental shortcut or elimination trick that allows a test-taker to solve within that question's dedicated target time.
2. Step-by-step with bold numbers and punchy bullet points.
3. Clean formatting: do NOT use raw LaTeX like \\cancel or unescaped math dollar signs.
4. Keep explanations concise, crisp, and high-impact.

Return valid JSON mapping question ID to shortcut string:
{
  "1": "⚡ **7-Second CCAT Rapid Shortcut:**\\n1. Step 1...",
  "2": "⚡ **15-Second CCAT Mental Shortcut:**\\n1. Step 1..."
}`;

      const promptText = `${systemPrompt}\n\nQUESTIONS TO PROCESS:\n${JSON.stringify(promptQuestions, null, 2)}`;

      try {
        const { data: batchResults, model } = await callGeminiForBatch(promptText, apiKey);
        
        // Save batch immediately
        const newTricksToSave = {};
        batch.forEach((q, bIdx) => {
          const qId = q.id ?? q.questionId ?? q.sprintQuestionIndex ?? (i + bIdx + 1);
          const trick = batchResults[String(qId)] || batchResults[qId];
          const key = getQuestionTrickKey(testId, q);
          if (trick && typeof trick === 'string') {
            newTricksToSave[key] = {
              text: trick,
              model,
              timestamp: Date.now()
            };
          } else {
            // Local fallback if specific question was skipped in JSON response
            const targetSec = getSubjectTargetTime(q.category, q.timeLimitSec);
            newTricksToSave[key] = {
              text: generateLocalSpeedShortcut(q, targetSec),
              model: 'local-ccat-engine',
              timestamp: Date.now()
            };
          }
        });

        if (Object.keys(newTricksToSave).length > 0) {
          saveTricksToCache(newTricksToSave);
          console.log(`[SpeedTricks Preloader] Saved batch ${Math.floor(i / BATCH_SIZE) + 1} (${Object.keys(newTricksToSave).length} tricks) for ${testId}.`);
        }
      } catch (batchErr) {
        console.warn(`[SpeedTricks Preloader] Batch error for ${testId}, saving local fallbacks:`, batchErr.message);
        // Fall back locally so user is never left without speed shortcuts
        const fallbackTricks = {};
        batch.forEach(q => {
          const key = getQuestionTrickKey(testId, q);
          const targetSec = getSubjectTargetTime(q.category, q.timeLimitSec);
          fallbackTricks[key] = {
            text: generateLocalSpeedShortcut(q, targetSec),
            model: 'local-ccat-engine',
            timestamp: Date.now()
          };
        });
        saveTricksToCache(fallbackTricks);
      }

      // Polite pause of 1.2 seconds between batches to preserve rate limits
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    console.log(`[SpeedTricks Preloader] Finished preloading for ${testId}.`);
  } catch (err) {
    console.error(`[SpeedTricks Preloader] Failed for ${testId}`, err);
  } finally {
    activePreloadJobs.delete(testId);
  }
}

/**
 * On-demand single question speed trick fetcher
 */
export async function fetchSingleSpeedTrick(testId, q) {
  if (!q) return null;
  const qId = q.id ?? q.questionId ?? q.sprintQuestionIndex ?? 1;
  const targetSec = getSubjectTargetTime(q.category, q.timeLimitSec);
  const key = getQuestionTrickKey(testId, q);
  const cache = getTricksCache();
  if (cache[key]?.text) return cache[key].text;

  const promptQuestion = {
    id: qId,
    category: q.category,
    subType: q.subType || 'general',
    targetTimeSec: targetSec,
    question: q.question || q.questionText,
    options: (q.options || []).map(o => `${o.id}: ${o.text || '[Geometric SVG]'}`),
    correctOption: q.correctOption,
    standardExplanationSnippet: (q.explanation || '').slice(0, 160)
  };

  const systemPrompt = `You are an elite CCAT coach. Provide an instant speed shortcut tailored to the question's dedicated time (${targetSec} seconds):
- Verbal (7s): 7-second rapid relationship bridge / elimination trick.
- Spatial (10s): 10-second visual anchor / feature invariant trick.
- Math (15s): 15-second mental math / unit-digit / ratio shortcut.
Title: "⚡ **${targetSec}-Second CCAT Speed Shortcut:**".
Step-by-step with bold numbers. Clean formatting without LaTeX.
Return JSON:
{
  "${qId}": "⚡ **${targetSec}-Second CCAT Speed Shortcut:**\\n1. Step 1...\\n2. Step 2..."
}`;

  const promptText = `${systemPrompt}\n\nQUESTION:\n${JSON.stringify([promptQuestion], null, 2)}`;

  try {
    const settings = getSettings();
    const apiKey = settings.geminiApiKey || DEFAULT_GEMINI_KEY;
    const { data, model } = await callGeminiForBatch(promptText, apiKey);
    const trick = data[String(qId)] || data[qId] || Object.values(data)[0];
    if (trick && typeof trick === 'string') {
      saveTricksToCache({
        [key]: { text: trick, model, timestamp: Date.now() }
      });
      return trick;
    }
  } catch (err) {
    console.warn(`[SpeedTricks] Gemini fetch failed for question ${qId}, using local fallback:`, err.message);
  }

  // Graceful fallback: local speed shortcut
  const localTrick = generateLocalSpeedShortcut(q, targetSec);
  saveTricksToCache({
    [key]: { text: localTrick, model: 'local-ccat-engine', timestamp: Date.now() }
  });
  return localTrick;
}
