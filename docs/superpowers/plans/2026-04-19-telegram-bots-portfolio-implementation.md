# Telegram Bots Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page Ukrainian-language portfolio site showcasing 13 Telegram bot cases (4 real + 1 Mini App + 8 web simulators) in glassmorphism style, plus a deployable Telegram Mini App demo, over 2 days (~16h).

**Architecture:**
- **Site** = Vite+React+TS+Tailwind v4+Framer Motion, single-page, static deploy to Vercel.
- **Simulators** = one reusable `<TelegramChatSim>` component driven by data-only scripts; 8 bots = 1 engine + 8 script files.
- **Mini App** = shared `/mini-app` route (served from Vercel, same origin) + FastAPI+aiogram webhook backend (Railway), connected via `@TapToOrderDemoBot`.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind CSS v4, Framer Motion 11, Lucide React, `qrcode`, Vitest + React Testing Library, FastAPI, aiogram 3, `@twa-dev/sdk`.

**Spec:** `docs/superpowers/specs/2026-04-19-telegram-bots-portfolio-design.md`

---

## File Structure

```
telegram-bots-portfolio/
├── site/                                    # Vite React app (Vercel)
│   ├── src/
│   │   ├── components/
│   │   │   ├── GlassCard.tsx
│   │   │   ├── ComplexityBadge.tsx
│   │   │   ├── StackBadge.tsx
│   │   │   ├── QRCode.tsx
│   │   │   ├── AmbientOrbs.tsx
│   │   │   ├── FakeTelegramFrame.tsx
│   │   │   ├── TelegramChatSim.tsx        # simulator engine (critical path)
│   │   │   ├── BotPreviewModal.tsx
│   │   │   ├── CapabilityMatrix.tsx
│   │   │   ├── ComplexityLadder.tsx
│   │   │   └── PricingCard.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Ladder.tsx
│   │   │   ├── Cases.tsx
│   │   │   ├── Matrix.tsx
│   │   │   ├── MoreCapabilities.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── About.tsx
│   │   │   └── Footer.tsx
│   │   ├── scripts/                         # 8 simulator scripts + mini app mocks
│   │   │   ├── shop.ts
│   │   │   ├── bookit.ts
│   │   │   ├── quiz.ts
│   │   │   ├── photo.ts
│   │   │   ├── guard.ts
│   │   │   ├── support.ts
│   │   │   ├── voice.ts
│   │   │   └── ref.ts
│   │   ├── data/
│   │   │   ├── cases.ts                     # 13 case records
│   │   │   ├── capabilities.ts              # feature × case coverage
│   │   │   ├── pricing.ts                   # 5 tiers
│   │   │   └── types.ts                     # shared TS types
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── MiniApp.tsx                  # served at /mini-app
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── app.css                          # Tailwind v4 theme (CSS-first)
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── vercel.json
├── mini-app-backend/                        # FastAPI + aiogram (Railway)
│   ├── app/
│   │   ├── main.py                          # FastAPI app + webhook route
│   │   ├── bot.py                           # aiogram handlers
│   │   └── config.py                        # env loading
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── railway.json
│   └── .env.example
├── docs/superpowers/
│   ├── specs/2026-04-19-telegram-bots-portfolio-design.md
│   └── plans/2026-04-19-telegram-bots-portfolio-implementation.md   # this file
├── .gitignore
└── README.md
```

---

## Phase 0 — Project setup

### Task 1: Scaffold Vite + TypeScript + React

**Files:**
- Create: `site/` (npm create vite scaffold)
- Create: `.gitignore` at repo root
- Modify: `site/package.json`

- [ ] **Step 1: Scaffold Vite project**

```bash
cd /Users/macbookpro/telegram-bots-portfolio
npm create vite@latest site -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

```bash
cd site
npm install
npm install framer-motion lucide-react qrcode
npm install -D @types/qrcode tailwindcss@next @tailwindcss/vite@next vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Add root `.gitignore`**

Create `/Users/macbookpro/telegram-bots-portfolio/.gitignore`:

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
__pycache__/
*.pyc
.venv/
.vercel/
.railway/
coverage/
```

- [ ] **Step 4: Commit**

```bash
cd /Users/macbookpro/telegram-bots-portfolio
git add -A
git commit -m "chore: scaffold Vite + React + TS site project"
```

---

### Task 2: Configure Tailwind v4 (CSS-first)

**Files:**
- Modify: `site/vite.config.ts`
- Create: `site/src/app.css`
- Modify: `site/src/main.tsx` (import app.css)

- [ ] **Step 1: Configure Vite with Tailwind v4 plugin**

Replace `site/vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 2: Create CSS-first theme file**

Create `site/src/app.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg-base: #0a0e1a;
  --color-bg-deeper: #0f1220;
  --color-accent-purple: #8b5cf6;
  --color-accent-cyan: #06b6d4;
  --color-glass-border: rgba(255, 255, 255, 0.1);
  --color-glass-fill: rgba(255, 255, 255, 0.05);

  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

html, body, #root {
  min-height: 100vh;
  background: radial-gradient(ellipse at top, var(--color-bg-deeper) 0%, var(--color-bg-base) 70%);
  color: white;
  font-family: var(--font-sans);
}

@media (prefers-reduced-transparency: reduce) {
  .glass-card {
    background: rgb(20 22 36) !important;
    backdrop-filter: none !important;
  }
}
```

- [ ] **Step 3: Import CSS in main.tsx**

Modify `site/src/main.tsx` to import `./app.css` instead of any auto-generated styles, and remove the default `index.css` import.

- [ ] **Step 4: Create test setup file**

Create `site/src/test-setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Verify build works**

```bash
cd site
npm run build
```

Expected: builds without error.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: add Tailwind v4 + Vitest setup"
```

---

### Task 3: Create folder skeleton

**Files:**
- Create: `site/src/components/`, `site/src/sections/`, `site/src/scripts/`, `site/src/data/`, `site/src/pages/` (as empty dirs with `.gitkeep`)

