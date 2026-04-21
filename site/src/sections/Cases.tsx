import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Play, Quote } from 'lucide-react'
import type { Case, CaseStudy, ChatEvent } from '../data/types'
import { cases } from '../data/cases'
import { ComplexityBadge } from '../components/ComplexityBadge'
import { StackBadge } from '../components/StackBadge'
import { BotPreviewModal } from '../components/BotPreviewModal'
import { QRCode } from '../components/QRCode'
import { TelegramChatSim } from '../components/TelegramChatSim'
import { ArchitectureDiagram } from '../components/ArchitectureDiagram'
import { CountUp } from '../components/CountUp'
import { TiltCard } from '../components/TiltCard'
import { CaseCover } from '../components/CaseCover'

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
  const showCover = c.kind === 'real' || c.kind === 'miniapp'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <TiltCard className="h-full">
        <button
          type="button"
          onClick={onClick}
          className="group block w-full text-left glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 hover:border-white/20 transition-colors cursor-pointer"
        >
          {showCover && (
            <div className="mb-5">
              <CaseCover id={c.id} />
            </div>
          )}
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
        </button>
      </TiltCard>
    </motion.div>
  )
}

/**
 * Parse a metric value like "247+" or "1 200+" into a number for CountUp,
 * returning the numeric part and a suffix containing any non-digits.
 * If the value cannot be parsed (e.g. "99.8%" / "нативна"), returns null so
 * we can render the string as-is.
 */
function splitMetric(value: string): { num: number; prefix: string; suffix: string } | null {
  // Try to find a contiguous run of digits (possibly separated by spaces).
  // Supports values like "247+", "1 200+", "2 400", "40-60", "99.8%".
  const match = value.match(/^(\D*)([\d\s]+)(.*)$/)
  if (!match) return null
  const prefix = match[1]
  const raw = match[2].replace(/\s/g, '')
  const suffix = match[3]
  const num = Number(raw)
  if (!Number.isFinite(num)) return null
  // Exclude fractional-heavy or range values — if suffix starts with "-" or "." or "%",
  // we still want to render just the number. Range handling (e.g. "30-50") we keep as string
  // because "30→50" animation is weird.
  if (suffix.startsWith('-') || suffix.startsWith('.')) return null
  return { num, prefix, suffix }
}

function MetricCard({ label, value }: { label: string; value: string }) {
  const parsed = splitMetric(value)
  return (
    <div className="glass-card rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent tabular-nums">
        {parsed ? (
          <CountUp to={parsed.num} prefix={parsed.prefix} suffix={parsed.suffix} />
        ) : (
          value
        )}
      </div>
      <div className="mt-1 text-xs text-white/60">{label}</div>
    </div>
  )
}

function StudyBlock({ study }: { study: CaseStudy }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-red-300/80">Проблема</div>
          <p className="mt-1 text-sm text-white/80 leading-relaxed">{study.problem}</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-emerald-300/80">Рішення</div>
          <p className="mt-1 text-sm text-white/80 leading-relaxed">{study.solution}</p>
        </div>
        {study.quote && (
          <blockquote className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4">
            <Quote size={14} className="absolute top-3 left-3 text-[var(--color-accent-cyan)]/60" />
            <p className="pl-6 text-sm italic text-white/80 leading-relaxed">
              «{study.quote.text}»
            </p>
            <footer className="mt-2 pl-6 text-xs text-white/50">— {study.quote.author}</footer>
          </blockquote>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {study.metrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} />
          ))}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/50 mb-2">Архітектура</div>
          <ArchitectureDiagram nodes={study.architecture} />
        </div>
      </div>
    </div>
  )
}

function RichHeader({ c }: { c: Case }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pr-10">
      <h3 className="text-2xl font-bold text-white">{c.name}</h3>
      <ComplexityBadge level={c.complexity} />
    </div>
  )
}

function RealContent({ c }: { c: Case }) {
  const url = c.realBot?.telegramUrl
  if (c.study) {
    return (
      <div className="space-y-6">
        <RichHeader c={c} />
        <p className="text-sm text-white/70">{c.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {c.stack.map((s) => (
            <StackBadge key={s} name={s} />
          ))}
        </div>
        <StudyBlock study={c.study} />
        {url && (
          <div className="flex items-center justify-center pt-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-5 py-2.5 text-sm font-medium text-white"
            >
              <ExternalLink size={14} />
              Відкрити в Telegram
            </a>
          </div>
        )}
      </div>
    )
  }

  // Fallback: old simple modal for any real case without study data
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

interface SimulatorModalProps {
  c: Case
  openKey: number
}

function SimulatorContent({ c, openKey }: SimulatorModalProps) {
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
    <div className="flex flex-col gap-4">
      <div>
        <RichHeader c={c} />
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
      {c.study && (
        <div className="pt-2">
          <StudyBlock study={c.study} />
        </div>
      )}
    </div>
  )
}

function MiniAppContent({ c }: { c: Case }) {
  const url = c.realBot?.telegramUrl
  return (
    <div className="space-y-5">
      <RichHeader c={c} />
      <p className="text-sm text-white/70">{c.tagline}</p>
      <div className="flex flex-wrap gap-1.5">
        {c.stack.map((s) => (
          <StackBadge key={s} name={s} />
        ))}
      </div>
      {c.study && <StudyBlock study={c.study} />}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
        <iframe
          src="/mini-app"
          title={`${c.name} Mini App`}
          className="w-full h-[600px] rounded-2xl border border-white/10 bg-[#0e1621]"
        />
        {url && (
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl bg-white/5 p-3">
              <QRCode link={url} size={140} />
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-4 py-2 text-xs font-medium text-white whitespace-nowrap"
            >
              <ExternalLink size={12} />
              Telegram
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function updateDemoParam(id: string | null) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (id) {
    url.searchParams.set('demo', id)
  } else {
    url.searchParams.delete('demo')
  }
  const next = url.pathname + (url.search ? url.search : '') + url.hash
  window.history.replaceState(null, '', next)
}

export function Cases() {
  const [selected, setSelected] = useState<Case | null>(null)
  const [openCounter, setOpenCounter] = useState(0)

  // Deep-link: open a case modal on mount if ?demo=<id> matches.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const demo = params.get('demo')
    if (!demo) return
    const match = cases.find((c) => c.id === demo)
    if (match) {
      setSelected(match)
      setOpenCounter((n) => n + 1)
    }
  }, [])

  const open = (c: Case) => {
    setSelected(c)
    setOpenCounter((n) => n + 1)
    updateDemoParam(c.id)
  }

  const close = () => {
    setSelected(null)
    updateDemoParam(null)
  }

  // The enriched modal needs more horizontal space — stretch max width for cases with study.
  const wideModal = !!selected?.study || selected?.kind === 'miniapp'

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
              featured={i === 0}
            />
          ))}
        </div>
      </div>

      <BotPreviewModal
        open={!!selected}
        onClose={close}
        title={selected ? selected.name : ''}
        wide={wideModal}
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
