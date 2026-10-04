"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface CobeGlobeProps {
  className?: string;
}

interface CityMarker {
  name: string;
  lat: number;
  lng: number;
  isPrimary?: boolean;
}

const CITIES: CityMarker[] = [
  { name: "CHARUSAT", lat: 22.5996, lng: 72.8205, isPrimary: true },
  { name: "SAN FRANCISCO", lat: 37.7749, lng: -122.4194 },
  { name: "NEW YORK", lat: 40.7128, lng: -74.006 },
  { name: "LONDON", lat: 51.5074, lng: -0.1278 },
  { name: "FRANKFURT", lat: 50.1109, lng: 8.6821 },
  { name: "TOKYO", lat: 35.6762, lng: 139.6503 },
  { name: "SINGAPORE", lat: 1.3521, lng: 103.8198 },
  { name: "SÃO PAULO", lat: -23.5505, lng: -46.6333 },
  { name: "SYDNEY", lat: -33.8688, lng: 151.2093 },
];

const PI = Math.PI;

// COBE 1:1 Cartesian coordinate mapping from lat/lng
function toCartesian(lat: number, lng: number) {
  const r = (lat * PI) / 180;
  const a = (lng * PI) / 180 - PI;
  const o = Math.cos(r);
  return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)];
}

// 1:1 Projection matching COBE shader
function projectToScreen(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  scale: number = 1,
  elevation: number = 0.05
) {
  const [x, y, z] = toCartesian(lat, lng);
  const radius = 0.8 + elevation;
  const pt = [x * radius, y * radius, z * radius];

  const cosTheta = Math.cos(theta);
  const cosPhi = Math.cos(phi);
  const sinTheta = Math.sin(theta);
  const sinPhi = Math.sin(phi);

  const c = cosPhi * pt[0] + sinPhi * pt[2];
  const s = sinPhi * sinTheta * pt[0] + cosTheta * pt[1] - cosPhi * sinTheta * pt[2];
  const depthZ = -sinPhi * cosTheta * pt[0] + sinTheta * pt[1] + cosPhi * cosTheta * pt[2];

  // Normalized 0 to 1 position
  const normX = (c * scale + 1) / 2;
  const normY = (-s * scale + 1) / 2;
  const isVisible = depthZ >= 0.05;

  return {
    normX,
    normY,
    isVisible,
    opacity: isVisible ? Math.max(0, Math.min(1, (depthZ - 0.05) * 3)) : 0,
  };
}

