import type { Activity, Education } from './types';

export const education: Education[] = [
  {
    id: 'bcs',
    institution: 'Universiti Tenaga Nasional',
    institutionShort: 'UNITEN',
    qualification: 'Bachelor of Computer Science (Hons.)',
    field: 'Computer Science (Software Engineering)',
    period: { start: '2022-09', end: '2025-09' },
    grade: 'CGPA 3.56',
    honours: 'Dean’s List Awardee, 4 semesters',
    coursework: [
      'C / C# / C++ Programming',
      'Object-Oriented Programming',
      'Advanced Web Application Development',
      'Mobile Application Development',
      'Data Structures and Algorithms',
      'Database',
      'Data Communication and Networks',
      'Artificial Intelligence',
      'Parallel Computing',
      'Digital Design and Microprocessor Systems',
    ],
  },
  {
    id: 'foundation',
    institution: 'Universiti Tenaga Nasional',
    institutionShort: 'UNITEN',
    qualification: 'Foundation in Computer Science',
    period: { start: '2021-09', end: '2022-09' },
    grade: 'CGPA 3.89',
  },
];

export const activities: Activity[] = [
  {
    id: 'mega-fitness-carnival',
    title: 'Mega Fitness Carnival UNITEN 2023',
    role: 'Committee member',
    date: '2023-08',
    points: [
      'Coordinated the registration process and managed participant sign-ups using QR-code registration.',
      'Managed the distribution of curriculum points (SCORUN).',
      'Helped keep registration and accreditation running smoothly.',
    ],
  },
];
