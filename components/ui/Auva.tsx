import Image from 'next/image'
import type { Mood } from '@/types/content'
import styles from './Auva.module.css'

interface AuvaProps {
  mood?: Mood
  /** Swap the SVG for a rendered image (the real 3D renders land here). */
  asset?: string
  decorative?: boolean
  className?: string
}

export function setMood(root: ParentNode, mood: Mood) {
  root.querySelectorAll('[data-mood]').forEach((s) => s.setAttribute('data-mood', mood))
}

export function Auva({ mood = 'happy', asset, decorative = false, className = '' }: AuvaProps) {
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': 'Auva, the Auverta mascot' }
  if (asset) return <Image src={asset} alt={decorative ? '' : 'Auva, the Auverta mascot'} width={400} height={400} className={className} />
  return (
    <svg className={`${styles.auva} ${className}`} data-mood={mood} viewBox="0 0 200 200" {...a11y}>
      <path d="M28 120C28 62 62 28 100 28s72 34 72 92c0 20 6 36 14 48-16-2-24 8-38 12-12-8-24-8-36 0-12-8-24-8-36 0-14-4-22-14-38-12 8-12 14-28 14-48z" fill="url(#auva-body)" />
      <ellipse className={styles.shine} cx="72" cy="62" rx="22" ry="12" transform="rotate(-20 72 62)" />
      <g className={styles.eye} data-auva-eye><ellipse className={styles.sclera} cx="78" cy="108" rx="10" ry="14" /><ellipse className={styles.pupil} data-auva-pupil cx="78" cy="110" rx="5" ry="8" /></g>
      <g className={`${styles.eye} ${styles.eyeR}`} data-auva-eye><ellipse className={styles.sclera} cx="124" cy="108" rx="10" ry="14" /><ellipse className={styles.pupil} data-auva-pupil cx="124" cy="110" rx="5" ry="8" /></g>
      <path className={`${styles.lid} ${styles.sL}`} d="M66 108q12 10 24 0" />
      <path className={`${styles.lid} ${styles.sR}`} d="M112 108q12 10 24 0" />
      <path className={`${styles.smile} ${styles.ms}`} d="M88 136q13 14 26 0" />
      <ellipse className={styles.mw} cx="101" cy="141" rx="8" ry="11" />
      <path className={styles.mf} d="M92 140h18" />
      <g className={styles.gl}><rect x="54" y="92" width="48" height="32" rx="14" /><rect x="104" y="92" width="48" height="32" rx="14" /></g>
      <g className={styles.zzz}><text x="150" y="60" fontSize="22">z</text><text x="164" y="42" fontSize="28">Z</text></g>
    </svg>
  )
}
