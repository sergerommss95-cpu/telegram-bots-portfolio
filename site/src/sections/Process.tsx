import { motion } from 'framer-motion'

interface Step {
  num: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Бриф',
    description: '30 хв розмови, розуміємо задачу і бізнес-контекст',
  },
  {
    num: '02',
    title: 'Прототип',
    description: 'За 2-3 дні робочий MVP у Telegram — клікай і тестуй',
  },
  {
    num: '03',
    title: 'Тестування',
    description: 'Тижневий прогін із реальними користувачами, фікси',
  },
  {
    num: '04',
    title: 'Деплой',
    description: 'Production-запуск з моніторингом і документацією',
  },
]

export function Process() {
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
          <p className="text-xs uppercase tracking-wider text-white/60">Як ми працюємо</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Процес</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Від ідеї до production — чотири прозорі етапи.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6"
            >
              <div className="font-mono text-3xl font-bold bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent">
                {step.num}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
