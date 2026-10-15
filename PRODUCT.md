# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + TypeScript + Tailwind CSS v4, built with React Router (framework mode, Vite) and statically prerendered (`ssr: false`). Chosen with the user: they asked for React/TypeScript/Vite/Tailwind; React Router framework mode was added so every route ships real HTML for SEO and link previews. Deploys as static files.

## Users

- **Recruiters and hiring managers** screening candidates for Software Engineer roles. Usually arriving from a LinkedIn profile, a job application or an email, on a laptop during the working day or on a phone. They scan for role fit, real experience and a way to get in touch, often in under a minute.
- **Engineers on interview panels** who look deeper: project case studies, the stack used, and the site's own code quality.

## Product Purpose

The personal portfolio of Andi Muhammad Aqil (full name Andi Muhammad Aqil Bin Andi Abd Rahman), a Software Engineering graduate. Success means a recruiter quickly understands that Andi is an early-career software engineer who builds across frontend and backend, has real industry and freelance experience, works well with clients, and is growing toward professional software engineering roles. Then they send an email, open the LinkedIn profile, or download the resume.

## Positioning

Early-career and honest about it, but backed by evidence: full-stack client work at MTechnix (React, Express.js, PostgreSQL, Azure), NestJS REST API work at TM R&D, end-to-end freelance delivery for small-business clients (requirements, build, UAT, production deploy), and a researched final-year project (FocusPro). Andi is never positioned as senior or expert.

Balanced, not backend-first (user, Oct 2026): just "Software Engineer", equally at home on frontend and backend. The site should also show Andi's life beyond work (sport, hiking, travel), with minimal wording: short, plain copy; detail belongs on About and Experience, not Home.

## Capabilities and Constraints

- Pages: Home, About, Experience, Projects (filterable), per-project case studies, Contact, Resume (web + PDF download), 404.
- Each topic is covered in full on one page only (user, Oct 2026). Home is a preview: hero → selected projects → short about → one-line-per-role experience → the latest trip → the contact panel, and each part links to the page that owns it. About covers the story (short prose), skills, education, all trips and committee work. Experience has the full role detail and the client process. The big contact panel appears on Home only; other pages end with a short contact line.
- All content lives in typed data modules under `app/content/`; unknown facts use `todo()` placeholders that render only in development and are listed by `npm run check:content`.
- Phone number appears **only** on the Contact page and in the resume PDF: never in the hero, header, footer, web resume or structured data.
- Public location is "Selangor, Malaysia" only.
- Display name is "Andi Muhammad Aqil" ("Andi Aqil" only in the footer wordmark and intro loader); the footer and copyright use "Andi Muhammad Aqil"; the full legal name appears in About, the resume and search metadata.
- Positioning line chosen by the user: "Software Engineer building practical digital products"; footer role line "Software Engineer". Home shows no CGPA/stat counters; hobbies take that slot.
- React Native is "currently learning", not a core skill. Data Engineering is a secondary interest, mentioned on About only.
- The PNB role is Protégé Project Management Officer (Get-MySTEP Programme) in the Tech & Cyber Risk Department, **not** a cybersecurity or engineering role.
- The Student Depression Prediction project is an academic ML classification exercise; it makes no medical or clinical claims.
- AquaBoost was built with .NET and Firebase. It was **not** built with React Native.

## Brand Commitments

- Confident but honest voice. First person in body copy.
- Visual identity set by the user (Oct 2026, "Trail Map"): the site should show Andi's personality (hiking, travel, sport) through an earthy hiking-map world: map-paper white, pine green, alpine-lake blue and granite, with sunrise orange reserved for trail markers. Light by default with dark ("night hike") as an opt-in toggle. Keep the rich motion: a 3D contour-mountain hero where the career is the trail, contour textures, self-drawing trail timelines, an intro loader, animated real-number stats, a ⌘K command palette and smooth scrolling. Every effect stays honest (no invented data) and switches off for reduced motion. See DESIGN.md.
- Unwanted (user feedback, Oct 2026): colour gradients, neon colours, glows and anything that "looks AI-generated". Use solid colours; gradients only as invisible masks that fade textures.
- Also unwanted: fake statistics, invented clients/testimonials, skill bars/percentages, rows of technology logos and "Hello World" clichés.
- Outdoor photos (hiking, travel, sport) are supplied by Andi only; frames stay hidden on the live site until real photos are added.

## Evidence on Hand

Real facts supplied by the user (see `app/content/`): four roles (Software Engineer at MTechnix Sdn Bhd via the K-Youth Programme, Aug 2026–present; freelance, May 2026–present; PNB PMO via Protégé Get-MySTEP; TM R&D backend internship), UNITEN B.CS (Hons.) Software Engineering (CGPA 3.56, Dean's List for 4 semesters), Foundation (CGPA 3.89), six projects, and one committee activity.

**Absent; never fabricate:** project screenshots, repo/demo links, resume PDF, production domain, client names, any performance metrics, testimonials, certifications, GitHub statistics, user counts.

## Product Principles

1. Evidence over adjectives: every skill and claim should trace back to a role or project.
2. Six-second clarity: role, target roles, proof and contact are visible straight away.
3. Honest labels build trust: learning projects and the non-engineering PMO role are labelled as such.
4. The site itself is a code sample: typed, accessible, fast, easy to update.

## Accessibility & Inclusion

WCAG 2.2 AA: semantic landmarks and headings, keyboard operability, visible focus, 4.5:1 text contrast in both themes, alt text, and `prefers-reduced-motion` respected.
