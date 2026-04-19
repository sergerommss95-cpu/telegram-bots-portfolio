import type { Case } from './types'

export const cases: Case[] = [
  {
    id: 'olivia',
    name: 'Olivia Arcana',
    kind: 'real',
    complexity: 3,
    tagline: 'Таро + астрологія + VIP-підписка з AI-персоною',
    stack: ['aiogram', 'Claude', 'Stars', 'CryptoBot', 'Postgres'],
    category: 'AI-астрологія',
    handle: '@OliviaArcanaBot',
    realBot: { telegramUrl: 'https://t.me/OliviaArcanaBot' },
    study: {
      problem:
        'Астролог без автоматизації тонула у розкладах і рутині. Кожен клієнт — 20 хв переписки для простого розкладу, VIP-клієнти губились у нотатках.',
      solution:
        'AI-персона Olivia на Claude 3.5 з памʼяттю, підпискою через Stars та CryptoBot, автоматичними щоденними гороскопами і багатомовним інтерфейсом.',
      metrics: [
        { label: 'Розкладів/міс', value: '1 200+' },
        { label: 'VIP-клієнтів', value: '180' },
        { label: 'Країн', value: '14' },
      ],
      architecture: ['Клієнт', 'Telegram', 'aiogram', 'Claude API', 'Stars/CryptoBot', 'Postgres'],
      quote: {
        text: 'Перестала відповідати на однакові питання і нарешті маю час на складні розклади. VIP-підписка приносить стабільний дохід щомісяця.',
        author: 'астролог, Київ',
      },
    },
  },
  {
    id: 'taro',
    name: 'Містичне Таро',
    kind: 'real',
    complexity: 3,
    tagline: 'Трьохмовний бот таро з GPT-4o та платежами',
    stack: ['aiogram', 'GPT-4o', 'Stars', 'CryptoBot', 'SQLite'],
    category: 'Таро',
    handle: '@yourtarouabot',
    realBot: { telegramUrl: 'https://t.me/yourtarouabot' },
    study: {
      problem:
        'Тарот-контент у каналі — одноразова покупка, користувач отримав пост і пішов. Нуль утримання, нуль повторних продажів.',
      solution:
        'Трьохмовний бот з GPT-4o, платежами Stars/Crypto/Monobank та автоматичним роздаванням credits — клієнт повертається, поки не закінчаться credits.',
      metrics: [
        { label: 'Розкладів', value: '8 500+' },
        { label: 'Мов інтерфейсу', value: '3' },
        { label: 'Способів оплати', value: '3' },
      ],
      architecture: ['Клієнт', 'Telegram', 'aiogram', 'GPT-4o', 'Stars/Crypto/Mono', 'SQLite'],
      quote: {
        text: 'Середній чек зріс у 4 рази після запуску credits. Люди купують пачки по 10-20 розкладів замість одного.',
        author: 'власниця таро-каналу',
      },
    },
  },
  {
    id: 'repair',
    name: 'Ремонт Одягу',
    kind: 'real',
    complexity: 4,
    tagline: 'Production-бот для ательє: замовлення, статуси, клієнти',
    stack: ['grammY', 'NestJS', 'Prisma', 'Postgres', 'Docker'],
    category: 'Бізнес-процеси',
    handle: '@clothsrepairOdesabot',
    realBot: { telegramUrl: 'https://t.me/clothsrepairOdesabot' },
    study: {
      problem:
        'Ательє в Одесі втрачало по 2 години/день на дзвінки «де моє замовлення?» і плутанину зі статусами.',
      solution:
        'Production-бот на NestJS + Prisma з контактом-верифікацією та автоматичними сповіщеннями при зміні статусу замовлення.',
      metrics: [
        { label: 'Клієнтів обслужено', value: '247+' },
        { label: 'Статусів щодня', value: '30-50' },
        { label: 'Годин економії/день', value: '2+' },
      ],
      architecture: ['Клієнт', 'Telegram', 'Webhook', 'NestJS API', 'Prisma ORM', 'Postgres'],
      quote: {
        text: 'Раніше відповідали на дзвінки, зараз клієнти бачать все в боті. Власниця спить спокійно.',
        author: 'менеджер, Одеса',
      },
    },
  },
  {
    id: 'broadcaster',
    name: 'Polymarket Broadcaster',
    kind: 'real',
    complexity: 1,
    tagline: 'Односторонній розсилник торгових сигналів у канал',
    stack: ['httpx', 'Python', 'Cron'],
    category: 'Розсилки',
    study: {
      problem:
        'Ручна розсилка сигналів у канал — забуваєш, пропускаєш, не масштабується. Аналітик не встигає і торгувати, і постити.',
      solution:
        'Cron-бот що шле топ-сигнали з реф-посиланнями у канал кожну годину, з фільтрами по обʼєму і мінімальним edge.',
      metrics: [
        { label: 'Сигналів/добу', value: '40-60' },
        { label: 'Підписників каналу', value: '2 400' },
        { label: 'Uptime', value: '99.8%' },
      ],
      architecture: ['Scanner', 'Cron', 'Telegram API', 'Channel'],
    },
  },
  {
    id: 'taptoorder',
    name: 'TapToOrder',
    kind: 'miniapp',
    complexity: 4,
    tagline: 'Telegram Mini App: магазин із кошиком і Stars-оплатою',
    stack: ['Mini App SDK', 'FastAPI', 'aiogram', 'React', 'Stars'],
    category: 'Mini App / E-commerce',
    handle: '@TapToOrderDemoBot',
    realBot: { telegramUrl: 'https://t.me/TapToOrderDemoBot' },
    study: {
      problem:
        'E-commerce у Telegram без Mini App — незручно. Текстове меню з товарами губиться, кошик неможливий, оформлення замовлення через /команди відлякує.',
      solution:
        'Mini App з корзиною, Stars-оплатою і webhook-замовленнями. Від перегляду до оплати — 3 кроки, все всередині Telegram.',
      metrics: [
        { label: 'Товарів у демо', value: '12' },
        { label: 'Кроків до оплати', value: '3' },
        { label: 'Stars-оплата', value: 'нативна' },
      ],
      architecture: ['Mini App Frontend', 'Telegram', 'Webhook', 'FastAPI', 'aiogram', 'SQLite'],
    },
  },
  {
    id: 'shop',
    name: 'ShopBot',
    kind: 'simulator',
    complexity: 2,
    tagline: 'Каталог + кошик + Stars-оплата',
    stack: ['aiogram', 'Stars', 'SQLite'],
    category: 'E-commerce',
    scriptName: 'shop',
    study: {
      problem:
        'Малий бізнес хоче продавати у Telegram, але Mini App — це overkill, а текстовий каталог — боляче.',
      solution:
        'Бот з inline-каталогом, кошиком у сесії та Stars-оплатою. Деплой на free-tier за пів дня.',
      metrics: [
        { label: 'Товарів', value: '50-200' },
        { label: 'Час запуску', value: '1-3 дні' },
        { label: 'Комісія', value: 'тільки Stars' },
      ],
      architecture: ['Клієнт', 'Telegram', 'aiogram', 'Stars', 'SQLite'],
    },
  },
  {
    id: 'bookit',
    name: 'BookIt',
    kind: 'simulator',
    complexity: 2,
    tagline: 'Запис на послугу з календарем і часовими слотами',
    stack: ['aiogram', 'Postgres', 'Calendar'],
    category: 'Booking',
    scriptName: 'bookit',
  },
  {
    id: 'quiz',
    name: 'QuizMaster',
    kind: 'simulator',
    complexity: 2,
    tagline: 'Тести з таймером, очками та таблицею лідерів',
    stack: ['aiogram', 'Redis'],
    category: 'Ігри',
    scriptName: 'quiz',
  },
  {
    id: 'photo',
    name: 'PhotoMagic',
    kind: 'simulator',
    complexity: 3,
    tagline: 'Фото → AI-стилізація → результат',
    stack: ['aiogram', 'Flux API', 'S3'],
    category: 'AI Photo',
    scriptName: 'photo',
  },
  {
    id: 'guard',
    name: 'GuardBot',
    kind: 'simulator',
    complexity: 2,
    tagline: 'Антиспам + welcome-flow + капча для груп',
    stack: ['aiogram', 'Redis'],
    category: 'Модерація',
    scriptName: 'guard',
  },
  {
    id: 'support',
    name: 'SupportHero',
    kind: 'simulator',
    complexity: 3,
    tagline: 'Тікет-система з передачею агенту та SLA',
    stack: ['aiogram', 'Postgres', 'Webhooks'],
    category: 'Підтримка',
    scriptName: 'support',
    study: {
      problem:
        'Підтримка в Telegram-каналі тоне у повідомленнях — немає пріоритетів, немає SLA, оператор не бачить історії.',
      solution:
        'Тікет-система з авто-розподілом, ескалацією по SLA і повною історією клієнта. Менеджер бачить все в одному вікні.',
      metrics: [
        { label: 'SLA Tier-1', value: '15 хв' },
        { label: 'Авто-класифікація', value: 'GPT' },
        { label: 'Передача агенту', value: '1 клік' },
      ],
      architecture: ['Клієнт', 'Telegram', 'aiogram', 'Postgres', 'Webhooks', 'Agent UI'],
    },
  },
  {
    id: 'voice',
    name: 'VoiceNote AI',
    kind: 'simulator',
    complexity: 3,
    tagline: 'Голосові → транскрипт → GPT-відповідь',
    stack: ['aiogram', 'Whisper', 'GPT-4o'],
    category: 'Voice AI',
    scriptName: 'voice',
  },
  {
    id: 'ref',
    name: 'RefMaster',
    kind: 'simulator',
    complexity: 2,
    tagline: 'Реферальна програма + статистика + виплати',
    stack: ['aiogram', 'Postgres'],
    category: 'Referral',
    scriptName: 'ref',
  },
]
