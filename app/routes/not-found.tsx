import { NotFoundContent } from '~/components/layout/not-found-content';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/not-found';

export const meta: Route.MetaFunction = () => [
  ...pageMeta({ title: 'Page not found', path: '/404' }).filter(
    (tag) => !('rel' in tag && tag.rel === 'canonical'),
  ),
  { name: 'robots', content: 'noindex' },
];

export default function NotFound() {
  return <NotFoundContent />;
}
