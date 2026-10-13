/*
 * The hero's "Living System": a slowly turning network of service nodes on a
 * sphere, with packets of light (requests) travelling along the connections.
 * Labelled hubs name real parts of Andi's stack. Loaded lazily (its own chunk)
 * after the page is interactive.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

export interface LivingSystemOptions {
  labels: string[];
  reducedMotion: boolean;
  onReady: () => void;
}

const STOPS = [new Color('#6366f1'), new Color('#0ea5e9'), new Color('#10b981')];
const SPARK = [
  new Color('#6366f1'),
  new Color('#d946ef'),
  new Color('#0ea5e9'),
  new Color('#10b981'),
];

function gradientAt(t: number): Color {
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(scaled));
  return STOPS[i]!.clone().lerp(STOPS[i + 1]!, scaled - i);
}

const pointVertex = /* glsl */ `
  attribute float size;
  attribute vec3 color;
  attribute float alpha;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = size * uPixelRatio * (6.0 / -mv.z);
    float facing = smoothstep(-8.2, -4.4, mv.z);
    vAlpha = alpha * mix(0.22, 1.0, facing);
    vColor = color;
  }
`;

const pointFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 1.5) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const coreFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uStrength;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
    vec3 color = mix(uColorA, uColorB, vNormal.y * 0.5 + 0.5);
    gl_FragColor = vec4(color, fresnel * uStrength);
  }
