"use client"

import React, { useId, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, CalendarClock, CalendarDays, MapPin, Video } from "lucide-react"
import { MotionCarousel } from "@/components/animate-ui/components/community/motion-carousel"
import { formatEventDate, splitEvents, type ClubEvent } from "@/data/events"
import { Highlight } from "@/components/ui/hero-highlight"
import { cn } from "@/lib/utils"

type Filter = "upcoming" | "past"

// Shared pieces

function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0b0f19]/70 text-[#00e676] border border-emerald-500/30 backdrop-blur-md">
      {children}
    </span>
  )
}

function EventMeta({ event, className = "" }: { event: ClubEvent; className?: string }) {
  const ModeIcon = event.mode === "Online" ? Video : MapPin
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-300 ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4 text-emerald-400" aria-hidden="true" />
        {formatEventDate(event)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ModeIcon className="h-4 w-4 text-emerald-400" aria-hidden="true" />
        {event.mode}
      </span>
    </div>
  )
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d121f]"

// Filter tabs

function FilterTabs({
  value,
  onChange,
  counts,
  idPrefix,
}: {
  value: Filter
  onChange: (f: Filter) => void
  counts: Record<Filter, number>
  idPrefix: string
}) {
  const tabs: { key: Filter; label: string }[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
  ]

  return (
    <div
      role="tablist"
      aria-label="Filter events"
      className="relative inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-sm"
      onKeyDown={(e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
        e.preventDefault()
        const next = value === "upcoming" ? "past" : "upcoming"
        onChange(next)
        document.getElementById(`${idPrefix}-tab-${next}`)?.focus()
      }}
    >
      {tabs.map(({ key, label }) => {
        const selected = value === key
        return (
          <button
            key={key}
            id={`${idPrefix}-tab-${key}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(key)}
            className={`relative z-0 inline-flex min-h-11 items-center gap-2 rounded-full px-5 sm:px-6 text-sm font-bold cursor-pointer transition-colors duration-200 ${focusRing} ${
              selected ? "text-slate-950" : "text-slate-300 hover:text-white"
            }`}
          >
            {selected && (
              <motion.span
                layoutId={`${idPrefix}-active-pill`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#00e676] via-emerald-400 to-teal-400"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {label}
            <span
              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums ${
                selected ? "bg-black/15 text-slate-950" : "bg-white/[0.08] text-slate-300"
              }`}
            >
              {counts[key]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// Upcoming: big featured cards

function FeaturedEventCard({ event }: { event: ClubEvent }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent shadow-[0_0_60px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_50px_-12px_rgba(0,230,118,0.4)]">
      <div className="absolute top-0 left-10 right-10 z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-[#0b0f19]">
          <Image
            src={event.cover}
            alt={`${event.title} cover`}
            fill
            priority
            sizes="(min-width: 1024px) 640px, 100vw"
            style={{ objectPosition: event.coverPosition }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0d121f]/60" />
          <div className="absolute left-5 top-5 flex gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#00e676] text-[#0b0f19]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b0f19] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              Upcoming
            </span>
            <CategoryPill>{event.category}</CategoryPill>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{event.title}</h3>
            <p className="text-base sm:text-lg font-medium text-emerald-300">{event.tagline}</p>
          </div>
          <EventMeta event={event} />
          <p className="text-slate-400 leading-relaxed">{event.description[0]}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {event.registerUrl && (
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-[#00e676] px-6 font-semibold text-[#0b0f19] transition-colors duration-200 hover:bg-emerald-400 ${focusRing}`}
              >
                Register now
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <Link
              href={`/events/${event.slug}`}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 font-semibold text-white transition-colors duration-200 hover:border-emerald-500/40 hover:text-[#00e676] ${focusRing}`}
            >
              View details
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function UpcomingEmptyState({ onShowPast, hasPast }: { onShowPast: () => void; hasPast: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-transparent px-6 py-16 sm:py-20 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[480px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[80px]" />
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[#00e676]">
          <CalendarClock className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">Our next event is in the works</h3>
        <p className="text-slate-400 leading-relaxed">
          Bootcamps, speaker sessions and hackathons are being planned. Follow along so you don&apos;t miss the
          announcement — meanwhile, catch up on what we&apos;ve built so far.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {hasPast && (
            <button
              type="button"
              onClick={onShowPast}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-[#00e676] px-6 font-semibold text-[#0b0f19] cursor-pointer transition-colors duration-200 hover:bg-emerald-400 ${focusRing}`}
            >
              Browse past events
            </button>
          )}
          <a
            href="#contacts"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 font-semibold text-white transition-colors duration-200 hover:border-emerald-500/40 hover:text-[#00e676] ${focusRing}`}
          >
            Get notified
          </a>
        </div>
      </div>
    </div>
  )
}

// Past: carousel cards

function PastEventCard({ event, isActive }: { event: ClubEvent; isActive: boolean }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      tabIndex={isActive ? 0 : -1}
      aria-label={`${event.title} — view event details`}
      draggable={false}
      className={`group relative block aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f19] cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_45px_-12px_rgba(0,230,118,0.45)] ${focusRing}`}
    >
      <Image
        src={event.cover}
        alt=""
        fill
        draggable={false}
        sizes="(min-width: 1024px) 640px, (min-width: 640px) 70vw, 88vw"
        style={{ objectPosition: event.coverPosition }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent" />

      <div className="absolute left-5 top-5">
        <CategoryPill>{event.category}</CategoryPill>
      </div>

      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0b0f19]/60 text-white backdrop-blur-md transition-colors duration-200 group-hover:border-emerald-400/60 group-hover:bg-[#00e676] group-hover:text-[#0b0f19]">
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:p-7">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{event.title}</h3>
          <p className="mt-1 text-sm sm:text-base text-emerald-300">{event.tagline}</p>
        </div>
        <EventMeta event={event} />
      </div>
    </Link>
  )
}

// Main Events Section

export function EventsSection() {
  const { upcoming, past } = splitEvents()
  const [filter, setFilter] = useState<Filter>("upcoming")
  const reduceMotion = useReducedMotion()
  const idPrefix = useId()

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      }

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <section
      id="events"
      className="relative w-full min-h-screen flex flex-col items-center px-6 sm:px-12 py-24 bg-black overflow-hidden"
    >
      {/* Subtle Aceternity Grid Background (ultra-subtle texture) */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-0 opacity-[0.15]",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]",
          "[mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_20%,transparent_100%)]"
        )}
      />

      {/* Subtle radial glow background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-emerald-500/[0.04] blur-[140px]" />
        <div className="absolute left-0 bottom-1/4 w-[380px] h-[380px] rounded-full bg-teal-500/[0.03] blur-[120px]" />
      </div>

      {/* Section header (Left-aligned title + Right-aligned paragraph like TeamSection) */}
      <motion.div
        {...reveal}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00e676]">
            EVENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2 leading-tight">
            Upcoming <Highlight className="text-white bg-gradient-to-r from-emerald-500/30 via-[#00e676]/30 to-teal-400/30">Events</Highlight>
          </h2>
        </div>

        <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed lg:pb-1">
          Stay tuned for upcoming bootcamps, speaker sessions, cloud architecting workshops, and community hackathons.
        </p>
      </motion.div>

      {/* Filter Tabs aligned with section */}
      <motion.div {...reveal} className="relative z-10 w-full max-w-6xl mx-auto flex justify-start mb-10">
        <FilterTabs
          value={filter}
          onChange={setFilter}
          counts={{ upcoming: upcoming.length, past: past.length }}
          idPrefix={idPrefix}
        />
      </motion.div>

      <div
        id={`${idPrefix}-panel`}
        role="tabpanel"
        aria-labelledby={`${idPrefix}-tab-${filter}`}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          {filter === "upcoming" ? (
            <motion.div key="upcoming" {...panelMotion} className="space-y-8">
              {upcoming.length > 0 ? (
                upcoming.map((event) => <FeaturedEventCard key={event.slug} event={event} />)
              ) : (
                <UpcomingEmptyState hasPast={past.length > 0} onShowPast={() => setFilter("past")} />
              )}
            </motion.div>
          ) : (
            <motion.div key="past" {...panelMotion}>
              {past.length > 0 ? (
                <MotionCarousel
                  slides={past}
                  getKey={(e) => e.slug}
                  getLabel={(e) => e.title}
                  options={{ loop: false, align: "center" }}
                  renderSlide={(event, { isActive }) => <PastEventCard event={event} isActive={isActive} />}
                />
              ) : (
                <p className="text-center text-slate-400">Past events will appear here.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