- [ ] **Step 1: Create dirs**

```bash
cd /Users/macbookpro/telegram-bots-portfolio/site/src
mkdir -p components sections scripts data pages
touch components/.gitkeep sections/.gitkeep scripts/.gitkeep data/.gitkeep pages/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: add folder skeleton"
```

---

## Phase 1 — Shared types and data

### Task 4: Define core TypeScript types

**Files:**
- Create: `site/src/data/types.ts`

- [ ] **Step 1: Write all shared types**

Create `site/src/data/types.ts`:

```ts
export type CaseId =
  | 'olivia' | 'taro' | 'repair' | 'broadcaster'
  | 'taptoorder'
  | 'shop' | 'bookit' | 'quiz' | 'photo'
  | 'guard' | 'support' | 'voice' | 'ref'

export type Complexity = 1 | 2 | 3 | 4

export type CaseKind = 'real' | 'miniapp' | 'simulator'

export interface Case {
  id: CaseId
  name: string           // Ukrainian display name
  tagline: string        // 1-line description
  kind: CaseKind
  complexity: Complexity
  stack: string[]        // badges like ['aiogram', 'Stars', 'Postgres']
  category: string       // e-commerce, booking, etc.
  handle?: string        // @username for real bots
  scriptName?: string    // filename in /scripts without .ts
  realBot?: {
    telegramUrl: string
    screenshots?: string[]
  }
}

export type EventId = string

export type ChatEvent = { id?: EventId } & (
  | { role: 'bot' | 'user'; type: 'text'; text: string; delayMs?: number }
  | { role: 'bot'; type: 'typing'; durationMs: number }
  | { role: 'bot'; type: 'buttons'; inline: Array<{ label: string; jumpTo: EventId }> }
  | { role: 'bot'; type: 'image'; src: string; caption?: string }
  | { role: 'user'; type: 'choice'; label: string; jumpTo: EventId }
  | { role: 'bot'; type: 'payment'; product: string; price: string }
  | { id: EventId; type: 'label' }
)

export interface Feature {
  id: string
  labelUa: string
  category: 'messaging' | 'payments' | 'ai' | 'admin' | 'integration' | 'ux'
}

export type Coverage = Record<CaseId, Record<string, 'full' | 'partial' | 'none'>>

export type PricingTier = 'starter' | 'business' | 'ai' | 'production' | 'support'
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: add shared TypeScript types"
```

---

## Phase 2 — Foundation UI components

### Task 5: `<GlassCard>` with smoke test

**Files:**
- Create: `site/src/components/GlassCard.tsx`
- Create: `site/src/components/GlassCard.test.tsx`

- [ ] **Step 1: Write failing test**

Create `site/src/components/GlassCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { GlassCard } from './GlassCard'

describe('<GlassCard>', () => {
  it('renders children', () => {
    render(<GlassCard>hello</GlassCard>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('applies glass-card class for reduced-transparency fallback', () => {
    const { container } = render(<GlassCard>x</GlassCard>)
    expect(container.firstChild).toHaveClass('glass-card')
  })
})
```

- [ ] **Step 2: Run test, confirm it fails**

```bash
cd site && npx vitest run src/components/GlassCard.test.tsx
```

Expected: FAIL — GlassCard not exported.

- [ ] **Step 3: Implement**

Create `site/src/components/GlassCard.tsx`:

```tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  interactive?: boolean
  className?: string
}

export function GlassCard({ children, interactive = false, className = '' }: Props) {
  const base = 'glass-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50'
  const hover = interactive
    ? 'transition-transform hover:-translate-y-1 hover:border-white/20 cursor-pointer'
    : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className={`${base} ${hover} ${className}`}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
npx vitest run src/components/GlassCard.test.tsx
```

Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(ui): add <GlassCard> with smoke tests"
```

---

### Task 6: `<ComplexityBadge>` and `<StackBadge>`

**Files:**
- Create: `site/src/components/ComplexityBadge.tsx`
- Create: `site/src/components/StackBadge.tsx`
- Create: `site/src/components/badges.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `site/src/components/badges.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { ComplexityBadge } from './ComplexityBadge'
import { StackBadge } from './StackBadge'

describe('<ComplexityBadge>', () => {
  it('renders 3 filled dots for level 3', () => {
    const { container } = render(<ComplexityBadge level={3} />)
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-filled="false"]')).toHaveLength(1)
  })
})

describe('<StackBadge>', () => {
  it('renders the name', () => {
    render(<StackBadge name="aiogram" />)
    expect(screen.getByText('aiogram')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Implement ComplexityBadge**

Create `site/src/components/ComplexityBadge.tsx`:

```tsx
import { Complexity } from '../data/types'

const LABELS: Record<Complexity, string> = {
  1: 'Basic',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Production',
}

export function ComplexityBadge({ level }: { level: Complexity }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-white/70">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            data-filled={i <= level}
            className={`h-2 w-2 rounded-full ${i <= level ? 'bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)]' : 'bg-white/15'}`}
          />
        ))}
      </div>
      <span>{LABELS[level]}</span>
    </div>
  )
}
```

- [ ] **Step 3: Implement StackBadge**

Create `site/src/components/StackBadge.tsx`:

```tsx
export function StackBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/80">
      {name}
    </span>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/badges.test.tsx
```

Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(ui): add complexity and stack badges"
```

---

### Task 7: `<QRCode>` component

**Files:**
- Create: `site/src/components/QRCode.tsx`
- Create: `site/src/components/QRCode.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { render, waitFor } from '@testing-library/react'
import { QRCode } from './QRCode'

describe('<QRCode>', () => {
  it('renders an <svg> with the link encoded', async () => {
    const { container } = render(<QRCode link="https://t.me/test" />)
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Implement**

Create `site/src/components/QRCode.tsx`:

```tsx
import { useEffect, useState } from 'react'
import QRCodeLib from 'qrcode'

