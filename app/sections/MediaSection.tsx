"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface MediaSectionProps {
	isGlobalAudioPlaying: boolean;
	onGlobalAudioPause: () => void;
	onGlobalAudioResume: () => void;
}

const videos = [
	{
		src: "/archive/3660394551304630884.mp4",
		title: "Ысыах в Дананге",
		thumb: "/archive/1.webp",
	},
	{
		src: "/archive/3665627404258512445.mp4",
		title: "Праздник в горах",
		thumb: "/archive/2.webp",
	},
	{
		src: "/archive/IMG_0331.MP4",
		title: "Традиционные игры",
		thumb: "/archive/IMG_0309.JPG",
	},
	{
		src: "/archive/IMG_0497.MOV",
		title: "Хоровод Оьуохай",
		thumb: "/archive/4.webp",
	},
	{
		src: "/archive/IMG_6560.MOV",
		title: "Обряд Алгыс",
		thumb: "/archive/5.webp",
	},
	{
		src: "/archive/3665652067493768470(1).mp4",
		title: "Моменты Ысыаха",
		thumb: "/archive/6.webp",
	},
];

const photos = [
	{ src: "/archive/IMG_0280.JPG" },
	{ src: "/archive/IMG_0302.JPG" },
	{ src: "/archive/IMG_0306.JPG" },
	{ src: "/archive/IMG_0307.JPG" },
	{ src: "/archive/IMG_0308.JPG" },
	{ src: "/archive/IMG_0309.JPG" },
	{ src: "/archive/photo_2026-06-03_15-59-28.jpg" },
	{ src: "/archive/photo_2026-06-03_16-00-25.jpg" },
];

export default function MediaSection({ isGlobalAudioPlaying, onGlobalAudioPause, onGlobalAudioResume }: MediaSectionProps) {
	const [activeVideo, setActiveVideo] = useState<number | null>(null);
	const [wasGlobalAudioPlaying, setWasGlobalAudioPlaying] = useState(false);
	const [activePhoto, setActivePhoto] = useState<number | null>(null);

	const openVideo = (idx: number) => {
		if (isGlobalAudioPlaying) {
			setWasGlobalAudioPlaying(true);
			onGlobalAudioPause();
		} else {
			setWasGlobalAudioPlaying(false);
		}
		setActiveVideo(idx);
	};

	const closeVideo = () => {
		if (wasGlobalAudioPlaying) {
			onGlobalAudioResume();
		}
		setActiveVideo(null);
	};

	const nextPhoto = () => {
		if (activePhoto === null) return;
		setActivePhoto((activePhoto + 1) % photos.length);
	};
	const prevPhoto = () => {
		if (activePhoto === null) return;
		setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
	};

	const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

	const onImgLoad = useCallback((src: string) => {
		setLoadedImages((prev) => new Set(prev).add(src));
	}, []);

	return (
		<section
			id="media-section"
			className="py-24 px-6 paper-texture border-b border-[#D0D0FB]/50"
		>
			<div className="max-w-6xl mx-auto">
				<div className="text-center flex flex-col items-center gap-3 mb-16">
					<span className="inline-block font-body text-xs uppercase tracking-widest text-[#03402C] bg-[#CEFDDE] px-3.5 py-1.5 rounded-full font-bold">
						Архив Дананг 2025
					</span>
					<h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26] tracking-tight">
						Как это было
					</h3>
					<p className="text-[#0B0B26]/50 text-sm max-w-md mx-auto font-body">
						Ысыах в Дананге 2025 — видео и фото с прошлогоднего фестиваля
					</p>
				</div>

				{/* Videos */}
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
					{videos.map((video, idx) => (
						<motion.div
							key={video.src}
							className="relative rounded-2xl aspect-[9/16] overflow-hidden cursor-pointer group shadow-md bg-[#D0D0FB]/30"
							whileHover={{ scale: 1.03 }}
							onClick={() => openVideo(idx)}
						>
							{!loadedImages.has(video.thumb) && (
								<div className="absolute inset-0 bg-[#D0D0FB]/30 animate-pulse" />
							)}
							<img
								src={video.thumb}
								alt={video.title}
								className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages.has(video.thumb) ? "opacity-100" : "opacity-0"}`}
								loading="lazy"
								onLoad={() => onImgLoad(video.thumb)}
							/>
							<div className="absolute inset-0 bg-[#0B0B26]/30 group-hover:bg-[#0B0B26]/50 transition-colors duration-300 flex items-center justify-center">
								<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
									<Play className="w-4 h-4 text-white fill-white" />
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Photos */}
				<div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-[#D0D0FB]/50 shadow-sm">
					<div className="flex items-center gap-3 mb-8">
						<span className="w-2.5 h-8 bg-[#E3FF00] rounded-full" />
						<h4 className="font-display text-2xl font-black text-[#0B0B26]">
							Фото с Ысыаха 2025
						</h4>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{photos.map((photo, idx) => (
							<div
								key={photo.src}
								className="relative rounded-2xl aspect-square overflow-hidden cursor-pointer group shadow-sm bg-[#D0D0FB]/30"
								onClick={() => setActivePhoto(idx)}
							>
								{!loadedImages.has(photo.src) && (
									<div className="absolute inset-0 bg-[#D0D0FB]/30 animate-pulse" />
								)}
								<img
									src={photo.src}
									alt=""
									className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${loadedImages.has(photo.src) ? "opacity-100" : "opacity-0"}`}
									loading="lazy"
									onLoad={() => onImgLoad(photo.src)}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Video Lightbox */}
			<AnimatePresence>
				{activeVideo !== null && (
					<motion.div
						className="fixed inset-0 z-[1001] bg-[#0B0B26]/95 flex items-center justify-center p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<button
							className="absolute top-6 right-6 text-white/60 hover:text-white transition"
							onClick={closeVideo}
						>
							<X className="w-8 h-8" />
						</button>
						<video
							src={videos[activeVideo].src}
							controls
							autoPlay
							className="max-h-[85vh] max-w-[90vw] rounded-2xl"
							onEnded={closeVideo}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Photo Lightbox */}
			<AnimatePresence>
				{activePhoto !== null && (
					<motion.div
						className="fixed inset-0 z-[1001] bg-[#0B0B26]/95 flex items-center justify-center p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<button
							className="absolute top-6 right-6 text-white/60 hover:text-white transition"
							onClick={() => setActivePhoto(null)}
						>
							<X className="w-8 h-8" />
						</button>
						<button
							className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition p-2"
							onClick={prevPhoto}
						>
							<ChevronLeft className="w-10 h-10" />
						</button>
						<button
							className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition p-2"
							onClick={nextPhoto}
						>
							<ChevronRight className="w-10 h-10" />
						</button>
						<img
							src={photos[activePhoto].src}
							alt=""
							className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
