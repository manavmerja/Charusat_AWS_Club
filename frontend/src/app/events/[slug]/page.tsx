import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock, MapPin, Mic, Tag, Users, Video } from "lucide-react"
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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f19]"

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
    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-[#00e676]">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      {children}
    </h2>
  )
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#0d121f]">
        {speaker.image ? (
          <Image src={speaker.image} alt={`Photo of ${speaker.name}`} fill sizes="80px" className="object-cover object-[45%_25%]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-[#0d121f] to-teal-500/10">
            <span className="text-2xl font-extrabold text-emerald-300/80" aria-hidden="true">
              {initials(speaker.name)}
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-lg font-bold text-white leading-tight">{speaker.name}</p>
        <p className="text-sm font-semibold text-[#00e676]">{speaker.title}</p>
        {speaker.bio && <p className="text-sm text-slate-400 leading-relaxed">{speaker.bio}</p>}
        {speaker.linkedin && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-sm text-slate-300 hover:text-[#00e676] ${focusRing}`}
          >
            LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
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
    <main className="min-h-screen bg-[#0b0f19] text-white selection:bg-[#00e676] selection:text-[#0b0f19] font-[var(--font-space-grotesk)]">
      {/* Hero */}
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/70 to-[#0b0f19]/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#0b0f19] to-transparent" />

        <div className="absolute inset-x-0 top-0 px-6 sm:px-12 pt-6">
          <Link
            href="/#events"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-[#0b0f19]/60 px-5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:border-emerald-500/40 hover:text-[#00e676] ${focusRing}`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All events
          </Link>
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 pb-12 sm:pb-16 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                upcoming
                  ? "bg-[#00e676] text-[#0b0f19]"
                  : "bg-white/10 text-slate-200 border border-white/15 backdrop-blur-md"
              }`}
            >
              {upcoming ? "Upcoming" : "Past event"}
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0b0f19]/70 text-[#00e676] border border-emerald-500/30 backdrop-blur-md">
              {event.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">{event.title}</h1>
          <p className="text-lg sm:text-2xl font-medium bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
            {event.tagline}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm sm:text-base text-slate-200">
            {details.map(({ icon: Icon, label, value }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span className="sr-only">{label}:</span>
                {value}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-14 min-w-0">
          {/* About */}
          <section className="space-y-5">
            <SectionHeading icon={Tag}>About the event</SectionHeading>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-[68ch]">
              {event.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {event.highlights.length > 0 && (
              <ul className="grid gap-3 sm:grid-cols-2 pt-2">
                {event.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-slate-200"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#00e676]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <section className="space-y-5">
              <SectionHeading icon={Mic}>{event.speakers.length > 1 ? "Speakers" : "Speaker"}</SectionHeading>
              <div className="grid gap-4 md:grid-cols-2">
                {event.speakers.map((speaker) => (
                  <SpeakerCard key={speaker.name} speaker={speaker} />
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          {event.gallery.length > 0 && (
            <section className="space-y-5">
              <SectionHeading icon={Users}>Moments from the event</SectionHeading>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {event.gallery.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open photo ${i + 1} of ${event.title} in full size`}
                    className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d121f] ${
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
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-6 space-y-5">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Event details</h2>
            <dl className="space-y-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#00e676]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-500">{label}</dt>
                    <dd className="text-sm font-medium text-slate-100">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {upcoming && event.registerUrl ? (
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#00e676] font-semibold text-[#0b0f19] transition-colors duration-200 hover:bg-emerald-400 ${focusRing}`}
              >
                Register now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link
                href="/#events"
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] font-semibold text-white transition-colors duration-200 hover:border-emerald-500/40 hover:text-[#00e676] ${focusRing}`}
              >
                Explore more events
              </Link>
            )}
          </div>

          {event.organizers && event.organizers.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Organised by</h2>
              <ul className="space-y-3">
                {event.organizers.map((o) => (
                  <li key={o.name}>
                    <p className="text-sm font-semibold text-white">{o.name}</p>
                    <p className="text-xs text-slate-400">{o.role}</p>
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
              className={`group block overflow-hidden rounded-2xl border border-white/[0.08] ${focusRing}`}
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

      {/* More events */}
      {otherEvents.length > 0 && (
        <section className="border-t border-white/[0.06] bg-[#0d121f]">
          <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-16 space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">More events</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {otherEvents.map((e) => (
                <Link
                  key={e.slug}
                  href={`/events/${e.slug}`}
                  className={`group relative block aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.08] transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-12px_rgba(0,230,118,0.45)] ${focusRing}`}
                >
                  <Image
                    src={e.cover}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    style={{ objectPosition: e.coverPosition }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="text-xl font-bold text-white">{e.title}</p>
                      <p className="text-sm text-emerald-300">{e.tagline}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0b0f19]/60 text-white transition-colors duration-200 group-hover:bg-[#00e676] group-hover:text-[#0b0f19]">
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
