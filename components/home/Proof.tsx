import { PROOF } from '@/content/home'
import { Cell, Grid, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import styles from './home.module.css'

// PLACEHOLDER section: logos, counts and metrics are flagged until real proof exists.
export function Proof() {
  return (
    <Section tone="soft" size="s" id="proof" className={styles.proof}>
      <p className="eyebrow">{PROOF.eyebrow}</p>
      <h2 className="h">{PROOF.title}</h2>
      <Reveal targets="[data-card]" y={30} stagger={0.06} start="top 80%">
        <div className={styles.logos}>
          {Array.from({ length: PROOF.logos }, (_, i) => (
            <div key={i} className={`${styles.logoPh} ph ph--q`} data-card>Client logo</div>
          ))}
        </div>
        <Grid>
          {PROOF.stats.map((s) => (
            <Cell key={s.label} span={4}>
              <div className={`${styles.stat} ph`} data-card>
                <b className="h">{s.value}</b>
                <span>{s.label}</span>
              </div>
            </Cell>
          ))}
        </Grid>
      </Reveal>
    </Section>
  )
}
