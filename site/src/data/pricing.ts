import type { PricingTier } from './types'

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
  {
    tier: 'starter',
    name: 'Старт',
    subtitle: 'Розсилка, FAQ, запис',
    uah: '20 000 – 36 000 грн',
    usd: '$500 – 900',
    timeline: '3-7 днів',
    features: ['До 10 команд', 'Базова БД', '1 мова', 'Деплой на free-tier'],
  },
  {
    tier: 'business',
    name: 'Бізнес',
    subtitle: 'Каталог + платежі',
    uah: '60 000 – 120 000 грн',
    usd: '$1 500 – 3 000',
    timeline: '2-3 тижні',
    features: ['Каталог товарів', 'Stars / CryptoBot', 'Адмін-панель', 'Webhooks'],
    highlight: true,
  },
  {
    tier: 'ai',
    name: 'AI-бот',
    subtitle: 'GPT/Claude + VIP',
    uah: '140 000 – 260 000 грн',
    usd: '$3 500 – 6 500',
    timeline: '3-5 тижнів',
    features: ['AI-персона', 'Stars + Crypto', 'Мультимова', 'VIP-підписка', 'Streaming'],
  },
  {
    tier: 'production',
    name: 'Production',
    subtitle: 'CRM, SLA, масштаб',
    uah: 'від 320 000 грн',
    usd: 'від $8 000',
    timeline: '6-10 тижнів',
    features: ['CRM-інтеграція', 'Docker + CI/CD', 'Моніторинг', 'SLA 99.9%', 'Мульти-сервер'],
  },
  {
    tier: 'support',
    name: 'Підтримка',
    subtitle: 'Щомісяця',
    uah: '16 000 грн/міс',
    usd: '$400/міс',
    timeline: '—',
    features: ['Багфікси', 'Нові фічі', 'Моніторинг', 'Консультації 5 год/міс'],
  },
]
