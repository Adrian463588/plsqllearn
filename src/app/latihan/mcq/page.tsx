'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  Bookmark, BookmarkCheck, Lightbulb, ArrowRight,
  Filter, RotateCcw
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getAllMCQ } from '@/data/questions';
import { MCQuestion, CategoryId, Difficulty } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import { validateMCQ } from '@/utils/validation';
import { isBookmarked as checkBookmark } from '@/utils/storage';

export default function MCQPage() {
  const allMCQ = useMemo(() => getAllMCQ(), []);
  const { progress, submitAnswer, toggleBookmark } = useProgress();

  // Filters
  const [selectedCats, setSelectedCats] = useState<CategoryId[]>([]);
  const [selectedDiff, setSelectedDiff] = useState<Difficulty[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  // Quiz state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [startTime] = useState(() => Date.now());

  const filtered = useMemo(() => {
    let qs = allMCQ;
    if (selectedCats.length > 0) qs = qs.filter(q => selectedCats.includes(q.category));
    if (selectedDiff.length > 0) qs = qs.filter(q => selectedDiff.includes(q.difficulty));
    return qs;
  }, [allMCQ, selectedCats, selectedDiff]);

  const question = filtered[currentIdx];
  const total = filtered.length;

  const handleSubmit = useCallback(() => {
    if (selectedOption === null || !question) return;
    const result = validateMCQ(question, selectedOption);
    setFeedback({ correct: result.correct, explanation: result.explanation });
    setIsSubmitted(true);

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    submitAnswer(question.id, selectedOption, result.correct, timeSpent, question.category);
  }, [selectedOption, question, submitAnswer, startTime]);

  const handleNext = useCallback(() => {
    if (currentIdx < total - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setFeedback(null);
    }
  }, [currentIdx, total]);

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setFeedback(null);
    }
  }, [currentIdx]);

  const handleReset = useCallback(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setFeedback(null);
  }, []);

  const toggleCat = (catId: CategoryId) => {
    setSelectedCats(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
    handleReset();
  };

  const toggleDiff = (d: Difficulty) => {
    setSelectedDiff(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
    handleReset();
  };

  const diffColors: Record<Difficulty, string> = {
    Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    Hard: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  if (total === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-2">Tidak ada soal ditemukan</h2>
        <p className="text-[var(--text-secondary)] mb-4">Coba ubah filter kategori atau tingkat kesulitan.</p>
        <button onClick={() => { setSelectedCats([]); setSelectedDiff([]); }} className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium">Reset Filter</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Pilihan Ganda</h1>
          <p className="text-sm text-[var(--text-secondary)]">Soal {currentIdx + 1} dari {total}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              showFilter ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)]' : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)]'
            }`}
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[var(--surface)] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
          animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-4 overflow-hidden"
          >
            <div>
              <h4 className="text-xs font-semibold uppercase text-[var(--text-muted)] mb-2">Kategori</h4>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCat(cat.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                      selectedCats.includes(cat.id)
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-[var(--text-muted)] mb-2">Kesulitan</h4>
              <div className="flex gap-2">
                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
                  <button
                    key={d}
                    onClick={() => toggleDiff(d)}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      selectedDiff.includes(d) ? diffColors[d] : 'border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden"
        >
          {/* Question header */}
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${diffColors[question.difficulty]}`}>
                {question.difficulty}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {CATEGORIES.find(c => c.id === question.category)?.name}
              </span>
            </div>
            <button
              onClick={() => toggleBookmark(question.id)}
              className="p-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors"
            >
              {checkBookmark(question.id) ? (
                <BookmarkCheck className="w-4 h-4 text-amber-500" />
              ) : (
                <Bookmark className="w-4 h-4 text-[var(--text-muted)]" />
              )}
            </button>
          </div>

          {/* Question body */}
          <div className="px-6 py-5">
            <h2 className="text-base font-medium leading-relaxed mb-1">{question.question}</h2>

            {question.codeSnippet && (
              <pre className="mt-3 mb-4 text-sm">{question.codeSnippet}</pre>
            )}

            {/* Options */}
            <div className="space-y-2.5 mt-5">
              {question.options.map((opt, i) => {
                let optClass = 'border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--surface)]';

                if (isSubmitted) {
                  if (i === question.correctAnswer) {
                    optClass = 'border-green-500 bg-green-500/10';
                  } else if (i === selectedOption && i !== question.correctAnswer) {
                    optClass = 'border-red-500 bg-red-500/10';
                  } else {
                    optClass = 'border-[var(--border)] opacity-50';
                  }
                } else if (selectedOption === i) {
                  optClass = 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]/20';
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={!isSubmitted ? { scale: 1.01 } : {}}
                    whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                    onClick={() => !isSubmitted && setSelectedOption(i)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-start gap-3 ${optClass}`}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-semibold mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isSubmitted && i === question.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && i === selectedOption && i !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`mx-6 mb-5 p-4 rounded-lg border ${
                  feedback.correct
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {feedback.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className={`font-semibold text-sm ${feedback.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {feedback.correct ? 'Benar!' : 'Salah!'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    <Lightbulb className="inline w-3.5 h-3.5 mr-1 text-amber-500" />
                    {feedback.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>

            <div className="flex items-center gap-2">
              {!isSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  Jawab
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={currentIdx >= total - 1}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium disabled:opacity-40 transition-opacity"
                >
                  Selanjutnya <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            <span className="text-xs text-[var(--text-muted)] tabular-nums">
              {currentIdx + 1}/{total}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
