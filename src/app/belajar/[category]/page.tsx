'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, BookOpen, Code2, ArrowRight,
  Clock, ChevronDown, ChevronUp, Copy, Check, GraduationCap
} from 'lucide-react';
import { CATEGORIES, getCategoryById } from '@/data/categories';
import { getQuestionsByCategory } from '@/utils/quizEngine';
import { learningMaterials } from '@/data/learning-materials';
import { LearningSection } from '@/types';

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[var(--border)]">
        <span className="text-xs font-medium text-[var(--text-muted)]">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Tersalin!' : 'Copy'}
        </button>
      </div>
      <pre className="!rounded-none !border-0 !m-0 text-xs sm:text-sm leading-relaxed overflow-x-auto">
        {code}
      </pre>
    </div>
  );
}

function SectionCard({ section, index }: { section: LearningSection; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden"
    >
      {/* Section header — clickable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[var(--surface)]/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-xs font-bold text-[var(--primary)]">
            {index + 1}
          </span>
          <h3 className="font-semibold text-sm sm:text-base">{section.title}</h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5">
              {/* Content text */}
              <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {section.content.split('\n').map((line, i) => {
                  // Simple markdown rendering
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={i} className="font-semibold text-[var(--text-primary)] mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                  }
                  if (line.startsWith('| ')) {
                    return null; // Skip table rows — handled below
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <div key={i} className="flex items-start gap-2 ml-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                        <span>{line.substring(2)}</span>
                      </div>
                    );
                  }
                  if (line.startsWith('```')) return null;
                  if (line.trim() === '') return <div key={i} className="h-2" />;
                  return <p key={i}>{line}</p>;
                })}

                {/* Render tables from content */}
                {section.content.includes('| ') && (
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-sm border-collapse">
                      {section.content
                        .split('\n')
                        .filter(l => l.startsWith('| '))
                        .map((row, ri) => {
                          const cells = row.split('|').filter(c => c.trim());
                          const isSeparator = cells.every(c => c.trim().match(/^[-:]+$/));
                          if (isSeparator) return null;
                          const isHeader = ri === 0;
                          return (
                            <tr key={ri} className={isHeader ? 'bg-[var(--surface)]' : 'border-b border-[var(--border)]'}>
                              {cells.map((cell, ci) => (
                                isHeader ? (
                                  <th key={ci} className="px-3 py-2 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">
                                    {cell.trim()}
                                  </th>
                                ) : (
                                  <td key={ci} className="px-3 py-2 text-xs text-[var(--text-secondary)]">
                                    {cell.trim()}
                                  </td>
                                )
                              ))}
                            </tr>
                          );
                        })}
                    </table>
                  </div>
                )}
              </div>

              {/* Code examples */}
              {section.codeExamples && section.codeExamples.length > 0 && (
                <div className="space-y-4">
                  {section.codeExamples.map((ex, i) => (
                    <div key={i} className="space-y-2">
                      <CodeBlock code={ex.code} title={ex.title} />
                      <div className="px-3 py-2 rounded-lg bg-blue-500/5 border border-blue-500/10">
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          <span className="font-semibold text-blue-500">💡 Penjelasan:</span>{' '}
                          {ex.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const cat = getCategoryById(category);
  if (!cat) return notFound();

  const questions = getQuestionsByCategory(cat.id);
  const mcqs = questions.filter(q => q.type === 'multiple_choice');
  const codes = questions.filter(q => q.type === 'code_challenge');

  const material = learningMaterials.find(m => m.categoryId === cat.id);

  const catIndex = CATEGORIES.findIndex(c => c.id === cat.id);
  const prevCat = catIndex > 0 ? CATEGORIES[catIndex - 1] : null;
  const nextCat = catIndex < CATEGORIES.length - 1 ? CATEGORIES[catIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
        <Link href="/belajar" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">{cat.name}</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg mb-4`}>
          <span className="text-white text-xl font-bold">{catIndex + 1}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{material?.title || cat.name}</h1>
        <p className="text-[var(--text-secondary)] text-lg">{material?.description || cat.description}</p>
        {material && (
          <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              ~{material.estimatedTime} menit
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {material.sections.length} bagian
            </span>
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-10"
      >
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-[var(--primary)]">{questions.length}</div>
          <div className="text-xs text-[var(--text-secondary)]">Total Soal</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">{mcqs.length}</div>
          <div className="text-xs text-[var(--text-secondary)]">Pilihan Ganda</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-violet-500">{codes.length}</div>
          <div className="text-xs text-[var(--text-secondary)]">Code Challenge</div>
        </div>
      </motion.div>

      {/* Learning Material Sections */}
      {material ? (
        <div className="space-y-4 mb-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
            Materi Pembelajaran
          </h2>
          {material.sections.map((section, i) => (
            <SectionCard key={section.id} section={section} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 mb-10 text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-[var(--text-muted)]" />
          </div>
          <h3 className="font-semibold mb-1">Materi sedang disiapkan</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Konten pembelajaran untuk kategori ini akan segera tersedia. Untuk saat ini, coba latihan soal di bawah.
          </p>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
      >
        <Link
          href="/latihan/mcq"
          className="flex items-center justify-between p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="font-semibold text-sm">Pilihan Ganda</div>
              <div className="text-xs text-[var(--text-muted)]">{mcqs.length} soal tersedia</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/latihan/code"
          className="flex items-center justify-between p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-violet-500/30 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <div className="font-semibold text-sm">Code Challenge</div>
              <div className="text-xs text-[var(--text-muted)]">{codes.length} soal tersedia</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
        </Link>
      </motion.div>

      {/* Prev/Next Category */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]">
        {prevCat ? (
          <Link href={`/belajar/${prevCat.id}`} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
            <ChevronLeft className="w-4 h-4" />
            {prevCat.name}
          </Link>
        ) : <div />}
        {nextCat ? (
          <Link href={`/belajar/${nextCat.id}`} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
            {nextCat.name}
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
