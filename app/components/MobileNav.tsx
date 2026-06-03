"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
	{ href: "#hero-section", label: "Главная" },
	{ href: "#philosophy-section", label: "Традиции" },
	{ href: "#program-section", label: "Программа" },
	{ href: "#media-section", label: "Архив 2025" },
	{ href: "#sponsors-section", label: "Спонсоры" },
	{ href: "#map-section", label: "Карта" },
	{ href: "#form-section", label: "RSVP" },
];

export default function MobileNav() {
	const [open, setOpen] = useState(false);

	const handleNav = () => {
		setOpen(false);
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="fixed top-4 left-4 z-[1000] w-10 h-10 bg-[#03402C]/90 backdrop-blur rounded-xl flex items-center justify-center shadow-lg sm:hidden"
				aria-label="Открыть меню"
			>
				<Menu className="w-5 h-5 text-[#CEFDDE]" />
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						className="fixed inset-0 z-[1001] bg-[#0B0B26]/95 backdrop-blur-md flex flex-col items-center justify-center gap-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<button
							onClick={() => setOpen(false)}
							className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"
							aria-label="Закрыть меню"
						>
							<X className="w-5 h-5 text-white" />
						</button>

						<nav className="flex flex-col items-center gap-4">
							{NAV_ITEMS.map((item) => (
								<a
									key={item.href}
									href={item.href}
									onClick={handleNav}
									className="font-display text-xl font-black text-white/80 hover:text-[#0BDA51] transition-colors"
								>
									{item.label}
								</a>
							))}
						</nav>

						<a
							href="https://t.me/aralyoka"
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setOpen(false)}
							className="mt-4 px-6 py-2 bg-[#03402C] text-[#CEFDDE] rounded-full text-sm font-body font-bold"
						>
							@aralyoka
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
