import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  max?: number // max tilt in degrees
}

function shouldDisable() {
  if (typeof window === 'undefined') return true
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hover = window.matchMedia('(hover: hover)').matches
  return reduce || !hover
}

/**
 * Wraps children in a div that tilts on pointer move.
 * Disabled automatically on touch devices and when prefers-reduced-motion is set.
 * Keeps a wrapper so transforms don't fight with inner motion components.
 */
export function TiltCard({ children, className = '', max = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const springRx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.4 })
  const springRy = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.4 })
  const rotateX = useTransform(springRx, (v) => `${v}deg`)
  const rotateY = useTransform(springRy, (v) => `${v}deg`)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldDisable()) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height // 0..1
    // Invert so cursor pulls the card
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
