import { useEffect, useRef, useState } from 'react'
import { ChatEvent } from '../data/types'

interface Props {
  script: ChatEvent[]
  botName: string
  autoplay?: boolean
  onComplete?: () => void
}

interface RenderedMsg {
  role: 'bot' | 'user'
  type: 'text' | 'image' | 'payment'
  text?: string
  src?: string
  caption?: string
  product?: string
  price?: string
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export function TelegramChatSim({ script, botName, autoplay = true, onComplete }: Props) {
  const [messages, setMessages] = useState<RenderedMsg[]>([])
  const [pending, setPending] = useState<ChatEvent | null>(null)
  const [typing, setTyping] = useState(false)
  const pointer = useRef(0)
  const completed = useRef(false)

  const reduce = prefersReducedMotion()

  useEffect(() => {
    if (!autoplay) return
    let cancelled = false

    const run = async () => {
      while (pointer.current < script.length && !cancelled) {
        const ev = script[pointer.current]

        // Label: skip, pure anchor.
        if (ev.type === 'label') {
          pointer.current++
          continue
        }

        // Pause points: buttons (bot) and choice (user).
        if (ev.type === 'buttons' || ev.type === 'choice') {
          setPending(ev)
          return
        }

        if (ev.type === 'typing') {
          setTyping(true)
          await sleep(reduce ? 0 : ev.durationMs)
          if (cancelled) return
          setTyping(false)
          pointer.current++
          continue
        }

        if (ev.type === 'text') {
          const rawDelay = ev.delayMs ?? 400
          const delay = reduce ? Math.min(rawDelay, 50) : rawDelay
          await sleep(delay)
          if (cancelled) return
          setMessages((m) => [...m, { role: ev.role, type: 'text', text: ev.text }])
          pointer.current++
          continue
        }

        if (ev.type === 'image') {
          const delay = reduce ? 50 : 400
          await sleep(delay)
          if (cancelled) return
          setMessages((m) => [...m, { role: 'bot', type: 'image', src: ev.src, caption: ev.caption }])
          pointer.current++
          continue
        }

        if (ev.type === 'payment') {
          const delay = reduce ? 50 : 400
          await sleep(delay)
          if (cancelled) return
          setMessages((m) => [...m, { role: 'bot', type: 'payment', product: ev.product, price: ev.price }])
          pointer.current++
          continue
        }

        // Unknown event type — advance to avoid infinite loop.
        pointer.current++
      }

      if (!cancelled && !completed.current && pointer.current >= script.length) {
        completed.current = true
        onComplete?.()
      }
    }

    run()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])

  const handleChoice = (label: string, jumpTo: string) => {
    setMessages((m) => [...m, { role: 'user', type: 'text', text: label }])
    const idx = script.findIndex((e) => e.id === jumpTo)
    if (idx === -1) {
      console.warn(`[TelegramChatSim] jumpTo "${jumpTo}" did not match any event id. Ending playback.`)
      pointer.current = script.length
      if (!completed.current) {
        completed.current = true
        onComplete?.()
      }
    } else {
      pointer.current = idx
    }
    setPending(null)
  }

  return (
    <div
      className="flex flex-col gap-2 p-4 bg-[#0e1621] rounded-2xl max-w-md"
      role="log"
      aria-live="polite"
      aria-label={`Chat with ${botName}`}
    >
      {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
      {typing && <TypingDots />}
      {pending && pending.type === 'buttons' && (
        <div className="flex flex-wrap gap-2">
          {pending.inline.map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => handleChoice(b.label, b.jumpTo)}
              className="rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
      {pending && pending.type === 'choice' && pending.role === 'user' && (
        <button
          type="button"
          onClick={() => handleChoice(pending.label, pending.jumpTo)}
          className="self-end rounded-2xl bg-[var(--color-accent-cyan)]/80 px-3 py-1 text-sm text-white"
        >
          {pending.label}
        </button>
      )}
    </div>
  )
}

function MessageBubble({ msg }: { msg: RenderedMsg }) {
  const isUser = msg.role === 'user'
  const align = isUser ? 'self-end bg-[var(--color-accent-cyan)]/80' : 'self-start bg-white/10'
  if (msg.type === 'payment') {
    return (
      <div className={`rounded-2xl px-3 py-2 text-sm ${align} max-w-[80%]`}>
        <div className="font-medium text-white">{msg.product}</div>
        <div className="text-xs text-white/70">⭐ {msg.price}</div>
      </div>
    )
  }
  if (msg.type === 'image') {
    return (
      <div className={`rounded-2xl overflow-hidden ${align} max-w-[80%]`}>
        <img src={msg.src} alt="" className="w-full" />
        {msg.caption && <div className="p-2 text-xs text-white/80">{msg.caption}</div>}
      </div>
    )
  }
  return (
    <div className={`rounded-2xl px-3 py-2 text-sm text-white ${align} max-w-[80%] whitespace-pre-wrap`}>
      {msg.text}
    </div>
  )
}

function TypingDots() {
  return (
    <div className="self-start flex gap-1 bg-white/10 rounded-2xl px-3 py-2" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  )
}
