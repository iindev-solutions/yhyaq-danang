import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Tent, Utensils, Users, Award, Info } from 'lucide-react';

const slots = [
  {
    time: '11:00',
    label: 'Начало',
    title: 'Алгыс — Обряд Благословления у Огня',
    desc: 'Торжественное открытие праздника. Очищающий ритуал благословения огня, кормление духов священным подношением, звуки сакрального хомуса и хор добрых пожеланий.',
    location: 'Локация: Главная поляна курорта',
    tag: 'Главное событие',
    tagColor: 'bg-[#FFE0CC] text-[#FC440F]',
    accent: 'text-[#03402C]',
    bg: 'hover:bg-[#CEFDDE]/30',
    border: 'hover:border-[#03402C]/30',
  },
  {
    time: '11:30',
    label: 'Угощение',
    title: 'Традиционные оладьи и дегустация',
    desc: 'Угощение свежеприготовленными круглыми оладьями (символ солнца), дегустация национальных якутских блюд и тропических прохладительных напитков.',
    location: 'Локация: Шатер дегустаций / Palm Food Zone',
    tag: 'Гастрономия',
    tagColor: 'bg-[#FFE0CC] text-[#FC440F]',
    accent: 'text-[#FC440F]',
    bg: 'hover:bg-[#FFE0CC]/30',
    border: 'hover:border-[#FC440F]/30',
  },
  {
    time: '12:30',
    label: 'Единение',
    title: 'Осуохай — Большой Круговой Хоровод',
    desc: 'Встаём в круг дружбы на пляже! Под предводительством запевалы танцуем и поём Осуохай, чтобы зарядиться мощной солнечной силой единения.',
    location: 'Локация: Песчаный пляж Palm Grove',
    tag: 'Интерактив',
    tagColor: 'bg-[#FF80AA]/30 text-[#601124]',
    accent: 'text-[#601124]',
    bg: 'hover:bg-[#FF80AA]/10',
    border: 'hover:border-[#601124]/30',
  },
  {
    time: '13:30',
    label: 'Спорт',
    title: 'Игры Предков и Мас-Рестлинг',
    desc: 'Северные спортивные состязания на вьетнамском песке! Мас-рестлинг, хапсагай, народная эстафета и пляжный волейбол. Кубки лучшим!',
    location: 'Локация: Пляжная спортивная арена',
    tag: 'Соревнования',
    tagColor: 'bg-[#D0D0FB]/50 text-[#4242F0]',
    accent: 'text-[#4242F0]',
    bg: 'hover:bg-[#D0D0FB]/20',
    border: 'hover:border-[#4242F0]/30',
  },
  {
    time: '15:00',
    label: 'Розыгрыш',
    title: 'Лотерея "Лотрия" и Подарки спонсоров',
    desc: 'Торжественная беспроигрышная якутская лотерея с ценными призами, конкурсы на лучшие стилизованные национальные наряды и награждение победителей.',
    location: 'Локация: Главная сцена на песке',
    tag: 'Лотерея',
    tagColor: 'bg-[#E3FF00]/40 text-[#0B0B26]',
    accent: 'text-[#0B0B26]',
    bg: 'hover:bg-[#E3FF00]/20',
    border: 'hover:border-[#0B0B26]/30',
  },
];

export default function ProgramSection() {
  return (
    <section id="program-section" className="py-24 px-6 bg-white border-b border-[#D0D0FB]/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="font-body text-xs uppercase tracking-widest text-[#03402C] bg-[#CEFDDE] px-3.5 py-1.5 rounded-full font-bold">Программа События</span>
          <h3 className="font-display text-4xl font-black text-[#0B0B26] tracking-tight">Ыһыах Хаамыыта / 20 Июня</h3>
          <p className="text-[#0B0B26]/50 text-sm max-w-md mx-auto font-body">Полный таймлайн активностей и традиционного тайминга для незабываемого праздничного дня</p>
        </div>

        <div className="space-y-6">
          {slots.map((slot, i) => (
            <motion.div
              key={slot.time}
              className={`group flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 rounded-3xl border border-[#D0D0FB]/50 ${slot.border} ${slot.bg} transition duration-300 relative overflow-hidden`}
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center md:flex-col gap-3 font-body md:w-32 flex-shrink-0">
                <span className={`text-2xl font-black ${slot.accent} bg-[#CEFDDE]/50 px-4 py-1.5 rounded-2xl md:w-full text-center`}>
                  {slot.time}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#0B0B26]/40 tracking-wider">{slot.label}</span>
              </div>

              <div className="space-y-2 flex-grow">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className={`font-display text-lg sm:text-xl font-black text-[#0B0B26] ${slot.accent} transition`}>
                    {slot.title}
                  </h4>
                  <span className={`px-2 py-0.5 text-[9px] font-body font-bold rounded uppercase ${slot.tagColor}`}>
                    {slot.tag}
                  </span>
                </div>
                <p className="text-xs text-[#0B0B26]/50 leading-relaxed font-body">{slot.desc}</p>
                <div className="pt-2 flex items-center gap-2 text-[10px] font-body text-[#0B0B26]/40">
                  <Info className={`w-3 h-3 ${slot.accent}`} />
                  <span>{slot.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
