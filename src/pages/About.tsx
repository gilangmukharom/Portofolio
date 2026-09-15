import { useBlock, useContent } from '@/content/ContentProvider'
import { PageShell } from '@/components/layout/PageShell'
import { ButtonAnchor } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { SkillsGrid } from '@/components/sections/SkillsGrid'

export default function About() {
  const { profile, experience } = useContent()
  const hero = useBlock('about.hero')
  const experienceHeading = useBlock('about.experience')
  const skillsHeading = useBlock('about.skills')

  return (
    <PageShell title="About">
      <section className="mx-auto max-w-content px-5 pt-16 md:px-8 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-display font-extrabold text-balance">
          {hero.title ?? `${profile.role} in ${profile.location}`}
        </h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div>
            <img
              src={profile.avatar}
              alt={profile.name}
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-3xl border border-line object-cover"
            />
            <ButtonAnchor
              href={hero.primary?.href || profile.resumeUrl}
              variant="ghost"
              className="mt-6 w-full"
            >
              {hero.primary?.label ?? 'Read my resume'}
            </ButtonAnchor>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow={experienceHeading.eyebrow ?? ''}
          title={experienceHeading.title ?? ''}
        />
        <ol className="mt-14 space-y-14">
          {experience.map((item) => (
            <li key={item.company} className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
              <div>
                <p className="text-sm font-semibold text-muted">{item.period}</p>
                <p className="mt-1 text-sm text-muted">{item.location}</p>
              </div>
              <div className="border-l border-line pl-6 md:pl-10">
                <h3 className="text-title font-bold">{item.company}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{item.role}</p>
                <ul className="mt-5 space-y-3 text-muted">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-content px-5 pb-8 md:px-8">
        <SectionHeading
          eyebrow={skillsHeading.eyebrow ?? ''}
          title={skillsHeading.title ?? ''}
          description={skillsHeading.description ?? undefined}
        />
        <div className="mt-14">
          <SkillsGrid />
        </div>
      </section>

      <ContactCTA />
    </PageShell>
  )
}
