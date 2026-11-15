import { VOICES } from '@/content/home'
import { Cell, Grid, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import styles from './home.module.css'

// PLACEHOLDER section: no real testimonials yet.
export function Voices() {
  return (
    <Section tone="violet" id="voices" className={styles.voices}>
      <p className="eyebrow">Client voices</p>
      <h2 className="h">What clients say.</h2>
      <Reveal targets="[data-card]">
        <Grid>
          {Array.from({ length: VOICES }, (_, i) => (
            <Cell key={i} span={4}>
              <figure className={`${styles.quote} ph`} data-card>
                <blockquote><p>“Quote goes here.”</p></blockquote>
                <figcaption><cite>Name · Role, Company</cite></figcaption>
              </figure>
            </Cell>
          ))}
        </Grid>
      </Reveal>
    </Section>
  )
}
