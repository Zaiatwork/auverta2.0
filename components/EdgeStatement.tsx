'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import PhotoSlot from './PhotoSlot'

const STATEMENT =
  'One team, one system. We turn bold ideas into brands, sites and content that grow your business.' // DRAFT

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{word}</motion.span>
}

export default function EdgeStatement() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = STATEMENT.split(' ')

  const yRight = useTransform(p, [0, 1], ['5vh', '-110vh'])
  const yLeft = useTransform(p, [0, 1], ['65vh', '-70vh'])
  const o1 = useTransform(p, [0.3, 0.4], [1, 0])
  const o2 = useTransform(p, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0])
  const o3 = useTransform(p, [0.55, 0.65], [0, 1])

  if (reduce) {
    return (
      <section className="bg-night px-[12.8vw] py-24 text-white">
        <p className="text-[8.5vw] font-medium leading-[1.2] md:text-[3.95vw]">{STATEMENT}</p>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative bg-night text-white" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: yLeft }} className="absolute left-[17vw] top-0 w-[26vw] md:w-[17.9vw]">
          <PhotoSlot className="aspect-[3/4]" label="portrait 3:4" tone="from-night to-violet" />
        </motion.div>

        <motion.div style={{ y: yRight }} className="absolute left-[56vw] top-0 w-[34vw] md:left-[60.4vw] md:w-[23.8vw]">
          <div className="relative aspect-[9/16]">
            <motion.div style={{ opacity: o1 }} className="absolute inset-0"><PhotoSlot className="h-full" label="frame A" tone="from-violet to-pink" /></motion.div>
            <motion.div style={{ opacity: o2 }} className="absolute inset-0"><PhotoSlot className="h-full" label="frame B" tone="from-pink to-night" /></motion.div>
            <motion.div style={{ opacity: o3 }} className="absolute inset-0"><PhotoSlot className="h-full" label="frame C" tone="from-night to-violet" /></motion.div>
          </div>
        </motion.div>

        <p className="absolute left-[12.8vw] right-[12.8vw] top-[47vh] z-20 text-[8.5vw] font-medium leading-[1.2] text-white mix-blend-difference md:text-[3.95vw]">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={p} range={[0.06 + (i / words.length) * 0.5, 0.06 + ((i + 1) / words.length) * 0.5]} />
          ))}
        </p>
      </div>
    </section>
  )
}
