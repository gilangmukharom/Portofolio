import { useBlock } from '@/content/ContentProvider'
import { PageShell } from '@/components/layout/PageShell'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { ProjectGrid } from '@/components/sections/ProjectGrid'

export default function Work() {
  const hero = useBlock('work.hero')

  return (
    <PageShell title="Work">
      <section className="mx-auto max-w-content px-5 pt-16 md:px-8 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-display font-extrabold text-balance">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
          {hero.description}
        </p>

        <div className="mt-16">
          <ProjectGrid />
        </div>
      </section>

      <ContactCTA />
    </PageShell>
  )
}
