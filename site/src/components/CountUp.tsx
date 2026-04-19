import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animates an integer from `from` to `to` once when the element enters view.
 * - Respects prefers-reduced-motion (jumps straight to `to`).
 * - Uses requestAnimationFrame, cleans up on unmount.
 */
export function CountUp({ from = 0, to, duration = 1.4, suffix = '', prefix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [value, setValue] = useState(from)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    if (prefersReducedMotion()) {
      setValue(to)
      return
    }

    const start = performance.now()
    const total = duration * 1000
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / total, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, from, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('uk-UA')}
      {suffix}
    </span>
  )
}
