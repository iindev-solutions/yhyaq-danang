"use client";

import { motion } from "motion/react";

const cards = [
	{
		icon: "/assets/form-geometric-1.svg",
		title: "Культ солнца",
		desc: "Ысыах - праздник летнего солнцестояния и культ божества Айыы. Старейшина в белом открывает праздник, окропляя землю кумысом и кормя священный огонь, моля духов о благополучии всех собравшихся.",
		tag: "Айыы",
		sakha: "Ыhыах (Yhyakh)",
		bg: "bg-[#FFE0CC]",
		accent: "text-[#FC440F]",
	},
	{
		icon: "/assets/form-organic-2.svg",
		title: "Алгыс - благословение",
		desc: "Старейшина обращается к добрым духам Айыы с молитвой о здоровье и процветании. Священный огонь кормят маслом и оладьями, а салама - девять пучков конского волоса - вешают на Сэргэ, праздничный столб.",
		tag: "Молитва огню",
		sakha: "Алгыс (Algys)",
		bg: "bg-[#FF80AA]/30",
		accent: "text-[#601124]",
	},
	{
		icon: "/assets/form-organic-1.svg",
		title: "Осуохай - хоровод",
		desc: "Круговой танец и песня одновременно. Участники двигаются по часовой стрелке за солнцем, взявшись за руки. Ведущий импровизирует текст, остальные повторяют. Поэтическая импровизация - один из древнейших жанров фольклора Саха.",
		tag: "Единение",
		sakha: "Оhуохай (Ohuokhai)",
		bg: "bg-[#CEFDDE]",
		accent: "text-[#03402C]",
	},
	{
		icon: "/assets/form-geometric-6.svg",
		title: "Игры Дыгына",
		desc: "Народные состязания - хапсагай (якутская борьба), мас-рестлинг (перетягивание палки), прыжки. Игры выявляют силу и ловкость, а победители получают уважение всей общины.",
		tag: "Сила и честь",
		sakha: "Дыгын (Dyghyn)",
		bg: "bg-[#D0D0FB]",
		accent: "text-[#4242F0]",
	},
];

export default function PhilosophySection() {
	return (
		<section
			id="philosophy-section"
			className="py-24 px-6 bg-[#FFF3EB] border-b border-[#D0D0FB]/50"
		>
			<div className="max-w-5xl mx-auto">
				<div className="text-center flex flex-col items-center gap-3 mb-16">
					<span className="inline-block font-body text-xs uppercase tracking-widest text-[#FC440F] bg-[#FFE0CC] px-3.5 py-1.5 rounded-full font-bold">
						Обряды и смыслы
					</span>
					<h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26]">
						Традиции Ысыаха
					</h3>
					<p className="text-[#0B0B26]/60 max-w-md text-sm sm:text-base font-body">
						Каждый обряд праздника несёт в себе силу возрождения, тепла и
						священного солнца
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{cards.map((card, i) => (
						<motion.div
							key={card.title}
							initial={{ y: 30, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, margin: "-10%" }}
							transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
							className="bg-white px-5 py-8 rounded-3xl border border-[#D0D0FB]/50 shadow-sm flex flex-col justify-between"
						>
							<div>
								<div
									className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-8`}
								>
									<img
										src={card.icon}
										alt=""
										className="w-9 h-9 brand-form brightness-0 invert"
									/>
								</div>
								<h4 className="font-display text-2xl font-bold text-[#0B0B26] mb-3">
									{card.title}
								</h4>
								<p className="text-sm text-[#0B0B26]/60 leading-relaxed font-body">
									{card.desc}
								</p>
							</div>
							<div className="pt-6 border-t border-[#D0D0FB]/30 mt-6 flex justify-between items-center text-[11px] font-body text-[#0B0B26]/40">
								<span>{card.tag}</span>
								<span className={card.accent}>{card.sakha}</span>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
