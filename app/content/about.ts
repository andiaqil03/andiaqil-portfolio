import type { ProcessStep } from './types';

/** The About page story: a few short paragraphs. Role details live on the Experience page. */
export const story: string[] = [
  'I studied Software Engineering at UNITEN, finishing with a CGPA of 3.56 and four semesters on the Dean’s List. My final-year project was FocusPro, a full-stack productivity app.',
  'Since then I’ve interned as a backend developer at TM R&D, supported a programme office at PNB, and started freelancing. Today I build full-stack apps for clients at MTechnix.',
  'Next, I want to keep growing across the whole stack. I’m learning React Native along the way.',
];

/** How a client project moves from first conversation to production. */
export const workProcess: ProcessStep[] = [
  { title: 'Understand', detail: 'Work directly with the client to gather requirements.' },
  { title: 'Translate', detail: 'Turn business requirements into a technical solution.' },
  { title: 'Build', detail: 'Reusable components, responsive layouts and API integrations.' },
  { title: 'Iterate and test', detail: 'Refine features on feedback, run UAT and fix bugs.' },
  { title: 'Deploy', detail: 'Ship the finished application to production.' },
];
