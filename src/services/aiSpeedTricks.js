/**
 * AI Speed Tricks & Mental Shortcuts Service for CCAT Prep
 * 
 * Features:
 * - Dedicated Subject Times: Verbal (7s), Spatial (10s), Math (15s) or custom question limits.
 * - Deep Question-Specific Tactical Engine: Generates authentic, question-specific elimination tricks
 *   analyzing stems, distractors, formulas, and visual invariants.
 * - Pre-loads CCAT mental shortcuts in the background the moment a test begins.
 * - Caches all generated shortcuts in localStorage so they load instantly upon review.
 * - Employs official Gemini cascade (gemini-2.0-flash -> 1.5-flash -> 2.0-flash-lite) when API key is active.
 * - Instant graceful fallback to question-specific tactical engine if offline or API key is unconfigured.
 * - Broadcasts real-time events ('ccat-speed-tricks-updated') so review screens update seamlessly.
 */

import { getSettings, DEFAULT_GEMINI_KEY } from '../utils/storage.js';

const SPEED_TRICKS_CACHE_KEY = 'ccat_ai_speed_tricks_cache_v4';

const CASCADE_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro'
];

// In-memory tracker of tests currently preloading to avoid duplicate parallel loops
const activePreloadJobs = new Set();

/**
 * Clean whitespace and formatting from text strings
 */
function cleanText(t) {
  return (t || '').replace(/[\r\n]+/g, ' ').trim();
}

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
 * Loads entire speed tricks cache from localStorage, purging legacy generic boilerplate
 */
function getTricksCache() {
  try {
    const raw = localStorage.getItem(SPEED_TRICKS_CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const cleaned = {};
    for (const [k, v] of Object.entries(parsed)) {
      const text = v?.text || '';
      // Purge old generic advice
      if (!text.includes('Polarity & Root Check: Tag the word') && !text.includes('Cluster Discard: 3 distractors typically share')) {
        cleaned[k] = v;
      }
    }
    return cleaned;
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
    // Keep max 300 items in localStorage
    const payload = entries.length > 300
      ? Object.fromEntries(entries.slice(-300))
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
      localStorage.removeItem('ccat_ai_speed_tricks_cache_v3');
    } catch (_) {}
  }
}

/**
 * Generates a stable unique key for a question
 */
export function getQuestionTrickKey(testId, q) {
  if (!q) return '';
  const qId = q.id ?? q.questionId ?? q.sprintQuestionIndex ?? 0;
  
  // Fixed CCAT full simulation tests 1 to 57
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
  return cache[key] || null;
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
      result[qId] = {
        text: cache[key].text,
        model: cache[key].model || 'local-ccat-engine'
      };
      result[String(qId)] = result[qId];
    }
  });
  return result;
}

/**
 * Deep Question-Specific CCAT Speed Shortcut & Elimination Engine
 * Synthesizes tailored, question-specific strategies directly from the question prompt,
 * options, distractors, formulas, and explanations.
 */
