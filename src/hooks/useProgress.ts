'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, CategoryId } from '@/types';
import { loadProgress, recordAttempt, toggleBookmark as toggleBM, saveProgress } from '@/utils/storage';
import { checkNewAchievements } from '@/utils/scoring';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const submitAnswer = useCallback((
    questionId: string,
    answer: number | string,
    correct: boolean,
    timeSpent: number,
    categoryId: CategoryId
  ) => {
    const updated = recordAttempt(questionId, answer, correct, timeSpent, categoryId);

    // Check for new achievements
    const newAchievements = checkNewAchievements(updated);
    if (newAchievements.length > 0) {
      updated.achievements.push(...newAchievements.map(a => a.id));
      saveProgress(updated);
    }

    setProgress({ ...updated });
    return { newAchievements };
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    const updated = toggleBM(questionId);
    setProgress({ ...updated });
  }, []);

  const refresh = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  return { progress, submitAnswer, toggleBookmark, refresh };
}
