"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ArrowRight, X, MapPin } from "lucide-react";
import { splitEvents, type ClubEvent } from "@/data/events";

interface FloatingEventToastProps {
  customEvent?: Partial<ClubEvent>;
}

export function FloatingEventToast({ customEvent }: FloatingEventToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Retrieve upcoming event from data
  const { upcoming } = splitEvents();
  const event = customEvent || upcoming[0] || {
    slug: "cloud-innovate-genai",
    title: "Cloud Innovate: GenAI & Serverless",
    tagline: "Building Next-Gen AI Applications on AWS",
    date: "2026-10-09",
    time: "02:00 PM – 04:30 PM",
    venue: "CHARUSAT Campus",
  };

  useEffect(() => {
    // Observe when the student scrolls down to the Cloud Captain (Diya Prajapati) section
    let observer: IntersectionObserver | null = null;
    let retryTimer: NodeJS.Timeout | null = null;

    const attachObserver = () => {
      const target = document.getElementById("cloud-captain-section");
      if (!target) return false;

      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer?.disconnect();
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      observer.observe(target);
      return true;
    };

    if (!attachObserver()) {
      retryTimer = setTimeout(attachObserver, 500);
    }

    return () => {
      if (observer) observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const scrollToEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDismiss();

    const element = document.getElementById("events");
    if (element) {
      const lenis = (
        window as unknown as {
          lenis?: {
            scrollTo: (
              target: HTMLElement | number,
              opts?: { duration?: number; easing?: (t: number) => number; offset?: number }
            ) => void;
          };
        }
      ).lenis;

      if (lenis && typeof lenis.scrollTo === "function") {
        const smoothEasing = (t: number) => 1 - Math.pow(1 - t, 3.5);
        lenis.scrollTo(element, { duration: 1.6, easing: smoothEasing, offset: -20 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.location.href = "/#events";
    }
  };

  if (isDismissed || !event) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="complementary"
          aria-label="Upcoming Event Announcement"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96, transition: { duration: 0.2 } }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 26,
          }}
          className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-8 sm:left-8 z-40 w-auto sm:w-[370px] max-w-[calc(100vw-24px)] sm:max-w-[400px] select-none font-[var(--font-space-grotesk)] pointer-events-auto transform-gpu will-change-transform"
        >
          {/* Card Container: Pure Obsidian Black (#08080a / #050505) with subtle frosted glass */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-[#090a0f] via-[#07070a] to-[#040406] p-4 sm:p-5 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.75)] transition-colors duration-200 hover:border-emerald-500/25">
            
            {/* Very Subtle Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

            {/* Header: Subtle Live Status Dot + Dismiss Button */}
            <div className="flex items-center justify-between gap-2 pb-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>Next Event</span>
              </div>

              {/* Dismiss Button - Comfortable mobile tap target */}
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss announcement"
                className="flex h-7 w-7 sm:h-6 sm:w-6 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] active:bg-white/15 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
              >
                <X className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Event Title & Tagline */}
            <div className="space-y-1">
              <h3 className="text-sm sm:text-[15px] font-bold text-white tracking-tight leading-snug line-clamp-1">
                {event.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                {event.tagline}
              </p>
            </div>

            {/* Event Metadata (Date & Venue) */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-slate-200 font-medium">
                <CalendarDays className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>Friday, 9th Oct</span>
              </span>

              {event.venue && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="h-3 w-3 text-slate-500" aria-hidden="true" />
                  <span className="truncate max-w-[130px]">{event.venue}</span>
                </span>
              )}
            </div>

            {/* Action Buttons - Optimized for touch & click */}
            <div className="mt-4 flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <Link
                href={event.slug ? `/events/${event.slug}` : "/#events"}
                className="group/btn flex-1 inline-flex min-h-[40px] sm:min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 px-4 text-xs font-semibold text-[#07070a] transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              >
                <span>View Event</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={scrollToEvents}
                className="inline-flex min-h-[40px] sm:min-h-[36px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-xs font-medium text-slate-300 hover:bg-white/[0.08] active:bg-white/15 hover:text-white transition-colors cursor-pointer"
              >
                All Events
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default FloatingEventToast;
