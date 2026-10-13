import { todo } from './placeholder';
import type { Experience } from './types';

/** Most recent first. */
export const experience: Experience[] = [
  {
    id: 'freelance',
    role: 'Freelance Software Developer',
    organization: 'Self-employed',
    organizationShort: 'Freelance',
    kind: 'Freelance',
    period: { start: '2026-05', end: 'present' },
    summary:
      'Designing, building and deploying responsive websites and web solutions for small-business clients.',
    highlights: [
      'Work directly with clients to gather requirements and translate business needs into technical solutions.',
      'Build reusable UI components and responsive layouts for desktop and mobile.',
      'Integrate frontend applications with REST APIs and backend services.',
    ],
    details: [
      'Iterate on features based on client feedback.',
      'Run user acceptance testing with clients and fix the bugs it uncovers.',
      'Deploy completed applications to production environments.',
    ],
    tech: todo('Which technologies do you use for freelance projects?'),
  },
  {
    id: 'pnb',
    role: 'Protégé Project Management Officer',
    organization: 'Permodalan Nasional Berhad',
    organizationShort: 'PNB',
    context: 'Get-MySTEP Programme · Tech & Cyber Risk Department',
    kind: 'Graduate programme',
    note: 'Non-engineering role',
    period: { start: '2025-12', end: '2026-08' },
    summary:
      'Supported the HIMAYA Cybersecurity Transformation Programme as a Project Management Officer.',
    highlights: [
      'Coordinated meetings, prepared minutes and monitored project progress to keep programme activities running smoothly.',
      'Developed a Power BI reporting dashboard to support programme oversight.',
      'Collaborated with external PMO stakeholders from KPMG.',
    ],
    details: [
      'Tracked deliverables and supported cross-business coordination.',
      'Assisted with programme oversight activities.',
      'Gained exposure to project governance and risk management processes, including observing risk evaluation practices.',
    ],
    tech: ['powerbi'],
  },
  {
    id: 'tm-rnd',
    role: 'Backend Developer Intern',
    organization: 'Telekom Malaysia Research & Development',
    organizationShort: 'TM R&D',
    kind: 'Internship',
    period: { start: '2025-07', end: '2025-09' },
    summary:
      'Backend work on a production-related project: REST APIs in NestJS, API performance and code quality.',
    highlights: [
      'Developed and maintained multiple backend REST APIs using NestJS.',
      'Optimized API performance and data fetching to improve response times and system reliability.',
      'Improved code quality by reducing code smells identified by SonarQube.',
    ],
    details: [
      'Resolved merge conflicts and helped ensure smooth deployments to the staging environment.',
      'Collaborated with team members across the project.',
      'Presented internship progress to my university lecturer.',
    ],
    tech: ['nestjs', 'sonarqube'],
  },
];
