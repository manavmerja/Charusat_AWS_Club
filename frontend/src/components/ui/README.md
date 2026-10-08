# UI Components Directory (`src/components/ui/`)

This directory houses all reusable, active UI primitives and interactive visual effects used across the AWS Student Builder Group website.

Every component in this directory is actively in production.

---

## Component Directory & Usage Guide

| Component | Primary Location / Section | Description |
| :--- | :--- | :--- |
| `TechText.tsx` | `HeroSection.tsx` | Cyberpunk canvas glitch & scramble letter reveal effect for `"CHARUSAT"`. |
| `liquid-button.tsx` | `HeroSection.tsx`, `EventsSection.tsx` | Magnetic fluid-fill button with shiny hover reaction for high-priority CTAs. |
| `Spotlight.tsx` | `HeroSection.tsx` | Dynamic radial lighting beam that illuminates section headings. |
| `cobe-globe.tsx` | `AboutSection.tsx` | Interactive WebGL 3D spinning globe marked with CHARUSAT's location. |
| `icon-cloud.tsx` | `AboutSection.tsx` | Interactive 3D spherical rotating cloud of DevOps and Cloud tech icons. |
| `aws-orbiting-circles.tsx` | `AboutSection.tsx` | AWS cloud domain icons (EC2, S3, Lambda, Bedrock) rotating around the center AWS badge. |
| `orbiting-circles.tsx` | `aws-orbiting-circles.tsx` | Base mathematical SVG circular orbiting primitive. |
| `circuit-bridge-track.tsx` | `MeetupSection.tsx` | Desktop SVG animated train track that guides the cloud train between sections. |
| `mobile-circuit-rail.tsx` | `MeetupSection.tsx` | Lightweight, mobile-optimized circuit train track ensuring 60 FPS on phones. |
| `meetup-straight-rail.tsx` | `MeetupSection.tsx` | Straight transition railway track for the monthly meetup showcase. |
| `background-beams-with-collision.tsx` | `MeetupSection.tsx` | Canvas particle collision beams radiating behind the meetup container. |
| `scales.tsx` | `EventsSection.tsx` | Geometric scale grid pattern backdrop behind event cards. |
| `dot-pattern.tsx` | `EventsSection.tsx` | Subtle SVG dotted mesh background pattern. |
| `ripple.tsx` | `FAQSection.tsx` | Concentric pulsing radar waves radiating from behind the central logo. |
| `hero-highlight.tsx` | `ContactSection.tsx` | Animated highlighter stroke accentuating key phrases. |
| `fluid-gradient-text.tsx` | `ContactSection.tsx` | Shimmering gradient text effect for high-emphasis headlines. |
| `button.tsx` | Universal | Accessible Shadcn-style button component with variants. |
| `WordsPreloader.tsx` | `page.tsx` | Introductory greeting preloader ("Welcome", "Build", "Deploy", "Innovate"). |
| `FloatingEventToast.tsx` | `page.tsx` | Bottom corner notification toast alerting students to the next upcoming event. |
| `scroll-to-top.tsx` | `page.tsx` | Floating glass action button that appears on scroll down to quickly jump back to top. |
| `light-rays.tsx` | `page.tsx` (Global) | Volumetric ambient canvas light rays radiating softly across the dark page. |
