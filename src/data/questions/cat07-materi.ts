// ==========================================
// Soal Tambahan Kategori 7 — Berdasarkan Materi Day 3
// CREATE FUNCTION, RETURN, SELECT INTO, function dalam SQL
// 8 MCQ + 2 Code Challenge = 10 soal
// ==========================================

import { MCQuestion, CodeChallenge } from '@/types';

export const cat07MateriMCQ: MCQuestion[] = [
  {
    id: 'cat07-m-001',
    category: 'functions',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa keyword wajib yang membedakan function dari procedure?',
    options: [
      'BEGIN',
      'DECLARE',
      'RETURN',
      'IS'
    ],
    correctAnswer: 2,
    explanation: 'Function WAJIB memiliki RETURN clause: RETURN tipe_data pada header, dan RETURN nilai di body. Procedure tidak memiliki RETURN (hanya bisa return via OUT parameter).',
    tags: ['RETURN', 'function', 'day3']
  },
  {
    id: 'cat07-m-002',
    category: 'functions',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Manakah cara yang BENAR untuk memanggil function di SQL SELECT?',
    options: [
      'BEGIN fnc_get_avg_sal(50); END;',
      'SELECT fnc_get_avg_sal(50) FROM DUAL;',
      'EXEC fnc_get_avg_sal(50);',
      'CALL fnc_get_avg_sal(50);'
    ],
    correctAnswer: 1,
    explanation: 'Function bisa dipanggil langsung di SQL SELECT: SELECT fnc_get_avg_sal(50) FROM DUAL;. Ini keunggulan utama function dibanding procedure. DUAL adalah tabel dummy Oracle untuk query tanpa tabel.',
    tags: ['function', 'SELECT', 'DUAL', 'day3']
  },
  {
    id: 'cat07-m-003',
    category: 'functions',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Perhatikan function:\nCREATE OR REPLACE FUNCTION FNC_GET_AVG_SAL(p_dept_id ...) RETURN NUMBER AS\n  v_avg_sal NUMBER;\nBEGIN\n  SELECT AVG(salary) INTO v_avg_sal FROM HR.EMPLOYEES WHERE department_id = p_dept_id;\n  RETURN v_avg_sal;\nEND;\n\nApa fungsi SELECT ... INTO?',
    options: [
      'Membuat variabel baru',
      'Menyimpan hasil query ke variabel v_avg_sal',
      'Menampilkan output ke console',
      'Menginsert data ke tabel'
    ],
    correctAnswer: 1,
    explanation: 'SELECT ... INTO menyimpan hasil query ke variabel PL/SQL. AVG(salary) dihitung dan hasilnya disimpan di v_avg_sal. INTO hanya bisa digunakan jika query mengembalikan tepat satu baris.',
    tags: ['SELECT INTO', 'function', 'day3']
  },
  {
    id: 'cat07-m-004',
    category: 'functions',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Bagaimana function bisa digunakan di dalam SELECT statement?\nSELECT employee_id, first_name, fnc_get_avg_sal(department_id) AS avg_sal FROM HR.EMPLOYEES;',
    options: [
      'Function dipanggil sekali untuk seluruh tabel',
      'Function dipanggil untuk setiap baris, menerima department_id baris tersebut',
      'Function hanya dipanggil jika ada WHERE clause',
      'Ini tidak valid di Oracle'
    ],
    correctAnswer: 1,
    explanation: 'Function di SELECT clause dipanggil untuk SETIAP baris hasil query. Setiap karyawan memiliki department_id berbeda, sehingga function menghitung avg salary per department untuk setiap baris.',
    tags: ['function in SELECT', 'per row', 'day3']
  },
  {
    id: 'cat07-m-005',
    category: 'functions',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Bagaimana cara memanggil function dan menyimpan hasilnya di PL/SQL block?',
    options: [
      'CALL fnc_get_avg_sal(50) INTO v_result;',
      'v_avg_salary := fnc_get_avg_sal(50);',
      'fnc_get_avg_sal(50) = v_avg_salary;',
      'SET v_avg_salary = fnc_get_avg_sal(50);'
    ],
    correctAnswer: 1,
    explanation: 'Dalam PL/SQL block, function dipanggil dan hasilnya di-assign ke variabel dengan :=. Contoh: v_avg_salary := fnc_get_avg_sal(50); menyimpan return value ke v_avg_salary.',
    tags: ['function call', 'assignment', 'day3']
  },
  {
    id: 'cat07-m-006',
    category: 'functions',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Pada header function: RETURN NUMBER AS — apa arti RETURN NUMBER?',
    options: [
      'Function menerima parameter bertipe NUMBER',
      'Function akan mengembalikan nilai bertipe NUMBER',
      'Function hanya menerima angka sebagai input',
      'Return code = 0 jika sukses'
    ],
    correctAnswer: 1,
    explanation: 'RETURN NUMBER pada header mendefinisikan tipe data yang akan dikembalikan function. Di body, RETURN v_avg_sal; mengirim nilai NUMBER kembali ke pemanggil.',
    tags: ['RETURN type', 'function header', 'day3']
  },
  {
    id: 'cat07-m-007',
    category: 'functions',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Function tidak boleh melakukan DML (INSERT/UPDATE/DELETE) jika ingin digunakan di SQL query. Mengapa?',
    options: [
      'Karena function terlalu lambat untuk DML',
      'Oracle melarang side effect dalam function yang dipanggil di SQL untuk menjaga konsistensi data',
      'DML hanya bisa di procedure',
      'Function hanya bisa return NUMBER'
    ],
    correctAnswer: 1,
    explanation: 'Function yang dipanggil di SQL query tidak boleh melakukan DML karena SQL engine bisa memanggil function berkali-kali dengan urutan yang tidak terduga. DML di function bisa menyebabkan side effect yang merusak konsistensi data.',
    tags: ['function', 'DML', 'side effect', 'purity', 'day3']
  },
  {
    id: 'cat07-m-008',
    category: 'functions',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa yang terjadi jika function tidak punya statement RETURN di salah satu execution path?',
    options: [
      'Mengembalikan NULL otomatis',
      'Error kompilasi (warning/error)',
      'Mengembalikan 0',
      'Tidak ada masalah'
    ],
    correctAnswer: 1,
    explanation: 'Function WAJIB mengembalikan nilai di SEMUA execution path. Jika ada path yang tidak punya RETURN, Oracle menghasilkan warning "Function returned without value" dan runtime error saat path tersebut dieksekusi.',
    tags: ['RETURN', 'function', 'execution path', 'day3']
  },
];

