import type { ButtonHTMLAttributes } from 'react'

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean
}

export function Pill({ pressed, className = '', type = 'button', ...rest }: PillProps) {
  return <button type={type} aria-pressed={pressed} className={`pill ${className}`.trim()} {...rest} />
}
