import { Link, NavLink } from 'react-router-dom'
import { useContent } from '@/content/ContentProvider'
import { cn } from '@/lib/cn'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const { profile, nav } = useContent()

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-lg">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8"
      >
        <Link
          to="/"
          className="text-sm font-bold tracking-tight transition-colors duration-300 hover:text-accent"
        >
          {profile.name}
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition duration-300 ease-soft',
                    isActive ? 'bg-elevated text-fg' : 'text-muted hover:text-fg',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition duration-300 ease-soft hover:bg-accent hover:text-accent-contrast sm:inline-flex"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  )
}
