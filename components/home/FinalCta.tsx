import { Fragment, type CSSProperties } from 'react'
import { SITE } from '@/content/site'
import { CTA } from '@/content/home'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Defs'
import { TalkingAuva } from '@/components/ui/TalkingAuva'
import styles from './home.module.css'

interface Sticker { left: number; top: number; icon: IconName; bg: string; ic: string }

const STICKERS: Sticker[] = [
  { left: 8, top: 12, icon: 'cursor', bg: 'var(--pink)', ic: 'var(--ink)' },
  { left: 72, top: 10, icon: 'play', bg: 'var(--pink)', ic: 'var(--ink)' },
  { left: 44, top: 6, icon: 'chart', bg: 'var(--violet)', ic: 'var(--soft)' },
  { left: 86, top: 40, icon: 'chat', bg: 'var(--white)', ic: 'var(--violet)' },
  { left: 5, top: 46, icon: 'image', bg: 'var(--violet)', ic: 'var(--white)' },
  { left: 60, top: 30, icon: 'spark', bg: 'var(--soft)', ic: 'var(--ink)' },
]

/** Closing screen: stickers around the one lime button. The HomeEffects island makes the stickers draggable. */
export function FinalCta() {
  return (
    <section className={`${styles.cta} on-ink`} id="contact-cta" data-cta>
      {STICKERS.map((s, i) => (
        <div key={i} className={styles.sticker} data-sticker data-cursor="Drag" aria-hidden="true"
          style={{ left: `${s.left}%`, top: `${s.top}%`, '--bg': s.bg, '--ic': s.ic } as CSSProperties}>
          <Icon name={s.icon} />
        </div>
      ))}
      <div className={styles.ctaAuva}><TalkingAuva mood="cool" /></div>
      <h2 className="h" data-cta-title>
        {CTA.lines.map((l, i) => (
          <Fragment key={l}>{i > 0 && <br />}{i === 1 ? <em>{l}</em> : l}</Fragment>
        ))}
      </h2>
      <div className={styles.ctaRow}>
        <Button href="/contact" label="Contact">Start a project →</Button>
        <a href={`mailto:${SITE.email}`} className="ph ph--q">{SITE.email}</a>
      </div>
    </section>
  )
}
