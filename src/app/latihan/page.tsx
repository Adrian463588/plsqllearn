'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Code2, ClipboardCheck, Shuffle, Filter,
  ChevronRight, Target, Trophy
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

const modes = [
  {
    id: 'mcq',
    href: '/latihan/mcq',
    title: 'Pilihan Ganda',
    description: 'Jawab soal pilihan ganda dengan feedback instan dan penjelasan lengkap.',
    icon: ClipboardCheck,
    color: 'from-blue-500 to-cyan-500',
    features: ['200+ soal MCQ', 'Feedback instan', 'Penjelasan jawaban'],
  },
  {
    id: 'code',
    href: '/latihan/code',
    title: 'Code Challenge',
    description: 'Tulis kode PL/SQL langsung di editor dengan validasi syntax dan hint.',
    icon: Code2,
    color: 'from-violet-500 to-purple-500',
    features: ['100+ tantangan', 'Code editor', 'Hint & solusi'],
  },
  {
    id: 'exam',
    href: '/ujian',
    title: 'Mode Ujian',
    description: 'Uji kemampuan dengan timer dan tanpa feedback instan. Review di akhir.',
    icon: Target,
    color: 'from-orange-500 to-red-500',
    features: ['Timer countdown', 'Simulasi ujian', 'Review lengkap'],
  },
];

export default function LatihanPage() {
  const { progress } = useProgress();
  const totalAttempted = progress?.totalAttempted || 0;
  const totalCorrect = progress?.correctAnswers || 0;
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">Latihan Soal</h1>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          Pilih mode latihan yang sesuai. Practice mode untuk belajar, exam mode untuk uji kemampuan.
        </p>
      </motion.div>

      {/* Quick Stats */}
      {totalAttempted > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-[var(--primary)]">{totalAttempted}</div>
            <div className="text-xs text-[var(--text-secondary)]">Soal Dijawab</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-[var(--success)]">{totalCorrect}</div>
            <div className="text-xs text-[var(--text-secondary)]">Jawaban Benar</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-[var(--accent)]">{accuracy}%</div>
            <div className="text-xs text-[var(--text-secondary)]">Akurasi</div>
          </div>
        </motion.div>
      )}

      {/* Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
          >
            <Link
              href={mode.href}
              className="block p-6 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30 hover:shadow-xl transition-all duration-300 group h-full"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                <mode.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                {mode.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {mode.description}
              </p>

              <ul className="space-y-2 mb-5">
                {mode.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2 transition-all">
                Mulai <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
