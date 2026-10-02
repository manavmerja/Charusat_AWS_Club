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

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-20 flex flex-col items-start justify-center">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight max-w-5xl mb-8">
          AWS SBG<br />
          Community<br />
          Charusat
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12 font-sans font-light leading-relaxed">
          AWS Student Builder Group (SBG) Charusat is a student-led community empowering the next generation of cloud builders through hands-on learning, technical events and global community collaboration.
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button className="h-12 px-8 flex items-center justify-center border border-white text-white font-semibold uppercase tracking-wider text-sm">
            JOIN COMMUNITY
          </button>
          <button className="h-12 px-8 flex items-center justify-center border border-white text-white font-semibold uppercase tracking-wider text-sm">
            EXPLORE EVENTS
          </button>
        </div>
      </div>

      {/* Seamless Fade Transition to About Section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0b0f19]/80 to-[#0b0f19] pointer-events-none z-10" />
    </div>
  );
}

export default HeroStarsBackground;
