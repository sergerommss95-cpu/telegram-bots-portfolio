import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, DollarSign, Zap } from 'lucide-react'

function fmtUsd(n: number) {
  return `$${Math.round(n).toLocaleString('uk-UA')}`
}

function pluralMonths(n: number) {
  // Ukrainian plural: 1 місяць, 2-4 місяці, 5+ місяців
  const mod100 = n % 100
  const mod10 = n % 10
  if (mod100 >= 11 && mod100 <= 14) return 'місяців'
  if (mod10 === 1) return 'місяць'
  if (mod10 >= 2 && mod10 <= 4) return 'місяці'
  return 'місяців'
}

interface SliderProps {
  label: string
  icon: React.ReactNode
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (v: number) => void
}

function Slider({ label, icon, value, min, max, step = 1, suffix = '', onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/60">
          {icon}
          {label}
        </span>
        <span className="font-mono text-sm text-white tabular-nums">
          {value.toLocaleString('uk-UA')}
          {suffix}
        </span>
      </div>
      <div className="mt-3 relative h-2 rounded-full bg-white/10">
        {/* Fill */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handle}
          className="roi-range absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb */}
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-white shadow-lg shadow-[var(--color-accent-purple)]/50 border-2 border-[var(--color-accent-purple)] pointer-events-none"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function ROICalculator() {
  const [hours, setHours] = useState(10)
  const [rate, setRate] = useState(50)
  const [botCost, setBotCost] = useState(3500)

  const { annual, payback, savings3y } = useMemo(() => {
    const annual = hours * 52 * rate
    const monthly = annual / 12
    const payback = monthly > 0 ? Math.ceil(botCost / monthly) : 0
    const savings3y = Math.max(0, 3 * annual - botCost)
    return { annual, payback, savings3y }
  }, [hours, rate, botCost])

  const scrollToProposal = () => {
    const el = document.getElementById('proposal')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="roi" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">ROI</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Скільки часу ти втрачаєш?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Посунь повзунки — побачиш, коли бот окупиться і скільки заощадить за 3 роки.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3 glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 md:p-8 space-y-8"
          >
            <Slider
              label="Годин/тиждень на ручні процеси"
              icon={<Clock size={12} />}
              value={hours}
              min={1}
              max={40}
              onChange={setHours}
              suffix=" год"
            />
            <Slider
              label="Вартість твоєї години ($)"
              icon={<DollarSign size={12} />}
              value={rate}
              min={10}
              max={150}
              onChange={setRate}
              suffix=" $"
            />
            <Slider
              label="Скільки коштує бот ($)"
              icon={<Zap size={12} />}
              value={botCost}
              min={1500}
              max={15000}
              step={100}
              onChange={setBotCost}
              suffix=" $"
            />

            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[10px] uppercase tracking-wider text-white/50">
                  Річна вартість ручної роботи
                </div>
                <div className="mt-1 font-mono text-lg text-white tabular-nums">
                  {fmtUsd(annual)} <span className="text-white/50 text-xs">/ рік</span>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[10px] uppercase tracking-wider text-white/50">
                  Економія за 3 роки
                </div>
                <div className="mt-1 font-mono text-lg text-white tabular-nums">
                  {fmtUsd(savings3y)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-2 relative rounded-2xl overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] opacity-80"
            />
            <div className="relative h-full glass-card rounded-2xl border border-white/10 bg-[#0f1220]/90 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/50">
                  Результат
                </div>
                <div className="mt-3 text-white/80 text-sm leading-relaxed">
                  Бот окупиться за{' '}
                  <motion.span
                    key={`p-${payback}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent tabular-nums inline-block"
                  >
                    {payback}
                  </motion.span>{' '}
                  <span className="font-semibold text-white">{pluralMonths(payback)}</span>.
                </div>
                <div className="mt-4 text-white/80 text-sm leading-relaxed">
                  Економія за 3 роки:{' '}
                  <motion.span
                    key={`s-${savings3y}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent tabular-nums inline-block"
                  >
                    {fmtUsd(savings3y)}
                  </motion.span>
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToProposal}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--color-accent-purple)]/30 hover:opacity-90 transition-opacity"
              >
                Отримати пропозицію
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
