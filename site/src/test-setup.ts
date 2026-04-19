import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Framer Motion's jsdom compatibility issue — mock motion.<tag> to plain <tag>.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    motion: new Proxy({}, {
      get: (_t, tag: string) =>
        ({ children, ...props }: any) => React.createElement(tag, props, children),
    }),
    AnimatePresence: ({ children }: any) => children,
  }
})

// matchMedia polyfill for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})
