"use client";

import { motion } from "motion/react";

const SPONSORS = [
	{
		name: "ykt.ru",
		logo: "/sponsors/ykt_sponsor.jpg",
		url: "https://ykt.ru",
		description: "Цифровая экосистема сервисов для жителей и гостей Якутии. Большой вклад в развитие фестиваля",
		ceo: { name: "Владислав Петров", url: "https://www.instagram.com/vladislav.ykt/" },
	},
	{
		name: "Столовка",
		logo: "/sponsors/stolovka.jpg",
		url: "https://t.me/stolovka_vn",
		description: "Мы готовим блюда, которые напомнят Вам о домашнем уюте. Вкусно как дома",
		telegram: { handle: "stolovka_vn", url: "https://t.me/stolovka_vn" },
	},
	{
		name: "movemi",
		logo: "/sponsors/movemi.jpg",
		url: "https://t.me/childreninSportDanang",
		description: "Занятия для детей от 4 до 15 лет",
		instagram: { handle: "@movemi_danang", url: "https://www.instagram.com/movemi_danang/" },
	},
	{
		name: "Happy Steps",
		logo: "/sponsors/happy-steps.png",
		url: "https://www.instagram.com/children_danang",
		description: "Танцы для детей в Дананге от 2,5 до 10 лет. Ритмопластика, хореография, растяжка, ОФП",
		instagram: { handle: "@children_danang", url: "https://www.instagram.com/children_danang" },
	},
];

export default function SponsorsSection() {
	return (
		<section
			id="sponsors-section"
			className="relative py-24 px-6 bg-gradient-to-b from-[#03402C] to-[#0B0B26] text-[#CEFDDE] overflow-hidden"
		>
			<div
				className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
				style={{ backgroundImage: "url('/bg-hero.webp')" }}
			/>
			<div className="max-w-5xl mx-auto space-y-12">
				<div className="text-center flex flex-col items-center gap-3">
					<span className="inline-block font-body text-xs uppercase tracking-widest text-[#CEFDDE] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full font-bold">
						Партнёры
					</span>
					<h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
						Спонсоры фестиваля
					</h3>
					<p className="text-[#CEFDDE]/70 text-xs sm:text-sm max-w-md mx-auto font-body">
						Спасибо за поддержку
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-6">
					{SPONSORS.map((sponsor) => (
						<motion.a
							key={sponsor.name}
							href={sponsor.url}
							target="_blank"
							rel="noopener noreferrer"
							className={`group bg-white/5 border rounded-2xl flex flex-col items-center justify-center gap-4 p-6 w-full sm:w-[calc(33.333%-16px)] transition-all duration-300 cursor-pointer ${
								sponsor.ceo
									? "border-[#E3FF00]/30 hover:border-[#E3FF00]/60 hover:bg-white/10"
									: "border-white/10 hover:border-[#0BDA51]/30 hover:bg-white/10"
							}`}
							whileHover={{ scale: 1.03 }}
						>
							<div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center overflow-hidden rounded-full">
								<img
									src={sponsor.logo}
									alt={sponsor.name}
									className="max-h-full max-w-full object-contain"
									loading="lazy"
								/>
							</div>
							<div className="text-center space-y-2">
								<h4 className="font-display text-lg sm:text-xl font-black text-white tracking-tight">
									{sponsor.name}
								</h4>
								<p className="text-[11px] sm:text-xs text-[#CEFDDE]/60 font-body leading-relaxed">
									{sponsor.description}
								</p>
								{sponsor.ceo && (
									<p className="text-[11px] sm:text-xs font-body">
										<span className="text-[#CEFDDE]/50">CEO - </span>
										<span
											onClick={(e) => { e.stopPropagation(); window.open(sponsor.ceo!.url, '_blank', 'noopener'); }}
											className="text-[#E3FF00] underline underline-offset-2 hover:text-[#E3FF00]/80 transition-colors cursor-pointer"
										>
											{sponsor.ceo.name}
										</span>
									</p>
								)}
								{sponsor.instagram && (
									<p className="text-[11px] sm:text-xs font-body">
										<span className="text-[#CEFDDE]/50">Instagram - </span>
										<span
											onClick={(e) => { e.stopPropagation(); window.open(sponsor.instagram!.url, '_blank', 'noopener'); }}
											className="text-[#E3FF00] underline underline-offset-2 hover:text-[#E3FF00]/80 transition-colors cursor-pointer"
										>
											{sponsor.instagram.handle}
										</span>
									</p>
								)}
								{sponsor.telegram && (
									<p className="text-[11px] sm:text-xs font-body">
										<span className="text-[#CEFDDE]/50">Telegram - </span>
										<span
											onClick={(e) => { e.stopPropagation(); window.open(sponsor.telegram!.url, '_blank', 'noopener'); }}
											className="text-[#E3FF00] underline underline-offset-2 hover:text-[#E3FF00]/80 transition-colors cursor-pointer"
										>
											{sponsor.telegram.handle}
										</span>
									</p>
								)}
							</div>
						</motion.a>
					))}
				</div>

				<div className="text-center pt-4">
					<p className="text-sm text-[#CEFDDE]/60 font-body">
						Стать спонсором:{" "}
						<strong className="text-[#E3FF00]">
							@aralyoka
						</strong>
					</p>
				</div>
			</div>
		</section>
	);
}
