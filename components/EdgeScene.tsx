'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
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

export default function EdgeScene() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = STATEMENT.split(' ')

  // heading: slides left and leaves through the top
  const headX = useTransform(p, [0, 0.55], ['8%', '-38%'])
  const headY = useTransform(p, [0, 0.5], ['0vh', '-70vh'])
  // photos travel through the whole scene
  const cakeY = useTransform(p, [0, 0.8], ['80vh', '-110vh'])
  const frameY = useTransform(p, [0, 1], ['70vh', '-100vh'])
  const coneY = useTransform(p, [0.3, 1], ['110vh', '-80vh'])
  // statement enters from the bottom, then stays at 47vh while its words fill in
  const textY = useTransform(p, [0.25, 0.5], ['62vh', '0vh'])
  // right photo changes frame while it moves
  const f1 = useTransform(p, [0.2, 0.3], [1, 0])
  const f2 = useTransform(p, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0])
  const f3 = useTransform(p, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0])
  const f4 = useTransform(p, [0.7, 0.8], [0, 1])

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
        <motion.div style={{ y: headY }} className="absolute left-[12.8vw] top-[50vh] z-0 w-[74.4vw] overflow-hidden">
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
          style={{ y: textY }}
          className="absolute left-[12.8vw] right-[12.8vw] top-[47vh] z-20 text-[8.5vw] font-medium leading-[1.2] text-white mix-blend-difference md:text-[3.95vw]"
        >
          {words.map((w, i) => (
            <Word key={i} word={w} progress={p} range={[0.45 + (i / words.length) * 0.4, 0.45 + ((i + 1) / words.length) * 0.4]} />
          ))}
        </motion.p>
      </div>
    </section>
  )
}
