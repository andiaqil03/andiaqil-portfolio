import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import './app.css';
import { Backdrop } from './components/fx/backdrop';
import { CommandPalette } from './components/fx/command-palette';
import { Intro } from './components/fx/intro';
import { ScrollProgress } from './components/fx/scroll-progress';
import { SmoothScroll } from './components/fx/smooth-scroll';
import { PageHeader } from './components/layout/page-header';
import { SiteFooter } from './components/layout/site-footer';
import { SiteHeader } from './components/layout/site-header';
import { ArrowLink } from './components/ui/action';
import { themeInitScript } from './hooks/use-theme';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f6f7fb" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2.5 focus:text-canvas"
        >
          Skip to content
        </a>
        <Intro />
        <Backdrop />
        <ScrollProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
        <CommandPalette />
        <SmoothScroll />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Outlet />
    </main>
  );
}

export function HydrateFallback() {
  return <main id="main" className="min-h-[60vh]" />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = 'Something went wrong';
  let detail = 'An unexpected error occurred while loading this page.';

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? 'Page not found' : `Error ${error.status}`;
    detail =
      error.status === 404
        ? 'The page you’re looking for doesn’t exist or has moved.'
        : error.statusText || detail;
  } else if (import.meta.env.DEV && error instanceof Error) {
    detail = error.message;
  }

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHeader title={title} lead={detail}>
        <ArrowLink to="/">Back to the home page</ArrowLink>
      </PageHeader>
    </main>
  );
}
