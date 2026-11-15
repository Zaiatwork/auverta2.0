import type { CSSProperties, ElementType, ReactNode } from 'react'

interface SectionProps {
  tone?: 'violet' | 'ink' | 'soft'
  size?: 's' | 'm' | 'l'
  id?: string
  className?: string
  as?: ElementType
  children: ReactNode
  'aria-label'?: string
}

export function Section({ tone = 'violet', size = 'm', id, className = '', as: Tag = 'section', children, ...rest }: SectionProps) {
  const cls = `sec ${size === 'm' ? '' : `sec--${size}`} on-${tone} ${className}`.replace(/\s+/g, ' ').trim()
  return <Tag id={id} className={cls} {...rest}>{children}</Tag>
}

/** 12-col grid (4 on mobile). Children are <Cell>. */
export function Grid({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`g ${className}`.trim()}>{children}</div>
}

export function Cell({ span = 12, mobile = 4, className, children }: { span?: number; mobile?: number; className?: string; children: ReactNode }) {
  return <div className={className} style={{ '--c': span, '--cm': mobile } as CSSProperties}>{children}</div>
}
