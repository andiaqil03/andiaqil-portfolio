import type { MetaDescriptor } from 'react-router';
import { resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { site } from '~/content/site';

interface PageMeta {
  /** Page name; omitted on the home page. */
  title?: string;
  description?: string;
  /** Route path, e.g. `/projects/focuspro`. */
  path: string;
  type?: 'website' | 'article' | 'profile';
}

const DEFAULT_TITLE = `${profile.name} · ${profile.role}`;

/**
 * Title, description, Open Graph and Twitter tags for a route. Absolute URLs
 * (canonical, og:url, og:image) are only emitted once `site.url` is set.
 */
export function pageMeta({
  title,
  description = site.description,
  path,
  type = 'website',
}: PageMeta): MetaDescriptor[] {
  const fullTitle = title ? `${title} · ${profile.name}` : DEFAULT_TITLE;
  const origin = resolved(site.url);

  const tags: MetaDescriptor[] = [
    { title: fullTitle },
    { name: 'description', content: description },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: profile.name },
    { property: 'og:locale', content: 'en_MY' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
  ];

  if (origin) {
    const url = `${origin}${path === '/' ? '' : path}`;
    const image = `${origin}/og-image.png`;
    tags.push(
      { tagName: 'link', rel: 'canonical', href: url },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${profile.name}, ${profile.role}` },
      { name: 'twitter:image', content: image },
    );
  }

  return tags;
}

/** schema.org Person for the home page. The phone number is deliberately excluded. */
export function personJsonLd(): MetaDescriptor {
  const origin = resolved(site.url);
  const sameAs = [resolved(profile.links.github), resolved(profile.links.linkedin)].filter(Boolean);

  return {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.fullName,
      alternateName: profile.name,
      jobTitle: profile.role,
      worksFor: { '@type': 'Organization', name: 'MTechnix Sdn Bhd' },
      email: `mailto:${profile.email}`,
      address: { '@type': 'PostalAddress', addressRegion: 'Selangor', addressCountry: 'MY' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universiti Tenaga Nasional' },
      knowsAbout: [
        'Full-stack web development',
        'Frontend development',
        'Backend development',
        'React',
        'Express.js',
        'PostgreSQL',
        'Microsoft Azure',
        'NestJS',
        'Angular',
      ],
      sameAs,
      ...(origin ? { url: origin } : {}),
    },
  };
}
