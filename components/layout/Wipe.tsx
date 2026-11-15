'use client'

import { useEffect, useRef } from 'react'
import { gsap, useGSAP, OUT, ScrollTrigger } from '@/lib/gsap'
import { coverTL, exitTL, makeLayer, type Layer } from '@/lib/wipe'
import { Auva, setMood } from '@/components/ui/Auva'
import type { Mood } from '@/types/content'
import styles from './Wipe.module.css'

export interface WipeHandle {
  /** Resolves once the screen is fully covered. */
  cover: (label: string, mood: Mood) => Promise<void>
  /** Resolves once the new page is fully revealed. */
  reveal: () => Promise<void>
  /** Re-measures ScrollTrigger once the new route has mounted. */
  refresh: () => Promise<void>
}

const done = (tl: gsap.core.Timeline) => new Promise<void>((res) => tl.eventCallback('onComplete', res))

/** The three-band slanted wipe played between routes. Loaded after idle; until then links navigate instantly. */
export function Wipe({ register }: { register: (h: WipeHandle | null) => void }) {
  const root = useRef<HTMLDivElement>(null)
  const bands = useRef<Layer[]>([])
  const mid = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLParagraphElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      bands.current = gsap.utils.toArray<HTMLElement>(`.${styles.wl}`, root.current).map((el) => makeLayer(el))
    },
    { scope: root },
  )

  useEffect(() => {
    register({
      cover: contextSafe((text: string, mood: Mood) => {
        label.current!.textContent = text
        setMood(mid.current!, mood)
        const tl = gsap.timeline()
        tl.add(coverTL(bands.current), 0).fromTo(mid.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, 0.75)
        return done(tl)
      }),
      reveal: contextSafe(() => {
        const tl = gsap.timeline()
        tl.to(mid.current, { opacity: 0, y: -30, duration: 0.3, ease: OUT }, 0).add(exitTL([...bands.current].reverse()), 0.05)
        return done(tl)
      }),
      refresh: async () => {
        ScrollTrigger.refresh()
      },
    })
    return () => register(null)
  }, [register, contextSafe])

  return (
    <div ref={root} className={styles.wipe} aria-hidden="true">
      <div className={`${styles.wl} ${styles.a}`} />
      <div className={`${styles.wl} ${styles.b}`} />
      <div className={`${styles.wl} ${styles.c}`} />
      <div ref={mid} className={styles.mid}>
        <div className={styles.midAuva}><Auva mood="wow" decorative /></div>
        <p ref={label} className={`${styles.label} h`} />
      </div>
    </div>
  )
}
