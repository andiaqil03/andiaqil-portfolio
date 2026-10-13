import { projects } from '~/content/projects';
import { resolved } from '~/content/placeholder';
import { site } from '~/content/site';

// Prerendered to /sitemap.xml at build time.
export function loader() {
  const origin = resolved(site.url);
  const paths = [
    '/',
    ...site.nav.map((item) => item.to),
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  const body = origin
    ? paths
        .map((path) => `  <url><loc>${origin}${path === '/' ? '/' : path}</loc></url>`)
        .join('\n')
    : '  <!-- Set `url` in app/content/site.ts to list this site’s pages. -->';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
