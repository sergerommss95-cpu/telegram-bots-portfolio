import type { ChatEvent } from '../data/types'

export const guardScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: '🛡️ GuardBot активний у групі «Dev UA»\nНовий користувач приєднався: @spammer_404', delayMs: 500 },
  { role: 'bot', type: 'text', text: 'Для верифікації оберіть правильну відповідь: скільки буде 7+3?', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '9', jumpTo: 'guard-fail' },
    { label: '10', jumpTo: 'guard-pass' },
    { label: '11', jumpTo: 'guard-fail' },
  ]},
  { id: 'guard-fail', role: 'bot', type: 'text', text: '❌ Невірно. Користувача виключено.', delayMs: 500 },
  { id: 'guard-pass', role: 'bot', type: 'text', text: '✅ Ласкаво просимо! Доступ відкрито.', delayMs: 500 },
  { role: 'bot', type: 'text', text: '📖 Прочитайте правила групи: /rules', delayMs: 500 },
  { role: 'user', type: 'text', text: '🚀🚀🚀 Купи крипту тут t.me/scam_bot', delayMs: 1000 },
  { role: 'bot', type: 'typing', durationMs: 1000 },
  { role: 'bot', type: 'text', text: '🚨 Виявлено спам. Користувача забанено, повідомлення видалено.', delayMs: 500 },
  { role: 'bot', type: 'text', text: '📝 Причина: посилання на крипто-скам у білому списку антиспаму', delayMs: 500 },
  { role: 'bot', type: 'text', text: '📊 Статистика за добу:\n• Перевірено: 47 юзерів\n• Забанено: 3\n• Видалено повідомлень: 12', delayMs: 600 },
  { role: 'bot', type: 'text', text: '🛡️ Група під захистом. Доброго дня, спільното!', delayMs: 500 },
]
