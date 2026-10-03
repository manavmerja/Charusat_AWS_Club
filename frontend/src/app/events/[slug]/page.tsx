import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock, MapPin, Mic, Sparkles, Tag, Users, Video } from "lucide-react"
import { EVENTS, formatEventDate, getEvent, isUpcoming, type Speaker } from "@/data/events"

export const dynamicParams = false

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }))
}

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: EventPageProps): Promise<Metadata> {
  const { slug } = await props.params
  const event = getEvent(slug)
  if (!event) return {}
  return {
    title: `${event.title} | AWS Cloud Club CHARUSAT`,
    description: `${event.tagline}. ${event.description[0]}`,
    openGraph: { images: [event.cover] },
  }
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c14]"

function initials(name: string) {
  return name
    .replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function SectionHeading({ icon: Icon, children }: { icon: typeof Mic; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white tracking-tight">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-[#00e676] shadow-[0_0_15px_rgba(0,230,118,0.2)]">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      {children}
    </h2>
  )
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="group relative overflow-hidden flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-[#0d1322]/80 to-white/[0.01] p-5 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(0,230,118,0.25)]">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#0d121f] shadow-md">
        {speaker.image ? (
          <Image src={speaker.image} alt={`Photo of ${speaker.name}`} fill sizes="80px" className="object-cover object-[45%_25%] transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-[#0d121f] to-teal-500/10">
            <span className="text-2xl font-extrabold text-emerald-300/80" aria-hidden="true">
              {initials(speaker.name)}
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-lg font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">{speaker.name}</p>
        <p className="text-sm font-semibold text-[#00e676]">{speaker.title}</p>
        {speaker.bio && <p className="text-sm text-slate-400 leading-relaxed">{speaker.bio}</p>}
        {speaker.linkedin && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#00e676] transition-colors pt-0.5 ${focusRing}`}
          >
            LinkedIn <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}

export default async function EventPage(props: EventPageProps) {
  const { slug } = await props.params
  const event = getEvent(slug)
  if (!event) notFound()

  const upcoming = isUpcoming(event)
  const ModeIcon = event.mode === "Online" ? Video : MapPin
  const otherEvents = EVENTS.filter((e) => e.slug !== event.slug)

  const details = [
    { icon: CalendarDays, label: "Date", value: formatEventDate(event) },
    event.time && { icon: Clock, label: "Time", value: event.time },
    { icon: ModeIcon, label: "Format", value: event.mode },
    event.venue && { icon: MapPin, label: "Venue", value: event.venue },
  ].filter(Boolean) as { icon: typeof Mic; label: string; value: string }[]

  return (
    <main className="relative min-h-screen bg-[#080c14] text-white selection:bg-[#00e676] selection:text-[#080c14] font-[var(--font-space-grotesk)] overflow-x-hidden">
      {/* Dynamic Ambient Cover Reflection Layer */}
      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden opacity-30 select-none">
        <Image
          src={event.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover blur-[140px] scale-125 saturate-150"
        />
        <div className="absolute inset-0 bg-[#080c14]/75 mix-blend-multiply" />
      </div>

      {/* Cyber Dot-Matrix Grid Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

      {/* Glowing Ambient Light Orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-2/3 -right-48 h-[450px] w-[450px] rounded-full bg-teal-500/10 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute bottom-12 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px] -z-10" />

      {/* Hero Section */}
      <header className="relative isolate min-h-[70vh] sm:min-h-[78vh] w-full overflow-hidden flex items-end">
        <Image
          src={event.cover}
          alt={`${event.title} cover`}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: event.coverPosition }}
          className="-z-20 object-cover"
        />
        {/* Multilayer gradient fades for smooth blending */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080c14] via-[#080c14]/75 to-[#080c14]/40" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-[#080c14] via-[#080c14]/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#080c14]/80 to-transparent" />

        {/* Top Floating Back Button */}
        <div className="absolute inset-x-0 top-0 px-6 sm:px-12 pt-6 flex items-center justify-between z-10">
          <Link
            href="/#events"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-[#080c14]/70 px-5 text-sm font-semibold text-white backdrop-blur-xl shadow-lg transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-[#00e676] hover:shadow-[0_0_20px_rgba(0,230,118,0.25)] ${focusRing}`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>All events</span>
          </Link>
        </div>

        {/* Hero Title & Details */}
        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-12 pb-12 sm:pb-16 space-y-5 z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${
                upcoming
                  ? "bg-[#00e676] text-[#080c14] shadow-[0_0_15px_rgba(0,230,118,0.4)]"
                  : "bg-white/10 text-slate-200 border border-white/15 backdrop-blur-md"
              }`}
            >
              {upcoming && <Sparkles className="h-3 w-3 animate-pulse" />}
              {upcoming ? "Upcoming" : "Past event"}
            </span>
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#080c14]/80 text-[#00e676] border border-emerald-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,230,118,0.15)]">
              {event.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {event.title}
          </h1>

          <p className="text-lg sm:text-2xl font-medium bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent max-w-3xl leading-relaxed">
            {event.tagline}
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-3 pt-2">
            {details.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0d1322]/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-md shadow-sm"
              >
                <Icon className="h-4 w-4 text-[#00e676]" aria-hidden="true" />
                <span className="sr-only">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-14 min-w-0">
          {/* About Event */}
          <section className="space-y-6">
            <SectionHeading icon={Tag}>About the event</SectionHeading>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-[68ch]">
              {event.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {event.highlights.length > 0 && (
              <div className="pt-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300/80 mb-3">Key Highlights</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {event.highlights.map((item) => (
                    <li
                      key={item}
                      className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/[0.06]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[#00e676] group-hover:bg-emerald-500/25 transition-colors">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm sm:text-base leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <section className="space-y-6">
              <SectionHeading icon={Mic}>{event.speakers.length > 1 ? "Featured Speakers" : "Featured Speaker"}</SectionHeading>
              <div className="grid gap-4 md:grid-cols-2">
                {event.speakers.map((speaker) => (
                  <SpeakerCard key={speaker.name} speaker={speaker} />
                ))}
              </div>
            </section>
          )}

          {/* Gallery Moments */}
          {event.gallery.length > 0 && (
            <section className="space-y-6">
              <SectionHeading icon={Users}>Moments from the event</SectionHeading>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {event.gallery.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open photo ${i + 1} of ${event.title} in full size`}
                    className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d121f] transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(0,230,118,0.25)] ${
                      i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                    } ${focusRing}`}
                  >
                    <Image
                      src={src}
                      alt={`${event.title} — photo ${i + 1}`}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 360px, 50vw"}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
                        View image <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#0d1322]/90 via-[#0a0f1d]/85 to-[#080c14]/95 p-6 space-y-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {/* Top glowing accent line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#00e676]" />
            
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Event Details</h2>
            <dl className="space-y-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-[#00e676]">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
                    <dd className="text-sm font-medium text-slate-100">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-5">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {upcoming && event.registerUrl ? (
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#00e676] font-semibold text-[#080c14] shadow-[0_0_20px_rgba(0,230,118,0.35)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_28px_rgba(0,230,118,0.5)] ${focusRing}`}
              >
                Register now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link
                href="/#events"
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] font-semibold text-white transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-[#00e676] ${focusRing}`}
              >
                Explore more events
              </Link>
            )}
          </div>

          {event.organizers && event.organizers.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1322]/70 p-6 space-y-4 backdrop-blur-md">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Organised By</h2>
              <ul className="space-y-3">
                {event.organizers.map((o) => (
                  <li key={o.name} className="flex items-center justify-between border-b border-white/[0.04] pb-2 last:border-b-0 last:pb-0">
                    <div>
                      <p className="text-sm font-semibold text-white">{o.name}</p>
                      <p className="text-xs text-slate-400">{o.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.poster && (
            <a
              href={event.poster}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${event.title} poster in full size`}
              className={`group block overflow-hidden rounded-2xl border border-white/[0.08] shadow-lg transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(0,230,118,0.2)] ${focusRing}`}
            >
              <Image
                src={event.poster}
                alt={`${event.title} event poster`}
                width={1032}
                height={1601}
                sizes="340px"
                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
              />
            </a>
          )}
        </aside>
      </div>

      {/* More Events Carousel / Grid */}
      {otherEvents.length > 0 && (
        <section className="relative border-t border-white/[0.08] bg-[#0a0e1a]/80 backdrop-blur-md">
          <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-16 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">More Events</h2>
              <Link href="/#events" className="text-sm font-semibold text-[#00e676] hover:underline inline-flex items-center gap-1">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {otherEvents.map((e) => (
                <Link
                  key={e.slug}
                  href={`/events/${e.slug}`}
                  className={`group relative block aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1322] transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_rgba(0,230,118,0.4)] ${focusRing}`}
                >
                  <Image
                    src={e.cover}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    style={{ objectPosition: e.coverPosition }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{e.title}</p>
                      <p className="text-sm text-slate-300">{e.tagline}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#080c14]/70 text-white backdrop-blur-md transition-all duration-200 group-hover:bg-[#00e676] group-hover:text-[#080c14] group-hover:scale-110">
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

