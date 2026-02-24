// ==========================================
// PL/SQL Categories Definition
// ==========================================

import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'pengenalan-plsql',
    name: 'Pengenalan PL/SQL & Blocks',
    description: 'Dasar-dasar PL/SQL, struktur block, anonymous blocks, dan lexical units.',
    icon: 'BookOpen',
    color: 'from-blue-500 to-blue-700',
    totalMCQ: 20,
    totalCode: 5,
  },
  {
    id: 'variables-data-types',
    name: 'Variables & Data Types',
    description: 'Deklarasi variabel, scalar data types, %TYPE, %ROWTYPE, constants.',
    icon: 'Variable',
    color: 'from-emerald-500 to-emerald-700',
    totalMCQ: 18,
    totalCode: 7,
  },
  {
    id: 'control-structures',
    name: 'Control Structures',
    description: 'IF-THEN-ELSE, CASE, LOOP, WHILE, FOR, EXIT, CONTINUE.',
    icon: 'GitBranch',
    color: 'from-violet-500 to-violet-700',
    totalMCQ: 20,
    totalCode: 10,
  },
  {
    id: 'cursors',
    name: 'Cursors',
    description: 'Implicit/explicit cursors, cursor attributes, FOR loops, REF CURSOR.',
    icon: 'MousePointer',
    color: 'from-orange-500 to-orange-700',
    totalMCQ: 18,
    totalCode: 12,
  },
  {
    id: 'exception-handling',
    name: 'Exception Handling',
    description: 'Predefined exceptions, user-defined, RAISE, SQLCODE/SQLERRM.',
    icon: 'ShieldAlert',
    color: 'from-red-500 to-red-700',
    totalMCQ: 15,
    totalCode: 10,
  },
  {
    id: 'procedures',
    name: 'Procedures',
    description: 'CREATE PROCEDURE, parameter modes (IN/OUT/IN OUT), local subprograms.',
    icon: 'Cog',
    color: 'from-cyan-500 to-cyan-700',
    totalMCQ: 18,
    totalCode: 12,
  },
  {
    id: 'functions',
    name: 'Functions',
    description: 'CREATE FUNCTION, RETURN, deterministic, function vs procedure.',
    icon: 'FunctionSquare',
    color: 'from-pink-500 to-pink-700',
    totalMCQ: 18,
    totalCode: 12,
  },
  {
    id: 'packages',
    name: 'Packages',
    description: 'Package spec & body, public/private, overloading, built-in packages.',
    icon: 'Package',
    color: 'from-amber-500 to-amber-700',
    totalMCQ: 15,
    totalCode: 10,
  },
  {
    id: 'triggers',
    name: 'Triggers',
    description: 'DML triggers, BEFORE/AFTER, :NEW/:OLD, mutating table error.',
    icon: 'Zap',
    color: 'from-teal-500 to-teal-700',
    totalMCQ: 15,
    totalCode: 10,
  },
  {
    id: 'collections',
    name: 'Collections',
    description: 'Associative arrays, nested tables, VARRAYs, BULK COLLECT, FORALL.',
    icon: 'Layers',
    color: 'from-indigo-500 to-indigo-700',
    totalMCQ: 12,
    totalCode: 8,
  },
  {
    id: 'records-advanced',
    name: 'Records & Advanced Types',
    description: 'Record types, %ROWTYPE, nested records, record assignment.',
    icon: 'Database',
    color: 'from-lime-500 to-lime-700',
    totalMCQ: 10,
    totalCode: 5,
  },
  {
    id: 'performance-best-practices',
    name: 'Performance & Best Practices',
    description: 'Bind variables, NOCOPY, RESULT_CACHE, optimization techniques.',
    icon: 'Gauge',
    color: 'from-rose-500 to-rose-700',
    totalMCQ: 15,
    totalCode: 5,
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id);
}

export function getCategoryNames(): Record<string, string> {
  const map: Record<string, string> = {};
  CATEGORIES.forEach(c => { map[c.id] = c.name; });
  return map;
}
