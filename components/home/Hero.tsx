'use client'

import type { CSSProperties } from 'react'
import { HERO, SEGMENTS } from '@/content/home'
import { homeEffectsReady } from '@/lib/island'
import { useSite } from '@/components/layout/SiteContext'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { TalkingAuva } from '@/components/ui/TalkingAuva'
import { usePath } from './PathContext'
import styles from './home.module.css'

const idx = (i: number) => ({ '--i': i }) as CSSProperties

/** The entrance and the letter hop are pure CSS (home.module.css), so the headline paints without waiting for any script. */
export function Hero({ afterPreloader = false }: { afterPreloader?: boolean }) {
  const { path, setPath } = usePath()
  const { scrollTo } = useSite()

  return (
    <section className={`${styles.hero} on-violet`} id="top" data-preloader={afterPreloader || undefined}>
      <div className={styles.heroAuva}><div className={styles.pop}><TalkingAuva mood="happy" /></div></div>
      <div className={styles.tag} style={idx(0)}><span className={styles.dot} />{HERO.tag}</div>
      <h1 className={`h ${styles.title}`} aria-label={HERO.lines.join(' ')}>
        {HERO.lines.map((line, n) => (
          <span key={line} className={styles.ln} aria-hidden="true">
            <span className={styles.in} style={idx(n)}>
              {[...line].map((c, i) => <span key={i} className={styles.ch}>{c === ' ' ? ' ' : c}</span>)}
            </span>
          </span>
        ))}
      </h1>
      <p className={styles.sub} style={idx(1)}>{HERO.sub}</p>
      <div className={styles.row} style={idx(2)}>
        <Button href="/contact" label="Contact">Start a project →</Button>
        <div className={styles.picker} role="group" aria-label="Choose your size">
          <span>I&apos;m a…</span>
          {SEGMENTS.map((s) => (
            <Pill
              key={s.key}
              pressed={path === s.key}
              onClick={async () => {
                setPath(s.key)
                // The click is the first interaction, so the pins load now: wait for them (max 1s) before measuring #paths.
                await Promise.race([homeEffectsReady, new Promise((r) => setTimeout(r, 1000))])
                scrollTo('#paths', { duration: 1.4 })
              }}
            >
              {s.label}
            </Pill>
          ))}
        </div>
      </div>
    </section>
  )
}
