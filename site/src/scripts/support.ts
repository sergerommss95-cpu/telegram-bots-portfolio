import type { ChatEvent } from '../data/types'

export const supportScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: 'Вітаю! Я SupportHero. З чим допомогти?', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '💳 Білінг', jumpTo: 'support-billing' },
    { label: '🛠️ Тех. проблема', jumpTo: 'support-tech' },
    { label: '❓ Інше', jumpTo: 'support-other' },
  ]},
  { id: 'support-billing', role: 'bot', type: 'text', text: '🎫 Тікет #1042 створено, категорія: Білінг', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Передати агенту', jumpTo: 'support-handoff' }] },
  { id: 'support-tech', role: 'bot', type: 'text', text: '🎫 Тікет #1043 створено, категорія: Тех. проблема', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Передати агенту', jumpTo: 'support-handoff' }] },
  { id: 'support-other', role: 'bot', type: 'text', text: '🎫 Тікет #1044 створено, категорія: Інше', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Передати агенту', jumpTo: 'support-handoff' }] },
  { id: 'support-handoff', role: 'bot', type: 'text', text: 'Шукаю вільного агента…', delayMs: 400 },
  { role: 'bot', type: 'typing', durationMs: 1200 },
  { role: 'bot', type: 'text', text: '👤 Агент Олексій приєднався. SLA відповіді: 15 хв.', delayMs: 500 },
  { role: 'bot', type: 'text', text: 'Доброго дня! Я допоможу вам. Опишіть проблему детальніше.', delayMs: 700 },
]
