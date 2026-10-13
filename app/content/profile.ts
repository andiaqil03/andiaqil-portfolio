import { todo } from './placeholder';
import type { Profile } from './types';

export const profile: Profile = {
  name: 'Andi Aqil',
  fullName: 'Andi Muhammad Aqil Bin Andi Abd Rahman',
  formalName: 'Andi Muhammad Aqil',
  role: 'Software Engineer',
  roleLine: 'Software Engineer / Full-Stack Developer',
  headline: 'Software Engineer · Full-Stack Developer · Software Engineering Graduate',
  heroHeading: ['Software Engineer', 'building practical digital products.'],
  heroFocus: [
    'REST APIs',
    'backend services',
    'full-stack web apps',
    'Angular & React UIs',
    '.NET applications',
  ],
  heroIntro:
    'I’m a Software Engineering graduate focused on backend development and full-stack web applications. I built REST APIs with NestJS at TM R&D, and I now deliver web projects for clients from first requirements to production.',
  location: 'Selangor, Malaysia',
  email: 'andimuhammadaqil03@gmail.com',
  phone: { display: '+60 11-2170 9231', href: 'tel:+601121709231' },
  links: {
    github: 'https://github.com/andiaqil03',
    linkedin: 'https://www.linkedin.com/in/andi-muhammad-aqil-7b5905354',
  },
  resumePdf: todo(
    'Add your resume PDF to /public (e.g. andi-aqil-resume.pdf) and set its path here',
  ),
  coreStack: ['nestjs', 'angular', 'react', 'laravel', 'dotnet', 'sql'],
  openTo: ['Software Engineer', 'Backend Developer', 'Full-Stack Developer'],
  spokenLanguages: ['Malay', 'English'],
  summary: [
    'Software Engineering graduate from Universiti Tenaga Nasional with hands-on experience in backend development, REST APIs and full-stack web applications.',
    'As a freelance developer I work directly with small-business clients: gathering requirements, translating them into technical solutions, iterating on feedback, running user acceptance testing and deploying to production.',
  ],
};
