import { useState } from 'react'
import { useBlock, useContent } from '@/content/ContentProvider'
import { useNews } from '@/hooks/useNews'
import { PageShell } from '@/components/layout/PageShell'
import { ArticleSkeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import type { Article, Topic } from '@/types'

function formatDate(value: string) {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function ArticleRow({ article }: { article: Article }) {
  return (
    <li>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-5 rounded-2xl border border-line bg-surface p-5 transition duration-300 ease-soft hover:-translate-y-1 hover:border-fg/25"
      >
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">
            {article.source}
            {article.publishedAt && ` · ${formatDate(article.publishedAt)}`}
          </p>
          <h2 className="mt-2 line-clamp-2 font-semibold leading-snug">{article.title}</h2>
          {article.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {article.description}
            </p>
          )}
        </div>
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            width={112}
            height={112}
            className="h-20 w-20 shrink-0 rounded-xl border border-line object-cover md:h-28 md:w-28"
            onError={(event) => {
              // Hotlinked publisher images fail often; drop the broken box.
              event.currentTarget.style.display = 'none'
            }}
          />
        )}
      </a>
    </li>
  )
}

export default function News() {
  const { topics } = useContent()
  const hero = useBlock('news.hero')
  const [topic, setTopic] = useState<Topic | null>(null)

  // The topic list arrives with the rest of the content, so the selection
  // defaults to whichever topic the CMS puts first.
  const active = topic ?? topics[0]
  const { articles, status, retry } = useNews(active)

  return (
    <PageShell title="News">
      <section className="mx-auto max-w-content px-5 pt-16 md:px-8 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-display font-extrabold text-balance">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
          {hero.description}
        </p>

        <div
          className="mt-12 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter articles by topic"
        >
          {topics.map((option) => {
            const isActive = option.value === active.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTopic(option)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ease-soft',
                  isActive
                    ? 'border-fg bg-fg text-bg'
                    : 'border-line text-muted hover:border-fg hover:text-fg',
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <div className="mt-10 pb-24" aria-live="polite" aria-busy={status === 'loading'}>
          {status === 'loading' && (
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, index) => (
                <ArticleSkeleton key={index} />
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border border-line bg-surface p-10 text-center">
              <p className="font-semibold">Couldn’t load the feed.</p>
              <p className="mx-auto mt-2 max-w-prose text-sm text-muted">
                The news service didn’t respond. It may be rate limited, or the connection dropped.
              </p>
              <button
                type="button"
                onClick={retry}
                className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition duration-300 ease-soft hover:border-fg"
              >
                Try again
              </button>
            </div>
          )}

          {status === 'idle' && articles.length === 0 && (
            <div className="rounded-2xl border border-line bg-surface p-10 text-center">
              <p className="font-semibold">Nothing published under “{active.label}” right now.</p>
              <p className="mt-2 text-sm text-muted">Try another topic.</p>
            </div>
          )}

          {status === 'idle' && articles.length > 0 && (
            <ul className="space-y-4">
              {articles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  )
}