export function QRCode({ link, size = 160 }: { link: string; size?: number }) {
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    QRCodeLib.toString(link, {
      type: 'svg',
      width: size,
      color: { dark: '#ffffff', light: '#00000000' },
      margin: 1,
    }).then(setSvg)
  }, [link, size])

  return (
    <div
      className="inline-block"
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
```

- [ ] **Step 3: Run test**

```bash
npx vitest run src/components/QRCode.test.tsx
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(ui): add QRCode component"
```

---

### Task 8: `<AmbientOrbs>` and `<FakeTelegramFrame>`

**Files:**
- Create: `site/src/components/AmbientOrbs.tsx`
- Create: `site/src/components/FakeTelegramFrame.tsx`

- [ ] **Step 1: Implement AmbientOrbs**

```tsx
import { motion } from 'framer-motion'

export function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {[
        { top: '10%', left: '20%', color: 'var(--color-accent-purple)' },
        { top: '60%', left: '70%', color: 'var(--color-accent-cyan)' },
        { top: '40%', left: '50%', color: '#ec4899' },
      ].map((o, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            top: o.top, left: o.left, backgroundColor: o.color,
            width: 500, height: 500, filter: 'blur(120px)', opacity: 0.25,
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Implement FakeTelegramFrame**

```tsx
import { ReactNode } from 'react'

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
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(ui): add ambient orbs + fake telegram frame"
```

---

## Phase 3 — `<TelegramChatSim>` engine (critical path)

### Task 9: Build simulator engine with playback logic (TDD)

**Files:**
- Create: `site/src/components/TelegramChatSim.tsx`
- Create: `site/src/components/TelegramChatSim.test.tsx`

- [ ] **Step 1: Write failing test for linear playback**

Create `site/src/components/TelegramChatSim.test.tsx`:

```tsx
import { render, screen, act } from '@testing-library/react'
import { TelegramChatSim } from './TelegramChatSim'
import { ChatEvent } from '../data/types'

describe('<TelegramChatSim>', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('plays events in order and calls onComplete', async () => {
    const script: ChatEvent[] = [
      { role: 'bot', type: 'text', text: 'Hi', delayMs: 100 },
      { role: 'bot', type: 'text', text: 'Bye', delayMs: 100 },
    ]
    const onComplete = vi.fn()
    render(<TelegramChatSim script={script} botName="Test" onComplete={onComplete} />)
    await act(async () => { await vi.advanceTimersByTimeAsync(500) })
    expect(screen.getByText('Hi')).toBeInTheDocument()
    expect(screen.getByText('Bye')).toBeInTheDocument()
    expect(onComplete).toHaveBeenCalled()
  })

  it('pauses on buttons event and jumps on click', async () => {
    const script: ChatEvent[] = [
      { role: 'bot', type: 'buttons', inline: [{ label: 'Go', jumpTo: 'end' }] },
      { role: 'bot', type: 'text', text: 'Skipped' },
      { id: 'end', role: 'bot', type: 'text', text: 'Arrived' },
    ]
    const { getByRole } = render(<TelegramChatSim script={script} botName="Test" />)
    await act(async () => { await vi.advanceTimersByTimeAsync(100) })
    getByRole('button', { name: 'Go' }).click()
    await act(async () => { await vi.advanceTimersByTimeAsync(500) })
    expect(screen.getByText('Arrived')).toBeInTheDocument()
    expect(screen.queryByText('Skipped')).not.toBeInTheDocument()
  })

  it('warns on unresolved jumpTo in dev', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const script: ChatEvent[] = [
      { role: 'bot', type: 'buttons', inline: [{ label: 'X', jumpTo: 'nowhere' }] },
    ]
    const { getByRole } = render(<TelegramChatSim script={script} botName="T" />)
    await act(async () => { await vi.advanceTimersByTimeAsync(100) })
    getByRole('button', { name: 'X' }).click()
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('nowhere'))
    warn.mockRestore()
  })
})
```

- [ ] **Step 2: Implement the simulator**

Create `site/src/components/TelegramChatSim.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react'
import { ChatEvent } from '../data/types'

interface Props {
  script: ChatEvent[]
  botName: string
  autoplay?: boolean
  onComplete?: () => void
}

interface RenderedMsg { role: 'bot' | 'user'; type: 'text' | 'image' | 'payment'; text?: string; src?: string; caption?: string; product?: string; price?: string }

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function TelegramChatSim({ script, botName, autoplay = true, onComplete }: Props) {
  const [messages, setMessages] = useState<RenderedMsg[]>([])
  const [pending, setPending] = useState<ChatEvent | null>(null)
  const [typing, setTyping] = useState(false)
  const pointer = useRef(0)
  const completed = useRef(false)

  const reduce = prefersReducedMotion()
  const scale = reduce ? 0 : 1

  useEffect(() => {
    if (!autoplay) return
    let cancelled = false

    const run = async () => {
      while (pointer.current < script.length && !cancelled) {
        const ev = script[pointer.current]
        if (ev.type === 'label') { pointer.current++; continue }
        if (ev.type === 'buttons' || (ev.type === 'choice' && ev.role === 'user')) {
          setPending(ev); return
        }
        if (ev.type === 'typing') {
          setTyping(true)
          await sleep(ev.durationMs * scale)
          setTyping(false)
        } else {
          const delay = ('delayMs' in ev ? (ev.delayMs ?? 400) : 400) * scale
          await sleep(Math.min(delay, reduce ? 50 : 2000))
          if (cancelled) return
          if (ev.type === 'text') setMessages((m) => [...m, { role: ev.role, type: 'text', text: ev.text }])
          else if (ev.type === 'image') setMessages((m) => [...m, { role: 'bot', type: 'image', src: ev.src, caption: ev.caption }])
          else if (ev.type === 'payment') setMessages((m) => [...m, { role: 'bot', type: 'payment', product: ev.product, price: ev.price }])
        }
        pointer.current++
      }
      if (!cancelled && !completed.current) {
        completed.current = true
        onComplete?.()
      }
    }
    run()
    return () => { cancelled = true }
  }, [pending])  // eslint-disable-line

  const handleChoice = (label: string, jumpTo: string) => {
    setMessages((m) => [...m, { role: 'user', type: 'text', text: label }])
    setPending(null)
    const idx = script.findIndex((e) => e.id === jumpTo)
    if (idx === -1) {
      console.warn(`[TelegramChatSim] jumpTo "${jumpTo}" did not match any event id. Ending playback.`)
      pointer.current = script.length
    } else {
      pointer.current = idx
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-[#0e1621] rounded-2xl max-w-md" role="log" aria-live="polite" aria-label={`Chat with ${botName}`}>
      {messages.map((m, i) => (
        <MessageBubble key={i} msg={m} />
      ))}
      {typing && <TypingDots />}
      {pending && pending.type === 'buttons' && (
        <div className="flex flex-wrap gap-2">
          {pending.inline.map((b) => (
            <button key={b.label} onClick={() => handleChoice(b.label, b.jumpTo)}
              className="rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20">
              {b.label}
            </button>
          ))}
        </div>
      )}
      {pending && pending.type === 'choice' && pending.role === 'user' && (
        <button onClick={() => handleChoice(pending.label, pending.jumpTo)}
          className="self-end rounded-2xl bg-[var(--color-accent-cyan)]/80 px-3 py-1 text-sm text-white">
          {pending.label}
        </button>
      )}
    </div>
  )
}

function MessageBubble({ msg }: { msg: RenderedMsg }) {
  const isUser = msg.role === 'user'
  const align = isUser ? 'self-end bg-[var(--color-accent-cyan)]/80' : 'self-start bg-white/10'
  if (msg.type === 'payment') {
    return <div className={`rounded-2xl px-3 py-2 text-sm ${align} max-w-[80%]`}>
      <div className="font-medium">{msg.product}</div>
      <div className="text-xs text-white/70">⭐ {msg.price}</div>
    </div>
  }
  if (msg.type === 'image') {
    return <div className={`rounded-2xl overflow-hidden ${align} max-w-[80%]`}>
      <img src={msg.src} alt="" className="w-full" />
      {msg.caption && <div className="p-2 text-xs text-white/80">{msg.caption}</div>}
    </div>
  }
  return <div className={`rounded-2xl px-3 py-2 text-sm text-white ${align} max-w-[80%] whitespace-pre-wrap`}>{msg.text}</div>
}

function TypingDots() {
  return (
    <div className="self-start flex gap-1 bg-white/10 rounded-2xl px-3 py-2">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  )
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }
```

- [ ] **Step 3: Run tests**

```bash
npx vitest run src/components/TelegramChatSim.test.tsx
```

Expected: 3 PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(sim): add TelegramChatSim with playback, jumpTo, a11y"
```

---

## Phase 4 — Reference simulator script (ShopBot)

### Task 10: Write and wire ShopBot script

**Files:**
- Create: `site/src/scripts/shop.ts`

- [ ] **Step 1: Write the script**

Create `site/src/scripts/shop.ts`:

```ts
import { ChatEvent } from '../data/types'

export const shopScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: 'Привіт! Я ShopBot 🛒\nЩо шукаємо сьогодні?', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '👕 Футболки', jumpTo: 'tshirts' },
    { label: '☕ Кружки', jumpTo: 'mugs' },
    { label: '📦 Всі товари', jumpTo: 'all' },
  ] },
  { id: 'tshirts', role: 'bot', type: 'text', text: 'Футболки в наявності:', delayMs: 400 },
  { role: 'bot', type: 'text', text: '👕 Класична чорна — 450 UAH\n👕 Winter Vibes — 550 UAH', delayMs: 600 },
  { role: 'bot', type: 'buttons', inline: [
    { label: 'Додати до кошика', jumpTo: 'cart' },
  ] },
  { id: 'mugs', role: 'bot', type: 'text', text: '☕ Кружка керамічна — 280 UAH', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [
    { label: 'Додати до кошика', jumpTo: 'cart' },
  ] },
  { id: 'all', role: 'bot', type: 'text', text: 'Повний каталог → /catalog (12 товарів)', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [
    { label: 'До кошика', jumpTo: 'cart' },
  ] },
  { id: 'cart', role: 'bot', type: 'text', text: '🛒 Кошик: 1 товар на 450 UAH', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [
    { label: 'Оплатити ⭐ Stars', jumpTo: 'pay' },
  ] },
  { id: 'pay', role: 'bot', type: 'typing', durationMs: 800 },
  { role: 'bot', type: 'payment', product: 'Футболка чорна', price: '450 UAH' },
  { role: 'bot', type: 'text', text: '✅ Оплачено! Замовлення #8241 прийнято.\nДоставка 2-3 дні.', delayMs: 800 },
]
```

- [ ] **Step 2: Smoke test by rendering in App**

Temporarily modify `site/src/App.tsx` to render `<TelegramChatSim script={shopScript} botName="ShopBot" />` inside a `<GlassCard>` on a black background.

Run dev server and verify interaction end-to-end.

```bash
npm run dev
```

Open browser, click through buttons, verify flow works.

- [ ] **Step 3: Revert App.tsx test harness**

Remove the temporary render.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(script): add ShopBot reference simulator script"
```

