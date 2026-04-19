import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { TelegramChatSim } from './TelegramChatSim'
import type { ChatEvent } from '../data/types'

describe('<TelegramChatSim>', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('plays events in order and calls onComplete', async () => {
    const script: ChatEvent[] = [
      { role: 'bot', type: 'text', text: 'Hi', delayMs: 100 },
      { role: 'bot', type: 'text', text: 'Bye', delayMs: 100 },
    ]
    const onComplete = vi.fn()
    render(<TelegramChatSim script={script} botName="Test" onComplete={onComplete} />)
    await act(async () => { await vi.advanceTimersByTimeAsync(500) })
    expect(screen.getByText('Hi')).toBeInTheDocument()
    expect(screen.getByText('Bye')).toBeInTheDocument()
    expect(onComplete).toHaveBeenCalled()
  })

  it('pauses on buttons event and jumps on click', async () => {
    const script: ChatEvent[] = [
      { role: 'bot', type: 'buttons', inline: [{ label: 'Go', jumpTo: 'end' }] },
      { role: 'bot', type: 'text', text: 'Skipped' },
      { id: 'end', role: 'bot', type: 'text', text: 'Arrived' },
    ]
    const { getByRole } = render(<TelegramChatSim script={script} botName="Test" />)
    await act(async () => { await vi.advanceTimersByTimeAsync(100) })
    getByRole('button', { name: 'Go' }).click()
    await act(async () => { await vi.advanceTimersByTimeAsync(500) })
    expect(screen.getByText('Arrived')).toBeInTheDocument()
    expect(screen.queryByText('Skipped')).not.toBeInTheDocument()
  })

  it('continues linearly after jumping to a label', async () => {
    const script: ChatEvent[] = [
      { role: 'bot', type: 'text', text: 'a', delayMs: 50 },
      { role: 'bot', type: 'buttons', inline: [{ label: 'go', jumpTo: 'mid' }] },
      { role: 'bot', type: 'text', text: 'b', delayMs: 50 },
      { id: 'mid', type: 'label' },
      { role: 'bot', type: 'text', text: 'c', delayMs: 50 },
    ]
    const { getByRole } = render(<TelegramChatSim script={script} botName="T" />)
    await act(async () => { await vi.advanceTimersByTimeAsync(200) })
    getByRole('button', { name: 'go' }).click()
    await act(async () => { await vi.advanceTimersByTimeAsync(300) })
    expect(screen.getByText('a')).toBeInTheDocument()
    expect(screen.queryByText('b')).not.toBeInTheDocument()
    expect(screen.getByText('c')).toBeInTheDocument()
  })

  it('warns on unresolved jumpTo', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const script: ChatEvent[] = [
      { role: 'bot', type: 'buttons', inline: [{ label: 'X', jumpTo: 'nowhere' }] },
    ]
    const { getByRole } = render(<TelegramChatSim script={script} botName="T" />)
    await act(async () => { await vi.advanceTimersByTimeAsync(100) })
    getByRole('button', { name: 'X' }).click()
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('nowhere'))
    warn.mockRestore()
  })

  it('wraps transcript in role="log" with aria-live="polite"', () => {
    const { container } = render(<TelegramChatSim script={[]} botName="T" />)
    const log = container.querySelector('[role="log"]')
    expect(log).toBeInTheDocument()
    expect(log).toHaveAttribute('aria-live', 'polite')
  })
})
