import { todo } from './placeholder';
import type { Experience } from './types';

/** Most recent first. */
export const experience: Experience[] = [
  {
    id: 'mtechnix',
    role: 'Software Engineer',
    organization: 'MTechnix Sdn Bhd',
    organizationShort: 'MTechnix',
    context: 'K-Youth Programme',
    kind: 'Graduate programme',
    period: { start: '2026-08', end: 'present' },
    summary:
      'Building full-stack web applications for clients, from requirements gathering to deployment.',
    highlights: [
      'Develop full-stack web applications for clients across the whole lifecycle, from requirements gathering and analysis to development and deployment.',
      'Design and build full-stack web applications with React, Express.js and PostgreSQL.',
      'Deploy applications on Microsoft Azure, validating them before delivery to clients.',
    ],
    details: [
      'Run meetings with clients to gather business requirements, understand user needs and turn them into clear functional specifications.',
      'Refine requirements and feature specifications with clients through iterative discussions.',
      'Coordinate with clients throughout development to validate features and make sure the final solution meets the agreed requirements.',
    ],
    tech: ['react', 'express', 'postgresql', 'azure'],
  },
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