---

## Phase 5 — Remaining 7 simulator scripts

### Task 11: BookIt script (appointment booking)

**Files:** Create: `site/src/scripts/bookit.ts`

- [ ] **Step 1: Write script** covering: hi → choose service → calendar date buttons (3 options) → time buttons (3 options) → confirmation with details → reminder setup.

Use the pattern from `shop.ts`. ~15-20 events.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(script): add BookIt booking simulator"
```

### Task 12: QuizMaster script

**Files:** Create: `site/src/scripts/quiz.ts`

- [ ] **Step 1: Write script** — category → Q1 (4 choices, correct jumps to Q2, wrong to retry) → Q2 → Q3 → final score + leaderboard rank.

- [ ] **Step 2: Commit**

### Task 13: PhotoMagic script

**Files:** Create: `site/src/scripts/photo.ts`

- [ ] **Step 1: Write script** — upload photo (simulated image event) → choose style (Anime/Oil/Cyberpunk) → typing "Generating..." → result image (placeholder) → share buttons.

- [ ] **Step 2: Commit**

### Task 14: GuardBot script

**Files:** Create: `site/src/scripts/guard.ts`

- [ ] **Step 1: Write script** showing group context — new user joins → welcome message → captcha challenge → pass/fail branches → spam message → auto-delete + ban notification.

- [ ] **Step 2: Commit**

### Task 15: SupportHero script

**Files:** Create: `site/src/scripts/support.ts`

- [ ] **Step 1: Write script** — "How can I help?" → 3 categories (Billing/Tech/Other) → each creates ticket → agent handoff → SLA message.

- [ ] **Step 2: Commit**

### Task 16: VoiceNote AI script

**Files:** Create: `site/src/scripts/voice.ts`

- [ ] **Step 1: Write script** — simulated voice message (text "🎤 Voice 0:12") → typing "Транскрибую..." → transcript → typing "Думаю..." → GPT summary answer → follow-up buttons.

- [ ] **Step 2: Commit**

### Task 17: RefMaster script

**Files:** Create: `site/src/scripts/ref.ts`

- [ ] **Step 1: Write script** — /start → personal ref link generated → stats panel (clicks, signups, earnings) → payout button → payout confirmation.

- [ ] **Step 2: Commit**

---

## Phase 6 — Data files

### Task 18: Populate `cases.ts` with all 13 case records

**Files:** Create: `site/src/data/cases.ts`

- [ ] **Step 1: Write all 13 case entries**

```ts
import { Case } from './types'

