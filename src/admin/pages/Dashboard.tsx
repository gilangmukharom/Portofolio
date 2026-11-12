import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/admin/lib/api'
import { useAuth } from '@/admin/lib/auth'
import { collections, singletons } from '@/admin/config/resources'
import { Icon } from '@/admin/components/Icon'

/** Each list endpoint is cheap here; the counts are only a nicety on the cards. */
function useCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    let cancelled = false

    void (async () => {
      const entries = await Promise.all(
        collections.map(async (collection) => {
          try {
            const rows = await api.get<unknown[]>(`/admin/${collection.name}`)
            return [collection.name, rows.length] as const
          } catch {
            // A failed count should not take the dashboard down with it.
            return [collection.name, 0] as const
          }
        }),
      )
      if (!cancelled) setCounts(Object.fromEntries(entries))
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return counts
}

export default function Dashboard() {
  const { user } = useAuth()
  const counts = useCounts()

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-xl font-bold text-fg">Hello, {user?.name}</h1>
        <p className="mt-1 text-sm text-muted">
          Everything the portfolio renders is editable here. Changes go live on the next page load.
        </p>
      </header>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Content</h2>
      <ul className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <li key={collection.name}>
            <Link
              to={`/c/${collection.name}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-fg"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted">
                <Icon name={collection.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-fg">{collection.title}</span>
                <span className="block truncate text-xs text-muted">{collection.description}</span>
              </span>
              <span className="ml-auto shrink-0 rounded-full bg-bg px-2.5 py-1 text-xs font-medium text-muted">
                {counts[collection.name] ?? '-'}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Site</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {singletons.map((singleton) => (
          <li key={singleton.name}>
            <Link
              to={`/s/${singleton.name}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-fg"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted">
                <Icon name={singleton.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-fg">{singleton.title}</span>
                <span className="block truncate text-xs text-muted">{singleton.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
