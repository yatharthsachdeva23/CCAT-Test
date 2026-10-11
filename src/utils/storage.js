import { buildTest } from '../data/testCatalog.js';

const ATTEMPTS_KEY = 'ccat_prep_attempts_v1';
const SETTINGS_KEY = 'ccat_prep_settings_v1';
export const DEFAULT_GEMINI_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY)
  ? import.meta.env.VITE_GEMINI_API_KEY.trim()
  : '';

/**
 * Lightweight Attempt Serialization
 * Strips out heavy vector SVG markup and redundant question definitions
 * before persisting to localStorage, reducing storage size from ~120KB to ~3KB per attempt.
 */
export function serializeAttemptForStorage(attempt) {
  if (!attempt) return attempt;
  const {
    id,
    testId,
    testTitle,
    timestamp,
    totalQuestions,
    timeLimitSec,
    totalSecondsUsed,
    timeRanOut,
    endedEarly,
    responses
  } = attempt;

  return {
    id,
    testId,
    testTitle,
    timestamp,
    totalQuestions: totalQuestions || 50,
    timeLimitSec: timeLimitSec || 900,
    totalSecondsUsed: totalSecondsUsed || 0,
    timeRanOut: !!timeRanOut,
    endedEarly: !!endedEarly,
    responses: responses || {}
  };
}

/**
 * On-Read Question Hydration
 * Restores the complete 50 questions deterministically from buildTest so that
 * ScoreReview, PatternEngine, AICoach, and review screens have full SVG/question data.
 */
export function hydrateAttempt(attempt) {
  if (!attempt) return attempt;
  if (attempt.questions && Array.isArray(attempt.questions) && attempt.questions.length > 0) {
    return attempt;
  }

  const match = attempt.testId?.match(/test-(\d+)/);
  if (match) {
    const testNum = parseInt(match[1], 10);
    try {
      const fullTest = buildTest(testNum);
      return {
        ...attempt,
        questions: fullTest.questions
      };
    } catch (e) {
      console.warn(`[storage] Could not hydrate questions for test ${testNum}:`, e);
    }
  }

  return attempt;
}

export function getAttempts() {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    let hasBloatedAttempts = false;
    const hydrated = parsed.map(att => {
      if (att && att.questions && Array.isArray(att.questions) && att.questions.length > 0) {
        hasBloatedAttempts = true;
      }
      return hydrateAttempt(att);
    });

    // Auto-migrate legacy storage: free up quota immediately if bloated
    if (hasBloatedAttempts) {
      try {
        const slimList = parsed.map(serializeAttemptForStorage);
        localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(slimList));
        console.info('[storage] Successfully migrated legacy attempts to lightweight format, freed storage space.');
      } catch (migrationErr) {
        // Non-blocking
      }
    }

    return hydrated;
  } catch (err) {
    console.error('Failed to load attempts from storage', err);
    return [];
  }
}

export function saveAttempt(attempt) {
  if (!attempt) return getAttempts();

  // Ensure attempt has hydrated questions in memory
  const inMemoryAttempt = hydrateAttempt(attempt);

  // Retrieve current attempts and replace or prepend
  const currentAttempts = getAttempts();
  const existingAttempts = currentAttempts.filter(a => a.id !== attempt.id);
  const updatedHydrated = [inMemoryAttempt, ...existingAttempts];

  // Serialized lightweight representation (omits heavy `questions` array)
  const serializedList = updatedHydrated.map(serializeAttemptForStorage);

  try {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(serializedList));
    return updatedHydrated;
  } catch (err) {
    console.warn('[storage] Quota exceeded on first saveAttempt, initiating recovery...', err);
  }

  // Recovery Stage 1: Prune transient AI cache and active session
  try {
    localStorage.removeItem('ccat_ai_speed_tricks_cache_v3');
    localStorage.removeItem('ccat_ai_speed_tricks_cache_v2');
    localStorage.removeItem('ccat_prep_speed_tricks_cache_v1');
    localStorage.removeItem('ccat_prep_active_session_v1');
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(serializedList));
    console.info('[storage] Successfully saved attempt after Stage 1 recovery.');
    return updatedHydrated;
  } catch (err) {
    console.warn('[storage] Stage 1 recovery insufficient, trying Stage 2...', err);
  }

  // Recovery Stage 2: Clear any other cache/temporary keys
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key !== ATTEMPTS_KEY && (key.includes('cache') || key.includes('temp') || key.includes('backup'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(serializedList));
    console.info('[storage] Successfully saved attempt after Stage 2 recovery.');
    return updatedHydrated;
  } catch (err) {
    console.warn('[storage] Stage 2 recovery insufficient, trying Stage 3...', err);
  }

  // Recovery Stage 3: Keep the 50 most recent attempts
  try {
    const trimmedSerialized = serializedList.slice(0, 50);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(trimmedSerialized));
    console.info('[storage] Successfully saved attempt after Stage 3 recovery (trimmed to 50).');
    return updatedHydrated.slice(0, 50);
  } catch (err) {
    console.error('[storage] Critical: Failed to write to localStorage', err);
    // CRITICAL: NEVER return []! Return in-memory attempts so UI never gets wiped!
    return updatedHydrated;
  }
}

