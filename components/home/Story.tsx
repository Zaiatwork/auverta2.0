import { Fragment, type CSSProperties } from 'react'
import { STORY } from '@/content/home'
import { Icon, type IconName } from '@/components/ui/Defs'
import { TalkingAuva } from '@/components/ui/TalkingAuva'
import styles from './home.module.css'

interface Chip { left: number; top: number; icon: IconName; bg?: string; ic?: string; r: number; d: number }

const CHIPS: Chip[] = [
  { left: 7, top: 34, icon: 'cursor', r: -10, d: 0 },
  { left: 20, top: 62, icon: 'play', bg: 'var(--pink)', ic: 'var(--ink)', r: 8, d: -1 },
  { left: 33, top: 44, icon: 'chart', bg: 'var(--white)', ic: 'var(--violet)', r: -6, d: -2 },
  { left: 68, top: 40, icon: 'chat', r: 12, d: -0.5 },
  { left: 82, top: 64, icon: 'image', bg: 'var(--ink)', ic: 'var(--soft)', r: -9, d: -1.5 },
  { left: 90, top: 32, icon: 'spark', bg: 'var(--pink)', ic: 'var(--ink)', r: 7, d: -2.5 },
  { left: 56, top: 62, icon: 'cursor', bg: 'var(--soft)', ic: 'var(--violet)', r: -12, d: -3 },
]

const lines = (l: string[]) => l.map((t, i) => <Fragment key={t}>{i > 0 && <br />}{t}</Fragment>)

/** Pinned #1: the chaos gets pulled into Auva, then "Under one roof." The pin runs in the HomeEffects island. */
export function Story() {
  return (
    <section className="on-violet" id="story" aria-label="Our story" data-story>
      <div className={styles.stage}>
        <div className={styles.storyCopy}>
          <p className={`${styles.storyA} h`} data-story-a>{lines(STORY.before)}</p>
          <p className={`${styles.storyB} h`} data-story-b>{lines(STORY.after)}</p>
        </div>
        {CHIPS.map((c, i) => (
          <div key={i} className={styles.chip} data-chip style={{ left: `${c.left}%`, top: `${c.top}%` }}>
            <div className={styles.chipIn} style={{ '--bg': c.bg, '--ic': c.ic, '--r': `${c.r}deg`, '--d': `${c.d}s` } as CSSProperties}>
              <Icon name={c.icon} />
            </div>
          </div>
        ))}
        <div className={styles.storyAuva} data-story-auva><TalkingAuva mood="happy" /></div>
      </div>
    </section>
  )
}
