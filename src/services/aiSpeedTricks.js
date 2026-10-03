/**
 * AI Speed Tricks & Mental Shortcuts Service for CCAT Prep
 * 
 * Features:
 * - Pre-loads 15-second CCAT mental shortcuts in the background the moment a test begins.
 * - Caches all generated shortcuts permanently in localStorage so they load instantly upon test completion.
 * - Employs a smart model cascade (Gemini 2.5 Flash -> 3.5 Flash -> Flash-Lite) to bypass rate limits.
 * - Batches questions cleanly (5 at a time) to ensure fast responses without quota exhaustion.
 * - Broadcasts real-time events ('ccat-speed-tricks-updated') so review screens update seamlessly.
 */

import { getSettings, DEFAULT_GEMINI_KEY } from '../utils/storage.js';

const SPEED_TRICKS_CACHE_KEY = 'ccat_ai_speed_tricks_cache_v2';

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
    localStorage.setItem(SPEED_TRICKS_CACHE_KEY, JSON.stringify(updated));
    // Notify all listening components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ccat-speed-tricks-updated', { detail: { count: Object.keys(newTricks).length } }));
    }
  } catch (e) {
    console.error('Failed to save speed tricks cache', e);
  }
}

/**
 * Generates a stable unique key for a question
 */
export function getQuestionTrickKey(testId, q) {
  if (!q) return '';
  const qId = q.id ?? q.sprintQuestionIndex ?? 0;
  // If question has unique text or testId
  if (testId && testId !== 'custom') {
    return `${testId}_q${qId}`;
  }
  // Fallback hash based on question text snippet
  const snippet = (q.question || '').slice(0, 40).replace(/[^a-zA-Z0-9]/g, '_');
  return `q_${snippet}`;
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
  questions.forEach(q => {
    const key = getQuestionTrickKey(testId, q);
    if (cache[key]?.text) {
      result[q.id] = cache[key].text;
    }
  });
  return result;
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
 * Pre-loads all 15-second CCAT mental shortcuts in the background the moment a test starts.
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

    console.log(`[SpeedTricks Preloader] Starting background generation for ${pendingQuestions.length} questions in ${testId}...`);

    // Process in batches of 5 questions
    const BATCH_SIZE = 5;
    for (let i = 0; i < pendingQuestions.length; i += BATCH_SIZE) {
      const batch = pendingQuestions.slice(i, i + BATCH_SIZE);

      const promptQuestions = batch.map(q => ({
        id: q.id,
        category: q.category,
        subType: q.subType || 'general',
        question: q.question,
        options: (q.options || []).map(o => `${o.id}: ${o.text || '[Geometric SVG]'}`),
        correctOption: q.correctOption,
        standardExplanationSnippet: (q.explanation || '').slice(0, 140)
      }));

      const systemPrompt = `You are a world-class CCAT (Criteria Cognitive Aptitude Test) coach for 45+ scorers.
For each question, provide a punchy "⚡ 15-SECOND CCAT MENTAL SHORTCUT & ELIMINATION TRICK".
Requirements:
1. Reveal the exact mental math shortcut, unit-digit check, ratio rule, or single-feature visual elimination rule that lets a candidate eliminate wrong choices and solve in under 15 seconds.
2. For Math: Show the fastest mental calculation shortcut or algebraic trick.
3. For Verbal: State the 1-sentence relationship bridge or vocabulary root.
4. For Spatial: Give the single visual anchor or chirality handedness check.
5. Use clean formatting with bold numbers and bullet steps. Do NOT use raw LaTeX like \\cancel.

Return valid JSON mapping question ID to shortcut string:
{
  "1": "⚡ **15-Second CCAT Shortcut:**\\n1. Step 1...",
  "2": "⚡ **15-Second CCAT Shortcut:**\\n..."
}`;

      const promptText = `${systemPrompt}\n\nQUESTIONS TO PROCESS:\n${JSON.stringify(promptQuestions, null, 2)}`;

      try {
        const { data: batchResults, model } = await callGeminiForBatch(promptText, apiKey);
        
        // Save batch immediately
        const newTricksToSave = {};
        batch.forEach(q => {
          const trick = batchResults[String(q.id)] || batchResults[q.id];
          if (trick) {
            const key = getQuestionTrickKey(testId, q);
            newTricksToSave[key] = {
              text: trick,
              model,
              timestamp: Date.now()
            };
          }
        });

        if (Object.keys(newTricksToSave).length > 0) {
          saveTricksToCache(newTricksToSave);
          console.log(`[SpeedTricks Preloader] Saved batch ${Math.floor(i / BATCH_SIZE) + 1} (${Object.keys(newTricksToSave).length} tricks) for ${testId}.`);
        }
      } catch (batchErr) {
        console.warn(`[SpeedTricks Preloader] Batch error for ${testId}:`, batchErr.message);
      }

      // Polite pause of 1.5 seconds between batches to preserve rate limits
      await new Promise(resolve => setTimeout(resolve, 1500));
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
  const settings = getSettings();
  const apiKey = settings.geminiApiKey || DEFAULT_GEMINI_KEY;

  const key = getQuestionTrickKey(testId, q);
  const cache = getTricksCache();
  if (cache[key]?.text) return cache[key].text;

  const promptQuestion = {
    id: q.id,
    category: q.category,
    subType: q.subType || 'general',
    question: q.question,
    options: (q.options || []).map(o => `${o.id}: ${o.text || '[Geometric SVG]'}`),
    correctOption: q.correctOption,
    standardExplanationSnippet: (q.explanation || '').slice(0, 160)
  };

  const systemPrompt = `You are an elite CCAT coach. Provide an instant "⚡ 15-SECOND CCAT MENTAL SHORTCUT / ELIMINATION TRICK" for this question.
Show the fastest mental shortcut, unit-digit check, ratio rule, or visual elimination trick.
Keep it concise, step-by-step, with bold numbers. Return JSON:
{
  "${q.id}": "⚡ **15-Second CCAT Shortcut:**\\n1. Step 1...\\n2. Step 2..."
}`;

  const promptText = `${systemPrompt}\n\nQUESTION:\n${JSON.stringify([promptQuestion], null, 2)}`;

  try {
    const { data, model } = await callGeminiForBatch(promptText, apiKey);
    const trick = data[String(q.id)] || data[q.id];
    if (trick) {
      saveTricksToCache({
        [key]: { text: trick, model, timestamp: Date.now() }
      });
      return trick;
    }
    return null;
  } catch (err) {
    console.error('Failed to fetch single speed trick', err);
    return null;
  }
}
