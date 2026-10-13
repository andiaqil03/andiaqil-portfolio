import { todo } from './placeholder';
import type { Project } from './types';

/**
 * Add a project here and its card, case-study page, sitemap entry and meta
 * tags are generated automatically. Display order (featured first, then
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
    featured: true,
    keyPoints: [
      'Requirements shaped by a user survey with 60+ responses',
      'Task management, Pomodoro sessions and website blocking',
      'Analytics dashboard with charts and downloadable reports',
    ],
    links: {
      repo: todo('FocusPro repository URL'),
      live: todo('FocusPro live demo URL (if any)'),
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'FocusPro is a web-based productivity and time-management application. I built it as my Final Year Project using Laravel, MySQL and Firebase.',
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
          todo('Two or three key findings from the survey, and how they shaped the features'),
        ],
      },
      {
        id: 'solution',
        title: 'Solution',
        content: [
          {
            type: 'text',
            paragraphs: [
              'FocusPro brings these into one application: task management, Pomodoro focus sessions, website distraction blocking and a productivity analytics dashboard, with responsive interfaces for both users and administrators.',
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
              { term: 'Task management', detail: 'Create, edit, prioritize and track tasks.' },
              { term: 'Pomodoro focus sessions', detail: 'Pomodoro-style timed focus sessions.' },
              { term: 'Distraction blocking', detail: 'Block distracting websites.' },
              {
                term: 'Productivity analytics',
                detail: 'A dashboard with charts and downloadable reports.',
              },
              { term: 'User accounts', detail: 'Account management for each user.' },
              { term: 'Admin panel', detail: 'Administration tools, including system logs.' },
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
                role: todo('What Laravel handled (e.g. routing, auth, business logic)'),
              },
              { id: 'mysql', role: todo('What MySQL stored') },
              { id: 'firebase', role: todo('What Firebase was used for in FocusPro') },
            ],
          },
        ],
      },
      {
        id: 'architecture',
        title: 'Implementation and architecture',
        content: todo(
          'A short description or diagram of how Laravel, MySQL and Firebase fit together',
        ),
      },
      {
        id: 'challenges',
        title: 'Challenges',
        content: [
          {
            type: 'definitions',
            items: [
              {
                term: 'Time-tracking accuracy',
                detail: 'Keeping recorded focus time accurate.',
              },
              {
                term: 'Blocking within browser limits',
                detail: 'Implementing website blocking within the limitations browsers impose.',
              },
              {
                term: 'Intuitive UX',
                detail: 'Designing an interface that feels intuitive to use.',
              },
            ],
          },
          todo('How you solved or worked around each challenge above'),
        ],
      },
      {
        id: 'lessons',
        title: 'Lessons learned',
        content: todo('Two to four things you learned building FocusPro'),
      },
      {
        id: 'screenshots',
        title: 'Screenshots',
        content: todo('Screenshots: task list, Pomodoro session, analytics dashboard, admin panel'),
      },
      {
        id: 'future',
        title: 'Future improvements',
        content: todo('What you would add or change next'),
      },
    ],
  },

  {
    slug: 'whats-cooking',
    title: 'What’s Cooking',
    tagline: 'Recipe recommendations from the ingredients you already have.',
    highlight: 'Generates recipes from your ingredients with Gemini 2.5 Flash',
    date: '2025-06',
    categories: ['full-stack', 'backend'],
    stack: ['nestjs', 'angular', 'gemini'],
    summary:
      'A full-stack recipe recommendation app: an Angular frontend sends your ingredients to a NestJS REST API, which uses Gemini 2.5 Flash to generate recipe suggestions.',
    selected: true,
    links: {
      repo: todo('What’s Cooking repository URL'),
      live: todo('What’s Cooking live demo URL (if any)'),
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
        content: todo('Screenshots: ingredient input and generated recipes'),
      },
    ],
  },

  {
    slug: 'aquaboost',
    title: 'AquaBoost',
    tagline: 'A daily hydration tracker: set a goal, log your water, see what’s left.',
    highlight: 'Automatically calculates your remaining daily target',
    date: '2026-05',
    categories: todo('Confirm AquaBoost’s platform (web or mobile) so it can be categorized'),
    stack: ['dotnet', 'firebase'],
    summary:
      'A hydration tracking app built with .NET and Firebase: set a daily water goal, log your intake and see how much is left for the day.',
    selected: true,
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
    selected: true,
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
    tagline: 'An anime search website powered by the Jikan API.',
    highlight: 'Live anime search with a detail page for every title',
    date: '2025-11',
    kind: 'Learning project',
    categories: ['frontend'],
    stack: ['react', 'jikan'],
    summary:
      'An anime search site built with React and the Jikan API, showing live titles, synopses, ratings, episode counts and images, with a dedicated detail page for each anime.',
    links: {
      repo: todo('YumeFind repository URL'),
      live: todo('YumeFind live demo URL (if any)'),
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          {
            type: 'text',
            paragraphs: [
              'YumeFind lets you search for anime and browse real-time data from the Jikan API. I built it as a learning project focused on API integration, state management and component-based architecture.',
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
              'Real-time data from the Jikan API',
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
                id: 'jikan',
                role: 'Real-time anime data: titles, synopses, ratings, episodes and images.',
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
    date: '2025-11',
    kind: 'Learning project',
    categories: ['frontend'],
    stack: ['react', 'cataas'],
    summary:
      'A swipe-style preference app built with React and the CATAAS API: dynamic cat images, like and dislike interactions and smooth swipe gestures.',
    links: {
      repo: todo('Paw & Preferences repository URL'),
      live: todo('Paw & Preferences live demo URL (if any)'),
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
