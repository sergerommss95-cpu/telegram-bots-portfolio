import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Shortcut {
  keys: string[]
  desc: string
}

const SHORTCUTS: Shortcut[] = [
  { keys: ['K'], desc: 'Згенерувати пропозицію' },
  { keys: ['/'], desc: 'До кейсів' },
  { keys: ['O'], desc: 'Замовити' },
  { keys: ['?'], desc: 'Це вікно' },
  { keys: ['Esc'], desc: 'Закрити' },
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function isEditableTarget() {
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if ((el as HTMLElement).isContentEditable) return true
  return false
}

export function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditableTarget()) return

      // Escape closes help modal first, then falls through for other listeners.
      if (e.key === 'Escape') {
        if (helpOpen) {
          e.preventDefault()
          setHelpOpen(false)
        }
        return
      }

      // Ctrl/Cmd+K — to cases
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        scrollToId('cases')
        return
      }

      // Single-key shortcuts with no modifiers only.
      if (e.ctrlKey || e.metaKey || e.altKey) return

      switch (e.key) {
        case '?':
          e.preventDefault()
          setHelpOpen((v) => !v)
          break
        case 'k':
        case 'K':
          e.preventDefault()
          scrollToId('proposal')
          break
        case '/':
          e.preventDefault()
          scrollToId('cases')
          break
        case 'o':
        case 'O':
          e.preventDefault()
          scrollToId('offer')
          break
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [helpOpen])

  return (
    <AnimatePresence>
      {helpOpen && (
        <motion.div
          key="kbd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setHelpOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f1220]/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Клавіатурні скорочення"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setHelpOpen(false)}
              aria-label="Закрити"
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
            <div className="text-xs uppercase tracking-wider text-white/50">
              Клавіатура
            </div>
            <h3 className="mt-1 text-lg font-semibold text-white">Скорочення</h3>
            <ul className="mt-5 space-y-2.5">
              {SHORTCUTS.map((s) => (
                <li
                  key={s.desc}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-1.5">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="min-w-[28px] inline-flex items-center justify-center rounded-md border border-white/15 bg-white/10 px-2 py-0.5 font-mono text-xs text-white"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                  <span className="text-sm text-white/80 text-right">{s.desc}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
