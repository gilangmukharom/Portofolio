import { useBlock } from '@/content/ContentProvider'
import { PageShell } from '@/components/layout/PageShell'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  const block = useBlock('global.not_found')

  return (
    <PageShell title="Page not found">
      <section className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-5 text-center md:px-8">
        <p className="font-hand text-4xl text-accent">{block.eyebrow}</p>
        <h1 className="mt-4 text-display font-extrabold">{block.title}</h1>
        <p className="mt-6 max-w-prose text-lg text-muted">
          {block.description}
        </p>
        <ButtonLink to={block.primary?.href ?? '/'} className="mt-10">
          {block.primary?.label ?? 'Back to home'}
        </ButtonLink>
      </section>
    </PageShell>
  )
}
