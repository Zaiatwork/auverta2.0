'use client'

import { IDEAS, SEGMENTS } from '@/content/home'
import { Auva } from '@/components/ui/Auva'
import { Icon } from '@/components/ui/Defs'
import { Cell, Grid, Section } from '@/components/ui/Section'
import { Pill } from '@/components/ui/Pill'
import { usePath } from './PathContext'
import styles from './home.module.css'

/** "One idea. Every format.": the same line shown on a site, a post, a video and a banner. */
export function OneIdea() {
  const { path, setPath } = usePath()
  const shown = path ?? 'startup'
  const idea = IDEAS[shown]
  // Remounting on change replays the CSS rise; nothing animates on first render.
  const swap = path ? styles.swap : undefined

  return (
    <Section tone="soft" id="idea" className={styles.idea}>
      <p className="eyebrow">Consistency, shown</p>
      <h2 className="h">One idea. Every format.</h2>
      <div className={styles.ideaChips} role="group" aria-label="Pick an audience">
        <span className="eyebrow">See it for a…</span>
        {SEGMENTS.map((s) => <Pill key={s.key} pressed={shown === s.key} onClick={() => setPath(s.key)}>{s.label}</Pill>)}
      </div>
      <div data-mocks>
        <Grid className={styles.mocks}>
          <Cell span={7}>
            <figure className={styles.mock} data-mock>
              <div className={styles.mwTop} aria-hidden="true"><i /><i /><i /><span>yourbrand.com</span></div>
              <div className={styles.mwBody}>
                <p className="eyebrow">Your brand</p>
                <h3 key={`w-${shown}`} className={`h ${swap ?? ''}`}>{idea.h}</h3>
                <p key={`s-${shown}`} className={swap}>{idea.s}</p>
                <span className={styles.mwBtn}>Start a project</span>
                <div className={styles.mwAuva}><Auva mood="happy" decorative /></div>
              </div>
              <figcaption>Website</figcaption>
            </figure>
          </Cell>
          <Cell span={5}>
            <figure className={`${styles.mock} ${styles.mockPost}`} data-mock>
              <h3 key={`p-${shown}`} className={`h ${swap ?? ''}`}>{idea.h}</h3>
              <div className={styles.pa}><Auva mood="wink" decorative /></div>
              <figcaption>Social post</figcaption>
            </figure>
          </Cell>
          <Cell span={3}>
            <figure className={`${styles.mock} ${styles.mockVideo}`} data-mock>
              <div className={styles.play}><Icon name="play" /></div>
              <h3 key={`v-${shown}`} className={`h ${swap ?? ''}`}>{idea.h}</h3>
              <figcaption>Short video</figcaption>
            </figure>
          </Cell>
          <Cell span={9}>
            <figure className={`${styles.mock} ${styles.mockBanner}`} data-mock>
              <h3 key={`b-${shown}`} className={`h ${swap ?? ''}`}>{idea.h}</h3>
              <div className={styles.pa}><Auva mood="cool" decorative /></div>
              <figcaption>Banner ad</figcaption>
            </figure>
          </Cell>
        </Grid>
      </div>
      <p className={styles.ideaNote}>Same idea, same type, same palette, same character. That&apos;s what consistency looks like.</p>
    </Section>
  )
}
