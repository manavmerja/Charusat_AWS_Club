"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  IconBrandLinkedin, 
  IconBrandInstagram, 
} from "@tabler/icons-react";
import { FaMeetup } from "react-icons/fa6";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FluidGradientText } from "@/components/ui/fluid-gradient-text";

const linksExplore = [
  { title: "Home", href: "#home" },
  { title: "About Us", href: "#about" },
  { title: "Events & Workshops", href: "#events" },
  { title: "Core Team", href: "#teams" },
  { title: "FAQs", href: "#faq" },
  { title: "Contact Us", href: "#contacts" }
];

const socialLinks = [
  { name: "Meetup", href: "https://www.meetup.com/pro/aws-student-community", icon: FaMeetup },
  { name: "LinkedIn", href: "https://linkedin.com", icon: IconBrandLinkedin },
  { name: "Instagram", href: "https://instagram.com", icon: IconBrandInstagram },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      window.history.pushState(null, "", href);
    }
  };

  return (
    <footer className="relative z-30 bg-black text-gray-400 overflow-hidden">
      <BackgroundBeamsWithCollision className="pt-14 pb-8 sm:pt-16 sm:pb-10 w-full h-auto min-h-auto bg-black">
        
        {/* Background Dot Pattern matching portfolio (centered subtle circle with soft opacity) */}
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
          <DotPattern 
            className="opacity-40 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" 
            width={20} 
            height={20} 
            cx={1} 
            cy={1} 
            cr={1} 
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10 w-full flex flex-col">
          
          {/* Main Content Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 items-start">
            
            {/* ── Brand Col (Large, clear logo with Glassmorphism Card) ── */}
            <div className="md:col-span-6 space-y-5">
              <Link href="/" className="inline-block group">
                <div className="relative p-4 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/15 hover:border-emerald-500/40 hover:bg-white/[0.08] transition-all duration-300 w-fit backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/[0.06] to-transparent pointer-events-none" />
                  <Image 
                    src="/logo.png" 
                    alt="CHARUSAT AWS Student Builder Group Logo" 
                    width={260}
                    height={100}
                    className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,230,118,0.25)] relative z-10" 
                    priority
                  />
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-sans">
                Official AWS Student Builder Group at Charotar University of Science and Technology (CHARUSAT). Fostering cloud learning, architecture best practices, and hands-on developer workshops.
              </p>
            </div>

            {/* ── Quick Links (Smooth Scroll on click) ── */}
            <div className="md:col-span-3 space-y-4">
              <span className="block font-bold text-xs uppercase tracking-widest text-slate-200">
                Explore
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {linksExplore.map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href} 
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="text-slate-400 hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Social Media (Meetup, LinkedIn, Instagram) ── */}
            <div className="md:col-span-3 space-y-4">
              <span className="block font-bold text-xs uppercase tracking-widest text-slate-200">
                Connect With Us
              </span>
              <div className="flex flex-col gap-2.5 max-w-[200px]">
                {socialLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-emerald-500/40 transition-all duration-200 group backdrop-blur-sm"
                    >
                      <Icon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── Fluid Gradient Text Watermark ── */}
          <div className="w-full my-6 sm:my-8 pt-4 border-t border-white/10">
            <FluidGradientText 
              text="AWS ✕ CHARUSAT" 
              svgViewBoxWidth={800} 
              svgViewBoxHeight={82}
              fontSize={85}
              className="h-40 sm:h-52 md:h-64"
            />
          </div>

          {/* ── Bottom Bar ── */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Designed & Built with passion by AWS Student builder Group at Charusat.
            </p>
            <p>
              &copy; {currentYear} AWS Student builder Group at Charusat. All rights reserved.
            </p>
          </div>

        </div>
      </BackgroundBeamsWithCollision>
    </footer>
  );
}

export default Footer;
