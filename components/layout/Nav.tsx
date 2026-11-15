'use client'

import { NAV } from '@/content/site'
import { TransitionLink } from '@/components/ui/TransitionLink'
import { Button } from '@/components/ui/Button'
import styles from './Nav.module.css'

const GLYPHS = '!<>-_/[]{}—=+*^?#'

// Hover scramble: the label resolves letter by letter. Plain rAF, so the nav never loads GSAP.
function scramble(el: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const text = el.dataset.text ?? ''
  const start = performance.now()
  const step = (now: number) => {
    const p = Math.min((now - start) / 500, 1)
    el.textContent = p < 1 ? [...text].map((c, i) => (i < p * text.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join('') : text
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function Nav() {
  return (
    <header className={styles.nav}>
      <TransitionLink href="/" className={styles.logo} aria-label="Auverta home" label="Auverta">
        <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h5l9 12V3h4v18h-5L7 9v12H3z" /></svg>
        AUVERTA
      </TransitionLink>
      <nav aria-label="Primary">
        <ul className={styles.links}>
          {NAV.map((n) => (
            <li key={n.href}>
              <TransitionLink href={n.href} label={n.label}>
                <span data-text={n.label} onMouseEnter={(e) => scramble(e.currentTarget)}>{n.label}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
      <Button href="/contact" variant="soft" className={styles.cta} label="Contact">Contact</Button>
    </header>
  )
}
