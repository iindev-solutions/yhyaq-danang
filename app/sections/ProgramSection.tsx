"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Handshake,
	Flame,
	Dumbbell,
	Brain,
	UtensilsCrossed,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const programBlocks = [
	{
		time: "13:00–13:50",
		label: "Сбор",
		title: "Встреча гостей",
		desc: "Две девушки в национальных костюмах встречают гостей с алаадьы, салама и быырпах. Знакомство, общение и погружение в атмосферу.",
		items: ["Встреча гостей", "Алаадьы, бырпах, салама"],
		icon: Handshake,
		tag: "Сбор",
		tagColor: "bg-[#CEFDDE] text-[#03402C]",
		accent: "#03402C",
		cardBg: "bg-[#03402C]",
		cardText: "text-white",
		cardSub: "text-white/60",
		cardItem: "text-white/80",
	},
	{
		time: "14:00–14:40",
		label: "Открытие",
		title: "Торжественное открытие Ысыаха",
		desc: "Праздничная церемония открытия с обрядом Алгыс, танцами, хомусом и массовым флэшмобом.",
		items: [
			"14:00–14:05 Приветствие",
			"14:05–14:15 Алгыс — благословение",
			"14:15–14:20 Танец",
			"14:20–14:25 Хомус",
			"14:25–14:30 Флэшмоб",
			"14:30–14:35 Оьуохай (Осуохай)",
		],
		icon: Flame,
		tag: "Главное событие",
		tagColor: "bg-[#FFE0CC] text-[#FC440F]",
		accent: "#FC440F",
		cardBg: "bg-[#FFF3EB]",
		cardText: "text-[#0B0B26]",
		cardSub: "text-[#0B0B26]/50",
		cardItem: "text-[#0B0B26]/70",
	},
	{
		time: "14:40–16:00",
		label: "Обед",
		title: "Обед и знакомство",
		desc: "Традиционные якутские блюда, караоке, конкурс лучшего костюма и мастер-класс по пайрам.",
		items: [
			"14:40–16:00 Обед и знакомство",
			"15:00–15:10 Уьун суьуох",
			"15:10–15:20 Лучший костюм",
			"15:10–16:00 Караоке",
			"15:00–16:00 Мастер-класс Пайры",
		],
		icon: UtensilsCrossed,
		tag: "Гастрономия",
		tagColor: "bg-[#FFE0CC] text-[#FC440F]",
		accent: "#FC440F",
		cardBg: "bg-[#CEFDDE]",
		cardText: "text-[#03402C]",
		cardSub: "text-[#03402C]/50",
		cardItem: "text-[#03402C]/70",
	},
	{
		time: "16:10–18:30",
		label: "Игры",
		title: "Игры Дыгына",
		desc: "Традиционные якутские состязания: хапсагай, мас-рестлинг и хамыска. Дух соревнования и веселья!",
		items: [
			"16:10–16:50 Хапсагай",
			"17:00–17:30 Мас тардыьыы (мас-рестлинг)",
			"17:40–18:30 Хамыска",
		],
		icon: Dumbbell,
		tag: "Соревнования",
		tagColor: "bg-[#D0D0FB]/50 text-[#4242F0]",
		accent: "#4242F0",
		cardBg: "bg-[#D0D0FB]/30",
		cardText: "text-[#0B0B26]",
		cardSub: "text-[#0B0B26]/50",
		cardItem: "text-[#0B0B26]/70",
	},
	{
		time: "19:00–20:00",
		label: "Квиз",
		title: "Квиз",
		desc: "Викторина по якутской культуре, истории и традициям. Призы победителям!",
		items: [],
		icon: Brain,
		tag: "Интеллект",
		tagColor: "bg-[#E3FF00]/40 text-[#0B0B26]",
		accent: "#0B0B26",
		cardBg: "bg-[#E3FF00]/20",
		cardText: "text-[#0B0B26]",
		cardSub: "text-[#0B0B26]/50",
		cardItem: "text-[#0B0B26]/70",
	},
];

export default function ProgramSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const ctx = gsap.context(() => {
			// Animate each card from right + fade
			cardsRef.current.forEach((card, i) => {
				if (!card) return;
				gsap.fromTo(
					card,
					{ x: 80, opacity: 0, scale: 0.95 },
					{
						x: 0,
						opacity: 1,
						scale: 1,
						duration: 0.8,
						ease: "power2.out",
						scrollTrigger: {
							trigger: card,
							start: "top 85%",
							toggleActions: "play none none none",
						},
					},
				);
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="program-section"
			className="py-24 px-6 bg-white border-b border-[#D0D0FB]/50 relative"
		>
			<div className="max-w-4xl mx-auto">
				<div className="text-center flex flex-col items-center gap-3 mb-16">
					<span className="inline-block font-body text-xs uppercase tracking-widest text-[#03402C] bg-[#CEFDDE] px-3.5 py-1.5 rounded-full font-bold">
						Программа События
					</span>
					<h3 className="font-display text-4xl font-black text-[#0B0B26] tracking-tight">
						Программа Ысыаха
					</h3>
					<p className="text-[#0B0B26]/50 text-sm max-w-md mx-auto font-body">
						Полный таймлайн активностей для незабываемого праздничного дня
					</p>
				</div>

				{/* Cards */}
				<div className="grid gap-4">
					{programBlocks.map((block, i) => {
						const Icon = block.icon;
						return (
							<div
								key={block.title}
								ref={(el) => {
									if (el) cardsRef.current[i] = el;
								}}
								className={`${block.cardBg} rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
							>
								<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
									{/* Left: time + icon */}
									<div className="flex sm:flex-col items-center sm:items-start gap-3 sm:w-36 flex-shrink-0">
										<span className={`text-2xl sm:text-3xl font-black ${block.cardText} font-display tracking-tight`}>
											{block.time}
										</span>
										<div
											className="w-10 h-10 rounded-xl flex items-center justify-center"
											style={{ backgroundColor: `${block.accent}20` }}
										>
											<Icon className="w-5 h-5" style={{ color: block.accent }} />
										</div>
									</div>

									{/* Right: content */}
									<div className="space-y-3 flex-grow">
										<div className="flex flex-wrap items-center gap-2">
											<h4 className={`font-display text-xl sm:text-2xl font-black ${block.cardText}`}>
												{block.title}
											</h4>
											<span
												className={`px-2.5 py-0.5 text-[10px] font-body font-bold rounded-full uppercase tracking-wide ${block.tagColor}`}
											>
												{block.tag}
											</span>
										</div>
										<p className={`text-sm leading-relaxed font-body ${block.cardSub}`}>
											{block.desc}
										</p>

										{block.items.length > 0 && (
											<div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
												{block.items.map((item, idx) => (
													<div
														key={idx}
														className={`flex items-center gap-2 text-xs font-body ${block.cardItem}`}
													>
														<span
															className="w-1.5 h-1.5 rounded-full flex-shrink-0"
															style={{ backgroundColor: block.accent }}
														/>
														{item}
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Entrance fee */}
				<div className="mt-8 text-center">
					<span className="inline-block px-4 py-1.5 bg-[#03402C]/10 text-[#03402C] rounded-full text-xs font-body font-bold tracking-wide">
						Вход ~100 000 VND
					</span>
				</div>
			</div>
		</section>
	);
}
