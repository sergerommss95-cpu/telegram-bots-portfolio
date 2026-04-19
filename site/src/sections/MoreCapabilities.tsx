import { motion } from 'framer-motion'
import { Database, Mic, Gamepad2, Building2, ShieldCheck, Link as LinkIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Capability {
  icon: LucideIcon
  title: string
  description: string
}

const capabilities: Capability[] = [
  {
    icon: Database,
    title: 'CRM-інтеграція',
    description: 'HubSpot, Pipedrive, Bitrix24 — двосторонній sync, webhooks, карточки клієнтів',
  },
  {
    icon: Mic,
    title: 'Voice-асистент',
    description: 'Whisper для транскрипції, TTS для відповідей голосом',
  },
  {
    icon: Gamepad2,
    title: 'Групові ігри та розваги',
    description: 'Вікторини, рейтинги, рольові механіки в чатах до тисячі учасників',
  },
  {
    icon: Building2,
    title: 'Multi-tenant SaaS',
    description: 'Один бот — сотні клієнтів. Білінг, ізоляція даних, white-label',
  },
  {
    icon: ShieldCheck,
    title: 'Модерація AI',
    description: 'Детекція токсичності, спаму і NSFW через моделі класифікації',
  },
  {
    icon: LinkIcon,
    title: 'Реферальні системи',
    description: 'Трекінг, виплати, антифрод — готова інфраструктура афіліатів',
  },
]

export function MoreCapabilities() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">І ще</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Більше можливостей</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Запити, які виходять за рамки типових кейсів — ми робимо і таке.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-purple)]/20 to-[var(--color-accent-cyan)]/20 border border-white/10 text-[var(--color-accent-cyan)]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{cap.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{cap.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
