export default function FooterSection() {
	return (
		<footer className="bg-[#0B0B26] text-[#CEFDDE]/50 py-12 px-6 border-t border-white/5">
			<div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
				<div className="flex flex-wrap justify-center gap-6 text-xs font-body">
					<a href="#hero-section" className="hover:text-white transition">
						Главная
					</a>
					<span className="text-[#D0D0FB]/30">•</span>
					<a href="#philosophy-section" className="hover:text-white transition">
						Традиции
					</a>
					<span className="text-[#D0D0FB]/30">•</span>
					<a href="#program-section" className="hover:text-white transition">
						Программа
					</a>
					<span className="text-[#D0D0FB]/30">•</span>
					<a href="#media-section" className="hover:text-white transition">
						Архив 2025
					</a>
					<span className="text-[#D0D0FB]/30">•</span>
					<a href="#map-section" className="hover:text-white transition">
						Карта
					</a>
				</div>

				<p className="text-[10px] text-[#CEFDDE]/30 uppercase tracking-widest text-center">
					КЮН АЙЫЫ ТАҤАРА БАРЫБЫТЫН ХАРЫСТААТЫН!
				</p>

				<div className="text-[11px] font-body flex flex-col items-center gap-1">
					<span>© YHYAQ Danang, 2026</span>
					<span>
						Сделано с{" "}
						<span className="text-[#FC440F]">&#9829;</span>{" "}
						<a
							href="https://iindev.xyz"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline transition"
						>
							<span className="text-[#E3FF00]">iind</span><span className="text-[#0BDA51]">ev</span>
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
