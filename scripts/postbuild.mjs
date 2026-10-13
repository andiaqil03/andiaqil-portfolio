// Static hosts (Netlify, Cloudflare Pages, GitHub Pages, Vercel) serve
// /404.html for unknown URLs. React Router prerenders the catch-all route at
// /404/index.html, so copy it into place.
import { copyFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const client = fileURLToPath(new URL('../build/client/', import.meta.url));
const source = `${client}404/index.html`;

try {
  await access(source);
  await copyFile(source, `${client}404.html`);
  console.log('postbuild: wrote build/client/404.html');
} catch {
  console.warn('postbuild: build/client/404/index.html not found; skipped 404.html');
}
