const ATTEMPTS_KEY = 'ccat_prep_attempts_v1';
const SETTINGS_KEY = 'ccat_prep_settings_v1';

export function getAttempts() {
  try {
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

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { geminiApiKey: '', soundEnabled: true, timerWarning: true };
  } catch (err) {
    return { geminiApiKey: '', soundEnabled: true, timerWarning: true };
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
