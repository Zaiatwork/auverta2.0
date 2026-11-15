import { FAQS } from '@/content/faq'
import { Section } from '@/components/ui/Section'
import styles from './home.module.css'

/** Native <details>: keyboard and screen-reader complete without any script. */
export function FaqList() {
  return (
    <Section tone="soft" id="faq" className={styles.faq}>
      <h2 className="h">Quick questions<br />for <em>founders</em></h2>
      {FAQS.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </Section>
  )
}
