import { useMemo, useState } from 'react'
import { projects, projectTypes, type ProjectFilter } from '@/data/projects'
import { cn } from '@/lib/cn'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid() {
  const [filter, setFilter] = useState<ProjectFilter>('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.type === filter)),
    [filter],
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
