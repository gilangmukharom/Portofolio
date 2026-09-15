import { useMemo, useState } from 'react'
import { useBlock, useContent } from '@/content/ContentProvider'
import { cn } from '@/lib/cn'
import type { SkillGroup } from '@/types'

export function SkillsGrid() {
  const { skills } = useContent()
  const labels = useBlock('ui.skill_groups')
  const [group, setGroup] = useState<SkillGroup>('stack')

  // Labels are editable; the ids they map to are not, so they pair by position.
  const skillGroups = useMemo(
    () =>
      (['stack', 'tools'] as const).map((id, index) => ({
        id,
        label: labels.body[index] ?? (id === 'stack' ? 'Tech stack' : 'Tools'),
      })),
    [labels],
  )

  const visible = useMemo(() => skills.filter((skill) => skill.group === group), [skills, group])

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter skills">
        {skillGroups.map((option) => {
          const isActive = option.id === group
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setGroup(option.id)}
              aria-pressed={isActive}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ease-soft',
                isActive
                  ? 'border-fg bg-fg text-bg'
                  : 'border-line text-muted hover:border-fg hover:text-fg',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {visible.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-4 transition duration-300 ease-soft hover:-translate-y-1 hover:border-fg/25"
          >
            <img
              src={skill.iconUrl}
              alt=""
              loading="lazy"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 object-contain"
            />
            {/* Name and role are stacked in flow, so hovering never nudges the
                row height the way the old absolutely-positioned label did. */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{skill.name}</p>
              <p className="truncate text-xs text-muted">{skill.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