export const cat07MateriCode: CodeChallenge[] = [
  {
    id: 'cat07-mc-001',
    category: 'functions',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat function HR.FNC_GET_AVG_SAL yang menerima department_id dan mengembalikan rata-rata gaji karyawan di department tersebut.',
    requirements: [
      'Parameter: p_dept_id (bertipe %TYPE dari DEPARTMENTS.DEPARTMENT_ID)',
      'RETURN NUMBER',
      'Gunakan SELECT AVG(salary) INTO',
      'RETURN hasil rata-rata'
    ],
    starterCode: `CREATE OR REPLACE FUNCTION HR.FNC_GET_AVG_SAL
(
  -- definisikan parameter
)
RETURN NUMBER AS
  -- deklarasikan variabel lokal
BEGIN
  -- SELECT INTO dan RETURN
END;`,
    solution: `CREATE OR REPLACE FUNCTION HR.FNC_GET_AVG_SAL
(
  p_dept_id HR.DEPARTMENTS.DEPARTMENT_ID%TYPE
)
RETURN NUMBER AS
  v_avg_sal NUMBER;
BEGIN
  SELECT AVG(salary) 
  INTO v_avg_sal 
  FROM HR.EMPLOYEES 
  WHERE department_id = p_dept_id;
  
  RETURN v_avg_sal;
END;`,
    hints: [
      'Parameter bertipe HR.DEPARTMENTS.DEPARTMENT_ID%TYPE',
      'SELECT AVG(salary) INTO v_avg_sal FROM HR.EMPLOYEES WHERE ...',
      'RETURN v_avg_sal; di akhir'
    ],
    validationRules: {
      mustContain: ['CREATE', 'FUNCTION', 'RETURN', 'NUMBER', 'SELECT', 'AVG', 'INTO', '%TYPE'],
    },
    tags: ['function', 'AVG', 'RETURN', 'day3']
  },
  {
    id: 'cat07-mc-002',
    category: 'functions',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Tulis anonymous block yang memanggil function FNC_GET_AVG_SAL(50) dan mencetak hasilnya.',
    requirements: [
      'Deklarasikan variabel untuk menampung hasil',
      'Panggil function dengan department_id 50',
      'Cetak hasil dengan DBMS_OUTPUT.PUT_LINE'
    ],
    starterCode: `DECLARE
  -- deklarasikan variabel
BEGIN
  -- panggil function dan cetak
END;`,
    solution: `DECLARE
  v_avg_salary NUMBER;
BEGIN
  v_avg_salary := FNC_GET_AVG_SAL(50);
  DBMS_OUTPUT.PUT_LINE(v_avg_salary);
END;`,
    hints: [
      'v_avg_salary NUMBER; untuk deklarasi',
      'v_avg_salary := function_name(arg);',
      'DBMS_OUTPUT.PUT_LINE(variabel); untuk cetak'
    ],
    validationRules: {
      mustContain: ['DECLARE', 'NUMBER', 'FNC_GET_AVG_SAL', 'DBMS_OUTPUT', 'BEGIN', 'END'],
    },
    tags: ['function call', 'anonymous block', 'day3']
  },
];
