import { todo } from './placeholder';
import type { Profile } from './types';

export const profile: Profile = {
  name: 'Andi Muhammad Aqil',
  shortName: 'Andi Aqil',
  fullName: 'Andi Muhammad Aqil Bin Andi Abd Rahman',
  formalName: 'Andi Muhammad Aqil',
  role: 'Software Engineer',
  roleLine: 'Software Engineer',
  now: 'Software Engineer at MTechnix, freelancing on the side',
  headline: 'Software Engineer · Software Engineering Graduate',
  heroHeading: ['Software Engineer', 'building practical digital products.'],
  heroFocus: ['full-stack web apps', 'frontend interfaces', 'backend APIs', 'cloud deployments'],
  heroIntro:
    'I’m a Software Engineering graduate who enjoys doing fullstack development. Passionate about modern technology and always learning how to build better, more scalable apps.',
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
  openTo: ['Software Engineer'],
  spokenLanguages: ['Malay', 'English'],
  summary: [
    'Software Engineering graduate from Universiti Tenaga Nasional, building full-stack web applications across the front end and back end.',
    'At MTechnix I build and deploy full-stack apps for clients with React, Express.js, PostgreSQL and Microsoft Azure, and I take on freelance web projects on the side.',
  ],
};
