"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface CobeGlobeProps {
  className?: string;
}

interface AwsRegionMarker {
  code: string;
  locationName: string;
  lat: number;
  lng: number;
  isPrimary?: boolean;
}

// Official Major AWS Global Cloud Regions
const AWS_REGIONS: AwsRegionMarker[] = [
  { code: "ap-south-1", locationName: "Mumbai", lat: 19.076, lng: 72.8777, isPrimary: true },
  { code: "us-east-1", locationName: "N. Virginia", lat: 38.0321, lng: -78.4775 },
  { code: "us-west-2", locationName: "Oregon", lat: 45.5152, lng: -122.6784 },
  { code: "eu-west-1", locationName: "Ireland", lat: 53.3498, lng: -6.2603 },
  { code: "eu-central-1", locationName: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { code: "ap-southeast-1", locationName: "Singapore", lat: 1.3521, lng: 103.8198 },
  { code: "ap-northeast-1", locationName: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { code: "ap-southeast-2", locationName: "Sydney", lat: -33.8688, lng: 151.2093 },
  { code: "sa-east-1", locationName: "São Paulo", lat: -23.5505, lng: -46.6333 },
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
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isTouchSpinning = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotation = useRef<{ phi: number; theta: number }>({ phi: 0, theta: 0.22 });
  const isVisibleRef = useRef(true);

  // Ergonomic tilt boundaries (prevents severe pole distortion and gimbal lock)
  const DEFAULT_THETA = 0.22;
  const MIN_THETA = -0.45;
  const MAX_THETA = 0.55;

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
        markers: AWS_REGIONS.map((r) => ({
          location: [r.lat, r.lng] as [number, number],
          size: r.isPrimary ? 0.07 : 0.04,
        })),
        // Real AWS Global Backbone Fiber Arcs
        arcs: [
          // Mumbai ↔ Frankfurt (Asia-Europe Transit)
          { from: [19.076, 72.8777], to: [50.1109, 8.6821] },
          // Mumbai ↔ Singapore (South Asia Corridor)
          { from: [19.076, 72.8777], to: [1.3521, 103.8198] },
          // Frankfurt ↔ Ireland
          { from: [50.1109, 8.6821], to: [53.3498, -6.2603] },
          // Ireland ↔ N. Virginia (Transatlantic Fiber)
          { from: [53.3498, -6.2603], to: [38.0321, -78.4775] },
          // N. Virginia ↔ Oregon (US Continental Backbone)
          { from: [38.0321, -78.4775], to: [45.5152, -122.6784] },
          // N. Virginia ↔ São Paulo (Pan-American Route)
          { from: [38.0321, -78.4775], to: [-23.5505, -46.6333] },
          // Oregon ↔ Tokyo (Transpacific Fiber)
          { from: [45.5152, -122.6784], to: [35.6762, 139.6503] },
          // Tokyo ↔ Singapore (East Asia Backbone)
          { from: [35.6762, 139.6503], to: [1.3521, 103.8198] },
          // Singapore ↔ Sydney (Oceania Link)
          { from: [1.3521, 103.8198], to: [-33.8688, 151.2093] },
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

    // Dynamic scroll rotation: subtle spin when user scrolls down the page
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const onWindowScroll = () => {
      if (!isVisibleRef.current) return;
      const currentY = window.scrollY;
      const deltaScroll = currentY - lastScrollY;
      lastScrollY = currentY;
      if (Math.abs(deltaScroll) > 0.5) {
        rotation.current.phi += deltaScroll * 0.001;
      }
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    const animate = () => {
      if (isDisposed || !isVisibleRef.current) {
        animationFrameId = 0;
        return;
      }

      if (isDragging.current) {
        // Active drag updates rotation directly
      } else {
        // Inertia coasting & auto-spin in all axes
        if (
          Math.abs(velocity.current.x) > 0.0001 ||
          Math.abs(velocity.current.y) > 0.0001
        ) {
          rotation.current.phi += velocity.current.x;
          rotation.current.theta = Math.max(
            MIN_THETA,
            Math.min(MAX_THETA, rotation.current.theta + velocity.current.y)
          );
          // Smooth friction damping
          velocity.current.x *= 0.94;
          velocity.current.y *= 0.94;
        } else {
          // Continuous smooth auto-rotation
          rotation.current.phi += 0.0028;
        }

        // Gentle spring return to default elevation so the globe always stays aesthetically centered
        rotation.current.theta += (DEFAULT_THETA - rotation.current.theta) * 0.025;
      }

      const currentPhi = rotation.current.phi;
      const currentTheta = rotation.current.theta;

      if (globe) {
        globe.update({
          phi: currentPhi,
          theta: currentTheta,
        });
      }

      // Update 3D projected AWS region tags using GPU translate3d (zero layout reflow)
      AWS_REGIONS.forEach((region, index) => {
        const el = tagElementsRef.current[index];
        if (!el || !region) return;
        const proj = projectToScreen(
          region.lat,
          region.lng,
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
        } catch { }
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onWindowScroll);
      tagElementsRef.current = [];
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

        {/* Interactive WebGL Canvas with Multi-Directional Rotation & Non-Blocking Touch */}
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            isDragging.current = true;
            pointerIdRef.current = e.pointerId;
            lastPointerPos.current = { x: e.clientX, y: e.clientY };
            velocity.current = { x: 0, y: 0 };

            if (e.pointerType === "mouse") {
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grabbing";
                try {
                  canvasRef.current.setPointerCapture(e.pointerId);
                } catch { }
              }
            } else {
              // Touch pointer: initialize touch tracker so vertical page scroll is never trapped
              touchStartPos.current = { x: e.clientX, y: e.clientY };
              isTouchSpinning.current = false;
            }
          }}
          onPointerUp={(e) => {
            isDragging.current = false;
            touchStartPos.current = null;
            isTouchSpinning.current = false;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
              try {
                canvasRef.current.releasePointerCapture(e.pointerId);
              } catch { }
            }
          }}
          onPointerCancel={(e) => {
            isDragging.current = false;
            touchStartPos.current = null;
            isTouchSpinning.current = false;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
              try {
                canvasRef.current.releasePointerCapture(e.pointerId);
              } catch { }
            }
          }}
          onPointerMove={(e) => {
            if (!isDragging.current) return;

            // Touch gesture arbitration: if user is scrolling vertically, let native scroll work freely
            if (e.pointerType === "touch" && touchStartPos.current && !isTouchSpinning.current) {
              const distX = Math.abs(e.clientX - touchStartPos.current.x);
              const distY = Math.abs(e.clientY - touchStartPos.current.y);
              if (distX < 8 && distY < 8) return; // Wait for intentional gesture

              if (distY > distX) {
                // User is scrolling the page vertically! Release and let browser scroll freely
                isDragging.current = false;
                touchStartPos.current = null;
                return;
              } else {
                // User is spinning the globe horizontally/diagonally!
                isTouchSpinning.current = true;
                try {
                  canvasRef.current?.setPointerCapture(e.pointerId);
                } catch { }
              }
            }

            const deltaX = e.clientX - lastPointerPos.current.x;
            const deltaY = e.clientY - lastPointerPos.current.y;
            lastPointerPos.current = { x: e.clientX, y: e.clientY };

            const sensX = 0.0055;
            const sensY = 0.0045;

            // Natural multi-directional rotation (left, right, up, down, diagonal)
            rotation.current.phi += deltaX * sensX;
            rotation.current.theta = Math.max(
              MIN_THETA,
              Math.min(MAX_THETA, rotation.current.theta + deltaY * sensY)
            );

            // Track momentum for smooth inertia fling in all directions
            velocity.current = {
              x: deltaX * sensX,
              y: deltaY * sensY,
            };
          }}
          onWheel={(e) => {
            // Passive scroll response: roll globe subtly with wheel without blocking page scroll
            rotation.current.phi += e.deltaY * 0.0006;
          }}
          className="relative z-10 w-full h-full opacity-0 transition-opacity duration-1000 cursor-grab active:cursor-grabbing touch-pan-y"
        />

        {/* 3D Real-time Projected Floating AWS Region Tags */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
          {AWS_REGIONS.map((region, idx) => (
            <div
              key={region.code}
              ref={(el) => {
                tagElementsRef.current[idx] = el;
              }}
              className="absolute top-0 left-0 will-change-transform opacity-0 transition-opacity duration-150 flex flex-col items-center"
            >
              <div
                className={cn(
                  "px-2.5 py-0.5 rounded-md text-[8.5px] sm:text-[10px] font-mono font-bold tracking-wider whitespace-nowrap shadow-md flex items-center gap-1.5 transition-colors",
                  region.isPrimary
                    ? "bg-[#00e676] text-black ring-1 ring-emerald-300 shadow-[0_0_14px_rgba(0,230,118,0.55)]"
                    : "bg-[#0b101d]/90 text-slate-200 border border-white/10 backdrop-blur-md"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    region.isPrimary ? "bg-black" : "bg-[#00e676]"
                  )}
                />
                <span className="font-bold tracking-tight">{region.code}</span>
                <span
                  className={cn(
                    "text-[8px] sm:text-[9.5px] font-sans font-bold",
                    region.isPrimary ? "text-black" : "text-emerald-400 font-medium"
                  )}
                >
                  ({region.locationName})
                </span>
              </div>
              {/* Pointer tick */}
              <div
                className={cn(
                  "w-1 h-1 sm:w-1.5 sm:h-1.5 rotate-45 -mt-0.5 sm:-mt-1",
                  region.isPrimary ? "bg-[#00e676]" : "bg-[#0b101d]"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Clean AWS Global Infrastructure Badge */}
      <div className="mt-7 flex items-center justify-center px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-200 uppercase font-sans">
          AWS Global Infrastructure
        </span>
      </div>
    </div>
  );
}

export default CobeGlobe;
