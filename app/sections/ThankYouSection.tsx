export default function ThankYouSection() {
	return (
		<section className="bg-[#F9FFCC] py-20 sm:py-28 px-6 border-b border-[#03402C]/10">
			<div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
				<div className="flex flex-col items-center gap-6">
					<img
						src="/assets/vector-top.svg"
						alt=""
						className="w-12 h-14 animate-sun-spin brand-form"
						style={{ animationDuration: "120s" }}
					/>

					<h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#03402C] uppercase leading-[0.85] tracking-tight">
						Спасибо,
						<br />
						что ты с нами!
					</h3>

					<img
						src="/assets/vector-mid.svg"
						alt=""
						className="w-12 h-14 animate-sun-spin brand-form"
						style={{ animationDuration: "90s" }}
					/>

					<p className="font-display text-xl sm:text-3xl font-black text-[#03402C] uppercase leading-[0.85]">
						Maqtal, taptal, erel!
					</p>

					<img
						src="/assets/vector-bottom.svg"
						alt=""
						className="w-12 h-14 animate-sun-spin brand-form"
						style={{ animationDuration: "150s" }}
					/>
				</div>

				<p className="font-body text-xs sm:text-sm uppercase tracking-widest text-[#03402C]/50">
					Саха буолан сандаарыахха, киһи буолан килбэйиэххэ!
				</p>
			</div>
		</section>
	);
}
