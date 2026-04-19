# Telegram Bots Portfolio — Design Spec

**Author:** Serhii
**Date:** 2026-04-19
**Status:** Approved for implementation planning

---

## 1. Purpose

A one-page Ukrainian-language marketing website that positions Serhii as a developer capable of building Telegram bots of any complexity — from a simple broadcaster to production systems integrated with business backends. The site converts visitors into inbound leads via a clear price structure and demo-first case studies.

### Primary outcomes

1. A potential client lands, scans 4-6 cases, understands the skill range, and clicks CTA within 90s.
2. Each case can be demo'd in-browser without installing Telegram (conversion unlock).
3. Explicit price tiers set expectations and filter unqualified leads.

### Non-goals

- No blog, CMS, or content system.
- No English locale in this phase (planned Phase 2).
- No real payment processing on the Mini App demo (mocked Telegram Stars flow).
- No analytics / A-B testing (post-launch concern).
- No CRM integration for inbound leads — just a Telegram link and email.

---

## 2. Audience

- **Primary:** SMB owners in Ukraine/Europe looking for a freelance bot developer (tarot readers, repair shops, e-commerce, coaches).
- **Secondary:** Ukrainian tech recruiters and agencies evaluating mid-to-senior bot/fullstack developers.
- **Language:** Ukrainian only.
- **Device mix:** assume 60% mobile, 40% desktop. Design mobile-first.

---

## 3. Case inventory (13 cases)

### 3.1 Real bots (4)

| # | Name | Path | Status | Demo method |
|---|---|---|---|---|
| 1 | **Olivia Arcana** (tarot + astrology + VIP) | `/Users/macbookpro/olivia-arcana` | Production (Cloud Run) | QR to `@OliviaArcanaBot` + screenshots + chat simulator |
| 2 | **Містичне Таро** (trilingual tarot) | `/Users/macbookpro/Downloads/tarot-bot` | Healthy, polling | QR to `@yourtarouabot` + chat simulator |
| 3 | **Ремонт Одягу** (order notifications) | `/Users/macbookpro/repair-shop/backend` | Production, `@clothsrepairOdesabot` | QR + chat simulator showing order status flow |
| 4 | **Polymarket Referral Broadcaster** | `/Users/macbookpro/scanner_build` | Deployed on VPS | Channel preview screenshot |

### 3.2 Telegram Mini App (1, newly built)

| # | Name | What | Stack |
|---|---|---|---|
| 5 | **TapToOrder** | Mini-shop with product cards, cart, mock Stars checkout — opens inside Telegram via Web App API | React frontend + FastAPI + aiogram backend (Railway free tier) |

### 3.3 Web chat simulators (8, newly built)

All 8 built from a single reusable `<TelegramChatSim>` component driven by scripted event arrays. Each runs entirely in-browser — zero backend, zero Telegram required.

| # | Name | Category | Demo shows |
|---|---|---|---|
| 6 | **ShopBot** | E-commerce | Catalog → inline cart → Stars checkout flow |
| 7 | **BookIt** | Booking | Calendar picker → time slot → confirmation |
| 8 | **QuizMaster** | Game | Timed Q&A → scoring → leaderboard |
| 9 | **PhotoMagic** | AI photo | Photo upload → Flux style picker → "result" |
| 10 | **GuardBot** | Moderation | Group welcome + spam detect + ban flow |
| 11 | **SupportHero** | Tickets | Issue → category → agent handoff with SLA |
| 12 | **VoiceNote AI** | Voice→Text | Voice msg → transcript → GPT summary |
| 13 | **RefMaster** | Referral | Generate link → stats → payout tier |

---

## 4. Site structure

One-page scroll. Anchor nav in sticky header.

1. **Hero** — headline "Будую Telegram-ботів будь-якої складності", sub-headline with 1-sentence positioning, 2 CTAs: `Дивитись кейси` (scroll to §3), `Замовити бота` (scroll to §8), animated bot avatars floating in background.
2. **Complexity ladder** — 4 dot-labeled tiers (Basic → Intermediate → Advanced → Production) with the real bots positioned on the scale. Educates visitor on what each tier means before they see the cases.
3. **Cases grid** — Bento layout (mixed card sizes), 13 cards. Each card: icon, name, 1-line description, complexity dots, stack badges, `Try demo →` or `Open Telegram →` button. Real bots have QR code on hover; simulators open in modal with `<TelegramChatSim>`; Mini App opens in iframe.
4. **Capability matrix** — table: ~20 Telegram Bot API features × 13 cases, coverage markers showing support. Sticky first column on mobile. Coverage uses 3 states: `✓` full, `◐` partial, `—` none. Data shape:

   ```ts
   type Feature = {
     id: string
     labelUa: string
     category: 'messaging' | 'payments' | 'ai' | 'admin' | 'integration' | 'ux'
   }
   type CaseId = 'olivia' | 'taro' | 'repair' | 'broadcaster' | 'taptoorder'
             | 'shop' | 'bookit' | 'quiz' | 'photo' | 'guard' | 'support' | 'voice' | 'ref'
   type Coverage = Record<CaseId, Record<string, 'full' | 'partial' | 'none'>>
   ```
   Types live in `site/src/data/capabilities.ts`. Missing keys default to `'none'`.
