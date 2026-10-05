"use client";

import React, { useEffect, useId, useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CircuitBridgeVariant =
  | "hero-to-about"
  | "about-to-events"
  | "meetup-to-teams";

interface CircuitBridgeTrackProps {
  className?: string;
  variant?: CircuitBridgeVariant;
}

interface VariantConfig {
  viewBox: string;
  curveD: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  heightClass: string;
  svgWidthClass: string;
  alignClass: string;
}

const VARIANT_CONFIGS: Record<CircuitBridgeVariant, VariantConfig> = {
  // Single Clean Zig-Zag S-Curve:
  // Starts directly under JOIN COMMUNITY (x:32, y:0),
  // swoops right (x:180, y:85), and curves down-left to land above ABOUT AWS SBG (x:60, y:175)
  "hero-to-about": {
    viewBox: "0 0 380 180",
    curveD: "M 32 0 C 32 50, 180 35, 180 85 S 60 135, 60 175",
    startPoint: { x: 32, y: 0 },
    endPoint: { x: 60, y: 175 },
    heightClass: "h-28 sm:h-44 md:h-52",
    svgWidthClass: "w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px]",
    alignClass: "justify-start",
  },
  // Sweeps from About SBG on the left across into the Events cards
  "about-to-events": {
    viewBox: "0 0 800 160",
    curveD: "M 160 0 C 160 55, 300 45, 420 80 S 580 110, 580 160",
    startPoint: { x: 160, y: 0 },
    endPoint: { x: 580, y: 160 },
    heightClass: "h-28 sm:h-36 md:h-40",
    svgWidthClass: "w-full max-w-[480px] sm:max-w-[650px] md:max-w-[750px]",
    alignClass: "justify-start",
  },
  // Left flank curve from Meetup Cosmic Globe into Community Team
  "meetup-to-teams": {
    viewBox: "0 0 600 160",
    curveD: "M 120 0 C 120 50, 220 40, 240 80 S 140 120, 140 160",
    startPoint: { x: 120, y: 0 },
    endPoint: { x: 140, y: 160 },
    heightClass: "h-28 sm:h-36 md:h-40",
    svgWidthClass: "w-full max-w-[380px] sm:max-w-[480px] md:max-w-[560px]",
    alignClass: "justify-start",
  },
};

export function CircuitBridgeTrack({
  className,
  variant = "about-to-events",
}: CircuitBridgeTrackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const trainRef = useRef<SVGGElement | null>(null);
  const reduceMotion = useReducedMotion();
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9-_]/g, "");
  const laserGradId = `bridge-laser-${cleanId}`;
  const headlightGradId = `shuttle-headlight-${cleanId}`;

  const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS["about-to-events"];

  // Scroll tracking isolated to this section bridge (lightweight 60fps on both mobile & desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 15%"],
  });

  // Responsive spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 26,
    restDelta: 0.001,
  });

  // Smoothly move the traveling train along the curve with 0 React re-renders
  useEffect(() => {
    if (reduceMotion || !pathRef.current) return;
    const path = pathRef.current;
    let len = 0;
    try {
      len = path.getTotalLength();
    } catch {
      return;
    }

    if (!len) return;

    return smoothProgress.on("change", (latest) => {
      if (!trainRef.current) return;
      const progress = Math.max(0, Math.min(1, latest));
      const dist = progress * len;
      const pt = path.getPointAtLength(dist);
      const lookahead = Math.min(len, dist + 2);
      const ptAhead = path.getPointAtLength(lookahead);
      const dx = ptAhead.x - pt.x;
      const dy = ptAhead.y - pt.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      trainRef.current.setAttribute(
        "transform",
        `translate(${pt.x}, ${pt.y}) rotate(${angle})`
      );
    });
  }, [smoothProgress, reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-[100vw] overflow-x-clip select-none z-20 bg-black pointer-events-none",
        config.heightClass,
        className
      )}
      aria-hidden="true"
    >
      {/* Aligned within the site's standard max-w-7xl responsive container */}
      <div
        className={cn(
          "w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative h-full flex items-center",
          config.alignClass
        )}
      >
        {/* Subtle emerald ambient aura behind the track curve */}
        <div
          className="absolute rounded-full bg-emerald-500/[0.07] blur-[36px] pointer-events-none"
          style={{
            left: `${config.startPoint.x + (config.endPoint.x - config.startPoint.x) / 2}px`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "240px",
            height: "80px",
          }}
        />

        {/* High-Performance Vector SVG */}
        <svg
          className={cn("h-full overflow-visible", config.svgWidthClass)}
          viewBox={config.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Active Electrified Neon Beam Gradient */}
            <linearGradient
              id={laserGradId}
              x1={config.startPoint.x}
              y1={config.startPoint.y}
              x2={config.endPoint.x}
              y2={config.endPoint.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00e676" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#00e676" stopOpacity="1" />
              <stop offset="60%" stopColor="#00f5d4" stopOpacity="1" />
              <stop offset="85%" stopColor="#00e676" stopOpacity="1" />
              <stop offset="100%" stopColor="#00e676" stopOpacity="0.5" />
            </linearGradient>

            {/* Headlight Conical Beam Gradient */}
            <linearGradient id={headlightGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#00e676" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Hidden Reference Path for SVG math */}
          <path ref={pathRef} d={config.curveD} fill="none" stroke="transparent" />

          {/* 2. Decorative PCB Circuit Branches */}
          <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1.2" strokeLinecap="round">
            {variant === "hero-to-about" && (
              <>
                <path d="M 40 25 L 15 25 L 5 35" />
                <path d="M 190 85 L 235 85 L 255 65" />
                <path d="M 60 150 L 95 150 L 115 130" />
                <circle cx="5" cy="35" r="2.5" fill="#070b14" stroke="rgba(0, 230, 118, 0.35)" />
                <circle cx="255" cy="65" r="2.5" fill="#070b14" stroke="rgba(0, 230, 118, 0.35)" />
                <circle cx="115" cy="130" r="2.5" fill="#070b14" stroke="rgba(0, 230, 118, 0.35)" />
              </>
            )}

            {variant === "about-to-events" && (
              <>
                <path d="M 160 30 L 90 30 L 60 60" />
                <path d="M 580 130 L 660 130 L 690 100" />
                <circle cx="60" cy="60" r="2.5" fill="#070b14" stroke="rgba(0, 230, 118, 0.3)" />
                <circle cx="690" cy="100" r="2.5" fill="#070b14" stroke="rgba(0, 230, 118, 0.3)" />
              </>
            )}

            {variant === "meetup-to-teams" && (
              <>
                <path d="M 120 30 L 60 30 L 30 60" />
                <path d="M 140 130 L 200 130 L 230 100" />
                <circle cx="30" cy="60" r="2.5" fill="#070b14" stroke="rgba(0, 230, 118, 0.3)" />
                <circle cx="230" cy="100" r="2.5" fill="#070b14" stroke="rgba(0, 230, 118, 0.3)" />
              </>
            )}
          </g>

          {/* 3. Inactive Base Track (Dual-Rail Circuit Wire) */}
          <path
            d={config.curveD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={config.curveD}
            fill="none"
            stroke="rgba(0, 230, 118, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />

          {/* 4. Active Glowing Neon Track (Scroll Traced with GPU drop-shadow) */}
          {!reduceMotion && (
            <motion.path
              d={config.curveD}
              fill="none"
              stroke={`url(#${laserGradId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
                filter: "drop-shadow(0 0 6px rgba(0, 230, 118, 0.85))",
              }}
            />
          )}

          {/* Solder Nodes at Endpoints */}
          <circle
            cx={config.startPoint.x}
            cy={config.startPoint.y}
            r="3.5"
            fill="#0b0f19"
            stroke="#00e676"
            strokeWidth="1.5"
          />
          <circle
            cx={config.endPoint.x}
            cy={config.endPoint.y}
            r="3.5"
            fill="#0b0f19"
            stroke="#00e676"
            strokeWidth="1.5"
          />

          {/* 5. Cyber Bullet Train (Aerodynamic Locomotive + Articulated Passenger Carriage) */}
          {!reduceMotion && (
            <g
              ref={trainRef}
              className="overflow-visible will-change-transform"
              transform={`translate(${config.startPoint.x}, ${config.startPoint.y}) rotate(90)`}
            >
              {/* Conical Headlight Beam projecting forward from the nose */}
              <polygon points="20,-4 85,-20 85,20 20,4" fill={`url(#${headlightGradId})`} />

              {/* Rear Energy Wake Trails behind the train */}
              <path
                d="M -26 -3 L -42 -5 M -26 0 L -48 0 M -26 3 L -42 5"
                stroke="#00e676"
                strokeWidth="1.2"
                strokeOpacity="0.5"
                strokeDasharray="2 3"
              />

              {/* ── CAR 2: Trailing Passenger Carriage ── */}
              <g style={{ filter: "drop-shadow(0 0 5px rgba(0, 230, 118, 0.6))" }}>
                {/* Carriage Body */}
                <rect
                  x="-25"
                  y="-5.5"
                  width="17"
                  height="11"
                  rx="2"
                  fill="#060a12"
                  stroke="#00e676"
                  strokeWidth="1.2"
                />

                {/* 3 Glowing Train Passenger Windows */}
                <rect x="-22" y="-3.5" width="3" height="7" rx="0.5" fill="#00f5d4" opacity="0.85" />
                <rect x="-17" y="-3.5" width="3" height="7" rx="0.5" fill="#00e676" opacity="0.9" />
                <rect x="-12" y="-3.5" width="3" height="7" rx="0.5" fill="#00f5d4" opacity="0.85" />

                {/* Undercarriage Maglev Runner Skates */}
                <rect x="-23" y="5.5" width="13" height="1.5" rx="0.5" fill="#00e676" opacity="0.6" />
                <rect x="-23" y="-7" width="13" height="1.5" rx="0.5" fill="#00e676" opacity="0.6" />
              </g>

              {/* ── ARTICULATED JOINT: Accordion Coupler Bellows between cars ── */}
              <rect
                x="-8"
                y="-4"
                width="4"
                height="8"
                rx="0.5"
                fill="#03070d"
                stroke="#00e676"
                strokeWidth="0.8"
                strokeDasharray="1 1"
              />

              {/* ── CAR 1: Streamlined Aerodynamic Locomotive Engine ── */}
              <g style={{ filter: "drop-shadow(0 0 7px rgba(0, 230, 118, 0.85))" }}>
                {/* Bullet Nose Engine Body */}
                <path
                  d="M -4 -6 L 8 -6 L 16 -3.5 L 20 0 L 16 3.5 L 8 6 L -4 6 Z"
                  fill="#070c16"
                  stroke="#00e676"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />

                {/* Slanted Aerodynamic Driver Cockpit Visor */}
                <path
                  d="M 6 -3.5 L 12 -2 L 15 0 L 12 2 L 6 3.5 Z"
                  fill="#00f5d4"
                  opacity="0.95"
                  stroke="#ffffff"
                  strokeWidth="0.6"
                />

                {/* High-Intensity Dual LED Headlights */}
                <circle cx="17.5" cy="-2" r="1.2" fill="#ffffff" />
                <circle cx="17.5" cy="2" r="1.2" fill="#ffffff" />

                {/* Locomotive Side Vent Grills / Stripes */}
                <line x1="-1" y1="-3" x2="3" y2="-3" stroke="#00e676" strokeWidth="0.9" />
                <line x1="-1" y1="3" x2="3" y2="3" stroke="#00e676" strokeWidth="0.9" />

                {/* Roof Pantograph / Aerodynamic Fin */}
                <line x1="0" y1="-6" x2="4" y2="-7.5" stroke="#00f5d4" strokeWidth="1" strokeLinecap="round" />
                <line x1="4" y1="-7.5" x2="8" y2="-6" stroke="#00f5d4" strokeWidth="1" strokeLinecap="round" />

                {/* Engine Core Indicator */}
                <circle cx="1" cy="0" r="1.5" fill="#00e676" />
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default CircuitBridgeTrack;
