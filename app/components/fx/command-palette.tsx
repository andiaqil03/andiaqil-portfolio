import {
  ArrowRight,
  Briefcase,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  Home,
  Mail,
  MoonStar,
  Search,
  Send,
  User,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type SVGProps,
} from 'react';
import { useNavigate } from 'react-router';
import { resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { useTheme } from '~/hooks/use-theme';
import { allProjects } from '~/lib/content';
import { cn } from '~/lib/cn';
import { GitHubIcon, LinkedInIcon } from '../ui/brand-icons';

const OPEN_EVENT = 'command-palette:open';

/** Opens the palette from anywhere (e.g. the header button). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

interface Command {
  id: string;
  group: 'Pages' | 'Projects' | 'Actions';
  label: string;
  hint?: string;
  keywords?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  run: () => void | string;
}

/**
 * ⌘K / Ctrl+K command palette: jump to any page or project, copy the email,
 * open profiles or switch theme. Native <dialog> for focus trapping and
 * Escape; combobox + listbox semantics for screen readers.
 */
export function CommandPalette() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const listId = useId();
  const dialogId = useId();

  // Looked up by id rather than a ref so command closures stay render-safe.
  const getDialog = useCallback(
    () => document.getElementById(dialogId) as HTMLDialogElement | null,
    [dialogId],
  );
  const close = useCallback(() => getDialog()?.close(), [getDialog]);

  const open = useCallback(() => {
    const element = getDialog();
    if (!element || element.open) return;
    setQuery('');
    setActive(0);
    setNotice('');
    // showModal focuses the first focusable element: the search input.
    element.showModal();
  }, [getDialog]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (getDialog()?.open) close();
        else open();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [open, close, getDialog]);

  const commands = useMemo<Command[]>(() => {
    const go = (to: string) => () => {
      close();
      navigate(to, { viewTransition: true });
    };
    const external = (href: string) => () => {
      close();
      window.open(href, '_blank', 'noopener,noreferrer');
    };
    const github = resolved(profile.links.github);
    const linkedin = resolved(profile.links.linkedin);

    return [
      { id: 'home', group: 'Pages', label: 'Home', Icon: Home, run: go('/') },
      {
        id: 'about',
        group: 'Pages',
        label: 'About',
        keywords: 'story bio',
        Icon: User,
        run: go('/about'),
      },
      {
        id: 'experience',
        group: 'Pages',
        label: 'Experience',
        keywords: 'work jobs internship freelance',
        Icon: Briefcase,
        run: go('/experience'),
      },
      {
        id: 'projects',
        group: 'Pages',
        label: 'Projects',
        keywords: 'work portfolio',
        Icon: FolderGit2,
        run: go('/projects'),
      },
      {
        id: 'contact',
        group: 'Pages',
        label: 'Contact',
        keywords: 'hire email',
        Icon: Send,
        run: go('/contact'),
      },
      {
        id: 'resume',
        group: 'Pages',
        label: 'Resume',
        keywords: 'cv',
        Icon: FileText,
        run: go('/resume'),
      },
      ...allProjects.map<Command>((project) => ({
        id: `project-${project.slug}`,
        group: 'Projects',
        label: project.title,
        hint: project.tagline,
        keywords: project.stack.join(' '),
        Icon: ArrowRight,
        run: go(`/projects/${project.slug}`),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        Icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => {});
          return 'Email address copied';
        },
      },
      {
        id: 'email',
        group: 'Actions',
        label: 'Send an email',
        Icon: Mail,
        run: () => {
          close();
          window.location.href = `mailto:${profile.email}`;
        },
      },
      ...(github
        ? [
            {
              id: 'github',
              group: 'Actions' as const,
              label: 'Open GitHub',
              Icon: GitHubIcon,
              run: external(github),
            },
          ]
        : []),
      ...(linkedin
        ? [
            {
              id: 'linkedin',
              group: 'Actions' as const,
              label: 'Open LinkedIn',
              Icon: LinkedInIcon,
              run: external(linkedin),
            },
          ]
        : []),
      {
        id: 'theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        keywords: 'dark light mode appearance',
        Icon: MoonStar,
        run: () => {
          close();
          setTheme(theme === 'dark' ? 'light' : 'dark');
        },
      },
    ];
  }, [close, navigate, setTheme, theme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      [command.label, command.hint, command.keywords, command.group].some((field) =>
        field?.toLowerCase().includes(q),
      ),
    );
  }, [commands, query]);

  const activeIndex = Math.min(active, Math.max(0, results.length - 1));

  function execute(command: Command | undefined) {
    if (!command) return;
    const message = command.run();
    if (typeof message === 'string') setNotice(message);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = (activeIndex + step + results.length) % Math.max(1, results.length);
      setActive(next);
      document.getElementById(`${listId}-${next}`)?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      execute(results[activeIndex]);
    }
  }

  let lastGroup = '';

  return (
    // Clicking the backdrop closes; Escape is handled natively by <dialog>.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      id={dialogId}
      aria-label="Command palette"
      className="palette fixed inset-x-0 top-[12vh] m-0 mx-auto w-[min(640px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-lg backdrop-blur-2xl backdrop:bg-[rgb(13_21_18/0.4)] backdrop:backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search aria-hidden="true" className="size-5 shrink-0 text-ink-3" strokeWidth={1.75} />
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results.length ? `${listId}-${activeIndex}` : undefined}
          aria-autocomplete="list"
          aria-label="Search pages, projects and actions"
          placeholder="Search pages, projects, actions…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setNotice('');
          }}
          onKeyDown={onKeyDown}
          className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-3"
        />
        <kbd className="hidden shrink-0 rounded-sm border border-line bg-surface px-1.5 py-0.5 font-mono text-meta text-ink-3 sm:inline">
          Esc
        </kbd>
      </div>

      <ul
        id={listId}
        role="listbox"
        aria-label="Results"
        className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
      >
        {results.length === 0 ? (
          <li className="px-3 py-8 text-center text-sm text-ink-3">No matches for “{query}”.</li>
        ) : (
          results.map((command, index) => {
            const header = command.group !== lastGroup ? command.group : null;
            lastGroup = command.group;
            const selected = index === activeIndex;
            return (
              <li key={command.id} role="presentation">
                {header ? (
                  <p className="px-3 pt-3 pb-1.5 font-mono text-meta text-ink-3 uppercase">
                    {header}
                  </p>
                ) : null}
                {/* Keyboard is handled by the combobox input via aria-activedescendant. */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={selected}
                  tabIndex={-1}
                  onMouseMove={() => setActive(index)}
                  onClick={() => execute(command)}
                  className={cn(
                    'flex min-h-12 cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors duration-100',
                    selected ? 'bg-accent-soft text-ink' : 'text-ink-2',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex size-8 shrink-0 items-center justify-center rounded-sm',
                      selected ? 'bg-accent text-on-accent' : 'bg-surface-2 text-ink-3',
                    )}
                  >
                    <command.Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{command.label}</span>
                    {command.hint ? (
                      <span className="block truncate text-sm text-ink-3">{command.hint}</span>
                    ) : null}
                  </span>
                  {selected ? (
                    <CornerDownLeft
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ink-3"
                      strokeWidth={1.75}
                    />
                  ) : null}
                </div>
              </li>
            );
          })
        )}
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-2.5 font-mono text-meta text-ink-3">
        <span role="status" className={cn(notice && 'text-accent-3')}>
          {notice || `${results.length} result${results.length === 1 ? '' : 's'}`}
        </span>
        <span className="hidden gap-3 sm:flex">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
        </span>
      </div>
    </dialog>
  );
}