export const cases: Case[] = [
  {
    id: 'olivia', name: 'Olivia Arcana', kind: 'real', complexity: 3,
    tagline: 'Таро + астрологія + VIP-підписка з AI-персоною',
    stack: ['aiogram', 'Claude', 'Stars', 'CryptoBot', 'Postgres'],
    category: 'AI-астрологія',
    handle: '@OliviaArcanaBot',
    realBot: { telegramUrl: 'https://t.me/OliviaArcanaBot' },
  },
  {
    id: 'taro', name: 'Містичне Таро', kind: 'real', complexity: 3,
    tagline: 'Трьохмовний бот таро з GPT-4o та платежами',
    stack: ['aiogram', 'GPT-4o', 'Stars', 'CryptoBot', 'SQLite'],
    category: 'Таро',
    handle: '@yourtarouabot',
    realBot: { telegramUrl: 'https://t.me/yourtarouabot' },
  },
  {
    id: 'repair', name: 'Ремонт Одягу', kind: 'real', complexity: 4,
    tagline: 'Production-бот для ательє: замовлення, статуси, клієнти',
    stack: ['grammY', 'NestJS', 'Prisma', 'Postgres', 'Docker'],
    category: 'Бізнес-процеси',
    handle: '@clothsrepairOdesabot',
    realBot: { telegramUrl: 'https://t.me/clothsrepairOdesabot' },
  },
  {
    id: 'broadcaster', name: 'Polymarket Broadcaster', kind: 'real', complexity: 1,
    tagline: 'Односторонній розсилник торгових сигналів у канал',
    stack: ['httpx', 'Python', 'Cron'],
    category: 'Розсилки',
  },
  {
    id: 'taptoorder', name: 'TapToOrder', kind: 'miniapp', complexity: 4,
    tagline: 'Telegram Mini App: магазин із кошиком і Stars-оплатою',
    stack: ['Mini App SDK', 'FastAPI', 'aiogram', 'React', 'Stars'],
    category: 'Mini App / E-commerce',
    handle: '@TapToOrderDemoBot',
    realBot: { telegramUrl: 'https://t.me/TapToOrderDemoBot' },
  },
  { id: 'shop', name: 'ShopBot', kind: 'simulator', complexity: 2,
    tagline: 'Каталог + кошик + Stars-оплата',
    stack: ['aiogram', 'Stars', 'SQLite'], category: 'E-commerce', scriptName: 'shop' },
  { id: 'bookit', name: 'BookIt', kind: 'simulator', complexity: 2,
    tagline: 'Запис на послугу з календарем і часовими слотами',
    stack: ['aiogram', 'Postgres', 'Calendar'], category: 'Booking', scriptName: 'bookit' },
  { id: 'quiz', name: 'QuizMaster', kind: 'simulator', complexity: 2,
    tagline: 'Тести з таймером, очками та таблицею лідерів',
    stack: ['aiogram', 'Redis'], category: 'Ігри', scriptName: 'quiz' },
  { id: 'photo', name: 'PhotoMagic', kind: 'simulator', complexity: 3,
    tagline: 'Фото → AI-стилізація → результат',
    stack: ['aiogram', 'Flux API', 'S3'], category: 'AI Photo', scriptName: 'photo' },
  { id: 'guard', name: 'GuardBot', kind: 'simulator', complexity: 2,
    tagline: 'Антиспам + welcome-flow + капча для груп',
    stack: ['aiogram', 'Redis'], category: 'Модерація', scriptName: 'guard' },
  { id: 'support', name: 'SupportHero', kind: 'simulator', complexity: 3,
    tagline: 'Тікет-система з передачею агенту та SLA',
    stack: ['aiogram', 'Postgres', 'Webhooks'], category: 'Підтримка', scriptName: 'support' },
  { id: 'voice', name: 'VoiceNote AI', kind: 'simulator', complexity: 3,
    tagline: 'Голосові → транскрипт → GPT-відповідь',
    stack: ['aiogram', 'Whisper', 'GPT-4o'], category: 'Voice AI', scriptName: 'voice' },
  { id: 'ref', name: 'RefMaster', kind: 'simulator', complexity: 2,
    tagline: 'Реферальна програма + статистика + виплати',
    stack: ['aiogram', 'Postgres'], category: 'Referral', scriptName: 'ref' },
]
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(data): add 13 case records"
```

---

### Task 19: Populate `capabilities.ts`

**Files:** Create: `site/src/data/capabilities.ts`

- [ ] **Step 1: Define features and coverage**

```ts
import { Feature, Coverage } from './types'

