// ==========================================
// Quiz Engine Module
// ==========================================

import { Question, QuestionFilter, QuizConfig, CategoryId, Difficulty } from '@/types';
import { getAllQuestions } from '@/data/questions';
import { getQuestionStatus } from '@/utils/storage';

export function loadQuestions(filter: QuestionFilter): Question[] {
  let questions = getAllQuestions();

  // Filter by categories
  if (filter.categories.length > 0) {
    questions = questions.filter(q => filter.categories.includes(q.category));
  }

  // Filter by difficulty
  if (filter.difficulties.length > 0) {
    questions = questions.filter(q => filter.difficulties.includes(q.difficulty));
  }

  // Filter by type
  if (filter.types.length > 0) {
    questions = questions.filter(q => filter.types.includes(q.type));
  }

  // Filter by status
  if (filter.status !== 'all') {
    questions = questions.filter(q => {
      const status = getQuestionStatus(q.id);
      switch (filter.status) {
        case 'unanswered': return status === 'unanswered';
        case 'correct': return status === 'correct';
        case 'incorrect': return status === 'incorrect';
        case 'bookmarked': return false; // handled separately
        default: return true;
      }
    });
  }

  return questions;
}

export function shuffleQuestions<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuiz(config: QuizConfig): Question[] {
  const filter: QuestionFilter = {
    categories: config.categories,
    difficulties: config.difficulties,
    types: config.types,
    status: 'all',
  };

  let questions = loadQuestions(filter);
  questions = shuffleQuestions(questions);

  return questions.slice(0, config.questionCount);
}

export function getQuestionsByCategory(categoryId: CategoryId): Question[] {
  return getAllQuestions().filter(q => q.category === categoryId);
}

export function getQuestionCountByCategory(): Record<CategoryId, { mcq: number; code: number; total: number }> {
  const questions = getAllQuestions();
  const counts = {} as Record<CategoryId, { mcq: number; code: number; total: number }>;

  for (const q of questions) {
    if (!counts[q.category]) {
      counts[q.category] = { mcq: 0, code: 0, total: 0 };
    }
    if (q.type === 'multiple_choice') counts[q.category].mcq += 1;
    else counts[q.category].code += 1;
    counts[q.category].total += 1;
  }

  return counts;
}

export function searchQuestions(query: string): Question[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getAllQuestions().filter(
    question =>
      question.question.toLowerCase().includes(q) ||
      question.tags.some(tag => tag.toLowerCase().includes(q)) ||
      question.category.toLowerCase().includes(q)
  );
}

export function getDifficultyDistribution(): Record<Difficulty, number> {
  const questions = getAllQuestions();
  return {
    Easy: questions.filter(q => q.difficulty === 'Easy').length,
    Medium: questions.filter(q => q.difficulty === 'Medium').length,
    Hard: questions.filter(q => q.difficulty === 'Hard').length,
  };
}
