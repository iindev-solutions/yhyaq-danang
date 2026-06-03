'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import SolarGateway from './sections/SolarGateway';
import HeroSection from './sections/HeroSection';
import PhilosophySection from './sections/PhilosophySection';
import ProgramSection from './sections/ProgramSection';
import MediaSection from './sections/MediaSection';
import SponsorsSection from './sections/SponsorsSection';
import MapSection from './sections/MapSection';
import RSVPSection from './sections/RSVPSection';
import CoordinatorPanel from './sections/CoordinatorPanel';
import FooterSection from './sections/FooterSection';
import AudioWidget from './components/AudioWidget';

import { useAudio } from './hooks/useAudio';

export default function YhyaqInvitation() {
  const [isEntered, setIsEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<'synth' | 'mp3'>('synth');

  const { startProceduralSynth, stopProceduralSynth, mp3AudioRef } = useAudio();

  const handleEnter = () => {
    setIsEntered(true);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleToggleSource = () => {
    setAudioSource((prev) => (prev === 'synth' ? 'mp3' : 'synth'));
  };

  // Audio management
  useEffect(() => {
    if (isEntered && isPlaying) {
      if (audioSource === 'synth') {
        mp3AudioRef.current?.pause();
        startProceduralSynth();
      } else {
        stopProceduralSynth();
        if (mp3AudioRef.current) {
          mp3AudioRef.current.currentTime = 0;
          mp3AudioRef.current.play().catch(() => {
            setAudioSource('synth');
          });
        }
      }
    } else {
      stopProceduralSynth();
      mp3AudioRef.current?.pause();
    }
    return () => {
      stopProceduralSynth();
    };
  }, [isEntered, isPlaying, audioSource, startProceduralSynth, stopProceduralSynth]);

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Hidden MP3 player */}
      <audio ref={mp3AudioRef} loop preload="auto" className="hidden">
        <source src="/ysyakh_music.mp3" type="audio/mp3" />
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* ========================================== */}
      {/* INTRO GATEWAY                              */}
      {/* ========================================== */}
      <AnimatePresence>
        {!isEntered && <SolarGateway onEnter={handleEnter} />}
      </AnimatePresence>

      {/* ========================================== */}
      {/* MAIN CONTENT                               */}
      {/* ========================================== */}
      {isEntered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex flex-col text-[#0B0B26] selection:bg-[#CEFDDE]"
        >
          {/* Audio Widget */}
          <AudioWidget
            isPlaying={isPlaying}
            audioSource={audioSource}
            onTogglePlay={handleTogglePlay}
            onToggleSource={handleToggleSource}
          />

          {/* Sections */}
          <HeroSection />
          <PhilosophySection />
          <ProgramSection />
          <MediaSection />
          <SponsorsSection />
          <MapSection />
          <RSVPSection />
          <CoordinatorPanel />
          <FooterSection />
        </motion.main>
      )}
    </div>
  );
}
