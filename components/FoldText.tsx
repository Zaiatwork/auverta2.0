'use client'

import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

type Props = {
  text: string // use \n for a new line
  trigger?: 'mount' | 'view' // mount = on load (hero), view = when scrolled into view
  duration?: number // seconds per letter
  stagger?: number // seconds between letters
  delay?: number // seconds before the first letter
  foldAngle?: number // starting angle in degrees
  perspective?: number // px
  crease?: number // 0 to 1, darkness of the fold
  hoverRefold?: boolean // letters near the cursor tilt back a little
  refoldRadius?: number // px
  refoldAngle?: number // degrees
  className?: string
}

export default function FoldText({
  text, trigger = 'mount', duration = 0.65, stagger = 0.045, delay = 0,
  foldAngle = 92, perspective = 700, crease = 0.45,
  hoverRefold = false, refoldRadius = 140, refoldAngle = 45, className = '',
}: Props) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(trigger === 'mount')

  const lines = useMemo(
    () => text.split('\n').map((line) => line.split(' ').map((word) => [...word])),
    [text],
  )

  // reveal when scrolled into view
  useEffect(() => {
    if (trigger !== 'view') return
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); io.disconnect() }
      },
      { rootMargin: '0px 0px -18% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [trigger])

  // letters near the cursor tilt back a little (mouse devices only)
  useEffect(() => {
    if (!hoverRefold) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootRef.current
    if (!fine || reduce || !root) return

    const tilts = Array.from(root.querySelectorAll<HTMLElement>('[data-fold-tilt]'))
    let centers: { x: number; y: number }[] | null = null // layout positions, unaffected by transforms
    let raf = 0
    let px = -1e4
    let py = -1e4

    const measure = () => {
      centers = tilts.map((t) => ({ x: t.offsetLeft + t.offsetWidth / 2, y: t.offsetTop + t.offsetHeight / 2 }))
    }
    const tick = () => {
      raf = 0
      if (!centers) measure()
      const box = root.getBoundingClientRect()
      tilts.forEach((t, i) => {
        const c = centers?.[i]
        if (!c) return
        const d = Math.hypot(box.left + c.x - px, box.top + c.y - py) / refoldRadius
        const v = d < 1 ? 1 - d * d * (3 - 2 * d) : 0 // smooth falloff
        t.style.setProperty('--t', v.toFixed(3))
      })
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY; schedule() }
    const onLeave = () => { px = -1e4; py = -1e4; schedule() }
    const invalidate = () => { centers = null }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', invalidate)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.fonts?.ready.then(invalidate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', invalidate)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [hoverRefold, refoldRadius])

  const vars = {
    '--fold-dur': `${duration}s`,
    '--fold-stagger': `${stagger}s`,
    '--fold-delay': `${delay}s`,
    '--fold-angle': `${foldAngle}deg`,
    '--fold-persp': `${perspective}px`,
    '--fold-crease': crease,
    '--fold-refold': `${refoldAngle}deg`,
  } as CSSProperties

  let n = 0 // running letter index, drives the stagger

  return (
    <span ref={rootRef} className={`fold-root ${inView ? 'fold-in' : ''} ${className}`.trim()} style={vars}>
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      <span aria-hidden="true">
        {lines.map((words, li) => (
          <span key={li} className="block">
            {words.map((chars, wi) => (
              <Fragment key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {chars.map((ch) => {
                    const i = n++
                    return (
                      <span key={i} className="fold-tilt" data-fold-tilt="" style={{ '--i': i } as CSSProperties}>
                        <span className="fold-char">{ch}</span>
                      </span>
                    )
                  })}
                </span>
                {wi < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </span>
  )
}
