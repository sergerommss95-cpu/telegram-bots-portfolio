import { motion } from 'framer-motion'
import { PricingCard } from '../components/PricingCard'
import { pricing } from '../data/pricing'

export function Pricing() {
  return (
    <section id="cta" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-wider text-white/60">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Тарифи</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/60">
            Чесно, прозоро, без прихованих платежів
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pricing.map((pkg) => (
            <PricingCard key={pkg.tier} pkg={pkg} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40 max-w-2xl mx-auto">
          Ціни без вартості інфраструктури, API та платіжних комісій. Безкоштовний аудит ідеї за 30 хвилин.
        </p>
      </div>
    </section>
  )
}
