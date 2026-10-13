// Renders the social preview image and touch icon from the HTML sources in
// this folder using a locally installed Edge or Chrome (headless).
// Usage: npm run og-image
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));

const browsers = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const browser = browsers.find((path) => existsSync(path));
if (!browser) {
  console.error('No Edge/Chrome found. Set BROWSER_PATH to a Chromium-based browser.');
  process.exit(1);
}

const jobs = [
  { source: 'og-image.html', output: 'og-image.png', size: '1200,630' },
  { source: 'touch-icon.html', output: 'apple-touch-icon.png', size: '180,180' },
];

for (const job of jobs) {
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--allow-file-access-from-files',
    '--virtual-time-budget=2000',
    `--window-size=${job.size}`,
    `--screenshot=${publicDir}${job.output}`,
    pathToFileURL(`${here}${job.source}`).href,
  ]);
  console.log(`wrote public/${job.output}`);
}
