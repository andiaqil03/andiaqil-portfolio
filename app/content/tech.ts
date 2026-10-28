/**
 * Every technology referenced anywhere on the site. Projects, roles and skill
 * groups refer to these by id, so a typo is a type error and the "where I used
 * this" links on the skills section are derived automatically.
 */
export const tech = {
  // Languages
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  php: 'PHP',
  csharp: 'C#',
  java: 'Java',
  python: 'Python',
  cpp: 'C++',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',

  // Frameworks, libraries and runtimes
  nestjs: 'NestJS',
  angular: 'Angular',
  react: 'React',
  laravel: 'Laravel',
  dotnet: '.NET',
  express: 'Express.js',
  nodejs: 'Node.js',
  tailwind: 'Tailwind CSS',
  bootstrap: 'Bootstrap',
  reactNative: 'React Native',

  // Data
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  firebase: 'Firebase',
  access: 'Microsoft Access',
  powerbi: 'Power BI',

  // Tools
  azure: 'Microsoft Azure',
  git: 'Git',
  docker: 'Docker',
  postman: 'Postman',
  dbeaver: 'DBeaver',
  sonarqube: 'SonarQube',

  // External APIs used in projects
  gemini: 'Gemini 2.5 Flash API',
  anilist: 'AniList API',
  cataas: 'CATAAS API',
} as const satisfies Record<string, string>;

export type TechId = keyof typeof tech;

export function techName(id: TechId): string {
  return tech[id];
}
