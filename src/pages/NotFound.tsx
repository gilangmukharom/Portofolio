import { PageShell } from '@/components/layout/PageShell'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <PageShell title="Page not found">
      <section className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-5 text-center md:px-8">
        <p className="font-hand text-4xl text-accent">Dead end</p>
        <h1 className="mt-4 text-display font-extrabold">404</h1>
        <p className="mt-6 max-w-prose text-lg text-muted">
          That page doesn’t exist — it may have moved during the rebuild.
        </p>
        <ButtonLink to="/" className="mt-10">
          Back to home
        </ButtonLink>
      </section>
    </PageShell>
  )
}
