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

  return (
    <div className="w-full">
      {/* Desktop: horizontal track */}
      <div className="hidden md:block">
        <div className="relative grid grid-cols-4 gap-4">
          {/* Connecting line */}
          <div
            className="pointer-events-none absolute top-1/2 left-[12.5%] right-[12.5%] -translate-y-1/2 h-px bg-gradient-to-r from-[var(--color-accent-purple)]/40 via-white/20 to-[var(--color-accent-cyan)]/40"
            aria-hidden
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
      <div className="md:hidden flex flex-col gap-5">
        {TIERS.map((tier) => (
          <div key={tier.level} className="flex gap-4 items-start">
            <div className="flex flex-col items-center gap-1 pt-1">
              <div
                className={`h-4 w-4 rounded-full border-2 ${
                  tier.level === 1
                    ? 'bg-white/30 border-white/30'
                    : 'bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] border-white/40'
                }`}
              />
              {tier.level < 4 && <div className="w-px h-8 bg-white/10" aria-hidden />}
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
