"use client"
import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
  color?: string;
  isPaused?: boolean;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24, // Increased from 0.24
  numCircles = 8,
  className,
  color = "0, 230, 118", // Default to the emerald green theme color
  isPaused: externalIsPaused,
}: RippleProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "150px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isPaused = externalIsPaused !== undefined ? externalIsPaused : !isInView;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ripple-pulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(0.95);
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={cn(
          "pointer-events-none absolute inset-0 select-none flex items-center justify-center w-full h-full",
          className,
        )}
      >
        {Array.from({ length: numCircles }, (_, i) => {
          const size = mainCircleSize + i * 70;
          const opacity = Math.max(0, mainCircleOpacity - i * 0.03);
          const animationDelay = `${i * 0.06}s`;
          const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
          const borderOpacity = 30 + i * 5; // Increased from 10 to 30

          return (
            <div
              key={i}
              className="absolute rounded-full border-2"
              style={
                {
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  animationDelay,
                  borderStyle,
                  borderColor: `rgba(${color}, ${borderOpacity / 100})`,
                  backgroundColor: `rgba(${color}, 0.15)`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(1)",
                  animation: `ripple-pulse 3s ease-in-out ${animationDelay} infinite`,
                  animationPlayState: isPaused ? "paused" : "running",
                } as CSSProperties
              }
            />
          );
        })}
      </div>
    </>
  );
});

Ripple.displayName = "Ripple";
