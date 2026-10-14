/*
 * The hero's "Trail Map": a 3D topographic mountain drawn with contour lines
 * (plus a small alpine lake), with a dashed trail that draws itself up to a
 * summit flag. Waypoints along the trail are Andi's real milestones.
 * Loaded lazily (its own chunk) after the page is interactive.
 */
import {
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

export interface TrailWaypoint {
  label: string;
  /** Position along the trail, 0 (trailhead) to 1 (summit). */
  t: number;
  summit?: boolean;
}

export interface TrailSceneOptions {
  waypoints: TrailWaypoint[];
  reducedMotion: boolean;
  onReady: () => void;
}

/* ------------------------------------------------------------------ */
/* Terrain                                                             */
/* ------------------------------------------------------------------ */

const SIZE = 7;

function hash(x: number, y: number) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
const smooth = (t: number) => t * t * (3 - 2 * t);
function noise(x: number, y: number) {
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
function fbm(x: number, y: number) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 5; i++) {
    sum += amp * noise(x * freq, y * freq);
    freq *= 2;
    amp *= 0.5;
  }
  return sum;
}

/** Elevation at (x, z): one main peak, two ridges, a lake basin, natural noise. */
function elevation(x: number, z: number) {
  const peak = 2.05 * Math.exp(-((x - 0.4) ** 2 / 1.1 + (z + 0.7) ** 2 / 1.3));
  const ridgeLeft = 0.95 * Math.exp(-((x + 1.6) ** 2 / 1.6 + (z + 0.4) ** 2 / 0.7));
  const ridgeRight = 0.8 * Math.exp(-((x - 2.0) ** 2 / 0.9 + (z - 0.6) ** 2 / 1.4));
  const texture = (fbm(x * 0.7 + 3, z * 0.7 + 1) - 0.5) * 0.55;
  const lake = 0.55 * Math.exp(-((x - 1.55) ** 2 / 0.5 + (z - 2.0) ** 2 / 0.35));
  return Math.max(0, peak + ridgeLeft + ridgeRight + texture + 0.15 - lake);
}

const terrainVertex = /* glsl */ `
  varying float vHeight;
  varying vec2 vPlane;
  varying vec3 vNormal;
  void main() {
    vHeight = position.y;
    vPlane = position.xz;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const terrainFragment = /* glsl */ `
  uniform vec3 uFillLow;
  uniform vec3 uFillHigh;
  uniform vec3 uLine;
  uniform vec3 uIndex;
  uniform vec3 uWater;
  uniform vec3 uSweep;
  uniform float uSweepHeight;
  uniform float uHalfSize;
  varying float vHeight;
  varying vec2 vPlane;
  varying vec3 vNormal;

  float contour(float value, float width) {
    float d = abs(fract(value - 0.5) - 0.5);
    return 1.0 - smoothstep(0.0, fwidth(value) * width, d);
  }

  void main() {
    float h = vHeight;
    float minor = contour(h / 0.09, 1.1);
    float major = contour(h / 0.45, 1.5);
    float water = 1.0 - smoothstep(0.03, 0.07, h);

    vec3 base = mix(uFillLow, uFillHigh, smoothstep(0.0, 2.2, h));
    float light = clamp(dot(normalize(vNormal), normalize(vec3(-0.6, 1.0, 0.5))), 0.0, 1.0);
    base *= mix(0.9, 1.04, light);
    base = mix(base, uWater, water);

    vec3 color = base;
    color = mix(color, uLine, minor * 0.5 * (1.0 - water));
    color = mix(color, uIndex, major * 0.9 * (1.0 - water));

    // A slow band of light climbs the contours, like sunrise moving up a slope.
    float sweep = exp(-pow((h - uSweepHeight) * 5.0, 2.0));
    color = mix(color, uSweep, (minor + major) * sweep * 0.85 * (1.0 - water));

    float r = length(vPlane) / uHalfSize;
    float alpha = 1.0 - smoothstep(0.6, 0.97, r);
    gl_FragColor = vec4(color, alpha);
  }
`;

const trailVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const trailFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uProgress;
  varying vec2 vUv;
  void main() {
    if (vUv.x > uProgress) discard;
    if (fract(vUv.x * 70.0) > 0.58) discard;
    gl_FragColor = vec4(uColor, 1.0);
  }
`;

/* ------------------------------------------------------------------ */

const PALETTES = {
  light: {
    fillLow: '#eaf2ec',
    fillHigh: '#f6f4ee',
    line: '#2d6a4f',
    index: '#1f4d38',
    water: '#cfe5f0',
    sweep: '#e07b39',
    trail: '#e07b39',
    pin: '#2d6a4f',
  },
  dark: {
    fillLow: '#12201a',
    fillHigh: '#1c2822',
    line: '#7cc39a',
    index: '#a7dcbc',
    water: '#163240',
    sweep: '#f0a35e',
    trail: '#f0a35e',
    pin: '#7cc39a',
  },
};

