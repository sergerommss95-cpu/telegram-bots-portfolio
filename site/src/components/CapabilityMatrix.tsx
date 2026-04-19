import { useState } from 'react'
import { features, coverage } from '../data/capabilities'
import { cases } from '../data/cases'
import type { CaseId } from '../data/types'

function CoverageCell({ value }: { value: 'full' | 'partial' | 'none' }) {
  if (value === 'full') {
    return (
      <span className="text-emerald-400" aria-label="full coverage">
        ✓
      </span>
    )
  }
  if (value === 'partial') {
    return (
      <span className="text-amber-400" aria-label="partial coverage">
        ◐
      </span>
    )
  }
  return (
    <span className="text-white/20" aria-label="no coverage">
      —
    </span>
  )
}

export function CapabilityMatrix() {
  const [hover, setHover] = useState<{ row: string | null; col: CaseId | null }>({
    row: null,
    col: null,
  })

  const clear = () => setHover({ row: null, col: null })

  return (
    <div
      className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
      onMouseLeave={clear}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-20 bg-[#0f1220] text-left px-4 py-3 text-xs uppercase tracking-wider text-white/60 border-b border-white/10 min-w-[200px]"
            >
              Фіча
            </th>
            {cases.map((c) => {
              const active = hover.col === c.id
              return (
                <th
                  key={c.id}
                  scope="col"
                  className={`border-b border-white/10 px-2 py-3 text-xs font-medium align-bottom transition-colors ${
                    active
                      ? 'text-[var(--color-accent-cyan)]'
                      : 'text-white/70'
                  }`}
                >
                  {/* Desktop rotated, mobile horizontal via media */}
                  <div className="hidden md:block">
                    <div
                      className="whitespace-nowrap origin-bottom-left"
                      style={{
                        transform: 'rotate(-45deg) translateX(8px)',
                        width: 0,
                        height: '120px',
                        display: 'inline-block',
                      }}
                    >
                      {c.name}
                    </div>
                  </div>
                  <div className="md:hidden whitespace-nowrap">{c.name}</div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {features.map((feat, i) => {
            const rowActive = hover.row === feat.id
            return (
              <tr
                key={feat.id}
                className={`transition-colors ${
                  rowActive
                    ? 'bg-white/5'
                    : i % 2 === 0
                      ? 'bg-white/[0.02]'
                      : ''
                }`}
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-[#0f1220] text-left px-4 py-2.5 text-white/80 font-normal border-b border-white/5"
                >
                  {feat.labelUa}
                </th>
                {cases.map((c) => {
                  const value = coverage[c.id as CaseId]?.[feat.id] ?? 'none'
                  return (
                    <td
                      key={c.id}
                      onMouseEnter={() => setHover({ row: feat.id, col: c.id })}
                      className="px-2 py-2.5 text-center border-b border-white/5 cursor-crosshair"
                    >
                      <CoverageCell value={value} />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
