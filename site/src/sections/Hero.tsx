import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
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
          className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
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
          className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/70"
        >
          Від простої розсилки до production-систем з AI, платежами та CRM-інтеграцією. 13 живих кейсів — дивись, натискай, тестуй.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#cases"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] shadow-lg shadow-[var(--color-accent-purple)]/30 hover:opacity-90 transition-opacity"
          >
            Подивитись кейси
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Замовити бота
          </a>
        </motion.div>
      </div>
    </section>
  )
}
