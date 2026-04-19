import { motion } from 'framer-motion'
import { Send, Zap, Calendar, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TiltCard } from '../components/TiltCard'

interface OfferCard {
  icon: LucideIcon
  emoji: string
  title: string
  description: string
  price?: string
  cta: string
  ctaHref: string
  highlight?: boolean
}

const offers: OfferCard[] = [
  {
    icon: Sparkles,
    emoji: '🟢',
    title: 'Безкоштовний аудит 30 хв',
    description: 'Оцінюю твоє ТЗ або ідею, пропоную стек, прикидаю бюджет.',
    cta: 'Записатися',
    ctaHref: 'https://t.me/serhii_builds',
  },
  {
    icon: Zap,
    emoji: '🔵',
    title: 'Прототип за 48 год',
    description: 'Робочий MVP в Telegram — одразу тестуєш.',
    price: 'Від $1 500',
    cta: 'Обговорити',
    ctaHref: 'https://t.me/serhii_builds',
    highlight: true,
  },
  {
    icon: Calendar,
    emoji: '🟣',
    title: 'Мене на тиждень — MVP',
    description: '5 робочих днів, повноцінний бот з деплоєм.',
    price: 'Від $4 000',
    cta: 'Забронювати',
    ctaHref: 'https://t.me/serhii_builds',
  },
]

export function Offer() {
  return (
    <section id="offer" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">Як почати</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Обери формат</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Від безкоштовного аудиту до тижневого спринту — підбираєш під бюджет і темп.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((o, i) => {
            const Icon = o.icon
            return (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <TiltCard className="h-full">
                  <div
                    className={`relative h-full glass-card rounded-2xl border bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 flex flex-col ${
                      o.highlight
                        ? 'border-[var(--color-accent-purple)]/40 ring-2 ring-[var(--color-accent-purple)]/50'
                        : 'border-white/10'
                    }`}
                  >
                    {o.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-3 py-0.5 text-xs font-medium text-white shadow-lg whitespace-nowrap">
                        Найпопулярніше
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden>
                        {o.emoji}
                      </span>
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-purple)]/20 to-[var(--color-accent-cyan)]/20 border border-white/10 text-[var(--color-accent-cyan)]">
                        <Icon size={18} />
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">{o.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{o.description}</p>
                    {o.price && (
                      <div className="mt-4 text-lg font-semibold bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent">
                        {o.price}
                      </div>
                    )}
                    <div className="mt-auto pt-6">
                      <a
                        href={o.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity ${
                          o.highlight
                            ? 'bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] text-white shadow-lg shadow-[var(--color-accent-purple)]/30 hover:opacity-90'
                            : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        <Send size={14} />
                        {o.cta}
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
