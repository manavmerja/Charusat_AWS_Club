"use client";

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

export function HeroStarsBackground() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] flex items-center justify-center overflow-hidden font-[var(--font-space-grotesk)] select-none">
      {/* Animate-UI Stars Background */}
      <StarsBackground
        starColor="#FFF"
        factor={0.05}
        speed={50}
        className="absolute inset-0 z-0 bg-[#0b0f19]"
      />

      {/* Vibrant Soft Green Ambient Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[550px] pointer-events-none z-10 opacity-70"
        style={{
          background: "radial-gradient(ellipse 85% 65% at 50% 100%, rgba(0, 230, 118, 0.28) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 85%)"
        }}
      />

      {/* Seamless Fade Transition to About Section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0b0f19]/80 to-[#0b0f19] pointer-events-none z-20" />
    </div>
  );
}

export default HeroStarsBackground;
