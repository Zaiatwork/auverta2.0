'use client'

import { Section } from '@/components/ui/Section'
import styles from '@/components/ui/PageStub.module.css'

export default function RouteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section tone="ink" className={styles.stub}>
      <p className="eyebrow">Something broke</p>
      <h1 className={`h ${styles.title}`}>Try that again.</h1>
      <p>The page hit an error. Nothing you did caused it.</p>
      <div><button type="button" className="btn btn--soft" onClick={reset}>Retry</button></div>
    </Section>
  )
}
