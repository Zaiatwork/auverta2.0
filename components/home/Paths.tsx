'use client'

import { LEVERS, PATHS } from '@/content/home'
import { Button } from '@/components/ui/Button'
import { Cell, Grid, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { usePath } from './PathContext'
import styles from './home.module.css'

/** Three paths by audience size, then the three levers (which fill in as they scroll into view). */
export function Paths() {
  const { path, setPath } = usePath()

  return (
    <Section tone="violet" id="paths" className={styles.paths}>
      <p className="eyebrow">Start here</p>
      <h2 className="h">A roof for every size.</h2>
      <Reveal targets="[data-card]" y={60} className={styles.pathsGrid}>
        <div data-skew>
          <Grid>
            {PATHS.map((p) => {
              const active = path === p.key
              return (
                <Cell key={p.key} span={4}>
                  <article
                    className={styles.path}
                    data-card
                    data-active={active}
                    onMouseEnter={() => setPath(p.key)}
                    onFocus={() => setPath(p.key)}
                    onClick={() => setPath(p.key)}
                  >
                    <div>
                      <p className="eyebrow">{p.eyebrow}</p>
                      <h3 className="h">{p.title}</h3>
                      <p>{p.body}</p>
                    </div>
                    <Button href={p.href} variant={active ? 'ink' : 'soft'}>{p.cta}</Button>
                  </article>
                </Cell>
              )
            })}
          </Grid>
        </div>
      </Reveal>
      <div className={styles.levers}>
        <p className={`${styles.leversHead} h`}>Scale has three levers.</p>
        {LEVERS.map((l) => (
          <div key={l.name} className={styles.lever} data-lever>
            <b className="h">{l.name}</b>
            <p>{l.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
