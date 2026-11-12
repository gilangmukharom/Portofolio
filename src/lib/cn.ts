type ClassValue = string | false | null | undefined

/** Minimal class joiner - no need for clsx at this size. */
export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ')
}
