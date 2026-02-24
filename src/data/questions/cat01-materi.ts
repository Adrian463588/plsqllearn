// ==========================================
// Soal Tambahan Kategori 1 — Berdasarkan Materi Day 1
// SELECT, CREATE TABLE, INSERT, JOIN, ALTER, Subquery, Aggregate, Constraints
// 25 MCQ + 5 Code Challenge = 30 soal
// ==========================================

import { MCQuestion, CodeChallenge } from '@/types';

export const cat01MateriMCQ: MCQuestion[] = [
  {
    id: 'cat01-m-001',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa fungsi dari tanda * (asterisk) dalam perintah SELECT * FROM HR.COUNTRIES?',
    options: [
      'Menghitung jumlah baris',
      'Mengambil semua kolom dari tabel',
      'Menghapus semua data dari tabel',
      'Membuat tabel baru'
    ],
    correctAnswer: 1,
    explanation: 'Tanda * (asterisk) dalam SELECT berarti memilih SEMUA kolom dari tabel. SELECT * FROM HR.COUNTRIES akan menampilkan seluruh kolom yang ada di tabel COUNTRIES.',
    tags: ['SELECT', 'dasar', 'day1']
  },
  {
    id: 'cat01-m-002',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Pada query SELECT e.salary FROM HR.EMPLOYEES e ORDER BY 1 ASC, apa arti ORDER BY 1?',
    options: [
      'Mengurutkan berdasarkan kolom pertama (salary)',
      'Hanya menampilkan 1 baris',
      'Mengurutkan berdasarkan employee_id',
      'Menampilkan salary = 1'
    ],
    correctAnswer: 0,
    explanation: 'ORDER BY 1 artinya mengurutkan berdasarkan kolom pertama yang disebutkan di SELECT, yaitu salary. ASC = ascending (menaik). Cara ini praktis tapi kurang readable dibanding ORDER BY salary.',
    tags: ['ORDER BY', 'SELECT', 'day1']
  },
  {
    id: 'cat01-m-003',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa fungsi dari alias (misalnya c pada FROM HR.COUNTRIES c)?',
    options: [
      'Mengganti nama tabel di database',
      'Membuat tabel duplikat',
      'Memperpendek penulisan nama tabel dalam query',
      'Menghapus tabel lama'
    ],
    correctAnswer: 2,
    explanation: 'Alias seperti "c" pada FROM HR.COUNTRIES c hanya memperpendek penulisan. Alih-alih menulis HR.COUNTRIES.country_name, cukup tulis c.country_name. Alias tidak mengubah nama tabel di database.',
    tags: ['alias', 'SELECT', 'day1']
  },
  {
    id: 'cat01-m-004',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa constraint yang memastikan sebuah kolom tidak boleh kosong (harus punya nilai)?',
    options: [
      'PRIMARY KEY',
      'UNIQUE',
      'NOT NULL',
      'CHECK'
    ],
    correctAnswer: 2,
    explanation: 'NOT NULL constraint memastikan kolom harus memiliki nilai, tidak boleh NULL. Contoh: COUNTRY_NAME VARCHAR2(40) NOT NULL artinya setiap baris harus punya country_name.',
    tags: ['constraint', 'NOT NULL', 'day1']
  },
  {
    id: 'cat01-m-005',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi ON DELETE CASCADE pada foreign key constraint?',
    options: [
      'Menghapus foreign key constraint',
      'Mencegah penghapusan data parent',
      'Otomatis menghapus data child saat data parent dihapus',
      'Mengubah nilai foreign key menjadi NULL saat parent dihapus'
    ],
    correctAnswer: 2,
    explanation: 'ON DELETE CASCADE artinya saat baris di tabel parent (referensi) dihapus, semua baris terkait di tabel child juga ikut terhapus secara otomatis.',
    tags: ['foreign key', 'CASCADE', 'constraint', 'day1']
  },
  {
    id: 'cat01-m-006',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Perintah mana yang digunakan untuk menambahkan data baru ke tabel?',
    options: [
      'UPDATE',
      'INSERT INTO',
      'ALTER TABLE',
      'CREATE'
    ],
    correctAnswer: 1,
    explanation: 'INSERT INTO digunakan untuk menambahkan data baru ke tabel. Contoh: INSERT INTO HR.COUNTRIESS (country_id, country_name, region_id) VALUES (01, \'Indonesia\', 3).',
    tags: ['INSERT', 'DML', 'day1']
  },
  {
    id: 'cat01-m-007',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan TRUNCATE TABLE dan DELETE FROM?',
    options: [
      'Tidak ada perbedaan',
      'TRUNCATE menghapus struktur tabel, DELETE tidak',
      'TRUNCATE menghapus semua data tanpa bisa rollback, DELETE bisa rollback',
      'DELETE lebih cepat dari TRUNCATE'
    ],
    correctAnswer: 2,
    explanation: 'TRUNCATE menghapus SEMUA data sekaligus (DDL, tidak bisa rollback, lebih cepat). DELETE menghapus baris satu per satu (DML, bisa rollback, bisa pakai WHERE). TRUNCATE tidak menghapus struktur tabel.',
    tags: ['TRUNCATE', 'DELETE', 'DDL', 'day1']
  },
  {
    id: 'cat01-m-008',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Perhatikan query berikut:\nINSERT INTO HR.REGIONSS SELECT * FROM HR.REGIONS WHERE LOWER(REGION_NAME) = \'europe\';\n\nApa yang dilakukan query ini?',
    options: [
      'Membuat tabel baru bernama REGIONSS',
      'Mengcopy data dari REGIONS ke REGIONSS dimana region_name = europe (case-insensitive)',
      'Menghapus data Europe dari REGIONS',
      'Mengupdate data di REGIONSS'
    ],
    correctAnswer: 1,
    explanation: 'INSERT INTO ... SELECT mengcopy data dari tabel lain. LOWER() mengkonversi REGION_NAME ke huruf kecil sebelum dibandingkan, membuat pencarian case-insensitive.',
    tags: ['INSERT SELECT', 'LOWER', 'day1']
  },
  {
    id: 'cat01-m-009',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan antara INNER JOIN dan LEFT JOIN?',
    options: [
      'Tidak ada perbedaan',
      'INNER JOIN hanya data cocok di kedua tabel; LEFT JOIN semua data tabel kiri + data cocok tabel kanan',
      'LEFT JOIN hanya data cocok; INNER JOIN semua data',
      'INNER JOIN lebih lambat dari LEFT JOIN'
    ],
    correctAnswer: 1,
    explanation: 'INNER JOIN hanya mengembalikan baris yang cocok di KEDUA tabel. LEFT JOIN mengembalikan SEMUA baris dari tabel kiri, meskipun tidak ada pasangan di tabel kanan (nilai dari kanan menjadi NULL).',
    tags: ['JOIN', 'INNER JOIN', 'LEFT JOIN', 'day1']
  },
  {
    id: 'cat01-m-010',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Query mana yang menggabungkan dua tabel menggunakan sintaks JOIN lama (tanpa keyword JOIN)?',
    options: [
      'SELECT * FROM A JOIN B ON A.id = B.id',
      'SELECT * FROM A, B WHERE A.id = B.id',
      'SELECT * FROM A LEFT JOIN B ON A.id = B.id',
      'SELECT * FROM A CROSS JOIN B'
    ],
    correctAnswer: 1,
    explanation: 'Sintaks lama menggunakan FROM tabel1, tabel2 WHERE kondisi. Ini sama dengan INNER JOIN tapi kurang direkomendasikan karena mencampur kondisi join dan filter di WHERE.',
    tags: ['JOIN', 'sintaks lama', 'day1']
  },
  {
    id: 'cat01-m-011',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi dari ALTER TABLE HR.COUNTRIES ADD region_name VARCHAR2(50)?',
    options: [
      'Menghapus kolom region_name',
      'Menambahkan kolom baru region_name ke tabel COUNTRIES',
      'Mengubah nama tabel COUNTRIES',
      'Membuat tabel baru COUNTRIES'
    ],
    correctAnswer: 1,
    explanation: 'ALTER TABLE ... ADD digunakan untuk menambahkan kolom baru ke tabel yang sudah ada. Kolom region_name bertipe VARCHAR2(50) ditambahkan ke tabel COUNTRIES.',
    tags: ['ALTER TABLE', 'ADD', 'DDL', 'day1']
  },
  {
    id: 'cat01-m-012',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Pada subquery berikut, apa tipe subquery-nya?\nSELECT c.COUNTRY_ID, (SELECT region_name FROM HR.REGIONS r WHERE r.REGION_ID = c.REGION_ID) AS REGION_NAME FROM HR.COUNTRIESS c',
    options: [
      'Non-correlated subquery',
      'Correlated subquery',
      'Inline view',
      'Scalar subquery biasa'
    ],
    correctAnswer: 1,
    explanation: 'Ini adalah correlated subquery karena subquery mereferensi kolom dari outer query (c.REGION_ID). Subquery dieksekusi untuk SETIAP baris di outer query.',
    tags: ['subquery', 'correlated', 'day1']
  },
  {
    id: 'cat01-m-013',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Manakah fungsi aggregate yang menghitung rata-rata?',
    options: [
      'SUM()',
      'COUNT()',
      'AVG()',
      'MAX()'
    ],
    correctAnswer: 2,
    explanation: 'AVG() menghitung rata-rata (average) dari sekumpulan nilai. SUM() menghitung jumlah total, COUNT() menghitung jumlah baris, MAX() mencari nilai terbesar.',
    tags: ['aggregate', 'AVG', 'day1']
  },
  {
    id: 'cat01-m-014',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa perbedaan WHERE dan HAVING?',
    options: [
      'WHERE dan HAVING sama persis',
      'WHERE memfilter sebelum GROUP BY, HAVING memfilter setelah GROUP BY',
      'HAVING memfilter sebelum GROUP BY, WHERE memfilter setelah GROUP BY',
      'WHERE hanya untuk angka, HAVING untuk string'
    ],
    correctAnswer: 1,
    explanation: 'WHERE memfilter baris SEBELUM grouping (tidak bisa pakai aggregate function). HAVING memfilter SETELAH grouping (bisa pakai aggregate function seperti COUNT, SUM, AVG).',
    tags: ['WHERE', 'HAVING', 'GROUP BY', 'day1']
  },
  {
    id: 'cat01-m-015',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Query: SELECT department_id, COUNT(*) FROM HR.EMPLOYEES GROUP BY department_id HAVING COUNT(*) > 5\n\nApa yang ditampilkan?',
    options: [
      'Semua department dan jumlah karyawan',
      'Hanya department yang memiliki lebih dari 5 karyawan',
      'Lima department pertama',
      'Karyawan dengan ID > 5'
    ],
    correctAnswer: 1,
    explanation: 'GROUP BY mengelompokkan per department. HAVING COUNT(*) > 5 memfilter SETELAH grouping — hanya department dengan jumlah karyawan LEBIH DARI 5 yang ditampilkan.',
    tags: ['GROUP BY', 'HAVING', 'COUNT', 'day1']
  },
  {
    id: 'cat01-m-016',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa hasil dari SELECT COUNT(*) FROM HR.COUNTRY_STATS WHERE AREA < 600 AND AREA > 100?',
    options: [
      'Jumlah kota dengan area antara 100 dan 600',
      'Total area dari semua kota',
      'Rata-rata area',
      'Kota dengan area terbesar'
    ],
    correctAnswer: 0,
    explanation: 'COUNT(*) menghitung jumlah baris. WHERE AREA < 600 AND AREA > 100 memfilter baris dengan area antara 100 dan 600. Hasilnya adalah JUMLAH kota yang memenuhi kriteria.',
    tags: ['COUNT', 'WHERE', 'aggregate', 'day1']
  },
  {
    id: 'cat01-m-017',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Bagaimana cara menghitung kepadatan penduduk dari tabel HR.COUNTRY_STATS?',
    options: [
      'SELECT AREA * POPULATION FROM HR.COUNTRY_STATS',
      'SELECT POPULATION / AREA FROM HR.COUNTRY_STATS',
      'SELECT POPULATION + AREA FROM HR.COUNTRY_STATS',
      'SELECT POPULATION - AREA FROM HR.COUNTRY_STATS'
    ],
    correctAnswer: 1,
    explanation: 'Kepadatan penduduk = populasi dibagi area (POPULATION/AREA). Ini menghitung jumlah penduduk per satuan luas.',
    tags: ['arithmetic', 'SELECT', 'day1']
  },
  {
    id: 'cat01-m-018',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Apa fungsi constraint UNIQUE(emp_id, emp_name) pada tabel?',
    options: [
      'emp_id dan emp_name masing-masing harus unik',
      'Kombinasi emp_id DAN emp_name harus unik',
      'Hanya emp_id yang harus unik',
      'Hanya emp_name yang harus unik'
    ],
    correctAnswer: 1,
    explanation: 'UNIQUE(emp_id, emp_name) adalah composite unique constraint. KOMBINASI kedua kolom harus unik. Artinya emp_id = 1, emp_name = "Ali" hanya boleh ada satu kali, tapi emp_id = 1, emp_name = "Budi" boleh ada.',
    tags: ['UNIQUE', 'constraint', 'composite', 'day1']
  },
  {
    id: 'cat01-m-019',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Constraint CHECK(flag_active IN(\'Y\',\'N\')) membatasi kolom flag_active agar hanya bisa berisi...',
    options: [
      'Angka 0 atau 1',
      'TRUE atau FALSE',
      'Huruf Y atau N saja',
      'Semua huruf alfabet'
    ],
    correctAnswer: 2,
    explanation: 'CHECK constraint memvalidasi nilai sebelum data dimasukkan. IN(\'Y\',\'N\') berarti kolom hanya boleh berisi string \'Y\' atau \'N\'. Nilai lain akan ditolak oleh database.',
    tags: ['CHECK', 'constraint', 'day1']
  },
  {
    id: 'cat01-m-020',
    category: 'pengenalan-plsql',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Perhatikan query Mini Challenge:\nSELECT d.department_name, COUNT(e.employee_id) AS total_employee, AVG(e.salary) AS avg_salary\nFROM employees e JOIN departments d ON e.department_id = d.department_id\nGROUP BY d.department_name HAVING COUNT(e.employee_id) > 3 ORDER BY avg_salary DESC;\n\nApa yang TIDAK benar tentang query ini?',
    options: [
      'Menghitung jumlah karyawan dan rata-rata gaji per department',
      'Hanya menampilkan department dengan lebih dari 3 karyawan',
      'Hasil diurutkan dari rata-rata gaji tertinggi',
      'HAVING bisa diganti dengan WHERE COUNT(e.employee_id) > 3'
    ],
    correctAnswer: 3,
    explanation: 'WHERE TIDAK bisa menggunakan aggregate function (COUNT, SUM, AVG dll). Aggregate function hanya bisa di HAVING clause karena HAVING memfilter SETELAH grouping dilakukan.',
    tags: ['GROUP BY', 'HAVING', 'WHERE', 'day1']
  },
  {
    id: 'cat01-m-021',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Operator || (double pipe) dalam Oracle SQL digunakan untuk?',
    options: [
      'Operasi logika OR',
      'Pembagian',
      'Concatenation (menggabungkan string)',
      'Perbandingan'
    ],
    correctAnswer: 2,
    explanation: 'Dalam Oracle SQL, || adalah operator concatenation untuk menggabungkan string. Contoh: e.first_name || \' \' || e.last_name menghasilkan full name. Untuk operasi logika OR gunakan keyword OR.',
    tags: ['concatenation', 'operator', 'day1']
  },
  {
    id: 'cat01-m-022',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Perintah ALTER TABLE HR.COUNTRY_STATS MODIFY population NUMBER(8,0) digunakan untuk?',
    options: [
      'Menambahkan kolom population',
      'Menghapus kolom population',
      'Mengubah tipe data atau ukuran kolom population',
      'Memberi nama baru pada kolom population'
    ],
    correctAnswer: 2,
    explanation: 'ALTER TABLE ... MODIFY mengubah definisi kolom yang sudah ada. Di sini mengubah tipe kolom population menjadi NUMBER(8,0) — 8 digit tanpa desimal.',
    tags: ['ALTER TABLE', 'MODIFY', 'day1']
  },
  {
    id: 'cat01-m-023',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'multiple_choice',
    question: 'Pada RIGHT JOIN, tabel mana yang semua datanya akan ditampilkan?',
    options: [
      'Tabel di sebelah kiri keyword JOIN',
      'Tabel di sebelah kanan keyword JOIN',
      'Kedua tabel',
      'Tidak ada tabel yang lengkap'
    ],
    correctAnswer: 1,
    explanation: 'RIGHT JOIN menampilkan SEMUA baris dari tabel kanan (setelah keyword JOIN). Jika tidak ada pasangan di tabel kiri, kolom dari tabel kiri akan bernilai NULL.',
    tags: ['RIGHT JOIN', 'day1']
  },
  {
    id: 'cat01-m-024',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'multiple_choice',
    question: 'Apa keyword yang digunakan untuk mengurutkan hasil query dari terbesar ke terkecil?',
    options: [
      'ASC',
      'DESC',
      'ORDER',
      'SORT'
    ],
    correctAnswer: 1,
    explanation: 'DESC (descending) mengurutkan dari terbesar ke terkecil. ASC (ascending, default) mengurutkan dari terkecil ke terbesar. Keduanya digunakan setelah ORDER BY.',
    tags: ['ORDER BY', 'DESC', 'day1']
  },
  {
    id: 'cat01-m-025',
    category: 'pengenalan-plsql',
    difficulty: 'Hard',
    type: 'multiple_choice',
    question: 'Perhatikan subquery:\nSELECT c.COUNTRY_ID, c.COUNTRY_NAME FROM HR.COUNTRIESS c WHERE REGION_ID IN (SELECT REGION_ID FROM HR.REGIONS r)\n\nApa yang terjadi jika subquery mengembalikan NULL?',
    options: [
      'Error',
      'Mengembalikan semua country',
      'Tidak mengembalikan baris apapun untuk perbandingan dengan NULL',
      'Mengembalikan country dengan region_id = 0'
    ],
    correctAnswer: 2,
    explanation: 'IN operator tidak cocok dengan NULL karena perbandingan dengan NULL selalu menghasilkan UNKNOWN (bukan TRUE/FALSE). Baris dengan REGION_ID NULL di subquery tidak akan mempengaruhi filter IN.',
    tags: ['subquery', 'IN', 'NULL', 'day1']
  },
];

export const cat01MateriCode: CodeChallenge[] = [
  {
    id: 'cat01-mc-001',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Tulis query SELECT untuk menampilkan country_name dan region_name dari tabel HR.COUNTRIESS dengan JOIN ke HR.REGIONS.',
    requirements: [
      'Gunakan INNER JOIN atau JOIN',
      'Join berdasarkan REGION_ID',
      'Tampilkan kolom COUNTRY_NAME dan REGION_NAME'
    ],
    starterCode: `SELECT -- kolom yang ditampilkan
FROM HR.COUNTRIESS c
-- lengkapi JOIN
;`,
    solution: `SELECT c.COUNTRY_NAME, r.REGION_NAME  
FROM HR.COUNTRIESS c 
JOIN HR.REGIONS r ON r.REGION_ID = c.REGION_ID;`,
    hints: [
      'Gunakan JOIN ... ON untuk menghubungkan dua tabel',
      'Kondisi join: r.REGION_ID = c.REGION_ID',
      'Pilih c.COUNTRY_NAME dan r.REGION_NAME'
    ],
    validationRules: {
      mustContain: ['SELECT', 'JOIN', 'REGION_ID', 'COUNTRY_NAME', 'REGION_NAME'],
    },
    tags: ['JOIN', 'SELECT', 'day1']
  },
  {
    id: 'cat01-mc-002',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Tulis query untuk menampilkan department_name, jumlah karyawan, dan rata-rata gaji. Hanya tampilkan department dengan lebih dari 3 karyawan, urutkan berdasarkan rata-rata gaji tertinggi.',
    requirements: [
      'JOIN tabel employees dan departments',
      'Gunakan GROUP BY department_name',
      'Gunakan HAVING untuk filter jumlah karyawan > 3',
      'ORDER BY rata-rata gaji DESC'
    ],
    starterCode: `SELECT d.department_name,
       -- hitung jumlah karyawan
       -- hitung rata-rata gaji
FROM employees e
-- lengkapi JOIN
GROUP BY d.department_name
-- lengkapi HAVING
ORDER BY -- lengkapi;`,
    solution: `SELECT d.department_name,
       COUNT(e.employee_id) AS total_employee,
       AVG(e.salary) AS avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
HAVING COUNT(e.employee_id) > 3
ORDER BY avg_salary DESC;`,
    hints: [
      'COUNT(e.employee_id) untuk menghitung jumlah karyawan',
      'AVG(e.salary) untuk rata-rata gaji',
      'HAVING COUNT(e.employee_id) > 3 untuk memfilter setelah grouping'
    ],
    validationRules: {
      mustContain: ['SELECT', 'COUNT', 'AVG', 'JOIN', 'GROUP BY', 'HAVING', 'ORDER BY'],
    },
    tags: ['GROUP BY', 'HAVING', 'JOIN', 'day1']
  },
  {
    id: 'cat01-mc-003',
    category: 'pengenalan-plsql',
    difficulty: 'Easy',
    type: 'code_challenge',
    question: 'Tulis perintah CREATE TABLE HR.COUNTRY_STATS dengan kolom: STAT_ID (NUMBER, PRIMARY KEY), AREA (NUMBER(8,0)), POPULATION (NUMBER(8,0)), CITY_NAME (VARCHAR2(30)).',
    requirements: [
      'Gunakan CREATE TABLE',
      'STAT_ID sebagai PRIMARY KEY',
      'AREA dan POPULATION bertipe NUMBER(8,0)',
      'CITY_NAME bertipe VARCHAR2(30)'
    ],
    starterCode: `CREATE TABLE HR.COUNTRY_STATS
(
  -- lengkapi kolom dan constraint
);`,
    solution: `CREATE TABLE HR.COUNTRY_STATS
(
  STAT_ID    NUMBER PRIMARY KEY,
  AREA       NUMBER(8,0),
  POPULATION NUMBER(8,0),
  CITY_NAME  VARCHAR2(30)
);`,
    hints: [
      'PRIMARY KEY ditulis setelah tipe data kolom',
      'NUMBER(8,0) artinya 8 digit tanpa desimal',
      'Pisahkan setiap kolom dengan koma'
    ],
    validationRules: {
      mustContain: ['CREATE TABLE', 'STAT_ID', 'PRIMARY KEY', 'AREA', 'POPULATION', 'CITY_NAME', 'NUMBER', 'VARCHAR2'],
    },
    tags: ['CREATE TABLE', 'DDL', 'day1']
  },
  {
    id: 'cat01-mc-004',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Tulis query dengan subquery: tampilkan COUNTRY_ID, COUNTRY_NAME, dan REGION_NAME (dari subquery) dari tabel HR.COUNTRIESS.',
    requirements: [
      'Gunakan correlated subquery di SELECT clause',
      'Subquery mengambil region_name dari HR.REGIONS',
      'Hubungkan berdasarkan REGION_ID'
    ],
    starterCode: `SELECT c.COUNTRY_ID, c.COUNTRY_NAME,
  -- lengkapi subquery untuk REGION_NAME
FROM HR.COUNTRIESS c;`,
    solution: `SELECT c.COUNTRY_ID, c.COUNTRY_NAME,
  (SELECT region_name FROM HR.REGIONS r 
   WHERE r.REGION_ID = c.REGION_ID) AS REGION_NAME
FROM HR.COUNTRIESS c;`,
    hints: [
      'Subquery ditulis di dalam tanda kurung di SELECT clause',
      'Gunakan WHERE r.REGION_ID = c.REGION_ID untuk menghubungkan',
      'Beri alias AS REGION_NAME'
    ],
    validationRules: {
      mustContain: ['SELECT', 'REGION_NAME', 'REGIONS', 'REGION_ID', 'COUNTRIESS'],
    },
    tags: ['subquery', 'correlated', 'day1']
  },
  {
    id: 'cat01-mc-005',
    category: 'pengenalan-plsql',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Tulis perintah INSERT INTO untuk menambahkan data Indonesia (country_id: 01, country_name: Indonesia, region_id: 3) ke tabel HR.COUNTRIESS.',
    requirements: [
      'Gunakan INSERT INTO dengan nama kolom',
      'Sebutkan ketiga kolom: country_id, country_name, region_id',
      'Gunakan VALUES untuk data'
    ],
    starterCode: `-- Lengkapi perintah INSERT
INSERT INTO hr.COUNTRIESS
-- lengkapi kolom dan values
;`,
    solution: `INSERT INTO hr.COUNTRIESS
(country_id, country_name, region_id)
VALUES
(01, 'Indonesia', 3);`,
    hints: [
      'Sebutkan kolom dalam tanda kurung setelah nama tabel',
      'VALUES diikuti data dalam tanda kurung',
      'String diapit tanda kutip tunggal'
    ],
    validationRules: {
      mustContain: ['INSERT INTO', 'COUNTRIESS', 'VALUES', 'Indonesia'],
    },
    tags: ['INSERT', 'DML', 'day1']
  },
];
