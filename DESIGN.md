---
name: Andi Aqil Portfolio — Living System
description: A light, luminous, high-motion engineer's site. A live WebGL network of services, aurora light, frosted glass, kinetic type.
colors:
  canvas: "#f6f7fb"
  surface: "#ffffff"
  surface-2: "#eef1f8"
  glass: "rgba(255,255,255,0.66)"
  ink: "#0a0f1f"
  ink-2: "#454e66"
  ink-3: "#687089"
  line: "#e2e6f0"
  line-strong: "#c9d0df"
  accent: "#4f46e5"
  accent-2: "#0369a1"
  accent-3: "#047857"
  graphic-indigo: "#6366f1"
  graphic-sky: "#0ea5e9"
  graphic-emerald: "#10b981"
  graphic-fuchsia: "#d946ef"
  dark-canvas: "#070a14"
  dark-surface: "#0f1424"
  dark-ink: "#eef1fa"
  dark-accent: "#8b8cff"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable (opsz 96), Geist, sans-serif"
    fontSize: "clamp(2.25rem, 1.1rem + 3.7vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Bricolage Grotesque Variable"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  section:
    fontFamily: "Bricolage Grotesque Variable"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  subheading:
    fontFamily: "Bricolage Grotesque Variable"
    fontSize: "1.375rem"
    fontWeight: 600
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
  lead:
    fontFamily: "Geist Variable"
    fontSize: "1.1875rem"
    lineHeight: 1.65
  meta:
    fontFamily: "Geist Mono Variable, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  full: "9999px"
components:
  button-primary:
    background: "rotating brand gradient #4338ca → #0369a1 → #047857"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    height: "48px"
  button-secondary:
    background: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: "48px"
  card:
    background: "{colors.glass} + 18px backdrop blur"
    rounded: "{rounded.xl}"
---

# Design System: Living System

**North star:** the site *is* a running system. Services glow, requests travel between them, and everything responds to the visitor. It's light by default, luminous rather than neon, and uses motion everywhere that makes sense, with all of it optional.

## Signature pieces

| Piece | Where | What it does |
|---|---|---|
| **Living System globe** | Home hero | three.js network of ~200 nodes on a sphere. 8 labelled hubs name the real stack, packets of light travel along connections, and it tilts toward the cursor. Lazy-loaded chunk; pauses off-screen; static frame under reduced motion; CSS orb fallback without WebGL. |
| **Intro loader** | First visit per session | The logo draws itself, a counter runs to 100 and the panel lifts (CSS only, about 1.3s). Skipped for reduced motion and on repeat visits. |
| **Kinetic type** | Hero, page titles | Characters flip up in 3D on first paint (CSS, no hydration wait). The second line is a slowly rotating gradient. |
| **Scramble focus line** | Hero | `const focus = "…"` decodes through glyphs, cycling REST APIs → backend services → full-stack web apps → … |
| **Aurora + grain** | Every page | Three drifting light fields (indigo, sky, emerald) and film grain behind everything. |
| **Glass tilt cards** | Projects, skills, timeline, education | Frosted glass that tilts in 3D toward the pointer, with a cursor spotlight and glare. |
| **Pinned horizontal gallery** | Home projects (≥1024px) | The section pins and the cards travel sideways with a progress bar, ending on a "See all projects" card. Vertical grid elsewhere. |
| **Scroll-lit statement** | Home and About | Words light up one by one as you scroll. |
| **Self-drawing timelines** | Experience, About story | A gradient rail draws with scroll progress and nodes pop in. |
| **Counters and rings** | Stats band, case-study facts, CGPA | Real figures count up; CGPA rings fill toward 4.00. |
| **⌘K command palette** | Global (Ctrl/⌘+K, header, footer) | Pages, projects and actions (copy email, open profiles, switch theme). Native `<dialog>` with combobox semantics. |
| **Cinematic transitions** | Navigation | The old page sinks and blurs while the new one wipes up. Project titles morph from card to case study. Theme switches grow out of the toggle in a circle. |
| **Magnetic CTAs** | Primary buttons | Buttons pull toward the pointer with an elastic return, plus a shine sweep and a glow. |

## Colour

Light is the default. Dark applies only when the visitor chooses it, and the choice is remembered.
- **Text colours** (ink, ink-2, ink-3, accent and the text gradient) meet 4.5:1 on the canvas in both themes.
- **Graphic colours** (indigo, sky, emerald, fuchsia) are for light, glows and WebGL only, never for small text.
- **Brand gradient:** #4338ca → #0369a1 → #047857. White text passes AA at every stop. Its angle rotates slowly via `@property`.

## Motion rules

- **Easing:** expo-out `cubic-bezier(.16,1,.3,1)` for entrances; elastic for magnetic springs; quart in-out for curtains and theme reveals.
- **Entrances** (fade, 28px rise and 6px blur clearing) only arm for elements that start below the fold, so prerendered content never flashes or hides.
- **Smooth scrolling:** Lenis drives GSAP ScrollTrigger. Native scrolling is kept on touch devices.
- **Reduced motion:** no intro, no smooth scroll, no pinning (vertical layout), no reveals, counters show final values, the globe renders one still frame, and view transitions are off.
- **Performance:** WebGL pauses when off-screen or the tab is hidden. DPR is capped at 1.75. Mobile gets fewer nodes and packets.

## Layout

- The container is 76rem with 16/24/32px gutters, and the floating glass pill nav sits 12–16px from the top.
- The desktop nav appears from 1024px; below that, a hamburger opens a glass sheet with staggered links.
- Sections are 80 / 96 / 128px tall in padding. Headers are a mono kicker with a gradient rule, then a display heading with one gradient word, then a lead.
- Tested at 320, 375, 390, 430, 768, 1024, 1280 and 1440px with no horizontal overflow and no tap target under 24px.

## Content honesty

The effects never invent anything. The globe's labels are real stack items, counters show real figures, and project visuals are labelled illustrations until screenshots exist. No fake statistics, clients or testimonials appear.
