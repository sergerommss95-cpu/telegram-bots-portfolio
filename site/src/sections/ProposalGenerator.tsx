import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Printer, Copy, Check, Sparkles } from 'lucide-react'
import { StackBadge } from '../components/StackBadge'

type BotType = 'ai-chat' | 'ecommerce' | 'booking' | 'crm' | 'content' | 'broadcast'
type Budget = 'starter' | 'business' | 'ai' | 'production'
type Timeline = '1w' | '2w' | '1m' | '2m'

interface Recipe {
  label: string
  stack: string[]
  architecture: string[]
  lineItems: Array<{ name: string; share: number }> // shares sum to 1.0 — we'll scale
  notes: string[]
}

const BOT_TYPE_LABELS: Record<BotType, string> = {
  'ai-chat': 'AI-чат / консультант',
  ecommerce: 'E-commerce / магазин',
  booking: 'Запис / букінг',
  crm: 'CRM / бізнес-процеси',
  content: 'Контент / quiz / ігри',
  broadcast: 'Розсилка / сигнали',
}

const BUDGET_LABELS: Record<Budget, string> = {
  starter: '$500 – $900',
  business: '$1 500 – $3 000',
  ai: '$3 500 – $6 500',
  production: 'від $8 000',
}

const BUDGET_ANCHORS: Record<Budget, number> = {
  starter: 700, // midpoint
  business: 2200,
  ai: 5000,
  production: 9000,
}

const TIMELINE_LABELS: Record<Timeline, string> = {
  '1w': '1 тиждень',
  '2w': '2 тижні',
  '1m': '1 місяць',
  '2m': '2 місяці',
}

const TIMELINE_DAYS: Record<Timeline, number> = {
  '1w': 7,
  '2w': 14,
  '1m': 30,
  '2m': 60,
}

const RECIPES: Record<BotType, Recipe> = {
  'ai-chat': {
    label: 'AI-чат з памʼяттю і підпискою',
    stack: ['aiogram', 'Claude / GPT-4o', 'Postgres', 'Stars', 'Redis'],
    architecture: ['Клієнт', 'Telegram', 'aiogram', 'LLM API', 'Postgres'],
    lineItems: [
      { name: 'Розробка (логіка, промпти, UX)', share: 0.6 },
      { name: 'Підключення платежів (Stars + CryptoBot)', share: 0.12 },
      { name: 'Деплой (VPS + Docker + моніторинг)', share: 0.1 },
      { name: 'Підтримка (перший місяць)', share: 0.18 },
    ],
    notes: [
      'Промпт-інжиніринг і тюнінг персони входять у розробку',
      'Передбачено прогрів на 100-200 тестових діалогів до launch',
    ],
  },
  ecommerce: {
    label: 'Магазин з кошиком і Stars-оплатою',
    stack: ['aiogram', 'Stars', 'SQLite / Postgres', 'FastAPI'],
    architecture: ['Клієнт', 'Telegram', 'aiogram', 'Stars', 'Postgres'],
    lineItems: [
      { name: 'Розробка (каталог, кошик, замовлення)', share: 0.55 },
      { name: 'Підключення Stars + CryptoBot', share: 0.15 },
      { name: 'Деплой + адмін-панель', share: 0.15 },
      { name: 'Підтримка (перший місяць)', share: 0.15 },
    ],
    notes: [
      'Для > 50 товарів рекомендую Mini App замість inline-каталогу',
      'Адмінка на Telegram-командах або окрема React-панель (+20%)',
    ],
  },
  booking: {
    label: 'Бот запису з календарем',
    stack: ['aiogram', 'Postgres', 'Calendar API'],
    architecture: ['Клієнт', 'Telegram', 'aiogram', 'Postgres', 'Google Calendar'],
    lineItems: [
      { name: 'Розробка (слоти, нагадування, підтвердження)', share: 0.6 },
      { name: 'Інтеграція з Google Calendar', share: 0.1 },
      { name: 'Деплой + адмін-панель', share: 0.15 },
      { name: 'Підтримка (перший місяць)', share: 0.15 },
    ],
    notes: [
      'Нагадування за 24/1 год до візиту — стандартно',
      'Для 2+ майстрів — маршрутизація за кваліфікацією',
    ],
  },
  crm: {
    label: 'Production-бот для бізнесу',
    stack: ['grammY', 'NestJS', 'Prisma', 'Postgres', 'Docker'],
    architecture: ['Клієнт', 'Telegram', 'Webhook', 'NestJS', 'Prisma', 'Postgres'],
    lineItems: [
      { name: 'Розробка (статуси, ролі, CRM-логіка)', share: 0.55 },
      { name: 'Інтеграції (webhooks, CRM API)', share: 0.15 },
      { name: 'Деплой (Docker + CI/CD)', share: 0.15 },
      { name: 'Підтримка (перший місяць)', share: 0.15 },
    ],
    notes: [
      'Дві ролі стандартно: клієнт + менеджер, більше — обговорюємо',
      'SLA 99.9% у production-пакеті',
    ],
  },
  content: {
    label: 'Контент-бот (quiz / ігри / розваги)',
    stack: ['aiogram', 'Redis', 'SQLite'],
    architecture: ['Клієнт', 'Telegram', 'aiogram', 'Redis', 'SQLite'],
    lineItems: [
      { name: 'Розробка (логіка, сценарії, геймплей)', share: 0.65 },
      { name: 'Платежі (якщо є preмium-рівні)', share: 0.1 },
      { name: 'Деплой', share: 0.1 },
      { name: 'Підтримка (перший місяць)', share: 0.15 },
    ],
    notes: [
      'Контент (питання, сценарії) — або від клієнта, або +20% за написання',
    ],
  },
  broadcast: {
    label: 'Cron-розсилка сигналів',
    stack: ['Python', 'httpx', 'Cron'],
    architecture: ['Scanner', 'Cron', 'Telegram API', 'Channel'],
    lineItems: [
      { name: 'Розробка (scraper, фільтри, формат)', share: 0.65 },
      { name: 'Деплой (VPS + systemd)', share: 0.2 },
      { name: 'Підтримка (перший місяць)', share: 0.15 },
    ],
    notes: [
      'Найшвидший формат — часто укладаюсь у 3-5 днів',
    ],
  },
}

