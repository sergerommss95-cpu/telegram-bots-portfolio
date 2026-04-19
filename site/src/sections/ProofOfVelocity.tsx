import { motion } from 'framer-motion'
import { GlassCard } from '../components/GlassCard'

interface Entry {
  day: string
  time: string
  title: string
  note?: string
}

const timeline: Entry[] = [
  {
    day: 'День 1',
    time: '12:49',
    title: 'Scaffold',
    note: 'Vite + React + TS + Tailwind v4',
  },
  {
    day: 'День 1',
    time: '13:03',
    title: 'Simulator engine',
    note: 'TDD, 5/5 тестів пройдено',
  },
  {
    day: 'День 1',
    time: '13:15',
    title: '8 Ukrainian bot scripts',
    note: '98 подій сценаріїв',
  },
  {
    day: 'День 1',
    time: '13:17',
    title: '13 case records + capability matrix',
  },
  {
    day: 'День 1',
    time: '13:50',
    title: 'Всі 9 секцій зібрано',
  },
  {
    day: 'День 2',
    time: '14:00',
    title: 'Mini App backend + frontend',
    note: 'FastAPI + aiogram + React',
  },
  {
    day: 'День 2',
    time: '14:05',
    title: 'Deploy to Netlify',
    note: 'Lighthouse 100/100/100/100',
  },
  {
    day: 'День 2',
    time: '14:30',
    title: '10× upgrade pass',
    note: 'Living hero, case studies, proposal generator',
  },
]

export function ProofOfVelocity() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">Velocity</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Швидкість = якість</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Цей сайт побудовано за 2 дні. Ось timeline:
          </p>
        </motion.div>

        <div className="relative">
          {/* Gradient vertical line */}
          <div
            aria-hidden
            className="absolute left-4 md:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent-purple)] via-white/20 to-[var(--color-accent-cyan)]"
          />

          <ol className="space-y-4">
            {timeline.map((e, i) => (
              <li key={`${e.day}-${e.time}-${e.title}`} className="relative pl-12 md:pl-20">
                {/* Dot */}
                <span
                  aria-hidden
                  className="absolute left-4 md:left-8 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] ring-4 ring-[#0a0e1a] z-10"
                />
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <GlassCard className="p-4 md:p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="text-sm font-semibold text-white">{e.title}</div>
                      <div className="font-mono text-xs text-white/50">
                        {e.day} · {e.time}
                      </div>
                    </div>
                    {e.note && (
                      <div className="mt-1 text-sm text-white/65 leading-relaxed">{e.note}</div>
                    )}
                  </GlassCard>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
