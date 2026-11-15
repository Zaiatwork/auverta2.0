import { Section } from './Section'
import styles from './PageStub.module.css'

interface PageStubProps {
  eyebrow: string
  title: string
  note: string
  tone?: 'violet' | 'ink' | 'soft'
}

/** Placeholder page for a route that a later milestone builds out. Flagged so it cannot be mistaken for finished content. */
export function PageStub({ eyebrow, title, note, tone = 'violet' }: PageStubProps) {
  return (
    <Section tone={tone} className={styles.stub}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className={`h ${styles.title}`}>{title}</h1>
      <p className={`ph ${styles.note}`}>{note}</p>
    </Section>
  )
}
