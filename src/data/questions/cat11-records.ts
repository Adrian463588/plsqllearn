import { MCQuestion, CodeChallenge } from '@/types';

export const cat11MCQ: MCQuestion[] = [
  { id: 'MCQ_135', category: 'records-advanced', difficulty: 'Easy', type: 'multiple_choice', question: 'Apa keuntungan menggunakan record di PL/SQL?', options: ['Lebih cepat dari variabel biasa', 'Mengelompokkan field terkait dalam satu variabel', 'Mengurangi ukuran database', 'Membuat tabel baru'], correctAnswer: 1, explanation: 'Record mengelompokkan beberapa field terkait dalam satu unit logis. Mirip struct di C atau object sederhana. Contoh: record karyawan dengan field nama, gaji, departemen.', tags: ['record', 'advantage'] },
  { id: 'MCQ_136', category: 'records-advanced', difficulty: 'Medium', type: 'multiple_choice', question: 'Bagaimana cara declare record dengan %ROWTYPE?', options: ['v_rec employees%ROWTYPE;', 'v_rec RECORD OF employees;', 'v_rec := employees%ROWTYPE;', 'DECLARE RECORD v_rec employees;'], correctAnswer: 0, explanation: '%ROWTYPE membuat record yang field-nya sesuai dengan semua kolom tabel. Syntax: variable_name table_name%ROWTYPE;', tags: ['%rowtype', 'record'] },
  { id: 'MCQ_137', category: 'records-advanced', difficulty: 'Medium', type: 'multiple_choice', question: 'Apakah record bisa di-nested (record dalam record)?', options: ['Tidak bisa', 'Ya, bisa', 'Hanya di Oracle 19c+', 'Hanya untuk %ROWTYPE'], correctAnswer: 1, explanation: 'Record bisa dinested. Deklarasikan user-defined record type yang salah satu field-nya bertipe record lain. Akses dengan dot notation bertingkat: rec.inner_rec.field.', tags: ['nested', 'record'] },
  { id: 'MCQ_138', category: 'records-advanced', difficulty: 'Easy', type: 'multiple_choice', question: 'Bagaimana cara access field dalam record?', options: ['rec->field', 'rec[field]', 'rec.field', 'field OF rec'], correctAnswer: 2, explanation: 'Gunakan dot notation: record_name.field_name. Contoh: v_emp.first_name, v_emp.salary.', tags: ['dot-notation', 'access'] },
  { id: 'MCQ_139', category: 'records-advanced', difficulty: 'Medium', type: 'multiple_choice', question: 'Apakah record assignment antar record dengan tipe yang sama diperbolehkan?', options: ['Tidak', 'Ya, seluruh field di-copy sekaligus', 'Hanya field-by-field', 'Hanya jika ukuran sama'], correctAnswer: 1, explanation: 'Jika dua variabel record bertipe sama, Anda bisa assign seluruhnya: rec1 := rec2; Semua field di-copy sekaligus. Tipe harus PERSIS sama (nama type sama).', tags: ['assignment', 'copy'] },
  { id: 'MCQ_140', category: 'records-advanced', difficulty: 'Hard', type: 'multiple_choice', question: 'Bagaimana membuat user-defined record type?', options: ['CREATE RECORD TYPE ...', 'TYPE rec_type IS RECORD (field1 TYPE, field2 TYPE);', 'DEFINE RECORD rec_type ...', 'RECORD rec_type (field1, field2);'], correctAnswer: 1, explanation: 'Syntax: TYPE type_name IS RECORD (field1 type1, field2 type2, ...); Deklarasikan di DECLARE section, lalu buat variabel dari type tersebut.', tags: ['user-defined', 'type'] },
];

export const cat11Code: CodeChallenge[] = [
  {
    id: 'CODE_038',
    category: 'records-advanced',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Buat user-defined record type t_mahasiswa dengan field nim, nama, ipk. Buat variabel, assign, dan tampilkan.',
    requirements: ['TYPE t_mahasiswa IS RECORD', 'Field: nim VARCHAR2(10), nama VARCHAR2(50), ipk NUMBER(3,2)', 'Assign nilai dan tampilkan'],
    starterCode: 'DECLARE\n  -- Record type\n\n  -- Variabel\n\nBEGIN\n  -- Assign dan tampilkan\n\nEND;\n/',
    solution: 'DECLARE\n  TYPE t_mahasiswa IS RECORD (\n    nim VARCHAR2(10),\n    nama VARCHAR2(50),\n    ipk NUMBER(3,2)\n  );\n  v_mhs t_mahasiswa;\nBEGIN\n  v_mhs.nim := \'A12345\';\n  v_mhs.nama := \'Budi Santoso\';\n  v_mhs.ipk := 3.75;\n  DBMS_OUTPUT.PUT_LINE(\'NIM: \' || v_mhs.nim);\n  DBMS_OUTPUT.PUT_LINE(\'Nama: \' || v_mhs.nama);\n  DBMS_OUTPUT.PUT_LINE(\'IPK: \' || v_mhs.ipk);\nEND;\n/',
    hints: ['TYPE name IS RECORD (field type, ...);', 'Buat variabel: v_mhs t_mahasiswa;', 'Akses: v_mhs.nama := \'Budi\';'],
    validationRules: { mustContain: ['TYPE', 'RECORD', 'DBMS_OUTPUT.PUT_LINE'], structure: 'anonymous_block' },
    tags: ['record', 'user-defined'],
  },
];
