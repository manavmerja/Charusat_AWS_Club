# Landing Page Sections (`src/components/sections/`)

This directory contains the 8 core modular sections that compose the main landing page (`src/app/page.tsx`).

They are ordered below in the exact chronological sequence in which they appear on the live website:

---

## Sections Overview

| Section | Component File | Description & Connected Data |
| :---: | :--- | :--- |
| **1** | `HeroSection.tsx` | Main hero landing banner with dynamic stars canvas, `TechText` glitch text for `"CHARUSAT"`, floating tech badges (AWS, Cloudflare, Kubernetes, Terraform), and CTA buttons. |
| **2** | `AboutSection.tsx` | Community mission, stats, interactive Cobe 3D Globe with CHARUSAT geolocation pin, orbiting AWS domain icons, and rotating 3D tech cloud. |
| **3** | `MeetupSection.tsx` | Monthly cloud meetups section with animated circuit train tracks (`CircuitBridgeTrack` / `MobileCircuitRail`), collision beams, and interactive past meetup photo carousel. |
| **4** | `EventsSection.tsx` | Flagship workshops and hackathons cards. Reads from `src/data/events.ts`. Includes tags, registration status, and links to detailed slug pages (`/events/[slug]`). |
| **5** | `TeamSection.tsx` | Core leadership team and domain leads (Tech, Events, Design, Media, Public Relations). Reads from `src/data/team.ts` and renders photos from `/public/team/`. |
| **6** | `FAQSection.tsx` | Frequently Asked Questions accordion powered by accessible disclosure cards and central pulsing emerald ripple logo. |
| **7** | `ContactSection.tsx` | Community join/contact form, social links (LinkedIn, Instagram, GitHub, WhatsApp), and fluid gradient typography. |
| **8** | `Footer.tsx` | University branding banner (`/banner.png`), quick navigation anchors, Charusat logo, copyright, and developer credits. |

---

## Developer Workflow

- **To update events:** Edit `src/data/events.ts`. The `EventsSection.tsx` and detail pages (`src/app/events/[slug]/page.tsx`) update automatically.
- **To update team members:** Edit `src/data/team.ts` and place portrait photos in `/public/team/`. The `TeamSection.tsx` updates automatically.
- **To edit a specific section:** Open the corresponding section file above. Each section is self-contained with its own layout, animations, and Tailwind styling.
