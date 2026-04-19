import { motion } from 'framer-motion'
import type { PricingPackage } from '../data/pricing'
import { TiltCard } from './TiltCard'

interface Props {
  pkg: PricingPackage
}

export function PricingCard({ pkg }: Props) {
  const highlight = pkg.highlight
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <div
          className={`relative h-full glass-card rounded-2xl border bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 flex flex-col ${
            highlight
              ? 'border-[var(--color-accent-purple)]/40 ring-2 ring-[var(--color-accent-purple)]/50'
              : 'border-white/10'
          }`}
        >
          {highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-3 py-0.5 text-xs font-medium text-white shadow-lg">
              Популярне
            </span>
          )}
          <div className="text-xs uppercase tracking-wider text-white/50">{pkg.subtitle}</div>
          <div className="mt-1 text-2xl font-bold text-white">{pkg.name}</div>
          <div className="mt-4 text-lg text-white">{pkg.uah}</div>
          <div className="text-sm text-white/60">{pkg.usd}</div>
          <div className="mt-1 text-xs text-white/50">Термін: {pkg.timeline}</div>
          <ul className="mt-5 space-y-1.5 text-sm text-white/80">
            {pkg.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-[var(--color-accent-cyan)]">·</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </motion.div>
  )
}
