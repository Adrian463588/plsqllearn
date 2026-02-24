// ==========================================
// Scoring & Achievement Module
// ==========================================

import { UserProgress, Achievement, QuizResult, CategoryId } from '@/types';
import { ACHIEVEMENTS } from '@/data/achievements';

export function calculateQuizResult(
  answers: Record<string, { correct: boolean; timeSpent: number }>,
  questions: { id: string; category: CategoryId }[]
): QuizResult {
  let correctCount = 0;
  let totalTime = 0;
  const categoryBreakdown: Record<string, { total: number; correct: number }> = {};

  for (const q of questions) {
    const cat = q.category;
    if (!categoryBreakdown[cat]) categoryBreakdown[cat] = { total: 0, correct: 0 };
    categoryBreakdown[cat].total += 1;

    const answer = answers[q.id];
    if (answer) {
      totalTime += answer.timeSpent;
      if (answer.correct) {
        correctCount += 1;
        categoryBreakdown[cat].correct += 1;
      }
    }
  }

  return {
    totalQuestions: questions.length,
    correctAnswers: correctCount,
    percentage: questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0,
    timeSpent: totalTime,
    categoryBreakdown,
  };
}

export function checkNewAchievements(progress: UserProgress): Achievement[] {
  const newAchievements: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (progress.achievements.includes(achievement.id)) continue;

    let earned = false;
    const { type, value, categoryId } = achievement.condition;

    switch (type) {
      case 'total_attempted':
        earned = progress.totalAttempted >= value;
        break;
      case 'total_correct':
        earned = progress.correctAnswers >= value;
        break;
      case 'category_complete':
        if (categoryId) {
          const cat = progress.categories[categoryId];
          earned = cat ? cat.attempted >= value : false;
        }
        break;
      case 'streak':
        earned = calculateStreak(progress) >= value;
        break;
      case 'perfect_score':
        earned = hasPerfectScore(progress, value);
        break;
    }

    if (earned) newAchievements.push(achievement);
  }

  return newAchievements;
}

function calculateStreak(progress: UserProgress): number {
  const history = [...progress.questionHistory].reverse();
  let streak = 0;
  for (const attempt of history) {
    if (attempt.correct) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function hasPerfectScore(progress: UserProgress, minQuestions: number): boolean {
  const recent = progress.questionHistory.slice(-minQuestions);
  if (recent.length < minQuestions) return false;
  return recent.every(a => a.correct);
}

export function getPerformanceMetrics(progress: UserProgress) {
  const totalAttempted = progress.totalAttempted;
  const accuracy = totalAttempted > 0
    ? Math.round((progress.correctAnswers / totalAttempted) * 100)
    : 0;

  const categoryStats = Object.entries(progress.categories).map(([id, cat]) => ({
    categoryId: id as CategoryId,
    attempted: cat?.attempted || 0,
    correct: cat?.correct || 0,
    accuracy: (cat?.attempted || 0) > 0
      ? Math.round(((cat?.correct || 0) / (cat?.attempted || 0)) * 100)
      : 0,
  }));

  const streak = calculateStreak(progress);

  // Strengths: categories with >70% accuracy and at least 5 attempted
  const strengths = categoryStats.filter(c => c.accuracy >= 70 && c.attempted >= 5);
  // Weaknesses: categories with <50% accuracy and at least 3 attempted
  const weaknesses = categoryStats.filter(c => c.accuracy < 50 && c.attempted >= 3);

  return {
    totalAttempted,
    totalCorrect: progress.correctAnswers,
    accuracy,
    streak,
    categoryStats,
    strengths,
    weaknesses,
    achievementCount: progress.achievements.length,
    bookmarkCount: progress.bookmarks.length,
  };
}
