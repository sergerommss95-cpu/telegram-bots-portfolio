import { Send, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="px-4 py-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm text-white/60">
          © 2026 Serhii Builds. Made with <span className="text-pink-400">♥</span> and Claude.
        </p>
        <div className="mt-4 flex items-center justify-center gap-5 text-xs text-white/50">
          <a
            href="https://t.me/serhii_builds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Send size={12} />
            Telegram
          </a>
          <a
            href="mailto:serhii@example.com"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail size={12} />
            Email
          </a>
        </div>
        <div className="mt-5 text-[11px] text-white/30 hidden md:block">
          Натисни{' '}
          <kbd className="inline-flex items-center justify-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-white/60">
            ?
          </kbd>{' '}
          для клавіатурних скорочень
        </div>
      </div>
    </footer>
  )
}
