import { useId, type ComponentType, type ReactNode } from 'react';

/*
 * Schematic illustrations of each project's mechanism, drawn in the design
 * tokens so they follow light and dark themes. They stand in for screenshots
 * and never show invented data. The only figures are real ones from the
 * project (e.g. 27,901 records, 83.66% accuracy). Set `cover` on a project to
 * replace its illustration with a real screenshot.
 */

interface IllustrationProps {
  className?: string;
  label: string;
}

function Frame({ label, className, children }: IllustrationProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

/** App window with a title bar. */
function Window({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <path d={`M${x} ${y + 36}h${w}`} className="stroke-line" strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 20 + i * 14} cy={y + 18} r="4" className="fill-line-strong" />
      ))}
    </g>
  );
}

function Bar({
  x,
  y,
  w,
  h = 8,
  className = 'fill-line-strong',
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  className?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={className} />;
}

/** A marker id unique to this SVG instance (several illustrations share a page). */
function useMarkerId() {
  return `arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

function Arrow({ d, marker }: { d: string; marker: string }) {
  return (
    <path
      d={d}
      fill="none"
      className="stroke-ink-3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={`url(#${marker})`}
    />
  );
}

function ArrowMarker({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path
          d="M1 1 9 5 1 9"
          fill="none"
          className="stroke-ink-3"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

/* ------------------------------------------------------------------ */

function FocusPro(props: IllustrationProps) {
  const rows = [
    { y: 128, w: 150, dot: 'fill-accent-2', done: true },
    { y: 166, w: 118, dot: 'fill-accent', done: false },
    { y: 204, w: 168, dot: 'fill-line-strong', done: false },
    { y: 242, w: 96, dot: 'fill-accent-2', done: false },
  ];
  const bars = [18, 26, 14, 30, 22, 34, 16];
  const circumference = 2 * Math.PI * 58;

  return (
    <Frame {...props}>
      <Window x={48} y={44} w={544} h={312} />
      <Bar x={276} y={57} w={88} h={8} className="fill-surface-2" />

      {/* Focus timer */}
      <rect x="72" y="100" width="200" height="232" rx="12" className="fill-surface-2" />
      <circle
        cx="172"
        cy="196"
        r="58"
        fill="none"
        className="stroke-line-strong"
        strokeWidth="10"
      />
      <circle
        cx="172"
        cy="196"
        r="58"
        fill="none"
        className="stroke-accent"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${circumference * 0.7} ${circumference}`}
        transform="rotate(-90 172 196)"
      />
      <Bar x={140} y={188} w={64} h={12} className="fill-ink" />
      <Bar x={152} y={208} w={40} h={6} />
      <rect x="112" y="284" width="120" height="30" rx="8" className="fill-accent" />
      <Bar x={146} y={296} w={52} h={6} className="fill-on-accent" />

      {/* Task list */}
      <Bar x={296} y={104} w={96} h={10} className="fill-ink/80" />
      {rows.map((row) => (
        <g key={row.y}>
          <rect
            x="296"
            y={row.y}
            width="272"
            height="30"
            rx="8"
            className="fill-surface stroke-line"
            strokeWidth="1.5"
          />
          <rect
            x="308"
            y={row.y + 8}
            width="14"
            height="14"
            rx="4"
            className={row.done ? 'fill-accent' : 'fill-surface stroke-line-strong'}
            strokeWidth="1.5"
          />
          {row.done ? (
            <path
              d={`M311 ${row.y + 15} l3 3 6-6`}
              fill="none"
              className="stroke-on-accent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <Bar
            x={334}
            y={row.y + 12}
            w={row.w}
            h={6}
            className={row.done ? 'fill-line' : 'fill-line-strong'}
          />
          <circle cx="552" cy={row.y + 15} r="4" className={row.dot} />
        </g>
      ))}

      {/* Weekly analytics */}
      <rect x="296" y="284" width="272" height="48" rx="8" className="fill-surface-2" />
      {bars.map((height, i) => (
        <rect
          key={i}
          x={316 + i * 36}
          y={324 - height}
          width="20"
          height={height}
          rx="3"
          className={i === 5 ? 'fill-accent' : 'fill-accent/30'}
        />
      ))}
    </Frame>
  );
}

function WhatsCooking(props: IllustrationProps) {
  const marker = useMarkerId();
  const chips = [
    { x: 52, y: 156, w: 64 },
    { x: 122, y: 156, w: 54 },
    { x: 52, y: 188, w: 80 },
    { x: 138, y: 188, w: 40 },
  ];
  return (
    <Frame {...props}>
      <ArrowMarker id={marker} />
      {/* Ingredients (Angular) */}
      <rect
        x="32"
        y="92"
        width="164"
        height="216"
        rx="14"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <Bar x={52} y={112} w={84} h={9} className="fill-ink/80" />
      <rect x="52" y="130" width="124" height="16" rx="6" className="fill-surface-2" />
      {chips.map((chip) => (
        <g key={`${chip.x}-${chip.y}`}>
          <rect
            x={chip.x}
            y={chip.y}
            width={chip.w}
            height="24"
            rx="12"
            className="fill-accent-soft"
          />
          <Bar x={chip.x + 12} y={chip.y + 9} w={chip.w - 24} h={6} className="fill-accent/60" />
        </g>
      ))}
      <rect x="52" y="256" width="124" height="32" rx="8" className="fill-accent" />
      <Bar x={84} y={269} w={60} h={6} className="fill-on-accent" />

      {/* API and model */}
      <Arrow d="M200 200 H226" marker={marker} />
      <rect
        x="232"
        y="160"
        width="100"
        height="80"
        rx="12"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <rect x="248" y="176" width="20" height="20" rx="6" className="fill-accent-2-soft" />
      <text x="248" y="218" className="fill-ink font-mono" fontSize="13" fontWeight="600">
        NestJS
      </text>
      <text x="248" y="232" className="fill-ink-3 font-mono" fontSize="10">
        REST API
      </text>

      <Arrow d="M336 200 H362" marker={marker} />
      <rect
        x="368"
        y="160"
        width="100"
        height="80"
        rx="12"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <path d="M394 176 l4 8 8 4 -8 4 -4 8 -4-8 -8-4 8-4z" className="fill-accent-2" />
      <text x="384" y="218" className="fill-ink font-mono" fontSize="13" fontWeight="600">
        Gemini
      </text>
      <text x="384" y="232" className="fill-ink-3 font-mono" fontSize="10">
        2.5 Flash
      </text>

      {/* Recipes */}
      <Arrow d="M472 200 H498" marker={marker} />
      <rect
        x="504"
        y="92"
        width="112"
        height="216"
        rx="14"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect
            x="516"
            y={106 + i * 100}
            width="88"
            height="44"
            rx="8"
            className="fill-surface-2"
          />
          <Bar x={516} y={160 + i * 100} w={76} h={7} className="fill-ink/70" />
          <Bar x={516} y={174 + i * 100} w={56} h={6} />
        </g>
      ))}
    </Frame>
  );
}

function AquaBoost(props: IllustrationProps) {
  const circumference = 2 * Math.PI * 54;
  const week = [52, 70, 44, 82, 64, 90, 38];
  return (
    <Frame {...props}>
      {/* Phone */}
      <rect
        x="92"
        y="28"
        width="200"
        height="344"
        rx="30"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <rect x="166" y="42" width="52" height="8" rx="4" className="fill-surface-2" />
      <circle
        cx="192"
        cy="138"
        r="54"
        fill="none"
        className="stroke-accent-2-soft"
        strokeWidth="12"
      />
      <circle
        cx="192"
        cy="138"
        r="54"
        fill="none"
        className="stroke-accent-2"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${circumference * 0.62} ${circumference}`}
        transform="rotate(-90 192 138)"
      />
      <path
        d="M192 112c-9 12-15 20-15 28a15 15 0 0 0 30 0c0-8-6-16-15-28z"
        className="fill-accent-2"
      />
      <Bar x={150} y={208} w={84} h={10} className="fill-ink/80" />
      <Bar x={166} y={226} w={52} h={6} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x="112"
            y={250 + i * 32}
            width="160"
            height="26"
            rx="8"
            className="fill-surface-2"
          />
          <circle cx="126" cy={263 + i * 32} r="6" className="fill-accent-2/40" />
          <Bar x={140} y={260 + i * 32} w={64 - i * 10} h={6} />
        </g>
      ))}

      {/* Daily history */}
      <rect
        x="324"
        y="88"
        width="252"
        height="224"
        rx="14"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <Bar x={344} y={108} w={88} h={9} className="fill-ink/80" />
      <path d="M344 172 H556" className="stroke-accent-2" strokeWidth="1.5" strokeDasharray="5 5" />
      {week.map((height, i) => (
        <rect
          key={i}
          x={350 + i * 30}
          y={288 - height}
          width="18"
          height={height}
          rx="4"
          className={i === 5 ? 'fill-accent-2' : 'fill-accent-2/30'}
        />
      ))}
    </Frame>
  );
}

