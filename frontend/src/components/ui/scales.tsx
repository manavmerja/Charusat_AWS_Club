'use client';

import React from "react";
import { cn } from "@/lib/utils";

export interface ScalesProps {
  orientation?: "horizontal" | "vertical" | "diagonal";
  size?: number;
  className?: string;
  color?: string;
}

export interface ScalesContainerProps extends ScalesProps {
  children?: React.ReactNode;
  containerClassName?: string;
}

export const Scales: React.FC<ScalesProps> = ({
  orientation = "diagonal",
  size = 10,
  className,
  color = "rgba(255, 255, 255, 0.15)",
}) => {
  const getBackgroundStyle = () => {
    switch (orientation) {
      case "horizontal":
        return {
          backgroundImage: `repeating-linear-gradient(to bottom, ${color}, ${color} 1px, transparent 1px, transparent ${size}px)`,
          backgroundSize: `100% ${size}px`,
        };
      case "vertical":
        return {
          backgroundImage: `repeating-linear-gradient(to right, ${color}, ${color} 1px, transparent 1px, transparent ${size}px)`,
          backgroundSize: `${size}px 100%`,
        };
      case "diagonal":
      default:
        return {
          backgroundImage: `repeating-linear-gradient(45deg, ${color}, ${color} 1.5px, transparent 1.5px, transparent ${size * 1.4}px)`,
          backgroundSize: `${size * 2}px ${size * 2}px`,
        };
    }
  };

  return (
    <div
      className={cn("w-full h-full pointer-events-none opacity-80", className)}
      style={getBackgroundStyle()}
      aria-hidden="true"
    />
  );
};

export const ScalesContainer: React.FC<ScalesContainerProps> = ({
  children,
  orientation = "diagonal",
  size = 10,
  className,
  containerClassName,
  color,
}) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <Scales
        orientation={orientation}
        size={size}
        color={color}
        className={cn("absolute inset-0 z-0", className)}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Scales;
