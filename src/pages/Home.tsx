import { Link } from 'react-router-dom'
import {
  useBlock,
  useContent,
  useFeaturedProjects,
  useProfile,
} from '@/content/ContentProvider'
import { PageShell } from '@/components/layout/PageShell'
import { Marquee } from '@/components/ui/Marquee'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { SplitHero } from '@/components/sections/SplitHero'
import { StatStrip } from '@/components/sections/StatStrip'

export default function Home() {
  const profile = useProfile()
  const { skills } = useContent()
  const featuredProjects = useFeaturedProjects()
  const selectedWork = useBlock('home.selected_work')
  const aboutTeaser = useBlock('home.about')

  return (
    <PageShell title="Home">
      <SplitHero />

      <div className="border-y border-line">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Marquee items={skills} />
        </div>
      </div>

      <StatStrip />

      <section className="mx-auto max-w-content px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={selectedWork.eyebrow ?? ''}
            title={selectedWork.title ?? ''}
            description={selectedWork.description ?? undefined}
          />
          <Link
            to={selectedWork.primary?.href ?? '/work'}
            className="shrink-0 text-sm font-semibold text-muted underline decoration-line underline-offset-8 transition-colors duration-300 hover:text-fg hover:decoration-accent"
          >
            {selectedWork.primary?.label} →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow={aboutTeaser.eyebrow ?? ''}
          title={aboutTeaser.title ?? ''}
          description={aboutTeaser.description ?? profile.bio[0]}
        />
        <Link
          to={aboutTeaser.primary?.href ?? '/about'}
          className="mt-8 inline-block text-sm font-semibold text-muted underline decoration-line underline-offset-8 transition-colors duration-300 hover:text-fg hover:decoration-accent"
        >
          {aboutTeaser.primary?.label} →
        </Link>
      </section>

      <ContactCTA />
    </PageShell>
  )
}
