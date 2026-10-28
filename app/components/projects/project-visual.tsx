import type { Project } from '~/content/types';
import { cn } from '~/lib/cn';
import { ProjectIllustration } from './illustrations';

interface ProjectVisualProps {
  project: Project;
  /** Scales the visual slightly when an ancestor `.group` is hovered. */
  zoomOnHover?: boolean;
  /** Load eagerly (above the fold). */
  priority?: boolean;
  className?: string;
}

/**
 * The project's screenshot when one is set (`cover`), otherwise a schematic
 * illustration on the dot grid, labelled as such. Screenshots sit as a sheet
 * on the same dot-grid mat, so light and dark apps read as one set.
 */
export function ProjectVisual({ project, zoomOnHover, priority, className }: ProjectVisualProps) {
  const zoom = zoomOnHover
    ? 'transition-transform duration-500 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none'
    : '';

  return (
    <div className={cn('relative overflow-hidden bg-surface-2', className)}>
      {project.cover ? (
        <>
          <div aria-hidden="true" className="dot-grid absolute inset-0" />
          <div className="absolute inset-x-[6%] top-[8%] bottom-0 overflow-hidden rounded-t-md border border-b-0 border-line bg-surface shadow-[0_10px_28px_-14px_rgb(18_33_28/0.35)]">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={cn('size-full object-cover object-top', zoom)}
            />
          </div>
        </>
      ) : (
        <>
          <div aria-hidden="true" className="dot-grid absolute inset-0" />
          <ProjectIllustration
            slug={project.slug}
            label={`Illustration of ${project.title}: ${project.highlight.toLowerCase()}`}
            className={cn('relative size-full p-[4%]', zoom)}
          />
          <span
            aria-hidden="true"
            className="absolute right-3 bottom-2 font-mono text-meta text-ink-3"
          >
            Illustration
          </span>
        </>
      )}
    </div>
  );
}
