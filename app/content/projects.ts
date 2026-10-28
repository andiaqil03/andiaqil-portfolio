import { todo } from './placeholder';
import type { Project } from './types';

/**
 * Add a project here and its card, case-study page, sitemap entry and meta
 * tags are generated automatically. Display order (as listed here, then
 * newest) is handled in `~/lib/content`.
 *
 * Case-study sections follow one structure: Overview → Problem → Solution →
 * Features → Technology → Implementation / Architecture → Challenges →
 * Lessons learned → Screenshots → Future improvements. Leave out what doesn't
 * apply; use `todo()` for what isn't written yet.
 *
 * To replace a project's illustration with a real screenshot, set `cover`.
 */
export const projects: Project[] = [
  {
    slug: 'focuspro',
    title: 'FocusPro',
    tagline:
      'A productivity and time-management web app for students, freelancers and professionals.',
    highlight: 'Tasks, Pomodoro sessions, site blocking and analytics in one app',
    date: '2025-05',
    kind: 'Final Year Project',
    categories: ['full-stack'],
    stack: ['laravel', 'mysql', 'firebase'],
    summary:
      'A full-stack productivity app combining task management, Pomodoro focus sessions, website distraction blocking and a productivity analytics dashboard, with separate interfaces for users and administrators.',
    selected: true,
    links: {
      repo: 'https://github.com/andiaqil03/FocusPro',
    },
    cover: {
      src: '/images/projects/focuspro/landing.webp',
      alt: 'FocusPro landing page: “Deep work, without the distractions.” beside a focus timer card that is blocking youtube.com and x.com',
      width: 1800,
      height: 1125,
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'FocusPro is a web-based productivity and time-management application. I built it as my Final Year Project using Laravel, MySQL and Firebase, with a Chrome extension that blocks distracting sites during focus sessions.',
            ],
          },
          {
            type: 'facts',
            items: [
              { label: 'Built for', value: 'Students, freelancers and professionals' },
              { label: 'User research', value: '60+ survey responses' },
              { label: 'Interfaces', value: 'User and admin' },
            ],
          },
        ],
      },
      {
        id: 'problem',
        title: 'Problem',
        content: [
          {
            type: 'text',
            paragraphs: [
              'Staying productive takes more than a to-do list. People need to plan and prioritize their work, protect time for focused effort, keep distracting websites out of the way, and understand where their time actually goes.',
            ],
          },
          {
            type: 'note',
            text: 'I gathered requirements through a user survey with more than 60 responses and kept the design user-centered throughout.',
          },
        ],
      },
      {
        id: 'solution',
        title: 'Solution',
        content: [
          {
            type: 'text',
            paragraphs: [
              'FocusPro brings these into one application: task management, Pomodoro focus sessions, website distraction blocking and a productivity analytics dashboard, with separate interfaces for users and administrators.',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        content: [
          {
            type: 'definitions',
            items: [
              {
                term: 'Task management',
                detail:
                  'Create, edit and complete tasks with priorities, categories and due dates; search, filter, sort and export them to PDF.',
              },
              {
                term: 'Pomodoro focus sessions',
                detail:
                  'Adjustable focus and break lengths, with completed cycles saved to your history.',
              },
              {
                term: 'Distraction blocking',
                detail: 'A Chrome extension blocks the sites you list while a focus session runs.',
              },
              {
                term: 'Productivity analytics',
                detail:
                  'Charts for sessions per day, focus vs. break time and task completion, over 7 or 30 days, plus a PDF report.',
              },
              {
                term: 'User accounts',
                detail: 'Sign-up, login, password reset and profile settings.',
              },
              {
                term: 'Admin panel',
                detail:
                  'Platform-wide totals and user management: change roles and remove accounts.',
              },
            ],
          },
        ],
      },
      {
        id: 'technology',
        title: 'Technology',
        content: [
          {
            type: 'tech',
            items: [
              {
                id: 'laravel',
                role: 'Routing, authentication with user and admin roles, task and session logic, and PDF reports.',
              },
              {
                id: 'mysql',
                role: 'Stores users, tasks (status, priority, category, due date) and focus sessions.',
              },
              {
                id: 'firebase',
                role: 'Realtime Database holding each user’s focus status and blocked sites for the extension.',
              },
            ],
          },
        ],
      },
      {
        id: 'architecture',
        title: 'Implementation and architecture',
        content: [
          {
            type: 'text',
            paragraphs: [
              'The web app is a Laravel monolith with Blade, Tailwind CSS and Alpine.js on the front end and MySQL behind it. Analytics charts use Chart.js, and PDF reports are generated with dompdf. Site blocking needed a browser extension, so the app and the extension talk through Firebase.',
            ],
          },
          {
            type: 'steps',
            items: [
              {
                title: 'Start a session',
                detail:
                  'The Focus page writes the user’s focus status and blocked sites to Firebase Realtime Database.',
              },
              {
                title: 'Extension picks it up',
                detail:
                  'The Manifest V3 extension reads that status, instantly via a message from the open FocusPro tab, or on a 30-second check.',
              },
              {
                title: 'Sites are blocked',
                detail:
                  'It sets declarativeNetRequest rules that redirect blocked sites to a “blocked” page.',
              },
              {
                title: 'End the session',
                detail:
                  'Completed cycles and duration are saved to MySQL, and the focus flag is cleared so blocking stops.',
              },
            ],
          },
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges',
        content: [
          {
            type: 'definitions',
            items: [
              {
                term: 'Blocking within browser limits',
                detail:
                  'A website can’t block other sites, so blocking lives in a Chrome extension. Manifest V3 stops background workers at any time, so it uses declarativeNetRequest rules, which Chrome keeps enforcing while the worker sleeps.',
              },
              {
                term: 'Time-tracking accuracy',
                detail:
                  'Only completed cycles count: a session is saved only after at least one full focus-and-break cycle, and the server validates the numbers before storing them.',
              },
              {
                term: 'Intuitive UX',
                detail: 'Designing an interface that feels intuitive to use.',
              },
            ],
          },
        ],
      },
      {
        id: 'lessons',
        title: 'Lessons learned',
        content: [
          {
            type: 'list',
            items: [
              'How to build an intuitive, responsive UI/UX.',
              'Distraction blocking needs a real-time link between the app and the browser extension. MySQL doesn’t provide that on its own, so I used Firebase Realtime Database.',
              'A better understanding of the MVC pattern through Laravel.',
            ],
          },
        ],
      },
      {
        id: 'screenshots',
        title: 'Screenshots',
        content: [
          {
            type: 'gallery',
            images: [
              {
                src: '/images/projects/focuspro/dashboard.webp',
                alt: 'Dashboard with task, completion, session and cycle totals, an Up next task list and a 79% task progress ring',
                width: 1800,
                height: 1125,
                caption: 'Dashboard: today at a glance (demo data).',
              },
              {
                src: '/images/projects/focuspro/tasks.webp',
                alt: 'Task list with search, category and sort filters, an overall progress bar, and tasks tagged by status, category, due date and priority',
                width: 1800,
                height: 1125,
                caption: 'Tasks with priorities, categories and due dates.',
              },
              {
                src: '/images/projects/focuspro/pomodoro.webp',
                alt: 'Focus session page with a 25:00 timer ring, focus and break durations, and a blocked-websites list',
                width: 1800,
                height: 1125,
                caption: 'Focus sessions, with the sites to block.',
              },
              {
                src: '/images/projects/focuspro/blocked.webp',
                alt: 'The extension’s block page: “Stay focused”, youtube.com is blocked while your focus session is running, with the session’s blocked sites and a back-to-session button',
                width: 1800,
                height: 1125,
                caption: 'The extension’s block page during a session (demo values).',
              },
              {
                src: '/images/projects/focuspro/analytics.webp',
                alt: 'Analytics page with session, cycle and focus-time totals, a sessions-per-day bar chart and 7 or 30 day toggles',
                width: 1800,
                height: 1125,
                caption: 'Analytics over 7 or 30 days, with a PDF report (demo data).',
              },
              {
                src: '/images/projects/focuspro/admin-dashboard.webp',
                alt: 'Admin overview showing totals for users, tasks, completed tasks and focus sessions across the platform',
                width: 1800,
                height: 1125,
                caption: 'Admin overview across all users.',
              },
            ],
          },
        ],
      },
      // Hidden for now; restore once the future improvements are written.
      // {
      //   id: 'future',
      //   title: 'Future improvements',
      //   content: todo('What you would add or change next'),
      // },
    ],
  },

  {
    slug: 'whats-cooking',
    title: 'What’s Cooking',
    tagline: 'Recipe recommendations from the ingredients you already have.',
    highlight: 'Generates recipes from your ingredients with Gemini 2.5 Flash',
    cover: {
      src: '/images/projects/whats-cooking/home.webp',
      alt: 'What’s Cooking landing page: a bold “What’s Cooking?” headline, a Start cooking button and sample dish cards',
      width: 1800,
      height: 1125,
    },
    date: '2025-06',
    categories: ['full-stack', 'backend'],
    stack: ['nestjs', 'angular', 'gemini'],
    summary:
      'A full-stack recipe recommendation app: an Angular frontend sends your ingredients to a NestJS REST API, which uses Gemini 2.5 Flash to generate recipe suggestions.',
    selected: true,
    links: {
      repo: todo('What’s Cooking repository URL'),
      live: 'https://whats-cooking-41xf.onrender.com/',
      liveNote:
        'Hosted on Render’s free plan, so the demo may take up to a minute to wake up if nobody has opened it recently.',
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'What’s Cooking is a full-stack recipe recommendation application. You enter the ingredients you have on hand, and the app returns recipe recommendations generated by Gemini 2.5 Flash.',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        content: [
          {
            type: 'list',
            items: [
              'Enter the ingredients you have available',
              'Backend processes each request',
              'Gemini 2.5 Flash generates recipe recommendations',
              'Recommendations are displayed in the Angular frontend',
            ],
          },
        ],
      },
      {
        id: 'technology',
        title: 'Technology',
        content: [
          {
            type: 'tech',
            items: [
              {
                id: 'angular',
                role: 'Frontend: collects ingredients and displays the recommendations.',
              },
              {
                id: 'nestjs',
                role: 'Backend REST API: processes requests and calls Gemini.',
              },
              { id: 'gemini', role: 'Generates the recipe recommendations.' },
            ],
          },
        ],
      },
      {
        id: 'implementation',
        title: 'Implementation',
        intro: 'How a request moves through the app.',
        content: [
          {
            type: 'steps',
            items: [
              { title: 'Enter ingredients', detail: 'In the Angular frontend.' },
              {
                title: 'Call the API',
                detail: 'The frontend sends the request to the NestJS backend.',
              },
              {
                title: 'Generate',
                detail: 'The backend processes the request and asks Gemini 2.5 Flash for recipes.',
              },
              { title: 'Display', detail: 'The Angular frontend renders the recommendations.' },
            ],
          },
        ],
      },
      {
        id: 'demonstrates',
        title: 'What it demonstrates',
        content: [
          {
            type: 'list',
            items: [
              'REST API development with NestJS',
              'Integrating a third-party AI API',
              'Backend–frontend communication',
              'Component-based frontend development with Angular',
            ],
          },
        ],
      },
      {
        id: 'screenshots',
        title: 'Screenshots',
        content: [
          {
            type: 'gallery',
            images: [
              {
                src: '/images/projects/whats-cooking/kitchen.webp',
                alt: 'The kitchen page with eggs, rice, garlic, tomato and onion added as ingredient chips, ready to cook',
                width: 1800,
                height: 1125,
                caption: 'Add ingredients by typing or with quick-add chips.',
              },
              {
                src: '/images/projects/whats-cooking/results.webp',
                alt: 'Generated recipe suggestions, starting with a Chinese-style tomato and egg stir-fry over rice',
                width: 1800,
                height: 1125,
                caption: 'Gemini returns dishes you can make with what you have.',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'aquaboost',
    title: 'AquaBoost',
    tagline: 'A daily hydration tracker: set a goal, log your water, see what’s left.',
    highlight: 'Automatically calculates your remaining daily target',
    date: '2026-05',
    categories: ['full-stack'],
    stack: ['dotnet', 'firebase'],
    summary:
      'A hydration tracking app built with .NET and Firebase: set a daily water goal, log your intake and see how much is left for the day.',
    links: {
      repo: todo('AquaBoost repository URL'),
      live: todo('AquaBoost live demo URL (if any)'),
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'AquaBoost is a daily hydration tracker. Users set a daily goal, record their water intake and track their progress, and the app automatically calculates how much is left to drink that day.',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        content: [
          {
            type: 'list',
            items: [
              'Set a daily hydration goal',
              'Record water intake',
              'Track progress toward the goal',
              'Automatically calculate the remaining daily target',
              'Daily tracking with history',
            ],
          },
        ],
      },
      {
        id: 'technology',
        title: 'Technology',
        content: [
          {
            type: 'tech',
            items: [
              {
                id: 'dotnet',
                role: todo(
                  'Which .NET technology (e.g. ASP.NET Core API, MAUI, Blazor) and what it handled',
                ),
              },
              { id: 'firebase', role: todo('What Firebase was used for in AquaBoost') },
            ],
          },
          {
            type: 'note',
            text: 'Alongside this project I was learning React Native and TypeScript to expand into mobile development.',
          },
        ],
      },
      {
        id: 'screenshots',
        title: 'Screenshots',
        content: todo('Screenshots: goal setup, intake logging, progress and history'),
      },
    ],
  },

  {
    slug: 'student-depression-prediction',
    title: 'Student Depression Prediction',
    tagline: 'An academic machine-learning classification project.',
    highlight: 'Logistic Regression reached 83.66% accuracy',
    date: '2025-04',
    kind: 'Academic project',
    categories: ['machine-learning'],
    stack: [],
    summary:
      'An academic binary-classification project comparing Logistic Regression, Decision Tree and KNN on a dataset of 27,901 records. Logistic Regression performed best, at 83.66% accuracy.',
    links: {
      repo: todo('Notebook or repository URL'),
      live: todo('Not applicable? Remove this placeholder if there is no live version'),
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'An academic machine-learning project framed as a binary classification task. I prepared the dataset, trained three classic models and compared them to find the best balance of precision and recall.',
            ],
          },
          {
            type: 'note',
            text: 'This was an academic classification exercise. It is not a medical or diagnostic tool, and its results make no clinical claims.',
          },
        ],
      },
      {
        id: 'dataset',
        title: 'Dataset',
        content: [
          {
            type: 'facts',
            items: [
              { label: 'Records', value: '27,901' },
              { label: 'Features', value: '18' },
              { label: 'Train / test split', value: '80 / 20' },
              { label: 'Task', value: 'Binary classification' },
            ],
          },
          todo(
            'Dataset source/citation and the tools or libraries used (e.g. Python, pandas, scikit-learn)',
          ),
        ],
      },
      {
        id: 'implementation',
        title: 'Implementation',
        intro: 'From raw data to a compared set of models.',
        content: [
          {
            type: 'steps',
            items: [
              { title: 'Preprocess', detail: 'Cleaned the data and handled missing values.' },
              { title: 'Encode', detail: 'Applied label encoding and one-hot encoding.' },
              { title: 'Split', detail: '80/20 train–test split.' },
              {
                title: 'Train and compare',
                detail: 'Logistic Regression, Decision Tree and K-Nearest Neighbors.',
              },
            ],
          },
        ],
      },
      {
        id: 'result',
        title: 'Result',
        content: [
          {
            type: 'facts',
            items: [
              { label: 'Best model', value: 'Logistic Regression' },
              { label: 'Accuracy', value: '83.66%' },
            ],
          },
          {
            type: 'text',
            paragraphs: [
              'Logistic Regression was identified as the best-performing model, offering the most balanced precision and recall of the three.',
            ],
          },
        ],
      },
      {
        id: 'future',
        title: 'Future improvements',
        content: [
          {
            type: 'list',
            items: ['Try Random Forest', 'Try Gradient Boosting', 'Further feature engineering'],
          },
        ],
      },
    ],
  },

  {
    slug: 'yumefind',
    title: 'YumeFind',
    tagline: 'An anime search website powered by the AniList API.',
    highlight: 'Live anime search with a detail page for every title',
    cover: {
      src: '/images/projects/yumefind/home.webp',
      alt: 'YumeFind home page: “Every search begins with a dream” headline, a title search bar with filters, and a trending anime',
      width: 1800,
      height: 1125,
    },
    date: '2025-11',
    kind: 'Learning project',
    categories: ['frontend'],
    stack: ['react', 'anilist'],
    summary:
      'An anime search site built with React and the AniList API, showing live titles, synopses, ratings, episode counts and images, with a dedicated detail page for each anime.',
    selected: true,
    links: {
      repo: todo('YumeFind repository URL'),
      live: 'https://yumefind.netlify.app/',
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'YumeFind lets you search for anime and browse real-time data from the AniList API. I built it as a learning project focused on API integration, state management and component-based architecture.',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        content: [
          {
            type: 'list',
            items: [
              'Anime search',
              'Real-time data from the AniList API',
              'Titles, synopses, ratings, episode counts and images',
              'A dedicated detail page for each anime',
            ],
          },
        ],
      },
      {
        id: 'technology',
        title: 'Technology',
        content: [
          {
            type: 'tech',
            items: [
              { id: 'react', role: 'Component-based UI and state management.' },
              {
                id: 'anilist',
                role: 'Real-time anime data: titles, synopses, ratings, episodes and images.',
              },
            ],
          },
        ],
      },
      {
        id: 'screenshots',
        title: 'Screenshots',
        content: [
          {
            type: 'gallery',
            images: [
              {
                src: '/images/projects/yumefind/browse.webp',
                alt: 'A grid of highest-rated anime with posters, scores, year, format and episode counts',
                width: 1800,
                height: 1125,
                caption: 'Browse the highest-rated titles.',
              },
              {
                src: '/images/projects/yumefind/detail.webp',
                alt: 'The detail page for Frieren: Beyond Journey’s End with score, rank, popularity, genres and synopsis',
                width: 1800,
                height: 1125,
                caption: 'Each title has its own detail page.',
              },
            ],
          },
        ],
      },
      {
        id: 'learned',
        title: 'What I practiced',
        content: [
          {
            type: 'list',
            items: ['API integration', 'State management', 'Component-based architecture'],
          },
        ],
      },
    ],
  },

  {
    slug: 'paw-and-preferences',
    title: 'Paw & Preferences',
    tagline: 'A swipe-style cat preference app powered by the CATAAS API.',
    highlight: 'Smooth swipe gestures for like and dislike',
    cover: {
      src: '/images/projects/paw-and-preferences/cover.webp',
      alt: 'Three phone screens of Paw & Preferences: the swipe guide, a cat card to swipe, and the results with liked cats',
      width: 1800,
      height: 1125,
    },
    date: '2025-11',
    kind: 'Learning project',
    categories: ['frontend'],
    stack: ['react', 'cataas'],
    summary:
      'A swipe-style preference app built with React and the CATAAS API: dynamic cat images, like and dislike interactions and smooth swipe gestures.',
    links: {
      repo: todo('Paw & Preferences repository URL'),
      live: 'https://pawandpreferences.netlify.app',
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'Paw & Preferences shows a stream of cat images from the CATAAS API and lets you like or dislike each one with a swipe. I built it as a learning project focused on interactive UX in React.',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        content: [
          {
            type: 'list',
            items: [
              'Dynamic cat images from the CATAAS API',
              'Like and dislike interactions',
              'Swipe-style interaction with smooth gestures',
            ],
          },
        ],
      },
      {
        id: 'technology',
        title: 'Technology',
        content: [
          {
            type: 'tech',
            items: [
              { id: 'react', role: 'Swipe interactions, event handling and UI components.' },
              { id: 'cataas', role: 'Supplies the dynamic cat images.' },
            ],
          },
        ],
      },
      {
        id: 'screenshots',
        title: 'Screenshots',
        content: [
          {
            type: 'gallery',
            columns: 3,
            images: [
              {
                src: '/images/projects/paw-and-preferences/guide.webp',
                alt: 'The swipe guide: swipe right to like, swipe left to pass, rate all 20 cats',
                width: 780,
                height: 1688,
                caption: 'A short guide before you start.',
              },
              {
                src: '/images/projects/paw-and-preferences/swipe.webp',
                alt: 'A cat photo card ready to swipe, with a 1 of 20 counter',
                width: 780,
                height: 1688,
                caption: 'Swipe through 20 cats.',
              },
              {
                src: '/images/projects/paw-and-preferences/results.webp',
                alt: 'Results: 13 cats liked, a 65% approval rating, and a grid of the liked cats',
                width: 780,
                height: 1688,
                caption: 'Your results and favourite cats.',
              },
            ],
          },
        ],
      },
      {
        id: 'learned',
        title: 'What I practiced',
        content: [
          {
            type: 'list',
            items: [
              'API integration',
              'Event handling',
              'Component-driven UI development',
              'Interactive UX',
            ],
          },
        ],
      },
    ],
  },
];
