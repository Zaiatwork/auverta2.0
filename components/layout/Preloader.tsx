'use client'

import { useEffect, useState } from 'react'
import { Auva } from '@/components/ui/Auva'
import styles from './Preloader.module.css'

export const SEEN_COOKIE = 'auverta-seen'
const TOTAL_MS = 2000

/** Auva wakes up. Rendered by the server only on a visitor's first home visit; it removes itself when the CSS has finished. */
export function Preloader() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.cookie = `${SEEN_COOKIE}=1; path=/; max-age=86400; samesite=lax${location.protocol === 'https:' ? '; secure' : ''}`
    const t = setTimeout(() => setGone(true), TOTAL_MS)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null
  return (
    <div aria-hidden="true">
      <div className={`${styles.layer} ${styles.a}`} />
      <div className={`${styles.layer} ${styles.b}`} />
      <div className={`${styles.layer} ${styles.c}`} />
      <div className={`${styles.layer} ${styles.pre}`}>
        <div className={`${styles.face} ${styles.sleep}`}><Auva mood="sleep" decorative /></div>
        <div className={`${styles.face} ${styles.wow}`}><Auva mood="wow" decorative /></div>
        <p className={`${styles.hi} h`}>Hi. I&apos;m Auva.</p>
        <div className={`${styles.count} h`} />
        <span className={styles.label}>Auverta Studio</span>
      </div>
    </div>
  )
}
