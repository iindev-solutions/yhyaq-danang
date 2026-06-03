'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy-section"
      className="h-screen bg-[#FFF3EB] overflow-hidden relative border-b border-[#D0D0FB]/50 z-50"
    >
      {/* Header */}
      <div className="absolute top-8 left-6 z-10">
        <span className="font-body text-xs uppercase tracking-widest text-[#FC440F] bg-[#FFE0CC] px-3.5 py-1.5 rounded-full font-bold">
          Обряды и Смыслы
        </span>
        <h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26] mt-2">
          Философия Ысыаха
        </h3>
        <p className="text-[#0B0B26]/60 max-w-md text-sm sm:text-base font-body mt-2">
          Каждый символ праздника несёт в себе силу весеннего возрождения, тепла и священного солнца
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-6 h-full items-center pl-6 pr-[50vw] pt-32 will-change-transform"
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[40vw] max-w-[520px] h-[60vh] max-h-[500px] bg-white p-8 rounded-3xl border border-[#D0D0FB]/50 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-8`}>
                <img src={card.icon} alt="" className="w-9 h-9 brand-form" />
              </div>
              <h4 className="font-display text-2xl font-bold text-[#0B0B26] mb-3">{card.title}</h4>
              <p className="text-sm text-[#0B0B26]/60 leading-relaxed font-body">{card.desc}</p>
            </div>
            <div className="pt-6 border-t border-[#D0D0FB]/30 mt-6 flex justify-between items-center text-[11px] font-body text-[#0B0B26]/40">
              <span>{card.tag}</span>
              <span className={card.accent}>{card.sakha}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