`;

export function createLivingSystem(
  container: HTMLElement,
  labelLayer: HTMLElement,
  options: LivingSystemOptions,
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
  const camera = new PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  const world = new Group();
  world.rotation.set(0.35, 0, 0.12);
  scene.add(world);
  const system = new Group();
  world.add(system);

  /* ---------------------------------------------------------------- */
  /* Nodes on a Fibonacci sphere                                       */
  /* ---------------------------------------------------------------- */

  const R = 1.75;
  const count = small ? 120 : 200;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    nodes.push(
      new Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(
        R * (0.95 + Math.random() * 0.1),
      ),
    );
  }

  // Hubs: evenly spread nodes that carry the stack labels.
  const hubIndices = options.labels.map((_, i) =>
    Math.floor(((i + 0.5) / options.labels.length) * count),
  );
  const hubSet = new Set(hubIndices);

  // Edges: connect each node to its three nearest neighbours.
  const adjacency: number[][] = nodes.map(() => []);
  const edgeKeys = new Set<string>();
  const edges: Array<[number, number]> = [];
  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((other, j) => ({ j, d: i === j ? Infinity : node.distanceToSquared(other) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeKeys.has(key)) continue;
      edgeKeys.add(key);
      edges.push([i, j]);
      adjacency[i]!.push(j);
      adjacency[j]!.push(i);
    }
  });

  /* Lines */
  const linePositions = new Float32Array(edges.length * 6);
  const lineColors = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], e) => {
    const pa = nodes[a]!;
    const pb = nodes[b]!;
    linePositions.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], e * 6);
    const ca = gradientAt((pa.y / R + 1) / 2);
    const cb = gradientAt((pb.y / R + 1) / 2);
    lineColors.set([ca.r, ca.g, ca.b, cb.r, cb.g, cb.b], e * 6);
  });
  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new BufferAttribute(lineColors, 3));
  const lineMaterial = new LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    depthWrite: false,
  });
  system.add(new LineSegments(lineGeometry, lineMaterial));

  /* Node points */
  const pointMaterial = new ShaderMaterial({
    vertexShader: pointVertex,
    fragmentShader: pointFragment,
    uniforms: { uPixelRatio: { value: pixelRatio } },
    transparent: true,
    depthWrite: false,
    blending: NormalBlending,
  });

  const nodePositions = new Float32Array(count * 3);
  const nodeColors = new Float32Array(count * 3);
  const nodeSizes = new Float32Array(count);
  const nodeAlpha = new Float32Array(count);
  nodes.forEach((node, i) => {
    nodePositions.set([node.x, node.y, node.z], i * 3);
    const color = gradientAt((node.y / R + 1) / 2);
    nodeColors.set([color.r, color.g, color.b], i * 3);
    nodeSizes[i] = hubSet.has(i) ? 26 : 9 + Math.random() * 5;
    nodeAlpha[i] = hubSet.has(i) ? 1 : 0.85;
  });
  const nodeGeometry = new BufferGeometry();
  nodeGeometry.setAttribute('position', new BufferAttribute(nodePositions, 3));
  nodeGeometry.setAttribute('color', new BufferAttribute(nodeColors, 3));
  nodeGeometry.setAttribute('size', new BufferAttribute(nodeSizes, 1));
  nodeGeometry.setAttribute('alpha', new BufferAttribute(nodeAlpha, 1));
  system.add(new Points(nodeGeometry, pointMaterial));

  /* Fresnel core: a soft rim of light around the network */
  const coreMaterial = new ShaderMaterial({
    vertexShader: coreVertex,
    fragmentShader: coreFragment,
    uniforms: {
      uColorA: { value: new Color('#10b981') },
      uColorB: { value: new Color('#6366f1') },
      uStrength: { value: 0.35 },
    },
    transparent: true,
    depthWrite: false,
  });
  const coreGeometry = new SphereGeometry(R * 0.93, 48, 48);
  system.add(new Mesh(coreGeometry, coreMaterial));

  /* ---------------------------------------------------------------- */
  /* Packets: requests travelling node to node, each with a short trail */
  /* ---------------------------------------------------------------- */

  const packetCount = small ? 18 : 34;
  const TRAIL = 4;
  const packets = Array.from({ length: packetCount }, (_, i) => {
    const from = hubIndices[i % hubIndices.length] ?? 0;
    const neighbours = adjacency[from] ?? [];
    return {
      from,
      to: neighbours[Math.floor(Math.random() * neighbours.length)] ?? 0,
      t: Math.random(),
      speed: 0.55 + Math.random() * 0.7,
      color: SPARK[i % SPARK.length]!,
    };
  });
  const packetPositions = new Float32Array(packetCount * TRAIL * 3);
  const packetColors = new Float32Array(packetCount * TRAIL * 3);
  const packetSizes = new Float32Array(packetCount * TRAIL);
  const packetAlpha = new Float32Array(packetCount * TRAIL);
  packets.forEach((packet, p) => {
    for (let k = 0; k < TRAIL; k++) {
      const index = p * TRAIL + k;
      packetColors.set([packet.color.r, packet.color.g, packet.color.b], index * 3);
      packetSizes[index] = k === 0 ? 22 : 16 - k * 3;
      packetAlpha[index] = k === 0 ? 1 : 0.55 - k * 0.12;
    }
  });
  const packetGeometry = new BufferGeometry();
  packetGeometry.setAttribute('position', new BufferAttribute(packetPositions, 3));
  packetGeometry.setAttribute('color', new BufferAttribute(packetColors, 3));
  packetGeometry.setAttribute('size', new BufferAttribute(packetSizes, 1));
  packetGeometry.setAttribute('alpha', new BufferAttribute(packetAlpha, 1));
  const packetMaterial = pointMaterial.clone();
  packetMaterial.uniforms.uPixelRatio = { value: pixelRatio };
  system.add(new Points(packetGeometry, packetMaterial));

  const scratch = new Vector3();
  function packetPoint(from: number, to: number, t: number, out: Vector3) {
    const a = nodes[from]!;
    const b = nodes[to]!;
    out.copy(a).lerp(b, t);
    // Bow outward slightly so packets arc over the surface.
    const lift = 1 + Math.sin(Math.PI * Math.min(1, Math.max(0, t))) * 0.06;
    return out.multiplyScalar(lift);
  }

  function updatePackets(dt: number) {
    packets.forEach((packet, p) => {
      packet.t += packet.speed * dt;
      if (packet.t >= 1) {
        packet.t -= 1;
        const neighbours = adjacency[packet.to] ?? [];
        const next = neighbours.filter((n) => n !== packet.from);
        packet.from = packet.to;
        packet.to =
          (next.length ? next : neighbours)[
            Math.floor(Math.random() * (next.length || neighbours.length))
          ] ?? packet.from;
      }
      for (let k = 0; k < TRAIL; k++) {
        const t = packet.t - k * 0.07;
        const point =
          t >= 0
            ? packetPoint(packet.from, packet.to, t, scratch)
            : packetPoint(packet.from, packet.to, 0, scratch);
        packetPositions.set([point.x, point.y, point.z], (p * TRAIL + k) * 3);
      }
    });
    packetGeometry.attributes.position!.needsUpdate = true;
  }
  updatePackets(0);

  /* ---------------------------------------------------------------- */
  /* Orbits                                                            */
  /* ---------------------------------------------------------------- */

  const orbits: Array<{
    ring: LineLoop;
    satellite: Points;
    radius: number;
    speed: number;
    angle: number;
  }> = [];
  [
    { radius: 2.3, tilt: [1.0, 0.45, 0.2], speed: 0.18, color: '#6366f1' },
    { radius: 2.6, tilt: [0.7, -0.6, -0.35], speed: -0.12, color: '#10b981' },
  ].forEach(({ radius, tilt, speed, color }) => {
    const segments = 160;
    const positions = new Float32Array(segments * 3);
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      positions.set([Math.cos(a) * radius, Math.sin(a) * radius, 0], i * 3);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const material = new LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const ring = new LineLoop(geometry, material);
    ring.rotation.set(tilt[0]!, tilt[1]!, tilt[2]!);

    const satGeometry = new BufferGeometry();
    const c = new Color(color);
    satGeometry.setAttribute('position', new BufferAttribute(new Float32Array([radius, 0, 0]), 3));
    satGeometry.setAttribute('color', new BufferAttribute(new Float32Array([c.r, c.g, c.b]), 3));
    satGeometry.setAttribute('size', new BufferAttribute(new Float32Array([28]), 1));
    satGeometry.setAttribute('alpha', new BufferAttribute(new Float32Array([1]), 1));
    const satellite = new Points(satGeometry, pointMaterial);
    ring.add(satellite);
    world.add(ring);
    orbits.push({ ring, satellite, radius, speed, angle: Math.random() * Math.PI * 2 });
  });

  /* ---------------------------------------------------------------- */
  /* Labels (HTML, projected from hub positions each frame)            */
  /* ---------------------------------------------------------------- */

  const labelElements = options.labels.map((text) => {
    const element = document.createElement('span');
    element.textContent = text;
    element.className =
      'glass absolute left-0 top-0 rounded-full px-2.5 py-1 font-mono text-meta font-medium text-ink-2 whitespace-nowrap will-change-transform';
    element.style.opacity = '0';
    labelLayer.appendChild(element);
    return element;
  });
  const projected = new Vector3();

  function updateLabels() {
    hubIndices.forEach((nodeIndex, i) => {
      const element = labelElements[i];
      if (!element) return;
      projected.copy(nodes[nodeIndex]!);
      system.localToWorld(projected);
      const depth = projected.z; // > 0 faces the camera
      projected.project(camera);
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      const visible = Math.min(1, Math.max(0, (depth + 0.2) / 1.1));
      element.style.opacity = visible.toFixed(3);
      element.style.transform = `translate3d(${x + 12}px, ${y - 12}px, 0) scale(${0.85 + visible * 0.15})`;
    });
  }

  /* ---------------------------------------------------------------- */
  /* Theme, interaction, sizing, loop                                  */
  /* ---------------------------------------------------------------- */

  function applyTheme() {
    const dark = isDark();
    lineMaterial.opacity = dark ? 0.32 : 0.42;
    coreMaterial.uniforms.uStrength!.value = dark ? 0.55 : 0.32;
    pointMaterial.blending = dark ? AdditiveBlending : NormalBlending;
    packetMaterial.blending = dark ? AdditiveBlending : NormalBlending;
    pointMaterial.needsUpdate = true;
    packetMaterial.needsUpdate = true;
  }
  applyTheme();
  const themeObserver = new MutationObserver(() => {
    applyTheme();
    if (options.reducedMotion) render();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const resizeObserver = new ResizeObserver(() => {
    width = container.clientWidth || width;
    height = container.clientHeight || height;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (options.reducedMotion) render();
  });
  resizeObserver.observe(container);

  function render() {
    renderer.render(scene, camera);
    updateLabels();
  }

  let frame = 0;
  let last = performance.now();
  let visible = true;
  let running = false;

  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    system.rotation.y += dt * 0.12;
    tilt.x += (pointer.y * 0.25 - tilt.x) * 0.04;
    tilt.y += (pointer.x * 0.35 - tilt.y) * 0.04;
    world.rotation.x = 0.35 + tilt.x;
    world.rotation.y = tilt.y;
    orbits.forEach((orbit) => {
      orbit.angle += dt * orbit.speed * 2;
      const position = orbit.satellite.geometry.attributes.position!;
      position.setXYZ(
        0,
        Math.cos(orbit.angle) * orbit.radius,
        Math.sin(orbit.angle) * orbit.radius,
        0,
      );
      position.needsUpdate = true;
    });
    updatePackets(dt);
    render();
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (running || options.reducedMotion || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  const intersection = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) start();
    else stop();
  });
  intersection.observe(container);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVisibility);

  render();
  options.onReady();
  start();

  return () => {
    stop();
    intersection.disconnect();
    resizeObserver.disconnect();
    themeObserver.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibility);
    labelElements.forEach((element) => element.remove());
    scene.traverse((object) => {
      const disposable = object as { geometry?: BufferGeometry };
      disposable.geometry?.dispose();
    });
    [lineMaterial, pointMaterial, packetMaterial, coreMaterial].forEach((material) =>
      material.dispose(),
    );
    orbits.forEach((orbit) => (orbit.ring.material as LineBasicMaterial).dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
