import type { SkillGroup } from './types';

/** Compact skill categories, ordered by relevance to backend and full-stack roles. */
export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    items: ['nodejs', 'nestjs', 'express', 'laravel', 'dotnet'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['react', 'angular', 'html', 'css', 'tailwind', 'bootstrap'],
  },
  {
    id: 'languages',
    title: 'Languages',
    items: ['javascript', 'typescript', 'csharp', 'php', 'python', 'java', 'cpp', 'sql'],
  },
  {
    id: 'data-tools',
    title: 'Database & tools',
    items: [
      'postgresql',
      'mysql',
      'firebase',
      'git',
      'docker',
      'postman',
      'dbeaver',
      'powerbi',
      'sonarqube',
      'access',
    ],
  },
];

/** Shown separately so it's clear these are in progress. */
export const learning: SkillGroup = {
  id: 'learning',
  title: 'Currently learning',
  items: ['reactNative'],
};
