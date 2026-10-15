import type { MaybePlaceholder, Placeholder } from './placeholder';
import type { TechId } from './tech';

/** `YYYY-MM`, e.g. `2025-07`. Formatted for display by `~/lib/format`. */
export type YearMonth = `${number}-${number}`;

export interface DateRange {
  start: YearMonth;
  end: YearMonth | 'present';
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export interface Profile {
  /** Display name used in the header, hero and titles. */
  name: string;
  /** Short name for the footer wordmark and intro loader. */
  shortName: string;
  /** Full legal name: About page, resume and search metadata. */
  fullName: string;
  /** Formal short name used in the footer and copyright. */
  formalName: string;
  role: string;
  /** Role line for the footer. */
  roleLine: string;
  /** What Andi is doing right now, shown in the hero pill. */
  now: string;
  headline: string;
  /** Hero heading, split into its strong first line and quieter second line. */
  heroHeading: [string, string];
  /** Supporting paragraph under the hero heading. */
  heroIntro: string;
  /** Rotating focus areas in the hero's code line (first one prerenders). */
  heroFocus: string[];
  location: string;
  email: string;
  /** Shown on the Contact page only. */
  phone: { display: string; href: string };
  links: {
    github: MaybePlaceholder<string>;
    linkedin: MaybePlaceholder<string>;
  };
  /** Path under /public once the PDF is added, e.g. `/andi-aqil-resume.pdf`. */
  resumePdf: MaybePlaceholder<string>;
  openTo: string[];
  spokenLanguages: string[];
  /** Short paragraphs used on the home page and resume. */
  summary: string[];
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type ExperienceKind = 'Internship' | 'Freelance' | 'Graduate programme';

export interface Experience {
  id: string;
  role: string;
  organization: string;
  /** Short form for tight spaces, e.g. "TM R&D". */
  organizationShort: string;
  /** Department, programme or other framing. */
  context?: string;
  kind: ExperienceKind;
  /** Optional honest label, e.g. "Non-engineering role". */
  note?: string;
  period: DateRange;
  summary: string;
  /** Always visible. Keep to three or four. */
  highlights: string[];
  /** Revealed behind "Show more" on the Experience page. */
  details: string[];
  tech: MaybePlaceholder<TechId[]>;
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectCategory = 'full-stack' | 'backend' | 'frontend' | 'machine-learning';

export type ProjectKind = 'Final Year Project' | 'Academic project' | 'Learning project';

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/** A content block inside a case-study section. */
export type Block =
  | { type: 'text'; paragraphs: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'definitions'; items: { term: string; detail: string }[] }
  | { type: 'steps'; items: { title: string; detail?: string }[] }
  | { type: 'facts'; items: { label: string; value: string }[] }
  | { type: 'note'; text: string }
  | { type: 'tech'; items: { id: TechId; role?: MaybePlaceholder<string> }[] }
  | { type: 'gallery'; images: Screenshot[] };

export interface CaseStudySection {
  id: string;
  title: string;
  /** One sentence under the section heading. */
  intro?: string;
  /** Blocks, any of which may still be a placeholder; or the whole section as one. */
  content: MaybePlaceholder<Array<Block | Placeholder>>;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line description for cards and the case-study hero. */
  tagline: string;
  /** The single capability to lead with on cards. */
  highlight: string;
  /** Real screenshot for cards and the case-study hero; an illustration is drawn until it is set. */
  cover?: Screenshot;
  date: YearMonth;
  kind?: ProjectKind;
  categories: MaybePlaceholder<ProjectCategory[]>;
  stack: TechId[];
  /** Two or three sentences for cards and meta descriptions. */
  summary: string;
  featured?: boolean;
  /** Shown on the home page below the featured project. */
  selected?: boolean;
  links: {
    repo: MaybePlaceholder<string>;
    live: MaybePlaceholder<string>;
  };
  /** Three short points for the featured-project card. */
  keyPoints?: string[];
  sections: CaseStudySection[];
}

/* ------------------------------------------------------------------ */
/* Skills, education, activities                                       */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  id: string;
  title: string;
  items: TechId[];
}

export interface Education {
  id: string;
  institution: string;
  institutionShort: string;
  qualification: string;
  field?: string;
  period: DateRange;
  grade: string;
  honours?: string;
  coursework?: string[];
}

export interface ProcessStep {
  title: string;
  detail: string;
}

export interface Activity {
  id: string;
  title: string;
  role: string;
  date: YearMonth;
  points: string[];
}