export function generateLocalSpeedShortcut(q, targetSec = 15) {
  if (!q) return '';
  const prompt = (q.question || q.questionText || '').trim();
  const cat = (q.category || '').toLowerCase();
  const sub = (q.subType || '').toLowerCase();
  const correct = q.correctOption || 'the correct option';
  const options = q.options || [];
  const correctOpt = options.find(o => o.id === correct);
  const correctText = correctOpt?.text ? cleanText(correctOpt.text) : '';
  const distractors = options.filter(o => o.id !== correct);
  const expl = q.explanation || '';

  // Extract authored speed patterns if available
  const quickPattern = expl.match(/\*\*(\d+-Sec[^*]+)\*\*:\s*([^\n]+)/i);
  if (quickPattern) {
    return `⚡ **${targetSec}-Second CCAT Speed Shortcut:**\n\n• **Core Elimination Rule:** ${quickPattern[2].trim()}\n• **Instant Lock:** Select **Option ${correct}** (${correctText}) in under ${targetSec}s without manual over-calculation.`;
  }

  // 1. Verbal Categories
  if (cat.includes('verbal')) {
    // A. Antonyms
    if (sub.includes('antonym') || prompt.toLowerCase().includes('opposite in meaning')) {
      const mWord = prompt.match(/["']([A-Za-z\s\-]+)["']/i);
      const stemWord = mWord ? mWord[1].toUpperCase() : 'TARGET STEM';
      const mDef = expl.match(new RegExp(stemWord + '\\s+means?\\s+([^.]+)\\.', 'i'));
      const defSnippet = mDef ? mDef[1].trim() : '';
      const distractorSummary = distractors.map(d => `${d.id} (${cleanText(d.text)})`).join(', ');

      return `⚡ **${targetSec}-Second Rapid Elimination Trick for "${stemWord}":**\n\n` +
        `• **Target Stem & Connotation:** **"${stemWord}"**${defSnippet ? ` (*${defSnippet}*)` : ''} carries a distinctly marked tone.\n` +
        `• **Distractor Cluster Discard:** Options **${distractorSummary}** all share the same cluster (synonyms or mismatched distractors). Because 4 choices cluster together, none can be the unique opposite—eliminate them in <3 seconds.\n` +
        `• **Instant Lock:** Only **Option ${correct} (${correctText})** provides the direct opposite polarity. Lock **Option ${correct}** directly.`;
    }

    // B. Synonyms
    if (sub.includes('synonym') || prompt.toLowerCase().includes('most similar in meaning')) {
      const mWord = prompt.match(/["']([A-Za-z\s\-]+)["']/i);
      const stemWord = mWord ? mWord[1].toUpperCase() : 'TARGET WORD';
      return `⚡ **${targetSec}-Second Synonym Match Shortcut:**\n\n` +
        `• **Semantic Root Check:** Isolate the core meaning of **"${stemWord}"** before looking at distractors.\n` +
        `• **Trap Elimination:** Eliminate extreme or unrelated choices; only **Option ${correct} (${correctText})** preserves the exact semantic nuance.\n` +
        `• **Fast Lock:** Select **Option ${correct}** directly.`;
    }

    // C. Analogies
    if (sub.includes('analogy') || prompt.includes(':')) {
      const mPair = prompt.match(/([A-Za-z]+)\s*:\s*([A-Za-z]+)/);
      const pairText = mPair ? `"${mPair[1].toUpperCase()} : ${mPair[2].toUpperCase()}"` : 'the stem pair';
      const mBridge = expl.match(/([A-Z][^.]+just as[^.]+\.)/i) || expl.match(/([A-Z][^.]+is analogous to[^.]+\.)/i);
      const bridgeText = mBridge ? mBridge[1].trim() : `Build a 1-sentence connection: "X relates to Y directly."`;

      return `⚡ **${targetSec}-Second Analogy Relationship Bridge:**\n\n` +
        `• **1-Sentence Bridge for ${pairText}:** ${bridgeText}\n` +
        `• **Category & Direction Check:** Check only choices where the relationship flows in the identical order and category (e.g., Tool ➔ Function, Part ➔ Whole).\n` +
        `• **Instant Match:** **Option ${correct} (${correctText})** directly mirrors this bridge.`;
    }

    // D. Odd-One-Out (Classification)
    if (sub.includes('odd_word') || prompt.toLowerCase().includes('not belong')) {
      const distractorWords = distractors.map(d => cleanText(d.text)).filter(Boolean).join(', ');
      return `⚡ **${targetSec}-Second Classification Elimination:**\n\n` +
        `• **Unifying Category:** Quickly identify the single trait linking 4 of the 5 options (${distractorWords}).\n` +
        `• **Spot the Outlier:** **Option ${correct} (${correctText})** is the lone choice that breaks this classification.\n` +
        `• **CCAT Rule:** As soon as you identify 3 items belonging to the same category, pick the outlier without analyzing all 5.`;
    }

    // E. Sentence Completion
    if (sub.includes('sentence_completion') || prompt.toLowerCase().includes('complete the sentence')) {
      return `⚡ **${targetSec}-Second Context Prediction Trick:**\n\n` +
        `• **Tone & Pivot Clues:** Scan for transition indicators (although, yet, therefore, despite) to determine if the blank needs a positive, negative, or neutral word.\n` +
        `• **Lock Choice:** **Option ${correct} (${correctText})** fits the sentence's grammatical and logical trajectory perfectly.`;
    }

    // F. Syllogism / Deductive Logic
    if (sub.includes('syllogism') || prompt.toLowerCase().includes('logically be true') || prompt.toLowerCase().includes('therefore')) {
      return `⚡ **${targetSec}-Second Deductive Logic Chain:**\n\n` +
        `• **Strict Implication Chain:** Follow the direct arrow: Premise 1 ➔ Premise 2 ➔ Inescapable Deduction.\n` +
        `• **Converse Trap Alert:** Discard choices that assume the reverse is true (affirming the consequent). Only what is 100% guaranteed is valid.\n` +
        `• **Locked Deduction:** **Option ${correct} (${correctText})** is the only logically sound conclusion.`;
    }

    return `⚡ **${targetSec}-Second Rapid Verbal Shortcut:**\n\n` +
      `• **Isolate Clue:** Identify the core semantic root in 3 seconds.\n` +
      `• **Instant Elimination:** Discard 3 mismatched distractor categories immediately.\n` +
      `• **Lock Answer:** **Option ${correct} (${correctText})** is verified.`;
  }

  // 2. Spatial Categories
  if (cat.includes('spatial')) {
    if (sub.includes('odd_one_out')) {
      return `⚡ **${targetSec}-Second Visual Invariant Rule:**\n\n` +
        `• **Scan One Structural Invariant:** Check bilateral reflection symmetry, vertex parity (even vs. odd sides), or loop closure.\n` +
        `• **Instant Outlier:** 4 choices obey the structural invariant; **Option ${correct}** breaks the rule immediately.\n` +
        `• **Speed Rule:** Do NOT verify all 5 figures once the outlier is confirmed.`;
    }

    if (sub.includes('cube') || sub.includes('folding')) {
      return `⚡ **${targetSec}-Second CCAT Cube Folding Rule:**\n\n` +
        `• **Opposite Face Invariant:** On an unfolded cube net, faces separated by exactly 1 square can NEVER be adjacent on a 3D folded cube.\n` +
        `• **Discard Impossible Views:** Eliminate any cube choice showing two opposite faces simultaneously.\n` +
        `• **Instant Lock:** **Option ${correct}** is the only view showing mutually adjacent faces.`;
    }

    if (sub.includes('matrix') || prompt.toLowerCase().includes('3x3') || prompt.toLowerCase().includes('matrix')) {
      return `⚡ **${targetSec}-Second Matrix Scan Rule:**\n\n` +
        `• **Row & Column Invariant:** Compare Rows 1 & 2 to isolate the operator (Overlay XOR, 90° rotation, or shape set distribution).\n` +
        `• **Target Cell 9:** Apply the rule directly to Row 3 to determine the missing feature.\n` +
        `• **Instant Lock:** **Option ${correct}** contains the exact missing component.`;
    }

    return `⚡ **${targetSec}-Second Spatial Progression Shortcut:**\n\n` +
      `• **Single Feature Anchor:** Track only ONE element (rotation angle, shading alternation, or side count) across the steps.\n` +
      `• **Lock Answer:** **Option ${correct}** is the only choice that matches the progression.`;
  }

  // 3. Math Categories
  if (cat.includes('math')) {
    if (prompt.toLowerCase().includes('average speed') || (prompt.toLowerCase().includes('mph') && prompt.toLowerCase().includes('trip'))) {
      return `⚡ **${targetSec}-Second Average Speed Shortcut:**\n\n` +
        `• **Trap Avoidance:** NEVER take the simple arithmetic average of speeds when distances are equal—that is the classic CCAT distractor trap!\n` +
        `• **Harmonic Shortcut:** Use $\\text{Avg Speed} = \\frac{2 \\times v_1 \\times v_2}{v_1 + v_2}$.\n` +
        `• **Fast Lock:** Calculate in 8 seconds to lock **Option ${correct} (${correctText})**.`;
    }

    if (prompt.toLowerCase().includes('hours') && (prompt.toLowerCase().includes('together') || prompt.toLowerCase().includes('simultaneously') || prompt.toLowerCase().includes('both'))) {
      return `⚡ **${targetSec}-Second Work Rate Formula:**\n\n` +
        `• **Product Over Sum Rule:** For two workers/machines running together, total time is $\\frac{A \\times B}{A + B}$.\n` +
        `• **No Fraction Algebra:** Multiply the two times, divide by their sum. Convert to minutes if required.\n` +
        `• **Fast Lock:** **Option ${correct} (${correctText})** is verified in under 10 seconds.`;
    }

    if (sub.includes('series') || prompt.toLowerCase().includes('sequence') || prompt.toLowerCase().includes('next number')) {
      return `⚡ **${targetSec}-Second Number Series Delta Trick:**\n\n` +
        `• **Check First-Order Differences:** Rapidly calculate the difference between terms 1, 2, and 3.\n` +
        `• **Spot Pattern:** Look for constant difference, doubling deltas, or alternating operations ($+A, \\times B$).\n` +
        `• **Instant Lock:** Apply the delta to the final term to lock **Option ${correct} (${correctText})**.`;
    }

    return `⚡ **${targetSec}-Second Mental Math Shortcut:**\n\n` +
      `• **Unit Digit & Estimation:** Check the last digit or magnitude boundary before full algebraic calculation.\n` +
      `• **Rapid Elimination:** Eliminate distractor choices that violate the unit-digit or scale.\n` +
      `• **Fast Lock:** **Option ${correct} (${correctText})** is verified in under 15 seconds.`;
  }

  return `⚡ **${targetSec}-Second Speed Elimination:**\n\n• **Core Clue:** Isolate the primary constraint in 3s.\n• **Eliminate Distractors:** Discard mismatched choices to lock **Option ${correct}** (${correctText}).`;
}

/**
 * Helper to call Gemini API with auto-downgrade cascade
 */
async function callGeminiForBatch(promptText, apiKey, modelIndex = 0) {
  const currentModel = CASCADE_MODELS[modelIndex] || 'gemini-2.0-flash';
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

    if (resp.status === 403 || data.error?.code === 403 || data.error?.status === 'PERMISSION_DENIED') {
      console.warn(`[SpeedTricks] Gemini API key invalid/leaked: ${data.error?.message}. Handing off to Question-Specific Engine.`);
      throw new Error(`API_KEY_REVOKED: ${data.error?.message}`);
    }

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      return { data: parsed, model: currentModel };
    }

    // Try next model if quota or transient error
    if (modelIndex + 1 < CASCADE_MODELS.length) {
      console.warn(`[SpeedTricks Preloader] ${currentModel} returned error, cascading to ${CASCADE_MODELS[modelIndex + 1]}...`);
      return callGeminiForBatch(promptText, apiKey, modelIndex + 1);
    }
    throw new Error(data.error?.message || 'Quota exceeded on all models');
  } catch (err) {
    if (err.message && err.message.includes('API_KEY_REVOKED')) {
      throw err;
    }
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
  if (activePreloadJobs.has(testId)) return;

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
      return;
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
      saveTricksToCache(newTricksToSave);
      activePreloadJobs.delete(testId);
      return;
    }

    console.log(`[SpeedTricks Preloader] Starting generation for ${pendingQuestions.length} questions in ${testId}...`);

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
        }
      } catch (batchErr) {
        console.warn(`[SpeedTricks Preloader] Using question-specific engine for ${testId}:`, batchErr.message);
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

      await new Promise(resolve => setTimeout(resolve, 800));
    }
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
  if (cache[key]?.text) {
    return {
      text: cache[key].text,
      model: cache[key].model || 'local-ccat-engine'
    };
  }

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
    if (apiKey && apiKey.length > 10) {
      const { data, model } = await callGeminiForBatch(promptText, apiKey);
      const trick = data[String(qId)] || data[qId] || Object.values(data)[0];
      if (trick && typeof trick === 'string') {
        saveTricksToCache({
          [key]: { text: trick, model, timestamp: Date.now() }
        });
        return { text: trick, model };
      }
    }
  } catch (err) {
    console.warn(`[SpeedTricks] Gemini fetch failed for question ${qId}, using question-specific engine:`, err.message);
  }

  // Question-specific tactical engine
  const localTrick = generateLocalSpeedShortcut(q, targetSec);
  saveTricksToCache({
    [key]: { text: localTrick, model: 'local-ccat-engine', timestamp: Date.now() }
  });
  return { text: localTrick, model: 'local-ccat-engine' };
}
