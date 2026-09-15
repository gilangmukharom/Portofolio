import { useCallback, useEffect, useState } from 'react'
import { fetchJson } from '@/lib/api'
import type { Article, Topic } from '@/types'

type Status = 'idle' | 'loading' | 'error'

export function useNews(topic: Topic) {
  const [articles, setArticles] = useState<Article[]>([])
  const [status, setStatus] = useState<Status>('loading')
  // Bumping this re-runs the effect, which is how retry works.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Aborting on cleanup stops a slow earlier topic from overwriting a newer one.
    const controller = new AbortController()
    setStatus('loading')

    void (async () => {
      try {
        const data = await fetchJson<Article[]>(
          `/news?topic=${encodeURIComponent(topic.value)}`,
          { signal: controller.signal },
        )
        setArticles(data)
        setStatus('idle')
      } catch (error) {
        if (controller.signal.aborted || (error as Error)?.name === 'AbortError') return
        setArticles([])
        setStatus('error')
      }
    })()

    return () => controller.abort()
  }, [topic.value, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { articles, status, retry }
}
