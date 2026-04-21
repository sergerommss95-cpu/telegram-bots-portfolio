import type { CaseId } from '../data/types'

interface Bubble {
  role: 'bot' | 'user'
  text: string
}

/**
 * Static chat-preview SVGs for real/miniapp cases. Mirrors the simulator's
 * message bubble styling: bot left / glass, user right / cyan.
 */
const PREVIEWS: Partial<Record<CaseId, Bubble[]>> = {
  olivia: [
    { role: 'bot', text: '🌙 Ранок, Олено! Твоя карта дня — Сонце' },
    { role: 'user', text: 'Спасибі ❤️' },
    { role: 'bot', text: 'Деталі в VIP?' },
  ],
  taro: [
    { role: 'bot', text: 'Card 1: The Fool' },
    { role: 'user', text: 'Next?' },
    { role: 'bot', text: 'Card 2: Strength…' },
  ],
  repair: [
    { role: 'bot', text: 'Ваше замовлення #2941 готове ✨' },
    { role: 'user', text: 'Дякую!' },
  ],
  broadcaster: [
    { role: 'bot', text: '🎯 New signal: NFL Sunday, edge 4.2%' },
  ],
  taptoorder: [
    { role: 'bot', text: '🛒 Корзина: 3 товари • 730⭐' },
    { role: 'user', text: 'Оплатити' },
  ],
}

const WIDTH = 280
const HEIGHT = 160
const PAD_X = 12
const PAD_Y = 14
const BUBBLE_RADIUS = 10
const LINE_HEIGHT = 14
const FONT_SIZE = 11
const GAP = 8
const MAX_BUBBLE_W = WIDTH - PAD_X * 2 - 24 // leave some side margin

/**
 * Very rough width/wrap estimator — we don't need perfect kerning, just
 * "roughly fits inside the bubble". `~6px` per char at 11px is a reasonable
 * overestimate for Latin+Cyrillic mixed text.
 */
function wrap(text: string, maxPx: number): string[] {
  const avgCharW = 6
  const maxChars = Math.max(8, Math.floor(maxPx / avgCharW))
  if (text.length <= maxChars) return [text]
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const candidate = cur ? `${cur} ${w}` : w
    if (candidate.length > maxChars) {
      if (cur) {
        lines.push(cur)
        cur = w
      } else {
        // Single too-long word — hard slice.
        lines.push(w.slice(0, maxChars))
        cur = w.slice(maxChars)
      }
    } else {
      cur = candidate
    }
  }
  if (cur) lines.push(cur)
  return lines.slice(0, 2) // Cap at 2 lines per bubble for layout.
}

export function CaseCover({ id }: { id: CaseId }) {
  const bubbles = PREVIEWS[id]
  if (!bubbles) return null

  // Compute vertical layout first.
  let y = PAD_Y
  const laidOut = bubbles.map((b) => {
    const lines = wrap(b.text, MAX_BUBBLE_W - 20)
    const bubbleH = lines.length * LINE_HEIGHT + 10
    const estWidth = Math.min(
      MAX_BUBBLE_W,
      Math.max(...lines.map((l) => l.length * 6)) + 20,
    )
    const entry = { ...b, lines, bubbleH, estWidth, y }
    y += bubbleH + GAP
    return entry
  })

  // Scale down if we overflow the height (rare — most previews are 2-3 short bubbles).
  const totalH = y + PAD_Y - GAP
  const vbH = Math.max(HEIGHT, totalH)

  return (
    <div
      aria-hidden
      className="w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0e1621] to-[#121a26]"
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        role="img"
      >
        {laidOut.map((b, i) => {
          const isUser = b.role === 'user'
          const x = isUser ? WIDTH - PAD_X - b.estWidth : PAD_X
          const fill = isUser ? 'rgba(6, 182, 212, 0.55)' : 'rgba(255, 255, 255, 0.10)'
          const stroke = isUser ? 'rgba(6, 182, 212, 0.35)' : 'rgba(255, 255, 255, 0.12)'
          return (
            <g key={i}>
              <rect
                x={x}
                y={b.y}
                width={b.estWidth}
                height={b.bubbleH}
                rx={BUBBLE_RADIUS}
                ry={BUBBLE_RADIUS}
                fill={fill}
                stroke={stroke}
              />
              {b.lines.map((line, li) => (
                <text
                  key={li}
                  x={x + 10}
                  y={b.y + 14 + li * LINE_HEIGHT}
                  fontSize={FONT_SIZE}
                  fill="white"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
