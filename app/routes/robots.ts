import { resolved } from '~/content/placeholder';
import { site } from '~/content/site';

// Prerendered to /robots.txt at build time.
export function loader() {
  const origin = resolved(site.url);
  const lines = [
    'User-agent: *',
    'Allow: /',
    ...(origin ? ['', `Sitemap: ${origin}/sitemap.xml`] : []),
  ];

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
