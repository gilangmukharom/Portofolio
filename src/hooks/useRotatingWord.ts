import { useEffect, useState } from 'react'

const TYPE_SPEED = 90
const DELETE_SPEED = 45
const HOLD_AFTER_TYPED = 1800
const HOLD_AFTER_DELETED = 320

/**
 * Types one word at a time out of `words`, replacing the Vue version's
 * recursive setTimeout that also rewrote innerHTML on every tick.
 *
 * All cursor state lives in the effect closure rather than refs, so React's
 * StrictMode double-invocation can't advance the animation twice per tick.
 */
export function useRotatingWord(words: readonly string[]) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (words.length === 0) return

    // Respect the OS setting: show the first word and stop.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }

    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    let wordIndex = 0
    let charCount = 0
    let deleting = false

    const tick = () => {
      if (cancelled) return

      const full = words[wordIndex % words.length]
      charCount += deleting ? -1 : 1
      setText(full.slice(0, charCount))

      let delay = deleting ? DELETE_SPEED : TYPE_SPEED
      if (!deleting && charCount === full.length) {
        deleting = true
        delay = HOLD_AFTER_TYPED
      } else if (deleting && charCount === 0) {
        deleting = false
        wordIndex += 1
        delay = HOLD_AFTER_DELETED
      }

      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, TYPE_SPEED)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [words])

  return text
}
