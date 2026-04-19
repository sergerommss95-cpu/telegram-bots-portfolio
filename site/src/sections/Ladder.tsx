import { motion } from 'framer-motion'
import { ComplexityLadder } from '../components/ComplexityLadder'
import { cases } from '../data/cases'

export function Ladder() {
  // Only "real" bots on the ladder per spec: broadcaster (1), olivia+taro (3), repair (4)
  const realBots = cases
    .filter((c) => ['broadcaster', 'olivia', 'taro', 'repair'].includes(c.id))
    .map((c) => ({ id: c.id, name: c.name, complexity: c.complexity }))

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
          <p className="text-xs uppercase tracking-wider text-white/60">Ladder</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Від простого до production
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Реальні боти розташовані за рівнем складності — від односторонньої розсилки до повноцінного production-стеку.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ComplexityLadder bots={realBots} />
        </motion.div>
      </div>
    </section>
  )
}
