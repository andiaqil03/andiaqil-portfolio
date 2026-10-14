// Generates public/topo.svg: topographic contour lines traced (marching
// squares) over a deterministic noise field. Used as a CSS mask so the lines
// can be tinted with any theme colour. Re-run: node scripts/generate-topo.mjs
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const WIDTH = 1600;
const HEIGHT = 1000;
const STEP = 8; // grid resolution in px
const LEVELS = 14;

/* Deterministic value noise + fbm ---------------------------------- */
function hash(x, y) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
const smooth = (t) => t * t * (3 - 2 * t);
function noise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 5; i++) {
    sum += amp * noise(x * freq + 17.3, y * freq + 4.1);
    freq *= 2;
    amp *= 0.5;
  }
  return sum;
}

/* Field ------------------------------------------------------------ */
const cols = Math.ceil(WIDTH / STEP) + 1;
const rows = Math.ceil(HEIGHT / STEP) + 1;
const field = new Float32Array(cols * rows);
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    field[j * cols + i] = fbm((i * STEP) / 340, (j * STEP) / 340);
  }
}
const at = (i, j) => field[j * cols + i];

/* Marching squares -------------------------------------------------- */
function interp(p1, p2, v1, v2, level) {
  const t = (level - v1) / (v2 - v1);
  return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t];
}

function segmentsFor(level) {
  const segments = [];
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const tl = at(i, j);
      const tr = at(i + 1, j);
      const br = at(i + 1, j + 1);
      const bl = at(i, j + 1);
      const index =
        (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
      if (index === 0 || index === 15) continue;
      const x = i * STEP;
      const y = j * STEP;
      const top = interp([x, y], [x + STEP, y], tl, tr, level);
      const right = interp([x + STEP, y], [x + STEP, y + STEP], tr, br, level);
      const bottom = interp([x, y + STEP], [x + STEP, y + STEP], bl, br, level);
      const left = interp([x, y], [x, y + STEP], tl, bl, level);
      const table = {
        1: [[left, bottom]],
        2: [[bottom, right]],
        3: [[left, right]],
        4: [[top, right]],
        5: [
          [left, top],
          [bottom, right],
        ],
        6: [[top, bottom]],
        7: [[left, top]],
        8: [[left, top]],
        9: [[top, bottom]],
        10: [
          [left, bottom],
          [top, right],
        ],
        11: [[top, right]],
        12: [[left, right]],
        13: [[bottom, right]],
        14: [[left, bottom]],
      };
      for (const segment of table[index]) segments.push(segment);
    }
  }
  return segments;
}

/* Chain segments into polylines ------------------------------------- */
const key = (p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;
function chain(segments) {
  const byEnd = new Map();
  segments.forEach((segment, index) => {
    for (const end of segment) {
      const k = key(end);
      if (!byEnd.has(k)) byEnd.set(k, []);
      byEnd.get(k).push(index);
    }
  });
  const used = new Uint8Array(segments.length);
  const lines = [];
  for (let s = 0; s < segments.length; s++) {
    if (used[s]) continue;
    used[s] = 1;
    const line = [...segments[s]];
    for (const forward of [true, false]) {
      for (;;) {
        const tip = forward ? line[line.length - 1] : line[0];
        const next = (byEnd.get(key(tip)) ?? []).find((n) => !used[n]);
        if (next === undefined) break;
        used[next] = 1;
        const [a, b] = segments[next];
        const point = key(a) === key(tip) ? b : a;
        if (forward) line.push(point);
        else line.unshift(point);
      }
    }
    if (line.length > 3) lines.push(line);
  }
  return lines;
}

/* Ramer–Douglas–Peucker simplification ------------------------------ */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  let maxDistance = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const distance =
      Math.abs((by - ay) * px - (bx - ax) * py + bx * ay - by * ax) /
      (Math.hypot(by - ay, bx - ax) || 1);
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }
  if (maxDistance <= tolerance) return [points[0], points[points.length - 1]];
  return [
    ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(index), tolerance),
  ];
}

/* Write SVG --------------------------------------------------------- */
let min = Infinity;
let max = -Infinity;
for (const value of field) {
  min = Math.min(min, value);
  max = Math.max(max, value);
}
const paths = [];
for (let l = 1; l <= LEVELS; l++) {
  const level = min + ((max - min) * l) / (LEVELS + 1);
  const index = l % 5 === 0; // every fifth line is an index contour
  const d = chain(segmentsFor(level))
    .map((line) => simplify(line, 0.6))
    .map((line) => 'M' + line.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L'))
    .join('');
  paths.push(`<path d="${d}" stroke-width="${index ? 1.6 : 0.9}"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">${paths.join('')}</svg>\n`;
const out = fileURLToPath(new URL('../public/topo.svg', import.meta.url));
await writeFile(out, svg);
console.log(`wrote public/topo.svg (${(svg.length / 1024).toFixed(0)} KB)`);
