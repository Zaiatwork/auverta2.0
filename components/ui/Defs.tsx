// Shared SVG defs: the Auva body gradient and the small icon set (referenced with <Icon>).
export function Defs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="auva-body" cx="35%" cy="28%" r="80%">
          <stop offset="0" style={{ stopColor: 'var(--violet-light)' }} />
          <stop offset="1" style={{ stopColor: 'var(--violet-deep)' }} />
        </radialGradient>
      </defs>
      <symbol id="i-cursor" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6z" /></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10h4v10zM10 20V4h4v16zM16 20v-7h4v7z" /></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 4h16v12H9l-5 4z" /></symbol>
      <symbol id="i-image" viewBox="0 0 24 24"><path fillRule="evenodd" d="M3 4h18v16H3zm3 12h12l-4-5-3 4-2-2z" /></symbol>
      <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" /></symbol>
    </svg>
  )
}

export type IconName = 'cursor' | 'play' | 'chart' | 'chat' | 'image' | 'spark'

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  )
}
