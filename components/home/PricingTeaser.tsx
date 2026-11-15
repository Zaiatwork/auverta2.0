import { TIERS } from '@/content/home'
import { Button } from '@/components/ui/Button'
import { Cell, Grid, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { TransitionLink } from '@/components/ui/TransitionLink'
import styles from './home.module.css'

// PLACEHOLDER: prices are unknown, so every tier shows "From $—". Calm section: no Auva, no sparks.
export function PricingTeaser() {
  return (
    <Section tone="soft" id="pricing-teaser" className={styles.ptz}>
      <p className="eyebrow">Pricing</p>
      <h2 className="h">Pricing that explains itself.</h2>
      <p className={styles.lead}>Three tiers per service. Clear scope, clear timelines. (placeholder prices)</p>
      <Reveal targets="[data-card]" y={40} stagger={0.1}>
        <Grid>
          {TIERS.map((t, i) => (
            <Cell key={t.name} span={4}>
              <article className={`${styles.tier} ${i === 1 ? styles.tierMid : ''}`} data-card>
                <p className="eyebrow">{t.name}</p>
                <p className={`${styles.tierPrice} h ph ph--q`}>From $—</p>
                <p>{t.fit} (draft)</p>
                <Button href="/pricing" variant={i === 1 ? 'soft' : 'ink'} label="Pricing">See details</Button>
              </article>
            </Cell>
          ))}
        </Grid>
      </Reveal>
      <TransitionLink href="/pricing" className={styles.more} label="Pricing">See full pricing →</TransitionLink>
    </Section>
  )
}
