'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, OUT, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useFinePointer, useReducedMotion } from '@/lib/motion'
import { CALM_PATHS } from '@/content/site'
import styles from './Cursor.module.css'

const SPARKS = 14

/** Custom cursor with a label on [data-cursor] targets, plus the lime-free spark trail. */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const pathname = usePathname()
  const calm = CALM_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))

  useGSAP(
    () => {
      if (!fine || reduced) return
      const cur = cursor.current!
      const sparks = gsap.utils.toArray<SVGElement>(`.${styles.spark}`, root.current)
      document.documentElement.dataset.cursor = 'on'
      gsap.set(cur, { xPercent: -50, yPercent: -50 })
      const cx = gsap.quickTo(cur, 'x', { duration: 0.3, ease: OUT })
      const cy = gsap.quickTo(cur, 'y', { duration: 0.3, ease: OUT })
      let si = 0
      let lx = 0
      let ly = 0

      const move = (e: PointerEvent) => {
        cur.style.opacity = '1'
        cx(e.clientX)
        cy(e.clientY)
        const target = e.target as Element
        if (!calm && Math.hypot(e.clientX - lx, e.clientY - ly) > 46 && !target.closest('[data-calm]')) {
          lx = e.clientX
          ly = e.clientY
          gsap.fromTo(
            sparks[si++ % sparks.length],
            { x: lx, y: ly, scale: 0, rotation: 0, opacity: 1 },
            { scale: gsap.utils.random(0.6, 1.2), rotation: gsap.utils.random(-120, 120), y: ly + gsap.utils.random(20, 60), opacity: 0, duration: 0.9, ease: OUT, overwrite: true },
          )
        }
      }
      const over = (e: MouseEvent) => {
        const t = (e.target as Element).closest<HTMLElement>('[data-cursor]')
        const a = (e.target as Element).closest('a,button,summary')
        if (t) {
          label.current!.textContent = t.dataset.cursor ?? ''
          cur.dataset.label = 'on'
          gsap.to(cur, { width: 92, height: 92, duration: 0.35, ease: OUT })
        } else {
          cur.dataset.label = 'off'
          gsap.to(cur, { width: a ? 36 : 14, height: a ? 36 : 14, duration: 0.3, ease: OUT })
        }
      }
      addEventListener('pointermove', move, { passive: true })
      document.addEventListener('mouseover', over)
      return () => {
        removeEventListener('pointermove', move)
        document.removeEventListener('mouseover', over)
        delete document.documentElement.dataset.cursor
      }
    },
    { dependencies: [fine, reduced, calm], scope: root },
  )

  // Scroll progress bar lives here so there is one place for the global chrome.
  const bar = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set(bar.current, { scaleX: s.progress }) })
  })

  return (
    <div ref={root} aria-hidden="true">
      <div ref={cursor} className={styles.cursor}><span ref={label} className={styles.label} /></div>
      <div className={styles.sparks}>
        {Array.from({ length: SPARKS }, (_, i) => (
          <svg key={i} className={styles.spark} viewBox="0 0 24 24"><use href="#i-spark" /></svg>
        ))}
      </div>
      <div ref={bar} className={styles.bar} />
    </div>
  )
}
