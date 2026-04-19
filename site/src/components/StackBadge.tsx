export function StackBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/80">
      {name}
    </span>
  )
}
