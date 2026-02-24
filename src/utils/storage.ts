// ==========================================
// LocalStorage Utility Module
// ==========================================

import { UserProgress, UserPreferences, QuestionAttempt, CategoryId, CategoryProgress } from '@/types';

const STORAGE_KEY = 'plsql_learning_progress';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  fontSize: 14,
  autoSave: true,
};

const DEFAULT_PROGRESS: UserProgress = {
  totalAttempted: 0,
  correctAnswers: 0,
  categories: {},
  questionHistory: [],
  bookmarks: [],
  achievements: [],
  preferences: DEFAULT_PREFERENCES,
};

// --- Core CRUD ---

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROGRESS;
    return JSON.parse(data) as UserProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// --- Question History ---

export function recordAttempt(
  questionId: string,
  answer: number | string,
  correct: boolean,
  timeSpent: number,
  categoryId: CategoryId
): UserProgress {
  const progress = loadProgress();

  const attempt: QuestionAttempt = {
    questionId,
    timestamp: new Date().toISOString(),
    answer,
    correct,
    timeSpent,
  };

  progress.questionHistory.push(attempt);
  progress.totalAttempted += 1;
  if (correct) progress.correctAnswers += 1;

  // Update category stats
  if (!progress.categories[categoryId]) {
    progress.categories[categoryId] = { total: 0, attempted: 0, correct: 0 };
  }
  const cat = progress.categories[categoryId] as CategoryProgress;
  cat.attempted += 1;
  if (correct) cat.correct += 1;

  saveProgress(progress);
  return progress;
}

// --- Bookmarks ---

export function toggleBookmark(questionId: string): UserProgress {
  const progress = loadProgress();
  const idx = progress.bookmarks.indexOf(questionId);
  if (idx === -1) {
    progress.bookmarks.push(questionId);
  } else {
    progress.bookmarks.splice(idx, 1);
  }
  saveProgress(progress);
  return progress;
}

export function isBookmarked(questionId: string): boolean {
  const progress = loadProgress();
  return progress.bookmarks.includes(questionId);
}

// --- Preferences ---

export function savePreferences(prefs: Partial<UserPreferences>): void {
  const progress = loadProgress();
  progress.preferences = { ...progress.preferences, ...prefs };
  saveProgress(progress);
}

export function loadPreferences(): UserPreferences {
  return loadProgress().preferences;
}

// --- Export / Import ---

export function exportData(): string {
  return JSON.stringify(loadProgress(), null, 2);
}

export function importData(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr) as UserProgress;
    if (data && typeof data.totalAttempted === 'number') {
      saveProgress(data);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// --- Stats helpers ---

export function getQuestionStatus(questionId: string): 'unanswered' | 'correct' | 'incorrect' {
  const progress = loadProgress();
  const attempts = progress.questionHistory.filter(a => a.questionId === questionId);
  if (attempts.length === 0) return 'unanswered';
  return attempts[attempts.length - 1].correct ? 'correct' : 'incorrect';
}

export function getCategoryProgress(categoryId: CategoryId): CategoryProgress {
  const progress = loadProgress();
  return progress.categories[categoryId] || { total: 0, attempted: 0, correct: 0 };
}
