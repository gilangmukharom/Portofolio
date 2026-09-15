import { useBlock, useContent } from '@/content/ContentProvider'
import { useReveal } from '@/hooks/useReveal'
import { ButtonAnchor } from '@/components/ui/Button'

export function ContactCTA() {
  const { profile } = useContent()
  const block = useBlock('global.contact_cta')
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <section ref={ref} className={`${className} mx-auto max-w-content px-5 py-20 md:px-8 md:py-32`}>
      <div className="rounded-4xl border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
        <p className="font-hand text-3xl text-accent">{block.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-headline font-extrabold text-balance">
          {block.title}
        </h2>
        <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-muted">
          {block.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonAnchor href={`mailto:${profile.email}`} target={undefined}>
            {profile.email}
          </ButtonAnchor>
          {block.secondary?.href && (
            <ButtonAnchor href={block.secondary.href} variant="ghost">
              {block.secondary.label}
            </ButtonAnchor>
          )}
        </div>
      </div>
    </section>
  )
}
