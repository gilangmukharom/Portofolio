import { useCallback, useEffect, useState } from 'react'
import { api, ApiError } from '@/admin/lib/api'
import { useAuth } from '@/admin/lib/auth'
import { useToast } from '@/admin/lib/toast'

interface UserRow {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'EDITOR'
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
}

const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-fg focus:ring-2 focus:ring-fg/10'

export default function UsersPage() {
  const { user: current } = useAuth()
  const [rows, setRows] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ email: '', name: '', password: '', role: 'EDITOR' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const toast = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setRows(await api.get<UserRow[]>('/admin/users'))
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not load users')
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const create = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrors({})
    try {
      await api.post('/admin/users', form)
      setForm({ email: '', name: '', password: '', role: 'EDITOR' })
      toast.success('User created')
      void load()
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.fieldErrors)
        toast.error(error.message)
      }
    }
  }

  const toggleActive = async (row: UserRow) => {
    try {
      await api.patch(`/admin/users/${row.id}`, { isActive: !row.isActive })
      toast.success(row.isActive ? 'Account disabled' : 'Account enabled')
      void load()
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not update')
    }
  }

  const remove = async (row: UserRow) => {
    if (!confirm(`Delete ${row.email}?`)) return
    try {
      await api.delete(`/admin/users/${row.id}`)
      toast.success('User deleted')
      void load()
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not delete')
    }
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-bold text-fg">Users</h1>
        <p className="mt-1 text-sm text-muted">
          Editors can change content. Administrators can also manage accounts.
        </p>
      </header>

      <form onSubmit={create} className="mb-8 rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-fg">Invite someone</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fg" htmlFor="new-name">
              Name
            </label>
            <input
              id="new-name"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className={inputClass}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fg" htmlFor="new-email">
              Email
            </label>
            <input
              id="new-email"
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className={inputClass}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fg" htmlFor="new-password">
              Temporary password
            </label>
            <input
              id="new-password"
              type="text"
              required
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-muted">
              At least 10 characters with an uppercase letter and a number.
            </p>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fg" htmlFor="new-role">
              Role
            </label>
            <select
              id="new-role"
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
              className={inputClass}
            >
              <option value="EDITOR">Editor</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 rounded-lg border border-fg bg-fg px-5 py-2 text-sm font-medium text-bg hover:bg-fg/90"
        >
          Create user
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-bg text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3 text-fg">
                    {row.name}
                    {row.id === current?.id && (
                      <span className="ml-2 text-xs text-muted">(you)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{row.email}</td>
                  <td className="px-4 py-3 text-fg">
                    {row.role === 'ADMIN' ? 'Administrator' : 'Editor'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={row.isActive ? 'text-emerald-500' : 'text-red-500'}>
                      {row.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {/* Disabling or deleting your own account would lock you out. */}
                      <button
                        type="button"
                        disabled={row.id === current?.id}
                        onClick={() => void toggleActive(row)}
                        className="rounded border border-line px-2.5 py-1 text-xs font-medium text-fg hover:bg-elevated disabled:opacity-30"
                      >
                        {row.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        type="button"
                        disabled={row.id === current?.id}
                        onClick={() => void remove(row)}
                        className="rounded border border-line px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-500/10 disabled:opacity-30"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
