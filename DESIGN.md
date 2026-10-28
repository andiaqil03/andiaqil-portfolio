---
name: Andi Aqil Portfolio — Trail Map
description: A hiking-map engineer's site. Map-paper white, pine green, alpine-lake blue and granite, with sunrise orange for trail markers. A 3D contour mountain hero where the career is the trail. Solid colours only; no gradients, no neon, no glow.
colors:
  canvas: '#f5f7f4'
  surface: '#ffffff'
  surface-2: '#ebf1ed'
  water: '#e2eff5'
  ink: '#12211c'
  ink-2: '#41524b'
  ink-3: '#5e6f68'
  line: '#dce4de'
  line-strong: '#c0cec5'
  accent: '#2d6a4f'
  accent-hover: '#24573f'
  accent-soft: '#e1efe6'
  on-accent: '#ffffff'
  accent-2: '#1e6b93'
  accent-3: '#a84d08'
  graphic-trail: '#e07b39'
  graphic-pine: '#2d6a4f'
  graphic-lake: '#3b8bb5'
  graphic-granite: '#7d8a82'
  summit: '#17352a'
  dark-canvas: '#0d1512'
  dark-surface: '#141f1a'
  dark-ink: '#e5ede8'
  dark-accent: '#7cc39a'
  dark-trail: '#f0a35e'
  trail-on-summit: '#f0a35e'
typography:
  display:
    fontFamily: 'Barlow Semi Condensed 700, Geist, sans-serif'
    fontSize: 'clamp(2.6rem, 1.4rem + 4.4vw, 5.25rem)'
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: '-0.02em'
    textTransform: 'uppercase (first line of the hero only)'
  title:
    fontFamily: 'Barlow Semi Condensed'
    fontSize: 'clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)'
    fontWeight: 700
    lineHeight: 1
  section:
    fontFamily: 'Barlow Semi Condensed'
    fontSize: 'clamp(2.1rem, 1.6rem + 2vw, 3.4rem)'
    fontWeight: 700
    lineHeight: 1.02
  subheading:
    fontFamily: 'Barlow Semi Condensed'
    fontSize: '1.5rem'
    fontWeight: 600
  body:
    fontFamily: 'Geist Variable, system-ui, sans-serif'
    fontSize: '1rem'
    lineHeight: 1.65
  lead:
    fontFamily: 'Geist Variable'
    fontSize: '1.1875rem'
    lineHeight: 1.65
  small:
    fontFamily: 'Geist Variable'
    fontSize: '0.9375rem'
    lineHeight: 1.6
  meta:
    fontFamily: 'Geist Mono Variable, monospace'
    fontSize: '0.75rem'
    fontWeight: 500
rounded:
  xs: '4px'
  sm: '8px'
  md: '12px'
  lg: '16px'
  xl: '24px'
  full: '9999px'
components:
  button-primary:
    background: '{colors.accent}'
    textColor: '{colors.on-accent}'
    rounded: '{rounded.full}'
    height: '48px'
  button-secondary:
    background: '{colors.surface} + 1px {colors.line} border'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
    height: '48px'
  card:
    background: '{colors.surface} + 1px {colors.line} border + soft pine-tinted shadow'
    rounded: '{rounded.xl}'
  kicker:
    marker: 'trail blaze: 8×14px {colors.graphic-trail} rectangle'
    text: 'Geist Mono, uppercase, {colors.ink-2}'
---

# Design System: Trail Map

**North star:** the site reads like a well-made hiking map, and the career is the trail on it. It reflects who Andi is outside of code (hiking, travel and sport) while staying calm and professional for recruiters. Light is the default. The palette is earthy and solid: no colour gradients, no neon, no glow.

## Signature pieces

