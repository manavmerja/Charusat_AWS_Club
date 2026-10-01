"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { FACULTY, MEMBERS, type Faculty, type Member, type Socials } from "@/data/team"

// ─── Icons ────────────────────────────────────────────────────────────────────

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}

// ─── Shared pieces ────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

/** Fills its (relative) parent with the profile photo, or an initials fallback if missing/broken. */
function ProfilePhoto({ name, image, sizes }: { name: string; image?: string; sizes: string }) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-[#0d121f] to-teal-500/10">
        <span className="text-5xl font-extrabold tracking-wide text-emerald-300/80" aria-hidden="true">
          {initials(name)}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={image}
      alt={`Photo of ${name}`}
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
    />
  )
}

const SOCIAL_LINKS: {
  key: keyof Socials
  label: string
  Icon: (props: { className?: string }) => React.JSX.Element
  href: (value: string) => string
}[] = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon, href: (v) => v },
  { key: "github", label: "GitHub", Icon: GitHubIcon, href: (v) => v },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, href: (v) => v },
  { key: "email", label: "Email", Icon: MailIcon, href: (v) => `mailto:${v}` },
]

function SocialLinks({ name, socials }: { name: string; socials?: Socials }) {
  if (!socials) return null
  const links = SOCIAL_LINKS.filter(({ key }) => socials[key])
  if (links.length === 0) return null

  return (
    <div className="flex items-center gap-2">
      {links.map(({ key, label, Icon, href }) => (
        <a
          key={key}
          href={href(socials[key]!)}
          target={key === "email" ? undefined : "_blank"}
          rel={key === "email" ? undefined : "noopener noreferrer"}
          aria-label={`${name} on ${label}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 cursor-pointer transition-colors duration-200 hover:text-[#00e676] hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f19]"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  )
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-500/30" />
      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">{children}</h3>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-500/30" />
    </div>
  )
}

// ─── Cards ────────────────────────────────────────────────────────────────────

function FacultyCard({ person }: { person: Faculty }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-sm shadow-[0_0_60px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_40px_-10px_rgba(0,230,118,0.35)]">
      <div className="absolute top-0 left-8 right-8 z-10 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="flex h-full flex-col sm:flex-row">
        {/* Photo */}
        <div className="relative aspect-[4/5] sm:aspect-auto sm:w-48 lg:w-56 shrink-0 overflow-hidden bg-[#0d121f]">
          <ProfilePhoto name={person.name} image={person.image} sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 100vw" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0f19]/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[#0b0f19]/40" />
        </div>

        {/* Details */}
        <div className="relative flex flex-1 flex-col justify-center gap-3 p-6 sm:p-7">
          <span className="self-start px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-[#00e676] border border-emerald-500/20">
            {person.role}
          </span>
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight">{person.name}</h4>
            <p className="mt-1 text-sm text-slate-300">{person.designation}</p>
            <p className="text-sm text-slate-400">{person.department}</p>
          </div>
          <div className="pt-1">
            <SocialLinks name={person.name} socials={person.socials} />
          </div>
        </div>
      </div>
    </div>
  )
}

function MemberCard({ person }: { person: Member }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.045] to-white/[0.01] backdrop-blur-sm flex flex-col transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_35px_-12px_rgba(0,230,118,0.4)] motion-reduce:hover:translate-y-0">
      {/* Photo */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0d121f]">
        <ProfilePhoto name={person.name} image={person.image} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/50 to-transparent" />

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider text-slate-200 bg-black/40 backdrop-blur-md border border-white/10">
          {person.domain}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h4 className="text-lg font-bold text-white leading-tight">{person.name}</h4>
          <p className="mt-0.5 text-sm font-semibold text-[#00e676]">{person.role}</p>
        </div>
      </div>

      {/* Socials */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-4">
        <SocialLinks name={person.name} socials={person.socials} />
      </div>
    </div>
  )
}

// ─── Main Team Section ────────────────────────────────────────────────────────

export function TeamSection() {
  const reduceMotion = useReducedMotion()
  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section
      id="teams"
      className="relative w-full min-h-screen flex flex-col items-center px-6 sm:px-12 py-24 border-t border-white/[0.06] bg-[#0b0f19] overflow-hidden"
    >
      {/* Subtle radial glow background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-500/[0.05] blur-[110px]" />
        <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/[0.04] blur-[90px]" />
      </div>

      {/* Section header */}
      <motion.div {...reveal()} className="relative z-10 max-w-4xl mx-auto text-center space-y-4 mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-[#00e676] border border-emerald-500/20">
          Meet The Builders
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Core Team &{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Mentors</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          The passionate students and faculty leads driving cloud learning, web experiences, and community growth.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-20">
        {/* Faculty */}
        {FACULTY.length > 0 && (
          <div>
            <GroupLabel>Faculty Mentors</GroupLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {FACULTY.map((person, i) => (
                <motion.div key={`${person.name}-${person.role}`} {...reveal(i * 0.08)}>
                  <FacultyCard person={person} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Core team */}
        {MEMBERS.length > 0 && (
          <div>
            <GroupLabel>Core Team</GroupLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MEMBERS.map((person, i) => (
                <motion.div key={`${person.name}-${person.role}`} {...reveal((i % 4) * 0.05)}>
                  <MemberCard person={person} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
