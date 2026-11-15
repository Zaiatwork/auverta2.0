import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Two easings only. Elastic is reserved for Auva.
export const OUT = 'expo.out'
export const IO = 'expo.inOut'
export const AUVA_EASE = 'elastic.out(1,.55)'

export { gsap, ScrollTrigger, useGSAP }
