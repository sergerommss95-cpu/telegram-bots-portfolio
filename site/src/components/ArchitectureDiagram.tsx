import { ArrowRight } from 'lucide-react'

interface Props {
  nodes: string[]
}

/**
 * Horizontal flow diagram: glass-styled node boxes connected by gradient arrows.
 * On narrow viewports boxes wrap to 2-3 rows automatically; arrows stay
 * between siblings on the same row (flex-wrap).
 */
export function ArchitectureDiagram({ nodes }: Props) {
  if (nodes.length === 0) return null
  return (
    <div
      aria-label="Architecture diagram"
      className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
    >
      {nodes.map((node, i) => (
        <div key={`${node}-${i}`} className="flex items-center gap-2 md:gap-3">
          <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur px-3 py-2 text-xs md:text-sm font-medium text-white/90 shadow-lg shadow-black/20">
            {node}
          </div>
          {i < nodes.length - 1 && (
            <span
              aria-hidden
              className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)]"
            >
              <ArrowRight
                size={16}
                className="stroke-[var(--color-accent-cyan)]"
                strokeWidth={2.5}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
