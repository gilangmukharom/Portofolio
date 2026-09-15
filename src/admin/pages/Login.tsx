import { useState } from 'react'
import { ApiError } from '@/admin/lib/api'
import { useAuth } from '@/admin/lib/auth'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(email, password)
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Could not sign in')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <h1 className="text-lg font-bold text-fg">Portfolio CMS</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage the site's content.</p>

        <label htmlFor="email" className="mt-6 block text-sm font-medium text-fg">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-fg focus:ring-2 focus:ring-fg/10"
        />

        <label htmlFor="password" className="mt-4 block text-sm font-medium text-fg">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-fg focus:ring-2 focus:ring-fg/10"
        />

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-lg border border-fg bg-fg py-2.5 text-sm font-medium text-bg hover:bg-fg/90 disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
