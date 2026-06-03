'use client';

import { motion } from 'motion/react';

interface SolarGatewayProps {
  onEnter: () => void;
}

export default function SolarGateway({ onEnter }: SolarGatewayProps) {
  return (
    <motion.div
      id="solar-gateway"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03402C] text-white p-6 overflow-hidden"
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {/* Background aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,218,81,0.15)_0%,transparent_70%)] animate-aura" />

      {/* Brand Ornament */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        <img
          src="/assets/form-geometric-1.svg"
          alt=""
          className="absolute inset-0 w-full h-full opacity-40 animate-form-breathe brand-form"
        />
        <img
          src="/assets/form-organic-1.svg"
          alt=""
          className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] opacity-30 animate-float brand-form"
        />

        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <img
            src="/assets/yhq-wordmark.svg"
            alt="Yhyaq"
            className="w-48 sm:w-64"
          />
          <span className="font-display text-[10px] sm:text-xs text-[#CEFDDE] tracking-[0.3em] uppercase">
            Da Nang 2026
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="z-10 text-center max-w-sm mt-12 space-y-6">
        <motion.button
          id="enter-button"
          className="px-8 py-3.5 bg-[#0BDA51] hover:bg-[#09c748] text-[#03402C] rounded-full font-display font-semibold uppercase tracking-wider text-sm shadow-[0_4px_25px_rgba(11,218,81,0.4)] cursor-pointer transition-all duration-300"
          whileTap={{ scale: 0.96 }}
          onClick={onEnter}
        >
          Войти в мир Солнца
        </motion.button>

        <p className="text-xs text-[#CEFDDE]/70 font-body tracking-wide px-4">
          Включите звук на устройстве перед входом для атмосферного музыкального обряда
        </p>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-6 left-0 right-0 py-2 border-t border-white/10 bg-white/5 opacity-60 flex justify-center space-x-6 text-[10px] sm:text-xs font-body tracking-widest text-[#CEFDDE]">
        <span>DA NANG</span>
        <span>•</span>
        <span>JUNE 20 2026</span>
        <span>•</span>
        <span>ETHNOFEST ЫСЫАХ</span>
      </div>
    </motion.div>
  );
}
