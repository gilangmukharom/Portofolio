import { useLazyMedia } from '@/hooks/useLazyMedia'
import { useReveal } from '@/hooks/useReveal'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/types'

function ExternalIcon({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={label}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition duration-300 ease-soft hover:border-fg hover:text-fg"
    >
      {children}
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  // Previews are multi-megabyte GIFs, so the src waits until the card is near.
  const { ref: mediaRef, shouldLoad } = useLazyMedia<HTMLDivElement>()
  const { ref: revealRef, className: reveal } = useReveal<HTMLElement>()

  return (
    <article
      ref={revealRef}
      className={`${reveal} group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-500 ease-soft hover:-translate-y-1.5 hover:border-fg/25`}
    >
      <div
        ref={mediaRef}
        className="relative aspect-[16/10] overflow-hidden bg-elevated"
      >
        {shouldLoad ? (
          <img
            src={`/img/${project.media}`}
            alt={`${project.name} preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full animate-pulse bg-gradient-to-br from-elevated to-line"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-title font-bold">{project.name}</h3>
          <Tag className="shrink-0">{project.type}</Tag>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item} className="text-xs font-medium text-accent">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-center gap-2">
          {project.github && (
            <ExternalIcon label={`${project.name} source on GitHub`} href={project.github}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </ExternalIcon>
          )}
          {project.demo && (
            <ExternalIcon label={`${project.name} live site`} href={project.demo}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6M10 14 21 3" />
              </svg>
            </ExternalIcon>
          )}
        </div>
      </div>
    </article>
  )
}
