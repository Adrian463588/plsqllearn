// ==========================================
// Code Validation Module
// ==========================================

import { ValidationRules, MCQuestion } from '@/types';

export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  line?: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  score: number; // 0–100
}

// --- MCQ Validation ---

export function validateMCQ(question: MCQuestion, selectedAnswer: number): {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
} {
  return {
    correct: selectedAnswer === question.correctAnswer,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  };
}

// --- Code Validation ---

export function validateCode(code: string, rules: ValidationRules): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Basic syntax checks
  const syntaxErrors = checkBasicSyntax(code);
  errors.push(...syntaxErrors);

  // 2. Check must_contain keywords
  if (rules.mustContain) {
    for (const keyword of rules.mustContain) {
      if (!code.toUpperCase().includes(keyword.toUpperCase())) {
        errors.push({
          type: 'error',
          message: `Kode harus mengandung keyword: ${keyword}`,
        });
      }
    }
  }

  // 3. Check must_declare variables
  if (rules.mustDeclare) {
    for (const variable of rules.mustDeclare) {
      const regex = new RegExp(`\\b${variable}\\b`, 'i');
      if (!regex.test(code)) {
        errors.push({
          type: 'error',
          message: `Variabel "${variable}" harus dideklarasikan`,
        });
      }
    }
  }

  // 4. Check structure
  if (rules.structure === 'anonymous_block') {
    if (!code.toUpperCase().includes('BEGIN')) {
      errors.push({ type: 'error', message: 'Anonymous block harus memiliki bagian BEGIN' });
    }
    if (!/END\s*;/i.test(code)) {
      errors.push({ type: 'error', message: 'Anonymous block harus diakhiri dengan END;' });
    }
  }

  const totalChecks =
    (rules.mustContain?.length || 0) +
    (rules.mustDeclare?.length || 0) +
    (rules.structure ? 1 : 0) + 1; // +1 for syntax
  const passedChecks = totalChecks - errors.length;
  const score = Math.max(0, Math.round((passedChecks / totalChecks) * 100));

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    score,
  };
}

function checkBasicSyntax(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const trimmed = code.trim();

  if (!trimmed) {
    errors.push({ type: 'error', message: 'Kode tidak boleh kosong' });
    return errors;
  }

  // Check bracket matching
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push({ type: 'error', message: 'Jumlah tanda kurung buka dan tutup tidak seimbang' });
  }

  // Check if ends with ; or /
  const lastLine = trimmed.split('\n').filter(l => l.trim() && !l.trim().startsWith('--')).pop()?.trim() || '';
  if (lastLine && !lastLine.endsWith(';') && !lastLine.endsWith('/')) {
    errors.push({
      type: 'warning' as const,
      message: 'Baris terakhir sebaiknya diakhiri dengan ; atau /',
    });
  }

  // Check BEGIN without END
  const hasBegin = /\bBEGIN\b/i.test(trimmed);
  const hasEnd = /\bEND\b/i.test(trimmed);
  if (hasBegin && !hasEnd) {
    errors.push({ type: 'error', message: 'BEGIN tanpa END yang sesuai' });
  }
  if (!hasBegin && hasEnd) {
    errors.push({ type: 'error', message: 'END tanpa BEGIN yang sesuai' });
  }

  return errors;
}

// --- Highlight matching keywords for display ---

export function highlightKeywords(code: string): string {
  const keywords = [
    'DECLARE', 'BEGIN', 'END', 'EXCEPTION', 'WHEN', 'THEN', 'ELSE', 'ELSIF', 'IF',
    'LOOP', 'WHILE', 'FOR', 'EXIT', 'CONTINUE', 'RETURN', 'CASE',
    'CREATE', 'OR', 'REPLACE', 'PROCEDURE', 'FUNCTION', 'PACKAGE', 'BODY', 'TRIGGER',
    'IS', 'AS', 'IN', 'OUT', 'CURSOR', 'OPEN', 'FETCH', 'CLOSE',
    'SELECT', 'INTO', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'SET',
    'VARCHAR2', 'NUMBER', 'DATE', 'BOOLEAN', 'INTEGER', 'CHAR',
    'DBMS_OUTPUT', 'PUT_LINE', 'RAISE', 'RAISE_APPLICATION_ERROR',
    'NULL', 'NOT', 'AND', '%TYPE', '%ROWTYPE', '%FOUND', '%NOTFOUND', '%ROWCOUNT',
    'BULK', 'COLLECT', 'FORALL', 'TABLE', 'VARRAY', 'RECORD', 'TYPE',
    'PRAGMA', 'EXCEPTION_INIT', 'AUTONOMOUS_TRANSACTION',
    'COMMIT', 'ROLLBACK', 'SAVEPOINT',
  ];

  let result = code;
  for (const kw of keywords) {
    const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
    result = result.replace(regex, `<span class="keyword">$1</span>`);
  }
  return result;
}