5. **What else I can build** — 6 cards of bot archetypes not represented in cases (CRM-integrated, group games, multi-tenant SaaS, voice assistant, moderation AI, affiliate tracking).
6. **Pricing** — 4 package cards + 1 support card. Each card: name, price range (UAH + USD), what's included, typical timeline. Disclaimer: infra and API costs extra.
7. **Process** — 4-step horizontal flow: Brief → Prototype → Test → Deploy, with 1-sentence each.
8. **About + CTA** — photo, 1 paragraph bio, stack logos, Telegram + email + inline form.
9. **Footer** — small links, copyright, year, built-with credit.

---

## 5. Visual design

### 5.1 Style system

- **Base:** dark (`#0a0e1a` to `#0f1220` gradient).
- **Accent:** duotone — purple `#8b5cf6` + cyan `#06b6d4`. Neutral enough to cover mystical (tarot cases) and B2B (repair shop).
- **Glass treatment:** `backdrop-blur-xl`, `bg-white/5`, `border border-white/10`, `shadow-2xl shadow-black/50` on cards.
- **Ambient lights:** 3-4 large blurred gradient orbs positioned behind content, slow drift animation (30s loop), `pointer-events-none`.
- **Typography:** Inter for UI; headings use increased letter-spacing (`tracking-tight` for large, `tracking-wider` for eyebrows). Mono (JetBrains) for code/commands in badges.
- **Motion:** Framer Motion for entrance animations (stagger on scroll), hover lift on cards, subtle parallax on orbs.
- **Icons:** Lucide React, custom bot icons inline SVG.

### 5.2 Accessibility baseline

- Contrast ratio ≥4.5:1 on all text vs glass backdrop (requires darkening cards where orbs land).
- Keyboard navigation on all interactive elements.
- Reduced-motion respects `prefers-reduced-motion`.
- Modal traps focus and returns on close.

---

## 6. Key components

Each component has one clear purpose and can be understood/tested in isolation.

| Component | Purpose | Props |
|---|---|---|
| `<GlassCard>` | Frosted glass container with hover lift | `size`, `interactive`, `children` |
| `<ComplexityBadge>` | Dot badge `⚫⚫⚫⚫` | `level: 1-4` |
| `<StackBadge>` | Tech chip (aiogram, grammy, Next.js, etc) | `name`, `icon?` |
| `<TelegramChatSim>` | Simulator: plays scripted chat | `script: ChatEvent[]`, `botName`, `autoplay` |
| `<BotPreviewModal>` | Fullscreen modal wrapping a simulator | `bot`, `onClose` |
| `<CapabilityMatrix>` | Responsive feature table | `features`, `bots` |
| `<ComplexityLadder>` | 4-step visual scale | `bots` (positioned on scale) |
| `<PricingCard>` | Price tier card | `tier: 'starter' \| 'business' \| 'ai' \| 'production' \| 'support'` |
| `<QRCode>` | SVG QR for Telegram deep link | `link` |
| `<AmbientOrbs>` | Background gradient blobs | — |
| `<FakeTelegramFrame>` | Telegram-chrome wrapper (status bar, header, safe area) rendered around the Mini App `/mini-app` route when embedded on the portfolio site | `children`, `theme: 'dark' \| 'light'` |

### 6.1 Simulator mechanic

`<TelegramChatSim>` accepts a `script` array:

