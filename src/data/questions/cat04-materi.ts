// ==========================================
// Soal Tambahan Kategori 4 — Berdasarkan Materi Day 3
// Explicit Cursor, Parameter, FOR Loop, %NOTFOUND
// 10 MCQ + 2 Code Challenge = 12 soal
// ==========================================

import { MCQuestion, CodeChallenge } from '@/types';

export const cat04MateriMCQ: MCQuestion[] = [
  {
    id: 'cat04-m-001',
    category: 'cursors',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa urutan lifecycle (siklus hidup) explicit cursor yang benar?',
    options: [
      'OPEN → CLOSE → FETCH',
      'DECLARE → OPEN → FETCH → CLOSE',
      'FETCH → OPEN → DECLARE → CLOSE',
      'DECLARE → FETCH → OPEN → CLOSE'
    ],
    correctAnswer: 1,
    explanation: 'Urutan yang benar: DECLARE (definisi query di DECLARE section) → OPEN (eksekusi query) → FETCH (ambil data baris per baris) → CLOSE (lepas resource). Jangan lupa CLOSE agar tidak ada memory leak.',
    tags: ['cursor', 'lifecycle', 'day3']
  },
  {
    id: 'cat04-m-002',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi %NOTFOUND pada cursor?',
    options: [
      'Mengecek apakah cursor sudah di-OPEN',
      'Mengembalikan TRUE jika FETCH terakhir tidak menemukan data',
      'Menghitung jumlah baris yang diambil',
      'Menutup cursor secara otomatis'
    ],
    correctAnswer: 1,
    explanation: '%NOTFOUND mengembalikan TRUE jika FETCH terakhir TIDAK berhasil mengambil baris (data habis). Biasanya digunakan sebagai kondisi EXIT: EXIT WHEN c_emp%NOTFOUND;',
    tags: ['%NOTFOUND', 'cursor attribute', 'day3']
  },
  {
    id: 'cat04-m-003',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa keuntungan menggunakan Cursor FOR LOOP dibanding OPEN-FETCH-CLOSE manual?',
    options: [
      'Cursor FOR LOOP lebih lambat tapi lebih aman',
      'Cursor FOR LOOP otomatis OPEN, FETCH, CLOSE — lebih ringkas dan tidak bisa lupa CLOSE',
      'Cursor FOR LOOP tidak bisa menggunakan parameter',
      'OPEN-FETCH-CLOSE lebih ringkas'
    ],
    correctAnswer: 1,
    explanation: 'Cursor FOR LOOP otomatis menangani OPEN, FETCH, dan CLOSE. Variabel record (rec) juga otomatis dibuat. Jauh lebih ringkas dan aman karena tidak mungkin lupa menutup cursor.',
    tags: ['cursor FOR loop', 'day3']
  },
  {
    id: 'cat04-m-004',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Pada kode:\nCURSOR c_emp (v_dept_id VARCHAR2 DEFAULT 30, v_job_id VARCHAR2 DEFAULT \'PU_CLERK\') IS ...\nOPEN c_emp();\n\nApa yang terjadi saat OPEN c_emp() dipanggil tanpa parameter?',
    options: [
      'Error karena parameter kosong',
      'Menggunakan nilai default: department 30 dan job PU_CLERK',
      'Mengambil semua data tanpa filter',
      'Cursor tidak bisa dibuka'
    ],
    correctAnswer: 1,
    explanation: 'Cursor memiliki DEFAULT value pada parameter. Saat dipanggil tanpa argumen (c_emp()), parameter menggunakan nilai default yang sudah ditentukan: department_id = 30, job_id = \'PU_CLERK\'.',
    tags: ['cursor parameter', 'DEFAULT', 'day3']
  },
  {
    id: 'cat04-m-005',
    category: 'cursors',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa yang terjadi jika cursor tidak di-CLOSE setelah selesai digunakan?',
    options: [
      'Tidak ada masalah',
      'Data otomatis tersimpan ke tabel',
      'Memory leak — resource tidak dilepas, bisa kehabisan cursor di session',
      'Data yang di-FETCH hilang'
    ],
    correctAnswer: 2,
    explanation: 'Setiap cursor yang di-OPEN menggunakan memory. Jika tidak di-CLOSE, resource tidak dilepas (memory leak). Oracle memiliki batas jumlah cursor terbuka per session (OPEN_CURSORS parameter).',
    tags: ['cursor', 'CLOSE', 'memory leak', 'day3']
  },
  {
    id: 'cat04-m-006',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Pada Cursor FOR LOOP:\nFOR rec IN c_emp(\'30\',\'PU_CLERK\') LOOP\nBagaimana mengakses kolom employee_id?',
    options: [
      'employee_id',
      'rec.employee_id',
      'c_emp.employee_id',
      'rec(employee_id)'
    ],
    correctAnswer: 1,
    explanation: 'Pada cursor FOR LOOP, variabel rec otomatis menjadi record yang berisi semua kolom dari cursor query. Akses kolom dengan notasi dot: rec.employee_id, rec.salary, dll.',
    tags: ['cursor FOR loop', 'record', 'day3']
  },
  {
    id: 'cat04-m-007',
    category: 'cursors',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Perhatikan kode cursor:\nCURSOR c_emp IS SELECT employee_id, salary FROM employees WHERE salary > 2500;\nFOR rec IN c_emp LOOP\n  DBMS_OUTPUT.PUT_LINE(rec.employee_id);\nEND LOOP;\n\nApakah perlu menulis OPEN dan CLOSE?',
    options: [
      'Ya, OPEN sebelum FOR dan CLOSE setelah END LOOP',
      'Tidak, cursor FOR LOOP otomatis melakukan OPEN, FETCH, dan CLOSE',
      'Ya, CLOSE saja setelah END LOOP',
      'Ya, OPEN saja sebelum FOR'
    ],
    correctAnswer: 1,
    explanation: 'Cursor FOR LOOP menangani SEMUA lifecycle cursor secara otomatis: OPEN (saat masuk loop), FETCH (setiap iterasi), CLOSE (saat keluar loop). Tidak perlu dan TIDAK BOLEH menulis OPEN/CLOSE manual.',
    tags: ['cursor FOR loop', 'automatic', 'day3']
  },
  {
    id: 'cat04-m-008',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan utama antara implicit cursor dan explicit cursor?',
    options: [
      'Implicit cursor lebih cepat',
      'Implicit cursor otomatis dibuat Oracle untuk DML/SELECT INTO; explicit cursor dideklarasikan manual oleh programmer',
      'Explicit cursor tidak bisa menggunakan parameter',
      'Implicit cursor harus di-CLOSE manual'
    ],
    correctAnswer: 1,
    explanation: 'Implicit cursor: otomatis dibuat Oracle untuk INSERT, UPDATE, DELETE, SELECT INTO — tanpa DECLARE. Explicit cursor: dideklarasikan manual di DECLARE section, dikontrol dengan OPEN/FETCH/CLOSE.',
    tags: ['implicit cursor', 'explicit cursor', 'day3']
  },
  {
    id: 'cat04-m-009',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Pada explicit cursor, berapa baris data yang diambil oleh satu kali FETCH?',
    options: [
      'Semua baris sekaligus',
      'Satu baris per FETCH',
      '10 baris per FETCH',
      'Tergantung ukuran buffer'
    ],
    correctAnswer: 1,
    explanation: 'FETCH mengambil satu baris data pada setiap pemanggilan. Untuk mengambil semua baris, FETCH harus diletakkan di dalam LOOP dan berhenti saat %NOTFOUND = TRUE.',
    tags: ['FETCH', 'cursor', 'day3']
  },
  {
    id: 'cat04-m-010',
    category: 'cursors',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Perhatikan deklarasi variabel untuk FETCH:\nv_emp_id employees.employee_id%TYPE;\nv_salary employees.salary%TYPE;\n\nMengapa menggunakan %TYPE alih-alih menulis tipe data langsung?',
    options: [
      'Mirip coding style yang lebih pendek',
      'Agar tipe variabel otomatis sinkron dengan kolom tabel, maintenance lebih mudah',
      'Wajib menggunakan %TYPE untuk cursor',
      'Lebih cepat saat runtime'
    ],
    correctAnswer: 1,
    explanation: '%TYPE memastikan variabel selalu sinkron dengan tipe kolom tabel. Jika tipe salary berubah dari NUMBER(8,2) ke NUMBER(10,2), variabel otomatis mengikuti tanpa ubah kode. Ini best practice untuk maintenance.',
    tags: ['%TYPE', 'cursor', 'best practice', 'day3']
  },
];

export const cat04MateriCode: CodeChallenge[] = [
  {
    id: 'cat04-mc-001',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat explicit cursor dengan parameter untuk mengambil employee_id dan salary dari employees berdasarkan department_id dan job_id. Gunakan cursor FOR loop untuk menampilkan hasilnya.',
    requirements: [
      'CURSOR memiliki parameter v_department_id dan v_job_id',
      'Query dengan WHERE salary > 2500',
      'Gunakan cursor FOR LOOP (bukan OPEN-FETCH-CLOSE)',
      'Panggil dengan department 30 dan job PU_CLERK'
    ],
    starterCode: `DECLARE
  -- deklarasikan cursor dengan parameter
BEGIN
  -- gunakan FOR LOOP
END;`,
    solution: `DECLARE
  CURSOR c_emp (v_department_id VARCHAR2, v_job_id VARCHAR2) IS
    SELECT employee_id, salary
    FROM employees
    WHERE department_id = v_department_id
      AND job_id = v_job_id
      AND salary > 2500;
BEGIN
  FOR rec IN c_emp('30', 'PU_CLERK') LOOP
    DBMS_OUTPUT.PUT_LINE('ID : ' || rec.employee_id || ' Salary : ' || rec.salary);
  END LOOP;
END;`,
    hints: [
      'CURSOR nama (param1 TYPE, param2 TYPE) IS SELECT...',
      'FOR rec IN cursor_name(arg1, arg2) LOOP',
      'Akses kolom dengan rec.nama_kolom'
    ],
    validationRules: {
      mustContain: ['CURSOR', 'SELECT', 'employee_id', 'salary', 'FOR', 'LOOP', 'END LOOP', 'DBMS_OUTPUT'],
    },
    tags: ['cursor', 'FOR loop', 'parameter', 'day3']
  },
  {
    id: 'cat04-mc-002',
    category: 'cursors',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat explicit cursor dengan OPEN-FETCH-CLOSE untuk mengambil employee_id dan salary. Gunakan %TYPE untuk variabel penampung dan EXIT WHEN %NOTFOUND.',
    requirements: [
      'Deklarasikan cursor tanpa parameter',
      'Variabel penampung menggunakan %TYPE',
      'OPEN → LOOP → FETCH → EXIT WHEN %NOTFOUND → CLOSE',
      'Cetak ID dan salary'
    ],
    starterCode: `DECLARE
  CURSOR c_emp IS
    SELECT employee_id, salary FROM employees WHERE department_id = 30;
  -- deklarasikan variabel penampung dengan %TYPE
BEGIN
  -- OPEN, LOOP, FETCH, CLOSE
END;`,
    solution: `DECLARE
  CURSOR c_emp IS
    SELECT employee_id, salary FROM employees WHERE department_id = 30;
  v_emp_id employees.employee_id%TYPE;
  v_salary employees.salary%TYPE;
BEGIN
  OPEN c_emp;
  LOOP
    FETCH c_emp INTO v_emp_id, v_salary;
    EXIT WHEN c_emp%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('ID: ' || v_emp_id || ' Salary: ' || v_salary);
  END LOOP;
  CLOSE c_emp;
END;`,
    hints: [
      'v_emp_id employees.employee_id%TYPE; untuk deklarasi',
      'FETCH cursor INTO var1, var2;',
      'EXIT WHEN c_emp%NOTFOUND; untuk kondisi keluar'
    ],
    validationRules: {
      mustContain: ['CURSOR', 'OPEN', 'FETCH', 'INTO', '%NOTFOUND', 'CLOSE', '%TYPE', 'LOOP'],
    },
    tags: ['cursor', 'OPEN', 'FETCH', 'CLOSE', 'day3']
  },
];
