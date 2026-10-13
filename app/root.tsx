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
        <meta name="theme-color" content="#f5f6f3" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0d0f0d" media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:text-canvas"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
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
