import type { ChatEvent } from '../data/types'

export const bookitScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: 'Я BookIt 📅 — оберіть послугу', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '✂️ Стрижка', jumpTo: 'bookit-date' },
    { label: '💅 Манікюр', jumpTo: 'bookit-date' },
    { label: '💆 Масаж', jumpTo: 'bookit-date' },
  ]},
  { id: 'bookit-date', role: 'bot', type: 'text', text: 'Чудово! Оберіть зручний день:', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [
    { label: 'Сьогодні', jumpTo: 'bookit-time' },
    { label: 'Завтра', jumpTo: 'bookit-time' },
    { label: 'Післязавтра', jumpTo: 'bookit-time' },
  ]},
  { id: 'bookit-time', role: 'bot', type: 'text', text: 'Оберіть час:', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '10:00', jumpTo: 'bookit-confirm' },
    { label: '14:00', jumpTo: 'bookit-confirm' },
    { label: '18:00', jumpTo: 'bookit-confirm' },
  ]},
  { id: 'bookit-confirm', role: 'bot', type: 'typing', durationMs: 500 },
  { role: 'bot', type: 'text', text: '📋 Перевірте запис:\n\n• Послуга: Стрижка\n• Дата: завтра\n• Час: 14:00\n• Майстер: Ірина\n• Адреса: вул. Хрещатик, 22', delayMs: 600 },
  { role: 'bot', type: 'text', text: '💰 Вартість: 350 UAH\nОплата на місці (готівка або карта)', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [{ label: '✅ Підтвердити', jumpTo: 'bookit-done' }] },
  { id: 'bookit-done', role: 'bot', type: 'typing', durationMs: 700 },
  { role: 'bot', type: 'text', text: '🎉 Запис підтверджено!', delayMs: 500 },
  { role: 'bot', type: 'text', text: 'Нагадування прийде за годину. До зустрічі!', delayMs: 500 },
]
