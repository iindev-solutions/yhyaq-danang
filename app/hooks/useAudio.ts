import { useRef, useCallback } from 'react';

export function useAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const drumIntervalRef = useRef<any>(null);
  const khomusIntervalRef = useRef<any>(null);
  const droneNodeRef = useRef<any[]>([]);
  const mainGainNodeRef = useRef<GainNode | null>(null);
  const mp3AudioRef = useRef<HTMLAudioElement | null>(null);

  const startProceduralSynth = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
      masterGain.connect(ctx.destination);
      mainGainNodeRef.current = masterGain;

      // Ambient drones
      const freqs = [65.41, 130.81, 196.00, 261.63];
      droneNodeRef.current = [];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.5, ctx.currentTime);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(idx === 0 ? 150 : 350, ctx.currentTime);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        gain.gain.setValueAtTime(idx === 0 ? 0.3 : 0.08, ctx.currentTime);
        osc.start();
        droneNodeRef.current.push(osc);
      });

      // Shamanic drum
      const triggerDrumPulse = () => {
        const playPulse = (delay: number, intensity: number) => {
          const time = ctx.currentTime + delay;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(110, time);
          osc.frequency.exponentialRampToValueAtTime(32, time + 0.45);
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(80, time);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(masterGain);
          gain.gain.setValueAtTime(0.001, time);
          gain.gain.exponentialRampToValueAtTime(intensity, time + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);
          osc.start(time);
          osc.stop(time + 0.9);
        };
        playPulse(0, 0.9);
        playPulse(0.3, 0.55);
      };
      triggerDrumPulse();
      drumIntervalRef.current = setInterval(triggerDrumPulse, 1600);

      // Khomus (jaw harp)
      let tick = 0;
      const playKhomus = () => {
        const isAccent = tick % 4 === 0;
        const rootPitch = 65.41;
        const time = ctx.currentTime;
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(rootPitch, time);
        osc.frequency.exponentialRampToValueAtTime(rootPitch * 1.02, time + 0.3);
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(18, time);
        const startFreq = isAccent ? 1400 : 700;
        const endFreq = isAccent ? 600 : 1200;
        filter.frequency.setValueAtTime(startFreq, time);
        filter.frequency.exponentialRampToValueAtTime(endFreq, time + 0.45);
        const flutterLFO = ctx.createOscillator();
        const flutterGain = ctx.createGain();
        flutterLFO.type = 'sine';
        flutterLFO.frequency.setValueAtTime(12, time);
        flutterGain.gain.setValueAtTime(250, time);
        flutterLFO.connect(flutterGain);
        flutterGain.connect(filter.frequency);
        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0.001, time);
        envelope.gain.linearRampToValueAtTime(isAccent ? 0.35 : 0.18, time + 0.015);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + (isAccent ? 0.6 : 0.3));
        osc.connect(filter);
        filter.connect(envelope);
        envelope.connect(masterGain);
        flutterLFO.start(time);
        osc.start(time);
        flutterLFO.stop(time + 0.7);
        osc.stop(time + 0.7);
        tick++;
      };
      playKhomus();
      khomusIntervalRef.current = setInterval(playKhomus, 400);
    } catch (e) {
      console.error('Failed to initialize synthesized audio:', e);
    }
  }, []);

  const stopProceduralSynth = useCallback(() => {
    if (drumIntervalRef.current) clearInterval(drumIntervalRef.current);
    if (khomusIntervalRef.current) clearInterval(khomusIntervalRef.current);
    droneNodeRef.current.forEach((osc) => { try { osc.stop(); } catch {} });
    droneNodeRef.current = [];
    if (mainGainNodeRef.current && audioCtxRef.current) {
      try {
        mainGainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
      } catch {}
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
      audioCtxRef.current = null;
    }
  }, []);

  return {
    startProceduralSynth,
    stopProceduralSynth,
    mp3AudioRef,
  };
}
