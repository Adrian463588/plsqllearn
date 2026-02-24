import { MCQuestion, CodeChallenge } from '@/types';

export const cat06MCQ: MCQuestion[] = [
  { id: 'MCQ_092', category: 'procedures', difficulty: 'Easy', type: 'multiple_choice', question: 'Apa perbedaan IN, OUT, dan IN OUT parameter?', options: ['Tidak ada perbedaan', 'IN=readonly, OUT=write-only, IN OUT=read-write', 'IN=angka, OUT=string, IN OUT=campuran', 'IN=input, OUT=error, IN OUT=both'], correctAnswer: 1, explanation: 'IN parameter hanya bisa dibaca (default). OUT parameter hanya bisa ditulis (mengembalikan nilai). IN OUT bisa dibaca dan ditulis.', tags: ['parameter', 'in-out'] },
  { id: 'MCQ_093', category: 'procedures', difficulty: 'Easy', type: 'multiple_choice', question: 'Syntax mana yang benar untuk CREATE PROCEDURE?', options: ['CREATE PROCEDURE p AS BEGIN ... END;', 'PROCEDURE p IS BEGIN ... END;', 'CREATE OR REPLACE PROCEDURE p IS BEGIN ... END;', 'Semua benar'], correctAnswer: 2, explanation: 'CREATE OR REPLACE PROCEDURE nama IS BEGIN ... END; adalah syntax yang paling umum karena bisa membuat atau mengganti procedure yang sudah ada.', tags: ['create', 'syntax'] },
  { id: 'MCQ_094', category: 'procedures', difficulty: 'Medium', type: 'multiple_choice', question: 'Bagaimana cara call procedure dengan OUT parameter?', options: ['p(100);', 'DECLARE v NUMBER; BEGIN p(v); END;', 'CALL p() INTO v;', 'SELECT p() FROM dual;'], correctAnswer: 1, explanation: 'OUT parameter perlu variabel untuk menampung nilai yang dikembalikan. Deklarasikan variabel, lalu pass sebagai argument ke procedure.', tags: ['out-parameter', 'call'] },
  { id: 'MCQ_095', category: 'procedures', difficulty: 'Medium', type: 'multiple_choice', question: 'Apa keuntungan named notation?', options: ['Lebih cepat', 'Parameter bisa diisi urutan apa pun', 'Lebih aman', 'Menggunakan lebih sedikit memori'], correctAnswer: 1, explanation: 'Named notation (param_name => value) memungkinkan parameter diisi dalam urutan apa pun dan kode lebih mudah dibaca, terutama untuk procedure dengan banyak parameter.', tags: ['named-notation', 'readability'] },
  { id: 'MCQ_096', category: 'procedures', difficulty: 'Easy', type: 'multiple_choice', question: 'Apakah procedure bisa mengembalikan (return) value?', options: ['Ya, sama seperti function', 'Tidak, procedure tidak punya RETURN clause tetapi bisa gunakan OUT parameter', 'Hanya jika menggunakan keyword RETURNS', 'Tidak pernah bisa'], correctAnswer: 1, explanation: 'Procedure tidak memiliki RETURN clause, tapi bisa "mengembalikan" nilai melalui OUT atau IN OUT parameter. Untuk return value eksplisit, gunakan function.', tags: ['return', 'difference'] },
  { id: 'MCQ_097', category: 'procedures', difficulty: 'Medium', type: 'multiple_choice', question: 'Bagaimana cara drop procedure?', options: ['DELETE PROCEDURE p;', 'REMOVE PROCEDURE p;', 'DROP PROCEDURE p;', 'ALTER PROCEDURE p DROP;'], correctAnswer: 2, explanation: 'Syntax: DROP PROCEDURE nama_procedure; Ini menghapus procedure dari database secara permanen.', tags: ['drop', 'ddl'] },
  { id: 'MCQ_098', category: 'procedures', difficulty: 'Medium', type: 'multiple_choice', question: 'Apakah parameter procedure bisa memiliki default value?', options: ['Tidak', 'Ya, menggunakan DEFAULT atau :=', 'Hanya IN parameter', 'B dan C benar'], correctAnswer: 3, explanation: 'Hanya IN parameter yang bisa memiliki default value, menggunakan DEFAULT atau :=. OUT dan IN OUT parameter tidak bisa punya default value.', tags: ['default', 'parameter'] },
  { id: 'MCQ_099', category: 'procedures', difficulty: 'Hard', type: 'multiple_choice', question: 'Apa yang terjadi jika mencoba meng-assign nilai ke IN parameter?', options: ['Nilai berubah', 'Oracle mengabaikan', 'Compile-time error (PLS-00363)', 'Runtime warning'], correctAnswer: 2, explanation: 'IN parameter bersifat read-only. Mencoba meng-assign nilai ke IN parameter menghasilkan compile-time error: PLS-00363: expression ... cannot be used as an assignment target.', tags: ['in-parameter', 'error'] },
  { id: 'MCQ_100', category: 'procedures', difficulty: 'Hard', type: 'multiple_choice', question: 'Bagaimana cara membuat local subprogram?', options: ['CREATE LOCAL PROCEDURE', 'Deklarasikan procedure di DECLARE section', 'Tidak bisa', 'Gunakan keyword NESTED'], correctAnswer: 1, explanation: 'Local subprogram dideklarasikan di DECLARE section dari block atau subprogram lain. Harus dideklarasikan setelah semua variabel dan sebelum BEGIN.', tags: ['local', 'subprogram'] },
  { id: 'MCQ_101', category: 'procedures', difficulty: 'Easy', type: 'multiple_choice', question: 'Apa mode default parameter jika tidak dispesifikasikan?', options: ['OUT', 'IN OUT', 'IN', 'Tidak ada default'], correctAnswer: 2, explanation: 'Jika mode parameter tidak dispesifikasikan, defaultnya adalah IN. Contoh: PROCEDURE p(x NUMBER) sama dengan PROCEDURE p(x IN NUMBER).', tags: ['default-mode', 'in'] },
];

