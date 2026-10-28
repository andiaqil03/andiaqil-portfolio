import { useRef } from 'react';
import type { Project } from '~/content/types';
import { allProjects } from '~/lib/content';
import { cn } from '~/lib/cn';
import { gsap, useGSAP } from '~/lib/gsap';
import { ArrowLink } from '../ui/action';
import { Container } from '../ui/container';
import { Reveal } from '../ui/reveal';
import { SectionHeader } from '../ui/section';
import { AllProjectsCard, ProjectCard } from './project-card';

/**
 * Home-page projects. On desktop with motion allowed, the section pins and
 * the cards travel sideways as you scroll. Everywhere else (and before
 * hydration) it is a normal vertical layout.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const element = section.current;
        const rail = track.current;
        if (!element || !rail) return;
        element.dataset.horizontal = 'true';
        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth);

        gsap.to(rail, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => {
          delete element.dataset.horizontal;
        };
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="projects"
      aria-labelledby="projects-heading"
      className="group/show relative overflow-x-clip py-20 sm:py-24 lg:py-32 data-[horizontal=true]:flex data-[horizontal=true]:h-[100svh] data-[horizontal=true]:flex-col data-[horizontal=true]:justify-center data-[horizontal=true]:py-0 data-[horizontal=true]:pt-20"
    >
      <Container>
        <Reveal>
          <SectionHeader
            id="projects-heading"
            kicker="Expeditions"
            title={
              <>
                Things I’ve <span className="text-accent">built</span>
              </>
            }
            description="From a researched final-year project to API-driven apps, each with a write-up."
            action={<ArrowLink to="/projects">View all projects</ArrowLink>}
          />
        </Reveal>
      </Container>

      <div className="mt-12 sm:mt-14 group-data-[horizontal=true]/show:mt-10">
        <div
          ref={track}
          className="mx-auto grid max-w-[76rem] gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8 group-data-[horizontal=true]/show:mx-0 group-data-[horizontal=true]/show:flex group-data-[horizontal=true]/show:w-max group-data-[horizontal=true]/show:max-w-none group-data-[horizontal=true]/show:items-stretch group-data-[horizontal=true]/show:px-[max(2rem,calc((100vw_-_76rem)/2_+_2rem))] group-data-[horizontal=true]/show:will-change-transform"
        >
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 80}
              className={cn(
                'group-data-[horizontal=true]/show:h-[min(66vh,560px)] group-data-[horizontal=true]/show:shrink-0',
                index === 0
                  ? 'sm:col-span-2 group-data-[horizontal=true]/show:w-[600px]'
                  : 'group-data-[horizontal=true]/show:w-[420px]',
              )}
            >
              <ProjectCard project={project} index={index + 1} lead={index === 0} />
            </Reveal>
          ))}
          <div className="hidden group-data-[horizontal=true]/show:block group-data-[horizontal=true]/show:h-[min(66vh,560px)] group-data-[horizontal=true]/show:w-[340px] group-data-[horizontal=true]/show:shrink-0">
            <AllProjectsCard count={allProjects.length} className="h-full" />
          </div>
        </div>

        <Container className="hidden group-data-[horizontal=true]/show:block">
          <div className="mt-10 h-1 overflow-hidden rounded-full bg-line">
            <div
              ref={bar}
              className="h-full origin-left scale-x-0 rounded-full"
              style={{ background: 'var(--trail)' }}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
