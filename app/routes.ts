import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('experience', 'routes/experience.tsx'),
  route('projects', 'routes/projects.tsx'),
  route('projects/:slug', 'routes/project.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('resume', 'routes/resume.tsx'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('robots.txt', 'routes/robots.ts'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
