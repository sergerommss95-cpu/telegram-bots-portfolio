import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  interactive?: boolean
  className?: string
  onClick?: () => void
}

export function GlassCard({ children, interactive = false, className = '', onClick }: Props) {
  const base = 'glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50'
  const hover = interactive
    ? 'transition-transform hover:-translate-y-1 hover:border-white/20 cursor-pointer'
    : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={`${base} ${hover} ${className}`}
    >
      {children}
    </motion.div>
  )
}
