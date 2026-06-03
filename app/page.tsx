'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Image as ImageIcon,
  Video,
  Award,
  Info,
  Lock,
  Unlock,
  ChevronDown,
  Navigation,
  Compass,
  Tent,
  Utensils,
  Heart,
  Share2,
  Plus,
  Compass as CompassIcon,
  HelpCircle
} from 'lucide-react';

// Interfaces for our state elements
interface RSVP {
  id: string;
  name: string;
  guestsCount: number;
  contact: string;
  willDanceOsuokhay: boolean;
  willPlaySports: boolean;
  dietaryNote: string;
  createdAt: string;
}

// Default initial RSVP list to give the Coordinator Panel some lively starter data
const DEFAULT_RSVPS: RSVP[] = [
  {
    id: '1',
    name: 'Айсен Николаев',
    guestsCount: 2,
    contact: '@aisen_nik',
    willDanceOsuokhay: true,
    willPlaySports: true,
    dietaryNote: 'Без ограничений',
    createdAt: '2026-06-01T10:30:00Z',
  },
  {
    id: '2',
    name: 'Сардана Егорова',
    guestsCount: 1,
    contact: '+84901234567',
    willDanceOsuokhay: true,
    willPlaySports: false,
    dietaryNote: 'Вегетарианка',
    createdAt: '2026-06-01T12:15:00Z',
  },
  {
    id: '3',
    name: 'Михаил Торохов (Mytona)',
    guestsCount: 3,
    contact: '@mikhail_mytona',
    willDanceOsuokhay: true,
    willPlaySports: true,
    dietaryNote: 'Аллергия на арахис',
    createdAt: '2026-06-02T08:44:00Z',
  },
  {
    id: '4',
    name: 'Надежда Федорова',
    guestsCount: 4,
    contact: '@nadya_f',
    willDanceOsuokhay: true,
    willPlaySports: false,
    dietaryNote: 'С детьми, без ограничений',
    createdAt: '2026-06-02T14:20:00Z',
  }
];

