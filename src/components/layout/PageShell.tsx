import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'Gilang Mukharom'

/**
 * Per-page concerns the Vue router handled in a global `beforeEach`:
 * document title plus resetting scroll between routes.
 */
export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `${title} — ${SITE}`
  }, [title])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return <main className="pb-24 md:pb-0">{children}</main>
}
