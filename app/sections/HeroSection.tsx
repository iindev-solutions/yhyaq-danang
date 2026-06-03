import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative flex flex-col items-center justify-center p-6 pt-16 pb-20 sm:pb-28 text-center bg-[#CEFDDE] border-b border-[#03402C]/10"
    >
      {/* Decorative thin circle */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-[#03402C]/5 animate-sun-spin pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center space-y-4">
        {/* Event Badge */}
        <motion.div
          id="hero-badge"
          className="px-4 py-1.5 bg-[#03402C] text-[#CEFDDE] rounded-full text-xs font-body tracking-[0.25em] font-bold uppercase mb-2 inline-flex items-center gap-1"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span>VIETNAM</span>
          <span>•</span>
          <span>DA NANG 2026</span>
        </motion.div>

        {/* Title Logo */}
        <motion.div
          id="hero-logo"
          className="flex flex-col items-center select-none"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <span className="text-[10px] sm:text-xs font-body font-bold uppercase tracking-widest text-[#03402C]/80 mb-2">
            JUNE 20 2026
          </span>
          <h1 className="font-display text-7xl sm:text-[9.5rem] leading-none font-extrabold tracking-tighter text-[#03402C] lowercase">
            yhy<span className="text-[#0BDA51]">a</span>q
          </h1>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-widest text-[#03402C] mt-1">
            DANANG
          </h2>
        </motion.div>

        {/* Meta Tags */}
        <motion.div
          className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto w-full font-body text-xs text-[#03402C]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col items-center bg-[#0BDA51]/20 p-3 rounded-2xl border border-[#03402C]/10">
            <Calendar className="w-5 h-5 text-[#03402C] mb-1.5" />
            <span className="font-bold">20 ИЮНЯ 2026</span>
            <span className="text-[10px] text-[#03402C]/70">Суббота, с 11:00</span>
          </div>
          <div className="flex flex-col items-center bg-[#0BDA51]/20 p-3 rounded-2xl border border-[#03402C]/10">
            <MapPin className="w-5 h-5 text-[#03402C] mb-1.5" />
            <span className="font-bold">ДАНАНГ</span>
            <span className="text-[10px] text-[#03402C]/70">Palm Grove Resort</span>
          </div>
          <div className="flex flex-col items-center bg-[#0BDA51]/20 p-3 rounded-2xl border border-[#03402C]/10 col-span-2 sm:col-span-1">
            <Users className="w-5 h-5 text-[#03402C] mb-1.5" />
            <span className="font-bold">ETHNOFEST</span>
            <span className="text-[10px] text-[#03402C]/70">Вход свободный</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-xl text-[#03402C]/80 leading-relaxed max-w-2xl pt-6 tracking-wide text-center font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Впервые на живописном побережье Вьетнама! Приглашаем вас отметить древний якутский праздник солнца и лета <strong className="font-extrabold text-[#03402C]">Ысыах</strong>. Окунитесь в священный алгыс, возьмитесь за руки в хороводе Осуохай, отведайте золотые оладьи и испытайте силу на песчаном пляже!
        </motion.p>

        {/* Scroll Guide */}
        <motion.div
          className="pt-8 flex flex-col items-center gap-1 opacity-60 text-[#03402C]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] font-body tracking-widest uppercase">Узнать программу праздника</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
