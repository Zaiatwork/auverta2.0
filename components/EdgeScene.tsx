'use client'

import { useRef } from 'react'
import { motion, transform, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import PhotoSlot from './PhotoSlot'

const HEADING = 'Why Auverta / One roof / Zero juggling / ' // DRAFT copy
const STATEMENT =
  'One team, one system. We turn bold ideas into brands, sites and content that grow your business.' // DRAFT copy

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{word}</motion.span>
}

// Scene length. Raise it for a slower scene, lower it to cut dead scroll.
const SCENE_HEIGHT_VH = 360
const STATEMENT_TOP_VH = 50 // T: where the statement rests, in vh from the top of the viewport
const PK = 0.4 // key moment of the scene (progress 0..1): all anchors below are measured here

// shortcut: read on scroll only, so a window resize applies at the next scroll event; fix if resize-while-pinned matters
const vh = () => (typeof window === 'undefined' ? 8 : window.innerHeight / 100)
const vw = () => (typeof window === 'undefined' ? 14 : window.innerWidth / 100)
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
const along = (p: number, ys: [number, number, number]) => transform(p, [0, PK, 1], ys)

export default function EdgeScene() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = STATEMENT.split(' ')

  // heading: slides left and leaves through the top
  const headX = useTransform(p, [0, 0.55], ['8%', '-38%'])
  // anchor-based positions (px, top edges): start, value at PK, end
  const T = STATEMENT_TOP_VH
  const headY = useTransform(p, (v) => along(v, [40 * vh(), (T - 50) * vh(), -45 * vh()]))
  const cakeY = useTransform(p, (v) => {
    const h = (isMobile() ? 28 : 17.9) * 1.5 * vw() // 2:3 photo height
    return along(v, [60 * vh(), (T - 6.5) * vh() - h, -100 * vh()])
  })
  const frameY = useTransform(p, (v) => along(v, [80 * vh(), (T - 29.5) * vh(), -100 * vh()]))
  // on phones the statement wraps to 6 lines, so the bottom photo sits lower to stay clear of the text
  const coneY = useTransform(p, (v) => along(v, [110 * vh(), (T + (isMobile() ? 34 : 24)) * vh(), -70 * vh()]))
  // statement enters from the bottom early, then rests at T while its words fill in
  const textY = useTransform(p, [0.1, 0.3], [`${100 - T + 5}vh`, '0vh'])
  // right photo changes frame after the key moment
  const f1 = useTransform(p, [0.35, 0.45], [1, 0])
  const f2 = useTransform(p, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0])
  const f3 = useTransform(p, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0])
  const f4 = useTransform(p, [0.75, 0.85], [0, 1])

  if (reduce) {
    return (
      <section className="bg-night px-[12.8vw] py-24 text-white">
        <h2 className="font-display text-[11vw] uppercase leading-none md:text-[6vw]">Why Auverta</h2>
        <p className="mt-10 text-[8.5vw] font-medium leading-[1.2] md:text-[3.95vw]">{STATEMENT}</p>
      </section>
    )
  }

  return (
    // overflow-x: clip does not break sticky; the stage itself is NOT clipped
    <section ref={ref} className="relative bg-night text-white" style={{ height: `${SCENE_HEIGHT_VH}vh`, overflowX: 'clip' }}>
      <div className="sticky top-0 h-screen">
        {/* heading, clipped to its own window only */}
        <motion.div style={{ y: headY }} className="absolute left-[12.8vw] top-0 z-0 w-[74.4vw] overflow-hidden">
          <motion.h2
            style={{ x: headX }}
            className="w-max whitespace-nowrap font-display text-[17vw] uppercase leading-[1.05] md:text-[11.4vw]"
          >
            {HEADING}{HEADING}
          </motion.h2>
        </motion.div>

        <motion.div style={{ y: cakeY }} className="absolute left-[15.8vw] top-0 z-10 w-[28vw] md:w-[17.9vw]">
          <PhotoSlot className="aspect-[2/3]" label="portrait 2:3" tone="from-pink to-violet" />
        </motion.div>

        <motion.div style={{ y: frameY }} className="absolute right-[15.8vw] top-0 z-10 w-[34vw] md:w-[23.8vw]">
          <div className="relative aspect-[9/16]">
            <motion.div style={{ opacity: f1 }} className="absolute inset-0"><PhotoSlot className="h-full" label="frame A 9:16" tone="from-violet to-night" /></motion.div>
            <motion.div style={{ opacity: f2 }} className="absolute inset-0"><PhotoSlot className="h-full" label="frame B 9:16" tone="from-violet to-pink" /></motion.div>
            <motion.div style={{ opacity: f3 }} className="absolute inset-0"><PhotoSlot className="h-full" label="frame C 9:16" tone="from-pink to-night" /></motion.div>
            <motion.div style={{ opacity: f4 }} className="absolute inset-0"><PhotoSlot className="h-full" label="frame D 9:16" tone="from-night to-violet" /></motion.div>
          </div>
        </motion.div>

        <motion.div style={{ y: coneY }} className="absolute left-[17vw] top-0 z-10 w-[26vw] md:w-[17.9vw]">
          <PhotoSlot className="aspect-[3/4]" label="portrait 3:4" tone="from-night to-violet" />
        </motion.div>

        <motion.p
          style={{ y: textY, top: `${STATEMENT_TOP_VH}vh` }}
          className="absolute left-[12.8vw] right-[12.8vw] z-20 text-[8.5vw] font-medium leading-[1.2] text-white mix-blend-difference md:text-[3.95vw]"
        >
          {words.map((w, i) => (
            <Word key={i} word={w} progress={p} range={[0.3 + (i / words.length) * 0.4, 0.3 + ((i + 1) / words.length) * 0.4]} />
          ))}
        </motion.p>
      </div>
    </section>
  )
}
