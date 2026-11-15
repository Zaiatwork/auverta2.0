import type { Metadata } from 'next'
import { Auva } from '@/components/ui/Auva'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import styles from '@/components/ui/PageStub.module.css'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <Section tone="ink" className={styles.stub}>
      <p className="eyebrow">404</p>
      <h1 className={`h ${styles.title}`}>Lost the thread.</h1>
      <div style={{ width: 'clamp(120px, 18vw, 220px)' }}><Auva mood="sleep" decorative /></div>
      <p>This page does not exist. Auva checked.</p>
      <div><Button href="/">Back home</Button></div>
    </Section>
  )
}