export const cat06Code: CodeChallenge[] = [
  {
    id: 'CODE_031',
    category: 'procedures',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Buat procedure sederhana greet_user yang menerima IN parameter p_nama VARCHAR2 dan menampilkan pesan sapaan.',
    requirements: ['CREATE OR REPLACE PROCEDURE greet_user', 'Parameter IN p_nama VARCHAR2', 'Tampilkan "Halo, <nama>! Selamat belajar PL/SQL."', 'Panggil procedure'],
    starterCode: '-- Buat procedure\n\n-- Panggil procedure\nBEGIN\n  greet_user(\'Budi\');\nEND;\n/',
    solution: 'CREATE OR REPLACE PROCEDURE greet_user(p_nama IN VARCHAR2) IS\nBEGIN\n  DBMS_OUTPUT.PUT_LINE(\'Halo, \' || p_nama || \'! Selamat belajar PL/SQL.\');\nEND;\n/\n\nBEGIN\n  greet_user(\'Budi\');\nEND;\n/',
    hints: ['CREATE OR REPLACE PROCEDURE name(param IN TYPE) IS', 'Body antara BEGIN dan END;', 'Panggil dengan procedure_name(argument);'],
    validationRules: { mustContain: ['CREATE', 'PROCEDURE', 'BEGIN', 'END', 'DBMS_OUTPUT.PUT_LINE'] },
    tags: ['procedure', 'in-parameter', 'basic'],
  },
  {
    id: 'CODE_032',
    category: 'procedures',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat procedure calc_bonus yang menerima IN p_salary NUMBER dan OUT p_bonus NUMBER. Bonus = 10% dari salary.',
    requirements: ['Procedure dengan IN dan OUT parameter', 'Hitung bonus 10%', 'Panggil procedure dan tampilkan bonus'],
    starterCode: '-- Buat procedure\n\n-- Panggil\nDECLARE\n  v_bonus NUMBER;\nBEGIN\n  calc_bonus(8000, v_bonus);\n  DBMS_OUTPUT.PUT_LINE(\'Bonus: \' || v_bonus);\nEND;\n/',
    solution: 'CREATE OR REPLACE PROCEDURE calc_bonus(\n  p_salary IN NUMBER,\n  p_bonus OUT NUMBER\n) IS\nBEGIN\n  p_bonus := p_salary * 0.10;\nEND;\n/\n\nDECLARE\n  v_bonus NUMBER;\nBEGIN\n  calc_bonus(8000, v_bonus);\n  DBMS_OUTPUT.PUT_LINE(\'Bonus: \' || v_bonus);\nEND;\n/',
    hints: ['OUT parameter diisi nilai di dalam procedure', 'Caller harus menyediakan variabel untuk OUT', 'Gunakan := untuk assignment'],
    validationRules: { mustContain: ['PROCEDURE', 'IN', 'OUT', 'BEGIN', 'END'] },
    tags: ['out-parameter', 'calculation'],
  },
];