```ts
type EventId = string // stable label used as jumpTo target

type ChatEvent = { id?: EventId } & (
  | { role: 'bot' | 'user'; type: 'text'; text: string; delayMs?: number }
  | { role: 'bot'; type: 'typing'; durationMs: number }
  | { role: 'bot'; type: 'buttons'; inline: Array<{ label: string; jumpTo: EventId }> }
  | { role: 'bot'; type: 'image'; src: string; caption?: string }
  | { role: 'user'; type: 'choice'; label: string; jumpTo: EventId } // clickable reply
  | { role: 'bot'; type: 'payment'; product: string; price: string }
  | { id: EventId; type: 'label' } // named anchor, no visible render
)

interface Props {
  script: ChatEvent[]
  botName: string
  autoplay?: boolean        // default true
  onComplete?: () => void   // fired when script reaches end (linear or jumped)
}
```

**Playback semantics:**
- Default is **linear autoplay** — events play in array order; `delayMs` / `durationMs` control pacing.
- Any event with `buttons` or `choice` type **pauses playback** until the user clicks. The chosen option's `jumpTo` sets the next event pointer by matching `id`.
- If `jumpTo` doesn't match any `id`, playback ends and logs a dev-only warning.
- When the pointer reaches the last event (linear or via jump with no further events), `onComplete()` fires.
- **No player controls** (no pause/restart button). Re-open the modal to replay — `BotPreviewModal` resets state on mount.

**Reduced motion:** when `prefers-reduced-motion: reduce` is set, all `typing` events collapse to 0ms and `delayMs` drops to 50ms max, so users see a near-instant transcript.

**Accessibility:**
- Transcript wrapper has `role="log"` and `aria-live="polite"` so screen readers announce new lines as they appear.
- All `buttons` and `choice` items render as real `<button>` elements in DOM order, focusable with Tab.
- Modal traps focus on open and restores on close (reused `<BotPreviewModal>` behavior).

Scripts live in `/src/scripts/<botName>.ts`. Each simulator is pure data — no custom code per bot beyond script authoring. This is the key architectural bet: 8 simulators = 1 component + 8 data files.

---

## 7. Mini App (TapToOrder) spec

### 7.1 User flow

1. User opens `@TapToOrderDemoBot` in Telegram → taps `Start` → taps `Відкрити магазин` button → Telegram opens Mini App in-chat.
2. Browses 6 mock products (t-shirts, mugs) → adds to cart → sees cart total.
3. Taps `Оплатити через Stars` → Telegram's native payment sheet appears (mocked invoice) → success screen.
4. Bot receives successful payment webhook → sends thank-you message in chat.

### 7.2 Tech

- **Frontend:** same React project, route `/mini-app`, uses `@twa-dev/sdk` for Telegram Web App init/theming. Works standalone in a regular browser (without Telegram) — when `window.Telegram.WebApp` is absent, the frontend renders inside `<FakeTelegramFrame>` so the portfolio site can embed `/mini-app` directly via same-origin iframe. **We never iframe `t.me`, `web.telegram.org`, or any Telegram-owned origin** — those block framing via CSP.
- **Backend:** Python FastAPI + aiogram, 1 Dockerfile, deploys to Railway free tier. **Bot runs in webhook mode** — on startup, backend calls `setWebhook` against its Railway public URL. Polling is not used because Railway's free sleep policy makes polling unreliable.
- **`pre_checkout_query` handler:** must respond within **10s** (Telegram hard limit) with `answerPreCheckoutQuery(ok=True)`; otherwise user sees "Payment expired." Handler is stateless — it always approves since this is a demo.
- **State:** in-memory cart (survives Mini App page lifetime); order record in SQLite. **SQLite is ephemeral on Railway** — deploys wipe the file. Acceptable for a demo since orders are mock. No volume mount required.
- **Payment:** `sendInvoice` with `currency: 'XTR'` (Stars). For Stars, **no `provider_token` is required** (Telegram handles the charge directly). Test Stars mode: use the `/stars` bot to credit a test account and mark the bot for demo use; explicit demo disclaimer in chat says "Тестовий магазин — гроші не списуються."
- **Domain:** Railway-provided subdomain, set as Mini App URL in `@BotFather`.

### 7.3 On the portfolio site

- Case card offers two paths: (a) **QR code** deep-linking to `t.me/TapToOrderDemoBot` for real Telegram experience, (b) **Embedded iframe** pointing at our own `/mini-app` route (same-origin) wrapped in `<FakeTelegramFrame>` so visitors see the UI without leaving the site.
- **Backend downtime fallback:** the portfolio-embedded iframe does NOT depend on backend — it's pure frontend. Only the "open in real Telegram" path touches backend. If backend is down (Railway cold start fail), the real-Telegram bot sends a fallback message "Демо тимчасово недоступне, напиши мені напряму @serhii_builds" via a simple static handler that runs even if the full app fails to init. The embedded demo stays 100% functional regardless.
- **Demo disclaimer visible in Mini App UI:** "Оплата через тестові Telegram Stars — справжні гроші не списуються."

