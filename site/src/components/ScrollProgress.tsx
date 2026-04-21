import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Tiny gradient bar pinned to the top of the viewport, widening from
 * 0 to 100% as the user scrolls through the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)]"
    />
  )
}
