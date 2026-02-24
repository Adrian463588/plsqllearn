'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Code2, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { useProgress } from '@/hooks/useProgress';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function BelajarPage() {
  const { progress } = useProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">Materi Pembelajaran</h1>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          Pelajari PL/SQL Oracle step-by-step dari 12 kategori terstruktur. Setiap kategori berisi penjelasan konsep, contoh kode, dan latihan soal.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {CATEGORIES.map((cat, index) => {
          const catProgress = progress?.categories?.[cat.id];
          const attempted = catProgress?.attempted || 0;
          const correct = catProgress?.correct || 0;
          const total = cat.totalMCQ + cat.totalCode;
          const progressPct = total > 0 ? Math.round((attempted / total) * 100) : 0;

          return (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link
                href={`/belajar/${cat.id}`}
                className="block p-6 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30 hover:shadow-xl transition-all duration-300 group h-full"
              >
                {/* Category number */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="font-bold text-base mb-1.5 group-hover:text-[var(--primary)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {cat.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {cat.totalMCQ} Pilihan Ganda
                  </span>
                  <span className="flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" />
                    {cat.totalCode} Code
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[var(--text-muted)]">
                      {attempted > 0 ? `${attempted}/${total} dikerjakan` : 'Belum mulai'}
                    </span>
                    {attempted > 0 && (
                      <span className="font-medium text-[var(--primary)]">{progressPct}%</span>
                    )}
                  </div>
                  <div className="w-full h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
