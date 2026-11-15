'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only on fine pointer devices (desktops)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const xCursor = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3.out' })
    const yCursor = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3.out' })

    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.45, ease: 'power3.out' })
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.45, ease: 'power3.out' })

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) setIsVisible(true)
      xCursor(e.clientX)
      yCursor(e.clientY)
      xFollower(e.clientX)
      yFollower(e.clientY)
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]')
      if (interactive) {
        setIsHovered(true)
        const customText = interactive.getAttribute('data-cursor')
        if (customText) {
          setCursorText(customText)
        } else {
          setCursorText('')
        }
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseover', handlePointerOver, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseover', handlePointerOver)
      document.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, [isVisible])

  return (
    <>
      {/* Center pinpoint */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-toxic-lime transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-0' : 'h-2 w-2'}`}
      />

      {/* Follower ring */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'h-16 w-16 bg-toxic-lime text-abyss font-mono text-[10px] font-bold uppercase tracking-wider'
            : 'h-9 w-9 border border-ghost-white/40 bg-transparent'
        }`}
      >
        {isHovered && cursorText && <span>{cursorText}</span>}
      </div>
    </>
  )
}
