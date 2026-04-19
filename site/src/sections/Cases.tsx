import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'
import type { Case, ChatEvent } from '../data/types'
import { cases } from '../data/cases'
import { ComplexityBadge } from '../components/ComplexityBadge'
import { StackBadge } from '../components/StackBadge'
import { BotPreviewModal } from '../components/BotPreviewModal'
import { QRCode } from '../components/QRCode'
import { TelegramChatSim } from '../components/TelegramChatSim'

const CATEGORY_ICONS: Record<string, string> = {
  'AI-астрологія': '🔮',
  Таро: '🃏',
  'Бізнес-процеси': '👔',
  Розсилки: '📡',
  'Mini App / E-commerce': '🛍️',
  'E-commerce': '🛒',
  Booking: '📅',
  Ігри: '🎮',
  'AI Photo': '🖼️',
  Модерація: '🛡️',
  Підтримка: '🎧',
  'Voice AI': '🎙️',
  Referral: '🔗',
}

const scriptLoaders: Record<string, () => Promise<ChatEvent[]>> = {
  shop: () => import('../scripts/shop').then((m) => m.shopScript),
  bookit: () => import('../scripts/bookit').then((m) => m.bookitScript),
  quiz: () => import('../scripts/quiz').then((m) => m.quizScript),
  photo: () => import('../scripts/photo').then((m) => m.photoScript),
  guard: () => import('../scripts/guard').then((m) => m.guardScript),
  support: () => import('../scripts/support').then((m) => m.supportScript),
  voice: () => import('../scripts/voice').then((m) => m.voiceScript),
  ref: () => import('../scripts/ref').then((m) => m.refScript),
}

function statusLabel(c: Case) {
  if (c.kind === 'real') return 'Production'
  if (c.kind === 'miniapp') return 'Live'
  return 'Demo'
}

function ctaLabel(c: Case) {
  if (c.kind === 'real') return 'Open Telegram'
  if (c.kind === 'miniapp') return 'Open Mini App'
  return 'Try demo'
}

interface CardProps {
  c: Case
  onClick: () => void
  featured?: boolean
}

function CaseCard({ c, onClick, featured }: CardProps) {
  const icon = CATEGORY_ICONS[c.category] ?? '🤖'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className={`group text-left glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 hover:border-white/20 transition-colors cursor-pointer ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {icon}
          </span>
          <div>
            <div className="text-xs uppercase tracking-wider text-white/50">{c.category}</div>
            <h3 className="mt-0.5 text-lg font-semibold text-white">{c.name}</h3>
          </div>
        </div>
        <ComplexityBadge level={c.complexity} />
      </div>

      <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.stack.slice(0, 4).map((s) => (
          <StackBadge key={s} name={s} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`text-xs uppercase tracking-wider ${
            c.kind === 'real'
              ? 'text-emerald-400'
              : c.kind === 'miniapp'
                ? 'text-cyan-400'
                : 'text-white/50'
          }`}
        >
          {statusLabel(c)}
        </span>
        <span className="inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-white transition-colors">
          {c.kind === 'simulator' ? <Play size={14} /> : <ExternalLink size={14} />}
          {ctaLabel(c)}
          <span aria-hidden>→</span>
        </span>
      </div>
    </motion.button>
  )
}

interface ModalContentProps {
  c: Case
  openKey: number
}

function RealContent({ c }: { c: Case }) {
  const url = c.realBot?.telegramUrl
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <h3 className="text-2xl font-bold text-white">{c.name}</h3>
      <p className="text-sm text-white/70">{c.tagline}</p>
      {url ? (
        <>
          <div className="rounded-xl bg-white/5 p-4">
            <QRCode link={url} size={180} />
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-5 py-2.5 text-sm font-medium text-white"
          >
            <ExternalLink size={14} />
            Відкрити в Telegram
          </a>
        </>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-white/70">
          Полягає в закритому каналі
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-1.5 pt-2">
        {c.stack.map((s) => (
          <StackBadge key={s} name={s} />
        ))}
      </div>
    </div>
  )
}

function SimulatorContent({ c, openKey }: ModalContentProps) {
  const [script, setScript] = useState<ChatEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setScript(null)
    setError(null)
    const loader = c.scriptName ? scriptLoaders[c.scriptName] : undefined
    if (!loader) {
      setError('Сценарій не знайдено')
      return
    }
    loader()
      .then((s) => {
        if (!cancelled) setScript(s)
      })
      .catch(() => {
        if (!cancelled) setError('Не вдалося завантажити сценарій')
      })
    return () => {
      cancelled = true
    }
  }, [c.scriptName])

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-xl font-bold text-white">{c.name}</h3>
        <p className="mt-1 text-sm text-white/60">{c.tagline}</p>
      </div>
      {error && <div className="text-sm text-red-400">{error}</div>}
      {!script && !error && (
        <div className="text-sm text-white/50">Завантажуємо сценарій…</div>
      )}
      {script && (
        <TelegramChatSim
          key={`${c.id}-${openKey}`}
          script={script}
          botName={c.name}
        />
      )}
    </div>
  )
}

function MiniAppContent({ c }: { c: Case }) {
  const url = c.realBot?.telegramUrl
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h3 className="text-2xl font-bold text-white">{c.name}</h3>
      <p className="text-sm text-white/70">{c.tagline}</p>
      {url && (
        <div className="rounded-xl bg-white/5 p-4">
          <QRCode link={url} size={140} />
        </div>
      )}
      <iframe
        src="/mini-app"
        title={`${c.name} Mini App`}
        className="w-full h-[600px] rounded-2xl border border-white/10 bg-[#0e1621]"
      />
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
        >
          <ExternalLink size={14} />
          Відкрити в Telegram
        </a>
      )}
    </div>
  )
}

export function Cases() {
  const [selected, setSelected] = useState<Case | null>(null)
  const [openCounter, setOpenCounter] = useState(0)

  const open = (c: Case) => {
    setSelected(c)
    setOpenCounter((n) => n + 1)
  }

  const close = () => setSelected(null)

  return (
    <section id="cases" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">Портфоліо</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">13 кейсів</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            4 production-боти, 1 Mini App та 8 інтерактивних симуляторів — клікай по будь-якому, щоб відкрити.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <CaseCard
              key={c.id}
              c={c}
              onClick={() => open(c)}
              // Make the very first real bot (Olivia) a featured 2-col card on md+
              featured={i === 0}
            />
          ))}
        </div>
      </div>

      <BotPreviewModal
        open={!!selected}
        onClose={close}
        title={selected ? selected.name : ''}
      >
        {selected?.kind === 'real' && <RealContent c={selected} />}
        {selected?.kind === 'simulator' && (
          <SimulatorContent c={selected} openKey={openCounter} />
        )}
        {selected?.kind === 'miniapp' && <MiniAppContent c={selected} />}
      </BotPreviewModal>
    </section>
  )
}
