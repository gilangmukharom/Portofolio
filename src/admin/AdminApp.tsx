import { useEffect } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/admin/lib/auth'
import { ToastProvider } from '@/admin/lib/toast'
import { collections, singletons } from '@/admin/config/resources'
import { Icon } from '@/admin/components/Icon'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import Login from '@/admin/pages/Login'
import Dashboard from '@/admin/pages/Dashboard'
import CollectionPage from '@/admin/pages/CollectionPage'
import SingletonPage from '@/admin/pages/SingletonPage'
import MediaPage from '@/admin/pages/MediaPage'
import UsersPage from '@/admin/pages/UsersPage'
import AccountPage from '@/admin/pages/AccountPage'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
    isActive ? 'bg-elevated font-semibold text-fg' : 'text-muted hover:text-fg'
  }`

function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-full shrink-0 border-b border-line bg-surface md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col gap-6 p-5 md:sticky md:top-0 md:overflow-y-auto">
        <div className="flex items-center justify-between">
          <NavLink to="/admin" className="text-sm font-bold text-fg">
            Portfolio CMS
          </NavLink>
          <ThemeToggle />
        </div>

        <nav className="flex-1 space-y-6">
          <div>
            <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Content
            </p>
            {collections.map((collection) => (
              <NavLink
                key={collection.name}
                to={`/admin/c/${collection.name}`}
                className={linkClass}
              >
                <Icon name={collection.icon} />
                {collection.title}
              </NavLink>
            ))}
          </div>

          <div>
            <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Site
            </p>
            {singletons.map((singleton) => (
              <NavLink key={singleton.name} to={`/admin/s/${singleton.name}`} className={linkClass}>
                <Icon name={singleton.icon} />
                {singleton.title}
              </NavLink>
            ))}
            <NavLink to="/admin/media" className={linkClass}>
              <Icon name="image" />
              Media
            </NavLink>
            {user?.role === 'ADMIN' && (
              <NavLink to="/admin/users" className={linkClass}>
                <Icon name="users" />
                Users
              </NavLink>
            )}
          </div>
        </nav>

        <div className="border-t border-line pt-4">
          <NavLink to="/admin/account" className={linkClass}>
            <Icon name="user" />
            {user?.name}
          </NavLink>
          <button
            type="button"
            onClick={() => void logout()}
            className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-muted transition hover:text-fg"
          >
            <Icon name="signOut" />
            Sign out
          </button>
          <a
            href="/"
            className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted transition hover:text-fg"
          >
            <Icon name="arrowRight" />
            View the site
          </a>
        </div>
      </div>
    </aside>
  )
}

function AdminShell() {
  const { status } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = 'Portfolio CMS'
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-sm text-muted">
        Checking your session…
      </div>
    )
  }

  if (status === 'anonymous') return <Login />

  return (
    <div className="flex min-h-screen flex-col bg-bg md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 md:p-10">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="c/:name" element={<CollectionPage />} />
          <Route path="s/:name" element={<SingletonPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

/**
 * Mounted lazily under /admin, so none of this code is downloaded by a visitor
 * who only ever reads the portfolio.
 */
export default function AdminApp() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AdminShell />
      </AuthProvider>
    </ToastProvider>
  )
}
