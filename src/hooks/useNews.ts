import { useCallback, useEffect, useState } from 'react'
import type { Article, Topic } from '@/types'

interface NewsApiArticle {
  title: string | null
  description: string | null
  publishedAt: string | null
  urlToImage: string | null
  url: string
  source?: { name?: string | null }
}

type Status = 'idle' | 'loading' | 'error'

/** NewsAPI keeps pulled articles in the payload; they render as empty cards. */
function isUsable(article: NewsApiArticle) {
  return Boolean(article.url) && article.title !== null && article.title !== '[Removed]'
}

function normalise(article: NewsApiArticle, index: number): Article {
  return {
    id: `${article.url}-${index}`,
    title: article.title ?? 'Untitled',
    description: article.description ?? '',
    publishedAt: article.publishedAt ?? '',
    imageUrl: article.urlToImage,
    url: article.url,
    source: article.source?.name ?? 'Unknown source',
  }
}

export function useNews(topic: Topic) {
  const [articles, setArticles] = useState<Article[]>([])
  const [status, setStatus] = useState<Status>('loading')
  // Bumping this re-runs the effect, which is how retry works.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Aborting on cleanup stops a slow earlier topic from overwriting a newer one.
    const controller = new AbortController()
    setStatus('loading')

    const run = async () => {
      try {
        const response = await fetch(`/api/news?topic=${encodeURIComponent(topic.value)}`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)

        const data = (await response.json()) as { articles?: NewsApiArticle[] }
        setArticles((data.articles ?? []).filter(isUsable).map(normalise))
        setStatus('idle')
      } catch (error) {
        if (controller.signal.aborted || (error as Error)?.name === 'AbortError') return
        setArticles([])
        setStatus('error')
      }
    }

    void run()
    return () => controller.abort()
  }, [topic.value, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { articles, status, retry }
}
