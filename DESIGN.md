---
name: Andi Aqil Portfolio
description: A modern, minimal software engineer's site. Neutral canvas, clean cards, one technical green accent, strong type.
colors:
  canvas: "#f7f8f7"
  surface: "#ffffff"
  surface-2: "#f1f3f1"
  ink: "#0e1411"
  ink-2: "#4a524d"
  ink-3: "#69716b"
  line: "#e4e7e4"
  line-strong: "#cdd3ce"
  accent: "#0e7a55"
  accent-hover: "#0a6646"
  accent-soft: "#e7f4ee"
  on-accent: "#ffffff"
  accent-2: "#2f5bd3"
  accent-2-soft: "#eaf0fd"
  cta: "#0e1411"
  dark-canvas: "#0b0d0c"
  dark-surface: "#121614"
  dark-surface-2: "#181d1a"
  dark-ink: "#eceeec"
  dark-ink-2: "#a8b0aa"
  dark-ink-3: "#858d87"
  dark-line: "#222824"
  dark-line-strong: "#343c37"
  dark-accent: "#5cc594"
  dark-accent-2: "#8ea6ff"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.2rem + 3.4vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.55rem + 1.9vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  section:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.4rem + 0.9vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  subheading:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  meta:
    fontFamily: "Geist Mono Variable, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "20px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "28": "112px"
  gutter: "16px / 24px / 32px"
  container: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line-strong}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 20px"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.line}"
    rounded: "{rounded.lg}"
    padding: "20px / 24px"
  card-featured:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.line}"
    rounded: "{rounded.xl}"
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    height: "24px"
  nav-link-active:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
---

# Design System: Andi Aqil Portfolio

## Overview

**North star: "A precise engineer's workbench."**

This is a modern, minimal personal site for a software engineer. Neutral surfaces let the work lead. Clean cards present projects like products. Strong type sets a clear hierarchy, and one technical green accent marks what matters. In the first seconds, a recruiter or tech lead should see: technically capable, has built real applications, presents work professionally.

**Personality:** engineering, precision, reliability, curiosity, modern technology, professionalism, and creativity that never turns childish.

**Signature details:**
- **Dot grid:** a faint engineering-paper texture, used only behind the hero and inside project visuals.
- **Project visuals:** schematic illustrations of each app's real mechanism, drawn in the token palette. A real screenshot replaces one as soon as `cover` is set on that project.
- **Profile card:** the hero's quick-facts card, with a Summary/JSON switch as one quiet developer touch.

## 1. Color tokens

Strategy: neutral background, high-contrast ink, muted secondary text, **one primary accent** (technical green, "build passing") and **one optional secondary accent** (signal blue). Both themes are defined once with `light-dark()` and follow the system setting until the visitor toggles.

| Token | Light | Dark | Role |
|---|---|---|---|
| `canvas` | #f7f8f7 | #0b0d0c | Page background |
| `surface` | #ffffff | #121614 | Cards, header, inputs |
| `surface-2` | #f1f3f1 | #181d1a | Chips, visual backgrounds, active nav |
| `ink` | #0e1411 | #eceeec | Headings and primary text (≥15:1) |
| `ink-2` | #4a524d | #a8b0aa | Body and secondary text (≥8:1) |
| `ink-3` | #69716b | #858d87 | Metadata, dates, captions (≥4.6:1) |
| `line` | #e4e7e4 | #222824 | Card borders, dividers |
| `line-strong` | #cdd3ce | #343c37 | Hover borders, outlined buttons |
| `accent` | #0e7a55 | #5cc594 | Primary buttons, links, focus, current state (≥4.9:1 on canvas) |
| `accent-hover` | #0a6646 | #7ad6aa | Primary hover |
| `accent-soft` | #e7f4ee | #13271d | Featured badge, icon tiles |
| `accent-2` | #2f5bd3 | #8ea6ff | Secondary accent: illustrations and "learning" tags only |
| `cta` | #0e1411 | #161c19 | Closing call-to-action band (dark in both themes) |

Rules: the accent appears once or twice per viewport, never as large fills. There are no gradients and no glows. Status is never shown by colour alone.

## 2. Typography scale

One family: **Geist** (modern grotesk sans, self-hosted). **Geist Mono** is used only for metadata: dates, tech chips and code/JSON.

| Level | Size | Weight / leading / tracking | Use |
|---|---|---|---|
| Display | clamp(30px → 64px) | 600 / 1.05 / -0.035em | Hero heading only |
| Title | clamp(32px → 48px) | 600 / 1.1 / -0.03em | Page `h1`, project name in hero |
| Section | clamp(26px → 36px) | 600 / 1.15 / -0.025em | Section `h2` |
| Subheading | 20px | 600 / 1.3 / -0.015em | Card titles, role titles (`h3`) |
| Lead | 18px | 400 / 1.65 | Intro paragraphs |
| Body | 16px | 400 / 1.65 | Running text, max 68ch |
| Small | 14px | 400–500 / 1.5 | Card descriptions, nav |
| Meta | 12–13px mono | 500 / 1.4 | Dates, tech chips, labels |

Headings step down clearly. Only the hero is large, and it fits a 320px screen in four lines.

