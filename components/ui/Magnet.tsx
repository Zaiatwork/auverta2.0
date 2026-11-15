'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'

// Pulls its child toward the pointer. Off for touch and for reduced motion.
export default function Magnet({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const inner = useRef<HTMLSpanElement>(null)

  const move = (e: PointerEvent<HTMLSpanElement>) => {
    const el = inner.current
    if (!el || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const leave = () => {
    if (inner.current) inner.current.style.transform = ''
  }

  return (
    <span className="inline-block" onPointerMove={move} onPointerLeave={leave}>
      <span ref={inner} className="inline-block transition-transform duration-300 ease-[var(--ease-out-expo)]">
        {children}
      </span>
    </span>
  )
}
