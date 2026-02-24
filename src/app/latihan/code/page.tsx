'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Lightbulb, Eye, EyeOff,
  CheckCircle2, XCircle, RotateCcw, Code2, Play
} from 'lucide-react';
import { getAllCodeChallenges } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import { CodeChallenge, Difficulty } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import { validateCode } from '@/utils/validation';

export default function CodeChallengePage() {
  const allCode = useMemo(() => getAllCodeChallenges(), []);
  const { submitAnswer } = useProgress();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [code, setCode] = useState(allCode[0]?.starterCode || '');
  const [hintLevel, setHintLevel] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean; errors: { message: string }[]; score: number;
  } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const challenge = allCode[currentIdx];
  const total = allCode.length;

  const diffColors: Record<Difficulty, string> = {
    Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    Hard: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  const handleRun = useCallback(() => {
    if (!challenge) return;
    const result = validateCode(code, challenge.validationRules);
    setValidationResult(result);
    setAttempts(prev => prev + 1);

    if (result.valid) {
      submitAnswer(challenge.id, code, true, 0, challenge.category);
    }
  }, [code, challenge, submitAnswer]);

  const handleNext = useCallback(() => {
    if (currentIdx < total - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setCode(allCode[nextIdx]?.starterCode || '');
      setHintLevel(0);
      setShowSolution(false);
      setValidationResult(null);
      setAttempts(0);
    }
  }, [currentIdx, total, allCode]);

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      setCurrentIdx(prevIdx);
      setCode(allCode[prevIdx]?.starterCode || '');
      setHintLevel(0);
      setShowSolution(false);
      setValidationResult(null);
      setAttempts(0);
    }
  }, [currentIdx, allCode]);

  const handleResetCode = () => {
    setCode(challenge?.starterCode || '');
    setValidationResult(null);
  };

  if (!challenge) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Code Challenge</h1>
          <p className="text-sm text-[var(--text-secondary)]">Soal {currentIdx + 1} dari {total}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${diffColors[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {CATEGORIES.find(c => c.id === challenge.category)?.name}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-1.5 bg-[var(--surface)] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
          animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Problem */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h2 className="font-semibold mb-3">{challenge.question}</h2>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-[var(--text-muted)]">Persyaratan:</h4>
              <ul className="space-y-1.5">
                {challenge.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hints */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Hints ({hintLevel}/{challenge.hints.length})
              </h4>
              {hintLevel < challenge.hints.length && (
                <button
                  onClick={() => setHintLevel(prev => prev + 1)}
                  className="text-xs text-[var(--primary)] font-medium hover:underline"
                >
                  Tampilkan Hint
                </button>
              )}
            </div>
            <AnimatePresence>
              {Array.from({ length: hintLevel }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-[var(--text-secondary)] mb-2 pl-3 border-l-2 border-amber-500/30"
                >
                  {challenge.hints[i]}
                </motion.div>
              ))}
            </AnimatePresence>

            {attempts >= 3 && !showSolution && (
              <button
                onClick={() => setShowSolution(true)}
                className="mt-2 text-xs text-[var(--primary)] font-medium flex items-center gap-1 hover:underline"
              >
                <Eye className="w-3.5 h-3.5" /> Lihat Solusi
              </button>
            )}
          </div>

          {/* Solution */}
          <AnimatePresence>
            {showSolution && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-green-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Solusi
                  </h4>
                  <button onClick={() => setShowSolution(false)}>
                    <EyeOff className="w-4 h-4 text-[var(--text-muted)]" />
                  </button>
                </div>
                <pre className="text-xs !bg-[var(--surface)]">{challenge.solution}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Editor */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
            {/* Editor toolbar */}
            <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface)]/50">
              <span className="text-xs font-medium text-[var(--text-muted)]">plsql_code.sql</span>
              <button
                onClick={handleResetCode}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Code textarea */}
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full min-h-[300px] p-4 font-mono text-sm bg-transparent border-0 outline-none resize-y"
              style={{ fontFamily: "'Fira Code', monospace", tabSize: 2 }}
              spellCheck={false}
              placeholder="-- Tulis kode PL/SQL Anda di sini..."
            />

            {/* Run button */}
            <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">Percobaan: {attempts}</span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRun}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium shadow-md"
              >
                <Play className="w-4 h-4" /> Jalankan
              </motion.button>
            </div>
          </div>

          {/* Validation Results */}
          <AnimatePresence>
            {validationResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`rounded-xl border p-5 ${
                  validationResult.valid
                    ? 'border-green-500/20 bg-green-500/5'
                    : 'border-red-500/20 bg-red-500/5'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {validationResult.valid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-semibold text-sm ${validationResult.valid ? 'text-green-600' : 'text-red-600'}`}>
                    {validationResult.valid ? 'Semua validasi berhasil!' : 'Ada kesalahan:'}
                  </span>
                  <span className="ml-auto text-xs font-medium tabular-nums">
                    Skor: {validationResult.score}/100
                  </span>
                </div>
                {validationResult.errors.length > 0 && (
                  <ul className="space-y-1.5">
                    {validationResult.errors.map((err, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        {err.message}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Sebelumnya
        </button>
        <button
          onClick={handleNext}
          disabled={currentIdx >= total - 1}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-[var(--primary)] text-white disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        >
          Selanjutnya <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
