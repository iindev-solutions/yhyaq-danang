import { Sun } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-[#0B0B26] text-[#CEFDDE]/50 py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <Sun className="w-8 h-8 text-[#E3FF00] animate-spin mb-2" style={{ animationDuration: '40s' }} />
          <h5 className="font-display text-white font-extrabold tracking-wider uppercase">ETHNOFEST ЫСЫАХ 2026</h5>
          <p className="text-[11px] max-w-sm leading-normal font-body">Традиции Саха на Золотом Берегу Вьетнама. Летнее солнцестояние и великое сплочение на берегах Дананга.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-body">
          <a href="#hero-section" className="hover:text-white transition">Главная</a>
          <span>•</span>
          <a href="#philosophy-section" className="hover:text-white transition">Традиции</a>
          <span>•</span>
          <a href="#program-section" className="hover:text-white transition">Программа</a>
          <span>•</span>
          <a href="#media-section" className="hover:text-white transition">Архив 2025</a>
          <span>•</span>
          <a href="#map-section" className="hover:text-white transition">Карта</a>
        </div>

        <div className="flex flex-col items-center md:items-end text-[10px] font-body space-y-1">
          <span>© Yhyaq Da Nang Event Org, 2026.</span>
          <span>Генеральный спонсор MYTONA IT.</span>
          <span className="text-[#CEFDDE]/30 uppercase tracking-widest mt-1">КЮН АЙЫЫ ТАҤАРА БАРЫБЫТЫН ХАРЫСТААТЫН!</span>
        </div>
      </div>
    </footer>
  );
}
