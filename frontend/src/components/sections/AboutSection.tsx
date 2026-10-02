'use client';

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";
import { Scales } from "@/components/ui/scales";

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center bg-[#0b0f19] overflow-hidden px-6 sm:px-12 lg:px-20 py-24 sm:py-32 font-[var(--font-space-grotesk)]",
        className
      )}
    >
      {/* 1. Aceternity UI Spotlight shining from top-left */}
      <Spotlight
        className="-top-40 left-0 md:left-20 md:-top-20"
        fill="#00e676"
      />

      {/* 2. Seamless Blend Transition from Hero Section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0b0f19] to-transparent pointer-events-none z-20" />

      {/* 3. Background Subtle Grid Pattern */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none opacity-25 z-0",
          "[background-size:32px_32px]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        )}
      />

      {/* 4. Subtle Ambient Vignette Mask */}
      <div className="pointer-events-none absolute inset-0 bg-[#0b0f19] [mask-image:radial-gradient(ellipse_80%_75%_at_center,transparent_30%,#0b0f19_100%)] z-[1]" />

      {/* 5. Main Two-Column Container */}
      <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Typography & Club Info */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              ABOUT AWS SBG CHARUSAT
            </span>
          </div>

          {/* Main Headline (Clean solid high-end typography without harsh contrast gradient) */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            We don&apos;t just learn cloud.{" "}
            <span className="block mt-1 text-[#00e676]">
              We build on it.
            </span>
          </h2>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            <p>
              <strong className="text-white font-semibold">AWS Student Builder Group Charusat at CHARUSAT</strong> is a student-led community where aspiring developers, cloud engineers, AI enthusiasts, and builders come together to learn by building.
            </p>
            <p className="text-slate-400">
              Instead of only attending sessions, members create real-world applications, deploy production-ready projects on AWS, contribute to open-source, prepare for certifications, participate in hackathons, and collaborate with builders across the global AWS community.
            </p>
            <p className="text-slate-300 pt-1">
              Supported by{" "}
              <a
                href="https://aws.amazon.com/developer/community/students/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00e676] font-medium underline underline-offset-4 decoration-[#00e676]/40 hover:decoration-[#00e676] transition-colors"
              >
                AWS Builder Center
              </a>
              , our mission is simple:
            </p>
          </div>

          {/* Punchy Mission Tagline with Crisp, Balanced Colors */}
          <div className="pt-3 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            <span className="text-[#00e676]">Learn.</span>{" "}
            <span className="text-white">Build.</span>{" "}
            <span className="text-[#00e676]">Share.</span>{" "}
            <span className="text-white">Grow.</span>
          </div>
        </div>

        {/* Right Column: Crystal Clear Framed Group Photo with Scales Blending */}
        <div className="lg:col-span-5 flex items-center justify-center w-full">
          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center p-4 sm:p-6">
            
            {/* Outer Wrapper with Scales Around the Photo */}
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0e1526]/80 p-3 sm:p-4 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              
              {/* Left Scales */}
              <div className="absolute -inset-y-[15%] -left-6 sm:-left-8 h-[130%] w-6 sm:w-8 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
                <Scales size={8} orientation="diagonal" color="rgba(0, 230, 118, 0.25)" className="rounded-lg" />
              </div>

              {/* Right Scales */}
              <div className="absolute -inset-y-[15%] -right-6 sm:-right-8 h-[130%] w-6 sm:w-8 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
                <Scales size={8} orientation="diagonal" color="rgba(0, 230, 118, 0.25)" className="rounded-lg" />
              </div>

              {/* Top Scales */}
              <div className="absolute -inset-x-[15%] -top-6 sm:-top-8 h-6 sm:h-8 w-[130%] pointer-events-none z-0 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <Scales size={8} orientation="diagonal" color="rgba(0, 230, 118, 0.25)" className="rounded-lg" />
              </div>

              {/* Bottom Scales */}
              <div className="absolute -inset-x-[15%] -bottom-6 sm:-bottom-8 h-6 sm:h-8 w-[130%] pointer-events-none z-0 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <Scales size={8} orientation="diagonal" color="rgba(0, 230, 118, 0.25)" className="rounded-lg" />
              </div>

              {/* Inner Group Photo Container (Crisp, High-Res, Perfectly Sized) */}
              <div className="relative z-10 h-full w-full overflow-hidden rounded-xl bg-[#070b14] ring-1 ring-white/15 shadow-inner">
                <Image
                  src="/AWS Roots/Group_Photo.jpeg"
                  alt="AWS Student Builder Group at CHARUSAT"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 45vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutSection;
