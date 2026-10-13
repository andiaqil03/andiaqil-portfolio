// Lists every placeholder still waiting for real content.
// Usage: npm run check:content
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const contentDir = join(projectRoot, 'app', 'content');
const pattern = /todo\(\s*(['"`])((?:\\.|(?!\1).)*)\1\s*\)/g;

const files = (await readdir(contentDir)).filter(
  (file) => file.endsWith('.ts') && file !== 'placeholder.ts',
);
let total = 0;

for (const file of files) {
  const path = join(contentDir, file);
  const lines = (await readFile(path, 'utf8')).split(/\r?\n/);
  const found = [];
  lines.forEach((line, index) => {
    for (const match of line.matchAll(pattern))
      found.push(`  ${String(index + 1).padStart(4)}  ${match[2]}`);
  });
  if (found.length) {
    console.log(`\n${relative(projectRoot, path).replaceAll('\\', '/')}`);
    console.log(found.join('\n'));
    total += found.length;
  }
}

console.log(
  total
    ? `\n${total} placeholder(s) left. They are hidden in production builds.`
    : '\nNo placeholders left.',
);
