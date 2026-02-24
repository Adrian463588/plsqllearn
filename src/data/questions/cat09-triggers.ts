import { MCQuestion, CodeChallenge } from '@/types';

export const cat09MCQ: MCQuestion[] = [
  { id: 'MCQ_119', category: 'triggers', difficulty: 'Easy', type: 'multiple_choice', question: 'Apa fungsi utama trigger?', options: ['Mengoptimalkan query', 'Mengeksekusi kode otomatis saat event tertentu terjadi', 'Menjadwalkan tugas', 'Menampilkan output'], correctAnswer: 1, explanation: 'Trigger adalah blok PL/SQL yang otomatis dieksekusi ketika event tertentu (INSERT, UPDATE, DELETE, DDL, system event) terjadi pada database.', tags: ['basic', 'definition'] },
  { id: 'MCQ_120', category: 'triggers', difficulty: 'Easy', type: 'multiple_choice', question: 'Apa perbedaan BEFORE dan AFTER trigger?', options: ['BEFORE hanya untuk INSERT', 'BEFORE dieksekusi sebelum DML, AFTER setelah DML', 'AFTER lebih cepat', 'Tidak ada perbedaan'], correctAnswer: 1, explanation: 'BEFORE trigger dieksekusi sebelum DML operation (bisa memodifikasi data :NEW). AFTER trigger dieksekusi setelah DML berhasil (data sudah berubah).', tags: ['before', 'after'] },
  { id: 'MCQ_121', category: 'triggers', difficulty: 'Medium', type: 'multiple_choice', question: 'Kapan menggunakan row-level trigger?', options: ['Ketika perlu aksi per baris yang terpengaruh DML', 'Ketika hanya butuh aksi sekali saja', 'Ketika tidak perlu :NEW/:OLD', 'Hanya untuk audit'], correctAnswer: 0, explanation: 'Row-level trigger (FOR EACH ROW) dieksekusi sekali untuk setiap baris yang terpengaruh DML. Statement-level trigger dieksekusi sekali per DML statement, berapa pun baris yang terpengaruh.', tags: ['row-level', 'statement-level'] },
  { id: 'MCQ_122', category: 'triggers', difficulty: 'Medium', type: 'multiple_choice', question: 'Apa fungsi :NEW dan :OLD qualifier?', options: [':NEW untuk INSERT, :OLD untuk DELETE', ':NEW = nilai setelah modifikasi, :OLD = nilai sebelum modifikasi', ':NEW untuk SELECT, :OLD untuk UPDATE', 'Hanya label biasa'], correctAnswer: 1, explanation: ':NEW merujuk pada nilai baris setelah operasi (tersedia di INSERT, UPDATE). :OLD merujuk pada nilai sebelum operasi (tersedia di UPDATE, DELETE). Di BEFORE trigger, :NEW bisa dimodifikasi.', tags: [':new', ':old', 'qualifier'] },
  { id: 'MCQ_123', category: 'triggers', difficulty: 'Hard', type: 'multiple_choice', question: 'Apa itu mutating table error?', options: ['Error karena tabel corrupt', 'Error saat trigger mencoba SELECT/DML dari tabel yang sedang dipicu trigger tersebut', 'Error karena trigger nested', 'Error karena trigger infinite loop'], correctAnswer: 1, explanation: 'Mutating table error (ORA-04091) terjadi saat row-level trigger mencoba READ atau MODIFY tabel yang menyebabkan trigger tersebut fire. Solusi: gunakan compound trigger atau package dengan collection.', tags: ['mutating', 'error'] },
  { id: 'MCQ_124', category: 'triggers', difficulty: 'Easy', type: 'multiple_choice', question: 'Bagaimana cara disable trigger?', options: ['DROP TRIGGER', 'ALTER TRIGGER trg DISABLE;', 'DEACTIVATE TRIGGER trg;', 'SET TRIGGER trg OFF;'], correctAnswer: 1, explanation: 'ALTER TRIGGER trigger_name DISABLE; menonaktifkan trigger tanpa menghapusnya. ALTER TRIGGER trigger_name ENABLE; untuk mengaktifkan kembali.', tags: ['disable', 'enable'] },
  { id: 'MCQ_125', category: 'triggers', difficulty: 'Medium', type: 'multiple_choice', question: 'Apakah trigger bisa memiliki parameter?', options: ['Ya, seperti procedure', 'Tidak, trigger tidak menerima parameter', 'Hanya trigger DDL', 'Hanya parameter IN'], correctAnswer: 1, explanation: 'Trigger TIDAK bisa menerima parameter langsung. Trigger dipicu oleh event database, bukan dipanggil secara eksplisit. Data diakses melalui :NEW, :OLD, dan built-in functions.', tags: ['parameter', 'limitation'] },
  { id: 'MCQ_126', category: 'triggers', difficulty: 'Easy', type: 'multiple_choice', question: 'Event apa yang bisa memicu DML trigger?', options: ['SELECT, INSERT, UPDATE', 'INSERT, UPDATE, DELETE', 'Hanya INSERT', 'INSERT, UPDATE, DELETE, SELECT'], correctAnswer: 1, explanation: 'DML trigger bisa dipicu oleh: INSERT, UPDATE, atau DELETE. SELECT bukan DML operation dan tidak bisa memicu trigger. Bisa kombinasi: BEFORE INSERT OR UPDATE ON table.', tags: ['dml-events'] },
];

export const cat09Code: CodeChallenge[] = [
  {
    id: 'CODE_036',
    category: 'triggers',
    difficulty: 'Medium',
    type: 'code_challenge',
    question: 'Buat BEFORE INSERT trigger pada tabel employees yang otomatis set created_date ke SYSDATE dan mengubah nama menjadi uppercase.',
    requirements: ['CREATE OR REPLACE TRIGGER trg_before_insert', 'BEFORE INSERT ON employees', 'FOR EACH ROW', 'Set :NEW.created_date := SYSDATE', 'Set :NEW.first_name := UPPER(:NEW.first_name)'],
    starterCode: '-- Buat trigger\nCREATE OR REPLACE TRIGGER trg_before_insert\n  -- timing dan event\n  \nBEGIN\n  -- Auto-set values\n  \nEND;\n/',
    solution: 'CREATE OR REPLACE TRIGGER trg_before_insert\n  BEFORE INSERT ON employees\n  FOR EACH ROW\nBEGIN\n  :NEW.hire_date := SYSDATE;\n  :NEW.first_name := UPPER(:NEW.first_name);\n  DBMS_OUTPUT.PUT_LINE(\'Trigger fired: \' || :NEW.first_name);\nEND;\n/',
    hints: ['BEFORE INSERT ON table_name FOR EACH ROW', ':NEW.column_name := value; untuk set nilai', 'Trigger otomatis fire saat INSERT terjadi'],
    validationRules: { mustContain: ['TRIGGER', 'BEFORE', 'INSERT', 'FOR EACH ROW', ':NEW', 'BEGIN', 'END'] },
    tags: ['before-insert', 'auto-populate'],
  },
];
