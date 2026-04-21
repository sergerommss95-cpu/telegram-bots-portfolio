import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { ChatEvent } from '../data/types'
import { TelegramChatSim } from '../components/TelegramChatSim'
import { FakeTelegramFrame } from '../components/FakeTelegramFrame'

const heroScript: ChatEvent[] = [
  { role: 'bot', type: 'typing', durationMs: 800 },
  { role: 'bot', type: 'text', text: 'Привіт 👋 Я Сергій.\nЩо будемо будувати?', delayMs: 400 },
  {
    role: 'bot',
    type: 'buttons',
    inline: [
      { label: '🤖 AI-бот', jumpTo: 'hero-ai' },
      { label: '🛒 Магазин', jumpTo: 'hero-shop' },
      { label: '📅 Запис/CRM', jumpTo: 'hero-crm' },
      { label: '🎲 Інше', jumpTo: 'hero-other' },
    ],
  },
  { id: 'hero-ai', type: 'label' },
  {
    role: 'bot',
    type: 'text',
    text: 'Топ-кейс: Olivia Arcana — AI-астролог з VIP-підпискою і Stars-оплатою.',
    delayMs: 400,
  },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Дивитись Olivia →', jumpTo: 'hero-end' }] },
  { id: 'hero-shop', type: 'label' },
  {
    role: 'bot',
    type: 'text',
    text: 'Топ-кейс: TapToOrder — Mini App магазин з корзиною та Stars-оплатою.',
    delayMs: 400,
  },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Дивитись TapToOrder →', jumpTo: 'hero-end' }] },
  { id: 'hero-crm', type: 'label' },
  {
    role: 'bot',
    type: 'text',
    text: 'Топ-кейс: Ремонт Одягу — production-бот для ательє, NestJS + Prisma + webhooks.',
    delayMs: 400,
  },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Дивитись Ремонт Одягу →', jumpTo: 'hero-end' }] },
  { id: 'hero-other', type: 'label' },
  {
    role: 'bot',
    type: 'text',
    text: 'Розсилки, квізи, модерація груп, voice AI, реферальні — дивись матрицю можливостей.',
    delayMs: 400,
  },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Матриця →', jumpTo: 'hero-end' }] },
  { id: 'hero-end', type: 'label' },
  { role: 'bot', type: 'text', text: 'Гортай нижче 👇', delayMs: 500 },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Headline rises slightly faster, frame tilts subtly — mapped to scrollYProgress.
  // Hooks must be called unconditionally; we gate effects by passing ranges that resolve
  // to zero when reduced motion is preferred.
  const headlineY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80])
  const frameRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-3, 1])
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -30])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center px-4 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          style={{ y: headlineY }}
          className="text-center lg:text-left order-1 lg:order-1"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs md:text-sm uppercase tracking-wider text-white/60"
          >
            Telegram-боти на замовлення
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white"
          >
            Будую Telegram-ботів
            <br />
            <span className="bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent">
              будь-якої складності
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-white/70"
          >
            Від простої розсилки до production-систем з AI, платежами та CRM-інтеграцією. 13 живих кейсів — дивись, натискай, тестуй.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#cases"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] shadow-lg shadow-[var(--color-accent-purple)]/30 hover:opacity-90 transition-opacity"
            >
              Подивитись кейси
            </a>
            <a
              href="#offer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Замовити бота
            </a>
          </motion.div>
        </motion.div>

        {/* Right: living chat */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="order-2 lg:order-2 w-full"
        >
          <motion.div
            style={{ rotate: frameRotate, y: frameY }}
            className="relative mx-auto max-w-sm"
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[48px] bg-gradient-to-br from-[var(--color-accent-purple)]/25 via-transparent to-[var(--color-accent-cyan)]/25 blur-3xl"
            />
            <FakeTelegramFrame title="Serhii Builds" subtitle="online">
              <TelegramChatSim script={heroScript} botName="Serhii Builds" />
            </FakeTelegramFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
