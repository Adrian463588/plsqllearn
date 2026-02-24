'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Code2, BarChart3, Trophy, ChevronRight,
  Database, Sparkles, Target, Zap, ArrowRight,
  BookMarked, Brain
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { useProgress } from '@/hooks/useProgress';

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Code2, BarChart3, Trophy, Database, Sparkles,
  Target, Zap, BookMarked, Brain,
};

const stats = [
  { label: 'Total Soal', value: '300+', icon: Target, color: 'from-blue-500 to-cyan-500' },
  { label: 'Kategori', value: '12', icon: BookOpen, color: 'from-violet-500 to-purple-500' },
  { label: 'Code Challenge', value: '100+', icon: Code2, color: 'from-emerald-500 to-green-500' },
  { label: 'Achievement', value: '12', icon: Trophy, color: 'from-amber-500 to-orange-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HomePage() {
  const { progress } = useProgress();
  const totalAttempted = progress?.totalAttempted || 0;
  const accuracy = totalAttempted > 0
    ? Math.round(((progress?.correctAnswers || 0) / totalAttempted) * 100)
    : 0;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-sm font-medium text-[var(--primary)] mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Platform Pembelajaran Interaktif
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-balance">
              Kuasai{' '}
              <span className="gradient-text">PL/SQL Oracle</span>
              <br />
              dengan Latihan Interaktif
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
              Pelajari PL/SQL dari dasar hingga mahir dengan 300+ soal latihan, code challenges, dan materi terstruktur. Tanpa registrasi, langsung mulai!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/belajar"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                >
                  Mulai Belajar
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/latihan"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-semibold text-lg hover:border-[var(--primary)]/50 transition-all"
                >
                  <Code2 className="w-5 h-5" />
                  Latihan Soal
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map(({ label, value, icon: Icon, color }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="glass-card p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-[var(--text-secondary)]">{label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Progress Card (if user has progress) */}
      {totalAttempted > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-lg">Lanjutkan belajar Anda!</h3>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                {totalAttempted} soal dijawab • {accuracy}% akurasi • {progress?.achievements?.length || 0} achievement
              </p>
            </div>
            <Link
              href="/progress"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
            >
              Lihat Progress <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">12 Kategori Pembelajaran</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Materi terstruktur dari dasar hingga lanjutan, mencakup semua aspek PL/SQL Oracle.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link
                href={`/belajar/${cat.id}`}
                className="block p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--primary)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
                  {cat.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {cat.totalMCQ} MCQ
                  </span>
                  <span className="flex items-center gap-1">
                    <Code2 className="w-3 h-3" />
                    {cat.totalCode} Code
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 sm:p-12 text-center text-white"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Siap untuk mulai?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Tidak perlu registrasi. Progress Anda disimpan otomatis di browser. Mulai belajar sekarang!
            </p>
            <Link
              href="/latihan"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Mulai Latihan <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
