import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ComplexityBadge } from './ComplexityBadge'
import { StackBadge } from './StackBadge'

describe('<ComplexityBadge>', () => {
  it('renders 3 filled dots for level 3', () => {
    const { container } = render(<ComplexityBadge level={3} />)
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-filled="false"]')).toHaveLength(1)
  })
})

describe('<StackBadge>', () => {
  it('renders the name', () => {
    render(<StackBadge name="aiogram" />)
    expect(screen.getByText('aiogram')).toBeInTheDocument()
  })
})
