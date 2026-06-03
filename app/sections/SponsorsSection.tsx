import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const sponsors = [
  {
    tier: 'ГЕНЕРАЛЬНЫЙ ПАРТНЕР',
    name: 'MYTONA IT GROUP',
    desc: 'Крупный глобальный издатель игр и технологических решений, основанный братьями Ушницкими в Якутске. Неоценимый вклад в закупку аутентичного реквизита, продуктов для дегустаций и призов лотереи.',
    tag: 'Поддерживает культуру Саха во Вьетнаме и Таиланде',
    highlight: true,
  },
  {
    tier: 'PARTNER I',
    name: 'Yakutian Diaspora',
    desc: 'Якутское землячество во Вьетнаме и Таиланде — координаторы народных игр, повара этно-закусок и ведущие осуохая.',
    role: 'Организационная поддержка',
    highlight: false,
  },
  {
    tier: 'PARTNER II',
    name: 'Palm Grove Da Nang',
    desc: 'Премиальный пляжный курорт и ресторан Дананга, предоставивший лучшую береговую линию и лужайки для алгыса.',
    role: 'Площадка и пляжная зона',
    highlight: false,
  },
  {
    tier: 'PARTNER III',
    name: 'Khomus Sakha Union',
    desc: 'Творческий центр хомусной музыки, доставивший аутентичные кованые инструменты для живых мелодий в руках мастеров.',
    role: 'Инструментальная поддержка',
    highlight: false,
  },
];

export default function SponsorsSection() {
  return (
    <section id="sponsors-section" className="py-24 px-6 bg-gradient-to-b from-[#03402C] to-[#0B0B26] text-[#CEFDDE]">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-body text-xs uppercase tracking-widest text-[#CEFDDE] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full font-bold">Опора Фестиваля</span>
          <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">Наши Спонсоры и Друзья</h3>
          <p className="text-[#CEFDDE]/70 text-xs sm:text-sm max-w-md mx-auto font-body">Благодаря поддержке партнёров мы проводим этот потрясающий этнический праздник бесплатно для всех гостей!</p>
        </div>

        <div className="space-y-8">
          {/* Main Sponsor */}
          {sponsors.filter(s => s.highlight).map((sponsor) => (
            <div
              key={sponsor.name}
              className="bg-[#0BDA51]/10 backdrop-blur rounded-[2.5rem] p-8 md:p-12 border border-[#0BDA51]/25 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0BDA51]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#0BDA51]/20 transition duration-700" />

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 px-5 py-1 bg-gradient-to-r from-[#E3FF00] to-[#CEFDDE] text-[#03402C] text-[10px] font-body font-bold uppercase rounded-full tracking-widest shadow-md">
                {sponsor.tier}
              </div>

              <div className="w-52 h-28 bg-[#CEFDDE] rounded-3xl flex items-center justify-center p-6 relative shadow-inner flex-shrink-0">
                <span className="font-display text-[#03402C] text-3xl font-black tracking-[0.25em] flex flex-col items-center">
                  MÝTONA
                  <span className="text-[7px] font-body tracking-widest text-[#03402C]/70 uppercase font-bold">world publisher</span>
                </span>
              </div>

              <div className="space-y-3 text-center md:text-left">
                <h4 className="font-display text-2xl font-black text-white tracking-wide uppercase">{sponsor.name}</h4>
                <p className="text-sm text-[#CEFDDE]/80 leading-relaxed font-body">{sponsor.desc}</p>
                <div className="text-[11px] font-body text-[#0BDA51] flex items-center justify-center md:justify-start gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E3FF00]" />
                  <span>{sponsor.tag}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Sub-sponsors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sponsors.filter(s => !s.highlight).map((sponsor) => (
              <div key={sponsor.name} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <span className="font-body text-[9px] text-[#CEFDDE]/60 tracking-widest font-bold uppercase">{sponsor.tier}</span>
                  <h5 className="font-display text-lg font-bold text-white mt-2 mb-1">{sponsor.name}</h5>
                  <p className="text-xs text-[#CEFDDE]/70 leading-relaxed font-body">{sponsor.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/10 mt-6 text-[10px] font-body text-[#0BDA51]">
                  {sponsor.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-xs text-[#CEFDDE]/50 font-body">
            Хотите присоединиться в качестве партнёра? Напишите нам в Telegram: <strong className="text-[#E3FF00]">@yhyaq_danang</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
