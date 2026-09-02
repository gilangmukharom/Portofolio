import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { featuredProjects } from '@/data/projects'
import { marqueeLogos } from '@/data/skills'
import { PageShell } from '@/components/layout/PageShell'
import { Marquee } from '@/components/ui/Marquee'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { SplitHero } from '@/components/sections/SplitHero'
import { StatStrip } from '@/components/sections/StatStrip'

export default function Home() {
  return (
    <PageShell title="Home">
      <SplitHero />

      <div className="border-y border-line">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Marquee items={marqueeLogos} />
        </div>
      </div>

      <StatStrip />

      <section className="mx-auto max-w-content px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="A few things I've shipped"
            description="Products taken from an empty repository to something real people use."
          />
          <Link
            to="/work"
            className="shrink-0 text-sm font-semibold text-muted underline decoration-line underline-offset-8 transition-colors duration-300 hover:text-fg hover:decoration-accent"
          >
            See all projects →
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
          eyebrow="About"
          title="Two halves of the same engineer"
          description={profile.bio[0]}
        />
        <Link
          to="/about"
          className="mt-8 inline-block text-sm font-semibold text-muted underline decoration-line underline-offset-8 transition-colors duration-300 hover:text-fg hover:decoration-accent"
        >
          More about me →
        </Link>
      </section>

      <ContactCTA />
    </PageShell>
  )
}
