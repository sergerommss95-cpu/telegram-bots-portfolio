export type CaseId =
  | 'olivia' | 'taro' | 'repair' | 'broadcaster'
  | 'taptoorder'
  | 'shop' | 'bookit' | 'quiz' | 'photo'
  | 'guard' | 'support' | 'voice' | 'ref'

export type Complexity = 1 | 2 | 3 | 4

export type CaseKind = 'real' | 'miniapp' | 'simulator'

export interface Case {
  id: CaseId
  name: string
  tagline: string
  kind: CaseKind
  complexity: Complexity
  stack: string[]
  category: string
  handle?: string
  scriptName?: string
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
