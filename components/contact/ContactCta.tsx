'use client'

import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '@/content/contact'
import ContactForm from './ContactForm'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Studio Namma pattern: a "Let's talk" band. Say hello drops the whole form down from the top
// and covers the page. It is a panel, not a popup: no dimmed box, the page itself is replaced.
export default function ContactCta() {
  const [open, setOpen] = useState(false)
  const opener = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const first = useRef(false) // true while the panel is open or has just closed

  useEffect(() => {
    // skip the initial render (StrictMode runs effects twice, so track "was open" instead of "first run")
    if (!open && !first.current) return
    first.current = open
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) {
      const t = setTimeout(() => panel.current?.querySelector<HTMLElement>('input')?.focus(), 500)
      const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', esc)
      return () => { clearTimeout(t); window.removeEventListener('keydown', esc) }
    }
    opener.current?.focus()
  }, [open])

  // restore scroll if the page unmounts while open
  useEffect(() => () => { document.documentElement.style.overflow = '' }, [])

  return (
    <section id="contact" className="grid min-h-svh items-center gap-10 bg-fog px-5 py-[12vh] text-night md:grid-cols-[56fr_44fr] md:gap-0 md:px-[1.2vw]">
      <h2 className="font-display rise whitespace-nowrap text-[11vw] uppercase leading-[1.05] tracking-[-0.02em] md:text-[5.8vw]">
        {CONTACT.cta[0]}<br />
        <span className="inline-flex items-center gap-[1.4vw]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized */}
          <img src={`${BASE}/images/workflow/team-card.jpg`} alt="" className="h-[0.9em] w-[1.45em] rounded-[0.08em] object-cover" />
          {CONTACT.cta[1]}
        </span>
      </h2>
      <div className="rise md:pb-[4vw]">
        <p className="max-w-[24ch] text-2xl leading-snug md:text-[max(1.7vw,20px)]">{CONTACT.pitch}</p>
        <button
          ref={opener}
          type="button"
          aria-expanded={open}
          aria-controls="contact-panel"
          onClick={() => setOpen(true)}
          className="group mt-8 inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] md:text-[max(0.9vw,13px)]"
        >
          {CONTACT.button}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </button>
      </div>

      <div
        ref={panel}
        id="contact-panel"
        role="dialog"
        aria-label="Contact form"
        // inert: closed panel is skipped by keyboard and screen readers
        inert={!open}
        className={`fixed inset-0 z-[100] overflow-y-auto bg-fog transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${open ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed right-5 top-5 z-10 rounded-full bg-night px-6 py-2.5 text-sm uppercase tracking-wide text-white transition-colors hover:bg-violet md:right-[3vw] md:top-[3vh]"
        >
          Close ✕
        </button>
        <ContactForm />
      </div>
    </section>
  )
}