export default function YhyaqInvitation() {
  // System states
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<'synth' | 'mp3'>('synth');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  
  // RSVP Form states
  const [formName, setFormName] = useState<string>('');
  const [formGuests, setFormGuests] = useState<number>(1);
  const [formContact, setFormContact] = useState<string>('');
  const [danceOsuokhay, setDanceOsuokhay] = useState<boolean>(true);
  const [playSports, setPlaySports] = useState<boolean>(false);
  const [dietary, setDietary] = useState<string>('');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
  const [rsvpList, setRsvpList] = useState<RSVP[]>([]);

  // Coordinator Panel states
  const [showCoordinator, setShowCoordinator] = useState<boolean>(false);
  const [coordinatorPassword, setCoordinatorPassword] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Audio Context Ref for procedural synthesis
  const audioCtxRef = useRef<AudioContext | null>(null);
  const drumIntervalRef = useRef<any>(null);
  const khomusIntervalRef = useRef<any>(null);
  const droneNodeRef = useRef<any[]>([]);
  const mainGainNodeRef = useRef<GainNode | null>(null);

  // Native HTML Audio Element Ref for MP3 playback
  const mp3AudioRef = useRef<HTMLAudioElement | null>(null);

  // Load RSVP List from localStorage on mount
  useEffect(() => {
    const handleLoad = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('yhyaq_rsvps');
        if (stored) {
          try {
            setRsvpList(JSON.parse(stored));
          } catch (e) {
            setRsvpList(DEFAULT_RSVPS);
          }
        } else {
          setRsvpList(DEFAULT_RSVPS);
          try {
            localStorage.setItem('yhyaq_rsvps', JSON.stringify(DEFAULT_RSVPS));
          } catch (e) {}
        }
      }
    };

    // Defer state update to avoid synchronous cascading renders linter warning
    const timer = setTimeout(handleLoad, 0);
    return () => clearTimeout(timer);
  }, []);

  // Web Audio Procedural Synthesis Logic
  const startProceduralSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtxClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain for smooth volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
      masterGain.connect(ctx.destination);
      mainGainNodeRef.current = masterGain;

      // --- 1. AMBIENT DRIFTING SUN COLD OSCILLATORS (Celestial Golden Sun Drone) ---
      const freqs = [65.41, 130.81, 196.00, 261.63]; // C2, C3, G3, C4
      droneNodeRef.current = [];
      
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.5, ctx.currentTime);
        
        // Lowpass filter to keep drones deep and cinematic
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(idx === 0 ? 150 : 350, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        // Slow breathing volume drift
        gain.gain.setValueAtTime(idx === 0 ? 0.3 : 0.08, ctx.currentTime);
        
        osc.start();
        droneNodeRef.current.push(osc);
      });

      // --- 2. SHAMANIC SACRED HEARTBEAT DRUM (Double pulse every 1.6 seconds) ---
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

        // Shamanic heartbeat: THUM... THUM...
        playPulse(0, 0.9);
        playPulse(0.3, 0.55);
      };

      triggerDrumPulse(); // Immediate first beat
      drumIntervalRef.current = setInterval(triggerDrumPulse, 1600);

      // --- 3. METALLIC TRADITIONAL KHOMUS (Jaw Harp) PLUCK ENERGY ---
      let tick = 0;
      const playKhomusPluckSymbolic = () => {
        // Rhythmic pattern: accent on primary beats
        const isAccent = tick % 4 === 0;
        const rootPitch = 65.41; // C2 deep buzz
        const harmonics = isAccent ? [1, 2, 3, 5] : [1, 2, 4];
        const time = ctx.currentTime;

        // Base carrier frequency with mild pitch bend simulating mouth adjustments
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(rootPitch, time);
        // Mild slide up to mimic inhalation/exhalation
        osc.frequency.exponentialRampToValueAtTime(rootPitch * 1.02, time + 0.3);

        // Formant cavity sweeping Bandpass filter (Simulates saying "Oy-oo-akh")
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        // Extreme Q values make it sound talkative and metallic
        filter.Q.setValueAtTime(18, time); 

        // Modulation of the filter center frequency to simulate vowels
        const startFreq = isAccent ? 1400 : 700;
        const endFreq = isAccent ? 600 : 1200;
        filter.frequency.setValueAtTime(startFreq, time);
        filter.frequency.exponentialRampToValueAtTime(endFreq, time + 0.45);

        // LFO that vibrates the filter to create the distinct liquid "flutter" of Khomus
        const flutterLFO = ctx.createOscillator();
        const flutterGain = ctx.createGain();
        flutterLFO.type = 'sine';
        flutterLFO.frequency.setValueAtTime(12, time); // 12 Hz rapid vibration
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

      playKhomusPluckSymbolic();
      // Fast rhythmic plucking
      khomusIntervalRef.current = setInterval(playKhomusPluckSymbolic, 400);

    } catch (e) {
      console.error('Failed to initialize synthesized audio soundscape:', e);
    }
  };

  const stopProceduralSynth = () => {
    if (drumIntervalRef.current) clearInterval(drumIntervalRef.current);
    if (khomusIntervalRef.current) clearInterval(khomusIntervalRef.current);
    
    droneNodeRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (err) {}
    });
    droneNodeRef.current = [];

    if (mainGainNodeRef.current && audioCtxRef.current) {
      try {
        mainGainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
      } catch(err){}
    }

    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch(e){}
      audioCtxRef.current = null;
    }
  };

  // Music System Coordinator
  useEffect(() => {
    if (isEntered && isPlaying) {
      if (audioSource === 'synth') {
        // Pause MP3 if playing
        if (mp3AudioRef.current) {
          mp3AudioRef.current.pause();
        }
        startProceduralSynth();
      } else {
        // Pause Synth if active
        stopProceduralSynth();
        // Play MP3
        if (mp3AudioRef.current) {
          mp3AudioRef.current.currentTime = 0;
          mp3AudioRef.current.play().catch(e => {
            console.warn('MP3 file not loaded or error during playback. Falling back to Synth auto:', e);
            // Auto fallback
            setAudioSource('synth');
          });
        }
      }
    } else {
      stopProceduralSynth();
      if (mp3AudioRef.current) {
        mp3AudioRef.current.pause();
      }
    }

    return () => {
      stopProceduralSynth();
    };
  }, [isEntered, isPlaying, audioSource]);

  // Handle entry animation trigger
  const handleEnterClick = () => {
    setIsEntering(true);
    // Give sun explosion transition 1.2s to peak before fading in content
    setTimeout(() => {
      setIsEntered(true);
      setIsPlaying(true);
    }, 1200);
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim()) return;

    const newAttendee: RSVP = {
      id: Math.random().toString(36).substr(2, 9),
      name: formName.trim(),
      guestsCount: formGuests,
      contact: formContact.trim(),
      willDanceOsuokhay: danceOsuokhay,
      willPlaySports: playSports,
      dietaryNote: dietary.trim() || 'Без ограничений',
      createdAt: new Date().toISOString(),
    };

    const updated = [newAttendee, ...rsvpList];
    setRsvpList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('yhyaq_rsvps', JSON.stringify(updated));
    }

    setIsSubmitSuccess(true);
    setTimeout(() => {
      // clean up status
      setFormName('');
      setFormGuests(1);
      setFormContact('');
      setDietary('');
    }, 3000);
  };

  // Coordinator Authorization Check
  const handleCoordinatorAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (coordinatorPassword === 'yhyaq2026') {
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Неверный код доступа. Попробуйте "yhyaq2026"');
    }
  };

  // Calculations for Admin Dashboard
  const totalGuestsSum = rsvpList.reduce((sum, r) => sum + r.guestsCount, 0);
  const totalDanceOsuokhayCount = rsvpList.filter(r => r.willDanceOsuokhay).length;
  const totalPlaySportsCount = rsvpList.filter(r => r.willPlaySports).length;

  const handleDeleteAttendee = (id: string) => {
    const updated = rsvpList.filter(r => r.id !== id);
    setRsvpList(updated);
    localStorage.setItem('yhyaq_rsvps', JSON.stringify(updated));
  };

  // Fake or dynamic reels database
  const REELS = [
    {
      title: "Пляжные игры на песке",
      desc: "Участники соревнуются в мас-рестлинге и народном беге на берегу теплого океана.",
      bgGradient: "from-amber-600 via-orange-500 to-yellow-400",
      stats: "Pattaya 25",
      videoUrl: ""
    },
    {
      title: "Великий хоровод Осуохай",
      desc: "Единение сердец и душ под палящим тропическим солнцем, символизирующее круговорот жизни.",
      bgGradient: "from-rose-600 via-pink-500 to-purple-500",
      stats: "Pattaya 25",
      videoUrl: ""
    },
    {
      title: "Обряд очищения Алгыс",
      desc: "Священный огонь, звуки хомуса и благословление духов природы во имя согласия и счастья.",
      bgGradient: "from-emerald-700 via-teal-600 to-cyan-500",
      stats: "Pattaya 25",
      videoUrl: ""
    }
  ];

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Hidden background MP3 player node. Looks for ysyakh_music.mp3 or music.mp3 */}
      <audio 
        ref={mp3AudioRef} 
        loop 
        preload="auto"
        className="hidden"
      >
        <source src="/ysyakh_music.mp3" type="audio/mp3" />
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* ========================================== */}
      {/* 🌞 INTRO SOLAR LOADING GATEWAY            */}
      {/* ========================================== */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div
            id="solar-loader-container"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#15110d] text-white p-6 overflow-hidden"
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            {/* Background radiant radial warm aura */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.18)_0%,transparent_70%)] animate-aura" />

            {/* Glowing Golden Organic Sun */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
              
              {/* Outer Ray Layer 1 (Slow Clockwise) */}
              <div className="absolute inset-0 animate-sun-spin opacity-40">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={`ray-1-${i}`}
                    className="absolute top-1/2 left-1/2 w-3 sm:w-4 h-48 sm:h-56 origin-top -translate-x-1/2 bg-gradient-to-b from-amber-400/60 to-transparent"
                    style={{ transform: `rotate(${i * 15}deg) translateY(-100%)` }}
                  />
                ))}
              </div>

              {/* Outer Ray Layer 2 (Faster Counter-Clockwise, warm orange) */}
              <div className="absolute inset-0 animate-sun-spin-counter opacity-30">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={`ray-2-${i}`}
                    className="absolute top-1/2 left-1/2 w-4 sm:w-5 h-44 sm:h-52 origin-top -translate-x-1/2 bg-gradient-to-b from-orange-500/50 to-transparent"
                    style={{ transform: `rotate(${i * 22.5 + 7.5}deg) translateY(-100%)` }}
                  />
                ))}
              </div>

              {/* Solar Core Disk (Glowing & Pulsating) */}
              <motion.div 
                id="solar-core-disk"
                className={`absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 flex flex-col items-center justify-center p-4 text-center cursor-pointer shadow-[0_0_80px_rgba(245,158,11,0.6)] animate-solar-core ${isEntering ? 'pointer-events-none' : ''}`}
                whileHover={{ scale: 1.08 }}
                onClick={() => !isEntering && handleEnterClick()}
              >
                {isEntering ? (
                  <Sun className="w-12 h-12 text-[#15110d] animate-sun-spin-fast" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Sun className="w-10 h-10 text-[#15110d] mb-1 animate-spin" style={{ animationDuration: '30s' }} />
                    <span className="font-display font-bold text-lg leading-tight uppercase text-[#15110d] tracking-wide">
                      ЫСЫАХ
                    </span>
                    <span className="font-mono text-[9px] text-[#2c1f0f] tracking-widest font-black uppercase mt-1">
                      Da Nang ’26
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Click call-to-action */}
            <div className="z-10 text-center max-w-sm mt-8 space-y-4">
              <motion.button
                id="enter-button"
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 hover:from-amber-300 hover:to-yellow-300 text-[#15110d] rounded-full font-display font-semibold uppercase tracking-wider text-sm shadow-[0_4px_25px_rgba(245,158,11,0.4)] cursor-pointer overflow-hidden transition-all duration-300 transform"
                whileTap={{ scale: 0.96 }}
                onClick={handleEnterClick}
                disabled={isEntering}
              >
                {isEntering ? 'Открываем Праздник...' : 'Войти в мир Солнца'}
              </motion.button>

              <p className="text-xs text-amber-300/80 font-mono tracking-normal px-4 animate-pulse">
                🔊 Включите звук на устройстве перед входом для атмосферного музыкального обряда
              </p>
            </div>

            {/* Event Header Silhouette Concept representing traditional alignment of Image 1 */}
            <div className="absolute bottom-6 left-0 right-0 py-2 border-t border-white/5 bg-white/5 opacity-50 flex justify-center space-x-6 text-[10px] sm:text-xs font-mono tracking-widest text-[#dbd8d0]">
              <span>DA NANG</span>
              <span>•</span>
              <span>JUNE 20 2026</span>
              <span>•</span>
              <span>ETHNOFEST ЫСЫАХ</span>
            </div>

            {/* Flash screen on entry trigger */}
            {isEntering && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeIn' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* ⚡ MAIN CONTENT PAGE                        */}
      {/* ========================================== */}
      {isEntered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex flex-col text-neutral-800 selection:bg-[#ffedcd]"
        >
          {/* STICKY AUDIO WIDGET */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
            {/* Quick-control Player Badge */}
            <motion.div
              id="audio-control-panel"
              className="bg-[#2a2d24]/95 backdrop-blur-md rounded-2xl p-3 border border-[#484f3e]/60 shadow-[0_12px_32px_rgba(21,28,14,0.15)] text-white w-72 flex flex-col gap-2.5 transition-all duration-300"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">Музыка Солнца</span>
                    <span className="text-xs font-semibold leading-tight text-[#ffeed3] truncate w-40">
                      {audioSource === 'synth' ? '🪕 Живой Хомус-Синтез' : '🎵 Песня Ысыаха (MP3)'}
                    </span>
                  </div>
                </div>
                
                {/* Audio System Control Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    id="audio-source-toggle"
                    className="p-1.5 hover:bg-[#3d4233] text-amber-200 hover:text-white rounded-lg transition text-[10px] font-mono border border-amber-300/20"
                    title="Переключить источник звука"
                    onClick={() => {
                      setAudioSource(prev => prev === 'synth' ? 'mp3' : 'synth');
                    }}
                  >
                    {audioSource === 'synth' ? '→ MP3' : '→ СИНТ'}
                  </button>

                  <button
                    id="audio-play-pause"
                    className="p-1.5 bg-[#4c543f] hover:bg-[#5b644c] hover:text-amber-200 text-white rounded-lg transition"
                    onClick={() => setIsPlaying(prev => !prev)}
                    title={isPlaying ? "Поставить на паузу" : "Запустить звук"}
                  >
                    {isPlaying ? <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" /> : <VolumeX className="w-4 h-4 text-neutral-300" />}
                  </button>
                </div>
              </div>

              {/* Informative instructions inside player */}
              <div className="text-[9px] text-[#ffeed3]/75 leading-relaxed bg-[#313529] p-1.5 rounded-lg border border-white/5 font-mono">
                {audioSource === 'synth' 
                  ? 'Синтезатор генерирует ритуальные низкочастотные волны, соединенные с шаманским барабаном.' 
                  : 'Загружается фоновое аудио. Пожалуйста, убедитесь, что mp3-файл доступен.'}
              </div>
            </motion.div>

            {/* Quick Shortcut Scroll to Invitation Form button */}
            <motion.a
              href="#form-section"
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-display uppercase tracking-widest text-xs font-bold rounded-full shadow-lg hover:from-emerald-500 hover:to-teal-600 transition flex items-center gap-1 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Забронировать место</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* ========================================== */}
          {/* 🌿 HERO HEADER SECTION                    */}
          {/* ========================================== */}
          <section
            id="hero-section"
            className="relative flex flex-col items-center justify-center p-6 pt-16 pb-20 sm:pb-28 text-center bg-[#dbecd1] border-b border-emerald-800/10"
          >
            {/* Overlay Grid to fit Image 4 style */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_60%)] opacity-80" />

            {/* Decorative rotating background thin elements for visual joy */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-emerald-900/5 animate-sun-spin pointer-events-none" />

            <div className="relative max-w-4xl mx-auto flex flex-col items-center space-y-4">
              
              {/* Event Badge like Image 4 style */}
              <motion.div
                id="hero-badge"
                className="px-4 py-1.5 bg-[#14321a] text-[#dbecd1] rounded-full text-xs font-mono tracking-[0.25em] font-black uppercase mb-2 inline-flex items-center gap-1"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span>VIETNAM</span>
                <span>•</span>
                <span>DA NANG 2026</span>
              </motion.div>

              {/* Title Logo Reconstruction matching Image 4 style */}
              <motion.div
                id="hero-logo-reconstruction"
                className="flex flex-col items-center select-none"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
              >
                <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest text-[#14321a]/80 mb-2">
                  ☀️ JUNE 20 2026 ☀️
                </span>
                
                {/* Beautiful custom-styled typography Logo representing "yhyaq" */}
                <h1 className="font-display text-7xl sm:text-[9.5rem] leading-none font-extrabold tracking-tighter text-[#14321a] lowercase select-none flex items-baseline">
                  yhy<span>a</span>q
                </h1>
                
                <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-widest text-[#14321a] mt-1">
                  DANANG
                </h2>
              </motion.div>

              {/* Meta information tags */}
              <motion.div
                className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto w-full font-mono text-xs text-[#14321a]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-col items-center bg-[#cae2bc]/60 p-3 rounded-2xl border border-emerald-800/10">
                  <Calendar className="w-5 h-5 text-[#14321a] mb-1.5" />
                  <span className="font-black">20 ИЮНЯ 2026</span>
                  <span className="text-[10px] text-neutral-600">Суббота, с 11:00</span>
                </div>

                <div className="flex flex-col items-center bg-[#cae2bc]/60 p-3 rounded-2xl border border-emerald-800/10 col-span-1">
                  <MapPin className="w-5 h-5 text-[#14321a] mb-1.5" />
                  <span className="font-black">ДАНАНГ</span>
                  <span className="text-[10px] text-neutral-600">Palm Grove Resort</span>
                </div>

                <div className="flex flex-col items-center bg-[#cae2bc]/60 p-3 rounded-2xl border border-emerald-800/10 col-span-2 sm:col-span-1">
                  <Users className="w-5 h-5 text-[#14321a] mb-1.5" />
                  <span className="font-black">ETHNOFEST</span>
                  <span className="text-[10px] text-neutral-600">Вход свободный</span>
                </div>
              </motion.div>

              {/* Invitation Subtext */}
              <motion.p
                className="text-base sm:text-xl text-[#2a452d] leading-relaxed max-w-2xl pt-6 tracking-wide text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Впервые на живописном побережье Вьетнама! Приглашаем вас отметить древний якутский праздник солнца и лета <strong className="font-extrabold text-[#14321a]">Ысыах</strong>. Окунитесь в священный алгыс благословления духов, возьмитесь за руки в мощном хороводе Осуохай, отведайте румяные золотые оладьи и испытайте силу на песчаном пляже!
              </motion.p>

              {/* Scroll guide */}
              <motion.div
                className="pt-8 flex flex-col items-center gap-1 opacity-60 text-[#14321a]"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-[10px] font-mono tracking-widest uppercase">Узнать программу праздника</span>
                <ChevronDown className="w-4 h-4" />
              </motion.div>

            </div>
          </section>

          {/* ========================================== */}
          {/* 🌄 THE HOLY TRADITIONS SECTION           */}
          {/* ========================================== */}
          <section id="philosophy-section" className="py-20 px-6 paper-texture border-b border-stone-200">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-3 mb-16">
                <span className="font-mono text-xs uppercase tracking-widest text-[#a85a32] bg-[#fbf0ea] px-3.5 py-1.5 rounded-full font-bold">Обряды и Смыслы</span>
                <h3 className="font-display text-3xl sm:text-5xl font-black text-[#1c1c1c]">Философия Ысыаха</h3>
                <p className="text-neutral-500 max-w-lg mx-auto text-sm sm:text-base">Каждый символ праздника несет в себе силу весеннего возрождения, тепла и священного солнца</p>
              </div>

              {/* Bento Grid layout of Yakut elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Symbol Card 1 - Sun */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-6 font-bold text-lg">
                      ☀️
                    </div>
                    <h4 className="font-display text-xl font-bold text-neutral-900 mb-2">Солнечный круг</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Символ божества Айыы Уола. Ысыах — это моление, цель которого — укрепить человеческую душу теплом и светом, восстановить жизненную энергию на год вперёд.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-100 mt-6 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span>Связь с небом</span>
                    <span>Кюн (Kün)</span>
                  </div>
                </div>

                {/* Symbol Card 2 - Choroon */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6 font-bold text-lg">
                      🍶
                    </div>
                    <h4 className="font-display text-xl font-bold text-neutral-900 mb-2">Сосуд Чороон</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Традиционный деревянный кубок на трех ножках, украшенный резным орнаментом. Из него пьют целебный кумыс, передавая по кругу тепло дружбы и единства.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-100 mt-6 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span>Благословение</span>
                    <span>Чороон (Choroon)</span>
                  </div>
                </div>

                {/* Symbol Card 3 - Osuokhay */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-6 font-bold text-lg">
                      👥
                    </div>
                    <h4 className="font-display text-xl font-bold text-neutral-900 mb-2">Хоровод Осуохай</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Великий круговой танец. Двигаясь по часовой стрелке вслед за движением солнца, люди очищаются от негатива, образуя непрерывное кольцо жизненной энергии.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-100 mt-6 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span>Сила общины</span>
                    <span>Осуохай (Osuokhay)</span>
                  </div>
                </div>

                {/* Symbol Card 4 - Algys */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 mb-6 font-bold text-lg">
                      🔥
                    </div>
                    <h4 className="font-display text-xl font-bold text-neutral-900 mb-2">Обряд Алгыс</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Поклонение и обращение к добрым божествам через кормление священного огня маслом и оладьями под мелодичные заклинания алгысчыта (заклинателя).
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-100 mt-6 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span>Очищение души</span>
                    <span>Алгыс (Algys)</span>
                  </div>
                </div>

              </div>

              {/* Circular graphic representation similar to image 1 - Osuokhay ring and MYTONA */}
              <div className="mt-16 bg-[#fae5e5] rounded-[3rem] p-8 md:p-12 border border-[#f0c3c3] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />
                
                {/* Symbolic representation of dance of people inside image 1 */}
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-dashed border-[#e65555]/30 flex items-center justify-center animate-sun-spin pointer-events-none relative flex-shrink-0">
                  <div className="absolute w-24 h-24 bg-white/95 rounded-full flex items-center justify-center shadow-md animate-sun-spin-counter">
                    <span className="font-display font-extrabold text-[#e65555] tracking-widest text-[9px] uppercase">MYTONA</span>
                  </div>
                  {/* Visual representing Osuokhay dots */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={`osuokhay-dot-${i}`}
                      className="absolute w-3 h-3 rounded-full bg-[#e65555] shadow-sm flex items-center justify-center text-[7px] text-white font-bold"
                      style={{
                        transform: `rotate(${i * 30}deg) translateY(-80px)`,
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#e65555]">
                    Главный Меценат Праздника
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl font-black text-[#692020] uppercase tracking-wide">
                    Генеральный партнер MYTONA
                  </h4>
                  <p className="text-[#8c5252] text-xs sm:text-sm leading-relaxed max-w-xl">
                    Компания <strong className="font-bold">MYTONA</strong> с гордостью выступает генеральным спонсором этнофестиваля Ысыах в Дананге. Бережно оберегая вековые традиции Саха, Mytona объединяет людей из разных уголков света, помогая сохранять дух сплочения, древние обряды предков и делясь теплом северной дружбы со всем миром.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#e65555] pt-2">
                    <Award className="w-4 h-4" />
                    <span>По инициативе и содействии лидеров Mytona</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* 📋 TIMELINE PROGRAM / "ЫСЫАХ ХААМЫЫТА"     */}
          {/* ========================================== */}
          <section id="program-section" className="py-24 px-6 bg-white border-b border-stone-200">
            <div className="max-w-4xl mx-auto">
              
              <div className="text-center space-y-3 mb-16">
                <span className="font-mono text-xs uppercase tracking-widest text-[#14321a] bg-[#dbecd1] px-3.5 py-1.5 rounded-full font-bold">Программа События</span>
                <h3 className="font-display text-4xl font-black text-[#1c1c1c] tracking-tight">Ыһыах Хаамыыта / 20 Июня</h3>
                <p className="text-neutral-500 text-sm max-w-md mx-auto">Полный таймлайн активностей и традиционного тайминга для незабываемого праздничного дня</p>
              </div>

              {/* Program list representing style of Image 3 */}
              <div className="space-y-6">
                
                {/* Slot 1 */}
                <motion.div 
                  className="group flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 rounded-3xl border border-stone-200/80 hover:border-[#14321a]/30 hover:bg-[#fafbf8] transition duration-300 relative overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center md:flex-col gap-3 font-mono md:w-32 flex-shrink-0">
                    <span className="text-2xl font-black text-[#14321a] bg-[#dbecd1] px-4 py-1.5 rounded-2xl md:w-full text-center">
                      11:00
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Начало</span>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-lg sm:text-xl font-black text-neutral-900 group-hover:text-[#14321a] transition">
                        Алгыс — Обряд Благословления у Огня
                      </h4>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-mono font-bold rounded uppercase">Главное событие</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Торжественное открытие праздника. Очищающий ритуал благословения огня, кормление духов священным подношением, звуки сакрального хомуса и хор добрых пожеланий.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                      <Tent className="w-3 h-3 text-[#14321a]" />
                      <span>Локация: Главная поляна курорта</span>
                    </div>
                  </div>
                </motion.div>

                {/* Slot 2 */}
                <motion.div 
                  className="group flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 rounded-3xl border border-stone-200/80 hover:border-[#a85a32]/30 hover:bg-[#fffcf9] transition duration-300 relative overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center md:flex-col gap-3 font-mono md:w-32 flex-shrink-0">
                    <span className="text-2xl font-black text-[#a85a32] bg-[#fbf0ea] px-4 py-1.5 rounded-2xl md:w-full text-center">
                      11:30
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Угощение</span>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-lg sm:text-xl font-black text-neutral-900 group-hover:text-[#a85a32] transition">
                        Традиционные оладьи и дегустация
                      </h4>
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[9px] font-mono font-bold rounded uppercase">Гастрономия</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Угощение свежеприготовленными круглыми оладьями (олицетворяющими солнце), дегустация национальных якутских блюд, а также тропических прохладительных напитков на кокосовом молоке.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                      <Utensils className="w-3 h-3 text-[#a85a32]" />
                      <span>Локация: Шатер дегустаций / Palm Food Zone</span>
                    </div>
                  </div>
                </motion.div>

                {/* Slot 3 */}
                <motion.div 
                  className="group flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 rounded-3xl border border-stone-200/80 hover:border-rose-800/30 hover:bg-[#fff9fa] transition duration-300 relative overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center md:flex-col gap-3 font-mono md:w-32 flex-shrink-0">
                    <span className="text-2xl font-black text-[#e65555] bg-[#fae5e5] px-4 py-1.5 rounded-2xl md:w-full text-center">
                      12:30
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Единение</span>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-lg sm:text-xl font-black text-neutral-900 group-hover:text-[#e65555] transition">
                        Осуохай — Большой Круговой Хоровод
                      </h4>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[9px] font-mono font-bold rounded uppercase">Интерактив</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Встаем в круг дружбы на пляже! Под предводительством ведущего запевалы танцуем и поем Осуохай, чтобы зарядиться мощной солнечной кармической силой единения и укрепить узы.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                      <Users className="w-3 h-3 text-[#e65555]" />
                      <span>Локация: Песчаный пляж Palm Grove</span>
                    </div>
                  </div>
                </motion.div>

                {/* Slot 4 */}
                <motion.div 
                  className="group flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 rounded-3xl border border-stone-200/80 hover:border-cyan-800/30 hover:bg-[#f6fdfe] transition duration-300 relative overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center md:flex-col gap-3 font-mono md:w-32 flex-shrink-0">
                    <span className="text-2xl font-black text-cyan-800 bg-[#e3f7fa] px-4 py-1.5 rounded-2xl md:w-full text-center">
                      13:30
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Спорт</span>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-lg sm:text-xl font-black text-neutral-900 group-hover:text-cyan-800 transition">
                        Игры Предков и Мас-Рестлинг
                      </h4>
                      <span className="px-2 py-0.5 bg-cyan-100 text-cyan-800 text-[9px] font-mono font-bold rounded uppercase">Соревнования</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Станьте частью северных спортивных состязаний на вьетнамском песке! Мас-рестлинг (перетягивание палки), хапсагай (якутская борьба), народная эстафета и пляжный волейбол. Кубки лучшим спортсменам!
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                      <Award className="w-3 h-3 text-cyan-800" />
                      <span>Локация: Пляжная спортивная арена</span>
                    </div>
                  </div>
                </motion.div>

                {/* Slot 5 */}
                <motion.div 
                  className="group flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 rounded-3xl border border-stone-200/80 hover:border-indigo-800/30 hover:bg-[#f8f7ff] transition duration-300 relative overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center md:flex-col gap-3 font-mono md:w-32 flex-shrink-0">
                    <span className="text-2xl font-black text-indigo-700 bg-[#ebe7ff] px-4 py-1.5 rounded-2xl md:w-full text-center">
                      15:00
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Розыгрыш</span>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-lg sm:text-xl font-black text-neutral-900 group-hover:text-indigo-700 transition">
                        Лотерея &quot;Лотрия&quot; и Подарки спонсоров
                      </h4>
                      <span className="px-2 py-0.5 bg-[#eae5ff] text-[#4f3eff] text-[9px] font-mono font-bold rounded uppercase">Лотерея</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Торжественная беспроигрышная якутская лотерея с ценными призами от спонсоров, конкурсы на лучшие стилизованные национальные наряды среди гостей, награждение победителей состязаний и фотосессия на закате.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                      <Info className="w-3 h-3 text-indigo-700" />
                      <span>Локация: Главная сцена на песке</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* 📱 REELS & PHOTO MEMORIES ARCHIVE         */}
          {/* ========================================== */}
          <section id="media-section" className="py-24 px-6 paper-texture border-b border-stone-200">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center space-y-3 mb-16">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 bg-[#dbecd1] px-3.5 py-1.5 rounded-full font-bold">Архив Паттайи 2025</span>
                <h3 className="font-display text-3xl sm:text-5xl font-black text-[#1c1c1c] tracking-tight">Как это было в прошлом году</h3>
                <p className="text-neutral-500 text-sm max-w-md mx-auto">Яркие моменты, видео-рилсы со спортивных состязаний и душевные улыбки гостей первого этнофеста</p>
              </div>

              {/* Grid with 3 Reels cards mimicking vertical smartphone videos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {REELS.map((reel, idx) => (
                  <motion.div
                    key={`reel-card-${idx}`}
                    className={`relative rounded-[2rem] aspect-[9/16] bg-gradient-to-b ${reel.bgGradient} p-6 flex flex-col justify-between overflow-hidden shadow-md group cursor-pointer border border-stone-200/50`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveReelIndex(activeReelIndex === idx ? null : idx)}
                  >
                    {/* Glowing aesthetic ray overlay inside reel */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/30 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition" />

                    {/* Smartphone Header Indicator */}
                    <div className="relative flex justify-between items-center text-[10px] font-mono text-white/90">
                      <span className="bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">{reel.stats}</span>
                      <span className="bg-black/30 backdrop-blur p-1 rounded-full"><Video className="w-3 h-3 text-amber-300" /></span>
                    </div>

                    {/* Active Screen overlay mimicking Video playing */}
                    <AnimatePresence>
                      {activeReelIndex === idx && (
                        <motion.div
                          className="absolute inset-0 bg-[#0f110c]/90 z-10 flex flex-col items-center justify-center p-6 text-center text-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Sun className="w-8 h-8 text-amber-400 animate-sun-spin-fast mb-4" />
                          <span className="font-mono text-[9px] text-amber-300 uppercase tracking-widest mb-1">Воспроизведение...</span>
                          <p className="text-xs text-neutral-300 font-mono italic leading-relaxed">
                            &quot;Загрузка видео-отрывка: Силы духа Саха у теплого моря...&quot;
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-6 leading-relaxed">
                            (Здесь встроены медиа-рилсы прошлогоднего фестиваля в Паттайе)
                          </p>
                          <button 
                            className="mt-6 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-mono tracking-widest uppercase text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveReelIndex(null);
                            }}
                          >
                            Закрыть
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer text of Reel */}
                    <div className="relative space-y-2 z-1">
                      <h4 className="font-display font-black leading-snug text-white text-lg sm:text-xl drop-shadow-sm">
                        {reel.title}
                      </h4>
                      <p className="text-[11px] text-white/90 leading-relaxed font-sans line-clamp-3">
                        {reel.desc}
                      </p>
                      
                      <div className="flex items-center gap-1 text-[10px] text-amber-300 font-mono font-bold pt-1">
                        <Play className="w-3 h-3 fill-amber-300" />
                        <span>Кликните для просмотра видео</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Photos Gallery styled like Image 3 circles */}
              <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2.5 h-8 bg-amber-500 rounded-full" />
                  <h4 className="font-display text-2xl font-black text-neutral-900">Галерея традиций и лиц</h4>
                </div>
                
                {/* 3 Grid layout reflecting Image 3 visual crops */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Photo 1: Dresses */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-stone-50 shadow-inner group">
                      <div className="absolute inset-0 bg-[#e4aaff]/20 group-hover:bg-transparent transition duration-300 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-white opacity-85 group-hover:hidden transition" />
                      </div>
                      {/* Realistic graphic or background mimicking dress image */}
                      <div 
                        className="w-full h-full bg-cover bg-center" 
                        style={{ backgroundImage: `url('https://picsum.photos/seed/yakut-dresses/400/400')` }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-display text-base font-bold text-neutral-900">Халадай и серебро</h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs">
                        Якутские красавицы в воздушных шелковых платьях-халадай и старинных серебряных украшениях илин кэбисэр.
                      </p>
                    </div>
                  </div>

                  {/* Photo 2: Pancakes */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-stone-50 shadow-inner group">
                      <div className="absolute inset-0 bg-[#ffc382]/20 group-hover:bg-transparent transition duration-300 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-white opacity-85 group-hover:hidden transition" />
                      </div>
                      <div 
                        className="w-full h-full bg-cover bg-center" 
                        style={{ backgroundImage: `url('https://picsum.photos/seed/yakut-pancakes/400/400')` }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-display text-base font-bold text-neutral-900">Солнечные оладьи</h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs">
                        Золотистые оладьи на тарелке — символ солнца, домашнего уюта и искреннего национального гостеприимства.
                      </p>
                    </div>
                  </div>

                  {/* Photo 3: Beach Games */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-stone-50 shadow-inner group">
                      <div className="absolute inset-0 bg-[#a6f0ff]/20 group-hover:bg-transparent transition duration-300 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-white opacity-85 group-hover:hidden transition" />
                      </div>
                      <div 
                        className="w-full h-full bg-cover bg-center" 
                        style={{ backgroundImage: `url('https://picsum.photos/seed/beach-sand-games/400/400')` }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-display text-base font-bold text-neutral-900">Богатыри на песке</h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs">
                        Соревнования по мас-рестлингу на берегу шумящего океана объединяют молодежь в честной дружеской борьбе.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* 🤝 DETAILED SPONSORS BOARD SUPPORT        */}
          {/* ========================================== */}
          <section id="sponsors-section" className="py-24 px-6 bg-gradient-to-b from-[#14321a] to-[#0a1e10] text-[#dbecd1]">
            <div className="max-w-5xl mx-auto space-y-12">
              
              <div className="text-center space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#cae2bc] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full font-bold">Опора Фестиваля</span>
                <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">Наши Спонсоры и Друзья</h3>
                <p className="text-neutral-300 text-xs sm:text-sm max-w-md mx-auto">Благодаря поддержке наших партнеров мы можем провести этот потрясающий этнический праздник бесплатно для всех гостей!</p>
              </div>

              {/* Master sponsor layout - Large Card for Mytona */}
              <div className="space-y-8">
                
                {/* General Sponsor Card */}
                <div className="bg-[#1f4728]/60 backdrop-blur rounded-[2.5rem] p-8 md:p-12 border border-emerald-500/25 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition duration-700" />
                  
                  {/* Glowing custom label */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 px-5 py-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-[#14321a] text-[10px] font-mono font-black uppercase rounded-full tracking-widest shadow-md">
                    ГЕНЕРАЛЬНЫЙ ПАРТНЕР
                  </div>

                  {/* Logo block */}
                  <div className="w-52 h-28 bg-[#dbecd1] rounded-3xl flex items-center justify-center p-6 relative shadow-inner flex-shrink-0">
                    <Sun className="absolute text-amber-500 opacity-15 w-24 h-24 rotate-12" />
                    <span className="font-display text-[#14321a] text-3xl font-black tracking-[0.25em] flex flex-col items-center">
                      MÝTONA
                      <span className="text-[7px] font-mono tracking-widest text-emerald-800 uppercase font-black">world publisher</span>
                    </span>
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <h4 className="font-display text-2xl font-black text-white tracking-wide uppercase">MYTONA IT GROUP</h4>
                    <p className="text-sm text-[#cae2bc] leading-relaxed">
                      Крупный глобальный издатель игр и технологических решений, основанный братьями Ушницкими в Якутске. Имея офисы и команды по всему миру, Mytona всегда поддерживает сограждан на международной арене. Наша глубокая благодарность за неоценимый вклад в закупку аутентичного реквизита, продуктов для дегустаций и призов лотереи!
                    </p>
                    <div className="text-[11px] font-mono text-[#99c4aa] flex items-center justify-center md:justify-start gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Поддерживает культуру Саха во Вьетнаме и Таиланде</span>
                    </div>
                  </div>
                </div>

                {/* Sub-sponsors / Partner layout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Co-Sponsor 1 */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#cae2bc] tracking-widest font-black uppercase">PARTNER I</span>
                      <h5 className="font-display text-lg font-bold text-white mt-2 mb-1">Yakutian Diaspora</h5>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Якутское землячество во Вьетнаме и Таиланде — координаторы народных игр, повара этно-закусок и ведущие осуохая.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-6 text-[10px] font-mono text-[#99c4aa]">
                      Организационная поддержка
                    </div>
                  </div>

                  {/* Co-Sponsor 2 */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#cae2bc] tracking-widest font-black uppercase">PARTNER II</span>
                      <h5 className="font-display text-lg font-bold text-white mt-2 mb-1">Palm Grove Da Nang</h5>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Премиальный пляжный курорт и ресторан Дананга, предоставивший лучшую береговую линию и лужайки для алгыса.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-6 text-[10px] font-mono text-[#99c4aa]">
                      Площадка и пляжная зона
                    </div>
                  </div>

                  {/* Co-Sponsor 3 */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#cae2bc] tracking-widest font-black uppercase">PARTNER III</span>
                      <h5 className="font-display text-lg font-bold text-white mt-2 mb-1">Khomus Sakha Union</h5>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Творческий центр хомусной музыки, доставивший аутентичные кованые инструменты для живых мелодий в руках мастеров.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-6 text-[10px] font-mono text-[#99c4aa]">
                      Инструментальная поддержка
                    </div>
                  </div>

                </div>

                {/* Call to sponsors */}
                <div className="text-center pt-8">
                  <p className="text-xs text-neutral-400 font-mono">
                    Хотите присоединиться в качестве партнера или оказать поддержку? Напишите нам в Telegram: <strong className="text-amber-300">@yhyaq_danang</strong>
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* 📍 CUSTOM TRAVEL GUIDE & VECTOR MAP        */}
          {/* ========================================== */}
          <section id="map-section" className="py-24 px-6 paper-texture border-b border-stone-200">
            <div className="max-w-5xl mx-auto space-y-12">
              
              <div className="text-center space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#a85a32] bg-[#fbf0ea] px-3.5 py-1.5 rounded-full font-bold">Карта События</span>
                <h3 className="font-display text-3xl sm:text-5xl font-black text-[#1c1c1c] tracking-tight">Где пройдет Ысыах</h3>
                <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto">Интерактивный путеводитель по побережью Дананга с отметками ключевых точек праздничного лагеря</p>
              </div>

              {/* Vector Map Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Visual custom SVG map representation */}
                <div className="lg:col-span-2 bg-[#dbecd1] border border-stone-200 p-4 sm:p-6 rounded-[2.5rem] shadow-inner relative overflow-hidden aspect-[4/3] flex flex-col justify-between">
                  {/* Coastline visual background representing Da Nang beach */}
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-sky-200/50 rounded-l-[10rem] pointer-events-none" />
                  {/* Wave pattern */}
                  <div className="absolute inset-y-0 right-0 w-24 bg-sky-300/20 border-l border-sky-400/20 pointer-events-none" />

                  {/* Header of Map */}
                  <div className="relative flex justify-between items-center bg-white/80 backdrop-blur px-4 py-2 rounded-2xl border border-stone-200/50 z-10 text-xs font-mono">
                    <span className="font-bold text-[#14321a] flex items-center gap-1">
                      <CompassIcon className="w-4 h-4 animate-spin" style={{ animationDuration: '20s' }} />
                      <span>КАРТА ДАНАНГА</span>
                    </span>
                    <span className="text-[#a5893d]">16°04&apos;N, 108°13&apos;E</span>
                  </div>

                  {/* Nodes Pins overlaying the SVG */}
                  <div className="relative flex-grow h-64">
                    {/* Beach Wave Line */}
                    <svg className="absolute inset-0 w-full h-full text-emerald-800/25 select-none pointer-events-none" viewBox="0 0 400 300" fill="none">
                      <path d="M120,0 C160,100 80,200 240,300" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                    {/* Point 1: Da Nang International Airport */}
                    <div className="absolute top-12 left-10 flex flex-col items-center group z-10">
                      <div className="w-3.5 h-3.5 bg-neutral-600 rounded-full border-2 border-white flex items-center justify-center cursor-help animate-pulse" />
                      <div className="bg-white/95 px-2.5 py-1 rounded-xl shadow border border-stone-200 text-[10px] font-mono mt-1 whitespace-nowrap">
                        ✈️ Аэропорт Дананга
                      </div>
                    </div>

                    {/* Point 2: Dragon Bridge (Мост Дракона) */}
                    <div className="absolute top-[40%] left-[25%] flex flex-col items-center group z-10">
                      <div className="w-3.5 h-3.5 bg-yellow-600 rounded-full border-2 border-white flex items-center justify-center cursor-help animate-pulse" />
                      <div className="bg-white/95 px-2.5 py-1 rounded-xl shadow border border-stone-200 text-[10px] font-mono mt-1 whitespace-nowrap">
                        🐉 Мост Дракона
                      </div>
                    </div>

                    {/* Point 3: Palm Grove Resort & Event Lawn (Ысыах Venue) */}
                    <div className="absolute top-[55%] right-[20%] flex flex-col items-center group z-20">
                      {/* Pulse ring */}
                      <span className="absolute flex h-8 w-8 -top-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-8 w-8 bg-orange-400/10"></span>
                      </span>

                      <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full border-3 border-white flex items-center justify-center cursor-pointer shadow-lg">
                        <Sun className="w-3 h-3 text-white fill-white animate-spin" style={{ animationDuration: '10s' }} />
                      </div>
                      
                      <div className="bg-[#14321a] text-white px-3 py-1.5 rounded-2xl shadow-xl border border-[#cae2bc]/10 text-xs font-display font-black mt-2 text-center whitespace-nowrap flex flex-col items-center">
                        <span>☀️ Palm Grove Resort</span>
                        <span className="text-[8px] font-mono text-amber-300 font-bold uppercase tracking-widest mt-0.5">МЕСТО ПРАЗДНИКА</span>
                      </div>
                    </div>

                    {/* Point 4: My Khe beach coastline */}
                    <div className="absolute bottom-8 right-6 flex flex-col items-center group z-10">
                      <div className="w-3 h-3 bg-sky-600 rounded-full border-2 border-white flex items-center justify-center cursor-help animate-pulse" />
                      <div className="bg-white/95 px-2.5 py-1 rounded-xl shadow border border-stone-200 text-[10px] font-mono mt-1 whitespace-nowrap">
                        🏖️ Пляж Ми Кхе (My Khe)
                      </div>
                    </div>

                  </div>

                  {/* Footer informational */}
                  <div className="relative text-[10px] font-mono text-emerald-900 bg-white/60 p-2.5 rounded-2xl border border-stone-200/40">
                    💡 <strong className="font-bold">Как добраться:</strong> Palm Grove Resort находится в 12 минутах на такси от центрального Моста Дракона. Ориентир — въезд перед ухоженным зеленым парком на побережье.
                  </div>
                </div>

                {/* Practical guide & advisory list details */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-[2rem] border border-stone-200/80 shadow-sm space-y-4">
                    <h4 className="font-display text-lg font-black text-neutral-900 flex items-center gap-2">
                      <Info className="w-5 h-5 text-amber-500" />
                      <span>Памятка Участника</span>
                    </h4>
                    
                    <ul className="space-y-3 text-xs leading-normal text-neutral-600">
                      <li className="flex gap-2 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-black font-semibold">Дресс-код (совет):</strong> Мы поощряем стилизованную национальную одежду, белые или кремовые легкие наряды изо льна и ситца — они великолепно сочетаются с солнцем и морем.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-black font-semibold">Что взять с собой:</strong> Солнцезащитные очки, коврик для сидения на песке во время хоровода, головной убор и отличное настроение!</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-black font-semibold">Для детей:</strong> На площадке Palm Grove организован тенистый детский уголок с играми на песке, аниматорами и чистой питьевой водой.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-black font-semibold">Сборные игры:</strong> Записаться на спортивные состязания по мас-рестлингу можно прямо на месте или заполнив форму RSVP внизу страницы.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Weather widget */}
                  <div className="bg-[#cae2bc]/50 p-6 rounded-[2rem] border border-emerald-800/10 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#14321a] tracking-widest font-black uppercase">Прогноз погоды (20 Июня)</span>
                      <h5 className="font-display text-xl font-black text-[#14321a] mt-1">Солнечно, +32°C</h5>
                      <p className="text-[11px] text-[#2a452d] mt-1">Идеальная погода для поклонения солнцу и купания на закате</p>
                    </div>
                    <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-white text-3xl shadow-lg border-2 border-white animate-sun-spin">
                      ☀️
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* ========================================== */}
          {/* 📬 RSVP ATTENDANCE FORM                    */}
          {/* ========================================== */}
          <section id="form-section" className="py-24 px-6 bg-white border-b border-stone-200">
            <div className="max-w-3xl mx-auto space-y-12">
              
              <div className="text-center space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 bg-[#dbecd1] px-3.5 py-1.5 rounded-full font-bold">Будем Рады Вам!</span>
                <h3 className="font-display text-3xl sm:text-5xl font-black text-[#1c1c1c] tracking-tight">Будете ли Вы с нами?</h3>
                <p className="text-neutral-500 text-xs sm:text-sm max-w-sm mx-auto">Пожалуйста, заполните эту быструю анкету, чтобы организаторы и повара могли рассчитать количество оладий, кумыса и памятных призов!</p>
              </div>

              {/* Attendance counter */}
              <div className="bg-stone-50 border border-stone-200 rounded-[2.5rem] p-6 text-center shadow-inner flex flex-col sm:flex-row items-center justify-around gap-4">
                <div className="flex flex-col">
                  <span className="font-display text-4xl font-extrabold text-[#14321a]">
                    {totalGuestsSum}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mt-1">подтвержденных гостей</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-stone-200" />
                <div className="flex flex-col">
                  <span className="font-display text-4xl font-extrabold text-[#e65555]">
                    {totalDanceOsuokhayCount}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mt-1">будут танцевать Осуохай</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-stone-200" />
                <div className="flex flex-col">
                  <span className="font-display text-4xl font-extrabold text-cyan-800">
                    {totalPlaySportsCount}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mt-1">участников пляжных игр</span>
                </div>
              </div>

              {/* Form implementation */}
              <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-stone-200/80 shadow-lg relative">
                {isSubmitSuccess ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center p-8 text-center space-y-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-3xl">
                      ✓
                    </div>
                    <h4 className="font-display text-2xl font-black text-neutral-900">Вы успешно записаны!</h4>
                    <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
                      Спасибо за подтверждение! Ваше теплое присутствие украсит Ысыах в Дананге. Обязательно вступайте в Осуохай 20 июня!
                    </p>
                    <p className="text-xs text-amber-500 font-mono">
                      Оладьи и призы для вас зарезервированы 🥞🎁
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name field */}
                      <div className="space-y-2">
                        <label htmlFor="form-name" className="block text-xs font-mono font-bold tracking-wider text-neutral-600 uppercase">
                          Ваше Имя и Фамилия *
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Например, Саргылана"
                          className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:bg-white focus:border-[#14321a] focus:ring-1 focus:ring-[#14321a] outline-none text-sm transition"
                        />
                      </div>

                      {/* Guest Count */}
                      <div className="space-y-2">
                        <label htmlFor="form-guests" className="block text-xs font-mono font-bold tracking-wider text-neutral-600 uppercase">
                          Количество гостей (включая вас) *
                        </label>
                        <div className="relative flex items-center bg-stone-50 border border-stone-200 rounded-2xl">
                          <button
                            id="guest-decrease"
                            type="button"
                            onClick={() => setFormGuests(prev => Math.max(1, prev - 1))}
                            className="px-4 py-3.5 hover:bg-stone-100 text-stone-500 transition text-lg font-bold rounded-l-2xl"
                          >
                            -
                          </button>
                          <input
                            id="form-guests"
                            type="number"
                            required
                            min="1"
                            max="10"
                            value={formGuests}
                            onChange={(e) => setFormGuests(parseInt(e.target.value) || 1)}
                            className="w-full py-3.5 bg-transparent outline-none text-center text-sm font-bold"
                          />
                          <button
                            id="guest-increase"
                            type="button"
                            onClick={() => setFormGuests(prev => Math.min(10, prev + 1))}
                            className="px-4 py-3.5 hover:bg-stone-100 text-stone-500 transition text-lg font-bold rounded-r-2xl"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Contact Telegram/Phone */}
                      <div className="space-y-2">
                        <label htmlFor="form-contact" className="block text-xs font-mono font-bold tracking-wider text-neutral-600 uppercase">
                          Telegram @username или телефон *
                        </label>
                        <input
                          id="form-contact"
                          type="text"
                          required
                          value={formContact}
                          onChange={(e) => setFormContact(e.target.value)}
                          placeholder="@yhyaq_friend"
                          className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:bg-white focus:border-[#14321a] focus:ring-1 focus:ring-[#14321a] outline-none text-sm transition"
                        />
                      </div>

                      {/* Food & Diet constraints */}
                      <div className="space-y-2">
                        <label htmlFor="form-diet" className="block text-xs font-mono font-bold tracking-wider text-neutral-600 uppercase">
                          Пожелания по еде или аллергии
                        </label>
                        <input
                          id="form-diet"
                          type="text"
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          placeholder="Вегетарианец, без лактозы, веган"
                          className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:bg-white focus:border-[#14321a] focus:ring-1 focus:ring-[#14321a] outline-none text-sm transition"
                        />
                      </div>

                    </div>

                    {/* Interactive checkboxes */}
                    <div className="p-4 bg-stone-50 rounded-2xl space-y-4 border border-stone-100">
                      <div className="flex items-center gap-3">
                        <input
                          id="form-dance"
                          type="checkbox"
                          checked={danceOsuokhay}
                          onChange={(e) => setDanceOsuokhay(e.target.checked)}
                          className="w-4.5 h-4.5 rounded border-stone-300 text-[#14321a] focus:ring-[#14321a] accent-[#14321a]"
                        />
                        <label htmlFor="form-dance" className="text-xs sm:text-sm text-neutral-700 select-none cursor-pointer leading-none">
                          🙋‍♂️ Да, я с удовольствием поучаствую в хороводе Осуохай!
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          id="form-sports"
                          type="checkbox"
                          checked={playSports}
                          onChange={(e) => setPlaySports(e.target.checked)}
                          className="w-4.5 h-4.5 rounded border-stone-300 text-[#14321a] focus:ring-[#14321a] accent-[#14321a]"
                        />
                        <label htmlFor="form-sports" className="text-xs sm:text-sm text-neutral-700 select-none cursor-pointer leading-none">
                          💪 Хочу соревноваться в пляжном мас-рестлинге и народных играх!
                        </label>
                      </div>
                    </div>

                    <button
                      id="form-submit-btn"
                      type="submit"
                      className="w-full py-4 bg-[#14321a] hover:bg-[#1a4122] text-white font-display uppercase tracking-widest text-sm font-bold rounded-2xl shadow-md transition"
                    >
                      Подтвердить Мое Участие
                    </button>

                  </form>
                )}
              </div>

              {/* Secret toggle for Coordinator Panel */}
              <div className="flex justify-center pt-4">
                <button
                  id="coordinator-toggle-btn"
                  onClick={() => setShowCoordinator(!showCoordinator)}
                  className="text-[10px] font-mono text-neutral-400 hover:text-neutral-600 uppercase tracking-widest flex items-center gap-1 transition"
                >
                  {showCoordinator ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>Панель Координатора (Администрирование)</span>
                </button>
              </div>

              {/* ========================================== */}
              {/* 📊 COORDINATOR PANEL (REALLY ENRICHED OVERLAY) */}
              {/* ========================================== */}
              <AnimatePresence>
                {showCoordinator && (
                  <motion.div
                    id="coordinator-panel"
                    className="bg-neutral-900 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 text-white space-y-6 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-amber-400" />
                        <h4 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider">Панель Учета Ысыах 2026</h4>
                      </div>
                      <span className="text-[9px] font-mono bg-amber-400/10 text-amber-300 px-3 py-1 rounded-full border border-amber-400/20">
                        Административный доступ
                      </span>
                    </div>

                    {!isAuthorized ? (
                      // Auth request form
                      <form onSubmit={handleCoordinatorAuth} className="space-y-4 max-w-sm mx-auto p-4 text-center">
                        <p className="text-xs text-neutral-400 font-mono">
                          Для просмотра списка гостей и статистики введите пароль координатора. Пароль по умолчанию: <strong className="text-amber-300">yhyaq2026</strong>
                        </p>
                        <div className="space-y-1">
                          <input
                            id="coord-pass-input"
                            type="password"
                            value={coordinatorPassword}
                            onChange={(e) => setCoordinatorPassword(e.target.value)}
                            placeholder="Введите пароль..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-center text-sm outline-none focus:border-amber-400 text-white"
                          />
                          {authError && <p className="text-[10px] text-rose-400 font-mono">{authError}</p>}
                        </div>
                        <button
                          id="coord-auth-btn"
                          type="submit"
                          className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-[#15110d] font-mono text-xs font-bold uppercase rounded-lg transition"
                        >
                          Войти в панель
                        </button>
                      </form>
                    ) : (
                      // Real Dashboard content loaded from local storage
                      <div className="space-y-6">
                        {/* Statistics boxes */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-2xl font-black text-amber-400">{rsvpList.length}</span>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Анкет всего</span>
                          </div>
                          
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-2xl font-black text-emerald-400">{totalGuestsSum}</span>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Людей приедет</span>
                          </div>

                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-2xl font-black text-pink-400">
                              {Math.round((totalDanceOsuokhayCount / Math.max(1, rsvpList.length)) * 100)}%
                            </span>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Танцуют Осуохай</span>
                          </div>

                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-2xl font-black text-sky-400">
                              {totalPlaySportsCount} чел.
                            </span>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Записаны на спорт</span>
                          </div>
                        </div>

                        {/* List representation */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-mono text-neutral-400">
                            <span>Зарегистрированные участники ({rsvpList.length})</span>
                            <span>Действия</span>
                          </div>

                          <div className="max-h-60 overflow-y-auto space-y-2.5 pr-2">
                            {rsvpList.map((attendee) => (
                              <div
                                key={attendee.id}
                                className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                              >
                                <div>
                                  <div className="font-bold flex items-center gap-2">
                                    <span className="text-white text-sm">{attendee.name}</span>
                                    <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] rounded-md font-bold">
                                      {attendee.guestsCount} чел.
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-neutral-400 text-[10px] font-mono mt-1">
                                    <span>Связь: <strong className="text-white">{attendee.contact}</strong></span>
                                    <span>•</span>
                                    <span>Диета: <strong className="text-amber-200">{attendee.dietaryNote}</strong></span>
                                  </div>
                                  <div className="flex gap-2 mt-1.5">
                                    {attendee.willDanceOsuokhay && (
                                      <span className="px-1.5 py-0.2 bg-rose-500/15 text-rose-300 text-[8px] font-mono rounded">Осуохай</span>
                                    )}
                                    {attendee.willPlaySports && (
                                      <span className="px-1.5 py-0.2 bg-sky-500/15 text-sky-300 text-[8px] font-mono rounded">Спорт игры</span>
                                    )}
                                  </div>
                                </div>

                                <button
                                  id={`delete-attendee-${attendee.id}`}
                                  className="text-stone-400 hover:text-rose-400 transition text-[10px] font-mono uppercase bg-red-950/20 px-2 py-1 rounded"
                                  onClick={() => handleDeleteAttendee(attendee.id)}
                                >
                                  Удалить
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Export / Data instructions inside admin */}
                        <div className="text-[10px] text-neutral-400 font-mono leading-relaxed bg-[#1b1c19] p-3 rounded-xl border border-white/5">
                          📒 <strong className="text-white">Обратите внимание:</strong> Данные RSVP хранятся в защищенном локальном хранилище (localStorage) вашего браузера. Вы можете свободно добавлять, редактировать или удалять гостей в рамках этой закрытой панели. При интеграции с Firestore информация будет общаться в единое серверное облако для всех операторов!
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </section>

          {/* ========================================== */}
          {/* 🍁 REAL FOOTER AND CREDITS                 */}
          {/* ========================================== */}
          <footer className="bg-[#0f110c] text-white/50 py-12 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
                <Sun className="w-8 h-8 text-amber-400 animate-spin mb-2" style={{ animationDuration: '40s' }} />
                <h5 className="font-display text-white font-extrabold tracking-wider uppercase">ETHNOFEST ЫСЫАХ 2026</h5>
                <p className="text-[11px] max-w-sm leading-normal">
                  Традиции Саха на Золотом Берегу Вьетнама. Летнее солнцестояние и великое сплочение на берегах Дананга.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-xs font-mono">
                <a href="#hero-section" className="hover:text-white transition">Главная</a>
                <span>•</span>
                <a href="#philosophy-section" className="hover:text-white transition">Традиции</a>
                <span>•</span>
                <a href="#program-section" className="hover:text-white transition">Программа</a>
                <span>•</span>
                <a href="#media-section" className="hover:text-white transition">Архив 2025</a>
                <span>•</span>
                <a href="#map-section" className="hover:text-white transition">Карта</a>
              </div>

              <div className="flex flex-col items-center md:items-end text-[10px] font-mono space-y-1">
                <span>© Yhyaq Da Nang Event Org, 2026.</span>
                <span>Генеральный спонсор MYTONA IT.</span>
                <span className="text-neutral-500 uppercase tracking-widest mt-1">КЮН АЙЫЫ ТАҤАРА БАРЫБЫТЫН ХАРЫСТААТЫН!</span>
              </div>

            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}
