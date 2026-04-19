import type { ReactNode } from 'react'

export function FakeTelegramFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[28px] border border-white/10 bg-[#17212b] overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 text-xs text-white/60 bg-black/20">
        <span>9:41</span>
        <span>●●●</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)]" />
        <div className="flex-1">
          <div className="text-sm font-medium text-white">TapToOrder Demo</div>
          <div className="text-xs text-white/50">Mini App</div>
        </div>
      </div>
      <div className="bg-[#0e1621] min-h-[500px]">{children}</div>
    </div>
  )
}
