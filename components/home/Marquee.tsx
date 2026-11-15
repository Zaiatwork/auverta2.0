import { MARQUEE } from '@/content/home'
import styles from './home.module.css'

/** Slanted marquee. Runs on a CSS animation; the HomeEffects island speeds it up with scroll velocity. */
export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className={styles.marqWrap} aria-hidden="true">
      <div className={`${styles.marq} h`}>
        <div className={styles.marqTrack} data-marq>
          {items.map((m, i) => <span key={i} className={styles.marqItem}>{m}</span>)}
        </div>
      </div>
    </div>
  )
}
