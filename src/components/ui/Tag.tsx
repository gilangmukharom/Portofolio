import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
