import { motion } from 'framer-motion'

const ORBS = [
  { top: '10%', left: '20%', color: 'var(--color-accent-purple)' },
  { top: '60%', left: '70%', color: 'var(--color-accent-cyan)' },
  { top: '40%', left: '50%', color: '#ec4899' },
]

export function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {ORBS.map((o, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            top: o.top,
            left: o.left,
            backgroundColor: o.color,
            width: 500,
            height: 500,
            filter: 'blur(120px)',
            opacity: 0.25,
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  )
}
