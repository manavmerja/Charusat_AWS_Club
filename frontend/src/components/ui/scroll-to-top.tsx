"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowUp } from "@tabler/icons-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { duration: number }) => void } }).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 hover:border-emerald-400 hover:bg-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(0,230,118,0.25)] transition-all duration-300 cursor-pointer group overflow-hidden active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        >
          {/* Flip Up Icon Container */}
          <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
            {/* Primary Arrow (flips/slides up on hover) */}
            <IconArrowUp className="w-5 h-5 text-emerald-400 absolute transition-transform duration-300 ease-out group-hover:-translate-y-full" />
            {/* Secondary Arrow (slides up from bottom into center on hover) */}
            <IconArrowUp className="w-5 h-5 text-white absolute translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
