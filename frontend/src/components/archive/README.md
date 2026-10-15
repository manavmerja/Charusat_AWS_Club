# Archived & Experimental Components

This folder contains components that were explored or developed during initial prototyping, experiments, and earlier iterations of the AWS Student Builder Group website.

They are **not** imported in the live production build to keep the bundle lean and the component tree clean, but are safely preserved here for future reference or reuse.

---

## Catalog of Archived Files

| File / Folder | Original Purpose | Why It Was Archived |
| :--- | :--- | :--- |
| `3d-card.tsx` | Aceternity UI 3D perspective hover card with depth rotation. | Replaced by custom glassmorphism event & team cards tailored to the AWS dark aesthetic. |
| `macbook-pro.tsx` | 3D SVG/CSS laptop mockup frame for demoing screenshots. | Kept as reference mockup; simplified to fluid carousel slides on the live page. |
| `apple-hello-effect/` | Multi-language cursive greeting animation ("Hello" in English, Hindi, Gujarati, Rajasthani, Spanish, Vietnamese). | Replaced by the lighter and modern `WordsPreloader.tsx` ("Welcome", "Build", "Deploy", "Innovate"). |
| `MaskedHeading.tsx` | Canvas / SVG masked gradient heading reveal effect. | Replaced by `TechText.tsx` (glitch / canvas character scramble effect) and `Playfair Display` serif headers. |
| `RefineFrame.tsx` | Multi-stage status stepper container ('queued', 'generating', 'refining', 'complete'). | Built as an experimental stage component; not needed for the community portal. |
| `SideRays.tsx` | Dual-side angled volumetric ray beams. | Replaced by global `LightRays.tsx` and ambient emerald radial gradients. |
| `layout-text-flip.tsx` | Framer Motion layout-based word flipping animator. | Replaced by static high-impact typography and `TechText`. |
| `footer-shim.tsx` | Legacy root-level re-export of `Footer.tsx`. | Cleaned up from `src/footer.tsx`; all imports now reference `@/components/sections/Footer`. |

---

## How to Reuse Any of These

If you wish to revive any component:
1. Move the file from `src/components/archive/` to `src/components/ui/` (or `src/components/sections/`).
2. Import it into the target page or section.
3. Check required peer dependencies (`framer-motion`, `lucide-react`, etc.).
