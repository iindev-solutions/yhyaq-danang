import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioWidgetProps {
  isPlaying: boolean;
  audioSource: 'synth' | 'mp3';
  onTogglePlay: () => void;
  onToggleSource: () => void;
}

export default function AudioWidget({ isPlaying, audioSource, onTogglePlay, onToggleSource }: AudioWidgetProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <div className="bg-[#03402C]/95 backdrop-blur-md rounded-2xl p-3 border border-[#0BDA51]/30 shadow-xl text-white w-72 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0BDA51] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0BDA51]"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#CEFDDE]/60 font-sans tracking-wider uppercase">Музыка Солнца</span>
              <span className="text-xs font-semibold leading-tight text-[#CEFDDE] truncate w-40">
                {audioSource === 'synth' ? 'Живой Хомус-Синтез' : 'Песня Ысыаха (MP3)'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="p-1.5 hover:bg-[#0BDA51]/20 text-[#CEFDDE] hover:text-white rounded-lg transition text-[10px] font-sans border border-[#0BDA51]/20"
              onClick={onToggleSource}
            >
              {audioSource === 'synth' ? '→ MP3' : '→ СИНТ'}
            </button>
            <button
              className="p-1.5 bg-[#0BDA51]/30 hover:bg-[#0BDA51]/50 text-white rounded-lg transition"
              onClick={onTogglePlay}
            >
              {isPlaying ? <Volume2 className="w-4 h-4 text-[#CEFDDE] animate-pulse" /> : <VolumeX className="w-4 h-4 text-[#CEFDDE]/60" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