| Piece                         | Where                                     | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trail map hero**            | Home                                      | A three.js contour mountain (shader contours, an alpine lake, and a slow highlight sweep up the slope). A dashed orange trail draws up it, past real milestones as waypoint labels: UNITEN 2021 → TM R&D 2025 → PNB 2025–26 → Freelance 2026 → a summit flag reading "Software Engineer · MTechnix" (the current role). A hiker dot then walks the route, and the camera drifts and leans toward the pointer. The chunk is lazy-loaded. It pauses off-screen, renders one still frame (trail fully drawn) under reduced motion, and falls back to a flat contour texture without WebGL2. Labels are clamped inside the canvas on narrow screens. On phones the map sits between the heading and the intro, so it is in the first view. |
| **Contour textures**          | Every page, cards, panels                 | `public/topo.svg` is generated by `scripts/generate-topo.mjs` (marching squares over fractal noise). It's used as a CSS mask (`.topo`) and tinted per surface via `--topo`, so it works on light, dark and pine panels. Small strips render it at native scale so the lines never shrink to hairlines.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Trail blazes**              | Section kickers                           | The painted orange rectangle used to mark hiking trails, placed before each mono kicker ("Expeditions", "Gear", "The route", "Basecamp", "Off the trail").                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Ridgeline horizons**        | Footer, contact panel, contact email card | Three deterministic SVG ridgelines (far → near) in lake and pine tints, the way a map's horizon is drawn.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Trail timelines**           | Experience, About story, About process    | A dashed orange rail draws with scroll progress. Past stops are pine-ringed, the current stop is a pulsing orange marker, and "next" is a dashed lake ring.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Off the trail**             | Home and About                            | Hiking / Travel / Sport, with up to six scrapbook-style photo frames. Frames appear on the live site only once real photos are added (`app/content/outdoors.ts`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Intro loader**              | First visit per session                   | A summit-green panel where a ridgeline draws, an orange flag rises and a counter runs to 100 (CSS only, about 2s). Skipped for reduced motion and on repeat visits.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Signage type**              | Hero, titles                              | Barlow Semi Condensed, like trail signage. The hero's first line is uppercase and characters rise in on first paint (CSS, no hydration wait). The second line is pine and sentence case.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Scramble focus line**       | Hero                                      | `const focus = "…"` on a lake-tinted chip decodes through glyphs, cycling the real focus areas. Static on touch screens, where mid-decode glyphs read as noise.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Tilt cards**                | Projects, skills, process                 | Cards tilt up to 4° toward the pointer with a faint pine spotlight; there's no glare.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Pinned horizontal gallery** | Home projects (≥1024px)                   | The section pins and cards travel sideways, ending on a summit-green "See all projects" card. The first card is the lead: wider, tagged "Start here", and laid out visual-beside-text when it has room. Vertical grid elsewhere, with the lead across the full row.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Scroll-lit statement**      | Home and About                            | Words light up one by one as you scroll, with pine highlights.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **⌘K command palette**        | Global (Ctrl/⌘+K, header, footer)         | Pages, projects and actions. Native `<dialog>` with combobox semantics.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Transitions**               | Navigation                                | Page cross-fade and rise, a project title that morphs from card to case study, and a theme switch that grows out of the toggle in a circle.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Magnetic CTAs**             | Primary buttons                           | Buttons pull toward the pointer with an elastic return. Solid pine, no shine or glow.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## Colour

- **Default and dark mode:** light is the default. Dark ("night hike": deep forest, sage and lake) applies only when the visitor chooses it, and the choice is remembered.
- **Roles:**
  - **Pine** `#2d6a4f` is the primary colour: buttons, links, active states and the accent word in headings.
  - **Lake** `#1e6b93` / `#3b8bb5` is secondary: focus rings, water, the frontend category, and the "next" markers.
  - **Granite** neutrals carry text and lines.
  - **Sunrise orange** `#e07b39` is reserved for trail markers (blazes, the trail line, the current-position dot and the summit flag). Its text-safe version is `#a84d08`.
- **No colour gradients.** Gradients appear only as masks that fade a texture out, never as visible colour. No neon, no glows, no blurred colour blobs.
- **Text contrast:** text colours (ink, ink-2, ink-3, accent, accent-2, accent-3) meet 4.5:1 on canvas, surface and their soft fills in both themes. This was checked programmatically across every page.
- **Graphic colours** (trail, pine, lake, granite) are for fills, strokes and WebGL only, never for small text.
- **On pine fills,** text uses `on-accent` (white in light mode, deep forest in dark), never hard-coded white. Summit-green panels stay dark in both themes and use white text; orange text on them uses `trail-on-summit`.

## Motion rules

- **Easing:** expo-out `cubic-bezier(.16,1,.3,1)` for entrances; elastic for magnetic springs; quart in-out for theme reveals.
- **Entrances:** fade plus rise. They only arm for elements that start below the fold, so prerendered content never flashes or hides.
- **Smooth scrolling:** Lenis drives GSAP ScrollTrigger. Native scrolling is kept on touch devices.
- **Reduced motion:** no intro, no smooth scroll, no pinning, no reveals. Counters (case-study figures) show their final values, the trail scene renders one still frame, and view transitions are off.
- **Performance:** WebGL pauses off-screen and when the tab is hidden. DPR is capped. The three.js chunk (~137 KB gzipped) loads after first paint.

## Layout

- **Container and nav:** a 76rem container with 16/24/32px gutters. The nav is a floating white pill 12–16px from the top that gains a shadow once you scroll (its width stays fixed), and the active page gets a pine-soft pill.
- **Breakpoints:** the desktop nav appears from 1024px. Below that, a menu button opens a sheet with staggered links.
- **Sections:** a trail-blaze mono kicker, then a Barlow heading with one pine word, then a lead.
- **Tested widths:** 320, 375, 768, 1024 and 1440px on every page, with no horizontal overflow and no tap target under 24px.

## Content honesty

The effects never invent anything. Waypoints are real roles and dates; the summit is the role Andi holds now, not an invented achievement. Counters show real figures, project visuals are labelled illustrations until screenshots exist, and real screenshots sit as a sheet on the same dot-grid mat so light and dark apps read as one set, and outdoor photo frames stay hidden until real photos are supplied. No fake statistics, clients or testimonials.
