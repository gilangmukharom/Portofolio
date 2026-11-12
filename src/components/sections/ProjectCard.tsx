import { useCallback, useState } from 'react'
import { useLazyMedia } from '@/hooks/useLazyMedia'
import { useReveal } from '@/hooks/useReveal'
import { Tag } from '@/components/ui/Tag'
import { cn } from '@/lib/cn'
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

/**
 * How a preview is framed inside the fixed 16:10 card slot.
 *
 * Recordings come in every shape - a 320x715 phone capture, a 1920x914
 * dashboard, a 960x600 landing page - and cropping them all to 16:10 cuts the
 * phone down to a sliver and the dashboard's sidebar off. Instead the card
 * reads the preview's real size once it loads and picks a frame that shows
 * the whole recording at its own aspect ratio.
 */
type MediaShape = 'phone' | 'browser' | 'fill'

const CARD_RATIO = 16 / 10

function shapeFor(width: number, height: number): MediaShape {
  const ratio = width / height
  if (ratio < 0.85) return 'phone'
  // Close enough to the slot that filling it loses almost nothing.
  if (Math.abs(ratio - CARD_RATIO) <= 0.12) return 'fill'
  return ratio > CARD_RATIO ? 'browser' : 'fill'
}

function ProjectMedia({ project }: { project: Project }) {
  // Previews are multi-megabyte animations, so the src waits until the card is near.
  const { ref, shouldLoad } = useLazyMedia<HTMLDivElement>()
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)

  const measure = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth) {
      setSize({ width: image.naturalWidth, height: image.naturalHeight })
    }
  }, [])

  const shape = size ? shapeFor(size.width, size.height) : null

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden bg-elevated">
      {/* Shown until the preview has loaded and been measured. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-elevated to-line transition-opacity duration-500',
          shape ? 'opacity-0' : 'animate-pulse',
        )}
      />

      {(shape === 'phone' || shape === 'browser') && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgb(var(--accent)/0.22),transparent_65%)]"
        />
      )}

      {shouldLoad && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-soft',
            shape ? 'opacity-100' : 'opacity-0',
          )}
        >
          {/* One element tree for every shape, so the image is never re-fetched or re-decoded. */}
          <div
            className={cn(
              'relative overflow-hidden transition-transform duration-700 ease-soft',
              shape === 'phone' &&
                'h-[88%] shrink-0 rounded-[1.15rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-2xl shadow-black/30 group-hover:-translate-y-1 group-hover:scale-[1.04]',
              shape === 'browser' &&
                'w-[90%] rounded-lg border border-line bg-surface shadow-2xl shadow-black/20 group-hover:-translate-y-1 group-hover:scale-[1.02]',
              (shape === 'fill' || !shape) && 'h-full w-full group-hover:scale-[1.03]',
            )}
            style={shape === 'phone' && size ? { aspectRatio: `${size.width} / ${size.height}` } : undefined}
          >
            {shape === 'browser' && (
              <div aria-hidden="true" className="flex h-5 items-center gap-1.5 border-b border-line px-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
              </div>
            )}
            <img
              ref={measure}
              src={project.media}
              alt={`${project.name} preview`}
              loading="lazy"
              decoding="async"
              width={size?.width}
              height={size?.height}
              onLoad={(event) => measure(event.currentTarget)}
              className={cn(
                shape === 'browser' ? 'block h-auto w-full' : 'h-full w-full object-cover',
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const { ref: revealRef, className: reveal } = useReveal<HTMLElement>()

  return (
    <article
      ref={revealRef}
      className={`${reveal} group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-500 ease-soft hover:-translate-y-1.5 hover:border-fg/25`}
    >
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-title font-bold">{project.name}</h3>
          <Tag className="shrink-0">{project.type}</Tag>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.map((item) => (
            <li key={item} className="text-xs font-medium text-accent">
              {item}
            </li>
          ))}
        </ul>

        {(project.github || project.demo) && (
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
        )}
      </div>
    </article>
  )
}
