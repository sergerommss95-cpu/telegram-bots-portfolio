import { Complexity } from '../data/types'

const LABELS: Record<Complexity, string> = {
  1: 'Basic',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Production',
}

export function ComplexityBadge({ level }: { level: Complexity }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-white/70">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            data-filled={i <= level}
            className={`h-2 w-2 rounded-full ${i <= level ? 'bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)]' : 'bg-white/15'}`}
          />
        ))}
      </div>
      <span>{LABELS[level]}</span>
    </div>
  )
}
