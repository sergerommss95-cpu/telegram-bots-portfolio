import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Complexity } from '../data/types'

interface LadderBot {
  id: string
  name: string
  complexity: Complexity
}

interface Props {
  bots: LadderBot[]
}

const TIERS: { level: Complexity; label: string }[] = [
  { level: 1, label: 'Basic' },
  { level: 2, label: 'Intermediate' },
  { level: 3, label: 'Advanced' },
  { level: 4, label: 'Production' },
]

export function ComplexityLadder({ bots }: Props) {
  const grouped: Record<Complexity, LadderBot[]> = { 1: [], 2: [], 3: [], 4: [] }
  bots.forEach((b) => grouped[b.complexity].push(b))

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 25%'],
  })
  // Desktop horizontal line width: 0% -> 100%
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  // Mobile vertical line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="w-full">
      {/* Desktop: horizontal track */}
      <div className="hidden md:block">
        <div className="relative grid grid-cols-4 gap-4">
          {/* Static base line (dim) */}
          <div
            className="pointer-events-none absolute top-[calc(50%+28px)] left-[12.5%] right-[12.5%] -translate-y-1/2 h-px bg-white/10"
            aria-hidden
          />
          {/* Animated gradient fill */}
          <motion.div
            aria-hidden
            style={{ width: lineWidth }}
            className="pointer-events-none absolute top-[calc(50%+28px)] left-[12.5%] -translate-y-1/2 h-px bg-gradient-to-r from-[var(--color-accent-purple)] via-white/60 to-[var(--color-accent-cyan)] max-w-[75%] shadow-[0_0_8px_rgba(139,92,246,0.6)]"
          />
          {TIERS.map((tier) => (
            <div key={tier.level} className="relative flex flex-col items-center gap-3">
              {/* Bots above */}
              <div className="h-28 flex flex-col items-center justify-end gap-1 min-h-0">
                {grouped[tier.level].map((bot) => (
                  <div
                    key={bot.id}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur"
                  >
                    {bot.name}
                  </div>
                ))}
              </div>
              {/* Dot */}
              <div
                className={`relative z-10 h-5 w-5 rounded-full border-2 shadow-lg ${
                  tier.level === 1
                    ? 'bg-white/30 border-white/30'
                    : 'bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] border-white/40 shadow-[var(--color-accent-purple)]/30'
                }`}
              />
              {/* Label */}
              <div className="text-xs uppercase tracking-wider text-white/60">{tier.label}</div>
              <div className="text-[10px] text-white/30">Level {tier.level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden relative flex flex-col gap-5">
        {/* Static base vertical line */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10"
        />
        {/* Animated gradient fill */}
        <motion.div
          aria-hidden
          style={{ height: lineHeight }}
          className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-[var(--color-accent-purple)] via-white/60 to-[var(--color-accent-cyan)] max-h-[calc(100%-16px)]"
        />
        {TIERS.map((tier) => (
          <div key={tier.level} className="flex gap-4 items-start relative">
            <div className="flex flex-col items-center gap-1 pt-1 z-10">
              <div
                className={`h-4 w-4 rounded-full border-2 ${
                  tier.level === 1
                    ? 'bg-white/30 border-white/30'
                    : 'bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] border-white/40'
                }`}
              />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-white/60">{tier.label}</div>
              <div className="text-[10px] text-white/30">Level {tier.level}</div>
              {grouped[tier.level].length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {grouped[tier.level].map((bot) => (
                    <span
                      key={bot.id}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80"
                    >
                      {bot.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
