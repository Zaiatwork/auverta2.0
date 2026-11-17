'use client'

import { useState } from 'react'
import { SITE } from '@/content/site'
import { CONTACT } from '@/content/contact'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Layout follows the Studio Namma contact form: giant heading with a photo capsule between the words,
// then label-left / huge-field-right rows, radio pills for the interest and one Send button.
export default function ContactForm() {
  const [sent, setSent] = useState(false)

  // shortcut: no backend yet, Send opens the visitor's email app. Swap for a real endpoint when one exists.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const body = ['name', 'email', 'phone', 'interest', 'message'].map((k) => `${k}: ${d.get(k) ?? ''}`).join('\n')
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const row = 'grid items-baseline gap-2 border-b border-night/20 py-5 md:grid-cols-[9rem_1fr] md:gap-8 md:py-[1.6vw]'
  const label = 'text-xs uppercase tracking-[0.18em] text-night/60'
  const field = 'w-full bg-transparent text-[7vw] font-semibold leading-tight tracking-tight text-night outline-none placeholder:text-night/25 md:text-[max(2.8vw,26px)]'

  return (
    <div className="px-5 pb-[12vh] pt-[16vh] text-night md:px-[10.8vw]">
      <h2 className="font-display text-[8.5vw] uppercase leading-[1.25] tracking-[-0.02em] md:text-[4.1vw]">
        {CONTACT.title[0]}<br />
        <span className="inline-flex items-center gap-[2vw]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized */}
          <img src={`${BASE}/images/branding.webp`} alt="" className="h-[0.95em] w-[2.4em] rounded-full object-cover" />
          {CONTACT.title[1]}
        </span>
      </h2>

      <form onSubmit={onSubmit} className="mt-[7vh] border-t border-night/20">
        <div className={row}>
          <label htmlFor="c-name" className={label}>Name</label>
          <input id="c-name" name="name" autoComplete="name" placeholder={CONTACT.placeholders.name} className={field} />
        </div>
        <div className={row}>
          <label htmlFor="c-email" className={label}>Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={CONTACT.placeholders.email} className={field} />
        </div>
        <div className={row}>
          <label htmlFor="c-phone" className={label}>Phone</label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" pattern="^\+?[0-9 ()\-]{6,}$" placeholder={CONTACT.placeholders.phone} className={field} />
        </div>
        <fieldset className={row}>
          <legend className="sr-only">Interest</legend>
          <span aria-hidden className={label}>Interest</span>
          <div className="flex flex-wrap gap-3">
            {CONTACT.interests.map((o) => (
              <label key={o} className="cursor-pointer">
                <input type="radio" name="interest" value={o} className="peer sr-only" />
                <span className="block rounded-lg bg-night/10 px-4 py-1.5 text-lg text-night/50 transition-colors peer-checked:bg-night peer-checked:text-fog peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-violet md:text-[max(1.5vw,16px)]">
                  {o}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={row}>
          <label htmlFor="c-msg" className={label}>Message</label>
          <textarea id="c-msg" name="message" rows={2} placeholder={CONTACT.placeholders.message} className={`${field} resize-none`} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button type="submit" className="rounded-lg bg-night px-8 py-3 text-xl text-fog transition-colors hover:bg-violet md:text-[max(1.6vw,18px)]">
            Send
          </button>
          <p role="status" className="text-sm text-night/60">
            {sent ? 'Opening your email app…' : 'DRAFT: Send opens your email app until the form backend is connected.'}
          </p>
        </div>
      </form>
    </div>
  )
}
