import { ImageResponse } from 'next/og'

export const alt = 'Auverta Studio. One Studio. Zero Juggling.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// ImageResponse cannot read CSS variables, so the brand tokens (styles/tokens.css) are repeated here as literals.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#5a1cff', color: '#ffffff', padding: 72 }}>
        <div style={{ display: 'flex', fontSize: 36, letterSpacing: 6, textTransform: 'uppercase' }}>Auverta Studio</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 148, fontWeight: 800, lineHeight: 0.95, letterSpacing: -6 }}>
          <span>One Studio.</span>
          <span style={{ color: '#f3efff' }}>Zero Juggling.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 32 }}>Brand, web, AI content and marketing, all under one roof.</div>
      </div>
    ),
    size,
  )
}
