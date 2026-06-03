import { motion } from 'motion/react';
import { Compass, Info, CheckCircle2 } from 'lucide-react';

const pins = [
  { id: 'airport', label: '✈️ Аэропорт Дананга', x: 10, y: 12, color: 'bg-[#0B0B26]' },
  { id: 'dragon', label: '🐉 Мост Дракона', x: 25, y: 40, color: 'bg-[#E3FF00]' },
  { id: 'venue', label: '☀️ Palm Grove Resort', x: 55, y: 55, color: 'bg-[#FC440F]', isVenue: true },
  { id: 'beach', label: '🏖️ Пляж Ми Кхе', x: 80, y: 80, color: 'bg-[#0BDA51]' },
];

const tips = [
  {
    title: 'Дресс-код (совет)',
    text: 'Мы поощряем стилизованную национальную одежду, белые или кремовые лёгкие наряды изо льна и ситца — они великолепно сочетаются с солнцем и морем.',
  },
  {
    title: 'Что взять с собой',
    text: 'Солнцезащитные очки, коврик для сидения на песке во время хоровода, головной убор и отличное настроение!',
  },
  {
    title: 'Для детей',
    text: 'На площадке Palm Grove организован тенистый детский уголок с играми на песке, аниматорами и чистой питьевой водой.',
  },
  {
    title: 'Сборные игры',
    text: 'Записаться на спортивные состязания по мас-рестлингу можно прямо на месте или заполнив форму RSVP внизу страницы.',
  },
];

export default function MapSection() {
  return (
    <section id="map-section" className="py-24 px-6 paper-texture border-b border-[#D0D0FB]/50">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-body text-xs uppercase tracking-widest text-[#FC440F] bg-[#FFE0CC] px-3.5 py-1.5 rounded-full font-bold">Карта События</span>
          <h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26] tracking-tight">Где пройдёт Ысыах</h3>
          <p className="text-[#0B0B26]/50 text-xs sm:text-sm max-w-md mx-auto font-body">Интерактивный путеводитель по побережью Дананга с отметками ключевых точек праздничного лагеря</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Visual */}
          <div className="lg:col-span-2 bg-[#CEFDDE] border border-[#D0D0FB]/50 p-4 sm:p-6 rounded-[2.5rem] shadow-inner relative overflow-hidden aspect-[4/3] flex flex-col justify-between">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[#4242F0]/10 rounded-l-[10rem] pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-[#4242F0]/5 border-l border-[#4242F0]/10 pointer-events-none" />

            <div className="relative flex justify-between items-center bg-white/80 backdrop-blur px-4 py-2 rounded-2xl border border-[#D0D0FB]/50 z-10 text-xs font-body">
              <span className="font-bold text-[#03402C] flex items-center gap-1">
                <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '20s' }} />
                <span>КАРТА ДАНАНГА</span>
              </span>
              <span className="text-[#FC440F]">16°04'N, 108°13'E</span>
            </div>

            <div className="relative flex-grow h-64">
              <svg className="absolute inset-0 w-full h-full text-[#03402C]/15 select-none pointer-events-none" viewBox="0 0 400 300" fill="none">
                <path d="M120,0 C160,100 80,200 240,300" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {pins.map((pin) => (
                <div
                  key={pin.id}
                  className="absolute flex flex-col items-center group z-10"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  {pin.isVenue && (
                    <span className="absolute flex h-8 w-8 -top-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FC440F] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-8 w-8 bg-[#FC440F]/10"></span>
                    </span>
                  )}
                  <div className={`w-3.5 h-3.5 ${pin.color} rounded-full border-2 border-white flex items-center justify-center cursor-help animate-pulse shadow-sm`} />
                  <div className={`${pin.isVenue ? 'bg-[#03402C] text-white' : 'bg-white/95 text-[#0B0B26]'} px-2.5 py-1 rounded-xl shadow border border-[#D0D0FB]/30 text-[10px] font-body mt-1 whitespace-nowrap`}>
                    {pin.label}
                    {pin.isVenue && <span className="block text-[8px] font-body text-[#E3FF00] font-bold uppercase tracking-widest mt-0.5">МЕСТО ПРАЗДНИКА</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative text-[10px] font-body text-[#03402C] bg-white/60 p-2.5 rounded-2xl border border-[#D0D0FB]/30">
              <strong className="font-bold">Как добраться:</strong> Palm Grove Resort находится в 12 минутах на такси от центрального Моста Дракона.
            </div>
          </div>

          {/* Tips */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-[#D0D0FB]/50 shadow-sm space-y-4">
              <h4 className="font-display text-lg font-black text-[#0B0B26] flex items-center gap-2">
                <Info className="w-5 h-5 text-[#FC440F]" />
                <span>Памятка Участника</span>
              </h4>
              <ul className="space-y-3 text-xs leading-normal text-[#0B0B26]/60 font-body">
                {tips.map((tip) => (
                  <li key={tip.title} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#0BDA51] flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#0B0B26] font-semibold">{tip.title}:</strong> {tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#CEFDDE]/50 p-6 rounded-[2rem] border border-[#03402C]/10 flex items-center justify-between">
              <div>
                <span className="font-body text-[9px] text-[#03402C] tracking-widest font-bold uppercase">Прогноз погоды (20 Июня)</span>
                <h5 className="font-display text-xl font-black text-[#03402C] mt-1">Солнечно, +32°C</h5>
                <p className="text-[11px] text-[#03402C]/70 mt-1 font-body">Идеальная погода для поклонения солнцу и купания на закате</p>
              </div>
              <div className="w-16 h-16 bg-[#E3FF00] rounded-full flex items-center justify-center text-[#03402C] text-3xl shadow-lg border-2 border-white animate-sun-spin">
                ☀️
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