export const features: Feature[] = [
  { id: 'stars', labelUa: 'Платежі Stars', category: 'payments' },
  { id: 'crypto', labelUa: 'CryptoBot', category: 'payments' },
  { id: 'fiat', labelUa: 'Картки / Monobank', category: 'payments' },
  { id: 'llm', labelUa: 'LLM (GPT / Claude)', category: 'ai' },
  { id: 'voice', labelUa: 'Голос → текст', category: 'ai' },
  { id: 'image-gen', labelUa: 'Генерація зображень', category: 'ai' },
  { id: 'webhook', labelUa: 'Webhooks', category: 'integration' },
  { id: 'inline-kb', labelUa: 'Inline-клавіатури', category: 'messaging' },
  { id: 'fsm', labelUa: 'FSM / діалоги', category: 'messaging' },
  { id: 'db', labelUa: 'БД (SQLite / Postgres)', category: 'integration' },
  { id: 'i18n', labelUa: 'Мультимова', category: 'ux' },
  { id: 'admin', labelUa: 'Адмін-панель', category: 'admin' },
  { id: 'contact', labelUa: 'Contact share', category: 'messaging' },
  { id: 'channel', labelUa: 'Розсилка в канал', category: 'messaging' },
  { id: 'stream', labelUa: 'Streaming AI', category: 'ai' },
  { id: 'rate-limit', labelUa: 'Rate-limiting', category: 'integration' },
  { id: 'docker', labelUa: 'Docker / Deploy', category: 'integration' },
  { id: 'miniapp', labelUa: 'Mini App', category: 'ux' },
  { id: 'moderation', labelUa: 'Group moderation', category: 'admin' },
  { id: 'analytics', labelUa: 'Аналітика', category: 'admin' },
]

export const coverage: Coverage = {
  olivia: { stars: 'full', crypto: 'full', llm: 'full', fsm: 'full', db: 'full', i18n: 'full', admin: 'full', channel: 'full', stream: 'full', rate-limit: 'full', inline-kb: 'full' },
  taro: { stars: 'full', crypto: 'full', fiat: 'full', llm: 'full', fsm: 'full', db: 'full', i18n: 'full', admin: 'full', inline-kb: 'full', stream: 'full' },
  repair: { webhook: 'full', fsm: 'full', db: 'full', admin: 'full', contact: 'full', docker: 'full', inline-kb: 'full', i18n: 'partial', rate-limit: 'full' },
  broadcaster: { channel: 'full', rate-limit: 'full' },
  taptoorder: { stars: 'full', miniapp: 'full', webhook: 'full', fsm: 'full', db: 'full', docker: 'full', inline-kb: 'full' },
  shop: { stars: 'full', fsm: 'full', db: 'full', inline-kb: 'full', admin: 'partial' },
  bookit: { fsm: 'full', db: 'full', inline-kb: 'full', admin: 'full' },
  quiz: { fsm: 'full', db: 'full', inline-kb: 'full', rate-limit: 'full' },
  photo: { image-gen: 'full', fsm: 'full', inline-kb: 'full', rate-limit: 'full' },
  guard: { moderation: 'full', fsm: 'full', admin: 'full', rate-limit: 'full' },
  support: { fsm: 'full', db: 'full', webhook: 'full', admin: 'full', analytics: 'partial' },
  voice: { voice: 'full', llm: 'full', stream: 'full', fsm: 'full' },
  ref: { fsm: 'full', db: 'full', analytics: 'full', admin: 'full' },
} as Coverage
```

**Note:** The object keys with hyphens need to be quoted — fix that in your implementation. The sketch above uses shorthand for readability; in real code write `'rate-limit': 'full'`, `'inline-kb': 'full'`, `'image-gen': 'full'`.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(data): add capability matrix with 20 features × 13 cases"
```

---

### Task 20: Populate `pricing.ts`

**Files:** Create: `site/src/data/pricing.ts`

- [ ] **Step 1: Write pricing data**

```ts
import { PricingTier } from './types'

export interface PricingPackage {
  tier: PricingTier
  name: string
  subtitle: string
  uah: string
  usd: string
  timeline: string
  features: string[]
  highlight?: boolean
}

export const pricing: PricingPackage[] = [
  { tier: 'starter', name: 'Старт', subtitle: 'Розсилка, FAQ, запис',
    uah: '20 000 – 36 000 грн', usd: '$500 – 900', timeline: '3-7 днів',
    features: ['До 10 команд', 'Базова БД', '1 мова', 'Деплой на free-tier'] },
  { tier: 'business', name: 'Бізнес', subtitle: 'Каталог + платежі',
    uah: '60 000 – 120 000 грн', usd: '$1 500 – 3 000', timeline: '2-3 тижні',
    features: ['Каталог товарів', 'Stars / CryptoBot', 'Адмін-панель', 'Webhooks'], highlight: true },
  { tier: 'ai', name: 'AI-бот', subtitle: 'GPT/Claude + VIP',
    uah: '140 000 – 260 000 грн', usd: '$3 500 – 6 500', timeline: '3-5 тижнів',
    features: ['AI-персона', 'Stars + Crypto', 'Мультимова', 'VIP-підписка', 'Streaming'] },
  { tier: 'production', name: 'Production', subtitle: 'CRM, SLA, масштаб',
    uah: 'від 320 000 грн', usd: 'від $8 000', timeline: '6-10 тижнів',
    features: ['CRM-інтеграція', 'Docker + CI/CD', 'Моніторинг', 'SLA 99.9%', 'Мульти-сервер'] },
  { tier: 'support', name: 'Підтримка', subtitle: 'Щомісяця',
    uah: '16 000 грн/міс', usd: '$400/міс', timeline: '—',
    features: ['Багфікси', 'Нові фічі', 'Моніторинг', 'Консультації 5 год/міс'] },
]
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(data): add pricing tiers"
```

