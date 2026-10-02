// Events data
// Edit this file to update the Events section and the /events/[slug] detail pages —
// no component changes needed.
//
// Images: drop photos into `public/<Event Name>/` and reference them relative to
// /public (e.g. "/AWS Roots/Group_Photo.jpeg"). `cover` is the card/hero image;
// `gallery` is shown on the detail page.
//
// Upcoming vs Past: set `date` (YYYY-MM-DD). Events dated today or later show under
// "Upcoming"; earlier ones under "Past". If `date` is unknown, set `status` instead.

export type Speaker = {
  name: string
  title: string
  image?: string
  bio?: string
  linkedin?: string
}

export type Organizer = {
  name: string
  role: string
}

export type ClubEvent = {
  /** URL slug → /events/<slug> */
  slug: string
  title: string
  tagline: string
  /** YYYY-MM-DD */
  date?: string
  /** Used only when `date` is missing. */
  status?: "upcoming" | "past"
  time?: string
  mode: "In-person" | "Online" | "Hybrid"
  venue?: string
  category: string
  cover: string
  /** CSS object-position for the cover image, e.g. "center 30%". */
  coverPosition?: string
  poster?: string
  description: string[]
  highlights: string[]
  tags: string[]
  speakers: Speaker[]
  organizers?: Organizer[]
  gallery: string[]
  /** Registration link — shown as the primary CTA for upcoming events. */
  registerUrl?: string
}

export const EVENTS: ClubEvent[] = [
  {
    slug: "the-golden-stack",
    title: "The Golden Stack",
    tagline: "Skills, Certs & Cloud Leadership",
    date: "2025-12-19", 
    time: "01:30 PM – 03:30 PM",
    mode: "In-person",
    venue: "CHARUSAT Campus",
    category: "Speaker Session",
    cover: "/The Golden Stack/WhatsApp Image 2026-09-30 at 12.47.15 PM.jpeg",
    coverPosition: "center 40%",
    poster: "/The Golden Stack/WhatsApp Image 2026-09-30 at 12.47.15 PM (1).jpeg",
    description: [
      "An afternoon mapping out the AWS Certification journey — which certs to pursue, in what order, and how they translate into real cloud roles.",
      "The session went beyond exam prep into hands-on workshops, hackathon awareness, mentorship and the leadership skills that help builders grow inside cloud teams.",
    ],
    highlights: [
      "AWS Certification roadmap from Foundational to Professional",
      "Hands-on workshop walkthroughs",
      "Hackathon awareness and how to get started",
      "Mentorship and cloud leadership insights",
    ],
    tags: ["AWS Certifications", "Career", "Leadership"],
    speakers: [
      {
        name: "Mr. Shashank Chinchli",
        title: "AWS Expert & Cloud Architect",
        image: "/The Golden Stack/WhatsApp Image 2026-09-30 at 12.47.13 PM.jpeg",
      },
    ],
    organizers: [
      { name: "Dr. Purvi Prajapati", role: "Convenor · HOD, CSPIT IT" },
      { name: "Dr. Sanket Suthar", role: "Faculty Coordinator · CSPIT IT" },
      { name: "Jiya Thakkar", role: "Student Coordinator · Cloud Captain" },
    ],
    gallery: [
      "/The Golden Stack/WhatsApp Image 2026-09-30 at 12.47.15 PM.jpeg",
      "/The Golden Stack/WhatsApp Image 2026-09-30 at 12.47.13 PM.jpeg",
      "/The Golden Stack/WhatsApp Image 2026-09-30 at 12.47.14 PM.jpeg",
      "/The Golden Stack/WhatsApp Image 2026-09-30 at 12.47.14 PM (1).jpeg",
    ],
  },
  {
    slug: "terraform-triumphs",
    title: "Terraform Triumphs",
    tagline: "Infrastructure as Code, from first file to running EC2",
    date: "2025-10-04", 
    mode: "Online",
    venue: "Live webinar on Zoom",
    category: "Webinar",
    cover: "/Terraform Triumphs/WhatsApp Image 2026-09-30 at 12.47.15 PM (2).jpeg",
    description: [
      "A live online session on Infrastructure as Code: why teams stop clicking through the console and start describing their infrastructure in version-controlled files.",
      "We followed a Terraform config from an EC2 instance definition to a deployed server, then handed off to Ansible to install and configure the application on top.",
    ],
    highlights: [
      "IaC fundamentals and why they matter",
      "Provisioning Amazon EC2 with Terraform",
      "Terraform vs Ansible — provisioning vs configuration management",
      "Live Q&A with attendees",
    ],
    tags: ["Terraform", "Ansible", "Amazon EC2", "IaC"],
    speakers: [
      // TODO: replace with the speaker's full name and title
      { name: "Speaker Name", title: "Cloud & DevOps Speaker" },
    ],
    organizers: [
      { name: "Sanket Suthar", role: "Cloud Lead" },
      { name: "Jiya Thakkar", role: "Cloud Captain" },
    ],
    gallery: [
      "/Terraform Triumphs/WhatsApp Image 2026-09-30 at 12.47.15 PM (2).jpeg",
      "/Terraform Triumphs/WhatsApp Image 2026-09-30 at 12.47.16 PM.jpeg",
    ],
  },
  {
    slug: "aws-roots",
    title: "AWS Roots",
    tagline: "Where every cloud builder starts",
    date: "2025-07-21", 
    mode: "In-person",
    venue: "CHARUSAT Campus",
    category: "Community Session",
    cover: "/AWS Roots/WhatsApp Image 2026-09-30 at 12.47.12 PM.jpeg",
    coverPosition: "center 35%",
    description: [
      "Our foundational session introducing students to AWS and cloud computing — what the cloud is, the core services, and how to start building on it.",
      "A packed auditorium, an AWS Roots word-puzzle challenge, open Q&A, and the volunteer team that made it happen.",
    ],
    highlights: [
      "Cloud computing and AWS fundamentals",
      "AWS Roots word-puzzle challenge",
      "Open Q&A with the audience",
      "Meet the AWS Cloud Club volunteer team",
    ],
    tags: ["AWS Basics", "Cloud 101", "Community"],
    speakers: [
      // TODO: replace with the speaker's full name and title
      { name: "Speaker Name", title: "AWS Cloud Club CHARUSAT" },
    ],
    gallery: [
      "/AWS Roots/WhatsApp Image 2026-09-30 at 12.47.12 PM.jpeg",
      "/AWS Roots/WhatsApp Image 2026-09-30 at 12.47.11 PM (1).jpeg",
      "/AWS Roots/Group_Photo.jpeg",
    ],
  },
]

// Helpers

function todayISO() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function isUpcoming(event: ClubEvent) {
  if (event.date) return event.date >= todayISO()
  return event.status === "upcoming"
}

/** Upcoming: soonest first. Past: most recent first (undated keep file order). */
export function splitEvents(events: ClubEvent[] = EVENTS) {
  const upcoming = events.filter(isUpcoming).sort((a, b) => (a.date ?? "9").localeCompare(b.date ?? "9"))
  const past = events
    .filter((e) => !isUpcoming(e))
    .sort((a, b) => (a.date && b.date ? b.date.localeCompare(a.date) : 0))
  return { upcoming, past }
}

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug)
}

export function formatEventDate(event: ClubEvent) {
  if (!event.date) return "Date TBA"
  return new Date(`${event.date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