## 3. Spacing scale

4px base: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 112.

- Container: max 76rem. Gutters are 16px under 640px, 24px from 640px, 32px from 1024px.
- Section padding: 64px on mobile, 80px from 640px, 112px from 1024px.
- Card padding: 20px on mobile, 24px from 640px. Grid gaps: 16px on mobile, 24px from 640px.
- A heading block has more space above it than below (section header → content: 40–48px).

## 4. Border radius

`xs` 4px for inline marks · `sm` 6px for chips and tags · `md` 10px for buttons, icon buttons and nav pills · `lg` 14px for cards · `xl` 20px for the featured project card, project visuals and the CTA band · `full` for status dots and avatars. Inner radius = outer radius − padding, so nested corners stay concentric.

## 5. Shadow system

Shadows are soft and offset downward, tinted with ink, never coloured halos. In dark mode they deepen and borders carry most of the separation.

| Token | Light value | Use |
|---|---|---|
| `xs` | 0 1px 2px ink/5% | Resting cards, buttons |
| `sm` | 0 1px 2px ink/4%, 0 2px 6px −1px ink/6% | Header when scrolled, profile card |
| `md` | 0 2px 4px ink/4%, 0 12px 24px −8px ink/12% | Card hover, mobile menu |
| `lg` | 0 4px 8px ink/4%, 0 24px 48px −16px ink/18% | Featured card hover, hero profile card |

## 6. Button styles

All buttons are 44px tall (touch-safe), with `md` radius, 15px medium-weight text, an optional 16px icon and an 8px gap.
- **Primary:** accent fill with on-accent text, shadow `xs`. Hover: `accent-hover` plus shadow `sm`. Press: moves down 1px.
- **Secondary:** surface fill, `line-strong` border, ink text. Hover: `ink-3` border plus shadow `xs`.
- **Ghost / text link:** ink-2 text; hover goes to ink with an underline. Trailing arrows nudge 2–4px on hover.
- **Small (nav CTA):** 36px tall, 14px text, secondary style.
- **Icon button:** 44×44px with `md` radius and a required `aria-label`.
- Focus: 2px accent outline, 2px offset, on every interactive element.

## 7. Card styles

- **Base card:** surface fill, 1px `line` border, `lg` radius, shadow `xs`, 20/24px padding.
- **Interactive card** (project, next project): the whole card is one link. Hover lifts it 2px, adds shadow `md` and a `line-strong` border; the visual scales 1.03 inside its clipped frame and the arrow nudges.
- **Featured card** (FocusPro): `xl` radius. Visual and content sit side by side from 1024px and stack on mobile. It has an "Featured project" badge in `accent-soft`.
- **Project visual:** 16:10 frame, `surface-2` with the dot grid, illustration or real screenshot, and a small "Illustration" label until a screenshot exists.
- **Content order in project cards:** name → visual → one-line description → technology → key capability → "View project".

## 8. Navigation

- **Desktop (≥768px):** a sticky 64px header with the logo mark and name on the left. On the right: Home · About · Experience · Projects · Contact as 40px pill links (the active one gets a `surface-2` pill and ink text), then the theme toggle and a small "Resume" button. The header gains a border and shadow `sm` once the page scrolls.
- **Mobile (<768px):** logo, theme toggle and a 44px hamburger. The menu drops down below the header as a compact sheet with 48px rows and a full-width Resume button. It fades and slides 4px over 150ms, then closes on link click, Escape or route change, and locks page scroll while open.
- **Footer:** Andi Muhammad Aqil, "Software Engineer / Full-Stack Developer", GitHub, LinkedIn, Email and the copyright. Nothing else.

## 9. Responsive breakpoints

Mobile-first. Tested at 320, 375, 390, 430, 768, 1024, 1280 and 1440px.

| Breakpoint | Width | Changes |
|---|---|---|
| base | <640px | Single column, 16px gutters, stacked CTAs |
| `sm` | ≥640px | 2-column project and skill grids, 24px gutters |
| `md` | ≥768px | Desktop navigation |
| `lg` | ≥1024px | Split hero, featured card side by side, 3-column project grid, case-study table of contents |
| `xl` | ≥1280px | Wider gaps only |

No horizontal overflow at any width. Long strings (email) wrap. Images keep their aspect ratio.

## 10. Animation rules

- **Allowed:** section entrance (fade plus 16px rise, once, staggered 70ms within a group); card hover lift and image scale; button press and arrow nudge; nav pill and underline transitions; mobile-menu fade; page cross-fade (View Transitions) with the project title morphing into its case study; the hero's JSON lines streaming in.
- **Durations:** 150ms for colour, 200ms for buttons, 300ms for card lift, 500ms for image scale, 600ms for entrances and 240ms for page transitions.
- **Easing:** `cubic-bezier(.2,.7,.2,1)` for hovers, `cubic-bezier(.16,1,.3,1)` for entrances.
- **Never:** infinite loops, parallax, scroll-scrubbing, animated gradients, bounces, or animating layout properties.
- **`prefers-reduced-motion`:** entrances, transforms and view transitions switch off; content is simply visible and hovers change colour only.
- Content is never hidden before hydration: only elements that start below the fold wait to animate in.
