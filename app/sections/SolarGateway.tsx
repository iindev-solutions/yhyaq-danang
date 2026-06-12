"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface SolarGatewayProps {
	onEnter: () => void;
}

export default function SolarGateway({ onEnter }: SolarGatewayProps) {
	const [phase, setPhase] = useState<"intro" | "exiting" | "done">("intro");

	const handleEnter = () => {
		if (phase !== "intro") return;
		setPhase("exiting");
	};

	return (
		<>
			{phase !== "done" && (
				<motion.div
					id="solar-gateway"
					className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF3EB] overflow-hidden"
					animate={phase === "exiting" ? { opacity: 0 } : { opacity: 1 }}
					transition={{
						duration: phase === "exiting" ? 0.8 : 0,
						ease: "easeIn",
					}}
					onAnimationComplete={() => {
						if (phase === "exiting") {
							setPhase("done");
							onEnter();
						}
					}}
				>
					{/* Photo - fades out first */}
					<motion.img
						src="/loader.webp"
						alt=""
						className="absolute inset-0 w-full h-full object-cover sm:object-contain pointer-events-none"
						initial={{ opacity: 1 }}
						animate={{ opacity: 0 }}
						transition={{ duration: 1.0, ease: "easeOut", delay: 1.2 }}
					/>

					{/* Urasa SVG - fades in after photo starts fading */}
					<motion.div
						className="flex items-center justify-center -translate-y-[10%]"
						initial={{ opacity: 0 }}
						animate={
							phase === "exiting" ? { opacity: 0, scale: 8 } : { opacity: 1 }
						}
						transition={{
							opacity: {
								duration: phase === "exiting" ? 0.6 : 1.5,
								ease: "easeOut",
								delay: phase === "intro" ? 1.5 : 0,
							},
							scale: { duration: 1.2, ease: "easeIn" },
						}}
					>
						<img
							src="/assets/urasa.svg"
							alt=""
							className="w-[280px] sm:w-[360px] md:w-[420px] h-auto"
						/>
					</motion.div>

					{/* Wordmark - after urasa */}
					<motion.img
						src="/assets/yhq-wordmark.svg"
						alt="YHYAQ"
						className="w-40 sm:w-52 mt-8"
						initial={{ opacity: 0, y: -20 }}
						animate={
							phase === "exiting"
								? { opacity: 0, y: -40 }
								: { opacity: 1, y: 0 }
						}
						transition={{
							duration: phase === "exiting" ? 0.6 : 0.8,
							ease: phase === "exiting" ? "easeIn" : "easeOut",
							delay: phase === "intro" ? 3.0 : 0,
						}}
					/>

					{/* Yakut proverb */}
					<motion.p
						className="mt-8 text-center text-[#4242F0] text-sm sm:text-base font-body tracking-wide max-w-md"
						initial={{ opacity: 0, y: 20 }}
						animate={
							phase === "exiting"
								? { opacity: 0, y: -20 }
								: { opacity: 1, y: 0 }
						}
						transition={{
							duration: phase === "exiting" ? 0.4 : 0.8,
							ease: phase === "exiting" ? "easeIn" : "easeOut",
							delay: phase === "intro" ? 3.4 : 0,
						}}
					>
						Эйэҕэс киһи суола ордук, киһи киһитэ буол
					</motion.p>

					{/* Enter button */}
					<motion.button
						onClick={handleEnter}
						disabled={phase !== "intro"}
						className="mt-8 px-8 py-3.5 bg-[#4242F0] hover:bg-[#3535d0] text-white rounded-full font-display font-semibold uppercase tracking-wider text-sm shadow-lg transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
						initial={{ opacity: 0, y: 10 }}
						animate={
							phase === "exiting"
								? { opacity: 0, y: -20 }
								: { opacity: 1, y: 0 }
						}
						transition={{
							duration: phase === "exiting" ? 0.4 : 0.6,
							ease: phase === "exiting" ? "easeIn" : "easeOut",
							delay: phase === "intro" ? 3.8 : 0,
						}}
					>
						Уруй Айхал
					</motion.button>
				</motion.div>
			)}
		</>
	);
}
