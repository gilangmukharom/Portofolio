import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { fetchJson } from '@/lib/api'
import { fallbackContent } from '@/data/fallback'
import type { ContentBlock, SiteContent } from '@/types'

type Source = 'fallback' | 'cms'

interface ContentValue {
  content: SiteContent
  /** Whether what is on screen came from the CMS or from the bundled copy. */
  source: Source
}

const ContentContext = createContext<ContentValue>({
  content: fallbackContent,
  source: 'fallback',
})

/**
 * Fetches the whole site's content in one request and hands it to the tree.
 *
 * The bundled fallback renders immediately, so there is no loading state and
 * no layout shift; when the CMS answers, the live content replaces it. If the
 * API is unreachable the site simply keeps showing the bundled copy.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(fallbackContent)
  const [source, setSource] = useState<Source>('fallback')

  useEffect(() => {
    const controller = new AbortController()

    void (async () => {
      try {
        const live = await fetchJson<SiteContent>('/content', { signal: controller.signal })
        setContent({
          ...live,
          // An empty collection almost always means a half-finished seed rather
          // than a deliberate choice, so keep the bundled copy in that case.
          nav: live.nav?.length ? live.nav : fallbackContent.nav,
          topics: live.topics?.length ? live.topics : fallbackContent.topics,
          blocks: { ...fallbackContent.blocks, ...live.blocks },
        })
        setSource('cms')
      } catch {
        // Nothing to do: the fallback is already on screen.
      }
    })()

    return () => controller.abort()
  }, [])

  useDocumentMeta(content)

  const value = useMemo(() => ({ content, source }), [content, source])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

/** Keeps the document head in step with whatever the CMS currently says. */
function useDocumentMeta(content: SiteContent) {
  const { settings } = content

  useEffect(() => {
    if (!settings) return

    const set = (selector: string, attribute: string, value: string | null) => {
      if (!value) return
      const element = document.head.querySelector(selector)
      element?.setAttribute(attribute, value)
    }

    set('meta[name="description"]', 'content', settings.siteDescription)
    set('meta[property="og:title"]', 'content', settings.siteTitle)
    set('meta[property="og:description"]', 'content', settings.siteDescription)
    set('meta[property="og:image"]', 'content', settings.ogImage)
    set('meta[name="twitter:title"]', 'content', settings.siteTitle)
    set('meta[name="twitter:description"]', 'content', settings.siteDescription)
    set('meta[name="twitter:image"]', 'content', settings.ogImage)
  }, [settings])
}

export function useContent() {
  return useContext(ContentContext).content
}

export function useContentSource() {
  return useContext(ContentContext).source
}

/** Page copy by key, always defined so callers never guard for undefined. */
export function useBlock(key: string): ContentBlock {
  const { blocks } = useContent()
  return (
    blocks[key] ??
    fallbackContent.blocks[key] ?? {
      key,
      page: 'global',
      label: key,
      eyebrow: null,
      title: null,
      description: null,
      body: [],
      primary: null,
      secondary: null,
    }
  )
}

export function useProfile() {
  return useContent().profile
}

export function useFeaturedProjects() {
  const { projects } = useContent()
  return useMemo(() => projects.filter((project) => project.featured), [projects])
}
