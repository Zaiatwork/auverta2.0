import { useEffect } from 'react'
import { gsap } from './gsap'
import { useReducedMotion } from './motion'

// One blink loop and one pointer listener drive every Auva on the page.
export function useAuvaLife() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    let mx = 0
    let my = 0
    let raf = 0
    let call: gsap.core.Tween

    const blink = () => {
      gsap.to('[data-auva-eye]', { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 })
      call = gsap.delayedCall(gsap.utils.random(2.5, 5), blink)
    }
    call = gsap.delayedCall(2.5, blink)

    const track = () => {
      raf = 0
      document.querySelectorAll<SVGElement>('[data-auva-pupil]').forEach((p) => {
        const svg = p.ownerSVGElement
        if (!svg) return
        const r = svg.getBoundingClientRect()
        if (r.bottom < 0 || r.top > innerHeight || !r.width) return
        const a = Math.atan2(my - (r.top + r.height / 2), mx - (r.left + r.width / 2))
        gsap.to(p, { x: Math.cos(a) * 4, y: Math.sin(a) * 5, duration: 0.3, overwrite: true })
      })
    }
    const move = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(track)
    }
    addEventListener('pointermove', move, { passive: true })

    return () => {
      removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
      call.kill()
    }
  }, [reduced])
}
