# Andi Aqil: Portfolio

Personal portfolio of Andi Muhammad Aqil Bin Andi Abd Rahman, Software Engineering graduate and software developer.

Built with **React 19, TypeScript, Tailwind CSS v4 and React Router (framework mode on Vite)**, animated with **GSAP + ScrollTrigger**, **Lenis** smooth scrolling and a **three.js** hero: a 3D contour map where the career is drawn as a hiking trail. Press **Ctrl/⌘ + K** anywhere for the command palette. Every page is prerendered to static HTML at build time, so the site is fast, SEO-friendly, shows proper link previews, and can be hosted on any static host for free.

## Quick start

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev            # http://localhost:5173 (placeholders visible)
npm run build          # prerender everything into build/client
npm run preview        # serve the build like a static host (http://localhost:4173)
```

| Script                  | What it does                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`     | Generate route types and run TypeScript                                                                               |
| `npm run lint`          | ESLint, including accessibility rules (jsx-a11y)                                                                      |
| `npm run check:content` | List every placeholder still waiting for real content                                                                 |
| `npm run og-image`      | Re-render `public/og-image.png` and `public/apple-touch-icon.png` from `scripts/social/*.html` (needs Edge or Chrome) |
| `npm run topo`          | Regenerate the contour-line texture `public/topo.svg`                                                                 |

## Updating content

All content lives in **`app/content/`**. You should rarely need to touch components.

| File            | Contains                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `profile.ts`    | Name, hero heading and intro, email, phone (Contact page only), links, resume PDF path, summary      |
| `about.ts`      | The About page story timeline and the client-work process                                            |
| `experience.ts` | Roles, newest first. `highlights` are always shown; `details` sit behind "Show more"                 |
| `projects.ts`   | Projects and their case-study sections                                                               |
| `skills.ts`     | Skill categories (Backend, Frontend, Languages, Database & tools) and what you're currently learning |
| `education.ts`  | Education and activities                                                                             |
| `outdoors.ts`   | The "Off the trail" section: hiking, travel and sport, plus photo slots                              |
| `tech.ts`       | Every technology name, referenced by id everywhere else                                              |
| `site.ts`       | Production domain, navigation, this repo's URL                                                       |

### Placeholders

Unknown facts use `todo('what is needed')`. Placeholders appear as dashed amber notes in `npm run dev` and are **hidden in production builds**, so the live site never shows a broken link or an empty section. Run `npm run check:content` to see what's left. To fill one in, replace the `todo(...)` with the real value.

### Adding a project

Add an object to `projects.ts`. Its row on the Projects page, its case-study page, the sitemap entry and meta tags are generated automatically. Set `selected: true` to show it on the home page, or `featured: true` to make it the featured project (exactly one).

Case-study sections are built from typed blocks: `text`, `list`, `definitions`, `steps`, `facts`, `note`, `tech` and `gallery`.

### Project visuals and screenshots

Until a project has real screenshots, its cards and case-study hero show a schematic illustration (labelled "Illustration") drawn in `app/components/projects/illustrations.tsx`. To use a real screenshot instead, add a `cover` to the project:

```ts
cover: {
  src: '/images/projects/focuspro/cover.webp',
  alt: 'FocusPro dashboard with today’s tasks and a running Pomodoro session',
  width: 1600,
  height: 1000,
},
```

For more screenshots inside the case study:

1. Put images in `public/images/projects/<slug>/` (WebP or PNG, around 1600px wide).
2. Replace the `todo(...)` in that project's `screenshots` section with a gallery block:

```ts
content: [
  {
    type: 'gallery',
    images: [
      {
        src: '/images/projects/focuspro/dashboard.webp',
        alt: 'FocusPro analytics dashboard showing weekly focus time by day',
        width: 1600,
        height: 1000,
        caption: 'Productivity analytics dashboard',
      },
    ],
  },
],
```

### Outdoor photos

The "Off the trail" section (Home and About) shows one card per activity. Each card is a story-style viewer: tap the right side (or swipe, or press →) for the next photo, and the left side for the previous one. Activities without real photos are hidden on the live site.

1. Put the photos in `public/images/outdoors/`, named in order (e.g. `merbabu-1.jpg`, `merbabu-2.jpg`, …). Portrait 3:4, around 960×1280.
2. In `app/content/outdoors.ts`, add an activity (or fill in a `todo(...)` one) with its `kind`, `title`, optional `detail` and `date`, and the `photos` in display order, each with an `alt` description. See the Gunung Merbabu entry for an example.

### Resume PDF

Copy your PDF into `public/` (e.g. `public/andi-aqil-resume.pdf`) and set `resumePdf: '/andi-aqil-resume.pdf'` in `profile.ts`. A "Download PDF" button then appears on `/resume`. The web resume deliberately leaves out your phone number; keep it in the PDF if you want it there.

### Domain

When you have a domain, set `url` in `site.ts` (e.g. `'https://andiaqil.dev'`). This turns on canonical URLs, the sitemap entries and the `og:image` link preview.

## Deploying

The build output is plain static files in **`build/client`**.

- **Cloudflare Pages / Netlify**: build command `npm run build`, output directory `build/client`.
- **Vercel**: framework preset "Other", build command `npm run build`, output directory `build/client`.
- **GitHub Pages**: publish `build/client`. Use a custom domain or a `<username>.github.io` repository; a project sub-path (`/repo-name/`) would need React Router's `basename`.

All of these serve `build/client/404.html` (generated by `scripts/postbuild.mjs`) for unknown URLs.

## Project structure

```
app/
  content/      Typed content: the only place you normally edit
  components/   UI, layout, and section components
  hooks/        useHydrated, useTheme, useCopy
  lib/          Selectors, date formatting, SEO helpers
  routes/       One file per page, plus sitemap.xml and robots.txt
  app.css       Design tokens (light and dark) and global styles
  root.tsx      Document shell, header, footer, error boundary
public/         Favicon, touch icon, link-preview image, (your resume PDF)
scripts/        Post-build 404, preview server, content check, social images, contour texture
DESIGN.md       Design system: colour, type, spacing, radius, shadow, buttons, cards, nav, breakpoints, motion
PRODUCT.md      Product context and content constraints
```

## Accessibility and performance

- Semantic landmarks, one `h1` per page, skip link, visible focus rings, keyboard-operable tabs, filters and menus.
- Colour contrast meets WCAG AA in both themes.
- All motion respects `prefers-reduced-motion` (no intro, smooth scroll, pinning or reveals; the trail map renders a still frame with the route fully drawn).
- Light theme by default; dark is opt-in via the toggle or the command palette and is remembered.
- The three.js scene is a separate, lazily loaded chunk that pauses when off-screen.
- No runtime data fetching, no analytics, no cookies. Fonts are self-hosted.
