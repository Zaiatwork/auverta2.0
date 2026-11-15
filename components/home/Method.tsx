import { METHOD } from '@/content/method'
import styles from './home.module.css'

/** Pinned #2: the One-Roof Method scrolls sideways, four steps. The pin runs in the HomeEffects island; without it the track scrolls natively. */
export function Method() {
  return (
    <section className={`${styles.proc} on-violet`} id="method" aria-label="The One-Roof Method" data-method>
      <div className={styles.procPin} data-pin>
        <div className={styles.procHead}>
          <p className="eyebrow">How we work</p>
          <h2 className="h">The One-Roof Method</h2>
          <p>Four steps. One team. Nothing falls between the cracks.</p>
        </div>
        <div className={styles.track} data-track>
          {METHOD.map((s) => (
            <div key={s.n} className={styles.panel}>
              <b aria-hidden="true">{s.n}</b>
              <div>
                <h3 className="h">{s.title}</h3>
                <p>{s.body}</p>
                {s.when ? <span className={styles.when}>{s.when}</span> : <span className={`${styles.when} ph ph--q`}>[timeline]</span>}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.prog} aria-hidden="true"><i data-prog-fill /><div className={styles.progDot} data-prog-dot /></div>
      </div>
    </section>
  )
}
