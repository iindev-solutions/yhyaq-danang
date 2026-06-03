"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";

const SPONSOR_COUNT = 6;

export default function SponsorsSection() {
	return (
		<section
			id="sponsors-section"
			className="py-24 px-6 bg-gradient-to-b from-[#03402C] to-[#0B0B26] text-[#CEFDDE]"
		>
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

				<div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
					{Array.from({ length: SPONSOR_COUNT }).map((_, i) => (
						<motion.div
							key={i}
							className="bg-white/5 border border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-[#0BDA51]/30 transition-all duration-300 cursor-pointer"
							whileHover={{ scale: 1.05 }}
						>
							<div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
								<Plus className="w-5 h-5 text-[#0BDA51]" />
							</div>
							<span className="text-[10px] text-white/40 font-body font-bold text-center px-3 leading-tight">
								Тут могла бы быть ваша компания
							</span>
						</motion.div>
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
