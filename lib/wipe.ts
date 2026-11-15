import { gsap, IO } from './gsap'

// Slanted wipe: each layer is a polygon whose four corners move independently.
export interface Layer {
  el: HTMLElement
  p: { tl: number; tr: number; bl: number; br: number }
}

export const makeLayer = (el: HTMLElement, covered = false): Layer => ({
  el,
  p: covered ? { tl: -10, tr: -10, bl: 110, br: 110 } : { tl: 110, tr: 110, bl: 110, br: 110 },
})

export const draw = (L: Layer) => {
  L.el.style.clipPath = `polygon(0 ${L.p.tl}%,100% ${L.p.tr}%,100% ${L.p.br}%,0 ${L.p.bl}%)`
}

export const coverTL = (layers: Layer[]) => {
  const t = gsap.timeline()
  layers.forEach((L, i) => {
    t.fromTo(L.p, { tl: 110, tr: 110, bl: 110, br: 110 }, { tl: -10, duration: 0.8, ease: IO, onUpdate: () => draw(L) }, i * 0.1)
      .to(L.p, { tr: -10, duration: 0.8, ease: IO, onUpdate: () => draw(L) }, i * 0.1 + 0.12)
  })
  return t
}

export const exitTL = (list: Layer[]) => {
  const t = gsap.timeline()
  list.forEach((L, i) => {
    t.to(L.p, { bl: -10, duration: 0.9, ease: IO, onUpdate: () => draw(L) }, i * 0.1)
      .to(L.p, { br: -10, duration: 0.9, ease: IO, onUpdate: () => draw(L) }, i * 0.1 + 0.12)
  })
  return t
}
