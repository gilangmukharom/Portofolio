import { useEffect, useState } from 'react'
import { api, ApiError } from '@/admin/lib/api'
import { useAuth } from '@/admin/lib/auth'
import { useToast } from '@/admin/lib/toast'

interface Session {
  id: string
  userAgent: string | null
  ip: string | null
  createdAt: string
  expiresAt: string
}

const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-fg focus:ring-2 focus:ring-fg/10'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const [currentPassword, setCurrent] = useState('')
  const [newPassword, setNext] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sessions, setSessions] = useState<Session[]>([])
  const toast = useToast()

  const loadSessions = async () => {
    try {
      setSessions(await api.get<Session[]>('/auth/sessions'))
    } catch {
      // Sessions are informational; failing to list them is not worth a toast.
    }
  }

  useEffect(() => {
    void loadSessions()
  }, [])

  const change = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrors({})
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword })
      toast.success('Password changed. Signing you out.')
      // The server revoked every session, so the current one is already dead.
      setTimeout(() => void logout(), 1200)
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.fieldErrors)
        toast.error(error.message)
      }
    }
  }

  const revoke = async (session: Session) => {
    try {
      await api.delete(`/auth/sessions/${session.id}`)
      toast.success('Session signed out')
      void loadSessions()
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not revoke that session')
    }
  }

  return (
    <div className="max-w-2xl">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-fg">Account</h1>
        <p className="mt-1 text-sm text-muted">
          Signed in as {user?.email} ({user?.role === 'ADMIN' ? 'Administrator' : 'Editor'}).
        </p>
      </header>

      <form onSubmit={change} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-fg">Change password</h2>

        <label htmlFor="current" className="mb-1.5 block text-sm font-medium text-fg">
          Current password
        </label>
        <input
          id="current"
          type="password"
          autoComplete="current-password"
          required
          value={currentPassword}
          onChange={(event) => setCurrent(event.target.value)}
          className={inputClass}
        />
        {errors.currentPassword && (
          <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>
        )}

        <label htmlFor="next" className="mb-1.5 mt-4 block text-sm font-medium text-fg">
          New password
        </label>
        <input
          id="next"
          type="password"
          autoComplete="new-password"
          required
          value={newPassword}
          onChange={(event) => setNext(event.target.value)}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-muted">
          At least 10 characters, with an uppercase letter and a number.
        </p>
        {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>}

        <button
          type="submit"
          className="mt-5 rounded-lg border border-fg bg-fg px-5 py-2 text-sm font-medium text-bg hover:bg-fg/90"
        >
          Change password
        </button>
      </form>

      <section className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-fg">Active sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-sm text-muted">No other sessions.</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((session) => (
              <li
                key={session.id}
                className="flex items-start justify-between gap-4 border-b border-line/70 pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-fg">{session.userAgent ?? 'Unknown device'}</p>
                  <p className="text-xs text-muted">
                    {session.ip ?? 'unknown address'} · started{' '}
                    {new Date(session.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void revoke(session)}
                  className="shrink-0 rounded border border-line px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-500/10"
                >
                  Sign out
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
