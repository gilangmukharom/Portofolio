import { profile } from '@/data/profile'
import { useReveal } from '@/hooks/useReveal'
import { ButtonAnchor } from '@/components/ui/Button'

export function ContactCTA() {
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <section ref={ref} className={`${className} mx-auto max-w-content px-5 py-20 md:px-8 md:py-32`}>
      <div className="rounded-4xl border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
        <p className="font-hand text-3xl text-accent">Say hello</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-headline font-extrabold text-balance">
          Got something you want built properly?
        </h2>
        <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-muted">
          I’m open to product work, freelance builds, and the occasional stubborn bug. Tell me what
          you’re working on.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonAnchor href={`mailto:${profile.email}`} target={undefined}>
            {profile.email}
          </ButtonAnchor>
          <ButtonAnchor href="https://github.com/gilangmukharom" variant="ghost">
            GitHub
          </ButtonAnchor>
        </div>
      </div>
    </section>
  )
}
