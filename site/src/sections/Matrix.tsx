import { motion } from 'framer-motion'
import { CapabilityMatrix } from '../components/CapabilityMatrix'

export function Matrix() {
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
          <p className="text-xs uppercase tracking-wider text-white/60">Матриця</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Що вміє кожен бот
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            20 фіч × 13 кейсів. <span className="text-emerald-400">✓</span> — повноцінно, <span className="text-amber-400">◐</span> — частково, <span className="text-white/30">—</span> — не використовується.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CapabilityMatrix />
        </motion.div>
      </div>
    </section>
  )
}
