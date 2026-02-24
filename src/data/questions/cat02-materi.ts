// ==========================================
// Soal Tambahan Kategori 2 — Berdasarkan Materi Day 2
// Anonymous blocks, Variables, Data types, %TYPE, BOOLEAN
// 12 MCQ + 3 Code Challenge = 15 soal
// ==========================================

import { MCQuestion, CodeChallenge } from '@/types';

export const cat02MateriMCQ: MCQuestion[] = [
  {
    id: 'cat02-m-001',
    category: 'variables-data-types',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Dalam PL/SQL anonymous block, bagian mana yang WAJIB ada?',
    options: [
      'DECLARE dan BEGIN',
      'BEGIN dan END',
      'DECLARE dan EXCEPTION',
      'EXCEPTION dan END'
    ],
    correctAnswer: 1,
    explanation: 'BEGIN dan END adalah bagian wajib dalam anonymous block. DECLARE (untuk variabel) dan EXCEPTION (untuk error handling) bersifat opsional.',
    tags: ['anonymous block', 'PL/SQL', 'day2']
  },
  {
    id: 'cat02-m-002',
    category: 'variables-data-types',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa fungsi DBMS_OUTPUT.PUT_LINE() dalam PL/SQL?',
    options: [
      'Membaca input dari user',
      'Mencetak teks ke output console',
      'Menulis data ke tabel',
      'Menghapus output sebelumnya'
    ],
    correctAnswer: 1,
    explanation: 'DBMS_OUTPUT.PUT_LINE() mencetak teks ke server output buffer. Untuk melihat output, pastikan SET SERVEROUTPUT ON sudah diaktifkan di SQL*Plus atau SQL Developer.',
    tags: ['DBMS_OUTPUT', 'day2']
  },
  {
    id: 'cat02-m-003',
    category: 'variables-data-types',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Operator apa yang digunakan untuk assignment (menetapkan nilai) variabel di PL/SQL?',
    options: [
      '=',
      ':=',
      '==',
      '=>'
    ],
    correctAnswer: 1,
    explanation: ':= adalah operator assignment di PL/SQL. Contoh: v_text := \'PL/SQL\';. Jangan bingung dengan = yang digunakan untuk perbandingan di SQL, dan => yang digunakan untuk named parameter.',
    tags: ['assignment', 'operator', 'day2']
  },
  {
    id: 'cat02-m-004',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan antara NUMBER dan PLS_INTEGER?',
    options: [
      'Tidak ada perbedaan',
      'PLS_INTEGER lebih cepat karena menggunakan machine arithmetic',
      'NUMBER lebih cepat dari PLS_INTEGER',
      'PLS_INTEGER bisa menyimpan desimal'
    ],
    correctAnswer: 1,
    explanation: 'PLS_INTEGER menggunakan machine arithmetic (hardware), lebih cepat dari NUMBER yang menggunakan library arithmetic (software). PLS_INTEGER hanya untuk integer (-2^31 sampai 2^31-1), sedangkan NUMBER bisa menyimpan desimal.',
    tags: ['PLS_INTEGER', 'NUMBER', 'data type', 'day2']
  },
  {
    id: 'cat02-m-005',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa arti deklarasi: v_text VARCHAR2(50) NOT NULL DEFAULT \'Hello\';?',
    options: [
      'Variabel bertipe string, boleh NULL, default Hello',
      'Variabel bertipe string, tidak boleh NULL, nilai awal Hello',
      'Variabel bertipe string, harus berisi kata Hello saja',
      'Variabel bertipe integer, default Hello'
    ],
    correctAnswer: 1,
    explanation: 'NOT NULL artinya variabel harus selalu punya nilai, tidak boleh NULL. DEFAULT \'Hello\' memberikan nilai awal saat variabel dideklarasikan. Variabel masih bisa diubah nilainya selama tidak NULL.',
    tags: ['NOT NULL', 'DEFAULT', 'VARCHAR2', 'day2']
  },
  {
    id: 'cat02-m-006',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa yang dimaksud dengan NUMBER(10, 2)?',
    options: [
      'Angka dengan 10 digit integer dan 2 digit tambahan',
      'Angka dengan total 10 digit presisi dimana 2 adalah desimal',
      'Angka antara 10 dan 2',
      'Angka dengan minimal 10 dan maksimal 2 digit'
    ],
    correctAnswer: 1,
    explanation: 'NUMBER(p, s): p = presisi total (jumlah digit), s = scale (jumlah digit desimal). NUMBER(10,2) artinya total 10 digit, 2 di belakang koma. Contoh: 12345678.90 (8 integer + 2 desimal = 10 digit).',
    tags: ['NUMBER', 'presisi', 'scale', 'day2']
  },
  {
    id: 'cat02-m-007',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi dari TRUNC(SYSDATE)?',
    options: [
      'Mengembalikan tanggal besok',
      'Menghapus komponen waktu, mengembalikan tanggal saja (awal hari)',
      'Memotong nama hari menjadi 3 huruf',
      'Mengembalikan timestamp lengkap'
    ],
    correctAnswer: 1,
    explanation: 'TRUNC(SYSDATE) membuang komponen waktu (jam, menit, detik) dari SYSDATE, sehingga mengembalikan tanggal saja pada pukul 00:00:00. Ini berguna untuk perbandingan tanggal tanpa waktu.',
    tags: ['TRUNC', 'SYSDATE', 'DATE', 'day2']
  },
  {
    id: 'cat02-m-008',
    category: 'variables-data-types',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'BOOLEAN di PL/SQL bisa bernilai apa saja?',
    options: [
      'TRUE atau FALSE saja',
      'TRUE, FALSE, atau NULL',
      '1 atau 0',
      'YES atau NO'
    ],
    correctAnswer: 1,
    explanation: 'BOOLEAN di PL/SQL bisa bernilai TRUE, FALSE, atau NULL (three-valued logic). Perlu diperhatikan bahwa BOOLEAN hanya bisa digunakan di PL/SQL block, TIDAK bisa di SQL statement.',
    tags: ['BOOLEAN', 'day2']
  },
  {
    id: 'cat02-m-009',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa keuntungan menggunakan %TYPE pada deklarasi variabel?',
    options: [
      'Membuat variabel lebih cepat diakses',
      'Tipe otomatis menyesuaikan jika tipe kolom di tabel berubah',
      'Menghemat memori',
      'Membuat variabel read-only'
    ],
    correctAnswer: 1,
    explanation: '%TYPE membuat variabel memiliki tipe data yang sama dengan kolom tabel atau variabel lain. Jika tipe di tabel berubah (misal dari VARCHAR2(10) ke VARCHAR2(20)), variabel otomatis mengikuti tanpa perlu mengubah kode.',
    tags: ['%TYPE', 'dynamic typing', 'day2']
  },
  {
    id: 'cat02-m-010',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Perhatikan kode:\nDECLARE v_type HR.EMPLOYEES.JOB_ID%TYPE; v_type2 v_type%TYPE;\nApa tipe data v_type2?',
    options: [
      'NUMBER',
      'Sama dengan tipe JOB_ID di tabel EMPLOYEES',
      'VARCHAR2(100)',
      'BOOLEAN'
    ],
    correctAnswer: 1,
    explanation: 'v_type mengambil tipe dari kolom JOB_ID (VARCHAR2). v_type2 mengambil tipe dari v_type, jadi v_type2 juga bertipe sama dengan JOB_ID. %TYPE bisa chain dari variabel ke variabel.',
    tags: ['%TYPE', 'chain', 'day2']
  },
  {
    id: 'cat02-m-011',
    category: 'variables-data-types',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa perbedaan DBMS_OUTPUT.PUT_LINE() dan CONCAT()?',
    options: [
      'Keduanya mencetak output',
      'PUT_LINE mencetak + newline; CONCAT hanya menggabungkan string (tanpa cetak)',
      'CONCAT mencetak ke output; PUT_LINE menggabungkan string',
      'Tidak ada perbedaan'
    ],
    correctAnswer: 1,
    explanation: 'DBMS_OUTPUT.PUT_LINE() mencetak teks ke output dan menambah newline di akhir. CONCAT() hanya menggabungkan dua string menjadi satu (mirip ||) tanpa mencetak. Untuk mencetak hasil CONCAT, bungkus dengan PUT_LINE.',
    tags: ['DBMS_OUTPUT', 'CONCAT', 'day2']
  },
  {
    id: 'cat02-m-012',
    category: 'variables-data-types',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Apa hasil dari block berikut?\nDECLARE v_flag BOOLEAN := FALSE;\nBEGIN\n  IF v_flag THEN DBMS_OUTPUT.PUT_LINE(\'TRUE\');\n  ELSIF NOT v_flag THEN DBMS_OUTPUT.PUT_LINE(\'FALSE\');\n  ELSE DBMS_OUTPUT.PUT_LINE(\'NULL\');\n  END IF;\nEND;',
    options: [
      'TRUE',
      'FALSE',
      'NULL',
      'Error'
    ],
    correctAnswer: 1,
    explanation: 'v_flag = FALSE. IF v_flag → FALSE (tidak masuk). NOT v_flag → NOT FALSE → TRUE (masuk ELSIF). Output: "FALSE". Jika v_flag = NULL, NOT NULL = NULL (bukan TRUE), sehingga masuk ELSE.',
    tags: ['BOOLEAN', 'IF', 'NOT', 'day2']
  },
];

export const cat02MateriCode: CodeChallenge[] = [
  {
    id: 'cat02-mc-001',
    category: 'variables-data-types',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Buat anonymous block PL/SQL yang mendeklarasikan variabel v_name (VARCHAR2) dan v_age (NUMBER), lalu cetak "Nama: [nama], Umur: [umur]".',
    requirements: [
      'Deklarasikan v_name bertipe VARCHAR2',
      'Deklarasikan v_age bertipe NUMBER',
      'Cetak gabungan string dengan DBMS_OUTPUT.PUT_LINE'
    ],
    starterCode: `DECLARE
  -- deklarasikan variabel
BEGIN
  -- cetak output
END;`,
    solution: `DECLARE
  v_name VARCHAR2(50) := 'Carol';
  v_age  NUMBER := 25;
BEGIN
  DBMS_OUTPUT.PUT_LINE('Nama: ' || v_name || ', Umur: ' || v_age);
END;`,
    hints: [
      'Gunakan := untuk assignment',
      'Gunakan || untuk menggabungkan string',
      'DBMS_OUTPUT.PUT_LINE untuk mencetak'
    ],
    validationRules: {
      mustContain: ['DECLARE', 'VARCHAR2', 'NUMBER', 'DBMS_OUTPUT.PUT_LINE', 'BEGIN', 'END'],
    },
    tags: ['anonymous block', 'variabel', 'day2']
  },
  {
    id: 'cat02-mc-002',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat anonymous block yang mendeklarasikan variabel menggunakan %TYPE dari kolom HR.EMPLOYEES.JOB_ID, lalu isi dengan nilai dan cetak.',
    requirements: [
      'Gunakan %TYPE untuk deklarasi variabel',
      'Referensi ke kolom HR.EMPLOYEES.JOB_ID',
      'Isi variabel dengan nilai string',
      'Cetak nilai variabel'
    ],
    starterCode: `DECLARE
  -- deklarasikan variabel dengan %TYPE
BEGIN
  -- isi dan cetak variabel
END;`,
    solution: `DECLARE
  v_job HR.EMPLOYEES.JOB_ID%TYPE;
BEGIN
  v_job := 'IT_PROG';
  DBMS_OUTPUT.PUT_LINE('Job ID: ' || v_job);
END;`,
    hints: [
      'Sintaks: variabel tabel.kolom%TYPE',
      'HR.EMPLOYEES.JOB_ID%TYPE mengambil tipe dari kolom JOB_ID',
      ':= untuk memberikan nilai'
    ],
    validationRules: {
      mustContain: ['DECLARE', '%TYPE', 'EMPLOYEES', 'DBMS_OUTPUT', 'BEGIN', 'END'],
    },
    tags: ['%TYPE', 'day2']
  },
  {
    id: 'cat02-mc-003',
    category: 'variables-data-types',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat anonymous block dengan variabel BOOLEAN. Jika TRUE, cetak "Aktif". Jika FALSE, cetak "Tidak Aktif". Jika NULL, cetak "Unknown".',
    requirements: [
      'Deklarasikan variabel BOOLEAN',
      'Gunakan IF-ELSIF-ELSE',
      'Handle ketiga kondisi: TRUE, FALSE, NULL'
    ],
    starterCode: `DECLARE
  v_aktif BOOLEAN := TRUE;
BEGIN
  -- lengkapi IF-ELSIF-ELSE
END;`,
    solution: `DECLARE
  v_aktif BOOLEAN := TRUE;
BEGIN
  IF v_aktif THEN
    DBMS_OUTPUT.PUT_LINE('Aktif');
  ELSIF NOT v_aktif THEN
    DBMS_OUTPUT.PUT_LINE('Tidak Aktif');
  ELSE
    DBMS_OUTPUT.PUT_LINE('Unknown');
  END IF;
END;`,
    hints: [
      'IF v_aktif THEN untuk cek TRUE',
      'ELSIF NOT v_aktif THEN untuk cek FALSE',
      'ELSE menangkap NULL (karena NOT NULL = NULL, bukan TRUE)'
    ],
    validationRules: {
      mustContain: ['BOOLEAN', 'IF', 'ELSIF', 'ELSE', 'END IF', 'DBMS_OUTPUT'],
    },
    tags: ['BOOLEAN', 'IF', 'day2']
  },
];
