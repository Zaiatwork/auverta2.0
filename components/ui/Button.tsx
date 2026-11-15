import type { ReactNode } from 'react'
import { TransitionLink } from './TransitionLink'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'soft' | 'ink'
  children: ReactNode
  className?: string
  label?: string
}

// "primary" is lime and is the single action a screen asks for; use soft or ink for everything else.
export function Button({ href, variant = 'primary', children, className = '', label }: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`.trim()
  if (href.startsWith('/')) return <TransitionLink href={href} className={cls} label={label}>{children}</TransitionLink>
  return <a href={href} className={cls}>{children}</a>
}
