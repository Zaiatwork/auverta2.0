'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

const CITIES = [
  { name: 'Lahore, PK', timeZone: 'Asia/Karachi' },
  { name: 'London, UK', timeZone: 'Europe/London' },
  { name: 'New York, US', timeZone: 'America/New_York' },
  { name: 'Dubai, UAE', timeZone: 'Asia/Dubai' },
  { name: 'Tokyo, JP', timeZone: 'Asia/Tokyo' },
]

const MENU_ITEMS = [
  { href: '/', label: 'Home', visual: '/images/web-development.webp', tag: '01' },
  { href: '/projects', label: 'Work', visual: '/images/branding.webp', tag: '02' },
  { href: '/services', label: 'Services', visual: '/images/digital-marketing.webp', tag: '03' },
  { href: '/about', label: 'Studio', visual: '/images/auva/auva-card-hero.jpg', tag: '04' },
  { href: '/contact', label: 'Contact', visual: '/images/contact.webp', tag: '05' },
]

export default function NammaNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isAnimating = useRef(false)
  const [cityIndex, setCityIndex] = useState(0)
  const [cityTime, setCityTime] = useState('')

  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuContentRef = useRef<HTMLDivElement>(null)

  // Rotating world clocks
  useEffect(() => {
    const updateTime = () => {
      const city = CITIES[cityIndex]
      const now = new Date()
      try {
        setCityTime(
          now.toLocaleTimeString('en-US', {
            timeZone: city.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
        )
      } catch {
        setCityTime(now.toLocaleTimeString())
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [cityIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % CITIES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // GSAP 3D Curtain Menu Logic (100% Studio Namma reproduction)
  const toggleMenu = () => {
    if (isAnimating.current) return
    const container = document.querySelector('.page-main') as HTMLElement | null
    const menuOverlay = menuOverlayRef.current
    const menuContent = menuContentRef.current

    if (!menuOverlay || !menuContent) return

    isAnimating.current = true

    if (!isOpen) {
      // OPEN MENU
      menuOverlay.style.pointerEvents = 'auto'
      document.body.style.overflow = 'hidden'
      if (container) container.style.pointerEvents = 'none'

      gsap.set(menuOverlay, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', opacity: 1 })
      gsap.set(menuContent, { rotation: -15, x: -100, y: -100, scale: 1.5, opacity: 0.25 })
      if (container) gsap.set(container, { transformOrigin: '50% 50% 0' })

      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut', duration: 1.6 },
        onComplete: () => {
          isAnimating.current = false
          setIsOpen(true)
        },
      })

      if (container) {
        tl.to(container, { rotation: 10, x: 250, y: 350, opacity: 0, scale: 1.4 }, 0)
      }
      tl.to(menuContent, { rotation: 0, x: 0, y: 0, scale: 1, opacity: 1 }, 0)
      tl.to(menuOverlay, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)' }, 0)

      const links = gsap.utils.toArray<HTMLElement>('.namma-nav-link')
      gsap.killTweensOf(links)
      const tlLinks = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tlLinks.set(links, { y: 120, opacity: 0 })
      tlLinks.to(links, { y: 0, opacity: 1, duration: 1.2, delay: 0.5, stagger: 0.06 })
    } else {
      // CLOSE MENU
      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut', duration: 1.6 },
        onComplete: () => {
          setIsOpen(false)
          isAnimating.current = false
          menuOverlay.style.pointerEvents = 'none'
          document.body.style.overflow = ''
          if (container) {
            container.style.pointerEvents = ''
            gsap.set(container, { clearProps: 'transform,opacity' })
          }
          gsap.set(menuContent, { clearProps: 'transform,opacity' })
          gsap.set(menuOverlay, { clearProps: 'clipPath,opacity' })
        },
      })

      if (container) {
        tl.to(container, { rotation: 0, x: 0, y: 0, scale: 1, opacity: 1 }, 0)
      }
      tl.to(menuContent, { rotation: -15, x: -100, y: -100, scale: 1.5, opacity: 0.25 }, 0)
      tl.to(menuOverlay, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }, 0)
    }
  }

  // Hover visual width expander for desktop
  const handleLinkEnter = (visualEl: HTMLElement | null) => {
    if (!visualEl || window.innerWidth <= 991) return
    gsap.to(visualEl, {
      width: '12rem',
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  const handleLinkLeave = (visualEl: HTMLElement | null) => {
    if (!visualEl || window.innerWidth <= 991) return
    gsap.to(visualEl, {
      width: '0rem',
      duration: 0.4,
      ease: 'power3.in',
    })
  }

  return (
    <>
      {/* 1. TOP BAR (nav-top) */}
      <nav className="fixed inset-x-0 top-0 z-50 px-6 py-5 mix-blend-difference selection:bg-toxic-lime selection:text-abyss sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ghost-white">
          {/* Logo with split roll hover */}
          <Link href="/" className="group relative overflow-hidden flex flex-col h-4">
            <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full">
              AUVERTA STUDIO
            </span>
            <span className="absolute top-full transition-transform duration-500 ease-out group-hover:-translate-y-full text-toxic-lime">
              AUVERTA STUDIO
            </span>
          </Link>

          {/* Center: Menu Toggle */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            className="group relative flex h-4 flex-col overflow-hidden text-center cursor-pointer focus:outline-none"
          >
            <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full">
              {isOpen ? 'CLOSE' : 'MENU'}
            </span>
            <span className="absolute top-full transition-transform duration-500 ease-out group-hover:-translate-y-full text-toxic-lime">
              {isOpen ? 'CLOSE' : 'OPEN'}
            </span>
          </button>

          {/* Right: Contact Trigger */}
          <Link href="/contact" className="group relative overflow-hidden flex flex-col h-4">
            <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full">
              LET&apos;S WORK TOGETHER
            </span>
            <span className="absolute top-full transition-transform duration-500 ease-out group-hover:-translate-y-full text-toxic-lime">
              START A PROJECT ↗
            </span>
          </Link>
        </div>
      </nav>

      {/* 2. BOTTOM BAR (nav-bottom) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 hidden px-6 py-5 mix-blend-difference sm:px-10 md:block pointer-events-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ghost-white/70">
          <div>
            <span>WE CRAFT BOLD BRAND SYSTEMS &amp; BESPOKE DIGITAL ARCHITECTURE.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-toxic-lime">●</span>
            <span className="transition-opacity duration-300">
              {CITIES[cityIndex].name} — {cityTime}
            </span>
          </div>
        </div>
      </nav>

      {/* 3. FULLSCREEN 3D CURTAIN MENU (nav-menu) */}
      <div
        ref={menuOverlayRef}
        aria-hidden={!isOpen}
        className="fixed inset-0 z-[60] flex flex-col justify-between bg-abyss px-8 py-24 text-ghost-white pointer-events-none md:px-16"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          willChange: 'clip-path',
        }}
      >
        <div ref={menuContentRef} className="mx-auto flex size-full max-w-7xl flex-col justify-between">
          {/* Top Label */}
          <div className="flex items-center justify-between border-b border-ghost-white/10 pb-6 font-mono text-xs uppercase tracking-[0.25em] text-ghost-white/40">
            <span>[ NAVIGATION INDEX ]</span>
            <span className="text-toxic-lime">AVAILABLE FOR WORK</span>
          </div>

          {/* Middle Links List */}
          <ul className="flex flex-col gap-2 py-8">
            {MENU_ITEMS.map((item) => {
              let visualRef: HTMLDivElement | null = null
              return (
                <li key={item.href} className="overflow-hidden">
                  <div className="namma-nav-link flex items-center gap-6">
                    <span className="font-mono text-sm text-toxic-lime font-bold">
                      {item.tag}
                    </span>
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (isOpen) toggleMenu()
                      }}
                      onMouseEnter={() => handleLinkEnter(visualRef)}
                      onMouseLeave={() => handleLinkLeave(visualRef)}
                      className="group flex items-center gap-6 font-display text-5xl font-extrabold uppercase tracking-tight text-ghost-white transition-colors duration-300 hover:text-toxic-lime sm:text-7xl lg:text-8xl"
                    >
                      {/* Expanding Thumbnail Visual (Studio Namma style) */}
                      <div
                        ref={(el) => {
                          visualRef = el
                        }}
                        className="relative hidden h-16 w-0 overflow-hidden rounded-xl border border-ghost-white/20 bg-deep-layer transition-[width] will-change-[width] lg:block"
                      >
                        <Image
                          src={item.visual}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Bottom Footer Info */}
          <div className="flex flex-col items-start justify-between gap-4 border-t border-ghost-white/10 pt-6 font-mono text-xs uppercase tracking-[0.2em] text-ghost-white/50 sm:flex-row sm:items-center">
            <div>
              <span>INFO@AUVERTA.STUDIO</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/projects" onClick={toggleMenu} className="hover:text-toxic-lime">
                SELECTED WORK
              </Link>
              <Link href="/services" onClick={toggleMenu} className="hover:text-toxic-lime">
                SERVICES
              </Link>
              <Link href="/about" onClick={toggleMenu} className="hover:text-toxic-lime">
                STUDIO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
