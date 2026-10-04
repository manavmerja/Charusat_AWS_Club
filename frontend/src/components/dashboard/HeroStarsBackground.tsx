"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { TechText } from "@/components/ui/TechText";
import { LiquidButton } from "@/components/ui/liquid-button";
import Link from "next/link";
import { FaAws, FaCloudflare } from "react-icons/fa6";
import { SiTerraform, SiKubernetes } from "react-icons/si";

interface FloatingIconProps {
  icon: React.ReactNode;
  label?: string;
  className?: string;
  rotation?: number;
  duration?: number;
  delay?: number;
  yOffset?: number;
  glowColor?: string;
  sizeClassName?: string;
}

function FloatingIconCard({
  icon,
  className = "",
  rotation = 0,
  duration = 5,
  delay = 0,
  yOffset = 12,
  glowColor = "rgba(255, 153, 0, 0.15)",
  sizeClassName = "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20",
}: FloatingIconProps) {
  return (
    <motion.div
      initial={{ y: 0, rotate: rotation, opacity: 0, scale: 0.8 }}
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        rotate: [rotation - 2, rotation + 2, rotation - 2],
        opacity: 1,
        scale: 1,
      }}
      transition={{
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        rotate: {
          duration: duration * 1.15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        opacity: { duration: 0.7, delay: delay * 0.4 },
        scale: { duration: 0.7, delay: delay * 0.4 },
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={`group cursor-pointer select-none transform-gpu will-change-transform ${className}`}
    >
      <div
        className={`relative flex items-center justify-center ${sizeClassName} rounded-2xl md:rounded-3xl bg-[#111625]/90 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#141928]/95`}
      >
        {/* Subtle, Minimal Ambient Hover Glow */}
        <div
          className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroStarsBackground() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] flex items-center justify-center overflow-hidden font-[var(--font-space-grotesk)] select-none">
      {/* Animate-UI Stars Background */}
      <StarsBackground
        starColor="#FFF"
        factor={0.05}
        speed={50}
        className="absolute inset-0 z-0 bg-[#0b0f19]"
      />

      {/* Vibrant Soft Green Ambient Glow - Tuned for all screens */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none z-10 opacity-90"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(0, 230, 118, 0.45) 0%, rgba(16, 185, 129, 0.24) 45%, rgba(6, 78, 59, 0.12) 70%, transparent 90%)"
        }}
      />

      {/* ── Background Floating Cloud Badges (Hidden on mobile <768px for 60fps performance & clean view) ── */}
      
      {/* 1. Cloudflare Icon (Top-Right) */}
      <FloatingIconCard
        icon={<FaCloudflare className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#f38020]" />}
        className="absolute z-20 right-6 sm:right-16 lg:right-28 top-28 sm:top-32 md:top-36 hidden sm:block"
        sizeClassName="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22"
        rotation={-6}
        duration={5.2}
        delay={0.2}
        yOffset={14}
        glowColor="rgba(243, 128, 32, 0.25)"
      />

      {/* 2. Kubernetes Icon (Middle-Right area) */}
      <FloatingIconCard
        icon={<SiKubernetes className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#326ce5]" />}
        className="absolute z-20 right-4 sm:right-12 lg:right-20 top-1/2 -translate-y-8 hidden md:block"
        sizeClassName="w-16 h-16 sm:w-20 sm:h-20"
        rotation={8}
        duration={5.8}
        delay={0.7}
        yOffset={16}
        glowColor="rgba(50, 108, 229, 0.25)"
      />

      {/* 3. Terraform / Cloud Automation (Bottom-Right area) */}
      <FloatingIconCard
        icon={<SiTerraform className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#844fba]" />}
        className="absolute z-20 right-8 sm:right-20 lg:right-36 bottom-24 sm:bottom-28 hidden lg:block"
        sizeClassName="w-14 h-14 sm:w-18 sm:h-18"
        rotation={-8}
        duration={6.0}
        delay={1.0}
        yOffset={12}
        glowColor="rgba(132, 79, 186, 0.2)"
      />

      {/* Hero Content with Smooth Viewport Arrival Animation */}
      <motion.div
        initial={{ opacity: 0.88, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-20 flex flex-col items-start justify-center"
      >
        <h1 
          className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl mb-8 flex flex-col items-start"
          style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
        >
          {/* Row 1: AWS + Floating AWS Badge */}
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <span className="tracking-tight font-bold">AWS</span>
            
            <FloatingIconCard
              icon={<FaAws className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#ff9900]" />}
              className="inline-flex self-center my-auto"
              sizeClassName="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              rotation={-6}
              duration={4.8}
              delay={0.1}
              yOffset={6}
              glowColor="rgba(255, 153, 0, 0.25)"
            />
          </div>

          {/* Row 2: Student Builder Group */}
          <span className="tracking-tight font-bold">Student Builder Group</span>
          
          {/* Row 3: at + Charusat TechText */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap w-full mt-1">
            <span className="tracking-tight font-bold text-gray-200">at</span>
            <div className="relative w-full h-[65px] sm:h-[95px] md:h-[120px] lg:h-[150px] max-w-[420px] sm:max-w-[580px] -ml-1 sm:-ml-2">
              <TechText
                text="Charusat"
                fontWeight={700}
                fontSize={130}
                reveal="letter"
                dashLength={15}
                dashGap={2}
                specks={16}
                fontFamily="'Playfair Display', Georgia, Cambria, serif"
                color="#19b380"
                accentColor="#ffffff"
                letterSpacing={-0.05}
                reach={200}
                softness={0.7}
                strokeWidth={1.5}
                speed={1}
                lineStyle="dashed"
                selection={true}
                labels={true}
                draggable={true}
                sweep={true}
                align="left"
              />
            </div>
          </div>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12 font-sans font-light leading-relaxed">
          AWS Student Builder Group at CHARUSAT is a student-led community empowering the next generation of cloud builders through hands-on learning, technical events, and global community collaboration.
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="#contacts"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("contacts");
              const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, opts?: { duration?: number; easing?: (t: number) => number }) => void } }).lenis;
              if (lenis && element) {
                lenis.scrollTo(element, { duration: 1.7, easing: (t) => 1 - Math.pow(1 - t, 3.5) });
              } else if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
              window.history.pushState(null, "", "#contacts");
            }}
            className="inline-block cursor-pointer"
          >
            <LiquidButton size="default">
              JOIN COMMUNITY
            </LiquidButton>
          </a>
          <a
            href="#events"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("events");
              const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, opts?: { duration?: number; easing?: (t: number) => number }) => void } }).lenis;
              if (lenis && element) {
                lenis.scrollTo(element, { duration: 1.7, easing: (t) => 1 - Math.pow(1 - t, 3.5) });
              } else if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
              window.history.pushState(null, "", "#events");
            }}
            className="inline-block cursor-pointer"
          >
            <LiquidButton size="default" variant="secondary">
              EXPLORE EVENTS
            </LiquidButton>
          </a>
        </div>
      </motion.div>

      {/* Seamless Fade Transition to About Section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none z-10" />
    </div>
  );
}

export default HeroStarsBackground;
