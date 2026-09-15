import { useMemo, useState } from 'react'
import { useBlock, useContent } from '@/content/ContentProvider'
import { cn } from '@/lib/cn'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid() {
  const { projects } = useContent()
  const labels = useBlock('ui.project_filter')
  const [filter, setFilter] = useState('All')

  // The first label is the catch-all; the CMS can rename it, so "show
  // everything" is decided by position rather than by the word "All".
  const [allLabel = 'All', ...typeLabels] = labels.body

  const projectTypes = useMemo(() => {
    // Only offer a filter for types that actually have a published project.
    const present = new Set(projects.map((project) => project.type as string))
    return [allLabel, ...typeLabels.filter((label) => present.has(label))]
  }, [projects, allLabel, typeLabels])

  const visible = useMemo(
    () => (filter === allLabel ? projects : projects.filter((project) => project.type === filter)),
    [projects, filter, allLabel],
  )

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
        {projectTypes.map((type) => {
          const isActive = type === filter
          return (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              aria-pressed={isActive}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ease-soft',
                isActive
                  ? 'border-fg bg-fg text-bg'
                  : 'border-line text-muted hover:border-fg hover:text-fg',
              )}
            >
              {type}
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
