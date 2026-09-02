import { cn } from '@/lib/cn'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-elevated', className)} />
}

export function ArticleSkeleton() {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-line bg-surface p-5">
      <div className="flex-1 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <Skeleton className="h-20 w-20 shrink-0 rounded-xl md:h-28 md:w-28" />
    </div>
  )
}