export function getAttemptById(attemptId) {
  const attempts = getAttempts();
  return attempts.find(a => a.id === attemptId) || null;
}

export function clearAllAttempts() {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

const ULTRAFAST_ATTEMPTS_KEY = 'ccat_prep_ultrafast_attempts_v1';

export function getUltraFastAttempts() {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(ULTRAFAST_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load ultra fast attempts from storage', err);
    return [];
  }
}

export function saveUltraFastAttempt(sprintAttempt) {
  const existing = getUltraFastAttempts();
  const updated = [sprintAttempt, ...existing.filter(a => a.id !== sprintAttempt.id)];
  try {
    localStorage.setItem(ULTRAFAST_ATTEMPTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('[storage] Quota exceeded on saveUltraFastAttempt, pruning old sprints...', err);
    try {
      // Keep most recent 30 sprints
      const trimmed = updated.slice(0, 30);
      localStorage.setItem(ULTRAFAST_ATTEMPTS_KEY, JSON.stringify(trimmed));
      return trimmed;
    } catch (e2) {
      console.error('Failed to save ultra fast attempt', e2);
      // NEVER return []! Return updated in-memory list
      return updated;
    }
  }
}

export function deleteUltraFastAttempt(sprintId) {
  const existing = getUltraFastAttempts();
  const updated = existing.filter(a => a.id !== sprintId);
  try {
    localStorage.setItem(ULTRAFAST_ATTEMPTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete ultra fast attempt', err);
    return updated;
  }
}

export function clearUltraFastAttempts() {
  try {
    localStorage.removeItem(ULTRAFAST_ATTEMPTS_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

export function getSettings() {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return {
        geminiApiKey: DEFAULT_GEMINI_KEY,
        soundEnabled: true,
        timerWarning: true,
        preferredModel: 'auto',
        autoDowngradeEnabled: true
      };
    }
    const raw = localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      geminiApiKey: (parsed.geminiApiKey && parsed.geminiApiKey.trim().length > 0) ? parsed.geminiApiKey.trim() : DEFAULT_GEMINI_KEY,
      soundEnabled: parsed.soundEnabled ?? true,
      timerWarning: parsed.timerWarning ?? true,
      preferredModel: parsed.preferredModel || 'auto',
      autoDowngradeEnabled: parsed.autoDowngradeEnabled ?? true
    };
  } catch (err) {
    return { 
      geminiApiKey: DEFAULT_GEMINI_KEY, 
      soundEnabled: true, 
      timerWarning: true,
      preferredModel: 'auto',
      autoDowngradeEnabled: true
    };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (err) {
    return false;
  }
}

const ACTIVE_SESSION_KEY = 'ccat_prep_active_session_v1';

export function saveActiveSession(sessionData) {
  try {
    if (!sessionData) return false;
    // Strip heavy `questions` array to keep session payload under 2KB
    const { questions, ...rest } = sessionData;
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(rest));
    return true;
  } catch (err) {
    console.error('Failed to auto-save active test session', err);
    return false;
  }
}

export function getActiveSession() {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && !session.questions && session.testId) {
      const match = session.testId.match(/test-(\d+)/);
      if (match) {
        const testNum = parseInt(match[1], 10);
        try {
          const testData = buildTest(testNum);
          session.questions = testData.questions;
        } catch (e) {}
      }
    }
    return session;
  } catch (err) {
    return null;
  }
}

export function clearActiveSession() {
  try {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Export all user progress & attempts to a JSON backup string
 */
export function exportUserDataJSON() {
  const attempts = getAttempts().map(serializeAttemptForStorage);
  const ultraFastAttempts = getUltraFastAttempts();
  const settings = getSettings();

  return JSON.stringify({
    app: 'CCAT Master Pro Prep',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    attemptsCount: attempts.length,
    attempts,
    ultraFastAttempts,
    settings: {
      soundEnabled: settings.soundEnabled,
      timerWarning: settings.timerWarning,
      preferredModel: settings.preferredModel,
      autoDowngradeEnabled: settings.autoDowngradeEnabled
    }
  }, null, 2);
}

/**
 * Triggers a browser download of the user's progress backup JSON
 */
export function downloadUserDataBackup() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const jsonStr = exportUserDataJSON();
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `ccat-prep-progress-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Restores user attempts and progress from a JSON string or file
 */
export function importUserDataJSON(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    if (!data) return { success: false, error: 'Empty or invalid file' };

    let count = 0;
    if (Array.isArray(data.attempts)) {
      const slimList = data.attempts.map(serializeAttemptForStorage);
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(slimList));
      count = slimList.length;
    }

    if (Array.isArray(data.ultraFastAttempts)) {
      localStorage.setItem(ULTRAFAST_ATTEMPTS_KEY, JSON.stringify(data.ultraFastAttempts));
    }

    if (data.settings && typeof data.settings === 'object') {
      const current = getSettings();
      saveSettings({ ...current, ...data.settings });
    }

    return { success: true, count };
  } catch (err) {
    console.error('Failed to import user progress JSON', err);
    return { success: false, error: err.message };
  }
}

/**
 * Reset all progress (full fresh start)
 */
export function resetAllUserData() {
  clearAllAttempts();
  clearUltraFastAttempts();
  clearActiveSession();
  return true;
}
