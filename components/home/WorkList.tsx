'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useFinePointer } from '@/lib/motion'
import { PROJECTS } from '@/content/work'
import { Auva } from '@/components/ui/Auva'
import { TransitionLink } from '@/components/ui/TransitionLink'
import styles from './home.module.css'

/** Selected work. Hovering a row tints the section and a peek card follows the pointer. Pure CSS plus one rAF loop. */
export function WorkList() {
  const [active, setActive] = useState<number | null>(null)
  const peek = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const fine = useFinePointer()
  const current = PROJECTS[active ?? 0]
  const open = fine && active !== null

  // The peek card eases toward the pointer and leans into the direction of travel, only while a row is hovered.
  useEffect(() => {
    const card = peek.current
    if (!open || !card) return
    let raf = 0
    let x = target.current.x
    let y = target.current.y
    let r = 0
    const tick = () => {
      x += (target.current.x - x) * 0.18
      y += (target.current.y - y) * 0.18
      r += (Math.max(-14, Math.min(14, (target.current.x - x) * 0.12)) - r) * 0.2
      card.style.setProperty('--x', x.toFixed(1))
      card.style.setProperty('--y', y.toFixed(1))
      card.style.setProperty('--r', r.toFixed(2))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [open])

  return (
    <section
      className={`sec on-ink ${styles.work}`}
      id="work"
      style={open ? { backgroundColor: current.bg, color: current.fg } : undefined}
    >
      <div className={styles.workHead}>
        <h2 className="h">Selected work</h2>
        <span>( placeholder projects from the feed · hover, then click )</span>
      </div>
      <ul
        className={styles.plist}
        data-calm
        onPointerMove={(e) => { target.current = { x: e.clientX, y: e.clientY } }}
        onPointerLeave={() => setActive(null)}
      >
        {PROJECTS.map((p, i) => (
          <li key={p.slug}>
            <TransitionLink
              href={`/work/${p.slug}`}
              className={styles.prow}
              label={p.title}
              mood={p.mood}
              data-cursor="View"
              onPointerEnter={(e) => {
                target.current = { x: e.clientX, y: e.clientY }
                setActive(i)
              }}
            >
              <span className={styles.pnum}>0{i + 1}</span>
              <span className={`${styles.ptitle} h`}>
                <span className="sr">{p.title}</span>
                <span aria-hidden="true">{p.title}</span>
              </span>
              <span className={styles.ptags}>{p.tags}</span>
              <span className={styles.pyear}>{p.year}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>
      <div
        ref={peek}
        className={styles.peek}
        data-open={open}
        aria-hidden="true"
        style={{ '--pbg': current.bg, '--pfg': current.fg } as CSSProperties}
      >
        <span className={styles.peekTags}>{current.tags}</span>
        <div className={styles.peekAuva}><Auva mood={current.mood} decorative /></div>
        <b className={`${styles.peekTitle} h`}>{current.title}</b>
      </div>
    </section>
  )
}
