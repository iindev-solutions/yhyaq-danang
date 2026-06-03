import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export default function PhilosophySection() {
  const cards = [
    {
      icon: '/assets/form-geometric-1.svg',
      title: 'Солнечный круг',
      desc: 'Символ божества Айыы Уола. Ысыах — моление, цель которого — укрепить душу теплом и светом, восстановить энергию на год вперёд.',
      tag: 'Связь с небом',
      sakha: 'Кюн (Kün)',
      bg: 'bg-[#FFE0CC]',
      accent: 'text-[#FC440F]',
    },
    {
      icon: '/assets/form-geometric-3.svg',
      title: 'Сосуд Чороон',
      desc: 'Традиционный деревянный кубок на трех ножках. Из него пьют целебный кумыс, передавая по кругу тепло дружбы и единства.',
      tag: 'Благословение',
      sakha: 'Чороон (Choroon)',
      bg: 'bg-[#D0D0FB]',
      accent: 'text-[#4242F0]',
    },
    {
      icon: '/assets/form-organic-1.svg',
      title: 'Хоровод Осуохай',
      desc: 'Великий круговой танец. Двигаясь по часовой стрелке вслед за солнцем, люди очищаются от негатива, образуя кольцо жизненной энергии.',
      tag: 'Сила общины',
      sakha: 'Осуохай (Osuokhay)',
      bg: 'bg-[#CEFDDE]',
      accent: 'text-[#03402C]',
    },
    {
      icon: '/assets/form-organic-2.svg',
      title: 'Обряд Алгыс',
      desc: 'Поклонение добрым божествам через кормление священного огня маслом и оладьями под мелодичные заклинания алгысчыта.',
      tag: 'Очищение души',
      sakha: 'Алгыс (Algys)',
      bg: 'bg-[#FF80AA]/30',
      accent: 'text-[#601124]',
    },
  ];

  return (
    <section id="philosophy-section" className="py-20 px-6 paper-texture border-b border-[#D0D0FB]/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="font-body text-xs uppercase tracking-widest text-[#FC440F] bg-[#FFE0CC] px-3.5 py-1.5 rounded-full font-bold">Обряды и Смыслы</span>
          <h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26]">Философия Ысыаха</h3>
          <p className="text-[#0B0B26]/60 max-w-lg mx-auto text-sm sm:text-base font-body">Каждый символ праздника несёт в себе силу весеннего возрождения, тепла и священного солнца</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-white p-6 rounded-3xl border border-[#D0D0FB]/50 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center mb-6`}>
                  <img src={card.icon} alt="" className="w-8 h-8 brand-form" />
                </div>
                <h4 className="font-display text-xl font-bold text-[#0B0B26] mb-2">{card.title}</h4>
                <p className="text-xs text-[#0B0B26]/60 leading-relaxed font-body">{card.desc}</p>
              </div>
              <div className="pt-6 border-t border-[#D0D0FB]/30 mt-6 flex justify-between items-center text-[10px] font-body text-[#0B0B26]/40">
                <span>{card.tag}</span>
                <span className={card.accent}>{card.sakha}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MYTONA Sponsor Block */}
        <div className="mt-16 bg-[#FC440F]/10 rounded-[3rem] p-8 md:p-12 border border-[#FC440F]/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FC440F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-dashed border-[#FC440F]/20 flex items-center justify-center animate-sun-spin pointer-events-none relative flex-shrink-0">
            <div className="absolute w-24 h-24 bg-white/95 rounded-full flex items-center justify-center shadow-md animate-sun-spin-counter">
              <span className="font-display font-extrabold text-[#FC440F] tracking-widest text-[9px] uppercase">MYTONA</span>
            </div>
          </div>

          <div className="space-y-4">
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-[#FC440F]">Главный Меценат Праздника</span>
            <h4 className="font-display text-2xl md:text-3xl font-black text-[#601124] uppercase tracking-wide">Генеральный партнер MYTONA</h4>
            <p className="text-[#601124]/70 text-xs sm:text-sm leading-relaxed max-w-xl font-body">
              Компания <strong className="font-bold">MYTONA</strong> с гордостью выступает генеральным спонсором этнофестиваля Ысыах в Дананге. Бережно оберегая вековые традиции Саха, Mytona объединяет людей из разных уголков света, помогая сохранять дух сплочения и делясь теплом северной дружбы.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-body font-bold text-[#FC440F] pt-2">
              <Award className="w-4 h-4" />
              <span>По инициативе и содействию лидеров Mytona</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
