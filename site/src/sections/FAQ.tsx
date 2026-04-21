import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface QA {
  q: string
  a: string
}

const FAQS: QA[] = [
  {
    q: 'Чому не зробити бота самому?',
    a: 'Зробити MVP — реально. Але production-бот з платежами, вебхуками, Docker і моніторингом — це не годинник on YouTube. Я приношу готові шаблони і зекономлю тижні.',
  },
  {
    q: 'Хто володіє кодом?',
    a: 'Ти. 100%. Весь код — твій, з коментарями, в твоєму GitHub. Ніяких SaaS-залежностей з моєї сторони.',
  },
  {
    q: 'Що з безпекою?',
    a: 'Токени — у secret manager. Rate-limiting, webhook signature validation, без хардкоду секретів. Можу провести окремий security аудит.',
  },
  {
    q: 'Скільки коштує підтримка?',
    a: '$400/міс за 5 год консультацій + багфікси. Або ad-hoc $50/год.',
  },
  {
    q: 'А якщо Telegram заблокується?',
    a: 'Той самий код легко переноситься на Discord/WhatsApp/Viber — архітектура платформо-незалежна.',
  },
  {
    q: 'Скільки часу від старту до запуску?',
    a: 'Simple FAQ-бот: 3-5 днів. Каталог з оплатою: 2-3 тижні. AI + VIP-підписка: 3-5 тижнів. Production з CRM: 6-10 тижнів.',
  },
  {
    q: 'Чи робиш TЗ?',
    a: 'Так, безкоштовно. Після 30-хв дзвінка присилаю структурований документ з фічами, архітектурою і кошторисом.',
  },
  {
    q: 'Що якщо мені не сподобається?',
    a: 'Працюю по етапах із проміжними оплатами. Після кожного етапу можеш зупинитись — без штрафів. 90% проектів доходять до кінця, бо я показую прогрес через день.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex((cur) => (cur === i ? null : i))
  }

  return (
    <section id="faq" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">FAQ</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Питання які всі ставлять
          </h2>
        </motion.div>

        <ul className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.li
                key={item.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.25) }}
                className="glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm md:text-base font-medium text-white">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
                  >
                    <Plus size={14} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-white/70 leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
