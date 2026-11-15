import type { ElementType, ReactNode } from 'react'
import styles from './Card.module.css'

export function Card({ as: Tag = 'article', className = '', children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={`${styles.card} ${className}`.trim()}>{children}</Tag>
}
