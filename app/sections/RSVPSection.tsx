"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfIAXxWv9unPufBCx51Ckylhk5gfmfcIpwePyqSgYpFl20zIJ8-kfrKC5vscpcpNHb/exec";

interface Counts {
	guests: number;
	dance: number;
	sport: number;
}

async function fetchCounts(): Promise<Counts> {
	try {
		const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=counts`);
		const data = await res.json();
		return {
			guests: data.guests ?? 0,
			dance: data.dance ?? 0,
			sport: data.sport ?? 0,
		};
	} catch {
		return { guests: 0, dance: 0, sport: 0 };
	}
}

export default function RSVPSection() {
	const [formName, setFormName] = useState("");
	const [formGuests, setFormGuests] = useState(1);
	const [formContact, setFormContact] = useState("");
	const [playSports, setPlaySports] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [counts, setCounts] = useState<Counts | null>(null);

	useEffect(() => {
		fetchCounts().then(setCounts);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formName.trim() || !formContact.trim()) return;

		setIsSubmitting(true);
		setSubmitError("");

		try {
			await fetch(GOOGLE_SCRIPT_URL, {
				method: "POST",
				mode: "no-cors",
				headers: { "Content-Type": "text/plain" },
				body: JSON.stringify({
					name: formName.trim(),
					guestsCount: formGuests,
					contact: formContact.trim(),
					willPlaySports: playSports,
				}),
			});

			setIsSubmitSuccess(true);
			setTimeout(async () => {
				const updated = await fetchCounts();
				setCounts(updated);
				setFormName("");
				setFormGuests(1);
				setFormContact("");
				setPlaySports(false);
				setIsSubmitSuccess(false);
			}, 3000);
		} catch {
			setSubmitError("Ошибка отправки. Попробуйте ещё раз.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section
			id="form-section"
			className="py-24 px-6 bg-white border-b border-[#D0D0FB]/50"
		>
			<div className="max-w-3xl mx-auto space-y-12">
				<div className="text-center flex flex-col items-center gap-3">
					<span className="inline-block font-body text-xs uppercase tracking-widest text-[#03402C] bg-[#CEFDDE] px-3.5 py-1.5 rounded-full font-bold">
						RSVP
					</span>
					<h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26] tracking-tight">
						Будете ли вы с нами?
					</h3>
				</div>

				{/* Counters */}
				{counts && (
					<div className="bg-[#FFF3EB] border border-[#D0D0FB]/50 rounded-[2.5rem] p-6 text-center shadow-inner flex flex-col sm:flex-row items-center justify-around gap-4">
						<div className="flex flex-col">
							<span className="font-display text-4xl font-extrabold text-[#03402C]">
								{counts.guests}
							</span>
							<span className="font-body text-[10px] text-[#0B0B26]/50 uppercase tracking-widest mt-1">
								гостей
							</span>
						</div>
						<div className="hidden sm:block w-px h-12 bg-[#D0D0FB]" />
						<div className="flex flex-col">
							<span className="font-display text-4xl font-extrabold text-[#4242F0]">
								{counts.sport}
							</span>
							<span className="font-body text-[10px] text-[#0B0B26]/50 uppercase tracking-widest mt-1">
								игры Дыгына
							</span>
						</div>
					</div>
				)}

				{/* Form */}
				<div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-[#D0D0FB]/50 shadow-lg relative">
					{isSubmitSuccess ? (
						<motion.div
							className="flex flex-col items-center justify-center p-8 text-center gap-4"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
						>
							<div className="w-16 h-16 bg-[#CEFDDE] rounded-full flex items-center justify-center text-[#03402C] text-3xl">
								✓
							</div>
							<h4 className="font-display text-2xl font-black text-[#0B0B26]">
								Вы записаны!
							</h4>
							<p className="text-sm text-[#0B0B26]/50 max-w-xs leading-relaxed font-body">
								Спасибо за подтверждение! До встречи на Ысыахе.
							</p>
						</motion.div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label
										htmlFor="form-name"
										className="block text-xs font-body font-bold tracking-wider text-[#0B0B26]/60 uppercase"
									>
										Имя и фамилия *
									</label>
									<input
										id="form-name"
										type="text"
										required
										value={formName}
										onChange={(e) => setFormName(e.target.value)}
										placeholder="Ваше имя"
										className="w-full px-5 py-3.5 rounded-2xl bg-[#FFF3EB] border border-[#D0D0FB]/50 focus:bg-white focus:border-[#03402C] focus:ring-1 focus:ring-[#03402C] outline-none text-sm transition font-body"
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="form-guests"
										className="block text-xs font-body font-bold tracking-wider text-[#0B0B26]/60 uppercase"
									>
										Количество гостей *
									</label>
									<div className="relative flex items-center bg-[#FFF3EB] border border-[#D0D0FB]/50 rounded-2xl">
										<button
											type="button"
											onClick={() =>
												setFormGuests(Math.max(1, formGuests - 1))
											}
											className="px-4 py-3.5 hover:bg-[#D0D0FB]/20 text-[#0B0B26]/50 transition text-lg font-bold rounded-l-2xl"
										>
											-
										</button>
										<input
											id="form-guests"
											type="number"
											required
											min={1}
											max={10}
											value={formGuests}
											onChange={(e) =>
												setFormGuests(parseInt(e.target.value) || 1)
											}
											className="w-full py-3.5 bg-transparent outline-none text-center text-sm font-bold font-body"
										/>
										<button
											type="button"
											onClick={() =>
												setFormGuests(Math.min(10, formGuests + 1))
											}
											className="px-4 py-3.5 hover:bg-[#D0D0FB]/20 text-[#0B0B26]/50 transition text-lg font-bold rounded-r-2xl"
										>
											+
										</button>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label
										htmlFor="form-contact"
										className="block text-xs font-body font-bold tracking-wider text-[#0B0B26]/60 uppercase"
									>
										Telegram или телефон *
									</label>
									<input
										id="form-contact"
										type="text"
										required
										value={formContact}
										onChange={(e) => setFormContact(e.target.value)}
										placeholder="@yhyaq_friend"
										className="w-full px-5 py-3.5 rounded-2xl bg-[#FFF3EB] border border-[#D0D0FB]/50 focus:bg-white focus:border-[#03402C] focus:ring-1 focus:ring-[#03402C] outline-none text-sm transition font-body"
									/>
								</div>
							</div>

							<div className="p-4 bg-[#FFF3EB] rounded-2xl space-y-4 border border-[#D0D0FB]/30">
								<div className="flex items-center gap-3">
									<input
										id="form-sports"
										type="checkbox"
										checked={playSports}
										onChange={(e) => setPlaySports(e.target.checked)}
										className="w-4.5 h-4.5 rounded border-[#D0D0FB] text-[#03402C] focus:ring-[#03402C] accent-[#03402C]"
									/>
									<label
										htmlFor="form-sports"
										className="text-xs sm:text-sm text-[#0B0B26]/70 select-none cursor-pointer leading-none font-body"
									>
										Хочу участвовать в играх Дыгына!
									</label>
								</div>
							</div>

							{submitError && (
								<p className="text-xs text-[#FC440F] font-body text-center">
									{submitError}
								</p>
							)}

							<button
								id="form-submit-btn"
								type="submit"
								disabled={isSubmitting}
								className="w-full py-4 bg-[#03402C] hover:bg-[#045c3f] text-white font-display uppercase tracking-widest text-sm font-bold rounded-2xl shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
							>
								{isSubmitting && (
									<Loader2 className="w-4 h-4 animate-spin" />
								)}
								{isSubmitting ? "Отправка..." : "Подтвердить участие"}
							</button>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
