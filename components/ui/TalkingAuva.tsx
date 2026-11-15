'use client'

import { useEffect, useRef, useState } from 'react'
import type { Mood } from '@/types/content'
import { Auva } from './Auva'
import styles from '@/components/home/home.module.css'

const LINES = ['One studio. Zero juggling!', 'Beyond ordinary!', 'Psst... hire us.', 'I do not blink. (I blink.)', 'Everything under one roof!']

/** Auva that answers a poke with a speech bubble. Pure CSS motion; it sits in its own slot and never covers content. */
export function TalkingAuva({ mood = 'happy' }: { mood?: Mood }) {
  const [line, setLine] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const poke = () => {
    clearTimeout(timer.current)
    setLine(LINES[Math.floor(Math.random() * LINES.length)])
    timer.current = setTimeout(() => setLine(null), 2100)
  }

  return (
    <button type="button" className={styles.talk} data-cursor="Poke" aria-label="Poke Auva" onClick={poke}>
      <span key={line ?? 'idle'} className={`${styles.body} ${line ? styles.jump : ''}`}>
        <Auva mood={line ? 'wow' : mood} decorative />
      </span>
      {line && <span className={styles.bubble} role="status">{line}</span>}
    </button>
  )
}
