// ==========================================
// Soal Tambahan Kategori 3 — Berdasarkan Materi Day 2 & 3
// IF, CASE, DECODE, LOOP, WHILE, FOR, Nested, CONTINUE, GOTO
// 15 MCQ + 5 Code Challenge = 20 soal
// ==========================================

import { MCQuestion, CodeChallenge } from '@/types';

export const cat03MateriMCQ: MCQuestion[] = [
  {
    id: 'cat03-m-001',
    category: 'control-structures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa output dari kode berikut?\nDECLARE v_number NUMBER := 30;\nBEGIN\n  IF v_number < 10 THEN DBMS_OUTPUT.PUT_LINE(\'< 10\');\n  ELSIF v_number < 20 THEN DBMS_OUTPUT.PUT_LINE(\'< 20\');\n  ELSIF v_number < 30 THEN DBMS_OUTPUT.PUT_LINE(\'< 30\');\n  ELSE DBMS_OUTPUT.PUT_LINE(\'>= 30\');\n  END IF;\nEND;',
    options: [
      '< 10',
      '< 20',
      '< 30',
      '>= 30'
    ],
    correctAnswer: 3,
    explanation: 'v_number = 30. Cek: 30 < 10? NO. 30 < 20? NO. 30 < 30? NO (30 tidak kurang dari 30, sama saja). Masuk ELSE. Output: ">= 30".',
    tags: ['IF', 'ELSIF', 'ELSE', 'day2']
  },
  {
    id: 'cat03-m-002',
    category: 'control-structures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa perbedaan Simple CASE dan Searched CASE di PL/SQL?',
    options: [
      'Simple CASE menggunakan selector variable, Searched CASE menggunakan kondisi boolean di setiap WHEN',
      'Tidak ada perbedaan',
      'Simple CASE hanya untuk angka, Searched CASE hanya untuk string',
      'Searched CASE lebih lambat dari Simple CASE'
    ],
    correctAnswer: 0,
    explanation: 'Simple CASE: CASE v_grade WHEN \'A\' THEN... (bandingkan satu variabel). Searched CASE: CASE WHEN salary > 10000 THEN... (setiap WHEN punya kondisi sendiri, lebih fleksibel).',
    tags: ['CASE', 'simple', 'searched', 'day2']
  },
  {
    id: 'cat03-m-003',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa output dari Simple CASE berikut?\nDECLARE v_grade VARCHAR2(1) := \'B\';\nBEGIN\n  CASE v_grade\n    WHEN \'A\' THEN DBMS_OUTPUT.PUT_LINE(\'Excellent\');\n    WHEN \'B\' THEN DBMS_OUTPUT.PUT_LINE(\'Good\');\n    WHEN \'C\' THEN DBMS_OUTPUT.PUT_LINE(\'Enough\');\n    ELSE DBMS_OUTPUT.PUT_LINE(\'Fail\');\n  END CASE;\nEND;',
    options: [
      'Excellent',
      'Good',
      'Enough',
      'Fail'
    ],
    correctAnswer: 1,
    explanation: 'Simple CASE membandingkan v_grade dengan setiap WHEN. v_grade = \'B\' cocok dengan WHEN \'B\', output: "Good".',
    tags: ['CASE', 'simple', 'day2']
  },
  {
    id: 'cat03-m-004',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi DECODE dalam Oracle SQL?',
    options: [
      'Mengenkripsi data',
      'Mengubah encoding karakter',
      'Fungsi kondisional mirip CASE, mengembalikan nilai berdasarkan perbandingan',
      'Mendekode binary ke text'
    ],
    correctAnswer: 2,
    explanation: 'DECODE(expr, val1, result1, val2, result2, ..., default) mirip simple CASE. Contoh: DECODE(dept_id, 60, \'IT\', 100, \'Finance\', \'Other\'). Hanya bisa di SQL, bukan PL/SQL block.',
    tags: ['DECODE', 'day2']
  },
  {
    id: 'cat03-m-005',
    category: 'control-structures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Pada Basic LOOP, kapan loop berhenti?',
    options: [
      'Otomatis setelah 100 iterasi',
      'Saat kondisi awal FALSE',
      'Saat EXIT atau EXIT WHEN ditemui',
      'Saat variabel counter habis'
    ],
    correctAnswer: 2,
    explanation: 'Basic LOOP (LOOP...END LOOP) berulang tanpa batas. HARUS ada EXIT atau EXIT WHEN di dalamnya, kalau tidak loop berjalan selamanya (infinite loop). Loop ini selalu dieksekusi MINIMAL satu kali.',
    tags: ['LOOP', 'EXIT', 'day2']
  },
  {
    id: 'cat03-m-006',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan EXIT dan EXIT WHEN di dalam loop?',
    options: [
      'EXIT langsung keluar loop tanpa syarat; EXIT WHEN keluar hanya jika kondisi TRUE',
      'EXIT WHEN langsung keluar; EXIT perlu kondisi',
      'Tidak ada perbedaan',
      'EXIT hanya untuk FOR loop, EXIT WHEN untuk WHILE loop'
    ],
    correctAnswer: 0,
    explanation: 'EXIT langsung keluar dari loop (biasanya dalam IF block). EXIT WHEN kondisi = shortcut, lebih ringkas dari IF kondisi THEN EXIT; END IF;.',
    tags: ['EXIT', 'EXIT WHEN', 'LOOP', 'day2']
  },
  {
    id: 'cat03-m-007',
    category: 'control-structures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Pada WHILE LOOP, kapan kondisi dicek?',
    options: [
      'Setelah setiap iterasi',
      'Sebelum setiap iterasi',
      'Hanya di awal loop',
      'Hanya di akhir loop'
    ],
    correctAnswer: 1,
    explanation: 'WHILE LOOP mengecek kondisi SEBELUM setiap iterasi. Jika kondisi FALSE dari awal, body loop TIDAK pernah dieksekusi. Berbeda dengan Basic LOOP yang selalu dieksekusi minimal sekali.',
    tags: ['WHILE', 'LOOP', 'day3']
  },
  {
    id: 'cat03-m-008',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa output dari kode ini?\nBEGIN\n  FOR i IN 1..3 LOOP\n    FOR j IN 1..2 LOOP\n      DBMS_OUTPUT.PUT_LINE(\'i=\' || i || \',j=\' || j);\n    END LOOP;\n  END LOOP;\nEND;\n\nBerapa kali PUT_LINE dieksekusi?',
    options: [
      '3 kali',
      '5 kali',
      '6 kali',
      '9 kali'
    ],
    correctAnswer: 2,
    explanation: 'Outer loop (i) berjalan 3 kali (1,2,3). Inner loop (j) berjalan 2 kali (1,2) untuk setiap iterasi i. Total: 3 × 2 = 6 kali PUT_LINE dieksekusi.',
    tags: ['nested loop', 'FOR', 'day3']
  },
  {
    id: 'cat03-m-009',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan DBMS_OUTPUT.PUT() dan DBMS_OUTPUT.PUT_LINE()?',
    options: [
      'PUT() mencetak tanpa newline; PUT_LINE() mencetak dengan newline',
      'PUT() lebih cepat dari PUT_LINE()',
      'PUT_LINE() hanya untuk angka, PUT() untuk string',
      'Tidak ada perbedaan'
    ],
    correctAnswer: 0,
    explanation: 'PUT() mencetak teks TANPA newline (baris baru). PUT_LINE() mencetak teks DENGAN newline di akhir. Gunakan PUT() + NEW_LINE() untuk kontrol baris yang lebih fleksibel.',
    tags: ['DBMS_OUTPUT', 'PUT', 'PUT_LINE', 'day3']
  },
  {
    id: 'cat03-m-010',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi CONTINUE dalam loop?',
    options: [
      'Menghentikan loop sepenuhnya',
      'Melewati sisa kode iterasi saat ini dan lanjut ke iterasi berikutnya',
      'Melanjutkan loop dari awal',
      'Menjalankan iterasi sebanyak dua kali'
    ],
    correctAnswer: 1,
    explanation: 'CONTINUE melompat ke iterasi berikutnya, melewati sisa kode dalam iterasi saat ini. Contoh: jika CONTINUE saat i=4, kode setelah CONTINUE tidak dijalankan untuk i=4, langsung ke i=5.',
    tags: ['CONTINUE', 'LOOP', 'day3']
  },
  {
    id: 'cat03-m-011',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa output dari:\nBEGIN\n  FOR i IN 1..10 LOOP\n    CONTINUE WHEN MOD(i,2) = 0;\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;',
    options: [
      '1 2 3 4 5 6 7 8 9 10',
      '2 4 6 8 10',
      '1 3 5 7 9',
      '1 2 3 4 5'
    ],
    correctAnswer: 2,
    explanation: 'CONTINUE WHEN MOD(i,2) = 0 melewati iterasi saat i genap (MOD = sisa bagi, genap sisa 0). Jadi hanya bilangan ganjil (1,3,5,7,9) yang dicetak.',
    tags: ['CONTINUE WHEN', 'MOD', 'day3']
  },
  {
    id: 'cat03-m-012',
    category: 'control-structures',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Mengapa GOTO sebaiknya dihindari dalam pemrograman PL/SQL?',
    options: [
      'GOTO menyebabkan error',
      'GOTO tidak didukung di PL/SQL',
      'GOTO membuat kode sulit dipahami (spaghetti code) dan sulit di-debug',
      'GOTO lebih lambat dari loop'
    ],
    correctAnswer: 2,
    explanation: 'GOTO melompat ke label tertentu, membuat alur program tidak linear (spaghetti code). Lebih baik gunakan loop dengan EXIT/CONTINUE yang lebih terstruktur dan readable. GOTO masih valid tapi tidak direkomendasikan.',
    tags: ['GOTO', 'best practice', 'day3']
  },
  {
    id: 'cat03-m-013',
    category: 'control-structures',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Pada FOR LOOP, apakah counter variable perlu dideklarasikan di DECLARE?',
    options: [
      'Ya, harus dideklarasikan',
      'Tidak, counter otomatis dibuat (implicit) dan read-only',
      'Tergantung tipe data counter',
      'Hanya perlu jika counter dimulai dari 0'
    ],
    correctAnswer: 1,
    explanation: 'Counter di FOR LOOP otomatis dibuat (implicit), tidak perlu deklarasi. Counter bersifat read-only (tidak bisa diubah di dalam loop) dan hanya tersedia di dalam loop tersebut.',
    tags: ['FOR LOOP', 'counter', 'implicit', 'day3']
  },
  {
    id: 'cat03-m-014',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa yang terjadi pada WHILE loop jika EXIT WHEN v_counter > 3 ada di dalamnya?\nDECLARE v_counter NUMBER := 1;\nBEGIN WHILE v_counter <= 10 LOOP\n  PUT_LINE(v_counter); v_counter := v_counter + 1;\n  EXIT WHEN v_counter > 3;\nEND LOOP; END;',
    options: [
      'Mencetak 1 sampai 10',
      'Mencetak 1, 2, 3 saja',
      'Mencetak 1, 2, 3, 4',
      'Infinite loop'
    ],
    correctAnswer: 1,
    explanation: 'WHILE cek v_counter <= 10. Di dalam loop ada EXIT WHEN v_counter > 3. Saat v_counter = 1,2,3 dicetak. Setelah v_counter di-increment ke 4, EXIT WHEN 4 > 3 = TRUE, keluar loop. Output: 1, 2, 3.',
    tags: ['WHILE', 'EXIT WHEN', 'day3']
  },
  {
    id: 'cat03-m-015',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi label <<start_loop>> dalam kode GOTO?',
    options: [
      'Komentar biasa',
      'Nama variabel',
      'Titik tujuan (target) untuk lompatan GOTO',
      'Nama procedure'
    ],
    correctAnswer: 2,
    explanation: '<<label>> mendefinisikan titik tujuan untuk GOTO. Saat GOTO start_loop; dieksekusi, program melompat ke posisi <<start_loop>>. Label juga bisa digunakan untuk memberi nama pada loop.',
    tags: ['GOTO', 'label', 'day3']
  },
];

export const cat03MateriCode: CodeChallenge[] = [
  {
    id: 'cat03-mc-001',
    category: 'control-structures',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Buat Searched CASE yang mengecek variabel v_salary: >= 10000 cetak "High Salary", >= 5000 cetak "Medium Salary", selainnya cetak "Low Salary".',
    requirements: [
      'Deklarasikan v_salary bertipe NUMBER',
      'Gunakan Searched CASE (tanpa selector)',
      'Tiga kondisi: >= 10000, >= 5000, dan ELSE'
    ],
    starterCode: `DECLARE
  v_salary NUMBER := 7000;
BEGIN
  -- lengkapi Searched CASE
END;`,
    solution: `DECLARE
  v_salary NUMBER := 7000;
BEGIN
  CASE
    WHEN v_salary >= 10000 THEN
      DBMS_OUTPUT.PUT_LINE('High Salary');
    WHEN v_salary >= 5000 THEN
      DBMS_OUTPUT.PUT_LINE('Medium Salary');
    ELSE
      DBMS_OUTPUT.PUT_LINE('Low Salary');
  END CASE;
END;`,
    hints: [
      'Searched CASE dimulai dengan CASE tanpa variabel selector',
      'Setiap WHEN memiliki kondisi boolean sendiri',
      'Akhiri dengan END CASE;'
    ],
    validationRules: {
      mustContain: ['CASE', 'WHEN', 'THEN', 'ELSE', 'END CASE', 'DBMS_OUTPUT'],
    },
    tags: ['CASE', 'searched', 'day2']
  },
  {
    id: 'cat03-mc-002',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat FOR LOOP yang mengambil jumlah region dari HR.REGIONS menggunakan SELECT INTO, lalu loop dari 1 sampai jumlah tersebut.',
    requirements: [
      'Gunakan SELECT COUNT(*) INTO',
      'Gunakan FOR LOOP dengan range variabel',
      'Cetak nomor loop dengan DBMS_OUTPUT.PUT_LINE'
    ],
    starterCode: `DECLARE
  v_total NUMBER;
BEGIN
  -- SELECT COUNT INTO
  -- FOR LOOP
END;`,
    solution: `DECLARE
  v_total NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_total FROM HR.REGIONS;
  
  FOR i IN 1..v_total LOOP
    DBMS_OUTPUT.PUT_LINE('Loop ke-' || i);
  END LOOP;
END;`,
    hints: [
      'SELECT COUNT(*) INTO v_total FROM HR.REGIONS;',
      'FOR i IN 1..v_total LOOP',
      'Counter i bersifat implicit, tidak perlu dideklarasikan'
    ],
    validationRules: {
      mustContain: ['SELECT', 'COUNT', 'INTO', 'FOR', 'IN', 'LOOP', 'END LOOP', 'DBMS_OUTPUT'],
    },
    tags: ['FOR LOOP', 'SELECT INTO', 'day3']
  },
  {
    id: 'cat03-mc-003',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat nested loop yang menghasilkan pola segitiga angka:\n1\n12\n123\n1234\n12345',
    requirements: [
      'Gunakan nested FOR LOOP',
      'Outer loop 1..5, inner loop 1..i',
      'Gunakan DBMS_OUTPUT.PUT() dan NEW_LINE()'
    ],
    starterCode: `BEGIN
  -- lengkapi nested loop untuk pola segitiga
END;`,
    solution: `BEGIN
  FOR i IN 1..5 LOOP
    FOR j IN 1..i LOOP
      DBMS_OUTPUT.PUT(j);
    END LOOP;
    DBMS_OUTPUT.NEW_LINE();
  END LOOP;
END;`,
    hints: [
      'Outer loop menentukan jumlah baris (1..5)',
      'Inner loop range: 1..i (semakin banyak angka setiap baris)',
      'PUT() tanpa newline, NEW_LINE() untuk pindah baris'
    ],
    validationRules: {
      mustContain: ['FOR', 'LOOP', 'END LOOP', 'DBMS_OUTPUT.PUT', 'NEW_LINE'],
    },
    tags: ['nested loop', 'pattern', 'day3']
  },
  {
    id: 'cat03-mc-004',
    category: 'control-structures',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat FOR LOOP dari 1 sampai 10 yang hanya mencetak bilangan ganjil menggunakan CONTINUE WHEN.',
    requirements: [
      'Gunakan FOR LOOP 1..10',
      'Gunakan CONTINUE WHEN untuk skip bilangan genap',
      'Gunakan MOD untuk cek genap/ganjil'
    ],
    starterCode: `BEGIN
  FOR i IN 1..10 LOOP
    -- skip bilangan genap dengan CONTINUE WHEN
    DBMS_OUTPUT.PUT_LINE('Bilangan ganjil : ' || i);
  END LOOP;
END;`,
    solution: `BEGIN
  FOR i IN 1..10 LOOP
    CONTINUE WHEN MOD(i, 2) = 0;
    DBMS_OUTPUT.PUT_LINE('Bilangan ganjil : ' || i);
  END LOOP;
END;`,
    hints: [
      'MOD(i, 2) menghitung sisa bagi i dibagi 2',
      'Jika sisa = 0, i genap → skip',
      'CONTINUE WHEN MOD(i, 2) = 0; di awal loop'
    ],
    validationRules: {
      mustContain: ['FOR', 'LOOP', 'CONTINUE WHEN', 'MOD', 'DBMS_OUTPUT'],
    },
    tags: ['CONTINUE WHEN', 'MOD', 'day3']
  },
  {
    id: 'cat03-mc-005',
    category: 'control-structures',
    difficulty: 'Hard',
    type: 'code_challenge',
    question: 'Buat WHILE LOOP yang mencetak counter dari 1 sampai 10, tapi berhenti lebih awal jika counter > 3 menggunakan EXIT WHEN.',
    requirements: [
      'Deklarasikan v_counter NUMBER := 1',
      'WHILE v_counter <= 10',
      'Cetak counter setiap iterasi',
      'EXIT WHEN v_counter > 3'
    ],
    starterCode: `DECLARE
  v_counter NUMBER := 1;
BEGIN
  -- lengkapi WHILE LOOP dengan EXIT WHEN
END;`,
    solution: `DECLARE
  v_counter NUMBER := 1;
BEGIN
  WHILE v_counter <= 10 LOOP
    DBMS_OUTPUT.PUT_LINE('Counter : ' || v_counter);
    v_counter := v_counter + 1;
    EXIT WHEN v_counter > 3;
  END LOOP;
END;`,
    hints: [
      'WHILE v_counter <= 10 LOOP',
      'Cetak dulu, lalu increment counter',
      'EXIT WHEN v_counter > 3 di akhir loop body'
    ],
    validationRules: {
      mustContain: ['WHILE', 'LOOP', 'EXIT WHEN', 'DBMS_OUTPUT', 'v_counter'],
    },
    tags: ['WHILE', 'EXIT WHEN', 'day3']
  },
];
