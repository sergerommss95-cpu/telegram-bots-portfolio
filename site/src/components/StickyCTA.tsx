import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, ArrowUpRight } from 'lucide-react'

/**
 * Fixed bottom-right (bottom-center on mobile) pill that appears after the
 * user scrolls past 600px and hides when within 800px of the page bottom.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const nearFooter = total > 0 && y > total - 800
      setVisible(y > 600 && !nearFooter)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="sticky-cta"
          href="https://t.me/serhii_builds"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--color-accent-purple)]/40 hover:opacity-90 transition-opacity bottom-6 right-1/2 translate-x-1/2 md:right-6 md:translate-x-0"
        >
          <Send size={14} />
          Написати в Telegram
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
