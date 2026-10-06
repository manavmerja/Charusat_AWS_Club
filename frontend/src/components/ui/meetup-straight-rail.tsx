"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MeetupStraightRailProps {
  className?: string;
}

export function MeetupStraightRail({ className }: MeetupStraightRailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trainRef = useRef<SVGGElement | null>(null);
  const [trackHeight, setTrackHeight] = useState(650);
  const reduceMotion = useReducedMotion();
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9-_]/g, "");
  const laserGradId = `meetup-rail-laser-${cleanId}`;
  const headlightGradId = `meetup-rail-headlight-${cleanId}`;

  // Measure dynamic height of the Meetup section
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const h = containerRef.current.parentElement?.offsetHeight || containerRef.current.offsetHeight || 650;
        setTrackHeight(h);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Scroll tracking across the Meetup section:
  // Completes journey while user views Meetup and parks safely at the depot stop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center 20%"],
  });

  // Fast, smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 26,
    restDelta: 0.001,
  });

  // The track stops cleanly before bottom padding, safely above the next section
  const startY = 20;
  const stopY = Math.max(220, trackHeight - 140);
  const totalTravel = stopY - startY;

  // Smoothly move the cyber bullet train straight down with 0 React re-renders
  // Parks at stopY (DEPOT END) and stays safely inside Meetup section
  useEffect(() => {
    if (reduceMotion) return;

    return smoothProgress.on("change", (latest) => {
      if (!trainRef.current) return;
      const progress = Math.max(0, Math.min(1, latest));
      const ptY = startY + progress * totalTravel;

      // Rotate 90 deg = pointing straight down in the direction of motion
      trainRef.current.setAttribute("transform", `translate(20, ${ptY}) rotate(90)`);
    });
  }, [smoothProgress, reduceMotion, totalTravel, startY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute left-3 sm:left-6 lg:left-12 top-0 bottom-0 w-10 z-20 pointer-events-none select-none overflow-visible",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 40 ${trackHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Active Electrified Neon Beam Gradient */}
          <linearGradient id={laserGradId} x1="20" y1={startY} x2="20" y2={stopY} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e676" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#00e676" stopOpacity="1" />
            <stop offset="60%" stopColor="#00f5d4" stopOpacity="1" />
            <stop offset="85%" stopColor="#00e676" stopOpacity="1" />
            <stop offset="100%" stopColor="#00e676" stopOpacity="0.5" />
          </linearGradient>

          {/* Headlight Conical Beam Gradient */}
          <linearGradient id={headlightGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#00e676" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── 1. Decorative Circuit Ticks Along the Track ── */}
        <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 20 60 L 8 60 L 4 68" />
          <path d="M 20 180 L 32 180 L 36 172" />
          {stopY > 360 && (
            <>
              <path d="M 20 320 L 8 320 L 4 328" />
              <circle cx="4" cy="328" r="2" fill="#070b14" stroke="rgba(0, 230, 118, 0.35)" />
            </>
          )}
          <circle cx="4" cy="68" r="2" fill="#070b14" stroke="rgba(0, 230, 118, 0.35)" />
          <circle cx="36" cy="172" r="2" fill="#070b14" stroke="rgba(0, 230, 118, 0.35)" />
        </g>

        {/* ── 2. Inactive Base Straight Track (Dual-Rail Circuit Wire) ── */}
        <line
          x1="20"
          y1={startY}
          x2="20"
          y2={stopY}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1={startY}
          x2="20"
          y2={stopY}
          stroke="rgba(0, 230, 118, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />

        {/* ── 3. Active Glowing Neon Track (Scroll Traced with GPU drop-shadow) ── */}
        {!reduceMotion && (
          <motion.line
            x1="20"
            y1={startY}
            x2="20"
            y2={stopY}
            stroke={`url(#${laserGradId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              pathLength: smoothProgress,
              filter: "drop-shadow(0 0 6px rgba(0, 230, 118, 0.85))",
            }}
          />
        )}

        {/* Top Solder Node (Entry origin into Meetup section) */}
        <circle cx="20" cy={startY} r="4" fill="#0b0f19" stroke="#00e676" strokeWidth="1.5" />
        <circle cx="20" cy={startY} r="2" fill="#00e676" />

        {/* ── Terminal Depot Stop (Safe terminus inside Meetup section - NEVER reaches Team section) ── */}
        {/* Terminal buffer cross-bars */}
        <line x1="8" y1={stopY} x2="32" y2={stopY} stroke="#00e676" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1={stopY + 4} x2="28" y2={stopY + 4} stroke="rgba(0, 230, 118, 0.5)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Terminal solder node with pulse ring */}
        <circle cx="20" cy={stopY} r="4.5" fill="#0b0f19" stroke="#00e676" strokeWidth="1.8" />
        <circle cx="20" cy={stopY} r="2" fill="#00e676" />
        {/* Futuristic station terminal tag */}
        <text
          x="20"
          y={stopY + 15}
          textAnchor="middle"
          fill="#00e676"
          fontSize="6.5"
          fontFamily="monospace"
          letterSpacing="0.8"
          opacity="0.8"
        >
          DEPOT END
        </text>

        {/* ── 4. Cyber Bullet Train (Pointing straight down) ── */}
        {!reduceMotion && (
          <g
            ref={trainRef}
            className="overflow-visible will-change-transform"
            transform="translate(20, 16) rotate(90)"
          >
            {/* Forward Headlight Beam illuminating track ahead */}
            <polygon points="20,-4 85,-20 85,20 20,4" fill={`url(#${headlightGradId})`} />

            {/* Rear Trailing Energy Wake */}
            <path
              d="M -26 -3 L -42 -5 M -26 0 L -48 0 M -26 3 L -42 5"
              stroke="#00e676"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              strokeDasharray="2 3"
            />

            {/* ── CAR 2: Trailing Passenger Carriage ── */}
            <g style={{ filter: "drop-shadow(0 0 5px rgba(0, 230, 118, 0.6))" }}>
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
              {/* 3 Glowing Passenger Windows */}
              <rect x="-22" y="-3.5" width="3" height="7" rx="0.5" fill="#00f5d4" opacity="0.85" />
              <rect x="-17" y="-3.5" width="3" height="7" rx="0.5" fill="#00e676" opacity="0.9" />
              <rect x="-12" y="-3.5" width="3" height="7" rx="0.5" fill="#00f5d4" opacity="0.85" />

              {/* Maglev Skates */}
              <rect x="-23" y="5.5" width="13" height="1.5" rx="0.5" fill="#00e676" opacity="0.6" />
              <rect x="-23" y="-7" width="13" height="1.5" rx="0.5" fill="#00e676" opacity="0.6" />
            </g>

            {/* ── ARTICULATED JOINT: Accordion Coupler Bellows ── */}
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

            {/* ── CAR 1: Aerodynamic Locomotive Engine ── */}
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

              {/* Dual Headlights */}
              <circle cx="17.5" cy="-2" r="1.2" fill="#ffffff" />
              <circle cx="17.5" cy="2" r="1.2" fill="#ffffff" />

              {/* Locomotive Side Stripes */}
              <line x1="-1" y1="-3" x2="3" y2="-3" stroke="#00e676" strokeWidth="0.9" />
              <line x1="-1" y1="3" x2="3" y2="3" stroke="#00e676" strokeWidth="0.9" />

              {/* Roof Pantograph */}
              <line x1="0" y1="-6" x2="4" y2="-7.5" stroke="#00f5d4" strokeWidth="1" strokeLinecap="round" />
              <line x1="4" y1="-7.5" x2="8" y2="-6" stroke="#00f5d4" strokeWidth="1" strokeLinecap="round" />

              {/* Engine Core Indicator */}
              <circle cx="1" cy="0" r="1.5" fill="#00e676" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

export default MeetupStraightRail;
