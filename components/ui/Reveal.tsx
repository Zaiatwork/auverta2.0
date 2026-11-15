import type { ReactNode } from 'react'

interface RevealProps {
  /** Selector, relative to the wrapper, for the elements that rise in. */
  targets: string
  y?: number
  stagger?: number
  start?: string
  className?: string
  children: ReactNode
}

/** Marks a group to rise in on scroll. The motion itself runs in the HomeEffects island; without it the content simply shows. */
export function Reveal({ targets, y, stagger, start, className, children }: RevealProps) {
  return (
    <div className={className} data-reveal={targets} data-reveal-y={y} data-reveal-stagger={stagger} data-reveal-start={start}>
      {children}
    </div>
  )
}
