"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import {
  ACADEMIC_MENTORS,
  STUDENT_LEADERSHIP,
  FOUNDING_DIVISIONS,
  type Socials,
} from "@/data/team"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { cn } from "@/lib/utils"

// Icons

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

function SocialLinks({
  name,
  socials,
  hideGithub,
}: {
  name: string
  socials?: Socials
  hideGithub?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      {socials?.linkedin ? (
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors duration-200 hover:text-[#00e676] hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070d]"
        >
          <LinkedInIcon className="h-[18px] w-[18px]" />
        </a>
      ) : (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-slate-600">
          <LinkedInIcon className="h-[18px] w-[18px]" />
        </span>
      )}

      {hideGithub ? null : socials?.github ? (
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on GitHub`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors duration-200 hover:text-[#00e676] hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070d]"
        >
          <GitHubIcon className="h-[18px] w-[18px]" />
        </a>
      ) : (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-slate-600">
          <GitHubIcon className="h-[18px] w-[18px]" />
        </span>
      )}
    </div>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

/** Profile Photo with initials placed safely in upper half */
function ProfilePhoto({
  name,
  image,
  sizes,
  colored = true,
}: {
  name: string
  image?: string
  sizes: string
  colored?: boolean
}) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 sm:pt-14 bg-gradient-to-br from-emerald-500/20 via-[#0d121f] to-teal-500/10">
        <span className="text-5xl sm:text-6xl font-extrabold tracking-wide text-emerald-300/80" aria-hidden="true">
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
      className={`object-cover object-top transition-[filter,transform] duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100 ${
        colored ? "grayscale-0" : "grayscale"
      }`}
    />
  )
}

/** <h2> Category Divider matching the reference design */
function CategoryHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center my-14 w-full">
      <div className="h-px flex-1 bg-gradient-to-r from-amber-500/40 via-amber-500/10 to-transparent" />
      <h2 className="px-5 py-1.5 rounded-full border border-amber-500/30 bg-[#0c0d16] text-amber-400 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase font-mono shadow-md mx-4 backdrop-blur-md">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-amber-500/40 via-amber-500/10 to-transparent" />
    </div>
  )
}

// 3D Card with generous aspect-[4/5] dimensions and clean text overlay

function Member3DCard({
  person,
  hideGithub,
}: {
  person: { name: string; role: string; image?: string; socials?: Socials }
  hideGithub?: boolean
}) {
  return (
    <CardContainer containerClassName="w-full h-full py-1" className="w-full h-full">
      <CardBody className="group relative w-full h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.045] to-white/[0.01] backdrop-blur-sm flex flex-col transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_35px_-10px_rgba(0,230,118,0.35)] cursor-default">
        {/* Photo Container with 4:5 Aspect Ratio */}
        <CardItem translateZ="30" className="relative aspect-[4/5] w-full overflow-hidden bg-[#0d121f]">
          <ProfilePhoto
            name={person.name}
            image={person.image}
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
          />

          {/* Deep dark gradient overlay for crystal clear text */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#07070d] via-[#07070d]/80 to-transparent" />

          {/* Member Name and Role Overlay with 3D Float */}
          <div className="absolute inset-x-0 bottom-0 p-5 z-10">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-sm">
              {person.name}
            </h3>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-[#00e676] leading-tight">
              {person.role}
            </p>
          </div>
        </CardItem>

        {/* Bottom Socials Bar */}
        <CardItem
          translateZ="20"
          className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#07070d]/60 px-5 py-4 w-full"
        >
          <SocialLinks name={person.name} socials={person.socials} hideGithub={hideGithub} />
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

// Main Team Section

export function TeamSection() {
  const [showMoreMobile, setShowMoreMobile] = useState(false)
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
      className="relative w-full min-h-screen flex flex-col items-center px-4 sm:px-8 lg:px-12 py-24 border-t border-white/[0.06] bg-[#07070d] text-slate-200 overflow-hidden"
    >
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-purple-900/[0.04] blur-[140px]" />
      </div>

      {/* Section Header */}
      <motion.div
        {...reveal()}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
      >
        <div className="max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00e676]">
            TEAM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2 leading-tight">
            Meet the Team Behind{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-emerald-400 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
        </div>

        <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed lg:pb-1">
          Behind every meetup, workshop, and community conversation is a group of people who
          genuinely care about bringing builders together.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-16">
        {/* 1. Academic Mentors (Always visible on mobile & desktop) */}
        {ACADEMIC_MENTORS.length > 0 && (
          <div>
            <CategoryHeading>Academic Mentors</CategoryHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {ACADEMIC_MENTORS.map((person, i) => (
                <motion.div key={`${person.name}-${person.role}`} {...reveal(i * 0.08)}>
                  <Member3DCard
                    person={{
                      name: person.name,
                      role: person.role,
                      image: person.image,
                      socials: person.socials,
                    }}
                    hideGithub
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Student Leadership (Always visible on mobile & desktop) */}
        {STUDENT_LEADERSHIP.length > 0 && (
          <div>
            <CategoryHeading>Student Leadership</CategoryHeading>
            <div className="max-w-xs mx-auto">
              {STUDENT_LEADERSHIP.map((person, i) => (
                <motion.div key={`${person.name}-${person.role}`} {...reveal(i * 0.08)}>
                  <Member3DCard
                    person={{
                      name: person.name,
                      role: person.role,
                      image: person.image,
                      socials: person.socials,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Founding Divisions (Visible on desktop; toggleable on mobile) */}
        <div className={cn("space-y-16", !showMoreMobile && "hidden md:block")}>
          {FOUNDING_DIVISIONS.map((division) => (
            <div key={division.id}>
              <CategoryHeading>{division.name}</CategoryHeading>
              <div
                className={cn(
                  "grid gap-6",
                  division.members.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                    : division.members.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto"
                    : division.members.length === 4
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                )}
              >
                {division.members.map((person, i) => (
                  <motion.div key={`${person.name}-${person.role}`} {...reveal((i % 5) * 0.05)}>
                    <Member3DCard
                      person={{
                        name: person.name,
                        role: person.role,
                        image: person.image,
                        socials: person.socials,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Toggle Button (Only on screens smaller than md:) */}
        <div className="flex justify-center pt-2 md:hidden">
          <button
            type="button"
            onClick={() => setShowMoreMobile((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-[#0c0d16] hover:bg-white/[0.05] text-xs font-mono font-medium text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
          >
            <span>{showMoreMobile ? "Show Less" : "Show More Team Members"}</span>
            <svg
              className={cn(
                "w-4 h-4 text-[#00e676] transition-transform duration-300",
                showMoreMobile && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
