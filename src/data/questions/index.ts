// ==========================================
// Question Bank — All Categories Combined Index
// ==========================================

import { Question, MCQuestion, CodeChallenge } from '@/types';
import { cat01MCQ, cat01Code } from './cat01-pengenalan';
import { cat02MCQ, cat02Code } from './cat02-variables';
import { cat03MCQ, cat03Code } from './cat03-control';
import { cat04MCQ, cat04Code } from './cat04-cursors';
import { cat05MCQ, cat05Code } from './cat05-exceptions';
import { cat06MCQ, cat06Code } from './cat06-procedures';
import { cat07MCQ, cat07Code } from './cat07-functions';
import { cat08MCQ, cat08Code } from './cat08-packages';
import { cat09MCQ, cat09Code } from './cat09-triggers';
import { cat10MCQ, cat10Code } from './cat10-collections';
import { cat11MCQ, cat11Code } from './cat11-records';
import { cat12MCQ, cat12Code } from './cat12-performance';

// Material-based questions (Day 1–3 classroom notes)
import { cat01MateriMCQ, cat01MateriCode } from './cat01-materi';
import { cat02MateriMCQ, cat02MateriCode } from './cat02-materi';
import { cat03MateriMCQ, cat03MateriCode } from './cat03-materi';
import { cat04MateriMCQ, cat04MateriCode } from './cat04-materi';
import { cat06MateriMCQ, cat06MateriCode } from './cat06-materi';
import { cat07MateriMCQ, cat07MateriCode } from './cat07-materi';

export function getAllMCQ(): MCQuestion[] {
  return [
    ...cat01MCQ, ...cat01MateriMCQ,
    ...cat02MCQ, ...cat02MateriMCQ,
    ...cat03MCQ, ...cat03MateriMCQ,
    ...cat04MCQ, ...cat04MateriMCQ,
    ...cat05MCQ,
    ...cat06MCQ, ...cat06MateriMCQ,
    ...cat07MCQ, ...cat07MateriMCQ,
    ...cat08MCQ,
    ...cat09MCQ, ...cat10MCQ, ...cat11MCQ, ...cat12MCQ,
  ];
}

export function getAllCodeChallenges(): CodeChallenge[] {
  return [
    ...cat01Code, ...cat01MateriCode,
    ...cat02Code, ...cat02MateriCode,
    ...cat03Code, ...cat03MateriCode,
    ...cat04Code, ...cat04MateriCode,
    ...cat05Code,
    ...cat06Code, ...cat06MateriCode,
    ...cat07Code, ...cat07MateriCode,
    ...cat08Code,
    ...cat09Code, ...cat10Code, ...cat11Code, ...cat12Code,
  ];
}

export function getAllQuestions(): Question[] {
  return [...getAllMCQ(), ...getAllCodeChallenges()];
}