function formatDate(d: Date) {
  return d.toLocaleDateString('uk-UA', { day: '2-digit', month: 'long', year: 'numeric' })
}

function shortDate(d: Date) {
  return d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' })
}

function roundTo50(n: number) {
  return Math.round(n / 50) * 50
}

interface Phase {
  name: string
  startDay: number
  endDay: number
}

function computePhases(days: number, hasSupport: boolean): Phase[] {
  // Phases: discovery 10%, development 65%, testing 15%, deploy 10%, then support month
  const discoveryEnd = Math.max(1, Math.round(days * 0.1))
  const devEnd = Math.round(days * 0.75)
  const testEnd = Math.round(days * 0.9)
  const deployEnd = days
  const phases: Phase[] = [
    { name: 'Discovery + ТЗ', startDay: 0, endDay: discoveryEnd },
    { name: 'Розробка', startDay: discoveryEnd, endDay: devEnd },
    { name: 'Тестування', startDay: devEnd, endDay: testEnd },
    { name: 'Деплой + документація', startDay: testEnd, endDay: deployEnd },
  ]
  if (hasSupport) {
    phases.push({ name: 'Підтримка (1 місяць)', startDay: deployEnd, endDay: deployEnd + 30 })
  }
  return phases
}

function buildPlainText({
  ideaShort,
  botType,
  budget,
  timeline,
  recipe,
  costs,
  total,
  phases,
  today,
}: {
  ideaShort: string
  botType: BotType
  budget: Budget
  timeline: Timeline
  recipe: Recipe
  costs: Array<{ name: string; amount: number }>
  total: number
  phases: Phase[]
  today: Date
}) {
  const lines: string[] = []
  lines.push(`Пропозиція від Serhii Builds — ${formatDate(today)}`)
  lines.push('')
  lines.push('КЛІЄНТ')
  lines.push(`Проєкт: ${ideaShort || BOT_TYPE_LABELS[botType]}`)
  lines.push(`Тип: ${BOT_TYPE_LABELS[botType]}`)
  lines.push(`Бюджетний діапазон: ${BUDGET_LABELS[budget]}`)
  lines.push(`Терміни: ${TIMELINE_LABELS[timeline]}`)
  lines.push('')
  lines.push('РЕКОМЕНДОВАНИЙ СТЕК')
  lines.push(recipe.stack.join(' · '))
  lines.push('')
  lines.push('АРХІТЕКТУРА')
  lines.push(recipe.architecture.join(' → '))
  lines.push('')
  lines.push('КОШТОРИС')
  costs.forEach((c) => {
    lines.push(`  · ${c.name}: ~$${c.amount.toLocaleString('uk-UA')}`)
  })
  lines.push(`  РАЗОМ: ~$${total.toLocaleString('uk-UA')}`)
  lines.push('')
  lines.push('ЕТАПИ')
  phases.forEach((p) => {
    const start = new Date(today)
    start.setDate(start.getDate() + p.startDay)
    const end = new Date(today)
    end.setDate(end.getDate() + p.endDay)
    lines.push(`  · ${p.name}: ${shortDate(start)} – ${shortDate(end)}`)
  })
  lines.push('')
  lines.push('КОНТАКТ')
  lines.push('Якщо підходить — пиши @serhii_builds')
  return lines.join('\n')
}

