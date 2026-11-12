import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '@/content/ContentProvider'

/**
 * Per-page concerns the Vue router handled in a global `beforeEach`:
 * document title plus resetting scroll between routes.
 */
export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  const { pathname } = useLocation()
  const { profile, settings } = useContent()

  // The CMS owns the site title; the page name is prefixed onto it.
  const site = settings?.siteTitle ?? profile.name

  useEffect(() => {
    document.title = `${title} - ${site}`
  }, [title, site])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return <main className="pb-24 md:pb-0">{children}</main>
}
