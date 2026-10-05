const ATTEMPTS_KEY = 'ccat_prep_attempts_v1';
const SETTINGS_KEY = 'ccat_prep_settings_v1';
export const DEFAULT_GEMINI_KEY = 'AIzaSyBL7Iy02c9KIOVRLFUAlkgmr1T-6w62S70';

export function getAttempts() {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load attempts from storage', err);
    return [];
  }
}

export function saveAttempt(attempt) {
  try {
    const attempts = getAttempts();
    const updated = [attempt, ...attempts];
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save attempt', err);
    return [];
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
    const raw = localStorage.getItem(ULTRAFAST_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load ultra fast attempts from storage', err);
    return [];
  }
}

export function saveUltraFastAttempt(sprintAttempt) {
  try {
    const existing = getUltraFastAttempts();
    const updated = [sprintAttempt, ...existing];
    localStorage.setItem(ULTRAFAST_ATTEMPTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save ultra fast attempt', err);
    return [];
  }
}

export function deleteUltraFastAttempt(sprintId) {
  try {
    const existing = getUltraFastAttempts();
    const updated = existing.filter(a => a.id !== sprintId);
    localStorage.setItem(ULTRAFAST_ATTEMPTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete ultra fast attempt', err);
    return [];
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
    const raw = localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      geminiApiKey: parsed.geminiApiKey || DEFAULT_GEMINI_KEY,
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
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionData));
    return true;
  } catch (err) {
    console.error('Failed to auto-save active test session', err);
    return false;
  }
}

export function getActiveSession() {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
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
