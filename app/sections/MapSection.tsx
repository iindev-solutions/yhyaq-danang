"use client";

import { useState, useEffect } from "react";
import { Info, CheckCircle2, MapPin } from "lucide-react";

const tips = [
	{
		title: "Вход",
		text: "~100 000 VND. Место проведения - Camping Dừa Xanh.",
	},
	{
		title: "Что взять с собой",
		text: "Еду по возможности, солнцезащитные очки, коврик для хоровода, головной убор.",
	},
	{
		title: "Для детей",
		text: "Тенистый детский уголок с играми и питьевой водой.",
	},
	{
		title: "Игры Дыгына",
		text: "Записаться можно на месте или через форму ниже.",
	},
];

const EVENT_DATE = "2026-06-20";

const WMO_CODES: Record<number, { label: string; icon: string }> = {
	0: { label: "Ясно", icon: "☀️" },
	1: { label: "Преимущественно ясно", icon: "🌤️" },
	2: { label: "Переменная облачность", icon: "⛅" },
	3: { label: "Пасмурно", icon: "☁️" },
	45: { label: "Туман", icon: "🌫️" },
	48: { label: "Изморозь", icon: "🌫️" },
	51: { label: "Лёгкая морось", icon: "🌦️" },
	53: { label: "Морось", icon: "🌦️" },
	55: { label: "Сильная морось", icon: "🌧️" },
	61: { label: "Небольшой дождь", icon: "🌦️" },
	63: { label: "Дождь", icon: "🌧️" },
	65: { label: "Сильный дождь", icon: "🌧️" },
	71: { label: "Небольшой снег", icon: "🌨️" },
	73: { label: "Снег", icon: "❄️" },
	75: { label: "Сильный снег", icon: "❄️" },
	80: { label: "Ливень", icon: "🌦️" },
	81: { label: "Ливень", icon: "🌧️" },
	82: { label: "Сильный ливень", icon: "⛈️" },
	95: { label: "Гроза", icon: "⛈️" },
	96: { label: "Гроза с градом", icon: "⛈️" },
	99: { label: "Сильная гроза с градом", icon: "⛈️" },
};

interface WeatherData {
	tempMax: number;
	tempMin: number;
	weatherCode: number;
	precipProb: number;
	label: string;
	icon: string;
	isFallback: boolean;
}

async function fetchWeather(): Promise<WeatherData> {
	try {
		const res = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=16.13&longitude=108.05&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&timezone=Asia/Ho_Chi_Minh&start_date=${EVENT_DATE}&end_date=${EVENT_DATE}`
		);
		const data = await res.json();
		const idx = data.daily.time.indexOf(EVENT_DATE);
		if (idx === -1) return fallbackWeather();
		const code = data.daily.weathercode[idx];
		const wmo = WMO_CODES[code] || { label: "Переменная облачность", icon: "⛅" };
		return {
			tempMax: Math.round(data.daily.temperature_2m_max[idx]),
			tempMin: Math.round(data.daily.temperature_2m_min[idx]),
			weatherCode: code,
			precipProb: data.daily.precipitation_probability_max[idx],
			label: wmo.label,
			icon: wmo.icon,
			isFallback: false,
		};
	} catch {
		return fallbackWeather();
	}
}

function fallbackWeather(): WeatherData {
	return {
		tempMax: 33,
		tempMin: 26,
		weatherCode: 95,
		precipProb: 55,
		label: "Гроза",
		icon: "⛈️",
		isFallback: true,
	};
}

export default function MapSection() {
	const [weather, setWeather] = useState<WeatherData | null>(null);

	useEffect(() => {
		fetchWeather().then(setWeather);
	}, []);

	return (
		<section
			id="map-section"
			className="py-24 px-6 paper-texture border-b border-[#D0D0FB]/50"
		>
			<div className="max-w-5xl mx-auto space-y-12">
				<div className="text-center flex flex-col items-center gap-3">
					<span className="inline-block font-body text-xs uppercase tracking-widest text-[#FC440F] bg-[#FFE0CC] px-3.5 py-1.5 rounded-full font-bold">
						Место события
					</span>
					<h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26] tracking-tight">
						Где пройдёт Ысыах
					</h3>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Map */}
					<div className="lg:col-span-2 rounded-[2.5rem] overflow-hidden border border-[#D0D0FB]/50 shadow-md aspect-[4/3]">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5!2d108.0501371!3d16.1301483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314221eea7d19f89%3A0x947a9a670772cc40!2sCamping%20D%E1%BB%ABa%20Xanh!5e0!3m2!1sen!2s!4v1"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Место проведения Ысыах"
							className="w-full h-full"
						/>
					</div>

					{/* Info */}
					<div className="space-y-6">
						{/* Weather */}
						{weather && (
							<div className="bg-[#03402C] p-6 rounded-[2rem] text-[#CEFDDE] flex items-center gap-4">
								<div className="w-14 h-14 bg-[#0BDA51]/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
									{weather.icon}
								</div>
								<div>
									<span className="font-body text-[9px] tracking-widest font-bold uppercase text-[#CEFDDE]/60">
										20 июня {weather.isFallback && "(климат)*"}
									</span>
									<h5 className="font-display text-xl font-black text-white mt-1">
										{weather.tempMax}°C / {weather.tempMin}°C
									</h5>
									<p className="text-xs text-[#CEFDDE]/70 mt-1 font-body">
										{weather.label}, дождь {weather.precipProb}%
									</p>
								</div>
							</div>
						)}

						{/* Address */}
						<div className="bg-[#CEFDDE]/50 p-6 rounded-[2rem] border border-[#03402C]/10 flex items-center gap-4">
							<MapPin className="w-8 h-8 text-[#03402C] flex-shrink-0" />
							<div>
								<span className="font-body text-[9px] tracking-widest font-bold uppercase text-[#03402C]/60">
									Адрес
								</span>
								<p className="text-sm font-body text-[#03402C] mt-1">
									Camping Dừa Xanh, Дананг
								</p>
							</div>
						</div>

						{/* Tips */}
						<div className="bg-white p-6 rounded-[2rem] border border-[#D0D0FB]/50 shadow-sm space-y-4">
							<h4 className="font-display text-lg font-black text-[#0B0B26] flex items-center gap-2">
								<Info className="w-5 h-5 text-[#FC440F]" />
								Памятка участника
							</h4>
							<ul className="space-y-3 text-xs leading-normal text-[#0B0B26]/60 font-body">
								{tips.map((tip) => (
									<li key={tip.title} className="flex gap-2 items-start">
										<CheckCircle2 className="w-4 h-4 text-[#0BDA51] flex-shrink-0 mt-0.5" />
										<span>
											<strong className="text-[#0B0B26] font-semibold">
												{tip.title}:
											</strong>{" "}
											{tip.text}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
