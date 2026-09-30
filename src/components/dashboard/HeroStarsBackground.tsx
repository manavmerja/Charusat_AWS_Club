"use client";

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

export function HeroStarsBackground() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] flex items-center justify-center overflow-hidden">
      {/* Animate-UI Stars Background */}
      <StarsBackground
        starColor="#00e676"
        factor={0.05}
        speed={40}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_#0f172a_0%,_#0b0f19_100%)]"
      />

      {/* Hero Welcome Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/30 inline-block shadow-[0_0_15px_rgba(0,230,118,0.2)]">
          AWS Cloud Club • CHARUSAT
        </span>
        <h1 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Welcome to club of <span className="text-[#00e676] drop-shadow-[0_0_25px_rgba(0,230,118,0.5)]">AWS buddy</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Empowering student builders with cloud technology, hands-on workshops, and interactive tech experiences.
        </p>
      </div>
    </div>
  );
}