---

## 8. Pricing (final copy for §6)

| Tier | Label | For whom | Price (UAH / USD) | Timeline |
|---|---|---|---|---|
| 1 | Старт | Розсилка, FAQ, запис на послугу | 20,000-36,000 / $500-900 | 3-7 днів |
| 2 | Бізнес | Каталог + платежі + адмінка | 60,000-120,000 / $1,500-3,000 | 2-3 тижні |
| 3 | AI-бот | GPT/Claude + Stars + мультимова + VIP | 140,000-260,000 / $3,500-6,500 | 3-5 тижнів |
| 4 | Production | CRM, Webhooks, Docker, інтеграції, SLA | від 320,000 / від $8,000 | 6-10 тижнів |
| 5 | Підтримка | Багфікси, нові фічі, моніторинг | 16,000 UAH/міс або 2,000 UAH/год | — |

Disclaimer under table: *"Ціни без вартості інфраструктури, API та платіжних комісій. Безкоштовний аудит ідеї за 30 хвилин."*

---

## 9. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Build tool | Vite | Fastest DX for React+TS today |
| Framework | React 18 + TypeScript | Standard, matches Serhii's existing stack |
| Styling | Tailwind CSS v4 | Glass utilities + utility-first speed. Uses v4's CSS-first config (`@theme` in `src/app.css`, no `tailwind.config.js`) |
| Motion | Framer Motion | Smooth scroll animations, gestures |
| Icons | Lucide React | Consistent, tree-shakable |
| QR | `qrcode` npm package | Render as SVG at runtime |
| Deploy (site) | Vercel | Static SPA, zero config |
| Deploy (Mini App) | Railway | Free tier covers this use case |
| Mini App frontend | Same Vite project, separate route | Share components |
| Mini App backend | FastAPI + aiogram + SQLite | Fits Serhii's Python stack |

### 9.1 File layout

```
telegram-bots-portfolio/
├── docs/superpowers/
│   ├── specs/                      # this file
│   └── plans/                      # implementation plan (next)
├── site/                           # Vite React project
│   ├── src/
│   │   ├── components/             # shared UI
│   │   ├── sections/               # Hero, Cases, Pricing, etc.
│   │   ├── cases/                  # one file per case
│   │   ├── scripts/                # simulator scripts (8 files)
│   │   ├── data/                   # capability matrix, pricing
│   │   └── App.tsx
│   └── public/
├── mini-app/
│   ├── backend/                    # FastAPI + aiogram
│   │   ├── main.py
│   │   ├── bot.py
│   │   └── Dockerfile
│   └── frontend/                   # reused React route
└── README.md
```

---

## 10. Testing strategy

- **Static:** `tsc --noEmit` and `eslint` on CI.
- **Visual:** manual verification via preview tools (preview_snapshot, preview_screenshot) in development.
- **Simulator scripts:** lightweight unit test that each script renders end-to-end without errors (vitest + react-testing-library, smoke-level only). Verify every `jumpTo` resolves to a valid `id`.
- **Accessibility:** one pass with axe-core DevTools post-build.
- **Mobile:** preview_resize to 375×812 iPhone SE and 390×844 iPhone 13 viewports.
- **Mini App backend smoke:** `curl https://<railway>/health` returns 200; dry-run `aiogram` script that posts `sendInvoice` to Serhii's test chat (not demo channel) before declaring ship-ready.
- **Mini App end-to-end:** manual test in actual Telegram client on iOS + Android (1 pass before ship).

## 10.5 Time budget (2 days, ~16h active)

**Day 1 (~8h):**
- Scaffold Vite + Tailwind + Framer Motion + routing (0.5h)
- Component library: `<GlassCard>`, `<ComplexityBadge>`, `<StackBadge>`, `<QRCode>`, `<AmbientOrbs>` (1.5h)
- `<TelegramChatSim>` **locked end-to-end with ShopBot as reference** (2.5h) — this is the critical dependency; until it's done, remaining simulators can't start
- Sections 1-3 (Hero + Ladder + Cases grid shell) (2h)
- Sections 4-5 (Capability matrix + "What else") (1.5h)

