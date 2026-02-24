'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Target, Clock, Settings, Play, AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { CategoryId, Difficulty } from '@/types';

export default function UjianPage() {
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedCats, setSelectedCats] = useState<CategoryId[]>([]);
  const [selectedDiff, setSelectedDiff] = useState<Difficulty[]>([]);

  const timeLimit = questionCount; // 1 minute per question

  const toggleCat = (id: CategoryId) => {
    setSelectedCats(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleDiff = (d: Difficulty) => {
    setSelectedDiff(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Mode Ujian</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Uji kemampuan PL/SQL Anda dengan timer. Jawaban diperiksa setelah ujian selesai.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-6"
      >
        {/* Question count */}
        <div>
          <label className="text-sm font-semibold mb-3 block">Jumlah Soal</label>
          <div className="flex gap-3">
            {[10, 20, 30, 50].map(n => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  questionCount === n
                    ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)]'
                }`}
              >
                {n} soal
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm font-semibold mb-3 block">Kategori (kosong = semua)</label>
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

        {/* Difficulty */}
        <div>
          <label className="text-sm font-semibold mb-3 block">Kesulitan (kosong = semua)</label>
          <div className="flex gap-2">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => toggleDiff(d)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  selectedDiff.includes(d)
                    ? d === 'Easy' ? 'bg-green-500/10 border-green-500/30 text-green-600'
                      : d === 'Medium' ? 'bg-amber-500/10 border-amber-500/30 text-amber-600'
                        : 'bg-red-500/10 border-red-500/30 text-red-600'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-6 px-4 py-3 rounded-lg bg-[var(--surface)] text-sm">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[var(--primary)]" />
            <span>{questionCount} soal</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{timeLimit} menit</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm text-[var(--text-secondary)]">
          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p>Pada mode ujian, jawaban tidak akan ditampilkan sampai semua soal selesai. Timer akan berjalan otomatis.</p>
        </div>

        {/* Start Button */}
        <Link
          href="/latihan/mcq"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Play className="w-5 h-5" />
          Mulai Ujian
        </Link>
      </motion.div>
    </div>
  );
}
