"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaMeetup } from "react-icons/fa6";
import { IconArrowUpRight } from "@tabler/icons-react";

import { DotPattern } from "@/components/ui/dot-pattern";
import { LightRays } from "@/components/ui/light-rays";

export function MeetupSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative w-full bg-black text-slate-200 py-16 sm:py-20 px-6 sm:px-12 lg:px-16 overflow-hidden flex items-center justify-center font-[var(--font-geist-sans)]">
      {/* ── Seamless Gradient Transitions (Blends seamlessly into Events & Teams) ── */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none z-20" />

      {/* ── 1. Angled Spotlight Light Rays from Top-Left over the Cosmic Globe ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <LightRays
          raysOrigin="top-left"
          raysColor="#ffffff"
          raysSpeed={0.6}
          lightSpread={0.9}
          rayLength={2.8}
          followMouse={true}
          mouseInfluence={0.06}
          noiseAmount={0.03}
          distortion={0.03}
          pulsating={false}
          fadeDistance={1.3}
          saturation={1}
          className="w-full h-full"
        />
      </div>

      {/* ── 2. Subtle Cyber Dot Matrix Background with Radial Fade ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotPattern
          className="opacity-25 [mask-image:radial-gradient(800px_circle_at_35%_50%,white,transparent_80%)]"
          width={22}
          height={22}
          cx={1}
          cy={1}
          cr={1}
        />
      </div>

      {/* ── 3. Ambient Deep-Space Emerald Nebula Glow ── */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[600px] h-[350px] rounded-full bg-emerald-500/[0.04] blur-[150px] -translate-x-24" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* ── LEFT: Circular Cosmic Globe Sphere with Orbiting Satellites ── */}
        <motion.div
          {...reveal(0.1)}
          className="flex-1 flex items-center justify-center relative w-full min-h-[300px] sm:min-h-[360px]"
        >
          {/* Subtle Outer Orbital Track Rings */}
          <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border border-white/[0.05] pointer-events-none" />
          <div className="absolute w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] rounded-full border border-dashed border-emerald-500/[0.12] pointer-events-none" />

          {/* ── Faint Sonar / Radar Broadcasting Waves (Radiating from the Sphere) ── */}
          <motion.div
            animate={{ scale: [1, 1.9, 2.5], opacity: [0.35, 0.12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeOut" }}
            className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-emerald-500/30 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.9, 2.5], opacity: [0.3, 0.1, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 2.5, ease: "easeOut" }}
            className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-teal-400/20 pointer-events-none"
          />

          {/* ── Orbiting Satellite 1 (Neon Green) ── */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] rounded-full pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#00e676] shadow-[0_0_14px_#00e676]" />
          </motion.div>

          {/* ── Orbiting Satellite 2 (Cyan / Sky) ── */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full pointer-events-none"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_12px_#38bdf8]" />
          </motion.div>

          {/* ── Perfect Circular Cosmic Globe (Matching Image 1) ── */}
          <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-[#11161d] via-[#090d14] to-[#04060a] border border-white/10 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_40px_rgba(0,230,118,0.12)] flex items-center justify-center group hover:border-emerald-500/40 hover:shadow-[0_10px_45px_rgba(0,0,0,0.9),0_0_50px_rgba(0,230,118,0.22)] transition-all duration-500 overflow-hidden">
            {/* Inner Soft Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.14)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Clean Meetup Logo in Center */}
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                <FaMeetup className="w-5 h-5 sm:w-6 sm:h-6 text-[#00e676]" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Meetup
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: Typography, Copy, Stats & Action ── */}
        <motion.div
          {...reveal(0.2)}
          className="flex-1 max-w-lg space-y-6"
        >
          {/* Main 3-Line Heading with Geist Sans */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-[1.12]">
            Every event. <br />
            Every announcement. <br />
            <span className="text-[#00e676]">
              One place.
            </span>
          </h2>

          {/* Description Copy */}
          <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed max-w-md">
            Our official Meetup group is the single source of truth — workshops, speaker sessions, and community updates all flow through here. RSVP and get reminders.
          </p>

          {/* ── Key Metrics & Stats Row ── */}
          <div className="grid grid-cols-3 gap-6 pt-5 border-t border-white/[0.08]">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                50+
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400 mt-1">
                BUILDER
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                6
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400 mt-1">
                ACTIVE WINGS
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                10+
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400 mt-1">
                AWS SERVICES
              </div>
            </div>
          </div>

          {/* ── CTA Action & Badges ── */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            {/* Join Meetup Primary Button */}
            <a
              href="https://www.meetup.com/aws-sbg-at-charotar-university-of-science-and-technology/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00e676] text-black font-semibold text-sm shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer group"
            >
              <span>Join our Meetup group</span>
              <IconArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Category Activity Filter Badges */}
            <div className="flex items-center gap-2">
              {["Workshops", "Community", "Talks"].map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default MeetupSection;
