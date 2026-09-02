import type { Skill } from '@/types'

/**
 * The track holds two identical copies and slides by exactly -50%, so the loop
 * restarts on a frame that looks the same as the one it left.
 */
export function Marquee({ items }: { items: Skill[] }) {
  const track = [...items, ...items]

  return (
    <div
      className="group relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-hidden="true"
    >
      <ul className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
        {track.map((skill, index) => (
          <li key={`${skill.name}-${index}`} className="flex shrink-0 items-center gap-3">
            <img
              src={skill.iconUrl}
              alt=""
              loading="lazy"
              width={28}
              height={28}
              className="h-7 w-7 object-contain opacity-60 transition-opacity duration-300 hover:opacity-100"
            />
            <span className="text-sm font-medium text-muted">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
