// ==========================================
// Soal Tambahan Kategori 6 — Berdasarkan Materi Day 3
// CREATE PROCEDURE, parameter IN, %TYPE, DML, COMMIT
// 10 MCQ + 3 Code Challenge = 13 soal
// ==========================================

import { MCQuestion, CodeChallenge } from '@/types';

export const cat06MateriMCQ: MCQuestion[] = [
  {
    id: 'cat06-m-001',
    category: 'procedures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa keyword yang digunakan untuk membuat procedure di Oracle?',
    options: [
      'CREATE PROCEDURE',
      'MAKE PROCEDURE',
      'CREATE OR REPLACE PROCEDURE',
      'DEFINE PROCEDURE'
    ],
    correctAnswer: 2,
    explanation: 'CREATE OR REPLACE PROCEDURE digunakan untuk membuat procedure baru atau mengganti yang sudah ada. "OR REPLACE" opsional tapi direkomendasikan agar tidak perlu DROP procedure lama.',
    tags: ['CREATE PROCEDURE', 'DDL', 'day3']
  },
  {
    id: 'cat06-m-002',
    category: 'procedures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa mode parameter default jika tidak disebutkan?',
    options: [
      'OUT',
      'IN',
      'IN OUT',
      'RETURN'
    ],
    correctAnswer: 1,
    explanation: 'Jika mode tidak disebutkan, default-nya adalah IN. Parameter IN hanya bisa dibaca di dalam procedure (read-only). Contoh: p_name hr.employees.first_name%TYPE (tanpa menulis IN, tapi default IN).',
    tags: ['parameter', 'IN', 'default', 'day3']
  },
  {
    id: 'cat06-m-003',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Mengapa menggunakan %TYPE pada parameter procedure?\np_employee_id IN HR.EMPLOYEES.EMPLOYEE_ID%TYPE',
    options: [
      'Agar lebih cepat dieksekusi',
      'Agar tipe parameter otomatis sinkron dengan kolom tabel',
      'Wajib oleh Oracle',
      'Untuk membuat parameter menjadi OUT'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan %TYPE pada parameter membuat tipe otomatis mengikuti kolom tabel. Jika tipe EMPLOYEE_ID berubah dari NUMBER ke VARCHAR2, parameter procedure otomatis mengikuti tanpa perlu mengubah kode.',
    tags: ['%TYPE', 'parameter', 'best practice', 'day3']
  },
  {
    id: 'cat06-m-004',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Pada procedure PRC_GEN_UPDATE_SALARY, mengapa ada COMMIT setelah UPDATE?',
    options: [
      'Untuk menampilkan output',
      'Untuk menyimpan perubahan secara permanen ke database',
      'Untuk memulai transaksi baru',
      'COMMIT opsional dan tidak diperlukan'
    ],
    correctAnswer: 1,
    explanation: 'COMMIT menyimpan perubahan DML (INSERT, UPDATE, DELETE) secara permanen. Tanpa COMMIT, perubahan hanya terlihat di session saat ini dan akan hilang jika session berakhir atau terjadi ROLLBACK.',
    tags: ['COMMIT', 'transaction', 'day3']
  },
  {
    id: 'cat06-m-005',
    category: 'procedures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Bagaimana cara memanggil procedure HR.PRC_GEN_UPDATE_SALARY(\'100\', 10)?',
    options: [
      'EXEC HR.PRC_GEN_UPDATE_SALARY(\'100\', 10);',
      'SELECT HR.PRC_GEN_UPDATE_SALARY(\'100\', 10) FROM DUAL;',
      'BEGIN HR.PRC_GEN_UPDATE_SALARY(\'100\', 10); END;',
      'CALL HR.PRC_GEN_UPDATE_SALARY(\'100\', 10);'
    ],
    correctAnswer: 2,
    explanation: 'Procedure dipanggil di dalam anonymous block: BEGIN procedure_name(args); END;. Procedure TIDAK bisa dipanggil di SQL SELECT (berbeda dengan function). EXEC hanya tersedia di SQL*Plus.',
    tags: ['procedure call', 'anonymous block', 'day3']
  },
  {
    id: 'cat06-m-006',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan utama antara Procedure dan Function?',
    options: [
      'Procedure lebih cepat dari function',
      'Procedure melakukan aksi tanpa RETURN, function harus RETURN nilai',
      'Function tidak bisa melakukan DML',
      'Procedure hanya bisa punya 1 parameter'
    ],
    correctAnswer: 1,
    explanation: 'Procedure melakukan aksi (INSERT, UPDATE, dll) tanpa wajib mengembalikan nilai. Function WAJIB mengembalikan satu nilai dengan RETURN. Function juga bisa dipanggil di SQL SELECT.',
    tags: ['procedure', 'function', 'perbedaan', 'day3']
  },
  {
    id: 'cat06-m-007',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa arti IS/AS pada procedure header:\nCREATE OR REPLACE PROCEDURE my_proc IS\nBEGIN ... END;',
    options: [
      'IS dan AS berbeda fungsi',
      'IS/AS menandai awal body procedure (pengganti DECLARE)',
      'IS untuk procedure, AS untuk function',
      'IS membuat procedure sebagai synonym'
    ],
    correctAnswer: 1,
    explanation: 'IS atau AS pada procedure header menandai awal body procedure. Keduanya identik (interchangeable). Variabel lokal dideklarasikan antara IS/AS dan BEGIN (menggantikan DECLARE di anonymous block).',
    tags: ['IS', 'AS', 'procedure body', 'day3']
  },
  {
    id: 'cat06-m-008',
    category: 'procedures',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Perhatikan procedure:\nCREATE OR REPLACE PROCEDURE HR.PRC_GEN_UPDATE_SALARY(...) IS BEGIN\n  UPDATE HR.EMPLOYEES SET salary = salary + (salary * p_percent / 100) WHERE employee_id = p_employee_id;\n  COMMIT;\nEND;\n\nJika salary saat ini 10000 dan p_percent = 10, berapa salary baru?',
    options: [
      '10010',
      '10100',
      '11000',
      '20000'
    ],
    correctAnswer: 2,
    explanation: 'salary + (salary * p_percent / 100) = 10000 + (10000 * 10 / 100) = 10000 + 1000 = 11000. Artinya salary naik 10% dari nilai saat ini.',
    tags: ['UPDATE', 'arithmetic', 'procedure', 'day3']
  },
  {
    id: 'cat06-m-009',
    category: 'procedures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa yang terjadi jika terjadi error saat procedure dieksekusi dan tidak ada EXCEPTION handler?',
    options: [
      'Error diabaikan',
      'Procedure selesai dengan sukses',
      'Error di-propagate ke caller (pemanggil)',
      'Database restart otomatis'
    ],
    correctAnswer: 2,
    explanation: 'Jika procedure tidak memiliki EXCEPTION handler, error akan di-propagate (diteruskan) ke caller. Jika caller juga tidak handle, error terus naik sampai ke level client, menampilkan error message.',
    tags: ['exception', 'propagation', 'procedure', 'day3']
  },
  {
    id: 'cat06-m-010',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Query mana yang bisa digunakan untuk melihat error kompilasi procedure?\nSELECT line, position, text FROM user_errors WHERE name = \'PRC_GEN_INSERT_COUNTRIESS\' ORDER BY sequence;',
    options: [
      'Query ini hanya untuk function, bukan procedure',
      'user_errors menampilkan semua error kompilasi stored program (procedure, function, package, trigger)',
      'Query ini menghapus error',
      'user_errors tidak ada di Oracle'
    ],
    correctAnswer: 1,
    explanation: 'View user_errors menyimpan error kompilasi untuk semua stored program milik user saat ini: procedure, function, package, dan trigger. Kolom line dan position menunjukkan lokasi error.',
    tags: ['user_errors', 'debugging', 'day3']
  },
];

export const cat06MateriCode: CodeChallenge[] = [
  {
    id: 'cat06-mc-001',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat procedure HR.PRC_GEN_UPDATE_SALARY yang menerima employee_id dan persentase kenaikan, lalu update salary karyawan tersebut.',
    requirements: [
      'Parameter: p_employee_id (IN, %TYPE), p_percent (IN, NUMBER)',
      'UPDATE salary = salary + (salary * p_percent / 100)',
      'COMMIT setelah UPDATE',
      'Cetak pesan berhasil'
    ],
    starterCode: `CREATE OR REPLACE PROCEDURE HR.PRC_GEN_UPDATE_SALARY
(
  -- definisikan parameter
)
IS
BEGIN
  -- lengkapi UPDATE, COMMIT, dan output
END;`,
    solution: `CREATE OR REPLACE PROCEDURE HR.PRC_GEN_UPDATE_SALARY
(
  p_employee_id IN HR.EMPLOYEES.EMPLOYEE_ID%TYPE,
  p_percent     IN NUMBER
)
IS
BEGIN
  UPDATE HR.EMPLOYEES
  SET salary = salary + (salary * p_percent / 100)
  WHERE employee_id = p_employee_id;
  
  COMMIT;
  
  DBMS_OUTPUT.PUT_LINE('Berhasil update data employee : ' || p_employee_id);
END;`,
    hints: [
      'Parameter menggunakan %TYPE: HR.EMPLOYEES.EMPLOYEE_ID%TYPE',
      'Formula: salary = salary + (salary * p_percent / 100)',
      'Jangan lupa COMMIT setelah DML'
    ],
    validationRules: {
      mustContain: ['CREATE', 'PROCEDURE', 'UPDATE', 'COMMIT', 'salary', '%TYPE', 'DBMS_OUTPUT'],
    },
    tags: ['procedure', 'UPDATE', 'day3']
  },
  {
    id: 'cat06-mc-002',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat procedure HR.PRC_GEN_INSERT_COUNTRIESS untuk insert data ke tabel HR.COUNTRIESS dengan 3 parameter (country_id, country_name, region_id).',
    requirements: [
      'Gunakan CREATE OR REPLACE PROCEDURE',
      'Tiga parameter IN dengan %TYPE',
      'INSERT INTO HR.COUNTRIESS',
      'COMMIT dan cetak pesan sukses'
    ],
    starterCode: `CREATE OR REPLACE PROCEDURE HR.PRC_GEN_INSERT_COUNTRIESS
(
  -- definisikan 3 parameter
)
IS
BEGIN
  -- lengkapi INSERT, COMMIT, dan output
END;`,
    solution: `CREATE OR REPLACE PROCEDURE HR.PRC_GEN_INSERT_COUNTRIESS
(
  p_country_id   IN HR.COUNTRIESS.COUNTRY_ID%TYPE,
  p_country_name IN HR.COUNTRIESS.COUNTRY_NAME%TYPE,
  p_region_id    IN HR.COUNTRIESS.REGION_ID%TYPE
)
IS
BEGIN
  INSERT INTO HR.COUNTRIESS(country_id, country_name, region_id)
  VALUES(p_country_id, p_country_name, p_region_id);
  
  COMMIT;
  
  DBMS_OUTPUT.PUT_LINE('SUCCESS INSERT');
END;`,
    hints: [
      'Tipe parameter: HR.COUNTRIESS.COUNTRY_ID%TYPE',
      'INSERT INTO tabel(col1, col2, col3) VALUES(p1, p2, p3)',
      'Selalu COMMIT setelah INSERT'
    ],
    validationRules: {
      mustContain: ['CREATE', 'PROCEDURE', 'INSERT INTO', 'VALUES', 'COMMIT', '%TYPE'],
    },
    tags: ['procedure', 'INSERT', 'day3']
  },
  {
    id: 'cat06-mc-003',
    category: 'procedures',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Tulis anonymous block untuk memanggil procedure HR.PRC_GEN_UPDATE_SALARY dengan employee_id 100 dan kenaikan 10%.',
    requirements: [
      'Gunakan anonymous block (BEGIN...END)',
      'Panggil procedure dengan 2 argumen',
      'Employee ID: 100, Persentase: 10'
    ],
    starterCode: `-- Panggil procedure update salary
BEGIN
  -- lengkapi pemanggilan
END;`,
    solution: `BEGIN
  HR.PRC_GEN_UPDATE_SALARY('100', 10);
END;`,
    hints: [
      'Panggil di dalam BEGIN...END;',
      'Schema.procedure_name(arg1, arg2);',
      'Employee ID bisa string atau number tergantung tipe'
    ],
    validationRules: {
      mustContain: ['BEGIN', 'END', 'PRC_GEN_UPDATE_SALARY'],
    },
    tags: ['procedure call', 'day3']
  },
];
