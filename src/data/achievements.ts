// ==========================================
// Achievement Definitions
// ==========================================

import { Achievement } from '@/types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    name: 'Langkah Pertama',
    description: 'Menjawab soal pertama kali',
    icon: 'Footprints',
    condition: { type: 'total_attempted', value: 1 },
  },
  {
    id: 'beginner_10',
    name: 'Pemula Bersemangat',
    description: 'Menjawab 10 soal',
    icon: 'Flame',
    condition: { type: 'total_attempted', value: 10 },
  },
  {
    id: 'dedicated_50',
    name: 'Pelajar Tekun',
    description: 'Menjawab 50 soal',
    icon: 'BookMarked',
    condition: { type: 'total_attempted', value: 50 },
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Menjawab 100 soal',
    icon: 'Shield',
    condition: { type: 'total_attempted', value: 100 },
  },
  {
    id: 'master_200',
    name: 'Master PL/SQL',
    description: 'Menjawab 200 soal',
    icon: 'Crown',
    condition: { type: 'total_attempted', value: 200 },
  },
  {
    id: 'legend_300',
    name: 'Legenda PL/SQL',
    description: 'Menjawab semua 300 soal',
    icon: 'Trophy',
    condition: { type: 'total_attempted', value: 300 },
  },
  {
    id: 'sharp_mind_25',
    name: 'Pikiran Tajam',
    description: '25 jawaban benar',
    icon: 'Brain',
    condition: { type: 'total_correct', value: 25 },
  },
  {
    id: 'genius_100',
    name: 'Jenius',
    description: '100 jawaban benar',
    icon: 'Sparkles',
    condition: { type: 'total_correct', value: 100 },
  },
  {
    id: 'streak_5',
    name: 'Streak 5',
    description: '5 jawaban benar berturut-turut',
    icon: 'Zap',
    condition: { type: 'streak', value: 5 },
  },
  {
    id: 'streak_10',
    name: 'Unstoppable',
    description: '10 jawaban benar berturut-turut',
    icon: 'Rocket',
    condition: { type: 'streak', value: 10 },
  },
  {
    id: 'perfect_10',
    name: 'Sempurna',
    description: 'Skor sempurna 10 soal berturut-turut',
    icon: 'Star',
    condition: { type: 'perfect_score', value: 10 },
  },
  {
    id: 'perfect_20',
    name: 'Tanpa Cela',
    description: 'Skor sempurna 20 soal berturut-turut',
    icon: 'Award',
    condition: { type: 'perfect_score', value: 20 },
  },
];
