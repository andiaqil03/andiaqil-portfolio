import { todo, type MaybePlaceholder } from './placeholder';

export interface NavItem {
  label: string;
  to: string;
}

export const site: {
  /** Production origin without a trailing slash, e.g. `https://andiaqil.dev`. */
  url: MaybePlaceholder<string>;
  /** Public repository for this site, linked from the footer. */
  sourceRepo: MaybePlaceholder<string>;
  description: string;
  nav: NavItem[];
  /** Call-to-action at the end of the navigation. */
  navCta: NavItem;
} = {
  url: todo(
    'Production domain (e.g. https://andiaqil.dev): enables canonical URLs, sitemap and link previews',
  ),
  sourceRepo: todo('GitHub URL of this portfolio’s repository'),
  description:
    'Andi Aqil is a software engineer building practical digital products, focused on backend development, REST APIs and full-stack web applications.',
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Experience', to: '/experience' },
    { label: 'Projects', to: '/projects' },
    { label: 'Contact', to: '/contact' },
  ],
  navCta: { label: 'Resume', to: '/resume' },
};
