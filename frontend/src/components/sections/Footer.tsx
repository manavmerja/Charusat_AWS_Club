"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandTwitter, 
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandDiscord
} from "@tabler/icons-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const linksExplore = [
  { title: "Home", href: "#home" },
  { title: "About Us", href: "#about" },
  { title: "Events & Workshops", href: "#events" },
  { title: "Core Team", href: "#teams" },
  { title: "FAQs", href: "#faq" },
  { title: "Contact Us", href: "#contacts" }
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: IconBrandGithub },
  { name: "LinkedIn", href: "https://linkedin.com", icon: IconBrandLinkedin },
  { name: "Instagram", href: "https://instagram.com", icon: IconBrandInstagram },
  { name: "Discord", href: "https://discord.com", icon: IconBrandDiscord },
  { name: "YouTube", href: "https://youtube.com", icon: IconBrandYoutube },
  { name: "Twitter", href: "https://twitter.com", icon: IconBrandTwitter }
];

export function Footer() {
  return (
    <footer className="relative z-30 bg-[#070b13] text-gray-400 border-t border-white/[0.06]">
      <BackgroundBeamsWithCollision className="py-12 sm:py-16 w-full h-auto">
        {/* Background glow highlights */}
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-teal-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 items-start">
            
            {/* ── Brand Col (Large, clear logo) ── */}
            <div className="md:col-span-6 space-y-5">
              <Link href="/" className="inline-block group">
                <div className="relative p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 w-fit backdrop-blur-sm">
                  <Image 
                    src="/logo.png" 
                    alt="CHARUSAT AWS Student Builder Group Logo" 
                    width={260}
                    height={100}
                    className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,230,118,0.15)]" 
                    priority
                  />
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                Official AWS Student Builder Group at Charotar University of Science and Technology (CHARUSAT). Fostering cloud learning, architecture best practices, and hands-on developer workshops.
              </p>
            </div>

            {/* ── Quick Links ── */}
            <div className="md:col-span-3 space-y-4">
              <span className="block font-bold text-xs uppercase tracking-widest text-slate-200">
                Explore
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {linksExplore.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      href={item.href} 
                      className="text-slate-400 hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Social Media ── */}
            <div className="md:col-span-3 space-y-4">
              <span className="block font-bold text-xs uppercase tracking-widest text-slate-200">
                Connect With Us
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {socialLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── Bottom Bar ── */}
          <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              Designed & Built with passion by AWS Club CHARUSAT Team.
            </p>
            <p>
              &copy; {new Date().getFullYear()} AWS Club CHARUSAT. All rights reserved.
            </p>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </footer>
  );
}
