import type { Config } from '@react-router/dev/config';
import { projects } from './app/content/projects';

export default {
  // Static site: every route below is prerendered to HTML at build time.
  ssr: false,
  // Ship the full route manifest up front; static hosts have no /__manifest endpoint.
  routeDiscovery: { mode: 'initial' },
  async prerender({ getStaticPaths }) {
    return [
      ...getStaticPaths(),
      ...projects.map((project) => `/projects/${project.slug}`),
      // Rendered by the catch-all route; copied to 404.html by scripts/postbuild.mjs.
      '/404',
    ];
  },
} satisfies Config;