function StudentDepression(props: IllustrationProps) {
  const marker = useMarkerId();
  const models = [
    { y: 116, label: 'Logistic Regression', best: true },
    { y: 176, label: 'Decision Tree', best: false },
    { y: 236, label: 'KNN', best: false },
  ];
  return (
    <Frame {...props}>
      <ArrowMarker id={marker} />
      {/* Dataset */}
      <rect
        x="32"
        y="96"
        width="176"
        height="208"
        rx="14"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <rect x="48" y="112" width="144" height="18" rx="4" className="fill-surface-2" />
      {[0, 1, 2, 3, 4, 5].map((row) => (
        <g key={row}>
          {[0, 1, 2, 3].map((col) => (
            <rect
              key={col}
              x={48 + col * 37}
              y={138 + row * 18}
              width="31"
              height="10"
              rx="3"
              className={col === 3 ? 'fill-accent-2/35' : 'fill-line'}
            />
          ))}
        </g>
      ))}
      <text x="48" y="276" className="fill-ink font-mono" fontSize="13" fontWeight="600">
        27,901 × 18
      </text>
      <text x="48" y="292" className="fill-ink-3 font-mono" fontSize="10">
        records × features
      </text>

      {/* Models */}
      <Arrow d="M214 200 H240" marker={marker} />
      {models.map((model) => (
        <g key={model.label}>
          <rect
            x="246"
            y={model.y}
            width="186"
            height="48"
            rx="10"
            className={model.best ? 'fill-accent-soft stroke-accent' : 'fill-surface stroke-line'}
            strokeWidth="1.5"
          />
          <circle
            cx="268"
            cy={model.y + 24}
            r="8"
            className={model.best ? 'fill-accent' : 'fill-line-strong'}
          />
          {model.best ? (
            <path
              d={`M264 ${model.y + 24} l3 3 5-6`}
              fill="none"
              className="stroke-on-accent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <text
            x="284"
            y={model.y + 28}
            className={model.best ? 'fill-ink font-mono' : 'fill-ink-2 font-mono'}
            fontSize="12"
            fontWeight={model.best ? 600 : 400}
          >
            {model.label}
          </text>
        </g>
      ))}

      {/* Result */}
      <Arrow d="M438 140 C470 140 470 200 490 200" marker={marker} />
      <rect
        x="496"
        y="136"
        width="120"
        height="128"
        rx="14"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
      />
      <text
        x="512"
        y="196"
        className="fill-ink"
        fontSize="26"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        83.66%
      </text>
      <text x="512" y="218" className="fill-ink-3 font-mono" fontSize="10">
        accuracy (LR)
      </text>
      <Bar x={512} y={236} w={88} h={6} className="fill-accent/30" />
      <Bar x={512} y={236} w={74} h={6} className="fill-accent" />
    </Frame>
  );
}

function YumeFind(props: IllustrationProps) {
  const posters = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <Frame {...props}>
      <Window x={48} y={40} w={544} h={320} />
      <rect x="160" y="50" width="320" height="16" rx="8" className="fill-surface-2" />
      <circle cx="174" cy="58" r="4" fill="none" className="stroke-ink-3" strokeWidth="1.5" />
      <path d="M177 61 l3 3" className="stroke-ink-3" strokeWidth="1.5" strokeLinecap="round" />

      {posters.map((i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 72 + col * 80;
        const y = 100 + row * 124;
        const active = i === 1;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="68"
              height="92"
              rx="8"
              className={active ? 'fill-accent-2-soft stroke-accent-2' : 'fill-surface-2'}
              strokeWidth="2"
            />
            <Bar x={x} y={y + 100} w={56 - (i % 3) * 8} h={6} />
          </g>
        );
      })}

      {/* Detail page */}
      <rect x="400" y="100" width="168" height="236" rx="10" className="fill-surface-2" />
      <rect
        x="414"
        y="114"
        width="56"
        height="76"
        rx="6"
        className="fill-accent-2-soft stroke-accent-2"
        strokeWidth="1.5"
      />
      <Bar x={480} y={120} w={74} h={9} className="fill-ink/80" />
      <Bar x={480} y={138} w={50} h={6} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={480 + i * 14}
          y="156"
          width="10"
          height="10"
          rx="2"
          className={i < 4 ? 'fill-accent-2' : 'fill-line-strong'}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <Bar key={i} x={414} y={208 + i * 20} w={[138, 128, 140, 110, 76][i] ?? 100} h={6} />
      ))}
    </Frame>
  );
}

