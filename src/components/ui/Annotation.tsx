import { cn } from '@/lib/cn'

/** Hand-drawn arrow, mirrored horizontally for the right-hand side. */
function Arrow({ flip }: { flip: boolean }) {
  return (
    <svg
      viewBox="0 0 90 56"
      className={cn('h-10 w-16 text-accent', flip && '-scale-x-100')}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6c26 0 58 9 74 38" />
      <path d="M70 32 79 46 65 49" />
    </svg>
  )
}

interface AnnotationProps {
  label: string
  caption?: string
  side: 'left' | 'right'
  className?: string
}

export function Annotation({ label, caption, side, className }: AnnotationProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        side === 'left' ? 'items-start text-left' : 'items-end text-right',
        className,
      )}
    >
      <span className="font-hand text-3xl leading-none text-accent md:text-4xl">{label}</span>
      {caption && <span className="max-w-[15ch] text-xs leading-snug text-muted">{caption}</span>}
      <Arrow flip={side === 'right'} />
    </div>
  )
}
