"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LiquidButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  delay?: number;
  fillHeight?: string | number;
  hoverScale?: number;
  tapScale?: number;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "default",
      fillHeight = "4px",
      hoverScale = 1.05,
      tapScale = 0.95,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="relative flex flex-col items-center select-none"
      >
        <motion.button
          ref={ref}
          variants={{
            hover: { scale: hoverScale },
            tap: { scale: tapScale },
          }}
          className={cn(
            "relative overflow-hidden font-medium transition-colors duration-300 rounded-xl border group outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-[#0b0f19]",
            // Size styles
            size === "default" && "px-6 py-3 text-base",
            size === "sm" && "px-4 py-2 text-sm",
            size === "lg" && "px-8 py-4 text-base sm:text-lg",
            size === "icon" && "p-3 flex items-center justify-center rounded-full",
            // Variant base borders/bg
            variant === "default" && "bg-white/5 text-white border-white/10 hover:border-emerald-500/40 shadow-[0_8px_30px_rgba(0,230,118,0.12)]",
            variant === "secondary" && "bg-white/5 text-white border-white/10 hover:border-teal-500/40 shadow-[0_8px_30px_rgba(20,184,166,0.12)]",
            variant === "destructive" && "bg-red-500/10 text-red-400 border-red-500/20 hover:border-red-500/50",
            variant === "ghost" && "bg-transparent text-white border-transparent hover:bg-white/5",
            className
          )}
          style={{
            ...props.style,
          } as React.CSSProperties}
          {...props}
        >
          {/* Liquid wave background fill effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            variants={{
              initial: { 
                height: fillHeight, 
                borderTopLeftRadius: "50% 80%",
                borderTopRightRadius: "50% 80%",
                background: variant === "destructive" 
                  ? "linear-gradient(135deg, #ef4444, #b91c1c)" 
                  : variant === "secondary"
                  ? "var(--liquid-color, linear-gradient(135deg, #059669, #0d9488, #0284c7))"
                  : "var(--liquid-color, linear-gradient(135deg, #00e676, #10b981, #00c853, #14b8a6))",
                opacity: 0.85,
                filter: "blur(1px)"
              },
              hover: { 
                height: "100%", 
                borderTopLeftRadius: "0% 0%",
                borderTopRightRadius: "0% 0%",
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 15
                }
              }
            }}
          />

          {/* Content layer positioned relative to be on top of the liquid fill */}
          <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black font-semibold uppercase tracking-wider transition-colors duration-300">
            {children}
          </span>
        </motion.button>

        {/* Floating Moving Aurora Underline */}
        <motion.div
          variants={{
            initial: { width: 0, opacity: 0, scaleX: 0 },
            hover: { 
              width: "70%", 
              opacity: 1, 
              scaleX: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
              }
            }
          }}
          className="h-[3px] mt-2.5 rounded-full blur-[0.5px] bg-gradient-to-r"
          style={{
            background: variant === "secondary"
              ? "var(--liquid-underline, linear-gradient(to right, #059669, #0d9488, #38bdf8))"
              : "var(--liquid-underline, linear-gradient(to right, #00e676, #10b981, #69f0ae))",
          }}
        />
      </motion.div>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export default LiquidButton;
