import { useEffect, useRef, useState } from 'react'

interface RevealOptions {
  /** Fire once the element is this far into the viewport. */
  rootMargin?: string
  threshold?: number
}

/**
 * Single scroll-reveal primitive replacing the per-view keyframes the Vue site
 * duplicated. Degrades to "always visible" when IntersectionObserver is absent.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.1,
}: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRevealed(true)
        observer.disconnect()
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, revealed, className: revealed ? 'reveal reveal-in' : 'reveal' }
}