---

## Phase 7 — Sections

### Task 21: `<BotPreviewModal>` and `<Cases>` section

**Files:** Create: `site/src/components/BotPreviewModal.tsx`, `site/src/sections/Cases.tsx`

- [ ] **Step 1: Implement BotPreviewModal**

```tsx
import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props { open: boolean; onClose: () => void; title: string; children: ReactNode }

export function BotPreviewModal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog" aria-modal="true" aria-label={title}
            className="relative w-full max-w-lg max-h-[90vh] overflow-auto glass-card rounded-3xl border border-white/10 bg-[#0f1220] p-6">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white" aria-label="Закрити">
              <X size={20} />
            </button>
            <h3 className="mb-4 text-xl font-semibold">{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Implement Cases section**

Create `site/src/sections/Cases.tsx`. Render a Bento grid of 13 cards using `cases` data and `<GlassCard interactive>`. Clicking opens `<BotPreviewModal>` with:
- Real bots → QR code + screenshots placeholder + "Відкрити в Telegram" button
- Simulator → dynamically imported script + `<TelegramChatSim>`
- Mini App → iframe of `/mini-app` in `<FakeTelegramFrame>` + QR

Use lazy-import for scripts:

```tsx
const scripts = {
  shop: () => import('../scripts/shop').then((m) => m.shopScript),
  bookit: () => import('../scripts/bookit').then((m) => m.bookitScript),
  // ...etc
}
```

- [ ] **Step 3: Run dev server, click every case card, verify modals open**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(sections): add Cases grid with preview modals"
```

---

### Task 22: `<Hero>` section

**Files:** Create: `site/src/sections/Hero.tsx`

- [ ] **Step 1: Implement**

```tsx
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <p className="uppercase tracking-wider text-sm text-white/60 mb-4">Telegram-боти на замовлення</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Будую Telegram-ботів<br />
          <span className="bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent">
            будь-якої складності
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Від простої розсилки до production-систем з AI, платежами та CRM-інтеграцією. 13 живих кейсів — дивись, натискай, тестуй.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#cases" className="rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] px-6 py-3 font-medium text-white">
            Подивитись кейси
          </a>
          <a href="#cta" className="rounded-full border border-white/20 px-6 py-3 text-white/90 hover:bg-white/5">
            Замовити бота
          </a>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(sections): add Hero"
```

---

### Task 23: Remaining sections (Ladder, Matrix, More, Pricing, Process, About, Footer)

**Files:** Create 7 files in `site/src/sections/`

- [ ] **Step 1: Ladder** — 4 complexity tiers with positioned bots. Reuse `cases` filtered by `kind==='real'`.

- [ ] **Step 2: Matrix** — responsive table from `features` × `cases`, render coverage cell (`✓` green / `◐` yellow / `—` dim). Sticky first column on mobile using `position: sticky; left: 0`.

- [ ] **Step 3: MoreCapabilities** — 6 cards (CRM, Voice assistant, Group games, Multi-tenant, Moderation AI, Affiliate).

- [ ] **Step 4: Pricing** — 5 `<PricingCard>` in grid. Middle one (Business) has `highlight` border glow.

- [ ] **Step 5: Process** — 4-step horizontal flow (Brief → Prototype → Test → Deploy) with icons and 1-sentence each.

- [ ] **Step 6: About + CTA** — placeholder avatar, 1 paragraph bio in Ukrainian, stack logos row, Telegram + email + inline `mailto:` form. CTA section id=`cta`.

- [ ] **Step 7: Footer** — copyright, year, "Built by Serhii" credit.

- [ ] **Step 8: Assemble in `Home.tsx` in order: Hero, Ladder, Cases, Matrix, MoreCapabilities, Pricing, Process, About, Footer.**

- [ ] **Step 9: Visual check at dev server**

```bash
npm run dev
```

Scroll through all sections. Check desktop + mobile viewport.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat(sections): assemble full portfolio page"
```

---

## Phase 8 — Mini App

### Task 24: Scaffold Mini App backend

**Files:**
- Create: `mini-app-backend/app/main.py`
- Create: `mini-app-backend/app/bot.py`
- Create: `mini-app-backend/app/config.py`
- Create: `mini-app-backend/requirements.txt`
- Create: `mini-app-backend/Dockerfile`
- Create: `mini-app-backend/.env.example`
- Create: `mini-app-backend/railway.json`

- [ ] **Step 1: requirements.txt**

```
fastapi==0.118.0
uvicorn[standard]==0.37.0
aiogram==3.22.0
python-dotenv==1.1.1
```

- [ ] **Step 2: config.py**

```python
import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "")
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "")
MINI_APP_URL = os.getenv("MINI_APP_URL", "https://example.vercel.app/mini-app")

if not BOT_TOKEN:
    raise RuntimeError("BOT_TOKEN env var is required")
```

- [ ] **Step 3: bot.py with handlers**

```python
from aiogram import Bot, Dispatcher, Router
from aiogram.filters import Command
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo, LabeledPrice, PreCheckoutQuery
from .config import BOT_TOKEN, MINI_APP_URL

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()
router = Router()

@router.message(Command("start"))
async def start(m: Message):
    kb = InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(text="🛒 Відкрити магазин", web_app=WebAppInfo(url=MINI_APP_URL))
    ]])
    await m.answer("Ласкаво просимо в TapToOrder! Це демо Mini App — тестові Stars, гроші не списуються.", reply_markup=kb)

