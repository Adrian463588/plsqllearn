# 🎓 PL/SQL Learn — Platform Pembelajaran PL/SQL Oracle Interaktif

> Platform web interaktif untuk belajar PL/SQL Oracle dengan 289+ soal latihan, materi terstruktur dari catatan kelas, dan tracking progress otomatis.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer)

---

## ✨ Fitur Utama

- 📚 **Materi Pembelajaran** — Konten terstruktur dari catatan kelas Day 1–3 dengan code examples dan penjelasan
- 📝 **289+ Soal Latihan** — 230 Pilihan Ganda (MCQ) + 59 Code Challenge
- 🧠 **12 Kategori** — Dari dasar SQL sampai Performance & Best Practices
- 🎯 **Mode Latihan** — Pilihan Ganda, Code Challenge, dan Mode Ujian
- 📊 **Progress Dashboard** — Tracking progress per kategori dengan achievement
- 🌙 **Dark/Light Mode** — Theme toggle dengan transisi halus
- 💾 **Offline-First** — Semua data tersimpan di localStorage, tanpa registrasi
- 📱 **Responsive** — Desktop, tablet, dan mobile

---

## 📸 Screenshot

| Homepage | Materi Pembelajaran |
|:---:|:---:|
| Hero section dengan gradient dan animasi | Accordion sections dengan code blocks |

| Latihan MCQ | Progress Dashboard |
|:---:|:---:|
| Quiz interaktif dengan feedback langsung | Tracking per kategori dan achievement |

---

## 🗂️ Struktur Project

```
plsqllearn/
├── src/
│   ├── app/                          # Next.js App Router (Pages)
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout + SEO metadata
│   │   ├── globals.css               # Design system & CSS variables
│   │   ├── belajar/
│   │   │   ├── page.tsx              # Daftar 12 kategori pembelajaran
│   │   │   └── [category]/page.tsx   # Detail materi per kategori
│   │   ├── latihan/
│   │   │   ├── page.tsx              # Hub mode latihan
│   │   │   ├── mcq/page.tsx          # Quiz Pilihan Ganda interaktif
│   │   │   └── code/page.tsx         # Code Challenge (split view)
│   │   ├── progress/page.tsx         # Dashboard progress & achievement
│   │   └── ujian/page.tsx            # Konfigurasi mode ujian
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx            # Navbar glassmorphism + mobile menu
│   │       └── Footer.tsx            # Footer dengan credit & links
│   │
│   ├── data/
│   │   ├── categories.ts             # 12 kategori PL/SQL
│   │   ├── achievements.ts           # 12 achievement / badge
│   │   ├── learning-materials.ts     # Materi Day 1–3 (6 kategori)
│   │   └── questions/                # Bank soal per kategori
│   │       ├── index.ts              # Aggregator semua soal
│   │       ├── cat01-pengenalan.ts   # Pengenalan PL/SQL & Blocks
│   │       ├── cat01-materi.ts       # + Soal dari materi Day 1
│   │       ├── cat02-variables.ts    # Variables & Data Types
│   │       ├── cat02-materi.ts       # + Soal dari materi Day 2
│   │       ├── cat03-control.ts      # Control Structures
│   │       ├── cat03-materi.ts       # + Soal dari materi Day 2+3
│   │       ├── cat04-cursors.ts      # Cursors
│   │       ├── cat04-materi.ts       # + Soal dari materi Day 3
│   │       ├── cat05-exceptions.ts   # Exception Handling
│   │       ├── cat06-procedures.ts   # Procedures
│   │       ├── cat06-materi.ts       # + Soal dari materi Day 3
│   │       ├── cat07-functions.ts    # Functions
│   │       ├── cat07-materi.ts       # + Soal dari materi Day 3
│   │       ├── cat08-packages.ts     # Packages
│   │       ├── cat09-triggers.ts     # Triggers
│   │       ├── cat10-collections.ts  # Collections
│   │       ├── cat11-records.ts      # Records & Advanced Types
│   │       └── cat12-performance.ts  # Performance & Best Practices
│   │
│   ├── hooks/
│   │   ├── useTheme.ts              # Dark/light mode toggle
│   │   ├── useProgress.ts           # Progress state + achievement
│   │   └── useTimer.ts              # Countdown timer untuk ujian
│   │
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces & types
│   │
│   └── utils/
│       ├── storage.ts               # localStorage CRUD + export/import
│       ├── validation.ts            # MCQ + PL/SQL code validation
│       ├── scoring.ts               # Scoring, metrics, achievement
│       └── quizEngine.ts            # Load, filter, shuffle soal
│
├── public/                           # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** 18+ (disarankan 20+)
- **npm** atau **yarn**

### Instalasi

```bash
# Clone repository
git clone https://github.com/Adrian463588/plsqllearn.git
cd plsqllearn

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Production Build

```bash
# Build
npm run build

# Jalankan production server
npm start
```

### Lint

```bash
npm run lint
```

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **Next.js** | 16.1.6 | Framework React dengan App Router, SSR/SSG |
| **React** | 19.2.3 | Library UI |
| **TypeScript** | 5.x | Static typing untuk keamanan kode |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Framer Motion** | 12.x | Animasi & transisi halus |
| **Lucide React** | 0.575 | Icon library (180+ icon) |
| **Recharts** | 3.7 | Grafik dan chart (untuk dashboard) |
| **CodeMirror** | 6.x | Editor kode dengan syntax highlighting SQL |

---

## 📖 Konten Materi

Materi diambil dari catatan kelas Oracle PL/SQL:

| Hari | Topik | Kategori |
|------|-------|----------|
| **Day 1** | SELECT, CREATE TABLE, INSERT, JOIN, ALTER, Subquery, Aggregate Functions, Constraints | Pengenalan PL/SQL |
| **Day 2** | Anonymous Blocks, Variables, Data Types, %TYPE, BOOLEAN, IF, CASE, DECODE, GROUP BY, Basic LOOP | Variables & Data Types, Control Structures |
| **Day 3** | WHILE/FOR/Nested Loops, CONTINUE, GOTO, Cursors, Procedures, Functions | Control Structures, Cursors, Procedures, Functions |

### Distribusi Soal (289 total)

| Kategori | MCQ | Code | Total |
|----------|-----|------|-------|
| Pengenalan PL/SQL & Blocks | 45 | 10 | 55 |
| Variables & Data Types | 30 | 10 | 40 |
| Control Structures | 35 | 15 | 50 |
| Cursors | 28 | 6 | 34 |
| Exception Handling | 15 | 4 | 19 |
| Procedures | 20 | 5 | 25 |
| Functions | 17 | 4 | 21 |
| Packages | 8 | 1 | 9 |
| Triggers | 8 | 1 | 9 |
| Collections | 8 | 1 | 9 |
| Records & Advanced Types | 6 | 1 | 7 |
| Performance & Best Practices | 10 | 1 | 11 |
| **Total** | **230** | **59** | **289** |

---

## 👤 Dibuat Oleh

**Adrian Syah Abidin**

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pembelajaran PL/SQL Oracle.
