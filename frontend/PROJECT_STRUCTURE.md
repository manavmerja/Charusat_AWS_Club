# 🚀 Project Structure & Architecture Guide

See the root [PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md) for the complete guide.

### Quick Directory Map:
- **`src/app/`**: Pages, dynamic event routes (`/events/[slug]`), root layout, and `globals.css`.
- **`src/components/sections/`**: The 8 modular landing page sections (`HeroSection`, `AboutSection`, `MeetupSection`, `EventsSection`, `TeamSection`, `FAQSection`, `ContactSection`, `Footer`).
- **`src/components/ui/`**: 21 active visual UI primitives (see [`src/components/ui/README.md`](./src/components/ui/README.md)).
- **`src/components/navigation/`**: Fullscreen menu & smart-scroll header logo (`StaggeredMenu.tsx`).
- **`src/components/archive/`**: Archived & experimental components not used in production (see [`src/components/archive/README.md`](./src/components/archive/README.md)).
- **`src/data/`**: Content data layer (`events.ts` and `team.ts` — edit these to change site content!).
- **`public/`**: Images, logos (`/logo.png`, `/banner.png`), and event photo albums.
