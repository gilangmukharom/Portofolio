import { useEffect, useRef, useState } from 'react'

/**
 * Project previews are animated GIFs — several megabytes each. Holding the `src`
 * back until the card is near the viewport keeps the initial page weight small
 * instead of downloading every preview on load.
 */
export function useLazyMedia<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      // Start fetching slightly before the card scrolls into view.
      { rootMargin: '300px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, shouldLoad }
}
