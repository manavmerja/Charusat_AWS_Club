# 🚀 AWS Student Builder Group — Project Architecture & Folder Guide

Welcome to the **AWS Student Builder Group (CHARUSAT)** official web portal repository!

This document provides a complete guide for you and any collaborator/friend working on this codebase. It clearly separates **active development files** from **archived/experimental files**, explains what each file does, and details how to update content.

---

## 📁 Repository High-Level Structure

```
Charusat_AWS_Club/
├── backend/                  # Future API & backend integration notes
├── frontend/                 # Main Next.js (App Router) web application
│   ├── public/               # Static images, branding logos, and event photos
│   └── src/                  # Application source code
│       ├── app/              # Routing, pages, layouts, and global styles
│       ├── components/       # Modular UI components
│       │   ├── animate-ui/   # Canvas stars, Framer carousel & accessible accordion
│       │   ├── archive/      # 📦 Archived / experimental components (NOT in live build)
│       │   ├── navigation/   # Fullscreen GSAP menu & smart-scroll brand card
│       │   ├── providers/    # Smooth scrolling (Lenis) provider
│       │   ├── sections/     # 🎯 The 8 core landing page sections
│       │   └── ui/           # ⚡ 21 Active production UI primitives
│       ├── data/             # 📝 Events & Team content (Edit here to change content!)
│       ├── lib/              # Utility helpers (`cn`)
│       └── types/            # TypeScript type definitions
├── index.html                # Initial static HTML prototype (kept for reference)
└── PROJECT_STRUCTURE.md      # This guide
```

---

## 🎯 Active Landing Page Sections (`src/components/sections/`)

The landing page (`src/app/page.tsx`) imports and mounts 8 distinct sections in order:

| # | Section File | What It Renders | Where Its Data Comes From |
| :-: | :--- | :--- | :--- |
| **1** | `HeroSection.tsx` | Stars galaxy canvas background, `TechText` glitch text for `"CHARUSAT"`, floating cloud badges (AWS, Cloudflare, Kubernetes, Terraform), and community CTAs. | Self-contained in file |
| **2** | `AboutSection.tsx` | Mission statement, club statistics, interactive Cobe 3D Globe with CHARUSAT pin, orbiting AWS services, and 3D tech icon sphere. | Self-contained in file |
| **3** | `MeetupSection.tsx` | Monthly Cloud Meetup spotlight with animated circuit train tracks (`CircuitBridgeTrack` / `MobileCircuitRail`), collision beams, and interactive photo carousel. | Self-contained in file |
| **4** | `EventsSection.tsx` | Flagship workshop cards with category filters, tags, and registration links. | `src/data/events.ts` |
| **5** | `TeamSection.tsx` | Faculty mentor, President, and domain leads (Tech, Events, Design, Media, PR). | `src/data/team.ts` + `/public/team/` |
| **6** | `FAQSection.tsx` | Interactive accordion with questions regarding joining, benefits, certificates, and central pulsating ripple logo. | Self-contained in file |
| **7** | `ContactSection.tsx` | Join club / contact inquiry form, fluid gradient header, and social community links. | Self-contained in file |
| **8** | `Footer.tsx` | Official CHARUSAT university banner (`/banner.png`), quick navigation anchors, copyright, and developer credits. | Self-contained in file |

---

## ⚡ Active UI Primitives (`src/components/ui/`)

All 21 components in `src/components/ui/` are actively used in production:

