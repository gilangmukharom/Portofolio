import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ease-soft disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-accent hover:text-accent-contrast',
  ghost: 'border border-line text-fg hover:border-fg hover:-translate-y-0.5',
}

interface CommonProps {
  variant?: Variant
  className?: string
  children: ReactNode
}

export function ButtonLink({
  to,
  variant = 'primary',
  className,
  children,
}: CommonProps & { to: string }) {
  return (
    <Link to={to} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  )
}

export function ButtonAnchor({
  variant = 'primary',
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </a>
  )
}
