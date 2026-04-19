import { useEffect, useState } from 'react'
import QRCodeLib from 'qrcode'

export function QRCode({ link, size = 160 }: { link: string; size?: number }) {
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    QRCodeLib.toString(link, {
      type: 'svg',
      width: size,
      color: { dark: '#ffffff', light: '#00000000' },
      margin: 1,
    }).then(setSvg)
  }, [link, size])

  return (
    <div
      className="inline-block"
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