function PawAndPreferences(props: IllustrationProps) {
  const marker = useMarkerId();
  return (
    <Frame {...props}>
      <ArrowMarker id={marker} />
      {/* Card stack */}
      <rect
        x="226"
        y="64"
        width="188"
        height="248"
        rx="18"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
        transform="rotate(-7 320 188)"
      />
      <rect
        x="226"
        y="64"
        width="188"
        height="248"
        rx="18"
        className="fill-surface stroke-line"
        strokeWidth="1.5"
        transform="rotate(5 320 188)"
      />
      <rect
        x="226"
        y="60"
        width="188"
        height="248"
        rx="18"
        className="fill-surface stroke-line-strong"
        strokeWidth="1.5"
      />
      <rect x="240" y="74" width="160" height="164" rx="12" className="fill-surface-2" />

      {/* Cat */}
      <path
        d="M290 160 L296 118 L320 142 L344 118 L350 160 Z"
        className="fill-line-strong"
        strokeLinejoin="round"
      />
      <circle cx="320" cy="170" r="36" className="fill-line-strong" />
      <circle cx="306" cy="166" r="4" className="fill-surface-2" />
      <circle cx="334" cy="166" r="4" className="fill-surface-2" />
      <path
        d="M316 180 l4 4 4-4"
        fill="none"
        className="stroke-surface-2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Bar x={240} y={252} w={92} h={10} className="fill-ink/80" />
      <Bar x={240} y={272} w={60} h={6} />

      {/* Actions */}
      <circle
        cx="272"
        cy="346"
        r="24"
        className="fill-surface stroke-line-strong"
        strokeWidth="1.5"
      />
      <path
        d="M264 338 l16 16 m0-16 -16 16"
        className="stroke-ink-3"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="368" cy="346" r="24" className="fill-accent" />
      <path
        d="M368 357c-9-6-13-10-13-15a6 6 0 0 1 13-3 6 6 0 0 1 13 3c0 5-4 9-13 15z"
        className="fill-on-accent"
      />

      {/* Swipe hint */}
      <Arrow d="M436 196 C470 196 488 176 500 150" marker={marker} />
      <Arrow d="M204 196 C170 196 152 216 140 242" marker={marker} />
    </Frame>
  );
}

function Generic(props: IllustrationProps) {
  return (
    <Frame {...props}>
      <Window x={80} y={56} w={480} h={288} />
      <rect x="104" y="116" width="200" height="200" rx="10" className="fill-surface-2" />
      {[0, 1, 2, 3].map((i) => (
        <Bar key={i} x={328} y={124 + i * 28} w={[200, 160, 184, 120][i] ?? 160} h={8} />
      ))}
      <rect x="328" y="252" width="120" height="32" rx="8" className="fill-accent" />
    </Frame>
  );
}

const illustrations: Record<string, ComponentType<IllustrationProps>> = {
  focuspro: FocusPro,
  'whats-cooking': WhatsCooking,
  aquaboost: AquaBoost,
  'student-depression-prediction': StudentDepression,
  yumefind: YumeFind,
  'paw-and-preferences': PawAndPreferences,
};

export function ProjectIllustration({ slug, ...props }: IllustrationProps & { slug: string }) {
  const Illustration = illustrations[slug] ?? Generic;
  return <Illustration {...props} />;
}
