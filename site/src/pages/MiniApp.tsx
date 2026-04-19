import { useEffect, useState } from 'react'
import { FakeTelegramFrame } from '../components/FakeTelegramFrame'

interface Product {
  id: string
  name: string
  price: number
  emoji: string
}

const PRODUCTS: Product[] = [
  { id: 't1', name: 'Футболка чорна', price: 450, emoji: '👕' },
  { id: 't2', name: 'Футболка Winter', price: 550, emoji: '🧥' },
  { id: 'm1', name: 'Кружка керамічна', price: 280, emoji: '☕' },
  { id: 'm2', name: 'Кружка з принтом', price: 320, emoji: '🍵' },
  { id: 's1', name: 'Стікер-пак', price: 120, emoji: '🎨' },
  { id: 's2', name: 'Набір шопер', price: 680, emoji: '🛍️' },
]

function isInTelegram(): boolean {
  if (typeof window === 'undefined') return false
  return !!(window as unknown as { Telegram?: { WebApp?: unknown } }).Telegram?.WebApp
}

export function MiniApp() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [success, setSuccess] = useState(false)
  const inTg = isInTelegram()

  useEffect(() => {
    if (!inTg) return
    import('@twa-dev/sdk').then(({ default: WebApp }) => {
      WebApp.ready()
      WebApp.expand()
    })
  }, [inTg])

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id)
    return sum + (p?.price ?? 0) * qty
  }, 0)

  const pay = async () => {
    if (inTg) {
      const WebApp = (await import('@twa-dev/sdk')).default
      WebApp.sendData(JSON.stringify({ cart, total }))
    } else {
      setSuccess(true)
    }
  }

  const reset = () => {
    setCart({})
    setSuccess(false)
  }

  const content = (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Магазин TapToOrder</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))}
            className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/10 transition-colors"
          >
            <div className="text-2xl mb-1">{p.emoji}</div>
            <div className="text-sm font-medium text-white">{p.name}</div>
            <div className="text-xs text-white/60">{p.price} ⭐</div>
            {cart[p.id] && <div className="text-xs mt-1 text-cyan-400">×{cart[p.id]}</div>}
          </button>
        ))}
      </div>
      {total > 0 && !success && (
        <button
          onClick={pay}
          className="w-full rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] py-3 font-medium text-white"
        >
          Оплатити {total} ⭐
        </button>
      )}
      {success && (
        <div className="rounded-xl bg-green-500/20 border border-green-500/40 p-4 text-center text-white">
          ✅ Тестова оплата успішна!
          <br />
          <span className="text-xs text-white/60">Гроші не списуються — це демо.</span>
          <button
            onClick={reset}
            className="mt-3 block mx-auto text-xs text-white/60 underline hover:text-white/80"
          >
            Ще раз
          </button>
        </div>
      )}
      <p className="mt-4 text-xs text-white/40 text-center">
        Тестовий магазин — Telegram Stars у test-env, справжні гроші не списуються.
      </p>
    </div>
  )

  return inTg ? content : <FakeTelegramFrame>{content}</FakeTelegramFrame>
}
