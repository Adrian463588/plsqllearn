import { LearningMaterial } from '@/types';

// ==========================================
// Learning Materials — Structured Content
// Maps to Day 1, 2, 3 classroom notes
// ==========================================

export const learningMaterials: LearningMaterial[] = [
  // ===== CATEGORY 1: Pengenalan PL/SQL & SQL Dasar (Day 1) =====
  {
    categoryId: 'pengenalan-plsql',
    title: 'Pengenalan PL/SQL & SQL Dasar',
    description: 'Dasar-dasar SQL dan pengenalan PL/SQL Oracle, termasuk SELECT, CREATE TABLE, INSERT, JOIN, subquery, dan aggregate functions.',
    estimatedTime: 45,
    sections: [
      {
        id: 'sql-select-basics',
        title: 'SELECT Statement — Dasar Query',
        content: `SELECT adalah perintah paling dasar untuk mengambil data dari tabel. Bisa mengambil semua kolom (\`*\`) atau kolom spesifik.

**Sintaks dasar:**
\`\`\`
SELECT kolom1, kolom2 FROM schema.tabel [WHERE kondisi] [ORDER BY kolom]
\`\`\`

Gunakan **alias** (\`AS\`) untuk memberi nama kolom, dan **WHERE** untuk filter data. **ORDER BY** mengurutkan hasil (ASC = naik, DESC = turun).`,
        codeExamples: [
          {
            title: 'SELECT semua data dari tabel',
            code: `SELECT * FROM HR.COUNTRIES;

SELECT * FROM HR.REGIONS r  
ORDER BY r.REGION_ID ASC;`,
            explanation: 'Mengambil semua kolom (*) dari tabel COUNTRIES dan REGIONS. ORDER BY mengurutkan berdasarkan REGION_ID secara ascending.'
          },
          {
            title: 'SELECT dengan WHERE dan alias',
            code: `SELECT c.country_name 
FROM HR.COUNTRIES c 
WHERE c.COUNTRY_ID = 'AR';

SELECT e.salary, e.EMPLOYEE_ID, e.FIRST_NAME  
FROM HR.EMPLOYEES e
ORDER BY 1 ASC;`,
            explanation: 'Menggunakan alias (c, e) untuk memperpendek nama tabel. ORDER BY 1 artinya urutkan berdasarkan kolom pertama (salary).'
          }
        ]
      },
      {
        id: 'create-table',
        title: 'CREATE TABLE — Membuat Tabel Baru',
        content: `CREATE TABLE digunakan untuk membuat tabel baru. Setiap kolom harus memiliki nama dan tipe data. Constraints memastikan integritas data.

**Constraint penting:**
- \`PRIMARY KEY\` — Kolom unik, tidak boleh NULL
- \`NOT NULL\` — Kolom harus memiliki nilai
- \`FOREIGN KEY\` — Mereferensi tabel lain
- \`UNIQUE\` — Nilai harus unik
- \`CHECK\` — Validasi nilai kolom
- \`ON DELETE CASCADE\` — Hapus child saat parent dihapus`,
        codeExamples: [
          {
            title: 'CREATE TABLE dengan Primary Key dan Foreign Key',
            code: `CREATE TABLE HR.COUNTRIESS
(
  COUNTRY_ID    VARCHAR2(2) PRIMARY KEY,
  COUNTRY_NAME  VARCHAR2(40) NOT NULL,
  REGION_ID     NUMBER,
  CONSTRAINT fk_countriess_regions 
    FOREIGN KEY(REGION_ID)
    REFERENCES HR.REGIONS (REGION_ID)
    ON DELETE CASCADE
);`,
            explanation: 'Membuat tabel COUNTRIESS dengan COUNTRY_ID sebagai primary key, COUNTRY_NAME tidak boleh kosong, dan REGION_ID sebagai foreign key yang mereferensi tabel REGIONS. ON DELETE CASCADE artinya jika region dihapus, semua country terkait ikut terhapus.'
          },
          {
            title: 'CREATE TABLE dengan UNIQUE dan CHECK Constraint',
            code: `CREATE TABLE HR.EMPLOYEEE
(
  EMP_ID        NUMBER,
  EMP_NAME      VARCHAR2(100),
  DEPT_ID       NUMBER,
  FLAG_ACTIVE   VARCHAR2(1),
  CONSTRAINT uk_emp_id UNIQUE(emp_id, emp_name),
  CONSTRAINT chk_flag_active CHECK(flag_active IN('Y','N'))
);`,
            explanation: 'UNIQUE constraint memastikan kombinasi emp_id + emp_name unik. CHECK constraint memastikan flag_active hanya boleh berisi Y atau N.'
          }
        ]
      },
      {
        id: 'insert-data',
        title: 'INSERT INTO — Memasukkan Data',
        content: `INSERT INTO digunakan untuk menambah data baru ke tabel. Bisa insert satu baris atau menggunakan SELECT untuk insert dari tabel lain.

**TRUNCATE TABLE** menghapus SEMUA data tanpa menghapus struktur tabel (lebih cepat dari DELETE).`,
        codeExamples: [
          {
            title: 'INSERT satu baris data',
            code: `INSERT INTO HR.COUNTRIESS
(country_id, country_name, region_id)
VALUES
(01, 'Indonesia', 3);

INSERT INTO HR.COUNTRIESS
(country_id, country_name, region_id)
VALUES
(02, 'Malaysia', 3);

INSERT INTO HR.COUNTRIESS
(country_id, country_name, region_id)
VALUES
(04, 'Germany', 1);`,
            explanation: 'Setiap INSERT menambah satu baris. Urutan values harus sesuai dengan kolom yang disebutkan.'
          },
          {
            title: 'INSERT SELECT & TRUNCATE',
            code: `-- Duplikat tabel
CREATE TABLE HR.REGIONSS
(
  REGION_ID    VARCHAR2(2) PRIMARY KEY,
  REGION_NAME  VARCHAR2(50)
);

-- INSERT dari tabel lain dengan filter
INSERT INTO HR.REGIONSS
SELECT * FROM HR.REGIONS
WHERE LOWER(REGION_NAME) = 'europe';

-- TRUNCATE: kosongkan tabel tanpa hapus strukturnya
TRUNCATE TABLE HR.REGIONSS;`,
            explanation: 'INSERT SELECT mengcopy data dari tabel lain. LOWER() mengkonversi ke huruf kecil untuk perbandingan case-insensitive. TRUNCATE lebih cepat dari DELETE karena tidak bisa di-rollback.'
          }
        ]
      },
      {
        id: 'join-tables',
        title: 'JOIN — Menggabungkan Tabel',
        content: `JOIN menggabungkan data dari dua atau lebih tabel berdasarkan kolom yang berhubungan.

**Jenis JOIN:**
| Jenis | Penjelasan |
|-------|-----------|
| INNER JOIN | Hanya data yang cocok di kedua tabel |
| LEFT JOIN | Semua data tabel kiri + data cocok dari kanan |
| RIGHT JOIN | Semua data tabel kanan + data cocok dari kiri |
| FULL JOIN | Semua data dari kedua tabel |`,
        codeExamples: [
          {
            title: 'INNER JOIN (dua cara penulisan)',
            code: `-- Cara 1: Menggunakan JOIN...ON
SELECT c.COUNTRY_NAME, r.REGION_NAME  
FROM HR.COUNTRIESS c 
JOIN HR.REGIONS r ON r.REGION_ID = c.REGION_ID;

-- Cara 2: Menggunakan WHERE (sintaks lama, hasil sama)
SELECT c.COUNTRY_NAME, r.REGION_NAME  
FROM HR.COUNTRIESS c, HR.REGIONS r  
WHERE r.REGION_ID = c.REGION_ID;`,
            explanation: 'Kedua cara menghasilkan hasil yang sama. Cara JOIN...ON lebih modern dan direkomendasikan karena memisahkan kondisi join dari filter WHERE.'
          },
          {
            title: 'LEFT JOIN dan RIGHT JOIN',
            code: `-- LEFT JOIN: semua country ditampilkan
SELECT c.COUNTRY_NAME, r.REGION_NAME  
FROM HR.COUNTRIESS c 
LEFT JOIN HR.REGIONS r ON r.REGION_ID = c.REGION_ID;

-- RIGHT JOIN: semua region ditampilkan
SELECT c.COUNTRY_NAME, r.REGION_NAME  
FROM HR.COUNTRIESS c 
RIGHT JOIN HR.REGIONS r ON r.REGION_ID = c.REGION_ID;`,
            explanation: 'LEFT JOIN menampilkan SEMUA baris dari tabel kiri (COUNTRIESS), meskipun tidak ada pasangan di tabel kanan. RIGHT JOIN kebalikannya — menampilkan semua baris dari tabel kanan (REGIONS).'
          },
          {
            title: 'Multi-table JOIN (Mini Challenge)',
            code: `-- Tampilkan karyawan dengan job title dan department
SELECT e.employee_id,
       e.first_name || ' ' || e.last_name AS full_name,
       j.job_title,
       d.department_name,
       e.salary
FROM employees e
JOIN jobs j ON e.job_id = j.job_id
JOIN departments d ON e.department_id = d.department_id
ORDER BY e.salary DESC;`,
            explanation: 'JOIN bisa digabung lebih dari 2 tabel. Di sini kita join EMPLOYEES dengan JOBS dan DEPARTMENTS. Concatenation (||) menggabungkan first_name dan last_name menjadi full_name.'
          }
        ]
      },
      {
        id: 'alter-subquery',
        title: 'ALTER TABLE & Subquery',
        content: `**ALTER TABLE** mengubah struktur tabel yang sudah ada (tambah kolom, ubah tipe data, dll).

**Subquery** adalah query di dalam query lain. Bisa di SELECT, WHERE, atau FROM clause.`,
        codeExamples: [
          {
            title: 'ALTER TABLE — Tambah dan Ubah Kolom',
            code: `-- Menambah kolom baru
ALTER TABLE HR.COUNTRIES 
ADD region_name VARCHAR2(50); 

-- Mengubah tipe data kolom
ALTER TABLE HR.COUNTRY_STATS 
MODIFY population NUMBER(8,0);`,
            explanation: 'ADD menambah kolom baru. MODIFY mengubah definisi kolom yang sudah ada (misalnya ukuran atau tipe data).'
          },
          {
            title: 'Subquery dalam SELECT dan WHERE',
            code: `-- Subquery di SELECT (correlated subquery)
SELECT c.COUNTRY_ID, c.COUNTRY_NAME,
  (SELECT region_name FROM HR.REGIONS r 
   WHERE r.REGION_ID = c.REGION_ID) AS REGION_NAME
FROM HR.COUNTRIESS c;

-- Subquery di WHERE
SELECT c.COUNTRY_ID, c.COUNTRY_NAME, c.REGION_ID 
FROM HR.COUNTRIESS c 
WHERE REGION_ID IN 
  (SELECT REGION_ID FROM HR.REGIONS r);`,
            explanation: 'Subquery di SELECT dieksekusi untuk setiap baris (correlated). Subquery di WHERE dengan IN memfilter data berdasarkan hasil subquery.'
          }
        ]
      },
      {
        id: 'aggregate-functions',
        title: 'Aggregate Functions & GROUP BY',
        content: `Aggregate functions menghitung nilai dari sekumpulan data.

| Fungsi | Kegunaan |
|--------|---------|
| SUM() | Jumlah total |
| AVG() | Rata-rata |
| MAX() | Nilai terbesar |
| MIN() | Nilai terkecil |
| COUNT() | Jumlah baris |

**GROUP BY** mengelompokkan data. **HAVING** memfilter grup (seperti WHERE untuk GROUP BY).`,
        codeExamples: [
          {
            title: 'Aggregate Functions',
            code: `SELECT SUM(POPULATION)  FROM HR.COUNTRY_STATS;
SELECT AVG(POPULATION)  FROM HR.COUNTRY_STATS;
SELECT MAX(POPULATION)  FROM HR.COUNTRY_STATS;
SELECT MIN(POPULATION)  FROM HR.COUNTRY_STATS;
SELECT COUNT(*) FROM HR.COUNTRY_STATS 
WHERE AREA < 600 AND AREA > 100;

-- Kepadatan penduduk
SELECT city_name, POPULATION/AREA AS kepadatan
FROM HR.COUNTRY_STATS;`,
            explanation: 'Setiap fungsi menghitung satu nilai dari seluruh baris. COUNT(*) menghitung jumlah baris yang memenuhi WHERE. Pembagian POPULATION/AREA menghasilkan kepadatan penduduk.'
          },
          {
            title: 'GROUP BY dan HAVING',
            code: `-- GROUP BY beberapa kolom
SELECT department_id, job_id, COUNT(*) AS total_employees
FROM HR.EMPLOYEES
GROUP BY department_id, job_id
ORDER BY 1;

-- HAVING filter: hanya tampilkan jika count > 5
SELECT department_id, job_id, COUNT(*) AS total_employees
FROM HR.EMPLOYEES
GROUP BY department_id, job_id
HAVING COUNT(*) > 5
ORDER BY 1 DESC;

-- Rata-rata gaji per department (Mini Challenge)
SELECT d.department_name,
       COUNT(e.employee_id) AS total_employee,
       AVG(e.salary) AS avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
HAVING COUNT(e.employee_id) > 3
ORDER BY avg_salary DESC;`,
            explanation: 'GROUP BY mengelompokkan baris. HAVING memfilter SETELAH grouping (WHERE memfilter SEBELUM grouping). Bisa kombinasi GROUP BY dengan JOIN dan agregasi.'
          }
        ]
      }
    ]
  },

  // ===== CATEGORY 2: Variables & Data Types (Day 2) =====
  {
    categoryId: 'variables-data-types',
    title: 'Variabel & Tipe Data PL/SQL',
    description: 'Anonymous blocks, deklarasi variabel, tipe data (VARCHAR2, NUMBER, DATE, BOOLEAN, TIMESTAMP, INTERVAL), dan %TYPE attribute.',
    estimatedTime: 40,
    sections: [
      {
        id: 'anonymous-block',
        title: 'Anonymous Block — Struktur Dasar PL/SQL',
        content: `Sebuah anonymous block PL/SQL terdiri dari 3 bagian:
1. **DECLARE** (opsional) — Deklarasi variabel dan cursor
2. **BEGIN** (wajib) — Logika program
3. **EXCEPTION** (opsional) — Penanganan error  
4. **END;** (wajib) — Akhir block

Gunakan \`DBMS_OUTPUT.PUT_LINE()\` untuk menampilkan output.`,
        codeExamples: [
          {
            title: 'Hello World PL/SQL',
            code: `DECLARE
  /*declare variable*/
BEGIN
  DBMS_OUTPUT.PUT_LINE('Hello Namaku : ' || 'Carol');
  DBMS_OUTPUT.PUT_LINE(CONCAT('Hello', 'World'));
END;`,
            explanation: 'Block paling sederhana tanpa variabel. DBMS_OUTPUT.PUT_LINE mencetak teks. || (pipe) dan CONCAT() keduanya menggabungkan string.'
          },
          {
            title: 'Block dengan Variabel',
            code: `DECLARE
  v_text VARCHAR2(10) := 'PL/SQL';
BEGIN
  DBMS_OUTPUT.PUT_LINE('Hello Namaku : ' || 'Carol');
  DBMS_OUTPUT.PUT_LINE(CONCAT('Hello', 'World'));
  DBMS_OUTPUT.PUT_LINE(v_text);
END;`,
            explanation: 'Variabel v_text dideklarasikan bertipe VARCHAR2 dengan max 10 karakter, dan diinisialisasi dengan := (assignment operator).'
          }
        ]
      },
      {
        id: 'data-types-detail',
        title: 'Tipe Data Lengkap',
        content: `PL/SQL mendukung berbagai tipe data:

| Tipe | Keterangan | Contoh |
|------|-----------|--------|
| VARCHAR2(n) | String variabel, max n karakter | 'Hello' |
| NUMBER | Angka (integer & desimal) | 50, 50.42 |
| NUMBER(p,s) | p = presisi total, s = desimal | NUMBER(10,2) |
| PLS_INTEGER | Integer cepat (machine arithmetic) | 50 |
| BINARY_FLOAT | Floating point presisi rendah | 50.42 |
| DATE | Tanggal + waktu | '22-NOV-18' |
| TIMESTAMP | Tanggal + waktu + fractional seconds | SYSTIMESTAMP |
| INTERVAL | Durasi waktu | '124 02:05:21' |
| BOOLEAN | TRUE / FALSE / NULL | TRUE |

**NOT NULL DEFAULT** — Variabel wajib punya nilai, DEFAULT memberikan nilai awal.`,
        codeExamples: [
          {
            title: 'Semua Tipe Data dalam Satu Block',
            code: `DECLARE
    v_text      VARCHAR2(50) NOT NULL DEFAULT 'Hello';
    v_number1   NUMBER := 50;
    v_number2   NUMBER(2) := 50;
    v_number3   NUMBER(10, 2) := 50.42;
    v_number4   PLS_INTEGER := 50;
    v_number5   BINARY_FLOAT := 50.42;
    v_DATE1     DATE := '22-NOV-18';
    v_DATE2     TIMESTAMP := SYSTIMESTAMP;
    v_DATE3     TIMESTAMP(9) WITH TIME ZONE := SYSTIMESTAMP;
    v_DATE4     INTERVAL DAY(4) TO SECOND(3) := '124 02:05:21.012';
    v_DATE5     INTERVAL YEAR TO MONTH := '12-3';
BEGIN
    v_text := 'PL/SQL' || 'Course';
    DBMS_OUTPUT.PUT_LINE(v_text);
    DBMS_OUTPUT.PUT_LINE(v_number1);
    DBMS_OUTPUT.PUT_LINE(v_number2);
    DBMS_OUTPUT.PUT_LINE(v_number3);
    DBMS_OUTPUT.PUT_LINE(v_number4);
    DBMS_OUTPUT.PUT_LINE(v_number5);
    DBMS_OUTPUT.PUT_LINE(v_DATE1);
    DBMS_OUTPUT.PUT_LINE(v_DATE2);
    DBMS_OUTPUT.PUT_LINE(v_DATE3);
    DBMS_OUTPUT.PUT_LINE(v_DATE4);
    DBMS_OUTPUT.PUT_LINE(v_DATE5);
END;`,
            explanation: 'Demonstrasi semua tipe data. NOT NULL DEFAULT artinya variabel harus punya nilai dan defaultnya "Hello". NUMBER(10,2) artinya 10 digit total, 2 desimal. INTERVAL DAY TO SECOND menyimpan durasi hari dan detik.'
          },
          {
            title: 'Fungsi Tanggal: SYSDATE, TRUNC, TO_DATE',
            code: `-- Tanggal saat ini
SELECT SYSDATE FROM DUAL;

-- Tanggal tanpa waktu (membulatkan ke awal hari)
SELECT TRUNC(SYSDATE) FROM DUAL;

-- Konversi string ke DATE dengan format spesifik
SELECT TRUNC(
  TO_DATE('23-02-2026 12:56:01','DD-MM-YYYY HH24:MI:SS')
) FROM DUAL;`,
            explanation: 'SYSDATE mengembalikan tanggal dan waktu saat ini. TRUNC membulatkan ke awal hari (menghapus waktu). TO_DATE mengkonversi string ke tipe DATE sesuai format mask.'
          }
        ]
      },
      {
        id: 'boolean-type',
        title: 'BOOLEAN dan %TYPE',
        content: `**BOOLEAN** di PL/SQL bisa bernilai TRUE, FALSE, atau NULL. Tidak bisa digunakan langsung di SQL (hanya di PL/SQL block).

**%TYPE** membuat variabel bertipe sama dengan kolom tabel atau variabel lain, sehingga jika tipe data di tabel berubah, variabel otomatis menyesuaikan.`,
        codeExamples: [
          {
            title: 'BOOLEAN dengan IF-ELSIF-ELSE',
            code: `DECLARE
  v_flag BOOLEAN := FALSE;
BEGIN
  IF v_flag THEN
    DBMS_OUTPUT.PUT_LINE('TRUE');
  ELSIF NOT v_flag THEN 
    DBMS_OUTPUT.PUT_LINE('FALSE');
  ELSE
    DBMS_OUTPUT.PUT_LINE('NULL');
  END IF;
END;`,
            explanation: 'BOOLEAN bisa dicek langsung: IF v_flag (TRUE). NOT v_flag untuk FALSE. ELSE menangkap NULL. Output: "FALSE" karena v_flag diset FALSE.'
          },
          {
            title: '%TYPE — Mengambil Tipe Data dari Tabel',
            code: `DECLARE
  v_type  HR.EMPLOYEES.JOB_ID%TYPE;
  v_type2 v_type%TYPE;
BEGIN
  v_type := 'IT_PROG';
  v_type2 := 'SA_MAN';
  DBMS_OUTPUT.PUT_LINE(v_type);
  DBMS_OUTPUT.PUT_LINE(v_type2);
END;`,
            explanation: 'v_type bertipe sama dengan kolom JOB_ID di tabel EMPLOYEES (VARCHAR2(10)). v_type2 bertipe sama dengan v_type. Jika tipe JOB_ID berubah di tabel, variabel otomatis mengikuti.'
          }
        ]
      }
    ]
  },

  // ===== CATEGORY 3: Control Structures (Day 2 + Day 3) =====
  {
    categoryId: 'control-structures',
    title: 'Struktur Kontrol: IF, CASE, LOOP',
    description: 'IF-THEN-ELSIF, CASE, DECODE, Basic LOOP, WHILE LOOP, FOR LOOP, nested loops, CONTINUE, dan GOTO.',
    estimatedTime: 60,
    sections: [
      {
        id: 'if-statement',
        title: 'IF Statement',
        content: `IF mengecek kondisi dan menjalankan kode berdasarkan hasilnya.

**Struktur:**
\`\`\`
IF kondisi THEN
  -- aksi
ELSIF kondisi_lain THEN
  -- aksi lain
ELSE
  -- fallback
END IF;
\`\`\``,
        codeExamples: [
          {
            title: 'IF-ELSIF-ELSE dengan Nested IF',
            code: `DECLARE
    v_number NUMBER := 30;
BEGIN
    IF v_number IS NULL THEN
        DBMS_OUTPUT.PUT_LINE('NULL');
    ELSE
        IF v_number < 10 THEN
            DBMS_OUTPUT.PUT_LINE('I am smaller than 10');
        ELSIF v_number < 20 THEN
            DBMS_OUTPUT.PUT_LINE('I am smaller than 20');
        ELSIF v_number < 30 THEN
            DBMS_OUTPUT.PUT_LINE('I am smaller than 30');
        ELSE
            DBMS_OUTPUT.PUT_LINE('I am equal or greater than 30');
        END IF;
    END IF;
END;`,
            explanation: 'Pertama cek IS NULL. Jika bukan NULL, masuk ke nested IF yang mengecek range. v_number = 30 tidak < 10, < 20, < 30, maka masuk ELSE. Output: "I am equal or greater than 30".'
          }
        ]
      },
      {
        id: 'case-decode',
        title: 'CASE Expression & DECODE',
        content: `**CASE** ada dua tipe:
- **Simple CASE** — Membandingkan satu nilai ke beberapa kemungkinan
- **Searched CASE** — Mengevaluasi beberapa kondisi berbeda

**DECODE** adalah fungsi Oracle yang mirip CASE tapi lebih ringkas (hanya di SQL, bukan PL/SQL).`,
        codeExamples: [
          {
            title: 'Simple CASE Statement',
            code: `DECLARE
    v_grade VARCHAR2(1) := 'A';
BEGIN
    CASE v_grade
        WHEN 'A' THEN
            DBMS_OUTPUT.PUT_LINE('Excellent');
        WHEN 'B' THEN
            DBMS_OUTPUT.PUT_LINE('Good');
        WHEN 'C' THEN
            DBMS_OUTPUT.PUT_LINE('Enough');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Fail');
    END CASE;
END;`,
            explanation: 'Simple CASE: bandingkan v_grade dengan setiap WHEN. Karena v_grade = "A", output: "Excellent".'
          },
          {
            title: 'Searched CASE (kondisi fleksibel)',
            code: `-- Di PL/SQL Block
DECLARE
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
END;

-- Searched CASE di SQL SELECT
SELECT employee_id, salary,
  CASE
    WHEN salary > 10000 THEN 'High'
    WHEN salary >= 5000 THEN 'Medium'
    ELSE 'Low'
  END AS salary_category
FROM HR.EMPLOYEES;`,
            explanation: 'Searched CASE tidak punya selector — setiap WHEN memiliki kondisi sendiri. Bisa digunakan di PL/SQL block maupun di SQL SELECT statement.'
          },
          {
            title: 'DECODE (fungsi SQL Oracle)',
            code: `SELECT employee_id, department_id,
       DECODE(department_id,
              60, 'IT',
              100, 'Finance',
              'Other') AS dept_name
FROM employees;`,
            explanation: 'DECODE(kolom, nilai1, hasil1, nilai2, hasil2, ..., default). Jika department_id = 60, tampilkan "IT". Jika 100, "Finance". Sisanya "Other".'
          }
        ]
      },
      {
        id: 'basic-loop',
        title: 'Basic LOOP & EXIT',
        content: `Basic LOOP (simple loop) berulang tanpa batas sampai EXIT ditemui. Selalu dieksekusi **minimal satu kali**.

\`\`\`
LOOP
  -- kode
  EXIT WHEN kondisi;
END LOOP;
\`\`\``,
        codeExamples: [
          {
            title: 'Basic LOOP dengan EXIT dan EXIT WHEN',
            code: `DECLARE
    v_counter NUMBER(2) := 1;
BEGIN
    LOOP
        DBMS_OUTPUT.PUT_LINE('My counter is : ' || v_counter);
        v_counter := v_counter + 1;

        IF v_counter = 10 THEN
            DBMS_OUTPUT.PUT_LINE('Now I REACHED : ' || v_counter);
            EXIT;
        END IF;

        EXIT WHEN v_counter > 10;
    END LOOP;
END;`,
            explanation: 'Loop berjalan dari 1. Saat counter = 10, IF memicu EXIT. Ada juga EXIT WHEN sebagai safety net. Dua cara EXIT: IF...EXIT dan EXIT WHEN.'
          }
        ]
      },
      {
        id: 'while-loop',
        title: 'WHILE LOOP',
        content: `WHILE LOOP mengecek kondisi **sebelum** iterasi. Jika FALSE dari awal, body tidak dieksekusi.

\`\`\`
WHILE kondisi LOOP
  -- kode
END LOOP;
\`\`\``,
        codeExamples: [
          {
            title: 'WHILE LOOP dengan EXIT WHEN',
            code: `DECLARE
  v_counter NUMBER := 1;
BEGIN
  WHILE v_counter <= 10 LOOP
    DBMS_OUTPUT.PUT_LINE('Counter : ' || v_counter);
    v_counter := v_counter + 1;
    EXIT WHEN v_counter > 3;
  END LOOP;
END;`,
            explanation: 'WHILE mengecek v_counter <= 10 sebelum masuk loop. Tapi EXIT WHEN v_counter > 3 menghentikan loop lebih awal. Output hanya: 1, 2, 3.'
          }
        ]
      },
      {
        id: 'for-loop',
        title: 'FOR LOOP & Nested Loop',
        content: `FOR LOOP ideal saat jumlah iterasi diketahui. Counter otomatis dibuat (implicit), tidak perlu deklarasi, dan read-only.

\`\`\`
FOR counter IN lower..upper LOOP
  -- kode  
END LOOP;
\`\`\``,
        codeExamples: [
          {
            title: 'FOR LOOP dengan variabel dan SELECT INTO',
            code: `DECLARE
  v_start NUMBER := 1;
  v_end   NUMBER := 7;
  v_total NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_total FROM HR.REGIONS;
  
  FOR i IN v_start..v_total LOOP
    DBMS_OUTPUT.PUT_LINE('Loop ke-' || i);
  END LOOP;
END;`,
            explanation: 'Range FOR LOOP bisa menggunakan variabel. SELECT COUNT(*) INTO v_total mengambil jumlah region, lalu loop dari 1 sampai v_total.'
          },
          {
            title: 'Nested Loop',
            code: `-- Nested loop sederhana
BEGIN
  FOR i IN 1..3 LOOP
    FOR j IN 1..2 LOOP 
      DBMS_OUTPUT.PUT_LINE('i = ' || i || ', j = ' || j);
    END LOOP;
  END LOOP;
END;`,
            explanation: 'Loop dalam loop. Outer loop (i) jalan 3x, inner loop (j) jalan 2x setiap iterasi i. Total: 3 × 2 = 6 output.'
          },
          {
            title: 'Mini Challenge: Pola Angka Segitiga',
            code: `-- Output: 1 / 12 / 123 / 1234 / 12345
BEGIN
  FOR i IN 1..5 LOOP
    FOR j IN 1..i LOOP
      DBMS_OUTPUT.PUT(j);
    END LOOP;
    DBMS_OUTPUT.NEW_LINE();
  END LOOP;
END;`,
            explanation: 'DBMS_OUTPUT.PUT() mencetak tanpa newline. NEW_LINE() membuat baris baru setelah inner loop selesai. j berjalan dari 1 sampai i, membentuk pola segitiga.'
          }
        ]
      },
      {
        id: 'continue-goto',
        title: 'CONTINUE & GOTO',
        content: `**CONTINUE** melompat ke iterasi berikutnya (skip sisa kode dalam iterasi saat ini).
**GOTO** melompat ke label tertentu — **tidak direkomendasikan** karena membuat kode sulit dipahami (spaghetti code).`,
        codeExamples: [
          {
            title: 'CONTINUE dan CONTINUE WHEN',
            code: `-- CONTINUE biasa
BEGIN
  FOR i IN 1..5 LOOP
    IF i > 3 THEN
      CONTINUE;
    END IF;
    DBMS_OUTPUT.PUT_LINE('Angka: ' || i);
  END LOOP;
END;

-- CONTINUE WHEN (lebih ringkas)
BEGIN
  FOR i IN 1..10 LOOP
    CONTINUE WHEN MOD(i, 2) = 0;
    DBMS_OUTPUT.PUT_LINE('Bilangan ganjil : ' || i);
  END LOOP;
END;`,
            explanation: 'CONTINUE skip ke iterasi berikutnya. Contoh 1: hanya cetak 1, 2, 3 (saat i > 3, di-skip). Contoh 2: MOD(i,2)=0 saat genap, jadi hanya cetak ganjil.'
          },
          {
            title: 'GOTO Statement',
            code: `-- GOTO sederhana
DECLARE
  i NUMBER := 1;
BEGIN
  <<start_loop>>
  DBMS_OUTPUT.PUT_LINE('i = ' || i);
  i := i + 1;
  IF i <= 5 THEN
    GOTO start_loop;
  END IF;
END;

-- GOTO untuk keluar dari pengecekan prima
DECLARE
  v_searched_number NUMBER  := 7;
  v_is_prime        BOOLEAN := TRUE;
BEGIN
  FOR x IN 2..v_searched_number-1 LOOP
    IF v_searched_number MOD x = 0 THEN
      DBMS_OUTPUT.PUT_LINE(v_searched_number || ' is not a prime number..');
      v_is_prime := FALSE;
      GOTO end_point;
    END IF;
  END LOOP;
  IF v_is_prime THEN 
    DBMS_OUTPUT.PUT_LINE(v_searched_number || ' is a prime number..');
  END IF;
  <<end_point>>
  DBMS_OUTPUT.PUT_LINE('Check complete..');
END;`,
            explanation: '<<label>> mendefinisikan titik GOTO. Contoh prima: jika ditemukan pembagi, langsung GOTO end_point (skip sisa pengecekan). Meskipun GOTO ada, sebaiknya gunakan EXIT/CONTINUE.'
          }
        ]
      }
    ]
  },

  // ===== CATEGORY 4: Cursors (Day 3) =====
  {
    categoryId: 'cursors',
    title: 'Cursor — Mengolah Data Baris per Baris',
    description: 'Explicit cursor dengan parameter, OPEN-FETCH-CLOSE lifecycle, cursor FOR loop, dan cursor attributes.',
    estimatedTime: 30,
    sections: [
      {
        id: 'explicit-cursor',
        title: 'Explicit Cursor dengan Parameter',
        content: `Cursor adalah pointer ke result set dari query. Explicit cursor dideklarasikan manual dan dikontrol dengan:
1. **DECLARE** — Definisikan query
2. **OPEN** — Eksekusi query
3. **FETCH** — Ambil data baris per baris
4. **CLOSE** — Lepas resource

Cursor bisa menerima **parameter** agar query bisa difilter dinamis.`,
        codeExamples: [
          {
            title: 'Cursor dengan Parameter Default',
            code: `DECLARE
  CURSOR c_emp (
    v_department_id VARCHAR2 DEFAULT 30,
    v_job_id VARCHAR2 DEFAULT 'PU_CLERK'
  ) IS
    SELECT employee_id, salary
    FROM employees
    WHERE department_id = v_department_id
      AND job_id = v_job_id;
  
  v_emp_id employees.employee_id%TYPE;
  v_salary employees.salary%TYPE;
BEGIN
  OPEN c_emp();  -- menggunakan default values
  LOOP
    FETCH c_emp INTO v_emp_id, v_salary;
    EXIT WHEN c_emp%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('ID: ' || v_emp_id || ' Salary: ' || v_salary);
  END LOOP;
  CLOSE c_emp;
END;`,
            explanation: 'Cursor c_emp punya parameter dengan DEFAULT value. OPEN c_emp() memanggil dengan default (dept 30, job PU_CLERK). %NOTFOUND menghentikan loop saat tidak ada data lagi. Jangan lupa CLOSE!'
          },
          {
            title: 'Cursor FOR Loop (cara ringkas)',
            code: `DECLARE
  CURSOR c_emp (v_department_id VARCHAR2, v_job_id VARCHAR2) IS
    SELECT employee_id, salary
    FROM employees
    WHERE department_id = v_department_id
      AND job_id = v_job_id
      AND salary > 2500;
BEGIN
  FOR rec IN c_emp('30', 'PU_CLERK') LOOP
    DBMS_OUTPUT.PUT_LINE('ID : ' || rec.employee_id 
                      || ' Salary : ' || rec.salary);
  END LOOP;
END;`,
            explanation: 'Cursor FOR loop otomatis OPEN, FETCH, dan CLOSE. Variabel rec otomatis dibuat sebagai record. Akses kolom dengan rec.kolom. Jauh lebih ringkas dan aman (tidak bisa lupa CLOSE).'
          }
        ]
      }
    ]
  },

  // ===== CATEGORY 6: Procedures (Day 3) =====
  {
    categoryId: 'procedures',
    title: 'Stored Procedure',
    description: 'CREATE OR REPLACE PROCEDURE, parameter IN dengan %TYPE, DML dalam procedure, dan pemanggilan procedure.',
    estimatedTime: 30,
    sections: [
      {
        id: 'create-procedure',
        title: 'Membuat dan Memanggil Procedure',
        content: `Procedure adalah subprogram tersimpan di database yang melakukan aksi tertentu. Dibuat dengan CREATE OR REPLACE.

**Parameter mode:**
- **IN** (default) — Input, hanya bisa dibaca
- **OUT** — Output, hanya bisa ditulis  
- **IN OUT** — Bisa dibaca dan ditulis

Gunakan **%TYPE** untuk tipe parameter agar otomatis sinkron dengan kolom tabel.`,
        codeExamples: [
          {
            title: 'Procedure Update Salary',
            code: `CREATE OR REPLACE PROCEDURE HR.PRC_GEN_UPDATE_SALARY
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
  
  DBMS_OUTPUT.PUT_LINE('Berhasil update data employee : ' 
                       || p_employee_id);
END;

-- Cek data sebelum
SELECT salary, e.* FROM HR.EMPLOYEES e
WHERE employee_id = '100';

-- Panggil procedure
BEGIN
  HR.PRC_GEN_UPDATE_SALARY('100', 10);
END;`,
            explanation: 'Procedure menerima employee_id dan persentase kenaikan. p_employee_id menggunakan %TYPE untuk mengambil tipe dari kolom tabel. COMMIT menyimpan perubahan. Panggil di dalam anonymous block.'
          },
          {
            title: 'Procedure Insert Data',
            code: `CREATE OR REPLACE PROCEDURE HR.PRC_GEN_INSERT_COUNTRIESS
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
            explanation: 'Procedure untuk INSERT data baru. Semua parameter bertipe IN dengan %TYPE. Procedure bisa dipanggil berkali-kali dengan nilai berbeda tanpa menulis ulang SQL.'
          }
        ]
      }
    ]
  },

  // ===== CATEGORY 7: Functions (Day 3) =====
  {
    categoryId: 'functions',
    title: 'Function — Mengembalikan Nilai',
    description: 'CREATE FUNCTION, RETURN value, function dalam SELECT statement, dan perbedaan function vs procedure.',
    estimatedTime: 20,
    sections: [
      {
        id: 'create-function',
        title: 'Membuat dan Menggunakan Function',
        content: `Function HARUS mengembalikan nilai (RETURN). Berbeda dengan procedure yang melakukan aksi tanpa return value.

**Keuntungan function:**
- Bisa dipanggil di SQL SELECT
- Bisa di-assign ke variabel
- Bisa digunakan di WHERE clause

**Function vs Procedure:**
| | Function | Procedure |
|---|---------|-----------|
| RETURN | Wajib | Tidak ada |
| Panggil di SQL | Bisa | Tidak bisa |
| DML | Sebaiknya tidak | Boleh |`,
        codeExamples: [
          {
            title: 'Function Hitung Rata-rata Gaji',
            code: `CREATE OR REPLACE FUNCTION HR.FNC_GET_AVG_SAL
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
            explanation: 'Function menerima department_id dan mengembalikan rata-rata gaji. RETURN NUMBER mendefinisikan tipe kembalian. SELECT INTO menyimpan hasil ke variabel. RETURN v_avg_sal mengirim nilai kembali.'
          },
          {
            title: 'Memanggil Function di SELECT dan Block',
            code: `-- Function dalam SELECT statement
SELECT employee_id, first_name, department_id,
       FNC_GET_AVG_SAL(department_id) AS avg_sal
FROM HR.EMPLOYEES;

-- Function dalam anonymous block
DECLARE
  v_avg_salary NUMBER;
BEGIN
  v_avg_salary := FNC_GET_AVG_SAL(50);
  DBMS_OUTPUT.PUT_LINE(v_avg_salary);
END;`,
            explanation: 'Function bisa dipanggil langsung di SQL SELECT — hasilnya menjadi kolom baru (avg_sal). Juga bisa dipanggil di PL/SQL block dan di-assign ke variabel dengan :=.'
          }
        ]
      }
    ]
  },
];
