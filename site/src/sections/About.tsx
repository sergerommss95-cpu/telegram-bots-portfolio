import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'
import { StackBadge } from '../components/StackBadge'

const stack = ['aiogram', 'grammY', 'FastAPI', 'NestJS', 'React', 'Postgres', 'Docker', 'Claude', 'GPT-4o']

export function About() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] text-3xl font-bold text-white shadow-lg shadow-[var(--color-accent-purple)]/30"
          aria-hidden
        >
          С
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <p className="mt-6 text-xs uppercase tracking-wider text-white/60">About</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Про мене</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 text-base md:text-lg text-white/70 leading-relaxed"
        >
          Привіт! Я Сергій — fullstack розробник з фокусом на Telegram-ботах і AI-інтеграції. Будую системи від односторонніх розсилок до production-ботів з реальними клієнтами (ательє в Одесі, тарот-платформа з Stars-оплатою, торгові брокери). Пишу на Python (aiogram) і TypeScript (grammY, NestJS). Пити каву й слухати тз — люблю в однаковій мірі.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {stack.map((s) => (
            <StackBadge key={s} name={s} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://t.me/serhii_builds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[var(--color-accent-purple)]/30"
          >
            <Send size={14} />
            @serhii_builds
          </a>
          <a
            href="mailto:serhii@example.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <Mail size={14} />
            serhii@example.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
