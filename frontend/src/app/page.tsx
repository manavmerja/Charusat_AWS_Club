import { HeroStarsBackground } from "@/components/dashboard/HeroStarsBackground";
import { StaggeredMenu } from "@/components/navigation/StaggeredMenu";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white relative selection:bg-[#00e676] selection:text-[#0b0f19] font-[var(--font-space-grotesk)]">
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
          { label: "LinkedIn", link: "https://linkedin.com" },
          { label: "Instagram", link: "https://instagram.com" },
          { label: "GitHub", link: "https://github.com" },
          { label: "Discord", link: "https://discord.com" },
        ]}
      />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-screen w-full flex items-center justify-center">
        <HeroStarsBackground />
      </section>

      {/* 2. ABOUT US SECTION (Dot Background & Nothing Font Style) */}
      <section id="about" className="relative min-h-screen w-full">
        <AboutSection />
      </section>

      {/* 3. EVENTS & WORKSHOPS SECTION */}
      <section
        id="events"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 py-24 border-t border-white/[0.06] bg-[#0d121f]"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-[#00e676] border border-emerald-500/20">
            Programs & Workshops
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Upcoming Events & Hackathons
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Stay tuned for upcoming bootcamps, speaker sessions, cloud architecting workshops, and community hackathons.
          </p>
        </div>
      </section>

      {/* 4. CORE TEAMS SECTION */}
      <section
        id="teams"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 py-24 border-t border-white/[0.06] bg-[#0b0f19]"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-[#00e676] border border-emerald-500/20">
            Meet The Builders
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Core Team & Mentors
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The passionate students and faculty leads driving cloud learning, web experiences, and community growth.
          </p>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <FAQSection />

      {/* 6. CONTACTS SECTION */}
      <ContactSection />

      {/* 7. FOOTER */}
      <Footer />
    </main>
  );
}
