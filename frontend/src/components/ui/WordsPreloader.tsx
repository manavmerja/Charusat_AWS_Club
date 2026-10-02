"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_WORDS = [
  "hello",
  "नमस्ते",
  "કેમ છો",
  "खम्मा घणी",
  "hola",
  "bonjour",
  "aws sbg",
  "charusat",
];

interface WordsPreloaderProps {
  words?: string[];
  onComplete?: () => void;
  speed?: number; // ms per word
}

export function WordsPreloader({
  words = DEFAULT_WORDS,
  onComplete,
  speed = 190,
}: WordsPreloaderProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Reset window scroll to very top
    window.scrollTo(0, 0);

    // Lock scroll during preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = originalOverflow;
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        onComplete?.();
      }, speed + 220);
      return () => clearTimeout(exitTimer);
    }

    const timeout = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 350 : speed
    );

    return () => clearTimeout(timeout);
  }, [index, words.length, speed, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const EASE_CURVE = [0.76, 0, 0.24, 1] as const;

  const slideUp = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.85, ease: EASE_CURVE, delay: 0.2 },
    },
  };

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.75, ease: EASE_CURVE },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.75, ease: EASE_CURVE, delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-transparent cursor-wait select-none"
    >
      {dimension.width > 0 && (
        <>
          {/* Centered Clean Modern Typography */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center text-[#141516] text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight font-[var(--font-space-grotesk)] text-center px-4"
          >
            {words[index]}
          </motion.div>

          {/* Smooth Morphing SVG Curved Background (#f4f4f4 Off-White) */}
          <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#f4f4f4]">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}

export default WordsPreloader;
