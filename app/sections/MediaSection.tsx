import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Video, Image as ImageIcon } from 'lucide-react';

const reels = [
  {
    title: 'Пляжные игры на песке',
    desc: 'Участники соревнуются в мас-рестлинге и народном беге на берегу теплого океана.',
    bg: 'from-[#FC440F] via-[#FF80AA] to-[#E3FF00]',
    stats: 'Pattaya 25',
  },
  {
    title: 'Великий хоровод Осуохай',
    desc: 'Единение сердец и душ под палящим тропическим солнцем, символизирующее круговорот жизни.',
    bg: 'from-[#601124] via-[#FC440F] to-[#E3FF00]',
    stats: 'Pattaya 25',
  },
  {
    title: 'Обряд очищения Алгыс',
    desc: 'Священный огонь, звуки хомуса и благословение духов природы во имя согласия и счастья.',
    bg: 'from-[#03402C] via-[#0BDA51] to-[#CEFDDE]',
    stats: 'Pattaya 25',
  },
];

const photos = [
  {
    title: 'Халадай и серебро',
    desc: 'Якутские красавицы в воздушных шелковых платьях-халадай и старинных серебряных украшениях.',
    seed: 'yakut-dresses',
    overlay: 'bg-[#4242F0]/20',
  },
  {
    title: 'Солнечные оладьи',
    desc: 'Золотистые оладьи на тарелке — символ солнца, домашнего уюта и искреннего гостеприимства.',
    seed: 'yakut-pancakes',
    overlay: 'bg-[#FC440F]/20',
  },
  {
    title: 'Богатыри на песке',
    desc: 'Соревнования по мас-рестлингу на берегу шумящего океана объединяют молодёжь.',
    seed: 'beach-sand-games',
    overlay: 'bg-[#0BDA51]/20',
  },
];

export default function MediaSection() {
  const [activeReel, setActiveReel] = useState<number | null>(null);

  return (
    <section id="media-section" className="py-24 px-6 paper-texture border-b border-[#D0D0FB]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="font-body text-xs uppercase tracking-widest text-[#03402C] bg-[#CEFDDE] px-3.5 py-1.5 rounded-full font-bold">Архив Паттайи 2025</span>
          <h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26] tracking-tight">Как это было в прошлом году</h3>
          <p className="text-[#0B0B26]/50 text-sm max-w-md mx-auto font-body">Яркие моменты, видео-рилсы со спортивных состязаний и душевные улыбки гостей</p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reels.map((reel, idx) => (
            <motion.div
              key={reel.title}
              className={`relative rounded-[2rem] aspect-[9/16] bg-gradient-to-b ${reel.bg} p-6 flex flex-col justify-between overflow-hidden shadow-md group cursor-pointer border border-[#D0D0FB]/30`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveReel(activeReel === idx ? null : idx)}
            >
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/30 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition" />
              <div className="relative flex justify-between items-center text-[10px] font-body text-white/90">
                <span className="bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">{reel.stats}</span>
                <span className="bg-black/30 backdrop-blur p-1 rounded-full"><Video className="w-3 h-3 text-[#E3FF00]" /></span>
              </div>

              <AnimatePresence>
                {activeReel === idx && (
                  <motion.div
                    className="absolute inset-0 bg-[#0B0B26]/90 z-10 flex flex-col items-center justify-center p-6 text-center text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="font-body text-[9px] text-[#E3FF00] uppercase tracking-widest mb-1">Воспроизведение...</span>
                    <p className="text-xs text-[#CEFDDE] font-body italic leading-relaxed">
                      Здесь будет встроен видео-отрывок прошлогоднего фестиваля
                    </p>
                    <button
                      className="mt-6 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-body tracking-widest uppercase text-white"
                      onClick={(e) => { e.stopPropagation(); setActiveReel(null); }}
                    >
                      Закрыть
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative space-y-2 z-1">
                <h4 className="font-display font-black leading-snug text-white text-lg sm:text-xl drop-shadow-sm">{reel.title}</h4>
                <p className="text-[11px] text-white/90 leading-relaxed font-body line-clamp-3">{reel.desc}</p>
                <div className="flex items-center gap-1 text-[10px] text-[#E3FF00] font-body font-bold pt-1">
                  <Play className="w-3 h-3 fill-[#E3FF00]" />
                  <span>Кликните для просмотра</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo Gallery */}
        <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-[#D0D0FB]/50 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2.5 h-8 bg-[#E3FF00] rounded-full" />
            <h4 className="font-display text-2xl font-black text-[#0B0B26]">Галерея традиций и лиц</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <div key={photo.title} className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-[#FFF3EB] shadow-inner group">
                  <div className={`absolute inset-0 ${photo.overlay} group-hover:bg-transparent transition duration-300 flex items-center justify-center`}>
                    <ImageIcon className="w-10 h-10 text-white opacity-85 group-hover:hidden transition" />
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('https://picsum.photos/seed/${photo.seed}/400/400')` }}
                  />
                </div>
                <div className="space-y-1">
                  <h5 className="font-display text-base font-bold text-[#0B0B26]">{photo.title}</h5>
                  <p className="text-[11px] text-[#0B0B26]/50 leading-relaxed max-w-xs font-body">{photo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
