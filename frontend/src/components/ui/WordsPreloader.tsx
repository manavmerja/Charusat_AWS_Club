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
  const [dimension, setDimension] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Reset window scroll to top
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

  const w = dimension.width;
  const h = dimension.height;

  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const targetPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

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
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#f4f4f4] cursor-wait select-none"
    >
      {/* Centered Clean Modern Typography */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center text-[#141516] text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight font-[var(--font-space-grotesk)] text-center px-4"
      >
        {words[index]}
      </motion.div>

      {/* Smooth Morphing SVG Curved Bottom (Rendered after client dimensions are measured to prevent SSR mismatch) */}
      {dimension.width > 0 && (
        <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#f4f4f4]">
          <motion.path
            variants={curve}
            initial="initial"
            exit="exit"
          />
        </svg>
      )}
    </motion.div>
  );
}

export default WordsPreloader;
