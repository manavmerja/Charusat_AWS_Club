"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type FluidGradientTextProps = {
  /** Text content rendered inside the SVG. */
  text: string;
  /**
   * SVG viewBox width used to scale the gradient and text layout.
   * @default 1400
   * */
  svgViewBoxWidth?: number;
  /**
   * SVG viewBox height used as the base text size.
   * @default 180
   * */
  svgViewBoxHeight?: number;
  className?: string;
  fontFamily?: string;
  fontSize?: number;
  letterSpacing?: string;
};

export function FluidGradientText({
  text,
  svgViewBoxWidth = 1400,
  svgViewBoxHeight = 160,
  className = "",
  fontFamily = "var(--font-doto), 'Doto', monospace, sans-serif",
  fontSize,
  letterSpacing = "0.06em",
}: FluidGradientTextProps) {
  const gradientX1Raw = useMotionValue(0.5);
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, svgViewBoxWidth]),
    {
      stiffness: 150,
      damping: 25,
    }
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    if (containerRect.width > 0) {
      gradientX1Raw.set(
        (event.clientX - containerRect.left) / containerRect.width
      );
    }
  };

  const handleMouseLeave = () => {
    gradientX1Raw.set(0.5);
  };

  const calculatedFontSize = fontSize ?? svgViewBoxHeight * 0.58;

  return (
    <div
      className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="w-full h-full select-none"
        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Doto:wght@800;900&display=swap');`}
          </style>
          <motion.linearGradient
            id="fluid_gradient_text_linear"
            x1={gradientX1}
            y1="0"
            x2={svgViewBoxWidth / 2}
            y2={svgViewBoxHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="1" />
          </motion.linearGradient>
        </defs>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          stroke="#ffffff"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          fill="url(#fluid_gradient_text_linear)"
          style={{
            fontFamily,
            fontSize: calculatedFontSize,
            fontWeight: "900",
            letterSpacing,
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
