"use client";

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

export function HeroStarsBackground() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] flex items-center justify-center overflow-hidden">
      {/* Animate-UI Stars Background */}
      <StarsBackground
        starColor="#FFF"
        factor={0.05}
        speed={50}
        className="absolute inset-0 z-0 bg-[#0b0f19]"
      />

      {/* Vibrant Soft Green Ambient Glow (Positioned on top of stars background with mix blend) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none z-10 opacity-60"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0, 230, 118, 0.45) 0%, rgba(0, 230, 118, 0.15) 45%, transparent 80%)"
        }}
      />

      {/* Hero Welcome Overlay */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Welcome to club of AWS buddy
        </h1>
      </div>
    </div>
  );
}
