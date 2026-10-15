import type { ProcessStep } from './types';

/** How a client project moves from first conversation to production. */
export const workProcess: ProcessStep[] = [
  { title: 'Understand', detail: 'Work directly with the client to gather requirements.' },
  { title: 'Translate', detail: 'Turn business requirements into a technical solution.' },
  { title: 'Build', detail: 'Reusable components, responsive layouts and API integrations.' },
  { title: 'Iterate and test', detail: 'Refine features on feedback, run UAT and fix bugs.' },
  { title: 'Deploy', detail: 'Ship the finished application to production.' },
];
