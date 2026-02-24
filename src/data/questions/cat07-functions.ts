import { MCQuestion, CodeChallenge } from '@/types';

export const cat07MCQ: MCQuestion[] = [
  { id: 'MCQ_102', category: 'functions', difficulty: 'Easy', type: 'multiple_choice', question: 'Apa perbedaan utama function dan procedure?', options: ['Tidak ada perbedaan', 'Function HARUS mengembalikan nilai (RETURN), procedure tidak', 'Procedure lebih cepat', 'Function hanya untuk angka'], correctAnswer: 1, explanation: 'Function HARUS memiliki RETURN clause dan mengembalikan satu nilai. Procedure tidak harus return value (menggunakan OUT parameter sebagai opsi).', tags: ['function-vs-procedure'] },
  { id: 'MCQ_103', category: 'functions', difficulty: 'Easy', type: 'multiple_choice', question: 'Apakah function WAJIB memiliki RETURN value?', options: ['Tidak', 'Ya, selalu', 'Hanya jika dipanggil dari SQL', 'Opsional'], correctAnswer: 1, explanation: 'Setiap function di PL/SQL wajib memiliki RETURN clause yang mengembalikan nilai. Jika eksekusi mencapai END tanpa RETURN, Oracle raise PROGRAM_ERROR.', tags: ['return', 'mandatory'] },
  { id: 'MCQ_104', category: 'functions', difficulty: 'Medium', type: 'multiple_choice', question: 'Apakah function bisa digunakan dalam SELECT statement?', options: ['Tidak pernah', 'Ya, asalkan memenuhi purity rules', 'Hanya function built-in', 'Hanya jika return NUMBER'], correctAnswer: 1, explanation: 'Function bisa digunakan di SQL SELECT jika: 1) Tidak melakukan DML, 2) Tidak mengubah package state, 3) Parameternya hanya IN, 4) Tipe data kompatibel dengan SQL.', tags: ['sql-function', 'purity'] },
  { id: 'MCQ_105', category: 'functions', difficulty: 'Medium', type: 'multiple_choice', question: 'Apa itu deterministic function?', options: ['Function yang selalu mengembalikan error', 'Function yang return value sama untuk input yang sama', 'Function yang hanya bisa dipanggil sekali', 'Function yang tidak bisa di-replace'], correctAnswer: 1, explanation: 'DETERMINISTIC function selalu return nilai yang sama untuk input yang sama. Oracle bisa mengoptimalkan dengan caching hasilnya. Contoh: fungsi hitung area lingkaran.', tags: ['deterministic', 'optimization'] },
  { id: 'MCQ_106', category: 'functions', difficulty: 'Hard', type: 'multiple_choice', question: 'Apakah function bisa memiliki OUT parameter?', options: ['Tidak, hanya IN', 'Ya, tapi function dengan OUT parameter tidak bisa dipanggil dari SQL', 'Tidak valid secara syntax', 'Ya, tanpa batasan'], correctAnswer: 1, explanation: 'Function bisa memiliki OUT parameter secara syntax, tapi function dengan OUT parameter TIDAK bisa digunakan di SQL statement. Sebaiknya gunakan procedure jika perlu OUT parameter.', tags: ['out-parameter', 'limitation'] },
  { id: 'MCQ_107', category: 'functions', difficulty: 'Easy', type: 'multiple_choice', question: 'Bagaimana cara return value dari function?', options: ['OUTPUT value;', 'RETURN value;', 'YIELD value;', 'SEND value;'], correctAnswer: 1, explanation: 'Keyword RETURN digunakan untuk mengembalikan nilai dari function. Contoh: RETURN v_result; Setelah RETURN, eksekusi function selesai.', tags: ['return', 'syntax'] },
  { id: 'MCQ_108', category: 'functions', difficulty: 'Medium', type: 'multiple_choice', question: 'Apa yang terjadi jika function tidak pernah mencapai RETURN statement?', options: ['Return NULL', 'Return 0', 'Oracle raise PROGRAM_ERROR atau NO_DATA_FOUND', 'Tidak ada error'], correctAnswer: 2, explanation: 'Jika function mencapai END tanpa pernah menjalankan RETURN, Oracle raise runtime error (biasanya PROGRAM_ERROR atau compiler warning). Pastikan semua path memiliki RETURN.', tags: ['no-return', 'error'] },
  { id: 'MCQ_109', category: 'functions', difficulty: 'Hard', type: 'multiple_choice', question: 'Apakah function bisa memanggil (call) procedure?', options: ['Tidak pernah', 'Ya, tanpa batasan', 'Ya, tapi procedure yang dipanggil tidak boleh DML jika function dipakai di SQL', 'Hanya function dan procedure dalam package yang sama'], correctAnswer: 2, explanation: 'Function bisa call procedure, tapi jika function digunakan dalam SQL, procedure yang dipanggil tidak boleh melakukan DML atau mengubah database state.', tags: ['call', 'restriction'] },
  { id: 'MCQ_110', category: 'functions', difficulty: 'Medium', type: 'multiple_choice', question: 'Syntax CREATE FUNCTION yang benar?', options: ['CREATE FUNCTION f RETURNS NUMBER IS BEGIN RETURN 1; END;', 'CREATE OR REPLACE FUNCTION f RETURN NUMBER IS BEGIN RETURN 1; END;', 'CREATE FUNCTION f() -> NUMBER BEGIN RETURN 1; END;', 'FUNCTION f RETURN NUMBER AS BEGIN RETURN 1; END;'], correctAnswer: 1, explanation: 'Syntax: CREATE OR REPLACE FUNCTION nama RETURN tipe IS BEGIN ... RETURN value; END; Perhatikan: RETURN (bukan RETURNS).', tags: ['create', 'syntax'] },
];

