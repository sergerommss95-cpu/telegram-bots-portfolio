import type { ChatEvent } from '../data/types'

export const quizScript: ChatEvent[] = [
  { role: 'bot', type: 'text', text: '🎯 Вікторина почалась!\nПитання 1: Столиця України?', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: 'Київ', jumpTo: 'quiz-q2' },
    { label: 'Львів', jumpTo: 'quiz-wrong' },
    { label: 'Одеса', jumpTo: 'quiz-wrong' },
    { label: 'Харків', jumpTo: 'quiz-wrong' },
  ]},
  { id: 'quiz-wrong', role: 'bot', type: 'text', text: 'Неправильно 😢\nПравильна відповідь: Київ', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [{ label: 'Далі ➡️', jumpTo: 'quiz-q2' }] },
  { id: 'quiz-q2', role: 'bot', type: 'text', text: 'Питання 2: Скільки областей в Україні?', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '23', jumpTo: 'quiz-q3' },
    { label: '24', jumpTo: 'quiz-q3' },
    { label: '25', jumpTo: 'quiz-q3' },
    { label: '26', jumpTo: 'quiz-q3' },
  ]},
  { id: 'quiz-q3', role: 'bot', type: 'text', text: 'Питання 3: Рік Незалежності України?', delayMs: 500 },
  { role: 'bot', type: 'buttons', inline: [
    { label: '1989', jumpTo: 'quiz-done' },
    { label: '1990', jumpTo: 'quiz-done' },
    { label: '1991', jumpTo: 'quiz-done' },
    { label: '1992', jumpTo: 'quiz-done' },
  ]},
  { id: 'quiz-done', role: 'bot', type: 'typing', durationMs: 800 },
  { role: 'bot', type: 'text', text: '🏆 Ви набрали 2/3 очок!', delayMs: 500 },
  { role: 'bot', type: 'text', text: '📊 Місце в таблиці: #142 з 1 823 гравців', delayMs: 500 },
  { role: 'bot', type: 'text', text: '🎁 За 3/3 — бонус: промокод -10% на курси історії. Спробуєш ще раз?', delayMs: 500 },
]
