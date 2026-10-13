import type { ProcessStep, StoryChapter } from './types';

/** The About page story: education → backend → programme work → freelance → projects → what's next. */
export const story: StoryChapter[] = [
  {
    id: 'education',
    period: '2021 – 2025',
    title: 'Software engineering at UNITEN',
    text: 'A Foundation in Computer Science (CGPA 3.89), then a Bachelor of Computer Science (Hons.) in Software Engineering, which I finished with a CGPA of 3.56 and four semesters on the Dean’s List. My final-year project was FocusPro, a full-stack productivity app shaped by a 60+ response user survey.',
    link: { label: 'FocusPro case study', to: '/projects/focuspro' },
  },
  {
    id: 'backend',
    period: 'Jul – Sep 2025',
    title: 'Backend development at TM R&D',
    text: 'As a backend developer intern I developed and maintained REST APIs in NestJS for a production-related project, optimized API performance and data fetching, and reduced code smells flagged by SonarQube.',
    link: { label: 'Internship details', to: '/experience#tm-rnd' },
  },
  {
    id: 'pnb',
    period: 'Dec 2025 – Aug 2026',
    title: 'Programme work at PNB',
    text: 'As a Protégé Project Management Officer in the Tech & Cyber Risk Department, I supported a cybersecurity transformation programme: coordinating meetings, tracking deliverables, working with external PMO stakeholders from KPMG and building a Power BI reporting dashboard. Not an engineering role, but a close look at how large programmes are governed.',
  },
  {
    id: 'freelance',
    period: 'May 2026 – now',
    title: 'Freelance software development',
    text: 'I design, build and deploy web applications for small-business clients, working with them directly from the first requirements through user acceptance testing to production.',
    link: { label: 'How I work', to: '#process' },
    state: 'current',
  },
  {
    id: 'projects',
    period: 'Along the way',
    title: 'Full-stack projects',
    text: 'What’s Cooking (NestJS, Angular and Gemini), AquaBoost (.NET and Firebase), an academic machine-learning study, and React projects built to practice API integration and interactive UI.',
    link: { label: 'All projects', to: '/projects' },
  },
  {
    id: 'next',
    period: 'Next',
    title: 'Continued technical growth',
    text: 'Going deeper into .NET, Angular and backend engineering, and into building software that is scalable and reliable. I’m also exploring data engineering and learning React Native.',
    state: 'next',
  },
];

/** How a freelance project moves from first conversation to production. */
export const workProcess: ProcessStep[] = [
  { title: 'Understand', detail: 'Work directly with the client to gather requirements.' },
  { title: 'Translate', detail: 'Turn business requirements into a technical solution.' },
  { title: 'Build', detail: 'Reusable components, responsive layouts and API integrations.' },
  { title: 'Iterate and test', detail: 'Refine features on feedback, run UAT and fix bugs.' },
  { title: 'Deploy', detail: 'Ship the finished application to production.' },
];
