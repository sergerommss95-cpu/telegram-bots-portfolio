import type { ChatEvent } from '../data/types'

export const voiceScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: 'Надішли голосове повідомлення 🎤', delayMs: 500 },
  { role: 'bot', type: 'text', text: 'Я транскрибую (Whisper), поясню і навіть переказажу простіше.', delayMs: 500 },
  { role: 'user', type: 'text', text: '🎤 Voice message (0:12)', delayMs: 800 },
  { role: 'bot', type: 'typing', durationMs: 1200 },
  { role: 'bot', type: 'text', text: '**Транскрипт:**\n«Слухай, поясни коротко як працює блокчейн, буквально в трьох реченнях»', delayMs: 600 },
  { role: 'bot', type: 'typing', durationMs: 1000 },
  { role: 'bot', type: 'text', text: 'Блокчейн — це розподілена база даних, де кожен новий запис криптографічно пов\'язаний з попереднім. Усі учасники мережі зберігають однакову копію цих даних. Змінити щось у минулому без згоди більшості — математично неможливо.', delayMs: 800 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '🧒 Переказати простіше', jumpTo: 'voice-simpler' },
    { label: '📝 Підсумувати у 1 реченні', jumpTo: 'voice-summary' },
  ]},
  { id: 'voice-simpler', role: 'bot', type: 'text', text: 'Уяви зошит, який копіюється у всіх одразу. Додав рядок — всі бачать. Стерти не можна.', delayMs: 600 },
  { role: 'bot', type: 'text', text: '🎧 Надіслати цю відповідь голосом? /tts', delayMs: 500 },
  { id: 'voice-summary', role: 'bot', type: 'text', text: 'Блокчейн = незмінний спільний журнал записів.', delayMs: 600 },
  { role: 'bot', type: 'text', text: '✨ Готово. Надішли ще одне голосове — я завжди тут.', delayMs: 500 },
]
