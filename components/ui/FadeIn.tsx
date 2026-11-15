import type { ReactNode } from 'react'

// CSS-only entrance (see .fade-in in globals.css). Reduced motion: shown instantly.
export default function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`fade-in ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
