"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface SolarGatewayProps {
	onEnter: () => void;
}

export default function SolarGateway({ onEnter }: SolarGatewayProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const wordmarkRef = useRef<HTMLImageElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		if (!formRef.current) return;

		gsap.fromTo(
			formRef.current,
			{ opacity: 0, scale: 0.8 },
			{ opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
		);

		if (wordmarkRef.current) {
			gsap.fromTo(
				wordmarkRef.current,
				{ opacity: 0, y: -20 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 },
			);
		}

		if (textRef.current) {
			gsap.fromTo(
				textRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 },
			);
		}

		if (btnRef.current) {
			gsap.fromTo(
				btnRef.current,
				{ opacity: 0, y: 10 },
				{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.0 },
			);
		}
	}, []);

	const handleEnter = () => {
		if (clicked) return;
		setClicked(true);

		const tl = gsap.timeline({
			onComplete: () => {
				onEnter();
			},
		});

		tl.to([btnRef.current, textRef.current], {
			opacity: 0,
			y: -20,
			duration: 0.4,
			ease: "power2.in",
		});

		tl.to(
			formRef.current,
			{
				scale: 8,
				opacity: 0,
				duration: 1.2,
				ease: "power2.in",
			},
			"-=0.2",
		);

		tl.to(
			wordmarkRef.current,
			{
				y: -40,
				opacity: 0,
				duration: 0.6,
				ease: "power2.in",
			},
			"-=0.8",
		);

		tl.to(
			containerRef.current,
			{ opacity: 0, duration: 0.5, ease: "power2.out" },
			"-=0.3",
		);
	};

	return (
		<div
			ref={containerRef}
			id="solar-gateway"
			className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF3EB] p-6 overflow-hidden"
		>
			{/* Wordmark */}
			<img
				ref={wordmarkRef}
				src="/assets/yhq-wordmark.svg"
				alt="YHYAQ"
				className="w-40 sm:w-52 mb-8 opacity-0"
			/>

			{/* Geometric form */}
			<div ref={formRef} className="opacity-0 will-change-transform">
				<img
					src="/assets/form-geometric-4.svg"
					alt=""
					className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 animate-sun-spin"
					style={{ animationDuration: "120s" }}
				/>
			</div>

			{/* Yakut proverb */}
			<p
				ref={textRef}
				className="mt-8 text-center text-[#4242F0] text-sm sm:text-base font-body tracking-wide max-w-md opacity-0"
			>
				Эйэҕэс киһи суола ордук, киһи киһитэ буол
			</p>

			{/* Enter button */}
			<button
				ref={btnRef}
				onClick={handleEnter}
				disabled={clicked}
				className="mt-8 px-8 py-3.5 bg-[#4242F0] hover:bg-[#3535d0] text-white rounded-full font-display font-semibold uppercase tracking-wider text-sm shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed opacity-0"
			>
				Войти с музыкой
			</button>
		</div>
	);
}
