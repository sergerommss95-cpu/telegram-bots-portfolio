import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  quote: string
  author: string
  role: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Раніше відповідали на дзвінки, зараз клієнти бачать все в боті. Економимо 2 години на день.',
    author: 'Менеджер ательє',
    role: 'Одеса',
    initials: 'МА',
  },
  {
    quote:
      'Сергій здав проект за 6 днів. Інші freelancer-и обіцяли 3 тижні. Різниця як день і ніч.',
    author: 'CTO стартапу',
    role: 'Київ',
    initials: 'ЦО',
  },
  {
    quote:
      'Мінімум питань, максимум результату. Prototype в неділю, прод у пʼятницю.',
    author: 'Власниця таро-каналу',
    role: 'онлайн',
    initials: 'ВТ',
  },
]

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0f1220]"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] p-0.5">
        <div className="h-full w-full rounded-full bg-[#0f1220] flex items-center justify-center text-sm font-semibold text-white">
          {initials}
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
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
          <p className="text-xs uppercase tracking-wider text-white/60">Відгуки</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Що кажуть клієнти</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-1 text-[var(--color-accent-cyan)]" aria-label="5 з 5">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={14} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-sm md:text-base text-white/85 leading-relaxed">
                «{t.quote}»
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2 border-t border-white/5">
                <Avatar initials={t.initials} />
                <div>
                  <div className="text-sm font-medium text-white">{t.author}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
