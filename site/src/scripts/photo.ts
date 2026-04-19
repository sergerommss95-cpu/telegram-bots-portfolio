import type { ChatEvent } from '../data/types'

export const photoScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: 'Надішліть фото, я застосую AI-стиль 🎨', delayMs: 500 },
  { role: 'user', type: 'text', text: '📎 my-photo.jpg', delayMs: 600 },
  { role: 'bot', type: 'image', src: 'https://picsum.photos/300/300?random=1', caption: 'Отримав твоє фото' },
  { role: 'bot', type: 'text', text: 'Оберіть стиль:', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '🎌 Anime', jumpTo: 'photo-gen' },
    { label: '🖼️ Oil painting', jumpTo: 'photo-gen' },
    { label: '🌆 Cyberpunk', jumpTo: 'photo-gen' },
  ]},
  { id: 'photo-gen', role: 'bot', type: 'text', text: 'Стиль обрано. Запускаю генерацію…', delayMs: 400 },
  { role: 'bot', type: 'typing', durationMs: 1500 },
  { role: 'bot', type: 'image', src: 'https://picsum.photos/300/300?random=2', caption: 'Готово!' },
  { role: 'bot', type: 'text', text: '✨ Обробка зайняла 4.2 сек\n🎨 Модель: flux-dev-lora', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '💾 Зберегти', jumpTo: 'photo-saved' },
    { label: '🔄 Ще раз', jumpTo: 'photo-again' },
  ]},
  { id: 'photo-saved', role: 'bot', type: 'text', text: 'Фото збережено в галерею ✅\nЗавантажити: /download_8241', delayMs: 500 },
  { id: 'photo-again', role: 'bot', type: 'text', text: 'Надішли нове фото коли будеш готовий!', delayMs: 500 },
]
