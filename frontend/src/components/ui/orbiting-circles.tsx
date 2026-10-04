"use client"
import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
  isPaused?: boolean
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  isPaused = false,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const numChildren = React.Children.count(children)
  // Stable key derived from props — no random IDs, no SSR mismatch
  const keyPrefix = `orbit-r${radius}-n${numChildren}-${reverse ? "rev" : "fwd"}`
  const styleRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    // Inject keyframes client-side only to avoid SSR hydration mismatch
    const css = Array.from({ length: numChildren })
      .map((_, index) => {
        const startAngle = (360 / numChildren) * index
        const endAngle = startAngle + (reverse ? -360 : 360)
        return `
          @keyframes ${keyPrefix}-${index} {
            0%   { transform: rotate(${startAngle}deg) translateY(${radius}px) rotate(${-startAngle}deg); }
            100% { transform: rotate(${endAngle}deg)   translateY(${radius}px) rotate(${-endAngle}deg); }
          }
        `
      })
      .join("\n")

    if (!styleRef.current) {
      styleRef.current = document.createElement("style")
      document.head.appendChild(styleRef.current)
    }
    styleRef.current.textContent = css

    return () => {
      if (styleRef.current) {
        styleRef.current.remove()
        styleRef.current = null
      }
    }
  }, [numChildren, radius, reverse, keyPrefix])

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          style={{
            width: iconSize,
            height: iconSize,
            position: "absolute",
            top: `calc(50% - ${iconSize / 2}px)`,
            left: `calc(50% - ${iconSize / 2}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center center",
            animation: `${keyPrefix}-${index} ${calculatedDuration}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
          className={cn("transform-gpu rounded-full", className)}
          {...props}
        >
          {child}
        </div>
      ))}
    </>
  )
}
