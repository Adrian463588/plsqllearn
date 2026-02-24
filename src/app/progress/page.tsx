'use client';

import { motion } from 'framer-motion';
import {
  BarChart3, Target, CheckCircle2, Trophy, TrendingUp,
  BookMarked, Clock, Award, Flame
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { getPerformanceMetrics } from '@/utils/scoring';
import { CATEGORIES } from '@/data/categories';
import { ACHIEVEMENTS } from '@/data/achievements';

export default function ProgressPage() {
  const { progress } = useProgress();

  if (!progress || progress.totalAttempted === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Belum ada progress</h2>
        <p className="text-[var(--text-secondary)] mb-6">Mulai menjawab soal untuk melihat statistik dan progress Anda.</p>
        <a
          href="/latihan"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Target className="w-5 h-5" /> Mulai Latihan
        </a>
      </div>
    );
  }

  const metrics = getPerformanceMetrics(progress);

  const statCards = [
    { label: 'Soal Dijawab', value: metrics.totalAttempted, icon: Target, color: 'from-blue-500 to-cyan-500' },
    { label: 'Benar', value: metrics.totalCorrect, icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
    { label: 'Akurasi', value: `${metrics.accuracy}%`, icon: TrendingUp, color: 'from-violet-500 to-purple-500' },
    { label: 'Streak', value: metrics.streak, icon: Flame, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Progress Anda</h1>
        <p className="text-[var(--text-secondary)] mb-8">Lihat statistik pembelajaran dan raih achievement.</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-[var(--text-secondary)]">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
            Progress per Kategori
          </h3>
          <div className="space-y-3">
            {CATEGORIES.map(cat => {
              const catData = metrics.categoryStats.find(c => c.categoryId === cat.id);
              const attempted = catData?.attempted || 0;
              const accuracy = catData?.accuracy || 0;
              const total = cat.totalMCQ + cat.totalCode;
              const pct = total > 0 ? Math.round((attempted / total) * 100) : 0;

              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)] truncate flex-1">{cat.name}</span>
                    <span className="text-xs text-[var(--text-muted)] ml-2 tabular-nums">
                      {attempted}/{total} ({accuracy}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Achievement ({progress.achievements.length}/{ACHIEVEMENTS.length})
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map(ach => {
              const earned = progress.achievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    earned
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-[var(--border)] opacity-40 grayscale'
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {earned ? '🏆' : '🔒'}
                  </div>
                  <div className="text-xs font-semibold">{ach.name}</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{ach.description}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      {progress.questionHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--text-secondary)]" />
            Aktivitas Terakhir
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {[...progress.questionHistory].reverse().slice(0, 20).map((attempt, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-2">
                  {attempt.correct ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] text-red-500">✕</span>
                  )}
                  <span className="text-[var(--text-secondary)]">{attempt.questionId}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  {new Date(attempt.timestamp).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