export function createTrailScene(
  container: HTMLElement,
  labelLayer: HTMLElement,
  options: TrailSceneOptions,
): () => void {
  const isDark = () => document.documentElement.dataset.theme === 'dark';
  let width = container.clientWidth || 600;
  let height = container.clientHeight || 600;
  const small = width < 520;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(36, width / height, 0.1, 100);
  const target = new Vector3(-0.2, 0.8, 0.35);
  const world = new Group();
  scene.add(world);

  /* Terrain */
  const segments = small ? 120 : 190;
  const terrainGeometry = new PlaneGeometry(SIZE, SIZE, segments, segments);
  terrainGeometry.rotateX(-Math.PI / 2);
  const position = terrainGeometry.attributes.position!;
  for (let i = 0; i < position.count; i++) {
    position.setY(i, elevation(position.getX(i), position.getZ(i)));
  }
  terrainGeometry.computeVertexNormals();

  const terrainMaterial = new ShaderMaterial({
    vertexShader: terrainVertex,
    fragmentShader: terrainFragment,
    transparent: true,
    depthWrite: true,
    uniforms: {
      uFillLow: { value: new Color() },
      uFillHigh: { value: new Color() },
      uLine: { value: new Color() },
      uIndex: { value: new Color() },
      uWater: { value: new Color() },
      uSweep: { value: new Color() },
      uSweepHeight: { value: -1 },
      uHalfSize: { value: SIZE / 2 },
    },
  });
  world.add(new Mesh(terrainGeometry, terrainMaterial));

  /* Trail */
  const route: Array<[number, number]> = [
    [-2.4, 2.25],
    [-1.75, 1.95],
    [-1.95, 1.25],
    [-1.15, 1.05],
    [-0.75, 0.45],
    [-0.1, 0.6],
    [0.2, 0.0],
    [0.55, -0.25],
    [0.4, -0.7],
  ];
  const curve = new CatmullRomCurve3(
    route.map(([x, z]) => new Vector3(x, elevation(x, z) + 0.035, z)),
    false,
    'centripetal',
  );
  const trailMaterial = new ShaderMaterial({
    vertexShader: trailVertex,
    fragmentShader: trailFragment,
    uniforms: {
      uColor: { value: new Color() },
      uProgress: { value: options.reducedMotion ? 1 : 0 },
    },
  });
  const trailGeometry = new TubeGeometry(curve, 420, 0.022, 8, false);
  world.add(new Mesh(trailGeometry, trailMaterial));

  /* Waypoint pins and the summit flag */
  const pinMaterial = new MeshBasicMaterial();
  const flagMaterial = new MeshBasicMaterial({ side: DoubleSide });
  const headGeometry = new SphereGeometry(0.055, 16, 16);
  const stickGeometry = new CylinderGeometry(0.007, 0.007, 0.34, 6);
  stickGeometry.translate(0, 0.17, 0);
  const flagGeometry = new PlaneGeometry(0.26, 0.15);
  flagGeometry.translate(0.13, 0, 0);

  let flag: Mesh | null = null;
  const anchors = options.waypoints.map((waypoint) => {
    const point = curve.getPointAt(Math.min(1, waypoint.t));
    const stick = new Mesh(stickGeometry, pinMaterial);
    stick.position.copy(point);
    world.add(stick);
    if (waypoint.summit) {
      stick.scale.set(1, 1.6, 1);
      flag = new Mesh(flagGeometry, flagMaterial);
      flag.position.set(point.x, point.y + 0.47, point.z);
      world.add(flag);
    } else {
      const head = new Mesh(headGeometry, pinMaterial);
      head.position.copy(point);
      world.add(head);
    }
    return point.clone().add(new Vector3(0, waypoint.summit ? 0.6 : 0.38, 0));
  });

  /* Hiker: a dot that walks the trail once it's drawn */
  const hikerMaterial = new MeshBasicMaterial();
  const hiker = new Mesh(new SphereGeometry(0.05, 16, 16), hikerMaterial);
  hiker.visible = false;
  world.add(hiker);

  /* Labels (HTML, projected each frame) */
  const labels = options.waypoints.map((waypoint) => {
    const element = document.createElement('span');
    element.textContent = waypoint.label;
    element.className = waypoint.summit
      ? 'absolute left-0 top-0 rounded-full border border-trail/40 bg-accent-3-soft px-3 py-1 font-mono text-meta font-semibold text-accent-3 whitespace-nowrap shadow-sm will-change-transform'
      : 'surface-card absolute left-0 top-0 rounded-full px-2.5 py-1 font-mono text-meta font-medium text-ink-2 whitespace-nowrap will-change-transform';
    element.style.opacity = '0';
    labelLayer.appendChild(element);
    return element;
  });
  const projected = new Vector3();
  // Half-widths of the labels, measured once (and on resize) so they can be
  // kept inside the canvas on narrow screens without a per-frame layout read.
  let halfWidths: number[] = [];
  const measureLabels = () => {
    halfWidths = labels.map((element) => element.offsetWidth / 2);
  };

  /* Theme */
  function applyTheme() {
    const p = isDark() ? PALETTES.dark : PALETTES.light;
    const u = terrainMaterial.uniforms;
    u.uFillLow!.value.set(p.fillLow);
    u.uFillHigh!.value.set(p.fillHigh);
    u.uLine!.value.set(p.line);
    u.uIndex!.value.set(p.index);
    u.uWater!.value.set(p.water);
    u.uSweep!.value.set(p.sweep);
    trailMaterial.uniforms.uColor!.value.set(p.trail);
    pinMaterial.color.set(p.pin);
    flagMaterial.color.set(p.trail);
    hikerMaterial.color.set(p.trail);
  }
  applyTheme();

  /* Camera, interaction, sizing */
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  function placeCamera(time: number) {
    const drift = options.reducedMotion ? 0 : Math.sin(time * 0.06) * 0.22;
    const angle = -0.1 + drift + eased.x * 0.24;
    const radius = small ? 9.4 : 8.4;
    camera.position.set(Math.sin(angle) * radius, 4.5 + eased.y * -0.5, Math.cos(angle) * radius);
    camera.lookAt(target);
  }

  function render(time: number) {
    placeCamera(time);
    renderer.render(scene, camera);
    const progress = trailMaterial.uniforms.uProgress!.value as number;
    anchors.forEach((anchor, i) => {
      const element = labels[i];
      if (!element) return;
      projected.copy(anchor).project(camera);
      const half = halfWidths[i] ?? 0;
      const x = Math.min(Math.max((projected.x * 0.5 + 0.5) * width, half + 8), width - half - 8);
      const y = (-projected.y * 0.5 + 0.5) * height;
      const reached = progress >= (options.waypoints[i]?.t ?? 1) - 0.01;
      element.style.opacity = reached ? '1' : '0';
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -120%) scale(${reached ? 1 : 0.85})`;
      element.style.transition = 'opacity 500ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)';
    });
  }

  const themeObserver = new MutationObserver(() => {
    applyTheme();
    render(performance.now() / 1000);
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  const resizeObserver = new ResizeObserver(() => {
    width = container.clientWidth || width;
    height = container.clientHeight || height;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    measureLabels();
    render(performance.now() / 1000);
  });
  resizeObserver.observe(container);

  /* Loop */
  let frame = 0;
  let visible = true;
  let running = false;
  const start = performance.now();

  function loop(now: number) {
    const time = (now - start) / 1000;
    eased.x += (pointer.x - eased.x) * 0.04;
    eased.y += (pointer.y - eased.y) * 0.04;

    // Draw the trail (ease-out over ~3.5s, after a short pause), then walk it.
    const drawT = Math.min(1, Math.max(0, (time - 0.6) / 3.5));
    const progress = 1 - Math.pow(1 - drawT, 3);
    trailMaterial.uniforms.uProgress!.value = progress;
    if (progress >= 1) {
      hiker.visible = true;
      const walk = ((time - 4.1) / 11) % 1;
      hiker.position.copy(curve.getPointAt(Math.max(0, walk))).add(new Vector3(0, 0.03, 0));
    }

    terrainMaterial.uniforms.uSweepHeight!.value = ((time * 0.32) % 3.2) - 0.4;
    if (flag) flag.rotation.y = Math.sin(time * 2.2) * 0.25;

    render(time);
    frame = requestAnimationFrame(loop);
  }

  function play() {
    if (running || options.reducedMotion || !visible || document.hidden) return;
    running = true;
    frame = requestAnimationFrame(loop);
  }
  function pause() {
    running = false;
    cancelAnimationFrame(frame);
  }

  const intersection = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) play();
    else pause();
  });
  intersection.observe(container);
  const onVisibility = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVisibility);

  measureLabels();
  void document.fonts?.ready.then(measureLabels);
  render(0);
  options.onReady();
  play();

  return () => {
    pause();
    intersection.disconnect();
    resizeObserver.disconnect();
    themeObserver.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibility);
    labels.forEach((element) => element.remove());
    [
      terrainGeometry,
      trailGeometry,
      headGeometry,
      stickGeometry,
      flagGeometry,
      hiker.geometry,
    ].forEach((g) => g.dispose());
    [terrainMaterial, trailMaterial, pinMaterial, flagMaterial, hikerMaterial].forEach((m) =>
      m.dispose(),
    );
    renderer.dispose();
    renderer.domElement.remove();
  };
}
