import { render, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { QRCode } from './QRCode'

describe('<QRCode>', () => {
  it('renders an <svg> with the link encoded', async () => {
    const { container } = render(<QRCode link="https://t.me/test" />)
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })
})
