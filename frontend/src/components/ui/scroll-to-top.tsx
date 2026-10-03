"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowUp, IconRocket } from "@tabler/icons-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button after scrolling down 280px
      if (scrollTop > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800);

    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { duration: number }) => void } }).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  // Circular progress calculations for SVG (radius 19, circumference ~119.38)
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 pointer-events-auto select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ── Hover Tooltip Badge ("TOP • XX%") ── */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap z-50"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-emerald-500/40 shadow-[0_0_20px_rgba(0,230,118,0.3)] text-[11px] font-mono font-medium text-emerald-300">
                  <IconRocket className="w-3 h-3 text-emerald-400 animate-bounce" />
                  <span>TOP</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white font-bold">{Math.round(scrollProgress)}%</span>
                </div>
                {/* Tooltip triangle tail */}
                <div className="w-2 h-2 bg-black/90 border-r border-b border-emerald-500/40 rotate-45 mx-auto -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Outer Continuous Radar Pulse Ring (Idle Animation) ── */}
          <motion.div
            animate={{
              scale: [1, 1.45, 1.7],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border border-emerald-400/50 pointer-events-none"
          />

          {/* ── Secondary Ambient Glow Halo ── */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-emerald-400/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse" />

          {/* ── Floating Breathing Action Button ── */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: isHovered ? -3 : [0, -5, 0],
            }}
            transition={{
              y: {
                repeat: isHovered ? 0 : Infinity,
                duration: 2.6,
                ease: "easeInOut",
              },
            }}
            className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/85 backdrop-blur-2xl border border-emerald-500/30 hover:border-emerald-400 shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,230,118,0.25)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.9),0_0_35px_rgba(0,230,118,0.5)] transition-all duration-300 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          >
            {/* ── Conic Gradient Ambient Spinner Background ── */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute -inset-4 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,#00e676_360deg)] opacity-25 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
            />

            {/* Inner Dark Glass Disc */}
            <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-md z-0" />

            {/* ── SVG Dynamic Progress Ring ── */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1.5 z-10"
              viewBox="0 0 44 44"
            >
              <defs>
                <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e676" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Background circular track */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="transparent"
              />

              {/* Active animated progress stroke */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                stroke="url(#scrollProgressGradient)"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-150 ease-out drop-shadow-[0_0_8px_rgba(0,230,118,0.8)]"
              />
            </svg>

            {/* ── Interactive Launching Arrow Icon ── */}
            <div className="relative z-20 flex flex-col items-center justify-center overflow-hidden h-6 w-6">
              <motion.div
                animate={
                  isClicked
                    ? { y: [-24, 24, 0], opacity: [0, 0, 1] }
                    : isHovered
                    ? { y: [0, -3, 0] }
                    : { y: 0 }
                }
                transition={
                  isClicked
                    ? { duration: 0.5, ease: "easeOut" }
                    : { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                }
              >
                <IconArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 group-hover:text-white transition-colors duration-200 drop-shadow-[0_0_8px_rgba(0,230,118,0.6)]" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
