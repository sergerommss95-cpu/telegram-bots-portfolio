import type { ChatEvent } from '../data/types'

export const shopScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: 'Привіт! Я ShopBot 🛒\nЩо шукаємо сьогодні?', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '👕 Футболки', jumpTo: 'shop-tshirts' },
    { label: '☕ Кружки', jumpTo: 'shop-mugs' },
    { label: '📦 Всі товари', jumpTo: 'shop-all' },
  ]},
  { id: 'shop-tshirts', role: 'bot', type: 'text', text: 'Футболки в наявності:', delayMs: 400 },
  { role: 'bot', type: 'text', text: '👕 Класична чорна — 450 UAH\n👕 Winter Vibes — 550 UAH', delayMs: 600 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Додати до кошика', jumpTo: 'shop-cart' }] },
  { id: 'shop-mugs', role: 'bot', type: 'text', text: '☕ Кружка керамічна — 280 UAH', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Додати до кошика', jumpTo: 'shop-cart' }] },
  { id: 'shop-all', role: 'bot', type: 'text', text: 'Повний каталог — 12 товарів. Використай /catalog у реальному боті.', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'До кошика', jumpTo: 'shop-cart' }] },
  { id: 'shop-cart', role: 'bot', type: 'text', text: '🛒 Кошик: 1 товар на 450 UAH', delayMs: 400 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Оплатити ⭐ Stars', jumpTo: 'shop-pay' }] },
  { id: 'shop-pay', role: 'bot', type: 'typing', durationMs: 800 },
  { role: 'bot', type: 'payment', product: 'Футболка чорна', price: '450 UAH' },
  { role: 'bot', type: 'text', text: '✅ Оплачено! Замовлення #8241 прийнято.\nДоставка 2-3 дні.', delayMs: 800 },
]
