import type { ChatEvent } from '../data/types'

export const refScript: ChatEvent[] = [
  { role: 'user', type: 'text', text: '/start', delayMs: 300 },
  { role: 'bot', type: 'typing', durationMs: 600 },
  { role: 'bot', type: 'text', text: 'Вітаю в реферальній програмі! 💰', delayMs: 500 },
  { role: 'bot', type: 'text', text: 'Твоє персональне посилання:\nhttps://t.me/mybot?start=ref_A4F2', delayMs: 600 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '📊 Моя статистика', jumpTo: 'ref-stats' },
    { label: '📋 Правила', jumpTo: 'ref-rules' },
  ]},
  { id: 'ref-stats', role: 'bot', type: 'text', text: '📊 Статистика:\n\n• Кліків: 42\n• Реєстрацій: 7\n• Зароблено: 280 UAH', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [{ label: '💸 Вивести', jumpTo: 'ref-payout' }] },
  { id: 'ref-payout', role: 'bot', type: 'text', text: 'Перевіряю реквізити…', delayMs: 400 },
  { role: 'bot', type: 'typing', durationMs: 1500 },
  { role: 'bot', type: 'text', text: '✅ Виплата 280 UAH надіслана на картку ****5432\nОчікуйте зарахування протягом 15 хв.', delayMs: 600 },
  { id: 'ref-rules', role: 'bot', type: 'text', text: '📋 Правила:\n\n• 10% від першої покупки реферала\n• Мін. виплата: 100 UAH\n• Без крипто — тільки ФОП/картка', delayMs: 500 },
  { role: 'bot', type: 'text', text: 'Зрозуміло? Запрошуй друзів і заробляй разом з нами! 🚀', delayMs: 500 },
]