export const cat07Code: CodeChallenge[] = [
  {
    id: 'CODE_033',
    category: 'functions',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Buat function calculate_factorial yang menerima NUMBER dan mengembalikan faktorialnya secara iteratif.',
    requirements: ['CREATE OR REPLACE FUNCTION calculate_factorial', 'Parameter p_n NUMBER', 'RETURN NUMBER', 'Hitung factorial dengan loop', 'Panggil dan tampilkan 5! = 120'],
    starterCode: '-- Buat function\n\n-- Test\nBEGIN\n  DBMS_OUTPUT.PUT_LINE(\'5! = \' || calculate_factorial(5));\nEND;\n/',
    solution: 'CREATE OR REPLACE FUNCTION calculate_factorial(p_n IN NUMBER) RETURN NUMBER IS\n  v_result NUMBER := 1;\nBEGIN\n  FOR i IN 1..p_n LOOP\n    v_result := v_result * i;\n  END LOOP;\n  RETURN v_result;\nEND;\n/\n\nBEGIN\n  DBMS_OUTPUT.PUT_LINE(\'5! = \' || calculate_factorial(5));\nEND;\n/',
    hints: ['FUNCTION name(param TYPE) RETURN TYPE IS', 'Gunakan FOR loop untuk iterasi', 'RETURN v_result; di akhir'],
    validationRules: { mustContain: ['FUNCTION', 'RETURN', 'LOOP', 'END'] },
    tags: ['function', 'factorial', 'iterative'],
  },
  {
    id: 'CODE_034',
    category: 'functions',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat function is_palindrome yang menerima string dan mengembalikan BOOLEAN (TRUE jika palindrome).',
    requirements: ['Function return BOOLEAN', 'Bandingkan string dengan reverse-nya', 'Test dengan "madam" (TRUE) dan "hello" (FALSE)'],
    starterCode: '-- Buat function\n\n-- Test\nBEGIN\n  IF is_palindrome(\'madam\') THEN\n    DBMS_OUTPUT.PUT_LINE(\'madam adalah palindrome\');\n  END IF;\nEND;\n/',
    solution: 'CREATE OR REPLACE FUNCTION is_palindrome(p_str IN VARCHAR2) RETURN BOOLEAN IS\n  v_reversed VARCHAR2(4000);\n  v_len NUMBER;\nBEGIN\n  v_len := LENGTH(p_str);\n  v_reversed := \'\';\n  FOR i IN REVERSE 1..v_len LOOP\n    v_reversed := v_reversed || SUBSTR(p_str, i, 1);\n  END LOOP;\n  RETURN UPPER(p_str) = UPPER(v_reversed);\nEND;\n/\n\nBEGIN\n  IF is_palindrome(\'madam\') THEN\n    DBMS_OUTPUT.PUT_LINE(\'madam adalah palindrome\');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE(\'madam bukan palindrome\');\n  END IF;\nEND;\n/',
    hints: ['Gunakan REVERSE FOR LOOP untuk membalik string', 'SUBSTR(str, pos, len) mengambil substring', 'BOOLEAN return di-compare dengan = '],
    validationRules: { mustContain: ['FUNCTION', 'RETURN', 'BOOLEAN', 'BEGIN', 'END'] },
    tags: ['function', 'string', 'palindrome'],
  },
];
