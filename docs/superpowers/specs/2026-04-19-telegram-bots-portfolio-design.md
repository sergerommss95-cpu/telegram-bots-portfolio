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
4. **Capability matrix** — table: ~20 Telegram Bot API features × 13 cases, checkmarks showing coverage. Sticky first column on mobile.
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
- **Typography:** Inter for UI, space between tracking for headings. Mono (JetBrains) for code/commands in badges.
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

### 6.1 Simulator mechanic

`<TelegramChatSim>` accepts a `script` array:

```ts
type ChatEvent =
  | { role: 'bot' | 'user'; type: 'text'; text: string; delayMs?: number }
  | { role: 'bot'; type: 'typing'; durationMs: number }
  | { role: 'bot'; type: 'buttons'; inline: Array<{ label: string; jumpTo: string }> }
  | { role: 'bot'; type: 'image'; src: string; caption?: string }
  | { role: 'user'; type: 'choice'; label: string; jumpTo: string } // becomes a clickable reply
  | { role: 'bot'; type: 'payment'; product: string; price: string }
```

Scripts live in `/src/scripts/<botName>.ts`. Each simulator is pure data — no custom code per bot beyond script authoring. This is the key architectural bet: 8 simulators = 1 component + 8 data files.

---

## 7. Mini App (TapToOrder) spec

### 7.1 User flow

1. User opens `@TapToOrderDemoBot` in Telegram → taps `Start` → taps `Відкрити магазин` button → Telegram opens Mini App in-chat.
2. Browses 6 mock products (t-shirts, mugs) → adds to cart → sees cart total.
3. Taps `Оплатити через Stars` → Telegram's native payment sheet appears (mocked invoice) → success screen.
4. Bot receives successful payment webhook → sends thank-you message in chat.

### 7.2 Tech

- **Frontend:** same React project, route `/mini-app`, uses `@twa-dev/sdk` for Telegram Web App init/theming.
- **Backend:** Python FastAPI + aiogram, 1 Dockerfile, deploys to Railway free tier.
- **State:** in-memory cart (survives page lifetime of Mini App); order record in SQLite for webhook flow.
- **Payment:** `sendInvoice` with test `XTR` (Stars) currency. Docs explicitly state test invoices never charge.
- **Domain:** Railway-provided subdomain, set as Mini App URL in `@BotFather`.

### 7.3 On the portfolio site

- Case card shows QR code to bot + embedded iframe preview (iframe displays the Mini App in its own Telegram-themed chrome, not in real Telegram) for visitors who don't want to leave the site.
- A clear note: "Оплата через тестові Telegram Stars — справжні гроші не списуються."

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
| Styling | Tailwind CSS v4 | Glass utilities + utility-first speed |
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
- **Simulator scripts:** lightweight unit test that each script renders end-to-end without errors (vitest + react-testing-library, smoke-level only).
- **Accessibility:** one pass with axe-core DevTools post-build.
- **Mobile:** preview_resize to 375×812 iPhone SE and 390×844 iPhone 13 viewports.
- **Mini App:** manual test in actual Telegram client on iOS + Android (1 pass before ship).

---

## 11. Deployment

- **Site:** `vercel --prod` from `/site`. Custom domain later.
- **Mini App backend:** `railway up` from `/mini-app/backend`. Webhook URL set in BotFather. `.env` with `BOT_TOKEN` provisioned in Railway secrets.
- **Telegram bot:** `@TapToOrderDemoBot` (to create via BotFather during implementation).

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

- [ ] Lighthouse perf ≥90 on mobile
- [ ] Lighthouse accessibility ≥95
- [ ] All 13 case cards render and open demo modal without error
- [ ] All 8 simulators play their script end-to-end
- [ ] Mini App loads in Telegram on iOS, user completes mock checkout
- [ ] `@clothsrepairOdesabot` QR deeplink confirmed working
- [ ] Site deployed to Vercel with custom subdomain
- [ ] One full review pass with Serhii before declaring done
