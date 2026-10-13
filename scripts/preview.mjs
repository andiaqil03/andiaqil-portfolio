// Serves the production build the way a static host would: files from
// build/client, `/path` → `/path/index.html`, unknown paths → 404.html.
// Usage: npm run build && npm run preview
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../build/client', import.meta.url));
const port = Number(process.env.PORT ?? 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.data': 'text/x-script; charset=utf-8',
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const candidates = [
    join(root, clean),
    join(root, clean, 'index.html'),
    join(root, `${clean}.html`),
  ];
  for (const candidate of candidates) {
    if (candidate.startsWith(root) && (await isFile(candidate))) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  const file = await resolve(pathname);
  const target = file ?? join(root, '404.html');
  res.writeHead(file ? 200 : 404, {
    'Content-Type': types[extname(target)] ?? 'application/octet-stream',
  });
  createReadStream(target).pipe(res);
}).listen(port, () => {
  console.log(`Previewing build/client at http://localhost:${port}`);
});
