import { Heart, Github, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">PL/SQL Learn</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Platform pembelajaran PL/SQL Oracle interaktif dengan 300+ soal latihan, materi terstruktur, dan tracking progress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Menu</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="/belajar" className="hover:text-[var(--primary)] transition-colors">Materi Pembelajaran</a></li>
              <li><a href="/latihan" className="hover:text-[var(--primary)] transition-colors">Latihan Soal</a></li>
              <li><a href="/progress" className="hover:text-[var(--primary)] transition-colors">Progress</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Tentang</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>Versi 1.0.0</li>
              <li>Berbasis Oracle PL/SQL</li>
              <li>Data tersimpan di browser</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
          <p className="flex items-center gap-1">
            Dibuat oleh <span className="font-semibold text-[var(--text-secondary)]">Adrian Syah Abidin</span> dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> untuk pembelajaran PL/SQL
          </p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Adrian463588/plsqllearn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <span>&copy; {new Date().getFullYear()} PL/SQL Learn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
