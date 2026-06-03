'use client';

import { useState, useEffect, useRef } from 'react';

import SolarGateway from './sections/SolarGateway';
import HeroSection from './sections/HeroSection';
import PhilosophySection from './sections/PhilosophySection';
import ProgramSection from './sections/ProgramSection';
import MediaSection from './sections/MediaSection';
import SponsorsSection from './sections/SponsorsSection';
import MapSection from './sections/MapSection';
import RSVPSection from './sections/RSVPSection';
import FooterSection from './sections/FooterSection';
import AudioWidget from './components/AudioWidget';
import MobileNav from './components/MobileNav';

export default function YhyaqInvitation() {
  const [isEntered, setIsEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const mp3AudioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    setIsEntered(true);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Audio management
  useEffect(() => {
    if (isEntered && isPlaying) {
      mp3AudioRef.current?.play().catch(() => {
        // Auto-play blocked — user will toggle manually
      });
    } else {
      mp3AudioRef.current?.pause();
    }
  }, [isEntered, isPlaying]);

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Hidden MP3 player */}
      <audio ref={mp3AudioRef} loop preload="auto" className="hidden">
        <source src="/yhyaq-danang-song.mp3" type="audio/mp3" />
      </audio>

      {/* ========================================== */}
      {/* INTRO GATEWAY                              */}
      {/* ========================================== */}
      {!isEntered && <SolarGateway onEnter={handleEnter} />}

      {/* ========================================== */}
      {/* MAIN CONTENT                               */}
      {/* ========================================== */}
      {isEntered && (
        <main className="min-h-screen flex flex-col text-[#0B0B26] selection:bg-[#CEFDDE]">
          {/* Audio Widget */}
          <AudioWidget isPlaying={isPlaying} onTogglePlay={handleTogglePlay} />
          <MobileNav />

          {/* Sections */}
          <HeroSection />
          <PhilosophySection />
          <ProgramSection />
          <MediaSection isGlobalAudioPlaying={isPlaying} onGlobalAudioPause={() => setIsPlaying(false)} onGlobalAudioResume={() => setIsPlaying(true)} />
          <SponsorsSection />
          <MapSection />
          <RSVPSection />
          <FooterSection />
        </main>
      )}
    </div>
  );
}