@router.pre_checkout_query()
async def pre_checkout(q: PreCheckoutQuery):
    await q.answer(ok=True)

@router.message(lambda m: m.successful_payment is not None)
async def paid(m: Message):
    await m.answer(f"✅ Дякуємо! Замовлення #{m.successful_payment.telegram_payment_charge_id[:6]} прийнято.")

dp.include_router(router)
```

- [ ] **Step 4: main.py (FastAPI + webhook)**

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from aiogram.types import Update
from .bot import bot, dp
from .config import WEBHOOK_URL

@asynccontextmanager
async def lifespan(app: FastAPI):
    if WEBHOOK_URL:
        await bot.set_webhook(f"{WEBHOOK_URL}/webhook", drop_pending_updates=True)
    yield
    await bot.delete_webhook()

app = FastAPI(lifespan=lifespan)

@app.get("/health")
async def health():
    return {"ok": True}

@app.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    update = Update.model_validate(data)
    await dp.feed_update(bot, update)
    return {"ok": True}
```

- [ ] **Step 5: Dockerfile**

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- [ ] **Step 6: .env.example**

```
BOT_TOKEN=
WEBHOOK_URL=
MINI_APP_URL=https://<vercel-subdomain>/mini-app
```

- [ ] **Step 7: railway.json**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "DOCKERFILE" },
  "deploy": { "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT", "healthcheckPath": "/health" }
}
```

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat(miniapp): scaffold FastAPI + aiogram backend"
```

---

### Task 25: Mini App frontend route

**Files:**
- Create: `site/src/pages/MiniApp.tsx`
- Modify: `site/src/App.tsx` (add route)

- [ ] **Step 1: Install @twa-dev/sdk**

```bash
cd site && npm install @twa-dev/sdk
```

- [ ] **Step 2: Implement MiniApp.tsx**

Component with: 6 mock products grid, cart state (useState), total, "Оплатити ⭐" button that calls `tg.sendData(JSON.stringify(cart))` if in Telegram, or shows mock success in standalone mode. Wrap in `<FakeTelegramFrame>` when not in Telegram (check `window.Telegram?.WebApp`).

- [ ] **Step 3: Add router**

Install `react-router-dom`:

```bash
npm install react-router-dom
```

Modify `App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MiniApp } from './pages/MiniApp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mini-app" element={<MiniApp />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 4: Run dev, navigate to `/mini-app`, verify it renders standalone with fake frame**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(miniapp): add frontend /mini-app route with fake-frame fallback"
```

---

## Phase 9 — Deploy

### Task 26: Deploy site to Vercel

- [ ] **Step 1: Create vercel.json in site/**

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: add vercel SPA config"
```

- [ ] **Step 3: Deploy (Serhii runs manually)**

```bash
cd site && npx vercel --prod
```

- Vercel prompt: Root Directory = `site`
- Capture assigned `.vercel.app` URL.

---

### Task 27: Create Telegram bot + deploy backend

- [ ] **Step 1: Serhii creates bot**
  - Open `@BotFather` → `/newbot` → name `TapToOrder Demo` → username `TapToOrderDemoBot` → copy token.

- [ ] **Step 2: Set Mini App URL in BotFather**
  - `/newapp` → select bot → set Web App URL = `https://<vercel-subdomain>/mini-app` → title "Shop" → short description.

- [ ] **Step 3: Deploy to Railway**

```bash
cd mini-app-backend
railway login
railway init
railway up
```

- [ ] **Step 4: Set env vars in Railway dashboard**
  - `BOT_TOKEN` = (from BotFather)
  - `WEBHOOK_URL` = `https://<railway-subdomain>.up.railway.app`
  - `MINI_APP_URL` = `https://<vercel-subdomain>/mini-app`
  - Redeploy to pick up env.

- [ ] **Step 5: Smoke test**

```bash
curl https://<railway>.up.railway.app/health
# expect {"ok":true}
```

Open Telegram → `@TapToOrderDemoBot` → `/start` → tap "Відкрити магазин" → Mini App opens inside Telegram → add to cart → "Оплатити" → test Stars flow completes.

---

### Task 28: Final QA pass

- [ ] **Step 1: Lighthouse (Chrome DevTools)**

Open production site → Lighthouse → mobile, perf + a11y. Target: perf ≥ 90, a11y ≥ 95. Fix any failures.

- [ ] **Step 2: axe-core scan**

Open DevTools → axe extension → scan site. Fix all critical/serious issues.

- [ ] **Step 3: Ukrainian copy review checklist**

Go through Success Criteria §14 copy checklist in spec. Serhii approves each section.

- [ ] **Step 4: Mobile viewport check**

Chrome devtools → 375×812 (iPhone SE) + 390×844 (iPhone 13). Scroll through, check all modals open, simulators work, matrix is scrollable.

- [ ] **Step 5: Deploy QR deeplink verify**

On phone, scan each real-bot QR in the Cases section. Each one must open `@OliviaArcanaBot`, `@yourtarouabot`, `@clothsrepairOdesabot` respectively.

- [ ] **Step 6: Final commit tag**

```bash
git tag v1.0 && git push origin v1.0
```

---

## Success criteria (from spec §14)

- [ ] Lighthouse perf ≥ 90 mobile
- [ ] Lighthouse a11y ≥ 95
- [ ] 10+ case cards render and open demo modal
- [ ] All shipped simulators play end-to-end, every jumpTo resolves
- [ ] Mini App loads in Telegram iOS, mock checkout completes
- [ ] Mini App also loads standalone at `/mini-app` with FakeTelegramFrame
- [ ] `@clothsrepairOdesabot` QR works
- [ ] Site live on Vercel `.vercel.app`
- [ ] Backend `/health` → 200 in prod
- [ ] Copy review checklist (6 items) all approved by Serhii
