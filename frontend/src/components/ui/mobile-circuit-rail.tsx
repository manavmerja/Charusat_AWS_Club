"use client";

import React, { useEffect, useId, useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type MobileCircuitVariant = "hero-to-about" | "about-to-events";

interface MobileCircuitRailProps {
  className?: string;
  variant?: MobileCircuitVariant;
}

export function MobileCircuitRail({
  className,
  variant = "hero-to-about",
}: MobileCircuitRailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const trainRef = useRef<SVGGElement | null>(null);
  const reduceMotion = useReducedMotion();
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9-_]/g, "");
  const laserGradId = `mob-laser-${cleanId}`;
  const headlightGradId = `mob-headlight-${cleanId}`;

  // Scroll tracking isolated to this connector
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: variant === "hero-to-about" ? ["start 85%", "end 25%"] : ["start 92%", "end 10%"],
  });

  // Fast, responsive spring physics (tuned for mobile touch scroll)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 24,
    restDelta: 0.001,
  });

  // Train motion along path
  useEffect(() => {
    if (reduceMotion) return;

    if (variant === "hero-to-about") {
      // Straight vertical line along right flank (from y=14 to y=166, length = 152)
      return smoothProgress.on("change", (latest) => {
        if (!trainRef.current) return;
        const progress = Math.max(0, Math.min(1, latest));
        const ptY = 14 + progress * 152;
        trainRef.current.setAttribute("transform", `translate(20, ${ptY}) rotate(90)`);
      });
    } else {
      // Curved connector for about-to-events
      const path = pathRef.current;
      if (!path) return;
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
    }
  }, [smoothProgress, reduceMotion, variant]);

  // ══════════════════════════════════════════════════════════════════════════════
  // VARIANT 1: HERO ➔ ABOUT (Right Side Straight Vertical Line matching photo 1)
  // ══════════════════════════════════════════════════════════════════════════════
  if (variant === "hero-to-about") {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full max-w-[100vw] h-44 sm:h-48 -mt-24 -mb-16 select-none z-30 pointer-events-none overflow-visible",
          className
        )}
        aria-hidden="true"
      >
        {/* Right-flank vertical rail container: Placed on the right side next to buttons & About header */}
        <div className="absolute right-4 sm:right-8 top-0 bottom-0 w-10 flex items-center justify-center">
          {/* Ambient soft glow aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-32 rounded-full bg-emerald-500/[0.1] blur-[16px] pointer-events-none" />

          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 40 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={laserGradId} x1="20" y1="14" x2="20" y2="166" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00e676" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#00e676" stopOpacity="1" />
                <stop offset="60%" stopColor="#00f5d4" stopOpacity="1" />
                <stop offset="85%" stopColor="#00e676" stopOpacity="1" />
                <stop offset="100%" stopColor="#00e676" stopOpacity="0.5" />
              </linearGradient>

              <linearGradient id={headlightGradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#00e676" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Decorative circuit ticks */}
            <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeLinecap="round">
              <path d="M 20 45 L 30 45 L 34 39" />
              <path d="M 20 135 L 10 135 L 6 141" />
              <circle cx="34" cy="39" r="1.5" fill="#070b14" stroke="#00e676" strokeWidth="0.8" />
              <circle cx="6" cy="141" r="1.5" fill="#070b14" stroke="#00e676" strokeWidth="0.8" />
            </g>

            {/* Inactive Base Track: Straight vertical line */}
            <line
              x1="20"
              y1="14"
              x2="20"
              y2="166"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="20"
              y1="14"
              x2="20"
              y2="166"
              stroke="rgba(0, 230, 118, 0.2)"
              strokeWidth="1.2"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />

            {/* Active Glowing Neon Track: Traced on Scroll */}
            {!reduceMotion && (
              <motion.line
                x1="20"
                y1="14"
                x2="20"
                y2="166"
                stroke={`url(#${laserGradId})`}
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{
                  pathLength: smoothProgress,
                  filter: "drop-shadow(0 0 5px rgba(0, 230, 118, 0.85))",
                }}
              />
            )}

            {/* Top Solder Origin Node (Next to Hero buttons on the right side) */}
            <circle cx="20" cy="14" r="3.5" fill="#0b0f19" stroke="#00e676" strokeWidth="1.5" />
            <circle cx="20" cy="14" r="1.8" fill="#00e676" />

            {/* Bottom Solder Terminal Node (Connecting into About SBG header on the right side) */}
            <circle cx="20" cy="166" r="3.5" fill="#0b0f19" stroke="#00e676" strokeWidth="1.5" />
            <circle cx="20" cy="166" r="1.8" fill="#00e676" />

            {/* Cyber Bullet Train (Traveling straight down) */}
            {!reduceMotion && (
              <g
                ref={trainRef}
                className="overflow-visible will-change-transform"
                transform="translate(20, 14) rotate(90)"
              >
                {/* Forward Headlight Beam */}
                <polygon points="14,-2.5 55,-12 55,12 14,2.5" fill={`url(#${headlightGradId})`} />

                {/* Rear Energy Wake */}
                <path
                  d="M -18 -2 L -28 -3 M -18 0 L -32 0 M -18 2 L -28 3"
                  stroke="#00e676"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  strokeDasharray="1.5 2"
                />

                {/* CAR 2: Passenger Carriage */}
                <g style={{ filter: "drop-shadow(0 0 4px rgba(0, 230, 118, 0.6))" }}>
                  <rect
                    x="-17"
                    y="-4"
                    width="12"
                    height="8"
                    rx="1.5"
                    fill="#060a12"
                    stroke="#00e676"
                    strokeWidth="1"
                  />
                  <rect x="-15" y="-2.5" width="2" height="5" rx="0.4" fill="#00f5d4" opacity="0.9" />
                  <rect x="-10.5" y="-2.5" width="2" height="5" rx="0.4" fill="#00e676" opacity="0.9" />
                </g>

                {/* ARTICULATED JOINT */}
                <rect
                  x="-5"
                  y="-3"
                  width="2.5"
                  height="6"
                  rx="0.4"
                  fill="#03070d"
                  stroke="#00e676"
                  strokeWidth="0.6"
                />

                {/* CAR 1: Locomotive Engine */}
                <g style={{ filter: "drop-shadow(0 0 5px rgba(0, 230, 118, 0.85))" }}>
                  <path
                    d="M -2.5 -4.5 L 6 -4.5 L 11 -2.5 L 14 0 L 11 2.5 L 6 4.5 L -2.5 4.5 Z"
                    fill="#070c16"
                    stroke="#00e676"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 5 -2.5 L 9 -1.5 L 11 0 L 9 1.5 L 5 2.5 Z"
                    fill="#00f5d4"
                    opacity="0.95"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                  />
                  <circle cx="12" cy="-1.5" r="0.9" fill="#ffffff" />
                  <circle cx="12" cy="1.5" r="0.9" fill="#ffffff" />
                  <circle cx="1.5" cy="0" r="1.1" fill="#00e676" />
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // VARIANT 2: ABOUT ➔ EVENTS (Compact S-Rail Connector)
  // ══════════════════════════════════════════════════════════════════════════════
  const curveD = "M 45 0 C 45 16, 110 12, 140 22 S 220 28, 220 44";
  const startPoint = { x: 45, y: 0 };
  const endPoint = { x: 220, y: 44 };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-[100vw] h-10 sm:h-12 overflow-x-clip select-none z-20 bg-black pointer-events-none -my-2 sm:-my-3",
        className
      )}
      aria-hidden="true"
    >
      <div className="w-full max-w-7xl mx-auto px-5 relative h-full flex items-center justify-start">
        <svg
          className="w-full max-w-[320px] h-full overflow-visible"
          viewBox="0 0 320 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={laserGradId}
              x1={startPoint.x}
              y1={startPoint.y}
              x2={endPoint.x}
              y2={endPoint.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00e676" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#00e676" stopOpacity="1" />
              <stop offset="60%" stopColor="#00f5d4" stopOpacity="1" />
              <stop offset="85%" stopColor="#00e676" stopOpacity="1" />
              <stop offset="100%" stopColor="#00e676" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id={headlightGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#00e676" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Reference Path */}
          <path ref={pathRef} d={curveD} fill="none" stroke="transparent" />

          {/* Inactive Base Track */}
          <path
            d={curveD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={curveD}
            fill="none"
            stroke="rgba(0, 230, 118, 0.2)"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            strokeLinecap="round"
          />

          {/* Active Glowing Track */}
          {!reduceMotion && (
            <motion.path
              d={curveD}
              fill="none"
              stroke={`url(#${laserGradId})`}
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
                filter: "drop-shadow(0 0 5px rgba(0, 230, 118, 0.85))",
              }}
            />
          )}

          {/* Solder Nodes */}
          <circle cx={startPoint.x} cy={startPoint.y} r="3" fill="#0b0f19" stroke="#00e676" strokeWidth="1.5" />
          <circle cx={endPoint.x} cy={endPoint.y} r="3" fill="#0b0f19" stroke="#00e676" strokeWidth="1.5" />

          {/* Mobile Cyber Bullet Train */}
          {!reduceMotion && (
            <g
              ref={trainRef}
              className="overflow-visible will-change-transform"
              transform={`translate(${startPoint.x}, ${startPoint.y}) rotate(90)`}
            >
              <polygon points="14,-2.5 55,-12 55,12 14,2.5" fill={`url(#${headlightGradId})`} />
              <path
                d="M -18 -2 L -28 -3 M -18 0 L -32 0 M -18 2 L -28 3"
                stroke="#00e676"
                strokeWidth="1"
                strokeOpacity="0.5"
                strokeDasharray="1.5 2"
              />
              <g style={{ filter: "drop-shadow(0 0 4px rgba(0, 230, 118, 0.6))" }}>
                <rect x="-17" y="-4" width="12" height="8" rx="1.5" fill="#060a12" stroke="#00e676" strokeWidth="1" />
                <rect x="-15" y="-2.5" width="2" height="5" rx="0.4" fill="#00f5d4" opacity="0.9" />
                <rect x="-10.5" y="-2.5" width="2" height="5" rx="0.4" fill="#00e676" opacity="0.9" />
              </g>
              <rect x="-5" y="-3" width="2.5" height="6" rx="0.4" fill="#03070d" stroke="#00e676" strokeWidth="0.6" />
              <g style={{ filter: "drop-shadow(0 0 5px rgba(0, 230, 118, 0.85))" }}>
                <path
                  d="M -2.5 -4.5 L 6 -4.5 L 11 -2.5 L 14 0 L 11 2.5 L 6 4.5 L -2.5 4.5 Z"
                  fill="#070c16"
                  stroke="#00e676"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                <path
                  d="M 5 -2.5 L 9 -1.5 L 11 0 L 9 1.5 L 5 2.5 Z"
                  fill="#00f5d4"
                  opacity="0.95"
                  stroke="#ffffff"
                  strokeWidth="0.5"
                />
                <circle cx="12" cy="-1.5" r="0.9" fill="#ffffff" />
                <circle cx="12" cy="1.5" r="0.9" fill="#ffffff" />
                <circle cx="1.5" cy="0" r="1.1" fill="#00e676" />
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default MobileCircuitRail;
