// ==========================================
// PL/SQL Learning Website — Type Definitions
// ==========================================

// --- Category ---
export type CategoryId =
  | 'pengenalan-plsql'
  | 'variables-data-types'
  | 'control-structures'
  | 'cursors'
  | 'exception-handling'
  | 'procedures'
  | 'functions'
  | 'packages'
  | 'triggers'
  | 'collections'
  | 'records-advanced'
  | 'performance-best-practices';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string; // lucide icon name
  color: string; // tailwind color class
  totalMCQ: number;
  totalCode: number;
}

// --- Questions ---
export interface MCQuestion {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  type: 'multiple_choice';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
  reference?: string;
  tags: string[];
}

export interface ValidationRules {
  mustContain: string[];
  mustDeclare?: string[];
  structure?: string;
}

export interface CodeChallenge {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  type: 'code_challenge';
  question: string;
  requirements: string[];
  starterCode: string;
  solution: string;
  hints: string[];
  validationRules: ValidationRules;
  tags: string[];
}

export type Question = MCQuestion | CodeChallenge;

// --- User Progress ---
export interface CategoryProgress {
  total: number;
  attempted: number;
  correct: number;
}

export interface QuestionAttempt {
  questionId: string;
  timestamp: string;
  answer: number | string; // index for MCQ, code string for Code
  correct: boolean;
  timeSpent: number; // seconds
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: number;
  autoSave: boolean;
}

export interface UserProgress {
  totalAttempted: number;
  correctAnswers: number;
  categories: Partial<Record<CategoryId, CategoryProgress>>;
  questionHistory: QuestionAttempt[];
  bookmarks: string[];
  achievements: string[];
  preferences: UserPreferences;
}

// --- Achievement ---
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: 'total_attempted' | 'total_correct' | 'category_complete' | 'streak' | 'perfect_score';
    value: number;
    categoryId?: CategoryId;
  };
}

// --- Quiz ---
export interface QuizConfig {
  categories: CategoryId[];
  difficulties: Difficulty[];
  types: ('multiple_choice' | 'code_challenge')[];
  questionCount: number;
  timeLimit?: number; // minutes, undefined = no limit
  mode: 'practice' | 'exam' | 'custom';
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, number | string>;
  startTime: string;
  timeRemaining?: number;
  isFinished: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timeSpent: number;
  categoryBreakdown: Record<string, { total: number; correct: number }>;
}

// --- Learning Material ---
export interface LearningSection {
  id: string;
  title: string;
  content: string; // markdown
  codeExamples?: {
    title: string;
    code: string;
    explanation: string;
  }[];
}

export interface LearningMaterial {
  categoryId: CategoryId;
  title: string;
  description: string;
  sections: LearningSection[];
  estimatedTime: number; // minutes
}

// --- Filter ---
export interface QuestionFilter {
  categories: CategoryId[];
  difficulties: Difficulty[];
  types: ('multiple_choice' | 'code_challenge')[];
  status: 'all' | 'unanswered' | 'correct' | 'incorrect' | 'bookmarked';
}
