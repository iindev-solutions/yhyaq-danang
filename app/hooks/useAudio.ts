import { useRef } from 'react';

export function useAudio() {
  const mp3AudioRef = useRef<HTMLAudioElement | null>(null);

  return {
    mp3AudioRef,
  };
}