export function CobeGlobe({ className }: CobeGlobeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tagElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Fluid Trackball Physics State
  const isDragging = useRef(false);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotation = useRef<{ phi: number; theta: number }>({ phi: 0, theta: 0.22 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    let animationFrameId = 0;
    if (!canvasRef.current || !containerRef.current) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    let cachedWidth = containerRef.current.offsetWidth || 500;
    const dpr = isMobile ? 1.0 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.25);

    let isDisposed = false;
    let globe: { update: (opts: Record<string, unknown>) => void; destroy: () => void } | null = null;

    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: cachedWidth * dpr,
        height: cachedWidth * dpr,
        phi: 0,
        theta: 0.22,
        dark: 1,
        diffuse: 1.2,
        mapSamples: isMobile ? 3500 : 6000,
        mapBrightness: 5.5,
        baseColor: [0.04, 0.06, 0.09],
        markerColor: [0.15, 0.65, 0.4],
        glowColor: [0.02, 0.12, 0.08],
        markerElevation: 0.05,
        markers: CITIES.map((c) => ({
          location: [c.lat, c.lng] as [number, number],
          size: c.isPrimary ? 0.07 : 0.04,
        })),
        arcs: [
          // San Francisco ↔ New York
          { from: [37.7749, -122.4194], to: [40.7128, -74.006] },
          // New York ↔ London
          { from: [40.7128, -74.006], to: [51.5074, -0.1278] },
          // London ↔ Frankfurt
          { from: [51.5074, -0.1278], to: [50.1109, 8.6821] },
          // Frankfurt ↔ CHARUSAT (Gujarat)
          { from: [50.1109, 8.6821], to: [22.5996, 72.8205] },
          // CHARUSAT (Gujarat) ↔ Singapore
          { from: [22.5996, 72.8205], to: [1.3521, 103.8198] },
          // Singapore ↔ Tokyo
          { from: [1.3521, 103.8198], to: [35.6762, 139.6503] },
          // Tokyo ↔ San Francisco
          { from: [35.6762, 139.6503], to: [37.7749, -122.4194] },
          // Singapore ↔ Sydney
          { from: [1.3521, 103.8198], to: [-33.8688, 151.2093] },
          // New York ↔ São Paulo
          { from: [40.7128, -74.006], to: [-23.5505, -46.6333] },
        ],
        arcColor: [0.15, 0.6, 0.38],
        arcWidth: 0.35,
        arcHeight: 0.22,
      });
    } catch (err) {
      console.warn("COBE initialization error:", err);
    }

    const onResize = () => {
      if (containerRef.current) {
        const newW = containerRef.current.offsetWidth;
        if (newW && newW !== cachedWidth) {
          cachedWidth = newW;
          if (globe) {
            globe.update({
              width: cachedWidth * dpr,
              height: cachedWidth * dpr,
            });
          }
        }
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    const animate = () => {
      if (isDisposed || !isVisibleRef.current) {
        animationFrameId = 0;
        return;
      }

      if (isDragging.current) {
        // Active drag updates rotation directly
      } else {
        // Inertia coasting & auto-spin
        if (
          Math.abs(velocity.current.x) > 0.0001 ||
          Math.abs(velocity.current.y) > 0.0001
        ) {
          rotation.current.phi += velocity.current.x;
          rotation.current.theta = Math.max(
            -Math.PI / 2.2,
            Math.min(Math.PI / 2.2, rotation.current.theta + velocity.current.y)
          );
          // Smooth friction damping
          velocity.current.x *= 0.93;
          velocity.current.y *= 0.93;
        } else {
          // Continuous smooth auto-rotation
          rotation.current.phi += 0.003;
        }
      }

      const currentPhi = rotation.current.phi;
      const currentTheta = rotation.current.theta;

      if (globe) {
        globe.update({
          phi: currentPhi,
          theta: currentTheta,
        });
      }

      // Update 3D projected city tags using GPU translate3d (zero layout reflow)
      tagElementsRef.current.forEach((el, index) => {
        if (!el) return;
        const city = CITIES[index];
        const proj = projectToScreen(
          city.lat,
          city.lng,
          currentPhi,
          currentTheta,
          1,
          0.05
        );

        if (proj.isVisible) {
          el.style.opacity = `${proj.opacity}`;
          const posX = proj.normX * cachedWidth;
          const posY = proj.normY * cachedWidth;
          el.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -100%) translateY(-8px)`;
          el.style.pointerEvents = proj.opacity > 0.5 ? "auto" : "none";
        } else {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // ── Performance: True sleeping when offscreen (no RAF overhead) ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        isVisibleRef.current = visible;
        if (visible) {
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 80);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (globe) {
        try {
          globe.destroy();
        } catch {}
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-[500px] mx-auto select-none",
        className
      )}
    >
      {/* 3D Globe Interactive Box */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-full aspect-square overflow-visible"
      >
        {/* Subtle Ambient Backlight */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-emerald-500/[0.03] blur-[100px]" />
        </div>

        {/* Interactive WebGL Canvas with Mobile-Tuned Touch Tracking */}
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            isDragging.current = true;
            lastPointerPos.current = { x: e.clientX, y: e.clientY };
            velocity.current = { x: 0, y: 0 };
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grabbing";
              try {
                canvasRef.current.setPointerCapture(e.pointerId);
              } catch {}
            }
          }}
          onPointerUp={(e) => {
            isDragging.current = false;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
              try {
                canvasRef.current.releasePointerCapture(e.pointerId);
              } catch {}
            }
          }}
          onPointerCancel={(e) => {
            isDragging.current = false;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
              try {
                canvasRef.current.releasePointerCapture(e.pointerId);
              } catch {}
            }
          }}
          onPointerMove={(e) => {
            if (!isDragging.current) return;
            const deltaX = e.clientX - lastPointerPos.current.x;
            const deltaY = e.clientY - lastPointerPos.current.y;
            lastPointerPos.current = { x: e.clientX, y: e.clientY };

            const sensX = 0.0055;
            const sensY = 0.0055;

            // Update angles in all axes
            rotation.current.phi += deltaX * sensX;
            rotation.current.theta = Math.max(
              -Math.PI / 2.2,
              Math.min(Math.PI / 2.2, rotation.current.theta - deltaY * sensY)
            );

            // Track momentum for smooth inertia fling
            velocity.current = {
              x: deltaX * sensX,
              y: -deltaY * sensY,
            };
          }}
          className="relative z-10 w-full h-full opacity-0 transition-opacity duration-1000 cursor-grab touch-pan-y"
        />

        {/* 3D Real-time Projected Floating City Tags */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
          {CITIES.map((city, idx) => (
            <div
              key={city.name}
              ref={(el) => {
                tagElementsRef.current[idx] = el;
              }}
              className="absolute top-0 left-0 will-change-transform opacity-0 transition-opacity duration-150 flex flex-col items-center"
            >
              <div
                className={cn(
                  "px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-mono font-bold tracking-wider whitespace-nowrap shadow-md",
                  city.isPrimary
                    ? "bg-[#00e676] text-black ring-1 ring-emerald-300"
                    : "bg-blue-600/90 text-white border border-blue-400/40 backdrop-blur-sm"
                )}
              >
                {city.name}
              </div>
              {/* Pointer tick */}
              <div
                className={cn(
                  "w-1 h-1 sm:w-1.5 sm:h-1.5 rotate-45 -mt-0.5 sm:-mt-1",
                  city.isPrimary ? "bg-[#00e676]" : "bg-blue-600/90"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Spacious Bottom Title */}
      <div className="mt-7 flex items-center justify-center px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-200 uppercase font-sans">
          AWS SBG at Charusat
        </span>
      </div>
    </div>
  );
}

export default CobeGlobe;
