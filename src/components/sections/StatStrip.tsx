import { useContent } from '@/content/ContentProvider'
import { useReveal } from '@/hooks/useReveal'

export function StatStrip() {
  const { stats } = useContent()
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <section ref={ref} className={`${className} mx-auto max-w-content px-5 py-16 md:px-8 md:py-24`}>
      <dl className="grid gap-10 border-y border-line py-12 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block text-5xl font-extrabold tracking-tight md:text-6xl">
                {stat.value}
              </span>
              <span className="mt-3 block max-w-[22ch] text-sm leading-relaxed text-muted">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
