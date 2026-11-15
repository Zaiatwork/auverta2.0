import { DIVISIONS } from '@/content/home'
import { Cell, Grid, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { TransitionLink } from '@/components/ui/TransitionLink'
import styles from './home.module.css'

export function Divisions() {
  return (
    <Section tone="ink" id="divisions" className={styles.divs}>
      <p className="eyebrow">Divisions</p>
      <h2 className="h">Two divisions. One team.</h2>
      <p className={styles.divsSub}>Strategy and craft on one side, AI-powered content and growth on the other, sharing one team and one method.</p>
      <Reveal targets="[data-card]" start="top 85%">
        <div>
          <Grid>
            {DIVISIONS.map((d) => (
              <Cell key={d.title} span={6}>
                <article className={styles.div} data-card>
                  <h3 className="h">{d.title}</h3>
                  <p>{d.body}</p>
                  <ul>
                    {d.items.map((i) => <li key={i.label}><TransitionLink href={i.href} label={i.label}>{i.label}</TransitionLink></li>)}
                  </ul>
                </article>
              </Cell>
            ))}
          </Grid>
        </div>
      </Reveal>
    </Section>
  )
}
