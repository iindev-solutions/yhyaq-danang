import { Volume2, VolumeX } from 'lucide-react';

interface AudioWidgetProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function AudioWidget({ isPlaying, onTogglePlay }: AudioWidgetProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[1000] group">
      <button
        onClick={onTogglePlay}
        className="w-12 h-12 bg-[#03402C] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 hover:bg-[#0BDA51] active:scale-95 cursor-pointer relative"
        title={isPlaying ? 'Поставить на паузу' : 'Включить музыку'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#CEFDDE]" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#CEFDDE]/60" />
        )}

        {/* Hover tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#03402C] text-[#CEFDDE] text-xs font-body rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
          {isPlaying ? 'Музыка Ысыаха' : 'Включить музыку'}
        </span>
      </button>
    </div>
  );
}