**Day 2 (~8h):**
- Remaining 7 simulator scripts (data-only, ~30min each = 3.5h)
- Sections 6-9 (Pricing + Process + About + Footer) (1.5h)
- Mini App backend (FastAPI + aiogram + Dockerfile) (1.5h)
- Mini App frontend `/mini-app` route + `<FakeTelegramFrame>` (1h)
- Deploy site (Vercel) + backend (Railway) + BotFather setup (0.5h)

**Buffer risks:** if `<TelegramChatSim>` overruns Day 1, cut 2-3 simulators and ship with 5-6 instead of 8 — spec allows this flexibly since the matrix still shows coverage.

---

## 11. Deployment

### 11.1 Env checklist

| Variable | Where stored | Used by | Set by |
|---|---|---|---|
| `BOT_TOKEN` | Railway secrets | Mini App backend | Serhii (manual, from BotFather) |
| `WEBHOOK_URL` | Railway secrets | Mini App backend on `setWebhook` call | Auto (Railway public URL) |
| `DEMO_CHANNEL_ID` | Railway secrets (optional) | Order confirmation messages | Serhii |

Nothing else is secret. `.env.example` committed with blank values; real `.env` gitignored.

### 11.2 Step-by-step

0. **Serhii creates `@TapToOrderDemoBot`** via `@BotFather` (`/newbot` → set name → receive token). Copies token to Railway env `BOT_TOKEN` before first deploy.
1. **Site:** Vercel project root = `/site` (subdirectory deploy — configured in Vercel dashboard, not repo root). Run `vercel --prod` or push to `main` with GitHub integration. Uses Vercel's `.vercel.app` subdomain for this phase; custom domain deferred.
2. **Mini App backend:** `railway up` from `/mini-app/backend`. After first deploy, capture Railway public URL and set `WEBHOOK_URL` env. Backend's startup hook calls `setWebhook(WEBHOOK_URL)` against Telegram API.
3. **BotFather Mini App URL:** Set `@TapToOrderDemoBot` Mini App URL to `https://<vercel-subdomain>/mini-app` (portfolio-hosted frontend) via `@BotFather` → `/newapp` → set URL. This means the Mini App frontend is served from Vercel (same origin as the portfolio), not Railway. Only the bot webhook hits Railway.
4. **Smoke test:** `curl https://<railway>/health` returns 200; send `/start` to the bot from Serhii's test account; tap `Відкрити магазин`; verify Mini App loads Vercel-hosted frontend inside Telegram.

---

## 12. Risks and mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Mini App backend Railway cold-start > 10s hurts demo UX | Medium | Add 6h uptime ping (UptimeRobot free); have static iframe fallback |
| Simulator scripts become tedious to write | Low | Build one simulator end-to-end first, extract script format, then batch remaining 7 |
| Glass design on low-end Android looks muddy | Medium | Provide a `@media (prefers-reduced-transparency)` fallback to solid cards |
| Real bot tokens / screenshots leaking PII | High | Use anonymized screenshots; never show real customer names or data |
| Ukrainian copy quality drifts into AI-translated feel | High | Serhii reviews all user-facing copy before ship |

---

## 13. Out of scope

Explicitly deferred:

- English locale
- Dark/light toggle (dark-only ships)
- Blog
- Analytics
- Contact form backend (uses `mailto:` + Telegram link instead)
- Case detail routes (each case opens a modal, not a separate URL)
- Server-side rendering
- Animations beyond in/out + hover (no scroll-linked storytelling)
- Real payments on Mini App

---

## 14. Success criteria

**Functional:**
- [ ] Lighthouse perf ≥90 on mobile
- [ ] Lighthouse accessibility ≥95
- [ ] All case cards render and open demo modal without error (13 targeted, 10+ minimum acceptable)
- [ ] All shipped simulators play their script end-to-end, every `jumpTo` resolves
- [ ] Mini App loads in Telegram on iOS, user completes mock checkout
- [ ] Mini App also loads standalone at `/mini-app` route wrapped in `<FakeTelegramFrame>`
- [ ] `@clothsrepairOdesabot` QR deeplink confirmed working
- [ ] Site deployed to Vercel `.vercel.app` subdomain (custom domain deferred)
- [ ] Backend `/health` returns 200 in production

**Copy review (explicit gate, not aspiration):**
- [ ] Hero headline + sub-headline approved by Serhii
- [ ] All 13 case names and 1-line descriptions approved
- [ ] All 5 pricing tier names, amounts, and "what's included" approved
- [ ] All CTA button labels approved
- [ ] All modal / simulator script content reviewed line by line
- [ ] About section bio approved

No "final ship" without all boxes ticked.
