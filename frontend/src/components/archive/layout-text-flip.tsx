"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "",
  words = [
    "Build on AWS Cloud.",
    "Create the Cloud Future.",
    "Innovate Together."
  ],
  duration = 3000,
  className,
}: {
  text?: string;
  words?: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={cn("inline-flex flex-wrap items-center justify-center gap-3", className)}>
      {text && (
        <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {text}
        </span>
      )}

      {/* Premium Glassmorphic Badge container matching GravityLens */}
      <div className="relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
            transition={{
              duration: 0.45,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-[#00e676] to-teal-200 whitespace-nowrap drop-shadow-[0_0_20px_rgba(0,230,118,0.3)]"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
