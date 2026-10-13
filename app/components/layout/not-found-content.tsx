import { ArrowLink } from '../ui/action';
import { PageHeader } from './page-header';

export function NotFoundContent() {
  return (
    <PageHeader
      title="Page not found"
      lead="The page you’re looking for doesn’t exist or has moved. Try one of these instead."
    >
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <ArrowLink to="/">Home</ArrowLink>
        <ArrowLink to="/projects">Projects</ArrowLink>
        <ArrowLink to="/contact">Contact</ArrowLink>
      </div>
    </PageHeader>
  );
}
