import { motion } from 'framer-motion'
import { Check, Minus, X } from 'lucide-react'
import type { ReactNode } from 'react'

type Sentiment = 'good' | 'neutral' | 'bad'

interface Cell {
  label: string
  sentiment: Sentiment
}

interface Row {
  criteria: string
  freelancer: Cell
  agency: Cell
  serhii: Cell
}

const ROWS: Row[] = [
  {
    criteria: 'Швидкість старту',
    freelancer: { label: '1-2 тижні', sentiment: 'neutral' },
    agency: { label: '2-4 тижні', sentiment: 'bad' },
    serhii: { label: '48 годин', sentiment: 'good' },
  },
  {
    criteria: 'Ціна',
    freelancer: { label: '$300-2 000', sentiment: 'good' },
    agency: { label: '$8 000-40 000', sentiment: 'bad' },
    serhii: { label: '$500-15 000', sentiment: 'good' },
  },
  {
    criteria: 'Якість коду',
    freelancer: { label: 'Залежить', sentiment: 'neutral' },
    agency: { label: 'Стабільна', sentiment: 'good' },
    serhii: { label: 'Production з day 1', sentiment: 'good' },
  },
  {
    criteria: 'Підтримка',
    freelancer: { label: 'Зникає', sentiment: 'bad' },
    agency: { label: 'Дорога', sentiment: 'neutral' },
    serhii: { label: 'Чесна, $400/міс', sentiment: 'good' },
  },
  {
    criteria: 'Володіння кодом',
    freelancer: { label: 'Так', sentiment: 'good' },
    agency: { label: 'Часто ні', sentiment: 'bad' },
    serhii: { label: 'Завжди твоє', sentiment: 'good' },
  },
  {
    criteria: 'Комунікація',
    freelancer: { label: 'Ласий сюрприз', sentiment: 'bad' },
    agency: { label: 'Account manager', sentiment: 'neutral' },
    serhii: { label: 'Telegram, прямий', sentiment: 'good' },
  },
]

function SentimentIcon({ s }: { s: Sentiment }) {
  if (s === 'good')
    return <Check size={14} className="text-emerald-400" aria-label="Плюс" />
  if (s === 'bad') return <X size={14} className="text-red-400/80" aria-label="Мінус" />
  return <Minus size={14} className="text-white/40" aria-label="Нейтрально" />
}

function CellView({ cell, highlight = false }: { cell: Cell; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 text-sm ${
        highlight ? 'text-white font-medium' : 'text-white/80'
      }`}
    >
      <SentimentIcon s={cell.sentiment} />
      <span>{cell.label}</span>
    </div>
  )
}

function ColumnHeader({
  label,
  sub,
  highlight,
}: {
  label: ReactNode
  sub?: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex flex-col gap-0.5 ${
        highlight
          ? 'text-white'
          : 'text-white/70'
      }`}
    >
      <span className={`text-sm md:text-base font-semibold ${highlight ? 'bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent' : ''}`}>
        {label}
      </span>
      {sub && <span className="text-[10px] uppercase tracking-wider text-white/40">{sub}</span>}
    </div>
  )
}

export function Comparison() {
  return (
    <section id="comparison" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">Чому я</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Freelance vs Agency vs Сергій
          </h2>
        </motion.div>

        {/* Desktop / tablet table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden md:block relative glass-card rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-4 text-[11px] uppercase tracking-wider text-white/50 font-medium w-1/4">
                  Критерій
                </th>
                <th className="px-5 py-4 w-1/4">
                  <ColumnHeader label="Freelancer" sub="Upwork / Fiverr" />
                </th>
                <th className="px-5 py-4 w-1/4">
                  <ColumnHeader label="Агенція" sub="Dev shop" />
                </th>
                <th className="px-5 py-4 w-1/4 relative">
                  <div className="absolute inset-0 -m-px rounded-none bg-gradient-to-b from-[var(--color-accent-purple)]/10 to-[var(--color-accent-cyan)]/10 pointer-events-none" />
                  <div className="relative">
                    <ColumnHeader label="Сергій" sub="You're here" highlight />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr
                  key={r.criteria}
                  className={i < ROWS.length - 1 ? 'border-b border-white/5' : ''}
                >
                  <td className="px-5 py-4 text-xs md:text-sm text-white/50">{r.criteria}</td>
                  <td className="px-5 py-4">
                    <CellView cell={r.freelancer} />
                  </td>
                  <td className="px-5 py-4">
                    <CellView cell={r.agency} />
                  </td>
                  <td className="px-5 py-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent-purple)]/5 to-[var(--color-accent-cyan)]/5 pointer-events-none" />
                    <div className="relative">
                      <CellView cell={r.serhii} highlight />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Highlight ring for Serhii column via ring utility on wrapper */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/4 rounded-r-2xl ring-2 ring-[var(--color-accent-purple)]/50 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
          />
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {/* Serhii first (highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-xl p-5 ring-2 ring-[var(--color-accent-purple)]/50 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
          >
            <ColumnHeader label="Сергій" sub="You're here" highlight />
            <ul className="mt-3 space-y-2">
              {ROWS.map((r) => (
                <li key={r.criteria} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-white/50">{r.criteria}</span>
                  <CellView cell={r.serhii} highlight />
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Freelancer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
          >
            <ColumnHeader label="Freelancer" sub="Upwork / Fiverr" />
            <ul className="mt-3 space-y-2">
              {ROWS.map((r) => (
                <li key={r.criteria} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-white/50">{r.criteria}</span>
                  <CellView cell={r.freelancer} />
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Agency */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
          >
            <ColumnHeader label="Агенція" sub="Dev shop" />
            <ul className="mt-3 space-y-2">
              {ROWS.map((r) => (
                <li key={r.criteria} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-white/50">{r.criteria}</span>
                  <CellView cell={r.agency} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
