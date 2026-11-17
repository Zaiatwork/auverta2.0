import Link from 'next/link'
import { FOOTER_NAV, SITE } from '@/content/site'

export default function SiteFooter() {
  const col = 'mt-5 flex flex-col gap-2 text-lg'
  const head = 'text-xs uppercase tracking-[0.18em] text-white/50'
  return (
    <footer className="overflow-hidden bg-night px-5 pt-[10vh] text-white md:px-[10.8vw]">
      <div className="rise grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <p className="col-span-2 max-w-[16ch] text-2xl md:col-span-1 font-semibold leading-tight tracking-tight md:text-[max(2vw,24px)]">{SITE.promise}</p>

        <nav aria-label="Footer">
          <span className={head}>Navigate</span>
          <ul className={col}>
            {FOOTER_NAV.slice(0, 5).map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-lime">{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <span className={head}>Socials</span>
          <ul className={col}>
            {SITE.social.map((s) => (
              <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-lime">{s.label} ↗</a></li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <span className={head}>Say hello</span>
          <a href={`mailto:${SITE.email}`} className="mt-5 block text-lg hover:text-lime">{SITE.email}</a>
        </div>
      </div>

      <p aria-hidden className="rise mt-[10vh] select-none whitespace-nowrap text-center font-display text-[19vw] uppercase md:text-[11.5vw] leading-[0.9] text-white/10">
        Auverta
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/50">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
