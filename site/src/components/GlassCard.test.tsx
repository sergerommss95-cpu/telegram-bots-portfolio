import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GlassCard } from './GlassCard'

describe('<GlassCard>', () => {
  it('renders children', () => {
    render(<GlassCard>hello</GlassCard>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('applies glass-card class for reduced-transparency fallback', () => {
    const { container } = render(<GlassCard>x</GlassCard>)
    expect(container.firstChild).toHaveClass('glass-card')
  })
})