export function ProposalGenerator() {
  const [botType, setBotType] = useState<BotType>('ai-chat')
  const [budget, setBudget] = useState<Budget>('business')
  const [timeline, setTimeline] = useState<Timeline>('2w')
  const [idea, setIdea] = useState('')
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const today = useMemo(() => new Date(), [generated]) // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => {
    if (!generated) return null
    const recipe = RECIPES[botType]
    const anchor = BUDGET_ANCHORS[budget]
    const costs = recipe.lineItems.map((li) => ({
      name: li.name,
      amount: roundTo50(anchor * li.share),
    }))
    const total = costs.reduce((s, c) => s + c.amount, 0)
    const phases = computePhases(
      TIMELINE_DAYS[timeline],
      recipe.lineItems.some((li) => li.name.toLowerCase().includes('підтримка')),
    )
    const ideaShort = idea.trim() || recipe.label
    return { recipe, costs, total, phases, ideaShort }
  }, [generated, botType, budget, timeline, idea])

  const handleGenerate = () => {
    setGenerated(true)
    setCopied(false)
    requestAnimationFrame(() => {
      document.getElementById('proposal-preview')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopy = async () => {
    if (!result) return
    const text = buildPlainText({
      ideaShort: result.ideaShort,
      botType,
      budget,
      timeline,
      recipe: result.recipe,
      costs: result.costs,
      total: result.total,
      phases: result.phases,
      today,
    })
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <section id="proposal" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">Proposal</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Отримай пропозицію за 60 секунд
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Обираєш тип бота, бюджет і терміни — генеруємо робочий чернеток з архітектурою, кошторисом і календарем.
          </p>
        </motion.div>

        {/* Form — hidden in print */}
        <div className="no-print">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-white/60">Тип бота</span>
                <select
                  value={botType}
                  onChange={(e) => setBotType(e.target.value as BotType)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                >
                  {(Object.entries(BOT_TYPE_LABELS) as [BotType, string][]).map(([k, v]) => (
                    <option key={k} value={k} className="bg-[#0f1220]">
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-white/60">Бюджет</span>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value as Budget)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                >
                  {(Object.entries(BUDGET_LABELS) as [Budget, string][]).map(([k, v]) => (
                    <option key={k} value={k} className="bg-[#0f1220]">
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-white/60">Терміни</span>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value as Timeline)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                >
                  {(Object.entries(TIMELINE_LABELS) as [Timeline, string][]).map(([k, v]) => (
                    <option key={k} value={k} className="bg-[#0f1220]">
                      {v}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-white/60">
                Коротко про ідею (не обовʼязково)
              </span>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={2}
                maxLength={280}
                placeholder="Напр.: бот для продажу онлайн-курсів з підпискою на канал…"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none resize-none"
              />
            </label>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--color-accent-purple)]/30 hover:opacity-90 transition-opacity"
              >
                <Sparkles size={14} />
                Згенерувати пропозицію
              </button>
            </div>
          </motion.div>
        </div>

        {/* Preview */}
        {result && (
          <motion.div
            key={`${botType}-${budget}-${timeline}-${generated}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            id="proposal-preview"
            className="proposal-printable mt-10 rounded-2xl border border-white/10 bg-[#0f1220] backdrop-blur-xl shadow-2xl shadow-black/50 p-6 md:p-10"
          >
            <header className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)]">
                  <FileText size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50">Пропозиція</div>
                  <div className="text-lg font-semibold text-white">Serhii Builds</div>
                </div>
              </div>
              <div className="text-xs text-white/60 text-right">
                <div>Дата: {formatDate(today)}</div>
                <div className="mt-0.5">@serhii_builds</div>
              </div>
            </header>

            <section className="mt-6">
              <div className="text-xs uppercase tracking-wider text-white/50">Клієнт</div>
              <dl className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="text-white/50 inline">Проєкт:</dt>{' '}
                  <dd className="text-white inline">{result.ideaShort}</dd>
                </div>
                <div>
                  <dt className="text-white/50 inline">Тип:</dt>{' '}
                  <dd className="text-white inline">{BOT_TYPE_LABELS[botType]}</dd>
                </div>
                <div>
                  <dt className="text-white/50 inline">Бюджет:</dt>{' '}
                  <dd className="text-white inline">{BUDGET_LABELS[budget]}</dd>
                </div>
                <div>
                  <dt className="text-white/50 inline">Терміни:</dt>{' '}
                  <dd className="text-white inline">{TIMELINE_LABELS[timeline]}</dd>
                </div>
              </dl>
            </section>

            <section className="mt-6">
              <div className="text-xs uppercase tracking-wider text-white/50">
                Рекомендований стек
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {result.recipe.stack.map((s) => (
                  <StackBadge key={s} name={s} />
                ))}
              </div>
              <div className="mt-3 text-sm text-white/70 font-mono">
                {result.recipe.architecture.join(' → ')}
              </div>
            </section>

            <section className="mt-6">
              <div className="text-xs uppercase tracking-wider text-white/50">Кошторис</div>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {result.costs.map((c) => (
                    <tr key={c.name} className="border-b border-white/5">
                      <td className="py-2 text-white/80">{c.name}</td>
                      <td className="py-2 text-right font-mono text-white">
                        ~${c.amount.toLocaleString('uk-UA')}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 font-semibold text-white">Разом</td>
                    <td className="py-3 text-right font-mono text-lg font-bold bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent">
                      ~${result.total.toLocaleString('uk-UA')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="mt-6">
              <div className="text-xs uppercase tracking-wider text-white/50">Етапи</div>
              <ul className="mt-2 space-y-2 text-sm">
                {result.phases.map((p) => {
                  const start = new Date(today)
                  start.setDate(start.getDate() + p.startDay)
                  const end = new Date(today)
                  end.setDate(end.getDate() + p.endDay)
                  return (
                    <li
                      key={p.name}
                      className="flex items-center justify-between gap-3 py-1"
                    >
                      <span className="text-white/80">{p.name}</span>
                      <span className="font-mono text-xs text-white/60">
                        {shortDate(start)} – {shortDate(end)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>

            {result.recipe.notes.length > 0 && (
              <section className="mt-6">
                <div className="text-xs uppercase tracking-wider text-white/50">Примітки</div>
                <ul className="mt-2 space-y-1 text-xs text-white/60">
                  {result.recipe.notes.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span className="text-[var(--color-accent-cyan)]">·</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <footer className="mt-8 pt-6 border-t border-white/10 text-sm text-white/70">
              Якщо підходить — пиши{' '}
              <a
                href="https://t.me/serhii_builds"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-[var(--color-accent-cyan)]/60 hover:decoration-white"
              >
                @serhii_builds
              </a>
              . Відповідаю протягом дня.
            </footer>
          </motion.div>
        )}

        {/* Actions — hidden in print */}
        {result && (
          <div className="no-print mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <Printer size={14} />
              Зберегти PDF
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Скопійовано' : 'Скопіювати як текст'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