| Component | Role & Usage |
| :--- | :--- |
| `TechText.tsx` | Canvas glitch & scramble character reveal for `"CHARUSAT"` in `HeroSection`. |
| `liquid-button.tsx` | Interactive fluid-wave magnetic button ("Join Community", "Explore Events"). |
| `Spotlight.tsx` | Dynamic radial lighting beam illuminating page headings. |
| `cobe-globe.tsx` | Interactive WebGL 3D spinning globe marked with CHARUSAT geolocation. |
| `icon-cloud.tsx` | Interactive 3D spherical rotating cloud of DevOps & Cloud tech icons. |
| `aws-orbiting-circles.tsx` | Orbiting AWS service icons (EC2, S3, Lambda, Bedrock) around the center badge. |
| `orbiting-circles.tsx` | Core mathematical SVG circular orbiting primitive. |
| `circuit-bridge-track.tsx` | Animated SVG desktop railway track guiding the cloud train between sections. |
| `mobile-circuit-rail.tsx` | Mobile-optimized simplified railway track ensuring 60 FPS on phones. |
| `meetup-straight-rail.tsx` | Straight transition track for the monthly meetup showcase. |
| `background-beams-with-collision.tsx` | Particle collision beams radiating behind the meetup container. |
| `scales.tsx` | Geometric scale grid pattern backdrop behind event cards. |
| `dot-pattern.tsx` | Subtle SVG dotted mesh background pattern. |
| `ripple.tsx` | Concentric pulsing radar waves radiating from behind the central logo in FAQ. |
| `hero-highlight.tsx` | Animated highlighter stroke accentuating key phrases. |
| `fluid-gradient-text.tsx` | Shimmering gradient text effect for high-emphasis headlines. |
| `button.tsx` | Accessible button component with variants (`default`, `secondary`, `outline`). |
| `WordsPreloader.tsx` | Greeting preloader ("Welcome", "Build", "Deploy", "Innovate") before page reveal. |
| `FloatingEventToast.tsx` | Bottom corner notification toast alerting students to the next upcoming event. |
| `scroll-to-top.tsx` | Floating glass action button to smoothly jump back to top. |
| `light-rays.tsx` | Volumetric ambient canvas light rays radiating softly across the dark page. |

---

## 📦 Archived & Experimental Folder (`src/components/archive/`)

These files were created during initial prototyping or earlier iterations. They are **safely preserved in `src/components/archive/`** but **not imported in live pages**:

- `3d-card.tsx` — Aceternity UI 3D tilt card experiment (replaced by custom glass cards).
- `macbook-pro.tsx` — 3D laptop mockup frame (replaced by fluid carousel).
- `apple-hello-effect/` — Multi-language handwritten greeting experiment (replaced by `WordsPreloader.tsx`).
- `MaskedHeading.tsx` — Canvas masked heading experiment (replaced by `TechText.tsx`).
- `RefineFrame.tsx` — Multi-stage status stepper container.
- `SideRays.tsx` — Dual-side angled ray beams experiment.
- `layout-text-flip.tsx` — Word flip animator experiment.
- `footer-shim.tsx` — Legacy root re-export shim.

> **Collaborator Note**: If you ever want to reuse any of these animations, check `src/components/archive/README.md` for instructions!

---

## 📝 How to Update Website Content

### 1. Adding or Modifying Events
Open `src/data/events.ts`. Add or edit an event object:
```ts
{
  slug: "cloud-summit-2026",
  title: "Cloud Summit 2026",
  shortDescription: "Explore multi-cloud architectures and serverless computing.",
  date: "November 20, 2026",
  time: "9:30 AM - 3:30 PM",
  venue: "DEPSTAR Auditorium",
  category: "Workshop",
  status: "Registration Open",
  registrationLink: "https://forms.gle/...",
  image: "/The Golden Stack/IMG_1.JPG"
}
```
The **Events Section** and the dedicated dynamic page (`/events/cloud-summit-2026`) will automatically update!

### 2. Adding or Modifying Team Members
1. Add the member's photo to `public/team/<Name>.png`.
2. Open `src/data/team.ts` and add their profile:
```ts
{
  name: "New Lead",
  role: "Tech Lead",
  subRole: "Cloud Architecture",
  department: "DEPSTAR CSE",
  image: "/team/NewLead.png",
  socials: {
    linkedin: "https://linkedin.com/in/...",
    github: "https://github.com/..."
  }
}
```

---

## 🛠️ Running the Project

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm run dev
# Open http://localhost:3000

# Validate production build
pnpm run build
```
