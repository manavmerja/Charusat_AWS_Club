"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { WordsPreloader } from "@/components/ui/WordsPreloader";
import { HeroStarsBackground } from "@/components/dashboard/HeroStarsBackground";
import { StaggeredMenu } from "@/components/navigation/StaggeredMenu";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <WordsPreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-black text-white relative selection:bg-[#00e676] selection:text-[#0b0f19] font-[var(--font-space-grotesk)]">
      {/* Top Staggered Menu Navigation */}
      <StaggeredMenu
        colors={["#0f172a", "#064e3b", "#00e676"]}
        accentColor="#00e676"
        items={[
          { label: "Home", ariaLabel: "Home", link: "#home" },
          { label: "About", ariaLabel: "About Us", link: "#about" },
          { label: "Events", ariaLabel: "Events", link: "#events" },
          { label: "Teams", ariaLabel: "Core Team", link: "#teams" },
          { label: "FAQ", ariaLabel: "Frequently Asked Questions", link: "#faq" },
          { label: "Contacts", ariaLabel: "Contact Us", link: "#contacts" },
        ]}
        socialItems={[
          { label: "Meetup", link: "https://www.meetup.com/pro/aws-student-community" },
          { label: "LinkedIn", link: "https://linkedin.com" },
          { label: "Instagram", link: "https://instagram.com" },
        ]}
      />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative w-full min-h-screen">
        <HeroStarsBackground />
      </section>

      {/* 2. ABOUT US SECTION (Dot Background & Nothing Font Style) */}
      <section id="about" className="relative min-h-screen w-full">
        <AboutSection />
      </section>

      {/* 3. EVENTS & WORKSHOPS SECTION */}
      <EventsSection />

      {/* 4. CORE TEAMS SECTION */}
      <TeamSection />

      {/* 5. FAQ SECTION */}
      <FAQSection />

      {/* 6. CONTACTS SECTION */}
      <ContactSection />

      {/* 7. FOOTER */}
      <Footer />
    </main>
    </>
  );
}
